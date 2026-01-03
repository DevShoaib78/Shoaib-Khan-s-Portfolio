import { useState, useEffect } from 'react'
import { ANIMATION, NAV_SECTIONS, type NavSection } from '../constants/config'

/**
 * Custom hook to detect the currently active section based on scroll position
 * @returns The ID of the currently active section
 */
export const useActiveSection = (): NavSection => {
  const [activeSection, setActiveSection] = useState<NavSection>('hero')

  useEffect(() => {
    let ticking = false

    const detectActiveSection = (): void => {
      if (ticking) return

      ticking = true
      requestAnimationFrame(() => {
        const viewportHeight = window.innerHeight
        const threshold = viewportHeight * ANIMATION.VIEWPORT_SCROLL_THRESHOLD

        for (const section of NAV_SECTIONS) {
          const element = document.getElementById(section)
          if (element) {
            const rect = element.getBoundingClientRect()
            // More forgiving threshold for section detection
            if (rect.top <= threshold && rect.bottom >= threshold * 0.5) {
              setActiveSection(section)
              break
            }
          }
        }

        ticking = false
      })
    }

    // Listen to native scroll events
    window.addEventListener('scroll', detectActiveSection, { passive: true })

    // Initial check
    detectActiveSection()

    return () => {
      window.removeEventListener('scroll', detectActiveSection)
    }
  }, [])

  return activeSection
}
