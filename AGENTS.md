# Repository Guidelines

## Project Structure & Module Organization

This repository is a React 19 portfolio built with Vite. Application entry points are `src/main.jsx` and `src/App.jsx`. Page sections live under `src/components/<Component>/`; each component keeps its JSX and CSS together, for example `src/components/Hero/Hero.jsx` and `Hero.css`. Shared styling belongs in `src/styles/global.css`, while shared GSAP registration is centralized in `src/gsap-setup.js`. Store project-generated imagery in [`public/assets/illustrations/`](public/assets/illustrations/) and reference it from React with root-relative paths such as `/assets/illustrations/product-direction.png`. Use descriptive kebab-case filenames and keep source imagery out of `src/`. Generated output is written to `dist/` and must not be committed or edited directly.

## Build, Test, and Development Commands

- `npm install` installs the versions recorded in `package-lock.json`.
- `npm run dev` starts the Vite development server with hot reload.
- `npm run build` creates a production bundle in `dist/` and catches bundling errors.
- `npm run preview` serves the production bundle locally for final checks.
- `npm run lint` runs ESLint across JavaScript and JSX files.

Run `npm run lint && npm run build` before opening a pull request.

## Coding Style & Naming Conventions

Follow the existing style: two-space indentation, single quotes, no semicolons, and trailing commas in multiline JavaScript. Use PascalCase for component names and folders (`Contact/Contact.jsx`), camelCase for functions and variables, and BEM-style CSS classes (`hero__cta`, `section-kicker`). Keep component-specific styles beside their component. Prefer function components, semantic HTML, and accessible labels. Scope GSAP effects with `useGSAP`, clean up created animations or text splits, and import GSAP utilities through `src/gsap-setup.js`. ESLint is the source of truth for JavaScript checks.

## Testing Guidelines

No automated test framework or coverage threshold is configured. For every change, lint and build the project, then verify it in the browser at mobile and desktop widths. Check navigation anchors, theme behavior, keyboard focus, animation cleanup, and reduced-motion/accessibility behavior. If tests are introduced, colocate them as `Component.test.jsx` and add the corresponding command to `package.json`.

## Commit & Pull Request Guidelines

Git history is unavailable in this workspace snapshot. Use short, imperative commit subjects with an optional Conventional Commit prefix, such as `feat: add project detail panel` or `fix: restore mobile nav focus`. Keep commits focused. Pull requests should explain the user-visible change, list validation performed, link related issues, and include before/after screenshots or video for visual and animation changes. Call out new dependencies, configuration changes, and known follow-up work.
