/** Opaque tree tag + uint64 offer ID. Do not decode this name as UTF-8. */
export declare function hyperSwapRootName(id: bigint | number, participants: boolean): Uint8Array;
/** Meta/MetaMerkles root box for a HyperSwap application address and offer ID. */
export declare function hyperSwapRootBoxName(address: string, id: bigint | number, participants: boolean, layout?: "Meta" | "MetaMerkles"): Uint8Array;
