# React 19 + Vite + Tailwind CSS v3

A lightweight starter template using React 19, Vite, and Tailwind CSS v3.

## Requirements

- Node.js 18+
- npm (or yarn, pnpm)

## Clone and install

```bash
git clone <YOUR_REPO_URL>
cd REACT_STRUCTURE
npm install
```

## Run development server

```bash
npm run dev
```

## Build for production

```bash
npm run build
```

## Preview build

```bash
npm run preview
```

## Start Your Own Project

1. Remove the current Git history:

```bash
rm -rf .git
```

2. Initialize a new repository and push to your remote:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <YOUR_NEW_REPO_URL>
git push -u origin main
```

## Recommended (Better Way)

Use GitHub's **"Use this template"** feature to create a new repository from this project. This creates a clean repo without preserving this project's commit history.

## Project structure

```
src/
├─ api/                   # axios calls, endpoints
├─ assets/
│  ├─ fonts/              # custom typefaces
│  ├─ icons/              # svg icons
│  └─ images/             # static images
├─ components/
│  ├─ layout/             # navbar, sidebar, footer
│  ├─ sections/           # page-level sections
│  ├─ ui/                 # buttons, inputs, modals
│  └─ ProtectedRoute.jsx  # auth guard
├─ contexts/              # global state, auth, theme
├─ errors/                # error boundaries, 404
├─ hooks/                 # custom react hooks
├─ pages/                 # route-level views
├─ utils/                 # helper functions
├─ App.jsx                # routes definition
└─ main.jsx               # app entry point
```

## Deployment note

For Vercel static deployments, add this rewrite to `vercel.json`:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

## Notes

- Tailwind is configured via PostCSS.
- React Router v7 is used for client-side routing.

## License

MIT

## Author

Mizu
