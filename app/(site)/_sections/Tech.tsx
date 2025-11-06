'use client'

import { Section } from '../_components/Section'
import { FeatureCard } from '../_components/FeatureCard'
import { MorphingBlob } from '../_components/MorphingBlob'
import { Icon, GraphIcon, MultimodalIcon, PrivacyIcon } from '../_components/Icon'
import { motion } from 'framer-motion'

export function Tech() {
  const technologies = [
    {
      title: 'Graph Intelligence',
      description:
        'Neural networks map your experiences into a living knowledge graph. Each moment becomes a node, every connection reveals hidden patterns. Your digital twin emerges from this web of memories.',
      icon: (
        <Icon>
          <GraphIcon />
        </Icon>
      ),
    },
    {
      title: 'Multi-Agent AI',
      description:
        'Specialized agents work together: memory agents capture context, preference agents learn your taste, social agents find connections. Large language models power natural conversations with your twin.',
      icon: (
        <Icon>
          <MultimodalIcon />
        </Icon>
      ),
    },
    {
      title: 'Privacy by Design',
      description:
        'Your twin is yours alone. End-to-end encryption protects your data. Agent reasoning happens on your device when possible. You control what you share and with whom.',
      icon: (
        <Icon>
          <PrivacyIcon />
        </Icon>
      ),
    },
  ]

  return (
    <Section id="tech" aria-labelledby="tech-heading" className="bg-bg/50 overflow-hidden" fullScreen>
      {/* Background effects */}
      <div className="absolute top-1/3 right-1/4">
        <MorphingBlob color="am" size="lg" />
      </div>
      <div className="absolute bottom-1/3 left-1/4">
        <MorphingBlob color="vi" size="md" />
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
            id="tech-heading"
            className="mb-6 text-4xl font-bold leading-tight tracking-tight text-fg md:text-5xl"
          >
            Powered by{' '}
            <span className="text-gradient">
              AI agents
            </span>{' '}
            and graph intelligence
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-fg/70">
            Advanced neural architectures, multi-agent reasoning systems, and knowledge graphs work together to understand your experiences, learn your preferences, and connect you with others through your digital twins.
          </p>
        </motion.div>

        {/* Tech Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {technologies.map((tech, index) => (
            <FeatureCard
              key={tech.title}
              title={tech.title}
              description={tech.description}
              icon={tech.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}

