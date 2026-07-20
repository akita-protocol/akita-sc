import { microAlgo } from "@algorandfoundation/algokit-utils";
import { BaseSDK } from "../base";
import {
  StakingPoolClient,
  StakingPoolFactory,
  StakingPoolArgs,
  StakingPoolState,
  StakingPoolMbrData,
  Reward
} from '../generated/StakingPoolClient';
import { GroupReturn, MaybeSigner, NewContractSDKParams } from "../types";
import {
  AddRewardParams,
  AddRewardAsaParams,
  FinalizePoolParams,
  EnterPoolParams,
  StartDisbursementParams,
  RaffleParams,
  DisburseRewardsParams,
  FinalizeDistributionParams,
  OptinAssetParams,
  CheckParams,
  CheckResult,
  IsEnteredParams,
  StakingPoolMbrParams,
  GateCheckParams
} from "./types";

export * from "./errors";
export * from "./factory";
export * from "./types";

type PoolContractArgs = StakingPoolArgs["obj"];

/**
 * SDK for interacting with an individual Staking Pool contract.
 * Use this to manage pool state, add rewards, and handle entries.
 */
export class StakingPoolSDK extends BaseSDK<StakingPoolClient> {

  constructor(params: NewContractSDKParams) {
    super({ factory: StakingPoolFactory, ...params });
  }

  // ========== Read Methods ==========

  /**
   * Gets the current state of the pool.
   */
  async getState(): Promise<StakingPoolState> {
    const { return: state } = await this.client.send.getState({ args: {} });

    if (state === undefined) {
      throw new Error('Failed to get pool state');
    }

    return state;
  }

  /**
   * Checks if pool signups are currently open.
   */
  async signUpsOpen(): Promise<boolean> {
    const isOpen = await this.client.signUpsOpen();
    return isOpen ?? false;
  }

  /**
   * Checks if the pool is currently live (active).
   */
  async isLive(): Promise<boolean> {
    const isLive = await this.client.isLive();
    return isLive ?? false;
  }

  /**
   * Checks if an address is entered in the pool.
   */
  async isEntered({ address }: IsEnteredParams): Promise<boolean> {
    const entered = await this.client.isEntered({ args: { address } });
    return entered ?? false;
  }

  /**
   * Checks eligibility and stake amount for an address/asset combination.
   */
  async check({ address, asset }: CheckParams): Promise<CheckResult> {
    const { return: result } = await this.client.send.check({
      args: { address, asset },
      extraFee: microAlgo(1_000),
    });

    if (result === undefined) {
      throw new Error('Failed to check eligibility');
    }

    return {
      isEligible: result.valid,
      stake: result.balance
    };
  }

  async gateCheck({ gateTxn, address, asset }: GateCheckParams): Promise<void> {
    const group = this.client.newGroup();
    group.gateCheck({ ...this.getSendParams(), args: { gateTxn, address, asset } });
    await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
  }

  /**
   * Gets MBR data for the pool based on winning tickets count.
   */
  async getMbr({ winningTickets }: StakingPoolMbrParams): Promise<StakingPoolMbrData> {
    const { return: mbrData } = await this.client.send.mbr({ args: { winningTickets } });

    if (mbrData === undefined) {
      throw new Error('Failed to get MBR data');
    }

    return mbrData;
  }


  async getReward(rewardId: number): Promise<Reward> {
    const reward = await this.client.state.box.rewards.value(rewardId);

    if (reward === undefined) {
      throw new Error('Failed to get reward');
    }

    return reward;
  }

  async getRewards(): Promise<Map<number, Reward>> {
    const rewards = await this.client.state.box.rewards.getMap();
    return new Map(Array.from(rewards.entries()).map(([key, value]) => [Number(key), value]));
  }

  // ========== Write Methods ==========

  /**
   * Initializes the pool after creation.
   */
  async init(params?: MaybeSigner): Promise<void> {
    const sendParams = this.getSendParams(params);

    await this.client.send.init({
      ...sendParams,
      args: { akitaRoyalty: 0n }
    });
  }

  /**
   * Opts the pool contract into an asset.
   */
  async optIn({ sender, signer, asset }: OptinAssetParams): Promise<GroupReturn> {

    const sendParams = this.getRequiredSendParams({ sender, signer });

    const cost = await this.client.optInCost({ args: { asset } });

    const payment = this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo(cost),
      receiver: this.client.appAddress,
    });

    const group = this.client.newGroup();

    group.optIn({
      ...sendParams,
      args: {
        payment,
        asset
      }
    });

    return await group.send({ ...sendParams, });
  }

  /**
   * Adds a reward to the pool.
   */
  async addReward({ sender, signer, reward, amount }: AddRewardAsaParams): Promise<void> {

    const sendParams = this.getRequiredSendParams({ sender, signer });

    // Get MBR for reward
    const mbrData = await this.getMbr({ winningTickets: reward.winnerCount });

    const payment = this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo(mbrData.rewards),
      receiver: this.client.appAddress,
    });

    const assetXfer = this.client.algorand.createTransaction.assetTransfer({
      ...sendParams,
      amount: BigInt(amount),
      assetId: BigInt(reward.asset),
      receiver: this.client.appAddress,
    });

    await this.client.send.addRewardAsa({
      ...sendParams,
      args: {
        payment,
        assetXfer,
        reward
      }
    });
  }

  /**
   * Finalizes the pool with signup, start, and end timestamps.
   */
  async finalize({ sender, signer, signupTimestamp, startTimestamp, endTimestamp }: FinalizePoolParams): Promise<void> {

    const sendParams = this.getSendParams({ sender, signer });

    await this.client.send.finalize({
      ...sendParams,
      args: {
        signupTimestamp,
        startTimestamp,
        endTimestamp
      }
    });
  }

  /**
   * Gets the cost to enter the pool for a given address and set of assets.
   * This calls the contract's enterCost method, which accounts for entry box MBR
   * and any app-scoped SOFT stake MBR.
   */
  async enterCost({ address, assets }: { address: string; assets: (bigint | number)[] }): Promise<bigint> {
    return await this.client.enterCost({
      args: {
        address,
        entries: assets.map((asset) => [BigInt(asset), 0n, []]),
      }
    });
  }

  /**
   * Enters the pool with specified entries.
   */
  async enter({ sender, signer, entries, gateTxn }: EnterPoolParams): Promise<void> {
    const assets = entries.map(({ asset }) => BigInt(asset));
    if (new Set(assets).size !== assets.length) {
      throw new Error('Each asset can only be entered once per staking pool request');
    }

    const sendParams = this.getRequiredSendParams({ sender, signer });

    // Get the entry box MBR and any app-scoped SOFT stake MBR from the contract.
    const paymentAmount = await this.enterCost({
      address: sendParams.sender.toString(),
      assets
    });

    const payment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo(paymentAmount),
      receiver: this.client.appAddress,
    });

    // Transform entries to the expected format
    const formattedEntries: [bigint | number, bigint | number, Uint8Array[]][] = entries.map(e => [
      e.asset,
      e.amount,
      e.proofs ?? []
    ]);

    const isGated = gateTxn !== undefined;

    if (isGated) {
      const group = this.client.newGroup();
      group.gatedEnter({
        ...sendParams,
        args: {
          payment,
          gateTxn,
          entries: formattedEntries,
        }
      });
      await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
    } else {
      const group = this.client.newGroup();
      group.enter({
        ...sendParams,
        args: {
          payment,
          entries: formattedEntries,
        }
      });
      await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
    }
  }

  /**
   * Starts the disbursement phase for a reward.
   */
  async startDisbursement({ sender, signer, rewardId }: StartDisbursementParams): Promise<void> {

    const sendParams = this.getSendParams({ sender, signer });

    await this.client.send.startDisbursement({
      ...sendParams,
      args: { rewardId }
    });
  }

  /**
   * Runs a raffle for a raffle-type reward.
   */
  async raffle({ sender, signer, rewardId }: RaffleParams): Promise<void> {

    const sendParams = this.getSendParams({ sender, signer });

    await this.client.send.raffle({
      ...sendParams,
      args: { rewardId }
    });
  }

  /**
   * Disburses rewards to participants.
   */
  async disburseRewards({ sender, signer, rewardId, iterationAmount }: DisburseRewardsParams): Promise<void> {

    const sendParams = this.getSendParams({ sender, signer });

    await this.client.send.disburseRewards({
      ...sendParams,
      args: {
        rewardId,
        iterationAmount
      }
    });
  }

  /**
   * Finalizes the distribution for a reward.
   */
  async finalizeDistribution({ sender, signer, rewardId }: FinalizeDistributionParams): Promise<void> {

    const sendParams = this.getSendParams({ sender, signer });

    await this.client.send.finalizeDistribution({
      ...sendParams,
      args: { rewardId }
    });
  }

  /**
   * Updates the Akita DAO escrow reference.
   */
  async updateAkitaDAOEscrow({ sender, signer, config }: MaybeSigner & PoolContractArgs['updateAkitaDAOEscrow((string,uint64))void']): Promise<void> {

    const sendParams = this.getSendParams({ sender, signer });

    await this.client.send.updateAkitaDaoEscrow({
      ...sendParams,
      args: { config }
    });
  }

  /**
   * Updates the Akita DAO reference.
   */
  async updateAkitaDAO({ sender, signer, akitaDao }: MaybeSigner & PoolContractArgs['updateAkitaDAO(uint64)void']): Promise<void> {

    const sendParams = this.getSendParams({ sender, signer });

    await this.client.send.updateAkitaDao({
      ...sendParams,
      args: { akitaDao }
    });
  }
}
