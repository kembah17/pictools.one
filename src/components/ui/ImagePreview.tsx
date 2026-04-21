"use client";
import { formatFileSize } from "@/lib/utils";

interface ImagePreviewProps {
  src: string;
  name?: string;
  size?: number;
  width?: number;
  height?: number;
  label?: string;
  onRemove?: () => void;
}

export default function ImagePreview({
  src,
  name,
  size,
  width,
  height,
  label,
  onRemove,
}: ImagePreviewProps) {
  return (
    <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-lg overflow-hidden">
      {label && (
        <div className="px-3 py-1.5 bg-surface-alt dark:bg-surface-dark text-xs font-medium text-text-light dark:text-text-dark-muted border-b border-border dark:border-border-dark">
          {label}
        </div>
      )}
      <div className="relative aspect-video bg-surface-alt dark:bg-surface-dark flex items-center justify-center p-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={name || "Preview"}
          className="max-w-full max-h-full object-contain"
        />
        {onRemove && (
          <button
            onClick={onRemove}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-surface dark:bg-surface-dark border border-border dark:border-border-dark flex items-center justify-center text-sm hover:bg-secondary hover:text-surface hover:border-secondary transition-colors"
            aria-label="Remove image"
          >
            ✕
          </button>
        )}
      </div>
      {(name || size !== undefined || width) && (
        <div className="px-3 py-2 text-xs text-text-light dark:text-text-dark-muted space-y-0.5">
          {name && <p className="font-medium truncate text-text dark:text-text-dark">{name}</p>}
          <div className="flex gap-3 flex-wrap">
            {size !== undefined && <span>{formatFileSize(size)}</span>}
            {width && height && <span>{width} × {height}px</span>}
          </div>
        </div>
      )}
    </div>
  );
}
