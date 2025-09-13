import { type CacheableNet, Net } from "@cacheable/net";
import { Hookified } from "hookified";
import type { ToggleContext } from "./toggle-context.js";

export type ToggleOptions = {
	/**
	 * public api key
	 */
	publicApiKey?: string;

	/**
	 * The default context to use when once is not passed
	 */
	defaultContext?: ToggleContext;

	/**
	 * Horizon Endpoint Urls to use for Toggle. This will place these urls to be
	 * load balanced. If endpoints fail it will attempt to use the default horizon
	 * endpoint service.
	 * @see {@link https://hyphen.ai/horizon} for more information
	 */
	horizonUrls?: string[];
};

export class Toggle extends Hookified {
	private _net = new Net();
	private _publicApiKey?: string;
	private _defaultContext: ToggleContext = {
		targetingKey: "",
	};
	private _organizationId: string | undefined;
	private _horizonUrls: string[] = [];

	constructor(options?: ToggleOptions) {
		super();

		if (options?.defaultContext) {
			this._defaultContext = options.defaultContext;
		}

		if (options?.publicApiKey) {
			this._publicApiKey = options.publicApiKey;
			this._organizationId = this.getOrgIdFromPublicKey(this._publicApiKey);
		}

		if (options?.horizonUrls) {
			this._horizonUrls = options.horizonUrls;
		} else {
			if (this._publicApiKey) {
				this._horizonUrls = [this.getDefaultHorizonUrl(this._publicApiKey)];
			}
		}
	}

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
	 * Gets the organization ID extracted from the public API key.
	 *
	 * @returns The organization ID string or undefined if not available
	 */
	public get organizationId(): string | undefined {
		return this._organizationId;
	}

	/**
	 * Sets the organization ID.
	 *
	 * @param value - The organization ID string or undefined to clear
	 */
	public set organizationId(value: string | undefined) {
		this._organizationId = value;
	}

	/**
	 * Gets the Horizon endpoint URLs used for load balancing.
	 *
	 * These URLs are used to distribute requests across multiple Horizon endpoints.
	 * If endpoints fail, the system will attempt to use the default horizon endpoint service.
	 *
	 * @returns Array of Horizon endpoint URLs
	 * @see {@link https://hyphen.ai/horizon} for more information
	 */
	public get horizonUrls(): string[] {
		return this._horizonUrls;
	}

	/**
	 * Sets the Horizon endpoint URLs for load balancing.
	 *
	 * Configures multiple Horizon endpoints that will be used for load balancing.
	 * When endpoints fail, the system will fall back to the default horizon endpoint service.
	 *
	 * @param value - Array of Horizon endpoint URLs or empty array to clear
	 * @see {@link https://hyphen.ai/horizon} for more information
	 *
	 * @example
	 * ```typescript
	 * const toggle = new Toggle();
	 * toggle.horizonUrls = [
	 *   'https://org1.toggle.hyphen.cloud',
	 *   'https://org2.toggle.hyphen.cloud'
	 * ];
	 * ```
	 */
	public set horizonUrls(value: string[]) {
		this._horizonUrls = value;
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

	/**
	 * Extracts the organization ID from a public API key.
	 *
	 * The public key format is: `public_<base64-encoded-data>`
	 * The base64 data contains: `orgId:secretData`
	 * Only alphanumeric characters, underscores, and hyphens are considered valid in org IDs.
	 *
	 * @param publicKey - The public API key to extract the organization ID from
	 * @returns The organization ID if valid and extractable, undefined otherwise
	 *
	 * @example
	 * ```typescript
	 * const toggle = new Toggle();
	 * const orgId = toggle.getOrgIdFromPublicKey('public_dGVzdC1vcmc6c2VjcmV0');
	 * console.log(orgId); // 'test-org'
	 * ```
	 */
	public getOrgIdFromPublicKey(publicKey: string): string | undefined {
		try {
			const keyWithoutPrefix = publicKey.replace(/^public_/, "");
			const decoded = Buffer.from(keyWithoutPrefix, "base64").toString();
			const [orgId] = decoded.split(":");
			const isValidOrgId = /^[a-zA-Z0-9_-]+$/.test(orgId);
			return isValidOrgId ? orgId : undefined;
		} catch {
			return undefined;
		}
	}

	/**
	 * Builds the default Horizon API URL for the given public key.
	 *
	 * If a valid organization ID can be extracted from the public key, returns an
	 * organization-specific URL. Otherwise, returns the default fallback URL.
	 *
	 * @param publicKey - The public API key to build the URL for
	 * @returns Organization-specific URL or default fallback URL
	 *
	 * @example
	 * ```typescript
	 * const toggle = new Toggle();
	 *
	 * // With valid org ID
	 * const orgUrl = toggle.buildDefaultHorizonUrl('public_dGVzdC1vcmc6c2VjcmV0');
	 * console.log(orgUrl); // 'https://test-org.toggle.hyphen.cloud'
	 *
	 * // With invalid key
	 * const defaultUrl = toggle.buildDefaultHorizonUrl('invalid-key');
	 * console.log(defaultUrl); // 'https://toggle.hyphen.cloud'
	 * ```
	 */
	public getDefaultHorizonUrl(publicKey: string): string {
		const orgId = this.getOrgIdFromPublicKey(publicKey);
		return orgId
			? `https://${orgId}.toggle.hyphen.cloud`
			: "https://toggle.hyphen.cloud";
	}
}
