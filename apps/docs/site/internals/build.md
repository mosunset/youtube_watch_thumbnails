# Build System

## Prerequisites

- Node.js (Latest LTS recommended)
- pnpm

## WXT Framework

This project uses [WXT](https://wxt.dev/) for extension development.

## Commands

### Development

```bash
pnpm dev
```
Starts the development server with HMR.

### Build

```bash
pnpm build
```
Builds the extension for Chrome and Firefox. Output is located in `apps/extension/.output/`.

### Zip

```bash
pnpm zip
```
Creates a zip file for store submission.

### Test

```bash
pnpm test
```
Runs the unit tests with [Vitest](https://vitest.dev/) (`apps/extension/src/utils/__tests__/`).

```bash
pnpm test:e2e
```
Builds the Chrome version and runs end-to-end tests with [Playwright](https://playwright.dev/) (`apps/extension/e2e/`). The built extension is loaded into Chromium, and YouTube pages and thumbnail images are replaced with local fakes, so the tests need no network access. They cover the on-page thumbnail (including SPA navigation), the popup and the Thumbnail View. Run `pnpm --filter extension exec playwright install chromium` once beforehand. Firefox is not covered, because Playwright cannot load extensions into Firefox.

### Lint and type check

```bash
pnpm lint
pnpm --filter extension compile
```
`pnpm lint` runs ESLint for the extension and the link check for this documentation site. `compile` runs `tsc --noEmit`.

## Extension scripts

Scripts in `apps/extension/package.json` (run with `pnpm --filter extension <script>`):

| Script | Description |
| :--- | :--- |
| `dev` / `devc` / `devf` | Development server (default browser / Chrome / Firefox) |
| `build` | Production build for Chrome and Firefox |
| `buildc` / `buildf` | Production build for Chrome / Firefox only |
| `zip` / `zipc` / `zipf` | Create store zip files (both / Chrome / Firefox) |
| `compile` | Type check (`tsc --noEmit`) |
| `lint` | ESLint |
| `test` | Unit tests (Vitest) |
| `test:e2e` | Build for Chrome and run the E2E tests (Playwright) |
