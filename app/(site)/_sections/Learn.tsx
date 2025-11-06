'use client'

import { Section } from '../_components/Section'
import { DigitalTwinVisualization } from '../_components/DigitalTwinVisualization'
import { motion } from 'framer-motion'

export function Learn() {
  const learningPoints = [
    { label: 'Visit Frequency', value: 'Patterns' },
    { label: 'Emotion Tracking', value: 'Moods' },
    { label: 'Category Preferences', value: 'Tastes' },
  ]

  return (
    <Section id="learn" aria-labelledby="learn-heading" className="bg-bg" fullScreen>
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="radial-glow-vi h-[600px] w-[600px]" aria-hidden="true" />
      </div>

      <div className="relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-block rounded-full bg-vi/10 px-4 py-2 text-sm font-medium text-vi">
            Step 2
          </div>
          <h2
            id="learn-heading"
            className="mb-6 text-4xl font-bold leading-tight tracking-tight text-fg md:text-5xl"
          >
            Your{' '}
            <span className="text-gradient">
              digital twin
            </span>{' '}
            learns
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-fg/70">
            Each user has a lightweight AI model that learns from your patterns, builds a preference
            vector, and identifies what makes you happy, curious, or relaxed.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] rounded-2xl bg-gradient-to-br from-vi/10 to-am/10 p-8 glass"
          >
            <DigitalTwinVisualization showLearning={true} />
          </motion.div>

          {/* Learning Points */}
          <div className="space-y-8">
            {learningPoints.map((point, index) => (
              <motion.div
                key={point.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-cy rounded-xl p-6"
              >
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-fg">{point.label}</h3>
                  <span className="text-2xl font-bold text-cy">{point.value}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-bg/50">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    className="h-full bg-gradient-to-r from-cy to-vi"
                  />
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="rounded-xl border border-cy/30 bg-cy/5 p-6"
            >
              <p className="text-fg/80">
                <span className="font-semibold text-cy">Preference Vector:</span> A weighted
                embedding that captures your unique taste profile — likes quiet cafés, evening walks,
                outdoor art.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </Section>
  )
}

