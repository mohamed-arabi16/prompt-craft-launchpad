import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Users, CheckCircle, XCircle, Clock, AlertCircle, UserPlus } from "lucide-react";
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

  const handleAccessChange = async (userId: string, grantAccess: boolean) => {
    try {
      const { error } = await supabase
        .from('course_access')
        .update({ 
          has_access: grantAccess,
          access_granted_at: grantAccess ? new Date().toISOString() : null,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId);

      if (error) throw error;
      toast.success(grantAccess ? 'تم منح الوصول بنجاح' : 'تم إلغاء الوصول بنجاح');
      fetchData();
    } catch (error) {
      console.error('Error updating access:', error);
      toast.error('فشل في تحديث الوصول');
    }
  };

  const getStatusBadge = (enrollment: Enrollment) => {
    if (enrollment.payment_completed && enrollment.enrollment_completed) {
      return <Badge className="bg-green-600"><CheckCircle className="h-3 w-3 mr-1" />مكتمل</Badge>;
    } else if (enrollment.enrollment_completed && !enrollment.payment_completed) {
      return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />بانتظار الدفع</Badge>;
    }
    return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />غير مكتمل</Badge>;
  };

  const getAccessBadge = (userId: string) => {
    const access = courseAccess.find(a => a.user_id === userId);
    if (access?.has_access) {
      return <Badge className="bg-green-600"><CheckCircle className="h-3 w-3 mr-1" />لديه وصول</Badge>;
    }
    return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />لا يوجد وصول</Badge>;
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><LoadingSpinner size="lg" /></div>;
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <CardTitle className="text-sm font-medium">التسجيلات المكتملة</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {enrollments.filter(e => e.enrollment_completed && e.payment_completed).length}
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
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الاسم</TableHead>
                  <TableHead>البريد</TableHead>
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
                    <TableCell>{enrollment.company || 'غير محدد'}</TableCell>
                    <TableCell><Badge variant="outline">{enrollment.ai_experience || 'غير محدد'}</Badge></TableCell>
                    <TableCell>{new Date(enrollment.created_at).toLocaleDateString('ar')}</TableCell>
                    <TableCell>{getStatusBadge(enrollment)}</TableCell>
                    <TableCell>
                      {enrollment.linked_user_id ? getAccessBadge(enrollment.linked_user_id) : 
                       <Badge variant="outline"><AlertCircle className="h-3 w-3 mr-1" />لا يوجد حساب</Badge>}
                    </TableCell>
                    <TableCell>
                      {enrollment.linked_user_id && (
                        <div className="flex gap-2">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="outline" className="text-green-600 border-green-600">
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
                                <AlertDialogAction onClick={() => handleAccessChange(enrollment.linked_user_id!, true)}>
                                  منح الوصول
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="outline" className="text-red-600 border-red-600">
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
                                <AlertDialogAction onClick={() => handleAccessChange(enrollment.linked_user_id!, false)} className="bg-red-600 hover:bg-red-700">
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
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminEnrollments;
