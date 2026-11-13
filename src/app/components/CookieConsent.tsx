"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState, useSyncExternalStore } from "react";

const STORAGE_KEY = "imp-cookie-consent";
const CONSENT_CHANGE_EVENT = "imp:consent-change";
export const OPEN_PREFERENCES_EVENT = "imp:open-cookie-preferences";

// Identifiant Google Analytics existant du site.
const GA_ID = "G-18PPKGV9T3";

type Consent = "accepted" | "refused" | null;

function getSnapshot(): Consent {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    if (value === "accepted" || value === "refused") return value;
  } catch {
    // localStorage indisponible (navigation privée, etc.).
  }
  return null;
}

// Sur le serveur, on ne connaît pas encore le choix : on suppose "non défini".
function getServerSnapshot(): Consent {
  return null;
}

function subscribe(onChange: () => void) {
  window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function persistConsent(value: Exclude<Consent, null>) {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Sans stockage, le choix ne persiste pas — le bandeau réapparaîtra.
  }
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}

export default function CookieConsent() {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [forcedOpen, setForcedOpen] = useState(false);

  useEffect(() => {
    const reopen = () => setForcedOpen(true);
    window.addEventListener(OPEN_PREFERENCES_EVENT, reopen);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, reopen);
  }, []);

  const choose = (value: Exclude<Consent, null>) => {
    persistConsent(value);
    setForcedOpen(false);
  };

  const visible = forcedOpen || consent === null;

  return (
    <>
      {/* Google Analytics chargé UNIQUEMENT après consentement explicite. */}
      {consent === "accepted" ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      ) : null}

      {visible ? (
        <div
          role="dialog"
          aria-live="polite"
          aria-label="Consentement aux cookies"
          className="fixed inset-x-0 bottom-0 z-[100] px-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] sm:px-6 sm:pb-6"
        >
          <div className="mx-auto w-full max-w-[1100px] rounded-2xl border border-line bg-white/95 p-3.5 shadow-[0_22px_60px_rgba(35,48,54,0.22)] backdrop-blur sm:flex sm:items-center sm:gap-6 sm:p-6">
            <p className="text-[12.5px] leading-snug text-ink/75 sm:text-sm sm:leading-relaxed">
              <span className="font-semibold text-ink">Cookies.</span> Google Analytics mesure
              l&apos;audience du site, uniquement avec votre accord.{" "}
              <Link href="/confidentialite" className="font-medium text-deep underline underline-offset-2">
                En savoir plus
              </Link>
            </p>
            <div className="mt-2.5 flex shrink-0 gap-2 sm:mt-0 sm:gap-3">
              <button
                type="button"
                onClick={() => choose("refused")}
                className="tap-target inline-flex flex-1 items-center justify-center rounded-full border border-deep/25 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-deep transition hover:bg-deep/5 sm:flex-none"
              >
                Refuser
              </button>
              <button
                type="button"
                onClick={() => choose("accepted")}
                className="tap-target inline-flex flex-1 items-center justify-center rounded-full bg-deep px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-deep/90 sm:flex-none"
              >
                Accepter
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
