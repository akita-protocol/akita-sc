/**
 * scripts/update-wallet-creation-cost.ts must be told the fee (readiness audit 2026-11-09, C12).
 * It used to default to 1,000,000 ALGO, so a MainNet run that forgot `--cost` would have blocked
 * wallet creation. The fee now has no default and the script stops before it reaches the network.
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, test } from 'vitest'
import { COST_REQUIRED_MESSAGE, parseCreateFee } from '../scripts/lib/wallet-creation-cost'

const BASE = ['-n', 'mainnet', '-m', 'word '.repeat(25).trim()]

describe('AUD-C12 wallet creation cost script', () => {
  test('refuses to run without a fee', () => {
    expect(() => parseCreateFee(BASE)).toThrow(COST_REQUIRED_MESSAGE)
    expect(() => parseCreateFee([])).toThrow(/no default/)
    expect(() => parseCreateFee([...BASE, '--dry-run'])).toThrow(COST_REQUIRED_MESSAGE)
  })

  test('reads the fee in microAlgos or in whole Algos', () => {
    expect(parseCreateFee([...BASE, '--cost', '10000000'])).toBe(10_000_000n)
    expect(parseCreateFee([...BASE, '--microalgos', '1_000_000'])).toBe(1_000_000n)
    expect(parseCreateFee(['--cost-algo', '10', ...BASE])).toBe(10_000_000n)
    expect(parseCreateFee([...BASE, '--algos', '1,000'])).toBe(1_000_000_000n)
    // Zero is a real choice (free wallets) and has to be spelled out like any other.
    expect(parseCreateFee([...BASE, '--cost', '0'])).toBe(0n)
  })

  test('refuses a flag with no value, a bad value, or two fees', () => {
    expect(() => parseCreateFee([...BASE, '--cost'])).toThrow(/--cost needs a value/)
    expect(() => parseCreateFee(['--cost', '--dry-run', ...BASE])).toThrow(/--cost needs a value/)
    expect(() => parseCreateFee([...BASE, '--cost', '1.5'])).toThrow(/non-negative integer/)
    expect(() => parseCreateFee([...BASE, '--cost-algo', 'ten'])).toThrow(/non-negative integer/)
    expect(() => parseCreateFee([...BASE, '--cost', '5', '--cost-algo', '5'])).toThrow(/once/)
    expect(() => parseCreateFee([...BASE, '--cost', '5', '--cost', '6'])).toThrow(/once/)
  })

  test('the script parses the fee before it sets up a network context, and has no default left', () => {
    const source = readFileSync(join(__dirname, '../scripts/update-wallet-creation-cost.ts'), 'utf8')
    const parsed = source.indexOf('parseCreateFee(process.argv.slice(2))')
    const context = source.indexOf('setupContext(')
    expect(parsed).toBeGreaterThan(-1)
    expect(context).toBeGreaterThan(parsed)
    expect(source).not.toMatch(/DEFAULT_CREATE_FEE|1_000_000_000_000n|Default:/)
  })
})
