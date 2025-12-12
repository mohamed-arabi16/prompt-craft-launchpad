import { useEffect, useRef, useState, useCallback } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Hook to detect if an element is in viewport
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
