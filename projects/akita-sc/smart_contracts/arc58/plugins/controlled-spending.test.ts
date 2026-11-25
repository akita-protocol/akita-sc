/**
 * AUD-C1 / AUD-C2 guard: a plugin resolves the account it spends from through
 * `getControlledSpendingAccount`, which asserts that the account is rekeyed to the plugin right now.
 *
 * `getSpendingAccount` only reads `spending_address` from whatever app is passed as `wallet`. An app
 * that is not a wallet can store the plugin's own app address there; the plugin never needs a rekey to
 * spend from its own account, so the call would run with the plugin's balance and could rekey the
 * plugin's account away. A plugin that keeps the unchecked read must make its own authority check and
 * be listed below with the reason.
 *
 * Open-grant rule: `getControlledSpendingAccount` also refuses a window opened under a grant anyone
 * may use (caller = zero address) that needs no execution key (errOgnk), because the wallet checked
 * nothing about who opened it. A method that is safe for any caller asks for
 * `getOpenGrantSpendingAccount` by name and is listed below with the reason; so is every plugin that
 * keeps the unchecked read, with the rule it applies instead.
 */
import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import ts from 'typescript'
import { describe, expect, test } from 'vitest'

const root = __dirname

/** Plugins that keep `getSpendingAccount`, and the check each makes instead. */
const exempt: Record<string, string> = {
  meta: 'grant() asserts the spending account is rekeyed to this app (errWalletContext) before every use',
  'revenue-manager': 'validateWallet() and controls(sender) run before any spend',
  'update-akita-dao': 'the wallet must be the DAO wallet and the spending account its own address (errNotAkitaDao)',
  welcome: 'asserts sender.authAddress is this app (welcomeMissingAuthority) and calls assertNotOpenGrant',
  'test-close-out': 'test-only plugin, never deployed',
  'test-proxy-rekey': 'test-only plugin, never deployed',
}

/** Every use of `getOpenGrantSpendingAccount`: the method that may run under a grant anyone can use, and why. */
const openGrant: Record<string, { uses: number; why: string }> = {
  optin: { uses: 1, why: 'optIn: the caller pays the exact opt-in minimum balance itself, in the same group' },
  pay: { uses: 1, why: 'pay: limits() refuses an open grant with no execution key unless it has a policy (errPolicyMissing)' },
  subscriptions: {
    uses: 1,
    why: 'fundTriggerPayment: the caller picks only which of the account\'s own subscriptions to top up, by the shortfall of one due payment',
  },
}

/** How each plugin that keeps `getSpendingAccount` treats a grant anyone can use. */
const openGrantOwnRule: Record<string, string> = {
  meta: 'every write runs inside the policy scope of its grant (no policy, no write); policy writes and addType need an admin window',
  'revenue-manager': 'the keeper steps of a disbursement are open by design and pay out by the stored splits; setup methods need the main account of the DAO wallet',
  'update-akita-dao': 'requires an admin-approved window on the DAO wallet',
  welcome: 'assertNotOpenGrant',
  'test-close-out': 'test-only plugin, never deployed',
  'test-proxy-rekey': 'test-only plugin, never deployed',
}

function uncheckedReads(directory: string): string[] {
  return callsTo('getSpendingAccount', directory)
}

function callsTo(name: string, directory: string): string[] {
  const found: string[] = []
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      found.push(...callsTo(name, file))
    } else if (entry.name.endsWith('.algo.ts')) {
      const source = ts.createSourceFile(file, readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true)
      const visit = (node: ts.Node): void => {
        if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === name) {
          const { line } = source.getLineAndCharacterOfPosition(node.getStart())
          found.push(`${path.relative(root, file)}:${line + 1}`)
        }
        ts.forEachChild(node, visit)
      }
      visit(source)
    }
  }
  return found
}

describe('plugins only spend from an account they control', () => {
  const plugins = readdirSync(root, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name)

  test('every plugin outside the exemption list uses getControlledSpendingAccount', () => {
    expect(plugins.length).toBeGreaterThan(20)
    const offenders = plugins
      .filter((plugin) => !(plugin in exempt))
      .flatMap((plugin) => uncheckedReads(path.join(root, plugin)))
    expect(offenders).toEqual([])
  })

  test('the exemption list names only plugins that still need it', () => {
    for (const plugin of Object.keys(exempt)) {
      expect(plugins, `${plugin} is not a plugin directory`).toContain(plugin)
      expect(uncheckedReads(path.join(root, plugin)).length, `${plugin} no longer reads getSpendingAccount`).toBeGreaterThan(0)
    }
  })

  test('only the listed methods may run under a grant anyone can use', () => {
    const uses = Object.fromEntries(
      plugins
        .map((plugin) => [plugin, callsTo('getOpenGrantSpendingAccount', path.join(root, plugin)).length] as const)
        .filter(([, count]) => count > 0),
    )
    expect(uses).toEqual(Object.fromEntries(Object.entries(openGrant).map(([plugin, { uses: count }]) => [plugin, count])))
    for (const { why } of Object.values(openGrant)) expect(why.length).toBeGreaterThan(20)
  })

  test('every plugin that keeps the unchecked read states its own rule for open grants', () => {
    expect(Object.keys(openGrantOwnRule).sort()).toEqual(Object.keys(exempt).sort())
    expect(callsTo('assertNotOpenGrant', path.join(root, 'welcome')).length).toBeGreaterThan(0)
  })
})
