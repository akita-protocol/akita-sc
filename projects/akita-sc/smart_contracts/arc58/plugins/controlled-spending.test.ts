/**
 * AUD-C1 / AUD-C2 guard: a plugin resolves the account it spends from through
 * `getControlledSpendingAccount`, which asserts that the account is rekeyed to the plugin right now.
 *
 * `getSpendingAccount` only reads `spending_address` from whatever app is passed as `wallet`. An app
 * that is not a wallet can store the plugin's own app address there; the plugin never needs a rekey to
 * spend from its own account, so the call would run with the plugin's balance and could rekey the
 * plugin's account away. A plugin that keeps the unchecked read must make its own authority check and
 * be listed below with the reason.
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
  welcome: 'asserts sender.authAddress is this app (welcomeMissingAuthority)',
  'test-close-out': 'test-only plugin, never deployed',
  'test-proxy-rekey': 'test-only plugin, never deployed',
}

function uncheckedReads(directory: string): string[] {
  const found: string[] = []
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      found.push(...uncheckedReads(file))
    } else if (entry.name.endsWith('.algo.ts')) {
      const source = ts.createSourceFile(file, readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true)
      const visit = (node: ts.Node): void => {
        if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === 'getSpendingAccount') {
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
})
