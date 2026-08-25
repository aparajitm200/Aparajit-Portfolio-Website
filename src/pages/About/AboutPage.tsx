// ─────────────────────────────────────────────
//  Page — About
//  Full cinematic About page.
// ─────────────────────────────────────────────

import { useEffect, useRef } from 'react'
import { PageTransition } from '../../components/motion/PageTransition'
import { gsap } from '../../animations/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './AboutPage.css'

export function AboutPage() {
  const reduced = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)
  reduced.current = useReducedMotion()

  useEffect(() => {
    if (reduced.current || !containerRef.current) return
    const ctx = gsap.context(() => {
      // Intro fade in
      gsap.from('.about-intro__text, .about-intro__sub', {
        y: 40, opacity: 0, duration: 1, ease: 'power4.out', stagger: 0.15,
      })
      // Skills reveal
      gsap.from('.about-skill', {
        y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.05,
        scrollTrigger: { trigger: '.about-skills', start: 'top 85%', once: true },
      })
      // FAQs reveal
      gsap.from('.faq-item', {
        y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: '.about-faqs', start: 'top 85%', once: true },
      })
      // CTA reveal
      gsap.from('.about-cta__title, .about-cta__links a, .about-cta__meta', {
        y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: '.about-cta', start: 'top 85%', once: true },
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const skills = [
    'BRANDING',
    'MOTION GRAPHICS',
    'PHOTO',
    'UI & UX DESIGN',
    'VIDEO EDIT',
  ]

  const faqs = [
    {
      q: 'How do you approach a design problem?',
      a: 'I view design as a holistic process where aesthetics, functionality, and storytelling meet. I don\'t just design screens; I design complete ecosystems.\n\nMy process starts with understanding the "why" behind the user\'s problem. Once the strategy is clear, I leverage my background in Animation and Gaming to craft the solution—combining strong visual hierarchy for clarity, interaction design for usability, and motion for delight. I aim to build digital experiences that are not just functional, but memorable.',
    },
    {
      q: 'What tools and workflows are you proficient in?',
      a: 'I am proficient in industry-standard tools like Figma for interface design and Adobe Creative Suite for visual assets. Given my Animation background, I am also comfortable with tools like After Effects for high-fidelity motion prototyping.',
    },
    {
      q: 'Are you open to full-time opportunities?',
      a: 'Yes! I am currently a final-year student at Graphic Era Hill University, completing my B.Des in Animation and Gaming. I am actively looking for User Interaction Designer or UI/UX roles (Internship or Full-time) where I can contribute my skills in visual storytelling and interface design.',
    },
    {
      q: 'When are you available to join?',
      a: 'I am open to immediate opportunities. I am ready to start full-time right away and can easily transition into a role while wrapping up my final degree requirements.',
    },
  ]

  return (
    <PageTransition>
      <div className="about-page" ref={containerRef}>
        
        {/* ── Intro Section ────────────────────── */}
        <section className="about-intro container">
          <div className="about-intro__header">
            <span className="t-meta about-label">About.</span>
            <a 
              href="https://drive.google.com/file/d/1zjLdyRvgbumbEUK21jkp5Y0uaFUWsrIO/view?usp=sharing" 
              target="_blank" 
              rel="noreferrer"
              className="t-meta about-cv-link"
            >
              Read.cv ↗
            </a>
          </div>
          
          <h1 className="about-intro__text t-display-lg">
            I’m Aparajit Singh — an aspiring digital designer currently looking for fresh opportunities to learn and grow.
          </h1>

          <div className="about-intro__image-wrapper" style={{ marginBottom: 'var(--space-16)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <img src="/images/profile.png" alt="Aparajit Singh" style={{ width: '100%', height: 'auto', maxHeight: '60vh', objectFit: 'cover', display: 'block' }} />
          </div>

          <div className="about-intro__sub-grid">
            <p className="about-intro__sub t-body-lg">
              I am currently pursuing a Bachelor of Design in Animation and Gaming from Graphic Era Hill University. I leverage this background to bring a unique perspective to User Interaction Design, applying principles of motion and visual storytelling to create intuitive interfaces.
            </p>
            <p className="about-intro__sub t-body-lg">
              My passion lies in the intersection of art and technology, creating visually captivating interfaces and elevating overall user digital experiences. I focus on designing highly functional interfaces that seamlessly bridge the gap between creative vision and practical user needs.
              <br /><br />
              <span style={{ color: 'var(--color-text)' }}>
                My goal is to craft engaging user flows that seamlessly blend dynamic aesthetics with seamless functionality.
              </span>
            </p>
          </div>
        </section>

        {/* ── Skills Section ───────────────────── */}
        <section className="about-skills">
          <div className="container">
            <span className="t-meta about-label">skills.</span>
            <div className="about-skills__list">
              {skills.map((skill) => (
                <div key={skill} className="about-skill t-display-md">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQs Section ─────────────────────── */}
        <section className="about-faqs container">
          <div className="about-faqs__grid">
            <div className="about-faqs__col">
              <span className="t-meta about-label">FAQs.</span>
            </div>
            <div className="about-faqs__col">
              <ul className="faq-list">
                {faqs.map((faq, i) => (
                  <li key={i} className="faq-item">
                    <h3 className="t-heading-lg faq-item__q">{faq.q}</h3>
                    <div className="faq-item__a-wrapper">
                      {faq.a.split('\n\n').map((paragraph, pIdx) => (
                        <p key={pIdx} className="t-body-lg faq-item__a">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Contact CTA Section ──────────────── */}
        <section className="about-cta container">
          <div className="about-cta__grid">
            <div className="about-cta__main">
              <h2 className="about-cta__title t-display-lg">
                Curious about what we can create together? <br />
                <span className="text-muted">Let’s bring something extraordinary to life!</span>
              </h2>
              <div className="about-cta__links">
                <a href="/contact" className="t-heading-lg cta-link">Get in Touch ↗</a>
                <a href="https://www.linkedin.com/in/aparajitmusyuni/" target="_blank" rel="noreferrer" className="t-heading-lg cta-link">Linkedin ↗</a>
                <a href="https://www.behance.net/aparajitsingh" target="_blank" rel="noreferrer" className="t-heading-lg cta-link">Behance ↗</a>
              </div>
            </div>
            
            <div className="about-cta__footer">
              <div className="about-cta__meta">
                <span className="t-meta text-muted">Status</span>
                <p className="t-body-md">Available For Work</p>
              </div>
              <div className="about-cta__meta">
                <span className="t-meta text-muted">Contact</span>
                <p className="t-body-md">+91 9634404340</p>
                <p className="t-body-md">aparajitm200@gmail.com</p>
              </div>
              <div className="about-cta__meta">
                <span className="t-meta text-muted">Credits</span>
                <p className="t-body-md">Designed & Developed<br/>by Aparajit Singh</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </PageTransition>
  )
}
