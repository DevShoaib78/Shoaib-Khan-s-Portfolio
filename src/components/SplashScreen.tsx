import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type TextItem = string | { text: string; highlight?: string; image?: string }

const SplashScreen: React.FC = () => {
  const [currentText, setCurrentText] = useState(0)
  const [particleCount, setParticleCount] = useState(40)

  const texts: TextItem[] = [
    "Content Creator",
    "Entrepreneur",
    { text: "Co-Founder of ", image: "/assets/hhlogo.webp" }
  ]

  useEffect(() => {
    // Set particle count based on device
    const updateParticleCount = () => {
      if (window.innerWidth < 768) {
        setParticleCount(20)
      } else if (window.innerWidth < 1024) {
        setParticleCount(30)
      } else {
        setParticleCount(40)
      }
    }

    updateParticleCount()
    window.addEventListener('resize', updateParticleCount)

    const intervals: ReturnType<typeof setTimeout>[] = []

    // Show each text with longer delay for readability
    texts.forEach((_, index) => {
      const timer = setTimeout(() => {
        setCurrentText(index)
      }, index * 2500)
      intervals.push(timer)
    })

    return () => {
      intervals.forEach(clearTimeout)
      window.removeEventListener('resize', updateParticleCount)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const textVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.8,
        ease: "easeIn"
      }
    }
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black flex items-center justify-center z-50 overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 rounded-full opacity-20 blur-2xl md:blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(254,189,89,0.4) 0%, rgba(254,189,89,0) 70%)',
          willChange: 'transform'
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 rounded-full opacity-15 blur-2xl md:blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(255,157,0,0.3) 0%, rgba(255,157,0,0) 70%)',
          willChange: 'transform'
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Particle field */}
      <div className="absolute inset-0">
        {[...Array(particleCount)].map((_, i) => {
          const positions = [
            { left: 15, top: 20 }, { left: 85, top: 15 }, { left: 25, top: 80 },
            { left: 75, top: 85 }, { left: 10, top: 60 }, { left: 90, top: 45 },
            { left: 45, top: 10 }, { left: 55, top: 90 }, { left: 20, top: 35 },
            { left: 80, top: 65 }, { left: 35, top: 25 }, { left: 65, top: 75 },
            { left: 5, top: 45 }, { left: 95, top: 25 }, { left: 30, top: 70 },
            { left: 70, top: 30 }, { left: 15, top: 85 }, { left: 85, top: 55 },
            { left: 40, top: 15 }, { left: 60, top: 85 }, { left: 25, top: 50 },
            { left: 75, top: 20 }, { left: 50, top: 40 }, { left: 12, top: 75 },
            { left: 88, top: 35 }, { left: 35, top: 60 }, { left: 65, top: 40 },
            { left: 22, top: 15 }, { left: 78, top: 80 }, { left: 50, top: 65 },
            { left: 18, top: 42 }, { left: 82, top: 28 }, { left: 38, top: 88 },
            { left: 62, top: 12 }, { left: 8, top: 72 }, { left: 92, top: 58 },
            { left: 28, top: 38 }, { left: 72, top: 62 }, { left: 42, top: 78 },
            { left: 58, top: 22 }, { left: 14, top: 54 }, { left: 86, top: 46 },
            { left: 32, top: 18 }, { left: 68, top: 82 }, { left: 48, top: 68 },
            { left: 52, top: 32 }, { left: 24, top: 64 }, { left: 76, top: 36 },
            { left: 44, top: 92 }, { left: 56, top: 8 }, { left: 16, top: 48 }
          ]

          const position = positions[i] || { left: Math.random() * 100, top: Math.random() * 100 }
          const size = Math.random() * 3.5 + 3
          const duration = Math.random() * 5 + 4
          const delay = Math.random() * 6
          const isLarge = i % 8 === 0

          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${position.left}%`,
                top: `${position.top}%`,
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: '#FEBD59',
                boxShadow: isLarge
                  ? '0 0 20px rgba(254, 189, 89, 1), 0 0 35px rgba(254, 189, 89, 0.7), 0 0 50px rgba(254, 189, 89, 0.4)'
                  : '0 0 12px rgba(254, 189, 89, 0.9), 0 0 20px rgba(254, 189, 89, 0.5), 0 0 30px rgba(254, 189, 89, 0.3)',
                willChange: 'transform, opacity'
              }}
              animate={{
                opacity: [0.4, 1, 0.4],
                scale: isLarge ? [1, 1.5, 1] : [0.8, 1.2, 0.8],
                y: [0, -15, 0],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "easeInOut",
              }}
            />
          )
        })}
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(254,189,89,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(254,189,89,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 text-center px-4 sm:px-6 py-12 max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentText}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-body font-normal"
            style={{ letterSpacing: '0', overflow: 'visible', color: '#FFFFFF' }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1.5,
                ease: "easeInOut"
              }}
            >
              {typeof texts[currentText] === 'string' ? (
                texts[currentText] as string
              ) : (
                <span className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                  <span>{(texts[currentText] as { text: string }).text}</span>
                  {(texts[currentText] as { highlight?: string }).highlight && (
                    <span
                      className="block sm:inline"
                      style={{
                        color: '#FEBD59',
                        fontFamily: "'Karla', sans-serif",
                        fontWeight: '500',
                        letterSpacing: '0.05em',
                        fontStyle: 'italic'
                      }}
                    >
                      {(texts[currentText] as { highlight: string }).highlight}
                    </span>
                  )}
                  {(texts[currentText] as { image?: string }).image && (
                    <img
                      src={(texts[currentText] as { image: string }).image}
                      alt="Hyderabad Hustlers Logo"
                      className="h-32 sm:h-40 md:h-52 w-auto object-contain mt-4 sm:mt-0"
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                </span>
              )}
            </motion.span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Premium loading indicator */}
      <motion.div
        className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="flex items-center space-x-3">
          {/* Animated dots with glow effect */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="relative"
            >
              {/* Outer glow */}
              <motion.div
                className="absolute inset-0 rounded-full blur-sm"
                style={{ backgroundColor: '#FEBD59' }}
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
              {/* Inner dot */}
              <motion.div
                className="w-3 h-3 rounded-full relative"
                style={{
                  backgroundColor: '#FEBD59',
                  boxShadow: '0 0 8px rgba(254, 189, 89, 0.8)'
                }}
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default SplashScreen;