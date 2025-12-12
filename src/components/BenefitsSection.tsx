import { motion, useReducedMotion } from 'framer-motion';
import { RefreshCw, Users, Award, Headphones, FileText, LucideIcon } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { TiltCard, SectionReveal, StaggerContainer, StaggerItem } from "./premium";

const benefitIcons: LucideIcon[] = [RefreshCw, Users, Award, Headphones, FileText];

/**
 * Premium benefits section with 5 benefit cards
 */
const BenefitsSection = () => {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

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
              {t('benefitsTitle')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('benefitsSubtitle')}
            </p>
          </div>
        </SectionReveal>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.1}>
          {benefitIcons.map((IconComponent, index) => {
            const num = index + 1;
            // For 5 items in a 3-column grid, center the last 2 items
            const isLastRow = index >= 3;
            
            return (
              <StaggerItem 
                key={index}
                className={isLastRow && index === 3 ? 'lg:col-start-1 lg:col-end-2 lg:justify-self-end lg:w-full lg:max-w-sm lg:ml-auto' : 
                           isLastRow && index === 4 ? 'lg:col-start-2 lg:col-end-3 lg:justify-self-start lg:w-full lg:max-w-sm lg:mr-auto' : ''}
              >
                {prefersReducedMotion ? (
                  <div className="course-card h-full">
                    <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-6">
                      <IconComponent className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {t(`benefit${num}Title`)}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t(`benefit${num}Description`)}
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
                      <IconComponent className="h-8 w-8 text-primary-foreground" />
                    </motion.div>

                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {t(`benefit${num}Title`)}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed">
                      {t(`benefit${num}Description`)}
                    </p>
                  </TiltCard>
                )}
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default BenefitsSection;
