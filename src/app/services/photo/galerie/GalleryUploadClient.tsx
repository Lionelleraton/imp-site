"use client";

import { upload } from "@vercel/blob/client";
import { useState } from "react";

export default function GalleryUploadClient() {
  const [prefix, setPrefix] = useState("gala-2026");
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const list = Array.from(event.target.files ?? []);
    setFiles(list);
  };

  const startUpload = async () => {
    if (files.length === 0) return;
    setIsUploading(true);
    setCurrentIndex(0);
    setStatus("Upload en cours…");
    try {
      for (let index = 0; index < files.length; index += 1) {
        const file = files[index];
        setCurrentIndex(index + 1);
        await upload(`${prefix}/${file.name}`, file, {
          access: "public",
          handleUploadUrl: "/api/blob/upload",
        });
      }
      setStatus("Upload terminé.");
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
        Ajouter des photos sur Vercel Blob
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-ink/70">
        Indique le nom de dossier (ex: <span className="font-semibold">gala-2026</span>)
        puis sélectionne tes images. Elles seront envoyées dans Blob.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
        <label className="block text-sm font-semibold text-ink/80">
          Dossier Blob
          <input
            value={prefix}
            onChange={(event) => setPrefix(event.target.value.trim())}
            className="mt-2 w-full rounded-2xl border border-line bg-white/90 px-4 py-3 text-sm text-ink shadow-[0_10px_30px_rgba(35,48,54,0.08)] focus:border-deep/40 focus:outline-none"
          />
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
      </div>

      {status ? (
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm text-ink/70">
            <span>{status}</span>
            {isUploading ? (
              <span className="text-xs text-ink/50">
                {currentIndex}/{files.length}
              </span>
            ) : null}
          </div>
          {isUploading ? (
            <div className="h-2 w-full overflow-hidden rounded-full bg-mist/40">
              <div className="h-full w-1/3 animate-pulse rounded-full bg-deep/70" />
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
