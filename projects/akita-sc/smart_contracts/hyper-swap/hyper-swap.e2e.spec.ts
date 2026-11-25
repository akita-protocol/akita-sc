import { MetaClient, MetaFactory } from '../artifacts/meta/MetaClient';
import { Config, microAlgo } from '@algorandfoundation/algokit-utils';
import { registerDebugEventHandlers } from '@algorandfoundation/algokit-utils-debug';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { HyperSwapSDK } from 'akita-sdk/hyper-swap';
import {
  HyperSwapPluginSDK,
  newWallet,
  OptInPluginSDK,
  WalletFactorySDK,
  WalletSDK, CallerType } from 'akita-sdk/wallet';
import { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk';
import { deployAbstractedAccountFactory } from '../../tests/fixtures/abstracted-account';
import { deployAkitaDAO } from '../../tests/fixtures/dao';
import { deployEscrowFactory } from '../../tests/fixtures/escrow';
import { deployHyperSwap } from '../../tests/fixtures/hyper-swap';
import { deployHyperSwapPlugin } from '../../tests/fixtures/plugins/hyper-swap';
import { deployOptInPlugin } from '../../tests/fixtures/plugins/optin';

/**
 * HyperSwap Contract Tests
 *
 * Tests the atomic multi-party swap functionality including:
 * - Creating offers with merkle tree proofs
 * - Accepting offers as participants
 * - Escrowing ALGO and ASAs
 * - Disbursing assets to recipients
 * - Cancelling swaps
 * - Withdrawing escrowed assets after cancellation
 * - Cleanup methods for MBR recovery
 */
describe('HyperSwap', () => {
  const localnet = algorandFixture();

  /** The HyperSwap SDK */
  let hyperSwapSdk: HyperSwapSDK;
  let meta: MetaClient;
  /** The HyperSwap Plugin SDK */
  let hyperSwapPluginSdk: HyperSwapPluginSDK;
  /** The wallet factory SDK */
  let walletFactory: WalletFactorySDK;
  /** The opt-in plugin SDK */
  let optInPluginSdk: OptInPluginSDK;
  /** Test asset for ASA escrow tests */
  let testAsset: bigint;
  /** Default sender address */
  let sender: string;
  /** Default signer */
  let signer: any;

  beforeAll(async () => {
    Config.configure({
      debug: true,
    });
    registerDebugEventHandlers();

    await localnet.newScope();
    const {
      algorand,
      context: { testAccount },
    } = localnet;
    sender = testAccount.toString();
    signer = testAccount.signer;

    const dispenser = await algorand.account.dispenserFromEnvironment();
    await algorand.account.ensureFunded(sender, dispenser.addr, (100).algos());

    const registryDAO = await deployAkitaDAO({ fixture: localnet, sender, signer, apps: {} });
    // Compare the shared quote with Meta's current root layout.
    meta = (await algorand.client.getTypedAppFactory(MetaFactory, {
      defaultSender: sender, defaultSigner: signer,
    }).send.create.create({ args: { version: 'test', akitaDao: registryDAO.appId } })).appClient;
    await meta.appClient.fundAppAccount({ amount: microAlgo(100_000) });

    // Deploy core infrastructure
    const dao = await deployAkitaDAO({
      fixture: localnet,
      sender,
      signer,
      apps: { metaMerkles: meta.appId },
    });

    const escrowFactory = await deployEscrowFactory({
      fixture: localnet,
      sender,
      signer,
    });

    walletFactory = await deployAbstractedAccountFactory({
      fixture: localnet,
      sender,
      signer,
      args: {
        akitaDao: dao.appId,
        escrowFactory: escrowFactory.appId,
      },
    });

    // Deploy HyperSwap
    hyperSwapSdk = await deployHyperSwap({
      fixture: localnet,
      sender,
      signer,
      args: {
        version: '0.0.1',
        akitaDao: dao.appId,
      },
    });

    // Fund HyperSwap contract
    await algorand.send.payment({
      sender,
      receiver: hyperSwapSdk.client.appAddress,
      amount: microAlgo(10_000_000),
    });

    // Deploy plugins
    hyperSwapPluginSdk = await deployHyperSwapPlugin({
      fixture: localnet,
      sender,
      signer,
      args: {
        akitaDao: dao.appId,
        version: '0.0.1',
      }
    });

    optInPluginSdk = await deployOptInPlugin({
      fixture: localnet,
      sender,
      signer,
    });

    // Create a test asset
    const assetResult = await algorand.send.assetCreate({
      sender,
      total: 1_000_000_000_000n,
      decimals: 6,
      defaultFrozen: false,
      assetName: 'Test Asset',
      unitName: 'TEST',
    });
    testAsset = BigInt(assetResult.confirmation.assetIndex!);
  });

  // ==================================================================================
  // MBR Tests
  // ==================================================================================

  describe('MBR', () => {
    test('contract and plugin share the exact MBR quote without inner transactions', async () => {
      const mbr = await hyperSwapSdk.mbr();

      expect(mbr).toEqual({
        offers: 79_500n, // offer + refund + pinned-registry boxes
        participants: 34_900n,
        hashes: 34_900n,
        mm: { root: 35_300n, data: 0n },
      });
      expect(mbr.mm.root + mbr.mm.data).toBe(await meta.rootCosts({ args: { name: "123456789" } }));
      for (const client of [hyperSwapSdk.client, hyperSwapPluginSdk.client]) {
        const result = await client.send.mbr({ args: {}, staticFee: microAlgo(1000) });
        expect(result.return).toEqual(mbr);
        expect(result.confirmation.innerTxns ?? []).toHaveLength(0);
      }
    });
  });

  // ==================================================================================
  // Asset Opt-In Tests
  // ==================================================================================

  describe('Asset Opt-In', () => {
    test('optIn() opts contract into asset', async () => {
      const { algorand } = localnet.context;

      // Create a new asset to opt into
      const assetResult = await algorand.send.assetCreate({
        sender,
        total: 1_000_000n,
        decimals: 0,
        assetName: 'Opt-In Test Asset',
        unitName: 'OPT',
      });
      const newAsset = BigInt(assetResult.confirmation.assetIndex!);

      // Opt in the HyperSwap contract
      await hyperSwapSdk.optIn({
        sender,
        signer,
        asset: newAsset,
      });

      // Verify opt-in
      const contractInfo = await algorand.account.getInformation(hyperSwapSdk.client.appAddress);
      const hasAsset = contractInfo.assets?.some((a) => a.assetId === newAsset);
      expect(hasAsset).toBe(true);
    });
  });

  // ==================================================================================
  // Cleanup Tests (Unit Tests)
  // ==================================================================================

  // Complete, cancelled, expired, and cleanup lifecycles are exercised against
  // Meta in tests/meta-consumers.e2e.spec.ts.

  // ==================================================================================
  // Plugin Integration Tests
  // ==================================================================================

  describe('HyperSwap Plugin', () => {
    let wallet: WalletSDK;

    beforeEach(async () => {
      await localnet.newScope();
      const {
        algorand,
        context: { testAccount },
      } = localnet;
      const newSender = testAccount.toString();
      const newSigner = testAccount.signer;

      const dispenser = await algorand.account.dispenserFromEnvironment();
      await algorand.account.ensureFunded(newSender, dispenser.addr, (100).algos());

      // Create a wallet for plugin testing
      wallet = await newWallet({
        factoryParams: {
          appId: walletFactory.appId,
          defaultSender: newSender,
          defaultSigner: newSigner,
        },
        readerAccount: newSender,
        algorand,
        nickname: 'hyperswap_test_wallet',
      });

      // Fund the wallet
      await wallet.client.appClient.fundAppAccount({
        amount: (10).algos(),
      });
    });

    test('plugin can be added to wallet', async () => {
      const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n });
      await wallet.client.appClient.fundAppAccount({ amount: microAlgo(mbr.plugins) });

      await wallet.addPlugin({
        client: hyperSwapPluginSdk,
        callerType: CallerType.Admin,
      });

      const plugins = await wallet.getPlugins();
      expect(plugins.has({ plugin: hyperSwapPluginSdk.appId, caller: ALGORAND_ZERO_ADDRESS_STRING, escrow: '' })).toBe(true);
    });
  });
});
