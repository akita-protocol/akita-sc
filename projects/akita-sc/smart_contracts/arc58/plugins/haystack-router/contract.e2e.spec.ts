import { Config, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import algosdk, { TransactionSigner } from 'algosdk';
import { CallerType, HaystackRouterPluginSDK, newWallet, OptInPluginSDK, WalletFactorySDK, WalletSDK } from 'akita-sdk/wallet'
import { afterAll, beforeAll, beforeEach, describe, expect, test } from 'vitest'
import { deployAbstractedAccountFactory } from '../../../../tests/fixtures/abstracted-account'
import { deployAkitaDAO } from '../../../../tests/fixtures/dao'
import { deployEscrowFactory } from '../../../../tests/fixtures/escrow'
import { deployHaystackRouterPlugin } from '../../../../tests/fixtures/plugins/haystack-router'
import { deployOptInPlugin } from '../../../../tests/fixtures/plugins/optin'
import { expectContractError } from '../../../../tests/utils/errors'
import { AbstractedAccountMbrFactory } from '../../../artifacts/arc58/account/AbstractedAccountMBRClient'
import { MockHaystackRouterClient, MockHaystackRouterFactory } from '../../../artifacts/mocks/haystack-router/MockHaystackRouterClient'
import { errInvalidBeneficiary, errInvalidFunding, errInvalidMinOutput, errInvalidOutputAsset, errInvalidReceiverArg, errInvalidRouter } from './errors'

/**
 * The 93-byte terms of Haystack's ORDER_ROUTER v4 route call (finalize arg 4): uint16, uint64 minAmountOut,
 * uint64 expected output, uint16 fee bps, uint64, byte, beneficiary, referrer.
 */
function routeTerms({ minAmountOut, beneficiary, referrer }: { minAmountOut: bigint; beneficiary: string; referrer: string }) {
  const terms = new Uint8Array(93)
  terms.set(algosdk.encodeUint64(minAmountOut), 2)
  terms.set(algosdk.encodeUint64(minAmountOut), 10)
  terms.set(algosdk.decodeAddress(beneficiary).publicKey, 29)
  terms.set(algosdk.decodeAddress(referrer).publicKey, 61)
  return terms
}

describe('Haystack temporary-account funding', () => {
  const fixture = algorandFixture()
  let walletFactory: WalletFactorySDK
  let wallet: WalletSDK
  let plugin: HaystackRouterPluginSDK
  let optInPlugin: OptInPluginSDK
  let router: MockHaystackRouterClient
  let relay: ReturnType<typeof fixture.algorand.account.random>
  let inputAsset: bigint
  let outputAsset: bigint
  let referrer: string
  let referrerSigner: TransactionSigner
  const previousMbr = process.env.WALLET_MBR_APP_ID
  const amount = 1_000_000n
  const minOutputAmount = 19n

  beforeAll(async () => {
    Config.configure({ debug: true, populateAppCallResources: true })
    await fixture.newScope()
    const { algorand, testAccount } = fixture.context
    const sender = testAccount.toString()
    const signer = testAccount.signer
    referrer = sender
    referrerSigner = signer
    await algorand.account.ensureFunded(sender, await algorand.account.dispenserFromEnvironment(), (500).algos())

    const mbrFactory = algorand.client.getTypedAppFactory(AbstractedAccountMbrFactory, { defaultSender: sender, defaultSigner: signer })
    const { appClient: mbr } = await mbrFactory.send.create.bare()
    process.env.WALLET_MBR_APP_ID = mbr.appId.toString()
    const escrowFactory = await deployEscrowFactory({ fixture, sender, signer })
    const dao = await deployAkitaDAO({ fixture, sender, signer, apps: { escrow: escrowFactory.appId } })
    walletFactory = await deployAbstractedAccountFactory({ fixture, sender, signer, args: { akitaDao: dao.appId, escrowFactory: escrowFactory.appId } })

    const routerFactory = algorand.client.getTypedAppFactory(MockHaystackRouterFactory, { defaultSender: sender, defaultSigner: signer })
    ;({ appClient: router } = await routerFactory.send.create.create({ args: {} }))
    await router.appClient.fundAppAccount({ amount: (2).algos() })
    plugin = await deployHaystackRouterPlugin({ fixture, sender, signer, args: {
      router: router.appId,
      routerMethod: router.appClient.getABIMethod('finalize').getSelector(),
      referrer,
      referrerTreasury: router.appId,
    } })
    optInPlugin = await deployOptInPlugin({ fixture, sender, signer })

    const createAsset = async (unitName: string) => {
      const result = await algorand.send.assetCreate({ sender, signer, total: 1_000_000_000n, decimals: 0, unitName, clawback: sender })
      const assetId = BigInt(result.confirmation.assetIndex!)
      await router.send.optIn({ args: { asset: assetId }, extraFee: microAlgo(1_000) })
      return assetId
    }
    inputAsset = await createAsset('IN')
    outputAsset = await createAsset('OUT')
    await algorand.send.assetTransfer({ sender, signer, receiver: router.appAddress, assetId: outputAsset, amount: 1_000_000n })
  })

  afterAll(() => {
    if (previousMbr === undefined) delete process.env.WALLET_MBR_APP_ID
    else process.env.WALLET_MBR_APP_ID = previousMbr
  })

  beforeEach(async () => {
    await fixture.newScope()
    const { algorand, testAccount } = fixture.context
    const sender = testAccount.toString()
    await algorand.account.ensureFunded(sender, await algorand.account.dispenserFromEnvironment(), (50).algos())
    wallet = await newWallet({ algorand, factoryParams: {
      appId: walletFactory.appId, defaultSender: sender, defaultSigner: testAccount.signer,
    }, readerAccount: sender, nickname: 'Haystack funding test' })
    await wallet.client.appClient.fundAppAccount({ amount: (10).algos() })
    await wallet.addPlugin({ client: plugin, callerType: CallerType.Admin })
    await wallet.addPlugin({ client: optInPlugin, callerType: CallerType.Global })
    await wallet.usePlugin({ callerType: CallerType.Global, calls: [optInPlugin.optIn({ assets: [inputAsset, outputAsset] })] })
    await algorand.send.assetTransfer({ sender: referrer, signer: referrerSigner, receiver: wallet.client.appAddress, assetId: inputAsset, amount: amount * 2n })

    relay = algorand.account.random()
    await algorand.send.payment({ sender, receiver: relay.addr, amount: microAlgo(400_000) })
    await algorand.send.assetOptIn({ sender: relay.addr, signer: relay.signer, assetId: inputAsset })
  })

  type SwapOptions = {
    asa?: boolean
    paymentAmount?: bigint
    receiver?: string
    paymentAsset?: bigint
    wrongType?: boolean
    rekeyTo?: string
    closeTo?: string
    clawback?: string
    prefix?: boolean
    beneficiary?: string
    routeInputAsset?: bigint
    routeOutputAsset?: bigint
    routeMinOutput?: bigint
    routeReferrer?: string
    omitFinalize?: boolean
    finalizeFirst?: boolean
    duplicateInput?: boolean
    windows?: number[]
  }

  /** Rekey windows holding the given number of swap calls each; notes keep identical calls distinct. */
  const swapWindows = async (windows: number[], asa: boolean) => {
    const { testAccount } = fixture.context
    const sendParams = { sender: testAccount.toString(), signer: testAccount.signer }
    const group = wallet.client.newGroup()
    for (const [w, swaps] of windows.entries()) {
      group.arc58RekeyToPlugin({ ...sendParams, note: `window ${w}`, extraFee: microAlgo(1_000n + 1_000n * BigInt(swaps)),
        args: { plugin: plugin.appId, type: CallerType.Admin, escrow: '', methodOffsets: [], fundsRequest: [] } })
      const composer = await group.composer()
      for (let c = 0; c < swaps; c++) {
        composer.addAppCallMethodCall(await plugin.client.params.swap({ ...sendParams, note: `swap ${w}.${c}`, args: {
          wallet: wallet.client.appId, rekeyBack: c === swaps - 1, asset: asa ? inputAsset : 0n, amount, outputAsset, minOutputAmount } }))
      }
      group.arc58VerifyAuthAddress({ ...sendParams, note: `verify ${w}`, args: {} })
    }
    return group
  }

  const swap = async (options: SwapOptions = {}) => {
    const { algorand } = fixture.context
    const paymentFields = {
      sender: relay.addr.toString(),
      receiver: options.receiver ?? router.appAddress.toString(),
      rekeyTo: options.rekeyTo,
    }
    const useAssetTransfer = options.wrongType ? !options.asa : options.asa
    const makePayment = async (note?: string) => useAssetTransfer
      ? algorand.createTransaction.assetTransfer({ ...paymentFields, note, amount: options.paymentAmount ?? amount,
        assetId: options.paymentAsset ?? inputAsset, clawbackTarget: options.clawback, closeAssetTo: options.closeTo })
      : algorand.createTransaction.payment({ ...paymentFields, note, amount: microAlgo(options.paymentAmount ?? amount), closeRemainderTo: options.closeTo })
    const payment = await makePayment()
    const route = algorand.newGroup()
    if (options.prefix) route.addAppCallMethodCall(await router.params.prefix({ sender: relay.addr, signer: relay.signer, args: {}, maxFee: microAlgo(10_000) }))
    const finalize = async () => route.addAppCallMethodCall(await router.params.finalize({ sender: relay.addr, signer: relay.signer, args: {
      assets: [options.routeInputAsset ?? (options.asa ? inputAsset : 0n), options.routeOutputAsset ?? outputAsset],
      addresses: new Uint8Array(), legs: new Uint8Array(),
      terms: routeTerms({
        minAmountOut: options.routeMinOutput ?? minOutputAmount,
        beneficiary: options.beneficiary ?? wallet.client.appAddress.toString(),
        referrer: options.routeReferrer ?? referrer,
      }),
      flags: new Uint8Array(39), tag: 'hayrouter/v1:{"tag":"akita"}',
    }, staticFee: microAlgo(10_000), maxFee: microAlgo(10_000) }))
    if (options.finalizeFirst) await finalize()
    route.addTransaction(payment, relay.signer)
    if (options.duplicateInput) {
      const duplicate = await makePayment('duplicate input')
      route.addTransaction(duplicate, relay.signer)
    }
    if (!options.omitFinalize && !options.finalizeFirst) await finalize()
    // End the wallet's protected plugin segment before the intact router route.
    const group = options.windows ? await swapWindows(options.windows, options.asa ?? false)
      : (await wallet.prepareUsePlugin({ callerType: CallerType.Admin,
        calls: [plugin.swap({ asset: options.asa ? inputAsset : 0n, amount, outputAsset, minOutputAmount })] })).group
    const composer = await group.composer()
    composer.addAtc((await route.build()).atc.clone())
    return group.send()
  }

  test.each([false, true])('funds an initially insufficient relay and preserves the outer route (ASA=%s)', async (asa) => {
    const { algorand } = fixture.context
    const walletBefore = await algorand.account.getInformation(wallet.client.appAddress)
    const routerBefore = await algorand.account.getInformation(router.appAddress)
    const relayBefore = await algorand.account.getInformation(relay.addr)
    expect(relayBefore.balance.microAlgos).toBeLessThan(amount)
    expect(relayBefore.assets?.find(({ assetId }) => assetId === inputAsset)?.amount).toBe(0n)

    const result = await swap({ asa, prefix: true })
    const walletAfter = await algorand.account.getInformation(wallet.client.appAddress)
    const routerAfter = await algorand.account.getInformation(router.appAddress)
    const relayAfter = await algorand.account.getInformation(relay.addr)
    expect(result.txIds).toHaveLength(6) // rekey, plugin, verify, route prefix, input, finalize
    expect(walletAfter.authAddr).toBeUndefined()
    expect(walletAfter.assets?.find(({ assetId }) => assetId === outputAsset)?.amount).toBe(minOutputAmount)
    expect(relayAfter.assets?.find(({ assetId }) => assetId === inputAsset)?.amount).toBe(0n)
    if (asa) {
      expect(walletAfter.assets?.find(({ assetId }) => assetId === inputAsset)?.amount).toBe(amount)
      expect(routerAfter.assets?.find(({ assetId }) => assetId === inputAsset)?.amount).toBe(
        (routerBefore.assets?.find(({ assetId }) => assetId === inputAsset)?.amount ?? 0n) + amount)
    } else {
      expect(walletBefore.balance.microAlgos - walletAfter.balance.microAlgos).toBe(amount)
      expect(routerAfter.balance.microAlgos - routerBefore.balance.microAlgos).toBe(amount)
    }
  })

  test.each([false, true])('rejects an unequal router input and rolls back wallet funding (ASA=%s)', async (asa) => {
    for (const paymentAmount of [amount - 1n, amount + 1n]) {
      const before = await fixture.algorand.account.getInformation(wallet.client.appAddress)
      await expectContractError(swap({ asa, paymentAmount }), errInvalidFunding)
      const after = await fixture.algorand.account.getInformation(wallet.client.appAddress)
      expect(after.balance.microAlgos).toBe(before.balance.microAlgos)
      expect(after.assets).toEqual(before.assets)
      expect(after.authAddr).toBeUndefined()
    }
  })

  test('rejects the wrong router recipient for ALGO and ASAs', async () => {
    for (const asa of [false, true]) await expectContractError(swap({ asa, receiver: referrer }), errInvalidFunding)
  })

  test('rejects the wrong asset, transaction type, and clawback funding', async () => {
    await expectContractError(swap({ asa: true, paymentAsset: outputAsset }), errInvalidFunding)
    for (const asa of [false, true]) await expectContractError(swap({ asa, wrongType: true }), errInvalidFunding)
    await expectContractError(swap({ asa: true, clawback: wallet.client.appAddress.toString() }), errInvalidFunding)
  })

  test('rejects rekeying or closing the input account', async () => {
    for (const asa of [false, true]) {
      await expectContractError(swap({ asa, rekeyTo: referrer }), errInvalidFunding)
      await expectContractError(swap({ asa, closeTo: referrer }), errInvalidFunding)
    }
  })

  test('requires a future funding transaction before finalization', async () => {
    await expectContractError(swap({ finalizeFirst: true }), errInvalidFunding)
  })

  test('rejects ambiguous matching inputs', async () => {
    for (const asa of [false, true]) await expectContractError(swap({ asa, duplicateInput: true }), errInvalidFunding)
  })

  test('the manual window builder funds a single swap', async () => {
    await swap({ windows: [1] })
  })

  test.each([
    ['one rekey window', [2]],
    ['two rekey windows', [1, 1]],
  ])('reimburses one router input at most once across swap calls in %s', async (_label, windows) => {
    for (const asa of [false, true]) {
      const before = await fixture.algorand.account.getInformation(wallet.client.appAddress)
      const relayBefore = await fixture.algorand.account.getInformation(relay.addr)
      await expectContractError(swap({ asa, windows }), errInvalidFunding)
      const after = await fixture.algorand.account.getInformation(wallet.client.appAddress)
      expect(after.balance.microAlgos).toBe(before.balance.microAlgos)
      expect(after.assets).toEqual(before.assets)
      expect(after.authAddr).toBeUndefined()
      expect((await fixture.algorand.account.getInformation(relay.addr)).balance.microAlgos).toBe(relayBefore.balance.microAlgos)
    }
  })

  test('retains output beneficiary, asset, minimum, referrer, and router-call checks', async () => {
    await expectContractError(swap({ beneficiary: relay.addr.toString() }), errInvalidReceiverArg)
    await expectContractError(swap({ routeOutputAsset: inputAsset }), errInvalidOutputAsset)
    await expectContractError(swap({ routeMinOutput: minOutputAmount - 1n }), errInvalidMinOutput)
    await expectContractError(swap({ routeReferrer: relay.addr.toString() }), errInvalidBeneficiary)
    await expectContractError(swap({ routeInputAsset: outputAsset }), errInvalidFunding)
    await expectContractError(swap({ omitFinalize: true }), errInvalidRouter)
  })
})
