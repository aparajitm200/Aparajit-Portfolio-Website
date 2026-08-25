// ─────────────────────────────────────────────
//  Page — Contact
// ─────────────────────────────────────────────

import { useEffect, useRef } from 'react'
import { PageTransition } from '../../components/motion/PageTransition'
import { gsap } from '../../animations/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './ContactPage.css'

export function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !containerRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.contact-hero__meta, .contact-hero__title, .contact-hero__sub', {
        y: 40, opacity: 0, duration: 1, ease: 'power4.out', stagger: 0.15,
      })
      gsap.from('.contact-info-block', {
        y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1,
        delay: 0.3
      })
    }, containerRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <PageTransition>
      <div className="contact-page" ref={containerRef}>
        <div className="container">
          
          <header className="contact-hero">
            <p className="t-meta contact-hero__meta">Get in Touch</p>
            <h1 className="t-display-lg contact-hero__title">
              Let's build<br />something together.
            </h1>
            <p className="t-body-lg contact-hero__sub">
              Open to internships, freelance projects & collaborations. <br/>
              I am available for immediate opportunities.
            </p>
          </header>

          <div className="contact-grid">
            <div className="contact-info-block">
              <span className="t-meta contact-info__label">Email</span>
              <a href="mailto:aparajitm200@gmail.com" className="t-heading-lg contact-info__link">
                aparajitm200@gmail.com ↗
              </a>
            </div>

            <div className="contact-info-block">
              <span className="t-meta contact-info__label">Phone</span>
              <a href="tel:+919634404340" className="t-heading-lg contact-info__link">
                +91 9634404340 ↗
              </a>
            </div>

            <div className="contact-info-block">
              <span className="t-meta contact-info__label">Socials</span>
              <div className="contact-info__socials">
                <a href="https://www.linkedin.com/in/aparajitmusyuni/" target="_blank" rel="noreferrer" className="t-heading-md contact-info__link">
                  LinkedIn ↗
                </a>
                <a href="https://www.behance.net/aparajitsingh" target="_blank" rel="noreferrer" className="t-heading-md contact-info__link">
                  Behance ↗
                </a>
              </div>
            </div>
            
            <div className="contact-info-block">
              <span className="t-meta contact-info__label">Location</span>
              <p className="t-heading-md contact-info__text">
                Based in India <br/>
                <span className="t-body-md text-muted">(Graphic Era Hill University)</span>
              </p>
            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  )
}
