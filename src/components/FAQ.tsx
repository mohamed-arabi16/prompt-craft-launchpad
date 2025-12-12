import { useTranslation } from "@/hooks/useTranslation";
import { useFAQs } from "@/hooks/useFAQs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * FAQ Section Component with dynamic data from database
 */
const FAQ = () => {
  const { t, currentLanguage } = useTranslation();
  const { faqs, loading } = useFAQs();

  // Filter active FAQs
  const activeFaqs = faqs.filter(f => f.is_active);

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-b from-background to-background/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Skeleton className="h-10 w-64 mx-auto mb-6" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (activeFaqs.length === 0) {
    return null;
  }

  return (
    <section 
      className="py-24 bg-gradient-to-b from-background to-background/50"
      itemScope 
      itemType="https://schema.org/FAQPage"
      aria-label="Frequently Asked Questions"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            {t('faqTitle')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('faqSubtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {activeFaqs.map((faq, index) => {
              const question = currentLanguage === 'ar' ? faq.question_ar : faq.question_en;
              const answer = currentLanguage === 'ar' ? faq.answer_ar : faq.answer_en;
              
              return (
                <AccordionItem 
                  key={faq.id} 
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-lg px-6"
                  itemScope
                  itemType="https://schema.org/Question"
                >
                  <AccordionTrigger 
                    className="text-left text-lg font-semibold text-foreground hover:text-primary transition-colors"
                    itemProp="name"
                  >
                    {question}
                  </AccordionTrigger>
                  <AccordionContent 
                    className="text-muted-foreground leading-relaxed pt-2 pb-4"
                    itemProp="acceptedAnswer"
                    itemScope
                    itemType="https://schema.org/Answer"
                  >
                    <div itemProp="text">{answer}</div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>

        {/* Contact for more questions */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            {t('faqMoreQuestions')}
          </p>
          <a 
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
            aria-label="Contact us for more questions"
          >
            {t('contactUs')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;