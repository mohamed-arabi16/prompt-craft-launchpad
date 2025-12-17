import { useTranslation } from "@/hooks/useTranslation";
import { Link } from "react-router-dom";
import { Mail, MapPin, FileText, MessageCircle, FolderOpen, Files, BookCopy } from "lucide-react";
import { useCourseSettings } from "@/hooks/useCourseSettings";

/**
 * Renders the footer section of the website with Assets section.
 */
const Footer = () => {
  const { t, currentLanguage } = useTranslation();
  const { getSetting } = useCourseSettings();

  // Get dynamic contact info
  const contactEmail = getSetting('contact_email') || 'info@qobouli.com';
  const courseLocation = getSetting('course_location') || (currentLanguage === 'ar' ? 'أونلاين' : 'Online');

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        // Calculate offset to account for fixed navbar height (80px) + padding (20px)
        const navbarOffset = 100;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - navbarOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <footer className="py-10 bg-background border-t border-border" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Grid - 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand & Materials */}
          <div>
            <h3 className="text-lg font-bold text-primary mb-4">{t('brandName')}</h3>
            <div className="space-y-3 text-muted-foreground text-sm">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary flex-shrink-0" aria-hidden="true" />
                <span>{t('footerMaterials')}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-primary flex-shrink-0" aria-hidden="true" />
                <span>{t('footerSupport')}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">{t('footerQuickLinks')}</h4>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2">
                <li>
                  <a
                    href="#course-curriculum"
                    onClick={(e) => handleSmoothScroll(e, '#course-curriculum')}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {t('navCurriculum') || t('navCourse')}
                  </a>
                </li>
                <li>
                  <a
                    href="#target-audience"
                    onClick={(e) => handleSmoothScroll(e, '#target-audience')}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {t('navTargetAudience')}
                  </a>
                </li>
                <li>
                  <a
                    href="#benefits"
                    onClick={(e) => handleSmoothScroll(e, '#benefits')}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {t('navBenefits')}
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    onClick={(e) => handleSmoothScroll(e, '#testimonials')}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {t('navTestimonials')}
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Assets - NEW */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">{t('footerAssetsTitle')}</h4>
            <ul className="space-y-3 text-muted-foreground text-sm">
              <li className="flex items-center gap-2">
                <FolderOpen className="h-4 w-4 text-primary flex-shrink-0" aria-hidden="true" />
                <span>{t('footerAsset1')}</span>
              </li>
              <li className="flex items-center gap-2">
                <Files className="h-4 w-4 text-primary flex-shrink-0" aria-hidden="true" />
                <span>{t('footerAsset2')}</span>
              </li>
              <li className="flex items-center gap-2">
                <BookCopy className="h-4 w-4 text-primary flex-shrink-0" aria-hidden="true" />
                <span>{t('footerAsset3')}</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">{t('footerContactUs')}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" aria-hidden="true" />
                <a href={`mailto:${contactEmail}`} className="hover:text-primary transition-colors">
                  {contactEmail}
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" aria-hidden="true" />
                <span>
                  {courseLocation === 'أونلاين' || courseLocation.toLowerCase() === 'online'
                    ? (currentLanguage === 'ar' ? 'متاح عالمياً عبر الإنترنت' : 'Available Online Worldwide')
                    : courseLocation
                  }
                </span>
              </li>
            </ul>
            {/* Response time expectation */}
            <p className="text-xs text-muted-foreground/70 mt-3 italic">
              {currentLanguage === 'ar' ? 'نرد عادة خلال 24 ساعة' : 'We usually respond within 24 hours'}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-center md:text-left text-muted-foreground text-sm">
              {t('footerCopyright')}
            </p>
            <nav aria-label="Legal links">
              <ul className="flex gap-6">
                <li>
                  <Link
                    to="/privacy"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {t('footerPrivacy')}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {t('footerTerms')}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {t('footerContact')}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
