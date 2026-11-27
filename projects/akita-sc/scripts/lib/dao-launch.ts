/**
 * Read-only readiness check for the DAO launch (`initialize()`, rollout step I1).
 *
 * `initialize()` ends creator control: afterwards every change needs a vote. The check therefore asks
 * that every tracked rollout step is done, or named as deliberately left for governance, and that no
 * bootstrap execution key is still tracked (the DAO itself refuses in that case).
 *
 * It also asks what the DAO asks of itself before it hands over: both governance assets and a staking
 * app must be named (`errGnrd`), because a proposal's power is a locked AKTA balance and nothing could
 * ever pass without them. And it warns when no stake is locked yet: the DAO would be governed by a
 * quorum of nothing, so the first locker decides every vote (audit 13).
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
  /** Nothing refuses the launch, but the operator should see it. */
  warnings: string[]
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
  const plan: LaunchPlan = { daoState, daoCreator, initialized, allowed: [], problems: [], warnings: [] }
  if (initialized) return plan

  await checkGovernanceReady(ctx, plan)

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

/**
 * What the DAO itself requires of `initialize()` (`errGnrd`: both assets and a staking app), plus the
 * locked AKTA that gives a proposal its power. The totals are read through the Staking app's readonly
 * `getTotals`, simulated as the DAO creator.
 */
async function checkGovernanceReady(ctx: ScriptContext, plan: LaunchPlan): Promise<void> {
  const assets = await ctx.dao.client.state.global.akitaAssets().catch(() => undefined)
  const staking = (await ctx.dao.client.state.global.akitaAppList().catch(() => undefined))?.staking ?? 0n
  const akta = assets?.akta ?? 0n
  const bones = assets?.bones ?? 0n
  if (akta === 0n || bones === 0n || staking === 0n) {
    plan.problems.push(`initialize() refuses with errGnrd until the DAO names both governance assets and a staking app `
      + `(akta ${akta}, bones ${bones}, aal.staking ${staking}); set them with UpdateFields proposals first`)
    return
  }
  const totals = await ctx.algorand.client
    .getTypedAppClientById(await stakingClientFactory(), { appId: staking, defaultSender: plan.daoCreator })
    .send.getTotals({ args: { assets: [akta] } })
    .then((result) => result.return as unknown as { locked: bigint; liveLockedStake: bigint }[] | undefined)
    .catch(() => undefined)
  const locked = totals?.[0]?.locked
  if (locked === undefined) plan.warnings.push(`Staking ${staking} did not answer getTotals for AKTA ${akta}; the locked stake is unknown`)
  else if (locked === 0n) {
    plan.warnings.push(`No AKTA is locked in Staking ${staking}, so the quorum of every proposal is zero: the first account to lock `
      + `decides every vote until others do. Lock the governance stake before initialize()`)
  }
}

/** Loaded lazily so the plan has no import cycle through the generated clients. */
async function stakingClientFactory() {
  const { StakingClient } = await import('../../smart_contracts/artifacts/staking/StakingClient')
  return StakingClient
}
