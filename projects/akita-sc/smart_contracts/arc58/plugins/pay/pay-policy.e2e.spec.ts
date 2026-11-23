/**
 * PayPlugin grant policies on LocalNet: a grant with a policy pays only the receivers and assets it
 * lists; a grant without one pays as before; admin executions are never limited.
 */
import { Config, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { ABIType, ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import { beforeAll, beforeEach, describe, expect, test } from 'vitest'
import { CallerType, newWallet, PayPluginSDK, WalletFactorySDK, WalletSDK, encodePayPolicy, decodePayPolicy } from 'akita-sdk/wallet'
import { MetaFactory, MetaSDK, SchemaPart } from '../../../../../akita-sdk/src/meta'
import { MetaPluginSDK, newMetaPlugin } from '../../../../../akita-sdk/src/wallet/plugins/meta'
import { deployAbstractedAccountFactory } from '../../../../tests/fixtures/abstracted-account'
import { deployAkitaDAO } from '../../../../tests/fixtures/dao'
import { deployEscrowFactory } from '../../../../tests/fixtures/escrow'
import { deployPayPlugin } from '../../../../tests/fixtures/plugins/pay'
import { AbstractedAccountMbrFactory } from '../../../artifacts/arc58/account/AbstractedAccountMBRClient'
import { errPolicyMissing, errPolicyStale } from '../../../utils/errors'
import { errPayAsset, errPayPolicyAssets, errPayPolicyEncoding, errPayPolicyRecipients, errPayRecipient } from './errors'

describe('PayPlugin grant policies (LocalNet)', () => {
  const fixture = algorandFixture()
  let owner: string
  let factory: WalletFactorySDK
  let writer: MetaPluginSDK
  let pay: PayPluginSDK
  let wallet: WalletSDK
  let asset: bigint
  const previousMbrApp = process.env.WALLET_MBR_APP_ID

  const account = async () => {
    const a = fixture.algorand.account.random()
    await fixture.algorand.account.ensureFunded(a.addr, owner, microAlgo(5_000_000))
    return a
  }
  const balance = async (address: string, id = 0n) => {
    const info = await fixture.algorand.account.getInformation(address)
    if (id === 0n) return info.balance.microAlgos
    return (await fixture.algorand.asset.getAccountInformation(address, id)).balance
  }
  const configure = (caller: string, body: Uint8Array, expectedRevision = 0n) => wallet.usePlugin({
    callerType: CallerType.Admin,
    calls: [writer.configurePolicy({ plugin: pay.appId, caller, body, expectedRevision })],
  })
  const payAs = (who: { addr: { toString(): string }; signer: any }, receiver: string, amount: bigint, assetId = 0n, callerType: CallerType = CallerType.Other) =>
    wallet.usePlugin({
      sender: who.addr.toString(), signer: who.signer, callerType,
      calls: [pay.pay({ sender: who.addr.toString(), signer: who.signer, payments: [{ receiver, amount, asset: assetId }] })],
    })

  beforeAll(async () => {
    Config.configure({ populateAppCallResources: true })
    await fixture.newScope()
    const { algorand, testAccount } = fixture.context
    owner = testAccount.toString()
    const signer = testAccount.signer
    const dispenser = await algorand.account.dispenserFromEnvironment()
    await algorand.account.ensureFunded(owner, dispenser.addr, microAlgo(1_000_000_000))
    const { appClient: mbr } = await algorand.client.getTypedAppFactory(AbstractedAccountMbrFactory, { defaultSender: owner, defaultSigner: signer }).send.create.bare()
    process.env.WALLET_MBR_APP_ID = mbr.appId.toString()
    const dao = await deployAkitaDAO({ fixture, sender: owner, signer, apps: {} })
    const escrowFactory = await deployEscrowFactory({ fixture, sender: owner, signer })
    factory = await deployAbstractedAccountFactory({ fixture, sender: owner, signer, args: { akitaDao: dao.appId, escrowFactory: escrowFactory.appId } })
    const { appClient } = await algorand.client.getTypedAppFactory(MetaFactory, { defaultSender: owner, defaultSigner: signer }).deploy({
      onUpdate: 'append', onSchemaBreak: 'append', createParams: { method: 'create', args: ['pay-policy-test', dao.appId] },
    })
    await appClient.appClient.fundAppAccount({ amount: microAlgo(100_000) })
    const meta = new MetaSDK({ algorand, readerAccount: owner, factoryParams: { appId: appClient.appId, defaultSender: owner, defaultSigner: signer } })
    await meta.addType({ description: 'Pay policy tests', schemaList: [SchemaPart.Uint64] })
    writer = await newMetaPlugin({ algorand, sender: owner, signer, registry: meta.appId })
    await meta.client.send.setPolicyWriter({ args: { writer: writer.appId } })
    pay = await deployPayPlugin({ fixture, sender: owner, signer, registry: meta.appId })
    asset = (await algorand.send.assetCreate({ sender: owner, total: 1_000_000n, decimals: 0 })).assetId
    return () => {
      if (previousMbrApp === undefined) delete process.env.WALLET_MBR_APP_ID
      else process.env.WALLET_MBR_APP_ID = previousMbrApp
    }
  })

  beforeEach(async () => {
    wallet = await newWallet({ algorand: fixture.algorand, readerAccount: owner,
      factoryParams: { appId: factory.appId, defaultSender: owner, defaultSigner: fixture.context.testAccount.signer }, nickname: 'Pay policy' })
    await wallet.client.appClient.fundAppAccount({ amount: microAlgo(20_000_000) })
    await wallet.addPlugin({ client: writer, callerType: CallerType.Admin })
  })

  test('an admin grant pays anyone without a policy', async () => {
    await wallet.addPlugin({ client: pay, callerType: CallerType.Admin })
    const receiver = (await account()).addr.toString()
    const before = await balance(receiver)
    await wallet.usePlugin({ callerType: CallerType.Admin, calls: [pay.pay({ payments: [{ receiver, amount: 1_000n, asset: 0n }] })] })
    expect(await balance(receiver)).toBe(before + 1_000n)
  })

  test('a delegated grant pays only the receivers and assets its policy lists', async () => {
    const billing = await account()
    const revenue = await account()
    const other = await account()
    await wallet.addPlugin({ client: pay, callerType: CallerType.Other, caller: billing.addr.toString() })

    // No policy: the grant pays as before.
    const otherBefore = await balance(other.addr.toString())
    await payAs(billing, other.addr.toString(), 1_000n)
    expect(await balance(other.addr.toString())).toBe(otherBefore + 1_000n)

    await configure(billing.addr.toString(), encodePayPolicy({ recipients: [revenue.addr.toString()], assets: [0n, asset] }))
    const policy = await writer.getPolicy({ wallet: wallet.appId, plugin: pay.appId, caller: billing.addr.toString() })
    expect(decodePayPolicy(policy.body)).toEqual({ recipients: [revenue.addr.toString()], assets: [0n, asset] })

    const before = await balance(revenue.addr.toString())
    await payAs(billing, revenue.addr.toString(), 1_000n)
    expect(await balance(revenue.addr.toString())).toBe(before + 1_000n)
    await expect(payAs(billing, other.addr.toString(), 1_000n)).rejects.toThrow(errPayRecipient)

    // The asset check runs before any transfer, so the wallet need not hold the unlisted asset.
    const otherAsset = (await fixture.algorand.send.assetCreate({ sender: owner, total: 10n, decimals: 0 })).assetId
    await expect(payAs(billing, revenue.addr.toString(), 1n, otherAsset)).rejects.toThrow(errPayAsset)
  })

  test('a reinstalled grant does not use the policy written for its earlier install', async () => {
    const billing = await account()
    const revenue = (await account()).addr.toString()
    // Round-stamped installs: LocalNet's clock may not tick between the two installs; its rounds do.
    const install = () => wallet.addPlugin({ client: pay, callerType: CallerType.Other, caller: billing.addr.toString(), useRounds: true })
    await install()
    await configure(billing.addr.toString(), encodePayPolicy({ recipients: [revenue], assets: [0n] }))
    await payAs(billing, revenue, 1_000n)
    await wallet.removePlugin({ plugin: pay.appId, caller: billing.addr.toString(), escrow: '' })
    await install()
    await expect(payAs(billing, revenue, 1_000n)).rejects.toThrow(errPolicyStale)
  })

  test('a global grant with a policy lets anyone pay, but only to the listed receiver', async () => {
    const stranger = await account()
    const labs = (await account()).addr.toString()
    await wallet.addPlugin({ client: pay, callerType: CallerType.Global })
    // Without a policy a grant anyone may call pays nothing.
    await expect(payAs(stranger, labs, 1_000n, 0n, CallerType.Global)).rejects.toThrow(errPolicyMissing)
    await configure(ALGORAND_ZERO_ADDRESS_STRING, encodePayPolicy({ recipients: [labs], assets: [0n] }))
    await payAs(stranger, labs, 1_000n, 0n, CallerType.Global)
    await expect(payAs(stranger, stranger.addr.toString(), 1_000n, 0n, CallerType.Global)).rejects.toThrow(errPayRecipient)
  })

  test('clearing the policy lifts the limit', async () => {
    const billing = await account()
    const revenue = (await account()).addr.toString()
    const other = (await account()).addr.toString()
    await wallet.addPlugin({ client: pay, callerType: CallerType.Other, caller: billing.addr.toString() })
    await configure(billing.addr.toString(), encodePayPolicy({ recipients: [revenue], assets: [0n] }))
    await expect(payAs(billing, other, 1_000n)).rejects.toThrow(errPayRecipient)
    const { revision } = await writer.getPolicy({ wallet: wallet.appId, plugin: pay.appId, caller: billing.addr.toString() })
    await wallet.usePlugin({ callerType: CallerType.Admin, calls: [writer.clearPolicy({ plugin: pay.appId, caller: billing.addr.toString(), expectedRevision: revision })] })
    await payAs(billing, other, 1_000n)
  })

  test('the writer refuses a malformed policy', async () => {
    const billing = await account()
    const a = (await account()).addr.toString()
    const b = (await account()).addr.toString()
    await wallet.addPlugin({ client: pay, callerType: CallerType.Other, caller: billing.addr.toString() })
    const raw = ABIType.from('(address[],uint64[])')
    const [low, high] = [a, b].sort((x, y) => Buffer.compare(Buffer.from(raw.encode([[x], [0n]])), Buffer.from(raw.encode([[y], [0n]]))))
    const caller = billing.addr.toString()
    await expect(configure(caller, raw.encode([[], [0n]]))).rejects.toThrow(errPayPolicyRecipients)
    await expect(configure(caller, raw.encode([[high, low], [0n]]))).rejects.toThrow(errPayPolicyRecipients)
    await expect(configure(caller, raw.encode([[low, low], [0n]]))).rejects.toThrow(errPayPolicyRecipients)
    await expect(configure(caller, raw.encode([[low], []]))).rejects.toThrow(errPayPolicyAssets)
    await expect(configure(caller, raw.encode([[low], [5n, 1n]]))).rejects.toThrow(errPayPolicyAssets)
    await expect(configure(caller, raw.encode([[low], Array.from({ length: 9 }, (_, i) => BigInt(i))]))).rejects.toThrow(errPayPolicyAssets)
    await expect(configure(caller, new Uint8Array([...raw.encode([[low], [0n]]), 0]))).rejects.toThrow(errPayPolicyEncoding)
    await configure(caller, raw.encode([[low, high], [0n, 1n]]))
  })
})
