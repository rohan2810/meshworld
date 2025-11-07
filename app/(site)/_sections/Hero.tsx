'use client'

import { useState, useEffect } from 'react'
import { Button } from '../_components/Button'
import { VideoBackground } from '../_components/VideoBackground'
import { FloatingParticles } from '../_components/FloatingParticles'
import { MorphingBlob } from '../_components/MorphingBlob'
import { ChevronDown } from '../_components/Icon'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { Container } from '../_components/Container'

const headlines = [
  { text: 'Your life,', highlight: 'mapped and understood.' },
  { text: 'Turn your experiences', highlight: 'into intelligence.' },
  { text: 'Your experiences,', highlight: 'finally connected.' },
  { text: "Every place you've been. Every moment", highlight: 'that matters.' },
]

function RotatingHeadline() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % headlines.length)
    }, 4000) // Change every 4 seconds

    return () => clearInterval(interval)
  }, [shouldReduceMotion])

  const currentHeadline = headlines[currentIndex]

  return (
    <span className="inline-block">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="inline-block"
        >
          {currentHeadline.text}{' '}
          <span className="text-gradient">{currentHeadline.highlight}</span>
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export function Hero() {
  const shouldReduceMotion = useReducedMotion()

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center snap-section overflow-hidden"
      aria-label="Hero section"
    >
      {/* Video Background */}
      <VideoBackground
        src="/video/hero-loop.mp4"
        poster="/img/hero-poster.jpg"
        overlayOpacity={0.7}
        className="absolute inset-0"
      />
      
      {/* Enhanced Background Effects */}
      <FloatingParticles />
      <div className="absolute top-1/4 left-1/4 opacity-70">
        <MorphingBlob color="cy" size="lg" />
      </div>
      <div className="absolute bottom-1/4 right-1/4 opacity-60">
        <MorphingBlob color="vi" size="md" />
      </div>
      <div className="grid-background" />

      {/* Content */}
      <Container className="relative z-10 py-8 sm:py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            className="text-center lg:text-left"
          >
            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              transition={{ duration: 0.8 }}
              className="mb-4 text-3xl font-bold leading-tight tracking-tight text-fg sm:text-4xl md:text-5xl lg:text-6xl px-4 sm:px-0"
            >
              <RotatingHeadline />
            </motion.h1>

            {/* Subhead */}
            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6 text-lg font-medium text-fg/90 sm:text-xl md:text-2xl px-4 sm:px-0 max-w-3xl"
            >
              Bridging your real-world experiences into an AI twin that remembers with you, recommends better, and plans with the people you trust.
            </motion.p>

            {/* Bullets */}
            <motion.ul
              variants={fadeInUp}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-8 space-y-2.5 text-left px-4 sm:px-0"
            >
              <li className="flex items-start gap-3 text-base sm:text-lg text-fg/80 leading-snug">
                <span className="mt-1 text-cy">✓</span>
                <span>Never lose track of spots you loved.</span>
              </li>
              <li className="flex items-start gap-3 text-base sm:text-lg text-fg/80 leading-snug">
                <span className="mt-1 text-cy">✓</span>
                <span>Get recommendations based on your real life, not ads.</span>
              </li>
              <li className="flex items-start gap-3 text-base sm:text-lg text-fg/80 leading-snug">
                <span className="mt-1 text-cy">✓</span>
                <span>Plan hangouts and trips around shared tastes.</span>
              </li>
            </motion.ul>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col items-center lg:items-start gap-4 sm:flex-row px-4 sm:px-0"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className="w-full sm:w-auto"
              >
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => scrollToSection('cta')}
                  className="w-full sm:min-w-[200px] shadow-2xl shadow-cy/50"
                >
                  Join the waitlist
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className="w-full sm:w-auto"
              >
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => scrollToSection('how-it-works')}
                  className="w-full sm:min-w-[200px]"
                >
                  See how it works
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right: Product Mock */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-sm rounded-2xl border border-fg/20 bg-bg/50 p-6 backdrop-blur-sm shadow-2xl">
              {/* Concept UI Label */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-fg/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-fg/50 font-medium">
                Concept UI
              </div>
              
              {/* Map/Location List */}
              <div className="mb-4 space-y-2">
                <div className="flex items-center gap-3 rounded-lg bg-fg/5 p-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cy to-vi flex items-center justify-center text-lg">
                    📍
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-fg">Café Luna</div>
                    <div className="text-xs text-fg/60">2h ago • Relaxed</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-fg/5 p-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-vi to-am flex items-center justify-center text-lg">
                    🌊
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-fg">Beach Park</div>
                    <div className="text-xs text-fg/60">Yesterday • Happy</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-fg/5 p-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-am to-cy flex items-center justify-center text-lg">
                    🎨
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-fg">Art Gallery</div>
                    <div className="text-xs text-fg/60">3 days ago • Focused</div>
                  </div>
                </div>
              </div>

              {/* Mood Tag Chips */}
              <div className="mb-4 flex flex-wrap gap-2">
                {['Relaxed', 'Waterfront', 'Quiet', 'Weekend'].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-cy/20 px-3 py-1 text-xs text-cy"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* AI Chat Bubble */}
              <div className="rounded-xl bg-gradient-to-br from-cy/20 to-vi/10 p-4 border border-cy/30">
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-br from-cy to-vi" />
                  <span className="text-xs font-medium text-fg/70">Your AI Twin</span>
                </div>
                <p className="text-sm text-fg/80 leading-relaxed">
                  Most of your happiest moments are near the water. Here are 3 new places you&apos;d love this month.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Scroll Indicator */}
      <motion.button
        onClick={() => scrollToSection('problem')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-fg/50 transition-colors hover:text-cy focus-visible:text-cy"
        aria-label="Scroll to next section"
      >
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <ChevronDown className="h-8 w-8" />
        </motion.div>
      </motion.button>
    </section>
  )
}

