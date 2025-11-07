'use client'

import { useState, useEffect } from 'react'
import { Button } from '../_components/Button'
import { VideoBackground } from '../_components/VideoBackground'
import { FloatingParticles } from '../_components/FloatingParticles'
import { MorphingBlob } from '../_components/MorphingBlob'
import { ChevronDown } from '../_components/Icon'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { Container } from '../_components/Container'

const rotatingTexts = [
  'digital twin',
  'living memory',
  'intelligent companion',
  'experience graph',
]

function RotatingText() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % rotatingTexts.length)
    }, 3000) // Change every 3 seconds

    return () => clearInterval(interval)
  }, [shouldReduceMotion])

  return (
    <span className="text-gradient glow-cy inline-block min-w-[200px] sm:min-w-[280px] md:min-w-[320px] text-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="inline-block"
        >
          {rotatingTexts[currentIndex]}
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
      <Container className="relative z-10 py-20 sm:py-24 md:py-32">
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="mx-auto max-w-4xl text-center"
        >
          {/* Headline */}
          <motion.h1
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
            className="mb-6 text-3xl font-bold leading-tight tracking-tight text-fg sm:text-4xl md:text-5xl lg:text-7xl px-4 sm:px-0"
          >
            Transform your real-world experiences into a{' '}
            <RotatingText />
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12 text-lg text-fg/80 sm:text-xl md:text-2xl px-4 sm:px-0"
          >
            Powered by an AI agent that helps you reflect, plan, and connect.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
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
                Join Waitlist
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
                See How It Works
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
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

