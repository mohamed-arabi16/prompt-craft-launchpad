import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles, Brain, Zap, Target, Lightbulb } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { Link } from "react-router-dom";
import DownloadButton from "./DownloadButton";
import { AnimatedBackground, Floating3DElements, MagneticButton } from "./premium";
import { fadeInUp, staggerContainer } from "@/lib/animations";

/**
 * Renders the enhanced hero section with 3D floating elements and premium animations
 */
const HeroSection = () => {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  // 3 specific chips as requested
  const chips = [
    t('heroChip1'),
    t('heroChip2'),
    t('heroChip3'),
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background" aria-label="Hero section">
      {/* Premium Animated Background */}
      <AnimatedBackground variant="mesh" opacity={0.4} />

      {/* 3D Floating Elements */}
      {!prefersReducedMotion && <Floating3DElements density="medium" />}

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />

      {/* Animated floating icons */}
      <motion.div
        className="absolute top-20 ltr:left-10 rtl:right-10"
        animate={prefersReducedMotion ? {} : {
          y: [0, -15, 0],
          rotate: [0, 5, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="p-3 rounded-2xl bg-primary/10 backdrop-blur-sm border border-primary/20">
          <Sparkles className="h-6 w-6 text-primary" />
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-40 ltr:right-16 rtl:left-16"
        animate={prefersReducedMotion ? {} : {
          y: [0, 20, 0],
          x: [0, -10, 0],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <div className="p-4 rounded-2xl bg-cyan/10 backdrop-blur-sm border border-cyan/20">
          <Brain className="h-10 w-10 text-cyan" />
        </div>
      </motion.div>

      <motion.div
        className="absolute top-1/3 ltr:right-10 rtl:left-10"
        animate={prefersReducedMotion ? {} : {
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <div className="p-2 rounded-xl bg-primary/10 backdrop-blur-sm border border-primary/20">
          <Zap className="h-5 w-5 text-primary" />
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 ltr:left-20 rtl:right-20 hidden md:block"
        animate={prefersReducedMotion ? {} : {
          y: [0, 15, 0],
          rotate: [0, -10, 0],
        }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      >
        <div className="p-3 rounded-xl bg-secondary/10 backdrop-blur-sm border border-secondary/20">
          <Target className="h-6 w-6 text-secondary" />
        </div>
      </motion.div>

      <motion.div
        className="absolute top-1/4 ltr:left-1/4 rtl:right-1/4 hidden lg:block"
        animate={prefersReducedMotion ? {} : {
          y: [0, -10, 0],
          x: [0, 5, 0],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <div className="p-2 rounded-lg bg-primary/5 backdrop-blur-sm border border-primary/10">
          <Lightbulb className="h-4 w-4 text-primary/60" />
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center max-w-5xl mx-auto px-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={fadeInUp} className="mb-4">
          <motion.span
            className="inline-flex items-center px-4 py-1.5 bg-primary/10 backdrop-blur-sm rounded-full text-primary text-sm font-medium border border-primary/20"
            whileHover={{ scale: 1.05, borderColor: 'hsl(var(--primary))' }}
            transition={{ duration: 0.2 }}
          >
            <motion.span
              animate={prefersReducedMotion ? {} : { rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="h-4 w-4 ltr:mr-2 rtl:ml-2 text-primary" aria-hidden="true" />
            </motion.span>
            <span>{t('limitedOffer')}</span>
          </motion.span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          variants={fadeInUp}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-3 leading-tight hero-title"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-primary">
            {t('heroTitle')}
          </span>
        </motion.h1>

        {/* Promise Line - NEW */}
        <motion.p
          variants={fadeInUp}
          className="text-lg md:text-xl text-primary font-medium mb-4 max-w-3xl mx-auto"
        >
          {t('heroPromiseLine')}
        </motion.p>

        {/* Subtitle - Updated to be practical */}
        <motion.p
          variants={fadeInUp}
          className="text-base md:text-lg text-muted-foreground mb-6 max-w-3xl mx-auto leading-relaxed hero-subtitle"
        >
          {t('heroSubtitle')}
        </motion.p>

        {/* CTA Buttons - Primary: Book Your Seat, Secondary: Download Course Guide (PDF) */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-6"
        >
          <Link to="/enrollment">
            <MagneticButton
              variant="primary"
              size="lg"
              className="group w-full sm:w-auto"
              glow
            >
              <span>{t('heroEnrollButton')}</span>
              <ArrowRight className="ltr:ml-2 rtl:mr-2 h-5 w-5 transition-transform group-hover:ltr:translate-x-1 group-hover:rtl:-translate-x-1" aria-hidden="true" />
            </MagneticButton>
          </Link>

          <DownloadButton
            variant="outline"
            className="border-primary/50 text-foreground hover:bg-primary hover:text-primary-foreground h-14 px-8 text-lg backdrop-blur-sm"
            materialCategory="course_guide"
            signInText={t('heroDownloadButton')}
            downloadText={t('heroDownloadButton')}
          />
        </motion.div>

        {/* 3 Chips - Only these 3 specific ones */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-muted-foreground text-sm"
        >
          {chips.map((chip, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/30 backdrop-blur-sm border border-border/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05, borderColor: 'hsl(var(--primary) / 0.5)' }}
            >
              <motion.div
                className="h-2 w-2 bg-primary rounded-full"
                animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
              />
              <span>{chip}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Spacer for scroll indicator */}
        <div className="h-16" />
      </motion.div>

      {/* Scroll indicator - positioned outside content container */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center"
          animate={prefersReducedMotion ? {} : { y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-3 bg-primary rounded-full mt-2"
            animate={prefersReducedMotion ? {} : { y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
