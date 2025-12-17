-- Drop the existing check constraint
ALTER TABLE public.enrollments DROP CONSTRAINT IF EXISTS enrollments_status_check;

-- Update default status value from 'pending' to 'NEW'
ALTER TABLE public.enrollments ALTER COLUMN status SET DEFAULT 'NEW';

-- Update existing 'pending' records to 'NEW'
UPDATE public.enrollments SET status = 'NEW' WHERE status = 'pending';

-- Add new check constraint with uppercase values
ALTER TABLE public.enrollments ADD CONSTRAINT enrollments_status_check 
CHECK (status IN ('NEW', 'CONTACTED', 'CONFIRMED', 'ACCESS_GRANTED', 'REJECTED', 'ARCHIVED'));