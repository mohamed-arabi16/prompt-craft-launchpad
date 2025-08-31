import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Clock } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const CTASection = () => {
  const { t, tArray } = useTranslation();

  return (
    <section className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t('ctaTitle')}
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('ctaSubtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12 fade-in-up-delay-1">
          {tArray('ctaFeatures').map((feature, index) => (
            <div key={index} className="flex items-center gap-3 justify-center">
              <Check className="h-6 w-6 text-primary" />
              <span className="text-foreground">{feature}</span>
            </div>
          ))}
        </div>

        <div className="bg-card/20 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-border fade-in-up-delay-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-primary" />
            <span className="text-primary font-semibold">{t('ctaDiscount')}</span>
          </div>
          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-foreground mb-2">{t('ctaCurrentPrice')}</div>
            <div className="text-muted-foreground line-through">{t('ctaOriginalPrice')}</div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 group text-lg px-8 py-4">
              {t('ctaEnrollButton')}
              <ArrowRight className="ltr:ml-2 rtl:mr-2 h-5 w-5 transition-transform group-hover:ltr:translate-x-1 group-hover:rtl:-translate-x-1" />
            </Button>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4">
              {t('ctaDownloadButton')}
            </Button>
          </div>
        </div>

        <p className="text-muted-foreground text-sm fade-in-up-delay-3">
          {t('ctaGuarantee')}
        </p>
      </div>
    </section>
  );
};

export default CTASection;