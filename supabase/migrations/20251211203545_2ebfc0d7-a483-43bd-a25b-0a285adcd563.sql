-- Phase 4: Create storage bucket for course materials

-- Create the course-materials storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'course-materials',
  'course-materials',
  false,
  52428800, -- 50MB limit
  ARRAY['application/pdf', 'application/zip', 'video/mp4', 'image/png', 'image/jpeg']
)
ON CONFLICT (id) DO NOTHING;

-- RLS policies for course-materials bucket

-- Allow authenticated users with course access to download files
CREATE POLICY "Users with course access can download materials"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'course-materials' AND
  auth.uid() IS NOT NULL AND
  EXISTS (
    SELECT 1 FROM public.course_access
    WHERE user_id = auth.uid() AND has_access = true
  )
);

-- Allow admins to upload/manage files
CREATE POLICY "Admins can upload course materials"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'course-materials' AND
  auth.uid() IS NOT NULL AND
  public.has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can update course materials"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'course-materials' AND
  auth.uid() IS NOT NULL AND
  public.has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can delete course materials"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'course-materials' AND
  auth.uid() IS NOT NULL AND
  public.has_role(auth.uid(), 'admin'::app_role)
);