/**
 * Static compatibility facts read from the vendored MainNet programs (`compat/mainnet-deployed.json`),
 * no LocalNet needed. They pin the bytecode reading behind the 2026-10-04 marketplace review fixes
 * (docs/principal-resolution/IMPLEMENTATION-LOG.md):
 * - the deployed Listing never pays a seller referral (P2-REF-01/02 re-derived);
 * - the deployed MarketplacePlugin routes the pre-MKT-02 `purchase` selector and the `list` selector
 *   without the seller's royalty bound, which the working-tree plugin no longer routes (the SDK picks
 *   the ABI by plugin id).
 */
import algosdk from 'algosdk'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, test } from 'vitest'

const here = path.dirname(fileURLToPath(import.meta.url))
const deployed = JSON.parse(readFileSync(path.join(here, 'compat', 'mainnet-deployed.json'), 'utf8')) as {
  marketplacePlugin: { approval: string }
  listing: { approval: string }
}
const program = (b64: string) => Buffer.from(b64, 'base64')
const selector = (signature: string) => Buffer.from(algosdk.ABIMethod.fromSignature(signature).getSelector())
const count = (haystack: Buffer, needle: Buffer) => {
  let n = 0
  for (let i = haystack.indexOf(needle); i >= 0; i = haystack.indexOf(needle, i + 1)) n++
  return n
}

const newPlugin = JSON.parse(readFileSync(path.join(here, '..', 'artifacts', 'arc58', 'plugins', 'marketplace', 'MarketplacePlugin.arc56.json'), 'utf8')) as {
  methods: { name: string; args: { type: string }[]; returns: { type: string } }[]
}
const newPluginSignatures = newPlugin.methods.map((m) => `${m.name}(${m.args.map((a) => a.type).join(',')})${m.returns.type}`)

describe('deployed Marketplace generation (static)', () => {
  test('P2-REF-02: the deployed Listing looks up EscrowFactory.get(txn Sender), and txn Sender is always the factory', () => {
    const listing = program(deployed.listing.approval)
    // the only registry read: EscrowFactory.get(address)byte[]
    expect(count(listing, selector('get(address)byte[]'))).toBe(1)
    // referral subroutine: `txn Sender; frame_dig -3; pushbytes "oal"; app_global_get_ex` builds the get() argument
    expect(count(listing, Buffer.from('31008bfd80036f616c65', 'hex'))).toBe(1)
    // purchase / purchaseAsa / delist / optin: `txn Sender; global CreatorAddress; ==` (only the factory may call)
    expect(count(listing, Buffer.from('3100320912', 'hex'))).toBeGreaterThanOrEqual(3)
  })

  test('the deployed plugin routes purchase without maxPrice (0x269e4bb0); the working-tree plugin routes only the maxPrice form', () => {
    const plugin = program(deployed.marketplacePlugin.approval)
    const legacy = 'purchase(uint64,bool,uint64,address,byte[][])void'
    const current = 'purchase(uint64,bool,uint64,address,uint64,byte[][])void'
    expect(selector(legacy).toString('hex')).toBe('269e4bb0')
    expect(count(plugin, selector(legacy))).toBe(1)
    expect(count(plugin, selector(current))).toBe(0)
    expect(newPluginSignatures).toContain(current)
    expect(newPluginSignatures).not.toContain(legacy)
  })

  test('the deployed plugin routes list without the royalty bound; the working-tree plugin routes only the bounded form', () => {
    const plugin = program(deployed.marketplacePlugin.approval)
    const legacy = 'list(uint64,bool,uint64,uint64,uint64,uint64,uint64,address,uint64,address,string,byte[32][])uint64'
    const current = 'list(uint64,bool,uint64,uint64,uint64,uint64,uint64,address,uint64,address,string,byte[32][],uint64)uint64'
    expect(count(plugin, selector(legacy))).toBe(1)
    expect(count(plugin, selector(current))).toBe(0)
    expect(newPluginSignatures).toContain(current)
    expect(newPluginSignatures).not.toContain(legacy)
  })

  test('every other deployed plugin method keeps its selector', () => {
    const plugin = program(deployed.marketplacePlugin.approval)
    const changed = ['purchase(', 'list(', 'createApplication(']
    const kept = newPluginSignatures.filter((s) => !changed.some((prefix) => s.startsWith(prefix)))
    expect(kept.map((s) => s.slice(0, s.indexOf('('))).sort()).toEqual(['changePrice', 'delist', 'listPrizeBox', 'opUp', 'updateAkitaDAO'])
    for (const signature of kept) {
      expect(count(plugin, selector(signature))).toBe(1)
    }
  })
})
