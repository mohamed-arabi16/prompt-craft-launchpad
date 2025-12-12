import { useState, useEffect } from 'react';
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

export const useFAQs = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFAQs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setFaqs(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createFAQ = async (faq: Omit<FAQ, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('faqs')
      .insert(faq)
      .select()
      .single();
    if (error) throw error;
    await fetchFAQs();
    return data;
  };

  const updateFAQ = async (id: string, updates: Partial<FAQ>) => {
    const { error } = await supabase
      .from('faqs')
      .update(updates)
      .eq('id', id);
    if (error) throw error;
    await fetchFAQs();
  };

  const deleteFAQ = async (id: string) => {
    const { error } = await supabase
      .from('faqs')
      .delete()
      .eq('id', id);
    if (error) throw error;
    await fetchFAQs();
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  return {
    faqs,
    loading,
    error,
    fetchFAQs,
    createFAQ,
    updateFAQ,
    deleteFAQ,
  };
};
