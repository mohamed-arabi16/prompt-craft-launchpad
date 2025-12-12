import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
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
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const percentage = useTransform(scrollYProgress, [0, 1], [0, 100]);

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
        <motion.div
          className="fixed z-50 bg-card/90 backdrop-blur-sm px-3 py-1 rounded-full
                     border border-border text-xs font-medium text-foreground"
          style={{
            top: position === 'top' ? height + 8 : 'auto',
            bottom: position === 'bottom' ? height + 8 : 'auto',
            right: 16,
          }}
        >
          <motion.span>{useTransform(percentage, (v) => `${Math.round(v)}%`)}</motion.span>
        </motion.div>
      )}
    </>
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
              <motion.div
                key={section}
                className="relative flex items-center gap-3"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Marker dot */}
                <motion.div
                  className="w-3 h-3 rounded-full border-2 transition-colors duration-300"
                  style={{
                    borderColor: useTransform(
                      scrollYProgress,
                      [sectionProgress - 0.1, sectionProgress],
                      ['hsl(var(--border))', 'hsl(var(--primary))']
                    ),
                    backgroundColor: useTransform(
                      scrollYProgress,
                      [sectionProgress - 0.1, sectionProgress],
                      ['transparent', 'hsl(var(--primary))']
                    ),
                  }}
                />

                {/* Section label */}
                <motion.span
                  className="text-xs whitespace-nowrap transition-colors duration-300"
                  style={{
                    color: useTransform(
                      scrollYProgress,
                      [sectionProgress - 0.1, sectionProgress],
                      ['hsl(var(--muted-foreground))', 'hsl(var(--foreground))']
                    ),
                  }}
                >
                  {section}
                </motion.span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ScrollProgress;
