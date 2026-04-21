"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import DropZone from "@/components/ui/DropZone";
import ImagePreview from "@/components/ui/ImagePreview";
import { formatFileSize, fileToDataUrl, loadImage, canvasToBlob, downloadBlob, MIME_TO_EXT } from "@/lib/utils";

const PRESETS = [
  { label: "Instagram Post", w: 1080, h: 1080 },
  { label: "Facebook Share", w: 1200, h: 630 },
  { label: "Twitter Post", w: 1600, h: 900 },
  { label: "YouTube Thumbnail", w: 1280, h: 720 },
  { label: "LinkedIn Post", w: 1200, h: 627 },
];

export default function ResizeImage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [origW, setOrigW] = useState(0);
  const [origH, setOrigH] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [lockAspect, setLockAspect] = useState(true);
  const [resultUrl, setResultUrl] = useState<string>("");
  const [resultSize, setResultSize] = useState(0);
  const [processing, setProcessing] = useState(false);
  const aspectRef = useRef(1);

  const handleFiles = useCallback(async (files: File[]) => {
    const f = files[0];
    if (!f) return;
    setFile(f);
    setResultUrl("");
    const url = await fileToDataUrl(f);
    setPreview(url);
    const img = await loadImage(url);
    setOrigW(img.naturalWidth);
    setOrigH(img.naturalHeight);
    setWidth(img.naturalWidth);
    setHeight(img.naturalHeight);
    aspectRef.current = img.naturalWidth / img.naturalHeight;
  }, []);

  const handleWidthChange = (val: number) => {
    setWidth(val);
    if (lockAspect && aspectRef.current) {
      setHeight(Math.round(val / aspectRef.current));
    }
  };

  const handleHeightChange = (val: number) => {
    setHeight(val);
    if (lockAspect && aspectRef.current) {
      setWidth(Math.round(val * aspectRef.current));
    }
  };

  const applyPreset = (w: number, h: number) => {
    setWidth(w);
    setHeight(h);
    setLockAspect(false);
  };

  const doResize = async () => {
    if (!file || !preview || width <= 0 || height <= 0) return;
    setProcessing(true);
    try {
      const img = await loadImage(preview);
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d")!;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, width, height);
      const mimeType = file.type === "image/png" ? "image/png" : "image/jpeg";
      const blob = await canvasToBlob(canvas, mimeType, 0.92);
      if (resultUrl) URL.revokeObjectURL(resultUrl);
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setResultSize(blob.size);
    } catch (e) {
      console.error(e);
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!resultUrl || !file) return;
    const ext = MIME_TO_EXT[file.type] || "jpg";
    const name = file.name.replace(/\.[^.]+$/, "") + `_${width}x${height}.${ext}`;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = name;
    a.click();
  };

  const reset = () => {
    setFile(null);
    setPreview("");
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultUrl("");
    setOrigW(0);
    setOrigH(0);
    setWidth(0);
    setHeight(0);
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <DropZone onFiles={handleFiles} label="Drop your image here" sublabel="or click to browse — JPG, PNG, WebP, AVIF" />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImagePreview src={preview} name={file.name} size={file.size} width={origW} height={origH} label="Original" onRemove={reset} />
            {resultUrl && (
              <ImagePreview src={resultUrl} name={`Resized`} size={resultSize} width={width} height={height} label="Resized" />
            )}
          </div>

          {/* Controls */}
          <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-5 shadow-md" style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}>
            <h3 className="font-semibold text-text dark:text-text-dark mb-4">Resize Settings</h3>

            {/* Presets */}
            <div className="mb-4">
              <label className="text-sm font-medium text-text-light dark:text-text-dark-muted">Social Media Presets</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {PRESETS.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => applyPreset(p.w, p.h)}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg border border-border dark:border-border-dark bg-surface-alt dark:bg-surface-dark text-text dark:text-text-dark hover:border-primary hover:text-primary dark:hover:border-primary-light dark:hover:text-primary-light transition-colors"
                  >
                    {p.label} ({p.w}×{p.h})
                  </button>
                ))}
              </div>
            </div>

            {/* Dimensions */}
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <label className="text-sm font-medium text-text-light dark:text-text-dark-muted">Width (px)</label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => handleWidthChange(Number(e.target.value))}
                  min={1}
                  className="mt-1 w-full px-3 py-2 rounded-lg border border-border dark:border-border-dark bg-surface dark:bg-surface-dark text-text dark:text-text-dark focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                />
              </div>
              <button
                onClick={() => setLockAspect(!lockAspect)}
                className={`mb-1 p-2 rounded-lg border transition-colors ${
                  lockAspect
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border dark:border-border-dark text-text-light dark:text-text-dark-muted"
                }`}
                title={lockAspect ? "Aspect ratio locked" : "Aspect ratio unlocked"}
              >
                {lockAspect ? "🔗" : "🔓"}
              </button>
              <div className="flex-1">
                <label className="text-sm font-medium text-text-light dark:text-text-dark-muted">Height (px)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => handleHeightChange(Number(e.target.value))}
                  min={1}
                  className="mt-1 w-full px-3 py-2 rounded-lg border border-border dark:border-border-dark bg-surface dark:bg-surface-dark text-text dark:text-text-dark focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                />
              </div>
            </div>

            <p className="mt-2 text-xs text-text-light dark:text-text-dark-muted">
              Original: {origW} × {origH}px
            </p>

            <div className="mt-4 flex gap-3">
              <button
                onClick={doResize}
                disabled={processing || width <= 0 || height <= 0}
                className="px-6 py-2.5 bg-primary text-surface font-semibold rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {processing ? "Resizing..." : "Resize Image"}
              </button>
              {resultUrl && (
                <button
                  onClick={handleDownload}
                  className="px-6 py-2.5 bg-secondary text-surface font-semibold rounded-lg hover:bg-secondary/90 transition-colors"
                >
                  Download
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
