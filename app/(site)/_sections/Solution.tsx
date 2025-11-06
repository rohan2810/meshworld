'use client'

import { Section } from '../_components/Section'
import { FeatureCard } from '../_components/FeatureCard'
import { Icon, CaptureIcon, NetworkIcon, ReflectionIcon } from '../_components/Icon'
import { motion } from 'framer-motion'

export function Solution() {
  const features = [
    {
      title: 'Experience Capture',
      description:
        'Seamlessly capture notes, photos, voice recordings, and location data. Your life, automatically contextualized.',
      icon: (
        <Icon>
          <CaptureIcon />
        </Icon>
      ),
    },
    {
      title: 'Experience Graph',
      description:
        'A living network of nodes and connections. Watch as your experiences form patterns and reveal semantic relationships.',
      icon: (
        <Icon>
          <NetworkIcon />
        </Icon>
      ),
    },
    {
      title: 'Reflection',
      description:
        'Ask your digital twin anything. "What made me happiest this year?" "Where was I most creative?" Get answers that matter.',
      icon: (
        <Icon>
          <ReflectionIcon />
        </Icon>
      ),
    },
  ]

  return (
    <Section id="solution" aria-labelledby="solution-heading" className="bg-bg/50">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="radial-glow-vi h-[600px] w-[600px]" aria-hidden="true" />
      </div>

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
            id="solution-heading"
            className="mb-6 text-4xl font-bold leading-tight tracking-tight text-fg md:text-5xl"
          >
            One AI that{' '}
            <span className="bg-gradient-to-r from-cy via-vi to-am bg-clip-text text-transparent">
              understands your life
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-fg/70">
            More than a memory keeper. A living graph of your experiences that learns, connects,
            and reflects.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}

