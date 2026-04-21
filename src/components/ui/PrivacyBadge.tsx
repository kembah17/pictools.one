export default function PrivacyBadge() {
  return (
    <div className="flex items-center gap-2 px-4 py-2.5 bg-primary/5 dark:bg-primary/10 border border-primary/20 dark:border-primary/30 rounded-lg">
      <span className="text-lg">🔒</span>
      <span className="text-sm text-text-light dark:text-text-dark-muted">
        Your images never leave your device. All processing happens in your browser.
      </span>
    </div>
  );
}
