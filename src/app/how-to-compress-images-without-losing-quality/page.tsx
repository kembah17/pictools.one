import type { Metadata } from "next";
import Link from "next/link";
import FaqSchema from "@/components/seo/FaqSchema";
import AdSlot from "@/components/ui/AdSlot";

export const metadata: Metadata = {
  title: "How to Compress Images Without Losing Quality — Best Practices",
  description:
    "Learn how to reduce image file sizes while maintaining visual quality. Covers lossy vs lossless compression, optimal quality settings, and format selection.",
  keywords: ["compress image without losing quality", "image compression", "reduce image size", "optimize images", "lossy vs lossless"],
};

const faqs = [
  {
    question: "What is the difference between lossy and lossless compression?",
    answer: "Lossy compression permanently removes some image data to achieve smaller file sizes. JPEG and WebP use lossy compression. Lossless compression reduces file size without removing any data — the original image can be perfectly reconstructed. PNG uses lossless compression. Lossy compression typically achieves 60-80% size reduction, while lossless achieves 10-30%.",
  },
  {
    question: "What quality setting should I use for JPEG compression?",
    answer: "For most purposes, JPEG quality between 80-85% provides the best balance of file size and visual quality. At this range, compression artifacts are virtually invisible to the human eye, while file sizes are typically 60-70% smaller than the original. For print or professional use, stay above 90%. For web thumbnails, 70-75% is usually sufficient.",
  },
  {
    question: "How much can I compress an image before quality loss is visible?",
    answer: "Most images can be compressed by 50-70% before quality loss becomes noticeable. The exact threshold depends on the image content — photographs with smooth gradients show artifacts sooner than images with sharp edges and solid colors. Always preview the compressed result before saving.",
  },
  {
    question: "Which image format has the best compression?",
    answer: "WebP offers the best compression-to-quality ratio for most images, producing files 25-35% smaller than equivalent JPEG files. AVIF is even more efficient but has less browser support. For photographs, WebP or JPEG are best. For graphics with transparency, WebP or PNG are recommended.",
  },
  {
    question: "Does resizing an image reduce file size?",
    answer: "Yes, reducing image dimensions significantly reduces file size. An image resized from 4000×3000 to 2000×1500 will be roughly 75% smaller in file size. Combining dimension reduction with quality compression can reduce file sizes by 90% or more while maintaining acceptable visual quality for web use.",
  },
];

export default function HowToCompressImages() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <article>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text dark:text-text-dark">
          How to Compress Images Without Losing Quality
        </h1>
        <p className="mt-3 text-text-light dark:text-text-dark-muted">
          Published April 2026 • 7 min read
        </p>

        <div className="mt-6 space-y-6 text-text-light dark:text-text-dark-muted leading-relaxed">
          <p>
            Image compression is essential for web performance, email attachments, and storage optimization.
            The challenge is reducing file size without visible quality degradation. This guide explains the
            science behind image compression and provides practical tips for achieving the smallest file sizes
            while maintaining visual quality.
          </p>

          <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 dark:border-primary/30 rounded-xl p-5">
            <p className="font-semibold text-text dark:text-text-dark">
              Quick Tool: Use our free{" "}
              <Link href="/compress-image" className="text-primary hover:text-primary-dark underline">Image Compressor</Link>{" "}
              to reduce image file sizes with adjustable quality settings.
            </p>
          </div>

          <AdSlot />

          <h2 className="text-2xl font-bold text-text dark:text-text-dark">Understanding Image Compression</h2>
          <p>
            Image compression works by identifying and removing redundant data. There are two fundamental approaches:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-5 shadow-md" style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}>
              <h3 className="font-bold text-text dark:text-text-dark">Lossy Compression</h3>
              <ul className="mt-2 space-y-1 text-sm">
                <li>• Permanently removes some data</li>
                <li>• 60-80% size reduction typical</li>
                <li>• Used by: JPEG, WebP, AVIF</li>
                <li>• Best for: photographs, complex images</li>
                <li>• Quality loss at high compression</li>
              </ul>
            </div>
            <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-5 shadow-md" style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}>
              <h3 className="font-bold text-text dark:text-text-dark">Lossless Compression</h3>
              <ul className="mt-2 space-y-1 text-sm">
                <li>• No data is lost</li>
                <li>• 10-30% size reduction typical</li>
                <li>• Used by: PNG, TIFF, BMP</li>
                <li>• Best for: graphics, logos, screenshots</li>
                <li>• Perfect quality preservation</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-text dark:text-text-dark">Optimal Quality Settings by Use Case</h2>
          <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl overflow-hidden shadow-md" style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}>
            <table className="w-full text-sm">
              <thead className="bg-surface-alt dark:bg-surface-dark">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-text dark:text-text-dark">Use Case</th>
                  <th className="px-4 py-3 text-left font-semibold text-text dark:text-text-dark">Quality</th>
                  <th className="px-4 py-3 text-left font-semibold text-text dark:text-text-dark">Typical Reduction</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border dark:divide-border-dark">
                <tr><td className="px-4 py-2">Print / Professional</td><td className="px-4 py-2">90-100%</td><td className="px-4 py-2">10-30%</td></tr>
                <tr><td className="px-4 py-2">High-quality web</td><td className="px-4 py-2">80-90%</td><td className="px-4 py-2">40-60%</td></tr>
                <tr><td className="px-4 py-2">Standard web images</td><td className="px-4 py-2">70-80%</td><td className="px-4 py-2">60-75%</td></tr>
                <tr><td className="px-4 py-2">Thumbnails / previews</td><td className="px-4 py-2">60-70%</td><td className="px-4 py-2">75-85%</td></tr>
                <tr><td className="px-4 py-2">Email attachments</td><td className="px-4 py-2">70-80%</td><td className="px-4 py-2">60-75%</td></tr>
              </tbody>
            </table>
          </div>

          <AdSlot />

          <h2 className="text-2xl font-bold text-text dark:text-text-dark">Step-by-Step Compression Guide</h2>
          <ol className="space-y-4 list-decimal list-inside">
            <li>
              <strong className="text-text dark:text-text-dark">Start with the right dimensions</strong>
              <p className="ml-6 mt-1">Before compressing, resize your image to the actual display dimensions. A 4000×3000 image displayed at 800×600 wastes bandwidth. Resize first, then compress.</p>
            </li>
            <li>
              <strong className="text-text dark:text-text-dark">Choose the right format</strong>
              <p className="ml-6 mt-1">Use JPEG for photographs, PNG for graphics with transparency, and WebP for the best of both worlds. WebP produces files 25-35% smaller than JPEG at equivalent quality.</p>
            </li>
            <li>
              <strong className="text-text dark:text-text-dark">Set quality to 80-85%</strong>
              <p className="ml-6 mt-1">This is the sweet spot for most images. Below 80%, artifacts become noticeable in smooth gradients. Above 85%, file size increases significantly with minimal visual improvement.</p>
            </li>
            <li>
              <strong className="text-text dark:text-text-dark">Compare before and after</strong>
              <p className="ml-6 mt-1">Always preview the compressed result. Our Image Compressor shows before/after file sizes and compression percentages so you can make informed decisions.</p>
            </li>
            <li>
              <strong className="text-text dark:text-text-dark">Test on target devices</strong>
              <p className="ml-6 mt-1">Compression artifacts that are invisible on a desktop monitor may be noticeable on a high-DPI mobile screen. Test your compressed images on the devices your audience uses.</p>
            </li>
          </ol>

          <h2 className="text-2xl font-bold text-text dark:text-text-dark">Advanced Compression Techniques</h2>
          <ul className="space-y-3">
            <li><strong className="text-text dark:text-text-dark">Progressive JPEG</strong> — Loads a low-quality preview first, then progressively improves. Better perceived performance for large images.</li>
            <li><strong className="text-text dark:text-text-dark">Chroma subsampling</strong> — Reduces color data resolution (humans are less sensitive to color than brightness). Used automatically in JPEG compression.</li>
            <li><strong className="text-text dark:text-text-dark">Metadata stripping</strong> — Remove EXIF data (camera info, GPS coordinates) to save 5-20KB per image. Important for privacy too.</li>
            <li><strong className="text-text dark:text-text-dark">Responsive images</strong> — Serve different sizes for different screen sizes using srcset. Combine with compression for maximum savings.</li>
          </ul>

          <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-6 shadow-md" style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}>
            <h2 className="text-xl font-bold text-text dark:text-text-dark">Ready to Compress?</h2>
            <p className="mt-2">
              Try our free image tools for optimal compression:
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <Link href="/compress-image" className="px-4 py-2 bg-primary text-surface rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium">
                Image Compressor
              </Link>
              <Link href="/convert-image" className="px-4 py-2 bg-secondary text-surface rounded-lg hover:bg-secondary/90 transition-colors text-sm font-medium">
                Format Converter
              </Link>
              <Link href="/resize-image" className="px-4 py-2 border border-border dark:border-border-dark text-text dark:text-text-dark rounded-lg hover:bg-surface-alt dark:hover:bg-surface-dark transition-colors text-sm font-medium">
                Image Resizer
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
