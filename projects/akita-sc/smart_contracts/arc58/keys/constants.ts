import { uint64 } from '@algorandfoundation/algorand-typescript'

/** WebAuthn authenticatorData layout: rpIdHash (32 bytes) || flags (1 byte) || signCount (4 bytes) || ... */
export const PASSKEY_RPID_HASH_LENGTH: uint64 = 32
export const PASSKEY_FLAGS_OFFSET: uint64 = 32

/** Flag bits: UP (user present) = 0x01, UV (user verified) = 0x04. Both are required (A-6). */
export const PASSKEY_REQUIRED_FLAGS: uint64 = 0x05
