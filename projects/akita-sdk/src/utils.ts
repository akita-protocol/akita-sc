import type algosdk from 'algosdk';
import { randomBytes as nobleRandomBytes } from '@noble/hashes/utils.js';
import { getABIEncodedValue, getABIDecodedValue, type ABIStruct, type StructField } from '@algorandfoundation/algokit-utils/types/app-arc56';

export type ABIStructValue = ABIStruct;

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

/** Encode an ARC-4 type, named struct, or AVM value using Utils 9. */
export function encodeABIValue(value: algosdk.ABIValue | ABIStruct, typeName: string, structs: Record<string, StructField[]>): Uint8Array {
  return getABIEncodedValue(value, typeName, structs);
}

/** Decode a value, preserving named struct fields. */
export function decodeABIValue(bytes: Uint8Array, typeName: string, structs: Record<string, StructField[]>): algosdk.ABIValue | ABIStruct {
  return getABIDecodedValue(bytes, typeName, structs);
}
