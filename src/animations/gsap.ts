// ─────────────────────────────────────────────
//  Animation System — GSAP Utilities
//  Reusable GSAP animation primitives.
//  All animations respect prefers-reduced-motion.
// ─────────────────────────────────────────────

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins once here
gsap.registerPlugin(ScrollTrigger)

// ── Motion preference check ───────────────────
const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// ── Base defaults ─────────────────────────────
const DEFAULT_EASE = 'power4.out'
const DEFAULT_DURATION = 0.85
const DEFAULT_STAGGER = 0.08

// ── Text Reveal ───────────────────────────────
/**
 * Reveal text lines from below (mask reveal effect).
 * @param targets   CSS selector or element(s)
 * @param options   Overrides
 */
export function revealText(
  targets: gsap.TweenTarget,
  options: gsap.TweenVars & { scrollTrigger?: ScrollTrigger.Vars } = {}
) {
  if (prefersReducedMotion()) return

  const { scrollTrigger, ...tweenVars } = options

  return gsap.from(targets, {
    y: '110%',
    opacity: 0,
    duration: DEFAULT_DURATION,
    ease: DEFAULT_EASE,
    stagger: DEFAULT_STAGGER,
    ...(scrollTrigger ? { scrollTrigger } : {}),
    ...tweenVars,
  })
}

// ── Fade Up ───────────────────────────────────
/**
 * Simple fade + translate up entrance.
 */
export function fadeUp(
  targets: gsap.TweenTarget,
  options: gsap.TweenVars & { scrollTrigger?: ScrollTrigger.Vars } = {}
) {
  if (prefersReducedMotion()) return

  const { scrollTrigger, ...tweenVars } = options

  return gsap.from(targets, {
    y: 40,
    opacity: 0,
    duration: DEFAULT_DURATION,
    ease: DEFAULT_EASE,
    stagger: DEFAULT_STAGGER,
    ...(scrollTrigger ? { scrollTrigger } : {}),
    ...tweenVars,
  })
}

// ── Fade In ───────────────────────────────────
/**
 * Pure opacity fade entrance.
 */
export function fadeIn(
  targets: gsap.TweenTarget,
  options: gsap.TweenVars & { scrollTrigger?: ScrollTrigger.Vars } = {}
) {
  if (prefersReducedMotion()) return

  const { scrollTrigger, ...tweenVars } = options

  return gsap.from(targets, {
    opacity: 0,
    duration: DEFAULT_DURATION,
    ease: DEFAULT_EASE,
    ...(scrollTrigger ? { scrollTrigger } : {}),
    ...tweenVars,
  })
}

// ── Image Reveal ──────────────────────────────
/**
 * Clip-path reveal for images — dramatic vertical wipe.
 */
export function imageReveal(
  targets: gsap.TweenTarget,
  options: gsap.TweenVars & { scrollTrigger?: ScrollTrigger.Vars } = {}
) {
  if (prefersReducedMotion()) return

  const { scrollTrigger, ...tweenVars } = options

  return gsap.from(targets, {
    clipPath: 'inset(100% 0% 0% 0%)',
    duration: 1.1,
    ease: DEFAULT_EASE,
    ...(scrollTrigger ? { scrollTrigger } : {}),
    ...tweenVars,
  })
}

// ── Staggered Group Entrance ──────────────────
/**
 * Staggered fade-up for a group of items (cards, tags, etc.)
 */
export function staggerGroup(
  targets: gsap.TweenTarget,
  options: gsap.TweenVars & { scrollTrigger?: ScrollTrigger.Vars } = {}
) {
  if (prefersReducedMotion()) return

  const { scrollTrigger, stagger, ...tweenVars } = options

  return gsap.from(targets, {
    y: 32,
    opacity: 0,
    duration: 0.7,
    ease: DEFAULT_EASE,
    stagger: stagger ?? DEFAULT_STAGGER,
    ...(scrollTrigger ? { scrollTrigger } : {}),
    ...tweenVars,
  })
}

// ── Parallax ─────────────────────────────────
/**
 * Subtle scroll-based vertical parallax.
 * Attach to an element and it will move at `speed` rate of scroll.
 */
export function parallax(
  targets: gsap.TweenTarget,
  speed: number = 0.15,
  trigger?: Element | string
) {
  if (prefersReducedMotion()) return

  return gsap.to(targets, {
    yPercent: speed * 100,
    ease: 'none',
    scrollTrigger: {
      trigger: trigger ?? (targets as Element),
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })
}

// ── Line Reveal (mask) ────────────────────────
/**
 * Prepare a container for a masked line-by-line text reveal.
 * Wraps each .line element with an overflow:hidden div.
 * Use split-type or manual wrapping before calling this.
 */
export function lineReveal(
  lines: gsap.TweenTarget,
  options: gsap.TweenVars & { scrollTrigger?: ScrollTrigger.Vars } = {}
) {
  if (prefersReducedMotion()) return

  const { scrollTrigger, ...tweenVars } = options

  return gsap.from(lines, {
    y: '100%',
    opacity: 0,
    duration: 0.9,
    ease: DEFAULT_EASE,
    stagger: 0.06,
    ...(scrollTrigger ? { scrollTrigger } : {}),
    ...tweenVars,
  })
}

// ── Expose gsap and ScrollTrigger ────────────
export { gsap, ScrollTrigger }
