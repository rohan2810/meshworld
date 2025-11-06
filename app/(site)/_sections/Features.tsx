'use client'

import { Section } from '../_components/Section'
import { FeatureCard } from '../_components/FeatureCard'
import { MobileAppPreview, CheckInScreen, GraphScreen, ChatScreen } from '../_components/MobileAppPreview'
import { MorphingBlob } from '../_components/MorphingBlob'
import { Icon, CaptureIcon, NetworkIcon, ReflectionIcon } from '../_components/Icon'
import { motion } from 'framer-motion'

export function Features() {
  const features = [
    {
      title: 'Smart Check-ins',
      description: 'Simple "I\'m here" button or timeline import from Google Maps.',
      icon: (
        <Icon>
          <CaptureIcon />
        </Icon>
      ),
      mvp: true,
    },
    {
      title: 'Personal Memory Graph',
      description: 'Visual timeline of visited places, moods, and connections. Your experiences form a living network.',
      icon: (
        <Icon>
          <NetworkIcon />
        </Icon>
      ),
      mvp: true,
    },
    {
      title: 'AI Reflection Agent',
      description: 'Conversational queries for recall and planning. Ask anything about your experiences.',
      icon: (
        <Icon>
          <ReflectionIcon />
        </Icon>
      ),
      mvp: true,
    },
    {
      title: 'Personalized Recommendations',
      description: 'New places aligned with your taste profile. Discover experiences you\'ll love.',
      icon: (
        <Icon>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </Icon>
      ),
      mvp: true,
    },
    {
      title: 'Twin Collaboration',
      description: 'Connect with others. AI suggests mutual plans based on merged preference graphs.',
      icon: (
        <Icon>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </Icon>
      ),
      mvp: false,
    },
  ]

  return (
    <Section id="features" aria-labelledby="features-heading" className="bg-bg/50 overflow-hidden" fullScreen>
      {/* Background effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <MorphingBlob color="vi" size="lg" />
      </div>
      <div className="grid-background" aria-hidden="true" />

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
            id="features-heading"
            className="mb-6 text-4xl font-bold leading-tight tracking-tight text-fg md:text-5xl"
          >
            Everything you need to{' '}
            <span className="text-gradient">
              remember and connect
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-fg/70">
            A complete platform for capturing experiences, understanding patterns, and discovering
            shared moments with others.
          </p>
        </motion.div>

        {/* Mobile Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex justify-center"
        >
          <MobileAppPreview
            screens={[
              {
                id: 'checkin',
                title: 'Smart Check-ins',
                description: 'Capture experiences with one tap',
                mockup: <CheckInScreen />,
              },
              {
                id: 'graph',
                title: 'Memory Graph',
                description: 'Visualize your experiences',
                mockup: <GraphScreen />,
              },
              {
                id: 'chat',
                title: 'AI Reflection',
                description: 'Ask questions and get insights',
                mockup: <ChatScreen />,
              },
            ]}
          />
        </motion.div>

        {/* Feature Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative h-full">
                <FeatureCard
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  index={index}
                />
                {feature.mvp && (
                  <div className="absolute top-4 right-4 rounded-full bg-cy/20 px-2 py-1 text-xs font-medium text-cy">
                    MVP
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

