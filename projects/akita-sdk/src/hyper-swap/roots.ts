import { ABIType, decodeAddress, encodeUint64 } from "algosdk";

const rootKeyType = ABIType.from("(address,byte[])");

/** Opaque tree tag + uint64 offer ID. Do not decode this name as UTF-8. */
export function hyperSwapRootName(id: bigint | number, participants: boolean): Uint8Array {
  return new Uint8Array([participants ? 0x70 : 0x74, ...encodeUint64(id)]);
}

/** Meta/MetaMerkles root box for a HyperSwap application address and offer ID. */
export function hyperSwapRootBoxName(address: string, id: bigint | number, participants: boolean, layout: "Meta" | "MetaMerkles" = "Meta"): Uint8Array {
  if (layout === "Meta") return new Uint8Array([0x72, ...decodeAddress(address).publicKey, ...hyperSwapRootName(id, participants)]);
  // Legacy ABI string and byte[] have identical length-prefixed wire encodings.
  return new Uint8Array([0x72, ...rootKeyType.encode([address, hyperSwapRootName(id, participants)])]);
}
