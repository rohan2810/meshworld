'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Screen {
  id: string
  title: string
  description: string
  mockup: React.ReactNode
}

interface MobileAppPreviewProps {
  screens: Screen[]
  className?: string
}

export function MobileAppPreview({ screens, className }: MobileAppPreviewProps) {
  const [activeScreen, setActiveScreen] = useState(0)

  return (
    <div className={cn('relative', className)}>
      {/* iPhone Frame */}
      <div className="relative mx-auto w-[280px] md:w-[320px]">
        {/* Frame */}
        <div className="relative rounded-[3rem] border-[8px] border-gray-900 bg-gray-900 p-2 shadow-2xl">
          {/* Notch */}
          <div className="absolute left-1/2 top-0 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-gray-900" />
          
          {/* Screen */}
          <div className="relative overflow-hidden rounded-[2rem] bg-gray-950">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeScreen}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-[600px] w-full"
              >
                {screens[activeScreen]?.mockup}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Home Indicator */}
          <div className="mx-auto mt-2 h-1 w-32 rounded-full bg-white/30" />
        </div>

        {/* Screen Navigation Dots */}
        <div className="mt-6 flex justify-center gap-2">
          {screens.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveScreen(index)}
              className={cn(
                'h-2 rounded-full transition-all',
                index === activeScreen ? 'w-8 bg-cy' : 'w-2 bg-fg/30'
              )}
              aria-label={`View ${screens[index].title}`}
            />
          ))}
        </div>
      </div>

      {/* Screen Info */}
      <div className="mt-8 text-center">
        <h3 className="mb-2 text-xl font-semibold text-fg">
          {screens[activeScreen]?.title}
        </h3>
        <p className="text-sm text-fg/70">{screens[activeScreen]?.description}</p>
      </div>
    </div>
  )
}

// Mockup Screen Components
export function CheckInScreen() {
  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-bg to-bg/80 p-6">
      <div className="mb-6">
        <div className="mb-2 h-8 w-32 rounded-lg bg-cy/20" />
        <div className="h-4 w-24 rounded bg-fg/10" />
      </div>
      <div className="mb-4 flex-1 rounded-2xl bg-gradient-to-br from-cy/10 to-vi/10 p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="h-12 w-12 rounded-full bg-cy/30" />
          <div className="h-8 w-20 rounded-full bg-cy" />
        </div>
        <div className="space-y-3">
          <div className="h-4 w-full rounded bg-fg/10" />
          <div className="h-4 w-3/4 rounded bg-fg/10" />
        </div>
      </div>
      <div className="flex gap-3">
        <div className="h-12 flex-1 rounded-xl bg-fg/10" />
        <div className="h-12 w-12 rounded-xl bg-cy/20" />
      </div>
    </div>
  )
}

export function GraphScreen() {
  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-bg to-bg/80 p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="h-6 w-32 rounded bg-fg/10" />
        <div className="h-8 w-8 rounded-full bg-vi/20" />
      </div>
      <div className="relative flex-1 rounded-2xl bg-gradient-to-br from-vi/10 to-am/10 p-6">
        {/* Graph visualization */}
        <svg viewBox="0 0 200 200" className="h-full w-full">
          {Array.from({ length: 15 }).map((_, i) => {
            const angle = (i / 15) * Math.PI * 2
            const radius = 60 + Math.random() * 30
            const x = 100 + Math.cos(angle) * radius
            const y = 100 + Math.sin(angle) * radius
            return (
              <g key={i}>
                <circle cx={x} cy={y} r="4" fill="#A78BFA" opacity="0.8" />
                <line
                  x1="100"
                  y1="100"
                  x2={x}
                  y2={y}
                  stroke="#A78BFA"
                  strokeWidth="1"
                  opacity="0.3"
                />
              </g>
            )
          })}
          <circle cx="100" cy="100" r="6" fill="#58FFE0" />
        </svg>
      </div>
      <div className="mt-4 flex gap-2">
        {['Today', 'Week', 'Month'].map((label) => (
          <div key={label} className="h-8 flex-1 rounded-lg bg-fg/10" />
        ))}
      </div>
    </div>
  )
}

export function ChatScreen() {
  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-bg to-bg/80 p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-cy/30" />
        <div className="flex-1">
          <div className="mb-1 h-4 w-24 rounded bg-fg/20" />
          <div className="h-3 w-16 rounded bg-fg/10" />
        </div>
      </div>
      <div className="flex-1 space-y-4 overflow-y-auto">
        {[
          { text: "Where did I spend most time this month?", isUser: true },
          { text: "Most of your relaxing visits are at cafés near water or parks on weekends.", isUser: false },
          { text: "Find me a dinner spot I'd love", isUser: true },
          { text: "Try Bar Kindred — matches your love for calm ambience and vegetarian cuisine.", isUser: false },
        ].map((msg, i) => (
          <div
            key={i}
            className={cn(
              'flex',
              msg.isUser ? 'justify-end' : 'justify-start'
            )}
          >
            <div
              className={cn(
                'max-w-[80%] rounded-2xl p-3',
                msg.isUser
                  ? 'bg-cy/20 text-fg'
                  : 'bg-fg/10 text-fg/80'
              )}
            >
              <div className="h-4 w-full rounded bg-current/30" />
              <div className="mt-1 h-4 w-3/4 rounded bg-current/20" />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <div className="h-10 flex-1 rounded-full bg-fg/10" />
        <div className="h-10 w-10 rounded-full bg-cy" />
      </div>
    </div>
  )
}

