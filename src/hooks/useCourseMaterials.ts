import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { useTranslation } from './useTranslation';

export interface CourseMaterial {
  id: string;
  title: string;
  title_ar: string | null;
  description: string | null;
  description_ar: string | null;
  file_type: string;
  file_path: string;
  file_name: string;
  file_url: string | null;
  course_day: number | null;
  category: string;
  is_active: boolean;
  requires_access: boolean;
  created_at: string;
  updated_at: string;
}

export const useCourseMaterials = () => {
  const [materials, setMaterials] = useState<CourseMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, session } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    if (user) {
      fetchMaterials();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('course_materials')
        .select('*')
        .eq('is_active', true)
        .order('course_day', { ascending: true });

      if (fetchError) throw fetchError;

      setMaterials(data || []);
    } catch (err) {
      console.error('Error fetching course materials:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch materials');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Downloads a material using the secure edge function
   */
  const downloadMaterial = async (materialId: string, requiresAuth = true): Promise<boolean> => {
    if (requiresAuth && !user) {
      toast.error(t('errors.signInRequired') || 'Please sign in to download course materials');
      return false;
    }

    try {
      // Get material details first for filename
      const material = materials.find(m => m.id === materialId);
      if (!material) {
        toast.error(t('errors.materialNotFound') || 'Material not found');
        return false;
      }

      // Call the secure download edge function
      const { data, error: invokeError } = await supabase.functions.invoke('download-material', {
        body: { materialId },
      });

      if (invokeError) {
        console.error('Download invoke error:', invokeError);
        throw new Error(invokeError.message);
      }

      if (data.error) {
        // Handle specific error messages
        if (data.error === 'Course access required') {
          toast.error(
            t('errors.courseAccessRequired') || 
            'You need to complete enrollment and payment to access course materials.',
            {
              duration: 6000,
              action: {
                label: t('buttons.contactSupport') || 'Contact Support',
                onClick: () => window.location.href = '/contact'
              }
            }
          );
        } else if (data.error === 'Access expired') {
          toast.error(
            t('errors.accessExpired') || 
            'Your course access has expired. Please contact support to renew.',
            { duration: 6000 }
          );
        } else {
          toast.error(data.message || data.error);
        }
        return false;
      }

      // Trigger download with the signed URL
      if (data.downloadUrl) {
        const link = document.createElement('a');
        link.href = data.downloadUrl;
        link.download = data.filename || material.file_name;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast.success(t('success.downloadStarted') || 'Download started');
        return true;
      }

      toast.error(t('errors.downloadFailed') || 'Failed to generate download link');
      return false;

    } catch (err) {
      console.error('Download error:', err);
      toast.error(t('errors.downloadFailed') || 'Failed to download material', {
        action: {
          label: t('buttons.retry') || 'Retry',
          onClick: () => downloadMaterial(materialId, requiresAuth)
        }
      });
      return false;
    }
  };

  const getMaterialByType = (type: string) => {
    return materials.filter(m => m.file_type === type);
  };

  const getMaterialByDay = (day: number) => {
    return materials.find(m => m.course_day === day);
  };

  const getCourseGuide = () => {
    return materials.find(m => m.category === 'course_guide');
  };

  return {
    materials,
    loading,
    error,
    downloadMaterial,
    getMaterialByType,
    getMaterialByDay,
    getCourseGuide,
    refetch: fetchMaterials
  };
};
