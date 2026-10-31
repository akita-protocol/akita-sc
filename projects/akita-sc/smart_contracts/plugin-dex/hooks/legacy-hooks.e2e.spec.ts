import { AlgorandClient, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { ALGORAND_ZERO_ADDRESS_STRING, getApplicationAddress } from 'algosdk'
import { beforeAll, describe, expect, test } from 'vitest'
import { PluginDexClient } from '../../artifacts/plugin-dex/PluginDexClient'
import { ImpactFeeHookFactory } from '../../artifacts/plugin-dex/hooks/ImpactFeeHookClient'
import { SwapTaxHookClient, SwapTaxHookFactory } from '../../artifacts/plugin-dex/hooks/SwapTaxHookClient'
import { MockDexHookFactory } from '../../artifacts/plugin-dex/tests/MockDexHookClient'
import { createPool, deployVault, hookInstall, holding, poolConfig, transferTxn } from '../../../tests/fixtures/plugin-dex'
import { expectContractError } from '../../../tests/utils/errors'

// Stabilize (hooks lows): the legacy ImpactFeeHook and SwapTaxHook price only at BeforeSwap/Quote and pass at
// every other subscribed point; ImpactFeeHook never panics on an impact that does not fit in uint64.

const AFTER_INITIALIZE = 1n
const AFTER_ADD = 4n
const BEFORE_SWAP = 32n
const AFTER_SWAP = 64n
const QUOTE = 128n
const POKE = 256n
const DYNAMIC_FEE = 2n
const HOOK_FEE = 4n
const MAX_UINT64 = (1n << 64n) - 1n
// MockDexHook
const MODE_SET_FEE = 5n

const send = { maxFee: microAlgo(200_000), coverAppCallInnerTransactionFees: true, populateAppCallResources: true }

/** native CP output with no protocol fee */
const cpOut = (amountIn: bigint, rIn: bigint, rOut: bigint, feeBps: bigint) => {
  const eff = amountIn - (amountIn * feeBps) / 10_000n
  return (eff * rOut) / (rIn + eff)
}

describe('legacy pricing hooks (ImpactFeeHook, SwapTaxHook)', () => {
  const localnet = algorandFixture()
  let algorand: AlgorandClient
  let admin: TransactionSignerAccount
  let trader: TransactionSignerAccount
  let dex: PluginDexClient
  let tka: bigint
  let tkb: bigint

  const deployImpact = async (minFeeBps: bigint, maxFeeBps: bigint, slopeBps: bigint) => {
    const { appClient } = await algorand.client
      .getTypedAppFactory(ImpactFeeHookFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
      .send.create.create({ args: { dex: dex.appId, minFeeBps, maxFeeBps, slopeBps } })
    await dex.send.setHookApproval({ args: { hook: appClient.appId, perms: DYNAMIC_FEE }, ...send })
    return appClient.appId
  }

  const newPool = async (assetA: bigint, assetB: bigint, hooks: ReturnType<typeof hookInstall>[], overrides: Parameters<typeof poolConfig>[1] = {}) =>
    (await createPool({ algorand, dex, sender: admin, assetA, assetB, config: poolConfig(30n, overrides), hooks, optInLp: [trader] })).poolId

  /** `n` PluginDex.opUp() carriers (opcode budget and reference slots) in front of a Vault call */
  const withCarriers = (n: number) => {
    let group = dex.newGroup()
    for (let i = 0; i < n; i++) {
      group = group.opUp({ sender: trader.addr, signer: trader.signer, args: [], note: `carrier ${i} ${Math.random()}`, maxFee: send.maxFee }) as unknown as typeof group
    }
    return group
  }

  const quote = async (poolId: bigint, assetIn: bigint, amountIn: bigint) => {
    const { returns } = await withCarriers(1)
      .quote({ sender: trader.addr, signer: trader.signer, args: { poolId, assetIn, amountIn, swapper: ALGORAND_ZERO_ADDRESS_STRING, data: new Uint8Array(), wallet: 0n }, maxFee: send.maxFee })
      .send(send)
    return returns.at(-1) as unknown as bigint
  }

  const swap = async (poolId: bigint, assetIn: bigint, amountIn: bigint) => {
    const pool = await dex.getPool({ args: { poolId } })
    const { returns } = await withCarriers(1)
      .swap({
        sender: trader.addr,
        signer: trader.signer,
        args: {
          input: transferTxn(algorand, trader, getApplicationAddress(pool.escrow).toString(), assetIn, amountIn),
          poolId,
          minAmountOut: 0n,
          recipient: ALGORAND_ZERO_ADDRESS_STRING,
          data: new Uint8Array(),
          wallet: 0n,
        },
        maxFee: send.maxFee,
      })
      .send(send)
    return returns.at(-1) as unknown as bigint
  }

  /** addLiquidity with carriers (hooked pools run AfterAddLiquidity hooks) */
  const addLiquidity = async (poolId: bigint, amountA: bigint, amountB: bigint) => {
    const pool = await dex.getPool({ args: { poolId } })
    const escrow = getApplicationAddress(pool.escrow).toString()
    await withCarriers(2)
      .addLiquidity({
        sender: trader.addr,
        signer: trader.signer,
        args: {
          depositA: transferTxn(algorand, trader, escrow, pool.assetA, amountA),
          depositB: transferTxn(algorand, trader, escrow, pool.assetB, amountB),
          poolId,
          minLpOut: 0n,
          data: new Uint8Array(),
        },
        maxFee: send.maxFee,
      })
      .send(send)
  }

  const poke = (poolId: bigint, hookIndex = 0n) =>
    withCarriers(1)
      .poke({ sender: trader.addr, signer: trader.signer, args: { poolId, hookIndex, data: new Uint8Array() }, maxFee: send.maxFee })
      .send(send)

  beforeAll(async () => {
    await localnet.newScope()
    algorand = localnet.algorand
    admin = localnet.context.testAccount
    const dispenser = await algorand.account.dispenserFromEnvironment()
    await algorand.account.ensureFunded(admin.addr, dispenser.addr, (100).algo())
    trader = await localnet.context.generateAccount({ initialFunds: (100).algo() })
    for (const unitName of ['LGA', 'LGB']) {
      const { assetId } = await algorand.send.assetCreate({ sender: admin.addr, total: 10n ** 17n, decimals: 6, unitName })
      await algorand.send.assetOptIn({ sender: trader.addr, assetId })
      await algorand.send.assetTransfer({ sender: admin.addr, receiver: trader.addr, assetId, amount: 10n ** 16n })
      if (unitName === 'LGA') tka = assetId
      else tkb = assetId
    }
    if (tka > tkb) [tka, tkb] = [tkb, tka]
    dex = await deployVault({ algorand, sender: admin })
  })

  describe('SwapTaxHook', () => {
    let tax: SwapTaxHookClient

    beforeAll(async () => {
      tax = (
        await algorand.client
          .getTypedAppFactory(SwapTaxHookFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
          .send.create.create({ args: { dex: dex.appId, owner: admin.addr.toString(), taxBps: 100n } })
      ).appClient
      await tax.appClient.fundAppAccount({ amount: (1).algo() })
      await tax.send.optIn({ args: { asset: tka }, ...send })
      await dex.send.setHookApproval({ args: { hook: tax.appId, perms: HOOK_FEE }, ...send })
    })

    test('subscribed to extra points (AfterInitialize, AfterAddLiquidity, AfterSwap, Poke): taxes once, never blocks the pool', async () => {
      // before the fix the hook returned a hookFee at AfterSwap (and every other point) and the Vault failed
      // the swap with a hook permission error, making the pool unswappable
      const points = AFTER_INITIALIZE | AFTER_ADD | BEFORE_SWAP | QUOTE | AFTER_SWAP | POKE
      const poolId = await newPool(0n, tka, [hookInstall({ app: tax.appId, points, perms: HOOK_FEE })], { maxHookFeeBps: 200n })
      await addLiquidity(poolId, 10_000_000n, 10_000_000n)
      const pool = await dex.getPool({ args: { poolId } })
      const amount = 1_000_000n
      const taxed = (amount * 100n) / 10_000n
      const quoted = await quote(poolId, tka, amount)
      expect(quoted).toBe(cpOut(amount - taxed, pool.reserveB, pool.reserveA, 30n))
      const before = await holding(algorand, tax.appAddress.toString(), tka)
      expect(await swap(poolId, tka, amount)).toBe(quoted)
      expect((await holding(algorand, tax.appAddress.toString(), tka)) - before).toBe(taxed)
      await poke(poolId)
    })

    test('create rejects a tax above 100% (errStbp), so the tax never overflows', async () => {
      await expectContractError(
        algorand.client
          .getTypedAppFactory(SwapTaxHookFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
          .send.create.create({ args: { dex: dex.appId, owner: admin.addr.toString(), taxBps: 10_001n } }),
        'errStbp',
      )
    })
  })

  describe('ImpactFeeHook', () => {
    test('subscribed to extra points (AfterSwap, Poke, AfterAddLiquidity): prices once, passes elsewhere', async () => {
      const impact = await deployImpact(10n, 500n, 5_000n)
      const points = AFTER_ADD | BEFORE_SWAP | QUOTE | AFTER_SWAP | POKE
      const poolId = await newPool(0n, tka, [hookInstall({ app: impact, points, perms: DYNAMIC_FEE })])
      await addLiquidity(poolId, 10_000_000n, 10_000_000n)
      const pool = await dex.getPool({ args: { poolId } })
      // 5% of reserves: impact 500 bps · slope 0.5 + 10 = 260 bps
      const quoted = await quote(poolId, 0n, 500_000n)
      expect(quoted).toBe(cpOut(500_000n, pool.reserveA, pool.reserveB, 260n))
      expect(await swap(poolId, 0n, 500_000n)).toBe(quoted)
      await poke(poolId)
    })

    test('never panics: an impact past uint64 (tiny input reserve) or a slope product past uint64 charges max_fee', async () => {
      // amountIn·1e4 / reserveIn ≥ 2^64: before the fix divw panicked and the quote (and tryQuoteRoute) reverted
      const impact = await deployImpact(10n, 500n, 5_000n)
      const tiny = await newPool(tka, tkb, [hookInstall({ app: impact, points: BEFORE_SWAP | QUOTE, perms: DYNAMIC_FEE })])
      await addLiquidity(tiny, 1n, 100_000_000n)
      const pool = await dex.getPool({ args: { poolId: tiny } })
      expect(pool.reserveA).toBe(1n)
      const big = 2n * 10n ** 15n
      expect((big * 10_000n) >> 64n).toBeGreaterThanOrEqual(pool.reserveA)
      const quoted = await quote(tiny, tka, big)
      expect(quoted).toBe(cpOut(big, pool.reserveA, pool.reserveB, 500n))

      // impactBps · slope ≥ 1e4 · 2^64: before the fix the second divw panicked
      const steep = await deployImpact(10n, 500n, MAX_UINT64)
      const poolId = await newPool(0n, tka, [hookInstall({ app: steep, points: BEFORE_SWAP | QUOTE, perms: DYNAMIC_FEE })])
      await addLiquidity(poolId, 10_000_000n, 10_000_000n)
      const p2 = await dex.getPool({ args: { poolId } })
      const amount = 2n * p2.reserveA
      expect(((amount * 10_000n) / p2.reserveA) * MAX_UINT64).toBeGreaterThanOrEqual(10_000n << 64n)
      const q2 = await quote(poolId, 0n, amount)
      expect(q2).toBe(cpOut(amount, p2.reserveA, p2.reserveB, 500n))
      expect(await swap(poolId, 0n, amount)).toBe(q2)
    })

    // OPEN-DECISIONS #21 (Kyle, 2026-10-03: option b): the hook returns max(ctx.feeBps, its fee). Before the
    // change it set its fee absolutely, so placed after a fee-raising hook it lowered that fee (800 → 260 below),
    // and on a pool whose base fee exceeds its computed fee it discounted small trades (300 → 15 below).

    /** a MockDexHook that sets `feeBps` at every pricing point (AntiSnipe stand-in) */
    const deployFixedFee = async (feeBps: bigint) => {
      const { appClient } = await algorand.client
        .getTypedAppFactory(MockDexHookFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
        .send.create.create({ args: { dex: dex.appId } })
      await appClient.send.configure({ args: { mode: MODE_SET_FEE, value: feeBps, value2: 0n, target: ALGORAND_ZERO_ADDRESS_STRING } })
      await dex.send.setHookApproval({ args: { hook: appClient.appId, perms: DYNAMIC_FEE }, ...send })
      return appClient.appId
    }

    /** quote, swap, and expect both to price at exactly `feeBps` */
    const expectSwapAtFee = async (poolId: bigint, amountIn: bigint, feeBps: bigint) => {
      const pool = await dex.getPool({ args: { poolId } })
      const quoted = await quote(poolId, 0n, amountIn)
      expect(quoted).toBe(cpOut(amountIn, pool.reserveA, pool.reserveB, feeBps))
      expect(await swap(poolId, 0n, amountIn)).toBe(quoted)
    }

    test('#21: [fee-raising hook, ImpactFee] keeps the higher earlier fee; ImpactFee still raises a lower one', async () => {
      // the ALGO-side pools below need ~70 ALGO on top of what the earlier tests spent
      const dispenser = await algorand.account.dispenserFromEnvironment()
      await algorand.account.ensureFunded(trader.addr, dispenser.addr, (80).algo())
      const impact = await deployImpact(10n, 500n, 5_000n)
      const pricing = (app: bigint) => hookInstall({ app, points: BEFORE_SWAP | QUOTE, perms: DYNAMIC_FEE })

      const high = await newPool(0n, tka, [pricing(await deployFixedFee(800n)), pricing(impact)])
      await addLiquidity(high, 10_000_000n, 10_000_000n)
      // 5% of reserves: ImpactFee computes 260 bps < 800, so the earlier 800 stands (v1 lowered it to 260)
      await expectSwapAtFee(high, 500_000n, 800n)
      // a whale trade computes max_fee 500, still below the earlier 800
      const whale = (await dex.getPool({ args: { poolId: high } })).reserveA / 5n
      await expectSwapAtFee(high, whale, 800n)

      const low = await newPool(0n, tka, [pricing(await deployFixedFee(100n)), pricing(impact)])
      await addLiquidity(low, 10_000_000n, 10_000_000n)
      // 5% of reserves: 260 > 100, so ImpactFee raises it
      await expectSwapAtFee(low, 500_000n, 260n)
    })

    test('#21: a pool base fee above the computed fee is kept for small trades; large trades still pay more', async () => {
      const impact = await deployImpact(10n, 500n, 5_000n)
      const poolId = await newPool(0n, tka, [hookInstall({ app: impact, points: BEFORE_SWAP | QUOTE, perms: DYNAMIC_FEE })], { feeBps: 300n, custodyFeeBps: 300n })
      await addLiquidity(poolId, 10_000_000n, 10_000_000n)
      expect((await dex.getPool({ args: { poolId } })).feeBps).toBe(300n)
      // 0.1% of reserves: ImpactFee computes 10 + 10·0.5 = 15 bps < base 300 (v1 charged 15)
      await expectSwapAtFee(poolId, 10_000n, 300n)
      // ~5% of reserves: ~260 bps, still below 300
      await expectSwapAtFee(poolId, 500_000n, 300n)
      // ≥ 10% of reserves: capped at max_fee 500 > 300
      const big = (await dex.getPool({ args: { poolId } })).reserveA / 5n
      await expectSwapAtFee(poolId, big, 500n)
    })
  })
})
