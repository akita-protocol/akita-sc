import { algo, Config, microAlgo } from '@algorandfoundation/algokit-utils';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import {
    AkitaDaoSDK,
    DAOLegacyProposalVotesMBR,
    DAOParticipationMBR,
    DAOProposalVotesMBR,
    EMPTY_CID,
    ProposalActionEnum,
    voteReceiptBoxName,
} from 'akita-sdk/dao';
import type { TransactionSigner } from 'algosdk';
import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { deployAkitaDAO, deployAkitaDAOProposalValidator } from '../../../../../tests/fixtures/dao';
import { deployEscrowFactory } from '../../../../../tests/fixtures/escrow';
import { logger } from '../../../../../tests/utils/logger';
import { TimeWarp } from '../../../../../tests/utils/time';
import { AkitaDaoFactory } from '../../../../artifacts/arc58/dao/AkitaDAOClient';
import { GovernanceParticipationGateClient, GovernanceParticipationGateFactory } from '../../../../artifacts/gates/sub-gates/governance-participation/GovernanceParticipationGateClient';
import { MockGovernanceStakingClient, MockGovernanceStakingFactory } from '../../../../artifacts/mocks/governance-staking/MockGovernanceStakingClient';
import { MockLegacyVoteDaoClient, MockLegacyVoteDaoFactory } from '../../../../artifacts/mocks/legacy-vote-dao/MockLegacyVoteDAOClient';
import { proposeAndExecute } from '../utils';

Config.configure({ populateAppCallResources: true });

const fixture = algorandFixture();

const APPROVE = 10;
const REJECT = 20;
const ABSTAIN = 30;
const APPROVED = 40;
const REJECTED = 30;

const DAY = 86_400n;
// Governance assets are only ids to the DAO; the mock staking answers for any id.
const AKTA = 9_001n;
const BONES = 9_002n;
const TOKEN = 1_000_000n;

/** DAO-04 option 4B, in base units: amount x whole days left (capped at a year) / 365. */
const lockPower = (tokens: bigint, daysLeft: bigint) => (tokens * TOKEN * (daysLeft > 365n ? 365n : daysLeft)) / 365n;

/**
 * Time-weighted governance (audit DAO-04 option 4B, DAO-05 cap), against a mock Staking so any lock
 * length can be set. Approve / reject / abstain tallies take power; quorum counts the locked amount
 * (weight) against the amount locked at submit, all in base units. A voter without power cannot vote. Every lock sits half a day past a whole
 * number of days, so the days the DAO counts do not depend on block timing.
 */
describe('DAO time-weighted votes, participation records and the participation gate', () => {
    let sender: string;
    let signer: TransactionSigner;
    let dao: AkitaDaoSDK;
    let legacyDao: MockLegacyVoteDaoClient;
    let staking: MockGovernanceStakingClient;
    let duration: bigint;
    let nextValue = 100;

    const chainNow = async () => {
        const { algod } = fixture.context.algorand.client;
        const { lastRound } = await algod.status().do();
        return BigInt((await algod.block(lastRound).do()).block.header.timestamp);
    };
    const balanceOf = async (address: string) =>
        BigInt((await fixture.context.algorand.account.getInformation(address)).balance.microAlgos);
    const daoAddress = () => dao.client.appAddress.toString();

    /** Lock `akta` / `bones` whole tokens for `days` days and 12 hours. */
    const lock = async (who: string, days: bigint, akta: bigint, bones = akta, bonesDays = days) => {
        const now = await chainNow();
        await staking.send.setLock({ args: { address: who, asset: AKTA, amount: akta * TOKEN, expiration: now + days * DAY + DAY / 2n } });
        await staking.send.setLock({ args: { address: who, asset: BONES, amount: bones * TOKEN, expiration: now + bonesDays * DAY + DAY / 2n } });
    };
    const setLocked = async (tokens: bigint) => {
        for (const asset of [AKTA, BONES]) await staking.send.setLiveLocked({ args: { asset, liveLockedStake: tokens * TOKEN } });
    };
    const voter = async () => {
        const { algorand } = fixture.context;
        const account = await algorand.account.random();
        await algorand.account.ensureFunded(account.addr, await algorand.account.dispenserFromEnvironment(), algo(5));
        return { addr: account.addr.toString(), signer: account.signer };
    };
    const vote = (who: { addr: string; signer: TransactionSigner }, proposalId: bigint, type: number) =>
        dao.voteProposal({ sender: who.addr, signer: who.signer, proposalId, vote: type } as unknown as Parameters<typeof dao.voteProposal>[0]);
    /**
     * Lock `tokens` of both assets to expire exactly `secondsLeft` after the vote's `Global.latestTimestamp`,
     * and vote, in one group: every txn of a group sees the same latest timestamp, the last block's.
     */
    const lockAndVote = async (who: { addr: string; signer: TransactionSigner }, proposalId: bigint, type: number, tokens: bigint, secondsLeft: bigint) => {
        const { algorand } = fixture.context;
        const { payment } = await dao.voteCost({ proposalId, voter: who.addr });
        const now = await chainNow();
        const group = algorand.newGroup();
        for (const asset of [AKTA, BONES]) {
            group.addAppCallMethodCall(await staking.params.setLock({ args: { address: who.addr, asset, amount: tokens * TOKEN, expiration: now + secondsLeft } }));
        }
        const mbrPayment = algorand.createTransaction.payment({ sender: who.addr, signer: who.signer, receiver: daoAddress(), amount: microAlgo(payment) });
        group.addAppCallMethodCall(await dao.client.params.voteProposal({
            sender: who.addr, signer: who.signer, args: { mbrPayment, proposalId, vote: type }, extraFee: microAlgo(3_000n),
        }));
        await group.send();
    };
    /** Everything a vote writes: receipt, tallies, quorum weight and vote count, and the voter's record. */
    const voteState = async (proposalId: bigint, who: string) => ({
        receipt: await dao.getVoteReceipt({ proposalId, voter: who }),
        votes: (await dao.getProposal(proposalId)).votes,
        tally: await dao.getProposalTally(proposalId),
        record: await dao.getGovernanceParticipation(who),
    });
    const submitted = async (lockedTokens: bigint) => {
        await setLocked(lockedTokens);
        const actions = [{ type: ProposalActionEnum.UpdateFields as const, field: 'min_rewards_impact' as const, value: nextValue++ }];
        const cost = await dao.proposalCost({ actions });
        await dao.client.appClient.fundAppAccount({ amount: cost.total.microAlgo() });
        const { return: id } = await dao.newProposal({ cid: EMPTY_CID, actions });
        await dao.submitProposal({ proposalId: id! });
        return id!;
    };
    const finalize = async (...ids: bigint[]) => {
        const timeWarp = new TimeWarp(fixture.context.algorand);
        try {
            await timeWarp.timeWarp(duration + 2n);
            for (const proposalId of ids) await dao.finalizeProposal({ proposalId });
        } finally {
            await timeWarp.resetTimeWarp();
        }
    };
    const receipt = async (proposalId: bigint, who: string) => {
        const found = await dao.getVoteReceipt({ proposalId, voter: who });
        if (!found) throw new Error(`no receipt for ${who} on ${proposalId}`);
        return found;
    };
    const hasBox = async (name: Uint8Array) => {
        try {
            await fixture.context.algorand.app.getBoxValue(dao.appId, name);
            return true;
        } catch {
            return false;
        }
    };

    beforeAll(async () => {
        logger.setMode('silent');
        await fixture.newScope();
        const { algorand, context: { testAccount } } = fixture;
        sender = testAccount.toString();
        signer = testAccount.signer;
        const dispenser = await algorand.account.dispenserFromEnvironment();
        await algorand.account.ensureFunded(sender, dispenser.addr, algo(2_000));

        const escrowFactory = await deployEscrowFactory({ fixture, sender, signer });
        const validator = await deployAkitaDAOProposalValidator({ fixture, sender, signer });
        dao = await deployAkitaDAO({
            fixture, sender, signer,
            apps: { escrow: escrowFactory.appId, daoProposalValidator: validator.appId },
            daoFactory: MockLegacyVoteDaoFactory as unknown as typeof AkitaDaoFactory,
        });
        await algorand.account.ensureFunded(dao.readerAccount, dispenser.addr, algo(1));
        legacyDao = algorand.client.getTypedAppClientById(MockLegacyVoteDaoClient, { appId: dao.appId, defaultSender: sender, defaultSigner: signer });

        const { appClient } = await algorand.client
            .getTypedAppFactory(MockGovernanceStakingFactory, { defaultSender: sender, defaultSigner: signer })
            .send.create.bare();
        staking = appClient;
        await algorand.account.ensureFunded(staking.appAddress, dispenser.addr, algo(5));

        await proposeAndExecute(dao, [{ type: ProposalActionEnum.UpdateFields, field: 'aal', value: { staking: staking.appId } }]);
        await proposeAndExecute(dao, [{ type: ProposalActionEnum.UpdateFields, field: 'akita_assets', value: { akta: AKTA, bones: BONES } }]);
        await dao.initialize();

        // The proposer clears every proposal-power threshold with a capped lock.
        await lock(sender, 400n, 1_000n);
        duration = (await dao.proposalCost({ actions: [{ type: ProposalActionEnum.UpdateFields, field: 'min_rewards_impact', value: 1 }] })).duration;
    });

    afterAll(() => logger.setMode('full'));

    test('power is tokens x days left / 365 (capped at a year), min per field; abstains count power too', async () => {
        const id = await submitted(100_000n);
        const long = await voter();
        const half = await voter();
        const mixed = await voter();
        await lock(long.addr, 730n, 10_000n);
        await lock(half.addr, 183n, 10_000n);
        // AKTA: many tokens, short lock; BONES: fewer tokens, capped lock. Power and weight take separate minimums.
        await lock(mixed.addr, 100n, 10_000n, 5_000n, 400n);

        await vote(long, id, APPROVE);
        await vote(half, id, REJECT);
        await vote(mixed, id, ABSTAIN);

        expect(await receipt(id, long.addr)).toMatchObject({ type: APPROVE, power: 10_000n * TOKEN, weight: 10_000n * TOKEN, legacy: false });
        expect(await receipt(id, half.addr)).toMatchObject({ type: REJECT, power: lockPower(10_000n, 183n), weight: 10_000n * TOKEN });
        expect(lockPower(10_000n, 183n)).toBe(5_013_698_630n);
        expect(await receipt(id, mixed.addr)).toMatchObject({ type: ABSTAIN, power: lockPower(10_000n, 100n), weight: 5_000n * TOKEN });

        const { votes } = await dao.getProposal(id);
        expect(votes).toEqual({ approvals: 10_000_000_000n, rejections: 5_013_698_630n, abstains: 2_739_726_027n });
        const tally = await dao.getProposalTally(id);
        expect(tally.weight).toBe(25_000n * TOKEN);
        expect(tally.locked).toBe(100_000n * TOKEN);
        expect(tally.voteCount).toBe(3n);
    });

    test('a voter without power cannot vote: no receipt, tally, quorum weight or participation record', async () => {
        const id = await submitted(100_000n);
        const before = await voteState(id, sender);
        const rejected = async (who: { addr: string; signer: TransactionSigner }) => {
            await expect(vote(who, id, APPROVE)).rejects.toThrow(/errNpow/);
            expect(await dao.getVoteReceipt({ proposalId: id, voter: who.addr })).toBeUndefined();
            expect(await dao.getGovernanceParticipation(who.addr)).toEqual({ lastVotedTs: 0n, lastProposalId: 0n, votes: 0n });
        };

        // Outlasts the vote (duration is 4 days), but under a week remains.
        const late = await voter();
        await lock(late.addr, duration / DAY + 1n, 8_000n);
        await rejected(late);
        // Ends before the vote does.
        const short = await voter();
        await lock(short.addr, duration / DAY - 1n, 8_000n);
        await rejected(short);
        // No lock at all.
        await rejected(await voter());

        const after = await voteState(id, sender);
        expect(after.votes).toEqual(before.votes);
        expect(after.tally).toEqual(before.tally);
        expect(after.tally.weight).toBe(0n);
        expect(after.tally.voteCount).toBe(0n);
    });

    test('power is in base units: one token with 300 days left votes with nonzero power', async () => {
        const id = await submitted(100_000n);
        const small = await voter();
        await lock(small.addr, 300n, 1n);
        await vote(small, id, APPROVE);

        expect(await receipt(id, small.addr)).toMatchObject({ type: APPROVE, power: 821_917n, weight: TOKEN });
        expect((await dao.getProposal(id)).votes).toEqual({ approvals: 821_917n, rejections: 0n, abstains: 0n });
        expect((await dao.getProposalTally(id)).weight).toBe(TOKEN);
    });

    test('final-week boundary: exactly 7 days left votes, 7 days less 1 s cannot, 7 days + 1 s votes', async () => {
        const WEEK = 7n * DAY;
        const id = await submitted(100_000n);
        const under = await voter();
        await expect(lockAndVote(under, id, APPROVE, 3_650n, WEEK - 1n)).rejects.toThrow(/errNpow/);
        expect(await dao.getVoteReceipt({ proposalId: id, voter: under.addr })).toBeUndefined();

        const exact = await voter();
        await lockAndVote(exact, id, APPROVE, 3_650n, WEEK);
        expect(await receipt(id, exact.addr)).toMatchObject({ type: APPROVE, power: lockPower(3_650n, 7n), weight: 3_650n * TOKEN });
        expect(lockPower(3_650n, 7n)).toBe(70_000_000n);

        const over = await voter();
        await lockAndVote(over, id, REJECT, 3_650n, WEEK + 1n);
        expect(await receipt(id, over.addr)).toMatchObject({ type: REJECT, power: 70_000_000n, weight: 3_650n * TOKEN });

        expect((await dao.getProposal(id)).votes).toEqual({ approvals: 70_000_000n, rejections: 70_000_000n, abstains: 0n });
        const tally = await dao.getProposalTally(id);
        expect(tally.weight).toBe(7_300n * TOKEN);
        expect(tally.voteCount).toBe(2n);
    });

    test('quorum counts only voters with power: a zero-power voter cannot lift a proposal over the bar', async () => {
        // 70% participation of 10,000 locked tokens is 7,000. Each proposer below has power.
        const met = await submitted(10_000n);
        const full = await voter();
        await lock(full.addr, 30n, 7_000n);
        await vote(full, met, APPROVE);

        const missed = await submitted(10_000n);
        const almost = await voter();
        const fading = await voter();
        await lock(almost.addr, 30n, 6_999n);
        // 3,000 locked tokens with under a week left: they would carry the vote past 7,000 if they counted.
        await lock(fading.addr, duration / DAY + 1n, 3_000n);
        await vote(almost, missed, APPROVE);
        await expect(vote(fading, missed, APPROVE)).rejects.toThrow(/errNpow/);
        expect((await dao.getProposalTally(missed)).weight).toBe(6_999n * TOKEN);
        expect((await dao.getProposalTally(met)).weight).toBe(7_000n * TOKEN);

        await finalize(met, missed);
        expect((await dao.getProposal(met)).status).toBe(APPROVED);
        expect((await dao.getProposal(missed)).status).toBe(REJECTED);
    });

    test('a re-vote after power fell to 0 is rejected and the cast vote stands', async () => {
        const id = await submitted(100_000n);
        const who = await voter();
        await lockAndVote(who, id, APPROVE, 10_000n, 200n * DAY + DAY / 2n);
        const cast = await voteState(id, who.addr);
        expect(cast.receipt).toMatchObject({ type: APPROVE, power: lockPower(10_000n, 200n), weight: 10_000n * TOKEN });

        // The lock is cut to its final week, then the voter tries to switch to reject.
        await expect(lockAndVote(who, id, REJECT, 10_000n, 7n * DAY - 1n)).rejects.toThrow(/errNpow/);
        await lock(who.addr, duration / DAY + 1n, 10_000n);
        await expect(vote(who, id, REJECT)).rejects.toThrow(/errNpow/);
        expect(await voteState(id, who.addr)).toEqual(cast);

        // Extending the lock restores power, and with it the right to change the vote.
        await lock(who.addr, 200n, 10_000n);
        await vote(who, id, REJECT);
        expect((await dao.getProposal(id)).votes).toEqual({ approvals: 0n, rejections: lockPower(10_000n, 200n), abstains: 0n });
        expect((await dao.getGovernanceParticipation(who.addr)).votes).toBe(cast.record.votes);
    });

    test('DAO-04 freeze: aged locks with full turnout reach quorum on locked tokens', async () => {
        const a = await voter();
        const b = await voter();
        await lock(a.addr, 30n, 10_000n);
        await lock(b.addr, 30n, 10_000n);
        // Every locked token votes. Power is only 30/365 of it, far below the 70% participation bar.
        const id = await submitted(20_000n);
        await vote(a, id, APPROVE);
        await vote(b, id, APPROVE);

        const { votes } = await dao.getProposal(id);
        expect(votes.approvals).toBe(2n * lockPower(10_000n, 30n));
        expect(votes.approvals * 100_000n).toBeLessThan((await dao.proposalCost({ actions: [{ type: ProposalActionEnum.UpdateFields, field: 'min_rewards_impact', value: 1 }] })).participation * 20_000n * TOKEN);
        expect((await dao.getProposalTally(id)).weight).toBe(20_000n * TOKEN);

        await finalize(id);
        expect((await dao.getProposal(id)).status).toBe(APPROVED);
    });

    test('one-sided and unbalanced locks count toward the quorum denominator but never toward turnout', async () => {
        // Totals: AKTA 10,000 (a 6,000 + x 4,000), BONES 10,000 (a 3,000 + y 7,000) -> denominator 10,000.
        const a = await voter();
        const x = await voter();
        const y = await voter();
        await lock(a.addr, 30n, 6_000n, 3_000n);
        await lock(x.addr, 30n, 4_000n, 0n);
        await lock(y.addr, 30n, 0n, 7_000n);
        const id = await submitted(10_000n);
        await vote(a, id, APPROVE);
        // x and y lock only one asset each, so they have no power and cannot vote
        await expect(vote(x, id, APPROVE)).rejects.toThrow(/errNpow/);
        await expect(vote(y, id, APPROVE)).rejects.toThrow(/errNpow/);

        // every account that can vote did, yet turnout is min(6,000, 3,000) = 3,000 of a 10,000 denominator
        const tally = await dao.getProposalTally(id);
        expect(tally.weight).toBe(3_000n * TOKEN);
        expect(tally.locked).toBe(10_000n * TOKEN);
        await finalize(id);
        expect((await dao.getProposal(id)).status).toBe(REJECTED);
    });

    test('a re-vote moves power between columns and replaces (not adds) weight', async () => {
        const id = await submitted(100_000n);
        const who = await voter();
        await lock(who.addr, 200n, 10_000n);
        await vote(who, id, APPROVE);
        const first = await receipt(id, who.addr);
        expect((await dao.getProposal(id)).votes.approvals).toBe(first.power);

        // The voter adds tokens, then changes their vote.
        await lock(who.addr, 200n, 20_000n);
        await vote(who, id, REJECT);
        const second = await receipt(id, who.addr);
        expect(second).toMatchObject({ type: REJECT, power: lockPower(20_000n, 200n), weight: 20_000n * TOKEN });
        expect((await dao.getProposal(id)).votes).toEqual({ approvals: 0n, rejections: second.power, abstains: 0n });
        const tally = await dao.getProposalTally(id);
        expect(tally.weight).toBe(20_000n * TOKEN);
        expect(tally.voteCount).toBe(1n);

        await vote(who, id, ABSTAIN);
        expect((await dao.getProposal(id)).votes).toEqual({ approvals: 0n, rejections: 0n, abstains: second.power });
    });

    test('the participation record counts each proposal once, takes its deposit once and survives receipt deletion', async () => {
        const who = await voter();
        await lock(who.addr, 200n, 1_000n);
        const p1 = await submitted(100_000n);
        const p2 = await submitted(100_000n);
        expect(await dao.getGovernanceParticipation(who.addr)).toEqual({ lastVotedTs: 0n, lastProposalId: 0n, votes: 0n });

        // First vote ever: receipt + record. Overpaying is refunded.
        expect(await dao.voteCost({ proposalId: p1, voter: who.addr })).toEqual({ payment: DAOProposalVotesMBR + DAOParticipationMBR, refund: 0n });
        let daoBefore = await balanceOf(daoAddress());
        const mbrPayment = fixture.context.algorand.createTransaction.payment({
            sender: who.addr, signer: who.signer, receiver: daoAddress(), amount: microAlgo(100_000n),
        });
        await dao.client.send.voteProposal({
            sender: who.addr, signer: who.signer,
            args: { mbrPayment, proposalId: p1, vote: APPROVE },
            coverAppCallInnerTransactionFees: true, maxFee: microAlgo(10_000n),
        });
        expect(await balanceOf(daoAddress()) - daoBefore).toBe(DAOProposalVotesMBR + DAOParticipationMBR);
        const afterFirst = await dao.getGovernanceParticipation(who.addr);
        expect(afterFirst.votes).toBe(1n);
        expect(afterFirst.lastProposalId).toBe(p1);
        expect(afterFirst.lastVotedTs).toBeGreaterThan(0n);

        // A re-vote neither counts nor pays.
        daoBefore = await balanceOf(daoAddress());
        await vote(who, p1, REJECT);
        expect(await balanceOf(daoAddress())).toBe(daoBefore);
        expect((await dao.getGovernanceParticipation(who.addr)).votes).toBe(1n);

        // Another proposal counts, paying only for its receipt.
        daoBefore = await balanceOf(daoAddress());
        await vote(who, p2, APPROVE);
        expect(await balanceOf(daoAddress()) - daoBefore).toBe(DAOProposalVotesMBR);
        const afterSecond = await dao.getGovernanceParticipation(who.addr);
        expect(afterSecond).toMatchObject({ votes: 2n, lastProposalId: p2 });
        expect(afterSecond.lastVotedTs).toBeGreaterThanOrEqual(afterFirst.lastVotedTs);

        await finalize(p1, p2);
        const voterBefore = await balanceOf(who.addr);
        await dao.deleteProposalVotes({ proposalId: p1, voters: [who.addr] });
        await dao.deleteProposalVotes({ proposalId: p2, voters: [who.addr] });
        expect(await balanceOf(who.addr) - voterBefore).toBe(2n * DAOProposalVotesMBR);
        expect(await dao.getVoteReceipt({ proposalId: p1, voter: who.addr })).toBeUndefined();
        expect(await dao.getGovernanceParticipation(who.addr)).toEqual(afterSecond);
    });

    test('legacy (v) receipts: a re-vote replaces one and refunds its 22,500 deposit; deletion refunds 22,500', async () => {
        const id = await submitted(100_000n);
        const y = await voter();
        const z = await voter();
        await lock(y.addr, 200n, 1_000n);
        await legacyDao.send.seedLegacyVote({ args: { proposalId: id, voter: y.addr, type: APPROVE, power: 777n } });
        await legacyDao.send.seedLegacyVote({ args: { proposalId: id, voter: z.addr, type: REJECT, power: 555n } });
        expect(await receipt(id, z.addr)).toEqual({ type: REJECT, power: 555n, weight: 0n, legacy: true });

        expect(await dao.voteCost({ proposalId: id, voter: y.addr })).toEqual({
            payment: DAOProposalVotesMBR + DAOParticipationMBR, refund: DAOLegacyProposalVotesMBR,
        });
        const daoBefore = await balanceOf(daoAddress());
        await vote(y, id, REJECT);
        expect(await balanceOf(daoAddress()) - daoBefore).toBe(DAOProposalVotesMBR + DAOParticipationMBR - DAOLegacyProposalVotesMBR);
        expect(await hasBox(voteReceiptBoxName(id, y.addr, true))).toBe(false);
        const replaced = await receipt(id, y.addr);
        expect(replaced).toMatchObject({ type: REJECT, weight: 1_000n * TOKEN, legacy: false });
        expect((await dao.getProposal(id)).votes).toEqual({ approvals: 0n, rejections: 555n + replaced.power, abstains: 0n });
        expect((await dao.getGovernanceParticipation(y.addr)).votes).toBe(1n);
        expect((await dao.getProposalTally(id)).voteCount).toBe(2n);

        await finalize(id);
        const zBefore = await balanceOf(z.addr);
        const yBefore = await balanceOf(y.addr);
        await dao.deleteProposalVotes({ proposalId: id, voters: [z.addr, y.addr] });
        expect(await balanceOf(z.addr) - zBefore).toBe(DAOLegacyProposalVotesMBR);
        expect(await balanceOf(y.addr) - yBefore).toBe(DAOProposalVotesMBR);
        expect((await dao.getProposalTally(id)).voteCount).toBe(0n);
    });

    test('a proposal without a tally (voted before the upgrade) compares its power with live locked stake', async () => {
        const id = await submitted(10_000n);
        await legacyDao.send.forgetTally({ args: { proposalId: id } });
        // 7,000 of 10,000 live locked tokens is exactly the 70% bar; the snapshot path would see weight 0.
        await legacyDao.send.seedLegacyVote({ args: { proposalId: id, voter: sender, type: APPROVE, power: 7_000n * TOKEN } });
        await finalize(id);
        expect((await dao.getProposal(id)).status).toBe(APPROVED);

        const missed = await submitted(10_000n);
        await legacyDao.send.forgetTally({ args: { proposalId: missed } });
        await legacyDao.send.seedLegacyVote({ args: { proposalId: missed, voter: sender, type: APPROVE, power: 6_999n * TOKEN } });
        await finalize(missed);
        expect((await dao.getProposal(missed)).status).toBe(REJECTED);
    });

    describe('GovernanceParticipationGate', () => {
        let gate: GovernanceParticipationGateClient;
        let twice: { addr: string; signer: TransactionSigner };
        let once: { addr: string; signer: TransactionSigner };
        let never: string;

        const register = async (withinSeconds: bigint, minVotes: bigint) => {
            const mbrPayment = fixture.context.algorand.createTransaction.payment({
                sender, signer, receiver: gate.appAddress.toString(), amount: microAlgo(12_100n),
            });
            const args = new Uint8Array([...u64(withinSeconds), ...u64(minVotes)]);
            return (await gate.send.register({ args: { mbrPayment, args } })).return!;
        };
        const check = async (caller: string, registryId: bigint) =>
            (await gate.send.check({ args: { caller, registryId, args: new Uint8Array() }, extraFee: microAlgo(2_000n) })).return!;
        const checkFor = async (principal: string, spender: string, registryId: bigint) =>
            (await gate.send.checkFor({
                args: { ctx: { principal, wallet: 0n, spender }, registryId, args: new Uint8Array() },
                extraFee: microAlgo(4_000n),
            })).return!;

        beforeAll(async () => {
            const { appClient } = await fixture.context.algorand.client
                .getTypedAppFactory(GovernanceParticipationGateFactory, { defaultSender: sender, defaultSigner: signer })
                .send.create.create({ args: { version: '0.0.1', akitaDao: dao.appId } });
            gate = appClient;
            await fixture.context.algorand.account.ensureFunded(gate.appAddress, await fixture.context.algorand.account.dispenserFromEnvironment(), algo(1));

            twice = await voter();
            once = await voter();
            never = (await voter()).addr;
            await lock(twice.addr, 200n, 1_000n);
            await lock(once.addr, 200n, 1_000n);
            const p1 = await submitted(100_000n);
            const p2 = await submitted(100_000n);
            await vote(twice, p1, APPROVE);
            await vote(twice, p2, REJECT);
            await vote(once, p1, APPROVE);
            // Re-votes do not add to the count.
            await vote(once, p1, ABSTAIN);
        });

        test('check passes on enough distinct votes within the window', async () => {
            const anyTime = await register(0n, 2n);
            expect(await check(twice.addr, anyTime)).toBe(true);
            expect(await check(once.addr, anyTime)).toBe(false);
            expect(await check(never, anyTime)).toBe(false);

            const recent = await register(3_600n, 1n);
            expect(await check(once.addr, recent)).toBe(true);
            const timeWarp = new TimeWarp(fixture.context.algorand);
            await timeWarp.timeWarp(3_700n);
            expect(await check(once.addr, recent)).toBe(false);
            expect(await check(once.addr, await register(0n, 1n))).toBe(true);
        });

        test('checkFor passes when the principal or the spender qualifies', async () => {
            const id = await register(0n, 2n);
            expect(await checkFor(twice.addr, never, id)).toBe(true);
            expect(await checkFor(never, twice.addr, id)).toBe(true);
            expect(await checkFor(never, once.addr, id)).toBe(false);
            expect(await checkFor(never, never, id)).toBe(false);
        });

        test('registration needs a 16-byte {withinSeconds, minVotes} with minVotes > 0', async () => {
            await expect(register(0n, 0n)).rejects.toThrow(/errIrga/);
            const mbrPayment = fixture.context.algorand.createTransaction.payment({
                sender, signer, receiver: gate.appAddress.toString(), amount: microAlgo(12_100n),
            });
            await expect(gate.send.register({ args: { mbrPayment, args: new Uint8Array(8) } })).rejects.toThrow(/errIarg/);
        });
    });
});

function u64(value: bigint): Uint8Array {
    const out = new Uint8Array(8);
    new DataView(out.buffer).setBigUint64(0, value);
    return out;
}
