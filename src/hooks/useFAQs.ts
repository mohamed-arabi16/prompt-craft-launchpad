import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface FAQ {
  id: string;
  question_ar: string;
  question_en: string;
  answer_ar: string;
  answer_en: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

const fetchFAQs = async () => {
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) throw error;
  return data || [];
};

export const useFAQs = () => {
  const queryClient = useQueryClient();

  // Query: Fetch FAQs with automatic retry logic from QueryClient
  const { data: faqs = [], isLoading: loading, error } = useQuery({
    queryKey: ['faqs'],
    queryFn: fetchFAQs,
  });

  // Mutation: Create FAQ
  const createMutation = useMutation({
    mutationFn: async (faq: Omit<FAQ, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('faqs')
        .insert(faq)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
    },
  });

  // Mutation: Update FAQ
  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<FAQ> }) => {
      const { error } = await supabase
        .from('faqs')
        .update(updates)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
    },
  });

  // Mutation: Delete FAQ
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('faqs')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
    },
  });

  return {
    faqs,
    loading,
    error: error ? (error as Error).message : null,
    fetchFAQs: () => queryClient.invalidateQueries({ queryKey: ['faqs'] }),
    createFAQ: (faq: Omit<FAQ, 'id' | 'created_at' | 'updated_at'>) =>
      createMutation.mutateAsync(faq),
    updateFAQ: (id: string, updates: Partial<FAQ>) =>
      updateMutation.mutateAsync({ id, updates }),
    deleteFAQ: (id: string) => deleteMutation.mutateAsync(id),
  };
};
