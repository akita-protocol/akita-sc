/**
 * Read-only readiness check for the DAO launch (`initialize()`, rollout step I1).
 *
 * `initialize()` ends creator control: afterwards every change needs a vote. The check therefore asks
 * that every tracked rollout step is done, or named as deliberately left for governance, and that no
 * bootstrap execution key is still tracked (the DAO itself refuses in that case).
 */
import type { ScriptContext } from '../script-base'
import { DAO_STATE_FULLY_INITIALIZED } from './dao-wallet-plugin-migration'
import { readRolloutStatus, type RolloutRow } from './rollout-steps'

export type LaunchPlan = {
  daoState: bigint
  daoCreator: string
  initialized: boolean
  /** Unfinished steps the operator named with --allow-pending. */
  allowed: string[]
  problems: string[]
}

export type LaunchOptions = {
  allowPending?: readonly string[]
  sender?: string
  /** The rollout steps to judge; read from the chain when left out. */
  status?: { rows: RolloutRow[]; daoState: bigint }
}

export async function planLaunch(ctx: ScriptContext, options: LaunchOptions = {}): Promise<LaunchPlan> {
  const allowPending = options.allowPending ?? []
  const [{ rows, daoState }, daoApp, bootstrapKeys] = await Promise.all([
    options.status ?? readRolloutStatus(ctx),
    ctx.algorand.client.algod.getApplicationByID(ctx.dao.appId).do(),
    ctx.dao.getBootstrapKeys().then((keys) => keys.length, () => undefined),
  ])
  const daoCreator = daoApp.params!.creator.toString()
  const initialized = daoState === BigInt(DAO_STATE_FULLY_INITIALIZED)
  const plan: LaunchPlan = { daoState, daoCreator, initialized, allowed: [], problems: [] }
  if (initialized) return plan

  const known = new Set(rows.map((row) => row.id))
  for (const id of allowPending) {
    if (!known.has(id)) plan.problems.push(`--allow-pending ${id} is not a rollout:status step`)
    if (id === 'initialize') plan.problems.push('--allow-pending cannot name initialize itself')
  }
  // These make the DAO unable to run or to govern itself; nothing may waive them.
  const required = new Set(['phase2a', 'dao', 'validator', 'dao-wallet', 'power'])
  for (const row of rows) {
    if (row.id === 'initialize' || row.status === 'done') continue
    if (allowPending.includes(row.id) && !required.has(row.id)) plan.allowed.push(row.id)
    else plan.problems.push(`${row.id} is not done: ${row.detail}${required.has(row.id) && allowPending.includes(row.id) ? ' (this step cannot be left pending)' : ''}`)
  }
  if (bootstrapKeys === undefined) plan.problems.push('The DAO does not report its bootstrap keys (it is not the upgraded DAO)')
  else if (bootstrapKeys > 0) plan.problems.push(`${bootstrapKeys} bootstrap execution key(s) are still tracked; run scripts/revoke-dao-bootstrap-grants.ts --confirm-revoke`)
  if (options.sender !== undefined && options.sender !== daoCreator) plan.problems.push(`Only the DAO creator ${daoCreator} can call initialize() (sender ${options.sender})`)
  return plan
}
