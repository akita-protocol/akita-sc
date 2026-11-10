import { Application, bytes, Contract, GlobalState, itxn, loggedAssert, uint64 } from "@algorandfoundation/algorand-typescript";
import { abiCall, abimethod } from "@algorandfoundation/algorand-typescript/arc4";
import { getControlledSpendingAccount, rekeyAddress } from "../../../utils/functions";
import { CID } from "../../../utils/types/base";
import { DAOParticipationMBR, DAOProposalVotesMBR, ProposalStatusDraft } from "../../dao/constants";
import { ProposalAction, ProposalVoteType } from "../../dao/types";
import { AkitaDAOPluginGlobalStateKeysDAOAppID } from "./constants";

// CONTRACT IMPORTS
import type { AkitaDAO } from "../../dao/contract.algo";
import { errProposalNotDraft } from "./errors";


/**
 * Lets an ARC-58 wallet take part in Akita DAO governance. The wallet's spending account is the
 * proposer / voter the DAO sees as `Txn.sender`, so refunds come back to that account.
 */
export class AkitaDAOPlugin extends Contract {

  // GLOBAL STATE ---------------------------------------------------------------------------------

  daoAppID = GlobalState<Application>({ key: AkitaDAOPluginGlobalStateKeysDAOAppID })

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(daoAppID: uint64): void {
    this.daoAppID.value = Application(daoAppID)
  }

  // DAO PLUGIN METHODS ---------------------------------------------------------------------------

  /**
   * Kept for ABI compatibility with existing SDK hooks. `AkitaDAO.setup` is creator-only and
   * pre-initialization (DAO-11), so this only succeeds when the wallet's spending account is the DAO creator.
   */
  setup(wallet: Application, rekeyBack: boolean, nickname: string, salt: bytes<32>): void {
    const sender = getControlledSpendingAccount(wallet)

    abiCall<typeof AkitaDAO.prototype.setup>({
      sender,
      appId: this.daoAppID.value,
      args: [nickname, salt],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  newProposal(wallet: Application, rekeyBack: boolean, cid: CID, actions: ProposalAction[]): uint64 {
    const sender = getControlledSpendingAccount(wallet)

    // The DAO quotes the exact prepayment (0 for the pre-initialization creator). The quote is a
    // plain read: only the final call rekeys back.
    const { total } = abiCall<typeof AkitaDAO.prototype.proposalCost>({
      sender,
      appId: this.daoAppID.value,
      args: [actions],
    }).returnValue

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

  editProposal(wallet: Application, rekeyBack: boolean, id: uint64, cid: CID, actions: ProposalAction[]): void {
    const sender = getControlledSpendingAccount(wallet)

    const { status, feesPaid } = abiCall<typeof AkitaDAO.prototype.getProposal>({
      sender,
      appId: this.daoAppID.value,
      args: [id],
    }).returnValue

    // Only drafts are editable.
    loggedAssert(status === ProposalStatusDraft, errProposalNotDraft)

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

  submitProposal(wallet: Application, rekeyBack: boolean, proposalID: uint64): void {
    const sender = getControlledSpendingAccount(wallet)

    abiCall<typeof AkitaDAO.prototype.submitProposal>({
      sender,
      appId: this.daoAppID.value,
      args: [proposalID],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  voteProposal(wallet: Application, rekeyBack: boolean, proposalID: uint64, vote: ProposalVoteType): void {
    const sender = getControlledSpendingAccount(wallet)

    // Always deposit a receipt (the DAO refunds it on a re-vote), plus the participation record with the
    // account's first vote. A record always counts at least one vote.
    const { votes } = abiCall<typeof AkitaDAO.prototype.getGovernanceParticipation>({
      sender,
      appId: this.daoAppID.value,
      args: [sender],
    }).returnValue

    const mbrPayment = itxn.payment({
      sender,
      receiver: this.daoAppID.value.address,
      amount: votes === 0 ? DAOProposalVotesMBR + DAOParticipationMBR : DAOProposalVotesMBR
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

  finalizeProposal(wallet: Application, rekeyBack: boolean, proposalID: uint64): void {
    const sender = getControlledSpendingAccount(wallet)

    abiCall<typeof AkitaDAO.prototype.finalizeProposal>({
      sender,
      appId: this.daoAppID.value,
      args: [proposalID],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  executeProposal(wallet: Application, rekeyBack: boolean, proposalID: uint64): void {
    const sender = getControlledSpendingAccount(wallet)

    abiCall<typeof AkitaDAO.prototype.executeProposal>({
      sender,
      appId: this.daoAppID.value,
      args: [proposalID],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  /** Delete one of this wallet's proposals; the DAO refunds the released prepayment to the wallet. */
  deleteProposal(wallet: Application, rekeyBack: boolean, proposalID: uint64): void {
    const sender = getControlledSpendingAccount(wallet)

    abiCall<typeof AkitaDAO.prototype.deleteProposal>({
      sender,
      appId: this.daoAppID.value,
      args: [proposalID],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  /** Abandon one of this wallet's approved, unexecuted proposals. */
  cancelProposal(wallet: Application, rekeyBack: boolean, proposalID: uint64): void {
    const sender = getControlledSpendingAccount(wallet)

    abiCall<typeof AkitaDAO.prototype.cancelProposal>({
      sender,
      appId: this.daoAppID.value,
      args: [proposalID],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }
}
