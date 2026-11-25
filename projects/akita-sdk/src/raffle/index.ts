import { microAlgo } from "@algorandfoundation/algokit-utils";
import algosdk from "algosdk";
import { BaseSDK } from "../base";
import {
  RaffleClient,
  RaffleFactory,
  RaffleState,
  EntryData,
} from '../generated/RaffleClient';
import { MaybeSigner, NewContractSDKParams } from "../types";
import type { GateCtx } from "../principal";
import {
  EnterParams,
  AddParams,
  RefundMBRParams,
  FindWinnerParams,
  GetEntryParams,
  IsEnteredParams,
  GetEntryByAddressParams,
  GetEntryWithTicketsParams,
  GetEntryWithTicketsByAddressParams,
  RaffleMbrData,
  EntryWithTickets,
  SetMinEntriesParams,
} from "./types";
import { ticketsInSlot, weightLocation } from "./weights";

export * from "./weights";

/** rounds between the commit round and the round its beacon value can be read */
export const RAFFLE_BEACON_LAG_ROUNDS = 4n;

/** Global key whose existence marks a raffle child with the principal ABI (spec §6.8). */
export const RAFFLE_SELLER_REFERRER_KEY = 'seller_referrer';

/**
 * `getState` of raffles created before principal resolution (no `seller_referrer`; every live MainNet
 * raffle). The audit ride-along appended `minEntries`, `failed` and `raffleRound` to the return tuple,
 * so the selector changed and old children do not route the new one (compat finding 2).
 */
export const RAFFLE_LEGACY_GET_STATE = 'getState()(uint64,uint64,uint64,address,uint64,uint64,uint64,uint64,uint64,address,uint64,bool,uint64,uint64,uint64,uint64)';

const LEGACY_RAFFLE_STATE_FIELDS = [
  'ticketAsset', 'startTimestamp', 'endTimestamp', 'seller', 'minTickets', 'maxTickets', 'entryCount', 'ticketCount',
  'winningTicket', 'winner', 'prize', 'prizeClaimed', 'gateId', 'vrfFailureCount', 'entryId', 'refundMbrCursor',
] as const;

/**
 * `RaffleSDK.state()` result. `legacyAbi` is true for a pre-principal raffle: it has no `minEntries`,
 * `failed` or `raffleRound`, so those read `0n` / `false` / `0n` (it settles with at least one entry).
 */
export type RaffleSdkState = RaffleState & { legacyAbi: boolean };

/**
 * The gate context a hinted raffle method verifies for a DIRECT (top-level) caller, who can only
 * hint 0: `{ principal: sender, wallet: 0, spender: sender }`. Pass it to `GateSDK.build.mustCheckFor`.
 */
export function raffleDirectGateCtx(sender: string): GateCtx {
  return { principal: sender, wallet: 0n, spender: sender };
}

export * from "./errors";
export * from "./factory";
export * from "./types";

/**
 * SDK for interacting with an individual Raffle contract.
 * Use this to manage raffle entries, draw winners, and claim prizes.
 */
export class RaffleSDK extends BaseSDK<RaffleClient> {

  constructor(params: NewContractSDKParams) {
    super({ factory: RaffleFactory, ...params });
  }

  // ========== Read Methods ==========

  /**
   * Gets the current state of the raffle.
   */
  async state(): Promise<RaffleSdkState> {
    if (!(await this.usesPrincipalAbi())) {
      return this.legacyState();
    }

    const { return: state } = await this.client.send.getState({ args: {} });

    if (state === undefined) {
      throw new Error('Failed to get raffle state');
    }

    return { ...state, legacyAbi: false };
  }

  /** Reads a pre-principal raffle through its deployed `getState` selector (simulated, not sent). */
  private async legacyState(): Promise<RaffleSdkState> {
    const reader = this.getReaderSendParams();
    const result = await this.client.algorand.newGroup()
      .addAppCallMethodCall({
        ...reader,
        sender: reader.sender!,
        appId: this.client.appId,
        method: algosdk.ABIMethod.fromSignature(RAFFLE_LEGACY_GET_STATE),
        args: [],
      })
      .simulate({ allowUnnamedResources: true, skipSignatures: true });
    const returns = result.returns ?? [];
    const tuple = returns[returns.length - 1]?.returnValue;
    if (!Array.isArray(tuple) || tuple.length !== LEGACY_RAFFLE_STATE_FIELDS.length) {
      throw new Error('Failed to get raffle state');
    }
    const state = Object.fromEntries(LEGACY_RAFFLE_STATE_FIELDS.map((field, i) => [field, tuple[i]]));
    return { ...(state as Omit<RaffleState, 'minEntries' | 'failed' | 'raffleRound'>), minEntries: 0n, failed: false, raffleRound: 0n, legacyAbi: true };
  }

  /**
   * Whether this raffle has the principal ABI (created by the Phase 2 factory: it holds
   * `seller_referrer`). Gated calls then take the hinted overloads and a `Gate.mustCheckFor` gate txn;
   * older raffles keep the pre-principal gated methods and `Gate.mustCheck` (subject: the sender).
   */
  async usesPrincipalAbi(): Promise<boolean> {
    const state = await this.client.appClient.getGlobalState();
    return state[RAFFLE_SELLER_REFERRER_KEY] !== undefined;
  }

  /**
   * Creation-time referrer of the seller's verified wallet, paid when the prize is claimed
   * ('' on raffles created before the principal ABI).
   */
  async sellerReferrer(): Promise<string> {
    const state = await this.client.appClient.getGlobalState();
    const value = state[RAFFLE_SELLER_REFERRER_KEY];
    if (value === undefined || !('valueRaw' in value)) {
      return '';
    }
    return algosdk.encodeAddress(value.valueRaw);
  }

  /**
   * Checks if the raffle is currently live (accepting entries).
   */
  async isLive(): Promise<boolean> {
    const isLive = await this.client.isLive();
    return isLive ?? false;
  }

  /**
   * Gets the MBR (Minimum Balance Requirement) data for raffle operations.
   */
  async mbr(): Promise<RaffleMbrData> {
    const mbrData = await this.client.mbr();

    return {
      entries: mbrData.entries,
      weights: mbrData.weights,
      entriesByAddress: mbrData.entriesByAddress,
    };
  }

  /**
   * Gets an entry by its ID.
   */
  async getEntry({ entryId }: GetEntryParams): Promise<EntryData> {
    const entry = await this.client.state.box.entries.value(entryId);

    if (entry === undefined) {
      throw new Error(`Entry ${entryId} not found`);
    }

    return entry;
  }

  /**
   * Checks if an address has entered the raffle.
   */
  async isEntered({ address }: IsEnteredParams): Promise<boolean> {
    try {
      const entryId = await this.client.state.box.entriesByAddress.value(address);
      return entryId !== undefined;
    } catch {
      return false;
    }
  }

  /**
   * Gets the entry ID for an address.
   */
  async getEntryByAddress({ address }: GetEntryByAddressParams): Promise<bigint> {
    const entryId = await this.client.state.box.entriesByAddress.value(address);

    if (entryId === undefined) {
      throw new Error(`No entry found for address ${address}`);
    }

    return entryId;
  }

  /**
   * Gets the ticket count for an entry from the weights boxmap.
   * @param entryId - The entry ID to look up
   * @returns The ticket count for the entry
   */
  async getTicketCount({ entryId }: GetEntryWithTicketsParams): Promise<bigint> {
    const { box, slot } = weightLocation(entryId);

    const weightsBox = await this.client.state.box.weights.value(box);

    if (weightsBox === undefined) {
      throw new Error(`Weights box ${box} not found`);
    }

    return this.ticketsOf(weightsBox, entryId, slot);
  }

  /** the ticket count of `entryId`, read from its weights box */
  private ticketsOf(weightsBox: Uint8Array, entryId: bigint | number, slot: number): bigint {
    const tickets = ticketsInSlot(weightsBox, slot);
    if (tickets === undefined) {
      throw new Error(`No ticket count stored for entry ${entryId}`);
    }
    return tickets;
  }

  /**
   * Gets an entry with its ticket count combined.
   * This is a convenience method that fetches both entry data and the ticket count
   * from the weights boxmap in a single call.
   */
  async getEntryWithTickets({ entryId }: GetEntryWithTicketsParams): Promise<EntryWithTickets> {
    const id = BigInt(entryId);
    const { box, slot } = weightLocation(id);

    const [entry, weightsBox] = await Promise.all([
      this.client.state.box.entries.value(id),
      this.client.state.box.weights.value(box),
    ]);

    if (entry === undefined) {
      throw new Error(`Entry ${entryId} not found`);
    }

    if (weightsBox === undefined) {
      throw new Error(`Weights box ${box} not found`);
    }

    return {
      ...entry,
      entryId: id,
      ticketCount: this.ticketsOf(weightsBox, id, slot),
    };
  }

  /**
   * Gets an entry with its ticket count by address.
   * This is a convenience method that looks up the entry ID by address,
   * then fetches both entry data and the ticket count.
   */
  async getEntryWithTicketsByAddress({ address }: GetEntryWithTicketsByAddressParams): Promise<EntryWithTickets> {
    let entryId: bigint | undefined;
    try {
      entryId = await this.client.state.box.entriesByAddress.value(address);
    } catch (error: any) {
      // Box not found (404) means the address hasn't entered
      if (error?.message?.includes('box not found') || error?.message?.includes('404')) {
        throw new Error(`No entry found for address ${address}`);
      }
      throw error;
    }

    if (entryId === undefined) {
      throw new Error(`No entry found for address ${address}`);
    }

    return this.getEntryWithTickets({ entryId });
  }

  /**
   * Gets all entries with their ticket counts.
   * This fetches all entries and their corresponding ticket counts from the weights boxmap.
   * Note: For large raffles, this may require multiple reads.
   */
  async getAllEntriesWithTickets(): Promise<EntryWithTickets[]> {
    const entriesMap = await this.client.state.box.entries.getMap();

    // Fetch, in parallel, the weights boxes of the entries that exist. A refunded entry has
    // neither an entry box nor a slot, and a box whose entries are all refunded is gone.
    const boxes = [...new Set([...entriesMap.keys()].map((entryId) => weightLocation(entryId).box))];
    const weightsBoxes = new Map<bigint, Uint8Array | undefined>(
      await Promise.all(boxes.map(async (box) => [box, await this.client.state.box.weights.value(box)] as const)),
    );

    const result: EntryWithTickets[] = [];

    for (const [entryId, entry] of entriesMap) {
      const { box, slot } = weightLocation(entryId);
      const weightsBox = weightsBoxes.get(box);

      if (weightsBox === undefined) {
        throw new Error(`Weights box ${box} not found`);
      }

      result.push({
        ...entry,
        entryId,
        ticketCount: this.ticketsOf(weightsBox, entryId, slot),
      });
    }

    return result;
  }

  // ========== Write Methods ==========

  /**
   * Enters the raffle with tickets.
   * Use `isAsa: true` and `ticketAsset` for ASA tickets, otherwise ALGO is used.
   */
  async enter({
    sender,
    signer,
    amount,
    marketplace,
    isAsa = false,
    gateTxn,
    wallet = 0n,
    ...rest
  }: EnterParams): Promise<void> {
    const sendParams = this.getRequiredSendParams({ sender, signer });

    // Get MBR costs
    const mbrData = await this.mbr();
    const mbrCost = mbrData.entries + mbrData.entriesByAddress;

    const group = this.client.newGroup();
    // hinted overloads only on principal-ABI raffles, and only for a non-`mustCheck` gate txn (callers
    // that still build Gate.mustCheck keep the registry semantics through the legacy shims)
    const principalAbi = gateTxn !== undefined && gateTxn.method.name !== 'mustCheck' && await this.usesPrincipalAbi();

    if (isAsa) {
      const { ticketAsset } = rest as Extract<EnterParams, { isAsa: true }>;

      const payment = await this.client.algorand.createTransaction.payment({
        ...sendParams,
        amount: microAlgo(mbrCost),
        receiver: this.client.appAddress,
      });

      const assetXfer = await this.client.algorand.createTransaction.assetTransfer({
        ...sendParams,
        amount: BigInt(amount),
        assetId: BigInt(ticketAsset),
        receiver: this.client.appAddress,
      });

      if (gateTxn && principalAbi) {
        group.gatedEnterAsaApplPayAxferAddressUint64Void({
          ...sendParams,
          args: { gateTxn, payment, assetXfer, marketplace, wallet: BigInt(wallet) },
        });
      } else if (gateTxn) {
        // legacy child (no seller_referrer) or a Gate.mustCheck gate txn: pre-principal ABI
        group.gatedEnterAsaApplPayAxferAddressVoid({
          ...sendParams,
          args: { gateTxn, payment, assetXfer, marketplace },
        });
      } else {
        group.enterAsa({
          ...sendParams,
          args: { payment, assetXfer, marketplace },
        });
      }
    } else {
      const payment = await this.client.algorand.createTransaction.payment({
        ...sendParams,
        amount: microAlgo(BigInt(amount) + mbrCost),
        receiver: this.client.appAddress,
      });

      if (gateTxn && principalAbi) {
        group.gatedEnterApplPayAddressUint64Void({
          ...sendParams,
          args: { gateTxn, payment, marketplace, wallet: BigInt(wallet) },
        });
      } else if (gateTxn) {
        // legacy child (no seller_referrer) or a Gate.mustCheck gate txn: pre-principal ABI
        group.gatedEnterApplPayAddressVoid({
          ...sendParams,
          args: { gateTxn, payment, marketplace },
        });
      } else {
        group.enter({
          ...sendParams,
          args: { payment, marketplace },
        });
      }
    }

    await group.send(sendParams);
  }

  /**
   * Adds more tickets to an existing entry.
   * Use `isAsa: true` and `ticketAsset` for ASA tickets, otherwise ALGO is used.
   */
  async add({
    sender,
    signer,
    amount,
    isAsa = false,
    gateTxn,
    wallet = 0n,
    ...rest
  }: AddParams): Promise<void> {
    const sendParams = this.getRequiredSendParams({ sender, signer });

    const group = this.client.newGroup();
    // hinted overloads only on principal-ABI raffles, and only for a non-`mustCheck` gate txn (callers
    // that still build Gate.mustCheck keep the registry semantics through the legacy shims)
    const principalAbi = gateTxn !== undefined && gateTxn.method.name !== 'mustCheck' && await this.usesPrincipalAbi();

    if (isAsa) {
      const { ticketAsset } = rest as Extract<AddParams, { isAsa: true }>;

      const assetXfer = await this.client.algorand.createTransaction.assetTransfer({
        ...sendParams,
        amount: BigInt(amount),
        assetId: BigInt(ticketAsset),
        receiver: this.client.appAddress,
      });

      if (gateTxn && principalAbi) {
        group.gatedAddAsaApplAxferUint64Void({
          ...sendParams,
          args: { gateTxn, assetXfer, wallet: BigInt(wallet) },
        });
      } else if (gateTxn) {
        // legacy child (no seller_referrer) or a Gate.mustCheck gate txn: pre-principal ABI
        group.gatedAddAsaApplAxferVoid({
          ...sendParams,
          args: { gateTxn, assetXfer },
        });
      } else {
        group.addAsa({
          ...sendParams,
          args: { assetXfer },
        });
      }
    } else {
      const payment = await this.client.algorand.createTransaction.payment({
        ...sendParams,
        amount: microAlgo(amount),
        receiver: this.client.appAddress,
      });

      if (gateTxn && principalAbi) {
        group.gatedAddApplPayUint64Void({
          ...sendParams,
          args: { gateTxn, payment, wallet: BigInt(wallet) },
        });
      } else if (gateTxn) {
        // legacy child (no seller_referrer) or a Gate.mustCheck gate txn: pre-principal ABI
        group.gatedAddApplPayVoid({
          ...sendParams,
          args: { gateTxn, payment },
        });
      } else {
        group.add({
          ...sendParams,
          args: { payment },
        });
      }
    }

    await group.send(sendParams);
  }

  /**
   * Sets the minimum number of entries needed for the raffle to be drawn.
   * Seller only, before anyone has entered.
   */
  async setMinEntries({ sender, signer, minEntries }: SetMinEntriesParams): Promise<void> {
    const sendParams = this.getSendParams({ sender, signer });

    await this.client.send.setMinEntries({
      ...sendParams,
      args: { minEntries },
    });
  }

  /**
   * Round from which the committed draw can be completed (`raffleRound + 4`), or 0n if nothing has
   * been committed yet. `raffleRound` is a multiple of 8, the rounds the beacon stores.
   */
  async drawReadyRound(): Promise<bigint> {
    const { raffleRound } = await this.state();
    return raffleRound === 0n ? 0n : raffleRound + RAFFLE_BEACON_LAG_ROUNDS;
  }

  /**
   * Two-phase draw (commit-reveal). After the end, the first call either settles the raffle
   * (below minimum participation: prize back to the seller; one ticket: that ticket wins) or
   * commits to a future round. Call again once the chain reaches `drawReadyRound()` to draw.
   */
  async raffle(params?: MaybeSigner): Promise<void> {
    const sendParams = this.getSendParams(params);

    await this.client.send.raffle({
      ...sendParams,
      args: {},
    });
  }

  /**
   * Iterates to find the winner based on the winning ticket.
   * May need to be called multiple times for large raffles.
   */
  async findWinner({ sender, signer, iterationAmount }: FindWinnerParams): Promise<void> {
    const sendParams = this.getSendParams({ sender, signer });

    await this.client.send.findWinner({
      ...sendParams,
      args: { iterationAmount },
    });
  }

  /**
   * Claims the raffle prize for the winner.
   * Also distributes royalties to marketplace, creator, and Akita.
   */
  async claimPrize(params?: MaybeSigner): Promise<void> {
    const sendParams = this.getSendParams(params);

    await this.client.send.claimRafflePrize({
      ...sendParams,
      args: {},
    });
  }

  /**
   * Refunds MBR to raffle participants after the winner is found.
   * May need to be called multiple times for large raffles. A raffle created from 2.0.0 on
   * refunds from the last entry down (each refund frees the entry's slot in its weights box), so
   * `refundMbrCursor` counts the entries refunded so far in both layouts.
   */
  async refundMBR({ sender, signer, iterationAmount }: RefundMBRParams): Promise<void> {
    const sendParams = this.getSendParams({ sender, signer });

    await this.client.send.refundMbr({
      ...sendParams,
      args: { iterationAmount },
    });
  }

  /**
   * Clears the weights storage once the prize is claimed and every entry is refunded, and returns
   * its MBR to whoever funded the raffle. From 2.0.0 on the refunds free the weights boxes
   * themselves and this call frees the totals box that is left.
   */
  async clearWeightsBoxes(params?: MaybeSigner): Promise<bigint> {
    const sendParams = this.getSendParams(params);

    const { return: returnAmount } = await this.client.send.clearWeightsBoxes({
      ...sendParams,
      args: {},
    });

    if (returnAmount === undefined) {
      throw new Error('Failed to clear weights boxes');
    }

    return returnAmount;
  }
}
