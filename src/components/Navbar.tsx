import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { TIMING } from '../constants/config'
import { useActiveSection } from '../hooks/useActiveSection'
import { useIsAtTop } from '../hooks/useScrollPosition'

const Navbar: React.FC = () => {
  const isAtTop = useIsAtTop()
  const activeSection = useActiveSection()
  const [isNavOpen, setIsNavOpen] = useState(false)

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Journey', href: '#journey' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' }
  ]

  const scrollToSection = useCallback((href: string) => {
    const element = document.querySelector(href)
    if (element) {
      setIsNavOpen(false)

      // Small delay to allow menu to close first
      setTimeout(() => {
        // Use native smooth scroll for better performance
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, TIMING.MENU_CLOSE_DELAY)
    }
  }, [])

  return (
    <>
      {/* Desktop Navbar - Pill shaped with width animation */}
      <div className="hidden lg:flex fixed top-6 left-0 right-0 z-50 justify-center px-4">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full max-w-5xl"
        >
          <motion.div
            animate={{
              width: isAtTop ? '100%' : '85%',
            }}
            transition={{
              duration: TIMING.NAVBAR_TRANSITION_DURATION / 1000,
              ease: [0.4, 0, 0.2, 1]
            }}
            className="rounded-full px-6 py-2 bg-black/90 backdrop-blur-xl shadow-2xl mx-auto"
            style={{
              border: '1px solid rgba(254, 189, 89, 0.3)',
              boxShadow: '0 25px 50px -12px rgba(254, 189, 89, 0.2)',
              willChange: 'width'
            }}
          >
            <div className="flex items-center justify-between gap-1.5">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1)
                return (
                  <motion.button
                    key={item.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection(item.href)}
                    className="relative px-5 lg:px-7 py-3 rounded-full font-body font-semibold text-base transition-all duration-300"
                    style={{ color: isActive ? '#000000' : '#FFFFFF', willChange: 'transform' }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-full shadow-lg"
                        style={{
                          backgroundColor: '#FEBD59',
                          boxShadow: '0 10px 15px -3px rgba(254, 189, 89, 0.3)',
                          willChange: 'transform'
                        }}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{item.name}</span>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        </motion.nav>
      </div>

      {/* Mobile/Tablet - Hamburger Menu */}
      <div className="lg:hidden">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsNavOpen(!isNavOpen)}
            aria-label={isNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isNavOpen}
            className="relative p-3 sm:p-4 rounded-full bg-black/90 backdrop-blur-xl shadow-xl"
            style={{
              border: '1px solid rgba(254, 189, 89, 0.4)',
              boxShadow: '0 20px 25px -5px rgba(254, 189, 89, 0.25)',
              willChange: 'transform'
            }}
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{ background: 'linear-gradient(to right, rgba(254, 189, 89, 0.15), rgba(255, 157, 0, 0.15))' }}
            />
            <motion.div
              animate={{ rotate: isNavOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
              style={{ willChange: 'transform' }}
            >
              {isNavOpen ? (
                <X size={24} className="sm:w-7 sm:h-7" style={{ color: '#FEBD59' }} strokeWidth={2.5} />
              ) : (
                <Menu size={24} className="sm:w-7 sm:h-7" style={{ color: '#FEBD59' }} strokeWidth={2.5} />
              )}
            </motion.div>
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {isNavOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
              onClick={() => setIsNavOpen(false)}
            >
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="absolute right-0 top-0 bottom-0 w-[85vw] max-w-80 bg-black/95 backdrop-blur-sm shadow-2xl" // Reduced blur
                style={{ borderLeft: '1px solid rgba(254, 189, 89, 0.3)', willChange: 'transform' }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col items-start p-8 pt-24 space-y-4">
                  {navItems.map((item, index) => {
                    const isActive = activeSection === item.href.substring(1)
                    return (
                      <motion.button
                        key={item.name}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => scrollToSection(item.href)}
                        className="w-full text-left px-6 py-4 rounded-xl font-body font-semibold text-lg transition-all duration-300"
                        style={isActive
                          ? {
                            backgroundColor: '#FEBD59',
                            color: '#000000',
                            boxShadow: '0 10px 15px -3px rgba(254, 189, 89, 0.3)'
                          }
                          : {
                            color: '#FFFFFF',
                            backgroundColor: 'transparent'
                          }
                        }
                        onMouseEnter={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.backgroundColor = 'rgba(254, 189, 89, 0.1)'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.backgroundColor = 'transparent'
                          }
                        }}
                      >
                        {item.name}
                      </motion.button>
                    )
                  })}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export default Navbar
