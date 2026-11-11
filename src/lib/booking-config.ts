import "server-only";
import { booking } from "@/config/booking";
import { siteConfig } from "@/config/site";

export function getWhatsappUrl() {
  const number = (process.env.WHATSAPP_BUSINESS_NUMBER || "393283159090").replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(booking.whatsappMessage)}`;
}

export function getAppointmentConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.APPOINTMENT_FROM_EMAIL;
  const to = process.env.APPOINTMENT_TO_EMAIL || siteConfig.email;
  const siteKey = process.env.TURNSTILE_SITE_KEY;
  const secret = process.env.TURNSTILE_SECRET_KEY;
  const enabled = process.env.APPOINTMENT_FORM_ENABLED === "true" && process.env.APPOINTMENT_PRIVACY_VERIFIED === "true" && process.env.APPOINTMENT_EMAIL_VERIFIED === "true" && Boolean(apiKey && from && to && siteKey && secret);
  return { enabled, apiKey, from, to, siteKey, secret };
}
