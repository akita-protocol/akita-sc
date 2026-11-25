import * as algokit from '@algorandfoundation/algokit-utils';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { TransactionSignerAccount as AddressWithTransactionSigner } from '@algorandfoundation/algokit-utils/types/account';
import { beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { newWallet, StakingPoolPluginSDK, WalletSDK, CallerType } from 'akita-sdk/wallet';
import { StakingType } from 'akita-sdk/staking';
import { StakingPoolSDK } from 'akita-sdk/staking-pool';
import algosdk from 'algosdk';
import { MetaSDK, MerkleTree, SchemaPart } from '../../../../../akita-sdk/src/meta';
import { AkitaUniverse, buildAkitaUniverse } from '../../../../tests/fixtures/dao';
import { buildAddPluginAction, proposeAndExecute } from '../../dao/tests/utils';
import { errFactoryOnlyInit } from '../../../staking-pool/errors';

algokit.Config.configure({ populateAppCallResources: true });

const fixture = algorandFixture();

const POOL_STATUS_DRAFT = 0;
const POOL_STATUS_FINAL = 10;
const POOL_STAKING_TYPE_NONE = 0;
const POOL_STAKING_TYPE_SOFT = 20;
const APP_STAKES_MBR = 34_900n;
const DISTRIBUTION_TYPE_FLAT = 20;
const ONE_DAY = 86_400;
const ONE_HOUR = 3_600;
const ONE_MINUTE = 60;

const getBlockTimestamp = async (
  algorand: import('@algorandfoundation/algokit-utils').AlgorandClient,
): Promise<bigint> => {
  const status = await algorand.client.algod.status().do();
  const block = await algorand.client.algod.block(status.lastRound).do();
  return BigInt(block.block.header.timestamp);
};

type AddRewardInput = {
  asset: bigint;
  distribution: number;
  rate: bigint;
  expiration: bigint;
  interval: bigint;
  winnerCount: bigint;
};

const createReward = (overrides: Partial<AddRewardInput> = {}): AddRewardInput => ({
  asset: 0n,
  distribution: DISTRIBUTION_TYPE_FLAT,
  rate: 1_000_000n,
  expiration: BigInt(ONE_DAY),
  interval: BigInt(ONE_HOUR),
  winnerCount: 0n,
  ...overrides,
});

const findLastCreatedAppId = (nodes: unknown[]): bigint | undefined => {
  let appId: bigint | undefined;

  const walk = (node: unknown): void => {
    if (node === null || typeof node !== 'object') return;
    const txn = node as unknown as Record<string, unknown>;
    const created = txn.applicationIndex ?? txn['application-index'] ?? txn.createdApplicationIndex;
    if (typeof created === 'bigint') {
      appId = created;
    } else if (typeof created === 'number') {
      appId = BigInt(created);
    }

    const innerTxns = txn.innerTxns ?? txn['inner-txns'];
    if (Array.isArray(innerTxns)) {
      innerTxns.forEach(walk);
    }
  };

  nodes.forEach(walk);
  return appId;
};

const getCreatedAppIds = async (
  algorand: import('@algorandfoundation/algokit-utils').AlgorandClient,
  address: import('algosdk').Address,
): Promise<bigint[]> => {
  const accountInfo = await algorand.client.algod.accountInformation(address).do() as unknown as Record<string, unknown>;
  const createdApps = accountInfo.createdApps ?? accountInfo['created-apps'];
  if (!Array.isArray(createdApps)) return [];

  return createdApps
    .map((app) => {
      const appRecord = app as unknown as Record<string, unknown>;
      const id = appRecord.id ?? appRecord.index ?? appRecord.applicationIndex ?? appRecord['application-index'];
      return typeof id === 'bigint' ? id : typeof id === 'number' ? BigInt(id) : undefined;
    })
    .filter((id): id is bigint => id !== undefined);
};

describe('StakingPool plugin contract', () => {
  let deployer: AddressWithTransactionSigner;
  let user: AddressWithTransactionSigner;
  let akitaUniverse: AkitaUniverse;
  let dispenser: AddressWithTransactionSigner;
  let algorand: import('@algorandfoundation/algokit-utils').AlgorandClient;
  let wallet: WalletSDK;
  let stakingPoolPluginSdk: StakingPoolPluginSDK;

  beforeAll(async () => {
    await fixture.newScope();
    algorand = fixture.context.algorand;
    dispenser = await algorand.account.dispenserFromEnvironment();

    const ctx = fixture.context;
    deployer = await ctx.generateAccount({ initialFunds: algokit.microAlgos(2_000_000_000) });
    user = await ctx.generateAccount({ initialFunds: algokit.microAlgos(2_000_000_000) });

    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (2000).algo());
    await algorand.account.ensureFunded(user.addr, dispenser.addr, (2_000).algo());

    // Build the full Akita DAO universe
    akitaUniverse = await buildAkitaUniverse({
      fixture,
      sender: deployer.addr,
      signer: deployer.signer,
      apps: {},
    });

    // Create a user wallet for testing
    wallet = await newWallet({
      algorand,
      factoryParams: {
        appId: akitaUniverse.walletFactory.appId,
        defaultSender: user.addr,
        defaultSigner: user.signer,
      },
      sender: user.addr,
      signer: user.signer,
      nickname: 'Test Wallet',
    });

    // Get the plugin SDK and add it to the wallet once
    stakingPoolPluginSdk = akitaUniverse.stakingPoolPlugin;
    const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n });
    await wallet.client.appClient.fundAppAccount({ amount: algokit.microAlgo(mbr.plugins + 500_000_000n) });
    await wallet.addPlugin({ client: stakingPoolPluginSdk, callerType: CallerType.Admin });
  });

  beforeEach(fixture.newScope);

  const createPluginPool = async (
    title = 'Plugin Staking Pool',
    overrides: { allowLateSignups?: boolean; type?: number; stakeKey?: { address: string; name: string } } = {},
  ): Promise<StakingPoolSDK> => {
    const factoryAddress = akitaUniverse.stakingPoolFactory.client.appAddress;
    const createdBefore = new Set(await getCreatedAppIds(algorand, factoryAddress));

    const result = await wallet.usePlugin({
      callerType: CallerType.Admin,
      calls: [
        stakingPoolPluginSdk.newPool({
          title,
          type: overrides.type ?? POOL_STAKING_TYPE_NONE,
          marketplace: user.addr.toString(),
          stakeKey: overrides.stakeKey ?? {
            address: algosdk.ALGORAND_ZERO_ADDRESS_STRING,
            name: '',
          },
          minimumStakeAmount: 0n,
          allowLateSignups: overrides.allowLateSignups ?? false,
          gateId: 0n,
          maxEntries: 0n,
        }),
      ],
    });

    const poolAppId = findLastCreatedAppId(result.confirmations)
      ?? (await getCreatedAppIds(algorand, factoryAddress)).find((appId) => !createdBefore.has(appId));

    expect(poolAppId).toBeGreaterThan(0n);

    return akitaUniverse.stakingPoolFactory.get({ appId: poolAppId! });
  };

  const finalizePluginPool = async (pool: StakingPoolSDK) => {
    const now = await getBlockTimestamp(algorand);
    const signupTimestamp = now + BigInt(ONE_MINUTE);
    const startTimestamp = now + BigInt(ONE_HOUR);
    const endTimestamp = now + BigInt(ONE_DAY);

    await wallet.usePlugin({
      callerType: CallerType.Admin,
      calls: [
        stakingPoolPluginSdk.finalizePool({
          poolId: pool.appId,
          signupTimestamp,
          startTimestamp,
          endTimestamp,
        }),
      ],
    });

    return { signupTimestamp, startTimestamp, endTimestamp };
  };

  describe('StakingPoolPlugin SDK', () => {
    test('plugin can be added to wallet', async () => {
      // Verify the plugin was successfully added
      const plugins = await wallet.getPlugins();
      expect(plugins.size).toBe(1);
      expect(stakingPoolPluginSdk.appId).toBeGreaterThan(0n);
    });

    test('newPool creates a draft staking pool for the wallet', async () => {
      const pool = await createPluginPool('Plugin Created Pool');

      const state = await pool.getState();
      expect(Number(state.status)).toBe(POOL_STATUS_DRAFT);
      expect(state.title).toBe('Plugin Created Pool');
      expect(Number(state.type)).toBe(POOL_STAKING_TYPE_NONE);
      expect(state.creator).toBe(wallet.client.appAddress.toString());
    });

    test('DAO-created pools skip creation fees and reward royalties', async () => {
      await proposeAndExecute(akitaUniverse.dao, [
        buildAddPluginAction({
          client: stakingPoolPluginSdk,
          // a grant anyone may use is refused by the plugin, so the DAO names the caller
          callerType: CallerType.Other,
          caller: deployer.addr.toString(),
          useExecutionKey: false,
        }),
      ]);

      const daoWallet = akitaUniverse.dao.wallet;
      const factory = akitaUniverse.stakingPoolFactory;
      const factoryAddress = factory.client.appAddress;
      const createdBefore = new Set(await getCreatedAppIds(algorand, factoryAddress));
      const escrow = await factory.client.state.global.akitaDaoEscrow();
      if (!escrow?.app) throw new Error('Staking pool DAO escrow is not configured');

      const escrowAddress = algosdk.getApplicationAddress(escrow.app).toString();
      const escrowBalanceBefore = BigInt((await algorand.client.algod.accountInformation(escrowAddress).do()).amount);

      const result = await daoWallet.usePlugin({
        sender: deployer.addr,
        signer: deployer.signer,
        calls: [
          stakingPoolPluginSdk.newPool({
            title: 'DAO Fee Exempt Pool',
            type: POOL_STAKING_TYPE_NONE,
            marketplace: daoWallet.client.appAddress.toString(),
            stakeKey: {
              address: algosdk.ALGORAND_ZERO_ADDRESS_STRING,
              name: '',
            },
            minimumStakeAmount: 0n,
            allowLateSignups: true,
            gateId: 0n,
            maxEntries: 0n,
          }),
        ],
      });

      const poolAppId = findLastCreatedAppId(result.confirmations)
        ?? (await getCreatedAppIds(algorand, factoryAddress)).find((appId) => !createdBefore.has(appId));
      expect(poolAppId).toBeGreaterThan(0n);

      const pool = factory.get({ appId: poolAppId! });
      const state = await pool.getState();
      const royalty = await pool.client.state.global.akitaRoyalty();
      const escrowBalanceAfter = BigInt((await algorand.client.algod.accountInformation(escrowAddress).do()).amount);

      expect(state.creator).toBe(daoWallet.client.appAddress.toString());
      expect(royalty).toBe(0n);
      expect(escrowBalanceAfter).toBe(escrowBalanceBefore);
    });

    test('initPool is rejected by an already factory-initialized pool', async () => {
      const pool = await createPluginPool('Plugin Init Pool');

      await expect(wallet.usePlugin({
        callerType: CallerType.Admin,
        calls: [
          stakingPoolPluginSdk.initPool({
            poolId: pool.appId,
          }),
        ],
      })).rejects.toThrow(new RegExp(`assert failed|${errFactoryOnlyInit}|Runtime error`));

      const state = await pool.getState();
      expect(state.title).toBe('Plugin Init Pool');
      expect(Number(state.status)).toBe(POOL_STATUS_DRAFT);
    });

    test('addReward adds an ALGO reward through the plugin path', async () => {
      const pool = await createPluginPool('Plugin Reward Pool');
      const before = await pool.getState();

      await wallet.usePlugin({
        callerType: CallerType.Admin,
        calls: [
          stakingPoolPluginSdk.addReward({
            appId: pool.appId,
            reward: createReward(),
            amount: 1_000_000n,
          }),
        ],
      });

      const after = await pool.getState();
      expect(after.rewardCount).toBe(before.rewardCount + 1n);

      const reward = await pool.getReward(Number(after.rewardCount));
      expect(reward.asset).toBe(0n);
      expect(reward.rate).toBe(1_000_000n);
    });

    test('an ALGO reward added through the plugin is funded with the whole amount', async () => {
      const pool = await createPluginPool('Plugin Reward Budget Pool');

      // The first ALGO reward also creates the pool's ALGO total box, the second one does not.
      for (const rewardId of [1, 2]) {
        const freeBefore = await pool.getFreeFunds(0n);

        await wallet.usePlugin({
          callerType: CallerType.Admin,
          calls: [
            stakingPoolPluginSdk.addReward({
              appId: pool.appId,
              reward: createReward(),
              amount: 1_000_000n,
            }),
          ],
        });

        // The wallet pays the storage on top of the amount, so the budget covers one full round
        // at this rate and the pool's own free ALGO is left as it was.
        expect(await pool.getRewardBudget(rewardId)).toBe(1_000_000n);
        expect(await pool.getFreeFunds(0n)).toBe(freeBefore);
      }
    });

    test('an ASA reward added through the plugin opts the pool in and funds the reward', async () => {
      const { assetId } = await algorand.send.assetCreate({
        sender: deployer.addr, signer: deployer.signer, total: 1_000_000n, decimals: 0, assetName: 'Plugin Pool Reward', unitName: 'PPR',
      });
      const rewardAsset = BigInt(assetId!);

      await wallet.addPlugin({ client: akitaUniverse.optInPlugin, callerType: CallerType.Global });
      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [akitaUniverse.optInPlugin.optIn({ assets: [rewardAsset] })],
      });
      await algorand.send.assetTransfer({
        sender: deployer.addr, signer: deployer.signer, assetId: rewardAsset, amount: 10_000n, receiver: wallet.client.appAddress,
      });

      const pool = await createPluginPool('Plugin ASA Reward Pool');
      const poolHolding = async (): Promise<bigint | undefined> => {
        const info = await algorand.client.algod.accountInformation(pool.client.appAddress).do();
        return (info.assets ?? []).find((holding) => BigInt(holding.assetId) === rewardAsset)?.amount;
      };
      expect(await poolHolding()).toBeUndefined();

      // The pool does not hold the asset yet: the plugin pays the opt-in the pool quotes, then the reward.
      await wallet.usePlugin({
        callerType: CallerType.Admin,
        consolidateFees: true,
        calls: [
          stakingPoolPluginSdk.addReward({
            appId: pool.appId,
            reward: createReward({ asset: rewardAsset, rate: 100n }),
            amount: 2_400n,
          }),
        ],
      });

      expect(await poolHolding()).toBe(2_400n);
      expect((await pool.getReward(1)).asset).toBe(rewardAsset);
      expect(await pool.getRewardBudget(1)).toBe(2_400n);

      // The pool holds the asset now. A second reward pays for its own boxes, so the ALGO the
      // opt-in left for round operations is untouched.
      const freeBefore = await pool.getFreeFunds(0n);
      await wallet.usePlugin({
        callerType: CallerType.Admin,
        consolidateFees: true,
        calls: [
          stakingPoolPluginSdk.addReward({
            appId: pool.appId,
            reward: createReward({ asset: rewardAsset, rate: 100n }),
            amount: 1_200n,
          }),
        ],
      });

      expect(await poolHolding()).toBe(3_600n);
      expect(await pool.getRewardBudget(2)).toBe(1_200n);
      expect(await pool.getFreeFunds(0n)).toBe(freeBefore);
    });

    test('finalizePool finalizes a draft pool with future timestamps', async () => {
      const pool = await createPluginPool('Plugin Finalize Pool');
      const timestamps = await finalizePluginPool(pool);

      const state = await pool.getState();
      expect(Number(state.status)).toBe(POOL_STATUS_FINAL);
      expect(state.signupTimestamp).toBe(timestamps.signupTimestamp);
      expect(state.startTimestamp).toBe(timestamps.startTimestamp);
      expect(state.endTimestamp).toBe(timestamps.endTimestamp);
    });

    test('enter records a wallet entry while signups are open', async () => {
      const pool = await createPluginPool('Plugin Entry Pool', { allowLateSignups: true });
      const now = await getBlockTimestamp(algorand);
      const signupTimestamp = 0n;
      const startTimestamp = 0n;
      const endTimestamp = now + BigInt(ONE_DAY);

      await wallet.usePlugin({
        callerType: CallerType.Admin,
        calls: [
          stakingPoolPluginSdk.finalizePool({
            poolId: pool.appId,
            signupTimestamp,
            startTimestamp,
            endTimestamp,
          }),
        ],
      });

      await algorand.send.payment({
        sender: dispenser.addr,
        signer: dispenser.signer,
        receiver: wallet.client.appAddress,
        amount: algokit.microAlgo(10_000_000n),
      });
      await wallet.usePlugin({
        callerType: CallerType.Admin,
        calls: [
          stakingPoolPluginSdk.enter({
            appId: pool.appId,
            entries: [[0n, 1_000_000n, []]],
            args: [],
          }),
        ],
      });

      const state = await pool.getState();
      expect(state.entryCount).toBe(1n);
      expect(await pool.isEntered({ address: wallet.client.appAddress.toString() })).toBe(true);
    });

    test('enter funds and records an app-scoped SOFT stake commitment', async () => {
      const stakingPlugin = akitaUniverse.stakingPlugin;
      await wallet.addPlugin({ client: stakingPlugin, callerType: CallerType.Admin });

      const rootCommitment = 1_000_000n;
      const poolCommitment = 500_000n;
      await wallet.usePlugin({
        callerType: CallerType.Admin,
        calls: [
          stakingPlugin.stake({
            assetId: 0n,
            type: StakingType.Soft,
            amount: rootCommitment,
            expiration: 0n,
            isUpdate: false,
          }),
        ],
      });

      // H-2 (2026-10 audit): typed pools need an asset stake key; this one admits ALGO only
      const tree = MerkleTree.of([[0n]], [SchemaPart.Uint64]);
      const meta = new MetaSDK({
        algorand, readerAccount: deployer.addr.toString(),
        factoryParams: { appId: akitaUniverse.metaMerkles.appId, defaultSender: deployer.addr, defaultSigner: deployer.signer },
      });
      await meta.addRoot({ name: 'plugin-pool-algo', root: tree.root, type: 1n });

      const pool = await createPluginPool('Plugin SOFT Entry Pool', {
        allowLateSignups: true,
        type: POOL_STAKING_TYPE_SOFT,
        stakeKey: { address: deployer.addr.toString(), name: 'plugin-pool-algo' },
      });
      const now = await getBlockTimestamp(algorand);
      await wallet.usePlugin({
        callerType: CallerType.Admin,
        calls: [
          stakingPoolPluginSdk.finalizePool({
            poolId: pool.appId,
            signupTimestamp: 0n,
            startTimestamp: 0n,
            endTimestamp: now + BigInt(ONE_DAY),
          }),
        ],
      });

      const stakingBefore = await algorand.account.getInformation(akitaUniverse.staking.client.appAddress);
      await wallet.usePlugin({
        callerType: CallerType.Admin,
        calls: [
          stakingPoolPluginSdk.enter({
            appId: pool.appId,
            entries: [[0n, poolCommitment, tree.getProof(0)]],
            args: [],
          }),
        ],
      });
      const stakingAfter = await algorand.account.getInformation(akitaUniverse.staking.client.appAddress);

      expect(stakingAfter.minBalance.microAlgos - stakingBefore.minBalance.microAlgos).toBe(APP_STAKES_MBR);
      expect(await pool.isEntered({ address: wallet.client.appAddress.toString() })).toBe(true);

      const appStake = await akitaUniverse.staking.getAppWeightedStake({
        app: pool.appId,
        address: wallet.client.appAddress.toString(),
        asset: 0n,
        acceptInherited: true,
      });
      expect(appStake.amount).toBe(poolCommitment);
    });

    test('deletePool deletes a plugin-created draft pool', async () => {
      const pool = await createPluginPool('Plugin Delete Pool');

      await wallet.usePlugin({
        callerType: CallerType.Admin,
        calls: [
          stakingPoolPluginSdk.deletePool({
            appId: pool.appId,
          }),
        ],
      });

      await expect(pool.getState()).rejects.toThrow();
    });
  });
});
