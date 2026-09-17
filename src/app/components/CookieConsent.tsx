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
          className="fixed inset-x-0 bottom-0 z-[100] px-3 pb-3 sm:px-6 sm:pb-6"
        >
          <div className="mx-auto w-full max-w-[1100px] rounded-2xl border border-line bg-white/95 p-5 shadow-[0_22px_60px_rgba(35,48,54,0.22)] backdrop-blur sm:flex sm:items-center sm:gap-6 sm:p-6">
            <div className="text-sm leading-relaxed text-ink/75">
              <p className="font-semibold text-ink">On respecte ta vie privée.</p>
              <p className="mt-1">
                On aimerait mesurer l&apos;audience du site avec Google Analytics
                (dépôt de cookies) pour l&apos;améliorer. Rien n&apos;est chargé sans
                ton accord, et aucune donnée n&apos;est revendue. Détails dans la{" "}
                <Link
                  href="/confidentialite"
                  className="font-medium text-deep underline underline-offset-2"
                >
                  politique de confidentialité
                </Link>
                .
              </p>
            </div>
            <div className="mt-4 flex shrink-0 gap-3 sm:mt-0">
              <button
                type="button"
                onClick={() => choose("refused")}
                className="tap-target inline-flex flex-1 items-center justify-center rounded-full border border-deep/25 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-deep transition hover:bg-deep/5 sm:flex-none"
              >
                Refuser
              </button>
              <button
                type="button"
                onClick={() => choose("accepted")}
                className="tap-target inline-flex flex-1 items-center justify-center rounded-full bg-deep px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-deep/90 sm:flex-none"
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
