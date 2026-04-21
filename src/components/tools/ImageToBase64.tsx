"use client";
import { useState, useCallback } from "react";
import DropZone from "@/components/ui/DropZone";
import { formatFileSize, fileToDataUrl } from "@/lib/utils";

export default function ImageToBase64() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  // Encode state
  const [file, setFile] = useState<File | null>(null);
  const [dataUri, setDataUri] = useState("");
  const [rawBase64, setRawBase64] = useState("");
  const [copied, setCopied] = useState("");
  // Decode state
  const [base64Input, setBase64Input] = useState("");
  const [decodedUrl, setDecodedUrl] = useState("");
  const [decodeError, setDecodeError] = useState("");

  const handleFiles = useCallback(async (files: File[]) => {
    const f = files[0];
    if (!f) return;
    setFile(f);
    const uri = await fileToDataUrl(f);
    setDataUri(uri);
    // Extract raw base64 (remove data:...;base64, prefix)
    const raw = uri.split(",")[1] || "";
    setRawBase64(raw);
  }, []);

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(""), 2000);
    } catch {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(label);
      setTimeout(() => setCopied(""), 2000);
    }
  };

  const decodeBase64 = () => {
    setDecodeError("");
    setDecodedUrl("");
    try {
      let input = base64Input.trim();
      // If it's already a data URI, use as-is
      if (input.startsWith("data:image")) {
        setDecodedUrl(input);
        return;
      }
      // Try to create a data URI
      // Detect format from base64 header bytes
      let mime = "image/png";
      if (input.startsWith("/9j/")) mime = "image/jpeg";
      else if (input.startsWith("iVBOR")) mime = "image/png";
      else if (input.startsWith("UklGR")) mime = "image/webp";
      else if (input.startsWith("AAAA")) mime = "image/avif";

      // Validate base64
      atob(input);
      setDecodedUrl(`data:${mime};base64,${input}`);
    } catch {
      setDecodeError("Invalid Base64 string. Please check your input.");
    }
  };

  const downloadDecoded = () => {
    if (!decodedUrl) return;
    const a = document.createElement("a");
    a.href = decodedUrl;
    const mime = decodedUrl.split(";")[0].split(":")[1] || "image/png";
    const ext = mime.split("/")[1] === "jpeg" ? "jpg" : mime.split("/")[1];
    a.download = `decoded_image.${ext}`;
    a.click();
  };

  const resetEncode = () => {
    setFile(null);
    setDataUri("");
    setRawBase64("");
  };

  return (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setMode("encode")}
          className={`px-5 py-2.5 text-sm font-semibold rounded-lg border transition-colors ${
            mode === "encode"
              ? "border-primary bg-primary text-surface"
              : "border-border dark:border-border-dark text-text dark:text-text-dark hover:border-primary hover:text-primary"
          }`}
        >
          Image → Base64
        </button>
        <button
          onClick={() => setMode("decode")}
          className={`px-5 py-2.5 text-sm font-semibold rounded-lg border transition-colors ${
            mode === "decode"
              ? "border-primary bg-primary text-surface"
              : "border-border dark:border-border-dark text-text dark:text-text-dark hover:border-primary hover:text-primary"
          }`}
        >
          Base64 → Image
        </button>
      </div>

      {mode === "encode" ? (
        <>
          {!file ? (
            <DropZone onFiles={handleFiles} label="Drop your image here" sublabel="or click to browse — JPG, PNG, WebP, AVIF" />
          ) : (
            <>
              {/* Preview */}
              <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl overflow-hidden shadow-md" style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}>
                <div className="p-4 border-b border-border dark:border-border-dark flex items-center justify-between">
                  <div>
                    <p className="font-medium text-text dark:text-text-dark">{file.name}</p>
                    <p className="text-sm text-text-light dark:text-text-dark-muted">
                      {formatFileSize(file.size)} • Base64 length: {rawBase64.length.toLocaleString()} chars • ~{formatFileSize(Math.ceil(rawBase64.length * 0.75))}
                    </p>
                  </div>
                  <button
                    onClick={resetEncode}
                    className="px-3 py-1.5 text-sm border border-border dark:border-border-dark text-text-light dark:text-text-dark-muted rounded-lg hover:bg-surface-alt dark:hover:bg-surface-dark transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <div className="p-4 flex justify-center bg-surface-alt dark:bg-surface-dark">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={dataUri} alt="Preview" className="max-w-full max-h-64 object-contain" />
                </div>
              </div>

              {/* Data URI Output */}
              <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-5 shadow-md" style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-text dark:text-text-dark">Data URI</h3>
                  <button
                    onClick={() => copyToClipboard(dataUri, "datauri")}
                    className="px-4 py-1.5 text-sm bg-primary text-surface rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    {copied === "datauri" ? "✓ Copied!" : "Copy Data URI"}
                  </button>
                </div>
                <div className="bg-surface-alt dark:bg-surface-dark rounded-lg p-3 max-h-32 overflow-auto">
                  <code className="text-xs break-all text-text-light dark:text-text-dark-muted font-mono">
                    {dataUri.substring(0, 500)}{dataUri.length > 500 ? "..." : ""}
                  </code>
                </div>
              </div>

              {/* Raw Base64 Output */}
              <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-5 shadow-md" style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-text dark:text-text-dark">Raw Base64</h3>
                  <button
                    onClick={() => copyToClipboard(rawBase64, "raw")}
                    className="px-4 py-1.5 text-sm bg-primary text-surface rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    {copied === "raw" ? "✓ Copied!" : "Copy Raw Base64"}
                  </button>
                </div>
                <div className="bg-surface-alt dark:bg-surface-dark rounded-lg p-3 max-h-32 overflow-auto">
                  <code className="text-xs break-all text-text-light dark:text-text-dark-muted font-mono">
                    {rawBase64.substring(0, 500)}{rawBase64.length > 500 ? "..." : ""}
                  </code>
                </div>
              </div>

              {/* HTML Snippet */}
              <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-5 shadow-md" style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-text dark:text-text-dark">HTML Embed Code</h3>
                  <button
                    onClick={() => copyToClipboard(`<img src="${dataUri}" alt="Embedded Image" />`, "html")}
                    className="px-4 py-1.5 text-sm bg-primary text-surface rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    {copied === "html" ? "✓ Copied!" : "Copy HTML"}
                  </button>
                </div>
                <div className="bg-surface-alt dark:bg-surface-dark rounded-lg p-3 max-h-24 overflow-auto">
                  <code className="text-xs break-all text-text-light dark:text-text-dark-muted font-mono">
                    {`<img src="${dataUri.substring(0, 80)}..." alt="Embedded Image" />`}
                  </code>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        /* Decode Mode */
        <>
          <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-5 shadow-md" style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}>
            <h3 className="font-semibold text-text dark:text-text-dark mb-3">Paste Base64 String</h3>
            <textarea
              value={base64Input}
              onChange={(e) => setBase64Input(e.target.value)}
              placeholder="Paste your Base64 string or data URI here..."
              rows={6}
              className="w-full px-3 py-2 rounded-lg border border-border dark:border-border-dark bg-surface dark:bg-surface-dark text-text dark:text-text-dark font-mono text-xs focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-y"
            />
            <div className="mt-3 flex gap-3">
              <button
                onClick={decodeBase64}
                disabled={!base64Input.trim()}
                className="px-6 py-2.5 bg-primary text-surface font-semibold rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Decode to Image
              </button>
              {decodedUrl && (
                <button
                  onClick={downloadDecoded}
                  className="px-6 py-2.5 bg-secondary text-surface font-semibold rounded-lg hover:bg-secondary/90 transition-colors"
                >
                  Download Image
                </button>
              )}
            </div>
            {decodeError && (
              <p className="mt-2 text-sm text-secondary">{decodeError}</p>
            )}
          </div>

          {decodedUrl && (
            <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl overflow-hidden shadow-md" style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}>
              <div className="p-3 border-b border-border dark:border-border-dark">
                <p className="text-sm font-medium text-text dark:text-text-dark">Decoded Image Preview</p>
              </div>
              <div className="p-4 flex justify-center bg-surface-alt dark:bg-surface-dark">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={decodedUrl} alt="Decoded" className="max-w-full max-h-96 object-contain" />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
