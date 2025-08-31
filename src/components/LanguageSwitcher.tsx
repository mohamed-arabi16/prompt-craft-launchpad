import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useState, useEffect } from "react";

export default function LanguageSwitcher() {
  const [currentLanguage, setCurrentLanguage] = useState('ar');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Get initial language from localStorage or default to Arabic
    const savedLanguage = localStorage.getItem('language') || 'ar';
    setCurrentLanguage(savedLanguage);

    // Listen for language changes from the global language manager
    const handleLanguageChange = (event: any) => {
      setCurrentLanguage(event.detail.language);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  const handleLanguageToggle = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    try {
      // Use the global language manager if available
      if (window.languageManager) {
        await window.languageManager.toggleLanguage();
      } else {
        // Fallback: toggle language directly
        const newLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
        setCurrentLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);
        
        // Apply basic language changes
        document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = newLanguage;
        document.body.className = document.body.className.replace(/lang-\w+/g, '');
        document.body.classList.add(`lang-${newLanguage}`);
      }
    } catch (error) {
      console.error('Failed to switch language:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleLanguageToggle}
      disabled={isLoading}
      className="flex items-center gap-2 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground"
    >
      <Globe className="h-4 w-4" />
      <span>{currentLanguage === 'ar' ? 'العربية' : 'English'}</span>
    </Button>
  );
}