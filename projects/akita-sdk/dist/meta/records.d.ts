export type MetadataKey = string | Uint8Array;
export declare const METADATA_MAX_NAME_BYTES = 31;
export declare const METADATA_MAX_KEY_BYTES = 31;
export declare const METADATA_RECORD_HEADER_BYTES = 12;
export declare const METADATA_MAX_APP_ARGS_BYTES = 16384;
export declare const METADATA_MAX_VALUE_BYTES: number;
export declare const METADATA_FINAL_PART_BYTES = 4084;
export declare const METADATA_PART_BYTES = 4094;
/** Complete ABI reads are bounded separately from single-call writes. */
export declare const METADATA_INLINE_BYTES = 1024;
export declare const METADATA_CHUNK_BYTES = 1024;
export declare function validateMetadataName(value: string): void;
export declare function metadataKeyBytes(key: MetadataKey): Uint8Array;
export declare function validateMetadataRecordKey(key: MetadataKey): void;
/** Compact, unambiguous adapter convention: name byte length || name || key. */
export declare function metadataDataKey(name: string, key: string): Uint8Array;
/** Full decoded address || caller-chosen key; no hash or ABI length prefix. */
export declare function metadataOwnerKey(account: string, key: MetadataKey): Uint8Array;
/** m || full decoded address || caller-chosen key. */
export declare function metadataBoxName(account: string, key: MetadataKey): Uint8Array;
/** Recover the complete owner and opaque key without fetching a box value. */
export declare function decodeMetadataBoxName(name: Uint8Array): {
    account: string;
    key: Uint8Array<ArrayBuffer>;
};
/** A single box read returns a coherent revision and value. */
export declare function decodeMetadataRecord(value: Uint8Array): {
    exists: boolean;
    revision: bigint;
    data: Uint8Array<ArrayBuffer>;
};
/** Payload budget after selector, key, revision, and four ARC-4 array prefixes. */
export declare function metadataValueLimit(key: MetadataKey): number;
/** The wallet plugin's wallet ID, boolean, and namespace consume additional argument bytes. */
export declare function metadataPluginValueLimit(namespace: string, key: string): number;
export declare function validateMetadataValueSize(size: number, limit?: number): void;
/** Four arguments in the same call; the stored data remains one contiguous byte array. */
export declare function metadataDataParts(data: Uint8Array): {
    data0: Uint8Array<ArrayBuffer>;
    data1: Uint8Array<ArrayBuffer>;
    data2: Uint8Array<ArrayBuffer>;
    data3: Uint8Array<ArrayBuffer>;
};
export declare function metadataStorageCost(size: number, key: MetadataKey): bigint;
export declare const RECEIVE_QR_RECORD: {
    readonly key: Uint8Array<ArrayBufferLike>;
};
export declare const ACCOUNT_IMAGE_RECORD: {
    readonly key: Uint8Array<ArrayBufferLike>;
};
export declare function encodeMetadataJson(value: unknown): Uint8Array;
