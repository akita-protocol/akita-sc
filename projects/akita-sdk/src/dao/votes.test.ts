import algosdk, { encodeUint64 } from 'algosdk';
import { describe, expect, test } from 'vitest';
import { APP_SPEC } from '../generated/AkitaDAOClient';
import { encodeABIValue } from '../utils';
import { decodeGovernanceParticipation, decodeVoteReceipt, participationBoxName, voteCost, voteReceiptBoxName } from './votes';

const voter = algosdk.generateAccount().addr.toString();

describe('DAO vote boxes', () => {
  test('box names are prefix + proposal id + voter, and prefix + voter', () => {
    const key = algosdk.decodeAddress(voter).publicKey;
    expect(voteReceiptBoxName(7n, voter)).toEqual(new Uint8Array([119, ...encodeUint64(7n), ...key]));
    expect(voteReceiptBoxName(7n, voter, true)).toEqual(new Uint8Array([118, ...encodeUint64(7n), ...key]));
    expect(participationBoxName(voter)).toEqual(new Uint8Array([114, ...key]));
  });

  test('decodes the contract encodings of both receipt formats and the participation record', () => {
    const receipt = encodeABIValue({ type: 20, power: 9_972n, weight: 10_000n }, 'ProposalVoteReceipt', APP_SPEC.structs);
    expect(decodeVoteReceipt(receipt, false)).toEqual({ type: 20, power: 9_972n, weight: 10_000n, legacy: false });

    const legacy = encodeABIValue({ type: 30, power: 41n }, 'ProposalVoteInfo', APP_SPEC.structs);
    expect(decodeVoteReceipt(legacy, true)).toEqual({ type: 30, power: 41n, weight: 0n, legacy: true });
    expect(() => decodeVoteReceipt(legacy, false)).toThrow();

    const record = encodeABIValue({ lastVotedTs: 1_760_000_000n, lastProposalId: 12n, votes: 3n }, 'GovernanceParticipation', APP_SPEC.structs);
    expect(decodeGovernanceParticipation(record)).toEqual({ lastVotedTs: 1_760_000_000n, lastProposalId: 12n, votes: 3n });
  });

  test('vote cost: receipt and first-vote record deposits, legacy receipt refund', () => {
    expect(voteCost({ receipt: false, legacyReceipt: false, participation: false })).toEqual({ payment: 51_000n, refund: 0n });
    expect(voteCost({ receipt: false, legacyReceipt: false, participation: true })).toEqual({ payment: 25_700n, refund: 0n });
    expect(voteCost({ receipt: true, legacyReceipt: false, participation: true })).toEqual({ payment: 0n, refund: 0n });
    expect(voteCost({ receipt: false, legacyReceipt: true, participation: false })).toEqual({ payment: 51_000n, refund: 22_500n });
  });
});
