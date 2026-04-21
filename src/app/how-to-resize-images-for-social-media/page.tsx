import type { Metadata } from "next";
import Link from "next/link";
import FaqSchema from "@/components/seo/FaqSchema";
import AdSlot from "@/components/ui/AdSlot";

export const metadata: Metadata = {
  title: "How to Resize Images for Social Media — Complete Size Guide 2026",
  description:
    "Complete guide to optimal image sizes for Instagram, Facebook, Twitter, YouTube, LinkedIn, Pinterest, and TikTok. Learn how to resize images for every platform.",
  keywords: ["resize image for social media", "social media image sizes", "Instagram image size", "Facebook image size", "Twitter image size"],
};

const faqs = [
  {
    question: "What is the best image size for Instagram posts?",
    answer: "The optimal image size for Instagram square posts is 1080×1080 pixels. For portrait posts, use 1080×1350 pixels, and for landscape posts, use 1080×566 pixels. Instagram Stories and Reels should be 1080×1920 pixels.",
  },
  {
    question: "What image size should I use for Facebook shared links?",
    answer: "For Facebook shared link images, use 1200×630 pixels. This size ensures your image displays correctly in the news feed without cropping. For Facebook cover photos, use 820×312 pixels on desktop or 640×360 pixels on mobile.",
  },
  {
    question: "How do I resize an image without losing quality?",
    answer: "To resize an image without losing quality, always start with the highest resolution original. Use a tool that supports high-quality resampling (like bicubic interpolation). Avoid upscaling images beyond their original dimensions, as this creates blurriness. Our free Image Resizer tool uses high-quality canvas rendering for the best results.",
  },
  {
    question: "What is the recommended YouTube thumbnail size?",
    answer: "YouTube thumbnails should be 1280×720 pixels with a minimum width of 640 pixels. The file should be under 2MB in JPG, GIF, or PNG format. Use a 16:9 aspect ratio for the best display across all devices.",
  },
  {
    question: "Can I resize multiple images for social media at once?",
    answer: "Yes! Use our Bulk Resize tool to resize multiple images simultaneously. Upload all your images, select a preset size or enter custom dimensions, and download all resized images as a ZIP file. This is perfect for preparing batches of social media content.",
  },
];

export default function HowToResizeForSocialMedia() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <article>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text dark:text-text-dark">
          How to Resize Images for Social Media — Complete Size Guide 2026
        </h1>
        <p className="mt-3 text-text-light dark:text-text-dark-muted">
          Published April 2026 • 8 min read
        </p>

        <div className="mt-6 space-y-6 text-text-light dark:text-text-dark-muted leading-relaxed">
          <p>
            Every social media platform has specific image size requirements. Using the wrong dimensions can result
            in cropped images, blurry photos, or poor engagement. This comprehensive guide covers the optimal image
            sizes for every major platform in 2026, plus tips for resizing images efficiently.
          </p>

          <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 dark:border-primary/30 rounded-xl p-5">
            <p className="font-semibold text-text dark:text-text-dark">
              Quick Tool: Use our free{" "}
              <Link href="/resize-image" className="text-primary hover:text-primary-dark underline">Image Resizer</Link>{" "}
              with built-in social media presets to resize images instantly.
            </p>
          </div>

          <AdSlot />

          <h2 className="text-2xl font-bold text-text dark:text-text-dark">Instagram Image Sizes</h2>
          <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl overflow-hidden shadow-md" style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}>
            <table className="w-full text-sm">
              <thead className="bg-surface-alt dark:bg-surface-dark">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-text dark:text-text-dark">Type</th>
                  <th className="px-4 py-3 text-left font-semibold text-text dark:text-text-dark">Size (px)</th>
                  <th className="px-4 py-3 text-left font-semibold text-text dark:text-text-dark">Ratio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border dark:divide-border-dark">
                <tr><td className="px-4 py-2">Square Post</td><td className="px-4 py-2">1080 × 1080</td><td className="px-4 py-2">1:1</td></tr>
                <tr><td className="px-4 py-2">Portrait Post</td><td className="px-4 py-2">1080 × 1350</td><td className="px-4 py-2">4:5</td></tr>
                <tr><td className="px-4 py-2">Landscape Post</td><td className="px-4 py-2">1080 × 566</td><td className="px-4 py-2">1.91:1</td></tr>
                <tr><td className="px-4 py-2">Stories / Reels</td><td className="px-4 py-2">1080 × 1920</td><td className="px-4 py-2">9:16</td></tr>
                <tr><td className="px-4 py-2">Profile Picture</td><td className="px-4 py-2">320 × 320</td><td className="px-4 py-2">1:1</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            Instagram supports images between 320px and 1080px wide. Images smaller than 320px will be enlarged
            (causing blur), and images larger than 1080px will be compressed. For the best quality, always upload
            at exactly 1080px wide.
          </p>

          <h2 className="text-2xl font-bold text-text dark:text-text-dark">Facebook Image Sizes</h2>
          <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl overflow-hidden shadow-md" style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}>
            <table className="w-full text-sm">
              <thead className="bg-surface-alt dark:bg-surface-dark">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-text dark:text-text-dark">Type</th>
                  <th className="px-4 py-3 text-left font-semibold text-text dark:text-text-dark">Size (px)</th>
                  <th className="px-4 py-3 text-left font-semibold text-text dark:text-text-dark">Ratio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border dark:divide-border-dark">
                <tr><td className="px-4 py-2">Shared Image</td><td className="px-4 py-2">1200 × 630</td><td className="px-4 py-2">1.91:1</td></tr>
                <tr><td className="px-4 py-2">Cover Photo</td><td className="px-4 py-2">820 × 312</td><td className="px-4 py-2">2.63:1</td></tr>
                <tr><td className="px-4 py-2">Profile Picture</td><td className="px-4 py-2">170 × 170</td><td className="px-4 py-2">1:1</td></tr>
                <tr><td className="px-4 py-2">Event Cover</td><td className="px-4 py-2">1200 × 628</td><td className="px-4 py-2">1.91:1</td></tr>
                <tr><td className="px-4 py-2">Stories</td><td className="px-4 py-2">1080 × 1920</td><td className="px-4 py-2">9:16</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            Facebook compresses images during upload. To minimize quality loss, upload PNG files for graphics
            with text, and JPG files at maximum quality for photographs. Keep file sizes under 100KB for the
            sharpest results after Facebook&apos;s compression.
          </p>

          <AdSlot />

          <h2 className="text-2xl font-bold text-text dark:text-text-dark">Twitter / X Image Sizes</h2>
          <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl overflow-hidden shadow-md" style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}>
            <table className="w-full text-sm">
              <thead className="bg-surface-alt dark:bg-surface-dark">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-text dark:text-text-dark">Type</th>
                  <th className="px-4 py-3 text-left font-semibold text-text dark:text-text-dark">Size (px)</th>
                  <th className="px-4 py-3 text-left font-semibold text-text dark:text-text-dark">Ratio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border dark:divide-border-dark">
                <tr><td className="px-4 py-2">In-Stream Image</td><td className="px-4 py-2">1600 × 900</td><td className="px-4 py-2">16:9</td></tr>
                <tr><td className="px-4 py-2">Header Photo</td><td className="px-4 py-2">1500 × 500</td><td className="px-4 py-2">3:1</td></tr>
                <tr><td className="px-4 py-2">Profile Picture</td><td className="px-4 py-2">400 × 400</td><td className="px-4 py-2">1:1</td></tr>
                <tr><td className="px-4 py-2">Card Image</td><td className="px-4 py-2">800 × 418</td><td className="px-4 py-2">1.91:1</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-text dark:text-text-dark">YouTube Image Sizes</h2>
          <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl overflow-hidden shadow-md" style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}>
            <table className="w-full text-sm">
              <thead className="bg-surface-alt dark:bg-surface-dark">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-text dark:text-text-dark">Type</th>
                  <th className="px-4 py-3 text-left font-semibold text-text dark:text-text-dark">Size (px)</th>
                  <th className="px-4 py-3 text-left font-semibold text-text dark:text-text-dark">Ratio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border dark:divide-border-dark">
                <tr><td className="px-4 py-2">Thumbnail</td><td className="px-4 py-2">1280 × 720</td><td className="px-4 py-2">16:9</td></tr>
                <tr><td className="px-4 py-2">Channel Banner</td><td className="px-4 py-2">2560 × 1440</td><td className="px-4 py-2">16:9</td></tr>
                <tr><td className="px-4 py-2">Channel Icon</td><td className="px-4 py-2">800 × 800</td><td className="px-4 py-2">1:1</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-text dark:text-text-dark">LinkedIn Image Sizes</h2>
          <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl overflow-hidden shadow-md" style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}>
            <table className="w-full text-sm">
              <thead className="bg-surface-alt dark:bg-surface-dark">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-text dark:text-text-dark">Type</th>
                  <th className="px-4 py-3 text-left font-semibold text-text dark:text-text-dark">Size (px)</th>
                  <th className="px-4 py-3 text-left font-semibold text-text dark:text-text-dark">Ratio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border dark:divide-border-dark">
                <tr><td className="px-4 py-2">Shared Post</td><td className="px-4 py-2">1200 × 627</td><td className="px-4 py-2">1.91:1</td></tr>
                <tr><td className="px-4 py-2">Company Cover</td><td className="px-4 py-2">1128 × 191</td><td className="px-4 py-2">5.9:1</td></tr>
                <tr><td className="px-4 py-2">Profile Photo</td><td className="px-4 py-2">400 × 400</td><td className="px-4 py-2">1:1</td></tr>
                <tr><td className="px-4 py-2">Blog Post Image</td><td className="px-4 py-2">1200 × 644</td><td className="px-4 py-2">1.86:1</td></tr>
              </tbody>
            </table>
          </div>

          <AdSlot />

          <h2 className="text-2xl font-bold text-text dark:text-text-dark">Tips for Resizing Images</h2>
          <ol className="space-y-3 list-decimal list-inside">
            <li><strong className="text-text dark:text-text-dark">Always start with the highest resolution</strong> — Downscaling preserves quality; upscaling creates blur.</li>
            <li><strong className="text-text dark:text-text-dark">Use the correct aspect ratio</strong> — Mismatched ratios cause awkward cropping on social platforms.</li>
            <li><strong className="text-text dark:text-text-dark">Optimize file size</strong> — After resizing, compress your image to reduce load times without visible quality loss.</li>
            <li><strong className="text-text dark:text-text-dark">Test on mobile</strong> — Most social media is consumed on mobile devices. Preview your images on a phone screen.</li>
            <li><strong className="text-text dark:text-text-dark">Use PNG for text-heavy graphics</strong> — PNG preserves sharp text edges better than JPG compression.</li>
          </ol>

          <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-6 shadow-md" style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}>
            <h2 className="text-xl font-bold text-text dark:text-text-dark">Ready to Resize?</h2>
            <p className="mt-2">
              Use our free tools to get your images ready for any social media platform:
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <Link href="/resize-image" className="px-4 py-2 bg-primary text-surface rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium">
                Image Resizer
              </Link>
              <Link href="/bulk-resize" className="px-4 py-2 bg-secondary text-surface rounded-lg hover:bg-secondary/90 transition-colors text-sm font-medium">
                Bulk Resize
              </Link>
              <Link href="/crop-image" className="px-4 py-2 border border-border dark:border-border-dark text-text dark:text-text-dark rounded-lg hover:bg-surface-alt dark:hover:bg-surface-dark transition-colors text-sm font-medium">
                Crop Tool
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
