import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "@/hooks/useTranslation";
import { useAdmin } from "@/hooks/useAdmin";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Shield, LogIn, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

/**
 * Renders the navigation bar for the application.
 * It includes the brand name and a language switcher component.
 * The navbar is fixed at the top of the viewport.
 *
 * @returns {JSX.Element} The rendered navigation bar.
 */
export default function Navbar() {
  const { t } = useTranslation();
  const { isAdmin } = useAdmin();
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationLinks = [
    { href: "/", label: t('navHome') },
    { href: "#course", label: t('navCourse') },
    { href: "#testimonials", label: t('navTestimonials') },
    { href: "/contact", label: t('navContact') },
  ];

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
    <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-primary hover:text-primary/80">
            {t('brandName')}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navigationLinks.map((link) => (
              link.href.startsWith('#') ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="text-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>

            {/* Desktop Auth & Admin Buttons */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <>
                  {isAdmin && (
                    <Link to="/admin">
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Admin
                      </Button>
                    </Link>
                  )}
                </>
              ) : (
                <Link to="/auth">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    {t('buttons.signIn')}
                  </Button>
                </Link>
              )}
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <div className="flex flex-col gap-4 mt-4">
              {navigationLinks.map((link) => (
                link.href.startsWith('#') ? (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      handleSmoothScroll(e, link.href);
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-foreground hover:text-primary transition-colors py-2 cursor-pointer"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="text-foreground hover:text-primary transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              ))}
              
              <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                {user ? (
                  <>
                    {isAdmin && (
                      <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          Admin
                        </Button>
                      </Link>
                    )}
                  </>
                ) : (
                  <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <LogIn className="h-4 w-4" />
                      {t('buttons.signIn')}
                    </Button>
                  </Link>
                )}
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}