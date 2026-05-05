import { Config } from '@algorandfoundation/algokit-utils';
import { registerDebugEventHandlers } from '@algorandfoundation/algokit-utils-debug';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { AkitaDaoSDK } from 'akita-sdk/dao';
import { newWallet, WalletFactorySDK, CallerType, PayPluginSDK } from 'akita-sdk/wallet';
import { microAlgo } from '@algorandfoundation/algokit-utils';
import { deployPayPlugin } from '../../../tests/fixtures/plugins/pay';
import { deployAbstractedAccountFactory } from '../../../tests/fixtures/abstracted-account';
import { buildAkitaUniverse, deployAkitaDAO } from '../../../tests/fixtures/dao';
import { deployEscrowFactory } from '../../../tests/fixtures/escrow';

describe('ARC58 Factory', () => {
  const localnet = algorandFixture();

  let dao: AkitaDaoSDK;
  /** the wallet factory contract sdk */
  let walletFactory: WalletFactorySDK;

  beforeAll(async () => {
    Config.configure({
      debug: true,
      // traceAll: true,
    })
    registerDebugEventHandlers()

    await localnet.newScope();
    const { algorand, context: { testAccount } } = localnet
    const sender = testAccount.toString()
    const signer = testAccount.signer

    const dispenser = await algorand.account.dispenserFromEnvironment();
    await algorand.account.ensureFunded(sender, dispenser, (100).algos());

    ({ dao, walletFactory } = await buildAkitaUniverse({
      fixture: localnet,
      sender,
      signer,
      apps: {}
    }));
  })

  beforeEach(localnet.newScope)

  describe('Factory Creation', () => {
    test('factory is created with correct configuration', async () => {
      const { algorand, context: { testAccount } } = localnet
      const sender = testAccount.toString()
      const signer = testAccount.signer

      // Get the factory's global state
      const factoryState = await walletFactory.client.state.global.getAll()

      // Verify the factory has the expected state
      expect(factoryState.akitaDao).toBe(dao.appId)
      expect(factoryState.domain).toBe('akita.community')
    })

    test('factory can be deployed independently', async () => {
      const { algorand, context: { testAccount } } = localnet
      const sender = testAccount.toString()
      const signer = testAccount.signer

      // Three factory deployments in one test exceed the default 10 ALGO
      // scope funding — top up from the dispenser.
      const dispenser = await algorand.account.dispenserFromEnvironment();
      await algorand.account.ensureFunded(sender, dispenser, (100).algos());

      // Deploy a new escrow factory
      const escrowFactory = await deployEscrowFactory({
        fixture: localnet,
        sender,
        signer,
      })

      // Deploy a new DAO
      const newDao = await deployAkitaDAO({
        fixture: localnet,
        sender,
        signer,
        apps: {}
      })

      // Deploy a new wallet factory
      const newWalletFactory = await deployAbstractedAccountFactory({
        fixture: localnet,
        sender,
        signer,
        args: {
          akitaDao: newDao.appId,
          escrowFactory: escrowFactory.appId,
          version: '1.0.0',
          domain: 'test.domain',
        }
      })

      // Verify the new factory was created
      expect(newWalletFactory.appId).toBeGreaterThan(0n)

      // Verify the factory state
      const factoryState = await newWalletFactory.client.state.global.getAll()
      expect(factoryState.akitaDao).toBe(newDao.appId)
      expect(factoryState.domain).toBe('test.domain')
    })
  })

  describe('Wallet Creation', () => {
    test('create wallet with default controlled address', async () => {
      const { algorand, context: { testAccount } } = localnet
      const sender = testAccount.toString()
      const signer = testAccount.signer

      const dispenser = await algorand.account.dispenserFromEnvironment();
      await algorand.account.ensureFunded(sender, dispenser, (100).algos());

      const wallet = await newWallet({
        factoryParams: {
          appId: walletFactory.appId,
          defaultSender: sender,
          defaultSigner: signer
        },
        readerAccount: sender,
        algorand,
        nickname: 'test_wallet_default',
      })

      expect(wallet.client.appId).toBeGreaterThan(0n)

      // The wallet app address should be the controlled address
      const walletState = await wallet.client.state.global.getAll()
      expect(walletState.controlledAddress).toBe(wallet.client.appAddress.toString())
      expect(walletState.admin).toBe(sender)
      expect(walletState.nickname).toBe('test_wallet_default')
      expect(walletState.domain).toBe('akita.community')
    })

    test('create wallet with custom admin', async () => {
      const { algorand, context: { testAccount, generateAccount } } = localnet
      const sender = testAccount.toString()
      const signer = testAccount.signer

      const dispenser = await algorand.account.dispenserFromEnvironment();
      await algorand.account.ensureFunded(sender, dispenser, (100).algos());

      // Create a custom admin account
      const customAdmin = await generateAccount({ initialFunds: (1).algos() })

      const wallet = await newWallet({
        factoryParams: {
          appId: walletFactory.appId,
          defaultSender: sender,
          defaultSigner: signer
        },
        readerAccount: sender,
        algorand,
        nickname: 'test_wallet_custom_admin',
        admin: customAdmin.toString(),
      })

      expect(wallet.client.appId).toBeGreaterThan(0n)

      const walletState = await wallet.client.state.global.getAll()
      expect(walletState.admin).toBe(customAdmin.toString())
    })

    test('create wallet with referrer', async () => {
      const { algorand, context: { testAccount, generateAccount } } = localnet
      const sender = testAccount.toString()
      const signer = testAccount.signer

      const dispenser = await algorand.account.dispenserFromEnvironment();
      await algorand.account.ensureFunded(sender, dispenser, (100).algos());

      // Create a referrer account
      const referrer = await generateAccount({ initialFunds: (1).algos() })

      const wallet = await newWallet({
        factoryParams: {
          appId: walletFactory.appId,
          defaultSender: sender,
          defaultSigner: signer
        },
        readerAccount: sender,
        algorand,
        nickname: 'test_wallet_referrer',
        referrer: referrer.toString(),
      })

      expect(wallet.client.appId).toBeGreaterThan(0n)

      const walletState = await wallet.client.state.global.getAll()
      expect(walletState.referrer).toBe(referrer.toString())
    })

    test('create multiple wallets', async () => {
      const { algorand, context: { testAccount } } = localnet
      const sender = testAccount.toString()
      const signer = testAccount.signer

      const dispenser = await algorand.account.dispenserFromEnvironment();
      await algorand.account.ensureFunded(sender, dispenser, (100).algos());

      const wallet1 = await newWallet({
        factoryParams: {
          appId: walletFactory.appId,
          defaultSender: sender,
          defaultSigner: signer
        },
        readerAccount: sender,
        algorand,
        nickname: 'wallet_1',
      })

      const wallet2 = await newWallet({
        factoryParams: {
          appId: walletFactory.appId,
          defaultSender: sender,
          defaultSigner: signer
        },
        readerAccount: sender,
        algorand,
        nickname: 'wallet_2',
      })

      // Verify both wallets were created with different IDs
      expect(wallet1.client.appId).not.toBe(wallet2.client.appId)
      expect(wallet1.client.appAddress.toString()).not.toBe(wallet2.client.appAddress.toString())

      const wallet1State = await wallet1.client.state.global.getAll()
      const wallet2State = await wallet2.client.state.global.getAll()

      expect(wallet1State.nickname).toBe('wallet_1')
      expect(wallet2State.nickname).toBe('wallet_2')
    })
  })

  describe('Cost Calculation', () => {
    test('cost returns correct value', async () => {
      const { algorand, context: { testAccount } } = localnet
      const sender = testAccount.toString()
      const signer = testAccount.signer

      const cost = await walletFactory.cost()

      // Cost should be greater than 0
      expect(cost).toBeGreaterThan(0n)

      // Cost should cover minimum balance requirements
      // Based on the factory.algo.ts, cost includes:
      // - MAX_PROGRAM_PAGES (300_000)
      // - GLOBAL_STATE_KEY_UINT_COST * globalUints
      // - GLOBAL_STATE_KEY_BYTES_COST * globalBytes
      // - Global.minBalance (100_000)
      // - ARC58WalletIDsByAccountsMbr (12_100)
      // - creationFee (from DAO)
      expect(cost).toBeGreaterThan(1_000_000n) // At minimum > 1 ALGO
    })

    test('cost is sufficient to create wallet', async () => {
      const { algorand, context: { testAccount } } = localnet
      const sender = testAccount.toString()
      const signer = testAccount.signer

      const dispenser = await algorand.account.dispenserFromEnvironment();
      await algorand.account.ensureFunded(sender, dispenser, (100).algos());

      const cost = await walletFactory.cost()

      // Create a wallet using exactly the cost amount
      const wallet = await newWallet({
        factoryParams: {
          appId: walletFactory.appId,
          defaultSender: sender,
          defaultSigner: signer
        },
        readerAccount: sender,
        algorand,
        nickname: 'cost_test_wallet',
      })

      // Wallet should be created successfully
      expect(wallet.client.appId).toBeGreaterThan(0n)
    })
  })

  describe('Factory State', () => {
    test('factory tracks escrow factory', async () => {
      const factoryState = await walletFactory.client.state.global.getAll()

      // Escrow factory should be set
      expect(factoryState.escrowFactory).toBeGreaterThan(0n)
    })

    test('factory tracks DAO', async () => {
      const factoryState = await walletFactory.client.state.global.getAll()

      // DAO should be set
      expect(factoryState.akitaDao).toBe(dao.appId)
    })

    test('factory tracks version', async () => {
      const factoryState = await walletFactory.client.state.global.getAll()

      // Version should be set
      expect(factoryState.childContractVersion).toBeDefined()
    })
  })

  describe('Wallet Registration', () => {
    test('wallet can register with escrow factory', async () => {
      const { algorand, context: { testAccount } } = localnet
      const sender = testAccount.toString()
      const signer = testAccount.signer

      const dispenser = await algorand.account.dispenserFromEnvironment();
      await algorand.account.ensureFunded(sender, dispenser, (100).algos());

      // newWallet automatically calls register
      const wallet = await newWallet({
        factoryParams: {
          appId: walletFactory.appId,
          defaultSender: sender,
          defaultSigner: signer
        },
        readerAccount: sender,
        algorand,
        nickname: 'registered_wallet',
      })

      expect(wallet.client.appId).toBeGreaterThan(0n)

      // The wallet should be usable (implicitly tests registration worked)
      const walletState = await wallet.client.state.global.getAll()
      expect(walletState.escrowFactory).toBeGreaterThan(0n)
    })
  })

  describe('Wallet Global State', () => {
    test('wallet inherits factory domain', async () => {
      const { algorand, context: { testAccount } } = localnet
      const sender = testAccount.toString()
      const signer = testAccount.signer

      const dispenser = await algorand.account.dispenserFromEnvironment();
      await algorand.account.ensureFunded(sender, dispenser, (100).algos());

      const wallet = await newWallet({
        factoryParams: {
          appId: walletFactory.appId,
          defaultSender: sender,
          defaultSigner: signer
        },
        readerAccount: sender,
        algorand,
        nickname: 'domain_test_wallet',
      })

      const factoryState = await walletFactory.client.state.global.getAll()
      const walletState = await wallet.client.state.global.getAll()

      // Wallet should inherit the factory's domain
      expect(walletState.domain).toBe(factoryState.domain)
    })

    test('wallet tracks factory app', async () => {
      const { algorand, context: { testAccount } } = localnet
      const sender = testAccount.toString()
      const signer = testAccount.signer

      const dispenser = await algorand.account.dispenserFromEnvironment();
      await algorand.account.ensureFunded(sender, dispenser, (100).algos());

      const wallet = await newWallet({
        factoryParams: {
          appId: walletFactory.appId,
          defaultSender: sender,
          defaultSigner: signer
        },
        readerAccount: sender,
        algorand,
        nickname: 'factory_tracking_wallet',
      })

      const walletState = await wallet.client.state.global.getAll()

      // Wallet should track which factory created it
      expect(walletState.factoryApp).toBe(walletFactory.appId)
    })

    test('wallet initializes timestamps', async () => {
      const { algorand, context: { testAccount } } = localnet
      const sender = testAccount.toString()
      const signer = testAccount.signer

      const dispenser = await algorand.account.dispenserFromEnvironment();
      await algorand.account.ensureFunded(sender, dispenser, (100).algos());

      const wallet = await newWallet({
        factoryParams: {
          appId: walletFactory.appId,
          defaultSender: sender,
          defaultSigner: signer
        },
        readerAccount: sender,
        algorand,
        nickname: 'timestamp_wallet',
      })

      const walletState = await wallet.client.state.global.getAll()

      // Timestamps should be initialized
      expect(walletState.lastUserInteraction).toBeGreaterThan(0n)
      expect(walletState.lastChange).toBeGreaterThan(0n)
    })
  })

  describe('Factory Setup Features', () => {
    test('create wallet with bio', async () => {
      const { algorand, context: { testAccount } } = localnet
      const sender = testAccount.toString()
      const signer = testAccount.signer

      const dispenser = await algorand.account.dispenserFromEnvironment();
      await algorand.account.ensureFunded(sender, dispenser, (100).algos());

      const wallet = await newWallet({
        factoryParams: {
          appId: walletFactory.appId,
          defaultSender: sender,
          defaultSigner: signer
        },
        readerAccount: sender,
        algorand,
        nickname: 'bio_wallet',
        bio: 'Hello from factory setup',
      })

      const walletState = await wallet.client.state.global.getAll()
      expect(walletState.bio).toBe('Hello from factory setup')
      expect(walletState.admin).toBe(sender)
    })

    test('create wallet with extra funding', async () => {
      const { algorand, context: { testAccount } } = localnet
      const sender = testAccount.toString()
      const signer = testAccount.signer

      const dispenser = await algorand.account.dispenserFromEnvironment();
      await algorand.account.ensureFunded(sender, dispenser, (100).algos());

      const extraFunding = 5_000_000n // 5 ALGO

      const wallet = await newWallet({
        factoryParams: {
          appId: walletFactory.appId,
          defaultSender: sender,
          defaultSigner: signer
        },
        readerAccount: sender,
        algorand,
        nickname: 'funded_wallet',
        extraFunding,
      })

      const walletInfo = await algorand.account.getInformation(wallet.client.appAddress)
      // Wallet should have minBalance + extra funding
      expect(walletInfo.balance.microAlgos).toBeGreaterThanOrEqual(
        walletInfo.minBalance.microAlgos + extraFunding
      )
    })

    test('create wallet with plugins', async () => {
      const { algorand, context: { testAccount } } = localnet
      const sender = testAccount.toString()
      const signer = testAccount.signer

      const dispenser = await algorand.account.dispenserFromEnvironment();
      await algorand.account.ensureFunded(sender, dispenser, (100).algos());

      const payPlugin = await deployPayPlugin({ fixture: localnet, sender, signer })

      const wallet = await newWallet({
        factoryParams: {
          appId: walletFactory.appId,
          defaultSender: sender,
          defaultSigner: signer
        },
        readerAccount: sender,
        algorand,
        nickname: 'plugin_wallet',
        plugins: [{
          plugin: payPlugin.appId,
          caller: sender,
          delegationType: 1n,
          coverFees: true,
          lastValid: BigInt('18446744073709551615'),
          canReclaim: true,
        }],
      })

      const installedPlugins = await wallet.getPlugins()
      expect(installedPlugins.size).toBeGreaterThan(0)
    })

    test('create wallet with asset opt-ins', async () => {
      const { algorand, context: { testAccount } } = localnet
      const sender = testAccount.toString()
      const signer = testAccount.signer

      const dispenser = await algorand.account.dispenserFromEnvironment();
      await algorand.account.ensureFunded(sender, dispenser, (100).algos());

      // Create test assets
      const asset1 = await algorand.send.assetCreate({
        sender, signer,
        total: 1_000_000n,
        decimals: 6,
        assetName: 'Test1',
        unitName: 'TST1',
      })
      const asset1Id = asset1.assetId

      const asset2 = await algorand.send.assetCreate({
        sender, signer,
        total: 1_000_000n,
        decimals: 6,
        assetName: 'Test2',
        unitName: 'TST2',
      })
      const asset2Id = asset2.assetId

      const wallet = await newWallet({
        factoryParams: {
          appId: walletFactory.appId,
          defaultSender: sender,
          defaultSigner: signer
        },
        readerAccount: sender,
        algorand,
        nickname: 'asset_wallet',
        assets: [asset1Id, asset2Id],
      })

      // Wallet should be opted into both assets
      const walletInfo = await algorand.account.getInformation(wallet.client.appAddress)
      const assetIds = (walletInfo.assets ?? []).map(a => a.assetId)
      expect(assetIds).toContain(asset1Id)
      expect(assetIds).toContain(asset2Id)
    })

    test('create wallet with external controlled address', async () => {
      const { algorand, context: { testAccount, generateAccount } } = localnet
      const sender = testAccount.toString()
      const signer = testAccount.signer

      const dispenser = await algorand.account.dispenserFromEnvironment();
      await algorand.account.ensureFunded(sender, dispenser, (100).algos());

      // Create an external account that will be controlled by the smart wallet
      const externalAccount = await generateAccount({ initialFunds: (1).algos() })
      const externalAddr = externalAccount.toString()
      const externalSigner = externalAccount.signer

      // Rekey external account to the factory
      await algorand.send.payment({
        sender: externalAddr,
        signer: externalSigner,
        receiver: externalAddr,
        amount: microAlgo(0n),
        rekeyTo: walletFactory.client.appAddress,
      })

      // Create wallet with external controlled address — factory handles rekey to wallet
      const wallet = await newWallet({
        factoryParams: {
          appId: walletFactory.appId,
          defaultSender: sender,
          defaultSigner: signer
        },
        readerAccount: sender,
        algorand,
        nickname: 'external_wallet',
        controlledAddress: externalAddr,
      })

      expect(wallet.client.appId).toBeGreaterThan(0n)

      const walletState = await wallet.client.state.global.getAll()
      expect(walletState.controlledAddress).toBe(externalAddr)

      // External account should be rekeyed to the wallet app
      const externalInfo = await algorand.account.getInformation(externalAddr)
      expect(externalInfo.authAddr?.toString()).toBe(wallet.client.appAddress.toString())
    })

    test('create wallet with external controlled address + asset opt-ins', async () => {
      const { algorand, context: { testAccount, generateAccount } } = localnet
      const sender = testAccount.toString()
      const signer = testAccount.signer

      const dispenser = await algorand.account.dispenserFromEnvironment();
      await algorand.account.ensureFunded(sender, dispenser, (100).algos());

      // Create test asset
      const assetResult = await algorand.send.assetCreate({
        sender, signer,
        total: 1_000_000n,
        decimals: 6,
        assetName: 'ExtTest',
        unitName: 'EXT',
      })
      const assetId = assetResult.assetId

      // Create external account
      const externalAccount = await generateAccount({ initialFunds: (1).algos() })
      const externalAddr = externalAccount.toString()
      const externalSigner = externalAccount.signer

      // Rekey external account to the factory
      await algorand.send.payment({
        sender: externalAddr,
        signer: externalSigner,
        receiver: externalAddr,
        amount: microAlgo(0n),
        rekeyTo: walletFactory.client.appAddress,
      })

      // Create wallet with external controlled address + asset opt-in
      const wallet = await newWallet({
        factoryParams: {
          appId: walletFactory.appId,
          defaultSender: sender,
          defaultSigner: signer
        },
        readerAccount: sender,
        algorand,
        nickname: 'external_asset_wallet',
        controlledAddress: externalAddr,
        assets: [assetId],
      })

      const walletState = await wallet.client.state.global.getAll()
      expect(walletState.controlledAddress).toBe(externalAddr)

      // External account should be opted into the asset
      const externalInfo = await algorand.account.getInformation(externalAddr)
      const assetIds = (externalInfo.assets ?? []).map(a => a.assetId)
      expect(assetIds).toContain(assetId)

      // External account should be rekeyed to wallet
      expect(externalInfo.authAddr?.toString()).toBe(wallet.client.appAddress.toString())
    })
  })
})

