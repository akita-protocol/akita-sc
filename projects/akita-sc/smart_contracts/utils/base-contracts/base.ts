import { Application, Asset, Bytes, clone, Global, GlobalState, gtxn, itxn, itxnCompose, loggedAssert, op, Txn, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod, Contract } from '@algorandfoundation/algorand-typescript/arc4'
import { ERR_ESCROW_DOES_NOT_EXIST, ERR_WRONG_ESCROW_FOR_OPERATION } from '../../arc58/account/errors'
import { CallerTypeGlobal, EscrowInfo } from '../../arc58/account/types'
import { AkitaDAOGlobalStateKeysWallet } from '../../arc58/dao/constants'
import { GlobalStateKeyAkitaDAO, GlobalStateKeyAkitaEscrow, GlobalStateKeyVersion } from '../../constants'
import { ERR_NOT_AKITA_DAO, ERR_INVALID_UPGRADE } from '../../errors'

// CONTRACT IMPORTS
import type { AbstractedAccount } from '../../arc58/account/contract.algo'
import { ERR_INVALID_PAYMENT_AMOUNT, ERR_INVALID_PAYMENT_RECEIVER } from '../errors'
import { getPluginAppList, splitOptInCount } from '../functions'

class RevenueManagerPluginStub extends Contract {
  optIn(wallet: Application, rekeyBack: boolean, assets: uint64[], mbrPayment: gtxn.PaymentTxn): void {
    return
  }
}

export class AkitaBaseContract extends Contract {

  // GLOBAL STATE ---------------------------------------------------------------------------------

  /** the current version of the contract */
  version = GlobalState<string>({ key: GlobalStateKeyVersion })
  /** the app ID of the Akita DAO */
  akitaDAO = GlobalState<Application>({ key: GlobalStateKeyAkitaDAO })

  protected getAkitaDAOWallet(): Application {
    const [walletID] = op.AppGlobal.getExUint64(this.akitaDAO.value, Bytes(AkitaDAOGlobalStateKeysWallet))
    return Application(walletID)
  }

  // AKITA BASE CONTRACT METHODS ------------------------------------------------------------------

  updateAkitaDAO(akitaDAO: Application): void {
    loggedAssert(Txn.sender === this.getAkitaDAOWallet().address, ERR_NOT_AKITA_DAO)
    this.akitaDAO.value = akitaDAO
  }

  opUp(): void { }
}

export class UpgradeableAkitaBaseContract extends AkitaBaseContract {

  @abimethod({ allowActions: ['UpdateApplication'] })
  update(newVersion: string): void {
    loggedAssert(Txn.sender === this.getAkitaDAOWallet().address, ERR_NOT_AKITA_DAO)
    const updatePlugin = getPluginAppList(this.akitaDAO.value).update
    loggedAssert(Global.callerApplicationId === updatePlugin, ERR_INVALID_UPGRADE)
    this.version.value = newVersion
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
    loggedAssert(Txn.sender === this.getAkitaDAOWallet().address, ERR_NOT_AKITA_DAO)
    this.akitaDAOEscrow.value = clone(config)
  }
}

export class AkitaBaseFeeGeneratorContract extends AkitaBaseFeeGeneratorContractWithoutAkitaOptIn {

  protected getEscrow(name: string): EscrowInfo {
    const appId = this.getAkitaDAOWallet()

    const escrow = abiCall<typeof AbstractedAccount.prototype.arc58_getEscrows>({
      appId,
      args: [[name]],
    }).returnValue[0]

    loggedAssert(escrow.id !== 0, ERR_ESCROW_DOES_NOT_EXIST)

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
    loggedAssert(id === escrow.app.id, ERR_WRONG_ESCROW_FOR_OPERATION)

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

    loggedAssert(payment.receiver === Global.currentApplicationAddress, ERR_INVALID_PAYMENT_RECEIVER)
    loggedAssert(payment.amount === Global.assetOptInMinBalance * (1 + count), ERR_INVALID_PAYMENT_AMOUNT)

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