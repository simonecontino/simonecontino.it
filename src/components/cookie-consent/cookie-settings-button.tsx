"use client";

import { OPEN_COOKIE_SETTINGS_EVENT } from "@/components/cookie-consent/constants";

export function CookieSettingsButton() {
  return (
    <button
      className="footer-cookie-button"
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT))}
    >
      Gestisci cookie
    </button>
  );
}
