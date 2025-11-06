'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from './Button'
import { Container } from './Container'
import { cn } from '@/lib/utils'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-bg/80 backdrop-blur-lg border-b border-fg/10 shadow-lg shadow-cy/5'
          : 'bg-transparent'
      )}
    >
      {isScrolled && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cy/5 via-vi/5 to-am/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
      <Container>
        <nav className="relative flex h-20 items-center justify-between" aria-label="Main navigation">
          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="text-2xl font-bold tracking-tight text-fg transition-colors hover:text-cy focus-visible:text-cy"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-gradient">
              MeshWorld
            </span>
          </motion.a>

          {/* Navigation Links */}
          <div className="hidden items-center gap-8 md:flex">
            {[
              { href: 'how-it-works', label: 'How It Works' },
              { href: 'features', label: 'Features' },
              { href: 'tech', label: 'Technology' },
              { href: 'cta', label: 'Join' },
            ].map((link, index) => (
              <motion.a
                key={link.href}
                href={`#${link.href}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(link.href)
                }}
                className="relative text-sm font-medium text-fg/70 transition-colors hover:text-cy focus-visible:text-cy"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                {link.label}
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cy to-vi"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="primary"
              size="sm"
              onClick={() => scrollToSection('cta')}
              className="shadow-lg shadow-cy/30"
            >
              Join Waitlist
            </Button>
          </motion.div>
        </nav>
      </Container>
    </motion.header>
  )
}

