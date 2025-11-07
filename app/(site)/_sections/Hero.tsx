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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % headlines.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const currentHeadline = headlines[currentIndex]

  return (
    <span className="block text-4xl font-bold leading-tight tracking-tight text-fg md:text-6xl lg:text-7xl">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.5,
            ease: 'easeInOut',
          }}
          className="block"
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
        src="/video/hero-bg.mp4"
        poster="/img/hero-poster.jpg"
        className="absolute inset-0 z-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-bg/20 via-bg/40 to-bg/60 backdrop-blur-[1px]" />

      {/* Floating Elements */}
      <div className="absolute inset-0 z-20">
        <FloatingParticles count={shouldReduceMotion ? 0 : 15} />
        <MorphingBlob color="cy" size="xl" />
        <MorphingBlob color="vi" size="lg" />
        <MorphingBlob color="am" size="md" />
      </div>

      <Container className="relative z-30 grid h-full items-center gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Left Column - Text Content */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerChildren}
          className="text-center lg:text-left"
        >
          {/* Headline with rotating text */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <RotatingHeadline />
          </motion.div>

          {/* Subheading */}
          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-8 text-base sm:text-lg text-fg/80 leading-relaxed max-w-2xl mx-auto lg:mx-0"
          >
            Bridging your real-world experiences into an AI twin
            that remembers with you, recommends better, and
            plans with the people you trust.
          </motion.p>

          {/* Bullet Points */}
          <motion.ul
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8 space-y-2.5 text-left px-4 sm:px-0"
          >
            <li className="flex items-start gap-3 text-base sm:text-lg text-fg/80 leading-snug">
              <span className="mt-1 text-cy">✓</span>
              <span>Transform your everyday places into lasting memories</span>
            </li>
            <li className="flex items-start gap-3 text-base sm:text-lg text-fg/80 leading-snug">
              <span className="mt-1 text-cy">✓</span>
              <span>Discover new favorites based on your actual experiences</span>
            </li>
            <li className="flex items-start gap-3 text-base sm:text-lg text-fg/80 leading-snug">
              <span className="mt-1 text-cy">✓</span>
              <span>Connect meaningfully through shared experiences & moments</span>
            </li>
          </motion.ul>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-cy via-vi to-am text-bg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Join the waitlist
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection('how-it-works')}
              className="border-cy/50 text-cy hover:bg-cy/10 transition-colors duration-300"
            >
              See how it works
            </Button>
          </motion.div>
        </motion.div>

        {/* Right Column - Preview */}
        <div className="flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-sm rounded-2xl border border-fg/20 bg-bg/50 p-6 backdrop-blur-sm shadow-2xl">
              {/* Preview Badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-vi/20 to-am/20 border border-vi/30 px-3 py-1 text-[11px] uppercase tracking-wider text-vi font-semibold backdrop-blur-sm">
                🧠 Your AI Twin
              </div>
              
              {/* Stats Header */}
              <div className="mb-4 grid grid-cols-3 gap-2 rounded-lg bg-gradient-to-r from-cy/5 to-vi/5 p-3 border border-cy/20">
                <div className="text-center">
                  <div className="text-lg font-bold text-cy">47</div>
                  <div className="text-[9px] text-fg/60 uppercase tracking-wide">Places</div>
                </div>
                <div className="text-center border-x border-fg/10">
                  <div className="text-lg font-bold text-vi">128</div>
                  <div className="text-[9px] text-fg/60 uppercase tracking-wide">Memories</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-am">23</div>
                  <div className="text-[9px] text-fg/60 uppercase tracking-wide">Insights</div>
                </div>
              </div>

              {/* Recent Places */}
              <div className="mb-4">
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-fg">Recent Places</h4>
                  <div className="h-1 w-1 rounded-full bg-green-500 animate-pulse"></div>
                </div>
                <div className="space-y-2">
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
              </div>

              {/* Pattern Detection */}
              <div className="mb-4">
                <div className="mb-2 flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-fg">Patterns</h4>
                  <div className="flex gap-1">
                    <div className="h-1 w-1 rounded-full bg-cy animate-pulse"></div>
                    <div className="h-1 w-1 rounded-full bg-vi animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="h-1 w-1 rounded-full bg-am animate-pulse" style={{ animationDelay: '1s' }}></div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['Waterfront', 'Weekend', 'Quiet', 'Relaxed'].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-cy/20 px-2.5 py-1 text-[10px] text-cy font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI Insight */}
              <div className="rounded-xl bg-gradient-to-br from-vi/20 to-am/10 p-3 border border-vi/30">
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-br from-cy to-vi flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-bg animate-pulse"></div>
                  </div>
                  <span className="text-xs font-medium text-fg/70">AI Insight</span>
                  <div className="ml-auto text-xs text-fg/50">Live</div>
                </div>
                <p className="text-xs text-fg/80 leading-relaxed mb-2">
                  "Your waterfront visits spike on weekends when stressed. I found 3 similar spots with better accessibility."
                </p>
                <div className="flex items-center gap-2 text-[10px] text-fg/60">
                  <span className="flex items-center gap-1">
                    <div className="h-1 w-1 rounded-full bg-green-500"></div>
                    87% confidence
                  </span>
                  <span>•</span>
                  <span>Based on 12 visits</span>
                </div>
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