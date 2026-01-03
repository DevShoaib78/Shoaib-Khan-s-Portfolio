import React, { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, useInView, PanInfo } from 'framer-motion'
import { Play, ChevronLeft, ChevronRight, Video, Users, Briefcase, Image as ImageIcon } from 'lucide-react'
import { journeyData, impactStats, collaboratedBrands, type Milestone, type YearData } from '../data/journeyData'
import { getYouTubeVideoId, getYouTubeThumbnail, getYouTubeEmbedUrl } from '../utils/youtube'
import SectionHeader from './SectionHeader'

// ============================================
// VIDEO PLAYER COMPONENT (with timestamp support)
// ============================================

interface VideoPlayerProps {
  videoUrl: string
  title: string
  startTime?: string
  endTime?: string
  className?: string
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  title,
  startTime,
  endTime,
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoId = getYouTubeVideoId(videoUrl)
  const thumbnailUrl = getYouTubeThumbnail(videoId)

  const embedUrl = getYouTubeEmbedUrl(videoId, {
    autoplay: true,
    start: startTime,
    end: endTime
  })

  if (isPlaying) {
    return (
      <div className={`aspect-video rounded-2xl overflow-hidden ${className}`}>
        <iframe
          src={embedUrl}
          title={title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <motion.div
      className={`relative aspect-video rounded-2xl overflow-hidden cursor-pointer group ${className}`}
      onClick={() => setIsPlaying(true)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={thumbnailUrl}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.src = getYouTubeThumbnail(videoId, 'hqdefault')
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <div
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center backdrop-blur-sm"
            style={{
              background: 'rgba(254, 189, 89, 0.9)',
              boxShadow: '0 0 40px rgba(254, 189, 89, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.2)',
            }}
          >
            <Play size={28} className="ml-1" style={{ color: '#000' }} fill="#000" />
          </div>

          {/* Pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: '2px solid rgba(254, 189, 89, 0.5)' }}
            animate={{ scale: [1, 1.3], opacity: [0.8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </div>

      {/* Title overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-white font-display text-sm sm:text-base font-semibold truncate">
          {title}
        </p>
      </div>
    </motion.div>
  )
}

// ============================================
// PLACEHOLDER COMPONENT
// ============================================

interface PlaceholderProps {
  title: string
  text?: string
  type: 'video' | 'image'
  className?: string
}

const MediaPlaceholder: React.FC<PlaceholderProps> = ({ title, text, type, className = '' }) => (
  <motion.div
    className={`relative aspect-video rounded-2xl flex flex-col items-center justify-center ${className}`}
    style={{
      background: 'linear-gradient(135deg, rgba(254, 189, 89, 0.05) 0%, rgba(254, 189, 89, 0.02) 100%)',
      border: '2px dashed rgba(254, 189, 89, 0.25)',
    }}
    whileHover={{ borderColor: 'rgba(254, 189, 89, 0.5)' }}
  >
    <motion.div
      className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
      style={{ background: 'rgba(254, 189, 89, 0.1)' }}
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      {type === 'video' ? (
        <Play size={24} style={{ color: '#FEBD59' }} />
      ) : (
        <ImageIcon size={24} style={{ color: '#FEBD59' }} />
      )}
    </motion.div>
    <p className="text-white font-display text-base sm:text-lg font-semibold text-center px-4">{title}</p>
    {text && (
      <p className="text-white/40 font-body text-sm mt-2">{text}</p>
    )}
  </motion.div>
)

// ============================================
// MILESTONE CARD COMPONENT
// ============================================

interface MilestoneCardProps {
  milestone: Milestone
  index: number
}

const MilestoneCard: React.FC<MilestoneCardProps> = ({ milestone, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="relative"
    >
      {/* Side-by-side videos */}
      {milestone.type === 'side-by-side' && (
        <div className="space-y-4">
          {milestone.description && (
            <p className="text-white/60 font-body text-sm sm:text-base text-center mb-4">
              {milestone.description}
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <VideoPlayer
              videoUrl={milestone.leftVideoUrl}
              title={`${milestone.title} - Part 1`}
              startTime={milestone.leftStartTime}
              endTime={milestone.leftEndTime}
            />
            <VideoPlayer
              videoUrl={milestone.rightVideoUrl}
              title={`${milestone.title} - Part 2`}
              startTime={milestone.rightStartTime}
              endTime={milestone.rightEndTime}
            />
          </div>
        </div>
      )}

      {/* Single video */}
      {milestone.type === 'video' && (
        <div className="space-y-3">
          <VideoPlayer
            videoUrl={milestone.videoUrl}
            title={milestone.title}
            startTime={milestone.startTime}
            endTime={milestone.endTime}
          />
          {milestone.description && (
            <p className="text-white/50 font-body text-sm text-center">
              {milestone.description}
            </p>
          )}
        </div>
      )}

      {/* Image */}
      {milestone.type === 'image' && (
        <div className="space-y-3">
          {milestone.imageUrl ? (
            <motion.div
              className="aspect-video rounded-2xl overflow-hidden"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={milestone.imageUrl}
                alt={milestone.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ) : (
            <MediaPlaceholder
              title={milestone.title}
              text="Image coming soon..."
              type="image"
            />
          )}
          {milestone.description && (
            <p className="text-white/50 font-body text-sm text-center">
              {milestone.description}
            </p>
          )}
        </div>
      )}

      {/* Placeholder */}
      {milestone.type === 'placeholder' && (
        <div className="space-y-3">
          <MediaPlaceholder
            title={milestone.title}
            text={milestone.placeholderText}
            type="video"
          />
          {milestone.description && (
            <p className="text-white/50 font-body text-sm text-center">
              {milestone.description}
            </p>
          )}
        </div>
      )}
    </motion.div>
  )
}

// ============================================
// YEAR SLIDE COMPONENT
// ============================================

interface YearSlideProps {
  data: YearData
  direction: number
}

const YearSlide: React.FC<YearSlideProps> = ({ data, direction }) => {
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.9,
    }),
  }

  return (
    <motion.div
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
        opacity: { duration: 0.3 }
      }}
      className="w-full"
    >
      {/* Year Display - Centered */}
      <motion.div
        className="text-center mb-8 sm:mb-12"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <motion.h3
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black tracking-tighter"
          style={{
            background: 'linear-gradient(180deg, #FEBD59 0%, rgba(254, 189, 89, 0.3) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 80px rgba(254, 189, 89, 0.3)',
          }}
        >
          {data.year}
        </motion.h3>

        {/* Decorative line under year */}
        <motion.div
          className="w-20 sm:w-24 h-1 mx-auto mt-4"
          style={{
            background: 'linear-gradient(90deg, transparent, #FEBD59, transparent)',
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        />
      </motion.div>

      {/* Milestones Grid */}
      <div className={`
        grid gap-6 sm:gap-8 max-w-5xl mx-auto
        ${data.milestones.length === 1 ? 'grid-cols-1 max-w-2xl' : ''}
        ${data.milestones.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : ''}
        ${data.milestones.length >= 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : ''}
      `}>
        {data.milestones.map((milestone, idx) => (
          <MilestoneCard key={idx} milestone={milestone} index={idx} />
        ))}
      </div>
    </motion.div>
  )
}

// ============================================
// SWIPE INDICATOR (Mobile)
// ============================================

const SwipeIndicator: React.FC<{ show: boolean }> = ({ show }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        className="flex items-center justify-center gap-2 text-white/40 mt-8 lg:hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          animate={{ x: [-5, 5, -5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronLeft size={20} />
        </motion.div>
        <span className="font-body text-sm">Swipe to navigate</span>
        <motion.div
          animate={{ x: [5, -5, 5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronRight size={20} />
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
)

// ============================================
// TIMELINE DOTS NAVIGATION
// ============================================

interface TimelineDotsProps {
  total: number
  current: number
  onDotClick: (index: number) => void
  years: string[]
}

const TimelineDots: React.FC<TimelineDotsProps> = ({ total, current, onDotClick, years }) => (
  <div className="flex items-center justify-center gap-1 sm:gap-2 mt-8 flex-wrap px-4">
    {Array.from({ length: total }).map((_, i) => (
      <motion.button
        key={i}
        onClick={() => onDotClick(i)}
        className="group relative py-2 px-1"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Go to ${years[i]}`}
      >
        {/* Dot */}
        <motion.div
          className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300"
          animate={{
            scale: i === current ? 1.3 : 1,
            background: i === current ? '#FEBD59' : 'rgba(254, 189, 89, 0.2)',
            boxShadow: i === current ? '0 0 20px rgba(254, 189, 89, 0.8)' : 'none',
          }}
        />

        {/* Year tooltip on hover */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <span className="text-xs font-body text-white/70 whitespace-nowrap bg-black/80 px-2 py-1 rounded">
            {years[i]}
          </span>
        </div>
      </motion.button>
    ))}

    {/* Continuation indicator */}
    <motion.div
      className="flex items-center gap-1 ml-2 text-white/30"
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <span className="text-lg">•</span>
      <span className="text-lg">•</span>
      <span className="text-lg">•</span>
    </motion.div>
  </div>
)

// ============================================
// NAV ARROWS (Desktop)
// ============================================

interface NavArrowProps {
  direction: 'left' | 'right'
  onClick: () => void
  disabled: boolean
}

const NavArrow: React.FC<NavArrowProps> = ({ direction, onClick, disabled }) => {
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`
        hidden lg:flex
        w-14 h-14 rounded-full items-center justify-center
        transition-all duration-300 backdrop-blur-sm
        ${disabled
          ? 'opacity-20 cursor-not-allowed'
          : 'cursor-pointer hover:scale-110'
        }
      `}
      style={{
        background: disabled
          ? 'rgba(255, 255, 255, 0.03)'
          : 'rgba(254, 189, 89, 0.1)',
        border: `1px solid ${disabled ? 'rgba(255, 255, 255, 0.05)' : 'rgba(254, 189, 89, 0.3)'}`,
        boxShadow: disabled ? 'none' : '0 0 30px rgba(254, 189, 89, 0.15)',
      }}
      whileHover={disabled ? {} : {
        scale: 1.1,
        boxShadow: '0 0 40px rgba(254, 189, 89, 0.3)',
        background: 'rgba(254, 189, 89, 0.2)'
      }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      aria-label={direction === 'left' ? 'Previous year' : 'Next year'}
    >
      <Icon size={24} style={{ color: disabled ? 'rgba(255,255,255,0.2)' : '#FEBD59' }} />
    </motion.button>
  )
}

// ============================================
// IMPACT CARD
// ============================================

const ImpactCard: React.FC = () => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: false, amount: 0.2 })

  const iconMap: Record<string, React.ReactNode> = {
    video: <Video size={28} className="text-[#FEBD59]" />,
    users: <Users size={28} className="text-[#FEBD59]" />,
    briefcase: <Briefcase size={28} className="text-[#FEBD59]" />,
  }


  // Container variants with stagger
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  // Child variants for bento boxes
  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 50, damping: 15 }
    }
  }

  return (
    <motion.div
      ref={cardRef}
      className="mt-20 sm:mt-24 lg:mt-32 max-w-5xl mx-auto px-4"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="text-center mb-10 sm:mb-12">
        <h4 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white mb-2">
          Impact <span className="text-[#FEBD59]" style={{ textShadow: '0 0 30px rgba(254, 189, 89, 0.6)' }}>So Far</span>
        </h4>
        <div className="w-16 h-1 bg-[#FEBD59] mx-auto rounded-full opacity-60" />
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6">
        {impactStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            className="group relative p-6 sm:p-8 rounded-3xl overflow-hidden border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-colors hover:bg-white/[0.04] hover:border-[#FEBD59]/30"
          >
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FEBD59]/0 via-transparent to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500 from-10%" />

            {/* Background Icon (Watermark) */}
            <div className="absolute -bottom-6 -right-6 text-[#FEBD59] opacity-10 group-hover:opacity-20 transition-opacity duration-500 transform rotate-12">
              {React.cloneElement(iconMap[stat.icon] as React.ReactElement, { size: 120 })}
            </div>

            <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
              <motion.span
                className="text-5xl sm:text-6xl font-display font-black text-white group-hover:text-[#FEBD59] transition-colors duration-300 tracking-tight leading-none mb-2"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 + (index * 0.1), type: 'spring', stiffness: 100 }}
              >
                {stat.value}
              </motion.span>

              <p className="text-white/50 group-hover:text-[#FEBD59]/80 transition-colors duration-300 font-body text-sm sm:text-base font-medium tracking-wider uppercase">
                {stat.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Full Width Ticker Tile */}
      <motion.div
        variants={itemVariants}
        className="relative w-full rounded-3xl overflow-hidden border border-white/5 bg-white/[0.02] backdrop-blur-sm"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FEBD59]/[0.03] to-transparent opacity-50" />

        <div className="flex flex-col sm:flex-row items-center p-1 sm:p-2">
          {/* Label Badge */}
          <div className="flex-shrink-0 z-20 mb-2 sm:mb-0 sm:mr-4">
            <div className="bg-[#FEBD59]/10 border border-[#FEBD59]/20 rounded-2xl px-5 py-2 sm:py-3 backdrop-blur-md">
              <span className="text-[#FEBD59] font-display font-bold text-sm tracking-wide whitespace-nowrap">
                COLLABORATIONS
              </span>
            </div>
          </div>

          {/* Marquee */}
          <div className="relative flex-1 overflow-hidden h-12 flex items-center w-full">
            {/* Fade Edges */}
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-black via-black/80 to-transparent z-10" />

            <motion.div
              className="flex gap-8 sm:gap-12 whitespace-nowrap pl-4"
              animate={{ x: ['0%', '-50%'] }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: 'linear'
              }}
            >
              {[...collaboratedBrands, ...collaboratedBrands, ...collaboratedBrands].map((brand, index) => (
                <span
                  key={index}
                  className="text-white/60 font-display text-lg sm:text-xl font-bold flex items-center gap-2"
                >
                  {brand}
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FEBD59]/40" />
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ============================================
// FLOATING PARTICLES
// ============================================

const FloatingParticle: React.FC<{ delay: number }> = ({ delay }) => {
  const style = {
    left: `${10 + Math.random() * 80}%`,
    top: `${10 + Math.random() * 80}%`,
  }

  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full pointer-events-none"
      style={{
        ...style,
        background: '#FEBD59',
        boxShadow: '0 0 10px rgba(254, 189, 89, 0.6)',
      }}
      animate={{
        y: [0, -30, 0],
        opacity: [0.2, 0.5, 0.2],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 8 + Math.random() * 4,
        repeat: Infinity,
        delay: delay,
        ease: 'easeInOut',
      }}
    />
  )
}

// ============================================
// MAIN JOURNEY SECTION
// ============================================

const JourneySection: React.FC = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })

  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [showSwipeHint, setShowSwipeHint] = useState(true)

  const totalYears = journeyData.length
  const years = journeyData.map(d => d.year)

  // Navigation functions
  const goToNext = useCallback(() => {
    if (activeIndex < totalYears - 1) {
      setDirection(1)
      setActiveIndex(prev => prev + 1)
      setShowSwipeHint(false)
    }
  }, [activeIndex, totalYears])

  const goToPrev = useCallback(() => {
    if (activeIndex > 0) {
      setDirection(-1)
      setActiveIndex(prev => prev - 1)
      setShowSwipeHint(false)
    }
  }, [activeIndex])

  const goToIndex = useCallback((index: number) => {
    setDirection(index > activeIndex ? 1 : -1)
    setActiveIndex(index)
    setShowSwipeHint(false)
  }, [activeIndex])

  // Swipe handling
  const handleDragEnd = useCallback((_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50
    const velocity = Math.abs(info.velocity.x)

    if (info.offset.x > swipeThreshold || velocity > 500) {
      goToPrev()
    } else if (info.offset.x < -swipeThreshold || velocity > 500) {
      goToNext()
    }
  }, [goToNext, goToPrev])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToNext()
      if (e.key === 'ArrowLeft') goToPrev()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToNext, goToPrev])

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="relative bg-black py-20 sm:py-28 lg:py-36 overflow-hidden"
    >
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.5} />
        ))}
      </div>

      {/* Ambient Glows */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(254, 189, 89, 0.08), transparent 70%)' }}
        animate={isInView ? { scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] } : {}}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(254, 189, 89, 0.06), transparent 70%)' }}
        animate={isInView ? { scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] } : {}}
        transition={{ duration: 12, repeat: Infinity, delay: 2 }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header - Using SectionHeader component for consistency */}
        <SectionHeader title="MY" gradientText="JOURNEY" isInView={isInView} />

        {/* Timeline Container */}
        <div className="max-w-6xl mx-auto">

          {/* Main Navigation Area */}
          <div className="flex items-center gap-4 lg:gap-8">
            {/* Left Arrow (Desktop only) */}
            <NavArrow
              direction="left"
              onClick={goToPrev}
              disabled={activeIndex === 0}
            />

            {/* Content Area with Swipe Support */}
            <motion.div
              className="flex-1 min-w-0 overflow-hidden touch-pan-y"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={handleDragEnd}
              style={{ cursor: 'grab' }}
              whileTap={{ cursor: 'grabbing' }}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <YearSlide
                  key={activeIndex}
                  data={journeyData[activeIndex]}
                  direction={direction}
                />
              </AnimatePresence>
            </motion.div>

            {/* Right Arrow (Desktop only) */}
            <NavArrow
              direction="right"
              onClick={goToNext}
              disabled={activeIndex === totalYears - 1}
            />
          </div>

          {/* Swipe Indicator (Mobile) */}
          <SwipeIndicator show={showSwipeHint} />

          {/* Timeline Navigation Dots */}
          <TimelineDots
            total={totalYears}
            current={activeIndex}
            onDotClick={goToIndex}
            years={years}
          />

          {/* Year Counter */}
          <motion.div
            className="text-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-white/30 font-body text-sm tracking-wider">
              <span className="text-[#FEBD59] font-semibold">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span className="mx-2">/</span>
              <span>{String(totalYears).padStart(2, '0')}</span>
            </span>
          </motion.div>
        </div>

        {/* Impact So Far Card */}
        <ImpactCard />
      </div>

      {/* Bottom flowing line animation */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #FEBD59 50%, transparent 100%)',
        }}
        initial={{ x: '100%', opacity: 0 }}
        animate={isInView ? {
          x: ['-100%', '100%'],
          opacity: [0, 1, 1, 0],
        } : {}}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 2,
          ease: 'easeInOut',
        }}
      />
    </section>
  )
}

export default JourneySection
