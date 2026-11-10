import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { encodeAddress } from 'algosdk'
import { beforeAll, describe, expect, test } from 'vitest'
import {
  deployFixedSignerConsensus,
  deployGuildTestEnvironment,
  expectContractError,
  fixedSigner,
  MAX_APP_CALL_FEE,
} from './test-helpers'

const fixture = algorandFixture()

describe('Fixed-signer capacity', () => {
  beforeAll(fixture.newScope, 120_000)

  test('recalculates maximum weight at 256 members and reuses a removed slot', async () => {
    const environment = await deployGuildTestEnvironment(fixture.context.algorand, fixture.context.testAccount)
    const { host, consensus } = await deployFixedSignerConsensus(environment, 1n)
    const send = { maxFee: MAX_APP_CALL_FEE, populateAppCallResources: true, coverAppCallInnerTransactionFees: true }
    const apply = (data: Uint8Array) => host.send.consensusAction({ args: { proposalId: 0n, data }, ...send })
    const members = Array.from({ length: 257 }, (_, index): [string, bigint] => {
      const key = new Uint8Array(32)
      key[0] = 99
      key[30] = (index + 1) >> 8
      key[31] = (index + 1) & 255
      return [encodeAddress(key), BigInt(index + 1)]
    })
    await apply(fixedSigner.setWeightMode(2))
    for (let start = 0; start < 256; start += 16) {
      await apply(fixedSigner.addMembers(2, members.slice(start, start + 16)))
    }
    expect(await consensus.state.global.memberCount()).toBe(256n)
    expect(await consensus.state.global.maximumMemberWeight()).toBe(256n)
    await host.send.validateActivation({ args: {}, ...send })
    expect(await consensus.state.global.activated()).toBe(1n)
    await expectContractError(apply(fixedSigner.addMembers(2, [members[256]])), 'ERR:errGmlm')
    await apply(fixedSigner.setMemberWeight(members[255][0], 1n))
    expect(await consensus.state.global.maximumMemberWeight()).toBe(255n)
    await apply(fixedSigner.removeMember(members[254][0]))
    expect(await consensus.state.global.maximumMemberWeight()).toBe(254n)
    await apply(fixedSigner.addMembers(2, [members[256]]))
    expect(await consensus.state.global.memberCount()).toBe(256n)
    expect(await consensus.state.global.maximumMemberWeight()).toBe(257n)
  }, 180_000)
})
