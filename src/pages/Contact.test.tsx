import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Contact from './Contact';
import { TranslationProvider } from '../context/TranslationContext';
import { BrowserRouter } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';

// Mock the supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn(() => ({
        error: null,
      })),
    })),
  },
}));

// Mock the useTranslation hook
vi.mock('@/hooks/useTranslation', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: { [key: string]: string } = {
        'errors.required': 'Required',
        'errors.invalidEmail': 'Invalid email',
        'success.messageSent': 'Message sent successfully',
        'navHome': 'Home',
        'buttons.sendAnother': 'Send Another Message',
        'contactTitle': 'Contact Us',
        'contactSubtitle': 'We\'d love to hear from you.',
        'contactForm.name': 'Name',
        'contactForm.email': 'Email',
        'contactForm.subject': 'Subject',
        'contactForm.message': 'Message',
        'contactForm.submit': 'Submit',
        'loading.submitting': 'Submitting...',
      };
      return translations[key] || key;
    },
    language: 'en',
    changeLanguage: vi.fn(),
  }),
}));

describe('Contact Page', () => {
  it('should display validation errors and retain them on subsequent submissions', async () => {
    render(
      <BrowserRouter>
        <TranslationProvider>
          <Contact />
        </TranslationProvider>
      </BrowserRouter>
    );

    // 1. Click submit without filling out the form
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // 2. Check that error messages are displayed for all required fields
    await waitFor(() => {
      expect(screen.getAllByText('Required')).toHaveLength(4);
    });

    // 3. Fill in the name field
    const nameInput = screen.getByLabelText(/name/i);
    fireEvent.change(nameInput, {
      target: { value: 'John Doe' },
    });

    // The error message for the name field should disappear
    await waitFor(() => {
        expect(screen.queryAllByText('Required')).toHaveLength(3);
    });

    // 4. Click the submit button again
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // 5. Check that error messages are still displayed for the remaining required fields
    await waitFor(() => {
        expect(screen.getAllByText('Required')).toHaveLength(3);
    });
  });
});
