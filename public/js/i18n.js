class LanguageManager {
  constructor() {
    this.currentLanguage = localStorage.getItem('language') || 'ar';
    this.translations = {};
    this.isLoading = false;
  }

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

  async loadTranslations() {
    return new Promise((resolve, reject) => {
      // Remove existing translation script
      const existingScript = document.querySelector('script[data-translation]');
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement('script');
      script.src = `/translations/${this.currentLanguage}.js`;
      script.dataset.translation = 'true';
      
      script.onload = () => {
        if (window.translations) {
          this.translations = window.translations;
          resolve();
        } else {
          reject(new Error('Translations not found'));
        }
      };
      
      script.onerror = () => {
        reject(new Error('Failed to load translation file'));
      };
      
      document.head.appendChild(script);
    });
  }

  applyLanguage() {
    // Set document direction and language
    document.documentElement.dir = this.currentLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = this.currentLanguage;
    
    // Add language class to body for CSS targeting
    document.body.className = document.body.className.replace(/lang-\w+/g, '');
    document.body.classList.add(`lang-${this.currentLanguage}`);
    
    // Update all text content
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

    // Update language switcher button
    const languageSwitcherBtn = document.querySelector('[data-language-switcher]');
    if (languageSwitcherBtn && this.translations.languageSwitcher) {
      languageSwitcherBtn.textContent = this.translations.languageSwitcher;
    }

    // Trigger custom event for React components
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language: this.currentLanguage } 
    }));
  }

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

  setupLanguageSwitcher() {
    const languageSwitcher = document.querySelector('[data-language-switcher]');
    if (languageSwitcher) {
      languageSwitcher.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleLanguage();
      });
    }
  }

  getCurrentLanguage() {
    return this.currentLanguage;
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.languageManager = new LanguageManager();
  window.languageManager.init();
});

// For React components to access
window.getLanguage = () => {
  return window.languageManager ? window.languageManager.getCurrentLanguage() : 'ar';
};