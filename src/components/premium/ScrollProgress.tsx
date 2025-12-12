import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ScrollProgressProps {
  position?: 'top' | 'bottom' | 'left' | 'right';
  color?: 'primary' | 'gradient';
  height?: number;
  showPercentage?: boolean;
  className?: string;
}

/**
 * Animated scroll progress indicator
 */
const ScrollProgress = ({
  position = 'top',
  color = 'gradient',
  height = 3,
  showPercentage = false,
  className,
}: ScrollProgressProps) => {
  const { scrollYProgress } = useScroll();
  const [percentValue, setPercentValue] = useState(0);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Always call useTransform at the top level
  const percentage = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Use motion value event to track percentage for display
  useMotionValueEvent(percentage, "change", (latest) => {
    setPercentValue(Math.round(latest));
  });

  const positionStyles = {
    top: 'top-0 left-0 right-0',
    bottom: 'bottom-0 left-0 right-0',
    left: 'top-0 bottom-0 left-0',
    right: 'top-0 bottom-0 right-0',
  };

  const isHorizontal = position === 'top' || position === 'bottom';

  const colorStyles = {
    primary: 'bg-primary',
    gradient: 'bg-gradient-to-r from-primary via-cyan to-primary',
  };

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className={cn(
          'fixed z-50',
          positionStyles[position],
          colorStyles[color],
          className
        )}
        style={{
          [isHorizontal ? 'height' : 'width']: height,
          scaleX: isHorizontal ? scaleX : 1,
          scaleY: isHorizontal ? 1 : scaleX,
          transformOrigin: isHorizontal ? 'left' : 'top',
        }}
      >
        {/* Glow effect */}
        <div
          className="absolute inset-0 blur-sm"
          style={{
            background: 'inherit',
            opacity: 0.5,
          }}
        />
      </motion.div>

      {/* Percentage indicator */}
      {showPercentage && (
        <div
          className="fixed z-50 bg-card/90 backdrop-blur-sm px-3 py-1 rounded-full
                     border border-border text-xs font-medium text-foreground"
          style={{
            top: position === 'top' ? height + 8 : 'auto',
            bottom: position === 'bottom' ? height + 8 : 'auto',
            right: 16,
          }}
        >
          <span>{percentValue}%</span>
        </div>
      )}
    </>
  );
};

/**
 * Individual section marker component
 */
const SectionMarker = ({
  section,
  index,
  sectionProgress,
  scrollYProgress,
}: {
  section: string;
  index: number;
  sectionProgress: number;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) => {
  const [isActive, setIsActive] = useState(false);

  // Track when this section becomes active
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsActive(latest >= sectionProgress - 0.1);
  });

  return (
    <motion.div
      className="relative flex items-center gap-3"
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      {/* Marker dot */}
      <div
        className="w-3 h-3 rounded-full border-2 transition-colors duration-300"
        style={{
          borderColor: isActive ? 'hsl(var(--primary))' : 'hsl(var(--border))',
          backgroundColor: isActive ? 'hsl(var(--primary))' : 'transparent',
        }}
      />

      {/* Section label */}
      <span
        className="text-xs whitespace-nowrap transition-colors duration-300"
        style={{
          color: isActive ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))',
        }}
      >
        {section}
      </span>
    </motion.div>
  );
};

/**
 * Section-based scroll progress with markers
 */
export const SectionScrollProgress = ({
  sections,
  className,
}: {
  sections: string[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();

  return (
    <div className={cn('fixed right-6 top-1/2 -translate-y-1/2 z-50', className)}>
      <div className="relative">
        {/* Background line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />

        {/* Progress line */}
        <motion.div
          className="absolute left-1/2 top-0 w-0.5 bg-primary -translate-x-1/2 origin-top"
          style={{ scaleY: scrollYProgress, height: '100%' }}
        />

        {/* Section markers */}
        <div className="relative flex flex-col gap-8 py-4">
          {sections.map((section, index) => {
            const sectionProgress = (index + 1) / sections.length;

            return (
              <SectionMarker
                key={section}
                section={section}
                index={index}
                sectionProgress={sectionProgress}
                scrollYProgress={scrollYProgress}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ScrollProgress;
