import { motion, useReducedMotion } from 'framer-motion';
import { Check, Info, FileText, BookOpen, Briefcase, Share2 } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useTargetAudience } from "@/hooks/useTargetAudience";
import { SectionReveal, GlassCard, CardSkeleton } from "./premium";

/**
 * Target audience section with dynamic data from database
 * Updated with outputs grid
 */
const TargetAudienceSection = () => {
  const { t, currentLanguage } = useTranslation();
  const { getContent } = useSiteContent('target_audience');
  const { items, loading } = useTargetAudience();
  const prefersReducedMotion = useReducedMotion();

  // Helper to get content with fallback to translation
  const getText = (key: string, fallbackKey?: string) => {
    const dbContent = getContent(key, currentLanguage);
    if (dbContent) return dbContent;
    return fallbackKey ? t(fallbackKey) : '';
  };

  // Filter active items
  const activeItems = items.filter(i => i.is_active);

  // Outputs that users will leave with - from database or translation
  const outputs = [
    { icon: FileText, text: getText('output_1', 'output1') },
    { icon: BookOpen, text: getText('output_2', 'output2') },
    { icon: Briefcase, text: getText('output_3', 'output3') },
    { icon: Share2, text: getText('output_4', 'output4') },
  ];

  if (loading) {
    return (
      <section id="target-audience" className="py-12 bg-background">
        <div className="max-w-5xl mx-auto px-6">
          <CardSkeleton />
        </div>
      </section>
    );
  }

  if (activeItems.length === 0) {
    return null;
  }

  return (
    <section id="target-audience" className="py-10 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-cyan/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <SectionReveal>
          <div className="text-center mb-8">
            <motion.span
              className="inline-block px-4 py-1.5 mb-3 text-sm font-medium text-primary bg-primary/10 rounded-full border border-primary/20"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              {t('navTargetAudience')}
            </motion.span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {t('targetAudienceTitle')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('targetAudienceSubtitle')}
            </p>
          </div>
        </SectionReveal>

        {/* Pain-based checklist */}
        <GlassCard
          variant="default"
          glow
          interactive={false}
          className="p-6 mb-6"
        >
          <ul className="space-y-4">
            {activeItems.map((item, index) => {
              const content = currentLanguage === 'ar' ? item.content_ar : item.content_en;
              return (
                <motion.li
                  key={item.id}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-primary to-cyan rounded-full flex items-center justify-center mt-0.5">
                    <Check className="h-3.5 w-3.5 text-primary-foreground" />
                  </div>
                  <p className="text-base text-foreground leading-relaxed">{content}</p>
                </motion.li>
              );
            })}
          </ul>

          {/* Note */}
          <motion.div
            className="mt-5 pt-4 border-t border-border/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="flex-shrink-0 w-7 h-7 bg-muted/50 rounded-full flex items-center justify-center">
                <Info className="h-3.5 w-3.5 text-primary" />
              </div>
              <p className="text-sm italic">{t('targetAudienceNote')}</p>
            </div>
          </motion.div>
        </GlassCard>

        {/* Outputs Grid - NEW */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xl font-semibold text-foreground mb-4 text-center">
            {getText('outputs_title', 'outputsTitle')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {outputs.map((output, index) => {
              const Icon = output.icon;
              return (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={prefersReducedMotion ? {} : { scale: 1.02, borderColor: 'hsl(var(--primary) / 0.5)' }}
                >
                  <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm text-foreground">{output.text}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Clarifying line */}
          <motion.p
            className="text-xs text-muted-foreground text-center mt-4 max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            {getText('clarifying_note') || (currentLanguage === 'ar'
              ? 'المشروع النهائي دليل تطبيق — لكن المهارة الأساسية هي نظام عمل قابل للتكرار.'
              : 'The final project is proof of application — but the core skill is a repeatable workflow.')}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default TargetAudienceSection;
