import { Config, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import type { AlgorandClient } from '@algorandfoundation/algokit-utils'
import type { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import type { AppClient } from '@algorandfoundation/algokit-utils/types/app-client'
import { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import { beforeAll, describe, expect, test } from 'vitest'
import { BackrunArbHookFactory } from '../artifacts/plugin-dex/hooks/BackrunArbHookClient'
import { ConsensusKeyregHookFactory } from '../artifacts/plugin-dex/hooks/ConsensusKeyregHookClient'
import { LaunchManagerFactory } from '../artifacts/plugin-dex/launch/LaunchManagerClient'
import { deployVault } from '../../tests/fixtures/plugin-dex'
import { expectContractError } from '../../tests/utils/errors'

/**
 * Readiness audit 2026-11-09, C10: admin handover is two steps on every Plugin DEX app that has an
 * admin. `proposeAdmin(account)` names the successor and changes nothing; `acceptAdmin()` must be sent
 * by the successor itself. An address that cannot call the app (a typo, or a wallet with no way to make
 * the call) can therefore never become the admin, which with the old one-step `setAdmin` would have
 * locked every admin function for good.
 */

Config.configure({ populateAppCallResources: true })

const send = { maxFee: microAlgo(20_000), coverAppCallInnerTransactionFees: true, populateAppCallResources: true }

type Target = {
  name: string
  app: AppClient
  /** the app's "not the admin" error code */
  notAdmin: string
  /** a harmless admin-only call, used to show who holds the admin rights */
  adminCall: (treasury: string) => { method: string; args: unknown[] }
}

describe('Plugin DEX two-step admin handover (AUD-C10)', () => {
  const localnet = algorandFixture()
  let algorand: AlgorandClient
  let deployer: TransactionSignerAccount
  let successor: TransactionSignerAccount
  let other: TransactionSignerAccount
  let stranger: TransactionSignerAccount
  let targets: Target[]

  const as = (account: TransactionSignerAccount) => ({ sender: account.addr, signer: account.signer })
  const state = async (target: Target) => {
    const all = await target.app.getGlobalState()
    const address = (key: string) => (all[key] && 'valueRaw' in all[key] ? all[key].valueRaw : undefined)
    return { admin: address('admin'), pending: address('pending_admin') }
  }
  const raw = (account: TransactionSignerAccount) => account.addr.publicKey
  const adminCall = (target: Target, account: TransactionSignerAccount) =>
    target.app.send.call({ ...target.adminCall(deployer.addr.toString()), ...as(account), ...send } as any)
  const propose = (target: Target, by: TransactionSignerAccount, admin: string) =>
    target.app.send.call({ method: 'proposeAdmin', args: [admin], ...as(by), ...send })
  const accept = (target: Target, by: TransactionSignerAccount) =>
    target.app.send.call({ method: 'acceptAdmin', args: [], ...as(by), ...send })

  beforeAll(async () => {
    await localnet.newScope()
    algorand = localnet.algorand
    deployer = localnet.context.testAccount
    const dispenser = await algorand.account.dispenserFromEnvironment()
    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (100).algo())
    successor = await localnet.context.generateAccount({ initialFunds: (10).algo() })
    other = await localnet.context.generateAccount({ initialFunds: (10).algo() })
    stranger = await localnet.context.generateAccount({ initialFunds: (10).algo() })

    const defaults = { defaultSender: deployer.addr, defaultSigner: deployer.signer }
    const admin = deployer.addr.toString()
    const dex = await deployVault({ algorand, sender: deployer })
    const manager = (
      await algorand.client.getTypedAppFactory(LaunchManagerFactory, defaults)
        .send.create.create({ args: { vault: dex.appId, admin, antiSnipeHook: 0n, launchTaxHook: 0n } })
    ).appClient
    // the Tinyman app id is only stored at create: any live app stands in
    const backrun = (
      await algorand.client.getTypedAppFactory(BackrunArbHookFactory, defaults)
        .send.create.create({ args: { dex: dex.appId, tinyman: dex.appId, admin } })
    ).appClient
    const keyreg = (
      await algorand.client.getTypedAppFactory(ConsensusKeyregHookFactory, defaults)
        .send.create.create({ args: { dex: dex.appId, admin } })
    ).appClient
    for (const client of [manager, backrun, keyreg]) await client.appClient.fundAppAccount({ amount: microAlgo(200_000) })

    targets = [
      { name: 'PluginDex', app: dex.appClient, notAdmin: 'errPdao', adminCall: (treasury) => ({ method: 'setProtocolFee', args: [0n, treasury] }) },
      { name: 'LaunchManager', app: manager.appClient, notAdmin: 'errLmad', adminCall: (treasury) => ({ method: 'setFees', args: [0n, 0n, treasury] }) },
      { name: 'BackrunArbHook', app: backrun.appClient, notAdmin: 'errBrao', adminCall: () => ({ method: 'setPaused', args: [false] }) },
      { name: 'ConsensusKeyregHook', app: keyreg.appClient, notAdmin: 'errCkad', adminCall: () => ({ method: 'deletePoolKeys', args: [999n] }) },
    ]
  })

  test('the one-step setAdmin is gone from every app', () => {
    for (const target of targets) {
      const methods = target.app.appSpec.methods.map((m) => m.name)
      expect(methods, target.name).not.toContain('setAdmin')
      expect(methods, target.name).toEqual(expect.arrayContaining(['proposeAdmin', 'acceptAdmin']))
    }
  })

  test('only the admin proposes, and nobody can accept before a proposal', async () => {
    for (const target of targets) {
      await expectContractError(propose(target, stranger, stranger.addr.toString()), target.notAdmin)
      await expectContractError(accept(target, stranger), target.notAdmin)
      // not even the current admin: there is nothing to accept
      await expectContractError(accept(target, deployer), target.notAdmin)
      expect(await state(target), target.name).toEqual({ admin: raw(deployer), pending: undefined })
    }
  })

  test('a proposal changes nothing until the proposed account accepts', async () => {
    for (const target of targets) {
      await propose(target, deployer, successor.addr.toString())
      expect(await state(target), target.name).toEqual({ admin: raw(deployer), pending: raw(successor) })

      // The old admin is still the admin, so a successor that can never call costs nothing.
      await adminCall(target, deployer)
      await expectContractError(adminCall(target, successor), target.notAdmin)
      // Nobody else can accept for the successor, not even the admin that proposed it.
      await expectContractError(accept(target, stranger), target.notAdmin)
      await expectContractError(accept(target, deployer), target.notAdmin)
      // The successor cannot propose someone else either: it is not the admin yet.
      await expectContractError(propose(target, successor, other.addr.toString()), target.notAdmin)
    }
  })

  test('a new proposal replaces the pending one, and the zero address cancels', async () => {
    for (const target of targets) {
      await propose(target, deployer, other.addr.toString())
      expect((await state(target)).pending, target.name).toEqual(raw(other))
      await expectContractError(accept(target, successor), target.notAdmin)

      await propose(target, deployer, ALGORAND_ZERO_ADDRESS_STRING)
      await expectContractError(accept(target, other), target.notAdmin)
      await expectContractError(accept(target, successor), target.notAdmin)
      expect((await state(target)).admin, target.name).toEqual(raw(deployer))
    }
  })

  test('the proposed account takes over by accepting, and the old admin is out', async () => {
    for (const target of targets) {
      await propose(target, deployer, successor.addr.toString())
      await accept(target, successor)
      expect(await state(target), target.name).toEqual({ admin: raw(successor), pending: undefined })

      await adminCall(target, successor)
      await expectContractError(adminCall(target, deployer), target.notAdmin)
      await expectContractError(propose(target, deployer, deployer.addr.toString()), target.notAdmin)
      // The acceptance is spent: it cannot be replayed.
      await expectContractError(accept(target, successor), target.notAdmin)
    }
  })

  test('the new admin can hand over again the same way', async () => {
    for (const target of targets) {
      await propose(target, successor, deployer.addr.toString())
      expect(await state(target), target.name).toEqual({ admin: raw(successor), pending: raw(deployer) })
      await accept(target, deployer)
      expect(await state(target), target.name).toEqual({ admin: raw(deployer), pending: undefined })
    }
  })
})
