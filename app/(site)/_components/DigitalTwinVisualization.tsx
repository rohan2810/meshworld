'use client'

import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface DigitalTwinVisualizationProps {
  className?: string
  showLearning?: boolean
  showConnection?: boolean
  twinCount?: number
}

export function DigitalTwinVisualization({
  className,
  showLearning = false,
  showConnection = false,
  twinCount = 2,
}: DigitalTwinVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Create nodes (experiences)
    const nodes: Array<{
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      color: string
      pulse: number
    }> = []

    const w = canvas.offsetWidth
    const h = canvas.offsetHeight
    const numNodes = 30

    for (let i = 0; i < numNodes; i++) {
      const colors = ['#58FFE0', '#A78BFA', '#FBBF24']
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 4 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI * 2,
      })
    }

    // Twin clusters (if showing connection)
    const twinClusters: Array<{ x: number; y: number; nodes: number[] }> = []
    if (showConnection && twinCount >= 2) {
      for (let i = 0; i < twinCount; i++) {
        const clusterX = (w / (twinCount + 1)) * (i + 1)
        const clusterY = h / 2
        const clusterNodes: number[] = []
        
        // Assign nodes to clusters
        nodes.forEach((node, idx) => {
          const dist = Math.sqrt(Math.pow(node.x - clusterX, 2) + Math.pow(node.y - clusterY, 2))
          if (dist < w / (twinCount + 1) / 2) {
            clusterNodes.push(idx)
          }
        })
        
        twinClusters.push({ x: clusterX, y: clusterY, nodes: clusterNodes })
      }
    }

    let animationFrameId: number
    const animate = () => {
      ctx.clearRect(0, 0, w, h)

      // Update nodes
      nodes.forEach((node) => {
        node.x += node.vx
        node.y += node.vy

        // Bounce off edges
        if (node.x < 0 || node.x > w) node.vx *= -1
        if (node.y < 0 || node.y > h) node.vy *= -1

        // Keep in bounds
        node.x = Math.max(0, Math.min(w, node.x))
        node.y = Math.max(0, Math.min(h, node.y))

        // Pulse animation
        node.pulse += 0.05
      })

      // Draw connections
      if (showConnection && twinClusters.length >= 2) {
        // Draw connections within clusters
        twinClusters.forEach((cluster) => {
          cluster.nodes.forEach((i) => {
            cluster.nodes.forEach((j) => {
              if (i < j) {
                const node1 = nodes[i]
                const node2 = nodes[j]
                const dx = node1.x - node2.x
                const dy = node1.y - node2.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < 100) {
                  ctx.beginPath()
                  ctx.moveTo(node1.x, node1.y)
                  ctx.lineTo(node2.x, node2.y)
                  const opacity = (1 - distance / 100) * 0.3
                  ctx.strokeStyle = `rgba(167, 139, 250, ${opacity})`
                  ctx.lineWidth = 1
                  ctx.stroke()
                }
              }
            })
          })
        })

        // Draw connections between clusters
        for (let i = 0; i < twinClusters.length; i++) {
          for (let j = i + 1; j < twinClusters.length; j++) {
            const cluster1 = twinClusters[i]
            const cluster2 = twinClusters[j]
            
            // Connect some nodes between clusters
            cluster1.nodes.slice(0, 3).forEach((nodeIdx1) => {
              cluster2.nodes.slice(0, 3).forEach((nodeIdx2) => {
                const node1 = nodes[nodeIdx1]
                const node2 = nodes[nodeIdx2]
                ctx.beginPath()
                ctx.moveTo(node1.x, node1.y)
                ctx.lineTo(node2.x, node2.y)
                ctx.strokeStyle = 'rgba(88, 255, 224, 0.4)'
                ctx.lineWidth = 2
                ctx.stroke()
              })
            })
          }
        }
      } else {
        // Draw connections between all nodes
        nodes.forEach((node1, i) => {
          nodes.slice(i + 1).forEach((node2) => {
            const dx = node1.x - node2.x
            const dy = node1.y - node2.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 120) {
              ctx.beginPath()
              ctx.moveTo(node1.x, node1.y)
              ctx.lineTo(node2.x, node2.y)
              const opacity = (1 - distance / 120) * 0.2
              ctx.strokeStyle = `rgba(167, 139, 250, ${opacity})`
              ctx.lineWidth = 1
              ctx.stroke()
            }
          })
        })
      }

      // Draw nodes
      nodes.forEach((node) => {
        const pulseRadius = node.radius + Math.sin(node.pulse) * 2
        
        // Outer glow
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, pulseRadius * 3)
        gradient.addColorStop(0, node.color + '80')
        gradient.addColorStop(1, node.color + '00')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(node.x, node.y, pulseRadius * 3, 0, Math.PI * 2)
        ctx.fill()

        // Node
        ctx.fillStyle = node.color
        ctx.beginPath()
        ctx.arc(node.x, node.y, pulseRadius, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw preference vector (if learning)
      if (showLearning) {
        const centerX = w / 2
        const centerY = h / 2
        const vectorLength = 80
        const angle = Date.now() / 2000

        ctx.strokeStyle = '#58FFE0'
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(
          centerX + Math.cos(angle) * vectorLength,
          centerY + Math.sin(angle) * vectorLength
        )
        ctx.stroke()

        // Arrowhead
        const arrowSize = 10
        const arrowAngle = Math.atan2(
          Math.sin(angle) * vectorLength,
          Math.cos(angle) * vectorLength
        )
        ctx.beginPath()
        ctx.moveTo(
          centerX + Math.cos(angle) * vectorLength,
          centerY + Math.sin(angle) * vectorLength
        )
        ctx.lineTo(
          centerX + Math.cos(angle) * vectorLength - arrowSize * Math.cos(arrowAngle - Math.PI / 6),
          centerY + Math.sin(angle) * vectorLength - arrowSize * Math.sin(arrowAngle - Math.PI / 6)
        )
        ctx.moveTo(
          centerX + Math.cos(angle) * vectorLength,
          centerY + Math.sin(angle) * vectorLength
        )
        ctx.lineTo(
          centerX + Math.cos(angle) * vectorLength - arrowSize * Math.cos(arrowAngle + Math.PI / 6),
          centerY + Math.sin(angle) * vectorLength - arrowSize * Math.sin(arrowAngle + Math.PI / 6)
        )
        ctx.stroke()
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [shouldReduceMotion, showLearning, showConnection, twinCount])

  if (shouldReduceMotion) {
    return (
      <div className={cn('flex h-full items-center justify-center', className)}>
        <div className="radial-glow-vi h-64 w-64 rounded-full" />
      </div>
    )
  }

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={cn('h-full w-full', className)}
      aria-hidden="true"
    />
  )
}

