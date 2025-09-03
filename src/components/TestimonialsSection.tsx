import { Star, Quote } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

/**
 * @const {Array<Object>} testimonialsData
 * @property {number} rating - The star rating for the testimonial.
 */
const testimonialsData = [
  { rating: 5 },
  { rating: 5 },
  { rating: 5 },
];

/**
 * Renders the testimonials section of the homepage.
 * This component displays a grid of testimonials, each with a rating, content, and author information.
 *
 * @returns {JSX.Element} The rendered testimonials section.
 */
const TestimonialsSection = () => {
  const { t } = useTranslation();
  
  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t('testimonialsTitle')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('testimonialsSubtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => {
            const num = index + 1;
            return (
              <div
                key={index}
                className="bg-card rounded-2xl p-8 shadow-lg border border-border hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Quote className="h-8 w-8 text-primary/20" />
                </div>

                <p className="text-foreground mb-6 leading-relaxed">
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
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
