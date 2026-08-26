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
import { ProgressiveImage } from '../../components/ui/ProgressiveImage'
import { Masonry } from '../../components/ui/Masonry'
import type { CategorySlug } from '../../types/portfolio'

const ALL_BRAND_IMAGES = Object.keys(
  import.meta.glob('/public/images/brands/**/*.{png,jpg,jpeg,webp,gif}', { eager: true })
)

export function BrandProjectPage() {
  const { projectSlug } = useParams<{ projectSlug: string }>()
  const project = getProjectBySlug('branding' as CategorySlug, projectSlug ?? '')

  type SubSection = { title: string; images: string[] }
  type Section = { title: string; description?: string; subsections: SubSection[], directImages: string[] }

  // Group images by subfolder dynamically
  const sectionsMap = new Map<string, { directImages: string[], subMap: Map<string, string[]> }>()
  
  if (project) {
    const prefix = `/public/images/brands/${project.slug}/`
    ALL_BRAND_IMAGES.forEach((path) => {
      if (path.startsWith(prefix)) {
        const relativePath = path.replace(prefix, '')
        const parts = relativePath.split('/')
        // Only include images that are inside subfolders
        if (parts.length > 1) {
          const sectionName = parts[0]
          const imageUrl = path.replace('/public', '')
          
          if (!sectionsMap.has(sectionName)) {
            sectionsMap.set(sectionName, { directImages: [], subMap: new Map() })
          }
          
          const sectionData = sectionsMap.get(sectionName)!
          
          if (parts.length === 2) {
            // It's a direct image in the level 1 folder
            sectionData.directImages.push(imageUrl)
          } else {
            // It's in a sub-subsection (level 2)
            const subName = parts[1]
            if (!sectionData.subMap.has(subName)) {
              sectionData.subMap.set(subName, [])
            }
            sectionData.subMap.get(subName)!.push(imageUrl)
          }
        }
      }
    })
  }

  const dynamicSections: Section[] = Array.from(sectionsMap.entries()).map(([title, data]) => {
    // Find matching section in project.sections to inherit description
    const matchingSection = project?.sections?.find(s => s.title.toLowerCase() === title.toLowerCase())
    
    const subsections: SubSection[] = Array.from(data.subMap.entries()).map(([subTitle, images]) => ({
      title: subTitle,
      images
    }))

    return {
      title,
      description: matchingSection?.description,
      directImages: data.directImages,
      subsections
    }
  })

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

        {/* Dynamic Sections */}
        {dynamicSections.length > 0 && (
          <div style={{ marginBottom: 'var(--space-24)' }}>
            {dynamicSections.map((section, idx) => (
              <section
                key={idx}
                style={{ marginBottom: 'var(--space-24)' }}
              >
                <div className="container" style={{ marginBottom: 'var(--space-12)' }}>
                  <h2 className="t-heading-lg" style={{ marginBottom: 'var(--space-4)' }}>
                    {section.title}
                  </h2>
                  {section.description && (
                    <p className="t-body-md" style={{ color: 'var(--color-text-muted)', maxWidth: '60ch' }}>
                      {section.description}
                    </p>
                  )}
                </div>

                {/* Level 1 Direct Images */}
                {section.directImages.length > 0 && (
                  <div className="container" style={{ marginBottom: 'var(--space-16)' }}>
                    <Masonry gap="var(--space-8)">
                      {section.directImages.map((imgSrc, i) => (
                        <ProgressiveImage
                          key={i}
                          src={imgSrc}
                          alt={`${section.title} Direct Image ${i + 1}`}
                          style={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: 'var(--radius-md)',
                            display: 'block',
                            minHeight: '200px'
                          }}
                          loading="lazy"
                        />
                      ))}
                    </Masonry>
                  </div>
                )}

                {/* Level 2 Sub-Sections */}
                {section.subsections.length > 0 && (
                  <div className="container">
                    {section.subsections.map((sub, subIdx) => (
                      <div key={subIdx} style={{ marginBottom: 'var(--space-16)' }}>
                        <h3 className="t-heading-md" style={{ marginBottom: 'var(--space-6)' }}>
                          {sub.title}
                        </h3>
                        <Masonry gap="var(--space-8)">
                          {sub.images.map((imgSrc, i) => (
                            <ProgressiveImage
                              key={i}
                              src={imgSrc}
                              alt={`${sub.title} Image ${i + 1}`}
                              style={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: 'var(--radius-md)',
                                display: 'block',
                                minHeight: '200px'
                              }}
                              loading="lazy"
                            />
                          ))}
                        </Masonry>
                      </div>
                    ))}
                  </div>
                )}
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
