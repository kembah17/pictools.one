"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import DropZone from "@/components/ui/DropZone";
import ImagePreview from "@/components/ui/ImagePreview";
import { fileToDataUrl, loadImage, canvasToBlob, MIME_TO_EXT, formatFileSize } from "@/lib/utils";

const RATIOS = [
  { label: "Free", value: 0 },
  { label: "1:1", value: 1 },
  { label: "4:3", value: 4 / 3 },
  { label: "16:9", value: 16 / 9 },
  { label: "3:2", value: 3 / 2 },
  { label: "2:3", value: 2 / 3 },
];

export default function CropImage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [imgW, setImgW] = useState(0);
  const [imgH, setImgH] = useState(0);
  const [ratio, setRatio] = useState(0);
  const [crop, setCrop] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resultUrl, setResultUrl] = useState("");
  const [resultSize, setResultSize] = useState(0);
  const [processing, setProcessing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleFiles = useCallback(async (files: File[]) => {
    const f = files[0];
    if (!f) return;
    setFile(f);
    setResultUrl("");
    const url = await fileToDataUrl(f);
    setPreview(url);
    const img = await loadImage(url);
    setImgW(img.naturalWidth);
    setImgH(img.naturalHeight);
    // Default crop to full image
    setCrop({ x: 0, y: 0, w: img.naturalWidth, h: img.naturalHeight });
  }, []);

  // Get display scale factor
  const getScale = useCallback(() => {
    if (!imgRef.current || !imgW) return 1;
    return imgRef.current.clientWidth / imgW;
  }, [imgW]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current || !imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const scale = getScale();
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;
    setDragStart({ x, y });
    setDragging(true);
    setCrop({ x, y, w: 0, h: 0 });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const scale = getScale();
    let x2 = Math.max(0, Math.min(imgW, (e.clientX - rect.left) / scale));
    let y2 = Math.max(0, Math.min(imgH, (e.clientY - rect.top) / scale));

    let w = x2 - dragStart.x;
    let h = y2 - dragStart.y;

    if (ratio > 0) {
      h = Math.abs(w) / ratio * Math.sign(h || 1);
    }

    const cx = w >= 0 ? dragStart.x : dragStart.x + w;
    const cy = h >= 0 ? dragStart.y : dragStart.y + h;

    setCrop({
      x: Math.max(0, cx),
      y: Math.max(0, cy),
      w: Math.min(Math.abs(w), imgW - Math.max(0, cx)),
      h: Math.min(Math.abs(h), imgH - Math.max(0, cy)),
    });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const doCrop = async () => {
    if (!file || !preview || crop.w <= 0 || crop.h <= 0) return;
    setProcessing(true);
    try {
      const img = await loadImage(preview);
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(crop.w);
      canvas.height = Math.round(crop.h);
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, crop.x, crop.y, crop.w, crop.h, 0, 0, crop.w, crop.h);
      const mimeType = file.type === "image/png" ? "image/png" : "image/jpeg";
      const blob = await canvasToBlob(canvas, mimeType, 0.92);
      if (resultUrl) URL.revokeObjectURL(resultUrl);
      setResultUrl(URL.createObjectURL(blob));
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
    const name = file.name.replace(/\.[^.]+$/, "") + "_cropped." + ext;
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
  };

  const scale = getScale();

  return (
    <div className="space-y-6">
      {!file ? (
        <DropZone onFiles={handleFiles} label="Drop your image here" sublabel="or click to browse — JPG, PNG, WebP, AVIF" />
      ) : (
        <>
          {/* Aspect Ratio Selector */}
          <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-5 shadow-md" style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}>
            <h3 className="font-semibold text-text dark:text-text-dark mb-3">Aspect Ratio</h3>
            <div className="flex flex-wrap gap-2">
              {RATIOS.map((r) => (
                <button
                  key={r.label}
                  onClick={() => setRatio(r.value)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                    ratio === r.value
                      ? "border-primary bg-primary text-surface"
                      : "border-border dark:border-border-dark text-text dark:text-text-dark hover:border-primary hover:text-primary"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm text-text-light dark:text-text-dark-muted">
              Crop: {Math.round(crop.w)} × {Math.round(crop.h)}px
              {crop.w > 0 && crop.h > 0 && ` (from ${Math.round(crop.x)}, ${Math.round(crop.y)})`}
            </p>
          </div>

          {/* Crop Canvas */}
          <div
            ref={containerRef}
            className="relative bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl overflow-hidden cursor-crosshair select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src={preview}
              alt="Crop preview"
              className="w-full h-auto block"
              draggable={false}
            />
            {/* Overlay */}
            {crop.w > 0 && crop.h > 0 && imgRef.current && (
              <>
                {/* Dark overlay outside crop */}
                <div className="absolute inset-0 bg-black/50 pointer-events-none" />
                {/* Clear crop area */}
                <div
                  className="absolute border-2 border-surface pointer-events-none"
                  style={{
                    left: crop.x * scale,
                    top: crop.y * scale,
                    width: crop.w * scale,
                    height: crop.h * scale,
                    boxShadow: `0 0 0 9999px rgba(0,0,0,0.5)`,
                    background: "transparent",
                  }}
                >
                  {/* Grid lines */}
                  <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div key={i} className="border border-surface/30" />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={doCrop}
              disabled={processing || crop.w <= 0 || crop.h <= 0}
              className="px-6 py-2.5 bg-primary text-surface font-semibold rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {processing ? "Cropping..." : "Crop Image"}
            </button>
            {resultUrl && (
              <button
                onClick={handleDownload}
                className="px-6 py-2.5 bg-secondary text-surface font-semibold rounded-lg hover:bg-secondary/90 transition-colors"
              >
                Download Cropped Image
              </button>
            )}
            <button
              onClick={reset}
              className="px-6 py-2.5 border border-border dark:border-border-dark text-text dark:text-text-dark font-semibold rounded-lg hover:bg-surface-alt dark:hover:bg-surface-dark transition-colors"
            >
              Start Over
            </button>
          </div>

          {/* Result Preview */}
          {resultUrl && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ImagePreview src={preview} name={file.name} size={file.size} width={imgW} height={imgH} label="Original" />
              <ImagePreview src={resultUrl} name="Cropped" size={resultSize} width={Math.round(crop.w)} height={Math.round(crop.h)} label="Cropped" />
            </div>
          )}
        </>
      )}
    </div>
  );
}
