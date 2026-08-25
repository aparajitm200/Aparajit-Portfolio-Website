// ─────────────────────────────────────────────
//  Component — PageTransition
//  Wraps each route page with enter/exit
//  animations using Framer Motion.
// ─────────────────────────────────────────────

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { pageVariants } from '../../animations/variants'

interface PageTransitionProps {
  children: ReactNode
  className?: string
}

export function PageTransition({ children, className = '' }: PageTransitionProps) {
  return (
    <motion.div
      className={className}
      initial="initial"
      animate="enter"
      exit="exit"
      variants={pageVariants}
    >
      {children}
    </motion.div>
  )
}
