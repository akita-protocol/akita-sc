import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import algosdk, { ABIType } from 'algosdk'
import { describe, expect, test } from 'vitest'
import {
  DEPLOYED_STAKING_POOL_CHILD,
  DEPLOYED_STAKING_POOL_PLUGIN,
  DEPLOYED_STAKING_POOL_PLUGIN_MAY_2026,
} from './compat/mainnet-programs'

/**
 * Static compatibility checks for the staking-pool track (PHASE-0-SPEC §6.5, §7.2, P2-CMP-01, P2-REF-02,
 * Q14). No LocalNet: they compare the built ARC-56 artifacts with the deployed MainNet bytecode.
 */

type Arc56 = {
  name: string
  methods: { name: string; args: { type: string }[]; returns: { type: string }; readonly?: boolean }[]
  structs: Record<string, { name: string; type: string }[]>
  state: { schema: { global: { ints: number; bytes: number } }; keys: { global: Record<string, { key: string }> } }
  byteCode: { approval: string; clear: string }
}

const artifacts = path.resolve(__dirname, '../artifacts')
const spec = (rel: string): Arc56 => JSON.parse(readFileSync(path.join(artifacts, rel), 'utf8'))
const child = spec('staking-pool/StakingPool.arc56.json')
const factory = spec('staking-pool/StakingPoolFactory.arc56.json')
const plugin = spec('arc58/plugins/staking-pool/StakingPoolPlugin.arc56.json')

const signature = (m: Arc56['methods'][number]) => `${m.name}(${m.args.map((a) => a.type).join(',')})${m.returns.type}`
const signatures = (s: Arc56) => s.methods.map(signature)
const selector = (sig: string) => Buffer.from(algosdk.ABIMethod.fromSignature(sig).getSelector()).toString('hex')
const programHex = (b64: string) => Buffer.from(b64, 'base64').toString('hex')
const sha256 = (b64: string) => createHash('sha256').update(Buffer.from(b64, 'base64')).digest('hex')

const ENTRIES = '(uint64,uint64,byte[32][])[]'
const LEGACY = {
  enterCost: `enterCost(address,${ENTRIES})uint64`,
  gatedEnter: `gatedEnter(pay,appl,${ENTRIES})void`,
  newPool: 'newPool(pay,string,uint8,address,(address,string),uint64,bool,uint64,uint64)uint64',
  newPoolCost: 'newPoolCost()uint64',
}
const HINTED = {
  enterCost: `enterCost(address,${ENTRIES},byte[][],uint64)uint64`,
  gatedEnter: `gatedEnter(pay,appl,${ENTRIES},uint64)void`,
  newPool: 'newPool(pay,string,uint8,address,(address,string),uint64,bool,uint64,uint64,uint64)uint64',
  newPoolCost: 'newPoolCost(uint64)uint64',
}

/** Child/factory methods each deployed plugin generation calls (re-derived from their bytecode). */
const CHILD_CALLS_JULY = [LEGACY.enterCost, LEGACY.gatedEnter, `enter(pay,${ENTRIES})void`, 'init(uint64)void', 'finalize(uint64,uint64,uint64)void',
  'addReward(pay,(uint64,uint8,uint64,uint64,uint64,uint64))void', 'addRewardAsa(pay,axfer,(uint64,uint8,uint64,uint64,uint64,uint64))void', 'optIn(pay,uint64)void']
const CHILD_CALLS_MAY = [LEGACY.gatedEnter, `enter(pay,${ENTRIES})void`, 'isEntered(address)bool', 'finalize(uint64,uint64,uint64)void',
  'addReward(pay,(uint64,uint8,uint64,uint64,uint64,uint64))void', 'addRewardAsa(pay,axfer,(uint64,uint8,uint64,uint64,uint64,uint64))void', 'optIn(pay,uint64)void']
const FACTORY_CALLS_JULY = [LEGACY.newPool, LEGACY.newPoolCost, 'deletePool(uint64)void']
const FACTORY_CALLS_MAY = [LEGACY.newPool, 'deletePool(uint64)void']

describe('staking-pool compatibility (static)', () => {
  test('the MainNet snapshots are intact', () => {
    expect(sha256(DEPLOYED_STAKING_POOL_PLUGIN.approval)).toBe(DEPLOYED_STAKING_POOL_PLUGIN.approvalSha256)
    expect(sha256(DEPLOYED_STAKING_POOL_PLUGIN_MAY_2026.approval)).toBe(DEPLOYED_STAKING_POOL_PLUGIN_MAY_2026.approvalSha256)
    expect(sha256(DEPLOYED_STAKING_POOL_CHILD.approval)).toBe(DEPLOYED_STAKING_POOL_CHILD.approvalSha256)
  })

  test('§7.2: the child keeps every legacy selector next to the hinted overloads', () => {
    const sigs = signatures(child)
    for (const sig of [LEGACY.enterCost, LEGACY.gatedEnter, HINTED.enterCost, HINTED.gatedEnter,
      `enter(pay,${ENTRIES})void`, 'gateCheck(address,uint64)void', 'getStoredPrincipal(address)(uint64,address)']) {
      expect(sigs, sig).toContain(sig)
    }
    // the hint is the LAST argument, typed uint64
    for (const sig of [HINTED.enterCost, HINTED.gatedEnter]) expect(sig).toMatch(/,uint64\)(void|uint64)$/)
    expect(child.methods.find((m) => signature(m) === HINTED.enterCost)?.readonly).toBe(true)
    expect(child.methods.find((m) => signature(m) === LEGACY.enterCost)?.readonly).toBe(true)
  })

  test('§7.2: the factory keeps the legacy newPool/newPoolCost next to the hinted overloads', () => {
    const sigs = signatures(factory)
    for (const sig of [...Object.values(LEGACY).filter((s) => s.startsWith('newPool')), HINTED.newPool, HINTED.newPoolCost]) {
      expect(sigs, sig).toContain(sig)
    }
  })

  test('P2-CMP-01: every target selector a deployed plugin generation calls is still implemented', () => {
    for (const [name, program, childCalls, factoryCalls] of [
      ['July 2026 (3642438287)', DEPLOYED_STAKING_POOL_PLUGIN.approval, CHILD_CALLS_JULY, FACTORY_CALLS_JULY],
      ['May 2026 (3569562283)', DEPLOYED_STAKING_POOL_PLUGIN_MAY_2026.approval, CHILD_CALLS_MAY, FACTORY_CALLS_MAY],
    ] as const) {
      const hex = programHex(program)
      for (const sig of childCalls) {
        expect(hex.includes(selector(sig)), `${name} calls ${sig}`).toBe(true)
        expect(signatures(child), `${name}: new child implements ${sig}`).toContain(sig)
      }
      for (const sig of factoryCalls) {
        expect(hex.includes(selector(sig)), `${name} calls ${sig}`).toBe(true)
        expect(signatures(factory), `${name}: new factory implements ${sig}`).toContain(sig)
      }
      // the deployed plugins gate through the legacy Gate.mustCheck(address,...)
      expect(hex.includes(selector('mustCheck(address,uint64,byte[][])void'))).toBe(true)
    }
  })

  test('§6.11: the new plugin version keeps the deployed plugin ABI exactly (method restrictions carry over)', () => {
    const deployed = programHex(DEPLOYED_STAKING_POOL_PLUGIN.approval)
    for (const sig of signatures(plugin)) {
      expect(deployed.includes(selector(sig)), `deployed plugin routes ${sig}`).toBe(true)
    }
    expect(plugin.methods).toHaveLength(8)
    // its global schema matches the deployed plugin (create args unchanged)
    expect(plugin.state.schema.global).toEqual({ ints: DEPLOYED_STAKING_POOL_PLUGIN.globalInts, bytes: DEPLOYED_STAKING_POOL_PLUGIN.globalByteSlices })
  })

  test('P2-REF-02: the legacy-child branch of the new plugin only needs selectors the deployed child has', () => {
    const deployedChild = programHex(DEPLOYED_STAKING_POOL_CHILD.approval)
    for (const sig of [LEGACY.enterCost, LEGACY.gatedEnter, `enter(pay,${ENTRIES})void`]) {
      expect(deployedChild.includes(selector(sig)), sig).toBe(true)
    }
    // ... and none of the hinted selectors
    for (const sig of [HINTED.enterCost, HINTED.gatedEnter]) {
      expect(deployedChild.includes(selector(sig)), sig).toBe(false)
    }
    // the new plugin calls both generations: hinted and legacy selectors are compiled in
    const pluginHex = programHex(plugin.byteCode.approval)
    for (const sig of [HINTED.enterCost, HINTED.gatedEnter, LEGACY.enterCost, LEGACY.gatedEnter, HINTED.newPool, HINTED.newPoolCost]) {
      expect(pluginHex.includes(selector(sig)), sig).toBe(true)
    }
    for (const sig of [LEGACY.newPool, LEGACY.newPoolCost]) {
      expect(pluginHex.includes(selector(sig)), `new plugin never calls ${sig}`).toBe(false)
    }
  })

  test('pv marker: one more global uint on the child (the factory charges it through the schema)', () => {
    expect(child.state.schema.global).toEqual({ ints: 13, bytes: 10 })
    expect(Buffer.from(child.state.keys.global.principalVersion.key, 'base64').toString()).toBe('pv')
    // the boxed child must still fit the factory's four 4 KB chunks (AVM 13: 16 KB incl. clear)
    expect(Buffer.from(child.byteCode.approval, 'base64').length + Buffer.from(child.byteCode.clear, 'base64').length).toBeLessThanOrEqual(16_384)
  })

  test('Q14: entry boxes: legacyCharged and heldOut pack into the disqualified byte; exact MBR formula', () => {
    const fields = child.structs.EntryData.map((f) => `${f.name}:${f.type}`)
    expect(fields).toEqual(['address:address', 'asset:uint64', 'quantity:uint64', 'gateArgs:byte[][]', 'disqualified:bool', 'legacyCharged:bool', 'heldOut:bool'])
    const withFlag = ABIType.from('(address,uint64,uint64,byte[][],bool,bool,bool)')
    const withoutFlag = ABIType.from('(address,uint64,uint64,byte[][],bool)')
    const zero = algosdk.ALGORAND_ZERO_ADDRESS_STRING
    for (const args of [[], [new Uint8Array(72)], [new Uint8Array(32), new Uint8Array(40)]]) {
      const encoded = withFlag.encode([zero, 1n, 1n, args, true, true, true])
      // same size as the pre-flag layout (older decoders and box sizes unchanged)
      expect(encoded.length).toBe(withoutFlag.encode([zero, 1n, 1n, args, true]).length)
      const argsLen = ABIType.from('byte[][]').encode(args).length
      // key 'e' + uint64 = 9 bytes; head 51 bytes; tail = encoded gate args
      expect(9 + encoded.length).toBe(60 + argsLen)
    }
    // empty args: 2_500 + 400 * 62 = 27_300 (mbr().entries); entriesByAddress 2_500 + 400 * 49 = 22_100
    expect(2_500 + 400 * (60 + 2)).toBe(27_300)
    expect(2_500 + 400 * (1 + 32 + 8 + 8)).toBe(22_100)
    // the stored pair 'i': 2_500 + 400 * ((1 + 32) + (8 + 32)) = 31_700
    expect(2_500 + 400 * (33 + 40)).toBe(31_700)
  })
})
