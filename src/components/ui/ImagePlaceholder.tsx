// ─────────────────────────────────────────────
//  Component — ImagePlaceholder
//  Used while actual portfolio images are
//  not yet available. Shows aspect-ratio box
//  with project label.
// ─────────────────────────────────────────────

interface ImagePlaceholderProps {
  label?: string
  aspectRatio?: string   // e.g. "16/9", "4/3", "1/1"
  className?: string
}

export function ImagePlaceholder({
  label = 'Image',
  aspectRatio = '16/9',
  className = '',
}: ImagePlaceholderProps) {
  return (
    <div
      className={`img-placeholder ${className}`}
      style={{ aspectRatio }}
      role="img"
      aria-label={label}
    >
      <span className="t-micro" style={{ color: 'var(--color-text-subtle)' }}>
        {label}
      </span>
    </div>
  )
}
