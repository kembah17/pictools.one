import { ToolInfo } from "@/types";

export const tools: ToolInfo[] = [
  {
    name: "Image Resizer",
    slug: "resize-image",
    description: "Resize images to exact dimensions or preset social media sizes. Supports JPG, PNG, WebP, and AVIF formats.",
    shortDesc: "Resize images to any dimension",
    icon: "📐",
    keywords: ["resize image", "image resizer", "resize photo", "change image size"],
  },
  {
    name: "Image Compressor",
    slug: "compress-image",
    description: "Compress images to reduce file size without losing quality. Supports batch compression with adjustable quality settings.",
    shortDesc: "Compress images without quality loss",
    icon: "🗜️",
    keywords: ["compress image", "image compressor", "reduce image size", "optimize image"],
  },
  {
    name: "Image Cropper",
    slug: "crop-image",
    description: "Crop images with an interactive tool. Choose from preset aspect ratios or crop freely with drag handles.",
    shortDesc: "Crop images with precision",
    icon: "✂️",
    keywords: ["crop image", "image cropper", "trim image", "cut image"],
  },
  {
    name: "Format Converter",
    slug: "convert-image",
    description: "Convert images between PNG, JPG, WebP, and AVIF formats. Supports batch conversion with quality control.",
    shortDesc: "Convert between image formats",
    icon: "🔄",
    keywords: ["convert image", "PNG to JPG", "JPG to WebP", "image converter"],
  },
  {
    name: "Bulk Resize",
    slug: "bulk-resize",
    description: "Resize multiple images at once. Set target dimensions, scale by percentage, or set maximum width/height. Download as ZIP.",
    shortDesc: "Resize multiple images at once",
    icon: "📦",
    keywords: ["bulk resize", "batch resize", "resize multiple images"],
  },
  {
    name: "Image to Base64",
    slug: "image-to-base64",
    description: "Convert images to Base64 encoded strings for embedding in HTML, CSS, or JSON. Also decode Base64 back to images.",
    shortDesc: "Convert images to Base64 strings",
    icon: "🔤",
    keywords: ["image to base64", "base64 encoder", "base64 to image"],
  },
];

export const articles = [
  {
    title: "How to Resize Images for Social Media",
    slug: "how-to-resize-images-for-social-media",
    description: "Complete guide to optimal image sizes for Instagram, Facebook, Twitter, YouTube, and LinkedIn.",
  },
  {
    title: "How to Compress Images Without Losing Quality",
    slug: "how-to-compress-images-without-losing-quality",
    description: "Learn compression best practices to reduce file size while maintaining visual quality.",
  },
  {
    title: "WebP vs PNG vs JPG: Which Format to Use",
    slug: "webp-vs-png-vs-jpg-which-format-to-use",
    description: "Comprehensive comparison of image formats to help you choose the right one for every use case.",
  },
  {
    title: "How to Convert Images in Bulk",
    slug: "how-to-convert-images-in-bulk",
    description: "Step-by-step guide to batch converting images between formats efficiently.",
  },
];
