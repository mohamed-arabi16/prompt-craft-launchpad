import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck, Home, Users, Calendar, MessageSquare,
  HelpCircle, Star, Target, FileText, Settings, FolderOpen, GraduationCap
} from "lucide-react";
import { Link } from "react-router-dom";
import AdminEnrollments from "./AdminEnrollments";
import AdminCourseDays from "./AdminCourseDays";
import AdminTestimonials from "./AdminTestimonials";
import AdminFAQs from "./AdminFAQs";
import AdminBenefits from "./AdminBenefits";
import AdminTargetAudience from "./AdminTargetAudience";
import AdminSiteContent from "./AdminSiteContent";
import AdminCourseSettings from "./AdminCourseSettings";
import AdminMaterials from "./AdminMaterials";
import InstructorDashboard from "./InstructorDashboard";

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
          <AdminEnrollments />
        </TabsContent>
        <TabsContent value="course-days">
          <AdminCourseDays />
        </TabsContent>
        <TabsContent value="materials">
          <AdminMaterials />
        </TabsContent>
        <TabsContent value="testimonials">
          <AdminTestimonials />
        </TabsContent>
        <TabsContent value="faqs">
          <AdminFAQs />
        </TabsContent>
        <TabsContent value="benefits">
          <AdminBenefits />
        </TabsContent>
        <TabsContent value="target-audience">
          <AdminTargetAudience />
        </TabsContent>
        <TabsContent value="site-content">
          <AdminSiteContent />
        </TabsContent>
        <TabsContent value="settings">
          <AdminCourseSettings />
        </TabsContent>
        <TabsContent value="instructor">
          <InstructorDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;