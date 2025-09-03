import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Clock } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import DownloadButton from "./DownloadButton";

/**
 * Renders the Call-to-Action (CTA) section of the homepage.
 * This component displays pricing, features, and buttons for enrollment and downloading a course outline.
 * It also includes a "Coming Soon" modal for the download functionality.
 *
 * @returns {JSX.Element} The rendered CTA section.
 */
const CTASection = () => {
  const { t, tArray } = useTranslation();
  const { user } = useAuth();
  const [showComingSoon, setShowComingSoon] = useState(false);

  const handleEnroll = () => {
    // Navigate to enrollment page
    window.location.href = '/enrollment';
  };

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
            <Link to="/enrollment">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 group text-lg px-8 py-4 w-full sm:w-auto">
                {t('ctaEnrollButton')}
                <ArrowRight className="ltr:ml-2 rtl:mr-2 h-5 w-5 transition-transform group-hover:ltr:translate-x-1 group-hover:rtl:-translate-x-1" />
              </Button>
            </Link>
            <DownloadButton 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4"
              signInText={t('ctaDownloadButton')}
              downloadText={t('ctaAccessDashboard')}
            />
          </div>
        </div>

        <p className="text-muted-foreground text-sm fade-in-up-delay-3">
          {t('ctaGuarantee')}
        </p>
      </div>

      {/* Coming Soon Modal */}
      <Dialog open={showComingSoon} onOpenChange={setShowComingSoon}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('comingSoon')}</DialogTitle>
            <DialogDescription>
              {t('comingSoonMessage')}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setShowComingSoon(false)}>
              {t('buttons.close')}
            </Button>
            <Link to="/contact">
              <Button onClick={() => setShowComingSoon(false)}>
                {t('footerContact')}
              </Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CTASection;