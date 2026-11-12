import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { getAppointmentConfig } from "@/lib/booking-config";
import { validateAppointment } from "@/lib/appointment-validation";
import { siteConfig } from "@/config/site";
import { homeServices } from "@/data/home-services";

function reply(error: string, status: number) {
  return NextResponse.json({ error }, { status, headers: { "Cache-Control": "no-store" } });
}
export async function handleAppointmentRequest(request: Request) {
  const config = getAppointmentConfig();
  if (!config.enabled) return reply("Il modulo non è ancora disponibile. Puoi contattarmi tramite WhatsApp o email.", 503);
  const origin = request.headers.get("origin");
  const allowedOrigins = new Set([new URL(siteConfig.domain).origin, "https://www.simonecontino.it"]);
  if (process.env.NODE_ENV !== "production") allowedOrigins.add(new URL(request.url).origin);
  if (!origin || !allowedOrigins.has(origin)) return reply("Richiesta non consentita.", 403);
  if (!request.headers.get("content-type")?.startsWith("application/json")) return reply("Formato non valido.", 415);
  // Read a bounded stream rather than trusting the client Content-Length.
  const reader = request.body?.getReader();
  if (!reader) return reply("Richiesta vuota.", 400);
  let size = 0;
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 12_000) { await reader.cancel(); return reply("Richiesta troppo grande.", 413); }
    chunks.push(value);
  }
  let body;
  try { body = JSON.parse(Buffer.concat(chunks).toString("utf8")); } catch { return reply("Dati non validi.", 400); }
  if (!body || typeof body !== "object" || Array.isArray(body)) return reply("Dati non validi.", 400);
  if (body.website) return reply("Impossibile inviare la richiesta.", 400);
  const services = homeServices.filter(s => s.enabled);
  const data = validateAppointment(body, services.map(s => s.id));
  if (!data) return reply("Controlla i campi e scegli una prestazione disponibile. Per il contatto telefonico è necessario indicare un numero.", 400);
  if (typeof body.token !== "string" || !body.token || body.token.length > 2048) return reply("Completa la verifica antispam.", 400);
  if (typeof body.requestedAt !== "string" || !Number.isFinite(Date.parse(body.requestedAt)) || Math.abs(Date.now() - Date.parse(body.requestedAt)) > 86_400_000) return reply("Richiesta scaduta. Ricarica la pagina e riprova.", 400);
  try {
    const verification = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: config.secret, response: body.token }), signal: AbortSignal.timeout(10_000),
    });
    const result = await verification.json();
    const hostnames = Array.from(allowedOrigins).map(o => new URL(o).hostname);
    if (!verification.ok || !result.success || result.action !== "appointment" || !hostnames.includes(result.hostname)) return reply("Verifica antispam scaduta o non valida. Riprova.", 400);
    const service = services.find(s => s.id === data.service)!;
    const digest = createHash("sha256").update(JSON.stringify({ ...data, requestedAt: body.requestedAt })).digest("hex");
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST", headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json", "Idempotency-Key": `appointment-${digest}` },
      body: JSON.stringify({ from: config.from, to: [config.to], reply_to: data.email,
        subject: "Nuova richiesta di ricontatto — Dr. Simone Contino",
        text: [`Nome: ${data.firstName} ${data.lastName}`, `Email: ${data.email}`, `Telefono: ${data.phone || "Non indicato"}`, `Prestazione richiesta: ${service.title}`, `Preferenza: ${data.contactPreference === "phone" ? "Telefono" : "Email"}`, "Informativa privacy: presa visione dichiarata nel modulo di ricontatto.", "Questa richiesta non conferma un appuntamento.", `Richiesta (orario indicativo): ${new Date(body.requestedAt).toLocaleString("it-IT", { timeZone: "Europe/Rome" })}`].join("\n"),
      }), signal: AbortSignal.timeout(12_000),
    });
    if (!response.ok) return reply("Invio non riuscito. I dati restano nel modulo: puoi riprovare oppure utilizzare WhatsApp.", 502);
    const accepted = await response.json();
    if (!accepted || typeof accepted.id !== "string" || !accepted.id.trim()) return reply("Il servizio email non ha confermato l’accettazione. Riprova oppure contattami via email.", 502);
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch { return reply("Non è stato possibile verificare l’invio. Riprova mantenendo gli stessi dati.", 502); }
}
