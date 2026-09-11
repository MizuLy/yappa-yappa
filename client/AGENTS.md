# Repository Guidelines

## Project Structure & Module Organization

This repository is a React 19 single-page client built with Vite and Tailwind CSS.

- `src/main.jsx` bootstraps the application; `src/App.jsx` defines routing.
- `src/pages/` contains route-level screens, currently grouped into `auth/` and `feed/`.
- `src/components/` contains reusable UI and layout components, including route guards in the root.
- `src/api/` contains Axios configuration and endpoint modules; `src/contexts/` and `src/hooks/` contain shared auth state and hooks.
- `src/index.css`, `tailwind.config.js`, and `postcss.config.js` define styling.
- `public/` contains static files served unchanged, such as icons and the favicon.

Keep new features close to their route or domain, and extract genuinely reusable UI into `src/components/`.

## Build, Test, and Development Commands

Run `npm install` after cloning, then use:

- `npm run dev` — start the Vite development server with hot reload.
- `npm run lint` — run ESLint across the project.
- `npm run build` — create the production bundle in `dist/`.
- `npm run preview` — serve the production build locally for verification.

There is no automated test script or test framework configured. Run lint and a production build for substantive changes, and manually verify affected flows in the dev server.

## Coding Style & Naming Conventions

Use modern ES modules and JSX with two-space indentation, semicolon-free formatting, and single quotes, matching the existing files. Name React components and component files in PascalCase (`ProtectedRoute.jsx`), hooks with the `use` prefix (`useAuth.js`), and API modules by domain (`auth.js`). Prefer functional components, React hooks, and Tailwind utility classes. Keep JSX readable and avoid disabling ESLint rules without a specific reason.

## Testing Guidelines

No tests or coverage thresholds are defined. If adding tests, colocate them with the feature or use `src/__tests__/`, and add the npm script and framework configuration to `package.json`.

## Commit & Pull Request Guidelines

Existing commits use short imperative-style prefixes such as `feat:`, `fix:`, and `add:` (for example, `feat: notifications`). Follow that concise convention and keep each commit focused.

Pull requests should explain the user-facing change, identify important implementation areas, and include verification steps (`npm run lint` and `npm run build`). Include screenshots for visual changes and link a related issue when one exists.

## Security & Configuration

Keep secrets and local API values in `.env`; never commit credentials or tokens. Review changes to `src/api/` and authentication guards carefully, especially around protected routes and logout behavior.
