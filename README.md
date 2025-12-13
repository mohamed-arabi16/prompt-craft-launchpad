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
    ```
    You can find these values in your Supabase project settings.

### Usage

To start the development server, run:

```sh
npm run dev
```

This will start the development server at `http://localhost:5173`.

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

## Architecture

See [docs/architecture.md](docs/architecture.md) for a runtime overview of the provider tree, routing flow, and premium UI wrappers.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

Don't forget to give the project a star! Thanks again!
