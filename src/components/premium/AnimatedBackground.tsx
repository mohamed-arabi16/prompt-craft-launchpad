import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedBackgroundProps {
  variant?: 'mesh' | 'particles' | 'gradient' | 'aurora' | 'waves';
  className?: string;
  opacity?: number;
}

/**
 * Premium animated background component with multiple variants
 */
const AnimatedBackground = ({
  variant = 'mesh',
  className,
  opacity = 0.5,
}: AnimatedBackgroundProps) => {
  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {variant === 'mesh' && <MeshGradient opacity={opacity} />}
      {variant === 'particles' && <Particles opacity={opacity} />}
      {variant === 'gradient' && <AnimatedGradient opacity={opacity} />}
      {variant === 'aurora' && <Aurora opacity={opacity} />}
      {variant === 'waves' && <Waves opacity={opacity} />}
    </div>
  );
};

/**
 * Animated mesh gradient background
 */
const MeshGradient = ({ opacity }: { opacity: number }) => (
  <div className="absolute inset-0" style={{ opacity }}>
    {/* Blob 1 */}
    <motion.div
      className="absolute w-[600px] h-[600px] rounded-full bg-primary/30 blur-[100px]"
      animate={{
        x: [0, 100, 0],
        y: [0, 50, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{ left: '10%', top: '10%' }}
    />

    {/* Blob 2 */}
    <motion.div
      className="absolute w-[500px] h-[500px] rounded-full bg-cyan/20 blur-[100px]"
      animate={{
        x: [0, -80, 0],
        y: [0, 100, 0],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{ right: '20%', top: '30%' }}
    />

    {/* Blob 3 */}
    <motion.div
      className="absolute w-[400px] h-[400px] rounded-full bg-secondary/20 blur-[80px]"
      animate={{
        x: [0, 60, 0],
        y: [0, -80, 0],
        scale: [1, 0.9, 1],
      }}
      transition={{
        duration: 18,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{ left: '40%', bottom: '20%' }}
    />
  </div>
);

/**
 * Floating particles background
 */
const Particles = ({ opacity }: { opacity: number }) => {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0" style={{ opacity }}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/50"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

/**
 * Animated gradient background
 */
const AnimatedGradient = ({ opacity }: { opacity: number }) => (
  <motion.div
    className="absolute inset-0"
    style={{ opacity }}
    animate={{
      background: [
        'radial-gradient(circle at 0% 0%, hsl(187 100% 35% / 0.3) 0%, transparent 50%)',
        'radial-gradient(circle at 100% 0%, hsl(187 100% 35% / 0.3) 0%, transparent 50%)',
        'radial-gradient(circle at 100% 100%, hsl(187 100% 35% / 0.3) 0%, transparent 50%)',
        'radial-gradient(circle at 0% 100%, hsl(187 100% 35% / 0.3) 0%, transparent 50%)',
        'radial-gradient(circle at 0% 0%, hsl(187 100% 35% / 0.3) 0%, transparent 50%)',
      ],
    }}
    transition={{
      duration: 15,
      repeat: Infinity,
      ease: 'linear',
    }}
  />
);

/**
 * Aurora borealis effect
 */
const Aurora = ({ opacity }: { opacity: number }) => (
  <div className="absolute inset-0" style={{ opacity }}>
    <motion.div
      className="absolute inset-0"
      style={{
        background: `
          linear-gradient(45deg,
            hsl(187 100% 35% / 0.2) 0%,
            transparent 50%,
            hsl(180 100% 34% / 0.2) 100%
          )
        `,
        filter: 'blur(40px)',
      }}
      animate={{
        opacity: [0.5, 0.8, 0.5],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />

    <motion.div
      className="absolute inset-0"
      style={{
        background: `
          linear-gradient(-45deg,
            hsl(195 48% 81% / 0.15) 0%,
            transparent 50%,
            hsl(187 100% 35% / 0.15) 100%
          )
        `,
        filter: 'blur(60px)',
      }}
      animate={{
        opacity: [0.3, 0.6, 0.3],
        rotate: [0, 5, 0],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  </div>
);

/**
 * Wave animation background
 */
const Waves = ({ opacity }: { opacity: number }) => (
  <div className="absolute inset-0 overflow-hidden" style={{ opacity }}>
    <svg
      className="absolute bottom-0 w-full h-1/2"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
    >
      <motion.path
        fill="hsl(187 100% 35% / 0.1)"
        d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        animate={{
          d: [
            'M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z',
            'M0,128L48,154.7C96,181,192,235,288,234.7C384,235,480,181,576,181.3C672,181,768,235,864,250.7C960,267,1056,245,1152,229.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z',
            'M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </svg>

    <svg
      className="absolute bottom-0 w-full h-1/3"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
    >
      <motion.path
        fill="hsl(180 100% 34% / 0.08)"
        d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,128C960,149,1056,171,1152,165.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        animate={{
          d: [
            'M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,128C960,149,1056,171,1152,165.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z',
            'M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,128C672,107,768,85,864,90.7C960,96,1056,128,1152,128C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z',
            'M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,128C960,149,1056,171,1152,165.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z',
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />
    </svg>
  </div>
);

export default AnimatedBackground;
