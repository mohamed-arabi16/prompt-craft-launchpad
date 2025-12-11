-- Phase 1: Fix RLS Policies - Require Authentication for all SELECT operations

-- Drop existing permissive policies and create secure ones

-- PROFILES: Only authenticated users can view their own profile
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile" ON public.profiles
FOR SELECT USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

-- ENROLLMENTS: Require authentication for viewing
DROP POLICY IF EXISTS "Users can view their own enrollment" ON public.enrollments;
CREATE POLICY "Users can view their own enrollment" ON public.enrollments
FOR SELECT USING (
  auth.uid() IS NOT NULL AND 
  (linked_user_id = auth.uid() OR LOWER(email) = LOWER((auth.jwt() ->> 'email'::text)))
);

DROP POLICY IF EXISTS "Admins can view all enrollments" ON public.enrollments;
CREATE POLICY "Admins can view all enrollments" ON public.enrollments
FOR SELECT USING (auth.uid() IS NOT NULL AND public.has_role(auth.uid(), 'admin'::app_role));

-- COURSE_ACCESS: Require authentication
DROP POLICY IF EXISTS "Users can view their own course access" ON public.course_access;
CREATE POLICY "Users can view their own course access" ON public.course_access
FOR SELECT USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all course access" ON public.course_access;
CREATE POLICY "Admins can view all course access" ON public.course_access
FOR SELECT USING (auth.uid() IS NOT NULL AND public.has_role(auth.uid(), 'admin'::app_role));

-- USER_ROLES: Require authentication
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
CREATE POLICY "Users can view their own roles" ON public.user_roles
FOR SELECT USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
CREATE POLICY "Admins can view all roles" ON public.user_roles
FOR SELECT USING (auth.uid() IS NOT NULL AND public.has_role(auth.uid(), 'admin'::app_role));

-- COURSE_MATERIALS: Require authentication for viewing
DROP POLICY IF EXISTS "Authenticated users can view active materials" ON public.course_materials;
CREATE POLICY "Authenticated users can view active materials" ON public.course_materials
FOR SELECT USING (auth.uid() IS NOT NULL AND is_active = true);

-- CONTACT_MESSAGES: Admin only viewing
DROP POLICY IF EXISTS "Admins can view contact messages" ON public.contact_messages;
CREATE POLICY "Admins can view contact messages" ON public.contact_messages
FOR SELECT USING (auth.uid() IS NOT NULL AND public.has_role(auth.uid(), 'admin'::app_role));