import { Header } from './_components/Header'
import { Footer } from './_components/Footer'
import { CustomCursor } from './_components/CustomCursor'
import { SmoothScroll } from './_components/SmoothScroll'
import { PerformanceOptimizer } from './_components/PerformanceOptimizer'
import { Hero } from './_sections/Hero'
import { Problem } from './_sections/Problem'
import { HowItWorks } from './_sections/HowItWorks'
import { Features } from './_sections/Features'
import { Tech } from './_sections/Tech'
import { Demo } from './_sections/Demo'
import { Privacy } from './_sections/Privacy'
import { UseCases } from './_sections/UseCases'
import { CTA } from './_sections/CTA'

export default function HomePage() {
  return (
    <>
      <SmoothScroll />
      <PerformanceOptimizer />
      <CustomCursor />
      <Header />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <UseCases />
        <Features />
        <Tech />
        <Demo />
        <Privacy />
        <CTA />
      </main>
      <Footer />
    </>
  )
}

