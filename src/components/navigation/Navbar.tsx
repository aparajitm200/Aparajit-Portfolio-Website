// ─────────────────────────────────────────────
//  Component — Navbar
//  Premium minimal navigation.
//  Supports: transparent overlay, scroll state,
//  active page detection, mobile menu toggle.
// ─────────────────────────────────────────────

import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MobileMenu } from './MobileMenu'

const NAV_LINKS = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Resume', href: '/resume' },
  { label: 'Contact', href: '/contact' },
] as const

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Track scroll position for navbar background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header
        className="navbar"
        data-scrolled={scrolled}
        role="banner"
      >
        <nav
          className="navbar__inner container"
          aria-label="Primary navigation"
        >
          {/* Brand / Logo */}
          <Link
            to="/"
            className="navbar__brand"
            aria-label="Aparajit Singh — Home"
          >
            <span className="navbar__brand-text">Aparajit Singh</span>
          </Link>

          {/* Desktop Links */}
          <ul className="navbar__links" role="list">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <NavLink
                  to={href}
                  className={({ isActive }) =>
                    `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Mobile Toggle */}
          <button
            id="mobile-menu-toggle"
            className="navbar__toggle"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <MobileMenu
            links={NAV_LINKS}
            onClose={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

// ── Menu Icon (hamburger → close) ─────────────
function MenuIcon({ open }: { open: boolean }) {
  return (
    <motion.span
      className="menu-icon"
      aria-hidden="true"
      animate={open ? 'open' : 'closed'}
    >
      <motion.span
        className="menu-icon__line menu-icon__line--top"
        variants={{
          closed: { rotate: 0, y: 0 },
          open: { rotate: 45, y: '6px' },
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.span
        className="menu-icon__line menu-icon__line--mid"
        variants={{
          closed: { opacity: 1, scaleX: 1 },
          open: { opacity: 0, scaleX: 0 },
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="menu-icon__line menu-icon__line--bot"
        variants={{
          closed: { rotate: 0, y: 0 },
          open: { rotate: -45, y: '-6px' },
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.span>
  )
}
