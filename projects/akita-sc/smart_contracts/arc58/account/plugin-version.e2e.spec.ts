import { Config, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import type { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { CallerType, newWallet, PayPluginSDK, WalletFactorySDK, WalletSDK } from 'akita-sdk/wallet'
import { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import { afterAll, beforeAll, beforeEach, describe, expect, test } from 'vitest'
import { deployAbstractedAccountFactory } from '../../../tests/fixtures/abstracted-account'
import { deployAkitaDAO } from '../../../tests/fixtures/dao'
import { deployEscrowFactory } from '../../../tests/fixtures/escrow'
import { expectContractError } from '../../../tests/utils/errors'
import { AbstractedAccountMbrFactory } from '../../artifacts/arc58/account/AbstractedAccountMBRClient'
import { PayPluginFactory } from '../../artifacts/arc58/plugins/pay/PayPluginClient'
import { MockUpdatablePayPluginClient, MockUpdatablePayPluginFactory } from '../../artifacts/mocks/updatable-pay-plugin/MockUpdatablePayPluginClient'
import { errInvalidPluginVersion } from './errors'

Config.configure({ populateAppCallResources: true })

const paymentAmount = 100_000n
const routes = [
  { label: 'global plugin', callerType: CallerType.Global, name: '', escrow: '', restricted: false },
  { label: 'named plugin', callerType: CallerType.Global, name: 'payments', escrow: '', restricted: false },
  { label: 'caller-specific plugin', callerType: CallerType.Other, name: '', escrow: '', restricted: false },
  { label: 'admin-scoped plugin', callerType: CallerType.Admin, name: '', escrow: '', restricted: false },
  { label: 'method-restricted escrow plugin', callerType: CallerType.Global, name: '', escrow: 'payments', restricted: true },
]
type Route = typeof routes[number]

describe('ARC58 plugin application version check', () => {
  const fixture = algorandFixture()
  let owner: TransactionSignerAccount
  let caller: TransactionSignerAccount
  let receiver: TransactionSignerAccount
  let walletFactory: WalletFactorySDK
  let wallet: WalletSDK
  let plugin: MockUpdatablePayPluginClient
  let payPlugin: PayPluginSDK
  let replacement: { approvalProgram: Uint8Array; clearStateProgram: Uint8Array }
  let previousMbrAppId: string | undefined

  beforeAll(async () => {
    previousMbrAppId = process.env.WALLET_MBR_APP_ID
    await fixture.newScope()
    const { algorand, generateAccount } = fixture.context
    owner = await generateAccount({ initialFunds: (500).algo() })
    caller = await generateAccount({ initialFunds: (20).algo() })
    receiver = await generateAccount({ initialFunds: (1).algo() })
    const defaults = { defaultSender: owner.addr, defaultSigner: owner.signer }

    const { appClient: mbr } = await new AbstractedAccountMbrFactory({ algorand, ...defaults }).send.create.bare()
    process.env.WALLET_MBR_APP_ID = mbr.appId.toString()

    const account = { fixture, sender: owner.addr, signer: owner.signer }
    const escrowFactory = await deployEscrowFactory(account)
    const dao = await deployAkitaDAO({ ...account, apps: { escrow: escrowFactory.appId } })
    walletFactory = await deployAbstractedAccountFactory({
      ...account,
      args: { akitaDao: dao.appId, escrowFactory: escrowFactory.appId },
    })

    // Replace the mock with the real PayPlugin: its ABI/payment behavior stays
    // compatible, but its program bytes change and the ledger version increases.
    replacement = await new PayPluginFactory({ algorand, ...defaults }).appFactory.compile()
  })

  afterAll(() => {
    if (previousMbrAppId === undefined) delete process.env.WALLET_MBR_APP_ID
    else process.env.WALLET_MBR_APP_ID = previousMbrAppId
  })

  beforeEach(async () => {
    const { algorand } = fixture.context
    const defaults = { defaultSender: owner.addr, defaultSigner: owner.signer }
    wallet = await newWallet({
      algorand,
      factoryParams: { appId: walletFactory.appId, ...defaults },
      readerAccount: owner.addr.toString(),
      nickname: 'plugin-version-test',
    })
    await wallet.client.appClient.fundAppAccount({ amount: (10).algo() })

    ;({ appClient: plugin } = await new MockUpdatablePayPluginFactory({ algorand, ...defaults }).send.create.bare())
    payPlugin = new PayPluginSDK({ algorand, factoryParams: { appId: plugin.appId, ...defaults } })
    expect(await version()).toBe(0)
  })

  async function version() {
    // Algod omits a zero update count from its response.
    const { params } = await fixture.context.algorand.client.algod.getApplicationByID(plugin.appId).do()
    expect(params).toBeDefined()
    return params!.version ?? 0
  }

  async function updateParams() {
    // Generated update params compile the mock itself; replace those programs
    // afterward so this transaction really installs the production PayPlugin.
    return { ...await plugin.params.update.update({ args: [] }), ...replacement }
  }

  async function upgrade() {
    const original = await fixture.context.algorand.client.algod.getApplicationByID(plugin.appId).do()
    expect(original.params!.approvalProgram).not.toEqual(replacement.approvalProgram)
    await fixture.context.algorand.send.appUpdateMethodCall(await updateParams())
    const updated = await fixture.context.algorand.client.algod.getApplicationByID(plugin.appId).do()
    expect(updated.id).toBe(original.id)
    expect(updated.params!.approvalProgram).toEqual(replacement.approvalProgram)
    expect(updated.params!.version).toBe(1)
  }

  function pluginKey(route: Route) {
    return {
      plugin: plugin.appId,
      caller: route.callerType === CallerType.Global ? ALGORAND_ZERO_ADDRESS_STRING
        : route.callerType === CallerType.Admin ? wallet.client.appAddress.toString() : caller.addr.toString(),
      escrow: route.escrow,
    }
  }

  async function install(route = routes[0]) {
    const params = {
      client: payPlugin,
      name: route.name,
      escrow: route.escrow,
      useRounds: true,
      methods: route.restricted ? [{ name: payPlugin.pay(), cooldown: 1n }] : [],
    }
    if (route.callerType === CallerType.Other) {
      await wallet.addPlugin({ ...params, callerType: CallerType.Other, caller: caller.addr.toString() })
    } else {
      await wallet.addPlugin({ ...params, callerType: route.callerType })
    }
    if (route.escrow) {
      const escrow = await wallet.client.state.box.escrows.value(route.escrow)
      expect(escrow).toBeDefined()
      await fixture.context.algorand.send.payment({
        sender: owner.addr,
        signer: owner.signer,
        receiver: escrow!.address,
        amount: (1).algo(),
      })
    }
  }

  function payment(route = routes[0]) {
    const sender = route.callerType === CallerType.Admin ? owner : caller
    return {
      sender: sender.addr,
      signer: sender.signer,
      callerType: route.callerType,
      name: route.name || undefined,
      escrow: route.escrow,
      calls: [payPlugin.pay({
        sender: sender.addr,
        signer: sender.signer,
        payments: [{ receiver: receiver.addr, asset: 0n, amount: paymentAmount }],
      })],
    }
  }

  async function snapshot(route = routes[0]) {
    const { algorand } = fixture.context
    const escrow = route.escrow ? await wallet.client.state.box.escrows.value(route.escrow) : undefined
    const addresses = [wallet.client.appAddress, receiver.addr, ...(escrow ? [escrow.address] : [])]
    const accounts = await Promise.all(addresses.map(async (address) => {
      const info = await algorand.account.getInformation(address)
      return { balance: info.balance.microAlgos, authAddr: info.authAddr?.toString() }
    }))
    return {
      accounts,
      global: await wallet.client.state.global.getAll(),
      plugin: await wallet.client.state.box.plugins.value(pluginKey(route)),
    }
  }

  test.each(routes)('$label executes version 0 and rejects version 1 without moving funds or rekeying', async (route) => {
    await install(route)
    const before = await snapshot(route)
    await wallet.usePlugin(payment(route))
    const afterPayment = await snapshot(route)
    expect(afterPayment.accounts[1].balance - before.accounts[1].balance).toBe(paymentAmount)
    const spendingIndex = route.escrow ? 2 : 0
    expect(before.accounts[spendingIndex].balance - afterPayment.accounts[spendingIndex].balance).toBe(paymentAmount)
    expect(afterPayment.accounts[spendingIndex].authAddr).toBe(before.accounts[spendingIndex].authAddr)
    expect(afterPayment.plugin!.lastCalled).toBeGreaterThan(before.plugin!.lastCalled)
    if (route.restricted) expect(afterPayment.plugin!.methods[0][2]).toBeGreaterThan(0n)

    await upgrade()
    const beforeRejection = await snapshot(route)
    await expectContractError(wallet.usePlugin(payment(route)), errInvalidPluginVersion)
    expect(await snapshot(route)).toEqual(beforeRejection)
  })

  test('rejects a plugin already updated before installation, including after removal and reinstallation', async () => {
    await upgrade()
    await install()
    const before = await snapshot()
    await expectContractError(wallet.usePlugin(payment()), errInvalidPluginVersion)
    expect(await snapshot()).toEqual(before)

    await wallet.removePlugin(pluginKey(routes[0]))
    await install()
    const afterReinstall = await snapshot()
    await expectContractError(wallet.usePlugin(payment()), errInvalidPluginVersion)
    expect(await snapshot()).toEqual(afterReinstall)
  })

  test('rejects a payment prepared while version 0 was still installed if the plugin is updated before submission', async () => {
    await install()
    const prepared = await wallet.build.usePlugin({ ...payment(), lease: 'plugin-version-check', windowSize: 100n })
    expect(prepared.windows).toHaveLength(1)
    await upgrade()
    const before = await snapshot()
    await expectContractError(prepared.send(), errInvalidPluginVersion)
    expect(await snapshot()).toEqual(before)
  })

  test('rejects repeated updates even when the approval and clear programs are unchanged', async () => {
    await install()
    const original = await fixture.context.algorand.client.algod.getApplicationByID(plugin.appId).do()
    for (const updateCount of [1, 2]) {
      await plugin.send.update.update({ args: [] })
      const updated = await fixture.context.algorand.client.algod.getApplicationByID(plugin.appId).do()
      expect(updated.params!.approvalProgram).toEqual(original.params!.approvalProgram)
      expect(updated.params!.clearStateProgram).toEqual(original.params!.clearStateProgram)
      expect(await version()).toBe(updateCount)
      const before = await snapshot()
      await expectContractError(wallet.usePlugin(payment()), errInvalidPluginVersion)
      expect(await snapshot()).toEqual(before)
    }
  })

  test('detects an update earlier in the same group and rolls the entire group back', async () => {
    await install()
    const before = await snapshot()
    const group = fixture.context.algorand.newGroup()
      .addAppUpdateMethodCall(await updateParams())
      .addAppCallMethodCall(await wallet.client.params.arc58RekeyToPlugin({
        args: { plugin: plugin.appId, type: CallerType.Global, escrow: '', methodOffsets: [], fundsRequest: [] },
        staticFee: microAlgo(2_000),
      }))
      .addAppCallMethodCall(await plugin.params.pay({
        args: { wallet: wallet.appId, rekeyBack: true, payments: [[receiver.addr.toString(), 0n, paymentAmount]] },
        staticFee: microAlgo(2_000),
      }))
      .addAppCallMethodCall(await wallet.client.params.arc58VerifyAuthAddress({ args: [] }))

    await expectContractError(group.send(), errInvalidPluginVersion)
    expect(await version()).toBe(0)
    expect(await snapshot()).toEqual(before)
    // The failed group's update must not poison the original installation.
    await wallet.usePlugin(payment())
    expect((await snapshot()).accounts[1].balance - before.accounts[1].balance).toBe(paymentAmount)
  })
})
