# Production Readiness Roadmap

> **Generated:** January 2026
> **Status:** Audit Complete - Action Plan Ready
> **Priority Legend:** 🔴 Critical | 🟠 High | 🟡 Medium | 🟢 Low

---

## Executive Summary

This document provides a comprehensive audit and step-by-step action plan to prepare the codebase for production launch. Each task is written as a clear instruction that can be executed by a Junior Developer or a smaller AI model without needing extra context.

### Current State Assessment

| Category | Status | Issues Found |
|----------|--------|--------------|
| Code Quality | 🟡 Good | Minor refactoring needed |
| Performance | 🟠 Moderate | Optimization opportunities |
| Security | 🟡 Good | Some hardening needed |
| Accessibility | 🟡 Good | RTL improvements needed |
| Testing | 🔴 Weak | Minimal test coverage |
| Documentation | 🟡 Good | Needs updates |

---

## Phase 1: Standardization

### 1.1 Refactor Context Structure

- [x] 🟠 **Task 1.1.1:** Move `TranslationContext.tsx` from `/src/context/` to `/src/contexts/` to consolidate all contexts in one folder.
  - **File:** `src/context/TranslationContext.tsx`
  - **Action:** Move file to `src/contexts/TranslationContext.tsx`
  - **Update imports in:** `src/App.tsx`, `src/hooks/useTranslation.ts`

- [x] 🟢 **Task 1.1.2:** Add TypeScript `React.FC` type annotations to all context providers.
  - **Files:** `src/contexts/AuthContext.tsx`, `src/contexts/SoundContext.tsx`, `src/contexts/TranslationContext.tsx`
  - **Example:** Change `({ children }: { children: ReactNode })` to explicit `React.FC<{ children: ReactNode }>`

### 1.2 Consolidate Hooks

- [x] 🟠 **Task 1.2.1:** Remove duplicate `useTranslation.ts` hook and use context hook directly.
  - **File:** `src/hooks/useTranslation.ts`
  - **Action:** Verify it's just re-exporting from context, if so, update all imports to use `src/contexts/TranslationContext.tsx` directly or keep as barrel export but document purpose

- [x] 🟡 **Task 1.2.2:** Create an `index.ts` barrel file in `/src/hooks/` to export all hooks.
  - **File to create:** `src/hooks/index.ts`
  - **Content:** Export all hooks from the directory for cleaner imports

- [x] 🟡 **Task 1.2.3:** Add JSDoc comments to all custom hooks that are missing documentation.
  - **Files:** `src/hooks/useAnalytics.ts`, `src/hooks/useAnimations.ts`, `src/hooks/useAdminMaterials.ts`
  - **Format:** Add `@description`, `@returns`, `@example` tags

### 1.3 Consolidate Styles

- [x] 🟠 **Task 1.3.1:** Audit and remove unused CSS classes from `src/index.css`.
  - **File:** `src/index.css`
  - **Action:** Search codebase for each custom class (`.hero-gradient`, `.btn-ai-primary`, etc.) and remove unused ones
  - **Tools:** Use `grep -r "className-name"` to find usage

- [x] 🟡 **Task 1.3.2:** Move animation keyframes from `src/index.css` to `tailwind.config.ts` for consistency.
  - **File:** `src/index.css` (lines 397-557)
  - **Action:** Keyframes like `fadeInUp`, `slideInRight`, `shimmer` should be in Tailwind config
  - **Benefit:** Single source of truth for animations

- [x] 🟡 **Task 1.3.3:** Create CSS variables for magic numbers in animations.
  - **File:** `src/index.css`
  - **Action:** Replace hardcoded values like `6s`, `8s`, `20px` with CSS variables (e.g., `--animation-float-duration: 6s`)

- [x] 🟢 **Task 1.3.4:** Add missing Tailwind safelist for dynamic RTL classes.
  - **File:** `tailwind.config.ts`
  - **Action:** Add safelist for classes like `ltr:mr-2`, `rtl:ml-2` to prevent purging

### 1.4 Component Organization

- [x] 🟠 **Task 1.4.1:** Create `index.ts` barrel file in `/src/components/admin/`.
  - **File to create:** `src/components/admin/index.ts`
  - **Content:** Export all admin components

- [x] 🟡 **Task 1.4.2:** Create `index.ts` barrel file in `/src/components/ui/`.
  - **File to create:** `src/components/ui/index.ts`
  - **Content:** Export all UI components for easier imports

- [x] 🟡 **Task 1.4.3:** Move `BookingFormModal.tsx` to a `/src/components/modals/` folder.
  - **Action:** Create `src/components/modals/` directory and move modal components there

---

## Phase 2: Cleanup & Performance

### 2.1 Remove Dead Code

- [x] 🔴 **Task 2.1.1:** Remove `lovable-tagger` from devDependencies if not used in production.
  - **File:** `package.json` (line 88)
  - **Action:** Check if `componentTagger()` is only used in development mode (it is), consider removing from production builds

- [x] 🟠 **Task 2.1.2:** Audit and remove unused Radix UI packages.
  - **File:** `package.json`
  - **Action:** Check if these packages are actually used:
    - `@radix-ui/react-aspect-ratio`
    - `@radix-ui/react-context-menu`
    - `@radix-ui/react-hover-card`
    - `@radix-ui/react-menubar`
    - `@radix-ui/react-navigation-menu`
    - `@radix-ui/react-slider`
    - `@radix-ui/react-toggle`
    - `@radix-ui/react-toggle-group`
  - **Tool:** Run `grep -r "@radix-ui/react-aspect-ratio" src/` for each package

- [x] 🟠 **Task 2.1.3:** Remove unused `AdminPanel.tsx` component if it duplicates `AdminDashboard.tsx`.
  - **File:** `src/components/AdminPanel.tsx`
  - **Action:** Verify if this file is used; if `AdminDashboard.tsx` is the main admin component, remove `AdminPanel.tsx`

- [x] 🟡 **Task 2.1.4:** Remove unused `react-resizable-panels` package if not used.
  - **File:** `package.json` (line 63)
  - **Action:** Search for usage: `grep -r "react-resizable-panels" src/`

- [x] 🟡 **Task 2.1.5:** Remove unused `@types/canvas-confetti` if types are bundled.
  - **File:** `package.json` (line 47)
  - **Action:** `canvas-confetti` may have built-in types; verify and remove if redundant

- [x] 🟢 **Task 2.1.6:** Clean up commented-out code in components.
  - **Action:** Search for `// TODO`, `// FIXME`, `/* commented */` patterns and resolve or remove

### 2.2 Optimization

- [x] 🔴 **Task 2.2.1:** Add React.memo() to heavy components that receive stable props.
  - **Files to optimize:**
    - `src/components/TestimonialsSection.tsx`
    - `src/components/CourseBreakdown.tsx`
    - `src/components/FAQ.tsx`
  - **Example:** `export default React.memo(TestimonialsSection);`

- [x] 🔴 **Task 2.2.2:** Implement lazy loading for admin components.
  - **File:** `src/components/admin/AdminDashboard.tsx`
  - **Action:** Lazy load each tab content:
    ```tsx
    const AdminEnrollments = lazy(() => import('./AdminEnrollments'));
    ```
  - **Wrap with:** `<Suspense fallback={<LoadingSpinner />}>`

- [x] 🟠 **Task 2.2.3:** Add `loading="lazy"` attribute to all images.
  - **Files:** Search for `<img` tags in all components
  - **Action:** Add `loading="lazy"` attribute to defer off-screen images

- [x] 🟠 **Task 2.2.4:** Optimize Framer Motion animations by using `layoutId` where appropriate.
  - **Files:** `src/components/premium/PageTransitionWrapper.tsx`, `src/components/HeroSection.tsx`
  - **Action:** Use `layoutId` for shared elements between pages

- [x] 🟠 **Task 2.2.5:** Add `useMemo` for expensive translation array operations.
  - **File:** `src/pages/Index.tsx` (line 49)
  - **Action:** Memoize `tArray('structuredDataTeaches')` call:
    ```tsx
    const teaches = useMemo(() => tArray('structuredDataTeaches'), [tArray]);
    ```

- [x] 🟡 **Task 2.2.6:** Implement virtualization for testimonials carousel if > 10 items.
  - **File:** `src/components/TestimonialsSection.tsx`
  - **Action:** Consider using `react-window` or Embla's built-in virtualization

- [x] 🟡 **Task 2.2.7:** Add preload hints for critical fonts.
  - **File:** `index.html`
  - **Action:** Add `<link rel="preload" href="fonts/Cairo.woff2" as="font" type="font/woff2" crossorigin>`

- [x] 🟡 **Task 2.2.8:** Configure service worker for offline support.
  - **Action:** Add `vite-plugin-pwa` and configure basic offline caching

- [x] 🟢 **Task 2.2.9:** Add debounce to search/filter inputs in admin panels.
  - **Files:** `src/components/admin/AdminEnrollments.tsx`
  - **Action:** Use `useDeferredValue` or debounce hook for filter inputs

### 2.3 Bundle Optimization

- [x] 🟠 **Task 2.3.1:** Analyze bundle size and identify large dependencies.
  - **Command:** `npm run build && npx vite-bundle-visualizer`
  - **Action:** Generate report and identify chunks > 200KB

- [x] 🟠 **Task 2.3.2:** Split Framer Motion into a separate chunk.
  - **File:** `vite.config.ts`
  - **Action:** Add to `manualChunks`:
    ```ts
    motion: ['framer-motion'],
    ```

- [x] 🟡 **Task 2.3.3:** Enable tree-shaking for Lucide icons.
  - **Action:** Verify imports are using named imports like `import { Icon } from 'lucide-react'` not `import * as Icons`

- [x] 🟡 **Task 2.3.4:** Add chunk naming for better debugging.
  - **File:** `vite.config.ts`
  - **Action:** Add `chunkFileNames: '[name]-[hash].js'` to output options

---

## Phase 3: Enhancements Needed Before Production

### 3.1 Security Hardening

- [x] 🔴 **Task 3.1.1:** Add rate limiting for enrollment form submissions.
  - **File:** `src/pages/Enrollment.tsx`
  - **Action:** Implement client-side throttling (max 1 submission per 30 seconds)
  - **Implementation:** Add state to track last submission time

- [x] 🔴 **Task 3.1.2:** Add CSRF protection tokens for form submissions.
  - **Action:** Implement CSRF token generation and validation
  - **Supabase:** Use RLS policies to validate user context

- [x] 🔴 **Task 3.1.3:** Sanitize HTML content before rendering in admin panels.
  - **Files:** All admin components that display user-submitted content
  - **Action:** Use DOMPurify for any dangerouslySetInnerHTML usage

- [x] 🟠 **Task 3.1.4:** Add input validation for all admin forms.
  - **Files:** `src/components/admin/AdminTestimonials.tsx`, `AdminFAQs.tsx`, etc.
  - **Action:** Add Zod schemas similar to enrollment form validation

- [x] 🟠 **Task 3.1.5:** Implement Content Security Policy headers.
  - **Action:** Add CSP meta tag to `index.html` or configure via hosting platform
  - **Example:** `<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline';">`

- [x] 🟠 **Task 3.1.6:** Add secure headers configuration.
  - **File:** Create `vercel.json` or `netlify.toml`
  - **Headers:** X-Frame-Options, X-Content-Type-Options, Referrer-Policy

- [x] 🟡 **Task 3.1.7:** Validate Supabase URL and key are not exposed in client bundle.
  - **Action:** Verify environment variables are properly prefixed with `VITE_` and only public keys are used

- [x] 🟡 **Task 3.1.8:** Add session timeout handling.
  - **File:** `src/contexts/AuthContext.tsx`
  - **Action:** Implement auto-logout after inactivity period

### 3.2 Error Handling

- [x] 🔴 **Task 3.2.1:** Add error boundary wrappers around each route.
  - **File:** `src/App.tsx`
  - **Action:** Wrap each Route component with individual ErrorBoundary
  - **Benefit:** Prevents entire app crash on single page error

- [x] 🔴 **Task 3.2.2:** Implement global error tracking/reporting.
  - **Action:** Integrate Sentry or similar error tracking service
  - **Files:** `src/main.tsx`, `src/components/ErrorBoundary.tsx`

- [x] 🟠 **Task 3.2.3:** Add error boundaries to admin dashboard tabs.
  - **File:** `src/components/admin/AdminDashboard.tsx`
  - **Action:** Wrap each TabsContent with ErrorBoundary

- [x] 🟠 **Task 3.2.4:** Improve error messages in AuthContext.
  - **File:** `src/contexts/AuthContext.tsx`
  - **Action:** Add user-friendly error messages with translation keys for all error cases

- [x] 🟡 **Task 3.2.5:** Add retry logic for failed Supabase queries.
  - **Files:** All hooks using `supabase.from()`
  - **Action:** Implement exponential backoff retry (already configured in QueryClient, verify hooks use it)

- [ ] 🟡 **Task 3.2.6:** Add offline detection and user notification.
  - **File:** `src/App.tsx`
  - **Action:** Listen for `online`/`offline` events and show toast notification

### 3.3 Testing

- [ ] 🔴 **Task 3.3.1:** Add unit tests for validation schemas.
  - **File:** `src/lib/validations.test.ts` (expand existing)
  - **Tests to add:**
    - Test all edge cases for enrollmentSchema
    - Test contactSchema validation
    - Test signUpSchema password requirements

- [ ] 🔴 **Task 3.3.2:** Add unit tests for AuthContext.
  - **File to create:** `src/contexts/AuthContext.test.tsx`
  - **Tests:**
    - Mock Supabase client
    - Test signUp flow with enrollment check
    - Test signIn flow
    - Test signOut clears localStorage

- [ ] 🔴 **Task 3.3.3:** Add unit tests for TranslationContext.
  - **File to create:** `src/contexts/TranslationContext.test.tsx`
  - **Tests:**
    - Test language toggle
    - Test fallback to English
    - Test nested key access

- [ ] 🟠 **Task 3.3.4:** Add integration tests for enrollment flow.
  - **File to create:** `src/pages/Enrollment.test.tsx`
  - **Tests:**
    - Form validation errors display
    - Successful submission
    - Confetti trigger on success

- [ ] 🟠 **Task 3.3.5:** Add integration tests for protected routes.
  - **File to create:** `src/components/ProtectedRoute.test.tsx`
  - **Tests:**
    - Redirect when not authenticated
    - Allow access when authenticated
    - Admin-only route protection

- [ ] 🟡 **Task 3.3.6:** Add visual regression tests for key pages.
  - **Action:** Set up Playwright or Cypress for screenshot comparison
  - **Pages to test:** Landing, Auth, Dashboard

- [ ] 🟡 **Task 3.3.7:** Add accessibility tests.
  - **Action:** Add `jest-axe` or similar for automated a11y checks
  - **File to create:** `src/pages/Index.a11y.test.tsx`

### 3.4 Accessibility Improvements

- [ ] 🔴 **Task 3.4.1:** Add skip-to-content link for keyboard users.
  - **File:** `src/App.tsx`
  - **Action:** Add `<a href="#main-content" className="sr-only focus:not-sr-only">Skip to content</a>`

- [ ] 🟠 **Task 3.4.2:** Add ARIA labels to all interactive elements.
  - **Files:** All button and link components
  - **Action:** Audit and add `aria-label` where icon-only buttons exist

- [ ] 🟠 **Task 3.4.3:** Improve focus management after modal open/close.
  - **Files:** `src/components/BookingFormModal.tsx`
  - **Action:** Return focus to trigger element on modal close

- [ ] 🟠 **Task 3.4.4:** Add aria-live regions for toast notifications.
  - **File:** `src/components/ui/sonner.tsx`
  - **Action:** Verify Sonner has proper aria-live announcements

- [ ] 🟡 **Task 3.4.5:** Test and fix RTL layout issues.
  - **Action:** Manual testing of all pages in Arabic mode
  - **Focus:** Check icon positions, spacing, text alignment

- [ ] 🟡 **Task 3.4.6:** Add keyboard navigation to testimonials carousel.
  - **File:** `src/components/TestimonialsSection.tsx`
  - **Action:** Ensure arrow keys navigate slides, add focus indicators

- [ ] 🟢 **Task 3.4.7:** Add high contrast mode support.
  - **File:** `src/index.css`
  - **Action:** Add `@media (prefers-contrast: high)` styles

### 3.5 Monitoring & Analytics

- [ ] 🟠 **Task 3.5.1:** Implement Core Web Vitals tracking.
  - **Action:** Add `web-vitals` package and log metrics
  - **File to create:** `src/lib/analytics.ts`

- [ ] 🟠 **Task 3.5.2:** Add page view tracking.
  - **File:** `src/hooks/useAnalytics.ts`
  - **Action:** Track route changes and user interactions

- [ ] 🟡 **Task 3.5.3:** Add download tracking for course materials.
  - **File:** `src/hooks/useCourseMaterials.ts`
  - **Action:** Log successful downloads with material ID and user

- [ ] 🟡 **Task 3.5.4:** Implement health check endpoint monitoring.
  - **Action:** Set up external monitoring for `supabase/functions/health-check`

### 3.6 Internationalization Improvements

- [ ] 🟠 **Task 3.6.1:** Audit translation files for missing keys.
  - **Files:** `public/translations/ar.json`, `public/translations/en.json`
  - **Action:** Create script to compare keys between files and list missing translations

- [ ] 🟠 **Task 3.6.2:** Add error message translations.
  - **Files:** Translation JSON files
  - **Action:** Add missing error message keys used in code

- [ ] 🟡 **Task 3.6.3:** Add date/time localization.
  - **Files:** `src/pages/Dashboard.tsx` (line 176)
  - **Action:** Use `date-fns` locale for date formatting based on `currentLanguage`

- [ ] 🟡 **Task 3.6.4:** Add number formatting for prices.
  - **Files:** CTA sections
  - **Action:** Use `Intl.NumberFormat` with appropriate locale

---

## Phase 4: Final Polish

### 4.1 Verify Shadcn Standards

- [ ] 🟠 **Task 4.1.1:** Update shadcn/ui components to latest versions.
  - **Action:** Run `npx shadcn-ui@latest diff` to check for updates
  - **Review:** Update components that have significant improvements

- [ ] 🟠 **Task 4.1.2:** Ensure all form components use shadcn Form with React Hook Form.
  - **Files:** `src/pages/Enrollment.tsx`, `src/pages/Auth.tsx`, `src/pages/Contact.tsx`
  - **Action:** Verify consistent usage of shadcn Form components

- [ ] 🟡 **Task 4.1.3:** Replace custom loading spinners with shadcn skeleton.
  - **Files:** Components using `LoadingSpinner`
  - **Action:** Use `Skeleton` component for content loading states

- [ ] 🟡 **Task 4.1.4:** Standardize toast notifications.
  - **Action:** Audit use of both `Toaster` and `Sonner` - pick one
  - **Recommendation:** Sonner is more modern; remove unused toaster

- [ ] 🟢 **Task 4.1.5:** Update button variants to match design system.
  - **Action:** Ensure all buttons use standard variants: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`

### 4.2 SEO & Meta Tags

- [ ] 🟠 **Task 4.2.1:** Add meta tags to all pages.
  - **Files:** All page components
  - **Action:** Each page should set appropriate `<title>` and `<meta name="description">`
  - **Use:** React Helmet or manual `document.title` updates

- [ ] 🟠 **Task 4.2.2:** Add Open Graph images for social sharing.
  - **Action:** Create OG images for each page type
  - **File:** Add `<meta property="og:image">` tags

- [ ] 🟡 **Task 4.2.3:** Create and add sitemap.xml.
  - **File to create:** `public/sitemap.xml`
  - **Content:** List all public routes

- [ ] 🟡 **Task 4.2.4:** Create and add robots.txt.
  - **File to create:** `public/robots.txt`
  - **Content:** Define crawling rules, reference sitemap

- [ ] 🟢 **Task 4.2.5:** Add canonical URLs to prevent duplicate content.
  - **Action:** Add `<link rel="canonical">` to all pages

### 4.3 Documentation Updates

- [ ] 🟠 **Task 4.3.1:** Update README.md with deployment instructions.
  - **File:** `README.md`
  - **Content:** Add production deployment guide

- [ ] 🟠 **Task 4.3.2:** Create CONTRIBUTING.md for team guidelines.
  - **File to create:** `CONTRIBUTING.md`
  - **Content:** Code style, PR process, testing requirements

- [ ] 🟡 **Task 4.3.3:** Add inline code comments for complex logic.
  - **Files:** `src/contexts/AuthContext.tsx`, `src/hooks/useCourseMaterials.ts`
  - **Action:** Add explanatory comments for non-obvious code

- [ ] 🟡 **Task 4.3.4:** Document environment variables.
  - **File to create:** `.env.example`
  - **Content:** List all required env vars with descriptions

- [ ] 🟢 **Task 4.3.5:** Add API documentation for Edge Functions.
  - **File to create:** `docs/API.md`
  - **Content:** Document request/response for `download-material`, `health-check`

### 4.4 Pre-Launch Checklist

- [ ] 🔴 **Task 4.4.1:** Run full production build and verify no errors.
  - **Command:** `npm run build`
  - **Check:** No TypeScript errors, no build warnings

- [ ] 🔴 **Task 4.4.2:** Test all user flows in production mode.
  - **Command:** `npm run build && npm run preview`
  - **Flows to test:**
    - Landing page load
    - Language toggle
    - Enrollment form submission
    - User sign up/sign in
    - Dashboard access
    - Material download

- [ ] 🔴 **Task 4.4.3:** Verify all environment variables are set in production.
  - **Check:** `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`

- [ ] 🔴 **Task 4.4.4:** Run Lighthouse audit and achieve scores > 90.
  - **Tool:** Chrome DevTools Lighthouse
  - **Categories:** Performance, Accessibility, Best Practices, SEO

- [ ] 🟠 **Task 4.4.5:** Test on multiple browsers.
  - **Browsers:** Chrome, Firefox, Safari, Edge
  - **Devices:** Desktop, Tablet, Mobile

- [ ] 🟠 **Task 4.4.6:** Verify SSL certificate is properly configured.
  - **Action:** Check HTTPS is enforced for all routes

- [ ] 🟡 **Task 4.4.7:** Set up monitoring alerts.
  - **Action:** Configure alerts for error spikes, downtime

- [ ] 🟡 **Task 4.4.8:** Create rollback plan.
  - **Documentation:** Document how to rollback to previous version if needed

---

## Task Summary by Priority

| Priority | Count | Status |
|----------|-------|--------|
| 🔴 Critical | 18 | Must complete before launch |
| 🟠 High | 34 | Should complete before launch |
| 🟡 Medium | 32 | Complete within first week post-launch |
| 🟢 Low | 11 | Complete within first month |
| **Total** | **95** | |

---

## Recommended Execution Order

1. **Week 1:** Complete all 🔴 Critical tasks
2. **Week 2:** Complete all 🟠 High priority tasks
3. **Week 3:** Production launch + begin 🟡 Medium tasks
4. **Week 4+:** Complete 🟡 Medium and 🟢 Low tasks

---

## Notes for Junior Developers

### How to Execute Tasks

1. **Read the task completely** before starting
2. **Check the file path** mentioned in the task
3. **Search for existing patterns** in similar files
4. **Test your changes** locally before committing
5. **Mark the checkbox** `[x]` when complete

### Common Commands

```bash
# Run development server
npm run dev

# Run tests
npm run test

# Build for production
npm run build

# Check for TypeScript errors
npm run lint

# Search for text in codebase
grep -r "search term" src/
```

### Getting Help

- Check existing code patterns in similar files
- Refer to library documentation linked in this file
- Ask for clarification if task is unclear

---

> **Document Maintenance:** This document should be updated as tasks are completed. Mark tasks with `[x]` when done and add completion date in comments.
