import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/**
 * @interface ProtectedRouteProps
 * @property {React.ReactNode} children - The child components to render if the user is authenticated.
 * @property {boolean} [requireAdmin] - Whether the route requires admin privileges.
 */
interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

/**
 * A component that protects a route from unauthenticated access.
 * It checks for an authenticated user and redirects to the auth page if not found.
 * Optionally checks for admin role if requireAdmin is true.
 *
 * @param {ProtectedRouteProps} props - The props for the component.
 * @returns {JSX.Element} The child components if authenticated, or a redirect/loading spinner.
 */
const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [checkingAdmin, setCheckingAdmin] = useState(requireAdmin);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!requireAdmin || !user) {
        setCheckingAdmin(false);
        return;
      }

      try {
        const { data, error } = await supabase.rpc('is_admin', { _user_id: user.id });
        
        if (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
        } else {
          setIsAdmin(data === true);
        }
      } catch (err) {
        console.error('Failed to check admin status:', err);
        setIsAdmin(false);
      } finally {
        setCheckingAdmin(false);
      }
    };

    if (user && requireAdmin) {
      checkAdminStatus();
    } else if (!requireAdmin) {
      setCheckingAdmin(false);
    }
  }, [user, requireAdmin]);

  if (loading || checkingAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    // Redirect to auth page, saving the attempted location
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    // Redirect non-admins to home page
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
