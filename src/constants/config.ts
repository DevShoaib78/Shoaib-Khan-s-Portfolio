/**
 * Application-wide configuration constants
 */

// Timing Constants (in milliseconds)
export const TIMING = {
  SPLASH_SCREEN_DURATION: 9500,
  SPLASH_FADE_OUT_DURATION: 800,
  MAIN_CONTENT_FADE_IN_DURATION: 800,
  MENU_CLOSE_DELAY: 100,
  NAVBAR_TRANSITION_DURATION: 500,
} as const

// Animation Constants
export const ANIMATION = {
  VIEWPORT_SCROLL_THRESHOLD: 0.25,
  NAVBAR_HERO_OFFSET: 100,
  PARTICLE_COUNT: {
    MOBILE: 20,
    TABLET: 30,
    DESKTOP: 40,
  },
  MOBILE_BLUR: 2, // in pixels
  DESKTOP_BLUR: 10, // in pixels
} as const

// Viewport Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
} as const

// Color Constants
export const COLORS = {
  PRIMARY: '#FEBD59',
  ORANGE: '#FF9D00',
  ORANGE_LIGHT: '#FF9A00',
  ORANGE_MEDIUM: '#FFBC4C',
  ORANGE_BRIGHT: '#FFDE63',
  BLACK: '#000000',
  WHITE: '#FFFFFF',
} as const

// Navigation Sections
export const NAV_SECTIONS = ['hero', 'about', 'journey', 'experience', 'contact'] as const

export type NavSection = typeof NAV_SECTIONS[number]
