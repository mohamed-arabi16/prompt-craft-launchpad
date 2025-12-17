import { motion, useReducedMotion } from 'framer-motion';
import * as LucideIcons from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useBenefits } from "@/hooks/useBenefits";
import { TiltCard, SectionReveal, StaggerContainer, StaggerItem, CardSkeleton } from "./premium";

// Dynamic icon component
const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  const IconComponent = (LucideIcons as any)[name] || LucideIcons.Star;
  return <IconComponent className={className} />;
};

/**
 * Premium benefits section with dynamic data from database
 */
const BenefitsSection = () => {
  const { t, currentLanguage } = useTranslation();
  const { getContent } = useSiteContent('benefits');
  const { benefits, loading } = useBenefits();
  const prefersReducedMotion = useReducedMotion();

  // Helper to get content with fallback to translation
  const getText = (key: string, fallbackKey?: string) => {
    const dbContent = getContent(key, currentLanguage);
    if (dbContent) return dbContent;
    return fallbackKey ? t(fallbackKey) : '';
  };

  // Filter active benefits
  const activeBenefits = benefits.filter(b => b.is_active);

  if (loading) {
    return (
      <section id="benefits" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5].map((i) => <CardSkeleton key={i} />)}
          </div>
        </div>
      </section>
    );
  }

  if (activeBenefits.length === 0) {
    return null;
  }

  return (
    <section id="benefits" className="py-20 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-cyan/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionReveal>
          <div className="text-center mb-16">
            <motion.span
              className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full border border-primary/20"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              {t('whyChooseUs')}
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {getText('section_title', 'benefitsTitle')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {getText('section_subtitle', 'benefitsSubtitle')}
            </p>
          </div>
        </SectionReveal>

        {/* Benefits Grid - center last row items when odd number */}
        {(() => {
          const totalItems = activeBenefits.length;
          const isOdd = totalItems % 3 !== 0;
          const lastRowCount = totalItems % 3;
          const lastRowStartIndex = totalItems - lastRowCount;
          
          return (
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.1}>
              {activeBenefits.map((benefit, index) => {
                const title = currentLanguage === 'ar' ? benefit.title_ar : benefit.title_en;
                const description = currentLanguage === 'ar' ? benefit.description_ar : benefit.description_en;
                
                // Determine centering class for last incomplete row (only on lg screens)
                const isInLastRow = isOdd && index >= lastRowStartIndex;
                let lastRowClass = '';
                
                if (isInLastRow && lastRowCount === 1) {
                  lastRowClass = 'lg:col-start-2';
                } else if (isInLastRow && lastRowCount === 2) {
                  if (index === lastRowStartIndex) {
                    lastRowClass = 'lg:col-start-1 lg:justify-self-center';
                  } else {
                    lastRowClass = 'lg:col-start-3 lg:justify-self-center';
                  }
                }
                
                return (
                  <StaggerItem key={benefit.id} className={lastRowClass}>
                    {prefersReducedMotion ? (
                      <div className="course-card h-full">
                        <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-6">
                          <DynamicIcon name={benefit.icon_name} className="h-8 w-8 text-primary-foreground" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-3">
                          {title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {description}
                        </p>
                      </div>
                    ) : (
                      <TiltCard
                        className="p-6 h-full"
                        maxTilt={8}
                        glare
                        scale={1.02}
                      >
                        <motion.div
                          className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-cyan rounded-2xl mb-6"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <DynamicIcon name={benefit.icon_name} className="h-8 w-8 text-primary-foreground" />
                        </motion.div>

                        <h3 className="text-xl font-semibold text-foreground mb-3">
                          {title}
                        </h3>

                        <p className="text-muted-foreground leading-relaxed">
                          {description}
                        </p>
                      </TiltCard>
                    )}
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          );
        })()}
      </div>
    </section>
  );
};

export default BenefitsSection;