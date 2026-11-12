"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { booking } from "@/config/booking";
import { navigation } from "@/config/navigation";

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDetailsElement>(null);
  const toggleRef = useRef<HTMLElement>(null);
  const navigationId = useId();

  function closeMenu() {
    if (menuRef.current) menuRef.current.open = false;
    setIsOpen(false);
  }

  useEffect(() => {
    if (!isOpen) return;

    function handleOutsideInteraction(event: Event) {
      const menu = menuRef.current;
      if (menu && event.target instanceof Node && !menu.contains(event.target)) {
        menu.open = false;
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key !== "Escape" || event.defaultPrevented) return;
      event.preventDefault();
      if (menuRef.current) menuRef.current.open = false;
      setIsOpen(false);
      toggleRef.current?.focus();
    }

    document.addEventListener("pointerdown", handleOutsideInteraction, true);
    document.addEventListener("focusin", handleOutsideInteraction);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("pointerdown", handleOutsideInteraction, true);
      document.removeEventListener("focusin", handleOutsideInteraction);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <details
      ref={menuRef}
      className="mobile-menu"
      onToggle={(event) => setIsOpen(event.currentTarget.open)}
    >
      <summary
        ref={toggleRef}
        aria-label={isOpen ? "Chiudi il menu" : "Apri il menu"}
        aria-expanded={isOpen}
        aria-controls={navigationId}
      >
        {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </summary>
      <nav id={navigationId} aria-label="Navigazione mobile" onClick={(event) => {
        if (event.target instanceof Element && event.target.closest("a")) closeMenu();
      }}>
        {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        <Link className="header-booking" href={booking.requestUrl}>Prenota</Link>
      </nav>
    </details>
  );
}
