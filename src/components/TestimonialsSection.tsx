import { motion, useReducedMotion } from 'framer-motion';
import { Star, Quote } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { GlassCard, SectionReveal } from "./premium";

const testimonialsData = [
  { rating: 5 },
  { rating: 5 },
  { rating: 5 },
];

/**
 * Premium testimonials section with glassmorphism cards and animations
 */
const TestimonialsSection = () => {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  return (
    <section id="testimonials" className="py-20 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-cyan/5 rounded-full blur-3xl" />
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
              {t('testimonialsBadge') || 'Student Success Stories'}
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t('testimonialsTitle')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('testimonialsSubtitle')}
            </p>
          </div>
        </SectionReveal>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            opts={{ loop: true, align: "center" }}
          >
            <CarouselContent>
              {testimonialsData.map((testimonial, index) => {
                const num = index + 1;
                return (
                  <CarouselItem key={index} className="md:basis-full">
                    <div className="px-2">
                      <GlassCard
                        variant="default"
                        glow
                        interactive={false}
                        className="p-8"
                      >
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                              >
                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                              </motion.div>
                            ))}
                          </div>
                          <motion.div
                            animate={prefersReducedMotion ? {} : { rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                          >
                            <Quote className="h-10 w-10 text-primary/20" />
                          </motion.div>
                        </div>

                        <p className="text-foreground mb-8 leading-relaxed text-lg italic">
                          "{t(`testimonial${num}Content`)}"
                        </p>

                        <div className="flex items-center gap-4">
                          <motion.div
                            className="w-14 h-14 bg-gradient-to-br from-primary to-cyan rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg shadow-primary/25"
                            whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                          >
                            {t(`testimonial${num}Name`).split(' ').map(n => n[0]).join('')}
                          </motion.div>
                          <div>
                            <div className="font-semibold text-foreground text-lg">
                              {t(`testimonial${num}Name`)}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {t(`testimonial${num}Role`)}
                            </div>
                          </div>
                        </div>
                      </GlassCard>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-primary hover:text-primary-foreground hover:border-primary" />
            <CarouselNext className="hidden md:flex -right-12 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-primary hover:text-primary-foreground hover:border-primary" />
          </Carousel>
        </motion.div>

        {/* Carousel indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonialsData.map((_, index) => (
            <motion.div
              key={index}
              className="w-2 h-2 rounded-full bg-primary/30"
              whileHover={{ scale: 1.5, backgroundColor: 'hsl(var(--primary))' }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
