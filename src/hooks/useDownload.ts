import { useState } from 'react';
import { toast } from 'sonner';
import { useTranslation } from './useTranslation';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface DownloadState {
  isLoading: boolean;
  error: string | null;
}

/**
 * A hook to manage file downloads with proper error handling.
 */
export const useDownload = () => {
  const [state, setState] = useState<DownloadState>({
    isLoading: false,
    error: null,
  });
  const { t } = useTranslation();
  const { user } = useAuth();

  /**
   * Downloads a file from a URL or generates a signed URL from storage.
   */
  const downloadFile = async (filename: string, url?: string, storagePath?: string) => {
    setState({ isLoading: true, error: null });

    try {
      // Check network connectivity
      if (!navigator.onLine) {
        throw new Error(t('errors.networkError') || 'No internet connection');
      }

      let downloadUrl = url;

      // If storage path is provided, get signed URL
      if (storagePath && !url) {
        const { data: signedUrl, error: signedError } = await supabase.storage
          .from('course-materials')
          .createSignedUrl(storagePath, 3600);

        if (signedError) {
          throw new Error(t('errors.downloadFailed') || 'Failed to generate download link');
        }

        downloadUrl = signedUrl.signedUrl;
      }

      if (downloadUrl) {
        // Download from URL
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = filename;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // Fallback: create demo file
        const content = `AI Prompt Engineering Course - ${filename}

Course Overview:
- 5-Day Intensive Program
- Master ChatGPT, Midjourney, and Lovable
- Transform from casual user to strategic AI practitioner
- Expert techniques for professional results

Date Generated: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}

For full access to all course materials, please complete your enrollment.
`;
        const blob = new Blob([content], { type: 'text/plain' });
        const blobUrl = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(blobUrl);
      }

      toast.success(t('success.downloadStarted') || 'Download started');
      setState({ isLoading: false, error: null });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t('errors.genericError');
      setState({ isLoading: false, error: errorMessage });
      
      toast.error(errorMessage, {
        duration: 5000,
        action: {
          label: t('buttons.retry') || 'Retry',
          onClick: () => downloadFile(filename, url, storagePath),
        },
      });
    }
  };

  /**
   * Clears the error state.
   */
  const clearError = () => {
    setState(prev => ({ ...prev, error: null }));
  };

  return {
    ...state,
    downloadFile,
    clearError,
  };
};
