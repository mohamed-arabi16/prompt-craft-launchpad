import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, CheckCircle, XCircle, Clock, AlertCircle, UserPlus, Phone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import LoadingSpinner from "@/components/LoadingSpinner";

interface Enrollment {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string | null;
  company?: string | null;
  ai_experience?: string | null;
  goals?: string | null;
  enrollment_completed: boolean | null;
  payment_completed: boolean | null;
  linked_user_id?: string | null;
  status: string;
  enrollment_date: string;
  created_at: string;
  updated_at: string;
}

interface CourseAccess {
  id: string;
  user_id: string;
  has_access: boolean;
  access_granted_at?: string;
  access_expires_at?: string;
}

// Status configuration
const STATUS_OPTIONS = [
  { value: 'NEW', label: 'جديد', labelEn: 'New', color: 'bg-blue-600' },
  { value: 'CONTACTED', label: 'تم التواصل', labelEn: 'Contacted', color: 'bg-yellow-600' },
  { value: 'CONFIRMED', label: 'مؤكد', labelEn: 'Confirmed', color: 'bg-green-600' },
  { value: 'ACCESS_GRANTED', label: 'لديه وصول', labelEn: 'Access Granted', color: 'bg-primary' },
  { value: 'REJECTED', label: 'مرفوض', labelEn: 'Rejected', color: 'bg-red-600' },
  { value: 'ARCHIVED', label: 'مؤرشف', labelEn: 'Archived', color: 'bg-gray-600' },
];

const AdminEnrollments = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [courseAccess, setCourseAccess] = useState<CourseAccess[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [enrollmentsRes, accessRes] = await Promise.all([
        supabase.from('enrollments').select('*').order('created_at', { ascending: false }),
        supabase.from('course_access').select('*').order('created_at', { ascending: false })
      ]);

      if (enrollmentsRes.error) throw enrollmentsRes.error;
      if (accessRes.error) throw accessRes.error;

      setEnrollments(enrollmentsRes.data || []);
      setCourseAccess(accessRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('فشل في تحميل البيانات');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (enrollmentId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('enrollments')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', enrollmentId);

      if (error) throw error;
      toast.success('تم تحديث الحالة بنجاح');
      fetchData();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('فشل في تحديث الحالة');
    }
  };

  const handleAccessChange = async (userId: string, grantAccess: boolean, enrollmentId?: string) => {
    try {
      // Use upsert to handle both insert and update cases
      const { error } = await supabase
        .from('course_access')
        .upsert({ 
          user_id: userId,
          has_access: grantAccess,
          access_granted_at: grantAccess ? new Date().toISOString() : null,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;

      // Also update enrollment status if we're granting access
      if (enrollmentId && grantAccess) {
        await supabase
          .from('enrollments')
          .update({ status: 'ACCESS_GRANTED', updated_at: new Date().toISOString() })
          .eq('id', enrollmentId);
      } else if (enrollmentId && !grantAccess) {
        await supabase
          .from('enrollments')
          .update({ status: 'CONFIRMED', updated_at: new Date().toISOString() })
          .eq('id', enrollmentId);
      }

      toast.success(grantAccess ? 'تم منح الوصول بنجاح ✅' : 'تم إلغاء الوصول بنجاح');
      fetchData();
    } catch (error) {
      console.error('Error updating access:', error);
      toast.error('فشل في تحديث الوصول');
    }
  };

  const getStatusBadge = (status: string) => {
    // Handle old 'pending' values as 'NEW'
    const normalizedStatus = status === 'pending' ? 'NEW' : status;
    const statusConfig = STATUS_OPTIONS.find(s => s.value === normalizedStatus) || STATUS_OPTIONS[0];
    return (
      <Badge className={statusConfig.color}>
        {statusConfig.label}
      </Badge>
    );
  };

  const getAccessBadge = (userId: string | null | undefined) => {
    if (!userId) {
      return <Badge variant="outline"><AlertCircle className="h-3 w-3 ltr:mr-1 rtl:ml-1" />لا يوجد حساب</Badge>;
    }
    const access = courseAccess.find(a => a.user_id === userId);
    if (access?.has_access) {
      return <Badge className="bg-green-600"><CheckCircle className="h-3 w-3 ltr:mr-1 rtl:ml-1" />لديه وصول</Badge>;
    }
    return <Badge variant="destructive"><XCircle className="h-3 w-3 ltr:mr-1 rtl:ml-1" />لا يوجد وصول</Badge>;
  };

  // Format date in English DD/MM/YYYY format
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><LoadingSpinner size="lg" /></div>;
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي التسجيلات</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{enrollments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">جديد</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {enrollments.filter(e => e.status === 'NEW' || !e.status).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">تم التواصل</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {enrollments.filter(e => e.status === 'CONTACTED').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المستخدمين بوصول</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courseAccess.filter(a => a.has_access).length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Enrollments Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            إدارة التسجيلات
          </CardTitle>
          <CardDescription>عرض وإدارة تسجيلات الدورة والوصول</CardDescription>
        </CardHeader>
        <CardContent>
          {enrollments.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>لا توجد تسجيلات حتى الآن</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>الاسم</TableHead>
                    <TableHead>البريد</TableHead>
                    <TableHead>الهاتف</TableHead>
                    <TableHead>الشركة</TableHead>
                    <TableHead>الخبرة</TableHead>
                    <TableHead>التاريخ</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>الوصول</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {enrollments.map((enrollment) => (
                    <TableRow key={enrollment.id}>
                      <TableCell className="font-medium">{enrollment.first_name} {enrollment.last_name}</TableCell>
                      <TableCell>{enrollment.email}</TableCell>
                      <TableCell>{enrollment.phone || '-'}</TableCell>
                      <TableCell>{enrollment.company || '-'}</TableCell>
                      <TableCell><Badge variant="outline">{enrollment.ai_experience || '-'}</Badge></TableCell>
                      <TableCell>{formatDate(enrollment.enrollment_date)}</TableCell>
                      <TableCell>
                        <Select
                          value={enrollment.status || 'NEW'}
                          onValueChange={(value) => handleStatusChange(enrollment.id, value)}
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {STATUS_OPTIONS.map((status) => (
                              <SelectItem key={status.value} value={status.value}>
                                {status.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        {getAccessBadge(enrollment.linked_user_id)}
                      </TableCell>
                      <TableCell>
                        {enrollment.linked_user_id && (
                          <div className="flex gap-2">
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button size="sm" variant="outline" className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white">
                                  منح وصول
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>منح وصول للدورة</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    هل تريد منح وصول الدورة لـ {enrollment.first_name} {enrollment.last_name}؟
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleAccessChange(enrollment.linked_user_id!, true, enrollment.id)}>
                                    منح الوصول
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white">
                                  إلغاء وصول
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>إلغاء وصول الدورة</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    هل تريد إلغاء وصول الدورة لـ {enrollment.first_name} {enrollment.last_name}؟
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleAccessChange(enrollment.linked_user_id!, false, enrollment.id)} className="bg-red-600 hover:bg-red-700">
                                    إلغاء الوصول
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminEnrollments;