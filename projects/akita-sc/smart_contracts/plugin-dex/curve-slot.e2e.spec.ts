import { AlgorandClient, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { ALGORAND_ZERO_ADDRESS_STRING, getApplicationAddress, modelsv2 } from 'algosdk'
import { beforeAll, describe, expect, test } from 'vitest'
import { PluginDexClient, PluginDexComposer, PoolConfig } from '../artifacts/plugin-dex/PluginDexClient'
import { MockCurveClient, MockCurveFactory } from '../artifacts/plugin-dex/tests/MockCurveClient'
import { APP_SPEC as MockCurveV2Spec, MockCurveV2Client } from '../artifacts/plugin-dex/tests/MockCurveV2Client'
import { MockDexHookClient, MockDexHookFactory } from '../artifacts/plugin-dex/tests/MockDexHookClient'
import { RecordingDexHookFactory } from '../artifacts/plugin-dex/tests/RecordingDexHookClient'
import { expectContractError } from '../../tests/utils/errors'
import {
  addLiquidity,
  assertEscrowIdentity,
  createPool,
  deployVault,
  holding,
  hookInstall,
  poolConfig,
  transferTxn,
} from '../../tests/fixtures/plugin-dex'

// FINAL-SPEC §4.12 test 13: the curve slot (MockCurve honest constant product in both LP modes, every
// §4.5 evil mode, L2 under a permissive Settle), plus the WP0 leftovers (§10 A1 curve-pool both-negative
// custody, A2 Settle carries the real poolId) and the curve-pool exits.

const LP_FUNGIBLE = 0n
const LP_CURVE = 1n
// MockCurve modes (tests/mock-curve.algo.ts)
const CURVE = {
  honest: 0n,
  wrongAggregate: 1n,
  betterThanBand: 2n,
  priceWrongSide: 3n,
  lpFeeAboveMax: 4n,
  protocolFeeBelowFloor: 5n,
  overMint: 6n,
  addMovesPrice: 7n,
  initNonZero: 8n,
  permissiveSettle: 9n,
  revertAll: 10n,
  quoteZero: 11n,
  close: 12n,
  burnBudget: 13n,
  removeOverpay: 14n,
  removeMovesPrice: 15n,
  settleWrongSide: 16n,
  settleWrongAggregate: 17n,
}
const CURVE_OP = { init: 1n, swap: 2n, quote: 3n, add: 4n, remove: 5n, settle: 6n }
// hook points / perms, MockDexHook modes
const BEFORE_REMOVE = 8n
const AFTER_ADD = 4n
const AFTER_SWAP = 64n
const POKE = 256n
const CUSTODY = 1n
const HOOK = { pass: 0n, steal: 1n, trade: 7n, stealBoth: 8n }

const ZERO = ALGORAND_ZERO_ADDRESS_STRING
const NO_DATA = new Uint8Array()
const CURVE_MBR = 100_000n

const send = { maxFee: microAlgo(200_000), coverAppCallInnerTransactionFees: true, populateAppCallResources: true }

const u64 = (n: bigint) => Uint8Array.from({ length: 8 }, (_, i) => Number((n >> BigInt(8 * (7 - i))) & 0xffn))
/** MockCurve Init args: the initial price, B per A = initB / initA */
const initArgs = (initA: bigint, initB: bigint) => new Uint8Array([...u64(initA), ...u64(initB)])
/** floor(eB · 2^64 / eA) as 16 big-endian bytes */
const priceX64 = (eA: bigint, eB: bigint): Uint8Array => {
  const value = eA === 0n ? 0n : (eB << 64n) / eA
  return Uint8Array.from({ length: 16 }, (_, i) => Number((value >> BigInt(8 * (15 - i))) & 0xffn))
}
const ceilDiv = (a: bigint, b: bigint) => (a + b - 1n) / b
/** smallest G with (A + G − ceil(G·fee/1e4))·(B − take) ≥ A·B (the fee-adjusted k check) */
const minAlgoWithFee = (a: bigint, b: bigint, take: bigint, fee: bigint) => {
  const ok = (g: bigint) => (a + g - ceilDiv(g * fee, 10_000n)) * (b - take) >= a * b
  let lo = 0n
  let hi = 2n * ceilDiv(a * b, b - take)
  while (lo < hi) {
    const mid = (lo + hi) / 2n
    if (ok(mid)) hi = mid
    else lo = mid + 1n
  }
  return lo
}

describe('PluginDex v2 curve slot (§4.12 test 13)', () => {
  const localnet = algorandFixture()
  let algorand: AlgorandClient
  let admin: TransactionSignerAccount
  let trader: TransactionSignerAccount
  let other: TransactionSignerAccount
  let dex: PluginDexClient
  let tka: bigint
  let fungible: MockCurveClient
  let managed: MockCurveClient

  const deployCurve = async (lpMode: bigint, approve = true): Promise<MockCurveClient> => {
    const curve = (
      await algorand.client
        .getTypedAppFactory(MockCurveFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
        .send.create.create({ args: { vault: dex.appId, lpMode } })
    ).appClient
    // account minimum balance; pool and position box MBR comes from curveMbr / the add's mbr payment
    await curve.appClient.fundAppAccount({ amount: (1).algo() })
    if (approve) await dex.send.setCurveApproval({ args: { curve: curve.appId, lpMode, approved: true }, ...send })
    return curve
  }

  const deployMockHook = async (): Promise<MockDexHookClient> => {
    const hook = (
      await algorand.client
        .getTypedAppFactory(MockDexHookFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
        .send.create.create({ args: { dex: dex.appId } })
    ).appClient
    await hook.appClient.fundAppAccount({ amount: (2).algo() })
    await hook.send.optIn({ args: { asset: tka }, ...send })
    await dex.send.setHookApproval({ args: { hook: hook.appId, perms: CUSTODY }, ...send })
    return hook
  }

  const configureHook = (hook: MockDexHookClient, mode: bigint, value = 0n, value2 = 0n) =>
    hook.send.configure({ args: { mode, value, value2, target: ZERO }, ...send })

  const curveConfig = (curve: MockCurveClient, overrides: Partial<PoolConfig> = {}, initA = 1n, initB = 1n) =>
    poolConfig(30n, { curve: curve.appId, curveMbr: CURVE_MBR, curveArgs: initArgs(initA, initB), ...overrides })

  const newPool = async (config: PoolConfig, hooks: ReturnType<typeof hookInstall>[] = []) =>
    createPool({ algorand, dex, sender: admin, assetA: 0n, assetB: tka, config, hooks, optInLp: [trader] })

  /** a curve (or native) pool on (ALGO, tka) with an initial fungible deposit */
  const livePool = async (
    config: PoolConfig,
    hooks: ReturnType<typeof hookInstall>[] = [],
    a = 10_000_000n,
    b = 10_000_000n,
  ) => {
    const created = await newPool(config, hooks)
    const minted = await addLiquidity(algorand, dex, trader, created.poolId, a, b)
    return { ...created, minted }
  }

  const pool = (poolId: bigint) => dex.getPool({ args: { poolId } })

  const swap = async (poolId: bigint, assetIn: bigint, amountIn: bigint) => {
    const { escrow } = await pool(poolId)
    return (
      await dex.send.swap({
        sender: trader.addr,
        args: {
          input: transferTxn(algorand, trader, getApplicationAddress(escrow).toString(), assetIn, amountIn),
          poolId,
          minAmountOut: 0n,
          recipient: ZERO,
          data: NO_DATA,
          wallet: 0n,
        },
        ...send,
      })
    ).return!
  }

  const quote = (poolId: bigint, assetIn: bigint, amountIn: bigint) =>
    dex.send.quote({ args: { poolId, assetIn, amountIn, swapper: ZERO, data: NO_DATA, wallet: 0n }, ...send })

  const tryQuote = async (poolId: bigint, assetIn: bigint, amountIn: bigint) =>
    (
      await dex.send.tryQuoteRoute({
        args: { route: [poolId], assetIn, amountIn, swapper: ZERO, data: NO_DATA, wallet: 0n },
        ...send,
      })
    ).return!

  /**
   * `carrier`: put one opUp() reference carrier first in the group. algokit 9.2.2 adds the asset again for
   * every asset holding it places, so a curve remove can overflow the 8 references of one call now that the
   * Vault needs a third box ref of read quota (FINAL-SPEC §10 A11, A19). The remove stays last.
   */
  const removeLp = async (poolId: bigint, lpAsset: bigint, amount: bigint, carrier = false) => {
    let group = dex.newGroup() as PluginDexComposer<unknown[]>
    if (carrier) {
      group = group.opUp({ sender: trader.addr, args: [], note: 'reference carrier', maxFee: send.maxFee }) as PluginDexComposer<
        unknown[]
      >
    }
    group = group.removeLiquidity({
      sender: trader.addr,
      args: {
        lpTransfer: algorand.createTransaction.assetTransfer({
          sender: trader.addr,
          receiver: dex.appAddress,
          assetId: lpAsset,
          amount,
        }),
        poolId,
        minAmountA: 0n,
        minAmountB: 0n,
        data: NO_DATA,
      },
      maxFee: send.maxFee,
    }) as PluginDexComposer<unknown[]>
    const result = await group.send({ coverAppCallInnerTransactionFees: true, populateAppCallResources: true })
    return { ...result, return: result.returns.at(-1) as unknown as { amountA: bigint; amountB: bigint } | undefined }
  }

  const emergencyRemove = (poolId: bigint, lpAsset: bigint, amount: bigint) =>
    dex.send.emergencyRemoveLiquidity({
      sender: trader.addr,
      args: {
        lpTransfer: algorand.createTransaction.assetTransfer({
          sender: trader.addr,
          receiver: dex.appAddress,
          assetId: lpAsset,
          amount,
        }),
        poolId,
        minAmountA: 0n,
        minAmountB: 0n,
      },
      ...send,
    })

  const addCurve = async (
    poolId: bigint,
    amountA: bigint,
    amountB: bigint,
    positionId = 0n,
    account: TransactionSignerAccount = trader,
    mbr = CURVE_MBR,
  ) => {
    const { escrow } = await pool(poolId)
    const escrowAddress = getApplicationAddress(escrow).toString()
    return (
      await dex.send.addLiquidityCurve({
        sender: account.addr,
        args: {
          mbr: algorand.createTransaction.payment({
            sender: account.addr,
            receiver: dex.appAddress,
            amount: microAlgo(mbr),
          }),
          depositA: transferTxn(algorand, account, escrowAddress, 0n, amountA),
          depositB: transferTxn(algorand, account, escrowAddress, tka, amountB),
          poolId,
          positionId,
          minShares: 0n,
          curveArgs: NO_DATA,
          data: NO_DATA,
        },
        ...send,
      })
    ).return!
  }

  const removeCurve = async (poolId: bigint, positionId: bigint, shares?: bigint, account = trader) =>
    (
      await dex.send.removeLiquidityCurve({
        sender: account.addr,
        args: {
          poolId,
          positionId,
          minAmountA: 0n,
          minAmountB: 0n,
          curveArgs: shares === undefined ? NO_DATA : u64(shares),
          data: NO_DATA,
        },
        ...send,
      })
    ).return!

  const lpBalance = async (lpAsset: bigint) => holding(algorand, trader.addr.toString(), lpAsset)

  beforeAll(async () => {
    await localnet.newScope()
    algorand = localnet.algorand
    admin = localnet.context.testAccount
    trader = await localnet.context.generateAccount({ initialFunds: (1_000).algo() })
    other = await localnet.context.generateAccount({ initialFunds: (100).algo() })
    const dispenser = await algorand.account.dispenserFromEnvironment()
    await algorand.account.ensureFunded(admin.addr, dispenser.addr, (2_000).algo())

    tka = (await algorand.send.assetCreate({ sender: admin.addr, total: 10n ** 15n, decimals: 6, unitName: 'TKA' }))
      .assetId
    for (const account of [trader, other]) {
      await algorand.send.assetOptIn({ sender: account.addr, assetId: tka })
      await algorand.send.assetTransfer({
        sender: admin.addr,
        receiver: account.addr,
        assetId: tka,
        amount: 10n ** 12n,
      })
    }

    dex = await deployVault({ algorand, sender: admin })
    fungible = await deployCurve(LP_FUNGIBLE)
    managed = await deployCurve(LP_CURVE)
  })

  describe('honest constant product', () => {
    test('LpModeFungible: quote == swap, and add, swap and remove match a native pool number for number', async () => {
      const native = await livePool(poolConfig(30n))
      const curved = await livePool(curveConfig(fungible))
      expect(curved.minted).toBe(native.minted)
      const created = await pool(curved.poolId)
      expect([created.curve, created.curveVersion, created.lpMode]).toEqual([fungible.appId, 0n, LP_FUNGIBLE])
      expect(created.priceX64).toEqual(priceX64(1n, 1n))

      for (const [assetIn, amountIn] of [
        [0n, 1_000_000n],
        [tka, 500_000n],
      ] as const) {
        const quoted = (await quote(curved.poolId, assetIn, amountIn)).return!
        expect(quoted).toBe((await quote(native.poolId, assetIn, amountIn)).return!)
        expect(await swap(curved.poolId, assetIn, amountIn)).toBe(quoted)
        expect(await swap(native.poolId, assetIn, amountIn)).toBe(quoted)
      }

      // an unbalanced second deposit: the scarcer side sets the LP, the excess is refunded
      const second = await addLiquidity(algorand, dex, trader, curved.poolId, 1_000_000n, 3_000_000n)
      expect(second).toBe(await addLiquidity(algorand, dex, trader, native.poolId, 1_000_000n, 3_000_000n))

      const burn = (await lpBalance(curved.lpAsset)) / 3n
      const out = (await removeLp(curved.poolId, curved.lpAsset, burn)).return!
      expect(out).toEqual((await removeLp(native.poolId, native.lpAsset, burn)).return!)
      expect(await fungible.state.global.lastOp()).toBe(CURVE_OP.remove)

      const [n, c] = [await pool(native.poolId), await pool(curved.poolId)]
      expect([c.reserveA, c.reserveB, c.lpSupply, c.protocolFeesA, c.protocolFeesB]).toEqual([
        n.reserveA,
        n.reserveB,
        n.lpSupply,
        n.protocolFeesA,
        n.protocolFeesB,
      ])
      // the cached price follows the curve's snapshot after the last swap; Add/Remove leave it alone
      const state = await fungible.getPoolState({ args: { poolId: curved.poolId } })
      expect(c.priceX64).toEqual(state.priceX64)
      expect(state.swaps).toBe(2n)
      await assertEscrowIdentity(algorand, dex, native.poolId)
      await assertEscrowIdentity(algorand, dex, curved.poolId)
    })

    test('LpModeCurve: positions live in the curve, swaps match native, and removes pay pro-rata of the position', async () => {
      const { poolId } = await newPool(curveConfig(managed))
      const created = await pool(poolId)
      expect([created.lpAsset, created.lpMode]).toEqual([0n, LP_CURVE])
      const curveAddress = managed.appClient.appAddress.toString()
      const spendable = await holding(algorand, curveAddress, 0n)

      const first = await addCurve(poolId, 10_000_000n, 10_000_000n)
      expect(first).toEqual({
        positionId: first.positionId,
        shares: 10_000_000n,
        amountA: 10_000_000n,
        amountB: 10_000_000n,
      })
      expect(first.positionId).toBeGreaterThan(0n)
      // the curve kept exactly the position box MBR and refunded the rest of the forwarded payment
      expect(await holding(algorand, curveAddress, 0n)).toBe(spendable)
      expect(await managed.getPosition({ args: { positionId: first.positionId } })).toEqual({
        poolId,
        owner: trader.addr.toString(),
        shares: 10_000_000n,
      })
      const live = await pool(poolId)
      expect([live.reserveA, live.reserveB, live.lpSupply]).toEqual([10_000_000n, 10_000_000n, 0n])

      const native = await livePool(poolConfig(30n))
      const quoted = (await quote(poolId, 0n, 1_000_000n)).return!
      expect(quoted).toBe((await quote(native.poolId, 0n, 1_000_000n)).return!)
      expect(await swap(poolId, 0n, 1_000_000n)).toBe(quoted)

      // top up the same position: pro-rata of the scarcer side
      const before = await pool(poolId)
      const topUp = await addCurve(poolId, 1_000_000n, 3_000_000n, first.positionId)
      const fromA = (1_000_000n * 10_000_000n) / before.reserveA
      const fromB = (3_000_000n * 10_000_000n) / before.reserveB
      expect(topUp.positionId).toBe(first.positionId)
      expect(topUp.shares).toBe(fromA < fromB ? fromA : fromB)
      const total = 10_000_000n + topUp.shares
      expect((await managed.getPosition({ args: { positionId: first.positionId } })).shares).toBe(total)
      await assertEscrowIdentity(algorand, dex, poolId)

      // only the owner can remove
      await expectContractError(removeCurve(poolId, first.positionId, undefined, other), 'errMcps')

      const half = total / 2n
      const mid = await pool(poolId)
      expect(await removeCurve(poolId, first.positionId, half)).toEqual({
        amountA: (half * mid.reserveA) / total,
        amountB: (half * mid.reserveB) / total,
      })
      await assertEscrowIdentity(algorand, dex, poolId)

      // the rest closes the position; its box MBR goes back to the owner
      const last = await pool(poolId)
      const rest = total - half
      expect(await removeCurve(poolId, first.positionId)).toEqual({
        amountA: (rest * last.reserveA) / rest,
        amountB: (rest * last.reserveB) / rest,
      })
      await expectContractError(managed.getPosition({ args: { positionId: first.positionId } }), '')
      const empty = await pool(poolId)
      expect([empty.reserveA, empty.reserveB]).toEqual([0n, 0n])
      await assertEscrowIdentity(algorand, dex, poolId)
    })

    test('the wrong entrypoint for the pool lpMode fails with errPdlm', async () => {
      const managedPool = (await newPool(curveConfig(managed))).poolId
      const fungiblePool = (await livePool(curveConfig(fungible))).poolId
      await expectContractError(addLiquidity(algorand, dex, trader, managedPool, 1_000_000n, 1_000_000n), 'errPdlm')
      await expectContractError(addCurve(fungiblePool, 1_000_000n, 1_000_000n), 'errPdlm')
      await expectContractError(removeCurve(fungiblePool, 1n), 'errPdlm')
    })

    test('hooks on a curve pool see the curve id, the curve hook data and its full snapshot after the call', async () => {
      const rec = (
        await algorand.client
          .getTypedAppFactory(RecordingDexHookFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
          .send.create.create({ args: { dex: dex.appId } })
      ).appClient
      await rec.appClient.fundAppAccount({ amount: (1).algo() })
      await dex.send.setHookApproval({ args: { hook: rec.appId, perms: CUSTODY }, ...send })
      const { poolId } = await newPool(curveConfig(managed), [
        hookInstall({ app: rec.appId, points: AFTER_ADD | AFTER_SWAP, perms: 0n }),
      ])
      const { escrow } = await pool(poolId)
      const escrowAddress = getApplicationAddress(escrow).toString()
      // one opUp() carrier for references (the recording hook's box, the curve's boxes)
      const added = await dex
        .newGroup()
        .addLiquidityCurve({
          sender: trader.addr,
          args: {
            mbr: algorand.createTransaction.payment({
              sender: trader.addr,
              receiver: dex.appAddress,
              amount: microAlgo(CURVE_MBR),
            }),
            depositA: transferTxn(algorand, trader, escrowAddress, 0n, 5_000_000n),
            depositB: transferTxn(algorand, trader, escrowAddress, tka, 5_000_000n),
            poolId,
            positionId: 0n,
            minShares: 0n,
            curveArgs: NO_DATA,
            data: NO_DATA,
          },
          maxFee: send.maxFee,
        })
        .opUp({ sender: trader.addr, args: [], maxFee: send.maxFee })
        .send({ coverAppCallInnerTransactionFees: true, populateAppCallResources: true })
      const position = (added.returns[0] as unknown as { positionId: bigint }).positionId
      const addCtx = (await rec.record({ args: { point: AFTER_ADD } })).ctx
      expect([addCtx.curve, addCtx.positionId, addCtx.lpAmount, addCtx.amountIn, addCtx.amountOut]).toEqual([
        managed.appId,
        position,
        5_000_000n,
        5_000_000n,
        5_000_000n,
      ])
      expect(addCtx.curveData).toEqual(u64(position))

      const before = await pool(poolId)
      await dex
        .newGroup()
        .swap({
          sender: trader.addr,
          args: {
            input: transferTxn(algorand, trader, escrowAddress, 0n, 250_000n),
            poolId,
            minAmountOut: 0n,
            recipient: ZERO,
            data: NO_DATA,
            wallet: 0n,
          },
          maxFee: send.maxFee,
        })
        .opUp({ sender: trader.addr, args: [], maxFee: send.maxFee })
        .send({ coverAppCallInnerTransactionFees: true, populateAppCallResources: true })
      const after = await pool(poolId)
      const { ctx } = await rec.record({ args: { point: AFTER_SWAP } })
      expect([ctx.curve, ctx.poolId]).toEqual([managed.appId, poolId])
      expect(ctx.curveData).toEqual(u64(poolId))
      // §10 A4: before = cached price (liquidity/flags 0); after = the curve's own snapshot
      expect(ctx.before).toEqual({ priceX64: before.priceX64, activeId: 0n, liquidity: 0n, flags: 0n })
      expect(ctx.after).toEqual({ priceX64: after.priceX64, activeId: 0n, liquidity: after.reserveB, flags: 0n })
      expect(after.priceX64).toEqual(priceX64(after.reserveA, after.reserveB))
      await assertEscrowIdentity(algorand, dex, poolId)
    })
  })

  describe('§4.5 Vault checks: every evil curve result fails with errPdcv', () => {
    let evil: MockCurveClient
    let poolId: bigint
    let lpAsset: bigint

    beforeAll(async () => {
      evil = await deployCurve(LP_FUNGIBLE)
      ;({ poolId, lpAsset } = await livePool(curveConfig(evil)))
    })

    const withMode = async (mode: bigint, run: () => Promise<void>) => {
      await evil.send.setMode({ args: { mode }, ...send })
      try {
        await run()
      } finally {
        await evil.send.setMode({ args: { mode: CURVE.honest }, ...send })
      }
    }

    test('Swap/Quote: wrong aggregate, fill better than the band, P1 on the wrong side, lpFee above maxFeeBps, protocolFee below its floor', async () => {
      await dex.send.setProtocolFee({ args: { protocolFeeBps: 1_000n, treasury: admin.addr.toString() }, ...send })
      try {
        const cases: [string, bigint][] = [
          ['wrong aggregate', CURVE.wrongAggregate],
          ['better than the band', CURVE.betterThanBand],
          ['P1 on the wrong side', CURVE.priceWrongSide],
          ['lpFee > maxFeeBps', CURVE.lpFeeAboveMax],
          ['protocolFee < floor', CURVE.protocolFeeBelowFloor],
        ]
        for (const [name, mode] of cases) {
          await withMode(mode, async () => {
            for (const assetIn of [0n, tka]) {
              await expectContractError(swap(poolId, assetIn, 1_000_000n), 'errPdcv').catch((e) => {
                throw new Error(`${name} swap ${assetIn}: ${e}`)
              })
              await expectContractError(quote(poolId, assetIn, 1_000_000n), 'errPdcv')
            }
          })
        }
      } finally {
        await dex.send.setProtocolFee({ args: { protocolFeeBps: 0n, treasury: admin.addr.toString() }, ...send })
      }
      // the honest curve still trades on the same pool
      expect(await swap(poolId, 0n, 1_000_000n)).toBeGreaterThan(0n)
      await assertEscrowIdentity(algorand, dex, poolId)
    })

    test('Add: shares over the LP mint bound (first and later deposits), price moved by Add', async () => {
      await withMode(CURVE.overMint, async () => {
        await expectContractError(addLiquidity(algorand, dex, trader, poolId, 1_000_000n, 1_000_000n), 'errPdcv')
        // first deposit: the bound is sqrt(usedA·usedB) − MinimumLiquidity
        const fresh = await newPool(curveConfig(evil))
        await expectContractError(addLiquidity(algorand, dex, trader, fresh.poolId, 1_000_000n, 1_000_000n), 'errPdcv')
      })
      await withMode(CURVE.addMovesPrice, async () => {
        await expectContractError(addLiquidity(algorand, dex, trader, poolId, 1_000_000n, 1_000_000n), 'errPdcv')
      })
      // honest: the bound is met with equality on a balanced deposit
      const before = await pool(poolId)
      const minted = await addLiquidity(algorand, dex, trader, poolId, 1_000_000n, 1_000_000n)
      const fromA = (1_000_000n * before.lpSupply) / before.reserveA
      const fromB = (1_000_000n * before.lpSupply) / before.reserveB
      expect(minted).toBe(fromA < fromB ? fromA : fromB)
      await assertEscrowIdentity(algorand, dex, poolId)
    })

    test('Remove: paying more than pro-rata (fungible), or moving the price, fails', async () => {
      const lp = (await lpBalance(lpAsset)) / 10n
      await withMode(CURVE.removeOverpay, async () => {
        await expectContractError(removeLp(poolId, lpAsset, lp), 'errPdcv')
      })
      await withMode(CURVE.removeMovesPrice, async () => {
        await expectContractError(removeLp(poolId, lpAsset, lp), 'errPdcv')
      })
      const evilManaged = await deployCurve(LP_CURVE)
      const { poolId: managedPool } = await newPool(curveConfig(evilManaged))
      const { positionId } = await addCurve(managedPool, 1_000_000n, 1_000_000n)
      await evilManaged.send.setMode({ args: { mode: CURVE.removeMovesPrice }, ...send })
      await expectContractError(removeCurve(managedPool, positionId), 'errPdcv')
      await evilManaged.send.setMode({ args: { mode: CURVE.honest }, ...send })
      expect(await removeCurve(managedPool, positionId)).toEqual({ amountA: 1_000_000n, amountB: 1_000_000n })
      expect((await removeLp(poolId, lpAsset, lp)).return!.amountA).toBeGreaterThan(0n)
      await assertEscrowIdentity(algorand, dex, poolId)
      await assertEscrowIdentity(algorand, dex, managedPool)
    })

    test('Init: a curve that reports non-zero reserves fails createPool', async () => {
      await withMode(CURVE.initNonZero, async () => {
        await expectContractError(newPool(curveConfig(evil)), 'errPdcv')
      })
    })

    test('a curve Quote returning 0: tryQuoteRoute returns 0 and quote fails with errPdil (§4.12 test 10)', async () => {
      await withMode(CURVE.quoteZero, async () => {
        expect(await tryQuote(poolId, 0n, 1_000_000n)).toBe(0n)
        await expectContractError(quote(poolId, 0n, 1_000_000n), 'errPdil')
      })
      expect(await tryQuote(poolId, 0n, 1_000_000n)).toBe((await quote(poolId, 0n, 1_000_000n)).return!)
    })

    test('CurveFlagClose closes the pool: no more swaps or adds, removes stay open', async () => {
      const closing = await livePool(curveConfig(evil))
      await withMode(CURVE.close, async () => {
        expect(await swap(closing.poolId, 0n, 100_000n)).toBeGreaterThan(0n)
      })
      expect((await pool(closing.poolId)).closed).toBe(true)
      await expectContractError(swap(closing.poolId, 0n, 100_000n), 'errPdpp')
      await expectContractError(addLiquidity(algorand, dex, trader, closing.poolId, 100_000n, 100_000n), 'errPdpp')
      expect(await tryQuote(closing.poolId, 0n, 100_000n)).toBe(0n)
      const out = (await removeLp(closing.poolId, closing.lpAsset, closing.minted)).return!
      expect(out.amountA).toBeGreaterThan(0n)
      await assertEscrowIdentity(algorand, dex, closing.poolId)
      expect(lpAsset).toBeGreaterThan(0n)
    })
  })

  describe('custody on curve pools (§4.6)', () => {
    let hook: MockDexHookClient

    beforeAll(async () => {
      hook = await deployMockHook()
    })

    /** poke hook 0; one opUp() carrier for references (hook, curve app and boxes, escrow, box quota) */
    const poke = (poolId: bigint) =>
      dex
        .newGroup()
        .poke({ sender: trader.addr, args: { poolId, hookIndex: 0n, data: NO_DATA }, maxFee: send.maxFee })
        .opUp({ sender: trader.addr, args: [], maxFee: send.maxFee })
        .send({ coverAppCallInnerTransactionFees: true, populateAppCallResources: true })
    const custodyPool = async (curve: MockCurveClient, a = 10_000_000n, b = 10_000_000n) =>
      livePool(curveConfig(curve, {}, a, b), [hookInstall({ app: hook.appId, points: POKE, perms: CUSTODY })], a, b)

    test('a permissive Settle does not save LPs from a hook taking 90% of B for 1 µALGO: L2 fails with errPdki', async () => {
      const permissive = await deployCurve(LP_FUNGIBLE)
      const { poolId } = await custodyPool(permissive)
      await permissive.send.setMode({ args: { mode: CURVE.permissiveSettle }, ...send })

      await configureHook(hook, HOOK.trade, 9_000_000n, 1n)
      await expectContractError(poke(poolId), 'errPdki')

      // control: the same permissive curve books a trade that passes L2 but pays no fee, which the
      // honest Settle rejects (§4.12 test 3 on curve pools): L2 is the layer that caught the theft
      const p = await pool(poolId)
      const take = 100_000n
      const feeFree = minAlgoWithFee(p.reserveA, p.reserveB, take, 0n)
      await configureHook(hook, HOOK.trade, take, feeFree)
      await permissive.send.setMode({ args: { mode: CURVE.honest }, ...send })
      await expectContractError(poke(poolId), 'errPdki')
      await permissive.send.setMode({ args: { mode: CURVE.permissiveSettle }, ...send })
      await poke(poolId)
      const after = await pool(poolId)
      expect([after.reserveA, after.reserveB]).toEqual([p.reserveA + feeFree, p.reserveB - take])
      await assertEscrowIdentity(algorand, dex, poolId)
      await configureHook(hook, HOOK.pass)
    })

    test('Settle: a price on the wrong side of the trade, or a wrong aggregate, fails with errPdcv', async () => {
      const curve = await deployCurve(LP_FUNGIBLE)
      const { poolId } = await custodyPool(curve)
      const p = await pool(poolId)
      const take = 100_000n
      await configureHook(hook, HOOK.trade, take, minAlgoWithFee(p.reserveA, p.reserveB, take, 30n))
      for (const mode of [CURVE.settleWrongSide, CURVE.settleWrongAggregate]) {
        await curve.send.setMode({ args: { mode }, ...send })
        await expectContractError(poke(poolId), 'errPdcv')
      }
      await curve.send.setMode({ args: { mode: CURVE.honest }, ...send })
      await poke(poolId)
      expect((await pool(poolId)).reserveB).toBe(p.reserveB - take)
      await assertEscrowIdentity(algorand, dex, poolId)
      await configureHook(hook, HOOK.pass)
    })

    test('§10 A1: a custody delta negative on both sides fails with errPdki on a curve pool', async () => {
      const { poolId } = await custodyPool(fungible)
      await configureHook(hook, HOOK.stealBoth, 1n, 100_000n)
      await expectContractError(poke(poolId), 'errPdki')
      await configureHook(hook, HOOK.stealBoth, 0n, 100_000n)
      await expectContractError(poke(poolId), 'errPdki')
      await configureHook(hook, HOOK.pass)
      await poke(poolId)
      await assertEscrowIdentity(algorand, dex, poolId)
    })

    test('§10 A2: Settle carries the real poolId (two pools on one curve app), for custody trades and sync', async () => {
      const curve = await deployCurve(LP_FUNGIBLE)
      const one = await custodyPool(curve)
      const two = await custodyPool(curve, 20_000_000n, 10_000_000n)
      const [p1, p2] = [await pool(one.poolId), await pool(two.poolId)]
      expect(p2.priceX64).toEqual(priceX64(2n, 1n))

      // a custody trade on pool two at the cheapest price that pays custodyFeeBps
      const take = 100_000n
      const min = minAlgoWithFee(p2.reserveA, p2.reserveB, take, 30n)
      await configureHook(hook, HOOK.trade, take, min - 1n)
      await expectContractError(poke(two.poolId), 'errPdki')
      await configureHook(hook, HOOK.trade, take, min)
      await poke(two.poolId)
      expect(await curve.state.global.lastOp()).toBe(CURVE_OP.settle)
      expect(await curve.state.global.lastPoolId()).toBe(two.poolId)

      const after2 = await pool(two.poolId)
      expect([after2.reserveA, after2.reserveB]).toEqual([p2.reserveA + min, p2.reserveB - take])
      expect(after2.priceX64).toEqual(priceX64(after2.reserveA, after2.reserveB))
      const [s1, s2] = [
        await curve.getPoolState({ args: { poolId: one.poolId } }),
        await curve.getPoolState({ args: { poolId: two.poolId } }),
      ]
      expect([s1.settles, s2.settles]).toEqual([0n, 1n])
      expect(s2.priceX64).toEqual(after2.priceX64)
      expect(s1.priceX64).toEqual(p1.priceX64)
      expect((await pool(one.poolId)).priceX64).toEqual(p1.priceX64)
      await assertEscrowIdentity(algorand, dex, two.poolId)

      // sync books a direct transfer to pool one through Settle(donation) for pool one
      await algorand.send.payment({
        sender: trader.addr,
        receiver: getApplicationAddress(p1.escrow).toString(),
        amount: microAlgo(250_000),
      })
      await assertEscrowIdentity(algorand, dex, one.poolId, 250_000n)
      await dex.send.sync({ args: { poolId: one.poolId }, ...send })
      expect(await curve.state.global.lastPoolId()).toBe(one.poolId)
      expect((await curve.getPoolState({ args: { poolId: one.poolId } })).settles).toBe(1n)
      const synced = await pool(one.poolId)
      expect(synced.reserveA).toBe(p1.reserveA + 250_000n)
      expect(synced.priceX64).toEqual(priceX64(synced.reserveA, synced.reserveB))
      await assertEscrowIdentity(algorand, dex, one.poolId)
      await configureHook(hook, HOOK.pass)
    })
  })

  describe('approval, pinning and exits', () => {
    test('an unapproved curve, a bad lpMode or virtual offsets on a curve pool fail with errPdty', async () => {
      const unapproved = await deployCurve(LP_FUNGIBLE, false)
      await expectContractError(newPool(curveConfig(unapproved)), 'errPdty')
      await expectContractError(
        dex.send.setCurveApproval({ args: { curve: unapproved.appId, lpMode: 2n, approved: true }, ...send }),
        'errPdty',
      )
      await expectContractError(newPool(curveConfig(fungible, { virtualA: 1_000n })), 'errPdty')
      // revoking an approval blocks new pools only
      const revoked = await deployCurve(LP_FUNGIBLE)
      const live = await livePool(curveConfig(revoked))
      await dex.send.setCurveApproval({ args: { curve: revoked.appId, lpMode: LP_FUNGIBLE, approved: false }, ...send })
      await expectContractError(newPool(curveConfig(revoked)), 'errPdty')
      expect(await swap(live.poolId, 0n, 100_000n)).toBeGreaterThan(0n)
    })

    test('a curve version bump stops the pinned pool (rejectVersion) and createPool (errPdvr); the paused pool still exits', async () => {
      const curve = await deployCurve(LP_FUNGIBLE)
      const { poolId, lpAsset, minted } = await livePool(curveConfig(curve))
      await algorand.send.appUpdateMethodCall({
        sender: admin.addr,
        signer: admin.signer,
        appId: curve.appId,
        method: curve.appClient.getABIMethod('update'),
        args: [],
        approvalProgram: Buffer.from(MockCurveV2Spec.byteCode!.approval, 'base64'),
        clearStateProgram: Buffer.from(MockCurveV2Spec.byteCode!.clear, 'base64'),
      })
      const updated = algorand.client.getTypedAppClientById(MockCurveV2Client, {
        appId: curve.appId,
        defaultSender: admin.addr,
      })
      expect(await updated.codeVersion()).toBe(2n)

      await expectContractError(swap(poolId, 0n, 100_000n), 'app version (1) >= reject version (1)')
      await expectContractError(newPool(curveConfig(curve)), 'errPdvr')

      await dex.send.setPoolPaused({ args: { poolId, paused: true }, ...send })
      const before = await pool(poolId)
      const out = (await emergencyRemove(poolId, lpAsset, minted)).return!
      expect(out).toEqual({
        amountA: (minted * before.reserveA) / before.lpSupply,
        amountB: (minted * before.reserveB) / before.lpSupply,
      })
      await assertEscrowIdentity(algorand, dex, poolId)
    })

    test('fungible curve pool: the emergency exit works with the curve reverting every call', async () => {
      const dead = await deployCurve(LP_FUNGIBLE)
      const { poolId, lpAsset, minted } = await livePool(curveConfig(dead))
      await swap(poolId, 0n, 1_000_000n)
      await dead.send.setMode({ args: { mode: CURVE.revertAll }, ...send })
      await expectContractError(swap(poolId, 0n, 100_000n), 'errMcrv')
      await expectContractError(removeLp(poolId, lpAsset, minted), 'errMcrv')
      await expectContractError(emergencyRemove(poolId, lpAsset, minted), 'errPdnp')

      await dex.send.setPoolPaused({ args: { poolId, paused: true }, ...send })
      const before = await pool(poolId)
      const out = (await emergencyRemove(poolId, lpAsset, minted)).return!
      expect(out).toEqual({
        amountA: (minted * before.reserveA) / before.lpSupply,
        amountB: (minted * before.reserveB) / before.lpSupply,
      })
      const after = await pool(poolId)
      expect(after.lpSupply).toBe(1_000n)
      await assertEscrowIdentity(algorand, dex, poolId)
    })

    test('curve-managed pool: a paused removeLiquidityCurve skips hooks and still pays pro-rata', async () => {
      const hook = await deployMockHook()
      const { poolId } = await newPool(curveConfig(managed), [
        hookInstall({ app: hook.appId, points: BEFORE_REMOVE, perms: CUSTODY }),
      ])
      const { positionId, shares } = await addCurve(poolId, 4_000_000n, 4_000_000n)
      await configureHook(hook, HOOK.steal, 1_000n)
      await expectContractError(removeCurve(poolId, positionId), 'errPdki')

      await dex.send.setPoolPaused({ args: { poolId, paused: true }, ...send })
      const calls = await hook.state.global.calls()
      const out = await removeCurve(poolId, positionId, shares / 4n)
      expect(out).toEqual({ amountA: 1_000_000n, amountB: 1_000_000n })
      expect(await hook.state.global.calls()).toBe(calls)
      // paused: no adds, no swaps
      await expectContractError(addCurve(poolId, 1_000_000n, 1_000_000n, positionId), 'errPdpp')
      await expectContractError(swap(poolId, 0n, 100_000n), 'errPdpp')
      await assertEscrowIdentity(algorand, dex, poolId)
    })

    test('§10 A24: curve-pool exits never Settle: a 1-unit donation the curve cannot place blocks no remove', async () => {
      // own curve apps: the Settle-breaking mode must not leak into other tests
      const curve = await deployCurve(LP_CURVE)
      const { poolId } = await newPool(curveConfig(curve))
      const { positionId, shares } = await addCurve(poolId, 4_000_000n, 4_000_000n)
      const fungibleCurve = await deployCurve(LP_FUNGIBLE)
      const live = await livePool(curveConfig(fungibleCurve))

      // 1 µALGO and 1 TKA straight to each escrow, then each curve's Settle fails (wrong aggregate, errPdcv)
      for (const id of [poolId, live.poolId]) {
        const escrow = getApplicationAddress((await pool(id)).escrow).toString()
        await algorand.send.payment({ sender: trader.addr, receiver: escrow, amount: microAlgo(1) })
        await algorand.send.assetTransfer({ sender: trader.addr, receiver: escrow, assetId: tka, amount: 1n })
      }
      for (const c of [curve, fungibleCurve]) {
        await c.send.setMode({ args: { mode: CURVE.settleWrongAggregate }, ...send })
      }
      // booking the donation needs Settle: the explicit sync and the inline sync of an add fail
      await expectContractError(dex.send.sync({ args: { poolId }, ...send }), 'errPdcv')
      await expectContractError(addCurve(poolId, 1_000_000n, 1_000_000n, positionId), 'errPdcv')

      // curve-managed exit (unpaused, so hooks would run): no Settle, the donation stays unbooked
      const before = await pool(poolId)
      const out = await removeCurve(poolId, positionId, shares / 2n)
      expect(out.amountA).toBeGreaterThan(0n)
      const after = await pool(poolId)
      expect([after.reserveA, after.reserveB]).toEqual([before.reserveA - out.amountA, before.reserveB - out.amountB])
      expect((await curve.getPoolState({ args: { poolId } })).settles).toBe(0n)
      await assertEscrowIdentity(algorand, dex, poolId, 1n, 1n)

      // fungible curve exit: the same
      const fBefore = await pool(live.poolId)
      await removeLp(live.poolId, fBefore.lpAsset, live.minted / 2n, true)
      const fAfter = await pool(live.poolId)
      expect(fAfter.lpSupply).toBe(fBefore.lpSupply - live.minted / 2n)
      expect((await fungibleCurve.getPoolState({ args: { poolId: live.poolId } })).settles).toBe(0n)
      await assertEscrowIdentity(algorand, dex, live.poolId, 1n, 1n)

      // with an honest Settle the explicit sync books it
      await curve.send.setMode({ args: { mode: CURVE.honest }, ...send })
      await dex.send.sync({ args: { poolId }, ...send })
      await assertEscrowIdentity(algorand, dex, poolId)
    })
  })

  describe('budget', () => {
    type Simulatable = {
      simulate(options: {
        allowUnnamedResources: boolean
        skipSignatures: boolean
      }): Promise<{ simulateResponse: modelsv2.SimulateResponse }>
    }
    const measure = async (build: (group: ReturnType<PluginDexClient['newGroup']>) => Simulatable, index: number) => {
      const result = await build(dex.newGroup()).simulate({ allowUnnamedResources: true, skipSignatures: true })
      const group = result.simulateResponse.txnGroups[0]
      expect(group.failureMessage).toBeUndefined()
      const txn = group.txnResults[index]
      const inners =
        (
          txn.txnResult as unknown as {
            innerTxns?: { txn: { txn: { type: string; applicationCall?: { appIndex?: bigint } } } }[]
          }
        ).innerTxns ?? []
      const opUps = inners.filter(
        (inner) => inner.txn.txn.type === 'appl' && !inner.txn.txn.applicationCall?.appIndex,
      ).length
      return { used: Number(txn.appBudgetConsumed), opUps }
    }

    test('hookless curve swap, add and remove run in one app call plus the curve call, without op-ups', async () => {
      const { poolId, escrow, lpAsset } = await livePool(curveConfig(fungible))
      const swapRun = await measure(
        (group) =>
          group.swap({
            sender: trader.addr,
            args: {
              input: transferTxn(algorand, trader, escrow, 0n, 100_000n),
              poolId,
              minAmountOut: 0n,
              recipient: ZERO,
              data: NO_DATA,
              wallet: 0n,
            },
            staticFee: microAlgo(4_000),
          }),
        1,
      )
      const addRun = await measure(
        (group) =>
          group.addLiquidity({
            sender: trader.addr,
            args: {
              depositA: transferTxn(algorand, trader, escrow, 0n, 1_000_000n),
              depositB: transferTxn(algorand, trader, escrow, tka, 1_000_000n),
              poolId,
              minLpOut: 0n,
              data: NO_DATA,
            },
            staticFee: microAlgo(6_000),
          }),
        2,
      )
      const removeRun = await measure(
        (group) =>
          group.removeLiquidity({
            sender: trader.addr,
            args: {
              lpTransfer: algorand.createTransaction.assetTransfer({
                sender: trader.addr,
                receiver: dex.appAddress,
                assetId: lpAsset,
                amount: 10_000n,
              }),
              poolId,
              minAmountA: 0n,
              minAmountB: 0n,
              data: NO_DATA,
            },
            staticFee: microAlgo(5_000),
          }),
        1,
      )
      console.log(
        `[curve budget] hookless curve swap ${swapRun.used}, addLiquidity ${addRun.used}, removeLiquidity ${removeRun.used} opcodes (Vault + curve, pooled 1,400)`,
      )
      for (const run of [swapRun, addRun, removeRun]) {
        expect(run.used).toBeLessThanOrEqual(1_400)
        expect(run.opUps).toBe(0)
      }
    })

    test('a curve that spends the whole pooled budget does not starve the Vault: it tops up after the call', async () => {
      type Confirmation = { innerTxns?: { txn: { txn: { type: string; applicationCall?: { appIndex?: bigint } } } }[] }
      const opUps = (confirmation: unknown) =>
        ((confirmation as Confirmation).innerTxns ?? []).filter(
          (inner) => inner.txn.txn.type === 'appl' && !inner.txn.txn.applicationCall?.appIndex,
        ).length

      const hungry = await deployCurve(LP_FUNGIBLE)
      const { poolId, escrow, lpAsset, minted } = await livePool(curveConfig(hungry))
      await hungry.send.setMode({ args: { mode: CURVE.burnBudget }, ...send })

      const quoted = (await quote(poolId, 0n, 100_000n)).return!
      const swapped = await dex.send.swap({
        sender: trader.addr,
        args: {
          input: transferTxn(algorand, trader, escrow, 0n, 100_000n),
          poolId,
          minAmountOut: 0n,
          recipient: ZERO,
          data: NO_DATA,
          wallet: 0n,
        },
        ...send,
      })
      expect(swapped.return).toBe(quoted)
      expect(opUps(swapped.confirmations.at(-1))).toBeGreaterThan(0)
      const added = await addLiquidity(algorand, dex, trader, poolId, 1_000_000n, 1_000_000n)
      expect(added).toBeGreaterThan(0n)
      const removed = await removeLp(poolId, lpAsset, minted, true)
      expect(removed.return!.amountA).toBeGreaterThan(0n)
      expect(opUps(removed.confirmations.at(-1))).toBeGreaterThan(0)
      await assertEscrowIdentity(algorand, dex, poolId)

      const hungryManaged = await deployCurve(LP_CURVE)
      const { poolId: managedPool } = await newPool(curveConfig(hungryManaged))
      await hungryManaged.send.setMode({ args: { mode: CURVE.burnBudget }, ...send })
      const position = await addCurve(managedPool, 2_000_000n, 2_000_000n)
      // one opUp() carrier for references (position and pool boxes, owner refund, box quota)
      const removed2 = await dex
        .newGroup()
        .removeLiquidityCurve({
          sender: trader.addr,
          args: {
            poolId: managedPool,
            positionId: position.positionId,
            minAmountA: 0n,
            minAmountB: 0n,
            curveArgs: NO_DATA,
            data: NO_DATA,
          },
          maxFee: send.maxFee,
        })
        .opUp({ sender: trader.addr, args: [], maxFee: send.maxFee })
        .send({ coverAppCallInnerTransactionFees: true, populateAppCallResources: true })
      expect(removed2.returns[0]).toEqual({ amountA: 2_000_000n, amountB: 2_000_000n })
      await assertEscrowIdentity(algorand, dex, managedPool)
    })
  })
})
