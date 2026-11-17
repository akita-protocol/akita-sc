/**
 * Proposal `power` thresholds changed unit with the DAO upgrade (rollout B2). The deployed DAO compared
 * a proposer's power with whole token-years; the upgraded DAO compares it with base units (amount x
 * days left / 365, six decimals). Every value stored before the upgrade therefore reads 1,000,000
 * times lower after it. Thresholds are not enforced while the DAO is in Draft, so they are rescaled
 * before `initialize()` (rollout I1).
 *
 * Two places hold a `power`:
 *   - the nine `*_ps` proposal settings globals: rewritten here with UpdateFields;
 *   - the settings box of each global execution-key plugin grant. Only AddPlugin writes that box, so the
 *     grant swaps of the rollout scale it as they copy it (`power-units.ts`, used by the migration code).
 *     The Update plugin's box is never read: the DAO refuses ExecutePlugin for it, and UpgradeApp
 *     proposals use the `upgrade_app_ps` global.
 */
import type { SDKClient } from 'akita-sdk'
import { ProposalAction, ProposalActionEnum } from 'akita-sdk/dao'
import type { ScriptContext } from '../script-base'
import { proposeAndExecute } from '../utils'
import { DAO_STATE_FULLY_INITIALIZED } from './dao-wallet-plugin-migration'
import { comparesPowerInBaseUnits, isLegacyPower, isUnclearPower, LEGACY_POWER_MAX, POWER_SCALE, toBaseUnitPower } from './power-units'

export type Settings = { fee: bigint; power: bigint; duration: bigint; participation: bigint; approval: bigint }

/** UpdateFields field name and the generated client's global-state reader for each proposal class. */
export const PROPOSAL_SETTINGS_FIELDS = [
  ['upgrade_app_ps', 'upgradeAppProposalSettings'],
  ['add_plugin_ps', 'addPluginProposalSettings'],
  ['remove_plugin_ps', 'removePluginProposalSettings'],
  ['remove_execute_plugin_ps', 'removeExecutePluginProposalSettings'],
  ['add_allowance_ps', 'addAllowancesProposalSettings'],
  ['remove_allowance_ps', 'removeAllowancesProposalSettings'],
  ['new_escrow_ps', 'newEscrowProposalSettings'],
  ['toggle_escrow_lock_ps', 'toggleEscrowLockProposalSettings'],
  ['update_fields_ps', 'updateFieldsProposalSettings'],
] as const
export type SettingsField = (typeof PROPOSAL_SETTINGS_FIELDS)[number][0]

export type PowerRescalePlan = {
  /** The DAO compares power with base units (it is the upgraded DAO). */
  baseUnits: boolean
  daoState: bigint
  daoCreator: string
  actionLimit: number
  /** Globals whose power is still in whole tokens, with the value each gets. */
  fields: { field: SettingsField; current: Settings; target: bigint }[]
  /** Plugin settings boxes whose power is still in whole tokens. `inert`: the Update plugin's, never read. */
  boxes: { plugin: bigint; escrow: string; power: bigint; inert: boolean }[]
  /** Values no unit explains; nothing is guessed for them. */
  unclear: string[]
}

type ReadContext = Pick<ScriptContext, 'algorand' | 'dao'>

export async function planPowerRescale(ctx: ReadContext): Promise<PowerRescalePlan> {
  const g = ctx.dao.client.state.global
  const [daoState, pal, actionLimit, daoApp, boxes, ...settings] = await Promise.all([
    g.state(), g.pluginAppList(), g.proposalActionLimit(),
    ctx.algorand.client.algod.getApplicationByID(ctx.dao.appId).do(),
    ctx.dao.client.state.box.plugins.getMap(),
    ...PROPOSAL_SETTINGS_FIELDS.map(([, reader]) => g[reader]() as Promise<Settings | undefined>),
  ])
  const plan: PowerRescalePlan = {
    baseUnits: comparesPowerInBaseUnits(daoApp.params!.approvalProgram), daoState: BigInt(daoState ?? 0n), daoCreator: daoApp.params!.creator.toString(),
    actionLimit: Number(actionLimit ?? 1n), fields: [], boxes: [], unclear: [],
  }
  PROPOSAL_SETTINGS_FIELDS.forEach(([field], i) => {
    const current = settings[i]
    if (!current) throw new Error(`The DAO has no ${field} global`)
    if (isUnclearPower(current.power)) plan.unclear.push(`${field} power ${current.power}`)
    else if (isLegacyPower(current.power)) plan.fields.push({ field, current, target: toBaseUnitPower(current.power) })
  })
  for (const [key, value] of boxes) {
    if (isUnclearPower(value.power)) plan.unclear.push(`plugin ${key.plugin} escrow "${key.escrow}" power ${value.power}`)
    else if (isLegacyPower(value.power)) plan.boxes.push({ plugin: key.plugin, escrow: key.escrow, power: value.power, inert: key.plugin === pal?.update })
  }
  return plan
}

export function describePowerPlan(plan: PowerRescalePlan): string[] {
  const lines = [`DAO state ${plan.daoState}; power is compared in ${plan.baseUnits ? 'base units (upgraded DAO)' : 'whole tokens (DAO not upgraded yet)'}`]
  for (const f of plan.fields) lines.push(`${f.field}: power ${f.current.power} -> ${f.target}`)
  if (plan.fields.length === 0) lines.push('Every proposal settings global is in base units already')
  for (const b of plan.boxes) {
    lines.push(`plugin ${b.plugin} escrow "${b.escrow}": settings box power ${b.power} is in whole tokens` +
      (b.inert ? ' (the Update plugin: the DAO never reads this box)' : ' (rotate this grant with update:dao-wallet-plugins; the swap scales it)'))
  }
  for (const u of plan.unclear) lines.push(`UNCLEAR: ${u} is above the old cap of ${LEGACY_POWER_MAX} and below ${POWER_SCALE}; set it by hand`)
  return lines
}

/** What still stands between this plan and a DAO whose thresholds all mean what they say. */
export function powerProblems(plan: PowerRescalePlan): string[] {
  return [
    ...plan.fields.map((f) => `${f.field} power ${f.current.power} is in whole tokens`),
    ...plan.boxes.filter((b) => !b.inert).map((b) => `plugin ${b.plugin} escrow "${b.escrow}" settings power ${b.power} is in whole tokens`),
    ...plan.unclear,
  ]
}

/** Rewrites every legacy proposal settings global, in proposals of at most the DAO's action limit, and reads each back. */
export async function runPowerRescale(ctx: ScriptContext, plan: PowerRescalePlan, log: (line: string) => void = console.log): Promise<bigint[]> {
  if (!plan.baseUnits) throw new Error('The DAO still compares power in whole tokens; upgrade it first (rollout B2)')
  if (plan.daoState === BigInt(DAO_STATE_FULLY_INITIALIZED)) throw new Error('The DAO is initialized: this needs voted proposals, which this script does not drive')
  if (ctx.sender !== plan.daoCreator) throw new Error(`Only the DAO creator ${plan.daoCreator} can create pre-initialization proposals (sender ${ctx.sender})`)
  if (plan.unclear.length > 0) throw new Error(`Refusing to guess a unit: ${plan.unclear.join('; ')}`)

  const proposalIds: bigint[] = []
  for (let i = 0; i < plan.fields.length; i += plan.actionLimit) {
    const batch = plan.fields.slice(i, i + plan.actionLimit)
    const actions: ProposalAction<SDKClient>[] = batch.map((f) => ({
      type: ProposalActionEnum.UpdateFields, field: f.field, value: { ...f.current, power: f.target },
    }))
    proposalIds.push(await proposeAndExecute(ctx.algorand, ctx.dao, actions))
    log(`  Proposal ${proposalIds.at(-1)} executed: ${batch.map((f) => f.field).join(', ')}`)
  }

  const after = await planPowerRescale(ctx)
  if (after.fields.length > 0) throw new Error(`Still in whole tokens after the rescale: ${after.fields.map((f) => f.field).join(', ')}`)
  const g = ctx.dao.client.state.global
  for (const f of plan.fields) {
    const reader = PROPOSAL_SETTINGS_FIELDS.find(([field]) => field === f.field)![1]
    const now = await g[reader]() as Settings | undefined
    if (!now || now.power !== f.target || now.fee !== f.current.fee || now.duration !== f.current.duration ||
      now.participation !== f.current.participation || now.approval !== f.current.approval) {
      throw new Error(`${f.field} does not hold the expected settings after the rescale`)
    }
  }
  return proposalIds
}
