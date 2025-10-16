import React from 'react'
import { motion } from 'framer-motion'

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-gray-900/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-6xl font-display font-extrabold mb-8" style={{ letterSpacing: '-0.02em' }}>
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-body" style={{ letterSpacing: '-0.01em' }}>
            Ready to collaborate? Let's create something amazing together.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactSection