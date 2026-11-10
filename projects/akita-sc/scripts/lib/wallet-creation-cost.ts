/**
 * Argument parsing for scripts/update-wallet-creation-cost.ts.
 *
 * The fee has no default (readiness audit 2026-11-09, C12). The script used to fall back to
 * 1,000,000 ALGO when neither flag was given, so a run that forgot `--cost` on MainNet would have
 * blocked wallet creation for everyone. A missing, repeated or conflicting cost is now an error
 * before anything is read from or sent to the network.
 */

export const MICROALGOS_FLAGS = ['--cost', '--microalgos'] as const
export const ALGOS_FLAGS = ['--cost-algo', '--algos'] as const

export const COST_REQUIRED_MESSAGE =
  'A wallet creation fee is required: pass --cost <microAlgos> or --cost-algo <algos>. There is no default.'

function parseInteger(value: string | undefined, label: string): bigint {
  if (value === undefined || value.startsWith('-')) {
    throw new Error(`${label} needs a value`)
  }
  const normalized = value.replaceAll('_', '').replaceAll(',', '')
  if (!/^\d+$/.test(normalized)) {
    throw new Error(`${label} must be a non-negative integer`)
  }
  return BigInt(normalized)
}

/** The new wallet creation fee in microAlgos, from the script's arguments. Throws when it is not given exactly once. */
export function parseCreateFee(argv: readonly string[]): bigint {
  const given: { flag: string; value: string | undefined; algos: boolean }[] = []
  argv.forEach((arg, index) => {
    const micro = (MICROALGOS_FLAGS as readonly string[]).includes(arg)
    const algos = (ALGOS_FLAGS as readonly string[]).includes(arg)
    if (micro || algos) given.push({ flag: arg, value: argv[index + 1], algos })
  })

  if (given.length === 0) {
    throw new Error(COST_REQUIRED_MESSAGE)
  }
  if (given.length > 1) {
    throw new Error(`Pass the wallet creation fee once. Got ${given.map((g) => g.flag).join(' and ')}.`)
  }

  const [{ flag, value, algos }] = given
  const amount = parseInteger(value, flag)
  return algos ? amount * 1_000_000n : amount
}
