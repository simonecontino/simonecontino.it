import { handleAppointmentRequest } from "@/lib/appointment-handler";

export const runtime = "nodejs";
export async function POST(request: Request) {
  return handleAppointmentRequest(request);
}
