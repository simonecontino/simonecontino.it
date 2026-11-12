"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { SELECT_SERVICE_EVENT } from "@/components/forms/service-request-link";
import { fieldLimits, validateAppointment } from "@/lib/appointment-validation";

type ServiceOption = { id: string; title: string };
type TurnstileApi = {
  render: (element: HTMLElement, options: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};
declare global { interface Window { turnstile?: TurnstileApi } }

export function AppointmentForm({ enabled, siteKey, services, endpoint = "/api/appointment-requests" }: { enabled: boolean; siteKey?: string; services: ServiceOption[]; endpoint?: string }) {
  const [service, setService] = useState("");
  const [preference, setPreference] = useState("email");
  const [token, setToken] = useState("");
  const [scriptReady, setScriptReady] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [error, setError] = useState("");
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const requestTime = useRef<string | null>(null);

  useEffect(() => {
    const chooseService = (event: Event) => {
      const requested = (event as CustomEvent<unknown>).detail;
      if (typeof requested === "string" && services.some(s => s.id === requested)) setService(requested);
    };
    window.addEventListener(SELECT_SERVICE_EVENT, chooseService);
    return () => window.removeEventListener(SELECT_SERVICE_EVENT, chooseService);
  }, [services]);

  const successful = status === "success";
  useEffect(() => {
    if (!enabled || !scriptReady || !siteKey || !widgetRef.current || !window.turnstile || successful) return;
    const id = window.turnstile.render(widgetRef.current, {
      sitekey: siteKey, action: "appointment", theme: "light", size: "flexible",
      callback: (value: string) => setToken(value),
      "expired-callback": () => setToken(""),
      "error-callback": () => { setToken(""); setError("Verifica antispam non disponibile. Riprova o utilizza WhatsApp."); },
    });
    widgetId.current = id;
    return () => { window.turnstile?.remove(id); widgetId.current = null; };
  }, [enabled, scriptReady, siteKey, successful]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!enabled || status === "sending") return;
    const form = new FormData(event.currentTarget);
    const input = {
      firstName: form.get("firstName"), lastName: form.get("lastName"), email: form.get("email"),
      phone: form.get("phone"), service, contactPreference: preference, notes: form.get("notes"), privacy: form.get("privacy") === "on",
    };
    if (!validateAppointment(input, services.map(s => s.id))) {
      setError("Controlla i campi inseriti. Se scegli il contatto telefonico, indica anche il numero.");
      return;
    }
    if (!token) { setError("Completa la verifica antispam prima di inviare."); return; }
    requestTime.current ??= new Date().toISOString();
    setStatus("sending"); setError("");
    try {
      const response = await fetch(endpoint, {
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
      if (widgetId.current) window.turnstile?.reset(widgetId.current);
    }
  }

  return <div className="appointment-form-panel">
    <div ref={feedbackRef} tabIndex={-1} role="status" aria-live="polite">
      {status === "success" ? <><h3>Richiesta inviata correttamente</h3><p>Grazie per avermi contattato. Ti risponderò per concordare la disponibilità e le modalità dell’appuntamento.</p><p>L’appuntamento non è ancora confermato.</p></> : null}
    </div>
    {status !== "success" ? <>
      <form onSubmit={submit}>
        <fieldset disabled={!enabled || status === "sending"}>
          <legend className="sr-only">Dati per la richiesta di appuntamento</legend>
          <div className="appointment-fields">
            <label>Nome <span>(obbligatorio)</span><input name="firstName" autoComplete="given-name" required maxLength={fieldLimits.firstName} /></label>
            <label>Cognome <span>(obbligatorio)</span><input name="lastName" autoComplete="family-name" required maxLength={fieldLimits.lastName} /></label>
            <label>Email <span>(obbligatoria)</span><input type="email" name="email" autoComplete="email" required maxLength={fieldLimits.email} /></label>
            <label>Telefono <span>{preference === "phone" ? "(necessario per essere richiamato)" : "(facoltativo)"}</span><input type="tel" name="phone" autoComplete="tel" required={preference === "phone"} maxLength={fieldLimits.phone} /></label>
            <label className="field-full">Prestazione richiesta <span>(obbligatoria)</span><select name="service" required value={service} onChange={e => setService(e.target.value)}><option value="">Scegli una prestazione</option>{services.map(s => <option value={s.id} key={s.id}>{s.title}</option>)}</select></label>
            <label className="field-full">Preferenza di contatto<select name="contactPreference" value={preference} onChange={e => setPreference(e.target.value)}><option value="email">Email</option><option value="phone">Telefono</option></select></label>
            <label className="field-full">Note organizzative <span>(facoltative)</span><textarea name="notes" rows={3} maxLength={fieldLimits.notes} aria-describedby="notes-warning" /><small id="notes-warning">Non inserire informazioni sanitarie, referti o altri dati sensibili.</small></label>
          </div>
          <div className="appointment-honeypot" aria-hidden="true"><label>Lascia vuoto questo campo<input name="website" autoComplete="off" tabIndex={-1} /></label></div>
          <label className="appointment-privacy"><input type="checkbox" name="privacy" required /><span>Ho preso visione dell’<Link href="/privacy" target="_blank">informativa privacy</Link>.</span></label>
          {enabled ? <div ref={widgetRef} className="appointment-challenge" /> : null}
          <p role="alert" className="appointment-error">{error}</p>
          <button className="button button--primary" type="submit">{status === "sending" ? "Invio in corso…" : "Invia richiesta"}</button>
        </fieldset>
      </form>
      <p className="appointment-disclaimer">L’invio è una richiesta di contatto: la disponibilità e le modalità della visita saranno concordate successivamente.</p>
    </> : null}
    {enabled ? <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onReady={() => setScriptReady(true)} onError={() => setError("Impossibile caricare la verifica antispam. Utilizza WhatsApp o email.")} /> : null}
  </div>;
}
