-- Create storage bucket for course materials
INSERT INTO storage.buckets (id, name, public) VALUES ('course-materials', 'course-materials', false);

-- Create course_materials table for PDF files and metadata
CREATE TABLE public.course_materials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  file_type TEXT NOT NULL DEFAULT 'pdf',
  file_path TEXT NOT NULL,
  file_url TEXT,
  course_day INTEGER, -- NULL for general materials like course guide
  category TEXT NOT NULL, -- 'daily_summary', 'course_guide', 'resource'
  is_active BOOLEAN NOT NULL DEFAULT true,
  requires_access BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.course_materials ENABLE ROW LEVEL SECURITY;

-- RLS policies for course materials
CREATE POLICY "Anyone can view active course materials" 
ON public.course_materials 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Only admins can manage course materials" 
ON public.course_materials 
FOR ALL
USING (is_admin(auth.uid()));

-- Create storage policies for course materials bucket
CREATE POLICY "Users with course access can view course materials" 
ON storage.objects 
FOR SELECT 
USING (
  bucket_id = 'course-materials' AND 
  EXISTS (
    SELECT 1 FROM public.course_access 
    WHERE user_id = auth.uid() AND has_access = true
  )
);

CREATE POLICY "Only admins can upload course materials" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'course-materials' AND is_admin(auth.uid()));

CREATE POLICY "Only admins can update course materials" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'course-materials' AND is_admin(auth.uid()));

CREATE POLICY "Only admins can delete course materials" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'course-materials' AND is_admin(auth.uid()));

-- Create trigger for updated_at
CREATE TRIGGER update_course_materials_updated_at
BEFORE UPDATE ON public.course_materials
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample course materials
INSERT INTO public.course_materials (title, description, file_path, category, course_day) VALUES
('Course Guide', 'Complete course overview and syllabus', 'course-guide.pdf', 'course_guide', NULL),
('Day 1 Summary', 'Fundamental Prompt Science summary', 'day-1-summary.pdf', 'daily_summary', 1),
('Day 2 Summary', 'Advanced Thinking Techniques summary', 'day-2-summary.pdf', 'daily_summary', 2),
('Day 3 Summary', 'ChatGPT Mastery summary', 'day-3-summary.pdf', 'daily_summary', 3),
('Day 4 Summary', 'Midjourney Visual Studio summary', 'day-4-summary.pdf', 'daily_summary', 4),
('Day 5 Summary', 'Lovable Co-Engineering summary', 'day-5-summary.pdf', 'daily_summary', 5);