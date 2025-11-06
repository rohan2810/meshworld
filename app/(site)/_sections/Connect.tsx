'use client'

import { Section } from '../_components/Section'
import { DigitalTwinVisualization } from '../_components/DigitalTwinVisualization'
import { motion } from 'framer-motion'

export function Connect() {
  return (
    <Section id="connect" aria-labelledby="connect-heading" className="bg-bg" fullScreen>
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="radial-glow h-[600px] w-[600px]" aria-hidden="true" />
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
          <div className="mb-4 inline-block rounded-full bg-cy/10 px-4 py-2 text-sm font-medium text-cy">
            Step 4
          </div>
          <h2
            id="connect-heading"
            className="mb-6 text-4xl font-bold leading-tight tracking-tight text-fg md:text-5xl"
          >
            When{' '}
            <span className="text-gradient">
              digital twins
            </span>{' '}
            interact
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-fg/70">
            Connect with others and watch your twins merge preference graphs. The AI finds shared
            interests and suggests plans both would enjoy.
          </p>
        </motion.div>

        {/* Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto mb-12 h-[500px] max-w-4xl rounded-2xl bg-gradient-to-br from-vi/10 to-am/10 p-8 glass"
        >
          <DigitalTwinVisualization showConnection={true} twinCount={2} />
        </motion.div>

        {/* Features */}
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: 'Preference Merge',
              description: 'Temporarily combine preference graphs to discover shared interests.',
              icon: '🔗',
            },
            {
              title: 'Collaborative Planning',
              description: 'AI suggests experiences that fit everyone\'s taste — friends, couples, or groups.',
              icon: '✨',
            },
            {
              title: 'Continuous Learning',
              description: 'Feedback from choices refines both twins\' models for better recommendations.',
              icon: '🧠',
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-cy rounded-xl p-6 text-center"
            >
              <div className="mb-4 text-4xl">{feature.icon}</div>
              <h3 className="mb-2 text-xl font-semibold text-fg">{feature.title}</h3>
              <p className="text-sm text-fg/70">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 rounded-xl border border-cy/30 bg-gradient-to-r from-cy/10 to-vi/10 p-8 text-center"
        >
          <p className="text-lg text-fg/80">
            <span className="font-semibold text-cy">Example:</span> &quot;You both love seaside cafés
            and live music. Try these 3 new spots near La Jolla.&quot;
          </p>
        </motion.div>
      </div>
    </Section>
  )
}

