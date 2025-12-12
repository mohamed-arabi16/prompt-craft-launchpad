import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { TranslationProvider } from "./context/TranslationContext";
import { AuthProvider } from "./contexts/AuthContext";
import { SoundProvider } from "./contexts/SoundContext";
import { useState, useEffect, lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingSpinner from "./components/LoadingSpinner";
import ProtectedRoute from "./components/ProtectedRoute";
import PageTransition from "./components/PageTransition";
import AccessWarningDialog from "./components/AccessWarningDialog";
import { CustomCursor, ScrollProgress } from "./components/premium";

// Lazy load pages for code splitting
const Index = lazy(() => import("./pages/Index"));
const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Enrollment = lazy(() => import("./pages/Enrollment"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Admin = lazy(() => import("./pages/Admin"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const GlossaryPage = lazy(() => import("./pages/GlossaryPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

/**
 * Loading fallback component for Suspense with premium animation
 */
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="relative">
      <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
      <LoadingSpinner />
    </div>
  </div>
);

/**
 * Animated routes wrapper for page transitions
 */
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/enrollment" element={<Enrollment />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/glossary" element={<GlossaryPage />} />
        <Route path="/admin" element={
          <ProtectedRoute requireAdmin={true}>
            <Admin />
          </ProtectedRoute>
        } />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

/**
 * The query client for TanStack Query with production-ready defaults.
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

/**
 * The root component of the application.
 *
 * @returns {JSX.Element} The rendered application.
 */
const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.documentElement.style.setProperty('--animation-duration', '0.01s');
    }
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <TranslationProvider>
            <AuthProvider>
              <SoundProvider>
                <BrowserRouter>
                  {/* Premium UI enhancements */}
                  <CustomCursor />
                  <ScrollProgress />

                  <PageTransition isLoading={isLoading}>
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
  );
};

export default App;
