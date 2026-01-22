import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface TargetAudienceItem {
  id: string;
  content_ar: string;
  content_en: string;
  icon_name: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

const fetchItems = async () => {
  const { data, error } = await supabase
    .from('target_audience_items')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) throw error;
  return data || [];
};

export const useTargetAudience = () => {
  const queryClient = useQueryClient();

  // Query: Fetch target audience items with automatic retry logic from QueryClient
  const { data: items = [], isLoading: loading, error } = useQuery({
    queryKey: ['targetAudience'],
    queryFn: fetchItems,
  });

  // Mutation: Create item
  const createMutation = useMutation({
    mutationFn: async (item: Omit<TargetAudienceItem, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('target_audience_items')
        .insert(item)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['targetAudience'] });
    },
  });

  // Mutation: Update item
  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<TargetAudienceItem> }) => {
      const { error } = await supabase
        .from('target_audience_items')
        .update(updates)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['targetAudience'] });
    },
  });

  // Mutation: Delete item
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('target_audience_items')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['targetAudience'] });
    },
  });

  return {
    items,
    loading,
    error: error ? (error as Error).message : null,
    fetchItems: () => queryClient.invalidateQueries({ queryKey: ['targetAudience'] }),
    createItem: (item: Omit<TargetAudienceItem, 'id' | 'created_at' | 'updated_at'>) =>
      createMutation.mutateAsync(item),
    updateItem: (id: string, updates: Partial<TargetAudienceItem>) =>
      updateMutation.mutateAsync({ id, updates }),
    deleteItem: (id: string) => deleteMutation.mutateAsync(id),
  };
};
