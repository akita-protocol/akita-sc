import { AlgorandClient, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { ALGORAND_ZERO_ADDRESS_STRING, getApplicationAddress } from 'algosdk'
import { beforeAll, describe, expect, test } from 'vitest'
import { PluginDexClient, PluginDexComposer } from '../artifacts/plugin-dex/PluginDexClient'
import { ImpactFeeHookFactory } from '../artifacts/plugin-dex/hooks/ImpactFeeHookClient'
import { SwapTaxHookClient, SwapTaxHookFactory } from '../artifacts/plugin-dex/hooks/SwapTaxHookClient'
import { MockDexHookClient, MockDexHookFactory } from '../artifacts/plugin-dex/tests/MockDexHookClient'
import { expectContractError } from '../../tests/utils/errors'
import { deployVault, emptyBoxRef, hookFromTuple, poolConfig, readQuotaEmptyRefs } from '../../tests/fixtures/plugin-dex'

// hook points
const AFTER_INITIALIZE = 1n
const BEFORE_REMOVE = 8n
const BEFORE_SWAP = 32n
const AFTER_SWAP = 64n
const QUOTE = 128n
// hook permissions
const CUSTODY = 1n
const DYNAMIC_FEE = 2n
const HOOK_FEE = 4n
// MockDexHook modes
const MODE = { pass: 0n, steal: 1n, keepRekey: 2n, donate: 3n, rekeyElsewhere: 4n, setFee: 5n, hookFee: 6n, trade: 7n }

const MINIMUM_LIQUIDITY = 1_000n
const NO_DATA = new Uint8Array()
const send = { maxFee: microAlgo(200_000), coverAppCallInnerTransactionFees: true, populateAppCallResources: true }

type Hook = [bigint, bigint, bigint]

const bigEndian8 = (n: bigint) => Array.from({ length: 8 }, (_, i) => Number((n >> BigInt(8 * (7 - i))) & 0xffn))

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

const expectedOut = (amountIn: bigint, reserveIn: bigint, reserveOut: bigint, feeBps: bigint) => {
  const effective = amountIn - (amountIn * feeBps) / 10_000n
  return (effective * reserveOut) / (reserveIn + effective)
}

describe('PluginDex (hook DEX)', () => {
  const localnet = algorandFixture()
  let algorand: AlgorandClient
  let admin: TransactionSignerAccount
  let trader: TransactionSignerAccount
  let dex: PluginDexClient
  let mock: MockDexHookClient
  let tax: SwapTaxHookClient
  let impactFeeHook: bigint
  let tka: bigint
  let tkb: bigint

  const holding = async (address: string, asset: bigint): Promise<bigint> => {
    if (asset === 0n) {
      const info = await algorand.account.getInformation(address)
      return info.balance.microAlgo - info.minBalance.microAlgo
    }
    return (await algorand.asset.getAccountInformation(address, asset)).balance
  }

  const transfer = (sender: TransactionSignerAccount, receiver: string, asset: bigint, amount: bigint) =>
    asset === 0n
      ? algorand.createTransaction.payment({ sender: sender.addr, receiver, amount: microAlgo(amount) })
      : algorand.createTransaction.assetTransfer({ sender: sender.addr, receiver, assetId: asset, amount })

  const createPool = async (assetA: bigint, assetB: bigint, feeBps: bigint, hooks: Hook[] = [], maxHookFeeBps = 0n) => {
    const { return: poolId } = await dex.send.createPool({
      args: {
        payment: algorand.createTransaction.payment({ sender: admin.addr, receiver: dex.appAddress, amount: (3).algo() }),
        assetA,
        assetB,
        config: poolConfig(feeBps, { maxHookFeeBps }),
        hooks: hooks.map(hookFromTuple),
        externals: [],
      },
      ...send,
    })
    const pool = await dex.getPool({ args: { poolId: poolId! } })
    await algorand.send.assetOptIn({ sender: trader.addr, assetId: pool.lpAsset })
    await algorand.send.assetOptIn({ sender: admin.addr, assetId: pool.lpAsset })
    return { poolId: poolId!, escrow: getApplicationAddress(pool.escrow).toString(), lpAsset: pool.lpAsset }
  }

  const addLiquidity = async (account: TransactionSignerAccount, poolId: bigint, amountA: bigint, amountB: bigint) => {
    const pool = await dex.getPool({ args: { poolId } })
    const escrow = getApplicationAddress(pool.escrow).toString()
    const { return: minted } = await dex.send.addLiquidity({
      sender: account.addr,
      args: {
        depositA: transfer(account, escrow, pool.assetA, amountA),
        depositB: transfer(account, escrow, pool.assetB, amountB),
        poolId,
        minLpOut: 0n,
        data: NO_DATA,
      },
      ...send,
    })
    return minted!
  }

  // On a hooked pool one opUp() reference carrier goes first: algokit 9.2.2 adds the asset again for every
  // asset holding it places, so a hooked swap overflows the 8 references of one call once the Vault needs a
  // third box ref for its read quota (FINAL-SPEC §10 A11).
  const swap = async (poolId: bigint, assetIn: bigint, amountIn: bigint, minAmountOut = 0n) => {
    const pool = await dex.getPool({ args: { poolId } })
    let group = dex.newGroup() as PluginDexComposer<unknown[]>
    if (pool.hookPoints !== 0n) {
      group = group.opUp({ sender: trader.addr, args: [], note: 'reference carrier', maxFee: send.maxFee }) as PluginDexComposer<
        unknown[]
      >
    }
    group = group.swap({
      sender: trader.addr,
      args: {
        input: transfer(trader, getApplicationAddress(pool.escrow).toString(), assetIn, amountIn),
        poolId,
        minAmountOut,
        recipient: ALGORAND_ZERO_ADDRESS_STRING,
        data: NO_DATA,
        wallet: 0n,
      },
      maxFee: send.maxFee,
    }) as PluginDexComposer<unknown[]>
    const { returns } = await group.send({ coverAppCallInnerTransactionFees: true, populateAppCallResources: true })
    return returns.at(-1) as unknown as bigint
  }

  const quote = async (poolId: bigint, assetIn: bigint, amountIn: bigint) =>
    (await dex.send.quote({ args: { poolId, assetIn, amountIn, swapper: ALGORAND_ZERO_ADDRESS_STRING, data: NO_DATA, wallet: 0n }, ...send })).return!

  beforeAll(async () => {
    await localnet.newScope()
    algorand = localnet.algorand
    admin = localnet.context.testAccount
    trader = await localnet.context.generateAccount({ initialFunds: (500).algo() })
    const dispenser = await algorand.account.dispenserFromEnvironment()
    await algorand.account.ensureFunded(admin.addr, dispenser.addr, (1_000).algo())

    for (const name of ['TKA', 'TKB']) {
      const { assetId } = await algorand.send.assetCreate({ sender: admin.addr, total: 10n ** 15n, decimals: 6, unitName: name })
      await algorand.send.assetOptIn({ sender: trader.addr, assetId })
      await algorand.send.assetTransfer({ sender: admin.addr, receiver: trader.addr, assetId, amount: 10n ** 12n })
      if (name === 'TKA') tka = assetId
      else tkb = assetId
    }

    dex = await deployVault({ algorand, sender: admin })

    mock = (
      await algorand.client
        .getTypedAppFactory(MockDexHookFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
        .send.create.create({ args: { dex: dex.appId } })
    ).appClient
    await mock.appClient.fundAppAccount({ amount: (10).algo() })

    impactFeeHook = (
      await algorand.client
        .getTypedAppFactory(ImpactFeeHookFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
        .send.create.create({ args: { dex: dex.appId, minFeeBps: 10n, maxFeeBps: 500n, slopeBps: 5_000n } })
    ).appClient.appId

    tax = (
      await algorand.client
        .getTypedAppFactory(SwapTaxHookFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
        .send.create.create({ args: { dex: dex.appId, owner: admin.addr.toString(), taxBps: 100n } })
    ).appClient
    await tax.appClient.fundAppAccount({ amount: (1).algo() })
    await tax.send.optIn({ args: { asset: tka }, ...send })

    await dex.send.setHookApproval({ args: { hook: mock.appId, perms: CUSTODY | HOOK_FEE }, ...send })
    await dex.send.setHookApproval({ args: { hook: impactFeeHook, perms: DYNAMIC_FEE }, ...send })
    await dex.send.setHookApproval({ args: { hook: tax.appId, perms: HOOK_FEE }, ...send })
  })

  describe('constant-product core', () => {
    let poolId: bigint
    let escrow: string
    let lpAsset: bigint

    test('createPool charges only the measured cost and refunds the rest', async () => {
      const before = (await algorand.account.getInformation(admin.addr)).balance.microAlgo
      ;({ poolId, escrow, lpAsset } = await createPool(0n, tka, 30n))
      const after = (await algorand.account.getInformation(admin.addr)).balance.microAlgo
      // 3 ALGO was sent; the escrow app, its funding, the LP asset and boxes cost well under 1 ALGO
      expect(before - after).toBeLessThan(1_000_000n)

      const pool = await dex.getPool({ args: { poolId } })
      expect(pool.assetA).toBe(0n)
      expect(pool.assetB).toBe(tka)
      const escrowInfo = await algorand.account.getInformation(escrow)
      expect(escrowInfo.authAddr?.toString()).toBe(dex.appAddress.toString())
      expect(await dex.getPairPools({ args: { assetA: 0n, assetB: tka } })).toEqual([poolId])
    })

    test('first deposit mints sqrt(a*b) minus the locked minimum', async () => {
      const minted = await addLiquidity(trader, poolId, 10_000_000n, 50_000_000n)
      expect(minted).toBe(isqrt(10_000_000n * 50_000_000n) - MINIMUM_LIQUIDITY)
      expect(await holding(trader.addr.toString(), lpAsset)).toBe(minted)

      const pool = await dex.getPool({ args: { poolId } })
      expect(pool.reserveA).toBe(10_000_000n)
      expect(pool.reserveB).toBe(50_000_000n)
    })

    test('unbalanced deposit mints from the limiting side and refunds the excess', async () => {
      const before = await holding(trader.addr.toString(), tka)
      const pool = await dex.getPool({ args: { poolId } })
      const minted = await addLiquidity(trader, poolId, 1_000_000n, 9_000_000n)
      expect(minted).toBe((1_000_000n * pool.lpSupply) / pool.reserveA)
      // only 5 TKA per ALGO is needed at a 1:5 price, so 4M of the 9M TKA comes back
      expect(before - (await holding(trader.addr.toString(), tka))).toBe(5_000_000n)
    })

    test('swap pays exactly the quoted constant-product output', async () => {
      const pool = await dex.getPool({ args: { poolId } })
      const quoted = await quote(poolId, 0n, 1_000_000n)
      expect(quoted).toBe(expectedOut(1_000_000n, pool.reserveA, pool.reserveB, 30n))

      const before = await holding(trader.addr.toString(), tka)
      expect(await swap(poolId, 0n, 1_000_000n)).toBe(quoted)
      expect((await holding(trader.addr.toString(), tka)) - before).toBe(quoted)

      const after = await dex.getPool({ args: { poolId } })
      expect(after.reserveA * after.reserveB).toBeGreaterThan(pool.reserveA * pool.reserveB)
    })

    test('swap honours minAmountOut', async () => {
      const quoted = await quote(poolId, tka, 1_000_000n)
      await expectContractError(swap(poolId, tka, 1_000_000n, quoted + 1n), 'errPdsl')
      expect(await swap(poolId, tka, 1_000_000n, quoted)).toBe(quoted)
    })

    test('escrow balances always equal reserves plus protocol fees', async () => {
      const pool = await dex.getPool({ args: { poolId } })
      expect(await holding(escrow, 0n)).toBe(pool.reserveA + pool.protocolFeesA)
      expect(await holding(escrow, tka)).toBe(pool.reserveB + pool.protocolFeesB)
    })

    test('removeLiquidity returns a pro-rata share', async () => {
      const pool = await dex.getPool({ args: { poolId } })
      const lp = (await holding(trader.addr.toString(), lpAsset)) / 2n
      const { return: out } = await dex.send.removeLiquidity({
        sender: trader.addr,
        args: {
          lpTransfer: algorand.createTransaction.assetTransfer({ sender: trader.addr, receiver: dex.appAddress, assetId: lpAsset, amount: lp }),
          poolId,
          minAmountA: 0n,
          minAmountB: 0n,
          data: NO_DATA,
        },
        ...send,
      })
      expect(out!.amountA).toBe((lp * pool.reserveA) / pool.lpSupply)
      expect(out!.amountB).toBe((lp * pool.reserveB) / pool.lpSupply)
    })

    test('swapRoute hops escrow to escrow and matches quoteRoute', async () => {
      const second = await createPool(tka, tkb, 30n)
      const tkbPool = await dex.getPool({ args: { poolId: second.poolId } })
      await addLiquidity(trader, second.poolId, 20_000_000n, 20_000_000n)
      expect(tkbPool.assetA).toBe(tka)

      const route = [poolId, second.poolId]
      const pools = await Promise.all(route.map((id) => dex.getPool({ args: { poolId: id } })))
      const quoted = (await dex.send.quoteRoute({ args: { route, assetIn: 0n, amountIn: 500_000n, swapper: ALGORAND_ZERO_ADDRESS_STRING, data: NO_DATA, wallet: 0n }, ...send })).return!
      expect(quoted).toBeGreaterThan(0n)
      const before = await holding(trader.addr.toString(), tkb)
      const boxes = route.map((id) => ({ appId: dex.appId, name: new Uint8Array([0x70, ...bigEndian8(id)]) }))
      // plus empty refs for the read quota of the Vault program above 8,192 B (FINAL-SPEC §10 A11)
      const empty = await readQuotaEmptyRefs(algorand, dex, boxes)
      const { return: out } = await dex.send.swapRoute({
        sender: trader.addr,
        args: {
          input: transfer(trader, escrow, 0n, 500_000n),
          route,
          minAmountOut: quoted,
          recipient: ALGORAND_ZERO_ADDRESS_STRING,
          data: NO_DATA,
          wallet: 0n,
        },
        // algokit's resource population regroups this call incorrectly ("incomplete group"),
        // so the references simulate reports are passed explicitly
        populateAppCallResources: false,
        appReferences: [pools[0].escrow, pools[1].escrow],
        assetReferences: [tka, tkb],
        boxReferences: [...boxes, ...Array.from({ length: empty }, emptyBoxRef)],
        staticFee: microAlgo(20_000),
      })
      expect(out).toBe(quoted)
      expect((await holding(trader.addr.toString(), tkb)) - before).toBe(quoted)
    })
  })

  describe('pricing hooks', () => {
    test('ImpactFeeHook raises the fee with trade size, and quotes match swaps', async () => {
      const { poolId } = await createPool(0n, tka, 30n, [[impactFeeHook, BEFORE_SWAP | QUOTE, DYNAMIC_FEE]])
      await addLiquidity(trader, poolId, 10_000_000n, 10_000_000n)

      // 10% of reserves: impact 1000 bps * slope 0.5 + 10 bps floor = 510 bps, capped at 500
      const pool = await dex.getPool({ args: { poolId } })
      const quoted = await quote(poolId, 0n, 1_000_000n)
      expect(quoted).toBe(expectedOut(1_000_000n, pool.reserveA, pool.reserveB, 500n))
      expect(await swap(poolId, 0n, 1_000_000n)).toBe(quoted)

      // #21 (option b): the hook returns max(running fee, its fee), so a small trade whose impact fee
      // (~0.1% of reserves: 10 + 10·0.5 = 15 bps) is below the 30 bps base fee pays the base fee (v1 charged 15)
      const after = await dex.getPool({ args: { poolId } })
      const small = await quote(poolId, 0n, 10_000n)
      expect(small).toBe(expectedOut(10_000n, after.reserveA, after.reserveB, 30n))
      expect(await swap(poolId, 0n, 10_000n)).toBe(small)
    })

    test('SwapTaxHook takes its tax from the input and the DEX pays it to the hook', async () => {
      const { poolId } = await createPool(0n, tka, 30n, [[tax.appId, BEFORE_SWAP | QUOTE, HOOK_FEE]], 200n)
      await addLiquidity(trader, poolId, 10_000_000n, 10_000_000n)

      const pool = await dex.getPool({ args: { poolId } })
      const taxed = 10_000n // 1% of 1M
      const quoted = await quote(poolId, tka, 1_000_000n)
      expect(quoted).toBe(expectedOut(1_000_000n - taxed, pool.reserveB, pool.reserveA, 30n))

      const before = await holding(tax.appAddress.toString(), tka)
      expect(await swap(poolId, tka, 1_000_000n)).toBe(quoted)
      expect((await holding(tax.appAddress.toString(), tka)) - before).toBe(taxed)
    })

    test('a hook fee above the pool cap reverts', async () => {
      const { poolId } = await createPool(0n, tka, 30n, [[mock.appId, BEFORE_SWAP | QUOTE, HOOK_FEE]], 100n)
      await addLiquidity(trader, poolId, 10_000_000n, 10_000_000n)
      await mock.send.configure({ args: { mode: MODE.hookFee, value: 20_000n, value2: 0n, target: ALGORAND_ZERO_ADDRESS_STRING }, ...send })
      await expectContractError(swap(poolId, 0n, 1_000_000n), 'errPdhf')
    })
  })

  describe('custody hooks (flash rekey of the pool escrow)', () => {
    let poolId: bigint
    let escrow: string

    const configure = (mode: bigint, value = 0n, value2 = 0n, target = ALGORAND_ZERO_ADDRESS_STRING) =>
      mock.send.configure({ args: { mode, value, value2, target }, ...send })

    beforeAll(async () => {
      await configure(MODE.pass)
      ;({ poolId, escrow } = await createPool(0n, tkb, 30n, [[mock.appId, AFTER_INITIALIZE | BEFORE_SWAP | AFTER_SWAP | BEFORE_REMOVE, CUSTODY]]))
      await mock.send.optIn({ args: { asset: tkb }, ...send })
      await addLiquidity(trader, poolId, 10_000_000n, 10_000_000n)
    })

    test('a well-behaved hook gets the escrow and hands it back at every point', async () => {
      const callsBefore = (await mock.state.global.calls())!
      await swap(poolId, 0n, 100_000n)
      expect((await mock.state.global.calls())! - callsBefore).toBe(2n)
      expect((await mock.state.global.lastPoint())!).toBe(AFTER_SWAP)
      expect((await algorand.account.getInformation(escrow)).authAddr?.toString()).toBe(dex.appAddress.toString())
    })

    test('taking pool funds breaks the k invariant and reverts', async () => {
      await configure(MODE.steal, 1_000n)
      await expectContractError(swap(poolId, 0n, 100_000n), 'errPdki')
    })

    test('keeping the escrow rekeyed reverts', async () => {
      await configure(MODE.keepRekey)
      await expectContractError(swap(poolId, 0n, 100_000n), 'errPdrb')
    })

    test('rekeying the escrow anywhere but the DEX reverts', async () => {
      await configure(MODE.rekeyElsewhere, 0n, 0n, trader.addr.toString())
      await expectContractError(swap(poolId, 0n, 100_000n), 'errPdrb')
    })

    test('a donation under custody is booked into reserves', async () => {
      await configure(MODE.donate, 50_000n)
      const before = await dex.getPool({ args: { poolId } })
      await swap(poolId, tkb, 100_000n)
      const after = await dex.getPool({ args: { poolId } })
      // two donations (before + after swap) of 50k ALGO each, minus the swap output
      const out = expectedOut(100_000n, before.reserveB + 0n, before.reserveA + 50_000n, 30n)
      expect(after.reserveA).toBe(before.reserveA + 100_000n - out)
      expect(await holding(escrow, 0n)).toBe(after.reserveA + after.protocolFeesA)
    })

    test('a trade at or better than the curve is allowed, a worse one is not', async () => {
      const pool = await dex.getPool({ args: { poolId } })
      const takeB = 100_000n
      // ALGO needed to keep k: ceil(A*B / (B - takeB)) - A, plus margin for the swap's own change
      const fairAlgo = (pool.reserveA * pool.reserveB + (pool.reserveB - takeB) - 1n) / (pool.reserveB - takeB) - pool.reserveA
      await configure(MODE.trade, takeB, fairAlgo * 2n)
      await swap(poolId, 0n, 10_000n)

      await configure(MODE.trade, takeB, fairAlgo / 2n)
      await expectContractError(swap(poolId, 0n, 10_000n), 'errPdki')
    })

    test('a custody-only hook cannot change fees', async () => {
      await configure(MODE.setFee, 0n)
      await expectContractError(swap(poolId, 0n, 100_000n), 'errPdhm')
    })

    test('a paused pool lets LPs exit without running hooks', async () => {
      const pool = await dex.getPool({ args: { poolId } })
      await configure(MODE.steal, 1_000n)
      await dex.send.setPoolPaused({ args: { poolId, paused: true }, ...send })

      const lp = await holding(trader.addr.toString(), pool.lpAsset)
      const lpTransfer = () =>
        algorand.createTransaction.assetTransfer({ sender: trader.addr, receiver: dex.appAddress, assetId: pool.lpAsset, amount: lp })

      await expectContractError(swap(poolId, 0n, 100_000n), 'errPdpp')
      await expectContractError(
        dex.send.removeLiquidity({ sender: trader.addr, args: { lpTransfer: lpTransfer(), poolId, minAmountA: 0n, minAmountB: 0n, data: NO_DATA }, ...send }),
        'errPdki',
      )
      const { return: out } = await dex.send.emergencyRemoveLiquidity({
        sender: trader.addr,
        args: { lpTransfer: lpTransfer(), poolId, minAmountA: 0n, minAmountB: 0n },
        ...send,
      })
      expect(out!.amountA).toBeGreaterThan(0n)
      await configure(MODE.pass)
    })
  })

  describe('hook installation', () => {
    test('rejects unapproved hooks', async () => {
      await expectContractError(createPool(0n, tka, 30n, [[dex.appId, BEFORE_SWAP, 0n]]), 'errPdha')
    })

    test('rejects permissions beyond the approval', async () => {
      await expectContractError(createPool(0n, tka, 30n, [[impactFeeHook, BEFORE_SWAP | QUOTE, DYNAMIC_FEE | CUSTODY]]), 'errPdha')
    })

    test('rejects pricing hooks that do not answer quotes', async () => {
      await expectContractError(createPool(0n, tka, 30n, [[impactFeeHook, BEFORE_SWAP, DYNAMIC_FEE]]), 'errPdhc')
    })

    test('rejects duplicate hooks', async () => {
      await expectContractError(
        createPool(0n, tka, 30n, [
          [mock.appId, BEFORE_SWAP, 0n],
          [mock.appId, AFTER_SWAP, 0n],
        ]),
        'errPdhc',
      )
    })
  })
})
