-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  role_ar TEXT NOT NULL,
  role_en TEXT NOT NULL,
  content_ar TEXT NOT NULL,
  content_en TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create faqs table
CREATE TABLE public.faqs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question_ar TEXT NOT NULL,
  question_en TEXT NOT NULL,
  answer_ar TEXT NOT NULL,
  answer_en TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create benefits table
CREATE TABLE public.benefits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title_ar TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  icon_name TEXT NOT NULL DEFAULT 'Star',
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create site_content table for dynamic text content
CREATE TABLE public.site_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT NOT NULL,
  content_key TEXT NOT NULL,
  content_ar TEXT NOT NULL,
  content_en TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(section, content_key)
);

-- Create target_audience_items table
CREATE TABLE public.target_audience_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  content_ar TEXT NOT NULL,
  content_en TEXT NOT NULL,
  icon_name TEXT NOT NULL DEFAULT 'CheckCircle',
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.benefits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.target_audience_items ENABLE ROW LEVEL SECURITY;

-- RLS policies for testimonials
CREATE POLICY "Anyone can view active testimonials" ON public.testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage testimonials" ON public.testimonials FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS policies for faqs
CREATE POLICY "Anyone can view active faqs" ON public.faqs FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage faqs" ON public.faqs FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS policies for benefits
CREATE POLICY "Anyone can view active benefits" ON public.benefits FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage benefits" ON public.benefits FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS policies for site_content
CREATE POLICY "Anyone can view site content" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "Admins can manage site content" ON public.site_content FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS policies for target_audience_items
CREATE POLICY "Anyone can view active target audience items" ON public.target_audience_items FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage target audience items" ON public.target_audience_items FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Create updated_at triggers
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON public.faqs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_benefits_updated_at BEFORE UPDATE ON public.benefits FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_site_content_updated_at BEFORE UPDATE ON public.site_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_target_audience_items_updated_at BEFORE UPDATE ON public.target_audience_items FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert testimonials data
INSERT INTO public.testimonials (name_ar, name_en, role_ar, role_en, content_ar, content_en, rating, display_order) VALUES
('رائد الأعمال', 'Entrepreneur', 'صاحب مشروع ناشئ', 'Startup Founder', 'الدورة غيّرت طريقة تفكيري في استخدام أدوات الذكاء الاصطناعي. أصبحت أنجز في ساعة ما كان يأخذ مني يوماً كاملاً.', 'This course changed my approach to AI tools. I now accomplish in an hour what used to take me a whole day.', 5, 1),
('الباحث الأكاديمي', 'Academic Researcher', 'أستاذ جامعي', 'University Professor', 'تعلمت كيف أستخدم الذكاء الاصطناعي في البحث العلمي بطريقة منهجية وموثوقة. المحتوى عملي ومباشر.', 'I learned how to use AI in scientific research methodically and reliably. The content is practical and direct.', 5, 2),
('مدير التسويق', 'Marketing Manager', 'شركة تقنية', 'Tech Company', 'القوالب الجاهزة للمحتوى وفّرت علي ساعات من العمل. الآن فريقي بالكامل يستخدم نفس المنهجية.', 'The ready-made content templates saved me hours of work. Now my entire team uses the same methodology.', 5, 3),
('المطور المحترف', 'Professional Developer', 'مهندس برمجيات', 'Software Engineer', 'حتى كمبرمج، اكتشفت تقنيات جديدة في كتابة الطلبات لم أكن أعرفها. الدورة مفيدة لجميع المستويات.', 'Even as a programmer, I discovered new prompting techniques I did not know. The course is useful for all levels.', 5, 4);

-- Insert FAQs data
INSERT INTO public.faqs (question_ar, question_en, answer_ar, answer_en, display_order) VALUES
('ما هي المتطلبات السابقة للدورة؟', 'What are the prerequisites for the course?', 'لا توجد متطلبات سابقة. الدورة مصممة للمبتدئين والمحترفين على حد سواء. كل ما تحتاجه هو جهاز كمبيوتر واتصال بالإنترنت.', 'There are no prerequisites. The course is designed for both beginners and professionals. All you need is a computer and an internet connection.', 1),
('هل الدورة مناسبة للمبتدئين؟', 'Is the course suitable for beginners?', 'نعم، الدورة مصممة لتبدأ من الأساسيات وتتدرج حتى المستويات المتقدمة. سواء كنت مبتدئاً أو لديك خبرة، ستجد قيمة في المحتوى.', 'Yes, the course is designed to start from basics and progress to advanced levels. Whether you are a beginner or experienced, you will find value in the content.', 2),
('ما هي مدة الوصول للمحتوى؟', 'How long do I have access to the content?', 'ستحصل على وصول دائم لجميع مواد الدورة، بما في ذلك أي تحديثات مستقبلية. يمكنك العودة للمراجعة في أي وقت.', 'You will get lifetime access to all course materials, including any future updates. You can return to review at any time.', 3),
('هل يوجد دعم بعد الدورة؟', 'Is there support after the course?', 'نعم، نوفر مجتمع خاص للمتدربين للتواصل وطرح الأسئلة، بالإضافة إلى جلسات متابعة دورية.', 'Yes, we provide a private community for trainees to communicate and ask questions, in addition to periodic follow-up sessions.', 4),
('ما هي طرق الدفع المتاحة؟', 'What payment methods are available?', 'نقبل التحويل البنكي، البطاقات الائتمانية، وخدمات الدفع الإلكتروني المحلية. تواصل معنا لمزيد من التفاصيل.', 'We accept bank transfer, credit cards, and local electronic payment services. Contact us for more details.', 5),
('هل يمكنني الحصول على شهادة؟', 'Can I get a certificate?', 'نعم، عند إتمام الدورة بنجاح ستحصل على شهادة إتمام معتمدة يمكنك إضافتها لسيرتك الذاتية.', 'Yes, upon successful completion of the course, you will receive an accredited completion certificate that you can add to your resume.', 6);

-- Insert benefits data
INSERT INTO public.benefits (title_ar, title_en, description_ar, description_en, icon_name, display_order) VALUES
('توفير الوقت', 'Save Time', 'أنجز في ساعات ما كان يستغرق أياماً باستخدام تقنيات الطلبات المتقدمة', 'Accomplish in hours what used to take days using advanced prompting techniques', 'Clock', 1),
('نتائج احترافية', 'Professional Results', 'احصل على مخرجات عالية الجودة تنافس عمل المحترفين', 'Get high-quality outputs that compete with professional work', 'Award', 2),
('قوالب جاهزة', 'Ready Templates', 'مكتبة قوالب شاملة لجميع احتياجاتك اليومية', 'Comprehensive template library for all your daily needs', 'FileText', 3),
('تطبيق عملي', 'Practical Application', 'تمارين ومشاريع حقيقية تطبق ما تعلمته فوراً', 'Exercises and real projects to apply what you learned immediately', 'Target', 4),
('دعم مستمر', 'Continuous Support', 'مجتمع نشط ودعم فني متواصل بعد الدورة', 'Active community and continuous technical support after the course', 'Users', 5),
('شهادة معتمدة', 'Certified Certificate', 'احصل على شهادة إتمام تثبت مهاراتك الجديدة', 'Get a completion certificate that proves your new skills', 'GraduationCap', 6);

-- Insert target audience items
INSERT INTO public.target_audience_items (content_ar, content_en, icon_name, display_order) VALUES
('رواد الأعمال وأصحاب المشاريع الناشئة', 'Entrepreneurs and startup owners', 'Briefcase', 1),
('المسوقون ومنشئو المحتوى الرقمي', 'Marketers and digital content creators', 'Megaphone', 2),
('الباحثون والأكاديميون', 'Researchers and academics', 'GraduationCap', 3),
('المطورون ومهندسو البرمجيات', 'Developers and software engineers', 'Code', 4),
('مديرو المشاريع والفرق', 'Project and team managers', 'Users', 5),
('أي شخص يريد زيادة إنتاجيته', 'Anyone who wants to increase their productivity', 'Zap', 6);

-- Insert site content
INSERT INTO public.site_content (section, content_key, content_ar, content_en) VALUES
('hero', 'title', 'أتقن فن التواصل مع الذكاء الاصطناعي', 'Master the Art of AI Communication'),
('hero', 'subtitle', 'دورة عملية مكثفة لمدة 5 أيام تحولك من مستخدم عادي إلى خبير في كتابة الطلبات الاحترافية', 'An intensive 5-day practical course that transforms you from a regular user to an expert in writing professional prompts'),
('hero', 'cta_primary', 'سجّل الآن', 'Register Now'),
('hero', 'cta_secondary', 'تعرف على المزيد', 'Learn More'),
('philosophy', 'title', 'فلسفة الدورة', 'Course Philosophy'),
('philosophy', 'subtitle', 'نؤمن أن إتقان الذكاء الاصطناعي يبدأ من فهم كيفية التواصل معه بشكل فعال', 'We believe that mastering AI starts with understanding how to communicate with it effectively'),
('philosophy', 'content', 'هذه الدورة ليست مجرد شرح نظري، بل رحلة عملية تأخذك من الصفر إلى الاحتراف في كتابة الطلبات', 'This course is not just theoretical explanation, but a practical journey that takes you from zero to professional in prompt writing'),
('cta', 'title', 'ابدأ رحلتك الآن', 'Start Your Journey Now'),
('cta', 'subtitle', 'انضم إلى مئات المتدربين الذين غيّروا طريقة عملهم مع الذكاء الاصطناعي', 'Join hundreds of trainees who have changed the way they work with AI'),
('cta', 'button_text', 'سجّل في الدورة', 'Enroll in the Course'),
('target_audience', 'title', 'لمن هذه الدورة؟', 'Who is this course for?'),
('target_audience', 'subtitle', 'صُممت هذه الدورة لكل من يريد الاستفادة القصوى من أدوات الذكاء الاصطناعي', 'This course is designed for everyone who wants to get the most out of AI tools'),
('target_audience', 'note', 'لا تحتاج أي خبرة تقنية سابقة للانضمام', 'No prior technical experience needed to join');

-- Insert course settings
INSERT INTO public.course_settings (setting_key, setting_value, setting_type, description) VALUES
('course_start_date', '2025-01-15', 'date', 'تاريخ بدء الدورة'),
('course_duration_days', '5', 'number', 'مدة الدورة بالأيام'),
('hours_per_day', '4', 'number', 'عدد الساعات في اليوم'),
('course_location', 'أونلاين', 'text', 'مكان الدورة'),
('current_price', '299', 'number', 'السعر الحالي'),
('original_price', '499', 'number', 'السعر الأصلي'),
('currency', 'USD', 'text', 'العملة'),
('available_seats', '50', 'number', 'المقاعد المتاحة'),
('show_seat_counter', 'true', 'boolean', 'عرض عداد المقاعد'),
('whatsapp_number', '+966500000000', 'text', 'رقم الواتساب'),
('contact_email', 'info@course.com', 'text', 'البريد الإلكتروني للتواصل'),
('registration_open', 'true', 'boolean', 'التسجيل مفتوح');