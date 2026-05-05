import * as algokit from '@algorandfoundation/algokit-utils';
import { microAlgo } from '@algorandfoundation/algokit-utils';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { SigningAccount, TransactionSignerAccount, Address } from '@algorandfoundation/algokit-utils/types/account';
import { beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { AkitaDaoSDK, ProposalAction, ProposalActionEnum } from 'akita-sdk/dao';
import { SDKClient } from 'akita-sdk/types';
import { sendPrepared } from 'akita-sdk';
import { newWallet, UpdateAkitaDAOPluginSDK, WalletFactorySDK, WalletSDK, CallerType } from 'akita-sdk/wallet';
import algosdk from 'algosdk';
import { AbstractedAccountFactory } from '../../../artifacts/arc58/account/AbstractedAccountClient';
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
  let deployer: Address & TransactionSignerAccount;
  let user: Address & TransactionSignerAccount;
  let akitaUniverse: AkitaUniverse;
  let dispenser: algosdk.Address & TransactionSignerAccount & { account: SigningAccount };
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

    await algorand.account.ensureFunded(deployer.addr, dispenser, (2000).algo());
    await algorand.account.ensureFunded(user.addr, dispenser, (500).algo());

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
  });
});
