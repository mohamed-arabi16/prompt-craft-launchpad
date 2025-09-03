import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

/**
 * The available languages.
 */
type Language = 'ar' | 'en';
/**
 * A record of translations.
 */
type Translations = Record<string, string | string[]>;

/**
 * The shape of the translation context.
 *
 * @interface TranslationContextType
 * @property {Language} currentLanguage - The current language.
 * @property {Translations} translations - The current translations.
 * @property {boolean} isLoading - Whether the translations are loading.
 * @property {() => void} toggleLanguage - A function to toggle the language.
 * @property {(key: string) => string} t - A function to get a translation.
 * @property {(key: string) => string[]} tArray - A function to get an array of translations.
 */
interface TranslationContextType {
  currentLanguage: Language;
  translations: Translations;
  isLoading: boolean;
  toggleLanguage: () => void;
  t: (key: string) => string;
  tArray: (key: string) => string[];
}

/**
 * The context for the translation provider.
 */
const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

/**
 * An object that fetches the translation data.
 */
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

/**
 * The provider for the translation context.
 *
 * @param {{ children: ReactNode }} props - The props for the component.
 * @returns {JSX.Element} The rendered translation provider.
 */
export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('ar');
  const [translations, setTranslations] = useState<Translations>({});
  const [englishTranslations, setEnglishTranslations] = useState<Translations>({});
  const [isLoading, setIsLoading] = useState(true);

  // Load English translations once on mount for fallback
  useEffect(() => {
    /**
     * Fetches the English translations to use as a fallback.
     */
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

  /**
   * Loads the translations for a given language.
   *
   * @param {Language} language - The language to load.
   */
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

  /**
   * Toggles the language between English and Arabic.
   */
  const toggleLanguage = async () => {
    if (isLoading) return;
    const newLanguage: Language = currentLanguage === 'ar' ? 'en' : 'ar';
    setCurrentLanguage(newLanguage);
    await loadTranslations(newLanguage);
  };

  /**
   * Gets the translation for a given key.
   *
   * @param {string} key - The key of the translation to get.
   * @returns {string} The translated string.
   */
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

  /**
   * Gets an array of translations for a given key.
   *
   * @param {string} key - The key of the translations to get.
   * @returns {string[]} The translated strings.
   */
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

/**
 * A hook to use the translation context.
 *
 * @returns {TranslationContextType} The translation context.
 * @throws {Error} If used outside of a `TranslationProvider`.
 */
export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
