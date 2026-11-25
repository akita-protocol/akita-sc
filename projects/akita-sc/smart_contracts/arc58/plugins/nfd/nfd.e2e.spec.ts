import * as algokit from '@algorandfoundation/algokit-utils';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { SigningAccount, TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account';
import { Address } from 'algosdk';
import { afterAll, beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { newWallet, WalletSDK, WalletFactorySDK, CallerType, NFDPluginSDK } from 'akita-sdk/wallet';
import type { PluginSDKReturn } from 'akita-sdk';
import algosdk from 'algosdk';
import { AkitaUniverse, buildAkitaUniverse } from '../../../../tests/fixtures/dao';
import { deployNFDPlugin } from '../../../../tests/fixtures/plugins/nfd';
import { expectContractError } from '../../../../tests/utils/errors';
import { MockNfdClient, MockNfdFactory } from '../../../artifacts/mocks/nfd/MockNfdClient';
import { MockNfdRegistryClient, MockNfdRegistryFactory } from '../../../artifacts/mocks/nfd/MockNfdRegistryClient';
import { MockFakeWalletFactory } from '../../../artifacts/mocks/fake-wallet/MockFakeWalletClient';
import { AppCallMethodCall } from '@algorandfoundation/algokit-utils/types/composer';
import { AbstractedAccountMbrFactory } from '../../../artifacts/arc58/account/AbstractedAccountMBRClient';
import { MockNfdRenewalProbeClient, MockNfdRenewalProbeFactory } from '../../../artifacts/mocks/nfd/MockNfdRenewalProbeClient';
import { MockNfdPairRegistryClient, MockNfdPairRegistryFactory } from '../../../artifacts/mocks/nfd-registry/MockNfdPairRegistryClient';
import { deployAbstractedAccountFactory } from '../../../../tests/fixtures/abstracted-account';
import { deployAkitaDAO } from '../../../../tests/fixtures/dao';
import { deployEscrowFactory } from '../../../../tests/fixtures/escrow';
import { errMethodOnCooldown, errPluginDoesNotExist, errPluginExpired } from '../../account/errors';
import { NFDPluginAutoRenewWindow, NFDPluginMaxForeignLinkMbr } from './constants';
import { errCannotAutoRenew, errNotAnNfd, errNotNfdOwner, errPriceAboveMax } from './errors';

algokit.Config.configure({ populateAppCallResources: true });

const fixture = algorandFixture();

describe('NFD plugin contract', () => {
  let deployer: TransactionSignerAccount;
  let user: TransactionSignerAccount;
  let akitaUniverse: AkitaUniverse;
  let dispenser: import('@algorandfoundation/algokit-utils/types/account').TransactionSignerAccount & { account: SigningAccount };
  let algorand: import('@algorandfoundation/algokit-utils').AlgorandClient;
  let wallet: WalletSDK;

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
  });

  beforeEach(fixture.newScope);

  describe('NFDPlugin SDK', () => {
    test('plugin can be added OK', async () => {
      const nfdPluginSdk = akitaUniverse.nfdPlugin;

      const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n });
      await wallet.client.appClient.fundAppAccount({ amount: algokit.microAlgo(mbr.plugins) });

      await wallet.addPlugin({
        client: nfdPluginSdk,
        callerType: CallerType.Global,
      });

      // Note: NFDPlugin has 13 methods, but they require NFD registry setup
      // This test verifies the plugin can be added to the wallet
      const plugins = await wallet.getPlugins();
      expect(plugins.size).toBe(1);
    });
  });

  /**
   * F4: autoRenew is a keeper/global method, so it may only renew NFDs owned by
   * the wallet's spending account. F5: a spoofed `wallet` cannot make the plugin
   * spend its own app balance.
   */
  describe('autoRenew ownership and spending-account control', () => {
    const RENEW_PRICE = 1_000_000n;
    const ONE_DAY = 86_400n;
    let stranger: TransactionSignerAccount;
    let keeperWallet: WalletSDK;
    let nfdPlugin: NFDPluginSDK;
    let nfdFactory: MockNfdFactory;

    const chainTime = async () => {
      const status = await algorand.client.algod.status().do();
      return BigInt((await algorand.client.algod.block(status.lastRound).do()).block.header.timestamp);
    };

    const mintNfd = async (name: string, owner: string, expiresIn: bigint) => {
      const { appClient } = await nfdFactory.send.create.create({
        args: { nfdName: name, owner, expiration: (await chainTime()) + expiresIn, renewPrice: RENEW_PRICE },
      });
      return appClient;
    };

    const expirationOf = async (nfd: MockNfdClient) =>
      algosdk.decodeUint64((await nfd.state.global.expirationTime()).asByteArray()!, 'bigint');

    const autoRenew = (appId: bigint) => keeperWallet.usePlugin({
      sender: stranger.addr,
      signer: stranger.signer,
      callerType: CallerType.Global,
      calls: [nfdPlugin.autoRenew({ sender: stranger.addr, signer: stranger.signer, appId, maxPrice: RENEW_PRICE })],
    });

    beforeAll(async () => {
      stranger = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(100_000_000) });

      const registryFactory = algorand.client.getTypedAppFactory(MockNfdRegistryFactory, {
        defaultSender: deployer.addr, defaultSigner: deployer.signer,
      });
      const { appClient: registry } = await registryFactory.send.create.create({ args: {} });
      nfdFactory = algorand.client.getTypedAppFactory(MockNfdFactory, {
        defaultSender: deployer.addr, defaultSigner: deployer.signer,
      });
      nfdPlugin = await deployNFDPlugin({
        fixture, sender: deployer.addr, signer: deployer.signer, args: { registry: registry.appId },
      });

      keeperWallet = await newWallet({
        algorand,
        factoryParams: { appId: akitaUniverse.walletFactory.appId, defaultSender: user.addr, defaultSigner: user.signer },
        sender: user.addr,
        signer: user.signer,
        nickname: 'Keeper Wallet',
      });
      await keeperWallet.client.appClient.fundAppAccount({ amount: algokit.microAlgo(20_000_000) });
      // Keeper-style grant: anyone may call autoRenew, and only autoRenew.
      await keeperWallet.addPlugin({
        client: nfdPlugin,
        callerType: CallerType.Global,
        methods: [{ name: nfdPlugin.autoRenew(), cooldown: 0n }],
      });
    });

    test('renews an NFD owned by the wallet within the window', async () => {
      const owned = await mintNfd('owned.algo', keeperWallet.client.appAddress.toString(), 10n * ONE_DAY);
      const expirationBefore = await expirationOf(owned);
      const walletBefore = await algorand.account.getInformation(keeperWallet.client.appAddress);

      await autoRenew(owned.appId);

      const walletAfter = await algorand.account.getInformation(keeperWallet.client.appAddress);
      expect(walletBefore.balance.microAlgos - walletAfter.balance.microAlgos).toBe(RENEW_PRICE);
      expect(await expirationOf(owned)).toBe(expirationBefore + 365n * ONE_DAY);
    });

    test('rejects renewing a third-party NFD and leaves the wallet balance untouched', async () => {
      const foreign = await mintNfd('foreign.algo', stranger.addr.toString(), 10n * ONE_DAY);
      const walletBefore = await algorand.account.getInformation(keeperWallet.client.appAddress);

      await expectContractError(autoRenew(foreign.appId), 'errNnow');

      const walletAfter = await algorand.account.getInformation(keeperWallet.client.appAddress);
      expect(walletAfter.balance.microAlgos).toBe(walletBefore.balance.microAlgos);
      expect(walletAfter.authAddr?.toString() ?? keeperWallet.client.appAddress.toString())
        .toBe(walletBefore.authAddr?.toString() ?? keeperWallet.client.appAddress.toString());
    });

    test('rejects an owned NFD outside the auto-renew window', async () => {
      const later = await mintNfd('later.algo', keeperWallet.client.appAddress.toString(), 60n * ONE_DAY);
      await expectContractError(autoRenew(later.appId), 'errNarn');
    });

    test('a spoofed wallet cannot spend the plugin app balance (getControlledSpendingAccount)', async () => {
      const foreign = await mintNfd('gift.algo', stranger.addr.toString(), 10n * ONE_DAY);
      await nfdPlugin.client.appClient.fundAppAccount({ amount: algokit.microAlgo(5_000_000) });

      const fakeFactory = algorand.client.getTypedAppFactory(MockFakeWalletFactory, {
        defaultSender: stranger.addr, defaultSigner: stranger.signer,
      });
      const { appClient: fake } = await fakeFactory.send.create.create({
        args: {
          controlledAddress: stranger.addr.toString(),
          referrer: algosdk.ALGORAND_ZERO_ADDRESS_STRING,
          spendingAddress: nfdPlugin.client.appAddress.toString(),
        },
      });

      const pluginBefore = await algorand.account.getInformation(nfdPlugin.client.appAddress);
      // `renew` is permissionless on NFD; without the control check this would
      // pay the stranger's renewal out of the plugin's own balance.
      await expectContractError(nfdPlugin.client.send.renew({
        sender: stranger.addr,
        signer: stranger.signer,
        args: { wallet: fake.appId, rekeyBack: false, appId: foreign.appId, years: 1n, maxPrice: RENEW_PRICE },
        extraFee: algokit.microAlgo(5_000),
      }), 'errNath');

      const pluginAfter = await algorand.account.getInformation(nfdPlugin.client.appAddress);
      expect(pluginAfter.balance.microAlgos).toBe(pluginBefore.balance.microAlgos);
    });
  });

  describe('audit 12: registry calls and link costs', () => {
    // what the live registry asks for a first link, and what live link groups pay into the NFD
    const REGISTRY_QUOTE = 18_500n;
    const NFD_STORAGE = 37_900n;
    let stranger: TransactionSignerAccount;
    let linkWallet: WalletSDK;
    let nfdPlugin: NFDPluginSDK;
    let nfdFactory: MockNfdFactory;
    let registry: MockNfdRegistryClient;
    let owned: MockNfdClient;
    let foreign: MockNfdClient;

    const balance = async (address: string | Address) => (await algorand.account.getInformation(address)).balance.microAlgos;
    const walletAddress = () => linkWallet.client.appAddress.toString();
    const counts = async () => {
      const state = await registry.state.global.getAll();
      return { mints: state.mints ?? 0n, links: state.links ?? 0n, unlinks: state.unlinks ?? 0n, primaries: state.primaries ?? 0n, last: state.lastAddress };
    };

    const mintNfd = async (name: string, owner: string) => {
      const { appClient } = await nfdFactory.send.create.create({ args: { nfdName: name, owner, expiration: 0n, renewPrice: 0n } });
      // an NFD's account holds its minimum balance long before anything is linked to it
      await appClient.appClient.fundAppAccount({ amount: algokit.microAlgo(100_000) });
      return appClient;
    };

    const use = (calls: PluginSDKReturn[]) => linkWallet.usePlugin({ sender: user.addr, signer: user.signer, callerType: CallerType.Global, calls });

    /**
     * A plugin call built here rather than through the SDK hook, because these registry calls need
     * costs the mock registry does not model. `maxFee` is the allowance the group needs to cover the
     * call's inner transactions: a hand-built call carries no default.
     */
    const PLUGIN_MAX_FEE = algokit.microAlgo(20_000);

    /** linkNfdAddress with explicit costs (the SDK reads them from the NFD, which the mock does not model) */
    const link = (nfd: MockNfdClient, name: string, nfdMbrCost: bigint, registryMbrCost: bigint, rekeyBack = true): PluginSDKReturn => () => ({
      appId: nfdPlugin.appId,
      selectors: [nfdPlugin.client.appClient.getABIMethod('linkNfdAddress').getSelector()],
      getTxns: async ({ wallet }) => [{
        type: 'methodCall' as const,
        ...(await nfdPlugin.client.params.linkNfdAddress({
          sender: user.addr, signer: user.signer, maxFee: PLUGIN_MAX_FEE,
          args: { wallet, rekeyBack, appId: nfd.appId, nfdName: name, nfdMbrCost, registryMbrCost },
        })),
      }],
    });

    /** setAddressPrimaryNfd or unlinkNfdAddress, with the same fee allowance */
    const addressCall = (
      method: 'setAddressPrimaryNfd' | 'unlinkNfdAddress',
      nfd: MockNfdClient,
      name: string,
      rekeyBack = true,
    ): PluginSDKReturn => () => ({
      appId: nfdPlugin.appId,
      selectors: [nfdPlugin.client.appClient.getABIMethod(method).getSelector()],
      getTxns: async ({ wallet }) => [{
        type: 'methodCall' as const,
        ...(await nfdPlugin.client.params[method]({
          sender: user.addr, signer: user.signer, maxFee: PLUGIN_MAX_FEE,
          args: { wallet, rekeyBack, appId: nfd.appId, nfdName: name, address: walletAddress() },
        })),
      }],
    });

    beforeAll(async () => {
      stranger = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(10_000_000) });
      const registryFactory = algorand.client.getTypedAppFactory(MockNfdRegistryFactory, { defaultSender: deployer.addr, defaultSigner: deployer.signer });
      ({ appClient: registry } = await registryFactory.send.create.create({ args: {} }));
      await registry.appClient.fundAppAccount({ amount: algokit.microAlgo(100_000) });
      await registry.send.setLinkCost({ args: { cost: REGISTRY_QUOTE } });
      nfdFactory = algorand.client.getTypedAppFactory(MockNfdFactory, { defaultSender: deployer.addr, defaultSigner: deployer.signer });
      nfdPlugin = await deployNFDPlugin({ fixture, sender: deployer.addr, signer: deployer.signer, args: { registry: registry.appId } });

      linkWallet = await newWallet({
        algorand,
        factoryParams: { appId: akitaUniverse.walletFactory.appId, defaultSender: user.addr, defaultSigner: user.signer },
        sender: user.addr,
        signer: user.signer,
        nickname: 'Link Wallet',
      });
      await linkWallet.client.appClient.fundAppAccount({ amount: algokit.microAlgo(20_000_000) });
      await linkWallet.addPlugin({ client: nfdPlugin, callerType: CallerType.Global });
      owned = await mintNfd('owned-link.algo', walletAddress());
      foreign = await mintNfd('foreign-link.algo', stranger.addr.toString());
    });

    test('EXT-06: mint, link, set-primary and unlink reach a registry that refuses RekeyTo, and the wallet keeps its account', async () => {
      const before = await counts();
      const registryBefore = await balance(registry.appAddress);
      const nfdBefore = await balance(owned.appAddress);

      // a registry call that is the last call of its window
      await use([nfdPlugin.mint({ sender: user.addr, signer: user.signer, nfdName: 'minted.algo', reservedFor: walletAddress(), linkOnMint: false, amount: 1_000_000n })]);
      await use([link(owned, 'owned-link.algo', NFD_STORAGE, REGISTRY_QUOTE)]);
      // the apps' window: link, then set the primary NFD, the account handed back by the last call
      await use([
        link(owned, 'owned-link.algo', 0n, 0n, false),
        addressCall('setAddressPrimaryNfd', owned, 'owned-link.algo'),
      ]);
      await use([addressCall('unlinkNfdAddress', owned, 'owned-link.algo')]);

      const after = await counts();
      expect([after.mints - before.mints, after.links - before.links, after.primaries - before.primaries, after.unlinks - before.unlinks]).toEqual([1n, 2n, 1n, 1n]);
      expect(after.last).toBe(walletAddress());
      expect((await balance(registry.appAddress)) - registryBefore).toBe(1_000_000n + REGISTRY_QUOTE);
      expect((await balance(owned.appAddress)) - nfdBefore).toBe(NFD_STORAGE);
      expect((await algorand.account.getInformation(linkWallet.client.appAddress)).authAddr).toBeUndefined();
    });

    test('EXT-04: the registry is never paid more than its own quote', async () => {
      const walletBefore = await balance(walletAddress());
      const registryBefore = await balance(registry.appAddress);
      await expectContractError(use([link(owned, 'owned-link.algo', 0n, REGISTRY_QUOTE + 1n)]), errPriceAboveMax);
      await expectContractError(use([link(owned, 'owned-link.algo', 0n, 5_000_000n)]), errPriceAboveMax);
      expect(await balance(walletAddress())).toBe(walletBefore);
      expect(await balance(registry.appAddress)).toBe(registryBefore);
      expect((await algorand.account.getInformation(linkWallet.client.appAddress)).authAddr).toBeUndefined();
    });

    test('EXT-04: an NFD another account owns gets no more than the storage of one address', async () => {
      const cap = BigInt(NFDPluginMaxForeignLinkMbr);
      const walletBefore = await balance(walletAddress());
      const foreignBefore = await balance(foreign.appAddress);
      await expectContractError(use([link(foreign, 'foreign-link.algo', cap + 1n, REGISTRY_QUOTE)]), errNotNfdOwner);
      await expectContractError(use([link(foreign, 'foreign-link.algo', 5_000_000n, REGISTRY_QUOTE)]), errNotNfdOwner);
      expect(await balance(walletAddress())).toBe(walletBefore);
      expect(await balance(foreign.appAddress)).toBe(foreignBefore);

      // the storage of the link itself is still paid, as when the address is verified on someone else's NFD
      await use([link(foreign, 'foreign-link.algo', NFD_STORAGE, REGISTRY_QUOTE)]);
      expect((await balance(foreign.appAddress)) - foreignBefore).toBe(NFD_STORAGE);

      // an NFD the account owns can be given more: only its owner, this account, can take it out again
      const ownedBefore = await balance(owned.appAddress);
      await use([link(owned, 'owned-link.algo', cap + 1n, REGISTRY_QUOTE)]);
      expect((await balance(owned.appAddress)) - ownedBefore).toBe(cap + 1n);
      expect((await algorand.account.getInformation(linkWallet.client.appAddress)).authAddr).toBeUndefined();
    });

    test('an app that only looks like an NFD is still refused before anything is paid', async () => {
      // same program and name fields, but not an app the registry vouches for
      const strangerFactory = algorand.client.getTypedAppFactory(MockNfdFactory, { defaultSender: stranger.addr, defaultSigner: stranger.signer });
      const { appClient: lookalike } = await strangerFactory.send.create.create({
        args: { nfdName: 'owned-link.algo', owner: walletAddress(), expiration: 0n, renewPrice: 0n },
      });
      await lookalike.appClient.fundAppAccount({ amount: algokit.microAlgo(100_000) });
      const walletBefore = await balance(walletAddress());
      await expectContractError(use([link(lookalike, 'owned-link.algo', NFD_STORAGE, REGISTRY_QUOTE)]), errNotAnNfd);
      expect(await balance(walletAddress())).toBe(walletBefore);
      expect(await balance(lookalike.appAddress)).toBe(100_000n);
    });
  });
});

type SignerAccount = TransactionSignerAccount

type GrantContext = {
  wallet: WalletSDK
  escrowAddress: string
}

describe('NFD plugin auto-renew safety', () => {
  const AUTO_RENEW_WINDOW = BigInt(NFDPluginAutoRenewWindow)
  const RENEW_PRICE = 1_234_567n
  const MAX_UINT64 = (1n << 64n) - 1n
  const RENEWAL_ESCROW = 'nfd-auto-renew'

  let algorand: import('@algorandfoundation/algokit-utils').AlgorandClient
  let deployer: SignerAccount
  let owner: SignerAccount
  let allowedCaller: SignerAccount
  let attacker: SignerAccount
  let walletFactory: WalletFactorySDK
  let nfdPlugin: NFDPluginSDK
  let nfdFactory: MockNfdRenewalProbeFactory
  let registry: MockNfdPairRegistryClient
  let previousWalletMbrAppId: string | undefined
  let walletSequence = 0

  const latestTimestamp = async (): Promise<bigint> => {
    const status = await algorand.client.algod.status().do()
    return BigInt((await algorand.client.algod.block(status.lastRound).do()).block.header.timestamp)
  }

  const installAutoRenewGrant = async (lastValid = MAX_UINT64): Promise<GrantContext> => {
    walletSequence += 1
    const wallet = await newWallet({
      algorand,
      factoryParams: {
        appId: walletFactory.appId,
        defaultSender: owner.addr,
        defaultSigner: owner.signer,
      },
      sender: owner.addr,
      signer: owner.signer,
      readerAccount: owner.addr.toString(),
      nickname: `NFD auto-renew ${walletSequence}`,
    })

    const mbr = await wallet.getMbr({
      escrow: RENEWAL_ESCROW,
      methodCount: 1n,
      plugin: '',
      groups: 0n,
    })
    await wallet.client.appClient.fundAppAccount({
      amount: algokit.microAlgo(mbr.plugins + mbr.newEscrowMintCost),
    })

    await wallet.addPlugin({
      client: nfdPlugin,
      callerType: CallerType.Other,
      caller: allowedCaller.addr.toString(),
      escrow: RENEWAL_ESCROW,
      lastValid,
      methods: [{ name: nfdPlugin.autoRenew(), cooldown: 0n }],
    })

    const escrow = await wallet.getEscrow(RENEWAL_ESCROW)
    await algorand.send.payment({
      sender: owner.addr,
      signer: owner.signer,
      receiver: escrow.address,
      amount: algokit.microAlgo(20_000_000n),
    })

    return { wallet, escrowAddress: escrow.address }
  }

  const createNfd = async ({
    name,
    expiration,
    expectedPayer,
    includeExpiration = true,
    renewPrice = RENEW_PRICE,
  }: {
    name: string
    expiration: bigint
    expectedPayer: string
    includeExpiration?: boolean
    renewPrice?: bigint
  }): Promise<MockNfdRenewalProbeClient> => {
    const { appClient } = await nfdFactory.send.create.create({
      args: { name, expiration, renewPrice, expectedPayer, includeExpiration },
    })
    return appClient
  }

  const configureRegistry = async (
    first: MockNfdRenewalProbeClient,
    firstName: string,
    second?: { client: MockNfdRenewalProbeClient; name: string },
  ): Promise<void> => {
    await registry.send.configure({
      args: {
        firstName,
        firstAppId: first.appId,
        secondName: second?.name ?? '',
        secondAppId: second?.client.appId ?? 0n,
      },
    })
  }

  const autoRenew = async (
    grant: GrantContext,
    target: MockNfdRenewalProbeClient,
    caller = allowedCaller,
    escrow = RENEWAL_ESCROW,
  ) => grant.wallet.usePlugin({
    callerType: CallerType.Other,
    sender: caller.addr,
    signer: caller.signer,
    escrow,
    calls: [nfdPlugin.autoRenew({
      sender: caller.addr,
      signer: caller.signer,
      appId: target.appId,
      maxPrice: RENEW_PRICE,
    })],
  })

  const rawPluginCall = async ({
    grant,
    call,
    escrow = RENEWAL_ESCROW,
    before = [],
  }: {
    grant: GrantContext
    call: ReturnType<NFDPluginSDK['autoRenew']>
    escrow?: string
    before?: AppCallMethodCall[]
  }) => {
    const sendParams = { sender: allowedCaller.addr, signer: allowedCaller.signer }
    const group = algorand.newGroup()
    for (const txn of before) {
      group.addAppCallMethodCall({ ...txn, maxFee: algokit.microAlgo(10_000n) })
    }

    group.addAppCallMethodCall(await grant.wallet.client.params.arc58RekeyToPlugin({
      ...sendParams,
      args: {
        plugin: nfdPlugin.appId,
        type: CallerType.Other,
        escrow,
        methodOffsets: [0n],
        fundsRequest: [],
      },
      maxFee: algokit.microAlgo(10_000n),
    }))

    const pluginTxns = await call(grant.escrowAddress).getTxns({ wallet: grant.wallet.client.appId })
    for (const txn of pluginTxns) {
      if (txn.type !== 'methodCall') throw new Error('Expected an NFD plugin method call')
      group.addAppCallMethodCall(txn as AppCallMethodCall)
    }

    group.addAppCallMethodCall(await grant.wallet.client.params.arc58VerifyAuthAddress({
      ...sendParams,
      args: {},
      maxFee: algokit.microAlgo(10_000n),
    }))
    return group.send({
      populateAppCallResources: true,
      coverAppCallInnerTransactionFees: true,
    })
  }

  beforeAll(async () => {
    await fixture.newScope()
    algorand = fixture.context.algorand

    deployer = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(2_000_000_000) })
    owner = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(500_000_000) })
    allowedCaller = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(100_000_000) })
    attacker = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(100_000_000) })
    previousWalletMbrAppId = process.env.WALLET_MBR_APP_ID
    const mbrFactory = algorand.client.getTypedAppFactory(AbstractedAccountMbrFactory, {
      defaultSender: deployer.addr,
      defaultSigner: deployer.signer,
    })
    const { appClient: mbrClient } = await mbrFactory.send.create.bare()
    process.env.WALLET_MBR_APP_ID = mbrClient.appId.toString()

    const registryFactory = new MockNfdPairRegistryFactory({
      algorand,
      defaultSender: deployer.addr,
      defaultSigner: deployer.signer,
    })
    ;({ appClient: registry } = await registryFactory.send.create.create({ args: {} }))

    const dao = await deployAkitaDAO({
      fixture,
      sender: deployer.addr,
      signer: deployer.signer,
      apps: { nfdRegistry: registry.appId },
    })
    const escrowFactory = await deployEscrowFactory({
      fixture,
      sender: deployer.addr,
      signer: deployer.signer,
    })
    walletFactory = await deployAbstractedAccountFactory({
      fixture,
      sender: deployer.addr,
      signer: deployer.signer,
      args: { akitaDao: dao.appId, escrowFactory: escrowFactory.appId },
    })
    nfdPlugin = await deployNFDPlugin({
      fixture,
      sender: deployer.addr,
      signer: deployer.signer,
      args: { registry: registry.appId },
    })
    nfdFactory = new MockNfdRenewalProbeFactory({
      algorand,
      defaultSender: deployer.addr,
      defaultSigner: deployer.signer,
    })
  })

  beforeEach(fixture.newScope)

  afterAll(() => {
    if (previousWalletMbrAppId === undefined) delete process.env.WALLET_MBR_APP_ID
    else process.env.WALLET_MBR_APP_ID = previousWalletMbrAppId
  })

  test('authorizes the exact ARC-58 caller, escrow, and autoRenew selector and pays the registry-valid NFD quote', async () => {
    const grant = await installAutoRenewGrant()
    const targetName = 'renewal.agent'
    const target = await createNfd({
      name: targetName,
      expiration: 1n,
      expectedPayer: grant.escrowAddress,
    })
    await configureRegistry(target, targetName)

    const grantInfo = await grant.wallet.getPluginByKey({
      plugin: nfdPlugin.appId,
      caller: allowedCaller.addr.toString(),
      escrow: RENEWAL_ESCROW,
    })
    const expectedSelector = nfdPlugin.client.appClient.getABIMethod('autoRenew').getSelector()
    expect(grantInfo.methods).toHaveLength(1)
    expect(grantInfo.methods[0].name).toEqual(expectedSelector)

    const registryChecksBefore = await registry.state.global.checkCount()
    const targetBalanceBefore = await algorand.account.getInformation(target.appAddress)
    const setExactBoundary = await target.params.setExpirationFromNow({
      sender: deployer.addr,
      signer: deployer.signer,
      args: { offset: AUTO_RENEW_WINDOW },
    })
    await rawPluginCall({
      grant,
      before: [setExactBoundary],
      call: nfdPlugin.autoRenew({
        sender: allowedCaller.addr,
        signer: allowedCaller.signer,
        appId: target.appId,
        maxPrice: RENEW_PRICE,
      }),
    })

    const targetBalanceAfter = await algorand.account.getInformation(target.appAddress)
    expect(targetBalanceAfter.balance.microAlgos - targetBalanceBefore.balance.microAlgos).toBe(RENEW_PRICE)
    expect(await target.state.global.quoteCount()).toBe(1n)
    expect(await target.state.global.renewalCount()).toBe(1n)
    expect(await target.state.global.lastRenewAmount()).toBe(RENEW_PRICE)
    expect(await target.state.global.lastRenewPayer()).toBe(grant.escrowAddress)
    expect(await registry.state.global.checkCount()).toBe((registryChecksBefore ?? 0n) + 1n)
    expect(await registry.state.global.lastCheckedAppId()).toBe(target.appId)
  })

  test('accepts NFDs from expiry now through the inclusive 30-day upper window and rejects expired, later or missing expirations', async () => {
    const grant = await installAutoRenewGrant()
    const justOutside = await createNfd({
      name: 'just-outside.agent',
      expiration: 1n,
      expectedPayer: grant.escrowAddress,
    })
    await configureRegistry(justOutside, 'just-outside.agent')
    const setJustOutside = await justOutside.params.setExpirationFromNow({
      sender: deployer.addr,
      signer: deployer.signer,
      args: { offset: AUTO_RENEW_WINDOW + 1n },
    })
    await expect(rawPluginCall({
      grant,
      before: [setJustOutside],
      call: nfdPlugin.autoRenew({
        sender: allowedCaller.addr,
        signer: allowedCaller.signer,
        appId: justOutside.appId,
        maxPrice: RENEW_PRICE,
      }),
    })).rejects.toThrow(errCannotAutoRenew)
    expect(await justOutside.state.global.quoteCount()).toBe(0n)
    expect(await justOutside.state.global.renewalCount()).toBe(0n)

    const exactNow = await createNfd({
      name: 'expires-now.agent',
      expiration: 1n,
      expectedPayer: grant.escrowAddress,
    })
    await configureRegistry(exactNow, 'expires-now.agent')
    const setExactNow = await exactNow.params.setExpirationFromNow({
      sender: deployer.addr,
      signer: deployer.signer,
      args: { offset: 0n },
    })
    await rawPluginCall({
      grant,
      before: [setExactNow],
      call: nfdPlugin.autoRenew({
        sender: allowedCaller.addr,
        signer: allowedCaller.signer,
        appId: exactNow.appId,
        maxPrice: RENEW_PRICE,
      }),
    })
    expect(await exactNow.state.global.quoteCount()).toBe(1n)
    expect(await exactNow.state.global.renewalCount()).toBe(1n)

    const expired = await createNfd({
      name: 'expired.agent',
      expiration: 1n,
      expectedPayer: grant.escrowAddress,
    })
    await configureRegistry(expired, 'expired.agent')
    // autoRenew only renews before expiry (expiration >= latest timestamp).
    await expect(autoRenew(grant, expired)).rejects.toThrow(errCannotAutoRenew)
    expect(await expired.state.global.quoteCount()).toBe(0n)
    expect(await expired.state.global.renewalCount()).toBe(0n)

    const cases = [
      { name: 'zero.agent', expiration: 0n, includeExpiration: true },
      { name: 'missing.agent', expiration: 0n, includeExpiration: false },
    ]

    for (const invalid of cases) {
      const target = await createNfd({
        ...invalid,
        expectedPayer: grant.escrowAddress,
      })
      await configureRegistry(target, invalid.name)

      await expect(autoRenew(grant, target)).rejects.toThrow(errCannotAutoRenew)
      expect(await target.state.global.quoteCount()).toBe(0n)
      expect(await target.state.global.renewalCount()).toBe(0n)
    }
  })

  test('rejects an unregistered app ID but documents that any second registry-valid NFD target is currently in scope', async () => {
    const grant = await installAutoRenewGrant()
    const expiration = (await latestTimestamp()) + 86_400n
    const registered = await createNfd({
      name: 'first.agent',
      expiration,
      expectedPayer: grant.escrowAddress,
    })
    const secondRegistered = await createNfd({
      name: 'second.agent',
      expiration,
      expectedPayer: grant.escrowAddress,
    })
    const impostor = await createNfd({
      name: 'first.agent',
      expiration,
      expectedPayer: grant.escrowAddress,
    })
    await configureRegistry(registered, 'first.agent', {
      client: secondRegistered,
      name: 'second.agent',
    })

    await expect(autoRenew(grant, impostor)).rejects.toThrow(errNotAnNfd)
    expect(await impostor.state.global.renewalCount()).toBe(0n)

    // ARC-58 restricts the plugin and selector, but not the autoRenew appId argument.
    await autoRenew(grant, secondRegistered)
    expect(await secondRegistered.state.global.renewalCount()).toBe(1n)
    expect(await registry.state.global.lastCheckedAppId()).toBe(secondRegistered.appId)
  })

  test('rejects arbitrary methods, callers, escrows, and direct plugin calls', async () => {
    const grant = await installAutoRenewGrant()
    const target = await createNfd({
      name: 'guarded.agent',
      expiration: (await latestTimestamp()) + 86_400n,
      expectedPayer: grant.escrowAddress,
    })
    await configureRegistry(target, 'guarded.agent')

    // Bypass SDK selector preflight so ARC-58 itself must reject `renew(years)`.
    await expect(rawPluginCall({
      grant,
      call: nfdPlugin.renew({
        sender: allowedCaller.addr,
        signer: allowedCaller.signer,
        appId: target.appId,
        years: 2n,
        maxPrice: 2n * RENEW_PRICE,
      }),
    })).rejects.toThrow(errMethodOnCooldown)

    await expect(autoRenew(grant, target, attacker)).rejects.toThrow(errPluginDoesNotExist)
    const ungrantedEscrow = 'existing-ungranted'
    const escrowMbr = await grant.wallet.getMbr({
      escrow: ungrantedEscrow,
      methodCount: 0n,
      plugin: '',
      groups: 0n,
    })
    await grant.wallet.client.appClient.fundAppAccount({ amount: algokit.microAlgo(escrowMbr.escrows) })
    await grant.wallet.newEscrow({
      sender: owner.addr,
      signer: owner.signer,
      escrow: ungrantedEscrow,
      address: grant.escrowAddress,
    })
    expect((await grant.wallet.getEscrow(ungrantedEscrow)).address).toBe(grant.escrowAddress)
    await expect(rawPluginCall({
      grant,
      escrow: ungrantedEscrow,
      call: nfdPlugin.autoRenew({
        sender: allowedCaller.addr,
        signer: allowedCaller.signer,
        appId: target.appId,
        maxPrice: RENEW_PRICE,
      }),
    })).rejects.toThrow(errPluginDoesNotExist)
    await expect(nfdPlugin.client.send.autoRenew({
      sender: allowedCaller.addr,
      signer: allowedCaller.signer,
      args: {
        wallet: grant.wallet.client.appId,
        rekeyBack: true,
        appId: target.appId,
        maxPrice: RENEW_PRICE,
      },
      extraFee: algokit.microAlgo(5_000n),
      // F5: getControlledSpendingAccount rejects a direct call before any inner transaction (errNath).
    })).rejects.toThrow('errNath')

    expect(await target.state.global.quoteCount()).toBe(0n)
    expect(await target.state.global.renewalCount()).toBe(0n)
  })

  test('rejects an expired ARC-58 grant', async () => {
    const grant = await installAutoRenewGrant(0n)
    const target = await createNfd({
      name: 'expired-grant.agent',
      expiration: (await latestTimestamp()) + 86_400n,
      expectedPayer: grant.escrowAddress,
    })
    await configureRegistry(target, 'expired-grant.agent')

    await expect(autoRenew(grant, target)).rejects.toThrow(errPluginExpired)
    expect(await target.state.global.renewalCount()).toBe(0n)
  })

  test('revocation immediately disables the ARC-58 grant', async () => {
    const grant = await installAutoRenewGrant()
    const target = await createNfd({
      name: 'revoked.agent',
      expiration: (await latestTimestamp()) + 86_400n,
      expectedPayer: grant.escrowAddress,
    })
    await configureRegistry(target, 'revoked.agent')

    await grant.wallet.removePlugin({
      plugin: nfdPlugin.appId,
      caller: allowedCaller.addr.toString(),
      escrow: RENEWAL_ESCROW,
    })

    await expect(autoRenew(grant, target)).rejects.toThrow(errPluginDoesNotExist)
    expect(await target.state.global.renewalCount()).toBe(0n)
  })
})
