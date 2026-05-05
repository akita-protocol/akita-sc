import algosdk from "algosdk";
import { ABIValue, StructField } from "@algorandfoundation/algokit-utils/abi";
/**
 * Local alias for the struct-shaped ABIValue. The upstream
 * @algorandfoundation/algokit-utils/abi module defines this type in
 * abi-value.d.ts but doesn't re-export it from the public /abi index,
 * so we mirror it here to preserve the ergonomic name.
 */
export type ABIStructValue = {
    [key: string]: ABIValue;
};
export declare function convertToUnixTimestamp(timestamp: bigint): bigint;
export declare function convertFromUnixTimestamp(timestamp: bigint): bigint;
export declare function assertByteArrayLength(value: Uint8Array, name: string, length: number): void;
export declare function randomByteArray(length: number): Uint8Array;
/**
 * Compatibility wrapper for the old `getABIEncodedValue(value, typeName, structs)` signature
 * from algokit-utils v9. Internally constructs an ABIStructType or ABIType and delegates
 * to the v10 `getABIEncodedValue(type, value)` API.
 */
export declare function encodeABIValue(value: ABIValue | ABIStructValue, typeName: string, structs: Record<string, StructField[]>): Uint8Array;
/**
 * Compatibility wrapper for the old `getABIDecodedValue(bytes, typeName, structs)` signature.
 * Returns the struct value form when decoding into a named struct.
 */
export declare function decodeABIValue(bytes: Uint8Array, typeName: string, structs: Record<string, StructField[]>): ABIValue | ABIStructValue;
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
export declare function wrapUtils10Signer(utils10Signer: unknown): algosdk.TransactionSigner;
