import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { getYouTubeVideoId, getYouTubeThumbnail, getYouTubeEmbedUrl } from '../utils/youtube'

interface YouTubeVideoProps {
  videoUrl: string
  title: string
  className?: string
}

const YouTubeVideo: React.FC<YouTubeVideoProps> = ({ videoUrl, title, className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false)

  const videoId = getYouTubeVideoId(videoUrl)
  const thumbnailUrl = getYouTubeThumbnail(videoId)
  const embedUrl = getYouTubeEmbedUrl(videoId, { autoplay: true })

  const handlePlay = () => {
    setIsPlaying(true)
  }

  if (isPlaying) {
    return (
      <div className={`aspect-video ${className}`}>
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
    <div className={`relative aspect-video ${className}`} onClick={handlePlay}>
      {/* Thumbnail */}
      <img
        src={thumbnailUrl}
        alt={title}
        className="w-full h-full object-cover"
        loading="lazy"
        onError={(e) => {
          // Fallback to a default thumbnail if YouTube thumbnail fails
          const target = e.target as HTMLImageElement
          target.src = getYouTubeThumbnail(videoId, 'hqdefault')
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer group">
        {/* Play Button */}
        <motion.div
          className="relative"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <div
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center"
            style={{
              background: 'rgba(254, 189, 89, 0.9)',
              boxShadow: '0 0 30px rgba(254, 189, 89, 0.6)',
            }}
          >
            <Play
              size={40}
              className="ml-1"
              style={{ color: '#000000' }}
              fill="#000000"
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default YouTubeVideo

