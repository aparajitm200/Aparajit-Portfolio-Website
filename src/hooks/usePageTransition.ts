// ─────────────────────────────────────────────
//  Hook — usePageTransition
//  Provides state for orchestrating enter/exit
//  animations between route changes.
// ─────────────────────────────────────────────

import { useState, useCallback } from 'react'
import { useLocation } from 'react-router-dom'

type TransitionState = 'idle' | 'entering' | 'exiting'

export function usePageTransition() {
  const location = useLocation()
  const [state, setState] = useState<TransitionState>('idle')

  const startExit = useCallback(() => {
    setState('exiting')
  }, [])

  const startEnter = useCallback(() => {
    setState('entering')
    // Reset to idle after enter animation duration
    const timer = setTimeout(() => setState('idle'), 700)
    return () => clearTimeout(timer)
  }, [])

  return {
    state,
    key: location.pathname, // Used as AnimatePresence key
    startExit,
    startEnter,
  }
}
