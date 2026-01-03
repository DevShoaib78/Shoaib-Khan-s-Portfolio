import { useState, useEffect } from 'react'
import { ANIMATION } from '../constants/config'

/**
 * Custom hook to detect if the page is scrolled past the hero section
 * @returns Boolean indicating if the page is at the top (within hero section)
 */
export const useIsAtTop = (): boolean => {
  const [isAtTop, setIsAtTop] = useState(true)

  useEffect(() => {
    let ticking = false

    const handleScroll = (): void => {
      if (ticking) return

      ticking = true
      requestAnimationFrame(() => {
        const scrollY = window.scrollY || window.pageYOffset || 0

        const heroSection = document.getElementById('hero')
        if (heroSection) {
          const heroBottom = heroSection.offsetHeight
          setIsAtTop(scrollY < heroBottom - ANIMATION.NAVBAR_HERO_OFFSET)
        }

        ticking = false
      })
    }

    // Listen to native scroll events
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Initial check
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return isAtTop
}
