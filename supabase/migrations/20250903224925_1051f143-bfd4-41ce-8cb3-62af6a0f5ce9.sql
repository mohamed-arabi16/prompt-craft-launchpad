-- Insert admin test data for medane999@gmail.com
INSERT INTO public.admin_users (user_id, role, is_active)
VALUES ('a700194b-201f-487a-a4e7-48b44f6f345e', 'admin', true)
ON CONFLICT (user_id, role) DO NOTHING;