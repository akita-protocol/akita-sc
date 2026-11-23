/**
 * LocalNet setup for akita-backend's `TestInferenceBillingSettlesOnLocalNet`. Skipped unless
 * `AKITA_BACKEND_INFERENCE_BILLING_SETUP` names the file to write:
 *
 *   # here
 *   AKITA_BACKEND_INFERENCE_BILLING_SETUP=/tmp/billing-setup.json \
 *     npx vitest run smart_contracts/arc58/plugins/pay/backend-inference-billing-setup.e2e.spec.ts
 *   # in akita-backend
 *   AKITA_INFERENCE_BILLING_LOCALNET_SETUP=/tmp/billing-setup.json \
 *     go test ./server -run '^TestInferenceBillingSettlesOnLocalNet$' -count=1
 *
 * It deploys Meta, a MetaPlugin named as Meta's policy writer and a PayPlugin that reads its policies
 * from that Meta. It then creates a wallet and installs what a member's app installs for pay-as-you-go
 * inference: a PayPlugin grant on the `inference` escrow whose caller is the billing key, a flat ALGO
 * allowance, and the grant's policy, which lists one receiver and ALGO. The escrow also gets a small
 * balance of its own, so the backend can collect one charge without moving anything from the wallet.
 *
 * The file holds the app ids, PayPlugin's approval hash, the receiver, the wallet's controlled address
 * and the billing key. That key is a fresh LocalNet account made here; its mnemonic is in the file
 * because the backend signs collections with it, so the file is written readable by its owner only.
 */
import { Config, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import algosdk from 'algosdk'
import { createHash } from 'node:crypto'
import { writeFileSync } from 'node:fs'
import { describe, expect, test } from 'vitest'
import { CallerType, decodePayPolicy, encodePayPolicy, newWallet } from 'akita-sdk/wallet'
import { MetaFactory, MetaSDK, SchemaPart } from '../../../../../akita-sdk/src/meta'
import { newMetaPlugin } from '../../../../../akita-sdk/src/wallet/plugins/meta'
import { deployAbstractedAccountFactory } from '../../../../tests/fixtures/abstracted-account'
import { deployAkitaDAO } from '../../../../tests/fixtures/dao'
import { deployEscrowFactory } from '../../../../tests/fixtures/escrow'
import { deployPayPlugin } from '../../../../tests/fixtures/plugins/pay'
import { AbstractedAccountMbrFactory } from '../../../artifacts/arc58/account/AbstractedAccountMBRClient'
import { AbstractAccountGlobalStateKeysControlledAddress } from '../../account/constants'

const OUTPUT = process.env.AKITA_BACKEND_INFERENCE_BILLING_SETUP
const ESCROW = 'inference'
const ALLOWANCE = 10_000_000n
const ESCROW_BALANCE = 500_000n

describe.skipIf(!OUTPUT)('setup for the backend inference billing test (LocalNet)', () => {
  const fixture = algorandFixture()

  test('installs the billing grant, its allowance and its policy, and writes the setup file', async () => {
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
      const pay = await deployPayPlugin({ fixture, sender: owner, signer, registry: meta.appId })

      const wallet = await newWallet({
        algorand, readerAccount: owner,
        factoryParams: { appId: factory.appId, defaultSender: owner, defaultSigner: signer }, nickname: 'Inference billing',
      })
      await wallet.client.appClient.fundAppAccount({ amount: microAlgo(20_000_000) })
      await wallet.addPlugin({ client: writer, callerType: CallerType.Admin })

      const billing = algorand.account.random()
      await algorand.account.ensureFunded(billing.addr, owner, microAlgo(5_000_000))
      const recipient = algorand.account.random()
      await algorand.account.ensureFunded(recipient.addr, owner, microAlgo(1_000_000))

      await wallet.addPlugin({
        client: pay, callerType: CallerType.Other, caller: billing.addr.toString(), escrow: ESCROW,
        allowances: [{ asset: 0n, type: 'flat', amount: ALLOWANCE }],
      })
      const body = encodePayPolicy({ recipients: [recipient.addr.toString()], assets: [0n] })
      await wallet.usePlugin({
        callerType: CallerType.Admin,
        calls: [writer.configurePolicy({ plugin: pay.appId, caller: billing.addr.toString(), escrow: ESCROW, body, expectedRevision: 0n })],
      })
      const stored = await writer.getPolicy({ wallet: wallet.appId, plugin: pay.appId, caller: billing.addr.toString(), escrow: ESCROW })
      expect(decodePayPolicy(stored.body)).toEqual({ recipients: [recipient.addr.toString()], assets: [0n] })

      const { id: escrowAppId } = await wallet.getEscrow(ESCROW)
      await algorand.send.payment({ sender: owner, signer, receiver: algosdk.getApplicationAddress(escrowAppId), amount: microAlgo(ESCROW_BALANCE) })

      const payApp = await algorand.app.getById(pay.appId)
      const walletApp = await algorand.app.getById(wallet.appId)
      const controlled = walletApp.globalState[AbstractAccountGlobalStateKeysControlledAddress]
      expect(controlled && 'valueRaw' in controlled).toBe(true)
      const walletAddress = algosdk.encodeAddress((controlled as { valueRaw: Uint8Array }).valueRaw)

      writeFileSync(OUTPUT!, JSON.stringify({
        walletAppId: wallet.appId.toString(),
        payPluginAppId: pay.appId.toString(),
        metaAppId: meta.appId.toString(),
        metaPluginAppId: writer.appId.toString(),
        payPluginApprovalSha256: createHash('sha256').update(payApp.approvalProgram).digest('hex'),
        billingMnemonic: algosdk.secretKeyToMnemonic(billing.account.sk),
        billingAddress: billing.addr.toString(),
        recipient: recipient.addr.toString(),
        walletAddress,
      }, null, 2), { mode: 0o600 })
      console.log(`Setup written to ${OUTPUT}: wallet ${wallet.appId}, PayPlugin ${pay.appId}, Meta ${meta.appId}, MetaPlugin ${writer.appId}`)
    } finally {
      if (previousMbrApp === undefined) delete process.env.WALLET_MBR_APP_ID
      else process.env.WALLET_MBR_APP_ID = previousMbrApp
    }
  }, 300_000)
})
