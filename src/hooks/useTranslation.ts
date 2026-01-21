/**
 * @file Barrel export for the `useTranslation` hook.
 *
 * This file re-exports the `useTranslation` hook from the `TranslationContext`.
 *
 * **Purpose:** Maintain a consistent hook import pattern throughout the application.
 * All translation functionality is implemented directly in the TranslationContext,
 * and this file serves as a convenient re-export point for cleaner imports in components.
 *
 * **Usage:**
 * ```tsx
 * import { useTranslation } from '@/hooks/useTranslation';
 * // or directly from context:
 * import { useTranslation } from '@/contexts/TranslationContext';
 * ```
 */
export { useTranslation } from '../contexts/TranslationContext';