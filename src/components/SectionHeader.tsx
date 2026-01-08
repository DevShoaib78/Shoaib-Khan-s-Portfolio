import React from 'react'
import { motion } from 'framer-motion'

interface SectionHeaderProps {
  title: string
  gradientText?: string
  isInView: boolean
  className?: string
}

/**
 * Reusable section header component with animated title and decorative line
 * Used across About, Journey, Experience, and Contact sections
 */
const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  gradientText,
  isInView,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 1, ease: [0.6, 0.05, 0.01, 0.9] }}
      className={`text-center mb-16 lg:mb-24 ${className}`}
    >
      <motion.h2
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display mb-4 leading-none tracking-tight"
        style={{ fontWeight: 900 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {title && <span className="text-white">{title} </span>}
        {gradientText && <span className="gradient-text">{gradientText}</span>}
      </motion.h2>

      {/* Decorative Line */}
      <motion.div
        className="w-32 h-1 mx-auto mt-6"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #FEBD59 50%, transparent 100%)',
          willChange: 'transform'
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </motion.div>
  )
}

export default SectionHeader
