import { Account, bytes, Contract, Global, GlobalState, gtxn, itxn, loggedAssert, Txn, uint64 } from '@algorandfoundation/algorand-typescript'
import { abimethod, compileArc4 } from '@algorandfoundation/algorand-typescript/arc4'
import { PluginInstall } from '../../arc58/account/types'
import { MockWallet } from './mock-wallet.algo'

/** µALGO a new MockWallet receives (at least its own minimum balance) */
export const MockWalletFunding: uint64 = 200_000

/**
 * Test stand-in for AbstractedAccountFactory (FINAL-SPEC WP5a, akita-hooks A12 fixture 5). Set as
 * `AkitaAppList.wallet`, so every MockWallet it creates passes the ACC-01 creator check. `cost` and
 * `newAccount` are ABI-compatible with the real factory, so `AkitaDAO.setup` can create the DAO's
 * wallet through it. Every wallet's operator is the factory's creator. Fund the factory account for
 * the child-app creation MBR.
 */
export class MockWalletFactory extends Contract {
  operator = GlobalState<Account>({ key: 'operator' })

  @abimethod({ onCreate: 'require' })
  create(): void {
    this.operator.value = Txn.sender
  }

  @abimethod({ readonly: true })
  cost(): uint64 {
    return MockWalletFunding
  }

  newAccount(
    payment: gtxn.PaymentTxn,
    controlledAddress: Account,
    admin: Account,
    nickname: string,
    referrer: Account,
    salt: bytes<32>,
    bio: string,
    automaticUpdates: boolean,
    extraFunding: uint64,
    assets: uint64[],
    plugins: PluginInstall[],
  ): uint64 {
    loggedAssert(payment.receiver === Global.currentApplicationAddress && payment.amount >= MockWalletFunding, 'errMwfp')
    const wallet = compileArc4(MockWallet).call.create({
      args: [controlledAddress, admin, this.operator.value],
    }).itxn.createdApp
    itxn.payment({ receiver: wallet.address, amount: payment.amount }).submit()
    return wallet.id
  }
}
