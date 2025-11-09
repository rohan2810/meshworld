'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from './Button'
import { Container } from './Container'
import { cn } from '@/lib/utils'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Close mobile menu when clicking outside or on a link
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

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
        <nav className="relative flex h-16 md:h-20 items-center justify-between" aria-label="Main navigation">
          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              setIsMobileMenuOpen(false)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="flex items-center gap-2 text-xl md:text-2xl font-bold tracking-tight text-fg transition-colors hover:text-cy focus-visible:text-cy"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image 
              src="/img/logo.png" 
              alt="SetuAI Logo" 
              width={40}
              height={40}
              className="h-8 w-8 md:h-10 md:w-10"
              priority
            />
            <span className="text-gradient">
              SetuAI
            </span>
          </motion.a>

          {/* Desktop Navigation Links */}
          <div className="hidden items-center gap-6 lg:gap-8 md:flex">
            {[
              { href: 'how-it-works', label: 'How It Works' },
              { href: 'use-cases', label: 'Use Cases' },
              { href: 'features', label: 'Features' },
              { href: 'demo', label: 'Demo' },
            ].map((link, index) => (
              <motion.a
                key={link.href}
                href={`#${link.href}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(link.href)
                }}
                className="relative text-sm font-medium text-fg/70 transition-colors hover:text-cy focus-visible:text-cy touch-manipulation"
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

          {/* Desktop CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block"
          >
            <Button
              variant="primary"
              size="sm"
              onClick={() => scrollToSection('cta')}
              className="shadow-lg shadow-cy/30 min-h-[44px]"
            >
              Join Waitlist
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative z-50 flex h-11 w-11 items-center justify-center rounded-lg bg-fg/10 text-fg transition-colors hover:bg-fg/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cy touch-manipulation"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute"
              animate={isMobileMenuOpen ? { rotate: 90 } : { rotate: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </motion.div>
          </motion.button>
        </nav>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="md:hidden overflow-hidden"
        >
          <div className="border-t border-fg/10 py-4 space-y-2">
            {[
              { href: 'how-it-works', label: 'How It Works' },
              { href: 'use-cases', label: 'Use Cases' },
              { href: 'features', label: 'Features' },
              { href: 'demo', label: 'Try Demo' },
              { href: 'cta', label: 'Join Waitlist' },
            ].map((link) => (
              <motion.a
                key={link.href}
                href={`#${link.href}`}
                onClick={(e) => {
                  e.preventDefault()
                  setIsMobileMenuOpen(false)
                  scrollToSection(link.href)
                }}
                className="block px-4 py-3 text-base font-medium text-fg/70 transition-colors hover:text-cy hover:bg-fg/5 rounded-lg touch-manipulation min-h-[44px] flex items-center"
              >
                {link.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </Container>
    </motion.header>
  )
}

