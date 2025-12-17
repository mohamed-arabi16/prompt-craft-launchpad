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

  const getContent = (key: string, lang: 'ar' | 'en' = 'ar', fallback: string = '') => {
    const item = content.find(c => c.content_key === key);
    if (!item) return fallback;
    return lang === 'ar' ? item.content_ar : item.content_en;
  };

  // Get all content items that match a prefix (e.g., 'feature_' returns feature_1, feature_2, etc.)
  const getContentArray = (prefix: string, lang: 'ar' | 'en' = 'ar'): string[] => {
    const items = content
      .filter(c => c.content_key.startsWith(prefix))
      .sort((a, b) => a.content_key.localeCompare(b.content_key));
    return items.map(item => lang === 'ar' ? item.content_ar : item.content_en);
  };

  // Get content by section (useful when you need all content from a specific section)
  const getContentBySection = (sectionName: string): SiteContent[] => {
    return content.filter(c => c.section === sectionName);
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
    getContentArray,
    getContentBySection,
    fetchContent,
    createContent,
    updateContent,
    deleteContent,
  };
};
