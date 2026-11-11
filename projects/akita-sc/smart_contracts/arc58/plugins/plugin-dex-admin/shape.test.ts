/**
 * Static checks on PluginDexAdminPlugin, read from source and from the compiled ABIs (no network).
 *
 * The plugin is safe because of the shape every method has: one inner call, sent as the wallet's
 * controlled spending account, to an app pinned at create, handing the wallet back when asked. The
 * end-to-end suite shows that on chain for the methods that exist today. This file keeps the shape, and the
 * list of wrapped methods, from drifting:
 *   - every method that only the admin of one of the five apps may call has a wrapper here, and every
 *     wrapper targets such a method (a new admin method on a DEX app fails this file until it is wrapped)
 *   - every wrapper forwards the target's own arguments in order and sets nothing else on the inner call
 */
import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'
import { describe, expect, test } from 'vitest'

const contracts = path.join(__dirname, '../../..')
const artifacts = path.join(contracts, 'artifacts')

/** the five apps, the plugin field each is pinned in, and the prefix of its wrappers */
const TARGETS = [
  { contract: 'PluginDex', source: 'plugin-dex/contract.algo.ts', artifact: 'plugin-dex/PluginDex.arc56.json', pinned: 'vault', prefix: 'vault', handover: true },
  { contract: 'LaunchManager', source: 'plugin-dex/launch/launch-manager.algo.ts', artifact: 'plugin-dex/launch/LaunchManager.arc56.json', pinned: 'launchManager', prefix: 'launch', handover: true },
  { contract: 'BackrunArbHook', source: 'plugin-dex/hooks/backrun-arb.algo.ts', artifact: 'plugin-dex/hooks/BackrunArbHook.arc56.json', pinned: 'backrunArbHook', prefix: 'backrun', handover: true },
  { contract: 'ConsensusKeyregHook', source: 'plugin-dex/hooks/consensus-keyreg.algo.ts', artifact: 'plugin-dex/hooks/ConsensusKeyregHook.arc56.json', pinned: 'consensusKeyregHook', prefix: 'keyreg', handover: true },
  { contract: 'GatedFeeHook', source: 'plugin-dex/hooks/gated-fee.algo.ts', artifact: 'plugin-dex/hooks/GatedFeeHook.arc56.json', pinned: 'gatedFeeHook', prefix: 'gated', handover: false },
] as const

/** the private helpers through which these contracts check their admin */
const ADMIN_GUARD = /this\.(requireAdmin|onlyAdmin)\(\)/
const HANDOVER = ['proposeAdmin', 'acceptAdmin']

type Method = { name: string; isPrivate: boolean; params: { name: string; type: string }[]; node: ts.MethodDeclaration }

const classMethods = (file: string, className: string): Method[] => {
  const full = path.join(contracts, file)
  const sourceFile = ts.createSourceFile(full, fs.readFileSync(full, 'utf8'), ts.ScriptTarget.Latest, true)
  const found = sourceFile.statements.find((s): s is ts.ClassDeclaration => ts.isClassDeclaration(s) && s.name?.text === className)
  if (!found) throw new Error(`class ${className} not found in ${file}`)
  return found.members.filter(ts.isMethodDeclaration).map((node) => ({
    name: node.name.getText(),
    isPrivate: (ts.getModifiers(node) ?? []).some((m) => m.kind === ts.SyntaxKind.PrivateKeyword),
    params: node.parameters.map((p) => ({ name: p.name.getText(), type: p.type?.getText() ?? '' })),
    node,
  }))
}
const abi = (artifact: string): { name: string; args: { type: string }[]; returns: { type: string } }[] =>
  JSON.parse(fs.readFileSync(path.join(artifacts, artifact), 'utf8')).methods
const capital = (name: string) => name[0].toUpperCase() + name.slice(1)
const calls = (node: ts.Node, name: string): ts.CallExpression[] => {
  const out: ts.CallExpression[] = []
  const visit = (n: ts.Node) => {
    if (ts.isCallExpression(n) && n.expression.getText() === name) out.push(n)
    ts.forEachChild(n, visit)
  }
  visit(node)
  return out
}

describe('PluginDexAdminPlugin shape', () => {
  const plugin = classMethods('arc58/plugins/plugin-dex-admin/contract.algo.ts', 'PluginDexAdminPlugin')
  const wrappers = plugin.filter((m) => !m.isPrivate && !['create', 'opUp'].includes(m.name))

  /** [contract, method, params] of every admin-only method, read from each contract's source */
  const adminMethods = TARGETS.flatMap((target) => {
    const methods = classMethods(target.source, target.contract)
    const guarded = methods.filter((m) => !m.isPrivate && (ADMIN_GUARD.test(m.node.body?.getText() ?? '') || (target.handover && m.name === 'acceptAdmin')))
    return guarded.map((m) => ({ target, method: m }))
  })

  test('the source scan sees every ABI method of the five apps', () => {
    for (const target of TARGETS) {
      const declared = classMethods(target.source, target.contract).filter((m) => !m.isPrivate).map((m) => m.name)
      // a method inherited from another file would escape the admin scan below
      for (const method of abi(target.artifact)) expect(declared, `${target.contract}.${method.name}`).toContain(method.name)
      // and each contract has exactly one admin guard, used by at least one method
      const guards = classMethods(target.source, target.contract).filter((m) => m.isPrivate && /^(requireAdmin|onlyAdmin)$/.test(m.name))
      expect(guards, target.contract).toHaveLength(1)
      expect(guards[0].node.body!.getText(), target.contract).toMatch(/Txn\.sender ===/)
    }
  })

  test('every admin-only method of the five apps has a wrapper, and nothing else is wrapped', () => {
    const expected = new Set<string>()
    for (const { target, method } of adminMethods) {
      expected.add(HANDOVER.includes(method.name) ? `${method.name}Of` : `${target.prefix}${capital(method.name)}`)
    }
    expect(wrappers.map((m) => m.name).sort()).toEqual([...expected].sort())
    // the four apps with a stored admin each have both handover steps; GatedFeeHook has neither
    for (const target of TARGETS) {
      const names = adminMethods.filter((a) => a.target === target).map((a) => a.method.name)
      for (const step of HANDOVER) expect(names.includes(step), `${target.contract}.${step}`).toBe(target.handover)
    }
    expect(adminMethods).toHaveLength(16 + 4 + 8)
  })

  test('the handover steps have one signature on all four apps, the one the plugin is compiled against', () => {
    for (const target of TARGETS.filter((t) => t.handover)) {
      const methods = abi(target.artifact)
      const signature = (name: string) => {
        const method = methods.find((m) => m.name === name)!
        return `${name}(${method.args.map((a) => a.type).join(',')})${method.returns.type}`
      }
      expect(signature('proposeAdmin'), target.contract).toBe('proposeAdmin(address)void')
      expect(signature('acceptAdmin'), target.contract).toBe('acceptAdmin()void')
    }
  })

  test('each wrapper is one inner call as the controlled account to a pinned app, with the target\'s own arguments', () => {
    expect(wrappers).toHaveLength(22)
    for (const wrapper of wrappers) {
      const at = wrapper.name
      const body = wrapper.node.body!
      expect(wrapper.params.slice(0, 2), at).toEqual([{ name: 'wallet', type: 'Application' }, { name: 'rekeyBack', type: 'boolean' }])

      // the sender is the account the wallet has rekeyed to this plugin right now, taken before anything else
      const first = body.statements[0].getText()
      expect(first, at).toBe('const sender = getControlledSpendingAccount(wallet)')
      expect(calls(body, 'getControlledSpendingAccount'), at).toHaveLength(1)

      // exactly one inner transaction, and it is the typed call
      const inner = calls(body, 'abiCall')
      expect(inner, at).toHaveLength(1)
      expect(body.getText(), at).not.toMatch(/itxn\b|\.submit\(|compileArc4|\.call\(/)
      const typed = /^typeof (\w+)\.prototype\.(\w+)$/.exec(inner[0].typeArguments![0].getText())!
      const [, contract, method] = typed

      const options = inner[0].arguments[0] as ts.ObjectLiteralExpression
      const fields = Object.fromEntries(options.properties.map((p) => [p.name!.getText(), ts.isPropertyAssignment(p) ? p.initializer.getText() : p.getText()]))
      expect(Object.keys(fields).sort(), at).toEqual(['appId', 'args', 'rekeyTo', 'sender'])
      expect(fields.sender, at).toBe('sender')
      expect(fields.rekeyTo, at).toBe('rekeyAddress(rekeyBack, wallet)')

      const forwarded = wrapper.params.slice(2)
      if (HANDOVER.some((step) => at === `${step}Of`)) {
        // the app is caller-chosen, so it is checked against the pinned four before the call
        expect(contract, at).toBe('PluginDex')
        expect(`${method}Of`, at).toBe(at)
        expect(forwarded[0], at).toEqual({ name: 'app', type: 'Application' })
        expect(body.statements[1].getText(), at).toBe('this.requireTarget(app)')
        expect(fields.appId, at).toBe('app')
        expect(fields.args, at).toBe(`[${forwarded.slice(1).map((p) => p.name).join(', ')}]`)
        const target = classMethods(TARGETS[0].source, 'PluginDex').find((m) => m.name === method)!
        expect(forwarded.slice(1), at).toEqual(target.params)
        continue
      }

      const target = TARGETS.find((t) => t.contract === contract)!
      expect(at, at).toBe(`${target.prefix}${capital(method)}`)
      expect(fields.appId, at).toBe(`this.${target.pinned}.value`)
      // same names, same types, same order as the target method
      const declared = classMethods(target.source, target.contract).find((m) => m.name === method)!
      expect(forwarded, at).toEqual(declared.params)
      expect(fields.args, at).toBe(`[${forwarded.map((p) => p.name).join(', ')}]`)
    }
  })

  test('the pinned apps are written once, at create, and the plugin has no update or delete action', () => {
    const source = fs.readFileSync(path.join(contracts, 'arc58/plugins/plugin-dex-admin/contract.algo.ts'), 'utf8')
    for (const { pinned } of TARGETS) {
      expect(source.match(new RegExp(`this\\.${pinned}\\.value = `, 'g')), pinned).toHaveLength(1)
    }
    const create = plugin.find((m) => m.name === 'create')!
    expect(TARGETS.every(({ pinned }) => create.node.body!.getText().includes(`this.${pinned}.value = ${pinned}`))).toBe(true)

    const spec = JSON.parse(fs.readFileSync(path.join(artifacts, 'arc58/plugins/plugin-dex-admin/PluginDexAdminPlugin.arc56.json'), 'utf8'))
    expect(spec.bareActions).toEqual({ create: [], call: [] })
    for (const method of spec.methods) {
      expect(method.actions, method.name).toEqual(method.name === 'create' ? { create: ['NoOp'], call: [] } : { create: [], call: ['NoOp'] })
    }
    // every wrapper is in the ABI and nothing private leaked into it
    expect(spec.methods.map((m: { name: string }) => m.name).sort()).toEqual(['create', 'opUp', ...wrappers.map((m) => m.name)].sort())
  })
})
