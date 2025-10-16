import React from 'react'
import { motion } from 'framer-motion'
import { Instagram, Linkedin, Youtube, Camera, Mic, Film, Edit3, Clapperboard } from 'lucide-react'

const HeroSection: React.FC = () => {
  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      href: '#',
      hoverClass: 'hover:bg-primary hover:text-black'
    },
    {
      name: 'LinkedIn', 
      icon: Linkedin,
      href: '#',
      hoverClass: 'hover:bg-primary hover:text-black'
    },
    {
      name: 'YouTube',
      icon: Youtube, 
      href: '#',
      hoverClass: 'hover:bg-primary hover:text-black'
    }
  ]

  const backgroundIcons = [
    { Icon: Camera, position: { top: '20%', left: '10%' } },
    { Icon: Mic, position: { top: '60%', left: '15%' } },
    { Icon: Film, position: { top: '30%', right: '20%' } },
    { Icon: Edit3, position: { bottom: '30%', right: '10%' } },
    { Icon: Clapperboard, position: { top: '70%', right: '25%' } },
  ]

  return (
    <section id="hero" className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background Icons */}
      <div className="absolute inset-0">
        {backgroundIcons.map(({ Icon, position }, index) => (
          <motion.div
            key={index}
            className="absolute text-white/5"
            style={position}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4 + index,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.5
            }}
          >
            <Icon size={80} />
          </motion.div>
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-transparent to-black/60" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-6xl md:text-8xl font-display font-extrabold mb-6"
              style={{ letterSpacing: '-0.03em' }}
            >
              <span className="gradient-text">Shoaib</span>
              <br />
              <span className="text-white">Khan</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 font-accent font-medium leading-relaxed"
              style={{ letterSpacing: '-0.01em' }}
            >
              Content Creator, Director, Video Editor & Entrepreneur
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="flex justify-center lg:justify-start space-x-6 mb-12"
            >
              {socialLinks.map(({ name, icon: Icon, href, hoverClass }) => (
                <motion.a
                  key={name}
                  href={href}
                  whileHover={{ 
                    scale: 1.1,
                    y: -5
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20
                    text-white transition-all duration-300 ${hoverClass}
                    hover:shadow-lg hover:shadow-primary/20
                  `}
                >
                  <Icon size={24} />
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-primary text-black font-body font-semibold rounded-full hover:bg-yellow-400 transition-colors duration-300"
                style={{ letterSpacing: '-0.01em' }}
              >
                Get In Touch
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 border-2 border-primary text-primary font-body font-semibold rounded-full hover:bg-primary hover:text-black transition-all duration-300"
                style={{ letterSpacing: '-0.01em' }}
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Content - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex justify-center lg:justify-end"
          >
            <motion.div
              whileHover={{ 
                scale: 1.02,
                y: -5
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative"
            >
              <div className="w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl shadow-primary/20">
                <img
                  src="/api/placeholder/400/400"
                  alt="Shoaib Khan"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating elements around image */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center backdrop-blur-sm"
              >
                <Camera className="text-primary" size={24} />
              </motion.div>
              
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center backdrop-blur-sm"
              >
                <Edit3 className="text-primary" size={24} />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>


    </section>
  )
}

export default HeroSection