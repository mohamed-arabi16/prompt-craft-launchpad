import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, CheckCircle, User, Phone, Mail, MapPin, Target, BarChart3, MessageSquare } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { GlassCard } from '@/components/premium';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface BookingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  // Step 1
  fullName: string;
  whatsapp: string;
  email: string;
  city: string;
  attendance: string;
  // Step 2
  primaryGoal: string;
  currentLevel: string;
  message: string;
  // Honeypot
  website: string;
}

const initialFormData: FormData = {
  fullName: '',
  whatsapp: '',
  email: '',
  city: '',
  attendance: '',
  primaryGoal: '',
  currentLevel: '',
  message: '',
  website: '', // Honeypot field
};

/**
 * 2-step booking form modal for course registration
 */
export default function BookingFormModal({ isOpen, onClose }: BookingFormModalProps) {
  const { t, currentLanguage } = useTranslation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  // Mutation: Submit booking form with automatic retry logic from QueryClient
  const submitMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const { error } = await supabase.from('enrollments').insert({
        first_name: data.fullName.split(' ')[0] || data.fullName,
        last_name: data.fullName.split(' ').slice(1).join(' ') || '',
        email: data.email || null,
        phone: data.whatsapp,
        company: data.city || null,
        ai_experience: data.currentLevel || 'beginner',
        goals: `الهدف: ${data.primaryGoal || 'غير محدد'} | الحضور: ${data.attendance} | رسالة: ${data.message || 'لا يوجد'}`,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      setIsSuccess(true);
    },
    onError: (error) => {
      console.error('Submission error:', error);
      toast.error(currentLanguage === 'ar' ? 'حدث خطأ، يرجى المحاولة مرة أخرى' : 'An error occurred, please try again');
    },
  });

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStep1 = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = currentLanguage === 'ar' ? 'الاسم الكامل مطلوب' : 'Full name is required';
    }

    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = currentLanguage === 'ar' ? 'رقم واتساب مطلوب' : 'WhatsApp number is required';
    } else if (!/^\+?[\d\s-]{8,}$/.test(formData.whatsapp.replace(/\s/g, ''))) {
      newErrors.whatsapp = currentLanguage === 'ar' ? 'يرجى إدخال رقم صحيح' : 'Please enter a valid number';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = currentLanguage === 'ar' ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Please enter a valid email';
    }

    if (!formData.attendance) {
      newErrors.attendance = currentLanguage === 'ar' ? 'يرجى اختيار طريقة الحضور' : 'Please select attendance preference';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  const handleSubmit = async () => {
    // Honeypot check - if website field is filled, it's likely a bot
    if (formData.website) {
      // Silently reject but show success to not alert bots
      setIsSuccess(true);
      return;
    }

    // Use mutation to submit (automatic retry via QueryClient)
    submitMutation.mutate(formData);
  };

  const handleClose = () => {
    setStep(1);
    setFormData(initialFormData);
    setErrors({});
    setIsSuccess(false);
    onClose();
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="booking-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 z-0 bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-lg z-10"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
          >
          <GlassCard variant="strong" glow className="p-6 relative">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 ltr:right-4 rtl:left-4 p-2 rounded-full hover:bg-muted/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={currentLanguage === 'ar' ? 'إغلاق' : 'Close'}
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>

            {isSuccess ? (
              /* Success Screen */
              <motion.div
                className="text-center py-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-cyan rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {currentLanguage === 'ar' ? 'تم استلام طلبك ✅' : 'Request Received ✅'}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {currentLanguage === 'ar'
                    ? 'سنقوم بالتواصل معك عبر واتساب خلال 24 ساعة.'
                    : 'We will contact you via WhatsApp within 24 hours.'}
                </p>
                <Button onClick={handleClose} variant="outline">
                  {currentLanguage === 'ar' ? 'إغلاق' : 'Close'}
                </Button>
              </motion.div>
            ) : (
              <>
                {/* Header */}
                <div className="mb-6 text-center">
                  <h2 className="text-xl font-bold text-foreground mb-1">
                    {currentLanguage === 'ar' ? 'احجز مقعدك' : 'Book Your Seat'}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {currentLanguage === 'ar'
                      ? `الخطوة ${step} من 2`
                      : `Step ${step} of 2`}
                  </p>
                  {/* Progress indicator */}
                  <div className="flex justify-center gap-2 mt-3">
                    <div className={`h-1.5 w-16 rounded-full transition-colors ${step >= 1 ? 'bg-primary' : 'bg-muted'}`} />
                    <div className={`h-1.5 w-16 rounded-full transition-colors ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {step === 1 ? (
                    /* Step 1: Required Fields */
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-4"
                    >
                      {/* Full Name */}
                      <div>
                        <Label htmlFor="fullName" className="flex items-center gap-2 mb-1.5">
                          <User className="h-4 w-4 text-primary" />
                          {currentLanguage === 'ar' ? 'الاسم الكامل *' : 'Full Name *'}
                        </Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => updateField('fullName', e.target.value)}
                          placeholder={currentLanguage === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                          className={errors.fullName ? 'border-destructive' : ''}
                        />
                        {errors.fullName && (
                          <p className="text-xs text-destructive mt-1">{errors.fullName}</p>
                        )}
                      </div>

                      {/* WhatsApp */}
                      <div>
                        <Label htmlFor="whatsapp" className="flex items-center gap-2 mb-1.5">
                          <Phone className="h-4 w-4 text-primary" />
                          {currentLanguage === 'ar' ? 'رقم واتساب *' : 'WhatsApp Number *'}
                        </Label>
                        <Input
                          id="whatsapp"
                          type="tel"
                          value={formData.whatsapp}
                          onChange={(e) => updateField('whatsapp', e.target.value)}
                          placeholder={currentLanguage === 'ar' ? '+966 5XX XXX XXXX' : '+1 XXX XXX XXXX'}
                          className={errors.whatsapp ? 'border-destructive' : ''}
                          dir="ltr"
                        />
                        {errors.whatsapp && (
                          <p className="text-xs text-destructive mt-1">{errors.whatsapp}</p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                          {currentLanguage === 'ar' ? 'أدخل الرقم مع رمز الدولة' : 'Include country code'}
                        </p>
                      </div>

                      {/* Email (optional) */}
                      <div>
                        <Label htmlFor="email" className="flex items-center gap-2 mb-1.5">
                          <Mail className="h-4 w-4 text-primary" />
                          {currentLanguage === 'ar' ? 'البريد الإلكتروني (اختياري)' : 'Email (optional)'}
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          placeholder={currentLanguage === 'ar' ? 'example@email.com' : 'example@email.com'}
                          className={errors.email ? 'border-destructive' : ''}
                          dir="ltr"
                        />
                        {errors.email && (
                          <p className="text-xs text-destructive mt-1">{errors.email}</p>
                        )}
                      </div>

                      {/* City/Country (optional) */}
                      <div>
                        <Label htmlFor="city" className="flex items-center gap-2 mb-1.5">
                          <MapPin className="h-4 w-4 text-primary" />
                          {currentLanguage === 'ar' ? 'المدينة / الدولة (اختياري)' : 'City / Country (optional)'}
                        </Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => updateField('city', e.target.value)}
                          placeholder={currentLanguage === 'ar' ? 'الرياض، السعودية' : 'Riyadh, Saudi Arabia'}
                        />
                      </div>

                      {/* Attendance Preference */}
                      <div>
                        <Label className="flex items-center gap-2 mb-1.5">
                          <Target className="h-4 w-4 text-primary" />
                          {currentLanguage === 'ar' ? 'طريقة الحضور المفضلة *' : 'Preferred Attendance *'}
                        </Label>
                        <Select
                          value={formData.attendance}
                          onValueChange={(value) => updateField('attendance', value)}
                        >
                          <SelectTrigger className={errors.attendance ? 'border-destructive' : ''}>
                            <SelectValue placeholder={currentLanguage === 'ar' ? 'اختر...' : 'Select...'} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="online">
                              {currentLanguage === 'ar' ? 'أونلاين' : 'Online'}
                            </SelectItem>
                            <SelectItem value="in-person">
                              {currentLanguage === 'ar' ? 'حضوري' : 'In-person'}
                            </SelectItem>
                            <SelectItem value="both">
                              {currentLanguage === 'ar' ? 'كلاهما مناسب' : 'Both work for me'}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.attendance && (
                          <p className="text-xs text-destructive mt-1">{errors.attendance}</p>
                        )}
                      </div>

                      {/* Honeypot field - hidden from users */}
                      <input
                        type="text"
                        name="website"
                        value={formData.website}
                        onChange={(e) => updateField('website', e.target.value)}
                        style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
                        tabIndex={-1}
                        autoComplete="off"
                      />

                      <Button
                        onClick={handleNextStep}
                        className="w-full mt-4 bg-primary hover:bg-primary/90"
                      >
                        {currentLanguage === 'ar' ? 'التالي' : 'Next'}
                        <ChevronLeft className="ltr:hidden h-4 w-4 mr-1" />
                        <ChevronRight className="rtl:hidden h-4 w-4 ml-1" />
                      </Button>
                    </motion.div>
                  ) : (
                    /* Step 2: Context & Qualification */
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      {/* Primary Goal */}
                      <div>
                        <Label className="flex items-center gap-2 mb-1.5">
                          <Target className="h-4 w-4 text-primary" />
                          {currentLanguage === 'ar' ? 'الهدف الأساسي' : 'Primary Goal'}
                        </Label>
                        <Select
                          value={formData.primaryGoal}
                          onValueChange={(value) => updateField('primaryGoal', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={currentLanguage === 'ar' ? 'اختر...' : 'Select...'} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="content">
                              {currentLanguage === 'ar' ? 'محتوى' : 'Content'}
                            </SelectItem>
                            <SelectItem value="study">
                              {currentLanguage === 'ar' ? 'دراسة' : 'Study'}
                            </SelectItem>
                            <SelectItem value="work">
                              {currentLanguage === 'ar' ? 'عمل' : 'Work'}
                            </SelectItem>
                            <SelectItem value="project">
                              {currentLanguage === 'ar' ? 'مشروع' : 'Project'}
                            </SelectItem>
                            <SelectItem value="other">
                              {currentLanguage === 'ar' ? 'أخرى' : 'Other'}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Current Level */}
                      <div>
                        <Label className="flex items-center gap-2 mb-1.5">
                          <BarChart3 className="h-4 w-4 text-primary" />
                          {currentLanguage === 'ar' ? 'المستوى الحالي' : 'Current Level'}
                        </Label>
                        <Select
                          value={formData.currentLevel}
                          onValueChange={(value) => updateField('currentLevel', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={currentLanguage === 'ar' ? 'اختر...' : 'Select...'} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">
                              {currentLanguage === 'ar' ? 'مبتدئ' : 'Beginner'}
                            </SelectItem>
                            <SelectItem value="intermediate">
                              {currentLanguage === 'ar' ? 'متوسط' : 'Intermediate'}
                            </SelectItem>
                            <SelectItem value="used-chatgpt">
                              {currentLanguage === 'ar' ? 'استخدمت ChatGPT سابقاً' : 'Used ChatGPT before'}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Optional Message */}
                      <div>
                        <Label htmlFor="message" className="flex items-center gap-2 mb-1.5">
                          <MessageSquare className="h-4 w-4 text-primary" />
                          {currentLanguage === 'ar' ? 'رسالة (اختياري)' : 'Message (optional)'}
                        </Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => updateField('message', e.target.value)}
                          placeholder={currentLanguage === 'ar' ? 'أي شيء تود إضافته...' : 'Anything you\'d like to add...'}
                          rows={3}
                          className="resize-none"
                        />
                      </div>

                      <div className="flex gap-3 mt-4">
                        <Button
                          onClick={handlePrevStep}
                          variant="outline"
                          className="flex-1"
                        >
                          <ChevronRight className="ltr:hidden h-4 w-4 ml-1" />
                          <ChevronLeft className="rtl:hidden h-4 w-4 mr-1" />
                          {currentLanguage === 'ar' ? 'السابق' : 'Back'}
                        </Button>
                        <Button
                          onClick={handleSubmit}
                          disabled={submitMutation.isPending}
                          className="flex-1 bg-primary hover:bg-primary/90"
                        >
                          {submitMutation.isPending
                            ? (currentLanguage === 'ar' ? 'جاري الإرسال...' : 'Submitting...')
                            : (currentLanguage === 'ar' ? 'إرسال الطلب' : 'Submit')}
                        </Button>
                      </div>

                      {/* Privacy reassurance */}
                      <p className="text-xs text-muted-foreground text-center mt-4">
                        🔒 {currentLanguage === 'ar' ? 'لن نشارك معلوماتك مع أي جهة.' : 'We will not share your information with anyone.'}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </GlassCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Use portal to render modal at document body level
  // This ensures fixed positioning works correctly regardless of parent transforms
  return createPortal(modalContent, document.body);
}
