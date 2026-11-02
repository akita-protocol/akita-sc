/**
 * Plugin DEX for aggregators: discover pools, quote, and swap, with only algosdk, algokit-utils and the Vault's
 * ARC-56 spec (no Akita SDK). See ../INTEGRATION.md.
 *
 * Run against LocalNet (defaults) or any network:
 *   VAULT_APP_ID=2448 ASSET_IN=0 ASSET_OUT=<asa> AMOUNT_IN=1000000 \
 *   npx ts-node --transpile-only smart_contracts/plugin-dex/examples/aggregator-quote-swap.ts [--swap]
 * Without --swap it only discovers and quotes. With --swap it swaps from the LocalNet dispenser, or from
 * SWAPPER_MNEMONIC when set.
 */
import fs from 'node:fs'
import path from 'node:path'
import { AlgorandClient, microAlgo } from '@algorandfoundation/algokit-utils'
import type { Arc56Contract } from '@algorandfoundation/algokit-utils/types/app-arc56'
import algosdk from 'algosdk'

const spec = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../../artifacts/plugin-dex/PluginDex.arc56.json'), 'utf8'),
) as Arc56Contract

const HOOK_POINT_BEFORE_SWAP = 32n
const HOOK_POINT_QUOTE = 128n
const BPS = 10_000n

/** PoolInfo, decoded from the pool box ("p" + uint64 pool id) with the ARC-56 struct */
type Pool = {
  id: bigint
  assetA: bigint
  assetB: bigint
  escrow: bigint
  curve: bigint
  reserveA: bigint
  reserveB: bigint
  externalA: bigint
  externalB: bigint
  virtualA: bigint
  virtualB: bigint
  feeBps: bigint
  hookPoints: bigint
  closed: boolean
  paused: boolean
}

const poolTupleType = algosdk.ABIType.from(
  `(${spec.structs.PoolInfo.map((field) => field.type).join(',')})`,
) as algosdk.ABITupleType

function decodePool(id: bigint, box: Uint8Array): Pool {
  const values = poolTupleType.decode(box) as unknown[]
  const named = Object.fromEntries(spec.structs.PoolInfo.map((field, i) => [field.name, values[i]]))
  return { id, ...(named as Omit<Pool, 'id'>) }
}

/** 1. Discovery: pool ids run from 0 to the global `pool_cursor` (exclusive); each pool is one box */
async function listPools(algorand: AlgorandClient, vault: bigint): Promise<Pool[]> {
  const state = await algorand.app.getGlobalState(vault)
  const cursor = BigInt(state.pool_cursor?.value ?? 0)
  const pools: Pool[] = []
  for (let id = 0n; id < cursor; id++) {
    const name = new Uint8Array([...Buffer.from('p'), ...algosdk.encodeUint64(id)])
    pools.push(decodePool(id, await algorand.app.getBoxValue(vault, name)))
  }
  return pools.filter((p) => !p.closed && !p.paused)
}

/**
 * 2a. Off-chain quote, exact for a hookless native pool (curve 0, no BeforeSwap/Quote hooks): the Vault's
 * integer math on effective reserves, every step rounded down, output below the liquid reserve.
 */
function quoteNative(pool: Pool, assetIn: bigint, amountIn: bigint): bigint {
  const inIsA = assetIn === pool.assetA
  const effIn = (inIsA ? pool.reserveA + pool.virtualA : pool.reserveB + pool.virtualB)
  const effOut = (inIsA ? pool.reserveB + pool.virtualB : pool.reserveA + pool.virtualA)
  const liquidOut = inIsA ? pool.reserveB - pool.externalB : pool.reserveA - pool.externalA
  const lpFee = (amountIn * pool.feeBps) / BPS
  const effective = amountIn - lpFee
  const out = (effective * effOut) / (effIn + effective)
  return out > 0n && out < liquidOut ? out : 0n
}

const needsSimulatedQuote = (pool: Pool) =>
  pool.curve !== 0n || (pool.hookPoints & (HOOK_POINT_BEFORE_SWAP | HOOK_POINT_QUOTE)) !== 0n

/** 2b. On-chain quote (any pool, hooks included): `tryQuoteRoute` by simulate; 0 means "cannot fill" */
async function quoteOnChain(algorand: AlgorandClient, vault: bigint, swapper: string, route: bigint[], assetIn: bigint, amountIn: bigint) {
  const client = algorand.client.getAppClientById({ appSpec: spec, appId: vault, defaultSender: swapper })
  const result = await client.send.call({
    method: 'tryQuoteRoute',
    args: [route, assetIn, amountIn, swapper, new Uint8Array(), 0n],
    // read-only, so simulated and never sent. Quote hooks and curves run as inner calls, so even a simulated
    // quote needs fee credit for them
    coverAppCallInnerTransactionFees: true,
    maxFee: microAlgo(200_000),
    populateAppCallResources: true,
  })
  return result.return as bigint
}

/**
 * 3. Swap: [deposit to the pool escrow, Vault.swap]; the Vault pays `recipient` (zero address = sender).
 * A curve or hooked pool reads more boxes and apps than one call's 8 references hold, so a bare `opUp()` call
 * to the Vault goes first as a reference carrier (resource population spreads references over the group).
 */
async function swap(algorand: AlgorandClient, vault: bigint, swapper: algosdk.Address, pool: Pool, assetIn: bigint, amountIn: bigint, minAmountOut: bigint) {
  const client = algorand.client.getAppClientById({ appSpec: spec, appId: vault, defaultSender: swapper })
  const escrow = algosdk.getApplicationAddress(pool.escrow)
  const deposit =
    assetIn === 0n
      ? algorand.createTransaction.payment({ sender: swapper, receiver: escrow, amount: microAlgo(amountIn) })
      : algorand.createTransaction.assetTransfer({ sender: swapper, receiver: escrow, assetId: assetIn, amount: amountIn })
  const group = algorand.newGroup()
  if (needsSimulatedQuote(pool)) {
    group.addAppCallMethodCall(await client.params.call({ method: 'opUp', args: [], note: 'reference carrier', maxFee: microAlgo(10_000) }))
  }
  group.addAppCallMethodCall(
    await client.params.call({
      method: 'swap',
      args: [deposit, pool.id, minAmountOut, algosdk.ALGORAND_ZERO_ADDRESS_STRING, new Uint8Array(), 0n],
      maxFee: microAlgo(200_000),
    }),
  )
  // the Vault's inner transactions (payout, hook and curve calls, op-ups) are fee 0: the outer fees cover them
  const result = await group.send({ coverAppCallInnerTransactionFees: true, populateAppCallResources: true })
  return result.returns.at(-1)!.returnValue as bigint
}

async function main() {
  const algorand = process.env.ALGOD_SERVER ? AlgorandClient.fromEnvironment() : AlgorandClient.defaultLocalNet()
  const vault = BigInt(process.env.VAULT_APP_ID ?? '0')
  const assetIn = BigInt(process.env.ASSET_IN ?? '0')
  const assetOut = BigInt(process.env.ASSET_OUT ?? '0')
  const amountIn = BigInt(process.env.AMOUNT_IN ?? '1000000')
  if (vault === 0n) throw new Error('Set VAULT_APP_ID')

  const swapper = process.env.SWAPPER_MNEMONIC
    ? algorand.account.fromMnemonic(process.env.SWAPPER_MNEMONIC)
    : await algorand.account.dispenserFromEnvironment()

  const pools = (await listPools(algorand, vault)).filter(
    (p) => (p.assetA === assetIn && p.assetB === assetOut) || (p.assetA === assetOut && p.assetB === assetIn),
  )
  console.log(`${pools.length} live pool(s) for ${assetIn} → ${assetOut}`)

  let best: { pool: Pool; out: bigint } | undefined
  for (const pool of pools) {
    const onChain = await quoteOnChain(algorand, vault, swapper.addr.toString(), [pool.id], assetIn, amountIn)
    const offChain = needsSimulatedQuote(pool) ? undefined : quoteNative(pool, assetIn, amountIn)
    console.log(`  pool ${pool.id}: on-chain ${onChain}${offChain === undefined ? ' (hooked or curve pool: simulate only)' : `, off-chain ${offChain}`}`)
    if (offChain !== undefined && offChain !== onChain) throw new Error(`off-chain math disagrees on pool ${pool.id}`)
    if (onChain > 0n && (!best || onChain > best.out)) best = { pool, out: onChain }
  }
  if (!best) return console.log('No pool fills this amount.')

  if (process.argv.includes('--swap')) {
    const minAmountOut = (best.out * 9_900n) / BPS // 1% slippage
    const received = await swap(algorand, vault, swapper.addr, best.pool, assetIn, amountIn, minAmountOut)
    console.log(`swapped on pool ${best.pool.id}: received ${received} (quoted ${best.out})`)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
