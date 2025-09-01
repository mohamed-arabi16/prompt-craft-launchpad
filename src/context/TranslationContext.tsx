import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Translation types
type Language = 'ar' | 'en';
type Translations = Record<string, string | string[]>;

// Context shape
interface TranslationContextType {
  currentLanguage: Language;
  translations: Translations;
  isLoading: boolean;
  toggleLanguage: () => void;
  t: (key: string) => string;
  tArray: (key: string) => string[];
}

// Create the context
const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

// Translation data fetcher
const translationsData: Record<Language, () => Promise<Translations>> = {
  ar: () => fetch('/translations/ar.js').then(r => r.text()).then(text => {
    const match = text.match(/const translations = ({[\s\S]*?});/);
    return match ? eval(`(${match[1]})`) : {};
  }),
  en: () => fetch('/translations/en.js').then(r => r.text()).then(text => {
    const match = text.match(/const translations = ({[\s\S]*?});/);
    return match ? eval(`(${match[1]})`) : {};
  })
};

// Create the provider component
export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('ar');
  const [translations, setTranslations] = useState<Translations>({});
  const [englishTranslations, setEnglishTranslations] = useState<Translations>({});
  const [isLoading, setIsLoading] = useState(true);

  // Load English translations once on mount for fallback
  useEffect(() => {
    const fetchEnglishTranslations = async () => {
      try {
        const enTranslations = await translationsData['en']();
        setEnglishTranslations(enTranslations);
      } catch (error) {
        console.error('Failed to load English fallback translations:', error);
      }
    };
    fetchEnglishTranslations();
  }, []);

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

      // Dispatch event for compatibility with i18n.js and other listeners
      window.dispatchEvent(new CustomEvent('languageChanged', {
        detail: { language, translations: newTranslations }
      }));

    } catch (error) {
      console.error(`Failed to load ${language} translations:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const savedLanguage = (localStorage.getItem('language') as Language) || 'ar';
    setCurrentLanguage(savedLanguage);
    loadTranslations(savedLanguage);
  }, []);

  const toggleLanguage = async () => {
    if (isLoading) return;
    const newLanguage: Language = currentLanguage === 'ar' ? 'en' : 'ar';
    setCurrentLanguage(newLanguage);
    await loadTranslations(newLanguage);
  };

  const t = (key: string): string => {
    // Try to get the translation from the current language
    const value = translations[key];
    if (value) {
      return Array.isArray(value) ? value.join(', ') : (value as string);
    }

    // Fallback to English if the key is missing in the current language
    const fallbackValue = englishTranslations[key];
    if (fallbackValue) {
      // Log a warning in development that we're using a fallback
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Missing translation for key: ${key} in language: ${currentLanguage}. Using English fallback.`);
      }
      return Array.isArray(fallbackValue) ? fallbackValue.join(', ') : (fallbackValue as string);
    }
    
    // If the key is not found in either, return the key and log a warning
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Missing translation for key: ${key} in both ${currentLanguage} and English.`);
    }
    
    return key;
  };

  const tArray = (key: string): string[] => {
    const value = translations[key];
    return Array.isArray(value) ? value : [];
  };

  const value = {
    currentLanguage,
    translations,
    isLoading,
    toggleLanguage,
    t,
    tArray
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

// Create the hook to use the context
export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
