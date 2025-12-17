-- Add comprehensive site_content records for all sections
-- This makes all hardcoded content database-driven

-- Hero Section - Promise Line and Reassurance
INSERT INTO public.site_content (section, content_key, content_ar, content_en) VALUES
('hero', 'promise_line_1', 'نتائج مُرضية من 1-3 محاولات', 'Satisfying results in 1-3 attempts'),
('hero', 'promise_line_2', 'رابط مشروع جاهز للمشاركة في اليوم الخامس', 'Shareable project link by Day 5'),
('hero', 'promise_tooltip', 'في معظم الحالات، يعتمد على تعقيد المهمة', 'In most cases, depends on task complexity'),
('hero', 'reassurance_line', 'مباشر خلال 5 أيام • بدون خبرة تقنية • دعم عبر واتساب أثناء فترة الدورة', 'Live over 5 days • No technical experience needed • WhatsApp support during the course'),
('hero', 'chip_1', 'تدريب خطوة بخطوة', 'Step-by-step training'),
('hero', 'chip_2', 'قوالب جاهزة للنسخ', 'Ready-to-copy templates'),
('hero', 'chip_3', 'مشروع ختامي + رابط للمشاركة', 'Final project + shareable link'),
('hero', 'limited_offer', 'عرض محدود', 'Limited Offer'),
('hero', 'main_title', 'استخدم الذكاء الاصطناعي استخدامًا صحيحًا… ووفر وقتك كل يوم', 'Use AI correctly... and save your time every day'),
('hero', 'main_subtitle', 'دورة تدريبية عملية لغير التقنيين: اكتب طلبات أوضح، حسّن النتائج بسرعة، تحقق من المعلومات، وطبّق كل ذلك في مشروع ختامي قابل للنشر.', 'A practical training course for non-technical people: write clearer prompts, improve results quickly, verify information, and apply all this in a publishable final project.'),
('hero', 'enroll_button', 'احجز مقعدك', 'Book Your Seat'),
('hero', 'download_button', 'تنزيل دليل الدورة (PDF)', 'Download Course Guide (PDF)')
ON CONFLICT (section, content_key) DO UPDATE SET
  content_ar = EXCLUDED.content_ar,
  content_en = EXCLUDED.content_en,
  updated_at = now();

-- Philosophy Section (How It Works)
INSERT INTO public.site_content (section, content_key, content_ar, content_en) VALUES
('philosophy', 'main_title', 'كيف تعمل الدورة', 'How the Course Works'),
('philosophy', 'learn_more_link', 'اعرف المزيد عن البرنامج', 'Learn more about the program'),
('philosophy', 'card_1_title', 'إطار CREAR', 'CREAR Framework'),
('philosophy', 'card_1_text', 'السياق + الدور + الأمثلة + شكل النتيجة + التحسين الواضح.', 'Context + Role + Examples + Answer format + Refinement.'),
('philosophy', 'card_2_title', 'تحسين سريع', 'Quick Refinement'),
('philosophy', 'card_2_text', 'قواعد تحسين دقيقة + قاعدة توقف (لا تكرر "اجعلها أفضل" بلا نهاية).', 'Precise refinement rules + stop rule (don''t repeat "make it better" endlessly).'),
('philosophy', 'card_3_title', 'اكتب ← تحقق ← ابنِ', 'Write → Verify → Build'),
('philosophy', 'card_3_text', 'صِغ وخطّط في ChatGPT، تحقق من المصادر في Gemini، ثم ابنِ وانشر في Lovable.', 'Draft and plan in ChatGPT, verify sources in Gemini, then build and publish in Lovable.')
ON CONFLICT (section, content_key) DO UPDATE SET
  content_ar = EXCLUDED.content_ar,
  content_en = EXCLUDED.content_en,
  updated_at = now();

-- CTA Section
INSERT INTO public.site_content (section, content_key, content_ar, content_en) VALUES
('cta', 'main_title', 'هل أنت مستعد لتطوير مهاراتك في الذكاء الاصطناعي؟', 'Are you ready to develop your AI skills?'),
('cta', 'main_subtitle', 'ستحصل على مسار تدريبي واضح وتمارين تطبيقية، مع مواد مساعدة ودعم أثناء فترة الدورة.', 'You will get a clear training path and practical exercises, with supporting materials and support during the course period.'),
('cta', 'badge', 'عرض محدود', 'Limited Time Offer'),
('cta', 'discount', 'خصم لفترة محدودة', 'Limited Time Discount'),
('cta', 'limited_seats', 'مقاعد محدودة لهذه الدفعة', 'Limited seats for this batch'),
('cta', 'current_price_label', 'السعر الحالي', 'Current Price'),
('cta', 'original_price_label', 'السعر الأصلي', 'Original Price'),
('cta', 'enroll_button', 'احجز مقعدك الآن', 'Book Your Seat Now'),
('cta', 'download_button', 'تنزيل المنهج الكامل (PDF)', 'Download Full Curriculum (PDF)'),
('cta', 'guarantee', 'يشمل: قوالب، ملخصات يومية، ودعم خلال فترة الدورة.', 'Includes: templates, daily summaries, and support during the course period.'),
('cta', 'pricing_note', 'لا يوجد دفع أونلاين. بعد حجز المقعد سنتواصل معك لتأكيد التسجيل وتفاصيل الدفع.', 'No online payment. After booking, we will contact you to confirm registration and payment details.'),
('cta', 'feature_1', 'قوالب جاهزة للنسخ واللصق (للعمل والدراسة)', 'Ready-to-copy templates (for work and study)'),
('cta', 'feature_2', 'ملخصات لكل يوم + ملفات الدورة', 'Daily summaries + course files'),
('cta', 'feature_3', 'دعم عبر واتساب خلال فترة الدورة', 'WhatsApp support during the course'),
('cta', 'feature_4', 'مجتمع للخريجين + تحديثات للمحتوى', 'Alumni community + content updates'),
('cta', 'feature_5', 'شهادة إتمام الدورة', 'Course completion certificate')
ON CONFLICT (section, content_key) DO UPDATE SET
  content_ar = EXCLUDED.content_ar,
  content_en = EXCLUDED.content_en,
  updated_at = now();

-- Target Audience Section
INSERT INTO public.site_content (section, content_key, content_ar, content_en) VALUES
('target_audience', 'outputs_title', 'ستخرج بمخرجات مثل:', 'You will leave with outputs like:'),
('target_audience', 'output_1', 'خطة محتوى كاملة لصناع المحتوى', 'Complete content plan for content creators'),
('target_audience', 'output_2', 'نظام داخلي: ملخصات + ادارة تنطيمية + منصة عمل', 'Internal system: summaries + organizational management + work platform'),
('target_audience', 'output_3', 'مخرجات للبزنس: تقارير تنفيذية، مواعيد منظمة، خطط عمل', 'Business outputs: executive reports, organized schedules, work plans'),
('target_audience', 'output_4', 'مشروع مكتمل / بورتفوليو / موقع مكتمل', 'Complete project / portfolio / complete website'),
('target_audience', 'clarifying_note', 'المشروع النهائي دليل تطبيق — لكن المهارة الأساسية هي نظام عمل قابل للتكرار.', 'The final project is proof of application — but the core skill is a repeatable workflow.')
ON CONFLICT (section, content_key) DO UPDATE SET
  content_ar = EXCLUDED.content_ar,
  content_en = EXCLUDED.content_en,
  updated_at = now();

-- Day 5 Outcome Section
INSERT INTO public.site_content (section, content_key, content_ar, content_en) VALUES
('day5_outcome', 'title', 'بنهاية اليوم الخامس، ستحصل على:', 'By the end of Day 5, you will have:'),
('day5_outcome', 'bullet_1', 'منتج Minimum Lovable Product يعمل + رابط قابل للمشاركة', 'Working Minimum Lovable Product + shareable link'),
('day5_outcome', 'bullet_2', 'مكتبة قوالب طلبات قابلة لإعادة الاستخدام لمهامك الحقيقية', 'Reusable prompt template library for your real tasks'),
('day5_outcome', 'bullet_3', 'سير عمل قابل للتكرار: اكتب ← تحقق ← ابنِ', 'Repeatable workflow: Write → Verify → Build')
ON CONFLICT (section, content_key) DO UPDATE SET
  content_ar = EXCLUDED.content_ar,
  content_en = EXCLUDED.content_en,
  updated_at = now();

-- Testimonials Section Header
INSERT INTO public.site_content (section, content_key, content_ar, content_en) VALUES
('testimonials', 'section_title', 'آراء المشاركين', 'Participant Testimonials'),
('testimonials', 'section_subtitle', 'تجارب حقيقية من مشاركين سابقين', 'Real experiences from previous participants'),
('testimonials', 'section_badge', 'قصص نجاح', 'Success Stories')
ON CONFLICT (section, content_key) DO UPDATE SET
  content_ar = EXCLUDED.content_ar,
  content_en = EXCLUDED.content_en,
  updated_at = now();

-- Footer Section
INSERT INTO public.site_content (section, content_key, content_ar, content_en) VALUES
('footer', 'location_online', 'متاح عالمياً عبر الإنترنت', 'Available Online Worldwide'),
('footer', 'response_time', 'نرد عادة خلال 24 ساعة', 'We usually respond within 24 hours'),
('footer', 'materials_description', 'المواد المرافقة: قوالب + ملخصات + ملفات', 'Accompanying materials: templates + summaries + files'),
('footer', 'support_description', 'الدعم: واتساب خلال فترة الدورة', 'Support: WhatsApp during the course period'),
('footer', 'assets_title', 'الأصول', 'Assets'),
('footer', 'asset_1', 'قوالب جاهزة', 'Ready templates'),
('footer', 'asset_2', 'ملفات أمثلة + قوائم فحص', 'Example files + checklists'),
('footer', 'asset_3', 'مكتبة طلبات للنسخ واللصق', 'Prompt library for copy and paste'),
('footer', 'quick_links_title', 'روابط سريعة', 'Quick Links'),
('footer', 'contact_title', 'تواصل معنا', 'Contact Us'),
('footer', 'copyright', '© Qobouli - جميع الحقوق محفوظة', '© Qobouli - All Rights Reserved'),
('footer', 'privacy_link', 'سياسة الخصوصية', 'Privacy Policy'),
('footer', 'terms_link', 'الشروط والأحكام', 'Terms and Conditions'),
('footer', 'contact_link', 'تواصل', 'Contact')
ON CONFLICT (section, content_key) DO UPDATE SET
  content_ar = EXCLUDED.content_ar,
  content_en = EXCLUDED.content_en,
  updated_at = now();

-- Benefits Section Header
INSERT INTO public.site_content (section, content_key, content_ar, content_en) VALUES
('benefits', 'section_title', 'هل أنت مستعد لتطوير مهاراتك في الذكاء الاصطناعي؟', 'Are you ready to develop your AI skills?'),
('benefits', 'section_subtitle', 'ستحصل على مسار تدريبي واضح وتمارين تطبيقية، مع مواد مساعدة ودعم أثناء فترة الدورة.', 'You will get a clear training path and practical exercises, with supporting materials and support during the course period.')
ON CONFLICT (section, content_key) DO UPDATE SET
  content_ar = EXCLUDED.content_ar,
  content_en = EXCLUDED.content_en,
  updated_at = now();

-- FAQ Section Header
INSERT INTO public.site_content (section, content_key, content_ar, content_en) VALUES
('faq', 'section_title', 'الأسئلة الشائعة', 'Frequently Asked Questions'),
('faq', 'section_subtitle', 'إجابات على الأسئلة الأكثر شيوعاً حول دورة الذكاء الاصطناعي', 'Answers to the most common questions about the AI course'),
('faq', 'more_questions', 'هل لديك أسئلة أخرى؟', 'Do you have more questions?'),
('faq', 'contact_us', 'تواصل معنا', 'Contact Us')
ON CONFLICT (section, content_key) DO UPDATE SET
  content_ar = EXCLUDED.content_ar,
  content_en = EXCLUDED.content_en,
  updated_at = now();

-- General/Navigation
INSERT INTO public.site_content (section, content_key, content_ar, content_en) VALUES
('general', 'brand_name', 'دورة الذكاء الاصطناعي المكثفة', 'Intensive AI Course'),
('general', 'nav_home', 'الرئيسية', 'Home'),
('general', 'nav_curriculum', 'المنهج', 'Curriculum'),
('general', 'nav_target_audience', 'لمن هذه الدورة؟', 'Who is this for?'),
('general', 'nav_benefits', 'النتائج', 'Benefits'),
('general', 'nav_faq', 'الأسئلة الشائعة', 'FAQ'),
('general', 'nav_contact', 'تواصل', 'Contact'),
('general', 'nav_testimonials', 'آراء المشاركين', 'Testimonials'),
('general', 'book_seat', 'احجز مقعدك', 'Book Your Seat')
ON CONFLICT (section, content_key) DO UPDATE SET
  content_ar = EXCLUDED.content_ar,
  content_en = EXCLUDED.content_en,
  updated_at = now();
