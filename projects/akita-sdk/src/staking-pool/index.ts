import { microAlgo } from "@algorandfoundation/algokit-utils";
import { ABIMethod } from "algosdk";
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
  GateCheckParams,
  AssignBudgetParams,
  WithdrawRewardParams,
  CloseRewardParams,
  CloseOutAssetParams,
  RemoveEntryParams,
  AbortRoundParams,
  ReclaimRoundParams,
  EnterCostParams,
  GetStoredPrincipalParams,
  StoredPrincipal,
  DisbursementPhase,
  DistributionType,
} from "./types";

/** Rounds after the committed beacon round before a shuffle draw may read it (TRADE-3). */
export const STAKING_POOL_BEACON_LAG_ROUNDS = 4n;

export * from "./errors";
export * from "./factory";
export * from "./types";

type PoolContractArgs = StakingPoolArgs["obj"];

/** Global uint key of the child ABI marker (`PoolGlobalStateKeyPrincipalVersion`, PHASE-0-SPEC §6.5). */
export const STAKING_POOL_PRINCIPAL_VERSION_KEY = 'pv';
/** Hinted ABI signatures (the generated client suffixes overloaded names with their argument types). */
export const STAKING_POOL_HINTED_GATED_ENTER = 'gatedEnter(pay,appl,(uint64,uint64,byte[32][])[],uint64)void';
export const STAKING_POOL_LEGACY_GATED_ENTER = 'gatedEnter(pay,appl,(uint64,uint64,byte[32][])[])void';
export const STAKING_POOL_HINTED_ENTER_COST = 'enterCost(address,(uint64,uint64,byte[32][])[],byte[][],uint64)uint64';
export const STAKING_POOL_LEGACY_ENTER_COST = 'enterCost(address,(uint64,uint64,byte[32][])[])uint64';
/** `gateCheck` of pools created before principal resolution (live MainNet children; caller-supplied gate txn). */
export const STAKING_POOL_LEGACY_GATE_CHECK = 'gateCheck(appl,address,uint64)void';
/** Box MBR constants of hinted children (Q14 / Q11). */
export const STAKING_POOL_PRINCIPALS_MBR = 31_700n;
export const STAKING_POOL_ENTRY_BASE_MBR = 27_300n;
export const STAKING_POOL_ENTRY_BY_ADDRESS_MBR = 22_100n;

/** ARC-4 encoded length of a `byte[][]` (length prefix, one offset per element, each element's length prefix + bytes). */
export function encodedGateArgsLength(args: readonly Uint8Array[]): bigint {
  return BigInt(2 + args.reduce((total, arg) => total + 2 + 2 + arg.length, 0));
}

/** Exact `entries` box MBR of a hinted child for an entry stored with `args` (Q14). */
export function stakingPoolEntryMbr(args: readonly Uint8Array[] = []): bigint {
  return 2_500n + 400n * (60n + encodedGateArgsLength(args));
}

/** The name of the gate method a pre-built gate txn calls (`mustCheck` or `mustCheckFor`). */
function gateMethodName(gateTxn: { method: unknown }): string | undefined {
  const method = gateTxn.method as { name?: string | (() => string) } | undefined;
  if (method === undefined) return undefined;
  return typeof method.name === 'function' ? method.name() : method.name;
}

/**
 * SDK for interacting with an individual Staking Pool contract.
 * Use this to manage pool state, add rewards, and handle entries.
 */
export class StakingPoolSDK extends BaseSDK<StakingPoolClient> {

  private hintedPool?: boolean;

  constructor(params: NewContractSDKParams) {
    super({ factory: StakingPoolFactory, ...params });
  }

  /**
   * True when the pool is a principal-resolution child (global `pv`): it has the hinted
   * `gatedEnter(…,uint64)` / `enterCost(…,byte[][],uint64)` next to the legacy shims. Older
   * children only have the legacy ABI. Cached per SDK instance (the marker never changes).
   */
  async isHintedPool(): Promise<boolean> {
    if (this.hintedPool === undefined) {
      let version: bigint | undefined;
      try {
        version = await this.client.state.global.principalVersion();
      } catch {
        version = undefined;
      }
      this.hintedPool = version !== undefined && version > 0n;
    }
    return this.hintedPool;
  }

  /**
   * The stored pair `(W, principal)` the pool re-checks the entrant's gate with (box `'i'`).
   * `{ wallet: 0n, principal: address }` when none is stored or the pool predates the marker.
   */
  async getStoredPrincipal({ address }: GetStoredPrincipalParams): Promise<StoredPrincipal> {
    if (!(await this.isHintedPool())) {
      return { wallet: 0n, principal: address };
    }
    const pair = await this.client.getStoredPrincipal({ args: { address } });
    return { wallet: BigInt(pair.wallet), principal: pair.principal };
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

  /**
   * Re-evaluates the pool gate for an entrant with the arguments stored at entry, and
   * disqualifies the entry if it no longer passes. Anyone may call it (no open round).
   */
  async gateCheck({ sender, signer, address, asset, gateTxn }: GateCheckParams): Promise<void> {
    if (!(await this.isHintedPool())) {
      // Pre-principal child (compat finding 1): only the deployed ABI is routed.
      if (gateTxn === undefined) {
        throw new Error('This staking pool predates principal resolution: pass gateTxn (Gate.mustCheck) for gateCheck(appl,address,uint64)');
      }
      await this.client.algorand.newGroup()
        .addAppCallMethodCall({
          ...this.getRequiredSendParams({ sender, signer }),
          appId: this.client.appId,
          method: ABIMethod.fromSignature(STAKING_POOL_LEGACY_GATE_CHECK),
          args: [gateTxn, address, asset],
        })
        .send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
      return;
    }
    if (gateTxn !== undefined) {
      throw new Error('This staking pool re-runs the stored gate args itself: do not pass gateTxn');
    }
    const group = this.client.newGroup();
    group.gateCheck({ ...this.getSendParams({ sender, signer }), args: { address, asset } });
    await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
  }

  /**
   * MBR an ALGO `addReward` payment must cover before its surplus becomes the reward's budget
   * (reward box plus budget bookkeeping boxes).
   */
  async getAddRewardCost({ winnerCount, asset }: { winnerCount: bigint | number; asset: bigint | number }): Promise<bigint> {
    return (await this.client.addRewardCost({ args: { winnerCount, asset } })) ?? 0n;
  }

  /** Remaining budget reserved for a reward (0 for a legacy reward without one). */
  async getRewardBudget(rewardId: bigint | number): Promise<bigint> {
    return (await this.client.getRewardBudget({ args: { rewardId } })) ?? 0n;
  }

  /** Funds of `asset` (0 = ALGO, above the minimum balance) not reserved by any reward. */
  async getFreeFunds(asset: bigint | number): Promise<bigint> {
    return (await this.client.getFreeFunds({ args: { asset } })) ?? 0n;
  }

  /** Number of reward rounds currently open (entries, checks and removals are frozen while > 0). */
  async getOpenRounds(): Promise<bigint> {
    return (await this.client.getOpenRounds({ args: {} })) ?? 0n;
  }

  /**
   * Number of entries that exist now. `maxEntries` caps this number; `getState().entryCount` is the
   * number of entry ids ever issued, which only grows.
   */
  async getLiveEntries(): Promise<bigint> {
    return (await this.client.state.global.liveEntries()) ?? 0n;
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
   *
   * Hinted pools (`isHintedPool`) quote the exact Q14 box MBR for the gate `args` the entry will
   * store, plus the stored pair (31,700) when `wallet != 0` on a gated pool. Pass `legacy: true`
   * (or use an older pool) for the legacy quote that the legacy `gatedEnter` shim charges.
   */
  async enterCost({ address, assets, args = [], wallet = 0n, legacy = false }: EnterCostParams): Promise<bigint> {
    const entries = assets.map((asset) => [BigInt(asset), 0n, []] as [bigint, bigint, Uint8Array[]]);
    if (!legacy && await this.isHintedPool()) {
      return await this.client.enterCostAddressUint64Uint64Byte_32ByteUint64Uint64({
        args: { address, entries, args: [...args], wallet: BigInt(wallet) },
      });
    }
    // The legacy quote of a gated hinted pool reads the EscrowFactory registry with one inner call
    // (pooled fee 0), so the simulated outer call must carry that fee. Older pools ignore the surplus.
    return await this.client.enterCostAddressUint64Uint64Byte_32Uint64({
      args: { address, entries },
      extraFee: microAlgo(1_000),
    });
  }

  /**
   * Enters the pool with specified entries.
   *
   * Gated pools: the ABI follows the gate txn. A `Gate.mustCheckFor(ctx, …)` txn (GateSDK
   * `build.mustCheckFor`, ctx = the principal the pool resolves for `wallet`) goes to the hinted
   * `gatedEnter(…, wallet)`; a legacy `Gate.mustCheck(caller, …)` txn goes to the legacy shim.
   * Direct (top-level) callers act as themselves: `wallet` must be `0` (a non-zero hint reverts with
   * `errHtop` outside an app call).
   */
  async enter({ sender, signer, entries, gateTxn, wallet = 0n }: EnterPoolParams): Promise<void> {
    const assets = entries.map(({ asset }) => BigInt(asset));
    if (new Set(assets).size !== assets.length) {
      throw new Error('Each asset can only be entered once per staking pool request');
    }

    const sendParams = this.getRequiredSendParams({ sender, signer });
    const hinted = await this.isHintedPool();
    const ctxGate = gateTxn !== undefined && gateMethodName(gateTxn) === 'mustCheckFor';
    if (ctxGate && !hinted) {
      throw new Error('This staking pool predates principal resolution: build the gate txn with Gate.mustCheck');
    }
    const gateArgs = ctxGate ? ((gateTxn!.args?.[2] ?? []) as Uint8Array[]) : [];

    // Get the entry box MBR and any app-scoped SOFT stake MBR from the contract.
    const paymentAmount = await this.enterCost({
      address: sendParams.sender.toString(),
      assets,
      args: gateArgs,
      wallet: ctxGate ? wallet : 0n,
      legacy: gateTxn !== undefined && !ctxGate,
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

    const group = this.client.newGroup();
    if (ctxGate) {
      group.gatedEnterPayApplUint64Uint64Byte_32Uint64Void({
        ...sendParams,
        args: {
          payment,
          gateTxn: gateTxn!,
          entries: formattedEntries,
          wallet: BigInt(wallet),
        }
      });
    } else if (gateTxn !== undefined) {
      group.gatedEnterPayApplUint64Uint64Byte_32Void({
        ...sendParams,
        args: {
          payment,
          gateTxn,
          entries: formattedEntries,
        }
      });
    } else {
      group.enter({
        ...sendParams,
        args: {
          payment,
          entries: formattedEntries,
        }
      });
    }
    await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
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
   * First round a shuffle reward's draw may run (TRADE-3): its committed beacon round plus the
   * beacon lag. 0 when there is nothing to draw (not allocating, not a shuffle, or already drawn).
   * `raffle` / `disburseRewards` before that round fail with errBnrd.
   */
  async drawReadyRound(rewardId: number): Promise<bigint> {
    const reward = await this.getReward(rewardId);
    if (
      reward.phase !== DisbursementPhase.Allocation ||
      reward.distribution !== DistributionType.Shuffle ||
      reward.winningTickets.length > 0
    ) {
      return 0n;
    }
    return reward.activeDisbursementRoundStart + STAKING_POOL_BEACON_LAG_ROUNDS;
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

  /** Creator reserves free funds of the reward's asset for that reward. */
  async assignBudget({ sender, signer, rewardId, amount }: AssignBudgetParams): Promise<void> {
    await this.client.send.assignBudget({ ...this.getSendParams({ sender, signer }), args: { rewardId, amount } });
  }

  /** Creator withdraws unspent reward budget (pool must be a draft or ended). */
  async withdrawReward({ sender, signer, rewardId, amount }: WithdrawRewardParams): Promise<void> {
    await this.client.send.withdrawReward({
      ...this.getSendParams({ sender, signer }),
      args: { rewardId, amount },
      extraFee: microAlgo(1_000),
      populateAppCallResources: true,
    });
  }

  /** Creator deletes an idle reward with an empty budget and receives the freed box MBR. */
  async closeReward({ sender, signer, rewardId }: CloseRewardParams): Promise<void> {
    await this.client.send.closeReward({
      ...this.getSendParams({ sender, signer }),
      args: { rewardId },
      extraFee: microAlgo(1_000),
      populateAppCallResources: true,
    });
  }

  /** Creator closes the pool out of an ASA no reward reserves; the remainder goes to the creator. */
  async closeOutAsset({ sender, signer, asset }: CloseOutAssetParams): Promise<void> {
    await this.client.send.closeOutAsset({
      ...this.getSendParams({ sender, signer }),
      args: { asset },
      extraFee: microAlgo(1_000),
      populateAppCallResources: true,
    });
  }

  /** Creator ends a perpetual pool, starting a one-week grace period. */
  async endPool(params?: MaybeSigner): Promise<void> {
    await this.client.send.endPool({ ...this.getSendParams(params), args: {} });
  }

  /** Removes an entry and refunds its MBR (entrant any time no round is open; anyone after the end). */
  async removeEntry({ sender, signer, address, asset }: RemoveEntryParams): Promise<void> {
    const group = this.client.newGroup();
    group.removeEntry({ ...this.getSendParams({ sender, signer }), args: { address, asset } });
    await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
  }

  /**
   * Creator or DAO wallet unsticks a reward round. Once the committed beacon round of a shuffle
   * round is reached, only the DAO wallet can abort it.
   */
  async abortRound({ sender, signer, rewardId, mode }: AbortRoundParams): Promise<void> {
    const group = this.client.newGroup();
    group.abortRound({ ...this.getSendParams({ sender, signer }), args: { rewardId, mode: BigInt(mode) } });
    await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
  }

  /** Recovers expired allocations and/or closes a finalized round's Rewards disbursement. */
  async reclaimRound({ sender, signer, disbursementId, reclaims, close }: ReclaimRoundParams): Promise<void> {
    const group = this.client.newGroup();
    group.reclaimRound({
      ...this.getSendParams({ sender, signer }),
      args: {
        disbursementId,
        reclaims: reclaims.map(({ address, asset }) => [address, asset] as [string, bigint | number]),
        close,
      },
    });
    await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
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
