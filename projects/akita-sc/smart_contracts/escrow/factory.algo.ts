import { Account, Application, BoxMap, Bytes, bytes, Contract, Global, gtxn, itxn, loggedAssert, op, Txn, uint64 } from "@algorandfoundation/algorand-typescript";
import { abimethod, compileArc4 } from "@algorandfoundation/algorand-typescript/arc4";
import { btoi, itob } from "@algorandfoundation/algorand-typescript/op";
import { BoxCostPerByte, GLOBAL_STATE_KEY_BYTES_COST } from "../utils/constants";
import { EscrowGlobalStateKeysCreator, MinPages, MinWalletIDsByAccountsMbr } from "./constants";
import {
  errAccountNotFound,
  errAlreadyRegistered,
  errDoesntExist,
  errForbidden,
  errInvalidApp,
  errInvalidCreator,
  errInvalidPayment,
  errOnlyApps,
} from "./errors";

import { assertBoundPayment } from "../utils/functions";

// CONTRACT IMPORTS
import { Escrow } from "./contract.algo";


function bytes16(acc: Account): bytes<16> {
  return acc.bytes.slice(0, 16).toFixed({ length: 16 })
}

export class EscrowFactory extends Contract {

  // 8 or 16 bytes
  walletIDsByAccounts = BoxMap<bytes<16>, bytes>({ keyPrefix: '' })

  private mbr(length: uint64): uint64 {
    return MinWalletIDsByAccountsMbr + (length * BoxCostPerByte)
  }

  private getCreator(): bytes {
    const nonAppCaller = Global.callerApplicationId === 0
    return nonAppCaller
      ? Bytes(bytes16(Txn.sender))
      : Bytes(itob(Global.callerApplicationId))
  }

  new(payment: gtxn.PaymentTxn): uint64 {
    const nonAppCaller = Global.callerApplicationId === 0
    const creator = this.getCreator()

    const escrow = compileArc4(Escrow);

    const childAppMBR: uint64 = (
      MinPages +
      GLOBAL_STATE_KEY_BYTES_COST
    )

    // ACC-07: bind the funding payment to the caller (no third-party funding, close or rekey)
    assertBoundPayment(payment, Txn.sender, Global.currentApplicationAddress, childAppMBR + Global.minBalance)

    const newEscrow = escrow.call.create(
      {
        args: [creator],
      }
    ).itxn.createdApp

    itxn
      .payment({
        receiver: newEscrow.address,
        amount: Global.minBalance
      })
      .submit()

    escrow.call.rekey({
      appId: newEscrow.id,
      args: [
        nonAppCaller ? Txn.sender : Global.callerApplicationAddress
      ]
    })

    return newEscrow.id
  }

  register(payment: gtxn.PaymentTxn, app: uint64): void {
    // only apps can call this method
    loggedAssert(Global.callerApplicationId !== 0, errOnlyApps)
    // this way we ensure apps are always either
    // registering themselves or escrows they can prove they created
    loggedAssert(app === 0 || Application(app).creator === Global.currentApplicationAddress, errInvalidApp)

    let creator = Bytes('')
    if (Application(app).creator === Global.currentApplicationAddress) {
      creator = op.AppGlobal.getExBytes(app, Bytes(EscrowGlobalStateKeysCreator))[0]
      loggedAssert(btoi(creator) === Global.callerApplicationId, errInvalidCreator)
    } else {
      creator = Bytes(itob(Global.callerApplicationId))
      app = Global.callerApplicationId
    }

    const appAddress = bytes16(Application(app).address)
    loggedAssert(!this.walletIDsByAccounts(appAddress).exists, errAlreadyRegistered)

    loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPayment)
    loggedAssert(payment.amount === this.mbr(creator.length), errInvalidPayment)

    this.walletIDsByAccounts(appAddress).value = creator
  }

  delete(id: uint64): void {
    const caller = Global.callerApplicationId
    const key = bytes16(Application(id).address)
    loggedAssert(this.walletIDsByAccounts(key).exists, errDoesntExist)

    const creator = this.walletIDsByAccounts(key).value
    if (creator.length === 8) {
      loggedAssert(caller === btoi(creator), errForbidden);
    } else {
      loggedAssert(Bytes(bytes16(Txn.sender)) === creator, errForbidden);
    }

    const spendingAccount = compileArc4(Escrow);

    // ACC-07: the child closes its WHOLE balance (base min balance + anything it still held)
    // back to this factory. Refund that amount plus the creator MBR released by deleting the
    // app and its registry box, instead of stranding the closed balance in the factory.
    const balanceBefore: uint64 = Global.currentApplicationAddress.balance

    spendingAccount.call.delete({ appId: id })

    const balanceAfter: uint64 = Global.currentApplicationAddress.balance
    const closed: uint64 = balanceAfter > balanceBefore ? balanceAfter - balanceBefore : 0

    const refundAmount: uint64 = (
      MinPages +
      GLOBAL_STATE_KEY_BYTES_COST +
      this.mbr(creator.length) +
      closed
    )

    this.walletIDsByAccounts(key).delete()

    itxn
      .payment({
        receiver: creator.length === 8 ? Global.callerApplicationAddress : Txn.sender,
        amount: refundAmount
      })
      .submit()
  }

  @abimethod({ readonly: true })
  cost(): uint64 {
    return (
      MinPages +
      GLOBAL_STATE_KEY_BYTES_COST +
      Global.minBalance
    )
  }

  @abimethod({ readonly: true })
  registerCost(): uint64 {
    return this.mbr(8)
  }

  @abimethod({ readonly: true })
  exists(address: Account): boolean {
    return this.walletIDsByAccounts(bytes16(address)).exists
  }

  @abimethod({ readonly: true })
  get(address: Account): bytes {
    if (!this.walletIDsByAccounts(bytes16(address)).exists) {
      return Bytes('')
    }
    return this.walletIDsByAccounts(bytes16(address)).value
  }

  @abimethod({ readonly: true })
  mustGet(address: Account): bytes {
    loggedAssert(this.walletIDsByAccounts(bytes16(address)).exists, errAccountNotFound)
    return this.walletIDsByAccounts(bytes16(address)).value
  }

  @abimethod({ readonly: true })
  getList(addresses: Account[]): bytes[] {
    const apps: bytes[] = []
    for (let i: uint64 = 0; i < addresses.length; i++) {
      const address = addresses[i]
      if (this.walletIDsByAccounts(bytes16(address)).exists) {
        apps.push(this.walletIDsByAccounts(bytes16(address)).value)
      } else {
        apps.push(Bytes(''))
      }
    }
    return apps
  }

  @abimethod({ readonly: true })
  mustGetList(addresses: Account[]): bytes[] {
    const apps: bytes[] = []
    for (let i: uint64 = 0; i < addresses.length; i++) {
      const address = addresses[i]
      loggedAssert(this.walletIDsByAccounts(bytes16(address)).exists, errAccountNotFound)
      apps.push(this.walletIDsByAccounts(bytes16(address)).value)
    }
    return apps
  }
}
