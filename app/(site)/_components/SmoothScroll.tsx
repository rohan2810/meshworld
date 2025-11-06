'use client'

import { useEffect } from 'react'

export function SmoothScroll() {
  useEffect(() => {
    // Smooth scroll for anchor links with easing
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]')
      
      if (anchor) {
        const href = anchor.getAttribute('href')
        if (href && href !== '#') {
          const targetElement = document.querySelector(href)
          if (targetElement) {
            e.preventDefault()
            const headerOffset = 80
            const elementPosition = targetElement.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset
            const startPosition = window.pageYOffset
            const distance = offsetPosition - startPosition
            const duration = 800
            let start: number | null = null

            const easeInOutCubic = (t: number) => {
              return t < 0.5
                ? 4 * t * t * t
                : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
            }

            const animation = (currentTime: number) => {
              if (start === null) start = currentTime
              const timeElapsed = currentTime - start
              const progress = Math.min(timeElapsed / duration, 1)
              const ease = easeInOutCubic(progress)
              
              window.scrollTo(0, startPosition + distance * ease)
              
              if (timeElapsed < duration) {
                requestAnimationFrame(animation)
              }
            }

            requestAnimationFrame(animation)
          }
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      document.removeEventListener('click', handleAnchorClick)
    }
  }, [])

  return null
}

