/**
 * Principal resolution, social track (docs/principal-resolution/PHASE-0-SPEC.md §6.2, §6.3, §6.11, §7.2).
 * Pure unit tests (no LocalNet): the ABI contract between the upgraded social targets, their legacy
 * shims, the deployed MainNet programs and the new social plugin version.
 *
 * P2-ABI-01 (social part): both selectors of every hinted method are in the ARC-56 spec and the typed
 * client exposes both overloads.
 */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { MAINNET_PLUGIN_DEPLOYMENTS } from 'akita-sdk'
import { describe, expect, test } from 'vitest'
import { AkitaSocialParamsFactory } from '../artifacts/social/AkitaSocialClient'
import { AkitaSocialGraphParamsFactory } from '../artifacts/social/AkitaSocialGraphClient'

type Arc56 = {
  methods: { name: string; args: { type: string; name?: string }[]; returns: { type: string } }[]
  byteCode?: { approval: string; clear: string }
}

const root = path.resolve(__dirname, '..')
const readJson = <T>(relative: string): T => JSON.parse(readFileSync(path.join(root, relative), 'utf8')) as T
/** Reads a `export const Name: uint64 = 12_345` constant from social/constants.ts (a PuyaTs file, not importable at runtime). */
const socialConstant = (name: string): number => {
  const match = readFileSync(path.join(root, 'social/constants.ts'), 'utf8').match(new RegExp(`export const ${name}: uint64 = ([0-9_]+)`))
  if (!match) throw new Error(`constant ${name} not found`)
  return Number(match[1].replaceAll('_', ''))
}
const signatures = (spec: Arc56) => spec.methods.map((m) => `${m.name}(${m.args.map((a) => a.type).join(',')})${m.returns.type}`)
const withHint = (signature: string) => signature.replace(/\)([^)]*)$/, ',uint64)$1')

const deployed = readJson<{ contracts: Record<string, { approvalSha256: string; approvalSize: number; methods: string[] }> }>(
  'social/deployed/mainnet-abi.json'
)
const social = readJson<Arc56>('artifacts/social/AkitaSocial.arc56.json')
const graph = readJson<Arc56>('artifacts/social/AkitaSocialGraph.arc56.json')
const plugin = readJson<Arc56>('artifacts/arc58/plugins/social/AkitaSocialPlugin.arc56.json')
const deployedPlugin = readJson<Arc56>('arc58/plugins/social/deployed/AkitaSocialPlugin.v0.0.3.arc56.json')

/** Spec §6.2 / §6.3: every method that gains the trailing `wallet: uint64` hint (legacy shim keeps the old selector). */
const HINTED_SOCIAL = ['post', 'editPost', 'reply', 'gatedReply', 'editReply', 'gatedEditReply', 'vote', 'editVote', 'react', 'gatedReact', 'initMeta']
const HINTED_GRAPH = ['gatedFollow']

describe('social legacy shims keep every deployed selector (§7.2)', () => {
  test.each([
    ['AkitaSocial', social],
    ['AkitaSocialGraph', graph],
  ] as const)('%s: every MainNet selector is still served', (name, spec) => {
    const current = new Set(signatures(spec))
    const missing = deployed.contracts[name].methods.filter((sig) => !current.has(sig))
    expect(missing).toEqual([])
  })

  test.each([
    ['AkitaSocial', social, HINTED_SOCIAL],
    ['AkitaSocialGraph', graph, HINTED_GRAPH],
  ] as const)('%s: each hinted method appends `wallet: uint64` as its LAST argument next to its shim', (name, spec, hinted) => {
    const current = new Set(signatures(spec))
    for (const method of hinted) {
      const legacy = deployed.contracts[name].methods.filter((sig) => sig.startsWith(`${method}(`))
      expect(legacy).toHaveLength(1)
      expect(current.has(legacy[0])).toBe(true)
      expect(current.has(withHint(legacy[0]))).toBe(true)

      const overloads = spec.methods.filter((m) => m.name === method)
      expect(overloads).toHaveLength(2)
      const [shim, hintedMethod] = [...overloads].sort((a, b) => a.args.length - b.args.length)
      expect(hintedMethod.args.length).toBe(shim.args.length + 1)
      expect(hintedMethod.args.at(-1)).toEqual(expect.objectContaining({ type: 'uint64', name: 'wallet' }))
    }
  })

  test('AkitaSocial: the only new methods besides the hinted overloads are setMetaWallet and the paying updateMeta', () => {
    const before = new Set(deployed.contracts.AkitaSocial.methods)
    const added = signatures(social).filter((sig) => !before.has(sig))
    expect(added.sort()).toEqual([
      ...HINTED_SOCIAL.map((m) => withHint(deployed.contracts.AkitaSocial.methods.find((s) => s.startsWith(`${m}(`))!)),
      'setMetaWallet(uint64)void',
      // setting a wall gate pays for the wall's posts box; the deployed selector stays as a shim
      'updateMeta(pay,uint64,uint64,uint64,uint64,uint64,uint64)void',
    ].sort())
    expect(before.has('updateMeta(uint64,uint64,uint64,uint64,uint64,uint64)void')).toBe(true)
    expect(signatures(social)).toContain('updateMeta(uint64,uint64,uint64,uint64,uint64,uint64)void')
  })

  test('typed clients expose both overloads under signature-suffixed names (no shared `post`)', () => {
    expect(typeof AkitaSocialParamsFactory.postPayAxferUint64Byte_24Byte_36Uint64BoolUint64Uint64Uint64Void).toBe('function')
    expect(typeof AkitaSocialParamsFactory.postPayAxferUint64Byte_24Byte_36Uint64BoolUint64Uint64Void).toBe('function')
    expect(typeof AkitaSocialParamsFactory.initMetaPayAddressBoolUint64Uint64Uint64Uint64Uint64).toBe('function')
    expect(typeof AkitaSocialParamsFactory.initMetaPayAddressBoolUint64Uint64Uint64Uint64).toBe('function')
    expect(typeof AkitaSocialGraphParamsFactory.gatedFollowPayApplAddressUint64Void).toBe('function')
    expect(typeof AkitaSocialGraphParamsFactory.gatedFollowPayApplAddressVoid).toBe('function')
    expect((AkitaSocialParamsFactory as unknown as Record<string, unknown>).post).toBeUndefined()
  })

  test('AkitaSocial fits the AVM 13 program limit (8 pages incl. clear)', () => {
    const approval = Buffer.from(social.byteCode!.approval, 'base64').length
    const clear = Buffer.from(social.byteCode!.clear, 'base64').length
    expect(approval + clear).toBeLessThanOrEqual(8 * 2048)
  })
})

describe('new social plugin version (§6.11): no existing method changes its ABI', () => {
  test('deployed v0.0.3 fixture is the MainNet program', () => {
    const approval = Buffer.from(deployedPlugin.byteCode!.approval, 'base64')
    expect(createHash('sha256').update(approval).digest('hex')).toBe(deployed.contracts.AkitaSocialPlugin.approvalSha256)
    expect(signatures(deployedPlugin)).toEqual(deployed.contracts.AkitaSocialPlugin.methods)
  })

  test('the new version = deployed ABI + setMetaWallet(uint64,bool)void', () => {
    const before = deployed.contracts.AkitaSocialPlugin.methods
    const now = signatures(plugin)
    expect(now.filter((sig) => !before.includes(sig))).toEqual(['setMetaWallet(uint64,bool)void'])
    expect(before.filter((sig) => !now.includes(sig))).toEqual([])
  })

  test('the new plugin still fits four program pages', () => {
    const approval = Buffer.from(plugin.byteCode!.approval, 'base64').length
    const clear = Buffer.from(plugin.byteCode!.clear, 'base64').length
    expect(approval + clear).toBeLessThanOrEqual(4 * 2048)
  })
})

describe('legacy shim payment terms match the deployed plugin quote (§7.2)', () => {
  test('constants the shims use to accept the deployed quote', () => {
    // the deployed plugin (HEAD e7f174ee social/constants.ts) quotes MinPostsMBR 46_500 and the
    // 16-byte-key reaction list (18_900); the current boxes cost 47_300 and 15_700
    expect(socialConstant('LegacyMinPostsMBR')).toBe(46_500)
    expect(socialConstant('MinPostsMBR') - socialConstant('LegacyMinPostsMBR')).toBe(800)
    expect(socialConstant('ReactionlistMBR')).toBe(18_900)
    expect(socialConstant('ReactionRecordMBR')).toBe(15_700)
  })
})

// Review fix (2026-10-04): the legacy payment terms are honoured only for the deployed social plugin
// programs (AkitaSocial.legacyTerms). LocalNet cannot run the MainNet branch (its genesis hash differs),
// so the pins are checked here against the SDK's MainNet deployment record and the compiled program.
describe('legacy payment terms are pinned to the deployed MainNet social plugins', () => {
  const pins = ['LegacySocialPluginDecember', 'LegacySocialPluginMay', 'LegacySocialPluginV002', 'LegacySocialPluginV003']
  const teal = readFileSync(path.join(root, 'artifacts/social/AkitaSocial.approval.teal'), 'utf8')
  const source = readFileSync(path.join(root, 'social/constants.ts'), 'utf8')

  test('the four pinned ids are exactly every MainNet social plugin the SDK records', () => {
    const recorded = MAINNET_PLUGIN_DEPLOYMENTS.socialPlugin.map((d) => Number(d.appId)).sort()
    expect(pins.map(socialConstant).sort()).toEqual(recorded)
    expect(recorded).toEqual([3_368_400_007, 3_569_562_087, 3_633_295_088, 3_643_581_007])
  })

  test('the MainNet genesis hash constant is the 32-byte mainnet-v1.0 hash', () => {
    const match = source.match(/export const MainNetGenesisHash = Bytes\.fromBase64\('([A-Za-z0-9+/=]+)', \{ length: 32 \}\)/)
    expect(match?.[1]).toBe('wGHE2Pwdvd7S12BL5FaOP20EGYesN73ktiC1qzkkit8=')
    expect(Buffer.from(match![1], 'base64').length).toBe(32)
  })

  test('the compiled legacyTerms checks the caller app, the genesis hash and every pinned id', () => {
    const start = teal.indexOf('\nlegacyTerms:')
    expect(start).toBeGreaterThan(0)
    // the subroutine runs until the next subroutine header
    const body = teal.slice(start, teal.indexOf('::AkitaSocial.', start))
    expect(body).toContain('global CallerApplicationID')
    expect(body).toContain('global GenesisHash')
    expect(body).toContain('pushbytes base64(wGHE2Pwdvd7S12BL5FaOP20EGYesN73ktiC1qzkkit8=)')
    for (const pin of pins) {
      expect(body).toContain(`pushint ${socialConstant(pin)}`)
    }
  })
})
