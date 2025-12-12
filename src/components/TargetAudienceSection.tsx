import { motion, useReducedMotion } from 'framer-motion';
import { Check, Info } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useTargetAudience } from "@/hooks/useTargetAudience";
import { SectionReveal, GlassCard, CardSkeleton } from "./premium";

/**
 * Target audience section with dynamic data from database
 */
const TargetAudienceSection = () => {
  const { t, currentLanguage } = useTranslation();
  const { items, loading } = useTargetAudience();
  const prefersReducedMotion = useReducedMotion();

  // Filter active items
  const activeItems = items.filter(i => i.is_active);

  if (loading) {
    return (
      <section id="target-audience" className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <CardSkeleton />
        </div>
      </section>
    );
  }

  if (activeItems.length === 0) {
    return null;
  }

  return (
    <section id="target-audience" className="py-20 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-cyan/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <SectionReveal>
          <div className="text-center mb-12">
            <motion.span
              className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full border border-primary/20"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              {t('navTargetAudience')}
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t('targetAudienceTitle')}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t('targetAudienceSubtitle')}
            </p>
          </div>
        </SectionReveal>

        <GlassCard
          variant="default"
          glow
          interactive={false}
          className="p-8"
        >
          <ul className="space-y-6">
            {activeItems.map((item, index) => {
              const content = currentLanguage === 'ar' ? item.content_ar : item.content_en;
              return (
                <motion.li
                  key={item.id}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary to-cyan rounded-full flex items-center justify-center mt-1">
                    <Check className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <p className="text-lg text-foreground leading-relaxed">{content}</p>
                </motion.li>
              );
            })}
          </ul>

          {/* Optional note */}
          <motion.div
            className="mt-8 pt-6 border-t border-border/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="flex-shrink-0 w-8 h-8 bg-muted/50 rounded-full flex items-center justify-center">
                <Info className="h-4 w-4 text-primary" />
              </div>
              <p className="text-base italic">{t('targetAudienceNote')}</p>
            </div>
          </motion.div>
        </GlassCard>
      </div>
    </section>
  );
};

export default TargetAudienceSection;