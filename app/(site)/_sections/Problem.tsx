'use client'

import { Section } from '../_components/Section'
import { MorphingBlob } from '../_components/MorphingBlob'
import { motion } from 'framer-motion'
import { MeshHero } from '../_components/MeshHero'

export function Problem() {
  return (
    <Section id="problem" aria-labelledby="problem-heading" className="bg-bg overflow-hidden" fullScreen>
      {/* Background effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-70">
        <MorphingBlob color="vi" size="lg" />
      </div>
      <div className="absolute top-10 right-10 opacity-50">
        <MorphingBlob color="pink" size="sm" />
      </div>
      <div className="grid-background" aria-hidden="true" />

      <div className="relative grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2
            id="problem-heading"
            className="mb-6 text-4xl font-bold leading-tight tracking-tight text-fg md:text-5xl"
          >
            Your experiences are{' '}
            <span className="text-gradient">
              scattered
            </span>
            . Your story isn&apos;t.
          </h2>
          <div className="space-y-4 text-lg text-fg/70">
            <p>
              People constantly create experiences — visiting new places, trying restaurants, taking
              photos, saving notes — yet all this information remains fragmented across apps like
              Google Maps, Instagram, and Notes.
            </p>
            <p>
              No single system helps you recall where you&apos;ve been, reflect on meaningful patterns,
              or connect with others who share similar lived experiences. Personalized recommendations
              feel generic. People forget meaningful moments.
            </p>
          </div>
        </motion.div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative h-96 lg:h-[500px]"
        >
          <MeshHero />
        </motion.div>
      </div>
    </Section>
  )
}

