import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TranslationProvider, useTranslation } from './TranslationContext';
import { act } from 'react';

// Mock fetch
global.fetch = vi.fn((url) =>
  Promise.resolve({
    json: () => {
      if (url === '/translations/en.json') {
        return Promise.resolve({ 'navHome': 'Home' });
      }
      if (url === '/translations/ar.json') {
        return Promise.resolve({ 'navHome': 'الرئيسية' });
      }
      return Promise.resolve({});
    },
  })
) as any;

const TestComponent = () => {
  const { t, currentLanguage } = useTranslation();
  return (
    <div>
      <span data-testid="language">{currentLanguage}</span>
      <span data-testid="translation">{t('navHome')}</span>
    </div>
  );
};

describe('TranslationContext', () => {
  it('should load translations and provide them to components', async () => {
    render(
      <TranslationProvider>
        <TestComponent />
      </TranslationProvider>
    );

    // It should initially be 'ar' and then load the arabic translation
    expect(screen.getByTestId('language').textContent).toBe('ar');
    await waitFor(() => {
      expect(screen.getByTestId('translation').textContent).toBe('الرئيسية');
    });
  });
});
