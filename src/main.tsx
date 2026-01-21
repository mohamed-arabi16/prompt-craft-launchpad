import { createRoot } from 'react-dom/client'
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import App from './App.tsx'
import './index.css'

// Initialize Sentry for error tracking
if (import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.MODE,
    integrations: [
      new BrowserTracing(),
      new Sentry.Replay({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
    // Performance Monitoring
    tracesSampleRate: import.meta.env.MODE === 'production' ? 0.1 : 1.0,
    // Session Replay
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    // Ignore certain errors
    ignoreErrors: [
      // Ignore ResizeObserver errors which are non-critical
      'ResizeObserver loop limit exceeded',
      // Ignore cross-origin script errors
      'Script error',
      // Ignore network errors that are already handled
      'NetworkError',
      'Network request failed',
    ],
    beforeSend(event, hint) {
      // Filter out 404s in production as they're common and often not errors
      if (event.status === 404 && import.meta.env.MODE === 'production') {
        return null;
      }
      return event;
    },
  });
}

/**
 * The entry point of the application.
 * It renders the `App` component into the DOM.
 * Wrapped with Sentry's Profiler for performance monitoring.
 */
createRoot(document.getElementById("root")!).render(
  <Sentry.Profiler name="root">
    <App />
  </Sentry.Profiler>
);
