import { StakingType } from "../staking/types"
import { StructField } from '@algorandfoundation/algokit-utils/types/app-arc56';

export type GateType = 'akita_referrer' | 'asset' | 'merkle_address' | 'merkle_asset' | 'nfd' | 'nfd_root' | 'poll' | 'social_activity' | 'social_follower_count' | 'social_follower_index' | 'social_impact' | 'social_moderator' | 'moderator_activity' | 'governance_participation' | 'staking_amount' | 'staking_power' | 'subscription' | 'subscription_streak'

export interface GateRegistryConfig {
  akita_referrer?: bigint;
  asset?: bigint;
  merkle_address?: bigint;
  merkle_asset?: bigint;
  nfd?: bigint;
  nfd_root?: bigint;
  poll?: bigint;
  social_activity?: bigint;
  social_follower_count?: bigint;
  social_follower_index?: bigint;
  social_impact?: bigint;
  social_moderator?: bigint;
  moderator_activity?: bigint;
  governance_participation?: bigint;
  staking_amount?: bigint;
  staking_power?: bigint;
  subscription?: bigint;
  subscription_streak?: bigint;
}

/**
 * Sub-gate types that implement the context-aware `checkFor(ctx, registryID, args)` (principal-resolution
 * spec §6.9). Gate v2 forwards the verified context to them under `checkFor` / `mustCheckFor` when they
 * are allowlisted with `ctxAware = true`; every other type receives `check(ctx.principal, ...)`.
 */
export const CTX_AWARE_GATE_TYPES: readonly GateType[] = ['subscription', 'subscription_streak', 'akita_referrer', 'moderator_activity', 'governance_participation'] as const

/** True if sub-gates of this type must be allowlisted on Gate v2 with `ctxAware = true`. */
export function isCtxAwareGateType(type: GateType): boolean {
  return CTX_AWARE_GATE_TYPES.includes(type)
}

export type GateEncodingInfo<T extends Record<string, StructField[]> = Record<string, StructField[]>> = {
  registerShape: keyof T
  checkShape: keyof T
  structs: T
}

export enum Operator {
  Equal = 10,
  NotEqual = 20,
  LessThan = 30,
  LessThanOrEqualTo = 40,
  GreaterThan = 50,
  GreaterThanOrEqualTo = 60,
  IncludedIn = 70,
  IncludedInRoot = 80,
  NotIncludedIn = 90,
}

/**
 * Composite gate semantics (Gate v2):
 * - `layer` starts at 0, never decreases, and grows by at most 1 per filter.
 * - Filters in the same layer combine left to right with the operator of the left filter.
 * - A filter followed by a deeper layer applies its operator to the whole deeper group,
 *   which runs to the end of the list: `[A{0,And}, B{1,Or}, C{1}]` is `A AND (B OR C)`.
 * - Every operator except the last filter's must be `And` or `Or`.
 */
export enum LogicalOperator {
  None = 0,
  And = 10,
  Or = 20,
}

export type GateRegistrationFilterAndArg = GateRegistrationArg & {
  layer: bigint
  appId: bigint,
  logicalOperator: LogicalOperator
}

export type GateRegistrationArg = (
  | {
    type: 'akita_referrer'
    referrer: string
  }
  | {
    type: 'asset'
    asset: bigint | number
    op: Operator,
    value: bigint | number
  }
  | {
    type: 'merkle_address' | 'merkle_asset',
    creator: string,
    name: string
  }
  | { type: 'nfd' }
  | {
    type: 'nfd_root',
    root: string
  }
  | {
    type: 'poll'
    poll: bigint | number
  }
  | {
    type: 'social_activity' | 'social_follower_count' | 'social_impact' | 'social_moderator',
    op: Operator,
    value: bigint | number
  }
  | {
    type: 'social_follower_index',
    user: string,
    op: Operator,
    value: bigint | number
  }
  | {
    type: 'moderator_activity'
    /** counted (state-changing) moderation actions required */
    minActions: bigint | number
    /** 0: the current 7-day epoch only; 1: the current epoch plus the previous one */
    epochsBack: bigint | number
  }
  | {
    type: 'governance_participation'
    /** the last DAO vote must be at most this many seconds old; 0 means any time */
    withinSeconds: bigint | number
    /** distinct DAO proposals voted on (at least 1) */
    minVotes: bigint | number
  }
  | {
    type: 'staking_amount'
    op: Operator
    asset: bigint | number
    stakingType: StakingType
    amount: bigint | number
    includeEscrowed: boolean
  }
  | {
    type: 'staking_power'
    op: Operator
    asset: bigint | number
    power: bigint | number
  }
  | {
    type: 'subscription'
    merchant: string
    /** the merchant's service id (must exist; donations / 0 are rejected) */
    serviceId: bigint | number
  }
  | {
    type: 'subscription_streak'
    merchant: string
    /** the merchant's service id (must exist; donations / 0 are rejected) */
    serviceId: bigint | number
    op: Operator
    streak: bigint | number
  }
)

export type GateCheckArg = (
  | {
    type: 'akita_referrer',
    /**
     * The wallet id registered for the caller in the EscrowFactory (legacy `check`/`mustCheck` only).
     * `checkFor`/`mustCheckFor` ignore it and use `ctx.wallet`: pass `0n` there.
     */
    wallet: bigint | number
  }
  | { type: 'asset' }
  | {
    type: 'merkle_address',
    proof: Uint8Array<ArrayBufferLike>[]
  }
  | {
    type: 'merkle_asset'
    asset: bigint | number
    proof: Uint8Array<ArrayBufferLike>[]
  }
  | {
    type: 'nfd'
    appId: bigint | number
  }
  | {
    type: 'nfd_root',
    /** the NFD app id to check (it must be the root NFD or one of its segments) */
    appId: bigint | number
  }
  | { type: 'poll' }
  | { type: 'social_activity' }
  | { type: 'social_follower_count' }
  | {
    type: 'social_follower_index',
    index: bigint | number
  }
  | { type: 'social_impact' }
  | { type: 'social_moderator' }
  | { type: 'moderator_activity' }
  | { type: 'governance_participation' }
  | { type: 'staking_amount' }
  | { type: 'staking_power' }
  | {
    type: 'subscription' | 'subscription_streak'
    /** the subscribing account: the caller itself, or its Akita wallet / escrow address */
    subscriber: string
    /** the subscriber's subscription id */
    id: bigint | number
  }
)

// export type GateFilter = {
//   layer: uint64 // the comparison nesting level
//   app: uint64 // the app id of the gate to use
//   logicalOperator: LogicalOperator // the logical operator to apply between this gate filter and the next
// }