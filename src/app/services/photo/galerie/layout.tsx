import type { ReactNode } from "react";
import DarkChrome from "@/app/components/DarkChrome";

// Les galeries clients utilisent le chrome commun (DA claire crème/terracotta),
// comme le reste du site. Le header/footer global est masqué sur ces routes via
// HideOnLegalRoutes (DARK_ROUTES).
export default function GalerieLayout({ children }: { children: ReactNode }) {
  return <DarkChrome>{children}</DarkChrome>;
}
