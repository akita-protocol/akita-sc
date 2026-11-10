import { AlgorandClient, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { createHash } from 'node:crypto'
import { beforeAll, describe, expect, test } from 'vitest'
import {
  ConsensusKeyregHookClient,
  ConsensusKeyregHookFactory,
  PoolKeys,
} from '../../artifacts/plugin-dex/hooks/ConsensusKeyregHookClient'
import { PluginDexClient, PluginDexComposer } from '../../artifacts/plugin-dex/PluginDexClient'
import { expectContractError } from '../../../tests/utils/errors'
import {
  addLiquidity,
  assertEscrowIdentity,
  createPool,
  deployVault,
  hookInstall,
  poolConfig,
  sendParams as send,
} from '../../../tests/fixtures/plugin-dex'

// FINAL-SPEC §4.14: ConsensusKeyregHook, a Poke-only lazy custody hook that keyregs a pool escrow.

const POKE = 256n
const CUSTODY = 1n
const LAZY_CUSTODY = 1n
const OFFLINE = new Uint8Array([0])
const ONLINE = new Uint8Array([1])
/** Global.payoutsGoOnlineFee on LocalNet */
const GO_ONLINE_FEE = 2_000_000n

const sha256 = (text: string) => new Uint8Array(createHash('sha256').update(text).digest())

type Inner = { txn: { txn: { type: string; applicationCall?: { appIndex?: bigint } } }; innerTxns?: Inner[] }
const isOpUp = (inner: Inner) => inner.txn.txn.type === 'appl' && !inner.txn.txn.applicationCall?.appIndex
/** every inner transaction type under a confirmation, depth-first, without the Vault's op-up app creates */
const innerTypes = (txn: { innerTxns?: unknown[] }): string[] =>
  ((txn.innerTxns ?? []) as Inner[]).filter((inner) => !isOpUp(inner)).flatMap((inner) => [inner.txn.txn.type, ...innerTypes(inner)])

describe('ConsensusKeyregHook (FINAL-SPEC §4.14)', () => {
  const localnet = algorandFixture()
  let algorand: AlgorandClient
  /** stands in for the DAO wallet: the Vault admin and the hook admin */
  let admin: TransactionSignerAccount
  let operator: TransactionSignerAccount
  let stranger: TransactionSignerAccount
  let dex: PluginDexClient
  let hook: ConsensusKeyregHookClient
  let tka: bigint
  let round: bigint

  const keysFor = (operatorAddr: string, seed: string): PoolKeys => ({
    operator: operatorAddr,
    voteKey: sha256(`${seed}/vote`),
    selectionKey: sha256(`${seed}/selection`),
    stateProofKey: new Uint8Array([...sha256(`${seed}/sp1`), ...sha256(`${seed}/sp2`)]),
    voteFirst: round,
    voteLast: round + 200_000n,
    voteKeyDilution: 1_000n,
  })

  const poke = (sender: TransactionSignerAccount, poolId: bigint, data: Uint8Array) =>
    dex.send.poke({ sender: sender.addr, signer: sender.signer, args: { poolId, hookIndex: 0n, data }, ...send })

  const account = (address: string) => algorand.client.algod.accountInformation(address).do()
  const tank = async () => (await algorand.account.getInformation(hook.appAddress)).balance.microAlgo

  /** a pool on (ALGO, tka) with liquidity and the keyreg hook installed at Poke */
  const keyregPool = async (lazy: boolean) => {
    const { poolId, escrow } = await createPool({
      algorand,
      dex,
      sender: admin,
      assetA: 0n,
      assetB: tka,
      config: poolConfig(30n),
      hooks: [hookInstall({ app: hook.appId, points: POKE, perms: CUSTODY, flags: lazy ? LAZY_CUSTODY : 0n })],
      optInLp: [admin],
    })
    await addLiquidity(algorand, dex, admin, poolId, 10_000_000n, 10_000_000n)
    return { poolId, escrow }
  }

  const reserves = async (poolId: bigint) => {
    const pool = await dex.getPool({ args: { poolId } })
    return [pool.reserveA, pool.reserveB]
  }

  beforeAll(async () => {
    await localnet.newScope()
    algorand = localnet.algorand
    admin = localnet.context.testAccount
    operator = await localnet.context.generateAccount({ initialFunds: (10).algo() })
    stranger = await localnet.context.generateAccount({ initialFunds: (10).algo() })
    const dispenser = await algorand.account.dispenserFromEnvironment()
    await algorand.account.ensureFunded(admin.addr, dispenser.addr, (1_000).algo())
    round = BigInt((await algorand.client.algod.status().do()).lastRound)

    tka = (await algorand.send.assetCreate({ sender: admin.addr, total: 10n ** 15n, decimals: 6, unitName: 'TKA' }))
      .assetId
    dex = await deployVault({ algorand, sender: admin })
    hook = (
      await algorand.client
        .getTypedAppFactory(ConsensusKeyregHookFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
        .send.create.create({ args: { dex: dex.appId, admin: admin.addr.toString() } })
    ).appClient
    // the fee tank (and the MBR of the per-pool key boxes)
    await hook.appClient.fundAppAccount({ amount: (10).algo() })
    await dex.send.setHookApproval({ args: { hook: hook.appId, perms: CUSTODY }, ...send })
  })

  describe('admin', () => {
    test('only the admin sets or deletes pool keys and withdraws the tank (errCkad)', async () => {
      const keys = keysFor(operator.addr.toString(), 'admin')
      await expectContractError(
        hook.send.setPoolKeys({ sender: stranger.addr, signer: stranger.signer, args: { poolId: 999n, keys }, ...send }),
        'errCkad',
      )
      await expectContractError(
        hook.send.deletePoolKeys({ sender: stranger.addr, signer: stranger.signer, args: { poolId: 999n }, ...send }),
        'errCkad',
      )
      await expectContractError(
        hook.send.withdraw({ sender: stranger.addr, signer: stranger.signer, args: { amount: 1n }, ...send }),
        'errCkad',
      )
      await expectContractError(
        hook.send.proposeAdmin({ sender: stranger.addr, signer: stranger.signer, args: { admin: stranger.addr.toString() }, ...send }),
        'errCkad',
      )
    })

    test('a key window with voteFirst > voteLast is rejected (errCkkw)', async () => {
      const keys = { ...keysFor(operator.addr.toString(), 'window'), voteFirst: round + 10n, voteLast: round }
      await expectContractError(hook.send.setPoolKeys({ args: { poolId: 999n, keys }, ...send }), 'errCkkw')
    })

    test('setPoolKeys stores the operator and key material; withdraw pays the admin', async () => {
      const keys = keysFor(operator.addr.toString(), 'stored')
      await hook.send.setPoolKeys({ args: { poolId: 999n, keys }, ...send })
      expect(await hook.getPoolKeys({ args: { poolId: 999n } })).toEqual(keys)
      await hook.send.deletePoolKeys({ args: { poolId: 999n }, ...send })
      const before = await tank()
      await hook.send.withdraw({ args: { amount: 100_000n }, ...send })
      expect(await tank()).toBe(before - 100_000n)
    })
  })

  describe('lazy install (points Poke, perms Custody, flags LazyCustody)', () => {
    let poolId: bigint
    let escrow: string
    let keys: PoolKeys

    beforeAll(async () => {
      ;({ poolId, escrow } = await keyregPool(true))
      keys = keysFor(operator.addr.toString(), `pool-${poolId}`)
    })

    test('an operator poke on a pool with no keys is a no-op (no custody, escrow stays offline)', async () => {
      const result = await poke(operator, poolId, ONLINE)
      // only the lazy hook call: no rekey, no keyreg
      expect(innerTypes(result.confirmations[0])).toEqual(['appl'])
      expect((await account(escrow)).status).toBe('Offline')
    })

    test('the operator goes online: incentive-eligible, the hook pre-donates the 2 ALGO fee, reserves unchanged', async () => {
      await hook.send.setPoolKeys({ args: { poolId, keys }, ...send })
      const tankBefore = await tank()
      const before = await reserves(poolId)

      const result = await poke(operator, poolId, ONLINE)

      const info = await account(escrow)
      expect(info.status).toBe('Online')
      expect(info.incentiveEligible).toBe(true)
      expect(info.participation?.voteFirstValid).toBe(keys.voteFirst)
      expect(info.participation?.voteLastValid).toBe(keys.voteLast)
      expect(info.participation?.voteKeyDilution).toBe(keys.voteKeyDilution)
      expect(new Uint8Array(info.participation!.voteParticipationKey)).toEqual(keys.voteKey)
      expect(new Uint8Array(info.participation!.selectionParticipationKey)).toEqual(keys.selectionKey)
      expect(info.authAddr?.toString()).toBe(dex.appAddress.toString())
      // the tank paid exactly the incentive fee; the guard saw a net ALGO delta of 0
      expect(await tank()).toBe(tankBefore - GO_ONLINE_FEE)
      expect(await reserves(poolId)).toEqual(before)
      await assertEscrowIdentity(algorand, dex, poolId)
      // lazy call, rekey to the hook, custody call (donation, keyreg with the rekey back)
      expect(innerTypes(result.confirmations[0])).toEqual(['appl', 'pay', 'appl', 'pay', 'keyreg'])
    })

    test('a non-operator poke is a no-op: no custody is requested and nothing changes', async () => {
      const before = await account(escrow)
      const tankBefore = await tank()
      const result = await poke(stranger, poolId, OFFLINE)
      expect(innerTypes(result.confirmations[0])).toEqual(['appl'])
      const after = await account(escrow)
      expect(after.status).toBe('Online')
      expect(after.amount).toBe(before.amount)
      expect(await tank()).toBe(tankBefore)
    })

    test('an operator poke with malformed data fails (errCkda)', async () => {
      await expectContractError(poke(operator, poolId, new Uint8Array()), 'errCkda')
      await expectContractError(poke(operator, poolId, new Uint8Array([2])), 'errCkda')
      await expectContractError(poke(operator, poolId, new Uint8Array([1, 0])), 'errCkda')
    })

    test('re-keyreg while already incentive-eligible (key rotation) costs the tank nothing', async () => {
      const rotated = { ...keysFor(operator.addr.toString(), `pool-${poolId}-rotated`) }
      await hook.send.setPoolKeys({ args: { poolId, keys: rotated }, ...send })
      const tankBefore = await tank()
      await poke(operator, poolId, ONLINE)
      const info = await account(escrow)
      expect(info.status).toBe('Online')
      expect(info.incentiveEligible).toBe(true)
      expect(new Uint8Array(info.participation!.voteParticipationKey)).toEqual(rotated.voteKey)
      expect(await tank()).toBe(tankBefore)
      await assertEscrowIdentity(algorand, dex, poolId)
      keys = rotated
    })

    test('the operator goes offline at no cost; going online again pays the fee only if eligibility was lost', async () => {
      const tankBefore = await tank()
      const before = await reserves(poolId)
      await poke(operator, poolId, OFFLINE)
      const offline = await account(escrow)
      expect(offline.status).toBe('Offline')
      expect(offline.participation).toBeUndefined()
      expect(offline.authAddr?.toString()).toBe(dex.appAddress.toString())
      expect(await tank()).toBe(tankBefore)
      expect(await reserves(poolId)).toEqual(before)
      await assertEscrowIdentity(algorand, dex, poolId)

      const eligibleWhileOffline = offline.incentiveEligible ?? false
      console.log(`[keyreg] incentive eligibility after going offline: ${eligibleWhileOffline}`)
      await poke(operator, poolId, ONLINE)
      const online = await account(escrow)
      expect(online.status).toBe('Online')
      expect(online.incentiveEligible).toBe(true)
      expect(await tank()).toBe(tankBefore - (eligibleWhileOffline ? 0n : GO_ONLINE_FEE))
      expect(await reserves(poolId)).toEqual(before)
      await assertEscrowIdentity(algorand, dex, poolId)
    })

    test('the old operator loses control after the admin changes it, and deleting the keys disables pokes', async () => {
      await hook.send.setPoolKeys({ args: { poolId, keys: { ...keys, operator: stranger.addr.toString() } }, ...send })
      expect(innerTypes((await poke(operator, poolId, OFFLINE)).confirmations[0])).toEqual(['appl'])
      expect((await account(escrow)).status).toBe('Online')

      await poke(stranger, poolId, OFFLINE)
      expect((await account(escrow)).status).toBe('Offline')

      await hook.send.deletePoolKeys({ args: { poolId }, ...send })
      expect(innerTypes((await poke(stranger, poolId, ONLINE)).confirmations[0])).toEqual(['appl'])
      expect((await account(escrow)).status).toBe('Offline')
      await assertEscrowIdentity(algorand, dex, poolId)
    })

    test('the Vault still rejects a paused pool (errPdpp)', async () => {
      await dex.send.setPoolPaused({ args: { poolId, paused: true }, ...send })
      await expectContractError(poke(operator, poolId, ONLINE), 'errPdpp')
      await dex.send.setPoolPaused({ args: { poolId, paused: false }, ...send })
    })
  })

  describe('eager install (points Poke, perms Custody, no LazyCustody)', () => {
    let poolId: bigint
    let escrow: string

    beforeAll(async () => {
      ;({ poolId, escrow } = await keyregPool(false))
      await hook.send.setPoolKeys({ args: { poolId, keys: keysFor(operator.addr.toString(), `eager-${poolId}`) }, ...send })
    })

    test('a non-operator poke hands custody straight back and changes nothing', async () => {
      const tankBefore = await tank()
      const before = await reserves(poolId)
      const result = await poke(stranger, poolId, ONLINE)
      // rekey to the hook, the custody call, and the hook's rekey-back from the escrow
      expect(innerTypes(result.confirmations[0])).toEqual(['pay', 'appl', 'pay'])
      const info = await account(escrow)
      expect(info.status).toBe('Offline')
      expect(info.authAddr?.toString()).toBe(dex.appAddress.toString())
      expect(await tank()).toBe(tankBefore)
      expect(await reserves(poolId)).toEqual(before)
      await assertEscrowIdentity(algorand, dex, poolId)
    })

    test('the operator goes online and offline', async () => {
      const tankBefore = await tank()
      await poke(operator, poolId, ONLINE)
      expect((await account(escrow)).status).toBe('Online')
      expect(await tank()).toBe(tankBefore - GO_ONLINE_FEE)
      await poke(operator, poolId, OFFLINE)
      expect((await account(escrow)).status).toBe('Offline')
      await assertEscrowIdentity(algorand, dex, poolId)
    })

    test('budget: an operator go-online poke needs no op-up carriers', async () => {
      // a fresh pool so the escrow is not yet eligible and pays the incentive fee
      const fresh = await keyregPool(true)
      await hook.send.setPoolKeys({
        args: { poolId: fresh.poolId, keys: keysFor(operator.addr.toString(), `budget-${fresh.poolId}`) },
        ...send,
      })
      const result = await (
        dex
          .newGroup()
          .poke({ sender: operator.addr, signer: operator.signer, args: { poolId: fresh.poolId, hookIndex: 0n, data: ONLINE }, staticFee: microAlgo(20_000) }) as PluginDexComposer<
          unknown[]
        >
      ).simulate({ allowUnnamedResources: true, skipSignatures: true, extraOpcodeBudget: 0 })
      const txnGroup = result.simulateResponse.txnGroups[0]
      expect(txnGroup.failureMessage).toBeUndefined()
      const vault = txnGroup.txnResults.at(-1)!
      const inners = (vault.txnResult.innerTxns ?? []) as unknown as Inner[]
      const opUps = inners.filter(isOpUp)
      console.log(
        `[budget] keyreg go-online poke (lazy): ${vault.appBudgetConsumed} opcodes, ${opUps.length} op-ups, ` +
          `inner tree ${innerTypes(vault.txnResult).join(',')}`,
      )
      expect(innerTypes(vault.txnResult)).toEqual(['appl', 'pay', 'appl', 'pay', 'keyreg'])
    })
  })
})
