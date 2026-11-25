/**
 * LocalNet only: a demo Guild to exercise the apps' guild chat against.
 *
 * The apps link a group chat to a Guild that already exists, by its app ids. This script makes that Guild on
 * LocalNet and plays the other members, so every state of a proposal can be reached for real: two wallets
 * (Bob and Carol) are fixed signers next to the addresses given with --member, and they propose, vote,
 * close and run proposals from here while an app votes as its own user.
 *
 * Prerequisites: `npm run deploy:universe -- -n localnet`, then `npm run deploy:localnet-v2`.
 *
 *   npm run localnet:guild-demo -- create --member <address> [--member <address>] [--threshold 2] [--voting-seconds 120]
 *   npm run localnet:guild-demo -- propose <kind> [--draft] [--as bob|carol]   kinds: see PROPOSALS below
 *                                   [--agent <address>]                          the agent the proposal is about
 *   npm run localnet:guild-demo -- submit <proposalId> [--as bob|carol]         opens a draft's vote
 *   npm run localnet:guild-demo -- vote <proposalId> <yes|no|abstain> [--as bob|carol]
 *   npm run localnet:guild-demo -- finish <proposalId> [--execute]
 *   npm run localnet:guild-demo -- run <proposalId>
 *   npm run localnet:guild-demo -- cancel <proposalId> [--as bob|carol]         withdraws a passed proposal
 *   npm run localnet:guild-demo -- status [proposalId]
 *   npm run localnet:guild-demo -- clock [--follow [seconds]]            keep chain time on the wall clock
 *   npm run --silent localnet:guild-demo -- backend-env                  the backend's settings for trusting this Guild
 *
 * The LocalNet dispenser pays for and signs everything, so no key is created or stored. The ids of what it
 * creates are kept in .localnet-guild-demo.json beside .env.localnet.
 */
import { AlgorandClient, microAlgo } from '@algorandfoundation/algokit-utils'
import algosdk from 'algosdk'
import { createHash } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { setCurrentNetwork } from 'akita-sdk'
import {
  addPluginAction,
  addVotedPluginAction,
  fixedSignerConfiguration,
  fixedSignerConsensusAction,
  fixedSignerConsensusConfig,
  FixedSignerWeightMode,
  GuildActionType,
  newEscrowAction,
  removePluginAction,
  setProposalActionLimitAction,
  setProposalSettingsAction,
  toggleEscrowLockAction,
  type GuildProposalAction,
  type GuildProposalSettingsInput,
} from 'akita-sdk/guild'
import {
  CallerType,
  finishGuildProposal,
  GuildPluginSDK,
  newWallet,
  proposeToGuild,
  voteOnGuildProposal,
  WalletSDK,
} from 'akita-sdk/wallet'
import { GuildClient } from '../smart_contracts/artifacts/arc58/guilds/core/GuildClient'

const ENV_FILE = path.resolve(__dirname, '../.env.localnet')
const STATE_FILE = path.resolve(__dirname, '../.localnet-guild-demo.json')
const CONSENSUS = 'fixed-signers'
const VOTES = { yes: 10, no: 20, abstain: 30 } as const
const STATUS: Record<number, string> = { 0: 'draft', 10: 'invalid', 20: 'voting', 30: 'rejected', 40: 'approved', 50: 'executed' }

type Voter = 'bob' | 'carol'
type State = {
  genesisHash: string
  /** the GuildPlugin the two wallets carry */
  plugin: string
  wallets: Record<Voter, { app: string; address: string }>
  guild?: { app: string; consensus: string; wallet: string; members: string[]; threshold: string; votingSeconds: string }
  agent?: string
}

function readEnv(): Record<string, string> {
  if (!fs.existsSync(ENV_FILE)) throw new Error(`${ENV_FILE} not found: run deploy:universe -n localnet first`)
  const out: Record<string, string> = {}
  for (const line of fs.readFileSync(ENV_FILE, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/)
    if (m) out[m[1]] = m[2].replace(/^"(.*)"$/, '$1')
  }
  return out
}

function args(argv: string[]) {
  const positional: string[] = []
  const options: Record<string, string[]> = {}
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i]
    if (!arg.startsWith('--')) {
      positional.push(arg)
      continue
    }
    const next = argv[i + 1]
    const value = next === undefined || next.startsWith('--') ? 'true' : argv[(i += 1)]
    ;(options[arg.slice(2)] ??= []).push(value)
  }
  const one = (name: string, fallback?: string) => options[name]?.at(-1) ?? fallback
  return { positional, all: (name: string) => options[name] ?? [], one, flag: (name: string) => one(name) === 'true' }
}

const settings = (duration: bigint, overrides: Partial<GuildProposalSettingsInput> = {}): GuildProposalSettingsInput => ({
  fee: 0n,
  power: 1n,
  duration,
  participation: 0n,
  approval: 50_000n,
  minimumApprovals: 1n,
  ...overrides,
})

async function main() {
  const { positional, all, one, flag } = args(process.argv.slice(2))
  const [command, ...rest] = positional
  const env = readEnv()
  if (env.ALGORAND_NETWORK !== 'localnet') throw new Error('localnet-guild-demo only runs against LocalNet')
  setCurrentNetwork('localnet')
  for (const [k, v] of Object.entries(env)) process.env[k] ??= v

  const algorand = AlgorandClient.defaultLocalNet()
  const { genesisHash } = await algorand.client.algod.getTransactionParams().do()
  const network = Buffer.from(genesisHash ?? new Uint8Array()).toString('base64')
  const operator = await algorand.account.dispenserFromEnvironment()
  const sender = operator.addr.toString()
  const signer = operator.signer
  algorand.setSigner(sender, signer)
  const sendAs = { sender, signer }
  const id = (key: string) => {
    if (!env[key]) throw new Error(`${key} is missing from .env.localnet: run deploy:localnet-v2`)
    return BigInt(env[key])
  }
  const plugin = new GuildPluginSDK({ algorand, factoryParams: { appId: id('GUILD_PLUGIN_APP_ID'), defaultSender: sender, defaultSigner: signer } })

  // A LocalNet in dev mode makes a block only when a transaction arrives, and a block's time may be at most
  // 25 seconds after the one before it, so an idle chain falls behind the clock on the wall. Voting windows
  // are in chain time and the apps count them down in wall time: empty blocks bring the two back together.
  const chainLag = async () => {
    const { lastRound } = await algorand.client.algod.status().do()
    const { block } = await algorand.client.algod.block(lastRound).do()
    return Math.floor(Date.now() / 1000) - Number(block.header.timestamp)
  }
  const syncClock = async () => {
    let blocks = 0
    while ((await chainLag()) > 2) {
      await algorand.send.payment({ sender, receiver: sender, amount: microAlgo(0), note: `clock ${Date.now()} ${blocks}`, suppressLog: true })
      blocks += 1
    }
    return blocks
  }
  await syncClock()

  let state: State | undefined = fs.existsSync(STATE_FILE) ? (JSON.parse(fs.readFileSync(STATE_FILE, 'utf8')) as State) : undefined
  // a reset LocalNet is another chain, and a redeployed GuildPlugin is not the one the wallets carry
  if (state && (state.genesisHash !== network || state.plugin !== env.GUILD_PLUGIN_APP_ID)) state = undefined
  const save = (next: State) => {
    state = next
    fs.writeFileSync(STATE_FILE, `${JSON.stringify(next, null, 2)}\n`)
  }
  const walletOf = (voter: Voter) => {
    if (!state) throw new Error('No demo Guild on this LocalNet yet: run `create` first')
    return new WalletSDK({ algorand, readerAccount: sender, factoryParams: { appId: BigInt(state.wallets[voter].app), defaultSender: sender, defaultSigner: signer } })
  }
  const guild = () => {
    if (!state?.guild) throw new Error('No demo Guild on this LocalNet yet: run `create` first')
    return state.guild
  }
  const voter = (): Voter => {
    const name = one('as', 'bob')
    if (name !== 'bob' && name !== 'carol') throw new Error('--as is bob or carol')
    return name
  }
  const member = (who: Voter) => ({ wallet: walletOf(who), guildPlugin: plugin, guild: BigInt(guild().app), callerType: CallerType.Admin, ...sendAs })
  const client = () => new GuildClient({ algorand, appId: BigInt(guild().app), defaultSender: sender, defaultSigner: signer })

  const print = async (proposalId: bigint) => {
    const reads = { args: { proposalId }, extraFee: microAlgo(2_000) }
    const { return: proposal } = await client().send.getProposal(reads)
    if (!proposal) throw new Error(`Proposal ${proposalId} was not found`)
    const status = Number(proposal.status)
    const cancelled = status === 10 && proposal.votingTs > 0n
    const line = [`#${proposalId}`, cancelled ? 'cancelled' : (STATUS[status] ?? `status ${status}`), `${proposal.actions.length} action(s): ${proposal.actions.map(([type]) => GuildActionType[Number(type)] ?? type).join(', ')}`]
    // a proposal that never went to a vote, as a draft or the setup proposal, has no ballot
    if (proposal.votingTs > 0n) {
      const { return: ballot } = await client().send.getBallot(reads)
      if (ballot) {
        const end = new Date(Number(ballot.votingEnd) * 1000).toISOString().slice(11, 19)
        line.push(`yes ${ballot.votes.approvals} / no ${ballot.votes.rejections} / abstain ${ballot.votes.abstains} of ${ballot.eligiblePower}`, `voting ends ${end} UTC`)
      }
    }
    console.log(line.join(' · '))
  }

  switch (command) {
    case 'create': {
      const others = all('member')
      for (const address of others) if (!algosdk.isValidAddress(address)) throw new Error(`${address} is not an address`)
      const threshold = BigInt(one('threshold', '2')!)
      const votingSeconds = BigInt(one('voting-seconds', '120')!)

      const wallets = {} as State['wallets']
      for (const name of ['bob', 'carol'] as const) {
        const existing = state?.wallets[name]
        if (existing) {
          wallets[name] = existing
          continue
        }
        const wallet = await newWallet({
          algorand,
          factoryParams: { appId: id('WALLET_FACTORY_APP_ID'), defaultSender: sender, defaultSigner: signer },
          sender,
          signer,
          readerAccount: sender,
          nickname: `guild-demo-${name}-${Date.now() % 1_000_000}`,
          // Bob pays to create the Guild and funds its treasury
          extraFunding: name === 'bob' ? 600_000_000n : 20_000_000n,
        })
        const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n })
        await wallet.client.appClient.fundAppAccount({ amount: microAlgo(mbr.plugins) })
        await wallet.addPlugin({ client: plugin, callerType: CallerType.Admin })
        const address = (await wallet.client.state.global.controlledAddress())!
        wallets[name] = { app: wallet.appId.toString(), address }
        console.log(`   ${name}: wallet ${wallet.appId}, member address ${address}`)
      }
      save({ genesisHash: network, plugin: env.GUILD_PLUGIN_APP_ID, wallets })

      // an app votes from its user's own address, which pays the fees and the vote's storage itself
      for (const address of others) await algorand.send.payment({ sender, receiver: address, amount: microAlgo(20_000_000n) })
      const members = [...new Set([...others, wallets.bob.address, wallets.carol.address])]
      const vote = settings(votingSeconds)
      const created = await walletOf('bob').usePlugin({
        ...sendAs,
        callerType: CallerType.Admin,
        consolidateFees: true,
        calls: [
          ...Array.from({ length: 6 }, (_, nonce) => plugin.opUp({ ...sendAs, rekeyBack: false, nonce: BigInt(nonce) })),
          plugin.createGuild({
            ...sendAs,
            consensusName: CONSENSUS,
            baseConfig: {
              proposalActionLimit: 12n,
              proposalSettings: {
                upgradeApp: vote,
                addPlugin: vote,
                removeExecution: vote,
                removePlugin: vote,
                addAllowances: vote,
                removeAllowances: vote,
                newEscrow: vote,
                toggleEscrowLock: vote,
                updateGuild: vote,
              },
            },
            governanceConfig: fixedSignerConsensusConfig(threshold),
            consensusConfig: fixedSignerConfiguration(FixedSignerWeightMode.Equal, members.map((address) => [address, 1n])),
            nickname: one('name', 'Demo Guild')!,
            funding: 20_000_000n,
            // members can pay from the treasury by vote
            actions: [addVotedPluginAction({ plugin: id('PAY_PLUGIN_APP_ID'), settings: vote })] as never,
          }),
        ],
      })
      // createGuild is the last call, and returns the three apps it made
      const returned = ([...created.returns] as unknown[]).reverse().find((value) => value !== undefined && value !== null)
      const ids = (returned && typeof returned === 'object' && 'returnValue' in returned ? returned.returnValue : returned) as
        | { guild: bigint; consensus: bigint; wallet: bigint }
        | [bigint, bigint, bigint]
        | undefined
      if (!ids) throw new Error('createGuild returned no app ids')
      const [guildApp, consensus, treasury] = Array.isArray(ids) ? ids : [ids.guild, ids.consensus, ids.wallet]
      await walletOf('bob').usePlugin({ ...sendAs, callerType: CallerType.Admin, consolidateFees: true, calls: [plugin.initialize({ ...sendAs, guild: guildApp })] })
      save({
        genesisHash: network,
        plugin: env.GUILD_PLUGIN_APP_ID,
        wallets,
        guild: { app: guildApp.toString(), consensus: consensus.toString(), wallet: treasury.toString(), members, threshold: threshold.toString(), votingSeconds: votingSeconds.toString() },
      })
      console.log(`\nDemo Guild is active. Link a group chat to it with:`)
      console.log(`   Guild application ID:      ${guildApp}`)
      console.log(`   Consensus application ID:  ${consensus}`)
      console.log(`   Guild wallet app ID:       ${treasury}`)
      console.log(`   ${members.length} equal signers, ${threshold} approvals pass, votes run ${votingSeconds}s`)
      break
    }

    case 'propose': {
      const kind = rest[0]
      const duration = BigInt(guild().votingSeconds)
      // --agent names the agent the proposals are about; without it a made-up address stands in
      const agent = one('agent') ?? state!.agent ?? algorand.account.random().addr.toString()
      if (state!.agent !== agent) save({ ...state!, agent })
      const pay = id('PAY_PLUGIN_APP_ID')
      const PROPOSALS: Record<string, () => GuildProposalAction[]> = {
        // an escrow, and an agent that may use the pay plugin on it
        'agent': () => [newEscrowAction('ops', algosdk.ALGORAND_ZERO_ADDRESS_STRING), addPluginAction({ plugin: pay, caller: agent, escrow: 'ops' })],
        // the same grant on the Guild's wallet itself, which the card warns about
        'agent-on-wallet': () => [addPluginAction({ plugin: pay, caller: agent })],
        'remove-agent': () => [removePluginAction({ plugin: pay, caller: agent, escrow: 'ops' })],
        'lock-escrow': () => [toggleEscrowLockAction('ops')],
        'rules': () => [setProposalSettingsAction(GuildActionType.AddPlugin, settings(duration, { approval: 60_000n })), setProposalActionLimitAction(10n)],
        'member': () => [fixedSignerConsensusAction.addMembers(FixedSignerWeightMode.Equal, [[algorand.account.random().addr.toString(), 1n]])],
        'threshold': () => [fixedSignerConsensusAction.setThreshold(BigInt(guild().threshold))],
      }
      if (!kind || !PROPOSALS[kind]) throw new Error(`propose <kind>: one of ${Object.keys(PROPOSALS).join(', ')}`)
      const actions = PROPOSALS[kind]()
      if (!flag('draft')) {
        const proposalId = await proposeToGuild({ ...member(voter()), actions })
        console.log(`Proposal ${proposalId} (${kind}) is open for voting, proposed by ${voter()}`)
        await print(proposalId)
        break
      }
      const proposalId = BigInt((await algorand.app.getGlobalState(BigInt(guild().app))).proposal_id?.value ?? 1n)
      await walletOf(voter()).usePlugin({
        ...sendAs,
        callerType: CallerType.Admin,
        consolidateFees: true,
        calls: [
          ...Array.from({ length: 6 }, (_, nonce) => plugin.opUp({ ...sendAs, rekeyBack: false, nonce: BigInt(nonce) })),
          plugin.newProposal({ ...sendAs, guild: BigInt(guild().app), cid: new Uint8Array(36), actions: actions as never, evidence: new Uint8Array() }),
        ],
      })
      console.log(`Proposal ${proposalId} (${kind}) is a draft by ${voter()}: \`submit ${proposalId}\` opens its vote`)
      await print(proposalId)
      break
    }

    case 'submit':
    case 'cancel': {
      // opening a draft's vote, and withdrawing a passed proposal before it runs, are its proposer's to do
      const proposalId = BigInt(rest[0] ?? '')
      const call = { ...sendAs, guild: BigInt(guild().app), proposalId }
      await walletOf(voter()).usePlugin({
        ...sendAs,
        callerType: CallerType.Admin,
        consolidateFees: true,
        calls: [
          ...Array.from({ length: 6 }, (_, nonce) => plugin.opUp({ ...sendAs, rekeyBack: false, nonce: BigInt(nonce) })),
          command === 'submit' ? plugin.submitProposal({ ...call, evidence: new Uint8Array() }) : plugin.cancelProposal(call),
        ],
      })
      await print(proposalId)
      break
    }

    case 'vote': {
      const proposalId = BigInt(rest[0] ?? '')
      const choice = rest[1] as keyof typeof VOTES
      if (!(choice in VOTES)) throw new Error('vote <proposalId> <yes|no|abstain>')
      await voteOnGuildProposal({ ...member(voter()), proposalId, vote: VOTES[choice] })
      console.log(`${voter()} voted ${choice}`)
      await print(proposalId)
      break
    }

    case 'finish': {
      const proposalId = BigInt(rest[0] ?? '')
      await finishGuildProposal({ ...member(voter()), proposalId, execute: flag('execute') })
      await print(proposalId)
      break
    }

    case 'run': {
      const proposalId = BigInt(rest[0] ?? '')
      await finishGuildProposal({ ...member(voter()), proposalId, finalize: false, execute: true })
      await print(proposalId)
      break
    }

    case 'status': {
      const current = guild()
      console.log(`Guild ${current.app} · consensus ${current.consensus} · wallet ${current.wallet} · ${current.members.length} signers, ${current.threshold} approvals pass`)
      if (rest[0]) {
        await print(BigInt(rest[0]))
        break
      }
      const next = BigInt((await algorand.app.getGlobalState(BigInt(current.app))).proposal_id?.value ?? 1n)
      for (let proposalId = 1n; proposalId < next; proposalId += 1n) await print(proposalId).catch(() => undefined)
      break
    }

    case 'clock': {
      const follow = one('follow')
      const every = follow === undefined ? 0 : follow === 'true' ? 5 : Number(follow)
      const lag = await chainLag()
      console.log(
        lag >= 0
          ? `Chain time is ${lag}s behind the wall clock`
          : // tests that warp time leave the chain ahead, and it cannot go back: votes then end late for an app
            `Chain time is ${-lag}s AHEAD of the wall clock. Reset LocalNet before timing a vote against an app.`,
      )
      // --follow keeps it there, for as long as an app is counting down a vote
      while (every > 0) {
        await new Promise((resolve) => setTimeout(resolve, every * 1000))
        await algorand.send.payment({ sender, receiver: sender, amount: microAlgo(0), note: `clock ${Date.now()}`, suppressLog: true })
        await syncClock()
      }
      break
    }

    case 'backend-env': {
      // The backend links a chat only to a Guild whose two factories and exact program pairs it was told to trust
      const current = guild()
      const programPair = async (app: string) => {
        const { params } = await algorand.client.algod.getApplicationByID(BigInt(app)).do()
        if (!params) throw new Error(`App ${app} is not on this LocalNet`)
        const sha256 = (program: Uint8Array) => createHash('sha256').update(program).digest('hex')
        return `${sha256(params.approvalProgram)}:${sha256(params.clearStateProgram)}`
      }
      console.log(`AKITA_GUILD_FACTORY_APP_ID=${id('GUILD_FACTORY_APP_ID')}`)
      console.log(`AKITA_GUILD_CONSENSUS_FACTORY_APP_ID=${id('GUILD_CONSENSUS_FACTORY_APP_ID')}`)
      console.log(`AKITA_GUILD_PROGRAM_SHA256_ALLOWLIST=${await programPair(current.app)}`)
      console.log(`AKITA_GUILD_CONSENSUS_PROGRAM_SHA256_ALLOWLIST=${await programPair(current.consensus)}`)
      break
    }

    default:
      throw new Error('Commands: create, propose, submit, vote, finish, run, cancel, status, clock, backend-env')
  }
}

main().catch((error) => {
  console.error(`\n❌ localnet-guild-demo failed: ${error instanceof Error ? error.message : error}`)
  if (process.env.DEBUG && error instanceof Error) console.error(error.stack)
  process.exit(1)
})
