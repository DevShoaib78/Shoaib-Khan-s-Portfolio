// ============================================
// TYPE DEFINITIONS
// ============================================

export interface VideoMilestone {
  type: 'video'
  title: string
  description?: string
  videoUrl: string
  startTime?: string  // Format: "mm:ss" or "hh:mm:ss"
  endTime?: string    // Format: "mm:ss" or "hh:mm:ss"
}

export interface SideBySideVideoMilestone {
  type: 'side-by-side'
  title: string
  description?: string
  leftVideoUrl: string
  rightVideoUrl: string
  leftStartTime?: string
  leftEndTime?: string
  rightStartTime?: string
  rightEndTime?: string
}

export interface ImageMilestone {
  type: 'image'
  title: string
  description?: string
  imageUrl?: string  // undefined means placeholder
}

export interface PlaceholderMilestone {
  type: 'placeholder'
  title: string
  description?: string
  placeholderText?: string
}

export interface VideoFileMilestone {
  type: 'video-file'
  title: string
  description?: string
  videoFile: string  // Path to local video file
}

export type Milestone = VideoMilestone | SideBySideVideoMilestone | ImageMilestone | PlaceholderMilestone | VideoFileMilestone

export interface YearData {
  year: string
  milestones: Milestone[]
}

// ============================================
// JOURNEY DATA - Grouped by Year
// ============================================

export const journeyData: YearData[] = [
  // 2017
  {
    year: '2017',
    milestones: [
      {
        type: 'side-by-side',
        title: 'Early Creative Journey',
        description: 'Inspired by The Baigan Vines (TBV), created early YouTube sketches and short films.',
        leftVideoUrl: 'https://www.youtube.com/watch?v=dFVN-VAesNM',
        rightVideoUrl: 'https://www.youtube.com/watch?v=Z9qalRZfCi0',
      },
    ],
  },

  // 2018
  {
    year: '2018',
    milestones: [
      {
        type: 'video',
        title: 'First Telugu Short Film',
        description: 'Directed my first Telugu short film.',
        videoUrl: 'https://www.youtube.com/watch?v=aQPRRoN5_nU',
        startTime: '1:20',
        endTime: '2:13',
      },
    ],
  },

  // 2020
  {
    year: '2020',
    milestones: [
      {
        type: 'video',
        title: 'One of the Craziest Videos',
        description: 'Produced one of my craziest videos.',
        videoUrl: 'https://www.youtube.com/watch?v=gYuMT0itw9g',
      },
    ],
  },

  // 2021-2022
  {
    year: '2021–2022',
    milestones: [
      {
        type: 'video-file',
        title: 'E-Sports Phase',
        description: 'Dedicated time towards E-Sports.',
        videoFile: '/assets/esportsphase.mp4',
      },
    ],
  },

  // 2023 (all 2023 milestones grouped together)
  {
    year: '2023',
    milestones: [
      {
        type: 'image',
        title: 'Joined Edventure Park',
        description: "Joined Edventure Park (India's 1st/largest student-focused startup incubator).",
        imageUrl: '/assets/JoinedEdventurePark.webp',
      },
      {
        type: 'video',
        title: "Meeting with Hyderabad's Influencers",
        description: '',
        videoUrl: 'https://youtu.be/ou_aBdkTlI8?si=ttPPPvYA8o1_VPFD',
        startTime: '7:53',
        endTime: '9:02',
      },
      {
        type: 'image',
        title: 'Joined BioReform',
        description: 'Joined BioReform as a content and media creator (My Startup journey started + Met Azhar Mohiuddin).',
        imageUrl: '/assets/BioReform & Content Creation.webp',
      },
      {
        type: 'video',
        title: 'EdTalk Panelist',
        description: 'Became a panelist for a EdTalk topic called "Influencer Influenza.',
        videoUrl: 'https://youtu.be/YB8Jw19X5fY',
      },
      {
        type: 'video',
        title: 'Meeting Sayeeda Jabri',
        description: 'Met Sayeeda Jabri, after that a vision sparked - she wanted to bring entrepreneurial talks to media, and Shoaib wanted to cover authentic startup stories, thus started Hyderabad Hustlers.',
        videoUrl: 'https://www.youtube.com/watch?v=5QiDSWN3T-w',
        startTime: '2:30',
        endTime: '3:30',
      },
      {
        type: 'video',
        title: 'Stand-Up Comedy Performance',
        description: '',
        videoUrl: 'https://youtu.be/3btEtcmv6GI?si=Vz4GABEHCeKSw4w8',
      },
    ],
  },

  // 2024
  {
    year: '2024',
    milestones: [
      {
        type: 'image',
        title: 'Formation of Hyderabad Hustlers',
        description: 'Hyderabad Hustlers was formed. Initially ran podcasts while still working with BioReform. Later chose to fully dedicate myself to Hyderabad Hustlers, leaving BioReform. Unlike other startups that go through long pre-incubation phases at EdVenture Park, Hyderabad Hustlers got directly incubated due to the rapid traction.',
        imageUrl: '/assets/Formation of HH.webp',
      },
      {
        type: 'image',
        title: 'Joined Terminate Hunger',
        description: 'Met Imad ali at Founders’ Fest and recorded his vision - Loved his vision nd mission and joined his team to terminate the hunger,',
        imageUrl: '/assets/Joined Terminate Hunger.webp',
      },
    ],
  },
]

// ============================================
// IMPACT STATS
// ============================================

export interface ImpactStat {
  value: string
  label: string
  icon: string
}

export const impactStats: ImpactStat[] = [
  { value: '50+', label: 'Videos Created', icon: 'video' },
  { value: '1M+', label: 'Audience Reached', icon: 'users' },
  { value: '15+', label: 'Brands Collaborated', icon: 'briefcase' },
]

export const collaboratedBrands: string[] = [
  'Edventure Park',
  'BioReform',
  'August Fest',
  'Terminate Hunger',
  'HH Studio',
  'Creator Economy',
  'Startup Hyderabad',
  'TEDx',
]
