import { Account, contract, Global, loggedAssert, Txn, uint64 } from '@algorandfoundation/algorand-typescript'
import { AkitaDAO } from '../../arc58/dao/contract.algo'
import { AkitaDAONumGlobalBytes, AkitaDAONumGlobalUints, ProposalVoteTypeApprove, ProposalVoteTypeReject } from '../../arc58/dao/constants'
import { errForbidden } from '../../arc58/dao/errors'
import { ProposalVoteType } from '../../arc58/dao/types'

/**
 * TEST-ONLY. The tree AkitaDAO plus creator-only ways to recreate pre-upgrade state: a legacy ('v') vote
 * receipt written the way the deployed DAO did, and a proposal without a tally box.
 */
@contract({ stateTotals: { globalBytes: AkitaDAONumGlobalBytes, globalUints: AkitaDAONumGlobalUints } })
export class MockLegacyVoteDAO extends AkitaDAO {
  seedLegacyVote(proposalID: uint64, voter: Account, type: ProposalVoteType, power: uint64): void {
    loggedAssert(Txn.sender === Global.creatorAddress, errForbidden)
    this.proposalVotes({ proposalID, voter }).value = { type, power }
    if (type === ProposalVoteTypeApprove) {
      this.proposals(proposalID).value.votes.approvals += power
    } else if (type === ProposalVoteTypeReject) {
      this.proposals(proposalID).value.votes.rejections += power
    } else {
      this.proposals(proposalID).value.votes.abstains += power
    }
    if (this.tallies(proposalID).exists) {
      this.tallies(proposalID).value.voteCount += 1
    }
  }

  /** Drop a proposal's tally, as if it had been submitted before tallies existed. */
  forgetTally(proposalID: uint64): void {
    loggedAssert(Txn.sender === Global.creatorAddress, errForbidden)
    this.tallies(proposalID).delete()
  }
}
