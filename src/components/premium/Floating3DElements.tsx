import { motion, useReducedMotion } from 'framer-motion';
import { Brain, Sparkles, Zap, Target, Lightbulb, Code, MessageSquare, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingElementProps {
  className?: string;
  density?: 'low' | 'medium' | 'high';
}

/**
 * Premium 3D floating elements with depth and parallax effects
 */
const Floating3DElements = ({ className, density = 'medium' }: FloatingElementProps) => {
  const prefersReducedMotion = useReducedMotion();

  const densityCount = {
    low: 5,
    medium: 8,
    high: 12,
  };

  const icons = [Brain, Sparkles, Zap, Target, Lightbulb, Code, MessageSquare, Rocket];

  const elements = Array.from({ length: densityCount[density] }, (_, i) => {
    const IconComponent = icons[i % icons.length];
    return {
      id: i,
      Icon: IconComponent,
      size: Math.random() * 24 + 16,
      x: Math.random() * 100,
      y: Math.random() * 100,
      z: Math.random() * 100,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
      rotationDuration: Math.random() * 20 + 20,
    };
  });

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            zIndex: Math.floor(element.z / 20),
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [0.8, 1, 0.8],
            y: [0, -30, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <motion.div
            animate={{ rotateY: 360 }}
            transition={{
              duration: element.rotationDuration,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              transformStyle: 'preserve-3d',
              perspective: 1000,
            }}
          >
            <element.Icon
              className="text-primary/20"
              style={{
                width: element.size,
                height: element.size,
                filter: `blur(${(100 - element.z) / 50}px)`,
              }}
            />
          </motion.div>
        </motion.div>
      ))}

      {/* Gradient orbs for depth */}
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-gradient-radial from-primary/10 to-transparent blur-3xl"
        style={{ left: '20%', top: '30%' }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute w-48 h-48 rounded-full bg-gradient-radial from-cyan/10 to-transparent blur-3xl"
        style={{ right: '15%', bottom: '25%' }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
    </div>
  );
};

export default Floating3DElements;
