'use client'

import { Section } from '../_components/Section'
import { MobileAppPreview, ChatScreen } from '../_components/MobileAppPreview'
import { Icon, ReflectionIcon } from '../_components/Icon'
import { motion } from 'framer-motion'
import { FeatureCard } from '../_components/FeatureCard'

export function Reflect() {
  const exampleQueries = [
    {
      query: "Where did I spend most time this month?",
      response: "Most of your relaxing visits are at cafés near water or parks on weekends.",
    },
    {
      query: "Find me a dinner spot I'd love",
      response: "Try Bar Kindred — matches your love for calm ambience and vegetarian cuisine.",
    },
    {
      query: "Show me the parks I visit when I feel most relaxed",
      response: "You visit Golden Gate Park most often on Sunday mornings. The pattern suggests you seek quiet, nature-filled spaces when you need to recharge.",
    },
  ]

  return (
    <Section id="reflect" aria-labelledby="reflect-heading" className="bg-bg/50 gradient-mesh" fullScreen>
      <div className="relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-block rounded-full bg-am/10 px-4 py-2 text-sm font-medium text-am">
            Step 3
          </div>
          <h2
            id="reflect-heading"
            className="mb-6 text-4xl font-bold leading-tight tracking-tight text-fg md:text-5xl"
          >
            <span className="text-gradient">
              Reflect
            </span>{' '}
            with your AI agent
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-fg/70">
            Your personal reflection and planning companion. Ask anything about your experiences and
            get intelligent, contextual answers.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Mobile Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <MobileAppPreview
              screens={[
                {
                  id: 'chat',
                  title: 'AI Reflection Agent',
                  description: 'Conversational queries about your experiences',
                  mockup: <ChatScreen />,
                },
              ]}
            />
          </motion.div>

          {/* Example Queries */}
          <div className="space-y-6">
            {exampleQueries.map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-xl p-6"
              >
                <div className="mb-3 flex items-start gap-3">
                  <div className="mt-1 h-8 w-8 flex-shrink-0 rounded-full bg-cy/20 flex items-center justify-center">
                    <svg className="h-4 w-4 text-cy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="mb-2 font-medium text-fg">{example.query}</p>
                    <p className="text-sm text-fg/70">{example.response}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <FeatureCard
                title="Natural Language Queries"
                description="Ask questions naturally. The AI reasons over your experience graph and replies conversationally."
                icon={
                  <Icon>
                    <ReflectionIcon />
                  </Icon>
                }
                index={0}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </Section>
  )
}

