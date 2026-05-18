import * as algokit from '@algorandfoundation/algokit-utils';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { SigningAccount, TransactionSignerAccount, Address } from '@algorandfoundation/algokit-utils/types/account';
import { beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { newWallet, StakingPoolPluginSDK, WalletSDK, CallerType } from 'akita-sdk/wallet';
import { StakingPoolSDK } from 'akita-sdk/staking-pool';
import algosdk from 'algosdk';
import { AkitaUniverse, buildAkitaUniverse } from '../../../../tests/fixtures/dao';

algokit.Config.configure({ populateAppCallResources: true });

const fixture = algorandFixture();

const POOL_STATUS_DRAFT = 0;
const POOL_STATUS_FINAL = 10;
const POOL_STAKING_TYPE_NONE = 0;
const DISTRIBUTION_TYPE_FLAT = 20;
const ONE_DAY = 86_400;
const ONE_HOUR = 3_600;
const ONE_MINUTE = 60;

const getBlockTimestamp = async (
  algorand: import('@algorandfoundation/algokit-utils').AlgorandClient,
): Promise<bigint> => {
  const status = await algorand.client.algod.status();
  const block = await algorand.client.algod.block(status.lastRound);
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
    const txn = node as Record<string, unknown>;
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
  address: Address,
): Promise<bigint[]> => {
  const accountInfo = await algorand.client.algod.accountInformation(address) as Record<string, unknown>;
  const createdApps = accountInfo.createdApps ?? accountInfo['created-apps'];
  if (!Array.isArray(createdApps)) return [];

  return createdApps
    .map((app) => {
      const appRecord = app as Record<string, unknown>;
      const id = appRecord.id ?? appRecord.index ?? appRecord.applicationIndex ?? appRecord['application-index'];
      return typeof id === 'bigint' ? id : typeof id === 'number' ? BigInt(id) : undefined;
    })
    .filter((id): id is bigint => id !== undefined);
};

describe('StakingPool plugin contract', () => {
  let deployer: Address & TransactionSignerAccount;
  let user: Address & TransactionSignerAccount;
  let akitaUniverse: AkitaUniverse;
  let dispenser: algosdk.Address & TransactionSignerAccount & { account: SigningAccount };
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

    await algorand.account.ensureFunded(deployer.addr, dispenser, (2000).algo());
    await algorand.account.ensureFunded(user.addr, dispenser, (2_000).algo());

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
    await wallet.addPlugin({ client: stakingPoolPluginSdk, callerType: CallerType.Global });
  });

  beforeEach(fixture.newScope);

  const createPluginPool = async (
    title = 'Plugin Staking Pool',
    overrides: { allowLateSignups?: boolean } = {},
  ): Promise<StakingPoolSDK> => {
    const factoryAddress = akitaUniverse.stakingPoolFactory.client.appAddress;
    const createdBefore = new Set(await getCreatedAppIds(algorand, factoryAddress));

    const result = await wallet.usePlugin({
      callerType: CallerType.Global,
      calls: [
        stakingPoolPluginSdk.newPool({
          title,
          type: POOL_STAKING_TYPE_NONE,
          marketplace: user.addr.toString(),
          stakeKey: {
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
      callerType: CallerType.Global,
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

    test('initPool is rejected by an already factory-initialized pool', async () => {
      const pool = await createPluginPool('Plugin Init Pool');

      await expect(wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          stakingPoolPluginSdk.initPool({
            poolId: pool.appId,
          }),
        ],
      })).rejects.toThrow(/FOIN|Runtime error/);

      const state = await pool.getState();
      expect(state.title).toBe('Plugin Init Pool');
      expect(Number(state.status)).toBe(POOL_STATUS_DRAFT);
    });

    test('addReward adds an ALGO reward through the plugin path', async () => {
      const pool = await createPluginPool('Plugin Reward Pool');
      const before = await pool.getState();

      await wallet.usePlugin({
        callerType: CallerType.Global,
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

      const reward = await pool.getReward(Number(before.rewardCount - 1n));
      expect(reward.asset).toBe(0n);
      expect(reward.rate).toBe(1_000_000n);
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
        callerType: CallerType.Global,
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
      await algorand.send.payment({
        sender: dispenser.addr,
        signer: dispenser.signer,
        receiver: pool.client.appAddress,
        amount: algokit.microAlgo(200_000n),
      });

      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          stakingPoolPluginSdk.enter({
            appId: pool.appId,
            entries: [[0n, 1_000_000n, []]],
            args: [],
          }),
        ],
      });

      const state = await pool.getState();
      expect(state.entryCount).toBeGreaterThan(1n);
      expect(await pool.isEntered({ address: wallet.client.appAddress.toString() })).toBe(true);
    });

    test('deletePool deletes a plugin-created draft pool', async () => {
      const pool = await createPluginPool('Plugin Delete Pool');

      await wallet.usePlugin({
        callerType: CallerType.Global,
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
