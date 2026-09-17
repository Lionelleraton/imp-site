"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const LEGAL_ROUTES = ["/mentions-legales", "/cgu", "/confidentialite"];

export function isLegalRoute(pathname: string | null): boolean {
  if (!pathname) return false;
  return LEGAL_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );
}

/**
 * Masque le chrome clair global (header/footer) sur les pages légales,
 * qui ont leur propre habillage sombre via LegalShell.
 */
export default function HideOnLegalRoutes({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (isLegalRoute(pathname)) return null;
  return <>{children}</>;
}
