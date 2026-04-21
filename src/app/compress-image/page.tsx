import type { Metadata } from "next";
import CompressImage from "@/components/tools/CompressImage";
import JsonLd from "@/components/seo/JsonLd";
import AdSlot from "@/components/ui/AdSlot";
import PrivacyBadge from "@/components/ui/PrivacyBadge";

export const metadata: Metadata = {
  title: "Compress Image Online Free — Reduce Image File Size",
  description:
    "Compress JPG, PNG, and WebP images to reduce file size without losing quality. Batch compression supported. Free, fast, 100% private.",
  keywords: ["compress image", "image compressor", "reduce image size", "compress jpg", "compress png", "optimize image"],
};

export default function CompressImagePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text dark:text-text-dark">
          Compress Image Online Free
        </h1>
        <p className="mt-3 text-lg text-text-light dark:text-text-dark-muted max-w-2xl mx-auto">
          Reduce image file size while maintaining visual quality. Supports batch compression
          for JPG, PNG, and WebP images.
        </p>
      </div>

      <PrivacyBadge />

      <div className="mt-6">
        <CompressImage />
      </div>

      <div className="mt-8">
        <AdSlot />
      </div>

      <section className="mt-12 bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-6 sm:p-8 shadow-md" style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}>
        <h2 className="text-2xl font-bold text-text dark:text-text-dark">How to Compress Images</h2>
        <ol className="mt-4 space-y-3 text-text-light dark:text-text-dark-muted">
          <li><strong className="text-text dark:text-text-dark">1. Upload images</strong> — Drag and drop one or more JPG, PNG, or WebP files.</li>
          <li><strong className="text-text dark:text-text-dark">2. Adjust quality</strong> — Use the quality slider to balance file size and visual quality. Lower values mean smaller files.</li>
          <li><strong className="text-text dark:text-text-dark">3. Compress</strong> — Click compress to process all images. See before/after file sizes and compression percentages.</li>
          <li><strong className="text-text dark:text-text-dark">4. Download</strong> — Download individual compressed images or all at once.</li>
        </ol>
        <h3 className="mt-6 text-lg font-semibold text-text dark:text-text-dark">Compression Tips</h3>
        <p className="mt-2 text-text-light dark:text-text-dark-muted">
          For photographs, JPEG compression at 80-85% quality typically reduces file size by 60-70% with minimal visible difference.
          For graphics with transparency, PNG is best but consider converting to WebP for 25-35% smaller files.
          WebP format offers the best compression-to-quality ratio for most use cases.
        </p>
      </section>

      <div className="mt-8">
        <AdSlot />
      </div>

      <JsonLd
        name="Image Compressor — Compress Image Online Free"
        description="Compress images to reduce file size without losing quality. Free online tool with batch support."
        url="/compress-image"
      />
    </div>
  );
}
