'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [trails, setTrails] = useState<Array<{ x: number; y: number; id: number }>>([])
  const trailIdRef = useRef(0)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    // Only enable custom cursor on desktop with fine pointer
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    setIsVisible(mediaQuery.matches)

    const handleMouseMove = (e: MouseEvent) => {
      if (!mediaQuery.matches) return

      cursorX.set(e.clientX - 15)
      cursorY.set(e.clientY - 15)

      // Add trail
      const newTrail = { x: e.clientX - 4, y: e.clientY - 4, id: trailIdRef.current++ }
      setTrails((prev) => [...prev.slice(-10), newTrail])

      // Remove trail after delay
      setTimeout(() => {
        setTrails((prev) => prev.filter((t) => t.id !== newTrail.id))
      }, 500)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [cursorX, cursorY])

  if (!isVisible) return null

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="cursor-glow"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />

      {/* Cursor trails */}
      {trails.map((trail) => (
        <motion.div
          key={trail.id}
          className="cursor-trail"
          initial={{ x: trail.x, y: trail.y, opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      ))}
    </>
  )
}

