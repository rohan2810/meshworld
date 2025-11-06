import { Header } from './_components/Header'
import { Footer } from './_components/Footer'
import { CustomCursor } from './_components/CustomCursor'
import { SmoothScroll } from './_components/SmoothScroll'
import { Hero } from './_sections/Hero'
import { Problem } from './_sections/Problem'
import { HowItWorks } from './_sections/HowItWorks'
import { Features } from './_sections/Features'
import { Tech } from './_sections/Tech'
import { CTA } from './_sections/CTA'

export default function HomePage() {
  return (
    <>
      <SmoothScroll />
      <CustomCursor />
      <Header />
      <main className="snap-y snap-mandatory">
        <Hero />
        <Problem />
        <HowItWorks />
        <Features />
        <Tech />
        <CTA />
      </main>
      <Footer />
    </>
  )
}

