export interface ToolInfo {
  name: string;
  slug: string;
  description: string;
  shortDesc: string;
  icon: string;
  keywords: string[];
}

export interface ProcessedImage {
  file: File;
  name: string;
  originalSize: number;
  processedSize?: number;
  url?: string;
  status: "pending" | "processing" | "done" | "error";
  error?: string;
}
