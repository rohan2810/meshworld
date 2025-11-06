'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
  className?: string
  index?: number
}

export function FeatureCard({ title, description, icon, className, index = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        'group relative rounded-2xl border border-fg/10 glass p-8 transition-all duration-500 hover:border-cy/50 hover:shadow-2xl hover:shadow-cy/30',
        className
      )}
      whileHover={{ y: -8, scale: 1.03 }}
    >
      {/* Animated gradient glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
        initial={{ scale: 0.8, opacity: 0 }}
        whileHover={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cy/30 via-vi/20 to-transparent animate-gradient-xy" />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tl from-am/20 via-transparent to-cy/20 animate-gradient-xy" style={{ animationDelay: '1s' }} />
      </motion.div>

      <div className="relative">
        {/* Icon */}
        <motion.div 
          className="mb-6 text-cy group-hover:text-vi transition-colors duration-300"
          whileHover={{ scale: 1.2, rotate: 10, y: -5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.div
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(0, 245, 255, 0)',
                '0 0 20px 10px rgba(0, 245, 255, 0.2)',
                '0 0 0 0 rgba(0, 245, 255, 0)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="rounded-full inline-block"
          >
            {icon}
          </motion.div>
        </motion.div>

        {/* Title */}
        <h3 className="mb-3 text-xl font-semibold text-fg group-hover:text-gradient transition-all duration-300">{title}</h3>

        {/* Description */}
        <p className="text-fg/70 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}

