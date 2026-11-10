import { metadataDataKey, metadataDataParts } from '../../akita-sdk/src/meta'
import { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import { Config, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { CallerType, newWallet, WalletSDK } from 'akita-sdk/wallet'
import { MetaFactory, MetaSDK } from '../../akita-sdk/src/meta'
import { MetaPluginSDK, newMetaPlugin } from '../../akita-sdk/src/wallet/plugins/meta'
import { AbstractedAccountMbrFactory } from '../smart_contracts/artifacts/arc58/account/AbstractedAccountMBRClient'
import { deployAbstractedAccountFactory } from './fixtures/abstracted-account'
import { deployAkitaDAO } from './fixtures/dao'
import { deployEscrowFactory } from './fixtures/escrow'
import {
  errAuthAddrMismatch,
  errInvalidSenderValue,
  errMethodOnCooldown,
} from '../smart_contracts/arc58/account/errors'

describe('Meta audit raw ARC-58 boundaries (LocalNet)', () => {
  const fixture = algorandFixture()
  const previousMbr = process.env.WALLET_MBR_APP_ID
  let wallet: WalletSDK
  let otherWallet: WalletSDK
  let plugin: MetaPluginSDK
  let registry: MetaSDK
  let owner: string
  let revision: bigint
  const namespace = 'audit'
  const key = 'value'

  beforeAll(async () => {
    Config.configure({ populateAppCallResources: true })
    await fixture.newScope()
    const { algorand, testAccount } = fixture.context
    owner = testAccount.toString()
    const signer = testAccount.signer
    const dispenser = await algorand.account.dispenserFromEnvironment()
    await algorand.account.ensureFunded(owner, dispenser.addr, microAlgo(500_000_000))
    const mbrFactory = algorand.client.getTypedAppFactory(AbstractedAccountMbrFactory, {
      defaultSender: owner,
      defaultSigner: signer,
    })
    process.env.WALLET_MBR_APP_ID = (await mbrFactory.send.create.bare()).appClient.appId.toString()
    const dao = await deployAkitaDAO({ fixture, sender: owner, signer, apps: {} })
    const escrow = await deployEscrowFactory({ fixture, sender: owner, signer })
    const factory = await deployAbstractedAccountFactory({
      fixture,
      sender: owner,
      signer,
      args: { akitaDao: dao.appId, escrowFactory: escrow.appId },
    })
    const params = {
      algorand,
      readerAccount: owner,
      factoryParams: { appId: factory.appId, defaultSender: owner, defaultSigner: signer },
    }
    wallet = await newWallet({ ...params, nickname: 'Meta audit wallet' })
    otherWallet = await newWallet({ ...params, nickname: 'Meta audit wrong context' })
    await wallet.client.appClient.fundAppAccount({ amount: microAlgo(5_000_000) })
    const metaFactory = algorand.client.getTypedAppFactory(MetaFactory, { defaultSender: owner, defaultSigner: signer })
    const { appClient } = await metaFactory.send.create.create({ args: { version: 'test', akitaDao: dao.appId } })
    await appClient.appClient.fundAppAccount({ amount: microAlgo(100_000) })
    registry = new MetaSDK({
      algorand,
      readerAccount: owner,
      factoryParams: { appId: appClient.appId, defaultSender: owner, defaultSigner: signer },
    })
    plugin = await newMetaPlugin({
      algorand,
      sender: owner,
      signer,
      registry: registry.appId,
    })
    await wallet.addPlugin({ client: plugin, callerType: CallerType.Admin })
    await wallet.usePlugin({ callerType: CallerType.Admin, calls: [plugin.configureScope({
      caller: ALGORAND_ZERO_ADDRESS_STRING, scope: { type: 'keys', namespace, keys: [key] }, expectedRevision: 0n,
    })] })
    await wallet.addPlugin({
      client: plugin,
      callerType: CallerType.Global,
      methods: [{ name: plugin.set(), cooldown: 0n }],
    })
    await wallet.usePlugin({
      callerType: CallerType.Global,
      calls: [plugin.set({ namespace, key, data: new Uint8Array([7]), expectedRevision: 0n })],
    })
    revision = (await registry.readRecord(wallet.client.appAddress.toString(), metadataDataKey(namespace, key))).revision
  })

  afterAll(() => {
    if (previousMbr === undefined) delete process.env.WALLET_MBR_APP_ID
    else process.env.WALLET_MBR_APP_ID = previousMbr
  })

  const rawGroup = async (method: 'set' | 'remove', context?: bigint, rekeyBack = true) => {
    const send = { sender: owner, signer: fixture.context.testAccount.signer, maxFee: microAlgo(100_000) }
    const group = fixture.algorand.newGroup()
    group.addAppCallMethodCall(
      await wallet.client.params.arc58RekeyToPlugin({
        ...send,
        args: { plugin: plugin.appId, type: CallerType.Global, escrow: '', methodOffsets: [0n], fundsRequest: [] },
      }),
    )
    const args = { wallet: context ?? wallet.appId, rekeyBack, namespace, key, expectedRevision: revision }
    group.addAppCallMethodCall(
      method === 'remove'
        ? await plugin.client.params.remove({ ...send, args })
        : await plugin.client.params.set({ ...send, args: { ...args, ...metadataDataParts(new Uint8Array([9])) } }),
    )
    group.addAppCallMethodCall(await wallet.client.params.arc58VerifyAuthAddress({ ...send, args: {} }))
    return group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })
  }

  test('raw deletion cannot substitute an allowed set method offset', async () => {
    await expect(rawGroup('remove')).rejects.toThrow(errMethodOnCooldown)
    expect((await registry.readRecord(wallet.client.appAddress.toString(), metadataDataKey(namespace, key))).revision).toBe(revision)
  })

  test('raw plugin call cannot substitute another wallet context', async () => {
    await expect(rawGroup('set', otherWallet.appId)).rejects.toThrow(errInvalidSenderValue)
    expect((await registry.readRecord(wallet.client.appAddress.toString(), metadataDataKey(namespace, key))).revision).toBe(revision)
  })

  test('omitting the final rekey rolls back a permitted metadata write', async () => {
    await expect(rawGroup('set', wallet.appId, false)).rejects.toThrow(errAuthAddrMismatch)
    expect((await registry.readRecord(wallet.client.appAddress.toString(), metadataDataKey(namespace, key))).revision).toBe(revision)
    expect((await fixture.algorand.account.getInformation(wallet.client.appAddress)).authAddr).toBeUndefined()
  })
})
