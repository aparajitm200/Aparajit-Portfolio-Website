// ─────────────────────────────────────────────
//  Page — Brand Project Detail
//  Dynamic page for each brand project under
//  /work/branding/:projectSlug
// ─────────────────────────────────────────────

import { Link, useParams } from 'react-router-dom'
import { PageTransition } from '../../components/motion/PageTransition'
import { getProjectBySlug } from '../../data/portfolio'
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder'
import { Tag } from '../../components/ui/Tag'
import type { CategorySlug } from '../../types/portfolio'

export function BrandProjectPage() {
  const { projectSlug } = useParams<{ projectSlug: string }>()
  const project = getProjectBySlug('branding' as CategorySlug, projectSlug ?? '')

  if (!project) {
    return (
      <PageTransition>
        <div style={{ paddingTop: 'calc(var(--space-20) + 60px)', minHeight: '80dvh', display: 'flex', alignItems: 'center' }}>
          <div className="container">
            <p className="t-meta" style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)' }}>
              404
            </p>
            <h1 className="t-display-md">Project not found</h1>
            <Link
              to="/work/branding"
              className="t-meta"
              style={{ color: 'var(--color-accent)', marginTop: 'var(--space-6)', display: 'inline-block' }}
            >
              ← Back to Branding
            </Link>
          </div>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <article style={{ paddingTop: 'calc(var(--space-20) + 60px)' }}>
        {/* Breadcrumb */}
        <div className="container">
          <nav aria-label="Breadcrumb" style={{ marginBottom: 'var(--space-8)' }}>
            <ol role="list" style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center', flexWrap: 'wrap' }}>
              <li>
                <Link to="/work" className="t-meta" style={{ color: 'var(--color-text-muted)' }}>Work</Link>
              </li>
              <li aria-hidden="true" className="t-meta" style={{ color: 'var(--color-text-subtle)' }}>/</li>
              <li>
                <Link to="/work/branding" className="t-meta" style={{ color: 'var(--color-text-muted)' }}>Branding</Link>
              </li>
              <li aria-hidden="true" className="t-meta" style={{ color: 'var(--color-text-subtle)' }}>/</li>
              <li>
                <span className="t-meta" aria-current="page">{project.title}</span>
              </li>
            </ol>
          </nav>

          {/* Project Header */}
          <header style={{ marginBottom: 'var(--space-16)' }}>
            <p className="t-meta" style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)' }}>
              {project.type}{project.year ? ` — ${project.year}` : ''}
            </p>
            <h1 className="t-display-lg">{project.title}</h1>
            {project.subtitle && (
              <p className="t-heading-sm" style={{ color: 'var(--color-text-muted)', marginTop: 'var(--space-3)' }}>
                {project.subtitle}
              </p>
            )}

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginTop: 'var(--space-6)' }}>
                {project.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
              </div>
            )}
          </header>
        </div>

        {/* Hero Image */}
        <div style={{ marginBottom: 'var(--space-16)' }}>
          <ImagePlaceholder
            label={`${project.title} — Hero Image`}
            aspectRatio="16/9"
            className="container"
          />
        </div>

        {/* Description */}
        <div className="container" style={{ marginBottom: 'var(--space-16)' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: 'var(--space-12)',
              maxWidth: 'var(--container-narrow)',
            }}
          >
            <p className="t-body-lg" style={{ color: 'var(--color-text-muted)', lineHeight: 'var(--leading-relaxed)' }}>
              {project.description}
            </p>

            {/* Metadata */}
            {project.tools && project.tools.length > 0 && (
              <div>
                <p className="t-meta" style={{ color: 'var(--color-text-subtle)', marginBottom: 'var(--space-3)' }}>
                  Tools
                </p>
                <p className="t-body-md">{project.tools.join(', ')}</p>
              </div>
            )}
          </div>
        </div>

        {/* Sections */}
        {project.sections && project.sections.length > 0 && (
          <div style={{ marginBottom: 'var(--space-24)' }}>
            {project.sections.map((section) => (
              <section
                key={section.id}
                style={{ marginBottom: 'var(--space-16)', paddingTop: 'var(--space-8)', borderTop: '1px solid var(--color-border)' }}
              >
                <div className="container">
                  <h2 className="t-heading-md" style={{ marginBottom: 'var(--space-4)' }}>
                    {section.title}
                  </h2>
                  {section.description && (
                    <p className="t-body-md" style={{ color: 'var(--color-text-muted)', maxWidth: '60ch', marginBottom: 'var(--space-8)' }}>
                      {section.description}
                    </p>
                  )}
                  {/* Images will be populated when assets arrive */}
                  {(!section.images || section.images.length === 0) && (
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                        gap: 'var(--grid-gap)',
                      }}
                    >
                      {[1, 2, 3].map((i) => (
                        <ImagePlaceholder
                          key={i}
                          label={`${section.title} — ${i}`}
                          aspectRatio="4/3"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* Back link */}
        <div className="container" style={{ paddingBottom: 'var(--space-24)' }}>
          <Link
            to="/work/branding"
            className="t-meta"
            style={{ color: 'var(--color-accent)' }}
          >
            ← Back to Branding
          </Link>
        </div>
      </article>
    </PageTransition>
  )
}
