"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const isActive = (pathname: string, href: string) => {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
};

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="h-3 w-3"
    >
      <path d="M5 12h14" strokeLinecap="round" />
      <path d="m13.5 7 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [isHidden, setIsHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);

  const linkClass = (href: string) => {
    const active = isActive(pathname, href);
    return (
      "rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] transition-all duration-200 lg:px-5 lg:text-[11.5px] lg:tracking-[0.26em] " +
      (active
        ? "bg-deep text-white shadow-[0_8px_24px_rgba(36,67,87,0.28)]"
        : "text-ink/62 hover:bg-deep/7 hover:text-ink/90")
    );
  };

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      const isMobile = window.innerWidth < 768;

      setScrolled(current > 24);

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

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/services", label: "Nos services" },
    { href: "/solutions", label: "Nos solutions" },
    { href: "/contact", label: "Contact" },
    { href: "/choose-skis", label: "Choisir ses skis" },
  ];

  return (
    <header
      style={{ paddingTop: "env(safe-area-inset-top)" }}
      className={
        "sticky top-0 z-50 w-full transition-transform duration-300 sm:translate-y-0 " +
        (isHidden ? "-translate-y-[120%]" : "translate-y-0")
      }
    >
      <div className="mx-auto w-full max-w-[1400px] px-2 pt-2 sm:px-6 sm:pt-4">
        <div
          className={
            "overflow-hidden rounded-[26px] border transition-all duration-500 sm:rounded-full " +
            (scrolled
              ? "border-line/55 bg-white/90 shadow-[0_16px_48px_rgba(35,48,54,0.15)] backdrop-blur-xl"
              : "border-line/38 bg-white/78 shadow-[0_10px_32px_rgba(35,48,54,0.1)] backdrop-blur-lg")
          }
        >
          {/* ── Mobile header ── */}
          <div className="flex items-center justify-between px-3 py-2.5 sm:hidden">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/brand/logo-dark-blue.svg"
                alt="InMotion Performance"
                width={220}
                height={64}
                className="h-5.5 w-auto"
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="tap-target inline-flex items-center justify-center gap-2.5 rounded-full border border-deep/18 bg-white px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-deep shadow-[0_6px_18px_rgba(35,48,54,0.1)] transition hover:bg-deep/5"
            >
              {/* Animated hamburger */}
              <span className="flex h-3.5 w-4 flex-col justify-between">
                <span
                  className={
                    "block h-px w-full rounded-full bg-deep transition-all duration-250 " +
                    (mobileOpen ? "translate-y-[6px] rotate-45" : "")
                  }
                />
                <span
                  className={
                    "block h-px w-full rounded-full bg-deep transition-all duration-250 " +
                    (mobileOpen ? "opacity-0 scale-x-0" : "")
                  }
                />
                <span
                  className={
                    "block h-px w-full rounded-full bg-deep transition-all duration-250 " +
                    (mobileOpen ? "-translate-y-[6px] -rotate-45" : "")
                  }
                />
              </span>
              {mobileOpen ? "Fermer" : "Menu"}
            </button>
          </div>

          {mobileOpen && (
            <div className="border-t border-line px-3 pb-4 pt-3 sm:hidden">
              <nav className="grid gap-2">
                {navLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`${linkClass(href)} w-full text-center`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
              </nav>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="btn-shine mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-deep px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white shadow-[0_8px_24px_rgba(36,67,87,0.28)] transition hover:bg-deep/92"
              >
                Réserver un appel
                <ArrowIcon />
              </Link>
            </div>
          )}

          {/* ── Desktop header ── */}
          <div className="hidden items-center justify-between rounded-full px-4 py-2.5 sm:flex md:px-6">
            <Link href="/" className="group flex items-center gap-3">
              <Image
                src="/brand/logo-dark-blue.svg"
                alt="InMotion Performance"
                width={260}
                height={72}
                className="h-6 w-auto transition-opacity duration-200 group-hover:opacity-78 sm:h-7 lg:h-8"
              />
            </Link>

            <nav className="flex items-center gap-1 lg:gap-1.5">
              {navLinks.map(({ href, label }) => (
                <Link key={href} href={href} className={linkClass(href)}>
                  {label}
                </Link>
              ))}
            </nav>

            <Link
              href="/contact"
              className="btn-shine ml-2 inline-flex items-center gap-2 rounded-full bg-deep px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_8px_24px_rgba(36,67,87,0.26)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(36,67,87,0.36)]"
            >
              Réserver un appel
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
