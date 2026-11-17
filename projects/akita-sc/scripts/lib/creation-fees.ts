/**
 * The creation fees the DAO stores for a staking pool, an auction and a raffle (runbook B3a).
 *
 * The staking pool fee is `creationFee` in the DAO's `staking_fees`. The auction and raffle fees are
 * `auctionCreationFee` and `raffleCreationFee` in `nft_fees`. UpdateFields replaces a whole struct, so
 * every other member is written back as it was read, and the result is read back and compared member
 * by member.
 *
 * All three are amounts in microAlgos. StakingPoolFactory and RaffleFactory add their fee to the
 * payment that creates a pool or a raffle. AuctionFactory does not read `auctionCreationFee`: its
 * creation cost is storage only, whatever the DAO stores.
 */
import type { SDKClient } from 'akita-sdk'
import { ProposalActionEnum, type ProposalAction } from 'akita-sdk/dao'
import type { ScriptContext } from '../script-base'
import { proposeAndExecute } from '../utils'

/** The fees to set, in microAlgos. A fee left out is not changed. */
export type CreationFees = { stakingPool?: bigint; auction?: bigint; raffle?: bigint }
export type FeeStructs = { staking: Record<string, bigint>; nft: Record<string, bigint> }
export type FeeChange = { name: 'staking pool' | 'auction' | 'raffle'; field: 'staking_fees' | 'nft_fees'; member: string; from: bigint; to: bigint }
export type CreationFeePlan = { changes: FeeChange[]; unchanged: FeeChange[]; expected: FeeStructs; actions: ProposalAction<SDKClient>[] }

const TARGETS = [
  { name: 'staking pool', key: 'stakingPool', field: 'staking_fees', struct: 'staking', member: 'creationFee' },
  { name: 'auction', key: 'auction', field: 'nft_fees', struct: 'nft', member: 'auctionCreationFee' },
  { name: 'raffle', key: 'raffle', field: 'nft_fees', struct: 'nft', member: 'raffleCreationFee' },
] as const

/** An amount in microAlgos as ALGO, without trailing zeros. */
export function algo(microAlgos: bigint): string {
  const whole = microAlgos / 1_000_000n
  const fraction = (microAlgos % 1_000_000n).toString().padStart(6, '0').replace(/0+$/, '')
  return `${whole.toLocaleString('en-US')}${fraction ? `.${fraction}` : ''} ALGO`
}

/** What changes, and the proposal actions that change it. Pure: nothing is read or sent. */
export function planCreationFees(current: FeeStructs, wanted: CreationFees): CreationFeePlan {
  const expected: FeeStructs = { staking: { ...current.staking }, nft: { ...current.nft } }
  const changes: FeeChange[] = []
  const unchanged: FeeChange[] = []
  for (const t of TARGETS) {
    const to = wanted[t.key]
    if (to === undefined) continue
    if (to < 0n) throw new Error(`The ${t.name} creation fee cannot be negative`)
    const from = current[t.struct][t.member]
    if (from === undefined) throw new Error(`The DAO's ${t.field} holds no ${t.member}`)
    const row: FeeChange = { name: t.name, field: t.field, member: t.member, from, to }
    if (from === to) { unchanged.push(row); continue }
    changes.push(row)
    expected[t.struct][t.member] = to
  }
  const actions: ProposalAction<SDKClient>[] = []
  if (changes.some((c) => c.field === 'staking_fees')) actions.push({ type: ProposalActionEnum.UpdateFields, field: 'staking_fees', value: { ...expected.staking } } as ProposalAction<SDKClient>)
  if (changes.some((c) => c.field === 'nft_fees')) actions.push({ type: ProposalActionEnum.UpdateFields, field: 'nft_fees', value: { ...expected.nft } } as ProposalAction<SDKClient>)
  return { changes, unchanged, expected, actions }
}

/** The DAO's two fee structs as plain records of bigints. */
export async function readFeeStructs(ctx: ScriptContext): Promise<FeeStructs> {
  const [staking, nft] = await Promise.all([ctx.dao.client.state.global.stakingFees(), ctx.dao.client.state.global.nftFees()])
  if (!staking) throw new Error('The DAO holds no staking_fees')
  if (!nft) throw new Error('The DAO holds no nft_fees')
  const plain = (value: object) => Object.fromEntries(Object.entries(value).map(([k, v]) => [k, BigInt(v as bigint | number)]))
  return { staking: plain(staking), nft: plain(nft) }
}

/** The members of `actual` that differ from `expected`, as "struct.member: actual, expected". */
export function feeDifferences(actual: FeeStructs, expected: FeeStructs): string[] {
  const out: string[] = []
  for (const struct of ['staking', 'nft'] as const) {
    for (const member of new Set([...Object.keys(expected[struct]), ...Object.keys(actual[struct])])) {
      if (actual[struct][member] !== expected[struct][member]) out.push(`${struct}.${member}: ${actual[struct][member]}, expected ${expected[struct][member]}`)
    }
  }
  return out
}

/**
 * Plan the fee change and, with `confirm`, send it as one DAO proposal and read the result back.
 * Returns the proposal id, or undefined when nothing was sent.
 */
export async function runCreationFees(ctx: ScriptContext, wanted: CreationFees,
  options: { confirm: boolean; log?: (line: string) => void }): Promise<{ plan: CreationFeePlan; proposalId?: bigint }> {
  const log = options.log ?? console.log
  if (wanted.stakingPool === undefined && wanted.auction === undefined && wanted.raffle === undefined) {
    throw new Error('Name at least one fee: --staking-pool, --auction or --raffle, each in microAlgos')
  }
  const before = await readFeeStructs(ctx)
  const plan = planCreationFees(before, wanted)
  log(`Creation fees on ${ctx.options.network} (DAO ${ctx.dao.appId}):`)
  for (const c of plan.changes) log(`  ${c.name}: ${algo(c.from)} -> ${algo(c.to)}  (${c.field}.${c.member}: ${c.from} -> ${c.to} microAlgos)`)
  for (const c of plan.unchanged) log(`  ${c.name}: already ${algo(c.to)}`)
  if (plan.changes.some((c) => c.name === 'auction')) {
    log('  Note: AuctionFactory does not read the auction creation fee. Creating an auction costs storage only, whatever is stored here.')
  }
  if (plan.changes.length === 0) {
    log('Nothing to change.')
    return { plan }
  }
  const kept = Object.keys(before.staking).length + Object.keys(before.nft).length - plan.changes.length
  log(`  ${plan.actions.length} action(s) in one proposal. The other ${kept} member(s) of staking_fees and nft_fees are written back as read.`)
  if (!options.confirm || ctx.options.dryRun) {
    log('PLAN ONLY: nothing was sent. Pass --confirm to create and execute the proposal.')
    return { plan }
  }
  const proposalId = await proposeAndExecute(ctx.algorand, ctx.dao, plan.actions)
  const differences = feeDifferences(await readFeeStructs(ctx), plan.expected)
  if (differences.length > 0) throw new Error(`Proposal ${proposalId} executed, but the fees read back differ: ${differences.join('; ')}`)
  log(`Proposal ${proposalId} executed. Every member of staking_fees and nft_fees was read back and matches.`)
  return { plan, proposalId }
}
