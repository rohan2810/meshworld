'use client'

import { useState } from 'react'
import { Section } from '../_components/Section'
import { MorphingBlob } from '../_components/MorphingBlob'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from '../_components/Icon'
import { cn } from '@/lib/utils'

export function Tech() {
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false)

  return (
    <Section id="tech" aria-labelledby="tech-heading" className="bg-bg/50 overflow-hidden">
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
          className="mb-8 text-center"
        >
          <h2
            id="tech-heading"
            className="mb-4 text-4xl font-bold leading-tight tracking-tight text-fg md:text-5xl"
          >
            What powers your{' '}
            <span className="text-gradient">
              AI twin
            </span>
            ?
          </h2>
        </motion.div>

        {/* Simple Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto max-w-3xl"
        >
          <ul className="mb-6 space-y-3 text-lg text-fg/80">
            <li className="flex items-start gap-3">
              <span className="mt-1 text-cy">•</span>
              <span>Embeddings + graphs connect your places, moods, and notes into patterns.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-cy">•</span>
              <span>Your AI twin uses these patterns to answer nuanced questions about your life.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-cy">•</span>
              <span>All of this is tied to your account, with clear controls over what&apos;s stored and shared.</span>
            </li>
          </ul>
        </motion.div>

        {/* Technical Overview Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto max-w-3xl"
        >
          <button
            onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
            className="flex w-full items-center justify-between rounded-lg border border-fg/20 bg-bg/50 p-4 text-left transition-all hover:bg-fg/5"
          >
            <span className="text-sm font-medium text-fg/70">View technical overview</span>
            <ChevronDown
              className={cn(
                'h-5 w-5 text-fg/50 transition-transform',
                showTechnicalDetails && 'rotate-180'
              )}
            />
          </button>

          <AnimatePresence>
            {showTechnicalDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-4 space-y-2 rounded-lg border border-fg/10 bg-bg/30 p-6 text-sm text-fg/70">
                  <div>
                    <strong className="text-fg/90">Data:</strong> Timeline/places data from Google Maps or check-ins.
                  </div>
                  <div>
                    <strong className="text-fg/90">Storage:</strong> Vector store + graph DB.
                  </div>
                  <div>
                    <strong className="text-fg/90">Intelligence:</strong> LLM routing for search, reflection, and planning.
                  </div>
                  <div>
                    <strong className="text-fg/90">Twin-to-twin:</strong> Preference embeddings for co-recommendations.
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </Section>
  )
}

