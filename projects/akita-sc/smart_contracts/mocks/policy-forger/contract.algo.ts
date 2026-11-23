import { Account, Application, bytes, Contract, itxn, itxnCompose, uint64 } from '@algorandfoundation/algorand-typescript'
import { getSpendingAccount } from '@akita-protocol/plugin/functions'
import type { AbstractedAccount } from '../../arc58/account/contract.algo'
import { CallerTypeOther } from '../../arc58/account/types'
import type { MetaPlugin } from '../../arc58/plugins/meta/contract.algo'

/**
 * Test-only plugin from the 2.0.0 release audit. Holding a no-escrow window, it acts as the wallet's
 * controlled address and opens the policy writer's admin grant with caller type Other, which resolves
 * to the wallet's own address without the wallet's admin check, then asks the writer to write a policy.
 * The writer must refuse because the window was not opened as CallerTypeAdmin.
 */
export class MockPolicyForger extends Contract {
  /** The nested window is closed inside this call. */
  forge(wallet: Application, writer: Application, plugin: uint64, caller: Account, body: bytes): void {
    const controlled = getSpendingAccount(wallet)
    itxnCompose.begin<typeof AbstractedAccount.prototype.arc58_rekeyToPlugin>({
      sender: controlled, appId: wallet, args: [writer.id, CallerTypeOther, '', [], []], fee: 0, rekeyTo: wallet.address,
    })
    itxnCompose.next<typeof MetaPlugin.prototype.configurePolicy>({
      appId: writer, args: [wallet, true, plugin, caller, '', body, 0], fee: 0,
    })
    itxnCompose.next<typeof AbstractedAccount.prototype.arc58_verifyAuthAddress>({ appId: wallet, fee: 0 })
    itxnCompose.submit()
  }

  /** Control: an ordinary plugin call that only hands the account back. */
  noop(wallet: Application): void {
    const controlled = getSpendingAccount(wallet)
    itxn.payment({ sender: controlled, receiver: controlled, amount: 0, rekeyTo: wallet.address, fee: 0 }).submit()
  }
}
