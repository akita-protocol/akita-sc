import { uint64 } from '@algorandfoundation/algorand-typescript'

export type GovernanceParticipationGateRegistryInfo = {
  /** the last DAO vote must be at most this many seconds old; 0 means any time */
  withinSeconds: uint64
  /** distinct DAO proposals voted on, at least 1 */
  minVotes: uint64
}
