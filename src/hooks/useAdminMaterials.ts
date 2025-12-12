import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { CourseMaterial } from './useCourseMaterials';

/**
 * Admin hook for managing course materials (CRUD operations)
 */
export const useAdminMaterials = () => {
  const [materials, setMaterials] = useState<CourseMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('course_materials')
        .select('*')
        .order('course_day', { ascending: true, nullsFirst: true });

      if (error) throw error;
      setMaterials(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createMaterial = async (material: Omit<CourseMaterial, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('course_materials')
      .insert(material)
      .select()
      .single();
    if (error) throw error;
    await fetchMaterials();
    return data;
  };

  const updateMaterial = async (id: string, updates: Partial<CourseMaterial>) => {
    const { error } = await supabase
      .from('course_materials')
      .update(updates)
      .eq('id', id);
    if (error) throw error;
    await fetchMaterials();
  };

  const deleteMaterial = async (id: string) => {
    const { error } = await supabase
      .from('course_materials')
      .delete()
      .eq('id', id);
    if (error) throw error;
    await fetchMaterials();
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  return {
    materials,
    loading,
    error,
    fetchMaterials,
    createMaterial,
    updateMaterial,
    deleteMaterial,
  };
};