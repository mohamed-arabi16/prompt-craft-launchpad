import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface CourseMaterial {
  id: string;
  title: string;
  title_ar: string | null;
  description: string | null;
  description_ar: string | null;
  file_path: string;
  file_name: string;
  day_number: number | null;
  material_type: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useCourseMaterials = () => {
  const [materials, setMaterials] = useState<CourseMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('course_materials')
        .select('*')
        .eq('is_active', true)
        .order('day_number', { ascending: true });

      if (fetchError) throw fetchError;

      setMaterials(data || []);
    } catch (err) {
      console.error('Error fetching course materials:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch materials');
    } finally {
      setLoading(false);
    }
  };

  const downloadMaterial = async (materialId: string, requiresAuth = true) => {
    if (requiresAuth && !user) {
      toast.error('Please sign in to download course materials');
      return false;
    }

    try {
      // Check if user has course access
      if (requiresAuth && user) {
        const { data: accessData, error: accessError } = await supabase
          .from('course_access')
          .select('has_access')
          .eq('user_id', user.id)
          .single();

        if (accessError || !accessData?.has_access) {
          toast.error('Course access requires completed enrollment and payment verification. Please complete your enrollment or contact support if payment has been made.', {
            duration: 6000,
            action: {
              label: "Contact Support",
              onClick: () => window.location.href = "/contact"
            }
          });
          return false;
        }
      }

      // Get material details
      const material = materials.find(m => m.id === materialId);
      if (!material) {
        toast.error('Material not found');
        return false;
      }

      // For now, show a placeholder since actual files need to be uploaded
      toast.info(`Downloading ${material.title}... (Demo mode - actual file download coming soon)`);
      
      // In production, this would download from storage:
      // const { data, error } = await supabase.storage
      //   .from('course-materials')
      //   .download(material.file_path);

      return true;
    } catch (err) {
      console.error('Download error:', err);
      toast.error('Failed to download material');
      return false;
    }
  };

  const getMaterialByType = (type: string) => {
    return materials.filter(m => m.material_type === type);
  };

  const getMaterialByDay = (day: number) => {
    return materials.find(m => m.day_number === day);
  };

  const getCourseGuide = () => {
    return materials.find(m => m.material_type === 'course_guide');
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