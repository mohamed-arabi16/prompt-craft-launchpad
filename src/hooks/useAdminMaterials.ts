import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { CourseMaterial } from './useCourseMaterials';

/**
 * Admin hook for managing course materials (CRUD operations)
 *
 * @description Provides complete CRUD operations for course materials management.
 * Handles fetching, creating, updating, and deleting materials with automatic
 * state management and error handling. Fetches materials on component mount.
 *
 * @returns {Object} Object with materials state and CRUD methods
 * @returns {CourseMaterial[]} materials - Array of course materials
 * @returns {boolean} loading - Loading state during fetch operations
 * @returns {string | null} error - Error message if operation fails
 * @returns {Function} fetchMaterials - Manually refresh materials from database
 * @returns {Function} createMaterial - Create new course material
 * @returns {Function} updateMaterial - Update existing course material
 * @returns {Function} deleteMaterial - Delete course material by ID
 *
 * @example
 * ```tsx
 * const {
 *   materials,
 *   loading,
 *   createMaterial,
 *   updateMaterial,
 *   deleteMaterial
 * } = useAdminMaterials();
 *
 * const handleCreate = async (newMaterial) => {
 *   try {
 *     await createMaterial(newMaterial);
 *   } catch (error) {
 *     console.error('Failed to create material:', error);
 *   }
 * };
 * ```
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