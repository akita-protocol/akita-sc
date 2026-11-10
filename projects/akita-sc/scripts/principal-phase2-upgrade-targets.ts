#!/usr/bin/env node

/**
 * Principal resolution, Phase 2 (docs/principal-resolution/PHASE-0-SPEC.md §7.1): targets first.
 *
 * Upgrades the singletons (AkitaSocial, AkitaSocialGraph, Subscriptions, Marketplace, StakingPoolFactory,
 * AuctionFactory, RaffleFactory, AbstractedAccountFactory) to the artifacts of this tree through the
 * Phase 2a Update plugin, and pushes each factory's child bytecode (Listing, StakingPool, Auction,
 * Raffle, and the AbstractedAccount wallet version, which always lands with its factory in one group, ACCT-3).
 * A factory upgrade and its child push share one execution group when they fit in 16 txns (atomic);
 * otherwise the factory goes first. Each target is one UpgradeApp proposal. Pages and schema grow as needed (DAO wallet = sponsor),
 * the artifact's clear program is pushed with it, and every result is verified byte for byte.
 *
 * Requires Phase 2a (pal.update = a Phase 2a Update plugin) and a DAO with mustGetExecution + getProposal
 * (the deployed MainNet DAO has both). `--target AkitaDAO` upgrades the DAO itself the same way.
 *
 * ABI: every upgrade is diffed against the deployed ABI snapshot (scripts/lib/principal-deployed-abi.json).
 * An upgrade that REMOVES a method is refused unless Kyle accepted that removal as a decision, recorded
 * in scripts/lib/principal-accepted-abi-removals.json (K2: the wallet factory's 10-argument newAccount;
 * K6: RaffleFactory's deployed newRaffle / newPrizeBoxRaffle), or the run waives it with
 * --accept-removed <Target>:<sig> (one-off override for that target only; every waived signature is printed).
 * --accept-removed all waives every unlisted removal, prints a WARNING with the count, and with --confirm
 * also needs --i-know.
 *
 * Windows: before DAO initialization the proposal executes at once (window = now + 2,000 rounds). On a
 * voting DAO the window opens ~2,000 rounds before the estimated end of the UpgradeApp vote and lasts
 * 10,000 rounds; submit the draft at once (--submit) and resume with --proposal-id inside the window.
 *
 * Usage (always dry-run first):
 *   npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n mainnet --dry-run [--target AkitaSocial,...]
 *   npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n mainnet -m "$MNEMONIC" -v 2.0.0 --confirm
 *   npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n mainnet -m "$MNEMONIC" -v 2.0.0 \
 *     --target AkitaSocial --proposal-id 123 --confirm          # resume after a vote
 *
 * Ride-along targets (`--target` only): HyperSwap and PollFactory break the deployed HyperSwapPlugin and
 * PollPlugin. The run deploys their new versions (--manifest-dir, or --lockstep-deployed) and swaps the
 * DAO wallet grants in the same run: before the upgrade when the new version already works against the
 * live app, otherwise right after it (ROLLOUT-2, MISC-6).
 *
 * StakingPoolFactory is refused until aal.staking and aal.rewards route every Staking / Rewards method the
 * new StakingPool child calls (upgrade Staking and repoint aal.rewards to Rewards v2 first, ROLLOUT-1).
 */
import { runScript } from './script-base'
import { runPhase2Cli } from './lib/principal-phase2-cli'

runScript(() => runPhase2Cli('principal-phase2-upgrade-targets.ts'))
