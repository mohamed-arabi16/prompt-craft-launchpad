import { useState, useEffect } from 'react';
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

export const useCourseSettings = () => {
  const [settings, setSettings] = useState<CourseSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('course_settings')
        .select('*')
        .order('setting_key');

      if (error) throw error;
      setSettings(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getSetting = (key: string): string => {
    const setting = settings.find(s => s.setting_key === key);
    return setting?.setting_value || '';
  };

  const getSettingAsNumber = (key: string): number => {
    return Number(getSetting(key)) || 0;
  };

  const getSettingAsBoolean = (key: string): boolean => {
    return getSetting(key) === 'true';
  };

  const createSetting = async (setting: Omit<CourseSetting, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('course_settings')
      .insert(setting)
      .select()
      .single();
    if (error) throw error;
    await fetchSettings();
    return data;
  };

  const updateSetting = async (key: string, value: string) => {
    const { error } = await supabase
      .from('course_settings')
      .update({ setting_value: value })
      .eq('setting_key', key);
    if (error) throw error;
    await fetchSettings();
  };

  const deleteSetting = async (id: string) => {
    const { error } = await supabase
      .from('course_settings')
      .delete()
      .eq('id', id);
    if (error) throw error;
    await fetchSettings();
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return {
    settings,
    loading,
    error,
    getSetting,
    getSettingAsNumber,
    getSettingAsBoolean,
    fetchSettings,
    createSetting,
    updateSetting,
    deleteSetting,
  };
};
