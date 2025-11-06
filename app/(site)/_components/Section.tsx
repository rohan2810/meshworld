import { Container } from './Container'
import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  id?: string
  'aria-labelledby'?: string
  as?: 'section' | 'div'
  fullScreen?: boolean
}

export function Section({
  children,
  className,
  containerClassName,
  id,
  'aria-labelledby': ariaLabelledBy,
  as: Component = 'section',
  fullScreen = false,
}: SectionProps) {
  return (
    <Component
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn(
        'relative snap-section',
        fullScreen ? 'min-h-screen flex items-center' : 'py-20 lg:py-32',
        className
      )}
    >
      <Container className={cn('w-full', containerClassName)}>{children}</Container>
    </Component>
  )
}

