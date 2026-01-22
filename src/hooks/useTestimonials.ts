import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Testimonial {
  id: string;
  name_ar: string;
  name_en: string;
  role_ar: string;
  role_en: string;
  content_ar: string;
  content_en: string;
  rating: number;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

const fetchTestimonials = async () => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) throw error;
  return data || [];
};

export const useTestimonials = () => {
  const queryClient = useQueryClient();

  // Query: Fetch testimonials with automatic retry logic from QueryClient
  const { data: testimonials = [], isLoading: loading, error } = useQuery({
    queryKey: ['testimonials'],
    queryFn: fetchTestimonials,
  });

  // Mutation: Create testimonial
  const createMutation = useMutation({
    mutationFn: async (testimonial: Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('testimonials')
        .insert(testimonial)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
    },
  });

  // Mutation: Update testimonial
  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Testimonial> }) => {
      const { error } = await supabase
        .from('testimonials')
        .update(updates)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
    },
  });

  // Mutation: Delete testimonial
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
    },
  });

  return {
    testimonials,
    loading,
    error: error ? (error as Error).message : null,
    fetchTestimonials: () => queryClient.invalidateQueries({ queryKey: ['testimonials'] }),
    createTestimonial: (testimonial: Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>) =>
      createMutation.mutateAsync(testimonial),
    updateTestimonial: (id: string, updates: Partial<Testimonial>) =>
      updateMutation.mutateAsync({ id, updates }),
    deleteTestimonial: (id: string) => deleteMutation.mutateAsync(id),
  };
};
