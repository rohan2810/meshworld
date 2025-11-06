'use client'

import { Section } from '../_components/Section'
import { motion, useReducedMotion } from 'framer-motion'

export function Mesh() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <Section id="mesh" aria-labelledby="mesh-heading" className="bg-bg">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="radial-glow h-96 w-96" aria-hidden="true" />
      </div>

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
            id="mesh-heading"
            className="mb-6 text-4xl font-bold leading-tight tracking-tight text-fg md:text-5xl"
          >
            When digital twins{' '}
            <span className="bg-gradient-to-r from-cy via-vi to-am bg-clip-text text-transparent">
              interact
            </span>
            , insights emerge
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-fg/70">
            Your digital twin can connect with others, revealing shared experiences, overlapping
            moments, and deeper understanding across the mesh. The whole becomes greater than the
            sum of its parts.
          </p>
        </motion.div>

        {/* Constellation Visual */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          className="relative mx-auto h-[400px] max-w-3xl"
        >
          <svg
            viewBox="0 0 800 400"
            className="h-full w-full"
            aria-hidden="true"
          >
            {/* Cluster 1 */}
            <motion.circle
              cx="200"
              cy="200"
              r="40"
              fill="url(#gradient1)"
              opacity="0.6"
              animate={shouldReduceMotion ? {} : { scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.circle
              cx="200"
              cy="200"
              r="6"
              fill="#58FFE0"
              animate={shouldReduceMotion ? {} : { scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Cluster 2 */}
            <motion.circle
              cx="600"
              cy="200"
              r="40"
              fill="url(#gradient2)"
              opacity="0.6"
              animate={shouldReduceMotion ? {} : { scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            />
            <motion.circle
              cx="600"
              cy="200"
              r="6"
              fill="#A78BFA"
              animate={shouldReduceMotion ? {} : { scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />

            {/* Cluster 3 */}
            <motion.circle
              cx="400"
              cy="100"
              r="30"
              fill="url(#gradient3)"
              opacity="0.5"
              animate={shouldReduceMotion ? {} : { scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            />
            <motion.circle
              cx="400"
              cy="100"
              r="5"
              fill="#FBBF24"
              animate={shouldReduceMotion ? {} : { scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />

            {/* Connecting lines */}
            <motion.line
              x1="200"
              y1="200"
              x2="600"
              y2="200"
              stroke="url(#lineGradient1)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.5 }}
            />
            <motion.line
              x1="200"
              y1="200"
              x2="400"
              y2="100"
              stroke="url(#lineGradient2)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.7 }}
            />
            <motion.line
              x1="600"
              y1="200"
              x2="400"
              y2="100"
              stroke="url(#lineGradient3)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.9 }}
            />

            {/* Gradients */}
            <defs>
              <radialGradient id="gradient1">
                <stop offset="0%" stopColor="#58FFE0" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#58FFE0" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="gradient2">
                <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#A78BFA" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="gradient3">
                <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#FBBF24" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#58FFE0" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.6" />
              </linearGradient>
              <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#58FFE0" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#FBBF24" stopOpacity="0.5" />
              </linearGradient>
              <linearGradient id="lineGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#FBBF24" stopOpacity="0.5" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>
    </Section>
  )
}

