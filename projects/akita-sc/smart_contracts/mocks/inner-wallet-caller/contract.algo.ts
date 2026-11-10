import { Application, Global, itxnCompose, uint64 } from '@algorandfoundation/algorand-typescript'
import { Contract } from '@algorandfoundation/algorand-typescript/arc4'
import { CallerTypeOther } from '../../arc58/account/types'

// CONTRACT IMPORTS
import type { AbstractedAccount } from '../../arc58/account/contract.algo'
import type { PayPlugin } from '../../arc58/plugins/pay/contract.algo'

/**
 * TEST-ONLY (ACC-02). Uses a caller-specific grant (caller = this app) from inside an inner
 * group with an inflated fee on the rekey call, the amplification path the wallet must not
 * reimburse. Never deploy outside tests.
 */
export class MockInnerWalletCaller extends Contract {
  /** [wallet.arc58_rekeyToPlugin(fee = rekeyFee), pay.pay(wallet, true, [0 µALGO to self]), wallet.arc58_verifyAuthAddress] */
  useGrant(wallet: Application, payPlugin: Application, rekeyFee: uint64): void {
    itxnCompose.begin<typeof AbstractedAccount.prototype.arc58_rekeyToPlugin>({
      appId: wallet,
      args: [payPlugin.id, CallerTypeOther, '', [], []],
      fee: rekeyFee,
    })
    itxnCompose.next<typeof PayPlugin.prototype.pay>({
      appId: payPlugin,
      args: [wallet, true, [{ receiver: Global.currentApplicationAddress, asset: 0, amount: 0 }]],
    })
    itxnCompose.next<typeof AbstractedAccount.prototype.arc58_verifyAuthAddress>({
      appId: wallet,
    })
    itxnCompose.submit()
  }
}
