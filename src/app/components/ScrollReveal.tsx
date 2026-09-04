"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    nodes.forEach((node) => {
      node.classList.remove("is-visible");
      node.classList.add("reveal-init");
      observer.observe(node);
    });

    // Filet de sécurité: si l'observer ne déclenche pas, on n'affiche jamais une page vide.
    const fallback = window.setTimeout(() => {
      nodes.forEach((node) => node.classList.add("is-visible"));
    }, 900);

    return () => {
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
