'use client'

import { Section } from '../_components/Section'
import { AnimatedCounter } from '../_components/AnimatedCounter'
import { motion } from 'framer-motion'

export function Metrics() {
  const metrics = [
    {
      value: 7000,
      suffix: '+',
      label: 'Experiences Captured',
      description: 'Real-world moments transformed into data',
      icon: '📍',
    },
    {
      value: 12,
      suffix: ' months',
      label: 'Of Data',
      description: 'Building comprehensive memory graphs',
      icon: '📅',
    },
    {
      value: 500,
      suffix: '+',
      label: 'Locations Mapped',
      description: 'Places visited and remembered',
      icon: '🗺️',
    },
    {
      value: 1000,
      suffix: '+',
      label: 'AI Queries',
      description: 'Conversations with digital twins',
      icon: '💬',
    },
  ]

  return (
    <Section id="metrics" aria-labelledby="metrics-heading" className="bg-bg/50 gradient-mesh" fullScreen>
      <div className="relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2
            id="metrics-heading"
            className="mb-6 text-4xl font-bold leading-tight tracking-tight text-fg md:text-5xl"
          >
            Growing{' '}
            <span className="text-gradient">
              every day
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-fg/70">
            Join early users building their personal memory graphs and discovering new ways to
            connect with their experiences.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-xl p-8 text-center"
            >
              <div className="mb-4 text-4xl">{metric.icon}</div>
              <div className="mb-2 text-5xl font-bold text-cy">
                <AnimatedCounter end={metric.value} suffix={metric.suffix} />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-fg">{metric.label}</h3>
              <p className="text-sm text-fg/60">{metric.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Additional Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 grid gap-6 md:grid-cols-3"
        >
          {[
            {
              stat: '24/7',
              label: 'Available',
              description: 'Your digital twin is always ready',
            },
            {
              stat: '100%',
              label: 'Privacy',
              description: 'User-owned data and encryption',
            },
            {
              stat: 'AI-Powered',
              label: 'Intelligence',
              description: 'Advanced learning algorithms',
            },
          ].map((item) => (
            <div
              key={item.label}
              className="glass-cy rounded-xl p-6 text-center"
            >
              <div className="mb-2 text-3xl font-bold text-cy">{item.stat}</div>
              <h3 className="mb-1 font-semibold text-fg">{item.label}</h3>
              <p className="text-sm text-fg/60">{item.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}

