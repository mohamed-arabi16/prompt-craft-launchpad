import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';
import { toast } from 'sonner';
import LoadingSpinner from '@/components/LoadingSpinner';
import { ArrowLeft, CheckCircle, Mail, MessageSquare, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

/**
 * @interface ContactFormData
 * @property {string} name - The user's name.
 * @property {string} email - The user's email address.
 * @property {string} subject - The subject of the message.
 * @property {string} message - The message content.
 */
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * @interface ContactFormErrors
 * @property {string} [name] - The error message for the name field.
 * @property {string} [email] - The error message for the email field.
 * @property {string} [subject] - The error message for the subject field.
 * @property {string} [message] - The error message for the message field.
 */
interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

/**
 * The contact page, which includes a form for users to send messages.
 *
 * @returns {JSX.Element} The rendered contact page.
 */
const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  /**
   * Validates the contact form.
   *
   * @returns {boolean} Whether the form is valid.
   */
  const validateForm = (): boolean => {
    const newErrors: ContactFormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t('errors.required');
    }
    if (!formData.email.trim()) {
      newErrors.email = t('errors.required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('errors.invalidEmail');
    }
    if (!formData.subject.trim()) {
      newErrors.subject = t('errors.required');
    }
    if (!formData.message.trim()) {
      newErrors.message = t('errors.required');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles the submission of the contact form.
   *
   * @param {React.FormEvent} e - The form event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        });

      if (error) {
        throw error;
      }

      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      toast.success(t('success.messageSent'));
    } catch (error) {
      console.error('Error submitting contact message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handles changes to the form inputs.
   *
   * @param {keyof ContactFormData} field - The field to update.
   * @param {string} value - The new value of the field.
   */
  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-2xl mx-auto px-6">
          <Card className="text-center">
            <CardContent className="pt-6">
              <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {t('success.messageSent')}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t('success.messageSentSubtext')}
              </p>
              <div className="flex gap-4 justify-center">
                <Link to="/">
                  <Button variant="outline">
                    <ArrowLeft className="h-4 w-4 ltr:mr-2 rtl:ml-2" />
                    {t('navHome')}
                  </Button>
                </Link>
                <Button onClick={() => setIsSubmitted(false)}>
                  {t('buttons.sendAnother')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-4">
            <ArrowLeft className="h-4 w-4 ltr:mr-2 rtl:ml-2" />
            {t('navHome')}
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('contactTitle')}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t('contactSubtitle')}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              {t('contactTitle')}
            </CardTitle>
            <CardDescription>
              {t('contactSubtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {t('contactForm.name')}
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={errors.name ? 'border-destructive' : ''}
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {t('contactForm.email')}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={errors.email ? 'border-destructive' : ''}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">
                  {t('contactForm.subject')}
                </Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  className={errors.subject ? 'border-destructive' : ''}
                  disabled={isSubmitting}
                />
                {errors.subject && (
                  <p className="text-sm text-destructive">{errors.subject}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">
                  {t('contactForm.message')}
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className={errors.message ? 'border-destructive' : ''}
                  rows={6}
                  disabled={isSubmitting}
                />
                {errors.message && (
                  <p className="text-sm text-destructive">{errors.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner size="sm" className="ltr:mr-2 rtl:ml-2" />
                    {t('loading.submitting')}
                  </>
                ) : (
                  t('contactForm.submit')
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;