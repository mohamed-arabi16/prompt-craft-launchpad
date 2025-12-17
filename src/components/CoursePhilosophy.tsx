import { motion } from 'framer-motion';
import { useTranslation } from "@/hooks/useTranslation";
import { SectionReveal, GlassCard } from "./premium";
import { Layers, Zap, ArrowRight, ChevronDown } from "lucide-react";

/**
 * Renders the "How the bootcamp works" section with 3 cards.
 * Replaces the old "Teaching Philosophy" section.
 */
const CoursePhilosophy = () => {
  const { t, currentLanguage } = useTranslation();

  const cards = [
    {
      icon: Layers,
      title: t('howItWorksCard1Title'),
      text: t('howItWorksCard1Text'),
    },
    {
      icon: Zap,
      title: t('howItWorksCard2Title'),
      text: t('howItWorksCard2Text'),
    },
    {
      icon: ArrowRight,
      title: t('howItWorksCard3Title'),
      text: t('howItWorksCard3Text'),
    },
  ];

  const scrollToCurriculum = () => {
    const element = document.querySelector('#course-curriculum');
    if (element) {
      const navbarOffset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-10 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-cyan/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <SectionReveal>
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t('philosophyTitle')}
            </h2>
          </div>
        </SectionReveal>

        {/* 3 Cards - horizontal on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >
                <GlassCard
                  variant="subtle"
                  interactive
                  className="p-5 h-full flex flex-col min-h-[180px]"
                >
                  {/* Header bar with icon and title together */}
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/10 mb-4">
                    <Icon className="h-5 w-5 text-primary flex-shrink-0" />
                    <h3 className="text-base font-semibold text-foreground">
                      {card.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-grow text-center">
                    {card.text}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* Learn more link */}
        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={scrollToCurriculum}
            className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded px-2 py-1"
          >
            <span>{currentLanguage === 'ar' ? 'اعرف المزيد عن البرنامج' : 'Learn more about the program'}</span>
            <ChevronDown className="h-4 w-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CoursePhilosophy;
