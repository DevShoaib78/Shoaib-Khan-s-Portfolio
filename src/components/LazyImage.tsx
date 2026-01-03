import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  placeholderColor?: string
  showSpinner?: boolean
  srcSet?: string
  sizes?: string
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  placeholderColor = 'rgba(254, 189, 89, 0.1)',
  showSpinner = true,
  className = '',
  srcSet,
  sizes,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Reset states when src changes
    setIsLoading(true)
    setHasError(false)
  }, [src])

  const handleLoad = (): void => {
    setIsLoading(false)
  }

  const handleError = (): void => {
    setIsLoading(false)
    setHasError(true)
  }

  return (
    <div className="relative w-full h-full">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: placeholderColor }}
          >
            {showSpinner && (
              <motion.div
                className="w-12 h-12 rounded-full border-4 border-[#FEBD59]/30 border-t-[#FEBD59]"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {hasError ? (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ backgroundColor: placeholderColor }}
        >
          <div className="text-center px-4">
            <svg
              className="w-12 h-12 mx-auto mb-2 text-[#FEBD59]/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm text-white/50 font-body">Failed to load image</p>
          </div>
        </div>
      ) : (
        <motion.img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          className={className}
          onLoad={handleLoad}
          onError={handleError}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 0.4 }}
          {...props}
        />
      )}
    </div>
  )
}

export default LazyImage
