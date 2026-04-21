import type { Metadata } from "next";
import ResizeImage from "@/components/tools/ResizeImage";
import JsonLd from "@/components/seo/JsonLd";
import AdSlot from "@/components/ui/AdSlot";
import PrivacyBadge from "@/components/ui/PrivacyBadge";

export const metadata: Metadata = {
  title: "Resize Image Online Free — Change Image Dimensions Instantly",
  description:
    "Resize images to exact dimensions or social media presets. Supports JPG, PNG, WebP, AVIF. Free, fast, and 100% private — no uploads needed.",
  keywords: ["resize image online", "image resizer", "resize photo", "change image size", "resize image for instagram", "resize image for facebook"],
};

export default function ResizeImagePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text dark:text-text-dark">
          Resize Image Online Free
        </h1>
        <p className="mt-3 text-lg text-text-light dark:text-text-dark-muted max-w-2xl mx-auto">
          Change image dimensions to exact pixels or choose from social media presets.
          Supports JPG, PNG, WebP, and AVIF formats.
        </p>
      </div>

      <PrivacyBadge />

      <div className="mt-6">
        <ResizeImage />
      </div>

      <div className="mt-8">
        <AdSlot />
      </div>

      {/* How-to content for SEO */}
      <section className="mt-12 bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-6 sm:p-8 shadow-md" style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}>
        <h2 className="text-2xl font-bold text-text dark:text-text-dark">How to Resize an Image</h2>
        <ol className="mt-4 space-y-3 text-text-light dark:text-text-dark-muted">
          <li><strong className="text-text dark:text-text-dark">1. Upload your image</strong> — Drag and drop or click to select a JPG, PNG, WebP, or AVIF file.</li>
          <li><strong className="text-text dark:text-text-dark">2. Set dimensions</strong> — Enter custom width and height, or choose a social media preset like Instagram (1080×1080) or Facebook (1200×630).</li>
          <li><strong className="text-text dark:text-text-dark">3. Lock aspect ratio</strong> — Toggle the lock to maintain proportions when changing one dimension.</li>
          <li><strong className="text-text dark:text-text-dark">4. Download</strong> — Click the download button to save your resized image instantly.</li>
        </ol>
        <h3 className="mt-6 text-lg font-semibold text-text dark:text-text-dark">Social Media Image Sizes</h3>
        <p className="mt-2 text-text-light dark:text-text-dark-muted">
          Each social platform has optimal image dimensions. Instagram posts work best at 1080×1080 pixels,
          Facebook shared images at 1200×630, Twitter posts at 1600×900, YouTube thumbnails at 1280×720,
          and LinkedIn posts at 1200×627. Our resizer includes all these presets for one-click resizing.
        </p>
      </section>

      <div className="mt-8">
        <AdSlot />
      </div>

      <JsonLd
        name="Image Resizer — Resize Image Online Free"
        description="Resize images to exact dimensions or social media presets. Free online tool with 100% client-side processing."
        url="/resize-image"
      />
    </div>
  );
}
