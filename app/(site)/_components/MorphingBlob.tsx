'use client'

import { motion } from 'framer-motion'

interface MorphingBlobProps {
  color?: 'cy' | 'vi' | 'am' | 'pink'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function MorphingBlob({ color = 'cy', size = 'md', className = '' }: MorphingBlobProps) {
  const sizeClasses = {
    sm: 'w-64 h-64',
    md: 'w-96 h-96',
    lg: 'w-[600px] h-[600px]',
  }

  const colorClasses = {
    cy: 'bg-cy/20',
    vi: 'bg-vi/20',
    am: 'bg-am/20',
    pink: 'bg-pink/20',
  }

  return (
    <motion.div
      className={`morphing-blob ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
      style={{
        filter: 'blur(80px)',
      }}
      animate={{
        borderRadius: [
          '60% 40% 30% 70% / 60% 30% 70% 40%',
          '30% 60% 70% 40% / 50% 60% 30% 60%',
          '50% 60% 30% 60% / 30% 60% 70% 40%',
          '60% 40% 60% 30% / 70% 30% 60% 40%',
          '60% 40% 30% 70% / 60% 30% 70% 40%',
        ],
        scale: [1, 1.1, 0.9, 1.05, 1],
        rotate: [0, 5, -5, 3, 0],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

