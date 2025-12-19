-- Migration: Instructor Progress Dashboard
-- This adds tables for tracking instructor progress through the 5-day course

-- Table for tracking course sessions (cohorts)
CREATE TABLE IF NOT EXISTS course_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_name VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    current_day INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id)
);

-- Table for instructor checklist items per day
CREATE TABLE IF NOT EXISTS instructor_checklist_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    day_number INTEGER NOT NULL CHECK (day_number >= 0 AND day_number <= 5),
    phase VARCHAR(50) NOT NULL CHECK (phase IN ('pre', 'during', 'after')),
    item_key VARCHAR(100) NOT NULL,
    content_en TEXT NOT NULL,
    content_ar TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(day_number, item_key)
);

-- Table for tracking checklist completion per session
CREATE TABLE IF NOT EXISTS instructor_checklist_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id UUID REFERENCES course_sessions(id) ON DELETE CASCADE,
    checklist_item_id UUID REFERENCES instructor_checklist_items(id) ON DELETE CASCADE,
    is_completed BOOLEAN DEFAULT false,
    completed_at TIMESTAMPTZ,
    completed_by UUID REFERENCES auth.users(id),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(session_id, checklist_item_id)
);

-- Table for instructor notes per session/day
CREATE TABLE IF NOT EXISTS instructor_session_notes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id UUID REFERENCES course_sessions(id) ON DELETE CASCADE,
    day_number INTEGER NOT NULL CHECK (day_number >= 0 AND day_number <= 5),
    common_mistakes TEXT,
    observations TEXT,
    learner_highlights TEXT,
    improvements_for_next_time TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(session_id, day_number)
);

-- Enable RLS
ALTER TABLE course_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE instructor_checklist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE instructor_checklist_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE instructor_session_notes ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for admins
CREATE POLICY "Admins can manage course_sessions" ON course_sessions
    FOR ALL USING (is_admin(auth.uid()));

CREATE POLICY "Admins can manage instructor_checklist_items" ON instructor_checklist_items
    FOR ALL USING (is_admin(auth.uid()));

CREATE POLICY "Admins can manage instructor_checklist_progress" ON instructor_checklist_progress
    FOR ALL USING (is_admin(auth.uid()));

CREATE POLICY "Admins can manage instructor_session_notes" ON instructor_session_notes
    FOR ALL USING (is_admin(auth.uid()));

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_course_sessions_active ON course_sessions(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_checklist_items_day ON instructor_checklist_items(day_number);
CREATE INDEX IF NOT EXISTS idx_checklist_progress_session ON instructor_checklist_progress(session_id);
CREATE INDEX IF NOT EXISTS idx_session_notes_session ON instructor_session_notes(session_id);

-- Seed initial checklist items for all 5 days

-- Day 0 (Session 0 - Free Intro) Pre-session checklist
INSERT INTO instructor_checklist_items (day_number, phase, item_key, content_en, content_ar, display_order) VALUES
(0, 'pre', 'session0_demo_ready', 'Demo prompts tested (vague + CREAR transformation)', 'تجربة العروض التوضيحية (الصيغة الغامضة + تحويل CREAR)', 1),
(0, 'pre', 'session0_registration_form', 'Registration form link ready to share', 'رابط نموذج التسجيل جاهز للمشاركة', 2),
(0, 'pre', 'session0_slides_ready', 'Slides/materials ready', 'الشرائح/المواد جاهزة', 3);

INSERT INTO instructor_checklist_items (day_number, phase, item_key, content_en, content_ar, display_order) VALUES
(0, 'during', 'session0_timing', 'Keep to 45-60 min total', 'الالتزام بـ 45-60 دقيقة', 1),
(0, 'during', 'session0_mini_exercise', 'Run mini exercise (10 min)', 'تنفيذ التمرين المصغر (10 دقائق)', 2),
(0, 'during', 'session0_cta_clear', 'CTA clear: form submission', 'الدعوة للعمل واضحة: تقديم النموذج', 3);

INSERT INTO instructor_checklist_items (day_number, phase, item_key, content_en, content_ar, display_order) VALUES
(0, 'after', 'session0_leads_collected', 'Verify leads collected in form', 'التحقق من جمع البيانات في النموذج', 1),
(0, 'after', 'session0_followup', 'Send follow-up message to interested attendees', 'إرسال رسالة متابعة للمهتمين', 2);

-- Day 1 Pre-session checklist
INSERT INTO instructor_checklist_items (day_number, phase, item_key, content_en, content_ar, display_order) VALUES
(1, 'pre', 'day1_demo_tested', 'Demo prompts tested (bad + fixed + refinement)', 'تجربة العروض التوضيحية (سيء + محسّن + تحسين)', 1),
(1, 'pre', 'day1_templates_ready', 'CREAR template ready to paste', 'قالب CREAR جاهز للصق', 2),
(1, 'pre', 'day1_timing_visible', 'Timer/timing visible (phone timer)', 'المؤقت مرئي', 3),
(1, 'pre', 'day1_hybrid_plan', 'Plan for hybrid: who watches online chat?', 'خطة للتعلم الهجين: من يراقب الدردشة؟', 4);

INSERT INTO instructor_checklist_items (day_number, phase, item_key, content_en, content_ar, display_order) VALUES
(1, 'during', 'day1_enforce_show_prompt', 'Enforce "show prompt + output" rule', 'تطبيق قاعدة "أظهر السؤال + النتيجة"', 1),
(1, 'during', 'day1_protect_practice', 'Keep teaching short; protect practice time', 'اختصار الشرح وحماية وقت التطبيق', 2),
(1, 'during', 'day1_call_good_examples', 'Call out good examples (especially Arabic-first learners)', 'تسليط الضوء على الأمثلة الجيدة', 3);

INSERT INTO instructor_checklist_items (day_number, phase, item_key, content_en, content_ar, display_order) VALUES
(1, 'after', 'day1_note_mistakes', 'Write down 3 common mistakes you saw', 'تدوين 3 أخطاء شائعة', 1),
(1, 'after', 'day1_send_homework', 'Send message: "Bring one close-but-not-right output tomorrow"', 'إرسال رسالة الواجب', 2);

-- Day 2 Pre-session checklist
INSERT INTO instructor_checklist_items (day_number, phase, item_key, content_en, content_ar, display_order) VALUES
(2, 'pre', 'day2_refinement_starters', 'Prepare 4 refinement starters to paste', 'تحضير 4 بدايات تحسين للصق', 1),
(2, 'pre', 'day2_monster_prompt_plan', 'Plan to interrupt "monster prompts"', 'خطة لإيقاف الأسئلة الطويلة جداً', 2);

INSERT INTO instructor_checklist_items (day_number, phase, item_key, content_en, content_ar, display_order) VALUES
(2, 'during', 'day2_stop_make_better', 'Stop "make it better" requests; force specificity', 'منع طلبات "اجعلها أفضل" وفرض التحديد', 1),
(2, 'during', 'day2_timebox_help', 'Time-box help: 2 minutes per learner', 'تحديد وقت المساعدة: دقيقتان لكل متدرب', 2);

INSERT INTO instructor_checklist_items (day_number, phase, item_key, content_en, content_ar, display_order) VALUES
(2, 'after', 'day2_collect_refinements', 'Collect top 5 best refinement prompts from learners', 'جمع أفضل 5 أسئلة تحسين من المتدربين', 1);

-- Day 3 Pre-session checklist
INSERT INTO instructor_checklist_items (day_number, phase, item_key, content_en, content_ar, display_order) VALUES
(3, 'pre', 'day3_verification_triggers', 'Prepare 3 example verification triggers', 'تحضير 3 أمثلة لمحفزات التحقق', 1),
(3, 'pre', 'day3_safe_phrasing', 'Have "safe phrasing" line ready', 'تحضير عبارات الصياغة الآمنة', 2);

INSERT INTO instructor_checklist_items (day_number, phase, item_key, content_en, content_ar, display_order) VALUES
(3, 'during', 'day3_push_real_verify', 'Push learners to verify something they''d publish/use', 'دفع المتدربين للتحقق من شيء سينشرونه', 1),
(3, 'during', 'day3_force_source_capture', 'Force "source name captured" at minimum', 'فرض التقاط اسم المصدر كحد أدنى', 2);

INSERT INTO instructor_checklist_items (day_number, phase, item_key, content_en, content_ar, display_order) VALUES
(3, 'after', 'day3_remind_day4', 'Remind: Day 4 is planning + prep for building', 'تذكير: اليوم 4 للتخطيط والتحضير للبناء', 1);

-- Day 4 Pre-session checklist
INSERT INTO instructor_checklist_items (day_number, phase, item_key, content_en, content_ar, display_order) VALUES
(4, 'pre', 'day4_prd_template', 'Mini-PRD template ready', 'قالب PRD المصغر جاهز', 1),
(4, 'pre', 'day4_scope_phrases', '"Scope cutter" phrases ready', 'عبارات تقليص النطاق جاهزة', 2),
(4, 'pre', 'day4_prd_review_plan', 'Plan for quick PRD reviews (2 min each)', 'خطة لمراجعة PRD السريعة', 3);

INSERT INTO instructor_checklist_items (day_number, phase, item_key, content_en, content_ar, display_order) VALUES
(4, 'during', 'day4_enforce_5_musts', 'Enforce must-haves ≤ 5', 'فرض الضروريات ≤ 5', 1),
(4, 'during', 'day4_ensure_asset', 'Ensure everyone has at least 1 asset saved', 'التأكد من حفظ أصل واحد على الأقل', 2),
(4, 'during', 'day4_build_prompt_test', 'Ensure build prompt includes test steps', 'التأكد من تضمين خطوات الاختبار', 3);

INSERT INTO instructor_checklist_items (day_number, phase, item_key, content_en, content_ar, display_order) VALUES
(4, 'after', 'day4_message_day5', 'Message: "Tomorrow is build + ship. Bring your PRD + assets open"', 'رسالة: غداً البناء والإطلاق', 1);

-- Day 5 Pre-session checklist
INSERT INTO instructor_checklist_items (day_number, phase, item_key, content_en, content_ar, display_order) VALUES
(5, 'pre', 'day5_demo_ready', 'Lovable demo project ready', 'مشروع Lovable التجريبي جاهز', 1),
(5, 'pre', 'day5_bug_template', 'Bug report template ready to paste', 'قالب تقرير الأخطاء جاهز', 2),
(5, 'pre', 'day5_help_plan', 'Plan for hybrid help (queue system)', 'خطة للمساعدة الهجينة (نظام الطوابير)', 3);

INSERT INTO instructor_checklist_items (day_number, phase, item_key, content_en, content_ar, display_order) VALUES
(5, 'during', 'day5_protect_build', 'Protect build time (don''t let Q&A expand)', 'حماية وقت البناء', 1),
(5, 'during', 'day5_push_deploy', 'Push learners to deploy earlier', 'دفع المتدربين للنشر مبكراً', 2),
(5, 'during', 'day5_reduce_scope', 'If stuck: reduce scope immediately', 'إذا توقف: تقليص النطاق فوراً', 3);

INSERT INTO instructor_checklist_items (day_number, phase, item_key, content_en, content_ar, display_order) VALUES
(5, 'after', 'day5_collect_links', 'Collect project links', 'جمع روابط المشاريع', 1),
(5, 'after', 'day5_final_message', 'Send final message: "Keep using CREAR + stop rule + verify triggers"', 'إرسال الرسالة الختامية', 2);

-- Update function trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_course_sessions_updated_at ON course_sessions;
CREATE TRIGGER update_course_sessions_updated_at BEFORE UPDATE ON course_sessions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_instructor_checklist_items_updated_at ON instructor_checklist_items;
CREATE TRIGGER update_instructor_checklist_items_updated_at BEFORE UPDATE ON instructor_checklist_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_instructor_checklist_progress_updated_at ON instructor_checklist_progress;
CREATE TRIGGER update_instructor_checklist_progress_updated_at BEFORE UPDATE ON instructor_checklist_progress
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_instructor_session_notes_updated_at ON instructor_session_notes;
CREATE TRIGGER update_instructor_session_notes_updated_at BEFORE UPDATE ON instructor_session_notes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
