import { algo, microAlgo } from '@algorandfoundation/algokit-utils';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { sendPrepared } from 'akita-sdk';
import { ProposalActionEnum } from 'akita-sdk/dao';
import { CallerType, type WalletSDK } from 'akita-sdk/wallet';
import algosdk from 'algosdk';
import { beforeAll, describe, expect, test } from 'vitest';
import { daoWalletSunsetSteps, sendDaoWalletSunset, simulateDaoWalletSunset, walletAssetCloses, walletFactorySunsetCalls } from '../../scripts/lib/sunset-steps';
import { bootstrapDaoTestContext, proposeAndExecute, type DaoTestContext } from '../arc58/dao/tests/utils';
import { SunsetContractFactory } from '../artifacts/sunset/SunsetContractClient';
import { WalletFactorySunsetContractClient, WalletFactorySunsetContractFactory } from '../artifacts/sunset/WalletFactorySunsetContractClient';

const fixture = algorandFixture();

/**
 * The sunset scripts' wallet-factory steps (scripts/lib/sunset-steps.ts) on a real tree universe:
 *   ACCT-2: SunsetContract is staged as the factory child and the factory approval is swapped in the
 *           same execution group, so no stranger can push SunsetContract into an automatic-update wallet.
 *   ACCT-1: the DAO wallet runs the AVM 13 wallet program; the sunset push must not be a downgrade.
 */
describe('wallet factory sunset staging (ACCT-2) and the DAO wallet push (ACCT-1)', () => {
  let context: DaoTestContext;
  let userWallet: WalletSDK;
  let compiled: {
    sunset: { approvalProgram: Uint8Array; clearStateProgram: Uint8Array };
    walletFactorySunset: { approvalProgram: Uint8Array; clearStateProgram: Uint8Array };
  };

  beforeAll(async () => {
    context = await bootstrapDaoTestContext({ fixture, useFullSetup: true, fundAmount: 500 });
    const { sender, signer, walletFactory } = context;
    const { algorand } = fixture.context;

    userWallet = await walletFactory!.new({ sender, signer, nickname: 'auto_updates' });
    expect(await userWallet.client.state.global.factoryUpdateSettings()).toEqual({ allowed: true, automatic: true });

    const deployTimeParams = { SUNSET_CALLER: algosdk.decodeAddress(sender).publicKey };
    const sunset = await new SunsetContractFactory({ algorand, defaultSender: sender, defaultSigner: signer }).appFactory.compile({ deployTimeParams });
    const walletFactorySunset = await new WalletFactorySunsetContractFactory({ algorand, defaultSender: sender, defaultSigner: signer }).appFactory.compile({ deployTimeParams });
    compiled = { sunset, walletFactorySunset };
    expect(sunset.approvalProgram[0]).toBe(13);
  });

  const approvalOf = async (appId: bigint) => (await fixture.context.algorand.app.getById(appId)).approvalProgram;

  test('a stranger cannot convert an automatic-update wallet at any point of the factory sunset', async () => {
    const { dao, sender, signer, walletFactory, daoUpdatePluginSdk } = context;
    const { algorand } = fixture.context;
    const factoryId = walletFactory!.appId;
    const stranger = await fixture.context.generateAccount({ initialFunds: algo(10) });
    const userWalletProgram = await approvalOf(userWallet.appId);

    const strangerConverts = async () => {
      try {
        await new WalletFactorySunsetContractClient({ algorand, appId: factoryId }).send.updateWallet({
          sender: stranger.addr, signer: stranger.signer, args: { wallet: userWallet.appId },
          maxFee: microAlgo(20_000), coverAppCallInnerTransactionFees: true, populateAppCallResources: true,
        });
      } catch {
        // the factory refused (either program)
      }
      return Buffer.compare(Buffer.from(await approvalOf(userWallet.appId)), Buffer.from(userWalletProgram)) !== 0;
    };

    await algorand.account.ensureFunded(daoUpdatePluginSdk!.client.appAddress, sender, algo(2));
    await dao.wallet.client.appClient.fundAppAccount({ amount: algo(3) });
    // usePlugin simulates as the DAO wallet admin (the DAO app) before the proposal authorizes the sender
    await algorand.account.ensureFunded(dao.client.appAddress, sender, algo(5));

    const execution = await dao.wallet.build.usePlugin({
      sender,
      signer,
      lease: `sun_factory_${Date.now() % 1_000_000}`,
      windowSize: 2000n,
      callerType: CallerType.Global,
      calls: walletFactorySunsetCalls(daoUpdatePluginSdk!, {
        sender, signer, walletFactory: factoryId, version: 'sunset', ...compiled,
      }),
    });
    await proposeAndExecute(dao, [{
      type: ProposalActionEnum.UpgradeApp,
      app: factoryId,
      executionKey: execution.lease,
      groups: execution.ids,
      firstValid: execution.firstValid,
      lastValid: execution.lastValid,
    }]);
    await sendPrepared(execution.windows[0], algorand.client.algod);

    // the staged child and the factory swap landed together
    expect(Buffer.from(await approvalOf(factoryId))).toEqual(Buffer.from(compiled.walletFactorySunset.approvalProgram));
    expect(Buffer.from(await algorand.app.getBoxValue(factoryId, 'bc'))).toEqual(Buffer.from(compiled.sunset.approvalProgram));

    expect(await strangerConverts()).toBe(false);
    expect(await userWallet.client.state.global.version()).not.toBe('sunset');
  });

  test('the sunset factory pushes SunsetContract into the AVM 13 DAO wallet; the sequence is simulated first', async () => {
    const { dao, sender, signer, walletFactory, escrowFactory } = context;
    const { algorand } = fixture.context;
    const daoWallet = dao.wallet.client.appId;
    expect((await approvalOf(daoWallet))[0]).toBe(13);

    const factory = new WalletFactorySunsetContractClient({ algorand, appId: walletFactory!.appId, defaultSender: sender, defaultSigner: signer });
    const walletAddress = algosdk.getApplicationAddress(daoWallet).toString();
    const closeTo = (await fixture.context.generateAccount({ initialFunds: algo(1) })).addr.toString();

    const steps = daoWalletSunsetSteps({
      sender, signer, wallet: daoWallet, escrowFactory: escrowFactory!, closeTo,
      inventory: {
        heldAssets: await walletAssetCloses(algorand, walletAddress, sender),
        managedAssets: [],
        escrowIds: [],
        boxes: (await algorand.app.getBoxNames(daoWallet)).map((b) => b.nameRaw),
      },
    });
    // The DAO wallet created ASAs that other accounts hold, so its account can never close: the full
    // sequence is refused in simulation, before anything is sent.
    expect((await algorand.client.algod.accountInformation(walletAddress).do()).createdAssets?.length).toBeGreaterThan(0);
    await expect(simulateDaoWalletSunset(factory, steps)).rejects.toThrow(/nothing was sent to the DAO wallet/);
    expect((await approvalOf(daoWallet))[0]).toBe(13);

    // Without the final delete, the push and the cleanup steps simulate and run on the AVM 13 wallet.
    const withoutDelete = steps.slice(0, -1);
    expect(await simulateDaoWalletSunset(factory, withoutDelete)).toBe(Math.min(withoutDelete.length, 16));
    await sendDaoWalletSunset(factory, withoutDelete.slice(0, 1), () => {});
    expect(Buffer.from(await approvalOf(daoWallet))).toEqual(Buffer.from(compiled.sunset.approvalProgram));
    await sendDaoWalletSunset(factory, withoutDelete.slice(1), () => {});
    expect(await algorand.app.getBoxNames(daoWallet)).toEqual([]);
  });
});
