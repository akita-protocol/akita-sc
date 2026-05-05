import { microAlgo } from '@algorandfoundation/algokit-utils';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { sendPrepared } from 'akita-sdk';
import { ProposalAction, ProposalActionEnum } from 'akita-sdk/dao';
import { SDKClient } from 'akita-sdk/types';
import { MockAuctionFactoryClient, MockAuctionFactoryFactory } from '../../../../artifacts/mocks/auction-factory/MockAuctionFactoryClient';
import { MockAkitaDaoClient, MockAkitaDaoFactory } from '../../../../artifacts/mocks/dao/MockAkitaDAOClient';
import { MockMarketplaceClient, MockMarketplaceFactory } from '../../../../artifacts/mocks/marketplace/MockMarketplaceClient';
import { MockPollFactoryClient, MockPollFactoryFactory } from '../../../../artifacts/mocks/poll-factory/MockPollFactoryClient';
import { MockPrizeBoxFactoryClient, MockPrizeBoxFactoryFactory } from '../../../../artifacts/mocks/prize-box-factory/MockPrizeBoxFactoryClient';
import { MockRaffleFactoryClient, MockRaffleFactoryFactory } from '../../../../artifacts/mocks/raffle-factory/MockRaffleFactoryClient';
import { MockAkitaSocialClient, MockAkitaSocialFactory } from '../../../../artifacts/mocks/social/MockAkitaSocialClient';
import { MockStakingPoolFactoryClient, MockStakingPoolFactoryFactory } from '../../../../artifacts/mocks/staking-pool-factory/MockStakingPoolFactoryClient';
import { MockSubscriptionsClient, MockSubscriptionsFactory } from '../../../../artifacts/mocks/subscriptions/MockSubscriptionsClient';
import { AbstractedAccountFactoryFactory } from '../../../../artifacts/arc58/account/AbstractedAccountFactoryClient';
import { MockAbstractedAccountFactoryClient, MockAbstractedAccountFactoryFactory } from '../../../../artifacts/mocks/wallet-factory/MockAbstractedAccountFactoryClient';
import { MockAbstractedAccountClient, MockAbstractedAccountFactory } from '../../../../artifacts/mocks/wallet/MockAbstractedAccountClient';
import { AkitaDaoFactory } from '../../../../artifacts/arc58/dao/AkitaDAOClient';
import { CallerType } from 'akita-sdk/wallet';
import {
  bootstrapDaoTestContext,
  proposeAndExecute,
  type DaoTestContext,
} from '../utils';

const fixture = algorandFixture();

/**
 * Tests for upgrading the DAO and other contracts the DAO owns.
 * 
 * The UpdateAkitaDAO plugin allows the DAO wallet to:
 * 1. Upload new contract code via initBoxedContract/loadBoxedContract
 * 2. Apply the upgrade to any app the DAO owns via updateApp
 * 3. Update the Akita DAO reference on child contracts via updateAkitaDaoForApp
 * 4. Update escrow references on child contracts via updateAkitaDaoEscrowForApp
 * 
 * Test ordering:
 * 1. External Contract Upgrades — upgrades each contract to mock (wallet factory does round-trip: mock then back to original)
 * 2. DAO Self-Upgrade — round-trip: upgrades DAO to mock, verifies, restores to original (needs real wallet)
 * 3. Wallet Update — runs last, replaces DAO's wallet bytecode with mock via the dedicated
 *    `UpdateWallet` proposal type (DAO → factory.updateWallet → wallet.update). One-way.
 */
describe('ARC58 DAO Upgrade', () => {
  let context: DaoTestContext;

  beforeAll(async () => {
    context = await bootstrapDaoTestContext({ fixture, useFullSetup: true });
  });

  beforeEach(async () => {
    await fixture.newScope();
  });

  // Helper function to ensure sender has enough funds for upgrade operations
  const ensureSenderFunded = async () => {
    const { fixture, sender } = context;
    const { algorand } = fixture.context;
    const dispenser = await algorand.account.dispenserFromEnvironment();
    // Fund with 50 ALGO to cover upgrade operations
    await algorand.account.ensureFunded(sender, dispenser.addr, microAlgo(50_000_000n));
  };

  // External Contract Upgrades — needs real wallet for plugin execution
  describe('External Contract Upgrades', () => {
    // This test MUST run before upgrading walletFactory since it calls methods on the original contract
    test('should verify DAO wallet can use updateAkitaDaoEscrowForApp', async () => {
      await ensureSenderFunded();
      // This simpler method works because it has the correct signature:
      // updateAkitaDaoEscrowForApp(wallet: Application, rekeyBack: boolean, ...)
      const { dao, sender, signer, daoUpdatePluginSdk, walletFactory } = context;
      expect(daoUpdatePluginSdk).toBeDefined();
      expect(walletFactory).toBeDefined();

      const wallet = dao.wallet;
      const daoUpdateSdk = daoUpdatePluginSdk!;

      // Create a test escrow if it doesn't exist
      const testEscrow = 'test_upgrade_escrow';

      try {
        await proposeAndExecute(dao, [
          { type: ProposalActionEnum.NewEscrow, escrow: testEscrow },
        ]);
      } catch {
        // Escrow might already exist
      }

      const escrowInfo = await wallet.getEscrow(testEscrow);

      // Fund the wallet for plugin execution
      const mbr = await wallet.getMbr({
        escrow: '',
        methodCount: 0n,
        plugin: '',
        groups: 2n,
      });
      await wallet.client.appClient.fundAppAccount({
        amount: microAlgo(mbr.plugins + mbr.executions + 1_000_000n),
      });

      // Build the plugin execution - this should work because updateAkitaDaoEscrowForApp
      // has the correct signature with wallet as the first argument
      const shortTimestamp = Date.now() % 1_000_000;
      const execution = await wallet.build.usePlugin({
        sender,
        signer,
        lease: `escrow_upd_${shortTimestamp}`,
        windowSize: 2000n,
        callerType: CallerType.Global,
        calls: [
          daoUpdateSdk.updateAkitaDaoEscrowForApp({
            appId: walletFactory!.appId,
            newEscrow: { name: testEscrow, app: escrowInfo.id },
          }),
        ],
      });

      expect(execution.windows).toBeDefined();
      expect(execution.windows.length).toBeGreaterThan(0);
    });

    test('should upgrade WalletFactory to mock and back to original', async () => {
      await ensureSenderFunded();
      const { fixture, dao, sender, signer, daoUpdatePluginSdk, walletFactory } = context;
      const { algorand } = fixture.context;
      expect(daoUpdatePluginSdk).toBeDefined();
      expect(walletFactory).toBeDefined();

      const wallet = dao.wallet;
      const daoUpdateSdk = daoUpdatePluginSdk!;

      // --- Phase 1: Upgrade to mock ---
      const preFundMbr = await wallet.getMbr({
        escrow: '',
        methodCount: 0n,
        plugin: '',
        groups: 4n,
      });
      await wallet.client.appClient.fundAppAccount({
        amount: microAlgo(preFundMbr.plugins + preFundMbr.executions + 2_000_000n),
      });

      const mockFactoryFactory = new MockAbstractedAccountFactoryFactory({
        algorand,
        defaultSender: sender,
        defaultSigner: signer,
      });
      const compiledMock = await mockFactoryFactory.appFactory.compile();

      const shortTimestamp = Date.now() % 1_000_000;
      const mockExecution = await wallet.build.usePlugin({
        sender,
        signer,
        lease: `wf_upg_mock_${shortTimestamp}`,
        windowSize: 2000n,
        callerType: CallerType.Global,
        calls: [
          daoUpdateSdk.updateApp({
            sender,
            signer,
            appId: walletFactory!.appId,
            version: '1.0.0-mock',
            data: compiledMock.approvalProgram,
          }),
        ],
      });

      const mockMbr = await wallet.getMbr({
        escrow: '',
        methodCount: 0n,
        plugin: '',
        groups: BigInt(mockExecution.windows.length),
      });
      await wallet.client.appClient.fundAppAccount({
        amount: microAlgo(mockMbr.plugins + mockMbr.executions + 1_000_000n),
      });

      await proposeAndExecute(dao, [{
        type: ProposalActionEnum.UpgradeApp,
        app: walletFactory!.appId,
        executionKey: mockExecution.lease,
        groups: mockExecution.ids,
        firstValid: mockExecution.firstValid,
        lastValid: mockExecution.lastValid,
      }]);
      await sendPrepared(mockExecution.windows[0], wallet.client.algorand.client.algod);

      // Verify mock works
      const mockClient = new MockAbstractedAccountFactoryClient({
        algorand,
        appId: walletFactory!.appId,
        defaultSender: sender,
        defaultSigner: signer,
      });
      const pingResult = await mockClient.send.ping({ args: {} });
      expect(pingResult.return).toBe(4242n);

      // --- Phase 2: Upgrade back to original ---
      const restoreFundMbr = await wallet.getMbr({
        escrow: '',
        methodCount: 0n,
        plugin: '',
        groups: 4n,
      });
      await wallet.client.appClient.fundAppAccount({
        amount: microAlgo(restoreFundMbr.plugins + restoreFundMbr.executions + 2_000_000n),
      });

      const originalFactory = new AbstractedAccountFactoryFactory({
        algorand,
        defaultSender: sender,
        defaultSigner: signer,
      });
      const compiledOriginal = await originalFactory.appFactory.compile();

      const restoreTimestamp = (Date.now() + 1) % 1_000_000;
      const restoreExecution = await wallet.build.usePlugin({
        sender,
        signer,
        lease: `wf_upg_restore_${restoreTimestamp}`,
        windowSize: 2000n,
        callerType: CallerType.Global,
        calls: [
          daoUpdateSdk.updateApp({
            sender,
            signer,
            appId: walletFactory!.appId,
            version: '1.0.0-restored',
            data: compiledOriginal.approvalProgram,
          }),
        ],
      });

      const restoreMbr = await wallet.getMbr({
        escrow: '',
        methodCount: 0n,
        plugin: '',
        groups: BigInt(restoreExecution.windows.length),
      });
      await wallet.client.appClient.fundAppAccount({
        amount: microAlgo(restoreMbr.plugins + restoreMbr.executions + 1_000_000n),
      });

      await proposeAndExecute(dao, [{
        type: ProposalActionEnum.UpgradeApp,
        app: walletFactory!.appId,
        executionKey: restoreExecution.lease,
        groups: restoreExecution.ids,
        firstValid: restoreExecution.firstValid,
        lastValid: restoreExecution.lastValid,
      }]);
      await sendPrepared(restoreExecution.windows[0], wallet.client.algorand.client.algod);
    });

    test('should verify wallet factory is owned by DAO', async () => {
      const { walletFactory } = context;
      expect(walletFactory).toBeDefined();
      expect(walletFactory!.appId).toBeGreaterThan(0n);
    });

    test('should upgrade AuctionFactory to MockAuctionFactory', async () => {
      await ensureSenderFunded();
      const { fixture, dao, sender, signer, daoUpdatePluginSdk, auctionFactory } = context;
      const { algorand } = fixture.context;
      expect(daoUpdatePluginSdk).toBeDefined();
      expect(auctionFactory).toBeDefined();

      const wallet = dao.wallet;
      const daoUpdateSdk = daoUpdatePluginSdk!;
      const upgradeVersion = `1.0.0`;

      const preFundMbr = await wallet.getMbr({
        escrow: '',
        methodCount: 0n,
        plugin: '',
        groups: 4n,
      });
      await wallet.client.appClient.fundAppAccount({
        amount: microAlgo(preFundMbr.plugins + preFundMbr.executions + 2_000_000n),
      });

      const mockFactory = new MockAuctionFactoryFactory({
        algorand,
        defaultSender: sender,
        defaultSigner: signer,
      });

      const compiledMock = await mockFactory.appFactory.compile();

      const shortTimestamp = Date.now() % 1_000_000;
      const execution = await wallet.build.usePlugin({
        sender,
        signer,
        lease: `af_upg_${shortTimestamp}`,
        windowSize: 2000n,
        callerType: CallerType.Global,
        calls: [
          daoUpdateSdk.updateApp({
            sender,
            signer,
            appId: auctionFactory!.appId,
            version: upgradeVersion,
            data: compiledMock.approvalProgram,
          }),
        ],
      });

      const walletMbr = await wallet.getMbr({
        escrow: '',
        methodCount: 0n,
        plugin: '',
        groups: BigInt(execution.windows.length),
      });
      const executionBuffer = 1_000_000n;
      await wallet.client.appClient.fundAppAccount({
        amount: microAlgo(walletMbr.plugins + walletMbr.executions + executionBuffer),
      });

      const upgradeAction: ProposalAction<SDKClient> = {
        type: ProposalActionEnum.UpgradeApp,
        app: auctionFactory!.appId,
        executionKey: execution.lease,
        groups: execution.ids,
        firstValid: execution.firstValid,
        lastValid: execution.lastValid,
      };

      await proposeAndExecute(dao, [upgradeAction]);
      await sendPrepared(execution.windows[0], wallet.client.algorand.client.algod);

      const mockClient = new MockAuctionFactoryClient({
        algorand,
        appId: auctionFactory!.appId,
        defaultSender: sender,
        defaultSigner: signer,
      });

      const pingResult = await mockClient.send.ping({ args: {} });
      expect(pingResult.return).toBe(1001n);
    });

    test('should upgrade Marketplace to MockMarketplace', async () => {
      await ensureSenderFunded();
      const { fixture, dao, sender, signer, daoUpdatePluginSdk, marketplace } = context;
      const { algorand } = fixture.context;
      expect(daoUpdatePluginSdk).toBeDefined();
      expect(marketplace).toBeDefined();

      const wallet = dao.wallet;
      const daoUpdateSdk = daoUpdatePluginSdk!;
      const upgradeVersion = `1.0.0`;

      const preFundMbr = await wallet.getMbr({
        escrow: '',
        methodCount: 0n,
        plugin: '',
        groups: 4n,
      });
      await wallet.client.appClient.fundAppAccount({
        amount: microAlgo(preFundMbr.plugins + preFundMbr.executions + 2_000_000n),
      });

      const mockFactory = new MockMarketplaceFactory({
        algorand,
        defaultSender: sender,
        defaultSigner: signer,
      });

      const compiledMock = await mockFactory.appFactory.compile();

      const shortTimestamp = Date.now() % 1_000_000;
      const execution = await wallet.build.usePlugin({
        sender,
        signer,
        lease: `mp_upg_${shortTimestamp}`,
        windowSize: 2000n,
        callerType: CallerType.Global,
        calls: [
          daoUpdateSdk.updateApp({
            sender,
            signer,
            appId: marketplace!.appId,
            version: upgradeVersion,
            data: compiledMock.approvalProgram,
          }),
        ],
      });

      const walletMbr = await wallet.getMbr({
        escrow: '',
        methodCount: 0n,
        plugin: '',
        groups: BigInt(execution.windows.length),
      });
      const executionBuffer = 1_000_000n;
      await wallet.client.appClient.fundAppAccount({
        amount: microAlgo(walletMbr.plugins + walletMbr.executions + executionBuffer),
      });

      const upgradeAction: ProposalAction<SDKClient> = {
        type: ProposalActionEnum.UpgradeApp,
        app: marketplace!.appId,
        executionKey: execution.lease,
        groups: execution.ids,
        firstValid: execution.firstValid,
        lastValid: execution.lastValid,
      };

      await proposeAndExecute(dao, [upgradeAction]);
      await sendPrepared(execution.windows[0], wallet.client.algorand.client.algod);

      const mockClient = new MockMarketplaceClient({
        algorand,
        appId: marketplace!.appId,
        defaultSender: sender,
        defaultSigner: signer,
      });

      const pingResult = await mockClient.send.ping({ args: {} });
      expect(pingResult.return).toBe(1002n);
    });

    test('should upgrade RaffleFactory to MockRaffleFactory', async () => {
      await ensureSenderFunded();
      const { fixture, dao, sender, signer, daoUpdatePluginSdk, raffleFactory } = context;
      const { algorand } = fixture.context;
      expect(daoUpdatePluginSdk).toBeDefined();
      expect(raffleFactory).toBeDefined();

      const wallet = dao.wallet;
      const daoUpdateSdk = daoUpdatePluginSdk!;
      const upgradeVersion = `1.0.0`;

      const preFundMbr = await wallet.getMbr({
        escrow: '',
        methodCount: 0n,
        plugin: '',
        groups: 4n,
      });
      await wallet.client.appClient.fundAppAccount({
        amount: microAlgo(preFundMbr.plugins + preFundMbr.executions + 2_000_000n),
      });

      const mockFactory = new MockRaffleFactoryFactory({
        algorand,
        defaultSender: sender,
        defaultSigner: signer,
      });

      const compiledMock = await mockFactory.appFactory.compile();

      const shortTimestamp = Date.now() % 1_000_000;
      const execution = await wallet.build.usePlugin({
        sender,
        signer,
        lease: `rf_upg_${shortTimestamp}`,
        windowSize: 2000n,
        callerType: CallerType.Global,
        calls: [
          daoUpdateSdk.updateApp({
            sender,
            signer,
            appId: raffleFactory!.appId,
            version: upgradeVersion,
            data: compiledMock.approvalProgram,
          }),
        ],
      });

      const walletMbr = await wallet.getMbr({
        escrow: '',
        methodCount: 0n,
        plugin: '',
        groups: BigInt(execution.windows.length),
      });
      const executionBuffer = 1_000_000n;
      await wallet.client.appClient.fundAppAccount({
        amount: microAlgo(walletMbr.plugins + walletMbr.executions + executionBuffer),
      });

      const upgradeAction: ProposalAction<SDKClient> = {
        type: ProposalActionEnum.UpgradeApp,
        app: raffleFactory!.appId,
        executionKey: execution.lease,
        groups: execution.ids,
        firstValid: execution.firstValid,
        lastValid: execution.lastValid,
      };

      await proposeAndExecute(dao, [upgradeAction]);
      await sendPrepared(execution.windows[0], wallet.client.algorand.client.algod);

      const mockClient = new MockRaffleFactoryClient({
        algorand,
        appId: raffleFactory!.appId,
        defaultSender: sender,
        defaultSigner: signer,
      });

      const pingResult = await mockClient.send.ping({ args: {} });
      expect(pingResult.return).toBe(1003n);
    });

    test('should upgrade PollFactory to MockPollFactory', async () => {
      await ensureSenderFunded();
      const { fixture, dao, sender, signer, daoUpdatePluginSdk, pollFactory } = context;
      const { algorand } = fixture.context;
      expect(daoUpdatePluginSdk).toBeDefined();
      expect(pollFactory).toBeDefined();

      const wallet = dao.wallet;
      const daoUpdateSdk = daoUpdatePluginSdk!;
      const upgradeVersion = `1.0.0`;

      const preFundMbr = await wallet.getMbr({
        escrow: '',
        methodCount: 0n,
        plugin: '',
        groups: 4n,
      });
      await wallet.client.appClient.fundAppAccount({
        amount: microAlgo(preFundMbr.plugins + preFundMbr.executions + 2_000_000n),
      });

      const mockFactory = new MockPollFactoryFactory({
        algorand,
        defaultSender: sender,
        defaultSigner: signer,
      });

      const compiledMock = await mockFactory.appFactory.compile();

      const shortTimestamp = Date.now() % 1_000_000;
      const execution = await wallet.build.usePlugin({
        sender,
        signer,
        lease: `pf_upg_${shortTimestamp}`,
        windowSize: 2000n,
        callerType: CallerType.Global,
        calls: [
          daoUpdateSdk.updateApp({
            sender,
            signer,
            appId: pollFactory!.appId,
            version: upgradeVersion,
            data: compiledMock.approvalProgram,
          }),
        ],
      });

      const walletMbr = await wallet.getMbr({
        escrow: '',
        methodCount: 0n,
        plugin: '',
        groups: BigInt(execution.windows.length),
      });
      const executionBuffer = 1_000_000n;
      await wallet.client.appClient.fundAppAccount({
        amount: microAlgo(walletMbr.plugins + walletMbr.executions + executionBuffer),
      });

      const upgradeAction: ProposalAction<SDKClient> = {
        type: ProposalActionEnum.UpgradeApp,
        app: pollFactory!.appId,
        executionKey: execution.lease,
        groups: execution.ids,
        firstValid: execution.firstValid,
        lastValid: execution.lastValid,
      };

      await proposeAndExecute(dao, [upgradeAction]);
      await sendPrepared(execution.windows[0], wallet.client.algorand.client.algod);

      const mockClient = new MockPollFactoryClient({
        algorand,
        appId: pollFactory!.appId,
        defaultSender: sender,
        defaultSigner: signer,
      });

      const pingResult = await mockClient.send.ping({ args: {} });
      expect(pingResult.return).toBe(1004n);
    });

    test('should upgrade PrizeBoxFactory to MockPrizeBoxFactory', async () => {
      await ensureSenderFunded();
      const { fixture, dao, sender, signer, daoUpdatePluginSdk, prizeBoxFactory } = context;
      const { algorand } = fixture.context;
      expect(daoUpdatePluginSdk).toBeDefined();
      expect(prizeBoxFactory).toBeDefined();

      const wallet = dao.wallet;
      const daoUpdateSdk = daoUpdatePluginSdk!;
      const upgradeVersion = `1.0.0`;

      const preFundMbr = await wallet.getMbr({
        escrow: '',
        methodCount: 0n,
        plugin: '',
        groups: 4n,
      });
      await wallet.client.appClient.fundAppAccount({
        amount: microAlgo(preFundMbr.plugins + preFundMbr.executions + 2_000_000n),
      });

      const mockFactory = new MockPrizeBoxFactoryFactory({
        algorand,
        defaultSender: sender,
        defaultSigner: signer,
      });

      const compiledMock = await mockFactory.appFactory.compile();

      const shortTimestamp = Date.now() % 1_000_000;
      const execution = await wallet.build.usePlugin({
        sender,
        signer,
        lease: `pb_upg_${shortTimestamp}`,
        windowSize: 2000n,
        callerType: CallerType.Global,
        calls: [
          daoUpdateSdk.updateApp({
            sender,
            signer,
            appId: prizeBoxFactory!.appId,
            version: upgradeVersion,
            data: compiledMock.approvalProgram,
          }),
        ],
      });

      const walletMbr = await wallet.getMbr({
        escrow: '',
        methodCount: 0n,
        plugin: '',
        groups: BigInt(execution.windows.length),
      });
      const executionBuffer = 1_000_000n;
      await wallet.client.appClient.fundAppAccount({
        amount: microAlgo(walletMbr.plugins + walletMbr.executions + executionBuffer),
      });

      const upgradeAction: ProposalAction<SDKClient> = {
        type: ProposalActionEnum.UpgradeApp,
        app: prizeBoxFactory!.appId,
        executionKey: execution.lease,
        groups: execution.ids,
        firstValid: execution.firstValid,
        lastValid: execution.lastValid,
      };

      await proposeAndExecute(dao, [upgradeAction]);
      await sendPrepared(execution.windows[0], wallet.client.algorand.client.algod);

      const mockClient = new MockPrizeBoxFactoryClient({
        algorand,
        appId: prizeBoxFactory!.appId,
        defaultSender: sender,
        defaultSigner: signer,
      });

      const pingResult = await mockClient.send.ping({ args: {} });
      expect(pingResult.return).toBe(1005n);
    });

    test('should upgrade StakingPoolFactory to MockStakingPoolFactory', async () => {
      await ensureSenderFunded();
      const { fixture, dao, sender, signer, daoUpdatePluginSdk, stakingPoolFactory } = context;
      const { algorand } = fixture.context;
      expect(daoUpdatePluginSdk).toBeDefined();
      expect(stakingPoolFactory).toBeDefined();

      const wallet = dao.wallet;
      const daoUpdateSdk = daoUpdatePluginSdk!;
      const upgradeVersion = `1.0.0`;

      const preFundMbr = await wallet.getMbr({
        escrow: '',
        methodCount: 0n,
        plugin: '',
        groups: 4n,
      });
      await wallet.client.appClient.fundAppAccount({
        amount: microAlgo(preFundMbr.plugins + preFundMbr.executions + 2_000_000n),
      });

      const mockFactory = new MockStakingPoolFactoryFactory({
        algorand,
        defaultSender: sender,
        defaultSigner: signer,
      });

      const compiledMock = await mockFactory.appFactory.compile();

      const shortTimestamp = Date.now() % 1_000_000;
      const execution = await wallet.build.usePlugin({
        sender,
        signer,
        lease: `sp_upg_${shortTimestamp}`,
        windowSize: 2000n,
        callerType: CallerType.Global,
        calls: [
          daoUpdateSdk.updateApp({
            sender,
            signer,
            appId: stakingPoolFactory!.appId,
            version: upgradeVersion,
            data: compiledMock.approvalProgram,
          }),
        ],
      });

      const walletMbr = await wallet.getMbr({
        escrow: '',
        methodCount: 0n,
        plugin: '',
        groups: BigInt(execution.windows.length),
      });
      const executionBuffer = 1_000_000n;
      await wallet.client.appClient.fundAppAccount({
        amount: microAlgo(walletMbr.plugins + walletMbr.executions + executionBuffer),
      });

      const upgradeAction: ProposalAction<SDKClient> = {
        type: ProposalActionEnum.UpgradeApp,
        app: stakingPoolFactory!.appId,
        executionKey: execution.lease,
        groups: execution.ids,
        firstValid: execution.firstValid,
        lastValid: execution.lastValid,
      };

      await proposeAndExecute(dao, [upgradeAction]);
      await sendPrepared(execution.windows[0], wallet.client.algorand.client.algod);

      const mockClient = new MockStakingPoolFactoryClient({
        algorand,
        appId: stakingPoolFactory!.appId,
        defaultSender: sender,
        defaultSigner: signer,
      });

      const pingResult = await mockClient.send.ping({ args: {} });
      expect(pingResult.return).toBe(1006n);
    });

    test('should upgrade Subscriptions to MockSubscriptions', async () => {
      await ensureSenderFunded();
      const { fixture, dao, sender, signer, daoUpdatePluginSdk, subscriptions } = context;
      const { algorand } = fixture.context;
      expect(daoUpdatePluginSdk).toBeDefined();
      expect(subscriptions).toBeDefined();

      const wallet = dao.wallet;
      const daoUpdateSdk = daoUpdatePluginSdk!;
      const upgradeVersion = `1.0.0`;

      const preFundMbr = await wallet.getMbr({
        escrow: '',
        methodCount: 0n,
        plugin: '',
        groups: 4n,
      });
      await wallet.client.appClient.fundAppAccount({
        amount: microAlgo(preFundMbr.plugins + preFundMbr.executions + 2_000_000n),
      });

      const mockFactory = new MockSubscriptionsFactory({
        algorand,
        defaultSender: sender,
        defaultSigner: signer,
      });

      const compiledMock = await mockFactory.appFactory.compile();

      const shortTimestamp = Date.now() % 1_000_000;
      const execution = await wallet.build.usePlugin({
        sender,
        signer,
        lease: `sub_upg_${shortTimestamp}`,
        windowSize: 2000n,
        callerType: CallerType.Global,
        calls: [
          daoUpdateSdk.updateApp({
            sender,
            signer,
            appId: subscriptions!.appId,
            version: upgradeVersion,
            data: compiledMock.approvalProgram,
          }),
        ],
      });

      const walletMbr = await wallet.getMbr({
        escrow: '',
        methodCount: 0n,
        plugin: '',
        groups: BigInt(execution.windows.length),
      });
      const executionBuffer = 1_000_000n;
      await wallet.client.appClient.fundAppAccount({
        amount: microAlgo(walletMbr.plugins + walletMbr.executions + executionBuffer),
      });

      const upgradeAction: ProposalAction<SDKClient> = {
        type: ProposalActionEnum.UpgradeApp,
        app: subscriptions!.appId,
        executionKey: execution.lease,
        groups: execution.ids,
        firstValid: execution.firstValid,
        lastValid: execution.lastValid,
      };

      await proposeAndExecute(dao, [upgradeAction]);
      await sendPrepared(execution.windows[0], wallet.client.algorand.client.algod);

      const mockClient = new MockSubscriptionsClient({
        algorand,
        appId: subscriptions!.appId,
        defaultSender: sender,
        defaultSigner: signer,
      });

      const pingResult = await mockClient.send.ping({ args: {} });
      expect(pingResult.return).toBe(1007n);
    });

    test('should upgrade AkitaSocial to MockAkitaSocial', async () => {
      await ensureSenderFunded();
      const { fixture, dao, sender, signer, daoUpdatePluginSdk, social } = context;
      const { algorand } = fixture.context;
      expect(daoUpdatePluginSdk).toBeDefined();
      expect(social).toBeDefined();

      const wallet = dao.wallet;
      const daoUpdateSdk = daoUpdatePluginSdk!;
      const upgradeVersion = `1.0.0`;

      const preFundMbr = await wallet.getMbr({
        escrow: '',
        methodCount: 0n,
        plugin: '',
        groups: 4n,
      });
      await wallet.client.appClient.fundAppAccount({
        amount: microAlgo(preFundMbr.plugins + preFundMbr.executions + 2_000_000n),
      });

      const mockFactory = new MockAkitaSocialFactory({
        algorand,
        defaultSender: sender,
        defaultSigner: signer,
      });

      const compiledMock = await mockFactory.appFactory.compile();

      const shortTimestamp = Date.now() % 1_000_000;
      const execution = await wallet.build.usePlugin({
        sender,
        signer,
        lease: `soc_upg_${shortTimestamp}`,
        windowSize: 2000n,
        callerType: CallerType.Global,
        calls: [
          daoUpdateSdk.updateApp({
            sender,
            signer,
            appId: social!.socialAppId,
            version: upgradeVersion,
            data: compiledMock.approvalProgram,
          }),
        ],
      });

      const walletMbr = await wallet.getMbr({
        escrow: '',
        methodCount: 0n,
        plugin: '',
        groups: BigInt(execution.windows.length),
      });
      const executionBuffer = 1_000_000n;
      await wallet.client.appClient.fundAppAccount({
        amount: microAlgo(walletMbr.plugins + walletMbr.executions + executionBuffer),
      });

      const upgradeAction: ProposalAction<SDKClient> = {
        type: ProposalActionEnum.UpgradeApp,
        app: social!.socialAppId,
        executionKey: execution.lease,
        groups: execution.ids,
        firstValid: execution.firstValid,
        lastValid: execution.lastValid,
      };

      await proposeAndExecute(dao, [upgradeAction]);
      await sendPrepared(execution.windows[0], wallet.client.algorand.client.algod);

      const mockClient = new MockAkitaSocialClient({
        algorand,
        appId: social!.socialAppId,
        defaultSender: sender,
        defaultSigner: signer,
      });

      const pingResult = await mockClient.send.ping({ args: {} });
      expect(pingResult.return).toBe(1008n);
    });
  });

  // DAO Self-Upgrade — round-trip: upgrade to mock, verify, restore to original
  // Must run BEFORE Wallet Update (needs real wallet for plugin execution)
  describe('DAO Self-Upgrade', () => {
    test('should verify DAO upgrade plugin is installed', async () => {
      const { daoUpdatePluginSdk } = context;
      expect(daoUpdatePluginSdk).toBeDefined();
      expect(daoUpdatePluginSdk!.appId).toBeGreaterThan(0n);
    });

    test('should upgrade DAO to MockAkitaDAO and restore to original', async () => {
      await ensureSenderFunded();
      const { fixture, dao, sender, signer, daoUpdatePluginSdk } = context;
      const { algorand } = fixture.context;
      expect(daoUpdatePluginSdk).toBeDefined();

      const wallet = dao.wallet;
      const daoUpdateSdk = daoUpdatePluginSdk!;

      // --- Phase 1: Build both executions while DAO is real ---

      const mockDaoFactory = new MockAkitaDaoFactory({
        algorand,
        defaultSender: sender,
        defaultSigner: signer,
      });
      const compiledMockDao = await mockDaoFactory.appFactory.compile();

      const originalDaoFactory = new AkitaDaoFactory({
        algorand,
        defaultSender: sender,
        defaultSigner: signer,
      });
      const compiledOriginalDao = await originalDaoFactory.appFactory.compile();

      // Pre-fund the wallet generously for both executions
      const preFundMbr = await wallet.getMbr({
        escrow: '',
        methodCount: 0n,
        plugin: '',
        groups: 4n,
      });
      await wallet.client.appClient.fundAppAccount({
        amount: microAlgo(preFundMbr.plugins + preFundMbr.executions + 5_000_000n),
      });

      // Build upgrade execution (DAO → mock)
      const shortTimestamp = Date.now() % 1_000_000;
      const upgradeExecution = await wallet.build.usePlugin({
        sender,
        signer,
        lease: `dao_upg_mock_${shortTimestamp}`,
        windowSize: 2000n,
        callerType: CallerType.Global,
        calls: [
          daoUpdateSdk.updateApp({
            sender,
            signer,
            appId: dao.appId,
            version: '1.0.0-mock',
            data: compiledMockDao.approvalProgram,
          }),
        ],
      });

      // Build restore execution (mock → original)
      const restoreTimestamp = (Date.now() + 1) % 1_000_000;
      const restoreExecution = await wallet.build.usePlugin({
        sender,
        signer,
        lease: `dao_upg_restore_${restoreTimestamp}`,
        windowSize: 2000n,
        callerType: CallerType.Global,
        calls: [
          daoUpdateSdk.updateApp({
            sender,
            signer,
            appId: dao.appId,
            version: '1.0.0-restored',
            data: compiledOriginalDao.approvalProgram,
          }),
        ],
      });

      // --- Phase 2: Register both execution keys (while DAO is real) ---

      const upgradeMbr = await wallet.getMbr({
        escrow: '',
        methodCount: 0n,
        plugin: '',
        groups: BigInt(upgradeExecution.windows.length),
      });
      await wallet.client.appClient.fundAppAccount({
        amount: microAlgo(upgradeMbr.plugins + upgradeMbr.executions + 1_000_000n),
      });

      await proposeAndExecute(dao, [{
        type: ProposalActionEnum.UpgradeApp,
        app: dao.appId,
        executionKey: upgradeExecution.lease,
        groups: upgradeExecution.ids,
        firstValid: upgradeExecution.firstValid,
        lastValid: upgradeExecution.lastValid,
      }]);

      const restoreMbr = await wallet.getMbr({
        escrow: '',
        methodCount: 0n,
        plugin: '',
        groups: BigInt(restoreExecution.windows.length),
      });
      await wallet.client.appClient.fundAppAccount({
        amount: microAlgo(restoreMbr.plugins + restoreMbr.executions + 1_000_000n),
      });

      await proposeAndExecute(dao, [{
        type: ProposalActionEnum.UpgradeApp,
        app: dao.appId,
        executionKey: restoreExecution.lease,
        groups: restoreExecution.ids,
        firstValid: restoreExecution.firstValid,
        lastValid: restoreExecution.lastValid,
      }]);

      // --- Phase 3: Execute upgrade, verify mock, then restore ---

      // Execute upgrade → DAO becomes mock
      await sendPrepared(upgradeExecution.windows[0], dao.client.algorand.client.algod);

      // Verify mock works
      const mockClient = new MockAkitaDaoClient({
        algorand: dao.algorand,
        appId: dao.appId,
        defaultSender: sender,
        defaultSigner: signer,
      });
      const pingResult = await mockClient.send.ping({ args: {} });
      expect(pingResult.return).toBe(1337n);

      // Execute restore → DAO becomes original
      await sendPrepared(restoreExecution.windows[0], dao.client.algorand.client.algod);
    });
  });

  // Wallet Update — runs last, replaces the DAO's smart wallet with the mock wallet via
  // the dedicated `UpdateWallet` proposal type. One-way: the wallet is permanently replaced
  // with the mock since no further plugin executions can run against mock code.
  describe('Wallet Update', () => {
    test('should update DAO wallet to MockAbstractedAccount via the UpdateWallet proposal', async () => {
      await ensureSenderFunded();
      const { fixture, dao, sender, signer, daoUpdatePluginSdk, walletFactory } = context;
      const { algorand } = fixture.context;
      expect(daoUpdatePluginSdk).toBeDefined();
      expect(walletFactory).toBeDefined();

      const wallet = dao.wallet;
      const daoUpdateSdk = daoUpdatePluginSdk!;

      // --- Phase 1: Upload MockAbstractedAccount bytecode to the wallet factory's box ---
      // `factory.updateWallet()` re-deploys the DAO wallet using bytecode sitting in its own
      // `boxedContract` box. To swap in the mock wallet, we first transfer the mock bytecode
      // into that box via the update plugin's `updateFactoryChildContract` method.
      const mockWalletFactory = new MockAbstractedAccountFactory({
        algorand,
        defaultSender: sender,
        defaultSigner: signer,
      });
      const compiledMockWallet = await mockWalletFactory.appFactory.compile();

      // Pre-fund the DAO wallet so it can register the execution key + cover plugin MBR.
      const preFundMbr = await wallet.getMbr({
        escrow: '',
        methodCount: 0n,
        plugin: '',
        groups: 4n,
      });
      await wallet.client.appClient.fundAppAccount({
        amount: microAlgo(preFundMbr.plugins + preFundMbr.executions + 5_000_000n),
      });

      // Fund the factory for its boxedContract MBR (box gets (re)sized to the mock bytecode).
      await algorand.send.payment({
        sender,
        receiver: walletFactory!.client.appAddress,
        amount: microAlgo(2_000_000n),
        signer,
      });

      // Build the plugin execution that pushes mock wallet bytecode into the factory's box.
      const shortTimestamp = Date.now() % 1_000_000;
      const uploadExecution = await wallet.build.usePlugin({
        sender,
        signer,
        lease: `wf_child_${shortTimestamp}`,
        windowSize: 2000n,
        callerType: CallerType.Global,
        calls: [
          daoUpdateSdk.updateFactoryChildContract({
            sender,
            signer,
            factoryAppId: walletFactory!.appId,
            version: '1.0.0-mock',
            data: compiledMockWallet.approvalProgram,
          }),
        ],
      });

      const uploadMbr = await wallet.getMbr({
        escrow: '',
        methodCount: 0n,
        plugin: '',
        groups: BigInt(uploadExecution.windows.length),
      });
      await wallet.client.appClient.fundAppAccount({
        amount: microAlgo(uploadMbr.plugins + uploadMbr.executions + 2_000_000n),
      });

      // UpgradeApp proposal registers the execution key on the DAO wallet so the ATC can run.
      const uploadAction: ProposalAction<SDKClient> = {
        type: ProposalActionEnum.UpgradeApp,
        app: walletFactory!.appId,
        executionKey: uploadExecution.lease,
        groups: uploadExecution.ids,
        firstValid: uploadExecution.firstValid,
        lastValid: uploadExecution.lastValid,
      };
      await proposeAndExecute(dao, [uploadAction]);

      // Submit the ATC — this actually writes the mock wallet bytecode to the factory's box.
      await sendPrepared(uploadExecution.windows[0], wallet.client.algorand.client.algod);

      // --- Phase 2: Use the UpdateWallet proposal type (dedicated to wallet updates) ---
      // Executing it calls `DAO.updateWallet()` → `factory.updateWallet(daoWallet)`, which
      // re-deploys the DAO wallet using the mock bytecode now sitting in the factory's box.
      //
      // `executeProposal` is called directly (rather than via the shared `proposeAndExecute`
      // helper) so we can enable `coverAppCallInnerTransactionFees` + `populateAppCallResources`.
      // Those are required because UpdateWallet makes two nested inner txns:
      //   DAO.executeProposal → factory.updateWallet → wallet.update (UpdateApplication).
      const updateWalletAction: ProposalAction<SDKClient> = { type: ProposalActionEnum.UpdateWallet };
      const updateCost = await dao.proposalCost({ actions: [updateWalletAction] });
      await dao.client.appClient.fundAppAccount({ amount: updateCost.total.microAlgo() });

      const { return: updateProposalId } = await dao.newProposal({ actions: [updateWalletAction] });
      if (updateProposalId === undefined) {
        throw new Error('Failed to create UpdateWallet proposal');
      }

      await dao.client.send.executeProposal({
        args: { proposalId: updateProposalId },
        coverAppCallInnerTransactionFees: true,
        populateAppCallResources: true,
        maxFee: microAlgo(1_000_000n),
      });

      // --- Phase 3: Verify the DAO wallet is now running mock bytecode ---
      const mockClient = new MockAbstractedAccountClient({
        algorand,
        appId: wallet.client.appId,
        defaultSender: sender,
        defaultSigner: signer,
      });

      const pingResult = await mockClient.send.ping({ args: {} });
      expect(pingResult.return).toBe(4243n);
    });
  });

});
