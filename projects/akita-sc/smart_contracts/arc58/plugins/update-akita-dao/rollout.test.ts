/**
 * Unit tests (no LocalNet) for the principal-resolution rollout planning (spec §7.1 Phases 2a, 2, 3):
 * `scripts/lib/principal-rollout.ts`, the grant-migration helpers and the immutable-catalog entries
 * of the new plugin versions. The LocalNet rehearsal is `rollout.e2e.spec.ts` (P2-UPD-01).
 */
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import algosdk from 'algosdk'
import { describe, expect, test } from 'vitest'
import { setupContext } from '../../../../scripts/script-base'
import { immutableCatalog, prepareImmutable } from '../../../../scripts/lib/immutable-deployment'
import { createMigrationPlan, resolveGrantUpdate, splitMigrations } from '../../../../scripts/lib/dao-wallet-plugin-migration'
import type { ScriptContext } from '../../../../scripts/script-base'
import { AlgorandClient } from '@algorandfoundation/algokit-utils'
import { ProposalActionEnum } from 'akita-sdk/dao'
import { UPGRADE_BINDING_NOTE_PROPOSAL } from 'akita-sdk/wallet'
import { CallerType } from 'akita-sdk/wallet'
import { assertAbiAcknowledged, describeAbiAcknowledgment, executeTargetPlan, parseRemovalWaivers, planTarget, runPhase2, runPhase2a, treeValidatorInUse, type TargetPlan } from '../../../../scripts/lib/principal-rollout-run'
import { runUpdate } from '../../../../scripts/script-base'
import {
  acceptedRemoval,
  appSegmentTxns,
  artifactSignatures,
  calledSignatures,
  childPushProblems,
  createSignatures,
  DAO_UPGRADE_BINDING_SIGNATURES,
  dependencyGaps,
  daoBindingMode,
  DEFAULT_VOTED_WINDOW_ROUNDS,
  diffAbi,
  EXECUTION_VALIDITY_PERIOD,
  loadKnownAbis,
  MAX_LOG_SIZE,
  missingDaoBindingMethods,
  missingPhase2aMarkers,
  PHASE2_DAO_TARGET,
  phase3Gaps,
  planExecutionWindow,
  proposalReturnSize,
  groupsForRounds,
  rebuildRecordedExecution,
  roundsForGroups,
  upgradeActionDataLength,
  windowSizeArg,
  childInnerTxns,
  childSegmentTxns,
  fitsPages,
  invalidAcceptedRemovals,
  loadAcceptedAbiRemovals,
  loadCompiled,
  LOCKSTEP_PLUGINS,
  lockstepPlugins,
  neededExtraPages,
  parseAddMethod,
  parseReplacement,
  PHASE2_RIDE_ALONG_TARGETS,
  PHASE2_TARGETS,
  PHASE3_PLUGINS,
  planAppUpdate,
  planGroups,
  programHash,
  programHasSelector,
  restampExecution,
  selectPhase2Targets,
  sponsoredMbr,
  splitLockstep,
  sponsorFunding,
  UPGRADE_LEASE_SIGNATURE,
} from '../../../../scripts/lib/principal-rollout'
import deployed from './fixtures/mainnet-deployed.json'
import rideAlong from '../../../../tests/compat/fixtures/ride-along-programs.json'
import { approvalBytes } from '../../../../tests/compat/lib/snapshot'

type FixtureApp = { approval?: string; clear?: string; approvalSize: number; clearSize: number; extraProgramPages: number; globalInts: number; globalBytes: number; approvalSha256: string }
const apps = deployed.apps as unknown as Record<string, FixtureApp>
const bytes = (b64: string) => new Uint8Array(Buffer.from(b64, 'base64'))
const HYPERSWAP_OLD_ACCEPT = 'accept(pay,uint64,byte[32][])void'
type RideAlongProgram = { appId: string; approval: string; approvalSha256: string }
/** Deployed MainNet programs of the ride-along targets and their dependencies (tests/compat/fixtures/ride-along-programs.json). */
const deployedRideAlong = (key: string) => {
  const p = (rideAlong.programs as Record<string, RideAlongProgram>)[key]
  const approval = bytes(p.approval)
  expect(programHash(approval), key).toBe(p.approvalSha256)
  return { appId: BigInt(p.appId), approval, sha: p.approvalSha256 }
}
const live = (app: FixtureApp) => ({ approvalSize: app.approvalSize, clearSize: app.clearSize, extraProgramPages: app.extraProgramPages, globalInts: app.globalInts, globalBytes: app.globalBytes })

describe('MainNet fixture (deployed bytecode baseline, spec §7.1)', () => {
  test('program bytes match their recorded sizes and hashes', () => {
    for (const [key, app] of Object.entries(apps)) {
      if (!app.approval) continue
      const approval = bytes(app.approval)
      expect(approval.length, key).toBe(app.approvalSize)
      expect(programHash(approval), key).toBe(app.approvalSha256)
      expect(bytes(app.clear!).length, key).toBe(app.clearSize)
    }
  })

  test('the deployed DAO lacks isUpgradeLease (DAO-03); the tree\'s DAO has it; both have opUp', () => {
    const mainnetDao = bytes(apps.dao.approval!)
    expect(programHasSelector(mainnetDao, UPGRADE_LEASE_SIGNATURE)).toBe(false)
    expect(programHasSelector(mainnetDao, 'opUp()void')).toBe(true)
    expect(programHasSelector(loadCompiled('arc58/dao/AkitaDAO.arc56.json').approval, UPGRADE_LEASE_SIGNATURE)).toBe(true)
  })

  test('both DAOs have the binding methods the Phase 2a plugin calls, with identical signatures', () => {
    expect(missingDaoBindingMethods(bytes(apps.dao.approval!))).toEqual([])
    expect(missingDaoBindingMethods(loadCompiled('arc58/dao/AkitaDAO.arc56.json').approval)).toEqual([])
    const tree = artifactSignatures('arc58/dao/AkitaDAO.arc56.json')
    const head = loadKnownAbis()[apps.dao.approvalSha256].signatures
    for (const signature of DAO_UPGRADE_BINDING_SIGNATURES) {
      expect(tree, signature).toContain(signature)
      expect(head, signature).toContain(signature)
    }
  })

  test('the Phase 2a plugin can bind upgrades on the deployed DAO (proposal read) and on the tree DAO (lease read): no deadlock', () => {
    const next = loadCompiled('arc58/plugins/update-akita-dao/UpdateAkitaDAOPlugin.arc56.json')
    expect(missingPhase2aMarkers(next.approval)).toEqual([])
    expect(daoBindingMode(bytes(apps.dao.approval!))).toBe('proposal')
    expect(daoBindingMode(loadCompiled('arc58/dao/AkitaDAO.arc56.json').approval)).toBe('lease')
    expect(daoBindingMode(new Uint8Array(64))).toBeUndefined()
    // The note that selects the proposal read is compiled into the plugin, identical to the SDK's.
    expect(Buffer.from(next.approval).indexOf(Buffer.from(UPGRADE_BINDING_NOTE_PROPOSAL))).toBeGreaterThan(0)
    // Every DAO method the plugin calls, except the tree-only isUpgradeLease, exists on the deployed DAO.
    const called = calledSignatures(next.approval, 'arc58/dao/AkitaDAO.arc56.json')
    expect(called).toEqual(expect.arrayContaining([...DAO_UPGRADE_BINDING_SIGNATURES, UPGRADE_LEASE_SIGNATURE, 'opUp()void']))
    for (const signature of called.filter((s) => s !== UPGRADE_LEASE_SIGNATURE)) {
      expect(programHasSelector(bytes(apps.dao.approval!), signature), signature).toBe(true)
    }
    // The deployed plugin is not a Phase 2a plugin.
    expect(missingPhase2aMarkers(bytes(apps.updatePlugin.approval!))).toEqual(expect.arrayContaining(['updateAppWithSchema(uint64,bool,uint64,uint64,uint64)void', ...DAO_UPGRADE_BINDING_SIGNATURES]))
  })

  test('the deployed Update plugin has no page-growing method; the new one does', () => {
    const head = bytes(apps.updatePlugin.approval!)
    expect(programHasSelector(head, 'updateApp(uint64,bool,uint64)void')).toBe(true)
    expect(programHasSelector(head, 'updateAppWithSchema(uint64,bool,uint64,uint64,uint64)void')).toBe(false)
    const next = loadCompiled('arc58/plugins/update-akita-dao/UpdateAkitaDAOPlugin.arc56.json')
    expect(programHasSelector(next.approval, 'updateAppWithSchema(uint64,bool,uint64,uint64,uint64)void')).toBe(true)
    expect(programHash(next.approval)).not.toBe(apps.updatePlugin.approvalSha256)
  })
})

describe('page, schema and sponsor planning (mirrors UpdateAkitaDAOPlugin.pushUpdate)', () => {
  test('neededExtraPages and fitsPages follow the AVM page rules', () => {
    expect(neededExtraPages(0, 0)).toBe(0)
    expect(neededExtraPages(2_047, 1)).toBe(0)
    expect(neededExtraPages(2_048, 1)).toBe(1)
    expect(neededExtraPages(8_186, 1)).toBe(3)
    expect(neededExtraPages(8_332, 4)).toBe(4)
    expect(neededExtraPages(16_380, 4)).toBe(7)
    expect(() => neededExtraPages(16_381, 4)).toThrow('8')
    expect(fitsPages(8_191, 1, 3)).toBe(true)
    expect(fitsPages(8_192, 1, 3)).toBe(false)
    expect(fitsPages(2_049, 0, 0)).toBe(false)
  })

  test('AkitaSocial: the working-tree program outgrows the deployed pages; the DAO wallet sponsors pages + schema', () => {
    const social = live(apps.social)
    const next = loadCompiled('social/AkitaSocial.arc56.json')
    expect(next.approval.length).toBeGreaterThan(8_192)
    const plan = planAppUpdate(social, next)
    expect(plan.legacyPluginCanPush).toBe(false)
    expect(plan.growTo).toBe(neededExtraPages(next.approval.length, next.clear.length))
    expect(plan.growTo).toBeGreaterThan(apps.social.extraProgramPages)
    expect(plan.sizeChange).toBe(true)
    // The schema is passed through (never shrunk).
    expect(plan.globalIntsAfter).toBe(Math.max(8, next.globalInts))
    expect(plan.globalBytesAfter).toBe(Math.max(56, next.globalBytes))
    expect(plan.sponsoredMbrBefore).toBe(3n * 100_000n + 8n * 28_500n + 56n * 50_000n)
    expect(plan.sponsoredMbrAfter).toBe(sponsoredMbr(plan.extraPagesAfter, plan.globalIntsAfter, plan.globalBytesAfter))
    expect(sponsorFunding([plan, planAppUpdate(social, { approval: bytes(apps.social.approval!), clear: bytes(apps.social.clear!), globalInts: 8, globalBytes: 56 })]))
      .toBe(plan.sponsoredMbrAfter)
  })

  test('re-pushing the deployed program is not a size change and fits the deployed plugin', () => {
    const plan = planAppUpdate(live(apps.social), { approval: bytes(apps.social.approval!), clear: bytes(apps.social.clear!), globalInts: 8, globalBytes: 56 })
    expect(plan).toMatchObject({ growTo: 0, sizeChange: false, schemaArgs: undefined, legacyPluginCanPush: true, extraPagesAfter: 3 })
  })

  test('Subscriptions also needs the Phase 2a plugin', () => {
    const plan = planAppUpdate(live(apps.subscriptions), loadCompiled('subscriptions/Subscriptions.arc56.json'))
    expect(plan.legacyPluginCanPush).toBe(false)
    expect(plan.sizeChange).toBe(true)
  })

  test('schema growth selects updateAppWithSchema and keeps the pages', () => {
    const plan = planAppUpdate(
      { approvalSize: 100, clearSize: 4, extraProgramPages: 2, globalInts: 1, globalBytes: 5 },
      { approval: new Uint8Array(3_000), clear: new Uint8Array(4), globalInts: 2, globalBytes: 3 },
    )
    expect(plan).toMatchObject({ growTo: 0, extraPagesAfter: 2, globalIntsAfter: 2, globalBytesAfter: 5, sizeChange: true })
    expect(plan.schemaArgs).toEqual({ globalNumUint: 2n, globalNumBytes: 3n })
  })
})

describe('group planning', () => {
  test('segment sizes', () => {
    expect(appSegmentTxns(2_026, false)).toBe(3)
    expect(appSegmentTxns(2_027, true)).toBe(5)
    expect(childSegmentTxns(10_954)).toBe(8)
    expect(childInnerTxns(10_954)).toBe(7)
  })

  test('a factory upgrade and its child push share one group when they fit, the factory first', () => {
    expect(planGroups({ approvalSize: 2_865, withClear: true }, 10_954)).toEqual({
      groups: [{ app: true, child: true, txns: 2 + 5 + 8 }], atomic: true,
    })
    // 2 + 6 + 8 = 16 still fits; one more upload chunk does not.
    expect(planGroups({ approvalSize: 6_000, withClear: true }, 12_000).atomic).toBe(true)
    const split = planGroups({ approvalSize: 8_000, withClear: true }, 12_000)
    expect(split.atomic).toBe(false)
    expect(split.groups).toEqual([{ app: true, child: false, txns: 2 + 7 }, { app: false, child: true, txns: 2 + 8 }])
    expect(planGroups(undefined, 4_000)).toEqual({ groups: [{ app: false, child: true, txns: 2 + 4 }], atomic: true })
    // --split-children: the factory group first, then the child group.
    expect(planGroups({ approvalSize: 2_865, withClear: true }, 10_954, true)).toEqual({
      groups: [{ app: true, child: false, txns: 2 + 5 }, { app: false, child: true, txns: 2 + 8 }], atomic: false,
    })
    // The largest program the AVM allows (16,384 B) still uploads in one group (1 + 1 + 9 + 1 + 2 = 14).
    expect(planGroups({ approvalSize: 16_384, withClear: true }, undefined).groups[0].txns).toBe(14)
    expect(() => planGroups({ approvalSize: 30_000, withClear: true }, undefined)).toThrow('a group holds 16')
  })

  test('every Phase 2 target of this tree plans (each segment fits one group)', () => {
    for (const target of PHASE2_TARGETS) {
      const next = loadCompiled(target.artifact)
      expect(next.name).toBe(target.name)
      const child = target.child ? loadCompiled(target.child.artifact) : undefined
      if (child) expect(child.name).toBe(target.child!.name)
      const plan = planGroups({ approvalSize: next.approval.length, withClear: true }, child?.approval.length)
      expect(plan.groups.length).toBeGreaterThan(0)
      // K6 shrank RaffleFactory to 2 upload chunks. AUD-C6 took the Raffle child to 8,106 B, two bytes past
      // 4 chunks (4 x 2,026 = 8,104), so it uploads in 5: factory 5 + Raffle child 7 + wrap 2 = 14 txns, atomic
      // (rollout.e2e.spec.ts asserts the same number on LocalNet)
      if (target.name === 'RaffleFactory') expect(plan).toEqual({ groups: [{ app: true, child: true, txns: 14 }], atomic: true })
    }
    expect(PHASE2_TARGETS.map((t) => t.name)).toContain('RaffleFactory')
    expect(selectPhase2Targets(['akitasocial', 'walletFactory']).map((t) => t.name)).toEqual(['AkitaSocial', 'AbstractedAccountFactory'])
    // The DAO is selectable but never a default target.
    expect(selectPhase2Targets(['AkitaDAO'])).toEqual([PHASE2_DAO_TARGET])
    expect(selectPhase2Targets([]).some((t) => t.name === 'AkitaDAO')).toBe(false)
    const dao = loadCompiled(PHASE2_DAO_TARGET.artifact)
    expect(planAppUpdate(live(apps.dao), dao)).toMatchObject({ legacyPluginCanPush: false, sizeChange: true })
    expect(() => selectPhase2Targets(['Nope'])).toThrow('Unknown Phase 2 target')
  })
})

describe('Phase 2a refuses a DAO the plugin cannot bind on', () => {
  const stub = (programs: Record<string, Uint8Array>) => ({
    options: { network: 'localnet', version: 't' },
    algorand: { client: { algod: { getApplicationByID: (id: bigint) => ({ do: async () => ({ params: {
      approvalProgram: programs[id.toString()], clearStateProgram: new Uint8Array([11]), extraProgramPages: 0,
      globalStateSchema: { numUint: 0, numByteSlice: 0 }, creator: { toString: () => algosdk.ALGORAND_ZERO_ADDRESS_STRING },
    } }) }) } } },
    dao: { appId: 5n, client: { state: { global: { pluginAppList: async () => ({ update: 10n }) } } } },
  }) as unknown as ScriptContext

  test('neither isUpgradeLease nor mustGetExecution + getProposal: refused before any deploy or proposal', async () => {
    const ctx = stub({ '5': new Uint8Array(200), '10': bytes(apps.updatePlugin.approval!) })
    await expect(runPhase2a(ctx, { confirm: true, log: () => {} })).rejects.toThrow(/has neither isUpgradeLease.* nor mustGetExecution \+ getProposal/)
  })

  test('the deployed DAO passes the binding check (proposal read)', async () => {
    const ctx = stub({ '5': bytes(apps.dao.approval!), '10': bytes(apps.updatePlugin.approval!) })
    // It gets past the binding check and stops at the next chain read the stub does not provide.
    await expect(runPhase2a(ctx, { confirm: true, log: () => {} })).rejects.not.toThrow(/has neither/)
  })
})

describe('execution windows (voting DAO: the window opens at the end of the vote)', () => {
  test('before initialization the window starts now and lasts 2,000 rounds', () => {
    expect(planExecutionWindow({ currentRound: 1_000n, voting: false, voteDurationSeconds: 604_800n, roundSeconds: 2.8 }))
      .toEqual({ firstValid: 0n, windowRounds: 2_000, groups: 2, voteEndRound: undefined })
  })

  test('on a voting DAO the window covers the estimated vote end instead of expiring during the vote', () => {
    const w = planExecutionWindow({ currentRound: 1_000_000n, voting: true, voteDurationSeconds: 604_800n, roundSeconds: 2.7 })
    expect(w.voteEndRound).toBe(1_000_000n + 224_000n)
    expect(w.firstValid).toBe(w.voteEndRound! - 2_000n)
    expect(w.windowRounds).toBe(DEFAULT_VOTED_WINDOW_ROUNDS)
    expect(w.firstValid + BigInt(w.windowRounds)).toBeGreaterThan(w.voteEndRound!)
    expect(w.groups).toBe(10)
    // The old fixed 2,000-round window from the current round would have closed ~222,000 rounds early.
    expect(1_000_000n + 2_000n).toBeLessThan(w.voteEndRound!)
    // Overrides, and a window that closes before the vote ends is refused.
    expect(planExecutionWindow({ currentRound: 5n, voting: true, voteDurationSeconds: 100n, roundSeconds: 1, firstValid: 50n, windowRounds: 3_000 }))
      .toMatchObject({ firstValid: 50n, windowRounds: 3_000, groups: 3 })
    expect(() => planExecutionWindow({ currentRound: 5n, voting: true, voteDurationSeconds: 10_000n, roundSeconds: 1, firstValid: 6n, windowRounds: 1_000 })).toThrow('closes before the vote ends')
    expect(() => planExecutionWindow({ currentRound: 5n, voting: true, voteDurationSeconds: 1n, roundSeconds: 0 })).toThrow('positive')
  })

  test('windowSizeArg lands on the exact round count for grants in rounds and in seconds', () => {
    for (let rounds = 1; rounds <= 30_000; rounds += 7) {
      expect(Number(windowSizeArg(rounds, true))).toBe(rounds)
      expect(Math.ceil(Number(windowSizeArg(rounds, false)) / 2.7), String(rounds)).toBe(rounds)
    }
    for (const groups of [1, 2, 10, 25]) {
      const rounds = roundsForGroups(groups)
      expect(Math.ceil(rounds / EXECUTION_VALIDITY_PERIOD)).toBe(groups)
      expect(Math.ceil(Math.ceil(Number(windowSizeArg(rounds, false)) / 2.7) / EXECUTION_VALIDITY_PERIOD)).toBe(groups)
    }
  })

  test('getProposal return size matches the ABI encoding, and the default voted proposals fit one log', () => {
    const type = algosdk.ABIType.from('(uint8,byte[36],(uint64,uint64,uint64),address,uint64,uint64,uint64,(uint8,byte[])[])')
    const upgrade = algosdk.ABIType.from('(uint64,byte[32],byte[32][],uint64,uint64)')
    for (const groupCounts of [[1], [2, 2], [10], [10, 10], [3, 1, 4]]) {
      const actions = groupCounts.map((g) => [10, upgrade.encode([1n, new Uint8Array(32), Array.from({ length: g }, () => new Uint8Array(32)), 1n, 2n])])
      const encoded = type.encode([0, new Uint8Array(36), [0n, 0n, 0n], algosdk.ALGORAND_ZERO_ADDRESS_STRING, 0n, 0n, 0n, actions])
      expect(proposalReturnSize(groupCounts.map(upgradeActionDataLength)), groupCounts.join(',')).toBe(4 + encoded.length)
    }
    const groups = DEFAULT_VOTED_WINDOW_ROUNDS / EXECUTION_VALIDITY_PERIOD
    expect(proposalReturnSize([upgradeActionDataLength(groups)])).toBeLessThanOrEqual(MAX_LOG_SIZE)
    expect(proposalReturnSize([upgradeActionDataLength(groups), upgradeActionDataLength(groups)])).toBeLessThanOrEqual(MAX_LOG_SIZE)
    expect(proposalReturnSize([upgradeActionDataLength(30)])).toBeGreaterThan(MAX_LOG_SIZE)
  })
})

describe('ABI ride-along (spec §7.1 point 3)', () => {
  const removedFromSnapshot = (key: string, artifact: string) => {
    const before = loadKnownAbis()[apps[key].approvalSha256]
    expect(before, key).toBeDefined()
    const next = artifactSignatures(artifact)
    return before.signatures.filter((s) => !next.includes(s))
  }

  const K2_NEW_ACCOUNT = 'newAccount(pay,address,address,string,address,byte[32],string,uint64,uint64[],(uint64,address,string,bool,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,bool)[])uint64'
  const K6_NEW_RAFFLE = 'newRaffle(pay,axfer,uint64,uint64,uint64,uint64,uint64,uint64,address,string,byte[32][],uint64)uint64'
  const K6_NEW_PRIZE_BOX_RAFFLE = 'newPrizeBoxRaffle(appl,pay,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64'

  test('the snapshot covers every deployed Phase 2 program; the only removals are the accepted ones (K2 newAccount, K6 raffle creation)', () => {
    const removed = Object.fromEntries([...PHASE2_TARGETS, PHASE2_DAO_TARGET].map((t) => [t.name, removedFromSnapshot(t.appIdKey, t.artifact)]))
    expect(removed.AbstractedAccountFactory).toEqual([K2_NEW_ACCOUNT])
    expect([...removed.RaffleFactory].sort()).toEqual([K6_NEW_RAFFLE, K6_NEW_PRIZE_BOX_RAFFLE].sort())
    for (const [name, list] of Object.entries(removed)) if (!['AbstractedAccountFactory', 'RaffleFactory', 'HyperSwap'].includes(name)) expect(list, name).toEqual([])
    // ride-along targets: only HyperSwap's deployed accept goes (ROLLOUT-2)
    for (const t of PHASE2_RIDE_ALONG_TARGETS) {
      const before = loadKnownAbis()[deployedRideAlong(t.name).sha]
      expect(before, t.name).toBeDefined()
      removed[t.name] = before.signatures.filter((s) => !artifactSignatures(t.artifact).includes(s))
    }
    expect(removed.HyperSwap).toEqual([HYPERSWAP_OLD_ACCEPT])
    expect(removed.PollFactory).toEqual([])
    // every removal is in the checked-in decision list, and the list holds nothing else
    const all = Object.entries(removed).flatMap(([name, list]) => list.map((signature) => `${name} ${signature}`)).sort()
    expect(loadAcceptedAbiRemovals().map((a) => `${a.contract} ${a.signature}`).sort()).toEqual(all)
  })

  test('diffAbi reads the live program; unknown programs are flagged', () => {
    const social = diffAbi(bytes(apps.social.approval!), 'social/AkitaSocial.arc56.json')
    expect(social).toMatchObject({ known: true, removed: [] })
    expect(social.known && social.added).toContain('setMetaWallet(uint64)void')
    expect(diffAbi(loadCompiled('social/AkitaSocial.arc56.json').approval, 'social/AkitaSocial.arc56.json')).toEqual({ known: true, source: 'artifact', removed: [], added: [] })
    expect(diffAbi(new Uint8Array([1, 2, 3]), 'social/AkitaSocial.arc56.json')).toEqual({ known: false })
  })

  test('Phase 2 refuses an unacknowledged removal or an unknown live ABI', () => {
    const plan = (name: string, abi: TargetPlan['abi']) => ({ target: { name }, live: { approval: new Uint8Array([9]) }, abi }) as unknown as TargetPlan
    const sig = 'newAccount(pay)uint64'
    const plans = [plan('AbstractedAccountFactory', { known: true, source: 'x', removed: [sig], added: [] }), plan('AkitaSocial', undefined)]
    expect(() => assertAbiAcknowledged(plans, {})).toThrow(`removes ${sig}`)
    expect(() => assertAbiAcknowledged(plans, {})).toThrow(`--accept-removed 'AbstractedAccountFactory:${sig}'`)
    expect(assertAbiAcknowledged(plans, { removed: [`AbstractedAccountFactory:${sig}`] })).toEqual({
      accepted: [], waived: [{ target: 'AbstractedAccountFactory', signature: sig, by: 'signature' }], waiveAll: false, unusedWaivers: [],
    })
    expect(assertAbiAcknowledged(plans, { removed: 'all' })).toEqual({
      accepted: [], waived: [{ target: 'AbstractedAccountFactory', signature: sig, by: 'all' }], waiveAll: true, unusedWaivers: [],
    })
    expect(() => assertAbiAcknowledged([plan('X', { known: false })], { removed: 'all' })).toThrow('--accept-unknown-abi')
    expect(() => assertAbiAcknowledged([plan('X', { known: false })], { unknownAbi: true })).not.toThrow()
  })

  /** A Phase 2 plan of `target` whose live program is the DEPLOYED MainNet program (compat snapshot bytes). */
  const deployedPlan = (name: string): TargetPlan => {
    const target = PHASE2_TARGETS.find((t) => t.name === name)!
    const approval = approvalBytes(name)
    expect(programHash(approval)).toBe(apps[target.appIdKey].approvalSha256)
    return { target, live: { approval }, abi: diffAbi(approval, target.artifact) } as unknown as TargetPlan
  }

  test('accepted removals (K2, K6) pass without --accept-removed, each reported with its decision and date', () => {
    const plans = [deployedPlan('AbstractedAccountFactory'), deployedPlan('RaffleFactory')]
    const ack = assertAbiAcknowledged(plans, {})
    expect(ack.waived).toEqual([])
    expect(ack.accepted.map((a) => `${a.decision} ${a.date} ${a.target} ${a.signature}`).sort()).toEqual([
      `K2 2026-10-04 AbstractedAccountFactory ${K2_NEW_ACCOUNT}`,
      `K6 2026-10-04 RaffleFactory ${K6_NEW_PRIZE_BOX_RAFFLE}`,
      `K6 2026-10-04 RaffleFactory ${K6_NEW_RAFFLE}`,
    ].sort())
    // `all` waives nothing here: the accepted removals stay accepted, not waived, and the run still warns
    const all = assertAbiAcknowledged(plans, { removed: 'all' })
    expect(all).toEqual({ ...ack, waiveAll: true })
    expect(describeAbiAcknowledgment(all)[0]).toBe('WARNING: --accept-removed all waived 0 unlisted removal(s) (nothing to waive: drop the flag)')
    expect(describeAbiAcknowledgment(ack).some((l) => l.startsWith('WARNING'))).toBe(false)
    expect(describeAbiAcknowledgment(ack).filter((l) => l.includes('ACCEPTED removal (Kyle decision K6, 2026-10-04) RaffleFactory'))).toHaveLength(2)
  })

  test('an unlisted removal is refused even next to accepted ones; --accept-removed waives it and every waiver is printed', () => {
    const raffle = deployedPlan('RaffleFactory')
    const extra = 'newRaffleCost(bool,uint64,uint64,uint64)uint64'
    const abi = raffle.abi as Extract<TargetPlan['abi'], { known: true }>
    const plans = [{ ...raffle, abi: { ...abi, removed: [...abi.removed, extra] } }] as TargetPlan[]
    expect(() => assertAbiAcknowledged(plans, {})).toThrow(`RaffleFactory: removes ${extra} (not an accepted decision`)
    expect(() => assertAbiAcknowledged(plans, { removed: [`RaffleFactory:${K6_NEW_RAFFLE}`] })).toThrow(`removes ${extra}`)
    const all = assertAbiAcknowledged(plans, { removed: 'all' })
    expect(all.accepted).toHaveLength(2)
    expect(all.waived).toEqual([{ target: 'RaffleFactory', signature: extra, by: 'all' }])
    expect(describeAbiAcknowledgment(all)[0]).toBe('WARNING: --accept-removed all waived 1 unlisted removal(s)')
    expect(describeAbiAcknowledgment(all)).toContain(`  WAIVED removal (--accept-removed all) RaffleFactory: ${extra}`)
    expect(assertAbiAcknowledged(plans, { removed: [`RaffleFactory:${extra}`] }).waived).toEqual([{ target: 'RaffleFactory', signature: extra, by: 'signature' }])
  })

  test('a one-off waiver names its target: a bare signature is refused, and a waiver for another target waives nothing', () => {
    const raffle = deployedPlan('RaffleFactory')
    const extra = 'newRaffleCost(bool,uint64,uint64,uint64)uint64'
    const abi = raffle.abi as Extract<TargetPlan['abi'], { known: true }>
    const plans = [{ ...raffle, abi: { ...abi, removed: [...abi.removed, extra] } }] as TargetPlan[]
    expect(() => assertAbiAcknowledged(plans, { removed: [extra] })).toThrow('name the target, as <Target>:<signature>')
    expect(() => parseRemovalWaivers([`:${extra}`])).toThrow('name the target')
    expect(() => parseRemovalWaivers(['RaffleFactory:'])).toThrow('name the target')
    expect(parseRemovalWaivers([`RaffleFactory:${extra}`])).toEqual([`RaffleFactory:${extra}`])
    // the same signature waived for AuctionFactory does not reach RaffleFactory
    expect(() => assertAbiAcknowledged(plans, { removed: [`AuctionFactory:${extra}`] })).toThrow(`RaffleFactory: removes ${extra}`)
    // a waiver that matches nothing is reported, so a stale override in a reused command line is visible
    const ack = assertAbiAcknowledged(plans, { removed: [`RaffleFactory:${extra}`, `AuctionFactory:${extra}`] })
    expect(ack.unusedWaivers).toEqual([`AuctionFactory:${extra}`])
    expect(describeAbiAcknowledgment(ack)).toContain(`WARNING: --accept-removed AuctionFactory:${extra} matched no removal of this run`)
  })

  test('--accept-removed all with --confirm needs --i-know (refused before any network call)', async () => {
    const ctx = { options: { network: 'localnet', version: 'x', dryRun: false } } as unknown as ScriptContext
    await expect(runPhase2(ctx, { targets: [], confirm: true, acceptRemoved: 'all', log: () => {} }))
      .rejects.toThrow('--accept-removed all with --confirm also needs --i-know')
  })

  test('an accepted entry is bound to its target and deployed program: the same signature elsewhere is refused', () => {
    const raffleSha = apps.raffleFactory.approvalSha256
    expect(acceptedRemoval('RaffleFactory', raffleSha, K6_NEW_RAFFLE)?.decision).toBe('K6')
    expect(acceptedRemoval('AuctionFactory', raffleSha, K6_NEW_RAFFLE)).toBeUndefined()
    expect(acceptedRemoval('RaffleFactory', apps.auctionFactory.approvalSha256, K6_NEW_RAFFLE)).toBeUndefined()
    const other = { target: { name: 'RaffleFactory' }, live: { approval: new Uint8Array([9]) }, abi: { known: true, source: 'x', removed: [K6_NEW_RAFFLE], added: [] } } as unknown as TargetPlan
    expect(() => assertAbiAcknowledged([other], {})).toThrow(`removes ${K6_NEW_RAFFLE}`)
  })

  test('every accepted removal names a real method of the deployed snapshot program it cites (a typo cannot accept nothing)', () => {
    const accepted = loadAcceptedAbiRemovals()
    expect(accepted.map((a) => a.decision).sort()).toEqual(['K2', 'K6', 'K6', 'ROLLOUT-2'])
    expect(invalidAcceptedRemovals(accepted)).toEqual([])
    for (const a of accepted) {
      const known = loadKnownAbis()[a.programSha256]
      expect(known?.contract, a.signature).toBe(a.contract)
      expect(known?.signatures, a.signature).toContain(a.signature)
    }
    // the check catches a typo, a wrong program and a wrong target
    const k6 = accepted.find((a) => a.decision === 'K6')!
    expect(invalidAcceptedRemovals([{ ...k6, signature: k6.signature.replace(',address,', ',account,') }])).toHaveLength(1)
    expect(invalidAcceptedRemovals([{ ...k6, programSha256: apps.auctionFactory.approvalSha256 }])).toHaveLength(1)
    expect(invalidAcceptedRemovals([{ ...k6, contract: 'Raffle' }]).length).toBeGreaterThan(0)
  })
})

describe('Phase 3 guard: Phase 2 must have landed', () => {
  const treeLive = () => Object.fromEntries(PHASE3_PLUGINS.flatMap((p) => p.dependencies).map((d) => [d.name, { appId: 1n, program: loadCompiled(d.artifact).approval }]))

  test('every declared dependency is really called by its plugin', () => {
    for (const plugin of PHASE3_PLUGINS) {
      const program = loadCompiled(plugin.artifact).approval
      for (const dependency of plugin.dependencies) expect(calledSignatures(program, dependency.artifact).length, `${plugin.catalog} -> ${dependency.name}`).toBeGreaterThan(0)
    }
  })

  test('no gaps once every dependency runs this tree\'s code', () => {
    expect(phase3Gaps(PHASE3_PLUGINS, treeLive())).toEqual([])
  })

  test('the deployed AkitaSocial / Subscriptions programs lack the hinted methods the new plugins call', () => {
    const live = { ...treeLive(), AkitaSocial: { appId: 3569557130n, program: bytes(apps.social.approval!) }, Subscriptions: { appId: 3569556497n, program: bytes(apps.subscriptions.approval!) } }
    const gaps = phase3Gaps(PHASE3_PLUGINS, live)
    expect(gaps.map((g) => `${g.plugin}->${g.dependency}`)).toEqual(['AkitaSocialPlugin->AkitaSocial', 'SubscriptionsPlugin->Subscriptions'])
    expect(gaps[0].missing).toContain('setMetaWallet(uint64)void')
    const missingGate = phase3Gaps(PHASE3_PLUGINS.filter((p) => p.catalog === 'StakingPoolPlugin'), { ...treeLive(), 'Gate (DAO akitaAppList.gate)': {} })
    expect(missingGate).toEqual([{ plugin: 'StakingPoolPlugin', dependency: 'Gate (DAO akitaAppList.gate)', appId: undefined, missing: 'not deployed' }])
  })
})

describe('grant replacement', () => {
  test('parses --replace and --add-method', () => {
    expect(parseReplacement('socialPlugin:42')).toEqual({ key: 'socialPlugin', to: 42n })
    expect(parseReplacement('updatePlugin:7:8')).toEqual({ key: 'updatePlugin', from: 7n, to: 8n })
    expect(() => parseReplacement('updatePlugin:7:7')).toThrow('same app')
    expect(() => parseReplacement('socialPlugin:0')).toThrow('positive')
    expect(() => parseReplacement('socialPlugin')).toThrow('expected')
    expect(parseAddMethod('socialPlugin:setMetaWallet,post')).toEqual({ key: 'socialPlugin', methods: ['setMetaWallet', 'post'] })
    expect(() => parseAddMethod('socialPlugin:')).toThrow('expected')
  })

  test('explicit replacements take precedence over the SDK registry', () => {
    // LocalNet: no registry, the installed app is named.
    const local = resolveGrantUpdate('localnet', 7n, [{ key: 'updatePlugin', from: 7n, to: 8n }])
    expect(local?.current).toMatchObject({ key: 'updatePlugin', appId: 7n, isLatest: false })
    expect(local?.latest).toMatchObject({ key: 'updatePlugin', appId: 8n, isLatest: true })
    expect(resolveGrantUpdate('localnet', 9n, [{ key: 'updatePlugin', from: 7n, to: 8n }])).toBeUndefined()
    // MainNet key:to: every registered version of the key moves to the new id.
    const social = resolveGrantUpdate('mainnet', 3643581007n, [{ key: 'socialPlugin', to: 999n }])
    expect(social?.current.appId).toBe(3643581007n)
    expect(social?.latest.appId).toBe(999n)
    expect(resolveGrantUpdate('mainnet', 3569562087n, [{ key: 'socialPlugin', to: 999n }])?.latest.appId).toBe(999n)
    // Without a replacement the registry's latest applies; the latest itself is current.
    expect(resolveGrantUpdate('mainnet', 3569562087n)?.latest.appId).toBe(3643581007n)
    expect(resolveGrantUpdate('mainnet', 3643581007n)).toBeUndefined()
    // A key:from:to that contradicts the registry is refused; unknown keys are refused.
    expect(() => resolveGrantUpdate('mainnet', 3643581007n, [{ key: 'updatePlugin', from: 3643581007n, to: 5n }])).toThrow('lists')
    expect(() => resolveGrantUpdate('mainnet', 1n, [{ key: 'nope', to: 5n }])).toThrow('unknown plugin key')
  })

  test('a replacement\'s actions stay in one proposal (pal repoint + add + remove)', () => {
    const m = (n: number) => ({ actions: Array.from({ length: n }) })
    expect(splitMigrations([m(3), m(2), m(2)], 5).map((b) => b.length)).toEqual([2, 1])
    expect(() => splitMigrations([m(3)], 2)).toThrow('needs 3 actions')
    expect(splitMigrations([], 1)).toEqual([])
  })
})

describe('createMigrationPlan (stubbed chain state)', () => {
  const ZERO = algosdk.ALGORAND_ZERO_ADDRESS_STRING
  const settings = { fee: 1n, power: 2n, duration: 3n, participation: 4n, approval: 5n }
  const grant = (over: Record<string, unknown> = {}) => ({
    start: 1n, escrow: 0n, delegationType: 0, lastValid: 2n ** 64n - 1n, cooldown: 0n, methods: [] as [Uint8Array, bigint][],
    admin: false, useRounds: false, useExecutionKey: true, coverFees: false, canReclaim: false, ...over,
  })
  // The plan reads the DAO's program to learn the unit of `power`: the deployed DAO compares whole tokens, the tree's base units.
  const deployedDao = bytes(apps.dao.approval!)
  const stubCtx = (entries: Array<[{ plugin: bigint; caller: string; escrow: string }, ReturnType<typeof grant>]>, palUpdate: bigint, named: Array<[string, { plugin: bigint; caller: string; escrow: string }]> = [], daoProgram: Uint8Array = deployedDao) => {
    const algorand = AlgorandClient.defaultLocalNet()
    const algod = algorand.client.algod
    const readApp = algod.getApplicationByID.bind(algod)
    algod.getApplicationByID = ((id: number | bigint) => (BigInt(id) === 5n ? { do: async () => ({ params: { approvalProgram: daoProgram } }) } : readApp(id))) as never
    const wallet = {
      appId: 77n,
      client: { appAddress: algosdk.getApplicationAddress(77n), state: { box: { plugins: { getMap: async () => new Map(entries) } } } },
      getNamedPlugins: async () => new Map(named),
      getEscrows: async () => new Map(),
      getMbr: async () => ({ plugins: 1_000n }),
    }
    return {
      options: { network: 'localnet', version: 't' },
      algorand,
      signer: async () => [],
      dao: {
        appId: 5n,
        getWallet: async () => wallet,
        client: { state: { global: { pluginAppList: async () => ({ optin: 0n, revenueManager: 0n, update: palUpdate }) }, box: { plugins: { value: async () => settings } } } },
      },
    } as unknown as ScriptContext
  }

  test('the Update role holder moves with its grant: [pal.update, AddPlugin, RemovePlugin] in one migration', async () => {
    const ctx = stubCtx([[{ plugin: 10n, caller: ZERO, escrow: '' }, grant()]], 10n)
    const { migrations } = await createMigrationPlan(ctx, { effectiveSender: ZERO, replacements: [{ key: 'updatePlugin', from: 10n, to: 20n }] })
    expect(migrations).toHaveLength(1)
    const [m] = migrations
    expect(m).toMatchObject({ repointsUpdate: true, removeOnly: false })
    expect(m.actions.map((a) => a.type)).toEqual([ProposalActionEnum.UpdateFields, ProposalActionEnum.AddPlugin, ProposalActionEnum.RemovePlugin])
    expect(m.actions[0]).toMatchObject({ field: 'pal', value: { update: 20n } })
    expect(m.actions[1]).toMatchObject({ useExecutionKey: true, ...settings, escrow: '', callerType: CallerType.Global })
    expect((m.actions[1] as { client: { appId: bigint } }).client.appId).toBe(20n)
    expect(m.actions[2]).toMatchObject({ plugin: 10n, caller: ZERO, escrow: '' })
  })

  test('the copied threshold keeps its unit on the deployed DAO and is rescaled to base units on the upgraded one', async () => {
    const plan = async (daoProgram?: Uint8Array) => {
      const ctx = stubCtx([[{ plugin: 10n, caller: ZERO, escrow: '' }, grant()]], 10n, [], daoProgram)
      const { migrations } = await createMigrationPlan(ctx, { effectiveSender: ZERO, replacements: [{ key: 'updatePlugin', from: 10n, to: 20n }] })
      return migrations[0].actions[1]
    }
    expect(await plan()).toMatchObject(settings)
    expect(await plan(loadCompiled('arc58/dao/AkitaDAO.arc56.json').approval)).toMatchObject({ ...settings, power: 2_000_000n })
  })

  test('a stale Update grant without the role is removed, never replaced', async () => {
    const ctx = stubCtx([[{ plugin: 9n, caller: ZERO, escrow: '' }, grant()], [{ plugin: 10n, caller: ZERO, escrow: '' }, grant()]], 10n)
    const { migrations } = await createMigrationPlan(ctx, {
      effectiveSender: ZERO,
      replacements: [{ key: 'updatePlugin', from: 9n, to: 20n }, { key: 'updatePlugin', from: 10n, to: 20n }],
    })
    const stale = migrations.find((m) => m.key.plugin === 9n)!
    expect(stale).toMatchObject({ removeOnly: true, repointsUpdate: false })
    expect(stale.actions).toEqual([{ type: ProposalActionEnum.RemovePlugin, plugin: 9n, caller: ZERO, escrow: '' }])
    expect(migrations.find((m) => m.key.plugin === 10n)!.repointsUpdate).toBe(true)
  })

  test('named grants are refused unless unnamed; privileged grants are refused', async () => {
    const key = { plugin: 30n, caller: ZERO, escrow: '' }
    const named = stubCtx([[key, grant({ useExecutionKey: false })]], 1n, [['social', key]])
    const replacements = [{ key: 'socialPlugin', from: 30n, to: 31n }]
    await expect(createMigrationPlan(named, { effectiveSender: ZERO, replacements })).rejects.toThrow('--unname-aliases')
    const { migrations } = await createMigrationPlan(named, { effectiveSender: ZERO, replacements, unnameAliases: true })
    expect(migrations[0].actions.map((a) => a.type)).toEqual([ProposalActionEnum.AddPlugin, ProposalActionEnum.RemoveNamedPlugin])
    expect(migrations[0].aliases).toEqual(['social'])
    const admin = stubCtx([[key, grant({ admin: true })]], 1n)
    await expect(createMigrationPlan(admin, { effectiveSender: ZERO, replacements })).rejects.toThrow('privileged')
  })

  test('new methods are added to method-restricted grants only', async () => {
    const algorand = AlgorandClient.defaultLocalNet()
    const { SocialPluginSDK } = await import('akita-sdk/wallet')
    const social = new SocialPluginSDK({ algorand, factoryParams: { appId: 31n, defaultSender: ZERO } })
    const sel = (method: () => unknown) => ((method() as () => { selectors: Uint8Array[] })()).selectors[0]
    const post = sel(() => social.post())
    const vote = sel(() => social.vote())
    const restricted = stubCtx([[{ plugin: 30n, caller: ZERO, escrow: '' }, grant({ useExecutionKey: false, methods: [[post, 5n]] })]], 1n)
    const replacements = [{ key: 'socialPlugin', from: 30n, to: 31n }]
    const plan = await createMigrationPlan(restricted, { effectiveSender: ZERO, replacements, addMethods: { socialPlugin: ['vote'] } })
    expect(plan.migrations[0].methods.map((m) => [Buffer.from(m.name[0]).toString('hex'), m.cooldown]))
      .toEqual([[Buffer.from(post).toString('hex'), 5n], [Buffer.from(vote).toString('hex'), 0n]])
    const open = stubCtx([[{ plugin: 30n, caller: ZERO, escrow: '' }, grant({ useExecutionKey: false })]], 1n)
    const unrestricted = await createMigrationPlan(open, { effectiveSender: ZERO, replacements, addMethods: { socialPlugin: ['vote'] } })
    expect(unrestricted.migrations[0].methods).toEqual([])
    await expect(createMigrationPlan(restricted, { effectiveSender: ZERO, replacements, addMethods: { socialPlugin: ['noSuchMethod'] } }))
      .rejects.toThrow('rebuild the SDK clients')
  })

  test('a marketplace grant restricted to the deployed purchase selector moves to the maxPrice selector (spec §7.3)', async () => {
    const algorand = AlgorandClient.defaultLocalNet()
    const { MarketplacePluginSDK } = await import('akita-sdk/wallet')
    const latest = new MarketplacePluginSDK({ algorand, factoryParams: { appId: 41n, defaultSender: ZERO } })
    const latestPurchase = ((latest.purchase() as unknown as () => { selectors: Uint8Array[] })()).selectors[0]
    expect(Buffer.from(latestPurchase).toString('hex')).toBe('703f18ca')
    const deployedPurchase = Uint8Array.from(Buffer.from('269e4bb0', 'hex'))
    const restricted = stubCtx([[{ plugin: 40n, caller: ZERO, escrow: '' }, grant({ useExecutionKey: false, methods: [[deployedPurchase, 7n]] })]], 1n)
    const plan = await createMigrationPlan(restricted, { effectiveSender: ZERO, replacements: [{ key: 'marketplacePlugin', from: 40n, to: 41n }] })
    expect(plan.migrations[0].methods.map((m) => [Buffer.from(m.name[0]).toString('hex'), m.cooldown])).toEqual([['703f18ca', 7n]])
  })
})

describe('resume: restampExecution', () => {
  test('re-stamps lease, validity and group id, and rejects a mismatching group', () => {
    const params = { fee: 1000n, firstValid: 1n, lastValid: 100n, genesisHash: new Uint8Array(32), genesisID: 'x', minFee: 1000n } as unknown as algosdk.SuggestedParams
    const sender = algosdk.generateAccount().addr
    const build = () => [0, 1].map((i) => algosdk.makePaymentTxnWithSuggestedParamsFromObject({ sender, receiver: sender, amount: i, suggestedParams: params }))
    const lease = new Uint8Array(32).fill(7)
    const expected = build()
    expected.forEach((t, i) => { const m = t as unknown as { firstValid: bigint; lastValid: bigint; lease?: Uint8Array }; m.firstValid = 500n; m.lastValid = 1_499n; if (i === 0) m.lease = lease })
    const group = algosdk.computeGroupID(expected)
    const execution = { lease: new Uint8Array(32), firstValid: 1n, lastValid: 100n, useRounds: true, ids: [], windows: [{ transactions: build(), signers: [], groupId: '', methodCalls: new Map() }] } as never
    restampExecution(execution, { executionKey: lease, groups: [group], firstValid: 500n, lastValid: 1_500n })
    expect(Buffer.from((execution as { ids: Uint8Array[] }).ids[0])).toEqual(Buffer.from(group))
    const other = { lease: new Uint8Array(32), firstValid: 1n, lastValid: 100n, useRounds: true, ids: [], windows: [{ transactions: build(), signers: [], groupId: '', methodCalls: new Map() }] } as never
    expect(() => restampExecution(other, { executionKey: lease, groups: [new Uint8Array(32)], firstValid: 500n, lastValid: 1_500n })).toThrow('does not match')
    expect(() => restampExecution(other, { executionKey: lease, groups: [], firstValid: 500n, lastValid: 1_500n })).toThrow('expects 0')
  })
})

describe('resume: rebuildRecordedExecution (box read headroom of a rebuilt group)', () => {
  // A fake build: the group id depends only on how many box references the group ends up with, which is
  // what the simulation asks for plus the headroom. `fresh` is the headroom of a first build.
  const fake = (fresh: number, simulated: number) => {
    const built: (number | undefined)[] = []
    const build = async (headroomRefs?: number) => {
      built.push(headroomRefs)
      const refs = headroomRefs ?? fresh
      return { boxReadHeadroomRefs: refs, total: simulated + refs }
    }
    const restamp = (recorded: number) => (execution: { total: number }) => {
      if (execution.total !== recorded) throw new Error('rebuilt group 1 does not match the proposal\'s group id')
    }
    return { build, built, restamp }
  }

  test('groupsForRounds inverts roundsForGroups', () => {
    for (const groups of [1, 2, 7, 30]) expect(groupsForRounds(roundsForGroups(groups))).toBe(groups)
    expect(groupsForRounds(2_000)).toBe(2)
    expect(groupsForRounds(1)).toBe(1)
  })

  test('a rebuild that matches at once builds once', async () => {
    const { build, built, restamp } = fake(1, 10)
    expect(await rebuildRecordedExecution(build, restamp(11))).toMatchObject({ boxReadHeadroomRefs: 1 })
    expect(built).toEqual([undefined])
  })

  test('the proposal\'s boxes now exist and the simulation asks for one more reference: one fewer of headroom', async () => {
    // first build: 10 simulated + 1 headroom = 11 recorded. Rebuilt: the simulation itself asks for 11.
    const { build, built, restamp } = fake(1, 11)
    expect(await rebuildRecordedExecution(build, restamp(11))).toMatchObject({ boxReadHeadroomRefs: 0 })
    expect(built).toEqual([undefined, 0])
  })

  test('a smaller staged program since the first build: more headroom reproduces the group', async () => {
    const { build, built, restamp } = fake(1, 8)
    expect(await rebuildRecordedExecution(build, restamp(11))).toMatchObject({ boxReadHeadroomRefs: 3 })
    expect(built).toEqual([undefined, 0, 2, 3])
  })

  test('no count matches: the first mismatch is reported; another error is not retried', async () => {
    const { build, built, restamp } = fake(1, 30)
    await expect(rebuildRecordedExecution(build, restamp(11))).rejects.toThrow('does not match')
    expect(built).toHaveLength(1 + 1 + 8)
    const other = fake(1, 10)
    await expect(rebuildRecordedExecution(other.build, () => { throw new Error('proposal expects 2 group(s)') })).rejects.toThrow('expects 2')
    expect(other.built).toEqual([undefined])
  })
})

describe('immutable catalog: new plugin versions', () => {
  test('UpdateAkitaDAOPlugin and every Phase 3 plugin resolve their constructor from the context', async () => {
    const ctx = await setupContext({ network: 'localnet', version: 'principal', daoAppId: 11n, dryRun: true })
    const update = prepareImmutable(ctx, 'UpdateAkitaDAOPlugin')
    expect(update.args).toEqual(['principal', 11n, [11, 129, 1, 67]])
    expect(Buffer.from(update.args[2] as unknown as number[])).toEqual(Buffer.from(loadCompiled('social/AkitaSocial.arc56.json').clear))
    expect(immutableCatalog.UpdateAkitaDAOPlugin).toMatchObject({ registryKey: 'updatePlugin', plugin: true, daoField: null })
    for (const plugin of [...PHASE3_PLUGINS, ...LOCKSTEP_PLUGINS]) {
      const entry = immutableCatalog[plugin.catalog]
      expect(entry, plugin.catalog).toBeDefined()
      expect(entry.registryKey).toBe(plugin.registryKey)
      expect(entry.plugin).toBe(true)
      const prepared = prepareImmutable(ctx, plugin.catalog, plugin.factoryKey ? { factory: '5' } : {})
      expect(prepared.entry.artifact).toBe(entry.artifact)
      if (plugin.factoryKey) expect(prepared.args).toContain(5n)
      expect(prepared.args.includes(11n) || plugin.catalog === 'RafflePlugin' || plugin.catalog === 'WelcomePlugin').toBe(true)
    }
  })
})

/**
 * Production review 2026-10-05, rollout lane: ACCT-3 / ROLLOUT-3 (a factory and a child it cannot create),
 * ROLLOUT-1 (StakingPool child before Staking / Rewards v2), ROLLOUT-2 (HyperSwap accept), MISC-6 (PollPlugin).
 */
describe('review 2026-10-05: rollout guards', () => {
  const CLEAR_V11 = new Uint8Array([11, 129, 1, 67])
  /** A chain stub for planTarget / runPhase2: app programs by id, factory `bc` boxes by id, the DAO's akitaAppList. */
  const chain = (programs: Record<string, Uint8Array>, opts: { appIds: Record<string, bigint>; bc?: Record<string, Uint8Array>; aal?: Record<string, bigint> }) => ({
    options: { network: 'localnet', version: 't', dryRun: false },
    appIds: opts.appIds,
    sender: 'SENDER',
    algorand: {
      client: { algod: { getApplicationByID: (id: bigint) => ({ do: async () => {
        const approval = programs[id.toString()]
        if (!approval) throw new Error(`no app ${id}`)
        return { params: { approvalProgram: approval, clearStateProgram: CLEAR_V11, extraProgramPages: 3,
          globalStateSchema: { numUint: 8, numByteSlice: 56 }, creator: { toString: () => algosdk.ALGORAND_ZERO_ADDRESS_STRING } } }
      } }) } },
      app: { getBoxValue: async (id: bigint) => {
        const value = opts.bc?.[id.toString()]
        if (!value) throw new Error('no box')
        return value
      } },
    },
    dao: { appId: 5n, client: { state: { global: { akitaAppList: async () => opts.aal ?? {} } } } },
  }) as unknown as ScriptContext
  const target = (name: string) => [...PHASE2_TARGETS, ...PHASE2_RIDE_ALONG_TARGETS].find((t) => t.name === name)!
  const childOf = (artifact: string) => {
    const spec = JSON.parse(require('node:fs').readFileSync(path.resolve(__dirname, '../../../artifacts', artifact), 'utf8'))
    return { ...loadCompiled(artifact), createSignatures: createSignatures(spec) }
  }

  describe('ACCT-3 / ROLLOUT-3: the wallet factory never runs with a wallet child it cannot create', () => {
    const wallet = () => childOf('arc58/account/AbstractedAccount.arc56.json')

    test('the deployed (AVM 11) wallet factory cannot create the tree (AVM 13) wallet; every tree factory creates its tree child', () => {
      const problems = childPushProblems(approvalBytes('AbstractedAccountFactory'), wallet())
      expect(problems.some((p) => p.includes("create create(") && p.includes(',bool)void'))).toBe(true)
      expect(problems.some((p) => p.includes('AVM 13 clear program'))).toBe(true)
      for (const t of PHASE2_TARGETS.filter((t) => t.child)) {
        expect(childPushProblems(loadCompiled(t.artifact).approval, childOf(t.child!.artifact)), t.name).toEqual([])
      }
    })

    test('a child-only push into the deployed wallet factory is refused before any proposal (update-wallet-factory.ts default)', async () => {
      const ctx = chain({ '7': approvalBytes('AbstractedAccountFactory') }, { appIds: { walletFactory: 7n }, bc: { '7': approvalBytes('AbstractedAccount') } })
      const plan = await planTarget(ctx, target('AbstractedAccountFactory'), { childOnly: true })
      expect(plan.groups?.groups).toEqual([{ app: false, child: true, txns: expect.any(Number) }])
      expect(plan.blockers.join('\n')).toMatch(/child AbstractedAccount: the factory does not carry the child's AVM 13 clear program.*\(upgrade the factory with its child\)/)
      await expect(runPhase2(ctx, { targets: [target('AbstractedAccountFactory')], childOnly: true, confirm: true, log: () => {} }))
        .rejects.toThrow(/^Phase 2 refused:[\s\S]*AbstractedAccountFactory: child AbstractedAccount/)
    })

    test('the factory upgrade carries the wallet child in one group; splitting them is refused', async () => {
      const rewardsV2 = loadCompiled('rewards/Rewards.arc56.json').approval
      const ctx = chain({ '7': approvalBytes('AbstractedAccountFactory'), '31': rewardsV2 }, { appIds: { walletFactory: 7n }, bc: { '7': approvalBytes('AbstractedAccount') }, aal: { rewards: 31n } })
      const plan = await planTarget(ctx, target('AbstractedAccountFactory'))
      expect(plan.blockers).toEqual([])
      expect(plan.groups).toMatchObject({ atomic: true, groups: [{ app: true, child: true }] })
      const split = await planTarget(ctx, target('AbstractedAccountFactory'), { splitChild: true })
      expect(split.blockers).toEqual(['AbstractedAccountFactory: the factory and its AbstractedAccount child must land in one group (ACCT-3); do not split them'])
      // other factories may still split (their creations only revert between the two groups)
      const raffle = await planTarget(chain({ '8': approvalBytes('RaffleFactory'), '30': loadCompiled('gates/Gate.arc56.json').approval, '31': rewardsV2 },
        { appIds: { raffleFactory: 8n }, bc: { '8': approvalBytes('Raffle') }, aal: { gate: 30n, rewards: 31n } }), target('RaffleFactory'), { splitChild: true })
      expect(raffle.blockers).toEqual([])
    })

    /** Enough of a context for runUpdate to reach its target checks (dry run: nothing is sent). */
    const updateCtx = (appIds: Record<string, bigint>, live?: Uint8Array) => ({
      sender: 'SENDER', signer: async () => [], options: { version: '9.9.9', dryRun: true }, appIds,
      algorand: { client: { algod: { getApplicationByID: () => ({ do: async () => ({ params: { approvalProgram: live } }) }) } } },
    }) as unknown as ScriptContext

    test('runUpdate refuses every app the Phase 2 runner upgrades, by key or by id', async () => {
      const compile = () => ({ appFactory: { compile: async () => ({ approvalProgram: new Uint8Array(10) }) } })
      for (const [appIdKey, name] of [['walletFactory', 'AbstractedAccountFactory'], ['dao', 'AkitaDAO'], ['hyperSwap', 'HyperSwap'], ['pollFactory', 'PollFactory'], ['stakingPoolFactory', 'StakingPoolFactory']]) {
        await expect(runUpdate(updateCtx({ [appIdKey]: 40n }), [{ name: 'X', leasePrefix: 'x', appIdKey, createFactory: compile }]))
          .rejects.toThrow(`is the Phase 2 target ${name}; upgrade it with scripts/principal-phase2-upgrade-targets.ts --target ${name}`)
      }
      await expect(runUpdate(updateCtx({ hyperSwap: 40n }), [{ name: 'X', leasePrefix: 'x', appIdKey: '', appId: 40n, createFactory: compile }]))
        .rejects.toThrow('Phase 2 target HyperSwap')
      // a live child instance (update-children.ts) is not a Phase 2 target
      await expect(runUpdate(updateCtx({ hyperSwap: 40n }), [{ name: 'X', leasePrefix: 'x', appIdKey: '', appId: 41n, createFactory: compile }]))
        .resolves.toEqual([{ name: 'X', appId: 41n }])
    })

    test('runUpdate refuses to stage a child into a factory that cannot create it', async () => {
      const tree = wallet()
      const spec = JSON.parse(require('node:fs').readFileSync(path.resolve(__dirname, '../../../artifacts/arc58/account/AbstractedAccount.arc56.json'), 'utf8'))
      const target = (factoryProgram?: Uint8Array) => ({
        name: 'SomeFactory', leasePrefix: 'x', appIdKey: '', appId: 77n, skipAppUpdate: factoryProgram === undefined,
        createFactory: () => ({ appFactory: { compile: async () => ({ approvalProgram: factoryProgram }) } }),
        childFactory: () => ({ appFactory: { appSpec: spec, compile: async () => ({ approvalProgram: tree.approval, clearStateProgram: tree.clear }) } }),
      })
      await expect(runUpdate(updateCtx({}, approvalBytes('AbstractedAccountFactory')), [target()]))
        .rejects.toThrow(/SomeFactory: refusing to stage the child into the live \(app 77\) factory:[\s\S]*AVM 13 clear program/)
      await expect(runUpdate(updateCtx({}), [target(loadCompiled('arc58/account/AbstractedAccountFactory.arc56.json').approval)]))
        .resolves.toEqual([{ name: 'SomeFactory', appId: 77n }])
    })
  })

  describe('ROLLOUT-1: the StakingPool child waits for Staking, Rewards v2 and Gate v2', () => {
    const pool = () => target('StakingPoolFactory')
    const ids = { stakingPoolFactory: 7n }
    const deployedPool = { '7': approvalBytes('StakingPoolFactory') }

    test('the new child calls Staking.reclaimAppStake, Rewards.closeDisbursement and Gate.checkFor, which the deployed apps lack', () => {
      const child = loadCompiled(pool().child!.artifact).approval
      const live = {
        [pool().dependencies![0].name]: { appId: 3642366153n, program: deployedRideAlong('Staking').approval },
        [pool().dependencies![1].name]: { appId: 3569556095n, program: deployedRideAlong('RewardsV1').approval },
        [pool().dependencies![2].name]: { appId: 3569558504n, program: approvalBytes('GateV1') },
      }
      expect(dependencyGaps('StakingPoolFactory', [child], pool().dependencies!, live).map((g) => [g.dependency, g.missing])).toEqual([
        ['Staking (DAO akitaAppList.staking)', ['reclaimAppStake(address,uint64)void']],
        ['Rewards (DAO akitaAppList.rewards)', ['closeDisbursement(uint64)void']],
        ['Gate (DAO akitaAppList.gate)', ['checkFor((address,uint64,address),uint64,byte[][])bool', 'mustCheckFor((address,uint64,address),uint64,byte[][])void']],
      ])
    })

    test('Phase 2 refuses the StakingPoolFactory target until aal.staking, aal.rewards and aal.gate route them', async () => {
      const ctx = chain({ ...deployedPool, '20': deployedRideAlong('Staking').approval, '21': deployedRideAlong('RewardsV1').approval, '22': approvalBytes('GateV1') },
        { appIds: ids, bc: { '7': approvalBytes('StakingPool') }, aal: { staking: 20n, rewards: 21n, gate: 22n } })
      const plan = await planTarget(ctx, pool())
      expect(plan.blockers).toEqual([
        'StakingPoolFactory -> Staking (DAO akitaAppList.staking) 20: missing reclaimAppStake(address,uint64)void (upgrade it first)',
        'StakingPoolFactory -> Rewards (DAO akitaAppList.rewards) 21: missing createInstantDisbursement(pay,uint64,uint64,(address,uint64)[],address)uint64, createInstantAsaDisbursement(pay,axfer,uint64,uint64,(address,uint64)[],address)uint64, closeDisbursement(uint64)void (upgrade it first)',
        'StakingPoolFactory -> Gate (DAO akitaAppList.gate) 22: missing checkFor((address,uint64,address),uint64,byte[][])bool, mustCheckFor((address,uint64,address),uint64,byte[][])void (upgrade it first)',
      ])
      await expect(runPhase2(ctx, { targets: [pool()], confirm: true, log: () => {} })).rejects.toThrow(/^Phase 2 refused:[\s\S]*reclaimAppStake/)

      const upgraded = chain({ ...deployedPool, '20': loadCompiled('staking/Staking.arc56.json').approval, '21': loadCompiled('rewards/Rewards.arc56.json').approval, '22': loadCompiled('gates/Gate.arc56.json').approval },
        { appIds: ids, bc: { '7': approvalBytes('StakingPool') }, aal: { staking: 20n, rewards: 21n, gate: 22n } })
      expect((await planTarget(upgraded, pool())).blockers).toEqual([])
    })

    test('every Phase 2 target that pays referrals waits for Rewards v2 at aal.rewards (reclaim target overloads)', () => {
      const referralPayers = ['AkitaSocial', 'Subscriptions', 'Marketplace', 'StakingPoolFactory', 'AuctionFactory', 'RaffleFactory', 'AbstractedAccountFactory']
      const reclaimOverloads = [
        'createInstantDisbursement(pay,uint64,uint64,(address,uint64)[],address)uint64',
        'createInstantAsaDisbursement(pay,axfer,uint64,uint64,(address,uint64)[],address)uint64',
      ]
      for (const t of PHASE2_TARGETS) {
        const programs = [loadCompiled(t.artifact).approval, ...(t.child ? [loadCompiled(t.child.artifact).approval] : [])]
        const rewards = (t.dependencies ?? []).filter((d) => d.akitaAppList === 'rewards')
        expect(rewards.length, t.name).toBe(referralPayers.includes(t.name) ? 1 : 0)
        const v1 = Object.fromEntries(rewards.map((d) => [d.name, { appId: 21n, program: deployedRideAlong('RewardsV1').approval }]))
        const missing = dependencyGaps(t.name, programs, rewards, v1).flatMap((g) => g.missing)
        // the wallet factory pays ALGO referrals only, so it calls just the ALGO overload
        expect(reclaimOverloads.some((overload) => missing.includes(overload)), t.name).toBe(referralPayers.includes(t.name))
        const v2 = Object.fromEntries(rewards.map((d) => [d.name, { appId: 21n, program: loadCompiled('rewards/Rewards.arc56.json').approval }]))
        expect(dependencyGaps(t.name, programs, rewards, v2), t.name).toEqual([])
      }
    })

    test('every Phase 2 target with a hinted gated path waits for Gate v2 at aal.gate; the others do not', async () => {
      const gated = ['AkitaSocial', 'Subscriptions', 'Marketplace', 'StakingPoolFactory', 'AuctionFactory', 'RaffleFactory']
      for (const t of PHASE2_TARGETS) {
        const programs = [loadCompiled(t.artifact).approval, ...(t.child ? [loadCompiled(t.child.artifact).approval] : [])]
        const gate = (t.dependencies ?? []).filter((d) => d.akitaAppList === 'gate')
        const gaps = dependencyGaps(t.name, programs, gate, Object.fromEntries(gate.map((d) => [d.name, { appId: 22n, program: approvalBytes('GateV1') }])))
        expect(gaps.length > 0, t.name).toBe(gated.includes(t.name))
        expect(dependencyGaps(t.name, programs, gate, Object.fromEntries(gate.map((d) => [d.name, { appId: 22n, program: loadCompiled('gates/Gate.arc56.json').approval }]))), t.name).toEqual([])
      }
    })
  })

  describe('ROLLOUT-2 / MISC-6: ride-along upgrades ship the plugin they break', () => {
    test('HyperSwap removes the accept() the deployed HyperSwapPlugin calls; the removal is an accepted decision', () => {
      const hs = deployedRideAlong('HyperSwap')
      expect(programHasSelector(deployedRideAlong('HyperSwapPluginMay').approval, HYPERSWAP_OLD_ACCEPT)).toBe(true)
      const plan = { target: target('HyperSwap'), live: { approval: hs.approval }, abi: diffAbi(hs.approval, target('HyperSwap').artifact) } as unknown as TargetPlan
      expect(plan.abi).toMatchObject({ known: true, removed: [HYPERSWAP_OLD_ACCEPT] })
      const ack = assertAbiAcknowledged([plan], {})
      expect(ack).toMatchObject({ waived: [], accepted: [{ target: 'HyperSwap', signature: HYPERSWAP_OLD_ACCEPT, decision: 'ROLLOUT-2', date: '2026-10-05' }] })
      // bound to the deployed program: a different HyperSwap program removing accept() is refused
      expect(() => assertAbiAcknowledged([{ ...plan, live: { approval: new Uint8Array([1]) } } as unknown as TargetPlan], {})).toThrow(`HyperSwap: removes ${HYPERSWAP_OLD_ACCEPT}`)
    })

    test('HyperSwap and PollFactory are selectable, never default, and each names its lockstep plugin', () => {
      expect(selectPhase2Targets(['HyperSwap', 'pollFactory']).map((t) => t.name)).toEqual(['HyperSwap', 'PollFactory'])
      expect(selectPhase2Targets([]).some((t) => ['HyperSwap', 'PollFactory'].includes(t.name))).toBe(false)
      expect(lockstepPlugins(target('HyperSwap')).map((p) => p.registryKey)).toEqual(['hyperSwapPlugin'])
      expect(lockstepPlugins(target('PollFactory')).map((p) => p.registryKey)).toEqual(['pollPlugin'])
    })

    test('the deployed PollPlugin pays a fixed creation cost; the new one asks the factory (MISC-6)', () => {
      expect(calledSignatures(deployedRideAlong('PollPluginMay').approval, 'poll/PollFactory.arc56.json')).not.toContain('newPollCost()uint64')
      expect(calledSignatures(loadCompiled('arc58/plugins/poll/PollPluginContract.arc56.json').approval, 'poll/PollFactory.arc56.json')).toContain('newPollCost()uint64')
    })

    test('grant swap timing: the new PollPlugin swaps before the factory upgrade, the new HyperSwapPlugin right after HyperSwap\'s', () => {
      const live = { HyperSwap: { appId: 1n, program: deployedRideAlong('HyperSwap').approval }, PollFactory: { appId: 2n, program: deployedRideAlong('PollFactory').approval } }
      const split = splitLockstep(LOCKSTEP_PLUGINS, live)
      expect(split.beforeUpgrade.map((p) => p.catalog)).toEqual(['PollPluginContract'])
      expect(split.afterUpgrade.map((p) => p.catalog)).toEqual(['HyperSwapPlugin'])
      const upgraded = { HyperSwap: { appId: 1n, program: loadCompiled('hyper-swap/HyperSwap.arc56.json').approval }, PollFactory: live.PollFactory }
      expect(splitLockstep(LOCKSTEP_PLUGINS, upgraded).afterUpgrade).toEqual([])
    })
  })
})

/**
 * TestNet rehearsal 2026-11-25, the stop at B2#2: `update:dao` reached the funding of its upgrade with a
 * DAO SDK whose wallet nothing had resolved. The LocalNet suite resolves the wallet in its setup and a
 * dry run returns before the send path, so only the command line could hit it.
 */
describe('TestNet rehearsal 2026-11-25: the Phase 2 send path', () => {
  /** A DAO SDK stand-in with the SDK's own rule: `wallet` throws until getWallet() has resolved. */
  const lazyDao = (wallet: unknown) => {
    let resolved = false
    return {
      appId: 5n,
      client: { state: { global: { getAll: async () => ({ state: 0n }) } } },
      getWallet: async () => { resolved = true; return wallet },
      get wallet() {
        if (!resolved) throw new Error('Wallet not initialized. Call "await dao.getWallet()" first to initialize the wallet SDK')
        return wallet
      },
    }
  }

  test('funding a target asks for the DAO wallet; it does not rely on an earlier call', async () => {
    const reached = new Error('reached the DAO wallet')
    const ctx = { options: { network: 'testnet', version: 't' }, sender: 'SENDER', dao: lazyDao({ getMbr: async () => { throw reached } }) } as unknown as ScriptContext
    const plan = { target: { name: 'AkitaDAO', leasePrefix: 'dao' }, appId: 5n, groups: { groups: [{ app: true, child: false, txns: 3 }] } } as unknown as TargetPlan
    await expect(executeTargetPlan(ctx, plan, { log: () => {} })).rejects.toBe(reached)
  })

  test('the runner never reads the wallet through the getter that throws', () => {
    const source = fs.readFileSync(path.resolve(__dirname, '../../../../scripts/lib/principal-rollout-run.ts'), 'utf8')
    expect(source).not.toMatch(/ctx\.dao\.wallet\b/)
  })

  describe('update:dao reuses the validator the DAO already points to', () => {
    const tree = loadCompiled('arc58/dao/AkitaDAOProposalValidator.arc56.json')
    const other = loadCompiled('arc58/dao/AkitaDAO.arc56.json')
    const chainOf = (apps: Record<string, { approval: Uint8Array; clear: Uint8Array }>) => ({
      algorand: { client: { algod: { getApplicationByID: (id: bigint) => ({ do: async () => {
        const app = apps[id.toString()]
        if (!app) throw new Error(`no app ${id}`)
        return { params: { approvalProgram: app.approval, clearStateProgram: app.clear, creator: { toString: () => algosdk.ALGORAND_ZERO_ADDRESS_STRING } } }
      } }) } } },
    }) as unknown as ScriptContext

    test('the tree program at the pointer is reused, so a second start deploys nothing', async () => {
      expect(await treeValidatorInUse(chainOf({ '9': { approval: tree.approval, clear: tree.clear } }), 9n)).toBe(9n)
    })

    test('another program, another clear program, a missing app or no pointer deploys', async () => {
      const apps = { '7': { approval: other.approval, clear: tree.clear }, '8': { approval: tree.approval, clear: other.approval } }
      expect(await treeValidatorInUse(chainOf(apps), 7n)).toBeUndefined()
      expect(await treeValidatorInUse(chainOf(apps), 8n)).toBeUndefined()
      expect(await treeValidatorInUse(chainOf(apps), 9n)).toBeUndefined()
      expect(await treeValidatorInUse(chainOf(apps), 0n)).toBeUndefined()
      expect(await treeValidatorInUse(chainOf(apps), undefined)).toBeUndefined()
    })
  })
})

describe('CLI wiring', () => {
  test('the rollout scripts load and print their help', () => {
    const cwd = path.resolve(__dirname, '../../../..')
    for (const script of ['principal-phase2a-update-plugin.ts', 'principal-phase2-upgrade-targets.ts', 'principal-phase3-plugins.ts', 'update-dao-wallet-plugins.ts',
      'update-wallet-factory.ts', 'update-hyper-swap.ts', 'update-poll.ts']) {
      const output = execFileSync(process.execPath, ['-r', 'ts-node/register/transpile-only', `scripts/${script}`, '--help'], {
        cwd, encoding: 'utf8', timeout: 60_000, env: { ...process.env, DEPLOYER_MNEMONIC: '', MNEMONIC: '' },
      })
      expect(output, script).toContain('Usage: ts-node scripts/')
    }
  }, 240_000)
})
