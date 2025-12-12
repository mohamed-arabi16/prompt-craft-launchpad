import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';
import { toast } from 'sonner';
import LoadingSpinner from '@/components/LoadingSpinner';
import { ArrowLeft, CheckCircle, User, Mail, Phone, Building, Sparkles, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { enrollmentSchema, type EnrollmentFormData } from '@/lib/validations';
import { celebrateEnrollment, emojiCelebration } from '@/lib/confetti';
import { AnimatedBackground, GlassCard, MagneticButton } from '@/components/premium';

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
 * Premium enrollment page with animations and confetti celebration
 */
const Enrollment = () => {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
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

  // Trigger confetti on successful submission
  useEffect(() => {
    if (isSubmitted && !prefersReducedMotion) {
      celebrateEnrollment();
      setTimeout(() => {
        emojiCelebration();
      }, 1500);
    }
  }, [isSubmitted, prefersReducedMotion]);

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

  const handleInputChange = (field: keyof EnrollmentFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const experienceLevels = ['beginner', 'intermediate', 'advanced'] as const;

  // Success state with celebration
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
        <AnimatedBackground variant="particles" opacity={0.3} />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="relative z-10"
        >
          <GlassCard variant="gradient" glow className="w-full max-w-md text-center p-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-cyan flex items-center justify-center shadow-lg shadow-primary/30">
                <CheckCircle className="h-10 w-10 text-primary-foreground" />
              </div>
            </motion.div>

            <motion.h2
              className="text-2xl font-bold text-foreground mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {t('success.enrollmentComplete')}
            </motion.h2>

            <motion.p
              className="text-muted-foreground mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {t('success.enrollmentSubtext')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link to="/">
                <MagneticButton variant="primary" className="w-full" glow>
                  <ArrowLeft className="h-4 w-4 ltr:mr-2 rtl:ml-2" />
                  {t('navHome')}
                </MagneticButton>
              </Link>
            </motion.div>
          </GlassCard>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 relative overflow-hidden">
      <AnimatedBackground variant="mesh" opacity={0.3} />

      <div className="max-w-2xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-4 group">
            <ArrowLeft className="h-4 w-4 ltr:mr-2 rtl:ml-2 transition-transform group-hover:ltr:-translate-x-1 group-hover:rtl:translate-x-1" />
            {t('navHome')}
          </Link>

          <motion.div
            className="inline-flex items-center px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full border border-primary/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Rocket className="h-4 w-4 ltr:mr-2 rtl:ml-2" />
            {t('enrollmentBadge') || 'Start Your Journey'}
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('enrollmentTitle')}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t('enrollmentSubtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard variant="default" glow className="p-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-cyan/5 border-b border-border/50">
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <User className="h-5 w-5 text-primary" />
                </div>
                {t('enrollmentTitle')}
              </CardTitle>
              <CardDescription className="space-y-2">
                <p>{t('enrollmentSubtitle')}</p>
                <p className="text-sm text-muted-foreground">
                  {t('enrollmentForm.dataUsage')}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t('enrollmentForm.requiredFields')}
                </p>
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Label htmlFor="firstName" className="flex items-center gap-1">
                      {t('enrollmentForm.firstName')}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className={`transition-all duration-300 ${errors.firstName ? 'border-destructive' : 'focus:border-primary focus:ring-primary/20'}`}
                      disabled={isSubmitting}
                      maxLength={50}
                      autoComplete="given-name"
                    />
                    {errors.firstName && (
                      <motion.p
                        className="text-sm text-destructive"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {errors.firstName}
                      </motion.p>
                    )}
                  </motion.div>

                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <Label htmlFor="lastName" className="flex items-center gap-1">
                      {t('enrollmentForm.lastName')}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className={`transition-all duration-300 ${errors.lastName ? 'border-destructive' : 'focus:border-primary focus:ring-primary/20'}`}
                      disabled={isSubmitting}
                      maxLength={50}
                      autoComplete="family-name"
                    />
                    {errors.lastName && (
                      <motion.p
                        className="text-sm text-destructive"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {errors.lastName}
                      </motion.p>
                    )}
                  </motion.div>
                </div>

                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    {t('enrollmentForm.email')}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`transition-all duration-300 ${errors.email ? 'border-destructive' : 'focus:border-primary focus:ring-primary/20'}`}
                    disabled={isSubmitting}
                    maxLength={255}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <motion.p
                      className="text-sm text-destructive"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                >
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    {t('enrollmentForm.phone')}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`transition-all duration-300 ${errors.phone ? 'border-destructive' : 'focus:border-primary focus:ring-primary/20'}`}
                    disabled={isSubmitting}
                    maxLength={20}
                    autoComplete="tel"
                  />
                  {errors.phone && (
                    <motion.p
                      className="text-sm text-destructive"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.phone}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Label htmlFor="company" className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-primary" />
                    {t('enrollmentForm.company') || 'Company'}
                  </Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="transition-all duration-300 focus:border-primary focus:ring-primary/20"
                    disabled={isSubmitting}
                    maxLength={100}
                    autoComplete="organization"
                  />
                </motion.div>

                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                >
                  <Label htmlFor="aiExperience" className="flex items-center gap-1">
                    {t('enrollmentForm.experience.label')}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.aiExperience}
                    onValueChange={(value) => handleInputChange('aiExperience', value)}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger className={`transition-all duration-300 ${errors.aiExperience ? 'border-destructive' : ''}`}>
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
                    <motion.p
                      className="text-sm text-destructive"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.aiExperience}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <MagneticButton
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                    glow
                    onClick={() => {}}
                  >
                    {isSubmitting ? (
                      <>
                        <LoadingSpinner size="sm" className="ltr:mr-2 rtl:ml-2" />
                        {t('loading.submitting')}
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5 ltr:mr-2 rtl:ml-2" />
                        {t('enrollmentForm.submit')}
                      </>
                    )}
                  </MagneticButton>
                </motion.div>
              </form>
            </CardContent>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default Enrollment;
