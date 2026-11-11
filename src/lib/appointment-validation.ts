export const fieldLimits = { firstName: 60, lastName: 60, email: 254, phone: 30, notes: 500 };
export type AppointmentInput = {
  firstName: string; lastName: string; email: string; phone: string;
  service: string; contactPreference: string; notes: string; privacy: boolean;
};
export function validateAppointment(value: unknown, allowedServices: string[]): AppointmentInput | null {
  if (!value || typeof value !== "object") return null;
  const v = value as Record<string, unknown>;
  const data: Record<string, string> = {};
  for (const [key, limit] of Object.entries(fieldLimits)) {
    if (typeof v[key] !== "string" || (v[key] as string).length > limit) return null;
    data[key] = (v[key] as string).trim();
    if ((key === "notes" ? /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/ : /[\u0000-\u001f\u007f]/).test(data[key])) return null;
  }
  if (!data.firstName || !data.lastName || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(data.email)) return null;
  if (data.phone && !/^[+\d ()-]{6,30}$/.test(data.phone)) return null;
  if (!allowedServices.includes(String(v.service)) || !["email", "phone"].includes(String(v.contactPreference)) || v.privacy !== true) return null;
  if (v.contactPreference === "phone" && !data.phone) return null;
  return { ...data, service: String(v.service), contactPreference: String(v.contactPreference), privacy: true } as AppointmentInput;
}
