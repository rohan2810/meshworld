'use client'

import { Section } from '../_components/Section'
import { FeatureCard } from '../_components/FeatureCard'
import { MorphingBlob } from '../_components/MorphingBlob'
import { Icon, NetworkIcon, ReflectionIcon } from '../_components/Icon'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export function Features() {
  const features = [
    {
      title: 'Personal Memory Graph',
      description: "A timeline + map of where you've been, how you felt, and who you were with — all in one place.",
      badge: 'MVP',
      icon: (
        <Icon>
          <NetworkIcon />
        </Icon>
      ),
    },
    {
      title: 'AI Reflection Agent',
      description: 'Spot patterns in your time: routines, happy places, energy drains, and hidden favorites.',
      badge: 'MVP',
      icon: (
        <Icon>
          <ReflectionIcon />
        </Icon>
      ),
    },
    {
      title: 'Personalized Recommendations',
      description: 'New cafés, walks, and spots based on your real behavior, not generic city lists.',
      badge: 'MVP',
      icon: (
        <Icon>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </Icon>
      ),
    },
    {
      title: 'Twin Collaboration',
      description: 'When you connect, your twins find overlap and suggest plans that work for everyone — without exposing raw data.',
      badge: 'Coming soon',
      icon: (
        <Icon>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </Icon>
      ),
    },
    {
      title: 'Emotion & Novelty Metrics',
      description: 'See what types of experiences make you happiest, and how often you try something new.',
      badge: 'Coming soon',
      icon: (
        <Icon>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </Icon>
      ),
    },
  ]

  return (
    <Section id="features" aria-labelledby="features-heading" className="bg-bg/50 overflow-hidden">
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
          className="mb-10 text-center"
        >
          <h2
            id="features-heading"
            className="mb-4 text-4xl font-bold leading-tight tracking-tight text-fg md:text-5xl"
          >
            Product{' '}
            <span className="text-gradient">
              Features
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-fg/70 mb-2">
            Outcome-based features that help you remember, understand, discover, and connect.
          </p>
          <p className="mx-auto max-w-2xl text-sm text-fg/50">
            What SetuAI will ship in v1, and what&apos;s on deck next.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                <div className={cn(
                  "absolute top-4 right-4 rounded-full px-2.5 py-1 text-xs font-semibold min-w-[90px] text-center",
                  feature.badge === 'MVP'
                    ? "bg-cy text-bg"
                    : "border border-fg/30 bg-transparent text-fg/60"
                )}>
                  {feature.badge}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

