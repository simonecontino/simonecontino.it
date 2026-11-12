"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { booking } from "@/config/booking";
import { CalendarDays } from "lucide-react";
import Link from "next/link";

export function BookingBar() {
  const pathname = usePathname();
  const linkRef = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const link = linkRef.current;
    if (!link) return;
    link.hidden = false;
    const section = document.getElementById("richiedi-appuntamento");
    if (!section || !window.IntersectionObserver) return;
    const observer = new IntersectionObserver(([entry]) => {
      link.hidden = entry.isIntersecting;
    });
    observer.observe(section);
    return () => { observer.disconnect(); link.hidden = false; };
  }, [pathname]);
  if (pathname === booking.path) return null;
  return <Link ref={linkRef} className="booking-bar" href={booking.requestUrl}><CalendarDays size={18} aria-hidden="true" />Prenota una visita o esame</Link>;
}
