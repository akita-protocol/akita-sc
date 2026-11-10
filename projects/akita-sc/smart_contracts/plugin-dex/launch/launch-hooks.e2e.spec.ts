// WP5b (FINAL-SPEC §5): AntiSnipeFeeHook, LaunchTaxHook and LaunchManager.
//
// The hooks are tested in isolation on ordinary native pools configured through F6 initData (akita-hooks
// B9 cases 5 and 6); the LaunchManager cases run on real launch pools (WP1-M3: virtual offsets,
// initializeLaunch, graduate): B9 case 10, WP5b acceptance (11) to (13), and the disclosed, vested dev buy
// (FINAL-SPEC §10 A36.1, OPEN-DECISIONS #20).
import { AlgorandClient, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import algosdk, { ALGORAND_ZERO_ADDRESS_STRING, getApplicationAddress, modelsv2 } from 'algosdk'
import { createHash, randomBytes } from 'node:crypto'
import { beforeAll, describe, expect, test } from 'vitest'
import { PluginDexClient } from '../../artifacts/plugin-dex/PluginDexClient'
import { AntiSnipeFeeHookClient, AntiSnipeFeeHookFactory, APP_SPEC as AntiSnipeSpec } from '../../artifacts/plugin-dex/hooks/AntiSnipeFeeHookClient'
import { GatedFeeHookClient, GatedFeeHookFactory } from '../../artifacts/plugin-dex/hooks/GatedFeeHookClient'
import { APP_SPEC as LaunchTaxSpec, LaunchTaxHookClient, LaunchTaxHookFactory } from '../../artifacts/plugin-dex/hooks/LaunchTaxHookClient'
import { SwapTaxHookFactory } from '../../artifacts/plugin-dex/hooks/SwapTaxHookClient'
import { APP_SPEC as LaunchManagerSpec, LaunchManagerClient, LaunchManagerFactory, LaunchParams, LaunchResult, TokenParams } from '../../artifacts/plugin-dex/launch/LaunchManagerClient'
import { RewardsClient } from '../../artifacts/rewards/RewardsClient'
import { deployRewards } from '../../../tests/fixtures/rewards'
import { expectContractError } from '../../../tests/utils/errors'
import { TimeWarp } from '../../../tests/utils/time'
import { assertEscrowIdentity, deployVault, hookInstall, HookInstall, poolConfig, transferTxn } from '../../../tests/fixtures/plugin-dex'

// hook points
const AFTER_INITIALIZE = 1n
const AFTER_ADD = 4n
const BEFORE_SWAP = 32n
const AFTER_SWAP = 64n
const QUOTE = 128n
// hook permissions
const DYNAMIC_FEE = 2n
const HOOK_FEE = 4n
const HOOK_FEE_OUT = 8n
// AntiSnipeFeeHook config
const LINEAR = 0n
const EXPONENTIAL = 1n
const START_CREATION = 0n
const START_FIRST_LIQUIDITY = 1n

const NO_DATA = new Uint8Array()
const send = { maxFee: microAlgo(200_000), coverAppCallInnerTransactionFees: true, populateAppCallResources: true }
/** box MBR of `prefix ‖ poolId` → value of `size` bytes */
const boxMbr = (size: bigint) => 2_500n + 400n * (9n + size)
const SNIPE_FUNDING = boxMbr(80n) // SnipeConfig: 6 × uint64 + address
const TAX_FUNDING = boxMbr(72n) // TaxConfig: address + 5 × uint64
const OPT_IN_MBR = 100_000n
/** LaunchTaxHook per-ASA accrual total box: `q ‖ asset` → uint64 */
const QUOTE_TOTAL_FUNDING = boxMbr(8n)

type Snipe = { start: bigint; end: bigint; mode: bigint; rounds: bigint; startMode: bigint; exempt?: string }
type Tax = { owner: string; quote: bigint; buy: bigint; sell: bigint; until?: bigint }

const snipeType = algosdk.ABIType.from('(uint64,uint64,uint64,uint64,uint64,address)')
const taxType = algosdk.ABIType.from('(address,uint64,uint64,uint64,uint64)')
const encodeSnipe = (s: Snipe) => snipeType.encode([s.start, s.end, s.mode, s.rounds, s.startMode, s.exempt ?? ALGORAND_ZERO_ADDRESS_STRING])
const encodeTax = (t: Tax) => taxType.encode([t.owner, t.quote, t.buy, t.sell, t.until ?? 0n])

/** Reference model of AntiSnipeFeeHook's decay (akita-hooks B5.1) */
const snipeFee = (s: Snipe, elapsed: bigint): bigint => {
  const span = s.start - s.end
  if (s.mode === LINEAR) return elapsed >= s.rounds ? s.end : s.end + (span * (s.rounds - elapsed)) / s.rounds
  const halvings = elapsed / s.rounds
  if (halvings >= 64n) return s.end
  const x0 = span >> halvings
  return s.end + x0 - (x0 * (elapsed % s.rounds)) / (2n * s.rounds)
}

/** Native constant product: lpFee = floor(net·fee/1e4), out = floor(eff·rOut/(rIn+eff)) */
const cpOut = (net: bigint, feeBps: bigint, rIn: bigint, rOut: bigint) => {
  const eff = net - (net * feeBps) / 10_000n
  return (eff * rOut) / (rIn + eff)
}

/** GatedFeeHook FeeSchedule (floorFeeBps, maxDiscountBps, impactMaxDiscountBps, tiers) */
const scheduleType = algosdk.ABIType.from('(uint64,uint64,uint64,(uint64,uint64,uint64,uint64)[])')
/**
 * One tier that every pass matches (minPower = minImpact = gateMask = 0): a pass holder's running fee is
 * halved, never below 20 bps. A pass opened with measure = 0 needs no DAO, staking or social state.
 */
const GATED_SCHEDULE = scheduleType.encode([20n, 5_000n, 0n, [[0n, 0n, 0n, 5_000n]]])
/** GatedFeeHook schedule box MBR for one tier (ScheduleMbrBase + ScheduleMbrPerTier) */
const GATED_FUNDING = 17_300n + 12_800n
/** GatedFeeHook's fee for a pass holder: half the running fee, floored at min(20, running) */
const gatedFee = (running: bigint) => {
  const fee = running - (running * 5_000n) / 10_000n
  const floor = running < 20n ? running : 20n
  return fee < floor ? floor : fee
}
const max = (a: bigint, b: bigint) => (a > b ? a : b)

type Pending = modelsv2.PendingTransactionResponse
const allInners = (txn: Pending): Pending[] => (txn.innerTxns ?? []).flatMap((inner) => [inner, ...allInners(inner)])
/** inner payments `sender → receiver` (amounts) anywhere under a confirmed txn */
const innerPayments = (txn: Pending, sender: string, receiver: string) =>
  allInners(txn)
    .filter((t) => t.txn.txn.payment && t.txn.txn.sender.toString() === sender && t.txn.txn.payment.receiver.toString() === receiver)
    .map((t) => t.txn.txn.payment!.amount)

const approvalLength = (spec: { byteCode?: { approval: string } }) => Buffer.from(spec.byteCode!.approval, 'base64').length
const note = () => new Uint8Array(randomBytes(8))

describe('WP5b launch hooks and LaunchManager', () => {
  const localnet = algorandFixture()
  let algorand: AlgorandClient
  let admin: TransactionSignerAccount
  let trader: TransactionSignerAccount
  let owner: TransactionSignerAccount
  /** a trader without a GatedFeeHook pass */
  let plain: TransactionSignerAccount
  let dex: PluginDexClient
  let snipe: AntiSnipeFeeHookClient
  let tax: LaunchTaxHookClient
  let warp: TimeWarp
  let tka: bigint
  let tkb: bigint

  const lastRound = async () => (await algorand.client.algod.status().do()).lastRound
  /**
   * Advance so that the next transaction lands in `round`. LocalNet is shared with other test runs, so
   * a transaction may still land later: tests always price with the round it actually landed in.
   */
  const nextTxnAt = async (round: bigint) => {
    const last = await lastRound()
    if (round > last + 1n) await warp.warpForwardRounds(round - last - 1n)
  }
  const hookBalance = async (app: bigint, asset = 0n) => {
    const address = getApplicationAddress(app).toString()
    if (asset === 0n) return (await algorand.account.getInformation(address)).balance.microAlgo
    return (await algorand.asset.getAccountInformation(address, asset)).balance
  }

  const escrowOf = async (poolId: bigint) => getApplicationAddress((await dex.getPool({ args: { poolId } })).escrow).toString()

  const swapArgs = (account: TransactionSignerAccount, escrow: string, poolId: bigint, assetIn: bigint, amountIn: bigint) => ({
    sender: account.addr,
    args: {
      input: transferTxn(algorand, account, escrow, assetIn, amountIn),
      poolId,
      minAmountOut: 0n,
      recipient: ALGORAND_ZERO_ADDRESS_STRING,
      data: NO_DATA,
      wallet: 0n,
    },
    note: note(),
    maxFee: microAlgo(200_000),
  })
  const quoteArgs = (account: TransactionSignerAccount, poolId: bigint, assetIn: bigint, amountIn: bigint) => ({
    sender: account.addr,
    args: { poolId, assetIn, amountIn, swapper: account.addr.toString(), data: NO_DATA, wallet: 0n },
    note: note(),
    maxFee: microAlgo(200_000),
  })

  const opUpArgs = (account: TransactionSignerAccount) => ({ sender: account.addr, args: [] as [], note: note(), maxFee: microAlgo(200_000) })

  /**
   * [opUp ×3, quote, swap] in one group: returns the quote, the swap output and the round. The Vault tops
   * up its own opcode budget (FINAL-SPEC §10 A12); the carriers hold resource references: box read quota
   * for the 13.6 KB program (A11) plus the hooks' boxes and holdings, past algokit's 8 per call (A19).
   */
  const quoteAndSwap = async (account: TransactionSignerAccount, poolId: bigint, assetIn: bigint, amountIn: bigint) => {
    const escrow = await escrowOf(poolId)
    const result = await dex
      .newGroup()
      .opUp(opUpArgs(account))
      .opUp(opUpArgs(account))
      .opUp(opUpArgs(account))
      .quote(quoteArgs(account, poolId, assetIn, amountIn))
      .swap(swapArgs(account, escrow, poolId, assetIn, amountIn))
      .send(send)
    return { quoted: result.returns[3] as bigint, out: result.returns[4] as bigint, round: result.confirmations[4].confirmedRound! }
  }

  /** addLiquidity with opUp carriers (hooked pools run AfterAddLiquidity hooks) */
  const addLiquidity = async (account: TransactionSignerAccount, poolId: bigint, amountA: bigint, amountB: bigint) => {
    const pool = await dex.getPool({ args: { poolId } })
    const escrow = getApplicationAddress(pool.escrow).toString()
    const result = await dex
      .newGroup()
      .opUp(opUpArgs(account))
      .opUp(opUpArgs(account))
      .addLiquidity({
        sender: account.addr,
        args: {
          depositA: transferTxn(algorand, account, escrow, pool.assetA, amountA),
          depositB: transferTxn(algorand, account, escrow, pool.assetB, amountB),
          poolId,
          minLpOut: 0n,
          data: NO_DATA,
        },
        maxFee: microAlgo(200_000),
      })
      .send(send)
    return result.returns[2] as bigint
  }

  const deployHooks = async () => {
    snipe = (
      await algorand.client
        .getTypedAppFactory(AntiSnipeFeeHookFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
        .send.create.create({ args: { dex: dex.appId } })
    ).appClient
    tax = (
      await algorand.client
        .getTypedAppFactory(LaunchTaxHookFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
        .send.create.create({ args: { dex: dex.appId } })
    ).appClient
    // account minimum balance only: every per-pool box is paid by F6 funding
    for (const hook of [snipe, tax]) await hook.appClient.fundAppAccount({ amount: microAlgo(100_000) })
    await dex.send.setHookApproval({ args: { hook: snipe.appId, perms: DYNAMIC_FEE }, ...send })
    await dex.send.setHookApproval({ args: { hook: tax.appId, perms: HOOK_FEE | HOOK_FEE_OUT }, ...send })
  }

  /** GatedFeeHook (WP5a), deployed on first use; `trader` holds a pass, `plain` does not */
  let gated: GatedFeeHookClient | undefined
  const gatedHook = async () => {
    if (gated) return gated
    const client = (
      await algorand.client
        .getTypedAppFactory(GatedFeeHookFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
        // the DAO is only read by admin methods, by measurement and by hinted calls (wallet != 0), none of which
        // these tests use: every swap here, the LaunchManager's dev buy included, passes wallet = 0
        .send.create.create({ args: { dex: dex.appId, akitaDao: dex.appId, passTtl: 0n } })
    ).appClient
    await client.appClient.fundAppAccount({ amount: microAlgo(100_000) })
    await dex.send.setHookApproval({ args: { hook: client.appId, perms: DYNAMIC_FEE }, ...send })
    // passes are keyed by principal (spec §6.12): the trader opens its own (hint 0); admin funds it
    await client.send.openPass({
      sender: trader.addr,
      signer: trader.signer,
      args: {
        // the hook's own PassMbr (read, not hard-coded: it tracks the FeePass layout)
        // createTransaction drops `signer`: pass the funder's signer with the txn, or the call's signer (trader) signs it
        mbr: {
          txn: await algorand.createTransaction.payment({ sender: admin.addr, receiver: client.appAddress, amount: microAlgo(await client.passCost()) }),
          signer: admin.signer,
        },
        key: trader.addr.toString(),
        measure: 0n,
        gateArgs: [],
        wallet: 0n,
      },
      ...send,
    })
    gated = client
    return client
  }
  const gatedInstall = (app: bigint): HookInstall =>
    hookInstall({ app, points: AFTER_INITIALIZE | BEFORE_SWAP | QUOTE, perms: DYNAMIC_FEE, funding: GATED_FUNDING, initData: GATED_SCHEDULE })

  const snipeInstall = (s: Snipe, funding = SNIPE_FUNDING): HookInstall => {
    const points = AFTER_INITIALIZE | BEFORE_SWAP | QUOTE | (s.startMode === START_FIRST_LIQUIDITY ? AFTER_ADD : 0n)
    return hookInstall({ app: snipe.appId, points, perms: DYNAMIC_FEE, funding, initData: encodeSnipe(s) })
  }
  const taxInstall = (t: Tax, funding = TAX_FUNDING): HookInstall => {
    const perms = (t.buy > 0n ? HOOK_FEE : 0n) | (t.sell > 0n ? HOOK_FEE_OUT : 0n)
    const points = AFTER_INITIALIZE | BEFORE_SWAP | QUOTE | (t.sell > 0n ? AFTER_SWAP : 0n)
    return hookInstall({ app: tax.appId, points, perms, funding, initData: encodeTax(t) })
  }

  /**
   * ALGO/TKA (or any pair) pool with the given hooks; anti-snipe needs maxFeeBps ≥ its start fee.
   * createPool goes with an opUp carrier: an ASA/ASA pool whose hook opts into an ASA needs more than
   * one app call's worth of resource references. `extraCarriers` add opcode budget (see the GatedFeeHook
   * stack test). Returns the createPool round.
   */
  const hookedPool = async (
    hooks: HookInstall[],
    feeBps = 30n,
    overrides: Parameters<typeof poolConfig>[1] = {},
    assetA = 0n,
    assetB = tka,
    extraCarriers = 0,
  ) => {
    const group = dex.newGroup().opUp(opUpArgs(admin))
    // generated composers append in place and return themselves
    for (let i = 0; i < extraCarriers; i++) group.opUp(opUpArgs(admin))
    const result = await group
      .createPool({
        sender: admin.addr,
        args: {
          payment: algorand.createTransaction.payment({ sender: admin.addr, receiver: dex.appAddress, amount: microAlgo(3_000_000) }),
          assetA,
          assetB,
          config: poolConfig(feeBps, { maxFeeBps: 9_000n, maxHookFeeBps: 500n, ...overrides }),
          hooks,
          externals: [],
        },
        maxFee: microAlgo(200_000),
      })
      .send(send)
    const index = 1 + extraCarriers
    const poolId = result.returns[index] as bigint
    const pool = await dex.getPool({ args: { poolId } })
    for (const account of [admin, trader]) await algorand.send.assetOptIn({ sender: account.addr, signer: account.signer, assetId: pool.lpAsset })
    return { poolId, escrow: getApplicationAddress(pool.escrow).toString(), pool, round: result.confirmations[index].confirmedRound! }
  }

  beforeAll(async () => {
    await localnet.newScope()
    algorand = localnet.algorand
    admin = localnet.context.testAccount
    trader = await localnet.context.generateAccount({ initialFunds: (1_500).algo() })
    owner = await localnet.context.generateAccount({ initialFunds: (10).algo() })
    plain = await localnet.context.generateAccount({ initialFunds: (200).algo() })
    const dispenser = await algorand.account.dispenserFromEnvironment()
    await algorand.account.ensureFunded(admin.addr, dispenser.addr, (2_000).algo())
    warp = new TimeWarp(algorand)

    for (const unitName of ['TKA', 'TKB']) {
      const { assetId } = await algorand.send.assetCreate({ sender: admin.addr, total: 10n ** 15n, decimals: 6, unitName })
      await algorand.send.assetOptIn({ sender: trader.addr, assetId })
      await algorand.send.assetTransfer({ sender: admin.addr, receiver: trader.addr, assetId, amount: 10n ** 12n })
      if (unitName === 'TKA') tka = assetId
      else tkb = assetId
    }
    await algorand.send.assetOptIn({ sender: owner.addr, assetId: tka })
    await algorand.send.assetOptIn({ sender: plain.addr, assetId: tka })

    dex = await deployVault({ algorand, sender: admin })
    await deployHooks()
  })

  test('(13) program sizes: every WP5b app is far below the 14,000 B gate', () => {
    const sizes = { AntiSnipeFeeHook: approvalLength(AntiSnipeSpec), LaunchTaxHook: approvalLength(LaunchTaxSpec), LaunchManager: approvalLength(LaunchManagerSpec) }
    console.log(`[WP5b] approval sizes ${JSON.stringify(sizes)}`)
    for (const size of Object.values(sizes)) expect(size).toBeLessThanOrEqual(14_000)
  })

  // AntiSnipeFeeHook (B5.1, B9 case 5) ---------------------------------------------------------

  describe('AntiSnipeFeeHook', () => {
    test('Creation mode: the clock starts at createPool and feeAt follows the exponential and linear formulas', async () => {
      const exp: Snipe = { start: 5_000n, end: 100n, mode: EXPONENTIAL, rounds: 4n, startMode: START_CREATION }
      const { poolId, round } = await hookedPool([snipeInstall(exp)])
      const config = await snipe.getConfig({ args: { poolId } })
      expect(config).toEqual({
        startRound: round,
        startFeeBps: 5_000n,
        endFeeBps: 100n,
        decayMode: EXPONENTIAL,
        decayRounds: 4n,
        startMode: START_CREATION,
        exempt: ALGORAND_ZERO_ADDRESS_STRING,
      })
      // akita-hooks B5.1 example: r0 50%, r4 25.5%, r8 13.25%, r20 ≈ 2.5%, r40 ≈ 1.04%
      const expected = [5_000n, 2_550n, 1_325n, 253n, 104n]
      const at = [0n, 4n, 8n, 20n, 40n]
      for (let i = 0; i < at.length; i++) {
        expect(snipeFee(exp, at[i])).toBe(expected[i])
        expect(await snipe.feeAt({ args: { poolId, round: round + at[i] } })).toBe(expected[i])
      }
      // inside a half-life the fee interpolates linearly and stays monotone
      let previous = 10_000n
      for (const e of [...Array.from({ length: 13 }, (_, i) => BigInt(i)), 25n, 50n, 100n, 200n, 255n]) {
        const fee = await snipe.feeAt({ args: { poolId, round: round + e } })
        expect(fee).toBe(snipeFee(exp, e))
        expect(fee).toBeLessThanOrEqual(previous)
        previous = fee
      }
      expect(await snipe.feeAt({ args: { poolId, round: round + 64n * 4n } })).toBe(100n)

      const lin: Snipe = { start: 5_000n, end: 100n, mode: LINEAR, rounds: 10n, startMode: START_CREATION }
      const linear = await hookedPool([snipeInstall(lin)])
      for (const [e, fee] of [[0n, 5_000n], [5n, 2_550n], [9n, 590n], [10n, 100n], [1_000n, 100n]] as const) {
        expect(snipeFee(lin, e)).toBe(fee)
        expect(await snipe.feeAt({ args: { poolId: linear.poolId, round: linear.round + e } })).toBe(fee)
      }
    })

    test('a live swap pays max(base, decayed fee); quote == swap in the same group', async () => {
      const s: Snipe = { start: 5_000n, end: 100n, mode: EXPONENTIAL, rounds: 4n, startMode: START_CREATION }
      const { poolId, round: start } = await hookedPool([snipeInstall(s)])
      await addLiquidity(trader, poolId, 50_000_000n, 50_000_000n)
      for (const target of [start + 6n, start + 13n]) {
        await nextTxnAt(target)
        const before = await dex.getPool({ args: { poolId } })
        const { quoted, out, round } = await quoteAndSwap(trader, poolId, 0n, 1_000_000n)
        expect(round).toBeGreaterThanOrEqual(target)
        const fee = snipeFee(s, round - start)
        expect(out).toBe(cpOut(1_000_000n, fee > 30n ? fee : 30n, before.reserveA, before.reserveB))
        expect(quoted).toBe(out)
        await assertEscrowIdentity(algorand, dex, poolId)
      }
    })

    test('FirstLiquidity: decay at r0, r4, r8, r40; exempt creator only at e == 0; same-round snipers pay the max', async () => {
      const s: Snipe = { start: 5_000n, end: 100n, mode: EXPONENTIAL, rounds: 4n, startMode: START_FIRST_LIQUIDITY, exempt: admin.addr.toString() }
      const { poolId, escrow } = await hookedPool([snipeInstall(s)])
      expect((await snipe.getConfig({ args: { poolId } })).startRound).toBe(0n)
      // before any liquidity the clock has not started: the full start fee
      expect(await snipe.feeAt({ args: { poolId, round: (await lastRound()) + 100n } })).toBe(5_000n)

      // r0: first deposit, a sniper's quote and swap, and the exempt creator's swap, all in one group
      const deposit = 100_000_000n
      const amount = 1_000_000n
      const result = await dex
        .newGroup()
        .opUp(opUpArgs(admin))
        .opUp(opUpArgs(admin))
        .opUp(opUpArgs(admin))
        .opUp(opUpArgs(admin))
        .addLiquidity({
          sender: admin.addr,
          args: {
            depositA: transferTxn(algorand, admin, escrow, 0n, deposit),
            depositB: transferTxn(algorand, admin, escrow, tka, deposit),
            poolId,
            minLpOut: 0n,
            data: NO_DATA,
          },
          maxFee: microAlgo(200_000),
        })
        .quote(quoteArgs(trader, poolId, 0n, amount))
        .swap(swapArgs(trader, escrow, poolId, 0n, amount))
        .swap(swapArgs(admin, escrow, poolId, 0n, amount))
        .send(send)
      const r0 = result.confirmations[4].confirmedRound!
      expect((await snipe.getConfig({ args: { poolId } })).startRound).toBe(r0)
      const sniperOut = cpOut(amount, 5_000n, deposit, deposit)
      expect(result.returns[5]).toBe(sniperOut)
      expect(result.returns[6]).toBe(sniperOut)
      // the exempt creator pays only the base fee at e == 0
      expect(result.returns[7]).toBe(cpOut(amount, 30n, deposit + amount, deposit - sniperOut))
      await assertEscrowIdentity(algorand, dex, poolId)

      // a later deposit does not restart the clock
      await addLiquidity(trader, poolId, 1_000_000n, 2_000_000n)
      expect((await snipe.getConfig({ args: { poolId } })).startRound).toBe(r0)

      for (const [e, fee] of [[4n, 2_550n], [8n, 1_325n], [40n, 104n]] as const) {
        expect(snipeFee(s, e)).toBe(fee)
        await nextTxnAt(r0 + e)
        const before = await dex.getPool({ args: { poolId } })
        // the exempt creator is not exempt after e == 0
        const { quoted, out, round } = await quoteAndSwap(admin, poolId, 0n, amount)
        if (round !== r0 + e) console.warn(`[WP5b] shared LocalNet: swap for e=${e} landed at e=${round - r0}`)
        expect(round).toBeGreaterThanOrEqual(r0 + e)
        expect(out).toBe(cpOut(amount, snipeFee(s, round - r0), before.reserveA, before.reserveB))
        expect(quoted).toBe(out)
      }
      await assertEscrowIdentity(algorand, dex, poolId)
    })

    test('(stabilize) FirstLiquidity without the AfterAddLiquidity point: the first swap starts the clock', async () => {
      const s: Snipe = { start: 5_000n, end: 100n, mode: EXPONENTIAL, rounds: 4n, startMode: START_FIRST_LIQUIDITY, exempt: admin.addr.toString() }
      // the install omits AfterAddLiquidity: before the fix the clock never started, so every swap paid the
      // start fee and the creator stayed exempt forever
      const install = hookInstall({ app: snipe.appId, points: AFTER_INITIALIZE | BEFORE_SWAP | QUOTE, perms: DYNAMIC_FEE, funding: SNIPE_FUNDING, initData: encodeSnipe(s) })
      const { poolId, escrow } = await hookedPool([install])
      const deposit = 100_000_000n
      await addLiquidity(trader, poolId, deposit, deposit)
      expect((await snipe.getConfig({ args: { poolId } })).startRound).toBe(0n)
      await nextTxnAt((await lastRound()) + 3n)

      // first trading round: a sniper's quote and swap pay the start fee; the exempt creator pays the base fee
      const amount = 1_000_000n
      const result = await dex
        .newGroup()
        .opUp(opUpArgs(admin))
        .opUp(opUpArgs(admin))
        .opUp(opUpArgs(admin))
        .quote(quoteArgs(trader, poolId, 0n, amount))
        .swap(swapArgs(trader, escrow, poolId, 0n, amount))
        .swap(swapArgs(admin, escrow, poolId, 0n, amount))
        .send(send)
      const r0 = result.confirmations[4].confirmedRound!
      expect((await snipe.getConfig({ args: { poolId } })).startRound).toBe(r0)
      const sniperOut = cpOut(amount, 5_000n, deposit, deposit)
      expect(result.returns[3]).toBe(sniperOut)
      expect(result.returns[4]).toBe(sniperOut)
      expect(result.returns[5]).toBe(cpOut(amount, 30n, deposit + amount, deposit - sniperOut))

      // the clock runs from r0: the fee decays and the creator is no longer exempt
      await nextTxnAt(r0 + 8n)
      const before = await dex.getPool({ args: { poolId } })
      const { quoted, out, round } = await quoteAndSwap(admin, poolId, 0n, amount)
      expect(round).toBeGreaterThanOrEqual(r0 + 8n)
      expect(snipeFee(s, round - r0)).toBeLessThan(5_000n)
      expect(out).toBe(cpOut(amount, max(30n, snipeFee(s, round - r0)), before.reserveA, before.reserveB))
      expect(quoted).toBe(out)
      await assertEscrowIdentity(algorand, dex, poolId)
    })

    test('never lowers a fee: a base fee above the decayed fee is kept', async () => {
      const s: Snipe = { start: 2_000n, end: 50n, mode: LINEAR, rounds: 2n, startMode: START_CREATION }
      const { poolId, round: start } = await hookedPool([snipeInstall(s)], 300n)
      await addLiquidity(trader, poolId, 20_000_000n, 20_000_000n)
      await nextTxnAt(start + 5n)
      const before = await dex.getPool({ args: { poolId } })
      const { out, quoted } = await quoteAndSwap(trader, poolId, tka, 500_000n)
      expect(out).toBe(cpOut(500_000n, 300n, before.reserveB, before.reserveA))
      expect(quoted).toBe(out)
    })

    test('(12) stack [GatedFee, AntiSnipe, LaunchTax]: the discount cannot cut the anti-snipe fee; the reversed order can', async () => {
      const gatedApp = (await gatedHook()).appId
      const s: Snipe = { start: 3_000n, end: 20n, mode: EXPONENTIAL, rounds: 2n, startMode: START_CREATION }
      const t: Tax = { owner: owner.addr.toString(), quote: 0n, buy: 100n, sell: 0n }
      const base = 100n
      // GatedFeeHook's AfterInitialize (schedule decode, checks, box write) leaves the Vault's createPool
      // short of budget before its next top-up: one extra carrier (LaunchManager.launch pre-funds 2,100)
      const { poolId, round: start } = await hookedPool([gatedInstall(gatedApp), snipeInstall(s), taxInstall(t)], base, {}, 0n, tka, 1)
      expect((await dex.getPoolHooks({ args: { poolId } })).map((h) => h[0])).toEqual([gatedApp, snipe.appId, tax.appId])
      await addLiquidity(trader, poolId, 50_000_000n, 50_000_000n)
      const amount = 1_000_000n
      // the tax is a hook fee on the input: neither fee hook changes it
      const taxed = amount - (amount * t.buy) / 10_000n

      // early: both traders pay the decayed anti-snipe fee; late (decayed to 20): the pass holder pays the
      // discounted base fee (50) and the other trader the base fee (100). fee = max(gated(base), decay).
      for (const e of [2n, 200n]) {
        await nextTxnAt(start + e)
        for (const [account, running] of [[trader, gatedFee(base)], [plain, base]] as const) {
          const before = await dex.getPool({ args: { poolId } })
          const { out, quoted, round } = await quoteAndSwap(account, poolId, 0n, amount)
          const fee = max(running, snipeFee(s, round - start))
          expect(out).toBe(cpOut(taxed, fee, before.reserveA, before.reserveB))
          expect(quoted).toBe(out)
          // early the discount is lost under the anti-snipe fee; at e ≥ 128 the decay has reached 20
          // (a shared LocalNet can land the early swap late enough that the decay already fell below `running`)
          if (e === 2n && snipeFee(s, round - start) > running) expect(fee).toBeGreaterThan(running)
          else if (e === 2n) console.warn(`[WP5b] shared LocalNet: early (12) swap landed at e=${round - start}`)
          else expect(fee).toBe(running)
        }
      }
      expect((await tax.getConfig({ args: { poolId } })).accrued).toBe(4n * (amount - taxed))
      await assertEscrowIdentity(algorand, dex, poolId)

      // reversed [AntiSnipe, GatedFee]: the discount now applies to the anti-snipe fee itself
      const reversed = await hookedPool([snipeInstall(s), gatedInstall(gatedApp)], base, {}, 0n, tka, 1)
      await addLiquidity(trader, reversed.poolId, 50_000_000n, 50_000_000n)
      await nextTxnAt(reversed.round + 2n)
      const before = await dex.getPool({ args: { poolId: reversed.poolId } })
      const { out, round } = await quoteAndSwap(trader, reversed.poolId, 0n, amount)
      const decayed = snipeFee(s, round - reversed.round)
      expect(gatedFee(decayed)).toBeLessThan(decayed)
      expect(out).toBe(cpOut(amount, gatedFee(decayed), before.reserveA, before.reserveB))
    })

    test('F6 validation: malformed or out-of-bounds initData reverts createPool', async () => {
      const base: Snipe = { start: 5_000n, end: 100n, mode: EXPONENTIAL, rounds: 4n, startMode: START_CREATION }
      const install = (initData: Uint8Array) =>
        hookInstall({ app: snipe.appId, points: AFTER_INITIALIZE | BEFORE_SWAP | QUOTE, perms: DYNAMIC_FEE, funding: SNIPE_FUNDING, initData })
      await expectContractError(hookedPool([install(new Uint8Array(71))]), 'errAxdt')
      await expectContractError(hookedPool([install(NO_DATA)]), 'errAxdt')
      for (const bad of [
        { ...base, start: 9_001n },
        { ...base, end: 1_001n, start: 2_000n },
        { ...base, end: 600n, start: 500n },
        { ...base, rounds: 0n },
        { ...base, mode: 2n },
        { ...base, startMode: 2n },
        { ...base, mode: LINEAR, rounds: 100_001n },
        { ...base, rounds: 1_563n },
        // only the pool creator (ctx.caller at AfterInitialize) may be exempt
        { ...base, exempt: trader.addr.toString() },
      ]) {
        await expectContractError(hookedPool([install(encodeSnipe(bad))]), 'errAxcf')
      }
      // the box MBR comes from F6 funding: no funding, no pool
      await expect(hookedPool([install(encodeSnipe(base)).map((v, i) => (i === 4 ? 0n : v)) as HookInstall])).rejects.toThrow()
    })

    test('the Vault still caps it: a start fee above pool.maxFeeBps fails the swap (errPdfe)', async () => {
      const s: Snipe = { start: 5_000n, end: 100n, mode: EXPONENTIAL, rounds: 4n, startMode: START_CREATION }
      const { poolId } = await hookedPool([snipeInstall(s)], 30n, { maxFeeBps: 1_000n })
      await addLiquidity(trader, poolId, 20_000_000n, 20_000_000n)
      await expectContractError(quoteAndSwap(trader, poolId, 0n, 100_000n), 'errPdfe')
    })
  })

  // LaunchTaxHook (B5.2, B9 case 6) ------------------------------------------------------------

  describe('LaunchTaxHook', () => {
    test('buys pay HookFee in ALGO, sells pay HookFeeOut in ALGO (F8); accruals match the hook balance; quote == swap', async () => {
      const t: Tax = { owner: owner.addr.toString(), quote: 0n, buy: 300n, sell: 200n }
      const { poolId } = await hookedPool([taxInstall(t)], 30n, { maxHookFeeBps: 300n })
      expect(await tax.getConfig({ args: { poolId } })).toEqual({ owner: t.owner, quoteAsset: 0n, buyTaxBps: 300n, sellTaxBps: 200n, untilRound: 0n, accrued: 0n })
      await addLiquidity(trader, poolId, 50_000_000n, 80_000_000n)

      // buy: ALGO in
      let pool = await dex.getPool({ args: { poolId } })
      let balance = await hookBalance(tax.appId)
      const buyIn = 2_000_000n
      const buyTax = (buyIn * 300n) / 10_000n
      const buy = await quoteAndSwap(trader, poolId, 0n, buyIn)
      expect(buy.out).toBe(cpOut(buyIn - buyTax, 30n, pool.reserveA, pool.reserveB))
      expect(buy.quoted).toBe(buy.out)
      expect(await hookBalance(tax.appId)).toBe(balance + buyTax)
      expect((await tax.getConfig({ args: { poolId } })).accrued).toBe(buyTax)
      await assertEscrowIdentity(algorand, dex, poolId)

      // sell: TKA in, the tax is a cut of the ALGO output
      pool = await dex.getPool({ args: { poolId } })
      balance = await hookBalance(tax.appId)
      const sellIn = 3_000_000n
      const gross = cpOut(sellIn, 30n, pool.reserveB, pool.reserveA)
      const sellTax = (gross * 200n) / 10_000n
      const traderAlgo = (await algorand.account.getInformation(trader.addr)).balance.microAlgo
      const sell = await quoteAndSwap(trader, poolId, tka, sellIn)
      expect(sell.out).toBe(gross - sellTax)
      expect(sell.quoted).toBe(sell.out)
      expect(await hookBalance(tax.appId)).toBe(balance + sellTax)
      expect((await tax.getConfig({ args: { poolId } })).accrued).toBe(buyTax + sellTax)
      // the trader got gross − tax (minus the group's fees, which the trader paid)
      const traderAfter = (await algorand.account.getInformation(trader.addr)).balance.microAlgo
      expect(traderAfter - traderAlgo).toBeLessThanOrEqual(gross - sellTax)
      await assertEscrowIdentity(algorand, dex, poolId)

      // claim: owner only, pays the accrual once
      await expectContractError(tax.send.claim({ sender: trader.addr, args: { poolId }, ...send }), 'errLxow')
      const ownerBefore = (await algorand.account.getInformation(owner.addr)).balance.microAlgo
      const { return: claimed } = await tax.send.claim({ sender: owner.addr, signer: owner.signer, args: { poolId }, ...send })
      expect(claimed).toBe(buyTax + sellTax)
      const ownerAfter = (await algorand.account.getInformation(owner.addr)).balance.microAlgo
      expect(ownerAfter).toBeGreaterThan(ownerBefore + buyTax + sellTax - 10_000n)
      expect((await tax.getConfig({ args: { poolId } })).accrued).toBe(0n)
      const { return: again } = await tax.send.claim({ sender: owner.addr, signer: owner.signer, args: { poolId }, ...send })
      expect(again).toBe(0n)
    })

    test('a buy-only tax (default launch shape) never taxes sells', async () => {
      const t: Tax = { owner: owner.addr.toString(), quote: 0n, buy: 100n, sell: 0n }
      const { poolId } = await hookedPool([taxInstall(t)], 30n, { maxHookFeeBps: 100n })
      await addLiquidity(trader, poolId, 20_000_000n, 20_000_000n)
      const pool = await dex.getPool({ args: { poolId } })
      const sell = await quoteAndSwap(trader, poolId, tka, 1_000_000n)
      expect(sell.out).toBe(cpOut(1_000_000n, 30n, pool.reserveB, pool.reserveA))
      expect((await tax.getConfig({ args: { poolId } })).accrued).toBe(0n)
    })

    test('ASA quote asset: the hook opts in and opens the asset total at AfterInitialize (F6-funded), so sells paying the tax in that ASA succeed', async () => {
      // pool TKA/TKB with TKA as the quote asset
      const t: Tax = { owner: owner.addr.toString(), quote: tka, buy: 150n, sell: 250n }
      const before = (await algorand.account.getInformation(getApplicationAddress(tax.appId))).minBalance.microAlgo
      const { poolId } = await hookedPool([taxInstall(t, TAX_FUNDING + OPT_IN_MBR + QUOTE_TOTAL_FUNDING)], 30n, { maxHookFeeBps: 250n }, tka, tkb)
      expect(await hookBalance(tax.appId, tka)).toBe(0n)
      const after = (await algorand.account.getInformation(getApplicationAddress(tax.appId))).minBalance.microAlgo
      expect(after - before).toBe(TAX_FUNDING + OPT_IN_MBR + QUOTE_TOTAL_FUNDING)
      await addLiquidity(trader, poolId, 30_000_000n, 30_000_000n)

      let pool = await dex.getPool({ args: { poolId } })
      const sellIn = 2_000_000n
      const gross = cpOut(sellIn, 30n, pool.reserveB, pool.reserveA)
      const sell = await quoteAndSwap(trader, poolId, tkb, sellIn)
      const sellTax = (gross * 250n) / 10_000n
      expect(sell.out).toBe(gross - sellTax)
      expect(await hookBalance(tax.appId, tka)).toBe(sellTax)

      pool = await dex.getPool({ args: { poolId } })
      const buyIn = 1_000_000n
      const buyTax = (buyIn * 150n) / 10_000n
      const buy = await quoteAndSwap(trader, poolId, tka, buyIn)
      expect(buy.out).toBe(cpOut(buyIn - buyTax, 30n, pool.reserveA, pool.reserveB))
      expect(await hookBalance(tax.appId, tka)).toBe(sellTax + buyTax)
      expect((await tax.getConfig({ args: { poolId } })).accrued).toBe(sellTax + buyTax)

      // a second pool with the same quote asset does not need (or pay for) a second opt-in
      const second = await hookedPool([taxInstall(t)], 30n, { maxHookFeeBps: 250n }, tka, tkb)
      expect((await tax.getConfig({ args: { poolId: second.poolId } })).quoteAsset).toBe(tka)

      const ownerBefore = await algorand.asset.getAccountInformation(owner.addr, tka)
      await tax.send.claim({ sender: owner.addr, signer: owner.signer, args: { poolId }, ...send })
      expect((await algorand.asset.getAccountInformation(owner.addr, tka)).balance).toBe(ownerBefore.balance + sellTax + buyTax)
      await assertEscrowIdentity(algorand, dex, poolId)
    })

    test('untilRound sunset: no tax from untilRound on; close refunds the accrual and the box MBR', async () => {
      const until = (await lastRound()) + 30n
      const t: Tax = { owner: owner.addr.toString(), quote: 0n, buy: 200n, sell: 0n, until }
      const { poolId } = await hookedPool([taxInstall(t)], 30n, { maxHookFeeBps: 200n })
      await addLiquidity(trader, poolId, 20_000_000n, 20_000_000n)

      const taxedBuy = await quoteAndSwap(trader, poolId, 0n, 1_000_000n)
      expect(taxedBuy.round).toBeLessThan(until)
      const accrued = (await tax.getConfig({ args: { poolId } })).accrued
      expect(accrued).toBe(20_000n)
      await expectContractError(tax.send.close({ sender: owner.addr, signer: owner.signer, args: { poolId }, ...send }), 'errLxsn')

      await nextTxnAt(until)
      const pool = await dex.getPool({ args: { poolId } })
      const free = await quoteAndSwap(trader, poolId, 0n, 1_000_000n)
      expect(free.round).toBeGreaterThanOrEqual(until)
      expect(free.out).toBe(cpOut(1_000_000n, 30n, pool.reserveA, pool.reserveB))
      expect((await tax.getConfig({ args: { poolId } })).accrued).toBe(accrued)

      await expectContractError(tax.send.close({ sender: trader.addr, args: { poolId }, ...send }), 'errLxow')
      const ownerBefore = (await algorand.account.getInformation(owner.addr)).balance.microAlgo
      await tax.send.close({ sender: owner.addr, signer: owner.signer, args: { poolId }, ...send })
      const ownerAfter = (await algorand.account.getInformation(owner.addr)).balance.microAlgo
      // accrual + box MBR back, minus the owner's own fees
      expect(ownerAfter).toBeGreaterThan(ownerBefore + accrued + TAX_FUNDING - 20_000n)
      await expect(tax.getConfig({ args: { poolId } })).rejects.toThrow()
      // the pool keeps trading with the hook passing
      await quoteAndSwap(trader, poolId, 0n, 500_000n)
    })

    test('F6 validation and Vault caps', async () => {
      const ok: Tax = { owner: owner.addr.toString(), quote: 0n, buy: 100n, sell: 100n }
      const raw = (initData: Uint8Array) =>
        hookInstall({ app: tax.appId, points: AFTER_INITIALIZE | BEFORE_SWAP | QUOTE | AFTER_SWAP, perms: HOOK_FEE | HOOK_FEE_OUT, funding: TAX_FUNDING, initData })
      await expectContractError(hookedPool([raw(new Uint8Array(63))]), 'errLxdt')
      for (const bad of [
        { ...ok, quote: tkb }, // not in the ALGO/TKA pool
        { ...ok, buy: 501n },
        { ...ok, sell: 501n },
        { ...ok, owner: ALGORAND_ZERO_ADDRESS_STRING },
        { ...ok, until: 1n },
      ]) {
        await expectContractError(hookedPool([raw(encodeTax(bad))]), 'errLxcf')
      }
      // AUD-C15: a tax above the pool's maxHookFeeBps is refused when the pool is created (it used to
      // create the pool and fail every taxed swap with errPdhf)
      await expectContractError(hookedPool([taxInstall({ ...ok, buy: 300n })], 30n, { maxHookFeeBps: 200n }), 'errPdhf')
      await expectContractError(hookedPool([taxInstall({ ...ok, sell: 300n })], 30n, { maxHookFeeBps: 200n }), 'errPdhf')
    })

    test('AUD-C15 a pool cannot install the hook with a tax it has no permission or no room for', async () => {
      const install = (t: Tax, perms: bigint, points = AFTER_INITIALIZE | BEFORE_SWAP | QUOTE | AFTER_SWAP) =>
        hookInstall({ app: tax.appId, points, perms, funding: TAX_FUNDING, initData: encodeTax(t) })
      const who = owner.addr.toString()
      const sellOnly: Tax = { owner: who, quote: 0n, buy: 0n, sell: 300n }
      const buyOnly: Tax = { owner: who, quote: 0n, buy: 300n, sell: 0n }
      const both: Tax = { owner: who, quote: 0n, buy: 300n, sell: 300n }

      // The honeypot shape: a sell tax without HookFeeOut. Buys would work and every sell and sell
      // quote would revert, so the Vault refuses the pool.
      await expectContractError(hookedPool([install(sellOnly, 0n)]), 'errPdhm')
      await expectContractError(hookedPool([install(sellOnly, HOOK_FEE)]), 'errPdhm')
      await expectContractError(hookedPool([install(both, HOOK_FEE)]), 'errPdhm')
      // The same for a buy tax without HookFee (every buy would revert).
      await expectContractError(hookedPool([install(buyOnly, 0n)]), 'errPdhm')
      await expectContractError(hookedPool([install(both, HOOK_FEE_OUT)]), 'errPdhm')
      // A cap below either tax: every swap on that side would revert with errPdhf.
      await expectContractError(hookedPool([install(both, HOOK_FEE | HOOK_FEE_OUT)], 30n, { maxHookFeeBps: 299n }), 'errPdhf')
      await expectContractError(hookedPool([install(sellOnly, HOOK_FEE_OUT)], 30n, { maxHookFeeBps: 100n }), 'errPdhf')

      // The right install at the exact cap is accepted, and both directions trade and quote.
      const { poolId } = await hookedPool([install(both, HOOK_FEE | HOOK_FEE_OUT)], 30n, { maxHookFeeBps: 300n })
      await addLiquidity(trader, poolId, 20_000_000n, 20_000_000n)
      const buy = await quoteAndSwap(trader, poolId, 0n, 1_000_000n)
      expect(buy.quoted).toBe(buy.out)
      const sell = await quoteAndSwap(trader, poolId, tka, 1_000_000n)
      expect(sell.quoted).toBe(sell.out)
      expect((await tax.getConfig({ args: { poolId } })).accrued).toBeGreaterThan(0n)

      // A zero tax declares nothing, so an install with no fee permission and no taxes is still fine.
      const idle = await hookedPool([install({ owner: who, quote: 0n, buy: 0n, sell: 0n }, 0n, AFTER_INITIALIZE)], 30n, { maxHookFeeBps: 0n })
      expect((await tax.getConfig({ args: { poolId: idle.poolId } })).sellTaxBps).toBe(0n)
    })

    test('AUD-C15 a launch tax cannot share the fee cap with a fee hook that does not declare (SwapTaxHook)', async () => {
      const swapTax = (
        await algorand.client
          .getTypedAppFactory(SwapTaxHookFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
          .send.create.create({ args: { dex: dex.appId, owner: admin.addr.toString(), taxBps: 100n } })
      ).appClient
      await swapTax.appClient.fundAppAccount({ amount: microAlgo(1_000_000) })
      await swapTax.send.optIn({ args: { asset: tka }, ...send })
      await dex.send.setHookApproval({ args: { hook: swapTax.appId, perms: HOOK_FEE }, ...send })
      const flat = (perms = HOOK_FEE) => hookInstall({ app: swapTax.appId, points: BEFORE_SWAP | QUOTE, perms, funding: 0n, initData: new Uint8Array() })
      const who = owner.addr.toString()
      const sellOnly: Tax = { owner: who, quote: 0n, buy: 0n, sell: 500n }

      // SwapTaxHook takes a flat 1% of every swap input and declares nothing. Beside a 5% sell tax under
      // a 5% cap, buys traded (1%) and every sell and sell quote reverted with errPdhf (1% + 5%): the
      // same honeypot, built from two approved hooks that each fit the cap. Reproduced on the build
      // before this check. The Vault now refuses the pool, in either order and whatever the cap.
      await expectContractError(hookedPool([flat(), taxInstall(sellOnly)], 30n, { maxHookFeeBps: 500n }), 'errPdhm')
      await expectContractError(hookedPool([taxInstall(sellOnly), flat()], 30n, { maxHookFeeBps: 1_000n }), 'errPdhm')
      await expectContractError(hookedPool([flat(), taxInstall({ ...sellOnly, buy: 100n, sell: 0n })], 30n, { maxHookFeeBps: 1_000n }), 'errPdhm')

      // The swap tax on its own is untouched, and so is a launch tax of zero beside it (it declares
      // nothing and charges nothing): both directions trade and quote.
      for (const hooks of [[flat()], [flat(), taxInstall({ owner: who, quote: 0n, buy: 0n, sell: 0n })]]) {
        const { poolId } = await hookedPool(hooks, 30n, { maxHookFeeBps: 100n })
        await addLiquidity(trader, poolId, 20_000_000n, 20_000_000n)
        const buy = await quoteAndSwap(trader, poolId, 0n, 1_000_000n)
        expect(buy.quoted).toBe(buy.out)
        const sell = await quoteAndSwap(trader, poolId, tka, 1_000_000n)
        expect(sell.quoted).toBe(sell.out)
        expect(sell.out).toBeGreaterThan(0n)
      }
    })

    test('DEXEXT-1 a direct install at AfterInitialize|AfterSwap with perms 0 accrues no unpaid sell tax and cannot drain another pool', async () => {
      // the victim: a launch-shaped pool whose owner has unclaimed ALGO tax in the hook
      const victimTax: Tax = { owner: owner.addr.toString(), quote: 0n, buy: 300n, sell: 0n }
      const victim = await hookedPool([taxInstall(victimTax)], 30n, { maxHookFeeBps: 300n })
      await addLiquidity(trader, victim.poolId, 30_000_000n, 30_000_000n)
      await quoteAndSwap(trader, victim.poolId, 0n, 10_000_000n)
      const victimAccrued = (await tax.getConfig({ args: { poolId: victim.poolId } })).accrued
      expect(victimAccrued).toBe(300_000n)

      // the attacker: no BeforeSwap, so the Vault never asks the hook for a sell tax and never pays one.
      // (Since AUD-C15 the install must carry HookFeeOut for its declared sell tax, or createPool fails.)
      const attackerTax: Tax = { owner: plain.addr.toString(), quote: 0n, buy: 0n, sell: 500n }
      await expectContractError(
        hookedPool(
          [hookInstall({ app: tax.appId, points: AFTER_INITIALIZE | AFTER_SWAP, perms: 0n, funding: TAX_FUNDING, initData: encodeTax(attackerTax) })],
          0n,
        ),
        'errPdhm',
      )
      const attack = await hookedPool(
        [hookInstall({ app: tax.appId, points: AFTER_INITIALIZE | AFTER_SWAP, perms: HOOK_FEE_OUT, funding: TAX_FUNDING, initData: encodeTax(attackerTax) })],
        0n,
      )
      await addLiquidity(trader, attack.poolId, 50_000_000n, 50_000_000n)
      const hookBefore = await hookBalance(tax.appId)
      for (let round = 0; round < 2; round++) {
        const sell = await quoteAndSwap(trader, attack.poolId, tka, 20_000_000n)
        await quoteAndSwap(trader, attack.poolId, 0n, sell.out)
      }
      expect(await hookBalance(tax.appId)).toBe(hookBefore)
      expect((await tax.getConfig({ args: { poolId: attack.poolId } })).accrued).toBe(0n)

      const { return: stolen } = await tax.send.claim({ sender: plain.addr, signer: plain.signer, args: { poolId: attack.poolId }, ...send })
      expect(stolen).toBe(0n)
      expect(await hookBalance(tax.appId)).toBe(hookBefore)
      expect((await tax.getConfig({ args: { poolId: victim.poolId } })).accrued).toBe(victimAccrued)

      // the buy side has no such gap either: a buy tax without the HookFee permission is refused at
      // createPool (AUD-C15; before, the pool was created and every buy reverted in the Vault)
      await expectContractError(
        hookedPool(
          [hookInstall({ app: tax.appId, points: AFTER_INITIALIZE | BEFORE_SWAP | QUOTE, perms: 0n, funding: TAX_FUNDING, initData: encodeTax({ ...attackerTax, buy: 300n, sell: 0n }) })],
          0n,
        ),
        'errPdhm',
      )
    })

    test('DEXEXT-2 an underfunded install cannot lock accrued ALGO tax as MBR', async () => {
      // the hook still holds the DEXEXT-1 victim's unclaimed ALGO tax, more than one box plus one opt-in
      const { assetId: fresh } = await algorand.send.assetCreate({ sender: admin.addr, total: 10n ** 12n, decimals: 6, unitName: 'TKF' })
      const t: Tax = { owner: plain.addr.toString(), quote: fresh, buy: 100n, sell: 100n }
      const minBefore = (await algorand.account.getInformation(getApplicationAddress(tax.appId))).minBalance.microAlgo
      await expectContractError(hookedPool([taxInstall(t, 0n)], 30n, { maxHookFeeBps: 100n }, 0n, fresh), 'errLxfd')
      await expectContractError(hookedPool([taxInstall(t, TAX_FUNDING)], 30n, { maxHookFeeBps: 100n }, 0n, fresh), 'errLxfd')
      expect((await algorand.account.getInformation(getApplicationAddress(tax.appId))).minBalance.microAlgo).toBe(minBefore)

      // launchTaxFunding(asa) covers the growth exactly
      await hookedPool([taxInstall(t, TAX_FUNDING + OPT_IN_MBR + QUOTE_TOTAL_FUNDING)], 30n, { maxHookFeeBps: 100n }, 0n, fresh)
      const minAfter = (await algorand.account.getInformation(getApplicationAddress(tax.appId))).minBalance.microAlgo
      expect(minAfter - minBefore).toBe(TAX_FUNDING + OPT_IN_MBR + QUOTE_TOTAL_FUNDING)
    })

    test('DEXEXT-1 a claim never pays more than the hook holds for every booking of that asset (errLxsv)', async () => {
      const { assetId: clawed } = await algorand.send.assetCreate({ sender: admin.addr, total: 10n ** 12n, decimals: 6, unitName: 'TKC', clawback: admin.addr })
      await algorand.send.assetOptIn({ sender: trader.addr, assetId: clawed })
      await algorand.send.assetTransfer({ sender: admin.addr, receiver: trader.addr, assetId: clawed, amount: 10n ** 11n })
      const t: Tax = { owner: owner.addr.toString(), quote: clawed, buy: 100n, sell: 0n }
      const { poolId } = await hookedPool([taxInstall(t, TAX_FUNDING + OPT_IN_MBR + QUOTE_TOTAL_FUNDING)], 30n, { maxHookFeeBps: 100n }, 0n, clawed)
      await addLiquidity(trader, poolId, 20_000_000n, 20_000_000n)
      await quoteAndSwap(trader, poolId, clawed, 1_000_000n)
      expect((await tax.getConfig({ args: { poolId } })).accrued).toBe(10_000n)
      expect(await hookBalance(tax.appId, clawed)).toBe(10_000n)

      await algorand.send.assetTransfer({ sender: admin.addr, clawbackTarget: tax.appClient.appAddress, receiver: admin.addr, assetId: clawed, amount: 1n })
      await expectContractError(tax.send.claim({ sender: owner.addr, signer: owner.signer, args: { poolId }, ...send }), 'errLxsv')
      await algorand.send.assetTransfer({ sender: admin.addr, receiver: tax.appClient.appAddress, assetId: clawed, amount: 1n })
      await algorand.send.assetOptIn({ sender: owner.addr, signer: owner.signer, assetId: clawed })
      const { return: claimed } = await tax.send.claim({ sender: owner.addr, signer: owner.signer, args: { poolId }, ...send })
      expect(claimed).toBe(10_000n)
    })
  })

  // LaunchManager (B6, B9 case 10, acceptance 11) ----------------------------------------------

  describe('LaunchManager', () => {
    let manager: LaunchManagerClient
    let treasury: TransactionSignerAccount
    const LAUNCH_FEE = 5_000_000n
    const BOUNTY = 1_000_000n

    // a pump.fun-shaped launch scaled to LocalNet funds (akita-hooks B2): T = 1e9 tokens (6 dp)
    const T = 10n ** 15n
    const S = 793_100_000_000_000n
    const VB = 279_900_000_000_000n
    const VA = 100_000_000n // 100 ALGO
    const RA_MAX = (VA * S) / VB
    const G = (RA_MAX * 98n) / 100n

    const token = (overrides: Partial<TokenParams> = {}): TokenParams => ({
      assetName: 'Akita Launch',
      unitName: 'LAUNCH',
      url: 'https://akita.community',
      decimals: 6n,
      totalSupply: T,
      ...overrides,
    })
    const params = (overrides: Partial<LaunchParams> = {}): LaunchParams => ({
      curveSupply: S,
      virtualQuote: VA,
      virtualToken: VB,
      graduationThreshold: G,
      feeBps: 100n,
      snipe: { startFeeBps: 5_000n, endFeeBps: 100n, decayMode: EXPONENTIAL, decayRounds: 4n, startMode: START_CREATION, exempt: ALGORAND_ZERO_ADDRESS_STRING },
      buyTaxBps: 100n,
      sellTaxBps: 100n,
      taxUntilRound: 0n,
      gated: false,
      gatedInitData: NO_DATA,
      gatedFunding: 0n,
      devBuy: 0n,
      devVestSeconds: 0n,
      ...overrides,
    })

    /** LaunchEvent (ARC-28) decoded from the launch call's logs */
    const LAUNCH_EVENT_FIELDS = [
      'launchId', 'creator', 'asset', 'poolId', 'totalSupply', 'curveSupply', 'virtualQuote', 'virtualToken',
      'graduationThreshold', 'launchFee', 'bounty', 'devBuy', 'devTokens', 'devUnlock', 'devRewards', 'devDisbursement',
    ] as const
    const launchEventTypes = LAUNCH_EVENT_FIELDS.map((f) => (f === 'creator' ? 'address' : 'uint64'))
    const launchEventType = algosdk.ABIType.from(`(${launchEventTypes.join(',')})`)
    const launchEventSelector = createHash('sha512-256').update(`LaunchEvent(${launchEventTypes.join(',')})`).digest().subarray(0, 4)
    const launchEvent = (confirmation: Pending) => {
      const logs = (confirmation.logs ?? []).filter((l) => Buffer.from(l.subarray(0, 4)).equals(launchEventSelector))
      expect(logs).toHaveLength(1)
      const values = launchEventType.decode(logs[0].subarray(4)) as (bigint | string)[]
      return Object.fromEntries(LAUNCH_EVENT_FIELDS.map((f, i) => [f, values[i]])) as Record<(typeof LAUNCH_EVENT_FIELDS)[number], bigint> & { creator: string }
    }

    /** phase 1: mint the fair-launch ASA; returns the launchId */
    const createToken = async (t = token(), sender = trader) => {
      const { return: launchId } = await manager.send.createToken({
        sender: sender.addr,
        signer: sender.signer,
        args: { payment: algorand.createTransaction.payment({ sender: sender.addr, receiver: manager.appAddress, amount: microAlgo(1_000_000) }), t },
        ...send,
      })
      return launchId!
    }

    /**
     * phase 2 with LaunchManager.opUp carriers for resource references (two by default; a dev buy also
     * references the Rewards app, its boxes and holding); caps default to the configured fees
     */
    const launchPool = async (
      launchId: bigint,
      p: LaunchParams,
      sender = trader,
      payment = 20_000_000n,
      { maxLaunchFee = LAUNCH_FEE, maxBounty = BOUNTY, carriers = 2 }: { maxLaunchFee?: bigint; maxBounty?: bigint; carriers?: number } = {},
    ) => {
      const carrier = () => ({ sender: sender.addr, signer: sender.signer, args: [] as [], note: note(), maxFee: microAlgo(200_000) })
      const group = manager.newGroup()
      for (let i = 0; i < carriers; i++) group.opUp(carrier())
      const result = await group
        .launch({
          sender: sender.addr,
          signer: sender.signer,
          args: {
            payment: algorand.createTransaction.payment({ sender: sender.addr, receiver: manager.appAddress, amount: microAlgo(payment) }),
            launchId,
            p,
            maxLaunchFee,
            maxBounty,
          },
          maxFee: microAlgo(200_000),
        })
        .send(send)
      const fees = result.transactions.reduce((sum, t) => sum + t.fee, 0n)
      return { return: result.returns[carriers] as LaunchResult, confirmation: result.confirmations[result.confirmations.length - 1], fees }
    }

    /** both phases (two groups: the second references boxes keyed by the new asset id) */
    const launch = async (p: LaunchParams, t = token(), sender = trader) => launchPool(await createToken(t, sender), p, sender)

    beforeAll(async () => {
      treasury = await localnet.context.generateAccount({ initialFunds: (1).algo() })
      manager = (
        await algorand.client
          .getTypedAppFactory(LaunchManagerFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
          .send.create.create({ args: { vault: dex.appId, admin: admin.addr.toString(), antiSnipeHook: snipe.appId, launchTaxHook: tax.appId } })
      ).appClient
      await manager.appClient.fundAppAccount({ amount: microAlgo(100_000) })
      await manager.send.setFees({ args: { launchFee: LAUNCH_FEE, bounty: BOUNTY, treasury: treasury.addr.toString() }, ...send })
    })

    test('admin: only the admin sets fees and hooks', async () => {
      await expectContractError(manager.send.setFees({ sender: trader.addr, args: { launchFee: 0n, bounty: 0n, treasury: trader.addr.toString() }, ...send }), 'errLmad')
      await expectContractError(manager.send.setHooks({ sender: trader.addr, args: { antiSnipeHook: 0n, launchTaxHook: 0n, gatedHook: 0n, gatedFunding: 0n }, ...send }), 'errLmad')
      await expectContractError(manager.send.proposeAdmin({ sender: trader.addr, args: { admin: trader.addr.toString() }, ...send }), 'errLmad')
      expect(await manager.state.global.launchFee()).toBe(LAUNCH_FEE)
      expect(await manager.state.global.bounty()).toBe(BOUNTY)
    })

    test('(10) parameter validation: M ≥ S·vB/(S+vB), 0 < G ≤ rA_max, supply split, fee caps; creator-only, once', async () => {
      await expectContractError(createToken(token({ decimals: 20n })), 'errLmpr')
      await expectContractError(createToken(token({ totalSupply: 0n })), 'errLmpr')

      const launchId = await createToken()
      const record = await manager.getLaunch({ args: { launchId } })
      expect(record).toMatchObject({ creator: trader.addr.toString(), launched: false, settled: false })
      // the whole supply is held by the LaunchManager until phase 2
      expect((await algorand.asset.getAccountInformation(manager.appAddress, record.asset)).balance).toBe(T)

      for (const bad of [
        { graduationThreshold: RA_MAX + 1n },
        { graduationThreshold: 0n },
        { curveSupply: 0n },
        { curveSupply: T },
        { virtualQuote: 0n },
        { virtualToken: 0n },
        { feeBps: 1_001n },
        { snipe: { ...params().snipe, startFeeBps: 9_001n } },
      ] as Partial<LaunchParams>[]) {
        await expectContractError(launchPool(launchId, params(bad)), 'errLmpr')
      }
      // M = T − S one unit short of S·vB/(S+vB)
      const minReserve = (S * VB + (S + VB) - 1n) / (S + VB)
      const short = await createToken(token({ totalSupply: S + minReserve - 1n }))
      await expectContractError(launchPool(short, params()), 'errLmpr')

      // only the token's creator launches it
      await expectContractError(launchPool(launchId, params(), owner, 1_000_000n), 'errLmcr')
      await expectContractError(launchPool(launchId + 1_000n, params()), 'errLmnf')
      // a gated launch needs the DAO to have configured the GatedFeeHook
      await expectContractError(launchPool(launchId, params({ gated: true })), 'errLmhk')
      // the payment must go to the LaunchManager
      await expectContractError(
        manager.send.createToken({
          sender: trader.addr,
          args: { payment: algorand.createTransaction.payment({ sender: trader.addr, receiver: dex.appAddress, amount: microAlgo(1_000_000) }), t: token() },
          ...send,
        }),
        'errLmpy',
      )
      // graduate needs a launched pool
      await expectContractError(manager.send.graduate({ sender: owner.addr, signer: owner.signer, args: { launchId }, ...send }), 'errLmnf')
    })

    test('(10) launch: fair-launch ASA, launch pool, hook stack via F6, locked supply, DAO fee, bounty, refund', async () => {
      const PAYMENT = 20_000_000n
      const pending = await createToken()
      const treasuryBefore = (await algorand.account.getInformation(treasury.addr)).balance.microAlgo
      const managerBefore = await algorand.account.getInformation(manager.appAddress)
      const payerBefore = (await algorand.account.getInformation(trader.addr)).balance.microAlgo
      const sent = await launchPool(pending, params(), trader, PAYMENT)
      const { launchId, asset, poolId } = sent.return!

      // fair-launch ASA: whole supply, no admin keys
      const info = await algorand.asset.getById(asset)
      expect(info.total).toBe(T)
      expect(info.decimals).toBe(6)
      for (const key of ['manager', 'reserve', 'freeze', 'clawback'] as const) expect(info[key]).toBeUndefined()

      // the launch pool: ALGO/token, bonding, S on the curve, M locked, LP locked in the Vault
      const pool = await dex.getPool({ args: { poolId } })
      expect([pool.assetA, pool.assetB, pool.quoteIsA]).toEqual([0n, asset, true])
      expect([pool.virtualA, pool.virtualB, pool.graduationThreshold]).toEqual([VA, VB, G])
      expect([pool.reserveA, pool.reserveB, pool.lockedB]).toEqual([0n, S, T - S])
      expect(pool.lpSupply).toBe(pool.lockedLp)
      expect(pool.maxFeeBps).toBe(5_000n)
      expect(pool.maxHookFeeBps).toBe(100n)
      expect(pool.creator).toBe(manager.appAddress.toString())
      expect(await algorand.asset.getAccountInformation(manager.appAddress, asset).then((a) => a.balance)).toBe(0n)
      await assertEscrowIdentity(algorand, dex, poolId)

      // hook stack [AntiSnipe, LaunchTax] configured through F6
      const hooks = await dex.getPoolHooks({ args: { poolId } })
      expect(hooks.map((h) => h[0])).toEqual([snipe.appId, tax.appId])
      expect((await snipe.getConfig({ args: { poolId } })).exempt).toBe(manager.appAddress.toString())
      expect(await tax.getConfig({ args: { poolId } })).toMatchObject({ owner: trader.addr.toString(), quoteAsset: 0n, buyTaxBps: 100n, sellTaxBps: 100n })

      // DAO fee to the treasury, the bounty held, everything else refunded
      expect((await algorand.account.getInformation(treasury.addr)).balance.microAlgo).toBe(treasuryBefore + LAUNCH_FEE)
      const managerAfter = await algorand.account.getInformation(manager.appAddress)
      // the manager keeps exactly the bounty (the record box is rewritten at the same size)
      expect(managerAfter.balance.microAlgo - managerBefore.balance.microAlgo).toBe(BOUNTY)
      expect(managerAfter.minBalance.microAlgo).toBe(managerBefore.minBalance.microAlgo)
      // the Vault's createPool cost: what the manager forwarded minus what the Vault refunded to it
      const managerAddress = manager.appAddress.toString()
      const forwarded = innerPayments(sent.confirmation, managerAddress, dex.appAddress.toString())
      expect(forwarded).toHaveLength(1)
      const vaultRefund = innerPayments(sent.confirmation, dex.appAddress.toString(), managerAddress).reduce((a, b) => a + b, 0n)
      const vaultCost = forwarded[0] - vaultRefund
      expect(vaultCost).toBeGreaterThan(0n)
      // the payer gets back everything above fee + bounty + Vault cost, and pays exactly that plus txn fees
      expect(innerPayments(sent.confirmation, managerAddress, trader.addr.toString())).toEqual([PAYMENT - LAUNCH_FEE - BOUNTY - vaultCost])
      const payerAfter = (await algorand.account.getInformation(trader.addr)).balance.microAlgo
      expect(payerBefore - payerAfter).toBe(LAUNCH_FEE + BOUNTY + vaultCost + sent.fees)
      expect(await manager.getLaunch({ args: { launchId } })).toEqual({
        creator: trader.addr.toString(),
        asset,
        poolId,
        bounty: BOUNTY,
        launched: true,
        settled: false,
        devTokens: 0n,
        devUnlock: 0n,
        devRewards: 0n,
        devDisbursement: 0n,
      })
      // the event discloses the launch; without a dev buy its dev fields are 0
      expect(launchEvent(sent.confirmation)).toMatchObject({
        launchId,
        creator: trader.addr.toString(),
        asset,
        poolId,
        totalSupply: T,
        curveSupply: S,
        launchFee: LAUNCH_FEE,
        bounty: BOUNTY,
        devBuy: 0n,
        devTokens: 0n,
        devUnlock: 0n,
        devRewards: 0n,
        devDisbursement: 0n,
      })
      // once only
      await expectContractError(launchPool(launchId, params()), 'errLmln')
    })

    test('(11) lifecycle: anti-snipe decay, taxes, threshold, graduate with bounty, outside LP, plain CP', async () => {
      const sent = await launch(params())
      const { launchId, asset, poolId } = sent.return!
      const r0 = sent.confirmation.confirmedRound!
      await algorand.send.assetOptIn({ sender: trader.addr, assetId: asset })
      const p = params()
      const s: Snipe = { start: 5_000n, end: 100n, mode: EXPONENTIAL, rounds: 4n, startMode: START_CREATION }
      const taxBalance = await hookBalance(tax.appId)

      // r0: the clock started at the launch (createPool) round. LocalNet seals one block per group and
      // the escrow's app id is unknown before the launch, so no swap can share r0: feeAt prices it (the
      // live r0 swap is covered on a native pool by the FirstLiquidity test).
      expect((await snipe.getConfig({ args: { poolId } })).startRound).toBe(r0)
      expect(await snipe.feeAt({ args: { poolId, round: r0 } })).toBe(5_000n)

      // anti-snipe decay on buys at r4, r8, r40 on effective reserves; the buy tax accrues
      let accrued = 0n
      for (const [e, expected] of [[4n, 2_550n], [8n, 1_325n], [40n, 104n]] as const) {
        expect(snipeFee(s, e)).toBe(expected)
        expect(await snipe.feeAt({ args: { poolId, round: r0 + e } })).toBe(expected)
        await nextTxnAt(r0 + e)
        const pool = await dex.getPool({ args: { poolId } })
        const amount = 1_000_000n
        const buyTax = (amount * p.buyTaxBps) / 10_000n
        const { out, quoted, round } = await quoteAndSwap(trader, poolId, 0n, amount)
        expect(round).toBeGreaterThanOrEqual(r0 + e)
        if (round !== r0 + e) console.warn(`[WP5b] shared LocalNet: lifecycle swap for e=${e} landed at e=${round - r0}`)
        const fee = max(snipeFee(s, round - r0), p.feeBps)
        expect(out).toBe(cpOut(amount - buyTax, fee, pool.reserveA + pool.virtualA, pool.reserveB + pool.virtualB))
        expect(quoted).toBe(out)
        accrued += buyTax
      }
      // a sell pays the tax in ALGO (HookFeeOut)
      const sellPool = await dex.getPool({ args: { poolId } })
      const sold = 1_000_000_000n
      const sell = await quoteAndSwap(trader, poolId, asset, sold)
      const sellFee = max(snipeFee(s, sell.round - r0), p.feeBps)
      const gross = cpOut(sold, sellFee, sellPool.reserveB + sellPool.virtualB, sellPool.reserveA + sellPool.virtualA)
      expect(sell.out).toBe(gross - (gross * p.sellTaxBps) / 10_000n)
      expect(sell.quoted).toBe(sell.out)
      accrued += (gross * p.sellTaxBps) / 10_000n
      expect((await tax.getConfig({ args: { poolId } })).accrued).toBe(accrued)
      expect(await hookBalance(tax.appId)).toBe(taxBalance + accrued)
      await assertEscrowIdentity(algorand, dex, poolId)

      // graduation is refused below the threshold, through the LaunchManager and directly
      await expectContractError(manager.send.graduate({ sender: owner.addr, signer: owner.signer, args: { launchId }, ...send }), 'errPdgr')
      await expectContractError(dex.send.graduate({ sender: owner.addr, signer: owner.signer, args: { poolId }, ...send }), 'errPdgr')

      // cross the threshold (the buy tax comes off the input before it reaches the reserve)
      const pool = await dex.getPool({ args: { poolId } })
      const needed = G - pool.reserveA
      const buyIn = (needed * 10_000n) / 9_700n + 1_000_000n
      const crossing = await quoteAndSwap(trader, poolId, 0n, buyIn)
      accrued += (buyIn * p.buyTaxBps) / 10_000n
      expect(crossing.quoted).toBe(crossing.out)
      expect((await dex.getPool({ args: { poolId } })).reserveA).toBeGreaterThanOrEqual(G)

      // a keeper graduates through the LaunchManager and earns the bounty
      const keeperBefore = (await algorand.account.getInformation(owner.addr)).balance.microAlgo
      const managerBefore = (await algorand.account.getInformation(manager.appAddress)).balance.microAlgo
      await manager.send.graduate({ sender: owner.addr, signer: owner.signer, args: { launchId }, ...send })
      const keeperAfter = (await algorand.account.getInformation(owner.addr)).balance.microAlgo
      expect(keeperAfter).toBeGreaterThan(keeperBefore + BOUNTY - 20_000n)
      expect((await algorand.account.getInformation(manager.appAddress)).balance.microAlgo).toBe(managerBefore - BOUNTY)
      expect(await manager.getLaunch({ args: { launchId } })).toMatchObject({ settled: true, bounty: 0n })
      await expectContractError(manager.send.graduate({ sender: owner.addr, signer: owner.signer, args: { launchId }, ...send }), 'errLmst')

      const graduated = await dex.getPool({ args: { poolId } })
      expect([graduated.virtualA, graduated.virtualB]).toEqual([0n, 0n])
      expect(graduated.lpSupply).toBe(graduated.lockedLp)
      await assertEscrowIdentity(algorand, dex, poolId)

      // an outside LP (not the creator) adds pro-rata against lpSupply, which includes the locked LP
      const lp = await localnet.context.generateAccount({ initialFunds: (30).algo() })
      await algorand.send.assetOptIn({ sender: lp.addr, signer: lp.signer, assetId: asset })
      await algorand.send.assetOptIn({ sender: lp.addr, signer: lp.signer, assetId: graduated.lpAsset })
      const depositA = 10_000_000n
      const depositB = (depositA * graduated.reserveB) / graduated.reserveA + 1n
      await algorand.send.assetTransfer({ sender: trader.addr, signer: trader.signer, receiver: lp.addr, assetId: asset, amount: depositB })
      const minted = await addLiquidity(lp, poolId, depositA, depositB)
      const expectedLp = (depositA * graduated.lpSupply) / graduated.reserveA
      expect(minted).toBeGreaterThan(0n)
      expect(minted).toBeLessThanOrEqual(expectedLp)
      expect(minted).toBeGreaterThanOrEqual(expectedLp - 1n)
      expect((await algorand.asset.getAccountInformation(lp.addr, graduated.lpAsset)).balance).toBe(minted)

      // swaps are plain CP on real reserves (the anti-snipe tail and the tax still apply), both directions
      for (const [assetIn, amount] of [[0n, 2_000_000n], [asset, 50_000_000_000n]] as const) {
        const plainPool = await dex.getPool({ args: { poolId } })
        const { out, quoted, round } = await quoteAndSwap(trader, poolId, assetIn, amount)
        const fee = max(snipeFee(s, round - r0), p.feeBps)
        if (assetIn === 0n) {
          accrued += (amount * p.buyTaxBps) / 10_000n
          expect(out).toBe(cpOut(amount - (amount * p.buyTaxBps) / 10_000n, fee, plainPool.reserveA, plainPool.reserveB))
        } else {
          const grossOut = cpOut(amount, fee, plainPool.reserveB, plainPool.reserveA)
          accrued += (grossOut * p.sellTaxBps) / 10_000n
          expect(out).toBe(grossOut - (grossOut * p.sellTaxBps) / 10_000n)
        }
        expect(quoted).toBe(out)
      }
      await assertEscrowIdentity(algorand, dex, poolId)

      // the creator (the tax owner) claims every tax the launch accrued, in ALGO
      expect((await tax.getConfig({ args: { poolId } })).accrued).toBe(accrued)
      const { return: claimed } = await tax.send.claim({ sender: trader.addr, signer: trader.signer, args: { poolId }, ...send })
      expect(claimed).toBe(accrued)
      expect(await hookBalance(tax.appId)).toBe(taxBalance)
    })

    test('graduate after a direct Vault graduation pays the bounty to the caller, not back to the creator', async () => {
      const sent = await launch(params())
      const { launchId, asset, poolId } = sent.return!
      await algorand.send.assetOptIn({ sender: trader.addr, assetId: asset })
      const pool = await dex.getPool({ args: { poolId } })
      await quoteAndSwap(trader, poolId, 0n, ((G - pool.reserveA) * 10_000n) / 9_700n + 1_000_000n)
      await dex.send.graduate({ sender: admin.addr, args: { poolId }, ...send })

      // a creator who graduates directly first cannot take the bounty back
      const creatorBefore = (await algorand.account.getInformation(trader.addr)).balance.microAlgo
      const callerBefore = (await algorand.account.getInformation(owner.addr)).balance.microAlgo
      const result = await manager.send.graduate({ sender: owner.addr, signer: owner.signer, args: { launchId }, ...send })
      const callerAfter = (await algorand.account.getInformation(owner.addr)).balance.microAlgo
      expect((await algorand.account.getInformation(trader.addr)).balance.microAlgo).toBe(creatorBefore)
      expect(callerAfter - callerBefore).toBe(BOUNTY - result.transaction.fee)
      expect(await manager.getLaunch({ args: { launchId } })).toMatchObject({ settled: true, bounty: 0n })
    })

    const setFees = (launchFee: bigint, bounty: bigint) => manager.send.setFees({ args: { launchFee, bounty, treasury: treasury.addr.toString() }, ...send })
    /**
     * Buy on a (tax-free) launch pool until its real ALGO reserve reaches the graduation threshold. The LP
     * fee stays in the reserve, so each buy adds its input minus any protocol fee: a few steps converge
     * without overshooting rA_max (G is 98% of it).
     */
    const buyToThreshold = async (account: TransactionSignerAccount, poolId: bigint) => {
      for (let i = 0; i < 5; i++) {
        const pool = await dex.getPool({ args: { poolId } })
        if (pool.reserveA >= G) return
        await quoteAndSwap(account, poolId, 0n, G - pool.reserveA + 100_000n)
      }
      throw new Error('threshold not reached')
    }
    /** PluginDex.graduate's quote surplus (A16/A17) for a quote-is-A pool, mirrored from the contract */
    const graduationSurplus = (pool: Awaited<ReturnType<PluginDexClient['getPool']>>) => {
      const ceilDiv = (a: bigint, b: bigint) => (a + b - 1n) / b
      const eQ = pool.reserveA + pool.virtualA
      const eT = pool.reserveB + pool.virtualB
      const available = pool.reserveB + pool.lockedB
      const target = ceilDiv(pool.reserveA * eT, eQ)
      return target > available ? pool.reserveA - ceilDiv(available * eQ, eT) : 0n
    }
    const vaultTreasury = async () => algosdk.encodeAddress((await algorand.app.getGlobalState(dex.appId)).treasury.valueRaw as Uint8Array)

    test('(stabilize) launch caps: a setFees landing first cannot charge more than maxLaunchFee / maxBounty (errLmcp)', async () => {
      const pending = await createToken()
      try {
        await setFees(LAUNCH_FEE + 1n, BOUNTY)
        await expectContractError(launchPool(pending, params()), 'errLmcp')
        await setFees(LAUNCH_FEE, BOUNTY + 1n)
        await expectContractError(launchPool(pending, params()), 'errLmcp')
      } finally {
        await setFees(LAUNCH_FEE, BOUNTY)
      }
      // caps equal to the current values pass
      const { poolId } = (await launchPool(pending, params(), trader, 20_000_000n, { maxLaunchFee: LAUNCH_FEE, maxBounty: BOUNTY })).return!
      expect(poolId).toBeGreaterThan(0n)
    })

    test('(stabilize) graduate cannot be blocked by a closed creator: a sub-MBR bounty goes to the caller', async () => {
      const SMALL = 50_000n
      const creator = await localnet.context.generateAccount({ initialFunds: (30).algo() })
      await setFees(LAUNCH_FEE, SMALL)
      let launched: LaunchResult
      try {
        launched = (await launch(params({ buyTaxBps: 0n, sellTaxBps: 0n }), token(), creator)).return!
      } finally {
        await setFees(LAUNCH_FEE, BOUNTY)
      }
      const { launchId, asset, poolId } = launched
      const whale = await localnet.context.generateAccount({ initialFunds: (400).algo() })
      await algorand.send.assetOptIn({ sender: whale.addr, signer: whale.signer, assetId: asset })
      await buyToThreshold(whale, poolId)
      await dex.send.graduate({ sender: admin.addr, args: { poolId }, ...send })
      // the creator closes their account: a 50,000 µALGO payment to it would fail (balance below min)
      await algorand.send.payment({ sender: creator.addr, signer: creator.signer, receiver: admin.addr, amount: microAlgo(0), closeRemainderTo: admin.addr })
      expect((await algorand.account.getInformation(creator.addr)).balance.microAlgo).toBe(0n)

      const callerBefore = (await algorand.account.getInformation(owner.addr)).balance.microAlgo
      const result = await manager.send.graduate({ sender: owner.addr, signer: owner.signer, args: { launchId }, ...send })
      const callerAfter = (await algorand.account.getInformation(owner.addr)).balance.microAlgo
      expect(callerAfter - callerBefore).toBe(SMALL - result.transaction.fee)
      expect((await algorand.account.getInformation(creator.addr)).balance.microAlgo).toBe(0n)
      expect(await manager.getLaunch({ args: { launchId } })).toMatchObject({ settled: true, bounty: 0n })
    })

    test('(stabilize) A17: graduating through the LaunchManager sweeps the quote surplus to the Vault treasury', async () => {
      // M at its minimum and a constant 30% LP fee: a deep buy grows k, so at graduation d > M and the
      // quote reserve keeps a surplus the Vault books as protocol fees
      const minReserve = (S * VB + (S + VB) - 1n) / (S + VB)
      const whale = await localnet.context.generateAccount({ initialFunds: (700).algo() })
      const p = params({ snipe: { ...params().snipe, startFeeBps: 3_000n, endFeeBps: 1_000n, decayMode: LINEAR, decayRounds: 100_000n }, buyTaxBps: 0n, sellTaxBps: 0n })
      const { launchId, asset, poolId } = (await launch(p, token({ totalSupply: S + minReserve }))).return!
      await algorand.send.assetOptIn({ sender: whale.addr, signer: whale.signer, assetId: asset })
      await quoteAndSwap(whale, poolId, 0n, 400_000_000n)

      const before = await dex.getPool({ args: { poolId } })
      expect(before.reserveA).toBeGreaterThanOrEqual(G)
      const surplus = graduationSurplus(before)
      expect(surplus).toBeGreaterThan(0n)
      const vaultTreasuryAddress = await vaultTreasury()
      expect(vaultTreasuryAddress).not.toBe(owner.addr.toString())
      const treasuryBefore = (await algorand.account.getInformation(vaultTreasuryAddress)).balance.microAlgo

      await manager.send.graduate({ sender: owner.addr, signer: owner.signer, args: { launchId }, ...send })
      const after = await dex.getPool({ args: { poolId } })
      expect([after.virtualA, after.virtualB, after.protocolFeesA, after.protocolFeesB]).toEqual([0n, 0n, 0n, 0n])
      expect(after.reserveA).toBe(before.reserveA - surplus)
      expect((await algorand.account.getInformation(vaultTreasuryAddress)).balance.microAlgo).toBe(treasuryBefore + before.protocolFeesA + surplus)
      await assertEscrowIdentity(algorand, dex, poolId)
    })

    test('(stabilize) A17: a Vault treasury that cannot receive a side is skipped, graduate still settles', async () => {
      const fresh = await localnet.context.generateAccount({ initialFunds: (1).algo() })
      await dex.send.setProtocolFee({ args: { protocolFeeBps: 1_000n, treasury: fresh.addr.toString() }, ...send })
      try {
        const { launchId, asset, poolId } = (await launch(params({ buyTaxBps: 0n, sellTaxBps: 0n }))).return!
        const whale = await localnet.context.generateAccount({ initialFunds: (400).algo() })
        await algorand.send.assetOptIn({ sender: whale.addr, signer: whale.signer, assetId: asset })
        // a buy and a sell book protocol fees on both sides; the fresh treasury holds no opt-in for the token
        await quoteAndSwap(whale, poolId, 0n, 10_000_000n)
        await quoteAndSwap(whale, poolId, asset, 1_000_000_000_000n)
        await buyToThreshold(whale, poolId)
        const before = await dex.getPool({ args: { poolId } })
        expect(before.protocolFeesB).toBeGreaterThan(0n)
        expect(before.reserveA).toBeGreaterThanOrEqual(G)

        await manager.send.graduate({ sender: owner.addr, signer: owner.signer, args: { launchId }, ...send })
        expect(await manager.getLaunch({ args: { launchId } })).toMatchObject({ settled: true, bounty: 0n })
        const after = await dex.getPool({ args: { poolId } })
        expect([after.virtualA, after.virtualB]).toEqual([0n, 0n])
        // nothing swept: both sides stay booked for a later collectProtocolFees
        expect(after.protocolFeesA).toBe(before.protocolFeesA + graduationSurplus(before))
        expect(after.protocolFeesB).toBe(before.protocolFeesB)
        expect((await algorand.account.getInformation(fresh.addr)).balance.microAlgo).toBe(1_000_000n)
      } finally {
        await dex.send.setProtocolFee({ args: { protocolFeeBps: 0n, treasury: admin.addr.toString() }, ...send })
      }
    })

    test('(12) gated launch: LaunchManager installs [GatedFee, AntiSnipe, LaunchTax] via F6 and the order holds on the bonding curve', async () => {
      const gatedApp = (await gatedHook()).appId
      await manager.send.setHooks({ args: { antiSnipeHook: snipe.appId, launchTaxHook: tax.appId, gatedHook: gatedApp, gatedFunding: GATED_FUNDING }, ...send })
      try {
        const p = params({
          snipe: { ...params().snipe, endFeeBps: 20n },
          gated: true,
          gatedInitData: GATED_SCHEDULE,
          sellTaxBps: 0n,
        })
        const sent = await launch(p)
        const { asset, poolId } = sent.return!
        const r0 = sent.confirmation.confirmedRound!
        const s: Snipe = { start: 5_000n, end: 20n, mode: EXPONENTIAL, rounds: 4n, startMode: START_CREATION }

        const hooks = await dex.getPoolHooks({ args: { poolId } })
        expect(hooks.map((h) => h[0])).toEqual([gatedApp, snipe.appId, tax.appId])
        // a buy-only tax: HookFee only, no AfterSwap subscription
        // getPoolHooks rows are [app, version, points, perms, flags]
        expect([hooks[2][3], hooks[2][2] & AFTER_SWAP]).toEqual([HOOK_FEE, 0n])
        expect(await gated!.getSchedule({ args: { poolId } })).toEqual({ floorFeeBps: 20n, maxDiscountBps: 5_000n, impactMaxDiscountBps: 0n, tiers: [[0n, 0n, 0n, 5_000n]] })
        expect((await dex.getPool({ args: { poolId } })).maxFeeBps).toBe(5_000n)

        for (const account of [trader, plain]) await algorand.send.assetOptIn({ sender: account.addr, signer: account.signer, assetId: asset })
        // early: the pass holder and the other trader both pay the anti-snipe fee; at r40 the decay (24)
        // is under both running fees: the pass holder pays gated(100) = 50 and the other trader 100
        const amount = 1_000_000n
        const taxed = amount - (amount * p.buyTaxBps) / 10_000n
        for (const e of [2n, 40n]) {
          await nextTxnAt(r0 + e)
          for (const [account, running] of [[trader, gatedFee(p.feeBps)], [plain, p.feeBps]] as const) {
            const pool = await dex.getPool({ args: { poolId } })
            const { out, quoted, round } = await quoteAndSwap(account, poolId, 0n, amount)
            const decayed = snipeFee(s, round - r0)
            const fee = max(running, decayed)
            expect(out).toBe(cpOut(taxed, fee, pool.reserveA + pool.virtualA, pool.reserveB + pool.virtualB))
            expect(quoted).toBe(out)
            if (e === 2n) expect(fee).toBe(decayed)
            else expect(fee).toBe(running)
          }
        }
        expect((await tax.getConfig({ args: { poolId } })).accrued).toBe(4n * (amount - taxed))
        await assertEscrowIdentity(algorand, dex, poolId)
      } finally {
        await manager.send.setHooks({ args: { antiSnipeHook: snipe.appId, launchTaxHook: tax.appId, gatedHook: 0n, gatedFunding: 0n }, ...send })
      }
    })

    // Dev buy (akita-hooks B6 step 5, FINAL-SPEC §10 A36.1, OPEN-DECISIONS #20) -----------------------

    describe('dev buy', () => {
      let rewards: RewardsClient
      /** DAO cap: a dev buy may receive at most 5% of S */
      const DEV_MAX_BPS = 500n
      const MAX_DEV_TOKENS = (S * DEV_MAX_BPS) / 10_000n
      const VEST_MIN = 60n
      const VEST_MAX = 30n * 86_400n
      const VEST = 3_600n
      const DEV_BUY = 2_000_000n
      /** what Rewards v2 createInstantAsaDisbursement takes: MinDisbursementsMBR (with the reclaimTo field) + UserAllocationMBR */
      const DISBURSEMENT_MBR = 54_500n + 25_300n
      /** Rewards' opt-in to the new token and the disbursement MBR: its whole minimum-balance growth (STAKE-3) */
      const REWARDS_COST = OPT_IN_MBR + DISBURSEMENT_MBR
      /** room for fee + bounty + the Vault's createPool cost + the dev buy */
      const PAYMENT = 30_000_000n
      const DEV = { carriers: 3 }

      const setDevBuy = (rewardsApp: bigint, maxBps = DEV_MAX_BPS, minVestSeconds = VEST_MIN, maxVestSeconds = VEST_MAX, sender = admin) =>
        manager.send.setDevBuy({ sender: sender.addr, signer: sender.signer, args: { rewards: rewardsApp, maxBps, minVestSeconds, maxVestSeconds }, ...send })
      const devLaunch = async (creator: TransactionSignerAccount, p: LaunchParams, payment = PAYMENT) =>
        launchPool(await createToken(token(), creator), p, creator, payment, DEV)
      const claim = (creator: TransactionSignerAccount, id: bigint, asset: bigint) =>
        rewards.send.claimRewards({ sender: creator.addr, signer: creator.signer, args: { rewards: [[id, asset]] }, note: note(), ...send })
      const blockTimestamp = async (round: bigint) => (await algorand.client.algod.block(round).do()).block.header.timestamp
      const balance = async (address: string | algosdk.Address) => (await algorand.account.getInformation(address)).balance.microAlgo
      /** Rewards' ALGO above its minimum balance (what its ALGO claimants are owed, plus any slack) */
      const rewardsSpare = async () => {
        const info = await algorand.account.getInformation(rewards.appAddress)
        return info.balance.microAlgo - info.minBalance.microAlgo
      }
      const tokenBalance = async (address: string | algosdk.Address, asset: bigint) =>
        algorand.asset.getAccountInformation(address, asset).then((a) => a.balance).catch(() => 0n)

      beforeAll(async () => {
        rewards = await deployRewards({ fixture: localnet, sender: admin.addr, signer: admin.signer, args: {} })
        // exactly the account minimum balance, no slack: every opt-in, disbursement box and any top-up must be
        // paid by the launch payment, never by Rewards (Rewards v2 charges the exact box, so no top-up is sent)
        await rewards.appClient.fundAppAccount({ amount: microAlgo(100_000) })
        expect(await rewardsSpare()).toBe(0n)
        await setDevBuy(rewards.appId)
      })

      test('admin: only the admin sets the dev-buy policy; the cap never exceeds 10% of S; min ≤ max vesting', async () => {
        await expectContractError(setDevBuy(rewards.appId, DEV_MAX_BPS, VEST_MIN, VEST_MAX, trader), 'errLmad')
        await expectContractError(setDevBuy(rewards.appId, 1_001n), 'errLmpr')
        await expectContractError(setDevBuy(rewards.appId, DEV_MAX_BPS, VEST_MAX + 1n, VEST_MAX), 'errLmpr')
        expect(await manager.state.global.rewards()).toBe(rewards.appId)
        expect(await manager.state.global.devBuyMaxBps()).toBe(DEV_MAX_BPS)
        expect([await manager.state.global.devVestMin(), await manager.state.global.devVestMax()]).toEqual([VEST_MIN, VEST_MAX])
      })

      test('executes in the launch call at the launch price without the anti-snipe fee, locks the tokens in Rewards and discloses it', async () => {
        const creator = await localnet.context.generateAccount({ initialFunds: (60).algo() })
        const p = params({ devBuy: DEV_BUY, devVestSeconds: VEST })
        const pending = await createToken(token(), creator)
        const payerBefore = await balance(creator.addr)
        const managerBefore = await balance(manager.appAddress)
        const rewardsBefore = await algorand.account.getInformation(rewards.appAddress)
        const spareBefore = await rewardsSpare()
        const taxBefore = await hookBalance(tax.appId)
        const sent = await launchPool(pending, p, creator, PAYMENT, DEV)
        const { launchId, asset, poolId } = sent.return!
        const r0 = sent.confirmation.confirmedRound!

        // the buy ran at e == 0 (the clock started at createPool in this round), where anyone else pays 50%
        expect((await snipe.getConfig({ args: { poolId } })).startRound).toBe(r0)
        expect(await snipe.feeAt({ args: { poolId, round: r0 } })).toBe(5_000n)
        // the launch price on the seeded curve: effective reserves (vA, S + vB), the pool fee only; the
        // creator's own buy tax still comes off the input (it accrues to the creator as the tax owner)
        const buyTax = (DEV_BUY * p.buyTaxBps) / 10_000n
        const expected = cpOut(DEV_BUY - buyTax, p.feeBps, VA, S + VB)
        const sniped = cpOut(DEV_BUY - buyTax, 5_000n, VA, S + VB)
        expect(expected).toBeGreaterThan(sniped)
        expect(expected).toBeLessThanOrEqual(MAX_DEV_TOKENS)
        const record = await manager.getLaunch({ args: { launchId } })
        expect(record.devTokens).toBe(expected)
        expect((await tax.getConfig({ args: { poolId } })).accrued).toBe(buyTax)
        // the hook's balance grew by the F6 box funding and the accrued tax
        expect(await hookBalance(tax.appId)).toBe(taxBefore + TAX_FUNDING + buyTax)
        const pool = await dex.getPool({ args: { poolId } })
        expect(pool.reserveB).toBe(S - expected)
        expect(pool.reserveA + pool.protocolFeesA).toBe(DEV_BUY - buyTax)
        await assertEscrowIdentity(algorand, dex, poolId)

        // the tokens sit in Rewards, not with the creator or the manager; unlock = latestTimestamp + VEST
        expect(record.devUnlock).toBe((await blockTimestamp(r0 - 1n)) + VEST)
        expect(record.devDisbursement).toBeGreaterThan(0n)
        expect(record.devRewards).toBe(rewards.appId)
        expect(await tokenBalance(rewards.appAddress, asset)).toBe(expected)
        expect(await tokenBalance(manager.appAddress, asset)).toBe(0n)
        expect(await tokenBalance(creator.addr, asset)).toBe(0n)

        // disclosure: the event carries the buy, the tokens, the unlock time and the disbursement
        expect(launchEvent(sent.confirmation)).toMatchObject({
          launchId,
          creator: creator.addr.toString(),
          asset,
          poolId,
          devBuy: DEV_BUY,
          devTokens: expected,
          devUnlock: record.devUnlock,
          devRewards: rewards.appId,
          devDisbursement: record.devDisbursement,
        })

        // the creator's payment paid the dev buy and Rewards' whole minimum-balance growth (opt-in, the
        // disbursement MBR Rewards takes); the manager keeps the
        // bounty, and Rewards' spare ALGO (owed to its ALGO claimants) is untouched
        const managerAddress = manager.appAddress.toString()
        const forwarded = innerPayments(sent.confirmation, managerAddress, dex.appAddress.toString())
        const vaultRefund = innerPayments(sent.confirmation, dex.appAddress.toString(), managerAddress).reduce((a, b) => a + b, 0n)
        const vaultCost = forwarded[0] - vaultRefund
        expect(innerPayments(sent.confirmation, managerAddress, rewards.appAddress.toString())).toEqual([OPT_IN_MBR, DISBURSEMENT_MBR])
        const rewardsAfter = await algorand.account.getInformation(rewards.appAddress)
        expect(rewardsAfter.balance.microAlgo).toBe(rewardsBefore.balance.microAlgo + REWARDS_COST)
        expect(rewardsAfter.minBalance.microAlgo).toBe(rewardsBefore.minBalance.microAlgo + REWARDS_COST)
        expect(await rewardsSpare()).toBe(spareBefore)
        expect(await balance(manager.appAddress)).toBe(managerBefore + BOUNTY)
        expect(payerBefore - (await balance(creator.addr))).toBe(LAUNCH_FEE + BOUNTY + vaultCost + DEV_BUY + REWARDS_COST + sent.fees)

        // not claimable before the unlock (Rewards errDblk), by anyone else ever, then claimable after it
        await algorand.send.assetOptIn({ sender: creator.addr, signer: creator.signer, assetId: asset })
        await expectContractError(claim(creator, record.devDisbursement, asset), 'errDblk')
        await expectContractError(claim(trader, record.devDisbursement, asset), 'errDblk')
        await warp.timeWarp(VEST + 60n)
        await expectContractError(claim(trader, record.devDisbursement, asset), 'errAlne')
        await claim(creator, record.devDisbursement, asset)
        expect(await tokenBalance(creator.addr, asset)).toBe(expected)
        expect(await tokenBalance(rewards.appAddress, asset)).toBe(0n)
        // once
        await expectContractError(claim(creator, record.devDisbursement, asset), 'errDbfd')
      })

      test('FirstLiquidity anti-snipe: the clock starts at initializeLaunch, so the dev buy is still exempt', async () => {
        const creator = await localnet.context.generateAccount({ initialFunds: (60).algo() })
        const p = params({ snipe: { ...params().snipe, startMode: START_FIRST_LIQUIDITY }, buyTaxBps: 0n, devBuy: DEV_BUY, devVestSeconds: VEST_MIN })
        const sent = await devLaunch(creator, p)
        const { launchId, poolId } = sent.return!
        expect((await snipe.getConfig({ args: { poolId } })).startRound).toBe(sent.confirmation.confirmedRound!)
        expect((await manager.getLaunch({ args: { launchId } })).devTokens).toBe(cpOut(DEV_BUY, p.feeBps, VA, S + VB))
      })

      test('over the DAO cap, outside the vesting bounds, unconfigured or underpaid: rejected', async () => {
        const creator = await localnet.context.generateAccount({ initialFunds: (100).algo() })
        // 5 ALGO at the launch price buys ~6.2% of S, over the 5% cap
        const over = 5_000_000n
        expect(cpOut(over - (over * 100n) / 10_000n, 100n, VA, S + VB)).toBeGreaterThan(MAX_DEV_TOKENS)
        const pending = await createToken(token(), creator)
        await expectContractError(launchPool(pending, params({ devBuy: over, devVestSeconds: VEST }), creator, PAYMENT, DEV), 'errLmdv')
        // vesting bounds
        await expectContractError(launchPool(pending, params({ devBuy: DEV_BUY, devVestSeconds: VEST_MIN - 1n }), creator, PAYMENT, DEV), 'errLmdv')
        await expectContractError(launchPool(pending, params({ devBuy: DEV_BUY, devVestSeconds: VEST_MAX + 1n }), creator, PAYMENT, DEV), 'errLmdv')
        // the exact payment: fee, bounty, Vault cost, the dev buy and Rewards' minimum-balance growth
        const ok = await devLaunch(await localnet.context.generateAccount({ initialFunds: (60).algo() }), params({ devBuy: DEV_BUY, devVestSeconds: VEST }))
        const managerAddress = manager.appAddress.toString()
        const vaultCost =
          innerPayments(ok.confirmation, managerAddress, dex.appAddress.toString())[0] -
          innerPayments(ok.confirmation, dex.appAddress.toString(), managerAddress).reduce((a, b) => a + b, 0n)
        const exact = LAUNCH_FEE + BOUNTY + vaultCost + DEV_BUY + REWARDS_COST
        // one µALGO short: the up-front check rejects it
        await expectContractError(launchPool(pending, params({ devBuy: DEV_BUY, devVestSeconds: VEST }), creator, exact - 1n, DEV), 'errLmpy')
        // dev buys disabled by the DAO (cap 0, or no Rewards app)
        try {
          await setDevBuy(rewards.appId, 0n)
          await expectContractError(launchPool(pending, params({ devBuy: DEV_BUY, devVestSeconds: VEST }), creator, PAYMENT, DEV), 'errLmdv')
          await setDevBuy(0n)
          await expectContractError(launchPool(pending, params({ devBuy: DEV_BUY, devVestSeconds: VEST }), creator, PAYMENT, DEV), 'errLmdv')
        } finally {
          await setDevBuy(rewards.appId)
        }
        // the exact payment passes and refunds nothing
        const sent = await launchPool(pending, params({ devBuy: DEV_BUY, devVestSeconds: VEST }), creator, exact, DEV)
        expect(innerPayments(sent.confirmation, managerAddress, creator.addr.toString())).toEqual([])
        expect((await manager.getLaunch({ args: { launchId: sent.return!.launchId } })).devTokens).toBeLessThanOrEqual(MAX_DEV_TOKENS)
      })

      test('the cap is devBuyMaxBps of S (not T), inclusive: one bps under the tokens out fails, the next passes', async () => {
        const creator = await localnet.context.generateAccount({ initialFunds: (60).algo() })
        const p = params({ devBuy: DEV_BUY, devVestSeconds: VEST })
        const tokens = cpOut(DEV_BUY - (DEV_BUY * p.buyTaxBps) / 10_000n, p.feeBps, VA, S + VB)
        // the smallest cap (bps of S) that admits the dev buy
        const capOf = (supply: bigint, bps: bigint) => (supply * bps) / 10_000n
        let edge = 1n
        while (capOf(S, edge) < tokens) edge += 1n
        // the buy sits within one bps of the cap, and a T-based cap one bps lower would wrongly admit it
        expect(capOf(S, edge) - tokens).toBeLessThan(capOf(S, 1n))
        expect(capOf(T, edge - 1n)).toBeGreaterThanOrEqual(tokens)
        const pending = await createToken(token(), creator)
        try {
          await setDevBuy(rewards.appId, edge - 1n)
          await expectContractError(launchPool(pending, p, creator, PAYMENT, DEV), 'errLmdv')
          await setDevBuy(rewards.appId, edge)
          const sent = await launchPool(pending, p, creator, PAYMENT, DEV)
          expect((await manager.getLaunch({ args: { launchId: sent.return!.launchId } })).devTokens).toBe(tokens)
        } finally {
          await setDevBuy(rewards.appId)
        }
      })

      test('P2-DEX-04 a gated launch with a dev buy: the LaunchManager swaps with wallet = 0; GatedFee (no pass for it) keeps the pool fee, AntiSnipe exempts it', async () => {
        const gatedApp = (await gatedHook()).appId
        await manager.send.setHooks({ args: { antiSnipeHook: snipe.appId, launchTaxHook: tax.appId, gatedHook: gatedApp, gatedFunding: GATED_FUNDING }, ...send })
        try {
          const creator = await localnet.context.generateAccount({ initialFunds: (60).algo() })
          const p = params({ gated: true, gatedInitData: GATED_SCHEDULE, devBuy: DEV_BUY, devVestSeconds: VEST })
          const spareBefore = await rewardsSpare()
          const sent = await devLaunch(creator, p)
          const { launchId, poolId, asset } = sent.return!
          const hooks = await dex.getPoolHooks({ args: { poolId } })
          expect(hooks.map((h) => h[0])).toEqual([gatedApp, snipe.appId, tax.appId])
          // the launch price with the pool fee: neither discounted (no pass) nor anti-sniped (exempt at e == 0)
          const expected = cpOut(DEV_BUY - (DEV_BUY * p.buyTaxBps) / 10_000n, p.feeBps, VA, S + VB)
          const record = await manager.getLaunch({ args: { launchId } })
          expect(record).toMatchObject({ devTokens: expected, devRewards: rewards.appId })
          expect(launchEvent(sent.confirmation)).toMatchObject({ devBuy: DEV_BUY, devTokens: expected, devRewards: rewards.appId, devDisbursement: record.devDisbursement })
          expect(await tokenBalance(rewards.appAddress, asset)).toBe(expected)
          expect(await rewardsSpare()).toBe(spareBefore)
          await assertEscrowIdentity(algorand, dex, poolId)
          // principal-resolution spec §6.12: the dev buy is PluginDex.swap(..., wallet = 0) sent as the LaunchManager
          // itself. (The gated hook's DAO here is not a DAO: any non-zero hint would revert its BeforeSwap.)
          const swapSelector = dex.appClient.getABIMethod('swap').getSelector()
          const devSwaps = allInners(sent.confirmation).filter(
            (t) => t.txn.txn.applicationCall?.appIndex === dex.appId && Buffer.from(t.txn.txn.applicationCall.appArgs[0] ?? []).equals(Buffer.from(swapSelector)),
          )
          expect(devSwaps).toHaveLength(1)
          const swapArgs = devSwaps[0].txn.txn.applicationCall!.appArgs
          // ARC-4 puts no app arg for the txn argument: [selector, poolId, minAmountOut, recipient, data, wallet]
          expect(swapArgs).toHaveLength(6)
          expect(swapArgs[5]).toHaveLength(8)
          expect(Buffer.from(swapArgs[5]).readBigUInt64BE()).toBe(0n)
          expect(devSwaps[0].txn.txn.sender.toString()).toBe(manager.appAddress.toString())
        } finally {
          await manager.send.setHooks({ args: { antiSnipeHook: snipe.appId, launchTaxHook: tax.appId, gatedHook: 0n, gatedFunding: 0n }, ...send })
        }
      })

      test('the record keeps the Rewards app of each launch after setDevBuy repoints it', async () => {
        const other = await deployRewards({ fixture: localnet, sender: admin.addr, signer: admin.signer, args: {} })
        await other.appClient.fundAppAccount({ amount: microAlgo(100_000) })
        const creator = await localnet.context.generateAccount({ initialFunds: (60).algo() })
        const p = params({ devBuy: DEV_BUY, devVestSeconds: VEST })
        const first = await devLaunch(creator, p)
        try {
          await setDevBuy(other.appId)
          const second = await devLaunch(creator, p)
          expect(launchEvent(second.confirmation).devRewards).toBe(other.appId)
          expect((await manager.getLaunch({ args: { launchId: second.return!.launchId } })).devRewards).toBe(other.appId)
          expect(await tokenBalance(other.appAddress, second.return!.asset)).toBeGreaterThan(0n)
        } finally {
          await setDevBuy(rewards.appId)
        }
        // the earlier launch still names the Rewards app that holds its tokens
        expect((await manager.getLaunch({ args: { launchId: first.return!.launchId } })).devRewards).toBe(rewards.appId)
      })

      test('a pre-existing Rewards opt-in (Rewards.optIn is permissionless) does not block the dev buy', async () => {
        const creator = await localnet.context.generateAccount({ initialFunds: (60).algo() })
        const pending = await createToken(token(), creator)
        const { asset } = await manager.getLaunch({ args: { launchId: pending } })
        await rewards.send.optIn({
          sender: owner.addr,
          signer: owner.signer,
          args: { payment: algorand.createTransaction.payment({ sender: owner.addr, receiver: rewards.appAddress, amount: microAlgo(OPT_IN_MBR) }), asset },
          ...send,
        })
        const sent = await launchPool(pending, params({ devBuy: DEV_BUY, devVestSeconds: VEST }), creator, PAYMENT, DEV)
        // only the disbursement MBR is paid to Rewards
        expect(innerPayments(sent.confirmation, manager.appAddress.toString(), rewards.appAddress.toString())).toEqual([DISBURSEMENT_MBR])
        expect(await tokenBalance(rewards.appAddress, asset)).toBe((await manager.getLaunch({ args: { launchId: pending } })).devTokens)
      })

      test('a launch without a dev buy is unchanged: no Rewards interaction, the vesting fields are ignored', async () => {
        const creator = await localnet.context.generateAccount({ initialFunds: (60).algo() })
        const rewardsBefore = await balance(rewards.appAddress)
        const cursorBefore = (await algorand.app.getGlobalState(rewards.appId)).disbursement_id.value
        // devVestSeconds outside the bounds is irrelevant when devBuy = 0
        const sent = await devLaunch(creator, params({ devVestSeconds: 0n }), 20_000_000n)
        const { launchId } = sent.return!
        expect(await manager.getLaunch({ args: { launchId } })).toMatchObject({ devTokens: 0n, devUnlock: 0n, devRewards: 0n, devDisbursement: 0n })
        expect(launchEvent(sent.confirmation)).toMatchObject({ devBuy: 0n, devTokens: 0n, devUnlock: 0n, devRewards: 0n, devDisbursement: 0n })
        expect(await balance(rewards.appAddress)).toBe(rewardsBefore)
        expect((await algorand.app.getGlobalState(rewards.appId)).disbursement_id.value).toBe(cursorBefore)
        expect(innerPayments(sent.confirmation, manager.appAddress.toString(), rewards.appAddress.toString())).toEqual([])
      })

      // reclaimDevBuyMbr: the allocation MBR Rewards releases on the creator's claim goes back to the creator

      /** UserAllocationMBR: what Rewards.claimRewards releases as mbrCredits when it deletes the allocation box */
      const ALLOCATION_MBR = 25_300n
      const reclaim = (launchId: bigint, sender = trader) =>
        manager.send.reclaimDevBuyMbr({ sender: sender.addr, signer: sender.signer, args: { launchId }, note: note(), ...send })
      const credits = async (id: bigint) => {
        const d = (await rewards.state.box.disbursements.value(id))!
        return { available: d.mbrCredits, used: d.allocations * ALLOCATION_MBR }
      }

      test('reclaimDevBuyMbr: permissionless, pays the creator exactly the released allocation MBR once; other launches and Rewards untouched', async () => {
        const creatorA = await localnet.context.generateAccount({ initialFunds: (60).algo() })
        const creatorB = await localnet.context.generateAccount({ initialFunds: (60).algo() })
        const p = params({ devBuy: DEV_BUY, devVestSeconds: VEST_MIN })
        const a = (await devLaunch(creatorA, p)).return!
        const b = (await devLaunch(creatorB, p)).return!
        const recordA = await manager.getLaunch({ args: { launchId: a.launchId } })
        const recordB = await manager.getLaunch({ args: { launchId: b.launchId } })
        expect(await credits(recordA.devDisbursement)).toEqual({ available: 0n, used: ALLOCATION_MBR })

        // no dev buy, or no launch: rejected
        const plainLaunch = (await devLaunch(await localnet.context.generateAccount({ initialFunds: (60).algo() }), params(), 20_000_000n)).return!
        await expectContractError(reclaim(plainLaunch.launchId), 'errLmdv')
        await expectContractError(reclaim(10n ** 9n), 'errLmnf')

        // before the claim: nothing released, nothing paid (no revert)
        const creatorBefore = await balance(creatorA.addr)
        const managerBefore = await balance(manager.appAddress)
        const rewardsBefore = await balance(rewards.appAddress)
        const spareBefore = await rewardsSpare()
        const early = await reclaim(a.launchId)
        expect(early.return).toBe(0n)
        expect(innerPayments(early.confirmation, manager.appAddress.toString(), creatorA.addr.toString())).toEqual([])
        expect(await balance(creatorA.addr)).toBe(creatorBefore)
        expect(await balance(rewards.appAddress)).toBe(rewardsBefore)

        // the creator claims: Rewards deletes the allocation box and books its MBR as the disbursement's credits
        await algorand.send.assetOptIn({ sender: creatorA.addr, signer: creatorA.signer, assetId: a.asset })
        await warp.timeWarp(VEST_MIN + 60n)
        await claim(creatorA, recordA.devDisbursement, a.asset)
        expect(await credits(recordA.devDisbursement)).toEqual({ available: ALLOCATION_MBR, used: 0n })
        expect(await rewardsSpare()).toBe(spareBefore + ALLOCATION_MBR)
        const afterClaim = await balance(creatorA.addr)

        // anyone triggers it; the creator (who funded it) receives exactly the released credit
        const sent = await reclaim(a.launchId)
        expect(sent.return).toBe(ALLOCATION_MBR)
        expect(innerPayments(sent.confirmation, rewards.appAddress.toString(), manager.appAddress.toString())).toEqual([ALLOCATION_MBR])
        expect(innerPayments(sent.confirmation, manager.appAddress.toString(), creatorA.addr.toString())).toEqual([ALLOCATION_MBR])
        expect(await balance(creatorA.addr)).toBe(afterClaim + ALLOCATION_MBR)
        expect(await credits(recordA.devDisbursement)).toEqual({ available: 0n, used: 0n })
        // Rewards' spare ALGO (owed to its other claimants) is back where it was; the manager keeps nothing
        expect(await rewardsSpare()).toBe(spareBefore)
        expect(await balance(rewards.appAddress)).toBe(rewardsBefore - ALLOCATION_MBR)
        expect(await balance(manager.appAddress)).toBe(managerBefore)

        // a second call pays nothing
        const again = await reclaim(a.launchId)
        expect(again.return).toBe(0n)
        expect(innerPayments(again.confirmation, manager.appAddress.toString(), creatorA.addr.toString())).toEqual([])
        expect(await balance(creatorA.addr)).toBe(afterClaim + ALLOCATION_MBR)

        // the other launch is untouched: still unclaimed, nothing to reclaim, then claim and reclaim work
        expect(await credits(recordB.devDisbursement)).toEqual({ available: 0n, used: ALLOCATION_MBR })
        expect((await reclaim(b.launchId)).return).toBe(0n)
        await algorand.send.assetOptIn({ sender: creatorB.addr, signer: creatorB.signer, assetId: b.asset })
        await claim(creatorB, recordB.devDisbursement, b.asset)
        expect(await tokenBalance(creatorB.addr, b.asset)).toBe(recordB.devTokens)
        const creatorBBefore = await balance(creatorB.addr)
        expect((await reclaim(b.launchId, creatorB)).return).toBe(ALLOCATION_MBR)
        expect(await rewardsSpare()).toBe(spareBefore)
        // creatorB paid its own call's fees (outer + 3 inners)
        expect(await balance(creatorB.addr)).toBeGreaterThan(creatorBBefore)
      })

      test('reclaimDevBuyMbr: a closed creator account is not paid below the minimum balance; the credits wait in Rewards', async () => {
        const creator = await localnet.context.generateAccount({ initialFunds: (60).algo() })
        const { launchId, asset } = (await devLaunch(creator, params({ devBuy: DEV_BUY, devVestSeconds: VEST_MIN }))).return!
        const { devDisbursement } = await manager.getLaunch({ args: { launchId } })
        await algorand.send.assetOptIn({ sender: creator.addr, signer: creator.signer, assetId: asset })
        await warp.timeWarp(VEST_MIN + 60n)
        await claim(creator, devDisbursement, asset)
        // the creator closes its account (the tokens back to the ASA creator, the ALGO to the admin)
        await algorand.send.assetOptOut({ sender: creator.addr, signer: creator.signer, assetId: asset, creator: manager.appAddress, ensureZeroBalance: false })
        await algorand.send.payment({ sender: creator.addr, signer: creator.signer, receiver: admin.addr, amount: microAlgo(0), closeRemainderTo: admin.addr })
        expect(await balance(creator.addr)).toBe(0n)

        await expectContractError(reclaim(launchId), 'errLmpy')
        expect(await credits(devDisbursement)).toEqual({ available: ALLOCATION_MBR, used: 0n })
        // once the account exists again, the credit is paid
        await algorand.send.payment({ sender: admin.addr, signer: admin.signer, receiver: creator.addr, amount: microAlgo(100_000) })
        expect((await reclaim(launchId)).return).toBe(ALLOCATION_MBR)
        expect(await balance(creator.addr)).toBe(100_000n + ALLOCATION_MBR)
      })
    })
  })
})
