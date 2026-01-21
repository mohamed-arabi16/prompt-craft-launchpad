import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';

interface SoundContextType {
  soundEnabled: boolean;
  toggleSound: () => void;
  playSound: (sound: SoundType) => void;
}

type SoundType = 'click' | 'success' | 'hover' | 'notification' | 'celebration';

const SoundContext = createContext<SoundContextType | undefined>(undefined);

// Sound URLs (using Web Audio API for better performance)
const sounds: Record<SoundType, { frequency: number; duration: number; type: OscillatorType }> = {
  click: { frequency: 800, duration: 0.05, type: 'sine' },
  success: { frequency: 600, duration: 0.15, type: 'sine' },
  hover: { frequency: 400, duration: 0.02, type: 'sine' },
  notification: { frequency: 500, duration: 0.1, type: 'triangle' },
  celebration: { frequency: 700, duration: 0.2, type: 'sine' },
};

/**
 * Sound effects provider for the application
 */
export const SoundProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('soundEnabled');
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  // Initialize AudioContext on first user interaction
  useEffect(() => {
    const initAudio = () => {
      if (!audioContext) {
        setAudioContext(new (window.AudioContext || (window as any).webkitAudioContext)());
      }
    };

    document.addEventListener('click', initAudio, { once: true });
    return () => document.removeEventListener('click', initAudio);
  }, [audioContext]);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev: boolean) => {
      const newValue = !prev;
      localStorage.setItem('soundEnabled', JSON.stringify(newValue));
      return newValue;
    });
  }, []);

  const playSound = useCallback(
    (sound: SoundType) => {
      if (!soundEnabled || !audioContext) return;

      try {
        const { frequency, duration, type } = sounds[sound];

        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

        // Envelope for smooth sound
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);

        // For celebration sound, play a chord
        if (sound === 'celebration') {
          const frequencies = [frequency, frequency * 1.25, frequency * 1.5];
          frequencies.forEach((freq, i) => {
            setTimeout(() => {
              const osc = audioContext.createOscillator();
              const gain = audioContext.createGain();
              osc.type = type;
              osc.frequency.setValueAtTime(freq, audioContext.currentTime);
              gain.gain.setValueAtTime(0, audioContext.currentTime);
              gain.gain.linearRampToValueAtTime(0.08, audioContext.currentTime + 0.01);
              gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration * 1.5);
              osc.connect(gain);
              gain.connect(audioContext.destination);
              osc.start(audioContext.currentTime);
              osc.stop(audioContext.currentTime + duration * 1.5);
            }, i * 100);
          });
        }
      } catch (error) {
        console.warn('Sound playback failed:', error);
      }
    },
    [soundEnabled, audioContext]
  );

  return (
    <SoundContext.Provider value={{ soundEnabled, toggleSound, playSound }}>
      {children}
    </SoundContext.Provider>
  );
};

/**
 * Hook to access sound context
 */
export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};

export default SoundContext;
