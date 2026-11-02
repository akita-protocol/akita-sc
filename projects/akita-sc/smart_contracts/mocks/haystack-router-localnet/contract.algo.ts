import {
  Account,
  Application,
  BaseContract,
  Bytes,
  bytes,
  contract,
  Global,
  itxn,
  loggedAssert,
  OnCompleteAction,
  op,
  Txn,
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { abiCall } from '@algorandfoundation/algorand-typescript/arc4'
import type { PluginDex } from '../../plugin-dex/contract.algo'
import { tmHolding, tmPoolAddress, tmSwapAs } from '../../plugin-dex/venues/tinyman-v2'

/**
 * MOCK, LocalNet only. This is not Haystack's code and has none of it.
 *
 * A stand-in for the Haystack router app so the apps' Haystack swap path runs on LocalNet. It keeps
 * the parts of the real finalize call that our code reads: method selector `c890dc20`, more than 8
 * app args, arg 2 = index of the output asset in `assets`, arg 4 = itob(minAmountOut), arg 6 = index
 * of the beneficiary in `accounts`, arg 8 = index of the referrer in `accounts`. The positions our code
 * ignores carry the route:
 *
 *   arg 1  route: legs, each `itob(amountIn) ‖ itob(hopCount) ‖ hops`; each hop is
 *          `itob(venue) ‖ itob(app) ‖ itob(pool) ‖ itob(escrow) ‖ itob(assetOut)`
 *          venue 0 = Plugin DEX (app = Vault, pool = pool id, escrow = pool escrow app),
 *          venue 1 = Tinyman v2 (app = AMM app; the pool address is derived from the pair)
 *   arg 3  itob(assetIn)        arg 5  itob(amountIn)        arg 7  itob(assetOut), so an ALGO output needs
 *          no asset reference (for an ASA output, arg 2 must point at the same asset)
 *
 * Like Haystack's router, finalize does not check an input transaction: it needs amountIn of the input asset
 * in this app's account (from any earlier transfer in the group, outer or inner). The legs run in inner
 * transactions from this app's account with fee 0 (outer fees pay them), the whole output goes to the
 * beneficiary, and finalize fails below minAmountOut. `opt_in(itob(asset))` opts this app into the
 * input asset, so it can receive the input later in the same group; finalize opts into the assets it receives.
 * Any other call is a no-op reference carrier. Opt-ins are paid from this app's own ALGO.
 */
@contract({ avmVersion: 13 })
export class MockHaystackRouterLocalNet extends BaseContract {
  approvalProgram(): boolean {
    if (Txn.applicationId.id === 0) return true
    loggedAssert(Txn.onCompletion === OnCompleteAction.NoOp, 'mockHsOnComplete')
    if (Txn.numAppArgs > 8 && Txn.applicationArgs(0) === FinalizeSelector) finalize()
    if (Txn.numAppArgs === 2 && Txn.applicationArgs(0) === OptInSelector) optInIfNeeded(argUint(1))
    return true
  }

  clearStateProgram(): boolean {
    return true
  }
}

const FinalizeSelector = Bytes.fromHex('c890dc20')
const OptInSelector = Bytes('opt_in')
const VenuePluginDex: uint64 = 0
const VenueTinyman: uint64 = 1
const HopSize: uint64 = 40

function argUint(index: uint64): uint64 {
  return op.btoi(Txn.applicationArgs(index))
}

function word(data: bytes, offset: uint64): uint64 {
  return op.extractUint64(data, offset)
}

function finalize(): void {
  const route = Txn.applicationArgs(1)
  const assetOut = argUint(7)
  if (assetOut !== 0) loggedAssert(Txn.assets(argUint(2)).id === assetOut, 'mockHsArgs')
  const assetIn = argUint(3)
  const minAmountOut = argUint(4)
  const amountIn = argUint(5)
  const beneficiary = Txn.accounts(argUint(6))
  const self = Global.currentApplicationAddress
  loggedAssert(assetIn !== assetOut && amountIn > 0, 'mockHsArgs')

  // like Haystack's router, finalize swaps from this app's own balance and never looks at an input transaction:
  // the input may be any earlier pay/axfer to this app, or an inner one (an Akita wallet's HaystackRouterPlugin)
  const available: uint64 = assetIn === 0 ? self.balance - self.minBalance : tmHolding(self, assetIn)
  loggedAssert(available >= amountIn, 'mockHsInput')

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
