import { Account, Contract, Global, GlobalState, itxn, loggedAssert, Txn } from '@algorandfoundation/algorand-typescript'
import { abimethod } from '@algorandfoundation/algorand-typescript/arc4'

/**
 * Test stand-in for an ARC-58 wallet (FINAL-SPEC WP5a, akita-hooks A12 fixture 5). It publishes a
 * `controlled_address` global (the key AbstractedAccount uses) and nothing else: it has no
 * `spending_address` and never calls an app, so it can never satisfy a wallet hint
 * (utils/principal.ts: the direct arm needs `Global.callerApplicationId == W`, the plugin arm needs
 * `W.spending_address`). A "genuine" MockWallet is created by MockWalletFactory (set as
 * `AkitaAppList.wallet`); a "foreign" one is created directly by an EOA.
 *
 * Principal resolution (spec §6.12) removed the EscrowFactory registration this mock used to do. Hinted
 * cases run against real AbstractedAccount wallets (gated-fee.e2e.spec.ts, "principal resolution").
 *
 * The operator can rekey the wallet account to a test EOA, which then sends transactions with
 * `sender = wallet address`. The suite uses this to drive the DAO's wallet for DAO-only methods.
 */
export class MockWallet extends Contract {
  controlledAddress = GlobalState<Account>({ key: 'controlled_address' })
  admin = GlobalState<Account>({ key: 'admin' })
  operator = GlobalState<Account>({ key: 'operator' })

  @abimethod({ onCreate: 'require' })
  create(controlledAddress: Account, admin: Account, operator: Account): void {
    this.controlledAddress.value = controlledAddress === Global.zeroAddress ? Global.currentApplicationAddress : controlledAddress
    this.admin.value = admin
    this.operator.value = operator
  }

  /** Operator only: rekey the wallet account so a test EOA can sign as it */
  rekeyTo(to: Account): void {
    loggedAssert(Txn.sender === this.operator.value, 'errMwop')
    itxn.payment({ receiver: Global.currentApplicationAddress, amount: 0, rekeyTo: to }).submit()
  }
}
