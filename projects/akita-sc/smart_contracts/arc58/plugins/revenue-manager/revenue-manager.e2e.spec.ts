import * as algokit from '@algorandfoundation/algokit-utils';
import { ABIAddressType, ABIStringType, ABITupleType, ABIUintType } from '@algorandfoundation/algokit-utils/abi';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { SigningAccount, TransactionSignerAccount, Address } from '@algorandfoundation/algokit-utils/types/account';
import { beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { newWallet, RevenueManagerPluginSDK, WalletSDK, CallerType } from 'akita-sdk/wallet';
import algosdk from 'algosdk';
import { AkitaUniverse, buildAkitaUniverse } from '../../../../tests/fixtures/dao';

algokit.Config.configure({ populateAppCallResources: true });

const fixture = algorandFixture();
const BOX_BASE_MBR = 2_500n;
const BOX_BYTE_MBR = 400n;

describe('RevenueManager plugin contract', () => {
  let deployer: Address & TransactionSignerAccount;
  let user: Address & TransactionSignerAccount;
  let akitaUniverse: AkitaUniverse;
  let dispenser: algosdk.Address & TransactionSignerAccount & { account: SigningAccount };
  let algorand: import('@algorandfoundation/algokit-utils').AlgorandClient;
  let wallet: WalletSDK;
  let revenueManagerPluginSdk: RevenueManagerPluginSDK;
  let testAssetId: bigint;
  let unmanagedAssetId: bigint;
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

    // The metadata is identity-bound to an existing ARC58 named escrow.
    await installRevenueEscrowPlugin(revenueEscrow);

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

    const assetCreate = await algorand.send.assetCreate({
      sender: deployer.addr,
      signer: deployer.signer,
      total: 1_000n,
      decimals: 0,
      assetName: 'Revenue Manager Plugin Test',
      unitName: 'RMPT',
    });
    testAssetId = BigInt(assetCreate.confirmation.assetId!);

    const unmanagedAssetCreate = await algorand.send.assetCreate({
      sender: deployer.addr,
      signer: deployer.signer,
      total: 1_000n,
      decimals: 0,
      assetName: 'Unmanaged Revenue Test Asset',
      unitName: 'URTA',
    });
    unmanagedAssetId = BigInt(unmanagedAssetCreate.confirmation.assetId!);
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

    test('rejects unauthorized, duplicate, and malformed receive-escrow configurations atomically', async () => {
      const unauthorizedEscrow = 'rev_unauthorized';
      await installRevenueEscrowPlugin(unauthorizedEscrow);

      await expect(revenueManagerPluginSdk.client.send.newReceiveEscrow({
        sender: user.addr,
        signer: user.signer,
        args: {
          wallet: wallet.appId,
          rekeyBack: false,
          escrow: unauthorizedEscrow,
          source: user.addr.toString(),
          allocatable: true,
          optinAllowed: true,
          splits: [[[wallet.appId, ''], 30, 0n]],
        },
      })).rejects.toThrow();
      expect(await getReceiveEscrow(unauthorizedEscrow)).toBeUndefined();

      await expect(wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          revenueManagerPluginSdk.newReceiveEscrow({
            escrow: revenueEscrow,
            source: deployer.addr.toString(),
            allocatable: false,
            optinAllowed: false,
            splits: [[[wallet.appId, ''], 30n, 0n]],
          }),
        ],
      })).rejects.toThrow();
      expect(await getReceiveEscrow(revenueEscrow)).toMatchObject({
        source: user.addr.toString(),
        allocatable: true,
        optinAllowed: true,
      });

      const malformedEscrow = 'rev_malformed';
      await installRevenueEscrowPlugin(malformedEscrow);
      const configure = (splits: [[bigint, string], bigint, bigint][]) => wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          revenueManagerPluginSdk.newReceiveEscrow({
            escrow: malformedEscrow,
            source: user.addr.toString(),
            allocatable: true,
            optinAllowed: true,
            splits,
          }),
        ],
      });

      await expect(configure([])).rejects.toThrow();
      await expect(configure([[[wallet.appId, ''], 99n, 1n]])).rejects.toThrow();
      await expect(configure([[[wallet.appId, ''], 10n, 1n]])).rejects.toThrow();
      await expect(configure([[[wallet.appId, 'missing_receiver'], 30n, 0n]])).rejects.toThrow();
      await expect(wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          revenueManagerPluginSdk.newReceiveEscrowWithRef({
            escrow: malformedEscrow,
            source: user.addr.toString(),
            allocatable: true,
            optinAllowed: true,
            splitRef: { app: 0n, key: new Uint8Array() },
          }),
        ],
      })).rejects.toThrow();

      expect(await getReceiveEscrow(malformedEscrow)).toBeUndefined();
      await expect(revenueManagerPluginSdk.client.state.box.splits.value({
        wallet: wallet.appId,
        escrow: malformedEscrow,
      })).rejects.toThrow('box not found');
      await expect(revenueManagerPluginSdk.client.state.box.splitRefs.value({
        wallet: wallet.appId,
        escrow: malformedEscrow,
      })).rejects.toThrow('box not found');
    });

    test('creates receive escrow metadata with a split reference', async () => {
      const escrow = 'rev_ref';
      await installRevenueEscrowPlugin(escrow);

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

      await expect(wallet.usePlugin({
        callerType: CallerType.Global,
        escrow,
        calls: [revenueManagerPluginSdk.optIn({ assets: [testAssetId] })],
      })).rejects.toThrow();
      await expect(wallet.usePlugin({
        callerType: CallerType.Global,
        escrow,
        calls: [revenueManagerPluginSdk.startEscrowDisbursement({})],
      })).rejects.toThrow();
      expect(await getReceiveEscrow(escrow)).toMatchObject({
        optinCount: 0n,
        phase: 0,
        allocationCounter: 0n,
      });
    });

    test('migrates receive escrow metadata exactly and cannot overwrite it', async () => {
      const escrow = 'rev_migrated';
      await installRevenueEscrowPlugin(escrow);
      const receiveEscrow = {
        source: user.addr.toString(),
        allocatable: true,
        optinAllowed: true,
        optinCount: 0n,
        phase: 0,
        allocationCounter: 0n,
        lastDisbursement: 1_700_000_000n,
        creationDate: 1_600_000_000n,
      };
      const splitRef = {
        app: akitaUniverse.dao.appId,
        key: new Uint8Array(Buffer.from('revenue_splits')),
      };
      const migrationSdk = revenueManagerPluginSdk as RevenueManagerPluginSDK & {
        migrateReceiveEscrow(args: {
          escrow: string;
          receiveEscrow: typeof receiveEscrow;
          assets: bigint[];
          splits: [];
          splitRef: typeof splitRef;
          useSplitRef: boolean;
        }): ReturnType<RevenueManagerPluginSDK['newReceiveEscrow']>;
      };
      const migrate = () => wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          migrationSdk.migrateReceiveEscrow({
            escrow,
            receiveEscrow,
            assets: [],
            splits: [],
            splitRef,
            useSplitRef: true,
          }),
        ],
      });

      await migrate();

      expect(await getReceiveEscrow(escrow)).toEqual(receiveEscrow);
      expect(await revenueManagerPluginSdk.client.state.box.splitRefs.value({
        wallet: wallet.appId,
        escrow,
      })).toEqual(splitRef);
      await expect(migrate()).rejects.toThrow();

      const invalidEscrow = 'rev_bad_migration';
      await installRevenueEscrowPlugin(invalidEscrow);
      await expect(wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          migrationSdk.migrateReceiveEscrow({
            escrow: invalidEscrow,
            receiveEscrow: { ...receiveEscrow, optinCount: 1n },
            assets: [],
            splits: [],
            splitRef,
            useSplitRef: true,
          }),
        ],
      })).rejects.toThrow();
      expect(await getReceiveEscrow(invalidEscrow)).toBeUndefined();
      await expect(revenueManagerPluginSdk.client.state.box.splitRefs.value({
        wallet: wallet.appId,
        escrow: invalidEscrow,
      })).rejects.toThrow('box not found');
    });

    test('opts the receive escrow into assets and tracks opt-in count', async () => {
      await expect(wallet.usePlugin({
        callerType: CallerType.Global,
        escrow: revenueEscrow,
        calls: [revenueManagerPluginSdk.optIn({ assets: [] })],
      })).rejects.toThrow();

      await expect(wallet.usePlugin({
        sender: deployer.addr,
        signer: deployer.signer,
        callerType: CallerType.Global,
        escrow: revenueEscrow,
        calls: [
          revenueManagerPluginSdk.optIn({
            sender: deployer.addr,
            signer: deployer.signer,
            assets: [testAssetId],
          }),
        ],
      })).rejects.toThrow();
      expect((await getReceiveEscrow(revenueEscrow))?.optinCount).toBe(0n);

      const pluginBefore = await algorand.account.getInformation(revenueManagerPluginSdk.client.appAddress);
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
      const escrowAddress = escrowInfo.address.toString();
      const accountInfo = await algorand.account.getInformation(escrowAddress);
      const pluginAfter = await algorand.account.getInformation(revenueManagerPluginSdk.client.appAddress);
      const managedBoxName = getManagedAssetBoxName(revenueEscrow, testAssetId);

      expect(accountInfo.assets?.some((asset) => asset.assetId === testAssetId)).toBe(true);
      expect((await getReceiveEscrow(revenueEscrow))?.optinCount).toBe(1n);
      await expect(getBox(managedBoxName)).resolves.toBeDefined();
      expect(pluginAfter.minBalance.microAlgos - pluginBefore.minBalance.microAlgos).toBe(boxMbr(managedBoxName));

      await expect(wallet.usePlugin({
        callerType: CallerType.Global,
        escrow: revenueEscrow,
        calls: [revenueManagerPluginSdk.optIn({ assets: [testAssetId] })],
      })).rejects.toThrow();
      expect((await getReceiveEscrow(revenueEscrow))?.optinCount).toBe(1n);
    });

    test('walks an escrow disbursement through allocation and finalization', async () => {
      await installRevenueEscrowPlugin(disbursementEscrow);
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

      await wallet.usePlugin({
        callerType: CallerType.Global,
        escrow: disbursementEscrow,
        calls: [
          revenueManagerPluginSdk.optIn({
            assets: [testAssetId],
          }),
        ],
      });

      // Opt into a second ASA through the generic plugin. It is a real holding
      // but deliberately is not registered in RevenueManager's managed set.
      await wallet.addPlugin({
        client: akitaUniverse.optInPlugin,
        callerType: CallerType.Global,
        escrow: disbursementEscrow,
        sender: user.addr,
        signer: user.signer,
        methods: [{ name: akitaUniverse.optInPlugin.optIn(), cooldown: 0n }],
      });
      await wallet.usePlugin({
        callerType: CallerType.Global,
        escrow: disbursementEscrow,
        calls: [akitaUniverse.optInPlugin.optIn({ assets: [unmanagedAssetId] })],
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
      const escrowAddress = escrowInfo.address.toString();
      const recipientAddress = (await wallet.client.state.global.controlledAddress())!;

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

      const escrowFunded = await algorand.account.getInformation(escrowAddress);
      const recipientBefore = await algorand.account.getInformation(recipientAddress);
      const recipientAssetBefore = recipientBefore.assets?.find((asset) => asset.assetId === testAssetId)?.amount ?? 0n;
      const distributableAlgo = escrowFunded.balance.microAlgos - escrowFunded.minBalance.microAlgos;

      await wallet.usePlugin({
        callerType: CallerType.Global,
        escrow: disbursementEscrow,
        calls: [
          revenueManagerPluginSdk.startEscrowDisbursement({}),
        ],
      });
      expect((await getReceiveEscrow(disbursementEscrow))?.phase).toBe(20);

      await expect(wallet.usePlugin({
        callerType: CallerType.Global,
        escrow: disbursementEscrow,
        calls: [revenueManagerPluginSdk.processEscrowAllocation({ ids: [] })],
      })).rejects.toThrow();
      await expect(wallet.usePlugin({
        callerType: CallerType.Global,
        escrow: disbursementEscrow,
        calls: [revenueManagerPluginSdk.processEscrowAllocation({ ids: [0n, unmanagedAssetId] })],
      })).rejects.toThrow();
      await expect(wallet.usePlugin({
        callerType: CallerType.Global,
        escrow: disbursementEscrow,
        calls: [revenueManagerPluginSdk.processEscrowAllocation({ ids: [0n, testAssetId, testAssetId + 1n] })],
      })).rejects.toThrow();
      expect((await getReceiveEscrow(disbursementEscrow))?.allocationCounter).toBe(0n);
      const escrowAfterRejectedAllocations = await algorand.account.getInformation(escrowAddress);
      const recipientAfterRejectedAllocations = await algorand.account.getInformation(recipientAddress);
      expect(escrowAfterRejectedAllocations.balance.microAlgos).toBe(escrowFunded.balance.microAlgos);
      expect(recipientAfterRejectedAllocations.balance.microAlgos).toBe(recipientBefore.balance.microAlgos);

      const pluginBeforeAllocation = await algorand.account.getInformation(revenueManagerPluginSdk.client.appAddress);

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
      const escrowAllocated = await algorand.account.getInformation(escrowAddress);
      const recipientAfter = await algorand.account.getInformation(recipientAddress);
      const recipientAssetAfter = recipientAfter.assets?.find((asset) => asset.assetId === testAssetId)?.amount ?? 0n;
      const pluginAfterAllocation = await algorand.account.getInformation(revenueManagerPluginSdk.client.appAddress);
      const algoTrackingBox = getReceiveAssetBoxName(escrowAddress, 0n);
      const asaTrackingBox = getReceiveAssetBoxName(escrowAddress, testAssetId);
      expect(allocatedState?.phase).toBe(30);
      expect(allocatedState?.allocationCounter).toBe(2n);
      expect(recipientAfter.balance.microAlgos - recipientBefore.balance.microAlgos).toBe(distributableAlgo);
      expect(recipientAssetAfter - recipientAssetBefore).toBe(10n);
      expect(escrowAllocated.balance.microAlgos).toBe(escrowAllocated.minBalance.microAlgos);
      expect(escrowAllocated.assets?.find((asset) => asset.assetId === testAssetId)?.amount).toBe(0n);
      expect(pluginAfterAllocation.minBalance.microAlgos - pluginBeforeAllocation.minBalance.microAlgos).toBe(
        boxMbr(algoTrackingBox) + boxMbr(asaTrackingBox),
      );
      await expect(getReceiveAsset(escrowAddress, 0n)).resolves.toBeDefined();
      await expect(getReceiveAsset(escrowAddress, testAssetId)).resolves.toBeDefined();

      await expect(wallet.usePlugin({
        callerType: CallerType.Global,
        escrow: disbursementEscrow,
        calls: [revenueManagerPluginSdk.finalizeEscrowDisbursement({ ids: [testAssetId + 1n] })],
      })).rejects.toThrow();
      expect((await getReceiveEscrow(disbursementEscrow))?.allocationCounter).toBe(2n);

      await wallet.usePlugin({
        callerType: CallerType.Global,
        escrow: disbursementEscrow,
        calls: [
          revenueManagerPluginSdk.finalizeEscrowDisbursement({
            ids: [0n],
          }),
        ],
      });

      const partiallyFinalizedState = await getReceiveEscrow(disbursementEscrow);
      const pluginPartiallyFinalized = await algorand.account.getInformation(revenueManagerPluginSdk.client.appAddress);
      expect(partiallyFinalizedState?.phase).toBe(30);
      expect(partiallyFinalizedState?.allocationCounter).toBe(1n);
      expect(pluginAfterAllocation.minBalance.microAlgos - pluginPartiallyFinalized.minBalance.microAlgos).toBe(boxMbr(algoTrackingBox));
      await expect(getReceiveAsset(escrowAddress, 0n)).rejects.toThrow();
      await expect(getReceiveAsset(escrowAddress, testAssetId)).resolves.toBeDefined();

      await wallet.usePlugin({
        callerType: CallerType.Global,
        escrow: disbursementEscrow,
        calls: [revenueManagerPluginSdk.finalizeEscrowDisbursement({ ids: [testAssetId] })],
      });

      const finalizedState = await getReceiveEscrow(disbursementEscrow);
      const pluginFinalized = await algorand.account.getInformation(revenueManagerPluginSdk.client.appAddress);
      expect(finalizedState?.phase).toBe(0);
      expect(finalizedState?.allocationCounter).toBe(0n);
      expect(pluginFinalized.minBalance.microAlgos).toBe(pluginBeforeAllocation.minBalance.microAlgos);
      await expect(getReceiveAsset(escrowAddress, testAssetId)).rejects.toThrow();

      await expect(wallet.usePlugin({
        callerType: CallerType.Global,
        escrow: disbursementEscrow,
        calls: [revenueManagerPluginSdk.finalizeEscrowDisbursement({ ids: [testAssetId] })],
      })).rejects.toThrow();
      await expect(wallet.usePlugin({
        callerType: CallerType.Global,
        escrow: disbursementEscrow,
        calls: [revenueManagerPluginSdk.startEscrowDisbursement({})],
      })).rejects.toThrow();
    });

    test('sends to a pre-opted named split receiver and restores both escrow auth addresses', async () => {
      const sourceEscrow = 'rev_named_source';
      const receiverEscrow = 'rev_named_receiver';
      const amount = 17n;

      await installRevenueEscrowPlugin(sourceEscrow);
      await wallet.addPlugin({
        client: akitaUniverse.optInPlugin,
        callerType: CallerType.Global,
        escrow: receiverEscrow,
        sender: user.addr,
        signer: user.signer,
      });
      await wallet.usePlugin({
        callerType: CallerType.Global,
        escrow: receiverEscrow,
        calls: [akitaUniverse.optInPlugin.optIn({ assets: [testAssetId] })],
      });

      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          revenueManagerPluginSdk.newReceiveEscrow({
            escrow: sourceEscrow,
            source: user.addr.toString(),
            allocatable: true,
            optinAllowed: true,
            splits: [
              [[wallet.appId, receiverEscrow], 30n, 0n],
            ],
          }),
        ],
      });
      await wallet.usePlugin({
        callerType: CallerType.Global,
        escrow: sourceEscrow,
        calls: [revenueManagerPluginSdk.optIn({ assets: [testAssetId] })],
      });

      const sourceAddress = (await wallet.getEscrow(sourceEscrow)).address.toString();
      const receiverAddress = (await wallet.getEscrow(receiverEscrow)).address.toString();
      await algorand.send.assetTransfer({
        sender: deployer.addr,
        signer: deployer.signer,
        receiver: sourceAddress,
        assetId: testAssetId,
        amount,
      });

      const sourceBefore = await algorand.account.getInformation(sourceAddress);
      const receiverBefore = await algorand.account.getInformation(receiverAddress);
      const pluginBefore = await algorand.account.getInformation(revenueManagerPluginSdk.client.appAddress);
      const expectedAuthAddress = wallet.client.appAddress.toString();
      expect(sourceBefore.assets?.find((asset) => asset.assetId === testAssetId)?.amount).toBe(amount);
      expect(receiverBefore.assets?.some((asset) => asset.assetId === testAssetId) ?? false).toBe(true);
      expect(sourceBefore.authAddr?.toString()).toBe(expectedAuthAddress);
      expect(receiverBefore.authAddr?.toString()).toBe(expectedAuthAddress);

      await wallet.usePlugin({
        callerType: CallerType.Global,
        escrow: sourceEscrow,
        calls: [revenueManagerPluginSdk.startEscrowDisbursement({})],
      });
      await wallet.usePlugin({
        callerType: CallerType.Global,
        escrow: sourceEscrow,
        calls: [revenueManagerPluginSdk.processEscrowAllocation({ ids: [testAssetId] })],
      });

      const sourceAfter = await algorand.account.getInformation(sourceAddress);
      const receiverAfter = await algorand.account.getInformation(receiverAddress);
      const pluginAfter = await algorand.account.getInformation(revenueManagerPluginSdk.client.appAddress);
      expect(sourceAfter.assets?.find((asset) => asset.assetId === testAssetId)?.amount).toBe(0n);
      expect(receiverAfter.assets?.find((asset) => asset.assetId === testAssetId)?.amount).toBe(amount);
      expect(sourceAfter.balance.microAlgos).toBe(sourceBefore.balance.microAlgos);
      expect(receiverAfter.balance.microAlgos).toBe(receiverBefore.balance.microAlgos);
      expect(receiverAfter.minBalance.microAlgos).toBe(receiverBefore.minBalance.microAlgos);
      expect(pluginAfter.balance.microAlgos).toBe(pluginBefore.balance.microAlgos);
      expect(sourceAfter.authAddr?.toString()).toBe(sourceBefore.authAddr?.toString());
      expect(receiverAfter.authAddr?.toString()).toBe(receiverBefore.authAddr?.toString());
    });

    test('percentage-only splits consume the exact ALGO balance without rounding dust', async () => {
      const escrow = 'rev_rounding';
      await installRevenueEscrowPlugin(escrow);
      // Earlier tests intentionally retain metadata boxes on this shared app.
      await revenueManagerPluginSdk.client.appClient.fundAppAccount({ amount: algokit.microAlgo(100_000) });
      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          revenueManagerPluginSdk.newReceiveEscrow({
            escrow,
            source: user.addr.toString(),
            allocatable: true,
            optinAllowed: false,
            splits: [
              [[wallet.appId, ''], 20n, 33_333n],
              [[wallet.appId, ''], 20n, 33_333n],
              [[wallet.appId, ''], 20n, 33_334n],
            ],
          }),
        ],
      });

      const escrowAddress = (await wallet.getEscrow(escrow)).address.toString();
      const recipientAddress = (await wallet.client.state.global.controlledAddress())!;
      await algorand.send.payment({
        sender: user.addr,
        signer: user.signer,
        receiver: escrowAddress,
        amount: algokit.microAlgo(1_000_003),
      });

      const escrowBefore = await algorand.account.getInformation(escrowAddress);
      const recipientBefore = await algorand.account.getInformation(recipientAddress);
      const expected = escrowBefore.balance.microAlgos - escrowBefore.minBalance.microAlgos;

      await wallet.usePlugin({
        callerType: CallerType.Global,
        escrow,
        calls: [revenueManagerPluginSdk.startEscrowDisbursement({})],
      });
      await wallet.usePlugin({
        callerType: CallerType.Global,
        escrow,
        calls: [revenueManagerPluginSdk.processEscrowAllocation({ ids: [0n] })],
      });

      const escrowAfter = await algorand.account.getInformation(escrowAddress);
      const recipientAfter = await algorand.account.getInformation(recipientAddress);
      expect(escrowAfter.balance.microAlgos).toBe(escrowAfter.minBalance.microAlgos);
      expect(recipientAfter.balance.microAlgos - recipientBefore.balance.microAlgos).toBe(expected);
      expect((await getReceiveEscrow(escrow))?.phase).toBe(30);

      await wallet.usePlugin({
        callerType: CallerType.Global,
        escrow,
        calls: [revenueManagerPluginSdk.finalizeEscrowDisbursement({ ids: [0n] })],
      });
      expect(await getReceiveEscrow(escrow)).toMatchObject({ phase: 0, allocationCounter: 0n });
    });
  });

  const getReceiveEscrow = async (escrow: string) => {
    try {
      return await revenueManagerPluginSdk.client.state.box.escrows.value({
        wallet: wallet.appId,
        escrow,
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes('box not found')) return undefined;
      throw error;
    }
  };

  const getReceiveAsset = async (escrowAddress: string, asset: bigint) => {
    return getBox(getReceiveAssetBoxName(escrowAddress, asset));
  };

  const getReceiveAssetBoxName = (escrowAddress: string, asset: bigint) => {
    const key = new ABITupleType([new ABIAddressType(), new ABIUintType(64)]).encode([escrowAddress, asset]);
    return new Uint8Array([...Buffer.from('a'), ...key]);
  };

  const getManagedAssetBoxName = (escrow: string, asset: bigint) => {
    const key = new ABITupleType([new ABIUintType(64), new ABIStringType(), new ABIUintType(64)]).encode([
      wallet.appId,
      escrow,
      asset,
    ]);
    return new Uint8Array([...Buffer.from('m'), ...key]);
  };

  const getBox = async (boxName: Uint8Array) => {
    return algorand.client.algod.applicationBoxByName(Number(revenueManagerPluginSdk.appId), boxName);
  };

  const boxMbr = (boxName: Uint8Array, valueLength = 0n) => {
    return BOX_BASE_MBR + (BOX_BYTE_MBR * (BigInt(boxName.length) + valueLength));
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
