-- Update enrollments table to better link with user accounts
ALTER TABLE public.enrollments 
  ADD COLUMN linked_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN enrollment_completed BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN payment_completed BOOLEAN NOT NULL DEFAULT false;

-- Create index for better performance
CREATE INDEX idx_enrollments_email ON public.enrollments(email);
CREATE INDEX idx_enrollments_linked_user ON public.enrollments(linked_user_id);

-- Create function to check if email has completed enrollment
CREATE OR REPLACE FUNCTION public.check_enrollment_status(email_address TEXT)
RETURNS TABLE (
  has_enrollment BOOLEAN,
  enrollment_completed BOOLEAN,
  payment_completed BOOLEAN,
  enrollment_id UUID
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    CASE WHEN e.id IS NOT NULL THEN true ELSE false END as has_enrollment,
    COALESCE(e.enrollment_completed, false) as enrollment_completed,
    COALESCE(e.payment_completed, false) as payment_completed,
    e.id as enrollment_id
  FROM public.enrollments e
  WHERE e.email = email_address
  ORDER BY e.enrollment_date DESC
  LIMIT 1;
$$;

-- Create function to link enrollment to user after signup
CREATE OR REPLACE FUNCTION public.link_enrollment_to_user(
  email_address TEXT,
  user_uuid UUID
)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE public.enrollments 
  SET linked_user_id = user_uuid,
      enrollment_completed = true
  WHERE email = email_address 
    AND linked_user_id IS NULL
  RETURNING true;
$$;