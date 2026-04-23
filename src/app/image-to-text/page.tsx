import type { Metadata } from "next";
import ImageOCR from "@/components/tools/ImageOCR";
import JsonLd from "@/components/seo/JsonLd";
import AdSlot from "@/components/ui/AdSlot";
import PrivacyBadge from "@/components/ui/PrivacyBadge";

export const metadata: Metadata = {
  title: "Extract Text from Image Online Free — Image OCR Tool",
  description:
    "Extract text from images using OCR technology. Supports JPG, PNG, WebP, BMP, TIFF. Free online tool with image preprocessing for better accuracy.",
  keywords: ["image to text", "OCR online", "extract text from image", "image OCR", "photo to text"],
};

export default function ImageToTextPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text dark:text-text-dark">
          Extract Text from Image Online Free
        </h1>
        <p className="mt-3 text-lg text-text-light dark:text-text-dark-muted max-w-2xl mx-auto">
          Extract text from images using OCR technology. Upload a photo or screenshot and get
          editable text instantly — with preprocessing options for better accuracy.
        </p>
      </div>

      <PrivacyBadge />

      <div className="mt-6">
        <ImageOCR />
      </div>

      <div className="mt-8">
        <AdSlot />
      </div>

      <section className="mt-12 bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-6 sm:p-8 shadow-md" style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}>
        <h2 className="text-2xl font-bold text-text dark:text-text-dark">How to Extract Text from an Image</h2>
        <ol className="mt-4 space-y-3 text-text-light dark:text-text-dark-muted">
          <li><strong className="text-text dark:text-text-dark">1. Upload an image</strong> — Drag and drop or click to select a JPG, PNG, WebP, BMP, or TIFF file containing text.</li>
          <li><strong className="text-text dark:text-text-dark">2. Adjust preprocessing settings</strong> — Enable grayscale, contrast enhancement, noise removal, deskew, or binarize to improve OCR accuracy on difficult images.</li>
          <li><strong className="text-text dark:text-text-dark">3. Select language and extract text</strong> — Choose the text language from 8 supported languages and click &quot;Extract Text&quot; to run OCR.</li>
          <li><strong className="text-text dark:text-text-dark">4. Copy or download results</strong> — Edit the extracted text if needed, then copy to clipboard or download as a .txt file.</li>
        </ol>
        <h3 className="mt-6 text-lg font-semibold text-text dark:text-text-dark">Tips for Better OCR Results</h3>
        <p className="mt-2 text-text-light dark:text-text-dark-muted">
          For best results, use high-resolution images with clear, well-lit text. Enable the Grayscale and Contrast Enhancement
          preprocessing options for scanned documents. Use Noise Removal for photos taken in low light, and Deskew for images
          where the text is slightly tilted. The Binarize option works well for documents with colored backgrounds, converting
          them to pure black and white for cleaner text detection. All processing happens entirely in your browser — your images
          are never uploaded to any server.
        </p>
      </section>

      <div className="mt-8">
        <AdSlot />
      </div>

      <JsonLd
        name="Extract Text from Image — Free OCR Tool"
        description="Extract text from images using OCR technology with preprocessing for better accuracy. Free online tool."
        url="/image-to-text"
      />
    </div>
  );
}
