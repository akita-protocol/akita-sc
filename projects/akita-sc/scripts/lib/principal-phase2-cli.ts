/**
 * The Phase 2 command line (`principal-phase2-upgrade-targets.ts`), also behind the update scripts of
 * Phase 2 targets (`update-wallet-factory.ts`, `update-hyper-swap.ts`, `update-poll.ts`), so every one of
 * them goes through the same ABI guard, child checks and lockstep plugin swap (ROLLOUT-3).
 */
import { parseBaseArgs, setupContext } from '../script-base'
import { parseRemovalWaivers, runPhase2 } from './principal-rollout-run'
import { selectPhase2Targets } from './principal-rollout'

export type Phase2CliOptions = {
  /** Fixed targets (an update script); otherwise `--target` (default: all Phase 2 targets). */
  targets?: readonly string[]
  /** Push only the children (`update-wallet-factory.ts` without `--update-factory`). */
  childOnly?: boolean
  /** Extra help lines of the calling script. */
  help?: string
}

export async function runPhase2Cli(script: string, cli: Phase2CliOptions = {}): Promise<void> {
  const args = process.argv.slice(2)
  const values = (key: string) => args.flatMap((a, i) => (a === key ? [args[i + 1]] : []))
  const options = parseBaseArgs(script, `${cli.help ?? ''}
Phase 2 options:
${cli.targets ? '' : '  --target <name[,name]>   Upgrade only these targets (default: all; also AkitaDAO, HyperSwap, PollFactory)\n'}  --split-children         Push each child in its own group after its factory (not atomic; use if a
                           combined group does not build, e.g. a resource carrier pushes it past 16 txns).
                           Refused for AbstractedAccountFactory: the wallet always lands with its factory
  --lockstep-deployed <Name=id,...>  New versions of lockstep plugins (HyperSwapPlugin, PollPluginContract)
                           that are already deployed
  --manifest-dir <dir>     Deployment receipts for lockstep plugins this run deploys
  --register               Record newly deployed lockstep plugins in the SDK registry (testnet/mainnet)
  --update-plugin <id>     The Phase 2a Update plugin (default: the SDK registry's latest)
  --app <key>=<id>         Override a target app id (e.g. on LocalNet). Repeatable
  --accept-removed <Target>:<sig>|all  One-off waiver of an ARC-4 method the upgrade removes that is
                           NOT an accepted decision (scripts/lib/principal-accepted-abi-removals.json), for
                           that target only. Repeatable; 'all' waives every unlisted removal, prints each
                           one and a WARNING with the count, and with --confirm also needs --i-know
  --i-know                 Second confirmation for --accept-removed all with --confirm
  --accept-unknown-abi     Proceed when a live program is not in the deployed-ABI snapshot
  --first-valid <round>    First round of the execution window (default: see Windows above)
  --window-rounds <n>      Length of the execution window in rounds (default 2,000; 10,000 on a voting DAO)
  --lead-rounds <n>        Open the voted window this many rounds before the estimated vote end (default 2,000)
  --round-seconds <s>      Seconds per round for the vote-end estimate (default: measured)
  --submit                 Submit a new draft for voting at once (voting DAO)
  --confirm                Required for any write`)
  if (!args.includes('--network') && !args.includes('-n')) throw new Error('An explicit --network is required')
  // fail fast on a bare-signature waiver (each one must name its target)
  const accepted = values('--accept-removed').filter((v): v is string => Boolean(v))
  if (!accepted.includes('all')) parseRemovalWaivers(accepted)
  const ctx = await setupContext(options, { minBalance: 5_000_000n })
  const updatePlugin = values('--update-plugin')[0]
  if (updatePlugin) ctx.appIds.updatePlugin = BigInt(updatePlugin)
  for (const override of values('--app')) {
    const [key, id] = (override ?? '').split('=')
    if (!key || !/^[1-9][0-9]*$/.test(id ?? '')) throw new Error(`--app ${override}: expected key=id`)
    ;(ctx.appIds as unknown as Record<string, bigint>)[key] = BigInt(id)
  }
  const numberArg = (key: string) => {
    const raw = values(key)[0]
    if (raw === undefined) return undefined
    if (!/^[0-9]+(\.[0-9]+)?$/.test(raw)) throw new Error(`${key} ${raw}: expected a number`)
    return Number(raw)
  }
  const firstValid = values('--first-valid')[0]
  if (firstValid !== undefined && !/^[1-9][0-9]*$/.test(firstValid)) throw new Error(`--first-valid ${firstValid}: expected a round`)
  if (cli.targets && args.includes('--target')) throw new Error(`${script} upgrades ${cli.targets.join(', ')} only; drop --target`)
  const targets = selectPhase2Targets(cli.targets ?? values('--target').flatMap((v) => (v ?? '').split(',')).map((v) => v.trim()).filter(Boolean))
  const lockstepDeployed: Record<string, bigint> = {}
  for (const pair of values('--lockstep-deployed').flatMap((v) => (v ?? '').split(',')).map((v) => v.trim()).filter(Boolean)) {
    const [name, id] = pair.split('=')
    if (!name || !/^[1-9][0-9]*$/.test(id ?? '')) throw new Error(`--lockstep-deployed ${pair}: expected Name=id`)
    lockstepDeployed[name] = BigInt(id)
  }
  const results = await runPhase2(ctx, {
    targets,
    splitChild: args.includes('--split-children'),
    childOnly: cli.childOnly,
    lockstepDeployed,
    manifestDir: values('--manifest-dir')[0],
    register: args.includes('--register'),
    confirm: args.includes('--confirm'),
    proposalId: options.proposalId,
    submit: args.includes('--submit'),
    firstValid: firstValid !== undefined ? BigInt(firstValid) : undefined,
    windowRounds: numberArg('--window-rounds'),
    leadRounds: numberArg('--lead-rounds'),
    roundSeconds: numberArg('--round-seconds'),
    acceptRemoved: accepted.includes('all') ? 'all' : accepted,
    confirmWaiveAll: args.includes('--i-know'),
    acceptUnknownAbi: args.includes('--accept-unknown-abi'),
  })
  console.log('\nPhase 2 results:')
  for (const r of results) {
    console.log(`  ${r.target} ${r.appId}: ${r.status}${r.proposalId !== undefined ? ` (proposal ${r.proposalId})` : ''}` +
      `${r.window ? `, window rounds ${r.window.firstValid}-${r.window.lastValid}` : ''}`)
  }
}
