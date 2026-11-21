import { algo, AlgorandClient } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { AlgorandFixture } from '@algorandfoundation/algokit-utils/types/testing'
import { setCurrentNetwork } from 'akita-sdk'
import { AkitaDaoSDK } from 'akita-sdk/dao'
import { newWallet, PayPluginSDK, SelfOptInPluginSDK, WalletFactorySDK, WalletSDK } from 'akita-sdk/wallet'
import {
  Arc58AgentProbePluginClient,
  Arc58AgentProbePluginFactory,
} from '../../smart_contracts/artifacts/arc58/account/Arc58AgentProbePluginClient'
import {
  Arc58AgentRevokerClient,
  Arc58AgentRevokerFactory,
} from '../../smart_contracts/artifacts/arc58/account/Arc58AgentRevokerClient'
import {
  AbstractedAccountMbrClient,
  AbstractedAccountMbrFactory,
} from '../../smart_contracts/artifacts/arc58/account/AbstractedAccountMBRClient'
import { EscrowFactoryClient } from '../../smart_contracts/artifacts/escrow/EscrowFactoryClient'
import { deployAbstractedAccountFactory } from './abstracted-account'
import { deployAkitaDAO } from './dao'
import { deployEscrowFactory } from './escrow'
import { deployTestPayPlugin as deployPayPlugin } from './plugins/pay'
import { deploySelfOptInPlugin } from './plugins/self-optin'

const ROLE_INITIAL_FUNDS = algo(25)
const WALLET_INITIAL_FUNDS = algo(100)
const DEPLOYER_INITIAL_FUNDS = algo(500)

let walletSequence = 0

export type Arc58AgentTestAccount = ReturnType<AlgorandClient['account']['random']>

export type Arc58AgentDelegationDeployment = {
  fixture: AlgorandFixture
  algorand: AlgorandClient
  deployer: Arc58AgentTestAccount
  walletMbrClient: AbstractedAccountMbrClient
  walletMbrAppId: bigint
  escrowFactory: EscrowFactoryClient
  dao: AkitaDaoSDK
  revoker: Arc58AgentRevokerClient
  probePlugin: Arc58AgentProbePluginClient
  otherProbePlugin: Arc58AgentProbePluginClient
  walletFactory: WalletFactorySDK
  payPlugin: PayPluginSDK
  selfOptInPlugin: SelfOptInPluginSDK
  assetId: bigint
  restoreEnvironment: () => void
}

export type Arc58AgentWalletScenario = {
  wallet: WalletSDK
  owner: Arc58AgentTestAccount
  agent: Arc58AgentTestAccount
  outsider: Arc58AgentTestAccount
  receiver: Arc58AgentTestAccount
}

/**
 * Deploy the smallest shared LocalNet universe needed by the ARC-58 agent
 * delegation conformance suite. Tests should deploy this once, create a fresh
 * wallet for each scenario, and call `restoreEnvironment` from `afterAll`.
 */
export async function deployArc58AgentDelegationFixture(
  fixture: AlgorandFixture = algorandFixture(),
): Promise<Arc58AgentDelegationDeployment> {
  await fixture.newScope()

  const {
    algorand,
    context: { testAccount },
  } = fixture
  const deployer = testAccount as unknown as Arc58AgentTestAccount // AlgoKit Utils 9 testAccount type
  const sender = deployer.addr.toString()
  const signer = deployer.signer
  const dispenser = await algorand.account.dispenserFromEnvironment()

  await algorand.account.ensureFunded(sender, dispenser.addr.toString(), DEPLOYER_INITIAL_FUNDS)
  setCurrentNetwork('localnet')

  const previousWalletMbrAppId = process.env.WALLET_MBR_APP_ID
  let environmentRestored = false
  const restoreEnvironment = () => {
    if (environmentRestored) return

    if (previousWalletMbrAppId === undefined) {
      delete process.env.WALLET_MBR_APP_ID
    } else {
      process.env.WALLET_MBR_APP_ID = previousWalletMbrAppId
    }
    environmentRestored = true
  }

  try {
    const walletMbrFactory = algorand.client.getTypedAppFactory(AbstractedAccountMbrFactory, {
      defaultSender: sender,
      defaultSigner: signer,
    })
    const { appClient: walletMbrClient } = await walletMbrFactory.send.create.bare()
    process.env.WALLET_MBR_APP_ID = walletMbrClient.appId.toString()

    const escrowFactory = await deployEscrowFactory({ fixture, sender, signer })

    const dao = await deployAkitaDAO({
      fixture,
      sender,
      signer,
      apps: { escrow: escrowFactory.appId },
    })

    const revokerFactory = algorand.client.getTypedAppFactory(Arc58AgentRevokerFactory, {
      defaultSender: sender,
      defaultSigner: signer,
    })
    const { appClient: revoker } = await revokerFactory.deploy({
      onUpdate: 'append',
      onSchemaBreak: 'append',
      suppressLog: true,
    })

    const probePluginFactory = algorand.client.getTypedAppFactory(Arc58AgentProbePluginFactory, {
      defaultSender: sender,
      defaultSigner: signer,
    })
    const { appClient: probePlugin } = await probePluginFactory.deploy({
      onUpdate: 'append',
      onSchemaBreak: 'append',
      suppressLog: true,
    })
    const { appClient: otherProbePlugin } = await probePluginFactory.send.create.bare()

    const walletFactory = await deployAbstractedAccountFactory({
      fixture,
      sender,
      signer,
      args: {
        akitaDao: dao.appId,
        escrowFactory: escrowFactory.appId,
        revocation: revoker.appId,
        version: '0.0.1',
      },
    })

    await algorand.account.ensureFunded(walletFactory.client.appAddress.toString(), dispenser.addr.toString(), algo(10))

    const payPlugin = await deployPayPlugin({ fixture, sender, signer })
    const selfOptInPlugin = await deploySelfOptInPlugin({ fixture, sender, signer })

    const { assetId } = await algorand.send.assetCreate({
      sender,
      signer,
      total: 1_000_000_000_000n,
      decimals: 6,
      defaultFrozen: false,
      unitName: 'ADP',
      assetName: 'ARC58 Agent Delegation Test',
      manager: sender,
      reserve: sender,
    })

    return {
      fixture,
      algorand,
      deployer,
      walletMbrClient,
      walletMbrAppId: walletMbrClient.appId,
      escrowFactory,
      dao,
      revoker,
      probePlugin,
      otherProbePlugin,
      walletFactory,
      payPlugin,
      selfOptInPlugin,
      assetId,
      restoreEnvironment,
    }
  } catch (error) {
    restoreEnvironment()
    throw error
  }
}

/**
 * Create isolated funded roles and a newly deployed owner-controlled wallet.
 * The receiver is opted into the fixture ASA so payment cases can focus on
 * delegation behavior rather than receiver setup.
 */
export async function createFreshAgentWallet(
  deployment: Arc58AgentDelegationDeployment,
): Promise<Arc58AgentWalletScenario> {
  const { algorand, walletFactory, assetId } = deployment
  const dispenser = await algorand.account.dispenserFromEnvironment()

  const owner = algorand.account.random() as Arc58AgentTestAccount
  const agent = algorand.account.random() as Arc58AgentTestAccount
  const outsider = algorand.account.random() as Arc58AgentTestAccount
  const receiver = algorand.account.random() as Arc58AgentTestAccount

  for (const account of [owner, agent, outsider, receiver]) {
    await algorand.account.ensureFunded(account.addr.toString(), dispenser.addr.toString(), ROLE_INITIAL_FUNDS)
  }

  const wallet = await newWallet({
    algorand,
    readerAccount: owner.addr.toString(),
    factoryParams: {
      appId: walletFactory.appId,
      defaultSender: owner.addr,
      defaultSigner: owner.signer,
    },
    nickname: `arc58-agent-${++walletSequence}`,
  })

  await algorand.account.ensureFunded(
    wallet.client.appAddress.toString(),
    dispenser.addr.toString(),
    WALLET_INITIAL_FUNDS,
  )

  await algorand.send.assetOptIn({
    sender: receiver.addr,
    signer: receiver.signer,
    assetId,
  })

  return { wallet, owner, agent, outsider, receiver }
}
