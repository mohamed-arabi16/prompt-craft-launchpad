import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'default' | 'circular' | 'text' | 'card';
  width?: string | number;
  height?: string | number;
  animate?: boolean;
}

/**
 * Premium skeleton loader with shimmer effect
 */
export const Skeleton = ({
  className,
  variant = 'default',
  width,
  height,
  animate = true,
}: SkeletonProps) => {
  const variants = {
    default: 'rounded-lg',
    circular: 'rounded-full',
    text: 'rounded h-4',
    card: 'rounded-2xl',
  };

  return (
    <motion.div
      className={cn(
        'relative overflow-hidden bg-muted/50',
        variants[variant],
        className
      )}
      style={{ width, height }}
      initial={{ opacity: 0.5 }}
      animate={animate ? { opacity: [0.5, 0.8, 0.5] } : undefined}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {/* Shimmer effect */}
      {animate && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}
    </motion.div>
  );
};

/**
 * Card skeleton for course cards, benefit cards, etc.
 */
export const CardSkeleton = ({ className }: { className?: string }) => (
  <div className={cn('p-6 space-y-4', className)}>
    <Skeleton variant="circular" width={64} height={64} />
    <Skeleton variant="text" className="w-3/4" height={24} />
    <div className="space-y-2">
      <Skeleton variant="text" className="w-full" />
      <Skeleton variant="text" className="w-5/6" />
      <Skeleton variant="text" className="w-4/6" />
    </div>
  </div>
);

/**
 * Hero section skeleton
 */
export const HeroSkeleton = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center max-w-5xl mx-auto px-6 space-y-6">
      <Skeleton className="w-48 h-10 mx-auto" variant="default" />
      <Skeleton className="w-full max-w-3xl h-20 mx-auto" variant="default" />
      <Skeleton className="w-full max-w-2xl h-16 mx-auto" variant="default" />
      <div className="flex gap-4 justify-center">
        <Skeleton className="w-40 h-14" variant="default" />
        <Skeleton className="w-40 h-14" variant="default" />
      </div>
    </div>
  </div>
);

/**
 * Course day skeleton
 */
export const DaySkeleton = () => (
  <div className="rounded-xl border border-border overflow-hidden">
    <div className="p-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Skeleton variant="default" width={48} height={48} className="rounded-lg" />
        <div className="space-y-2">
          <Skeleton variant="text" width={200} />
          <Skeleton variant="text" width={150} />
        </div>
      </div>
      <Skeleton variant="circular" width={24} height={24} />
    </div>
  </div>
);

/**
 * Testimonial skeleton
 */
export const TestimonialSkeleton = () => (
  <div className="p-8 space-y-4">
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} variant="circular" width={20} height={20} />
      ))}
    </div>
    <div className="space-y-2">
      <Skeleton variant="text" className="w-full" />
      <Skeleton variant="text" className="w-full" />
      <Skeleton variant="text" className="w-3/4" />
    </div>
    <div className="flex items-center gap-3">
      <Skeleton variant="circular" width={48} height={48} />
      <div className="space-y-2">
        <Skeleton variant="text" width={120} />
        <Skeleton variant="text" width={80} />
      </div>
    </div>
  </div>
);

/**
 * Dashboard skeleton
 */
export const DashboardSkeleton = () => (
  <div className="space-y-8">
    {/* Header */}
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <Skeleton variant="text" width={200} height={32} />
        <Skeleton variant="text" width={300} />
      </div>
      <Skeleton variant="circular" width={80} height={80} />
    </div>

    {/* Stats */}
    <div className="grid grid-cols-3 gap-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="p-4 rounded-xl border border-border space-y-2">
          <Skeleton variant="text" width={80} />
          <Skeleton variant="text" width={60} height={32} />
        </div>
      ))}
    </div>

    {/* Content */}
    <div className="grid md:grid-cols-2 gap-6">
      {[...Array(4)].map((_, i) => (
        <CardSkeleton key={i} className="rounded-xl border border-border" />
      ))}
    </div>
  </div>
);

/**
 * Table skeleton for admin panel
 */
export const TableSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <div className="space-y-2">
    {/* Header */}
    <div className="flex gap-4 p-4 border-b border-border">
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} variant="text" className="flex-1" />
      ))}
    </div>

    {/* Rows */}
    {[...Array(rows)].map((_, rowIdx) => (
      <div key={rowIdx} className="flex gap-4 p-4 border-b border-border/50">
        {[...Array(5)].map((_, colIdx) => (
          <Skeleton key={colIdx} variant="text" className="flex-1" />
        ))}
      </div>
    ))}
  </div>
);

export default Skeleton;
