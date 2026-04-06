"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const isActive = (pathname: string, href: string) => {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
};

export default function SiteHeader() {
  const pathname = usePathname();

  const linkClass = (href: string) => {
    const active = isActive(pathname, href);
    return (
      "rounded-full px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] transition sm:px-4 sm:text-[11px] sm:tracking-[0.25em] lg:px-5 lg:text-[12px] lg:tracking-[0.3em] " +
      (active
        ? "bg-deep text-white shadow-[0_10px_30px_rgba(36,67,87,0.35)]"
        : "text-ink/70 hover:bg-deep/10")
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto w-full max-w-[1400px] px-4 pt-5 sm:px-6 sm:pt-6">
        <div className="flex flex-col gap-3 rounded-[28px] border border-line bg-white/80 px-4 py-3 shadow-[0_16px_40px_rgba(35,48,54,0.12)] backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:rounded-full md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/brand/logo-dark-blue.svg"
              alt="InMotion Performance"
              className="h-6 w-auto sm:h-7 lg:h-8"
            />
          </Link>

          <nav className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:justify-end lg:gap-3">
            <Link href="/" className={linkClass("/")}>Accueil</Link>
            <Link href="/services" className={linkClass("/services")}>
              Nos services
            </Link>
            <Link href="/solutions" className={linkClass("/solutions")}>
              Nos solutions
            </Link>
            <Link href="/contact" className={linkClass("/contact")}>
              Contact
            </Link>
            <Link href="/choose-skis" className={linkClass("/choose-skis")}>
              Choisir ses skis
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
