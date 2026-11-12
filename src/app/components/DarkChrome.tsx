import Link from "next/link";
import Image from "next/image";
import { Archivo, Space_Mono } from "next/font/google";
import type { ReactNode } from "react";
import CookiePreferencesButton from "./CookiePreferencesButton";

// Typographie de la DA sombre (cf. public/home.html) : Archivo + Space Mono.
export const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});
export const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"] });

const navLinks = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/services/photo/galerie", label: "Espace client" },
  { href: "/#contact", label: "Contact" },
];

const legalLinks = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/cgu", label: "CGU" },
  { href: "/confidentialite", label: "Confidentialité" },
];

/**
 * Habillage sombre (header + footer) commun aux pages App Router alignées sur
 * la nouvelle DA photo (Tarifs, pages légales). Le header/footer clairs globaux
 * sont masqués sur ces routes via HideOnDarkRoutes.
 */
export default function DarkChrome({ children }: { children: ReactNode }) {
  return (
    <div className={`${archivo.className} min-h-screen bg-[#F4F1E8] text-[#1F2724]`}>
      <header className="sticky top-0 z-40 border-b border-[rgba(31,39,36,0.12)] bg-[#F4F1E8]/85 backdrop-blur">
        <div className="mx-auto flex h-[70px] max-w-[1300px] items-center justify-between px-[clamp(20px,5vw,64px)]">
          <Link href="/" aria-label="InMotion Performance, accueil" className="flex items-center">
            <Image
              src="/brand/logo-black.svg"
              alt="InMotion Performance"
              width={200}
              height={34}
              className="h-6 w-auto"
              priority
            />
          </Link>
          <div className="flex items-center gap-5 sm:gap-6">
            <nav
              className={`${spaceMono.className} hidden items-center gap-6 text-[12px] uppercase tracking-[0.13em] min-[901px]:flex`}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[#5E655D] transition hover:text-[#1F2724]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/devis"
              className={`${spaceMono.className} hidden whitespace-nowrap rounded-full bg-[#9E5230] px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#FBF9F3] shadow-[0_6px_18px_rgba(31,39,36,0.2)] transition hover:-translate-y-px hover:bg-[#8A4A2B] min-[901px]:inline-flex`}
            >
              Faire un devis
            </Link>
            <details className="relative min-[901px]:hidden">
              <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-lg border border-[#1F2724]/20 text-[#1F2724] [&::-webkit-details-marker]:hidden" aria-label="Ouvrir le menu">
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 7h18M3 12h18M3 17h18" /></svg>
              </summary>
              <nav className={`${spaceMono.className} absolute right-0 top-12 z-50 flex w-52 flex-col gap-4 rounded-xl border border-[#1F2724]/10 bg-[#F4F1E8] p-5 text-xs uppercase tracking-[0.13em] text-[#1F2724] shadow-xl`} aria-label="Navigation mobile">
                {navLinks.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
                <Link href="/devis">Faire un devis</Link>
              </nav>
            </details>
          </div>
        </div>
      </header>

      {children}

      <footer className="border-t border-[rgba(31,39,36,0.12)] bg-[#F4F1E8]">
        <div className="mx-auto flex max-w-[1300px] flex-col gap-6 px-[clamp(20px,5vw,64px)] py-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Image
              src="/brand/logo-black.svg"
              alt="InMotion Performance"
              width={200}
              height={34}
              className="h-5 w-auto"
            />
            <p
              className={`${spaceMono.className} mt-3 text-[11px] uppercase tracking-[0.13em] text-[#8A8475]`}
            >
              © {new Date().getFullYear()} InMotion Performance · Chamonix Mont-Blanc
            </p>
          </div>
          <nav
            className={`${spaceMono.className} flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] uppercase tracking-[0.13em]`}
          >
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#5E655D] transition hover:text-[#1F2724]"
              >
                {link.label}
              </Link>
            ))}
            <CookiePreferencesButton className="uppercase tracking-[0.13em] text-[#5E655D] transition hover:text-[#1F2724]" />
          </nav>
        </div>
      </footer>
    </div>
  );
}
