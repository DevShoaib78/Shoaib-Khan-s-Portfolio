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

export type Milestone = VideoMilestone | SideBySideVideoMilestone | ImageMilestone | PlaceholderMilestone

export interface YearData {
  year: string
  milestones: Milestone[]
}

// ============================================
// JOURNEY DATA - Year-centric Timeline (Chronological Order)
// ============================================

export const journeyData: YearData[] = [
  // 2017
  {
    year: '2017',
    milestones: [
      {
        type: 'side-by-side',
        title: 'Inspired by The Baigan Vines (TBV)',
        description: 'Created early YouTube sketches and short films.',
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
        description: 'My first attempt at storytelling through cinema.',
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
        description: 'Pushing creative boundaries with viral content.',
        videoUrl: 'https://www.youtube.com/watch?v=gYuMT0itw9g',
        // Full video - no timestamps
      },
    ],
  },

  // 2021-2022
  {
    year: '2021–2022',
    milestones: [
      {
        type: 'placeholder',
        title: 'Dedicated to ESPORTS',
        description: 'Competed and played on national level. A different kind of journey.',
        placeholderText: 'Video coming soon...',
      },
    ],
  },

  // March 2023
  {
    year: 'March 2023',
    milestones: [
      {
        type: 'image',
        title: 'Joined Edventure Park',
        description: 'First step into the startup ecosystem.',
        imageUrl: undefined,  // Placeholder - image to be added
      },
    ],
  },

  // 2023 (Multiple milestones)
  {
    year: '2023',
    milestones: [
      {
        type: 'video',
        title: 'EdTalk Panelist',
        description: 'Sharing insights on education and entrepreneurship.',
        videoUrl: 'https://www.youtube.com/watch?v=YB8Jw19X5fY',
        // Full video
      },
      {
        type: 'video',
        title: 'Stand-Up Comedy Performance',
        description: 'Taking the stage for laughs.',
        videoUrl: 'https://youtu.be/3btEtcmv6GI?si=Vz4GABEHCeKSw4w8',
        // Full video
      },
      {
        type: 'video',
        title: 'Meeting SJ',
        description: 'An inspiring conversation with Sayeeda Jabri.',
        videoUrl: 'https://www.youtube.com/watch?v=5QiDSWN3T-w',
        startTime: '0:00',
        endTime: '1:00',  // 1-minute segment
      },
    ],
  },

  // Sept 2023
  {
    year: 'Sept 2023',
    milestones: [
      {
        type: 'video',
        title: "Meeting with Hyderabad's Influencers",
        description: 'A FEEL video capturing the energy of the creator community.',
        videoUrl: 'https://youtu.be/ou_aBdkTlI8?si=ttPPPvYA8o1_VPFD',
        startTime: '7:53',
        endTime: '9:02',
      },
    ],
  },

  // Later 2023
  {
    year: 'Later 2023',
    milestones: [
      {
        type: 'image',
        title: 'BioReform & Content Creation',
        description: 'Merging purpose with creativity.',
        imageUrl: undefined,  // Placeholder - image to be added
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
        description: 'Building a community of entrepreneurs and storytellers.',
        imageUrl: undefined,  // Group photo placeholder
      },
      {
        type: 'image',
        title: 'Joined Terminate Hunger',
        description: 'Volunteering & service to humanity.',
        imageUrl: undefined,  // Placeholder - image to be added
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
