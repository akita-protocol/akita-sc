import { AlgorandClient, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { ALGORAND_ZERO_ADDRESS_STRING, getApplicationAddress } from 'algosdk'
import { beforeAll, describe, expect, test } from 'vitest'
import { PluginDexClient, PluginDexComposer } from '../artifacts/plugin-dex/PluginDexClient'
import { MockCurveFactory } from '../artifacts/plugin-dex/tests/MockCurveClient'
import { MockDexHookClient, MockDexHookFactory } from '../artifacts/plugin-dex/tests/MockDexHookClient'
import { MockLenderClient, MockLenderFactory } from '../artifacts/plugin-dex/tests/MockLenderClient'
import {
  APP_SPEC as ValuatorSpec,
  MockValuatorClient,
  MockValuatorFactory,
} from '../artifacts/plugin-dex/tests/MockValuatorClient'
import { expectContractError } from '../../tests/utils/errors'
import { TimeWarp } from '../../tests/utils/time'
import {
  addLiquidity,
  assertEscrowIdentity,
  createPool,
  deployVault,
  ExternalSlotConfig,
  externalSlot,
  holding,
  hookInstall,
  poolConfig,
  transferTxn,
} from '../../tests/fixtures/plugin-dex'

// hook points / permissions
const POKE = 256n
const CUSTODY = 1n
const EXTERNAL = 16n
// MockDexHook modes (FINAL-SPEC §4.13)
const MODE = { pass: 0n, deposit: 12n, recall: 13n, moveReceipt: 14n, sendTo: 15n }
// MockValuator modes
const VALUATOR = { lender: 0n, fixed: 1n, revert: 2n }

const RATE_SCALE = 1_000_000_000_000n
const DAY = 86_400n
/** 1 receipt unit = 1.25 underlying: deposits that are multiples of 5 (recalls of multiples of 4) are exact */
const RATE = 1_250_000_000_000n
const ZERO = ALGORAND_ZERO_ADDRESS_STRING
const NO_DATA = new Uint8Array()
const send = { maxFee: microAlgo(200_000), coverAppCallInnerTransactionFees: true, populateAppCallResources: true }

/** AVM rejection of an inner app call whose target's version reached rejectVersion */
const rejectVersionError = (version: bigint) => `app version (${version}) >= reject version (${version})`

type Slot = {
  hook: bigint
  valuator: bigint
  valuatorVersion: bigint
  side: bigint
  receipt: bigint
  capBps: bigint
  maxMarkupBpsPerDay: bigint
  maxMarkdownBpsPerDay: bigint
  units: bigint
  rate: bigint
  bookValue: bigint
  lastMark: bigint
}

/** §4.7 clip: the valuator rate clamped to [rate − down, rate + up] after `dt` seconds */
const clipRate = (slot: Slot, valuator: bigint, dt: bigint) => {
  const up = (((slot.rate * slot.maxMarkupBpsPerDay) / 10_000n) * dt) / DAY
  const down = (((slot.rate * slot.maxMarkdownBpsPerDay) / 10_000n) * dt) / DAY
  const low = slot.rate - (down < slot.rate ? down : slot.rate)
  const high = slot.rate + up
  return valuator < low ? low : valuator > high ? high : valuator
}

/** §10 A28: the booked value an in-kind exit of `paid` units takes out of a slot, ceil(bookValue·paid/units) */
const exitValue = (slot: Slot, paid: bigint) => (slot.bookValue * paid + slot.units - 1n) / slot.units

describe('PluginDex external positions', () => {
  const localnet = algorandFixture()
  let algorand: AlgorandClient
  let admin: TransactionSignerAccount
  let trader: TransactionSignerAccount
  let dex: PluginDexClient
  let tka: bigint

  // venues: lenderB lends TKA (pool side B), lenderA lends ALGO (pool side A)
  let lenderB: MockLenderClient
  let lenderA: MockLenderClient
  let receiptB: bigint
  let receiptA: bigint
  let valuatorB: MockValuatorClient
  let valuatorA: MockValuatorClient
  // ext: External hook of the TKA slot; extA: External hook of the ALGO slot; plain: custody only
  let ext: MockDexHookClient
  let extA: MockDexHookClient
  let plain: MockDexHookClient

  const deployLender = async (underlying: bigint, rate = RATE): Promise<[MockLenderClient, bigint]> => {
    const lender = (
      await algorand.client
        .getTypedAppFactory(MockLenderFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
        .send.create.create({ args: { underlying, rate } })
    ).appClient
    // MBR (receipt ASA, underlying opt-in) plus an ALGO float for redemptions after interest
    await lender.appClient.fundAppAccount({ amount: (underlying === 0n ? 50 : 1).algo() })
    const receipt = (await lender.send.bootstrap({ args: [], ...send })).return!
    if (underlying !== 0n) {
      await algorand.send.assetTransfer({ sender: admin.addr, receiver: lender.appAddress, assetId: underlying, amount: 10n ** 10n })
    }
    return [lender, receipt]
  }

  const deployValuator = async (lender: MockLenderClient, approve = true): Promise<MockValuatorClient> => {
    const valuator = (
      await algorand.client
        .getTypedAppFactory(MockValuatorFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
        .send.create.create({ args: { lender: lender.appId } })
    ).appClient
    if (approve) await dex.send.setValuatorApproval({ args: { valuator: valuator.appId, approved: true }, ...send })
    return valuator
  }

  const deployHook = async (
    perms: bigint,
    lender: MockLenderClient,
    underlying: bigint,
    receipt: bigint,
    extraAssets: bigint[] = [],
  ): Promise<MockDexHookClient> => {
    const hook = (
      await algorand.client
        .getTypedAppFactory(MockDexHookFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
        .send.create.create({ args: { dex: dex.appId } })
    ).appClient
    await hook.appClient.fundAppAccount({ amount: (5).algo() })
    await dex.send.setHookApproval({ args: { hook: hook.appId, perms }, ...send })
    for (const asset of [tka, receiptA, receiptB, ...extraAssets]) await hook.send.optIn({ args: { asset }, ...send })
    await hook.send.configureExternal({ args: { lender: lender.appId, underlying, receipt }, ...send })
    // a float of TKA for dust donations
    await algorand.send.assetTransfer({ sender: admin.addr, receiver: hook.appAddress, assetId: tka, amount: 1_000_000n })
    return hook
  }

  const configure = (hook: MockDexHookClient, mode: bigint, value = 0n, value2 = 0n, target = ZERO) =>
    hook.send.configure({ args: { mode, value, value2, target }, ...send })

  const pool = (poolId: bigint) => dex.getPool({ args: { poolId } })

  const slots = async (poolId: bigint): Promise<Slot[]> =>
    (await dex.getExternalSlots({ args: { poolId } })).map(
      ([hook, valuator, valuatorVersion, side, receipt, capBps, maxMarkupBpsPerDay, maxMarkdownBpsPerDay, units, rate, bookValue, lastMark]) => ({
        hook,
        valuator,
        valuatorVersion,
        side,
        receipt,
        capBps,
        maxMarkupBpsPerDay,
        maxMarkdownBpsPerDay,
        units,
        rate,
        bookValue,
        lastMark,
      }),
    )

  /**
   * A Vault group with `carriers` opUp() reference carriers first: calls that touch external slots read the
   * hook, venue, valuator and receipts on top of the p:/h:/e: boxes and the read quota of the program above
   * 8,192 B (FINAL-SPEC §10 A11), which overflows the 8 references of one call.
   */
  const group = (carriers = 2, feePayer = false) => {
    let composer = dex.newGroup() as PluginDexComposer<unknown[]>
    for (let c = 0; c < carriers; c++) {
      composer = composer.opUp({
        sender: trader.addr,
        args: [],
        note: `reference carrier ${c}`,
        // feePayer: the first carrier pays the whole group (fee pooling), for groups that mix in another app's txn
        ...(feePayer && c === 0 ? { staticFee: microAlgo(100_000) } : { maxFee: send.maxFee }),
      }) as PluginDexComposer<unknown[]>
    }
    return composer
  }
  const run = (composer: PluginDexComposer<unknown[]>) =>
    composer.send({ coverAppCallInnerTransactionFees: true, populateAppCallResources: true })
  /** groups with a foreign transaction (no maxFee to cover from): the first carrier pays every fee */
  const runPrepaid = (composer: PluginDexComposer<unknown[]>) =>
    composer.send({ coverAppCallInnerTransactionFees: false, populateAppCallResources: true })

  const pokeCall = (composer: PluginDexComposer<unknown[]>, poolId: bigint, hookIndex: bigint, note = 'poke') =>
    composer.poke({
      sender: trader.addr,
      args: { poolId, hookIndex, data: NO_DATA },
      note,
      maxFee: send.maxFee,
    }) as PluginDexComposer<unknown[]>
  const poke = (poolId: bigint, hookIndex: bigint) => run(pokeCall(group(), poolId, hookIndex))

  const revalueCall = (composer: PluginDexComposer<unknown[]>, poolId: bigint, note = 'revalue') =>
    composer.revalue({ sender: trader.addr, args: { poolId }, note, maxFee: send.maxFee }) as PluginDexComposer<
      unknown[]
    >
  const revalue = (poolId: bigint) => run(revalueCall(group(), poolId))

  /** [revalue, lender.setRate(rate), revalue] in one group: the second mark is in the same block (dt = 0) */
  const setRateInBlock = async (poolId: bigint, lender: MockLenderClient, rate: bigint) => {
    const setRate = await lender.createTransaction.setRate({ sender: admin.addr, args: { rate } })
    return runPrepaid(
      revalueCall(
        revalueCall(group(2, true), poolId, 'mark before').addTransaction(setRate.transactions[0], admin.signer),
        poolId,
        'mark after',
      ),
    )
  }

  const removeCall = async (poolId: bigint, lp: bigint, emergency = false) => {
    const info = await pool(poolId)
    const lpTransfer = algorand.createTransaction.assetTransfer({
      sender: trader.addr,
      receiver: dex.appAddress,
      assetId: info.lpAsset,
      amount: lp,
    })
    const composer = group()
    const call = emergency
      ? composer.emergencyRemoveLiquidity({
          sender: trader.addr,
          args: { lpTransfer, poolId, minAmountA: 0n, minAmountB: 0n },
          maxFee: send.maxFee,
        })
      : composer.removeLiquidity({
          sender: trader.addr,
          args: { lpTransfer, poolId, minAmountA: 0n, minAmountB: 0n, data: NO_DATA },
          maxFee: send.maxFee,
        })
    return run(call as PluginDexComposer<unknown[]>)
  }

  const swapCall = async (poolId: bigint, assetIn: bigint, amountIn: bigint) => {
    const info = await pool(poolId)
    return run(
      group(1).swap({
        sender: trader.addr,
        args: {
          input: transferTxn(algorand, trader, getApplicationAddress(info.escrow).toString(), assetIn, amountIn),
          poolId,
          minAmountOut: 0n,
          recipient: ZERO,
          data: NO_DATA,
          wallet: 0n,
        },
        maxFee: send.maxFee,
      }) as PluginDexComposer<unknown[]>,
    )
  }

  const slotFor = (hook: MockDexHookClient, valuator: MockValuatorClient, side: bigint, receipt: bigint, overrides = {}) =>
    externalSlot({ hook: hook.appId, valuator: valuator.appId, side, receipt, ...overrides })

  /** a liquid (ALGO, TKA) pool with POKE-only hooks and the given slots: 10 ALGO / 10 TKA from the trader */
  const externalPool = async (hooks: [MockDexHookClient, bigint][], externals: ExternalSlotConfig[]) => {
    const { poolId } = await createPool({
      algorand,
      dex,
      sender: admin,
      assetA: 0n,
      assetB: tka,
      config: poolConfig(30n),
      hooks: hooks.map(([hook, perms]) => hookInstall({ app: hook.appId, points: POKE, perms })),
      externals,
      optInLp: [trader],
    })
    await addLiquidity(algorand, dex, trader, poolId, 10_000_000n, 10_000_000n)
    await assertEscrowIdentity(algorand, dex, poolId)
    return poolId
  }

  const escrowOf = async (poolId: bigint) => getApplicationAddress((await pool(poolId)).escrow).toString()

  beforeAll(async () => {
    await localnet.newScope()
    algorand = localnet.algorand
    admin = localnet.context.testAccount
    trader = await localnet.context.generateAccount({ initialFunds: (1_000).algo() })
    const dispenser = await algorand.account.dispenserFromEnvironment()
    await algorand.account.ensureFunded(admin.addr, dispenser.addr, (2_000).algo())

    tka = (await algorand.send.assetCreate({ sender: admin.addr, total: 10n ** 15n, decimals: 6, unitName: 'TKA' }))
      .assetId
    await algorand.send.assetOptIn({ sender: trader.addr, assetId: tka })
    await algorand.send.assetTransfer({ sender: admin.addr, receiver: trader.addr, assetId: tka, amount: 10n ** 12n })

    dex = await deployVault({ algorand, sender: admin })
    // box MBR for approvals, pools and slots
    await dex.appClient.fundAppAccount({ amount: (5).algo() })

    ;[lenderB, receiptB] = await deployLender(tka)
    ;[lenderA, receiptA] = await deployLender(0n)
    valuatorB = await deployValuator(lenderB)
    valuatorA = await deployValuator(lenderA)
    ext = await deployHook(CUSTODY | EXTERNAL, lenderB, tka, receiptB)
    extA = await deployHook(CUSTODY | EXTERNAL, lenderA, 0n, receiptA)
    plain = await deployHook(CUSTODY, lenderB, tka, receiptB)
    // LPs receive receipts in kind
    for (const asset of [receiptA, receiptB]) await algorand.send.assetOptIn({ sender: trader.addr, assetId: asset })
  })

  describe('custody, in-kind exits and the emergency exit (cases 1-4, 9, 10)', () => {
    // hooks: 0 = ext (External, slot 0: TKA lender), 1 = plain (custody only), 2 = extA (External, slot 1: ALGO lender)
    let poolId: bigint

    beforeAll(async () => {
      poolId = await externalPool(
        [
          [ext, CUSTODY | EXTERNAL],
          [plain, CUSTODY],
          [extA, CUSTODY | EXTERNAL],
        ],
        [slotFor(ext, valuatorB, 1n, receiptB), slotFor(extA, valuatorA, 0n, receiptA)],
      )
    })

    test('createPool declares the slots: pinned valuators, the initial rate, receipts opted in by the escrow', async () => {
      const info = await pool(poolId)
      expect(info.externalSlots).toBe(2n)
      expect([info.externalA, info.externalB]).toEqual([0n, 0n])
      const [s0, s1] = await slots(poolId)
      expect(s0).toMatchObject({ hook: ext.appId, valuator: valuatorB.appId, valuatorVersion: 0n, side: 1n })
      expect(s0).toMatchObject({ receipt: receiptB, capBps: 5_000n, units: 0n, rate: RATE, bookValue: 0n })
      expect(s0.lastMark).toBe(info.createdAt)
      expect(s1).toMatchObject({ hook: extA.appId, valuator: valuatorA.appId, side: 0n, receipt: receiptA, rate: RATE })
      const escrow = await escrowOf(poolId)
      expect(await holding(algorand, escrow, receiptA)).toBe(0n)
      expect(await holding(algorand, escrow, receiptB)).toBe(0n)
    })

    test('(1) a deposit through the External hook is neutral: reserves unchanged, externalB == value', async () => {
      const before = await pool(poolId)
      await configure(ext, MODE.deposit, 4_000_000n)
      await poke(poolId, 0n)

      const after = await pool(poolId)
      const [s0] = await slots(poolId)
      expect([after.reserveA, after.reserveB]).toEqual([before.reserveA, before.reserveB])
      expect(s0).toMatchObject({ units: 3_200_000n, rate: RATE, bookValue: 4_000_000n })
      expect(after.externalB).toBe(4_000_000n)
      expect(await holding(algorand, await escrowOf(poolId), receiptB)).toBe(3_200_000n)
      await assertEscrowIdentity(algorand, dex, poolId)
    })

    test('(1) the floor-rounding dust of a deposit must be donated by the hook', async () => {
      // 1,000,001 TKA mints floor(1,000,001 / 1.25) = 800,000 units, worth 1,000,000: a 1-unit loss
      await configure(ext, MODE.deposit, 1_000_001n, 0n)
      await expectContractError(poke(poolId, 0n), 'errPdki')

      const before = await pool(poolId)
      await configure(ext, MODE.deposit, 1_000_001n, 1n)
      await poke(poolId, 0n)
      const after = await pool(poolId)
      expect([after.reserveA, after.reserveB]).toEqual([before.reserveA, before.reserveB])
      expect(after.externalB).toBe(5_000_000n)
      expect((await slots(poolId))[0].units).toBe(4_000_000n)
      await assertEscrowIdentity(algorand, dex, poolId)
    })

    test('(2) a recall reduces units, increases liquid and is neutral', async () => {
      const before = await pool(poolId)
      const escrow = await escrowOf(poolId)
      const liquidB = await holding(algorand, escrow, tka)
      await configure(ext, MODE.recall, 800_000n)
      await poke(poolId, 0n)

      const after = await pool(poolId)
      expect([after.reserveA, after.reserveB]).toEqual([before.reserveA, before.reserveB])
      expect(after.externalB).toBe(before.externalB - 1_000_000n)
      expect((await slots(poolId))[0]).toMatchObject({ units: 3_200_000n, bookValue: 4_000_000n })
      expect(await holding(algorand, escrow, tka)).toBe(liquidB + 1_000_000n)
      await assertEscrowIdentity(algorand, dex, poolId)
    })

    test('(3) only the slot\'s own External hook may change its receipt balance (errPdhm)', async () => {
      // a custody-only hook moves slot 0's receipt
      await configure(plain, MODE.moveReceipt, 1_000n, receiptB)
      await expectContractError(poke(poolId, 1n), 'errPdhm')

      // the ALGO slot's hook deposits (neutral), then slot 0's External hook moves slot 1's receipt
      const before = await pool(poolId)
      await configure(extA, MODE.deposit, 2_000_000n)
      await poke(poolId, 2n)
      const after = await pool(poolId)
      expect([after.reserveA, after.reserveB]).toEqual([before.reserveA, before.reserveB])
      expect(after.externalA).toBe(2_000_000n)
      expect((await slots(poolId))[1]).toMatchObject({ units: 1_600_000n, bookValue: 2_000_000n })
      await assertEscrowIdentity(algorand, dex, poolId)

      await configure(ext, MODE.moveReceipt, 1_000n, receiptA)
      await expectContractError(poke(poolId, 0n), 'errPdhm')
      // the slot's own hook taking its receipt without paying for it is a loss
      await configure(extA, MODE.moveReceipt, 1_000n, receiptA)
      await expectContractError(poke(poolId, 2n), 'errPdki')
      await configure(extA, MODE.pass)
      await configure(plain, MODE.pass)
    })

    test('(4) the External hook sending liquid funds to an EOA without a receipt fails (errPdki)', async () => {
      const eoa = algorand.account.random()
      await configure(ext, MODE.sendTo, 1_000_000n, 0n, eoa.addr.toString())
      await expectContractError(poke(poolId, 0n), 'errPdki')
      await configure(ext, MODE.sendTo, 1_000n, tka, trader.addr.toString())
      await expectContractError(poke(poolId, 0n), 'errPdki')
      await configure(ext, MODE.pass)
    })

    test('(2) underflow regression: a recall above the booked rate is a donation, and externals reach 0 exactly', async () => {
      // the lender rate rises 10% while the booked rate is frozen within the block: the recall returns
      // more underlying than the units were booked at, and the surplus is donated to the reserve
      const before = await pool(poolId)
      const [s0] = await slots(poolId)
      const raised = (RATE * 11n) / 10n
      await configure(ext, MODE.recall, s0.units)
      const setRate = await lenderB.createTransaction.setRate({ sender: admin.addr, args: { rate: raised } })
      await runPrepaid(
        pokeCall(revalueCall(group(2, true), poolId).addTransaction(setRate.transactions[0], admin.signer), poolId, 0n),
      )

      const after = await pool(poolId)
      const [s0After] = await slots(poolId)
      const returned = (s0.units * raised) / RATE_SCALE
      expect(s0After).toMatchObject({ units: 0n, bookValue: 0n, rate: RATE })
      expect(after.externalB).toBe(0n)
      expect(after.reserveB).toBe(before.reserveB + returned - s0.bookValue)
      expect(after.reserveA).toBe(before.reserveA)
      await assertEscrowIdentity(algorand, dex, poolId)

      // restore the lender rate and put a position back for the exit cases
      await lenderB.send.setRate({ args: { rate: RATE }, ...send })
      await configure(ext, MODE.deposit, 3_000_000n)
      await poke(poolId, 0n)
      await configure(ext, MODE.pass)
      expect((await slots(poolId))[0]).toMatchObject({ units: 2_400_000n, bookValue: 3_000_000n })
      await assertEscrowIdentity(algorand, dex, poolId)
    })

    test('(9) removeLiquidity pays receipts in kind pro-rata; units and bookValue fall pro-rata', async () => {
      const before = await pool(poolId)
      const [s0, s1] = await slots(poolId)
      const lp = 2_500_000n
      const S = before.lpSupply
      const liquidA = (lp * (before.reserveA - before.externalA)) / S
      const liquidB = (lp * (before.reserveB - before.externalB)) / S
      // §10 A28: the booked value that leaves is that of the units paid, rounded up (ceil(bookValue·paid/units))
      const units0 = (lp * s0.units) / S
      const value0 = exitValue(s0, units0)
      const units1 = (lp * s1.units) / S
      const value1 = exitValue(s1, units1)
      const traderB = await holding(algorand, trader.addr.toString(), tka)
      const traderR0 = await holding(algorand, trader.addr.toString(), receiptB)
      const traderR1 = await holding(algorand, trader.addr.toString(), receiptA)

      const result = await removeCall(poolId, lp)
      expect(result.returns.at(-1)).toEqual({ amountA: liquidA, amountB: liquidB })

      const after = await pool(poolId)
      const [a0, a1] = await slots(poolId)
      expect(a0).toMatchObject({ units: s0.units - units0, bookValue: s0.bookValue - value0 })
      expect(a1).toMatchObject({ units: s1.units - units1, bookValue: s1.bookValue - value1 })
      expect(after.reserveA).toBe(before.reserveA - liquidA - value1)
      expect(after.reserveB).toBe(before.reserveB - liquidB - value0)
      expect([after.externalA, after.externalB]).toEqual([a1.bookValue, a0.bookValue])
      expect(after.lpSupply).toBe(S - lp)
      expect(await holding(algorand, trader.addr.toString(), tka)).toBe(traderB + liquidB)
      expect(await holding(algorand, trader.addr.toString(), receiptB)).toBe(traderR0 + units0)
      expect(await holding(algorand, trader.addr.toString(), receiptA)).toBe(traderR1 + units1)
      // ExternalExitEvent (§10 A6): selector ‖ poolId ‖ slot ‖ receipt ‖ recipient ‖ units ‖ value
      const logs = (result.confirmations.at(-1)!.logs ?? []).filter((log) => log.length === 4 + 8 * 3 + 32 + 8 * 2)
      const exits = logs.map((log) => {
        const view = new DataView(log.buffer, log.byteOffset)
        return [view.getBigUint64(12), view.getBigUint64(20), view.getBigUint64(60), view.getBigUint64(68)]
      })
      expect(exits).toEqual([
        [0n, receiptB, units0, value0],
        [1n, receiptA, units1, value1],
      ])
      await assertEscrowIdentity(algorand, dex, poolId)
    })

    test('(10) emergencyRemoveLiquidity works with the valuator in revert mode', async () => {
      await valuatorB.send.configure({ args: { mode: VALUATOR.revert, value: 0n }, ...send })
      // the normal path re-marks every slot first, so a reverting valuator blocks it
      await expect(removeCall(poolId, 1_000_000n)).rejects.toThrow()
      await expectContractError(removeCall(poolId, 1_000_000n, true), 'errPdnp')

      await dex.send.setPoolPaused({ args: { poolId, paused: true }, ...send })
      const before = await pool(poolId)
      const [s0, s1] = await slots(poolId)
      const lp = 1_000_000n
      const traderR0 = await holding(algorand, trader.addr.toString(), receiptB)
      await removeCall(poolId, lp, true)

      const after = await pool(poolId)
      const [a0, a1] = await slots(poolId)
      const units0 = (lp * s0.units) / before.lpSupply
      expect(a0.units).toBe(s0.units - units0)
      expect(a1.units).toBe(s1.units - (lp * s1.units) / before.lpSupply)
      expect(a0.lastMark).toBe(s0.lastMark)
      expect(await holding(algorand, trader.addr.toString(), receiptB)).toBe(traderR0 + units0)
      expect(after.reserveB).toBe(
        before.reserveB - (lp * (before.reserveB - before.externalB)) / before.lpSupply - exitValue(s0, units0),
      )
      await assertEscrowIdentity(algorand, dex, poolId)

      await dex.send.setPoolPaused({ args: { poolId, paused: false }, ...send })
      await valuatorB.send.configure({ args: { mode: VALUATOR.lender, value: 0n }, ...send })
      await removeCall(poolId, 100_000n)
      await assertEscrowIdentity(algorand, dex, poolId)
    })

    test('budget: the Vault tops itself up around valuator calls; a swap never reads the slots box', async () => {
      type Inner = { txn: { txn: { type: string; applicationCall?: { appIndex?: bigint } } } }
      const measure = async (composer: PluginDexComposer<unknown[]>) => {
        const result = await composer.simulate({ allowUnnamedResources: true, skipSignatures: true })
        const txnGroup = result.simulateResponse.txnGroups[0]
        expect(txnGroup.failureMessage).toBeUndefined()
        const vault = txnGroup.txnResults.at(-1)!
        const inners = (vault.txnResult.innerTxns ?? []) as unknown as Inner[]
        const opUps = inners.filter((inner) => inner.txn.txn.type === 'appl' && !inner.txn.txn.applicationCall?.appIndex)
        // with group resource sharing, simulate reports the unnamed boxes at the group level
        const boxes = [...(vault.unnamedResourcesAccessed?.boxes ?? []), ...(txnGroup.unnamedResourcesAccessed?.boxes ?? [])]
          .filter((ref) => ref.name.length > 0)
          .map((ref) => String.fromCharCode(ref.name[0]))
        return { opcodes: Number(vault.appBudgetConsumed ?? 0), opUps: opUps.length, boxes }
      }
      const info = await pool(poolId)
      const escrow = getApplicationAddress(info.escrow).toString()

      await configure(ext, MODE.deposit, 500_000n)
      const deposit = await measure(pokeCall(group(2, true), poolId, 0n))
      await configure(ext, MODE.pass)
      const marks = await measure(revalueCall(group(2, true), poolId))
      const lpTransfer = algorand.createTransaction.assetTransfer({
        sender: trader.addr,
        receiver: dex.appAddress,
        assetId: info.lpAsset,
        amount: 100_000n,
      })
      const remove = await measure(
        group(2, true).removeLiquidity({
          sender: trader.addr,
          args: { lpTransfer, poolId, minAmountA: 0n, minAmountB: 0n, data: NO_DATA },
        }) as PluginDexComposer<unknown[]>,
      )
      const swap = await measure(
        group(1, true).swap({
          sender: trader.addr,
          args: {
            input: transferTxn(algorand, trader, escrow, 0n, 100_000n),
            poolId,
            minAmountOut: 0n,
            recipient: ZERO,
            data: NO_DATA,
            wallet: 0n,
          },
        }) as PluginDexComposer<unknown[]>,
      )
      console.log(
        `[budget] external pool (2 slots): poke deposit ${deposit.opcodes} opcodes/${deposit.opUps} op-ups, ` +
          `revalue ${marks.opcodes}/${marks.opUps}, removeLiquidity ${remove.opcodes}/${remove.opUps}, ` +
          `hookless swap ${swap.opcodes}/${swap.opUps} (boxes read: ${swap.boxes.join(',')})`,
      )
      expect(swap.opUps).toBe(0)
      expect(swap.opcodes).toBeLessThanOrEqual(700)
      expect(swap.boxes).not.toContain('e')
    })
  })

  describe('caps, clips, write-down and illiquid reserves (cases 5-8)', () => {
    let poolId: bigint
    let timeWarp: TimeWarp
    /** the largest clip, 10% per day each way: a warp of 8,640 s (10% of a day) allows a 1% move */
    const CLIP = 1_000n
    const WARP = 8_640n

    beforeAll(async () => {
      timeWarp = new TimeWarp(algorand)
      poolId = await externalPool(
        [[ext, CUSTODY | EXTERNAL]],
        [slotFor(ext, valuatorB, 1n, receiptB, { maxMarkupBpsPerDay: CLIP, maxMarkdownBpsPerDay: CLIP })],
      )
    })

    test('(5) a deposit above capBps of the side reserve fails (errPdec)', async () => {
      await configure(ext, MODE.deposit, 6_000_000n)
      await expectContractError(poke(poolId, 0n), 'errPdec')
      // 4,990,000 of a 10,000,000 reserve is 49.9% ≤ 50%
      await configure(ext, MODE.deposit, 4_990_000n)
      await poke(poolId, 0n)
      await configure(ext, MODE.pass)
      const info = await pool(poolId)
      expect(info.externalB).toBe(4_990_000n)
      expect((await slots(poolId))[0].units).toBe(3_992_000n)
      await assertEscrowIdentity(algorand, dex, poolId)
    })

    test('(6) the lender rate +10% in one block: revalue books 0; later it books at most the markup clip', async () => {
      const before = await pool(poolId)
      const [s0] = await slots(poolId)
      const raised = (RATE * 11n) / 10n
      await setRateInBlock(poolId, lenderB, raised)
      expect((await slots(poolId))[0]).toMatchObject({ rate: s0.rate, bookValue: s0.bookValue })
      expect((await pool(poolId)).reserveB).toBe(before.reserveB)

      const marked = (await slots(poolId))[0]
      await timeWarp.timeWarp(WARP)
      await revalue(poolId)
      const [s1] = await slots(poolId)
      const dt = s1.lastMark - marked.lastMark
      expect(dt).toBeGreaterThan(0n)
      const expected = clipRate(marked, raised, dt)
      expect(expected).toBeLessThan(raised)
      expect(s1.rate).toBe(expected)
      expect(s1.bookValue).toBe((s1.units * expected) / RATE_SCALE)
      const after = await pool(poolId)
      expect(after.reserveB).toBe(before.reserveB + s1.bookValue - s0.bookValue)
      expect(after.externalB).toBe(s1.bookValue)
      // (5) appreciation past the cap is still booked by revalue: the cap only binds when units grow
      expect(s1.bookValue * 10_000n).toBeGreaterThan(s1.capBps * after.reserveB)
      await assertEscrowIdentity(algorand, dex, poolId)
    })

    test('(6) markdowns: 0 within the block, then at most the markdown clip', async () => {
      const before = await pool(poolId)
      const [s0] = await slots(poolId)
      const lowered = (RATE * 7n) / 10n
      await setRateInBlock(poolId, lenderB, lowered)
      expect((await slots(poolId))[0]).toMatchObject({ rate: s0.rate, bookValue: s0.bookValue })

      const marked = (await slots(poolId))[0]
      await timeWarp.timeWarp(WARP)
      await revalue(poolId)
      const [s1] = await slots(poolId)
      const expected = clipRate(marked, lowered, s1.lastMark - marked.lastMark)
      expect(expected).toBeGreaterThan(lowered)
      expect(s1.rate).toBe(expected)
      expect(s1.rate).toBeLessThan(s0.rate)
      const after = await pool(poolId)
      expect(after.reserveB).toBe(before.reserveB - (s0.bookValue - s1.bookValue))
      expect(after.externalB).toBe(s1.bookValue)
      await assertEscrowIdentity(algorand, dex, poolId)
    })

    test('(7) writeDownExternal is admin-only on paused pools and sets rate = min(book, valuator)', async () => {
      await expectContractError(dex.send.writeDownExternal({ args: { poolId, slot: 0n }, ...send }), 'errPdnp')
      await dex.send.setPoolPaused({ args: { poolId, paused: true }, ...send })
      await expectContractError(
        dex.send.writeDownExternal({ sender: trader.addr, args: { poolId, slot: 0n }, ...send }),
        'errPdao',
      )
      await expectContractError(dex.send.writeDownExternal({ args: { poolId, slot: 1n }, ...send }), 'errPdex')

      // the valuator (lender rate 0.875) is below the book: written down with no clip
      const before = await pool(poolId)
      const [s0] = await slots(poolId)
      const lowered = (RATE * 7n) / 10n
      expect(s0.rate).toBeGreaterThan(lowered)
      await dex.send.writeDownExternal({ args: { poolId, slot: 0n }, ...send })
      const [s1] = await slots(poolId)
      const value = (s0.units * lowered) / RATE_SCALE
      expect(s1).toMatchObject({ rate: lowered, bookValue: value, units: s0.units })
      const after = await pool(poolId)
      expect(after.reserveB).toBe(before.reserveB - (s0.bookValue - value))
      expect(after.externalB).toBe(value)
      expect(after.reserveB - after.externalB).toBe(before.reserveB - before.externalB)
      await assertEscrowIdentity(algorand, dex, poolId)

      // a valuator above the book never writes the rate up
      await lenderB.send.setRate({ args: { rate: RATE * 2n }, ...send })
      await dex.send.writeDownExternal({ args: { poolId, slot: 0n }, ...send })
      expect((await slots(poolId))[0]).toMatchObject({ rate: lowered, bookValue: value })
      // an unavailable valuator cannot be used for a write-down
      await valuatorB.send.configure({ args: { mode: VALUATOR.fixed, value: 0n }, ...send })
      await expectContractError(dex.send.writeDownExternal({ args: { poolId, slot: 0n }, ...send }), 'errPdva')
      await valuatorB.send.configure({ args: { mode: VALUATOR.lender, value: 0n }, ...send })
      await lenderB.send.setRate({ args: { rate: lowered }, ...send })
      await dex.send.setPoolPaused({ args: { poolId, paused: false }, ...send })
    })

    test('(8) a swap that needs more than the liquid reserve fails (errPdil); tryQuoteRoute returns 0', async () => {
      const info = await pool(poolId)
      const liquidB = info.reserveB - info.externalB
      // out = in'·rB/(rA + in') ≥ liquidB  ⇔  in' ≥ liquidB·rA/(rB − liquidB), with in' = in·(1 − 0.3%)
      const needed = (((liquidB * info.reserveA) / (info.reserveB - liquidB) + 1n) * 10_000n) / 9_970n + 10n
      const quote = (amountIn: bigint, method: 'quote' | 'tryQuoteRoute') =>
        method === 'quote'
          ? dex.send.quote({ args: { poolId, assetIn: 0n, amountIn, swapper: ZERO, data: NO_DATA, wallet: 0n }, ...send })
          : dex.send.tryQuoteRoute({ args: { route: [poolId], assetIn: 0n, amountIn, swapper: ZERO, data: NO_DATA, wallet: 0n }, ...send })
      await expectContractError(quote(needed, 'quote'), 'errPdil')
      expect((await quote(needed, 'tryQuoteRoute')).return).toBe(0n)
      await expectContractError(swapCall(poolId, 0n, needed), 'errPdil')

      // half of it fits in the liquid reserve and leaves the external position untouched
      const half = needed / 2n
      const quoted = (await quote(half, 'tryQuoteRoute')).return!
      expect(quoted).toBeGreaterThan(0n)
      const result = await swapCall(poolId, 0n, half)
      expect(result.returns.at(-1)).toBe(quoted)
      const after = await pool(poolId)
      expect(after.externalB).toBe(info.externalB)
      expect(after.reserveB).toBe(info.reserveB - quoted)
      await assertEscrowIdentity(algorand, dex, poolId)
    })
  })

  describe('slot validation and valuator pinning (case 11)', () => {
    const tryCreate = (externals: ExternalSlotConfig[], hooks: [MockDexHookClient, bigint][] = [[ext, CUSTODY | EXTERNAL]], config = poolConfig(30n)) =>
      createPool({
        algorand,
        dex,
        sender: admin,
        assetA: 0n,
        assetB: tka,
        config,
        hooks: hooks.map(([hook, perms]) => hookInstall({ app: hook.appId, points: POKE, perms })),
        externals,
      })
    const slot = (overrides = {}) => slotFor(ext, valuatorB, 1n, receiptB, overrides)

    test('(11) externals on a curve pool or a launch pool fail (errPdex)', async () => {
      const curve = (
        await algorand.client
          .getTypedAppFactory(MockCurveFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
          .send.create.create({ args: { vault: dex.appId, lpMode: 0n } })
      ).appClient
      await dex.send.setCurveApproval({ args: { curve: curve.appId, lpMode: 0n, approved: true }, ...send })
      await expectContractError(tryCreate([slot()], undefined, poolConfig(30n, { curve: curve.appId })), 'errPdex')
      await expectContractError(
        tryCreate([slot()], undefined, poolConfig(30n, { virtualA: 1_000_000n, graduationThreshold: 1n, quoteIsA: true })),
        'errPdex',
      )
    })

    test('(11) a valuator rate of 0 at creation fails (errPdva)', async () => {
      await valuatorB.send.configure({ args: { mode: VALUATOR.fixed, value: 0n }, ...send })
      await expectContractError(tryCreate([slot()]), 'errPdva')
      await valuatorB.send.configure({ args: { mode: VALUATOR.lender, value: 0n }, ...send })
      // an approved valuator quotes 0 for a receipt it does not know (here: the ALGO lender's receipt on side B)
      await expectContractError(tryCreate([slot({ receipt: receiptA })]), 'errPdva')
    })

    test('(OPEN-DECISIONS #6) the Vault refuses a receipt with a clawback or freeze address or frozen by default, whatever the valuator quotes (errPdex)', async () => {
      // the valuator would also value such a receipt 0 (approval checklist), but the Vault refuses it first, so the
      // rule no longer depends on every approved valuator implementing it
      const checked = await deployValuator(lenderB)
      await checked.send.configure({ args: { mode: VALUATOR.fixed, value: RATE }, ...send })
      const receipt = async (unitName: string, roles: { clawback?: string; freeze?: string; defaultFrozen?: boolean }) =>
        (await algorand.send.assetCreate({ sender: admin.addr, total: 10n ** 15n, decimals: 6, unitName, ...roles }))
          .assetId
      const clawback = await receipt('rCLW', { clawback: admin.addr.toString() })
      const freeze = await receipt('rFRZ', { freeze: admin.addr.toString() })
      // default-frozen with no freeze address: the escrow's holding could never be unfrozen
      const frozen = await receipt('rDFZ', { defaultFrozen: true })
      const clean = await receipt('rOK', {})
      await expectContractError(tryCreate([slotFor(ext, checked, 1n, clawback)]), 'errPdex')
      await expectContractError(tryCreate([slotFor(ext, checked, 1n, freeze)]), 'errPdex')
      await expectContractError(tryCreate([slotFor(ext, checked, 1n, frozen)]), 'errPdex')
      // the same valuator values a receipt with neither role
      const { poolId } = await tryCreate([slotFor(ext, checked, 1n, clean)])
      expect((await slots(poolId))[0]).toMatchObject({ receipt: clean, rate: RATE })
    })

    test('(OPEN-DECISIONS #5) the fixture default clip stays 100 bps/day each way', () => {
      const [, , , , , markup, markdown] = externalSlot({ hook: 1n, valuator: 2n, side: 1n, receipt: 3n })
      expect([markup, markdown]).toEqual([100n, 100n])
    })

    test('slot shape: side, receipt, duplicates, cap, hook permissions, valuator approval, count (errPdex)', async () => {
      await expectContractError(tryCreate([slot({ side: 2n })]), 'errPdex')
      await expectContractError(tryCreate([slot({ receipt: 0n })]), 'errPdex')
      await expectContractError(tryCreate([slot({ receipt: tka })]), 'errPdex')
      await expectContractError(tryCreate([slot({ capBps: 5_001n })]), 'errPdex')
      // the slot's hook must be installed with External
      await expectContractError(tryCreate([slot()], [[ext, CUSTODY]]), 'errPdex')
      await expectContractError(tryCreate([slotFor(plain, valuatorB, 1n, receiptB)], [[ext, CUSTODY | EXTERNAL], [plain, CUSTODY]]), 'errPdex')
      await expectContractError(tryCreate([slot()], []), 'errPdex')
      const both: [MockDexHookClient, bigint][] = [
        [ext, CUSTODY | EXTERNAL],
        [extA, CUSTODY | EXTERNAL],
      ]
      await expectContractError(tryCreate([slot(), slotFor(extA, valuatorA, 0n, receiptB)], both), 'errPdex')
      await expectContractError(
        tryCreate([slot(), slotFor(extA, valuatorA, 0n, receiptA), slotFor(extA, valuatorA, 0n, receiptA)], both),
        'errPdex',
      )
      const unapproved = await deployValuator(lenderB, false)
      await expectContractError(tryCreate([slotFor(ext, unapproved, 1n, receiptB)]), 'errPdex')
    })

    test('valuator pinning: a version bump fails createPool (errPdvr) and stops marks on existing pools', async () => {
      const pinned = await deployValuator(lenderB)
      const poolId = await externalPool([[ext, CUSTODY | EXTERNAL]], [slotFor(ext, pinned, 1n, receiptB)])
      // the lender rate is 0.875 here: 1,000,000 mints 1,142,857 units worth 999,999, so the hook donates 1 unit of dust
      await configure(ext, MODE.deposit, 1_000_000n, 1n)
      await poke(poolId, 0n)
      await configure(ext, MODE.pass)
      await revalue(poolId)

      await algorand.send.appUpdateMethodCall({
        sender: admin.addr,
        signer: admin.signer,
        appId: pinned.appId,
        method: pinned.appClient.getABIMethod('update'),
        args: [],
        approvalProgram: Buffer.from(ValuatorSpec.byteCode!.approval, 'base64'),
        clearStateProgram: Buffer.from(ValuatorSpec.byteCode!.clear, 'base64'),
      })
      await expectContractError(tryCreate([slotFor(ext, pinned, 1n, receiptB)]), 'errPdvr')
      await expectContractError(revalue(poolId), rejectVersionError(1n))
      // the guaranteed exit still works
      await dex.send.setPoolPaused({ args: { poolId, paused: true }, ...send })
      await removeCall(poolId, 1_000_000n, true)
      await assertEscrowIdentity(algorand, dex, poolId)
    })
  })

  describe('custody re-marks book the revaluation of units already held like revalue (§10 A25)', () => {
    let poolId: bigint
    let timeWarp: TimeWarp
    /** the largest clip, 10% per day each way: a warp of 10,000 s allows a move of about 1.16%, so a 1% rate change is not clipped */
    const CLIP = 1_000n
    const WARP = 10_000n

    beforeAll(async () => {
      timeWarp = new TimeWarp(algorand)
      await lenderB.send.setRate({ args: { rate: RATE }, ...send })
      poolId = await externalPool(
        [[ext, CUSTODY | EXTERNAL]],
        [slotFor(ext, valuatorB, 1n, receiptB, { maxMarkupBpsPerDay: CLIP, maxMarkdownBpsPerDay: CLIP })],
      )
      await configure(ext, MODE.deposit, 4_000_000n)
      await poke(poolId, 0n)
      await configure(ext, MODE.pass)
      expect((await slots(poolId))[0]).toMatchObject({ units: 3_200_000n, rate: RATE, bookValue: 4_000_000n })
    })

    test('a pending markup belongs to the LPs: the External hook cannot take receipts against it (errPdki)', async () => {
      const raised = (RATE * 101n) / 100n
      await lenderB.send.setRate({ args: { rate: raised }, ...send })
      await timeWarp.timeWarp(WARP)
      // 30,000 units are worth 37,875 at the new rate, less than the ~40,000 markup on the 3,200,000 units held
      await configure(ext, MODE.moveReceipt, 30_000n, receiptB)
      await expectContractError(poke(poolId, 0n), 'errPdki')

      // a neutral deposit in the same state books the markup as a donation to the reserve
      const before = await pool(poolId)
      const [s0] = await slots(poolId)
      const escrow = await escrowOf(poolId)
      const liquidBefore = await holding(algorand, escrow, tka)
      await configure(ext, MODE.deposit, 500_000n, 2n)
      await poke(poolId, 0n)
      await configure(ext, MODE.pass)
      const [s1] = await slots(poolId)
      expect(clipRate(s0, raised, s1.lastMark - s0.lastMark)).toBe(raised)
      expect(s1.rate).toBe(raised)
      expect(s1.bookValue).toBe((s1.units * raised) / RATE_SCALE)
      const markup = (s0.units * raised) / RATE_SCALE - s0.bookValue
      const movement = s1.bookValue - (s0.units * raised) / RATE_SCALE
      const liquid = (await holding(algorand, escrow, tka)) - liquidBefore
      expect(markup).toBeGreaterThan(30_000n)
      const after = await pool(poolId)
      expect(after.reserveB).toBe(before.reserveB + markup + movement + liquid)
      expect(movement + liquid).toBeGreaterThanOrEqual(0n)
      expect(after.reserveA).toBe(before.reserveA)
      expect(after.externalB).toBe(s1.bookValue)
      await assertEscrowIdentity(algorand, dex, poolId)
    })

    test('a pending markdown does not make a neutral recall revert; the loss lowers the reserve', async () => {
      const [s0] = await slots(poolId)
      const lowered = (s0.rate * 99n) / 100n
      await lenderB.send.setRate({ args: { rate: lowered }, ...send })
      await timeWarp.timeWarp(WARP)

      const before = await pool(poolId)
      const escrow = await escrowOf(poolId)
      const liquidBefore = await holding(algorand, escrow, tka)
      await configure(ext, MODE.recall, 400_000n, 2n)
      await poke(poolId, 0n)
      await configure(ext, MODE.pass)
      const [s1] = await slots(poolId)
      expect(clipRate(s0, lowered, s1.lastMark - s0.lastMark)).toBe(lowered)
      expect(s1).toMatchObject({ units: s0.units - 400_000n, rate: lowered })
      expect(s1.bookValue).toBe((s1.units * lowered) / RATE_SCALE)
      const markdown = s0.bookValue - (s0.units * lowered) / RATE_SCALE
      const movement = (s0.units * lowered) / RATE_SCALE - s1.bookValue
      const liquid = (await holding(algorand, escrow, tka)) - liquidBefore
      expect(markdown).toBeGreaterThan(0n)
      const after = await pool(poolId)
      expect(after.reserveB).toBe(before.reserveB - markdown - movement + liquid)
      expect(after.externalB).toBe(s1.bookValue)
      await assertEscrowIdentity(algorand, dex, poolId)
    })
  })

  describe('conservative custody valuation under a binding clip (§10 A25, OPEN-DECISIONS #4)', () => {
    // clips of 0 both ways: the booked rate r' stays RATE whatever the lender does, so the clip binds as soon as
    // the valuator moves and the tests do not depend on LocalNet's clock
    let lenderD: MockLenderClient
    let receiptD: bigint
    let valuatorD: MockValuatorClient
    let extD: MockDexHookClient
    let poolId: bigint
    const MODE_RECALL_TAKE = 16n
    const MODE_DEPOSIT_TAKE = 17n

    /** one custody call of extD in `mode`, then back to pass (also when the call fails) */
    const custody = async (mode: bigint, value: bigint, value2 = 0n) => {
      await configure(extD, mode, value, value2)
      try {
        return await poke(poolId, 0n)
      } finally {
        await configure(extD, MODE.pass)
      }
    }

    beforeAll(async () => {
      ;[lenderD, receiptD] = await deployLender(tka)
      valuatorD = await deployValuator(lenderD)
      extD = await deployHook(CUSTODY | EXTERNAL, lenderD, tka, receiptD, [receiptD])
      await algorand.send.assetOptIn({ sender: trader.addr, assetId: receiptD })
      poolId = await externalPool(
        [[extD, CUSTODY | EXTERNAL]],
        [slotFor(extD, valuatorD, 1n, receiptD, { maxMarkupBpsPerDay: 0n, maxMarkdownBpsPerDay: 0n })],
      )
      await custody(MODE.deposit, 4_000_000n)
      expect((await slots(poolId))[0]).toMatchObject({ units: 3_200_000n, rate: RATE, bookValue: 4_000_000n })
    })

    test('the clip does not bind (v = r\'): neutral deposits and recalls pass with unchanged reserves', async () => {
      const before = await pool(poolId)
      await custody(MODE.deposit, 500_000n)
      expect((await slots(poolId))[0]).toMatchObject({ units: 3_600_000n, rate: RATE, bookValue: 4_500_000n })
      await custody(MODE.recall, 400_000n)
      expect((await slots(poolId))[0]).toMatchObject({ units: 3_200_000n, rate: RATE, bookValue: 4_000_000n })
      const after = await pool(poolId)
      expect([after.reserveA, after.reserveB, after.externalB]).toEqual([before.reserveA, before.reserveB, 4_000_000n])
      await assertEscrowIdentity(algorand, dex, poolId)
    })

    test('units leaving at v > r\' are valued at v: a recall cannot skim the unbooked markup (errPdki)', async () => {
      // v = 1.375 > r' = 1.25: 800,000 units redeem for 1,100,000 but are booked at 1,000,000
      const raised = (RATE * 11n) / 10n
      await lenderD.send.setRate({ args: { rate: raised }, ...send })
      try {
        const before = await pool(poolId)
        const [s0] = await slots(poolId)
        // before #4 the guard valued the recall at r', so taking Δu·(v − r') = 100,000 left dB = 0 and passed
        await expectContractError(custody(MODE_RECALL_TAKE, 800_000n, 100_000n), 'errPdki')
        await expectContractError(custody(MODE_RECALL_TAKE, 800_000n, 1n), 'errPdki')
        expect((await slots(poolId))[0]).toEqual(s0)

        // the honest recall passes; the realized appreciation is booked as a donation to the LPs
        const escrow = await escrowOf(poolId)
        const liquidBefore = await holding(algorand, escrow, tka)
        await custody(MODE.recall, 800_000n)
        const [s1] = await slots(poolId)
        expect(s1).toMatchObject({ units: 2_400_000n, rate: RATE, bookValue: 3_000_000n })
        expect((await holding(algorand, escrow, tka)) - liquidBefore).toBe(1_100_000n)
        const after = await pool(poolId)
        expect(after.reserveB).toBe(before.reserveB + 100_000n)
        expect([after.reserveA, after.externalB]).toEqual([before.reserveA, 3_000_000n])
        await assertEscrowIdentity(algorand, dex, poolId)
      } finally {
        await lenderD.send.setRate({ args: { rate: RATE }, ...send })
      }
    })

    test('units entering at v < r\' are valued at v: a deposit cannot skim the over-booking (errPdki)', async () => {
      // v = 1.0 < r' = 1.25: 1,000,000 of TKA mints 1,000,000 units, booked at 1,250,000
      const lowered = RATE_SCALE
      await lenderD.send.setRate({ args: { rate: lowered }, ...send })
      try {
        const before = await pool(poolId)
        const [s0] = await slots(poolId)
        // before #4 the guard valued the deposit at r', so taking Δu·(r' − v) = 250,000 left dB = 0 and passed
        await expectContractError(custody(MODE_DEPOSIT_TAKE, 1_000_000n, 250_000n), 'errPdki')
        await expectContractError(custody(MODE_DEPOSIT_TAKE, 1_000_000n, 1n), 'errPdki')
        expect((await slots(poolId))[0]).toEqual(s0)

        // the honest deposit still passes, and the book is the same as before #4 (the new units at r')
        await custody(MODE.deposit, 1_000_000n)
        const [s1] = await slots(poolId)
        expect(s1).toMatchObject({ units: s0.units + 1_000_000n, rate: RATE, bookValue: s0.bookValue + 1_250_000n })
        const after = await pool(poolId)
        expect(after.reserveB).toBe(before.reserveB + 250_000n)
        expect([after.reserveA, after.externalB]).toEqual([before.reserveA, s1.bookValue])
        await assertEscrowIdentity(algorand, dex, poolId)
      } finally {
        await lenderD.send.setRate({ args: { rate: RATE }, ...send })
      }
    })
  })

  describe('clip bounds and in-kind exit rounding with a coarse receipt (§10 A27, A28)', () => {
    // 1 receipt unit = 18.4 TKA (18,400,000 base units): a receipt with far fewer decimals than the underlying,
    // and a booked rate close to 2^64 so an unclipped `rate + up` overflows after a ~2,100 s gap
    const COARSE = 18_400_000n * RATE_SCALE
    const UNIT_VALUE = 18_400_000n
    const CLIP = 1_000n
    let lenderC: MockLenderClient
    let receiptC: bigint
    let valuatorC: MockValuatorClient
    let extC: MockDexHookClient
    let poolId: bigint
    let timeWarp: TimeWarp

    const coarseSlot = (overrides = {}) =>
      slotFor(extC, valuatorC, 1n, receiptC, { maxMarkupBpsPerDay: CLIP, maxMarkdownBpsPerDay: CLIP, ...overrides })
    const tryCreate = (externals: ExternalSlotConfig[]) =>
      createPool({
        algorand,
        dex,
        sender: admin,
        assetA: 0n,
        assetB: tka,
        config: poolConfig(30n),
        hooks: [hookInstall({ app: extC.appId, points: POKE, perms: CUSTODY | EXTERNAL })],
        externals,
        optInLp: [trader],
      })
    const lpBalance = async () => holding(algorand, trader.addr.toString(), (await pool(poolId)).lpAsset)

    beforeAll(async () => {
      timeWarp = new TimeWarp(algorand)
      ;[lenderC, receiptC] = await deployLender(tka, COARSE)
      valuatorC = await deployValuator(lenderC)
      extC = await deployHook(CUSTODY | EXTERNAL, lenderC, tka, receiptC, [receiptC])
      await algorand.send.assetOptIn({ sender: trader.addr, assetId: receiptC })

      // the largest accepted clips: 1,000 bps/day each way
      poolId = (await tryCreate([coarseSlot()])).poolId
      const [s0] = await slots(poolId)
      expect(s0).toMatchObject({ maxMarkupBpsPerDay: CLIP, maxMarkdownBpsPerDay: CLIP, rate: COARSE })
      await addLiquidity(algorand, dex, trader, poolId, 10_000_000n, 1_000_000_000n)
      // 36,800,000 TKA mints exactly 2 receipt units: neutral
      await configure(extC, MODE.deposit, 2n * UNIT_VALUE)
      await poke(poolId, 0n)
      await configure(extC, MODE.pass)
      expect((await slots(poolId))[0]).toMatchObject({ units: 2n, bookValue: 2n * UNIT_VALUE })
      await assertEscrowIdentity(algorand, dex, poolId)
    })

    test('A27: createPool bounds both per-day clips at 1,000 bps (errPdex)', async () => {
      await expectContractError(tryCreate([coarseSlot({ maxMarkupBpsPerDay: 1_001n })]), 'errPdex')
      await expectContractError(tryCreate([coarseSlot({ maxMarkdownBpsPerDay: 1_001n })]), 'errPdex')
      await expectContractError(tryCreate([coarseSlot({ maxMarkupBpsPerDay: 10_000_000_000n })]), 'errPdex')
    })

    test('A28: an exit paying 0 receipt units takes 0 booked value; the fraction stays with the pool', async () => {
      const before = await pool(poolId)
      const [s0] = await slots(poolId)
      const S = before.lpSupply
      // a quarter of the supply is owed half a receipt unit: floor(0.5) = 0 units are paid
      const lp = S / 4n
      expect((lp * s0.units) / S).toBe(0n)
      const liquidA = (lp * (before.reserveA - before.externalA)) / S
      const liquidB = (lp * (before.reserveB - before.externalB)) / S
      const traderR = await holding(algorand, trader.addr.toString(), receiptC)

      const result = await removeCall(poolId, lp)
      expect(result.returns.at(-1)).toEqual({ amountA: liquidA, amountB: liquidB })
      const after = await pool(poolId)
      const [a0] = await slots(poolId)
      // before A28 the exit took floor(lp·bookValue/S) = 9,200,000 out of the slot and reserveB with no receipt paid
      expect(a0).toMatchObject({ units: 2n, bookValue: 2n * UNIT_VALUE })
      expect(after.externalB).toBe(2n * UNIT_VALUE)
      expect(after.reserveA).toBe(before.reserveA - liquidA)
      expect(after.reserveB).toBe(before.reserveB - liquidB)
      expect(await holding(algorand, trader.addr.toString(), receiptC)).toBe(traderR)
      await assertEscrowIdentity(algorand, dex, poolId)
    })

    test('A28: the value taken out of the book is the value of the units actually paid (rounded up)', async () => {
      const before = await pool(poolId)
      const [s0] = await slots(poolId)
      const S = before.lpSupply
      // three quarters of the supply is owed 1.5 units: 1 unit is paid and exactly its booked value leaves
      const lp = (S * 3n) / 4n
      expect(lp).toBeLessThanOrEqual(await lpBalance())
      const units = (lp * s0.units) / S
      expect(units).toBe(1n)
      const value = exitValue(s0, units)
      expect(value).toBe(UNIT_VALUE)
      const liquidB = (lp * (before.reserveB - before.externalB)) / S
      const traderR = await holding(algorand, trader.addr.toString(), receiptC)

      await removeCall(poolId, lp)
      const after = await pool(poolId)
      const [a0] = await slots(poolId)
      // before A28: floor(lp·bookValue/S) = 27,600,000 left the book for one 18,400,000 unit
      expect(a0).toMatchObject({ units: 1n, bookValue: UNIT_VALUE })
      expect(after.externalB).toBe(UNIT_VALUE)
      expect(after.reserveB).toBe(before.reserveB - liquidB - value)
      expect(await holding(algorand, trader.addr.toString(), receiptC)).toBe(traderR + 1n)
      await assertEscrowIdentity(algorand, dex, poolId)
    })

    test('A27: a long gap saturates the clip band instead of overflowing; marks, markdowns and exits still work', async () => {
      // up = rate·dt/day is ~4.3e17 after 2,000 s, so rate + up passes 2^64: before A27 every mark panicked
      await timeWarp.timeWarp(20_000n)
      await revalue(poolId)
      const [s0] = await slots(poolId)
      expect(s0).toMatchObject({ units: 1n, rate: COARSE, bookValue: UNIT_VALUE })

      const lowered = (COARSE * 99n) / 100n
      await lenderC.send.setRate({ args: { rate: lowered }, ...send })
      await timeWarp.timeWarp(20_000n)
      const before = await pool(poolId)
      await revalue(poolId)
      const [s1] = await slots(poolId)
      expect(clipRate(s0, lowered, s1.lastMark - s0.lastMark)).toBe(lowered)
      expect(s1).toMatchObject({ units: 1n, rate: lowered, bookValue: lowered / RATE_SCALE })
      expect((await pool(poolId)).reserveB).toBe(before.reserveB - (UNIT_VALUE - lowered / RATE_SCALE))
      await assertEscrowIdentity(algorand, dex, poolId)

      await timeWarp.timeWarp(20_000n)
      await removeCall(poolId, (await lpBalance()) / 2n)
      await assertEscrowIdentity(algorand, dex, poolId)
    })
  })
})
