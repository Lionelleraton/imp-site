import GalleryUploadClient from "../GalleryUploadClient";

export default function GalleryAdminPage() {
  return (
    <main className="pb-24">
      <section className="mx-auto w-full max-w-[1200px] px-4 pt-10 sm:px-6 sm:pt-12 xl:px-10">
        <GalleryUploadClient />
      </section>
    </main>
  );
}
