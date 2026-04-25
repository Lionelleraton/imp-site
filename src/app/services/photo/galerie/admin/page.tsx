import type { Metadata } from "next";
import { cookies } from "next/headers";
import GalleryUploadClient from "../GalleryUploadClient";
import GalleryAdminLoginClient from "../GalleryAdminLoginClient";
import {
  getAdminSessionCookieName,
  verifyAdminSessionToken,
} from "@/lib/security-tokens";

export const metadata: Metadata = {
  title: "Admin galerie",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default async function GalleryAdminPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(getAdminSessionCookieName())?.value;
  const session = verifyAdminSessionToken(sessionToken);

  return (
    <main className="pb-24">
      <section className="mx-auto w-full max-w-[1200px] px-4 pt-10 sm:px-6 sm:pt-12 xl:px-10">
        {session ? <GalleryUploadClient /> : <GalleryAdminLoginClient />}
      </section>
    </main>
  );
}
