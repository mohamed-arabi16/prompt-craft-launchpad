/**
 * @file Barrel export file for UI components.
 *
 * This file centralizes all Shadcn/UI component exports for cleaner imports throughout the application.
 *
 * **Usage:**
 * ```tsx
 * // Instead of:
 * import { Button } from '@/components/ui/button';
 * import { Card, CardContent } from '@/components/ui/card';
 * import { Input } from '@/components/ui/input';
 *
 * // You can now do:
 * import { Button, Card, CardContent, Input } from '@/components/ui';
 * ```
 */

// Layout & Structure
export * from './card';
export * from './container';
export * from './sidebar';

// Typography & Feedback
export * from './alert';
export * from './alert-dialog';
export * from './badge';
export * from './breadcrumb';

// Form Controls
export * from './button';
export * from './checkbox';
export * from './input';
export * from './input-otp';
export * from './label';
export * from './radio-group';
export * from './select';
export * from './switch';
export * from './textarea';
export * from './toggle';
export * from './toggle-group';
export * from './slider';

// Form Composition
export * from './form';

// Popover & Overlays
export * from './dialog';
export * from './drawer';
export * from './popover';
export * from './hover-card';
export * from './context-menu';
export * from './dropdown-menu';
export * from './sheet';
export * from './tooltip';

// Navigation
export * from './navigation-menu';
export * from './menubar';
export * from './pagination';
export * from './tabs';

// Content Display
export * from './accordion';
export * from './carousel';
export * from './collapsible';
export * from './table';
export * from './scroll-area';

// Visualization
export * from './calendar';
export * from './chart';
export * from './progress';
export * from './separator';
export * from './skeleton';

// Media
export * from './avatar';
export * from './aspect-ratio';

// Commands
export * from './command';

// Notifications
export * from './sonner';
export * from './toast';
export * from './toaster';

// Resizable (for layouts)
export * from './resizable';
