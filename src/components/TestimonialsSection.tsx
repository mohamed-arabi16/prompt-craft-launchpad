import { motion, useReducedMotion } from 'framer-motion';
import { Star, Quote, Tag } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useTestimonials } from "@/hooks/useTestimonials";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef, useState, useEffect, useCallback } from "react";
import { GlassCard, SectionReveal, CardSkeleton } from "./premium";

/**
 * Premium testimonials section with dynamic data from database
 */
const TestimonialsSection = () => {
  const { t, currentLanguage } = useTranslation();
  const { testimonials, loading } = useTestimonials();
  const prefersReducedMotion = useReducedMotion();
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Filter active testimonials
  const activeTestimonials = testimonials.filter(t => t.is_active);

  // Testimonial tags (short result highlights)
  const testimonialTags = [
    currentLanguage === 'ar' ? 'نتائج أوضح خلال أسبوع' : 'Clearer results within a week',
    currentLanguage === 'ar' ? 'توفير ساعات من العمل' : 'Saved hours of work',
    currentLanguage === 'ar' ? 'إنتاجية أعلى' : 'Higher productivity',
    currentLanguage === 'ar' ? 'قوالب قابلة للتكرار' : 'Repeatable templates',
  ];

  // Track current slide
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrentSlide(api.selectedScrollSnap());
    };

    api.on('select', onSelect);
    onSelect();

    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  // Navigate to specific slide
  const goToSlide = useCallback((index: number) => {
    api?.scrollTo(index);
  }, [api]);

  if (loading) {
    return (
      <section id="testimonials" className="py-12 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <CardSkeleton />
        </div>
      </section>
    );
  }

  if (activeTestimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="py-10 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-cyan/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <SectionReveal>
          <div className="text-center mb-8">
            <motion.span
              className="inline-block px-4 py-1.5 mb-3 text-sm font-medium text-primary bg-primary/10 rounded-full border border-primary/20"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              {t('testimonialsBadge')}
            </motion.span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {t('testimonialsTitle')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
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
            opts={{ loop: true, align: "start" }}
            setApi={setApi}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
            {activeTestimonials.map((testimonial, index) => {
                const name = currentLanguage === 'ar' ? testimonial.name_ar : testimonial.name_en;
                const role = currentLanguage === 'ar' ? testimonial.role_ar : testimonial.role_en;
                const content = currentLanguage === 'ar' ? testimonial.content_ar : testimonial.content_en;
                const tag = testimonialTags[index % testimonialTags.length];

                return (
                  <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/2">
                    <div className="h-full">
                      <GlassCard
                        variant="default"
                        glow
                        interactive={false}
                        className="p-6 h-full flex flex-col"
                      >
                        <div className="flex items-center justify-between mb-4">
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

                        {/* Testimonial tag */}
                        <div className="mb-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full border border-primary/20">
                            <Tag className="h-3 w-3" />
                            {tag}
                          </span>
                        </div>

                        <p className="text-foreground mb-6 leading-relaxed text-base italic flex-grow">
                          "{content}"
                        </p>

                        <div className="flex items-center gap-4">
                          <motion.div
                            className="w-14 h-14 bg-gradient-to-br from-primary to-cyan rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg shadow-primary/25"
                            whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                          >
                            {name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </motion.div>
                          <div>
                            <div className="font-semibold text-foreground text-lg">
                              {name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {role}
                            </div>
                          </div>
                        </div>
                      </GlassCard>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-primary hover:text-primary-foreground hover:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
            <CarouselNext className="hidden md:flex -right-12 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-primary hover:text-primary-foreground hover:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
          </Carousel>
        </motion.div>

        {/* Carousel indicators - interactive dots */}
        <div className="flex justify-center gap-3 mt-8" role="tablist" aria-label={currentLanguage === 'ar' ? 'شرائح الآراء' : 'Testimonial slides'}>
          {activeTestimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 w-3 rounded-full border-2 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                currentSlide === index
                  ? 'bg-primary border-primary scale-110'
                  : 'border-muted-foreground/50 hover:border-primary'
              }`}
              role="tab"
              aria-selected={currentSlide === index}
              aria-label={`${currentLanguage === 'ar' ? 'الشهادة' : 'Testimonial'} ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;