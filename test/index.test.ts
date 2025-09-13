import { describe, expect, test } from "vitest";
import { Toggle, type ToggleOptions } from "../src/index.js";
import { getRandomToggleContext, mockToggleContexts } from "./mock-contexts.js";

describe("Hyphen sdk", () => {
	test("should create an instance of Toggle", () => {
		const toggle = new Toggle();
		expect(toggle).toBeInstanceOf(Toggle);
	});

	describe("constructor", () => {
		test("should create Toggle with no options", () => {
			const toggle = new Toggle();
			expect(toggle).toBeInstanceOf(Toggle);
			expect(toggle.publicApiKey).toBeUndefined();
			expect(toggle.defaultContext.targetingKey).toBe("");
		});

		test("should create Toggle with undefined options", () => {
			const toggle = new Toggle(undefined);
			expect(toggle).toBeInstanceOf(Toggle);
			expect(toggle.publicApiKey).toBeUndefined();
			expect(toggle.defaultContext.targetingKey).toBe("");
		});

		test("should create Toggle with empty options object", () => {
			const options: ToggleOptions = {};
			const toggle = new Toggle(options);
			expect(toggle).toBeInstanceOf(Toggle);
			expect(toggle.publicApiKey).toBeUndefined();
			expect(toggle.defaultContext.targetingKey).toBe("");
		});

		test("should create Toggle with defaultContext option", () => {
			const customContext = getRandomToggleContext();
			const options: ToggleOptions = {
				defaultContext: customContext,
			};
			const toggle = new Toggle(options);
			expect(toggle).toBeInstanceOf(Toggle);
			expect(toggle.defaultContext).toBe(customContext);
			expect(toggle.defaultContext.targetingKey).toBe(
				customContext.targetingKey,
			);
			expect(toggle.defaultContext.ipAddress).toBe(customContext.ipAddress);
			expect(toggle.publicApiKey).toBeUndefined();
		});

		test("should create Toggle with publicApiKey option", () => {
			const options: ToggleOptions = {
				publicApiKey: "public_test-api-key",
			};
			const toggle = new Toggle(options);
			expect(toggle).toBeInstanceOf(Toggle);
			expect(toggle.publicApiKey).toBe("public_test-api-key");
			expect(toggle.defaultContext.targetingKey).toBe("");
		});

		test("should create Toggle with both defaultContext and publicApiKey options", () => {
			const customContext = getRandomToggleContext();
			const options: ToggleOptions = {
				defaultContext: customContext,
				publicApiKey: "public_comprehensive-key",
			};
			const toggle = new Toggle(options);
			expect(toggle).toBeInstanceOf(Toggle);
			expect(toggle.publicApiKey).toBe("public_comprehensive-key");
			expect(toggle.defaultContext).toBe(customContext);
			expect(toggle.defaultContext.targetingKey).toBe(
				customContext.targetingKey,
			);
			expect(toggle.defaultContext.user?.email).toBe(customContext.user?.email);
		});

		test("should not validate publicApiKey in constructor", () => {
			const options: ToggleOptions = {
				publicApiKey: "invalid-key-without-prefix",
			};
			expect(() => {
				new Toggle(options);
			}).not.toThrow();
			const toggle = new Toggle(options);
			expect(toggle.publicApiKey).toBe("invalid-key-without-prefix");
		});
	});

	describe("publicApiKey property", () => {
		test("should return undefined by default", () => {
			const toggle = new Toggle();
			expect(toggle.publicApiKey).toBeUndefined();
		});

		test("should allow getting the publicApiKey property", () => {
			const toggle = new Toggle();
			const apiKey = toggle.publicApiKey;
			expect(apiKey).toBeUndefined();
		});

		test("should allow setting the publicApiKey property", () => {
			const toggle = new Toggle();
			const testApiKey = "public_test-api-key-123";
			toggle.publicApiKey = testApiKey;
			expect(toggle.publicApiKey).toBe(testApiKey);
		});

		test("should allow setting publicApiKey to undefined", () => {
			const toggle = new Toggle();
			toggle.publicApiKey = "public_test-key";
			toggle.publicApiKey = undefined;
			expect(toggle.publicApiKey).toBeUndefined();
		});

		test("should maintain the same publicApiKey value when accessed multiple times", () => {
			const toggle = new Toggle();
			const testApiKey = "public_consistent-api-key";
			toggle.publicApiKey = testApiKey;
			const key1 = toggle.publicApiKey;
			const key2 = toggle.publicApiKey;
			expect(key1).toBe(key2);
			expect(key1).toBe(testApiKey);
		});

		test("should update publicApiKey property when set to a new value", () => {
			const toggle = new Toggle();
			const originalKey = "public_original-key";
			const newKey = "public_new-key";
			toggle.publicApiKey = originalKey;
			expect(toggle.publicApiKey).toBe(originalKey);
			toggle.publicApiKey = newKey;
			expect(toggle.publicApiKey).toBe(newKey);
			expect(toggle.publicApiKey).not.toBe(originalKey);
		});

		test("should throw error when publicApiKey does not start with 'public_'", () => {
			const toggle = new Toggle();
			expect(() => {
				toggle.publicApiKey = "invalid-key";
			}).toThrow("Public API key must start with 'public_'");
		});

		test("should throw error when publicApiKey starts with different prefix", () => {
			const toggle = new Toggle();
			expect(() => {
				toggle.publicApiKey = "private_some-key";
			}).toThrow("Public API key must start with 'public_'");
		});

		test("should throw error when publicApiKey is empty string", () => {
			const toggle = new Toggle();
			expect(() => {
				toggle.publicApiKey = "";
			}).toThrow("Public API key must start with 'public_'");
		});

		test("should accept publicApiKey that starts with 'public_'", () => {
			const toggle = new Toggle();
			const validKey = "public_valid-key-123";
			expect(() => {
				toggle.publicApiKey = validKey;
			}).not.toThrow();
			expect(toggle.publicApiKey).toBe(validKey);
		});

		test("should accept undefined publicApiKey without throwing", () => {
			const toggle = new Toggle();
			expect(() => {
				toggle.publicApiKey = undefined;
			}).not.toThrow();
			expect(toggle.publicApiKey).toBeUndefined();
		});
	});

	describe("defaultContext property", () => {
		test("should return default context with empty targetingKey", () => {
			const toggle = new Toggle();
			const context = toggle.defaultContext;
			expect(context).toBeDefined();
			expect(context.targetingKey).toBe("");
		});

		test("should allow getting the defaultContext property", () => {
			const toggle = new Toggle();
			const context = toggle.defaultContext;
			expect(context).toBeDefined();
			expect(typeof context).toBe("object");
			expect(context).toHaveProperty("targetingKey");
		});

		test("should allow setting the defaultContext property", () => {
			const toggle = new Toggle();
			const customContext = getRandomToggleContext();
			toggle.defaultContext = customContext;
			expect(toggle.defaultContext).toBe(customContext);
			expect(toggle.defaultContext.targetingKey).toBe(
				customContext.targetingKey,
			);
			expect(toggle.defaultContext.ipAddress).toBe(customContext.ipAddress);
		});

		test("should maintain the same defaultContext when accessed multiple times", () => {
			const toggle = new Toggle();
			const context1 = toggle.defaultContext;
			const context2 = toggle.defaultContext;
			expect(context1).toBe(context2);
		});

		test("should update defaultContext property when set to a new value", () => {
			const toggle = new Toggle();
			const originalContext = toggle.defaultContext;
			const newContext = getRandomToggleContext();
			toggle.defaultContext = newContext;
			expect(toggle.defaultContext).not.toBe(originalContext);
			expect(toggle.defaultContext).toBe(newContext);
			expect(toggle.defaultContext.targetingKey).toBe(newContext.targetingKey);
		});

		test("should handle complex defaultContext with all properties", () => {
			const toggle = new Toggle();
			// Using specific index for edge case user to test complex nested data structures
			const complexContext = mockToggleContexts[9];
			toggle.defaultContext = complexContext;
			expect(toggle.defaultContext).toBe(complexContext);
			expect(toggle.defaultContext.user?.customAttributes?.tags).toEqual([
				"vip",
				"beta-tester",
				"early-adopter",
			]);
			expect(toggle.defaultContext.customAttributes?.complexData).toEqual({
				nested: {
					value: "deep-nested-value",
					array: [1, 2, 3],
				},
			});
		});
	});

	describe("horizonUrls property", () => {
		test("should return empty array by default", () => {
			const toggle = new Toggle();
			expect(toggle.horizonUrls).toEqual([]);
		});

		test("should be set when constructor receives horizonUrls option", () => {
			const testUrls = [
				"https://org1.toggle.hyphen.cloud",
				"https://org2.toggle.hyphen.cloud",
			];
			const toggle = new Toggle({ horizonUrls: testUrls });
			expect(toggle.horizonUrls).toEqual(testUrls);
		});

		test("should remain empty when constructor receives no horizonUrls", () => {
			const toggle = new Toggle({ publicApiKey: "public_test-key" });
			expect(toggle.horizonUrls).toEqual(["https://toggle.hyphen.cloud"]);
		});

		test("should allow getting the horizonUrls property", () => {
			const toggle = new Toggle();
			const urls = toggle.horizonUrls;
			expect(urls).toEqual([]);
			expect(Array.isArray(urls)).toBe(true);
		});

		test("should allow setting the horizonUrls property", () => {
			const toggle = new Toggle();
			const testUrls = ["https://test.toggle.hyphen.cloud"];
			toggle.horizonUrls = testUrls;
			expect(toggle.horizonUrls).toEqual(testUrls);
		});

		test("should allow setting horizonUrls to empty array", () => {
			const toggle = new Toggle();
			const testUrls = ["https://test.toggle.hyphen.cloud"];
			toggle.horizonUrls = testUrls;
			toggle.horizonUrls = [];
			expect(toggle.horizonUrls).toEqual([]);
		});

		test("should maintain the same horizonUrls array when accessed multiple times", () => {
			const toggle = new Toggle();
			const testUrls = [
				"https://endpoint1.hyphen.cloud",
				"https://endpoint2.hyphen.cloud",
			];
			toggle.horizonUrls = testUrls;
			const urls1 = toggle.horizonUrls;
			const urls2 = toggle.horizonUrls;
			expect(urls1).toBe(urls2);
			expect(urls1).toEqual(testUrls);
		});

		test("should update horizonUrls property when set to a new array", () => {
			const toggle = new Toggle();
			const originalUrls = ["https://original.hyphen.cloud"];
			const newUrls = [
				"https://new1.hyphen.cloud",
				"https://new2.hyphen.cloud",
			];
			toggle.horizonUrls = originalUrls;
			expect(toggle.horizonUrls).toEqual(originalUrls);
			toggle.horizonUrls = newUrls;
			expect(toggle.horizonUrls).toEqual(newUrls);
			expect(toggle.horizonUrls).not.toEqual(originalUrls);
		});

		test("should handle single URL in array", () => {
			const toggle = new Toggle();
			const singleUrl = ["https://single.toggle.hyphen.cloud"];
			toggle.horizonUrls = singleUrl;
			expect(toggle.horizonUrls).toEqual(singleUrl);
			expect(toggle.horizonUrls.length).toBe(1);
		});

		test("should handle multiple URLs with different formats", () => {
			const toggle = new Toggle();
			const mixedUrls = [
				"https://prod.toggle.hyphen.cloud",
				"http://staging.toggle.hyphen.cloud",
				"https://org-123.toggle.hyphen.cloud",
				"https://api.custom-domain.com/toggle",
			];
			toggle.horizonUrls = mixedUrls;
			expect(toggle.horizonUrls).toEqual(mixedUrls);
			expect(toggle.horizonUrls.length).toBe(4);
		});

		test("should handle very large URL array", () => {
			const toggle = new Toggle();
			const largeUrlArray = Array.from(
				{ length: 100 },
				(_, i) => `https://endpoint-${i}.toggle.hyphen.cloud`,
			);
			toggle.horizonUrls = largeUrlArray;
			expect(toggle.horizonUrls).toEqual(largeUrlArray);
			expect(toggle.horizonUrls.length).toBe(100);
		});

		test("should not interfere with other properties", () => {
			const toggle = new Toggle();
			const testUrls = ["https://test.hyphen.cloud"];
			const testContext = getRandomToggleContext();
			const testOrgId = "test-org";

			toggle.horizonUrls = testUrls;
			toggle.defaultContext = testContext;
			toggle.organizationId = testOrgId;

			expect(toggle.horizonUrls).toEqual(testUrls);
			expect(toggle.defaultContext).toBe(testContext);
			expect(toggle.organizationId).toBe(testOrgId);
		});

		test("should work with constructor containing all options", () => {
			const testUrls = [
				"https://primary.toggle.hyphen.cloud",
				"https://secondary.toggle.hyphen.cloud",
			];
			const testContext = getRandomToggleContext();
			const toggle = new Toggle({
				publicApiKey: "public_test-comprehensive-key",
				defaultContext: testContext,
				horizonUrls: testUrls,
			});

			expect(toggle.horizonUrls).toEqual(testUrls);
			expect(toggle.defaultContext).toBe(testContext);
			expect(toggle.publicApiKey).toBe("public_test-comprehensive-key");
		});

		test("should handle URLs with query parameters and paths", () => {
			const toggle = new Toggle();
			const complexUrls = [
				"https://api.hyphen.cloud/v1/toggle?version=latest",
				"https://cdn.hyphen.cloud/toggle/endpoint",
				"https://backup.hyphen.cloud:8443/api/toggle",
			];
			toggle.horizonUrls = complexUrls;
			expect(toggle.horizonUrls).toEqual(complexUrls);
		});
	});

	describe("organizationId property", () => {
		test("should return undefined by default", () => {
			const toggle = new Toggle();
			expect(toggle.organizationId).toBeUndefined();
		});

		test("should be set when constructor receives valid publicApiKey", () => {
			const orgId = "test-org";
			const validKey = `public_${Buffer.from(`${orgId}:some-secret`).toString("base64")}`;
			const toggle = new Toggle({ publicApiKey: validKey });
			expect(toggle.organizationId).toBe(orgId);
		});

		test("should remain undefined when constructor receives invalid publicApiKey", () => {
			const toggle = new Toggle({ publicApiKey: "invalid-key" });
			expect(toggle.organizationId).toBeUndefined();
		});

		test("should allow getting the organizationId property", () => {
			const toggle = new Toggle();
			const orgId = toggle.organizationId;
			expect(orgId).toBeUndefined();
		});

		test("should allow setting the organizationId property", () => {
			const toggle = new Toggle();
			const testOrgId = "test-org-123";
			toggle.organizationId = testOrgId;
			expect(toggle.organizationId).toBe(testOrgId);
		});

		test("should allow setting organizationId to undefined", () => {
			const toggle = new Toggle();
			toggle.organizationId = "test-org";
			toggle.organizationId = undefined;
			expect(toggle.organizationId).toBeUndefined();
		});

		test("should maintain the same organizationId value when accessed multiple times", () => {
			const toggle = new Toggle();
			const testOrgId = "consistent-org-id";
			toggle.organizationId = testOrgId;
			const orgId1 = toggle.organizationId;
			const orgId2 = toggle.organizationId;
			expect(orgId1).toBe(orgId2);
			expect(orgId1).toBe(testOrgId);
		});

		test("should update organizationId property when set to a new value", () => {
			const toggle = new Toggle();
			const originalOrgId = "original-org";
			const newOrgId = "new-org";
			toggle.organizationId = originalOrgId;
			expect(toggle.organizationId).toBe(originalOrgId);
			toggle.organizationId = newOrgId;
			expect(toggle.organizationId).toBe(newOrgId);
			expect(toggle.organizationId).not.toBe(originalOrgId);
		});

		test("should handle complex organizationId values", () => {
			const toggle = new Toggle();
			const complexOrgId = "complex-org_123-test";
			toggle.organizationId = complexOrgId;
			expect(toggle.organizationId).toBe(complexOrgId);
		});

		test("should handle numeric organizationId values", () => {
			const toggle = new Toggle();
			const numericOrgId = "123456";
			toggle.organizationId = numericOrgId;
			expect(toggle.organizationId).toBe(numericOrgId);
		});

		test("should handle single character organizationId", () => {
			const toggle = new Toggle();
			const singleCharOrgId = "a";
			toggle.organizationId = singleCharOrgId;
			expect(toggle.organizationId).toBe(singleCharOrgId);
		});

		test("should handle empty string organizationId", () => {
			const toggle = new Toggle();
			const emptyOrgId = "";
			toggle.organizationId = emptyOrgId;
			expect(toggle.organizationId).toBe(emptyOrgId);
		});

		test("should not interfere with other properties", () => {
			const toggle = new Toggle();
			const testOrgId = "test-org";
			const testContext = getRandomToggleContext();

			toggle.organizationId = testOrgId;
			toggle.defaultContext = testContext;

			expect(toggle.organizationId).toBe(testOrgId);
			expect(toggle.defaultContext).toBe(testContext);
		});
	});

	describe("getOrgIdFromPublicKey", () => {
		test("should extract org ID from valid public key", () => {
			const toggle = new Toggle();
			const orgId = "test-org";
			const validKey = `public_${Buffer.from(`${orgId}:some-secret`).toString("base64")}`;
			expect(toggle.getOrgIdFromPublicKey(validKey)).toBe(orgId);
		});

		test("should handle public key without prefix", () => {
			const toggle = new Toggle();
			const orgId = "org-without-prefix";
			const keyWithoutPrefix = Buffer.from(`${orgId}:secret-data`).toString(
				"base64",
			);
			expect(toggle.getOrgIdFromPublicKey(keyWithoutPrefix)).toBe(orgId);
		});

		test("should return undefined for malformed base64", () => {
			const toggle = new Toggle();
			expect(
				toggle.getOrgIdFromPublicKey("public_invalid-base64!"),
			).toBeUndefined();
		});

		test("should return undefined for empty decoded content", () => {
			const toggle = new Toggle();
			const emptyKey = `public_${Buffer.from("").toString("base64")}`;
			expect(toggle.getOrgIdFromPublicKey(emptyKey)).toBeUndefined();
		});

		test("should return undefined for decoded content without colon", () => {
			const toggle = new Toggle();
			const keyWithoutColon = `public_${Buffer.from("orgidwithoutcolon").toString("base64")}`;
			expect(toggle.getOrgIdFromPublicKey(keyWithoutColon)).toBe(
				"orgidwithoutcolon",
			);
		});

		test("should handle org ID with valid characters", () => {
			const toggle = new Toggle();
			const orgId = "valid_org-123";
			const validKey = `public_${Buffer.from(`${orgId}:data`).toString("base64")}`;
			expect(toggle.getOrgIdFromPublicKey(validKey)).toBe(orgId);
		});

		test("should return undefined for org ID with invalid characters", () => {
			const toggle = new Toggle();
			const invalidOrgId = "org@invalid#chars";
			const invalidKey = `public_${Buffer.from(`${invalidOrgId}:data`).toString("base64")}`;
			expect(toggle.getOrgIdFromPublicKey(invalidKey)).toBeUndefined();
		});

		test("should handle org ID with spaces (invalid)", () => {
			const toggle = new Toggle();
			const orgIdWithSpaces = "org with spaces";
			const keyWithSpaces = `public_${Buffer.from(`${orgIdWithSpaces}:data`).toString("base64")}`;
			expect(toggle.getOrgIdFromPublicKey(keyWithSpaces)).toBeUndefined();
		});

		test("should handle multiple colons in decoded content", () => {
			const toggle = new Toggle();
			const orgId = "multi-colon-org";
			const keyWithMultipleColons = `public_${Buffer.from(`${orgId}:secret:extra:data`).toString("base64")}`;
			expect(toggle.getOrgIdFromPublicKey(keyWithMultipleColons)).toBe(orgId);
		});

		test("should handle empty org ID", () => {
			const toggle = new Toggle();
			const emptyOrgKey = `public_${Buffer.from(":secret-data").toString("base64")}`;
			expect(toggle.getOrgIdFromPublicKey(emptyOrgKey)).toBeUndefined();
		});

		test("should handle numeric org ID", () => {
			const toggle = new Toggle();
			const numericOrgId = "123456";
			const numericKey = `public_${Buffer.from(`${numericOrgId}:data`).toString("base64")}`;
			expect(toggle.getOrgIdFromPublicKey(numericKey)).toBe(numericOrgId);
		});

		test("should handle very long org ID", () => {
			const toggle = new Toggle();
			const longOrgId = "a".repeat(100);
			const longKey = `public_${Buffer.from(`${longOrgId}:data`).toString("base64")}`;
			expect(toggle.getOrgIdFromPublicKey(longKey)).toBe(longOrgId);
		});

		test("should handle single character org ID", () => {
			const toggle = new Toggle();
			const singleCharOrgId = "a";
			const singleCharKey = `public_${Buffer.from(`${singleCharOrgId}:data`).toString("base64")}`;
			expect(toggle.getOrgIdFromPublicKey(singleCharKey)).toBe(singleCharOrgId);
		});

		test("should return undefined for null input", () => {
			const toggle = new Toggle();
			expect(() =>
				toggle.getOrgIdFromPublicKey(null as unknown as string),
			).not.toThrow();
		});

		test("should return undefined for undefined input", () => {
			const toggle = new Toggle();
			expect(() =>
				toggle.getOrgIdFromPublicKey(undefined as unknown as string),
			).not.toThrow();
		});

		test("should handle edge case with only public_ prefix", () => {
			const toggle = new Toggle();
			expect(toggle.getOrgIdFromPublicKey("public_")).toBeUndefined();
		});
	});

	describe("buildDefaultHorizonUrl", () => {
		test("should build URL with org ID from valid public key", () => {
			const toggle = new Toggle();
			const orgId = "test-org";
			const validKey = `public_${Buffer.from(`${orgId}:some-secret`).toString("base64")}`;
			expect(toggle.getDefaultHorizonUrl(validKey)).toBe(
				`https://${orgId}.toggle.hyphen.cloud`,
			);
		});

		test("should return default URL when org ID cannot be extracted", () => {
			const toggle = new Toggle();
			expect(toggle.getDefaultHorizonUrl("invalid-key")).toBe(
				"https://toggle.hyphen.cloud",
			);
		});

		test("should return default URL for malformed base64", () => {
			const toggle = new Toggle();
			expect(toggle.getDefaultHorizonUrl("public_invalid-base64!")).toBe(
				"https://toggle.hyphen.cloud",
			);
		});

		test("should build URL with complex org ID", () => {
			const toggle = new Toggle();
			const orgId = "my-org-123_test";
			const validKey = `public_${Buffer.from(`${orgId}:secret-data`).toString("base64")}`;
			expect(toggle.getDefaultHorizonUrl(validKey)).toBe(
				`https://${orgId}.toggle.hyphen.cloud`,
			);
		});

		test("should return default URL for org ID with invalid characters", () => {
			const toggle = new Toggle();
			const invalidOrgId = "org@invalid#chars";
			const invalidKey = `public_${Buffer.from(`${invalidOrgId}:data`).toString("base64")}`;
			expect(toggle.getDefaultHorizonUrl(invalidKey)).toBe(
				"https://toggle.hyphen.cloud",
			);
		});

		test("should return default URL for empty org ID", () => {
			const toggle = new Toggle();
			const emptyOrgKey = `public_${Buffer.from(":secret-data").toString("base64")}`;
			expect(toggle.getDefaultHorizonUrl(emptyOrgKey)).toBe(
				"https://toggle.hyphen.cloud",
			);
		});

		test("should build URL with numeric org ID", () => {
			const toggle = new Toggle();
			const numericOrgId = "123456";
			const numericKey = `public_${Buffer.from(`${numericOrgId}:data`).toString("base64")}`;
			expect(toggle.getDefaultHorizonUrl(numericKey)).toBe(
				`https://${numericOrgId}.toggle.hyphen.cloud`,
			);
		});

		test("should build URL with single character org ID", () => {
			const toggle = new Toggle();
			const singleCharOrgId = "a";
			const singleCharKey = `public_${Buffer.from(`${singleCharOrgId}:data`).toString("base64")}`;
			expect(toggle.getDefaultHorizonUrl(singleCharKey)).toBe(
				`https://${singleCharOrgId}.toggle.hyphen.cloud`,
			);
		});

		test("should return default URL for null input", () => {
			const toggle = new Toggle();
			expect(toggle.getDefaultHorizonUrl(null as unknown as string)).toBe(
				"https://toggle.hyphen.cloud",
			);
		});

		test("should return default URL for undefined input", () => {
			const toggle = new Toggle();
			expect(toggle.getDefaultHorizonUrl(undefined as unknown as string)).toBe(
				"https://toggle.hyphen.cloud",
			);
		});

		test("should return default URL for empty string", () => {
			const toggle = new Toggle();
			expect(toggle.getDefaultHorizonUrl("")).toBe(
				"https://toggle.hyphen.cloud",
			);
		});

		test("should handle key without prefix", () => {
			const toggle = new Toggle();
			const orgId = "no-prefix-org";
			const keyWithoutPrefix = Buffer.from(`${orgId}:secret-data`).toString(
				"base64",
			);
			expect(toggle.getDefaultHorizonUrl(keyWithoutPrefix)).toBe(
				`https://${orgId}.toggle.hyphen.cloud`,
			);
		});
	});
});
