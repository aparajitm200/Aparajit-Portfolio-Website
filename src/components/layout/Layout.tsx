// ─────────────────────────────────────────────
//  Component — Layout
//  Root layout wrapper: Navbar + Page + Footer
// ─────────────────────────────────────────────

import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Navbar } from '../navigation/Navbar'
import { Footer } from './Footer'

export function Layout() {
  const location = useLocation()

  return (
    <div className="site-layout">
      <Navbar />

      <main id="main-content" className="site-main" tabIndex={-1}>
        <AnimatePresence mode="wait" initial={false}>
          {/* Key on location.pathname drives enter/exit */}
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}
