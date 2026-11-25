/**
 * Principal-resolution COMPATIBILITY SUITE, LocalNet half (PHASE-0-SPEC.md §7.1 "Compatibility baseline =
 * deployed bytecode", §7.2, §7.5 P2-CMP-01, P2-SOC-01).
 *
 * Every "old" program here is created from the bytes a public MainNet algod served (read-only GET) and that
 * `fixtures/mainnet-programs.json` records; each install is checked byte for byte against the MainNet sha256
 * (`lib/install.ts`). The universe runs the working tree, i.e. the Phase 2 targets (upgraded singletons with
 * legacy shims, new children) and the Phase 3 plugins.
 *
 *   A  install fidelity: every in-scope deployed plugin generation, and each deployed factory with its
 *      MainNet `bc` child program staged byte for byte (the program every old child runs)
 *   B  old plugins on the upgraded targets (P2-CMP-01), for EVERY in-scope generation of
 *      akita-sdk/src/networks.ts MAINNET_PLUGIN_DEPLOYMENTS, with exact payment checks:
 *        social May / v0.0.2 / v0.0.3 (differential against the hinted control: the shim under-charges are
 *        exactly the documented ones), subscriptions May, staking-pool May + July, auction May, marketplace May;
 *        raffle May's enter panics on EVERY child (MainNet's included: it btoi's the uint64 `ticket_asset`), so
 *        B5 pins that pre-existing break against both a new and a MainNet-program child
 *   D  LIVE wallets: a genuine wallet running the deployed AbstractedAccount program (every MainNet wallet)
 *      resolved by the new principal helper and driven by the new (Phase 3) plugins, registry-free
 *
 * New plugins on OLD children (P2-REF-02, markers + legacy gate subjects) run in the member specs listed in
 * `members.ts` (same MainNet bytes: `compat-static.test.ts` CMP-S3), and statically in CMP-S6.
 * December-2025 plugins are out of scope (bound to the December DAO, CMP-S2).
 */
import * as algokit from '@algorandfoundation/algokit-utils'
import { microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import type { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import type { AppCallMethodCall } from '@algorandfoundation/algokit-utils/types/composer'
import { sendPrepared } from 'akita-sdk'
import { ProposalActionEnum } from 'akita-sdk/dao'
import { LEGACY_LISTING_CREATE_MBR, LISTING_CREATE_MBR } from 'akita-sdk/marketplace'
import { RefType, SocialSDK } from 'akita-sdk/social'
import type { StakingPoolSDK } from 'akita-sdk/staking-pool'
import type { PluginSDKReturn } from 'akita-sdk/types'
import {
  CallerType,
  MarketplacePluginSDK,
  newWallet,
  SocialPluginSDK,
  StakingPoolPluginSDK,
  SubscriptionsPluginSDK,
  WalletSDK,
} from 'akita-sdk/wallet'
import algosdk, { ABIMethod, ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import { beforeAll, describe, expect, test } from 'vitest'
import { MockPrincipalProbeClient, MockPrincipalProbeFactory } from '../../smart_contracts/artifacts/mocks/principal-probe/MockPrincipalProbeClient'
import { MockLegacySocialPosterFactory } from '../../smart_contracts/artifacts/mocks/legacy-social-poster/MockLegacySocialPosterClient'
import { TestPrincipalPluginClient, TestPrincipalPluginFactory } from '../../smart_contracts/artifacts/mocks/principal-plugin/TestPrincipalPluginClient'
import { RaffleClient } from '../../smart_contracts/artifacts/raffle/RaffleClient'
import { RaffleFactoryClient } from '../../smart_contracts/artifacts/raffle/RaffleFactoryClient'
import { MockRandomnessBeaconFactory } from '../../smart_contracts/artifacts/utils/types/MockRandomnessBeaconClient'
import { DEPLOYED_NEW_RAFFLE, deployedRaffleCost, deployLegacyRaffleFactory } from '../../smart_contracts/raffle/compat/deployed'
import { APP_SPEC as WALLET_SPEC } from '../../smart_contracts/artifacts/arc58/account/AbstractedAccountClient'
import { clearProgramSize, fundWalletGrowth, readWalletGrowth, walletUpdateParams } from '../../scripts/lib/wallet-page-growth'
import { AkitaUniverse, buildAkitaUniverse } from '../fixtures/dao'
import { addRawPlugin, assertUnregistered, newUnregisteredWallet } from '../fixtures/unregistered-wallet'
import { inScopePlugins } from './lib/analysis'
import {
  allocationsFor,
  assertRunsDeployed,
  balanceOf,
  freeBalance,
  installDeployed,
  pluginCreateArgs,
} from './lib/install'
import { approvalBytes, clearBytes, program, selectorOf } from './lib/snapshot'
import { sha256Hex } from './lib/teal-facts'

algokit.Config.configure({ populateAppCallResources: true })

const fixture = algorandFixture()
const ZERO = ALGORAND_ZERO_ADDRESS_STRING
const ZERO_KEY = { address: ZERO, name: '' }
const ONE_DAY = 86_400n
const FEE = microAlgo(40_000)
const EMPTY_CID = new Uint8Array(36).fill(120)
/** The DEPLOYED wallet factory's creation method (MainNet 3569556257; no automaticUpdates, no controlledSigner rekey). */
const MAINNET_NEW_ACCOUNT = 'newAccount(pay,address,address,string,address,byte[32],string,uint64,uint64[],(uint64,address,string,bool,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,bool)[])uint64'

/**
 * Documented shim under-charges, legacy terms minus hinted terms, per call (IMPLEMENTATION-LOG, social track
 * review fixes, finding 1): MinPostsMBR 47,300 vs the deployed 46,500; no reply parent-ref (12,800); a
 * materialized vote ref without the votes box (19,300); the 18,900 reaction record vs 15,700 (the app keeps
 * 3,200). Applies to an unreferred sender (no referral MBR on either path).
 */
const SOCIAL_LEGACY_DELTA = { post: -800n, reply: -13_600n, vote: 0n, ref: -20_100n, react: 3_200n } as const
type SocialDeltas = Record<keyof typeof SOCIAL_LEGACY_DELTA, bigint>

/** The in-scope social generations (MAINNET_PLUGIN_DEPLOYMENTS.socialPlugin minus December). */
const SOCIAL_GENERATIONS = ['SocialPlugin.may', 'SocialPlugin.v0.0.2', 'SocialPlugin.v0.0.3'] as const

type Principal = { wallet: bigint; principal: string; origin: string; spender: string; referrer: string; viaPlugin: boolean }
function asPrincipal(value: unknown): Principal {
  if (Array.isArray(value)) {
    const [wallet, principal, origin, spender, referrer, viaPlugin] = value as [bigint, string, string, string, string, boolean]
    return { wallet: BigInt(wallet), principal: String(principal), origin: String(origin), spender: String(spender), referrer: String(referrer), viaPlugin: Boolean(viaPlugin) }
  }
  const v = value as Principal
  return { wallet: BigInt(v.wallet), principal: String(v.principal), origin: String(v.origin), spender: String(v.spender), referrer: String(v.referrer), viaPlugin: Boolean(v.viaPlugin) }
}

describe('Compatibility suite: deployed MainNet programs against the Phase 2/3 tree (P2-CMP-01)', () => {
  let algorand: algokit.AlgorandClient
  let universe: AkitaUniverse
  let deployer: TransactionSignerAccount
  let user: TransactionSignerAccount
  let dispenser: Awaited<ReturnType<algokit.AlgorandClient['account']['dispenserFromEnvironment']>>

  const send = (a: TransactionSignerAccount) => ({ sender: a.addr, signer: a.signer })
  const addr = (w: WalletSDK) => w.client.appAddress.toString()
  const dao = () => universe.dao.appId

  const blockTimestamp = async (): Promise<bigint> => {
    const status = await algorand.client.algod.status().do()
    return BigInt((await algorand.client.algod.block(status.lastRound).do()).block.header.timestamp)
  }

  const createdBy = async (creator: string | algosdk.Address): Promise<Set<bigint>> => {
    const info = await algorand.client.algod.accountInformation(creator.toString()).do()
    return new Set((info.createdApps ?? []).map((app) => BigInt(app.id)))
  }

  const appExists = async (appId: bigint): Promise<boolean> =>
    algorand.client.algod.getApplicationByID(appId).do().then(() => true, () => false)

  /** A wallet as live MainNet wallets are: created through the SDK and REGISTERED in the EscrowFactory. */
  const registeredWallet = async (nickname: string, referrer?: string, fund = 100n): Promise<WalletSDK> => {
    const w = await newWallet({
      algorand,
      factoryParams: { appId: universe.walletFactory.appId, defaultSender: deployer.addr, defaultSigner: deployer.signer },
      ...send(deployer),
      nickname,
      ...(referrer ? { referrer } : {}),
      // legacy shims resolve referrals, gate origins and initMeta wallets through the registry (legacyWalletOf)
      register: true,
    })
    await algorand.send.payment({ ...send(deployer), receiver: w.client.appAddress, amount: (Number(fund)).algo() })
    return w
  }

  /** [wallet.arc58_rekeyToPlugin(pluginId), ...calls, wallet.arc58_verifyAuthAddress] under a global grant */
  async function inWindow(wallet: WalletSDK, pluginId: bigint, calls: AppCallMethodCall[], escrow = ''): Promise<unknown[]> {
    const group = algorand.newGroup()
    group.addAppCallMethodCall(await wallet.client.params.arc58RekeyToPlugin({
      ...send(deployer),
      args: { plugin: pluginId, type: CallerType.Global, escrow, methodOffsets: [], fundsRequest: [] },
      extraFee: microAlgo(2_000),
    }))
    for (const call of calls) group.addAppCallMethodCall(call)
    group.addAppCallMethodCall(await wallet.client.params.arc58VerifyAuthAddress({ ...send(deployer), args: {} }))
    const result = await group.send({ populateAppCallResources: true })
    return (result.returns ?? []).slice(1, 1 + calls.length).map((r) => r.returnValue)
  }

  /** A raw ABI call to a deployed plugin (its ABI is read from its router, `fixtures/signature-catalog.json`). */
  const rawCall = (appId: bigint, signature: string, args: unknown[]): AppCallMethodCall => ({
    ...send(deployer),
    appId,
    method: ABIMethod.fromSignature(signature),
    args: args as never,
    extraFee: FEE,
  })

  beforeAll(async () => {
    await fixture.newScope()
    algorand = fixture.context.algorand
    dispenser = await algorand.account.dispenserFromEnvironment()
    deployer = await fixture.context.generateAccount({ initialFunds: (10).algo() })
    user = await fixture.context.generateAccount({ initialFunds: (500).algo() })
    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (6_000).algo())

    // a randomness beacon stand-in lets the universe deploy the raffle stack
    const { appClient: beacon } = await algorand.client.getTypedAppFactory(MockRandomnessBeaconFactory, {
      defaultSender: deployer.addr, defaultSigner: deployer.signer,
    }).send.create.bare()
    universe = await buildAkitaUniverse({ fixture, sender: deployer.addr, signer: deployer.signer, apps: { vrfBeacon: beacon.appId } })
  }, 900_000)

  // ───────────────────────────────────────────────────────────────────────────────────────────────
  describe('A. install fidelity: the old generation runs the MainNet bytes', () => {
    const factoryOf: Record<string, () => bigint | undefined> = {
      social: () => undefined,
      subscriptions: () => undefined,
      stakingPool: () => universe.stakingPoolFactory.appId,
      auction: () => universe.auctionFactory.appId,
      raffle: () => universe.raffleFactory.appId,
      marketplace: () => universe.marketplace.appId,
    }

    test.each(inScopePlugins().map((p) => [p.key, p.family]))('%s installs from its MainNet program, byte for byte', async (key, family) => {
      const appId = await installDeployed(algorand, key, send(deployer), pluginCreateArgs(key, { dao: dao(), factory: factoryOf[family]() }))
      const app = await algorand.app.getById(appId)
      expect(sha256Hex(app.approvalProgram)).toBe(program(key).approvalSha256)
      expect(app.extraProgramPages).toBe(program(key).extraProgramPages)
      expect(app.globalInts).toBe(program(key).globalSchema!.ints)
      expect(app.globalByteSlices).toBe(program(key).globalSchema!.bytes)
    })

    /** Deployed factory + its MainNet `bc` child: an old-generation factory that creates OLD children. */
    test.each([
      ['AuctionFactory', 'Auction', () => universe.auctionFactory.client.state.global.akitaDaoEscrow()],
      ['RaffleFactory', 'Raffle', () => universe.raffleFactory.client.state.global.akitaDaoEscrow()],
      ['StakingPoolFactory', 'StakingPool', () => universe.stakingPoolFactory.client.state.global.akitaDaoEscrow()],
      ['Marketplace', 'Listing', () => universe.marketplace.client.state.global.akitaDaoEscrow()],
    ] as const)('%s installs from MainNet and stages the MainNet %s program byte for byte', async (factoryKey, childKey, escrowOf) => {
      const escrow = (await escrowOf())!
      const appId = await installDeployed(algorand, factoryKey, send(deployer), [`mainnet-${factoryKey}`, `mainnet-${childKey}`, dao(), [escrow.name, escrow.app]])
      const child = approvalBytes(childKey)
      const appAddress = algosdk.getApplicationAddress(appId)
      await algorand.send.payment({ ...send(deployer), receiver: appAddress, amount: microAlgo(100_000n + 2_500n + 400n * (2n + BigInt(child.length))) })

      // the deployed factories' loader: initBoxedContract then loadBoxedContract(offset, ≤ 2,032 bytes) in one group
      const group = algorand.newGroup()
      group.addAppCallMethodCall({ ...send(deployer), appId, method: ABIMethod.fromSignature('initBoxedContract(string,uint64)void'), args: [`mainnet-${childKey}`, BigInt(child.length)] })
      for (let offset = 0; offset < child.length; offset += 2_032) {
        group.addAppCallMethodCall({
          ...send(deployer), appId, method: ABIMethod.fromSignature('loadBoxedContract(uint64,byte[])void'),
          args: [BigInt(offset), child.slice(offset, offset + 2_032)],
        })
      }
      await group.send({ populateAppCallResources: true })

      const staged = await algorand.app.getBoxValue(appId, new Uint8Array(Buffer.from('bc')))
      expect(sha256Hex(staged)).toBe(program(childKey).approvalSha256)
    })
  })

  // ───────────────────────────────────────────────────────────────────────────────────────────────
  describe('B1. social: every in-scope generation on the upgraded AkitaSocial (P2-SOC-01), exact against the hinted control', () => {
    let posterSdk: SocialSDK
    let akta: bigint
    let postFee: bigint
    let reactFee: bigint
    let control: SocialDeltas
    let seed = 1
    const bytes = (length: number) => new Uint8Array(length).fill(seed++ % 250)
    const socialFree = () => freeBalance(algorand, universe.social.socialClient.appAddress)

    const measure = async (fn: () => Promise<unknown>): Promise<bigint> => {
      const before = await socialFree()
      await fn()
      return (await socialFree()) - before
    }

    const use = (w: WalletSDK, call: PluginSDKReturn) => w.usePlugin({ ...send(deployer), callerType: CallerType.Global, calls: [call] })

    /** A social actor: AKTA for fees, an NFT to react with, the self-opt-in plugin and `client` installed. */
    const actor = async (w: WalletSDK, client: SocialPluginSDK): Promise<bigint> => {
      await w.addPlugin({ ...send(deployer), client, callerType: CallerType.Global })
      await w.addPlugin({ ...send(deployer), client: universe.selfOptInPlugin, callerType: CallerType.Global })
      const nft = BigInt((await algorand.send.assetCreate({ ...send(deployer), total: 1n, decimals: 0, assetName: 'Compat NFT', unitName: 'CNFT' })).confirmation.assetIndex!)
      await w.usePlugin({ ...send(deployer), callerType: CallerType.Global, calls: [universe.selfOptInPlugin.optIn({ assets: [akta, nft] })] })
      await algorand.send.assetTransfer({ ...send(deployer), receiver: addr(w), assetId: akta, amount: postFee * 20n + reactFee * 40n })
      await algorand.send.assetTransfer({ ...send(deployer), receiver: addr(w), assetId: nft, amount: 1n })
      return nft
    }

    /** initMeta, then post / reply / up-vote / vote materializing an address ref / react, each measured. */
    const runFlows = async (w: WalletSDK, client: SocialPluginSDK, nft: bigint): Promise<SocialDeltas> => {
      await use(w, client.initMeta({ user: addr(w), automated: false, subscriptionIndex: 0n, nfd: 0n, akitaNft: 0n }))
      const post = await measure(async () => use(w, client.post({
        timestamp: await blockTimestamp(), nonce: bytes(24), cid: bytes(36), gateId: 0n, usePayWall: false, payWallId: 0n, creatorFlags: 0n,
      })))
      const parentReply = (await posterSdk.post({ cid: bytes(36) })).postKey
      const reply = await measure(async () => use(w, client.reply({
        timestamp: await blockTimestamp(), nonce: bytes(24), cid: bytes(36), ref: parentReply, type: RefType.Post,
        gateId: 0n, usePayWall: false, payWallId: 0n, creatorFlags: 0n,
      })))
      const parentVote = (await posterSdk.post({ cid: bytes(36) })).postKey
      const vote = await measure(() => use(w, client.vote({ ref: parentVote, type: RefType.Post, isUp: true })))
      const fresh = algorand.account.random().addr.publicKey
      const ref = await measure(() => use(w, client.vote({ ref: fresh, type: RefType.Address, isUp: false })))
      const parentReact = (await posterSdk.post({ cid: bytes(36) })).postKey
      const react = await measure(() => use(w, client.react({ ref: parentReact, type: RefType.Post, nft })))
      return { post, reply, vote, ref, react }
    }

    beforeAll(async () => {
      akta = universe.aktaAssetId
      try {
        await universe.social.init()
      } catch {
        // already opted in by the universe
      }
      ;({ postFee, reactFee } = await universe.social.getSocialFees())

      const poster = await fixture.context.generateAccount({ initialFunds: (100).algo() })
      await algorand.send.assetOptIn({ ...send(poster), assetId: akta })
      await algorand.send.assetTransfer({ ...send(deployer), receiver: poster.addr, assetId: akta, amount: postFee * 50n })
      posterSdk = new SocialSDK({
        algorand,
        daoAppId: dao(),
        socialFactoryParams: { appId: universe.social.socialAppId, defaultSender: poster.addr, defaultSigner: poster.signer },
        graphFactoryParams: { appId: universe.social.graphAppId, defaultSender: poster.addr, defaultSigner: poster.signer },
        impactFactoryParams: { appId: universe.social.impactAppId, defaultSender: poster.addr, defaultSigner: poster.signer },
        moderationFactoryParams: { appId: universe.social.moderationAppId, defaultSender: poster.addr, defaultSigner: poster.signer },
      })
      await posterSdk.initMeta({})

      // hinted control: an unregistered, unreferred wallet on the NEW plugin (Phase 3 terms, exact charges)
      const Wh = await newUnregisteredWallet({ walletFactory: universe.walletFactory, ...send(deployer), nickname: 'compat-social-hinted', fund: (100).algo() })
      control = await runFlows(Wh, universe.socialPlugin, await actor(Wh, universe.socialPlugin))
    }, 600_000)

    test.each(SOCIAL_GENERATIONS.map((k) => [k]))('%s: initMeta/post/reply/vote/ref/react pass and differ from the hinted path by exactly the documented under-charges', async (key) => {
      const appId = await installDeployed(algorand, key, send(deployer), pluginCreateArgs(key, { dao: dao() }))
      const client = new SocialPluginSDK({ algorand, factoryParams: { appId, defaultSender: deployer.addr, defaultSigner: deployer.signer } })
      const W = await registeredWallet(`compat-${key}`)
      const deltas = await runFlows(W, client, await actor(W, client))

      // legacy initMeta stores the registry wallet (the wallet is registered, as MainNet wallets are)
      expect((await posterSdk.getMeta({ user: addr(W) })).wallet).toBe(W.client.appId)
      for (const step of Object.keys(SOCIAL_LEGACY_DELTA) as (keyof SocialDeltas)[]) {
        expect({ step, delta: deltas[step] - control[step] }).toEqual({ step, delta: SOCIAL_LEGACY_DELTA[step] })
      }
    })

    // Disassembly of SocialPlugin.v0.0.2 (fixtures/mainnet-programs.json): its MBR quote calls EscrowFactory
    // get(address)byte[] (0x3c1a6f33) on `txn Sender` -- the plugin call's sender, i.e. the wallet's CALLER -- and adds
    // 67,000 (+ AssetOptInMinBalance when Rewards lacks the asset) only if THAT registry wallet has a referrer. The
    // deployed AkitaSocial (a3de927c, sha-equal to MainNet) charges `referralFee(dao, akta)` for ITS Txn.sender, the
    // wallet's spending address. A caller is normally an EOA, never registered (the registry holds wallet app accounts
    // and escrows), so for a referred wallet v0.0.2 under-quotes by the referral MBR (pinned to exactly that amount by the
    // next test) and the post would revert on MainNet. That is read from the bytecode, not observed: MainNet indexer
    // (2026-10-04) shows one transaction ever on v0.0.2 (3633295088), its creation, so no post went through it. The
    // legacy shim keeps the deployed charge (`feeReferrer(legacy)` = registry referrer of Txn.sender), so the same
    // revert is expected here: pre-existing, not a Phase 2 regression (an unreferred wallet passes, above).
    test('v0.0.2 quotes the registry referral MBR for its CALLER (get(txn Sender)), not the wallet: a REFERRED wallet\'s post reverts errIpay, as on the deployed AkitaSocial', async () => {
      expect(program('SocialPlugin.v0.0.2').facts.ints).toContain('67000')
      expect(program('SocialPlugin.v0.0.2').facts.calls).toContain(selectorOf('get(address)byte[]'))
      const R = (await fixture.context.generateAccount({ initialFunds: (1).algo() })).addr.toString()
      const appId = await installDeployed(algorand, 'SocialPlugin.v0.0.2', send(deployer), pluginCreateArgs('SocialPlugin.v0.0.2', { dao: dao() }))
      const client = new SocialPluginSDK({ algorand, factoryParams: { appId, defaultSender: deployer.addr, defaultSigner: deployer.signer } })
      const W = await registeredWallet('compat-v002-referred', R)
      await actor(W, client)
      await use(W, client.initMeta({ user: addr(W), automated: false, subscriptionIndex: 0n, nfd: 0n, akitaNft: 0n }))
      const before = await allocationsFor(algorand, universe.rewards.appId, R, akta)
      const free = await socialFree()
      await expect(use(W, client.post({ timestamp: await blockTimestamp(), nonce: bytes(24), cid: bytes(36), gateId: 0n, usePayWall: false, payWallId: 0n, creatorFlags: 0n })))
        .rejects.toThrow(/ERR:errIpay/)
      expect(await allocationsFor(algorand, universe.rewards.appId, R, akta)).toBe(before)
      expect(await socialFree()).toBe(free)
    })

    // The revert above alone does not show HOW MUCH v0.0.2 under-pays. A shim that over-charged referred wallets
    // (a double referral term, a wrong amount) would revert the same way. This pins the shortfall: v0.0.2's own
    // quote Q (read from a passing unreferred post; its referral term is 0 for any EOA caller and its cid is fixed
    // at 36 bytes, so Q is the same for every EOA-called post) is sent for the REFERRED wallet through a test-only
    // plugin that calls the same legacy `post` selector (0x8e507f1b) with a chosen payment. The shim's payment
    // check is an exact `match`, so: Q and Q + term - 1 revert errIpay, Q + term passes, where term is the
    // referral disbursement MBR 79,800 (Rewards v2 MinDisbursementsMBR 54,500, which holds reclaimTo, + UserAllocationMBR 25,300)
    // plus AssetOptInMinBalance only when Rewards does not hold AKTA. The passing post pays the referrer and leaves
    // AkitaSocial with the same free-balance delta as the unreferred v0.0.2 post (the MBR is covered, nothing more).
    test('v0.0.2 under-pays a REFERRED wallet\'s post by EXACTLY the referral MBR (79,800 at Rewards v2 + opt-in if needed): the legacy post with Q + term passes, Q + term - 1 reverts', async () => {
      expect(program('SocialPlugin.v0.0.2').facts.calls).toContain(selectorOf('post(pay,axfer,uint64,byte[24],byte[36],uint64,bool,uint64,uint64)void'))
      const appId = await installDeployed(algorand, 'SocialPlugin.v0.0.2', send(deployer), pluginCreateArgs('SocialPlugin.v0.0.2', { dao: dao() }))
      const client = new SocialPluginSDK({ algorand, factoryParams: { appId, defaultSender: deployer.addr, defaultSigner: deployer.signer } })
      const socialAddress = universe.social.socialClient.appAddress.toString()
      const postArgs = async () => ({ timestamp: await blockTimestamp(), nonce: bytes(24), cid: bytes(36), gateId: 0n, usePayWall: false, payWallId: 0n, creatorFlags: 0n })

      // Q: the payment v0.0.2 itself sends to AkitaSocial for an unreferred wallet's post
      const U = await registeredWallet('compat-v002-quote')
      await actor(U, client)
      await use(U, client.initMeta({ user: addr(U), automated: false, subscriptionIndex: 0n, nfd: 0n, akitaNft: 0n }))
      const freeU = await socialFree()
      const result = await use(U, client.post(await postArgs()))
      const unreferredDelta = (await socialFree()) - freeU
      const toSocial: bigint[] = []
      const walk = (c: algosdk.modelsv2.PendingTransactionResponse) => {
        const t = c.txn.txn
        if (t.type === algosdk.TransactionType.pay && t.payment!.receiver.toString() === socialAddress) toSocial.push(t.payment!.amount)
        for (const inner of c.innerTxns ?? []) walk(inner)
      }
      for (const c of result.confirmations) walk(c)
      expect(toSocial).toHaveLength(1)
      const Q = toSocial[0]

      // the referred wallet, with the test-only legacy poster installed next to v0.0.2
      const { appClient: poster } = await algorand.client.getTypedAppFactory(MockLegacySocialPosterFactory, {
        defaultSender: deployer.addr, defaultSigner: deployer.signer,
      }).send.create.bare()
      const R = (await fixture.context.generateAccount({ initialFunds: (1).algo() })).addr.toString()
      const W = await registeredWallet('compat-v002-exact', R)
      await actor(W, client)
      await use(W, client.initMeta({ user: addr(W), automated: false, subscriptionIndex: 0n, nfd: 0n, akitaNft: 0n }))
      await addRawPlugin(W, { plugin: poster.appId }, send(deployer))
      const postVia = async (mbr: bigint) => {
        const { timestamp, nonce, cid } = await postArgs()
        return inWindow(W, poster.appId, [await poster.params.post({
          ...send(deployer),
          args: { wallet: W.client.appId, rekeyBack: true, social: universe.social.socialAppId, akta, tip: postFee, mbr, timestamp, nonce, cid },
          extraFee: FEE,
        })])
      }

      // the poster reproduces v0.0.2's failure for the referred wallet with v0.0.2's own quote
      await expect(postVia(Q)).rejects.toThrow(/ERR:errIpay/)

      const rewardsHoldsAkta = await algorand.client.algod
        .accountAssetInformation(algosdk.getApplicationAddress(universe.rewards.appId).toString(), Number(akta)).do()
        .then(() => true, () => false)
      // the referral MBR the deployed plugin omits: one Rewards v2 disbursement, 54,500 (the record with its
      // reclaimTo field) + 25,300; v1's 67,000 is 12,800 short
      const referralMbr = 54_500n + 25_300n
      const term = referralMbr + (rewardsHoldsAkta ? 0n : 100_000n)
      console.info(`[B1 exact] v0.0.2 quote Q=${Q} referral term=${term} (Rewards holds AKTA: ${rewardsHoldsAkta}) unreferred AkitaSocial free delta=${unreferredDelta}`)
      await expect(postVia(Q + term - 1n)).rejects.toThrow(/ERR:errIpay/)

      const before = await allocationsFor(algorand, universe.rewards.appId, R, akta)
      const free = await socialFree()
      await postVia(Q + term)
      expect(await allocationsFor(algorand, universe.rewards.appId, R, akta)).toBeGreaterThan(before)
      expect((await socialFree()) - free).toBe(unreferredDelta)

      // Rewards now holds AKTA (as on MainNet): the shortfall is exactly the referral MBR
      expect(await algorand.client.algod
        .accountAssetInformation(algosdk.getApplicationAddress(universe.rewards.appId).toString(), Number(akta)).do()
        .then(() => true, () => false)).toBe(true)
      await expect(postVia(Q + referralMbr - 1n)).rejects.toThrow(/ERR:errIpay/)
      const before2 = await allocationsFor(algorand, universe.rewards.appId, R, akta)
      const free2 = await socialFree()
      await postVia(Q + referralMbr)
      expect(await allocationsFor(algorand, universe.rewards.appId, R, akta)).toBeGreaterThan(before2)
      expect((await socialFree()) - free2).toBe(unreferredDelta)
    })

    test('v0.0.2 quotes amendment + back-ref (26,400 = AmendmentMBR + EditBackRefMBR), so its editPost passes through the shim', async () => {
      expect(program('SocialPlugin.v0.0.2').facts.ints).toContain('26400')
      const appId = await installDeployed(algorand, 'SocialPlugin.v0.0.2', send(deployer), pluginCreateArgs('SocialPlugin.v0.0.2', { dao: dao() }))
      const client = new SocialPluginSDK({ algorand, factoryParams: { appId, defaultSender: deployer.addr, defaultSigner: deployer.signer } })
      const W = await registeredWallet('compat-v002-edit')
      await actor(W, client)
      await use(W, client.initMeta({ user: addr(W), automated: false, subscriptionIndex: 0n, nfd: 0n, akitaNft: 0n }))
      const timestamp = await blockTimestamp()
      const nonce = bytes(24)
      await use(W, client.post({ timestamp, nonce, cid: bytes(36), gateId: 0n, usePayWall: false, payWallId: 0n, creatorFlags: 0n }))
      const original = posterSdk.computePostKey(addr(W), timestamp, nonce)
      await use(W, client.editPost({ cid: bytes(36), amendment: original, creatorFlags: 0n }))
      // the original now points at an amendment (the edit created a new post box keyed off the original)
      expect((await posterSdk.getPost({ ref: original })).creator).toBe(addr(W))
    })
  })

  // ───────────────────────────────────────────────────────────────────────────────────────────────
  describe('B2. subscriptions: the May 2026 plugin on the upgraded singleton', () => {
    const AMOUNT = 100_000n
    const INTERVAL = 3_600n

    test('ungated subscribe goes through the legacy shims and charges exactly amount + the legacy newSubscriptionCost quote', async () => {
      // newService charges the DAO's 100 ALGO service creation fee (DEFAULT_SERVICE_CREATION_FEE) plus box MBR
      const merchant = await fixture.context.generateAccount({ initialFunds: (200).algo() })
      const serviceId = await universe.subscriptions.newService({
        sender: merchant.addr.toString(), signer: merchant.signer, interval: INTERVAL, asset: 0n, amount: AMOUNT, passes: 0n, gateId: 0n,
        payoutAddress: merchant.addr.toString(), title: 'compat', description: 'compat', bannerImage: EMPTY_CID, highlightMessage: 0, highlightColor: '#445566',
      })
      const appId = await installDeployed(algorand, 'SubscriptionsPlugin.may', send(deployer), pluginCreateArgs('SubscriptionsPlugin.may', { dao: dao() }))
      await algorand.send.payment({ ...send(deployer), receiver: algosdk.getApplicationAddress(appId), amount: microAlgo(10_000_000) })
      const plugin = new SubscriptionsPluginSDK({ algorand, factoryParams: { appId, defaultSender: deployer.addr, defaultSigner: deployer.signer } })
      const W = await registeredWallet('compat-subs')
      await W.addPlugin({ ...send(deployer), client: plugin, callerType: CallerType.Global })

      // the deployed plugin quotes the pre-hint selector inside the window (sender = W.address, unreferred);
      // a top-level quote from another unreferred sender gives the same number
      const quote = await universe.subscriptions.newSubscriptionCost({
        sender: deployer.addr.toString(), recipient: merchant.addr.toString(), asset: 0n, serviceId, legacy: true,
      })
      const before = await balanceOf(algorand, addr(W))
      await W.usePlugin({ ...send(deployer), callerType: CallerType.Global, calls: [plugin.subscribe({ recipient: merchant.addr.toString(), amount: AMOUNT, interval: INTERVAL, index: serviceId })] })
      expect(before - (await balanceOf(algorand, addr(W)))).toBe(AMOUNT + quote)
      const id = (await universe.subscriptions.getSubscriptionList({ address: addr(W) })) - 1n
      // a legacy subscribe stores no principal pair
      expect(await universe.subscriptions.getStoredPrincipal({ address: addr(W), id })).toBeUndefined()
    })
  })

  // ───────────────────────────────────────────────────────────────────────────────────────────────
  describe('B3. staking pool: the May and July plugins on NEW children (pv marker present)', () => {
    let W: WalletSDK

    const livePool = async (): Promise<StakingPoolSDK> => {
      const pool = await universe.stakingPoolFactory.new({
        ...send(deployer), title: `compat pool ${Date.now()}`, type: 0, marketplace: deployer.addr.toString(), stakeKey: ZERO_KEY,
        minimumStakeAmount: 0n, allowLateSignups: true, gateId: 0n, maxEntries: 0n,
      })
      await algorand.send.payment({ ...send(deployer), receiver: pool.client.appAddress, amount: microAlgo(1_000_000) })
      await pool.finalize({ ...send(deployer), signupTimestamp: 0n, startTimestamp: 0n, endTimestamp: (await blockTimestamp()) + ONE_DAY })
      expect(await pool.isHintedPool()).toBe(true)
      return pool
    }

    const entryOf = async (pool: StakingPoolSDK, address: string) => {
      const id = await pool.client.state.box.entriesByAddress.value({ address, asset: 0n })
      return (await pool.client.state.box.entries.value(id!))!
    }

    const deployed = async (key: 'StakingPoolPlugin.may' | 'StakingPoolPlugin.july') => {
      const appId = await installDeployed(algorand, key, send(deployer), pluginCreateArgs(key, { dao: dao(), factory: universe.stakingPoolFactory.appId }))
      return new StakingPoolPluginSDK({ algorand, factoryParams: { appId, defaultSender: deployer.addr, defaultSigner: deployer.signer } })
    }

    const enter = (plugin: StakingPoolPluginSDK, pool: StakingPoolSDK) => W.usePlugin({
      ...send(deployer), callerType: CallerType.Global, calls: [plugin.enter({ appId: pool.appId, entries: [[0n, 1n, []]], args: [] })],
    })

    beforeAll(async () => {
      W = await registeredWallet('compat-staking')
    })

    test('July (quotes the deployed enterCost selector): charged exactly the quote, exact formula', async () => {
      const plugin = await deployed('StakingPoolPlugin.july')
      await W.addPlugin({ ...send(deployer), client: plugin, callerType: CallerType.Global })
      const pool = await livePool()
      const quote = await pool.enterCost({ address: addr(W), assets: [0n], legacy: true })
      const before = await balanceOf(algorand, addr(W))
      await enter(plugin, pool)
      expect(before - (await balanceOf(algorand, addr(W)))).toBe(quote)
      expect((await entryOf(pool, addr(W))).legacyCharged).toBe(false)
    })

    test('May (hard-codes 50,600 per entry + 18,900 first entry, no quote): the flat charge is accepted and flagged', async () => {
      const plugin = await deployed('StakingPoolPlugin.may')
      await W.addPlugin({ ...send(deployer), client: plugin, callerType: CallerType.Global })
      const pool = await livePool()
      const before = await balanceOf(algorand, addr(W))
      await enter(plugin, pool)
      expect(before - (await balanceOf(algorand, addr(W)))).toBe(50_600n + 18_900n)
      expect((await entryOf(pool, addr(W))).legacyCharged).toBe(true)
    })
  })

  // ───────────────────────────────────────────────────────────────────────────────────────────────
  describe('B4. auction: the May plugin on a NEW child (seller_referrer marker present)', () => {
    test('an ungated bid through bid(pay,address)void passes; the deployed 800 µA box-MBR under-quote is absorbed by over-bidding', async () => {
      const { assetId } = await algorand.send.assetCreate({ ...send(deployer), total: 10n, decimals: 0, assetName: 'Compat Prize', unitName: 'CPZ' })
      const prize = BigInt(assetId!)
      await universe.auctionFactory.optIn({ ...send(deployer), asset: prize })
      const now = await blockTimestamp()
      const auction = await universe.auctionFactory.newAuction({
        ...send(deployer), isPrizeBox: false, prizeAsset: prize, prizeAmount: 1n, name: '', proof: [],
        bidAssetId: 0n, bidFee: 0n, startingBid: 1_000_000n, bidMinimumIncrease: 100_000n,
        startTimestamp: now, endTimestamp: now + ONE_DAY, gateId: 0n, marketplace: deployer.addr.toString(), weightsListCount: 0n,
      })
      expect(await algorand.app.getGlobalState(auction.client.appId).then((s) => 'seller_referrer' in s)).toBe(true)

      const pluginId = await installDeployed(algorand, 'AuctionPlugin.may', send(deployer), pluginCreateArgs('AuctionPlugin.may', { dao: dao(), factory: universe.auctionFactory.appId }))
      const W = await registeredWallet('compat-auction')
      await addRawPlugin(W, { plugin: pluginId }, send(deployer))
      await inWindow(W, pluginId, [rawCall(pluginId, 'bid(uint64,bool,uint64,uint64,byte[][],address)void', [W.client.appId, true, auction.client.appId, 1_001_000n, [], deployer.addr.toString()])])
      expect(await auction.hasBid({ address: addr(W) })).toBe(true)
    })
  })

  // ───────────────────────────────────────────────────────────────────────────────────────────────
  describe('B5. raffle: the May plugin\'s enter is broken on every child, MainNet\'s included (pre-existing); its creation path is the accepted K6 break', () => {
    /** opts a raffle factory (new or DEPLOYED program) into `asset` through its optIn + opUp group */
    const raffleFactoryOptIn = async (appId: bigint, asset: bigint): Promise<void> => {
      const factory = algorand.client.getTypedAppClientById(RaffleFactoryClient, { appId, defaultSender: deployer.addr, defaultSigner: deployer.signer })
      const optInCost = await factory.optInCost({ args: { asset } })
      const optIn = factory.newGroup()
      optIn.optIn({ ...send(deployer), args: { payment: await algorand.createTransaction.payment({ ...send(deployer), receiver: factory.appAddress, amount: microAlgo(optInCost) }), asset }, maxFee: microAlgo(50_000) })
      optIn.opUp({ ...send(deployer), args: {}, maxFee: microAlgo(50_000) })
      await optIn.send({ coverAppCallInnerTransactionFees: true })
    }

    // Disassembly of the two MainNet programs (fixtures/mainnet-programs.json): RafflePlugin.may enter/enterAsa read
    // the child's `ticket_asset` with `app_global_get_ex; pop; btoi` (source at e7f174ee: `btoi(AppGlobal.getExBytes(..))`),
    // while the MainNet Raffle child (box `bc` of 3569557743) stores `ticket_asset` as a uint64 (`txna ApplicationArgs 4;
    // btoi; ... asset_params_get AssetTotal; ... app_global_put`). The new child keeps the uint64 (GlobalState<Asset>).
    // So the May plugin's enter panics on EVERY child, MainNet's included: a pre-existing break, not a Phase 2 regression.
    test('the May plugin\'s enter panics on its btoi of the uint64 ticket_asset, on a NEW child and on a child of the MainNet factory + child programs alike (pre-existing)', async () => {
      const factory = algorand.client.getTypedAppClientById(RaffleFactoryClient, { appId: universe.raffleFactory.appId, defaultSender: deployer.addr, defaultSigner: deployer.signer })
      await algorand.account.ensureFunded(factory.appAddress, dispenser.addr, (50).algo())
      const { assetId } = await algorand.send.assetCreate({ ...send(deployer), total: 10n, decimals: 0, assetName: 'Compat Raffle Prize', unitName: 'CRP' })
      const prize = BigInt(assetId!)
      await raffleFactoryOptIn(universe.raffleFactory.appId, prize)
      const now = await blockTimestamp()
      const raffle = await universe.raffleFactory.newRaffle({
        ...send(deployer), prizeAsset: prize, prizeAmount: 1n, ticketAsset: 0n, startTimestamp: now, endTimestamp: now + ONE_DAY,
        minTickets: 1_000_000n, maxTickets: 100_000_000n, gateId: 0n, marketplace: deployer.addr.toString(), name: '', proof: [], weightsListCount: 4n,
      })

      const W = await registeredWallet('compat-raffle')
      const amount = 2_000_000n
      const enter = (pluginId: bigint, raffleId: bigint) =>
        inWindow(W, pluginId, [rawCall(pluginId, 'enter(uint64,bool,uint64,uint64,address,byte[][])void', [W.client.appId, true, raffleId, amount, deployer.addr.toString(), []])])
      // the typed box getter throws on a missing box: true only when W has an entry
      const hasEntry = (raffleId: bigint) => algorand.client.getTypedAppClientById(RaffleClient, { appId: raffleId, defaultSender: deployer.addr, defaultSigner: deployer.signer })
        .state.box.entriesByAddress.value(addr(W)).then((v) => v !== undefined, () => false)
      const BTOI_PANIC = /btoi arg 0 wanted \[\]byte but got uint64/

      // 1. the new child (universe factory)
      const pluginId = await installDeployed(algorand, 'RafflePlugin.may', send(deployer), pluginCreateArgs('RafflePlugin.may', { dao: dao(), factory: universe.raffleFactory.appId }))
      await addRawPlugin(W, { plugin: pluginId }, send(deployer))
      const before = await balanceOf(algorand, addr(W))
      await expect(enter(pluginId, raffle.client.appId)).rejects.toThrow(BTOI_PANIC)
      expect(await balanceOf(algorand, addr(W))).toBe(before)
      expect(await hasEntry(raffle.client.appId)).toBe(false)

      // 2. a child created by the DEPLOYED factory from the DEPLOYED child program (sha-pinned by raffle/compat)
      const escrow = (await universe.raffleFactory.client.state.global.akitaDaoEscrow())!
      const legacy = await deployLegacyRaffleFactory({ algorand, ...send(deployer), dao: dao(), daoEscrow: { name: escrow.name, app: escrow.app } })
      await raffleFactoryOptIn(legacy.appId, prize)
      const fees = (await universe.dao.client.state.global.nftFees())!
      const rewardsHolds = await algorand.asset.getAccountInformation(algosdk.getApplicationAddress(universe.rewards.appId), prize).then(() => true, () => false)
      const cost = deployedRaffleCost({ raffleCreationFee: fees.raffleCreationFee, weightsListCount: 4n, prizeRewardsOptInCost: rewardsHolds ? 0n : 100_000n })
      const start = await blockTimestamp()
      const created = await legacy.app.send.call({
        ...send(deployer),
        method: DEPLOYED_NEW_RAFFLE,
        args: [
          await algorand.createTransaction.payment({ ...send(deployer), receiver: algosdk.getApplicationAddress(legacy.appId), amount: microAlgo(cost) }),
          await algorand.createTransaction.assetTransfer({ ...send(deployer), receiver: algosdk.getApplicationAddress(legacy.appId), assetId: prize, amount: 1n }),
          0n, start, start + ONE_DAY, 1_000_000n, 100_000_000n, 0n, deployer.addr.toString(), '', [], 4n,
        ],
        extraFee: FEE,
      })
      const mainnetChild = BigInt(created.return as bigint)
      await assertRunsDeployed(algorand, mainnetChild, 'Raffle')
      const legacyPluginId = await installDeployed(algorand, 'RafflePlugin.may', send(deployer), pluginCreateArgs('RafflePlugin.may', { dao: dao(), factory: legacy.appId }))
      await addRawPlugin(W, { plugin: legacyPluginId }, send(deployer))
      await expect(enter(legacyPluginId, mainnetChild)).rejects.toThrow(BTOI_PANIC)
      expect(await balanceOf(algorand, addr(W))).toBe(before)
      expect(await hasEntry(mainnetChild)).toBe(false)
    })

    test('K6 (accepted break): the May plugin\'s newRaffle has no route on the upgraded RaffleFactory (err opcode), and nothing is created', async () => {
      // the May plugin calls the DEPLOYED factory selector (no minEntries, no hint); Kyle decision K6 deleted
      // its shim, so the factory's router rejects the inner call. The static half (CMP-S5) pins the same gap.
      const factory = algorand.client.getTypedAppClientById(RaffleFactoryClient, { appId: universe.raffleFactory.appId, defaultSender: deployer.addr, defaultSigner: deployer.signer })
      await algorand.account.ensureFunded(factory.appAddress, dispenser.addr, (50).algo())
      const { assetId } = await algorand.send.assetCreate({ ...send(deployer), total: 10n, decimals: 0, assetName: 'Compat K6 Prize', unitName: 'CK6' })
      const prize = BigInt(assetId!)
      // the factory already holds the prize, so the plugin goes straight to newRaffle (no optIn of its own)
      const optInCost = await factory.optInCost({ args: { asset: prize } })
      const optIn = factory.newGroup()
      optIn.optIn({ ...send(deployer), args: { payment: await algorand.createTransaction.payment({ ...send(deployer), receiver: factory.appAddress, amount: microAlgo(optInCost) }), asset: prize }, maxFee: microAlgo(50_000) })
      optIn.opUp({ ...send(deployer), args: {}, maxFee: microAlgo(50_000) })
      await optIn.send({ coverAppCallInnerTransactionFees: true })

      const pluginId = await installDeployed(algorand, 'RafflePlugin.may', send(deployer), pluginCreateArgs('RafflePlugin.may', { dao: dao(), factory: universe.raffleFactory.appId }))
      const W = await registeredWallet('compat-raffle-k6')
      await addRawPlugin(W, { plugin: pluginId }, send(deployer))
      await W.addPlugin({ ...send(deployer), client: universe.selfOptInPlugin, callerType: CallerType.Global })
      await W.usePlugin({ ...send(deployer), callerType: CallerType.Global, calls: [universe.selfOptInPlugin.optIn({ assets: [prize] })] })
      await algorand.send.assetTransfer({ ...send(deployer), assetId: prize, amount: 1n, receiver: addr(W) })

      const before = await createdBy(factory.appAddress)
      const now = await blockTimestamp()
      await expect(inWindow(W, pluginId, [rawCall(
        pluginId,
        'newRaffle(uint64,bool,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,string,byte[32][],uint64)uint64',
        [W.client.appId, true, prize, 1n, 0n, now, now + ONE_DAY, 1_000_000n, 100_000_000n, 0n, deployer.addr.toString(), '', [], 4n],
      )])).rejects.toThrow(/err opcode executed/)
      expect(await createdBy(factory.appAddress)).toEqual(before)
      expect((await algorand.asset.getAccountInformation(addr(W), prize)).balance).toBe(1n)
    })
  })

  // ───────────────────────────────────────────────────────────────────────────────────────────────
  describe('B6. marketplace: the May plugin on the upgraded singleton and a rev-3 child', () => {
    test('list pays the pre-audit 756,500 Listing MBR and v1 disbursement MBR; the factory floats 189,600 and gets it back exactly on delist', async () => {
      const marketplace = universe.marketplace
      const factory = marketplace.client.appAddress
      await algorand.account.ensureFunded(factory, dispenser.addr, (20).algo())
      const asset = BigInt((await algorand.send.assetCreate({ ...send(deployer), total: 1_000n, decimals: 0, assetName: 'CMPcompat', unitName: 'CMPC' })).confirmation.assetIndex!)
      // warm-up (SDK list + delist) opts the factory into the asset
      await algorand.send.assetOptIn({ ...send(user), assetId: asset })
      await algorand.send.assetTransfer({ ...send(deployer), assetId: asset, amount: 5n, receiver: user.addr })
      const warm = await marketplace.list({
        ...send(user), asset, amount: 1n, name: '', proof: [], price: 1_000_000n, paymentAsset: 0n,
        expiration: (await blockTimestamp()) + ONE_DAY, reservedFor: ZERO, gateId: 0n, marketplace: user.addr.toString(),
      })
      await marketplace.delist({ ...send(user), appId: warm.client.appId })

      const pluginId = await installDeployed(algorand, 'MarketplacePlugin.may', send(deployer), pluginCreateArgs('MarketplacePlugin.may', { dao: dao(), factory: marketplace.appId }))
      // the deployed program routes only the pre-MKT-02 purchase and the list without a royalty bound; its LocalNet id is not in the SDK's legacy id list
      const plugin = new MarketplacePluginSDK({ algorand, factoryParams: { appId: pluginId, defaultSender: deployer.addr, defaultSigner: deployer.signer }, legacyPurchaseAbi: true })
      const W = await registeredWallet('compat-market')
      await W.addPlugin({ ...send(deployer), client: universe.optInPlugin, callerType: CallerType.Global })
      await W.addPlugin({ ...send(deployer), client: plugin, callerType: CallerType.Global })
      await W.usePlugin({ ...send(deployer), callerType: CallerType.Global, calls: [universe.optInPlugin.optIn({ assets: [asset] })] })
      await algorand.send.assetTransfer({ ...send(deployer), assetId: asset, amount: 2n, receiver: addr(W) })

      // 164,000 of creator MBR + 12,800 per quoted disbursement (prize + referral): the deployed quote prices each at
      // Rewards v1's 41,700 box, Rewards v2's record (with reclaimTo) costs 54,500
      const float = LISTING_CREATE_MBR - LEGACY_LISTING_CREATE_MBR + 2n * 12_800n
      const freeBefore = await freeBalance(algorand, factory)
      const before = await createdBy(factory)
      await W.usePlugin({
        ...send(deployer), callerType: CallerType.Global,
        calls: [plugin.list({ asset, assetAmount: 1n, price: 3_000_000n, paymentAsset: 0n, expiration: (await blockTimestamp()) + ONE_DAY * 30n, reservedFor: ZERO, gateId: 0n, marketplace: ZERO, name: '', proof: [] })],
      })
      const created = [...(await createdBy(factory))].filter((id) => !before.has(id))
      expect(created).toHaveLength(1)
      const state = await marketplace.getListing({ appId: created[0] }).state()
      expect(state.rev).toBe(3n)
      expect(state.factoryFloat).toBe(float)
      expect(await freeBalance(algorand, factory)).toBe(freeBefore - float)

      await W.usePlugin({ ...send(deployer), callerType: CallerType.Global, calls: [plugin.delist({ appId: created[0] })] })
      expect(await appExists(created[0])).toBe(false)
      expect(await freeBalance(algorand, factory)).toBe(freeBefore)
    })
  })

  // ───────────────────────────────────────────────────────────────────────────────────────────────
  describe('D. LIVE wallets: the deployed AbstractedAccount program under the new principal helper and the Phase 3 plugins', () => {
    let probe: MockPrincipalProbeClient
    let principalPlugin: TestPrincipalPluginClient
    let R1: string
    /** default wallet (C == W.address), referrer R1, running the MainNet wallet program, never registered */
    let Wl: WalletSDK
    let WlE: string
    /** external controlled address Cx (rekeyed to the wallet by the deployed factory at creation), running the MainNet wallet program */
    let Wx: WalletSDK
    let Cx: TransactionSignerAccount
    let WxE: string
    /**
     * a wallet running the MainNet wallet program, with two escrows ('e' and 'f') the deployed code made, each
     * with a grant and an allowance. The last tests of this section update it to the tree program.
     */
    let Wd: WalletSDK
    /**
     * an outside account rekeyed to Wd, which the deployed code registered as Wd's escrow 'o' with a grant. The
     * escrow factory has no part in such an escrow: its record has no app id.
     */
    let WdOutside: TransactionSignerAccount

    const resolveIn = async (w: WalletSDK, escrow = ''): Promise<{ target: Principal; plugin: Principal }> => {
      const [pluginSide, targetSide] = await inWindow(w, principalPlugin.appId, [
        await principalPlugin.params.principal({ ...send(deployer), args: { wallet: w.client.appId }, extraFee: FEE }),
        await principalPlugin.params.callProbe({ ...send(deployer), args: { wallet: w.client.appId, rekeyBack: true, probe: probe.appId, hint: w.client.appId }, extraFee: FEE }),
      ], escrow)
      return { target: asPrincipal(targetSide), plugin: asPrincipal(pluginSide) }
    }

    /**
     * One UpgradeApp proposal on `appId` that runs `calls` (Update plugin builders) from the DAO wallet, executed at
     * once (the universe DAO is not in its voting state), then the execution windows are sent.
     */
    const upgradeThroughDao = async (appId: bigint, calls: PluginSDKReturn[], lease: string): Promise<void> => {
      const daoWallet = await universe.dao.getWallet()
      await daoWallet.client.appClient.fundAppAccount({ amount: microAlgo(10_000_000) })
      await universe.dao.client.appClient.fundAppAccount({ amount: microAlgo(1_000_000) })
      const execution = await daoWallet.build.usePlugin({ ...send(deployer), lease, windowSize: 2000n, callerType: CallerType.Global, calls })
      const costs = await daoWallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: BigInt(execution.windows.length) })
      await daoWallet.client.appClient.fundAppAccount({ amount: microAlgo(costs.plugins + costs.executions + 2_000_000n) })
      const actions = [{
        type: ProposalActionEnum.UpgradeApp, app: appId,
        executionKey: execution.lease, groups: execution.ids, firstValid: execution.firstValid, lastValid: execution.lastValid,
      }] as Parameters<typeof universe.dao.newProposal>[0]['actions']
      const info = await universe.dao.proposalCost({ actions })
      await universe.dao.client.appClient.fundAppAccount({ amount: info.total.microAlgo() })
      const { return: proposalId } = await universe.dao.newProposal({ actions })
      if (proposalId === undefined) throw new Error('UpgradeApp proposal creation returned no id')
      await universe.dao.executeProposal({ proposalId })
      for (const window of execution.windows) await sendPrepared(window, algorand.client.algod)
    }

    /** Pushes `approval`/`clear` into the wallet factory, then `child` into its `bc` box (two proposals). */
    const pushWalletFactory = async (approval: Uint8Array, clear: Uint8Array, child: Uint8Array, version: string): Promise<void> => {
      const factoryId = universe.walletFactory.appId
      const update = universe.updatePlugin
      await algorand.account.ensureFunded(update.client.appAddress, dispenser.addr, (5).algo())
      await algorand.account.ensureFunded(algosdk.getApplicationAddress(factoryId), dispenser.addr, (2).algo())
      const stamp = Date.now() % 1_000_000
      await upgradeThroughDao(factoryId, [update.updateApp({ ...send(deployer), appId: factoryId, version, data: approval, clearProgram: clear })], `cmpd_f_${version}_${stamp}`)
      expect(sha256Hex((await algorand.app.getById(factoryId)).approvalProgram)).toBe(sha256Hex(approval))
      await upgradeThroughDao(factoryId, [update.updateFactoryChildContract({ ...send(deployer), factoryAppId: factoryId, version, data: child })], `cmpd_c_${version}_${stamp}`)
      expect(sha256Hex(await algorand.app.getBoxValue(factoryId, new Uint8Array(Buffer.from('bc'))))).toBe(sha256Hex(child))
    }

    /**
     * A wallet created by the DEPLOYED factory program from the DEPLOYED wallet program (the MainNet factory's
     * `newAccount`, AVM 11 approval + the factory's v11 clear), as every MainNet wallet was. Never registered.
     */
    const createLiveWallet = async (nickname: string, referrer: string, controlled?: TransactionSignerAccount): Promise<WalletSDK> => {
      const factoryId = universe.walletFactory.appId
      const factoryAddress = algosdk.getApplicationAddress(factoryId)
      const cost = (await algorand.send.appCallMethodCall({ ...send(deployer), appId: factoryId, method: ABIMethod.fromSignature('cost()uint64'), args: [], extraFee: FEE })).return?.returnValue as bigint
      const group = algorand.newGroup()
      // the deployed factory's external-controlled path: the caller rekeys C to the factory first, and the factory
      // rekeys C on to the new wallet (its `isExternalControlled` branch)
      if (controlled) group.addPayment({ ...send(controlled), receiver: controlled.addr, amount: microAlgo(0), rekeyTo: factoryAddress })
      group.addAppCallMethodCall({
        ...send(deployer),
        appId: factoryId,
        method: ABIMethod.fromSignature(MAINNET_NEW_ACCOUNT),
        args: [
          await algorand.createTransaction.payment({ ...send(deployer), receiver: factoryAddress, amount: microAlgo(cost) }),
          controlled ? controlled.addr.toString() : ZERO, deployer.addr.toString(), nickname, referrer, crypto.getRandomValues(new Uint8Array(32)), '', 0n, [], [],
        ],
        extraFee: FEE,
      })
      const created = await group.send({ populateAppCallResources: true })
      const appId = BigInt(created.returns![created.returns!.length - 1].returnValue as bigint)
      await assertRunsDeployed(algorand, appId, 'AbstractedAccount')
      if (controlled) {
        const auth = (await algorand.account.getInformation(controlled.addr)).authAddr?.toString()
        expect(auth).toBe(algosdk.getApplicationAddress(appId).toString())
      }
      return new WalletSDK({ algorand, factoryParams: { appId, defaultSender: deployer.addr, defaultSigner: deployer.signer } })
    }

    beforeAll(async () => {
      const defaults = { defaultSender: deployer.addr, defaultSigner: deployer.signer }
      probe = (await algorand.client.getTypedAppFactory(MockPrincipalProbeFactory, defaults).send.create.create({ args: { akitaDao: dao() } })).appClient
      principalPlugin = (await algorand.client.getTypedAppFactory(TestPrincipalPluginFactory, defaults).send.create.create({ args: { akitaDao: dao() } })).appClient
      for (const app of [probe, principalPlugin]) await app.appClient.fundAppAccount({ amount: (1).algo() })
      R1 = (await fixture.context.generateAccount({ initialFunds: (1).algo() })).addr.toString()

      // MainNet history, replayed on the universe's wallet factory (same app id, so the wallets stay genuine):
      // the factory ran the DEPLOYED program when every live wallet was created, and Phase 2 upgrades it in place.
      // The tree wallet program is AVM 13, and AVM refuses an update to a lower version ("approval program version
      // downgrade: 11 < 13"), so a tree-created wallet cannot be turned into a live one after the fact.
      const factoryId = universe.walletFactory.appId
      const tree = await algorand.app.getById(factoryId)
      const treeChild = await algorand.app.getBoxValue(factoryId, new Uint8Array(Buffer.from('bc')))
      await pushWalletFactory(approvalBytes('AbstractedAccountFactory'), clearBytes('AbstractedAccountFactory')!, approvalBytes('AbstractedAccount'), 'mainnet')

      Wl = await createLiveWallet('compat-live', R1)
      await algorand.send.payment({ ...send(deployer), receiver: Wl.client.appAddress, amount: (100).algo() })
      Cx = await fixture.context.generateAccount({ initialFunds: (20).algo() })
      Wx = await createLiveWallet('compat-live-x', R1, Cx)
      await algorand.send.payment({ ...send(deployer), receiver: Wx.client.appAddress, amount: (20).algo() })
      Wd = await createLiveWallet('compat-live-d', R1)
      await algorand.send.payment({ ...send(deployer), receiver: Wd.client.appAddress, amount: (20).algo() })

      // Phase 2: the factory and its child go back to the working tree; the live wallets keep the deployed program
      await pushWalletFactory(tree.approvalProgram, tree.clearStateProgram, treeChild, 'tree')

      // grants and escrows are written by the DEPLOYED wallet code
      await addRawPlugin(Wl, { plugin: principalPlugin.appId }, send(deployer))
      await addRawPlugin(Wl, { plugin: principalPlugin.appId, escrow: 'e' }, send(deployer))
      WlE = (await Wl.client.state.box.escrows.value('e'))!.address
      await addRawPlugin(Wx, { plugin: principalPlugin.appId }, send(deployer))
      await addRawPlugin(Wx, { plugin: principalPlugin.appId, escrow: 'e' }, send(deployer))
      WxE = (await Wx.client.state.box.escrows.value('e'))!.address
      for (const escrow of ['e', 'f']) {
        await addRawPlugin(Wd, { plugin: principalPlugin.appId, escrow }, send(deployer))
        await Wd.client.send.arc58AddAllowances({
          ...send(deployer), args: { escrow, allowances: [[0n, 1, 1_000n, 0n, 0n, false]] }, extraFee: FEE, populateAppCallResources: true,
        })
      }
      WdOutside = await fixture.context.generateAccount({ initialFunds: (2).algo() })
      await algorand.send.payment({ ...send(WdOutside), receiver: WdOutside.addr, amount: microAlgo(0), rekeyTo: Wd.client.appAddress })
      await Wd.client.send.arc58NewEscrow({
        ...send(deployer), args: { escrow: 'o', address: WdOutside.addr.toString() }, extraFee: FEE, populateAppCallResources: true,
      })
      await addRawPlugin(Wd, { plugin: principalPlugin.appId, escrow: 'o' }, send(deployer))
    }, 900_000)

    test('the wallets run the MainNet wallet program and stay genuine (creator = the DAO wallet factory)', async () => {
      await assertRunsDeployed(algorand, Wl.client.appId, 'AbstractedAccount')
      await assertRunsDeployed(algorand, Wx.client.appId, 'AbstractedAccount')
      expect(await probe.genuineFor({ args: { wallet: Wl.client.appId, factory: universe.walletFactory.appId } })).toBe(true)
      expect(await probe.genuineFor({ args: { wallet: Wx.client.appId, factory: universe.walletFactory.appId } })).toBe(true)
    })

    test('default window (S == C == W.address): the target resolves W.address with W\'s referrer; the plugin-side answer agrees', async () => {
      const { target, plugin } = await resolveIn(Wl)
      expect(target).toEqual({ wallet: Wl.client.appId, principal: addr(Wl), origin: addr(Wl), spender: addr(Wl), referrer: R1, viaPlugin: true })
      expect(plugin).toEqual(target)
    })

    test('escrow window (S = escrow): principal W.address, spender the escrow', async () => {
      const { target, plugin } = await resolveIn(Wl, 'e')
      expect(target).toEqual({ wallet: Wl.client.appId, principal: addr(Wl), origin: addr(Wl), spender: WlE, referrer: R1, viaPlugin: true })
      expect(plugin).toEqual(target)
    })

    test('external controlled address: default window (S == Cx) and escrow window (auth(Cx) == W.address) both resolve Cx', async () => {
      const def = await resolveIn(Wx)
      expect(def.target).toEqual({ wallet: Wx.client.appId, principal: Cx.addr.toString(), origin: Cx.addr.toString(), spender: Cx.addr.toString(), referrer: R1, viaPlugin: true })
      const esc = await resolveIn(Wx, 'e')
      expect(esc.target).toEqual({ wallet: Wx.client.appId, principal: Cx.addr.toString(), origin: Cx.addr.toString(), spender: WxE, referrer: R1, viaPlugin: true })
      expect(esc.plugin).toEqual(esc.target)
    })

    test('the NEW social plugin: hinted initMeta stores the live wallet (verified hint, no registry)', async () => {
      try {
        await universe.social.init()
      } catch {
        // already opted in
      }
      await Wl.addPlugin({ ...send(deployer), client: universe.socialPlugin, callerType: CallerType.Global })
      await Wl.usePlugin({ ...send(deployer), callerType: CallerType.Global, calls: [universe.socialPlugin.initMeta({ user: addr(Wl), automated: false, subscriptionIndex: 0n, nfd: 0n, akitaNft: 0n })] })
      expect((await universe.social.getMeta({ user: addr(Wl) })).wallet).toBe(Wl.client.appId)
      await assertUnregistered(universe.escrowFactory, [addr(Wl), WlE])
    })

    test('the NEW subscriptions plugin: hinted newService pays the referral to the live wallet\'s referrer (registry-free)', async () => {
      await Wl.addPlugin({ ...send(deployer), client: universe.subscriptionsPlugin, callerType: CallerType.Global })
      await algorand.send.payment({ ...send(deployer), receiver: algosdk.getApplicationAddress(universe.subscriptionsPlugin.appId), amount: microAlgo(10_000_000) })
      // newService charges the DAO's 100 ALGO service creation fee (DEFAULT_SERVICE_CREATION_FEE) plus box MBR
      await algorand.send.payment({ ...send(deployer), receiver: Wl.client.appAddress, amount: (150).algo() })
      const before = await allocationsFor(algorand, universe.rewards.appId, R1)
      await Wl.usePlugin({
        ...send(deployer), callerType: CallerType.Global,
        calls: universe.subscriptionsPlugin.newServiceWithDescription({
          interval: 3_600n, asset: 0n, amount: 100_000n, passes: 0n, gate: 0n, payoutAddress: addr(Wl),
          title: 'live wallet service', description: 'compat', bannerImage: EMPTY_CID, highlightMessage: 0, highlightColor: new Uint8Array([1, 2, 3]),
        }),
      })
      expect(await allocationsFor(algorand, universe.rewards.appId, R1)).toBeGreaterThan(before)
      await assertUnregistered(universe.escrowFactory, [addr(Wl)])
    })

    describe('escrow deletion on a live wallet updated to the tree program', () => {
      const appExists = async (id: bigint): Promise<boolean> => algorand.app.getById(id).then(() => true, () => false)
      const escrowNames = async () => Array.from((await Wd.client.state.box.escrows.getMap()).keys())
      const grantsNaming = async (escrow: string) =>
        Array.from((await Wd.client.state.box.plugins.getMap()).keys()).filter((key) => key.escrow === escrow).length
      const allowancesOf = async (escrow: string) =>
        Array.from((await Wd.client.state.box.allowances.getMap()).keys()).filter((key) => key.escrow === escrow).length

      test('the update grows the wallet from four program pages to five, and the wallet factory pays for the page', async () => {
        const factoryAddress = algosdk.getApplicationAddress(universe.walletFactory.appId)
        const treeChild = await algorand.app.getBoxValue(universe.walletFactory.appId, new Uint8Array(Buffer.from('bc')))
        // the tree program no longer fits the four pages every MainNet wallet was created with
        expect(treeChild.length).toBeGreaterThan(4 * 2048 - 4)
        expect(treeChild.length).toBeLessThanOrEqual(5 * 2048 - 4)
        await assertRunsDeployed(algorand, Wd.client.appId, 'AbstractedAccount')
        expect((await algorand.client.algod.getApplicationByID(Wd.client.appId).do()).params?.extraProgramPages ?? 0).toBe(3)

        // Rollout steps F1 and F2 read this plan before they send anything (scripts/lib/wallet-page-growth.ts).
        const plan = await readWalletGrowth(algorand, universe.walletFactory.appId, [Wd.client.appId], clearProgramSize(WALLET_SPEC))
        expect(plan.neededExtraPages).toBe(4)
        expect(plan.growing).toEqual([{ wallet: Wd.client.appId, extraPages: 3, added: 1 }])
        expect(plan.required).toBe(100_000n)

        // The step pays the factory exactly what it lacks, and refuses when the sender cannot spare it.
        const payer = { algorand, sender: deployer.addr.toString(), signer: deployer.signer }
        const unfunded = await algorand.account.getInformation(factoryAddress)
        expect(await fundWalletGrowth(payer, universe.walletFactory.appId, { ...plan, shortfall: 123_456n })).toBe(123_456n)
        expect((await algorand.account.getInformation(factoryAddress)).balance.microAlgos).toBe(unfunded.balance.microAlgos + 123_456n)
        const poor = algorand.account.random()
        await algorand.account.ensureFunded(poor.addr, dispenser.addr, microAlgo(150_000n))
        await expect(fundWalletGrowth({ algorand, sender: poor.addr.toString(), signer: poor.signer }, universe.walletFactory.appId, { ...plan, shortfall: 1_000_000n }))
          .rejects.toThrow(/needs 1000000 µALGO more/)
        // this factory already holds enough for one page, so the real plan pays nothing
        expect(await fundWalletGrowth(payer, universe.walletFactory.appId, plan)).toBe(plan.shortfall)
        const factoryBefore = await algorand.account.getInformation(factoryAddress)
        expect(factoryBefore.balance.microAlgos - factoryBefore.minBalance.microAlgos).toBeGreaterThanOrEqual(100_000n)
        const walletBefore = await algorand.account.getInformation(Wd.client.appAddress)
        const escrowsBefore = await Wd.client.state.box.escrows.getMap()

        // the call exactly as the rollout script sends it
        const sent = await universe.walletFactory.client.send.updateWallet({ ...send(deployer), ...walletUpdateParams(Wd.client.appId) })
        // one outer call and one inner update; the fee grows a little with the size of the group
        expect(sent.transaction.fee).toBeGreaterThanOrEqual(2_000n)
        expect(sent.transaction.fee).toBeLessThan(10_000n)

        const updated = await algorand.client.algod.getApplicationByID(Wd.client.appId).do()
        expect(sha256Hex(updated.params!.approvalProgram)).toBe(sha256Hex(treeChild))
        expect(updated.params!.extraProgramPages).toBe(4)
        // nothing is left to grow, so a second run of the step would fund nothing
        const again = await readWalletGrowth(algorand, universe.walletFactory.appId, [Wd.client.appId], clearProgramSize(WALLET_SPEC))
        expect(again.pages).toBe(0)
        expect(again.shortfall).toBe(0n)
        // The factory created the wallet, so it already held the wallet's minimum. Growing costs it one more
        // page, 100,000 microALGO, and it pays nothing out.
        const factoryAfter = await algorand.account.getInformation(factoryAddress)
        expect(factoryAfter.minBalance.microAlgos - factoryBefore.minBalance.microAlgos).toBe(100_000n)
        expect(factoryAfter.balance.microAlgos).toBe(factoryBefore.balance.microAlgos)
        // the wallet's own account, its escrows and their records are untouched
        const walletAfter = await algorand.account.getInformation(Wd.client.appAddress)
        expect(walletAfter.balance.microAlgos).toBe(walletBefore.balance.microAlgos)
        expect(walletAfter.minBalance.microAlgos).toBe(walletBefore.minBalance.microAlgos)
        expect(await Wd.client.state.box.escrows.getMap()).toEqual(escrowsBefore)
      })

      test('an escrow made before the update has no count, and the SDK removes its grant and allowance with it in one group', async () => {
        const { id, address } = await Wd.getEscrow('e')
        expect(await Wd.getEscrowRefs('e')).toBeUndefined()

        const plan = await Wd.getEscrowTeardown('e')
        expect(plan.counted).toBeUndefined()
        expect(plan.plugins.map((grant) => grant.plugin)).toEqual([principalPlugin.appId])
        expect(plan.allowances).toEqual([0n])

        const before = await algorand.account.getInformation(Wd.client.appAddress)
        const sent = await Wd.deleteEscrow({ ...send(deployer), escrow: 'e' })

        // one group: the grant, the allowance, the delete
        expect(sent.length).toBe(1)
        expect(sent[0].txIds.length).toBe(3)
        expect(await appExists(id)).toBe(false)
        expect(await escrowNames()).not.toContain('e')
        expect(await grantsNaming('e')).toBe(0)
        expect(await allowancesOf('e')).toBe(0)
        expect((await algorand.account.getInformation(address)).balance.microAlgos).toBe(0n)
        // the wallet's storage for the record, the grant and the allowance is released
        const after = await algorand.account.getInformation(Wd.client.appAddress)
        expect(after.minBalance.microAlgos).toBeLessThan(before.minBalance.microAlgos)
        expect(after.balance.microAlgos).toBeGreaterThan(before.balance.microAlgos)
      })

      test('the wallet cannot check the delete of such an escrow: what the bare call leaves behind stays removable, and does not count against a new escrow of the name', async () => {
        const first = await Wd.getEscrow('f')
        expect(await Wd.getEscrowRefs('f')).toBeUndefined()

        // The bare contract call, with nothing removed first. A counted escrow would be refused here (errEuse).
        await Wd.client.send.arc58DeleteEscrow({
          ...send(deployer), args: { escrow: 'f' }, coverAppCallInnerTransactionFees: true, maxFee: FEE, populateAppCallResources: true,
        })
        expect(await appExists(first.id)).toBe(false)
        expect(await grantsNaming('f')).toBe(1)
        expect(await allowancesOf('f')).toBe(1)

        // a new escrow of the same name is a new app with a count of its own, which starts at nothing
        await Wd.newEscrow({ ...send(deployer), escrow: 'f', address: ZERO })
        const second = await Wd.getEscrow('f')
        expect(second.id).not.toBe(first.id)
        expect(await Wd.getEscrowRefs('f')).toBe(0n)

        // the grant left behind names the first escrow's app, so it does not work on the second
        await expect(inWindow(Wd, principalPlugin.appId, [
          await principalPlugin.params.principal({ ...send(deployer), args: { wallet: Wd.client.appId }, extraFee: FEE }),
        ], 'f')).rejects.toThrow()

        // both leftovers can still be removed, their storage comes back, and the new escrow's count stays at nothing
        const before = await algorand.account.getInformation(Wd.client.appAddress)
        await Wd.removeAllowances({ ...send(deployer), escrow: 'f', assets: [0n] })
        await Wd.removePlugin({ ...send(deployer), plugin: principalPlugin.appId, caller: ZERO, escrow: 'f' })
        const after = await algorand.account.getInformation(Wd.client.appAddress)
        expect(await grantsNaming('f')).toBe(0)
        expect(await allowancesOf('f')).toBe(0)
        expect(after.minBalance.microAlgos).toBeLessThan(before.minBalance.microAlgos)
        expect(await Wd.getEscrowRefs('f')).toBe(0n)

        // and the new escrow is deleted like any counted one
        const sent = await Wd.deleteEscrow({ ...send(deployer), escrow: 'f' })
        expect(sent.length).toBe(1)
        expect(await appExists(second.id)).toBe(false)
      })

      test('an outside account the deployed code registered as an escrow is closed out by the updated wallet', async () => {
        const address = WdOutside.addr.toString()
        const record = await Wd.getEscrow('o')
        // no escrow app: the deployed code stored the account itself, and the tree code reads that record
        expect(record.id).toBe(0n)
        expect(record.address.toString()).toBe(address)
        expect(await Wd.getEscrowRefs('o')).toBeUndefined()
        expect((await algorand.account.getInformation(address)).authAddr?.toString()).toBe(Wd.client.appAddress.toString())
        expect(await grantsNaming('o')).toBe(1)

        const held = (await algorand.account.getInformation(address)).balance.microAlgos
        const before = await algorand.account.getInformation(Wd.client.appAddress)
        const sent = await Wd.deleteEscrow({ ...send(deployer), escrow: 'o' })

        // one group: the grant, then the delete
        expect(sent.length).toBe(1)
        expect(sent[0].txIds.length).toBe(2)
        expect(await escrowNames()).not.toContain('o')
        expect(await grantsNaming('o')).toBe(0)
        // the account is closed out, and closing it ended its rekey to the wallet
        const closed = await algorand.account.getInformation(address)
        expect(closed.balance.microAlgos).toBe(0n)
        expect(closed.authAddr).toBeUndefined()
        // what the account held comes back, and the storage for the record and the grant is released
        const after = await algorand.account.getInformation(Wd.client.appAddress)
        expect(after.balance.microAlgos - before.balance.microAlgos).toBe(held)
        expect(after.minBalance.microAlgos).toBeLessThan(before.minBalance.microAlgos)
      })
    })
  })
})
