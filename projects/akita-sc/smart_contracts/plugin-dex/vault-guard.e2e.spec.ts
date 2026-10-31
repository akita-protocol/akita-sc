import { AlgorandClient, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { TransactionComposer } from '@algorandfoundation/algokit-utils/types/composer'
import { ALGORAND_ZERO_ADDRESS_STRING, getApplicationAddress } from 'algosdk'
import { beforeAll, describe, expect, test } from 'vitest'
import { PluginDexClient, PluginDexComposer } from '../artifacts/plugin-dex/PluginDexClient'
import { BinEngineClient, BinEngineFactory } from '../artifacts/plugin-dex/curves/bins/BinEngineClient'
import { MockCurveClient, MockCurveFactory } from '../artifacts/plugin-dex/tests/MockCurveClient'
import { MockDexHookClient, MockDexHookFactory } from '../artifacts/plugin-dex/tests/MockDexHookClient'
import { MockLenderClient, MockLenderFactory } from '../artifacts/plugin-dex/tests/MockLenderClient'
import { MockValuatorClient, MockValuatorFactory } from '../artifacts/plugin-dex/tests/MockValuatorClient'
import { expectContractError } from '../../tests/utils/errors'
import {
  addLiquidity,
  assertEscrowIdentity,
  createPool,
  deployVault,
  ensureOptedIn,
  externalSlot,
  holding,
  hookInstall,
  poolConfig,
  transferTxn,
} from '../../tests/fixtures/plugin-dex'
import {
  BinPoolParams,
  BinsPerChunk,
  chunkBoxName,
  encodeAddArgs,
  encodeInitArgs,
  encodeRemoveArgs,
  FS,
  IdCenter,
  poolBoxName,
  positionBoxName,
  tableBoxName,
} from '../../tests/models/bins-model'

/**
 * Regression tests for the vault-guard findings of the WP1 review (FINAL-SPEC §10 A24, A26):
 * - A26: a mint prices every external slot at max(book, valuator), so JIT add + remove cannot buy the
 *   slot at the clipped book and take it out in kind at the valuator's value.
 * - A24: removes on curve pools never run the inline sync, so a donation the curve refuses to place
 *   (1 unit sent to the escrow while the active bin is empty) cannot block LP exits.
 */

const POKE = 256n
const CUSTODY = 1n
const EXTERNAL = 16n
const MODE_PASS = 0n
const MODE_DEPOSIT = 12n
const RATE_SCALE = 1_000_000_000_000n
/** 1 receipt unit = 1.25 underlying */
const RATE = 1_250_000_000_000n
const LP_FUNGIBLE = 0n
const LP_CURVE = 1n
const CURVE_HONEST = 0n
/** MockCurve: Settle reports a wrong aggregate, so the Vault refuses every donation (errPdcv) */
const CURVE_REFUSE_SETTLE = 17n
const CURVE_MBR = 100_000n
const ZERO = ALGORAND_ZERO_ADDRESS_STRING
const NO_DATA = new Uint8Array()
const MAX_FEE = microAlgo(3_000_000)
const send = { maxFee: microAlgo(200_000), coverAppCallInnerTransactionFees: true, populateAppCallResources: true }

const u64 = (n: bigint) => Uint8Array.from({ length: 8 }, (_, i) => Number((n >> BigInt(8 * (7 - i))) & 0xffn))

describe('PluginDex vault-guard regressions', () => {
  const localnet = algorandFixture()
  let algorand: AlgorandClient
  let admin: TransactionSignerAccount
  let trader: TransactionSignerAccount
  let dex: PluginDexClient
  let tka: bigint

  const pool = (poolId: bigint) => dex.getPool({ args: { poolId } })
  const escrowOf = async (poolId: bigint) => getApplicationAddress((await pool(poolId)).escrow).toString()

  /** a Vault group with `carriers` opUp() reference carriers first (FINAL-SPEC §10 A11, A19) */
  const group = (sender: TransactionSignerAccount, carriers = 2) => {
    let composer = dex.newGroup() as PluginDexComposer<unknown[]>
    for (let c = 0; c < carriers; c++) {
      composer = composer.opUp({
        sender: sender.addr,
        signer: sender.signer,
        args: [],
        note: `reference carrier ${c}`,
        maxFee: send.maxFee,
      }) as PluginDexComposer<unknown[]>
    }
    return composer
  }
  const run = (composer: PluginDexComposer<unknown[]>) =>
    composer.send({ coverAppCallInnerTransactionFees: true, populateAppCallResources: true })

  const addCall = async (poolId: bigint, who: TransactionSignerAccount, amountA: bigint, amountB: bigint) => {
    const info = await pool(poolId)
    const escrow = getApplicationAddress(info.escrow).toString()
    await ensureOptedIn(algorand, who, info.lpAsset)
    const res = await run(
      group(who).addLiquidity({
        sender: who.addr,
        signer: who.signer,
        args: {
          depositA: transferTxn(algorand, who, escrow, info.assetA, amountA),
          depositB: transferTxn(algorand, who, escrow, info.assetB, amountB),
          poolId,
          minLpOut: 0n,
          data: NO_DATA,
        },
        maxFee: send.maxFee,
      }) as PluginDexComposer<unknown[]>,
    )
    return res.returns.at(-1) as unknown as bigint
  }

  const removeCall = async (poolId: bigint, who: TransactionSignerAccount, lp: bigint) => {
    const info = await pool(poolId)
    const res = await run(
      group(who).removeLiquidity({
        sender: who.addr,
        signer: who.signer,
        args: {
          lpTransfer: algorand.createTransaction.assetTransfer({
            sender: who.addr,
            receiver: dex.appAddress,
            assetId: info.lpAsset,
            amount: lp,
          }),
          poolId,
          minAmountA: 0n,
          minAmountB: 0n,
          data: NO_DATA,
        },
        maxFee: send.maxFee,
      }) as PluginDexComposer<unknown[]>,
    )
    return res.returns.at(-1) as unknown as { amountA: bigint; amountB: bigint }
  }

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
    await dex.appClient.fundAppAccount({ amount: (5).algo() })
  })

  // ------------------------------------------------------------------------------------------------
  describe('§10 A26: mints price external slots at max(book, valuator)', () => {
    let lender: MockLenderClient
    let receipt: bigint
    let valuator: MockValuatorClient
    let hook: MockDexHookClient
    let attacker: TransactionSignerAccount

    beforeAll(async () => {
      lender = (
        await algorand.client
          .getTypedAppFactory(MockLenderFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
          .send.create.create({ args: { underlying: tka, rate: RATE } })
      ).appClient
      await lender.appClient.fundAppAccount({ amount: (1).algo() })
      receipt = (await lender.send.bootstrap({ args: [], ...send })).return!
      await algorand.send.assetTransfer({ sender: admin.addr, receiver: lender.appAddress, assetId: tka, amount: 10n ** 10n })

      valuator = (
        await algorand.client
          .getTypedAppFactory(MockValuatorFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
          .send.create.create({ args: { lender: lender.appId } })
      ).appClient
      await dex.send.setValuatorApproval({ args: { valuator: valuator.appId, approved: true }, ...send })

      hook = (
        await algorand.client
          .getTypedAppFactory(MockDexHookFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
          .send.create.create({ args: { dex: dex.appId } })
      ).appClient
      await hook.appClient.fundAppAccount({ amount: (5).algo() })
      await dex.send.setHookApproval({ args: { hook: hook.appId, perms: CUSTODY | EXTERNAL }, ...send })
      for (const asset of [tka, receipt]) await hook.send.optIn({ args: { asset }, ...send })
      await hook.send.configureExternal({ args: { lender: lender.appId, underlying: tka, receipt }, ...send })

      attacker = await localnet.context.generateAccount({ initialFunds: (300).algo() })
      for (const asset of [tka, receipt]) await algorand.send.assetOptIn({ sender: attacker.addr, assetId: asset })
      await algorand.send.assetTransfer({ sender: admin.addr, receiver: attacker.addr, assetId: tka, amount: 10n ** 9n })
      await algorand.send.assetOptIn({ sender: trader.addr, assetId: receipt })
    })

    test('a JIT add + remove while the valuator is above the clipped book captures nothing from existing LPs', async () => {
      // a slot whose markup clip is 0: the book never follows the valuator up (the clip at its most
      // conservative, and deterministic under LocalNet's shared clock)
      const { poolId } = await createPool({
        algorand,
        dex,
        sender: admin,
        assetA: 0n,
        assetB: tka,
        config: poolConfig(30n),
        hooks: [hookInstall({ app: hook.appId, points: POKE, perms: CUSTODY | EXTERNAL })],
        externals: [
          externalSlot({ hook: hook.appId, valuator: valuator.appId, side: 1n, receipt, maxMarkupBpsPerDay: 0n }),
        ],
        optInLp: [trader],
      })
      await addLiquidity(algorand, dex, trader, poolId, 10_000_000n, 10_000_000n)
      // 4,000,000 TKA goes to the lender: 3,200,000 units booked at 1.25
      await hook.send.configure({ args: { mode: MODE_DEPOSIT, value: 4_000_000n, value2: 0n, target: ZERO }, ...send })
      await run(
        group(trader).poke({ sender: trader.addr, args: { poolId, hookIndex: 0n, data: NO_DATA }, maxFee: send.maxFee }),
      )
      await hook.send.configure({ args: { mode: MODE_PASS, value: 0n, value2: 0n, target: ZERO }, ...send })

      // the lender's real rate jumps 10%; the book stays at 1.25 (clip), 400,000 TKA of value is unbooked
      const live = (RATE * 11n) / 10n
      await lender.send.setRate({ args: { rate: live }, ...send })

      const before = await pool(poolId)
      const [slot] = await dex.getExternalSlots({ args: { poolId } })
      const units = slot[8]
      expect(before.externalB).toBe(4_000_000n)
      const hidden = (units * live) / RATE_SCALE - before.externalB
      expect(hidden).toBe(400_000n)
      // real pool value: A is all liquid; B = liquid + receipts at the valuator rate
      const realA = before.reserveA
      const realB = before.reserveB - before.externalB + (units * live) / RATE_SCALE

      // the attacker adds 9× the pool, then removes everything it minted
      const tkaBefore = await holding(algorand, attacker.addr.toString(), tka)
      const deposit = 90_000_000n
      const minted = await addCall(poolId, attacker, deposit, deposit)
      const mid = await pool(poolId)
      // the mint valued B at max(book, valuator): reserveB + the unbooked 400,000
      expect(minted).toBe((deposit * before.lpSupply) / (before.reserveB + hidden))
      const usedA = mid.reserveA - before.reserveA
      expect(usedA).toBe((deposit * before.reserveA + before.reserveB + hidden - 1n) / (before.reserveB + hidden))
      expect(mid.reserveB - before.reserveB).toBe(deposit)

      const out = await removeCall(poolId, attacker, minted)
      const receipts = await holding(algorand, attacker.addr.toString(), receipt)
      expect(receipts).toBeGreaterThan(0n)
      const dTka = (await holding(algorand, attacker.addr.toString(), tka)) - tkaBefore + (receipts * live) / RATE_SCALE
      const dAlgo = out.amountA - usedA
      // profit in TKA at the pool's real price (B per A = realB / realA): never positive beyond rounding
      const profitTimesA = dTka * realA + dAlgo * realB
      expect(profitTimesA).toBeLessThanOrEqual(2n * realA)

      // the existing LP's claim on real value did not fall (per LP, at the same real price)
      const after = await pool(poolId)
      const [slotAfter] = await dex.getExternalSlots({ args: { poolId } })
      const realAfterB = after.reserveB - after.externalB + (slotAfter[8] * live) / RATE_SCALE
      const valueBefore = (realB * realA + realA * realB) * after.lpSupply
      const valueAfter = (realAfterB * realA + after.reserveA * realB) * before.lpSupply
      expect(after.lpSupply).toBe(before.lpSupply)
      expect(valueAfter).toBeGreaterThanOrEqual(valueBefore - 4n * realA * before.lpSupply)
      await assertEscrowIdentity(algorand, dex, poolId)
    })

    test('a valuator below the book: the mint uses the book (the §4.7 write-down protection is unchanged)', async () => {
      const { poolId } = await createPool({
        algorand,
        dex,
        sender: admin,
        assetA: 0n,
        assetB: tka,
        config: poolConfig(30n),
        hooks: [hookInstall({ app: hook.appId, points: POKE, perms: CUSTODY | EXTERNAL })],
        externals: [
          externalSlot({ hook: hook.appId, valuator: valuator.appId, side: 1n, receipt, maxMarkdownBpsPerDay: 0n }),
        ],
        optInLp: [trader],
      })
      await lender.send.setRate({ args: { rate: RATE }, ...send })
      await addLiquidity(algorand, dex, trader, poolId, 10_000_000n, 10_000_000n)
      await hook.send.configure({ args: { mode: MODE_DEPOSIT, value: 4_000_000n, value2: 0n, target: ZERO }, ...send })
      await run(
        group(trader).poke({ sender: trader.addr, args: { poolId, hookIndex: 0n, data: NO_DATA }, maxFee: send.maxFee }),
      )
      await hook.send.configure({ args: { mode: MODE_PASS, value: 0n, value2: 0n, target: ZERO }, ...send })
      await lender.send.setRate({ args: { rate: (RATE * 9n) / 10n }, ...send })

      const before = await pool(poolId)
      const minted = await addCall(poolId, attacker, 1_000_000n, 1_000_000n)
      expect(minted).toBe((1_000_000n * before.lpSupply) / before.reserveB)
      expect((await pool(poolId)).externalB).toBe(before.externalB)
      await assertEscrowIdentity(algorand, dex, poolId)
      await lender.send.setRate({ args: { rate: RATE }, ...send })
    })
  })

  // ------------------------------------------------------------------------------------------------
  describe('§10 A24: a donation the curve cannot place never blocks a curve-pool remove', () => {
    let fungible: MockCurveClient
    let managed: MockCurveClient

    const deployCurve = async (lpMode: bigint): Promise<MockCurveClient> => {
      const curve = (
        await algorand.client
          .getTypedAppFactory(MockCurveFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
          .send.create.create({ args: { vault: dex.appId, lpMode } })
      ).appClient
      await curve.appClient.fundAppAccount({ amount: (1).algo() })
      await dex.send.setCurveApproval({ args: { curve: curve.appId, lpMode, approved: true }, ...send })
      return curve
    }

    const curvePool = async (curve: MockCurveClient) =>
      (
        await createPool({
          algorand,
          dex,
          sender: admin,
          assetA: 0n,
          assetB: tka,
          config: poolConfig(30n, {
            curve: curve.appId,
            curveMbr: CURVE_MBR,
            curveArgs: new Uint8Array([...u64(1n), ...u64(1n)]),
          }),
          optInLp: [trader],
        })
      ).poolId

    const donate = async (poolId: bigint, amount: bigint) =>
      algorand.send.assetTransfer({ sender: admin.addr, receiver: await escrowOf(poolId), assetId: tka, amount })

    const sync = (poolId: bigint) =>
      run(group(trader, 1).sync({ sender: trader.addr, args: { poolId }, maxFee: send.maxFee }))

    beforeAll(async () => {
      fungible = await deployCurve(LP_FUNGIBLE)
      managed = await deployCurve(LP_CURVE)
    })

    test('curve-managed: removeLiquidityCurve pays pro-rata of the booked reserves and leaves the donation unbooked', async () => {
      const poolId = await curvePool(managed)
      const escrow = await escrowOf(poolId)
      const added = (
        await dex.send.addLiquidityCurve({
          sender: trader.addr,
          args: {
            mbr: algorand.createTransaction.payment({
              sender: trader.addr,
              receiver: dex.appAddress,
              amount: microAlgo(CURVE_MBR),
            }),
            depositA: transferTxn(algorand, trader, escrow, 0n, 4_000_000n),
            depositB: transferTxn(algorand, trader, escrow, tka, 4_000_000n),
            poolId,
            positionId: 0n,
            minShares: 0n,
            curveArgs: NO_DATA,
            data: NO_DATA,
          },
          ...send,
        })
      ).return!
      await managed.send.setMode({ args: { mode: CURVE_REFUSE_SETTLE }, ...send })
      await donate(poolId, 1n)
      // the curve refuses the donation: sync fails, but the exit must not
      await expectContractError(sync(poolId), 'errPdcv')
      const out = (
        await run(
          group(trader, 1).removeLiquidityCurve({
            sender: trader.addr,
            args: {
              poolId,
              positionId: added.positionId,
              minAmountA: 0n,
              minAmountB: 0n,
              curveArgs: u64(added.shares / 2n),
              data: NO_DATA,
            },
            maxFee: send.maxFee,
          }) as PluginDexComposer<unknown[]>,
        )
      ).returns.at(-1) as unknown as { amountA: bigint; amountB: bigint }
      expect(out).toEqual({ amountA: 2_000_000n, amountB: 2_000_000n })
      const info = await pool(poolId)
      expect([info.reserveA, info.reserveB]).toEqual([2_000_000n, 2_000_000n])
      await assertEscrowIdentity(algorand, dex, poolId, 0n, 1n)
      // once the curve accepts it again, sync books the donation for the remaining LPs
      await managed.send.setMode({ args: { mode: CURVE_HONEST }, ...send })
      await sync(poolId)
      expect((await pool(poolId)).reserveB).toBe(2_000_001n)
      await assertEscrowIdentity(algorand, dex, poolId)
    })

    test('fungible curve: removeLiquidity is not blocked by a refused donation; adds still sync first', async () => {
      const poolId = await curvePool(fungible)
      const minted = await addLiquidity(algorand, dex, trader, poolId, 4_000_000n, 4_000_000n)
      await fungible.send.setMode({ args: { mode: CURVE_REFUSE_SETTLE }, ...send })
      await donate(poolId, 1n)
      const before = await pool(poolId)
      const out = await removeCall(poolId, trader, minted / 2n)
      expect(out).toEqual({
        amountA: ((minted / 2n) * before.reserveA) / before.lpSupply,
        amountB: ((minted / 2n) * before.reserveB) / before.lpSupply,
      })
      await assertEscrowIdentity(algorand, dex, poolId, 0n, 1n)
      // an add still books the surplus before the mint (no JIT capture), so it is still refused here
      await expectContractError(addCall(poolId, trader, 1_000n, 1_000n), 'errPdcv')
      await fungible.send.setMode({ args: { mode: CURVE_HONEST }, ...send })
      await addCall(poolId, trader, 1_000n, 1_000n)
      await assertEscrowIdentity(algorand, dex, poolId)
    })
  })

  // ------------------------------------------------------------------------------------------------
  describe('§10 A24 with the bins engine: 1 unit sent to the escrow while the active bin is empty', () => {
    let engine: BinEngineClient
    let X: bigint
    let Y: bigint
    let lp: TransactionSignerAccount

    const params: BinPoolParams = {
      binStep: 25n,
      activeId: IdCenter + 16n,
      baseFactor: 10_000n,
      varFeeControl: 0n,
      filterPeriod: 30n,
      decayPeriod: 600n,
      reductionFactor: 5_000n,
      maxVa: 350_000n,
      minBinShares: 1n << 32n, // the BinEngine floor (errBnMs below 2^32)
      maxBinsPerSwap: 64n,
    }

    /** engine.opUp() carriers holding `names` first (the engine is below 8,192 B), then the Vault call */
    const sendWith = async (names: Uint8Array[], build: (g: TransactionComposer) => Promise<unknown>, carriers = 2) => {
      const g = algorand.newGroup()
      for (let i = 0; i < carriers; i++) {
        g.addAppCallMethodCall(
          await engine.params.opUp({
            sender: admin.addr,
            signer: admin.signer,
            args: [],
            note: `carrier ${i}`,
            boxReferences: names.slice(8 * i, 8 * i + 8).map((name) => ({ appId: engine.appId, name })),
            maxFee: MAX_FEE,
          }),
        )
      }
      await build(g)
      const res = await g.send({ coverAppCallInnerTransactionFees: true, populateAppCallResources: true })
      return (res.returns ?? []).at(-1)?.returnValue as unknown
    }

    beforeAll(async () => {
      lp = await localnet.context.generateAccount({ initialFunds: (100).algo() })
      const mint = async (name: string) =>
        (
          await algorand.send.assetCreate({
            sender: admin.addr,
            total: 2n ** 64n - 1n,
            decimals: 0,
            assetName: name,
            unitName: name,
          })
        ).assetId
      X = await mint('BINX')
      Y = await mint('BINY')
      for (const asset of [X, Y]) {
        await algorand.send.assetOptIn({ sender: lp.addr, assetId: asset })
        await algorand.send.assetTransfer({ sender: admin.addr, receiver: lp.addr, assetId: asset, amount: 10n ** 12n })
      }
      engine = (
        await algorand.client
          .getTypedAppFactory(BinEngineFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
          .send.create.create({ args: { vault: dex.appId }, extraProgramPages: 3 })
      ).appClient
      await engine.appClient.fundAppAccount({ amount: (0.2).algo() })
      await dex.send.setCurveApproval({ args: { curve: engine.appId, lpMode: LP_CURVE, approved: true }, ...send })
      await engine.send.initBinStep({
        args: {
          mbr: algorand.createTransaction.payment({
            sender: admin.addr,
            receiver: engine.appAddress,
            amount: microAlgo(1_000_000),
          }),
          binStep: params.binStep,
        },
        ...send,
      })
    })

    test('removeLiquidityCurve pays the position and leaves the donation unbooked (no Settle on exits)', async () => {
      const poolId = (await dex.state.global.poolCursor())!
      const curveMbr = 1_000_000n
      const chunks = [params.activeId / BinsPerChunk, (params.activeId - 3n) / BinsPerChunk]
      const boxes = [
        poolBoxName(poolId),
        tableBoxName(params.binStep),
        ...[...new Set(chunks)].map((c) => chunkBoxName(poolId, c)),
      ]
      await sendWith(
        boxes,
        async (g) =>
          g.addAppCallMethodCall(
            await dex.params.createPool({
              sender: admin.addr,
              signer: admin.signer,
              args: {
                payment: algorand.createTransaction.payment({
                  sender: admin.addr,
                  receiver: dex.appAddress,
                  amount: microAlgo(3_000_000n + curveMbr),
                }),
                assetA: X,
                assetB: Y,
                config: poolConfig(25n, {
                  curve: engine.appId,
                  maxFeeBps: 1_000n,
                  custodyFeeBps: 25n,
                  curveMbr,
                  curveArgs: encodeInitArgs(params),
                }),
                hooks: [],
                externals: [],
              },
              maxFee: MAX_FEE,
            }),
          ),
        3,
      )
      const escrow = await escrowOf(poolId)
      const nextPosition = (await engine.state.global.positionCursor())!
      // all liquidity in one Y bin at delta −3: the active bin stays empty
      const added = (await sendWith([...boxes, positionBoxName(nextPosition)], async (g) =>
        g.addAppCallMethodCall(
          await dex.params.addLiquidityCurve({
            sender: lp.addr,
            signer: lp.signer,
            args: {
              mbr: algorand.createTransaction.payment({
                sender: lp.addr,
                receiver: dex.appAddress,
                amount: microAlgo(3_000_000n),
              }),
              depositA: transferTxn(algorand, lp, escrow, X, 1n),
              depositB: transferTxn(algorand, lp, escrow, Y, 1_000_000n),
              poolId,
              positionId: 0n,
              minShares: 0n,
              curveArgs: encodeAddArgs(params.activeId, 0n, [{ delta: -3n, distX: 0n, distY: FS }]),
              data: NO_DATA,
            },
            maxFee: MAX_FEE,
          }),
        ),
      )) as bigint[]
      const position = added[0]
      const bin = params.activeId - 3n

      const removeHalf = () =>
        sendWith([...boxes, positionBoxName(position)], async (g) =>
          g.addAppCallMethodCall(
            await dex.params.removeLiquidityCurve({
              sender: lp.addr,
              signer: lp.signer,
              args: {
                poolId,
                positionId: position,
                minAmountA: 0n,
                minAmountB: 0n,
                curveArgs: encodeRemoveArgs(bin, bin, FS / 2n),
                data: NO_DATA,
              },
              maxFee: MAX_FEE,
            }),
          ),
        )

      // a third party sends 1 unit of Y to the escrow while the active bin is empty. Exits do not depend on
      // where (or whether) the curve can place it: the remove never Settles, the unit stays unbooked
      await algorand.send.assetTransfer({ sender: admin.addr, receiver: escrow, assetId: Y, amount: 1n })
      const yBefore = await holding(algorand, lp.addr.toString(), Y)
      const out = (await removeHalf()) as bigint[]
      expect(out[1]).toBe(500_000n)
      expect((await holding(algorand, lp.addr.toString(), Y)) - yBefore).toBe(500_000n)
      expect((await removeHalf()) as bigint[]).toEqual([0n, 250_000n])
      await assertEscrowIdentity(algorand, dex, poolId, 0n, 1n)
      const info = await pool(poolId)
      expect([info.reserveA, info.reserveB]).toEqual([0n, 250_000n])
    })
  })
})
