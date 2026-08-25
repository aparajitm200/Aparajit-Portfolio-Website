// ─────────────────────────────────────────────
//  Page — Home
//  Cinematic editorial homepage.
//  Sections:
//    0. Hero — full-viewport animated title
//    1. Featured Project — editorial spotlight
//    2. Marquee — discipline ticker
//    3. Selected Work — branding project grid
//    4. About — brief intro + CTA
//    5. Contact CTA — closing statement
// ─────────────────────────────────────────────

import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { PageTransition } from '../../components/motion/PageTransition'
import { brandingCategory } from '../../data/portfolio'
import { gsap } from '../../animations/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './HomePage.css'

// ── Featured project — primary spotlight ──────
const FEATURED_PROJECT = brandingCategory.projects.find(
  (p) => p.slug === 'crobstacle-india'
) ?? brandingCategory.projects[0]

// ── Work preview — next 4 projects ───────────
const PREVIEW_PROJECTS = brandingCategory.projects
  .filter((p) => p.slug !== FEATURED_PROJECT.slug)
  .slice(0, 4)

// ── Discipline ticker items ───────────────────
const DISCIPLINES = [
  'Brand Identity',
  'Visual Design',
  'UI / UX',
  'Motion',
  'Art Direction',
  'Social Media Design',
  'Video Editing',
  'Typography',
]

// ─────────────────────────────────────────────
//  HomePage
// ─────────────────────────────────────────────
export function HomePage() {
  const reduced = useReducedMotion()

  // ── Refs for GSAP hero animation ─────────────
  const heroRef     = useRef<HTMLElement>(null)
  const metaRef     = useRef<HTMLParagraphElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef      = useRef<HTMLDivElement>(null)
  const scrollRef   = useRef<HTMLDivElement>(null)

  // ── Parallax on scroll ────────────────────────
  const { scrollY } = useScroll()
  const heroY       = useTransform(scrollY, [0, 600], [0, reduced ? 0 : 80])
  const heroOpacity = useTransform(scrollY, [0, 500], [1, reduced ? 1 : 0])

  // ── GSAP hero entrance ────────────────────────
  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 })

      tl.from(metaRef.current, {
        y: 18, opacity: 0, duration: 0.65, ease: 'power3.out',
      })

      const words = headlineRef.current?.querySelectorAll('.word') ?? []
      tl.from(words, {
        y: '115%', opacity: 0, duration: 0.95,
        ease: 'power4.out', stagger: 0.07,
      }, '-=0.25')

      tl.from(subtitleRef.current, {
        y: 22, opacity: 0, duration: 0.7, ease: 'power3.out',
      }, '-=0.55')

      tl.from(ctaRef.current, {
        y: 16, opacity: 0, duration: 0.6, ease: 'power3.out',
      }, '-=0.45')

      tl.from(scrollRef.current, {
        opacity: 0, duration: 0.5, ease: 'power2.out',
      }, '-=0.2')
    }, heroRef)

    return () => ctx.revert()
  }, [reduced])

  return (
    <PageTransition>

      {/* ── 0. HERO ────────────────────────────── */}
      <section className="home-hero" ref={heroRef} aria-label="Introduction">
        <div className="home-hero__grain" aria-hidden="true" />

        <motion.div
          className="home-hero__content container"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <p ref={metaRef} className="home-hero__meta t-meta">
            Visual Designer · Based in India
          </p>

          {/* Headline — word-split for per-word GSAP reveal */}
          <h1 ref={headlineRef} className="home-hero__title t-display-xl">
            {['Aparajit', 'Singh'].map((word) => (
              <span key={word} className="word-wrapper">
                <span className="word">{word}</span>
              </span>
            ))}
            <span className="sr-only">Aparajit Singh</span>
          </h1>

          <p ref={subtitleRef} className="home-hero__subtitle t-body-lg">
            Crafting identity, interface &amp; motion —<br />
            one deliberate decision at a time.
          </p>

          <div ref={ctaRef} className="home-hero__cta">
            <Link to="/work" className="btn btn--primary home-cta-btn" aria-label="View selected work">
              View Work
            </Link>
            <Link to="/about" className="btn btn--ghost home-cta-btn" aria-label="About me">
              About Me
            </Link>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <div ref={scrollRef} className="home-hero__scroll" aria-hidden="true">
          <div className="scroll-line" />
          <span className="t-micro home-hero__scroll-label">Scroll</span>
        </div>

        <span className="home-hero__index t-micro" aria-hidden="true">01</span>
      </section>

      {/* ── 1. FEATURED PROJECT ────────────────── */}
      <FeaturedSection />

      {/* ── 2. MARQUEE ─────────────────────────── */}
      <MarqueeStrip />

      {/* ── 3. SELECTED WORK ───────────────────── */}
      <SelectedWorkSection />

      {/* ── 4. ABOUT SNAPSHOT ──────────────────── */}
      <AboutSnapshot />

      {/* ── 5. CONTACT CTA ─────────────────────── */}
      <ContactCTA />

    </PageTransition>
  )
}

// ─────────────────────────────────────────────
//  FeaturedSection — editorial project spotlight
// ─────────────────────────────────────────────
function FeaturedSection() {
  const ref     = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !ref.current) return
    const ctx = gsap.context(() => {
      // Label + number
      gsap.from('.featured__header', {
        y: 30, opacity: 0, duration: 0.75, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
      })
      // Large image block
      gsap.from('.featured__image-wrap', {
        clipPath: 'inset(100% 0% 0% 0%)',
        duration: 1.2, ease: 'power4.out',
        scrollTrigger: { trigger: '.featured__image-wrap', start: 'top 82%', once: true },
      })
      // Text block
      gsap.from(['.featured__project-tag', '.featured__title', '.featured__desc', '.featured__link'], {
        y: 28, opacity: 0, duration: 0.75, ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: '.featured__body', start: 'top 85%', once: true },
      })
      // Stats
      gsap.from('.featured__stat', {
        y: 20, opacity: 0, duration: 0.6, ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '.featured__stats', start: 'top 88%', once: true },
      })
    }, ref)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section className="featured-section" ref={ref} aria-label="Featured Project">
      <div className="container">

        {/* Section header row */}
        <div className="featured__header">
          <span className="t-micro home-section-index" aria-hidden="true">02</span>
          <span className="t-meta featured__label">Featured Project</span>
        </div>

        {/* Main editorial block */}
        <div className="featured__grid">

          {/* Left — large image */}
          <div className="featured__image-col">
            <div className="featured__image-wrap">
              {FEATURED_PROJECT.heroImage ? (
                <img
                  src={`/${FEATURED_PROJECT.heroImage}`}
                  alt={`${FEATURED_PROJECT.title} — featured project`}
                  className="featured__image featured__image--real"
                  loading="eager"
                />
              ) : (
                <div
                  className="featured__image img-placeholder"
                  role="img"
                  aria-label={`${FEATURED_PROJECT.title} featured image`}
                >
                  <span className="t-micro" style={{ color: 'var(--color-text-subtle)' }}>
                    {FEATURED_PROJECT.title}
                  </span>
                </div>
              )}
              {/* Floating project index badge */}
              <div className="featured__badge" aria-hidden="true">
                <span className="t-micro">01 / {brandingCategory.projects.length.toString().padStart(2, '0')}</span>
              </div>
            </div>
          </div>

          {/* Right — project info */}
          <div className="featured__body">
            <span className="featured__project-tag t-meta">
              {FEATURED_PROJECT.type}
            </span>

            <h2 className="featured__title t-display-md">
              {FEATURED_PROJECT.title}
            </h2>

            <p className="featured__desc t-body-lg">
              {FEATURED_PROJECT.description}
            </p>

            {/* Meta pills */}
            {FEATURED_PROJECT.tools && (
              <div className="featured__tools">
                {FEATURED_PROJECT.tools.map((tool) => (
                  <span key={tool} className="tag">{tool}</span>
                ))}
              </div>
            )}

            <Link
              to={`/work/branding/${FEATURED_PROJECT.slug}`}
              className="featured__link btn btn--primary"
              aria-label={`View ${FEATURED_PROJECT.title} project`}
            >
              View Project →
            </Link>

            {/* Stats row */}
            <div className="featured__stats" aria-label="Project details">
              <div className="featured__stat">
                <span className="featured__stat-value t-heading-sm">8</span>
                <span className="featured__stat-label t-micro">Projects</span>
              </div>
              <div className="featured__stat-divider" aria-hidden="true" />
              <div className="featured__stat">
                <span className="featured__stat-value t-heading-sm">2024</span>
                <span className="featured__stat-label t-micro">Year</span>
              </div>
              <div className="featured__stat-divider" aria-hidden="true" />
              <div className="featured__stat">
                <span className="featured__stat-value t-heading-sm">Branding</span>
                <span className="featured__stat-label t-micro">Category</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
//  MarqueeStrip
// ─────────────────────────────────────────────
function MarqueeStrip() {
  const items = [...DISCIPLINES, ...DISCIPLINES]

  return (
    <div className="marquee-section" aria-hidden="true">
      <div className="marquee-track">
        <div className="marquee-content">
          {items.map((item, i) => (
            <span key={i} className="marquee-item t-meta">
              {item}
              <span className="marquee-dot">·</span>
            </span>
          ))}
        </div>
        <div className="marquee-content" aria-hidden="true">
          {items.map((item, i) => (
            <span key={`b-${i}`} className="marquee-item t-meta">
              {item}
              <span className="marquee-dot">·</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
//  SelectedWorkSection
// ─────────────────────────────────────────────
function SelectedWorkSection() {
  const ref     = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !ref.current) return
    const ctx = gsap.context(() => {
      gsap.from('.work-section__header', {
        y: 40, opacity: 0, duration: 0.85, ease: 'power4.out',
        scrollTrigger: { trigger: '.work-section__header', start: 'top 85%', once: true },
      })
      gsap.from('.work-card', {
        y: 50, opacity: 0, duration: 0.8, ease: 'power4.out', stagger: 0.1,
        scrollTrigger: { trigger: '.work-grid', start: 'top 85%', once: true },
      })
    }, ref)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section className="work-section" ref={ref} aria-label="Selected Work">
      <div className="container">
        <div className="work-section__header">
          <div className="work-section__label-row">
            <span className="t-micro home-section-index" aria-hidden="true">03</span>
            <span className="t-meta work-section__label">Selected Work</span>
          </div>
          <div className="work-section__title-row">
            <h2 className="t-display-md work-section__title">
              Branding &amp;<br />Visual Design
            </h2>
            <Link to="/work" className="work-section__view-all t-meta btn btn--secondary" aria-label="View all work">
              View All Work →
            </Link>
          </div>
        </div>

        <div className="work-grid" role="list">
          {PREVIEW_PROJECTS.map((project, i) => (
            <WorkCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        <div className="work-section__mobile-cta">
          <Link to="/work/branding" className="btn btn--secondary" aria-label="View all branding projects">
            View All Branding →
          </Link>
        </div>
      </div>
    </section>
  )
}

interface WorkCardProps {
  project: (typeof brandingCategory.projects)[number]
  index: number
}

function WorkCard({ project, index }: WorkCardProps) {
  const [imgError, setImgError] = useState(false)

  return (
    <article
      className={`work-card work-card--${index % 2 === 0 ? 'portrait' : 'landscape'}`}
      role="listitem"
    >
      <Link
        to={`/work/branding/${project.slug}`}
        className="work-card__link"
        aria-label={`View ${project.title} project`}
      >
        <div className="work-card__image-wrapper">
          {project.thumbnailImage && !imgError ? (
            <img
              src={`/${project.thumbnailImage}`}
              alt={`${project.title} thumbnail`}
              className="work-card__image work-card__image--real"
              onError={() => setImgError(true)}
              loading="lazy"
            />
          ) : (
            <div className="work-card__image img-placeholder" aria-label={`${project.title} thumbnail`}>
              <span className="t-micro" style={{ color: 'var(--color-text-subtle)', letterSpacing: '0.1em' }}>
                {project.title}
              </span>
            </div>
          )}
          <div className="work-card__overlay" aria-hidden="true" />
        </div>
        <div className="work-card__info">
          <div className="work-card__meta">
            <span className="t-micro work-card__type">{project.type}</span>
            {project.year && <span className="t-micro work-card__year">{project.year}</span>}
          </div>
          <h3 className="work-card__title t-heading-md">{project.title}</h3>
          <span className="work-card__arrow t-meta" aria-hidden="true">→</span>
        </div>
      </Link>
    </article>
  )
}

// ─────────────────────────────────────────────
//  AboutSnapshot
// ─────────────────────────────────────────────
function AboutSnapshot() {
  const ref     = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !ref.current) return
    const ctx = gsap.context(() => {
      gsap.from('.about-snapshot__text', {
        y: 40, opacity: 0, duration: 1, ease: 'power4.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
      })
      gsap.from(['.about-snapshot__label', '.about-snapshot__cta', '.about-snapshot__tags'], {
        y: 20, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true },
      })
    }, ref)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section className="about-snapshot" ref={ref} aria-label="About Aparajit Singh">
      <div className="container">
        <div className="about-snapshot__inner">
          <div className="about-snapshot__left">
            <span className="t-micro home-section-index about-snapshot__label" aria-hidden="true">04</span>
            <span className="t-meta about-snapshot__label">About</span>
            <div className="about-snapshot__image-wrapper" style={{ marginTop: 'var(--space-8)', maxWidth: '200px', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              <img src="/images/profile.png" alt="Aparajit Singh" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
          </div>

          <div className="about-snapshot__right">
            <p className="about-snapshot__text t-display-md">
              I'm a multidisciplinary visual designer who believes every design decision should have a reason — and that reason should always serve the story.
            </p>

            <div className="about-snapshot__details">
              <div className="about-snapshot__tags">
                {['Brand Identity', 'UI / UX', 'Motion', 'Art Direction'].map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <Link to="/about" className="about-snapshot__cta btn btn--text" aria-label="Read more about Aparajit">
                Read more →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
//  ContactCTA
// ─────────────────────────────────────────────
function ContactCTA() {
  const ref     = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !ref.current) return
    const ctx = gsap.context(() => {
      gsap.from('.contact-cta__title', {
        y: 40, opacity: 0, duration: 1, ease: 'power4.out',
        scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
      })
      gsap.from(['.contact-cta__sub', '.contact-cta__actions'], {
        y: 20, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true },
      })
    }, ref)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section className="contact-cta" ref={ref} aria-label="Get in touch">
      <div className="container">
        <span className="t-micro home-section-index" aria-hidden="true">05</span>

        <h2 className="contact-cta__title t-display-lg">
          Let's build<br />something together.
        </h2>

        <p className="contact-cta__sub t-body-lg">
          Open to internships, freelance projects &amp; collaborations.
        </p>

        <div className="contact-cta__actions">
          <a href="mailto:aparajitm200@gmail.com" className="btn btn--primary" aria-label="Email Aparajit">
            Email Me
          </a>
          <a href="https://www.linkedin.com/in/aparajitmusyuni/" target="_blank" rel="noreferrer" className="btn btn--secondary" aria-label="LinkedIn">
            LinkedIn
          </a>
          <a href="https://www.behance.net/aparajitsingh" target="_blank" rel="noreferrer" className="btn btn--secondary" aria-label="Behance">
            Behance
          </a>
        </div>
      </div>
    </section>
  )
}
