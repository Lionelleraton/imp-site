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
  { href: "/", label: "Accueil" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/tarifs", label: "Tarifs" },
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
        <div className="mx-auto flex h-[64px] max-w-[1100px] items-center justify-between px-5 sm:px-6">
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
          <nav
            className={`${spaceMono.className} hidden items-center gap-6 text-[12px] uppercase tracking-[0.13em] sm:flex`}
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
        </div>
      </header>

      {children}

      <footer className="border-t border-[rgba(31,39,36,0.12)] bg-[#F4F1E8]">
        <div className="mx-auto flex max-w-[1100px] flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
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
