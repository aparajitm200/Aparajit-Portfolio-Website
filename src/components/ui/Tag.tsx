// ─────────────────────────────────────────────
//  Component — Tag
//  Small metadata tag / label chip.
// ─────────────────────────────────────────────

interface TagProps {
  children: React.ReactNode
  className?: string
}

export function Tag({ children, className = '' }: TagProps) {
  return (
    <span className={`tag t-micro ${className}`}>
      {children}
    </span>
  )
}
