'use client'

import Image from 'next/image'
import { Container } from './Container'

export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-fg/10 bg-bg py-12">
      {/* Subtle gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cy/30 to-transparent" />

      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Logo / Name */}
          <div className="text-center md:text-left">
            <div className="mb-4 flex items-center justify-center gap-2 md:justify-start">
              <Image 
                src="/img/logo.png" 
                alt="SetuAI Logo" 
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <div className="text-lg font-semibold text-fg">SetuAI</div>
            </div>
            <div className="text-sm text-fg/50">
              © {currentYear} SetuAI. All rights reserved.
            </div>
            <div className="mt-2 text-xs text-fg/50">
              Built with a privacy-first approach to personal data.
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center gap-4 md:items-end">
            <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="text-fg/70 transition-colors hover:text-cy focus-visible:text-cy"
              >
                How it works
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="text-fg/70 transition-colors hover:text-cy focus-visible:text-cy"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('privacy')}
                className="text-fg/70 transition-colors hover:text-cy focus-visible:text-cy"
              >
                Privacy
              </button>
              <a
                href="mailto:hello@setuai.com"
                className="text-fg/70 transition-colors hover:text-cy focus-visible:text-cy"
              >
                Contact
              </a>
            </nav>
          </div>
        </div>
      </Container>
    </footer>
  )
}

