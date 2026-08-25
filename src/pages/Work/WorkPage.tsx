// ─────────────────────────────────────────────
//  Page — Work
//  Shows all portfolio categories.
// ─────────────────────────────────────────────

import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageTransition } from '../../components/motion/PageTransition'
import { portfolioData } from '../../data/portfolio'
import { gsap } from '../../animations/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './WorkPage.css'

export function WorkPage() {
  const reduced = useRef(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  reduced.current = useReducedMotion()

  useEffect(() => {
    if (reduced.current || !sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.work-page-hero__meta, .work-page-hero__title', {
        y: 30, opacity: 0, duration: 0.8, ease: 'power4.out', stagger: 0.1,
      })
      gsap.from('.work-category-card', {
        y: 50, opacity: 0, duration: 0.75, ease: 'power4.out', stagger: 0.07,
        scrollTrigger: { trigger: '.work-categories-grid', start: 'top 88%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <PageTransition>
      <div className="work-page" ref={sectionRef}>
        <div className="container">
          
          {/* ── Page Hero ─────────────────────────── */}
          <header className="work-page-hero">
            <p className="work-page-hero__meta t-meta">Selected Work</p>
            <h1 className="work-page-hero__title t-display-lg">Work</h1>
          </header>

          {/* ── Category Grid ──────────────────────── */}
          <nav aria-label="Work categories">
            <ul role="list" className="work-categories-grid">
              {portfolioData.categories.map((cat, i) => {
                // Find a cover image: Try featured project first, otherwise first project with a thumbnail
                const coverProject = cat.projects.find(p => p.featured && p.thumbnailImage) || cat.projects.find(p => p.thumbnailImage)
                
                return (
                  <li key={cat.slug}>
                    <CategoryCard 
                      cat={cat} 
                      coverImage={coverProject?.thumbnailImage} 
                      index={i} 
                    />
                  </li>
                )
              })}
            </ul>
          </nav>
          
        </div>
      </div>
    </PageTransition>
  )
}

// ── Category Card Component ────────────────
function CategoryCard({ cat, coverImage, index }: { cat: any, coverImage?: string, index: number }) {
  const [imgError, setImgError] = useState(false)
  
  // Alternate aspect ratios to give an editorial rhythm to the categories
  const aspectRatios = ['3/4', '4/3', '4/3', '3/4', '1/1']
  const aspectRatio = aspectRatios[index % aspectRatios.length]

  return (
    <Link
      to={`/work/${cat.slug}`}
      className={`work-category-card work-category-card--${index % 2 === 1 ? 'offset' : 'normal'}`}
      aria-label={`View ${cat.title} work`}
    >
      <div className="work-category-card__image-wrap" style={{ aspectRatio }}>
        {coverImage && !imgError ? (
          <img
            src={`/${coverImage}`}
            alt={`${cat.title} category cover`}
            className="work-category-card__image"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="work-category-card__image img-placeholder" aria-label={`${cat.title} placeholder`}>
            <span className="t-micro">{cat.title}</span>
          </div>
        )}
        
        {/* Hover overlay */}
        <div className="work-category-card__overlay" aria-hidden="true">
          <span className="work-category-card__cta t-meta">View Category →</span>
        </div>
      </div>

      <div className="work-category-card__info">
        <p className="work-category-card__meta t-meta">
          {cat.comingSoon ? 'Coming Soon' : `${cat.projects.length} Project${cat.projects.length !== 1 ? 's' : ''}`}
        </p>
        <h2 className="work-category-card__title t-heading-lg">{cat.title}</h2>
        {cat.shortDescription && (
          <p className="work-category-card__desc t-body-md">
            {cat.shortDescription}
          </p>
        )}
      </div>
    </Link>
  )
}
