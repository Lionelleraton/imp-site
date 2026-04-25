"use client";

import { upload } from "@vercel/blob/client";
import { useCallback, useEffect, useMemo, useState } from "react";

const DEFAULT_PREFIX = "RAE-17";

type FolderStats = {
  count: number;
  totalBytes: number;
};

function sanitizePrefix(raw: string): string {
  return raw.trim().replace(/^\/+/, "").replace(/\/+$/, "");
}

function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 o";
  const units = ["o", "Ko", "Mo", "Go", "To"];
  let value = bytes;
  let index = 0;
  while (value >= 1024 && index < units.length - 1) {
    value /= 1024;
    index += 1;
  }
  const precision = value >= 100 ? 0 : value >= 10 ? 1 : 2;
  return `${value.toFixed(precision)} ${units[index]}`;
}

export default function GalleryUploadClient() {
  const [prefix, setPrefix] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [folderStats, setFolderStats] = useState<FolderStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(false);
  const [statsError, setStatsError] = useState<string | null>(null);

  const effectivePrefix = sanitizePrefix(prefix) || DEFAULT_PREFIX;
  const selectedBytes = useMemo(
    () => files.reduce((sum, file) => sum + file.size, 0),
    [files]
  );

  const onFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const list = Array.from(event.target.files ?? []);
    setFiles(list);
  };

  const refreshFolderStats = useCallback(
    async (targetPrefix: string): Promise<FolderStats | null> => {
      const safePrefix = sanitizePrefix(targetPrefix);
      if (!safePrefix) {
        setFolderStats({ count: 0, totalBytes: 0 });
        return { count: 0, totalBytes: 0 };
      }

      setStatsLoading(true);
      setStatsError(null);
      try {
        const response = await fetch(
          `/api/blob/list?prefix=${encodeURIComponent(`${safePrefix}/`)}&includeMeta=1`,
          { cache: "no-store" }
        );
        const data = (await response.json()) as {
          count?: number;
          totalBytes?: number;
          error?: string;
        };

        if (!response.ok) {
          setStatsError(data.error ?? "Impossible de lire la taille du dossier.");
          return null;
        }

        const stats = {
          count: typeof data.count === "number" ? data.count : 0,
          totalBytes: typeof data.totalBytes === "number" ? data.totalBytes : 0,
        };
        setFolderStats(stats);
        return stats;
      } catch {
        setStatsError("Erreur réseau pendant le calcul de la taille du dossier.");
        return null;
      } finally {
        setStatsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      refreshFolderStats(effectivePrefix);
    }, 250);
    return () => window.clearTimeout(timer);
  }, [effectivePrefix, refreshFolderStats]);

  const startUpload = async () => {
    if (files.length === 0) return;
    const targetPrefix = effectivePrefix;

    setIsUploading(true);
    setCurrentIndex(0);
    setUploadPercent(0);
    setStatus("Upload en cours…");
    try {
      for (let index = 0; index < files.length; index += 1) {
        const file = files[index];
        setCurrentIndex(index + 1);
        const path = `${targetPrefix}/${file.name}`;
        setStatus(`Upload en cours • ${path}`);
        await upload(path, file, {
          access: "public",
          handleUploadUrl: "/api/blob/upload",
          onUploadProgress: (progress) => {
            const ratio =
              (index + progress.percentage / 100) / files.length;
            setUploadPercent(Math.round(ratio * 100));
          },
        });
      }
      setUploadPercent(100);
      const updatedStats = await refreshFolderStats(targetPrefix);
      if (updatedStats) {
        setStatus(
          `Upload terminé • ${updatedStats.count} fichier(s) • ${formatBytes(updatedStats.totalBytes)} dans ${targetPrefix}`
        );
      } else {
        setStatus("Upload terminé.");
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erreur inconnue.";
      setStatus(`Erreur d’upload. ${message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-line bg-white/85 p-6 shadow-[0_18px_50px_rgba(35,48,54,0.1)] sm:p-8">
      <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60">
        Upload galerie
      </p>
      <h1 className="mt-3 text-2xl font-semibold sm:text-3xl">
        Ajouter des photos à la galerie
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-ink/70">
        Indiquez le nom de dossier (ex: <span className="font-semibold">RAE-17</span>)
        puis sélectionnez vos images. Elles seront envoyées dans la galerie.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
        <label className="block text-sm font-semibold text-ink/80">
          Dossier Blob
          <input
            value={prefix}
            onChange={(event) => setPrefix(event.target.value)}
            placeholder={DEFAULT_PREFIX}
            className="mt-2 w-full rounded-2xl border border-line bg-white/90 px-4 py-3 text-sm text-ink shadow-[0_10px_30px_rgba(35,48,54,0.08)] focus:border-deep/40 focus:outline-none"
          />
          <span className="mt-2 block text-xs font-normal text-ink/55">
            Laissez vide pour utiliser automatiquement <strong>{DEFAULT_PREFIX}</strong>.
          </span>
        </label>
        <button
          type="button"
          onClick={startUpload}
          disabled={isUploading || files.length === 0}
          className="inline-flex items-center justify-center rounded-full bg-deep px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isUploading ? "Upload..." : "Lancer l’upload"}
        </button>
      </div>

      <div className="mt-6 rounded-2xl border border-dashed border-line bg-white/70 p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-3">
          <label className="inline-flex cursor-pointer items-center justify-center rounded-full bg-white px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-deep shadow-[0_10px_30px_rgba(35,48,54,0.08)] transition hover:-translate-y-0.5">
            Choisir des fichiers
            <input
              type="file"
              multiple
              accept="image/png,image/jpeg,image/webp"
              onChange={onFilesChange}
              className="hidden"
            />
          </label>
          <span className="text-sm text-ink/60">
            {files.length === 0
              ? "Aucun fichier sélectionné"
              : `${files.length} fichier(s) sélectionné(s)`}
          </span>
        </div>
        <p className="mt-2 text-xs text-ink/50">
          Formats acceptés : JPG, PNG, WebP.
        </p>
        <div className="mt-3 grid gap-1 text-xs text-ink/65 sm:grid-cols-2">
          <p>
            Galerie <span className="font-semibold text-ink">{effectivePrefix}</span> :
            {" "}
            {statsLoading
              ? "calcul en cours…"
              : folderStats
                ? `${folderStats.count} fichier(s) • ${formatBytes(folderStats.totalBytes)}`
                : "taille indisponible"}
          </p>
          <p>
            Sélection actuelle : {files.length} fichier(s) • {formatBytes(selectedBytes)}
          </p>
        </div>
        {statsError ? (
          <p className="mt-2 text-xs text-amber-700">{statsError}</p>
        ) : null}
      </div>

      {status ? (
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm text-ink/70">
            <span className="flex items-center gap-2">
              {status}
              {isUploading ? (
                <span className="upload-dots" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
              ) : null}
            </span>
            {isUploading ? (
              <span className="text-xs text-ink/50">
                {currentIndex}/{files.length}
              </span>
            ) : null}
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-mist/40">
            <div
              className="h-full rounded-full bg-deep/80 transition-all duration-200"
              style={{ width: `${uploadPercent}%` }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
