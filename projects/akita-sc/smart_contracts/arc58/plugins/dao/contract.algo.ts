import { Application, bytes, Bytes, Contract, GlobalState, itxn, loggedAssert, op, uint64, contract } from "@algorandfoundation/algorand-typescript";
import { abiCall, abimethod, decodeArc4 } from "@algorandfoundation/algorand-typescript/arc4";
import { getSpendingAccount, rekeyAddress } from "../../../utils/functions";
import { CID, uint8 } from "../../../utils/types/base";
import { AkitaDAOGlobalStateKeysInitialized, DAOProposalVotesMBR } from "../../dao/constants";
import { ProposalAction, ProposalVoteType } from "../../dao/types";
import { AkitaDAOPluginGlobalStateKeysDAOAppID } from "./constants";

// CONTRACT IMPORTS
import type { AkitaDAO } from "../../dao/contract.algo";
import { ERR_PROPOSAL_DOES_NOT_EXIST } from "./errors";


@contract({ ui: { glyph: 'BuildingLibrary', color: '#22C7F0', defaultAction: 'proposal_vote' } })
export class AkitaDAOPlugin extends Contract {

  // GLOBAL STATE ---------------------------------------------------------------------------------

  daoAppID = GlobalState<Application>({ key: AkitaDAOPluginGlobalStateKeysDAOAppID })

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(daoAppID: uint64): void {
    this.daoAppID.value = Application(daoAppID)
  }

  // GATE PLUGIN METHODS --------------------------------------------------------------------------

  @abimethod({ ui: { action: 'dao_setup', glyph: 'BuildingLibrary', label: 'Set up DAO' } })
  setup(wallet: Application, rekeyBack: boolean, nickname: string, salt: bytes<32>): void {
    const sender = getSpendingAccount(wallet)

    abiCall<typeof AkitaDAO.prototype.setup>({
      sender,
      appId: this.daoAppID.value,
      args: [nickname, salt],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  @abimethod({ ui: { action: 'proposal_create', glyph: 'DocumentText', label: 'New proposal' } })
  newProposal(wallet: Application, rekeyBack: boolean, cid: CID, actions: ProposalAction[]): uint64 {
    const sender = getSpendingAccount(wallet)

    const initialized = decodeArc4<boolean>(
      op.AppGlobal.getExBytes(
        this.daoAppID.value,
        Bytes(AkitaDAOGlobalStateKeysInitialized)
      )[0]
    )


    let total: uint64 = 0;
    if (initialized) {
      ({ total } = abiCall<typeof AkitaDAO.prototype.proposalCost>({
        sender,
        appId: this.daoAppID.value,
        args: [actions],
        rekeyTo: rekeyAddress(rekeyBack, wallet)
      }).returnValue)
    }

    const actionsPayment = itxn.payment({
      sender,
      receiver: this.daoAppID.value.address,
      amount: total,
    })

    return abiCall<typeof AkitaDAO.prototype.newProposal>({
      sender,
      appId: this.daoAppID.value,
      args: [
        actionsPayment,
        cid,
        actions
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    }).returnValue
  }

  @abimethod({ ui: { action: 'proposal_create', glyph: 'DocumentText', label: 'Edit proposal' } })
  editProposal(wallet: Application, rekeyBack: boolean, id: uint64, cid: CID, actions: ProposalAction[]): void {
    const sender = getSpendingAccount(wallet)

    const { status, feesPaid } = abiCall<typeof AkitaDAO.prototype.getProposal>({
      sender,
      appId: this.daoAppID.value,
      args: [id],
    }).returnValue

    loggedAssert(status !== uint8(0), ERR_PROPOSAL_DOES_NOT_EXIST)

    const { total } = abiCall<typeof AkitaDAO.prototype.proposalCost>({
      sender,
      appId: this.daoAppID.value,
      args: [actions],
    }).returnValue

    if (feesPaid < total) {
      const actionsPayment = itxn.payment({
        sender,
        receiver: this.daoAppID.value.address,
        amount: total - feesPaid,
      })

      abiCall<typeof AkitaDAO.prototype.editProposalWithPayment>({
        sender,
        appId: this.daoAppID.value,
        args: [
          actionsPayment,
          id,
          cid,
          actions
        ],
        rekeyTo: rekeyAddress(rekeyBack, wallet)
      })
    } else {
      abiCall<typeof AkitaDAO.prototype.editProposal>({
        sender,
        appId: this.daoAppID.value,
        args: [
          id,
          cid,
          actions
        ],
        rekeyTo: rekeyAddress(rekeyBack, wallet)
      })
    }
  }

  @abimethod({ ui: { action: 'proposal_create', glyph: 'DocumentText', label: 'Submit proposal' } })
  submitProposal(wallet: Application, rekeyBack: boolean, proposalID: uint64): void {
    const sender = getSpendingAccount(wallet)

    abiCall<typeof AkitaDAO.prototype.submitProposal>({
      sender,
      appId: this.daoAppID.value,
      args: [proposalID],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  @abimethod({ ui: { action: 'proposal_vote', glyph: 'HandRaised', label: 'Vote on proposal' } })
  voteProposal(wallet: Application, rekeyBack: boolean, proposalID: uint64, vote: ProposalVoteType): void {
    const sender = getSpendingAccount(wallet)

    const mbrPayment = itxn.payment({
      sender,
      receiver: this.daoAppID.value.address,
      amount: DAOProposalVotesMBR
    })

    abiCall<typeof AkitaDAO.prototype.voteProposal>({
      sender,
      appId: this.daoAppID.value,
      args: [
        mbrPayment,
        proposalID,
        vote
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  @abimethod({ ui: { action: 'proposal_finalize', glyph: 'CheckCircle', label: 'Finalize proposal' } })
  finalizeProposal(wallet: Application, rekeyBack: boolean, proposalID: uint64): void {
    const sender = getSpendingAccount(wallet)

    abiCall<typeof AkitaDAO.prototype.finalizeProposal>({
      sender,
      appId: this.daoAppID.value,
      args: [proposalID],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  @abimethod({ ui: { action: 'proposal_execute', glyph: 'Bolt', label: 'Execute proposal' } })
  executeProposal(wallet: Application, rekeyBack: boolean, proposalID: uint64): void {
    const sender = getSpendingAccount(wallet)

    abiCall<typeof AkitaDAO.prototype.executeProposal>({
      sender,
      appId: this.daoAppID.value,
      args: [proposalID],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }
}
