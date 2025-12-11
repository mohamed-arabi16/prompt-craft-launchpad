import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Users, ShieldCheck, UserPlus, CheckCircle, XCircle, Clock, AlertCircle, Home } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useTranslation } from "@/hooks/useTranslation";
import LoadingSpinner from "./LoadingSpinner";
import { Link } from "react-router-dom";

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

const AdminPanel = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [courseAccess, setCourseAccess] = useState<CourseAccess[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch enrollments
      const { data: enrollmentsData, error: enrollmentsError } = await supabase
        .from('enrollments')
        .select('*')
        .order('created_at', { ascending: false });

      if (enrollmentsError) throw enrollmentsError;

      // Fetch course access
      const { data: accessData, error: accessError } = await supabase
        .from('course_access')
        .select('*')
        .order('created_at', { ascending: false });

      if (accessError) throw accessError;

      setEnrollments(enrollmentsData || []);
      setCourseAccess(accessData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load admin data');
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

      toast.success(grantAccess ? 'Access granted successfully' : 'Access revoked successfully');
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error updating access:', error);
      toast.error('Failed to update access');
    }
  };

  const getStatusBadge = (enrollment: Enrollment) => {
    if (enrollment.payment_completed && enrollment.enrollment_completed) {
      return <Badge variant="default" className="bg-green-600"><CheckCircle className="h-3 w-3 mr-1" />Complete</Badge>;
    } else if (enrollment.enrollment_completed && !enrollment.payment_completed) {
      return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Pending Payment</Badge>;
    } else {
      return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Incomplete</Badge>;
    }
  };

  const getAccessBadge = (userId: string) => {
    const access = courseAccess.find(a => a.user_id === userId);
    if (access?.has_access) {
      return <Badge variant="default" className="bg-green-600"><CheckCircle className="h-3 w-3 mr-1" />Access Granted</Badge>;
    }
    return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />No Access</Badge>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
        </div>
        <Link to="/">
          <Button variant="outline" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Home
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Enrollments</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{enrollments.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Enrollments</CardTitle>
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
            <CardTitle className="text-sm font-medium">Users with Access</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {courseAccess.filter(a => a.has_access).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enrollments Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Enrollments Management
          </CardTitle>
          <CardDescription>
            View and manage course enrollments and user access
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>AI Experience</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Course Access</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enrollments.map((enrollment) => (
                  <TableRow key={enrollment.id}>
                    <TableCell className="font-medium">
                      {enrollment.first_name} {enrollment.last_name}
                    </TableCell>
                    <TableCell>{enrollment.email}</TableCell>
                    <TableCell>{enrollment.company || 'N/A'}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{enrollment.ai_experience || 'N/A'}</Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(enrollment.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{getStatusBadge(enrollment)}</TableCell>
                    <TableCell>
                      {enrollment.linked_user_id ? getAccessBadge(enrollment.linked_user_id) : 
                       <Badge variant="outline"><AlertCircle className="h-3 w-3 mr-1" />No Account</Badge>}
                    </TableCell>
                    <TableCell>
                      {enrollment.linked_user_id && (
                        <div className="flex gap-2">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="text-green-600 border-green-600 hover:bg-green-50"
                              >
                                Grant Access
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Grant Course Access</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to grant course access to {enrollment.first_name} {enrollment.last_name}?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleAccessChange(enrollment.linked_user_id!, true)}
                                >
                                  Grant Access
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="text-red-600 border-red-600 hover:bg-red-50"
                              >
                                Revoke Access
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Revoke Course Access</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to revoke course access for {enrollment.first_name} {enrollment.last_name}?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleAccessChange(enrollment.linked_user_id!, false)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Revoke Access
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

export default AdminPanel;
