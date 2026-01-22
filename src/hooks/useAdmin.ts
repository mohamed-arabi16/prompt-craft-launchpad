import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const checkAdminStatus = async (userId: string) => {
  const { data, error } = await supabase.rpc('is_admin', { _user_id: userId });

  if (error) {
    console.error('Error checking admin status:', error);
    throw error;
  }

  return data || false;
};

export const useAdmin = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Query: Check admin status with automatic retry logic from QueryClient
  const { data: isAdmin = false, isLoading: loading } = useQuery({
    queryKey: ['adminStatus', user?.id],
    queryFn: () => checkAdminStatus(user?.id || ''),
    enabled: !!user, // Only query when user is available
  });

  const refreshAdminStatus = () => {
    if (user) {
      queryClient.invalidateQueries({ queryKey: ['adminStatus', user.id] });
    }
  };

  return { isAdmin, loading, refreshAdminStatus };
};