import { motion, useReducedMotion } from 'framer-motion';
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "@/hooks/useTranslation";
import { useAdmin } from "@/hooks/useAdmin";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Shield, LogIn, LogOut, Menu, X, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { CommandPalette } from "./premium";

/**
 * Premium navigation bar with glassmorphism and command palette
 */
export default function Navbar() {
  const { t, toggleLanguage } = useTranslation();
  const { isAdmin } = useAdmin();
  const { user, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();

  // Track scroll position for navbar style changes
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
  };

  const navigationLinks = [
    { href: "#course-curriculum", label: t('navCurriculum') || t('navCourse') },
    { href: "#target-audience", label: t('navTargetAudience') },
    { href: "#benefits", label: t('navBenefits') },
    { href: "/faq", label: t('navFAQ') },
    { href: "/contact", label: t('navContact') },
  ];

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

  const isActiveLink = (href: string) => {
    if (href === '/') return location.pathname === '/';
    if (href.startsWith('#')) return false;
    return location.pathname.startsWith(href);
  };

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-background/5'
          : 'bg-background/50 backdrop-blur-sm border-b border-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/">
            <motion.span
              className="text-xl font-bold bg-gradient-to-r from-primary to-cyan bg-clip-text text-transparent"
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            >
              {t('brandName')}
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigationLinks.map((link) => {
              const isActive = isActiveLink(link.href);
              return link.href.startsWith('#') ? (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    isActive ? 'text-primary' : 'text-foreground hover:text-primary hover:bg-muted/30'
                  }`}
                  whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                >
                  {link.label}
                </motion.a>
              ) : (
                <Link key={link.href} to={link.href}>
                  <motion.span
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                      isActive ? 'text-primary' : 'text-foreground hover:text-primary hover:bg-muted/30'
                    }`}
                    whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                    whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                    tabIndex={0}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                        layoutId="activeNav"
                      />
                    )}
                  </motion.span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            {/* Command Palette - Desktop only */}
            <div className="hidden lg:block">
              <CommandPalette onToggleLanguage={toggleLanguage} />
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.div>
            </Button>

            {/* Desktop Auth & Admin Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <>
                  <Link to="/dashboard">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 border-primary/30 hover:border-primary hover:bg-primary/10"
                    >
                      <User className="h-4 w-4" />
                      {t('nav.myAccount') || t('nav.courseMaterials') || 'حسابي'}
                    </Button>
                  </Link>
                  {isAdmin && (
                    <Link to="/admin">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 border-primary/30 hover:border-primary hover:bg-primary/10"
                      >
                        <Shield className="h-4 w-4" />
                        {t('admin.dashboard') || 'لوحة التحكم'}
                      </Button>
                    </Link>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSignOut}
                    className="flex items-center gap-2 text-foreground hover:text-primary"
                  >
                    <LogOut className="h-4 w-4" />
                    {t('buttons.signOut')}
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/enroll">
                    <Button
                      size="sm"
                      className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {t('nav.bookSeat') || t('heroEnrollButton') || 'احجز مقعدك'}
                    </Button>
                  </Link>
                  <Link to="/auth">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 border-primary/30 hover:border-primary hover:bg-primary/10"
                    >
                      <LogIn className="h-4 w-4" />
                      {t('buttons.signIn')}
                    </Button>
                  </Link>
                </>
              )}
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`md:hidden overflow-hidden ${isMobileMenuOpen ? 'mt-4 pb-4' : ''}`}
          initial={false}
          animate={{
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {isMobileMenuOpen && (
            <div className="border-t border-border/50 pt-4">
              <div className="flex flex-col gap-2">
                {navigationLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {link.href.startsWith('#') ? (
                      <a
                        href={link.href}
                        onClick={(e) => {
                          handleSmoothScroll(e, link.href);
                          setIsMobileMenuOpen(false);
                        }}
                        className="block px-4 py-3 rounded-lg text-foreground hover:text-primary hover:bg-muted/50 transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="block px-4 py-3 rounded-lg text-foreground hover:text-primary hover:bg-muted/50 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                ))}

                <div className="flex flex-wrap items-center gap-3 pt-4 mt-2 border-t border-border/50">
                  {user ? (
                    <>
                      <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {t('nav.myAccount') || 'حسابي'}
                        </Button>
                      </Link>
                      {isAdmin && (
                        <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                          <Button variant="outline" size="sm" className="flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            {t('admin.dashboard') || 'لوحة التحكم'}
                          </Button>
                        </Link>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          handleSignOut();
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-2 text-foreground hover:text-primary"
                      >
                        <LogOut className="h-4 w-4" />
                        {t('buttons.signOut')}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to="/enroll" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button size="sm" className="flex items-center gap-2 bg-primary text-primary-foreground">
                          {t('nav.bookSeat') || 'احجز مقعدك'}
                        </Button>
                      </Link>
                      <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <LogIn className="h-4 w-4" />
                          {t('buttons.signIn')}
                        </Button>
                      </Link>
                    </>
                  )}
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.nav>
  );
}
