interface AdSlotProps {
  className?: string;
  label?: string;
}

export default function AdSlot({ className = "", label = "Ad Space" }: AdSlotProps) {
  return (
    <div className={`ad-slot ${className}`}
      style={{
        backgroundColor: 'var(--color-surface-alt, #F3F4F6)',
        border: '1px dashed var(--color-border, #D1D5DB)',
        borderRadius: '0.5rem',
        padding: '1rem',
        textAlign: 'center' as const,
        fontSize: '0.875rem',
        color: 'var(--color-muted, #64748B)',
      }}
    >
      <span>{label}</span>
    </div>
  );
}
