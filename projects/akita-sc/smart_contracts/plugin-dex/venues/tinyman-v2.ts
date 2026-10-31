import { Account, Application, Bytes, bytes, itxn, loggedAssert, op, uint64 } from '@algorandfoundation/algorand-typescript'

/**
 * Tinyman v2 AMM venue library (inlined PuyaTs helpers, not a contract).
 *
 * Shared by the TinymanV2Adapter (router venue) and the BackrunArbHook, so a
 * caller that already controls an account (a flash-rekeyed spending account or
 * a pool escrow) can swap on Tinyman without an extra adapter hop.
 *
 * Facts (research/venues.md §1, verified on LocalNet against the official
 * bytecode):
 * - every pool is a logicsig account rekeyed to the AMM app; its address is
 *   sha512_256("Program" ‖ template(appId, asset1, asset2)) with asset1 > asset2,
 *   so ALGO (0) is always asset2;
 * - pool state is the pool account's local state in the AMM app;
 * - swap = [pay|axfer account→pool, appl "swap","fixed-input",itob(minOut)],
 *   input sender == appl sender, payout goes to the appl sender;
 * - the AMM is TEAL v7: no group resource sharing, so the inner appl carries
 *   its own `accounts: [pool]` and `assets: [nonzero pool assets]`;
 * - every Tinyman inner txn has fee 0; fees must be pooled by the caller.
 *
 * Resource requirements for callers: the pool account, the AMM app, the
 * (pool, app) local pair (pool and app in the same top-level txn), both nonzero
 * assets, and the (account, assetOut) holding must be available.
 */

/** Pool logicsig template bytes before itob(appId) ‖ itob(asset1) ‖ itob(asset2) */
const TM_POOL_PREFIX = Bytes.fromHex('068018')
/** Pool logicsig template bytes after the 24 templated bytes */
const TM_POOL_SUFFIX = Bytes.fromHex('81005b3500340031181244311981011244810143')

/** Tinyman fee shares are in basis points */
export const TmFeeDenominator: uint64 = 10_000

/** Snapshot of a Tinyman v2 pool's local state; `exists` is false for an unbootstrapped address */
export type TmPool = {
  exists: boolean
  /** larger asset id */
  asset1: uint64
  /** smaller asset id (0 = ALGO) */
  asset2: uint64
  lpAsset: uint64
  reserve1: uint64
  reserve2: uint64
  /** LP tokens held outside the pool, including the 1,000 locked at the first deposit */
  issued: uint64
  /** total swap fee in bps, charged on input */
  feeShare: uint64
  /** the protocol takes feeShare / protocolFeeRatio of each fee */
  protocolFeeRatio: uint64
  /** 1 between flash_swap and verify_flash_swap; every swap reverts while set */
  lock: uint64
}

/** Address of the Tinyman v2 pool for an unordered pair, derived from the pool logicsig template */
export function tmPoolAddress(app: Application, assetA: uint64, assetB: uint64): Account {
  const asset1: uint64 = assetA > assetB ? assetA : assetB
  const asset2: uint64 = assetA > assetB ? assetB : assetA
  const program = op.concat(
    op.concat(op.concat(op.concat(TM_POOL_PREFIX, op.itob(app.id)), op.itob(asset1)), op.itob(asset2)),
    TM_POOL_SUFFIX,
  )
  return Account(op.sha512_256(op.concat(Bytes('Program'), program)))
}

function tmLocal(pool: Account, app: Application, key: bytes): uint64 {
  const [value] = op.AppLocal.getExUint64(pool, app, key)
  return value
}

/**
 * Read a pool's state; never reverts (an unbootstrapped address returns `exists: false`, all zero).
 * The opt-in check comes first: on current AVM versions `app_local_get_ex` fails with "has not opted
 * in" for an account without local state instead of returning exists = 0 [verified on LocalNet].
 */
export function tmReadPool(pool: Account, app: Application): TmPool {
  if (!pool.isOptedIn(app)) {
    return {
      exists: false,
      asset1: 0,
      asset2: 0,
      lpAsset: 0,
      reserve1: 0,
      reserve2: 0,
      issued: 0,
      feeShare: 0,
      protocolFeeRatio: 0,
      lock: 0,
    }
  }
  const [asset1, exists] = op.AppLocal.getExUint64(pool, app, Bytes('asset_1_id'))
  return {
    exists: exists,
    asset1: asset1,
    asset2: tmLocal(pool, app, Bytes('asset_2_id')),
    lpAsset: tmLocal(pool, app, Bytes('pool_token_asset_id')),
    reserve1: tmLocal(pool, app, Bytes('asset_1_reserves')),
    reserve2: tmLocal(pool, app, Bytes('asset_2_reserves')),
    issued: tmLocal(pool, app, Bytes('issued_pool_tokens')),
    feeShare: tmLocal(pool, app, Bytes('total_fee_share')),
    protocolFeeRatio: tmLocal(pool, app, Bytes('protocol_fee_ratio')),
    lock: tmLocal(pool, app, Bytes('lock')),
  }
}

/**
 * Exact fixed-input output of a Tinyman v2 swap on a pool snapshot, matching the
 * AMM's integer math. Returns 0 whenever the real swap would revert: missing or
 * locked pool, empty pool, pair mismatch, zero fee (dust input), zero output, or
 * any uint64 overflow the AMM would hit.
 */
export function tmFixedInputOut(pool: TmPool, assetIn: uint64, assetOut: uint64, amountIn: uint64): uint64 {
  if (!pool.exists || pool.lock !== 0 || pool.issued === 0 || pool.protocolFeeRatio === 0) return 0
  if (amountIn === 0 || assetIn === assetOut) return 0

  let reserveIn: uint64 = 0
  let reserveOut: uint64 = 0
  if (assetIn === pool.asset1 && assetOut === pool.asset2) {
    reserveIn = pool.reserve1
    reserveOut = pool.reserve2
  } else if (assetIn === pool.asset2 && assetOut === pool.asset1) {
    reserveIn = pool.reserve2
    reserveOut = pool.reserve1
  } else {
    return 0
  }
  if (reserveIn === 0 || reserveOut === 0) return 0

  // total_fee = in * fee_share / 10_000 (the AMM panics if the product overflows)
  const [feeHigh, feeLow] = op.mulw(amountIn, pool.feeShare)
  if (feeHigh !== 0) return 0
  const totalFee: uint64 = feeLow / TmFeeDenominator
  if (totalFee === 0) return 0
  const swapAmount: uint64 = amountIn - totalFee

  // R_in + in bounds both R_in + swap_amount and the new reserve R_in + swap + poolers_fee
  const [carry] = op.addw(reserveIn, amountIn)
  if (carry !== 0) return 0

  // out = R_out - (floor(R_in * R_out / (R_in + swap_amount)) + 1); the quotient is <= R_out
  const [kHigh, kLow] = op.mulw(reserveIn, reserveOut)
  const quotient: uint64 = op.divw(kHigh, kLow, reserveIn + swapAmount)
  if (quotient + 1 >= reserveOut) return 0
  return reserveOut - (quotient + 1)
}

/** Fixed-input quote straight from venue state; never reverts, 0 = leg unavailable */
export function tmQuoteFixedInput(app: Application, pool: Account, assetIn: uint64, assetOut: uint64, amountIn: uint64): uint64 {
  return tmFixedInputOut(tmReadPool(pool, app), assetIn, assetOut, amountIn)
}

/** Raw holding of `asset` (0 = ALGO balance, min balance included) used to measure swap output */
export function tmHolding(account: Account, asset: uint64): uint64 {
  if (asset === 0) return account.balance
  const [balance] = op.AssetHolding.assetBalance(account, asset)
  return balance
}

/**
 * Swap exactly `amountIn` of `assetIn` for at least `minOut` of `assetOut` on
 * Tinyman v2, sending from `account` (which must be rekeyed to the current app).
 *
 * Issues the two-txn inner group [pay|axfer account→pool, appl swap] with fee 0
 * on both, and puts `rekeyTo` on the appl so the account is handed back in the
 * same group (Tinyman never checks RekeyTo). Pass `rekeyTo = account` to clear
 * the rekey. The caller funds fees (outer fee pooling or a fee-carrying inner
 * txn from its own account, submitted before this call): 3 inner txns (deposit,
 * appl, Tinyman payout).
 *
 * `account` must be opted into `assetOut` when it is an ASA. Returns the
 * measured output (delta of `account`'s `assetOut` holding).
 */
export function tmSwapAs(
  account: Account,
  app: Application,
  pool: Account,
  assetIn: uint64,
  amountIn: uint64,
  assetOut: uint64,
  minOut: uint64,
  rekeyTo: Account,
): uint64 {
  loggedAssert(assetIn !== assetOut, 'errTmPair')
  loggedAssert(pool === tmPoolAddress(app, assetIn, assetOut), 'errTmPool')

  const before = tmHolding(account, assetOut)
  if (assetIn === 0) {
    itxn.submitGroup(
      itxn.payment({ sender: account, receiver: pool, amount: amountIn, fee: 0 }),
      itxn.applicationCall({
        sender: account,
        appId: app,
        appArgs: [Bytes('swap'), Bytes('fixed-input'), op.itob(minOut)],
        accounts: [pool],
        assets: [assetOut],
        rekeyTo: rekeyTo,
        fee: 0,
      }),
    )
  } else if (assetOut === 0) {
    itxn.submitGroup(
      itxn.assetTransfer({ sender: account, assetReceiver: pool, xferAsset: assetIn, assetAmount: amountIn, fee: 0 }),
      itxn.applicationCall({
        sender: account,
        appId: app,
        appArgs: [Bytes('swap'), Bytes('fixed-input'), op.itob(minOut)],
        accounts: [pool],
        assets: [assetIn],
        rekeyTo: rekeyTo,
        fee: 0,
      }),
    )
  } else {
    itxn.submitGroup(
      itxn.assetTransfer({ sender: account, assetReceiver: pool, xferAsset: assetIn, assetAmount: amountIn, fee: 0 }),
      itxn.applicationCall({
        sender: account,
        appId: app,
        appArgs: [Bytes('swap'), Bytes('fixed-input'), op.itob(minOut)],
        accounts: [pool],
        assets: [assetIn, assetOut],
        rekeyTo: rekeyTo,
        fee: 0,
      }),
    )
  }
  return tmHolding(account, assetOut) - before
}
