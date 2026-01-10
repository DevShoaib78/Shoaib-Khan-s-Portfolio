/**
 * Extracts the YouTube video ID from various YouTube URL formats
 * @param url - YouTube video URL
 * @returns The video ID or empty string if not found
 */
export const getYouTubeVideoId = (url: string): string => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([^&\n?#]+)/,
    /(?:youtu\.be\/)([^&\n?#]+)/,
    /(?:youtube\.com\/embed\/)([^&\n?#]+)/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }

  return ''
}

/**
 * Generates YouTube thumbnail URL
 * @param videoId - YouTube video ID
 * @param quality - Thumbnail quality ('maxresdefault' | 'hqdefault' | 'mqdefault' | 'sddefault' | 'default')
 * @returns Thumbnail URL
 */
export const getYouTubeThumbnail = (
  videoId: string,
  quality: 'maxresdefault' | 'hqdefault' | 'mqdefault' | 'sddefault' | 'default' = 'maxresdefault'
): string => {
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`
}

/**
 * Converts time string (mm:ss or hh:mm:ss) to seconds
 * @param timeStr - Time string in format "mm:ss" or "hh:mm:ss"
 * @returns Number of seconds
 */
export const timeToSeconds = (timeStr: string): number => {
  const parts = timeStr.split(':').map(Number)
  if (parts.length === 2) {
    return parts[0] * 60 + parts[1]
  } else if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2]
  }
  return 0
}

/**
 * Generates YouTube embed URL with specified options
 * @param videoId - YouTube video ID
 * @param options - Embed options including optional start/end timestamps
 * @returns Embed URL
 */
export const getYouTubeEmbedUrl = (
  videoId: string,
  options: {
    autoplay?: boolean
    controls?: boolean
    modestbranding?: boolean
    rel?: boolean
    enablejsapi?: boolean
    start?: number | string  // Seconds or time string "mm:ss"
    end?: number | string    // Seconds or time string "mm:ss"
  } = {}
): string => {
  const {
    autoplay = false,
    controls = true,
    modestbranding = true,
    rel = false,
    enablejsapi = true,
    start,
    end,
  } = options

  const params = new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    controls: controls ? '1' : '0',
    modestbranding: modestbranding ? '1' : '0',
    rel: rel ? '1' : '0',
    enablejsapi: enablejsapi ? '1' : '0',
  })

  // Add start time if provided
  if (start !== undefined) {
    const startSeconds = typeof start === 'string' ? timeToSeconds(start) : start
    params.set('start', startSeconds.toString())
  }

  // Add end time if provided
  if (end !== undefined) {
    const endSeconds = typeof end === 'string' ? timeToSeconds(end) : end
    params.set('end', endSeconds.toString())
  }

  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`
}
