import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode, useRef } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
  scale?: number;
}

/**
 * Premium 3D tilt card with perspective effect and optional glare
 */
const TiltCard = ({
  children,
  className,
  maxTilt = 10,
  glare = true,
  scale = 1.02,
}: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-maxTilt, maxTilt]);

  // Glare effect position
  const glareX = useTransform(springX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(springY, [-0.5, 0.5], ['0%', '100%']);
  const glareOpacity = useTransform(
    springX,
    [-0.5, 0, 0.5],
    [0.3, 0, 0.3]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const normalizedX = (e.clientX - centerX) / (rect.width / 2);
    const normalizedY = (e.clientY - centerY) / (rect.height / 2);

    x.set(normalizedX * 0.5);
    y.set(normalizedY * 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'relative rounded-2xl bg-card/50 backdrop-blur-xl border border-white/10',
        'transform-gpu will-change-transform transition-shadow duration-300',
        'hover:shadow-[0_20px_50px_rgba(0,157,176,0.2)]',
        className
      )}
    >
      {/* Content with 3D depth */}
      <div
        className="relative z-10"
        style={{ transform: 'translateZ(50px)' }}
      >
        {children}
      </div>

      {/* Glare effect */}
      {glare && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
          style={{ opacity: glareOpacity }}
        >
          <motion.div
            className="absolute w-[200%] h-[200%] bg-gradient-radial from-white/30 to-transparent"
            style={{
              left: glareX,
              top: glareY,
              transform: 'translate(-50%, -50%)',
            }}
          />
        </motion.div>
      )}

      {/* Border glow effect */}
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-cyan/20 -z-10 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
};

export default TiltCard;
