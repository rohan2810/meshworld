'use client'

import { Section } from '../_components/Section'
import { MobileAppPreview, CheckInScreen } from '../_components/MobileAppPreview'
import { Icon, CaptureIcon } from '../_components/Icon'
import { motion } from 'framer-motion'
import { FeatureCard } from '../_components/FeatureCard'

export function Capture() {
  const features = [
    {
      title: 'Smart Check-ins',
      description: 'Simple "I\'m here" button or automatic timeline import from Google Maps.',
      icon: (
        <Icon>
          <CaptureIcon />
        </Icon>
      ),
    },
    {
      title: 'Rich Context',
      description: 'Each location becomes a node with place type, time, mood, companions, and photos.',
      icon: (
        <Icon>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        </Icon>
      ),
    },
    {
      title: 'AI Enrichment',
      description: 'Optional AI tagging adds scene, emotion, and theme to every experience.',
      icon: (
        <Icon>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </Icon>
      ),
    },
  ]

  return (
    <Section id="capture" aria-labelledby="capture-heading" className="bg-bg/50 gradient-mesh" fullScreen>
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
            Step 1
          </div>
          <h2
            id="capture-heading"
            className="mb-6 text-4xl font-bold leading-tight tracking-tight text-fg md:text-5xl"
          >
            <span className="text-gradient">
              Capture
            </span>{' '}
            your experiences
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-fg/70">
            Import your visits from Google Maps Timeline or use simple check-ins. Every location,
            moment, and memory becomes a node in your personal memory graph.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Features */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <FeatureCard
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  index={index}
                />
              </motion.div>
            ))}
          </div>

          {/* Mobile Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center"
          >
            <MobileAppPreview
              screens={[
                {
                  id: 'checkin',
                  title: 'Smart Check-ins',
                  description: 'One tap to capture where you are',
                  mockup: <CheckInScreen />,
                },
              ]}
            />
          </motion.div>
        </div>
      </div>
    </Section>
  )
}

