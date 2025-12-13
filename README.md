# AI Prompt Engineering Course

This is the repository for the AI Prompt Engineering Course, a web application designed to teach the art and science of prompt engineering.

## Project Overview

The goal of this project is to provide a comprehensive, interactive, and engaging learning experience for students who want to master prompt engineering. The application includes a landing page, user authentication, a student dashboard, and course content.

### Features

*   **User Authentication:** Students can sign up, sign in, and reset their passwords.
*   **Student Dashboard:** Once enrolled, students can access their course materials and download resources.
*   **Internationalization:** The application supports both English and Arabic.
*   **Responsive Design:** The application is designed to work on all devices, from mobile phones to desktop computers.

## Technologies Used

This project is built with the following technologies:

*   **Vite:** A fast build tool that provides a modern development experience.
*   **React:** A JavaScript library for building user interfaces.
*   **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
*   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
*   **shadcn/ui:** A collection of re-usable components built using Radix UI and Tailwind CSS.
*   **Supabase:** A backend-as-a-service platform that provides a database, authentication, and more.
*   **React Hook Form:** A library for building performant, flexible, and extensible forms.
*   **Zod:** A TypeScript-first schema declaration and validation library.
*   **Sonner:** A toast notification library for React.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js and npm (or a compatible package manager)
*   A Supabase account and project

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/your-username/your-repo-name.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```
3.  Set up your environment variables. Create a `.env` file in the root of the project and add the following variables:
    ```
    VITE_SUPABASE_URL=YOUR_SUPABASE_URL
    VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    SUPABASE_URL=YOUR_SUPABASE_URL
    SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY
    ENVIRONMENT=local
    ```
    You can find these values in your Supabase project settings.

### Usage

To start the development server, run:

```sh
npm run dev
```

This will start the development server at `http://localhost:5173`.

## Development workflow

- `npm run lint`: Run ESLint against the repository to catch formatting and code-quality issues. Use this before opening a pull request to ensure the codebase matches the project's standards. The command prints lint results to the terminal and exits with a non-zero status if fixes are needed.
- `npm run test`: Execute the Vitest unit test suite in headless mode. Run this regularly during development and before pushing changes to confirm application logic remains stable. Successful runs display passing test summaries; failures list the relevant test file and assertion output.
- `npm run test:ui`: Launch the interactive Vitest UI dashboard, which is helpful for exploring and debugging tests locally. Expect a local web UI to open (or a URL to visit) showing test statuses; keep the process running while investigating failures.
- `npm run build`: Generate the production-ready bundle with Vite. Use this prior to deployment or when validating the application can produce an optimized build. The compiled assets are emitted to the `dist/` directory.
- `npm run preview`: Serve the built application locally using Vite Preview. Run this after `npm run build` to verify the production bundle; it starts a local server (default `http://localhost:4173`) that serves files from `dist/`.

## Project Structure

The project is organized as follows:

*   `public/`: Contains static assets, such as images, fonts, and translation files.
*   `src/`: Contains the source code for the application.
    *   `components/`: Contains the main UI components for the application.
        *   `ui/`: Contains the `shadcn/ui` components.
    *   `context/`: Contains the `TranslationContext`, which manages the application's internationalization.
    *   `contexts/`: Contains the `AuthContext`, which manages user authentication.
    *   `hooks/`: Contains custom React hooks.
    *   `integrations/`: Contains the Supabase client and types.
    *   `lib/`: Contains utility functions.
    *   `pages/`: Contains the main pages of the application.
*   `supabase/`: Contains the Supabase database migrations.

## Supabase deployment and migrations

The project uses Supabase Edge Functions and database migrations stored in the `supabase/` directory. The commands below assume you have the [Supabase CLI](https://supabase.com/docs/guides/cli) installed and are authenticated (`supabase login`).

### Required environment variables

| Variable | Purpose | Where it is used |
| --- | --- | --- |
| `SUPABASE_URL` | Base URL for the Supabase project | Edge Functions (server-side) |
| `VITE_SUPABASE_URL` | Public URL for the Supabase project | Frontend build and local dev server |
| `VITE_SUPABASE_ANON_KEY` | Public anon key for client-side auth | Frontend build and local dev server |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key for privileged requests inside Edge Functions | `download-material` Edge Function |
| `ENVIRONMENT` | Label for health endpoint responses (`local`, `staging`, `production`) | `health-check` Edge Function (optional) |

Store production secrets with `supabase secrets set SUPABASE_SERVICE_ROLE_KEY=... ENVIRONMENT=production` before deploying functions.

### Running Edge Functions locally

Use the Supabase CLI to serve functions with your project environment:

```sh
supabase functions serve download-material --env-file .env
supabase functions serve health-check --env-file .env
```

Ensure `.env` includes `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and any other values read by the functions. The CLI automatically injects `SUPABASE_URL` from your linked project when available.

### Deploying Edge Functions

Link the CLI to your project and deploy the functions:

```sh
supabase link --project-ref YOUR_PROJECT_REF
supabase functions deploy download-material --project-ref YOUR_PROJECT_REF
supabase functions deploy health-check --project-ref YOUR_PROJECT_REF
```

Add production secrets before deploying if they are not already set:

```sh
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=YOUR_PROD_SERVICE_ROLE_KEY ENVIRONMENT=production --project-ref YOUR_PROJECT_REF
```

### Applying database migrations

Migrations live in `supabase/migrations`. Apply them to your linked project with:

```sh
supabase link --project-ref YOUR_PROJECT_REF
supabase db push --use-migrations --project-ref YOUR_PROJECT_REF
```

For local development against the Supabase emulator, start the stack and apply migrations:

```sh
supabase start
supabase db reset --use-migrations
```

These commands ensure your database schema stays in sync across environments.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

Don't forget to give the project a star! Thanks again!
