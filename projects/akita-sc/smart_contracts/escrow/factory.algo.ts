import { Account, Application, BoxMap, Bytes, bytes, Contract, Global, gtxn, itxn, loggedAssert, op, Txn, uint64 } from "@algorandfoundation/algorand-typescript";
import { abimethod, compileArc4 } from "@algorandfoundation/algorand-typescript/arc4";
import { btoi, itob } from "@algorandfoundation/algorand-typescript/op";
import { BoxCostPerByte, GLOBAL_STATE_KEY_BYTES_COST } from "../utils/constants";
import { EscrowGlobalStateKeysCreator, MinPages, MinWalletIDsByAccountsMbr } from "./constants";
import {
  ERR_ACCOUNT_NOT_FOUND,
  ERR_ALREADY_REGISTERED,
  ERR_DOESNT_EXIST,
  ERR_FORBIDDEN,
  ERR_INVALID_APP,
  ERR_INVALID_CREATOR,
  ERR_INVALID_PAYMENT,
  ERR_ONLY_APPS,
} from "./errors";

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

    loggedAssert(payment.receiver === Global.currentApplicationAddress, ERR_INVALID_PAYMENT)
    loggedAssert(payment.amount === childAppMBR + Global.minBalance, ERR_INVALID_PAYMENT)

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
    loggedAssert(Global.callerApplicationId !== 0, ERR_ONLY_APPS)
    // this way we ensure apps are always either
    // registering themselves or escrows they can prove they created
    loggedAssert(app === 0 || Application(app).creator === Global.currentApplicationAddress, ERR_INVALID_APP)

    let creator = Bytes('')
    if (Application(app).creator === Global.currentApplicationAddress) {
      creator = op.AppGlobal.getExBytes(app, Bytes(EscrowGlobalStateKeysCreator))[0]
      loggedAssert(btoi(creator) === Global.callerApplicationId, ERR_INVALID_CREATOR)
    } else {
      creator = Bytes(itob(Global.callerApplicationId))
      app = Global.callerApplicationId
    }

    const appAddress = bytes16(Application(app).address)
    loggedAssert(!this.walletIDsByAccounts(appAddress).exists, ERR_ALREADY_REGISTERED)

    loggedAssert(payment.receiver === Global.currentApplicationAddress, ERR_INVALID_PAYMENT)
    loggedAssert(payment.amount === this.mbr(creator.length), ERR_INVALID_PAYMENT)

    this.walletIDsByAccounts(appAddress).value = creator
  }

  delete(id: uint64): void {
    const caller = Global.callerApplicationId
    const key = bytes16(Application(id).address)
    loggedAssert(this.walletIDsByAccounts(key).exists, ERR_DOESNT_EXIST)

    const creator = this.walletIDsByAccounts(key).value
    if (creator.length === 8) {
      loggedAssert(caller === btoi(creator), ERR_FORBIDDEN);
    } else {
      loggedAssert(Bytes(bytes16(Txn.sender)) === creator, ERR_FORBIDDEN);
    }

    const spendingAccount = compileArc4(Escrow);

    const refundAmount: uint64 = (
      MinPages +
      GLOBAL_STATE_KEY_BYTES_COST +
      this.mbr(creator.length)
    )

    spendingAccount.call.delete({ appId: id })

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
    loggedAssert(this.walletIDsByAccounts(bytes16(address)).exists, ERR_ACCOUNT_NOT_FOUND)
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
      loggedAssert(this.walletIDsByAccounts(bytes16(address)).exists, ERR_ACCOUNT_NOT_FOUND)
      apps.push(this.walletIDsByAccounts(bytes16(address)).value)
    }
    return apps
  }
}
