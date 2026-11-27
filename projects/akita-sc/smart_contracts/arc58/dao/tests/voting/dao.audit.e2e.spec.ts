import { algo, Config, microAlgo } from '@algorandfoundation/algokit-utils';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { AkitaDaoSDK, EMPTY_CID, ProposalActionEnum } from 'akita-sdk/dao';
import { ABIType, type TransactionSigner } from 'algosdk';
import { beforeAll, describe, expect, test } from 'vitest';
import { deployAkitaDAO, deployAkitaDAOProposalValidator } from '../../../../../tests/fixtures/dao';
import { deployEscrowFactory } from '../../../../../tests/fixtures/escrow';
import { expectContractError } from '../../../../../tests/utils/errors';
import { TimeWarp } from '../../../../../tests/utils/time';
import { AkitaDaoProposalValidatorClient } from '../../../../artifacts/arc58/dao/AkitaDAOProposalValidatorClient';
import { MockGovernanceStakingClient, MockGovernanceStakingFactory } from '../../../../artifacts/mocks/governance-staking/MockGovernanceStakingClient';
import { proposeAndExecute } from '../utils';

Config.configure({ populateAppCallResources: true });

const fixture = algorandFixture();

// Governance assets are only ids to the DAO; the mock staking answers for any id.
const AKTA = 9_001n;
const BONES = 9_002n;
const TOKEN = 1_000_000n;
const DAY = 86_400n;
const APPROVE = 10;
const INVALID = 10;
const REJECTED = 30;
const APPROVED = 40;
const EXECUTED = 50;
/** `ProposalExecutionWindow` in the DAO's constants. */
const EXECUTION_WINDOW = 45n * DAY;
const UPDATE_FIELDS = 80;

type Who = { addr: string; signer: TransactionSigner };

/**
 * Regression tests for the DAO governance audit of the 2.0.0 release: DAO-03 (stake locked after
 * submit), DAO-04 (the validator's size checks) and DAO-09 (approved proposals expire).
 */
describe('DAO governance audit fixes', () => {
  let sender: string;
  let signer: TransactionSigner;
  let dao: AkitaDaoSDK;
  let validator: AkitaDaoProposalValidatorClient;
  let staking: MockGovernanceStakingClient;
  let duration: bigint;
  let participation: bigint;
  let proposerStake: bigint;
  let nextValue = 300;
  let liveLocked = 0n;
  const locks = new Map<string, bigint>();

  const chainNow = async () => {
    const { algod } = fixture.context.algorand.client;
    return BigInt((await algod.block((await algod.status().do()).lastRound).do()).block.header.timestamp);
  };
  /** What Staking does on a lock: add to the account's lock and raise the live locked total. */
  const lock = async (who: string, tokens: bigint) => {
    const now = await chainNow();
    liveLocked += tokens;
    locks.set(who, (locks.get(who) ?? 0n) + tokens);
    for (const asset of [AKTA, BONES]) {
      await staking.send.setLock({ args: { address: who, asset, amount: locks.get(who)! * TOKEN, expiration: now + 400n * DAY } });
      await staking.send.setLiveLocked({ args: { asset, liveLockedStake: liveLocked * TOKEN } });
    }
  };
  const unlock = async (who: string) => {
    liveLocked -= locks.get(who) ?? 0n;
    locks.delete(who);
    for (const asset of [AKTA, BONES]) {
      await staking.send.setLock({ args: { address: who, asset, amount: 0n, expiration: 0n } });
      await staking.send.setLiveLocked({ args: { asset, liveLockedStake: liveLocked * TOKEN } });
    }
  };
  const account = async (): Promise<Who> => {
    const { algorand } = fixture.context;
    const created = await algorand.account.random();
    await algorand.account.ensureFunded(created.addr, await algorand.account.dispenserFromEnvironment(), algo(100));
    return { addr: created.addr.toString(), signer: created.signer };
  };
  const proposeAndSubmit = async (who: Who) => {
    const actions = [{ type: ProposalActionEnum.UpdateFields as const, field: 'min_rewards_impact' as const, value: nextValue++ }];
    const { return: id } = await dao.newProposal({ sender: who.addr, signer: who.signer, cid: EMPTY_CID, actions });
    await dao.submitProposal({ sender: who.addr, signer: who.signer, proposalId: id! });
    return id!;
  };
  const vote = (who: Who, proposalId: bigint) =>
    dao.voteProposal({ sender: who.addr, signer: who.signer, proposalId, vote: APPROVE } as unknown as Parameters<typeof dao.voteProposal>[0]);
  const warp = async (seconds: bigint) => {
    const timeWarp = new TimeWarp(fixture.context.algorand);
    try {
      await timeWarp.timeWarp(seconds);
    } finally {
      await timeWarp.resetTimeWarp();
    }
  };
  const statusOf = async (proposalId: bigint) => (await dao.getProposal(proposalId)).status;

  beforeAll(async () => {
    await fixture.newScope();
    const { algorand, context: { testAccount } } = fixture;
    sender = testAccount.toString();
    signer = testAccount.signer;
    const dispenser = await algorand.account.dispenserFromEnvironment();
    await algorand.account.ensureFunded(sender, dispenser.addr, algo(500));

    const escrowFactory = await deployEscrowFactory({ fixture, sender, signer });
    const deployedValidator = await deployAkitaDAOProposalValidator({ fixture, sender, signer });
    validator = deployedValidator.client;
    dao = await deployAkitaDAO({ fixture, sender, signer, apps: { escrow: escrowFactory.appId, daoProposalValidator: deployedValidator.appId } });
    await algorand.account.ensureFunded(dao.readerAccount, dispenser.addr, algo(1));
    ({ appClient: staking } = await algorand.client
      .getTypedAppFactory(MockGovernanceStakingFactory, { defaultSender: sender, defaultSigner: signer })
      .send.create.bare());
    await algorand.account.ensureFunded(staking.appAddress, dispenser.addr, algo(5));

    await proposeAndExecute(dao, [{ type: ProposalActionEnum.UpdateFields, field: 'aal', value: { staking: staking.appId } }]);
    await proposeAndExecute(dao, [{ type: ProposalActionEnum.UpdateFields, field: 'akita_assets', value: { akta: AKTA, bones: BONES } }]);
    await dao.initialize();

    const rules = await dao.proposalCost({ actions: [{ type: ProposalActionEnum.UpdateFields, field: 'min_rewards_impact', value: 1 }] });
    ({ duration, participation } = rules);
    proposerStake = rules.power / TOKEN + 1n;
  }, 300_000);

  describe('DAO-04: the validator checks the size of every UpdateFields value', () => {
    const updateField = (field: string, value: Uint8Array): [number, Uint8Array] =>
      [UPDATE_FIELDS, ABIType.from('(string,byte[])').encode([field, value])];
    const validate = (actions: [number, Uint8Array][]) => validator.send.validateActions({
      sender, signer, args: { wallet: 0n, actions }, maxFee: microAlgo(20_000n), coverAppCallInnerTransactionFees: true,
    });
    const uints = (count: number, value = 1n) => ABIType.from(`(${Array(count).fill('uint64').join(',')})`).encode(Array(count).fill(value));
    const splits = ABIType.from('((uint64,string),uint8,uint64)[]');
    /** Field name and the number of uint64 members its struct has. */
    const STRUCTS: [string, number][] = [
      ['aal', 12], ['sal', 4], ['pal', 3], ['oal', 7],
      ['wallet_fees', 2], ['guild_fees', 1], ['social_fees', 4], ['staking_fees', 3], ['subscription_fees', 3],
      ['nft_fees', 15], ['swap_fees', 2], ['inference_fees', 2], ['akita_assets', 2],
    ];

    test('a value one byte short or one byte long is refused for every struct field', async () => {
      for (const [field, members] of STRUCTS) {
        const exact = uints(members);
        await expectContractError(validate([updateField(field, exact.slice(0, exact.length - 1))]), 'errIfvl');
        await expectContractError(validate([updateField(field, new Uint8Array([...exact, 0]))]), 'errIfvl');
        await validate([updateField(field, exact)]);
      }
    }, 300_000);

    test('`oal` needs a proposal validator', async () => {
      const members = Array(7).fill(1n);
      members[6] = 0n; // daoProposalValidator is the last member
      await expectContractError(validate([updateField('oal', ABIType.from('(uint64,uint64,uint64,uint64,uint64,uint64,uint64)').encode(members))]), 'errIfvl');
    }, 300_000);

    test('a proposal settings value must be exactly five uint64', async () => {
      const settings = ABIType.from('(uint64,uint64,uint64,uint64,uint64)').encode([1_000_000n, 1n, DAY, 10_000n, 60_000n]);
      await expectContractError(validate([updateField('update_fields_ps', settings.slice(0, 39))]), 'errIfvl');
      await expectContractError(validate([updateField('update_fields_ps', new Uint8Array([...settings, 0]))]), 'errIfvl');
    }, 300_000);

    test('`revenue_splits` is walked entry by entry', async () => {
      const entry = (escrow: string, type: number, value: bigint) => [[77n, escrow], type, value];
      const good = splits.encode([entry('rec_a', 20, 60_000n), entry('rec_bb', 30, 0n)]);
      await validate([updateField('revenue_splits', good)]);

      await expect(validate([updateField('revenue_splits', new Uint8Array([0xff]))])).rejects.toThrow();
      await expectContractError(validate([updateField('revenue_splits', splits.encode([]))]), 'errIfvl');
      await expectContractError(validate([updateField('revenue_splits', new Uint8Array([...good, 0]))]), 'errIfvl');
      await expectContractError(validate([updateField('revenue_splits', splits.encode([entry('rec_a', 40, 1n)]))]), 'errIfvl');
      await expectContractError(
        validate([updateField('revenue_splits', splits.encode(Array.from({ length: 11 }, (_, i) => entry(`r${i}`, 20, 1n))))]),
        'errIfvl',
      );
    }, 300_000);
  });

  describe('DAO-03: stake locked after submit counts in the quorum it has to reach', () => {
    const HOLDERS = 1_000_000n; // locked by holders who never vote
    let holders: Who;

    beforeAll(async () => {
      holders = await account();
      await lock(holders.addr, HOLDERS);
    }, 300_000);

    test('one late locker no longer reaches quorum alone', async () => {
      const late = await account();
      const stake = (HOLDERS * participation) / 100_000n;
      await lock(late.addr, proposerStake); // enough to propose

      const id = await proposeAndSubmit(late);
      const snapshot = (await dao.getProposalTally(id)).locked;
      expect(snapshot).toBe((HOLDERS + proposerStake) * TOKEN);

      // The late lock: after the snapshot, before the vote. It meets the rule against the snapshot,
      // and misses it against everything that is locked when the vote closes.
      await lock(late.addr, stake);
      await vote(late, id);
      const tally = await dao.getProposalTally(id);
      expect(tally.weight * 100_000n / snapshot).toBeGreaterThanOrEqual(participation);
      expect(tally.weight * 100_000n / (liveLocked * TOKEN)).toBeLessThan(participation);

      await warp(duration + 2n);
      await dao.finalizeProposal({ sender: late.addr, signer: late.signer, proposalId: id });
      expect(await statusOf(id)).toBe(REJECTED);

      await unlock(late.addr);
    }, 300_000);

    test('stake that left after submit does not lower the bar', async () => {
      const voter = await account();
      await lock(voter.addr, proposerStake);
      const id = await proposeAndSubmit(voter);
      const snapshot = (await dao.getProposalTally(id)).locked;
      await vote(voter, id);

      // The passive holders' locks end during the vote. The snapshot still decides.
      await unlock(holders.addr);
      expect(liveLocked * TOKEN).toBeLessThan(snapshot);

      await warp(duration + 2n);
      await dao.finalizeProposal({ sender: voter.addr, signer: voter.signer, proposalId: id });
      expect(await statusOf(id)).toBe(REJECTED);

      await unlock(voter.addr);
    }, 300_000);
  });

  describe('DAO-09: an approved proposal expires 45 days after its voting period', () => {
    test('it executes inside the window and is refused after it', async () => {
      // Only the proposer's stake is locked, so its vote alone decides.
      for (const who of [...locks.keys()]) await unlock(who);
      const proposer = await account();
      await lock(proposer.addr, proposerStake);

      const inTime = await proposeAndSubmit(proposer);
      const tooLate = await proposeAndSubmit(proposer);
      await vote(proposer, inTime);
      await vote(proposer, tooLate);

      await warp(duration + 2n);
      for (const proposalId of [inTime, tooLate]) {
        await dao.finalizeProposal({ sender: proposer.addr, signer: proposer.signer, proposalId });
        expect(await statusOf(proposalId)).toBe(APPROVED);
      }

      // One day before the window closes.
      await warp(EXECUTION_WINDOW - DAY);
      await dao.executeProposal({ sender: proposer.addr, signer: proposer.signer, proposalId: inTime });
      expect(await statusOf(inTime)).toBe(EXECUTED);

      // Past it: nobody can execute, and the proposal's state does not change by itself.
      await warp(DAY + 60n);
      await expectContractError(dao.executeProposal({ sender, signer, proposalId: tooLate }), 'errPrex');
      await expectContractError(dao.executeProposal({ sender: proposer.addr, signer: proposer.signer, proposalId: tooLate }), 'errPrex');
      expect(await statusOf(tooLate)).toBe(APPROVED);

      // Its proposer can still put it away.
      await dao.cancelProposal({ sender: proposer.addr, signer: proposer.signer, proposalId: tooLate });
      expect(await statusOf(tooLate)).toBe(INVALID);
    }, 300_000);
  });
});
