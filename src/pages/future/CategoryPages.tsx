// ─────────────────────────────────────────────
//  Pages — Generic Category Pages
//  Dynamic pages for UI/UX, Video Editing,
//  Animation, and Other categories.
// ─────────────────────────────────────────────

import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageTransition } from '../../components/motion/PageTransition'
import { getCategoryBySlug } from '../../data/portfolio'
import { gsap } from '../../animations/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import type { CategorySlug, PortfolioProject } from '../../types/portfolio'
import './CategoryPages.css'

interface CategoryPageProps {
  slug: CategorySlug
}

// ── Generic Category Page ────────────────────
function GenericCategoryPage({ slug }: CategoryPageProps) {
  const category = getCategoryBySlug(slug)
  const reduced = useRef(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  reduced.current = useReducedMotion()

  useEffect(() => {
    if (reduced.current || !sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.cat-hero__meta, .cat-hero__title, .cat-hero__desc', {
        y: 30, opacity: 0, duration: 0.8, ease: 'power4.out', stagger: 0.1,
      })
      gsap.from('.cat-card', {
        y: 50, opacity: 0, duration: 0.75, ease: 'power4.out', stagger: 0.07,
        scrollTrigger: { trigger: '.cat-grid', start: 'top 88%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [slug])

  if (!category) return null

  const isVideoCategory = slug === 'video-editing' || slug === 'animation'

  return (
    <PageTransition>
      <div className="cat-page" ref={sectionRef}>

        {/* ── Page Hero ─────────────────────────── */}
        <header className="cat-hero container">
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <ol role="list">
              <li><Link to="/work">Work</Link></li>
              <li aria-hidden="true">/</li>
              <li><span aria-current="page">{category.displayTitle}</span></li>
            </ol>
          </nav>

          <p className="cat-hero__meta t-meta">
            {category.projects.length} Projects
          </p>
          <h1 className="cat-hero__title t-display-lg">{category.title}</h1>
          <p className="cat-hero__desc t-body-lg">
            {category.description}
          </p>
        </header>

        {/* ── Project Grid ──────────────────────── */}
        <section className="cat-grid-section">
          <div className="container">
            <div className={`cat-grid ${isVideoCategory ? 'cat-grid--video' : 'cat-grid--standard'}`}>
              {category.projects.map((project, i) => (
                isVideoCategory ? (
                  <VideoCard key={project.slug} project={project} index={i} />
                ) : (
                  <StandardCard key={project.slug} project={project} index={i} categorySlug={slug} />
                )
              ))}
            </div>
          </div>
        </section>

      </div>
    </PageTransition>
  )
}

// ── Standard Project Card ────────────────────
interface CardProps {
  project: PortfolioProject
  index: number
  categorySlug?: string
}

function StandardCard({ project, index, categorySlug }: CardProps) {
  const [imgError, setImgError] = useState(false)
  const aspectRatios = ['4/3', '3/4', '1/1', '4/3']
  const aspectRatio = aspectRatios[index % aspectRatios.length]

  return (
    <article className={`cat-card cat-card--${index % 3 === 1 ? 'offset' : 'normal'}`}>
      <Link
        to={`/work/${categorySlug}/${project.slug}`}
        className="cat-card__link"
        aria-label={`View ${project.title} project`}
      >
        <div className="cat-card__image-wrap" style={{ aspectRatio }}>
          {project.thumbnailImage && !imgError ? (
            <img
              src={`/${project.thumbnailImage}`}
              alt={`${project.title} thumbnail`}
              className="cat-card__image"
              onError={() => setImgError(true)}
              loading="lazy"
            />
          ) : (
            <div className="cat-card__image img-placeholder" aria-label={`${project.title} placeholder`}>
              <span className="t-micro">{project.title}</span>
            </div>
          )}
          <div className="cat-card__overlay" aria-hidden="true">
            <span className="cat-card__cta t-meta">View Project →</span>
          </div>
        </div>

        <div className="cat-card__info">
          <div className="cat-card__meta-row">
            <span className="t-micro cat-card__type">{project.type}</span>
            {project.year && <span className="t-micro cat-card__year">{project.year}</span>}
          </div>
          <h2 className="cat-card__title t-heading-md">{project.title}</h2>
          <p className="cat-card__desc t-body-md">{project.shortDescription}</p>
        </div>
      </Link>
    </article>
  )
}

// ── Video Project Card (Iframe Embed) ────────
function VideoCard({ project }: CardProps) {
  return (
    <article className="cat-card cat-card--video">
      <div className="cat-card__video-wrap">
        {project.embedUrl ? (
          <iframe
            className="cat-card__iframe"
            src={project.embedUrl}
            title={project.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="cat-card__iframe img-placeholder">
            <span className="t-micro">Video Placeholder</span>
          </div>
        )}
      </div>

      <div className="cat-card__info cat-card__info--video">
        <div className="cat-card__meta-row">
          <span className="t-micro cat-card__type">{project.type}</span>
          {project.year && <span className="t-micro cat-card__year">{project.year}</span>}
        </div>
        <h2 className="cat-card__title t-heading-md">{project.title}</h2>
        <p className="cat-card__desc t-body-md">{project.description}</p>
      </div>
    </article>
  )
}

// ── Exported Pages ───────────────────────────
export function UIUXPage() {
  return <GenericCategoryPage slug="ui-ux" />
}

export function VideoEditingPage() {
  return <GenericCategoryPage slug="video-editing" />
}

export function AnimationPage() {
  return <GenericCategoryPage slug="animation" />
}

export function OtherPage() {
  return <GenericCategoryPage slug="other" />
}
