'use client'

import { Section } from '../_components/Section'
import { MorphingBlob } from '../_components/MorphingBlob'
import { motion } from 'framer-motion'
import { MeshHero } from '../_components/MeshHero'

export function Problem() {
  return (
    <Section id="problem" aria-labelledby="problem-heading" className="bg-bg overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-70">
        <MorphingBlob color="vi" size="lg" />
      </div>
      <div className="absolute top-10 right-10 opacity-50">
        <MorphingBlob color="pink" size="sm" />
      </div>
      <div className="grid-background" aria-hidden="true" />

      <div className="relative grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
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
            .
          </h2>
          <ul className="mb-6 space-y-3 text-lg text-fg/70">
            <li className="flex items-start gap-3">
              <span className="mt-1 text-lg">📍</span>
              <span>Your favorite cafés, walks, and trips disappear in feeds and maps.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-lg">🧠</span>
              <span>Generic recommendation apps don&apos;t actually know you.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-lg">🤝</span>
              <span>Planning with friends means endless scrolling and guessing.</span>
            </li>
          </ul>
          <p className="text-lg font-medium text-fg/80">
            SetuAI turns your lived experiences into a system that remembers with you.
          </p>
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

