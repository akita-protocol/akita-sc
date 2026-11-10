import { uint64 } from "@algorandfoundation/algorand-typescript";

/** [withinSeconds: 8][minVotes: 8] */
export const GovernanceParticipationRegisterByteLength: uint64 = 16
/** 8-byte key + 16-byte value: 2_500 + 400 * 24 */
export const GovernanceParticipationGateRegistryMBR: uint64 = 12_100
