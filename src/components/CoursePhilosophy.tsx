import { motion } from 'framer-motion';
import { useTranslation } from "@/hooks/useTranslation";
import { SectionReveal, GlassCard } from "./premium";
import { Layers, Zap, ArrowRight } from "lucide-react";

/**
 * Renders the "How the bootcamp works" section with 3 cards.
 * Replaces the old "Teaching Philosophy" section.
 */
const CoursePhilosophy = () => {
  const { t } = useTranslation();

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

  return (
    <section className="py-12 bg-background relative overflow-hidden">
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
              >
                <GlassCard
                  variant="subtle"
                  interactive
                  className="p-5 h-full flex flex-col items-center text-center"
                >
                  <div className="p-3 rounded-xl bg-primary/10 mb-3">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {card.text}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CoursePhilosophy;
