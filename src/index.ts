import { type CacheableNet, Net } from "@cacheable/net";
import { Hookified } from "hookified";

/**
 * Toggle class extends Hookified to provide feature toggle functionality with network capabilities.
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
	 */
	public set publicApiKey(value: string | undefined) {
		this._publicApiKey = value;
	}
}
