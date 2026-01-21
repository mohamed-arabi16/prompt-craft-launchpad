/**
 * @file Barrel export file for admin components.
 *
 * This file centralizes all admin component exports for cleaner imports throughout the application.
 *
 * **Usage:**
 * ```tsx
 * // Instead of:
 * import AdminEnrollments from '@/components/admin/AdminEnrollments';
 * import AdminTestimonials from '@/components/admin/AdminTestimonials';
 *
 * // You can now do:
 * import { AdminEnrollments, AdminTestimonials } from '@/components/admin';
 * ```
 */

// Main admin dashboard
export { default as AdminDashboard } from './AdminDashboard';
export { default as InstructorDashboard } from './InstructorDashboard';

// Admin feature components
export { default as AdminEnrollments } from './AdminEnrollments';
export { default as AdminTestimonials } from './AdminTestimonials';
export { default as AdminFAQs } from './AdminFAQs';
export { default as AdminMaterials } from './AdminMaterials';
export { default as AdminBenefits } from './AdminBenefits';
export { default as AdminCourseDays } from './AdminCourseDays';
export { default as AdminCourseSettings } from './AdminCourseSettings';
export { default as AdminSiteContent } from './AdminSiteContent';
export { default as AdminTargetAudience } from './AdminTargetAudience';

// Utility/view components
export { default as DayProgressView } from './DayProgressView';
