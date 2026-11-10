import { ABIType, decodeAddress, encodeAddress } from "algosdk";

export type MetadataKey = string | Uint8Array;
export const METADATA_MAX_NAME_BYTES = 31;
export const METADATA_MAX_KEY_BYTES = 31;
export const METADATA_RECORD_HEADER_BYTES = 12;
export const METADATA_MAX_APP_ARGS_BYTES = 16384;
const RECORD_ARGUMENT_BYTES = 22;
const PLUGIN_RECORD_ARGUMENT_BYTES = 33;
export const METADATA_MAX_VALUE_BYTES = METADATA_MAX_APP_ARGS_BYTES - RECORD_ARGUMENT_BYTES - 1;
export const METADATA_FINAL_PART_BYTES = 4084;
export const METADATA_PART_BYTES = 4094;
/** Complete ABI reads are bounded separately from single-call writes. */
export const METADATA_INLINE_BYTES = 1024;
export const METADATA_CHUNK_BYTES = 1024;
const encoder = new TextEncoder();
const recordType = ABIType.from("(uint64,byte[])");

export function validateMetadataName(value: string): void {
  if (!value || encoder.encode(value).length > METADATA_MAX_NAME_BYTES)
    throw new Error("Metadata names must contain 1–31 UTF-8 bytes.");
}

export function metadataKeyBytes(key: MetadataKey): Uint8Array {
  const bytes = typeof key === "string" ? encoder.encode(key) : key;
  if (!bytes.length || bytes.length > METADATA_MAX_KEY_BYTES)
    throw new Error("Metadata keys must contain 1–31 bytes.");
  return bytes;
}
export function validateMetadataRecordKey(key: MetadataKey): void { metadataKeyBytes(key); }

/** Compact, unambiguous adapter convention: name byte length || name || key. */
export function metadataDataKey(name: string, key: string): Uint8Array {
  const namespace = encoder.encode(name), field = encoder.encode(key);
  if (namespace.length + field.length >= METADATA_MAX_KEY_BYTES)
    throw new Error("Metadata namespace and key must fit 30 UTF-8 bytes together.");
  return metadataKeyBytes(new Uint8Array([namespace.length, ...namespace, ...field]));
}

/** Full decoded address || caller-chosen key; no hash or ABI length prefix. */
export function metadataOwnerKey(account: string, key: MetadataKey): Uint8Array {
  return new Uint8Array([...decodeAddress(account).publicKey, ...metadataKeyBytes(key)]);
}

/** m || full decoded address || caller-chosen key. */
export function metadataBoxName(account: string, key: MetadataKey): Uint8Array {
  return new Uint8Array([0x6d, ...metadataOwnerKey(account, key)]);
}

/** Recover the complete owner and opaque key without fetching a box value. */
export function decodeMetadataBoxName(name: Uint8Array) {
  if (name.length < 34 || name.length > 64 || name[0] !== 0x6d)
    throw new Error("Invalid metadata box name.");
  return { account: encodeAddress(name.slice(1, 33)), key: name.slice(33) };
}

/** A single box read returns a coherent revision and value. */
export function decodeMetadataRecord(value: Uint8Array) {
  if (value.length < METADATA_RECORD_HEADER_BYTES) throw new Error("Invalid metadata record.");
  const [revision, data] = recordType.decode(value) as [bigint, number[]];
  return { exists: true, revision, data: Uint8Array.from(data) };
}

/** Payload budget after selector, key, revision, and four ARC-4 array prefixes. */
export function metadataValueLimit(key: MetadataKey): number {
  return METADATA_MAX_APP_ARGS_BYTES - RECORD_ARGUMENT_BYTES - metadataKeyBytes(key).length;
}

/** The wallet plugin's wallet ID, boolean, and namespace consume additional argument bytes. */
export function metadataPluginValueLimit(namespace: string, key: string): number {
  const recordKey = metadataDataKey(namespace, key);
  return METADATA_MAX_APP_ARGS_BYTES - PLUGIN_RECORD_ARGUMENT_BYTES - (recordKey.length - 1);
}

export function validateMetadataValueSize(size: number, limit = METADATA_MAX_VALUE_BYTES): void {
  if (!Number.isInteger(size) || size < 0 || size > limit)
    throw new Error(`Metadata values must contain at most ${limit} bytes for this call.`);
}

/** Four arguments in the same call; the stored data remains one contiguous byte array. */
export function metadataDataParts(data: Uint8Array) {
  validateMetadataValueSize(data.length);
  const part = METADATA_PART_BYTES;
  return {
    data0: data.slice(0, part),
    data1: data.slice(part, 2 * part),
    data2: data.slice(2 * part, 3 * part),
    data3: data.slice(3 * part),
  };
}
export function metadataStorageCost(size: number, key: MetadataKey): bigint {
  validateMetadataValueSize(size, metadataValueLimit(key));
  return 2500n + 400n * BigInt(33 + metadataKeyBytes(key).length + METADATA_RECORD_HEADER_BYTES + size);
}

export const RECEIVE_QR_RECORD = { key: metadataDataKey("akita.receive-qr", "style") } as const;
export const ACCOUNT_IMAGE_RECORD = { key: metadataDataKey("akita.account", "image") } as const;

export function encodeMetadataJson(value: unknown): Uint8Array {
  const json = JSON.stringify(value);
  if (json === undefined) throw new Error("A JSON value is required.");
  const bytes = encoder.encode(json);
  validateMetadataValueSize(bytes.length);
  return bytes;
}
