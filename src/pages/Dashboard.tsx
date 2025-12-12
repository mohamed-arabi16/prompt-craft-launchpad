import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/hooks/useTranslation';
import { supabase } from '@/integrations/supabase/client';
import { Download, User, Mail, Calendar, Phone, Home } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useCourseMaterials } from '@/hooks/useCourseMaterials';
import { Link } from 'react-router-dom';

/**
 * @interface Profile
 * @property {string} [first_name] - The user's first name.
 * @property {string} [last_name] - The user's last name.
 * @property {string} [phone] - The user's phone number.
 * @property {string} [company] - The user's company.
 * @property {string} [ai_experience] - The user's AI experience level.
 */
interface Profile {
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  phone?: string | null;
}

/**
 * @interface CourseAccess
 * @property {boolean} has_access - Whether the user has access to the course.
 * @property {string} [access_granted_at] - The date the user was granted access.
 * @property {string} [access_expires_at] - The date the user's access expires.
 */
interface CourseAccess {
  has_access: boolean;
  access_granted_at?: string;
  access_expires_at?: string;
}

/**
 * The dashboard page, which displays the user's profile and course materials.
 *
 * @returns {JSX.Element} The rendered dashboard page.
 */
const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { t } = useTranslation();
  const { materials, downloadMaterial, loading: materialsLoading } = useCourseMaterials();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [courseAccess, setCourseAccess] = useState<CourseAccess | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

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

  /**
   * Handles the download of a course material.
   *
   * @param {string} materialId - The material ID to download.
   */
  const handleDownload = async (materialId: string) => {
    if (courseAccess?.has_access) {
      setDownloadingId(materialId);
      await downloadMaterial(materialId, true);
      setDownloadingId(null);
    }
  };

  /**
   * Handles the sign-out process.
   */
  const handleSignOut = async () => {
    await signOut();
  };

  // Get materials by category
  const dailyMaterials = materials.filter(m => m.category === 'daily' && m.course_day);
  const guideMaterial = materials.find(m => m.category === 'course_guide');
  const templatesMaterial = materials.find(m => m.category === 'templates');

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
        {/* Welcome Hero Section */}
        <div className="text-center mb-12 py-16 bg-gradient-hero rounded-3xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"></div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 hero-title">
              {t('dashboardWelcome')}, {profile?.first_name || user?.email?.split('@')[0]}!
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('dashboardSubtitle') || 'Ready to advance your AI expertise? Your course materials are waiting below.'}
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/">
                <Button variant="outline" className="bg-background/80 backdrop-blur-sm">
                  <Home className="h-4 w-4 ltr:mr-2 rtl:ml-2" />
                  {t('dashboard.backToHome') || t('navHome')}
                </Button>
              </Link>
              <Button variant="outline" onClick={handleSignOut} className="bg-background/80 backdrop-blur-sm">
                {t('buttons.signOut')}
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {t('dashboard.profileTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{t('auth.emailLabel')}:</span>
                  <span>{user?.email}</span>
                </div>

                {profile?.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{t('dashboard.phoneLabel')}:</span>
                    <span>{profile.phone}</span>
                  </div>
                )}

                {courseAccess?.access_granted_at && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{t('dashboard.enrolledLabel')}:</span>
                    <span>
                      {new Date(courseAccess.access_granted_at).toLocaleDateString()}
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
                <CardTitle>{t('dashboard.courseMaterialsTitle')}</CardTitle>
                <CardDescription>
                  {courseAccess?.has_access
                    ? t('dashboard.downloadMaterials')
                    : t('dashboard.accessPendingApproval')
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!courseAccess?.has_access ? (
                  <div className="text-center py-8">
                    <div className="mb-4">
                      <Badge variant="secondary" className="text-sm">
                        {t('dashboard.accessPendingBadge')}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      {t('dashboard.accessPendingDescription')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t('dashboard.accessPendingTimeframe')}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="mb-6">
                      <Badge variant="default" className="text-sm">
                        {t('dashboard.accessGrantedBadge')}
                      </Badge>
                    </div>

                    {/* Course Days */}
                    {dailyMaterials.length > 0 ? (
                      dailyMaterials.sort((a, b) => (a.course_day || 0) - (b.course_day || 0)).map((material) => (
                        <div key={material.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                          <div>
                            <h4 className="font-semibold">{t('dashboard.day')} {material.course_day}: {t(`day${material.course_day}Title`)}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {t(`day${material.course_day}Description`)}
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownload(material.id)}
                            disabled={downloadingId === material.id}
                            className="ltr:ml-4 rtl:mr-4"
                          >
                            {downloadingId === material.id ? (
                              <LoadingSpinner size="sm" className="ltr:mr-2 rtl:ml-2" />
                            ) : (
                              <Download className="h-4 w-4 ltr:mr-2 rtl:ml-2" />
                            )}
                            {t('dashboard.downloadPDF')}
                          </Button>
                        </div>
                      ))
                    ) : (
                      Array.from({ length: 5 }).map((_, index) => {
                        const day = index + 1;
                        return (
                          <div key={day} className="flex items-center justify-between p-4 border border-border rounded-lg opacity-60">
                            <div>
                              <h4 className="font-semibold">{t('dashboard.day')} {day}: {t(`day${day}Title`)}</h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                {t(`day${day}Description`)}
                              </p>
                            </div>
                            <Badge variant="secondary">{t('comingSoon')}</Badge>
                          </div>
                        );
                      })
                    )}

                    {/* Additional Resources */}
                    <div className="mt-8 pt-6 border-t border-border">
                      <h4 className="font-semibold mb-4">{t('dashboard.additionalResources')}</h4>
                      <div className="space-y-2">
                        {guideMaterial ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownload(guideMaterial.id)}
                            disabled={downloadingId === guideMaterial.id}
                            className="w-full justify-start"
                          >
                            {downloadingId === guideMaterial.id ? (
                              <LoadingSpinner size="sm" className="ltr:mr-2 rtl:ml-2" />
                            ) : (
                              <Download className="h-4 w-4 ltr:mr-2 rtl:ml-2" />
                            )}
                            {t('dashboard.completeGuide')}
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" disabled className="w-full justify-start opacity-60">
                            <Download className="h-4 w-4 ltr:mr-2 rtl:ml-2" />
                            {t('dashboard.completeGuide')} - {t('comingSoon')}
                          </Button>
                        )}

                        {templatesMaterial ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownload(templatesMaterial.id)}
                            disabled={downloadingId === templatesMaterial.id}
                            className="w-full justify-start"
                          >
                            {downloadingId === templatesMaterial.id ? (
                              <LoadingSpinner size="sm" className="ltr:mr-2 rtl:ml-2" />
                            ) : (
                              <Download className="h-4 w-4 ltr:mr-2 rtl:ml-2" />
                            )}
                            {t('dashboard.promptTemplates')}
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" disabled className="w-full justify-start opacity-60">
                            <Download className="h-4 w-4 ltr:mr-2 rtl:ml-2" />
                            {t('dashboard.promptTemplates')} - {t('comingSoon')}
                          </Button>
                        )}
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