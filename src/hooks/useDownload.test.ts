import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDownload } from '@/hooks/useDownload';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { TranslationProvider } from '@/context/TranslationContext';
import React, { ReactNode } from 'react';

// Mock supabase
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null }, error: null }),
      onAuthStateChange: vi.fn().mockReturnValue({ data: { subscription: { unsubscribe: vi.fn() } } }),
    },
    storage: {
      from: vi.fn().mockReturnValue({
        createSignedUrl: vi.fn().mockResolvedValue({ data: { signedUrl: 'https://example.com/file.pdf' }, error: null }),
      }),
    },
  },
}));

// Mock sonner
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

function TestWrapper({ children }: { children: ReactNode }) {
  return React.createElement(
    BrowserRouter,
    null,
    React.createElement(
      TranslationProvider,
      null,
      React.createElement(AuthProvider, null, children)
    )
  );
}

describe('useDownload Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(navigator, 'onLine', {
      value: true,
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize with correct default state', () => {
    const { result } = renderHook(() => useDownload(), { wrapper: TestWrapper });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should have downloadFile function', () => {
    const { result } = renderHook(() => useDownload(), { wrapper: TestWrapper });

    expect(typeof result.current.downloadFile).toBe('function');
  });

  it('should have clearError function', () => {
    const { result } = renderHook(() => useDownload(), { wrapper: TestWrapper });

    expect(typeof result.current.clearError).toBe('function');
  });

  it('should set isLoading to true when download starts', async () => {
    const { result } = renderHook(() => useDownload(), { wrapper: TestWrapper });

    act(() => {
      result.current.downloadFile('test.pdf');
    });

    expect(result.current.isLoading).toBe(true);
  });

  it('should handle offline state', async () => {
    Object.defineProperty(navigator, 'onLine', {
      value: false,
      writable: true,
    });

    const { result } = renderHook(() => useDownload(), { wrapper: TestWrapper });

    await act(async () => {
      await result.current.downloadFile('test.pdf');
    });

    expect(result.current.error).toBeTruthy();
    expect(result.current.isLoading).toBe(false);
  });

  it('should clear error when clearError is called', async () => {
    Object.defineProperty(navigator, 'onLine', {
      value: false,
      writable: true,
    });

    const { result } = renderHook(() => useDownload(), { wrapper: TestWrapper });

    await act(async () => {
      await result.current.downloadFile('test.pdf');
    });

    expect(result.current.error).toBeTruthy();

    act(() => {
      result.current.clearError();
    });

    expect(result.current.error).toBeNull();
  });
});
