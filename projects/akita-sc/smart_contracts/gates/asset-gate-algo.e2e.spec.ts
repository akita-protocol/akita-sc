import { Config } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { ABITupleType, ABIUintType } from 'algosdk'
import { beforeAll, describe, expect, test } from 'vitest'
import { deployAssetGate } from '../../tests/fixtures/gates/sub-gates/asset'
import type { AssetGateClient } from '../artifacts/gates/sub-gates/asset/AssetGateClient'

/** AssetGateRegistryMBR */
const REGISTRY_MBR = 12_500n
/** utils/operators.ts */
const LESS_THAN = 30
const GREATER_THAN_OR_EQUAL = 60
/** the gate's registration shape: (asset, operator, value) */
const ENTRY = new ABITupleType([new ABIUintType(64), new ABIUintType(8), new ABIUintType(64)])

// AUD-C27: the gate read an ALGO balance in a way that fails the call for an account that holds
// nothing. This sub-gate can never be patched, so the read has to be right before it is deployed.
describe('AssetGate: the ALGO balance of an account that holds nothing', () => {
  const fixture = algorandFixture()
  let gate: AssetGateClient
  let sender: string

  beforeAll(async () => {
    Config.configure({ populateAppCallResources: true })
    await fixture.newScope()
    const { testAccount } = fixture.context
    sender = testAccount.toString()
    gate = await deployAssetGate({ fixture, sender, signer: testAccount.signer, args: {} })
  })

  const register = async (operator: number, value: bigint) => {
    const mbrPayment = await fixture.algorand.createTransaction.payment({
      sender, receiver: gate.appAddress, amount: Number(REGISTRY_MBR).microAlgos(),
    })
    return (await gate.send.register({ args: { mbrPayment, args: ENTRY.encode([0n, operator, value]) } })).return!
  }
  const check = async (caller: string, registryId: bigint) =>
    (await gate.send.check({ args: { caller, registryId, args: new Uint8Array() } })).return

  test('it is checked as a balance of zero, and a funded account is checked as before', async () => {
    const atLeastOneAlgo = await register(GREATER_THAN_OR_EQUAL, 1_000_000n)
    const belowOneAlgo = await register(LESS_THAN, 1_000_000n)
    const empty = fixture.algorand.account.random().addr.toString()

    expect(await check(empty, atLeastOneAlgo)).toBe(false)
    expect(await check(empty, belowOneAlgo)).toBe(true)
    expect(await check(sender, atLeastOneAlgo)).toBe(true)
    expect(await check(sender, belowOneAlgo)).toBe(false)
  })
})
