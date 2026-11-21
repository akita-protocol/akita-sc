import { MetaSDK, MetaFactory, metadataBoxName, metadataValueLimit } from 'akita-sdk/meta';
import { errNotAkitaDao } from '../../../errors';
import * as algokit from '@algorandfoundation/algokit-utils';
import { microAlgo } from '@algorandfoundation/algokit-utils';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { SigningAccount, TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account';
import { Address } from 'algosdk';
import { beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { AkitaDaoSDK, ProposalAction, ProposalActionEnum } from 'akita-sdk/dao';
import { SDKClient } from 'akita-sdk/types';
import { sendPrepared } from 'akita-sdk';
import { newWallet, UpdateAkitaDAOPluginSDK, WalletFactorySDK, WalletSDK, CallerType } from 'akita-sdk/wallet';
import algosdk from 'algosdk';
import { AbstractedAccountFactory } from '../../../artifacts/arc58/account/AbstractedAccountClient';
import { MockBigUpgradeTargetClient, MockBigUpgradeTargetFactory } from '../../../artifacts/mocks/big-program/MockBigUpgradeTargetClient';
import { MockSmallUpgradeTargetFactory } from '../../../artifacts/mocks/big-program/MockSmallUpgradeTargetClient';
import { MockSchemaBigTargetClient, MockSchemaBigTargetFactory } from '../../../artifacts/mocks/schema-upgrade/MockSchemaBigTargetClient';
import { MockSchemaSmallTargetFactory } from '../../../artifacts/mocks/schema-upgrade/MockSchemaSmallTargetClient';
import { MockStatefulBigTargetClient, MockStatefulBigTargetFactory } from '../../../artifacts/mocks/schema-upgrade/MockStatefulBigTargetClient';
import { MockStatefulSmallTargetFactory } from '../../../artifacts/mocks/schema-upgrade/MockStatefulSmallTargetClient';
import {
  DEFAULT_UPDATE_FIELD_APPROVAL,
  DEFAULT_UPDATE_FIELD_PARTICIPATION,
  DEFAULT_UPGRADE_APP_APPROVAL,
  DEFAULT_UPGRADE_APP_PARTICIPATION,
  DEFAULT_UPDATE_AKITA_DAO_APP_APPROVAL,
  DEFAULT_UPDATE_AKITA_DAO_DURATION,
  DEFAULT_UPDATE_AKITA_DAO_PARTICIPATION,
  DEFAULT_UPDATE_AKITA_DAO_PROPOSAL_CREATION,
  DEFAULT_UPDATE_AKITA_DAO_PROPOSAL_POWER,
} from '../../../utils/defaults';
import { deployUpdateAkitaDaoPlugin } from '../../../../tests/fixtures/plugins/update-akita-dao';
import { MockBigWalletFactory } from '../../../artifacts/mocks/big-wallet/MockBigWalletClient';
import { AkitaUniverse, buildAkitaUniverse } from '../../../../tests/fixtures/dao';

algokit.Config.configure({ populateAppCallResources: true });

const fixture = algorandFixture();

// Helper to create and execute a proposal in one step
async function proposeAndExecute<TClient extends SDKClient>(
  dao: AkitaDaoSDK,
  actions: ProposalAction<TClient>[]
): Promise<bigint> {
  const info = await dao.proposalCost({ actions });
  await dao.client.appClient.fundAppAccount({ amount: info.total.microAlgo() });

  const { return: proposalId } = await dao.newProposal({ actions });
  if (proposalId === undefined) {
    throw new Error('Failed to create proposal');
  }

  await dao.executeProposal({ proposalId });
  return proposalId;
}

describe('UpdateAkitaDAO plugin contract', () => {
  let deployer: TransactionSignerAccount;
  let user: TransactionSignerAccount;
  let akitaUniverse: AkitaUniverse;
  let dispenser: import('@algorandfoundation/algokit-utils/types/account').TransactionSignerAccount & { account: SigningAccount };
  let algorand: import('@algorandfoundation/algokit-utils').AlgorandClient;
  let wallet: WalletSDK;
  let updateAkitaDAOPluginSdk: UpdateAkitaDAOPluginSDK;
  let dao: AkitaDaoSDK;
  let walletFactory: WalletFactorySDK;

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

    dao = akitaUniverse.dao;
    walletFactory = akitaUniverse.walletFactory;

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
    updateAkitaDAOPluginSdk = akitaUniverse.updatePlugin;
    const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n });
    await wallet.client.appClient.fundAppAccount({ amount: algokit.microAlgo(mbr.plugins) });
    await wallet.addPlugin({ client: updateAkitaDAOPluginSdk, callerType: CallerType.Global });
  });

  beforeEach(fixture.newScope);

  describe('UpdateAkitaDAOPlugin SDK', () => {
    test('plugin can be added to wallet', async () => {
      // Verify the plugin was successfully added
      const plugins = await wallet.getPlugins();
      expect(plugins.size).toBe(1);
      expect(updateAkitaDAOPluginSdk.appId).toBeGreaterThan(0n);
    });
  });

  test('Meta upgrades require DAO authorization and preserve records, roots, and types', async () => {
    const sender = deployer.addr.toString();
    const signer = deployer.signer;
    const meta = new MetaSDK({ algorand, factoryParams: {
      appId: akitaUniverse.metaMerkles.appId, defaultSender: sender, defaultSigner: signer,
    } });
    const key = new Uint8Array(31).fill(0xef);
    const data = new Uint8Array(metadataValueLimit(key)).fill(23);
    const written = await meta.setRecord({ key, data, expectedRevision: 0n });
    const root = new Uint8Array(32).fill(17);
    await meta.addRoot({ name: 'upgrade-proof', root, type: 0n });
    const typesBefore = await meta.client.state.box.types.getMap();
    const before = await algorand.app.getBoxValue(meta.appId, metadataBoxName(sender, key));
    const factory = algorand.client.getTypedAppFactory(MetaFactory, { defaultSender: sender, defaultSigner: signer });
    const compiled = await factory.appFactory.compile();
    await expect(meta.client.send.update.update({ args: { newVersion: 'unauthorized' } }))
      .rejects.toThrow(new RegExp(errNotAkitaDao));
    expect(await meta.client.state.global.version()).toBe('0.0.1');

    await dao.getWallet();
    const daoWallet = dao.wallet;
    await daoWallet.client.appClient.fundAppAccount({ amount: microAlgo(10_000_000) });
    await dao.client.appClient.fundAppAccount({ amount: microAlgo(1_000_000) });
    const programMbr = 2_500n + 400n * (2n + BigInt(compiled.approvalProgram.length));
    await algorand.account.ensureFunded(updateAkitaDAOPluginSdk.client.appAddress, dispenser.addr, microAlgo(programMbr));
    const execution = await daoWallet.build.usePlugin({
      sender, signer, lease: 'meta_upg_test', windowSize: 2000n, callerType: CallerType.Global,
      calls: [updateAkitaDAOPluginSdk.updateApp({
        sender, signer, appId: meta.appId, version: '2.0.0-test',
        data: compiled.approvalProgram, clearProgram: compiled.clearStateProgram,
      })],
    });
    const costs = await daoWallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: BigInt(execution.windows.length) });
    await daoWallet.client.appClient.fundAppAccount({ amount: microAlgo(costs.plugins + costs.executions + 2_000_000n) });
    await proposeAndExecute(dao, [{ type: ProposalActionEnum.UpgradeApp, app: meta.appId,
      executionKey: execution.lease, groups: execution.ids,
      firstValid: execution.firstValid, lastValid: execution.lastValid,
    }]);
    for (const window of execution.windows) await sendPrepared(window, algorand.client.algod);
    expect(await meta.client.state.global.version()).toBe('2.0.0-test');
    expect(await meta.client.state.global.akitaDao()).toBe(dao.appId);
    expect(await algorand.app.getBoxValue(meta.appId, metadataBoxName(sender, key))).toEqual(before);
    expect(await meta.client.state.box.types.getMap()).toEqual(typesBefore);
    expect(await meta.getRoot({ address: sender, name: 'upgrade-proof' })).toEqual(root);
    const next = await meta.setRecord({ key, data: new Uint8Array([42]), expectedRevision: written.return! });
    expect(next.return).toBe(written.return! + 1n);
    await meta.removeRecord({ key, expectedRevision: next.return! });
    await meta.deleteRoot({ name: 'upgrade-proof' });
  });

  test('updateApp pushes a > 8 KB program in 4 chunks and grows extra program pages', async () => {
    const sender = deployer.addr.toString();
    const signer = deployer.signer;

    // One-page target created with 0 extra pages.
    const smallFactory = algorand.client.getTypedAppFactory(MockSmallUpgradeTargetFactory, { defaultSender: sender, defaultSigner: signer });
    const { appClient: target } = await smallFactory.send.create.bare();
    const before = await algorand.app.getById(target.appId);
    expect(before.extraProgramPages ?? 0).toBe(0);

    const bigFactory = algorand.client.getTypedAppFactory(MockBigUpgradeTargetFactory, { defaultSender: sender, defaultSigner: signer });
    const compiled = await bigFactory.appFactory.compile();
    expect(compiled.approvalProgram.length).toBeGreaterThan(8_192);
    const neededExtraPages = Math.ceil((compiled.approvalProgram.length + compiled.clearStateProgram.length) / 2_048) - 1;
    expect(neededExtraPages).toBeGreaterThan(3);

    await dao.getWallet();
    const daoWallet = dao.wallet;
    // The DAO wallet sends the update, so on page growth it becomes the target's size sponsor.
    await daoWallet.client.appClient.fundAppAccount({ amount: microAlgo(10_000_000) });
    await dao.client.appClient.fundAppAccount({ amount: microAlgo(1_000_000) });
    const programMbr = 2_500n + 400n * (2n + BigInt(compiled.approvalProgram.length));
    await algorand.account.ensureFunded(updateAkitaDAOPluginSdk.client.appAddress, dispenser.addr, microAlgo(programMbr));

    const execution = await daoWallet.build.usePlugin({
      sender, signer, lease: 'big_upg_test', windowSize: 2000n, callerType: CallerType.Global,
      calls: [updateAkitaDAOPluginSdk.updateApp({
        sender, signer, appId: target.appId, version: 'big',
        data: compiled.approvalProgram, clearProgram: compiled.clearStateProgram,
      })],
    });
    const costs = await daoWallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: BigInt(execution.windows.length) });
    await daoWallet.client.appClient.fundAppAccount({ amount: microAlgo(costs.plugins + costs.executions + 2_000_000n) });
    await proposeAndExecute(dao, [{ type: ProposalActionEnum.UpgradeApp, app: target.appId,
      executionKey: execution.lease, groups: execution.ids,
      firstValid: execution.firstValid, lastValid: execution.lastValid,
    }]);
    for (const window of execution.windows) await sendPrepared(window, algorand.client.algod);

    const after = await algorand.app.getById(target.appId);
    expect(after.extraProgramPages).toBe(neededExtraPages);
    expect(Buffer.from(after.approvalProgram)).toEqual(Buffer.from(compiled.approvalProgram));
    const big = algorand.client.getTypedAppClientById(MockBigUpgradeTargetClient, { appId: target.appId, defaultSender: sender, defaultSigner: signer });
    expect((await big.send.ping({ args: {} })).return).toBe(2n);
  });

  describe('updateFactoryChildContract', () => {
    test('should update factory child contract version', async () => {
      const sender = deployer.addr.toString();
      const signer = deployer.signer;

      // Re-initialize the DAO SDK with the deployer as sender/signer to ensure proper auth
      const deployerDao = new AkitaDaoSDK({
        algorand,
        factoryParams: {
          appId: dao.appId,
          defaultSender: sender,
          defaultSigner: signer,
        },
      });

      // Get the DAO wallet
      await deployerDao.getWallet();
      const daoWallet = deployerDao.wallet;

      // Pre-fund the wallet for the upgrade operation
      const preFundMbr = await daoWallet.getMbr({
        escrow: '',
        methodCount: 0n,
        plugin: '',
        groups: 4n,
      });
      await daoWallet.client.appClient.fundAppAccount({
        amount: microAlgo(preFundMbr.plugins + preFundMbr.executions + 5_000_000n),
      });

      // Execution preparation simulates as the DAO admin and needs fee headroom there.
      await deployerDao.client.appClient.fundAppAccount({ amount: microAlgo(1_000_000n) });

      // Get the current child contract version from the factory
      const factoryStateBefore = await walletFactory.client.state.global.getAll();
      const versionBefore = factoryStateBefore.childContractVersion;
      console.log(`Factory child contract version before: ${versionBefore}`);

      // Compile the AbstractedAccount contract (the child contract)
      const abstractedAccountFactory = algorand.client.getTypedAppFactory(
        AbstractedAccountFactory,
        {
          defaultSender: sender,
          defaultSigner: signer,
        }
      );
      const compiledChildContract = await abstractedAccountFactory.appFactory.compile();
      console.log(`Compiled child contract size: ${compiledChildContract.approvalProgram.length} bytes`);

      // The staging box belongs to the plugin; its funding must track the actual program size.
      const programMbr = 2_500n + 400n * (2n + BigInt(compiledChildContract.approvalProgram.length));
      await algorand.account.ensureFunded(updateAkitaDAOPluginSdk.client.appAddress, dispenser.addr, microAlgo(programMbr));

      // Set the new version
      const newVersion = '2.0.0-test';

      // Build the update execution using updateFactoryChildContract
      const shortTimestamp = Date.now() % 1_000_000;
      const execution = await daoWallet.build.usePlugin({
        sender,
        signer,
        lease: `fc_upg_${shortTimestamp}`,
        windowSize: 2000n,
        callerType: CallerType.Global,
        calls: [
          updateAkitaDAOPluginSdk.updateFactoryChildContract({
            sender,
            signer,
            factoryAppId: walletFactory.appId,
            version: newVersion,
            data: compiledChildContract.approvalProgram,
          }),
        ],
      });

      console.log(`Built execution with ${execution.windows.length} transaction groups`);

      // Fund the wallet for execution
      const walletMbr = await daoWallet.getMbr({
        escrow: '',
        methodCount: 0n,
        plugin: '',
        groups: BigInt(execution.windows.length),
      });
      const executionBuffer = 2_000_000n;
      await daoWallet.client.appClient.fundAppAccount({
        amount: microAlgo(walletMbr.plugins + walletMbr.executions + executionBuffer),
      });

      // Create and execute the upgrade proposal using deployer's DAO instance
      const upgradeAction: ProposalAction<SDKClient> = {
        type: ProposalActionEnum.UpgradeApp,
        app: walletFactory.appId,
        executionKey: execution.lease,
        groups: execution.ids,
        firstValid: execution.firstValid,
        lastValid: execution.lastValid,
      };

      const proposalId = await proposeAndExecute(deployerDao, [upgradeAction]);
      console.log(`Proposal ${proposalId} created and executed`);

      // Submit the actual update transaction.
      // v10: the legacy algosdk ATC.submit() chains `sendRawTransaction(...).do()`, but the utils10
      // `AlgodClient` exposes `sendRawTransaction` as a direct promise — no `.do()`. Use the
      // compat helper that gathers signatures + sends via the v10 client and returns the txIDs.
      await sendPrepared(execution.windows[0], algorand.client.algod);
      console.log('Update transaction submitted');

      // Verify the factory's child contract version was updated
      const factoryStateAfter = await walletFactory.client.state.global.getAll();
      const versionAfter = factoryStateAfter.childContractVersion;
      console.log(`Factory child contract version after: ${versionAfter}`);

      expect(versionAfter).toBe(newVersion);
      expect(versionAfter).not.toBe(versionBefore);
    });

    test('should allow creating wallets after child contract update', async () => {
      const sender = deployer.addr.toString();
      const signer = deployer.signer;

      // Get the current child contract version
      const factoryState = await walletFactory.client.state.global.getAll();
      console.log(`Current factory child contract version: ${factoryState.childContractVersion}`);

      // Create a new wallet using the factory
      const newUserWallet = await newWallet({
        algorand,
        factoryParams: {
          appId: walletFactory.appId,
          defaultSender: sender,
          defaultSigner: signer,
        },
        sender,
        signer,
        nickname: 'Post-Upgrade Wallet',
      });

      expect(newUserWallet.client.appId).toBeGreaterThan(0n);

      // Verify the wallet was created successfully
      const walletState = await newUserWallet.client.state.global.getAll();
      expect(walletState.nickname).toBe('Post-Upgrade Wallet');
      expect(walletState.factoryApp).toBe(walletFactory.appId);
      
      console.log(`New wallet created with ID: ${newUserWallet.client.appId}`);
    });

    test('wallet factory creates and updates > 8 KB wallets with derived extra pages', async () => {
      const sender = deployer.addr.toString();
      const signer = deployer.signer;

      const deployerDao = new AkitaDaoSDK({
        algorand,
        factoryParams: { appId: dao.appId, defaultSender: sender, defaultSigner: signer },
      });
      await deployerDao.getWallet();
      const daoWallet = deployerDao.wallet;
      await daoWallet.client.appClient.fundAppAccount({ amount: microAlgo(10_000_000n) });
      await deployerDao.client.appClient.fundAppAccount({ amount: microAlgo(1_000_000n) });

      // A wallet created earlier from the tree's wallet program, with the pages the factory derived for it.
      // The tree wallet has had five pages (4 extra) since 2026-11-20. A wallet that grows from the 3 extra
      // pages of the MainNet program is covered in tests/compat/compat.e2e.spec.ts, section D.
      const before = await algorand.app.getById(wallet.appId);
      const treeExtraPages = Math.ceil((before.approvalProgram.length + before.clearStateProgram.length) / 2_048) - 1;
      expect(before.extraProgramPages).toBe(treeExtraPages);

      // Push a larger wallet program (the real wallet plus padding) into the factory box
      const bigFactory = algorand.client.getTypedAppFactory(MockBigWalletFactory, { defaultSender: sender, defaultSigner: signer });
      const compiled = await bigFactory.appFactory.compile();
      expect(compiled.approvalProgram.length).toBeGreaterThan(8_192);
      const neededExtraPages = Math.ceil((compiled.approvalProgram.length + compiled.clearStateProgram.length) / 2_048) - 1;
      expect(neededExtraPages).toBeGreaterThan(treeExtraPages);

      const programMbr = 2_500n + 400n * (2n + BigInt(compiled.approvalProgram.length));
      await algorand.account.ensureFunded(updateAkitaDAOPluginSdk.client.appAddress, dispenser.addr, microAlgo(programMbr));
      // the factory's own box grows as well
      await walletFactory.client.appClient.fundAppAccount({ amount: microAlgo(programMbr) });

      const execution = await daoWallet.build.usePlugin({
        sender, signer, lease: `big_wallet_${Date.now() % 1_000_000}`, windowSize: 2000n, callerType: CallerType.Global,
        calls: [updateAkitaDAOPluginSdk.updateFactoryChildContract({
          sender, signer, factoryAppId: walletFactory.appId, version: 'big-wallet', data: compiled.approvalProgram,
        })],
      });
      const walletMbr = await daoWallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: BigInt(execution.windows.length) });
      await daoWallet.client.appClient.fundAppAccount({ amount: microAlgo(walletMbr.plugins + walletMbr.executions + 2_000_000n) });
      await proposeAndExecute(deployerDao, [{
        type: ProposalActionEnum.UpgradeApp, app: walletFactory.appId,
        executionKey: execution.lease, groups: execution.ids,
        firstValid: execution.firstValid, lastValid: execution.lastValid,
      }]);
      for (const window of execution.windows) await sendPrepared(window, algorand.client.algod);

      // New wallets get the derived page count (chunked creation of a > 8 KB program)
      const bigWallet = await newWallet({
        algorand,
        factoryParams: { appId: walletFactory.appId, defaultSender: sender, defaultSigner: signer },
        sender, signer, nickname: 'Big Wallet',
      });
      const created = await algorand.app.getById(bigWallet.appId);
      expect(created.extraProgramPages).toBe(neededExtraPages);
      expect(Buffer.from(created.approvalProgram)).toEqual(Buffer.from(compiled.approvalProgram));
      expect((await bigWallet.client.state.global.getAll()).nickname).toBe('Big Wallet');

      // Existing wallets with fewer pages grow on updateWallet. The factory sends the update and becomes the
      // wallet's size sponsor, so it must hold the wallet's full program + schema MBR first.
      await walletFactory.client.appClient.fundAppAccount({ amount: microAlgo(5_000_000n) });
      // Growing pages makes the inner update cost more than one min fee on LocalNet (observed
      // +236 µALGO), so give it headroom.
      await walletFactory.client.send.updateWallet({ sender, signer, args: { wallet: wallet.appId }, extraFee: microAlgo(3_000n) });
      const after = await algorand.app.getById(wallet.appId);
      expect(after.extraProgramPages).toBe(neededExtraPages);
      expect(Buffer.from(after.approvalProgram)).toEqual(Buffer.from(compiled.approvalProgram));
    });
  });

  // ─────────────────────────────────────────────────────────────────────────────────────────────
  // Audit 2026-10 remediation (DAO-01, DAO-02, DAO-03, DAO-10, validator, schema growth)
  // ─────────────────────────────────────────────────────────────────────────────────────────────

  const currentRound = async () => BigInt((await algorand.client.algod.status().do()).lastRound);
  const key32 = (seed: number) => new Uint8Array(32).fill(seed);

  /** Build an Update-plugin `updateApp` execution for `targetAppId` with the given compiled program. */
  const buildUpgrade = async (lease: string, targetAppId: bigint, program: { approvalProgram: Uint8Array; clearStateProgram: Uint8Array }, schema?: { globalNumUint: bigint; globalNumBytes: bigint },
    daoBinding?: { lease: string; proposalId: bigint }) => {
    const sender = deployer.addr.toString();
    const signer = deployer.signer;
    await dao.getWallet();
    const daoWallet = dao.wallet;
    await daoWallet.client.appClient.fundAppAccount({ amount: microAlgo(10_000_000) });
    await dao.client.appClient.fundAppAccount({ amount: microAlgo(1_000_000) });
    const programMbr = 2_500n + 400n * (2n + BigInt(program.approvalProgram.length));
    await algorand.account.ensureFunded(updateAkitaDAOPluginSdk.client.appAddress, dispenser.addr, microAlgo(programMbr));
    const execution = await daoWallet.build.usePlugin({
      sender, signer, lease, windowSize: 2000n, callerType: CallerType.Global,
      calls: [updateAkitaDAOPluginSdk.updateApp({
        sender, signer, appId: targetAppId, version: 'remediation',
        data: program.approvalProgram, clearProgram: program.clearStateProgram,
        ...(schema ?? {}),
        daoBinding,
      })],
    });
    const costs = await daoWallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: BigInt(execution.windows.length) });
    await daoWallet.client.appClient.fundAppAccount({ amount: microAlgo(costs.plugins + costs.executions + 2_000_000n) });
    return execution;
  };

  describe('updateApp grows pages of a target that holds global state', () => {
    test('a stateful 1-page target is upgraded to a > 8 KB program and keeps its schema and values', async () => {
      const sender = deployer.addr.toString();
      const signer = deployer.signer;
      const smallFactory = algorand.client.getTypedAppFactory(MockStatefulSmallTargetFactory, { defaultSender: sender, defaultSigner: signer });
      const { appClient: target } = await smallFactory.send.create.bare();
      const before = await algorand.app.getById(target.appId);
      expect(before.extraProgramPages ?? 0).toBe(0);
      expect(before.globalInts).toBe(1);
      expect(before.globalByteSlices).toBe(1);

      const bigFactory = algorand.client.getTypedAppFactory(MockStatefulBigTargetFactory, { defaultSender: sender, defaultSigner: signer });
      const compiled = await bigFactory.appFactory.compile();
      expect(compiled.approvalProgram.length).toBeGreaterThan(8_192);

      // Plain updateApp (no schema arguments): the page growth must carry the current schema.
      const execution = await buildUpgrade('stateful_pages_upg', target.appId, compiled);
      await proposeAndExecute(dao, [{ type: ProposalActionEnum.UpgradeApp, app: target.appId,
        executionKey: execution.lease, groups: execution.ids,
        firstValid: execution.firstValid, lastValid: execution.lastValid,
      }]);
      for (const window of execution.windows) await sendPrepared(window, algorand.client.algod);

      const after = await algorand.app.getById(target.appId);
      expect(after.extraProgramPages).toBeGreaterThan(3);
      expect(after.globalInts).toBe(1);
      expect(after.globalByteSlices).toBe(1);
      expect(Buffer.from(after.approvalProgram)).toEqual(Buffer.from(compiled.approvalProgram));
      const big = algorand.client.getTypedAppClientById(MockStatefulBigTargetClient, { appId: target.appId, defaultSender: sender, defaultSigner: signer });
      // The value written at creation survived the update.
      expect((await big.send.bump({ args: {} })).return).toBe(42n);
    });
  });

  describe('updateApp grows the global schema (updateAppWithSchema)', () => {
    test('a target with an empty schema is upgraded to 2 uints + 1 byte slice and can use them', async () => {
      const sender = deployer.addr.toString();
      const signer = deployer.signer;
      const smallFactory = algorand.client.getTypedAppFactory(MockSchemaSmallTargetFactory, { defaultSender: sender, defaultSigner: signer });
      const { appClient: target } = await smallFactory.send.create.bare();
      const before = await algorand.app.getById(target.appId);
      expect(before.globalInts ?? 0).toBe(0);
      expect(before.globalByteSlices ?? 0).toBe(0);

      const bigFactory = algorand.client.getTypedAppFactory(MockSchemaBigTargetFactory, { defaultSender: sender, defaultSigner: signer });
      const compiled = await bigFactory.appFactory.compile();
      const execution = await buildUpgrade('schema_upg_test', target.appId, compiled, { globalNumUint: 2n, globalNumBytes: 1n });
      await proposeAndExecute(dao, [{ type: ProposalActionEnum.UpgradeApp, app: target.appId,
        executionKey: execution.lease, groups: execution.ids,
        firstValid: execution.firstValid, lastValid: execution.lastValid,
      }]);
      for (const window of execution.windows) await sendPrepared(window, algorand.client.algod);

      const after = await algorand.app.getById(target.appId);
      expect(after.globalInts).toBe(2);
      expect(after.globalByteSlices).toBe(1);
      const big = algorand.client.getTypedAppClientById(MockSchemaBigTargetClient, { appId: target.appId, defaultSender: sender, defaultSigner: signer });
      expect((await big.send.bump({ args: {} })).return).toBe(15n);
    });
  });

  describe('DAO-03: update-plugin executions are bound to UpgradeApp actions and their target', () => {
    test('an ExecutePlugin action may not target the Update plugin', async () => {
      await expect(proposeAndExecute(dao, [{
        type: ProposalActionEnum.ExecutePlugin,
        plugin: updateAkitaDAOPluginSdk.appId,
        caller: algosdk.ALGORAND_ZERO_ADDRESS_STRING,
        escrow: '',
        executionKey: key32(201),
        groups: [key32(202)],
        firstValid: 1n,
        lastValid: (await currentRound()) + 100n,
      }])).rejects.toThrow(/errIact/);
    });

    test('an UpgradeApp approved for app A cannot carry a group that upgrades app B', async () => {
      const sender = deployer.addr.toString();
      const signer = deployer.signer;
      const smallFactory = algorand.client.getTypedAppFactory(MockSmallUpgradeTargetFactory, { defaultSender: sender, defaultSigner: signer });
      const { appClient: approved } = await smallFactory.send.create.bare();
      const { appClient: victim } = await smallFactory.send.create.bare();
      const compiled = await smallFactory.appFactory.compile();

      const execution = await buildUpgrade('mismatch_upg_test', victim.appId, compiled);
      await proposeAndExecute(dao, [{ type: ProposalActionEnum.UpgradeApp, app: approved.appId,
        executionKey: execution.lease, groups: execution.ids,
        firstValid: execution.firstValid, lastValid: execution.lastValid,
      }]);
      await expect(sendPrepared(execution.windows[0], algorand.client.algod)).rejects.toThrow(/errNupx/);
      const victimAfter = await algorand.app.getById(victim.appId);
      expect(victimAfter.approvalProgram.length).toBeGreaterThan(0);
    });

    // Principal-resolution Phase 2a: the proposal read (SDK `daoBinding` note) binds as strictly as
    // isUpgradeLease. It is what the plugin uses on the deployed MainNet DAO, which has no isUpgradeLease.
    test('proposal read: an UpgradeApp approved for the target upgrades it', async () => {
      const sender = deployer.addr.toString();
      const signer = deployer.signer;
      const smallFactory = algorand.client.getTypedAppFactory(MockSmallUpgradeTargetFactory, { defaultSender: sender, defaultSigner: signer });
      const { appClient: target } = await smallFactory.send.create.bare();
      const big = await algorand.client.getTypedAppFactory(MockBigUpgradeTargetFactory, { defaultSender: sender, defaultSigner: signer }).appFactory.compile();
      const proposalId = (await dao.client.state.global.proposalId())!;
      const lease = `prop_read_ok_${Date.now() % 1_000_000}`;
      const execution = await buildUpgrade(lease, target.appId, big, undefined, { lease, proposalId });
      const created = await proposeAndExecute(dao, [{ type: ProposalActionEnum.UpgradeApp, app: target.appId,
        executionKey: execution.lease, groups: execution.ids,
        firstValid: execution.firstValid, lastValid: execution.lastValid,
      }]);
      expect(created).toBe(proposalId);
      await sendPrepared(execution.windows[0], algorand.client.algod);
      const after = await algorand.app.getById(target.appId);
      expect(Buffer.from(after.approvalProgram)).toEqual(Buffer.from(big.approvalProgram));
    });

    test('proposal read: an UpgradeApp approved for app A cannot carry a group that upgrades app B', async () => {
      const sender = deployer.addr.toString();
      const signer = deployer.signer;
      const smallFactory = algorand.client.getTypedAppFactory(MockSmallUpgradeTargetFactory, { defaultSender: sender, defaultSigner: signer });
      const { appClient: approved } = await smallFactory.send.create.bare();
      const { appClient: victim } = await smallFactory.send.create.bare();
      const compiled = await smallFactory.appFactory.compile();
      const proposalId = (await dao.client.state.global.proposalId())!;
      const lease = `prop_read_bad_${Date.now() % 1_000_000}`;
      const execution = await buildUpgrade(lease, victim.appId, compiled, undefined, { lease, proposalId });
      expect(await proposeAndExecute(dao, [{ type: ProposalActionEnum.UpgradeApp, app: approved.appId,
        executionKey: execution.lease, groups: execution.ids,
        firstValid: execution.firstValid, lastValid: execution.lastValid,
      }])).toBe(proposalId);
      await expect(sendPrepared(execution.windows[0], algorand.client.algod)).rejects.toThrow(/errNupx/);
    });

    test('an execution key (lease) can never be registered twice', async () => {
      const sender = deployer.addr.toString();
      const signer = deployer.signer;
      const smallFactory = algorand.client.getTypedAppFactory(MockSmallUpgradeTargetFactory, { defaultSender: sender, defaultSigner: signer });
      const { appClient: target } = await smallFactory.send.create.bare();
      const compiled = await smallFactory.appFactory.compile();
      const execution = await buildUpgrade('reuse_upg_test', target.appId, compiled);
      const action = { type: ProposalActionEnum.UpgradeApp as const, app: target.appId,
        executionKey: execution.lease, groups: execution.ids,
        firstValid: execution.firstValid, lastValid: execution.lastValid,
      };
      await proposeAndExecute(dao, [action]);
      // Neither another UpgradeApp nor an ExecutePlugin may re-use (or append groups to) the lease.
      await expect(proposeAndExecute(dao, [action])).rejects.toThrow(/errExkr/);
      await expect(proposeAndExecute(dao, [{
        type: ProposalActionEnum.ExecutePlugin,
        plugin: akitaUniverse.payPlugin.appId,
        caller: algosdk.ALGORAND_ZERO_ADDRESS_STRING,
        escrow: '',
        executionKey: execution.lease,
        groups: [key32(203)],
        firstValid: execution.firstValid,
        lastValid: execution.lastValid,
      }])).rejects.toThrow(/errExkr|errNprp|errNplg|errNexe/);
      await sendPrepared(execution.windows[0], algorand.client.algod);
    });
  });

  describe('DAO-R1: only an execution-key grant can carry an UpgradeApp lease', () => {
    const smallTarget = async () => {
      const smallFactory = algorand.client.getTypedAppFactory(MockSmallUpgradeTargetFactory, { defaultSender: deployer.addr.toString(), defaultSigner: deployer.signer });
      const { appClient: target } = await smallFactory.send.create.bare();
      return { target, compiled: await smallFactory.appFactory.compile() };
    };

    /** `user` rekeys the DAO wallet to `plugin` through its own grant, stamping `lease` on the rekey call. */
    const sendWithLease = async (plugin: UpdateAkitaDAOPluginSDK, type: CallerType, lease: Uint8Array, targetAppId: bigint,
      program: { approvalProgram: Uint8Array; clearStateProgram: Uint8Array }) => {
      const sender = user.addr.toString();
      const signer = user.signer;
      const daoWallet = dao.wallet;
      const spending = (await daoWallet.client.state.global.controlledAddress())!;
      const { getTxns } = plugin.updateApp({
        sender, signer, appId: targetAppId, version: 'replayed',
        data: program.approvalProgram, clearProgram: program.clearStateProgram,
      })(spending);
      const txns = await getTxns({ wallet: daoWallet.appId });
      const group = daoWallet.client.newGroup().arc58RekeyToPlugin({
        sender, signer, lease, maxFee: microAlgo(100_000n),
        args: { plugin: plugin.appId, type: BigInt(type), escrow: '', methodOffsets: [], fundsRequest: [] },
      });
      const composer = await group.composer();
      for (const txn of txns) composer.addAppCallMethodCall({ ...(txn as Parameters<typeof composer.addAppCallMethodCall>[0]), maxFee: microAlgo(100_000n) });
      group.arc58VerifyAuthAddress({ sender, signer, args: {}, maxFee: microAlgo(10_000n) });
      return group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
    };

    /** A target upgraded once through `pal.update`, leaving its UpgradeApp lease used but inside its window. */
    const usedLease = async (name: string) => {
      const { target, compiled } = await smallTarget();
      const execution = await buildUpgrade(name, target.appId, compiled);
      await proposeAndExecute(dao, [{ type: ProposalActionEnum.UpgradeApp, app: target.appId,
        executionKey: execution.lease, groups: execution.ids,
        firstValid: execution.firstValid, lastValid: execution.lastValid,
      }]);
      await sendPrepared(execution.windows[0], algorand.client.algod);
      return { target, compiled, lease: execution.lease };
    };

    const deploySecondUpdatePlugin = async () => {
      const plugin = await deployUpdateAkitaDaoPlugin({ fixture, sender: deployer.addr.toString(), signer: deployer.signer, args: { akitaDao: dao.appId } });
      await dao.wallet.client.appClient.fundAppAccount({ amount: microAlgo(2_000_000n) });
      return plugin;
    };

    test('a caller-scoped grant cannot replay a used lease, even when the plugin also holds an execution-key grant', async () => {
      const { target, compiled, lease } = await usedLease(`r1_caller_${Date.now() % 1_000_000}`);
      const plugin = await deploySecondUpdatePlugin();
      await proposeAndExecute(dao, [
        {
          type: ProposalActionEnum.AddPlugin, client: plugin, callerType: CallerType.Global, useExecutionKey: true,
          fee: DEFAULT_UPDATE_AKITA_DAO_PROPOSAL_CREATION, power: DEFAULT_UPDATE_AKITA_DAO_PROPOSAL_POWER,
          duration: DEFAULT_UPDATE_AKITA_DAO_DURATION, participation: DEFAULT_UPDATE_AKITA_DAO_PARTICIPATION,
          approval: DEFAULT_UPDATE_AKITA_DAO_APP_APPROVAL, sourceLink: '',
        },
        { type: ProposalActionEnum.AddPlugin, client: plugin, callerType: CallerType.Other, caller: user.addr.toString(), useExecutionKey: false, sourceLink: '' },
      ] as ProposalAction<SDKClient>[]);

      await expect(sendWithLease(plugin, CallerType.Other, lease, target.appId, compiled)).rejects.toThrow(/errNupx/);

      await proposeAndExecute(dao, [{ type: ProposalActionEnum.RemovePlugin, plugin: plugin.appId, caller: user.addr.toString(), escrow: '' }]);
    });

    test('a global grant without execution keys cannot replay a used lease', async () => {
      const { target, compiled, lease } = await usedLease(`r1_global_${Date.now() % 1_000_000}`);
      const plugin = await deploySecondUpdatePlugin();
      await proposeAndExecute(dao, [{
        type: ProposalActionEnum.AddPlugin, client: plugin, callerType: CallerType.Global, useExecutionKey: false, sourceLink: '',
      } as ProposalAction<SDKClient>]);

      await expect(sendWithLease(plugin, CallerType.Global, lease, target.appId, compiled)).rejects.toThrow(/errNupx/);
    });

    test('isUpgradeLease stops accepting a lease once its window has passed', async () => {
      const { target } = await smallTarget();
      const lease = key32(231);
      await proposeAndExecute(dao, [{
        type: ProposalActionEnum.UpgradeApp, app: target.appId,
        executionKey: lease, groups: [key32(232)],
        firstValid: 1n, lastValid: (await currentRound()) + 8n,
      }]);
      expect(await dao.client.isUpgradeLease({ args: { app: target.appId, lease } })).toBe(true);
      for (let i = 0; i < 10; i++) {
        await algorand.send.payment({ sender: deployer.addr, signer: deployer.signer, receiver: deployer.addr, amount: microAlgo(0), note: `r1_round_${i}` });
      }
      expect(await dao.client.isUpgradeLease({ args: { app: target.appId, lease } })).toBe(false);
    });

    test('granting pal.update is upgrade class and only as a global execution-key grant', async () => {
      const callerGrant = {
        type: ProposalActionEnum.AddPlugin, client: updateAkitaDAOPluginSdk, callerType: CallerType.Other,
        caller: user.addr.toString(), useExecutionKey: false, sourceLink: '',
      } as ProposalAction<SDKClient>;
      const cost = await dao.proposalCost({ actions: [callerGrant] });
      expect(cost.participation).toBe(DEFAULT_UPGRADE_APP_PARTICIPATION);
      expect(cost.approval).toBe(DEFAULT_UPGRADE_APP_APPROVAL);
      await expect(proposeAndExecute(dao, [callerGrant])).rejects.toThrow(/errIact/);
    });
  });

  describe('DAO-02 / DAO-10 / validator: proposal classes and settings', () => {
    test('UpdateFields on registry fields needs the upgrade class; plain parameters keep the UpdateFields class', async () => {
      const registry = await dao.proposalCost({ actions: [{ type: ProposalActionEnum.UpdateFields, field: 'aal', value: {} }] });
      expect(registry.participation).toBe(DEFAULT_UPGRADE_APP_PARTICIPATION);
      expect(registry.approval).toBe(DEFAULT_UPGRADE_APP_APPROVAL);

      const splits = await dao.proposalCost({ actions: [{ type: ProposalActionEnum.UpdateFields, field: 'revenue_splits', value: [] }] });
      expect(splits.participation).toBe(DEFAULT_UPGRADE_APP_PARTICIPATION);

      const plain = await dao.proposalCost({ actions: [{ type: ProposalActionEnum.UpdateFields, field: 'min_rewards_impact', value: 10 }] });
      expect(plain.participation).toBe(DEFAULT_UPDATE_FIELD_PARTICIPATION);
      expect(plain.approval).toBe(DEFAULT_UPDATE_FIELD_APPROVAL);
    });

    test('toggle_escrow_lock_ps and remove_execute_plugin_ps are governable', async () => {
      const settings = { fee: 1_000_000n, power: 5n, duration: 3_600n, participation: 55_000n, approval: 65_000n };
      await proposeAndExecute(dao, [
        { type: ProposalActionEnum.UpdateFields, field: 'toggle_escrow_lock_ps', value: settings },
        { type: ProposalActionEnum.UpdateFields, field: 'remove_execute_plugin_ps', value: { ...settings, duration: 7_200n } },
      ]);
      const state = await dao.client.state.global.getAll();
      expect(state.toggleEscrowLockProposalSettings?.duration).toBe(3_600n);
      expect(state.removeExecutePluginProposalSettings?.duration).toBe(7_200n);
    });

    test('ChangeAdmin must be the last action and cannot target the DAO wallet itself', async () => {
      await dao.getWallet();
      const someone = algosdk.generateAccount().addr.toString();
      await expect(proposeAndExecute(dao, [
        { type: ProposalActionEnum.ChangeAdmin, admin: someone },
        { type: ProposalActionEnum.UpdateFields, field: 'min_rewards_impact', value: 11 },
      ])).rejects.toThrow(/errCanl/);
      await expect(proposeAndExecute(dao, [
        { type: ProposalActionEnum.ChangeAdmin, admin: dao.wallet.client.appAddress.toString() },
      ])).rejects.toThrow(/errIadm/);
    });
  });

  describe('DAO-01: bootstrap proposals cannot outlive creator control', () => {
    test('a bootstrap proposal may not hand the DAO wallet to another admin', async () => {
      const someone = algosdk.generateAccount().addr.toString();
      await expect(proposeAndExecute(dao, [{ type: ProposalActionEnum.ChangeAdmin, admin: someone }]))
        .rejects.toThrow(/errBsfb/);
    });

    test('bootstrap execution keys must expire within MaxBootstrapKeyRounds', async () => {
      const smallFactory = algorand.client.getTypedAppFactory(MockSmallUpgradeTargetFactory, { defaultSender: deployer.addr.toString(), defaultSigner: deployer.signer });
      const { appClient: target } = await smallFactory.send.create.bare();
      await dao.client.appClient.fundAppAccount({ amount: microAlgo(1_000_000) });
      await expect(proposeAndExecute(dao, [{
        type: ProposalActionEnum.UpgradeApp, app: target.appId,
        executionKey: key32(211), groups: [key32(212)],
        firstValid: 1n, lastValid: (await currentRound()) + 20_000n,
      }])).rejects.toThrow(/errBsfb/);
    });

    test('DAO-R3: a caller-scoped bootstrap grant is recorded publicly and does not block initialize', async () => {
      await dao.getWallet();
      await dao.wallet.client.appClient.fundAppAccount({ amount: microAlgo(1_000_000n) });
      await dao.clearBootstrapKeys();
      // The universe fixture adds caller-scoped grants in bootstrap (asa manager, sticker rewards).
      const fixtureGrants = await dao.getBootstrapGrants();
      if (fixtureGrants.length > 0) {
        await proposeAndExecute(dao, fixtureGrants.map(grant => ({ type: ProposalActionEnum.RemovePlugin as const, ...grant })));
      }
      expect(await dao.client.state.global.bootstrapKeyCount()).toBe(0n);
      const grant = { plugin: akitaUniverse.payPlugin.appId, caller: user.addr.toString(), escrow: '' };
      await proposeAndExecute(dao, [{
        type: ProposalActionEnum.AddPlugin, client: akitaUniverse.payPlugin, callerType: CallerType.Other,
        caller: grant.caller, useExecutionKey: false, sourceLink: '',
      } as ProposalAction<SDKClient>]);
      // Pre-launch automation stays: the grant is listed, and initialize's gate (bootstrap keys) is untouched.
      expect(await dao.getBootstrapGrants()).toContainEqual(grant);
      expect(await dao.client.state.global.bootstrapKeyCount()).toBe(0n);

      await proposeAndExecute(dao, [{ type: ProposalActionEnum.RemovePlugin, ...grant }]);
      expect(await dao.getBootstrapGrants()).not.toContainEqual(grant);
    });

    test('initialize requires every bootstrap key cleared; leftover bootstrap proposals expire at initialization', async () => {
      const creator = deployer.addr.toString();
      // A fresh, unused bootstrap key: only the creator may revoke it before it expires.
      const smallFactory = algorand.client.getTypedAppFactory(MockSmallUpgradeTargetFactory, { defaultSender: creator, defaultSigner: deployer.signer });
      const { appClient: target } = await smallFactory.send.create.bare();
      await dao.getWallet();
      await dao.wallet.client.appClient.fundAppAccount({ amount: microAlgo(1_000_000) });
      await dao.client.appClient.fundAppAccount({ amount: microAlgo(1_000_000) });
      const liveLease = key32(221);
      await proposeAndExecute(dao, [{
        type: ProposalActionEnum.UpgradeApp, app: target.appId,
        executionKey: liveLease, groups: [key32(222)],
        firstValid: 1n, lastValid: (await currentRound()) + 1_000n,
      }]);
      expect((await dao.getBootstrapKeys()).some(lease => Buffer.from(lease).equals(Buffer.from(liveLease)))).toBe(true);

      // A creator-approved proposal that is left unexecuted.
      const { return: leftoverId } = await dao.newProposal({
        actions: [{ type: ProposalActionEnum.UpdateFields, field: 'min_rewards_impact', value: 12 }],
      });
      expect((await dao.getProposal(leftoverId!)).status).toBe(40);

      await expect(dao.initialize()).rejects.toThrow(/errBsko/);
      await expect(dao.clearBootstrapKeys({ sender: user.addr.toString(), signer: user.signer, leases: [liveLease] }))
        .rejects.toThrow(/errBska/);

      await dao.clearBootstrapKeys();
      expect(await dao.getBootstrapKeys()).toHaveLength(0);
      // The revoked key is gone from the DAO wallet too.
      const executions = await dao.wallet.client.arc58GetExecutions({ args: [[liveLease]] });
      // The return is an ARC-4 tuple array (groups, firstValid, lastValid); `.groups` was always undefined.
      expect(executions).toHaveLength(1);
      expect(executions[0][0]).toHaveLength(0);

      await dao.initialize();
      expect((await dao.getGlobalState()).state).toBe(2);

      await expect(dao.executeProposal({ proposalId: leftoverId! })).rejects.toThrow(/errBsex/);
      await dao.client.send.deleteProposal({
        args: { proposalId: leftoverId! },
        populateAppCallResources: true,
        coverAppCallInnerTransactionFees: true,
        maxFee: microAlgo(20_000n),
      });
      await expect(dao.getProposal(leftoverId!)).rejects.toThrow();
      await expect(dao.initialize()).rejects.toThrow(/errInit/);
    });
  });
});
