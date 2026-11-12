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

export function AppointmentForm({ enabled, siteKey, services }: { enabled: boolean; siteKey?: string; services: { id: string; title: string }[] }) {
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
    if (successful) feedbackRef.current?.focus({ preventScroll: true });
  }, [successful]);
  useEffect(() => {
    if (!enabled || !scriptReady || !siteKey || !widgetRef.current || !window.turnstile || successful) return;
    try {
      const id = window.turnstile.render(widgetRef.current, {
        sitekey: siteKey.trim(), action: "appointment", theme: "light", size: widgetRef.current.clientWidth < 300 ? "compact" : "normal",
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
      phone: form.get("phone"), service: form.get("service"), contactPreference: preference, privacy: form.get("privacy") === "on",
    };
    if (!validateAppointment(input, services.map(s => s.id))) {
      setError("Controlla i campi e scegli una prestazione. Se scegli il contatto telefonico, indica anche il numero.");
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
      if (!response.ok || result?.ok !== true) throw new Error("Invio non riuscito");
      setStatus("success");
    } catch {
      setError("Non è stato possibile inviare la richiesta. Riprova tra qualche istante oppure contattami tramite WhatsApp o email.");
      setStatus("idle"); setToken("");
      if (widgetId.current) {
        try { window.turnstile?.reset(widgetId.current); } catch { /* Keep submission blocked without a valid token. */ }
      }
    }
  }

  return <div className="appointment-form-panel">
    <div ref={feedbackRef} tabIndex={-1} role="status" aria-live="polite" aria-atomic="true" className={successful ? "appointment-success" : undefined}>
      {successful ? <>
        <svg className="appointment-success-icon" viewBox="0 0 80 80" fill="none" aria-hidden="true"><circle className="appointment-success-circle" cx="40" cy="40" r="36" /><path className="appointment-success-check" d="m23 40 11 11 23-24" pathLength="1" /></svg>
        <div className="appointment-success-copy"><h3>Richiesta inviata con successo!</h3><p>Grazie per avermi contattato. Ti risponderò tramite il recapito indicato per concordare i dettagli della prestazione.</p><p className="appointment-success-note">La richiesta non costituisce conferma di appuntamento.</p></div>
      </> : null}
    </div>
    {status !== "success" ? <>
      <form onSubmit={submit} aria-busy={status === "sending"}>
        <fieldset disabled={!enabled || status === "sending"}>
          <legend className="sr-only">Dati per la richiesta di ricontatto</legend>
          <div className="appointment-fields">
            <label><span className="appointment-field-label">Nome <small>(obbligatorio)</small></span><input name="firstName" autoComplete="given-name" required maxLength={fieldLimits.firstName} /></label>
            <label><span className="appointment-field-label">Cognome <small>(obbligatorio)</small></span><input name="lastName" autoComplete="family-name" required maxLength={fieldLimits.lastName} /></label>
            <label><span className="appointment-field-label">Email <small>(obbligatoria)</small></span><input type="email" name="email" autoComplete="email" required maxLength={fieldLimits.email} /></label>
            <label><span className="appointment-field-label">Telefono <small>{preference === "phone" ? "(obbligatorio)" : "(facoltativo)"}</small></span><input type="tel" name="phone" autoComplete="tel" required={preference === "phone"} maxLength={fieldLimits.phone} /></label>
            <label className="field-full">Preferenza di contatto<select name="contactPreference" value={preference} onChange={e => setPreference(e.target.value)}><option value="email">Email</option><option value="phone">Telefono</option></select></label>
            <label className="field-full appointment-service-field"><span className="appointment-field-label">Prestazione richiesta <small>(obbligatoria)</small></span><select name="service" required defaultValue="" aria-describedby="service-help"><option value="" disabled>Scegli una visita o un esame</option>{services.map(s => <option value={s.id} key={s.id}>{s.title}</option>)}</select><small id="service-help">La disponibilità verrà concordata al ricontatto.</small></label>
          </div>
          <div className="appointment-honeypot" aria-hidden="true"><label>Lascia vuoto questo campo<input name="website" autoComplete="off" tabIndex={-1} /></label></div>
          <label className="appointment-privacy"><input type="checkbox" name="privacy" required /><span>Ho preso visione dell’<Link href="/privacy" target="_blank">informativa privacy</Link>.</span></label>
          {enabled ? <div ref={widgetRef} className="appointment-challenge" /> : null}
          <p role="alert" className="appointment-error">{error}</p>
          <div className="appointment-submit-row">
            <button className="button button--primary" type="submit" disabled={!enabled || status === "sending"}>{status === "sending" ? <><span className="appointment-spinner" aria-hidden="true" />Invio in corso...</> : "Invia richiesta"}</button>
            <p>L’invio non conferma l’appuntamento.</p>
          </div>
        </fieldset>
      </form>
      <p className="appointment-disclaimer">Non inserire sintomi, diagnosi o referti.</p>
    </> : null}
    {enabled ? <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onReady={() => setScriptReady(true)} onError={() => setError("Impossibile caricare la verifica antispam. Utilizza WhatsApp o email.")} /> : null}
  </div>;
}
