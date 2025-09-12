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
});
