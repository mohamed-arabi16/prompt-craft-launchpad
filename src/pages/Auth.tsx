import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/hooks/useTranslation';
import { toast } from 'sonner';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import LoadingSpinner from '@/components/LoadingSpinner';

/**
 * The authentication page, which includes forms for signing in, signing up, and resetting the password.
 *
 * @returns {JSX.Element} The rendered authentication page.
 */
const Auth = () => {
  const { signUp, signIn, resetPassword, user, loading: authLoading } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'signin');

  // Form states
  const [signInForm, setSignInForm] = useState({ email: '', password: '' });
  const [signUpForm, setSignUpForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });
  const [resetForm, setResetForm] = useState({ email: '' });

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && user) {
      const redirectTo = searchParams.get('redirectTo');
      navigate(redirectTo === 'dashboard' ? '/dashboard' : '/');
    }
  }, [user, authLoading, navigate, searchParams]);

  /**
   * Handles the sign-in form submission.
   *
   * @param {React.FormEvent} e - The form event.
   */
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await signIn(signInForm.email, signInForm.password);

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast.error(t('auth.toast.invalidCredentials'));
        } else {
          toast.error(error.message);
        }
      } else {
        const redirectTo = searchParams.get('redirectTo');
        toast.success(t('auth.toast.welcomeBack'));
        if (redirectTo === 'dashboard') {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      toast.error(t('auth.toast.unexpectedError'));
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles the sign-up form submission.
   *
   * @param {React.FormEvent} e - The form event.
   */
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (signUpForm.password !== signUpForm.confirmPassword) {
      toast.error(t('auth.toast.passwordsDoNotMatch'));
      return;
    }

    if (signUpForm.password.length < 6) {
      toast.error(t('auth.toast.passwordTooShort'));
      return;
    }

    setLoading(true);

    try {
      const { error } = await signUp(signUpForm.email, signUpForm.password, {
        first_name: signUpForm.firstName,
        last_name: signUpForm.lastName,
      });

      if (error) {
        if (error.message.includes('User already registered')) {
          toast.error(t('auth.toast.userExists'));
        } else if (error.message.includes('enrollment form')) {
          toast.error(error.message);
          setTimeout(() => {
            window.location.href = '/enrollment';
          }, 2000);
        } else if (error.message.includes('account has already been created')) {
          toast.error(error.message);
          setActiveTab('signin');
        } else {
          toast.error(error.message);
        }
      } else {
        toast.success(t('auth.toast.accountCreated'));
        const redirectTo = searchParams.get('redirectTo');
        if (redirectTo === 'dashboard') {
          navigate('/dashboard');
        } else {
          setActiveTab('signin');
        }
      }
    } catch (error) {
      toast.error(t('auth.toast.unexpectedError'));
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles the password reset form submission.
   *
   * @param {React.FormEvent} e - The form event.
   */
  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await resetPassword(resetForm.email);

      if (error) {
        toast.error(error.message);
      } else {
        toast.success(t('auth.toast.passwordResetSent'));
        setActiveTab('signin');
      }
    } catch (error) {
      toast.error(t('auth.toast.unexpectedError'));
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-2xl font-bold text-primary mb-2">{t('auth.title')}</h1>
          </Link>
          {searchParams.get('redirectTo') === 'dashboard' ? (
            <p className="text-muted-foreground">{t('auth.signInToDownload')}</p>
          ) : (
            <p className="text-muted-foreground">{t('auth.accessCourseContent')}</p>
          )}
        </div>

        <Card className="border-border/50 shadow-lg">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="signin">{t('auth.signIn')}</TabsTrigger>
              <TabsTrigger value="signup">{t('auth.signUp')}</TabsTrigger>
              <TabsTrigger value="reset">{t('auth.reset')}</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <CardHeader>
                <CardTitle>{t('auth.welcomeBack')}</CardTitle>
                <CardDescription>
                  {t('auth.signInToAccess')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">{t('auth.emailLabel')}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signin-email"
                        type="email"
                        placeholder={t('auth.emailPlaceholder')}
                        value={signInForm.email}
                        onChange={(e) => setSignInForm(prev => ({ ...prev, email: e.target.value }))}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signin-password">{t('auth.passwordLabel')}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signin-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder={t('auth.passwordPlaceholder')}
                        value={signInForm.password}
                        onChange={(e) => setSignInForm(prev => ({ ...prev, password: e.target.value }))}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? <LoadingSpinner size="sm" className="mr-2" /> : null}
                    {t('auth.signInButton')}
                  </Button>
                </form>
              </CardContent>
            </TabsContent>

            <TabsContent value="signup">
              <CardHeader>
                <CardTitle>{t('auth.createAccount')}</CardTitle>
                <CardDescription>
                  {t('auth.createAccountDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-firstname">{t('auth.firstNameLabel')}</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-firstname"
                          type="text"
                          placeholder={t('auth.firstNamePlaceholder')}
                          value={signUpForm.firstName}
                          onChange={(e) => setSignUpForm(prev => ({ ...prev, firstName: e.target.value }))}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-lastname">{t('auth.lastNameLabel')}</Label>
                      <Input
                        id="signup-lastname"
                        type="text"
                        placeholder={t('auth.lastNamePlaceholder')}
                        value={signUpForm.lastName}
                        onChange={(e) => setSignUpForm(prev => ({ ...prev, lastName: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">{t('auth.emailLabel')}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder={t('auth.emailPlaceholder')}
                        value={signUpForm.email}
                        onChange={(e) => setSignUpForm(prev => ({ ...prev, email: e.target.value }))}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">{t('auth.passwordLabel')}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder={t('auth.createPasswordPlaceholder')}
                        value={signUpForm.password}
                        onChange={(e) => setSignUpForm(prev => ({ ...prev, password: e.target.value }))}
                        className="pl-10 pr-10"
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm-password">{t('auth.confirmPasswordLabel')}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-confirm-password"
                        type="password"
                        placeholder={t('auth.confirmPasswordPlaceholder')}
                        value={signUpForm.confirmPassword}
                        onChange={(e) => setSignUpForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? <LoadingSpinner size="sm" className="mr-2" /> : null}
                    {t('auth.createAccountButton')}
                  </Button>
                </form>
              </CardContent>
            </TabsContent>

            <TabsContent value="reset">
              <CardHeader>
                <CardTitle>{t('auth.resetPassword')}</CardTitle>
                <CardDescription>
                  {t('auth.resetPasswordDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordReset} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reset-email">{t('auth.emailLabel')}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="reset-email"
                        type="email"
                        placeholder={t('auth.emailPlaceholder')}
                        value={resetForm.email}
                        onChange={(e) => setResetForm(prev => ({ ...prev, email: e.target.value }))}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? <LoadingSpinner size="sm" className="mr-2" /> : null}
                    {t('auth.sendResetLinkButton')}
                  </Button>
                </form>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>

        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
            {t('auth.backToCourse')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;