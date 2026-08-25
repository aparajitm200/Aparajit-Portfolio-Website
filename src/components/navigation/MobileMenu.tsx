// ─────────────────────────────────────────────
//  Component — MobileMenu
//  Full-screen animated mobile navigation.
//  Rendered via AnimatePresence in Navbar.tsx.
// ─────────────────────────────────────────────

import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { mobileMenuVariants, menuLinkVariants } from '../../animations/variants'

interface MobileMenuProps {
  links: ReadonlyArray<{ label: string; href: string }>
  onClose: () => void
}

export function MobileMenu({ links, onClose }: MobileMenuProps) {
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  // Move focus to first link when menu opens
  useEffect(() => {
    firstLinkRef.current?.focus()
  }, [])

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <motion.div
      id="mobile-menu"
      className="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      variants={mobileMenuVariants}
      initial="closed"
      animate="open"
      exit="closed"
    >
      {/* Background overlay click to close */}
      <button
        className="mobile-menu__backdrop"
        onClick={onClose}
        aria-label="Close menu"
        tabIndex={-1}
      />

      <nav className="mobile-menu__nav" aria-label="Mobile navigation">
        <ul className="mobile-menu__list" role="list">
          {links.map(({ label, href }, i) => (
            <motion.li
              key={href}
              className="mobile-menu__item"
              custom={i}
              variants={menuLinkVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <NavLink
                to={href}
                ref={i === 0 ? firstLinkRef : undefined}
                className={({ isActive }) =>
                  `mobile-menu__link t-display-md ${isActive ? 'mobile-menu__link--active' : ''}`
                }
                onClick={onClose}
              >
                {label}
              </NavLink>
            </motion.li>
          ))}
        </ul>

        {/* Footer inside menu */}
        <motion.div
          className="mobile-menu__footer t-meta"
          custom={links.length}
          variants={menuLinkVariants}
          initial="closed"
          animate="open"
          exit="closed"
        >
          <span style={{ color: 'var(--color-text-muted)' }}>
            Aparajit Singh — Visual Designer
          </span>
        </motion.div>
      </nav>
    </motion.div>
  )
}
