import { useState, useEffect } from 'react';
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

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createTestimonial = async (testimonial: Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('testimonials')
      .insert(testimonial)
      .select()
      .single();
    if (error) throw error;
    await fetchTestimonials();
    return data;
  };

  const updateTestimonial = async (id: string, updates: Partial<Testimonial>) => {
    const { error } = await supabase
      .from('testimonials')
      .update(updates)
      .eq('id', id);
    if (error) throw error;
    await fetchTestimonials();
  };

  const deleteTestimonial = async (id: string) => {
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);
    if (error) throw error;
    await fetchTestimonials();
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return {
    testimonials,
    loading,
    error,
    fetchTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
  };
};
