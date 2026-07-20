import { microAlgo } from "@algorandfoundation/algokit-utils";
import { ABIMethod } from "@algorandfoundation/algokit-utils/abi";
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
  UpdateAkitaDaoParams,
  UserAllocation,
} from "./types";

export * from "./types";
export * from "./errors";

const MAX_ALGORAND_GROUP_SIZE = 16;
const CREATE_ASA_DISBURSEMENT_FROM_GROUP = ABIMethod.fromSignature(
  "createAsaDisbursementFromGroup(uint64,uint64,string,uint64,uint64,string,(address,uint64)[])uint64",
);

/**
 * SDK for interacting with the Rewards contract.
 * Use this to create disbursements, manage allocations, and claim/reclaim rewards.
 */
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
    const disbursement = await this.client.state.box.disbursements.value(id);

    if (disbursement === undefined) {
      throw new Error(`Disbursement ${id} not found`);
    }

    return disbursement;
  }

  /**
   * Gets all disbursements as a map.
   */
  async getDisbursements(): Promise<Map<bigint, DisbursementDetails>> {
    const disbursements = await this.client.state.box.disbursements.getMap();
    return new Map(Array.from(disbursements.entries()).map(([key, value]) => [BigInt(key), value]));
  }

  /**
   * Gets a user's allocation for a specific disbursement and asset.
   *
   * NOTE: Property order MUST match the APP_SPEC struct declaration order
   * (address, asset, disbursementId). v10's ABIStructType encoder uses
   * Object.values() which iterates in input-object property order and then
   * maps positionally onto the declared struct fields — a mismatched order
   * silently produces the wrong box key.
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
   * Creates a new disbursement.
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
  }: CreateDisbursementParams): Promise<bigint> {
    const sendParams = this.getRequiredSendParams({ sender, signer });

    // Get MBR for this disbursement
    const mbrData = await this.mbr({ title, note });

    const mbrPayment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo(mbrData.disbursements + BigInt(mbrCredits)),
      receiver: this.client.appAddress,
    });

    const { return: disbursementId } = await this.client.send.createDisbursement({
      ...sendParams,
      args: {
        mbrPayment,
        title,
        timeToUnlock,
        expiration,
        note,
      },
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
   * Returns the disbursement ID.
   */
  async createInstantDisbursement({
    sender,
    signer,
    timeToUnlock,
    expiration,
    allocations,
  }: CreateInstantDisbursementParams): Promise<bigint> {
    const sendParams = this.getRequiredSendParams({ sender, signer });

    // MinDisbursementsMBR (41,700) + UserAllocationMBR (25,300) per allocation
    const MIN_DISBURSEMENTS_MBR = 41_700n;
    const USER_ALLOCATION_MBR = 25_300n;

    const mbrAmount = MIN_DISBURSEMENTS_MBR + (USER_ALLOCATION_MBR * BigInt(allocations.length));
    const totalAmount = this.sumAllocations(allocations);

    const mbrPayment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo(mbrAmount + totalAmount),
      receiver: this.client.appAddress,
    });

    const result = await this.client.send.createInstantDisbursement({
      ...sendParams,
      args: {
        mbrPayment,
        timeToUnlock,
        expiration,
        allocations: this.formatAllocations(allocations),
      },
    });
    const disbursementId = result.return;

    if (disbursementId === undefined) {
      throw new Error('Failed to create instant disbursement');
    }

    return disbursementId;
  }

  /**
   * Creates and finalizes an ASA disbursement in a single call.
   * Returns the disbursement ID.
   */
  async createInstantAsaDisbursement({
    sender,
    signer,
    timeToUnlock,
    expiration,
    asset,
    allocations,
  }: CreateInstantAsaDisbursementParams): Promise<bigint> {
    const sendParams = this.getRequiredSendParams({ sender, signer });

    // MinDisbursementsMBR (41,700) + UserAllocationMBR (25,300) per allocation
    const MIN_DISBURSEMENTS_MBR = 41_700n;
    const USER_ALLOCATION_MBR = 25_300n;

    const mbrAmount = MIN_DISBURSEMENTS_MBR + (USER_ALLOCATION_MBR * BigInt(allocations.length));
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

    const result = await this.client.send.createInstantAsaDisbursement({
      ...sendParams,
      args: {
        mbrPayment,
        assetXfer,
        timeToUnlock,
        expiration,
        allocations: this.formatAllocations(allocations),
      },
    });
    const disbursementId = result.return;

    if (disbursementId === undefined) {
      throw new Error('Failed to create instant ASA disbursement');
    }

    return disbursementId;
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
