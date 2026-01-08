import React from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Pen, Clapperboard, Mic, Film, Sparkles, Zap } from 'lucide-react'
import LazyImage from './LazyImage'
import HighlightedText from './HighlightedText'
import SectionHeader from './SectionHeader'

const AboutSection: React.FC = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })

  // Floating story icons - repositioned with increased visibility
  const storyIcons = [
    { Icon: Pen, position: { top: '15%', left: '8%' }, delay: 0 },
    { Icon: Clapperboard, position: { top: '12%', right: '12%' }, delay: 0.3 },
    { Icon: Mic, position: { bottom: '30%', left: '10%' }, delay: 0.6 },
    { Icon: Film, position: { top: '55%', right: '8%' }, delay: 0.9 },
    { Icon: Sparkles, position: { bottom: '20%', right: '15%' }, delay: 1.2 },
    { Icon: Zap, position: { top: '65%', left: '12%' }, delay: 1.5 },
  ]

  // Text paragraphs for staggered animation
  const paragraphs = [
    "I’m a content creator, director, writer, video editor, and entrepreneur from Hyderabad, and I have spent the last decade experimenting with storytelling in every form - from viral YouTube videos and short films to stand-up comedy and startup-focused podcasts.",
    "I started my journey in 2017, inspired by platforms like The Baigan Vines, creating sketches and short films that quickly went viral and gave me early recognition for my creativity. Over time, my love for video editing and content creation evolved into a mission-driven journey, experimenting with formats like short films, viral clips, and even stand-up comedy, all while consistently sharpening my editing craft.",
    "In 2023, I stepped into entrepreneurship, joining Edventure Park and later BioReform, where I gained hands on exposure to startups and innovation. That phase eventually led me to start Hyderabad Hustlers (HH) in December 2023 - a podcast platform built to tell raw, authentic stories of entrepreneurs. What started as a simple experiment soon grew into a full-fledged movement: direct incubation, 50+ entrepreneur stories, a 1M+ audience, brand collaborations, and even partnering with August Fest.",
    "Today, I continue to balance my creative storytelling and entrepreneurial drive, working with a clear purpose:"
  ]

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative flex items-center justify-center overflow-hidden bg-black py-20 lg:py-32"
      style={{ overflowX: 'hidden' }}
    >

      {/* Floating Story Icons - Increased visibility */}
      {storyIcons.map(({ Icon, position, delay }, index) => (
        <motion.div
          key={index}
          className="absolute hidden lg:block opacity-35"
          style={{ ...position, willChange: 'transform, opacity' }}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={isInView ? {
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1],
            rotate: [0, 10, 0],
            y: [0, -15, 0],
          } : {}}
          transition={{
            opacity: { duration: 5, repeat: Infinity, delay },
            scale: { duration: 5, repeat: Infinity, delay },
            rotate: { duration: 8, repeat: Infinity, delay },
            y: { duration: 7, repeat: Infinity, delay },
            ease: "easeInOut"
          }}
        >
          <Icon
            size={36}
            style={{
              color: '#FEBD59',
              filter: 'drop-shadow(0 0 12px rgba(254, 189, 89, 0.5))'
            }}
            strokeWidth={1.5}
          />
        </motion.div>
      ))}

      {/* Flowing Golden Light Animation */}
      <motion.div
        className="absolute top-0 left-0 w-full h-2"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #FEBD59 50%, transparent 100%)',
          willChange: 'transform'
        }}
        initial={{ x: '-100%', opacity: 0 }}
        animate={isInView ? {
          x: ['100%', '-100%'],
          opacity: [0, 1, 1, 0],
        } : {}}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatDelay: 1.5,
          ease: "easeInOut"
        }}
      />

      {/* Ambient Light Orbs - Reduced blur for performance */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full blur-2xl"
        style={{ background: 'radial-gradient(circle, rgba(254,189,89,0.08) 0%, transparent 70%)' }}
        animate={isInView ? {
          scale: [1, 1.3, 1],
          x: [0, 40, 0],
          y: [0, -30, 0],
        } : {}}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-2xl"
        style={{ background: 'radial-gradient(circle, rgba(255,157,0,0.06) 0%, transparent 70%)' }}
        animate={isInView ? {
          scale: [1, 1.3, 1],
          x: [0, -30, 0],
          y: [0, 30, 0],
        } : {}}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main Content Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Cinematic Heading */}
        <SectionHeader title="ABOUT" gradientText="ME" isInView={isInView} />

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">

          {/* Left Side - Story */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.5, ease: [0.6, 0.05, 0.01, 0.9] }}
            className="space-y-6 order-1 lg:order-1"
          >
            {paragraphs.map((text, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.7 + (index * 0.15),
                  ease: "easeOut"
                }}
                className="text-lg sm:text-xl lg:text-xl font-body text-white/90 leading-relaxed font-medium"
              >
                <HighlightedText text={text} />
              </motion.p>
            ))}

            {/* Quote Block */}
            <motion.blockquote
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.3, ease: "easeOut" }}
              className="relative pl-6 py-6 my-8 border-l-4 border-[#FEBD59]"
              style={{
                background: 'linear-gradient(90deg, rgba(254,189,89,0.08) 0%, transparent 100%)',
              }}
            >
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-1"
                style={{
                  background: '#FEBD59',
                  willChange: 'transform'
                }}
                animate={{
                  scaleY: [1, 1.05, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <p className="text-lg sm:text-xl md:text-2xl font-body italic text-white leading-relaxed font-medium">
                to inspire the youth of Hyderabad to build something of their own and follow their passions fearlessly.
              </p>
            </motion.blockquote>
          </motion.div>

          {/* Right Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.6, 0.05, 0.01, 0.9] }}
            className="relative order-2 lg:order-2 flex justify-center lg:justify-end"
          >
            {/* Image Container - No border frame */}
            <motion.div
              className="relative overflow-hidden group w-full max-w-lg"
              whileHover={{
                scale: 1.02,
              }}
              transition={{ duration: 0.4 }}
            >
              <LazyImage
                src="/assets/skback.webp"
                alt="Shoaib Khan - Content Creator and Entrepreneur"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 rounded-lg"
                style={{
                  filter: 'brightness(0.95) contrast(1.05)',
                  mixBlendMode: 'normal'
                }}
                loading="lazy"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Flowing Line */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-2"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #FEBD59 50%, transparent 100%)',
          willChange: 'transform'
        }}
        initial={{ x: '100%', opacity: 0 }}
        animate={isInView ? {
          x: ['-100%', '100%'],
          opacity: [0, 1, 1, 0],
        } : {}}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatDelay: 1.5,
          ease: "easeInOut",
          delay: 0.8
        }}
      />
    </section>
  )
}

export default AboutSection
