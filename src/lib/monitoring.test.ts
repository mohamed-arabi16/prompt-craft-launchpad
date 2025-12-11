import { describe, it, expect, vi, beforeEach } from 'vitest';
import { monitoring, logError, trackEvent, trackAction, trackPageView } from '@/lib/monitoring';

describe('Monitoring Service', () => {
  beforeEach(() => {
    monitoring.clearLogs();
  });

  describe('Error Logging', () => {
    it('should log an error with message and stack', () => {
      const error = new Error('Test error');
      logError(error);

      const logs = monitoring.getErrorLogs();
      expect(logs).toHaveLength(1);
      expect(logs[0].message).toBe('Test error');
      expect(logs[0].stack).toBeDefined();
    });

    it('should log error with context', () => {
      const error = new Error('Context error');
      logError(error, { userId: '123', action: 'test' });

      const logs = monitoring.getErrorLogs();
      expect(logs[0].context).toEqual({ userId: '123', action: 'test' });
    });

    it('should include timestamp in error logs', () => {
      const error = new Error('Timestamp test');
      logError(error);

      const logs = monitoring.getErrorLogs();
      expect(logs[0].timestamp).toBeDefined();
      expect(new Date(logs[0].timestamp)).toBeInstanceOf(Date);
    });

    it('should limit error logs to max capacity', () => {
      // Log more than max logs
      for (let i = 0; i < 150; i++) {
        logError(new Error(`Error ${i}`));
      }

      const logs = monitoring.getErrorLogs();
      expect(logs.length).toBeLessThanOrEqual(100);
    });
  });

  describe('Analytics Events', () => {
    it('should track a basic event', () => {
      trackEvent('test_event');

      const events = monitoring.getAnalyticsEvents();
      expect(events).toHaveLength(1);
      expect(events[0].event).toBe('test_event');
    });

    it('should track event with properties', () => {
      trackEvent('purchase', { amount: 99.99, currency: 'USD' });

      const events = monitoring.getAnalyticsEvents();
      expect(events[0].properties).toEqual({ amount: 99.99, currency: 'USD' });
    });

    it('should track page view', () => {
      trackPageView('/dashboard');

      const events = monitoring.getAnalyticsEvents();
      expect(events[0].event).toBe('page_view');
      expect(events[0].properties).toEqual({ path: '/dashboard' });
    });

    it('should track user action', () => {
      trackAction('button_click', { buttonId: 'submit-btn' });

      const events = monitoring.getAnalyticsEvents();
      expect(events[0].event).toBe('user_action');
      expect(events[0].properties).toEqual({ action: 'button_click', buttonId: 'submit-btn' });
    });

    it('should include timestamp in events', () => {
      trackEvent('timestamp_test');

      const events = monitoring.getAnalyticsEvents();
      expect(events[0].timestamp).toBeDefined();
    });

    it('should limit analytics events to max capacity', () => {
      for (let i = 0; i < 150; i++) {
        trackEvent(`event_${i}`);
      }

      const events = monitoring.getAnalyticsEvents();
      expect(events.length).toBeLessThanOrEqual(100);
    });
  });

  describe('Clear Logs', () => {
    it('should clear all logs and events', () => {
      logError(new Error('Test'));
      trackEvent('test');

      expect(monitoring.getErrorLogs()).toHaveLength(1);
      expect(monitoring.getAnalyticsEvents()).toHaveLength(1);

      monitoring.clearLogs();

      expect(monitoring.getErrorLogs()).toHaveLength(0);
      expect(monitoring.getAnalyticsEvents()).toHaveLength(0);
    });
  });
});
