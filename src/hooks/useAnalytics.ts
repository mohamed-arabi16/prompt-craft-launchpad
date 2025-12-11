import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView, trackAction, trackEvent } from '@/lib/monitoring';

/**
 * Hook for tracking analytics events in components
 */
export const useAnalytics = () => {
  const location = useLocation();

  // Track page views on route change
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  return {
    trackEvent,
    trackAction,
    trackPageView,
  };
};

/**
 * Pre-defined events for common user actions
 */
export const AnalyticsEvents = {
  // Auth events
  SIGN_UP_STARTED: 'sign_up_started',
  SIGN_UP_COMPLETED: 'sign_up_completed',
  SIGN_IN_STARTED: 'sign_in_started',
  SIGN_IN_COMPLETED: 'sign_in_completed',
  SIGN_OUT: 'sign_out',
  
  // Enrollment events
  ENROLLMENT_STARTED: 'enrollment_started',
  ENROLLMENT_COMPLETED: 'enrollment_completed',
  ENROLLMENT_ERROR: 'enrollment_error',
  
  // Download events
  DOWNLOAD_STARTED: 'download_started',
  DOWNLOAD_COMPLETED: 'download_completed',
  DOWNLOAD_ERROR: 'download_error',
  
  // Contact events
  CONTACT_FORM_SUBMITTED: 'contact_form_submitted',
  
  // Navigation events
  CTA_CLICKED: 'cta_clicked',
  EXTERNAL_LINK_CLICKED: 'external_link_clicked',
} as const;

export type AnalyticsEventType = typeof AnalyticsEvents[keyof typeof AnalyticsEvents];
