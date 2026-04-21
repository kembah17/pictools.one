"use client";
import { useState, useCallback } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import DropZone from "@/components/ui/DropZone";
import ProgressBar from "@/components/ui/ProgressBar";
import { formatFileSize, loadImage, fileToDataUrl, canvasToBlob, MIME_TO_EXT } from "@/lib/utils";

type ResizeMode = "exact" | "percentage" | "max";

interface ResizedFile {
  original: File;
  resized: Blob | null;
  originalSize: number;
  resizedSize: number;
  newWidth: number;
  newHeight: number;
  status: "pending" | "processing" | "done" | "error";
  error?: string;
}

export default function BulkResize() {
  const [files, setFiles] = useState<ResizedFile[]>([]);
  const [mode, setMode] = useState<ResizeMode>("exact");
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [percentage, setPercentage] = useState(50);
  const [maxDim, setMaxDim] = useState(1920);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFiles = useCallback((newFiles: File[]) => {
    const items: ResizedFile[] = newFiles.map((f) => ({
      original: f,
      resized: null,
      originalSize: f.size,
      resizedSize: 0,
      newWidth: 0,
      newHeight: 0,
      status: "pending",
    }));
    setFiles((prev) => [...prev, ...items]);
  }, []);

  const resizeAll = async () => {
    setProcessing(true);
    setProgress(0);
    const updated = [...files];

    for (let i = 0; i < updated.length; i++) {
      if (updated[i].status === "done") continue;
      updated[i].status = "processing";
      setFiles([...updated]);

      try {
        const dataUrl = await fileToDataUrl(updated[i].original);
        const img = await loadImage(dataUrl);
        let newW = img.naturalWidth;
        let newH = img.naturalHeight;

        if (mode === "exact") {
          newW = width;
          newH = height;
        } else if (mode === "percentage") {
          newW = Math.round(img.naturalWidth * (percentage / 100));
          newH = Math.round(img.naturalHeight * (percentage / 100));
        } else if (mode === "max") {
          if (img.naturalWidth > maxDim || img.naturalHeight > maxDim) {
            const ratio = Math.min(maxDim / img.naturalWidth, maxDim / img.naturalHeight);
            newW = Math.round(img.naturalWidth * ratio);
            newH = Math.round(img.naturalHeight * ratio);
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = newW;
        canvas.height = newH;
        const ctx = canvas.getContext("2d")!;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, newW, newH);

        const mimeType = updated[i].original.type === "image/png" ? "image/png" : "image/jpeg";
        const blob = await canvasToBlob(canvas, mimeType, 0.92);

        updated[i].resized = blob;
        updated[i].resizedSize = blob.size;
        updated[i].newWidth = newW;
        updated[i].newHeight = newH;
        updated[i].status = "done";
      } catch (e) {
        updated[i].status = "error";
        updated[i].error = e instanceof Error ? e.message : "Resize failed";
      }

      setProgress(((i + 1) / updated.length) * 100);
      setFiles([...updated]);
    }

    setProcessing(false);
  };

  const downloadZip = async () => {
    const zip = new JSZip();
    const doneFiles = files.filter((f) => f.status === "done" && f.resized);
    for (const item of doneFiles) {
      const ext = MIME_TO_EXT[item.original.type] || "jpg";
      const name = item.original.name.replace(/\.[^.]+$/, "") + "_resized." + ext;
      zip.file(name, item.resized!);
    }
    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, "resized_images.zip");
  };

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  const reset = () => {
    setFiles([]);
    setProgress(0);
  };

  const allDone = files.length > 0 && files.every((f) => f.status === "done");
  const doneCount = files.filter((f) => f.status === "done").length;

  return (
    <div className="space-y-6">
      <DropZone
        onFiles={handleFiles}
        multiple
        label="Drop multiple images here"
        sublabel="or click to browse — batch resize supported"
      />

      {files.length > 0 && (
        <>
          {/* Controls */}
          <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-5 shadow-md" style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}>
            <h3 className="font-semibold text-text dark:text-text-dark mb-4">Resize Settings</h3>

            {/* Mode selector */}
            <div className="flex gap-2 mb-4">
              {(["exact", "percentage", "max"] as ResizeMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                    mode === m
                      ? "border-primary bg-primary text-surface"
                      : "border-border dark:border-border-dark text-text dark:text-text-dark hover:border-primary hover:text-primary"
                  }`}
                >
                  {m === "exact" ? "Exact Dimensions" : m === "percentage" ? "Scale %" : "Max Width/Height"}
                </button>
              ))}
            </div>

            {/* Mode-specific inputs */}
            {mode === "exact" && (
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-sm font-medium text-text-light dark:text-text-dark-muted">Width (px)</label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    min={1}
                    className="mt-1 w-full px-3 py-2 rounded-lg border border-border dark:border-border-dark bg-surface dark:bg-surface-dark text-text dark:text-text-dark focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-text-light dark:text-text-dark-muted">Height (px)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    min={1}
                    className="mt-1 w-full px-3 py-2 rounded-lg border border-border dark:border-border-dark bg-surface dark:bg-surface-dark text-text dark:text-text-dark focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
              </div>
            )}

            {mode === "percentage" && (
              <div>
                <label className="text-sm font-medium text-text-light dark:text-text-dark-muted">Scale: {percentage}%</label>
                <input
                  type="range"
                  min={1}
                  max={200}
                  value={percentage}
                  onChange={(e) => setPercentage(Number(e.target.value))}
                  className="w-full mt-1 accent-primary"
                />
              </div>
            )}

            {mode === "max" && (
              <div>
                <label className="text-sm font-medium text-text-light dark:text-text-dark-muted">Max Width or Height (px)</label>
                <input
                  type="number"
                  value={maxDim}
                  onChange={(e) => setMaxDim(Number(e.target.value))}
                  min={1}
                  className="mt-1 w-full px-3 py-2 rounded-lg border border-border dark:border-border-dark bg-surface dark:bg-surface-dark text-text dark:text-text-dark focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
            )}

            <div className="mt-4 flex gap-3 flex-wrap">
              <button
                onClick={resizeAll}
                disabled={processing}
                className="px-6 py-2.5 bg-primary text-surface font-semibold rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {processing ? "Resizing..." : `Resize All (${files.length} images)`}
              </button>
              {allDone && (
                <button
                  onClick={downloadZip}
                  className="px-6 py-2.5 bg-secondary text-surface font-semibold rounded-lg hover:bg-secondary/90 transition-colors"
                >
                  Download ZIP ({doneCount} images)
                </button>
              )}
              <button
                onClick={reset}
                className="px-6 py-2.5 border border-border dark:border-border-dark text-text dark:text-text-dark font-semibold rounded-lg hover:bg-surface-alt dark:hover:bg-surface-dark transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>

          {processing && <ProgressBar progress={progress} label="Resizing images..." />}

          {/* File List */}
          <div className="space-y-3">
            {files.map((item, i) => (
              <div
                key={i}
                className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-lg p-4 flex items-center gap-4 shadow-sm"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-text dark:text-text-dark truncate">{item.original.name}</p>
                  <div className="flex gap-3 text-sm text-text-light dark:text-text-dark-muted mt-1 flex-wrap">
                    <span>{formatFileSize(item.originalSize)}</span>
                    {item.status === "done" && (
                      <>
                        <span>→ {formatFileSize(item.resizedSize)}</span>
                        <span>{item.newWidth}×{item.newHeight}px</span>
                      </>
                    )}
                    {item.status === "processing" && <span className="text-accent">Processing...</span>}
                    {item.status === "error" && <span className="text-secondary">{item.error}</span>}
                    {item.status === "pending" && <span className="text-text-light dark:text-text-dark-muted">Pending</span>}
                  </div>
                </div>
                <button
                  onClick={() => removeFile(i)}
                  className="px-3 py-1.5 text-sm border border-border dark:border-border-dark text-text-light dark:text-text-dark-muted rounded-lg hover:bg-surface-alt dark:hover:bg-surface-dark transition-colors"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
