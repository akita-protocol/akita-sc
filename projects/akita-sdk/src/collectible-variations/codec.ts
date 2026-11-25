import { sha256 } from '@noble/hashes/sha2.js';
import { decodeAddress, encodeAddress } from 'algosdk';
import * as L from './layout';

/**
 * Encoders and decoders for the registry's box names, box values and writer
 * sets. Pure functions over bytes, safe in browsers (no Buffer).
 */

const text = new TextEncoder();

export type Bytes = Uint8Array;
export type Slot = string | Uint8Array;

export const slotBytes = (slot: Slot): Uint8Array => (typeof slot === 'string' ? text.encode(slot) : slot);

export function concatBytes(...parts: Uint8Array[]): Uint8Array {
  const out = new Uint8Array(parts.reduce((n, p) => n + p.length, 0));
  let at = 0;
  for (const p of parts) {
    out.set(p, at);
    at += p.length;
  }
  return out;
}

export function uint64Bytes(value: bigint | number): Uint8Array {
  const out = new Uint8Array(8);
  new DataView(out.buffer).setBigUint64(0, BigInt(value));
  return out;
}

const view = (b: Uint8Array) => new DataView(b.buffer, b.byteOffset, b.byteLength);
const u16 = (b: Uint8Array, at: number) => view(b).getUint16(at);
const u64 = (b: Uint8Array, at: number) => view(b).getBigUint64(at);
const addressAt = (b: Uint8Array, at: number) => encodeAddress(b.slice(at, at + 32));
const publicKey = (address: string) => decodeAddress(address).publicKey;

function checkSlot(slot: Uint8Array) {
  if (slot.length < 1 || slot.length > L.MaxSlotBytes) throw new Error(`Slot must be 1..${L.MaxSlotBytes} bytes`);
}

// BOX NAMES -----------------------------------------------------------------

export function variationBoxName(asset: bigint | number, writer: string, slot: Slot): Uint8Array {
  const s = slotBytes(slot);
  checkSlot(s);
  return concatBytes(text.encode(L.PrefixVariation), uint64Bytes(asset), publicKey(writer), s);
}
export const mainBoxName = (asset: bigint | number) => concatBytes(text.encode(L.PrefixMain), uint64Bytes(asset));
export const assetPolicyBoxName = (asset: bigint | number) => concatBytes(text.encode(L.PrefixAssetPolicy), uint64Bytes(asset));
export const managerPolicyBoxName = (manager: string) => concatBytes(text.encode(L.PrefixManagerPolicy), publicKey(manager));
export const grantBoxName = (holder: string) => concatBytes(text.encode(L.PrefixGrant), publicKey(holder));

// WRITER SETS ---------------------------------------------------------------

export type WriterSet =
  | { mode: 'closed' }
  | { mode: 'open' }
  | { mode: 'allow'; writers: string[] }
  | { mode: 'delegate'; app: bigint }
  | { mode: 'meta'; root: Uint8Array };

export const CLOSED: WriterSet = { mode: 'closed' };
export const OPEN: WriterSet = { mode: 'open' };

export function encodeWriterSet(set: WriterSet): Uint8Array {
  switch (set.mode) {
    case 'closed':
      return new Uint8Array([L.WriterSetClosed]);
    case 'open':
      return new Uint8Array([L.WriterSetOpen]);
    case 'allow':
      if (set.writers.length < 1 || set.writers.length > L.MaxAllowWriters) {
        throw new Error(`An allow set has 1..${L.MaxAllowWriters} writers; use a meta set for more`);
      }
      return concatBytes(new Uint8Array([L.WriterSetAllow, set.writers.length]), ...set.writers.map(publicKey));
    case 'delegate':
      if (set.app <= 0n) throw new Error('Delegate app must be nonzero');
      return concatBytes(new Uint8Array([L.WriterSetDelegate]), uint64Bytes(set.app));
    case 'meta':
      if (set.root.length !== 32 || set.root.every((b) => b === 0)) throw new Error('Meta root must be 32 nonzero bytes');
      return concatBytes(new Uint8Array([L.WriterSetMeta]), set.root);
  }
}

/** Decode one writer set starting at `at`, returning it and its encoded length. */
export function decodeWriterSet(bytes: Uint8Array, at = 0): { set: WriterSet; length: number } {
  const mode = bytes[at];
  switch (mode) {
    case L.WriterSetClosed:
      return { set: CLOSED, length: 1 };
    case L.WriterSetOpen:
      return { set: OPEN, length: 1 };
    case L.WriterSetAllow: {
      const n = bytes[at + 1];
      const writers = Array.from({ length: n }, (_, i) => addressAt(bytes, at + 2 + 32 * i));
      return { set: { mode: 'allow', writers }, length: 2 + 32 * n };
    }
    case L.WriterSetDelegate:
      return { set: { mode: 'delegate', app: u64(bytes, at + 1) }, length: 9 };
    case L.WriterSetMeta:
      return { set: { mode: 'meta', root: bytes.slice(at + 1, at + 33) }, length: 33 };
    default:
      throw new Error(`Unknown writer set mode ${mode}`);
  }
}

// META ROOT NAMES -----------------------------------------------------------

const BASE64URL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

/**
 * The name of the registry-owned Meta root behind a `meta` writer set:
 * tag + base64url(sha256(box name)[0..18)), 25 ASCII bytes. The tag is `c`
 * (collectible set of a policy), `h` (holder set of a policy) or `g` (grant).
 */
export function metaRootName(tag: 'c' | 'h' | 'g', boxName: Uint8Array): string {
  const hash = sha256(boxName).slice(0, L.MetaNameHashBytes);
  let out: string = tag;
  for (let i = 0; i < hash.length; i += 3) {
    const n = (hash[i] << 16) | (hash[i + 1] << 8) | hash[i + 2];
    out += BASE64URL[(n >> 18) & 63] + BASE64URL[(n >> 12) & 63] + BASE64URL[(n >> 6) & 63] + BASE64URL[n & 63];
  }
  return out;
}

// BOX VALUES ----------------------------------------------------------------

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

export function decodeVariation(value: Uint8Array): Variation {
  const flags = value[L.VFlags];
  const holderScope = (flags & L.FlagHolderScope) !== 0;
  const flatLength = u16(value, L.VFlatLen);
  const start = holderScope ? L.VFlatHolder : L.VFlatCollectible;
  return {
    format: value[0],
    locked: (flags & L.FlagLocked) !== 0,
    holderScope,
    kind: value[L.VKind],
    sub: value[L.VSub],
    revision: u64(value, L.VRevision),
    ...(holderScope && { holder: addressAt(value, L.VHolder), decimals: value[L.VDecimals] }),
    flat: value.slice(start, start + flatLength),
    body: value.slice(start + flatLength),
  };
}

export type Pin = {
  writer: string;
  slot: Uint8Array;
  sourceRevision: bigint;
  kind: number;
  sub: number;
  flat: Uint8Array;
};

/** Decode PinCore || flat, as stored in a main section or returned by arcTBD_get_main. */
export function decodePin(pin: Uint8Array): Pin {
  const slotLength = pin[L.PinSourceSlotLen];
  return {
    writer: addressAt(pin, L.PinSourceWriter),
    slot: pin.slice(L.PinSourceSlot, L.PinSourceSlot + slotLength),
    sourceRevision: u64(pin, L.PinSourceRevision),
    kind: pin[L.PinSourceKind],
    sub: pin[L.PinSourceSub],
    flat: pin.slice(L.PinFlat),
  };
}

export type MainBox = {
  creatorLocked: boolean;
  decimals: number;
  revision: bigint;
  creatorDeposit: bigint;
  holderDeposit: bigint;
  creator?: Pin;
  holder?: Pin & { holder: string };
};

export function decodeMain(value: Uint8Array): MainBox {
  const creatorLength = u16(value, L.MCreatorLen);
  const holderLength = u16(value, L.MHolderLen);
  const creator = value.slice(L.MSections, L.MSections + creatorLength);
  const holder = value.slice(L.MSections + creatorLength, L.MSections + creatorLength + holderLength);
  return {
    creatorLocked: (value[L.MFlags] & L.MainCreatorLocked) !== 0,
    decimals: value[L.MDecimals],
    revision: u64(value, L.MRevision),
    creatorDeposit: u64(value, L.MCreatorDeposit),
    holderDeposit: u64(value, L.MHolderDeposit),
    ...(creatorLength > 0 && { creator: decodePin(creator) }),
    ...(holderLength > 0 && {
      holder: { holder: addressAt(holder, 0), ...decodePin(holder.slice(L.HolderSectionPrefix)) },
    }),
  };
}

export type Policy = {
  locked: boolean;
  managerWrites: boolean;
  holderPinsCollectibleOnly: boolean;
  revision: bigint;
  collectible: WriterSet;
  holder: WriterSet;
};

/** The policy an asset gets when neither `p` nor `P` exists. */
export const DEFAULT_POLICY: Policy = {
  locked: false,
  managerWrites: true,
  holderPinsCollectibleOnly: false,
  revision: 0n,
  collectible: CLOSED,
  holder: CLOSED,
};

export function decodePolicy(value: Uint8Array): Policy {
  const flags = value[L.PFlags];
  const first = decodeWriterSet(value, L.PSets);
  const second = decodeWriterSet(value, L.PSets + first.length);
  return {
    locked: (flags & L.PolicyLocked) !== 0,
    managerWrites: (flags & L.PolicyManagerWrites) !== 0,
    holderPinsCollectibleOnly: (flags & L.PolicyHolderPinsCollectibleOnly) !== 0,
    revision: u64(value, L.PRevision),
    collectible: first.set,
    holder: second.set,
  };
}

export type Grant = { revision: bigint; writers: WriterSet };

export function decodeGrant(value: Uint8Array): Grant {
  return { revision: u64(value, L.GRevision), writers: decodeWriterSet(value, L.GSet).set };
}

// DEPOSITS ------------------------------------------------------------------

const depositPrefix = text.encode(L.DepositLogPrefix);

/** The required deposit from a failed call's logs (`cv:deposit:` || amount), if it logged one. */
export function parseDepositLog(logs: Uint8Array[]): bigint | undefined {
  for (const log of logs) {
    if (log.length !== depositPrefix.length + 8) continue;
    if (depositPrefix.every((b, i) => log[i] === b)) return u64(log, depositPrefix.length);
  }
  return undefined;
}
