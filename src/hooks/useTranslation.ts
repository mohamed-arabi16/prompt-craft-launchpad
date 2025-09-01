// This file is refactored to use the new context-based translation hook.
// All components importing from here will now use the global translation state.
export { useTranslation } from '../context/TranslationContext';