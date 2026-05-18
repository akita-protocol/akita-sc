import * as algokit from '@algorandfoundation/algokit-utils';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { SigningAccount, TransactionSignerAccount, Address } from '@algorandfoundation/algokit-utils/types/account';
import { beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { newWallet, RevenueManagerPluginSDK, WalletSDK, CallerType } from 'akita-sdk/wallet';
import algosdk from 'algosdk';
import { AkitaUniverse, buildAkitaUniverse } from '../../../../tests/fixtures/dao';

algokit.Config.configure({ populateAppCallResources: true });

const fixture = algorandFixture();

describe('RevenueManager plugin contract', () => {
  let deployer: Address & TransactionSignerAccount;
  let user: Address & TransactionSignerAccount;
  let akitaUniverse: AkitaUniverse;
  let dispenser: algosdk.Address & TransactionSignerAccount & { account: SigningAccount };
  let algorand: import('@algorandfoundation/algokit-utils').AlgorandClient;
  let wallet: WalletSDK;
  let revenueManagerPluginSdk: RevenueManagerPluginSDK;
  let testAssetId: bigint;
  const revenueEscrow = 'rev_test';
  const disbursementEscrow = 'rev_disburse';

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

    // Get plugin SDK and add it to the wallet once
    revenueManagerPluginSdk = akitaUniverse.revenueManagerPlugin;
    const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n });
    await wallet.client.appClient.fundAppAccount({ amount: algokit.microAlgo(mbr.plugins + 100_000_000n) });
    await wallet.addPlugin({ client: akitaUniverse.optInPlugin, callerType: CallerType.Global, sender: user.addr, signer: user.signer });
    await wallet.addPlugin({ client: revenueManagerPluginSdk, callerType: CallerType.Global, sender: user.addr, signer: user.signer });

    await wallet.usePlugin({
      callerType: CallerType.Global,
      calls: [
        revenueManagerPluginSdk.newReceiveEscrow({
          escrow: revenueEscrow,
          source: user.addr.toString(),
          allocatable: true,
          optinAllowed: true,
          splits: [
            [[wallet.appId, ''], 30n, 0n],
          ],
        }),
      ],
    });

    await installRevenueEscrowPlugin(revenueEscrow);

    const assetCreate = await algorand.send.assetCreate({
      sender: deployer.addr,
      signer: deployer.signer,
      total: 1_000n,
      decimals: 0,
      assetName: 'Revenue Manager Plugin Test',
      unitName: 'RMPT',
    });
    testAssetId = BigInt(assetCreate.confirmation.assetId!);
  });

  beforeEach(fixture.newScope);

  describe('RevenueManagerPlugin SDK', () => {
    test('plugin can be added to wallet', async () => {
      // Verify the plugin was successfully added
      const plugins = await wallet.getPlugins();
      expect(plugins.size).toBeGreaterThanOrEqual(2);
      expect(revenueManagerPluginSdk.appId).toBeGreaterThan(0n);
    });

    test('creates receive escrow metadata with direct splits', async () => {
      const state = await getReceiveEscrow(revenueEscrow);

      expect(state?.source).toBe(user.addr.toString());
      expect(state?.allocatable).toBe(true);
      expect(state?.optinAllowed).toBe(true);
      expect(state?.phase).toBe(0);

      const splits = await revenueManagerPluginSdk.client.state.box.splits.value({
        wallet: wallet.appId,
        escrow: revenueEscrow,
      });
      expect(splits).toEqual([[[wallet.appId, ''], 30, 0n]]);
    });

    test('creates receive escrow metadata with a split reference', async () => {
      const escrow = 'rev_ref';

      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          revenueManagerPluginSdk.newReceiveEscrowWithRef({
            escrow,
            source: user.addr.toString(),
            allocatable: false,
            optinAllowed: false,
            splitRef: {
              app: akitaUniverse.dao.appId,
              key: new Uint8Array(Buffer.from('revenue_splits')),
            },
          }),
        ],
      });

      const state = await getReceiveEscrow(escrow);
      expect(state?.source).toBe(user.addr.toString());
      expect(state?.allocatable).toBe(false);
      expect(state?.optinAllowed).toBe(false);

      const splitRef = await revenueManagerPluginSdk.client.state.box.splitRefs.value({
        wallet: wallet.appId,
        escrow,
      });
      expect(splitRef?.app).toBe(akitaUniverse.dao.appId);
      expect(Buffer.from(splitRef?.key ?? []).toString()).toBe('revenue_splits');
    });

    test('opts the receive escrow into assets and tracks opt-in count', async () => {
      await wallet.usePlugin({
        callerType: CallerType.Global,
        escrow: revenueEscrow,
        calls: [
          revenueManagerPluginSdk.optIn({
            assets: [testAssetId],
          }),
        ],
      });

      const escrowInfo = await wallet.getEscrow(revenueEscrow);
      const escrowAddress = algosdk.getApplicationAddress(Number(escrowInfo.id));
      const accountInfo = await algorand.account.getInformation(escrowAddress);

      expect(accountInfo.assets?.some((asset) => asset.assetId === testAssetId)).toBe(true);
      expect((await getReceiveEscrow(revenueEscrow))?.optinCount).toBe(1n);
    });

    test('walks an escrow disbursement through allocation and finalization', async () => {
      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          revenueManagerPluginSdk.newReceiveEscrow({
            escrow: disbursementEscrow,
            source: user.addr.toString(),
            allocatable: true,
            optinAllowed: true,
            splits: [
              [[wallet.appId, ''], 30n, 0n],
            ],
          }),
        ],
      });
      await installRevenueEscrowPlugin(disbursementEscrow);

      await wallet.usePlugin({
        callerType: CallerType.Global,
        escrow: disbursementEscrow,
        calls: [
          revenueManagerPluginSdk.optIn({
            assets: [testAssetId],
          }),
        ],
      });
      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          akitaUniverse.optInPlugin.optIn({
            assets: [testAssetId],
          }),
        ],
      });

      const escrowInfo = await wallet.getEscrow(disbursementEscrow);
      const escrowAddress = algosdk.getApplicationAddress(Number(escrowInfo.id));

      await algorand.send.payment({
        sender: user.addr,
        signer: user.signer,
        receiver: escrowAddress,
        amount: algokit.microAlgo(2_000_000),
      });
      await algorand.send.assetTransfer({
        sender: deployer.addr,
        signer: deployer.signer,
        receiver: escrowAddress,
        assetId: testAssetId,
        amount: 10n,
      });

      await wallet.usePlugin({
        callerType: CallerType.Global,
        escrow: disbursementEscrow,
        calls: [
          revenueManagerPluginSdk.startEscrowDisbursement({}),
        ],
      });
      expect((await getReceiveEscrow(disbursementEscrow))?.phase).toBe(20);

      await wallet.usePlugin({
        callerType: CallerType.Global,
        escrow: disbursementEscrow,
        calls: [
          revenueManagerPluginSdk.processEscrowAllocation({
            ids: [0n, testAssetId],
          }),
        ],
      });
      const allocatedState = await getReceiveEscrow(disbursementEscrow);
      expect(allocatedState?.phase).toBe(30);
      expect(allocatedState?.allocationCounter).toBe(2n);
      await expect(revenueManagerPluginSdk.client.state.box.receiveAssets.value({
        escrow: escrowInfo.id,
        asset: testAssetId,
      })).resolves.toBeDefined();

      await wallet.usePlugin({
        callerType: CallerType.Global,
        escrow: disbursementEscrow,
        calls: [
          revenueManagerPluginSdk.finalizeEscrowDisbursement({
            ids: [0n, testAssetId],
          }),
        ],
      });

      const finalizedState = await getReceiveEscrow(disbursementEscrow);
      expect(finalizedState?.phase).toBe(0);
      expect(finalizedState?.allocationCounter).toBe(0n);
      await expect(revenueManagerPluginSdk.client.state.box.receiveAssets.value({
        escrow: escrowInfo.id,
        asset: testAssetId,
      })).rejects.toThrow();
    });
  });

  const getReceiveEscrow = async (escrow: string) => {
    return revenueManagerPluginSdk.client.state.box.escrows.value({
      wallet: wallet.appId,
      escrow,
    });
  };

  const installRevenueEscrowPlugin = async (escrow: string) => {
    await wallet.addPlugin({
      client: revenueManagerPluginSdk,
      callerType: CallerType.Global,
      escrow,
      sender: user.addr,
      signer: user.signer,
      methods: [
        { name: revenueManagerPluginSdk.optIn(), cooldown: 0n },
        { name: revenueManagerPluginSdk.startEscrowDisbursement(), cooldown: 0n },
        { name: revenueManagerPluginSdk.processEscrowAllocation(), cooldown: 0n },
        { name: revenueManagerPluginSdk.finalizeEscrowDisbursement(), cooldown: 0n },
      ],
    });
  };
});
