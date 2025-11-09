'use client'

import { Section } from '../_components/Section'
import { WaitlistForm } from '../_components/WaitlistForm'
import { FloatingParticles } from '../_components/FloatingParticles'
import { MorphingBlob } from '../_components/MorphingBlob'
import { motion } from 'framer-motion'

export function CTA() {
  return (
    <Section id="cta" aria-labelledby="cta-heading" className="bg-bg overflow-hidden">
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

      <div className="relative space-y-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h2
            id="cta-heading"
            className="mb-4 text-3xl font-bold leading-tight tracking-tight text-fg md:text-4xl"
          >
            Get{' '}
            <span className="text-gradient">
              early access
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-fg/70">
            Join the waitlist to help shape SetuAI and be the first to try the beta.
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

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto max-w-xl text-center rounded-xl border border-fg/20 bg-bg/50 p-4 backdrop-blur-sm"
        >
          <p className="mb-1 text-sm text-fg/80">
            Building with friends, creatives, and planners who want real context.
          </p>
          <p className="text-sm text-fg/70">
            Say hi:{' '}
            <a
              href="mailto:hello@setuai.com"
              className="font-medium text-cy transition-colors hover:text-cy/80"
            >
              hello@setuai.com
            </a>
          </p>
        </motion.div>
      </div>
    </Section>
  )
}

