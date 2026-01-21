import { useEffect, useRef, useState, useCallback } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Hook to detect if an element is in viewport
 *
 * @description Uses Intersection Observer API to detect when an element enters the viewport.
 * Automatically stops observing once the element becomes visible (fires once).
 *
 * @param {IntersectionObserverInit} [options] - Optional IntersectionObserver configuration
 * @returns {Object} Object containing ref to attach to element and isInView boolean state
 * @returns {React.RefObject} ref - Ref to attach to the element to observe
 * @returns {boolean} isInView - True when element is in viewport
 *
 * @example
 * ```tsx
 * const { ref, isInView } = useInView();
 * return (
 *   <div ref={ref}>
 *     {isInView && <AnimatedContent />}
 *   </div>
 * );
 * ```
 */
export const useInView = (options?: IntersectionObserverInit) => {
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px', ...options }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options]);

  return { ref, isInView };
};

/**
 * Hook for smooth scroll progress
 *
 * @description Calculates the current scroll progress as a percentage (0-100)
 * based on the total scrollable height. Updates on scroll events.
 *
 * @returns {number} Current scroll progress as a percentage (0-100)
 *
 * @example
 * ```tsx
 * const scrollProgress = useScrollProgress();
 * return (
 *   <div className="progress-bar" style={{ width: `${scrollProgress}%` }} />
 * );
 * ```
 */
export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      setProgress(totalHeight > 0 ? (scrollPosition / totalHeight) * 100 : 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
};

/**
 * Hook for parallax effect
 *
 * @description Creates a parallax scrolling effect by calculating an offset
 * based on scroll position and speed multiplier. Respects prefers-reduced-motion.
 *
 * @param {number} [speed=0.5] - Speed multiplier for parallax effect (0-1)
 * @returns {number} Y-axis offset value to apply to element transform
 *
 * @example
 * ```tsx
 * const offset = useParallax(0.5);
 * return (
 *   <div style={{ transform: `translateY(${offset}px)` }}>
 *     Parallax content
 *   </div>
 * );
 * ```
 */
export const useParallax = (speed: number = 0.5) => {
  const [offset, setOffset] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      setOffset(window.scrollY * speed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, prefersReducedMotion]);

  return offset;
};

/**
 * Hook for mouse position tracking (for magnetic effects)
 *
 * @description Tracks the current mouse position (x, y coordinates) in real-time.
 * Useful for interactive effects like magnetic buttons or cursor followers.
 *
 * @returns {Object} Object with current mouse position
 * @returns {number} x - Current X coordinate of mouse
 * @returns {number} y - Current Y coordinate of mouse
 *
 * @example
 * ```tsx
 * const mousePosition = useMousePosition();
 * return (
 *   <div style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }} />
 * );
 * ```
 */
export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return mousePosition;
};

/**
 * Hook for magnetic button effect
 *
 * @description Creates a magnetic effect where element is attracted to mouse position.
 * Element moves toward cursor on mousemove and resets on mouseleave.
 * Respects prefers-reduced-motion preference.
 *
 * @param {number} [strength=0.3] - Strength of the magnetic attraction (0-1)
 * @returns {Object} Object with ref, position, and handlers
 * @returns {React.RefObject} ref - Ref to attach to element
 * @returns {Object} position - Current position offset ({x, y})
 * @returns {Function} handleMouseMove - Mouse move handler
 * @returns {Function} handleMouseLeave - Mouse leave handler
 *
 * @example
 * ```tsx
 * const { ref, position, handleMouseMove, handleMouseLeave } = useMagneticEffect(0.5);
 * return (
 *   <button
 *     ref={ref}
 *     onMouseMove={handleMouseMove}
 *     onMouseLeave={handleMouseLeave}
 *     style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
 *   >
 *     Magnetic Button
 *   </button>
 * );
 * ```
 */
export const useMagneticEffect = (strength: number = 0.3) => {
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current || prefersReducedMotion) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = (e.clientX - centerX) * strength;
      const distanceY = (e.clientY - centerY) * strength;

      setPosition({ x: distanceX, y: distanceY });
    },
    [strength, prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  return { ref, position, handleMouseMove, handleMouseLeave };
};

/**
 * Hook for 3D tilt effect
 *
 * @description Creates a 3D tilt/parallax card effect where element rotates
 * based on mouse position. Respects prefers-reduced-motion preference.
 *
 * @param {number} [maxTilt=10] - Maximum rotation angle in degrees
 * @returns {Object} Object with ref, tilt angles, and handlers
 * @returns {React.RefObject} ref - Ref to attach to element
 * @returns {Object} tilt - Current rotation angles ({rotateX, rotateY})
 * @returns {Function} handleMouseMove - Mouse move handler
 * @returns {Function} handleMouseLeave - Mouse leave handler
 *
 * @example
 * ```tsx
 * const { ref, tilt, handleMouseMove, handleMouseLeave } = useTiltEffect(15);
 * return (
 *   <div
 *     ref={ref}
 *     onMouseMove={handleMouseMove}
 *     onMouseLeave={handleMouseLeave}
 *     style={{
 *       transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
 *       perspective: '1000px'
 *     }}
 *   >
 *     3D Card
 *   </div>
 * );
 * ```
 */
export const useTiltEffect = (maxTilt: number = 10) => {
  const ref = useRef<HTMLElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current || prefersReducedMotion) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * maxTilt;
      const rotateX = -((e.clientY - centerY) / (rect.height / 2)) * maxTilt;

      setTilt({ rotateX, rotateY });
    },
    [maxTilt, prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  return { ref, tilt, handleMouseMove, handleMouseLeave };
};

/**
 * Hook for keyboard shortcuts
 *
 * @description Registers a keyboard shortcut listener with optional modifier keys.
 * Automatically cleans up event listeners on component unmount.
 *
 * @param {string} key - The key to listen for (case-insensitive)
 * @param {Function} callback - Callback to execute when shortcut is triggered
 * @param {Object} [modifiers={}] - Modifier keys to require
 * @param {boolean} [modifiers.ctrl] - Require Ctrl/Cmd key
 * @param {boolean} [modifiers.shift] - Require Shift key
 * @param {boolean} [modifiers.alt] - Require Alt key
 * @param {boolean} [modifiers.meta] - Require Meta key
 *
 * @example
 * ```tsx
 * useKeyboardShortcut('s', () => {
 *   saveDocument();
 * }, { ctrl: true });
 *
 * // Triggers on Ctrl+S or Cmd+S
 * ```
 */
export const useKeyboardShortcut = (
  key: string,
  callback: () => void,
  modifiers: { ctrl?: boolean; shift?: boolean; alt?: boolean; meta?: boolean } = {}
) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const ctrlMatch = modifiers.ctrl ? e.ctrlKey || e.metaKey : true;
      const shiftMatch = modifiers.shift ? e.shiftKey : !e.shiftKey || !modifiers.shift;
      const altMatch = modifiers.alt ? e.altKey : !e.altKey || !modifiers.alt;
      const metaMatch = modifiers.meta ? e.metaKey : true;

      if (e.key.toLowerCase() === key.toLowerCase() && ctrlMatch && shiftMatch && altMatch && metaMatch) {
        e.preventDefault();
        callback();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [key, callback, modifiers]);
};

/**
 * Hook for sound effects with toggle
 *
 * @description Manages sound effects state with localStorage persistence.
 * Allows users to toggle sound effects on/off with persistent preference.
 *
 * @returns {Object} Object with sound state and toggle function
 * @returns {boolean} soundEnabled - Whether sound effects are enabled
 * @returns {Function} toggleSound - Function to toggle sound enabled state
 *
 * @example
 * ```tsx
 * const { soundEnabled, toggleSound } = useSoundEnabled();
 * return (
 *   <button onClick={toggleSound}>
 *     Sound {soundEnabled ? 'On' : 'Off'}
 *   </button>
 * );
 * ```
 */
export const useSoundEnabled = () => {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('soundEnabled');
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev: boolean) => {
      const newValue = !prev;
      localStorage.setItem('soundEnabled', JSON.stringify(newValue));
      return newValue;
    });
  }, []);

  return { soundEnabled, toggleSound };
};
