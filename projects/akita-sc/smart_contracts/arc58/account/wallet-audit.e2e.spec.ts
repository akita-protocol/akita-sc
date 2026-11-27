/**
 * Regression tests for the fixes to the wallet-core audit of 2.0.0 (WAL-01 to WAL-06 and WAL-08).
 *
 * Each test is the audit's reproduction with the expectation turned round: what the audit showed
 * going wrong must now be refused, or must now work at the quoted price.
 */
import { Config, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { CallerType, newWallet, WalletSDK } from 'akita-sdk/wallet'
import algosdk, { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

import {
  Arc58AgentDelegationDeployment,
  Arc58AgentTestAccount,
  Arc58AgentWalletScenario,
  createFreshAgentWallet,
  deployArc58AgentDelegationFixture,
} from '../../../tests/fixtures/arc58-agent-delegation'
import { expectContractError } from '../../../tests/utils/errors'
import { APP_SPEC as ForgedWalletSpec } from '../../artifacts/mocks/forged-wallet/MockForgedWalletClient'
import { MockWindowReclaimClient, MockWindowReclaimFactory } from '../../artifacts/mocks/window-reclaim/MockWindowReclaimClient'
import { errAdminOnly, errForbidden, errNotFrozen } from './errors'

const ZERO = ALGORAND_ZERO_ADDRESS_STRING
const MAX_UINT64 = 18_446_744_073_709_551_615n
const TEST_TIMEOUT = 240_000
/** What the factory leaves a new wallet's app account above its minimum: the price of its registry record. */
const REGISTRY_PREFUND = 12_100n

const fixture = algorandFixture()
let deployment: Arc58AgentDelegationDeployment
let windowReclaim: MockWindowReclaimClient
let sequence = 0

beforeAll(async () => {
  Config.configure({ populateAppCallResources: true })
  deployment = await deployArc58AgentDelegationFixture(fixture)

  const factory = deployment.algorand.client.getTypedAppFactory(MockWindowReclaimFactory, {
    defaultSender: deployment.deployer.addr,
    defaultSigner: deployment.deployer.signer,
  })
  windowReclaim = (await factory.send.create.bare()).appClient
}, 300_000)

afterAll(async () => {
  deployment?.restoreEnvironment()
})

const balanceOf = async (address: string): Promise<bigint> =>
  (await deployment.algorand.account.getInformation(address)).balance.microAlgo

const minBalanceOf = async (address: string): Promise<bigint> =>
  (await deployment.algorand.account.getInformation(address)).minBalance.microAlgo

/** What an account holds above its minimum balance. */
const spareOf = async (address: string): Promise<bigint> => (await balanceOf(address)) - (await minBalanceOf(address))

async function freshAccount(algos: number): Promise<Arc58AgentTestAccount> {
  const { algorand } = deployment
  const dispenser = await algorand.account.dispenserFromEnvironment()
  const account = algorand.account.random() as Arc58AgentTestAccount
  await algorand.account.ensureFunded(account.addr.toString(), dispenser.addr.toString(), microAlgo(BigInt(algos) * 1_000_000n))
  return account
}

type Plugins = NonNullable<Parameters<typeof newWallet>[0]['plugins']>

/** A new wallet for `owner`. With `external`, that account is its controlled address. */
async function createWallet(
  owner: Arc58AgentTestAccount,
  options: { external?: Arc58AgentTestAccount, plugins?: Plugins, extraFunding?: bigint } = {},
): Promise<WalletSDK> {
  return newWallet({
    algorand: deployment.algorand,
    readerAccount: owner.addr.toString(),
    factoryParams: { appId: deployment.walletFactory.appId, defaultSender: owner.addr, defaultSigner: owner.signer },
    nickname: `wallet-audit-${++sequence}`,
    ...(options.external
      ? { controlledAddress: options.external.addr.toString(), controlledSigner: options.external.signer }
      : {}),
    plugins: options.plugins ?? [],
    extraFunding: options.extraFunding ?? 0n,
  })
}

type Grant = { plugin: bigint, caller: string, escrow?: string, canReclaim?: boolean }

/** The wallet's admin installs a grant with a raw call, so the test names the grant's caller itself. */
async function addGrant({ wallet, owner }: Arc58AgentWalletScenario, grant: Grant): Promise<void> {
  const escrow = grant.escrow ?? ''
  await wallet.client.send.arc58AddPlugin({
    sender: owner.addr,
    signer: owner.signer,
    // a new escrow is made through the escrow factory: six more transactions
    extraFee: microAlgo(escrow === '' ? 0n : 6_000n),
    args: {
      plugin: grant.plugin,
      caller: grant.caller,
      escrow,
      admin: false,
      delegationType: 2n,
      lastValid: MAX_UINT64,
      cooldown: 0n,
      methods: [],
      useRounds: true,
      useExecutionKey: false,
      coverFees: false,
      canReclaim: grant.canReclaim ?? false,
      defaultToEscrow: false,
    },
  })
}

describe('WAL-01: the wallet\'s own address is never a grant\'s caller for a plugin reclaim', () => {
  test(
    'a plugin on the main account cannot reclaim from an escrow through the admin\'s own grant on it',
    async () => {
      const { algorand } = deployment
      const scenario = await createFreshAgentWallet(deployment)
      const { wallet, owner, outsider } = scenario
      const walletAddress = wallet.client.appAddress.toString()
      const pay = deployment.payPlugin.appId
      const escrow = 'savings'

      // The admin's own grant of the pay plugin on the escrow, allowed to reclaim.
      await addGrant(scenario, { plugin: pay, caller: walletAddress, escrow, canReclaim: true })
      // An unrelated plugin with a grant on the main account only, which anyone may open.
      await addGrant(scenario, { plugin: windowReclaim.appId, caller: ZERO })

      const escrowAddress = (await wallet.getEscrow(escrow)).address.toString()
      await algorand.send.payment({ sender: owner.addr, signer: owner.signer, receiver: escrowAddress, amount: microAlgo(10_000_000n) })

      const escrowBefore = await balanceOf(escrowAddress)
      const thief = algorand.account.random()

      const group = wallet.client.newGroup()
      group.arc58RekeyToPlugin({
        sender: outsider.addr,
        signer: outsider.signer,
        args: { plugin: windowReclaim.appId, type: CallerType.Global, escrow: '', methodOffsets: [], fundsRequest: [] },
        extraFee: microAlgo(10_000n),
      })
      const composer = await group.composer()
      composer.addAppCallMethodCall(
        await windowReclaim.params.reclaimViaGrant({
          sender: outsider.addr,
          signer: outsider.signer,
          args: {
            wallet: wallet.appId,
            rekeyBack: true,
            plugin: pay,
            caller: walletAddress,
            escrow,
            amount: 10_000_000n,
            receiver: thief.addr.toString(),
          },
          extraFee: microAlgo(5_000n),
        }),
      )
      group.arc58VerifyAuthAddress({ sender: outsider.addr, signer: outsider.signer, args: {} })

      await expectContractError(group.send(), errForbidden)
      expect(await balanceOf(escrowAddress)).toBe(escrowBefore)
      expect(await balanceOf(thief.addr.toString())).toBe(0n)

      // The admin's own door is unchanged: arc58_reclaim returns the escrow's funds to the wallet.
      const walletBefore = await balanceOf(walletAddress)
      await wallet.client.send.arc58Reclaim({
        sender: owner.addr,
        signer: owner.signer,
        args: { escrow, reclaims: [[0n, 1_000_000n, false]] },
        extraFee: microAlgo(1_000n),
      })
      expect(await balanceOf(escrowAddress)).toBe(escrowBefore - 1_000_000n)
      expect(await balanceOf(walletAddress)).toBe(walletBefore + 1_000_000n)
    },
    TEST_TIMEOUT,
  )
})

describe('WAL-02: the factory never adopts a schema a wallet\'s admin inflated', () => {
  test(
    'after a direct update to a small program with 64 global entries, updateWallet restores the declared schema',
    async () => {
      const { algorand, walletFactory } = deployment
      const { wallet, owner } = await createFreshAgentWallet(deployment)
      const factoryAddress = walletFactory.client.appAddress.toString()
      const ownerAddress = owner.addr.toString()
      const appParams = async () => (await algorand.client.algod.getApplicationByID(wallet.appId).do()).params!

      const created = await appParams()
      const createdPages = created.extraProgramPages ?? 0
      const createdUints = created.globalStateSchema?.numUint ?? 0
      const createdBytes = created.globalStateSchema?.numByteSlice ?? 0
      const genuineProgram = Buffer.from(created.approvalProgram).toString('hex')

      const factoryMin0 = await minBalanceOf(factoryAddress)
      const factoryBalance0 = await balanceOf(factoryAddress)
      const ownerMin0 = await minBalanceOf(ownerAddress)

      // Step 1: the admin updates the wallet directly: a small program, no extra pages, 64 global entries.
      const inflatedBytes = 64 - createdUints
      const updateMethod = wallet.client.appClient.getABIMethod('update')
      const selfUpdate = algosdk.makeApplicationCallTxnFromObject({
        sender: ownerAddress,
        appIndex: wallet.appId,
        onComplete: algosdk.OnApplicationComplete.UpdateApplicationOC,
        appArgs: [updateMethod.getSelector(), algosdk.ABIType.from('string').encode('shrunk')],
        approvalProgram: Buffer.from(ForgedWalletSpec.byteCode!.approval, 'base64'),
        clearProgram: Buffer.from(ForgedWalletSpec.byteCode!.clear, 'base64'),
        extraPages: 0,
        numGlobalInts: createdUints,
        numGlobalByteSlices: inflatedBytes,
        suggestedParams: await algorand.client.algod.getTransactionParams().do(),
      })
      await algorand.newGroup().addTransaction(selfUpdate, owner.signer).send()

      const shrunk = await appParams()
      expect(shrunk.extraProgramPages ?? 0).toBe(0)
      expect(shrunk.globalStateSchema?.numByteSlice).toBe(inflatedBytes)
      // the admin now carries the wallet's size, and the factory no longer does
      expect(await minBalanceOf(factoryAddress)).toBeLessThan(factoryMin0)
      expect(await minBalanceOf(ownerAddress)).toBeGreaterThan(ownerMin0)

      // Step 2: the factory's update. It restores the program with the schema the wallet contract declares.
      await walletFactory.client.send.updateWallet({
        sender: owner.addr,
        signer: owner.signer,
        args: { wallet: wallet.appId },
        coverAppCallInnerTransactionFees: true,
        populateAppCallResources: true,
        maxFee: microAlgo(20_000n),
      })

      const restored = await appParams()
      expect(Buffer.from(restored.approvalProgram).toString('hex')).toBe(genuineProgram)
      expect(restored.globalStateSchema?.numUint).toBe(createdUints)
      expect(restored.globalStateSchema?.numByteSlice).toBe(createdBytes)

      // The factory paid nothing out, and holds for this wallet what it held before plus any page growth.
      expect(await balanceOf(factoryAddress)).toBe(factoryBalance0)
      const pageGrowth = BigInt((restored.extraProgramPages ?? 0) - createdPages) * 100_000n
      expect((await minBalanceOf(factoryAddress)) - factoryMin0).toBe(pageGrowth)
      expect(await minBalanceOf(ownerAddress)).toBe(ownerMin0)
    },
    TEST_TIMEOUT,
  )
})

describe('WAL-03: a new wallet is created with its plugins at the quoted price', () => {
  test(
    'an external controlled address gets its plugins, and pays for their storage itself',
    async () => {
      const owner = await freshAccount(20)
      const external = await freshAccount(10)
      const externalAddress = external.addr.toString()
      const before = await balanceOf(externalAddress)

      const wallet = await createWallet(owner, {
        external,
        plugins: [{ plugin: deployment.payPlugin.appId, caller: owner.addr.toString(), delegationType: 2n, useRounds: true }],
      })

      expect(await wallet.client.state.global.controlledAddress()).toBe(externalAddress)
      const grant = await wallet.client.state.box.plugins.value({
        plugin: deployment.payPlugin.appId,
        caller: owner.addr.toString(),
        escrow: '',
      })
      expect(grant).toBeDefined()

      // the account answers to the wallet, and what the factory sent it for the grant is what the wallet charged
      const info = await deployment.algorand.account.getInformation(externalAddress)
      expect(info.authAddr?.toString()).toBe(wallet.client.appAddress.toString())
      const paid = before - (await balanceOf(externalAddress))
      // only the fee of its own rekey transaction
      expect(paid).toBeGreaterThanOrEqual(0n)
      expect(paid).toBeLessThanOrEqual(2_000n)
      // the app account holds its minimum, storage included, and the price of its registry record
      expect(await spareOf(wallet.client.appAddress.toString())).toBe(REGISTRY_PREFUND)
    },
    TEST_TIMEOUT,
  )

  test(
    'a plugin on a new escrow is priced with the escrow, and needs no extra funding',
    async () => {
      const owner = await freshAccount(20)
      const wallet = await createWallet(owner, {
        plugins: [{ plugin: deployment.payPlugin.appId, caller: owner.addr.toString(), escrow: 'savings', delegationType: 2n, useRounds: true }],
      })

      expect((await wallet.getEscrow('savings')).id).toBeGreaterThan(0n)
      expect(await wallet.getEscrowRefs('savings')).toBe(1n)
      expect(await spareOf(wallet.client.appAddress.toString())).toBe(REGISTRY_PREFUND)
    },
    TEST_TIMEOUT,
  )

  test(
    'two plugins on one new escrow pay for the escrow once, and a default escrow pays for its stored name',
    async () => {
      const owner = await freshAccount(20)
      const caller = owner.addr.toString()
      const wallet = await createWallet(owner, {
        plugins: [
          { plugin: deployment.payPlugin.appId, caller, escrow: 'savings', delegationType: 2n, useRounds: true },
          { plugin: deployment.selfOptInPlugin.appId, caller, escrow: 'savings', delegationType: 2n, useRounds: true },
          { plugin: deployment.probePlugin.appId, caller, escrow: 'vault', defaultToEscrow: true, delegationType: 2n, useRounds: true },
        ],
      })

      expect(await wallet.getEscrowRefs('savings')).toBe(2n)
      expect(await wallet.getEscrowRefs('vault')).toBe(1n)
      expect(await spareOf(wallet.client.appAddress.toString())).toBe(REGISTRY_PREFUND)
    },
    TEST_TIMEOUT,
  )
})

describe('WAL-04: a named plugin on a named escrow is charged for the whole alias box', () => {
  test(
    'the controlled address pays for the escrow name in the alias, and gets all of it back',
    async () => {
      const owner = await freshAccount(20)
      const external = await freshAccount(10)
      const externalAddress = external.addr.toString()
      const wallet = await createWallet(owner, { external })
      const appAddress = wallet.client.appAddress.toString()
      const escrow = 'a-sixteen-b-name'
      const send = { sender: owner.addr, signer: owner.signer, extraFee: microAlgo(10_000n) }

      await wallet.client.send.arc58NewEscrow({ ...send, args: { escrow, address: ZERO } })
      const spare = await spareOf(appAddress)
      const before = await balanceOf(externalAddress)

      await wallet.client.send.arc58AddNamedPlugin({
        ...send,
        args: {
          name: 'alias',
          plugin: deployment.payPlugin.appId,
          caller: owner.addr.toString(),
          escrow,
          admin: false,
          delegationType: 2n,
          lastValid: MAX_UINT64,
          cooldown: 0n,
          methods: [],
          useRounds: true,
          useExecutionKey: false,
          coverFees: false,
          canReclaim: false,
          defaultToEscrow: false,
        },
      })
      // nothing came out of the app account's own balance
      expect(await spareOf(appAddress)).toBe(spare)
      // grant box 38,900 + 16 bytes, alias box 20,500 + 5 bytes of name + 16 bytes of escrow name
      expect(before - (await balanceOf(externalAddress))).toBe(38_900n + 6_400n + 20_500n + 2_000n + 6_400n)

      await wallet.client.send.arc58RemoveNamedPlugin({ ...send, args: { name: 'alias' } })
      expect(await spareOf(appAddress)).toBe(spare)
      expect(await balanceOf(externalAddress)).toBe(before)
    },
    TEST_TIMEOUT,
  )
})

describe('WAL-08: extra funding of a wallet with an external controlled address goes to that address', () => {
  test(
    'the controlled address receives the funding and the app account keeps only its registry price',
    async () => {
      const owner = await freshAccount(20)
      const external = await freshAccount(10)
      const externalAddress = external.addr.toString()
      const extraFunding = 1_000_000n
      const before = await balanceOf(externalAddress)

      const wallet = await createWallet(owner, { external, extraFunding })

      const received = (await balanceOf(externalAddress)) - before
      // all of it, less the fee of the account's own rekey transaction
      expect(received).toBeLessThanOrEqual(extraFunding)
      expect(received).toBeGreaterThanOrEqual(extraFunding - 2_000n)
      expect(await spareOf(wallet.client.appAddress.toString())).toBe(REGISTRY_PREFUND)
    },
    TEST_TIMEOUT,
  )
})

describe('WAL-05: a frozen holding no longer keeps an escrow from being deleted', () => {
  const escrow = 'revenue'

  /** An outsider opts the escrow in to an asset of their own, sends it one unit and may freeze it. */
  async function plant(scenario: Arc58AgentWalletScenario, freeze: boolean): Promise<{ asset: bigint, escrowAddress: string }> {
    const { algorand } = deployment
    const { wallet, owner, outsider } = scenario
    const plugin = deployment.payPlugin.appId

    await addGrant(scenario, { plugin, caller: ZERO, escrow })
    const escrowAddress = (await wallet.getEscrow(escrow)).address.toString()

    const { assetId: asset } = await algorand.send.assetCreate({
      sender: outsider.addr,
      signer: outsider.signer,
      total: 10n,
      decimals: 0,
      assetName: 'junk',
      unitName: 'JUNK',
      freeze: outsider.addr.toString(),
      manager: outsider.addr.toString(),
    })

    const mbrPayment = await algorand.createTransaction.payment({
      sender: outsider.addr,
      signer: outsider.signer,
      receiver: wallet.client.appAddress,
      amount: microAlgo(100_000n),
    })
    await wallet.client.send.arc58PluginOptInEscrow({
      sender: outsider.addr,
      signer: outsider.signer,
      args: { plugin, caller: ZERO, escrow, assets: [asset], mbrPayment },
      extraFee: microAlgo(5_000n),
    })

    await algorand.send.assetTransfer({ sender: outsider.addr, signer: outsider.signer, receiver: escrowAddress, assetId: asset, amount: 1n })
    if (freeze) {
      await algorand.send.assetFreeze({ sender: outsider.addr, signer: outsider.signer, assetId: asset, account: escrowAddress, frozen: true })
    }

    await wallet.removePlugin({ sender: owner.addr, signer: owner.signer, plugin, caller: ZERO, escrow })
    expect(await wallet.getEscrowRefs(escrow)).toBe(0n)
    return { asset, escrowAddress }
  }

  const holdingOf = async (address: string, asset: bigint): Promise<bigint | undefined> =>
    (await deployment.algorand.account.getInformation(address)).assets?.find((holding) => holding.assetId === asset)?.amount

  test(
    'the admin gives the frozen holding back to its creator, and the escrow deletes',
    async () => {
      const scenario = await createFreshAgentWallet(deployment)
      const { wallet, owner, outsider } = scenario
      const { asset, escrowAddress } = await plant(scenario, true)
      const send = { sender: owner.addr, signer: owner.signer, extraFee: microAlgo(10_000n) }

      // a reclaim still never sends a holding anywhere but the wallet's account, so it fails on a frozen one
      await expect(
        wallet.client.send.arc58Reclaim({ ...send, args: { escrow, reclaims: [[asset, 0n, true]] } }),
      ).rejects.toThrow(/frozen/i)
      expect((await wallet.getEscrowTeardown(escrow)).blockers.join(' ')).toContain('closeFrozenToCreator')

      // only the admin gives a holding up
      await expectContractError(
        wallet.client.send.arc58CloseFrozenToCreator({
          sender: outsider.addr,
          signer: outsider.signer,
          extraFee: microAlgo(10_000n),
          args: { escrow, assets: [asset] },
        }),
        errForbidden,
      )

      await wallet.closeFrozenToCreator({ sender: owner.addr, signer: owner.signer, escrow, assets: [asset] })

      // the creator holds all ten units again and the escrow is out of the asset
      expect(await holdingOf(outsider.addr.toString(), asset)).toBe(10n)
      expect(await holdingOf(escrowAddress, asset)).toBeUndefined()
      expect((await wallet.getEscrowTeardown(escrow)).blockers).toEqual([])

      await wallet.client.send.arc58DeleteEscrow({ ...send, args: { escrow } })
      expect(await balanceOf(escrowAddress)).toBe(0n)
    },
    TEST_TIMEOUT,
  )

  test(
    'a holding that is not frozen is refused: a reclaim returns it to the wallet',
    async () => {
      const scenario = await createFreshAgentWallet(deployment)
      const { wallet, owner } = scenario
      const { asset, escrowAddress } = await plant(scenario, false)

      await expectContractError(
        wallet.client.send.arc58CloseFrozenToCreator({
          sender: owner.addr,
          signer: owner.signer,
          extraFee: microAlgo(10_000n),
          args: { escrow, assets: [asset] },
        }),
        errNotFrozen,
      )
      expect(await holdingOf(escrowAddress, asset)).toBe(1n)
    },
    TEST_TIMEOUT,
  )
})

describe('WAL-06: only the admin has the wallet pay for an escrow\'s registry record', () => {
  test(
    'an outsider may write the wallet\'s own record, which is paid for at creation, but not an escrow\'s',
    async () => {
      const scenario = await createFreshAgentWallet(deployment)
      const { wallet, owner, outsider } = scenario
      const walletAddress = wallet.client.appAddress.toString()
      const escrow = 'savings'
      await addGrant(scenario, { plugin: deployment.payPlugin.appId, caller: owner.addr.toString(), escrow })
      const escrowAddress = (await wallet.getEscrow(escrow)).address.toString()

      const exists = async (address: string) =>
        (await deployment.escrowFactory.send.exists({ sender: outsider.addr, signer: outsider.signer, args: { address } })).return
      expect(await exists(walletAddress)).toBe(false)
      expect(await exists(escrowAddress)).toBe(false)

      const outside = { sender: outsider.addr, signer: outsider.signer, extraFee: microAlgo(3_000n) }
      const before = await balanceOf(walletAddress)

      await expectContractError(wallet.client.send.register({ ...outside, args: { escrow } }), errAdminOnly)
      expect(await exists(escrowAddress)).toBe(false)
      expect(await balanceOf(walletAddress)).toBe(before)

      await wallet.client.send.register({ ...outside, args: { escrow: '' } })
      expect(await exists(walletAddress)).toBe(true)
      expect(before - (await balanceOf(walletAddress))).toBe(REGISTRY_PREFUND)

      await wallet.client.send.register({ sender: owner.addr, signer: owner.signer, extraFee: microAlgo(3_000n), args: { escrow } })
      expect(await exists(escrowAddress)).toBe(true)
    },
    TEST_TIMEOUT,
  )
})
