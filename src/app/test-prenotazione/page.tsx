import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { Container } from "@/components/ui/container";
import { AppointmentForm } from "@/components/forms/appointment-form";
import { getAppointmentConfig } from "@/lib/booking-config";
import { homeServices } from "@/data/home-services";
import { issueTestSession, testAccessAvailable, testCookie, validTestPassword, validTestSession } from "@/lib/appointment-test-access";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Prova tecnica riservata", robots: { index: false, follow: false }, alternates: { canonical: "/test-prenotazione" } };

async function login(form: FormData) {
  "use server";
  const password = form.get("password");
  if (typeof password !== "string" || !validTestPassword(password)) redirect("/test-prenotazione?errore=1");
  (await cookies()).set(testCookie, issueTestSession(), { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 3600 });
  redirect("/test-prenotazione");
}

export default async function TestBookingPage({ searchParams }: { searchParams: Promise<{ errore?: string }> }) {
  if (!testAccessAvailable()) notFound();
  const authorized = validTestSession((await cookies()).get(testCookie)?.value);
  const config = getAppointmentConfig();
  const ready = Boolean(config.apiKey && config.from && config.to && config.siteKey && config.secret);
  const error = (await searchParams).errore;
  return <section className="section"><Container><h1>Prova tecnica riservata</h1>
    {!authorized ? <form action={login} className="appointment-form-panel"><p>Accesso temporaneo per il titolare. Non utilizzare dati di pazienti.</p><label htmlFor="test-password">Password di prova</label><input id="test-password" name="password" type="password" autoComplete="current-password" required maxLength={128} />{error ? <p role="alert">Password non valida o accesso scaduto.</p> : null}<p><button type="submit" className="button button--primary">Accedi al test</button></p></form> : <>
      <p>Il modulo pubblico resta disattivato. Questa prova invia una notifica tecnica al recapito configurato dal titolare; non prenota una visita.</p>
      <p>Usa esclusivamente nome <strong>Test</strong>, cognome <strong>Tecnico</strong> ed email <strong>drsimonecontino@gmail.com</strong>. Lascia vuoti telefono e note. Scegli una prestazione qualsiasi e mantieni il contatto via email.</p>
      {!ready ? <p role="alert">Configurazione tecnica incompleta: test non disponibile.</p> : null}
      <AppointmentForm enabled={ready} siteKey={ready ? config.siteKey : undefined} services={homeServices.filter(s => s.enabled).map(({id, title}) => ({id, title}))} endpoint="/api/test-prenotazione" />
    </>}
  </Container></section>;
}
