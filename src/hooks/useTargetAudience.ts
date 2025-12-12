import { useState, useEffect } from 'react';
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

export const useTargetAudience = () => {
  const [items, setItems] = useState<TargetAudienceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('target_audience_items')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setItems(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createItem = async (item: Omit<TargetAudienceItem, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('target_audience_items')
      .insert(item)
      .select()
      .single();
    if (error) throw error;
    await fetchItems();
    return data;
  };

  const updateItem = async (id: string, updates: Partial<TargetAudienceItem>) => {
    const { error } = await supabase
      .from('target_audience_items')
      .update(updates)
      .eq('id', id);
    if (error) throw error;
    await fetchItems();
  };

  const deleteItem = async (id: string) => {
    const { error } = await supabase
      .from('target_audience_items')
      .delete()
      .eq('id', id);
    if (error) throw error;
    await fetchItems();
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return {
    items,
    loading,
    error,
    fetchItems,
    createItem,
    updateItem,
    deleteItem,
  };
};
