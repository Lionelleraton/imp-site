"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";

const links = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/services/photo/galerie", label: "Espace client" },
  { href: "/devis", label: "Faire un devis" },
  { href: "/#contact", label: "Contact" },
];

export default function PhotoMobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="min-[901px]:hidden">
      <button type="button" onClick={() => setOpen(true)} aria-label="Ouvrir le menu" aria-expanded={open} className="flex h-9 w-10 items-center justify-center rounded-lg border border-[#1F2724]/20 text-[#1F2724]">
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 7h18M3 12h18M3 17h18" /></svg>
      </button>
      {open && createPortal(
        <div role="dialog" aria-modal="true" aria-label="Menu de navigation" className="fixed inset-0 z-[10000] flex h-[100dvh] flex-col items-center justify-center gap-1.5 overflow-y-auto bg-[#F4F1E8]/[0.98] px-5 py-20 text-[#1F2724] backdrop-blur-sm">
          <button type="button" onClick={() => setOpen(false)} aria-label="Fermer le menu" className="absolute right-[clamp(20px,5vw,64px)] top-[max(1rem,env(safe-area-inset-top))] flex h-9 w-10 items-center justify-center rounded-lg border border-[#1F2724]/20">
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
          <nav aria-label="Navigation mobile" className="flex flex-col items-center gap-1.5 text-center">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} aria-current={pathname === link.href ? "page" : undefined} className="p-2.5 text-[30px] font-extrabold uppercase leading-normal tracking-[-0.01em] transition-colors hover:text-[#B15F38]">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>, document.body
      )}
    </div>
  );
}
