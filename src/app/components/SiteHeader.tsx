"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const isActive = (pathname: string, href: string) => {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
};

export default function SiteHeader() {
  const pathname = usePathname();
  const [isHidden, setIsHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

  const linkClass = (href: string) => {
    const active = isActive(pathname, href);
    return (
      "rounded-full px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] transition sm:px-4 sm:text-[11px] sm:tracking-[0.25em] lg:px-5 lg:text-[12px] lg:tracking-[0.3em] " +
      (active
        ? "bg-deep text-white shadow-[0_10px_30px_rgba(36,67,87,0.35)]"
        : "text-ink/70 hover:bg-deep/10")
    );
  };

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      const isMobile = window.innerWidth < 768;

      if (!isMobile) {
        if (isHidden) setIsHidden(false);
        lastScrollY.current = current;
        return;
      }

      if (current < 40) {
        if (isHidden) setIsHidden(false);
        lastScrollY.current = current;
        return;
      }

      const prev = lastScrollY.current;
      if (current > prev + 10) {
        setIsHidden(true);
        setMobileOpen(false);
      } else if (current < prev - 10) {
        setIsHidden(false);
      }
      lastScrollY.current = current;
    };

    const onResize = () => {
      if (window.innerWidth >= 768) setIsHidden(false);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [isHidden]);

  return (
    <header
      className={
        "sticky top-0 z-50 w-full transition-transform duration-300 sm:translate-y-0 " +
        (isHidden ? "-translate-y-[120%]" : "translate-y-0")
      }
    >
      <div className="mx-auto w-full max-w-[1400px] px-3 pt-3 sm:px-6 sm:pt-6">
        <div className="rounded-[26px] border border-line bg-white/80 shadow-[0_16px_40px_rgba(35,48,54,0.12)] backdrop-blur">
          {/* Mobile header */}
          <div className="flex items-center justify-between px-3 py-2 sm:hidden">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/brand/logo-dark-blue.svg"
                alt="InMotion Performance"
                className="h-6 w-auto"
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="inline-flex items-center justify-center rounded-full border border-deep/15 bg-white px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-deep shadow-[0_8px_20px_rgba(35,48,54,0.12)]"
            >
              {mobileOpen ? "Fermer" : "Menu"}
            </button>
          </div>

          {mobileOpen ? (
            <div className="border-t border-line px-3 pb-3 pt-2 sm:hidden">
              <nav className="grid gap-2">
                <Link
                  href="/"
                  className={linkClass("/")}
                  onClick={() => setMobileOpen(false)}
                >
                  Accueil
                </Link>
                <Link
                  href="/services"
                  className={linkClass("/services")}
                  onClick={() => setMobileOpen(false)}
                >
                  Nos services
                </Link>
                <Link
                  href="/solutions"
                  className={linkClass("/solutions")}
                  onClick={() => setMobileOpen(false)}
                >
                  Nos solutions
                </Link>
                <Link
                  href="/contact"
                  className={linkClass("/contact")}
                  onClick={() => setMobileOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  href="/choose-skis"
                  className={linkClass("/choose-skis")}
                  onClick={() => setMobileOpen(false)}
                >
                  Choisir ses skis
                </Link>
              </nav>
            </div>
          ) : null}

          {/* Desktop header */}
          <div className="hidden items-center justify-between rounded-full px-4 py-3 sm:flex md:px-6">
            <Link href="/" className="flex items-center gap-3">
              <img
                src="/brand/logo-dark-blue.svg"
                alt="InMotion Performance"
                className="h-6 w-auto sm:h-7 lg:h-8"
              />
            </Link>
            <nav className="flex items-center gap-2 lg:gap-3">
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
      </div>
    </header>
  );
}
