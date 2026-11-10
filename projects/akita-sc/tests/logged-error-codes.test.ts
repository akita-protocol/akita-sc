import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import ts from 'typescript'
import { describe, expect, test } from 'vitest'

const root = path.resolve(__dirname, '../smart_contracts')
const codes: { file: string; code: string }[] = []

function visitDirectory(directory: string): void {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      if (entry.name !== 'artifacts') visitDirectory(file)
    } else if (entry.name.endsWith('.ts') && !/\.(?:test|spec)\.ts$/.test(entry.name)) {
      const source = ts.createSourceFile(file, readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true)
      function visit(node: ts.Node): void {
        if (entry.name === 'errors.ts' && ts.isVariableDeclaration(node) &&
          ts.isIdentifier(node.name) && /^err[A-Z]/.test(node.name.text) &&
          node.initializer && ts.isStringLiteral(node.initializer)) {
          codes.push({ file: path.relative(root, file), code: node.initializer.text })
        }
        if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) &&
          ['loggedAssert', 'loggedErr'].includes(node.expression.text)) {
          const code = node.arguments[node.expression.text === 'loggedAssert' ? 1 : 0]
          if (code && ts.isStringLiteral(code)) codes.push({ file: path.relative(root, file), code: code.text })
        }
        ts.forEachChild(node, visit)
      }
      visit(source)
    }
  }
}

visitDirectory(root)

describe('logged error code diagnostics', () => {
  test('uses camelCase code values, including inline mock errors', () => {
    expect(codes.length).toBeGreaterThan(0)
    expect(codes.filter(({ code }) => !/^[a-z][a-zA-Z0-9]*$/.test(code))).toEqual([])
  })

  test('avoids 8-byte and 32-byte ARC-65 log messages', () => {
    expect(codes.filter(({ code }) => [8, 32].includes(Buffer.byteLength(`ERR:${code}`)))).toEqual([])
  })
})
