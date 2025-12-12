import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface SiteContent {
  id: string;
  section: string;
  content_key: string;
  content_ar: string;
  content_en: string;
  created_at: string;
  updated_at: string;
}

export const useSiteContent = (section?: string) => {
  const [content, setContent] = useState<SiteContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = async () => {
    try {
      setLoading(true);
      let query = supabase.from('site_content').select('*');
      
      if (section) {
        query = query.eq('section', section);
      }
      
      const { data, error } = await query.order('section').order('content_key');

      if (error) throw error;
      setContent(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getContent = (key: string, lang: 'ar' | 'en' = 'ar') => {
    const item = content.find(c => c.content_key === key);
    return item ? (lang === 'ar' ? item.content_ar : item.content_en) : '';
  };

  const createContent = async (item: Omit<SiteContent, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('site_content')
      .insert(item)
      .select()
      .single();
    if (error) throw error;
    await fetchContent();
    return data;
  };

  const updateContent = async (id: string, updates: Partial<SiteContent>) => {
    const { error } = await supabase
      .from('site_content')
      .update(updates)
      .eq('id', id);
    if (error) throw error;
    await fetchContent();
  };

  const deleteContent = async (id: string) => {
    const { error } = await supabase
      .from('site_content')
      .delete()
      .eq('id', id);
    if (error) throw error;
    await fetchContent();
  };

  useEffect(() => {
    fetchContent();
  }, [section]);

  return {
    content,
    loading,
    error,
    getContent,
    fetchContent,
    createContent,
    updateContent,
    deleteContent,
  };
};
