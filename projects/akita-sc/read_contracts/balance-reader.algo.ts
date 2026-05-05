import {
  abimethod,
  Account,
  Application,
  Asset,
  contract,
  GlobalState,
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { abiCall, Contract } from '@algorandfoundation/algorand-typescript/arc4'
import { AssetHolding } from '@algorandfoundation/algorand-typescript/op'

import { GlobalStateKeyAkitaDAO } from '../../constants'
import { getAkitaAppList } from '../../utils/functions'

// CONTRACT IMPORTS
import type { Staking } from '../../staking/contract.algo'

/**
 * Immutable readonly helper that reports the combined balance
 * (wallet holdings + staked hard + staked lock) for an address.
 *
 * This was extracted from `AbstractedAccount.balance()` to keep that logic
 * available for downstream contracts without keeping it on-chain in the
 * wallet bytecode. The contract intentionally has no UpdateApplication
 * handler, so once deployed it cannot be re-keyed / upgraded and callers
 * can trust its response shape over time.
 *
 * A balance returned by this contract is still only as trustworthy as
 * the underlying AkitaDAO + Staking apps it queries — do not use it as
 * a security-critical balance source for an adversarial wallet.
 */
@contract({
  stateTotals: { globalBytes: 1, globalUints: 0 }
})
export class AbstractedAccountBalanceReader extends Contract {
  /** The app ID of the Akita DAO used to resolve the Staking app */
  akitaDAO = GlobalState<Application>({ key: GlobalStateKeyAkitaDAO })

  /**
   * @param akitaDAO The app ID of the Akita DAO used to resolve dependent apps
   */
  @abimethod({ onCreate: 'require' })
  create(akitaDAO: uint64): void {
    this.akitaDAO.value = Application(akitaDAO)
  }

  /**
   * Get the balance of a set of assets at the given address, including any
   * amounts that address has staked in the Akita staking contract.
   *
   * @param address The address to look up balances for
   * @param assets The asset IDs to check balances for (0 for ALGO)
   * @returns The total balance for each asset (wallet + staked hard + staked lock)
   */
  @abimethod({ readonly: true })
  balance(address: Account, assets: uint64[]): uint64[] {
    let amounts: uint64[] = []
    for (let i: uint64 = 0; i < assets.length; i += 1) {
      let amount: uint64 = 0
      const asset = Asset(assets[i])

      if (asset.id === 0) {
        amount = address.balance
      } else {
        const [holdingAmount, optedIn] = AssetHolding.assetBalance(address, asset)
        if (optedIn) {
          amount = holdingAmount
        }
      }

      const escrowInfo = abiCall<typeof Staking.prototype.getEscrowInfo>({
        appId: getAkitaAppList(this.akitaDAO.value).staking,
        args: [
          address,
          asset.id
        ]
      }).returnValue

      amounts = [...amounts, (amount + escrowInfo.hard + escrowInfo.lock)]
    }

    return amounts
  }
}
