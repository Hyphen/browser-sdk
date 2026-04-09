import { defineConfig } from "tsdown";

export default defineConfig([
	// ESM and CJS builds for Node.js / bundlers
	{
		entry: ["src/index.ts"],
		format: ["esm", "cjs"],
		dts: true,
		clean: true,
		sourcemap: true,
		minify: false,
		outDir: "dist",
		platform: "neutral",
		target: "es2018",
		deps: {
			neverBundle: ["hookified"],
		},
	},
	// Browser IIFE build with bundled dependencies
	{
		entry: ["src/index.ts"],
		format: ["iife"],
		dts: false,
		clean: false,
		sourcemap: true,
		minify: false,
		outDir: "dist",
		globalName: "HyphenBrowserSDK",
		platform: "browser",
		target: "es2018",
		deps: {
			alwaysBundle: ["hookified"],
			onlyBundle: false,
		},
		outputOptions: {
			entryFileNames: "index.browser.js",
		},
		define: {
			global: "globalThis",
		},
	},
]);
