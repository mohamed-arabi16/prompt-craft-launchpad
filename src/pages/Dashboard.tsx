import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/hooks/useTranslation';
import { supabase } from '@/integrations/supabase/client';
import { Download, User, Mail, Calendar, Building } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useDownload } from '@/hooks/useDownload';

interface Profile {
  first_name?: string;
  last_name?: string;
  phone?: string;
  company?: string;
  ai_experience?: string;
}

interface CourseAccess {
  has_access: boolean;
  access_granted_at?: string;
  access_expires_at?: string;
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { t } = useTranslation();
  const { downloadFile, isLoading: downloadLoading } = useDownload();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [courseAccess, setCourseAccess] = useState<CourseAccess | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      try {
        // Fetch user profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        setProfile(profileData);

        // Fetch course access
        const { data: accessData } = await supabase
          .from('course_access')
          .select('*')
          .eq('user_id', user.id)
          .single();

        setCourseAccess(accessData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const handleDownloadDay = (day: number) => {
    if (courseAccess?.has_access) {
      downloadFile(`ai-prompt-course-day-${day}.pdf`);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, {profile?.first_name || user?.email?.split('@')[0]}!
            </h1>
            <p className="text-muted-foreground">
              Access your AI Prompt Engineering course materials
            </p>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{user?.email}</span>
                </div>
                
                {profile?.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Phone:</span>
                    <span>{profile.phone}</span>
                  </div>
                )}
                
                {profile?.company && (
                  <div className="flex items-center gap-2 text-sm">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span>{profile.company}</span>
                  </div>
                )}
                
                {profile?.ai_experience && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">AI Experience:</span>
                    <Badge variant="secondary">{profile.ai_experience}</Badge>
                  </div>
                )}
                
                {courseAccess?.access_granted_at && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      Enrolled: {new Date(courseAccess.access_granted_at).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Course Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Course Materials</CardTitle>
                <CardDescription>
                  {courseAccess?.has_access 
                    ? "Download your course materials below"
                    : "Course access pending approval"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!courseAccess?.has_access ? (
                  <div className="text-center py-8">
                    <div className="mb-4">
                      <Badge variant="secondary" className="text-sm">
                        Access Pending
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Your course access is being reviewed. You'll receive an email once approved.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      This usually takes 1-2 business days.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="mb-6">
                      <Badge variant="default" className="text-sm">
                        Access Granted
                      </Badge>
                    </div>
                    
                    {/* Course Days */}
                    {Array.from({ length: 5 }).map((_, index) => {
                      const day = index + 1;
                      return (
                        <div key={day} className="flex items-center justify-between p-4 border border-border rounded-lg">
                          <div>
                            <h4 className="font-semibold">Day {day}: {t(`day${day}Title`)}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {t(`day${day}Description`)}
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownloadDay(day)}
                            disabled={downloadLoading}
                            className="ml-4"
                          >
                            {downloadLoading ? (
                              <LoadingSpinner size="sm" className="mr-2" />
                            ) : (
                              <Download className="h-4 w-4 mr-2" />
                            )}
                            Download PDF
                          </Button>
                        </div>
                      );
                    })}

                    {/* Additional Resources */}
                    <div className="mt-8 pt-6 border-t border-border">
                      <h4 className="font-semibold mb-4">Additional Resources</h4>
                      <div className="space-y-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadFile('ai-prompt-course-complete-guide.pdf')}
                          disabled={downloadLoading}
                          className="w-full justify-start"
                        >
                          {downloadLoading ? (
                            <LoadingSpinner size="sm" className="mr-2" />
                          ) : (
                            <Download className="h-4 w-4 mr-2" />
                          )}
                          Complete Course Guide (PDF)
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadFile('ai-prompt-templates.pdf')}
                          disabled={downloadLoading}
                          className="w-full justify-start"
                        >
                          {downloadLoading ? (
                            <LoadingSpinner size="sm" className="mr-2" />
                          ) : (
                            <Download className="h-4 w-4 mr-2" />
                          )}
                          Prompt Templates Collection
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;