import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

/**
 * @interface ProtectedRouteProps
 * @property {React.ReactNode} children - The child components to render if the user is authenticated.
 */
interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * A component that protects a route from unauthenticated access.
 * It checks for an authenticated user and redirects to the auth page if not found.
 * It also displays a loading spinner while checking the authentication status.
 *
 * @param {ProtectedRouteProps} props - The props for the component.
 * @returns {JSX.Element} The child components if authenticated, or a redirect/loading spinner.
 */
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    // Redirect to auth page, saving the attempted location
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;