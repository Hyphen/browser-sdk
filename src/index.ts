import { type CacheableNet, Net } from "@cacheable/net";
import { Hookified } from "hookified";
import type { ToggleContext } from "./toggle-context.js";

/**
 * Hyphen Toggle is a feature flag service. https://hyphen.ai/toggle
 *
 * @example
 * ```typescript
 * const toggle = new Toggle();
 * toggle.publicApiKey = "your-api-key";
 * ```
 */
export class Toggle extends Hookified {
	private _net = new Net();
	private _publicApiKey?: string;
	private _defaultContext: ToggleContext = {
		targetingKey: "",
	};

	/**
	 * Gets the network client instance used for HTTP requests.
	 *
	 * @returns The current CacheableNet instance
	 */
	public get net(): CacheableNet {
		return this._net;
	}

	/**
	 * Sets the network client instance used for HTTP requests.
	 *
	 * @param value - The CacheableNet instance to use
	 */
	public set net(value: CacheableNet) {
		this._net = value;
	}

	/**
	 * Gets the public API key used for authentication.
	 *
	 * @returns The current public API key or undefined if not set
	 */
	public get publicApiKey(): string | undefined {
		return this._publicApiKey;
	}

	/**
	 * Sets the public API key used for authentication.
	 *
	 * @param value - The public API key string or undefined to clear
	 * @throws {Error} If the key doesn't start with "public_"
	 */
	public set publicApiKey(value: string | undefined) {
		this.setPublicKey(value);
	}

	/**
	 * Gets the default context used for toggle evaluations.
	 *
	 * @returns The current default ToggleContext
	 */
	public get defaultContext(): ToggleContext {
		return this._defaultContext;
	}

	/**
	 * Sets the default context used for toggle evaluations.
	 *
	 * @param value - The ToggleContext to use as default
	 */
	public set defaultContext(value: ToggleContext) {
		this._defaultContext = value;
	}

	/**
	 * Validates and sets the public API key. This is used internally
	 *
	 * @param key - The public API key string or undefined to clear
	 * @throws {Error} If the key doesn't start with "public_"
	 */
	public setPublicKey(key: string | undefined): void {
		if (key !== undefined && !key.startsWith("public_")) {
			throw new Error("Public API key must start with 'public_'");
		}
		this._publicApiKey = key;
	}
}
