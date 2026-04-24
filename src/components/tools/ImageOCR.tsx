"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import { createWorker } from "tesseract.js";
import DropZone from "@/components/ui/DropZone";
import ProgressBar from "@/components/ui/ProgressBar";
import { fileToDataUrl, loadImage } from "@/lib/utils";
import {
  applyPreprocessing,
  detectSkewAngle,
  type PreprocessingOptions,
  defaultPreprocessingOptions,
} from "./ImagePreprocessor";

interface OcrResult {
  text: string;
  confidence: number;
  wordCount: number;
  charCount: number;
}

const LANGUAGES = [
  { code: "eng", label: "English" },
  { code: "spa", label: "Spanish" },
  { code: "fra", label: "French" },
  { code: "por", label: "Portuguese" },
  { code: "deu", label: "German" },
  { code: "chi_sim", label: "Chinese (Simplified)" },
  { code: "ara", label: "Arabic" },
  { code: "hin", label: "Hindi" },
];

export default function ImageOCR() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [language, setLanguage] = useState("eng");
  const [preprocessing, setPreprocessing] = useState<PreprocessingOptions>(
    defaultPreprocessingOptions
  );
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("");
  const [result, setResult] = useState<OcrResult | null>(null);
  const [editedText, setEditedText] = useState("");
  const [copied, setCopied] = useState(false);
  const [skewAngle, setSkewAngle] = useState<number | null>(null);
  const [error, setError] = useState("");

  const originalCanvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const sourceCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleFiles = useCallback(async (files: File[]) => {
    const f = files[0];
    if (!f) return;
    setFile(f);
    setResult(null);
    setEditedText("");
    setError("");
    setSkewAngle(null);
    setProgress(0);

    try {
      const url = await fileToDataUrl(f);
      setImageUrl(url);
      const img = await loadImage(url);

      // Draw original to canvas
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      sourceCanvasRef.current = canvas;

      // Draw original preview
      if (originalCanvasRef.current) {
        const oc = originalCanvasRef.current;
        oc.width = img.naturalWidth;
        oc.height = img.naturalHeight;
        const octx = oc.getContext("2d")!;
        octx.drawImage(img, 0, 0);
      }

      // Apply initial preprocessing preview
      updatePreview(canvas, defaultPreprocessingOptions);
    } catch {
      setError("Failed to load image. Please try a different file.");
    }
  }, []);

  const updatePreview = useCallback(
    (canvas: HTMLCanvasElement, opts: PreprocessingOptions) => {
      if (!previewCanvasRef.current) return;

      const hasAnyPreprocessing =
        opts.grayscale ||
        opts.contrast ||
        opts.noiseRemoval ||
        opts.deskew ||
        opts.binarize;

      const processed = hasAnyPreprocessing
        ? applyPreprocessing(canvas, opts)
        : canvas;

      const pc = previewCanvasRef.current;
      pc.width = processed.width;
      pc.height = processed.height;
      const pctx = pc.getContext("2d")!;
      pctx.drawImage(processed, 0, 0);

      // Detect skew angle if deskew is enabled
      if (opts.deskew) {
        const imgData = canvas
          .getContext("2d")!
          .getImageData(0, 0, canvas.width, canvas.height);
        const angle = detectSkewAngle(imgData);
        setSkewAngle(angle);
      } else {
        setSkewAngle(null);
      }
    },
    []
  );

  const handlePreprocessingChange = useCallback(
    (key: keyof PreprocessingOptions, value: boolean | number) => {
      setPreprocessing((prev) => {
        const next = { ...prev, [key]: value };
        if (sourceCanvasRef.current) {
          // Debounce preview updates for sliders
          requestAnimationFrame(() => {
            if (sourceCanvasRef.current) {
              updatePreview(sourceCanvasRef.current, next);
            }
          });
        }
        return next;
      });
    },
    [updatePreview]
  );

  // Update preview when preprocessing changes
  useEffect(() => {
    if (sourceCanvasRef.current) {
      updatePreview(sourceCanvasRef.current, preprocessing);
    }
  }, [preprocessing, updatePreview]);

  const extractText = async () => {
    if (!sourceCanvasRef.current) return;
    setProcessing(true);
    setProgress(0);
    setProgressLabel("Initializing OCR engine...");
    setError("");
    setResult(null);

    try {
      const hasAnyPreprocessing =
        preprocessing.grayscale ||
        preprocessing.contrast ||
        preprocessing.noiseRemoval ||
        preprocessing.deskew ||
        preprocessing.binarize;

      const processedCanvas = hasAnyPreprocessing
        ? applyPreprocessing(sourceCanvasRef.current, preprocessing)
        : sourceCanvasRef.current;

      // Create worker with proper v7 API
      const worker = await createWorker(language, 1, {
        logger: (m) => {
          if (m.status === "recognizing text") {
            setProgress(m.progress * 100);
            setProgressLabel("Recognizing text...");
          } else if (m.status === "loading language traineddata") {
            setProgress(m.progress * 100);
            setProgressLabel("Loading language data...");
          } else {
            setProgressLabel(m.status || "Processing...");
          }
        },
      });

      // Convert canvas to Blob for reliable input (avoids silent failures with raw canvas)
      const blob = await new Promise<Blob>((resolve, reject) => {
        processedCanvas.toBlob(
          (b) => (b ? resolve(b) : reject(new Error("Canvas toBlob failed"))),
          "image/png"
        );
      });

      const recognizeResult = await worker.recognize(blob);
      await worker.terminate();

      const text = recognizeResult.data.text.trim();
      const confidence = recognizeResult.data.confidence;
      const words = text
        ? text.split(/\s+/).filter((w: string) => w.length > 0)
        : [];

      const ocrResult: OcrResult = {
        text,
        confidence,
        wordCount: words.length,
        charCount: text.length,
      };

      setResult(ocrResult);
      setEditedText(text);
      setProgress(100);
      setProgressLabel("Complete!");
    } catch (err) {
      setError(
        `OCR failed: ${err instanceof Error ? err.message : "Unknown error"}. Please try again.`
      );
    } finally {
      setProcessing(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(editedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = editedText;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadText = () => {
    const blob = new Blob([editedText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file
      ? file.name.replace(/\.[^.]+$/, ".txt")
      : "extracted-text.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setFile(null);
    setImageUrl("");
    setResult(null);
    setEditedText("");
    setError("");
    setProgress(0);
    setProgressLabel("");
    setSkewAngle(null);
    setPreprocessing(defaultPreprocessingOptions);
    sourceCanvasRef.current = null;
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-success";
    if (confidence >= 60) return "text-warning";
    return "text-error";
  };

  // No file uploaded yet
  if (!file) {
    return (
      <DropZone
        onFiles={handleFiles}
        accept="image/jpeg,image/png,image/webp,image/bmp,image/tiff"
        multiple={false}
        label="Drop your image here for OCR"
        sublabel="or click to browse — JPG, PNG, WebP, BMP, TIFF"
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Image Preview Section */}
      <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text dark:text-text-dark">
            Image Preview
          </h2>
          <button
            onClick={reset}
            className="px-4 py-2 text-sm font-medium rounded-lg border border-border dark:border-border-dark text-text-light dark:text-text-dark-muted hover:bg-surface-alt dark:hover:bg-surface-dark transition-colors"
          >
            ✕ Reset
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Original */}
          <div>
            <p className="text-sm font-medium text-text-light dark:text-text-dark-muted mb-2">
              Original
            </p>
            <div className="border border-border dark:border-border-dark rounded-lg overflow-hidden bg-surface-alt dark:bg-surface-dark flex items-center justify-center min-h-[200px]">
              <canvas
                ref={originalCanvasRef}
                className="max-w-full max-h-[300px] object-contain"
              />
            </div>
          </div>

          {/* Processed Preview */}
          <div>
            <p className="text-sm font-medium text-text-light dark:text-text-dark-muted mb-2">
              Processed Preview
            </p>
            <div className="border border-border dark:border-border-dark rounded-lg overflow-hidden bg-surface-alt dark:bg-surface-dark flex items-center justify-center min-h-[200px]">
              <canvas
                ref={previewCanvasRef}
                className="max-w-full max-h-[300px] object-contain"
              />
            </div>
          </div>
        </div>

        <p className="mt-3 text-sm text-text-light dark:text-text-dark-muted">
          📄 {file.name} — {(file.size / 1024).toFixed(1)} KB
        </p>
      </div>

      {/* Preprocessing Panel */}
      <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-4 sm:p-6">
        <h2 className="text-lg font-semibold text-text dark:text-text-dark mb-4">
          🔧 Preprocessing Options
        </h2>
        <p className="text-sm text-text-light dark:text-text-dark-muted mb-4">
          Improve OCR accuracy by enabling image preprocessing filters.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Grayscale */}
          <label className="flex items-center gap-3 p-3 rounded-lg border border-border dark:border-border-dark hover:bg-surface-alt dark:hover:bg-surface-dark transition-colors cursor-pointer">
            <input
              type="checkbox"
              checked={preprocessing.grayscale}
              onChange={(e) =>
                handlePreprocessingChange("grayscale", e.target.checked)
              }
              className="w-4 h-4 rounded accent-primary"
            />
            <div>
              <span className="text-sm font-medium text-text dark:text-text-dark">
                Grayscale Conversion
              </span>
              <p className="text-xs text-text-light dark:text-text-dark-muted">
                Convert to grayscale for better text detection
              </p>
            </div>
          </label>

          {/* Noise Removal */}
          <label className="flex items-center gap-3 p-3 rounded-lg border border-border dark:border-border-dark hover:bg-surface-alt dark:hover:bg-surface-dark transition-colors cursor-pointer">
            <input
              type="checkbox"
              checked={preprocessing.noiseRemoval}
              onChange={(e) =>
                handlePreprocessingChange("noiseRemoval", e.target.checked)
              }
              className="w-4 h-4 rounded accent-primary"
            />
            <div>
              <span className="text-sm font-medium text-text dark:text-text-dark">
                Noise Removal
              </span>
              <p className="text-xs text-text-light dark:text-text-dark-muted">
                Median filter to reduce image noise
              </p>
            </div>
          </label>

          {/* Deskew */}
          <label className="flex items-center gap-3 p-3 rounded-lg border border-border dark:border-border-dark hover:bg-surface-alt dark:hover:bg-surface-dark transition-colors cursor-pointer">
            <input
              type="checkbox"
              checked={preprocessing.deskew}
              onChange={(e) =>
                handlePreprocessingChange("deskew", e.target.checked)
              }
              className="w-4 h-4 rounded accent-primary"
            />
            <div>
              <span className="text-sm font-medium text-text dark:text-text-dark">
                Deskew Detection
              </span>
              <p className="text-xs text-text-light dark:text-text-dark-muted">
                Auto-correct tilted text
                {skewAngle !== null && (
                  <span className="ml-1 text-primary dark:text-primary-light font-medium">
                    (detected: {skewAngle.toFixed(1)}°)
                  </span>
                )}
              </p>
            </div>
          </label>

          {/* Contrast Enhancement */}
          <div className="p-3 rounded-lg border border-border dark:border-border-dark">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={preprocessing.contrast}
                onChange={(e) =>
                  handlePreprocessingChange("contrast", e.target.checked)
                }
                className="w-4 h-4 rounded accent-primary"
              />
              <div>
                <span className="text-sm font-medium text-text dark:text-text-dark">
                  Contrast Enhancement
                </span>
                <p className="text-xs text-text-light dark:text-text-dark-muted">
                  Stretch histogram for better contrast
                </p>
              </div>
            </label>
            {preprocessing.contrast && (
              <div className="mt-3 ml-7">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-text-light dark:text-text-dark-muted">
                    Intensity
                  </span>
                  <span className="text-xs font-medium text-text dark:text-text-dark">
                    {preprocessing.contrastIntensity}%
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={200}
                  value={preprocessing.contrastIntensity}
                  onChange={(e) =>
                    handlePreprocessingChange(
                      "contrastIntensity",
                      Number(e.target.value)
                    )
                  }
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
            )}
          </div>

          {/* Binarize */}
          <div className="p-3 rounded-lg border border-border dark:border-border-dark sm:col-span-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={preprocessing.binarize}
                onChange={(e) =>
                  handlePreprocessingChange("binarize", e.target.checked)
                }
                className="w-4 h-4 rounded accent-primary"
              />
              <div>
                <span className="text-sm font-medium text-text dark:text-text-dark">
                  Threshold / Binarize
                </span>
                <p className="text-xs text-text-light dark:text-text-dark-muted">
                  Convert to pure black and white
                </p>
              </div>
            </label>
            {preprocessing.binarize && (
              <div className="mt-3 ml-7">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-text-light dark:text-text-dark-muted">
                    Threshold
                  </span>
                  <span className="text-xs font-medium text-text dark:text-text-dark">
                    {preprocessing.binarizeThreshold}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={255}
                  value={preprocessing.binarizeThreshold}
                  onChange={(e) =>
                    handlePreprocessingChange(
                      "binarizeThreshold",
                      Number(e.target.value)
                    )
                  }
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Language & Extract Section */}
      <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-text dark:text-text-dark mb-1">
              🌐 Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              disabled={processing}
              className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-border dark:border-border-dark bg-surface dark:bg-surface-dark text-text dark:text-text-dark text-sm focus:ring-2 focus:ring-primary focus:border-primary"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={extractText}
            disabled={processing}
            className="px-6 py-2.5 rounded-lg font-semibold text-sm bg-primary hover:bg-primary-dark text-surface transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {processing ? "Extracting..." : "📝 Extract Text"}
          </button>
        </div>

        {/* Progress */}
        {processing && (
          <div className="mt-4">
            <ProgressBar
              progress={progress}
              label={progressLabel}
              showPercent
            />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-4 p-3 rounded-lg bg-error-bg border border-error/20 text-error text-sm">
            {error}
          </div>
        )}
      </div>

      {/* Results Section */}
      {result && (
        <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text dark:text-text-dark">
              📄 Extracted Text
            </h2>
            <div className="flex items-center gap-3">
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-primary hover:bg-primary-dark text-surface transition-colors"
              >
                {copied ? "✓ Copied!" : "📋 Copy"}
              </button>
              <button
                onClick={downloadText}
                className="px-4 py-2 text-sm font-medium rounded-lg border border-border dark:border-border-dark text-text dark:text-text-dark hover:bg-surface-alt dark:hover:bg-surface-dark transition-colors"
              >
                💾 Download .txt
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center p-3 rounded-lg bg-surface-alt dark:bg-surface-dark border border-border/50 dark:border-border-dark/50">
              <p className="text-xs text-text-light dark:text-text-dark-muted">
                Confidence
              </p>
              <p
                className={`text-lg font-bold ${getConfidenceColor(result.confidence)}`}
              >
                {result.confidence.toFixed(1)}%
              </p>
            </div>
            <div className="text-center p-3 rounded-lg bg-surface-alt dark:bg-surface-dark border border-border/50 dark:border-border-dark/50">
              <p className="text-xs text-text-light dark:text-text-dark-muted">
                Words
              </p>
              <p className="text-lg font-bold text-text dark:text-text-dark">
                {result.wordCount.toLocaleString()}
              </p>
            </div>
            <div className="text-center p-3 rounded-lg bg-surface-alt dark:bg-surface-dark border border-border/50 dark:border-border-dark/50">
              <p className="text-xs text-text-light dark:text-text-dark-muted">
                Characters
              </p>
              <p className="text-lg font-bold text-text dark:text-text-dark">
                {result.charCount.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Editable Text Area */}
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            rows={12}
            className="w-full px-4 py-3 rounded-lg border border-border dark:border-border-dark bg-surface dark:bg-surface-dark text-text dark:text-text-dark text-sm font-mono leading-relaxed resize-y focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Extracted text will appear here..."
          />

          {result.text.length === 0 && (
            <p className="mt-2 text-sm text-warning">
              ⚠️ No text was detected in the image. Try enabling preprocessing
              options like Grayscale, Contrast Enhancement, or Binarize for
              better results.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
