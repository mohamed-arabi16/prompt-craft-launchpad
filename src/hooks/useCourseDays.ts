import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Json } from '@/integrations/supabase/types';

export interface CourseDay {
  id: string;
  day_number: number;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  badge_ar: string | null;
  badge_en: string | null;
  duration: string | null;
  topics_ar: string[];
  topics_en: string[];
  techniques_ar: string[];
  techniques_en: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const parseJsonArray = (arr: Json[] | null | undefined): string[] => {
  if (!arr) return [];
  return arr.map(item => String(item));
};

const fetchDays = async () => {
  const { data, error } = await supabase
    .from('course_days')
    .select('*')
    .order('day_number', { ascending: true });

  if (error) throw error;

  // Parse JSONB arrays
  const parsedData: CourseDay[] = (data || []).map(day => ({
    ...day,
    topics_ar: parseJsonArray(day.topics_ar as Json[]),
    topics_en: parseJsonArray(day.topics_en as Json[]),
    techniques_ar: parseJsonArray(day.techniques_ar as Json[]),
    techniques_en: parseJsonArray(day.techniques_en as Json[]),
  }));

  return parsedData;
};

export const useCourseDays = () => {
  const queryClient = useQueryClient();

  // Query: Fetch course days with automatic retry logic from QueryClient
  const { data: days = [], isLoading: loading, error } = useQuery({
    queryKey: ['courseDays'],
    queryFn: fetchDays,
  });

  // Mutation: Create day
  const createMutation = useMutation({
    mutationFn: async (day: Omit<CourseDay, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('course_days')
        .insert({
          ...day,
          topics_ar: day.topics_ar as unknown as Json[],
          topics_en: day.topics_en as unknown as Json[],
          techniques_ar: day.techniques_ar as unknown as Json[],
          techniques_en: day.techniques_en as unknown as Json[],
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courseDays'] });
    },
  });

  // Mutation: Update day
  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<CourseDay> }) => {
      const updateData: any = { ...updates };
      if (updates.topics_ar) updateData.topics_ar = updates.topics_ar as unknown as Json[];
      if (updates.topics_en) updateData.topics_en = updates.topics_en as unknown as Json[];
      if (updates.techniques_ar) updateData.techniques_ar = updates.techniques_ar as unknown as Json[];
      if (updates.techniques_en) updateData.techniques_en = updates.techniques_en as unknown as Json[];

      const { error } = await supabase
        .from('course_days')
        .update(updateData)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courseDays'] });
    },
  });

  // Mutation: Delete day
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('course_days')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courseDays'] });
    },
  });

  return {
    days,
    loading,
    error: error ? (error as Error).message : null,
    fetchDays: () => queryClient.invalidateQueries({ queryKey: ['courseDays'] }),
    createDay: (day: Omit<CourseDay, 'id' | 'created_at' | 'updated_at'>) =>
      createMutation.mutateAsync(day),
    updateDay: (id: string, updates: Partial<CourseDay>) =>
      updateMutation.mutateAsync({ id, updates }),
    deleteDay: (id: string) => deleteMutation.mutateAsync(id),
  };
};
