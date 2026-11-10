import { algo, microAlgo } from '@algorandfoundation/algokit-utils';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { AkitaDaoSDK, EMPTY_CID, ProposalActionEnum, DAOParticipationMBR, DAOProposalVotesMBR } from 'akita-sdk/dao';
import { CallerType, DAOPluginSDK, newWallet, WalletFactorySDK } from 'akita-sdk/wallet';
import type { TransactionSigner } from 'algosdk';
import { ABIType, encodeUint64 } from 'algosdk';
import { AkitaDaoPluginFactory } from '../../../../artifacts/arc58/plugins/dao/AkitaDAOPluginClient';
import { deployAbstractedAccountFactory } from '../../../../../tests/fixtures/abstracted-account';
import { deployAkitaDAO, deployAkitaDAOProposalValidator } from '../../../../../tests/fixtures/dao';
import { deployEscrowFactory } from '../../../../../tests/fixtures/escrow';
import { deployStaking } from '../../../../../tests/fixtures/staking';
import { logger } from '../../../../../tests/utils/logger';
import { TimeWarp } from '../../../../../tests/utils/time';
import { AbstractedAccountMbrFactory } from '../../../../artifacts/arc58/account/AbstractedAccountMBRClient';
import { EscrowFactoryClient } from '../../../../artifacts/escrow/EscrowFactoryClient';
import { StakingClient } from '../../../../artifacts/staking/StakingClient';
import { proposeAndExecute } from '../utils';

const fixture = algorandFixture();

// Vote types match the contract constants
const VOTE_APPROVE = 10;
const VOTE_REJECT = 20;
const VOTE_ABSTAIN = 30;

// Staking type LOCK = 40 (required for voting power)
const STAKING_TYPE_LOCK = 40;

// One year in seconds (max lock time)
const ONE_YEAR = 31_536_000;
const ONE_DAY = 86_400n;
const ONE_WEEK = 604_800n;
const ONE_YEAR_IN_DAYS = 365n;

// MBR costs from staking constants
const STAKES_MBR = 32_100n;
const TOTALS_MBR = 15_700n;
const ASSET_OPT_IN_MBR = 100_000n;

const toBigInt = (value: bigint | number) => BigInt(value);

/**
 * Governance power (DAO-04 option 4B), in base units: amount x min(whole days left, 365) / 365, counted
 * only when the lock outlasts the vote (`votingEnds`) and 0 with under a week left. `now` is the
 * DAO's `Global.latestTimestamp` for the vote (the last block before it).
 */
const calcPower = (amount: bigint | number, expiration: bigint | number, votingEnds: bigint | number, now: bigint) => {
    if (toBigInt(expiration) <= toBigInt(votingEnds)) {
        return 0n;
    }
    const remaining = toBigInt(expiration) - now;
    if (remaining < ONE_WEEK) {
        return 0n;
    }
    const days = remaining / ONE_DAY > ONE_YEAR_IN_DAYS ? ONE_YEAR_IN_DAYS : remaining / ONE_DAY;
    return (toBigInt(amount) * days) / ONE_YEAR_IN_DAYS;
};


/**
 * Tests for DAO voting functionality after initialization.
 *
 * The DAO voting lifecycle:
 * 1. Create proposal (Draft status) - requires staking power when initialized
 * 2. Submit proposal (Voting status) - starts the voting period
 * 3. Vote on proposal - users cast approve/reject/abstain votes
 * 4. Finalize proposal - after duration, checks thresholds → Approved/Rejected
 * 5. Execute proposal - if Approved, executes the actions
 *
 * Requirements for voting:
 * - DAO must be initialized
 * - Users must have Akta + Bones ASA staked with LOCK type
 * - Lock expiration must be > 1 week in the future
 * - Voting power = min(Akta power, Bones power)
 */
describe('ARC58 DAO Voting', () => {
    // Core contracts
    let sender: string;
    let signer: TransactionSigner;
    let escrowFactory: EscrowFactoryClient;
    let dao: AkitaDaoSDK;
    let walletFactory: WalletFactorySDK;
    let staking: StakingClient;

    // Governance tokens (Akta + Bones)
    let aktaAssetId: bigint;
    let bonesAssetId: bigint;

    // Additional voter accounts
    let voter1: string;
    let voter1Signer: TransactionSigner;
    let voter2: string;
    let voter2Signer: TransactionSigner;
    let previousWalletMbrAppId: string | undefined;

    beforeAll(async () => {
        logger.setMode('silent');

        await fixture.newScope();
        const {
            algorand,
            context: { testAccount },
        } = fixture;
        sender = testAccount.toString();
        signer = testAccount.signer;

        const dispenser = await algorand.account.dispenserFromEnvironment();
        await algorand.account.ensureFunded(sender, dispenser.addr, algo(500));

        // Keep this suite independent from whichever test happens to run first.
        previousWalletMbrAppId = process.env.WALLET_MBR_APP_ID;
        const walletMbrFactory = algorand.client.getTypedAppFactory(AbstractedAccountMbrFactory, {
            defaultSender: sender,
            defaultSigner: signer,
        });
        const { appClient: walletMbrClient } = await walletMbrFactory.send.create.bare();
        process.env.WALLET_MBR_APP_ID = walletMbrClient.appId.toString();

        // Create additional voter accounts
        const voter1Account = await algorand.account.random();
        voter1 = voter1Account.addr.toString();
        voter1Signer = voter1Account.signer;
        await algorand.account.ensureFunded(voter1, dispenser.addr, algo(100));

        const voter2Account = await algorand.account.random();
        voter2 = voter2Account.addr.toString();
        voter2Signer = voter2Account.signer;
        await algorand.account.ensureFunded(voter2, dispenser.addr, algo(100));

        // Deploy escrow factory
        escrowFactory = await deployEscrowFactory({ fixture, sender, signer });

        // Deploy the proposal validator BEFORE the DAO — its appId is baked
        // into the DAO's `otherAppList` at `create()` time and every
        // `newProposal` call delegates to it via `abiCall`.
        const proposalValidator = await deployAkitaDAOProposalValidator({ fixture, sender, signer });

        // Deploy DAO
        dao = await deployAkitaDAO({
            fixture,
            sender,
            signer,
            apps: {
                escrow: escrowFactory.appId,
                daoProposalValidator: proposalValidator.appId,
            },
        });

        // Fund DAO reader account
        await algorand.account.ensureFunded(dao.readerAccount, dispenser.addr, algo(1));

        // Deploy staking contract
        staking = await deployStaking({
            fixture,
            sender,
            signer,
            args: { akitaDao: dao.appId },
        });

        // Create Akta governance token
        const aktaResult = await algorand.send.assetCreate({
            sender,
            signer,
            total: 1_000_000_000_000_000n,
            decimals: 6,
            assetName: 'Akta',
            unitName: 'AKTA',
            defaultFrozen: false,
        });
        aktaAssetId = aktaResult.assetId;

        // Create Bones governance token
        const bonesResult = await algorand.send.assetCreate({
            sender,
            signer,
            total: 1_000_000_000_000_000n,
            decimals: 6,
            assetName: 'Bones',
            unitName: 'BONES',
            defaultFrozen: false,
        });
        bonesAssetId = bonesResult.assetId;

        // Fund staking contract to cover inner transaction fees
        await algorand.account.ensureFunded(staking.appAddress, dispenser.addr, algo(1));

        // Opt staking contract into Akta and initialize totals box
        const optInAktaPayment = await algorand.createTransaction.payment({
            sender,
            signer,
            receiver: staking.appAddress.toString(),
            amount: microAlgo(TOTALS_MBR + ASSET_OPT_IN_MBR),
        });

        await staking.send.optIn({
            sender,
            signer,
            args: {
                payment: optInAktaPayment,
                asset: aktaAssetId,
            },
            extraFee: microAlgo(1000), // Extra fee to cover inner transaction via fee pooling
        });

        // Opt staking contract into Bones and initialize totals box
        const optInBonesPayment = await algorand.createTransaction.payment({
            sender,
            signer,
            receiver: staking.appAddress.toString(),
            amount: microAlgo(TOTALS_MBR + ASSET_OPT_IN_MBR),
        });

        await staking.send.optIn({
            sender,
            signer,
            args: {
                payment: optInBonesPayment,
                asset: bonesAssetId,
            },
            extraFee: microAlgo(1000), // Extra fee to cover inner transaction via fee pooling
        });

        // Deploy wallet factory
        walletFactory = await deployAbstractedAccountFactory({
            fixture,
            sender,
            signer,
            args: {
                akitaDao: dao.appId,
                version: '0.0.1',
                escrowFactory: escrowFactory.appId,
            },
        });

        // Configure DAO with wallet factory and staking
        await proposeAndExecute(dao, [
            {
                type: ProposalActionEnum.UpdateFields,
                field: 'aal',
                value: {
                    wallet: walletFactory.appId,
                    staking: staking.appId,
                },
            },
        ]);

        // Configure DAO with Akta + Bones assets
        await proposeAndExecute(dao, [
            {
                type: ProposalActionEnum.UpdateFields,
                field: 'akita_assets',
                value: {
                    akta: aktaAssetId,
                    bones: bonesAssetId,
                },
            },
        ]);

        // Fund DAO and setup wallet
        const setupCost = await dao.setupCost();
        await dao.client.appClient.fundAppAccount({ amount: setupCost.microAlgo() });
        await dao.setup();

        // Voters opt into Akta + Bones
        await algorand.send.assetOptIn({
            sender: voter1,
            signer: voter1Signer,
            assetId: aktaAssetId,
        });

        await algorand.send.assetOptIn({
            sender: voter1,
            signer: voter1Signer,
            assetId: bonesAssetId,
        });

        await algorand.send.assetOptIn({
            sender: voter2,
            signer: voter2Signer,
            assetId: aktaAssetId,
        });

        await algorand.send.assetOptIn({
            sender: voter2,
            signer: voter2Signer,
            assetId: bonesAssetId,
        });

        // Distribute Akta + Bones to voters
        await algorand.send.assetTransfer({
            sender,
            signer,
            assetId: aktaAssetId,
            receiver: voter1,
            amount: 100_000_000_000n, // 100,000 AKTA
        });

        await algorand.send.assetTransfer({
            sender,
            signer,
            assetId: bonesAssetId,
            receiver: voter1,
            amount: 100_000_000_000n, // 100,000 BONES
        });

        await algorand.send.assetTransfer({
            sender,
            signer,
            assetId: aktaAssetId,
            receiver: voter2,
            amount: 100_000_000_000n, // 100,000 AKTA
        });

        await algorand.send.assetTransfer({
            sender,
            signer,
            assetId: bonesAssetId,
            receiver: voter2,
            amount: 100_000_000_000n, // 100,000 BONES
        });
    });

    afterAll(() => {
        if (previousWalletMbrAppId === undefined) delete process.env.WALLET_MBR_APP_ID;
        else process.env.WALLET_MBR_APP_ID = previousWalletMbrAppId;
        logger.setMode('full');
    });

    describe('Pre-Initialization (Creator Only)', () => {
        test('should allow creator to create and execute proposals without voting', async () => {
            // Before initialization, only creator can create proposals
            // and they are immediately approved (no voting required)
            const proposalId = await proposeAndExecute(dao, [
                {
                    type: ProposalActionEnum.UpdateFields,
                    field: 'min_rewards_impact',
                    value: 100,
                },
            ]);

            expect(proposalId).toBeGreaterThan(0n);

            const proposal = await dao.getProposal(proposalId);
            expect(proposal.status).toBe(50); // Executed
        });
    });

    describe('DAO Initialization', () => {
        test('should initialize the DAO', async () => {
            // Initialize the DAO - after this, proposals require voting
            await dao.initialize();

            const { state } = await dao.getGlobalState();
            expect(state).toBe(2);
        });
    });

    describe('Post-Initialization Voting', () => {
        test('should setup voting power for voters by staking Akta + Bones', async () => {
            const { algorand } = fixture.context;

            // Stake Akta + Bones with LOCK type for voter1 (1 year lock)
            const stakeAmount = 50_000_000_000n; // 50,000 tokens
            // Use blockchain timestamp instead of Date.now() since localnet timestamp differs from wall-clock time
            const status = await algorand.client.algod.status().do();
            const block = await algorand.client.algod.block(status.lastRound).do();
            const blockTimestamp = BigInt(block.block.header.timestamp);
            const expiration = blockTimestamp + BigInt(ONE_YEAR);

            // Create MBR payment for Akta stake box
            const aktaStakePayment = await algorand.createTransaction.payment({
                sender: voter1,
                signer: voter1Signer,
                receiver: staking.appAddress.toString(),
                amount: microAlgo(STAKES_MBR),
            });

            // Create asset transfer for the Akta stake
            const aktaAssetXfer = await algorand.createTransaction.assetTransfer({
                sender: voter1,
                signer: voter1Signer,
                assetId: aktaAssetId,
                receiver: staking.appAddress.toString(),
                amount: stakeAmount,
            });

            await staking.send.stakeAsa({
                sender: voter1,
                signer: voter1Signer,
                args: {
                    payment: aktaStakePayment,
                    assetXfer: aktaAssetXfer,
                    type: STAKING_TYPE_LOCK,
                    amount: stakeAmount,
                    expiration,
                },
            });

            // Create MBR payment for Bones stake box
            const bonesStakePayment = await algorand.createTransaction.payment({
                sender: voter1,
                signer: voter1Signer,
                receiver: staking.appAddress.toString(),
                amount: microAlgo(STAKES_MBR),
            });

            // Create asset transfer for the Bones stake
            const bonesAssetXfer = await algorand.createTransaction.assetTransfer({
                sender: voter1,
                signer: voter1Signer,
                assetId: bonesAssetId,
                receiver: staking.appAddress.toString(),
                amount: stakeAmount,
            });

            await staking.send.stakeAsa({
                sender: voter1,
                signer: voter1Signer,
                args: {
                    payment: bonesStakePayment,
                    assetXfer: bonesAssetXfer,
                    type: STAKING_TYPE_LOCK,
                    amount: stakeAmount,
                    expiration,
                },
            });

            // Verify stake was created
            const aktaStakeInfo = await staking.getInfo({
                args: {
                    address: voter1,
                    stake: { asset: aktaAssetId, type: STAKING_TYPE_LOCK },
                },
            });

            const bonesStakeInfo = await staking.getInfo({
                args: {
                    address: voter1,
                    stake: { asset: bonesAssetId, type: STAKING_TYPE_LOCK },
                },
            });

            expect(aktaStakeInfo?.amount).toBe(stakeAmount);
            expect(bonesStakeInfo?.amount).toBe(stakeAmount);
        });

        test('should create a proposal as initialized DAO member', async () => {
            // Now that DAO is initialized, creating proposals requires staking power
            const { algorand } = fixture.context;

            // Stake for the sender to have voting power
            const stakeAmount = 10_000_000_000n; // 10,000 tokens
            // Use blockchain timestamp instead of Date.now() since localnet timestamp differs from wall-clock time
            const status = await algorand.client.algod.status().do();
            const block = await algorand.client.algod.block(status.lastRound).do();
            const blockTimestamp = BigInt(block.block.header.timestamp);
            const expiration = blockTimestamp + BigInt(ONE_YEAR);

            // Sender needs to opt into Akta + Bones first
            try {
                await algorand.send.assetOptIn({
                    sender,
                    signer,
                    assetId: aktaAssetId,
                });
            } catch {
                // Already opted in
            }

            try {
                await algorand.send.assetOptIn({
                    sender,
                    signer,
                    assetId: bonesAssetId,
                });
            } catch {
                // Already opted in
            }

            // Transfer some Akta + Bones to sender
            // Note: sender is the creator, they already have tokens from creation

            const aktaStakePayment = await algorand.createTransaction.payment({
                sender,
                signer,
                receiver: staking.appAddress.toString(),
                amount: microAlgo(STAKES_MBR),
            });

            const aktaAssetXfer = await algorand.createTransaction.assetTransfer({
                sender,
                signer,
                assetId: aktaAssetId,
                receiver: staking.appAddress.toString(),
                amount: stakeAmount,
            });

            await staking.send.stakeAsa({
                sender,
                signer,
                args: {
                    payment: aktaStakePayment,
                    assetXfer: aktaAssetXfer,
                    type: STAKING_TYPE_LOCK,
                    amount: stakeAmount,
                    expiration,
                },
            });

            const bonesStakePayment = await algorand.createTransaction.payment({
                sender,
                signer,
                receiver: staking.appAddress.toString(),
                amount: microAlgo(STAKES_MBR),
            });

            const bonesAssetXfer = await algorand.createTransaction.assetTransfer({
                sender,
                signer,
                assetId: bonesAssetId,
                receiver: staking.appAddress.toString(),
                amount: stakeAmount,
            });

            await staking.send.stakeAsa({
                sender,
                signer,
                args: {
                    payment: bonesStakePayment,
                    assetXfer: bonesAssetXfer,
                    type: STAKING_TYPE_LOCK,
                    amount: stakeAmount,
                    expiration,
                },
            });

            // Now create a proposal
            const costInfo = await dao.proposalCost({
                actions: [
                    {
                        type: ProposalActionEnum.UpdateFields,
                        field: 'min_rewards_impact',
                        value: 200,
                    },
                ],
            });

            await dao.client.appClient.fundAppAccount({ amount: costInfo.total.microAlgo() });

            const { return: proposalId } = await dao.newProposal({
                cid: EMPTY_CID,
                actions: [
                    {
                        type: ProposalActionEnum.UpdateFields,
                        field: 'min_rewards_impact',
                        value: 200,
                    },
                ],
            });

            expect(proposalId).toBeGreaterThan(0n);

            // Proposal should be in Draft status
            const proposal = await dao.getProposal(proposalId!);
            expect(proposal.status).toBe(0); // Draft
        });

        test('should submit proposal to voting', async () => {
            // Create a new proposal
            const costInfo = await dao.proposalCost({
                actions: [
                    {
                        type: ProposalActionEnum.UpdateFields,
                        field: 'min_rewards_impact',
                        value: 300,
                    },
                ],
            });

            await dao.client.appClient.fundAppAccount({ amount: costInfo.total.microAlgo() });

            const { return: proposalId } = await dao.newProposal({
                cid: EMPTY_CID,
                actions: [
                    {
                        type: ProposalActionEnum.UpdateFields,
                        field: 'min_rewards_impact',
                        value: 300,
                    },
                ],
            });

            expect(proposalId).toBeDefined();

            // Submit to voting
            await dao.submitProposal({ proposalId: proposalId! });

            // Verify status changed to Voting
            const proposal = await dao.getProposal(proposalId!);
            expect(proposal.status).toBe(20); // Voting
            expect(proposal.votingTs).toBeGreaterThan(0n);
        });

        test('should cast votes on a proposal', async () => {
            // Create and submit a proposal
            const costInfo = await dao.proposalCost({
                actions: [
                    {
                        type: ProposalActionEnum.UpdateFields,
                        field: 'min_rewards_impact',
                        value: 400,
                    },
                ],
            });

            await dao.client.appClient.fundAppAccount({ amount: costInfo.total.microAlgo() });

            const { return: proposalId } = await dao.newProposal({
                cid: EMPTY_CID,
                actions: [
                    {
                        type: ProposalActionEnum.UpdateFields,
                        field: 'min_rewards_impact',
                        value: 400,
                    },
                ],
            });

            await dao.submitProposal({ proposalId: proposalId! });

            // Vote approve as voter1 (who has staked)
            await dao.voteProposal({
                sender: voter1,
                signer: voter1Signer,
                proposalId: proposalId!,
                vote: VOTE_APPROVE,
            } as Parameters<typeof dao.voteProposal>[0]);

            // Check vote was recorded
            const proposalAfterVote = await dao.getProposal(proposalId!);
            expect(proposalAfterVote.votes.approvals).toBeGreaterThan(0n);
        });

        test('should allow changing vote', async () => {
            // Create and submit proposal
            const costInfo = await dao.proposalCost({
                actions: [
                    {
                        type: ProposalActionEnum.UpdateFields,
                        field: 'min_rewards_impact',
                        value: 450,
                    },
                ],
            });

            await dao.client.appClient.fundAppAccount({ amount: costInfo.total.microAlgo() });

            const { return: proposalId } = await dao.newProposal({
                cid: EMPTY_CID,
                actions: [
                    {
                        type: ProposalActionEnum.UpdateFields,
                        field: 'min_rewards_impact',
                        value: 450,
                    },
                ],
            });

            await dao.submitProposal({ proposalId: proposalId! });

            // First vote approve
            await dao.voteProposal({
                sender: voter1,
                signer: voter1Signer,
                proposalId: proposalId!,
                vote: VOTE_APPROVE,
            } as Parameters<typeof dao.voteProposal>[0]);

            const proposalAfterApprove = await dao.getProposal(proposalId!);
            const approvalsBeforeChange = proposalAfterApprove.votes.approvals;

            // Change vote to reject
            await dao.voteProposal({
                sender: voter1,
                signer: voter1Signer,
                proposalId: proposalId!,
                vote: VOTE_REJECT,
            } as Parameters<typeof dao.voteProposal>[0]);

            const proposalAfterReject = await dao.getProposal(proposalId!);

            // Approvals should decrease, rejections should increase
            expect(proposalAfterReject.votes.approvals).toBeLessThan(approvalsBeforeChange);
            expect(proposalAfterReject.votes.rejections).toBeGreaterThan(0n);
        });

        test('should count abstain votes', async () => {
            // Create and submit proposal
            const costInfo = await dao.proposalCost({
                actions: [
                    {
                        type: ProposalActionEnum.UpdateFields,
                        field: 'min_rewards_impact',
                        value: 500,
                    },
                ],
            });

            await dao.client.appClient.fundAppAccount({ amount: costInfo.total.microAlgo() });

            const { return: proposalId } = await dao.newProposal({
                cid: EMPTY_CID,
                actions: [
                    {
                        type: ProposalActionEnum.UpdateFields,
                        field: 'min_rewards_impact',
                        value: 500,
                    },
                ],
            });

            await dao.submitProposal({ proposalId: proposalId! });

            // Vote abstain
            await dao.voteProposal({
                sender: voter1,
                signer: voter1Signer,
                proposalId: proposalId!,
                vote: VOTE_ABSTAIN,
            } as Parameters<typeof dao.voteProposal>[0]);

            const proposal = await dao.getProposal(proposalId!);
            expect(proposal.votes.abstains).toBeGreaterThan(0n);
        });
    });

    describe('Proposal Status Transitions', () => {
        test('should verify proposal status flow: Draft → Voting', async () => {
            const costInfo = await dao.proposalCost({
                actions: [
                    {
                        type: ProposalActionEnum.UpdateFields,
                        field: 'min_rewards_impact',
                        value: 600,
                    },
                ],
            });

            await dao.client.appClient.fundAppAccount({ amount: costInfo.total.microAlgo() });

            const { return: proposalId } = await dao.newProposal({
                cid: EMPTY_CID,
                actions: [
                    {
                        type: ProposalActionEnum.UpdateFields,
                        field: 'min_rewards_impact',
                        value: 600,
                    },
                ],
            });

            // Verify Draft status
            let proposal = await dao.getProposal(proposalId!);
            expect(proposal.status).toBe(0); // Draft

            // Submit to voting
            await dao.submitProposal({ proposalId: proposalId! });

            // Verify Voting status
            proposal = await dao.getProposal(proposalId!);
            expect(proposal.status).toBe(20); // Voting
        });
    });

    describe('Vote Power Calculation', () => {
        test('should weight votes by staking power', async () => {
            const { algorand } = fixture.context;

            // Setup voter2 with a different stake amount (smaller than voter1)
            const stakeAmount2 = 25_000_000_000n; // 25,000 tokens (half of voter1's 50,000)
            // Use blockchain timestamp instead of Date.now() since localnet timestamp differs from wall-clock time
            const status = await algorand.client.algod.status().do();
            const block = await algorand.client.algod.block(status.lastRound).do();
            const blockTimestamp = BigInt(block.block.header.timestamp);
            const expiration2 = blockTimestamp + BigInt(ONE_YEAR);

            const aktaStakePayment2 = await algorand.createTransaction.payment({
                sender: voter2,
                signer: voter2Signer,
                receiver: staking.appAddress.toString(),
                amount: microAlgo(STAKES_MBR),
            });

            const aktaAssetXfer2 = await algorand.createTransaction.assetTransfer({
                sender: voter2,
                signer: voter2Signer,
                assetId: aktaAssetId,
                receiver: staking.appAddress.toString(),
                amount: stakeAmount2,
            });

            await staking.send.stakeAsa({
                sender: voter2,
                signer: voter2Signer,
                args: {
                    payment: aktaStakePayment2,
                    assetXfer: aktaAssetXfer2,
                    type: STAKING_TYPE_LOCK,
                    amount: stakeAmount2,
                    expiration: expiration2,
                },
            });

            const bonesStakePayment2 = await algorand.createTransaction.payment({
                sender: voter2,
                signer: voter2Signer,
                receiver: staking.appAddress.toString(),
                amount: microAlgo(STAKES_MBR),
            });

            const bonesAssetXfer2 = await algorand.createTransaction.assetTransfer({
                sender: voter2,
                signer: voter2Signer,
                assetId: bonesAssetId,
                receiver: staking.appAddress.toString(),
                amount: stakeAmount2,
            });

            await staking.send.stakeAsa({
                sender: voter2,
                signer: voter2Signer,
                args: {
                    payment: bonesStakePayment2,
                    assetXfer: bonesAssetXfer2,
                    type: STAKING_TYPE_LOCK,
                    amount: stakeAmount2,
                    expiration: expiration2,
                },
            });

            // Create and submit proposal
            const costInfo = await dao.proposalCost({
                actions: [
                    {
                        type: ProposalActionEnum.UpdateFields,
                        field: 'min_rewards_impact',
                        value: 700,
                    },
                ],
            });

            await dao.client.appClient.fundAppAccount({ amount: costInfo.total.microAlgo() });

            const { return: proposalId } = await dao.newProposal({
                cid: EMPTY_CID,
                actions: [
                    {
                        type: ProposalActionEnum.UpdateFields,
                        field: 'min_rewards_impact',
                        value: 700,
                    },
                ],
            });

            await dao.submitProposal({ proposalId: proposalId! });

            // Both voters vote approve
            await dao.voteProposal({
                sender: voter1,
                signer: voter1Signer,
                proposalId: proposalId!,
                vote: VOTE_APPROVE,
            } as Parameters<typeof dao.voteProposal>[0]);

            const proposalAfterVoter1 = await dao.getProposal(proposalId!);
            const voter1Power = proposalAfterVoter1.votes.approvals;

            await dao.voteProposal({
                sender: voter2,
                signer: voter2Signer,
                proposalId: proposalId!,
                vote: VOTE_APPROVE,
            } as Parameters<typeof dao.voteProposal>[0]);

            const proposalAfterVoter2 = await dao.getProposal(proposalId!);
            const totalApprovals = proposalAfterVoter2.votes.approvals;

            // Voter1 (50,000 stake) should have more power than voter2 (25,000 stake)
            const voter2Power = totalApprovals - voter1Power;
            expect(voter1Power).toBeGreaterThan(voter2Power);
        });

        test('should cap voting power to equal stake across tokens', async () => {
            const { algorand } = fixture.context;
            const dispenser = await algorand.account.dispenserFromEnvironment();

            const voter3Account = await algorand.account.random();
            const voter3 = voter3Account.addr.toString();
            const voter3Signer = voter3Account.signer;
            await algorand.account.ensureFunded(voter3, dispenser.addr, algo(100));

            const voter4Account = await algorand.account.random();
            const voter4 = voter4Account.addr.toString();
            const voter4Signer = voter4Account.signer;
            await algorand.account.ensureFunded(voter4, dispenser.addr, algo(100));

            await algorand.send.assetOptIn({
                sender: voter3,
                signer: voter3Signer,
                assetId: aktaAssetId,
            });
            await algorand.send.assetOptIn({
                sender: voter3,
                signer: voter3Signer,
                assetId: bonesAssetId,
            });
            await algorand.send.assetOptIn({
                sender: voter4,
                signer: voter4Signer,
                assetId: aktaAssetId,
            });
            await algorand.send.assetOptIn({
                sender: voter4,
                signer: voter4Signer,
                assetId: bonesAssetId,
            });

            await algorand.send.assetTransfer({
                sender,
                signer,
                assetId: aktaAssetId,
                receiver: voter3,
                amount: 10_000_000_000n, // 10,000 AKTA
            });
            await algorand.send.assetTransfer({
                sender,
                signer,
                assetId: bonesAssetId,
                receiver: voter3,
                amount: 10_000_000_000n, // 10,000 BONES
            });
            await algorand.send.assetTransfer({
                sender,
                signer,
                assetId: aktaAssetId,
                receiver: voter4,
                amount: 10_000_000_000n, // 10,000 AKTA
            });
            await algorand.send.assetTransfer({
                sender,
                signer,
                assetId: bonesAssetId,
                receiver: voter4,
                amount: 100_000_000_000n, // 100,000 BONES
            });

            const status = await algorand.client.algod.status().do();
            const block = await algorand.client.algod.block(status.lastRound).do();
            const blockTimestamp = BigInt(block.block.header.timestamp);
            // Half a day short of a year: 364 whole days remain at the vote however the dev-mode clock moves.
            const expiration = blockTimestamp + BigInt(ONE_YEAR) - ONE_DAY / 2n;

            const voter3AktaPayment = await algorand.createTransaction.payment({
                sender: voter3,
                signer: voter3Signer,
                receiver: staking.appAddress.toString(),
                amount: microAlgo(STAKES_MBR),
            });
            const voter3AktaXfer = await algorand.createTransaction.assetTransfer({
                sender: voter3,
                signer: voter3Signer,
                assetId: aktaAssetId,
                receiver: staking.appAddress.toString(),
                amount: 10_000_000_000n,
            });
            await staking.send.stakeAsa({
                sender: voter3,
                signer: voter3Signer,
                args: {
                    payment: voter3AktaPayment,
                    assetXfer: voter3AktaXfer,
                    type: STAKING_TYPE_LOCK,
                    amount: 10_000_000_000n,
                    expiration,
                },
            });

            const voter3BonesPayment = await algorand.createTransaction.payment({
                sender: voter3,
                signer: voter3Signer,
                receiver: staking.appAddress.toString(),
                amount: microAlgo(STAKES_MBR),
            });
            const voter3BonesXfer = await algorand.createTransaction.assetTransfer({
                sender: voter3,
                signer: voter3Signer,
                assetId: bonesAssetId,
                receiver: staking.appAddress.toString(),
                amount: 10_000_000_000n,
            });
            await staking.send.stakeAsa({
                sender: voter3,
                signer: voter3Signer,
                args: {
                    payment: voter3BonesPayment,
                    assetXfer: voter3BonesXfer,
                    type: STAKING_TYPE_LOCK,
                    amount: 10_000_000_000n,
                    expiration,
                },
            });

            const voter4AktaPayment = await algorand.createTransaction.payment({
                sender: voter4,
                signer: voter4Signer,
                receiver: staking.appAddress.toString(),
                amount: microAlgo(STAKES_MBR),
            });
            const voter4AktaXfer = await algorand.createTransaction.assetTransfer({
                sender: voter4,
                signer: voter4Signer,
                assetId: aktaAssetId,
                receiver: staking.appAddress.toString(),
                amount: 10_000_000_000n,
            });
            await staking.send.stakeAsa({
                sender: voter4,
                signer: voter4Signer,
                args: {
                    payment: voter4AktaPayment,
                    assetXfer: voter4AktaXfer,
                    type: STAKING_TYPE_LOCK,
                    amount: 10_000_000_000n,
                    expiration,
                },
            });

            const voter4BonesPayment = await algorand.createTransaction.payment({
                sender: voter4,
                signer: voter4Signer,
                receiver: staking.appAddress.toString(),
                amount: microAlgo(STAKES_MBR),
            });
            const voter4BonesXfer = await algorand.createTransaction.assetTransfer({
                sender: voter4,
                signer: voter4Signer,
                assetId: bonesAssetId,
                receiver: staking.appAddress.toString(),
                amount: 100_000_000_000n,
            });
            await staking.send.stakeAsa({
                sender: voter4,
                signer: voter4Signer,
                args: {
                    payment: voter4BonesPayment,
                    assetXfer: voter4BonesXfer,
                    type: STAKING_TYPE_LOCK,
                    amount: 100_000_000_000n,
                    expiration,
                },
            });

            const costInfo = await dao.proposalCost({
                actions: [
                    {
                        type: ProposalActionEnum.UpdateFields,
                        field: 'min_rewards_impact',
                        value: 800,
                    },
                ],
            });

            await dao.client.appClient.fundAppAccount({ amount: costInfo.total.microAlgo() });

            const { return: proposalId } = await dao.newProposal({
                cid: EMPTY_CID,
                actions: [
                    {
                        type: ProposalActionEnum.UpdateFields,
                        field: 'min_rewards_impact',
                        value: 800,
                    },
                ],
            });

            await dao.submitProposal({ proposalId: proposalId! });

            // Get staking info before voting to capture state
            const voter3AktaInfo = await staking.getInfo({
                args: {
                    address: voter3,
                    stake: { asset: aktaAssetId, type: STAKING_TYPE_LOCK },
                },
            });
            const voter3BonesInfo = await staking.getInfo({
                args: {
                    address: voter3,
                    stake: { asset: bonesAssetId, type: STAKING_TYPE_LOCK },
                },
            });

            // Get the current round's timestamp just before voting - this matches what Global.latestTimestamp will see
            const preVote3Status = await algorand.client.algod.status().do();
            const preVote3Block = await algorand.client.algod.block(preVote3Status.lastRound).do();
            const voter3Timestamp = BigInt(preVote3Block.block.header.timestamp);

            const voter3VoteResult = await dao.voteProposal({
                sender: voter3,
                signer: voter3Signer,
                proposalId: proposalId!,
                vote: VOTE_APPROVE,
            } as Parameters<typeof dao.voteProposal>[0]);

            const proposalAfterVoter3 = await dao.getProposal(proposalId!);
            const voter3Power = proposalAfterVoter3.votes.approvals;
            // Locks only count when they outlast the vote (snapshot duration taken at submit).
            const tally = await dao.getProposalTally(proposalId!);
            const votingEnds = proposalAfterVoter3.votingTs + tally.duration;

            const voter3AktaPower = calcPower(voter3AktaInfo.amount, voter3AktaInfo.expiration, votingEnds, voter3Timestamp);
            const voter3BonesPower = calcPower(voter3BonesInfo.amount, voter3BonesInfo.expiration, votingEnds, voter3Timestamp);
            const voter3ExpectedPower = voter3AktaPower < voter3BonesPower ? voter3AktaPower : voter3BonesPower;
            
            expect(voter3Power).toBe(voter3ExpectedPower);

            // Get staking info before voting to capture state
            const voter4AktaInfo = await staking.getInfo({
                args: {
                    address: voter4,
                    stake: { asset: aktaAssetId, type: STAKING_TYPE_LOCK },
                },
            });
            const voter4BonesInfo = await staking.getInfo({
                args: {
                    address: voter4,
                    stake: { asset: bonesAssetId, type: STAKING_TYPE_LOCK },
                },
            });

            // Get the current round's timestamp just before voting - this matches what Global.latestTimestamp will see
            const preVote4Status = await algorand.client.algod.status().do();
            const preVote4Block = await algorand.client.algod.block(preVote4Status.lastRound).do();
            const voter4Timestamp = BigInt(preVote4Block.block.header.timestamp);

            await dao.voteProposal({
                sender: voter4,
                signer: voter4Signer,
                proposalId: proposalId!,
                vote: VOTE_APPROVE,
            } as Parameters<typeof dao.voteProposal>[0]);

            const proposalAfterVoter4 = await dao.getProposal(proposalId!);
            const voter4Power = proposalAfterVoter4.votes.approvals - voter3Power;

            const voter4AktaPower = calcPower(voter4AktaInfo.amount, voter4AktaInfo.expiration, votingEnds, voter4Timestamp);
            const voter4BonesPower = calcPower(voter4BonesInfo.amount, voter4BonesInfo.expiration, votingEnds, voter4Timestamp);
            const voter4ExpectedPower = voter4AktaPower < voter4BonesPower ? voter4AktaPower : voter4BonesPower;
            
            // Voter4's power should match expected calculation (capped at equal stake)
            expect(voter4Power).toBe(voter4ExpectedPower);
            
            // Voter4's extra BONES (100k vs 10k) gives no extra power: power is the min over AKTA/BONES.
            // A lock with 364 whole days left: 10,000 tokens (1e10 base units) x 364 / 365.
            expect(voter3Power).toBe(9_972_602_739n);
            expect(voter4Power).toBe(voter3Power);
            expect((await dao.getProposalTally(proposalId!)).weight).toBe(20_000_000_000n);
        });
    });

    describe('Proposal Finalization', () => {
        test('should reject an abstain-only proposal that meets participation', async () => {
            const { algorand } = fixture.context;
            const actions = [
                {
                    type: ProposalActionEnum.UpdateFields as const,
                    field: 'min_rewards_impact' as const,
                    value: 750,
                },
            ];
            const costInfo = await dao.proposalCost({ actions });

            await dao.client.appClient.fundAppAccount({ amount: costInfo.total.microAlgo() });

            const { return: proposalId } = await dao.newProposal({ cid: EMPTY_CID, actions });
            await dao.submitProposal({ proposalId: proposalId! });

            await dao.voteProposal({
                sender: voter1,
                signer: voter1Signer,
                proposalId: proposalId!,
                vote: VOTE_ABSTAIN,
            } as unknown as Parameters<typeof dao.voteProposal>[0]);
            await dao.voteProposal({
                sender: voter2,
                signer: voter2Signer,
                proposalId: proposalId!,
                vote: VOTE_ABSTAIN,
            } as unknown as Parameters<typeof dao.voteProposal>[0]);

            const timeWarp = new TimeWarp(algorand);
            try {
                await timeWarp.timeWarp(costInfo.duration + 2n);
                await dao.finalizeProposal({ proposalId: proposalId! });
            } finally {
                await timeWarp.resetTimeWarp();
            }

            const proposal = await dao.getProposal(proposalId!);
            expect(proposal.votes.approvals).toBe(0n);
            expect(proposal.votes.rejections).toBe(0n);
            expect(proposal.votes.abstains).toBeGreaterThan(0n);
            expect(proposal.status).toBe(30); // Rejected
        });
    });

    describe('Storage Refunds', () => {
        test('should return vote receipts to voters and draft prepayments to the proposer', async () => {
            const { algorand } = fixture.context;
            const actions = [
                {
                    type: ProposalActionEnum.UpdateFields as const,
                    field: 'min_rewards_impact' as const,
                    value: 600,
                },
            ];
            const costInfo = await dao.proposalCost({ actions });
            await dao.client.appClient.fundAppAccount({ amount: costInfo.total.microAlgo() });

            // A never-submitted draft refunds its whole prepayment when its creator deletes it.
            const { return: draftId } = await dao.newProposal({ cid: EMPTY_CID, actions });
            const daoBefore = (await algorand.account.getInformation(dao.client.appAddress)).balance.microAlgos;
            await dao.client.send.deleteProposal({
                args: { proposalId: draftId! },
                populateAppCallResources: true,
                coverAppCallInnerTransactionFees: true,
                maxFee: microAlgo(20_000n),
            });
            expect(daoBefore - (await algorand.account.getInformation(dao.client.appAddress)).balance.microAlgos).toBe(costInfo.total);
            await expect(dao.getProposal(draftId!)).rejects.toThrow();

            await dao.client.appClient.fundAppAccount({ amount: costInfo.total.microAlgo() });
            const { return: proposalId } = await dao.newProposal({ cid: EMPTY_CID, actions });
            await dao.submitProposal({ proposalId: proposalId! });
            // Earlier finalizations already advanced the dev-mode clock and decayed lock power, so every
            // staked account in this suite votes to clear the participation threshold comfortably.
            await dao.voteProposal({ proposalId: proposalId!, vote: VOTE_APPROVE } as unknown as Parameters<typeof dao.voteProposal>[0]);
            await dao.voteProposal({
                sender: voter1,
                signer: voter1Signer,
                proposalId: proposalId!,
                vote: VOTE_APPROVE,
            } as unknown as Parameters<typeof dao.voteProposal>[0]);
            await dao.voteProposal({
                sender: voter2,
                signer: voter2Signer,
                proposalId: proposalId!,
                vote: VOTE_APPROVE,
            } as unknown as Parameters<typeof dao.voteProposal>[0]);

            const timeWarp = new TimeWarp(algorand);
            try {
                await timeWarp.timeWarp(costInfo.duration + 2n);
                await dao.finalizeProposal({ proposalId: proposalId! });
            } finally {
                await timeWarp.resetTimeWarp();
            }

            // The DAO's own account runs the cleanup, so each voter's balance moves by exactly one receipt.
            const voter1Before = (await algorand.account.getInformation(voter1)).balance.microAlgos;
            const voter2Before = (await algorand.account.getInformation(voter2)).balance.microAlgos;
            await dao.client.send.deleteProposalVotes({
                args: { proposalId: proposalId!, voters: [voter1, voter2] },
                populateAppCallResources: true,
                coverAppCallInnerTransactionFees: true,
                maxFee: microAlgo(20_000n),
            });
            expect((await algorand.account.getInformation(voter1)).balance.microAlgos - voter1Before).toBe(DAOProposalVotesMBR);
            expect((await algorand.account.getInformation(voter2)).balance.microAlgos - voter2Before).toBe(DAOProposalVotesMBR);
            await expect(
                dao.client.send.deleteProposalVotes({
                    args: { proposalId: proposalId!, voters: [voter1] },
                    populateAppCallResources: true,
                    coverAppCallInnerTransactionFees: true,
                    maxFee: microAlgo(20_000n),
                }),
            ).rejects.toThrow();
        });
    });


    // ─────────────────────────────────────────────────────────────────────────────────────────────
    // Audit 2026-10 remediation: DAO-04, DAO-06, DAO-07, DAO-08, DAO-09, DAO-11, DAO-12
    // ─────────────────────────────────────────────────────────────────────────────────────────────
    describe('Audit remediation', () => {
        const minRewardsAction = (value: number) => [
            { type: ProposalActionEnum.UpdateFields as const, field: 'min_rewards_impact' as const, value },
        ];
        const balanceOf = async (address: string) =>
            BigInt((await fixture.context.algorand.account.getInformation(address)).balance.microAlgos);
        const daoAddress = () => dao.client.appAddress.toString();
        const castVote = (who: string, whoSigner: TransactionSigner, proposalId: bigint, vote: number) =>
            dao.voteProposal({ sender: who, signer: whoSigner, proposalId, vote } as unknown as Parameters<typeof dao.voteProposal>[0]);
        const voteMajority = async (proposalId: bigint, vote: number) => {
            await castVote(sender, signer, proposalId, vote);
            await castVote(voter1, voter1Signer, proposalId, vote);
            await castVote(voter2, voter2Signer, proposalId, vote);
        };
        const newDraft = async (actions: Parameters<typeof dao.newProposal>[0]['actions']) => {
            const cost = await dao.proposalCost({ actions });
            await dao.client.appClient.fundAppAccount({ amount: cost.total.microAlgo() });
            const { return: id } = await dao.newProposal({ cid: EMPTY_CID, actions });
            return { id: id!, cost };
        };
        const warpAndFinalize = async (duration: bigint, ids: bigint[]) => {
            const timeWarp = new TimeWarp(fixture.context.algorand);
            try {
                await timeWarp.timeWarp(duration + 2n);
                for (const proposalId of ids) await dao.finalizeProposal({ proposalId });
            } finally {
                await timeWarp.resetTimeWarp();
            }
        };
        const boxMbr = async (prefix: string, id: bigint) => {
            const name = new Uint8Array([prefix.charCodeAt(0), ...encodeUint64(id)]);
            const value = await fixture.context.algorand.app.getBoxValue(dao.appId, name);
            return 2_500n + 400n * BigInt(name.length + value.length);
        };
        const lockBoth = async (who: string, whoSigner: TransactionSigner, amount: bigint, expiration: bigint) => {
            const { algorand } = fixture.context;
            for (const assetId of [aktaAssetId, bonesAssetId]) {
                try { await algorand.send.assetOptIn({ sender: who, signer: whoSigner, assetId }); } catch { /* opted in */ }
                await algorand.send.assetTransfer({ sender, signer, assetId, receiver: who, amount });
                const payment = await algorand.createTransaction.payment({
                    sender: who, signer: whoSigner, receiver: staking.appAddress.toString(), amount: microAlgo(STAKES_MBR),
                });
                const assetXfer = await algorand.createTransaction.assetTransfer({
                    sender: who, signer: whoSigner, assetId, receiver: staking.appAddress.toString(), amount,
                });
                await staking.send.stakeAsa({
                    sender: who, signer: whoSigner,
                    args: { payment, assetXfer, type: STAKING_TYPE_LOCK, amount, expiration },
                });
            }
        };
        let shortLocker = '';
        const chainNow = async () => {
            const { algorand } = fixture.context;
            const status = await algorand.client.algod.status().do();
            const block = await algorand.client.algod.block(status.lastRound).do();
            return BigInt(block.block.header.timestamp);
        };

        test('DAO-11: only the creator can set up the DAO wallet', async () => {
            await expect(dao.setup({ sender: voter1, signer: voter1Signer })).rejects.toThrow(/errForb/);
        });

        test('DAO-12: a cheaper edit refunds the difference to the proposer', async () => {
            const two = [...minRewardsAction(901), ...minRewardsAction(902)];
            const { id, cost: twoCost } = await newDraft(two);
            const oneCost = await dao.proposalCost({ actions: minRewardsAction(903) });
            expect(oneCost.total).toBeLessThan(twoCost.total);

            const daoBefore = await balanceOf(daoAddress());
            await dao.editProposal({ id, cid: EMPTY_CID, actions: minRewardsAction(903) });
            expect(daoBefore - await balanceOf(daoAddress())).toBe(twoCost.total - oneCost.total);
            const proposal = await dao.client.state.box.proposals.value(id);
            expect(proposal!.feesPaid).toBe(oneCost.total);
            await dao.deleteProposal({ proposalId: id });
        });

        test('DAO-07: a re-vote refunds its deposit, and the deposit must come from the voter', async () => {
            const { id } = await newDraft(minRewardsAction(911));
            await dao.submitProposal({ proposalId: id });
            await castVote(voter1, voter1Signer, id, VOTE_APPROVE);

            const daoBefore = await balanceOf(daoAddress());
            const voterBefore = await balanceOf(voter1);
            await castVote(voter1, voter1Signer, id, VOTE_REJECT);
            expect(await balanceOf(daoAddress())).toBe(daoBefore);
            expect(voterBefore - await balanceOf(voter1)).toBeLessThan(10_000n); // network fees only

            // A third party may not fund someone else's vote receipt.
            const sponsored = fixture.context.algorand.createTransaction.payment({
                sender: voter2, signer: voter2Signer, receiver: daoAddress(), amount: microAlgo(DAOProposalVotesMBR),
            });
            await expect(dao.client.send.voteProposal({
                sender: voter1, signer: voter1Signer,
                args: { mbrPayment: sponsored, proposalId: id, vote: VOTE_APPROVE },
            })).rejects.toThrow(/errIpay/);
        });

        test('DAO-04: a lock that expires before the vote ends carries no weight', async () => {
            const { algorand } = fixture.context;
            const dispenser = await algorand.account.dispenserFromEnvironment();
            const voter5 = await algorand.account.random();
            await algorand.account.ensureFunded(voter5.addr, dispenser.addr, algo(20));
            const { id } = await newDraft(minRewardsAction(912));
            await dao.submitProposal({ proposalId: id });
            const tally = await dao.getProposalTally(id);
            // Locked for less than the voting window: it could be withdrawn and re-locked to vote twice.
            await lockBoth(voter5.addr.toString(), voter5.signer, 1_000_000_000n, (await chainNow()) + tally.duration / 2n);
            await expect(castVote(voter5.addr.toString(), voter5.signer, id, VOTE_APPROVE)).rejects.toThrow(/errNpow/);
            shortLocker = voter5.addr.toString();
        });

        test('DAO-08 / DAO-09: snapshots survive settings changes; cancel; deletion waits for vote receipts', async () => {
            // A: snapshot at submit.
            const a = await newDraft(minRewardsAction(921));
            await dao.submitProposal({ proposalId: a.id });
            const tallyA = await dao.getProposalTally(a.id);
            expect(tallyA.duration).toBe(a.cost.duration);
            expect(tallyA.voteCount).toBe(0n);

            // B: lengthen the UpdateFields voting window while A is still being voted on.
            const current = (await dao.client.state.global.getAll()).updateFieldsProposalSettings!;
            const b = await newDraft([{
                type: ProposalActionEnum.UpdateFields, field: 'update_fields_ps',
                value: { ...current, duration: current.duration + 3_600n },
            }]);
            await dao.submitProposal({ proposalId: b.id });
            await voteMajority(a.id, VOTE_APPROVE);
            await voteMajority(b.id, VOTE_APPROVE);
            expect((await dao.getProposalTally(a.id)).voteCount).toBe(3n);

            await warpAndFinalize(b.cost.duration, [b.id]);
            await dao.executeProposal({ proposalId: b.id });
            expect((await dao.client.state.global.getAll()).updateFieldsProposalSettings!.duration).toBe(current.duration + 3_600n);
            // A still finalizes on its own snapshot (live settings would now say voting is still open).
            await dao.finalizeProposal({ proposalId: a.id });
            expect((await dao.getProposal(a.id)).status).toBe(40);

            // Proposer-only cancel of an approved, unexecuted proposal.
            await expect(dao.cancelProposal({ sender: voter1, signer: voter1Signer, proposalId: a.id })).rejects.toThrow(/errIsnd/);
            await dao.cancelProposal({ proposalId: a.id });
            expect((await dao.getProposal(a.id)).status).toBe(10);
            await expect(dao.executeProposal({ proposalId: a.id })).rejects.toThrow(/errIpst/);

            // B executed with outstanding receipts: cannot be deleted until voters are refunded.
            await expect(dao.deleteProposal({ proposalId: b.id })).rejects.toThrow(/errVout/);
            await dao.deleteProposalVotes({ proposalId: b.id, voters: [sender, voter1, voter2] });
            expect((await dao.getProposalTally(b.id)).voteCount).toBe(0n);
            const expectedRefund = (await boxMbr('l', b.id)) + (await boxMbr('t', b.id));
            const daoBefore = await balanceOf(daoAddress());
            await dao.deleteProposal({ proposalId: b.id });
            expect(daoBefore - await balanceOf(daoAddress())).toBe(expectedRefund);

            // A (cancelled) can be cleaned up the same way.
            await dao.deleteProposalVotes({ proposalId: a.id, voters: [sender, voter1, voter2] });
            await dao.deleteProposal({ proposalId: a.id });
            await expect(dao.getProposal(a.id)).rejects.toThrow();

            // C: rejected proposals are deletable too.
            const c = await newDraft(minRewardsAction(923));
            await dao.submitProposal({ proposalId: c.id });
            await voteMajority(c.id, VOTE_REJECT);
            await warpAndFinalize(c.cost.duration, [c.id]);
            expect((await dao.getProposal(c.id)).status).toBe(30);
            await dao.deleteProposalVotes({ proposalId: c.id, voters: [sender, voter1, voter2] });
            await dao.deleteProposal({ proposalId: c.id });
            await expect(dao.getProposal(c.id)).rejects.toThrow();
        });

        test('ChangeAdmin hands the wallet over through a voted (upgrade-class) proposal', async () => {
            const daoAddr = daoAddress();
            expect(await dao.wallet.client.arc58GetAdmin()).toBe(daoAddr);
            // The short DAO-04 lock has expired by now; drop it from the live total (permissionless).
            for (const asset of [aktaAssetId, bonesAssetId]) {
                await staking.send.checkpointExpiredLock({ args: { address: shortLocker, asset } });
            }
            const actions = [{ type: ProposalActionEnum.ChangeAdmin as const, admin: sender }];
            const { id, cost } = await newDraft(actions);
            await dao.submitProposal({ proposalId: id });
            await voteMajority(id, VOTE_APPROVE);
            await warpAndFinalize(cost.duration, [id]);
            expect((await dao.getProposal(id)).status).toBe(40);
            await dao.executeProposal({ proposalId: id });
            expect(await dao.wallet.client.arc58GetAdmin()).toBe(sender);

            // Restore the DAO so the remaining tests keep a governed treasury.
            await dao.wallet.client.send.arc58ChangeAdmin({
                args: { newAdmin: daoAddr }, sender, signer, populateAppCallResources: true,
            });
            expect(await dao.wallet.client.arc58GetAdmin()).toBe(daoAddr);
        });

        /** An external-controlled wallet (its EOA owner holds the locks) with the DAO plugin installed. */
        const pluginWallet = async () => {
            const { algorand } = fixture.context;
            const dispenser = await algorand.account.dispenserFromEnvironment();

            // External-controlled wallet: the EOA holds the locks and is rekeyed to the wallet.
            const owner = await algorand.account.random();
            await algorand.account.ensureFunded(owner.addr, dispenser.addr, algo(60));
            await lockBoth(owner.addr.toString(), owner.signer, 2_000_000_000n, (await chainNow()) + BigInt(ONE_YEAR));

            // SG-04: the SDK rekeys the external controlled account to the factory inside the
            // creation group (signed by controlledSigner); the factory then rekeys it to the wallet.
            const wallet = await newWallet({
                algorand,
                factoryParams: { appId: walletFactory.appId, defaultSender: voter2, defaultSigner: voter2Signer },
                sender: voter2,
                signer: voter2Signer,
                nickname: 'Governance Wallet',
                controlledAddress: owner.addr.toString(),
                controlledSigner: owner.signer,
            });

            const pluginFactory = algorand.client.getTypedAppFactory(AkitaDaoPluginFactory, { defaultSender: sender, defaultSigner: signer });
            const { appClient: pluginClient } = await pluginFactory.send.create.create({ args: { daoAppId: dao.appId } });
            const daoPlugin = new DAOPluginSDK({ algorand, factoryParams: { appId: pluginClient.appId, defaultSender: voter2, defaultSigner: voter2Signer } });
            const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n });
            await wallet.client.appClient.fundAppAccount({ amount: microAlgo(mbr.plugins + 1_000_000n) });
            await wallet.addPlugin({ client: daoPlugin, callerType: CallerType.Global });
            return { owner, wallet, daoPlugin };
        };

        test('DAO-06: a wallet creates, edits and deletes its own proposal through the DAO plugin', async () => {
            const { owner, wallet, daoPlugin } = await pluginWallet();

            const encode = (value: number) => ABIType.from('(string,byte[])').encode(['min_rewards_impact', encodeUint64(value)]);
            const actions: [number, Uint8Array][] = [[ProposalActionEnum.UpdateFields, encode(931)]];
            const cost = await dao.proposalCost({ actions: minRewardsAction(931) });

            const ownerBefore = await balanceOf(owner.addr.toString());
            await wallet.usePlugin({
                sender: voter2, signer: voter2Signer, callerType: CallerType.Global,
                calls: [daoPlugin.newProposal({ sender: voter2, signer: voter2Signer, cid: EMPTY_CID, actions })],
            });
            const id = (await dao.client.state.global.proposalId())! - 1n;
            const created = await dao.client.state.box.proposals.value(id);
            expect(created!.status).toBe(0);
            expect(created!.creator).toBe(owner.addr.toString());
            expect(created!.feesPaid).toBe(cost.total);
            expect(ownerBefore - await balanceOf(owner.addr.toString())).toBe(cost.total);

            // Editing a draft through the plugin works (it was always rejected before).
            await wallet.usePlugin({
                sender: voter2, signer: voter2Signer, callerType: CallerType.Global,
                calls: [daoPlugin.editProposal({ sender: voter2, signer: voter2Signer, id, cid: EMPTY_CID, actions: [[ProposalActionEnum.UpdateFields, encode(932)]] })],
            });

            // Deleting the draft returns the whole prepayment to the wallet's account.
            const beforeDelete = await balanceOf(owner.addr.toString());
            await wallet.usePlugin({
                sender: voter2, signer: voter2Signer, callerType: CallerType.Global,
                calls: [daoPlugin.deleteProposal({ sender: voter2, signer: voter2Signer, proposalId: id })],
            });
            expect(await balanceOf(owner.addr.toString()) - beforeDelete).toBe(cost.total);
            await expect(dao.getProposal(id)).rejects.toThrow();
        });

        test('the DAO plugin votes with the receipt deposit, plus the participation record on a first vote', async () => {
            const { owner, wallet, daoPlugin } = await pluginWallet();
            const ownerAddr = owner.addr.toString();
            const votes = (proposalId: bigint, vote: number) => wallet.usePlugin({
                sender: voter2, signer: voter2Signer, callerType: CallerType.Global,
                calls: [daoPlugin.voteProposal({ sender: voter2, signer: voter2Signer, proposalId, vote })],
            });

            const first = await newDraft(minRewardsAction(961));
            const second = await newDraft(minRewardsAction(962));
            await dao.submitProposal({ proposalId: first.id });
            await dao.submitProposal({ proposalId: second.id });

            let before = await balanceOf(ownerAddr);
            await votes(first.id, VOTE_APPROVE);
            expect(before - await balanceOf(ownerAddr)).toBe(DAOProposalVotesMBR + DAOParticipationMBR);
            expect(await dao.getVoteReceipt({ proposalId: first.id, voter: ownerAddr })).toMatchObject({ type: VOTE_APPROVE, weight: 2_000_000_000n });
            expect((await dao.getGovernanceParticipation(ownerAddr)).votes).toBe(1n);

            // A re-vote is refunded in full; a vote on another proposal pays only for its receipt.
            before = await balanceOf(ownerAddr);
            await votes(first.id, VOTE_REJECT);
            expect(await balanceOf(ownerAddr)).toBe(before);
            await votes(second.id, VOTE_APPROVE);
            expect(before - await balanceOf(ownerAddr)).toBe(DAOProposalVotesMBR);
            expect(await dao.getGovernanceParticipation(ownerAddr)).toMatchObject({ votes: 2n, lastProposalId: second.id });
        });

        test('DAO-R4: a voter who closed their account does not block deleting the proposal', async () => {
            const { algorand } = fixture.context;
            const dispenser = await algorand.account.dispenserFromEnvironment();
            const closer = await algorand.account.random();
            const closerAddr = closer.addr.toString();
            await algorand.account.ensureFunded(closer.addr, dispenser.addr, algo(20));
            await lockBoth(closerAddr, closer.signer, 2_000_000n, (await chainNow()) + BigInt(ONE_YEAR));

            const { id, cost } = await newDraft(minRewardsAction(941));
            await dao.submitProposal({ proposalId: id });
            await voteMajority(id, VOTE_APPROVE);
            await castVote(closerAddr, closer.signer, id, VOTE_APPROVE);

            for (const assetId of [aktaAssetId, bonesAssetId]) {
                await algorand.send.assetOptOut({ sender: closerAddr, signer: closer.signer, assetId, creator: sender, ensureZeroBalance: true });
            }
            await algorand.send.payment({ sender: closerAddr, signer: closer.signer, receiver: sender, amount: microAlgo(0), closeRemainderTo: sender });
            expect(await balanceOf(closerAddr)).toBe(0n);

            await warpAndFinalize(cost.duration, [id]);
            expect((await dao.getProposal(id)).status).toBe(40);
            await dao.executeProposal({ proposalId: id });

            // The closed account cannot take a sub-minimum payment, so the DAO keeps that deposit.
            const daoBefore = await balanceOf(daoAddress());
            await dao.deleteProposalVotes({ proposalId: id, voters: [closerAddr] });
            expect(await balanceOf(closerAddr)).toBe(0n);
            expect(await balanceOf(daoAddress())).toBe(daoBefore);
            expect((await dao.getProposalTally(id)).voteCount).toBe(3n);

            await dao.deleteProposalVotes({ proposalId: id, voters: [sender, voter1, voter2] });
            await dao.deleteProposal({ proposalId: id });
            await expect(dao.getProposal(id)).rejects.toThrow();
        });

        // Runs last: it leaves a large one-year lock that later votes in this suite could not outweigh.
        test('DAO-R2: a quorum miss finalizes as Rejected against the stake locked at submit', async () => {
            const { algorand } = fixture.context;
            const dispenser = await algorand.account.dispenserFromEnvironment();
            const lockedStake = async () => {
                const [akta, bones] = await staking.getTotals({ args: { assets: [aktaAssetId, bonesAssetId] } });
                return akta[2] < bones[2] ? akta[2] : bones[2];
            };

            const actions = minRewardsAction(951);
            const { participation, duration } = await dao.proposalCost({ actions });
            const D = 100_000n;
            const before = await lockedStake();
            // The proposer's lock reaches the bar once the whale's lock leaves the live total, never against the submit-time total.
            const proposerAmount = (2n * participation * before) / (D - participation) + 1n;
            const whaleAmount = (proposerAmount * D) / participation;

            const proposer = await algorand.account.random();
            const whale = await algorand.account.random();
            for (const account of [proposer, whale]) await algorand.account.ensureFunded(account.addr, dispenser.addr, algo(20));
            await lockBoth(proposer.addr.toString(), proposer.signer, proposerAmount, (await chainNow()) + BigInt(ONE_YEAR));
            await lockBoth(whale.addr.toString(), whale.signer, whaleAmount, (await chainNow()) + duration / 2n);

            const { id } = await newDraft(actions);
            await dao.submitProposal({ proposalId: id });
            const atSubmit = await lockedStake();
            await castVote(proposer.addr.toString(), proposer.signer, id, VOTE_APPROVE);

            const timeWarp = new TimeWarp(algorand);
            try {
                await timeWarp.timeWarp(duration + 2n);
                for (const asset of [aktaAssetId, bonesAssetId]) {
                    await staking.send.checkpointExpiredLock({ args: { address: whale.addr.toString(), asset } });
                }
                const afterDrop = await lockedStake();
                expect(proposerAmount * D).toBeGreaterThanOrEqual(afterDrop * participation);
                expect(proposerAmount * D).toBeLessThan(atSubmit * participation);
                await dao.finalizeProposal({ proposalId: id });
            } finally {
                await timeWarp.resetTimeWarp();
            }

            expect((await dao.getProposal(id)).status).toBe(30);
            expect((await dao.getProposalTally(id)).locked).toBe(atSubmit);
            await expect(dao.finalizeProposal({ proposalId: id })).rejects.toThrow(/errIpst/);
        });

        describe('early close', () => {
            const D = 100_000n;
            const liveLocked = async () => {
                const [akta, bones] = await staking.getTotals({ args: { assets: [aktaAssetId, bonesAssetId] } });
                return akta[2] < bones[2] ? akta[2] : bones[2];
            };
            /** The stake that has not voted can add at most the live locked total less the stake that voted. */
            const remainingOf = async (id: bigint) => {
                const { weight } = await dao.getProposalTally(id);
                const live = await liveLocked();
                return live > weight ? live - weight : 0n;
            };
            const approvalMet = (approvals: bigint, rejections: bigint, approval: bigint) =>
                approvals > 0n && (rejections === 0n ? D >= approval : (approvals * D) / (approvals + rejections) >= approval);

            test('a vote the remaining stake could still change stays open', async () => {
                const { id } = await newDraft(minRewardsAction(952));
                await dao.submitProposal({ proposalId: id });
                await castVote(voter2, voter2Signer, id, VOTE_APPROVE);
                const { approval } = await dao.proposalCost({ actions: minRewardsAction(952) });
                const { votes } = await dao.getProposal(id);
                expect(approvalMet(votes.approvals, votes.rejections + (await remainingOf(id)), approval)).toBe(false);
                await expect(dao.finalizeProposal({ proposalId: id })).rejects.toThrow(/errVdur/);
            });

            /** A fresh holder locking three times the stake locked now, for a year so its power is its full weight. */
            const majorityHolder = async () => {
                const { algorand } = fixture.context;
                const dispenser = await algorand.account.dispenserFromEnvironment();
                const holder = await algorand.account.random();
                await algorand.account.ensureFunded(holder.addr, dispenser.addr, algo(20));
                // the shared sender funds drafts and hands out the locked tokens
                await algorand.account.ensureFunded(sender, dispenser.addr, algo(50));
                await lockBoth(holder.addr.toString(), holder.signer, 3n * (await liveLocked()), (await chainNow()) + BigInt(ONE_YEAR));
                return holder;
            };

            test('an approval the remaining stake cannot overturn closes early', async () => {
                const holder = await majorityHolder();
                const actions = minRewardsAction(953);
                const { id } = await newDraft(actions);
                await dao.submitProposal({ proposalId: id });
                await castVote(holder.addr.toString(), holder.signer, id, VOTE_APPROVE);
                const { approval, participation } = await dao.proposalCost({ actions });
                const { votes } = await dao.getProposal(id);
                const tally = await dao.getProposalTally(id);
                // precondition from chain state: quorum is met and approval holds even if every unvoted locked token rejects
                expect(tally.weight * D).toBeGreaterThanOrEqual(tally.locked * participation);
                expect(approvalMet(votes.approvals, votes.rejections + (await remainingOf(id)), approval)).toBe(true);

                await dao.finalizeProposal({ proposalId: id });
                expect((await dao.getProposal(id)).status).toBe(40);
                // closing ends the vote
                await expect(castVote(holder.addr.toString(), holder.signer, id, VOTE_REJECT)).rejects.toThrow(/errIpst/);
            });

            test('a rejection the remaining stake cannot overturn closes early', async () => {
                const holder = await majorityHolder();
                const actions = minRewardsAction(954);
                const { id } = await newDraft(actions);
                await dao.submitProposal({ proposalId: id });
                await castVote(holder.addr.toString(), holder.signer, id, VOTE_REJECT);
                const { approval } = await dao.proposalCost({ actions });
                const { votes } = await dao.getProposal(id);
                // precondition: even if every unvoted locked token approves, approval is out of reach
                expect(approvalMet(votes.approvals + (await remainingOf(id)), votes.rejections, approval)).toBe(false);

                await dao.finalizeProposal({ proposalId: id });
                expect((await dao.getProposal(id)).status).toBe(30);
            });
        });
    });
});
