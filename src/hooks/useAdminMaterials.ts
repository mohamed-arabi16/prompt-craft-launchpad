import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { CourseMaterial } from './useCourseMaterials';

/**
 * Admin hook for managing course materials (CRUD operations)
 *
 * @description Provides complete CRUD operations for course materials management.
 * Handles fetching, creating, updating, and deleting materials with automatic
 * retry logic via React Query. Fetches materials on component mount.
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

const fetchMaterials = async () => {
  const { data, error } = await supabase
    .from('course_materials')
    .select('*')
    .order('course_day', { ascending: true, nullsFirst: true });

  if (error) throw error;
  return data || [];
};

export const useAdminMaterials = () => {
  const queryClient = useQueryClient();

  // Query: Fetch course materials with automatic retry logic from QueryClient
  const { data: materials = [], isLoading: loading, error } = useQuery({
    queryKey: ['adminMaterials'],
    queryFn: fetchMaterials,
  });

  // Mutation: Create material
  const createMutation = useMutation({
    mutationFn: async (material: Omit<CourseMaterial, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('course_materials')
        .insert(material)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminMaterials'] });
    },
  });

  // Mutation: Update material
  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<CourseMaterial> }) => {
      const { error } = await supabase
        .from('course_materials')
        .update(updates)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminMaterials'] });
    },
  });

  // Mutation: Delete material
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('course_materials')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminMaterials'] });
    },
  });

  return {
    materials,
    loading,
    error: error ? (error as Error).message : null,
    fetchMaterials: () => queryClient.invalidateQueries({ queryKey: ['adminMaterials'] }),
    createMaterial: (material: Omit<CourseMaterial, 'id' | 'created_at' | 'updated_at'>) =>
      createMutation.mutateAsync(material),
    updateMaterial: (id: string, updates: Partial<CourseMaterial>) =>
      updateMutation.mutateAsync({ id, updates }),
    deleteMaterial: (id: string) => deleteMutation.mutateAsync(id),
  };
};