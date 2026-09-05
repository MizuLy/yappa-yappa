# AGENTS.md

Express 5 + Prisma (PostgreSQL) backend scaffold. CommonJS, Node >= 18.

## Current state (important)

- This is a scaffold/template, not working code. `src/app.js`, `src/server.js`, and `docs/API.md` are empty. The layered structure the README describes (`src/controllers`, `src/routes`, `src/services`, `src/validators`, `src/middlewares`, `src/config/`, `src/utils/`) does not exist yet — build it from scratch.
- `prisma/schema.prisma` has no models and there are no migrations. `docs/api/` and `tests/{unit,integration}/` are empty `.gitkeep` placeholders.
- Do not trust the README's Architecture/Folder sections as descriptions of existing files; treat them as a spec.

## Commands

- `npm run dev` — hot-reload dev server (nodemon `src/server.js`)
- `npm start` — production
- `npm test` — NOT configured; it is a stub that exits 1 (no test framework installed). Don't run or assume tests exist.
- No linter, formatter, or typecheck is configured. `src/` is plain CommonJS JS (`"type": "commonjs"`; use `require()`/`module.exports`, not ESM imports).

## Prisma

- Requires `DATABASE_URL` in `.env` (copy from `.env.example`). `prisma.config.ts` runs `dotenv/config` and hardcodes `engine: "classic"`, schema at `prisma/schema.prisma`, migrations at `prisma/migrations/`. Use the `npx prisma ...` CLI.
- New models → `npx prisma migrate dev` (creates + applies migration and regenerates client). `npx prisma generate` after schema-only changes.
- PostgreSQL via datasource; the client is `@prisma/client`.

## Environment

- `.env` is gitignored. Never commit it or add secrets. `.env.example` documents all vars: `DATABASE_URL`, `FRONTEND_URL` (CORS whitelist), `PORT`, `NODE_ENV`, `ACCESS_SECRET`/`REFRESH_SECRET` (must differ)/`JWT_EXPIRES_IN`, Cloudinary creds, Brevo email creds. Services keyed off env (Cloudinary, email) fail at runtime if unset.

## Conventions (fill in once code exists)

- Controllers: thin, delegate logic to services
- Validation: [zod / joi / express-validator — pick one] in `src/validators`
- Error handling: [centralized error middleware — define response shape here]
- Response format: [e.g. `{ success, data, error }` — pick one and state it]

## AI assistant guidance

- This is a scaffold — don't assume prior patterns exist; ask before inventing folder conventions not listed above
- Once a pattern is established (e.g. the first controller/service pair), match it exactly in later files — don't introduce a second style
- Don't add packages not already in `package.json` without flagging it first
- Update the "Conventions" section above as soon as real patterns are picked, so future sessions (yours or your teacher's) stay consistent