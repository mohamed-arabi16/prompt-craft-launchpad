import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface CourseSetting {
  id: string;
  setting_key: string;
  setting_value: string;
  setting_type: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

const fetchSettings = async () => {
  const { data, error } = await supabase
    .from('course_settings')
    .select('*')
    .order('setting_key');

  if (error) throw error;
  return data || [];
};

export const useCourseSettings = () => {
  const queryClient = useQueryClient();

  // Query: Fetch course settings with automatic retry logic from QueryClient
  const { data: settings = [], isLoading: loading, error } = useQuery({
    queryKey: ['courseSettings'],
    queryFn: fetchSettings,
  });

  const getSetting = (key: string): string => {
    const setting = (settings as CourseSetting[]).find(s => s.setting_key === key);
    return setting?.setting_value || '';
  };

  const getSettingAsNumber = (key: string): number => {
    return Number(getSetting(key)) || 0;
  };

  const getSettingAsBoolean = (key: string): boolean => {
    return getSetting(key) === 'true';
  };

  // Mutation: Create setting
  const createMutation = useMutation({
    mutationFn: async (setting: Omit<CourseSetting, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('course_settings')
        .insert(setting)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courseSettings'] });
    },
  });

  // Mutation: Update setting
  const updateMutation = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string }) => {
      const { error } = await supabase
        .from('course_settings')
        .update({ setting_value: value })
        .eq('setting_key', key);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courseSettings'] });
    },
  });

  // Mutation: Delete setting
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('course_settings')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courseSettings'] });
    },
  });

  return {
    settings,
    loading,
    error: error ? (error as Error).message : null,
    getSetting,
    getSettingAsNumber,
    getSettingAsBoolean,
    fetchSettings: () => queryClient.invalidateQueries({ queryKey: ['courseSettings'] }),
    createSetting: (setting: Omit<CourseSetting, 'id' | 'created_at' | 'updated_at'>) =>
      createMutation.mutateAsync(setting),
    updateSetting: (key: string, value: string) =>
      updateMutation.mutateAsync({ key, value }),
    deleteSetting: (id: string) => deleteMutation.mutateAsync(id),
  };
};
