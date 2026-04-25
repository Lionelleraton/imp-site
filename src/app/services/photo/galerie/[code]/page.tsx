import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import GalleryViewClient from "../GalleryViewClient";
import { PHOTO_GALLERIES } from "@/data/photo-galleries";
import {
  buildPrefixCandidates,
  normalizeGalleryCode,
  normalizeGalleryCodeLoose,
  slugifyPrefix,
} from "@/lib/gallery-code";
import {
  getGallerySessionCookieName,
  verifyGallerySessionToken,
} from "@/lib/security-tokens";

type GalleryPageProps = {
  params: { code: string } | Promise<{ code: string }>;
};

export const dynamicParams = true;

export async function generateStaticParams() {
  return PHOTO_GALLERIES.map((gallery) => ({
    code: gallery.code,
  }));
}

export const metadata: Metadata = {
  title: "Galerie privée",
  description: "Accès à votre galerie photo privée.",
  alternates: {
    canonical: "/services/photo/galerie",
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

function withCodeInManifestUrl(url: string, code: string): string {
  try {
    const parsed = new URL(url, "https://inmotionperformance.com");
    parsed.searchParams.set("code", code);
    parsed.searchParams.set("includeMeta", "1");
    return `${parsed.pathname}${parsed.search}`;
  } catch {
    const prefixes = buildPrefixCandidates(code);
    return `/api/blob/list?prefixes=${encodeURIComponent(prefixes.join(","))}&code=${encodeURIComponent(code)}&includeMeta=1`;
  }
}

function UnauthorizedMessage() {
  return (
    <main className="pb-24">
      <section className="mx-auto w-full max-w-[1200px] px-4 pt-10 sm:px-6 sm:pt-12 xl:px-10">
        <div className="rounded-3xl border border-line bg-white/85 p-8 shadow-[0_18px_50px_rgba(35,48,54,0.1)]">
          <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60">
            Accès requis
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
            Session expirée ou invalide
          </h1>
          <p className="mt-4 text-sm text-ink/70 sm:text-base">
            Pour ouvrir une galerie privée, saisissez à nouveau votre code d’accès.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/services/photo/galerie"
              className="inline-flex items-center justify-center rounded-full bg-deep px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5"
            >
              Entrer mon code
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-deep/20 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-deep transition hover:bg-deep/5"
            >
              Contacter l’équipe
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default async function GalleryPage({ params }: GalleryPageProps) {
  const resolvedParams = await params;
  const rawCode = decodeURIComponent(resolvedParams.code ?? "");
  const normalizedCode = normalizeGalleryCode(rawCode);

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(getGallerySessionCookieName())?.value;
  const session = verifyGallerySessionToken(sessionToken);

  if (!session || !normalizedCode || session.code !== normalizedCode) {
    return <UnauthorizedMessage />;
  }

  const gallery = PHOTO_GALLERIES.find(
    (item) =>
      normalizeGalleryCodeLoose(item.code) === normalizeGalleryCodeLoose(normalizedCode)
  );

  if (!gallery) {
    const fallbackPrefix = slugifyPrefix(rawCode);
    if (fallbackPrefix.length === 0) {
      return (
        <main className="pb-24">
          <section className="mx-auto w-full max-w-[1200px] px-4 pt-10 sm:px-6 sm:pt-12 xl:px-10">
            <div className="rounded-3xl border border-line bg-white/85 p-8 shadow-[0_18px_50px_rgba(35,48,54,0.1)]">
              <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60">
                Code invalide
              </p>
              <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
                Galerie introuvable
              </h1>
              <p className="mt-4 text-sm text-ink/70 sm:text-base">
                Le code saisi ne correspond à aucune galerie. Vérifiez le code reçu
                ou contactez-nous si besoin.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/services/photo/galerie"
                  className="inline-flex items-center justify-center rounded-full bg-deep px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5"
                >
                  Réessayer
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-deep/20 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-deep transition hover:bg-deep/5"
                >
                  Contacter l’équipe
                </Link>
              </div>
            </div>
          </section>
        </main>
      );
    }

    const prefixes = buildPrefixCandidates(normalizedCode);
    const manifestUrl = `/api/blob/list?prefixes=${encodeURIComponent(
      prefixes.join(",")
    )}&code=${encodeURIComponent(normalizedCode)}&includeMeta=1`;

    return (
      <main className="pb-24">
        <section className="mx-auto w-full max-w-[1400px] px-4 pt-10 sm:px-6 sm:pt-12 xl:px-10">
          <div className="rounded-3xl border border-line bg-white/85 p-8 shadow-[0_18px_50px_rgba(35,48,54,0.1)]">
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60">
              Galerie privée
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              Galerie {normalizedCode}
            </h1>
            <p className="mt-4 text-sm text-ink/70 sm:text-base">
              Accès direct à la galerie correspondant au code fourni.
            </p>
            <div className="mt-6">
              <GalleryViewClient manifestUrl={manifestUrl} />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/services/photo/galerie"
                className="inline-flex items-center justify-center rounded-full border border-deep/20 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-deep transition hover:bg-deep/5"
              >
                Entrer un autre code
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-deep px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5"
              >
                Besoin d’aide
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const manifestUrl = gallery.manifest
    ? withCodeInManifestUrl(gallery.manifest, normalizedCode)
    : gallery.folder
      ? `/${gallery.folder}/manifest.json`
      : undefined;

  return (
    <main className="pb-24">
      <section className="mx-auto w-full max-w-[1400px] px-4 pt-10 sm:px-6 sm:pt-12 xl:px-10">
        <div className="rounded-3xl border border-line bg-white/85 p-8 shadow-[0_18px_50px_rgba(35,48,54,0.1)]">
          <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60">
            Galerie privée
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
            {gallery.title}
          </h1>
          {gallery.description ? (
            <p className="mt-4 text-sm text-ink/70 sm:text-base">
              {gallery.description}
            </p>
          ) : null}
          <div className="mt-6">
            <GalleryViewClient
              manifestUrl={manifestUrl}
              initialImages={gallery.images ?? []}
              downloadAllUrl={gallery.downloadZip}
            />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/services/photo/galerie"
              className="inline-flex items-center justify-center rounded-full border border-deep/20 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-deep transition hover:bg-deep/5"
            >
              Entrer un autre code
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-deep px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5"
            >
              Besoin d’aide
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
