'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface VideoBackgroundProps {
  src: string
  poster?: string
  overlayOpacity?: number
  className?: string
  children?: React.ReactNode
}

export function VideoBackground({
  src,
  poster,
  overlayOpacity = 0.6,
  className,
  children,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleCanPlay = () => {
      setIsLoaded(true)
    }

    const handleError = () => {
      setHasError(true)
    }

    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('error', handleError)
    
    return () => {
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('error', handleError)
    }
  }, [])

  return (
    <div className={cn('relative h-full w-full overflow-hidden', className)}>
      {/* Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster={poster}
        className={cn(
          'absolute inset-0 h-full w-full object-cover transition-opacity duration-1000',
          isLoaded && !hasError ? 'opacity-100' : 'opacity-0'
        )}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Fallback gradient background if video fails to load */}
      {(hasError || !isLoaded) && (
        <div className="absolute inset-0 bg-gradient-to-br from-bg via-bg to-vi/10" />
      )}

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-bg"
        style={{ opacity: overlayOpacity }}
        aria-hidden="true"
      />

      {/* Content */}
      {children && <div className="relative z-10 h-full">{children}</div>}
    </div>
  )
}
