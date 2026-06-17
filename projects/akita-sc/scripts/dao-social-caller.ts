import { AlgorandClient, microAlgo } from '@algorandfoundation/algokit-utils'
import type { TransactionSigner } from '@algorandfoundation/algokit-utils/transact'
import type { SDKClient } from 'akita-sdk'
import { AkitaDaoSDK, ProposalAction, ProposalActionEnum } from 'akita-sdk/dao'
import { AsaManagerPluginSDK, CallerType, NFDPluginSDK, SelfOptInPluginSDK, SocialPluginSDK } from 'akita-sdk/wallet'
import { getAppFundingNeeded, proposeAndExecute } from './utils'

export type DaoSocialCallerInstallParams = {
  algorand: AlgorandClient
  dao: AkitaDaoSDK
  socialPlugin: SocialPluginSDK
  asaManagerPlugin?: AsaManagerPluginSDK
  nfdPlugin?: NFDPluginSDK
  selfOptInPlugin?: SelfOptInPluginSDK
  sender: string
  signer: TransactionSigner
  caller: string
  sourceLink?: string
  dryRun?: boolean
}

export async function installDaoSocialCaller({
  algorand,
  dao,
  socialPlugin,
  asaManagerPlugin,
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
    client: SocialPluginSDK | AsaManagerPluginSDK | NFDPluginSDK | SelfOptInPluginSDK,
  ): Promise<void> {
    try {
      const info = await daoWallet.getPluginByKey({ plugin: client.appId, caller, escrow: '' })
      if (info.start !== 0n) {
        console.log(`DAO ${label} caller already installed`)
        return
      }
    } catch {
      // Missing plugin grant; install it below.
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
      {
        type: ProposalActionEnum.AddPlugin,
        client,
        callerType: CallerType.Other,
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

  await installCallerGrant('social-plugin', socialPlugin)

  if (asaManagerPlugin) {
    await installCallerGrant('asa-manager-plugin', asaManagerPlugin)
  }

  if (nfdPlugin) {
    await installCallerGrant('nfd-plugin', nfdPlugin)
  }

  if (selfOptInPlugin) {
    await installCallerGrant('self-opt-in-plugin', selfOptInPlugin)
  }

  return { installed: proposalIds.length > 0, proposalIds }
}
