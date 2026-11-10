import { Config, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { ALGORAND_ZERO_ADDRESS_STRING, getApplicationAddress } from 'algosdk'
import { afterAll, beforeAll, beforeEach, describe, expect, test } from 'vitest'
import { CallerType, newWallet, WalletFactorySDK, WalletSDK, WelcomePluginSDK } from 'akita-sdk/wallet'
import type { GroupReturn, PluginSDKReturn } from 'akita-sdk'
import { ProposalActionEnum } from 'akita-sdk/dao'
import { deployAbstractedAccountFactory } from '../../../../tests/fixtures/abstracted-account'
import { buildAkitaUniverse, deployAkitaDAO } from '../../../../tests/fixtures/dao'
import { proposeAndExecute } from '../../../../scripts/utils'
import { deployEscrowFactory } from '../../../../tests/fixtures/escrow'
import { WelcomePluginFactory } from '../../../artifacts/arc58/plugins/welcome/WelcomePluginClient'
import { AbstractedAccountMbrFactory } from '../../../artifacts/arc58/account/AbstractedAccountMBRClient'

// ARC58WalletIDsByAccountsMbr: newAccount still pre-funds it (Phase 4 removes it); the legacy
// register() spends it. Principal resolution needs no registration, so the SDK no longer registers.
const REGISTRATION_MBR = 12_100n
/** MinDisbursementsMBR (v2, with the reclaimTo field) + UserAllocationMBR: one single-allocation ALGO referral disbursement */
const DISBURSEMENT_MBR = 54_500n + 25_300n

describe('WelcomePlugin', () => {
  const fixture = algorandFixture()
  let factory: WalletFactorySDK
  let plugin: WelcomePluginSDK
  let wallet: WalletSDK
  let sender: string
  let recipient: string
  const salt = new Uint8Array(32).fill(7)
  const previousMbr = process.env.WALLET_MBR_APP_ID

  afterAll(() => {
    if (previousMbr === undefined) delete process.env.WALLET_MBR_APP_ID
    else process.env.WALLET_MBR_APP_ID = previousMbr
  })

  beforeAll(async () => {
    Config.configure({ debug: true, populateAppCallResources: true })
    await fixture.newScope()
    const { algorand, testAccount } = fixture.context
    const sender = testAccount.toString()
    const signer = testAccount.signer
    const dispenser = await algorand.account.dispenserFromEnvironment()
    await algorand.account.ensureFunded(sender, dispenser.addr, (100).algos())
    const { appClient: mbr } = await algorand.client.getTypedAppFactory(AbstractedAccountMbrFactory, {
      defaultSender: sender, defaultSigner: signer,
    }).send.create.bare()
    process.env.WALLET_MBR_APP_ID = mbr.appId.toString()
    const escrow = await deployEscrowFactory({ fixture, sender, signer })
    const dao = await deployAkitaDAO({ fixture, sender, signer, apps: { escrow: escrow.appId } })
    factory = await deployAbstractedAccountFactory({
      fixture, sender, signer, args: { akitaDao: dao.appId, escrowFactory: escrow.appId },
    })
    const { appClient } = await algorand.client.getTypedAppFactory(WelcomePluginFactory, {
      defaultSender: sender, defaultSigner: signer,
    }).send.create.create({ args: { factory: factory.appId } })
    plugin = new WelcomePluginSDK({
      algorand, readerAccount: sender,
      factoryParams: { appId: appClient.appId, defaultSender: sender, defaultSigner: signer },
    })
  })

  beforeEach(async () => {
    await fixture.newScope()
    const { algorand, testAccount, generateAccount } = fixture.context
    sender = testAccount.toString()
    const signer = testAccount.signer
    const dispenser = await algorand.account.dispenserFromEnvironment()
    await algorand.account.ensureFunded(sender, dispenser.addr, (100).algos())
    recipient = (await generateAccount({ initialFunds: (1).algos() })).toString()
    wallet = await newWallet({
      algorand, readerAccount: sender, nickname: 'Sponsor',
      factoryParams: { appId: factory.appId, defaultSender: sender, defaultSigner: signer },
    })
    await wallet.client.appClient.fundAppAccount({ amount: (30).algos() })
    await wallet.addPlugin({ client: plugin, callerType: CallerType.Admin })
    plugin.setSendParams({ sender, signer })
  })

  const args = (maxCost: bigint) => ({ admin: recipient, nickname: 'Welcome', salt, maxCost })
  const main = () => wallet.client.appAddress.toString()
  const quote = () => plugin.cost({ payer: main() })
  const balance = async (address: string) => (await fixture.algorand.account.getInformation(address)).balance.microAlgos
  const createdCount = async () => (await fixture.algorand.account.getInformation(factory.client.appAddress)).createdApps?.length ?? 0
  const childID = (result: GroupReturn) => {
    const id = (result.returns as unknown[]).find((r) => typeof r === 'bigint') as bigint | undefined
    expect(id).toBeDefined()
    return id!
  }
  const run = (call: PluginSDKReturn) => wallet.usePlugin({ callerType: CallerType.Admin, calls: [call] })
  const child = (id: bigint) => factory.get({ appId: id })

  test('sponsors only creation, needs no registration (legacy registerWallet still works), and restores control', async () => {
    const cost = await quote()
    const before = await balance(main())
    const id = childID(await run(plugin.sponsor(args(cost))))
    const state = await (await child(id)).client.state.global.getAll()
    expect(state.admin).toBe(recipient)
    expect(state.referrer).toBe(main())
    expect(before - await balance(main())).toBe(cost)
    expect((await fixture.algorand.account.getInformation(main())).authAddr).toBeUndefined()
    expect((await (await child(id)).client.state.box.plugins.getMap()).size).toBe(0)
    // No registration is needed (wallet hints); the child holds the pre-funded registration MBR,
    // which the explicit legacy registerWallet call still spends.
    const unregistered = await fixture.algorand.account.getInformation(getApplicationAddress(id))
    expect(unregistered.balance.microAlgos - unregistered.minBalance.microAlgos).toBe(REGISTRATION_MBR)
    await plugin.registerWallet({ walletId: id })
    const registered = await fixture.algorand.account.getInformation(getApplicationAddress(id))
    expect(registered.balance.microAlgos).toBe(registered.minBalance.microAlgos)
    await expect(plugin.registerWallet({ walletId: id })).rejects.toThrow()
  })

  test('sends the exact ALGO gift atomically', async () => {
    const amount = 500_000n
    const cost = await plugin.cost({ payer: main(), amount })
    const id = childID(await run(plugin.sendToAnyone({ ...args(cost), asset: 0n, amount })))
    const info = await fixture.algorand.account.getInformation(getApplicationAddress(id))
    // unregistered: the gift plus the (unused) pre-funded registration MBR
    expect(info.balance.microAlgos - info.minBalance.microAlgos).toBe(amount + REGISTRATION_MBR)
    expect((await (await child(id)).client.state.global.getAll()).admin).toBe(recipient)
    expect((await fixture.algorand.account.getInformation(main())).authAddr).toBeUndefined()
  })

  test('opts the child into an ASA and sends the exact gift', async () => {
    const { algorand } = fixture.context
    const result = await algorand.send.assetCreate({ sender, total: 100n, decimals: 0 })
    const asset = BigInt(result.confirmation.assetIndex!)
    wallet = await newWallet({
      algorand, readerAccount: sender, nickname: 'ASA sender', assets: [asset],
      factoryParams: { appId: factory.appId, defaultSender: sender, defaultSigner: fixture.context.testAccount.signer },
    })
    await wallet.client.appClient.fundAppAccount({ amount: (10).algos() })
    await wallet.addPlugin({ client: plugin, callerType: CallerType.Admin })
    await algorand.send.assetTransfer({ sender, receiver: main(), assetId: asset, amount: 20n })
    const cost = await plugin.cost({ payer: main(), asset, amount: 7n })
    expect(cost - await quote()).toBe(100_000n)
    const id = childID(await run(plugin.sendToAnyone({ ...args(cost), asset, amount: 7n })))
    expect((await algorand.asset.getAccountInformation(getApplicationAddress(id), asset)).balance).toBe(7n)
    expect((await algorand.asset.getAccountInformation(main(), asset)).balance).toBe(13n)
    expect((await algorand.account.getInformation(main())).authAddr).toBeUndefined()
  })

  for (const useMainWalletReferrer of [false, true]) {
    test(`escrow-funded creation uses ${useMainWalletReferrer ? 'main wallet' : 'spending escrow'} as referrer`, async () => {
      await wallet.addPlugin({ client: plugin, callerType: CallerType.Admin, escrow: 'well' })
      const escrow = await wallet.getEscrow('well')
      const payer = getApplicationAddress(escrow.id).toString()
      const cost = await plugin.cost({ payer })
      await fixture.algorand.send.payment({ sender, receiver: payer, amount: microAlgo(cost) })
      const id = childID(await wallet.usePlugin({
        callerType: CallerType.Admin, escrow: 'well',
        calls: [plugin.sponsor({ ...args(cost), useMainWalletReferrer })],
      }))
      expect(await (await child(id)).client.state.global.referrer()).toBe(useMainWalletReferrer ? main() : payer)
      expect((await fixture.algorand.account.getInformation(payer)).authAddr?.toString()).toBe(main())
    })
  }

  test('a Well delegate can mint once within its allowance but cannot send gifts or exceed the allowance', async () => {
    const delegate = await fixture.context.generateAccount({ initialFunds: (10).algos() })
    const cost = await quote()
    await wallet.addPlugin({
      client: plugin, caller: delegate.toString(), escrow: 'well', admin: false, canReclaim: false,
      methods: [{ name: plugin.sponsor(), cooldown: 0n }],
      allowances: [{ asset: 0n, type: 'flat', amount: cost }],
    })
    const use = (call: PluginSDKReturn) => wallet.usePlugin({
      sender: delegate.toString(), signer: delegate.signer, escrow: 'well',
      fundsRequest: [{ asset: 0n, amount: cost }], calls: [call],
    })
    const sendParams = { sender: delegate.toString(), signer: delegate.signer }
    await expect(use(plugin.sendToAnyone({ ...args(cost), ...sendParams, asset: 0n, amount: 1n }))).rejects.toThrow()
    childID(await use(plugin.sponsor({ ...args(cost), ...sendParams })))
    await expect(use(plugin.sponsor({ ...args(cost), ...sendParams }))).rejects.toThrow()
  })

  test('rejects an expired Well permission and an unauthorized caller', async () => {
    const delegate = await fixture.context.generateAccount({ initialFunds: (10).algos() })
    await wallet.addPlugin({ client: plugin, caller: delegate.toString(), escrow: 'expired', useRounds: true, lastValid: 1n })
    const cost = await quote()
    const call = plugin.sponsor({ ...args(cost), sender: delegate.toString(), signer: delegate.signer })
    await expect(wallet.usePlugin({ sender: delegate.toString(), signer: delegate.signer, escrow: 'expired', calls: [call] })).rejects.toThrow()
    await expect(wallet.usePlugin({ sender: delegate.toString(), signer: delegate.signer, callerType: CallerType.Admin, calls: [call] })).rejects.toThrow()
  })

  test('enforces the cost cap and rolls back rekeying and creation on failure', async () => {
    const count = await createdCount()
    const before = await balance(main())
    await expect(run(plugin.sponsor(args((await quote()) - 1n)))).rejects.toThrow(/welcomeCostLimitExceeded/)
    expect(await createdCount()).toBe(count)
    expect(await balance(main())).toBe(before)
    expect((await fixture.algorand.account.getInformation(main())).authAddr).toBeUndefined()
  })

  test('rolls back the new wallet when the final ASA transfer fails', async () => {
    const result = await fixture.algorand.send.assetCreate({ sender, total: 1n, decimals: 0 })
    const asset = BigInt(result.confirmation.assetIndex!)
    // The child can opt in, but the funding wallet does not hold this ASA.
    const count = await createdCount()
    const before = await balance(main())
    const cost = await plugin.cost({ payer: main(), asset, amount: 1n })
    await expect(run(plugin.sendToAnyone({ ...args(cost), asset, amount: 1n }))).rejects.toThrow()
    expect(await createdCount()).toBe(count)
    expect(await balance(main())).toBe(before)
    expect((await fixture.algorand.account.getInformation(main())).authAddr).toBeUndefined()
  })

  test('supports two creations in one rekey sandwich', async () => {
    const cost = await quote()
    const before = await balance(main())
    const result = await wallet.usePlugin({
      callerType: CallerType.Admin,
      calls: [plugin.sponsor({ ...args(cost), rekeyBack: false }), plugin.sponsor(args(cost))],
    })
    expect((result.returns as unknown[]).filter((r) => typeof r === 'bigint')).toHaveLength(2)
    expect(before - await balance(main())).toBe(cost * 2n)
    expect((await fixture.algorand.account.getInformation(main())).authAddr).toBeUndefined()
  })

  test('rejects a zero admin, empty gift, and calls without an active wallet', async () => {
    const cost = await quote()
    await expect(run(plugin.sponsor({ ...args(cost), admin: ALGORAND_ZERO_ADDRESS_STRING }))).rejects.toThrow(/welcomeInvalidAdmin/)
    await expect(run(plugin.sendToAnyone({ ...args(cost), asset: 0n, amount: 0n }))).rejects.toThrow(/welcomeEmptyGift/)
    await expect(plugin.client.send.sponsor({
      sender, signer: fixture.context.testAccount.signer,
      args: { ...args(cost), wallet: wallet.appId, rekeyBack: true, useMainWalletReferrer: false },
    })).rejects.toThrow(/welcomeInactiveWallet/)
  })

  // Q1-A2 (spec §6.1, P2-ACC-01 through the plugin): the referral cut goes to the referrer ARGUMENT
  // (here the spending account), never to the payer's registered wallet referrer, and every payer
  // pays the same quote (no referral MBR on top of factory.cost()).
  test('Q1-A2: quotes are payer-independent and the cut goes to the referrer argument, not the payer registry', async () => {
    const { algorand, testAccount } = fixture.context
    const signer = testAccount.signer
    const dispenser = await algorand.account.dispenserFromEnvironment()
    await algorand.account.ensureFunded(sender, dispenser.addr, (2000).algos())
    const universe = await buildAkitaUniverse({ fixture, sender, signer, apps: {} })
    const { appClient } = await algorand.client.getTypedAppFactory(WelcomePluginFactory, {
      defaultSender: sender, defaultSigner: signer,
    }).send.create.create({ args: { factory: universe.walletFactory.appId } })
    const welcome = new WelcomePluginSDK({
      algorand, readerAccount: sender,
      factoryParams: { appId: appClient.appId, defaultSender: sender, defaultSigner: signer },
    })
    const payers: WalletSDK[] = []
    for (const referrer of [ALGORAND_ZERO_ADDRESS_STRING, sender]) {
      // REGISTERED payers: under the legacy rule the second one's referrer would have been paid
      const payer = await newWallet({
        algorand, nickname: 'Fee payer', referrer, readerAccount: sender, register: true,
        factoryParams: { appId: universe.walletFactory.appId, defaultSender: sender, defaultSigner: signer },
      })
      await payer.client.appClient.fundAppAccount({ amount: (10).algos() })
      await payer.addPlugin({ client: welcome, callerType: CallerType.Admin })
      payers.push(payer)
    }
    const baseCost = await welcome.cost({ payer: payers[0].client.appAddress.toString() })
    const createFee = 200_000n // covers the 40,000 cut + 79,800 referral MBR
    const cut = 40_000n // 20% of createFee
    await proposeAndExecute(algorand, universe.dao, [{
      type: ProposalActionEnum.UpdateFields,
      field: 'wallet_fees', value: { createFee, referrerPercentage: 20_000n },
    }])
    const rewards = getApplicationAddress(universe.rewards.appId).toString()
    const daoEscrow = getApplicationAddress((await universe.walletFactory.client.state.global.akitaDaoEscrow())!.app).toString()
    const quotes: bigint[] = []
    for (const payer of payers) {
      const address = payer.client.appAddress.toString()
      const cost = await welcome.cost({ payer: address })
      quotes.push(cost)
      const before = await balance(address)
      const rewardsBefore = await balance(rewards)
      const escrowBefore = await balance(daoEscrow)
      const id = childID(await payer.usePlugin({ callerType: CallerType.Admin, calls: [welcome.sponsor(args(cost))] }))
      expect(before - await balance(address)).toBe(cost)
      // referrer argument = the spending account (useMainWalletReferrer = false): it gets the cut
      expect(await (await universe.walletFactory.get({ appId: id })).client.state.global.referrer()).toBe(address)
      expect(await balance(rewards) - rewardsBefore).toBe(cut + DISBURSEMENT_MBR)
      expect(await balance(daoEscrow) - escrowBefore).toBe(createFee - cut - DISBURSEMENT_MBR)
    }
    expect(quotes[0]).toBe(baseCost + createFee)
    expect(quotes[1]).toBe(quotes[0])
  })

  // §6.11 Welcome: useMainWalletReferrer names pluginPrincipal(...).principal, the VERIFIED principal,
  // instead of the raw controlled_address global.
  test('useMainWalletReferrer names the controlled account only while the wallet still controls it', async () => {
    const { algorand, testAccount, generateAccount } = fixture.context
    const signer = testAccount.signer
    const external = await generateAccount({ initialFunds: (5).algos() })
    const wx = await newWallet({
      algorand, readerAccount: sender, nickname: 'External sponsor',
      controlledAddress: external.toString(), controlledSigner: external.signer,
      factoryParams: { appId: factory.appId, defaultSender: sender, defaultSigner: signer },
    })
    await wx.client.appClient.fundAppAccount({ amount: (10).algos() })
    await wx.addPlugin({ client: plugin, callerType: CallerType.Admin, escrow: 'well' })
    const payer = getApplicationAddress((await wx.getEscrow('well')).id).toString()
    const sponsor = async () => {
      const cost = await plugin.cost({ payer })
      await fixture.algorand.send.payment({ sender, receiver: payer, amount: microAlgo(cost) })
      const id = childID(await wx.usePlugin({
        callerType: CallerType.Admin, escrow: 'well',
        calls: [plugin.sponsor({ ...args(cost), useMainWalletReferrer: true })],
      }))
      return (await child(id)).client.state.global.referrer()
    }

    // live: Cx is rekeyed to the wallet, so the principal (and referrer) is Cx
    expect(await sponsor()).toBe(external.toString())

    // the admin hands Cx to an EOA: the wallet no longer controls it, so the principal is the spender
    const eoa = await generateAccount({ initialFunds: (1).algos() })
    await wx.client.send.arc58RekeyTo({ sender, signer, extraFee: microAlgo(1_000), args: { address: eoa.toString(), flash: false } })
    expect(await wx.client.state.global.controlledAddress()).toBe(external.toString())
    expect(await sponsor()).toBe(payer)
  })
})
