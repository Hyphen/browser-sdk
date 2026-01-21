# AGENTS.md

Guidelines for AI coding agents (Claude, Gemini, Codex).

## Project

Hyphen Browser SDK is a TypeScript library for feature flag (toggle) evaluation in browser environments. It serves as the base library for JavaScript frameworks like React, Vue, and Svelte. The SDK provides type-safe methods for retrieving boolean, string, number, and object toggles from the Hyphen platform with support for user targeting and context-based evaluation.

## Commands

- `pnpm install` - Install dependencies
- `pnpm build` - Build for production (ESM + CJS + browser bundle + type definitions)
- `pnpm lint` - Run Biome linter with auto-fix
- `pnpm test` - Run linter and Vitest with coverage
- `pnpm test:ci` - CI-specific testing (strict linting + coverage)
- `pnpm clean` - Remove dist, node_modules, pnpm-lock.yaml, and coverage directories

**Use pnpm, not npm.**

## Development Rules

1. **Always run `pnpm build` before committing** - Build must succeed
2. **Always run `pnpm test` before committing** - All tests must pass
3. **Follow existing code style** - Biome enforces formatting and linting
4. **Mirror source structure in tests** - Test files go in `test/` matching `src/` structure

## Structure

- `src/index.ts` - Main Toggle client class with evaluation methods (getBoolean, getString, getNumber, getObject, get)
- `src/types.ts` - TypeScript type definitions for toggle contexts, options, and responses
- `test/` - Test files (Vitest)
