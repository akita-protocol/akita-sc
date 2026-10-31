import { AlgorandClient, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { ALGORAND_ZERO_ADDRESS_STRING, getApplicationAddress } from 'algosdk'
import { beforeAll, describe, expect, test } from 'vitest'
import { PluginDexClient } from '../artifacts/plugin-dex/PluginDexClient'
import { deployVault, poolConfig } from '../../tests/fixtures/plugin-dex'

// Randomized (seeded) sequences of swaps, adds, removes, donations and syncs on a native constant-product
// pool, checking after every step what must hold for LPs whatever the order of operations:
// the escrow covers the booked reserves and protocol fees, an LP share never loses value, quotes equal
// swaps, swaps match the exact constant-product model, and at the end every LP can leave.

const NO_DATA = new Uint8Array()
const MINIMUM_LIQUIDITY = 1_000n
const FEE_BPS = 30n
const PROTOCOL_FEE_BPS = 2_000n
const send = { maxFee: microAlgo(200_000), coverAppCallInnerTransactionFees: true, populateAppCallResources: true }

/** the Vault's native swap: floor fee, floor protocol share, floor output */
const model = (amountIn: bigint, reserveIn: bigint, reserveOut: bigint) => {
  const lpFee = (amountIn * FEE_BPS) / 10_000n
  const protocolFee = (lpFee * PROTOCOL_FEE_BPS) / 10_000n
  const effective = amountIn - lpFee
  return { out: (effective * reserveOut) / (reserveIn + effective), protocolFee }
}

describe('PluginDex native pool invariants (randomized)', () => {
  const localnet = algorandFixture()
  let algorand: AlgorandClient
  let admin: TransactionSignerAccount
  let users: TransactionSignerAccount[]
  let dex: PluginDexClient
  let tka: bigint
  let tkb: bigint

  let seed = 0x5eedn
  const rand = (m: bigint) => {
    seed = (seed * 6364136223846793005n + 1442695040888963407n) % 2n ** 64n
    return (seed >> 11n) % m
  }

  const holding = async (address: string, asset: bigint) =>
    (await algorand.asset.getAccountInformation(address, asset)).balance

  const transfer = (sender: TransactionSignerAccount, receiver: string, asset: bigint, amount: bigint) =>
    algorand.createTransaction.assetTransfer({ sender: sender.addr, receiver, assetId: asset, amount })

  beforeAll(async () => {
    await localnet.newScope()
    algorand = localnet.algorand
    admin = localnet.context.testAccount
    const dispenser = await algorand.account.dispenserFromEnvironment()
    await algorand.account.ensureFunded(admin.addr, dispenser.addr, (100).algo())
    users = []
    for (let i = 0; i < 3; i++) users.push(await localnet.context.generateAccount({ initialFunds: (50).algo() }))

    for (const name of ['TKA', 'TKB']) {
      const { assetId } = await algorand.send.assetCreate({ sender: admin.addr, total: 10n ** 18n, decimals: 6, unitName: name })
      for (const user of users) {
        await algorand.send.assetOptIn({ sender: user.addr, assetId })
        await algorand.send.assetTransfer({ sender: admin.addr, receiver: user.addr, assetId, amount: 10n ** 15n })
      }
      if (name === 'TKA') tka = assetId
      else tkb = assetId
    }
    dex = await deployVault({ algorand, sender: admin })
    await algorand.send.assetOptIn({ sender: admin.addr, assetId: tka }).catch(() => undefined)
    await dex.send.setProtocolFee({ args: { protocolFeeBps: PROTOCOL_FEE_BPS, treasury: admin.addr.toString() }, ...send })
  }, 120_000)

  test('adds off the pool ratio on a two-ASA hookless pool succeed (the excess is refunded)', async () => {
    const { return: poolId } = await dex.send.createPool({
      args: {
        payment: algorand.createTransaction.payment({ sender: admin.addr, receiver: dex.appAddress, amount: (3).algo() }),
        assetA: tka,
        assetB: tkb,
        config: poolConfig(FEE_BPS),
        hooks: [],
        externals: [],
      },
      ...send,
    })
    const pool = await dex.getPool({ args: { poolId: poolId! } })
    const escrow = getApplicationAddress(pool.escrow).toString()
    await algorand.send.assetOptIn({ sender: users[1].addr, assetId: pool.lpAsset }).catch(() => undefined)
    const add = (a: bigint, b: bigint) =>
      dex.send.addLiquidity({
        sender: users[1].addr,
        args: { depositA: transfer(users[1], escrow, tka, a), depositB: transfer(users[1], escrow, tkb, b), poolId: poolId!, minLpOut: 0n, data: NO_DATA },
        ...send,
      })
    await add(5_000_000_000n, 2_000_000_000n)
    for (const [a, b] of [
      [1_000_000_000n, 1_500_000_000n],
      [1_500_000_000n, 100_000_000n],
      [400n, 7n],
    ]) {
      const tkaBefore = await holding(users[1].addr.toString(), tka)
      const tkbBefore = await holding(users[1].addr.toString(), tkb)
      const { return: minted } = await add(a, b)
      expect(minted).toBeGreaterThan(0n)
      // exactly one side is fully used; the other is refunded down to the pool ratio
      const usedA = tkaBefore - (await holding(users[1].addr.toString(), tka))
      const usedB = tkbBefore - (await holding(users[1].addr.toString(), tkb))
      expect(usedA === a || usedB === b).toBe(true)
      expect(usedA <= a && usedB <= b).toBe(true)
    }
  }, 120_000)

  test('an issuer clawback from the escrow blocks removes and syncs until the admin pauses; the emergency exit then pays LPs', async () => {
    // TKC: clawback held by the admin (USDC-style issuer powers)
    const { assetId: tkc } = await algorand.send.assetCreate({
      sender: admin.addr,
      total: 10n ** 15n,
      decimals: 6,
      unitName: 'TKC',
      clawback: admin.addr,
    })
    const lp = users[2]
    await algorand.send.assetOptIn({ sender: lp.addr, assetId: tkc })
    await algorand.send.assetTransfer({ sender: admin.addr, receiver: lp.addr, assetId: tkc, amount: 10n ** 12n })
    const [assetA, assetB] = tka < tkc ? [tka, tkc] : [tkc, tka]
    const { return: poolId } = await dex.send.createPool({
      args: {
        payment: algorand.createTransaction.payment({ sender: admin.addr, receiver: dex.appAddress, amount: (3).algo() }),
        assetA,
        assetB,
        config: poolConfig(FEE_BPS),
        hooks: [],
        externals: [],
      },
      ...send,
    })
    const pool = await dex.getPool({ args: { poolId: poolId! } })
    const escrow = getApplicationAddress(pool.escrow).toString()
    await algorand.send.assetOptIn({ sender: lp.addr, assetId: pool.lpAsset })
    await dex.send.addLiquidity({
      sender: lp.addr,
      args: { depositA: transfer(lp, escrow, assetA, 1_000_000_000n), depositB: transfer(lp, escrow, assetB, 1_000_000_000n), poolId: poolId!, minLpOut: 0n, data: NO_DATA },
      ...send,
    })
    const lpHeld = await holding(lp.addr.toString(), pool.lpAsset)

    // the issuer claws 1 unit out of the escrow
    await algorand.send.assetTransfer({ sender: admin.addr, receiver: admin.addr, clawbackTarget: escrow, assetId: tkc, amount: 1n })

    const removeWith = (method: 'removeLiquidity' | 'emergencyRemoveLiquidity') =>
      dex
        .newGroup()
        .opUp({ sender: lp.addr, args: [], note: 'reference carrier', maxFee: send.maxFee })
        [method]({
          sender: lp.addr,
          maxFee: send.maxFee,
          args: {
            lpTransfer: transfer(lp, dex.appAddress.toString(), pool.lpAsset, lpHeld),
            poolId: poolId!,
            minAmountA: 0n,
            minAmountB: 0n,
            ...(method === 'removeLiquidity' ? { data: NO_DATA } : {}),
          } as never,
        })
        .send({ coverAppCallInnerTransactionFees: true, populateAppCallResources: true })

    // the shortfall fails the custody invariant on every sync, so LPs cannot leave the normal way
    await expect(removeWith('removeLiquidity')).rejects.toThrow(/errPdki/)
    await expect(dex.send.sync({ args: { poolId: poolId! }, ...send })).rejects.toThrow(/errPdki/)

    // after a pause the emergency exit (no sync) pays the booked pro-rata, which the escrow still covers
    await dex.send.setPoolPaused({ args: { poolId: poolId!, paused: true }, ...send })
    const before = await holding(lp.addr.toString(), tkc)
    await removeWith('emergencyRemoveLiquidity')
    expect((await holding(lp.addr.toString(), tkc)) - before).toBeGreaterThan(999_000_000n)
    expect(await holding(lp.addr.toString(), pool.lpAsset)).toBe(0n)
  }, 120_000)

  test('300 random operations keep every LP invariant, and every LP can leave', async () => {
    const { return: poolId } = await dex.send.createPool({
      args: {
        payment: algorand.createTransaction.payment({ sender: admin.addr, receiver: dex.appAddress, amount: (3).algo() }),
        assetA: tka,
        assetB: tkb,
        config: poolConfig(FEE_BPS),
        hooks: [],
        externals: [],
      },
      ...send,
    })
    let pool = await dex.getPool({ args: { poolId: poolId! } })
    const escrow = getApplicationAddress(pool.escrow).toString()
    for (const user of users) await algorand.send.assetOptIn({ sender: user.addr, assetId: pool.lpAsset })

    const add = (user: TransactionSignerAccount, a: bigint, b: bigint) =>
      dex.send.addLiquidity({
        sender: user.addr,
        args: { depositA: transfer(user, escrow, tka, a), depositB: transfer(user, escrow, tkb, b), poolId: poolId!, minLpOut: 0n, data: NO_DATA },
        ...send,
      })
    // a two-ASA remove needs more references than one call holds: an opUp() reference carrier goes first
    const remove = (user: TransactionSignerAccount, lp: bigint) =>
      dex
        .newGroup()
        .opUp({ sender: user.addr, args: [], note: 'reference carrier', maxFee: send.maxFee })
        .removeLiquidity({
        sender: user.addr,
        maxFee: send.maxFee,
        args: {
          lpTransfer: transfer(user, dex.appAddress.toString(), pool.lpAsset, lp),
          poolId: poolId!,
          minAmountA: 0n,
          minAmountB: 0n,
          data: NO_DATA,
        },
      })
        .send({ coverAppCallInnerTransactionFees: true, populateAppCallResources: true })

    // a lopsided first deposit, then the sequence
    await add(users[0], 5_000_000_000n, 2_000_000_000n)

    // value of one LP unit in sqrt(A·B) terms must never decrease: compared exactly, without the square root,
    // as rA'·rB'·S² ≥ rA·rB·S'²
    let last = await dex.getPool({ args: { poolId: poolId! } })
    let feesA = 0n
    let feesB = 0n
    const counts = { swap: 0, add: 0, remove: 0, donate: 0, sync: 0 }

    for (let step = 0; step < 300; step++) {
      pool = await dex.getPool({ args: { poolId: poolId! } })
      const user = users[Number(rand(3n))]
      const kind = rand(100n)

      if (kind < 55n) {
        counts.swap++
        const inIsA = rand(2n) === 0n
        const reserveIn = inIsA ? pool.reserveA : pool.reserveB
        const reserveOut = inIsA ? pool.reserveB : pool.reserveA
        // from 1 base unit to 30% of the input reserve, log-spread
        const amount = 1n + rand(10n ** (1n + rand(BigInt(reserveIn.toString().length))))
        const amountIn = amount > (reserveIn * 3n) / 10n ? (reserveIn * 3n) / 10n + 1n : amount
        const expected = model(amountIn, reserveIn, reserveOut)
        if (expected.out === 0n || expected.out >= reserveOut) {
          continue
        }
        const quoted = (
          await dex.send.quote({
            args: { poolId: poolId!, assetIn: inIsA ? tka : tkb, amountIn, swapper: ALGORAND_ZERO_ADDRESS_STRING, data: NO_DATA, wallet: 0n },
            ...send,
          })
        ).return!
        const kBefore = pool.reserveA * pool.reserveB
        const { return: out } = await dex.send.swap({
          sender: user.addr,
          args: {
            input: transfer(user, escrow, inIsA ? tka : tkb, amountIn),
            poolId: poolId!,
            minAmountOut: expected.out,
            recipient: ALGORAND_ZERO_ADDRESS_STRING,
            data: NO_DATA,
            wallet: 0n,
          },
          ...send,
        })
        expect(out).toBe(expected.out)
        expect(quoted).toBe(out)
        if (inIsA) feesA += expected.protocolFee
        else feesB += expected.protocolFee
        const after = await dex.getPool({ args: { poolId: poolId! } })
        expect(after.reserveA * after.reserveB).toBeGreaterThanOrEqual(kBefore)
      } else if (kind < 75n) {
        counts.add++
        const a = 1n + rand(2_000_000_000n)
        const b = 1n + rand(2_000_000_000n)
        // an add too small to mint reverts (minted > 0); that is expected and not an invariant breach
        await add(user, a, b).catch((e: Error) => expect(String(e.message)).toMatch(/errP/))
      } else if (kind < 90n) {
        const lp = await holding(user.addr.toString(), pool.lpAsset)
        if (lp === 0n) continue
        counts.remove++
        await remove(user, 1n + rand(lp))
      } else if (kind < 96n) {
        counts.donate++
        await algorand.send.assetTransfer({ sender: user.addr, receiver: escrow, assetId: rand(2n) === 0n ? tka : tkb, amount: 1n + rand(10_000_000n) })
      } else {
        counts.sync++
        await dex.send.sync({ args: { poolId: poolId! }, ...send })
      }

      const now = await dex.getPool({ args: { poolId: poolId! } })
      // the escrow always covers what is booked
      expect(await holding(escrow, tka)).toBeGreaterThanOrEqual(now.reserveA + now.protocolFeesA)
      expect(await holding(escrow, tkb)).toBeGreaterThanOrEqual(now.reserveB + now.protocolFeesB)
      // LP supply equals what is held plus the locked minimum
      let held = 0n
      for (const u of users) held += await holding(u.addr.toString(), pool.lpAsset)
      expect(now.lpSupply).toBe(held + MINIMUM_LIQUIDITY)
      // a share never loses value (adds/removes round in the pool's favour, swaps add fees)
      expect(now.reserveA * now.reserveB * last.lpSupply * last.lpSupply).toBeGreaterThanOrEqual(
        last.reserveA * last.reserveB * now.lpSupply * now.lpSupply,
      )
      last = now
    }

    pool = await dex.getPool({ args: { poolId: poolId! } })
    expect(pool.protocolFeesA).toBe(feesA)
    expect(pool.protocolFeesB).toBe(feesB)

    // everyone leaves; only the locked minimum's share stays behind
    for (const user of users) {
      const lp = await holding(user.addr.toString(), pool.lpAsset)
      if (lp > 0n) await remove(user, lp)
    }
    const end = await dex.getPool({ args: { poolId: poolId! } })
    expect(end.lpSupply).toBe(MINIMUM_LIQUIDITY)
    expect(end.reserveA > 0n && end.reserveB > 0n).toBe(true)

    // protocol fees sweep exactly
    const treasuryA = await holding(admin.addr.toString(), tka)
    await dex
      .newGroup()
      .opUp({ sender: admin.addr, args: [], note: 'reference carrier', maxFee: send.maxFee })
      .collectProtocolFees({ args: { poolId: poolId! }, maxFee: send.maxFee })
      .send({ coverAppCallInnerTransactionFees: true, populateAppCallResources: true })
    expect((await holding(admin.addr.toString(), tka)) - treasuryA).toBe(feesA)
    const swept = await dex.getPool({ args: { poolId: poolId! } })
    expect(swept.protocolFeesA).toBe(0n)
    expect(swept.protocolFeesB).toBe(0n)
    expect(await holding(escrow, tka)).toBeGreaterThanOrEqual(swept.reserveA)
    expect(await holding(escrow, tkb)).toBeGreaterThanOrEqual(swept.reserveB)

    expect(counts.swap).toBeGreaterThan(100)
    expect(counts.remove).toBeGreaterThan(10)
  }, 900_000)
})
