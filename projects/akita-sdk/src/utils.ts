import algosdk from "algosdk";
import { randomBytes as nobleRandomBytes } from "@noble/hashes/utils";
import {
  ABIStructType,
  ABIType,
  ABIValue,
  StructField,
  getABIDecodedValue as getABIDecodedValueRaw,
  getABIEncodedValue as getABIEncodedValueRaw,
  getTupleValueFromStructValue,
} from "@algorandfoundation/algokit-utils/abi";
import { decodeTransaction } from "@algorandfoundation/algokit-utils/transact";

/**
 * Local alias for the struct-shaped ABIValue. The upstream
 * @algorandfoundation/algokit-utils/abi module defines this type in
 * abi-value.d.ts but doesn't re-export it from the public /abi index,
 * so we mirror it here to preserve the ergonomic name.
 */
export type ABIStructValue = {
  [key: string]: ABIValue;
};

export function convertToUnixTimestamp(timestamp: bigint): bigint {
  return timestamp * 1_000n;
}

export function convertFromUnixTimestamp(timestamp: bigint): bigint {
  return timestamp / 1_000n;
}

export function assertByteArrayLength(value: Uint8Array, name: string, length: number): void {
  if (!(value instanceof Uint8Array) || value.length !== length) {
    throw new Error(`${name} must be ${length} bytes`);
  }
}

export function randomByteArray(length: number): Uint8Array {
  return nobleRandomBytes(length);
}

/**
 * Reorders a struct-shaped value so its keys are in the exact order declared by the
 * struct definition, and drops any keys that aren't part of the struct. Also recurses
 * into nested struct-typed fields.
 *
 * This is required because algokit-utils' `getTupleValueFromStructValue` internally
 * calls `Object.values(structValue)` and maps positionally against the struct's
 * `structFields` — it does NOT look up by name. Any extra field or misordered field
 * in the source object shifts the tuple and produces wildly wrong encodings (e.g.
 * "Cannot encode value as byte[32]:" when an empty `escrow` string lands where
 * `executionKey` was expected because an extra `caller` field shifted everything).
 */
function reorderStructValue(
  value: ABIStructValue,
  fields: StructField[],
  structs: Record<string, StructField[]>,
): ABIStructValue {
  const ordered: ABIStructValue = {};
  for (const field of fields) {
    const fieldValue = value[field.name];
    // Recurse into nested struct-typed fields referenced by struct name
    if (
      typeof field.type === 'string' &&
      field.type in structs &&
      fieldValue !== undefined &&
      fieldValue !== null &&
      typeof fieldValue === 'object' &&
      !Array.isArray(fieldValue) &&
      !(fieldValue instanceof Uint8Array)
    ) {
      ordered[field.name] = reorderStructValue(
        fieldValue as ABIStructValue,
        structs[field.type],
        structs,
      );
    } else {
      ordered[field.name] = fieldValue;
    }
  }
  return ordered;
}

/**
 * The utils10 `getABIEncodedValue`/`getABIDecodedValue` accept either:
 *   - one of the special "AVM type" string literals ("AVMString", "AVMBytes", "AVMUint64")
 *   - or an `ABIType` instance (NOT an ARC-4 type string)
 *
 * The legacy v9 API let you pass ARC-4 type strings like "uint64" or
 * "((uint64,string),uint8,uint64)[]" directly. Our compat wrappers preserve that
 * convenience by parsing the string into an `ABIType` via `ABIType.from(typeName)`
 * when it isn't a struct name and isn't an AVM type.
 */
const AVM_TYPE_NAMES = new Set(["AVMString", "AVMBytes", "AVMUint64"]);

/**
 * Compatibility wrapper for the old `getABIEncodedValue(value, typeName, structs)` signature
 * from algokit-utils v9. Internally constructs an ABIStructType or ABIType and delegates
 * to the v10 `getABIEncodedValue(type, value)` API.
 */
export function encodeABIValue(
  value: ABIValue | ABIStructValue,
  typeName: string,
  structs: Record<string, StructField[]>,
): Uint8Array {
  // If the caller passed a struct name, build the struct type and convert the value
  if (typeName in structs) {
    const structType = ABIStructType.fromStruct(typeName, structs);
    // Reorder to match struct field order and drop extra properties — utils10 maps
    // by position, not name, so source-object key order matters here.
    const orderedValue = reorderStructValue(
      value as ABIStructValue,
      structs[typeName],
      structs,
    );
    const tupleValue = getTupleValueFromStructValue(structType, orderedValue);
    return getABIEncodedValueRaw(structType, tupleValue);
  }
  // AVM type literals pass through unchanged
  if (AVM_TYPE_NAMES.has(typeName)) {
    return getABIEncodedValueRaw(typeName as never, value as ABIValue);
  }
  // Otherwise treat the typeName as an ARC-4 type descriptor and build an ABIType from it
  const abiType = ABIType.from(typeName);
  return getABIEncodedValueRaw(abiType, value as ABIValue);
}

/**
 * Compatibility wrapper for the old `getABIDecodedValue(bytes, typeName, structs)` signature.
 * Returns the struct value form when decoding into a named struct.
 */
export function decodeABIValue(
  bytes: Uint8Array,
  typeName: string,
  structs: Record<string, StructField[]>,
): ABIValue | ABIStructValue {
  if (typeName in structs) {
    // v10 ABIStructType.decode() already returns a struct value (object with named
    // fields), not a tuple — so pass the result through directly. (v9 returned a
    // tuple here, which is why this used to call getStructValueFromTupleValue.)
    const structType = ABIStructType.fromStruct(typeName, structs);
    return getABIDecodedValueRaw(structType, bytes) as ABIStructValue;
  }
  if (AVM_TYPE_NAMES.has(typeName)) {
    return getABIDecodedValueRaw(typeName as never, bytes);
  }
  const abiType = ABIType.from(typeName);
  return getABIDecodedValueRaw(abiType, bytes);
}

/**
 * Bridge between utils10 and algosdk signer conventions.
 *
 * `sendPrepared` invokes signers with `algosdk.Transaction` objects (we
 * deliberately hold transactions in algosdk shape after `prepareGroup` so
 * their fields — sender, lease, fee, validity — remain mutable for the arc58
 * execution-handoff path). A utils10 signer, however, expects the
 * `utils10.Transaction` shape (which uses `appCall`/`payment`/etc. fields
 * instead of algosdk's flat layout); passing algosdk objects through a
 * utils10 signer produces signed bytes with empty app-call fields.
 *
 * This wrapper re-encodes each algosdk transaction to canonical msgpack bytes
 * and decodes them back into utils10 `Transaction` objects before handing
 * them to the utils10 signer.
 *
 * Tolerant of inputs that are ALREADY utils10 Transactions: passes them
 * through unchanged. That case arises when the same signer is attached to
 * both a `sendPrepared` call (algosdk inputs) and a direct utils10 composer
 * send (utils10 inputs). Without this detection,
 * `algosdk.encodeUnsignedTransaction` would throw
 * `e.getEncodingSchema is not a function`.
 */
export function wrapUtils10Signer(utils10Signer: unknown): algosdk.TransactionSigner {
  return async (txnGroup: algosdk.Transaction[], indexesToSign: number[]) => {
    const utils10Group = txnGroup.map((t) => {
      // algosdk.Transaction implements `getEncodingSchema()` as part of its Encodable
      // interface. utils10.Transaction has no such method — it encodes/decodes via
      // the standalone `encodeTransactionRaw` / `decodeTransaction` helpers. Use this
      // as a duck-typed discriminator; only re-encode when the input is algosdk.
      if (typeof (t as { getEncodingSchema?: unknown }).getEncodingSchema === 'function') {
        const bytes = algosdk.encodeUnsignedTransaction(t);
        return decodeTransaction(bytes);
      }
      return t;
    });
    return (utils10Signer as (g: unknown[], i: number[]) => Promise<Uint8Array[]>)(
      utils10Group,
      indexesToSign,
    );
  };
}
