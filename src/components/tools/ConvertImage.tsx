"use client";
import { useState, useCallback } from "react";
import DropZone from "@/components/ui/DropZone";
import ProgressBar from "@/components/ui/ProgressBar";
import { formatFileSize, loadImage, fileToDataUrl, canvasToBlob, downloadBlob, changeExtension, EXT_TO_MIME } from "@/lib/utils";

const FORMATS = [
  { label: "JPG", value: "jpg", mime: "image/jpeg" },
  { label: "PNG", value: "png", mime: "image/png" },
  { label: "WebP", value: "webp", mime: "image/webp" },
];

interface ConvertedFile {
  original: File;
  converted: Blob | null;
  originalSize: number;
  convertedSize: number;
  status: "pending" | "processing" | "done" | "error";
  error?: string;
  url?: string;
}

export default function ConvertImage() {
  const [files, setFiles] = useState<ConvertedFile[]>([]);
  const [targetFormat, setTargetFormat] = useState("webp");
  const [quality, setQuality] = useState(90);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFiles = useCallback((newFiles: File[]) => {
    const items: ConvertedFile[] = newFiles.map((f) => ({
      original: f,
      converted: null,
      originalSize: f.size,
      convertedSize: 0,
      status: "pending",
    }));
    setFiles((prev) => [...prev, ...items]);
  }, []);

  const convertAll = async () => {
    setProcessing(true);
    setProgress(0);
    const updated = [...files];
    const mime = FORMATS.find((f) => f.value === targetFormat)?.mime || "image/webp";
    const isLossy = targetFormat !== "png";

    for (let i = 0; i < updated.length; i++) {
      if (updated[i].status === "done") continue;
      updated[i].status = "processing";
      setFiles([...updated]);

      try {
        const dataUrl = await fileToDataUrl(updated[i].original);
        const img = await loadImage(dataUrl);
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0);
        const blob = await canvasToBlob(canvas, mime, isLossy ? quality / 100 : 1);
        if (updated[i].url) URL.revokeObjectURL(updated[i].url!);
        updated[i].converted = blob;
        updated[i].convertedSize = blob.size;
        updated[i].status = "done";
        updated[i].url = URL.createObjectURL(blob);
      } catch (e) {
        updated[i].status = "error";
        updated[i].error = e instanceof Error ? e.message : "Conversion failed";
      }

      setProgress(((i + 1) / updated.length) * 100);
      setFiles([...updated]);
    }

    setProcessing(false);
  };

  const downloadFile = (item: ConvertedFile) => {
    if (!item.converted || !item.url) return;
    const name = changeExtension(item.original.name, targetFormat);
    downloadBlob(item.converted, name);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const updated = [...prev];
      if (updated[index].url) URL.revokeObjectURL(updated[index].url!);
      updated.splice(index, 1);
      return updated;
    });
  };

  const reset = () => {
    files.forEach((f) => { if (f.url) URL.revokeObjectURL(f.url); });
    setFiles([]);
    setProgress(0);
  };

  return (
    <div className="space-y-6">
      <DropZone
        onFiles={handleFiles}
        multiple
        label="Drop your images here"
        sublabel="or click to browse — batch conversion supported"
      />

      {files.length > 0 && (
        <>
          {/* Controls */}
          <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-5 shadow-md" style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}>
            <h3 className="font-semibold text-text dark:text-text-dark mb-4">Conversion Settings</h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-text-light dark:text-text-dark-muted">Output Format</label>
                <div className="flex gap-2 mt-2">
                  {FORMATS.map((f) => (
                    <button
                      key={f.value}
                      onClick={() => setTargetFormat(f.value)}
                      className={`px-5 py-2 text-sm font-medium rounded-lg border transition-colors ${
                        targetFormat === f.value
                          ? "border-primary bg-primary text-surface"
                          : "border-border dark:border-border-dark text-text dark:text-text-dark hover:border-primary hover:text-primary"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {targetFormat !== "png" && (
                <div>
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-text-light dark:text-text-dark-muted">Quality: {quality}%</label>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={100}
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full mt-1 accent-primary"
                  />
                </div>
              )}
            </div>

            <div className="mt-4 flex gap-3">
              <button
                onClick={convertAll}
                disabled={processing}
                className="px-6 py-2.5 bg-primary text-surface font-semibold rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {processing ? "Converting..." : "Convert All"}
              </button>
              <button
                onClick={reset}
                className="px-6 py-2.5 border border-border dark:border-border-dark text-text dark:text-text-dark font-semibold rounded-lg hover:bg-surface-alt dark:hover:bg-surface-dark transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>

          {processing && <ProgressBar progress={progress} label="Converting images..." />}

          {/* File List */}
          <div className="space-y-3">
            {files.map((item, i) => (
              <div
                key={i}
                className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-lg p-4 flex items-center gap-4 shadow-sm"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-text dark:text-text-dark truncate">{item.original.name}</p>
                  <div className="flex gap-3 text-sm text-text-light dark:text-text-dark-muted mt-1">
                    <span>{formatFileSize(item.originalSize)}</span>
                    {item.status === "done" && (
                      <>
                        <span>→ {formatFileSize(item.convertedSize)} (.{targetFormat})</span>
                      </>
                    )}
                    {item.status === "processing" && <span className="text-accent">Converting...</span>}
                    {item.status === "error" && <span className="text-secondary">{item.error}</span>}
                  </div>
                </div>
                <div className="flex gap-2">
                  {item.status === "done" && (
                    <button
                      onClick={() => downloadFile(item)}
                      className="px-3 py-1.5 text-sm bg-secondary text-surface rounded-lg hover:bg-secondary/90 transition-colors"
                    >
                      Download
                    </button>
                  )}
                  <button
                    onClick={() => removeFile(i)}
                    className="px-3 py-1.5 text-sm border border-border dark:border-border-dark text-text-light dark:text-text-dark-muted rounded-lg hover:bg-surface-alt dark:hover:bg-surface-dark transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
