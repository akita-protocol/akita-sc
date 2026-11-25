import {
  Account,
  Application,
  Asset,
  Bytes,
  bytes,
  clone,
  contract,
  Global,
  GlobalState,
  gtxn,
  itxn,
  loggedAssert,
  OnCompleteAction,
  op,
  Txn,
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod, compileArc4, decodeArc4 } from '@algorandfoundation/algorand-typescript/arc4'
import { GlobalStateKeyEscrowFactory, GlobalStateKeyRevocation } from '../../constants'
import { errNotAkitaDao } from '../../errors'
import { errAdminOnly, errControlledAddressNotProven, errFactoryUpdatesNotAllowed, errNotAWallet } from './errors'
import { ARC58WalletIDsByAccountsMbr, NewCostForARC58 } from '../../escrow/constants'
import { BoxCostPerByte, FactoryGlobalStateMaxBytes, FactoryGlobalStateMaxUints, GLOBAL_STATE_KEY_BYTES_COST, GLOBAL_STATE_KEY_UINT_COST } from '../../utils/constants'
import { extraPagesToGrow, programPagesMbr } from '../../utils/programs'
import { errInvalidPayment } from '../../utils/errors'
import { calcPercent, costInstantDisbursement, getWalletFees, rekeyAddress, sendReferralPaymentTo } from '../../utils/functions'
import { AbstractAccountGlobalStateKeysAdmin, AbstractAccountGlobalStateKeysUpdateSettings, AbstractedAccountFactoryGlobalStateKeyDomain, MethodRestrictionByteLength, MinDefaultEscrowMBR, MinEscrowRefsMBR, MinEscrowsMBR, MinPluginMBR } from './constants'
import { FactoryUpdateSettings, PluginInstall } from './types'

// CONTRACT IMPORTS
import { EscrowConfig } from '../../utils/base-contracts/base'
import { FactoryContract } from '../../utils/base-contracts/factory'
import { AbstractedAccount } from './contract.algo'


@contract({
  stateTotals: {
    globalBytes: FactoryGlobalStateMaxBytes,
    globalUints: FactoryGlobalStateMaxUints
  }
})
export class AbstractedAccountFactory extends FactoryContract {

  // GLOBAL STATE ---------------------------------------------------------------------------------

  /** the escrow factory app */
  escrowFactory = GlobalState<Application>({ key: GlobalStateKeyEscrowFactory })
  /** the default app thats allowed to revoke plugins */
  revocation = GlobalState<Application>({ key: GlobalStateKeyRevocation })
  /** domain */
  domain = GlobalState<string>({ key: AbstractedAccountFactoryGlobalStateKeyDomain })

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(
    akitaDAO: Application,
    akitaDAOEscrow: EscrowConfig,
    version: string,
    escrowFactory: Application,
    revocation: Application,
    domain: string
  ): void {
    this.akitaDAO.value = akitaDAO
    this.akitaDAOEscrow.value = clone(akitaDAOEscrow)
    this.version.value = version
    this.escrowFactory.value = escrowFactory
    this.revocation.value = revocation
    this.domain.value = domain
  }

  // ABSTRACTED ACCOUNT FACTORY METHODS -----------------------------------------------------------

  updateRevocation(app: Application): void {
    loggedAssert(Txn.sender === this.getAkitaDAOWallet().address, errNotAkitaDao)
    this.revocation.value = app
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
    plugins: PluginInstall[]
  ): uint64 {

    const abstractedAccount = compileArc4(AbstractedAccount)

    const creationFee = getWalletFees(this.akitaDAO.value).createFee

    // Wave 0: derive program pages from the boxed wallet program (never below the legacy 3 extra)
    const extraPages = this.childExtraPages(abstractedAccount.clearStateProgram.length)

    const childMBR: uint64 = (
      programPagesMbr(extraPages) +
      (GLOBAL_STATE_KEY_UINT_COST * abstractedAccount.globalUints) +
      (GLOBAL_STATE_KEY_BYTES_COST * abstractedAccount.globalBytes) +
      Global.minBalance +
      ARC58WalletIDsByAccountsMbr +
      creationFee
    )

    const assetMBR: uint64 = Global.assetOptInMinBalance * assets.length

    const pluginMBR = this.pluginInstallCost(plugins)

    loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPayment)
    // Q1-A2: the payer no longer funds a referral disbursement MBR (see creationFeeLeftover)
    loggedAssert(payment.amount === childMBR + extraFunding + assetMBR + pluginMBR, errInvalidPayment)

    const leftover = this.creationFeeLeftover(creationFee, referrer)

    // SG-04: an external controlled address must prove, in THIS group, that its owner handed it
    // to this factory: an earlier transaction in the group sent by that account that rekeys it
    // here. A rekey left over from an earlier group (or made by someone else) can no longer be
    // used to wrap a victim's account in a wallet controlled by an arbitrary admin, nor to give
    // a fake wallet an origin it does not control.
    if (controlledAddress !== Global.zeroAddress) {
      let proven = false
      for (let i: uint64 = 0; i < Txn.groupIndex; i += 1) {
        const txn = gtxn.Transaction(i)
        if (txn.sender === controlledAddress && txn.rekeyTo === Global.currentApplicationAddress) {
          proven = true
        }
      }
      loggedAssert(proven, errControlledAddressNotProven)
    }

    // Factory as temp admin for setup, then transfers to the real admin
    const useSetup = bio !== '' || plugins.length > 0 || assets.length > 0
    const initialAdmin = useSetup ? Global.currentApplicationAddress : admin

    const walletID = abstractedAccount.call
      .create({
        args: [
          this.childContractVersion.value,
          this.akitaDAO.value.id,
          controlledAddress,
          initialAdmin,
          this.domain.value,
          this.escrowFactory.value.id,
          this.revocation.value.id,
          nickname,
          referrer,
          salt,
          automaticUpdates
        ],
        // Boxed wallet program in up to four 4 KB chunks (AVM 13: up to 16 KB)
        approvalProgram: [
          this.childApprovalChunk(0),
          this.childApprovalChunk(1),
          this.childApprovalChunk(2),
          this.childApprovalChunk(3),
        ],
        clearStateProgram: abstractedAccount.clearStateProgram,
        extraProgramPages: extraPages
      })
      .itxn
      .createdApp
      .id

    const walletApp = Application(walletID)
    const isExternalControlled = controlledAddress !== Global.zeroAddress

    // Everything the wallet spends after this comes out of its controlled address: the wallet
    // charges that account for each plugin's storage and each new escrow (WAL-03), assets opt in
    // there, and extra funding is for the owner to use (WAL-08). The app account itself needs only
    // its own minimum and the price of its registry record.
    const spendable: uint64 = pluginMBR + extraFunding + assetMBR
    itxn
      .payment({
        receiver: walletApp.address,
        amount: Global.minBalance + ARC58WalletIDsByAccountsMbr + (isExternalControlled ? 0 : spendable)
      })
      .submit()

    if (isExternalControlled && spendable > 0) {
      itxn
        .payment({
          receiver: controlledAddress,
          amount: spendable
        })
        .submit()
    }

    // Set bio
    if (bio !== '') {
      abiCall<typeof AbstractedAccount.prototype.setBio>({
        appId: walletID,
        args: [bio]
      })
    }

    // Opt into assets
    const assetAccount = isExternalControlled ? controlledAddress : walletApp.address

    if (assets.length > 0) {
      // Default: rekey wallet's app address to factory for signing authority.
      // External: caller already rekeyed the account to the factory before this call.
      if (!isExternalControlled) {
        abiCall<typeof AbstractedAccount.prototype.arc58_rekeyTo>({
          appId: walletID,
          args: [Global.currentApplicationAddress, false]
        })
      }

      for (let i: uint64 = 0; i < assets.length; i += 1) {
        itxn
          .assetTransfer({
            sender: assetAccount,
            assetReceiver: assetAccount,
            xferAsset: Asset(assets[i]),
            assetAmount: 0,
            rekeyTo: rekeyAddress(assets.length - 1 === i, walletApp)
          })
          .submit()
      }
    } else if (isExternalControlled) {
      // No assets but still need to transfer control of the external account to the wallet
      itxn
        .payment({
          sender: controlledAddress,
          receiver: controlledAddress,
          amount: 0,
          rekeyTo: walletApp.address
        })
        .submit()
    }

    // Install plugins. WAL-03: only now, because the wallet sends each plugin's storage payment from
    // the controlled address, and an external one answers to the wallet only after the hand-over
    // above (until then it is rekeyed to this factory).
    for (let i: uint64 = 0; i < plugins.length; i += 1) {
      const p = clone(plugins[i])
      abiCall<typeof AbstractedAccount.prototype.arc58_addPlugin>({
        appId: walletID,
        args: [
          p.plugin,
          p.caller,
          p.escrow,
          p.admin,
          p.delegationType,
          p.lastValid,
          p.cooldown,
          p.methods,
          p.useRounds,
          p.useExecutionKey,
          p.coverFees,
          p.canReclaim,
          p.defaultToEscrow
        ]
      })
    }

    // Transfer admin to the real owner
    if (useSetup) {
      abiCall<typeof AbstractedAccount.prototype.arc58_changeAdmin>({
        appId: walletID,
        args: [admin]
      })
    }

    if (leftover > 0) {
      itxn
        .payment({
          receiver: this.akitaDAOEscrow.value.app.address,
          amount: leftover,
        })
        .submit()
    }

    return walletID
  }

  /**
   * What the wallet spends to install `plugins` at creation: each grant's box, the name a grant on
   * a default escrow stores beside it, and, the first time an escrow is named, the escrow itself
   * (its app, its account's minimum and the wallet's two boxes for it). WAL-03: the same amounts
   * the wallet charges in arc58_addPlugin, so the payment for `newAccount` is exact.
   */
  private pluginInstallCost(plugins: PluginInstall[]): uint64 {
    let total: uint64 = 0
    for (let i: uint64 = 0; i < plugins.length; i += 1) {
      const escrow = plugins[i].escrow
      const escrowBytes: uint64 = Bytes(escrow).length

      total += MinPluginMBR + (BoxCostPerByte * (
        (MethodRestrictionByteLength * plugins[i].methods.length) +
        (plugins[i].defaultToEscrow ? 0 : escrowBytes)
      ))
      if (plugins[i].defaultToEscrow) {
        total += MinDefaultEscrowMBR + (BoxCostPerByte * escrowBytes)
      }

      if (escrow !== '') {
        let seen = false
        for (let j: uint64 = 0; j < i; j += 1) {
          if (plugins[j].escrow === escrow) {
            seen = true
          }
        }
        if (!seen) {
          total += (
            NewCostForARC58 +
            Global.minBalance +
            MinEscrowsMBR +
            MinEscrowRefsMBR +
            (BoxCostPerByte * escrowBytes * 2)
          )
        }
      }
    }
    return total
  }

  @abimethod({ readonly: true })
  cost(): uint64 {

    const abstractedAccount = compileArc4(AbstractedAccount)

    // Q1-A2: no referral term. The referrer's cut and its disbursement MBR come out of the
    // creation fee (DAO share), so the price no longer depends on who calls or on any registry.
    return (
      this.childPagesMbr(abstractedAccount.clearStateProgram.length) +
      (GLOBAL_STATE_KEY_UINT_COST * abstractedAccount.globalUints) +
      (GLOBAL_STATE_KEY_BYTES_COST * abstractedAccount.globalBytes) +
      Global.minBalance +
      ARC58WalletIDsByAccountsMbr +
      getWalletFees(this.akitaDAO.value).createFee
    )
  }

  /**
   * Q1-A2 creation referral (principal-resolution spec §6.1). Pays the `referrer` ARGUMENT (any
   * address; self-asserted, it is also stored as the new wallet's `referrer` global) its cut of the
   * creation fee as a Rewards instant disbursement. The cut and the disbursement MBR both come out of
   * the creation fee (DAO share), never from the payer. No registry lookup. The cut is skipped when
   * there is no referrer, no fee, or the fee cannot cover cut + disbursement MBR (no underflow).
   *
   * @returns the part of the creation fee left for the DAO escrow
   */
  private creationFeeLeftover(creationFee: uint64, referrer: Account): uint64 {
    if (creationFee === 0 || referrer === Global.zeroAddress) {
      return creationFee
    }

    // same cut as sendReferralPaymentTo: percentage of the fee, at least 1
    let cut: uint64 = calcPercent(creationFee, getWalletFees(this.akitaDAO.value).referrerPercentage)
    if (cut === 0) {
      cut = 1
    }
    if (creationFee < cut + costInstantDisbursement(this.akitaDAO.value, 0, 1)) {
      return creationFee
    }

    const { leftover, referralMbr } = sendReferralPaymentTo(this.akitaDAO.value, referrer, 0, creationFee, this.akitaDAOEscrow.value.app.address)
    return leftover - referralMbr
  }

  // WALLET UPDATE METHODS -------------------------------------------------------------------------

  /**
   * Permanent: Update a wallet's bytecode. The caller must be the wallet's admin.
   * The factory sends the update inner txn as itself (factory address), which the
   * wallet accepts because Txn.sender === factoryApp.address.
   *
   * @param wallet The wallet application to update
   */
  updateWallet(wallet: Application): void {
    // ACC-08: only push wallet bytecode into apps this factory created (never into an arbitrary
    // app that merely exposes the wallet's state keys and an update method)
    const [creator, exists] = op.AppParams.appCreator(wallet)
    loggedAssert(exists && creator === Global.currentApplicationAddress, errNotAWallet)

    const [updateSettingsBytes] = op.AppGlobal.getExBytes(wallet, Bytes(AbstractAccountGlobalStateKeysUpdateSettings))
    const { allowed, automatic } = decodeArc4<FactoryUpdateSettings>(updateSettingsBytes)
    loggedAssert(allowed, errFactoryUpdatesNotAllowed)

    if (!automatic) {
      const [adminBytes] = op.AppGlobal.getExBytes(wallet, Bytes(AbstractAccountGlobalStateKeysAdmin))
      loggedAssert(Txn.sender === Account(adminBytes), errAdminOnly)
    }

    const abstractedAccount = compileArc4(AbstractedAccount)
    const clearProgram = abstractedAccount.clearStateProgram
    // Wave 0: grow the wallet's program pages only when the new program no longer fits. The
    // factory sends the update, so on growth it becomes the wallet's size sponsor and must hold
    // the wallet's full program/schema MBR (fund the factory before pushing a larger program).
    const growTo = extraPagesToGrow(wallet, this.childApprovalSize(), clearProgram.length)

    if (growTo > 0) {
      // A size change also sets the global schema, and makes this factory the wallet's size
      // sponsor. WAL-02: declare the schema the wallet contract itself declares, never the wallet's
      // current one, which its admin can inflate with a direct update just before this call.
      const numUint: uint64 = abstractedAccount.globalUints
      const numBytes: uint64 = abstractedAccount.globalBytes
      abiCall<typeof AbstractedAccount.prototype.update>({
        appId: wallet,
        args: [this.childContractVersion.value],
        onCompletion: OnCompleteAction.UpdateApplication,
        approvalProgram: [
          this.childApprovalChunk(0),
          this.childApprovalChunk(1),
          this.childApprovalChunk(2),
          this.childApprovalChunk(3),
        ],
        clearStateProgram: clearProgram,
        extraProgramPages: growTo,
        globalNumUint: numUint,
        globalNumBytes: numBytes,
      })
    } else {
      abiCall<typeof AbstractedAccount.prototype.update>({
        appId: wallet,
        args: [this.childContractVersion.value],
        onCompletion: OnCompleteAction.UpdateApplication,
        approvalProgram: [
          this.childApprovalChunk(0),
          this.childApprovalChunk(1),
          this.childApprovalChunk(2),
          this.childApprovalChunk(3),
        ],
        clearStateProgram: clearProgram,
      })
    }
  }

  opUp(): void {
    
  }
}
