"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { fieldLimits, validateAppointment } from "@/lib/appointment-validation";

type TurnstileApi = {
  render: (element: HTMLElement, options: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};
declare global { interface Window { turnstile?: TurnstileApi } }

export function AppointmentForm({ enabled, siteKey }: { enabled: boolean; siteKey?: string }) {
  const [preference, setPreference] = useState("email");
  const [token, setToken] = useState("");
  const [scriptReady, setScriptReady] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [error, setError] = useState("");
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const requestTime = useRef<string | null>(null);

  const successful = status === "success";
  useEffect(() => {
    if (!enabled || !scriptReady || !siteKey || !widgetRef.current || !window.turnstile || successful) return;
    try {
      const id = window.turnstile.render(widgetRef.current, {
        sitekey: siteKey.trim(), action: "appointment", theme: "light", size: "flexible",
        callback: (value: string) => setToken(value),
        "expired-callback": () => setToken(""),
        "error-callback": () => { setToken(""); setError("Verifica antispam non disponibile. Riprova o utilizza WhatsApp."); },
      });
      widgetId.current = id;
      return () => {
        try { window.turnstile?.remove(id); } catch { /* Provider unavailable during unmount. */ }
        widgetId.current = null;
      };
    } catch {
      // SDK initialization is an external synchronization; surface its failure without crashing the page.
      /* eslint-disable react-hooks/set-state-in-effect */
      setToken("");
      setError("Verifica antispam non disponibile. Ricarica la pagina oppure contattami via email o WhatsApp.");
      /* eslint-enable react-hooks/set-state-in-effect */
    }
  }, [enabled, scriptReady, siteKey, successful]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!enabled || status === "sending") return;
    const form = new FormData(event.currentTarget);
    const input = {
      firstName: form.get("firstName"), lastName: form.get("lastName"), email: form.get("email"),
      phone: form.get("phone"), contactPreference: preference, privacy: form.get("privacy") === "on",
    };
    if (!validateAppointment(input)) {
      setError("Controlla i campi inseriti. Se scegli il contatto telefonico, indica anche il numero.");
      return;
    }
    if (!token) { setError("Completa la verifica antispam prima di inviare."); return; }
    requestTime.current ??= new Date().toISOString();
    setStatus("sending"); setError("");
    try {
      const response = await fetch("/api/appointment-requests", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...input, token, website: form.get("website"), requestedAt: requestTime.current }),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || "Invio non riuscito. Riprova.");
      setStatus("success");
      feedbackRef.current?.focus();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Invio non riuscito. I dati sono ancora nel modulo.");
      setStatus("idle"); setToken("");
      if (widgetId.current) {
        try { window.turnstile?.reset(widgetId.current); } catch { /* Keep submission blocked without a valid token. */ }
      }
    }
  }

  return <div className="appointment-form-panel">
    <div ref={feedbackRef} tabIndex={-1} role="status" aria-live="polite">
      {status === "success" ? <><h3>Richiesta inviata correttamente</h3><p>Grazie per avermi contattato. Ti risponderò per concordare la disponibilità e le modalità dell’appuntamento.</p><p>L’appuntamento non è ancora confermato.</p></> : null}
    </div>
    {status !== "success" ? <>
      <form onSubmit={submit}>
        <fieldset disabled={!enabled || status === "sending"}>
          <legend className="sr-only">Dati per la richiesta di ricontatto</legend>
          <div className="appointment-fields">
            <label><span className="appointment-field-label">Nome <small>(obbligatorio)</small></span><input name="firstName" autoComplete="given-name" required maxLength={fieldLimits.firstName} /></label>
            <label><span className="appointment-field-label">Cognome <small>(obbligatorio)</small></span><input name="lastName" autoComplete="family-name" required maxLength={fieldLimits.lastName} /></label>
            <label><span className="appointment-field-label">Email <small>(obbligatoria)</small></span><input type="email" name="email" autoComplete="email" required maxLength={fieldLimits.email} /></label>
            <label><span className="appointment-field-label">Telefono <small>{preference === "phone" ? "(obbligatorio)" : "(facoltativo)"}</small></span><input type="tel" name="phone" autoComplete="tel" required={preference === "phone"} maxLength={fieldLimits.phone} /></label>
            <label className="field-full">Preferenza di contatto<select name="contactPreference" value={preference} onChange={e => setPreference(e.target.value)}><option value="email">Email</option><option value="phone">Telefono</option></select></label>
          </div>
          <div className="appointment-honeypot" aria-hidden="true"><label>Lascia vuoto questo campo<input name="website" autoComplete="off" tabIndex={-1} /></label></div>
          <label className="appointment-privacy"><input type="checkbox" name="privacy" required /><span>Ho preso visione dell’<Link href="/privacy" target="_blank">informativa privacy</Link>.</span></label>
          {enabled ? <div ref={widgetRef} className="appointment-challenge" /> : null}
          <p role="alert" className="appointment-error">{error}</p>
          <button className="button button--primary" type="submit">{status === "sending" ? "Invio in corso…" : "Invia richiesta"}</button>
        </fieldset>
      </form>
      <p className="appointment-disclaimer">Solo recapiti, senza informazioni sanitarie. L’invio non conferma un appuntamento.</p>
    </> : null}
    {enabled ? <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onReady={() => setScriptReady(true)} onError={() => setError("Impossibile caricare la verifica antispam. Utilizza WhatsApp o email.")} /> : null}
  </div>;
}
