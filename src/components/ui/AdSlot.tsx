interface AdSlotProps {
  className?: string;
  label?: string;
}

export default function AdSlot({ className = "", label = "Ad Space" }: AdSlotProps) {
  return (
    <div className={`ad-slot ${className}`}>
      <span>{label}</span>
    </div>
  );
}
