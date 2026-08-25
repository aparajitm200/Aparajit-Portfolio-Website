// ─────────────────────────────────────────────
//  Page — Resume
// ─────────────────────────────────────────────

import { PageTransition } from '../../components/motion/PageTransition'
import { Button } from '../../components/ui/Button'

export function ResumePage() {
  return (
    <PageTransition>
      <div style={{ paddingTop: 'calc(var(--space-20) + 60px)', minHeight: '80dvh' }}>
        <div className="container">
          <header style={{ marginBottom: 'var(--space-12)' }}>
            <p className="t-meta" style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)' }}>
              Resume / CV
            </p>
            <h1 className="t-display-lg">Aparajit Singh</h1>
          </header>

          <p className="t-body-lg" style={{ color: 'var(--color-text-muted)', maxWidth: '46ch', marginBottom: 'var(--space-10)', lineHeight: 'var(--leading-relaxed)' }}>
            I am currently a final-year student at Graphic Era Hill University, completing my B.Des in Animation and Gaming. I am actively looking for User Interaction Designer or UI/UX roles.
          </p>

          <Button
            as="link"
            href="https://drive.google.com/file/d/1zjLdyRvgbumbEUK21jkp5Y0uaFUWsrIO/view?usp=sharing"
            external
            variant="primary"
            aria-label="View Aparajit Singh resume on Google Drive"
          >
            View Resume ↗
          </Button>
        </div>
      </div>
    </PageTransition>
  )
}
