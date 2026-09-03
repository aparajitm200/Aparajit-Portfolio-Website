// ─────────────────────────────────────────────
//  Page — Branding Category
//  Production-ready grid of all brand projects
//  with real images, editorial layout.
// ─────────────────────────────────────────────

import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { PageTransition } from '../../components/motion/PageTransition'
import { brandingCategory } from '../../data/portfolio'
import { gsap } from '../../animations/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { ProgressiveImage } from '../../components/ui/ProgressiveImage'
import './BrandingPage.css'

export function BrandingPage() {
  const reduced   = useRef(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  reduced.current = useReducedMotion()

  useEffect(() => {
    if (reduced.current || !sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.branding-hero__meta, .branding-hero__title, .branding-hero__desc', {
        y: 30, opacity: 0, duration: 0.8, ease: 'power4.out', stagger: 0.1,
      })
      gsap.from('.brand-card', {
        y: 50, opacity: 0, duration: 0.75, ease: 'power4.out', stagger: 0.07,
        scrollTrigger: { trigger: '.brand-grid', start: 'top 88%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <PageTransition>
      <div className="branding-page" ref={sectionRef}>

        {/* ── Page Hero ─────────────────────────── */}
        <header className="branding-hero container">
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <ol role="list">
              <li><Link to="/work">Work</Link></li>
              <li aria-hidden="true">/</li>
              <li><span aria-current="page">Branding</span></li>
            </ol>
          </nav>

          <p className="branding-hero__meta t-meta">
            {brandingCategory.projects.length} Projects
          </p>
          <h1 className="branding-hero__title t-display-lg">Branding</h1>
          <p className="branding-hero__desc t-body-lg">
            {brandingCategory.description}
          </p>
        </header>

        {/* ── Brand Grid ────────────────────────── */}
        <section className="brand-grid-section">
          <div className="container">
            <div className="brand-grid">
              {[
                ...brandingCategory.projects.filter(p => p.slug !== 'dr-rich-melheim'),
                ...brandingCategory.projects.filter(p => p.slug === 'dr-rich-melheim')
              ].map((project) => (
                <BrandCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        </section>

      </div>
    </PageTransition>
  )
}

// ─────────────────────────────────────────────
//  BrandCard — individual project card
// ─────────────────────────────────────────────
interface BrandCardProps {
  project: (typeof brandingCategory.projects)[number]
}

function BrandCard({ project }: BrandCardProps) {
  return (
    <article className="brand-card">
      <Link
        to={`/work/branding/${project.slug}`}
        className="brand-card__link"
        aria-label={`View ${project.title} project`}
      >
        {/* Image */}
        <div className="brand-card__image-wrap">
          {project.thumbnailImage ? (
            <ProgressiveImage
              src={`/${project.thumbnailImage}`}
              alt={`${project.title} thumbnail`}
              className="brand-card__image"
              loading="lazy"
            />
          ) : (
            <div className="brand-card__image img-placeholder" aria-label={`${project.title} placeholder`}>
              <span className="t-micro">{project.title}</span>
            </div>
          )}

          {/* Hover overlay */}
          <div className="brand-card__overlay" aria-hidden="true">
            <span className="brand-card__cta t-meta">View Project →</span>
          </div>
        </div>

        {/* Info */}
        <div className="brand-card__info">
          <div className="brand-card__meta-row">
            <span className="t-micro brand-card__type">{project.type}</span>
            {project.year && <span className="t-micro brand-card__year">{project.year}</span>}
          </div>
          <h2 className="brand-card__title t-heading-md">{project.title}</h2>
          <p className="brand-card__desc t-body-md">{project.shortDescription}</p>
        </div>
      </Link>
    </article>
  )
}
