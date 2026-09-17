"use client";

import { OPEN_PREFERENCES_EVENT } from "./CookieConsent";

export default function CookiePreferencesButton({
  className,
}: {
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT))}
      className={className}
    >
      Gérer les cookies
    </button>
  );
}
