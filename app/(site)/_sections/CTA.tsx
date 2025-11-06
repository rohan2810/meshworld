'use client'

import { Section } from '../_components/Section'
import { WaitlistForm } from '../_components/WaitlistForm'
import { FloatingParticles } from '../_components/FloatingParticles'
import { MorphingBlob } from '../_components/MorphingBlob'
import { motion } from 'framer-motion'

export function CTA() {
  return (
    <Section id="cta" aria-labelledby="cta-heading" className="bg-bg overflow-hidden" fullScreen>
      {/* Background effects */}
      <FloatingParticles />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <MorphingBlob color="cy" size="lg" />
      </div>
      <div className="absolute top-10 left-10">
        <MorphingBlob color="vi" size="sm" />
      </div>
      <div className="absolute bottom-10 right-10">
        <MorphingBlob color="am" size="sm" />
      </div>
      <div className="grid-background" aria-hidden="true" />

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
            id="cta-heading"
            className="mb-6 text-4xl font-bold leading-tight tracking-tight text-fg md:text-5xl"
          >
            Be among the{' '}
            <span className="text-gradient">
              first to explore
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-fg/70">
            Join our waitlist to get early access when we launch. Help shape the future of personal
            intelligence.
          </p>
        </motion.div>

        {/* Waitlist Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <WaitlistForm />
        </motion.div>
      </div>
    </Section>
  )
}

