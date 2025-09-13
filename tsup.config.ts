import { defineConfig } from 'tsup'

export default defineConfig([
  // ESM and CJS builds for Node.js
  {
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
    sourcemap: true,
    minify: false,
    splitting: false,
    outDir: 'dist',
    platform: 'neutral',
    target: 'es2018',
    external: ['hookified'],
    outExtension: ({ format }) => {
      return format === 'esm' ? { js: '.js' } : { js: '.cjs' }
    },
  },
  // Browser IIFE build with bundled dependencies
  {
    entry: ['src/index.ts'],
    format: ['iife'],
    dts: false,
    clean: false,
    sourcemap: true,
    minify: false,
    splitting: false,
    outDir: 'dist',
    globalName: 'HyphenBrowserSDK',
    platform: 'browser',
    target: 'es2018',
    outExtension: () => ({ js: '.browser.js' }),
    noExternal: ['hookified'],
    define: {
      global: 'globalThis',
    },
    esbuildOptions: (options) => {
      options.define = {
        ...options.define,
        global: 'globalThis',
      }
    },
  },
])