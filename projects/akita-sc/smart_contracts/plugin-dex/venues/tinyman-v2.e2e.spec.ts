import { AlgorandClient, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { beforeAll, describe, expect, test } from 'vitest'
import { MockVenueProbeClient, MockVenueProbeFactory } from '../../artifacts/plugin-dex/tests/MockVenueProbeClient'
import { expectContractError } from '../../../tests/utils/errors'
import {
  addInitialLiquidity,
  bootstrapPool,
  deployTinymanV2,
  deriveTinymanPool,
  readPoolState,
  setFee,
  swapDirect,
  tinymanFixedInputOut,
  TinymanPool,
  TinymanV2,
  TM_DEFAULT_FEE_SHARE,
  TM_DEFAULT_PROTOCOL_FEE_RATIO,
  TM_LOCKED_POOL_TOKENS,
  TM_MIN_POOL_BALANCE,
} from '../../../tests/fixtures/external/tinyman-v2'

const MIN_FEE = 1_000n
const MAX_UINT64 = (1n << 64n) - 1n
const noAutoResources = { populateAppCallResources: false, coverAppCallInnerTransactionFees: false } as const

const isqrt = (n: bigint): bigint => {
  if (n < 2n) return n
  let x = n
  let y = (x + 1n) / 2n
  while (y < x) {
    x = y
    y = (x + n / x) / 2n
  }
  return x
}

describe('Tinyman v2 venue library', () => {
  const localnet = algorandFixture()
  let algorand: AlgorandClient
  let admin: TransactionSignerAccount
  let trader: TransactionSignerAccount
  let tm: TinymanV2
  let probe: MockVenueProbeClient
  let tka: bigint
  let tkb: bigint
  let algoPool: TinymanPool
  let asaPool: TinymanPool

  const holding = async (address: string, asset: bigint): Promise<bigint> =>
    asset === 0n
      ? (await algorand.account.getInformation(address)).balance.microAlgo
      : (await algorand.asset.getAccountInformation(address, asset)).balance

  const authAddr = async (address: string) => (await algorand.account.getInformation(address)).authAddr?.toString()

  const nonZero = (...assets: bigint[]) => assets.filter((a) => a !== 0n)

  const quote = async (assetIn: bigint, assetOut: bigint, amountIn: bigint) => {
    const pool = deriveTinymanPool(tm.appId, assetIn, assetOut)
    const { return: quoted } = await probe.send.quote({
      args: { tinyman: tm.appId, assetIn, assetOut, amountIn },
      accountReferences: [pool.address],
      appReferences: [tm.appId],
      ...noAutoResources,
    })
    return quoted!
  }

  /** A fresh account holding both test assets, used as the flash-rekeyed "spending account" */
  const newSpender = async () => {
    const spender = await localnet.context.generateAccount({ initialFunds: (50).algo() })
    for (const assetId of [tka, tkb]) {
      await algorand.send.assetOptIn({ sender: spender.addr, assetId })
      await algorand.send.assetTransfer({ sender: admin.addr, receiver: spender.addr, assetId, amount: 10n ** 9n })
    }
    return spender
  }

  /** [rekey spender → probe, probe.swapAs(spender, …)] with the probe call sent by `trader` */
  const probeSwap = async (
    spender: TransactionSignerAccount,
    assetIn: bigint,
    amountIn: bigint,
    assetOut: bigint,
    { minOut = 0n, carrierFee = 0n, rekey = true } = {},
  ) => {
    const pool = deriveTinymanPool(tm.appId, assetIn, assetOut)
    let group = probe.newGroup()
    if (rekey) {
      group = group.addTransaction(
        await algorand.createTransaction.payment({
          sender: spender.addr,
          receiver: spender.addr,
          amount: microAlgo(0),
          rekeyTo: probe.appAddress,
        }),
      )
    }
    // probe call + deposit + Tinyman appl + Tinyman payout, unless a carrier pays the inners
    const innerFees = carrierFee > 0n ? 0n : 3n * MIN_FEE
    const result = await group
      .swapAs({
        sender: trader.addr,
        args: { account: spender.addr.toString(), tinyman: tm.appId, assetIn, amountIn, assetOut, minOut, carrierFee },
        accountReferences: [spender.addr, pool.address],
        appReferences: [tm.appId],
        assetReferences: nonZero(assetIn, assetOut),
        staticFee: microAlgo(MIN_FEE + innerFees),
      })
      .send(noAutoResources)
    const [quoted, out] = result.returns[0] as [bigint, bigint]
    return { quoted, out }
  }

  beforeAll(async () => {
    await localnet.newScope()
    algorand = localnet.algorand
    admin = localnet.context.testAccount
    trader = await localnet.context.generateAccount({ initialFunds: (100).algo() })
    const dispenser = await algorand.account.dispenserFromEnvironment()
    await algorand.account.ensureFunded(admin.addr, dispenser.addr, (1_000).algo())

    for (const name of ['TMA', 'TMB']) {
      const { assetId } = await algorand.send.assetCreate({ sender: admin.addr, total: 10n ** 15n, decimals: 6, unitName: name })
      await algorand.send.assetOptIn({ sender: trader.addr, assetId })
      await algorand.send.assetTransfer({ sender: admin.addr, receiver: trader.addr, assetId, amount: 10n ** 12n })
      if (name === 'TMA') tka = assetId
      else tkb = assetId
    }

    tm = await deployTinymanV2(algorand, admin.addr)

    probe = (
      await algorand.client
        .getTypedAppFactory(MockVenueProbeFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
        .send.create.bare()
    ).appClient
    await probe.appClient.fundAppAccount({ amount: (1).algo() })
  })

  describe('fixture', () => {
    test('bootstraps an ALGO/ASA pool: lsig rekeyed to the AMM, default fees, min balance', async () => {
      algoPool = await bootstrapPool(tm, admin.addr, 0n, tka)
      expect(algoPool.asset1).toBe(tka)
      expect(algoPool.asset2).toBe(0n)
      expect(await authAddr(algoPool.address)).toBe(tm.appAddress)
      const info = await algorand.account.getInformation(algoPool.address)
      expect(info.minBalance.microAlgo).toBe(TM_MIN_POOL_BALANCE.algoPair)

      const state = (await readPoolState(tm, algoPool.address))!
      expect(state.asset1).toBe(tka)
      expect(state.asset2).toBe(0n)
      expect(state.lpAsset).toBe(algoPool.lpAsset)
      expect(state.feeShare).toBe(TM_DEFAULT_FEE_SHARE)
      expect(state.protocolFeeRatio).toBe(TM_DEFAULT_PROTOCOL_FEE_RATIO)
      expect(state.issued).toBe(0n)

      const minted = await addInitialLiquidity(tm, algoPool, admin.addr, 0n, 100_000_000n, 500_000_000n)
      expect(minted).toBe(isqrt(100_000_000n * 500_000_000n) - TM_LOCKED_POOL_TOKENS)
      const after = (await readPoolState(tm, algoPool.address))!
      expect(after.reserve1).toBe(500_000_000n)
      expect(after.reserve2).toBe(100_000_000n)
      expect(after.issued).toBe(minted + TM_LOCKED_POOL_TOKENS)
    })

    test('bootstraps an ASA/ASA pool', async () => {
      asaPool = await bootstrapPool(tm, admin.addr, tka, tkb)
      expect(asaPool.asset1).toBe(tkb > tka ? tkb : tka)
      expect(await authAddr(asaPool.address)).toBe(tm.appAddress)
      const info = await algorand.account.getInformation(asaPool.address)
      expect(info.minBalance.microAlgo).toBe(TM_MIN_POOL_BALANCE.asaPair)

      const minted = await addInitialLiquidity(tm, asaPool, admin.addr, tka, 1_000_000_000n, 3_000_000_000n)
      expect(minted).toBe(isqrt(1_000_000_000n * 3_000_000_000n) - TM_LOCKED_POOL_TOKENS)
      const state = (await readPoolState(tm, asaPool.address))!
      expect(tka === state.asset1 ? state.reserve1 : state.reserve2).toBe(1_000_000_000n)
      expect(tkb === state.asset1 ? state.reserve1 : state.reserve2).toBe(3_000_000_000n)
    })

    test('direct swaps equal the constant-product-with-fee formula and update reserves', async () => {
      const cases: [TinymanPool, bigint, bigint][] = [
        [algoPool, 0n, 7_000_000n],
        [algoPool, tka, 12_345_678n],
        [asaPool, tka, 50_000_000n],
        [asaPool, tkb, 9_999_999n],
      ]
      for (const [pool, assetIn, amountIn] of cases) {
        const before = (await readPoolState(tm, pool.address))!
        const expected = tinymanFixedInputOut(before, assetIn, amountIn)
        expect(expected).toBeGreaterThan(0n)
        const out = await swapDirect(tm, pool, trader.addr, assetIn, amountIn)
        expect(out).toBe(expected)

        const after = (await readPoolState(tm, pool.address))!
        const inIs1 = assetIn === before.asset1
        const totalFee = (amountIn * before.feeShare) / 10_000n
        const protocolFee = totalFee / before.protocolFeeRatio
        expect(inIs1 ? after.reserve1 : after.reserve2).toBe((inIs1 ? before.reserve1 : before.reserve2) + amountIn - protocolFee)
        expect(inIs1 ? after.reserve2 : after.reserve1).toBe((inIs1 ? before.reserve2 : before.reserve1) - out)
      }
    })

    test('setFee changes the pool fee and swaps follow it', async () => {
      await setFee(tm, algoPool, 36n, 4n)
      const state = (await readPoolState(tm, algoPool.address))!
      expect(state.feeShare).toBe(36n)
      expect(state.protocolFeeRatio).toBe(4n)
      const expected = tinymanFixedInputOut(state, 0n, 3_000_000n)
      expect(await swapDirect(tm, algoPool, trader.addr, 0n, 3_000_000n)).toBe(expected)
    })

    test('a dust input (zero fee) reverts in Tinyman', async () => {
      // 30..36 bps: any input below ceil(10_000 / fee) has total_fee == 0
      await expect(swapDirect(tm, algoPool, trader.addr, 0n, 100n)).rejects.toThrow()
    })
  })

  describe('library', () => {
    test('tmPoolAddress equals the off-chain logicsig address for either asset order', async () => {
      for (const [a, b] of [
        [0n, tka],
        [tka, 0n],
        [tka, tkb],
        [tkb, tka],
      ]) {
        const { return: address } = await probe.send.poolAddress({ args: { tinyman: tm.appId, assetA: a, assetB: b } })
        expect(address).toBe(deriveTinymanPool(tm.appId, a, b).address)
      }
      expect(deriveTinymanPool(tm.appId, 0n, tka).address).toBe(algoPool.address)
      expect(deriveTinymanPool(tm.appId, tkb, tka).address).toBe(asaPool.address)
    })

    test('tmReadPool matches the pool local state', async () => {
      for (const pool of [algoPool, asaPool]) {
        const state = (await readPoolState(tm, pool.address))!
        const { return: read } = await probe.send.readPool({
          args: { tinyman: tm.appId, pool: pool.address },
          accountReferences: [pool.address],
          appReferences: [tm.appId],
          ...noAutoResources,
        })
        expect(read).toEqual({
          exists: true,
          asset1: state.asset1,
          asset2: state.asset2,
          lpAsset: state.lpAsset,
          reserve1: state.reserve1,
          reserve2: state.reserve2,
          issued: state.issued,
          feeShare: state.feeShare,
          protocolFeeRatio: state.protocolFeeRatio,
          lock: state.lock,
        })
      }
    })

    test('tmQuoteFixedInput equals the TS formula in both directions on both pools', async () => {
      for (const [pool, assetIn, assetOut, amountIn] of [
        [algoPool, 0n, tka, 2_500_000n],
        [algoPool, tka, 0n, 40_000_000n],
        [asaPool, tka, tkb, 1_234_567n],
        [asaPool, tkb, tka, 77_777_777n],
      ] as [TinymanPool, bigint, bigint, bigint][]) {
        const state = await readPoolState(tm, pool.address)
        const expected = tinymanFixedInputOut(state, assetIn, amountIn)
        expect(expected).toBeGreaterThan(0n)
        expect(await quote(assetIn, assetOut, amountIn)).toBe(expected)
      }
    })

    test('tmQuoteFixedInput returns 0 instead of reverting when the leg is unavailable', async () => {
      // unbootstrapped pair: no local state at the derived address
      const { assetId: tkc } = await algorand.send.assetCreate({ sender: admin.addr, total: 10n ** 15n, decimals: 6, unitName: 'TMC' })
      expect(await readPoolState(tm, deriveTinymanPool(tm.appId, 0n, tkc).address)).toBeUndefined()
      expect(await quote(0n, tkc, 1_000_000n)).toBe(0n)
      expect(await quote(tkb, 0n, 1_000_000n)).toBe(0n)
      // same asset on both sides
      expect(await quote(tka, tka, 1_000_000n)).toBe(0n)
      // zero input and dust input (total fee rounds to 0, which reverts in Tinyman)
      expect(await quote(0n, tka, 0n)).toBe(0n)
      expect(await quote(0n, tka, 100n)).toBe(0n)
      // smallest input with a non-zero fee at 36 bps quotes normally
      expect(await quote(0n, tka, 278n)).toBe(tinymanFixedInputOut(await readPoolState(tm, algoPool.address), 0n, 278n))
      // inputs that would overflow the AMM's uint64 math
      expect(await quote(0n, tka, MAX_UINT64)).toBe(0n)
      expect(await quote(tka, tkb, MAX_UINT64 / 20n)).toBe(0n) // in * 30 bps overflows
    })

    test('a bootstrapped but empty pool quotes 0', async () => {
      const { assetId: tkd } = await algorand.send.assetCreate({ sender: admin.addr, total: 10n ** 15n, decimals: 6, unitName: 'TMD' })
      await bootstrapPool(tm, admin.addr, 0n, tkd)
      expect(await quote(0n, tkd, 1_000_000n)).toBe(0n)
    })
  })

  describe('MockVenueProbe swapping as a rekeyed account', () => {
    test('ALGO in: output equals the quote and the account is handed back', async () => {
      const spender = await newSpender()
      const address = spender.addr.toString()
      const state = await readPoolState(tm, algoPool.address)
      const expected = tinymanFixedInputOut(state, 0n, 5_000_000n)
      const algoBefore = await holding(address, 0n)
      const tkaBefore = await holding(address, tka)

      const { quoted, out } = await probeSwap(spender, 0n, 5_000_000n, tka)
      expect(quoted).toBe(expected)
      expect(out).toBe(quoted)
      expect(await authAddr(address)).toBeUndefined()
      expect(await holding(address, tka)).toBe(tkaBefore + out)
      // the deposit plus the spender's own rekey txn fee; every inner sent as the spender has fee 0
      expect(await holding(address, 0n)).toBe(algoBefore - 5_000_000n - MIN_FEE)
    })

    test('ASA in, ALGO out: output equals the quote and the account is handed back', async () => {
      const spender = await newSpender()
      const address = spender.addr.toString()
      const expected = tinymanFixedInputOut(await readPoolState(tm, algoPool.address), tka, 20_000_000n)
      const algoBefore = await holding(address, 0n)
      const tkaBefore = await holding(address, tka)

      const { quoted, out } = await probeSwap(spender, tka, 20_000_000n, 0n)
      expect(quoted).toBe(expected)
      expect(out).toBe(quoted)
      expect(await authAddr(address)).toBeUndefined()
      expect(await holding(address, tka)).toBe(tkaBefore - 20_000_000n)
      expect(await holding(address, 0n)).toBe(algoBefore + out - MIN_FEE)
    })

    test('ASA/ASA: output equals the quote and the account is handed back', async () => {
      const spender = await newSpender()
      const address = spender.addr.toString()
      const expected = tinymanFixedInputOut(await readPoolState(tm, asaPool.address), tkb, 33_000_000n)
      const tkaBefore = await holding(address, tka)

      const { quoted, out } = await probeSwap(spender, tkb, 33_000_000n, tka)
      expect(quoted).toBe(expected)
      expect(out).toBe(quoted)
      expect(await authAddr(address)).toBeUndefined()
      expect(await holding(address, tka)).toBe(tkaBefore + out)
    })

    test('a fee-carrying inner payment from the app pays the swap inners', async () => {
      const spender = await newSpender()
      const probeBefore = await holding(probe.appAddress.toString(), 0n)
      // carrier + deposit + Tinyman appl + Tinyman payout
      const carrierFee = 4n * MIN_FEE
      const { quoted, out } = await probeSwap(spender, 0n, 1_000_000n, tka, { carrierFee })
      expect(out).toBe(quoted)
      expect(await authAddr(spender.addr.toString())).toBeUndefined()
      expect(await holding(probe.appAddress.toString(), 0n)).toBe(probeBefore - carrierFee)
    })

    test('minOut above the output reverts in Tinyman and the rekey is rolled back', async () => {
      const spender = await newSpender()
      const quoted = await quote(0n, tka, 1_000_000n)
      await expect(probeSwap(spender, 0n, 1_000_000n, tka, { minOut: quoted + 1n })).rejects.toThrow()
      expect(await authAddr(spender.addr.toString())).toBeUndefined()
      // and exactly the quote passes
      const { out } = await probeSwap(spender, 0n, 1_000_000n, tka, { minOut: quoted })
      expect(out).toBe(quoted)
    })

    test('the probe refuses an account that is not rekeyed to it', async () => {
      const spender = await newSpender()
      await expectContractError(probeSwap(spender, 0n, 1_000_000n, tka, { rekey: false }), 'errProbeCustody')
    })
  })
})
