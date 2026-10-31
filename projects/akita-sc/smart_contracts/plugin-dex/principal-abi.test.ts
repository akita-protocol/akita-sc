import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

/**
 * Static regression gate for principal resolution in PluginDex (docs/principal-resolution/PHASE-0-SPEC.md §6.11,
 * §6.12). Reads the compiled ARC-56 artifacts and the sources, so it runs without LocalNet (build first).
 */
const root = path.resolve(__dirname, '..')
const artifacts = path.join(root, 'artifacts')

type Arc56 = {
  methods: { name: string; args: { name?: string; type: string; struct?: string }[]; returns: { type: string } }[]
  structs: Record<string, { name: string; type: string }[]>
}
const spec = (rel: string): Arc56 => JSON.parse(readFileSync(path.join(artifacts, rel), 'utf8'))
const signature = (m: Arc56['methods'][number]) => `${m.name}(${m.args.map((a) => a.type).join(',')})${m.returns.type}`
const method = (s: Arc56, name: string) => {
  const found = s.methods.filter((m) => m.name === name)
  expect(found, `${name} must exist exactly once`).toHaveLength(1)
  return found[0]
}

const sources = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name)
    if (entry.isDirectory()) return entry.name === 'research' ? [] : sources(file)
    return entry.name.endsWith('.ts') && !entry.name.endsWith('.spec.ts') && !entry.name.endsWith('.test.ts') ? [file] : []
  })

describe('PluginDex principal resolution (§6.12) — static', () => {
  const vault = spec('plugin-dex/PluginDex.arc56.json')

  test('swap, swapRoute, quote, quoteRoute, tryQuoteRoute take a trailing uint64 wallet hint', () => {
    for (const name of ['swap', 'swapRoute', 'quote', 'quoteRoute', 'tryQuoteRoute']) {
      const m = method(vault, name)
      const last = m.args[m.args.length - 1]
      expect([last.name, last.type], signature(m)).toEqual(['wallet', 'uint64'])
    }
    expect(signature(method(vault, 'swap'))).toBe('swap(txn,uint64,uint64,address,byte[],uint64)uint64')
    expect(signature(method(vault, 'quote'))).toBe('quote(uint64,uint64,uint64,address,byte[],uint64)uint64')
  })

  test('HookContext has wallet: uint64 immediately after callerApp, in every hook artifact', () => {
    const hookSpecs = [
      'plugin-dex/hooks/GatedFeeHook.arc56.json',
      'plugin-dex/hooks/AntiSnipeFeeHook.arc56.json',
      'plugin-dex/hooks/BackrunArbHook.arc56.json',
      'plugin-dex/hooks/ConsensusKeyregHook.arc56.json',
      'plugin-dex/hooks/ImpactFeeHook.arc56.json',
      'plugin-dex/hooks/LaunchTaxHook.arc56.json',
      'plugin-dex/hooks/SwapTaxHook.arc56.json',
      'plugin-dex/hooks/VolatilityFeeHook.arc56.json',
      'plugin-dex/tests/RecordingDexHook.arc56.json',
      'plugin-dex/tests/RouterRecordingHook.arc56.json',
      'plugin-dex/tests/MockDexHook.arc56.json',
      'plugin-dex/tests/MockUpdatableHook.arc56.json',
      'plugin-dex/curves/bins/tests/BinsTradeHook.arc56.json',
    ]
    const hookSignatures = new Set<string>()
    for (const rel of hookSpecs) {
      const s = spec(rel)
      const ctx = s.structs.HookContext
      expect(ctx, `${rel}: HookContext struct`).toBeDefined()
      const names = ctx.map((f) => f.name)
      expect(names.slice(4, 8), rel).toEqual(['caller', 'callerApp', 'wallet', 'recipient'])
      expect(ctx[names.indexOf('wallet')].type).toBe('uint64')
      hookSignatures.add(signature(method(s, 'akitaDexHook')))
    }
    // every hook exposes the same selector the Vault calls
    expect(hookSignatures.size).toBe(1)
  })

  test('GatedFeeHook pass methods are keyed by principal and take the caller\'s hint last', () => {
    const hook = spec('plugin-dex/hooks/GatedFeeHook.arc56.json')
    expect(method(hook, 'openPass').args.map((a) => a.name)).toEqual(['mbr', 'key', 'measure', 'gateArgs', 'wallet'])
    expect(method(hook, 'refresh').args.map((a) => a.name)).toEqual(['key', 'measure', 'gateArgs', 'wallet'])
    expect(method(hook, 'refreshFromGate').args.map((a) => a.name)).toEqual(['gateTxn', 'key', 'slot', 'wallet'])
    expect(method(hook, 'closePass').args.map((a) => a.name)).toEqual(['key', 'wallet'])
    expect(method(hook, 'getPass').args.map((a) => a.name)).toEqual(['key'])
  })

  test('GatedFeeHook resolves at BeforeSwap with the dex-ctx resolver, at Quote only with thirdPartyPrincipal', () => {
    const src = readFileSync(path.join(root, 'plugin-dex/hooks/gated-fee.algo.ts'), 'utf8')
    const passKey = src.slice(src.indexOf('private passKey('), src.indexOf('private price('))
    expect(passKey).toContain('resolvePrincipalFromDexCtx(walletFactory, ctx.wallet, ctx.caller, ctx.callerApp)')
    expect(passKey).toContain('thirdPartyPrincipal(walletFactory, ctx.caller, ctx.wallet)')
    // the ctx resolver appears once, guarded by `if (swap)` (BeforeSwap only)
    expect(passKey.split('resolvePrincipalFromDexCtx').length - 1).toBe(1)
    expect(passKey.indexOf('if (swap)')).toBeLessThan(passKey.indexOf('resolvePrincipalFromDexCtx'))
    expect(passKey.indexOf('resolvePrincipalFromDexCtx')).toBeLessThan(passKey.indexOf('thirdPartyPrincipal'))
    // review fix (deviation 1): inside an app call, a hint that is not a wallet of F is priced as hint 0. The
    // fallback returns the authenticated ctx.caller (never a value read through the hint), only at BeforeSwap,
    // only when callerApp != 0 (a top-level hint stays strict), and runs before the strict resolver.
    const fallback = passKey.match(/if \(ctx\.callerApp !== 0 && !isGenuineWallet\(ctx\.wallet, walletFactory\)\) \{\s*return ctx\.caller\s*\}/)
    expect(fallback, 'non-genuine fallback').not.toBeNull()
    expect(passKey.indexOf('if (swap)')).toBeLessThan(fallback!.index!)
    expect(fallback!.index!).toBeLessThan(passKey.indexOf('resolvePrincipalFromDexCtx'))
    expect(passKey.split('isGenuineWallet').length - 1).toBe(1)
  })

  test('no PluginDex or router source reads the EscrowFactory registry (no legacy* helpers, no shared/origin.ts)', () => {
    const files = [
      ...sources(path.join(root, 'plugin-dex')),
      ...sources(path.join(root, 'arc58/plugins/akita-router')),
      ...sources(path.join(root, 'arc58/plugins/gated-fee-pass')),
    ]
    expect(files.length).toBeGreaterThan(20)
    for (const file of files) {
      const text = readFileSync(file, 'utf8')
      expect(text, path.relative(root, file)).not.toMatch(/\blegacy(WalletOf|OriginOr|WalletID|ReferralFee|SendReferralPayment)/)
      expect(text, path.relative(root, file)).not.toMatch(/shared\/origin/)
      expect(text, path.relative(root, file)).not.toMatch(/EscrowFactory\.prototype\.(get|register)\b/)
    }
  })

  test('the router forwards windowHint(wallet) to every native swap and quote (invariant 6)', () => {
    const src = readFileSync(path.join(root, 'arc58/plugins/akita-router/contract.algo.ts'), 'utf8')
    expect(src.match(/const hint = windowHint\(wallet\)/g)).toHaveLength(2)
    const calls = src.split('abiCall<typeof PluginDex.prototype.').slice(1)
    expect(calls).toHaveLength(3)
    for (const call of calls) {
      // the hint is the last ABI argument, right after the segment/candidate data
      expect(call).toMatch(/(seg|candidate)\.data,\s*hint,?\s*\]/)
    }
    const router = spec('arc58/plugins/akita-router/AkitaRouterPlugin.arc56.json')
    // the router ABI itself is unchanged: the wallet is still its pinned first argument
    expect(method(router, 'swap').args[0].name).toBe('wallet')
    expect(method(router, 'swapBest').args[0].name).toBe('wallet')
  })

  test('GatedFeePassPlugin (production pass plugin): no caller-chosen key or hook, windowHint on every hook call', () => {
    const plugin = spec('arc58/plugins/gated-fee-pass/GatedFeePassPlugin.arc56.json')
    expect(method(plugin, 'create').args.map((a) => a.name)).toEqual(['version', 'hook'])
    expect(method(plugin, 'openPass').args.map((a) => a.name)).toEqual(['wallet', 'rekeyBack', 'measure', 'gateArgs'])
    expect(method(plugin, 'refresh').args.map((a) => a.name)).toEqual(['wallet', 'rekeyBack', 'measure', 'gateArgs'])
    expect(method(plugin, 'refreshFromGate').args.map((a) => a.name)).toEqual(['wallet', 'rekeyBack', 'slot', 'gateId', 'args'])
    expect(method(plugin, 'closePass').args.map((a) => a.name)).toEqual(['wallet', 'rekeyBack'])
    // no method takes a pass key or an app to call: the key is pluginPrincipal's, the hook is pinned at create
    for (const m of plugin.methods) {
      expect(m.args.map((a) => a.name), m.name).not.toContain('key')
      if (m.name !== 'create') expect(m.args.map((a) => a.name), m.name).not.toContain('hook')
    }
    const src = readFileSync(path.join(root, 'arc58/plugins/gated-fee-pass/contract.algo.ts'), 'utf8')
    const calls = src.split('abiCall<typeof GatedFeeHook.prototype.').slice(1)
    expect(calls.map((c) => c.slice(0, c.indexOf('>')))).toEqual(['openPass', 'refresh', 'refreshFromGate', 'closePass'])
    for (const call of calls) {
      const end = 'rekeyTo: rekeyAddress(rekeyBack, wallet)'
      expect(call).toContain(end)
      const body = call.slice(0, call.indexOf(end))
      expect(body).toContain('appId: this.hook.value')
      expect(body).toContain('sender: p.spender')
      expect(body).toMatch(/windowHint\(wallet\),?\s*\]/)
    }
    expect(src).toContain('return pluginPrincipalOf(this.akitaDAO.value, wallet)')
  })

  test('LaunchManager dev buy passes wallet 0 (P2-DEX-04)', () => {
    const src = readFileSync(path.join(root, 'plugin-dex/launch/launch-manager.algo.ts'), 'utf8')
    const devBuy = src.slice(src.indexOf('abiCall<typeof PluginDex.prototype.swap>'))
    expect(devBuy.slice(0, devBuy.indexOf('}).returnValue'))).toMatch(/Bytes\(''\), 0\]/)
  })
})
