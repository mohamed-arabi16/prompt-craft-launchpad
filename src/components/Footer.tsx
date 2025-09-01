import { useTranslation } from "@/hooks/useTranslation";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left text-muted-foreground">
            {t('footerCopyright')}
          </div>
          <div className="flex gap-6">
            <Link 
              to="/privacy" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {t('footerPrivacy')}
            </Link>
            <Link 
              to="/terms" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {t('footerTerms')}
            </Link>
            <Link 
              to="/contact" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {t('footerContact')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;