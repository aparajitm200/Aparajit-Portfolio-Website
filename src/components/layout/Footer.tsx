// ─────────────────────────────────────────────
//  Component — Footer
//  Minimal editorial footer.
// ─────────────────────────────────────────────

import { Link } from 'react-router-dom'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner container">
        <div className="footer__brand">
          <Link to="/" className="footer__brand-link">
            Aparajit Singh
          </Link>
          <p className="footer__tagline t-meta" style={{ color: 'var(--color-text-muted)' }}>
            Visual Designer
          </p>
        </div>

        <nav className="footer__nav" aria-label="Footer navigation">
          <ul className="footer__links" role="list">
            <li><Link to="/work" className="footer__link t-meta">Work</Link></li>
            <li><Link to="/about" className="footer__link t-meta">About</Link></li>
            <li><Link to="/resume" className="footer__link t-meta">Resume</Link></li>
            <li><Link to="/contact" className="footer__link t-meta">Contact</Link></li>
          </ul>
        </nav>

        <p className="footer__copy t-meta" style={{ color: 'var(--color-text-subtle)' }}>
          &copy; {year} Aparajit Singh
        </p>
      </div>
    </footer>
  )
}
