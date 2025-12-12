-- Course Settings table for dynamic course configuration
CREATE TABLE public.course_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key text NOT NULL UNIQUE,
  setting_value text NOT NULL,
  setting_type text NOT NULL DEFAULT 'text',
  description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.course_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can read course settings
CREATE POLICY "Anyone can view course settings"
ON public.course_settings FOR SELECT
USING (true);

-- Only admins can modify
CREATE POLICY "Admins can insert course settings"
ON public.course_settings FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update course settings"
ON public.course_settings FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete course settings"
ON public.course_settings FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Course Days table for 5-day program content
CREATE TABLE public.course_days (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  day_number integer NOT NULL UNIQUE,
  title_ar text NOT NULL,
  title_en text NOT NULL,
  description_ar text NOT NULL,
  description_en text NOT NULL,
  badge_ar text,
  badge_en text,
  duration text DEFAULT '4 ساعات',
  topics_ar jsonb NOT NULL DEFAULT '[]',
  topics_en jsonb NOT NULL DEFAULT '[]',
  techniques_ar jsonb NOT NULL DEFAULT '[]',
  techniques_en jsonb NOT NULL DEFAULT '[]',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.course_days ENABLE ROW LEVEL SECURITY;

-- Anyone can read
CREATE POLICY "Anyone can view course days"
ON public.course_days FOR SELECT
USING (true);

-- Only admins can modify
CREATE POLICY "Admins can manage course days"
ON public.course_days FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Insert the 5 days content
INSERT INTO public.course_days (day_number, title_ar, title_en, description_ar, description_en, badge_ar, badge_en, duration, topics_ar, topics_en, techniques_ar, techniques_en) VALUES
(1, 
  'أساسيات كتابة الطلبات',
  'Prompt Writing Fundamentals',
  'كيف تعمل أدوات الذكاء الاصطناعي بطريقة مبسطة',
  'How AI tools work in a simplified way',
  'الأساسيات',
  'Fundamentals',
  '4 ساعات',
  '["كيف تعمل أدوات الذكاء الاصطناعي بطريقة مبسطة", "تحويل الهدف إلى طلب واضح بدل التجربة العشوائية", "عناصر الطلب الاحترافي: الهدف، المعلومات، القيود، شكل النتيجة، مثال", "كيفية جعل الإجابة \"مرتّبة\" وليست نصًا طويلًا", "أخطاء شائعة تؤدي لنتائج عامة"]',
  '["How AI tools work in a simplified way", "Transform goals into clear requests instead of random trial", "Professional prompt elements: goal, information, constraints, output format, example", "How to make responses \"organized\" instead of long text", "Common mistakes that lead to generic results"]',
  '["نموذج \"ملخص المهمة\" قبل كتابة الطلب", "قالب طلب جاهز (بأقسام واضحة)", "تحديد شكل النتيجة (قائمة/جدول/خطوات)", "إضافة قيود قابلة للقياس (طول، أسلوب، عدد النقاط)", "اختبار سريع للنتيجة وتحسينها مرة واحدة"]',
  '["\"Task summary\" template before writing the prompt", "Ready-to-use prompt template (with clear sections)", "Specifying output format (list/table/steps)", "Adding measurable constraints (length, style, number of points)", "Quick result testing and one-time improvement"]'
),
(2,
  'تحسين النتائج بثبات',
  'Consistent Result Improvement',
  'كيف تطلب خيارات ومقارنات وخطط بشكل منظم',
  'How to request options, comparisons, and plans systematically',
  'التحسين',
  'Optimization',
  '4 ساعات',
  '["كيف تطلب خيارات ومقارنات وخطط بشكل منظم", "كيف تضبط طول الإجابة ونبرتها ومستواها", "كيف تسأل بأسلوب يجعل الرد أدق وأقل حشوًا", "كيف تبني قوالب ثابتة لمهامك المتكررة", "بوابات جودة بسيطة قبل اعتماد النتيجة"]',
  '["How to request options, comparisons, and plans systematically", "How to control response length, tone, and level", "How to ask in a way that makes responses more accurate with less filler", "How to build fixed templates for recurring tasks", "Simple quality gates before approving results"]',
  '["أمثلة قليلة لتوجيه النمط (Few-shot)", "\"فكّر خطوة بخطوة\" عند الحاجة لنتيجة أدق", "قالب مراجعة سريع: ما الذي نقص؟ ما الذي يجب تقييده؟", "إعادة صياغة الطلب بطريقة منظمة", "إنشاء نسختين من نفس الطلب (سريعة/مفصلة)"]',
  '["Few-shot examples for pattern guidance", "\"Think step by step\" when more accurate results are needed", "Quick review template: What''s missing? What needs constraints?", "Systematic prompt reformulation", "Creating two versions of the same prompt (quick/detailed)"]'
),
(3,
  'البحث الموثوق والتلخيص الذكي',
  'Reliable Research & Smart Summarization',
  'كيف تكتب طلب بحث يعطيك خلاصة مفيدة',
  'How to write research requests that give useful summaries',
  'البحث',
  'Research',
  '4 ساعات',
  '["كيف تكتب طلب بحث يعطيك خلاصة مفيدة", "كيف تجمع المعلومات دون \"كلام عام\"", "كيف تطلب مصادر ونقاط واضحة", "استخراج نقاط عمل وتوصيات من أي مادة", "مقارنة متى تستخدم ChatGPT ومتى تستخدم أدوات البحث"]',
  '["How to write research requests that give useful summaries", "How to gather information without \"generic filler\"", "How to request sources and clear points", "Extracting action items and recommendations from any material", "Comparing when to use ChatGPT vs. research tools"]',
  '["قالب \"طلب بحث\" جاهز", "تلخيص بمخرجات منظمة (ملخص + نقاط عمل + مخاطر)", "أسئلة متابعة للحصول على تفاصيل مهمة", "إعداد تقرير مختصر قابل للإرسال", "توثيق النتائج في ملف واحد للرجوع إليه"]',
  '["Ready-to-use \"research request\" template", "Summarization with structured outputs (summary + action items + risks)", "Follow-up questions for important details", "Preparing a concise report ready to send", "Documenting results in one file for reference"]'
),
(4,
  'إنتاج عملي للعمل: محتوى ورسائل',
  'Practical Production: Content & Messages',
  'خطة محتوى أسبوعية/شهرية بطريقة واضحة',
  'Weekly/monthly content plan in a clear way',
  'المحتوى',
  'Content',
  '4 ساعات',
  '["خطة محتوى أسبوعية/شهرية بطريقة واضحة", "كتابة نصوص جاهزة للنشر (منشورات، فيديوهات قصيرة)", "رسائل تسويق ومتابعة عملاء (واتساب/إيميل)", "كتابة صفحة تعريف/هبوط بشكل مرتب", "(اختياري) أساسيات توليد صور داعمة للمحتوى"]',
  '["Weekly/monthly content plan in a clear way", "Writing publish-ready text (posts, short videos)", "Marketing messages and client follow-ups (WhatsApp/Email)", "Writing a landing/about page in an organized way", "(Optional) Basics of generating supporting images for content"]',
  '["قوالب جاهزة للمحتوى (فكرة + افتتاحية + نقاط + دعوة للإجراء)", "قوالب رسائل العملاء (استفسار/متابعة/عرض)", "قالب صفحة هبوط (عنوان + فوائد + إثبات + دعوة)", "(اختياري) قالب طلب صور بأسلوب بسيط", "تنظيم \"مكتبة قوالب\" قابلة لإعادة الاستخدام"]',
  '["Ready content templates (idea + opening + points + call to action)", "Client message templates (inquiry/follow-up/offer)", "Landing page template (headline + benefits + proof + call)", "(Optional) Simple image request template", "Organizing a reusable \"template library\""]'
),
(5,
  'تصحيح النتائج + المشروع النهائي',
  'Result Correction + Final Project',
  'كيف تصلّح أي نتيجة لا تعجبك خلال دقائق',
  'How to fix any unsatisfactory result in minutes',
  'المشروع',
  'Project',
  '4 ساعات',
  '["كيف تصلّح أي نتيجة لا تعجبك خلال دقائق", "تقييم النتيجة بمعايير واضحة بدل الانطباع", "قواعد الخصوصية وما الذي لا يجب إدخاله للأدوات", "بناء سير عمل بسيط: من طلب → نتيجة → نسخة جاهزة", "مشروع ختامي يثبت المهارة"]',
  '["How to fix any unsatisfactory result in minutes", "Evaluating results with clear criteria instead of impressions", "Privacy rules and what not to input into tools", "Building a simple workflow: from prompt → result → final version", "Final project that proves the skill"]',
  '["قائمة فحص للتصحيح السريع (تشخيص → تعديل → اختبار)", "نموذج تقييم بسيط (وضوح، ترتيب، فائدة، دقة)", "\"حزمة قوالب\" نهائية حسب مجال المتدرب", "توثيق القوالب للاستخدام اليومي", "خطة استمرار بعد الدورة (كيف تحافظ على المستوى)"]',
  '["Quick fix checklist (diagnose → modify → test)", "Simple evaluation model (clarity, organization, usefulness, accuracy)", "Final \"template package\" based on trainee''s field", "Documenting templates for daily use", "Post-course continuation plan (how to maintain the level)"]'
);

-- Add trigger for updated_at
CREATE TRIGGER update_course_settings_updated_at
BEFORE UPDATE ON public.course_settings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_course_days_updated_at
BEFORE UPDATE ON public.course_days
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();