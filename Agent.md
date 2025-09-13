# Hyphen Toggle SDK for Node.js

## Project Overview
This is the official Node.js SDK for Hyphen's feature toggle service. The SDK provides a simple and efficient way to integrate feature toggles into Node.js applications, allowing developers to control feature rollouts, perform A/B testing, and manage feature flags dynamically.

## Package Manager
**Important**: This project uses `pnpm` instead of `npm` for package management. Always use `pnpm` commands when working with this codebase:

- Install dependencies: `pnpm install`
- Run tests: `pnpm test`
- Run linting: `pnpm lint`
- Build the project: `pnpm build`

## Key Features
- **Feature Toggle Management**: Easily control feature flags in your application
- **Context-Based Targeting**: Support for user context, IP addresses, and custom attributes
- **Public API Key Authentication**: Secure authentication using public API keys with org ID extraction
- **Horizon URL Building**: Automatic construction of organization-specific API endpoints
- **Extensible Architecture**: Built on the Hookified pattern for extensibility
- **TypeScript Support**: Full TypeScript definitions and type safety

## Development Guidelines

### Testing
- Uses Vitest for testing framework
- Comprehensive test coverage including edge cases
- Tests cover both positive and negative scenarios
- Mock-friendly architecture for testing

### Code Quality
- Uses Biome for linting and formatting
- TypeScript for type safety
- Follows consistent code style and patterns
- Error handling with graceful fallbacks

### Architecture Patterns
- Extends Hookified for event-driven extensibility
- Uses dependency injection for network client
- Immutable configuration patterns
- Defensive programming with validation

## Common Development Tasks

### Adding New Features
1. Implement the feature in the main Toggle class
2. Add comprehensive unit tests
3. Update TypeScript types as needed
4. Run `pnpm test` to ensure all tests pass
5. Run `pnpm lint` to check code quality