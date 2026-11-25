export type Bytes = Uint8Array;
export type Slot = string | Uint8Array;
export declare const slotBytes: (slot: Slot) => Uint8Array;
export declare function concatBytes(...parts: Uint8Array[]): Uint8Array;
export declare function uint64Bytes(value: bigint | number): Uint8Array;
export declare function variationBoxName(asset: bigint | number, writer: string, slot: Slot): Uint8Array;
export declare const mainBoxName: (asset: bigint | number) => Uint8Array<ArrayBufferLike>;
export declare const assetPolicyBoxName: (asset: bigint | number) => Uint8Array<ArrayBufferLike>;
export declare const managerPolicyBoxName: (manager: string) => Uint8Array<ArrayBufferLike>;
export declare const grantBoxName: (holder: string) => Uint8Array<ArrayBufferLike>;
export type WriterSet = {
    mode: 'closed';
} | {
    mode: 'open';
} | {
    mode: 'allow';
    writers: string[];
} | {
    mode: 'delegate';
    app: bigint;
} | {
    mode: 'meta';
    root: Uint8Array;
};
export declare const CLOSED: WriterSet;
export declare const OPEN: WriterSet;
export declare function encodeWriterSet(set: WriterSet): Uint8Array;
/** Decode one writer set starting at `at`, returning it and its encoded length. */
export declare function decodeWriterSet(bytes: Uint8Array, at?: number): {
    set: WriterSet;
    length: number;
};
/**
 * The name of the registry-owned Meta root behind a `meta` writer set:
 * tag + base64url(sha256(box name)[0..18)), 25 ASCII bytes. The tag is `c`
 * (collectible set of a policy), `h` (holder set of a policy) or `g` (grant).
 */
export declare function metaRootName(tag: 'c' | 'h' | 'g', boxName: Uint8Array): string;
export type Variation = {
    format: number;
    locked: boolean;
    holderScope: boolean;
    kind: number;
    sub: number;
    revision: bigint;
    /** Holder scope only: the bound holder and the asset's decimals at write time. */
    holder?: string;
    decimals?: number;
    flat: Uint8Array;
    body: Uint8Array;
};
export declare function decodeVariation(value: Uint8Array): Variation;
export type Pin = {
    writer: string;
    slot: Uint8Array;
    sourceRevision: bigint;
    kind: number;
    sub: number;
    flat: Uint8Array;
};
/** Decode PinCore || flat, as stored in a main section or returned by getMain. */
export declare function decodePin(pin: Uint8Array): Pin;
export type MainBox = {
    creatorLocked: boolean;
    decimals: number;
    revision: bigint;
    creatorDeposit: bigint;
    holderDeposit: bigint;
    creator?: Pin;
    holder?: Pin & {
        holder: string;
    };
};
export declare function decodeMain(value: Uint8Array): MainBox;
export type Policy = {
    locked: boolean;
    managerWrites: boolean;
    holderPinsCollectibleOnly: boolean;
    revision: bigint;
    collectible: WriterSet;
    holder: WriterSet;
};
/** The policy an asset gets when neither `p` nor `P` exists. */
export declare const DEFAULT_POLICY: Policy;
export declare function decodePolicy(value: Uint8Array): Policy;
export type Grant = {
    revision: bigint;
    writers: WriterSet;
};
export declare function decodeGrant(value: Uint8Array): Grant;
/** The required deposit from a failed call's logs (`cv:deposit:` || amount), if it logged one. */
export declare function parseDepositLog(logs: Uint8Array[]): bigint | undefined;
