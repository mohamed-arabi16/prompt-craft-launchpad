import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Brain, Zap, Target, Trophy, Rocket, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';

interface TimelineItem {
  day: number;
  icon: React.ElementType;
  completed?: boolean;
}

interface CourseTimelineProps {
  currentDay?: number;
  className?: string;
}

const timelineItems: TimelineItem[] = [
  { day: 1, icon: Brain },
  { day: 2, icon: Zap },
  { day: 3, icon: Target },
  { day: 4, icon: Trophy },
  { day: 5, icon: Rocket },
];

/**
 * Animated course timeline showing progress through the 5-day program
 */
const CourseTimeline = ({ currentDay = 0, className }: CourseTimelineProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useTranslation();

  return (
    <div ref={ref} className={cn('relative py-8', className)}>
      {/* Background line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />

      {/* Animated progress line */}
      <motion.div
        className="absolute left-1/2 top-0 w-0.5 bg-gradient-to-b from-primary to-cyan -translate-x-1/2"
        initial={{ height: 0 }}
        animate={isInView ? { height: `${Math.min(currentDay / 5, 1) * 100}%` } : { height: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
      />

      <div className="relative flex flex-col gap-16">
        {timelineItems.map((item, index) => {
          const isCompleted = item.day <= currentDay;
          const isCurrent = item.day === currentDay;
          const IconComponent = item.icon;

          return (
            <motion.div
              key={item.day}
              className="relative flex items-center"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Content - alternating sides */}
              <div
                className={cn(
                  'w-[calc(50%-40px)] px-6',
                  index % 2 === 0 ? 'text-right' : 'ml-auto text-left'
                )}
              >
                <motion.div
                  className={cn(
                    'p-4 rounded-xl border transition-all duration-300',
                    isCompleted
                      ? 'bg-primary/10 border-primary/30'
                      : 'bg-card/50 border-border hover:border-primary/20',
                    isCurrent && 'ring-2 ring-primary/50 ring-offset-2 ring-offset-background'
                  )}
                  whileHover={{ scale: 1.02 }}
                >
                  <h4 className="font-semibold text-foreground mb-1">
                    {t(`day${item.day}Title`) || `Day ${item.day}`}
                  </h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {t(`day${item.day}Description`) || `Learn essential skills on day ${item.day}`}
                  </p>

                  {isCompleted && (
                    <div className="flex items-center gap-1 mt-2 text-primary text-sm">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{t('completed') || 'Completed'}</span>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Center node */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 z-10"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                  delay: index * 0.2 + 0.3
                }}
              >
                <div
                  className={cn(
                    'w-16 h-16 rounded-full flex items-center justify-center',
                    'border-4 transition-all duration-500',
                    isCompleted
                      ? 'bg-primary border-primary text-primary-foreground'
                      : 'bg-card border-border text-muted-foreground',
                    isCurrent && 'animate-pulse shadow-lg shadow-primary/50'
                  )}
                >
                  <IconComponent className="w-7 h-7" />
                </div>

                {/* Day number badge */}
                <div
                  className={cn(
                    'absolute -top-2 -right-2 w-6 h-6 rounded-full',
                    'flex items-center justify-center text-xs font-bold',
                    isCompleted
                      ? 'bg-cyan text-cyan-foreground'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  {item.day}
                </div>

                {/* Pulse animation for current day */}
                {isCurrent && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary/30"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Progress indicator */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 1.2 }}
      >
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-card/50 border border-border">
          <span className="text-muted-foreground">
            {t('progress') || 'Progress'}:
          </span>
          <span className="text-2xl font-bold text-primary">
            {Math.round((currentDay / 5) * 100)}%
          </span>
          <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-cyan"
              initial={{ width: 0 }}
              animate={isInView ? { width: `${(currentDay / 5) * 100}%` } : { width: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CourseTimeline;
