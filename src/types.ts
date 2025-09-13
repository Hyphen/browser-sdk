/**
 * Custom attributes that can contain any key-value pairs.
 */
export type CustomAttributes = Record<string, unknown>;

/**
 * User information for evaluation context.
 */
export type ToggleUser = {
	/**
	 * Unique identifier for the user.
	 */
	id: string;

	/**
	 * User's email address.
	 */
	email?: string;

	/**
	 * User's display name.
	 */
	name?: string;

	/**
	 * Custom attributes specific to the user.
	 */
	customAttributes?: CustomAttributes;
};

/**
 * Evaluation context for Hyphen feature toggle evaluation.
 *
 * @example
 * ```typescript
 * const context: ToggleContext = {
 *   targetingKey: "user-123",
 *   ipAddress: "203.0.113.42",
 *   customAttributes: {
 *     subscriptionLevel: "premium",
 *     region: "us-east",
 *   },
 *   user: {
 *     id: "user-123",
 *     email: "john.doe@example.com",
 *     name: "John Doe",
 *     customAttributes: {
 *       role: "admin",
 *     },
 *   },
 * };
 * ```
 */
export type ToggleContext = {
	/**
	 * Primary key used for targeting and bucketing.
	 */
	targetingKey: string;

	/**
	 * IP address of the user making the request.
	 */
	ipAddress?: string;

	/**
	 * Custom attributes for evaluation context.
	 */
	customAttributes?: CustomAttributes;

	/**
	 * User information for evaluation.
	 */
	user?: ToggleUser;
};

export interface Evaluation {
	key: string;
	value: boolean | string | number | Record<string, unknown>;
	type: "boolean" | "string" | "number" | "object";
	reason?: unknown;
	errorMessage?: string;
}

export interface EvaluationResponse {
	toggles: Record<string, Evaluation>;
}
