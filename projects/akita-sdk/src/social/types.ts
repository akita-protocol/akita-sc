import { MaybeSigner } from '../types';
import { AppCallMethodCall } from '@algorandfoundation/algokit-utils/types/composer';
import { AkitaSocialImpactArgs } from '../generated/AkitaSocialImpactClient';

// Re-export important types from generated clients
export {
  MetaValue,
  PostValue,
  VoteListValue,
  VotesValue,
  ViewPayWallValue,
  AkitaSocialMbrData,
  TipMbrInfo,
} from '../generated/AkitaSocialClient';

export {
  ImpactMetaValue,
  StakeCheck as ImpactStakeCheck,
} from '../generated/AkitaSocialImpactClient';

type ImpactContractArgs = AkitaSocialImpactArgs['obj'];

export type CommitStakingImpactArgs = (
  MaybeSigner
  & Omit<ImpactContractArgs['commitStakingImpact(pay,uint64,bool)void'], 'payment' | 'inheritRoot'>
  & { inheritRoot?: boolean }
);

// Re-export DAO types from generated client
export type { SocialFees, AkitaAssets } from '../generated/AkitaDAOClient';

// CID type (36 bytes for IPFS CIDv1)
export type CID = Uint8Array;

// Ref type for posts (32 bytes hash)
export type PostRef = Uint8Array;

// RefType IDs matching the contract (built-in types are implicit, external types are registered via DAO)
export enum RefType {
  Post = 1,
  Asset = 2,
  Address = 3,
  App = 4,
  // Extension types (registered via DAO registerRefType)
  Collection = 5,
  /** A web page, keyed by its canonical URL (UTF-8). */
  Link = 6,
}

// ============================================================================
// Principal resolution: wallet hint (docs/principal-resolution/PHASE-0-SPEC.md §6.2, §6.13)
// ============================================================================

/**
 * Optional trailing wallet hint of the hinted AkitaSocial / AkitaSocialGraph methods.
 *
 * `0n` (the default) = act as the sender: no wallet, no referral, gate subject = the sender.
 * A non-zero value claims the call acts for that ARC-58 wallet and is verified on chain
 * (`principalOf`): it only passes when the call comes from that wallet's plugin window or from the
 * wallet app itself, so a top-level SDK send with a non-zero hint reverts (`errHtop`). Wallet users
 * go through the social plugin (`SocialPluginSDK`), which always passes its own window's wallet.
 *
 * On a network whose social contracts are not upgraded yet (`SOCIAL_HINTED_TARGETS` false, or
 * `hintedTargets: false`), `SocialSDK` calls the deployed legacy selectors instead, so only `0n` is
 * accepted there (a non-zero hint throws before anything is sent).
 */
export type WalletHintArgs = {
  wallet?: bigint | number;
};

// ============================================================================
// Post-related types
// ============================================================================

export type PostArgs = MaybeSigner & WalletHintArgs & {
  /** Optional timestamp (unix seconds). Auto-set to current time if not provided. Contract validates it's within 60 seconds of chain time. */
  timestamp?: bigint | number;
  /** Optional 24-byte nonce for key derivation. Auto-generated if not provided. */
  nonce?: Uint8Array;
  cid: CID;
  gateId?: bigint | number;
  usePayWall?: boolean;
  payWallId?: bigint | number;
  /** Optional creator-set content flags (defaults to 0) */
  creatorFlags?: bigint | number;
};

export type EditPostArgs = MaybeSigner & WalletHintArgs & {
  /** The new content CID */
  cid: CID;
  /** The post key of the post being edited */
  amendment: PostRef;
  /** Optional creator-set content flags (defaults to 0) */
  creatorFlags?: bigint | number;
};

export type ReplyArgs = MaybeSigner & WalletHintArgs & {
  /** Optional timestamp (unix seconds). Auto-set to current time if not provided. Contract validates it's within 60 seconds of chain time. */
  timestamp?: bigint | number;
  /** Optional 24-byte nonce for key derivation. Auto-generated if not provided. */
  nonce?: Uint8Array;
  cid: CID;
  ref: PostRef;
  refType: RefType;
  gateId?: bigint | number;
  usePayWall?: boolean;
  payWallId?: bigint | number;
  /**
   * Gate txn for a gated target. The hinted method checks it with `gateCheckCtx`: it must be
   * `Gate.mustCheckFor(ctx, gateId, args)` with ctx = (principal, wallet, spender) of this call,
   * i.e. `{ principal: sender, wallet: 0n, spender: sender }` for a plain direct call
   * (`SocialSDK.directGateCtx(sender)`; build it with `GateSDK.build.mustCheckFor`).
   */
  gateTxn?: AppCallMethodCall;
  /** Optional creator-set content flags (defaults to 0) */
  creatorFlags?: bigint | number;
};

// ============================================================================
// Vote-related types
// ============================================================================

export type VoteArgs = MaybeSigner & WalletHintArgs & {
  ref: PostRef;
  refType: RefType;
  isUp: boolean;
};

export type InvertVoteArgs = MaybeSigner & WalletHintArgs & {
  ref: PostRef;
};

export type DeleteVoteArgs = MaybeSigner & WalletHintArgs & {
  ref: PostRef;
};

// ============================================================================
// Reaction-related types
// ============================================================================

export type ReactArgs = MaybeSigner & WalletHintArgs & {
  ref: PostRef;
  refType: RefType;
  nft: bigint | number;
  /**
   * Gate txn for a gated target. The hinted method checks it with `gateCheckCtx`: it must be
   * `Gate.mustCheckFor(ctx, gateId, args)` with ctx = (principal, wallet, spender) of this call,
   * i.e. `{ principal: sender, wallet: 0n, spender: sender }` for a plain direct call
   * (`SocialSDK.directGateCtx(sender)`; build it with `GateSDK.build.mustCheckFor`).
   */
  gateTxn?: AppCallMethodCall;
};

export type DeleteReactionArgs = MaybeSigner & {
  ref: PostRef;
  nft: bigint | number;
};

/**
 * Reaction data for a specific NFT on a post
 */
export type PostReactionData = {
  /** The NFT asset ID used for this reaction */
  nftId: bigint;
  /** Number of users who reacted with this NFT */
  count: bigint;
};

/**
 * Return type for getPostReactions
 */
export type PostReactionsResult = {
  /** List of reactions grouped by NFT */
  reactions: PostReactionData[];
  /** Set of NFT IDs that the current user has reacted with (if userAddress provided) */
  userReactedNfts: Set<bigint>;
};

// ============================================================================
// Graph-related types (follows/blocks)
// ============================================================================

export type FollowArgs = MaybeSigner & WalletHintArgs & {
  address: string;
  /**
   * Gate txn for a gated target. The hinted method checks it with `gateCheckCtx`: it must be
   * `Gate.mustCheckFor(ctx, gateId, args)` with ctx = (principal, wallet, spender) of this call,
   * i.e. `{ principal: sender, wallet: 0n, spender: sender }` for a plain direct call
   * (`SocialSDK.directGateCtx(sender)`; build it with `GateSDK.build.mustCheckFor`).
   */
  gateTxn?: AppCallMethodCall;
};

export type UnfollowArgs = MaybeSigner & {
  address: string;
};

export type BlockArgs = MaybeSigner & {
  address: string;
};

// ============================================================================
// Meta-related types
// ============================================================================

export type InitMetaArgs = MaybeSigner & WalletHintArgs & {
  user?: string;
  automated?: boolean;
  subscriptionIndex?: bigint | number;
  nfd?: bigint | number;
  akitaNFT?: bigint | number;
};

/** `setMetaWallet`: rebind the sender's meta wallet to the verified hint (0 unbinds). */
export type SetMetaWalletArgs = MaybeSigner & WalletHintArgs;

export type UpdateMetaArgs = MaybeSigner & {
  followGateId?: bigint | number;
  addressGateId?: bigint | number;
  subscriptionIndex?: bigint | number;
  nfd?: bigint | number;
  akitaNFT?: bigint | number;
  defaultPayWallId?: bigint | number;
};

// ============================================================================
// PayWall types
// ============================================================================

export enum PayWallType {
  OneTimePayment = 0,
  Subscription = 1
}

export type PayWallPayOption = {
  type: PayWallType;
  assetOrSubId: bigint | number;
  amount: bigint | number;
};

export type CreatePayWallArgs = MaybeSigner & {
  userPayInfo: PayWallPayOption[];
  agentPayInfo: PayWallPayOption[];
};

// ============================================================================
// Moderation types
// ============================================================================

export type AddModeratorArgs = MaybeSigner & {
  address: string;
};

export type BanArgs = MaybeSigner & {
  address: string;
  expiration: bigint | number;
};

export type FlagPostArgs = MaybeSigner & {
  ref: PostRef;
};

// ============================================================================
// SDK Constructor types
// ============================================================================

export type SocialSDKParams = {
  socialAppId: bigint;
  graphAppId: bigint;
  impactAppId: bigint;
  ipfsUrl?: string;
};
