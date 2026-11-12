import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

export const testCookie = "appointment-test-access";
export function testAccessAvailable() {
  const until = Number(process.env.APPOINTMENT_TEST_UNTIL);
  return Boolean(process.env.APPOINTMENT_TEST_PASSWORD && process.env.APPOINTMENT_TEST_PASSWORD.length >= 32 && Number.isFinite(until) && until > Date.now());
}
function equal(a: string, b: string) {
  const aa = Buffer.from(a); const bb = Buffer.from(b);
  return aa.length === bb.length && timingSafeEqual(aa, bb);
}
export function validTestPassword(input: string) {
  return testAccessAvailable() && equal(input, process.env.APPOINTMENT_TEST_PASSWORD!);
}
export function issueTestSession() {
  const expires = Math.min(Date.now() + 3_600_000, Number(process.env.APPOINTMENT_TEST_UNTIL));
  const value = String(expires);
  const signature = createHmac("sha256", process.env.APPOINTMENT_TEST_PASSWORD!).update(value).digest("hex");
  return `${value}.${signature}`;
}
export function validTestSession(session: string | undefined) {
  if (!testAccessAvailable() || !session || session.length > 100) return false;
  const [value, signature, extra] = session.split(".");
  const expires = Number(value);
  if (extra || !signature || !Number.isFinite(expires) || expires <= Date.now() || expires > Number(process.env.APPOINTMENT_TEST_UNTIL)) return false;
  const expected = createHmac("sha256", process.env.APPOINTMENT_TEST_PASSWORD!).update(value).digest("hex");
  return equal(signature, expected);
}
