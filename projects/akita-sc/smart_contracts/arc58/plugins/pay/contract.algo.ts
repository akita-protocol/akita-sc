import { Application, BigUint, Bytes, bytes, clone, contract, Global, gtxn, itxn, loggedAssert, op, Txn, uint64 } from "@algorandfoundation/algorand-typescript";
import { abimethod, decodeArc4, methodSelector } from "@algorandfoundation/algorand-typescript/arc4";
import type { AbstractedAccount } from "../../account/contract.algo";
import { GrantContext, grantInfo, GrantPolicyHeaderBytes, GrantPolicyPlugin, policyOwner } from "../../../utils/base-contracts/grant-policy";
import { policyRecordKey, readMetaRecord } from "../../../meta/functions";
import { errPolicyMissing, errPolicyStale } from "../../../utils/errors";
import { errInvalidRegistry } from "../../../meta/errors";
import { getControlledSpendingAccount, rekeyAddress } from "@akita-protocol/plugin/functions";
import { getRekeyIndex } from "../../../utils/functions";
import { errPayAsset, errPayPolicyAssets, errPayPolicyEncoding, errPayPolicyRecipients, errPayRecipient } from "./errors";
import { PayParams, PayPolicy } from "./types";
import { AbstractAccountGlobalStateKeysCurrentPlugin } from "../../account/constants";
import { CallerTypeAdmin, PluginKey } from "../../account/types";

const MaxPolicyEntries: uint64 = 8

/**
 * Pays ALGO and ASAs from the wallet's spending account.
 *
 * A grant may have a grant policy in Meta (see GrantPolicyPlugin) that lists the only receivers it
 * may pay and the only assets it may send. A grant with no policy pays as it always has, except a
 * global grant without an execution key (anyone could call it), which needs one. An admin execution
 * (caller = the wallet) is never limited. A policy written for an earlier install of the
 * grant is refused, so a reinstalled grant pays nothing until an admin configures it again or clears
 * the old policy. Install a limited grant and its policy in one group to leave no unlimited gap.
 */
@contract({ avmVersion: 13 })
export class PayPlugin extends GrantPolicyPlugin {

  @abimethod({ onCreate: 'require' })
  public create(registry: Application): void {
    loggedAssert(registry.id > 0, errInvalidRegistry)
    this.registry.value = registry
  }

  /**
   * The policy that limits the running grant. A grant with no policy is not limited (except a global
   * one without an execution key), and an admin execution never is. A policy written for an earlier install of the grant is refused.
   */
  /**
   * True for the wallet's own admin execution: caller the wallet, no escrow, and the window opened as
   * CallerTypeAdmin. The type is read from the window's rekey call, without an inner call; the caller
   * alone is not enough, since a plugin holding a window can open one as the wallet's address with
   * type Other (see GrantPolicyPlugin.isAdminGrant).
   */
  private openedAsAdmin(wallet: Application, key: PluginKey): boolean {
    if (key.caller !== wallet.address || key.escrow !== '') return false
    const index = getRekeyIndex(wallet)
    if (index >= Txn.groupIndex) return false
    const rekey = gtxn.ApplicationCallTxn(index)
    return rekey.appId === wallet &&
      rekey.appArgs(0) === methodSelector<typeof AbstractedAccount.prototype.arc58_rekeyToPlugin>() &&
      op.btoi(rekey.appArgs(1)) === Global.currentApplicationId.id &&
      op.btoi(rekey.appArgs(2)) === CallerTypeAdmin
  }

  private limits(wallet: Application): { limited: boolean; policy: PayPolicy } {
    const none: PayPolicy = { recipients: [], assets: [] }
    // Called through another plugin's window (a proxy that rekeyed the account here), there is no
    // PayPlugin grant to limit: that plugin's own grant governs, as before policies existed.
    const [current, open] = op.AppGlobal.getExBytes(wallet, Bytes(AbstractAccountGlobalStateKeysCurrentPlugin))
    if (!open) return { limited: false, policy: none }
    const key = decodeArc4<PluginKey>(current)
    if (key.plugin !== Global.currentApplicationId.id) return { limited: false, policy: none }
    if (this.openedAsAdmin(wallet, key)) return { limited: false, policy: none }

    // Without a policy no inner call is needed, so an unlimited grant costs what it did before.
    const record = readMetaRecord(this.registry.value, policyOwner(wallet), policyRecordKey(key.plugin, key.caller, key.escrow))
    if (!record.exists) {
      // A grant anyone may call, with no execution key, would let anyone pay anything: it needs a policy.
      loggedAssert(
        key.caller !== Global.zeroAddress || grantInfo(wallet, key.plugin, key.caller, key.escrow).useExecutionKey,
        errPolicyMissing,
      )
      return { limited: false, policy: none }
    }
    const grant: GrantContext = this.grant(wallet)
    loggedAssert(record.data.length >= GrantPolicyHeaderBytes, errPolicyMissing)
    loggedAssert(op.extractUint64(record.data, 0) === grant.start, errPolicyStale)
    return { limited: true, policy: decodeArc4<PayPolicy>(record.data.slice(GrantPolicyHeaderBytes)) }
  }

  pay(wallet: Application, rekeyBack: boolean, payments: PayParams[]): void {
    const { limited, policy } = this.limits(wallet)
    const sender = getControlledSpendingAccount(wallet)

    for (let i: uint64 = 0; i < payments.length; i++) {
      const { receiver, asset, amount } = payments[i];

      if (limited) {
        let receiverAllowed = false
        for (const recipient of clone(policy.recipients)) {
          if (recipient === receiver) receiverAllowed = true
        }
        loggedAssert(receiverAllowed, errPayRecipient)
        let assetAllowed = false
        for (const allowed of clone(policy.assets)) {
          if (allowed === asset) assetAllowed = true
        }
        loggedAssert(assetAllowed, errPayAsset)
      }

      if (asset === 0) {
        itxn
          .payment({
            sender,
            receiver,
            amount,
            rekeyTo: i < (payments.length - 1) ? Global.zeroAddress : rekeyAddress(rekeyBack, wallet),
          })
          .submit()
      } else {
        itxn
          .assetTransfer({
            sender,
            assetReceiver: receiver,
            assetAmount: amount,
            xferAsset: asset,
            rekeyTo: i < (payments.length - 1) ? Global.zeroAddress : rekeyAddress(rekeyBack, wallet),
          })
          .submit()
      }
    }
  }

  /** Policy body format: an ARC-4 `(address[],uint64[])` PayPolicy, canonically encoded. */
  @abimethod({ readonly: true })
  public validatePolicy(body: bytes): void {
    // Canonical layout: two head offsets, then the recipients (length + 32 bytes each), then the assets
    // (length + 8 bytes each), with nothing after them.
    loggedAssert(body.length >= 8, errPayPolicyEncoding)
    const recipientCount = op.extractUint16(body, 4)
    const assetsAt: uint64 = 6 + recipientCount * 32
    loggedAssert(op.extractUint16(body, 0) === 4 && op.extractUint16(body, 2) === assetsAt, errPayPolicyEncoding)
    loggedAssert(body.length >= assetsAt + 2, errPayPolicyEncoding)
    loggedAssert(body.length === assetsAt + 2 + op.extractUint16(body, assetsAt) * 8, errPayPolicyEncoding)
    const policy = decodeArc4<PayPolicy>(body)
    loggedAssert(policy.recipients.length > 0 && policy.recipients.length <= MaxPolicyEntries, errPayPolicyRecipients)
    loggedAssert(policy.assets.length > 0 && policy.assets.length <= MaxPolicyEntries, errPayPolicyAssets)
    let previous = BigUint(0)
    let first = true
    for (const recipient of clone(policy.recipients)) {
      const current = BigUint(recipient.bytes)
      loggedAssert(first || current > previous, errPayPolicyRecipients)
      previous = current
      first = false
    }
    for (let i: uint64 = 1; i < policy.assets.length; i++) {
      loggedAssert(policy.assets[i] > policy.assets[i - 1], errPayPolicyAssets)
    }
  }
}
