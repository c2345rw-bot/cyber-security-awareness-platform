# CyberSafe Teens

A multilingual cybersecurity education platform for teenagers in Uzbekistan and Russian-speaking Central Asia. Students learn real-world online safety through structured lessons, quizzes, a phishing simulator, and community scam reporting.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/cybersafe-teens run dev` — run the frontend (port 24896)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind CSS + shadcn/ui
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- **OpenAPI spec** — `lib/api-spec/openapi.yaml`
- **Generated hooks** — `lib/api-client-react/src/generated/`
- **Generated Zod schemas** — `lib/api-zod/src/generated/`
- **DB schema** — `lib/db/src/schema/` (lessons, quiz_questions, simulator_scenarios, scam_reports, user_progress)
- **API routes** — `artifacts/api-server/src/routes/`
- **Frontend pages** — `artifacts/cybersafe-teens/src/pages/`
- **i18n translations** — `artifacts/cybersafe-teens/src/lib/i18n.tsx`
- **Theme/CSS** — `artifacts/cybersafe-teens/src/index.css`

## Architecture decisions

- **No auth required** — progress is tracked by username stored in localStorage; lowers friction for teen users
- **Contract-first API** — all endpoints defined in OpenAPI spec, then codegen produces typed React Query hooks and Zod validators
- **Trilingual data in DB** — each lesson/question row stores En/Uz/Ru fields; the frontend picks the right column based on active language
- **Password checker is server-side** — to keep the analysis logic centralized and extensible
- **Scam reports are public** — community submissions are immediately visible to others for collective protection

## Product

- **Home** — Platform mission, live stats, risk overview (Telegram/Instagram scams, fake jobs, cracked apps)
- **Lessons** — 6 structured lessons across Levels 1-3 (Phishing, Password Safety, Malware, Social Engineering, Safe Browsing, Privacy)
- **Lesson detail + Quiz** — Full multilingual lesson content with real examples and actionable steps, then a quiz with instant feedback
- **Phishing Simulator** — 6 realistic scenarios (Telegram prize, Instagram verification, fake job, fake scholarship email, safe message, crypto investment); users classify SAFE or SCAM
- **Password Checker** — Live strength analysis with crack-time estimates and improvement tips in all 3 languages
- **Scam Reports** — Community board for submitting and browsing real scam messages by category
- **Leaderboard** — Top learners ranked by XP with badges and streaks
- **Dashboard** — Personal progress tracker with completed lessons, quiz scores, badges, XP, and streak

## User preferences

- Multilingual support is a core feature, not an afterthought — EN / UZ (O'zbekcha) / RU
- Real-world usefulness over fancy animations
- Relevant to students in Central Asia (Telegram scams, Instagram phishing, cracked APKs, fake job offers)

## Gotchas

- Always run codegen after changing `lib/api-spec/openapi.yaml`
- Body schema component names must NOT match `<OperationIdPascal>Body` pattern (causes TS2308)
- `useAuth` hook uses localStorage only (no zustand/external state)
- DB push required after schema changes: `pnpm --filter @workspace/db run push`

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
