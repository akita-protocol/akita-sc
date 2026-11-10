import { UpgradeableAkitaBaseContract } from './upgradeable'

import { Application, Asset, clone, Global, GlobalState, gtxn, itxn, itxnCompose, loggedAssert, Txn, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod, Contract } from '@algorandfoundation/algorand-typescript/arc4'
import { errEscrowDoesNotExist, errWrongEscrowForOperation } from '../../arc58/account/errors'
import { CallerTypeGlobal, EscrowInfo } from '../../arc58/account/types'
import { GlobalStateKeyAkitaEscrow } from '../../constants'
import { errNotAkitaDao } from '../../errors'

// CONTRACT IMPORTS
import type { AbstractedAccount } from '../../arc58/account/contract.algo'
import { errInvalidPaymentAmount, errInvalidPaymentReceiver } from '../errors'
import { getPluginAppList, splitOptInCount } from '../functions'

class RevenueManagerPluginStub extends Contract {
  optIn(wallet: Application, rekeyBack: boolean, assets: uint64[], mbrPayment: gtxn.PaymentTxn): void {
    return
  }
}

/**
 * On-chain configuration for a named revenue escrow. Binds the escrow's
 * human-readable name (e.g. `rev_subscriptions`) to the `Application`
 * that actually holds the escrow account.
 *
 * The name is used when rekeying the DAO wallet into the revenue-manager
 * plugin (see `AbstractedAccount.arc58_rekeyToPlugin`) and when looking up
 * the escrow via `arc58_getEscrows`. The app id is used for asset
 * transfers and opt-in checks.
 *
 * Stored as a single global-state bytes slot per fee-generator contract
 * so that the escrow routing is inspectable from state and can be
 * atomically updated by the DAO via `updateAkitaDAOEscrow`.
 */
export type EscrowConfig = {
  name: string,
  app: Application
}

export type AkitaConfig = {
  akitaDAO: Application,
  akitaDAOEscrow: EscrowConfig
}

export class AkitaBaseFeeGeneratorContractWithoutAkitaOptIn extends UpgradeableAkitaBaseContract {

  /** the named DAO escrow this contract routes fees to (name + app) */
  akitaDAOEscrow = GlobalState<EscrowConfig>({ key: GlobalStateKeyAkitaEscrow })

  updateAkitaDAOEscrow(config: EscrowConfig): void {
    loggedAssert(Txn.sender === this.getAkitaDAOWallet().address, errNotAkitaDao)
    this.akitaDAOEscrow.value = clone(config)
  }
}

export class AkitaBaseFeeGeneratorContract extends AkitaBaseFeeGeneratorContractWithoutAkitaOptIn {

  /** this will error if escrow id is zero meaning we cant have a rev escrow thats a regular account */
  protected getEscrow(name: string): EscrowInfo {
    const appId = this.getAkitaDAOWallet()

    const escrow = abiCall<typeof AbstractedAccount.prototype.arc58_getEscrows>({
      appId,
      args: [[name]],
    }).returnValue[0]

    loggedAssert(escrow.id !== 0, errEscrowDoesNotExist)

    return escrow
  }

  /**
   * Rekeys the DAO wallet into the revenue-manager plugin, opts the
   * configured escrow into `asset` (covering the escrow's opt-in MBR),
   * and optionally transfers `amount` of `asset` to the escrow in the
   * same inner-txn group.
   *
   * The escrow's name + app are read from `this.akitaDAOEscrow.value`
   * (set at contract-create time, updatable by the DAO), so callers
   * don't pass the name in.
   */
  protected optAkitaEscrowInAndSend(asset: Asset, amount: uint64): uint64 {

    const wallet = this.getAkitaDAOWallet()
    const { revenueManager } = getPluginAppList(this.akitaDAO.value)

    const escrow = clone(this.akitaDAOEscrow.value)
    const { id } = this.getEscrow(escrow.name)
    loggedAssert(id === escrow.app.id, errWrongEscrowForOperation)

    itxnCompose.begin<typeof AbstractedAccount.prototype.arc58_rekeyToPlugin>({
      appId: wallet,
      args: [
        revenueManager,
        CallerTypeGlobal,
        escrow.name,
        [0], // all the akita escrows have method restrictions with optin being index 0
        []
      ],
    })

    const optInCount = splitOptInCount(
      this.akitaDAO.value,
      escrow.app.address,
      asset
    )

    const mbrAmount: uint64 = Global.assetOptInMinBalance * optInCount

    itxnCompose.next<typeof RevenueManagerPluginStub.prototype.optIn>({
      appId: revenueManager,
      args: [
        wallet,
        true,
        [asset.id],
        itxn.payment({
          receiver: escrow.app.address,
          amount: mbrAmount
        })
      ]
    })

    itxnCompose.next<typeof AbstractedAccount.prototype.arc58_verifyAuthAddress>({ appId: wallet })

    if (amount > 0) {
      itxnCompose.next(
        itxn.assetTransfer({
          assetReceiver: escrow.app.address,
          assetAmount: amount,
          xferAsset: asset,
        })
      )
    }

    itxnCompose.submit()

    return mbrAmount
  }

  /**
   * Send `amount` of `asset` (asset 0 = ALGO) from this app to its configured DAO revenue escrow
   * (`akitaDAOEscrow`). If the escrow is not opted into the ASA yet, it is opted in through the
   * revenue-manager plugin first (this app pays that opt-in MBR, see `optAkitaEscrowInAndSend`).
   * No-op for `amount === 0`. Returns the opt-in MBR this app spent (0 if none).
   */
  protected sendToAkitaEscrow(asset: Asset, amount: uint64): uint64 {
    if (amount === 0) {
      return 0
    }

    const escrow = this.akitaDAOEscrow.value.app.address

    if (asset.id === 0) {
      itxn.payment({ receiver: escrow, amount }).submit()
      return 0
    }

    if (escrow.isOptedIn(asset)) {
      itxn.assetTransfer({ assetReceiver: escrow, assetAmount: amount, xferAsset: asset }).submit()
      return 0
    }

    return this.optAkitaEscrowInAndSend(asset, amount)
  }
}

export class AkitaFeeGeneratorContractWithOptIn extends AkitaBaseFeeGeneratorContract {

  /**
   * optIn opts this contract into `asset`. When this contract has a
   * named escrow configured (`akitaDAOEscrow.value.name !== ''`), it
   * also opts the escrow and every revenue-split recipient in through
   * the revenue-manager plugin — so downstream methods (subscribe,
   * list, etc.) can transfer to the escrow without doing the plugin-
   * rekey dance mid-group.
   *
   * Payment must cover:
   *   - this contract's own opt-in (1 × assetOptInMinBalance), plus
   *   - each downstream opt-in the escrow still needs.
   * `splitOptInCount` returns 0 once the escrow is already opted in, so
   * the charge collapses to just 1 × assetOptInMinBalance on repeat
   * calls and the escrow branch becomes a no-op.
   *
   * @param payment The payment transaction covering MBR for all opt-ins
   * @param asset The asset to opt into
   */
  optIn(payment: gtxn.PaymentTxn, asset: Asset): void {

    const escrow = clone(this.akitaDAOEscrow.value)
    const count = splitOptInCount(this.akitaDAO.value, escrow.app.address, asset)

    loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPaymentReceiver)
    loggedAssert(payment.amount === Global.assetOptInMinBalance * (1 + count), errInvalidPaymentAmount)

    itxn
      .assetTransfer({
        assetReceiver: Global.currentApplicationAddress,
        assetAmount: 0,
        xferAsset: asset
      })
      .submit()

    // Eagerly opt the dedicated revenue escrow + split recipients in
    // when a named escrow is configured. The rekey inside
    // `optAkitaEscrowInAndSend` targets the DAO wallet (a different
    // AbstractedAccount instance than any caller's wallet), so this is
    // safe to invoke from inside a plugin rekey on the caller's wallet.
    if (count > 0 && escrow.name !== '') {
      this.optAkitaEscrowInAndSend(asset, 0)
    }
  }

  @abimethod({ readonly: true })
  optInCost(asset: Asset): uint64 {
    const count = splitOptInCount(this.akitaDAO.value, this.akitaDAOEscrow.value.app.address, asset)
    return Global.assetOptInMinBalance * (1 + count)
  }
}