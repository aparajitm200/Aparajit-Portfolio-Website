// ─────────────────────────────────────────────
//  Portfolio Data — Index
//  Central export for the full portfolio data.
//  Add or remove categories here.
// ─────────────────────────────────────────────

import type { PortfolioData, CategoryLookup, CategorySlug } from '../../types/portfolio'
import { brandingCategory } from './branding'
import {
  uiuxCategory,
  videoEditingCategory,
  animationCategory,
  otherCategory,
} from './future'

// The canonical ordered list of all categories
export const portfolioData: PortfolioData = {
  categories: [
    brandingCategory,
    uiuxCategory,
    videoEditingCategory,
    animationCategory,
    otherCategory,
  ],
}

// Lookup map: slug → category (for fast access in page components)
export const categoryLookup: CategoryLookup = portfolioData.categories.reduce(
  (acc, cat) => ({ ...acc, [cat.slug]: cat }),
  {} as CategoryLookup
)

// Utility: get a category by slug
export function getCategoryBySlug(slug: CategorySlug) {
  return categoryLookup[slug] ?? null
}

// Utility: get a project by category slug + project slug
export function getProjectBySlug(categorySlug: CategorySlug, projectSlug: string) {
  const category = getCategoryBySlug(categorySlug)
  if (!category) return null
  return category.projects.find((p) => p.slug === projectSlug) ?? null
}

// Utility: get all featured projects across all categories
export function getFeaturedProjects() {
  return portfolioData.categories.flatMap((cat) =>
    cat.projects.filter((p) => p.featured)
  )
}

export { brandingCategory, uiuxCategory, videoEditingCategory, animationCategory, otherCategory }
