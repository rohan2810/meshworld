'use client'

import { useState, FormEvent } from 'react'
import { addToWaitlist } from '@/lib/supabase'
import { Button } from './Button'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

const useCaseOptions = [
  'Solo exploring',
  'With partner/friends',
  'Travel',
  'Self-reflection / journaling',
  'Just curious',
]

export function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [useCase, setUseCase] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!email || !email.includes('@')) {
      setStatus('error')
      setErrorMessage('Please enter a valid email address.')
      return
    }

    setStatus('loading')
    setErrorMessage('')

    const result = await addToWaitlist(email, useCase || undefined)

    if (result.success) {
      setStatus('success')
      setEmail('')
      setUseCase('')
    } else {
      setStatus('error')
      setErrorMessage(result.error || 'An error occurred. Please try again.')
    }
  }

  return (
    <div className="mx-auto max-w-md">
      {status === 'success' ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-lg border border-cy/30 bg-cy/5 p-6 text-center"
          role="alert"
          aria-live="polite"
        >
          <div className="mb-2 text-2xl">✓</div>
          <h3 className="mb-2 text-lg font-semibold text-cy">You&apos;re on the list!</h3>
          <p className="text-sm text-fg/70">
            We&apos;ll reach out with early access.
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              disabled={status === 'loading'}
              className={cn(
                'w-full rounded-lg border border-fg/20 bg-bg/50 px-4 py-3 text-fg placeholder:text-fg/40 backdrop-blur-sm transition-all',
                'focus:border-cy focus:outline-none focus:ring-2 focus:ring-cy/20',
                'disabled:cursor-not-allowed disabled:opacity-50'
              )}
              aria-invalid={status === 'error'}
              aria-describedby={status === 'error' ? 'email-error' : undefined}
            />
            
            <label htmlFor="use-case" className="sr-only">
              How would you mainly use SetuAI?
            </label>
            <select
              id="use-case"
              value={useCase}
              onChange={(e) => setUseCase(e.target.value)}
              disabled={status === 'loading'}
              className={cn(
                'w-full rounded-lg border border-fg/20 bg-bg/50 px-4 py-3 text-fg backdrop-blur-sm transition-all',
                'focus:border-cy focus:outline-none focus:ring-2 focus:ring-cy/20',
                'disabled:cursor-not-allowed disabled:opacity-50',
                !useCase && 'text-fg/40'
              )}
            >
              <option value="">How would you mainly use SetuAI? (optional)</option>
              {useCaseOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <Button
            type="submit"
            variant="primary"
            disabled={status === 'loading'}
            className="w-full"
          >
            {status === 'loading' ? 'Joining...' : 'Join the waitlist'}
          </Button>

          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              id="email-error"
              className="rounded-lg border border-red-500/30 bg-red-500/5 p-3 text-sm text-red-400"
              role="alert"
              aria-live="assertive"
            >
              {errorMessage}
            </motion.div>
          )}

          <p className="text-center text-xs text-fg/50">
            No spam. Occasional build updates + an invite when we&apos;re ready.
          </p>
        </form>
      )}
    </div>
  )
}

