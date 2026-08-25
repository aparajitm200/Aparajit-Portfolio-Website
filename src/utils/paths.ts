// ─────────────────────────────────────────────
//  Utils — Asset Paths
//  Centralizes asset path resolution.
//  Accounts for Vite's base path configuration
//  so all asset references work correctly both
//  locally and on GitHub Pages.
// ─────────────────────────────────────────────

/**
 * Get the base path for public assets.
 * In Vite, import.meta.env.BASE_URL resolves to
 * the `base` value in vite.config.ts.
 */
export const BASE_URL = import.meta.env.BASE_URL ?? '/'

/**
 * Resolve a public asset path.
 * @param path — path relative to /public/ (e.g. "images/brands/aticx/hero.jpg")
 */
export function asset(path: string): string {
  const base = BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`
  const normalized = path.startsWith('/') ? path.slice(1) : path
  return `${base}${normalized}`
}

/**
 * Resolve an image path for a portfolio brand.
 * @param brand  — brand folder name (e.g. "aticx")
 * @param filename — filename (e.g. "hero.jpg")
 */
export function brandImage(brand: string, filename: string): string {
  return asset(`images/brands/${brand}/${filename}`)
}

/**
 * Generate a CSS background-image url() string.
 */
export function bgImage(path: string): string {
  return `url("${asset(path)}")`
}
