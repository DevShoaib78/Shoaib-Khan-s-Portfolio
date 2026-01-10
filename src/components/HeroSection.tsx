import React from 'react'
import { motion } from 'framer-motion'
import { Instagram, Linkedin, Camera, Film, Mic, Video, Clapperboard, Lightbulb } from 'lucide-react'
import LazyImage from './LazyImage'

const HeroSection: React.FC = () => {

  const creativeIcons = [
    { Icon: Camera, position: { top: '15%', left: '10%' }, delay: 0, size: 40 },
    { Icon: Film, position: { top: '25%', right: '15%' }, delay: 0.2, size: 45 },
    { Icon: Mic, position: { bottom: '30%', left: '8%' }, delay: 0.4, size: 38 },
    { Icon: Video, position: { top: '60%', right: '12%' }, delay: 0.6, size: 42 },
    { Icon: Clapperboard, position: { top: '45%', left: '5%' }, delay: 0.8, size: 36 },
    { Icon: Lightbulb, position: { bottom: '15%', right: '8%' }, delay: 1, size: 40 },
  ]

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black" style={{ overflowX: 'hidden' }}>
      
      {/* Floating Creative Elements */}
      {creativeIcons.map(({ Icon, position, delay, size }, index) => (
        <motion.div
          key={index}
          className="absolute hidden lg:block"
          style={{ ...position, willChange: 'transform, opacity' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.4, 0.7, 0.4],
            scale: [1, 1.15, 1],
            y: [0, -20, 0],
          }}
          transition={{
            opacity: { duration: 4, repeat: Infinity, delay },
            scale: { duration: 4, repeat: Infinity, delay },
            y: { duration: 6, repeat: Infinity, delay },
            ease: "easeInOut"
          }}
        >
          <Icon 
            size={size} 
            style={{ 
              color: '#FEBD59', 
              filter: 'drop-shadow(0 0 8px rgba(254, 189, 89, 0.6))'
            }} 
            strokeWidth={2} 
          />
        </motion.div>
      ))}

      {/* Ambient Light Orbs - Reduced blur for performance */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-2xl"
        style={{ background: 'radial-gradient(circle, rgba(254,189,89,0.1) 0%, transparent 70%)' }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-2xl"
        style={{ background: 'radial-gradient(circle, rgba(255,157,0,0.08) 0%, transparent 70%)' }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 pt-32">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Profile Image with Cinematic Effects */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.6, 0.05, 0.01, 0.9] }}
            className="relative inline-block mb-12"
          >
            {/* Subtle Pulsing Glow */}
            <motion.div
              className="absolute inset-0 rounded-full blur-2xl"
              style={{ background: 'radial-gradient(circle, rgba(254,189,89,0.3) 0%, transparent 70%)', willChange: 'transform, opacity' }}
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Image Container */}
            <motion.div
              className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden group"
              style={{
                border: '4px solid rgba(254, 189, 89, 0.5)',
                boxShadow: '0 0 40px rgba(254, 189, 89, 0.3)',
                willChange: 'transform'
              }}
              whileHover={{
                scale: 1.05,
                borderColor: 'rgba(254, 189, 89, 0.8)',
                boxShadow: '0 0 80px rgba(254, 189, 89, 0.6)',
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <LazyImage
                src="/assets/skpic.webp"
                alt="Shoaib Khan"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="eager"
                decoding="async"
              />
            </motion.div>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display mb-6 leading-none tracking-tight"
            style={{ fontWeight: 900 }}
          >
            <span className="gradient-text">SHOAIB KHAN</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base sm:text-lg md:text-xl font-body text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Content Creator, Director, Writer, Video Editor, and Co-Founder of{' '}
            <span className="text-[#FEBD59] font-semibold italic">Hyderabad Hustlers</span>
          </motion.p>

          {/* Let's Connect Button with Integrated Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="inline-block"
          >
            <motion.div
              className="flex items-center gap-4 px-8 py-4 rounded-full"
              style={{
                border: '2px solid #FEBD59',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(10px)',
                willChange: 'transform'
              }}
              whileHover={{ 
                boxShadow: '0 0 30px rgba(254, 189, 89, 0.4)',
                borderColor: '#FFBC4C'
              }}
            >
              <span className="text-white font-body font-semibold text-lg">Let's Connect</span>
              
              <div className="flex items-center gap-3">
                <motion.a
                  href="https://www.linkedin.com/in/shoaibkhan"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Connect with Shoaib Khan on LinkedIn"
                  className="w-12 h-12 rounded-full flex items-center justify-center relative group"
                  style={{
                    border: '2px solid #FEBD59',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    willChange: 'transform'
                  }}
                  whileHover={{
                    scale: 1.15,
                    borderColor: '#0A66C2',
                    boxShadow: '0 0 20px rgba(10, 102, 194, 0.5)'
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div
                    initial={{ color: '#FEBD59' }}
                    whileHover={{ color: '#0A66C2' }}
                    transition={{ duration: 0.3 }}
                  >
                    <Linkedin size={22} strokeWidth={2} />
                  </motion.div>
                </motion.a>

                <motion.a
                  href="https://www.instagram.com/beingashoaib"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Shoaib Khan on Instagram"
                  className="w-12 h-12 rounded-full flex items-center justify-center relative group"
                  style={{
                    border: '2px solid #FEBD59',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    willChange: 'transform'
                  }}
                  whileHover={{
                    scale: 1.15,
                    borderColor: '#E4405F',
                    boxShadow: '0 0 20px rgba(228, 64, 95, 0.5)'
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div
                    initial={{ color: '#FEBD59' }}
                    whileHover={{ color: '#E4405F' }}
                    transition={{ duration: 0.3 }}
                  >
                    <Instagram size={22} strokeWidth={2} />
                  </motion.div>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection