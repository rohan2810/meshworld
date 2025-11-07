'use client'

import React, { useState, useEffect } from 'react'
import { Section } from '../_components/Section'
import { MobileAppPreview, ChatScreen, LocationCaptureScreen, EventCaptureScreen } from '../_components/MobileAppPreview'
import { DigitalTwinVisualization } from '../_components/DigitalTwinVisualization'
import { FloatingParticles } from '../_components/FloatingParticles'
import { MorphingBlob } from '../_components/MorphingBlob'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

// Controlled version of MobileAppPreview for step 1
function ControlledMobilePreview({ screens, activeScreen }: { screens: Array<{ id: string; title: string; description: string; mockup: React.ReactNode }>, activeScreen: number }) {
  return (
    <div className="relative">
      <div className="relative mx-auto w-[280px] md:w-[320px]">
        <div className="relative rounded-[3rem] border-[8px] border-gray-900 bg-gray-900 p-2 shadow-2xl">
          <div className="absolute left-1/2 top-0 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-gray-900" />
          <div className="relative overflow-hidden rounded-[2rem] bg-gray-950">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeScreen}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="h-[600px] w-full"
              >
                {screens[activeScreen]?.mockup}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mx-auto mt-2 h-1 w-32 rounded-full bg-white/30" />
        </div>
        <div className="mt-6 flex justify-center gap-2">
          {screens.map((_, index) => (
            <div
              key={index}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                index === activeScreen ? 'w-8 bg-cy' : 'w-2 bg-fg/30'
              )}
            />
          ))}
        </div>
      </div>
      <div className="mt-8 text-center">
        <h3 className="mb-2 text-xl font-semibold text-fg">
          {screens[activeScreen]?.title}
        </h3>
        <p className="text-sm text-fg/70">{screens[activeScreen]?.description}</p>
      </div>
    </div>
  )
}

// Controlled version of TwinInteractionDemo for step 4
function ControlledTwinDemo({ stage }: { stage: number }) {
  const user1 = {
    name: 'Sarah',
    color: 'from-cyan-400 to-blue-500',
    preferences: [
      { label: 'Vegetarian', icon: '🥗', weight: 0.9 },
      { label: 'Waterfront', icon: '🌊', weight: 0.85 },
      { label: 'Cozy ambience', icon: '🕯️', weight: 0.8 },
      { label: 'Live music', icon: '🎵', weight: 0.7 },
    ],
  }

  const user2 = {
    name: 'Alex',
    color: 'from-violet-400 to-purple-500',
    preferences: [
      { label: 'Italian cuisine', icon: '🍝', weight: 0.9 },
      { label: 'Outdoor seating', icon: '☀️', weight: 0.85 },
      { label: 'Live music', icon: '🎵', weight: 0.9 },
      { label: 'Wine selection', icon: '🍷', weight: 0.75 },
    ],
  }

  const sharedPreferences = [
    { label: 'Live music', icon: '🎵', match: 95 },
    { label: 'Relaxed atmosphere', icon: '✨', match: 85 },
    { label: 'Outdoor/waterfront', icon: '🌊', match: 80 },
  ]

  const recommendation = {
    name: 'Marea Coastal Kitchen',
    description: 'Waterfront Italian restaurant with live jazz, extensive vegetarian options, and outdoor terrace',
    match: 92,
    reasons: [
      'Vegetarian-friendly Italian menu',
      'Waterfront outdoor seating',
      'Live jazz every evening',
      'Cozy, romantic ambience',
    ],
  }

  return (
    <div className="relative mx-auto max-w-5xl">
      <AnimatePresence mode="wait">
        {stage === 0 && (
          <motion.div
            key="users"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid gap-6 md:grid-cols-2"
          >
            {[user1, user2].map((user, idx) => (
              <div key={user.name} className="glass rounded-2xl border border-fg/10 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className={cn('h-12 w-12 rounded-full bg-gradient-to-br', user.color)} />
                  <div>
                    <h3 className="text-xl font-semibold text-fg">{user.name}</h3>
                    <p className="text-sm text-fg/60">Digital Twin</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-fg/70 uppercase">Preferences</p>
                  {user.preferences.map((pref) => (
                    <div key={pref.label} className="flex items-center justify-between rounded-lg bg-fg/5 p-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{pref.icon}</span>
                        <span className="text-sm text-fg/80">{pref.label}</span>
                      </div>
                      <div className="h-2 w-16 overflow-hidden rounded-full bg-fg/10">
                        <motion.div
                          className={cn('h-full bg-gradient-to-r', user.color)}
                          initial={{ width: 0 }}
                          animate={{ width: `${pref.weight * 100}%` }}
                          transition={{ delay: 0.5 + idx * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {stage === 1 && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="glass rounded-2xl border border-fg/10 p-12 text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="mx-auto mb-6 h-20 w-20 rounded-full bg-gradient-to-r from-cy via-vi to-am opacity-50"
            />
            <h3 className="mb-4 text-2xl font-bold text-fg">AI Analyzing Preferences...</h3>
            <div className="mx-auto max-w-md space-y-2">
              {['Comparing taste profiles', 'Finding common interests', 'Calculating compatibility scores', 'Searching restaurant database'].map((text, i) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="flex items-center gap-2 text-sm text-fg/70"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    className="h-2 w-2 rounded-full bg-cy"
                  />
                  {text}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {stage === 2 && (
          <motion.div
            key="shared"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass rounded-2xl border border-fg/10 p-8"
          >
            <h3 className="mb-6 text-center text-2xl font-bold text-fg">
              <span className="text-gradient">Shared Preferences</span> Discovered
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              {sharedPreferences.map((pref, i) => (
                <motion.div
                  key={pref.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.2 }}
                  className="rounded-xl bg-gradient-to-br from-cy/20 to-vi/20 p-4 text-center"
                >
                  <div className="mb-2 text-4xl">{pref.icon}</div>
                  <p className="mb-2 font-medium text-fg">{pref.label}</p>
                  <div className="flex items-center justify-center gap-2">
                    <div className="text-2xl font-bold text-cy">{pref.match}%</div>
                    <span className="text-xs text-fg/60">match</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {stage === 3 && (
          <motion.div
            key="recommendation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass rounded-2xl border-2 border-cy/30 bg-gradient-to-br from-cy/10 to-vi/10 p-8"
          >
            <div className="mb-4 flex items-start justify-between">
              <div className="flex-1">
                <div className="mb-2 inline-block rounded-full bg-cy/20 px-3 py-1 text-xs font-semibold text-cy">
                  Perfect Match
                </div>
                <h3 className="mb-2 text-3xl font-bold text-fg">{recommendation.name}</h3>
                <p className="text-fg/70">{recommendation.description}</p>
              </div>
              <div className="flex flex-col items-center rounded-xl bg-cy/20 px-4 py-3">
                <div className="text-4xl font-bold text-cy">{recommendation.match}%</div>
                <div className="text-xs text-fg/60">Match Score</div>
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <p className="text-sm font-semibold text-fg/70 uppercase">Why this works:</p>
              <div className="grid gap-2 md:grid-cols-2">
                {recommendation.reasons.map((reason, i) => (
                  <motion.div
                    key={reason}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-2 rounded-lg bg-fg/5 p-2"
                  >
                    <div className="h-2 w-2 rounded-full bg-cy" />
                    <span className="text-sm text-fg/80">{reason}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="mt-6 flex justify-center gap-2">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              'h-2 rounded-full transition-all duration-300',
              stage === i ? 'w-8 bg-cy' : 'w-2 bg-fg/30'
            )}
          />
        ))}
      </div>
    </div>
  )
}

const steps = [
  {
    id: 'capture',
    step: 1,
    title: 'Capture',
    subtitle: '',
    description: 'Two ways to capture: Location-based (Google Maps Timeline or "I\'m here" check-ins) or Event-based (calendar-triggered reflection prompts after events).',
    payoff: 'Your experiences become nodes in a private memory graph.',
    color: 'cy',
    visual: 'mobile-dual',
    mobileScreens: [<LocationCaptureScreen key="location" />, <EventCaptureScreen key="event" />],
    screenTitles: ['Location-Based', 'Event-Based'],
  },
  {
    id: 'learn',
    step: 2,
    title: 'Learn',
    subtitle: '',
    description: 'SetuAI learns what you enjoy — quiet cafés, sunset walks, art events, solo vs social time — without you doing manual tracking.',
    payoff: 'SetuAI builds a private model of what you enjoy from your logs.',
    color: 'vi',
    visual: 'graph',
    showLearning: true,
  },
  {
    id: 'reflect',
    step: 3,
    title: 'Reflect',
    subtitle: '',
    description: 'Ask your AI twin questions like "Where do I feel most relaxed?" or "What weekends made me happiest?" and get answers grounded in your real life.',
    payoff: 'Ask natural questions about your life and get evidence-backed answers.',
    color: 'am',
    visual: 'mobile',
    mobileScreen: <ChatScreen />,
  },
  {
    id: 'connect',
    step: 4,
    title: 'Connect',
    subtitle: '',
    description: 'Link with a friend (opt-in only). Our system finds overlaps in your preferences and suggests plans you\'ll both actually like.',
    payoff: 'Blend twins with people you trust for co-plans that fit everyone.',
    color: 'cy',
    visual: 'graph',
    showConnection: true,
  },
]

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)
  const [subStep, setSubStep] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Get sub-step count for current step
  const getSubStepCount = (stepIndex: number) => {
    const step = steps[stepIndex]
    if (step.visual === 'mobile-dual' && step.mobileScreens) {
      return step.mobileScreens.length // Step 1: 2 screens
    }
    if (step.showConnection) {
      return 4 // Step 4: 4 connection stages
    }
    return 1 // Other steps: no sub-steps
  }

  // Reset sub-step when main step changes
  useEffect(() => {
    setSubStep(0)
  }, [activeStep])

  // Auto-cycle through steps and sub-steps
  useEffect(() => {
    if (isPaused) return

    const subStepCount = getSubStepCount(activeStep)
    const subStepDuration = 3000 // 3 seconds per sub-step
    
    // Advance to next sub-step OR next main step
    const advance = () => {
      const currentSubStep = subStep
      const nextSubStep = currentSubStep + 1
      
      if (nextSubStep >= subStepCount) {
        // Last sub-step completed, move to next main step
        setActiveStep((prev) => (prev + 1) % steps.length)
        // Don't set subStep here - the other useEffect will reset it to 0
      } else {
        // More sub-steps remaining in current step
        setSubStep(nextSubStep)
      }
    }
    
    // Wait for the current sub-step duration, then advance
    const timerId = setTimeout(advance, subStepDuration)
    
    return () => clearTimeout(timerId)
  }, [isPaused, activeStep, subStep])

  return (
    <Section id="how-it-works" aria-labelledby="how-it-works-heading" className="bg-bg/50 gradient-mesh overflow-hidden">
      <FloatingParticles />
      <div className="absolute top-20 right-20">
        <MorphingBlob color="am" size="md" />
      </div>
      <div className="absolute bottom-20 left-20">
        <MorphingBlob color="cy" size="sm" />
      </div>
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
            id="how-it-works-heading"
            className="mb-4 text-4xl font-bold leading-tight tracking-tight text-fg md:text-5xl"
          >
            How it{' '}
            <span className="text-gradient">works</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-fg/70">
            Four simple steps to transform your experiences into a private memory graph
          </p>
        </motion.div>

        {/* Static Step Overview - All 4 Steps Visible */}
        <div className="mb-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={cn(
                "rounded-xl border p-4 transition-all cursor-pointer",
                activeStep === index 
                  ? "border-cy/50 bg-cy/5 shadow-lg shadow-cy/10" 
                  : "border-fg/20 bg-bg/30 hover:border-fg/30"
              )}
              onClick={() => {
                setActiveStep(index)
                setIsPaused(true)
              }}
            >
              <div className={cn(
                "mb-2 inline-block rounded-full px-2.5 py-1 text-xs font-semibold",
                step.color === 'cy' && 'bg-cy/20 text-cy',
                step.color === 'vi' && 'bg-vi/20 text-vi',
                step.color === 'am' && 'bg-am/20 text-am',
              )}>
                Step {step.step}
              </div>
              <h3 className="text-lg font-bold text-fg mb-1">{step.title}</h3>
              {step.payoff && (
                <p className="text-xs text-fg/60 leading-snug">{step.payoff}</p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mb-8 relative">
          <div className="relative max-w-2xl mx-auto mb-4">
            {/* Background track */}
            <div className="h-1.5 rounded-full bg-fg/10" />
            {/* Progress fill */}
            <motion.div
              className="absolute top-0 left-0 h-1.5 rounded-full bg-gradient-to-r from-cy via-vi to-am"
              initial={{ width: '0%' }}
              animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
            {/* Step markers */}
            <div className="absolute top-0 left-0 w-full h-full flex">
              {steps.map((step, index) => (
                <div key={step.id} className="flex-1 relative">
                  {index < steps.length - 1 && (
                    <div className={cn(
                      'absolute top-1/2 -right-0.5 w-1 h-1 rounded-full -translate-y-1/2 transition-all duration-300',
                      index < activeStep ? 'bg-vi scale-150' : 'bg-fg/20'
                    )} />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-fg/5 hover:bg-fg/10 text-sm text-fg/70 hover:text-fg transition-all border border-fg/10"
              aria-label={isPaused ? 'Play animation' : 'Pause animation'}
            >
              {isPaused ? (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                  <span>Play</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>Pause</span>
                </>
              )}
            </button>
            <div className="text-xs text-fg/50 font-medium">
              {(() => {
                const step = steps[activeStep]
                const subStepCount = getSubStepCount(activeStep)
                if (subStepCount > 1) {
                  if (step.visual === 'mobile-dual') {
                    const screenTitles = step.screenTitles || []
                    return `${screenTitles[subStep] || step.title} • ${subStep + 1}/${subStepCount}`
                  }
                  if (step.showConnection) {
                    const stageLabels = ['Users', 'Analyzing', 'Shared', 'Recommendation']
                    return `${stageLabels[subStep]} • ${subStep + 1}/${subStepCount}`
                  }
                }
                return `${step.title} • Step ${activeStep + 1} of ${steps.length}`
              })()}
            </div>
          </div>
        </div>

        {/* Active Step Content */}
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 items-center">
          <AnimatePresence mode="wait">
            {/* Text Content */}
            <motion.div
              key={`text-${activeStep}`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="space-y-6"
            >
              <div>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className={cn(
                    'mb-4 inline-block rounded-full px-4 py-2 text-sm font-medium',
                    steps[activeStep].color === 'cy' && 'bg-cy/10 text-cy',
                    steps[activeStep].color === 'vi' && 'bg-vi/10 text-vi',
                    steps[activeStep].color === 'am' && 'bg-am/10 text-am',
                  )}
                >
                  Step {steps[activeStep].step}
                </motion.div>
                <motion.h3
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="mb-4 text-3xl font-bold text-fg md:text-4xl"
                >
                  <span className="text-gradient">Step {steps[activeStep].step} — {steps[activeStep].title}</span>
                </motion.h3>
                <motion.p
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-lg text-fg/70 leading-relaxed mb-3"
                >
                  {steps[activeStep].description}
                </motion.p>
                {steps[activeStep].payoff && (
                  <motion.p
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="text-base font-medium text-cy/90"
                  >
                    {steps[activeStep].payoff}
                  </motion.p>
                )}
              </div>
            </motion.div>

            {/* Visual */}
            <motion.div
              key={`visual-${activeStep}`}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="flex flex-col items-center min-h-[700px] justify-center"
            >
              {steps[activeStep].visual === 'mobile-dual' && steps[activeStep].mobileScreens ? (
                <div className="w-full">
                  <ControlledMobilePreview
                    screens={steps[activeStep].mobileScreens.map((screen, idx) => ({
                      id: `${steps[activeStep].id}-${idx}`,
                      title: steps[activeStep].screenTitles?.[idx] || steps[activeStep].title,
                      description: idx === 0 
                        ? 'Auto-import from Google Maps or tap "I\'m here" to check in'
                        : 'Calendar-triggered reflection prompts after events end',
                      mockup: screen,
                    }))}
                    activeScreen={subStep}
                  />
                </div>
              ) : steps[activeStep].visual === 'mobile' && steps[activeStep].mobileScreen ? (
                <MobileAppPreview
                  screens={[
                    {
                      id: steps[activeStep].id,
                      title: steps[activeStep].title,
                      description: steps[activeStep].description,
                      mockup: steps[activeStep].mobileScreen,
                    },
                  ]}
                />
              ) : steps[activeStep].showConnection ? (
                <div className="w-full">
                  <ControlledTwinDemo stage={subStep} />
                </div>
              ) : (
                <div className="relative h-[500px] w-full max-w-2xl rounded-2xl bg-gradient-to-br from-vi/10 to-am/10 p-8 glass">
                  <DigitalTwinVisualization
                    showLearning={steps[activeStep].showLearning}
                    showConnection={false}
                    twinCount={1}
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  )
}

