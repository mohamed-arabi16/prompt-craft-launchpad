/**
 * Simple error tracking and logging service.
 * In production, this could be extended to use services like Sentry.
 */

interface ErrorLog {
  message: string;
  stack?: string;
  context?: Record<string, unknown>;
  timestamp: string;
  url: string;
  userAgent: string;
}

interface AnalyticsEvent {
  event: string;
  properties?: Record<string, unknown>;
  timestamp: string;
}

class MonitoringService {
  private errorLogs: ErrorLog[] = [];
  private analyticsEvents: AnalyticsEvent[] = [];
  private maxLogs = 100;

  /**
   * Log an error with context
   */
  logError(error: Error, context?: Record<string, unknown>) {
    const errorLog: ErrorLog = {
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    };

    this.errorLogs.push(errorLog);
    
    // Keep only last N logs
    if (this.errorLogs.length > this.maxLogs) {
      this.errorLogs.shift();
    }

    // Log to console in development
    if (import.meta.env.DEV) {
      console.error('[Error Tracking]', errorLog);
    }

    // In production, this could send to an external service
    // this.sendToExternalService(errorLog);
  }

  /**
   * Track an analytics event
   */
  trackEvent(event: string, properties?: Record<string, unknown>) {
    const analyticsEvent: AnalyticsEvent = {
      event,
      properties,
      timestamp: new Date().toISOString(),
    };

    this.analyticsEvents.push(analyticsEvent);

    // Keep only last N events
    if (this.analyticsEvents.length > this.maxLogs) {
      this.analyticsEvents.shift();
    }

    // Log to console in development
    if (import.meta.env.DEV) {
      console.log('[Analytics]', analyticsEvent);
    }
  }

  /**
   * Track page view
   */
  trackPageView(path: string) {
    this.trackEvent('page_view', { path });
  }

  /**
   * Track user action
   */
  trackAction(action: string, details?: Record<string, unknown>) {
    this.trackEvent('user_action', { action, ...details });
  }

  /**
   * Get all error logs (for debugging)
   */
  getErrorLogs(): ErrorLog[] {
    return [...this.errorLogs];
  }

  /**
   * Get all analytics events (for debugging)
   */
  getAnalyticsEvents(): AnalyticsEvent[] {
    return [...this.analyticsEvents];
  }

  /**
   * Clear all logs
   */
  clearLogs() {
    this.errorLogs = [];
    this.analyticsEvents = [];
  }
}

// Singleton instance
export const monitoring = new MonitoringService();

// Convenience functions
export const logError = (error: Error, context?: Record<string, unknown>) => 
  monitoring.logError(error, context);

export const trackEvent = (event: string, properties?: Record<string, unknown>) => 
  monitoring.trackEvent(event, properties);

export const trackPageView = (path: string) => 
  monitoring.trackPageView(path);

export const trackAction = (action: string, details?: Record<string, unknown>) => 
  monitoring.trackAction(action, details);

// Global error handler
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    monitoring.logError(new Error(event.message), {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    });
  });

  window.addEventListener('unhandledrejection', (event) => {
    const error = event.reason instanceof Error 
      ? event.reason 
      : new Error(String(event.reason));
    monitoring.logError(error, { type: 'unhandled_promise_rejection' });
  });
}
