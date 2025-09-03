
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Brain, Zap, Download } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useDownload } from "@/hooks/useDownload";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

/**
 * Renders the hero section of the homepage.
 * This component includes the main headline, a subtitle, and call-to-action buttons
 * for enrollment and downloading the course outline. It also features an animated background and decorative elements.
 *
 * @returns {JSX.Element} The rendered hero section.
 */
const HeroSection = () => {
  const { t } = useTranslation();
  const { isLoading, downloadFile } = useDownload();

  /**
   * Handles the download of the course outline PDF.
   */
  const handleDownload = () => {
    downloadFile('ai-prompt-course-outline.pdf');
  };
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-hero"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 ltr:left-10 rtl:right-10 animate-bounce">
        <Sparkles className="h-8 w-8 text-primary/30" />
      </div>
      <div className="absolute bottom-40 ltr:right-16 rtl:left-16 animate-pulse">
        <Brain className="h-12 w-12 text-primary/20" />
      </div>
      <div className="absolute top-1/3 ltr:right-10 rtl:left-10 animate-bounce delay-700">
        <Zap className="h-6 w-6 text-primary/25" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6 fade-in-up">
        <div className="mb-6 fade-in-up-delay-1">
          <span className="inline-flex items-center px-4 py-2 bg-card backdrop-blur-sm rounded-full text-foreground text-sm font-medium border border-primary/20">
            <Sparkles className="h-4 w-4 ltr:mr-2 rtl:ml-2" />
            <span>{t('intensiveProgram')}</span>
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight fade-in-up-delay-2 hero-title">
          {t('heroTitle')}
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed fade-in-up-delay-3 hero-subtitle">
          {t('heroSubtitle')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 fade-in-up-delay-3">
          <Link to="/enrollment">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg font-semibold group w-full sm:w-auto">
              <span>{t('heroEnrollButton')}</span>
              <ArrowRight className="ltr:ml-2 rtl:mr-2 h-5 w-5 transition-transform group-hover:ltr:translate-x-1 group-hover:rtl:-translate-x-1" />
            </Button>
          </Link>
          <Button 
            variant="outline" 
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg"
            onClick={handleDownload}
            disabled={isLoading}
          >
            {isLoading ? (
              <LoadingSpinner size="sm" className="ltr:mr-2 rtl:ml-2" />
            ) : (
              <Download className="ltr:mr-2 rtl:ml-2 h-5 w-5" />
            )}
            <span>{isLoading ? t('loading.downloading') : t('heroDownloadButton')}</span>
          </Button>
        </div>
        
        <div className="flex items-center justify-center gap-8 text-muted-foreground text-sm fade-in-up-delay-3">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-primary rounded-full"></div>
            <span>{t('programFeature1')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-primary rounded-full"></div>
            <span>{t('programFeature2')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-primary rounded-full"></div>
            <span>{t('programFeature3')}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
