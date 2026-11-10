/**
 * Tinyman v2 AMM on LocalNet, deployed from the official mainnet bytecode.
 *
 * Licensing: Tinyman's contracts are GPL-2.0-or-later (BUSL-1.1 until 2026-01-01) and Akita is
 * BUSL, so the bytecode is NOT committed here. `loadTinymanV2Approval()` downloads it at test time
 * from the upstream repo at a pinned commit, checks its sha256, and caches it under the git-ignored
 * `tests/fixtures/external/.cache/`. See `tests/fixtures/external/README.md`.
 *
 * Steps follow `smart_contracts/plugin-dex/research/venues.md` §2.2 (verified on LocalNet).
 */
import { AlgorandClient, microAlgo } from '@algorandfoundation/algokit-utils'
import { Address, LogicSigAccount, OnApplicationComplete, getApplicationAddress } from 'algosdk'
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs'
import path from 'node:path'

/** Upstream repo and pinned commit (HEAD of `main`, 2022-11-25; the contracts are immutable on mainnet) */
export const TINYMAN_V2_REPO = 'tinymanorg/tinyman-amm-contracts-v2'
export const TINYMAN_V2_COMMIT = '3de3a35e1ce0ca96576d18c2728f6042d1a07f72'
export const TINYMAN_V2_APPROVAL_PATH = 'contracts/build/amm_approval.teal.tok'
export const TINYMAN_V2_APPROVAL_URL = `https://raw.githubusercontent.com/${TINYMAN_V2_REPO}/${TINYMAN_V2_COMMIT}/${TINYMAN_V2_APPROVAL_PATH}`
/** sha256 of the approval bytecode; byte-identical to mainnet app 1002541853 */
export const TINYMAN_V2_APPROVAL_SHA256 = 'dd63834ddcd51013ec0a22142497ad4c6d74e421e6c79149422c243346691f56'
export const TINYMAN_V2_APPROVAL_SIZE = 7_731
/** Where the downloaded bytecode is cached (git-ignored) */
export const TINYMAN_V2_CACHE_DIR = path.resolve(__dirname, '.cache', 'tinyman-v2', TINYMAN_V2_COMMIT)
export const TINYMAN_V2_CACHE_FILE = path.join(TINYMAN_V2_CACHE_DIR, 'amm_approval.teal.tok')

/** Clear program: `#pragma version 7; int 1; return` (v7 to match the approval's version) */
export const TM_CLEAR = Uint8Array.from([0x07, 0x81, 0x01, 0x43])
/** Pool logicsig template with the 24 templated bytes zeroed (offsets 3, 11, 19) */
export const TM_POOL_TEMPLATE_B64 = 'BoAYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgQBbNQA0ADEYEkQxGYEBEkSBAUM='
export const TM_SCHEMA = { globalInts: 0, globalByteSlices: 3, localInts: 12, localByteSlices: 2 }
export const TM_EXTRA_PAGES = 3
/** Pool account min balance once bootstrapped */
export const TM_MIN_POOL_BALANCE = { algoPair: 842_000n, asaPair: 942_000n }
/** Bootstrap appl fee (paid by the pool lsig): 5 inners for an ALGO pair, 6 for an ASA pair */
export const TM_BOOTSTRAP_FEE = { algoPair: 6_000n, asaPair: 7_000n }
export const TM_LOCKED_POOL_TOKENS = 1_000n
export const TM_DEFAULT_FEE_SHARE = 30n
export const TM_DEFAULT_PROTOCOL_FEE_RATIO = 6n

const enc = (s: string) => new TextEncoder().encode(s)
const itob = (n: bigint) => {
  const out = new Uint8Array(8)
  new DataView(out.buffer).setBigUint64(0, n)
  return out
}
const sha256 = (bytes: Uint8Array) => createHash('sha256').update(bytes).digest('hex')
const noAutoResources = { populateAppCallResources: false, coverAppCallInnerTransactionFees: false } as const

let approvalCache: Uint8Array | undefined

const manualInstructions = () =>
  [
    'To populate the cache by hand, run from projects/akita-sc:',
    `  mkdir -p ${path.relative(process.cwd(), TINYMAN_V2_CACHE_DIR)}`,
    `  curl -fL -o ${path.relative(process.cwd(), TINYMAN_V2_CACHE_FILE)} ${TINYMAN_V2_APPROVAL_URL}`,
    `and check: shasum -a 256 <file> == ${TINYMAN_V2_APPROVAL_SHA256}`,
  ].join('\n')

/**
 * The official Tinyman v2 approval bytecode: from the local cache if present, otherwise downloaded
 * from the pinned upstream commit. Throws if the hash does not match or the download fails.
 */
export async function loadTinymanV2Approval(): Promise<Uint8Array> {
  if (approvalCache) return approvalCache
  let bytes: Uint8Array | undefined
  if (existsSync(TINYMAN_V2_CACHE_FILE)) {
    bytes = new Uint8Array(readFileSync(TINYMAN_V2_CACHE_FILE))
    if (sha256(bytes) !== TINYMAN_V2_APPROVAL_SHA256) {
      throw new Error(
        `Cached Tinyman v2 approval at ${TINYMAN_V2_CACHE_FILE} has sha256 ${sha256(bytes)}, ` +
          `expected ${TINYMAN_V2_APPROVAL_SHA256}. Delete it and rerun.\n${manualInstructions()}`,
      )
    }
  } else {
    try {
      const response = await fetch(TINYMAN_V2_APPROVAL_URL)
      if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`)
      bytes = new Uint8Array(await response.arrayBuffer())
    } catch (error) {
      throw new Error(
        `Could not download the Tinyman v2 approval program from ${TINYMAN_V2_APPROVAL_URL}: ` +
          `${(error as Error).message}\n${manualInstructions()}`,
      )
    }
    if (sha256(bytes) !== TINYMAN_V2_APPROVAL_SHA256) {
      throw new Error(
        `Downloaded Tinyman v2 approval has sha256 ${sha256(bytes)}, expected ${TINYMAN_V2_APPROVAL_SHA256}`,
      )
    }
    mkdirSync(TINYMAN_V2_CACHE_DIR, { recursive: true })
    const temp = `${TINYMAN_V2_CACHE_FILE}.${process.pid}.tmp`
    writeFileSync(temp, bytes)
    renameSync(temp, TINYMAN_V2_CACHE_FILE)
  }
  if (bytes.length !== TINYMAN_V2_APPROVAL_SIZE) throw new Error('Tinyman v2 approval has an unexpected size')
  approvalCache = bytes
  return bytes
}

export type TinymanV2 = {
  algorand: AlgorandClient
  appId: bigint
  appAddress: string
  /** creator; also fee_setter, fee_collector and fee_manager */
  admin: string
}

export type TinymanPool = {
  address: string
  /** pool logicsig program (template filled with app id and asset ids) */
  program: Uint8Array
  /** larger asset id */
  asset1: bigint
  /** smaller asset id (0 = ALGO) */
  asset2: bigint
  /** set once bootstrapped */
  lpAsset: bigint
}

export type TinymanPoolState = {
  asset1: bigint
  asset2: bigint
  lpAsset: bigint
  reserve1: bigint
  reserve2: bigint
  issued: bigint
  feeShare: bigint
  protocolFeeRatio: bigint
  protocolFees1: bigint
  protocolFees2: bigint
  lock: bigint
  cumulativePriceUpdateTimestamp: bigint
  cumulativePrice1: Uint8Array
  cumulativePrice2: Uint8Array
}

/** Create the AMM app (the creator gets every fee role) and fund its account with 200,000 µALGO */
export async function deployTinymanV2(algorand: AlgorandClient, creator: string | Address): Promise<TinymanV2> {
  const approvalProgram = await loadTinymanV2Approval()
  const { appId } = await algorand.send.appCreate({
    sender: creator,
    approvalProgram,
    clearStateProgram: TM_CLEAR,
    schema: TM_SCHEMA,
    extraProgramPages: TM_EXTRA_PAGES,
    ...noAutoResources,
  })
  const appAddress = getApplicationAddress(appId).toString()
  await algorand.send.payment({ sender: creator, receiver: appAddress, amount: microAlgo(200_000) })
  return { algorand, appId, appAddress, admin: creator.toString() }
}

/** Pool logicsig for an unordered pair: template with itob(appId) at 3, itob(max) at 11, itob(min) at 19 */
export function deriveTinymanPool(appId: bigint, assetA: bigint, assetB: bigint): TinymanPool {
  const asset1 = assetA > assetB ? assetA : assetB
  const asset2 = assetA > assetB ? assetB : assetA
  const program = new Uint8Array(Buffer.from(TM_POOL_TEMPLATE_B64, 'base64'))
  program.set(itob(appId), 3)
  program.set(itob(asset1), 11)
  program.set(itob(asset2), 19)
  const address = new LogicSigAccount(program).address().toString()
  return { address, program, asset1, asset2, lpAsset: 0n }
}

/**
 * Bootstrap a pool: fund the lsig with min balance + bootstrap fee + 100,000 (LP ASA min balance for
 * the app), then OptIn from the lsig with rekeyTo = the AMM app. Both ASAs need total >= 1,000,000.
 */
export async function bootstrapPool(
  tm: TinymanV2,
  funder: string | Address,
  assetA: bigint,
  assetB: bigint,
): Promise<TinymanPool> {
  const pool = deriveTinymanPool(tm.appId, assetA, assetB)
  const lsig = tm.algorand.account.logicsig(pool.program)
  const algoPair = pool.asset2 === 0n
  const fee = algoPair ? TM_BOOTSTRAP_FEE.algoPair : TM_BOOTSTRAP_FEE.asaPair
  const minBalance = algoPair ? TM_MIN_POOL_BALANCE.algoPair : TM_MIN_POOL_BALANCE.asaPair
  await tm.algorand
    .newGroup()
    .addPayment({ sender: funder, receiver: pool.address, amount: microAlgo(minBalance + fee + 100_000n) })
    .addAppCall({
      sender: lsig.addr,
      appId: tm.appId,
      onComplete: OnApplicationComplete.OptInOC,
      args: [enc('bootstrap')],
      assetReferences: [pool.asset1, pool.asset2],
      rekeyTo: tm.appAddress,
      staticFee: microAlgo(fee),
    })
    .send(noAutoResources)
  const state = await readPoolState(tm, pool.address)
  if (!state) throw new Error('Tinyman bootstrap did not create pool state')
  return { ...pool, lpAsset: state.lpAsset }
}

const transfer = (algorand: AlgorandClient, sender: string | Address, receiver: string, asset: bigint, amount: bigint) =>
  asset === 0n
    ? algorand.createTransaction.payment({ sender, receiver, amount: microAlgo(amount) })
    : algorand.createTransaction.assetTransfer({ sender, receiver, assetId: asset, amount })

/**
 * First deposit: `amountA` of `assetA` plus `amountB` of the other pool asset. Opts the provider into
 * the LP asset if needed. Returns the LP minted (sqrt(a1*a2) - 1,000).
 */
export async function addInitialLiquidity(
  tm: TinymanV2,
  pool: TinymanPool,
  provider: string | Address,
  assetA: bigint,
  amountA: bigint,
  amountB: bigint,
): Promise<bigint> {
  if (assetA !== pool.asset1 && assetA !== pool.asset2) throw new Error('asset not in pool')
  const amount1 = assetA === pool.asset1 ? amountA : amountB
  const amount2 = assetA === pool.asset1 ? amountB : amountA
  const optedIn = await tm.algorand.asset
    .getAccountInformation(provider, pool.lpAsset)
    .then(() => true)
    .catch(() => false)
  if (!optedIn) await tm.algorand.send.assetOptIn({ sender: provider, assetId: pool.lpAsset })
  const before = (await tm.algorand.asset.getAccountInformation(provider, pool.lpAsset)).balance
  await tm.algorand
    .newGroup()
    .addTransaction(await transfer(tm.algorand, provider, pool.address, pool.asset1, amount1))
    .addTransaction(await transfer(tm.algorand, provider, pool.address, pool.asset2, amount2))
    .addAppCall({
      sender: provider,
      appId: tm.appId,
      args: [enc('add_initial_liquidity')],
      accountReferences: [pool.address],
      assetReferences: [pool.lpAsset],
      staticFee: microAlgo(2_000),
    })
    .send(noAutoResources)
  return (await tm.algorand.asset.getAccountInformation(provider, pool.lpAsset)).balance - before
}

/** `set_fee` from the fee setter (the app creator): fee share 1..100 bps, protocol ratio 3..10 */
export async function setFee(tm: TinymanV2, pool: TinymanPool, totalFeeShare: bigint, protocolFeeRatio: bigint) {
  await tm.algorand.send.appCall({
    sender: tm.admin,
    appId: tm.appId,
    args: [enc('set_fee'), itob(totalFeeShare), itob(protocolFeeRatio)],
    accountReferences: [pool.address],
    ...noAutoResources,
  })
}

/** Decode a Tinyman `"<name> %i" ‖ itob(value)` log line */
function readLog(logs: Uint8Array[] | undefined, name: string): bigint | undefined {
  const prefix = enc(`${name} %i`)
  for (const log of logs ?? []) {
    if (log.length === prefix.length + 8 && prefix.every((b, i) => log[i] === b)) {
      return new DataView(log.buffer, log.byteOffset + prefix.length, 8).getBigUint64(0)
    }
  }
  return undefined
}

/**
 * Top-level fixed-input swap: [pay|axfer trader→pool, appl swap] with explicit refs and fee 2,000.
 * Returns `output_amount` from Tinyman's log (the payout to the trader).
 */
export async function swapDirect(
  tm: TinymanV2,
  pool: TinymanPool,
  trader: string | Address,
  assetIn: bigint,
  amountIn: bigint,
  minOut = 0n,
): Promise<bigint> {
  const result = await tm.algorand
    .newGroup()
    .addTransaction(await transfer(tm.algorand, trader, pool.address, assetIn, amountIn))
    .addAppCall({
      sender: trader,
      appId: tm.appId,
      args: [enc('swap'), enc('fixed-input'), itob(minOut)],
      accountReferences: [pool.address],
      assetReferences: [pool.asset1, pool.asset2],
      staticFee: microAlgo(2_000),
    })
    .send(noAutoResources)
  const out = readLog(result.confirmations[1].logs, 'output_amount')
  if (out === undefined) throw new Error('Tinyman swap logged no output_amount')
  return out
}

/** The pool's local state in the AMM app, or undefined if the address is not a bootstrapped pool */
export async function readPoolState(tm: TinymanV2, poolAddress: string): Promise<TinymanPoolState | undefined> {
  const info = await tm.algorand.client.algod.accountApplicationInformation(poolAddress, tm.appId).do().catch(() => undefined)
  const keyValues = info?.appLocalState?.keyValue
  if (!keyValues) return undefined
  const decoder = new TextDecoder()
  const values = new Map<string, { uint: bigint; bytes: Uint8Array }>()
  for (const kv of keyValues) values.set(decoder.decode(kv.key), { uint: BigInt(kv.value.uint), bytes: kv.value.bytes })
  const uint = (key: string) => values.get(key)?.uint ?? 0n
  const bytes = (key: string) => values.get(key)?.bytes ?? new Uint8Array()
  return {
    asset1: uint('asset_1_id'),
    asset2: uint('asset_2_id'),
    lpAsset: uint('pool_token_asset_id'),
    reserve1: uint('asset_1_reserves'),
    reserve2: uint('asset_2_reserves'),
    issued: uint('issued_pool_tokens'),
    feeShare: uint('total_fee_share'),
    protocolFeeRatio: uint('protocol_fee_ratio'),
    protocolFees1: uint('asset_1_protocol_fees'),
    protocolFees2: uint('asset_2_protocol_fees'),
    lock: uint('lock'),
    cumulativePriceUpdateTimestamp: uint('cumulative_price_update_timestamp'),
    cumulativePrice1: bytes('asset_1_cumulative_price'),
    cumulativePrice2: bytes('asset_2_cumulative_price'),
  }
}

/**
 * Tinyman v2 fixed-input output (constant product, fee on input), the reference model for the
 * on-chain `tmFixedInputOut`. Returns 0 where the AMM would revert.
 */
export function tinymanFixedInputOut(state: TinymanPoolState | undefined, assetIn: bigint, amountIn: bigint): bigint {
  if (!state || state.lock !== 0n || state.issued === 0n || amountIn <= 0n) return 0n
  let reserveIn: bigint
  let reserveOut: bigint
  if (assetIn === state.asset1) [reserveIn, reserveOut] = [state.reserve1, state.reserve2]
  else if (assetIn === state.asset2) [reserveIn, reserveOut] = [state.reserve2, state.reserve1]
  else return 0n
  const max = (1n << 64n) - 1n
  if (reserveIn === 0n || reserveOut === 0n || amountIn * state.feeShare > max || reserveIn + amountIn > max) return 0n
  const totalFee = (amountIn * state.feeShare) / 10_000n
  if (totalFee === 0n) return 0n
  const swapAmount = amountIn - totalFee
  const out = reserveOut - ((reserveIn * reserveOut) / (reserveIn + swapAmount) + 1n)
  return out > 0n ? out : 0n
}
