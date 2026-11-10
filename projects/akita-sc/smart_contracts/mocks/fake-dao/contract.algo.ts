import { Account, clone, Global, GlobalState, uint64 } from '@algorandfoundation/algorand-typescript'
import { abimethod, compileArc4, Contract } from '@algorandfoundation/algorand-typescript/arc4'
import { AkitaDAOGlobalStateKeysAkitaAppList } from '../../arc58/dao/constants'
import { AkitaAppList } from '../../arc58/dao/types'
import { MockFakeWallet } from '../fake-wallet/contract.algo'

/**
 * TEST-ONLY (E26/T43). A fake DAO whose `AkitaAppList.wallet` names a rogue "wallet factory":
 * this app itself, which spawns `MockFakeWallet` children (creator = this app). A wallet admin can
 * point a genuine wallet's `akita_dao` here (`setAkitaDAO`), so any consumer that took the wallet
 * factory from `W.akita_dao` would accept the rogue children as genuine. Never deploy outside tests.
 */
export class MockFakeDAO extends Contract {
  akitaAppList = GlobalState<AkitaAppList>({ key: AkitaDAOGlobalStateKeysAkitaAppList })

  @abimethod({ onCreate: 'require' })
  create(): void {
    this.akitaAppList.value = {
      staking: 0,
      rewards: 0,
      pool: 0,
      prizeBox: 0,
      subscriptions: 0,
      gate: 0,
      auction: 0,
      hyperSwap: 0,
      raffle: 0,
      metaMerkles: 0,
      marketplace: 0,
      wallet: Global.currentApplicationId.id,
    }
  }

  /** Point `AkitaAppList.gate` at `gate` (gateCheckCtx tests use an approve-all stand-in gate). */
  setGate(gate: uint64): void {
    const list = clone(this.akitaAppList.value)
    list.gate = gate
    this.akitaAppList.value = clone(list)
  }

  /** Create a fake wallet child (creator = this app, the rogue factory). Fund this app first. */
  spawn(controlledAddress: Account, referrer: Account, spendingAddress: Account): uint64 {
    return compileArc4(MockFakeWallet).call.create({
      args: [controlledAddress, referrer, spendingAddress],
    }).itxn.createdApp.id
  }
}
