'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export function CaptureMethodsDemo() {
  const [activeMethod, setActiveMethod] = useState<'location' | 'event'>('location')

  return (
    <div className="mx-auto max-w-5xl">
      {/* Toggle between methods */}
      <div className="mb-8 flex justify-center gap-4">
        <button
          onClick={() => setActiveMethod('location')}
          className={cn(
            'flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-all duration-300',
            activeMethod === 'location'
              ? 'bg-gradient-to-r from-cy to-vi text-bg shadow-lg scale-110'
              : 'glass-cy text-fg/70 hover:text-fg'
          )}
        >
          <span className="text-xl">📍</span>
          Location-Based
        </button>
        <button
          onClick={() => setActiveMethod('event')}
          className={cn(
            'flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-all duration-300',
            activeMethod === 'event'
              ? 'bg-gradient-to-r from-cy to-vi text-bg shadow-lg scale-110'
              : 'glass-cy text-fg/70 hover:text-fg'
          )}
        >
          <span className="text-xl">📅</span>
          Event-Based
        </button>
      </div>

      <AnimatePresence mode="wait">
        {/* Location-Based Capture */}
        {activeMethod === 'location' && (
          <motion.div
            key="location"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="glass rounded-2xl border border-cy/30 p-8"
          >
            <div className="mb-6 flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cy/20 text-2xl">
                📍
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-2xl font-bold text-fg">Location-Based Capture</h3>
                <p className="text-fg/70">
                  Automatic or manual check-in when you arrive at a new location
                </p>
              </div>
            </div>

            {/* Sources */}
            <div className="mb-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl bg-gradient-to-br from-cy/10 to-vi/10 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-2xl">🗺️</span>
                  <h4 className="font-semibold text-fg">Google Maps Timeline</h4>
                </div>
                <p className="text-sm text-fg/60">
                  Import your location history automatically. We detect visits and create nodes.
                </p>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-vi/10 to-am/10 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-2xl">👆</span>
                  <h4 className="font-semibold text-fg">Manual Check-in</h4>
                </div>
                <p className="text-sm text-fg/60">
                  Tap &quot;I&apos;m here&quot; button to capture a moment at any location.
                </p>
              </div>
            </div>

            {/* Captured Data */}
            <div className="rounded-xl bg-bg/50 p-6">
              <h4 className="mb-4 font-semibold text-fg">What Gets Captured:</h4>
              <div className="grid gap-3 md:grid-cols-2">
                {[
                  { icon: '🏷️', label: 'Place Type', example: 'Café, Park, Restaurant' },
                  { icon: '⏰', label: 'Time & Duration', example: '2:30 PM, 45 min dwell' },
                  { icon: '😊', label: 'Mood Tag', example: 'Relaxed, Energized, Happy' },
                  { icon: '👥', label: 'Companions', example: 'Solo, Friends, Family' },
                  { icon: '📸', label: 'Photos', example: 'Optional visual memories' },
                  { icon: '🤖', label: 'AI Enrichment', example: 'Scene, emotion, theme' },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-3 rounded-lg bg-gradient-to-r from-cy/5 to-vi/5 p-3"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium text-fg">{item.label}</div>
                      <div className="text-xs text-fg/50">{item.example}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Example Mockup */}
            <div className="mt-6 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 p-4">
              <div className="mb-3 text-center text-xs text-fg/50">Example Check-in</div>
              <div className="rounded-lg bg-gray-950 p-4">
                <div className="mb-3 flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-cy/30" />
                  <div className="flex-1">
                    <div className="font-semibold text-fg">Café Luna</div>
                    <div className="text-sm text-fg/60">Mission Beach, San Diego</div>
                  </div>
                  <div className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-400">
                    Checked in
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-cy/20 px-3 py-1 text-xs text-cy">☕ Café</span>
                  <span className="rounded-full bg-vi/20 px-3 py-1 text-xs text-vi">😌 Relaxed</span>
                  <span className="rounded-full bg-am/20 px-3 py-1 text-xs text-am">🌊 Waterfront</span>
                  <span className="rounded-full bg-pink/20 px-3 py-1 text-xs text-pink">👤 Solo</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Event-Based Capture */}
        {activeMethod === 'event' && (
          <motion.div
            key="event"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass rounded-2xl border border-vi/30 p-8"
          >
            <div className="mb-6 flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-vi/20 text-2xl">
                📅
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-2xl font-bold text-fg">Event-Based Capture</h3>
                <p className="text-fg/70">
                  Calendar-triggered reflection prompts after events finish
                </p>
              </div>
            </div>

            {/* How It Works */}
            <div className="mb-6 space-y-3">
              {[
                {
                  step: '1',
                  title: 'Event Syncs',
                  description: 'Connect your calendar (Google Calendar, Apple Calendar)',
                },
                {
                  step: '2',
                  title: 'Event Ends',
                  description: 'When an event finishes, you get a gentle notification',
                },
                {
                  step: '3',
                  title: 'Quick Reflection',
                  description: 'Answer simple prompts about your experience',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex items-start gap-4 rounded-xl bg-gradient-to-r from-vi/10 to-am/10 p-4"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-vi/30 font-bold text-vi">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-fg">{item.title}</h4>
                    <p className="text-sm text-fg/60">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Reflection Prompts */}
            <div className="rounded-xl bg-bg/50 p-6">
              <h4 className="mb-4 font-semibold text-fg">Reflection Prompts:</h4>
              <div className="space-y-3">
                {[
                  { icon: '😊', question: 'How did you feel?', options: ['Great', 'Good', 'Okay', 'Meh'] },
                  { icon: '⭐', question: 'Would you do it again?', options: ['Definitely', 'Maybe', 'No'] },
                  { icon: '👥', question: 'Who were you with?', options: ['Solo', 'Friends', 'Family', 'Colleagues'] },
                  { icon: '💭', question: 'Any highlights?', options: ['Add note', 'Add photo', 'Skip'] },
                ].map((prompt, i) => (
                  <motion.div
                    key={prompt.question}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="rounded-lg bg-gradient-to-r from-vi/5 to-am/5 p-4"
                  >
                    <div className="mb-2 flex items-center gap-2 text-sm font-medium text-fg">
                      <span className="text-lg">{prompt.icon}</span>
                      {prompt.question}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {prompt.options.map((option) => (
                        <button
                          key={option}
                          className="rounded-full bg-vi/20 px-3 py-1 text-xs text-vi hover:bg-vi/30"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Example Mockup */}
            <div className="mt-6 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 p-4">
              <div className="mb-3 text-center text-xs text-fg/50">Example Notification</div>
              <div className="rounded-lg bg-gray-950 p-4">
                <div className="mb-3 flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-vi/30 text-xl">
                    🎵
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 font-semibold text-fg">How was the concert?</div>
                    <div className="text-sm text-fg/60">
                      You just finished &quot;Jazz Night at The Casbah&quot;
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    {['😍 Amazing', '😊 Great', '🙂 Good', '😐 Okay'].map((mood) => (
                      <button
                        key={mood}
                        className="flex-1 rounded-lg bg-vi/20 py-2 text-xs text-vi hover:bg-vi/30"
                      >
                        {mood}
                      </button>
                    ))}
                  </div>
                  <button className="w-full rounded-lg border border-fg/10 py-2 text-sm text-fg/60 hover:bg-fg/5">
                    💬 Add a note
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

