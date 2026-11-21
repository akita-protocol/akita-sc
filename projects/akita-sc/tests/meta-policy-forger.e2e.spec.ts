/**
 * 2.0.0 release audit regression: a plugin that holds a no-escrow window can act as the wallet's
 * controlled address and call `arc58_rekeyToPlugin` with caller type Other. That used to resolve to the
 * wallet's own address, the caller of every admin grant, without the wallet's admin check, so the
 * plugin could open the policy writer's admin grant (or any other plugin's).
 *
 * Two checks now refuse it. The wallet asks for the admin whenever the caller resolves to its own
 * address, which is what this test reaches. Behind it, MetaPlugin refuses an admin-grant window that
 * was not opened as CallerTypeAdmin (errScopeAdmin); that check covers a wallet without the guard and
 * cannot be reached through this one.
 */
import { ABIType, ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import { Config, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { CallerType, newWallet, WalletSDK } from 'akita-sdk/wallet'
import { MetaFactory, MetaSDK } from '../../akita-sdk/src/meta'
import { MetaPluginSDK, newMetaPlugin, grantPolicyKey, walletControlledAddress } from '../../akita-sdk/src/wallet/plugins/meta'
import { AbstractedAccountMbrFactory } from '../smart_contracts/artifacts/arc58/account/AbstractedAccountMBRClient'
import { MockPolicyForgerClient, MockPolicyForgerFactory } from '../smart_contracts/artifacts/mocks/policy-forger/MockPolicyForgerClient'
import { errAdminOnly } from '../smart_contracts/arc58/account/errors'
import { deployAbstractedAccountFactory } from './fixtures/abstracted-account'
import { deployAkitaDAO } from './fixtures/dao'
import { deployEscrowFactory } from './fixtures/escrow'

describe('a no-escrow plugin cannot forge a policy writer admin window (LocalNet)', () => {
  const fixture = algorandFixture()
  const previousMbr = process.env.WALLET_MBR_APP_ID
  let wallet: WalletSDK
  let writer: MetaPluginSDK
  let target: MetaPluginSDK
  let registry: MetaSDK
  let forger: MockPolicyForgerClient
  let owner: string
  const body = ABIType.from('(string,string[])').encode(['forged.namespace', []])

  beforeAll(async () => {
    Config.configure({ populateAppCallResources: true })
    await fixture.newScope()
    const { algorand, testAccount } = fixture.context
    owner = testAccount.toString()
    const signer = testAccount.signer
    const dispenser = await algorand.account.dispenserFromEnvironment()
    await algorand.account.ensureFunded(owner, dispenser.addr, microAlgo(500_000_000))
    const mbrFactory = algorand.client.getTypedAppFactory(AbstractedAccountMbrFactory, { defaultSender: owner, defaultSigner: signer })
    process.env.WALLET_MBR_APP_ID = (await mbrFactory.send.create.bare()).appClient.appId.toString()
    const dao = await deployAkitaDAO({ fixture, sender: owner, signer, apps: {} })
    const escrow = await deployEscrowFactory({ fixture, sender: owner, signer })
    const factory = await deployAbstractedAccountFactory({ fixture, sender: owner, signer, args: { akitaDao: dao.appId, escrowFactory: escrow.appId } })
    wallet = await newWallet({
      algorand, readerAccount: owner,
      factoryParams: { appId: factory.appId, defaultSender: owner, defaultSigner: signer }, nickname: 'Policy forger wallet',
    })
    await wallet.client.appClient.fundAppAccount({ amount: microAlgo(5_000_000) })
    const metaFactory = algorand.client.getTypedAppFactory(MetaFactory, { defaultSender: owner, defaultSigner: signer })
    const { appClient } = await metaFactory.send.create.create({ args: { version: 'test', akitaDao: dao.appId } })
    await appClient.appClient.fundAppAccount({ amount: microAlgo(100_000) })
    registry = new MetaSDK({ algorand, readerAccount: owner, factoryParams: { appId: appClient.appId, defaultSender: owner, defaultSigner: signer } })
    writer = await newMetaPlugin({ algorand, sender: owner, signer, registry: registry.appId })
    target = await newMetaPlugin({ algorand, sender: owner, signer, registry: registry.appId })
    await registry.client.send.setPolicyWriter({ args: { writer: writer.appId } })

    const forgerFactory = algorand.client.getTypedAppFactory(MockPolicyForgerFactory, { defaultSender: owner, defaultSigner: signer })
    forger = (await forgerFactory.send.create.bare()).appClient
    await forger.appClient.fundAppAccount({ amount: microAlgo(1_000_000) })

    // The writer's admin grant, the grant whose policy is the target, and the forger's own no-escrow grant.
    await wallet.addPlugin({ client: writer, callerType: CallerType.Admin })
    await wallet.addPlugin({ client: target, callerType: CallerType.Global })
    await wallet.addPlugin({ client: { appId: forger.appId } as never, callerType: CallerType.Global })
  })

  afterAll(() => {
    if (previousMbr === undefined) delete process.env.WALLET_MBR_APP_ID
    else process.env.WALLET_MBR_APP_ID = previousMbr
  })

  const send = async (method: 'forge' | 'noop') => {
    const { algorand, testAccount } = fixture.context
    const params = { sender: owner, signer: testAccount.signer, maxFee: microAlgo(100_000) }
    const group = algorand.newGroup()
    group.addAppCallMethodCall(await wallet.client.params.arc58RekeyToPlugin({
      ...params, args: { plugin: forger.appId, type: CallerType.Global, escrow: '', methodOffsets: [], fundsRequest: [] },
    }))
    group.addAppCallMethodCall(method === 'noop'
      ? await forger.params.noop({ ...params, args: { wallet: wallet.appId } })
      : await forger.params.forge({ ...params, args: { wallet: wallet.appId, writer: writer.appId, plugin: target.appId, caller: ALGORAND_ZERO_ADDRESS_STRING, body } }))
    group.addAppCallMethodCall(await wallet.client.params.arc58VerifyAuthAddress({ ...params, args: {} }))
    return group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })
  }

  const policyExists = async () => (await registry.readRecord(
    await walletControlledAddress(fixture.algorand, wallet.appId), grantPolicyKey(target.appId, ALGORAND_ZERO_ADDRESS_STRING),
  )).exists

  test('control: the forger grant and group shape are valid', async () => {
    await send('noop')
  })

  test('the wallet refuses caller type Other from its own address, so the admin grant never opens', async () => {
    await expect(send('forge')).rejects.toThrow(errAdminOnly)
    expect(await policyExists()).toBe(false)
  })
})
