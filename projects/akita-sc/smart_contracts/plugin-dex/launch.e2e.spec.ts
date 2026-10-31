import { AlgorandClient, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { ALGORAND_ZERO_ADDRESS_STRING, getApplicationAddress, modelsv2 } from 'algosdk'
import { beforeAll, describe, expect, test } from 'vitest'
import { PluginDexClient, PoolConfig } from '../artifacts/plugin-dex/PluginDexClient'
import { MockDexHookClient, MockDexHookFactory } from '../artifacts/plugin-dex/tests/MockDexHookClient'
import { RecordingDexHookClient, RecordingDexHookFactory } from '../artifacts/plugin-dex/tests/RecordingDexHookClient'
import { expectContractError } from '../../tests/utils/errors'
import {
  addLiquidity,
  assertEscrowIdentity,
  createPool,
  deployVault,
  holding,
  HookInstall,
  hookInstall,
  poolConfig,
  transferTxn,
} from '../../tests/fixtures/plugin-dex'

/*
 * FINAL-SPEC §4.12 launch.e2e.spec.ts, core part (akita-hooks B9 1-4 and 7-8, plus F5): launch pools are
 * native VCPMM pools (virtual offsets), seeded by `initializeLaunch` with locked LP, closed to LP
 * operations while bonding (F3) and graduated in place by anyone (F4) with exact price continuity.
 * WP5b (anti-snipe, launch tax, LaunchManager) adds its own cases in a separate describe block.
 */

// hook points / permissions
const AFTER_ADD_LIQUIDITY = 4n
const BEFORE_SWAP = 32n
const QUOTE = 128n
const POKE = 256n
const CUSTODY = 1n
const DYNAMIC_FEE = 2n
// MockDexHook modes
const MODE_PASS = 0n
const MODE_SET_FEE = 5n
const MODE_TRADE = 7n
// constants.ts
const CURVE_FLAG_BONDING = 2n
const LP_ASSET_TOTAL = 2n ** 64n - 1n

const ZERO = ALGORAND_ZERO_ADDRESS_STRING
const NO_DATA = new Uint8Array()
const send = { maxFee: microAlgo(200_000), coverAppCallInnerTransactionFees: true, populateAppCallResources: true }

// launch shape (akita-hooks B2, scaled down): 10 ALGO virtual quote, 300k virtual tokens, 800k on the curve
const VA = 10_000_000n
const VB = 300_000_000_000n
const S = 800_000_000_000n
const ceilDiv = (a: bigint, b: bigint) => (a + b - 1n) / b
/** the graduation reserve that is exactly sufficient on the fee-free curve: M = ceil(S·vB / (S + vB)) */
const M = ceilDiv(S * VB, S + VB)
/** rA_max = vA·S/vB ≈ 26.7 ALGO; the default threshold sits below it and above the d = 0 point (≈ 9.2 ALGO) */
const G = 20_000_000n

/** exact-in constant-product output at `feeBps` on (effective) reserves */
const cpOut = (amountIn: bigint, feeBps: bigint, reserveIn: bigint, reserveOut: bigint) => {
  const effective = amountIn - (amountIn * feeBps) / 10_000n
  return (effective * reserveOut) / (reserveIn + effective)
}

const isqrt = (n: bigint) => {
  if (n < 2n) return n
  let x = n
  let y = (x + 1n) / 2n
  while (y < x) {
    x = y
    y = (x + n / x) / 2n
  }
  return x
}

/** floor(eB · 2^64 / eA) as 16 big-endian bytes, the Vault's native priceX64 */
const priceX64 = (eA: bigint, eB: bigint): Uint8Array => {
  const value = eA === 0n ? 0n : (eB << 64n) / eA
  return Uint8Array.from({ length: 16 }, (_, i) => Number((value >> BigInt(8 * (15 - i))) & 0xffn))
}

/** the B-per-A price eB0/eA0 equals rB1/rA1 within 1e-9 relative */
const expectSamePrice = (eA0: bigint, eB0: bigint, rA1: bigint, rB1: bigint) => {
  const lhs = eB0 * rA1
  const diff = lhs > rB1 * eA0 ? lhs - rB1 * eA0 : rB1 * eA0 - lhs
  expect(diff * 1_000_000_000n).toBeLessThanOrEqual(lhs)
}

type Pool = Awaited<ReturnType<PluginDexClient['getPool']>>

/**
 * The Vault's graduation (§4.4 F4, §10 A16/A17) on a pool snapshot: the token reserve that keeps the
 * price is ceil(r_q·e_t/e_q); M covers it (the rest stays locked), or all of M joins and the quote surplus
 * above ceil((r_t + M)·e_q/e_t) moves to protocol fees.
 */
const graduationModel = (pool: Pool) => {
  const q = pool.quoteIsA
  const rQ = q ? pool.reserveA : pool.reserveB
  const rT = q ? pool.reserveB : pool.reserveA
  const locked = q ? pool.lockedB : pool.lockedA
  const eQ = rQ + (q ? pool.virtualA : pool.virtualB)
  const eT = rT + (q ? pool.virtualB : pool.virtualA)
  const available = rT + locked
  // the spec's d = ceil((r_q·v_t − r_t·v_q)/(r_q + v_q)) when the numerator is positive
  const vQ = q ? pool.virtualA : pool.virtualB
  const vT = q ? pool.virtualB : pool.virtualA
  const num = rQ * vT - rT * vQ
  const d = num > 0n ? ceilDiv(num, rQ + vQ) : 0n
  let newT = ceilDiv(rQ * eT, eQ)
  let newQ = rQ
  if (newT > available) {
    newT = available
    newQ = ceilDiv(available * eQ, eT)
  }
  return { rQ, rT, eQ, eT, locked, d, newT, newQ, surplus: rQ - newQ, retained: available - newT }
}

describe('PluginDex launch pools', () => {
  const localnet = algorandFixture()
  let algorand: AlgorandClient
  let admin: TransactionSignerAccount
  let creator: TransactionSignerAccount
  let trader: TransactionSignerAccount
  let treasury: TransactionSignerAccount
  let dex: PluginDexClient
  /** the launched token (lower id) and an ASA quote asset (higher id) for the quoteIsA = false orientation */
  let tkn: bigint
  let qta: bigint

  beforeAll(async () => {
    await localnet.newScope()
    algorand = localnet.algorand
    admin = localnet.context.testAccount
    const dispenser = await algorand.account.dispenserFromEnvironment()
    await algorand.account.ensureFunded(admin.addr, dispenser.addr, (2_000).algo())
    creator = await localnet.context.generateAccount({ initialFunds: (100).algo() })
    trader = await localnet.context.generateAccount({ initialFunds: (1_000).algo() })
    treasury = await localnet.context.generateAccount({ initialFunds: (1).algo() })

    tkn = (await algorand.send.assetCreate({ sender: admin.addr, total: 10n ** 16n, decimals: 6, unitName: 'TKN' }))
      .assetId
    qta = (await algorand.send.assetCreate({ sender: admin.addr, total: 10n ** 16n, decimals: 6, unitName: 'QTA' }))
      .assetId
    expect(tkn).toBeLessThan(qta)
    for (const account of [creator, trader]) {
      for (const asset of [tkn, qta]) {
        await algorand.send.assetOptIn({ sender: account.addr, assetId: asset })
        await algorand.send.assetTransfer({ sender: admin.addr, receiver: account.addr, assetId: asset, amount: 10n ** 14n })
      }
    }

    // the treasury collects protocol fees on both sides
    await algorand.send.assetOptIn({ sender: treasury.addr, signer: treasury.signer, assetId: tkn })

    dex = await deployVault({ algorand, sender: admin })
    // a protocol share so bonding fees and graduation surplus land in protocolFees (escrow identity)
    await dex.send.setProtocolFee({ args: { protocolFeeBps: 1_000n, treasury: treasury.addr.toString() }, ...send })
  })

  describe('core launch', () => {
    /** ALGO/TKN launch config: quote = ALGO (A), token = TKN (B) */
    const launchConfig = (overrides: Partial<PoolConfig> = {}) =>
      poolConfig(100n, { virtualA: VA, virtualB: VB, graduationThreshold: G, quoteIsA: true, ...overrides })

    const createLaunch = async (
      config = launchConfig(),
      hooks: HookInstall[] = [],
      assetA = 0n,
      assetB = tkn,
    ) => createPool({ algorand, dex, sender: creator, assetA, assetB, config, hooks })

    const initializeLaunch = async (
      poolId: bigint,
      supply = S,
      reserve = M,
      sender = creator,
      asset = tkn,
    ) => {
      const pool = await dex.getPool({ args: { poolId } })
      const escrow = getApplicationAddress(pool.escrow).toString()
      return dex.send.initializeLaunch({
        sender: sender.addr,
        signer: sender.signer,
        args: {
          tokenDeposit: transferTxn(algorand, sender, escrow, asset, supply),
          reserveDeposit: transferTxn(algorand, sender, escrow, asset, reserve),
          poolId,
        },
        ...send,
      })
    }

    /** create + initialize an ALGO/TKN launch with the default shape */
    const liveLaunch = async (config = launchConfig(), hooks: HookInstall[] = [], reserve = M) => {
      const { poolId, escrow, lpAsset } = await createLaunch(config, hooks)
      await initializeLaunch(poolId, S, reserve)
      return { poolId, escrow, lpAsset }
    }

    const swap = async (poolId: bigint, assetIn: bigint, amountIn: bigint, sender = trader) => {
      const pool = await dex.getPool({ args: { poolId } })
      const result = await dex.send.swap({
        sender: sender.addr,
        signer: sender.signer,
        args: {
          input: transferTxn(algorand, sender, getApplicationAddress(pool.escrow).toString(), assetIn, amountIn),
          poolId,
          minAmountOut: 0n,
          recipient: ZERO,
          data: NO_DATA,
          wallet: 0n,
        },
        ...send,
      })
      return result.return!
    }

    const quote = (poolId: bigint, assetIn: bigint, amountIn: bigint) =>
      dex.send.quote({ args: { poolId, assetIn, amountIn, swapper: ZERO, data: NO_DATA, wallet: 0n }, ...send })

    const tryQuote = async (poolId: bigint, assetIn: bigint, amountIn: bigint) =>
      (await dex.send.tryQuoteRoute({ args: { route: [poolId], assetIn, amountIn, swapper: ZERO, data: NO_DATA, wallet: 0n }, ...send }))
        .return!

    const graduate = (poolId: bigint, sender = trader) =>
      dex.send.graduate({ sender: sender.addr, signer: sender.signer, args: { poolId }, ...send })

    /** buy ALGO → TKN until the real ALGO reserve reaches the threshold */
    const buyToThreshold = async (poolId: bigint) => {
      const pool = await dex.getPool({ args: { poolId } })
      // the protocol share (10% of the 1% fee) leaves the reserve: pay a little more than the gap
      await swap(poolId, 0n, pool.graduationThreshold - pool.reserveA + 1_000_000n)
      const after = await dex.getPool({ args: { poolId } })
      expect(after.reserveA).toBeGreaterThanOrEqual(after.graduationThreshold)
      return after
    }

    const deployMockHook = async (perms: bigint): Promise<MockDexHookClient> => {
      const hook = (
        await algorand.client
          .getTypedAppFactory(MockDexHookFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
          .send.create.create({ args: { dex: dex.appId } })
      ).appClient
      await hook.appClient.fundAppAccount({ amount: (20).algo() })
      await dex.send.setHookApproval({ args: { hook: hook.appId, perms }, ...send })
      return hook
    }

    describe('createPool (§4.2 step 3, F5)', () => {
      test('a launch pool stores its offsets, threshold and quote side; it starts uninitialized', async () => {
        const { poolId, pool } = await createLaunch()
        expect([pool.virtualA, pool.virtualB, pool.graduationThreshold, pool.quoteIsA]).toEqual([VA, VB, G, true])
        expect([pool.reserveA, pool.reserveB, pool.lockedA, pool.lockedB, pool.lpSupply, pool.lockedLp]).toEqual([
          0n,
          0n,
          0n,
          0n,
          0n,
          0n,
        ])
        expect(pool.lpAsset).toBeGreaterThan(0n)
        expect(pool.creator).toBe(creator.addr.toString())
        await assertEscrowIdentity(algorand, dex, poolId)
      })

      test('launch config validation: threshold iff offsets, a quote-side offset, no externals (errPdlb, errPdex)', async () => {
        // offsets without a threshold
        await expectContractError(createLaunch(launchConfig({ graduationThreshold: 0n })), 'errPdlb')
        // a threshold without offsets
        await expectContractError(createLaunch(poolConfig(30n, { graduationThreshold: G })), 'errPdlb')
        // the quote side (A) has no offset: the first buy would price against an empty side
        await expectContractError(createLaunch(launchConfig({ virtualA: 0n })), 'errPdlb')
        // the quote side is B but only A has an offset
        await expectContractError(createLaunch(launchConfig({ quoteIsA: false, virtualB: 0n })), 'errPdlb')
        // a token-side offset of 0 is allowed (pure virtual-quote curve)
        const { pool } = await createLaunch(launchConfig({ virtualB: 0n }))
        expect([pool.virtualA, pool.virtualB]).toEqual([VA, 0n])

        // externals are never allowed on a launch pool
        await expectContractError(
          dex.send.createPool({
            sender: creator.addr,
            signer: creator.signer,
            args: {
              payment: algorand.createTransaction.payment({
                sender: creator.addr,
                receiver: dex.appAddress,
                amount: (3).algo(),
              }),
              assetA: 0n,
              assetB: tkn,
              config: launchConfig(),
              hooks: [],
              externals: [[1n, 1n, 0n, qta, 100n, 0n, 0n]],
            },
            ...send,
          }),
          'errPdex',
        )
      })

      test('F5: maxFeeBps up to 9,000 (errPdfe above); feeBps stays ≤ MaxFeeBps 1,000', async () => {
        const { pool } = await createLaunch(launchConfig({ maxFeeBps: 9_000n }))
        expect(pool.maxFeeBps).toBe(9_000n)
        await expectContractError(createLaunch(launchConfig({ maxFeeBps: 9_001n })), 'errPdfe')
        await expectContractError(createLaunch(launchConfig({ maxFeeBps: 9_000n, feeBps: 1_001n })), 'errPdfe')
        await expectContractError(
          createLaunch(launchConfig({ maxFeeBps: 1_000n, custodyFeeBps: 1_001n })),
          'errPdfe',
        )
      })
    })

    describe('(3) before initializeLaunch', () => {
      let poolId: bigint

      beforeAll(async () => {
        ;({ poolId } = await createLaunch())
      })

      test('swaps, quotes and graduation fail; tryQuoteRoute returns 0', async () => {
        await expectContractError(swap(poolId, 0n, 1_000_000n), 'errPdlb')
        await expectContractError(quote(poolId, 0n, 1_000_000n), 'errPdlb')
        expect(await tryQuote(poolId, 0n, 1_000_000n)).toBe(0n)
        await expectContractError(graduate(poolId), 'errPdgr')
      })

      test('addLiquidity fails while bonding (errPdlb)', async () => {
        await expectContractError(addLiquidity(algorand, dex, trader, poolId, 1_000_000n, 1_000_000n), 'errPdlb')
      })

      test('only the creator initializes, with token-side deposits only', async () => {
        await expectContractError(initializeLaunch(poolId, S, M, trader), 'errPdlb')
        const pool = await dex.getPool({ args: { poolId } })
        const escrow = getApplicationAddress(pool.escrow).toString()
        // an ALGO "token" deposit is the quote asset
        await expectContractError(
          dex.send.initializeLaunch({
            sender: creator.addr,
            signer: creator.signer,
            args: {
              tokenDeposit: transferTxn(algorand, creator, escrow, 0n, 1_000_000n),
              reserveDeposit: transferTxn(algorand, creator, escrow, tkn, M),
              poolId,
            },
            ...send,
          }),
          'errPdan',
        )
      })
    })

    describe('(2) initializeLaunch', () => {
      let rec: RecordingDexHookClient
      let poolId: bigint
      let lpAsset: bigint
      let minted: bigint

      beforeAll(async () => {
        rec = (
          await algorand.client
            .getTypedAppFactory(RecordingDexHookFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
            .send.create.create({ args: { dex: dex.appId } })
        ).appClient
        await rec.appClient.fundAppAccount({ amount: (1).algo() })
        await dex.send.setHookApproval({ args: { hook: rec.appId, perms: CUSTODY }, ...send })
        ;({ poolId, lpAsset } = await createLaunch(launchConfig(), [
          hookInstall({ app: rec.appId, points: AFTER_ADD_LIQUIDITY, perms: 0n }),
        ]))
        minted = (await initializeLaunch(poolId)).return!
      })

      test('mints sqrt(eA·eB) as locked LP; nobody receives LP; M is held outside reserves', async () => {
        const L0 = isqrt(VA * (S + VB))
        expect(minted).toBe(L0)
        const pool = await dex.getPool({ args: { poolId } })
        expect([pool.lpSupply, pool.lockedLp]).toEqual([L0, L0])
        expect([pool.reserveA, pool.reserveB, pool.lockedA, pool.lockedB]).toEqual([0n, S, 0n, M])
        // every LP unit is still unissued in the Vault; the creator never opted in, nothing was sent
        expect(await holding(algorand, dex.appAddress.toString(), lpAsset)).toBe(LP_ASSET_TOTAL)
        const creatorInfo = await algorand.account.getInformation(creator.addr)
        expect((creatorInfo.assets ?? []).some((a) => a.assetId === lpAsset)).toBe(false)
        // escrow: TKN = reserveB + M, ALGO = 0 spendable
        await assertEscrowIdentity(algorand, dex, poolId)
        expect(await holding(algorand, getApplicationAddress(pool.escrow).toString(), tkn)).toBe(S + M)
      })

      test('AfterAddLiquidity sees lpAmount = L0, effective reserves and the bonding flag (§10 A3)', async () => {
        const { ctx } = await rec.record({ args: { point: AFTER_ADD_LIQUIDITY } })
        expect([ctx.point, ctx.poolId, ctx.caller, ctx.curve]).toEqual([
          AFTER_ADD_LIQUIDITY,
          poolId,
          creator.addr.toString(),
          0n,
        ])
        expect([ctx.amountIn, ctx.amountOut, ctx.lpAmount, ctx.lpSupply]).toEqual([0n, S, minted, minted])
        expect([ctx.reserveIn, ctx.reserveOut]).toEqual([VA, S + VB])
        expect(ctx.before.flags).toBe(CURVE_FLAG_BONDING)
        expect(ctx.after.flags).toBe(CURVE_FLAG_BONDING)
        expect(ctx.before.priceX64).toEqual(priceX64(VA, VB))
        expect(ctx.after.priceX64).toEqual(priceX64(VA, S + VB))
      })

      test('a second initializeLaunch fails (errPdlb)', async () => {
        await expectContractError(initializeLaunch(poolId), 'errPdlb')
      })
    })

    describe('(1) VCPMM swaps', () => {
      let poolId: bigint

      beforeAll(async () => {
        ;({ poolId } = await liveLaunch())
      })

      test('selling tokens that were never bought hits the real ALGO floor (errPdil)', async () => {
        // rA = 0: any sell would pay out virtual ALGO
        await expectContractError(swap(poolId, tkn, 1_000_000n), 'errPdil')
        await expectContractError(quote(poolId, tkn, 1_000_000n), 'errPdil')
        expect(await tryQuote(poolId, tkn, 1_000_000n)).toBe(0n)
      })

      test('quote == swap on effective reserves, buys and sells', async () => {
        let pool = await dex.getPool({ args: { poolId } })
        const buyIn = 5_000_000n
        const expected = cpOut(buyIn, 100n, pool.reserveA + VA, pool.reserveB + VB)
        expect((await quote(poolId, 0n, buyIn)).return).toBe(expected)
        expect(await swap(poolId, 0n, buyIn)).toBe(expected)
        const protocolFee = ((buyIn * 100n) / 10_000n) * 1_000n / 10_000n
        let after = await dex.getPool({ args: { poolId } })
        expect([after.reserveA, after.reserveB, after.protocolFeesA]).toEqual([
          pool.reserveA + buyIn - protocolFee,
          pool.reserveB - expected,
          pool.protocolFeesA + protocolFee,
        ])
        await assertEscrowIdentity(algorand, dex, poolId)

        // sell half back
        pool = after
        const sellIn = expected / 2n
        const back = cpOut(sellIn, 100n, pool.reserveB + VB, pool.reserveA + VA)
        expect((await quote(poolId, tkn, sellIn)).return).toBe(back)
        expect(await swap(poolId, tkn, sellIn)).toBe(back)
        after = await dex.getPool({ args: { poolId } })
        expect(after.reserveA).toBe(pool.reserveA - back)
        await assertEscrowIdentity(algorand, dex, poolId)
      })

      test('a buy is bounded by the real token reserve; a sell by the real ALGO reserve (errPdil, tryQuote 0)', async () => {
        const pool = await dex.getPool({ args: { poolId } })
        // ALGO in large enough that the CP output on effective reserves reaches the real token reserve
        const huge = 100_000_000n
        expect(cpOut(huge, 100n, pool.reserveA + VA, pool.reserveB + VB)).toBeGreaterThanOrEqual(pool.reserveB)
        await expectContractError(quote(poolId, 0n, huge), 'errPdil')
        await expectContractError(swap(poolId, 0n, huge), 'errPdil')
        expect(await tryQuote(poolId, 0n, huge)).toBe(0n)
        // sell more tokens than the bought side can pay for in real ALGO
        const dump = 200_000_000_000n
        expect(cpOut(dump, 100n, pool.reserveB + VB, pool.reserveA + VA)).toBeGreaterThanOrEqual(pool.reserveA)
        await expectContractError(swap(poolId, tkn, dump), 'errPdil')
        expect(await tryQuote(poolId, tkn, dump)).toBe(0n)
      })

      test('F5: a 90% DynamicFee is accepted up to the pool cap of 9,000 and rejected above it', async () => {
        const hook = await deployMockHook(DYNAMIC_FEE)
        const { poolId: capped } = await liveLaunch(launchConfig({ maxFeeBps: 9_000n }), [
          hookInstall({ app: hook.appId, points: BEFORE_SWAP | QUOTE, perms: DYNAMIC_FEE }),
        ])
        await hook.send.configure({ args: { mode: MODE_SET_FEE, value: 9_000n, value2: 0n, target: ZERO }, ...send })
        const pool = await dex.getPool({ args: { poolId: capped } })
        const expected = cpOut(1_000_000n, 9_000n, pool.reserveA + VA, pool.reserveB + VB)
        expect((await quote(capped, 0n, 1_000_000n)).return).toBe(expected)
        expect(await swap(capped, 0n, 1_000_000n)).toBe(expected)
        await assertEscrowIdentity(algorand, dex, capped)

        await hook.send.configure({ args: { mode: MODE_SET_FEE, value: 9_001n, value2: 0n, target: ZERO }, ...send })
        await expectContractError(swap(capped, 0n, 1_000_000n), 'errPdfe')
        await hook.send.configure({ args: { mode: MODE_PASS, value: 0n, value2: 0n, target: ZERO }, ...send })
      })
    })

    describe('(3) F3: no LP operations while bonding', () => {
      let poolId: bigint
      let plainLp: bigint

      beforeAll(async () => {
        ;({ poolId } = await liveLaunch())
        await swap(poolId, 0n, 2_000_000n)
        // a plain pool whose LP the trader holds, to build a well-formed LP transfer to the Vault
        const plain = await createPool({
          algorand,
          dex,
          sender: admin,
          assetA: 0n,
          assetB: tkn,
          config: poolConfig(30n),
          optInLp: [trader],
        })
        plainLp = plain.lpAsset
        await addLiquidity(algorand, dex, trader, plain.poolId, 10_000_000n, 10_000_000n)
      })

      const lpTransfer = () =>
        algorand.createTransaction.assetTransfer({
          sender: trader.addr,
          receiver: dex.appAddress,
          assetId: plainLp,
          amount: 1_000n,
        })

      test('addLiquidity and removeLiquidity fail with errPdlb', async () => {
        await expectContractError(addLiquidity(algorand, dex, trader, poolId, 1_000_000n, 1_000_000_000n), 'errPdlb')
        await expectContractError(
          dex.send.removeLiquidity({
            sender: trader.addr,
            args: { lpTransfer: lpTransfer(), poolId, minAmountA: 0n, minAmountB: 0n, data: NO_DATA },
            ...send,
          }),
          'errPdlb',
        )
      })

      test('paused: emergencyRemoveLiquidity fails with errPdlb; swaps, graduation and init are paused', async () => {
        await dex.send.setPoolPaused({ args: { poolId, paused: true }, ...send })
        try {
          await expectContractError(
            dex.send.emergencyRemoveLiquidity({
              sender: trader.addr,
              args: { lpTransfer: lpTransfer(), poolId, minAmountA: 0n, minAmountB: 0n },
              ...send,
            }),
            'errPdlb',
          )
          await expectContractError(swap(poolId, 0n, 1_000_000n), 'errPdpp')
          await expectContractError(graduate(poolId), 'errPdpp')
        } finally {
          await dex.send.setPoolPaused({ args: { poolId, paused: false }, ...send })
        }
        // still tradable afterwards
        expect(await swap(poolId, 0n, 1_000_000n)).toBeGreaterThan(0n)
        await assertEscrowIdentity(algorand, dex, poolId)
      })
    })

    describe('(4) custody k on effective reserves', () => {
      const TAKE = 10_000_000_000n
      let hook: MockDexHookClient
      let poolId: bigint

      /** smallest ALGO G with (eA + G − ceil(G·fee/1e4))·(eB − take) ≥ eA·eB (the Vault's fee-adjusted k) */
      const minAlgoWithFee = (eA: bigint, eB: bigint, take: bigint, fee: bigint) => {
        const ok = (g: bigint) => (eA + g - ceilDiv(g * fee, 10_000n)) * (eB - take) >= eA * eB
        let lo = 0n
        let hi = eA
        while (!ok(hi)) hi *= 2n
        while (lo < hi) {
          const mid = (lo + hi) / 2n
          if (ok(mid)) hi = mid
          else lo = mid + 1n
        }
        return lo
      }

      beforeAll(async () => {
        hook = await deployMockHook(CUSTODY)
        await hook.send.optIn({ args: { asset: tkn }, ...send })
        ;({ poolId } = await liveLaunch(launchConfig(), [hookInstall({ app: hook.appId, points: POKE, perms: CUSTODY })]))
        await swap(poolId, 0n, 3_000_000n)
      })

      const poke = () => dex.send.poke({ sender: trader.addr, args: { poolId, hookIndex: 0n, data: NO_DATA }, ...send })

      test('a buy at the curve price plus the custody fee passes; one µALGO less fails (errPdki)', async () => {
        const pool = await dex.getPool({ args: { poolId } })
        const eA = pool.reserveA + VA
        const eB = pool.reserveB + VB
        const min = minAlgoWithFee(eA, eB, TAKE, pool.custodyFeeBps)
        // priced on effective reserves: a k check on real reserves alone would accept far less ALGO
        expect(min).toBeGreaterThan(ceilDiv(pool.reserveA * pool.reserveB, pool.reserveB - TAKE) - pool.reserveA)

        await hook.send.configure({ args: { mode: MODE_TRADE, value: TAKE, value2: min - 1n, target: ZERO }, ...send })
        await expectContractError(poke(), 'errPdki')
        await hook.send.configure({ args: { mode: MODE_TRADE, value: TAKE, value2: min, target: ZERO }, ...send })
        await poke()
        const after = await dex.getPool({ args: { poolId } })
        expect([after.reserveA, after.reserveB, after.lockedB]).toEqual([pool.reserveA + min, pool.reserveB - TAKE, M])
        await assertEscrowIdentity(algorand, dex, poolId)
        await hook.send.configure({ args: { mode: MODE_PASS, value: 0n, value2: 0n, target: ZERO }, ...send })
      })

      test('custody cannot take the locked graduation reserve: taking more than the real token reserve fails', async () => {
        const pool = await dex.getPool({ args: { poolId } })
        // pay plenty of ALGO, but take more tokens than reserveB (the rest would come out of M)
        await hook.send.configure({
          args: { mode: MODE_TRADE, value: pool.reserveB + 1n, value2: 10_000_000n, target: ZERO },
          ...send,
        })
        await expectContractError(poke(), 'errPdki')
        await hook.send.configure({ args: { mode: MODE_PASS, value: 0n, value2: 0n, target: ZERO }, ...send })
      })
    })

    describe('(5) graduation', () => {
      test('below the threshold (errPdgr); at it the price is continuous, offsets retire, a second call fails', async () => {
        const { poolId } = await liveLaunch()
        await swap(poolId, 0n, 5_000_000n)
        await expectContractError(graduate(poolId), 'errPdgr')

        const pool = await buyToThreshold(poolId)
        const model = graduationModel(pool)
        // the d ≤ M branch: d is positive here and M covers it
        expect(model.d).toBeGreaterThan(0n)
        expect(model.d).toBeLessThanOrEqual(M)
        expect(model.newT).toBe(pool.reserveB + model.d)

        await graduate(poolId)
        const after = await dex.getPool({ args: { poolId } })
        expect([after.virtualA, after.virtualB]).toEqual([0n, 0n])
        expect([after.reserveA, after.reserveB, after.lockedB]).toEqual([pool.reserveA, model.newT, M - model.d])
        expect([after.protocolFeesA, after.lpSupply, after.lockedLp]).toEqual([
          pool.protocolFeesA,
          pool.lpSupply,
          pool.lockedLp,
        ])
        expectSamePrice(pool.reserveA + VA, pool.reserveB + VB, after.reserveA, after.reserveB)
        await assertEscrowIdentity(algorand, dex, poolId)

        await expectContractError(graduate(poolId), 'errPdgr')
      })

      test('a wash-traded state takes the d > M branch: the ALGO surplus goes to the treasury', async () => {
        // 10% fee: round trips inflate k above the fee-free curve, so rA can exceed rA_max. Scaled to a
        // 1,000 ALGO virtual quote so one µALGO of rounding stays below the 1e-9 continuity bound.
        const vA = 1_000_000_000n
        const dispenser = await algorand.account.dispenserFromEnvironment()
        await algorand.account.ensureFunded(trader.addr, dispenser.addr, (10_000).algo())
        const { poolId } = await liveLaunch(
          launchConfig({ feeBps: 1_000n, custodyFeeBps: 1_000n, virtualA: vA, graduationThreshold: 2_000_000_000n }),
        )
        for (let i = 0; i < 3; i++) {
          const bought = await swap(poolId, 0n, 1_000_000_000n)
          await swap(poolId, tkn, (bought * 99n) / 100n)
        }
        // buy until 1% of S is left on the curve
        let pool = await dex.getPool({ args: { poolId } })
        const want = pool.reserveB - S / 100n
        const eA = pool.reserveA + vA
        const eB = pool.reserveB + VB
        const effective = ceilDiv(want * eA, eB - want) + 1n
        await swap(poolId, 0n, ceilDiv(effective * 10_000n, 9_000n) + 1n)
        pool = await dex.getPool({ args: { poolId } })
        expect(pool.reserveA).toBeGreaterThanOrEqual(pool.graduationThreshold)

        const model = graduationModel(pool)
        expect(model.d).toBeGreaterThan(M)
        expect(model.surplus).toBeGreaterThan(0n)

        await graduate(poolId)
        const after = await dex.getPool({ args: { poolId } })
        expect([after.virtualA, after.virtualB, after.lockedB]).toEqual([0n, 0n, 0n])
        expect([after.reserveA, after.reserveB]).toEqual([model.newQ, pool.reserveB + M])
        expect(after.protocolFeesA).toBe(pool.protocolFeesA + model.surplus)
        expectSamePrice(pool.reserveA + vA, pool.reserveB + VB, after.reserveA, after.reserveB)
        await assertEscrowIdentity(algorand, dex, poolId)

        // the surplus reaches the treasury with the protocol fees
        const before = await holding(algorand, treasury.addr.toString(), 0n)
        await dex.send.collectProtocolFees({ args: { poolId }, ...send })
        expect(await holding(algorand, treasury.addr.toString(), 0n)).toBe(before + after.protocolFeesA)
        await assertEscrowIdentity(algorand, dex, poolId)
      })

      test('§10 A16: a low threshold (d < 0) keeps the price exact by locking the curve token excess', async () => {
        const { poolId } = await liveLaunch(launchConfig({ graduationThreshold: 2_000_000n }))
        await swap(poolId, 0n, 3_000_000n)
        const pool = await dex.getPool({ args: { poolId } })
        const model = graduationModel(pool)
        // the spec's numerator r_q·v_t − r_t·v_q is negative: tokens must leave the reserve, not join it
        expect(pool.reserveA * VB < pool.reserveB * VA).toBe(true)
        expect(model.newT).toBeLessThan(pool.reserveB)

        await graduate(poolId)
        const after = await dex.getPool({ args: { poolId } })
        expect([after.reserveA, after.reserveB]).toEqual([pool.reserveA, model.newT])
        expect(after.lockedB).toBe(M + pool.reserveB - model.newT)
        expect(after.protocolFeesA).toBe(pool.protocolFeesA)
        expectSamePrice(pool.reserveA + VA, pool.reserveB + VB, after.reserveA, after.reserveB)
        await assertEscrowIdentity(algorand, dex, poolId)
      })

      test('quoteIsA = false (token = A, ASA quote = B): same continuity, M locked on side A', async () => {
        const vQuote = 10_000_000n
        const vToken = VB
        const { poolId } = await createLaunch(
          poolConfig(100n, { virtualA: vToken, virtualB: vQuote, graduationThreshold: G, quoteIsA: false }),
          [],
          tkn,
          qta,
        )
        await expectContractError(initializeLaunch(poolId, S, M, creator, qta), 'errPdan')
        await initializeLaunch(poolId, S, M, creator, tkn)
        let pool = await dex.getPool({ args: { poolId } })
        expect([pool.reserveA, pool.reserveB, pool.lockedA, pool.lockedB]).toEqual([S, 0n, M, 0n])
        expect(pool.lpSupply).toBe(isqrt((S + vToken) * vQuote))
        // rB = 0: selling tokens pays out nothing real
        await expectContractError(swap(poolId, tkn, 1_000_000n), 'errPdil')
        // buys pay QTA (B) for TKN (A) on effective reserves
        const buyIn = G + 1_000_000n
        const expected = cpOut(buyIn, 100n, vQuote, S + vToken)
        expect(await swap(poolId, qta, buyIn)).toBe(expected)
        pool = await dex.getPool({ args: { poolId } })
        expect(pool.reserveB).toBeGreaterThanOrEqual(G)

        const model = graduationModel(pool)
        await graduate(poolId)
        const after = await dex.getPool({ args: { poolId } })
        expect([after.virtualA, after.virtualB]).toEqual([0n, 0n])
        expect([after.reserveA, after.reserveB, after.lockedA]).toEqual([model.newT, model.newQ, model.retained])
        expect(after.protocolFeesB).toBe(pool.protocolFeesB + model.surplus)
        expectSamePrice(pool.reserveA + vToken, pool.reserveB + vQuote, after.reserveA, after.reserveB)
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
      /** simulate one Vault call at the real budget (no extra opcode budget) and return its txn result */
      const measure = async (build: (group: ReturnType<PluginDexClient['newGroup']>) => Simulatable, index: number) => {
        const result = await build(dex.newGroup()).simulate({ allowUnnamedResources: true, skipSignatures: true })
        const group = result.simulateResponse.txnGroups[0]
        expect(group.failureMessage).toBeUndefined()
        return group.txnResults[index]
      }
      const innerCount = (result: modelsv2.SimulateTransactionResult) => result.txnResult.innerTxns?.length ?? 0

      test('hookless initializeLaunch, a bonding swap and graduate each fit one app call (700) with no op-ups', async () => {
        const { poolId, escrow } = await createLaunch()
        const init = await measure(
          (group) =>
            group.initializeLaunch({
              sender: creator.addr,
              signer: creator.signer,
              args: {
                tokenDeposit: transferTxn(algorand, creator, escrow, tkn, S),
                reserveDeposit: transferTxn(algorand, creator, escrow, tkn, M),
                poolId,
              },
              staticFee: microAlgo(1_000),
            }),
          2,
        )
        await initializeLaunch(poolId)
        const buy = await measure(
          (group) =>
            group.swap({
              sender: trader.addr,
              signer: trader.signer,
              args: {
                input: transferTxn(algorand, trader, escrow, 0n, G + 1_000_000n),
                poolId,
                minAmountOut: 0n,
                recipient: ZERO,
                data: NO_DATA,
                wallet: 0n,
              },
              staticFee: microAlgo(2_000),
            }),
          1,
        )
        await buyToThreshold(poolId)
        const grad = await measure(
          (group) =>
            group.graduate({ sender: trader.addr, signer: trader.signer, args: { poolId }, staticFee: microAlgo(1_000) }),
          0,
        )
        const used = [init, buy, grad].map((result) => Number(result.appBudgetConsumed))
        console.log(`[budget] hookless initializeLaunch ${used[0]}, bonding swap ${used[1]}, graduate ${used[2]} opcodes`)
        for (const value of used) expect(value).toBeLessThanOrEqual(700)
        expect([innerCount(init), innerCount(buy), innerCount(grad)]).toEqual([0, 1, 0])
      })
    })

    describe('(6) after graduation', () => {
      let poolId: bigint
      let lpAsset: bigint

      beforeAll(async () => {
        ;({ poolId, lpAsset } = await liveLaunch())
        await buyToThreshold(poolId)
        await graduate(poolId)
      })

      test('an outside LP adds and removes pro-rata; lockedLp stays counted and locked', async () => {
        const pool = await dex.getPool({ args: { poolId } })
        const amountA = 5_000_000n
        const amountB = ceilDiv(amountA * pool.reserveB, pool.reserveA) + 1_000n
        const minted = await addLiquidity(algorand, dex, trader, poolId, amountA, amountB)
        const fromA = (amountA * pool.lpSupply) / pool.reserveA
        const fromB = (amountB * pool.lpSupply) / pool.reserveB
        expect(minted).toBe(fromA < fromB ? fromA : fromB)
        const added = await dex.getPool({ args: { poolId } })
        expect([added.lpSupply, added.lockedLp]).toEqual([pool.lpSupply + minted, pool.lockedLp])
        expect(await holding(algorand, trader.addr.toString(), lpAsset)).toBe(minted)
        await assertEscrowIdentity(algorand, dex, poolId)

        const { return: out } = await dex.send.removeLiquidity({
          sender: trader.addr,
          args: {
            lpTransfer: algorand.createTransaction.assetTransfer({
              sender: trader.addr,
              receiver: dex.appAddress,
              assetId: lpAsset,
              amount: minted,
            }),
            poolId,
            minAmountA: 0n,
            minAmountB: 0n,
            data: NO_DATA,
          },
          ...send,
        })
        expect(out!.amountA).toBe((minted * added.reserveA) / added.lpSupply)
        expect(out!.amountB).toBe((minted * added.reserveB) / added.lpSupply)
        const removed = await dex.getPool({ args: { poolId } })
        expect([removed.lpSupply, removed.lockedLp]).toEqual([pool.lpSupply, pool.lockedLp])
        // the launch LP was never issued: the Vault still holds every unit not held by outside LPs
        expect(await holding(algorand, dex.appAddress.toString(), lpAsset)).toBe(LP_ASSET_TOTAL)
        await assertEscrowIdentity(algorand, dex, poolId)
      })

      test('swaps match plain constant product on real reserves; selling back is open', async () => {
        const pool = await dex.getPool({ args: { poolId } })
        const expected = cpOut(2_000_000n, 100n, pool.reserveA, pool.reserveB)
        expect((await quote(poolId, 0n, 2_000_000n)).return).toBe(expected)
        expect(await swap(poolId, 0n, 2_000_000n)).toBe(expected)
        const mid = await dex.getPool({ args: { poolId } })
        const sellIn = 1_000_000_000n
        const back = cpOut(sellIn, 100n, mid.reserveB, mid.reserveA)
        expect(await swap(poolId, tkn, sellIn)).toBe(back)
        await assertEscrowIdentity(algorand, dex, poolId)
      })
    })
  })
})
