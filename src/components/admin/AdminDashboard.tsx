import { useState, lazy, Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck, Home, Users, Calendar, MessageSquare,
  HelpCircle, Star, Target, FileText, Settings, FolderOpen, GraduationCap
} from "lucide-react";
import { Link } from "react-router-dom";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorBoundary from "@/components/ErrorBoundary";

// Lazy load admin components
const AdminEnrollments = lazy(() => import("./AdminEnrollments"));
const AdminCourseDays = lazy(() => import("./AdminCourseDays"));
const AdminTestimonials = lazy(() => import("./AdminTestimonials"));
const AdminFAQs = lazy(() => import("./AdminFAQs"));
const AdminBenefits = lazy(() => import("./AdminBenefits"));
const AdminTargetAudience = lazy(() => import("./AdminTargetAudience"));
const AdminSiteContent = lazy(() => import("./AdminSiteContent"));
const AdminCourseSettings = lazy(() => import("./AdminCourseSettings"));
const AdminMaterials = lazy(() => import("./AdminMaterials"));
const InstructorDashboard = lazy(() => import("./InstructorDashboard"));

// Fallback component for loading states
const LoadingFallback = () => (
  <div className="min-h-96 flex items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
);

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("enrollments");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">لوحة التحكم</h1>
        </div>
        <Link to="/">
          <Button variant="outline" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            الرئيسية
          </Button>
        </Link>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 gap-2 h-auto p-2 bg-card">
          <TabsTrigger value="enrollments" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">التسجيلات</span>
          </TabsTrigger>
          <TabsTrigger value="course-days" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">الأيام</span>
          </TabsTrigger>
          <TabsTrigger value="materials" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <FolderOpen className="h-4 w-4" />
            <span className="hidden sm:inline">المواد</span>
          </TabsTrigger>
          <TabsTrigger value="testimonials" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">الآراء</span>
          </TabsTrigger>
          <TabsTrigger value="faqs" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <HelpCircle className="h-4 w-4" />
            <span className="hidden sm:inline">الأسئلة</span>
          </TabsTrigger>
          <TabsTrigger value="benefits" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Star className="h-4 w-4" />
            <span className="hidden sm:inline">المزايا</span>
          </TabsTrigger>
          <TabsTrigger value="target-audience" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Target className="h-4 w-4" />
            <span className="hidden sm:inline">الجمهور</span>
          </TabsTrigger>
          <TabsTrigger value="site-content" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">المحتوى</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">الإعدادات</span>
          </TabsTrigger>
          <TabsTrigger value="instructor" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <GraduationCap className="h-4 w-4" />
            <span className="hidden sm:inline">المدرب</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="enrollments">
          <ErrorBoundary name="enrollments-tab">
            <Suspense fallback={<LoadingFallback />}>
              <AdminEnrollments />
            </Suspense>
          </ErrorBoundary>
        </TabsContent>
        <TabsContent value="course-days">
          <ErrorBoundary name="course-days-tab">
            <Suspense fallback={<LoadingFallback />}>
              <AdminCourseDays />
            </Suspense>
          </ErrorBoundary>
        </TabsContent>
        <TabsContent value="materials">
          <ErrorBoundary name="materials-tab">
            <Suspense fallback={<LoadingFallback />}>
              <AdminMaterials />
            </Suspense>
          </ErrorBoundary>
        </TabsContent>
        <TabsContent value="testimonials">
          <ErrorBoundary name="testimonials-tab">
            <Suspense fallback={<LoadingFallback />}>
              <AdminTestimonials />
            </Suspense>
          </ErrorBoundary>
        </TabsContent>
        <TabsContent value="faqs">
          <ErrorBoundary name="faqs-tab">
            <Suspense fallback={<LoadingFallback />}>
              <AdminFAQs />
            </Suspense>
          </ErrorBoundary>
        </TabsContent>
        <TabsContent value="benefits">
          <ErrorBoundary name="benefits-tab">
            <Suspense fallback={<LoadingFallback />}>
              <AdminBenefits />
            </Suspense>
          </ErrorBoundary>
        </TabsContent>
        <TabsContent value="target-audience">
          <ErrorBoundary name="target-audience-tab">
            <Suspense fallback={<LoadingFallback />}>
              <AdminTargetAudience />
            </Suspense>
          </ErrorBoundary>
        </TabsContent>
        <TabsContent value="site-content">
          <ErrorBoundary name="site-content-tab">
            <Suspense fallback={<LoadingFallback />}>
              <AdminSiteContent />
            </Suspense>
          </ErrorBoundary>
        </TabsContent>
        <TabsContent value="settings">
          <ErrorBoundary name="settings-tab">
            <Suspense fallback={<LoadingFallback />}>
              <AdminCourseSettings />
            </Suspense>
          </ErrorBoundary>
        </TabsContent>
        <TabsContent value="instructor">
          <ErrorBoundary name="instructor-tab">
            <Suspense fallback={<LoadingFallback />}>
              <InstructorDashboard />
            </Suspense>
          </ErrorBoundary>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;