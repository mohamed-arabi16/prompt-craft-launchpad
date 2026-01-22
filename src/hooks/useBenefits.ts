import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Benefit {
  id: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  icon_name: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

const fetchBenefits = async () => {
  const { data, error } = await supabase
    .from('benefits')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) throw error;
  return data || [];
};

export const useBenefits = () => {
  const queryClient = useQueryClient();

  // Query: Fetch benefits with automatic retry logic from QueryClient
  const { data: benefits = [], isLoading: loading, error } = useQuery({
    queryKey: ['benefits'],
    queryFn: fetchBenefits,
  });

  // Mutation: Create benefit
  const createMutation = useMutation({
    mutationFn: async (benefit: Omit<Benefit, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('benefits')
        .insert(benefit)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['benefits'] });
    },
  });

  // Mutation: Update benefit
  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Benefit> }) => {
      const { error } = await supabase
        .from('benefits')
        .update(updates)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['benefits'] });
    },
  });

  // Mutation: Delete benefit
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('benefits')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['benefits'] });
    },
  });

  return {
    benefits,
    loading,
    error: error ? (error as Error).message : null,
    fetchBenefits: () => queryClient.invalidateQueries({ queryKey: ['benefits'] }),
    createBenefit: (benefit: Omit<Benefit, 'id' | 'created_at' | 'updated_at'>) =>
      createMutation.mutateAsync(benefit),
    updateBenefit: (id: string, updates: Partial<Benefit>) =>
      updateMutation.mutateAsync({ id, updates }),
    deleteBenefit: (id: string) => deleteMutation.mutateAsync(id),
  };
};
