import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

/**
 * The available languages.
 */
type Language = 'ar' | 'en';
/**
 * A recursive type for nested translations.
 */
type TranslationValue = string | string[] | { [key: string]: TranslationValue };
type Translations = Record<string, TranslationValue>;

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
  ar: () => fetch('/translations/ar.json').then(r => r.json()),
  en: () => fetch('/translations/en.json').then(r => r.json())
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
   * Safely retrieves a nested value from an object.
   *
   * @param {Translations} obj - The object to search.
   * @param {string} path - The path to the value.
   * @returns {TranslationValue | undefined} The value if found, otherwise undefined.
   */
  const getNestedValue = (obj: Translations, path: string): TranslationValue | undefined => {
    return path.split('.').reduce<TranslationValue | undefined>((current, key) => {
      if (current && typeof current === 'object' && key in current) {
        return (current as { [key: string]: TranslationValue })[key];
      }
      return undefined;
    }, obj);
  };

  /**
   * Gets the translation for a given key.
   * It handles nested keys and falls back to English if the translation is not found.
   *
   * @param {string} key - The key of the translation to get.
   * @returns {string} The translated string.
   */
  const t = (key: string): string => {
    let value = getNestedValue(translations, key);

    // If no value, try the English fallback
    if (value === undefined) {
      value = getNestedValue(englishTranslations, key);
      if (value !== undefined && process.env.NODE_ENV === 'development') {
        console.warn(`Translation for key '${key}' not found in '${currentLanguage}'. Using English fallback.`);
      }
    }

    // If still no value, return the key and warn
    if (value === undefined) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Translation for key '${key}' not found.`);
      }
      return key;
    }

    // Return the value, formatted if it's an array
    return Array.isArray(value) ? value.join(', ') : String(value);
  };

  /**
   * Gets an array of translations for a given key.
   * It handles nested keys and falls back to English.
   *
   * @param {string} key - The key of the translations to get.
   * @returns {string[]} The translated strings.
   */
  const tArray = (key: string): string[] => {
    let value = getNestedValue(translations, key);

    // If no value, try the English fallback
    if (value === undefined) {
      value = getNestedValue(englishTranslations, key);
    }

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
