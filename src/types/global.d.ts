declare global {
  interface Window {
    languageManager?: {
      toggleLanguage(): Promise<void>;
      getCurrentLanguage(): string;
      init(): Promise<void>;
    };
    getLanguage?: () => string;
    translations?: Record<string, string>;
  }
}

export {};