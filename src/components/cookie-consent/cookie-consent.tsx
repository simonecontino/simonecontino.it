"use client";

import Link from "next/link";
import { GoogleAnalytics } from "@next/third-parties/google";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { OPEN_COOKIE_SETTINGS_EVENT } from "@/components/cookie-consent/constants";

const CONSENT_STORAGE_KEY = "simone-contino-cookie-consent";
const CONSENT_VERSION = "1.0";
const CONSENT_CHANGED_EVENT = "cookie-consent:changed";
const CONSENT_MODE_READY_EVENT = "cookie-consent:mode-ready";
const MISSING_CONSENT = "__missing__";

type ConsentRecord = {
  version: string;
  analytics: boolean;
  updatedAt: string;
};

declare global {
  interface Window {
    gtag?: (...args: Array<string | Record<string, unknown>>) => void;
    __cookieConsentDefaultSet?: boolean;
  }
}

const deniedConsent = {
  analytics_storage: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
} as const;

function initializeConsentMode() {
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = window.gtag ?? ((...args: Array<string | Record<string, unknown>>) => window.dataLayer?.push(args));

  if (!window.__cookieConsentDefaultSet) {
    window.gtag("consent", "default", deniedConsent);
    window.__cookieConsentDefaultSet = true;
  }
}

function updateConsentMode(analytics: boolean) {
  window.gtag?.("consent", "update", {
    ...deniedConsent,
    analytics_storage: analytics ? "granted" : "denied",
  });
}

function parseConsent(stored: string | null): ConsentRecord | null {
  try {
    if (!stored || stored === MISSING_CONSENT) return null;
    const parsed = JSON.parse(stored) as Partial<ConsentRecord>;
    if (parsed.version !== CONSENT_VERSION || typeof parsed.analytics !== "boolean") return null;
    return parsed as ConsentRecord;
  } catch {
    return null;
  }
}

function saveConsent(analytics: boolean): ConsentRecord {
  const record: ConsentRecord = {
    version: CONSENT_VERSION,
    analytics,
    updatedAt: new Date().toISOString(),
  };
  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  window.dispatchEvent(new Event(CONSENT_CHANGED_EVENT));
  return record;
}

function subscribeToConsent(onStoreChange: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === CONSENT_STORAGE_KEY) onStoreChange();
  };
  window.addEventListener("storage", handleStorage);
  window.addEventListener(CONSENT_CHANGED_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(CONSENT_CHANGED_EVENT, onStoreChange);
  };
}

function getConsentSnapshot() {
  return window.localStorage.getItem(CONSENT_STORAGE_KEY) ?? MISSING_CONSENT;
}

function subscribeToConsentMode(onStoreChange: () => void) {
  window.addEventListener(CONSENT_MODE_READY_EVENT, onStoreChange);
  return () => window.removeEventListener(CONSENT_MODE_READY_EVENT, onStoreChange);
}

function getConsentModeSnapshot() {
  return Boolean(window.__cookieConsentDefaultSet);
}

function clearAnalyticsCookies() {
  const hostname = window.location.hostname;
  const rootDomain = hostname.split(".").slice(-2).join(".");

  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0]?.trim();
    if (!name?.startsWith("_ga")) return;
    document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
    document.cookie = `${name}=; Max-Age=0; Path=/; Domain=.${rootDomain}; SameSite=Lax`;
  });
}

export function CookieConsent({ gaId, analyticsAvailable }: { gaId?: string; analyticsAvailable: boolean }) {
  const consentSnapshot = useSyncExternalStore(subscribeToConsent, getConsentSnapshot, () => null);
  const consentModeReady = useSyncExternalStore(subscribeToConsentMode, getConsentModeSnapshot, () => false);
  const consent = parseConsent(consentSnapshot);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsPreference, setAnalyticsPreference] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const hasConsent = Boolean(consent);
  const isOpen = consentSnapshot !== null && (!consent || isSettingsOpen);

  useEffect(() => {
    initializeConsentMode();
    const stored = parseConsent(getConsentSnapshot());
    if (stored) {
      updateConsentMode(stored.analytics);
    }
    window.dispatchEvent(new Event(CONSENT_MODE_READY_EVENT));

    const openSettings = () => {
      const current = parseConsent(getConsentSnapshot());
      setAnalyticsPreference(current?.analytics ?? false);
      setShowPreferences(true);
      setIsSettingsOpen(true);
    };
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const dialog = dialogRef.current;
    const focusable = dialog?.querySelector<HTMLElement>("button:not([disabled]), a[href], input:not([disabled])");
    focusable?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && hasConsent) {
        setIsSettingsOpen(false);
        return;
      }
      if (event.key !== "Tab" || !dialog) return;
      const controls = Array.from(dialog.querySelectorAll<HTMLElement>("button:not([disabled]), a[href], input:not([disabled])"));
      if (!controls.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus();
    };
  }, [hasConsent, isOpen]);

  const applyChoice = (analytics: boolean) => {
    initializeConsentMode();
    updateConsentMode(analytics);
    if (!analytics) clearAnalyticsCookies();
    saveConsent(analytics);
    setAnalyticsPreference(analytics);
    setIsSettingsOpen(false);
    setShowPreferences(false);
  };

  const analyticsGranted = Boolean(consentModeReady && consent?.analytics && analyticsAvailable && gaId);

  return (
    <>
      {analyticsGranted && gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      {isOpen ? (
        <div className="cookie-consent-backdrop">
          <div
            ref={dialogRef}
            className="cookie-consent-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-consent-title"
            aria-describedby="cookie-consent-description"
          >
            <p className="eyebrow">Le tue preferenze</p>
            <h2 id="cookie-consent-title">{showPreferences ? "Personalizza i cookie" : "Rispetto per la tua privacy"}</h2>
            {showPreferences ? (
              <div id="cookie-consent-description">
                <div className="cookie-preference-row">
                  <div><strong>Cookie tecnici</strong><p>Necessari per il funzionamento e per ricordare questa scelta. Sono sempre attivi.</p></div>
                  <span aria-label="Cookie tecnici sempre attivi">Sempre attivi</span>
                </div>
                <label className="cookie-preference-row cookie-preference-toggle">
                  <div><strong>Cookie analitici</strong><p>Google Analytics ci aiuta a comprendere, in forma aggregata, come viene utilizzato il sito.</p></div>
                  <input
                    type="checkbox"
                    checked={analyticsPreference}
                    onChange={(event) => setAnalyticsPreference(event.target.checked)}
                  />
                </label>
              </div>
            ) : (
              <p id="cookie-consent-description">Usiamo cookie tecnici necessari e, solo con il tuo consenso, Google Analytics per misurare l’utilizzo del sito. Non utilizziamo pubblicità, remarketing o personalizzazione degli annunci.</p>
            )}
            <div className="cookie-policy-links">
              <Link href="/privacy" target="_blank">Privacy policy</Link>
              <Link href="/cookie-policy" target="_blank">Cookie policy</Link>
            </div>
            <div className="cookie-consent-actions">
              {showPreferences ? (
                <>
                  <button className="button button--primary" type="button" onClick={() => applyChoice(analyticsPreference)}>Salva preferenze</button>
                  <button className="button button--secondary" type="button" onClick={() => setShowPreferences(false)}>Indietro</button>
                </>
              ) : (
                <>
                  <button className="button button--primary" type="button" onClick={() => applyChoice(true)}>Accetta tutti</button>
                  <button className="button button--secondary" type="button" onClick={() => applyChoice(false)}>Rifiuta</button>
                  <button className="button button--text" type="button" onClick={() => {
                    setAnalyticsPreference(consent?.analytics ?? false);
                    setShowPreferences(true);
                  }}>Personalizza</button>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
