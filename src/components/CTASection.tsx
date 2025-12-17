import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, Clock, Sparkles } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import DownloadButton from "./DownloadButton";
import { GlassCard, MagneticButton, SectionReveal, StaggerContainer, StaggerItem } from "./premium";
import { useCourseSettings } from "@/hooks/useCourseSettings";
import BookingFormModal from "./BookingFormModal";

/**
 * CTA section with pricing - simplified CTAs
 */
const CTASection = () => {
  const { t, tArray, currentLanguage } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const { getSetting } = useCourseSettings();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Get dynamic course settings
  const currentPriceValue = getSetting('current_price') || '150';
  const originalPriceValue = getSetting('original_price') || '250';
  const currency = getSetting('currency') || 'USD';
  const availableSeats = getSetting('available_seats') || '20';

  // Format price with currency
  const formatPrice = (price: string) => {
    return currentLanguage === 'ar'
      ? `${price} ${currency}`
      : `${currency} ${price}`;
  };

  return (
    <section className="py-10 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-cyan/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <SectionReveal>
          <motion.span
            className="inline-flex items-center px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full border border-primary/20"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Sparkles className="h-4 w-4 ltr:mr-2 rtl:ml-2" />
            {t('ctaBadge') || 'Limited Time Offer'}
          </motion.span>

          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 cta-title-rtl">
            {t('ctaTitle')}
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            {t('ctaSubtitle')}
          </p>
        </SectionReveal>

        {/* CTA Features Grid - center last items when odd number */}
        {(() => {
          const features = tArray('ctaFeatures');
          const isOdd = features.length % 3 !== 0;
          const lastRowCount = features.length % 3;
          const lastRowStartIndex = features.length - lastRowCount;

          return (
            <StaggerContainer className="grid md:grid-cols-3 gap-4 mb-8" staggerDelay={0.1}>
              {features.map((feature, index) => {
                // Determine if this item is in the last incomplete row
                const isInLastRow = isOdd && index >= lastRowStartIndex;
                const lastRowClass = isInLastRow && lastRowCount === 1
                  ? 'md:col-start-2'
                  : isInLastRow && lastRowCount === 2 && index === lastRowStartIndex
                    ? 'md:col-start-1 md:col-span-1 md:justify-self-end md:w-full'
                    : isInLastRow && lastRowCount === 2 && index === lastRowStartIndex + 1
                      ? 'md:col-start-3 md:col-span-1 md:justify-self-start md:w-full'
                      : '';

                return (
                  <StaggerItem key={index} className={lastRowClass}>
                    <motion.div
                      className="flex items-center gap-2 justify-center px-3 py-2.5 h-full min-h-[48px] rounded-xl bg-card/30 backdrop-blur-sm border border-border/50"
                      whileHover={prefersReducedMotion ? {} : { scale: 1.02, borderColor: 'hsl(var(--primary) / 0.5)' }}
                    >
                      <div className="flex-shrink-0 p-1 rounded-full bg-primary/20">
                        <Check className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <span className="text-sm text-foreground text-center">{feature}</span>
                    </motion.div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          );
        })()}

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
            className="p-6 mb-6"
          >
            <motion.div
              className="flex items-center justify-center gap-2 mb-3"
              animate={prefersReducedMotion ? {} : { scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-primary font-semibold text-sm">{t('ctaDiscount')}</span>
            </motion.div>

            <div className="text-center mb-5">
              <div className="text-muted-foreground text-sm mb-1">
                {t('ctaCurrentPrice')}
              </div>
              <motion.div
                className="text-3xl md:text-4xl font-bold text-foreground mb-2"
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                {formatPrice(currentPriceValue)}
              </motion.div>
              <div className="text-muted-foreground text-sm">
                {t('ctaOriginalPrice')}: <span className="line-through">{formatPrice(originalPriceValue)}</span>
              </div>
              <div className="text-primary text-sm mt-1">
                {currentLanguage === 'ar' ? 'مقاعد محدودة لهذه الدفعة' : 'Limited seats for this batch'}
              </div>
            </div>

            {/* CTAs: Primary = Book Your Seat, Secondary = Download Course Guide (PDF) */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch">
              <MagneticButton
                variant="primary"
                size="lg"
                className="group w-full sm:w-auto h-12 px-6 text-base"
                glow
                onClick={() => setIsBookingModalOpen(true)}
              >
                {t('ctaEnrollButton')}
                <ArrowRight className="ltr:ml-2 rtl:mr-2 h-4 w-4 transition-transform group-hover:ltr:translate-x-1 group-hover:rtl:-translate-x-1" />
              </MagneticButton>
              <DownloadButton
                variant="outline"
                className="border-primary/30 text-muted-foreground hover:bg-primary/10 hover:text-foreground hover:border-primary/50 h-12 px-6 text-base backdrop-blur-sm w-full sm:w-auto"
                materialCategory="course_guide"
                signInText={t('ctaDownloadButton')}
                downloadText={t('ctaDownloadButton')}
              />
            </div>

            {/* Registration info line */}
            <p className="text-xs text-muted-foreground text-center mt-4">
              {currentLanguage === 'ar'
                ? 'التسجيل عبر النموذج — وسيتم التواصل معك لتأكيد المقعد.'
                : 'Register via form — we\'ll contact you to confirm your seat.'}
            </p>
          </GlassCard>
        </motion.div>

        {/* Trust line - single line only */}
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

      {/* Booking Form Modal */}
      <BookingFormModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </section>
  );
};

export default CTASection;
