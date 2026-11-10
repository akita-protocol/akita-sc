import type algosdk from 'algosdk';
import { type ABIStruct, type StructField } from '@algorandfoundation/algokit-utils/types/app-arc56';
export type ABIStructValue = ABIStruct;
export declare function convertToUnixTimestamp(timestamp: bigint): bigint;
export declare function convertFromUnixTimestamp(timestamp: bigint): bigint;
export declare function assertByteArrayLength(value: Uint8Array, name: string, length: number): void;
export declare function randomByteArray(length: number): Uint8Array;
/** Encode an ARC-4 type, named struct, or AVM value using Utils 9. */
export declare function encodeABIValue(value: algosdk.ABIValue | ABIStruct, typeName: string, structs: Record<string, StructField[]>): Uint8Array;
/** Decode a value, preserving named struct fields. */
export declare function decodeABIValue(bytes: Uint8Array, typeName: string, structs: Record<string, StructField[]>): algosdk.ABIValue | ABIStruct;
