import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Home,
  BookOpen,
  GraduationCap,
  Mail,
  FileText,
  Shield,
  HelpCircle,
  BookMarked,
  LayoutDashboard,
  Settings,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Languages,
} from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/contexts/AuthContext';
import { useSoundEnabled } from '@/hooks/useAnimations';

interface CommandPaletteProps {
  onToggleLanguage?: () => void;
}

/**
 * Premium command palette (⌘K) for power users
 */
const CommandPalette = ({ onToggleLanguage }: CommandPaletteProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { t, language } = useTranslation();
  const { user } = useAuth();
  const { soundEnabled, toggleSound } = useSoundEnabled();

  // Keyboard shortcut handler
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  const navigationItems = [
    { icon: Home, label: t('navHome') || 'Home', path: '/' },
    { icon: BookOpen, label: t('navCourse') || 'Course', path: '/#course' },
    { icon: GraduationCap, label: t('navEnroll') || 'Enroll', path: '/enrollment' },
    { icon: Mail, label: t('navContact') || 'Contact', path: '/contact' },
    { icon: HelpCircle, label: t('navFAQ') || 'FAQ', path: '/faq' },
    { icon: BookMarked, label: t('navGlossary') || 'Glossary', path: '/glossary' },
    { icon: FileText, label: t('navTerms') || 'Terms', path: '/terms' },
    { icon: Shield, label: t('navPrivacy') || 'Privacy', path: '/privacy' },
  ];

  const userItems = user
    ? [
        { icon: LayoutDashboard, label: t('dashboard') || 'Dashboard', path: '/dashboard' },
      ]
    : [];

  return (
    <>
      {/* Keyboard shortcut hint */}
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground
                   bg-muted/50 rounded-lg border border-border hover:bg-muted transition-colors"
      >
        <span>{t('search') || 'Search'}...</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1
                       rounded border border-border bg-muted px-1.5 font-mono text-[10px]
                       font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="rounded-lg border border-border shadow-2xl">
          <CommandInput placeholder={t('searchPlaceholder') || 'Type a command or search...'} />
          <CommandList>
            <CommandEmpty>{t('noResults') || 'No results found.'}</CommandEmpty>

            {/* Navigation */}
            <CommandGroup heading={t('navigation') || 'Navigation'}>
              {navigationItems.map((item) => (
                <CommandItem
                  key={item.path}
                  onSelect={() => runCommand(() => navigate(item.path))}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>

            {/* User section */}
            {userItems.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup heading={t('account') || 'Account'}>
                  {userItems.map((item) => (
                    <CommandItem
                      key={item.path}
                      onSelect={() => runCommand(() => navigate(item.path))}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}

            {/* Settings */}
            <CommandSeparator />
            <CommandGroup heading={t('settings') || 'Settings'}>
              <CommandItem
                onSelect={() => runCommand(() => onToggleLanguage?.())}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Languages className="h-4 w-4" />
                <span>{language === 'en' ? 'Switch to Arabic' : 'Switch to English'}</span>
              </CommandItem>

              <CommandItem
                onSelect={() => runCommand(toggleSound)}
                className="flex items-center gap-2 cursor-pointer"
              >
                {soundEnabled ? (
                  <>
                    <VolumeX className="h-4 w-4" />
                    <span>{t('disableSound') || 'Disable Sound Effects'}</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="h-4 w-4" />
                    <span>{t('enableSound') || 'Enable Sound Effects'}</span>
                  </>
                )}
              </CommandItem>
            </CommandGroup>

            {/* Quick actions */}
            <CommandSeparator />
            <CommandGroup heading={t('quickActions') || 'Quick Actions'}>
              <CommandItem
                onSelect={() => runCommand(() => navigate('/enrollment'))}
                className="flex items-center gap-2 cursor-pointer"
              >
                <GraduationCap className="h-4 w-4 text-primary" />
                <span className="text-primary font-medium">
                  {t('enrollNow') || 'Enroll Now'}
                </span>
              </CommandItem>

              <CommandItem
                onSelect={() => runCommand(() => window.scrollTo({ top: 0, behavior: 'smooth' }))}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Home className="h-4 w-4" />
                <span>{t('backToTop') || 'Back to Top'}</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-border text-xs text-muted-foreground">
            <span>{t('commandPaletteHint') || 'Press ↵ to select, ↑↓ to navigate, Esc to close'}</span>
            <div className="flex items-center gap-2">
              <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border">Esc</kbd>
              <span>{t('toClose') || 'to close'}</span>
            </div>
          </div>
        </Command>
      </CommandDialog>
    </>
  );
};

export default CommandPalette;
