"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// Routes qui utilisent la DA sombre (chrome dédié via DarkChrome) : le
// header/footer clairs globaux y sont masqués.
const DARK_ROUTES = [
  "/mentions-legales",
  "/cgu",
  "/confidentialite",
  "/tarifs",
  "/devis",
];

export function isDarkRoute(pathname: string | null): boolean {
  if (!pathname) return false;
  return DARK_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );
}

/**
 * Masque le chrome clair global (header/footer) sur les pages en DA sombre,
 * qui ont leur propre habillage via DarkChrome.
 */
export default function HideOnLegalRoutes({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (isDarkRoute(pathname)) return null;
  return <>{children}</>;
}
