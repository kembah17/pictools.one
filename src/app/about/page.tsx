import type { Metadata } from "next";
import AdSlot from "@/components/ui/AdSlot";

export const metadata: Metadata = {
  title: "About PicTools — Free Online Image Tools",
  description:
    "Learn about PicTools.one — a free suite of online image tools for resizing, compressing, cropping, and converting images. 100% client-side processing.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-text dark:text-text-dark">
        About PicTools
      </h1>

      <div className="mt-6 space-y-6 text-text-light dark:text-text-dark-muted leading-relaxed">
        <p>
          <strong className="text-text dark:text-text-dark">PicTools.one</strong> is a free suite of online image tools
          designed to make image editing fast, simple, and private. Whether you need to resize an image for social media,
          compress photos for your website, crop images to specific dimensions, or convert between image formats — we have
          you covered.
        </p>

        <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-6 shadow-md" style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}>
          <h2 className="text-xl font-bold text-text dark:text-text-dark">🔒 Privacy First</h2>
          <p className="mt-2">
            Every tool on PicTools.one processes your images <strong className="text-text dark:text-text-dark">entirely in your browser</strong>.
            Your files never leave your device — they are never uploaded to any server. This means:
          </p>
          <ul className="mt-3 space-y-2 list-disc list-inside">
            <li>No file uploads to external servers</li>
            <li>No data collection or storage of your images</li>
            <li>No file size limits imposed by server constraints</li>
            <li>Instant processing without network latency</li>
            <li>Works offline once the page is loaded</li>
          </ul>
        </div>

        <h2 className="text-xl font-bold text-text dark:text-text-dark">Our Tools</h2>
        <ul className="space-y-3">
          <li><strong className="text-text dark:text-text-dark">Image Resizer</strong> — Resize images to exact dimensions or social media presets for Instagram, Facebook, Twitter, YouTube, and LinkedIn.</li>
          <li><strong className="text-text dark:text-text-dark">Image Compressor</strong> — Reduce image file sizes while maintaining visual quality. Supports batch compression with adjustable quality settings.</li>
          <li><strong className="text-text dark:text-text-dark">Crop Tool</strong> — Interactively crop images with preset aspect ratios (1:1, 4:3, 16:9, 3:2, 2:3) or free-form cropping.</li>
          <li><strong className="text-text dark:text-text-dark">Format Converter</strong> — Convert images between PNG, JPG, WebP, and AVIF formats with quality control and batch support.</li>
          <li><strong className="text-text dark:text-text-dark">Bulk Resize</strong> — Resize multiple images at once with exact dimensions, percentage scaling, or maximum size constraints. Download all as ZIP.</li>
          <li><strong className="text-text dark:text-text-dark">Image to Base64</strong> — Encode images to Base64 strings for embedding in HTML, CSS, or JSON. Also decode Base64 strings back to images.</li>
        </ul>

        <h2 className="text-xl font-bold text-text dark:text-text-dark">Technology</h2>
        <p>
          PicTools.one is built with modern web technologies including HTML5 Canvas API, Web Workers for
          non-blocking processing, and optimized JavaScript libraries. The site is built with Next.js and
          deployed as a static site, ensuring fast load times and reliable performance worldwide.
        </p>

        <h2 className="text-xl font-bold text-text dark:text-text-dark">Free Forever</h2>
        <p>
          All tools on PicTools.one are completely free to use with no registration required. We sustain the
          site through non-intrusive advertising. There are no premium tiers, no usage limits, and no hidden fees.
        </p>

        <h2 className="text-xl font-bold text-text dark:text-text-dark">Contact</h2>
        <p>
          Have feedback, suggestions, or found a bug? We would love to hear from you.
          Reach out to us at <a href="mailto:hello@pictools.one" className="text-primary hover:text-primary-dark underline">hello@pictools.one</a>.
        </p>
      </div>

      <div className="mt-8">
        <AdSlot />
      </div>
    </div>
  );
}
