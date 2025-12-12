import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, Clock, Sparkles } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { Link } from "react-router-dom";
import DownloadButton from "./DownloadButton";
import { GlassCard, MagneticButton, SectionReveal, StaggerContainer, StaggerItem } from "./premium";

/**
 * Premium CTA section with glassmorphism pricing card and magnetic buttons
 */
const CTASection = () => {
  const { t, tArray } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-cyan/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <SectionReveal>
          <motion.span
            className="inline-flex items-center px-4 py-1.5 mb-6 text-sm font-medium text-primary bg-primary/10 rounded-full border border-primary/20"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Sparkles className="h-4 w-4 ltr:mr-2 rtl:ml-2" />
            {t('ctaBadge') || 'Limited Time Offer'}
          </motion.span>

          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 cta-title-rtl">
            {t('ctaTitle')}
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('ctaSubtitle')}
          </p>
        </SectionReveal>

        <StaggerContainer className="grid md:grid-cols-3 gap-6 mb-12" staggerDelay={0.1}>
          {tArray('ctaFeatures').map((feature, index) => (
            <StaggerItem key={index}>
              <motion.div
                className="flex items-center gap-3 justify-center px-4 py-3 h-full min-h-[56px] rounded-xl bg-card/30 backdrop-blur-sm border border-border/50"
                whileHover={prefersReducedMotion ? {} : { scale: 1.05, borderColor: 'hsl(var(--primary) / 0.5)' }}
              >
                <div className="flex-shrink-0 p-1 rounded-full bg-primary/20">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <span className="text-foreground text-center">{feature}</span>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <GlassCard
            variant="gradient"
            glow
            interactive={false}
            className="p-8 mb-8"
          >
            <motion.div
              className="flex items-center justify-center gap-2 mb-4"
              animate={prefersReducedMotion ? {} : { scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Clock className="h-5 w-5 text-primary" />
              <span className="text-primary font-semibold">{t('ctaDiscount')}</span>
            </motion.div>

            <div className="text-center mb-6">
              <motion.div
                className="text-4xl md:text-5xl font-bold text-foreground mb-4"
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                {t('ctaCurrentPrice')}
              </motion.div>
              <div className="text-muted-foreground line-through text-lg">
                {t('ctaOriginalPrice')}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch">
              <Link to="/enrollment" className="w-full sm:w-auto">
                <MagneticButton
                  variant="primary"
                  size="lg"
                  className="group w-full h-14 px-8 text-lg"
                  glow
                >
                  {t('ctaEnrollButton')}
                  <ArrowRight className="ltr:ml-2 rtl:mr-2 h-5 w-5 transition-transform group-hover:ltr:translate-x-1 group-hover:rtl:-translate-x-1" />
                </MagneticButton>
              </Link>
              <DownloadButton
                variant="outline"
                className="border-primary/50 text-foreground hover:bg-primary hover:text-primary-foreground h-14 px-8 text-lg backdrop-blur-sm w-full sm:w-auto"
                materialCategory="course_guide"
                signInText={t('ctaDownloadButton')}
                downloadText={t('ctaAccessDashboard')}
              />
            </div>
          </GlassCard>
        </motion.div>

        <motion.p
          className="text-muted-foreground text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {t('ctaGuarantee')}
        </motion.p>
      </div>
    </section>
  );
};

export default CTASection;
