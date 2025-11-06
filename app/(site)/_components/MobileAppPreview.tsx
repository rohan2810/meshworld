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
  const [checkedIn, setCheckedIn] = useState(false)

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-bg to-bg/80">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-fg/10 bg-bg/50 p-4 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <motion.div 
            className="h-8 w-8 rounded-full bg-gradient-to-br from-cy to-vi"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div>
            <div className="mb-1 h-3 w-20 rounded bg-fg/20" />
            <div className="h-2 w-16 rounded bg-fg/10" />
          </div>
        </div>
        <motion.div 
          className="h-8 w-8 rounded-full bg-cy/20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        />
      </div>

      {/* Map View */}
      <div className="relative flex-1 overflow-hidden bg-gradient-to-br from-cyan-900/20 via-blue-900/20 to-purple-900/20">
        {/* Map-like background pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg className="h-full w-full" viewBox="0 0 400 600">
            {/* Grid lines */}
            {Array.from({ length: 8 }).map((_, i) => (
              <line
                key={`h-${i}`}
                x1="0"
                y1={i * 75}
                x2="400"
                y2={i * 75}
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-fg/10"
              />
            ))}
            {Array.from({ length: 6 }).map((_, i) => (
              <line
                key={`v-${i}`}
                x1={i * 80}
                y1="0"
                x2={i * 80}
                y2="600"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-fg/10"
              />
            ))}
          </svg>
        </div>

        {/* Location Pins */}
        <div className="absolute inset-0 p-6">
          {/* Current Location Pin */}
          <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="relative"
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div className="h-12 w-12 rounded-full bg-cy shadow-lg shadow-cy/50 ring-4 ring-cy/20" />
              <div className="absolute left-1/2 top-full h-6 w-1 -translate-x-1/2 bg-cy" />
            </motion.div>
          </div>

          {/* Other Location Pins */}
          {[
            { x: '20%', y: '25%', label: 'Café Luna' },
            { x: '75%', y: '40%', label: 'Beach Park' },
            { x: '30%', y: '60%', label: 'Art Gallery' },
            { x: '80%', y: '70%', label: 'Restaurant' },
          ].map((pin, i) => (
            <div
              key={i}
              className="absolute"
              style={{ left: pin.x, top: pin.y }}
            >
              <div className="relative">
                <div className="h-8 w-8 rounded-full bg-vi/60 shadow-md ring-2 ring-vi/30" />
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900/90 px-2 py-1 text-[10px] text-fg/80 backdrop-blur-sm">
                  {pin.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Map Controls */}
        <div className="absolute right-4 top-4 flex flex-col gap-2">
          <div className="h-10 w-10 rounded-lg bg-bg/80 backdrop-blur-sm shadow-lg" />
          <div className="h-10 w-10 rounded-lg bg-bg/80 backdrop-blur-sm shadow-lg" />
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="border-t border-fg/10 bg-bg/80 p-4 backdrop-blur-sm">
        <motion.div 
          className="mb-3 flex items-center gap-3 rounded-xl bg-gradient-to-r from-cy/20 to-vi/20 p-3"
          animate={checkedIn ? { scale: [1, 1.02, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          <div className="h-10 w-10 rounded-full bg-cy/30" />
          <div className="flex-1">
            <div className="mb-1 h-3 w-32 rounded bg-fg/20" />
            <div className="h-2 w-24 rounded bg-fg/10" />
          </div>
          <motion.button
            onClick={() => setCheckedIn(!checkedIn)}
            className={cn(
              "rounded-full px-6 py-2 text-sm font-semibold shadow-lg transition-all",
              checkedIn
                ? "bg-green-500/30 text-green-400"
                : "bg-gradient-to-r from-cy to-vi text-bg"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {checkedIn ? "✓ Checked In" : "Check In"}
          </motion.button>
        </motion.div>
        <div className="flex items-center justify-between text-xs text-fg/60">
          <div className="flex items-center gap-1">
            <motion.div 
              className={cn(
                "h-3 w-3 rounded-full transition-colors",
                checkedIn ? "bg-green-500" : "bg-green-500/60"
              )}
              animate={checkedIn ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            />
            <span>{checkedIn ? "Just checked in" : "Last checked in 2h ago"}</span>
          </div>
          <div className="flex items-center gap-2">
            <motion.div 
              className="h-4 w-4 rounded bg-fg/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
            <motion.div 
              className="h-4 w-4 rounded bg-fg/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export function GraphScreen() {
  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-bg to-bg/80">
      {/* Header */}
      <div className="border-b border-fg/10 bg-bg/50 p-4 backdrop-blur-sm">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <div className="mb-1 h-4 w-40 rounded bg-fg/20" />
            <div className="h-3 w-24 rounded bg-fg/10" />
          </div>
          <div className="h-8 w-8 rounded-full bg-vi/20" />
        </div>
        <div className="mt-3 flex gap-2">
          {['Today', 'Week', 'Month', 'Year'].map((label, i) => (
            <div
              key={label}
              className={cn(
                'h-7 rounded-lg px-3 text-xs font-medium',
                i === 2
                  ? 'bg-gradient-to-r from-vi to-am text-bg'
                  : 'bg-fg/10 text-fg/60'
              )}
            >
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Graph Visualization */}
      <div className="relative flex-1 overflow-hidden bg-gradient-to-br from-vi/5 to-am/5 p-6">
        <svg viewBox="0 0 300 400" className="h-full w-full">
          {/* Background grid */}
          {Array.from({ length: 6 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={i * 80}
              x2="300"
              y2={i * 80}
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-fg/5"
            />
          ))}
          
          {/* Graph nodes and connections */}
          {[
            { x: 150, y: 200, label: 'You', isCenter: true },
            { x: 80, y: 120, label: 'Café Luna' },
            { x: 220, y: 100, label: 'Beach Park' },
            { x: 100, y: 280, label: 'Art Gallery' },
            { x: 200, y: 300, label: 'Restaurant' },
            { x: 60, y: 250, label: 'Concert' },
            { x: 240, y: 180, label: 'Museum' },
            { x: 120, y: 150, label: 'Park' },
            { x: 180, y: 240, label: 'Library' },
          ].map((node, i) => (
            <g key={i}>
              {/* Connections to center */}
              {node.isCenter ? null : (
                <line
                  x1={node.x}
                  y1={node.y}
                  x2={150}
                  y2={200}
                  stroke="#B794F6"
                  strokeWidth="1.5"
                  opacity="0.3"
                />
              )}
              {/* Node */}
              <circle
                cx={node.x}
                cy={node.y}
                r={node.isCenter ? 8 : 5}
                fill={node.isCenter ? '#00F5FF' : '#B794F6'}
                opacity={node.isCenter ? 1 : 0.8}
                className="drop-shadow-lg"
              />
              {/* Pulse animation for center node */}
              {node.isCenter && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="8"
                  fill="#00F5FF"
                  opacity="0.3"
                >
                  <animate
                    attributeName="r"
                    values="8;16;8"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.3;0;0.3"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
              {/* Label */}
              <text
                x={node.x}
                y={node.y - 15}
                textAnchor="middle"
                className="fill-fg/60 text-[10px] font-medium"
              >
                {node.label}
              </text>
            </g>
          ))}
        </svg>

        {/* Stats overlay */}
        <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2 rounded-xl bg-bg/80 p-3 backdrop-blur-sm">
          {[
            { label: 'Places', value: '47' },
            { label: 'Connections', value: '128' },
            { label: 'Memories', value: '312' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="mb-1 text-lg font-bold text-cy">{stat.value}</div>
              <div className="text-[10px] text-fg/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ChatScreen() {
  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-bg to-bg/80">
      {/* Header */}
      <div className="border-b border-fg/10 bg-bg/50 p-4 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cy to-vi" />
            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-bg bg-green-500" />
          </div>
          <div className="flex-1">
            <div className="mb-1 h-4 w-32 rounded bg-fg/20" />
            <div className="h-3 w-20 rounded bg-fg/10" />
          </div>
          <div className="flex gap-2">
            <div className="h-8 w-8 rounded-full bg-fg/10" />
            <div className="h-8 w-8 rounded-full bg-fg/10" />
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {[
          {
            text: "Where did I spend most time this month?",
            isUser: true,
            time: "10:24 AM",
          },
          {
            text: "Most of your relaxing visits are at cafés near water or parks on weekends. You visited Café Luna 8 times and Beach Park 6 times.",
            isUser: false,
            time: "10:24 AM",
          },
          {
            text: "Find me a dinner spot I'd love",
            isUser: true,
            time: "10:25 AM",
          },
          {
            text: "Based on your preferences, I recommend Bar Kindred — it matches your love for calm ambience, vegetarian cuisine, and waterfront views. You've enjoyed similar spots before!",
            isUser: false,
            time: "10:25 AM",
            suggestions: ["View on map", "See reviews", "Book table"],
          },
        ].map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={cn(
              'flex flex-col',
              msg.isUser ? 'items-end' : 'items-start'
            )}
          >
            <div
              className={cn(
                'max-w-[85%] rounded-2xl p-3',
                msg.isUser
                  ? 'bg-gradient-to-r from-cy/30 to-vi/20 text-fg'
                  : 'bg-fg/10 text-fg/80'
              )}
            >
              <p className="text-sm leading-relaxed">{msg.text}</p>
              {msg.suggestions && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {msg.suggestions.map((suggestion, j) => (
                    <button
                      key={j}
                      className="rounded-full bg-cy/20 px-3 py-1 text-xs text-cy"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <span className="mt-1 text-[10px] text-fg/40">{msg.time}</span>
          </motion.div>
        ))}
      </div>

      {/* Input Area */}
      <div className="border-t border-fg/10 bg-bg/80 p-4 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-fg/10" />
          <div className="h-10 flex-1 rounded-full bg-fg/10 px-4 flex items-center">
            <span className="text-sm text-fg/40">Ask your digital twin...</span>
          </div>
          <motion.button
            className="h-10 w-10 rounded-full bg-gradient-to-r from-cy to-vi shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="flex h-full w-full items-center justify-center text-bg">
              →
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export function LocationCaptureScreen() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [selectedCompanion, setSelectedCompanion] = useState<string | null>(null)
  const [checkedIn, setCheckedIn] = useState(false)

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-bg to-bg/80">
      <div className="border-b border-fg/10 bg-bg/50 p-4 backdrop-blur-sm">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-fg">Current Location</h3>
          <div className="flex gap-2">
            <motion.div 
              className="h-8 w-8 rounded-full bg-cy/20"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="h-8 w-8 rounded-full bg-fg/10" />
          </div>
        </div>
        <p className="text-sm text-fg/60">Mission Beach, San Diego</p>
      </div>

      <div className="flex-1 p-4">
        <motion.div 
          className="mb-4 rounded-xl bg-gradient-to-br from-cy/20 to-vi/10 p-4"
          animate={checkedIn ? { scale: [1, 1.02, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-3 flex items-start gap-3">
            <div className="h-12 w-12 rounded-full bg-cy/40" />
            <div className="flex-1">
              <h4 className="mb-1 font-semibold text-fg">Café Luna</h4>
              <p className="text-xs text-fg/60">Coffee Shop • 0.2 mi away</p>
            </div>
            <div className="rounded-full bg-green-500/20 px-2 py-1 text-xs text-green-400">
              Open
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCheckedIn(!checkedIn)}
            className={cn(
              "mb-3 w-full rounded-full py-3 font-semibold shadow-lg transition-all",
              checkedIn
                ? "bg-green-500/30 text-green-400"
                : "bg-gradient-to-r from-cy to-vi text-bg"
            )}
          >
            {checkedIn ? "✓ Checked In" : "👆 I'm Here"}
          </motion.button>

          <div className="mb-3">
            <p className="mb-2 text-xs font-medium text-fg/70">Quick mood:</p>
            <div className="flex flex-wrap gap-2">
              {['😌 Relaxed', '😊 Happy', '🤔 Focused', '😴 Tired'].map((mood) => (
                <motion.button
                  key={mood}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedMood(mood)}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs transition-all",
                    selectedMood === mood
                      ? "bg-cy/30 text-cy ring-2 ring-cy/50"
                      : "bg-fg/10 text-fg/70 hover:bg-cy/20 hover:text-cy"
                  )}
                >
                  {mood}
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-medium text-fg/70">With:</p>
            <div className="flex gap-2">
              {['👤 Solo', '👥 Friends', '👨‍👩‍👧 Family'].map((comp) => (
                <motion.button
                  key={comp}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCompanion(comp)}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs transition-all",
                    selectedCompanion === comp
                      ? "bg-vi/30 text-vi ring-2 ring-vi/50"
                      : "bg-fg/10 text-fg/70 hover:bg-cy/20 hover:text-cy"
                  )}
                >
                  {comp}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        <div>
          <p className="mb-2 text-sm font-medium text-fg/70">Recent</p>
          {[
            { name: 'Beach Park', time: '2h ago', mood: '🌊' },
            { name: 'Art Gallery', time: 'Yesterday', mood: '🎨' },
          ].map((place) => (
            <div
              key={place.name}
              className="mb-2 flex items-center gap-3 rounded-lg bg-fg/5 p-2"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-vi/20 text-sm">
                {place.mood}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-fg">{place.name}</div>
                <div className="text-xs text-fg/50">{place.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex border-t border-fg/10 bg-bg/80 backdrop-blur-sm">
        {['🏠', '📍', '🗺️', '👤'].map((icon, i) => (
          <button
            key={i}
            className={cn(
              'flex-1 py-3 text-center text-xl',
              i === 1 ? 'text-cy' : 'text-fg/40'
            )}
          >
            {icon}
          </button>
        ))}
      </div>
    </div>
  )
}

export function EventCaptureScreen() {
  const [selectedFeeling, setSelectedFeeling] = useState('😍')
  const [selectedAgain, setSelectedAgain] = useState('⭐ Definitely')
  const [selectedCompanions, setSelectedCompanions] = useState(['👥 Friends'])
  const [saved, setSaved] = useState(false)

  const toggleCompanion = (comp: string) => {
    setSelectedCompanions(prev =>
      prev.includes(comp) ? prev.filter(c => c !== comp) : [...prev, comp]
    )
  }

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-bg to-bg/80">
      <div className="border-b border-fg/10 bg-bg/50 p-4 backdrop-blur-sm">
        <div className="mb-1 text-xs text-fg/50">Just finished</div>
        <h3 className="text-lg font-semibold text-fg">Jazz Night at The Casbah</h3>
        <p className="text-sm text-fg/60">8:00 PM - 11:30 PM</p>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <motion.div 
          className="mb-4 rounded-xl bg-gradient-to-br from-vi/20 to-am/10 p-4"
          animate={saved ? { scale: [1, 1.02, 1] } : {}}
        >
          <div className="mb-3 flex items-center gap-2">
            <motion.div 
              className="flex h-10 w-10 items-center justify-center rounded-full bg-vi/30 text-xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🎵
            </motion.div>
            <div className="flex-1">
              <h4 className="font-semibold text-fg">How was it?</h4>
              <p className="text-xs text-fg/60">Quick reflection</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="mb-2 text-sm font-medium text-fg">How did you feel?</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { emoji: '😍', label: 'Amazing' },
                { emoji: '😊', label: 'Great' },
                { emoji: '🙂', label: 'Good' },
                { emoji: '😐', label: 'Okay' },
              ].map((mood) => (
                <motion.button
                  key={mood.label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedFeeling(mood.emoji)}
                  className={cn(
                    'rounded-xl py-3 font-medium transition-all',
                    selectedFeeling === mood.emoji
                      ? 'bg-gradient-to-r from-vi to-am text-bg shadow-lg ring-2 ring-vi/50'
                      : 'bg-fg/10 text-fg/70 hover:bg-fg/20'
                  )}
                >
                  <div className="mb-1 text-2xl">{mood.emoji}</div>
                  <div className="text-xs">{mood.label}</div>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <p className="mb-2 text-sm font-medium text-fg">Would you do it again?</p>
            <div className="flex gap-2">
              {['⭐ Definitely', '🤔 Maybe', '👎 No'].map((option) => (
                <motion.button
                  key={option}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedAgain(option)}
                  className={cn(
                    'flex-1 rounded-lg py-2 text-xs font-medium transition-all',
                    selectedAgain === option
                      ? 'bg-vi/30 text-vi ring-2 ring-vi/50'
                      : 'bg-fg/10 text-fg/60 hover:bg-fg/20'
                  )}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <p className="mb-2 text-sm font-medium text-fg">Who were you with?</p>
            <div className="flex flex-wrap gap-2">
              {['👤 Solo', '👥 Friends', '👨‍👩‍👧 Family', '💼 Colleagues'].map((comp) => (
                <motion.button
                  key={comp}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleCompanion(comp)}
                  className={cn(
                    'rounded-full px-3 py-1 text-xs font-medium transition-all',
                    selectedCompanions.includes(comp)
                      ? 'bg-vi/30 text-vi ring-2 ring-vi/50'
                      : 'bg-fg/10 text-fg/60 hover:bg-fg/20'
                  )}
                >
                  {comp}
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-fg">Any highlights?</p>
            <div className="space-y-2">
              <button className="w-full rounded-lg bg-fg/10 py-3 text-sm text-fg/70 hover:bg-fg/20">
                💭 Add a note
              </button>
              <button className="w-full rounded-lg bg-fg/10 py-3 text-sm text-fg/70 hover:bg-fg/20">
                📸 Add photos
              </button>
            </div>
          </div>
        </motion.div>

        <div className="rounded-xl border border-am/30 bg-am/5 p-3">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-lg">🤖</span>
            <span className="text-xs font-medium text-fg/70">AI detected:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {['🎸 Live music', '🌃 Nightlife', '🎭 Entertainment'].map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-am/20 px-2 py-1 text-xs text-am"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-fg/10 bg-bg/80 p-4 backdrop-blur-sm">
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 rounded-full border border-fg/20 py-2 text-sm text-fg/60 hover:bg-fg/5"
          >
            Skip
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSaved(!saved)}
            className={cn(
              "flex-1 rounded-full py-2 text-sm font-semibold shadow-lg transition-all",
              saved
                ? "bg-green-500/30 text-green-400"
                : "bg-gradient-to-r from-vi to-am text-bg"
            )}
          >
            {saved ? '✓ Saved' : 'Save Reflection'}
          </motion.button>
        </div>
      </div>
    </div>
  )
}

