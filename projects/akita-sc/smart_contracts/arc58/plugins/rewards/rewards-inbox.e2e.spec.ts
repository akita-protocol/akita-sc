import { Config, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { beforeAll, beforeEach, describe, expect, test } from 'vitest'
import {
  CallerType,
  RewardsPluginSDK,
  newWallet,
  WalletFactorySDK,
  WalletSDK,
} from 'akita-sdk/wallet'
import { AbstractedAccountMbrFactory } from '../../../artifacts/arc58/account/AbstractedAccountMBRClient'
import { deployAbstractedAccountFactory } from '../../../../tests/fixtures/abstracted-account'
import { deployAkitaDAO } from '../../../../tests/fixtures/dao'
import { deployEscrowFactory } from '../../../../tests/fixtures/escrow'
import { deployRewardsPlugin } from '../../../../tests/fixtures/plugins/rewards'
import {
  MockArc59RouterClient,
  MockArc59RouterFactory,
} from '../../../artifacts/mocks/arc59/MockArc59RouterClient'

// The ARC-59 ASA inbox methods of the RewardsPlugin (formerly AssetInboxPlugin)
describe('RewardsPlugin ARC-59 inbox', () => {
  const localnet = algorandFixture()

  let walletFactory: WalletFactorySDK
  let wallet: WalletSDK
  let plugin: RewardsPluginSDK
  let router: MockArc59RouterClient
  let sender: string
  let testAsset: bigint

  beforeAll(async () => {
    Config.configure({ debug: true, populateAppCallResources: true })
    await localnet.newScope()

    const { algorand, testAccount } = localnet.context
    sender = testAccount.toString()
    const signer = testAccount.signer
    const dispenser = await algorand.account.dispenserFromEnvironment()
    await algorand.account.ensureFunded(sender, dispenser.addr, (100).algos())

    // The wallet SDK sizes plugin boxes through this helper app; deploy one when no other suite has
    if (!process.env.WALLET_MBR_APP_ID) {
      const mbrFactory = algorand.client.getTypedAppFactory(AbstractedAccountMbrFactory, {
        defaultSender: sender,
        defaultSigner: signer,
      })
      process.env.WALLET_MBR_APP_ID = (await mbrFactory.send.create.bare()).appClient.appId.toString()
    }

    const dao = await deployAkitaDAO({
      fixture: localnet,
      sender,
      signer,
      apps: {},
    })
    const escrowFactory = await deployEscrowFactory({ fixture: localnet, sender, signer })
    walletFactory = await deployAbstractedAccountFactory({
      fixture: localnet,
      sender,
      signer,
      args: {
        akitaDao: dao.appId,
        escrowFactory: escrowFactory.appId,
      },
    })

    const routerFactory = algorand.client.getTypedAppFactory(MockArc59RouterFactory, {
      defaultSender: sender,
      defaultSigner: signer,
    })
    ;({ appClient: router } = await routerFactory.send.create.create({ args: {} }))
    await router.appClient.fundAppAccount({ amount: (2).algos() })

    plugin = await deployRewardsPlugin({
      fixture: localnet,
      sender,
      signer,
      args: { akitaDao: dao.appId, version: '0.0.1', inboxRouter: router.appId },
    })
  })

  beforeEach(async () => {
    await localnet.newScope()
    const { algorand, testAccount } = localnet.context
    sender = testAccount.toString()

    wallet = await newWallet({
      algorand,
      factoryParams: {
        appId: walletFactory.appId,
        defaultSender: sender,
        defaultSigner: testAccount.signer,
      },
      readerAccount: sender,
      nickname: 'ARC-59 Inbox Wallet',
    })
    await wallet.client.appClient.fundAppAccount({ amount: (5).algos() })

    const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n })
    await wallet.client.appClient.fundAppAccount({ amount: microAlgo(mbr.plugins) })
    await wallet.addPlugin({ client: plugin, callerType: CallerType.Global })

    const assetCreate = await algorand.send.assetCreate({
      sender,
      total: 100n,
      decimals: 0,
      assetName: 'ARC-59 Test Asset',
      unitName: 'A59',
    })
    testAsset = BigInt(assetCreate.confirmation.assetIndex!)

    await router.send.optIn({
      args: { asa: testAsset },
      extraFee: microAlgo(1_000),
    })
  })

  test('claims an asset, opts the wallet in, and restores wallet control', async () => {
    const { algorand } = localnet
    const walletAddress = wallet.client.appAddress.toString()

    await algorand.send.assetTransfer({
      sender,
      receiver: router.appAddress,
      assetId: testAsset,
      amount: 7n,
    })

    await wallet.usePlugin({
      callerType: CallerType.Global,
      calls: [plugin.claimInbox({ asset: testAsset })],
    })

    const walletAsset = await algorand.asset.getAccountInformation(walletAddress, testAsset)
    const walletInfo = await algorand.account.getInformation(walletAddress)

    expect(walletAsset.balance).toBe(7n)
    expect(await router.state.global.lastCaller()).toBe(walletAddress)
    expect(await router.state.global.lastAction()).toBe(1n)
    expect(walletInfo.authAddr).toBeUndefined()
  })

  test('rejects an inbox asset without opting the wallet in', async () => {
    const { algorand } = localnet
    const walletAddress = wallet.client.appAddress.toString()
    const creatorBefore = await algorand.asset.getAccountInformation(sender, testAsset)

    await algorand.send.assetTransfer({
      sender,
      receiver: router.appAddress,
      assetId: testAsset,
      amount: 9n,
    })

    await wallet.usePlugin({
      callerType: CallerType.Global,
      calls: [plugin.rejectInbox({ asset: testAsset })],
    })

    const creatorAfter = await algorand.asset.getAccountInformation(sender, testAsset)
    const walletInfo = await algorand.account.getInformation(walletAddress)

    expect(creatorAfter.balance).toBe(creatorBefore.balance)
    expect(walletInfo.assets?.some(({ assetId }) => assetId === testAsset)).toBe(false)
    expect(await router.state.global.lastCaller()).toBe(walletAddress)
    expect(await router.state.global.lastAction()).toBe(2n)
    expect(walletInfo.authAddr).toBeUndefined()
  })

  test('claims excess ALGO from the inbox and restores wallet control', async () => {
    const { algorand } = localnet
    const walletAddress = wallet.client.appAddress.toString()
    const funding = 400_000n
    const walletBefore = await algorand.account.getInformation(walletAddress)

    await algorand.send.payment({
      sender,
      receiver: router.appAddress,
      amount: microAlgo(funding),
    })
    const routerBefore = await algorand.account.getInformation(router.appAddress)
    const claimable = routerBefore.balance.microAlgos - routerBefore.minBalance.microAlgos

    await wallet.usePlugin({
      callerType: CallerType.Global,
      calls: [plugin.claimInboxAlgo({})],
    })

    const walletAfter = await algorand.account.getInformation(walletAddress)

    expect(walletAfter.balance.microAlgos - walletBefore.balance.microAlgos).toBe(claimable)
    expect(await router.state.global.lastCaller()).toBe(walletAddress)
    expect(await router.state.global.lastAction()).toBe(3n)
    expect(walletAfter.authAddr).toBeUndefined()
  })
})
