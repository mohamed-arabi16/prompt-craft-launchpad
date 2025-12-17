import { motion } from 'framer-motion';
import { Check, Rocket } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useSiteContent } from "@/hooks/useSiteContent";
import { SectionReveal, GlassCard } from "./premium";

/**
 * Day 5 Outcome section - shows what users will have by the end of Day 5
 */
const Day5OutcomeSection = () => {
  const { t, currentLanguage } = useTranslation();
  const { getContent } = useSiteContent('day5_outcome');

  // Helper to get content with fallback to translation
  const getText = (key: string, fallbackKey?: string) => {
    const dbContent = getContent(key, currentLanguage);
    if (dbContent) return dbContent;
    return fallbackKey ? t(fallbackKey) : '';
  };

  const bullets = [
    getText('bullet_1', 'day5OutcomeBullet1'),
    getText('bullet_2', 'day5OutcomeBullet2'),
    getText('bullet_3', 'day5OutcomeBullet3'),
  ];

  return (
    <section className="py-10 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-cyan/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <SectionReveal>
          <GlassCard
            variant="gradient"
            glow
            interactive={false}
            className="p-6 sm:p-8"
          >
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="p-2 rounded-xl bg-primary/20">
                <Rocket className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                {getText('title', 'day5OutcomeTitle')}
              </h2>
            </div>

            <ul className="space-y-4">
              {bullets.map((bullet, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-primary to-cyan rounded-full flex items-center justify-center mt-0.5">
                    <Check className="h-3.5 w-3.5 text-primary-foreground" />
                  </div>
                  <p className="text-base text-foreground">{bullet}</p>
                </motion.li>
              ))}
            </ul>
          </GlassCard>
        </SectionReveal>
      </div>
    </section>
  );
};

export default Day5OutcomeSection;
