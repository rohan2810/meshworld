'use client'

import { useEffect } from 'react'

export function PerformanceOptimizer() {
  useEffect(() => {
    // Pause animations when scrolling for better performance
    let scrollTimeout: NodeJS.Timeout
    let isScrolling = false

    const handleScroll = () => {
      if (!isScrolling) {
        isScrolling = true
        document.body.classList.add('is-scrolling')
      }

      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        isScrolling = false
        document.body.classList.remove('is-scrolling')
      }, 150)
    }

    // Use Intersection Observer to pause off-screen animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
          } else {
            entry.target.classList.remove('in-view')
          }
        })
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    )

    // Observe all sections and heavy components
    const sections = document.querySelectorAll('section, .particles, .morphing-blob')
    sections.forEach((section) => observer.observe(section))

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
      clearTimeout(scrollTimeout)
    }
  }, [])

  return null
}

