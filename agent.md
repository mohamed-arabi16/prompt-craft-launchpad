# Agent Documentation - Prompt Craft Launchpad

## Project Overview

**Prompt Craft Launchpad** is a comprehensive web application designed to teach the art and science of prompt engineering through an intensive 5-day AI course. The platform provides an interactive learning experience for non-technical adults who want to master working with AI tools effectively.

### Purpose

The platform serves multiple purposes:
- **Educational Platform**: Delivers a structured 5-day bootcamp teaching the CREAR Framework (Context + Role + Examples + Output format + Clear refinement)
- **Student Management**: Handles user enrollment, authentication, and course access control
- **Content Delivery**: Provides downloadable course materials and resources
- **Admin Dashboard**: Enables instructors to manage course content, students, and track progress
- **Multi-language Support**: Offers both English and Arabic interfaces

### Key Learning Outcomes

By the end of the course, students will have:
1. A working Minimum Lovable Product with a shareable link
2. A reusable prompt template library
3. A repeatable workflow: Write → Verify → Build

## Technology Stack

### Frontend
- **Vite**: Fast build tool and development server
- **React 18**: UI library with lazy-loaded components
- **TypeScript**: Type-safe development
- **React Router DOM**: Client-side routing with protected routes
- **TanStack Query**: Server state management and data fetching
- **Framer Motion**: Page transitions and animations

### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Re-usable component library built on Radix UI
- **Tailwind Typography**: Enhanced typography styles
- **Tailwind Animate**: Animation utilities

### Form & Validation
- **React Hook Form**: Performant form management
- **Zod**: TypeScript-first schema validation

### Backend & Database
- **Supabase**: Backend-as-a-Service providing:
  - PostgreSQL database with Row Level Security (RLS)
  - User authentication and authorization
  - Edge Functions (Deno runtime)
  - File storage
  - Real-time subscriptions

### Additional Libraries
- **Lucide React**: Icon library
- **Sonner**: Toast notifications
- **use-sound**: Audio feedback
- **canvas-confetti**: Celebration effects
- **date-fns**: Date manipulation
- **Embla Carousel**: Carousel component
- **Recharts**: Data visualization

### Development Tools
- **ESLint**: Code linting
- **Vitest**: Unit testing framework
- **Testing Library**: React component testing
- **jsdom**: DOM implementation for tests

## Architecture

### Provider Composition

The application uses a nested provider structure (defined in `src/App.tsx`):

```
ErrorBoundary
└── QueryClientProvider (TanStack Query)
    └── TooltipProvider
        └── TranslationProvider (i18n)
            └── AuthProvider (user session)
                └── SoundProvider (audio feedback)
                    └── BrowserRouter
                        ├── CustomCursor (premium UX)
                        ├── ScrollProgress (premium UX)
                        ├── PageTransition (animations)
                        ├── Suspense (lazy loading)
                        │   └── AnimatedRoutes
                        └── AccessWarningDialog
```

**Key Responsibilities:**
- **QueryClientProvider**: Centralized data fetching, caching, and retry logic
- **TranslationProvider**: i18n context for English/Arabic localization
- **AuthProvider**: User authentication state, session management, and admin flags
- **SoundProvider**: Coordinates UI sound effects
- **CustomCursor & ScrollProgress**: Premium visual enhancements
- **PageTransition**: Animates route changes with Framer Motion

### Routing Structure

The application uses `react-router-dom` with lazy-loaded pages:

**Public Routes:**
- `/` - Landing page (Index)
- `/auth` - Sign in/Sign up
- `/enrollment` - Course enrollment form
- `/contact` - Contact form
- `/privacy` - Privacy policy
- `/terms` - Terms of service
- `/faq` - Frequently asked questions
- `/glossary` - AI terminology glossary

**Protected Routes:**
- `/dashboard` - Student dashboard (requires authentication)
- `/admin` - Admin panel (requires admin role)

**Route Protection:**
Routes are wrapped with `ProtectedRoute` component that checks:
- User authentication status
- Admin role (for `/admin` route)
- Redirects unauthenticated users to `/auth`

## Project Structure

```
prompt-craft-launchpad/
├── public/                      # Static assets
│   └── translations/            # i18n JSON files
│       ├── en.json              # English translations
│       └── ar.json              # Arabic translations
├── src/                         # Source code
│   ├── components/              # React components
│   │   ├── ui/                  # shadcn/ui components
│   │   ├── admin/               # Admin panel components
│   │   ├── premium/             # Premium UX components
│   │   ├── HeroSection.tsx      # Landing page hero
│   │   ├── Navbar.tsx           # Navigation bar
│   │   ├── Footer.tsx           # Page footer
│   │   ├── ProtectedRoute.tsx   # Route guard
│   │   └── ...                  # Other components
│   ├── context/                 # React contexts
│   │   └── TranslationContext.tsx
│   ├── contexts/                # Additional contexts
│   │   ├── AuthContext.tsx      # Authentication context
│   │   └── SoundContext.tsx     # Sound effects context
│   ├── data/                    # Static data
│   │   ├── instructorCourseContent.ts
│   │   └── checklistTranslations.ts
│   ├── hooks/                   # Custom React hooks
│   │   ├── useTranslation.ts    # i18n hook
│   │   ├── useAdmin.ts          # Admin functionality
│   │   ├── useCourseMaterials.ts
│   │   ├── useDownload.ts       # File download hook
│   │   └── ...                  # Other hooks
│   ├── integrations/            # External integrations
│   │   └── supabase/            # Supabase client & types
│   ├── lib/                     # Utility functions
│   │   └── utils.ts             # Helper utilities
│   ├── pages/                   # Page components
│   │   ├── Index.tsx            # Landing page
│   │   ├── Auth.tsx             # Authentication page
│   │   ├── Dashboard.tsx        # Student dashboard
│   │   ├── Admin.tsx            # Admin dashboard
│   │   ├── Enrollment.tsx       # Enrollment form
│   │   └── ...                  # Other pages
│   ├── types/                   # TypeScript types
│   ├── App.tsx                  # Root component
│   └── main.tsx                 # Application entry point
├── supabase/                    # Supabase configuration
│   ├── functions/               # Edge Functions
│   │   ├── download-material/   # Secure download endpoint
│   │   └── health-check/        # Health monitoring
│   ├── migrations/              # Database migrations
│   └── config.toml              # Supabase config
├── docs/                        # Documentation
│   └── architecture.md          # Runtime architecture
├── package.json                 # NPM dependencies
├── tsconfig.json                # TypeScript config
├── vite.config.ts               # Vite configuration
├── vitest.config.ts             # Test configuration
├── tailwind.config.ts           # Tailwind configuration
└── README.md                    # Project README
```

## Database Schema

### Core Tables

**profiles**
- `id` (UUID, PK): Profile identifier
- `user_id` (UUID, FK → auth.users): User reference
- `first_name`, `last_name`: User name
- `phone`, `company`: Contact information
- `ai_experience`: Previous AI experience level
- `created_at`, `updated_at`: Timestamps

**enrollments**
- `id` (UUID, PK): Enrollment identifier
- `user_id` (UUID, FK → auth.users): User reference
- `first_name`, `last_name`, `email`, `phone`: Student info
- `company`: Company name
- `ai_experience`: AI experience level
- `enrollment_date`: When enrolled
- `status`: Enum ('pending', 'approved', 'completed')

**course_access**
- `id` (UUID, PK): Access record identifier
- `user_id` (UUID, FK → auth.users): User reference
- `has_access` (boolean): Access granted flag
- `access_granted_at`, `access_expires_at`: Access period
- `created_at`, `updated_at`: Timestamps
- UNIQUE constraint on `user_id`

**contact_messages**
- `id` (UUID, PK): Message identifier
- `name`, `email`: Contact information
- `subject`, `message`: Message content
- `created_at`: Timestamp
- `status`: Enum ('unread', 'read', 'replied')

### Content Management Tables

**course_days**
- Stores daily course content
- Day number, titles, descriptions
- Learning objectives and outcomes

**course_materials**
- Downloadable course resources
- File URLs and metadata
- Associated with course days

**faqs**
- Frequently asked questions
- Question and answer pairs
- Multi-language support

**testimonials**
- Student reviews and feedback
- Rating and text content
- Display order

**benefits**
- Course benefits listing
- Icons and descriptions

**target_audience**
- Ideal student profiles
- Descriptions of who should enroll

**site_content**
- Dynamic site content
- Course pricing, settings
- Configurable parameters

### Row Level Security (RLS)

All tables have RLS enabled with policies:

**profiles**
- Users can view/create/update their own profile only

**enrollments**
- Users can view their own enrollments
- Anyone can create enrollments (public form)

**contact_messages**
- Anyone can create messages (public form)
- Only admins can view (via service role)

**course_access**
- Users can view their own access status
- Only admins can modify access

## Authentication & Authorization

### Authentication Flow

1. **Sign Up**
   - User registers with email/password via Supabase Auth
   - Profile created automatically via trigger
   - Email verification optional (configurable)

2. **Sign In**
   - Supabase handles JWT token generation
   - Token stored in browser (localStorage/cookies)
   - Auto-refresh on expiration

3. **Password Reset**
   - Email-based password reset flow
   - Magic link sent to user's email

### Authorization Levels

**Public Access**
- Landing page, enrollment, contact forms
- Static pages (terms, privacy, FAQ, glossary)

**Authenticated Users**
- Access to `/dashboard`
- View course materials (if enrolled)
- Download resources (if access granted)
- View own profile and enrollment status

**Admin Users**
- Access to `/admin` panel
- Manage all enrollments
- Upload/manage course materials
- Edit course content (days, FAQs, testimonials)
- Manage site settings
- View contact messages
- Grant/revoke course access

### Admin Detection

Admin status is determined by:
- Custom claim in JWT token
- Database field in user metadata
- Configured during user creation or via Supabase dashboard

## Edge Functions

### download-material

**Purpose**: Secure file download with access verification

**Endpoint**: `POST /functions/v1/download-material`

**Authentication**: Required (Bearer token)

**Flow**:
1. Validates JWT token from Authorization header
2. Extracts user ID from token
3. Checks user has active course access
4. Verifies material exists and belongs to accessible day
5. Generates signed URL for file download (24-hour expiry)
6. Rate limited to prevent abuse

**Request**:
```json
{
  "materialId": "uuid-of-material"
}
```

**Response**:
```json
{
  "url": "https://supabase-storage.../signed-url",
  "expiresAt": "2026-01-15T10:00:00Z"
}
```

**Environment Variables**:
- `SUPABASE_URL`: Base URL for Supabase project
- `SUPABASE_SERVICE_ROLE_KEY`: Service role key for privileged operations

### health-check

**Purpose**: Monitoring and uptime verification

**Endpoint**: `GET /functions/v1/health-check`

**Authentication**: Not required (public)

**Response**:
```json
{
  "status": "healthy",
  "timestamp": "2026-01-14T10:51:00Z",
  "version": "1.0.0",
  "environment": "production"
}
```

**Environment Variables**:
- `ENVIRONMENT`: Deployment environment label

## Development Workflow

### Prerequisites
- Node.js 18+ and npm
- Supabase account and project
- Supabase CLI (for Edge Functions and migrations)

### Setup

1. **Clone Repository**
   ```bash
   git clone https://github.com/mohamed-arabi16/prompt-craft-launchpad.git
   cd prompt-craft-launchpad
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   
   Create `.env` file:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ENVIRONMENT=local
   ```

4. **Database Setup**
   
   Link to Supabase project:
   ```bash
   supabase link --project-ref YOUR_PROJECT_REF
   ```
   
   Apply migrations:
   ```bash
   supabase db push --use-migrations
   ```

5. **Local Development**
   
   Start dev server:
   ```bash
   npm run dev
   ```
   
   Access at: `http://localhost:5173`

### Available Scripts

**Development:**
- `npm run dev` - Start Vite dev server with HMR
- `npm run build` - Create production build
- `npm run build:dev` - Create development build
- `npm run preview` - Preview production build locally

**Code Quality:**
- `npm run lint` - Run ESLint on codebase
- `npm run test` - Run Vitest test suite
- `npm run test:ui` - Launch interactive test UI

**Edge Functions (local):**
```bash
supabase functions serve download-material --env-file .env
supabase functions serve health-check --env-file .env
```

### Git Workflow

1. Create feature branch from `main`
2. Make focused changes
3. Run linting: `npm run lint`
4. Run tests: `npm run test`
5. Commit with descriptive message
6. Push and create pull request
7. Review and merge

## Deployment

### Frontend Deployment

The application can be deployed to any static hosting service:

**Build Production Bundle:**
```bash
npm run build
```

Output directory: `dist/`

**Recommended Hosts:**
- Vercel
- Netlify
- Cloudflare Pages
- GitHub Pages

**Environment Variables:**
Set in hosting platform:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### Edge Functions Deployment

**Set Production Secrets:**
```bash
supabase secrets set \
  SUPABASE_SERVICE_ROLE_KEY=your_prod_key \
  ENVIRONMENT=production \
  --project-ref YOUR_PROJECT_REF
```

**Deploy Functions:**
```bash
supabase functions deploy download-material --project-ref YOUR_PROJECT_REF
supabase functions deploy health-check --project-ref YOUR_PROJECT_REF
```

### Database Migrations

**Production:**
```bash
supabase link --project-ref YOUR_PROJECT_REF
supabase db push --use-migrations
```

**Local Development:**
```bash
supabase start
supabase db reset --use-migrations
```

## Internationalization (i18n)

### Language Support
- English (en)
- Arabic (ar)

### Translation Files
- `public/translations/en.json`
- `public/translations/ar.json`

### Usage

**In Components:**
```tsx
import { useTranslation } from '@/hooks/useTranslation';

function MyComponent() {
  const { t } = useTranslation();
  
  return <h1>{t('heroTitle')}</h1>;
}
```

**Language Switching:**
- `LanguageSwitcher` component in Navbar
- Persists preference to localStorage
- Switches between translations dynamically

### Adding New Translations

1. Add key-value pair to both `en.json` and `ar.json`
2. Use `t('newKey')` in components
3. Test both languages

### RTL Support

Arabic language automatically enables:
- `dir="rtl"` on document root
- RTL-aware Tailwind classes
- Flipped layouts and icons

## Testing Strategy

### Unit Tests

**Framework**: Vitest + Testing Library

**Location**: Co-located with source files (`.test.ts`, `.test.tsx`)

**Running Tests:**
```bash
npm run test        # Run all tests
npm run test:ui     # Interactive UI
```

**Example Test:**
```tsx
// useDownload.test.ts
import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useDownload } from './useDownload';

describe('useDownload', () => {
  it('should handle download request', async () => {
    // Test implementation
  });
});
```

### Test Coverage

Focus areas:
- Custom hooks (data fetching, state management)
- Utility functions
- Form validation logic
- Authentication flows

### Testing Best Practices

1. **Isolation**: Mock external dependencies (Supabase)
2. **Coverage**: Test happy paths and edge cases
3. **Assertions**: Clear, specific expectations
4. **Setup**: Use `vitest.setup.ts` for global config
5. **Mocking**: Mock services, not implementation details

## Code Conventions

### File Naming
- **Components**: PascalCase (`HeroSection.tsx`)
- **Hooks**: camelCase with `use` prefix (`useTranslation.ts`)
- **Utilities**: camelCase (`utils.ts`)
- **Types**: PascalCase (`instructorDashboard.ts`)
- **Pages**: PascalCase (`Index.tsx`, `Dashboard.tsx`)

### Component Structure

**Preferred Pattern:**
```tsx
// 1. Imports (external, then internal)
import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

// 2. Type definitions
interface MyComponentProps {
  title: string;
}

// 3. Component definition
export function MyComponent({ title }: MyComponentProps) {
  // 3a. Hooks
  const { t } = useTranslation();
  const [state, setState] = useState(false);
  
  // 3b. Event handlers
  const handleClick = () => {
    setState(!state);
  };
  
  // 3c. Render
  return (
    <div onClick={handleClick}>
      <h1>{title}</h1>
    </div>
  );
}
```

### TypeScript Guidelines

1. **Prefer interfaces** over types for object shapes
2. **Use strict mode** (enabled in tsconfig.json)
3. **Avoid `any`** - use `unknown` or specific types
4. **Export types** from separate type files when shared
5. **Use type inference** where obvious

### Import Aliases

Use `@/` prefix for absolute imports:
```tsx
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
```

Configured in `tsconfig.json` and `vite.config.ts`.

### Styling Conventions

**Tailwind CSS:**
- Use utility classes
- Group related utilities: layout → spacing → colors → typography
- Use shadcn/ui components for consistency
- Extend theme in `tailwind.config.ts` for custom values

**Example:**
```tsx
<div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md">
  <h2 className="text-2xl font-bold text-gray-900">Title</h2>
  <p className="text-base text-gray-600">Description</p>
</div>
```

### State Management

**Local State:**
- `useState` for component-local state
- `useReducer` for complex state logic

**Server State:**
- TanStack Query (`useQuery`, `useMutation`)
- Custom hooks wrapping queries (`useCourseMaterials`)

**Global State:**
- React Context for cross-cutting concerns
- Avoid prop drilling with context providers

### Error Handling

**API Calls:**
```tsx
const { data, error, isLoading } = useQuery({
  queryKey: ['materials'],
  queryFn: fetchMaterials,
  onError: (error) => {
    toast.error('Failed to load materials');
    console.error(error);
  }
});
```

**Form Validation:**
- Use Zod schemas
- Display errors with React Hook Form
- Show toast notifications for submission errors

**Boundaries:**
- `ErrorBoundary` wraps entire app
- Catches React render errors
- Displays fallback UI

## Security Considerations

### Authentication Security

1. **JWT Tokens**: Short-lived, auto-refreshed by Supabase
2. **HTTP-Only Cookies**: Recommended for production
3. **HTTPS Only**: Enforce in production
4. **CORS**: Configured in Edge Functions

### Database Security

1. **Row Level Security (RLS)**: Enforced on all tables
2. **Service Role Key**: Only used server-side (Edge Functions)
3. **Anon Key**: Safe for client-side, limited permissions
4. **Input Validation**: Zod schemas validate all user input

### File Access

1. **Signed URLs**: Time-limited (24 hours)
2. **Access Verification**: Edge Function checks enrollment status
3. **Private Storage**: Files not publicly accessible
4. **Rate Limiting**: Prevents abuse of download endpoint

### XSS Prevention

1. React escapes values by default
2. Avoid `dangerouslySetInnerHTML`
3. Sanitize user-generated content
4. CSP headers (configure in hosting platform)

### Environment Variables

1. **Never commit** `.env` file
2. **Prefix client vars** with `VITE_`
3. **Keep secrets** server-side only
4. **Rotate keys** periodically

## Performance Optimizations

### Code Splitting

- **Lazy Loading**: All pages lazy-loaded with `React.lazy()`
- **Route-based**: Splits bundle by route
- **Suspense**: Fallback UI while loading

### Image Optimization

- **OptimizedImage** component for responsive images
- WebP format with fallbacks
- Lazy loading with Intersection Observer
- Proper sizing and srcset

### Caching Strategy

**TanStack Query:**
- Stale time: 5 minutes (configurable)
- Cache time: 30 minutes
- Automatic background refetch
- Optimistic updates for mutations

**Browser Cache:**
- Static assets with long cache headers
- Versioned filenames for cache busting

### Bundle Optimization

- Tree shaking (Vite default)
- Minification in production
- Compression (gzip/brotli at hosting level)
- Analyze bundle: `npx vite-bundle-visualizer`

## Troubleshooting Guide

### Common Issues

**Build Errors:**
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node version: `node --version` (requires 18+)
- Verify TypeScript: `npx tsc --noEmit`

**Authentication Issues:**
- Verify Supabase URL and keys in `.env`
- Check browser console for auth errors
- Confirm email verification settings in Supabase
- Clear localStorage: `localStorage.clear()`

**Database Connection:**
- Verify Supabase project is active
- Check RLS policies are not too restrictive
- Test query in Supabase dashboard
- Review migration status: `supabase db diff`

**Edge Function Errors:**
- Check function logs in Supabase dashboard
- Verify environment variables are set
- Test locally: `supabase functions serve`
- Ensure CORS headers are present

**Translation Missing:**
- Add key to both `en.json` and `ar.json`
- Check for typos in translation keys
- Verify TranslationProvider wraps component

## Contributing Guidelines

### Code Review Checklist

- [ ] Code follows project conventions
- [ ] TypeScript types are properly defined
- [ ] Tests added/updated for new features
- [ ] No console errors or warnings
- [ ] Linting passes: `npm run lint`
- [ ] Tests pass: `npm run test`
- [ ] Build succeeds: `npm run build`
- [ ] Accessibility considerations addressed
- [ ] i18n: Both languages updated
- [ ] Documentation updated if needed

### Pull Request Template

**Title**: Brief description of changes

**Description:**
- What: Summary of changes
- Why: Problem being solved
- How: Implementation approach

**Testing:**
- Steps to test
- Edge cases considered

**Screenshots:**
- For UI changes

**Checklist:**
- [ ] Tested locally
- [ ] Linting passed
- [ ] Tests added
- [ ] Documentation updated

## Maintenance

### Regular Tasks

**Weekly:**
- Review and respond to contact messages
- Check enrollment status
- Monitor error logs

**Monthly:**
- Review and update dependencies
- Check Supabase usage/costs
- Review analytics (if integrated)
- Backup database

**Quarterly:**
- Security audit
- Performance review
- Update course content
- Review student feedback

### Dependency Updates

```bash
# Check outdated packages
npm outdated

# Update minor/patch versions
npm update

# Update major versions (carefully)
npm install package@latest
```

### Monitoring

**Recommended Tools:**
- Sentry: Error tracking
- Google Analytics: User analytics
- Supabase Dashboard: Database metrics
- Uptime Robot: Availability monitoring

## Support & Resources

### Documentation Links

- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Supabase Docs](https://supabase.com/docs)
- [TanStack Query](https://tanstack.com/query/latest/docs/react/overview)

### Internal Resources

- Project README: `README.md`
- Architecture Doc: `docs/architecture.md`
- API Documentation: Supabase project dashboard
- Design System: shadcn/ui components in `src/components/ui/`

### Contact

For questions or issues:
- GitHub Issues: Report bugs and feature requests
- Pull Requests: Contribute improvements
- Email: (Configure contact info)

---

**Last Updated**: January 2026  
**Version**: 1.0.0  
**Maintained By**: Prompt Craft Launchpad Team
