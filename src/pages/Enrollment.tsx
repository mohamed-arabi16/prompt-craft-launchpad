import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';
import { toast } from 'sonner';
import LoadingSpinner from '@/components/LoadingSpinner';
import { ArrowLeft, CheckCircle, User, Mail, Phone, Building } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

/**
 * @interface FormData
 * @property {string} firstName - The user's first name.
 * @property {string} lastName - The user's last name.
 * @property {string} email - The user's email address.
 * @property {string} phone - The user's phone number.
 * @property {string} company - The user's company.
 * @property {string} experience - The user's AI experience level.
 */
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  experience: string;
  goals: string;
}

/**
 * @interface FormErrors
 * @property {string} [firstName] - The error message for the first name field.
 * @property {string} [lastName] - The error message for the last name field.
 * @property {string} [email] - The error message for the email field.
 * @property {string} [phone] - The error message for the phone field.
 * @property {string} [experience] - The error message for the experience field.
 */
interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  experience?: string;
}

/**
 * The enrollment page, which includes a form for users to enroll in the course.
 *
 * @returns {JSX.Element} The rendered enrollment page.
 */
const Enrollment = () => {
  const { t, tArray } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    experience: '',
    goals: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  /**
   * Validates the enrollment form.
   *
   * @returns {boolean} Whether the form is valid.
   */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = t('errors.required');
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = t('errors.required');
    }
    if (!formData.email.trim()) {
      newErrors.email = t('errors.required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('errors.invalidEmail');
    }
    if (!formData.phone.trim()) {
      newErrors.phone = t('errors.required');
    }
    if (!formData.experience) {
      newErrors.experience = t('errors.required');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles the submission of the enrollment form.
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
        .from('enrollments')
        .insert({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone || null,
          country: formData.country || null,
          experience_level: formData.experience,
          goals: formData.goals || null,
          enrollment_completed: true,
        });

      if (error) {
        throw error;
      }

      setIsSubmitted(true);
      toast.success(t('success.enrollmentComplete'));
    } catch (error) {
      console.error('Error submitting enrollment:', error);
      toast.error(t('errors.genericError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handles changes to the form inputs.
   *
   * @param {keyof FormData} field - The field to update.
   * @param {string} value - The new value of the field.
   */
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const experienceLevels = ['beginner', 'intermediate', 'advanced'];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {t('success.enrollmentComplete')}
            </h2>
              <p className="text-muted-foreground mb-6">
                {t('success.enrollmentSubtext')}
              </p>
            <Link to="/">
              <Button className="w-full">
                <ArrowLeft className="h-4 w-4 ltr:mr-2 rtl:ml-2" />
                {t('navHome')}
              </Button>
            </Link>
          </CardContent>
        </Card>
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
            {t('enrollmentTitle')}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t('enrollmentSubtitle')}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              {t('enrollmentTitle')}
            </CardTitle>
            <CardDescription className="space-y-2">
              <p>{t('enrollmentSubtitle')}</p>
              <p
                className="text-sm text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: t('enrollmentForm.dataUsage') }}
              />
              <p className="text-xs text-muted-foreground">
                {t('enrollmentForm.requiredFields')}
              </p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="flex items-center gap-1">
                    {t('enrollmentForm.firstName')}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={errors.firstName ? 'border-destructive' : ''}
                    disabled={isSubmitting}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-destructive">{errors.firstName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="flex items-center gap-1">
                    {t('enrollmentForm.lastName')}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={errors.lastName ? 'border-destructive' : ''}
                    disabled={isSubmitting}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-destructive">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {t('enrollmentForm.email')}
                  <span className="text-destructive">*</span>
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
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {t('enrollmentForm.phone')}
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={errors.phone ? 'border-destructive' : ''}
                  disabled={isSubmitting}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="country" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  {t('enrollmentForm.country') || 'Country'}
                </Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience" className="flex items-center gap-1">
                  {t('enrollmentForm.experience.label')}
                  <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.experience}
                  onValueChange={(value) => handleInputChange('experience', value)}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className={errors.experience ? 'border-destructive' : ''}>
                    <SelectValue placeholder={t('enrollmentForm.experience.label')} />
                  </SelectTrigger>
                  <SelectContent>
                    {experienceLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {t(`enrollmentForm.experience.options.${level}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.experience && (
                  <p className="text-sm text-destructive">{errors.experience}</p>
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
                  t('enrollmentForm.submit')
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Enrollment;