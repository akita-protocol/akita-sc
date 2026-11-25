/**
 * Principal resolution, Phase 2 compatibility for Marketplace + Listing (PHASE-0-SPEC §7.1, §7.2, §7.5:
 * P2-CMP-01, P2-REF-01, P2-REF-02).
 *
 * Baseline = the DEPLOYED programs, not the working tree. `compat/mainnet-deployed.json` holds the MainNet
 * MarketplacePlugin 3569561455, Marketplace 3569557584 and its boxed Listing child program, read from a
 * public MainNet algod. Those bytes are installed here as the "old plugin" and used to create "old
 * children" (listings without `rev`), which are then served by the upgraded singleton.
 *
 * What the deployed plugin relies on (re-derived from its bytecode):
 * - `list`/`listPrizeBox` pay a cost computed LOCALLY with the pre-audit Listing (756,500 creation MBR);
 *   the legacy shims accept it for ALGO-priced listings. The factory floats the difference, records it on
 *   the child (`factory_float`) and takes it back at settlement or delist before refunding the seller.
 * - `purchase(uint64,bool,uint64,address,byte[][])void` (no maxPrice; selector 0x269e4bb0) calls the old
 *   `gatedPurchase` selector with `Gate.mustCheck(getAccounts(wallet).origin, ...)`; the legacy shim keeps
 *   the registry origin. The working-tree SDK builds that ABI for deployed plugin ids (`legacyPurchaseAbi`).
 * - settlement referral: old (rev-absent) children NEVER pay a seller referral. Their lookup calls
 *   `EscrowFactory.get(txn Sender)` and `txn Sender` is always the factory, so the referrer is zero.
 *   Rev-3 children created through a shim carry the seller's creation-time registry referrer: that payout
 *   is new (spec §6.7 shim row), not a deployed semantic.
 */
import * as algokit from '@algorandfoundation/algokit-utils'
import { microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import type { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { sendPrepared } from 'akita-sdk'
import { ProposalAction, ProposalActionEnum } from 'akita-sdk/dao'
import { GateSDK, LogicalOperator } from 'akita-sdk/gates'
import { LEGACY_LISTING_CREATE_MBR, LISTING_CREATE_MBR } from 'akita-sdk/marketplace'
import type { PluginSDKReturn, SDKClient } from 'akita-sdk/types'
import { CallerType, MarketplacePluginSDK, newWallet, WalletSDK } from 'akita-sdk/wallet'
import algosdk, { ABIMethod, Address, ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { beforeAll, describe, expect, test } from 'vitest'
import { AkitaUniverse, buildAkitaUniverse } from '../../tests/fixtures/dao'
import { newUnregisteredWallet } from '../../tests/fixtures/unregistered-wallet'
import { expectContractError } from '../../tests/utils/errors'
import { proposeAndExecute } from '../arc58/dao/tests/utils'
import { MarketplacePluginFactory } from '../artifacts/arc58/plugins/marketplace/MarketplacePluginClient'
import { ListingFactory } from '../artifacts/marketplace/ListingClient'
import { MarketplaceFactory } from '../artifacts/marketplace/MarketplaceClient'
import { LegacyFloatReserve } from './constants'

algokit.Config.configure({ populateAppCallResources: true })

const fixture = algorandFixture()
const here = path.dirname(fileURLToPath(import.meta.url))
const ONE_DAY = 86_400n
const ZERO = ALGORAND_ZERO_ADDRESS_STRING
const uniq = (tag: string) => `${tag}-${Date.now()}-${Math.random()}`

type DeployedProgram = { appId?: string; approval: string; clear: string; approvalSha256: string; globalSchema: { ints: number; bytes: number }; extraProgramPages: number }
const deployed = JSON.parse(readFileSync(path.join(here, 'compat', 'mainnet-deployed.json'), 'utf8')) as {
  marketplacePlugin: DeployedProgram
  marketplace: DeployedProgram
  listing: DeployedProgram
}
const bytes = (b64: string) => new Uint8Array(Buffer.from(b64, 'base64'))

const PLUGIN_CREATE = ABIMethod.fromSignature('createApplication(string,uint64,uint64)void')
/** Deployed Marketplace 3569557584 ABI used to seed an old-generation factory */
const OLD_MARKETPLACE_CREATE = ABIMethod.fromSignature('create(string,string,uint64,(string,uint64))void')
const OLD_INIT_BOXED = ABIMethod.fromSignature('initBoxedContract(string,uint64)void')
const OLD_LOAD_BOXED = ABIMethod.fromSignature('loadBoxedContract(uint64,byte[])void')
/** HEAD factory `loadBoxedContract` chunk index: offset / 2032 */
const OLD_LOAD_CHUNK = 2032
/** free balance a legacy-paid list must leave in the factory (errLflt) */
const LEGACY_FLOAT_RESERVE = BigInt(LegacyFloatReserve)
/** Rewards v2 disbursement box (54,500, holds reclaimTo) minus the v1 box the deployed quote bakes in (41,700) */
const V2_DISBURSEMENT_INCREASE = 54_500n - 41_700n
/** what the factory floats for a legacy-paid (pre-audit quote) ASA listing: the creator MBR gap and the v2 increase on the prize and referral disbursements */
const LEGACY_FLOAT = LISTING_CREATE_MBR - LEGACY_LISTING_CREATE_MBR + 2n * V2_DISBURSEMENT_INCREASE
/** a legacy-paid prize box quotes one disbursement (the referral) */
const LEGACY_PRIZE_BOX_FLOAT = LISTING_CREATE_MBR - LEGACY_LISTING_CREATE_MBR + V2_DISBURSEMENT_INCREASE
/** free balance the old-generation factory starts with (below LEGACY_FLOAT + reserve) */
const FACTORY_MARGIN = 300_000n

describe('Marketplace compatibility with the deployed generation (P2-CMP-01, P2-REF-01/02)', () => {
  let algorand: algokit.AlgorandClient
  let universe: AkitaUniverse
  let deployer: TransactionSignerAccount
  let user: TransactionSignerAccount
  let buyer: TransactionSignerAccount
  /** referrer of the registered seller wallet */
  let R1: TransactionSignerAccount
  /** registered (SDK newWallet), referrer R1: the registry knows it */
  let Wr: WalletSDK
  /** registered buyer, referrer R1 (passes a legacy akita_referrer gate through the registry) */
  let Wb1: WalletSDK
  /** registered buyer with no referrer */
  let Wb0: WalletSDK
  /** never registered, referrer R1 */
  let Wu: WalletSDK
  /** the deployed plugin program, bound to the universe marketplace */
  let oldPlugin: MarketplacePluginSDK
  let newPlugin: MarketplacePluginSDK
  let asset: bigint

  const marketplace = () => universe.marketplace

  const freeBalance = async (address: string | Address): Promise<bigint> => {
    const info = await algorand.client.algod.accountInformation(address.toString()).do()
    return BigInt(info.amount) - BigInt(info.minBalance)
  }

  const appExists = async (appId: bigint): Promise<boolean> => {
    try {
      await algorand.client.algod.getApplicationByID(appId).do()
      return true
    } catch {
      return false
    }
  }

  const now = async (): Promise<bigint> => {
    const status = await algorand.client.algod.status().do()
    const block = await algorand.client.algod.block(status.lastRound).do()
    return BigInt(block.block.header.timestamp)
  }

  /** Rewards allocations held for `address` (box 'u' ‖ address ‖ itob(asset) ‖ itob(id)): where referral cuts land */
  const allocationsFor = async (address: string, assetId = 0n): Promise<bigint> => {
    const prefix = Buffer.concat([Buffer.from('u'), Buffer.from(algosdk.decodeAddress(address).publicKey), Buffer.from(algosdk.encodeUint64(assetId))])
    let sum = 0n
    for (const box of await algorand.app.getBoxNames(universe.rewards.appId)) {
      const name = Buffer.from(box.nameRaw)
      if (name.length === prefix.length + 8 && name.subarray(0, prefix.length).equals(prefix)) {
        sum += algosdk.decodeUint64(await algorand.app.getBoxValue(universe.rewards.appId, box.nameRaw), 'bigint')
      }
    }
    return sum
  }

  const createdBy = async (factory: string | Address): Promise<bigint[]> => {
    const info = await algorand.client.algod.accountInformation(factory.toString()).do()
    return (info.createdApps ?? []).map((app) => BigInt(app.id))
  }

  /** The deployed plugin program as a new app bound to `factory` (plugins are immutable: a new id per factory). */
  const deployOldPlugin = async (factory: bigint): Promise<MarketplacePluginSDK> => {
    const p = deployed.marketplacePlugin
    expect(createHash('sha256').update(bytes(p.approval)).digest('hex')).toBe(p.approvalSha256)
    const { appId } = await algorand.send.appCreateMethodCall({
      sender: deployer.addr,
      signer: deployer.signer,
      approvalProgram: bytes(p.approval),
      clearStateProgram: bytes(p.clear),
      schema: { globalInts: p.globalSchema.ints, globalByteSlices: p.globalSchema.bytes, localInts: 0, localByteSlices: 0 },
      extraProgramPages: p.extraProgramPages,
      method: PLUGIN_CREATE,
      args: ['0.0.1', factory, universe.dao.appId],
    })
    // the deployed program routes only the pre-MKT-02 `purchase` (no maxPrice); its LocalNet id is not in
    // MARKETPLACE_PLUGIN_LEGACY_PURCHASE_APP_IDS, so force the legacy ABI
    return new MarketplacePluginSDK({ algorand, factoryParams: { appId, defaultSender: deployer.addr, defaultSigner: deployer.signer }, legacyPurchaseAbi: true })
  }

  /** The working-tree plugin as a new app bound to `factory` */
  const deployNewPlugin = async (factory: bigint): Promise<MarketplacePluginSDK> => {
    const typed = algorand.client.getTypedAppFactory(MarketplacePluginFactory, { defaultSender: deployer.addr, defaultSigner: deployer.signer })
    const { appClient } = await typed.send.create.createApplication({ args: { version: '0.0.2', factory, akitaDao: universe.dao.appId } })
    return new MarketplacePluginSDK({ algorand, factoryParams: { appId: appClient.appId, defaultSender: deployer.addr, defaultSigner: deployer.signer } })
  }

  const install = async (wallet: WalletSDK, owner: TransactionSignerAccount, plugins: MarketplacePluginSDK[]) => {
    for (const client of plugins) {
      await wallet.addPlugin({ client, callerType: CallerType.Global, sender: owner.addr, signer: owner.signer })
    }
  }

  const newFundedWallet = async (owner: TransactionSignerAccount, nickname: string, referrer = ZERO, registered = true, optInToAsset = true): Promise<WalletSDK> => {
    const wallet = registered
      ? await newWallet({
        algorand,
        factoryParams: { appId: universe.walletFactory.appId, defaultSender: owner.addr, defaultSigner: owner.signer },
        sender: owner.addr,
        signer: owner.signer,
        nickname,
        referrer,
        // legacy shims read the registry referrer (legacyWalletOf); newWallet registers only on request
        register: true,
      })
      : await newUnregisteredWallet({ walletFactory: universe.walletFactory, sender: owner.addr, signer: owner.signer, referrer, nickname })
    const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n })
    await wallet.client.appClient.fundAppAccount({ amount: microAlgo(mbr.plugins * 6n + 100_000_000n), sender: owner.addr, signer: owner.signer })
    await wallet.addPlugin({ client: universe.optInPlugin, callerType: CallerType.Global, sender: owner.addr, signer: owner.signer })
    if (optInToAsset) {
      await wallet.usePlugin({ sender: owner.addr, signer: owner.signer, callerType: CallerType.Global, calls: [universe.optInPlugin.optIn({ assets: [asset] })] })
    }
    return wallet
  }

  /** `list` through `plugin` (the SDK builds the deployed ABI for the old one, the current ABI otherwise); returns the new listing id */
  const listVia = async (plugin: MarketplacePluginSDK, wallet: WalletSDK, owner: TransactionSignerAccount, factory: string | Address, price: bigint, gateId = 0n, prize = asset) => {
    const before = new Set(await createdBy(factory))
    await wallet.usePlugin({
      sender: owner.addr,
      signer: owner.signer,
      callerType: CallerType.Global,
      calls: [plugin.list({ asset: prize, assetAmount: 1n, price, paymentAsset: 0n, expiration: (await now()) + ONE_DAY * 30n, reservedFor: ZERO, gateId, marketplace: ZERO, name: '', proof: [] })],
    })
    const created = (await createdBy(factory)).filter((id) => !before.has(id))
    expect(created).toHaveLength(1)
    return created[0]
  }

  /** The deployed plugin's `purchase` (no maxPrice), built by the SDK's legacy-ABI path (`legacyPurchaseAbi`) */
  const oldPurchase = (plugin: MarketplacePluginSDK, owner: TransactionSignerAccount, appId: bigint, maxPrice: bigint, args: Uint8Array[] = []): PluginSDKReturn => {
    expect(plugin.usesLegacyPurchaseAbi()).toBe(true)
    return plugin.purchase({ sender: owner.addr, signer: owner.signer, appId, marketplace: ZERO, maxPrice, args })
  }

  const use = (wallet: WalletSDK, owner: TransactionSignerAccount, calls: PluginSDKReturn[]) =>
    wallet.usePlugin({ sender: owner.addr, signer: owner.signer, callerType: CallerType.Global, calls })

  const state = (appId: bigint) => marketplace().getListing({ appId }).state()

  beforeAll(async () => {
    await fixture.newScope()
    algorand = fixture.context.algorand
    const dispenser = await algorand.account.dispenserFromEnvironment()
    deployer = await fixture.context.generateAccount({ initialFunds: (2_000).algo() })
    user = await fixture.context.generateAccount({ initialFunds: (500).algo() })
    buyer = await fixture.context.generateAccount({ initialFunds: (500).algo() })
    R1 = await fixture.context.generateAccount({ initialFunds: (1).algo() })
    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (2_000).algo())

    universe = await buildAkitaUniverse({ fixture, sender: deployer.addr, signer: deployer.signer, apps: {} })
    newPlugin = universe.marketplacePlugin
    asset = BigInt((await algorand.send.assetCreate({
      sender: deployer.addr, signer: deployer.signer, total: 1_000_000n, decimals: 0, assetName: 'CMPtest', unitName: 'CMP',
    })).confirmation.assetIndex!)

    // legacy-payment float (runbook: DAO top-up of the factory's free balance)
    await algorand.account.ensureFunded(marketplace().client.appAddress, dispenser.addr, (20).algo())
    // opt the universe factory into the prize once (SDK list + delist)
    await algorand.send.assetOptIn({ sender: user.addr, signer: user.signer, assetId: asset })
    await algorand.send.assetTransfer({ sender: deployer.addr, signer: deployer.signer, assetId: asset, amount: 5n, receiver: user.addr })
    const warm = await marketplace().list({
      sender: user.addr, signer: user.signer, asset, amount: 1n, name: '', proof: [], price: 1_000_000n, paymentAsset: 0n,
      expiration: (await now()) + ONE_DAY, reservedFor: ZERO, gateId: 0n, marketplace: user.addr.toString(),
    })
    await marketplace().delist({ sender: user.addr, signer: user.signer, appId: warm.client.appId })
    // The deployed generation opts the DAO's revenue escrow into a prize through the factory's `optIn`, which
    // the revenue manager allows only from that escrow's registered source. On MainNet that source is the one
    // deployed factory. The second, old-generation factory created further down is not the source in this
    // universe, so the escrow is opted in here, by the factory that is. (A listing on the current factory no
    // longer does that as a side effect: audit 09, MKT-01.)
    await marketplace().optIn({ sender: deployer.addr, signer: deployer.signer, asset })
    // the escrow holds the asset now (an account that is not opted in has no holding to read)
    const revenueEscrow = algosdk.getApplicationAddress((await marketplace().client.state.global.akitaDaoEscrow())!.app)
    expect((await algorand.asset.getAccountInformation(revenueEscrow, asset)).balance).toBe(0n)

    oldPlugin = await deployOldPlugin(marketplace().appId)

    Wr = await newFundedWallet(user, 'cmp-wr', R1.addr.toString())
    Wb1 = await newFundedWallet(buyer, 'cmp-wb1', R1.addr.toString())
    Wb0 = await newFundedWallet(buyer, 'cmp-wb0')
    Wu = await newFundedWallet(user, 'cmp-wu', R1.addr.toString(), false)
    await install(Wr, user, [oldPlugin, newPlugin])
    await install(Wb1, buyer, [oldPlugin, newPlugin])
    await install(Wb0, buyer, [oldPlugin, newPlugin])
    await install(Wu, user, [newPlugin])
    for (const receiver of [Wr.client.appAddress, Wu.client.appAddress]) {
      await algorand.send.assetTransfer({ sender: deployer.addr, signer: deployer.signer, assetId: asset, amount: 20n, receiver })
    }
  })

  test('the vendored programs are the MainNet ones the spec names', () => {
    expect(deployed.marketplacePlugin.appId).toBe('3569561455')
    expect(deployed.marketplace.appId).toBe('3569557584')
    expect(deployed.listing.globalSchema).toEqual({ ints: 9, bytes: 6 })
    // pre-audit Listing: 2 pages + 9 uints + 6 bytes = the constant baked into the deployed plugin
    expect(LEGACY_LISTING_CREATE_MBR).toBe(200_000n + 9n * 28_500n + 6n * 50_000n)
  })

  describe('deployed plugin on the upgraded singleton and new (rev-3) children', () => {
    test('P2-CMP-01 / P2-REF-01: old-plugin list → legacy shim → rev-3 child with the creation-time registry referrer, paid at completion', async () => {
      const factory = marketplace().client.appAddress
      const freeBefore = await freeBalance(factory)

      const listingId = await listVia(oldPlugin, Wr, user, factory, 3_000_000n)
      const listing = await state(listingId)
      expect(listing.rev).toBe(3n)
      expect(listing.seller).toBe(Wr.client.appAddress.toString())
      expect(listing.sellerReferrer).toBe(R1.addr.toString())
      // the deployed plugin paid the pre-audit cost; the factory floats the rest while the listing lives
      expect(listing.factoryFloat).toBe(LEGACY_FLOAT)
      expect(await freeBalance(factory)).toBe(freeBefore - LEGACY_FLOAT)

      const before = await allocationsFor(R1.addr.toString())
      await use(Wb0, buyer, [oldPurchase(oldPlugin, buyer, listingId, 3_000_000n)])
      expect(await appExists(listingId)).toBe(false)
      // a NEW payout (spec §6.7 shim row; kept: Kyle decision K5, 2026-10-04): deployed children never paid it
      expect(await allocationsFor(R1.addr.toString())).toBeGreaterThan(before)
      // the referral disbursement (consumed MBR) is the seller's; the factory gets its float back exactly
      expect(await freeBalance(factory)).toBe(freeBefore)
    })

    test('P2-CMP-01 float: a legacy-paid sale with a referral to a buyer not opted in to a fresh prize leaves the factory whole', async () => {
      // consumed at settlement: referral disbursement + prize disbursement + Rewards opt-in to the fresh ASA
      // (79,800 + 79,800 + 100,000) > the float (189,600). Before the fix the factory paid min(consumed, float).
      const fresh = BigInt((await algorand.send.assetCreate({
        sender: deployer.addr, signer: deployer.signer, total: 10n, decimals: 0, assetName: uniq('CMPf').slice(0, 30), unitName: 'CMPF',
      })).confirmation.assetIndex!)
      await use(Wr, user, [universe.optInPlugin.optIn({ assets: [fresh] })])
      await algorand.send.assetTransfer({ sender: deployer.addr, signer: deployer.signer, assetId: fresh, amount: 1n, receiver: Wr.client.appAddress })
      const factory = marketplace().client.appAddress
      const float = LEGACY_FLOAT

      const listingId = await listVia(oldPlugin, Wr, user, factory, 2_000_000n, 0n, fresh)
      expect((await state(listingId)).factoryFloat).toBe(float)
      // measured after the list: the list group may also opt the factory into `fresh`
      const freeListed = await freeBalance(factory)
      const referralBefore = await allocationsFor(R1.addr.toString())

      await use(Wb0, buyer, [oldPurchase(oldPlugin, buyer, listingId, 2_000_000n)])
      expect(await appExists(listingId)).toBe(false)
      expect(await allocationsFor(R1.addr.toString())).toBeGreaterThan(referralBefore)
      // Wb0 is not opted in to `fresh`: the prize went to its Rewards inbox
      expect(await allocationsFor(Wb0.client.appAddress.toString(), fresh)).toBe(1n)
      // the float came back in full; every consumed µALGO came out of the seller's refund
      expect(await freeBalance(factory)).toBe(freeListed + float)
    })

    test('P2-CMP-01: old-plugin listPrizeBox, changePrice and delist on a rev-3 child', async () => {
      await algorand.account.ensureFunded(universe.prizeBoxFactory.client.appAddress, (await algorand.account.dispenserFromEnvironment()).addr, (10).algo())
      const box = await universe.prizeBoxFactory.mint({ sender: user.addr, signer: user.signer, owner: Wr.client.appAddress.toString() })
      const factory = marketplace().client.appAddress
      const freeBefore = await freeBalance(factory)
      const before = new Set(await createdBy(factory))
      await use(Wr, user, [oldPlugin.listPrizeBox({ prizeBox: box.client.appId, price: 2_000_000n, paymentAsset: 0n, expiration: (await now()) + ONE_DAY, reservedFor: ZERO, gateId: 0n, marketplace: ZERO })])
      const [listingId] = (await createdBy(factory)).filter((id) => !before.has(id))
      const listing = await state(listingId)
      expect(listing.rev).toBe(3n)
      expect(listing.isPrizeBox).toBeTruthy()
      expect(listing.sellerReferrer).toBe(R1.addr.toString())
      expect(listing.factoryFloat).toBe(LEGACY_PRIZE_BOX_FLOAT)
      expect(await freeBalance(factory)).toBe(freeBefore - LEGACY_PRIZE_BOX_FLOAT)

      await use(Wr, user, [oldPlugin.changePrice({ appId: listingId, price: 2_500_000n })])
      expect((await state(listingId)).price).toBe(2_500_000n)
      await use(Wr, user, [oldPlugin.delist({ appId: listingId })])
      expect(await appExists(listingId)).toBe(false)
      expect(await freeBalance(factory)).toBe(freeBefore)
    })

    test('P2-REF-02: old-plugin gated purchase uses the legacy shim (registry origin, Gate.mustCheck)', async () => {
      const gates = new GateSDK({
        algorand,
        factoryParams: { appId: universe.gate.appId, defaultSender: deployer.addr, defaultSigner: deployer.signer },
        gateRegistry: { akita_referrer: universe.subgates.akitaReferrerGate.appId },
      })
      await universe.gate.client.appClient.fundAppAccount({ amount: microAlgo(1_000_000), sender: deployer.addr, signer: deployer.signer })
      const gateId = (await gates.register({
        sender: deployer.addr,
        signer: deployer.signer,
        args: [{ type: 'akita_referrer', appId: universe.subgates.akitaReferrerGate.appId, layer: 0n, logicalOperator: LogicalOperator.None, referrer: R1.addr.toString() }],
      })).return!

      // a NEW-plugin listing from a never-registered wallet (hinted: seller_referrer from the hint)
      const listingId = await listVia(newPlugin, Wu, user, marketplace().client.appAddress, 1_000_000n, gateId)
      expect((await state(listingId)).sellerReferrer).toBe(R1.addr.toString())

      // registered buyer without that referrer: the legacy gate fails (registry lookup → no referrer)
      await expectContractError(use(Wb0, buyer, [oldPurchase(oldPlugin, buyer, listingId, 1_000_000n, [algosdk.encodeUint64(Wb0.client.appId)])]), 'errFgte')
      // registered buyer referred by R1: the deployed plugin's mustCheck(origin) passes the legacy shim
      await use(Wb1, buyer, [oldPurchase(oldPlugin, buyer, listingId, 1_000_000n, [algosdk.encodeUint64(Wb1.client.appId)])])
      expect(await appExists(listingId)).toBe(false)
    })
  })

  describe('old (pre-rev) children served by the upgraded singleton', () => {
    let oldFactory: bigint
    let oldFactoryAddress: string
    let oldGenPlugin: MarketplacePluginSDK
    let newGenPlugin: MarketplacePluginSDK
    let oldSold: bigint
    let oldDelisted: bigint
    /** an old child bought by a wallet not opted in to its prize: settlement must disburse it through Rewards */
    let oldUnopted: bigint
    let unoptedBuyer: WalletSDK

    /** One DAO UpgradeApp proposal running `calls` through the update plugin (dao.upgrade.e2e.spec.ts pattern). */
    const daoUpgrade = async (lease: string, calls: PluginSDKReturn[]) => {
      const wallet = universe.dao.wallet
      const preFund = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 4n })
      await wallet.client.appClient.fundAppAccount({ amount: microAlgo(preFund.plugins + preFund.executions + 5_000_000n), sender: deployer.addr, signer: deployer.signer })
      const execution = await wallet.build.usePlugin({
        sender: deployer.addr,
        signer: deployer.signer,
        lease,
        windowSize: 2000n,
        callerType: CallerType.Global,
        calls,
      })
      const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: BigInt(execution.windows.length) })
      await wallet.client.appClient.fundAppAccount({ amount: microAlgo(mbr.plugins + mbr.executions + 2_000_000n), sender: deployer.addr, signer: deployer.signer })
      const action: ProposalAction<SDKClient> = {
        type: ProposalActionEnum.UpgradeApp,
        app: oldFactory,
        executionKey: execution.lease,
        groups: execution.ids,
        firstValid: execution.firstValid,
        lastValid: execution.lastValid,
      }
      await proposeAndExecute(universe.dao, [action])
      for (const window of execution.windows) {
        await sendPrepared(window, algorand.client.algod)
      }
    }

    beforeAll(async () => {
      // 1. an old-generation factory: the deployed Marketplace program on the universe DAO, seeded with
      //    the deployed Listing program (HEAD semantics: the creator seeds the box while it does not exist)
      const m = deployed.marketplace
      expect(createHash('sha256').update(bytes(m.approval)).digest('hex')).toBe(m.approvalSha256)
      const escrow = (await marketplace().client.state.global.akitaDaoEscrow())!
      const created = await algorand.send.appCreateMethodCall({
        sender: deployer.addr,
        signer: deployer.signer,
        approvalProgram: bytes(m.approval),
        clearStateProgram: bytes(m.clear),
        schema: { globalInts: m.globalSchema.ints, globalByteSlices: m.globalSchema.bytes, localInts: 0, localByteSlices: 0 },
        extraProgramPages: m.extraProgramPages,
        method: OLD_MARKETPLACE_CREATE,
        args: ['0.0.2', '0.0.2', universe.dao.appId, [escrow.name, escrow.app]],
      })
      oldFactory = created.appId
      oldFactoryAddress = algosdk.getApplicationAddress(oldFactory).toString()
      // Fund only the factory's own minimums (account + the larger 'bc' box) plus a margin, so its free
      // balance stays below the legacy float + LegacyFloatReserve until the errLflt test (the old-generation
      // flows below are balance-neutral for the factory; the rev-3 box resize comes out of the margin).
      const child = bytes(deployed.listing.approval)
      const listingProgram = await algorand.client.getTypedAppFactory(ListingFactory, { defaultSender: deployer.addr }).appFactory.compile()
      const boxMbr = (size: number) => 2_500n + 400n * (2n + BigInt(size))
      const largestChild = Math.max(child.length, listingProgram.approvalProgram.length)
      await algorand.send.payment({ sender: deployer.addr, signer: deployer.signer, receiver: oldFactoryAddress, amount: microAlgo(100_000n + boxMbr(largestChild) + FACTORY_MARGIN) })

      const boxRef = { appId: oldFactory, name: new Uint8Array(Buffer.from('bc')) }
      const quota = { appId: 0n, name: new Uint8Array() }
      const seed = algorand.newGroup().addAppCallMethodCall({
        sender: deployer.addr, signer: deployer.signer, appId: oldFactory, method: OLD_INIT_BOXED, args: ['0.0.2', BigInt(child.length)],
        boxReferences: [boxRef, quota, quota, quota],
      })
      for (let offset = 0; offset < child.length; offset += OLD_LOAD_CHUNK) {
        seed.addAppCallMethodCall({
          sender: deployer.addr, signer: deployer.signer, appId: oldFactory, method: OLD_LOAD_BOXED,
          args: [BigInt(offset), child.slice(offset, offset + OLD_LOAD_CHUNK)], boxReferences: [boxRef], note: uniq('load'),
        })
      }
      await seed.send()

      // 2. old children, created by the deployed plugin through the deployed factory (no `rev`)
      oldGenPlugin = await deployOldPlugin(oldFactory)
      await install(Wr, user, [oldGenPlugin])
      oldSold = await listVia(oldGenPlugin, Wr, user, oldFactoryAddress, 2_000_000n)
      oldDelisted = await listVia(oldGenPlugin, Wr, user, oldFactoryAddress, 2_000_000n)
      oldUnopted = await listVia(oldGenPlugin, Wr, user, oldFactoryAddress, 2_000_000n)
      const rawRev = (await algorand.app.getGlobalState(oldSold)).rev
      expect(rawRev).toBeUndefined()

      // 3. DAO upgrade of that factory to the working tree, then the rev-3 Listing into its box
      const update = universe.updatePlugin
      const marketplaceProgram = await algorand.client.getTypedAppFactory(MarketplaceFactory, { defaultSender: deployer.addr }).appFactory.compile()
      await daoUpgrade(`mkt_cmp_${Date.now() % 1_000_000}`, [
        update.updateApp({ sender: deployer.addr, signer: deployer.signer, appId: oldFactory, version: '0.0.3', data: marketplaceProgram.approvalProgram }),
      ])
      await daoUpgrade(`mkt_cmp_child_${Date.now() % 1_000_000}`, [
        update.updateFactoryChildContract({ sender: deployer.addr, signer: deployer.signer, factoryAppId: oldFactory, version: '0.0.3', data: listingProgram.approvalProgram }),
      ])

      newGenPlugin = await deployNewPlugin(oldFactory)
      await install(Wr, user, [newGenPlugin])
      await install(Wb0, buyer, [newGenPlugin])
      unoptedBuyer = await newFundedWallet(buyer, 'cmp-wn', ZERO, true, false)
      await install(unoptedBuyer, buyer, [newGenPlugin])
    })

    test('P2-REF-02: the new plugin buys an old child; it is deleted and, as deployed, pays no seller referral', async () => {
      const before = await allocationsFor(R1.addr.toString())
      await use(Wb0, buyer, [newGenPlugin.purchase({ appId: oldSold, marketplace: ZERO, maxPrice: 2_000_000n, args: [] })])
      expect(await appExists(oldSold)).toBe(false)
      // the deployed child looks up EscrowFactory.get(txn Sender) and txn Sender is the factory, never the
      // seller: the seller's referrer (Wr → R1) is not paid, before or after the upgrade
      expect(await allocationsFor(R1.addr.toString())).toBe(before)
    })

    test('Rewards v2: an old child disbursing the prize to a buyer not opted in pays the v1 MBR and reverts (accepted); an opted-in buyer settles it', async () => {
      // the deployed Listing quotes 41,700 + 25,300 for the prize disbursement; Rewards v2 takes exactly 54,500 + 25,300
      await expectContractError(
        use(unoptedBuyer, buyer, [newGenPlugin.purchase({ appId: oldUnopted, marketplace: ZERO, maxPrice: 2_000_000n, args: [] })]),
        'errIpma',
      )
      expect(await appExists(oldUnopted)).toBe(true)
      await use(unoptedBuyer, buyer, [universe.optInPlugin.optIn({ assets: [asset] })])
      await use(unoptedBuyer, buyer, [newGenPlugin.purchase({ appId: oldUnopted, marketplace: ZERO, maxPrice: 2_000_000n, args: [] })])
      expect(await appExists(oldUnopted)).toBe(false)
      expect((await algorand.asset.getAccountInformation(unoptedBuyer.client.appAddress, asset)).balance).toBe(1n)
    })

    test('P2-CMP-01: the seller delists an old child through the new plugin (legacy full refund)', async () => {
      const freeBefore = await freeBalance(oldFactoryAddress)
      await use(Wr, user, [newGenPlugin.delist({ appId: oldDelisted })])
      expect(await appExists(oldDelisted)).toBe(false)
      // legacy listings refund the recorded deposit in full; the factory's free balance is unchanged
      expect(await freeBalance(oldFactoryAddress)).toBe(freeBefore)
    })

    test('errLflt: a legacy-paid list that would leave the factory below LegacyFloatReserve reverts (the next test tops it up and lists)', async () => {
      const float = LEGACY_FLOAT
      // precondition: free balance < float + reserve (beforeAll funded only minimums + FACTORY_MARGIN)
      expect(await freeBalance(oldFactoryAddress)).toBeLessThan(float + LEGACY_FLOAT_RESERVE)
      const before = new Set(await createdBy(oldFactoryAddress))
      await expectContractError(
        use(Wr, user, [oldGenPlugin.list({ asset, assetAmount: 1n, price: 1_000_000n, paymentAsset: 0n, expiration: (await now()) + ONE_DAY, reservedFor: ZERO, gateId: 0n, marketplace: ZERO, name: '', proof: [] })]),
        'errLflt',
      )
      expect(await createdBy(oldFactoryAddress)).toHaveLength(before.size)
    })

    test('P2-CMP-01: after the upgrade the deployed plugin creates rev-3 children on the same factory', async () => {
      await algorand.send.payment({ sender: deployer.addr, signer: deployer.signer, receiver: oldFactoryAddress, amount: (2).algo() })
      const freeBefore = await freeBalance(oldFactoryAddress)
      const listingId = await listVia(oldGenPlugin, Wr, user, oldFactoryAddress, 1_000_000n)
      const listing = await state(listingId)
      expect(listing.rev).toBe(3n)
      expect(listing.sellerReferrer).toBe(R1.addr.toString())
      expect(listing.factoryFloat).toBe(LEGACY_FLOAT)
      await use(Wr, user, [newGenPlugin.delist({ appId: listingId })])
      // delist consumes nothing: the float comes back and the seller gets exactly what they paid
      expect(await freeBalance(oldFactoryAddress)).toBe(freeBefore)
    })
  })
})
