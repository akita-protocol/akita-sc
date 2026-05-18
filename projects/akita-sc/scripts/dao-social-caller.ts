import { AlgorandClient, microAlgo } from '@algorandfoundation/algokit-utils'
import type { TransactionSigner } from '@algorandfoundation/algokit-utils/transact'
import { AkitaDaoSDK, ProposalActionEnum } from 'akita-sdk/dao'
import { CallerType, SelfOptInPluginSDK, SocialPluginSDK } from 'akita-sdk/wallet'
import { getAppFundingNeeded, proposeAndExecute } from './utils'

export type DaoSocialCallerInstallParams = {
  algorand: AlgorandClient
  dao: AkitaDaoSDK
  socialPlugin: SocialPluginSDK
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

export async function installDaoSocialCaller({
  algorand,
  dao,
  socialPlugin,
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
    client: SocialPluginSDK | SelfOptInPluginSDK,
    methods: Array<{ name: any; cooldown: bigint }>,
  ): Promise<void> {
    const methodSelectors = methods.flatMap((method) => method.name().selectors)

    const canCall = await daoWallet.canCall({
      sender,
      signer,
      plugin: client.appId,
      type: CallerType.Other,
      address: caller,
      escrow: '',
      methods: methodSelectors,
    })

    if (canCall.every(canCallResultAllowed)) {
      console.log(`DAO ${label} caller already installed`)
      return
    }

    const mbr = await daoWallet.getMbr({
      escrow: '',
      methodCount: BigInt(methods.length),
      plugin: '',
      groups: 0n,
    })
    const walletFunding = await getAppFundingNeeded(
      algorand,
      daoWallet.client.appAddress.toString(),
      mbr.plugins,
    )

    if (dryRun) {
      console.log(`DRY RUN - would fund DAO wallet with ${walletFunding} microALGO if needed`)
      console.log(`DRY RUN - would install ${label} caller ${caller}`)
      return
    }

    if (walletFunding > 0n) {
      await daoWallet.client.appClient.fundAppAccount({ amount: microAlgo(walletFunding) })
    }

    const actions = [
      {
        type: ProposalActionEnum.AddPlugin,
        client,
        callerType: CallerType.Other,
        caller,
        escrow: '',
        sourceLink,
        useExecutionKey: false,
        methods,
      },
    ]

    const proposalCost = await dao.proposalCost({ sender, signer, actions })
    console.log(`DAO ${label} caller proposal cost: total=${proposalCost.total}, fee=${proposalCost.fee}, mbr=${proposalCost.mbr}`)

    proposalIds.push(await proposeAndExecute(algorand, dao, actions))
  }

  await installCallerGrant('social-plugin', socialPlugin, [
    { name: socialPlugin.initMeta(), cooldown: 0n },
    { name: socialPlugin.post(), cooldown: 0n },
  ])

  if (selfOptInPlugin) {
    await installCallerGrant('self-opt-in-plugin', selfOptInPlugin, [
      { name: selfOptInPlugin.optIn(), cooldown: 0n },
    ])
  }

  return { installed: proposalIds.length > 0, proposalIds }
}
