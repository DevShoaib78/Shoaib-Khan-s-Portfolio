import React, { lazy, Suspense } from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'

// Lazy load below-the-fold sections for better initial load performance
const AboutSection = lazy(() => import('../components/AboutSection'))
const JourneySection = lazy(() => import('../components/JourneySection'))
const ExperienceSection = lazy(() => import('../components/ExperienceSection'))
const ContactSection = lazy(() => import('../components/ContactSection'))

// Loading fallback component
const SectionLoader: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-black">
    <div className="w-16 h-16 border-4 border-[#FEBD59] border-t-transparent rounded-full animate-spin"></div>
  </div>
)

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-black" style={{ overflowX: 'hidden' }}>
      <Navbar />
      <HeroSection />
      <Suspense fallback={<SectionLoader />}>
        <AboutSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <JourneySection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <ExperienceSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <ContactSection />
      </Suspense>
    </div>
  )
}

export default Home