/**
 * Principal-resolution COMPATIBILITY SUITE, static half (PHASE-0-SPEC.md §7.1 "Compatibility baseline =
 * deployed bytecode", §7.2, §7.5 P2-CMP-01 / P2-REF-02 / P2-ABI-01). No LocalNet, no network.
 *
 * The baseline is `fixtures/mainnet-programs.json`: every deployed program, read-only from a public MainNet
 * algod by `fetch-mainnet-programs.ts`, with facts taken from its disassembly (router table = deployed ABI;
 * 4-byte constants that are not routes = selectors it calls; integer constants = the terms it hard-codes).
 * Working-tree programs are analysed the same way from their puya TEAL. So every claim below is about the
 * BYTECODE that runs on MainNet, not about a committed source or ARC-56 file.
 *
 * The LocalNet half (`compat.e2e.spec.ts`) installs the same bytes and runs the flows.
 */
import { execSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'
import { BASELINE, FAMILY_TARGETS, MAINNET_DAO } from './baseline'
import { MEMBER_SPECS } from './members'
import { allKnownRoutes, baselineId, CONTRACTS, hasInt, inScopePlugins, nameOf, servingPrograms, sourceConst, treeFacts, unservedCalls } from './lib/analysis'
import { ARTIFACTS, artifactRoutes, b64, globalUint, loadSnapshot, methodSignature, program, readArtifact, selectorOf, signaturesFor } from './lib/snapshot'
import { goalAvailable, programFacts, sha256Hex } from './lib/teal-facts'

const snapshot = loadSnapshot()
const programs = Object.values(snapshot.programs)
const json = (file: string) => JSON.parse(readFileSync(file, 'utf8'))
const named = (sels: string[]) => sels.map(nameOf)

/**
 * ABI removals Kyle accepted as decisions (spec §9.4: K2 newAccount, K6 RaffleFactory creation), the same
 * checked-in list the Phase 2 guard reads (`scripts/lib/principal-accepted-abi-removals.json`).
 */
type AcceptedRemoval = { decision: string; date: string; contract: string; programSha256: string; signature: string }
const ACCEPTED_REMOVALS: AcceptedRemoval[] = json(path.resolve(__dirname, '../../scripts/lib/principal-accepted-abi-removals.json')).removals

/** The December-2025 universe (DAO and factories) the December plugin generation is bound to. */
const DECEMBER_DAO = 3368388956n

describe('CMP-S1 snapshot integrity (the baseline is exactly what MainNet runs)', () => {
  test('the snapshot holds every baseline entry and nothing else', () => {
    expect(Object.keys(snapshot.programs).sort()).toEqual(BASELINE.map((e) => e.key).sort())
    for (const e of BASELINE) {
      const p = program(e.key)
      expect(p.appId).toBe(e.appId.toString())
      expect(p.role).toBe(e.role)
      expect(p.inScope).toBe(e.inScope)
      expect(p.box).toBe(e.box)
    }
    expect(snapshot.source).toMatch(/mainnet/i)
  })

  test.each(programs.map((p) => [p.key]))('%s: recorded bytes hash to the recorded sha256 and the facts were taken from them', (key) => {
    const p = program(key)
    const approval = b64(p.approval)
    expect(sha256Hex(approval)).toBe(p.approvalSha256)
    expect(approval.length).toBe(p.approvalLength)
    if (p.clear !== undefined) expect(sha256Hex(b64(p.clear))).toBe(p.clearSha256)
    expect(p.facts.fromSha256).toBe(p.approvalSha256)
    expect(p.facts.routes.length).toBeGreaterThan(0)
  })

  test.skipIf(!goalAvailable())('the recorded facts equal a fresh disassembly (goal clerk compile -D, offline)', () => {
    for (const p of programs) expect({ key: p.key, ...programFacts(b64(p.approval)) }).toEqual({ key: p.key, ...p.facts })
  })

  test('live children run the program their factory stages: both live listings and the DAO wallet equal the `bc` boxes', () => {
    expect(program('Listing.live.3643990817').approvalSha256).toBe(program('Listing').approvalSha256)
    expect(program('Listing.live.3691743616').approvalSha256).toBe(program('Listing').approvalSha256)
    expect(program('AbstractedAccount.live.daoWallet').approvalSha256).toBe(program('AbstractedAccount').approvalSha256)
  })

  test('every in-scope program except social plugin v0.0.2 equals a committed artifact; the router-derived ABI has its method count', () => {
    for (const p of programs.filter((x) => x.inScope && x.key !== 'SocialPlugin.v0.0.2')) {
      expect(p.provenance.length, `${p.key} has no committed artifact with its bytes`).toBeGreaterThan(0)
    }
    // v0.0.2 (3633295088, 2026-07-11) was deployed from an uncommitted build: the MainNet bytes are its only baseline
    expect(program('SocialPlugin.v0.0.2').provenance).toEqual([])
    // every route of the deployed social plugins is named by the catalog (the v0.0.2 ABI is recovered from them)
    for (const key of ['SocialPlugin.may', 'SocialPlugin.v0.0.2', 'SocialPlugin.v0.0.3']) {
      expect(program(key).facts.routes.filter((r) => signaturesFor(r).length === 0)).toEqual([])
    }
  })
})

describe('CMP-S2 scope: which deployed generations Phase 2 must keep working', () => {
  const PINS: Record<string, [string, bigint]> = {
    'StakingPoolPlugin.may': ['pool_factory', baselineId('StakingPoolFactory')],
    'StakingPoolPlugin.july': ['pool_factory', baselineId('StakingPoolFactory')],
    'AuctionPlugin.may': ['auction_factory', baselineId('AuctionFactory')],
    'MarketplacePlugin.may': ['factory', baselineId('Marketplace')],
    'RafflePlugin.may': ['raffle_factory', baselineId('RaffleFactory')],
  }

  test('in-scope plugins are pinned to the MainNet DAO and to the Phase 2 factories', () => {
    for (const p of inScopePlugins()) {
      const dao = globalUint(p.key, 'akita_dao')
      // the May RafflePlugin has no akita_dao global (it reads the DAO through its factory)
      if (p.key !== 'RafflePlugin.may') expect(dao, p.key).toBe(MAINNET_DAO)
      const pin = PINS[p.key]
      if (pin) expect(globalUint(p.key, pin[0]), p.key).toBe(pin[1])
    }
  })

  test('the December 2025 generation is bound to the December universe, which Phase 2 does not touch (excluded with evidence)', () => {
    const phase2 = new Set(programs.filter((p) => p.role === 'target').map((p) => BigInt(p.appId)))
    const december = programs.filter((p) => p.role === 'plugin' && p.generation === 'december-2025')
    expect(december.map((p) => p.family).sort()).toEqual(['auction', 'marketplace', 'raffle', 'social', 'stakingPool', 'subscriptions'])
    for (const p of december) {
      expect(p.inScope).toBe(false)
      const dao = globalUint(p.key, 'akita_dao')
      if (dao !== undefined) expect(dao, p.key).toBe(DECEMBER_DAO)
      for (const name of ['pool_factory', 'auction_factory', 'factory', 'raffle_factory']) {
        const pin = globalUint(p.key, name)
        if (pin !== undefined) expect(phase2.has(pin), `${p.key}.${name}`).toBe(false)
      }
    }
  })
})

describe('CMP-S3 every track tested against the same MainNet bytes (per-track fixtures agree with this snapshot)', () => {
  const sha = (key: string) => program(key).approvalSha256

  test('social: deployed/mainnet-abi.json and the AkitaSocial program fixture', () => {
    const abi = json(path.join(CONTRACTS, 'social/deployed/mainnet-abi.json')).contracts
    expect(abi.AkitaSocial.approvalSha256).toBe(sha('AkitaSocial'))
    expect(abi.AkitaSocialGraph.approvalSha256).toBe(sha('AkitaSocialGraph'))
    expect(abi.AkitaSocialPlugin.approvalSha256).toBe(sha('SocialPlugin.v0.0.3'))
    expect(json(path.join(CONTRACTS, 'social/deployed/AkitaSocial.3569557130.program.json')).approvalSha256).toBe(sha('AkitaSocial'))
    const vendored = json(path.join(CONTRACTS, 'arc58/plugins/social/deployed/AkitaSocialPlugin.v0.0.3.arc56.json'))
    expect(sha256Hex(b64(vendored.byteCode.approval))).toBe(sha('SocialPlugin.v0.0.3'))
  })

  test('subscriptions: compat/mainnet-programs.json', () => {
    const apps = json(path.join(CONTRACTS, 'subscriptions/compat/mainnet-programs.json')).apps
    expect(apps['3569556497'].approvalSha256).toBe(sha('Subscriptions'))
    expect(apps['3569561107'].approvalSha256).toBe(sha('SubscriptionsPlugin.may'))
    expect(apps['3368399152'].approvalSha256).toBe(sha('SubscriptionsPlugin.december'))
  })

  test('staking-pool: compat/mainnet-programs.ts', async () => {
    const m = await import('../../smart_contracts/staking-pool/compat/mainnet-programs')
    expect(m.DEPLOYED_STAKING_POOL_PLUGIN.approvalSha256).toBe(sha('StakingPoolPlugin.july'))
    expect(m.DEPLOYED_STAKING_POOL_PLUGIN_MAY_2026.approvalSha256).toBe(sha('StakingPoolPlugin.may'))
    expect(m.DEPLOYED_STAKING_POOL_CHILD.approvalSha256).toBe(sha('StakingPool'))
    expect(sha256Hex(b64(m.DEPLOYED_STAKING_POOL_CHILD.approval))).toBe(sha('StakingPool'))
  })

  test('marketplace: compat/mainnet-deployed.json', () => {
    const d = json(path.join(CONTRACTS, 'marketplace/compat/mainnet-deployed.json'))
    expect(d.marketplacePlugin.approvalSha256).toBe(sha('MarketplacePlugin.may'))
    expect(d.marketplace.approvalSha256).toBe(sha('Marketplace'))
    expect(d.listing.approvalSha256).toBe(sha('Listing'))
  })

  test.each([
    ['auction/compat/deployed/AuctionFactory.arc56.json', 'AuctionFactory'],
    ['auction/compat/deployed/Auction.arc56.json', 'Auction'],
    ['auction/compat/deployed/AuctionPlugin.arc56.json', 'AuctionPlugin.may'],
    ['raffle/compat/deployed/RaffleFactory.arc56.json', 'RaffleFactory'],
    ['raffle/compat/deployed/Raffle.arc56.json', 'Raffle'],
    ['raffle/compat/deployed/RafflePlugin.arc56.json', 'RafflePlugin.may'],
  ])('auction/raffle vendored %s', (file, key) => {
    expect(sha256Hex(b64(json(path.join(CONTRACTS, file)).byteCode.approval))).toBe(sha(key))
  })

  test('update-plugin track: fixtures/mainnet-deployed.json', () => {
    const apps = json(path.join(CONTRACTS, 'arc58/plugins/update-akita-dao/fixtures/mainnet-deployed.json')).apps
    const pairs: [string, string][] = [
      ['social', 'AkitaSocial'], ['subscriptions', 'Subscriptions'], ['dao', 'AkitaDAO'], ['socialGraph', 'AkitaSocialGraph'],
      ['marketplace', 'Marketplace'], ['stakingPoolFactory', 'StakingPoolFactory'], ['auctionFactory', 'AuctionFactory'],
      ['raffleFactory', 'RaffleFactory'], ['walletFactory', 'AbstractedAccountFactory'],
    ]
    for (const [name, key] of pairs) expect(apps[name].approvalSha256, name).toBe(sha(key))
  })

  test('scripts/lib/principal-deployed-abi.json (the Phase 2 refusal list) names exactly the routes found in the deployed bytes', () => {
    const abi = json(path.resolve(CONTRACTS, '../scripts/lib/principal-deployed-abi.json')).programs as Record<string, { methods?: string[]; signatures?: string[] }>
    let checked = 0
    for (const p of programs) {
      const entry = abi[p.approvalSha256]
      if (!entry) continue
      const sigs = entry.methods ?? entry.signatures ?? []
      expect(sigs.map(selectorOf).sort(), p.key).toEqual([...p.facts.routes].sort())
      checked++
    }
    expect(checked).toBeGreaterThanOrEqual(9)
  })
})

describe('CMP-S4 Phase 2 singletons keep every deployed selector, except the removals Kyle accepted (K2, K6)', () => {
  /** accepted removals per target, from the decision list; each is bound to the deployed program's sha256 */
  const acceptedFor = (key: string, sha256: string) => ACCEPTED_REMOVALS.filter((a) => a.contract === key && a.programSha256 === sha256).map((a) => a.signature)

  test.each(programs.filter((p) => p.role === 'target').map((p) => [p.key]))('%s', (key) => {
    const p = program(key)
    const tree = artifactRoutes(p.artifact)
    const removed = p.facts.routes.filter((r) => !tree.has(r))
    expect(named(removed).sort()).toEqual(acceptedFor(key, p.approvalSha256).sort())
  })

  test('the decision list names only Phase 2 targets of this snapshot, and every entry is one of their deployed routes', () => {
    expect(ACCEPTED_REMOVALS.map((a) => a.decision).sort()).toEqual(['K2', 'K6', 'K6', 'ROLLOUT-2'])
    for (const a of ACCEPTED_REMOVALS) {
      if (a.decision === 'ROLLOUT-2') {
        // ride-along target outside this snapshot: its deployed program is in fixtures/ride-along-programs.json
        const hyperSwap = JSON.parse(readFileSync(path.join(__dirname, 'fixtures/ride-along-programs.json'), 'utf8')).programs.HyperSwap
        expect([a.contract, hyperSwap.approvalSha256]).toEqual(['HyperSwap', a.programSha256])
        expect(sha256Hex(b64(hyperSwap.approval))).toBe(a.programSha256)
        expect(Buffer.from(b64(hyperSwap.approval)).toString('hex')).toContain(selectorOf(a.signature))
        continue
      }
      const p = program(a.contract)
      expect(p.role, a.contract).toBe('target')
      expect(p.approvalSha256, a.signature).toBe(a.programSha256)
      expect(p.facts.routes, a.signature).toContain(selectorOf(a.signature))
    }
  })
})

describe('CMP-S5 P2-CMP-01 (static): every call an old plugin makes still lands on a method of the upgraded target / new child / Gate v2 / current wallet', () => {
  /**
   * Accepted breaks, asserted (not skipped): K6 (Kyle, 2026-10-04) deleted the RaffleFactory legacy creation
   * shims, so the May RafflePlugin's raffle creation has no route on the upgraded factory. It could not have
   * succeeded anyway: its local cost formula never matched even the deployed factory (audit AR-14), so creation
   * through deployed raffle plugins already fails today and nothing changes for them. The HEAD SDK's direct quote
   * (the old child's schema and whole weights boxes) is what stops at the RaffleFactory upgrade (new SDK in lockstep). Wallet
   * users get raffle creation back with the Phase 3 v3 RafflePlugin.
   */
  const ACCEPTED_GAPS: Record<string, string[]> = {
    'RafflePlugin.may': ACCEPTED_REMOVALS.filter((a) => a.decision === 'K6').map((a) => `${a.contract}: ${a.signature}`),
  }

  test.each(inScopePlugins().map((p) => [p.key]))('%s', (key) => {
    const p = program(key)
    const gaps: string[] = []
    let calls = 0
    for (const served of servingPrograms()) {
      const hits = p.facts.calls.filter((c) => served.facts.routes.includes(c))
      calls += hits.length
      for (const c of unservedCalls(p.facts, served)) gaps.push(`${served.key}: ${nameOf(c)}`)
    }
    expect(gaps.sort()).toEqual([...(ACCEPTED_GAPS[key] ?? [])].sort())
    // not vacuous: the plugin really calls into the baseline
    expect(calls).toBeGreaterThan(0)
  })

  test('each in-scope generation calls its own family targets (so the check above covers the family, not only the Gate)', () => {
    for (const p of inScopePlugins()) {
      const family = FAMILY_TARGETS[p.family as keyof typeof FAMILY_TARGETS]
      const familyRoutes = new Set(family.deployed.flatMap((k) => program(k).facts.routes))
      expect(p.facts.calls.filter((c) => familyRoutes.has(c)).length, p.key).toBeGreaterThan(0)
    }
  })
})

describe('CMP-S6 P2-REF-02 (static): new plugins still drive OLD children (markers + legacy gate subjects)', () => {
  /**
   * Old-child selectors the newest deployed generation calls that the new plugin no longer calls, with the
   * reason (verified against the deployed child, whose bytes equal the provenance commit's source):
   * the deployed `Auction.cancel()`, `Auction.deleteApplication()` and `Raffle.deleteApplication()` assert
   * `Txn.sender == Global.creatorAddress` (the factory), so the deployed plugin's direct calls always reverted.
   * The new plugins go through the factory (`AuctionFactory.cancelAuction/deleteAuctionApp`,
   * `RaffleFactory.deleteRaffle`), which is the creator of old and new children alike.
   */
  const REPLACED: Record<string, { selectors: string[]; via: string[] }> = {
    auction: { selectors: ['cancel()void', 'deleteApplication()void'], via: ['cancelAuction(uint64)void', 'deleteAuctionApp(uint64)void'] },
    raffle: { selectors: ['deleteApplication()void'], via: ['deleteRaffle(uint64)void'] },
    stakingPool: { selectors: [], via: [] },
    marketplace: { selectors: [], via: [] },
  }

  for (const [family, t] of Object.entries(FAMILY_TARGETS).filter(([, t]) => t.oldChild)) {
    describe(family, () => {
      const newPlugin = treeFacts(t.newPlugin)
      const oldChild = program(t.oldChild!)
      const newChild = artifactRoutes(t.newChild!)
      const newest = inScopePlugins().filter((p) => p.family === family).at(-1)!

      test(`every old-child call of the newest deployed generation (${newest.key}) is still made by the new plugin, or replaced through the factory`, () => {
        const missing = newest.facts.calls.filter((c) => oldChild.facts.routes.includes(c) && !newPlugin.calls.includes(c))
        expect(named(missing).sort()).toEqual([...REPLACED[family].selectors].sort())
        const factory = artifactRoutes(t.upgraded[0])
        for (const sig of REPLACED[family].via) {
          expect(newPlugin.calls, sig).toContain(selectorOf(sig))
          expect(factory.has(selectorOf(sig)), sig).toBe(true)
        }
      })

      test('every child call the new plugin makes is served by the new child or the old child', () => {
        const childCalls = newPlugin.calls.filter((c) => newChild.has(c) || oldChild.facts.routes.includes(c))
        expect(childCalls.length).toBeGreaterThan(0)
        // the legacy branch: selectors only the OLD child routes (gated methods with the deployed ABI)
        const legacyOnly = childCalls.filter((c) => !newChild.has(c))
        // on a NEW child the legacy selectors are the shims, so the new child routes them too
        expect(named(legacyOnly)).toEqual([])
      })

      if (t.marker) {
        test(`reads the ABI marker '${t.marker}' and builds both gate shapes (mustCheck for old children, mustCheckFor for new)`, () => {
          expect(newPlugin.strings).toContain(t.marker)
          expect(newPlugin.calls).toContain(selectorOf('mustCheck(address,uint64,byte[][])void'))
          expect(newPlugin.calls).toContain(selectorOf('mustCheckFor((address,uint64,address),uint64,byte[][])void'))
          // the marker is absent from the old child program and present in the new one
          expect(oldChild.facts.strings).not.toContain(t.marker)
          expect(treeFacts(t.newChild!).strings).toContain(t.marker)
        })

        test('the gated selectors the new plugin sends to OLD children are exactly the deployed gated ABI', () => {
          const gated = oldChild.facts.routes.filter((r) => signaturesFor(r).some((s) => /^gated/.test(s)))
          expect(gated.length).toBeGreaterThan(0)
          const sent = gated.filter((g) => newPlugin.calls.includes(g))
          expect(named(sent).length).toBeGreaterThan(0)
          // each of them is also served by the new child (old plugins hit it through the shim)
          for (const g of sent) expect(newChild.has(g), nameOf(g)).toBe(true)
        })
      }
    })
  }

  test('marketplace: the singleton serves every Listing generation, so the new plugin needs no marker and never calls a Listing gate method', () => {
    const newPlugin = treeFacts(FAMILY_TARGETS.marketplace.newPlugin)
    const market = artifactRoutes('marketplace/Marketplace.arc56.json')
    expect(newPlugin.calls).toContain(selectorOf('gatedPurchase(pay,appl,uint64,address,uint64)void'))
    expect(market.has(selectorOf('gatedPurchase(pay,appl,uint64,address)void'))).toBe(true)
    expect(market.has(selectorOf('gatedPurchase(pay,appl,uint64,address,uint64)void'))).toBe(true)
    expect(newPlugin.calls).toContain(selectorOf('mustCheckFor((address,uint64,address),uint64,byte[][])void'))
  })
})

describe('CMP-S7 new plugins on LIVE wallets (deployed AbstractedAccount program) and no dangling calls', () => {
  const liveWallet = program('AbstractedAccount')
  const treeWallet = artifactRoutes('arc58/account/AbstractedAccount.arc56.json')
  const known = allKnownRoutes()

  test.each(Object.entries(FAMILY_TARGETS).map(([f, t]) => [f, t.newPlugin]))('%s: every wallet method the new plugin calls is routed by the deployed wallet program', (_f, artifact) => {
    const facts = treeFacts(artifact)
    const walletCalls = facts.calls.filter((c) => treeWallet.has(c) || liveWallet.facts.routes.includes(c))
    expect(named(walletCalls.filter((c) => !liveWallet.facts.routes.includes(c)))).toEqual([])
  })

  test.each(Object.entries(FAMILY_TARGETS).map(([f, t]) => [f, t.newPlugin]))('%s: every named selector the new plugin calls is routed by some program', (_f, artifact) => {
    const facts = treeFacts(artifact)
    expect(named(facts.calls.filter((c) => signaturesFor(c).length > 0 && !known.has(c)))).toEqual([])
  })

  test('the working-tree TEAL facts describe the artifact byte code (same program)', () => {
    for (const t of Object.values(FAMILY_TARGETS)) {
      const spec = readArtifact(t.newPlugin)
      expect(treeFacts(t.newPlugin).fromSha256).toBe(sha256Hex(b64(spec.byteCode!.approval)))
      expect(treeFacts(t.newPlugin).routes.sort()).toEqual(spec.methods.map((m) => selectorOf(methodSignature(m))).sort())
    }
  })
})

describe('CMP-S8 exact payment terms: what the shims accept is what the deployed plugins hard-code', () => {
  test('marketplace: the deployed plugin pays the pre-audit Listing MBR, which the legacy list shims accept (LegacyListingCreateMbr)', () => {
    const legacy = sourceConst('marketplace/constants.ts', 'LegacyListingCreateMbr')
    expect(legacy).toBe(756_500n)
    expect(hasInt('MarketplacePlugin.may', legacy)).toBe(true)
    // it never quotes on chain: the deployed Marketplace has no listCost
    expect(program('Marketplace').facts.routes.some((r) => signaturesFor(r).some((s) => s.startsWith('listCost(')))).toBe(false)
  })

  test('social: every in-scope deployed plugin quotes MinPostsMBR 46,500 and the 18,900 reaction record (shim legacy terms) and has its id pinned', () => {
    const minPosts = sourceConst('social/constants.ts', 'LegacyMinPostsMBR')
    const reaction = sourceConst('social/constants.ts', 'ReactionlistMBR')
    expect([minPosts, reaction]).toEqual([46_500n, 18_900n])
    const pinned = ['LegacySocialPluginDecember', 'LegacySocialPluginMay', 'LegacySocialPluginV002', 'LegacySocialPluginV003'].map((n) => sourceConst('social/constants.ts', n))
    for (const p of programs.filter((x) => x.role === 'plugin' && x.family === 'social')) {
      expect(pinned, p.key).toContain(BigInt(p.appId))
      if (!p.inScope) continue
      expect(hasInt(p.key, minPosts), p.key).toBe(true)
      expect(hasInt(p.key, reaction), p.key).toBe(true)
    }
  })

  test('staking pool: the May plugin hard-codes 50,600 per entry + 18,900 first-entry, = the flat legacy charge the new child accepts', () => {
    const entries = sourceConst('staking-pool/constants.ts', 'PoolEntriesMBR')
    const byAddress = sourceConst('staking-pool/constants.ts', 'PoolEntriesByAddressMBR')
    const uniques = sourceConst('staking-pool/constants.ts', 'PoolUniquesMBR')
    expect(hasInt('StakingPoolPlugin.may', entries + byAddress)).toBe(true)
    expect(hasInt('StakingPoolPlugin.may', uniques)).toBe(true)
    // the July plugin quotes on chain through the deployed enterCost selector, which the new child keeps
    const legacyEnterCost = selectorOf('enterCost(address,(uint64,uint64,byte[32][])[])uint64')
    expect(program('StakingPoolPlugin.july').facts.calls).toContain(legacyEnterCost)
    expect(artifactRoutes('staking-pool/StakingPool.arc56.json').has(legacyEnterCost)).toBe(true)
  })

  test('raffle: the deployed plugin hard-codes entry box 31,700 + entriesByAddress 18,900 = 50,600; the new child adds 12,500 of weights storage per entry', () => {
    const byAddress = sourceConst('raffle/constants.ts', 'EntriesByAddressMBR')
    const deployed = sourceConst('raffle/constants.ts', 'EntryBoxMBR') + byAddress
    expect(deployed).toBe(50_600n)
    expect(hasInt('RafflePlugin.may', deployed)).toBe(true)
    // 2.0.0: a raffle reserves no weights boxes, so each entry also funds its own slot (refunded with
    // the rest). The deployed plugin never reaches the payment on any child (its `enter` panics on the
    // uint64 `ticket_asset`, e2e B5), so the new price breaks nothing that worked. The new plugin
    // reads the price from the child's `mbr()`.
    const entry = sourceConst('raffle/constants.ts', 'EntriesMBR') + byAddress
    expect(entry).toBe(deployed + sourceConst('raffle/constants.ts', 'EntryWeightMBR'))
    expect(entry).toBe(63_100n)
    expect(hasInt('RafflePlugin.may', entry)).toBe(false)
  })

  test('auction: the deployed plugin under-quotes the new child bid MBR by exactly 800 µA (documented: auction track finding 5)', () => {
    const child = sourceConst('auction/constants.ts', 'AuctionMBRBids') + sourceConst('auction/constants.ts', 'AuctionMBRBidsByAddress')
    // the deployed plugin's constants: bids 34,900 and bids + bidsByAddress 53,400
    expect(hasInt('AuctionPlugin.may', 34_900n)).toBe(true)
    expect(hasInt('AuctionPlugin.may', 53_400n)).toBe(true)
    expect(child - 53_400n).toBe(800n)
    // 2.0.0: that holds for ALGO bids on an auction without a bid fee (e2e B4). A fee auction reserves
    // no weights boxes, so a first bid there also funds the bidder's weight slot, and an ASA bid holds
    // a deposit that pays for its own refund; the new plugin and the SDK read both from the child's
    // `mbr()`. The deployed plugin knows neither price and is replaced with the release.
    const locations = sourceConst('auction/constants.ts', 'AuctionMBRLocations')
    expect(locations).toBe(sourceConst('auction/constants.ts', 'AuctionMBRLocationBox') + sourceConst('auction/constants.ts', 'AuctionMBRWeightSlot'))
    expect(child + locations).toBe(85_600n)
    expect(hasInt('AuctionPlugin.may', child + locations)).toBe(false)
    expect(hasInt('AuctionPlugin.may', sourceConst('auction/constants.ts', 'AuctionRefundDisbursementMBR'))).toBe(false)
  })

  test('subscriptions: the deployed plugin quotes on chain through the legacy cost selectors, which the upgraded singleton keeps', () => {
    const tree = artifactRoutes('subscriptions/Subscriptions.arc56.json')
    for (const sig of ['newSubscriptionCost(address,uint64,uint64)uint64', 'newServiceCost(uint64)uint64']) {
      expect(program('SubscriptionsPlugin.may').facts.calls, sig).toContain(selectorOf(sig))
      expect(tree.has(selectorOf(sig)), sig).toBe(true)
    }
  })
})

describe('CMP-S9 working-tree SDK on OLD children: methods whose selector changed (known gaps, reported to the owning tracks)', () => {
  /**
   * The new SDK reads/writes old (live) children through these wrappers, but the method kept its name and
   * changed its ABI (audit ride-along), so the old child rejects the call. Listed so the set cannot grow
   * silently; see IMPLEMENTATION-LOG "Compatibility suite" for the owners.
   */
  // Findings 1 and 2 were fixed after the suite landed (finish pass, 2026-10-04): StakingPoolSDK.gateCheck and
  // RaffleSDK.state route pre-marker children to the deployed signature. A gap counts as handled only when the
  // SDK source names the DEPLOYED signature of that method (the one the old child routes).
  const KNOWN_GAPS: Record<string, string[]> = {
    Raffle: [],
    StakingPool: [],
    Auction: [],
    Listing: [],
  }
  const SDK = path.resolve(CONTRACTS, '../../akita-sdk/src')
  const rows: [string, string, string[]][] = [
    ['Auction', 'auction/Auction.arc56.json', ['auction/index.ts']],
    ['Raffle', 'raffle/Raffle.arc56.json', ['raffle/index.ts']],
    ['StakingPool', 'staking-pool/StakingPool.arc56.json', ['staking-pool/index.ts']],
    ['Listing', 'marketplace/Listing.arc56.json', ['marketplace/listing.ts', 'marketplace/index.ts']],
  ]

  test.each(rows)('%s', (key, artifact, files) => {
    const spec = readArtifact(artifact)
    const old = program(key)
    const oldNames = new Set(old.facts.routes.flatMap((r) => signaturesFor(r).map((s) => s.slice(0, s.indexOf('(')))))
    const counts = new Map<string, number>()
    for (const m of spec.methods) counts.set(m.name, (counts.get(m.name) ?? 0) + 1)
    const src = files.map((f) => readFileSync(path.join(SDK, f), 'utf8')).join('\n')
    const gaps: string[] = []
    for (const m of spec.methods) {
      if ((counts.get(m.name) ?? 0) > 1 || m.name === 'create') continue // overloads are routed by marker (CMP-S6)
      if (!new RegExp(`\\.${m.name}\\(`).test(src)) continue
      const sel = selectorOf(methodSignature(m))
      // a NEW method (name unknown to the old child) is a feature of new children, not a regression
      const deployedForms = old.facts.routes.flatMap((r) => signaturesFor(r)).filter((x) => x.startsWith(`${m.name}(`))
      const handled = deployedForms.some((x) => src.includes(x))
      if (!old.facts.routes.includes(sel) && oldNames.has(m.name) && !handled) gaps.push(methodSignature(m))
    }
    expect(gaps).toEqual(KNOWN_GAPS[key])
  })
})

describe('CMP-S11 working-tree programs that call a wallet method LIVE wallets do not route (rollout ordering)', () => {
  /**
   * Live wallets (every MainNet wallet, the DAO wallet 3569559153 included) run the deployed AbstractedAccount
   * program, which lacks `arc58_getNamedPluginKey`. The tree DAO and its proposal validator call it on the DAO
   * wallet for every RemoveNamedPlugin action, so such proposals revert until the DAO wallet runs the tree
   * wallet program (Phase 3 `--unname-aliases` emits RemoveNamedPlugin). The Guild creates its own (tree)
   * wallets. The factory's new `create` is how NEW wallets get the tree program. Listed so the set cannot grow
   * silently; reported to the update-plugin / rollout track in IMPLEMENTATION-LOG.
   *
   * Since 2026-11-20 the live program also lacks `arc58_deleteEscrow`. The tree DAO and the Guild call it on a
   * wallet for a DeleteEscrow action (type 73), so a DeleteEscrow proposal reverts until the DAO wallet runs the
   * tree wallet program (rollout step F1). The proposal validator does not call it.
   */
  const KNOWN: Record<string, string[]> = {
    'arc58/dao/AkitaDAO.arc56.json': ['arc58_deleteEscrow(string)void', 'arc58_getNamedPluginKey(string)(uint64,address,string)'],
    'arc58/dao/AkitaDAOProposalValidator.arc56.json': ['arc58_getNamedPluginKey(string)(uint64,address,string)'],
    'arc58/guilds/core/Guild.arc56.json': ['arc58_deleteEscrow(string)void', 'arc58_getNamedPluginKey(string)(uint64,address,string)'],
    'arc58/account/AbstractedAccountFactory.arc56.json': ['create(string,uint64,address,address,string,uint64,uint64,string,address,byte[32],bool)void'],
    // test-only subclass of the tree DAO (legacy vote receipts); never deployed
    'mocks/legacy-vote-dao/MockLegacyVoteDAO.arc56.json': ['arc58_deleteEscrow(string)void', 'arc58_getNamedPluginKey(string)(uint64,address,string)'],
  }

  test('exactly the known callers, with exactly the known methods', () => {
    const live = new Set(program('AbstractedAccount').facts.routes)
    const missing = new Set([...artifactRoutes('arc58/account/AbstractedAccount.arc56.json').keys()].filter((s) => !live.has(s)))
    const found: Record<string, string[]> = {}
    for (const file of execSync(`find ${JSON.stringify(ARTIFACTS)} -name '*.arc56.json'`, { encoding: 'utf8' }).trim().split('\n')) {
      const rel = path.relative(ARTIFACTS, file)
      if (!existsSync(file.replace(/\.arc56\.json$/, '.approval.teal'))) continue
      const hits = treeFacts(rel).calls.filter((c) => missing.has(c))
      if (hits.length > 0) found[rel] = named(hits)
    }
    expect(found).toEqual(KNOWN)
  })
})

describe('CMP-S10 suite membership: the per-track specs that own the deep flows still exist and name their cases', () => {
  test.each(MEMBER_SPECS.map((m) => [m.file, m.covers]))('%s', (file, covers) => {
    const text = readFileSync(path.resolve(CONTRACTS, '..', file), 'utf8')
    for (const id of covers) expect(text, `${file} no longer names ${id}`).toContain(id)
  })

  test('every family with old children has a member spec that runs the new plugin on an OLD child (P2-REF-02)', () => {
    const ref02 = MEMBER_SPECS.filter((m) => m.covers.includes('P2-REF-02')).map((m) => m.file)
    for (const dir of ['staking-pool', 'auction', 'raffle', 'marketplace']) {
      expect(ref02.some((f) => f.startsWith(`smart_contracts/${dir}/`)), dir).toBe(true)
    }
  })
})

test('the artifacts directory used by the analysis is the working tree', () => {
  expect(ARTIFACTS.endsWith(path.join('smart_contracts', 'artifacts'))).toBe(true)
})
