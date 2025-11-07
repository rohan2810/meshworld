'use client'

import { Section } from '../_components/Section'
import { MorphingBlob } from '../_components/MorphingBlob'
import { motion } from 'framer-motion'

export function Tech() {

  return (
    <Section id="tech" aria-labelledby="tech-heading" className="bg-bg/50 overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/3 right-1/4">
        <MorphingBlob color="am" size="lg" />
      </div>
      <div className="absolute bottom-1/3 left-1/4">
        <MorphingBlob color="vi" size="md" />
      </div>
      <div className="grid-background" aria-hidden="true" />

      <div className="relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h2
            id="tech-heading"
            className="mb-4 text-4xl font-bold leading-tight tracking-tight text-fg md:text-5xl"
          >
            What powers your{' '}
            <span className="text-gradient">
              AI twin
            </span>
            ?
          </h2>
        </motion.div>

        {/* Simple Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto max-w-3xl"
        >
          <ul className="mb-6 space-y-3 text-lg text-fg/80">
            <li className="flex items-start gap-3">
              <span className="mt-1 text-cy">•</span>
              <span>Embeddings + graphs connect your places, moods, and notes into patterns.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-cy">•</span>
              <span>Your AI twin uses these patterns to answer nuanced questions about your life.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-cy">•</span>
              <span>All of this is tied to your account, with clear controls over what's stored and shared.</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </Section>
  )
}

