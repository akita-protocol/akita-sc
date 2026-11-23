import * as algokit from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import { beforeAll, describe, expect, test } from 'vitest'
import { sendPrepared } from 'akita-sdk'
import { ProposalActionEnum } from 'akita-sdk/dao'
import { CallerType, encodePayPolicy, decodePayPolicy, PayPluginSDK, WalletSDK } from 'akita-sdk/wallet'
import { MetaFactory } from '../../../../../akita-sdk/src/meta'
import { MetaPluginSDK, newMetaPlugin } from '../../../../../akita-sdk/src/wallet/plugins/meta'
import { AkitaUniverse, buildAkitaUniverse } from '../../../../tests/fixtures/dao'
import { deployPayPlugin } from '../../../../tests/fixtures/plugins/pay'
import { proposeAndExecute } from '../../../../scripts/utils'
import {
  DEFAULT_CREATION,
  DEFAULT_UPGRADE_APP_APPROVAL,
  DEFAULT_UPGRADE_APP_PARTICIPATION,
  DEFAULT_UPGRADE_APP_PROPOSAL_POWER,
  DEFAULT_UPGRADE_APP_VOTING_DURATION,
} from '../../../utils/defaults'
import { errPolicyMissing } from '../../../utils/errors'
import { errPayRecipient } from './errors'

algokit.Config.configure({ populateAppCallResources: true })

/**
 * The Labs payout (rollout step H6) on a DAO escrow. A proposal installs a global PayPlugin grant on
 * the escrow; a second registers the group that writes its policy (the group's simulation needs the
 * grant installed). In between, PayPlugin refuses the global grant because it has no policy. Anyone
 * may then call it, and it pays only the policy's receiver.
 */
describe('PayPlugin policy on a DAO escrow (LocalNet)', () => {
  const fixture = algorandFixture()
  const escrow = 'rec_labs'
  let deployer: TransactionSignerAccount
  let universe: AkitaUniverse
  let daoWallet: WalletSDK
  let writer: MetaPluginSDK
  let pay: PayPluginSDK

  beforeAll(async () => {
    await fixture.newScope()
    const { algorand } = fixture.context
    const dispenser = await algorand.account.dispenserFromEnvironment()
    deployer = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(2_000_000_000) })
    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (2000).algo())
    universe = await buildAkitaUniverse({ fixture, sender: deployer.addr, signer: deployer.signer, apps: {} })
    daoWallet = universe.dao.wallet

    const { appClient: meta } = await algorand.client.getTypedAppFactory(MetaFactory, { defaultSender: deployer.addr, defaultSigner: deployer.signer })
      .send.create.create({ args: { version: 'test', akitaDao: universe.dao.appId } })
    await meta.appClient.fundAppAccount({ amount: algokit.microAlgos(1_000_000) })
    writer = await newMetaPlugin({ algorand, sender: deployer.addr.toString(), signer: deployer.signer, registry: meta.appId })
    await meta.send.setPolicyWriter({ args: { writer: writer.appId } })
    pay = await deployPayPlugin({ fixture, sender: deployer.addr.toString(), signer: deployer.signer, registry: meta.appId })

    await algorand.account.ensureFunded(daoWallet.client.appAddress, dispenser.addr, (20).algo())
    await algorand.account.ensureFunded((await daoWallet.client.state.global.admin())!, dispenser.addr, (5).algo())
    await proposeAndExecute(algorand, universe.dao, [{ type: ProposalActionEnum.NewEscrow, escrow, address: ALGORAND_ZERO_ADDRESS_STRING }])
    await proposeAndExecute(algorand, universe.dao, [{
      type: ProposalActionEnum.AddPlugin, client: writer, callerType: CallerType.Global, escrow: '', sourceLink: '', useExecutionKey: true,
      fee: DEFAULT_CREATION, power: DEFAULT_UPGRADE_APP_PROPOSAL_POWER, duration: DEFAULT_UPGRADE_APP_VOTING_DURATION,
      participation: DEFAULT_UPGRADE_APP_PARTICIPATION, approval: DEFAULT_UPGRADE_APP_APPROVAL,
    }])
    const escrowAddress = (await daoWallet.getEscrow(escrow)).address
    await algorand.account.ensureFunded(escrowAddress, dispenser.addr, (5).algo())
  })

  test('a proposal installs the global grant, a second writes its policy; anyone pays, only to the listed receiver', async () => {
    const { algorand } = fixture.context
    const labs = algorand.account.random().addr.toString()
    const stranger = await fixture.context.generateAccount({ initialFunds: (2).algo() })
    await algorand.account.ensureFunded(labs, deployer.addr, (1).algo())

    await proposeAndExecute(algorand, universe.dao, [{ type: ProposalActionEnum.AddPlugin, client: pay, callerType: CallerType.Global,
      escrow, sourceLink: '', useExecutionKey: false, methods: [{ name: pay.pay(), cooldown: 0n }] }])

    const payFrom = (receiver: string) => daoWallet.usePlugin({
      sender: stranger.addr, signer: stranger.signer, callerType: CallerType.Global, escrow,
      calls: [pay.pay({ sender: stranger.addr, signer: stranger.signer, payments: [{ receiver, amount: 1_000n, asset: 0n }] })],
    })
    // Until its policy is written, the global grant pays nothing.
    await expect(payFrom(labs)).rejects.toThrow(errPolicyMissing)

    const build = await daoWallet.build.usePlugin({
      sender: deployer.addr, signer: deployer.signer, lease: `pay_policy_${Date.now() % 100_000}`,
      callerType: CallerType.Global, windowSize: 2000n,
      calls: [writer.configurePolicy({
        sender: deployer.addr, signer: deployer.signer, plugin: pay.appId, caller: ALGORAND_ZERO_ADDRESS_STRING, escrow,
        body: encodePayPolicy({ recipients: [labs], assets: [0n] }), expectedRevision: 0n,
      })],
    })
    await proposeAndExecute(algorand, universe.dao, [{ type: ProposalActionEnum.ExecutePlugin, plugin: writer.appId,
      caller: deployer.addr.toString(), escrow: '', executionKey: build.lease, groups: build.ids,
      firstValid: build.firstValid, lastValid: build.lastValid }])
    await sendPrepared(build.windows[0], algorand.client.algod)

    const policy = await writer.getPolicy({ wallet: daoWallet.appId, plugin: pay.appId, caller: ALGORAND_ZERO_ADDRESS_STRING, escrow })
    expect(decodePayPolicy(policy.body)).toEqual({ recipients: [labs], assets: [0n] })
    const before = (await algorand.account.getInformation(labs)).balance.microAlgos
    await payFrom(labs)
    expect((await algorand.account.getInformation(labs)).balance.microAlgos).toBe(before + 1_000n)
    await expect(payFrom(stranger.addr.toString())).rejects.toThrow(errPayRecipient)
  })
})
