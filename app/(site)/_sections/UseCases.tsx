'use client'

import { useState } from 'react'
import { Section } from '../_components/Section'
import { MorphingBlob } from '../_components/MorphingBlob'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const soloQuestions = [
  'Show me all the spots where I felt most relaxed this month.',
  'What patterns do you see in my weekend routines?',
  'Where did I have my best solo meals in the last 6 months?',
  'Which neighborhoods make me feel most energized?',
  'What time of day am I happiest based on my check-ins?',
  'Remind me of that hidden gem I found but forgot to save.',
]

const groupQuestions = [
  'I am planning to get coffee with Sarah, suggest a place we both love.',
  'Planning a trip with Alex, Maya, and Jordan to Utah this summer. Where do our tastes overlap?',
  "What Friday plan fits everyone's budget and mood?",
  "Whose playlists match the dinner party I'm hosting?",
]

const coffeeExample = {
  query: 'I am planning to get coffee with Sarah, suggest a place?',
  match: 94,
  people: [
    { name: 'You', initial: 'Y', color: 'from-cy to-blue-500' },
    { name: 'Sarah', initial: 'S', color: 'from-vi to-purple-500' },
  ],
  matches: [
    { label: 'Neighborhood vibes', score: 92, note: 'You + Sarah tagged 5 SoMa cafes' },
    { label: 'Outdoor seating', score: 88, note: "Matches Sarah's morning sun check-ins" },
    { label: 'Single origin espresso', score: 94, note: 'Shared tasting notes' },
  ],
  recommendation: {
    name: 'Linea Caffe',
    time: '10:30AM',
    details: '6 min walk, plant-heavy seating, playlist matches your saved set.',
  },
}

const tripExample = {
  query: 'Planning a trip with Alex, Maya, and Jordan to Utah this summer. Show our aligned preferences and draft an itinerary.',
  people: [
    { name: 'You', initial: 'Y', color: 'from-cy to-blue-500' },
    { name: 'Alex', initial: 'A', color: 'from-vi to-purple-500' },
    { name: 'Maya', initial: 'M', color: 'from-am to-orange-500' },
    { name: 'Jordan', initial: 'J', color: 'from-pink to-rose-500' },
  ],
  preferences: [
    { label: 'Red rock hikes', people: ['You', 'Alex', 'Maya', 'Jordan'] },
    { label: 'Cold brew stops', people: ['You', 'Alex'] },
    { label: 'Hot springs', people: ['Maya', 'Jordan'] },
    { label: 'Photo missions', people: ['You', 'Jordan'] },
    { label: 'Scenic drives', people: ['You', 'Alex', 'Maya'] },
  ],
  itinerary: [
    {
      time: 'Day 1 • Salt Lake City to Moab',
      detail: 'Meet at Publik Coffee, stock desert snacks, sunset drive along Highway 128.',
    },
    {
      time: 'Day 2 • Arches & Canyonlands',
      detail: "Sunrise at Mesa Arch, midday siesta, night stargazing with Maya's playlist.",
    },
    {
      time: 'Day 3 • Slot canyons + hot springs',
      detail: 'Wire Pass hike (heat ready), soak at Mystic, dinner in Kanab that fits everyone.',
    },
  ],
}

const personaUseCases = [
  {
    title: 'The Explorer',
    description: 'Travels often and hates forgetting favorite spots or context.',
    emoji: '🗺️',
    color: 'from-cy to-blue-500',
  },
  {
    title: 'The Solo Archivist',
    description: 'Keeps a living journal of feelings, meals, and breakthroughs.',
    emoji: '📔',
    color: 'from-vi to-purple-500',
  },
  {
    title: 'The Host',
    description: 'Plans dinners, hangs, and wants the right vibe for every guest list.',
    emoji: '🍷',
    color: 'from-am to-orange-500',
  },
  {
    title: 'The Trip Captain',
    description: 'Aligns group itineraries faster with shared preferences in one view.',
    emoji: '🚐',
    color: 'from-pink to-rose-500',
  },
  {
    title: 'The Connector',
    description: 'Introduces friends, curates invites, and wants context before suggesting plans.',
    emoji: '🤝',
    color: 'from-cy to-vi',
  },
  {
    title: 'The New Local',
    description: 'Just moved cities and builds a trusted guide from day one.',
    emoji: '🏙️',
    color: 'from-vi to-am',
  },
  {
    title: 'The Team Lead',
    description: 'Designs offsites and wellness days using what energizes the group.',
    emoji: '💼',
    color: 'from-am to-pink',
  },
  {
    title: 'The Builder',
    description: 'Partners and devs experimenting with experience graphs.',
    emoji: '🔧',
    color: 'from-cy to-am',
  },
]

export function UseCases() {
  const [activeExample, setActiveExample] = useState<'coffee' | 'trip'>('coffee')

  return (
    <Section
      id="use-cases"
      aria-labelledby="use-cases-heading"
      className="bg-bg/50 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute top-1/5 right-1/4 opacity-60">
        <MorphingBlob color="vi" size="md" />
      </div>
      <div className="absolute bottom-1/5 left-1/5 opacity-50">
        <MorphingBlob color="am" size="sm" />
      </div>
      <div className="grid-background" aria-hidden="true" />

      <div className="relative space-y-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2
            id="use-cases-heading"
            className="mb-4 text-4xl font-bold leading-tight tracking-tight text-fg md:text-5xl"
          >
            Use cases that feel{' '}
            <span className="text-gradient">personal</span>.
          </h2>
          <p className="text-lg text-fg/80 md:text-xl">
            Solo reflection, group planning, and everything between.
          </p>
        </motion.div>

        {/* Solo vs Group */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Solo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="group relative overflow-hidden rounded-3xl border border-cy/20 bg-gradient-to-br from-bg/80 to-cy/5 p-8 shadow-2xl shadow-cy/10 backdrop-blur transition-all hover:border-cy/40 hover:shadow-cy/20"
          >
            {/* Subtle glow effect */}
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cy/20 blur-3xl group-hover:bg-cy/30" />
            
            <div className="relative">
              <div className="mb-6 flex items-center gap-3">
                <span className="rounded-full bg-cy/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-cy">
                  Solo
                </span>
                <span className="text-sm text-fg/60">Private by default. Built for recall + reflection.</span>
              </div>
              
              <h3 className="mb-4 text-2xl font-bold text-fg">
                Know what you actually enjoy when it&apos;s just you.
              </h3>
              
              <p className="mb-5 text-base leading-relaxed text-fg/70">
                SetuAI makes it effortless to ask your past self questions and get honest answers
                grounded in places, moods, and notes you already captured.
              </p>
              
              <ul className="mb-6 space-y-2.5">
                {soloQuestions.map((question, idx) => (
                  <motion.li
                    key={question}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-3 text-base text-fg/80"
                  >
                    <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-cy/20 text-xs font-bold text-cy">
                      ?
                    </span>
                    <span className="leading-relaxed">{question}</span>
                  </motion.li>
                ))}
              </ul>
              
              {/* Sample Query */}
              <div className="relative overflow-hidden rounded-2xl border border-cy/30 bg-gradient-to-br from-bg to-cy/10 p-5 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cy/5 to-transparent opacity-50" />
                <div className="relative">
                  <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-cy">
                    Sample Query
                  </div>
                  <p className="mb-2 text-base font-medium text-fg">
                    &ldquo;What neighborhood leaves me recharged after a long sprint?&rdquo;
                  </p>
                  <p className="mb-3 text-base font-semibold text-cy">
                    → Hayes Valley, Nolita, and Le Marais.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-fg/60">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-cy" />
                    <span>Answer backed by 28 log entries, mood boosts of +18%, and notes you wrote to yourself.</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Group */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group relative overflow-hidden rounded-3xl border border-vi/20 bg-gradient-to-br from-bg/80 to-vi/5 p-8 shadow-2xl shadow-vi/10 backdrop-blur transition-all hover:border-vi/40 hover:shadow-vi/20"
          >
            {/* Subtle glow effect */}
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-vi/20 blur-3xl group-hover:bg-vi/30" />
            
            <div className="relative">
              <div className="mb-6 flex items-center gap-3">
                <span className="rounded-full bg-vi/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-vi">
                  Groups & Plans
                </span>
                <span className="text-sm text-fg/60">Shared tastes without the spreadsheet.</span>
              </div>
              
              <h3 className="mb-4 text-2xl font-bold text-fg">
                Every hang, coffee, or trip respects everyone&apos;s preferences.
              </h3>
              
              <p className="mb-5 text-base leading-relaxed text-fg/70">
                Blend twins with trusted people to unlock co-recommendations, see overlaps, and let the
                model draft the plan.
              </p>
              
              <ul className="mb-6 space-y-2.5">
                {groupQuestions.map((question, idx) => (
                  <motion.li
                    key={question}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-3 text-base text-fg/80"
                  >
                    <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-vi/20 text-xs font-bold text-vi">
                      ?
                    </span>
                    <span className="leading-relaxed">{question}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Interactive Examples */}
              <div className="space-y-4">
                {/* Example Toggle */}
                <div className="flex gap-2 rounded-xl bg-fg/5 p-1">
                  <button
                    onClick={() => setActiveExample('coffee')}
                    className={cn(
                      'flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all',
                      activeExample === 'coffee'
                        ? 'bg-gradient-to-r from-vi to-purple-500 text-bg shadow-lg'
                        : 'text-fg/60 hover:text-fg'
                    )}
                  >
                    Coffee ☕
                  </button>
                  <button
                    onClick={() => setActiveExample('trip')}
                    className={cn(
                      'flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all',
                      activeExample === 'trip'
                        ? 'bg-gradient-to-r from-vi to-purple-500 text-bg shadow-lg'
                        : 'text-fg/60 hover:text-fg'
                    )}
                  >
                    Trip 🗺️
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {/* Coffee Example */}
                  {activeExample === 'coffee' && (
                    <motion.div
                      key="coffee"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="rounded-2xl border border-vi/20 bg-gradient-to-br from-bg/90 to-vi/10 p-6 backdrop-blur-sm"
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <p className="text-sm font-medium text-fg/90">{coffeeExample.query}</p>
                        <div className="flex items-center gap-2 rounded-full bg-vi/20 px-3 py-1">
                          <span className="text-xs font-semibold text-vi">Match</span>
                          <span className="text-lg font-bold text-vi">{coffeeExample.match}%</span>
                        </div>
                      </div>
                      
                      {/* People Avatars */}
                      <div className="mb-4 flex -space-x-2">
                        {coffeeExample.people.map((person, idx) => (
                          <motion.div
                            key={person.name}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className={cn(
                              'flex h-12 w-12 items-center justify-center rounded-full border-2 border-bg text-sm font-bold text-bg shadow-lg',
                              `bg-gradient-to-br ${person.color}`
                            )}
                            title={person.name}
                          >
                            {person.initial}
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Match Bars */}
                      <div className="mb-4 space-y-3">
                        {coffeeExample.matches.map((match, idx) => (
                          <motion.div
                            key={match.label}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 + 0.2 }}
                          >
                            <div className="mb-1 flex items-center justify-between text-xs">
                              <span className="font-medium text-fg/70">{match.label}</span>
                              <span className="text-fg/50">{match.note}</span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-fg/10">
                              <motion.div
                                className="h-full bg-gradient-to-r from-vi to-purple-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${match.score}%` }}
                                transition={{ delay: idx * 0.1 + 0.3, duration: 0.5 }}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Recommendation */}
                      <div className="rounded-xl border border-vi/30 bg-gradient-to-r from-vi/20 to-purple-500/20 p-4 backdrop-blur-sm">
                        <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-vi">
                          Recommendation
                        </div>
                        <p className="text-sm font-medium text-fg">
                          <span className="font-bold text-vi">{coffeeExample.recommendation.name}</span> at{' '}
                          {coffeeExample.recommendation.time}. {coffeeExample.recommendation.details}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Trip Example */}
                  {activeExample === 'trip' && (
                    <motion.div
                      key="trip"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="rounded-2xl border border-vi/20 bg-gradient-to-br from-bg/90 to-vi/10 p-6 backdrop-blur-sm"
                    >
                      <p className="mb-4 text-sm font-medium text-fg/90">{tripExample.query}</p>
                      
                      {/* People Avatars */}
                      <div className="mb-6 flex -space-x-2">
                        {tripExample.people.map((person, idx) => (
                          <motion.div
                            key={person.name}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className={cn(
                              'flex h-12 w-12 items-center justify-center rounded-full border-2 border-bg text-sm font-bold text-bg shadow-lg',
                              `bg-gradient-to-br ${person.color}`
                            )}
                            title={person.name}
                          >
                            {person.initial}
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Shared Preferences */}
                      <div className="mb-6">
                        <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-fg/60">
                          Aligned Preferences
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {tripExample.preferences.map((pref, idx) => (
                            <motion.div
                              key={pref.label}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: idx * 0.05 }}
                              className="rounded-xl border border-fg/15 bg-bg/70 px-3 py-2 backdrop-blur-sm"
                            >
                              <div className="mb-1.5 text-xs font-semibold text-fg">{pref.label}</div>
                              <div className="flex flex-wrap gap-1">
                                {pref.people.map((person) => (
                                  <span
                                    key={`${pref.label}-${person}`}
                                    className="rounded-full bg-vi/20 px-2 py-0.5 text-[10px] font-medium text-vi"
                                  >
                                    {person}
                                  </span>
                                ))}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Itinerary */}
                      <div className="rounded-xl border border-vi/20 bg-bg/70 p-4 backdrop-blur-sm">
                        <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-vi">
                          Itinerary Draft
                        </div>
                        <div className="space-y-2">
                          {tripExample.itinerary.map((item, idx) => (
                            <motion.div
                              key={item.time}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="rounded-lg border border-fg/10 bg-fg/5 px-3 py-2"
                            >
                              <div className="mb-1 text-xs font-semibold text-fg">{item.time}</div>
                              <p className="text-xs leading-relaxed text-fg/80">{item.detail}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Persona Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {personaUseCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl border border-fg/20 bg-gradient-to-br from-bg/70 via-bg/50 to-bg/70 p-6 backdrop-blur-sm transition-all duration-300 hover:border-cy/50 hover:shadow-2xl hover:shadow-cy/20"
            >
              {/* Animated gradient background */}
              <div className={cn(
                'absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-20',
                useCase.color
              )} />
              
              {/* Glow effect */}
              <div className={cn(
                'absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br blur-3xl opacity-0 transition-all duration-500 group-hover:opacity-30 group-hover:scale-150',
                useCase.color
              )} />
              
              {/* Content */}
              <div className="relative z-10">
                <motion.div
                  className="mb-4 text-5xl"
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  {useCase.emoji}
                </motion.div>
                <h3 className="mb-2 text-xl font-bold text-fg transition-colors group-hover:text-cy">
                  {useCase.title}
                </h3>
                <p className="text-base leading-relaxed text-fg/70 group-hover:text-fg/80">
                  {useCase.description}
                </p>
              </div>
              
            </motion.div>
          ))}
        </div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="mb-3 text-lg text-fg/80">
            Building with friends, creatives, and planners who want real context.
          </p>
          <p className="text-base text-fg/70">
            Say hi:{' '}
            <a
              href="mailto:hello@setuai.com"
              className="font-medium text-cy transition-colors hover:text-cy/80"
            >
              hello@setuai.com
            </a>
          </p>
        </motion.div>
      </div>
    </Section>
  )
}
