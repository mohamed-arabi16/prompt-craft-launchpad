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

      // For demo purposes, simulate a download failure for PDF
      if (filename.includes('.pdf') && Math.random() > 0.7) {
        throw new Error(t('errors.downloadFailed'));
      }

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
        // Placeholder download - create a dummy file
        const content = `Course Outline - ${new Date().toLocaleDateString()}`;
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
      
      toast.error(errorMessage, {
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