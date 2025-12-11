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

const testimonialsData = [
  { rating: 5 },
  { rating: 5 },
  { rating: 5 },
];

/**
 * Renders the testimonials section with an auto-rotating carousel
 */
const TestimonialsSection = () => {
  const { t } = useTranslation();
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t('testimonialsTitle')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('testimonialsSubtitle')}
          </p>
        </div>

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
                  <div className="bg-card rounded-2xl p-8 shadow-lg border border-border mx-2">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <Quote className="h-8 w-8 text-primary/20" />
                    </div>

                    <p className="text-foreground mb-6 leading-relaxed text-lg">
                      {t(`testimonial${num}Content`)}
                    </p>

                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                        {t(`testimonial${num}Name`).split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">
                          {t(`testimonial${num}Name`)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {t(`testimonial${num}Role`)}
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12" />
          <CarouselNext className="hidden md:flex -right-12" />
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;
