import { Account, bytes, Contract, Global, GlobalState, itxn, loggedAssert, Txn } from "@algorandfoundation/algorand-typescript";
import { abimethod } from "@algorandfoundation/algorand-typescript/arc4";
import { EscrowGlobalStateKeysCreator } from "./constants";
import { errOnlyCreatorCanRekey, errOnlyFactoryCanDelete } from "./errors";

export class Escrow extends Contract {

  creator = GlobalState<bytes>({ key: EscrowGlobalStateKeysCreator })

  @abimethod({ onCreate: 'require' })
  create(creator: bytes): void {
    this.creator.value = creator
  }

  rekey(rekeyTo: Account): void {
    loggedAssert(Txn.sender === Global.creatorAddress, errOnlyCreatorCanRekey)

    itxn
      .payment({
        amount: 0,
        receiver: Global.currentApplicationAddress,
        rekeyTo
      })
      .submit()
  }

  @abimethod({ allowActions: 'DeleteApplication' })
  delete(): void {
    loggedAssert(Txn.sender === Global.creatorAddress, errOnlyFactoryCanDelete)

    itxn
      .payment({ closeRemainderTo: Global.creatorAddress })
      .submit()
  }
}
