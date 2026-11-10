/**
 * AUD-C1 / AUD-C2 regression: a plugin acts only for a wallet whose spending account is rekeyed to
 * it right now.
 *
 * The attacker deploys an app that is not a wallet but stores the plugin's own app address under
 * `spending_address`, then calls the plugin directly with that app as `wallet`. The plugin never
 * needs a rekey to spend from its own account, so before the fix these calls ran with the plugin's
 * balance and, with `rekeyBack`, left the plugin's account rekeyed to the attacker's app. Every call
 * must now stop at `getControlledSpendingAccount` (errNath) with the plugin's account untouched.
 */
import * as algokit from '@algorandfoundation/algokit-utils'
import { microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import type { Arc56Contract } from '@algorandfoundation/algokit-utils/types/app-arc56'
import algosdk from 'algosdk'
import { beforeAll, describe, expect, test } from 'vitest'
import { expectContractError } from '../../../tests/utils/errors'
import { APP_SPEC as AsaManagerSpec } from '../../artifacts/arc58/plugins/asa-manager/AsaManagerPluginClient'
import { APP_SPEC as DaoSpec } from '../../artifacts/arc58/plugins/dao/AkitaDAOPluginClient'
import { APP_SPEC as DualStakeSpec } from '../../artifacts/arc58/plugins/dual-stake/DualStakePluginClient'
import { APP_SPEC as GuildSpec } from '../../artifacts/arc58/plugins/guild/GuildPluginClient'
import { APP_SPEC as HaystackRouterSpec } from '../../artifacts/arc58/plugins/haystack-router/HaystackRouterPluginClient'
import { APP_SPEC as MarketplaceSpec } from '../../artifacts/arc58/plugins/marketplace/MarketplacePluginClient'
import { APP_SPEC as OptInSpec } from '../../artifacts/arc58/plugins/optin/OptInPluginClient'
import { APP_SPEC as PaySiloFactorySpec } from '../../artifacts/arc58/plugins/pay-silo/PaySiloFactoryPluginClient'
import { APP_SPEC as PaySiloSpec } from '../../artifacts/arc58/plugins/pay-silo/PaySiloPluginClient'
import { APP_SPEC as PaySpec } from '../../artifacts/arc58/plugins/pay/PayPluginClient'
import { APP_SPEC as RewardsSpec } from '../../artifacts/arc58/plugins/rewards/RewardsPluginClient'
import { APP_SPEC as SelfOptInSpec } from '../../artifacts/arc58/plugins/self-optin/SelfOptInPluginClient'
import { APP_SPEC as StakingPoolSpec } from '../../artifacts/arc58/plugins/staking-pool/StakingPoolPluginClient'
import { APP_SPEC as StakingSpec } from '../../artifacts/arc58/plugins/staking/StakingPluginClient'
import { APP_SPEC as SubscriptionsSpec } from '../../artifacts/arc58/plugins/subscriptions/SubscriptionsPluginClient'
import { APP_SPEC as SunsetSpec } from '../../artifacts/arc58/plugins/sunset/SunsetPluginClient'
import { MockFakeWalletFactory } from '../../artifacts/mocks/fake-wallet/MockFakeWalletClient'
import { errPluginNotAuthAddr } from '../../utils/errors'

algokit.Config.configure({ populateAppCallResources: true })

const fixture = algorandFixture()
const ZERO = algosdk.ALGORAND_ZERO_ADDRESS_STRING
const PLUGIN_FLOAT = 500_000n

type Arg = string | number | bigint | boolean | Uint8Array | Promise<algosdk.Transaction> | Arg[]
type Context = { attacker: string; anyApp: bigint; payment: () => Promise<algosdk.Transaction> }
type Case = {
  name: string
  spec: Arc56Contract
  /** ABI create call; a bare create when absent. */
  create?: { method: string; args: (ctx: Pick<Context, 'attacker' | 'anyApp'>) => Arg[] }
  /** Calls made with the spoofed wallet; the arguments after `wallet, rekeyBack`. */
  calls: { method: string; args: (ctx: Context) => Arg[] }[]
}

const proposalSettings = [0n, 0n, 0n, 0n, 0n, 0n]

const cases: Case[] = [
  {
    name: 'AsaManagerPlugin',
    spec: AsaManagerSpec,
    calls: [
      { method: 'mint', args: ({ payment }) => [[], payment()] },
      { method: 'delete', args: () => [[]] },
    ],
  },
  {
    name: 'AkitaDAOPlugin',
    spec: DaoSpec,
    create: { method: 'create', args: ({ anyApp }) => [anyApp] },
    calls: [
      { method: 'setup', args: () => ['spoof', new Uint8Array(32)] },
      { method: 'submitProposal', args: () => [0n] },
      { method: 'finalizeProposal', args: () => [0n] },
      { method: 'executeProposal', args: () => [0n] },
      { method: 'deleteProposal', args: () => [0n] },
      { method: 'cancelProposal', args: () => [0n] },
    ],
  },
  {
    name: 'DualStakePlugin',
    spec: DualStakeSpec,
    create: { method: 'create', args: ({ anyApp }) => [anyApp] },
    calls: [
      { method: 'mint', args: ({ anyApp }) => [anyApp, 1n] },
      { method: 'redeem', args: ({ anyApp }) => [anyApp, 1n] },
    ],
  },
  {
    name: 'GuildPlugin',
    spec: GuildSpec,
    create: { method: 'create', args: ({ anyApp }) => [anyApp, 0n] },
    calls: [
      { method: 'newGuild', args: () => ['spoof', [0n, Array.from({ length: 9 }, () => proposalSettings)], new Uint8Array(0), 0n] },
    ],
  },
  {
    name: 'HaystackRouterPlugin',
    spec: HaystackRouterSpec,
    create: { method: 'create', args: ({ anyApp, attacker }) => [anyApp, new Uint8Array(4), attacker, anyApp] },
    calls: [{ method: 'swap', args: () => [0n, 1n, 0n, 1n] }],
  },
  {
    name: 'MarketplacePlugin',
    spec: MarketplaceSpec,
    create: { method: 'createApplication', args: ({ anyApp }) => ['0.0.1', anyApp, anyApp] },
    calls: [
      { method: 'changePrice', args: ({ anyApp }) => [anyApp, 1n] },
      { method: 'delist', args: ({ anyApp }) => [anyApp] },
    ],
  },
  {
    name: 'OptInPlugin',
    spec: OptInSpec,
    calls: [{ method: 'optIn', args: ({ payment }) => [[], payment()] }],
  },
  {
    name: 'PaySiloPlugin',
    spec: PaySiloSpec,
    create: { method: 'create', args: ({ attacker }) => [attacker] },
    calls: [{ method: 'pay', args: () => [[[0n, 100_000n]]] }],
  },
  {
    name: 'PaySiloFactoryPlugin',
    spec: PaySiloFactorySpec,
    calls: [{ method: 'mint', args: ({ attacker }) => [attacker] }],
  },
  {
    name: 'PayPlugin',
    spec: PaySpec,
    calls: [{ method: 'pay', args: ({ attacker }) => [[[attacker, 0n, 100_000n]]] }],
  },
  {
    name: 'RewardsPlugin',
    spec: RewardsSpec,
    create: { method: 'create', args: ({ anyApp }) => ['0.0.1', anyApp, 0n, anyApp] },
    calls: [
      { method: 'claimInboxAlgo', args: () => [] },
      { method: 'claimInbox', args: () => [1n] },
      { method: 'rejectInbox', args: () => [1n] },
    ],
  },
  {
    name: 'SelfOptInPlugin',
    spec: SelfOptInSpec,
    calls: [
      { method: 'optIn', args: () => [[]] },
      { method: 'optOut', args: () => [[]] },
    ],
  },
  {
    name: 'StakingPoolPlugin',
    spec: StakingPoolSpec,
    create: { method: 'create', args: ({ anyApp }) => ['0.0.1', anyApp, anyApp] },
    calls: [{ method: 'newPool', args: ({ attacker }) => ['spoof', 0, attacker, [ZERO, ''], 0n, true, 0n, 0n] }],
  },
  {
    name: 'StakingPlugin',
    spec: StakingSpec,
    create: { method: 'create', args: ({ anyApp }) => [anyApp, '0.0.1'] },
    calls: [
      { method: 'setHeartbeatManager', args: ({ attacker }) => [attacker] },
      { method: 'closeSoftStake', args: () => [0n] },
      { method: 'closeHeartbeat', args: () => [0n] },
      { method: 'releaseAppStake', args: ({ anyApp }) => [anyApp, 0n] },
    ],
  },
  {
    name: 'SubscriptionsPlugin',
    spec: SubscriptionsSpec,
    create: { method: 'create', args: ({ anyApp }) => [anyApp, '0.0.1'] },
    calls: [
      { method: 'pauseService', args: () => [1n] },
      { method: 'shutdownService', args: () => [1n] },
    ],
  },
  {
    name: 'SunsetPlugin',
    spec: SunsetSpec,
    calls: [
      { method: 'delete', args: ({ anyApp, attacker }) => [anyApp, attacker] },
      { method: 'closeOut', args: ({ anyApp }) => [anyApp, []] },
    ],
  },
]

describe('Plugins reject a spoofed wallet that points at their own account (AUD-C1 / AUD-C2)', () => {
  let algorand: algokit.AlgorandClient
  let attacker: TransactionSignerAccount
  let anyApp: bigint

  beforeAll(async () => {
    await fixture.newScope()
    algorand = fixture.context.algorand
    attacker = await fixture.context.generateAccount({ initialFunds: (200).algo() })

    // Any existing app id: the create calls only store it, and no call below gets far enough to use it.
    const placeholder = algorand.client.getTypedAppFactory(MockFakeWalletFactory, { defaultSender: attacker.addr, defaultSigner: attacker.signer })
    anyApp = (await placeholder.send.create.create({ args: { controlledAddress: ZERO, referrer: ZERO, spendingAddress: ZERO } })).appClient.appId
  })

  test.each(cases)('$name', async ({ spec, create, calls }) => {
    const sender = attacker.addr.toString()
    const factory = algorand.client.getAppFactory({ appSpec: spec, defaultSender: attacker.addr, defaultSigner: attacker.signer })
    const { appClient: plugin } = create
      ? await factory.send.create({ method: create.method, args: create.args({ attacker: sender, anyApp }) })
      : await factory.send.bare.create()
    const pluginAddress = plugin.appAddress.toString()

    // The balance an attacker could reach: fees, MBR floats or anything sent to the plugin by mistake.
    await algorand.send.payment({ sender: attacker.addr, signer: attacker.signer, receiver: pluginAddress, amount: microAlgo(PLUGIN_FLOAT) })

    const fakeFactory = algorand.client.getTypedAppFactory(MockFakeWalletFactory, { defaultSender: attacker.addr, defaultSigner: attacker.signer })
    const { appClient: fake } = await fakeFactory.send.create.create({
      args: { controlledAddress: ZERO, referrer: ZERO, spendingAddress: pluginAddress },
    })

    const ctx: Context = {
      attacker: sender,
      anyApp,
      payment: () => algorand.createTransaction.payment({ sender: attacker.addr, receiver: pluginAddress, amount: microAlgo(0) }),
    }

    for (const call of calls) {
      const args = await Promise.all(call.args(ctx))
      await expectContractError(
        plugin.send.call({
          method: call.method,
          args: [fake.appId, true, ...args] as never,
          extraFee: microAlgo(10_000),
        }),
        errPluginNotAuthAddr,
      )
    }

    const after = await algorand.account.getInformation(pluginAddress)
    expect(after.authAddr, 'the plugin account must never be rekeyed').toBeUndefined()
    expect(after.balance.microAlgo).toBe(PLUGIN_FLOAT)
  })
})
