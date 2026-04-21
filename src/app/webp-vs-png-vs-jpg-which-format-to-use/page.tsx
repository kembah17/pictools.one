import type { Metadata } from "next";
import Link from "next/link";
import FaqSchema from "@/components/seo/FaqSchema";
import AdSlot from "@/components/ui/AdSlot";

export const metadata: Metadata = {
  title: "WebP vs PNG vs JPG — Which Image Format Should You Use?",
  description:
    "Comprehensive comparison of WebP, PNG, JPG, and AVIF image formats. Learn when to use each format for the best quality, file size, and browser compatibility.",
  keywords: ["WebP vs PNG", "WebP vs JPG", "PNG vs JPG", "image format comparison", "best image format", "WebP format"],
};

const faqs = [
  {
    question: "Is WebP better than JPG?",
    answer: "WebP generally produces 25-35% smaller files than JPG at equivalent visual quality. WebP also supports transparency (like PNG) and animation (like GIF). However, JPG has universal support across all browsers and software, while WebP support, though now widespread, may not work in older applications. For web use, WebP is the better choice in most cases.",
  },
  {
    question: "When should I use PNG instead of JPG?",
    answer: "Use PNG when you need transparency (alpha channel), when your image contains text, logos, or sharp edges that would blur with JPG compression, or when you need lossless quality. Use JPG for photographs and complex images where small file size is more important than pixel-perfect quality.",
  },
  {
    question: "What is AVIF and should I use it?",
    answer: "AVIF (AV1 Image File Format) is a next-generation image format that offers 50% better compression than JPG and 20% better than WebP. It supports HDR, wide color gamut, and transparency. However, browser support is still growing — Chrome, Firefox, and Safari support it, but some older browsers do not. Use AVIF with JPG or WebP fallbacks for the best results.",
  },
  {
    question: "Which image format is best for websites?",
    answer: "For most websites, WebP is the best default format — it offers excellent compression, supports transparency, and has broad browser support (97%+). Use PNG for images requiring lossless quality or when WebP is not supported. Use JPG as a universal fallback. Consider AVIF for cutting-edge optimization with appropriate fallbacks.",
  },
  {
    question: "Does converting PNG to JPG reduce quality?",
    answer: "Yes, converting PNG to JPG involves lossy compression, which permanently removes some image data. The quality loss depends on the JPG quality setting — at 90-95%, the difference is barely noticeable for photographs. However, images with text, sharp edges, or transparency will show noticeable degradation. For such images, consider WebP instead of JPG.",
  },
];

export default function WebpVsPngVsJpg() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <article>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text dark:text-text-dark">
          WebP vs PNG vs JPG — Which Image Format Should You Use?
        </h1>
        <p className="mt-3 text-text-light dark:text-text-dark-muted">
          Published April 2026 • 10 min read
        </p>

        <div className="mt-6 space-y-6 text-text-light dark:text-text-dark-muted leading-relaxed">
          <p>
            Choosing the right image format can significantly impact your website&apos;s performance, visual quality,
            and user experience. With modern formats like WebP and AVIF joining the established PNG and JPG,
            the decision has become more nuanced. This guide provides a comprehensive comparison to help you
            make the right choice for every situation.
          </p>

          <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 dark:border-primary/30 rounded-xl p-5">
            <p className="font-semibold text-text dark:text-text-dark">
              Quick Tool: Use our free{" "}
              <Link href="/convert-image" className="text-primary hover:text-primary-dark underline">Format Converter</Link>{" "}
              to convert images between PNG, JPG, WebP, and AVIF instantly.
            </p>
          </div>

          <AdSlot />

          <h2 className="text-2xl font-bold text-text dark:text-text-dark">Format Comparison at a Glance</h2>
          <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl overflow-hidden shadow-md overflow-x-auto" style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}>
            <table className="w-full text-sm">
              <thead className="bg-surface-alt dark:bg-surface-dark">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-text dark:text-text-dark">Feature</th>
                  <th className="px-4 py-3 text-left font-semibold text-text dark:text-text-dark">JPG</th>
                  <th className="px-4 py-3 text-left font-semibold text-text dark:text-text-dark">PNG</th>
                  <th className="px-4 py-3 text-left font-semibold text-text dark:text-text-dark">WebP</th>
                  <th className="px-4 py-3 text-left font-semibold text-text dark:text-text-dark">AVIF</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border dark:divide-border-dark">
                <tr><td className="px-4 py-2 font-medium text-text dark:text-text-dark">Compression</td><td className="px-4 py-2">Lossy</td><td className="px-4 py-2">Lossless</td><td className="px-4 py-2">Both</td><td className="px-4 py-2">Both</td></tr>
                <tr><td className="px-4 py-2 font-medium text-text dark:text-text-dark">Transparency</td><td className="px-4 py-2">❌</td><td className="px-4 py-2">✅</td><td className="px-4 py-2">✅</td><td className="px-4 py-2">✅</td></tr>
                <tr><td className="px-4 py-2 font-medium text-text dark:text-text-dark">Animation</td><td className="px-4 py-2">❌</td><td className="px-4 py-2">APNG</td><td className="px-4 py-2">✅</td><td className="px-4 py-2">✅</td></tr>
                <tr><td className="px-4 py-2 font-medium text-text dark:text-text-dark">File Size</td><td className="px-4 py-2">Small</td><td className="px-4 py-2">Large</td><td className="px-4 py-2">Smallest</td><td className="px-4 py-2">Smallest</td></tr>
                <tr><td className="px-4 py-2 font-medium text-text dark:text-text-dark">Browser Support</td><td className="px-4 py-2">100%</td><td className="px-4 py-2">100%</td><td className="px-4 py-2">97%+</td><td className="px-4 py-2">93%+</td></tr>
                <tr><td className="px-4 py-2 font-medium text-text dark:text-text-dark">Best For</td><td className="px-4 py-2">Photos</td><td className="px-4 py-2">Graphics</td><td className="px-4 py-2">Everything</td><td className="px-4 py-2">Everything</td></tr>
                <tr><td className="px-4 py-2 font-medium text-text dark:text-text-dark">Color Depth</td><td className="px-4 py-2">24-bit</td><td className="px-4 py-2">48-bit</td><td className="px-4 py-2">32-bit</td><td className="px-4 py-2">36-bit+</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-text dark:text-text-dark">JPG (JPEG) — The Universal Standard</h2>
          <p>
            JPEG has been the dominant image format since 1992. It uses lossy compression optimized for photographs
            and natural images with smooth color gradients.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-4 shadow-sm">
              <h4 className="font-bold text-text dark:text-text-dark text-sm">✅ Strengths</h4>
              <ul className="mt-2 space-y-1 text-sm">
                <li>• Universal browser and software support</li>
                <li>• Excellent for photographs</li>
                <li>• Small file sizes at good quality</li>
                <li>• Progressive loading support</li>
              </ul>
            </div>
            <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-4 shadow-sm">
              <h4 className="font-bold text-text dark:text-text-dark text-sm">❌ Weaknesses</h4>
              <ul className="mt-2 space-y-1 text-sm">
                <li>• No transparency support</li>
                <li>• Visible artifacts at low quality</li>
                <li>• Poor for text and sharp edges</li>
                <li>• Quality degrades with each re-save</li>
              </ul>
            </div>
          </div>
          <p>
            <strong className="text-text dark:text-text-dark">Use JPG when:</strong> You have photographs or complex images,
            need maximum compatibility, and don&apos;t need transparency.
          </p>

          <AdSlot />

          <h2 className="text-2xl font-bold text-text dark:text-text-dark">PNG — Lossless Quality with Transparency</h2>
          <p>
            PNG (Portable Network Graphics) uses lossless compression, meaning no image data is lost during compression.
            It supports full alpha transparency, making it essential for logos, icons, and graphics.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-4 shadow-sm">
              <h4 className="font-bold text-text dark:text-text-dark text-sm">✅ Strengths</h4>
              <ul className="mt-2 space-y-1 text-sm">
                <li>• Lossless — no quality degradation</li>
                <li>• Full alpha transparency</li>
                <li>• Sharp text and edge preservation</li>
                <li>• Universal browser support</li>
              </ul>
            </div>
            <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-4 shadow-sm">
              <h4 className="font-bold text-text dark:text-text-dark text-sm">❌ Weaknesses</h4>
              <ul className="mt-2 space-y-1 text-sm">
                <li>• Large file sizes for photographs</li>
                <li>• No native lossy compression option</li>
                <li>• Slower to decode than JPG</li>
                <li>• Not ideal for large photo galleries</li>
              </ul>
            </div>
          </div>
          <p>
            <strong className="text-text dark:text-text-dark">Use PNG when:</strong> You need transparency, lossless quality,
            or your image contains text, logos, screenshots, or graphics with sharp edges.
          </p>

          <h2 className="text-2xl font-bold text-text dark:text-text-dark">WebP — The Modern All-Rounder</h2>
          <p>
            Developed by Google, WebP supports both lossy and lossless compression, transparency, and animation.
            It consistently produces files 25-35% smaller than equivalent JPG or PNG files.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-4 shadow-sm">
              <h4 className="font-bold text-text dark:text-text-dark text-sm">✅ Strengths</h4>
              <ul className="mt-2 space-y-1 text-sm">
                <li>• 25-35% smaller than JPG/PNG</li>
                <li>• Supports transparency and animation</li>
                <li>• Both lossy and lossless modes</li>
                <li>• 97%+ browser support</li>
              </ul>
            </div>
            <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-4 shadow-sm">
              <h4 className="font-bold text-text dark:text-text-dark text-sm">❌ Weaknesses</h4>
              <ul className="mt-2 space-y-1 text-sm">
                <li>• Not supported by all image editors</li>
                <li>• Some older browsers lack support</li>
                <li>• Encoding can be slower</li>
                <li>• Less widespread in print workflows</li>
              </ul>
            </div>
          </div>
          <p>
            <strong className="text-text dark:text-text-dark">Use WebP when:</strong> You want the best file size for web use,
            need transparency without PNG&apos;s large file sizes, or want a single format for all image types.
          </p>

          <h2 className="text-2xl font-bold text-text dark:text-text-dark">AVIF — The Next Generation</h2>
          <p>
            AVIF is based on the AV1 video codec and offers the most advanced compression available. It produces
            files up to 50% smaller than JPG and 20% smaller than WebP, with support for HDR and wide color gamut.
          </p>
          <p>
            <strong className="text-text dark:text-text-dark">Use AVIF when:</strong> You want cutting-edge compression and
            your audience uses modern browsers. Always provide WebP or JPG fallbacks for compatibility.
          </p>

          <AdSlot />

          <h2 className="text-2xl font-bold text-text dark:text-text-dark">Decision Flowchart</h2>
          <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-6 shadow-md space-y-3" style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}>
            <p><strong className="text-text dark:text-text-dark">Need transparency?</strong></p>
            <p className="ml-4">→ Yes: Use <strong className="text-text dark:text-text-dark">WebP</strong> (or PNG as fallback)</p>
            <p className="ml-4">→ No: Continue below</p>
            <p className="mt-2"><strong className="text-text dark:text-text-dark">Is it a photograph?</strong></p>
            <p className="ml-4">→ Yes: Use <strong className="text-text dark:text-text-dark">WebP</strong> (or JPG as fallback)</p>
            <p className="ml-4">→ No: Continue below</p>
            <p className="mt-2"><strong className="text-text dark:text-text-dark">Does it contain text or sharp edges?</strong></p>
            <p className="ml-4">→ Yes: Use <strong className="text-text dark:text-text-dark">PNG</strong> or <strong className="text-text dark:text-text-dark">WebP lossless</strong></p>
            <p className="ml-4">→ No: Use <strong className="text-text dark:text-text-dark">WebP</strong></p>
            <p className="mt-2"><strong className="text-text dark:text-text-dark">Need maximum compression?</strong></p>
            <p className="ml-4">→ Use <strong className="text-text dark:text-text-dark">AVIF</strong> with WebP/JPG fallback</p>
          </div>

          <h2 className="text-2xl font-bold text-text dark:text-text-dark">File Size Comparison (Typical 1920×1080 Photo)</h2>
          <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl overflow-hidden shadow-md" style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}>
            <table className="w-full text-sm">
              <thead className="bg-surface-alt dark:bg-surface-dark">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-text dark:text-text-dark">Format</th>
                  <th className="px-4 py-3 text-left font-semibold text-text dark:text-text-dark">Quality</th>
                  <th className="px-4 py-3 text-left font-semibold text-text dark:text-text-dark">File Size</th>
                  <th className="px-4 py-3 text-left font-semibold text-text dark:text-text-dark">vs JPG</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border dark:divide-border-dark">
                <tr><td className="px-4 py-2">PNG (lossless)</td><td className="px-4 py-2">100%</td><td className="px-4 py-2">~5.2 MB</td><td className="px-4 py-2">+1,200%</td></tr>
                <tr><td className="px-4 py-2">JPG (quality 85)</td><td className="px-4 py-2">85%</td><td className="px-4 py-2">~400 KB</td><td className="px-4 py-2">baseline</td></tr>
                <tr><td className="px-4 py-2">WebP (quality 85)</td><td className="px-4 py-2">85%</td><td className="px-4 py-2">~280 KB</td><td className="px-4 py-2">-30%</td></tr>
                <tr><td className="px-4 py-2">AVIF (quality 85)</td><td className="px-4 py-2">85%</td><td className="px-4 py-2">~200 KB</td><td className="px-4 py-2">-50%</td></tr>
              </tbody>
            </table>
          </div>

          <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-6 shadow-md" style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}>
            <h2 className="text-xl font-bold text-text dark:text-text-dark">Convert Your Images Now</h2>
            <p className="mt-2">
              Use our free tools to convert between any image format:
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <Link href="/convert-image" className="px-4 py-2 bg-primary text-surface rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium">
                Format Converter
              </Link>
              <Link href="/compress-image" className="px-4 py-2 bg-secondary text-surface rounded-lg hover:bg-secondary/90 transition-colors text-sm font-medium">
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
