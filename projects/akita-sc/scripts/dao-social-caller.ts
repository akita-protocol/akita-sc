import { AlgorandClient, microAlgo } from '@algorandfoundation/algokit-utils'
import type { TransactionSigner } from '@algorandfoundation/algokit-utils/transact'
import { AkitaDaoSDK, ProposalActionEnum } from 'akita-sdk/dao'
import { CallerType, NFDPluginSDK, SelfOptInPluginSDK, SocialPluginSDK } from 'akita-sdk/wallet'
import { getAppFundingNeeded, proposeAndExecute } from './utils'
import algosdk from 'algosdk'

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

function getMethodSelectors(method: any): Uint8Array[] {
  if (typeof method === 'function') {
    return method().selectors ?? []
  }
  return method
}

function getAbiSelector(methodSignature: string): Uint8Array {
  return algosdk.ABIMethod.fromSignature(methodSignature).getSelector()
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
    methods: Array<{ name: any; cooldown: bigint }>,
  ): Promise<void> {
    const methodSelectors = methods.flatMap((method) => getMethodSelectors(method.name))

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

    if (dryRun) {
      console.log(`DRY RUN - would install ${label} caller ${caller}`)
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

  if (nfdPlugin) {
    await installCallerGrant('nfd-plugin', nfdPlugin, [
      { name: [getAbiSelector('mint(uint64,bool,string,uint64,address,bool)uint64')], cooldown: 0n },
      { name: [getAbiSelector('deleteFields(uint64,bool,uint64,byte[][])void')], cooldown: 0n },
      { name: [getAbiSelector('updateFields(uint64,bool,uint64,byte[][],uint64)void')], cooldown: 0n },
      { name: [getAbiSelector('linkNfdAddress(uint64,bool,uint64,string,uint64,uint64)void')], cooldown: 0n },
      { name: [getAbiSelector('setAddressPrimaryNfd(uint64,bool,uint64,string,address)void')], cooldown: 0n },
      { name: [getAbiSelector('offerForSale(uint64,bool,uint64,uint64,address)void')], cooldown: 0n },
      { name: [getAbiSelector('cancelSale(uint64,bool,uint64)void')], cooldown: 0n },
      { name: [getAbiSelector('postOffer(uint64,bool,uint64,uint64,string)void')], cooldown: 0n },
      { name: [getAbiSelector('purchase(uint64,bool,uint64)void')], cooldown: 0n },
      { name: [getAbiSelector('updateHash(uint64,bool,uint64,byte[])void')], cooldown: 0n },
      { name: [getAbiSelector('contractLock(uint64,bool,uint64,bool)void')], cooldown: 0n },
      { name: [getAbiSelector('segmentLock(uint64,bool,uint64,bool,uint64)void')], cooldown: 0n },
      { name: [getAbiSelector('vaultOptInLock(uint64,bool,uint64,bool)void')], cooldown: 0n },
      { name: [getAbiSelector('vaultOptIn(uint64,bool,uint64,uint64[])void')], cooldown: 0n },
      { name: [getAbiSelector('vaultSend(uint64,bool,uint64,uint64,address,string,uint64,uint64[])void')], cooldown: 0n },
      { name: [getAbiSelector('renew(uint64,bool,uint64,uint64)void')], cooldown: 0n },
      { name: [getAbiSelector('setPrimaryAddress(uint64,bool,uint64,string,address)void')], cooldown: 0n },
    ])
  }

  if (selfOptInPlugin) {
    await installCallerGrant('self-opt-in-plugin', selfOptInPlugin, [
      { name: selfOptInPlugin.optIn(), cooldown: 0n },
    ])
  }

  return { installed: proposalIds.length > 0, proposalIds }
}
