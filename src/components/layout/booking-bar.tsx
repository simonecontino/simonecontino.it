import { booking } from "@/config/booking";
import { CalendarDays } from "lucide-react";
import Link from "next/link";

export function BookingBar() {
  return <Link className="booking-bar" href={booking.requestUrl}><CalendarDays size={18} aria-hidden="true" />Prenota una visita</Link>;
}
