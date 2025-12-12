import { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

interface CustomCursorProps {
  color?: string;
  size?: number;
  trailLength?: number;
}

/**
 * Custom cursor effect with smooth trailing
 */
const CustomCursor = ({
  color = 'hsl(187 100% 35%)',
  size = 20,
  trailLength = 8,
}: CustomCursorProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  // Trail positions with increasing lag
  const trailConfigs = Array.from({ length: trailLength }, (_, i) => ({
    x: useSpring(cursorX, { damping: 30 + i * 5, stiffness: 300 - i * 30 }),
    y: useSpring(cursorY, { damping: 30 + i * 5, stiffness: 300 - i * 30 }),
    scale: 1 - (i / trailLength) * 0.7,
    opacity: 1 - (i / trailLength) * 0.8,
  }));

  const updateCursor = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    },
    [cursorX, cursorY]
  );

  const handleMouseEnter = useCallback(() => setIsVisible(true), []);
  const handleMouseLeave = useCallback(() => setIsVisible(false), []);
  const handleMouseDown = useCallback(() => setIsClicking(true), []);
  const handleMouseUp = useCallback(() => setIsClicking(false), []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    // Check if device supports hover (not touch device)
    const hasHover = window.matchMedia('(hover: hover)').matches;
    if (!hasHover) return;

    const checkPointer = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        window.getComputedStyle(target).cursor === 'pointer';
      setIsPointer(isInteractive);
    };

    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mousemove', checkPointer);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mousemove', checkPointer);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'auto';
    };
  }, [prefersReducedMotion, updateCursor, handleMouseEnter, handleMouseLeave, handleMouseDown, handleMouseUp]);

  if (prefersReducedMotion) return null;

  return (
    <>
      {/* Trail particles */}
      {trailConfigs.map((trail, index) => (
        <motion.div
          key={index}
          className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
          style={{
            x: trail.x,
            y: trail.y,
            width: size * trail.scale * 0.5,
            height: size * trail.scale * 0.5,
            backgroundColor: color,
            opacity: isVisible ? trail.opacity * 0.3 : 0,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: isClicking ? 0.8 : isPointer ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      >
        {/* Outer ring */}
        <motion.div
          className="absolute rounded-full border-2"
          style={{
            width: size,
            height: size,
            borderColor: color,
            transform: 'translate(-50%, -50%)',
            left: '50%',
            top: '50%',
          }}
          animate={{
            scale: isPointer ? 1.2 : 1,
          }}
        />

        {/* Inner dot */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: size / 4,
            height: size / 4,
            backgroundColor: color,
            transform: 'translate(-50%, -50%)',
            left: '50%',
            top: '50%',
          }}
          animate={{
            scale: isClicking ? 2 : 1,
          }}
        />
      </motion.div>

      {/* Click ripple effect */}
      {isClicking && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9997] rounded-full"
          style={{
            x: springX,
            y: springY,
            transform: 'translate(-50%, -50%)',
            border: `2px solid ${color}`,
          }}
          initial={{ width: size, height: size, opacity: 0.5 }}
          animate={{ width: size * 3, height: size * 3, opacity: 0 }}
          transition={{ duration: 0.4 }}
        />
      )}
    </>
  );
};

export default CustomCursor;
