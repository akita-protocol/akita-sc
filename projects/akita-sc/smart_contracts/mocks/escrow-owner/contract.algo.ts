import { Application, Global, itxn, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall, Contract } from '@algorandfoundation/algorand-typescript/arc4'

// CONTRACT IMPORTS
import type { EscrowFactory } from '../../escrow/factory.algo'

/**
 * TEST-ONLY (ACC-07). An app that creates, registers and deletes escrows through the
 * EscrowFactory, so the deletion refund can be measured. Never deploy outside tests.
 */
export class MockEscrowOwner extends Contract {
  newEscrow(factory: Application, cost: uint64): uint64 {
    return abiCall<typeof EscrowFactory.prototype.new>({
      appId: factory,
      args: [itxn.payment({ receiver: factory.address, amount: cost })],
    }).returnValue
  }

  registerEscrow(factory: Application, escrow: uint64, mbr: uint64): void {
    abiCall<typeof EscrowFactory.prototype.register>({
      appId: factory,
      args: [itxn.payment({ receiver: factory.address, amount: mbr }), escrow],
    })
  }

  /** Delete `escrow` through the factory and return the ALGO this app received as refund. */
  deleteEscrow(factory: Application, escrow: uint64): uint64 {
    // The factory rekeys every new escrow to its creator, so the escrow app can only close its
    // own account after the creator hands signing authority back (rekey to itself = no auth addr).
    const escrowAddress = Application(escrow).address
    itxn.payment({ sender: escrowAddress, receiver: escrowAddress, amount: 0, rekeyTo: escrowAddress }).submit()

    const before: uint64 = Global.currentApplicationAddress.balance
    abiCall<typeof EscrowFactory.prototype.delete>({
      appId: factory,
      args: [escrow],
    })
    return Global.currentApplicationAddress.balance - before
  }
}
