import {
  Account,
  Application,
  BaseContract,
  Bytes,
  bytes,
  contract,
  Global,
  gtxn,
  itxn,
  loggedAssert,
  OnCompleteAction,
  op,
  TransactionType,
  Txn,
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { abiCall } from '@algorandfoundation/algorand-typescript/arc4'
import type { PluginDex } from '../../plugin-dex/contract.algo'
import { tmHolding, tmPoolAddress, tmSwapAs } from '../../plugin-dex/venues/tinyman-v2'

/**
 * MOCK, LocalNet only. This is not Haystack's code and has none of it.
 *
 * A stand-in for Haystack's ORDER_ROUTER v4 (MainNet app 3757715482) so the apps' Haystack swap path runs on
 * LocalNet. It keeps the parts of the real calls our code reads, decoded from the live API's routes:
 *
 *   prefix    selector a83187ea, a no-op here (reference carrier)
 *   finalize  selector 871a0354, 7 args:
 *     arg 1  uint16 length, uint64 asset ids: [0] input, [1] output (ALGO = 0)
 *     arg 2  uint16 length, 32-byte addresses (unused here)
 *     arg 3  the route (the mock's own encoding, after a uint16 length): legs, each
 *            `itob(amountIn) ‖ itob(hopCount) ‖ hops`; each hop is `itob(venue) ‖ itob(app) ‖ itob(pool) ‖
 *            itob(escrow) ‖ itob(assetOut)`; venue 0 = Plugin DEX (app = Vault, pool = pool id, escrow = pool
 *            escrow app), venue 1 = Tinyman v2 (app = AMM app; the pool address is derived from the pair)
 *     arg 4  93 bytes: minAmountOut at 2, expected output at 10, beneficiary at 29, referrer at 61
 *     arg 5  39 bytes (unused here)        arg 6  uint16 length, tag (unused here)
 *
 * Like the real router, finalize takes its input from the transaction right before it: a pay/axfer of the input
 * asset to this app, with no close-out or clawback. Whoever sent it does not matter (Haystack's per-swap account
 * or the user). The legs run in inner transactions from this app's account with fee 0 (outer fees pay them), the
 * whole output goes to the beneficiary, and finalize fails below minAmountOut. `opt_in(itob(asset))` (a mock
 * call) opts this app into the input asset, so it can receive the input later in the same group; finalize opts
 * into the assets it receives. Any other call is a no-op. Opt-ins are paid from this app's own ALGO.
 */
@contract({ avmVersion: 13 })
export class MockHaystackRouterLocalNet extends BaseContract {
  approvalProgram(): boolean {
    if (Txn.applicationId.id === 0) return true
    loggedAssert(Txn.onCompletion === OnCompleteAction.NoOp, 'mockHsOnComplete')
    if (Txn.numAppArgs === 7 && Txn.applicationArgs(0) === FinalizeSelector) finalize()
    if (Txn.numAppArgs === 2 && Txn.applicationArgs(0) === OptInSelector) optInIfNeeded(op.btoi(Txn.applicationArgs(1)))
    return true
  }

  clearStateProgram(): boolean {
    return true
  }
}

const FinalizeSelector = Bytes.fromHex('871a0354')
const OptInSelector = Bytes('opt_in')
const VenuePluginDex: uint64 = 0
const VenueTinyman: uint64 = 1
const HopSize: uint64 = 40

function word(data: bytes, offset: uint64): uint64 {
  return op.extractUint64(data, offset)
}

function finalize(): void {
  const assets = Txn.applicationArgs(1)
  loggedAssert(assets.length >= 18 && op.extractUint16(assets, 0) >= 2, 'mockHsArgs')
  const assetIn = word(assets, 2)
  const assetOut = word(assets, 10)
  const routeArg = Txn.applicationArgs(3)
  const route = op.extract(routeArg, 2, op.extractUint16(routeArg, 0))
  const terms = Txn.applicationArgs(4)
  loggedAssert(terms.length === 93, 'mockHsArgs')
  const minAmountOut = word(terms, 2)
  const beneficiary = Account(op.extract(terms, 29, 32))
  const self = Global.currentApplicationAddress
  loggedAssert(assetIn !== assetOut, 'mockHsArgs')

  // the input: the transaction right before this call, to this app, no close-out or clawback, any sender
  const inputIndex: uint64 = Txn.groupIndex - 1
  let amountIn: uint64 = 0
  if (assetIn === 0) {
    loggedAssert(gtxn.Transaction(inputIndex).type === TransactionType.Payment, 'mockHsInput')
    const pay = gtxn.PaymentTxn(inputIndex)
    loggedAssert(pay.receiver === self && pay.closeRemainderTo === Global.zeroAddress, 'mockHsInput')
    amountIn = pay.amount
  } else {
    loggedAssert(gtxn.Transaction(inputIndex).type === TransactionType.AssetTransfer, 'mockHsInput')
    const axfer = gtxn.AssetTransferTxn(inputIndex)
    loggedAssert(
      axfer.assetReceiver === self &&
        axfer.xferAsset.id === assetIn &&
        axfer.assetCloseTo === Global.zeroAddress &&
        axfer.assetSender === Global.zeroAddress,
      'mockHsInput',
    )
    amountIn = axfer.assetAmount
  }
  loggedAssert(amountIn > 0, 'mockHsInput')

  optInIfNeeded(assetOut)
  const before = tmHolding(self, assetOut)
  let spent: uint64 = 0
  let offset: uint64 = 0
  while (offset < route.length) {
    const legIn = word(route, offset)
    const hops = word(route, offset + 8)
    offset += 16
    loggedAssert(hops > 0, 'mockHsRoute')
    let asset = assetIn
    let amount = legIn
    for (let i: uint64 = 0; i < hops; i++) {
      const venue = word(route, offset)
      const app = Application(word(route, offset + 8))
      const pool = word(route, offset + 16)
      const escrow = Application(word(route, offset + 24))
      const next = word(route, offset + 32)
      offset += HopSize
      optInIfNeeded(next)
      if (venue === VenuePluginDex) {
        amount = swapPluginDex(app, pool, escrow.address, asset, amount, next)
      } else {
        loggedAssert(venue === VenueTinyman, 'mockHsVenue')
        amount = tmSwapAs(self, app, tmPoolAddress(app, asset, next), asset, amount, next, 1, self)
      }
      asset = next
    }
    loggedAssert(asset === assetOut, 'mockHsRoute')
    spent += legIn
  }
  loggedAssert(spent === amountIn, 'mockHsRoute')

  const amountOut: uint64 = tmHolding(self, assetOut) - before
  loggedAssert(amountOut >= minAmountOut, 'mockHsSlippage')
  if (assetOut === 0) {
    itxn.payment({ receiver: beneficiary, amount: amountOut, fee: 0 }).submit()
  } else {
    itxn.assetTransfer({ xferAsset: assetOut, assetReceiver: beneficiary, assetAmount: amountOut, fee: 0 }).submit()
  }
}

/** One Plugin DEX pool: [deposit → escrow, Vault.swap] paying this app; returns the measured output */
function swapPluginDex(vault: Application, pool: uint64, escrow: Account, assetIn: uint64, amountIn: uint64, assetOut: uint64): uint64 {
  const self = Global.currentApplicationAddress
  const before = tmHolding(self, assetOut)
  if (assetIn === 0) {
    abiCall<typeof PluginDex.prototype.swap>({
      appId: vault,
      args: [itxn.payment({ receiver: escrow, amount: amountIn, fee: 0 }), pool, 1, self, Bytes(''), 0],
      fee: 0,
    })
  } else {
    abiCall<typeof PluginDex.prototype.swap>({
      appId: vault,
      args: [
        itxn.assetTransfer({ assetReceiver: escrow, xferAsset: assetIn, assetAmount: amountIn, fee: 0 }),
        pool,
        1,
        self,
        Bytes(''),
        0,
      ],
      fee: 0,
    })
  }
  return tmHolding(self, assetOut) - before
}

function optInIfNeeded(asset: uint64): void {
  if (asset === 0) return
  const self = Global.currentApplicationAddress
  const [, optedIn] = op.AssetHolding.assetBalance(self, asset)
  if (!optedIn) itxn.assetTransfer({ xferAsset: asset, assetReceiver: self, assetAmount: 0, fee: 0 }).submit()
}
