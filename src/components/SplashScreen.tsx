import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type TextItem = string | { text: string; highlight: string }

const SplashScreen: React.FC = () => {
  const [currentText, setCurrentText] = useState(0)
  const [showFinal, setShowFinal] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  const texts: TextItem[] = [
    "Content Creator",
    "Entrepreneur",
    { text: "Co-Founder of ", highlight: "Hyderabad Hustlers" }
  ]

  useEffect(() => {
    const intervals: ReturnType<typeof setTimeout>[] = []

    // Show each text with longer delay for readability
    texts.forEach((_, index) => {
      const timer = setTimeout(() => {
        setCurrentText(index)
      }, index * 2000)
      intervals.push(timer)
    })

    // Show final text
    const finalTimer = setTimeout(() => {
      setShowFinal(true)
    }, 6500)
    intervals.push(finalTimer)

    // Start fade out after final text has been displayed
    const fadeTimer = setTimeout(() => {
      setFadeOut(true)
    }, 9000) // Start fade 0.5s before transition
    intervals.push(fadeTimer)

    return () => {
      intervals.forEach(clearTimeout)
    }
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

  const finalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.6, -0.05, 0.01, 0.99],
        delay: 0.2
      }
    }
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black flex items-center justify-center z-50 overflow-hidden"
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >


      {/* Breathtaking twinkling gold stars - Static positions */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => {
          // Pre-generate static positions and properties
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
            { left: 22, top: 15 }, { left: 78, top: 80 }, { left: 50, top: 65 }
          ]

          const position = positions[i] || { left: Math.random() * 100, top: Math.random() * 100 }
          const size = Math.random() * 3 + 2 // Random size between 2-5px (larger)
          const duration = Math.random() * 4 + 3 // Random duration 3-7s (slower)
          const delay = Math.random() * 5 // Random delay 0-5s

          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${position.left}%`,
                top: `${position.top}%`,
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: '#FFBD59',
                boxShadow: '0 0 8px rgba(255, 189, 89, 0.8), 0 0 16px rgba(255, 189, 89, 0.4)',
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [0.8, 1.3, 0.8],
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

      <div className="relative z-10 text-center px-4 py-8">
        {!showFinal ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentText}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-4xl md:text-6xl font-accent font-medium text-white overflow-hidden"
              style={{ letterSpacing: '-0.01em' }}
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
                  <>
                    {(texts[currentText] as { text: string; highlight: string }).text}
                    <span style={{
                      color: '#FFBD59',
                      fontFamily: "'Dancing Script', cursive",
                      fontWeight: '600',
                      letterSpacing: '0.02em'
                    }}>
                      {(texts[currentText] as { text: string; highlight: string }).highlight}
                    </span>
                  </>
                )}
              </motion.span>
            </motion.div>
          </AnimatePresence>
        ) : (
          <motion.div
            variants={finalVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.div
              className="text-2xl md:text-3xl text-gray-300 mb-4 font-accent font-normal"
              style={{ letterSpacing: '0.05em' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              It's
            </motion.div>
            <motion.h1
              className="text-6xl md:text-8xl font-display font-extrabold gradient-text mb-6 px-4"
              style={{
                letterSpacing: '-0.03em',
                lineHeight: '1.1',
                paddingBottom: '0.2em'
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              Shoaib Khan
            </motion.h1>
            <motion.div
              className="w-24 h-0.5 mx-auto"
              style={{ backgroundColor: '#FFBD59' }}
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            />
          </motion.div>
        )}
      </div>

      {/* Premium loading indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
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
                style={{ backgroundColor: '#FFBD59' }}
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
                  backgroundColor: '#FFBD59',
                  boxShadow: '0 0 8px rgba(255, 189, 89, 0.8)'
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