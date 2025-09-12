import { type CacheableNet, Net } from "@cacheable/net";
import { Hookified } from "hookified";

export class Toggle extends Hookified {
	private _net = new Net();

	public get net(): CacheableNet {
		return this._net;
	}

	public set net(value: CacheableNet) {
		this._net = value;
	}
}
