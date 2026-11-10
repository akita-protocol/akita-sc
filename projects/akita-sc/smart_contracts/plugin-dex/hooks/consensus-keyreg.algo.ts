import {
  Account,
  Application,
  BoxMap,
  bytes,
  clone,
  Contract,
  emit,
  Global,
  GlobalState,
  itxn,
  loggedAssert,
  op,
  Txn,
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { abimethod } from '@algorandfoundation/algorand-typescript/arc4'
import { HookPointPoke, HookResultRequestCustody } from '../constants'
import { passResult, rekeyBackToDex, requireDexCaller } from '../hook-interface'
import { HookContext, HookResult } from '../types'

/** `ctx.data` of an operator poke: one byte */
export const KeyregActionOffline: uint64 = 0
export const KeyregActionOnline: uint64 = 1

/** Per-pool participation key material and the account allowed to switch it (box `k` + poolId) */
export type PoolKeys = {
  /** the only `ctx.caller` whose poke changes the escrow's consensus status */
  operator: Account
  voteKey: bytes<32>
  selectionKey: bytes<32>
  stateProofKey: bytes<64>
  voteFirst: uint64
  voteLast: uint64
  voteKeyDilution: uint64
}

export type KeyregEvent = {
  poolId: uint64
  escrow: Account
  online: boolean
  /** keyreg fee the escrow paid (and this hook pre-donated): the go-online incentive fee or 0 */
  fee: uint64
}

/**
 * ConsensusKeyregHook (FINAL-SPEC §4.14): a Poke-only custody hook that registers a pool escrow for
 * consensus participation, so the escrow's reserves earn block proposer payouts for the LPs.
 *
 * Install with points = Poke, perms = Custody, flags = LazyCustody. The admin (the DAO wallet) sets each
 * pool's participation keys and operator; the operator pokes the pool with `data = [1]` to go online
 * or `data = [0]` to go offline.
 *
 * - Lazy custody: only an operator poke with a valid action returns RequestCustody. Every other call
 *   (non-operator, a pool with no keys, another hook point) is a no-op, and the escrow is never rekeyed.
 *   When installed eagerly, those calls hand custody straight back.
 * - Going online pays the incentive keyreg fee (`Global.payoutsGoOnlineFee`, 2 ALGO) from the escrow when
 *   payouts are enabled and the escrow is not yet incentive-eligible. The hook pre-donates exactly that
 *   fee from its own balance (the "fee tank") in the same custody call, so the Vault's custody guard sees
 *   a net ALGO delta of 0. Going offline costs the escrow nothing (fee 0).
 * - Consensus rewards later arrive in the escrow as surplus and are booked into reserves by `sync`.
 *
 * The tank is this app's ALGO balance (F6 funding, direct payments). It also carries the MBR of the
 * per-pool key boxes. The admin can withdraw the excess.
 */
export class ConsensusKeyregHook extends Contract {
  dex = GlobalState<Application>({ key: 'dex' })
  admin = GlobalState<Account>({ key: 'admin' })
  /** account named by `proposeAdmin`; set only while a handover is pending */
  pendingAdmin = GlobalState<Account>({ key: 'pending_admin' })
  keys = BoxMap<uint64, PoolKeys>({ keyPrefix: 'k' })

  @abimethod({ onCreate: 'require' })
  create(dex: Application, admin: Account): void {
    this.dex.value = dex
    this.admin.value = admin
  }

  private onlyAdmin(): void {
    loggedAssert(Txn.sender === this.admin.value, 'errCkad')
  }

  /**
   * Step 1 of an admin handover (admin only): name the account that may take over. The admin does not
   * change until that account calls `acceptAdmin`, so an address that cannot call this app (a typo, or
   * a wallet with no way to make the call) can never end up as admin. Proposing again replaces the
   * pending account; proposing the zero address cancels (readiness audit 2026-11-09, C10).
   */
  proposeAdmin(admin: Account): void {
    this.onlyAdmin()
    this.pendingAdmin.value = admin
  }

  /** Step 2 of an admin handover: the proposed account takes over by calling this itself. */
  acceptAdmin(): void {
    loggedAssert(this.pendingAdmin.hasValue && Txn.sender === this.pendingAdmin.value, 'errCkad')
    this.admin.value = Txn.sender
    this.pendingAdmin.delete()
  }

  /** set (or rotate) a pool's operator and participation keys; the box MBR comes from the tank */
  setPoolKeys(poolId: uint64, keys: PoolKeys): void {
    this.onlyAdmin()
    loggedAssert(keys.voteFirst <= keys.voteLast, 'errCkkw')
    this.keys(poolId).value = clone(keys)
  }

  /** stop managing a pool: no operator can switch it any more (the escrow keeps its current status) */
  deletePoolKeys(poolId: uint64): void {
    this.onlyAdmin()
    this.keys(poolId).delete()
  }

  /** send `amount` µALGO of the tank to the admin */
  withdraw(amount: uint64): void {
    this.onlyAdmin()
    itxn.payment({ receiver: this.admin.value, amount }).submit()
  }

  @abimethod({ readonly: true })
  getPoolKeys(poolId: uint64): PoolKeys {
    return this.keys(poolId).value
  }

  /** the incentive fee the next go-online keyreg of `escrow` pays (0 when payouts are off or it is already eligible) */
  private onlineFee(escrow: Account): uint64 {
    if (!Global.payoutsEnabled) return 0
    const [eligible] = op.AcctParams.acctIncentiveEligible(escrow)
    return eligible ? 0 : Global.payoutsGoOnlineFee
  }

  /** the requested action, or fails with errCkda */
  private action(data: bytes): uint64 {
    loggedAssert(data.length === 1, 'errCkda')
    const action = op.btoi(data)
    loggedAssert(action <= KeyregActionOnline, 'errCkda')
    return action
  }

  akitaDexHook(dex: Application, hookIndex: uint64, ctx: HookContext): HookResult {
    requireDexCaller(this.dex.value)

    let operator = false
    if (ctx.point === HookPointPoke && this.keys(ctx.poolId).exists) {
      operator = this.keys(ctx.poolId).value.operator === ctx.caller
    }

    if (!ctx.custody) {
      if (!operator) return passResult()
      this.action(ctx.data)
      return { flags: HookResultRequestCustody, feeBps: 0, hookFee: 0, hookFeeOutBps: 0 }
    }

    if (!operator) {
      rekeyBackToDex(this.dex.value, ctx.escrow)
      return passResult()
    }

    if (this.action(ctx.data) === KeyregActionOnline) {
      const keys = clone(this.keys(ctx.poolId).value)
      const fee = this.onlineFee(ctx.escrow)
      if (fee > 0) {
        itxn.payment({ receiver: ctx.escrow, amount: fee }).submit()
      }
      itxn
        .keyRegistration({
          sender: ctx.escrow,
          fee,
          voteKey: keys.voteKey,
          selectionKey: keys.selectionKey,
          stateProofKey: keys.stateProofKey,
          voteFirst: keys.voteFirst,
          voteLast: keys.voteLast,
          voteKeyDilution: keys.voteKeyDilution,
          rekeyTo: this.dex.value.address,
        })
        .submit()
      emit<KeyregEvent>({ poolId: ctx.poolId, escrow: ctx.escrow, online: true, fee })
    } else {
      itxn.keyRegistration({ sender: ctx.escrow, fee: 0, rekeyTo: this.dex.value.address }).submit()
      emit<KeyregEvent>({ poolId: ctx.poolId, escrow: ctx.escrow, online: false, fee: 0 })
    }
    return passResult()
  }
}
