import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { ABIMethod } from 'algosdk'
import { describe, expect, test } from 'vitest'
import { DEPLOYED_AUCTION } from './compat/deployed'
import { DEPLOYED_RAFFLE, DEPLOYED_NEW_PRIZE_BOX_RAFFLE, DEPLOYED_NEW_RAFFLE } from '../raffle/compat/deployed'

/**
 * Principal-resolution ABI of the auction/raffle track (docs/principal-resolution/PHASE-0-SPEC.md §6.6,
 * §6.8, §7.2), checked on the compiled artifacts (no LocalNet):
 * - children carry `seller_referrer` (+1 global byte slice, +50,000 µA, the plugins' ABI marker)
 * - every gated / creation method exists as the hinted overload AND as a legacy shim whose selector is
 *   exactly the DEPLOYED one (MainNet bytecode vendored in `compat/deployed`), except raffle creation:
 *   the RaffleFactory routes only the hinted creation methods (Kyle decision K6, 2026-10-04)
 * - the Auction child still fits 4 program pages and the 8,192-byte boxed contract the fixtures fund
 * - the v3 plugins call the hinted factory methods, `Gate.mustCheckFor`, and both gated ABIs
 */

type Spec = { name: string; methods: { name: string; args: { type: string }[]; returns: { type: string } }[]; state: { schema: { global: { ints: number; bytes: number } }; keys: { global: Record<string, { key: string }> } }; byteCode: { approval: string; clear: string } }

const artifacts = path.resolve(__dirname, '../artifacts')
const load = (file: string): Spec => JSON.parse(readFileSync(path.join(artifacts, file), 'utf8'))
const signatures = (spec: { methods: Spec['methods'] }) => spec.methods.map((m) => `${m.name}(${m.args.map((a) => a.type).join(',')})${m.returns.type}`)
const selector = (signature: string) => Buffer.from(ABIMethod.fromSignature(signature).getSelector()).toString('hex')
const approval = (spec: Spec) => Buffer.from(spec.byteCode.approval, 'base64')
const calls = (spec: Spec, signature: string) => approval(spec).toString('hex').includes(selector(signature))
const keyNames = (spec: { state: { keys: { global: Record<string, { key: string }> } } }) => Object.values(spec.state.keys.global).map((k) => Buffer.from(k.key, 'base64').toString())

const auction = load('auction/Auction.arc56.json')
const auctionFactory = load('auction/AuctionFactory.arc56.json')
const auctionPlugin = load('arc58/plugins/auction/AuctionPlugin.arc56.json')
const raffle = load('raffle/Raffle.arc56.json')
const raffleFactory = load('raffle/RaffleFactory.arc56.json')
const rafflePlugin = load('arc58/plugins/raffle/RafflePlugin.arc56.json')

const AUCTION_GATED = {
  gatedBid: ['gatedBid(pay,appl,address,uint64)void', 'gatedBid(pay,appl,address)void'],
  gatedBidAsa: ['gatedBidAsa(pay,axfer,appl,address,uint64)void', 'gatedBidAsa(pay,axfer,appl,address)void'],
}
const AUCTION_CREATE = {
  newAuction: [
    'newAuction(pay,axfer,string,byte[32][],uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64,uint64)uint64',
    'newAuction(pay,axfer,string,byte[32][],uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64',
  ],
  newPrizeBoxAuction: [
    'newPrizeBoxAuction(appl,pay,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64,uint64)uint64',
    'newPrizeBoxAuction(appl,pay,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64',
  ],
}
const RAFFLE_GATED = {
  gatedEnter: ['gatedEnter(appl,pay,address,uint64)void', 'gatedEnter(appl,pay,address)void'],
  gatedEnterAsa: ['gatedEnterAsa(appl,pay,axfer,address,uint64)void', 'gatedEnterAsa(appl,pay,axfer,address)void'],
  gatedAdd: ['gatedAdd(appl,pay,uint64)void', 'gatedAdd(appl,pay)void'],
  gatedAddAsa: ['gatedAddAsa(appl,axfer,uint64)void', 'gatedAddAsa(appl,axfer)void'],
}
/** [hinted, DEPLOYED]. K6: the upgraded factory routes only the hinted form. */
const RAFFLE_CREATE = {
  newRaffle: [
    'newRaffle(pay,axfer,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,string,byte[32][],uint64,uint64)uint64',
    DEPLOYED_NEW_RAFFLE,
  ],
  newPrizeBoxRaffle: [
    'newPrizeBoxRaffle(appl,pay,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64,uint64)uint64',
    DEPLOYED_NEW_PRIZE_BOX_RAFFLE,
  ],
}
const MUST_CHECK = 'mustCheck(address,uint64,byte[][])void'
const MUST_CHECK_FOR = 'mustCheckFor((address,uint64,address),uint64,byte[][])void'

describe('compat/deployed: vendored bytecode is the MainNet bytecode', () => {
  for (const [name, entry] of Object.entries({ ...prefix('auction', DEPLOYED_AUCTION), ...prefix('raffle', DEPLOYED_RAFFLE) })) {
    test(`${name} sha256 matches the recorded MainNet program`, () => {
      const bytes = Buffer.from(entry.spec.byteCode!.approval, 'base64')
      expect(createHash('sha256').update(bytes).digest('hex')).toBe(entry.sha256)
    })
  }
})

function prefix<T extends Record<string, unknown>>(p: string, o: T): Record<string, T[keyof T]> {
  return Object.fromEntries(Object.entries(o).map(([k, v]) => [`${p}.${k}`, v])) as Record<string, T[keyof T]>
}

describe('§6.6 / §6.8: seller_referrer marker', () => {
  test('children declare seller_referrer as one more global byte slice than the deployed child', () => {
    expect(keyNames(auction)).toContain('seller_referrer')
    expect(keyNames(raffle)).toContain('seller_referrer')
    expect(auction.state.schema.global.bytes).toBe(DEPLOYED_AUCTION.child.spec.state.schema.global.bytes + 1)
    // the deployed raffle child predates min_entries / failed / raffle_round too (ride-along uints).
    // 2.0.0 moved its weight totals out of the `w_totals` global into a box (no fixed number of
    // weights boxes), so the raffle child gains seller_referrer and loses w_totals.
    expect(keyNames(DEPLOYED_RAFFLE.child.spec)).toContain('w_totals')
    expect(keyNames(raffle)).not.toContain('w_totals')
    expect(raffle.state.schema.global.bytes).toBe(DEPLOYED_RAFFLE.child.spec.state.schema.global.bytes)
  })

  test('child create takes the forwarded sellerReferrer as its last argument', () => {
    const create = (spec: Spec) => signatures(spec).find((s) => s.startsWith('create('))!
    expect(create(auction).endsWith(',address)void')).toBe(true)
    expect(create(raffle).endsWith(',address)void')).toBe(true)
  })

  // TRADE-3/TRADE-5 (2026-10-05) took the Auction child from 4 to 5 pages (+100,000 µA child MBR, refunded at deletion)
  test('the Auction child fits 5 pages and the Raffle child 4 pages', () => {
    const clear = Buffer.from(auction.byteCode.clear, 'base64').length
    expect(approval(auction).length + clear).toBeLessThanOrEqual(5 * 2048)
    expect(approval(raffle).length + Buffer.from(raffle.byteCode.clear, 'base64').length).toBeLessThanOrEqual(8192)
  })
})

describe('§7.2: hinted overloads plus legacy shims with the deployed selectors', () => {
  const cases: [string, Spec, Record<string, string[]>, { methods: Spec['methods'] }][] = [
    ['Auction', auction, AUCTION_GATED, DEPLOYED_AUCTION.child.spec as never],
    ['AuctionFactory', auctionFactory, AUCTION_CREATE, DEPLOYED_AUCTION.factory.spec as never],
    ['Raffle', raffle, RAFFLE_GATED, DEPLOYED_RAFFLE.child.spec as never],
  ]
  for (const [name, spec, methods, deployed] of cases) {
    test(`${name}: both overloads exist, and each legacy one is the deployed signature`, () => {
      const sigs = signatures(spec)
      const deployedSigs = signatures(deployed)
      for (const [hinted, legacy] of Object.values(methods)) {
        expect(sigs).toContain(hinted)
        expect(sigs).toContain(legacy)
        expect(deployedSigs).toContain(legacy)
      }
    })
  }

  test('the Raffle source replaced the outer-selector compares with xImpl(gated) (P2-RAF-01)', () => {
    const source = readFileSync(path.resolve(__dirname, '../raffle/contract.algo.ts'), 'utf8')
    expect(source).not.toMatch(/methodSelector/)
    expect(source.match(/Impl\([^)]*, true\)/g)?.length).toBe(8)
  })
})

describe('K6 (Kyle, 2026-10-04): the RaffleFactory has no legacy creation shims', () => {
  test('the DEPLOYED creation selectors are neither in the ABI nor in the approval program (no route)', () => {
    const sigs = signatures(raffleFactory)
    for (const [hinted, deployed] of Object.values(RAFFLE_CREATE)) {
      // the deployed form really is MainNet's (vendored bytecode), so the check is not vacuous
      expect(signatures(DEPLOYED_RAFFLE.factory.spec as never)).toContain(deployed)
      expect(calls(DEPLOYED_RAFFLE.factory.spec as never, deployed)).toBe(true)
      expect(sigs).toContain(hinted)
      expect(sigs).not.toContain(deployed)
      // the ARC-4 router matches on 4-byte selector constants: absent bytes = no route
      expect(calls(raffleFactory, deployed)).toBe(false)
      expect(calls(raffleFactory, hinted)).toBe(true)
    }
    expect(sigs.filter((s) => /^new(PrizeBox)?Raffle\(/.test(s)).sort()).toEqual(Object.values(RAFFLE_CREATE).map(([hinted]) => hinted).sort())
  })

  test('the TEAL router has no method branch for the deployed creation selectors', () => {
    const teal = readFileSync(path.join(artifacts, 'raffle/RaffleFactory.approval.teal'), 'utf8')
    for (const [hinted, deployed] of Object.values(RAFFLE_CREATE)) {
      expect(teal).not.toContain(`0x${selector(deployed)}`)
      expect(teal).toContain(`0x${selector(hinted)}`)
    }
  })

  test('why no shim: the HEAD SDK direct quote hard-codes 21 uints / 9 byte slices and whole weights boxes, never the new child\'s price', () => {
    // HEAD (e7f174ee) RaffleFactorySDK.cost(): 400,000 + 28,500 * 21 + 50,000 * 9 = 1,448,500 (+ child funding + fee),
    // plus 13,113,300 for each weights box it reserved. The deployed RafflePlugins never matched the deployed
    // factory's payment at all (audit AR-14), so their creation path is already dead on MainNet; the mismatch is
    // what breaks HEAD-SDK direct creation. The new child declares two more uints (57,000 µA) and the same number
    // of byte slices (seller_referrer in, w_totals out), and the factory asks 2,900 µA for its totals box where
    // the old quote paid for at least four weights boxes: the factory wants the exact amount, so neither fits.
    const deployed = DEPLOYED_RAFFLE.child.spec.state.schema.global
    expect([deployed.ints, deployed.bytes]).toEqual([21, 9])
    const now = raffle.state.schema.global
    expect((now.ints - deployed.ints) * 28_500 + (now.bytes - deployed.bytes) * 50_000).toBe(57_000)
    // the deployed factory has no cost method an old caller could have used to re-quote
    expect(DEPLOYED_RAFFLE.factory.spec.methods.map((m) => m.name)).not.toContain('newRaffleCost')
  })

  test('the installed RaffleFactory approval is the logged whole-tree build (Phase 2 proposes these exact bytes)', () => {
    // IMPLEMENTATION-LOG 2026-10-04 "K6" section and spec §9.2/§9.3. A single-file build
    // (`build-contracts.mjs raffle/factory.algo.ts`) gives the same size but different bytes (router order; the review measured sha256
    // c7831971…). If this fails, rebuild from a WHOLE-TREE compile, or, if the source really changed, update this pin,
    // spec §9.2 and the log together, and re-run the RaffleFactory e2e specs before any Phase 2 proposal.
    // re-pinned 2026-10-05 for TRADE-2 (prize clawback/freeze reject), from a whole-tree compile
    // re-pinned 2026-10-11 for the referral reclaim target (reclaimTo in the Rewards v2 record; child funding uses the
    // 54,500 disbursement MBR), from a whole-tree compile
    // re-pinned 2026-11-25 for the 2.0.0 audit batch (the revenue escrow opt-in charges for the escrow only,
    // audit DAO-07), from a whole-tree compile
    // re-pinned 2026-11-25 for the entrant cap removal (a raffle reserves no weights boxes: creation funds only the
    // child's totals box, and the child declares one global byte slice less), from a whole-tree compile. The size and
    // hash of every program of a release are in release/manifest.json.
    const bytes = approval(raffleFactory)
    expect(bytes.length).toBe(3_751)
    expect(createHash('sha256').update(bytes).digest('hex')).toBe('56c5f5a9cfe20ce792f28fa7b16f117335df02a7321e5ed6e743544f4020a4be')
  })
})

describe('§6.11: v3 plugins', () => {
  test('AuctionPlugin hints the factory and serves both child generations', () => {
    expect(calls(auctionPlugin, AUCTION_CREATE.newAuction[0])).toBe(true)
    expect(calls(auctionPlugin, AUCTION_CREATE.newPrizeBoxAuction[0])).toBe(true)
    expect(calls(auctionPlugin, AUCTION_CREATE.newAuction[1])).toBe(false)
    for (const [hinted, legacy] of Object.values(AUCTION_GATED)) {
      expect(calls(auctionPlugin, hinted)).toBe(true)
      expect(calls(auctionPlugin, legacy)).toBe(true)
    }
    expect(calls(auctionPlugin, MUST_CHECK_FOR)).toBe(true)
    expect(calls(auctionPlugin, MUST_CHECK)).toBe(true)
  })

  test('RafflePlugin hints the factory and serves both child generations', () => {
    // only the hinted factory methods: the deployed creation selectors are not routed by the upgraded factory (K6)
    expect(calls(rafflePlugin, RAFFLE_CREATE.newRaffle[0])).toBe(true)
    expect(calls(rafflePlugin, RAFFLE_CREATE.newPrizeBoxRaffle[0])).toBe(true)
    expect(calls(rafflePlugin, RAFFLE_CREATE.newRaffle[1])).toBe(false)
    expect(calls(rafflePlugin, RAFFLE_CREATE.newPrizeBoxRaffle[1])).toBe(false)
    for (const [hinted, legacy] of Object.values(RAFFLE_GATED)) {
      expect(calls(rafflePlugin, hinted)).toBe(true)
      expect(calls(rafflePlugin, legacy)).toBe(true)
    }
    expect(calls(rafflePlugin, MUST_CHECK_FOR)).toBe(true)
    expect(calls(rafflePlugin, MUST_CHECK)).toBe(true)
  })

  test('plugin ABIs keep EVERY deployed signature (grants and SDK wrappers carry over, §6.11 / §7.3)', () => {
    // every method of the deployed plugin (MainNet bytecode) must still exist, with the same signature
    for (const [plugin, deployed] of [[auctionPlugin, DEPLOYED_AUCTION.plugin.spec], [rafflePlugin, DEPLOYED_RAFFLE.plugin.spec]] as const) {
      const current = signatures(plugin)
      const missing = signatures(deployed as never).filter((s) => !current.includes(s))
      expect(missing).toEqual([])
    }
    // the raffle creation methods: deployed form (no minEntries) + the AR-C minEntries overload
    const raffleSigs = signatures(rafflePlugin)
    for (const s of [
      'newRaffle(uint64,bool,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,string,byte[32][],uint64)uint64',
      'newRaffle(uint64,bool,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,string,byte[32][],uint64)uint64',
      'newPrizeBoxRaffle(uint64,bool,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64',
      'newPrizeBoxRaffle(uint64,bool,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64',
    ]) {
      expect(raffleSigs).toContain(s)
    }
    expect(signatures(auctionPlugin)).toContain('listPrizeBox(uint64,bool,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64')
  })

  test('new plugin methods beyond the deployed ABI are exactly the known additions (§7.3 grant additions)', () => {
    const added = (plugin: Spec, deployed: unknown) => signatures(plugin).filter((s) => !signatures(deployed as never).includes(s)).sort()
    expect(added(auctionPlugin, DEPLOYED_AUCTION.plugin.spec)).toEqual(['refundMBR(uint64,bool,uint64,uint64)void'])
    expect(added(rafflePlugin, DEPLOYED_RAFFLE.plugin.spec)).toEqual([
      'clearWeightsBoxes(uint64,bool,uint64)void',
      'newPrizeBoxRaffle(uint64,bool,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64',
      'newRaffle(uint64,bool,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,string,byte[32][],uint64)uint64',
      'refundMBR(uint64,bool,uint64,uint64)void',
      'setMinEntries(uint64,bool,uint64,uint64)void',
    ].sort())
  })
})
