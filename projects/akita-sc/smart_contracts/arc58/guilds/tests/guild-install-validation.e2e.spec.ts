import { ALGORAND_ZERO_ADDRESS_STRING, generateAccount } from 'algosdk'
import { microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { beforeAll, describe, expect, test } from 'vitest'
import {
  addPluginAction,
  createProposal,
  deployGuildTestEnvironment,
  expectContractError,
  mintLockedGuild,
  proposalSettings,
  setupGuildWallet,
  type GuildTestEnvironment,
} from './test-helpers'

// No TimeWarp here: this spec must be safe on a shared LocalNet.
const fixture = algorandFixture()
let environment: GuildTestEnvironment

describe('Guild rejects plugin installs the wallet would refuse', () => {
  beforeAll(fixture.newScope, 120_000)
  beforeAll(async () => {
    environment = await deployGuildTestEnvironment(fixture.context.algorand, fixture.context.testAccount)
  }, 180_000)

  test('open caller with coverFees, and an execution key with a named caller, never reach a vote', async () => {
    const { guild } = await mintLockedGuild(environment)
    await setupGuildWallet(environment, guild)
    await guild.appClient.fundAppAccount({ amount: microAlgo(3_000_000n) })
    const plugin = environment.revenueEscrow.appId
    const named = generateAccount().addr.toString()

    await expectContractError(
      createProposal(environment, guild, [
        addPluginAction(plugin, ALGORAND_ZERO_ADDRESS_STRING, 'open-fees', proposalSettings(), false, true),
      ]),
      'ERR:errGacn',
    )
    await expectContractError(
      createProposal(environment, guild, [addPluginAction(plugin, named, 'named-key', proposalSettings(), true)]),
      'ERR:errGacn',
    )
    expect(
      await createProposal(environment, guild, [addPluginAction(plugin, named, 'named-direct', proposalSettings(), false, true)]),
    ).toBeGreaterThan(0n)
  }, 180_000)

  // AUD-C25: the wallet's other two fixed install rules, errZeroAddressDelegationType and
  // errEscrowRequiredToBeSetAsDefault.
  test('self delegation with an open caller, and a default escrow with no escrow named, never reach a vote', async () => {
    const { guild } = await mintLockedGuild(environment)
    await setupGuildWallet(environment, guild)
    await guild.appClient.fundAppAccount({ amount: microAlgo(3_000_000n) })
    const plugin = environment.revenueEscrow.appId
    const named = generateAccount().addr.toString()
    const SELF = 1

    await expectContractError(
      createProposal(environment, guild, [
        addPluginAction(plugin, ALGORAND_ZERO_ADDRESS_STRING, 'self-open', proposalSettings(), false, false, false, SELF),
      ]),
      'ERR:errGacn',
    )
    await expectContractError(
      createProposal(environment, guild, [
        addPluginAction(plugin, named, '', proposalSettings(), false, false, true),
      ]),
      'ERR:errGacn',
    )
    // The same two settings with what the wallet asks for beside them are accepted.
    expect(
      await createProposal(environment, guild, [
        addPluginAction(plugin, named, 'self-default', proposalSettings(), false, false, true, SELF),
      ]),
    ).toBeGreaterThan(0n)
  }, 180_000)
})
