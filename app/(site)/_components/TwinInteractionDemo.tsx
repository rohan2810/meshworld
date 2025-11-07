'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export function TwinInteractionDemo() {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setStage((prev) => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

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
      {/* Stage Indicators */}
      <div className="mb-8 flex justify-center gap-2">
        {['Users', 'Analyzing', 'Shared', 'Recommendation'].map((label, i) => (
          <button
            key={i}
            onClick={() => setStage(i)}
            className={cn(
              'rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 cursor-pointer hover:scale-105',
              stage === i
                ? 'bg-gradient-to-r from-cy to-vi text-bg scale-110'
                : 'bg-fg/10 text-fg/50 hover:bg-fg/20'
            )}
            aria-label={`View ${label} stage`}
          >
            {label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Stage 0: Show both users */}
        {stage === 0 && (
          <motion.div
            key="users"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid gap-6 md:grid-cols-2"
          >
            {[user1, user2].map((user, idx) => (
              <div
                key={user.name}
                className="glass rounded-2xl border border-fg/10 p-6"
              >
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
                    <div
                      key={pref.label}
                      className="flex items-center justify-between rounded-lg bg-fg/5 p-2"
                    >
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

        {/* Stage 1: AI Analyzing */}
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
            <h3 className="mb-4 text-2xl font-bold text-fg">
              AI Analyzing Preferences...
            </h3>
            <div className="mx-auto max-w-md space-y-2">
              {[
                'Comparing taste profiles',
                'Finding common interests',
                'Calculating compatibility scores',
                'Searching restaurant database',
              ].map((text, i) => (
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

        {/* Stage 2: Shared Preferences */}
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

        {/* Stage 3: Recommendation */}
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

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-6 w-full rounded-full bg-gradient-to-r from-cy to-vi py-3 font-semibold text-bg shadow-lg"
            >
              View on Map & Book Table
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress indicator */}
      <div className="mt-6 flex justify-center gap-2">
        {[0, 1, 2, 3].map((i) => (
          <button
            key={i}
            onClick={() => setStage(i)}
            className={cn(
              'h-2 rounded-full transition-all duration-300',
              stage === i ? 'w-8 bg-cy' : 'w-2 bg-fg/30 hover:bg-fg/50'
            )}
            aria-label={`Go to stage ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

