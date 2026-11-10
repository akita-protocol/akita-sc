import { uint64 } from "@algorandfoundation/algorand-typescript";

/** [minActions: 8][epochsBack: 8] */
export const ModeratorActivityRegisterByteLength: uint64 = 16
/** 8-byte key + 16-byte value: 2_500 + 400 * 24 */
export const ModeratorActivityGateRegistryMBR: uint64 = 12_100
/** Moderation keeps counts for the current epoch and the one before it */
export const ModeratorActivityMaxEpochsBack: uint64 = 1
