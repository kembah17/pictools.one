import type { Metadata } from "next";
import ConvertImage from "@/components/tools/ConvertImage";
import JsonLd from "@/components/seo/JsonLd";
import AdSlot from "@/components/ui/AdSlot";
import PrivacyBadge from "@/components/ui/PrivacyBadge";

export const metadata: Metadata = {
  title: "Convert Image Format Online Free — PNG to JPG, WebP, AVIF",
  description:
    "Convert images between PNG, JPG, WebP, and AVIF formats. Batch conversion supported with quality control. Free, fast, and 100% private.",
  keywords: ["convert image", "PNG to JPG", "JPG to WebP", "image converter", "convert PNG to JPG", "WebP converter", "AVIF converter"],
};

export default function ConvertImagePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text dark:text-text-dark">
          Convert Image Format Online Free
        </h1>
        <p className="mt-3 text-lg text-text-light dark:text-text-dark-muted max-w-2xl mx-auto">
          Convert images between PNG, JPG, WebP, and AVIF formats.
          Batch conversion with adjustable quality settings.
        </p>
      </div>

      <PrivacyBadge />

      <div className="mt-6">
        <ConvertImage />
      </div>

      <div className="mt-8">
        <AdSlot />
      </div>

      <section className="mt-12 bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-6 sm:p-8 shadow-md" style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}>
        <h2 className="text-2xl font-bold text-text dark:text-text-dark">How to Convert Image Formats</h2>
        <ol className="mt-4 space-y-3 text-text-light dark:text-text-dark-muted">
          <li><strong className="text-text dark:text-text-dark">1. Upload images</strong> — Drag and drop one or more images in any supported format (JPG, PNG, WebP, AVIF).</li>
          <li><strong className="text-text dark:text-text-dark">2. Choose output format</strong> — Select your target format: PNG for lossless quality, JPG for photos, WebP for best compression, or AVIF for next-gen efficiency.</li>
          <li><strong className="text-text dark:text-text-dark">3. Set quality</strong> — For lossy formats (JPG, WebP, AVIF), adjust the quality slider to balance file size and visual quality.</li>
          <li><strong className="text-text dark:text-text-dark">4. Convert and download</strong> — Click convert to process all images, then download individually or all at once.</li>
        </ol>
        <h3 className="mt-6 text-lg font-semibold text-text dark:text-text-dark">Format Comparison</h3>
        <ul className="mt-2 space-y-2 text-text-light dark:text-text-dark-muted">
          <li><strong className="text-text dark:text-text-dark">PNG</strong> — Lossless compression, supports transparency. Best for graphics, logos, and screenshots.</li>
          <li><strong className="text-text dark:text-text-dark">JPG</strong> — Lossy compression, smallest file size for photos. Universal browser support.</li>
          <li><strong className="text-text dark:text-text-dark">WebP</strong> — Modern format with 25-35% smaller files than JPG. Supports transparency and animation.</li>
          <li><strong className="text-text dark:text-text-dark">AVIF</strong> — Next-generation format with best compression. Growing browser support.</li>
        </ul>
      </section>

      <div className="mt-8">
        <AdSlot />
      </div>

      <JsonLd
        name="Image Format Converter — Convert PNG to JPG, WebP, AVIF"
        description="Convert images between PNG, JPG, WebP, and AVIF formats. Free online batch converter."
        url="/convert-image"
      />
    </div>
  );
}
