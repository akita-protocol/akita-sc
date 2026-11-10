import { microAlgo } from '@algorandfoundation/algokit-utils'
import { AlgorandClient } from '@algorandfoundation/algokit-utils/types/algorand-client'
import { SDKClient } from 'akita-sdk'
import { AkitaDaoSDK, ProposalAction, ProposalActionEnum } from 'akita-sdk/dao'
import { RewardsSDK } from 'akita-sdk/rewards'
import { CallerType, RewardsPluginSDK } from 'akita-sdk/wallet'
import algosdk from 'algosdk'
import { getAppFundingNeeded, proposeAndExecute } from '../utils'

/**
 * Recovers the MBR credits a DAO wallet escrow holds on a Rewards app (STAKE-4): the v1 Welcome
 * disbursements on MainNet 3569556095 were created by the `stickers` escrow and still hold their
 * released allocation MBR as withdrawable credits.
 *
 * Flow: proposal 1 grants `caller` the RewardsPlugin's `withdrawMbrCredits` on the escrow (unlocking
 * it if needed); `caller` withdraws every credit through the plugin; proposal 2 removes the grant and
 * restores the lock. The credits land on the escrow itself.
 */

export type CreditWithdrawal = { id: bigint; amount: bigint }

export type WithdrawalConfig = {
  algorand: AlgorandClient
  dao: AkitaDaoSDK
  /** a RewardsPlugin whose `legacy_rewards` (or the registry) names `rewards` */
  plugin: RewardsPluginSDK
  rewards: RewardsSDK
  escrow: string
  caller: string
  signer: algosdk.TransactionSigner
  /** plugin calls per wallet group (rekey + calls must fit 16 transactions) */
  batch?: number
}

const SOURCE_LINK = 'https://github.com/kylebee/akita-sc'

export async function escrowAddress(dao: AkitaDaoSDK, escrow: string): Promise<{ address: string; locked: boolean }> {
  await dao.getWallet()
  // a box read, not a simulated call, so a dry run needs no funded sender
  const info = await dao.wallet.client.state.box.escrows.value(escrow)
  if (info === undefined) throw new Error(`DAO wallet has no escrow "${escrow}"`)
  const address = info.address === algosdk.ALGORAND_ZERO_ADDRESS_STRING
    ? algosdk.getApplicationAddress(info.id).toString()
    : info.address
  return { address, locked: info.locked }
}

/** Every disbursement `creator` made on `rewards` that still holds withdrawable credits. */
export async function planCreditWithdrawals(rewards: RewardsSDK, creator: string): Promise<CreditWithdrawal[]> {
  const disbursements = await rewards.getDisbursements()
  return [...disbursements.entries()]
    .filter(([, d]) => d.creator === creator && d.mbrCredits > 0n)
    .map(([id, d]) => ({ id, amount: d.mbrCredits }))
    .sort((a, b) => (a.id < b.id ? -1 : 1))
}

export function grantActions(plugin: RewardsPluginSDK, caller: string, escrow: string, locked: boolean): ProposalAction<SDKClient>[] {
  const actions: ProposalAction<SDKClient>[] = []
  if (locked) {
    actions.push({ type: ProposalActionEnum.ToggleEscrowLock, escrow } as ProposalAction<SDKClient>)
  }
  actions.push({
    type: ProposalActionEnum.AddPlugin,
    client: plugin,
    callerType: CallerType.Other,
    caller,
    escrow,
    sourceLink: SOURCE_LINK,
    useExecutionKey: false,
    methods: [{ name: plugin.withdrawMbrCredits(), cooldown: 0n }],
  } as ProposalAction<SDKClient>)
  return actions
}

export function revokeActions(plugin: RewardsPluginSDK, caller: string, escrow: string, relock: boolean): ProposalAction<SDKClient>[] {
  const actions: ProposalAction<SDKClient>[] = [
    { type: ProposalActionEnum.RemovePlugin, plugin: plugin.appId, caller, escrow } as ProposalAction<SDKClient>,
  ]
  if (relock) {
    actions.push({ type: ProposalActionEnum.ToggleEscrowLock, escrow } as ProposalAction<SDKClient>)
  }
  return actions
}

/** Withdraws `plan` through the granted plugin, `batch` calls per wallet group; only the last call rekeys back. */
export async function withdrawCredits(config: WithdrawalConfig, plan: CreditWithdrawal[]): Promise<void> {
  const { dao, plugin, rewards, escrow, caller, signer, batch = 6 } = config
  for (let i = 0; i < plan.length; i += batch) {
    const chunk = plan.slice(i, i + batch)
    await dao.wallet.usePlugin({
      sender: caller,
      signer,
      callerType: CallerType.Other,
      escrow,
      calls: chunk.map(({ id, amount }, j) => plugin.withdrawMbrCredits({
        sender: caller,
        signer,
        rewardsApp: rewards.appId,
        id,
        amount,
        rekeyBack: j === chunk.length - 1,
      })),
    })
  }
}

/** Grant, withdraw every credit, revoke. Returns what was withdrawn. */
export async function runCreditWithdrawal(config: WithdrawalConfig): Promise<CreditWithdrawal[]> {
  const { algorand, dao, plugin, rewards, escrow, caller, signer } = config
  const { address, locked } = await escrowAddress(dao, escrow)
  const plan = await planCreditWithdrawals(rewards, address)
  if (plan.length === 0) return plan

  const mbr = await dao.wallet.getMbr({ escrow, methodCount: 1n, plugin: '', groups: 0n })
  const funding = await getAppFundingNeeded(algorand, dao.wallet.client.appAddress.toString(), mbr.plugins + 1_000_000n)
  if (funding > 0n) {
    await algorand.send.payment({ sender: caller, signer, receiver: dao.wallet.client.appAddress, amount: microAlgo(funding) })
  }

  await proposeAndExecute(algorand, dao, grantActions(plugin, caller, escrow, locked))
  await dao.wallet.getPlugins()
  await withdrawCredits(config, plan)
  await proposeAndExecute(algorand, dao, revokeActions(plugin, caller, escrow, locked))
  return plan
}
