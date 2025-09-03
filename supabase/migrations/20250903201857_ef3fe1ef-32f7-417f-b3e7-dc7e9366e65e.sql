-- Update the check_enrollment_status function to include linked_user_id
DROP FUNCTION IF EXISTS public.check_enrollment_status(TEXT);

CREATE OR REPLACE FUNCTION public.check_enrollment_status(email_address TEXT)
RETURNS TABLE (
  has_enrollment BOOLEAN,
  enrollment_completed BOOLEAN,
  payment_completed BOOLEAN,
  enrollment_id UUID,
  linked_user_id UUID
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
    e.id as enrollment_id,
    e.linked_user_id
  FROM public.enrollments e
  WHERE e.email = email_address
  ORDER BY e.enrollment_date DESC
  LIMIT 1;
$$;