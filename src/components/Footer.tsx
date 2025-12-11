import { useTranslation } from "@/hooks/useTranslation";
import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";

/**
 * Renders the footer section of the website.
 * This component includes copyright information, quick links, and contact info.
 *
 * @returns {JSX.Element} The rendered footer component.
 */
const Footer = () => {
  const { t } = useTranslation();

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  
  return (
    <footer className="py-12 bg-background border-t border-border" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand & Description */}
          <div>
            <h3 className="text-lg font-bold text-primary mb-4">{t('brandName')}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t('metaDescription')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">{t('footerQuickLinks')}</h4>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2">
                <li>
                  <a 
                    href="#course" 
                    onClick={(e) => handleSmoothScroll(e, '#course')}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {t('navCourse')}
                  </a>
                </li>
                <li>
                  <a 
                    href="#faq" 
                    onClick={(e) => handleSmoothScroll(e, '#faq')}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {t('navFAQ')}
                  </a>
                </li>
                <li>
                  <a 
                    href="#glossary" 
                    onClick={(e) => handleSmoothScroll(e, '#glossary')}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {t('navGlossary')}
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

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">{t('footerContactUs')}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
                <a href="mailto:info@aipromptacademy.com" className="hover:text-primary transition-colors">
                  info@aipromptacademy.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                <span>{t('footerLocation')}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50">
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
