import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Detect active section
      const sections = ['hero', 'about', 'journey', 'experience', 'services', 'contact']
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Journey', href: '#journey' },
    { name: 'Experience', href: '#experience' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' }
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsNavOpen(false)
  }

  return (
    <>
      {/* Menu Button - Top Right */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="fixed top-6 right-6 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsNavOpen(!isNavOpen)}
          className={`
            relative p-4 rounded-full transition-all duration-300
            ${isScrolled 
              ? 'bg-black/90 backdrop-blur-xl border border-[#FEBD59]/40 shadow-xl shadow-[#FEBD59]/25' 
              : 'bg-black/70 backdrop-blur-md border border-[#FEBD59]/30 shadow-lg shadow-[#FEBD59]/15'
            }
          `}
        >
          {/* Glowing effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FEBD59]/15 to-yellow-400/15" />
          
          {/* Icon with smooth transition */}
          <motion.div
            animate={{ rotate: isNavOpen ? 90 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative z-10"
          >
            {isNavOpen ? (
              <X 
                size={28} 
                className="text-[#FEBD59]"
                strokeWidth={2.5}
              />
            ) : (
              <Menu 
                size={28} 
                className="text-[#FEBD59]"
                strokeWidth={2.5}
              />
            )}
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Full Navbar */}
      <AnimatePresence>
        {isNavOpen && (
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-40 px-6 pt-6"
          >
            <div className="container mx-auto max-w-4xl">
              {/* Enhanced pill-style navbar */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="rounded-full px-10 py-8 bg-black/95 backdrop-blur-xl border border-[#FEBD59]/30 shadow-2xl shadow-[#FEBD59]/20"
              >
                {/* Navigation Items - Centered with better spacing */}
                <div className="flex items-center justify-center space-x-4">
                  {navItems.map((item, index) => {
                    const isActive = activeSection === item.href.substring(1)
                    return (
                      <motion.button
                        key={item.name}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => scrollToSection(item.href)}
                        className={`
                          relative px-8 py-4 rounded-full font-body font-semibold text-lg transition-all duration-300
                          ${isActive 
                            ? 'text-black' 
                            : 'text-white hover:text-white'
                          }
                        `}
                        style={{ letterSpacing: '-0.01em' }}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 rounded-full bg-[#FEBD59] shadow-lg shadow-[#FEBD59]/30"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                        <span className="relative z-10">{item.name}</span>
                        {!isActive && (
                          <motion.div
                            className="absolute inset-0 rounded-full bg-white/0 hover:bg-[#FEBD59]/15"
                            whileHover={{ backgroundColor: 'rgba(254, 189, 89, 0.15)' }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </motion.button>
                    )
                  })}
                </div>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar