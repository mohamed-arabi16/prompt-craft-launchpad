import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode, useRef } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  glow?: boolean;
}

/**
 * Premium magnetic button with smooth follow effect
 */
const MagneticButton = ({
  children,
  className,
  strength = 0.3,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  glow = true,
}: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [-50, 50], [5, -5]);
  const rotateY = useTransform(springX, [-50, 50], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const variants = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
    outline: 'border-2 border-primary text-foreground hover:bg-primary hover:text-primary-foreground',
    ghost: 'text-foreground hover:bg-muted',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const glowStyles = glow && variant === 'primary'
    ? 'shadow-[0_0_20px_rgba(0,157,176,0.4)] hover:shadow-[0_0_30px_rgba(0,157,176,0.6)]'
    : '';

  return (
    <motion.button
      ref={ref}
      style={{
        x: springX,
        y: springY,
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'relative font-semibold rounded-xl transition-all duration-300',
        'transform-gpu will-change-transform',
        variants[variant],
        sizes[size],
        glowStyles,
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {/* Shine effect */}
      <span className="absolute inset-0 rounded-xl overflow-hidden">
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      </span>

      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};

export default MagneticButton;
