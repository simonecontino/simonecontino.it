import { permanentRedirect } from "next/navigation";
import { booking } from "@/config/booking";

export default function LegacyBookingPage() {
  permanentRedirect(booking.requestUrl);
}
