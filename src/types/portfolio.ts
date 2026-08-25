// ─────────────────────────────────────────────
//  Portfolio Data Types
//  Central type definitions for the entire
//  portfolio data architecture.
// ─────────────────────────────────────────────

export type CategorySlug =
  | 'branding'
  | 'ui-ux'
  | 'video-editing'
  | 'animation'
  | 'other'

// A "section" inside a project page
// (e.g. "Meta Advertisement Designs" inside /work/branding/beautyxtasy)
export interface ProjectSection {
  id: string
  title: string
  description?: string
  images?: string[]
  layout?: 'grid' | 'masonry' | 'fullwidth' | 'editorial'
}

// A single brand / deliverable project
export interface PortfolioProject {
  slug: string
  title: string
  subtitle?: string
  type: string                  // e.g. "Brand Identity & Visual Design"
  description: string
  shortDescription?: string     // Used on listing pages
  featured?: boolean
  heroImage?: string            // Relative path from /public/images/
  thumbnailImage?: string
  images?: string[]           // All project images, flat array
  embedUrl?: string             // YouTube or Vimeo embed URL (e.g. for Video/Animation)
  accentColor?: string          // Optional brand accent for the project page
  year?: number
  client?: string
  tools?: string[]
  tags?: string[]
  sections?: ProjectSection[]
  externalUrl?: string
  comingSoon?: boolean          // Placeholder projects not yet ready
}

// A top-level portfolio category
export interface PortfolioCategory {
  slug: CategorySlug
  title: string
  displayTitle: string          // e.g. "Branding" (shown in nav)
  description: string
  shortDescription?: string
  coverImage?: string
  projects: PortfolioProject[]
  comingSoon?: boolean          // Entire category not yet populated
}

// The full portfolio data shape
export interface PortfolioData {
  categories: PortfolioCategory[]
}

// Utility: get a category by slug
export type CategoryLookup = Record<CategorySlug, PortfolioCategory>
