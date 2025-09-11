import { useTranslation } from "@/hooks/useTranslation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * FAQ Section Component
 * Provides structured frequently asked questions with semantic markup for AI comprehension
 */
const FAQ = () => {
  const { t, tArray } = useTranslation();

  const faqs = [
    {
      question: t('faqWhatIsPromptEngineering'),
      answer: t('faqWhatIsPromptEngineeringAnswer')
    },
    {
      question: t('faqWhoShouldTake'),
      answer: t('faqWhoShouldTakeAnswer')
    },
    {
      question: t('faqCourseDuration'),
      answer: t('faqCourseDurationAnswer')
    },
    {
      question: t('faqPrerequisites'),
      answer: t('faqPrerequisitesAnswer')
    },
    {
      question: t('faqCertification'),
      answer: t('faqCertificationAnswer')
    },
    {
      question: t('faqRefundPolicy'),
      answer: t('faqRefundPolicyAnswer')
    }
  ];

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
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border border-border rounded-lg px-6"
                itemScope
                itemType="https://schema.org/Question"
              >
                <AccordionTrigger 
                  className="text-left text-lg font-semibold text-foreground hover:text-primary transition-colors"
                  itemProp="name"
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent 
                  className="text-muted-foreground leading-relaxed pt-2 pb-4"
                  itemProp="acceptedAnswer"
                  itemScope
                  itemType="https://schema.org/Answer"
                >
                  <div itemProp="text">{faq.answer}</div>
                </AccordionContent>
              </AccordionItem>
            ))}
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