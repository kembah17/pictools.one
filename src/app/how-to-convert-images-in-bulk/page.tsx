import type { Metadata } from "next";
import Link from "next/link";
import FaqSchema from "@/components/seo/FaqSchema";
import AdSlot from "@/components/ui/AdSlot";

export const metadata: Metadata = {
  title: "How to Convert Images in Bulk — Batch Image Conversion Guide",
  description:
    "Learn how to convert multiple images between formats at once. Covers batch PNG to JPG, WebP conversion, and bulk image processing best practices.",
  keywords: ["convert images in bulk", "batch image conversion", "bulk convert PNG to JPG", "batch image converter", "convert multiple images"],
};

const faqs = [
  {
    question: "How do I convert multiple images to JPG at once?",
    answer: "Use our free Format Converter tool: drag and drop all your images, select JPG as the output format, adjust the quality slider, and click Convert All. You can then download each converted image individually. For resizing multiple images, use our Bulk Resize tool which supports ZIP downloads.",
  },
  {
    question: "Can I batch convert PNG to WebP?",
    answer: "Yes! Our Format Converter supports batch conversion between PNG, JPG, WebP, and AVIF. Upload multiple PNG files at once, select WebP as the target format, set your desired quality level, and convert all files simultaneously. WebP files will be 25-35% smaller than the original PNGs.",
  },
  {
    question: "Is batch image conversion safe for my files?",
    answer: "Absolutely. Our tools process all images 100% in your browser using client-side JavaScript. Your files never leave your device — they are never uploaded to any server. This makes batch conversion completely private and secure.",
  },
  {
    question: "What is the fastest way to resize and convert many images?",
    answer: "For the fastest workflow: first use our Bulk Resize tool to resize all images to your target dimensions, download the ZIP file, then use the Format Converter to batch convert to your desired format. Alternatively, if you only need to resize, the Bulk Resize tool handles everything in one step with ZIP download.",
  },
  {
    question: "How many images can I convert at once?",
    answer: "Since all processing happens in your browser, the limit depends on your device's memory and processing power. Most modern devices can handle 50-100 images without issues. For very large batches (500+ images), we recommend processing in groups of 50-100 for the best performance.",
  },
];

export default function HowToConvertInBulk() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <article>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text dark:text-text-dark">
          How to Convert Images in Bulk — Batch Image Conversion Guide
        </h1>
        <p className="mt-3 text-text-light dark:text-text-dark-muted">
          Published April 2026 • 6 min read
        </p>

        <div className="mt-6 space-y-6 text-text-light dark:text-text-dark-muted leading-relaxed">
          <p>
            Whether you are migrating a website to WebP, preparing product images for an e-commerce platform,
            or standardizing image formats across a project, batch image conversion saves hours of manual work.
            This guide covers everything you need to know about converting multiple images efficiently.
          </p>

          <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 dark:border-primary/30 rounded-xl p-5">
            <p className="font-semibold text-text dark:text-text-dark">
              Quick Tools: Use our free{" "}
              <Link href="/convert-image" className="text-primary hover:text-primary-dark underline">Format Converter</Link>{" "}
              for batch format conversion or{" "}
              <Link href="/bulk-resize" className="text-primary hover:text-primary-dark underline">Bulk Resize</Link>{" "}
              for batch resizing with ZIP download.
            </p>
          </div>

          <AdSlot />

          <h2 className="text-2xl font-bold text-text dark:text-text-dark">Why Convert Images in Bulk?</h2>
          <ul className="space-y-3">
            <li><strong className="text-text dark:text-text-dark">Website migration to WebP</strong> — Converting your entire image library to WebP can reduce page load times by 25-35% and improve Core Web Vitals scores.</li>
            <li><strong className="text-text dark:text-text-dark">E-commerce product images</strong> — Online stores often require specific formats and dimensions. Batch conversion ensures consistency across hundreds of product images.</li>
            <li><strong className="text-text dark:text-text-dark">Social media content</strong> — Preparing images for multiple platforms requires different formats and sizes. Batch processing streamlines the workflow.</li>
            <li><strong className="text-text dark:text-text-dark">Archive standardization</strong> — Converting mixed-format image libraries to a single format simplifies storage and management.</li>
            <li><strong className="text-text dark:text-text-dark">Email campaigns</strong> — Email clients have varying format support. Converting to universally supported JPG ensures consistent rendering.</li>
          </ul>

          <h2 className="text-2xl font-bold text-text dark:text-text-dark">Step-by-Step: Batch Convert Images Online</h2>
          <div className="space-y-4">
            <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-5 shadow-md" style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}>
              <h3 className="font-bold text-text dark:text-text-dark">Step 1: Upload Your Images</h3>
              <p className="mt-2">
                Open our <Link href="/convert-image" className="text-primary hover:text-primary-dark underline">Format Converter</Link> and
                drag and drop all the images you want to convert. You can select multiple files at once from your file browser.
                Supported input formats include JPG, PNG, WebP, and AVIF.
              </p>
            </div>

            <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-5 shadow-md" style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}>
              <h3 className="font-bold text-text dark:text-text-dark">Step 2: Choose Output Format</h3>
              <p className="mt-2">
                Select your target format from the available options: JPG, PNG, or WebP. Each format has different
                characteristics — see our <Link href="/webp-vs-png-vs-jpg-which-format-to-use" className="text-primary hover:text-primary-dark underline">format comparison guide</Link> for
                help choosing the right one.
              </p>
            </div>

            <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-5 shadow-md" style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}>
              <h3 className="font-bold text-text dark:text-text-dark">Step 3: Adjust Quality Settings</h3>
              <p className="mt-2">
                For lossy formats (JPG, WebP), use the quality slider to balance file size and visual quality.
                We recommend 80-85% for web images and 90-95% for print or professional use. PNG conversion
                is always lossless, so no quality setting is needed.
              </p>
            </div>

            <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-5 shadow-md" style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}>
              <h3 className="font-bold text-text dark:text-text-dark">Step 4: Convert and Download</h3>
              <p className="mt-2">
                Click &quot;Convert All&quot; to process all images simultaneously. The tool shows progress for each file.
                Once complete, download each converted image individually. For bulk resize operations, our
                <Link href="/bulk-resize" className="text-primary hover:text-primary-dark underline"> Bulk Resize tool</Link> offers
                ZIP download for convenience.
              </p>
            </div>
          </div>

          <AdSlot />

          <h2 className="text-2xl font-bold text-text dark:text-text-dark">Common Batch Conversion Scenarios</h2>

          <h3 className="text-lg font-semibold text-text dark:text-text-dark">PNG to JPG (Reduce File Size)</h3>
          <p>
            Converting PNG photographs to JPG typically reduces file size by 80-90%. This is the most common
            batch conversion for websites and email. Set JPG quality to 85% for the best balance.
            Note that transparency will be lost — transparent areas become white.
          </p>

          <h3 className="text-lg font-semibold text-text dark:text-text-dark">JPG to WebP (Modern Web Optimization)</h3>
          <p>
            Converting JPG to WebP reduces file sizes by an additional 25-35% beyond JPG compression.
            This is ideal for website optimization. WebP is supported by 97%+ of browsers, making it
            safe for production use. Set WebP quality to match your original JPG quality.
          </p>

          <h3 className="text-lg font-semibold text-text dark:text-text-dark">Mixed Formats to PNG (Lossless Archive)</h3>
          <p>
            When you need to preserve maximum quality for archival purposes, converting all images to PNG
            ensures lossless storage. File sizes will be larger, but no quality is lost. This is ideal
            for design assets, logos, and graphics that may need future editing.
          </p>

          <h2 className="text-2xl font-bold text-text dark:text-text-dark">Best Practices for Batch Conversion</h2>
          <ol className="space-y-3 list-decimal list-inside">
            <li><strong className="text-text dark:text-text-dark">Keep originals</strong> — Always maintain a backup of your original images before batch converting, especially when using lossy formats.</li>
            <li><strong className="text-text dark:text-text-dark">Test with a sample</strong> — Convert a few representative images first to verify quality settings before processing the entire batch.</li>
            <li><strong className="text-text dark:text-text-dark">Match quality to purpose</strong> — Web thumbnails need less quality (70-80%) than hero images (85-95%). Adjust settings per batch.</li>
            <li><strong className="text-text dark:text-text-dark">Consider dimensions too</strong> — If your images are oversized, resize them before or during conversion. Our Bulk Resize tool handles both.</li>
            <li><strong className="text-text dark:text-text-dark">Process in manageable batches</strong> — For very large collections (500+ images), process in groups of 50-100 for optimal browser performance.</li>
          </ol>

          <h2 className="text-2xl font-bold text-text dark:text-text-dark">Combining Resize and Convert</h2>
          <p>
            For the most efficient workflow when you need both resizing and format conversion:
          </p>
          <ol className="space-y-2 list-decimal list-inside">
            <li>Use <Link href="/bulk-resize" className="text-primary hover:text-primary-dark underline">Bulk Resize</Link> to resize all images to target dimensions</li>
            <li>Download the ZIP file of resized images</li>
            <li>Upload the resized images to <Link href="/convert-image" className="text-primary hover:text-primary-dark underline">Format Converter</Link></li>
            <li>Convert to your desired format and download</li>
          </ol>
          <p>
            This two-step process ensures you get both the right dimensions and the right format with optimal quality.
          </p>

          <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-6 shadow-md" style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}>
            <h2 className="text-xl font-bold text-text dark:text-text-dark">Start Converting</h2>
            <p className="mt-2">
              Try our free batch image tools:
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <Link href="/convert-image" className="px-4 py-2 bg-primary text-surface rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium">
                Format Converter
              </Link>
              <Link href="/bulk-resize" className="px-4 py-2 bg-secondary text-surface rounded-lg hover:bg-secondary/90 transition-colors text-sm font-medium">
                Bulk Resize
              </Link>
              <Link href="/compress-image" className="px-4 py-2 border border-border dark:border-border-dark text-text dark:text-text-dark rounded-lg hover:bg-surface-alt dark:hover:bg-surface-dark transition-colors text-sm font-medium">
                Image Compressor
              </Link>
            </div>
          </div>
        </div>
      </article>

      <div className="mt-8">
        <AdSlot />
      </div>

      <FaqSchema faqs={faqs} />
    </div>
  );
}
