-- Create course_sessions table for tracking cohorts
CREATE TABLE public.course_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_name TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  current_day INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Create instructor_checklist_items table for pre-seeded checklist items
CREATE TABLE public.instructor_checklist_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  day_number INTEGER NOT NULL,
  phase TEXT NOT NULL CHECK (phase IN ('pre', 'during', 'after')),
  item_key TEXT NOT NULL,
  content_en TEXT NOT NULL,
  content_ar TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create instructor_checklist_progress table for tracking completion
CREATE TABLE public.instructor_checklist_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.course_sessions(id) ON DELETE CASCADE,
  checklist_item_id UUID NOT NULL REFERENCES public.instructor_checklist_items(id) ON DELETE CASCADE,
  is_completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  completed_by UUID REFERENCES auth.users(id),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(session_id, checklist_item_id)
);

-- Create instructor_session_notes table for instructor observations
CREATE TABLE public.instructor_session_notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.course_sessions(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL,
  common_mistakes TEXT,
  observations TEXT,
  learner_highlights TEXT,
  improvements_for_next_time TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(session_id, day_number)
);

-- Enable RLS on all tables
ALTER TABLE public.course_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.instructor_checklist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.instructor_checklist_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.instructor_session_notes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for course_sessions
CREATE POLICY "Admins can manage course sessions" ON public.course_sessions
  FOR ALL USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Authenticated users can view active sessions" ON public.course_sessions
  FOR SELECT USING (auth.uid() IS NOT NULL AND is_active = true);

-- RLS Policies for instructor_checklist_items
CREATE POLICY "Anyone can view active checklist items" ON public.instructor_checklist_items
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage checklist items" ON public.instructor_checklist_items
  FOR ALL USING (public.has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for instructor_checklist_progress
CREATE POLICY "Admins can manage checklist progress" ON public.instructor_checklist_progress
  FOR ALL USING (public.has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for instructor_session_notes
CREATE POLICY "Admins can manage session notes" ON public.instructor_session_notes
  FOR ALL USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Create updated_at triggers
CREATE TRIGGER update_course_sessions_updated_at
  BEFORE UPDATE ON public.course_sessions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_instructor_checklist_items_updated_at
  BEFORE UPDATE ON public.instructor_checklist_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_instructor_checklist_progress_updated_at
  BEFORE UPDATE ON public.instructor_checklist_progress
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_instructor_session_notes_updated_at
  BEFORE UPDATE ON public.instructor_session_notes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Pre-seed checklist items for Session 0 (Preparation Day)
INSERT INTO public.instructor_checklist_items (day_number, phase, item_key, content_en, content_ar, display_order) VALUES
-- Day 0 - Pre-course preparation
(0, 'pre', 'review_materials', 'Review all course materials and slides', 'مراجعة جميع مواد الدورة والشرائح', 1),
(0, 'pre', 'test_links', 'Test all demo links and tools', 'اختبار جميع روابط العروض والأدوات', 2),
(0, 'pre', 'setup_whatsapp', 'Set up WhatsApp group for participants', 'إعداد مجموعة واتساب للمشاركين', 3),
(0, 'pre', 'send_welcome', 'Send welcome message with joining instructions', 'إرسال رسالة ترحيب مع تعليمات الانضمام', 4),
(0, 'pre', 'prepare_environment', 'Prepare demonstration environment', 'تجهيز بيئة العرض التوضيحي', 5),

-- Day 1
(1, 'pre', 'check_attendance', 'Check participant attendance list', 'التحقق من قائمة حضور المشاركين', 1),
(1, 'pre', 'prepare_demos', 'Prepare Day 1 demonstrations', 'تجهيز عروض اليوم الأول', 2),
(1, 'during', 'intro_session', 'Conduct introduction session', 'إجراء جلسة التعريف', 1),
(1, 'during', 'explain_basics', 'Explain AI prompt basics', 'شرح أساسيات البرومبت', 2),
(1, 'during', 'first_exercise', 'Guide first hands-on exercise', 'توجيه التمرين العملي الأول', 3),
(1, 'after', 'collect_feedback', 'Collect participant questions', 'جمع أسئلة المشاركين', 1),
(1, 'after', 'note_challenges', 'Note common challenges observed', 'تدوين التحديات الشائعة الملاحظة', 2),

-- Day 2
(2, 'pre', 'review_day1', 'Review Day 1 feedback and questions', 'مراجعة ملاحظات وأسئلة اليوم الأول', 1),
(2, 'pre', 'prepare_advanced', 'Prepare advanced prompt examples', 'تجهيز أمثلة البرومبت المتقدمة', 2),
(2, 'during', 'recap_day1', 'Quick recap of Day 1 concepts', 'مراجعة سريعة لمفاهيم اليوم الأول', 1),
(2, 'during', 'teach_techniques', 'Teach advanced prompting techniques', 'تعليم تقنيات البرومبت المتقدمة', 2),
(2, 'during', 'practice_session', 'Facilitate practice session', 'تسهيل جلسة التدريب', 3),
(2, 'after', 'review_submissions', 'Review participant submissions', 'مراجعة تقديمات المشاركين', 1),

-- Day 3
(3, 'pre', 'prepare_tools', 'Prepare specialized AI tools demos', 'تجهيز عروض أدوات الذكاء الاصطناعي المتخصصة', 1),
(3, 'during', 'tool_overview', 'Present tool overview and comparisons', 'عرض نظرة عامة على الأدوات والمقارنات', 1),
(3, 'during', 'hands_on_tools', 'Guide hands-on tool exploration', 'توجيه استكشاف الأدوات العملي', 2),
(3, 'after', 'answer_questions', 'Address tool-specific questions', 'الإجابة على الأسئلة المتعلقة بالأدوات', 1),

-- Day 4
(4, 'pre', 'project_setup', 'Set up project templates', 'إعداد قوالب المشاريع', 1),
(4, 'during', 'explain_project', 'Explain final project requirements', 'شرح متطلبات المشروع النهائي', 1),
(4, 'during', 'start_projects', 'Help participants start their projects', 'مساعدة المشاركين في بدء مشاريعهم', 2),
(4, 'during', 'individual_support', 'Provide individual support', 'تقديم الدعم الفردي', 3),
(4, 'after', 'check_progress', 'Check project progress', 'التحقق من تقدم المشاريع', 1),

-- Day 5
(5, 'pre', 'prepare_presentation', 'Prepare presentation guidelines', 'تجهيز إرشادات العرض التقديمي', 1),
(5, 'during', 'final_touches', 'Help with final project touches', 'المساعدة في اللمسات الأخيرة للمشروع', 1),
(5, 'during', 'presentations', 'Facilitate project presentations', 'تسهيل عروض المشاريع', 2),
(5, 'during', 'provide_feedback', 'Provide constructive feedback', 'تقديم ملاحظات بناءة', 3),
(5, 'during', 'certificates', 'Distribute certificates', 'توزيع الشهادات', 4),
(5, 'after', 'final_feedback', 'Collect final course feedback', 'جمع الملاحظات النهائية للدورة', 1),
(5, 'after', 'document_learnings', 'Document key learnings for next cohort', 'توثيق الدروس المستفادة للدفعة القادمة', 2);