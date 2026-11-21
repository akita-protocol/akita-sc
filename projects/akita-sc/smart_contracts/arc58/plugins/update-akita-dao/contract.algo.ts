import { Account, Application, Box, Bytes, bytes, clone, Global, GlobalState, gtxn, itxnCompose, loggedAssert, OnCompleteAction, op, TransactionType, Txn, uint64 } from "@algorandfoundation/algorand-typescript"
import { abiCall, abimethod, Contract, decodeArc4, methodSelector } from "@algorandfoundation/algorand-typescript/arc4"
import { getSpendingAccount, rekeyAddress, rekeyBackIfNecessary } from "@akita-protocol/plugin/functions"
import { getAkitaAppList } from "../../../utils/functions"
import { GlobalStateKeyAkitaDAO, GlobalStateKeyChildContractVersion, GlobalStateKeyClearProgram, GlobalStateKeyVersion } from "../../../constants"
import { BoxKeyBoxedContract, FactoryContract } from "../../../utils/base-contracts/factory"
import { AkitaDAOGlobalStateKeysWallet, ProposalActionTypeUpgradeApp } from "../../dao/constants"
import { ProposalUpgradeApp } from "../../dao/types"
import { AbstractAccountGlobalStateKeysAdmin } from "../../account/constants"
import { CallerTypeGlobal } from "../../account/types"
import { errContractNotSet, errInvalidCallOrder, errNotAkitaDao, errNotUpgradeExecution } from "./errors"

// CONTRACT IMPORTS
import { type AkitaBaseFeeGeneratorContract, EscrowConfig } from "../../../utils/base-contracts/base"
import { appGlobalSchema, boxedProgramChunk, boxedProgramSize, extraPagesToGrow } from "../../../utils/programs"
import { AbstractedAccountFactory } from "../../account/factory.algo"
import type { AkitaDAOExecutionReaderStub } from "./stubs"
import type { AbstractedAccount } from "../../account/contract.algo"
/** Maximum chunk size for loading boxed contract data (2048 - ABI overhead) */
const FACTORY_LOAD_CHUNK_SIZE: uint64 = 2032
/**
 * Note on an update call that selects the proposal read of `requireUpgradeExecution` (for a DAO
 * without `isUpgradeLease`, i.e. the deployed MainNet DAO). Mirrored by the SDK's `daoBinding` option.
 */
const UpgradeBindingNoteProposal = 'akita:upgrade-binding:proposal'

export class UpdateAkitaDAOPlugin extends Contract {

  /** the current version of the contract */
  version = GlobalState<string>({ key: GlobalStateKeyVersion })
  /** the app ID of the Akita DAO */
  akitaDAO = GlobalState<Application>({ key: GlobalStateKeyAkitaDAO })

  childContractVersion = GlobalState<string>({ key: GlobalStateKeyChildContractVersion })

  clearProgram = GlobalState<bytes>({ key: GlobalStateKeyClearProgram })

  boxedContract = Box<bytes>({ key: BoxKeyBoxedContract })

  private getAkitaDAOWallet(): Application {
    const [walletID] = op.AppGlobal.getExUint64(this.akitaDAO.value, Bytes(AkitaDAOGlobalStateKeysWallet))
    return Application(walletID)
  }

  /**
   * Authenticate a call that changes `target`: the plugin is acting for the DAO wallet, and the
   * execution key (lease) that authorized this group is the one the DAO recorded for `target` when it
   * executed an `UpgradeApp` action naming it. ExecutePlugin keys of other (weaker-class) plugins and
   * UpgradeApp keys approved for a different app are rejected.
   *
   * The lease is read from the wallet's `arc58_rekeyToPlugin` call earlier in the group. The wallet
   * checks and consumes it as an execution key only for a grant with `useExecutionKey`; on any other
   * grant the caller picks the lease freely. So the rekey must go through this plugin's global grant
   * (no escrow), and that grant must use execution keys. Two equivalent ways to read the DAO record:
   *
   * - default: `DAO.isUpgradeLease(target, lease)` (this tree's DAO; box `'u' + itob(target)`, which
   *   the SDK references from the target alone);
   * - `Txn.note == UpgradeBindingNoteProposal`: `DAO.mustGetExecution(lease)` gives the (proposal,
   *   action index) that registered the lease, and `DAO.getProposal` gives that action, which must be
   *   an UpgradeApp naming `target` and this lease. These two methods also exist on the deployed
   *   MainNet DAO, which has no `isUpgradeLease`; the client must reference box `'x' + lease` and the
   *   proposal box `'l' + itob(proposalID)` (SDK `daoBinding`). Both DAOs write `executions(lease)`
   *   for UpgradeApp actions only.
   *
   * The note only selects how the record is read; both reads bind the lease to an UpgradeApp action
   * for `target`, so a caller gains nothing by picking one. On a DAO without `isUpgradeLease` the
   * default read reverts.
   */
  private requireUpgradeExecution(wallet: Application, target: uint64): Account {
    const sender = getSpendingAccount(wallet)
    const daoWallet = this.getAkitaDAOWallet()
    loggedAssert(wallet === daoWallet, errNotAkitaDao)
    loggedAssert(sender === daoWallet.address, errNotAkitaDao)

    let lease = Txn.lease
    let rekeySender = Txn.sender
    let rekeyType: uint64 = 0
    let rekeyEscrow = Bytes()
    let found = false
    for (let i: uint64 = 0; i < Txn.groupIndex; i++) {
      const txn = gtxn.Transaction(i)
      if (
        txn.type === TransactionType.ApplicationCall
        && txn.appId === daoWallet
        && txn.numAppArgs > 1
        && txn.appArgs(0) === methodSelector('arc58_rekeyToPlugin(uint64,uint64,string,uint64[],(uint64,uint64)[])void')
        && op.btoi(txn.appArgs(1)) === Global.currentApplicationId.id
      ) {
        lease = txn.lease
        rekeySender = txn.sender
        rekeyType = op.btoi(txn.appArgs(2))
        rekeyEscrow = txn.appArgs(3)
        found = true
      }
    }
    loggedAssert(found, errNotUpgradeExecution)

    const readProposal = Txn.note === Bytes(UpgradeBindingNoteProposal)

    // The wallet admin is not bound by execution keys (it can rekey the account directly), so its
    // groups need no UpgradeApp lease. Execution groups are also simulated as the admin before approval.
    const [admin] = op.AppGlobal.getExBytes(daoWallet, Bytes(AbstractAccountGlobalStateKeysAdmin))
    if (rekeySender.bytes === admin) {
      // Same number of inner calls as the checked path, so the admin-simulated fee budget is exact.
      // `opUp` is a no-op present on every DAO version.
      abiCall<typeof AkitaDAOExecutionReaderStub.prototype.opUp>({ appId: this.akitaDAO.value })
      abiCall<typeof AkitaDAOExecutionReaderStub.prototype.opUp>({ appId: this.akitaDAO.value })
      if (readProposal) {
        abiCall<typeof AkitaDAOExecutionReaderStub.prototype.opUp>({ appId: this.akitaDAO.value })
      }
      return sender
    }

    loggedAssert(lease !== op.bzero(32).toFixed({ length: 32 }), errNotUpgradeExecution)
    // An ABI-encoded empty string is its 2-byte zero length prefix.
    loggedAssert(rekeyType === CallerTypeGlobal && rekeyEscrow === Bytes.fromHex('0000'), errNotUpgradeExecution)
    const grant = abiCall<typeof AbstractedAccount.prototype.arc58_getPlugins>({
      appId: daoWallet,
      args: [[{ plugin: Global.currentApplicationId.id, caller: Global.zeroAddress, escrow: '' }]],
    }).returnValue[0]
    loggedAssert(grant.useExecutionKey, errNotUpgradeExecution)
    if (readProposal) {
      const execution = abiCall<typeof AkitaDAOExecutionReaderStub.prototype.mustGetExecution>({
        appId: this.akitaDAO.value,
        args: [lease],
      }).returnValue
      const proposal = abiCall<typeof AkitaDAOExecutionReaderStub.prototype.getProposal>({
        appId: this.akitaDAO.value,
        args: [execution.proposalID],
      }).returnValue
      loggedAssert(execution.index < proposal.actions.length, errNotUpgradeExecution)
      const action = clone(proposal.actions[execution.index])
      loggedAssert(action.type === ProposalActionTypeUpgradeApp, errNotUpgradeExecution)
      const upgrade = decodeArc4<ProposalUpgradeApp>(action.data)
      loggedAssert(
        upgrade.app === target && upgrade.executionKey === lease && upgrade.lastValid >= Global.round,
        errNotUpgradeExecution
      )
    } else {
      const authorized = abiCall<typeof AkitaDAOExecutionReaderStub.prototype.isUpgradeLease>({
        appId: this.akitaDAO.value,
        args: [target, lease],
      }).returnValue
      loggedAssert(authorized, errNotUpgradeExecution)
    }

    return sender
  }

  /**
   * Staging calls (clear program, boxed program) only run in a group whose terminal call on this
   * plugin is an authenticated update, so they cannot be used on their own to stage state for a later
   * legitimate upgrade.
   */
  private requireTerminalUpdate(wallet: Application): void {
    const sender = getSpendingAccount(wallet)
    const daoWallet = this.getAkitaDAOWallet()
    loggedAssert(wallet === daoWallet, errNotAkitaDao)
    loggedAssert(sender === daoWallet.address, errNotAkitaDao)

    let found = false
    for (let i: uint64 = Txn.groupIndex + 1; i < Global.groupSize; i++) {
      const txn = gtxn.Transaction(i)
      if (
        txn.type === TransactionType.ApplicationCall
        && txn.appId === Global.currentApplicationId
        && txn.sender === Txn.sender
        && txn.numAppArgs > 0
        && (
          txn.appArgs(0) === methodSelector(this.updateApp)
          || txn.appArgs(0) === methodSelector(this.updateAppWithSchema)
          || txn.appArgs(0) === methodSelector(this.updateFactoryChildContract)
        )
      ) {
        found = true
      }
    }
    loggedAssert(found, errNotUpgradeExecution)
  }

  /** Push the boxed program into `appId`, growing program pages and/or the global schema when needed. */
  private pushUpdate(
    sender: Account,
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    globalNumUint: uint64,
    globalNumBytes: uint64,
  ): void {
    const key = Bytes(BoxKeyBoxedContract)
    const clearProgram = this.clearProgram.value
    // Grow the target's program pages only when the new program no longer fits. The DAO wallet
    // sends the update, so on growth it becomes the app's size sponsor and must hold its MBR.
    const growTo = extraPagesToGrow(appId, boxedProgramSize(key), clearProgram.length)

    const [currentUints, currentBytes] = appGlobalSchema(appId)
    // The schema is never shrunk: each kind grows to the requested size or keeps its current size.
    // An update that sets extraProgramPages also sets the global schema (0 when omitted), so every
    // growing update passes the full schema; otherwise apps with global state fail to update.
    const uints: uint64 = globalNumUint > currentUints ? globalNumUint : currentUints
    const byteSlices: uint64 = globalNumBytes > currentBytes ? globalNumBytes : currentBytes
    const growSchema = uints > currentUints || byteSlices > currentBytes

    if (growSchema || growTo > 0) {
      const [currentPages] = op.AppParams.appExtraProgramPages(appId)
      abiCall<typeof AkitaBaseFeeGeneratorContract.prototype.update>({
        sender,
        appId,
        args: [this.childContractVersion.value],
        onCompletion: OnCompleteAction.UpdateApplication,
        approvalProgram: [
          boxedProgramChunk(key, 0),
          boxedProgramChunk(key, 1),
          boxedProgramChunk(key, 2),
          boxedProgramChunk(key, 3),
        ],
        clearStateProgram: clearProgram,
        extraProgramPages: growTo > 0 ? growTo : currentPages,
        globalNumUint: uints,
        globalNumBytes: byteSlices,
        rekeyTo: rekeyAddress(rekeyBack, wallet)
      })
    } else {
      abiCall<typeof AkitaBaseFeeGeneratorContract.prototype.update>({
        sender,
        appId,
        args: [this.childContractVersion.value],
        onCompletion: OnCompleteAction.UpdateApplication,
        approvalProgram: [
          boxedProgramChunk(key, 0),
          boxedProgramChunk(key, 1),
          boxedProgramChunk(key, 2),
          boxedProgramChunk(key, 3),
        ],
        clearStateProgram: clearProgram,
        rekeyTo: rekeyAddress(rekeyBack, wallet)
      })
    }
  }

  /** The call immediately before must be this plugin's loadBoxedContract from the same sender. */
  private requirePrecedingLoad(): void {
    const txn = gtxn.Transaction(Txn.groupIndex - 1)
    loggedAssert((
      txn.type === TransactionType.ApplicationCall
      && txn.appId === Global.currentApplicationId
      && txn.numAppArgs === 4
      && txn.onCompletion === OnCompleteAction.NoOp
      && txn.appArgs(0) === methodSelector(this.loadBoxedContract)
      && txn.sender === Txn.sender
    ), errInvalidCallOrder)
  }

  @abimethod({ onCreate: 'require' })
  create(version: string, akitaDAO: Application, clearProgram: bytes): void {
    this.version.value = version
    this.akitaDAO.value = akitaDAO
    this.clearProgram.value = clearProgram
  }

  setClearProgram(wallet: Application, rekeyBack: boolean, clearProgram: bytes): void {
    this.requireTerminalUpdate(wallet)

    this.clearProgram.value = clearProgram

    rekeyBackIfNecessary(rekeyBack, wallet)
  }

  initBoxedContract(wallet: Application, version: string, size: uint64): void {
    this.requireTerminalUpdate(wallet)

    this.childContractVersion.value = version

    if (!this.boxedContract.exists) {
      this.boxedContract.create({ size })
    } else {
      this.boxedContract.resize(size)
    }
  }

  loadBoxedContract(wallet: Application, offset: uint64, data: bytes): void {
    const sender = getSpendingAccount(wallet)
    const daoWallet = this.getAkitaDAOWallet()
    loggedAssert(wallet === daoWallet, errNotAkitaDao)
    loggedAssert(sender === daoWallet.address, errNotAkitaDao)

    // max chunk size is 2026 bytes
    // ABI encoding overhead: [selector:4][wallet:8][offset:8][data_length:2] = 22 bytes
    // 2048 - 22 = 2026 bytes max per chunk
    const expectedPreviousCalls: uint64 = offset / 2026
    const txn = gtxn.Transaction(Txn.groupIndex - expectedPreviousCalls - 1)
    loggedAssert((
      txn.type === TransactionType.ApplicationCall
      && txn.appId === Global.currentApplicationId
      && txn.numAppArgs === 4
      && txn.onCompletion === OnCompleteAction.NoOp
      && txn.appArgs(0) === methodSelector(this.initBoxedContract)
      && txn.sender === Txn.sender
    ), errInvalidCallOrder)
    loggedAssert(this.boxedContract.exists, errContractNotSet)
    this.boxedContract.replace(offset, data)
  }

  deleteBoxedContract(wallet: Application, rekeyBack: boolean): void {
    const sender = getSpendingAccount(wallet)
    const daoWallet = this.getAkitaDAOWallet()
    loggedAssert(wallet === daoWallet, errNotAkitaDao)
    loggedAssert(sender === daoWallet.address, errNotAkitaDao)

    this.boxedContract.delete()

    rekeyBackIfNecessary(rekeyBack, wallet)
  }

  updateApp(wallet: Application, rekeyBack: boolean, appId: Application): void {
    const sender = this.requireUpgradeExecution(wallet, appId.id)
    // require the new contract to be uploaded in the same txn group
    this.requirePrecedingLoad()
    this.pushUpdate(sender, wallet, rekeyBack, appId, 0, 0)
  }

  /**
   * Same as `updateApp`, but also grows the target's global state schema to at least
   * `globalNumUint` / `globalNumBytes` (never shrinks). On growth the DAO wallet becomes the target's
   * size sponsor and must hold its full app MBR.
   */
  updateAppWithSchema(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    globalNumUint: uint64,
    globalNumBytes: uint64,
  ): void {
    const sender = this.requireUpgradeExecution(wallet, appId.id)
    this.requirePrecedingLoad()
    this.pushUpdate(sender, wallet, rekeyBack, appId, globalNumUint, globalNumBytes)
  }

  updateAkitaDaoAppIDForApp(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    newAkitaDAOAppID: Application
  ): void {
    const sender = this.requireUpgradeExecution(wallet, appId.id)

    abiCall<typeof AkitaBaseFeeGeneratorContract.prototype.updateAkitaDAO>({
      sender,
      appId,
      args: [newAkitaDAOAppID],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  updateAkitaDaoEscrowForApp(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    newEscrow: EscrowConfig
  ): void {
    const sender = this.requireUpgradeExecution(wallet, appId.id)

    abiCall<typeof AkitaBaseFeeGeneratorContract.prototype.updateAkitaDAOEscrow>({
      sender,
      appId,
      args: [newEscrow],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  updateRevocation(
    wallet: Application,
    rekeyBack: boolean,
    app: Application
  ): void {
    const appId = getAkitaAppList(this.akitaDAO.value).wallet
    const sender = this.requireUpgradeExecution(wallet, appId)

    abiCall<typeof AbstractedAccountFactory.prototype.updateRevocation>({
      sender,
      appId,
      args: [app],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  /**
   * Updates the factory's child contract bytecode using the contract stored in this plugin's box.
   * This allows the factory to deploy new wallets with the updated AbstractedAccount contract.
   * 
   * The contract must first be uploaded to this plugin via initBoxedContract/loadBoxedContract,
   * then this method transfers it to the factory's box storage via inner transactions.
   * 
   * Uses itxnCompose to group all inner transactions together so the factory's loadBoxedContract
   * validation (which checks gtxn for initBoxedContract) works correctly.
   * 
   * @param wallet - The DAO wallet app
   * @param rekeyBack - Whether to rekey the wallet back after the operation
   * @param factoryAppId - The factory app to update (e.g., walletFactory)
   */
  updateFactoryChildContract(
    wallet: Application,
    rekeyBack: boolean,
    factoryAppId: Application
  ): void {
    const sender = this.requireUpgradeExecution(wallet, factoryAppId.id)

    // Require the contract to be uploaded in the same txn group
    // The call before must be a call to loadBoxedContract on this plugin
    this.requirePrecedingLoad()

    loggedAssert(this.boxedContract.exists, errContractNotSet)

    const contractSize: uint64 = this.boxedContract.length
    const version = this.childContractVersion.value

    // Start the inner transaction group with factory.initBoxedContract
    itxnCompose.begin<typeof FactoryContract.prototype.initBoxedContract>({
      sender,
      appId: factoryAppId,
      args: [version, contractSize],
    })

    // Load contract data in chunks to the factory's box
    // Factory expects chunks of 2032 bytes max
    // All loadBoxedContract calls must be in the same group as initBoxedContract
    for (let offset: uint64 = 0; offset < contractSize; offset += FACTORY_LOAD_CHUNK_SIZE) {
      const remaining: uint64 = contractSize - offset
      const chunkSize = remaining < FACTORY_LOAD_CHUNK_SIZE ? remaining : FACTORY_LOAD_CHUNK_SIZE
      const chunk = this.boxedContract.extract(offset, chunkSize)

      const isLastChunk = offset + chunkSize >= contractSize

      itxnCompose.next<typeof FactoryContract.prototype.loadBoxedContract>({
        sender,
        appId: factoryAppId,
        args: [offset, chunk],
        rekeyTo: isLastChunk ? rekeyAddress(rekeyBack, wallet) : Global.zeroAddress,
      })
    }

    // Submit all inner transactions as a single group
    itxnCompose.submit()
  }

}
