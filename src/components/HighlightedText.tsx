import React from 'react'

interface HighlightedTextProps {
  text: string
  highlights?: string[]
  highlightColor?: string
}

/**
 * Component to highlight specific words/phrases in text
 * Safely highlights text without using dangerouslySetInnerHTML
 */
const HighlightedText: React.FC<HighlightedTextProps> = ({
  text,
  highlights: customHighlights,
  highlightColor = '#FEBD59'
}) => {
  const defaultHighlights = [
    'Shoaib Khan',
    'content creator',
    'director',
    'writer',
    'video editor',
    'entrepreneurial',
    'entrepreneur',
    '2017',
    'video editing',
    'content creation',
    'entrepreneurship',
    'Edventure Park',
    'BioReform',
    'Hyderabad Hustlers',
    '50+',
    'entrepreneurs',
    '1M+',
    'audiences',
    'The Baigan Vines'
  ]

  const highlights = customHighlights || defaultHighlights

  // Sort by length (longest first) to avoid partial replacements
  const sortedHighlights = [...highlights].sort((a, b) => b.length - a.length)

  // Find all matches with their positions
  const matches: { start: number; end: number; phrase: string }[] = []

  sortedHighlights.forEach(phrase => {
    const regex = new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
    let match
    while ((match = regex.exec(text)) !== null) {
      // Check if this position is already covered by a longer match
      const overlaps = matches.some(m =>
        (match.index >= m.start && match.index < m.end) ||
        (match.index + match[0].length > m.start && match.index < m.start)
      )
      if (!overlaps) {
        matches.push({
          start: match.index,
          end: match.index + match[0].length,
          phrase: match[0]
        })
      }
    }
  })

  // Sort matches by position
  matches.sort((a, b) => a.start - b.start)

  // Build the result
  const parts: React.ReactNode[] = []
  let lastIndex = 0

  matches.forEach((match, idx) => {
    // Add text before the match
    if (match.start > lastIndex) {
      parts.push(text.substring(lastIndex, match.start))
    }
    // Add highlighted match
    parts.push(
      <span
        key={idx}
        className="font-semibold"
        style={{ color: highlightColor }}
      >
        {match.phrase}
      </span>
    )
    lastIndex = match.end
  })

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex))
  }

  return <>{parts}</>
}

export default HighlightedText
