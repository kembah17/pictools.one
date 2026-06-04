"use client";
import { useState, useEffect } from "react";

export type DeviceTier = "desktop" | "tablet" | "mobile";

export interface DeviceTierConfig {
  tier: DeviceTier;
  maxFileSize: number; // bytes
  maxTotalSize: number; // bytes
  maxImageDim: number; // max pixel dimension for OCR processing
  preprocessingLevel: "full" | "basic" | "minimal";
  warning: string;
  autoCompress: boolean;
}

const CONFIGS: Record<DeviceTier, Omit<DeviceTierConfig, "tier">> = {
  desktop: {
    maxFileSize: 20 * 1024 * 1024, // 20MB
    maxTotalSize: 100 * 1024 * 1024, // 100MB
    maxImageDim: 4000, // Cap at 4000px to prevent processing unnecessarily huge images
    preprocessingLevel: "full",
    warning: "Processing may take 10-30 seconds for large files.",
    autoCompress: false,
  },
  tablet: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    maxTotalSize: 50 * 1024 * 1024, // 50MB
    maxImageDim: 2000, // 2000px max for tablet
    preprocessingLevel: "basic",
    warning: "Processing may take 30-60 seconds. Keep this tab active.",
    autoCompress: false,
  },
  mobile: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    maxTotalSize: 20 * 1024 * 1024, // 20MB
    maxImageDim: 1500, // 1500px max for mobile (was 2000, reduced to prevent hanging)
    preprocessingLevel: "minimal",
    warning:
      "Processing may take 1-2 minutes on mobile. Keep screen on and tab active. Consider using desktop for large files.",
    autoCompress: true,
  },
};

function detectTier(): DeviceTier {
  if (typeof window === "undefined") return "desktop";

  const width = window.innerWidth;
  const cores = navigator.hardwareConcurrency || 2;

  // Desktop: screen width >= 1024px OR hardwareConcurrency >= 4
  if (width >= 1024 || cores >= 4) return "desktop";
  // Tablet: screen width 768-1023px OR hardwareConcurrency 2-3
  if (width >= 768 || cores >= 2) return "tablet";
  // Mobile: screen width < 768px OR hardwareConcurrency <= 2
  return "mobile";
}

export function useDeviceTier(): DeviceTierConfig {
  const [tier, setTier] = useState<DeviceTier>("desktop");

  useEffect(() => {
    setTier(detectTier());

    const handleResize = () => {
      setTier(detectTier());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { tier, ...CONFIGS[tier] };
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
