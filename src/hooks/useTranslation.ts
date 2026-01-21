/**
 * @file This file re-exports the `useTranslation` hook from the `TranslationContext`.
 * This is done to maintain backward compatibility with components that were using the old hook.
 */
// This file is refactored to use the new context-based translation hook.
// All components importing from here will now use the global translation state.
export { useTranslation } from '../contexts/TranslationContext';