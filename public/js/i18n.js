/**
 * A class to manage the language of the application.
 *
 * @class LanguageManager
 */
class LanguageManager {
  /**
   * Creates an instance of LanguageManager.
   */
  constructor() {
    this.currentLanguage = localStorage.getItem('language') || 'ar';
    this.translations = {};
    this.isLoading = false;
  }

  /**
   * Initializes the language manager.
   */
  async init() {
    if (this.isLoading) return;
    this.isLoading = true;
    
    try {
      await this.loadTranslations();
      this.applyLanguage();
      this.setupLanguageSwitcher();
    } catch (error) {
      console.error('Failed to initialize language manager:', error);
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Loads the translations for the current language.
   *
   * @returns {Promise<void>} A promise that resolves when the translations are loaded.
   */
  async loadTranslations() {
    try {
      const response = await fetch(`/translations/${this.currentLanguage}.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.translations = await response.json();
      // For compatibility with any old script that might still use window.translations
      window.translations = this.translations;
    } catch (error) {
      console.error('Failed to load translations:', error);
      this.translations = {}; // Reset translations on error
      throw error; // Re-throw the error to be caught by the caller
    }
  }

  /**
   * Applies the translations to the DOM.
   */
  applyLanguage() {
    // Set document direction and language
    document.documentElement.dir = this.currentLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = this.currentLanguage;
    
    // Add language class to body for CSS targeting
    document.body.className = document.body.className.replace(/lang-\w+/g, '');
    document.body.classList.add(`lang-${this.currentLanguage}`);
    
    // Update all text content with improved selectors
    Object.keys(this.translations).forEach(key => {
      const elements = document.querySelectorAll(`[data-i18n="${key}"]`);
      elements.forEach(el => {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = this.translations[key];
        } else {
          el.textContent = this.translations[key];
        }
      });
    });

    // Handle custom attribute for initials
    const avatarElements = document.querySelectorAll('[data-i18n-initials-from]');
    avatarElements.forEach(el => {
      const key = el.getAttribute('data-i18n-initials-from');
      if (key && this.translations[key]) {
        const name = this.translations[key];
        const initials = name.split(' ').map((n) => n[0]).join('');
        el.textContent = initials;
      }
    });

    // Handle list rendering
    const listElements = document.querySelectorAll('[data-i18n-list]');
    listElements.forEach(el => {
      const key = el.getAttribute('data-i18n-list');
      if (key && this.translations[key] && Array.isArray(this.translations[key])) {
        el.innerHTML = ''; // Clear existing content
        this.translations[key].forEach(item => {
          const li = document.createElement('li');
          // This is a simplified version, might need more robust styling/structure
          li.className = 'flex items-start gap-2';
          li.innerHTML = `<div class="h-1.5 w-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div><span class="text-muted-foreground">${item}</span>`;
          el.appendChild(li);
        });
      }
    });

    // Force update all React components by triggering a more comprehensive re-render
    const reactRoots = document.querySelectorAll('[data-reactroot], #root');
    reactRoots.forEach(root => {
      // Add a small delay to ensure React state updates properly
      setTimeout(() => {
        const event = new CustomEvent('forceTranslationUpdate', {
          detail: { 
            language: this.currentLanguage,
            translations: this.translations 
          }
        });
        root.dispatchEvent(event);
      }, 50);
    });

    // Trigger custom event for React components
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { 
        language: this.currentLanguage,
        translations: this.translations
      } 
    }));
  }

  /**
   * Toggles the language between English and Arabic.
   */
  async toggleLanguage() {
    if (this.isLoading) return;
    
    this.currentLanguage = this.currentLanguage === 'ar' ? 'en' : 'ar';
    localStorage.setItem('language', this.currentLanguage);
    
    try {
      await this.loadTranslations();
      this.applyLanguage();
    } catch (error) {
      console.error('Failed to switch language:', error);
      // Revert language change on error
      this.currentLanguage = this.currentLanguage === 'ar' ? 'en' : 'ar';
      localStorage.setItem('language', this.currentLanguage);
    }
  }

  /**
   * Sets up the language switcher button.
   */
  setupLanguageSwitcher() {
    const languageSwitcher = document.querySelector('[data-language-switcher]');
    if (languageSwitcher) {
      languageSwitcher.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleLanguage();
      });
    }
  }

  /**
   * Gets the current language.
   *
   * @returns {string} The current language.
   */
  getCurrentLanguage() {
    return this.currentLanguage;
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.languageManager = new LanguageManager();
  window.languageManager.init();
});

/**
 * Gets the current language.
 *
 * @returns {string} The current language.
 */
// For React components to access
window.getLanguage = () => {
  return window.languageManager ? window.languageManager.getCurrentLanguage() : 'ar';
};