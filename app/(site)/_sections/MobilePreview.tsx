'use client'

import { Section } from '../_components/Section'
import { MobileAppPreview, CheckInScreen, GraphScreen, ChatScreen } from '../_components/MobileAppPreview'
import { motion } from 'framer-motion'

export function MobilePreview() {
  const screens = [
    {
      id: 'checkin',
      title: 'Smart Check-ins',
      description: 'Capture experiences with one tap or automatic import',
      mockup: <CheckInScreen />,
    },
    {
      id: 'graph',
      title: 'Memory Graph',
      description: 'Visualize your experiences as an interconnected network',
      mockup: <GraphScreen />,
    },
    {
      id: 'chat',
      title: 'AI Reflection',
      description: 'Ask questions and get intelligent insights about your experiences',
      mockup: <ChatScreen />,
    },
  ]

  return (
    <Section id="mobile-preview" aria-labelledby="mobile-preview-heading" className="bg-bg" fullScreen>
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-mesh" aria-hidden="true" />

      <div className="relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2
            id="mobile-preview-heading"
            className="mb-6 text-4xl font-bold leading-tight tracking-tight text-fg md:text-5xl"
          >
            Experience MeshWorld on{' '}
            <span className="text-gradient">
              mobile
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-fg/70">
            Built mobile-first. Capture experiences on the go, view your memory graph, and chat with
            your AI agent — all in the palm of your hand.
          </p>
        </motion.div>

        {/* Mobile Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <MobileAppPreview screens={screens} />
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid gap-6 md:grid-cols-3"
        >
          {[
            {
              title: 'Always With You',
              description: 'Capture experiences as they happen, wherever you are.',
              icon: '📍',
            },
            {
              title: 'Visual Memory',
              description: 'See your life as an interconnected graph of experiences.',
              icon: '🕸️',
            },
            {
              title: 'AI Companion',
              description: 'Get insights and recommendations on the go.',
              icon: '🤖',
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="glass-cy rounded-xl p-6 text-center"
            >
              <div className="mb-3 text-3xl">{feature.icon}</div>
              <h3 className="mb-2 font-semibold text-fg">{feature.title}</h3>
              <p className="text-sm text-fg/70">{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}

