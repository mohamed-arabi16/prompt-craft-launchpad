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
import { enrollmentSchema, type EnrollmentFormData } from '@/lib/validations';

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  aiExperience?: string;
  company?: string;
  goals?: string;
}

/**
 * The enrollment page with Zod validation and XSS protection.
 */
const Enrollment = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<EnrollmentFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    aiExperience: 'beginner',
    goals: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  /**
   * Validates the form using Zod schema
   */
  const validateForm = (): boolean => {
    const result = enrollmentSchema.safeParse(formData);
    
    if (!result.success) {
      const newErrors: FormErrors = {};
      result.error.errors.forEach((error) => {
        const field = error.path[0] as keyof FormErrors;
        newErrors[field] = t(`errors.${error.message}`) || error.message;
      });
      setErrors(newErrors);
      return false;
    }
    
    setErrors({});
    return true;
  };

  /**
   * Handles form submission with validation
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
          first_name: formData.firstName.trim(),
          last_name: formData.lastName.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim() || null,
          company: formData.company?.trim() || null,
          ai_experience: formData.aiExperience,
          goals: formData.goals?.trim() || null,
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
   * Handles input changes with error clearing
   */
  const handleInputChange = (field: keyof EnrollmentFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const experienceLevels = ['beginner', 'intermediate', 'advanced'] as const;

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
              {/* Safe rendering without dangerouslySetInnerHTML */}
              <p className="text-sm text-muted-foreground">
                {t('enrollmentForm.dataUsage')}
              </p>
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
                    maxLength={50}
                    autoComplete="given-name"
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
                    maxLength={50}
                    autoComplete="family-name"
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
                  maxLength={255}
                  autoComplete="email"
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
                  maxLength={20}
                  autoComplete="tel"
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  {t('enrollmentForm.company') || 'Company'}
                </Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  disabled={isSubmitting}
                  maxLength={100}
                  autoComplete="organization"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="aiExperience" className="flex items-center gap-1">
                  {t('enrollmentForm.experience.label')}
                  <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.aiExperience}
                  onValueChange={(value) => handleInputChange('aiExperience', value)}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className={errors.aiExperience ? 'border-destructive' : ''}>
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
                {errors.aiExperience && (
                  <p className="text-sm text-destructive">{errors.aiExperience}</p>
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
