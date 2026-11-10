import { AppCallMethodCall } from '@algorandfoundation/algokit-utils/types/composer';
import { MaybeSigner } from "../types";
import {
  RaffleArgs,
  RaffleState,
  EntryData,
  FunderInfo,
} from '../generated/RaffleClient';
import { RaffleFactoryArgs } from '../generated/RaffleFactoryClient';

// Re-export types from generated clients for convenience
export { RaffleState, EntryData, FunderInfo };

/**
 * Entry data combined with the ticket count from the weights boxmap.
 * This provides a convenient way to get all entry information in one call.
 */
export type EntryWithTickets = EntryData & {
  /** The entry ID (index) in the raffle */
  entryId: bigint;
  /** The number of tickets (weight) this entry has */
  ticketCount: bigint;
};

/**
 * Principal-resolution wallet hint (docs/principal-resolution/PHASE-0-SPEC.md §2): the ARC-58 wallet the
 * call acts for, or 0 (default) to act as the sender itself. A direct (top-level) call can only pass 0:
 * any other value reverts with `errHtop`; plugins pass their own window (`windowHint`).
 */
export type WalletHint = {
  wallet?: bigint | number;
};

// Factory Types
type FactoryContractArgs = RaffleFactoryArgs["obj"];

type BaseNewRaffleParams = MaybeSigner & WalletHint & {
  /** The ticket asset ID (0 for ALGO) */
  ticketAsset: bigint | number;
  /** Start timestamp for the raffle */
  startTimestamp: bigint | number;
  /** End timestamp for the raffle */
  endTimestamp: bigint | number;
  /** Minimum number of tickets per entry */
  minTickets: bigint | number;
  /** Maximum number of tickets per entry */
  maxTickets: bigint | number;
  /**
   * Minimum number of entries for the raffle to be drawn (0 = at least one).
   * Below it the raffle fails: the prize returns to the seller and entrants are refunded.
   */
  minEntries?: bigint | number;
  /** Gate app ID for gated raffles (0 for none) */
  gateId: bigint | number;
  /** Marketplace address for royalties */
  marketplace: string;
  /** Number of weights boxes to allocate */
  weightsListCount: bigint | number;
};

export type NewRaffleParams = BaseNewRaffleParams & (
  | {
      /** Whether the prize is a PrizeBox */
      isPrizeBox: true;
      /** The PrizeBox app ID */
      prizeBoxId: bigint | number;
    }
  | {
      /** Whether the prize is a PrizeBox */
      isPrizeBox?: false;
      /** The asset ID to transfer as the prize */
      prizeAsset: bigint | number;
      /** The amount of the prize asset to transfer */
      prizeAmount: bigint | number;
      /** Name of the asset for royalties */
      name: string;
      /** Merkle proof for royalties */
      proof: Uint8Array[];
    }
);

export type DeleteRaffleParams = MaybeSigner & FactoryContractArgs['deleteRaffle(uint64)void'];

// Individual Raffle Types
type RaffleContractArgs = RaffleArgs["obj"];

export type InitRaffleParams = MaybeSigner & Omit<
  RaffleContractArgs['init(pay,uint64)void'],
  'payment'
>;

type BaseEnterParams = MaybeSigner & WalletHint & {
  /** The amount of tickets to enter with */
  amount: bigint | number;
  /** Marketplace address for referrals */
  marketplace: string;
  /**
   * Optional gate transaction for gated raffles. On a raffle with the principal ABI
   * (`RaffleSDK.usesPrincipalAbi()`), build it with `GateSDK.build.mustCheckFor` and the context the
   * raffle verifies (a direct caller: `directGateCtx(sender)`); on older raffles with
   * `GateSDK.build.mustCheck` and the sender as caller. A `mustCheck` gate txn always takes the
   * legacy (registry-subject) overload, also on principal-ABI children.
   */
  gateTxn?: AppCallMethodCall;
};

export type EnterParams = BaseEnterParams & (
  | {
      /** Whether paying with ASA (true) or ALGO (false/undefined) */
      isAsa?: false;
    }
  | {
      /** Whether paying with ASA (true) or ALGO (false/undefined) */
      isAsa: true;
      /** The ticket asset ID (required when isAsa is true) */
      ticketAsset: bigint | number;
    }
);

type BaseAddParams = MaybeSigner & WalletHint & {
  /** Additional tickets to add */
  amount: bigint | number;
  /**
   * Optional gate transaction for gated raffles. On a raffle with the principal ABI
   * (`RaffleSDK.usesPrincipalAbi()`), build it with `GateSDK.build.mustCheckFor` and the context the
   * raffle verifies (a direct caller: `directGateCtx(sender)`); on older raffles with
   * `GateSDK.build.mustCheck` and the sender as caller. A `mustCheck` gate txn always takes the
   * legacy (registry-subject) overload, also on principal-ABI children.
   */
  gateTxn?: AppCallMethodCall;
};

export type AddParams = BaseAddParams & (
  | {
      /** Whether paying with ASA (true) or ALGO (false/undefined) */
      isAsa?: false;
    }
  | {
      /** Whether paying with ASA (true) or ALGO (false/undefined) */
      isAsa: true;
      /** The ticket asset ID (required when isAsa is true) */
      ticketAsset: bigint | number;
    }
);

export type RefundMBRParams = MaybeSigner & RaffleContractArgs['refundMBR(uint64)void'];

export type FindWinnerParams = MaybeSigner & RaffleContractArgs['findWinner(uint64)void'];

export type ClaimPrizeParams = MaybeSigner;

export type ClearWeightsBoxesParams = MaybeSigner;

export type RaffleParams = MaybeSigner;

export type GetEntryParams = {
  /** The entry ID to look up */
  entryId: bigint | number;
};

export type IsEnteredParams = {
  /** The address to check */
  address: string;
};

export type GetEntryByAddressParams = {
  /** The address to look up */
  address: string;
};

export type GetEntryWithTicketsParams = {
  /** The entry ID to look up */
  entryId: bigint | number;
};

export type GetEntryWithTicketsByAddressParams = {
  /** The address to look up */
  address: string;
};

export type RaffleMbrData = {
  entries: bigint;
  weights: bigint;
  entriesByAddress: bigint;
};

export type OptInParams = MaybeSigner & {
  /** The asset ID to opt the raffle factory into (so it can receive rewards of this asset) */
  asset: bigint | number;
};



export type RaffleCostParams = {
  /** Whether the prize is a PrizeBox */
  isPrizeBox?: boolean;
  /** Prize asset ID (or PrizeBox app ID); used for the rewards opt-in quote */
  prizeId?: bigint | number;
  /** Ticket asset ID (0 for ALGO) */
  ticketAsset?: bigint | number;
  /** Number of weights boxes */
  weightsListCount?: bigint | number;
};

export type SetMinEntriesParams = MaybeSigner & {
  minEntries: bigint | number;
};
