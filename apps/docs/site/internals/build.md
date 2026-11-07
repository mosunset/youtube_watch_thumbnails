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
