import { microAlgo } from "@algorandfoundation/algokit-utils";
import { ABIMethod, ABIType, Address, ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk';
import { BaseSDK } from "../base";
import { ENV_VAR_NAMES } from "../config";
import {
  RewardsClient,
  RewardsFactory,
  DisbursementDetails,
  RewardsMbrData,
} from '../generated/RewardsClient';
import { MaybeSigner, NewContractSDKParams } from "../types";
import {
  GetMbrParams,
  GetAllocationMbrCreditShortfallParams,
  GetDisbursementParams,
  GetUserAllocationParams,
  RewardsGlobalState,
  OptInAssetParams,
  CreateDisbursementParams,
  EditDisbursementParams,
  FundMbrCreditsParams,
  WithdrawMbrCreditsParams,
  CreateUserAllocationsParams,
  CreateAsaUserAllocationsParams,
  FinalizeDisbursementParams,
  CreateInstantDisbursementParams,
  CreateInstantAsaDisbursementParams,
  CreateAsaDisbursementFromGroupParams,
  ClaimRewardsParams,
  ReclaimRewardsParams,
  SweepExpiredParams,
  SweepableAllocation,
  UpdateAkitaDaoParams,
  UserAllocation,
} from "./types";

export * from "./types";
export * from "./errors";

const MAX_ALGORAND_GROUP_SIZE = 16;

/** Disbursement box key: `'d'` + uint64 ID. */
const DISBURSEMENT_BOX_PREFIX = 0x64;
/** User allocation box key: `'u'` + address (32) + asset (8) + disbursement ID (8). */
const USER_ALLOCATION_BOX_PREFIX = 0x75;
const USER_ALLOCATION_BOX_NAME_LENGTH = 49;

/**
 * rewards/constants.ts (v2): the disbursement box with an empty title and note, which includes the
 * 32-byte `reclaimTo`. The v1 app charged 41,700.
 */
export const MIN_DISBURSEMENTS_MBR = 54_500n;
export const USER_ALLOCATION_MBR = 25_300n;

/** v2 stores `reclaimTo` after `mbrCredits`. */
const DISBURSEMENT_V2 = ABIType.from('(address,bool,string,uint64,uint64,uint64,uint64,uint64,uint64,address,string)');
/** The v1 app (MainNet 3569556095) stores `usedMbrCredits` after `mbrCredits` and has no `reclaimTo`. */
const DISBURSEMENT_V1 = ABIType.from('(address,bool,string,uint64,uint64,uint64,uint64,uint64,uint64,uint64,string)');
/** The title offset is the head size: 117 bytes in v2, 93 in v1. */
const DISBURSEMENT_V1_HEAD_SIZE = 93;

/**
 * Decodes a disbursement box of either Rewards layout. v1 boxes have no reclaim target, so their
 * `reclaimTo` is the zero address.
 */
export function decodeDisbursementDetails(value: Uint8Array): DisbursementDetails {
  const titleOffset = (value[33] << 8) | value[34];
  const v1 = titleOffset === DISBURSEMENT_V1_HEAD_SIZE;
  const fields = (v1 ? DISBURSEMENT_V1 : DISBURSEMENT_V2).decode(value) as unknown[];
  const address = (field: unknown) => field instanceof Address ? field.toString() : String(field);
  return {
    creator: address(fields[0]),
    finalized: fields[1] as boolean,
    title: fields[2] as string,
    amount: fields[3] as bigint,
    timeToUnlock: fields[4] as bigint,
    expiration: fields[5] as bigint,
    allocations: fields[6] as bigint,
    distributed: fields[7] as bigint,
    mbrCredits: fields[8] as bigint,
    reclaimTo: v1 ? ALGORAND_ZERO_ADDRESS_STRING : address(fields[9]),
    note: fields[10] as string,
  };
}

function disbursementBoxName(id: bigint | number): Uint8Array {
  const name = new Uint8Array(9);
  name[0] = DISBURSEMENT_BOX_PREFIX;
  new DataView(name.buffer).setBigUint64(1, BigInt(id));
  return name;
}

/**
 * Decodes the user allocation box names of disbursement `id` (any other name is skipped). Exported for
 * unit tests; `getSweepableAllocations` reads the amounts.
 */
export function allocationKeysOf(names: readonly Uint8Array[], id: bigint): { name: Uint8Array; address: string; asset: bigint }[] {
  return names.flatMap(name => {
    if (name.length !== USER_ALLOCATION_BOX_NAME_LENGTH || name[0] !== USER_ALLOCATION_BOX_PREFIX) return [];
    const view = new DataView(name.buffer, name.byteOffset, name.byteLength);
    if (view.getBigUint64(41) !== id) return [];
    return [{ name, address: new Address(name.slice(1, 33)).toString(), asset: view.getBigUint64(33) }];
  });
}

/** A disbursement is sweepable once it has a reclaim target and its expiration (0 = never) has passed. */
export function isSweepable(disbursement: Pick<DisbursementDetails, 'expiration' | 'reclaimTo'>, now: bigint): boolean {
  return disbursement.reclaimTo !== ALGORAND_ZERO_ADDRESS_STRING && disbursement.expiration !== 0n && disbursement.expiration < now;
}
const CREATE_ASA_DISBURSEMENT_FROM_GROUP = ABIMethod.fromSignature(
  "createAsaDisbursementFromGroup(uint64,uint64,string,uint64,uint64,string,(address,uint64)[])uint64",
);

/**
 * SDK for interacting with the Rewards contract.
 * Use this to create disbursements, manage allocations, and claim/reclaim rewards.
 */
/** Read current and retained Rewards deployments without conflating their disbursement IDs.
 * Supply clients from the same network. Keep each returned client for allocation reads and claims.
 * A failed deployment read rejects the result rather than hiding potentially claimable rewards.
 */
export async function getDisbursementsAcrossDeployments(
  clients: readonly RewardsSDK[],
  { currentAppId }: { currentAppId?: bigint } = {},
) {
  if (new Set(clients.map(client => client.network)).size > 1) throw new Error('Rewards clients must use the same network');
  const unique = new Map(clients.map(client => [client.appId, client]));
  if ([...unique.keys()].some(id => id <= 0n)) throw new Error('Rewards deployment IDs must be positive');
  return Promise.all([...unique.values()].map(async client => ({
    appId: client.appId,
    client,
    /** Wallet claims from this deployment go through `RewardsPluginSDK.claimLegacyRewards` (see `claimRewardsFrom`). */
    legacy: currentAppId !== undefined && client.appId !== currentAppId,
    disbursements: await client.getDisbursements(),
  })));
}

export class RewardsSDK extends BaseSDK<RewardsClient> {

  constructor(params: NewContractSDKParams) {
    super({ factory: RewardsFactory, ...params }, ENV_VAR_NAMES.REWARDS_APP_ID);
  }

  // ========== Read Methods ==========

  /**
   * Gets the current global state of the rewards contract.
   */
  async getState(): Promise<RewardsGlobalState> {
    const state = await this.client.state.global.getAll();

    return {
      disbursementId: state.disbursementId ?? 1n,
      version: state.version ?? '',
      akitaDao: state.akitaDao ?? 0n,
    };
  }

  /**
   * Gets the MBR (Minimum Balance Requirement) data for creating disbursements.
   * @param title - The disbursement title
   * @param note - The disbursement note
   */
  async mbr({ title, note }: GetMbrParams): Promise<RewardsMbrData> {
    return await this.client.mbr({ args: { title, note } });
  }

  /**
   * Gets a specific disbursement by ID.
   */
  async getDisbursement({ id }: GetDisbursementParams): Promise<DisbursementDetails> {
    let value: Uint8Array;
    try {
      value = await this.algorand.app.getBoxValue(this.appId, disbursementBoxName(id));
    } catch {
      throw new Error(`Disbursement ${id} not found`);
    }
    return decodeDisbursementDetails(value);
  }

  /**
   * Gets all disbursements as a map.
   */
  async getDisbursements(): Promise<Map<bigint, DisbursementDetails>> {
    const names = (await this.algorand.app.getBoxNames(this.appId))
      .map(box => box.nameRaw)
      .filter(name => name.length === 9 && name[0] === DISBURSEMENT_BOX_PREFIX);
    const values = await this.algorand.app.getBoxValues(this.appId, names);
    return new Map(names.map((name, i) => [
      new DataView(name.buffer, name.byteOffset, name.byteLength).getBigUint64(1),
      decodeDisbursementDetails(values[i]),
    ]));
  }

  /** The reclaim target of disbursement `id`, or undefined when it has none (v1, or created without one). */
  async getReclaimTarget({ id }: GetDisbursementParams): Promise<string | undefined> {
    const { reclaimTo } = await this.getDisbursement({ id });
    return reclaimTo === ALGORAND_ZERO_ADDRESS_STRING ? undefined : reclaimTo;
  }

  /** The open allocations of disbursement `id`: what `sweepExpired` (or `reclaimRewards`) would move. */
  async getSweepableAllocations({ id }: GetDisbursementParams): Promise<SweepableAllocation[]> {
    const names = (await this.algorand.app.getBoxNames(this.appId)).map(box => box.nameRaw);
    const keys = allocationKeysOf(names, BigInt(id));
    if (keys.length === 0) return [];
    const values = await this.algorand.app.getBoxValues(this.appId, keys.map(key => key.name));
    return keys.map((key, i) => ({
      address: key.address,
      asset: key.asset,
      amount: new DataView(values[i].buffer, values[i].byteOffset, values[i].byteLength).getBigUint64(0),
    }));
  }

  /**
   * IDs of the disbursements anyone may sweep now (reclaim target set, expired at the latest block).
   * A keeper calls `sweepExpired` for each.
   */
  async getSweepableDisbursementIds(): Promise<bigint[]> {
    const status = await this.algorand.client.algod.status().do();
    const block = await this.algorand.client.algod.block(status.lastRound).do();
    const now = BigInt(block.block.header.timestamp);
    return [...(await this.getDisbursements())]
      .filter(([, disbursement]) => isSweepable(disbursement, now))
      .map(([id]) => id);
  }

  /**
   * Gets a user's allocation for a specific disbursement and asset.

   */
  async getUserAllocation({ address, disbursementId, asset }: GetUserAllocationParams): Promise<bigint> {
    const allocation = await this.client.state.box.userAllocations.value({
      address,
      asset: BigInt(asset),
      disbursementId: BigInt(disbursementId),
    });

    if (allocation === undefined) {
      throw new Error(`Allocation not found for address ${address}, disbursement ${disbursementId}`);
    }

    return allocation;
  }

  /**
   * Checks if a user has an allocation for a specific disbursement and asset.
   *
   * NOTE: Property order MUST match APP_SPEC struct order (address, asset,
   * disbursementId). See getUserAllocation for the full explanation.
   */
  async hasAllocation({ address, disbursementId, asset }: GetUserAllocationParams): Promise<boolean> {
    try {
      const allocation = await this.client.state.box.userAllocations.value({
        address,
        asset: BigInt(asset),
        disbursementId: BigInt(disbursementId),
      });
      return allocation !== undefined;
    } catch {
      return false;
    }
  }

  /**
   * Gets the additional MBR credit needed to create allocation boxes.
   */
  async allocationMbrCreditShortfall({
    id,
    allocationCount,
  }: GetAllocationMbrCreditShortfallParams): Promise<bigint> {
    return await this.client.allocationMbrCreditShortfall({
      args: { id, allocationCount },
    });
  }

  // ========== Write Methods ==========

  /**
   * Opts the rewards contract into an asset.
   */
  async optIn({ sender, signer, asset }: OptInAssetParams): Promise<void> {
    const sendParams = this.getRequiredSendParams({ sender, signer });

    // Asset opt-in costs 100,000 microAlgo
    const payment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo(100_000),
      receiver: this.client.appAddress,
    });

    await this.client.send.optIn({
      ...sendParams,
      extraFee: microAlgo(1000),
      args: {
        payment,
        asset,
      },
    });
  }

  /**
   * Creates a draft disbursement; add allocations in batches, then finalize it.
   * With `reclaimTo` (v2 only), anyone can sweep what is unclaimed at `expiration` to that address.
   * Returns the disbursement ID.
   */
  async createDisbursement({
    sender,
    signer,
    title,
    timeToUnlock,
    expiration,
    note,
    mbrCredits = 0n,
    reclaimTo,
  }: CreateDisbursementParams): Promise<bigint> {
    const sendParams = this.getRequiredSendParams({ sender, signer });

    // Get MBR for this disbursement
    const mbrData = await this.mbr({ title, note });

    const mbrPayment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo(mbrData.disbursements + BigInt(mbrCredits)),
      receiver: this.client.appAddress,
    });

    const args = { mbrPayment, title, timeToUnlock, expiration, note };
    const { return: disbursementId } = reclaimTo === undefined
      ? await this.client.send.createDisbursementPayStringUint64Uint64StringUint64({ ...sendParams, args })
      : await this.client.send.createDisbursementPayStringUint64Uint64StringAddressUint64({
        ...sendParams,
        args: { ...args, reclaimTo },
      });

    if (disbursementId === undefined) {
      throw new Error('Failed to create disbursement');
    }

    return disbursementId;
  }

  /**
   * Edits an existing disbursement (only before finalization).
   */
  async editDisbursement({
    sender,
    signer,
    id,
    title,
    timeToUnlock,
    expiration,
    note,
  }: EditDisbursementParams): Promise<void> {
    const sendParams = this.getSendParams({ sender, signer });

    await this.client.send.editDisbursement({
      ...sendParams,
      args: {
        id,
        title,
        timeToUnlock,
        expiration,
        note,
      },
    });
  }

  /**
   * Helper to format allocations for the contract.
   */
  private formatAllocations(allocations: UserAllocation[]): [string, bigint | number][] {
    return allocations.map(a => [a.address, a.amount]);
  }

  /**
   * Calculates the total amount from allocations.
   */
  private sumAllocations(allocations: UserAllocation[]): bigint {
    return allocations.reduce((sum, a) => sum + BigInt(a.amount), 0n);
  }

  /**
   * Funds reusable MBR credits on a disbursement.
   */
  async fundMbrCredits({ sender, signer, id, amount }: FundMbrCreditsParams): Promise<void> {
    const sendParams = this.getRequiredSendParams({ sender, signer });

    const payment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo(BigInt(amount)),
      receiver: this.client.appAddress,
    });

    await (this.client.send as any).fundMbrCredits({
      ...sendParams,
      args: { id, payment },
    });
  }

  /**
   * Deletes a disbursement with no outstanding allocations and refunds its box MBR plus any
   * remaining MBR credits to the creator.
   */
  async closeDisbursement({ sender, signer, id }: MaybeSigner & { id: bigint | number }): Promise<void> {
    const sendParams = this.getRequiredSendParams({ sender, signer });

    await this.client.send.closeDisbursement({
      ...sendParams,
      extraFee: microAlgo(1000),
      args: { id },
    });
  }

  /**
   * Withdraws reusable MBR credits from a disbursement.
   */
  async withdrawMbrCredits({ sender, signer, id, amount }: WithdrawMbrCreditsParams): Promise<void> {
    const sendParams = this.getRequiredSendParams({ sender, signer });

    await (this.client.send as any).withdrawMbrCredits({
      ...sendParams,
      extraFee: microAlgo(1000),
      args: { id, amount },
    });
  }

  /**
   * Creates ALGO allocations using existing disbursement MBR credits.
   * Fund credits separately with fundMbrCredits when allocationMbrCreditShortfall reports a shortfall.
   */
  async createUserAllocations({
    sender,
    signer,
    id,
    allocations,
  }: CreateUserAllocationsParams): Promise<void> {
    const sendParams = this.getRequiredSendParams({ sender, signer });

    const totalAmount = this.sumAllocations(allocations);

    const payment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo(totalAmount),
      receiver: this.client.appAddress,
    });

    await (this.client.send as any).createUserAllocations({
      ...sendParams,
      args: {
        payment,
        id,
        allocations: this.formatAllocations(allocations),
      },
    });
  }

  /**
   * Creates ASA allocations using existing disbursement MBR credits.
   * Fund credits separately with fundMbrCredits when allocationMbrCreditShortfall reports a shortfall.
   */
  async createAsaUserAllocations({
    sender,
    signer,
    id,
    asset,
    allocations,
  }: CreateAsaUserAllocationsParams): Promise<void> {
    const sendParams = this.getRequiredSendParams({ sender, signer });

    const totalAmount = this.sumAllocations(allocations);

    const assetXfer = await this.client.algorand.createTransaction.assetTransfer({
      ...sendParams,
      amount: totalAmount,
      assetId: BigInt(asset),
      receiver: this.client.appAddress,
    });

    await (this.client.send as any).createAsaUserAllocations({
      ...sendParams,
      args: {
        assetXfer,
        id,
        allocations: this.formatAllocations(allocations),
      },
    });
  }

  /**
   * Creates and finalizes a multi-ASA disbursement in a single transaction group.
   *
   * Group shape:
   *   0: MBR payment
   *   1..N: ASA transfers to the rewards app
   *   N+1: createAsaDisbursementFromGroup app call
   *
   * This supports up to 14 ASA allocations in one Algorand group.
   */
  async createAsaDisbursementFromGroup({
    sender,
    signer,
    title,
    timeToUnlock,
    expiration,
    note,
    allocations,
  }: CreateAsaDisbursementFromGroupParams): Promise<bigint> {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const transactionCount = 1 + allocations.length + 1;
    if (transactionCount > MAX_ALGORAND_GROUP_SIZE) {
      throw new Error(
        `ASA disbursement requires ${transactionCount} transactions; maximum group size is ${MAX_ALGORAND_GROUP_SIZE}`,
      );
    }

    const { disbursementId } = await this.getState();
    const mbrData = await this.mbr({ title, note });
    const mbrPayment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo(mbrData.disbursements + (mbrData.userAllocations * BigInt(allocations.length))),
      receiver: this.client.appAddress,
    });

    const group = this.client.newGroup();
    (group as any).addTransaction(mbrPayment, sendParams.signer);

    for (const allocation of allocations) {
      const assetXfer = await this.client.algorand.createTransaction.assetTransfer({
        ...sendParams,
        receiver: this.client.appAddress,
        assetId: BigInt(allocation.asset),
        amount: BigInt(allocation.amount),
      });
      (group as any).addTransaction(assetXfer, sendParams.signer);
    }

    const appCall = await this.client.algorand.createTransaction.appCallMethodCall({
      ...sendParams,
      appId: this.client.appId,
      method: CREATE_ASA_DISBURSEMENT_FROM_GROUP,
      args: [
        0n,
        1n,
        title,
        timeToUnlock,
        expiration,
        note,
        allocations.map(({ address, amount }) => [address, amount]),
      ],
      note: `asa-disbursement-${disbursementId}`,
    });

    (group as any).addTransaction(appCall, sendParams.signer);
    await group.send(sendParams);

    return disbursementId;
  }

  /**
   * Finalizes a disbursement, locking it for distribution.
   */
  async finalizeDisbursement({ sender, signer, id }: FinalizeDisbursementParams): Promise<void> {
    const sendParams = this.getSendParams({ sender, signer });

    await this.client.send.finalizeDisbursement({
      ...sendParams,
      args: { id },
    });
  }

  /**
   * Creates and finalizes an ALGO disbursement in a single call.
   * With `reclaimTo` (v2 only), anyone can sweep what is unclaimed at `expiration` to that address.
   * Returns the disbursement ID.
   */
  async createInstantDisbursement({
    sender,
    signer,
    timeToUnlock,
    expiration,
    allocations,
    reclaimTo,
  }: CreateInstantDisbursementParams): Promise<bigint> {
    const sendParams = this.getRequiredSendParams({ sender, signer });

    const mbrAmount = this.instantMbr(allocations.length);
    const totalAmount = this.sumAllocations(allocations);

    const mbrPayment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo(mbrAmount + totalAmount),
      receiver: this.client.appAddress,
    });

    const formatted = this.formatAllocations(allocations);
    const { return: disbursementId } = reclaimTo === undefined
      ? await this.client.send.createInstantDisbursementPayUint64Uint64AddressUint64Uint64({
        ...sendParams,
        args: { mbrPayment, timeToUnlock, expiration, allocations: formatted },
      })
      : await this.client.send.createInstantDisbursementPayUint64Uint64AddressUint64AddressUint64({
        ...sendParams,
        args: { mbrPayment, timeToUnlock, expiration, allocations: formatted, reclaimTo },
      });

    if (disbursementId === undefined) {
      throw new Error('Failed to create instant disbursement');
    }

    return disbursementId;
  }

  /**
   * Creates and finalizes an ASA disbursement in a single call.
   * With `reclaimTo` (v2 only), anyone can sweep what is unclaimed at `expiration` to that address.
   * Returns the disbursement ID.
   */
  async createInstantAsaDisbursement({
    sender,
    signer,
    timeToUnlock,
    expiration,
    asset,
    allocations,
    reclaimTo,
  }: CreateInstantAsaDisbursementParams): Promise<bigint> {
    const sendParams = this.getRequiredSendParams({ sender, signer });

    const mbrAmount = this.instantMbr(allocations.length);
    const totalAmount = this.sumAllocations(allocations);

    const mbrPayment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo(mbrAmount),
      receiver: this.client.appAddress,
    });

    const assetXfer = await this.client.algorand.createTransaction.assetTransfer({
      ...sendParams,
      amount: totalAmount,
      assetId: BigInt(asset),
      receiver: this.client.appAddress,
    });

    const formatted = this.formatAllocations(allocations);
    const { return: disbursementId } = reclaimTo === undefined
      ? await this.client.send.createInstantAsaDisbursementPayAxferUint64Uint64AddressUint64Uint64({
        ...sendParams,
        args: { mbrPayment, assetXfer, timeToUnlock, expiration, allocations: formatted },
      })
      : await this.client.send.createInstantAsaDisbursementPayAxferUint64Uint64AddressUint64AddressUint64({
        ...sendParams,
        args: { mbrPayment, assetXfer, timeToUnlock, expiration, allocations: formatted, reclaimTo },
      });

    if (disbursementId === undefined) {
      throw new Error('Failed to create instant ASA disbursement');
    }

    return disbursementId;
  }

  /** Exact MBR an instant disbursement charges: the disbursement box plus one allocation box per entry. */
  private instantMbr(allocationCount: number): bigint {
    return MIN_DISBURSEMENTS_MBR + (USER_ALLOCATION_MBR * BigInt(allocationCount));
  }

  /**
   * Claims rewards from one or more disbursements.
   * The caller claims their allocated rewards.
   */
  async claimRewards({ sender, signer, rewards }: ClaimRewardsParams): Promise<void> {
    const sendParams = this.getSendParams({ sender, signer });

    // Format rewards as [id, asset] tuples
    const formattedRewards: [bigint | number, bigint | number][] = rewards.map(r => [r.id, r.asset]);

    await this.client.send.claimRewards({
      ...sendParams,
      // Extra fee for inner transactions (1 reward transfer per claim; MBR refund is credited)
      extraFee: microAlgo(1000 * rewards.length),
      args: {
        rewards: formattedRewards,
      },
    });
  }

  /**
   * Reclaims unclaimed rewards after a disbursement has expired.
   * Only the disbursement creator can reclaim.
   */
  async reclaimRewards({ sender, signer, id, reclaims }: ReclaimRewardsParams): Promise<void> {
    const sendParams = this.getSendParams({ sender, signer });

    // Format reclaims as [address, asset] tuples
    const formattedReclaims: [string, bigint | number][] = reclaims.map(r => [r.address, r.asset]);

    await this.client.send.reclaimRewards({
      ...sendParams,
      // Extra fee for inner transactions (1 reward transfer per reclaim; MBR refund is credited)
      extraFee: microAlgo(1000 * reclaims.length),
      args: {
        id,
        reclaims: formattedReclaims,
      },
    });
  }

  /**
   * Permissionless: after expiration, sends the listed allocations (default: every open one) and the
   * freed MBR to the disbursement's reclaim target, and closes the disbursement once it is empty.
   * The reclaim target must be opted into every swept ASA.
   */
  async sweepExpired({ sender, signer, id, reclaims }: SweepExpiredParams): Promise<void> {
    const sendParams = this.getSendParams({ sender, signer });
    const targets = reclaims ?? await this.getSweepableAllocations({ id });

    await this.client.send.sweepExpired({
      ...sendParams,
      // one ASA transfer per ASA allocation and at most two payments (ALGO amounts and freed MBR to the
      // reclaim target, freed MBR to a payer other than the creator)
      extraFee: microAlgo(1000 * (targets.filter(r => BigInt(r.asset) !== 0n).length + 2)),
      args: {
        id,
        reclaims: targets.map(r => [r.address, r.asset] as [string, bigint | number]),
      },
    });
  }

  /**
   * Updates the Akita DAO reference.
   */
  async updateAkitaDao({ sender, signer, akitaDao }: UpdateAkitaDaoParams): Promise<void> {
    const sendParams = this.getSendParams({ sender, signer });

    await this.client.send.updateAkitaDao({
      ...sendParams,
      args: { akitaDao },
    });
  }
}
