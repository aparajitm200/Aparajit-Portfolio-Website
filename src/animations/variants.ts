// ─────────────────────────────────────────────
//  Animation System — Framer Motion Variants
//  Reusable motion variants for page transitions,
//  component entrances, and interactive states.
// ─────────────────────────────────────────────

import type { Variants, Transition } from 'framer-motion'

// ── Shared Transitions ────────────────────────

export const transitionFast: Transition = {
  duration: 0.25,
  ease: [0.16, 1, 0.3, 1],
}

export const transitionNormal: Transition = {
  duration: 0.5,
  ease: [0.16, 1, 0.3, 1],
}

export const transitionSlow: Transition = {
  duration: 0.85,
  ease: [0.16, 1, 0.3, 1],
}

// ── Page Transitions ──────────────────────────

/** Default page enter/exit — clean fade + slight upward drift */
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 16,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: {
      duration: 0.35,
      ease: [0.7, 0, 0.84, 0],
    },
  },
}

// ── Component Entrance Variants ───────────────

/** Fade up — generic content block entrance */
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionNormal,
  },
}

/** Fade in — pure opacity entrance */
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitionNormal,
  },
}

/** Slide in from left */
export const slideInLeftVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitionNormal,
  },
}

/** Slide in from right */
export const slideInRightVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitionNormal,
  },
}

/** Scale entrance — for images and thumbnails */
export const scaleUpVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitionSlow,
  },
}

// ── Stagger Container ─────────────────────────

/**
 * Parent container that staggers children.
 * Use with staggeredItemVariants on children.
 */
export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

/** Child item for staggered containers */
export const staggeredItemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

// ── Navigation Menu ───────────────────────────

/** Full-screen mobile menu overlay */
export const mobileMenuVariants: Variants = {
  closed: {
    opacity: 0,
    clipPath: 'inset(0% 0% 100% 0%)',
    transition: {
      duration: 0.45,
      ease: [0.7, 0, 0.84, 0],
    },
  },
  open: {
    opacity: 1,
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

/** Mobile menu link stagger */
export const menuLinkVariants: Variants = {
  closed: { opacity: 0, y: 20 },
  open: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + i * 0.06,
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

// ── Hover Effects ─────────────────────────────

/** Subtle scale on hover — for interactive cards */
export const cardHoverVariants: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.015,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

/** Image zoom inside card on parent hover */
export const imageZoomVariants: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.04,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

/** Underline reveal for text links */
export const underlineVariants: Variants = {
  rest: { scaleX: 0, originX: 0 },
  hover: {
    scaleX: 1,
    originX: 0,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}
