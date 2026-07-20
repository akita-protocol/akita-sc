import { Config, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import type { AlgorandClient } from '@algorandfoundation/algokit-utils'
import type { AddressWithTransactionSigner } from '@algorandfoundation/algokit-utils/transact'
import { beforeAll, beforeEach, describe, expect, test } from 'vitest'
import { LogicalOperator, Operator } from 'akita-sdk/gates'
import { StakingType } from 'akita-sdk/staking'
import { ABIType } from 'algosdk'
import type { StakingPowerGateClient } from '../artifacts/gates/sub-gates/staking-power/StakingPowerGateClient'
import type { StakingClient } from '../artifacts/staking/StakingClient'
import { deployAkitaDAO } from '../../tests/fixtures/dao'
import { deployGate as deployMainGate } from '../../tests/fixtures/gates/gate'
import { deployStaking } from '../../tests/fixtures/staking'
import { deployStakingPowerGate } from '../../tests/fixtures/subgates'

const fixture = algorandFixture()

const VERSION = '0.0.2'
const BASE_APP_MBR = 100_000n
const REGISTRY_MBR = 12_500n
const STAKE_BOX_MBR = 32_100n
const STAKE_AMOUNT = 10_000_000n
const POWER_THRESHOLD = 1n
const ONE_DAY = 86_400n
const ONE_YEAR = 365n * ONE_DAY
const REGISTRATION_SHAPE = '(uint8,uint64,uint64)'

const encodeRegistration = () =>
  ABIType.from(REGISTRATION_SHAPE).encode([Operator.GreaterThanOrEqualTo, 0n, POWER_THRESHOLD])

const getBlockTimestamp = async (algorand: AlgorandClient): Promise<bigint> => {
  const status = await algorand.client.algod.status()
  const block = await algorand.client.algod.block(status.lastRound)
  return BigInt(block.block.header.timestamp)
}

describe('StakingPowerGate', () => {
  let algorand: AlgorandClient
  let deployer: AddressWithTransactionSigner
  let staker: AddressWithTransactionSigner
  let staking: StakingClient
  let daoAppId: bigint

  beforeAll(async () => {
    Config.configure({ populateAppCallResources: true })
    await fixture.newScope()

    algorand = fixture.context.algorand
    deployer = fixture.context.testAccount
    staker = await fixture.context.generateAccount({ initialFunds: microAlgo(20_000_000n) })

    staking = await deployStaking({
      fixture,
      sender: deployer.addr,
      signer: deployer.signer,
      args: { version: VERSION, akitaDao: 0n },
    })
    await staking.appClient.fundAppAccount({ amount: microAlgo(1_000_000n) })
    await staking.send.init({ args: {} })

    const dao = await deployAkitaDAO({
      fixture,
      sender: deployer.addr,
      signer: deployer.signer,
      apps: { staking: staking.appId },
    })
    daoAppId = dao.appId

    const expiration = (await getBlockTimestamp(algorand)) + ONE_YEAR - ONE_DAY
    const stakePayment = await algorand.createTransaction.payment({
      sender: staker.addr,
      signer: staker.signer,
      receiver: staking.appAddress,
      amount: microAlgo(STAKE_BOX_MBR + STAKE_AMOUNT),
    })
    await staking.send.stake({
      sender: staker.addr,
      signer: staker.signer,
      args: {
        payment: stakePayment,
        type: StakingType.Lock,
        amount: STAKE_AMOUNT,
        expiration,
      },
    })
  })

  beforeEach(fixture.beforeEach)

  const deployGate = async (): Promise<StakingPowerGateClient> => {
    const { client } = await deployStakingPowerGate({
      fixture,
      sender: deployer.addr,
      signer: deployer.signer,
      args: { version: VERSION, akitaDao: daoAppId },
    })
    await client.appClient.fundAppAccount({ amount: microAlgo(BASE_APP_MBR) })
    return client
  }

  const register = async (client: StakingPowerGateClient) => {
    const args = encodeRegistration()
    const mbrPayment = await algorand.createTransaction.payment({
      sender: deployer.addr,
      signer: deployer.signer,
      receiver: client.appAddress,
      amount: microAlgo(REGISTRY_MBR),
    })
    const result = await client.send.register({ args: { mbrPayment, args } })
    return { args, registryId: result.return! }
  }

  test('creates with the expected globals and exact base funding', async () => {
    const client = await deployGate()
    const state = await client.state.global.getAll()
    const account = await algorand.account.getInformation(client.appAddress)

    expect(state).toMatchObject({
      version: VERSION,
      akitaDao: daoAppId,
      registryCursor: 1n,
      registrationShape: REGISTRATION_SHAPE,
      checkShape: '',
    })
    expect(account.balance.microAlgos).toBe(BASE_APP_MBR)
    expect(account.minBalance.microAlgos).toBe(BASE_APP_MBR)

    const cost = await client.send.cost({ args: { args: encodeRegistration() } })
    expect(cost.return).toBe(REGISTRY_MBR)
  })

  test('registers an exact 12,500 microAlgo box entry', async () => {
    const client = await deployGate()
    const before = await algorand.account.getInformation(client.appAddress)
    const { args, registryId } = await register(client)
    const after = await algorand.account.getInformation(client.appAddress)

    expect(registryId).toBe(1n)
    expect(await client.state.global.registryCursor()).toBe(2n)
    expect(await client.state.box.registry.value(registryId)).toEqual({
      op: Operator.GreaterThanOrEqualTo,
      asset: 0n,
      power: POWER_THRESHOLD,
    })
    expect(await client.getEntry({ args: { registryId } })).toEqual(args)
    expect(after.balance.microAlgos - before.balance.microAlgos).toBe(REGISTRY_MBR)
    expect(after.minBalance.microAlgos - before.minBalance.microAlgos).toBe(REGISTRY_MBR)
    expect(after.balance.microAlgos).toBe(after.minBalance.microAlgos)
  })

  test('checks a live lock stake using the current four-field getInfo ABI', async () => {
    const client = await deployGate()
    const { registryId } = await register(client)

    const info = await staking.send.getInfo({
      args: {
        address: staker.addr.toString(),
        stake: { asset: 0n, type: StakingType.Lock },
      },
    })
    expect(info.return).toMatchObject({
      amount: STAKE_AMOUNT,
      weightedAge: 0n,
    })
    expect(info.return!.lastUpdate).toBeGreaterThan(0n)
    expect(info.return!.expiration).toBeGreaterThan(await getBlockTimestamp(algorand))

    const checked = await client.send.check({
      args: {
        caller: staker.addr.toString(),
        registryId,
        args: new Uint8Array(),
      },
      extraFee: microAlgo(1_000n),
    })
    expect(checked.return).toBe(true)
  })

  test('encodes and registers staking power filters through GateSDK', async () => {
    const client = await deployGate()
    const gate = await deployMainGate({
      fixture,
      sender: deployer.addr,
      signer: deployer.signer,
      args: { version: VERSION, akitaDao: daoAppId },
      gateRegistry: { staking_power: client.appId },
    })

    const registered = await gate.register({
      args: [{
        type: 'staking_power',
        appId: client.appId,
        layer: 0n,
        logicalOperator: LogicalOperator.None,
        op: Operator.GreaterThanOrEqualTo,
        asset: 0n,
        power: POWER_THRESHOLD,
      }],
    })

    expect(registered.return).toBe(1n)
    expect(await gate.getGate({ gateId: 1n })).toEqual([{
      type: 'staking_power',
      op: Operator.GreaterThanOrEqualTo,
      asset: 0n,
      power: POWER_THRESHOLD,
    }])
  })
})
