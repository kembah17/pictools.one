import type { Metadata } from "next";
import ImageToBase64 from "@/components/tools/ImageToBase64";
import JsonLd from "@/components/seo/JsonLd";
import AdSlot from "@/components/ui/AdSlot";
import PrivacyBadge from "@/components/ui/PrivacyBadge";

export const metadata: Metadata = {
  title: "Image to Base64 Converter Online Free — Encode & Decode",
  description:
    "Convert images to Base64 encoded strings for embedding in HTML, CSS, or JSON. Also decode Base64 strings back to images. Free and 100% private.",
  keywords: ["image to base64", "base64 encoder", "base64 to image", "base64 converter", "image base64 encode"],
};

export default function ImageToBase64Page() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text dark:text-text-dark">
          Image to Base64 Converter Online Free
        </h1>
        <p className="mt-3 text-lg text-text-light dark:text-text-dark-muted max-w-2xl mx-auto">
          Convert images to Base64 encoded strings for embedding in HTML, CSS, or JSON.
          Also decode Base64 strings back to downloadable images.
        </p>
      </div>

      <PrivacyBadge />

      <div className="mt-6">
        <ImageToBase64 />
      </div>

      <div className="mt-8">
        <AdSlot />
      </div>

      <section className="mt-12 bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-6 sm:p-8 shadow-md" style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}>
        <h2 className="text-2xl font-bold text-text dark:text-text-dark">How to Convert Image to Base64</h2>
        <ol className="mt-4 space-y-3 text-text-light dark:text-text-dark-muted">
          <li><strong className="text-text dark:text-text-dark">1. Upload an image</strong> — Drag and drop or click to select a JPG, PNG, WebP, or AVIF file.</li>
          <li><strong className="text-text dark:text-text-dark">2. Get Base64 string</strong> — The tool instantly generates the Base64 encoded string and data URI.</li>
          <li><strong className="text-text dark:text-text-dark">3. Copy to clipboard</strong> — Click the copy button to copy the full data URI or raw Base64 string.</li>
          <li><strong className="text-text dark:text-text-dark">4. Decode Base64</strong> — Switch to decode mode, paste a Base64 string, and download the resulting image.</li>
        </ol>
        <h3 className="mt-6 text-lg font-semibold text-text dark:text-text-dark">When to Use Base64 Images</h3>
        <p className="mt-2 text-text-light dark:text-text-dark-muted">
          Base64 encoding is useful for embedding small images directly in HTML, CSS, or JSON without separate HTTP requests.
          It is ideal for icons, small logos, and email templates. However, Base64 increases file size by approximately 33%,
          so it is not recommended for large images. For images under 10KB, Base64 embedding can improve page load performance
          by reducing the number of HTTP requests.
        </p>
      </section>

      <div className="mt-8">
        <AdSlot />
      </div>

      <JsonLd
        name="Image to Base64 Converter — Encode & Decode Online Free"
        description="Convert images to Base64 strings and decode Base64 back to images. Free online tool."
        url="/image-to-base64"
      />
    </div>
  );
}
