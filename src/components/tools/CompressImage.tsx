"use client";
import { useState, useCallback } from "react";
import imageCompression from "browser-image-compression";
import DropZone from "@/components/ui/DropZone";
import ProgressBar from "@/components/ui/ProgressBar";
import { formatFileSize, getCompressionPercent, downloadBlob } from "@/lib/utils";

interface CompressedFile {
  original: File;
  compressed: Blob | null;
  originalSize: number;
  compressedSize: number;
  status: "pending" | "processing" | "done" | "error";
  error?: string;
  url?: string;
}

export default function CompressImage() {
  const [files, setFiles] = useState<CompressedFile[]>([]);
  const [quality, setQuality] = useState(80);
  const [maxSizeMB, setMaxSizeMB] = useState(1);
  const [useMaxSize, setUseMaxSize] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFiles = useCallback((newFiles: File[]) => {
    const items: CompressedFile[] = newFiles.map((f) => ({
      original: f,
      compressed: null,
      originalSize: f.size,
      compressedSize: 0,
      status: "pending",
    }));
    setFiles((prev) => [...prev, ...items]);
  }, []);

  const compressAll = async () => {
    setProcessing(true);
    setProgress(0);
    const updated = [...files];

    for (let i = 0; i < updated.length; i++) {
      if (updated[i].status === "done") continue;
      updated[i].status = "processing";
      setFiles([...updated]);

      try {
        const options: Parameters<typeof imageCompression>[1] = {
          maxSizeMB: useMaxSize ? maxSizeMB : 10,
          maxWidthOrHeight: 4096,
          useWebWorker: true,
          initialQuality: quality / 100,
        };

        const compressed = await imageCompression(updated[i].original, options);
        if (updated[i].url) URL.revokeObjectURL(updated[i].url!);
        const url = URL.createObjectURL(compressed);
        updated[i].compressed = compressed;
        updated[i].compressedSize = compressed.size;
        updated[i].status = "done";
        updated[i].url = url;
      } catch (e) {
        updated[i].status = "error";
        updated[i].error = e instanceof Error ? e.message : "Compression failed";
      }

      setProgress(((i + 1) / updated.length) * 100);
      setFiles([...updated]);
    }

    setProcessing(false);
  };

  const downloadFile = (item: CompressedFile) => {
    if (!item.compressed || !item.url) return;
    const ext = item.original.name.split(".").pop() || "jpg";
    const name = item.original.name.replace(/\.[^.]+$/, "") + "_compressed." + ext;
    downloadBlob(item.compressed as Blob, name);
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

  const totalOriginal = files.reduce((s, f) => s + f.originalSize, 0);
  const totalCompressed = files.filter((f) => f.status === "done").reduce((s, f) => s + f.compressedSize, 0);
  const allDone = files.length > 0 && files.every((f) => f.status === "done");

  return (
    <div className="space-y-6">
      <DropZone
        onFiles={handleFiles}
        multiple
        label="Drop your images here"
        sublabel="or click to browse — supports batch compression"
      />

      {files.length > 0 && (
        <>
          {/* Controls */}
          <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-5 shadow-md" style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}>
            <h3 className="font-semibold text-text dark:text-text-dark mb-4">Compression Settings</h3>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between">
                  <label className="text-sm font-medium text-text-light dark:text-text-dark-muted">Quality: {quality}%</label>
                  <span className="text-xs text-text-light dark:text-text-dark-muted">
                    {quality > 80 ? "High quality" : quality > 50 ? "Balanced" : "Maximum compression"}
                  </span>
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

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useMaxSize}
                    onChange={(e) => setUseMaxSize(e.target.checked)}
                    className="accent-primary w-4 h-4"
                  />
                  <span className="text-sm text-text dark:text-text-dark">Target max file size</span>
                </label>
                {useMaxSize && (
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={maxSizeMB}
                      onChange={(e) => setMaxSizeMB(Number(e.target.value))}
                      min={0.1}
                      step={0.1}
                      className="w-20 px-2 py-1 rounded border border-border dark:border-border-dark bg-surface dark:bg-surface-dark text-text dark:text-text-dark text-sm"
                    />
                    <span className="text-sm text-text-light dark:text-text-dark-muted">MB</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <button
                onClick={compressAll}
                disabled={processing}
                className="px-6 py-2.5 bg-primary text-surface font-semibold rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {processing ? "Compressing..." : "Compress All"}
              </button>
              <button
                onClick={reset}
                className="px-6 py-2.5 border border-border dark:border-border-dark text-text dark:text-text-dark font-semibold rounded-lg hover:bg-surface-alt dark:hover:bg-surface-dark transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Progress */}
          {processing && <ProgressBar progress={progress} label="Compressing images..." />}

          {/* Summary */}
          {allDone && (
            <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 dark:border-primary/30 rounded-xl p-4 text-center">
              <p className="text-lg font-bold text-text dark:text-text-dark">
                Saved {formatFileSize(totalOriginal - totalCompressed)} ({getCompressionPercent(totalOriginal, totalCompressed)}% reduction)
              </p>
              <p className="text-sm text-text-light dark:text-text-dark-muted">
                {formatFileSize(totalOriginal)} → {formatFileSize(totalCompressed)}
              </p>
            </div>
          )}

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
                    <span>Original: {formatFileSize(item.originalSize)}</span>
                    {item.status === "done" && (
                      <>
                        <span>→ {formatFileSize(item.compressedSize)}</span>
                        <span className="text-primary font-medium">
                          -{getCompressionPercent(item.originalSize, item.compressedSize)}%
                        </span>
                      </>
                    )}
                    {item.status === "processing" && <span className="text-accent">Processing...</span>}
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
