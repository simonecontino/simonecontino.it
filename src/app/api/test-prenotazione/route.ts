import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { handleAppointmentRequest } from "@/lib/appointment-handler";
import { testCookie, validTestSession } from "@/lib/appointment-test-access";

export const runtime = "nodejs";
export async function POST(request: Request) {
  if (!validTestSession((await cookies()).get(testCookie)?.value)) return NextResponse.json({ error: "Accesso di prova non valido o scaduto." }, { status: 403, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } });
  return handleAppointmentRequest(request, true);
}
