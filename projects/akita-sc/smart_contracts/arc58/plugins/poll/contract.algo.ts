import { abimethod, Account, Application, Bytes, Global, GlobalState, itxn, loggedAssert, op, uint64 } from "@algorandfoundation/algorand-typescript";
import { abiCall, encodeArc4, methodSelector } from "@algorandfoundation/algorand-typescript/arc4";
import { GateMustCheckAbiMethod } from "../../../gates/constants";
import { GateArgs } from "../../../gates/types";
import { PollGlobalStateKeyGateID, votesMBR } from "../../../poll/constants";
import { PollType } from "../../../poll/types";
import { getControlledSpendingAccount, rekeyAddress } from "@akita-protocol/plugin/functions";
import { getAkitaAppList } from "../../../utils/functions";
import { PollPluginGlobalStateKeyFactory } from "./constant";
import { errCreatorNotPollFactory } from "./errors";

// CONTRACT IMPORTS
import type { Poll } from "../../../poll/contract.algo";
import type { PollFactory } from "../../../poll/factory.algo";
import { AkitaBaseContract } from "../../../utils/base-contracts/upgradeable";


export class PollPluginContract extends AkitaBaseContract {

  // GLOBAL STATE ---------------------------------------------------------------------------------

  factory = GlobalState<Application>({ key: PollPluginGlobalStateKeyFactory })

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(version: string, factory: uint64, akitaDAO: uint64): void {
    this.version.value = version
    this.factory.value = Application(factory)
    this.akitaDAO.value = Application(akitaDAO)
  }

  // POLL PLUGIN METHODS -----------------------------------------------------------------------

  new(
    wallet: Application,
    rekeyBack: boolean,
    type: PollType,
    endTime: uint64,
    maxSelected: uint64,
    question: string,
    options: string[],
    gateID: uint64,
  ): uint64 {
    const sender = getControlledSpendingAccount(wallet)

    // Quote from the (upgradeable) factory so this immutable plugin stays exact when the
    // child program or its schema changes.
    const amount = abiCall<typeof PollFactory.prototype.newPollCost>({
      appId: this.factory.value.id,
    }).returnValue

    const mbrPayment = itxn.payment({
      sender,
      receiver: Application(this.factory.value.id).address,
      amount: amount,
    })

    return abiCall<typeof PollFactory.prototype.new>({
      sender,
      appId: this.factory.value.id,
      args: [
        mbrPayment,
        type,
        endTime,
        maxSelected,
        question,
        options,
        gateID
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    }).returnValue
  }

  deleteBoxes(wallet: Application, rekeyBack: boolean, pollAppID: uint64, addresses: Account[]): void {
    const sender = getControlledSpendingAccount(wallet)

    loggedAssert(Application(pollAppID).creator === this.factory.value.address, errCreatorNotPollFactory)

    abiCall<typeof Poll.prototype.deleteBoxes>({
      sender,
      appId: pollAppID,
      args: [addresses],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  vote(wallet: Application, rekeyBack: boolean, pollAppID: uint64, votes: uint64[], args: GateArgs): void {
    // The poll records and gates the vote under the spending account (Txn.sender of the vote
    // call), so the gate must be evaluated for that same address.
    const sender = getControlledSpendingAccount(wallet)

    loggedAssert(Application(pollAppID).creator === this.factory.value.address, errCreatorNotPollFactory)

    const mbrPayment = itxn.payment({
      sender,
      receiver: Application(pollAppID).address,
      amount: votesMBR
    })

    if (args.length > 0) {
      const gate = getAkitaAppList(this.akitaDAO.value).gate
      const gateID = op.AppGlobal.getExUint64(pollAppID, Bytes(PollGlobalStateKeyGateID))[0]

      abiCall<typeof Poll.prototype.gatedVote>({
        sender,
        appId: pollAppID,
        args: [
          mbrPayment,
          itxn.applicationCall({
            sender,
            appId: gate,
            appArgs: [
              methodSelector(GateMustCheckAbiMethod),
              sender,
              gateID,
              encodeArc4(args)
            ]
          }),
          votes
        ],
        rekeyTo: rekeyAddress(rekeyBack, wallet),
      }
      )
    } else {
      abiCall<typeof Poll.prototype.vote>({
        sender,
        appId: pollAppID,
        args: [mbrPayment, votes],
        rekeyTo: rekeyAddress(rekeyBack, wallet),
      })
    }
  }
}