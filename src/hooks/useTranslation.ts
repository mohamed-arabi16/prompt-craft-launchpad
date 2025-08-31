import { useState, useEffect } from 'react';

// Translation types
type Language = 'ar' | 'en';
type Translations = Record<string, string | string[]>;

// Translation data
const translationsData: Record<Language, () => Promise<Translations>> = {
  ar: () => fetch('/translations/ar.json').then(r => r.json()).catch(() =>
    fetch('/translations/ar.js').then(r => r.text()).then(text => {
      const match = text.match(/const translations = ({[\s\S]*?});/);
      return match ? eval(`(${match[1]})`) : {};
    })
  ),
  en: () => fetch('/translations/en.json').then(r => r.json()).catch(() =>
    fetch('/translations/en.js').then(r => r.text()).then(text => {
      const match = text.match(/const translations = ({[\s\S]*?});/);
      return match ? eval(`(${match[1]})`) : {};
    })
  )
};

export const useTranslation = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('ar');
  const [translations, setTranslations] = useState<Translations>({});
  const [isLoading, setIsLoading] = useState(false);

  // Load translations for current language
  const loadTranslations = async (language: Language) => {
    setIsLoading(true);
    try {
      const newTranslations = await translationsData[language]();
      setTranslations(newTranslations);
      
      // Update document properties
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
      document.body.className = document.body.className.replace(/lang-\w+/g, '');
      document.body.classList.add(`lang-${language}`);
      
      // Store in localStorage
      localStorage.setItem('language', language);
      
      // Dispatch event for any remaining DOM-based components
      window.dispatchEvent(new CustomEvent('languageChanged', { 
        detail: { language, translations: newTranslations } 
      }));
      
    } catch (error) {
      console.error('Failed to load translations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize on mount
  useEffect(() => {
    const savedLanguage = (localStorage.getItem('language') as Language) || 'ar';
    setCurrentLanguage(savedLanguage);
    loadTranslations(savedLanguage);
  }, []);

  // Toggle language function
  const toggleLanguage = async () => {
    if (isLoading) return;
    
    const newLanguage: Language = currentLanguage === 'ar' ? 'en' : 'ar';
    setCurrentLanguage(newLanguage);
    await loadTranslations(newLanguage);
  };

  // Get translation function
  const t = (key: string): string => {
    const value = translations[key];
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    return value || key;
  };

  // Get array translation function
  const tArray = (key: string): string[] => {
    const value = translations[key];
    return Array.isArray(value) ? value : [];
  };

  return {
    currentLanguage,
    translations,
    isLoading,
    toggleLanguage,
    t,
    tArray
  };
};