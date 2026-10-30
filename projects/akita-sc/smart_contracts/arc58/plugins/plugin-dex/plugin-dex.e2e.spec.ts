/**
 * PluginDexPlugin end to end: an Akita wallet creates pools, swaps and provides liquidity on the PluginDex
 * Vault through `wallet.usePlugin`, with no admin flash rekey. Every outer transaction is sent by the
 * caller, so any signer that can sign its own transactions (passkey, KMD, Pera) can drive it.
 */
import { AlgorandClient, Config, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { CallerType, newWallet, PluginDexPluginSDK, WalletSDK } from 'akita-sdk/wallet'
import { beforeAll, describe, expect, test } from 'vitest'
import {
  binAddMbr,
  BinEngineSDK,
  BINS_CREATE_CURVE_MBR,
  BINS_ID_CENTER,
  BINS_REMOVE_ALL,
  defaultBinPoolParams,
  defaultPoolConfig,
  encodeBinAddArgs,
  encodeBinInitArgs,
  encodeBinRemoveArgs,
  LpMode,
  PluginDexSDK,
  spotDistribution,
  withSlippage,
} from '../../../../../akita-sdk/src/plugin-dex'
import { deployAbstractedAccountFactory } from '../../../../tests/fixtures/abstracted-account'
import { deployAkitaDAO } from '../../../../tests/fixtures/dao'
import { deployEscrowFactory } from '../../../../tests/fixtures/escrow'
import { deployVault } from '../../../../tests/fixtures/plugin-dex'
import { AbstractedAccountMbrFactory } from '../../../artifacts/arc58/account/AbstractedAccountMBRClient'
import { PluginDexPluginFactory } from '../../../artifacts/arc58/plugins/plugin-dex/PluginDexPluginClient'
import { BinEngineFactory } from '../../../artifacts/plugin-dex/curves/bins/BinEngineClient'
import { PluginDexClient } from '../../../artifacts/plugin-dex/PluginDexClient'

describe('PluginDexPlugin', () => {
  const fixture = algorandFixture()
  let algorand: AlgorandClient
  let admin: TransactionSignerAccount
  let owner: TransactionSignerAccount
  let dex: PluginDexClient
  let plugin: PluginDexPluginSDK
  let reader: PluginDexSDK
  let wallet: WalletSDK
  let walletAddress: string
  let token: bigint
  let quoteToken: bigint

  const use = (...calls: ReturnType<PluginDexPluginSDK['swap']>[]) => wallet.usePlugin({ callerType: CallerType.Global, calls })
  const holding = async (asset: bigint) =>
    asset === 0n
      ? (await algorand.account.getInformation(walletAddress)).balance.microAlgo
      : (await algorand.asset.getAccountInformation(walletAddress, asset)).balance

  beforeAll(async () => {
    Config.configure({ populateAppCallResources: true })
    await fixture.newScope()
    algorand = fixture.algorand
    admin = fixture.context.testAccount
    await algorand.account.ensureFunded(admin.addr, await algorand.account.dispenserFromEnvironment(), (5_000).algos())
    owner = await fixture.context.generateAccount({ initialFunds: microAlgo(50_000_000) })
    const sender = admin.addr.toString()
    const signer = admin.signer

    const { appClient: mbr } = await algorand.client
      .getTypedAppFactory(AbstractedAccountMbrFactory, { defaultSender: sender, defaultSigner: signer })
      .send.create.bare()
    process.env.WALLET_MBR_APP_ID = mbr.appId.toString()
    const escrowFactory = await deployEscrowFactory({ fixture, sender, signer })
    const dao = await deployAkitaDAO({ fixture, sender, signer, apps: { escrow: escrowFactory.appId } })
    const walletFactory = await deployAbstractedAccountFactory({ fixture, sender, signer, args: { akitaDao: dao.appId, escrowFactory: escrowFactory.appId } })

    dex = await deployVault({ algorand, sender: admin, funding: 5_000_000n })
    reader = new PluginDexSDK({ algorand, factoryParams: { appId: dex.appId, defaultSender: sender, defaultSigner: signer } })

    const { appClient: pluginClient } = await algorand.client
      .getTypedAppFactory(PluginDexPluginFactory, { defaultSender: sender, defaultSigner: signer })
      .send.create.create({ args: { version: '0.1.0', dex: dex.appId } })
    plugin = new PluginDexPluginSDK({ algorand, factoryParams: { appId: pluginClient.appId, defaultSender: owner.addr, defaultSigner: owner.signer } })

    const asset = async (unitName: string) => (await algorand.send.assetCreate({ sender, total: 10n ** 15n, decimals: 6, unitName })).assetId
    token = await asset('TKN')
    quoteToken = await asset('QTE')

    // the owner is the wallet admin and the only signer from here on
    wallet = await newWallet({
      algorand,
      factoryParams: { appId: walletFactory.appId, defaultSender: owner.addr, defaultSigner: owner.signer },
      sender: owner.addr,
      signer: owner.signer,
      nickname: 'dex plugin wallet',
      assets: [token, quoteToken],
    })
    walletAddress = wallet.client.appAddress.toString()
    await algorand.send.payment({ sender: admin.addr, signer, receiver: walletAddress, amount: microAlgo(200_000_000) })
    await wallet.addPlugin({ client: plugin, callerType: CallerType.Global })
    for (const asset of [token, quoteToken]) {
      await algorand.send.assetTransfer({ sender: admin.addr, receiver: walletAddress, assetId: asset, amount: 10_000_000_000n })
    }
  })

  test('creates a pool, adds liquidity, swaps both ways and removes, all from the wallet', async () => {
    const before = (await reader.listPools()).size
    await use(plugin.createPool({ assetA: token, assetB: 0n, config: defaultPoolConfig(30n), payment: 2_000_000n }))
    const poolId = BigInt(before)
    const pool = await reader.getPool(poolId)
    expect([pool.assetA, pool.assetB]).toEqual([0n, token])
    expect(pool.creator).toBe(walletAddress)

    await use(plugin.addLiquidity({ poolId, amountA: 10_000_000n, amountB: 1_000_000_000n }))
    const lp = await holding(pool.lpAsset)
    expect(lp).toBeGreaterThan(0n)

    const tokenBefore = await holding(token)
    const quoted = await reader.quote({ poolId, assetIn: 0n, amountIn: 1_000_000n, swapper: walletAddress })
    const swapped = await use(plugin.swap({ poolId, assetIn: 0n, amountIn: 1_000_000n, minAmountOut: withSlippage(quoted, 50n) }))
    const out = plugin.decodeReturn<bigint>(swapped, 'swap')
    expect(out).toBeGreaterThanOrEqual(withSlippage(quoted, 50n))
    expect((await holding(token)) - tokenBefore).toBe(out)

    const algoBefore = await holding(0n)
    await use(plugin.swap({ poolId, assetIn: token, amountIn: 10_000_000n, minAmountOut: 1n }))
    expect(await holding(0n)).toBeGreaterThan(algoBefore - 50_000n)

    const routedBefore = await holding(token)
    await use(plugin.swapRoute({ route: [poolId], assetIn: 0n, assetOut: token, amountIn: 500_000n, minAmountOut: 1n }))
    expect(await holding(token)).toBeGreaterThan(routedBefore)

    const tokenBeforeRemove = await holding(token)
    const removed = await use(plugin.removeLiquidity({ poolId, lpAmount: lp }))
    const [, amountB] = plugin.decodeReturn<[bigint, bigint]>(removed, 'removeLiquidity')
    expect(await holding(pool.lpAsset)).toBe(0n)
    expect((await holding(token)) - tokenBeforeRemove).toBe(amountB)

    // every group handed the wallet back
    const info = await algorand.account.getInformation(walletAddress)
    expect(info.authAddr?.toString() ?? walletAddress).toBe(walletAddress)
  })

  test('bins: opens a position and closes it in one call, deleting the emptied position', async () => {
    const send = { maxFee: microAlgo(200_000), coverAppCallInnerTransactionFees: true, populateAppCallResources: true }
    const engineClient = (
      await algorand.client
        .getTypedAppFactory(BinEngineFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
        .send.create.create({ args: { vault: dex.appId }, extraProgramPages: 3 })
    ).appClient
    await engineClient.appClient.fundAppAccount({ amount: microAlgo(200_000) })
    await dex.send.setCurveApproval({ args: { curve: engineClient.appId, lpMode: LpMode.Curve, approved: true }, ...send })
    const engine = new BinEngineSDK({ algorand, factoryParams: { appId: engineClient.appId, defaultSender: admin.addr, defaultSigner: admin.signer } })
    await engine.initBinStep({ binStep: 25n })

    const activeId = BINS_ID_CENTER + 16n
    const config = defaultPoolConfig(25n, { curve: engine.appId, curveMbr: BINS_CREATE_CURVE_MBR, curveArgs: encodeBinInitArgs(defaultBinPoolParams(activeId)) })
    const before = (await reader.listPools()).size
    await use(plugin.createPool({ assetA: token, assetB: quoteToken, config, payment: 2_000_000n + BINS_CREATE_CURVE_MBR }))
    const poolId = BigInt(before)

    const dist = spotDistribution(2n)
    await use(plugin.addLiquidityCurve({
      poolId,
      amountA: 1_000_000_000n,
      amountB: 1_000_000_000n,
      curveArgs: encodeBinAddArgs(activeId, 2n, dist),
      mbr: binAddMbr(activeId, dist, true),
    }))
    const [position] = await engine.listPositions(walletAddress, poolId)
    expect(position.owner).toBe(walletAddress)

    const ids = dist.map((d) => activeId + d.delta)
    await use(plugin.removeLiquidityCurve({
      poolId,
      positionId: position.positionId,
      curveArgs: encodeBinRemoveArgs(ids[0], ids[ids.length - 1], BINS_REMOVE_ALL),
      closePosition: true,
    }))
    expect(await engine.listPositions(walletAddress, poolId)).toEqual([])
  })
})
