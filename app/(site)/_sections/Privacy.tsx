'use client'

import { Section } from '../_components/Section'
import { MorphingBlob } from '../_components/MorphingBlob'
import { motion } from 'framer-motion'

export function Privacy() {
  return (
    <Section id="privacy" aria-labelledby="privacy-heading" className="bg-bg overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-70">
        <MorphingBlob color="cy" size="lg" />
      </div>
      <div className="grid-background" aria-hidden="true" />

      <div className="relative mx-auto max-w-3xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-cy/20 p-4">
              <svg
                className="h-8 w-8 text-cy"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>
          <h2
            id="privacy-heading"
            className="mb-4 text-4xl font-bold leading-tight tracking-tight text-fg md:text-5xl"
          >
            Private by design, or it{' '}
            <span className="text-gradient">doesn't ship</span>.
          </h2>
        </motion.div>

        {/* Privacy Points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-3 text-lg text-fg/80"
        >
          <div className="flex items-start gap-3">
            <span className="mt-1 text-cy">✓</span>
            <span>You own your data. Export or delete anytime.</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="mt-1 text-cy">✓</span>
            <span>Location and memories are never sold or used for third-party ads.</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="mt-1 text-cy">✓</span>
            <span>Twin-to-twin only shares high-level preference signals, never raw places or logs.</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="mt-1 text-cy">✓</span>
            <span>Strong encryption in transit and at rest; strict opt-ins for any sharing.</span>
          </div>
        </motion.div>

        {/* Policy Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-center text-sm text-fg/60"
        >
          Full policy coming before public launch.
        </motion.div>
      </div>
    </Section>
  )
}

