import { Config } from '@algorandfoundation/algokit-utils';
import { registerDebugEventHandlers } from '@algorandfoundation/algokit-utils-debug';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { afterAll, beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { AkitaDaoSDK } from 'akita-sdk/dao';
import { newWallet, WalletFactorySDK, CallerType, PayPluginSDK } from 'akita-sdk/wallet';
import { microAlgo } from '@algorandfoundation/algokit-utils';
import { deployPayPlugin } from '../../../tests/fixtures/plugins/pay';
import { deployAbstractedAccountFactory } from '../../../tests/fixtures/abstracted-account';
import { AkitaUniverse, buildAkitaUniverse, deployAkitaDAO } from '../../../tests/fixtures/dao';
import { deployEscrowFactory } from '../../../tests/fixtures/escrow';
import { ProposalActionEnum } from 'akita-sdk/dao';
import { ALGORAND_ZERO_ADDRESS_STRING, generateAccount as randomAccount, getApplicationAddress } from 'algosdk';
import { proposeAndExecute } from '../../../scripts/utils';
import { assertUnregistered } from '../../../tests/fixtures/unregistered-wallet';
import { RewardsSDK } from 'akita-sdk/rewards';
import { TimeWarp } from '../../../tests/utils/time';

describe('ARC58 Factory', () => {
  const localnet = algorandFixture();

  let dao: AkitaDaoSDK;
  /** the wallet factory contract sdk */
  let walletFactory: WalletFactorySDK;
  /** the whole universe (rewards app, escrow factory) */
  let universe: AkitaUniverse;

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
    await algorand.account.ensureFunded(sender, dispenser.addr, (100).algos());

    universe = await buildAkitaUniverse({
      fixture: localnet,
      sender,
      signer,
      apps: {}
    });
    ({ dao, walletFactory } = universe);
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
      await algorand.account.ensureFunded(sender, dispenser.addr, (100).algos());

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
      await algorand.account.ensureFunded(sender, dispenser.addr, (100).algos());

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
      await algorand.account.ensureFunded(sender, dispenser.addr, (100).algos());

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
      await algorand.account.ensureFunded(sender, dispenser.addr, (100).algos());

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
      await algorand.account.ensureFunded(sender, dispenser.addr, (100).algos());

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
      await algorand.account.ensureFunded(sender, dispenser.addr, (100).algos());

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
    // Principal resolution Phase 3 (spec §6.10): the SDK no longer writes the EscrowFactory reverse
    // registry. Registration stays available as an explicit legacy opt-in until Phase 4.
    test('newWallet does not register the wallet by default', async () => {
      const { algorand, context: { testAccount } } = localnet
      const sender = testAccount.toString()
      const signer = testAccount.signer

      const dispenser = await algorand.account.dispenserFromEnvironment();
      await algorand.account.ensureFunded(sender, dispenser.addr, (100).algos());

      const wallet = await newWallet({
        factoryParams: {
          appId: walletFactory.appId,
          defaultSender: sender,
          defaultSigner: signer
        },
        readerAccount: sender,
        algorand,
        nickname: 'unregistered_wallet',
      })

      expect(wallet.client.appId).toBeGreaterThan(0n)
      await assertUnregistered(universe.escrowFactory, [wallet.client.appAddress])

      // the factory still pre-funds the registration MBR (removed in Phase 4)
      const info = await algorand.account.getInformation(wallet.client.appAddress)
      expect(info.balance.microAlgos - info.minBalance.microAlgos).toBe(12_100n)
    })

    test('wallet can still register with the escrow factory when the caller opts in (legacy)', async () => {
      const { algorand, context: { testAccount } } = localnet
      const sender = testAccount.toString()
      const signer = testAccount.signer

      const dispenser = await algorand.account.dispenserFromEnvironment();
      await algorand.account.ensureFunded(sender, dispenser.addr, (100).algos());

      const wallet = await newWallet({
        factoryParams: {
          appId: walletFactory.appId,
          defaultSender: sender,
          defaultSigner: signer
        },
        readerAccount: sender,
        algorand,
        nickname: 'registered_wallet',
        register: true,
      })

      expect(await universe.escrowFactory.exists({ args: { address: wallet.client.appAddress.toString() } })).toBe(true)
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
      await algorand.account.ensureFunded(sender, dispenser.addr, (100).algos());

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
      await algorand.account.ensureFunded(sender, dispenser.addr, (100).algos());

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
      await algorand.account.ensureFunded(sender, dispenser.addr, (100).algos());

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
      await algorand.account.ensureFunded(sender, dispenser.addr, (100).algos());

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
      await algorand.account.ensureFunded(sender, dispenser.addr, (100).algos());

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
      await algorand.account.ensureFunded(sender, dispenser.addr, (100).algos());

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
          // ACC-02: fee cover needs a specific caller (a grant anyone can call cannot have it)
          cooldown: 1n,
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
      await algorand.account.ensureFunded(sender, dispenser.addr, (100).algos());

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
      await algorand.account.ensureFunded(sender, dispenser.addr, (100).algos());

      // Create an external account that will be controlled by the smart wallet
      const externalAccount = await generateAccount({ initialFunds: (1).algos() })
      const externalAddr = externalAccount.toString()
      const externalSigner = externalAccount.signer

      // SG-04: the SDK rekeys the external account to the factory inside the creation group
      // (a rekey made in an earlier group is rejected with errCnap)

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
        controlledSigner: externalSigner,
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
      await algorand.account.ensureFunded(sender, dispenser.addr, (100).algos());

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

      // SG-04: the SDK rekeys the external account to the factory inside the creation group
      // (a rekey made in an earlier group is rejected with errCnap)

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
        controlledSigner: externalSigner,
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
  // P2-ACC-01 (principal-resolution spec §6.1, Q1-A2): the creation referral pays the `referrer`
  // ARGUMENT from the creation fee (DAO share). The payer pays exactly cost(), with no referral MBR;
  // the cut is skipped when the fee cannot cover cut + disbursement MBR.
  describe('Creation referral (Q1-A2)', () => {
    /** MinDisbursementsMBR (v2, with the reclaimTo field) + UserAllocationMBR: one single-allocation ALGO referral disbursement */
    const DISBURSEMENT_MBR = 54_500n + 25_300n
    const REFERRER_PERCENTAGE = 20_000n // 20%

    const setWalletFees = async (createFee: bigint) => {
      await proposeAndExecute(localnet.algorand, dao, [{
        type: ProposalActionEnum.UpdateFields,
        field: 'wallet_fees', value: { createFee, referrerPercentage: REFERRER_PERCENTAGE },
      }])
    }

    const balanceOf = async (address: string) => (await localnet.algorand.account.getInformation(address)).balance.microAlgos

    const daoEscrowAddress = async () => {
      const escrow = await walletFactory.client.state.global.akitaDaoEscrow()
      expect(escrow).toBeDefined()
      return getApplicationAddress(escrow!.app).toString()
    }

    /** create a wallet and return the balance deltas of the payer, the rewards app and the DAO escrow */
    const createAndMeasure = async (referrer: string) => {
      const { algorand, context: { testAccount } } = localnet
      const sender = testAccount.toString()
      const dispenser = await algorand.account.dispenserFromEnvironment()
      await algorand.account.ensureFunded(sender, dispenser.addr, (20).algos())
      const rewardsAddress = getApplicationAddress(universe.rewards.appId).toString()
      const escrowAddress = await daoEscrowAddress()
      const cost = await walletFactory.cost()

      const rewardsBefore = await balanceOf(rewardsAddress)
      const escrowBefore = await balanceOf(escrowAddress)

      // WalletFactorySDK.new pays exactly cost() (+ no extras here): the contract's payment equality
      // has no referral MBR term any more (Q1-A2), so this succeeds only if cost() is the full price
      const wallet = await walletFactory.new({ sender, signer: testAccount.signer, nickname: 'a2', referrer })
      const created = await algorand.client.algod.getApplicationByID(wallet.client.appId).do()
      expect(created.params?.creator?.toString()).toBe(walletFactory.client.appAddress.toString())

      return {
        wallet,
        cost,
        rewardsDelta: (await balanceOf(rewardsAddress)) - rewardsBefore,
        escrowDelta: (await balanceOf(escrowAddress)) - escrowBefore,
      }
    }

    afterAll(async () => {
      await setWalletFees(0n)
    })

    test('cost() is caller-independent and has no referral term', async () => {
      const createFee = 100_000n
      await setWalletFees(0n)
      const base = await walletFactory.cost()
      await setWalletFees(createFee)
      const asDeployer = await walletFactory.cost()
      const stranger = (await localnet.context.generateAccount({ initialFunds: (1).algos() })).toString()
      const asStranger = await walletFactory.cost({ sender: stranger })
      expect(asDeployer).toBe(base + createFee)
      expect(asStranger).toBe(asDeployer)
    })

    test('a referrer argument (any address, not a wallet) is paid its cut out of the creation fee', async () => {
      const createFee = 200_000n // 40,000 cut + 79,800 referral MBR fit
      await setWalletFees(createFee)
      const referrer = randomAccount().addr.toString()
      const cut = (createFee * REFERRER_PERCENTAGE) / 100_000n

      const { wallet, rewardsDelta, escrowDelta } = await createAndMeasure(referrer)

      // cut + its disbursement MBR land in the rewards app; the DAO keeps the rest of the fee
      expect(rewardsDelta).toBe(cut + DISBURSEMENT_MBR)
      expect(escrowDelta).toBe(createFee - cut - DISBURSEMENT_MBR)
      expect(await wallet.client.state.global.referrer()).toBe(referrer)
    })

    test('no cut when the fee cannot cover cut + disbursement MBR (no underflow)', async () => {
      // one below the threshold: 19,949 cut + 79,800 MBR = 99,749 > 99,748 (the v1 MBR would have paid the cut)
      const createFee = 99_748n
      await setWalletFees(createFee)
      const referrer = randomAccount().addr.toString()

      const { rewardsDelta, escrowDelta } = await createAndMeasure(referrer)

      expect(rewardsDelta).toBe(0n)
      expect(escrowDelta).toBe(createFee)
    })

    test('boundary: a fee exactly equal to cut + disbursement MBR pays the cut and leaves the DAO nothing', async () => {
      // fee = 0.2 * fee + 79,800  =>  fee = 99,750
      const createFee = 99_750n
      await setWalletFees(createFee)
      const referrer = randomAccount().addr.toString()

      const { rewardsDelta, escrowDelta } = await createAndMeasure(referrer)

      expect(rewardsDelta).toBe(createFee)
      expect(escrowDelta).toBe(0n)
    })

    test('an unclaimed creation referral is swept to the factory\'s DAO escrow after 30 days; a claimed one only returns its MBR', async () => {
      const { algorand } = localnet
      const createFee = 1_000_000n
      await setWalletFees(createFee)
      const cut = (createFee * REFERRER_PERCENTAGE) / 100_000n
      const rewards = new RewardsSDK({ algorand, factoryParams: { appId: universe.rewards.appId, defaultSender: localnet.context.testAccount.toString(), defaultSigner: localnet.context.testAccount.signer } })
      const claimer = await localnet.context.generateAccount({ initialFunds: (1).algos() })
      const keeper = await localnet.context.generateAccount({ initialFunds: (1).algos() })
      const escrowAddress = await daoEscrowAddress()

      const { disbursementId: claimed } = await rewards.getState()
      await createAndMeasure(claimer.addr.toString())
      const unclaimed = claimed + 1n
      await createAndMeasure(randomAccount().addr.toString())
      for (const id of [claimed, unclaimed]) {
        expect(await rewards.getReclaimTarget({ id })).toBe(escrowAddress)
        expect((await rewards.getDisbursement({ id })).creator).toBe(walletFactory.client.appAddress.toString())
      }

      const timeWarp = new TimeWarp(algorand)
      await timeWarp.timeWarp(29n * 86_400n)
      await rewards.claimRewards({ sender: claimer.addr, signer: claimer.signer, rewards: [{ id: claimed, asset: 0n }] })
      await timeWarp.timeWarp(2n * 86_400n)

      let before = await balanceOf(escrowAddress)
      await rewards.sweepExpired({ sender: keeper.addr, signer: keeper.signer, id: unclaimed })
      expect(await balanceOf(escrowAddress) - before).toBe(cut + DISBURSEMENT_MBR)

      before = await balanceOf(escrowAddress)
      await rewards.sweepExpired({ sender: keeper.addr, signer: keeper.signer, id: claimed })
      expect(await balanceOf(escrowAddress) - before).toBe(DISBURSEMENT_MBR)
    })

    test('the zero referrer pays no cut; the whole fee goes to the DAO escrow', async () => {
      const createFee = 100_000n
      await setWalletFees(createFee)

      const { rewardsDelta, escrowDelta } = await createAndMeasure(ALGORAND_ZERO_ADDRESS_STRING)

      expect(rewardsDelta).toBe(0n)
      expect(escrowDelta).toBe(createFee)
    })

    test('cost() ignores the payer\'s registered wallet referrer (no registry lookup)', async () => {
      const createFee = 100_000n
      await setWalletFees(0n)
      const { algorand, context: { testAccount } } = localnet
      const sender = testAccount.toString()
      // a REGISTERED wallet with a referrer: legacy cost() added a disbursement MBR for this caller
      const payer = await newWallet({
        factoryParams: { appId: walletFactory.appId, defaultSender: sender, defaultSigner: testAccount.signer },
        readerAccount: sender,
        algorand,
        nickname: 'registered_payer',
        referrer: randomAccount().addr.toString(),
        register: true,
      })
      expect(await universe.escrowFactory.exists({ args: { address: payer.client.appAddress.toString() } })).toBe(true)
      // the simulated cost() call is sent from the payer's app account: give it fee headroom
      await payer.client.appClient.fundAppAccount({ amount: (1).algos() })
      await setWalletFees(createFee)

      expect(await walletFactory.cost({ sender: payer.client.appAddress.toString() })).toBe(await walletFactory.cost())
    })
  })
})

