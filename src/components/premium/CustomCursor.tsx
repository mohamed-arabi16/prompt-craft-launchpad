import { useEffect, useState, useCallback, useMemo } from 'react';
import { motion, useMotionValue, useSpring, MotionValue } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

interface CustomCursorProps {
  color?: string;
  size?: number;
  trailLength?: number;
}

interface TrailConfig {
  x: MotionValue<number>;
  y: MotionValue<number>;
  scale: number;
  opacity: number;
}

/**
 * Hook to create trail springs - must be called at top level
 */
const useTrailSprings = (
  cursorX: MotionValue<number>,
  cursorY: MotionValue<number>,
  trailLength: number
) => {
  // Create springs at the top level with fixed configurations
  const trail0X = useSpring(cursorX, { damping: 30, stiffness: 300 });
  const trail0Y = useSpring(cursorY, { damping: 30, stiffness: 300 });
  const trail1X = useSpring(cursorX, { damping: 35, stiffness: 270 });
  const trail1Y = useSpring(cursorY, { damping: 35, stiffness: 270 });
  const trail2X = useSpring(cursorX, { damping: 40, stiffness: 240 });
  const trail2Y = useSpring(cursorY, { damping: 40, stiffness: 240 });
  const trail3X = useSpring(cursorX, { damping: 45, stiffness: 210 });
  const trail3Y = useSpring(cursorY, { damping: 45, stiffness: 210 });
  const trail4X = useSpring(cursorX, { damping: 50, stiffness: 180 });
  const trail4Y = useSpring(cursorY, { damping: 50, stiffness: 180 });
  const trail5X = useSpring(cursorX, { damping: 55, stiffness: 150 });
  const trail5Y = useSpring(cursorY, { damping: 55, stiffness: 150 });
  const trail6X = useSpring(cursorX, { damping: 60, stiffness: 120 });
  const trail6Y = useSpring(cursorY, { damping: 60, stiffness: 120 });
  const trail7X = useSpring(cursorX, { damping: 65, stiffness: 90 });
  const trail7Y = useSpring(cursorY, { damping: 65, stiffness: 90 });

  return useMemo(() => {
    const allTrails: TrailConfig[] = [
      { x: trail0X, y: trail0Y, scale: 1, opacity: 1 },
      { x: trail1X, y: trail1Y, scale: 0.9125, opacity: 0.9 },
      { x: trail2X, y: trail2Y, scale: 0.825, opacity: 0.8 },
      { x: trail3X, y: trail3Y, scale: 0.7375, opacity: 0.7 },
      { x: trail4X, y: trail4Y, scale: 0.65, opacity: 0.6 },
      { x: trail5X, y: trail5Y, scale: 0.5625, opacity: 0.5 },
      { x: trail6X, y: trail6Y, scale: 0.475, opacity: 0.4 },
      { x: trail7X, y: trail7Y, scale: 0.3875, opacity: 0.3 },
    ];
    return allTrails.slice(0, trailLength);
  }, [
    trail0X, trail0Y, trail1X, trail1Y, trail2X, trail2Y, trail3X, trail3Y,
    trail4X, trail4Y, trail5X, trail5Y, trail6X, trail6Y, trail7X, trail7Y,
    trailLength,
  ]);
};

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

  // Use the hook for trail springs
  const trailConfigs = useTrailSprings(cursorX, cursorY, trailLength);

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
