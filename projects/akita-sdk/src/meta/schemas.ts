import { isValidAddress } from "algosdk";
import { encodeMetadataJson, METADATA_MAX_VALUE_BYTES } from "./records";

/** Roundness matches Akita's renderer: 0 is circular, 1 is square. */
export interface ReceiveQrStyleV1 {
  version: 1;
  background: string;
  foreground: "auto" | string;
  moduleRoundness: number;
  finderRoundness: number;
  showAvatar: boolean;
}

export type AccountImageReferenceV1 = {
  version: 1;
  source: { type: "uri"; uri: string; sha256?: string } | { type: "asset"; assetId: string } | { type: "account"; address: string };
};

const color = /^#[0-9a-fA-F]{6}$/;
const uint64 = /^[1-9][0-9]{0,19}$/;

function object(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasOnly(value: Record<string, unknown>, keys: string[]): boolean {
  return Object.keys(value).every((key) => keys.includes(key));
}

function roundness(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= 1;
}

export function isReceiveQrStyleV1(value: unknown): value is ReceiveQrStyleV1 {
  return (
    object(value) &&
    hasOnly(value, ["version", "background", "foreground", "moduleRoundness", "finderRoundness", "showAvatar"]) &&
    value.version === 1 &&
    typeof value.background === "string" &&
    color.test(value.background) &&
    typeof value.foreground === "string" &&
    (value.foreground === "auto" || color.test(value.foreground)) &&
    roundness(value.moduleRoundness) &&
    roundness(value.finderRoundness) &&
    typeof value.showAvatar === "boolean"
  );
}

export function isAccountImageReferenceV1(value: unknown): value is AccountImageReferenceV1 {
  if (!object(value) || !hasOnly(value, ["version", "source"]) || value.version !== 1 || !object(value.source)) return false;
  const source = value.source;
  if (source.type === "uri") {
    return (
      hasOnly(source, ["type", "uri", "sha256"]) &&
      typeof source.uri === "string" &&
      /^(https:\/\/[^/?#\s]+|ipfs:\/\/[^/?#\s]+|ar:\/\/[^/?#\s]+)([^\s]*)$/.test(source.uri) &&
      (source.sha256 === undefined || (typeof source.sha256 === "string" && /^[0-9a-fA-F]{64}$/.test(source.sha256)))
    );
  }
  if (source.type === "asset") {
    return (
      hasOnly(source, ["type", "assetId"]) &&
      typeof source.assetId === "string" &&
      uint64.test(source.assetId) &&
      BigInt(source.assetId) <= 0xffffffffffffffffn
    );
  }
  return (
    source.type === "account" &&
    hasOnly(source, ["type", "address"]) &&
    typeof source.address === "string" &&
    isValidAddress(source.address)
  );
}

function parse<T>(data: Uint8Array, valid: (value: unknown) => value is T): T | undefined {
  if (data.length > METADATA_MAX_VALUE_BYTES) return undefined;
  try {
    const value: unknown = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(data));
    return valid(value) ? value : undefined;
  } catch {
    return undefined;
  }
}

export const parseReceiveQrStyle = (data: Uint8Array) => parse(data, isReceiveQrStyleV1);
export const parseAccountImageReference = (data: Uint8Array) => parse(data, isAccountImageReferenceV1);

export function encodeReceiveQrStyle(value: ReceiveQrStyleV1): Uint8Array {
  if (!isReceiveQrStyleV1(value)) throw new Error("Invalid receive QR style v1.");
  return encodeMetadataJson(value);
}

export function encodeAccountImageReference(value: AccountImageReferenceV1): Uint8Array {
  if (!isAccountImageReferenceV1(value)) throw new Error("Invalid account image reference v1.");
  return encodeMetadataJson(value);
}
