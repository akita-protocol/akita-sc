import { Config, microAlgo } from '@algorandfoundation/algokit-utils'
import { registerDebugEventHandlers } from '@algorandfoundation/algokit-utils-debug'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { CallerType } from 'akita-sdk/wallet'
import { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

import {
  Arc58AgentDelegationDeployment,
  Arc58AgentTestAccount,
  Arc58AgentWalletScenario,
  createFreshAgentWallet,
  deployArc58AgentDelegationFixture,
} from '../../../tests/fixtures/arc58-agent-delegation'
import { TimeWarp } from '../../../tests/utils/time'
import { errOnlyAdminOrRevocationAppCanRemovePlugin, errPluginDoesNotExist } from './errors'

/**
 * A caller named in a plugin grant may remove that grant itself (2026-11-16).
 *
 * The case it is for: an agent that shuts down frees the storage its grants hold in users' wallets.
 * Removal stays with the wallet. Nothing else about a grant can be changed by its caller, and an
 * open plugin window never counts as the caller, the admin or the revocation app.
 */

const MAX_UINT64 = 18_446_744_073_709_551_615n
const AGENT_DELEGATION_TYPE = 2n
const NAMED_ESCROW_FEE = 6_000n
const TEST_TIMEOUT = 180_000

const fixture = algorandFixture()
let deployment: Arc58AgentDelegationDeployment

const addressOf = (account: Arc58AgentTestAccount): string => account.addr.toString()

type GrantOptions = {
  plugin: bigint
  caller: string
  escrow?: string
  methods?: [Uint8Array, bigint][]
  lastValid?: bigint
}

async function addGrant(scenario: Arc58AgentWalletScenario, options: GrantOptions): Promise<void> {
  const { wallet, owner } = scenario
  const { plugin, caller, escrow = '', methods = [], lastValid = MAX_UINT64 } = options
  await wallet.client.send.arc58AddPlugin({
    sender: owner.addr,
    signer: owner.signer,
    extraFee: microAlgo(escrow === '' ? 0n : NAMED_ESCROW_FEE),
    args: {
      plugin,
      caller,
      escrow,
      admin: false,
      delegationType: AGENT_DELEGATION_TYPE,
      lastValid,
      cooldown: 0n,
      methods,
      useRounds: true,
      useExecutionKey: false,
      coverFees: false,
      canReclaim: false,
      defaultToEscrow: false,
    },
  })
}

/** `sender` asks the wallet to remove the grant `{ plugin, caller, escrow }`. */
async function removeAs(
  scenario: Arc58AgentWalletScenario,
  sender: Arc58AgentTestAccount,
  grant: { plugin: bigint; caller: string; escrow?: string },
): Promise<unknown> {
  return scenario.wallet.client.send.arc58RemovePlugin({
    sender: sender.addr,
    signer: sender.signer,
    args: { plugin: grant.plugin, caller: grant.caller, escrow: grant.escrow ?? '' },
  })
}

async function grantExists(
  scenario: Arc58AgentWalletScenario,
  grant: { plugin: bigint; caller: string; escrow?: string },
): Promise<boolean> {
  try {
    const value = await scenario.wallet.client.state.box.plugins.value({
      plugin: grant.plugin,
      caller: grant.caller,
      escrow: grant.escrow ?? '',
    })
    return value !== undefined
  } catch (error) {
    if (String(error).includes('box not found')) return false
    throw error
  }
}

async function minBalance(address: string): Promise<bigint> {
  return (await deployment.algorand.account.getInformation(address)).minBalance.microAlgo
}

/**
 * `caller` opens a window on the probe plugin (a grant anyone may use) and the probe asks the wallet,
 * as the wallet's own account, to remove `grant`.
 */
async function removeFromInsideWindow(
  scenario: Arc58AgentWalletScenario,
  caller: Arc58AgentTestAccount,
  grant: { plugin: bigint; caller: string; escrow?: string },
): Promise<unknown> {
  const { wallet } = scenario
  const group = wallet.client.newGroup()
  group.arc58RekeyToPlugin({
    sender: caller.addr,
    signer: caller.signer,
    args: {
      plugin: deployment.probePlugin.appId,
      type: CallerType.Global,
      escrow: '',
      methodOffsets: [],
      fundsRequest: [],
    },
    extraFee: microAlgo(2_000),
  })
  const composer = await group.composer()
  composer.addAppCallMethodCall(
    await deployment.probePlugin.params.removeGrant({
      sender: caller.addr,
      signer: caller.signer,
      args: {
        wallet: wallet.appId,
        rekeyBack: true,
        plugin: grant.plugin,
        caller: grant.caller,
        escrow: grant.escrow ?? '',
      },
      extraFee: microAlgo(2_000),
    }),
  )
  group.arc58VerifyAuthAddress({ sender: caller.addr, signer: caller.signer, args: {} })
  return group.send()
}

beforeAll(async () => {
  Config.configure({ debug: true, populateAppCallResources: true })
  registerDebugEventHandlers()
  deployment = await deployArc58AgentDelegationFixture(fixture)
}, 300_000)

afterAll(async () => {
  deployment?.restoreEnvironment()
  if (deployment) await new TimeWarp(deployment.algorand).resetTimeWarp()
})

describe('ARC-58 a caller removes its own grant', () => {
  test(
    'the named caller removes its grant, the storage is freed, and it does not count as the user acting',
    async () => {
      const scenario = await createFreshAgentWallet(deployment)
      const { wallet, agent, outsider } = scenario
      const walletAddress = wallet.client.appAddress.toString()
      const pay = deployment.payPlugin.appId

      const before = await minBalance(walletAddress)
      await addGrant(scenario, { plugin: pay, caller: addressOf(agent) })
      await addGrant(scenario, { plugin: pay, caller: addressOf(outsider) })
      const withBoth = await minBalance(walletAddress)
      const oneGrant = (withBoth - before) / 2n
      expect(oneGrant).toBeGreaterThan(0n)

      const global = await wallet.client.state.global.getAll()
      await new TimeWarp(deployment.algorand).timeWarp(120n)

      await removeAs(scenario, agent, { plugin: pay, caller: addressOf(agent) })

      expect(await grantExists(scenario, { plugin: pay, caller: addressOf(agent) })).toBe(false)
      expect(await grantExists(scenario, { plugin: pay, caller: addressOf(outsider) })).toBe(true)
      expect(await minBalance(walletAddress)).toBe(withBoth - oneGrant)

      const after = await wallet.client.state.global.getAll()
      expect(after.lastUserInteraction).toBe(global.lastUserInteraction)
      expect(after.lastChange!).toBeGreaterThan(global.lastChange!)

      // gone for good: a second removal finds nothing, and the grant cannot be used
      await expect(removeAs(scenario, agent, { plugin: pay, caller: addressOf(agent) })).rejects.toThrow(
        errPluginDoesNotExist,
      )
    },
    TEST_TIMEOUT,
  )

  test(
    'method restrictions, an escrow and an expired grant do not block it, and the escrow stays for the owner',
    async () => {
      const scenario = await createFreshAgentWallet(deployment)
      const { wallet, agent } = scenario
      const walletAddress = wallet.client.appAddress.toString()
      const probe = deployment.probePlugin.appId
      const allowed = deployment.probePlugin.appClient.getABIMethod('allowed').getSelector()
      const escrow = 'agent-budget'

      // the escrow exists first, so the grant's own storage can be measured alone
      await wallet.client.send.arc58NewEscrow({
        sender: scenario.owner.addr,
        signer: scenario.owner.signer,
        extraFee: microAlgo(NAMED_ESCROW_FEE),
        args: { escrow, address: ALGORAND_ZERO_ADDRESS_STRING },
      })
      const before = await minBalance(walletAddress)

      // valid only for the round it is added in
      const lastValid = (await deployment.algorand.client.algod.status().do()).lastRound + 1n
      await addGrant(scenario, { plugin: probe, caller: addressOf(agent), escrow, methods: [[allowed, 0n]], lastValid })
      expect(await minBalance(walletAddress)).toBeGreaterThan(before)
      await new TimeWarp(deployment.algorand).warpForwardRounds(5n)

      await removeAs(scenario, agent, { plugin: probe, caller: addressOf(agent), escrow })

      expect(await grantExists(scenario, { plugin: probe, caller: addressOf(agent), escrow })).toBe(false)
      expect(await minBalance(walletAddress)).toBe(before)
      expect((await wallet.getEscrow(escrow)).id).toBeGreaterThan(0n)
    },
    TEST_TIMEOUT,
  )

  test(
    'a caller cannot remove another caller\'s grant, a grant open to anyone, or an admin grant',
    async () => {
      const scenario = await createFreshAgentWallet(deployment)
      const { wallet, owner, agent, outsider } = scenario
      const walletAddress = wallet.client.appAddress.toString()
      const pay = deployment.payPlugin.appId
      const probe = deployment.probePlugin.appId
      const optIn = deployment.selfOptInPlugin.appId

      await addGrant(scenario, { plugin: pay, caller: addressOf(agent) })
      await addGrant(scenario, { plugin: pay, caller: addressOf(outsider) })
      await addGrant(scenario, { plugin: probe, caller: ALGORAND_ZERO_ADDRESS_STRING })
      // an admin grant is stored under the wallet's own address
      await addGrant(scenario, { plugin: optIn, caller: walletAddress })

      const others = [
        { plugin: pay, caller: addressOf(outsider) },
        { plugin: probe, caller: ALGORAND_ZERO_ADDRESS_STRING },
        { plugin: optIn, caller: walletAddress },
      ]
      for (const grant of others) {
        await expect(removeAs(scenario, agent, grant)).rejects.toThrow(errOnlyAdminOrRevocationAppCanRemovePlugin)
        expect(await grantExists(scenario, grant)).toBe(true)
      }

      // naming itself on a grant it does not hold finds nothing
      await expect(removeAs(scenario, agent, { plugin: optIn, caller: addressOf(agent) })).rejects.toThrow(
        errPluginDoesNotExist,
      )

      // the owner still removes any of them
      await removeAs(scenario, owner, { plugin: pay, caller: addressOf(outsider) })
      expect(await grantExists(scenario, { plugin: pay, caller: addressOf(outsider) })).toBe(false)
      expect(await grantExists(scenario, { plugin: pay, caller: addressOf(agent) })).toBe(true)
    },
    TEST_TIMEOUT,
  )
})

describe('ARC-58 a caller and a grant that has a name', () => {
  test(
    'the caller removes the grant with arc58_removePlugin; the name is the owner\'s to clear',
    async () => {
      const scenario = await createFreshAgentWallet(deployment)
      const { wallet, owner, agent } = scenario
      const walletAddress = wallet.client.appAddress.toString()
      const pay = deployment.payPlugin.appId
      const name = 'agent-pay'
      const grant = { plugin: pay, caller: addressOf(agent) }

      const before = await minBalance(walletAddress)
      await wallet.client.send.arc58AddNamedPlugin({
        sender: owner.addr,
        signer: owner.signer,
        args: {
          name, plugin: pay, caller: addressOf(agent), escrow: '', admin: false, delegationType: AGENT_DELEGATION_TYPE,
          lastValid: MAX_UINT64, cooldown: 0n, methods: [], useRounds: true, useExecutionKey: false, coverFees: false,
          canReclaim: false, defaultToEscrow: false,
        },
      })
      const withNamedGrant = await minBalance(walletAddress)

      // the named removal stays with the admin and the revocation app
      await expect(
        wallet.client.send.arc58RemoveNamedPlugin({ sender: agent.addr, signer: agent.signer, args: { name } }),
      ).rejects.toThrow(errOnlyAdminOrRevocationAppCanRemovePlugin)
      expect(await grantExists(scenario, grant)).toBe(true)

      // the plain removal works for the caller and frees the grant's storage, not the name's
      await removeAs(scenario, agent, grant)
      expect(await grantExists(scenario, grant)).toBe(false)
      const nameOnly = await minBalance(walletAddress)
      expect(nameOnly).toBeLessThan(withNamedGrant)
      expect(nameOnly).toBeGreaterThan(before)
      expect((await wallet.client.state.box.namedPlugins.value(name))?.plugin).toBe(pay)

      // the owner clears the name that now points at nothing, and the wallet is back where it started
      await wallet.client.send.arc58RemoveNamedPlugin({ sender: owner.addr, signer: owner.signer, args: { name } })
      expect(await minBalance(walletAddress)).toBe(before)
    },
    TEST_TIMEOUT,
  )
})

describe('ARC-58 an open plugin window is not a way to remove grants', () => {
  test(
    'a plugin cannot remove an admin grant by sending as the wallet\'s own account',
    async () => {
      const scenario = await createFreshAgentWallet(deployment)
      const { wallet, agent } = scenario
      const walletAddress = wallet.client.appAddress.toString()
      const optIn = deployment.selfOptInPlugin.appId

      await addGrant(scenario, { plugin: deployment.probePlugin.appId, caller: ALGORAND_ZERO_ADDRESS_STRING })
      await addGrant(scenario, { plugin: optIn, caller: walletAddress })

      // the sender of the inner call is the wallet's address, which is also the admin grant's caller
      await expect(removeFromInsideWindow(scenario, agent, { plugin: optIn, caller: walletAddress })).rejects.toThrow(
        errOnlyAdminOrRevocationAppCanRemovePlugin,
      )
      expect(await grantExists(scenario, { plugin: optIn, caller: walletAddress })).toBe(true)
    },
    TEST_TIMEOUT,
  )

  test(
    'on a wallet with no revocation app, a plugin cannot pass as the revocation app',
    async () => {
      const scenario = await createFreshAgentWallet(deployment)
      const { wallet, owner, agent, outsider } = scenario
      const pay = deployment.payPlugin.appId

      // every wallet of the live factory is in this state: the revocation app is 0
      await wallet.changeRevocationApp({ sender: owner.addr, signer: owner.signer, app: 0n })
      expect((await wallet.client.state.global.getAll()).revocation).toBe(0n)

      await addGrant(scenario, { plugin: deployment.probePlugin.appId, caller: ALGORAND_ZERO_ADDRESS_STRING })
      await addGrant(scenario, { plugin: pay, caller: addressOf(outsider) })

      await expect(
        removeFromInsideWindow(scenario, agent, { plugin: pay, caller: addressOf(outsider) }),
      ).rejects.toThrow(errOnlyAdminOrRevocationAppCanRemovePlugin)
      expect(await grantExists(scenario, { plugin: pay, caller: addressOf(outsider) })).toBe(true)

      // with no revocation app the owner and the grant's own caller still remove it
      await expect(removeAs(scenario, agent, { plugin: pay, caller: addressOf(outsider) })).rejects.toThrow(
        errOnlyAdminOrRevocationAppCanRemovePlugin,
      )
      await removeAs(scenario, outsider, { plugin: pay, caller: addressOf(outsider) })
      expect(await grantExists(scenario, { plugin: pay, caller: addressOf(outsider) })).toBe(false)
    },
    TEST_TIMEOUT,
  )
})
