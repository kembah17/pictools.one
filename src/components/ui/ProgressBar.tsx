"use client";

interface ProgressBarProps {
  progress: number;
  label?: string;
  showPercent?: boolean;
}

export default function ProgressBar({ progress, label, showPercent = true }: ProgressBarProps) {
  return (
    <div className="w-full">
      {(label || showPercent) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-sm text-text-light dark:text-text-dark-muted">{label}</span>}
          {showPercent && <span className="text-sm font-medium text-text dark:text-text-dark">{Math.round(progress)}%</span>}
        </div>
      )}
      <div className="w-full h-2.5 bg-surface-alt dark:bg-surface-dark-alt rounded-full overflow-hidden border border-border/30 dark:border-border-dark/30">
        <div
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );
}
