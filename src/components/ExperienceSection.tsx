import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import SectionHeader from './SectionHeader'

interface Experience {
  company: string
  role: string
  logo?: string
  icon?: React.ElementType
  color: string
  period?: string
}

const ExperienceSection: React.FC = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })

  const experiences: Experience[] = [
    {
      company: 'Hyderabad Hustlers',
      role: 'CEO & Co-Founder',
      logo: '/assets/hhlogo.webp',
      color: '#FEBD59'
    },
    {
      company: 'Terminate Hunger',
      role: 'Terminator',
      logo: '/assets/terminatehunger.webp',
      color: '#FEBD59'
    },
    {
      company: 'EdVenture Park',
      role: "Campus Lead, Founders' Friday Lead, Founders' Fest Lead",
      logo: '/assets/evp.webp',
      color: '#FEBD59'
    },
    {
      company: 'BioReform',
      role: 'Former Content & Media Creator',
      logo: '/assets/bioreform.webp',
      color: '#FEBD59'
    },
    {
      company: 'Freelancing',
      role: 'Video Editing Freelancer',
      icon: Briefcase,
      color: '#FEBD59'
    }
  ]

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative min-h-screen flex items-center justify-center py-20 lg:py-32 overflow-hidden bg-black"
      style={{ overflowX: 'hidden' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader title="MY" gradientText="EXPERIENCES" isInView={isInView} />

        {/* Experience Grid - Modern Layout */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {experiences.map((exp, index) => {
              const isFreelancer = exp.company === 'Freelancing'
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    ease: [0.6, 0.05, 0.01, 0.9]
                  }}
                  className={`group relative ${isFreelancer ? 'lg:col-span-2 lg:max-w-2xl lg:mx-auto' : ''}`}
                >
                  {/* Main Card */}
                  <motion.div
                    className="relative h-full p-8 lg:p-10 rounded-3xl overflow-hidden"
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      backdropFilter: 'blur(4px)' // Reduced blur for performance
                    }}
                    whileHover={{
                      borderColor: 'rgba(254, 189, 89, 0.8)',
                      borderWidth: '2px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      scale: 1.02,
                      transition: { duration: 0.3 }
                    }}
                  >
                    {/* Logo Background - Right Side */}
                    {exp.logo && (
                      <div 
                        className="absolute top-0 right-0 w-1/2 h-full opacity-20 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                        style={{
                          backgroundImage: `url(${exp.logo})`,
                          backgroundSize: '85%',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                          filter: 'none'
                        }}
                      />
                    )}

                    {/* Hover Glow Effect */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: 'radial-gradient(circle at center, rgba(254, 189, 89, 0.1) 0%, transparent 70%)',
                      }}
                    />

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Text Content */}
                      <div className="mb-6">
                        <motion.h3 
                          className="text-2xl lg:text-3xl xl:text-4xl font-display font-bold text-white mb-2 group-hover:text-[#FEBD59] transition-colors duration-300 leading-tight"
                          whileHover={{ x: 5 }}
                        >
                          {exp.company}
                        </motion.h3>
                        <p 
                          className="text-base lg:text-lg font-body font-bold transition-colors duration-300"
                          style={{ color: '#FEBD59' }}
                        >
                          {exp.role}
                        </p>
                      </div>

                      {/* Decorative Accent Line */}
                      <motion.div
                        className="h-px w-full mb-4"
                        style={{
                          background: 'linear-gradient(90deg, rgba(254, 189, 89, 0.3) 0%, transparent 100%)'
                        }}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                      />
                    </div>

                    {/* Corner Accent */}
                    <motion.div
                      className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: 'radial-gradient(circle, rgba(254, 189, 89, 0.15) 0%, transparent 70%)',
                        transform: 'translate(50%, -50%)'
                      }}
                    />
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection