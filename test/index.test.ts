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
			const testApiKey = "test-api-key-123";
			toggle.publicApiKey = testApiKey;
			expect(toggle.publicApiKey).toBe(testApiKey);
		});

		test("should allow setting publicApiKey to undefined", () => {
			const toggle = new Toggle();
			toggle.publicApiKey = "test-key";
			toggle.publicApiKey = undefined;
			expect(toggle.publicApiKey).toBeUndefined();
		});

		test("should maintain the same publicApiKey value when accessed multiple times", () => {
			const toggle = new Toggle();
			const testApiKey = "consistent-api-key";
			toggle.publicApiKey = testApiKey;
			const key1 = toggle.publicApiKey;
			const key2 = toggle.publicApiKey;
			expect(key1).toBe(key2);
			expect(key1).toBe(testApiKey);
		});

		test("should update publicApiKey property when set to a new value", () => {
			const toggle = new Toggle();
			const originalKey = "original-key";
			const newKey = "new-key";
			toggle.publicApiKey = originalKey;
			expect(toggle.publicApiKey).toBe(originalKey);
			toggle.publicApiKey = newKey;
			expect(toggle.publicApiKey).toBe(newKey);
			expect(toggle.publicApiKey).not.toBe(originalKey);
		});
	});
});
