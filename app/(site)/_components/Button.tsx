import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cy focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-gradient-luminous text-bg font-semibold hover:shadow-2xl hover:shadow-cy/40 hover:scale-[1.05] active:scale-[0.98] transition-all duration-300 relative overflow-hidden group',
        secondary:
          'border-2 border-cy/60 bg-bg/60 text-cy hover:bg-cy/15 hover:border-cy hover:shadow-xl hover:shadow-cy/30 backdrop-blur-md transition-all duration-300 hover:scale-105',
        ghost: 'text-fg hover:bg-fg/10 hover:text-cy transition-all duration-300',
      },
      size: {
        default: 'h-12 px-6 py-2 text-base',
        sm: 'h-9 px-4 text-sm',
        lg: 'h-14 px-8 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export function Button({ className, variant, size, children, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size, className }))} {...props}>
      {variant === 'primary' && (
        <span className="absolute inset-0 -z-10 bg-gradient-luminous-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  )
}

