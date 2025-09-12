import { Net } from "@cacheable/net";
import { describe, expect, test } from "vitest";
import { Toggle } from "../src/index.js";

describe("Hyphen sdk", () => {
	test("should create an instance of Toggle", () => {
		const toggle = new Toggle();
		expect(toggle).toBeInstanceOf(Toggle);
	});

	describe("net property", () => {
		test("should return a Net instance by default", () => {
			const toggle = new Toggle();
			expect(toggle.net).toBeInstanceOf(Net);
		});

		test("should allow getting the net property", () => {
			const toggle = new Toggle();
			const net = toggle.net;
			expect(net).toBeDefined();
			expect(typeof net).toBe("object");
		});

		test("should allow setting the net property", () => {
			const toggle = new Toggle();
			const customNet = new Net();
			toggle.net = customNet;
			expect(toggle.net).toBe(customNet);
		});

		test("should maintain the same net instance when accessed multiple times", () => {
			const toggle = new Toggle();
			const net1 = toggle.net;
			const net2 = toggle.net;
			expect(net1).toBe(net2);
		});

		test("should update net property when set to a new instance", () => {
			const toggle = new Toggle();
			const originalNet = toggle.net;
			const newNet = new Net();
			toggle.net = newNet;
			expect(toggle.net).not.toBe(originalNet);
			expect(toggle.net).toBe(newNet);
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
});
