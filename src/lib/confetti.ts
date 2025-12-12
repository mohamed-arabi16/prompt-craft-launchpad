import confetti from 'canvas-confetti';

/**
 * Confetti celebration utilities for mind-blowing UX moments
 */

// Brand colors for confetti
const brandColors = ['#009DB0', '#00ABAB', '#B6DCE9', '#E9F4F4'];

/**
 * Basic celebration confetti burst
 */
export const celebrateSuccess = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: brandColors,
  });
};

/**
 * Side cannons confetti (for enrollment success)
 */
export const celebrateEnrollment = () => {
  const duration = 3000;
  const end = Date.now() + duration;

  const frame = () => {
    // Left cannon
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: brandColors,
    });

    // Right cannon
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: brandColors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
};

/**
 * Fireworks celebration (for major achievements)
 */
export const fireworksCelebration = () => {
  const duration = 5000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

  const randomInRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // Random positions
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: brandColors,
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: brandColors,
    });
  }, 250);
};

/**
 * Star burst confetti
 */
export const starBurst = () => {
  const defaults = {
    spread: 360,
    ticks: 50,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    colors: brandColors,
    shapes: ['star'] as confetti.Shape[],
  };

  const shoot = () => {
    confetti({
      ...defaults,
      particleCount: 40,
      scalar: 1.2,
    });

    confetti({
      ...defaults,
      particleCount: 20,
      scalar: 0.75,
    });
  };

  setTimeout(shoot, 0);
  setTimeout(shoot, 100);
  setTimeout(shoot, 200);
};

/**
 * Emoji celebration (custom shapes simulation)
 */
export const emojiCelebration = () => {
  const scalar = 2;
  const sparkle = confetti.shapeFromText({ text: '✨', scalar });
  const rocket = confetti.shapeFromText({ text: '🚀', scalar });
  const brain = confetti.shapeFromText({ text: '🧠', scalar });

  const defaults = {
    spread: 360,
    ticks: 60,
    gravity: 0.5,
    decay: 0.96,
    startVelocity: 20,
    shapes: [sparkle, rocket, brain],
    scalar,
  };

  const shoot = () => {
    confetti({
      ...defaults,
      particleCount: 30,
    });

    confetti({
      ...defaults,
      particleCount: 5,
      flat: true,
    });
  };

  setTimeout(shoot, 0);
  setTimeout(shoot, 100);
  setTimeout(shoot, 200);
};

/**
 * Realistic snow effect (for subtle celebrations)
 */
export const snowEffect = () => {
  const duration = 3000;
  const animationEnd = Date.now() + duration;
  let skew = 1;

  const frame = () => {
    const timeLeft = animationEnd - Date.now();
    const ticks = Math.max(200, 500 * (timeLeft / duration));

    skew = Math.max(0.8, skew - 0.001);

    confetti({
      particleCount: 1,
      startVelocity: 0,
      ticks: ticks,
      origin: {
        x: Math.random(),
        y: Math.random() * skew - 0.2,
      },
      colors: ['#E9F4F4', '#B6DCE9'],
      shapes: ['circle'],
      gravity: 0.5,
      scalar: 0.8,
      drift: Math.random() - 0.5,
    });

    if (timeLeft > 0) {
      requestAnimationFrame(frame);
    }
  };

  frame();
};

/**
 * Progress milestone celebration (subtle burst)
 */
export const milestoneCelebration = (origin?: { x: number; y: number }) => {
  confetti({
    particleCount: 50,
    spread: 60,
    origin: origin || { x: 0.5, y: 0.5 },
    colors: brandColors,
    startVelocity: 25,
    gravity: 1.2,
    ticks: 100,
  });
};

/**
 * Schoolproof confetti (for learning achievements)
 */
export const learningCelebration = () => {
  const scalar = 2;
  const book = confetti.shapeFromText({ text: '📚', scalar });
  const brain = confetti.shapeFromText({ text: '🧠', scalar });
  const star = confetti.shapeFromText({ text: '⭐', scalar });
  const light = confetti.shapeFromText({ text: '💡', scalar });

  confetti({
    spread: 180,
    ticks: 100,
    gravity: 0.4,
    decay: 0.94,
    startVelocity: 30,
    particleCount: 50,
    shapes: [book, brain, star, light],
    scalar,
    origin: { y: 0.7 },
  });
};
