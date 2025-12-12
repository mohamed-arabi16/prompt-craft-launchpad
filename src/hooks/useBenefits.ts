import { useState, useEffect } from 'react';
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

export const useBenefits = () => {
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBenefits = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('benefits')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setBenefits(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createBenefit = async (benefit: Omit<Benefit, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('benefits')
      .insert(benefit)
      .select()
      .single();
    if (error) throw error;
    await fetchBenefits();
    return data;
  };

  const updateBenefit = async (id: string, updates: Partial<Benefit>) => {
    const { error } = await supabase
      .from('benefits')
      .update(updates)
      .eq('id', id);
    if (error) throw error;
    await fetchBenefits();
  };

  const deleteBenefit = async (id: string) => {
    const { error } = await supabase
      .from('benefits')
      .delete()
      .eq('id', id);
    if (error) throw error;
    await fetchBenefits();
  };

  useEffect(() => {
    fetchBenefits();
  }, []);

  return {
    benefits,
    loading,
    error,
    fetchBenefits,
    createBenefit,
    updateBenefit,
    deleteBenefit,
  };
};
