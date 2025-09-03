import { useState } from 'react';
import { toast } from 'sonner';
import { useTranslation } from './useTranslation';

/**
 * @interface DownloadState
 * @property {boolean} isLoading - Whether a download is in progress.
 * @property {string | null} error - The error message, if any.
 */
export interface DownloadState {
  isLoading: boolean;
  error: string | null;
}

/**
 * A hook to manage file downloads.
 *
 * @returns {{ isLoading: boolean; error: string | null; downloadFile: (filename: string, url?: string) => Promise<void>; clearError: () => void; }} The download state and actions.
 */
export const useDownload = () => {
  const [state, setState] = useState<DownloadState>({
    isLoading: false,
    error: null,
  });
  const { t } = useTranslation();

  /**
   * Downloads a file.
   *
   * @param {string} filename - The name of the file to download.
   * @param {string} [url] - The URL of the file to download.
   */
  const downloadFile = async (filename: string, url?: string) => {
    setState({ isLoading: true, error: null });

    try {
      // Simulate network check and file availability
      if (!navigator.onLine) {
        throw new Error(t('errors.networkError'));
      }

      // Removed artificial download failure for production

      // Simulate download delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In a real implementation, you would fetch the file
      if (url) {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // Create a meaningful demo file instead of just placeholder text
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

      toast.success(t('success.downloadStarted'));
      setState({ isLoading: false, error: null });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t('errors.genericError');
      setState({ isLoading: false, error: errorMessage });
      
      // Provide user-friendly fallback messages
      const fallbackMessage = filename.includes('.pdf') 
        ? t('errors.fileNotAvailable')
        : errorMessage;
      
      toast.error(fallbackMessage, {
        duration: 5000,
        action: {
          label: t('buttons.retry'),
          onClick: () => downloadFile(filename, url),
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