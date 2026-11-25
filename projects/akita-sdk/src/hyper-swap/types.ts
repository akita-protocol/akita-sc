import { MaybeSigner } from "../types";
import {
  HyperSwapArgs,
} from '../generated/HyperSwapClient';

// HyperSwap Types
type ContractArgs = HyperSwapArgs["obj"];

export type OfferParams = MaybeSigner & Omit<
  ContractArgs['offer(pay,byte[32],uint64,byte[32],uint64,uint64)void'],
  'payment'
>;

/**
 * Accepting takes the full, ordered leaf and participant lists the offeror shared, not a `terms`
 * value. The SDK checks the offer on chain against the lists and derives the commitment itself
 * (readiness audit 2026-11-09, C11): the declared leaf count decides when escrow completes, so an
 * offer must never be accepted on the strength of a commitment someone else computed.
 */
export type AcceptParams = MaybeSigner & {
  /** The offer ID */
  id: bigint | number;
  /** The complete, ordered trade leaf list. */
  leaves: HyperSwapLeaf[];
  /** The complete, ordered participant list. */
  participants: string[];
  /** Merkle proof that the sender is a participant. Derived from `participants` when omitted. */
  proof?: Uint8Array[];
};

type BaseEscrowParams = MaybeSigner & {
  /** The offer ID */
  id: bigint | number;
  /** The receiver address */
  receiver: string;
  /** The amount to escrow */
  amount: bigint | number;
  /** Merkle proof */
  proof: Uint8Array[];
};

export type EscrowParams = BaseEscrowParams & (
  | {
      /** Whether escrowing ASA (true) or ALGO (false/undefined) */
      isAsa?: false;
    }
  | {
      /** Whether escrowing ASA (true) or ALGO (false/undefined) */
      isAsa: true;
      /** The asset ID to escrow (required when isAsa is true) */
      asset: bigint | number;
    }
);

export type DisburseParams = MaybeSigner & ContractArgs['disburse(uint64,uint64,address,uint64,uint64)void'];

/** Permissionless disbursal of any escrowed leaf once the offer is DISBURSING. */
export type DisburseFromParams = MaybeSigner & ContractArgs['disburseFrom(uint64,address,uint64,address,uint64,uint64)void'];

/** One trade leaf: `from` sends `amount` of `asset` (0 = ALGO) to `receiver`. */
export type HyperSwapLeaf = {
  from: string;
  receiver: string;
  asset: bigint | number;
  amount: bigint | number;
  /** The receiver's ARC-58 wallet app ID when it must be opted in through the wallet (default 0). */
  receiverWallet?: bigint | number;
};

export type DisburseAllParams = MaybeSigner & {
  id: bigint | number;
  /** Every still-escrowed leaf to release, at most 16 per atomic group. */
  leaves: HyperSwapLeaf[];
};

export type CancelParams = MaybeSigner & ContractArgs['cancel(uint64,byte[32][])void'];

export type WithdrawParams = MaybeSigner & ContractArgs['withdraw(uint64,address,uint64,uint64,byte[32][])void'];

/** Permissionless return of any escrowed leaf of a cancelled offer to its funder (`from`). */
export type WithdrawForParams = MaybeSigner & ContractArgs['withdrawFor(uint64,address,address,uint64,uint64)void'];

export type OptInParams = MaybeSigner & Omit<
  ContractArgs['optIn(pay,uint64)void'],
  'payment'
>;

export type GetOfferParams = {
  id: bigint | number;
};

// Offer states
export enum OfferState {
  Offered = 10,
  Escrowing = 20,
  Disbursing = 30,
  Completed = 40,
  Cancelled = 50,
  CancelCompleted = 60,
}

export type OfferValue = {
  state: number;
  root: Uint8Array;
  leaves: bigint;
  escrowed: bigint;
  participantsRoot: Uint8Array;
  participantsLeaves: bigint;
  acceptances: bigint;
  expiration: bigint;
};

export type HyperSwapMbrData = {
  offers: bigint;
  participants: bigint;
  hashes: bigint;
  mm: {
    root: bigint;
    data: bigint;
  };
};

