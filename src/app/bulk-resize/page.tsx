import type { Metadata } from "next";
import BulkResize from "@/components/tools/BulkResize";
import JsonLd from "@/components/seo/JsonLd";
import AdSlot from "@/components/ui/AdSlot";
import PrivacyBadge from "@/components/ui/PrivacyBadge";

export const metadata: Metadata = {
  title: "Bulk Resize Images Online Free — Batch Image Resizer",
  description:
    "Resize multiple images at once. Set target dimensions, scale by percentage, or set max width/height. Download all as ZIP. Free and 100% private.",
  keywords: ["bulk resize images", "batch resize", "resize multiple images", "batch image resizer", "bulk image resize"],
};

export default function BulkResizePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text dark:text-text-dark">
          Bulk Resize Images Online Free
        </h1>
        <p className="mt-3 text-lg text-text-light dark:text-text-dark-muted max-w-2xl mx-auto">
          Resize multiple images at once. Set target dimensions, scale by percentage,
          or set maximum width/height. Download all resized images as a ZIP file.
        </p>
      </div>

      <PrivacyBadge />

      <div className="mt-6">
        <BulkResize />
      </div>

      <div className="mt-8">
        <AdSlot />
      </div>

      <section className="mt-12 bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-6 sm:p-8 shadow-md" style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}>
        <h2 className="text-2xl font-bold text-text dark:text-text-dark">How to Bulk Resize Images</h2>
        <ol className="mt-4 space-y-3 text-text-light dark:text-text-dark-muted">
          <li><strong className="text-text dark:text-text-dark">1. Upload multiple images</strong> — Drag and drop or select multiple JPG, PNG, WebP, or AVIF files at once.</li>
          <li><strong className="text-text dark:text-text-dark">2. Choose resize method</strong> — Set exact dimensions, scale by percentage, or define maximum width/height constraints.</li>
          <li><strong className="text-text dark:text-text-dark">3. Process all</strong> — Click resize to batch process all images. Watch the progress indicator as each file is processed.</li>
          <li><strong className="text-text dark:text-text-dark">4. Download ZIP</strong> — Download all resized images in a single ZIP file for convenience.</li>
        </ol>
        <h3 className="mt-6 text-lg font-semibold text-text dark:text-text-dark">Resize Methods Explained</h3>
        <ul className="mt-2 space-y-2 text-text-light dark:text-text-dark-muted">
          <li><strong className="text-text dark:text-text-dark">Exact Dimensions</strong> — Set specific width and height in pixels. All images will be resized to these exact dimensions.</li>
          <li><strong className="text-text dark:text-text-dark">Percentage Scale</strong> — Scale all images by a percentage (e.g., 50% makes images half their original size).</li>
          <li><strong className="text-text dark:text-text-dark">Max Width/Height</strong> — Set maximum bounds. Images larger than the limit are scaled down proportionally; smaller images remain unchanged.</li>
        </ul>
      </section>

      <div className="mt-8">
        <AdSlot />
      </div>

      <JsonLd
        name="Bulk Image Resizer — Resize Multiple Images Online Free"
        description="Batch resize multiple images at once with ZIP download. Free online tool."
        url="/bulk-resize"
      />
    </div>
  );
}
