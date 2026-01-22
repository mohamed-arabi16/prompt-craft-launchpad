import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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

const fetchSiteContent = async (section?: string) => {
  let query = supabase.from('site_content').select('*');

  if (section) {
    query = query.eq('section', section);
  }

  const { data, error } = await query.order('section').order('content_key');

  if (error) throw error;
  return data || [];
};

export const useSiteContent = (section?: string) => {
  const queryClient = useQueryClient();

  // Query: Fetch content with automatic retry logic from QueryClient
  const { data: content = [], isLoading: loading, error } = useQuery({
    queryKey: ['siteContent', section],
    queryFn: () => fetchSiteContent(section),
  });

  const getContent = (key: string, lang: 'ar' | 'en' = 'ar', fallback: string = '') => {
    const item = content.find((c: SiteContent) => c.content_key === key);
    if (!item) return fallback;
    return lang === 'ar' ? item.content_ar : item.content_en;
  };

  // Get all content items that match a prefix (e.g., 'feature_' returns feature_1, feature_2, etc.)
  const getContentArray = (prefix: string, lang: 'ar' | 'en' = 'ar'): string[] => {
    const items = (content as SiteContent[])
      .filter(c => c.content_key.startsWith(prefix))
      .sort((a, b) => a.content_key.localeCompare(b.content_key));
    return items.map(item => lang === 'ar' ? item.content_ar : item.content_en);
  };

  // Get content by section (useful when you need all content from a specific section)
  const getContentBySection = (sectionName: string): SiteContent[] => {
    return (content as SiteContent[]).filter(c => c.section === sectionName);
  };

  // Mutation: Create content
  const createMutation = useMutation({
    mutationFn: async (item: Omit<SiteContent, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('site_content')
        .insert(item)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['siteContent'] });
    },
  });

  // Mutation: Update content
  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<SiteContent> }) => {
      const { error } = await supabase
        .from('site_content')
        .update(updates)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['siteContent'] });
    },
  });

  // Mutation: Delete content
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('site_content')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['siteContent'] });
    },
  });

  return {
    content,
    loading,
    error: error ? (error as Error).message : null,
    getContent,
    getContentArray,
    getContentBySection,
    fetchContent: () => queryClient.invalidateQueries({ queryKey: ['siteContent'] }),
    createContent: (item: Omit<SiteContent, 'id' | 'created_at' | 'updated_at'>) =>
      createMutation.mutateAsync(item),
    updateContent: (id: string, updates: Partial<SiteContent>) =>
      updateMutation.mutateAsync({ id, updates }),
    deleteContent: (id: string) => deleteMutation.mutateAsync(id),
  };
};
