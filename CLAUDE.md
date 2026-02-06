# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Howell-Tech-Platform is a shared library platform for Howell Technologies. It is published as `@howell-tech/platform` to JFrog Artifactory and consumed by client application repositories.

## Commands

- `npm run build` — Bundle with tsup (outputs CJS, ESM, and .d.ts to `dist/`)
- `npm test` — Run tests with vitest
- `npm run lint` — Lint with ESLint
- `npm run clean` — Remove the `dist/` directory

## Architecture

```
src/
├── index.ts          # Main barrel export
└── utils/
    ├── index.ts      # Utils barrel export
    └── hello.ts      # Example utility
tests/
└── hello.test.ts     # Example test
```

- **Bundler:** tsup — produces dual CJS (`dist/index.js`) + ESM (`dist/index.mjs`) output with TypeScript declarations
- **Test framework:** vitest
- **Linter:** ESLint with `@typescript-eslint`
- **TypeScript:** Strict mode, ES2020 target

### Adding new modules

1. Create a directory under `src/` (e.g., `src/auth/`)
2. Add an `index.ts` barrel export in the new directory
3. Re-export from `src/index.ts`
4. Add tests under `tests/`

## Publishing

Publishing is handled by the `.github/workflows/publish.yml` GitHub Actions workflow. It triggers on version tags (`v*`):

1. Bump the version in `package.json`
2. Commit and tag: `git tag v0.2.0`
3. Push the tag: `git push origin v0.2.0`

The workflow requires two GitHub Actions secrets:
- `ARTIFACTORY_REGISTRY_URL` — JFrog Artifactory npm registry URL
- `ARTIFACTORY_AUTH_TOKEN` — Authentication token for Artifactory

## Repository Details

- **Remote:** https://github.com/Austinh132324/Howell-Tech-Platform.git
- **Git LFS:** Enabled and configured
