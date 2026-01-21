/**
 * @file Barrel export file for all custom hooks.
 *
 * This file centralizes all hook exports for cleaner imports throughout the application.
 *
 * **Usage:**
 * ```tsx
 * // Instead of:
 * import { useTranslation } from '@/hooks/useTranslation';
 * import { useAnalytics } from '@/hooks/useAnalytics';
 *
 * // You can now do:
 * import { useTranslation, useAnalytics } from '@/hooks';
 * ```
 */

// Translation hook
export { useTranslation } from './useTranslation';

// Core hooks (shadcn/ui)
export { useToast } from './use-toast';
export { useIsMobile } from './use-mobile';

// Admin hooks
export { useAdmin } from './useAdmin';
export { useAdminMaterials } from './useAdminMaterials';

// Analytics and tracking
export { useAnalytics } from './useAnalytics';

// Animation hooks
export { useAnimations } from './useAnimations';

// Course-related hooks
export { useBenefits } from './useBenefits';
export { useCourseDays } from './useCourseDays';
export { useCourseMaterials } from './useCourseMaterials';
export { useCourseSettings } from './useCourseSettings';

// Content hooks
export { useDownload } from './useDownload';
export { useFAQs } from './useFAQs';
export { useSiteContent } from './useSiteContent';
export { useTargetAudience } from './useTargetAudience';
export { useTestimonials } from './useTestimonials';

// Instructor progress
export { useInstructorProgress } from './useInstructorProgress';
