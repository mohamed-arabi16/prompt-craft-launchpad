import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface ProgressRingProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  className?: string;
  showPercentage?: boolean;
  label?: string;
  color?: 'primary' | 'cyan' | 'gradient';
  animated?: boolean;
}

/**
 * Animated circular progress ring with gradient support
 */
const ProgressRing = ({
  progress,
  size = 120,
  strokeWidth = 8,
  className,
  showPercentage = true,
  label,
  color = 'gradient',
  animated = true,
}: ProgressRingProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const colorClasses = {
    primary: 'stroke-primary',
    cyan: 'stroke-cyan',
    gradient: '',
  };

  const gradientId = `progress-gradient-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div ref={ref} className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Gradient definition */}
        {color === 'gradient' && (
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(187 100% 35%)" />
              <stop offset="100%" stopColor="hsl(180 100% 34%)" />
            </linearGradient>
          </defs>
        )}

        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted/30"
        />

        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color === 'gradient' ? `url(#${gradientId})` : undefined}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={
            isInView && animated
              ? { strokeDashoffset }
              : animated
              ? { strokeDashoffset: circumference }
              : { strokeDashoffset }
          }
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className={cn(color !== 'gradient' && colorClasses[color])}
          style={{
            filter: 'drop-shadow(0 0 6px hsl(187 100% 35% / 0.5))',
          }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {showPercentage && (
          <motion.span
            className="text-2xl font-bold text-foreground"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            {Math.round(progress)}%
          </motion.span>
        )}
        {label && (
          <motion.span
            className="text-xs text-muted-foreground mt-1"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.7, duration: 0.3 }}
          >
            {label}
          </motion.span>
        )}
      </div>
    </div>
  );
};

/**
 * Multiple progress rings for dashboard stats
 */
export const ProgressRingGroup = ({
  items,
  className,
}: {
  items: Array<{ progress: number; label: string; color?: 'primary' | 'cyan' | 'gradient' }>;
  className?: string;
}) => {
  return (
    <div className={cn('flex items-center justify-center gap-8 flex-wrap', className)}>
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <ProgressRing
            progress={item.progress}
            label={item.label}
            color={item.color}
            size={100}
            strokeWidth={6}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default ProgressRing;
