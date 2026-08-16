# AGENTS.md

## Cursor Cloud specific instructions

This repo is a single static SPA (vanilla HTML/CSS/JS) built and served by Vite. There is no backend service required to run or develop the app. Standard commands live in `package.json` scripts; setup details are in `README.md` and `setup.sh`.

### Services

- Dev server (only service): `pnpm dev` serves the app on `http://localhost:3000`. The update script already runs `pnpm install`, so no install step is needed before starting it.
- Production preview: `pnpm build` then `pnpm preview` (or `docker compose up --build` for the nginx image).

### Non-obvious caveats

- `vite.config.js` sets `server.open: true`, so `pnpm dev` tries to auto-launch a browser. In a headless VM the auto-open silently fails but the server still binds port 3000 normally — ignore the open error.
- Unit tests (`pnpm test`, Vitest) and the build (`pnpm build`) are fast and are the checks run in CI (`.github/workflows/deploy.yml`). There is no separate lint script.
- E2E tests (`pnpm test:e2e`, Playwright) require the Chromium browser, which the update script installs via `pnpm exec playwright install --with-deps chromium`. The suite runs single-worker and takes ~20 minutes; Playwright starts/reuses its own dev server via `webServer` in `playwright.config.js`, so you do not need to start `pnpm dev` first.
- Known pre-existing E2E failures: many tree / graph / linked-list specs fail because their selectors (e.g. `#tree-container .tree-node`) no longer match the current DOM, even though those visualizations render correctly in the browser. These are stale-test mismatches, not environment problems — do not treat them as setup breakage.
- The feedback feature (Supabase/Firebase) is optional. It is configured via `.env.local` using `VITE_*` variables (see `.env.example`); the core visualizer runs fully without any backend or secrets.
