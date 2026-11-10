import algosdk, { encodeUint64 } from 'algosdk'
import type { GovernanceParticipation, ProposalVoteReceipt } from '../generated/AkitaDAOClient'
import {
  DAOLegacyProposalVotesMBR,
  DAOParticipationBoxPrefix,
  DAOParticipationMBR,
  DAOProposalVotesMBR,
  DAOVoteReceiptBoxPrefix,
  DAOLegacyVoteReceiptBoxPrefix,
} from './constants'

/** A vote receipt read from either box format. Legacy ('v') receipts predate `weight` and report 0. */
export type DecodedVoteReceipt = ProposalVoteReceipt & { legacy: boolean }

const ascii = (prefix: string) => new Uint8Array([prefix.charCodeAt(0)])

function concat(...parts: Uint8Array[]): Uint8Array {
  const out = new Uint8Array(parts.reduce((n, p) => n + p.length, 0))
  let offset = 0
  for (const part of parts) {
    out.set(part, offset)
    offset += part.length
  }
  return out
}

const u64 = (bytes: Uint8Array, offset: number) => algosdk.bytesToBigInt(bytes.slice(offset, offset + 8))

/** Box name of a vote receipt: prefix + uint64 proposal id + 32-byte voter. */
export function voteReceiptBoxName(proposalId: bigint, voter: string, legacy = false): Uint8Array {
  const prefix = legacy ? DAOLegacyVoteReceiptBoxPrefix : DAOVoteReceiptBoxPrefix
  return concat(ascii(prefix), encodeUint64(proposalId), algosdk.decodeAddress(voter).publicKey)
}

/** Box name of a voter's participation record: 'r' + 32-byte address. */
export function participationBoxName(voter: string): Uint8Array {
  return concat(ascii(DAOParticipationBoxPrefix), algosdk.decodeAddress(voter).publicKey)
}

/** Decode a 'w' receipt (type u8, power u64, weight u64) or a legacy 'v' receipt (type u8, power u64). */
export function decodeVoteReceipt(value: Uint8Array, legacy: boolean): DecodedVoteReceipt {
  const size = legacy ? 9 : 17
  if (value.length !== size) throw new Error(`vote receipt must be ${size} bytes, got ${value.length}`)
  return { type: value[0], power: u64(value, 1), weight: legacy ? 0n : u64(value, 9), legacy }
}

/** Decode a participation record (lastVotedTs, lastProposalID, votes: three uint64). */
export function decodeGovernanceParticipation(value: Uint8Array): GovernanceParticipation {
  if (value.length !== 24) throw new Error(`participation record must be 24 bytes, got ${value.length}`)
  return { lastVotedTs: u64(value, 0), lastProposalId: u64(value, 8), votes: u64(value, 16) }
}

/**
 * What `voteProposal` costs given the voter's current boxes: `payment` is the exact deposit the DAO
 * requires, `refund` what it pays back in the same call (a replaced legacy receipt's deposit).
 */
export function voteCost({ receipt, legacyReceipt, participation }: {
  receipt: boolean
  legacyReceipt: boolean
  participation: boolean
}): { payment: bigint; refund: bigint } {
  const payment = (receipt ? 0n : DAOProposalVotesMBR) + (participation ? 0n : DAOParticipationMBR)
  const refund = !receipt && legacyReceipt ? DAOLegacyProposalVotesMBR : 0n
  return { payment, refund }
}
