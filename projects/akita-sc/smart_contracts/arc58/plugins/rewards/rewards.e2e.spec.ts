import * as algokit from '@algorandfoundation/algokit-utils';
import algosdk from 'algosdk';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { TransactionSignerAccount as AddressWithTransactionSigner } from '@algorandfoundation/algokit-utils/types/account';
import { beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { newWallet, RewardsPluginSDK, WalletSDK, CallerType } from 'akita-sdk/wallet';
import { RewardsSDK } from 'akita-sdk/rewards';
import { ProposalActionEnum } from 'akita-sdk/dao';
import { AkitaUniverse, buildAkitaUniverse } from '../../../../tests/fixtures/dao';
import { deployRewardsPlugin } from '../../../../tests/fixtures/plugins/rewards';
import { proposeAndExecute } from '../../../../scripts/utils';
import { RewardsFactory } from '../../../artifacts/rewards/RewardsClient';
import { errInvalidRewardsApp } from './errors';
import { errDisbursementDoesNotExist, errDisbursementNotExpired, errDisbursementNotSweepable } from '../../../rewards/errors';
import { escrowAddress, runCreditWithdrawal } from '../../../../scripts/lib/rewards-credit-withdrawal';
import rideAlong from '../../../../tests/compat/fixtures/ride-along-programs.json';
import { TimeWarp } from '../../../../tests/utils/time';

algokit.Config.configure({ populateAppCallResources: true });

const fixture = algorandFixture();

const getBlockTimestamp = async (
  algorand: import('@algorandfoundation/algokit-utils').AlgorandClient,
): Promise<bigint> => {
  const status = await algorand.client.algod.status().do();
  const block = await algorand.client.algod.block(status.lastRound).do();
  return BigInt(block.block.header.timestamp);
};

const getDisbursementId = (returns: readonly unknown[]): bigint => {
  // Wallet verification and resource-carrier calls can follow the plugin's return.
  const values = returns.map((value) => value !== null && typeof value === 'object'
    ? (value as { returnValue?: unknown }).returnValue : value);
  const ids = values.filter((value): value is bigint => typeof value === 'bigint');
  expect(ids).toHaveLength(1);
  return ids[0];
};

describe('Rewards plugin contract', () => {
  let deployer: AddressWithTransactionSigner;
  let user: AddressWithTransactionSigner;
  let akitaUniverse: AkitaUniverse;
  let dispenser: AddressWithTransactionSigner;
  let algorand: import('@algorandfoundation/algokit-utils').AlgorandClient;
  let wallet: WalletSDK;
  let rewardsSdk: RewardsSDK;
  let rewardsPluginSdk: RewardsPluginSDK;

  beforeAll(async () => {
    await fixture.newScope();
    algorand = fixture.context.algorand;
    dispenser = await algorand.account.dispenserFromEnvironment();

    const ctx = fixture.context;
    deployer = await ctx.generateAccount({ initialFunds: algokit.microAlgos(2_000_000_000) });
    user = await ctx.generateAccount({ initialFunds: algokit.microAlgos(500_000_000) });

    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (2000).algo());
    await algorand.account.ensureFunded(user.addr, dispenser.addr, (500).algo());

    // Build the full Akita DAO universe
    akitaUniverse = await buildAkitaUniverse({
      fixture,
      sender: deployer.addr,
      signer: deployer.signer,
      apps: {},
    });
    rewardsSdk = new RewardsSDK({
      algorand,
      factoryParams: {
        appId: akitaUniverse.rewards.appId,
        defaultSender: deployer.addr,
        defaultSigner: deployer.signer,
      },
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
    rewardsPluginSdk = akitaUniverse.rewardsPlugin;
    const mbr = await wallet.getMbr({ escrow: '', methodCount: 2n, plugin: '', groups: 0n });
    await wallet.client.appClient.fundAppAccount({ amount: algokit.microAlgo((mbr.plugins * 2n) + 20_000_000n) });
    await wallet.addPlugin({
      client: rewardsPluginSdk,
      callerType: CallerType.Global,
      methods: [
        { name: rewardsPluginSdk.createInstantDisbursement(), cooldown: 0n },
        { name: rewardsPluginSdk.createInstantAsaDisbursement(), cooldown: 0n },
      ],
    });
  });

  beforeEach(fixture.newScope);

  describe('RewardsPlugin SDK', () => {
    test('plugin can be added to wallet', async () => {
      // Verify the plugin was successfully added
      const plugins = await wallet.getPlugins();
      expect(plugins.size).toBe(1);
      expect(rewardsPluginSdk.appId).toBeGreaterThan(0n);
    });

    test('creates and finalizes an instant ALGO disbursement through the wallet plugin', async () => {
      const amount = 1_000_000n;
      const expiration = (await getBlockTimestamp(algorand)) + 86_400n;

      const result = await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          rewardsPluginSdk.createInstantDisbursement({
            timeToUnlock: 0n,
            expiration,
            allocations: [[deployer.addr.toString(), amount]],
          }),
        ],
      });

      const disbursementId = getDisbursementId(result.returns);
      const disbursement = await rewardsSdk.getDisbursement({ id: disbursementId });
      const allocation = await rewardsSdk.getUserAllocation({
        address: deployer.addr.toString(),
        disbursementId,
        asset: 0n,
      });

      expect(disbursement.creator).toBe(wallet.client.appAddress.toString());
      expect(disbursement.finalized).toBe(true);
      expect(disbursement.amount).toBe(amount);
      expect(disbursement.allocations).toBe(1n);
      expect(allocation).toBe(amount);
      expect((await algorand.account.getInformation(wallet.client.appAddress)).authAddr).toBeUndefined();
    });

    test('creates and finalizes an instant ASA disbursement through the wallet plugin', async () => {
      const amount = 25_000n;
      const expiration = (await getBlockTimestamp(algorand)) + 86_400n;
      const { assetId } = await algorand.send.assetCreate({
        sender: deployer.addr,
        signer: deployer.signer,
        total: 1_000_000n,
        decimals: 0,
        assetName: 'Instant Rewards Plugin Test',
        unitName: 'IRPT',
      });
      const rewardAssetId = BigInt(assetId);

      await rewardsSdk.optIn({
        sender: deployer.addr,
        signer: deployer.signer,
        asset: rewardAssetId,
      });
      await wallet.addPlugin({ client: akitaUniverse.selfOptInPlugin, callerType: CallerType.Global });
      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [akitaUniverse.selfOptInPlugin.optIn({ assets: [rewardAssetId] })],
      });
      await algorand.send.assetTransfer({
        sender: deployer.addr,
        signer: deployer.signer,
        assetId: rewardAssetId,
        amount,
        receiver: wallet.client.appAddress,
      });

      const result = await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          rewardsPluginSdk.createInstantAsaDisbursement({
            assetId: rewardAssetId,
            timeToUnlock: 0n,
            expiration,
            allocations: [[user.addr.toString(), amount]],
          }),
        ],
      });

      const disbursementId = getDisbursementId(result.returns);
      const disbursement = await rewardsSdk.getDisbursement({ id: disbursementId });
      const allocation = await rewardsSdk.getUserAllocation({
        address: user.addr.toString(),
        disbursementId,
        asset: rewardAssetId,
      });

      expect(disbursement.creator).toBe(wallet.client.appAddress.toString());
      expect(disbursement.finalized).toBe(true);
      expect(disbursement.amount).toBe(amount);
      expect(disbursement.allocations).toBe(1n);
      expect(allocation).toBe(amount);
      expect((await algorand.account.getInformation(wallet.client.appAddress)).authAddr).toBeUndefined();
    });

    describe('multi-step disbursements from a wallet escrow', () => {
      const escrow = 'rewards_src';
      const ALLOCATION_MBR = 25_300n;
      const balance = async (address: string) => (await algorand.account.getInformation(address)).balance.microAlgo;
      let escrowAddress: string;
      let current: RewardsSDK;
      let keeper: AddressWithTransactionSigner;
      const timeWarp = () => new TimeWarp(algorand);

      beforeAll(async () => {
        const mbr = await wallet.getMbr({ escrow, methodCount: 5n, plugin: '', groups: 0n });
        await wallet.client.appClient.fundAppAccount({ amount: algokit.microAlgo(mbr.plugins + mbr.newEscrowMintCost) });
        await wallet.addPlugin({
          client: rewardsPluginSdk,
          callerType: CallerType.Global,
          escrow,
          methods: [
            { name: rewardsPluginSdk.createDisbursement(), cooldown: 0n },
            { name: rewardsPluginSdk.createUserAllocations(), cooldown: 0n },
            { name: rewardsPluginSdk.finalizeDisbursement(), cooldown: 0n },
          ],
        });
        escrowAddress = algosdk.getApplicationAddress((await wallet.getEscrow(escrow)).id).toString();
        await algorand.send.payment({ sender: deployer.addr, signer: deployer.signer, receiver: escrowAddress, amount: algokit.microAlgo(10_000_000n) });
        const appList = await akitaUniverse.dao.client.state.global.akitaAppList();
        current = new RewardsSDK({ algorand, factoryParams: { appId: appList!.rewards, defaultSender: deployer.addr, defaultSigner: deployer.signer } });
        keeper = await fixture.context.generateAccount({ initialFunds: algokit.microAlgo(1_000_000) });
      });

      const use = (call: ReturnType<RewardsPluginSDK['createDisbursement']>) =>
        wallet.usePlugin({ escrow, callerType: CallerType.Global, calls: [call] });

      /** create, allocate ALGO in two batches, finalize: the backend job's path */
      const multiStep = async (title: string, recipients: [string, bigint][][], reclaimTo?: string) => {
        const expiration = (await getBlockTimestamp(algorand)) + 120n;
        const mbrCredits = ALLOCATION_MBR * BigInt(recipients.flat().length);
        const create = rewardsPluginSdk.createDisbursement({ title, timeToUnlock: 0n, expiration, note: '', mbrCredits, reclaimTo });
        const id = getDisbursementId((await use(create)).returns);
        for (const allocations of recipients) await use(rewardsPluginSdk.createUserAllocations({ id, allocations }));
        await use(rewardsPluginSdk.finalizeDisbursement({ id }));
        return { id, selector: Buffer.from(create().selectors[0]).toString('hex') };
      };

      test('with reclaimTo = the escrow: recipients claim before expiry, then anyone sweeps the rest back to the escrow', async () => {
        const [a, b, c] = await Promise.all([0, 1, 2].map(async () =>
          (await fixture.context.generateAccount({ initialFunds: algokit.microAlgo(1_000_000) }))));
        const title = 'Escrow sweep';
        const { id, selector } = await multiStep(title, [
          [[a.addr.toString(), 300_000n], [b.addr.toString(), 400_000n]],
          [[c.addr.toString(), 500_000n]],
        ], escrowAddress);
        expect(selector).toBe('2946dd1d');

        const record = await current.getDisbursement({ id });
        expect(record.creator).toBe(escrowAddress);
        expect(record.reclaimTo).toBe(escrowAddress);
        expect(record.finalized).toBe(true);
        expect(record.allocations).toBe(3n);
        expect(record.amount).toBe(1_200_000n);

        const rewardsBefore = await balance(current.client.appAddress.toString());
        await current.claimRewards({ sender: a.addr, signer: a.signer, rewards: [{ id, asset: 0n }] });
        expect(rewardsBefore - await balance(current.client.appAddress.toString())).toBe(300_000n);
        expect(await current.getSweepableDisbursementIds()).not.toContain(id);
        await expect(current.sweepExpired({ sender: keeper.addr, signer: keeper.signer, id })).rejects.toThrow(errDisbursementNotExpired);

        try {
          await timeWarp().timeWarp(180n);
          expect(await current.getSweepableDisbursementIds()).toContain(id);
          const escrowBefore = await balance(escrowAddress);
          await current.sweepExpired({ sender: keeper.addr, signer: keeper.signer, id });
          // b + c, their two boxes, a's freed box (credit), and the closed disbursement box
          const boxMbr = 54_500n + 400n * BigInt(title.length);
          expect(await balance(escrowAddress) - escrowBefore).toBe(900_000n + 3n * ALLOCATION_MBR + boxMbr);
          await expect(current.getDisbursement({ id })).rejects.toThrow();
        } finally {
          await timeWarp().resetTimeWarp();
        }
      });

      test('the 7-arg legacy selector records a zero reclaimTo: the expired disbursement cannot be swept', async () => {
        const recipient = (await fixture.context.generateAccount({ initialFunds: algokit.microAlgo(1_000_000) })).addr.toString();
        const { id, selector } = await multiStep('legacy', [[[recipient, 100_000n]], [[deployer.addr.toString(), 100_000n]]]);
        expect(selector).toBe('3aae182b');
        expect((await current.getDisbursement({ id })).reclaimTo).toBe(algosdk.ALGORAND_ZERO_ADDRESS_STRING);
        try {
          await timeWarp().timeWarp(180n);
          expect(await current.getSweepableDisbursementIds()).not.toContain(id);
          await expect(current.sweepExpired({ sender: keeper.addr, signer: keeper.signer, id })).rejects.toThrow(errDisbursementNotSweepable);
        } finally {
          await timeWarp().resetTimeWarp();
        }
      });
    });

    test('STAKE-4: the DAO recovers a locked escrow\'s credits through a temporary grant (withdraw-rewards-v1-mbr-credits flow)', async () => {
      const dao = akitaUniverse.dao;
      const daoWallet = await dao.getWallet();
      const escrow = 'credits_v1';
      const balance = async (address: string) => (await algorand.account.getInformation(address)).balance.microAlgo;
      await daoWallet.client.appClient.fundAppAccount({ amount: algokit.microAlgo(5_000_000n) });

      // the escrow creates disbursements that keep credits, then gets locked (as `stickers` on MainNet)
      await proposeAndExecute(algorand, dao, [
        { type: ProposalActionEnum.NewEscrow, escrow, address: algosdk.ALGORAND_ZERO_ADDRESS_STRING },
        {
          type: ProposalActionEnum.AddPlugin,
          client: rewardsPluginSdk,
          callerType: CallerType.Other,
          caller: deployer.addr.toString(),
          escrow,
          sourceLink: '',
          useExecutionKey: false,
          methods: [{ name: rewardsPluginSdk.createDisbursement(), cooldown: 0n }],
        },
      ]);
      const { address } = await escrowAddress(dao, escrow);
      await algorand.send.payment({ sender: deployer.addr, signer: deployer.signer, receiver: address, amount: algokit.microAlgo(2_000_000n) });
      await daoWallet.getPlugins();
      const expiration = (await getBlockTimestamp(algorand)) + 86_400n;
      for (const mbrCredits of [25_300n, 50_600n]) {
        await daoWallet.usePlugin({
          sender: deployer.addr,
          signer: deployer.signer,
          callerType: CallerType.Other,
          escrow,
          calls: [rewardsPluginSdk.createDisbursement({
            sender: deployer.addr, signer: deployer.signer, title: 'Welcome', timeToUnlock: 0n, expiration, note: '', mbrCredits,
          })],
        });
      }
      await proposeAndExecute(algorand, dao, [{ type: ProposalActionEnum.ToggleEscrowLock, escrow }]);
      expect((await escrowAddress(dao, escrow)).locked).toBe(true);

      const plugin = await deployRewardsPlugin({
        fixture,
        sender: deployer.addr,
        signer: deployer.signer,
        args: { akitaDao: dao.appId, version: 'test', legacyRewards: rewardsSdk.appId },
      });
      const before = await balance(address);
      const done = await runCreditWithdrawal({
        algorand, dao, plugin, rewards: rewardsSdk, escrow, caller: deployer.addr.toString(), signer: deployer.signer,
      });

      expect(done.map((w) => w.amount)).toEqual([25_300n, 50_600n]);
      expect(await balance(address) - before).toBe(75_900n);
      for (const { id } of done) expect((await rewardsSdk.getDisbursement({ id })).mbrCredits).toBe(0n);
      // the grant is gone and the escrow is locked again
      await daoWallet.getPlugins();
      expect(daoWallet.plugins.get({ plugin: plugin.appId, caller: deployer.addr.toString(), escrow })).toBeUndefined();
      expect((await escrowAddress(dao, escrow)).locked).toBe(true);
    });

    test('STAKE-4: recovers credits and box MBR from the current Rewards app and, after a switch, from the pinned legacy one only', async () => {
      const balance = async (address: string) => (await algorand.account.getInformation(address)).balance.microAlgo;
      const newRewardsApp = async () => (await algorand.client.getTypedAppFactory(RewardsFactory, {
        defaultSender: deployer.addr,
        defaultSigner: deployer.signer,
      }).send.create.create({ args: { version: 'test', akitaDao: akitaUniverse.dao.appId } })).appClient.appId;

      const legacy = akitaUniverse.rewards.appId;
      const plugin = await deployRewardsPlugin({
        fixture,
        sender: deployer.addr,
        signer: deployer.signer,
        args: { akitaDao: akitaUniverse.dao.appId, version: 'test', legacyRewards: legacy },
      });
      const mbr = await wallet.getMbr({ escrow: '', methodCount: 3n, plugin: '', groups: 0n });
      await wallet.client.appClient.fundAppAccount({ amount: algokit.microAlgo(mbr.plugins + 5_000_000n) });
      await wallet.addPlugin({
        client: plugin,
        callerType: CallerType.Global,
        methods: [
          { name: plugin.createDisbursement(), cooldown: 0n },
          { name: plugin.withdrawMbrCredits(), cooldown: 0n },
          { name: plugin.closeDisbursement(), cooldown: 0n },
        ],
      });
      const use = (call: ReturnType<RewardsPluginSDK['withdrawMbrCredits']>) => wallet.usePlugin({ callerType: CallerType.Global, calls: [call] });

      const expiration = (await getBlockTimestamp(algorand)) + 86_400n;
      const create = async (mbrCredits: bigint) => getDisbursementId((await use(plugin.createDisbursement({
        title: 'credits', timeToUnlock: 0n, expiration, note: '', mbrCredits,
      }))).returns);
      const withdrawn = await create(50_000n);
      const closed = await create(30_000n);
      const walletAddress = wallet.client.appAddress.toString();

      // any other app with the same selector is refused
      const rogue = await newRewardsApp();
      await expect(use(plugin.withdrawMbrCredits({ rewardsApp: rogue, id: withdrawn, amount: 1n }))).rejects.toThrow(errInvalidRewardsApp);

      // the registry's Rewards app: the credits come back to the wallet
      let before = await balance(walletAddress);
      await use(plugin.withdrawMbrCredits({ rewardsApp: legacy, id: withdrawn, amount: 50_000n }));
      expect(await balance(walletAddress) - before).toBe(50_000n);
      expect((await rewardsSdk.getDisbursement({ id: withdrawn })).mbrCredits).toBe(0n);

      // after the registry moves to a new Rewards app, the pinned legacy app stays reachable
      const current = await newRewardsApp();
      await proposeAndExecute(algorand, akitaUniverse.dao, [{ type: ProposalActionEnum.UpdateFields, field: 'aal', value: { rewards: current } }]);
      const boxMbr = (await rewardsSdk.mbr({ title: 'credits', note: '' })).disbursements;
      before = await balance(walletAddress);
      await use(plugin.closeDisbursement({ rewardsApp: legacy, id: closed }));
      expect(await balance(walletAddress) - before).toBe(boxMbr + 30_000n);
      await expect(rewardsSdk.getDisbursement({ id: closed })).rejects.toThrow();
      await expect(use(plugin.withdrawMbrCredits({ rewardsApp: rogue, id: withdrawn, amount: 1n }))).rejects.toThrow(errInvalidRewardsApp);
    });

    test('DEC-1: a wallet claims and reclaims on the MainNet v1 Rewards program through the legacy methods after aal.rewards moves', async () => {
      const balance = async (address: string) => (await algorand.account.getInformation(address)).balance.microAlgo;
      const walletAddress = wallet.client.appAddress.toString();
      const other = (await fixture.context.generateAccount({ initialFunds: algokit.microAlgo(1_000_000) })).addr.toString();

      // the deployed MainNet Rewards v1 program (3569556095), byte for byte
      const v1Program = rideAlong.programs.RewardsV1;
      const { appId: v1 } = await algorand.send.appCreateMethodCall({
        sender: deployer.addr,
        signer: deployer.signer,
        method: algosdk.ABIMethod.fromSignature('create(string,uint64)void'),
        args: ['v1', akitaUniverse.dao.appId],
        approvalProgram: new Uint8Array(Buffer.from(v1Program.approval, 'base64')),
        clearStateProgram: new Uint8Array([0x0b, 0x81, 0x01]),
        schema: { globalInts: 4, globalByteSlices: 4, localInts: 0, localByteSlices: 0 },
        extraProgramPages: 1,
      });
      const installed = (await algorand.app.getById(v1)).approvalProgram;
      expect(Buffer.from(await crypto.subtle.digest('SHA-256', installed)).toString('hex')).toBe(v1Program.approvalSha256);
      const v1Sdk = new RewardsSDK({ algorand, factoryParams: { appId: v1, defaultSender: deployer.addr, defaultSigner: deployer.signer } });
      await algorand.send.payment({ sender: deployer.addr, signer: deployer.signer, receiver: v1Sdk.client.appAddress, amount: algokit.microAlgo(1_000_000n) });

      const plugin = await deployRewardsPlugin({
        fixture, sender: deployer.addr, signer: deployer.signer, args: { akitaDao: akitaUniverse.dao.appId, version: 'test', legacyRewards: v1 },
      });
      const noLegacy = await deployRewardsPlugin({
        fixture, sender: deployer.addr, signer: deployer.signer, args: { akitaDao: akitaUniverse.dao.appId, version: 'test', legacyRewards: 0n },
      });
      const mbr = await wallet.getMbr({ escrow: '', methodCount: 5n, plugin: '', groups: 0n });
      await wallet.client.appClient.fundAppAccount({ amount: algokit.microAlgo((mbr.plugins * 2n) + 5_000_000n) });
      // The tree plugin pays Rewards v2's disbursement MBR (54,500), which v1's exact instant path rejects (accepted),
      // so the wallet builds its v1 disbursement as a draft: v1's createDisbursement keeps any surplus as credit.
      const createUserAllocationsSelector = plugin.client.appClient.getABIMethod('createUserAllocations').getSelector();
      const createUserAllocations = (args?: { id: bigint; allocations: [string, bigint][]; sum: bigint }) => () => ({
        appId: plugin.client.appId,
        selectors: [createUserAllocationsSelector],
        getTxns: async ({ wallet: walletId }: { wallet: bigint }) => args === undefined ? [] : [{
          type: 'methodCall' as const,
          ...(await plugin.client.params.createUserAllocations({
            ...plugin.sendParams, sender: deployer.addr, signer: deployer.signer, args: { wallet: walletId, rekeyBack: true, ...args },
          })),
        }],
      });
      await wallet.addPlugin({
        client: plugin,
        callerType: CallerType.Global,
        methods: [
          { name: plugin.createDisbursement(), cooldown: 0n },
          { name: createUserAllocations() as unknown as ReturnType<RewardsPluginSDK['createDisbursement']>, cooldown: 0n },
          { name: plugin.finalizeDisbursement(), cooldown: 0n },
          { name: plugin.claimRewards(), cooldown: 0n },
          { name: plugin.claimLegacyRewards(), cooldown: 0n },
          { name: plugin.reclaimLegacyRewards(), cooldown: 0n },
        ],
      });
      await wallet.addPlugin({ client: noLegacy, callerType: CallerType.Global, methods: [{ name: noLegacy.claimLegacyRewards(), cooldown: 0n }] });
      const use = (call: ReturnType<RewardsPluginSDK['claimLegacyRewards']>) => wallet.usePlugin({ callerType: CallerType.Global, calls: [call] });

      // while v1 is the registry's Rewards app: the wallet creates a v1 disbursement and is allocated on v1
      await proposeAndExecute(algorand, akitaUniverse.dao, [{ type: ProposalActionEnum.UpdateFields, field: 'aal', value: { rewards: v1 } }]);
      const now = await getBlockTimestamp(algorand);
      const created = getDisbursementId((await use(plugin.createDisbursement({
        title: '', timeToUnlock: 0n, expiration: now + 120n, note: '', mbrCredits: 25_300n,
      }))).returns);
      await use(createUserAllocations({ id: created, allocations: [[other, 300_000n]], sum: 300_000n }) as unknown as ReturnType<RewardsPluginSDK['createDisbursement']>);
      await use(plugin.finalizeDisbursement({ id: created }));
      expect((await v1Sdk.getDisbursement({ id: created })).creator).toBe(walletAddress);
      // a v1 instant disbursement as deployed callers create it: exactly v1's 41,700 + 25,300 MBR
      const { return: allocated } = await v1Sdk.client.send.createInstantDisbursementPayUint64Uint64AddressUint64Uint64({
        sender: deployer.addr,
        signer: deployer.signer,
        args: {
          mbrPayment: algorand.createTransaction.payment({
            sender: deployer.addr, receiver: v1Sdk.client.appAddress, amount: algokit.microAlgo(41_700n + 25_300n + 1_000_000n),
          }),
          timeToUnlock: 0n,
          expiration: now + 86_400n,
          allocations: [[walletAddress, 1_000_000n]],
        },
      });

      // the registry moves to a new Rewards app
      const current = (await algorand.client.getTypedAppFactory(RewardsFactory, {
        defaultSender: deployer.addr,
        defaultSigner: deployer.signer,
      }).send.create.create({ args: { version: 'test', akitaDao: akitaUniverse.dao.appId } })).appClient.appId;
      await proposeAndExecute(algorand, akitaUniverse.dao, [{ type: ProposalActionEnum.UpdateFields, field: 'aal', value: { rewards: current } }]);

      const rewards: [bigint, bigint][] = [[allocated!, 0n]];
      await expect(use(plugin.claimRewards({ rewards }))).rejects.toThrow(errDisbursementDoesNotExist);
      await expect(use(noLegacy.claimLegacyRewards({ rewards }))).rejects.toThrow(errInvalidRewardsApp);

      let before = await balance(walletAddress);
      await use(plugin.claimRewardsFrom({ legacy: true }, { rewards }));
      expect(await balance(walletAddress) - before).toBe(1_000_000n);
      expect(await v1Sdk.hasAllocation({ address: walletAddress, disbursementId: allocated!, asset: 0n })).toBe(false);

      await new TimeWarp(algorand).timeWarp(180n);
      before = await balance(walletAddress);
      await use(plugin.reclaimLegacyRewards({ id: created, reclaims: [[other, 0n]] }));
      expect(await balance(walletAddress) - before).toBe(300_000n);
      expect(await v1Sdk.hasAllocation({ address: other, disbursementId: created, asset: 0n })).toBe(false);
    });
  });
});
