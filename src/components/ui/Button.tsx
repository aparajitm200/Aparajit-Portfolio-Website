// ─────────────────────────────────────────────
//  Component — Button
//  Reusable button / CTA primitive.
//  Supports multiple visual variants.
// ─────────────────────────────────────────────

import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'text'

interface ButtonBaseProps {
  variant?: ButtonVariant
  children: ReactNode
  className?: string
  disabled?: boolean
  'aria-label'?: string
}

interface ButtonAsButton extends ButtonBaseProps {
  as?: 'button'
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  href?: never
  external?: never
}

interface ButtonAsLink extends ButtonBaseProps {
  as: 'link'
  href: string
  external?: boolean
  onClick?: never
  type?: never
}

type ButtonProps = ButtonAsButton | ButtonAsLink

export function Button({
  variant = 'primary',
  children,
  className = '',
  disabled,
  'aria-label': ariaLabel,
  ...rest
}: ButtonProps) {
  const classes = `btn btn--${variant} t-meta ${className}`

  if (rest.as === 'link') {
    const { href, external } = rest
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
        >
          {children}
        </a>
      )
    }
    return (
      <Link to={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={rest.type ?? 'button'}
      className={classes}
      disabled={disabled}
      onClick={rest.onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
