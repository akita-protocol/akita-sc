/**
 * LocalNet setup for akita-backend's `TestInferenceBillingTicketsOnLocalNet`. Skipped unless
 * `AKITA_BACKEND_INFERENCE_BILLING_SETUP` names the file to write:
 *
 *   # here
 *   AKITA_BACKEND_INFERENCE_BILLING_SETUP=/tmp/billing-setup.json \
 *     npx vitest run smart_contracts/arc58/plugins/inference/backend-inference-billing-setup.e2e.spec.ts
 *   # in akita-backend
 *   AKITA_INFERENCE_BILLING_LOCALNET_SETUP=/tmp/billing-setup.json \
 *     go test ./server -run '^TestInferenceBillingTicketsOnLocalNet$' -count=1
 *
 * It deploys an InferenceNetwork (on a mock DAO with a 5% fee, resolving wallets against a real
 * wallet factory) with Akita as an ALGO provider whose claim key and payout are fresh accounts, plus
 * Meta, a MetaPlugin named as Meta's policy writer and an InferencePlugin that reads its policies
 * from that Meta. It then creates a wallet and installs what a member's app installs for
 * pay-as-you-go inference: an InferencePlugin grant on the `inference` escrow whose caller is the
 * billing key, a flat ALGO allowance, and the grant's policy (that network, that provider, ALGO, and
 * the backend's per-run maximum of 312,000).
 *
 * The file holds the app ids, InferencePlugin's approval hash, the provider, its payout, the
 * wallet's controlled address and two keys: the billing key, which opens tickets, and the claim key,
 * which settles them. Both are fresh LocalNet accounts made here; their mnemonics are in the file
 * because the backend signs with them, so the file is written readable by its owner only.
 */
import { Config, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import algosdk from 'algosdk'
import { createHash } from 'node:crypto'
import { writeFileSync } from 'node:fs'
import { describe, expect, test } from 'vitest'
import { CallerType, newWallet } from 'akita-sdk/wallet'
import { MetaFactory, MetaSDK, SchemaPart } from '../../../../../akita-sdk/src/meta'
import { newMetaPlugin } from '../../../../../akita-sdk/src/wallet/plugins/meta'
import { decodeInferencePolicy, encodeInferencePolicy, InferencePluginSDK } from '../../../../../akita-sdk/src/wallet/plugins/inference'
import { deployAbstractedAccountFactory } from '../../../../tests/fixtures/abstracted-account'
import { deployAkitaDAO } from '../../../../tests/fixtures/dao'
import { deployEscrowFactory } from '../../../../tests/fixtures/escrow'
import { AbstractedAccountMbrFactory } from '../../../artifacts/arc58/account/AbstractedAccountMBRClient'
import { InferencePluginFactory } from '../../../artifacts/arc58/plugins/inference/InferencePluginClient'
import { InferenceNetworkFactory } from '../../../artifacts/inference/InferenceNetworkClient'
import { MockInferenceDaoFactory } from '../../../artifacts/inference/tests/MockInferenceDAOClient'
import { MockInferenceSubscriptionsFactory } from '../../../artifacts/inference/tests/MockInferenceSubscriptionsClient'
import { AbstractAccountGlobalStateKeysControlledAddress } from '../../account/constants'

const OUTPUT = process.env.AKITA_BACKEND_INFERENCE_BILLING_SETUP
const ESCROW = 'inference'
const ALLOWANCE = 10_000_000n
// The backend's per-run maximum: 64k input at $3/M plus 8k output at $15/M, in base units.
const MAX_RUN = 312_000n
const PROVIDER_MBR = 2_500n + 400n * (9n + 32n * 3n + 8n * 4n)
const ASSET_MBR = 2_500n + 400n * (9n + 8n + 8n)

describe.skipIf(!OUTPUT)('setup for the backend inference billing test (LocalNet)', () => {
  const fixture = algorandFixture()

  test('deploys the network and installs the billing grant, its allowance and its policy', async () => {
    Config.configure({ populateAppCallResources: true })
    await fixture.newScope()
    const { algorand, testAccount } = fixture.context
    const owner = testAccount.toString()
    const signer = testAccount.signer
    const dispenser = await algorand.account.dispenserFromEnvironment()
    await algorand.account.ensureFunded(owner, dispenser.addr, microAlgo(1_000_000_000))

    const previousMbrApp = process.env.WALLET_MBR_APP_ID
    try {
      const { appClient: mbr } = await algorand.client
        .getTypedAppFactory(AbstractedAccountMbrFactory, { defaultSender: owner, defaultSigner: signer })
        .send.create.bare()
      process.env.WALLET_MBR_APP_ID = mbr.appId.toString()
      const dao = await deployAkitaDAO({ fixture, sender: owner, signer, apps: {} })
      const escrowFactory = await deployEscrowFactory({ fixture, sender: owner, signer })
      const factory = await deployAbstractedAccountFactory({
        fixture, sender: owner, signer, args: { akitaDao: dao.appId, escrowFactory: escrowFactory.appId },
      })
      const { appClient } = await algorand.client
        .getTypedAppFactory(MetaFactory, { defaultSender: owner, defaultSigner: signer })
        .deploy({ onUpdate: 'append', onSchemaBreak: 'append', createParams: { method: 'create', args: ['inference-billing-setup', dao.appId] } })
      await appClient.appClient.fundAppAccount({ amount: microAlgo(100_000) })
      const meta = new MetaSDK({ algorand, readerAccount: owner, factoryParams: { appId: appClient.appId, defaultSender: owner, defaultSigner: signer } })
      await meta.addType({ description: 'Inference billing setup', schemaList: [SchemaPart.Uint64] })
      const writer = await newMetaPlugin({ algorand, sender: owner, signer, registry: meta.appId })
      await meta.client.send.setPolicyWriter({ args: { writer: writer.appId } })
      const { appClient: pluginClient } = await algorand.client
        .getTypedAppFactory(InferencePluginFactory, { defaultSender: owner, defaultSigner: signer })
        .send.create.create({ args: { registry: meta.appId } })

      // The network: a 5% DAO fee, no bond, wallets from the real factory.
      const { appClient: inferenceDao } = await algorand.client
        .getTypedAppFactory(MockInferenceDaoFactory, { defaultSender: owner, defaultSigner: signer })
        .send.create.create({ args: { akta: 0n } })
      await inferenceDao.send.setInferenceFees({ args: { chargePercentage: 500n, providerBond: 0n } })
      const { appClient: subscriptions } = await algorand.client
        .getTypedAppFactory(MockInferenceSubscriptionsFactory, { defaultSender: owner, defaultSigner: signer })
        .send.create.bare()
      await inferenceDao.send.setApps({ args: { subscriptions: subscriptions.appId, wallet: factory.appId } })
      const { appClient: network } = await algorand.client
        .getTypedAppFactory(InferenceNetworkFactory, { defaultSender: owner, defaultSigner: signer })
        .send.create.create({ args: { version: 'test', akitaDao: inferenceDao.appId, admin: owner, treasury: owner } })
      await network.appClient.fundAppAccount({ amount: microAlgo(100_000) })
      await network.send.setSettings({ args: { settings: { unbondDelay: 30n * 86_400n, settleWindow: 3_600n, openRegistration: true } } })
      const pay = (amount: bigint) => algorand.createTransaction.payment({ sender: owner, receiver: network.appAddress, amount: microAlgo(amount) })
      await network.send.setPaymentAsset({ args: { payment: pay(ASSET_MBR), asset: 0n, allowed: true } })

      const claimer = algorand.account.random()
      await algorand.account.ensureFunded(claimer.addr, owner, microAlgo(5_000_000))
      const payout = algorand.account.random()
      await algorand.account.ensureFunded(payout.addr, owner, microAlgo(1_000_000))
      const uri = 'ipfs://akita'
      const provider = (await network.send.registerProvider({
        args: {
          payment: pay(PROVIDER_MBR + 2_500n + 400n * (9n + BigInt(uri.length))), bond: pay(0n),
          claimer: claimer.addr.toString(), payout: payout.addr.toString(), metadata: uri,
        },
      })).return!

      const wallet = await newWallet({
        algorand, readerAccount: owner,
        factoryParams: { appId: factory.appId, defaultSender: owner, defaultSigner: signer }, nickname: 'Inference billing',
      })
      await wallet.client.appClient.fundAppAccount({ amount: microAlgo(20_000_000) })
      const billing = algorand.account.random()
      await algorand.account.ensureFunded(billing.addr, owner, microAlgo(5_000_000))
      const plugin = new InferencePluginSDK({ algorand, factoryParams: { appId: pluginClient.appId, defaultSender: owner, defaultSigner: signer } })
      const policy = { network: network.appId, providers: [provider], assets: [0n], maxPrice: MAX_RUN }
      // One group, as the member's app sends it: the MetaPlugin grant that writes policies, the
      // InferencePlugin grant (open only, no execution key), its allowance, and its policy.
      await wallet.getEscrows()
      await wallet.group()
        .addPlugin({ client: writer, callerType: CallerType.Admin })
        .addPlugin({
          client: plugin, callerType: CallerType.Other, caller: billing.addr.toString(), escrow: ESCROW,
          methods: [{ name: [plugin.client.appClient.getABIMethod('open').getSelector()], cooldown: 0n }],
          allowances: [{ asset: 0n, type: 'flat', amount: ALLOWANCE }],
        })
        .usePlugin({
          callerType: CallerType.Admin,
          calls: [writer.configurePolicy({ plugin: plugin.appId, caller: billing.addr.toString(), escrow: ESCROW, body: encodeInferencePolicy(policy), expectedRevision: 0n })],
        })
        .send()
      const stored = await writer.getPolicy({ wallet: wallet.appId, plugin: plugin.appId, caller: billing.addr.toString(), escrow: ESCROW })
      expect(decodeInferencePolicy(stored.body)).toEqual(policy)

      const pluginApp = await algorand.app.getById(plugin.appId)
      const walletApp = await algorand.app.getById(wallet.appId)
      const controlled = walletApp.globalState[AbstractAccountGlobalStateKeysControlledAddress]
      expect(controlled && 'valueRaw' in controlled).toBe(true)
      const walletAddress = algosdk.encodeAddress((controlled as { valueRaw: Uint8Array }).valueRaw)

      writeFileSync(OUTPUT!, JSON.stringify({
        walletAppId: wallet.appId.toString(),
        walletAddress,
        inferencePluginAppId: plugin.appId.toString(),
        inferencePluginApprovalSha256: createHash('sha256').update(pluginApp.approvalProgram).digest('hex'),
        metaAppId: meta.appId.toString(),
        metaPluginAppId: writer.appId.toString(),
        networkAppId: network.appId.toString(),
        daoAppId: inferenceDao.appId.toString(),
        providerId: provider.toString(),
        payoutAddress: payout.addr.toString(),
        billingMnemonic: algosdk.secretKeyToMnemonic(billing.account.sk),
        claimerMnemonic: algosdk.secretKeyToMnemonic(claimer.account.sk),
      }, null, 2), { mode: 0o600 })
      console.log(`Setup written to ${OUTPUT}: wallet ${wallet.appId}, InferencePlugin ${plugin.appId}, network ${network.appId}, provider ${provider}`)
    } finally {
      if (previousMbrApp === undefined) delete process.env.WALLET_MBR_APP_ID
      else process.env.WALLET_MBR_APP_ID = previousMbrApp
    }
  }, 300_000)
})
