"use client";
import { useCallback, useState, useRef } from "react";

interface DropZoneProps {
  onFiles: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  label?: string;
  sublabel?: string;
  maxFiles?: number;
}

export default function DropZone({
  onFiles,
  accept = "image/jpeg,image/png,image/webp,image/avif",
  multiple = false,
  label = "Drop your images here",
  sublabel = "or click to browse",
  maxFiles,
}: DropZoneProps) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const files = Array.from(e.dataTransfer.files).filter((f) =>
        accept.split(",").some((t) => f.type === t.trim())
      );
      if (maxFiles) onFiles(files.slice(0, maxFiles));
      else onFiles(files);
    },
    [accept, maxFiles, onFiles]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (maxFiles) onFiles(files.slice(0, maxFiles));
      else onFiles(files);
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      className={`relative cursor-pointer border-2 border-dashed rounded-xl p-8 sm:p-12 text-center transition-all duration-200 ${
        dragOver
          ? "border-primary bg-primary/5 dark:bg-primary/10 scale-[1.02]"
          : "border-border dark:border-border-dark hover:border-primary dark:hover:border-primary-light hover:bg-surface-alt dark:hover:bg-surface-dark-alt"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        className="hidden"
      />
      <div className="flex flex-col items-center gap-3">
        <div className="text-4xl">📁</div>
        <p className="text-lg font-semibold text-text dark:text-text-dark">{label}</p>
        <p className="text-sm text-text-light dark:text-text-dark-muted">{sublabel}</p>
        <p className="text-xs text-text-light dark:text-text-dark-muted">
          Supports: JPG, PNG, WebP, AVIF{multiple ? " • Multiple files allowed" : ""}
        </p>
      </div>
    </div>
  );
}
