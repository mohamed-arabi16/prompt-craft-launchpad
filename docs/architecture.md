# Runtime Architecture

This document outlines how the application composes providers, routing, and premium UI helpers so contributors can quickly understand runtime responsibilities and extension points.

## Provider composition

The top-level provider tree is defined in [`src/App.tsx`](../src/App.tsx) and is responsible for cross-cutting concerns such as data fetching, tooltips, localization, authentication, and sound playback.

```
<ErrorBoundary>
  <QueryClientProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <TranslationProvider>
        <AuthProvider>
          <SoundProvider>
            <BrowserRouter>
              <CustomCursor />
              <ScrollProgress />
              <PageTransition>
                <Suspense fallback={<PageLoader />}>
                  <AnimatedRoutes />
                </Suspense>
              </PageTransition>
              <AccessWarningDialog />
            </BrowserRouter>
          </SoundProvider>
        </AuthProvider>
      </TranslationProvider>
    </TooltipProvider>
  </QueryClientProvider>
</ErrorBoundary>
```

- **QueryClientProvider** (TanStack Query) centralizes data-fetching cache and retry behaviors.
- **TooltipProvider** enables consistent tooltip timing and positioning for `@/components/ui/tooltip` consumers.
- **TranslationProvider** supplies the localization context used by text rendering hooks.
- **AuthProvider** stores user identity, session, and admin flags for protected navigation.
- **SoundProvider** coordinates UI sound effects and exposes playback helpers.
- **CustomCursor** and **ScrollProgress** are globally mounted premium UI elements that do not affect routing but enhance UX visuals.
- **PageTransition** wraps routing output to animate page switches and display the Suspense fallback while lazy routes load.
- **AccessWarningDialog** renders alongside routes to handle access-limit messaging without being tied to a particular page.

To extend shared state, add new providers inside the tree where their data should be available, ensuring they are wrapped inside `BrowserRouter` if they depend on routing.

## Routing

`BrowserRouter` hosts `AnimatedRoutes`, which combines `react-router-dom` with `framer-motion`'s `AnimatePresence` to animate page entry/exit. Routes are declared with lazy-loaded components to keep initial bundles small.

Protected navigation is enforced via `ProtectedRoute` wrappers:

- `/dashboard` requires an authenticated user.
- `/admin` requires an authenticated admin (`requireAdmin={true}`).

Other routes (`/`, `/auth`, `/enrollment`, `/contact`, `/privacy`, `/terms`, `/faq`, `/glossary`, and the catch-all `*`) are publicly accessible. Add new routes above the catch-all `*` entry to ensure they are matched.

## Premium UI components

Three premium enhancements are mounted at the App shell level so every page benefits from them:

- **CustomCursor**: Adds a bespoke cursor effect for richer interactivity.
- **ScrollProgress**: Displays scroll depth feedback as users navigate long content.
- **PageTransition**: Animates route changes and hosts the Suspense fallback while lazy-loaded pages resolve.

When integrating new animations or global UI flourishes, colocate them with these components inside `src/App.tsx` to ensure they wrap the routing output and maintain consistent behavior across pages.
