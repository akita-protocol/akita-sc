/**
 * The akita-sdk PluginDex module end to end: hook stack validation and encoders, createPool with
 * lifecycle hooks, adds with the LP opt-in, quotes, swaps (with the output opt-in) and removes, all through
 * the SDK's own group building and resource population.
 */
import { AlgorandClient, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { beforeAll, describe, expect, test } from 'vitest'
import { BinEngineFactory } from '../artifacts/plugin-dex/curves/bins/BinEngineClient'
import { AntiSnipeFeeHookFactory } from '../artifacts/plugin-dex/hooks/AntiSnipeFeeHookClient'
import { LaunchTaxHookFactory } from '../artifacts/plugin-dex/hooks/LaunchTaxHookClient'
import { AbstractedAccountMbrFactory } from '../artifacts/arc58/account/AbstractedAccountMBRClient'
import { PluginDexClient } from '../artifacts/plugin-dex/PluginDexClient'
import { newWallet } from 'akita-sdk/wallet'
import { deployAbstractedAccountFactory } from '../../tests/fixtures/abstracted-account'
import { deployAkitaDAO } from '../../tests/fixtures/dao'
import { deployEscrowFactory } from '../../tests/fixtures/escrow'
import { deployVault } from '../../tests/fixtures/plugin-dex'
import {
  AntiSnipe,
  antiSnipeInstall,
  binAddMbr,
  BinEngineSDK,
  BINS_CREATE_CURVE_MBR,
  BINS_ID_CENTER,
  BINS_REMOVE_ALL,
  defaultBinPoolParams,
  encodeBinAddArgs,
  encodeBinInitArgs,
  encodeBinRemoveArgs,
  LpMode,
  spotDistribution,
  defaultPoolConfig,
  HookPerm,
  HookPoint,
  launchTaxInstall,
  PluginDexSDK,
  validateAntiSnipe,
  validateHookStack,
  validateLaunchTax,
  withSlippage,
} from '../../../akita-sdk/src/plugin-dex'

describe('akita-sdk PluginDexSDK', () => {
  const localnet = algorandFixture()
  let algorand: AlgorandClient
  let admin: TransactionSignerAccount
  let lp: TransactionSignerAccount
  let trader: TransactionSignerAccount
  let dex: PluginDexClient
  let snipeApp: bigint
  let taxApp: bigint
  let token: bigint

  const sdkFor = (account: TransactionSignerAccount) =>
    new PluginDexSDK({
      algorand,
      factoryParams: { appId: dex.appId, defaultSender: account.addr, defaultSigner: account.signer },
    })

  beforeAll(async () => {
    await localnet.newScope()
    algorand = localnet.context.algorand
    admin = localnet.context.testAccount
    const dispenser = await algorand.account.dispenserFromEnvironment()
    await algorand.account.ensureFunded(admin.addr, dispenser.addr, microAlgo(1_000_000_000))
    lp = await localnet.context.generateAccount({ initialFunds: microAlgo(200_000_000) })
    trader = await localnet.context.generateAccount({ initialFunds: microAlgo(50_000_000) })
    dex = await deployVault({ algorand, sender: admin })

    const send = { maxFee: microAlgo(200_000), coverAppCallInnerTransactionFees: true, populateAppCallResources: true }
    const snipe = (
      await algorand.client
        .getTypedAppFactory(AntiSnipeFeeHookFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
        .send.create.create({ args: { dex: dex.appId } })
    ).appClient
    const tax = (
      await algorand.client
        .getTypedAppFactory(LaunchTaxHookFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
        .send.create.create({ args: { dex: dex.appId } })
    ).appClient
    for (const hook of [snipe, tax]) await hook.appClient.fundAppAccount({ amount: microAlgo(100_000) })
    await dex.send.setHookApproval({ args: { hook: snipe.appId, perms: HookPerm.DynamicFee }, ...send })
    await dex.send.setHookApproval({ args: { hook: tax.appId, perms: HookPerm.HookFee | HookPerm.HookFeeOut }, ...send })
    snipeApp = snipe.appId
    taxApp = tax.appId

    token = (
      await algorand.send.assetCreate({ sender: lp.addr, signer: lp.signer, total: 10n ** 15n, decimals: 6, assetName: 'SDK Test', unitName: 'SDKT' })
    ).assetId
  })

  test('validates, creates a hooked pool, adds, quotes, swaps and removes', async () => {
    const sdk = sdkFor(lp)

    // the UI path: catalogue builders, stack + per-hook checks against the DAO approvals
    const config = defaultPoolConfig(30n, { maxFeeBps: 5_000n, maxHookFeeBps: 100n })
    const snipeInit = {
      startFeeBps: 5_000n,
      endFeeBps: 30n,
      decayMode: AntiSnipe.DecayLinear,
      decayRounds: 2n,
      startMode: AntiSnipe.StartCreation,
    }
    const taxInit = { owner: lp.addr.toString(), quoteAsset: 0n, buyTaxBps: 100n, sellTaxBps: 100n, untilRound: 0n }
    const hooks = [antiSnipeInstall(snipeApp, snipeInit), launchTaxInstall(taxApp, taxInit)]
    const approvals = await sdk.getHookApprovals([snipeApp, taxApp])
    expect(approvals.size).toBe(2)
    expect(validateHookStack(hooks, config, approvals)).toEqual([])
    expect(validateAntiSnipe(snipeInit, config)).toEqual([])
    expect(validateLaunchTax(taxInit, config)).toEqual([])
    expect(await sdk.getHookApproval(12345n)).toBeUndefined()

    // token first, ALGO second: the SDK puts the pair in Vault order
    const lpBefore = (await algorand.account.getInformation(lp.addr)).balance.microAlgo
    const { poolId, pool } = await sdk.createPool({ assetA: token, assetB: 0n, config, hooks })
    const lpAfter = (await algorand.account.getInformation(lp.addr)).balance.microAlgo
    expect([pool.assetA, pool.assetB]).toEqual([0n, token])
    expect(pool.lpAsset).toBeGreaterThan(0n)
    // the estimate is generous and the Vault refunds the excess: well under 2 ALGO was spent
    expect(lpBefore - lpAfter).toBeLessThan(2_000_000n)

    expect((await sdk.listPools()).get(poolId)?.escrow).toBe(pool.escrow)
    const installed = await sdk.getPoolHooks(poolId)
    expect(installed.map((h) => h.app)).toEqual([snipeApp, taxApp])
    expect(installed[1].points & HookPoint.AfterSwap).toBe(HookPoint.AfterSwap)
    expect(await sdk.getPairPools(token, 0n)).toContain(poolId)

    // add: the LP opt-in rides in the same group
    const minted = await sdk.addLiquidity({ poolId, amountA: 20_000_000n, amountB: 2_000_000_000n })
    expect(minted).toBeGreaterThan(0n)

    // let the anti-snipe fee decay, then quote and swap as a trader who has never held the token
    for (let i = 0; i < 3; i++) await algorand.send.payment({ sender: admin.addr, signer: admin.signer, receiver: admin.addr, amount: microAlgo(0), note: `tick ${i}` })
    const traderSdk = sdkFor(trader)
    const quoted = await traderSdk.quote({ poolId, assetIn: 0n, amountIn: 1_000_000n, swapper: trader.addr.toString() })
    expect(quoted).toBeGreaterThan(0n)
    const out = await traderSdk.swap({ poolId, assetIn: 0n, amountIn: 1_000_000n, minAmountOut: withSlippage(quoted, 50n) })
    expect(out).toBeGreaterThanOrEqual(withSlippage(quoted, 50n))
    expect((await algorand.asset.getAccountInformation(trader.addr, token)).balance).toBe(out)

    // a single-pool route quotes and swaps the same way
    const routeQuote = await traderSdk.quoteRoute({ route: [poolId], assetIn: token, amountIn: out / 2n, swapper: trader.addr.toString() })
    expect(routeQuote).toBeGreaterThan(0n)
    const back = await traderSdk.swapRoute({ route: [poolId], assetIn: token, amountIn: out / 2n, minAmountOut: withSlippage(routeQuote, 50n) })
    expect(back).toBeGreaterThan(0n)

    // remove half the LP
    const removed = await sdk.removeLiquidity({ poolId, lpAmount: minted / 2n })
    expect(removed.amountA).toBeGreaterThan(0n)
    expect(removed.amountB).toBeGreaterThan(0n)
  })

  test('bins: stores the step table, creates a curve pool, adds a spot position, swaps and exits with a sync', async () => {
    const send = { maxFee: microAlgo(200_000), coverAppCallInnerTransactionFees: true, populateAppCallResources: true }
    const engineClient = (
      await algorand.client
        .getTypedAppFactory(BinEngineFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
        .send.create.create({ args: { vault: dex.appId }, extraProgramPages: 3 })
    ).appClient
    await engineClient.appClient.fundAppAccount({ amount: microAlgo(200_000) })
    await dex.send.setCurveApproval({ args: { curve: engineClient.appId, lpMode: LpMode.Curve, approved: true }, ...send })

    const engine = new BinEngineSDK({ algorand, factoryParams: { appId: engineClient.appId, defaultSender: lp.addr, defaultSigner: lp.signer } })
    expect(await engine.hasBinStep(25n)).toBe(false)
    await engine.initBinStep({ binStep: 25n })
    expect(await engine.hasBinStep(25n)).toBe(true)

    // a second token so both sides are ASAs (bins pools never hold ALGO here, matching the engine tests)
    const other = (
      await algorand.send.assetCreate({ sender: lp.addr, signer: lp.signer, total: 10n ** 15n, decimals: 6, assetName: 'SDK Quote', unitName: 'SDKQ' })
    ).assetId
    const sdk = sdkFor(lp)
    const activeId = BINS_ID_CENTER + 16n
    // both tokens have 6 decimals: the default dust floor is one whole token per bin (AUD-C10)
    const params = defaultBinPoolParams(activeId, 6)
    expect(params.minBinShares).toBe(10n ** 6n * 2n ** 32n)
    const { poolId, pool } = await sdk.createPool({
      assetA: token,
      assetB: other,
      config: defaultPoolConfig(25n, { curve: engine.appId, curveMbr: BINS_CREATE_CURVE_MBR, curveArgs: encodeBinInitArgs(params) }),
    })
    expect(pool.curve).toBe(engine.appId)
    expect(pool.lpAsset).toBe(0n)

    const dist = spotDistribution(3n)
    const added = await sdk.addLiquidityCurve({
      poolId,
      amountA: 5_000_000_000n,
      amountB: 5_000_000_000n,
      curveArgs: encodeBinAddArgs(activeId, 2n, dist),
      mbr: binAddMbr(activeId, dist, true),
    })
    expect(added.positionId).toBeGreaterThan(0n)
    expect(added.shares).toBeGreaterThan(0n)
    const position = await engine.getPosition(added.positionId)
    expect(position).toMatchObject({ owner: lp.addr.toString(), poolId, lowerId: activeId - 3n, width: 7n })
    expect((await engine.listPositions(lp.addr.toString(), poolId)).map((p) => p.positionId)).toEqual([added.positionId])

    const traderSdk = sdkFor(trader)
    await algorand.send.assetOptIn({ sender: trader.addr, signer: trader.signer, assetId: other })
    await algorand.send.assetTransfer({ sender: lp.addr, signer: lp.signer, receiver: trader.addr, assetId: other, amount: 100_000_000n })
    const quoted = await traderSdk.quote({ poolId, assetIn: other, amountIn: 10_000_000n, swapper: trader.addr.toString() })
    expect(quoted).toBeGreaterThan(0n)
    const out = await traderSdk.swap({ poolId, assetIn: other, amountIn: 10_000_000n, minAmountOut: withSlippage(quoted, 50n) })
    expect(out).toBeGreaterThanOrEqual(withSlippage(quoted, 50n))

    // the exit: sync runs first in the same group (§12.1 rule 2), then the whole position comes out
    const ids = dist.map((d) => activeId + d.delta)
    const removed = await sdk.removeLiquidityCurve({
      poolId,
      positionId: added.positionId,
      curveArgs: encodeBinRemoveArgs(ids[0], ids[ids.length - 1], BINS_REMOVE_ALL),
    })
    expect(removed.amountA + removed.amountB).toBeGreaterThan(0n)
  })

  test('acts for an Akita wallet with the flash rekey: create, swap (auto opt-in), add and remove from the wallet', async () => {
    if (!process.env.WALLET_MBR_APP_ID) {
      const { appClient } = await algorand.client
        .getTypedAppFactory(AbstractedAccountMbrFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
        .send.create.bare()
      process.env.WALLET_MBR_APP_ID = appClient.appId.toString()
    }
    const dao = await deployAkitaDAO({ fixture: localnet, sender: admin.addr, signer: admin.signer, apps: {} })
    const escrowFactory = await deployEscrowFactory({ fixture: localnet, sender: admin.addr, signer: admin.signer })
    const walletFactory = await deployAbstractedAccountFactory({
      fixture: localnet,
      sender: admin.addr,
      signer: admin.signer,
      args: { akitaDao: dao.appId, escrowFactory: escrowFactory.appId },
    })
    const owner = await localnet.context.generateAccount({ initialFunds: microAlgo(20_000_000) })
    const wallet = await newWallet({
      algorand,
      factoryParams: { appId: walletFactory.appId, defaultSender: owner.addr, defaultSigner: owner.signer },
      sender: owner.addr,
      signer: owner.signer,
      nickname: 'dex wallet',
    })
    const walletAddress = wallet.client.appAddress.toString()
    await algorand.send.payment({ sender: admin.addr, signer: admin.signer, receiver: walletAddress, amount: microAlgo(30_000_000) })

    const sdk = sdkFor(lp).asWallet({
      walletAppId: wallet.client.appId,
      controlledAddress: walletAddress,
      admin: owner.addr.toString(),
      signer: owner.signer,
    })

    // the wallet creates a plain pool and the LP seeds it from outside
    const { poolId, pool } = await sdk.createPool({ assetA: 0n, assetB: token, config: defaultPoolConfig(100n) })
    expect(pool.creator).toBe(walletAddress)
    await sdkFor(lp).addLiquidity({ poolId, amountA: 10_000_000n, amountB: 1_000_000_000n })

    // a swap from the wallet opts it into the token in the same group
    const quoted = await sdk.quote({ poolId, assetIn: 0n, amountIn: 2_000_000n, swapper: walletAddress })
    const out = await sdk.swap({ poolId, assetIn: 0n, amountIn: 2_000_000n, minAmountOut: withSlippage(quoted, 50n) })
    expect((await algorand.asset.getAccountInformation(walletAddress, token)).balance).toBe(out)

    // the wallet adds (LP opt-in in the group) and removes; the LP tokens and the exit stay in the wallet
    const minted = await sdk.addLiquidity({ poolId, amountA: 1_000_000n, amountB: out / 2n })
    expect((await algorand.asset.getAccountInformation(walletAddress, pool.lpAsset)).balance).toBe(minted)
    const removed = await sdk.removeLiquidity({ poolId, lpAmount: minted })
    expect(removed.amountA).toBeGreaterThan(0n)

    // every group handed the controlled address back to the wallet app
    const info = await algorand.account.getInformation(walletAddress)
    expect(info.authAddr?.toString() ?? walletAddress).toBe(walletAddress)
  })
})
