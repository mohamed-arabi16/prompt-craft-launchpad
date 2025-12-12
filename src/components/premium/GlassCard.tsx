import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { cardHover } from '@/lib/animations';
import { ReactNode } from 'react';

interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  variant?: 'default' | 'subtle' | 'strong' | 'gradient';
  glow?: boolean;
  interactive?: boolean;
  className?: string;
}

/**
 * Premium glassmorphism card component with frosted glass effect
 */
const GlassCard = ({
  children,
  variant = 'default',
  glow = false,
  interactive = true,
  className,
  ...props
}: GlassCardProps) => {
  const variants = {
    default: 'bg-card/40 backdrop-blur-xl border-white/10',
    subtle: 'bg-card/20 backdrop-blur-md border-white/5',
    strong: 'bg-card/60 backdrop-blur-2xl border-white/20',
    gradient: 'bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-xl border-white/10',
  };

  const glowStyles = glow
    ? 'shadow-[0_0_30px_rgba(0,157,176,0.15)] hover:shadow-[0_0_50px_rgba(0,157,176,0.25)]'
    : '';

  return (
    <motion.div
      variants={interactive ? cardHover : undefined}
      initial="rest"
      whileHover={interactive ? 'hover' : undefined}
      className={cn(
        'relative rounded-2xl border p-6 transition-all duration-500',
        variants[variant],
        glowStyles,
        interactive && 'cursor-pointer',
        className
      )}
      {...props}
    >
      {/* Gradient overlay for extra depth */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 rounded-2xl opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default GlassCard;
