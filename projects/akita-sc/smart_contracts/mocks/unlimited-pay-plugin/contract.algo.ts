import { Application, Contract, Global, itxn, uint64 } from '@algorandfoundation/algorand-typescript'
import { getOpenGrantSpendingAccount, rekeyAddress } from '@akita-protocol/plugin/functions'
import { PayParams } from '../../arc58/plugins/pay/types'

/**
 * Test-only payment plugin with PayPlugin's `pay` ABI and no grant policy, as PayPlugin was before
 * policies. Wallet tests use it where any global grant that moves funds will do; PayPlugin itself
 * refuses a global grant without an execution key or a policy. It asks for the open-grant helper by
 * name for that reason: no production plugin that moves funds may do so.
 */
export class MockUnlimitedPayPlugin extends Contract {
  pay(wallet: Application, rekeyBack: boolean, payments: PayParams[]): void {
    const sender = getOpenGrantSpendingAccount(wallet)
    for (let i: uint64 = 0; i < payments.length; i++) {
      const { receiver, asset, amount } = payments[i]
      const rekeyTo = i < (payments.length - 1) ? Global.zeroAddress : rekeyAddress(rekeyBack, wallet)
      if (asset === 0) {
        itxn.payment({ sender, receiver, amount, rekeyTo }).submit()
      } else {
        itxn.assetTransfer({ sender, assetReceiver: receiver, assetAmount: amount, xferAsset: asset, rekeyTo }).submit()
      }
    }
  }
}
