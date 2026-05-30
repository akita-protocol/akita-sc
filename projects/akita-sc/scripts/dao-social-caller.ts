import { AlgorandClient, microAlgo } from '@algorandfoundation/algokit-utils'
import type { TransactionSigner } from '@algorandfoundation/algokit-utils/transact'
import type { SDKClient } from 'akita-sdk'
import { AkitaDaoSDK, ProposalAction, ProposalActionEnum } from 'akita-sdk/dao'
import { CallerType, NFDPluginSDK, SelfOptInPluginSDK, SocialPluginSDK } from 'akita-sdk/wallet'
import { getAppFundingNeeded, proposeAndExecute } from './utils'

export type DaoSocialCallerInstallParams = {
  algorand: AlgorandClient
  dao: AkitaDaoSDK
  socialPlugin: SocialPluginSDK
  nfdPlugin?: NFDPluginSDK
  selfOptInPlugin?: SelfOptInPluginSDK
  sender: string
  signer: TransactionSigner
  caller: string
  sourceLink?: string
  dryRun?: boolean
}

function canCallResultAllowed(result: unknown): boolean {
  if (result === true) return true
  if (result && typeof result === 'object' && 'return' in result) {
    return (result as { return?: unknown }).return === true
  }
  return false
}

function getMethodSelectors(method: unknown): Uint8Array[] {
  if (typeof method === 'function') {
    return method().selectors ?? []
  }
  return method as Uint8Array[]
}

export async function installDaoSocialCaller({
  algorand,
  dao,
  socialPlugin,
  nfdPlugin,
  selfOptInPlugin,
  sender,
  signer,
  caller,
  sourceLink = 'https://github.com/kylebee/akita-sc',
  dryRun = false,
}: DaoSocialCallerInstallParams): Promise<{ installed: boolean; proposalIds: bigint[] }> {
  dao.setSendParams({ sender, signer })

  const daoWallet = await dao.getWallet()
  const proposalIds: bigint[] = []

  async function installCallerGrant(
    label: string,
    client: SocialPluginSDK | NFDPluginSDK | SelfOptInPluginSDK,
    callerType: typeof CallerType.Other | typeof CallerType.Global,
    canCallMethod: unknown,
  ): Promise<void> {
    const methodSelectors = getMethodSelectors(canCallMethod)

    const canCall = await daoWallet.canCall({
      sender,
      signer,
      plugin: client.appId,
      type: callerType,
      address: caller,
      escrow: '',
      methods: methodSelectors,
    })

    if (canCall.every(canCallResultAllowed)) {
      console.log(`DAO ${label} caller already installed`)
      return
    }

    if (dryRun) {
      console.log(`DRY RUN - would install ${label} caller ${caller}`)
      return
    }

    const mbr = await daoWallet.getMbr({
      escrow: '',
      methodCount: 0n,
      plugin: '',
      groups: 0n,
    })
    const walletFunding = await getAppFundingNeeded(
      algorand,
      daoWallet.client.appAddress.toString(),
      mbr.plugins,
    )

    if (walletFunding > 0n) {
      await daoWallet.client.appClient.fundAppAccount({ amount: microAlgo(walletFunding) })
    }

    const actions: ProposalAction<SDKClient>[] = [
      callerType === CallerType.Global ? {
        type: ProposalActionEnum.AddPlugin,
        client,
        callerType,
        escrow: '',
        sourceLink,
        useExecutionKey: false,
      } : {
        type: ProposalActionEnum.AddPlugin,
        client,
        callerType,
        caller,
        escrow: '',
        sourceLink,
        useExecutionKey: false,
      },
    ]

    const proposalCost = await dao.proposalCost({ sender, signer, actions })
    console.log(`DAO ${label} caller proposal cost: total=${proposalCost.total}, fee=${proposalCost.fee}, mbr=${proposalCost.mbr}`)

    proposalIds.push(await proposeAndExecute(algorand, dao, actions))
  }

  await installCallerGrant('social-plugin', socialPlugin, CallerType.Other, socialPlugin.post())

  if (nfdPlugin) {
    await installCallerGrant('nfd-plugin', nfdPlugin, CallerType.Other, nfdPlugin.renew())
    await installCallerGrant('nfd-plugin auto-renew global', nfdPlugin, CallerType.Global, nfdPlugin.autoRenew())
  }

  if (selfOptInPlugin) {
    await installCallerGrant('self-opt-in-plugin', selfOptInPlugin, CallerType.Other, selfOptInPlugin.optIn())
  }

  return { installed: proposalIds.length > 0, proposalIds }
}
