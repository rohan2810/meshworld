import { Container } from './Container'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-fg/10 bg-bg py-12">
      {/* Subtle gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cy/30 to-transparent" />

      <Container>
        <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          {/* Copyright */}
          <div className="text-sm text-fg/50">
            © {currentYear} MeshWorld. All rights reserved.
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <a
              href="mailto:hello@meshworld.com"
              className="text-fg/70 transition-colors hover:text-cy focus-visible:text-cy"
            >
              hello@meshworld.com
            </a>
            <span className="text-fg/50 cursor-not-allowed">
              Privacy
            </span>
            <span className="text-fg/50 cursor-not-allowed">
              Terms
            </span>
          </div>
        </div>
      </Container>
    </footer>
  )
}

