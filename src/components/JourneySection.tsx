import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Play, Image as ImageIcon, Calendar } from 'lucide-react'
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
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  title,
  startTime,
  endTime,
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [thumbnailQuality, setThumbnailQuality] = useState<'maxresdefault' | 'hqdefault' | 'mqdefault' | 'sddefault'>('maxresdefault')
  const videoId = getYouTubeVideoId(videoUrl)
  const thumbnailUrl = getYouTubeThumbnail(videoId, thumbnailQuality)

  const embedUrl = getYouTubeEmbedUrl(videoId, {
    autoplay: true,
    start: startTime,
    end: endTime
  })

  const handleThumbnailError = () => {
    // Fallback chain: maxresdefault -> hqdefault -> mqdefault -> sddefault
    if (thumbnailQuality === 'maxresdefault') {
      setThumbnailQuality('hqdefault')
    } else if (thumbnailQuality === 'hqdefault') {
      setThumbnailQuality('mqdefault')
    } else if (thumbnailQuality === 'mqdefault') {
      setThumbnailQuality('sddefault')
    }
  }

  if (isPlaying) {
    return (
      <div className="w-full aspect-video rounded-xl overflow-hidden shadow-2xl">
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
      className="relative w-full aspect-video rounded-xl overflow-hidden cursor-pointer group shadow-2xl"
      onClick={() => setIsPlaying(true)}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={thumbnailUrl}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
        onError={handleThumbnailError}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-sm"
            style={{
              background: 'rgba(254, 189, 89, 0.95)',
              boxShadow: '0 0 50px rgba(254, 189, 89, 0.7), inset 0 0 20px rgba(255, 255, 255, 0.3)',
            }}
          >
            <Play size={26} className="ml-1" style={{ color: '#000' }} fill="#000" />
          </div>

          {/* Pulse rings */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: '2px solid rgba(254, 189, 89, 0.6)' }}
            animate={{ scale: [1, 1.4], opacity: [0.8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: '2px solid rgba(254, 189, 89, 0.4)' }}
            animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

// ============================================
// SIDE-BY-SIDE VIDEO PLAYER
// ============================================

interface SideBySideVideoProps {
  leftVideoUrl: string
  rightVideoUrl: string
  title: string
  leftStartTime?: string
  leftEndTime?: string
  rightStartTime?: string
  rightEndTime?: string
}

const SideBySideVideo: React.FC<SideBySideVideoProps> = ({
  leftVideoUrl,
  rightVideoUrl,
  title,
  leftStartTime,
  leftEndTime,
  rightStartTime,
  rightEndTime,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <VideoPlayer
        videoUrl={leftVideoUrl}
        title={`${title} - Part 1`}
        startTime={leftStartTime}
        endTime={leftEndTime}
      />
      <VideoPlayer
        videoUrl={rightVideoUrl}
        title={`${title} - Part 2`}
        startTime={rightStartTime}
        endTime={rightEndTime}
      />
    </div>
  )
}

// ============================================
// LOCAL VIDEO PLAYER COMPONENT (for video files)
// ============================================

interface LocalVideoPlayerProps {
  videoFile: string
  title: string
}

const LocalVideoPlayer: React.FC<LocalVideoPlayerProps> = ({ videoFile, title }) => {
  return (
    <motion.div
      className="w-full aspect-video rounded-xl overflow-hidden shadow-2xl"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
    >
      <video
        src={videoFile}
        title={title}
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      />
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
}

const MediaPlaceholder: React.FC<PlaceholderProps> = ({ title, text, type }) => (
  <motion.div
    className="w-full aspect-video rounded-xl flex flex-col items-center justify-center relative overflow-hidden"
    style={{
      background: 'linear-gradient(135deg, rgba(254, 189, 89, 0.03) 0%, rgba(254, 189, 89, 0.01) 100%)',
      border: '2px dashed rgba(254, 189, 89, 0.2)',
    }}
    whileHover={{
      borderColor: 'rgba(254, 189, 89, 0.4)',
      background: 'linear-gradient(135deg, rgba(254, 189, 89, 0.05) 0%, rgba(254, 189, 89, 0.02) 100%)'
    }}
  >
    {/* Diagonal pattern overlay */}
    <div
      className="absolute inset-0 opacity-5"
      style={{
        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(254, 189, 89, 0.1) 10px, rgba(254, 189, 89, 0.1) 20px)'
      }}
    />

    <motion.div
      className="w-12 h-12 rounded-full flex items-center justify-center mb-3 relative z-10"
      style={{ background: 'rgba(254, 189, 89, 0.1)' }}
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      {type === 'video' ? (
        <Play size={22} style={{ color: '#FEBD59' }} />
      ) : (
        <ImageIcon size={22} style={{ color: '#FEBD59' }} />
      )}
    </motion.div>
    <p className="text-white/40 font-body text-xs text-center px-6 relative z-10">
      {text || 'Media will be added soon'}
    </p>
  </motion.div>
)

// ============================================
// MILESTONE CARD (within a year group)
// ============================================

interface MilestoneCardProps {
  milestone: Milestone
  isLastInYear: boolean
}

const MilestoneCard: React.FC<MilestoneCardProps> = ({ milestone }) => {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <motion.div
        className="relative backdrop-blur-sm rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        }}
        whileHover={{
          background: 'rgba(255, 255, 255, 0.04)',
          borderColor: 'rgba(254, 189, 89, 0.2)',
        }}
      >
        {/* Card Content */}
        <div className="p-5">
          <h3 className="text-lg md:text-xl font-display font-bold text-white mb-3">
            {milestone.title}
          </h3>

          {milestone.description && (
            <p className="text-white/60 font-body text-xs md:text-sm mb-4 leading-relaxed">
              {milestone.description}
            </p>
          )}

          {/* Media */}
          <div className="mt-3">
            {milestone.type === 'video' && (
              <VideoPlayer
                videoUrl={milestone.videoUrl}
                title={milestone.title}
                startTime={milestone.startTime}
                endTime={milestone.endTime}
              />
            )}

            {milestone.type === 'video-file' && (
              <LocalVideoPlayer
                videoFile={milestone.videoFile}
                title={milestone.title}
              />
            )}

            {milestone.type === 'side-by-side' && (
              <SideBySideVideo
                leftVideoUrl={milestone.leftVideoUrl}
                rightVideoUrl={milestone.rightVideoUrl}
                title={milestone.title}
                leftStartTime={milestone.leftStartTime}
                leftEndTime={milestone.leftEndTime}
                rightStartTime={milestone.rightStartTime}
                rightEndTime={milestone.rightEndTime}
              />
            )}

            {milestone.type === 'image' && (
              milestone.imageUrl ? (
                <motion.div
                  className="aspect-video rounded-xl overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.01 }}
                >
                  <img
                    src={milestone.imageUrl}
                    alt={milestone.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ) : (
                <MediaPlaceholder title={milestone.title} type="image" />
              )
            )}

            {milestone.type === 'placeholder' && (
              <MediaPlaceholder
                title={milestone.title}
                text={milestone.placeholderText}
                type="video"
              />
            )}
          </div>
        </div>

        {/* Hover gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FEBD59]/0 via-transparent to-transparent opacity-0 hover:opacity-5 transition-opacity duration-500 pointer-events-none" />
      </motion.div>
    </motion.div>
  )
}

// ============================================
// YEAR GROUP COMPONENT (Center Timeline)
// ============================================

interface YearGroupProps {
  yearData: YearData
  isLast: boolean
}

const YearGroup: React.FC<YearGroupProps> = ({ yearData }) => {
  return (
    <motion.div
      className="relative mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Year Header - Centered */}
      <motion.div
        className="text-center mb-10 relative z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full backdrop-blur-md"
          style={{
            background: 'rgba(254, 189, 89, 0.1)',
            border: '1px solid rgba(254, 189, 89, 0.3)',
          }}
        >
          <Calendar size={16} className="text-[#FEBD59]" />
          <h2 className="text-2xl md:text-3xl font-display font-black text-white tracking-tight">
            {yearData.year}
          </h2>
        </div>
      </motion.div>

      {/* Milestones Grid - Centered, smaller cards */}
      <div className="max-w-3xl mx-auto space-y-8 pt-2 relative z-10">
        {yearData.milestones.map((milestone, index) => (
          <MilestoneCard
            key={index}
            milestone={milestone}
            isLastInYear={index === yearData.milestones.length - 1}
          />
        ))}
      </div>
    </motion.div>
  )
}

// ============================================
// ONGOING INDICATOR
// ============================================

const OngoingIndicator: React.FC = () => {
  return (
    <motion.div
      className="relative flex flex-col items-center pt-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      {/* Short unfinished line - Centered */}
      <motion.div
        className="w-0.5 h-20"
        style={{
          background: 'linear-gradient(180deg, rgba(254, 189, 89, 0.5) 0%, transparent 100%)',
        }}
        initial={{ scaleY: 0, originY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      />

      {/* Animated dots at the end */}
      <div className="flex flex-col gap-1.5 mt-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-[#FEBD59]"
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Text */}
      <motion.div
        className="text-center mt-6"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-xl md:text-2xl font-display font-bold text-[#FEBD59] italic">
          and ongoing...
        </p>
        <p className="text-white/40 font-body text-xs mt-1">
          The journey continues
        </p>
      </motion.div>
    </motion.div>
  )
}

// ============================================
// IMPACT STATS SECTION
// ============================================

const ImpactStats: React.FC = () => {
  return (
    <motion.div
      className="mt-20 max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-10">
        <h4 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3">
          Impact <span className="text-[#FEBD59]">So Far</span>
        </h4>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#FEBD59] to-transparent mx-auto rounded-full" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
        {impactStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="group relative p-6 rounded-xl overflow-hidden backdrop-blur-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{
              background: 'rgba(255, 255, 255, 0.04)',
              borderColor: 'rgba(254, 189, 89, 0.2)',
            }}
          >
            <div className="text-center relative z-10">
              <motion.span
                className="block text-4xl font-display font-black text-white group-hover:text-[#FEBD59] transition-colors duration-300 mb-1"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.3 + (index * 0.1), type: 'spring', stiffness: 150 }}
              >
                {stat.value}
              </motion.span>
              <p className="text-white/50 group-hover:text-[#FEBD59]/70 transition-colors duration-300 font-body text-xs font-medium uppercase tracking-widest">
                {stat.label}
              </p>
            </div>

            {/* Hover glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FEBD59]/0 via-transparent to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
          </motion.div>
        ))}
      </div>

      {/* Collaborations Ticker */}
      <motion.div
        className="relative rounded-xl overflow-hidden backdrop-blur-sm"
        style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center p-2">
          <div className="flex-shrink-0 mr-3">
            <div className="bg-[#FEBD59]/10 border border-[#FEBD59]/20 rounded-lg px-3 py-2 backdrop-blur-md">
              <span className="text-[#FEBD59] font-display font-bold text-xs tracking-wide">
                COLLABORATIONS
              </span>
            </div>
          </div>

          <div className="relative flex-1 overflow-hidden h-9">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-black to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-black to-transparent z-10" />

            <motion.div
              className="flex gap-6 whitespace-nowrap absolute"
              animate={{ x: ['0%', '-50%'] }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: 'linear'
              }}
            >
              {[...collaboratedBrands, ...collaboratedBrands, ...collaboratedBrands].map((brand, index) => (
                <span
                  key={index}
                  className="text-white/50 font-display text-sm font-semibold flex items-center gap-2"
                >
                  {brand}
                  <span className="w-1 h-1 rounded-full bg-[#FEBD59]/40" />
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
// MAIN JOURNEY SECTION
// ============================================

const JourneySection: React.FC = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0 })

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="relative bg-black py-20 lg:py-32 overflow-hidden"
    >
      {/* Background ambient glow */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(254, 189, 89, 0.15), transparent 70%)' }}
        animate={isInView ? { scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] } : {}}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(254, 189, 89, 0.12), transparent 70%)' }}
        animate={isInView ? { scale: [1, 1.4, 1], opacity: [0.15, 0.3, 0.15] } : {}}
        transition={{ duration: 15, repeat: Infinity, delay: 3 }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <SectionHeader title="MY" gradientText="JOURNEY" isInView={isInView} />

        {/* Subtitle */}
        <motion.p
          className="text-center text-white/50 font-body text-sm sm:text-base max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.3 }}
        >
          A timeline of growth, creativity, and milestones that shaped who I am today.
        </motion.p>

        {/* Timeline Container with Continuous Vertical Line */}
        <div className="max-w-6xl mx-auto relative">
          {/* CONTINUOUS VERTICAL LINE - Runs through entire timeline */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-0.5 z-0"
            style={{
              top: '80px',
              bottom: '120px',
              background: 'linear-gradient(180deg, rgba(254, 189, 89, 0.6) 0%, rgba(254, 189, 89, 0.4) 50%, rgba(254, 189, 89, 0.3) 100%)',
            }}
            initial={{ scaleY: 0, transformOrigin: 'top' }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: 0.5, duration: 2, ease: 'easeOut' }}
          />

          {/* Year Groups */}
          {journeyData.map((yearData, index) => (
            <YearGroup
              key={yearData.year}
              yearData={yearData}
              isLast={index === journeyData.length - 1}
            />
          ))}

          {/* Ongoing Indicator */}
          <OngoingIndicator />
        </div>

        {/* Impact Stats */}
        <ImpactStats />
      </div>

      {/* Bottom gradient line */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(254, 189, 89, 0.5) 50%, transparent 100%)',
        }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1 }}
      />
    </section>
  )
}

export default JourneySection
