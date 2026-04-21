import type { Metadata } from "next";
import CropImage from "@/components/tools/CropImage";
import JsonLd from "@/components/seo/JsonLd";
import AdSlot from "@/components/ui/AdSlot";
import PrivacyBadge from "@/components/ui/PrivacyBadge";

export const metadata: Metadata = {
  title: "Crop Image Online Free — Trim and Cut Images Instantly",
  description:
    "Crop images with an interactive tool. Choose preset aspect ratios or crop freely. Supports JPG, PNG, WebP. Free and 100% private.",
  keywords: ["crop image online", "image cropper", "trim image", "cut image", "crop photo"],
};

export default function CropImagePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text dark:text-text-dark">
          Crop Image Online Free
        </h1>
        <p className="mt-3 text-lg text-text-light dark:text-text-dark-muted max-w-2xl mx-auto">
          Crop images with an interactive tool. Choose from preset aspect ratios
          or crop freely with drag handles.
        </p>
      </div>

      <PrivacyBadge />

      <div className="mt-6">
        <CropImage />
      </div>

      <div className="mt-8">
        <AdSlot />
      </div>

      <section className="mt-12 bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-6 sm:p-8 shadow-md" style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}>
        <h2 className="text-2xl font-bold text-text dark:text-text-dark">How to Crop an Image</h2>
        <ol className="mt-4 space-y-3 text-text-light dark:text-text-dark-muted">
          <li><strong className="text-text dark:text-text-dark">1. Upload your image</strong> — Drag and drop or click to select a JPG, PNG, WebP, or AVIF file.</li>
          <li><strong className="text-text dark:text-text-dark">2. Select crop area</strong> — Click and drag on the image to define your crop region. Use the corner handles to resize.</li>
          <li><strong className="text-text dark:text-text-dark">3. Choose aspect ratio</strong> — Select Free, 1:1, 4:3, 16:9, 3:2, or 2:3 to constrain proportions.</li>
          <li><strong className="text-text dark:text-text-dark">4. Download</strong> — Click crop and download your perfectly cropped image.</li>
        </ol>
        <h3 className="mt-6 text-lg font-semibold text-text dark:text-text-dark">Common Crop Ratios</h3>
        <p className="mt-2 text-text-light dark:text-text-dark-muted">
          1:1 is perfect for profile pictures and Instagram posts. 16:9 is the standard for YouTube thumbnails
          and widescreen displays. 4:3 works well for presentations and traditional photo prints.
          3:2 matches standard DSLR photo proportions, while 2:3 is ideal for Pinterest pins and portrait photos.
        </p>
      </section>

      <div className="mt-8">
        <AdSlot />
      </div>

      <JsonLd
        name="Image Cropper — Crop Image Online Free"
        description="Crop images with interactive drag handles and preset aspect ratios. Free online tool."
        url="/crop-image"
      />
    </div>
  );
}
