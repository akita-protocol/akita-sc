import { readFileSync } from 'node:fs'
import path from 'node:path'
import algosdk from 'algosdk'
import { describe, expect, test } from 'vitest'
import { SUBSCRIPTION_PRINCIPAL_MBR, SUBSCRIPTIONS_ERROR_MESSAGES } from 'akita-sdk/subscriptions'
import { errNoLegacyWallet, errNotGated, errPrincipalExists } from './errors'

/**
 * Static half of the principal-resolution compatibility suite for Subscriptions (no LocalNet).
 * PHASE-0-SPEC.md §6.4 (hinted selectors + legacy shims), §7.1 P2-CMP-01 (deployed bytecode is the
 * baseline) and P2-ABI-01 (both selectors of an overloaded name are in the ARC-56).
 *
 * The deployed MainNet programs are vendored in `compat/mainnet-programs.json` (read-only snapshot of
 * algod `GET /v2/applications/{id}`). A deployed plugin calls the Subscriptions methods whose 4-byte
 * selectors appear in its program; every such selector must still be routed by the upgraded contract.
 */

type Arc56 = {
  methods: { name: string; args: { type: string }[]; returns: { type: string }; readonly?: boolean }[]
  byteCode?: { approval: string; clear: string }
}
type DeployedApp = { role: string; approval: string; clear: string; approvalSha256: string }
type Programs = { deployedSubscriptionsSignatures: string[]; apps: Record<string, DeployedApp> }

const root = path.resolve(__dirname, '..')
const readJson = <T>(file: string): T => JSON.parse(readFileSync(path.join(root, file), 'utf8')) as T

const subscriptions = readJson<Arc56>('artifacts/subscriptions/Subscriptions.arc56.json')
const plugin = readJson<Arc56>('artifacts/arc58/plugins/subscriptions/SubscriptionsPlugin.arc56.json')
const programs = readJson<Programs>('subscriptions/compat/mainnet-programs.json')

const signature = (m: Arc56['methods'][number]) => `${m.name}(${m.args.map((a) => a.type).join(',')})${m.returns.type}`
const selector = (sig: string) => Buffer.from(algosdk.ABIMethod.fromSignature(sig).getSelector())
const contains = (program: Buffer, sig: string) => program.includes(selector(sig))
const approval = (b64: string) => Buffer.from(b64, 'base64')

const subscriptionSignatures = subscriptions.methods.map(signature)
/** `constants.ts` imports arc4 runtime types, so read the value from the source instead of importing it */
const SubscriptionPrincipalMBR = Number(
  /SubscriptionPrincipalMBR: uint64 = ([\d_]+)/.exec(readFileSync(path.join(root, 'subscriptions/constants.ts'), 'utf8'))![1].replace(/_/g, ''),
)
const hinted = (legacy: string) => legacy.replace(/\)([^)(]*)$/, ',uint64)$1')

/** pre-hint selector → hinted selector (trailing `wallet: uint64`) */
const OVERLOADS = [
  'newService(pay,uint64,uint64,uint64,uint64,uint64,address,string,byte[36],uint8,byte[3])uint64',
  'gatedSubscribe(pay,appl,address,uint64,uint64,uint64)uint64',
  'subscribe(pay,address,uint64,uint64,uint64)uint64',
  'gatedSubscribeAsa(pay,axfer,appl,address,uint64,uint64,uint64)uint64',
  'subscribeAsa(pay,axfer,address,uint64,uint64,uint64)uint64',
  'gatedTriggerPayment(appl,(address,uint64))void',
  'newServiceCost(uint64)uint64',
  'newSubscriptionCost(address,uint64,uint64)uint64',
]

describe('Subscriptions principal-resolution ABI (P2-ABI-01, §6.4)', () => {
  test('every overloaded name exposes the legacy shim and the hinted selector', () => {
    for (const legacy of OVERLOADS) {
      expect(subscriptionSignatures, legacy).toContain(legacy)
      expect(subscriptionSignatures, hinted(legacy)).toContain(hinted(legacy))
    }
  })

  test('new methods: triggerGateCtx (readonly, returns the GateCtx tuple) and adoptPrincipal', () => {
    const ctx = subscriptions.methods.find((m) => m.name === 'triggerGateCtx')!
    expect(signature(ctx)).toBe('triggerGateCtx((address,uint64),uint64)(address,uint64,address)')
    expect(ctx.readonly).toBe(true)
    expect(subscriptionSignatures).toContain('adoptPrincipal(pay,(address,uint64))void')
  })

  test('readonly flags carry over to both cost selectors', () => {
    for (const name of ['newServiceCost', 'newSubscriptionCost']) {
      const methods = subscriptions.methods.filter((m) => m.name === name)
      expect(methods).toHaveLength(2)
      expect(methods.every((m) => m.readonly)).toBe(true)
    }
  })

  test('the ungated triggerPayment keeps its single selector', () => {
    expect(subscriptions.methods.filter((m) => m.name === 'triggerPayment').map(signature)).toEqual(['triggerPayment((address,uint64))void'])
  })

  test('the approval program fits the 5 extra pages the LocalNet fixture allots', () => {
    // The payer records of 2026-11-15 took Subscriptions past 10,240 bytes. A sixth page is the plan:
    // the fixture creates it with 5 extra pages, and the rollout grows the MainNet app to match.
    const size = approval(subscriptions.byteCode!.approval).length + approval(subscriptions.byteCode!.clear).length
    expect(size).toBeLessThanOrEqual(6 * 2048)
  })
})

describe('Deployed bytecode compatibility (static half of P2-CMP-01)', () => {
  const deployedSubscriptions = Object.values(programs.apps).find((a) => a.role === 'Subscriptions')!
  const deployedPlugins = Object.entries(programs.apps).filter(([, a]) => a.role === 'SubscriptionsPlugin')

  test('the vendored deployed Subscriptions program serves exactly the recorded signatures', () => {
    const program = approval(deployedSubscriptions.approval)
    for (const sig of programs.deployedSubscriptionsSignatures) expect(contains(program, sig), sig).toBe(true)
  })

  test('no deployed Subscriptions selector is dropped by the upgrade', () => {
    for (const sig of programs.deployedSubscriptionsSignatures) expect(subscriptionSignatures, sig).toContain(sig)
  })

  test.each(deployedPlugins)('deployed plugin %s: every Subscriptions selector it calls (and MainNet serves) is still routed', (_id, app) => {
    const program = approval(app.approval)
    const called = programs.deployedSubscriptionsSignatures.filter((sig) => contains(program, sig))
    expect(called.length).toBeGreaterThan(0)
    for (const sig of called) expect(subscriptionSignatures, sig).toContain(sig)
  })

  test('the May 2026 plugin uses the legacy gatedTriggerPayment selector (P2-SUB-01 needs the shim)', () => {
    const may = approval(programs.apps['3569561107'].approval)
    expect(contains(may, 'gatedTriggerPayment(appl,(address,uint64))void')).toBe(true)
    expect(contains(may, 'newSubscriptionCost(address,uint64,uint64)uint64')).toBe(true)
  })
})

describe('New Subscriptions plugin version (§6.11)', () => {
  const program = approval(plugin.byteCode!.approval)

  test('the plugin ABI is unchanged for every pre-existing method', () => {
    const deployed = approval(programs.apps['3569561107'].approval)
    for (const m of plugin.methods) {
      const sig = signature(m)
      // methods added after the May 2026 deployment are not in it: deposit/withdraw/unsubscribe, and the
      // creator-editable highlight and featured service (2026-11-16)
      if ([
        'deposit', 'withdraw', 'unsubscribe',
        'updateServiceHighlight', 'setFeaturedService', 'clearFeaturedService',
      ].includes(m.name)) continue
      expect(contains(deployed, sig), sig).toBe(true)
    }
  })

  test('calls only hinted Subscriptions selectors, triggerGateCtx and Gate.mustCheckFor', () => {
    for (const legacy of OVERLOADS) {
      expect(contains(program, legacy), `legacy ${legacy}`).toBe(false)
    }
    for (const sig of [
      hinted('newServiceCost(uint64)uint64'),
      hinted('newService(pay,uint64,uint64,uint64,uint64,uint64,address,string,byte[36],uint8,byte[3])uint64'),
      hinted('newSubscriptionCost(address,uint64,uint64)uint64'),
      hinted('gatedSubscribe(pay,appl,address,uint64,uint64,uint64)uint64'),
      hinted('subscribe(pay,address,uint64,uint64,uint64)uint64'),
      hinted('gatedSubscribeAsa(pay,axfer,appl,address,uint64,uint64,uint64)uint64'),
      hinted('subscribeAsa(pay,axfer,address,uint64,uint64,uint64)uint64'),
      hinted('gatedTriggerPayment(appl,(address,uint64))void'),
      'triggerGateCtx((address,uint64),uint64)(address,uint64,address)',
      'mustCheckFor((address,uint64,address),uint64,byte[][])void',
    ]) {
      expect(contains(program, sig), sig).toBe(true)
    }
  })

  test('never reads the EscrowFactory registry and never builds a plain Gate.mustCheck', () => {
    expect(contains(program, 'get(address)byte[]')).toBe(false)
    expect(contains(program, 'mustCheck(address,uint64,byte[][])void')).toBe(false)
  })
})

describe('Stored principal pair constants', () => {
  test("'i' box MBR = 2_500 + 400 * (('i' + 32 + 8) + (8 + 32)), mirrored in the SDK", () => {
    expect(BigInt(SubscriptionPrincipalMBR)).toBe(34_900n)
    expect(2_500 + 400 * ((1 + 32 + 8) + (8 + 32))).toBe(34_900)
    expect(SUBSCRIPTION_PRINCIPAL_MBR).toBe(34_900n)
  })

  test('new error codes are 7-char camelCase and translated by the SDK', () => {
    for (const code of [errPrincipalExists, errNoLegacyWallet, errNotGated]) {
      expect(code).toMatch(/^err[A-Z][a-z]{3}$/)
      expect(SUBSCRIPTIONS_ERROR_MESSAGES[code.slice(3).toUpperCase()]).toBeDefined()
    }
  })
})
