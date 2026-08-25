// ─────────────────────────────────────────────
//  Hook — useScrollTrigger
//  Attaches a GSAP ScrollTrigger to a ref and
//  runs a callback when the element enters view.
//  Automatically cleans up on unmount.
// ─────────────────────────────────────────────

import { useEffect, useRef, useCallback } from 'react'
import { gsap, ScrollTrigger } from '../animations/gsap'
import { useReducedMotion } from './useReducedMotion'

interface ScrollTriggerOptions extends ScrollTrigger.Vars {
  skip?: boolean
}

export function useScrollTrigger<T extends Element = HTMLDivElement>(
  callback: (element: T) => gsap.core.Tween | gsap.core.Timeline | void,
  options: ScrollTriggerOptions = {}
) {
  const ref = useRef<T>(null)
  const reducedMotion = useReducedMotion()
  const { skip = false, ...triggerVars } = options

  // Stable callback reference
  const stableCallback = useCallback(callback, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!ref.current || reducedMotion || skip) return

    const element = ref.current

    // Small delay to ensure layout is stable
    const ctx = gsap.context(() => {
      const result = stableCallback(element)
      if (!result) return

      // If the animation doesn't already have a scrollTrigger,
      // attach a default one based on the element
      if (!(result as gsap.core.Tween).scrollTrigger) {
        ScrollTrigger.create({
          trigger: element,
          start: 'top 85%',
          animation: result,
          once: true,
          ...triggerVars,
        })
      }
    }, element)

    return () => ctx.revert()
  }, [reducedMotion, skip, stableCallback, triggerVars])

  return ref
}
