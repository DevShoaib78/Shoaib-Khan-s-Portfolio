import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone, Mail, Instagram } from 'lucide-react'
import SectionHeader from './SectionHeader'

// Floating particle component for background ambiance
const FloatingParticle: React.FC<{ delay: number }> = ({ delay }) => {
  const randomX = Math.random() * 100
  const randomDuration = 15 + Math.random() * 10

  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full pointer-events-none"
      style={{
        left: `${randomX}%`,
        bottom: '-5%',
        background: '#FEBD59',
        boxShadow: '0 0 6px rgba(254, 189, 89, 0.8)',
      }}
      animate={{
        y: [0, -800],
        opacity: [0, 1, 1, 0],
        scale: [0.5, 1, 0.5],
      }}
      transition={{
        duration: randomDuration,
        repeat: Infinity,
        delay: delay,
        ease: 'linear',
      }}
    />
  )
}

const ContactSection: React.FC = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })

  const contactMethods = [
    {
      icon: Phone,
      label: 'Call Me',
      value: '+91 87906 87245',
      href: 'tel:+918790687245',
      gradient: 'from-[#FEBD59]/20 via-[#FF9D00]/10 to-transparent',
      iconBg: 'rgba(254, 189, 89, 0.15)',
      iconBorder: 'rgba(254, 189, 89, 0.3)',
      accentColor: '#FEBD59'
    },
    {
      icon: Mail,
      label: 'Email Me',
      value: 'shoaib@hyderabadhustlers.com',
      href: 'mailto:shoaib@hyderabadhustlers.com',
      gradient: 'from-[#FEBD59]/20 via-[#FF9D00]/10 to-transparent',
      iconBg: 'rgba(254, 189, 89, 0.15)',
      iconBorder: 'rgba(254, 189, 89, 0.3)',
      accentColor: '#FEBD59'
    },
    {
      icon: Instagram,
      label: 'Follow Me',
      value: '@beingashoaib',
      href: 'https://www.instagram.com/beingashoaib',
      gradient: 'from-[#FEBD59]/20 via-[#FF9D00]/10 to-transparent',
      iconBg: 'rgba(254, 189, 89, 0.15)',
      iconBorder: 'rgba(254, 189, 89, 0.3)',
      accentColor: '#FEBD59'
    }
  ]

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen flex items-center justify-center py-20 lg:py-32 overflow-hidden bg-black"
      style={{ overflowX: 'hidden' }}
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <FloatingParticle key={i} delay={i * 2} />
        ))}
      </div>

      {/* Large Ambient Glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(254, 189, 89, 0.08) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header - Matching other sections */}
        <SectionHeader title="GET IN" gradientText="TOUCH" isInView={isInView} />

        {/* Contact Cards Grid */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {contactMethods.map((method, index) => {
              const Icon = method.icon
              return (
                <motion.a
                  key={index}
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                    ease: [0.6, 0.05, 0.01, 0.9]
                  }}
                  className="group relative block"
                  style={{ textDecoration: 'none' }}
                >
                  {/* Card Container */}
                  <motion.div
                    className="relative h-full p-6 sm:p-8 rounded-3xl overflow-hidden"
                    style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                    whileHover={{
                      y: -8,
                      borderColor: method.accentColor,
                      transition: { duration: 0.3 }
                    }}
                  >
                    {/* Gradient Background on Hover */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${method.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />

                    {/* Animated Border Glow */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        boxShadow: `0 0 40px ${method.accentColor}30, inset 0 0 40px ${method.accentColor}10`,
                      }}
                    />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center text-center">
                      {/* Icon with Pulsing Ring */}
                      <motion.div
                        className="relative mb-6"
                        whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                        transition={{ duration: 0.4 }}
                      >
                        {/* Pulsing Ring */}
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          style={{
                            border: `2px solid ${method.accentColor}`,
                            opacity: 0.3,
                          }}
                          animate={{
                            scale: [1, 1.4, 1],
                            opacity: [0.3, 0, 0.3],
                          }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                        />

                        {/* Icon Container */}
                        <div
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center relative"
                          style={{
                            background: method.iconBg,
                            border: `2px solid ${method.iconBorder}`,
                          }}
                        >
                          <Icon
                            size={28}
                            className="sm:w-8 sm:h-8"
                            style={{
                              color: method.accentColor,
                              filter: `drop-shadow(0 0 12px ${method.accentColor}80)`,
                            }}
                          />
                        </div>
                      </motion.div>

                      {/* Label */}
                      <motion.p
                        className="text-xs sm:text-sm font-body font-bold mb-3 uppercase tracking-widest"
                        style={{ color: method.accentColor }}
                      >
                        {method.label}
                      </motion.p>

                      {/* Value */}
                      <h3 className="text-xs sm:text-sm md:text-base font-display font-bold text-white group-hover:text-white transition-colors duration-300 px-2">
                        {method.value}
                      </h3>
                    </div>

                    {/* Corner Decoration */}
                    <motion.div
                      className="absolute -top-12 -right-12 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle, ${method.accentColor}30 0%, transparent 70%)`,
                      }}
                    />
                  </motion.div>
                </motion.a>
              )
            })}
          </div>
        </div>

        {/* Call to Action Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12 lg:mt-16"
        >
          <p className="text-white/40 font-body text-sm sm:text-base">
            Prefer a quick chat? <a href="https://wa.me/918790687245" target="_blank" rel="noopener noreferrer" className="text-[#FEBD59] hover:text-[#FF9D00] transition-colors duration-300 underline decoration-[#FEBD59]/50 hover:decoration-[#FEBD59] underline-offset-2">I typically respond within 24 hours</a>
          </p>
        </motion.div>

        {/* Developer Credit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16 lg:mt-24 pb-0"
        >
          <div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <div className="w-2 h-2 rounded-full bg-[#FEBD59] animate-pulse" />
            <p className="text-sm sm:text-base text-white/50 font-body">
              Designed & Developed by{' '}
              <a
                href="https://shoaibdev.framer.website"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FEBD59] hover:text-[#FFBC4C] transition-colors duration-300 font-semibold"
              >
                Mohammed Shoaib Choudry
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactSection