-- Security Fix: Add proper RLS policies for contact_messages table
-- Only allow administrators to view and manage contact messages

-- Create admin role check function
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  -- For now, return false since we don't have admin roles implemented yet
  -- This can be updated when admin role system is implemented
  SELECT false;
$$;

-- Add SELECT policy for contact messages (admin only)
CREATE POLICY "Only admins can view contact messages" 
ON public.contact_messages 
FOR SELECT 
USING (public.is_admin(auth.uid()));

-- Add UPDATE policy for contact messages (admin only)
CREATE POLICY "Only admins can update contact messages" 
ON public.contact_messages 
FOR UPDATE 
USING (public.is_admin(auth.uid()));

-- Add DELETE policy for contact messages (admin only)
CREATE POLICY "Only admins can delete contact messages" 
ON public.contact_messages 
FOR DELETE 
USING (public.is_admin(auth.uid()));

-- Security Fix: Update enrollments table to handle anonymous enrollments properly
-- First drop the existing policy and foreign key constraint that depends on user_id column
DROP POLICY IF EXISTS "Users can view their own enrollments" ON public.enrollments;

-- Drop the foreign key constraint if it exists
ALTER TABLE public.enrollments DROP CONSTRAINT IF EXISTS enrollments_user_id_fkey;

-- Modify the user_id column to allow text instead of uuid for anonymous enrollments
ALTER TABLE public.enrollments ALTER COLUMN user_id TYPE text;

-- Recreate the RLS policy for enrollments to handle both authenticated and anonymous users
CREATE POLICY "Users can view their own enrollments" 
ON public.enrollments 
FOR SELECT 
USING (
  -- Allow authenticated users to see their own enrollments
  (auth.uid()::text = user_id) 
  OR 
  -- Allow viewing of anonymous enrollments (for admin purposes later)
  (user_id LIKE 'anon_%' AND public.is_admin(auth.uid()))
);

-- Add index for better performance on user_id lookups
CREATE INDEX IF NOT EXISTS idx_enrollments_user_id ON public.enrollments(user_id);

-- Add index for better performance on contact_messages status
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON public.contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON public.contact_messages(created_at);