'use client'

import { Section } from '../_components/Section'
import { FeatureCard } from '../_components/FeatureCard'
import { AnimatedCounter } from '../_components/AnimatedCounter'
import { MorphingBlob } from '../_components/MorphingBlob'
import { Icon, GraphIcon, MultimodalIcon, PrivacyIcon } from '../_components/Icon'
import { motion } from 'framer-motion'

export function Tech() {
  const technologies = [
    {
      title: 'Graph Intelligence',
      description:
        'Neo4j or Weaviate stores nodes (experiences) and edges (relations). Every experience is a node, every connection tells a story.',
      icon: (
        <Icon>
          <GraphIcon />
        </Icon>
      ),
    },
    {
      title: 'Multimodal AI',
      description:
        'OpenAI API for LLM + embeddings, Hugging Face for emotion detection. Processes text, images, voice, and emotion.',
      icon: (
        <Icon>
          <MultimodalIcon />
        </Icon>
      ),
    },
    {
      title: 'Privacy by Design',
      description:
        'Postgres + Weaviate (vector) + Neo4j (graph). User-owned encryption with a roadmap to local-first architecture.',
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
            Built on the{' '}
            <span className="text-gradient">
              new stack
            </span>{' '}
            of understanding
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-fg/70">
            Built with React Native (mobile-first), FastAPI/Node.js backend, and cutting-edge AI
            that respects your privacy.
          </p>
        </motion.div>

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 grid gap-6 md:grid-cols-3"
        >
          {[
            { value: 7000, suffix: '+', label: 'Experiences Captured', icon: '📍' },
            { value: 12, suffix: ' months', label: 'Of Data', icon: '📅' },
            { value: 1000, suffix: '+', label: 'AI Queries', icon: '💬' },
          ].map((metric) => (
            <div
              key={metric.label}
              className="glass-cy rounded-xl p-6 text-center"
            >
              <div className="mb-3 text-3xl">{metric.icon}</div>
              <div className="mb-2 text-4xl font-bold text-cy">
                <AnimatedCounter end={metric.value} suffix={metric.suffix} />
              </div>
              <h3 className="text-sm font-semibold text-fg">{metric.label}</h3>
            </div>
          ))}
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

