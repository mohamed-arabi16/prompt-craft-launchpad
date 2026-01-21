import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Session timeout configuration: 30 minutes of inactivity
const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
const WARNING_TIME_MS = 2 * 60 * 1000; // Show warning at 2 minutes remaining

/**
 * The shape of the authentication context.
 *
 * @interface AuthContextType
 * @property {User | null} user - The current user.
 * @property {Session | null} session - The current session.
 * @property {boolean} loading - Whether the authentication state is loading.
 * @property {(email: string, password: string, metadata?: any) => Promise<{ error: any }>} signUp - A function to sign up a new user.
 * @property {(email: string, password: string) => Promise<{ error: any }>} signIn - A function to sign in a user.
 * @property {() => Promise<{ error: any }>} signOut - A function to sign out a user.
 * @property {(email: string) => Promise<{ error: any }>} resetPassword - A function to reset a user's password.
 * @property {() => void} resetSessionTimeout - A function to reset the session timeout timer on user activity.
 */
interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, metadata?: any) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  resetSessionTimeout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * A hook to use the authentication context.
 *
 * @returns {AuthContextType} The authentication context.
 * @throws {Error} If used outside of an `AuthProvider`.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * The provider for the authentication context.
 *
 * @param {{ children: React.ReactNode }} props - The props for the component.
 * @returns {JSX.Element} The rendered authentication provider.
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Session timeout tracking
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const warningTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasShownWarningRef = useRef(false);

  // Reset session timeout and warning on user activity
  const resetSessionTimeout = () => {
    // Clear existing timeouts
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);
    hasShownWarningRef.current = false;

    // Only set timeout if user is logged in
    if (!user) return;

    // Warning timeout: show notification at 2 minutes remaining
    warningTimeoutRef.current = setTimeout(() => {
      if (!hasShownWarningRef.current) {
        hasShownWarningRef.current = true;
        toast.warning(
          'Your session will expire in 2 minutes due to inactivity. Click anywhere to continue your session.',
          { duration: 120000 } // Show for 2 minutes
        );
      }
    }, SESSION_TIMEOUT_MS - WARNING_TIME_MS);

    // Session timeout: auto-logout after inactivity
    timeoutRef.current = setTimeout(async () => {
      try {
        await supabase.auth.signOut({ scope: 'global' });
        // Clear local storage
        Object.keys(localStorage).forEach((key) => {
          if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
            localStorage.removeItem(key);
          }
        });
        toast.info('Your session has expired. Please sign in again.', { duration: 5000 });
        window.location.href = '/auth';
      } catch (err) {
        console.error('Error during session timeout logout:', err);
      }
    }, SESSION_TIMEOUT_MS);
  };

  // Set up auth state listener and session timeout
  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Set up user activity listeners for session timeout
  useEffect(() => {
    if (!user) {
      // Clear timeouts if user logs out
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);
      return;
    }

    // Initialize timeout on user login
    resetSessionTimeout();

    // Track user activity
    const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];

    const handleActivity = () => {
      resetSessionTimeout();
    };

    // Add event listeners
    activityEvents.forEach(event => {
      document.addEventListener(event, handleActivity);
    });

    // Cleanup
    return () => {
      activityEvents.forEach(event => {
        document.removeEventListener(event, handleActivity);
      });
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);
    };
  }, [user]);

  const signUp = async (email: string, password: string, metadata?: any) => {
    try {
      // First check if email has completed enrollment
      const { data: enrollmentData, error: enrollmentError } = await supabase
        .rpc('check_enrollment_status', { p_email: email });

      if (enrollmentError) {
        return { error: { message: 'Failed to verify enrollment status' } };
      }

      const enrollment = enrollmentData?.[0];
      if (!enrollment?.enrollment_id) {
        return { 
          error: { 
            message: 'You must complete the enrollment form before creating an account. Please fill out the enrollment form first.' 
          } 
        };
      }

      // Check if enrollment is already linked to a user by querying the enrollments table
      const { data: existingEnrollment } = await supabase
        .from('enrollments')
        .select('linked_user_id')
        .eq('id', enrollment.enrollment_id)
        .single();

      if (existingEnrollment?.linked_user_id) {
        return { 
          error: { 
            message: 'An account has already been created for this email address. Please sign in instead.' 
          } 
        };
      }

      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: metadata
        }
      });

      // If signup successful, link the enrollment to the user
      if (data.user && !error && enrollment.enrollment_id) {
        await supabase.rpc('link_enrollment_to_user', {
          p_email: email,
          p_user_id: data.user.id
        });
      }
      
      return { error };
    } catch (err) {
      return { error: { message: 'An unexpected error occurred during signup' } };
    }
  };

  const signIn = async (email: string, password: string) => {
    // Clean up any existing state
    try {
      await supabase.auth.signOut({ scope: 'global' });
    } catch (err) {
      // Continue even if this fails
    }
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (data.user && !error) {
      // Check if user has course access after successful sign in
      setTimeout(async () => {
        try {
          const { data: accessData, error: accessError } = await supabase
            .from('course_access')
            .select('has_access')
            .eq('user_id', data.user.id)
            .single();

          if (accessError || !accessData?.has_access) {
            // User signed in but doesn't have course access
            localStorage.setItem('show_access_warning', 'true');
          }
        } catch (err) {
          console.error('Error checking course access:', err);
        }
      }, 100);
    }
    
    return { error };
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut({ scope: 'global' });
      
      // Clean up local storage
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
          localStorage.removeItem(key);
        }
      });
      
      // Force page reload
      if (!error) {
        window.location.href = '/auth';
      }
      
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const resetPassword = async (email: string) => {
    const redirectUrl = `${window.location.origin}/auth?tab=reset`;
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    });
    
    return { error };
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    resetSessionTimeout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};