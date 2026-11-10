import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

/**
 * Readiness audit 2026-11-09, C10: the Vault's ARC-28 events are an interface. An indexer, an aggregator
 * or an SDK decoder finds an event by its selector (the first 4 bytes of sha512/256 of the signature) and
 * decodes the rest as the ABI tuple of its arguments, so adding, removing, retyping or reordering one
 * argument silently breaks every decoder built for the old shape. `CustodyEvent` changed that way during
 * the internal review (it lost `reserveA` and `reserveB`).
 *
 * This test pins the events of the compiled Vault to the table below and to INTEGRATION.md §4.4, the
 * document integrators build from. Changing an event is allowed, but it has to be done in all three
 * places at once, which is the moment to tell whoever decodes them.
 *
 * Reads the compiled ARC-56 artifact, so run the build first.
 */
const PINNED: Record<string, { args: string; selector: string }> = {
  SwapEvent: {
    args: 'uint64 poolId, address caller, uint64 assetIn, uint64 amountIn, uint64 assetOut, uint64 amountOut, uint64 feeBps, uint64 hookFees, uint64 reserveA, uint64 reserveB',
    selector: '740dc533',
  },
  LiquidityEvent: {
    args: 'uint64 poolId, address caller, uint64 amountA, uint64 amountB, uint64 lpAmount, uint64 reserveA, uint64 reserveB',
    selector: 'cf13cd1c',
  },
  CustodyEvent: {
    args: 'uint64 poolId, uint64 hook, uint64 point, uint64 deltaA, bool negA, uint64 deltaB, bool negB',
    selector: 'd08df122',
  },
  ExternalMarkEvent: {
    args: 'uint64 poolId, uint64 slot, uint64 units, uint64 rate, uint64 bookValue',
    selector: '0519b6b5',
  },
  ExternalExitEvent: {
    args: 'uint64 poolId, uint64 slot, uint64 receipt, address recipient, uint64 units, uint64 value',
    selector: '348d2f8f',
  },
  GraduationEvent: {
    args: 'uint64 poolId, uint64 tokenIn, uint64 tokenRetained, uint64 quoteToTreasury, byte[16] priceX64',
    selector: 'c2d2b0be',
  },
}

type Arc56Event = { name: string; args: { type: string; name?: string }[] }

const spec = JSON.parse(
  readFileSync(path.resolve(__dirname, '../artifacts/plugin-dex/PluginDex.arc56.json'), 'utf8'),
) as { events?: Arc56Event[]; methods: { name: string; events?: Arc56Event[] }[] }

const namedArgs = (event: Arc56Event): string => event.args.map((arg) => `${arg.type} ${arg.name}`).join(', ')
const selectorOf = (event: Arc56Event): string =>
  createHash('sha512-256')
    .update(`${event.name}(${event.args.map((arg) => arg.type).join(',')})`)
    .digest('hex')
    .slice(0, 8)

const integration = readFileSync(path.resolve(__dirname, 'INTEGRATION.md'), 'utf8').replace(/\s+/g, ' ')

describe('Plugin DEX Vault events (AUD-C10)', () => {
  const compiled = spec.events ?? []

  test('the compiled Vault logs exactly the pinned events, argument for argument', () => {
    expect(compiled.length, 'PluginDex.arc56.json has no events; build plugin-dex first').toBeGreaterThan(0)
    const actual = Object.fromEntries(compiled.map((event) => [event.name, { args: namedArgs(event), selector: selectorOf(event) }]))
    expect(actual).toEqual(PINNED)
  })

  test('every method declares its events with the same shape', () => {
    for (const method of spec.methods) {
      for (const event of method.events ?? []) {
        expect(PINNED[event.name], `${method.name} logs an unpinned event ${event.name}`).toBeDefined()
        expect({ args: namedArgs(event), selector: selectorOf(event) }, `${method.name} → ${event.name}`).toEqual(PINNED[event.name])
      }
    }
  })

  test('CustodyEvent carries no reserves: decoders read them from the SwapEvent of the same call', () => {
    const custody = compiled.find((event) => event.name === 'CustodyEvent')!
    expect(custody.args.map((arg) => arg.name)).toEqual(['poolId', 'hook', 'point', 'deltaA', 'negA', 'deltaB', 'negB'])
    expect(custody.args.map((arg) => arg.name)).not.toEqual(expect.arrayContaining(['reserveA']))
    const swap = compiled.find((event) => event.name === 'SwapEvent')!
    expect(swap.args.slice(-2).map((arg) => arg.name)).toEqual(['reserveA', 'reserveB'])
  })

  test('INTEGRATION.md states every event with the compiled signature', () => {
    // every `NameEvent(type name, …)` written out in the document, wherever it appears
    const written = [...integration.matchAll(/`(\w+Event)\(([^)`]*)\)`/g)].map(([, name, args]) => ({ name, args: args.trim() }))
    expect(written.length).toBeGreaterThanOrEqual(Object.keys(PINNED).length)
    for (const { name, args } of written) {
      expect(PINNED[name], `INTEGRATION.md names an event the Vault does not log: ${name}`).toBeDefined()
      expect(args, `INTEGRATION.md states ${name} with other arguments than the Vault logs`).toBe(PINNED[name].args)
    }
    for (const name of Object.keys(PINNED)) {
      expect(written.some((event) => event.name === name), `INTEGRATION.md does not state ${name}`).toBe(true)
    }
  })

  test('INTEGRATION.md lists every selector next to its event', () => {
    for (const [name, { args, selector }] of Object.entries(PINNED)) {
      expect(integration, `${name} selector row`).toContain(`| \`${name}(${args})\` | \`${selector}\` |`)
    }
  })
})
