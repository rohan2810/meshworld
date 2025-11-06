'use client'

import { useState } from 'react'
import { Section } from '../_components/Section'
import { MobileAppPreview, ChatScreen, LocationCaptureScreen, EventCaptureScreen } from '../_components/MobileAppPreview'
import { DigitalTwinVisualization } from '../_components/DigitalTwinVisualization'
import { TwinInteractionDemo } from '../_components/TwinInteractionDemo'
import { FloatingParticles } from '../_components/FloatingParticles'
import { MorphingBlob } from '../_components/MorphingBlob'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const steps = [
  {
    id: 'capture',
    step: 1,
    title: 'Capture',
    subtitle: 'Your experiences',
    description: 'Two ways to capture: Location-based (Google Maps Timeline or "I\'m here" check-ins) or Event-based (calendar-triggered reflection prompts after events).',
    color: 'cy',
    visual: 'mobile-dual',
    mobileScreens: [<LocationCaptureScreen key="location" />, <EventCaptureScreen key="event" />],
    screenTitles: ['Location-Based', 'Event-Based'],
  },
  {
    id: 'learn',
    step: 2,
    title: 'Learn',
    subtitle: 'Your digital twin evolves',
    description: 'As you capture experiences, AI agents analyze patterns, preferences, and emotional responses. Your digital twin builds a living understanding of what resonates with you—identifying hidden connections between places, people, and moments.',
    color: 'vi',
    visual: 'graph',
    showLearning: true,
  },
  {
    id: 'reflect',
    step: 3,
    title: 'Reflect',
    subtitle: 'Your AI companion',
    description: 'Chat with your intelligent agent that knows your history. Ask "What restaurants do I love?" or "Plan a weekend I\'d enjoy." Get personalized insights, rediscover forgotten moments, and receive recommendations tailored to your unique taste.',
    color: 'am',
    visual: 'mobile',
    mobileScreen: <ChatScreen />,
  },
  {
    id: 'connect',
    step: 4,
    title: 'Connect',
    subtitle: 'Digital twins interact',
    description: 'Connect with others. Your twins merge preference graphs and suggest plans both would enjoy.',
    color: 'cy',
    visual: 'graph',
    showConnection: true,
  },
]

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <Section id="how-it-works" aria-labelledby="how-it-works-heading" className="bg-bg/50 gradient-mesh overflow-hidden" fullScreen>
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
          className="mb-12 text-center"
        >
          <h2
            id="how-it-works-heading"
            className="mb-6 text-4xl font-bold leading-tight tracking-tight text-fg md:text-5xl"
          >
            How it{' '}
            <span className="text-gradient">works</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-fg/70">
            Four simple steps to transform your experiences into a living memory graph
          </p>
        </motion.div>

        {/* Step Tabs */}
        <div className="mb-8 sm:mb-12 flex flex-wrap justify-center gap-2 sm:gap-4 px-4 sm:px-0">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(index)}
              className={cn(
                'group relative rounded-full px-4 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-medium transition-all duration-300 min-h-[44px] touch-manipulation',
                activeStep === index
                  ? 'bg-gradient-luminous text-bg shadow-lg shadow-cy/30'
                  : 'glass-cy text-fg/70 hover:text-fg hover:bg-cy/10'
              )}
            >
              <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                <span className="text-[10px] sm:text-xs opacity-70">Step {step.step}</span>
                <span>{step.title}</span>
              </span>
            </button>
          ))}
        </div>

        {/* Active Step Content */}
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 items-center">
          {/* Text Content */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <div className={cn(
                'mb-4 inline-block rounded-full px-4 py-2 text-sm font-medium',
                steps[activeStep].color === 'cy' && 'bg-cy/10 text-cy',
                steps[activeStep].color === 'vi' && 'bg-vi/10 text-vi',
                steps[activeStep].color === 'am' && 'bg-am/10 text-am',
              )}>
                Step {steps[activeStep].step}
              </div>
              <h3 className="mb-4 text-3xl font-bold text-fg md:text-4xl">
                <span className="text-gradient">{steps[activeStep].title}</span>{' '}
                {steps[activeStep].subtitle}
              </h3>
              <p className="text-lg text-fg/70 leading-relaxed">
                {steps[activeStep].description}
              </p>
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            key={`visual-${activeStep}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            {steps[activeStep].visual === 'mobile-dual' && steps[activeStep].mobileScreens ? (
              <MobileAppPreview
                screens={steps[activeStep].mobileScreens.map((screen, idx) => ({
                  id: `${steps[activeStep].id}-${idx}`,
                  title: steps[activeStep].screenTitles?.[idx] || steps[activeStep].title,
                  description: idx === 0 
                    ? 'Auto-import from Google Maps or tap "I\'m here" to check in'
                    : 'Calendar-triggered reflection prompts after events end',
                  mockup: screen,
                }))}
              />
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
                <TwinInteractionDemo />
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
        </div>

        {/* Step Indicators */}
        <div className="mt-12 flex justify-center gap-2">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                activeStep === index ? 'w-8 bg-cy' : 'w-2 bg-fg/30 hover:bg-fg/50'
              )}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}

