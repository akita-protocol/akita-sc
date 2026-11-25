/**
 * Principal resolution, social track: the DEPLOYED social plugin program (MainNet 3643581007, v0.0.3)
 * against the upgraded AkitaSocial / AkitaSocialGraph (PHASE-0-SPEC §7.1 "Compatibility baseline",
 * §7.2, P2-SOC-01, P2-SOC-02, social part of P2-CMP-01).
 *
 * The deployed plugin calls the OLD selectors, so every call below lands on a legacy shim. The shims
 * must accept exactly the payments the deployed plugin quotes locally (its own MinPostsMBR, reaction-list
 * MBR and raw `meta.wallet` tip route), use the registry referrer, and gate on `Txn.sender`.
 * The program bytes come from recorded fixtures (`deployed/`), never from the working tree.
 *
 * The legacy payment terms are honoured only for the deployed plugin programs (`AkitaSocial.legacyTerms`):
 * on MainNet the four pinned plugin ids, on LocalNet (another genesis hash) any app caller, so this copy
 * of the deployed plugin gets them here. Top-level senders of the old selectors pay the corrected MBR
 * (social/principal.e2e.spec.ts).
 */
import * as algokit from '@algorandfoundation/algokit-utils'
import { microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import type { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { sendPrepared } from 'akita-sdk'
import { ProposalActionEnum, type AkitaDaoSDK } from 'akita-sdk/dao'
import { GateSDK, LogicalOperator, Operator } from 'akita-sdk/gates'
import { RefType, SocialSDK } from 'akita-sdk/social'
import { CallerType, newWallet, SocialPluginSDK, WalletSDK } from 'akita-sdk/wallet'
import algosdk from 'algosdk'
import { beforeAll, describe, expect, test } from 'vitest'
import { AkitaUniverse, buildAkitaUniverse } from '../../../../tests/fixtures/dao'
import { AkitaSocialClient, AkitaSocialFactory } from '../../../artifacts/social/AkitaSocialClient'
import { errMetaDoesntExist } from '../../../social/errors'
import { deployDeployedAkitaSocial, deployDeployedSocialPlugin, deployedAkitaSocialProgram } from './deployed/deploy'

algokit.Config.configure({ populateAppCallResources: true })

const fixture = algorandFixture()

describe('Deployed social plugin (3643581007) on the upgraded social targets', () => {
  let algorand: algokit.AlgorandClient
  let deployer: TransactionSignerAccount
  let poster: TransactionSignerAccount
  let universe: AkitaUniverse
  let legacyPlugin: SocialPluginSDK
  let posterSdk: SocialSDK
  let akta: bigint
  let postFee: bigint
  let reactFee: bigint
  /** registered wallet (as every MainNet wallet is) running the deployed plugin under a global default grant */
  let W: WalletSDK
  let walletAddress: string

  const chainTime = async () => {
    const status = await algorand.client.algod.status().do()
    return BigInt((await algorand.client.algod.block(status.lastRound).do()).block.header.timestamp)
  }
  let seed = 10
  const bytes = (length: number) => new Uint8Array(length).fill(seed++)

  const legacyWallet = async (nickname: string, aktaAmount: bigint, referrer?: string): Promise<WalletSDK> => {
    const w = await newWallet({
      algorand,
      factoryParams: { appId: universe.walletFactory.appId, defaultSender: deployer.addr, defaultSigner: deployer.signer },
      sender: deployer.addr,
      signer: deployer.signer,
      nickname,
      referrer,
      // legacy initMeta stores the registry wallet (legacyWalletOf), as for every MainNet wallet
      register: true,
    })
    const mbr = await w.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n })
    await w.client.appClient.fundAppAccount({ amount: microAlgo(mbr.plugins * 3n + 10_000_000n) })
    await w.addPlugin({ client: legacyPlugin, callerType: CallerType.Admin })
    await w.addPlugin({ client: universe.selfOptInPlugin, callerType: CallerType.Admin })
    if (aktaAmount > 0n) {
      await w.usePlugin({ callerType: CallerType.Admin, calls: [universe.selfOptInPlugin.optIn({ assets: [akta] })] })
      await algorand.send.assetTransfer({ sender: deployer.addr, signer: deployer.signer, receiver: w.client.appAddress, assetId: akta, amount: aktaAmount })
    }
    return w
  }

  const use = (w: WalletSDK, call: ReturnType<SocialPluginSDK['post']>) => w.usePlugin({ callerType: CallerType.Admin, calls: [call] })

  beforeAll(async () => {
    await fixture.newScope()
    algorand = fixture.context.algorand
    const dispenser = await algorand.account.dispenserFromEnvironment()
    deployer = await fixture.context.generateAccount({ initialFunds: microAlgo(2_000_000_000) })
    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (2_000).algo())
    poster = await fixture.context.generateAccount({ initialFunds: (100).algo() })

    universe = await buildAkitaUniverse({ fixture, sender: deployer.addr, signer: deployer.signer, apps: {} })
    akta = universe.aktaAssetId
    try {
      await universe.social.init()
    } catch {
      // already opted in by the universe
    }
    ;({ postFee, reactFee } = await universe.social.getSocialFees())

    legacyPlugin = await deployDeployedSocialPlugin({
      algorand, sender: deployer.addr, signer: deployer.signer, akitaDao: universe.dao.client.appId,
    })

    await algorand.send.assetOptIn({ sender: poster.addr, signer: poster.signer, assetId: akta })
    await algorand.send.assetTransfer({ sender: deployer.addr, signer: deployer.signer, receiver: poster.addr, assetId: akta, amount: postFee * 10n + reactFee * 10n })
    posterSdk = new SocialSDK({
      algorand,
      daoAppId: universe.dao.client.appId,
      socialFactoryParams: { appId: universe.social.socialAppId, defaultSender: poster.addr, defaultSigner: poster.signer },
      graphFactoryParams: { appId: universe.social.graphAppId, defaultSender: poster.addr, defaultSigner: poster.signer },
      impactFactoryParams: { appId: universe.social.impactAppId, defaultSender: poster.addr, defaultSigner: poster.signer },
      moderationFactoryParams: { appId: universe.social.moderationAppId, defaultSender: poster.addr, defaultSigner: poster.signer },
    })
    await posterSdk.initMeta({})

    W = await legacyWallet('deployed-plugin-wallet', postFee * 5n + reactFee * 20n)
    walletAddress = W.client.appAddress.toString()
  }, 600_000)

  test('the deployed plugin program is the recorded MainNet program and keeps its ABI', async () => {
    const app = await algorand.app.getById(legacyPlugin.appId)
    expect(app.approvalProgram.length).toBe(7_230)
    expect(legacyPlugin.client.appClient.getABIMethod('setMetaWallet')).toBeDefined() // SDK knows it; the program does not
    await expect(legacyPlugin.client.send.setMetaWallet({
      sender: deployer.addr, signer: deployer.signer, args: { wallet: W.client.appId, rekeyBack: true },
    })).rejects.toThrow()
  })

  describe('P2-SOC-01: deployed flows pass through the legacy shims', () => {
    let postKey: Uint8Array

    test('initMeta stores the registry wallet (the wallet is registered, as MainNet wallets are)', async () => {
      await use(W, legacyPlugin.initMeta({ user: walletAddress, automated: false, subscriptionIndex: 0n, nfd: 0n, akitaNft: 0n }))
      expect((await posterSdk.getMeta({ user: walletAddress })).wallet).toBe(W.client.appId)
    })

    test('post: the deployed quote (MinPostsMBR 46_500) is exactly what the shim charges', async () => {
      const timestamp = await chainTime()
      const nonce = bytes(24)
      await use(W, legacyPlugin.post({ timestamp, nonce, cid: bytes(36), gateId: 0n, usePayWall: false, payWallId: 0n, creatorFlags: 0n }))
      postKey = posterSdk.computePostKey(walletAddress, timestamp, nonce)
      expect((await posterSdk.getPost({ ref: postKey })).creator).toBe(walletAddress)
    })

    test('reply, up-vote and react on another creator pass (no parent-ref or reaction-record terms in the quote)', async () => {
      const { postKey: posterPost } = await posterSdk.post({ cid: bytes(36) })
      await use(W, legacyPlugin.reply({
        timestamp: await chainTime(), nonce: bytes(24), cid: bytes(36), ref: posterPost, type: RefType.Post,
        gateId: 0n, usePayWall: false, payWallId: 0n, creatorFlags: 0n,
      }))
      await use(W, legacyPlugin.vote({ ref: posterPost, type: RefType.Post, isUp: true }))

      const nft = (await algorand.send.assetCreate({ sender: deployer.addr, signer: deployer.signer, total: 1n, decimals: 0, assetName: 'Compat NFT', unitName: 'CNFT' })).confirmation.assetIndex!
      await W.usePlugin({ callerType: CallerType.Admin, calls: [universe.selfOptInPlugin.optIn({ assets: [nft] })] })
      await algorand.send.assetTransfer({ sender: deployer.addr, signer: deployer.signer, receiver: walletAddress, assetId: nft, amount: 1n })
      await use(W, legacyPlugin.react({ ref: posterPost, type: RefType.Post, nft }))
      expect(await universe.social.socialClient.getReactionExists({ args: { ref: posterPost, nft } })).toBe(true)
      expect((await posterSdk.getVote({ account: walletAddress, ref: posterPost })).isUp).toBe(true)
    })

    test('a vote that materializes an address ref is quoted with the deployed posts MBR and no votes-box term', async () => {
      const fresh = algorand.account.random().addr.publicKey
      await use(W, legacyPlugin.vote({ ref: fresh, type: RefType.Address, isUp: false }))
      expect(await universe.social.socialClient.getPostExists({ args: { ref: fresh } })).toBe(true)
    })

    test('ARC-58 tip route on the raw meta.wallet: the deployed quote adds the opt-in MBR and the shim routes the same way', async () => {
      // creator Wc: registered wallet with the opt-in plugin, meta(Wc.address).wallet = Wc, NOT opted into AKTA
      const Wc = await legacyWallet('deployed-plugin-creator', 0n)
      await Wc.addPlugin({ client: universe.optInPlugin, callerType: CallerType.Global })
      const creator = Wc.client.appAddress.toString()
      await use(Wc, legacyPlugin.initMeta({ user: creator, automated: false, subscriptionIndex: 0n, nfd: 0n, akitaNft: 0n }))
      expect((await algorand.asset.getAccountInformation(creator, akta).catch(() => undefined))).toBeUndefined()

      // W up-votes the creator's wall: quote = votelist + 46_500 (materialized ref) + Global.assetOptInMinBalance
      await use(W, legacyPlugin.vote({ ref: algosdk.decodeAddress(creator).publicKey, type: RefType.Address, isUp: true }))

      // the tip went through the creator wallet's opt-in route to its controlled address
      const holding = await algorand.asset.getAccountInformation(creator, akta)
      expect(holding.balance).toBeGreaterThan(0n)
    })

    test('SOCIAL-2: up-votes and reactions of a referred wallet pay no referral, so vote cycles cannot drain AkitaSocial', async () => {
      const Wr = await legacyWallet('deployed-plugin-referred', reactFee * 10n, algorand.account.random().addr.toString())
      const voter = Wr.client.appAddress.toString()
      await use(Wr, legacyPlugin.initMeta({ user: voter, automated: false, subscriptionIndex: 0n, nfd: 0n, akitaNft: 0n }))
      const { postKey } = await posterSdk.post({ cid: bytes(36) })
      const socialAddress = universe.social.socialClient.appAddress.toString()
      const free = async () => {
        const info = await algorand.account.getInformation(socialAddress)
        return BigInt(info.balance.microAlgos) - BigInt(info.minBalance.microAlgos)
      }

      // up-vote then undo, twice: the app used to pay the referral disbursement MBR on every up-vote
      for (let cycle = 0; cycle < 2; cycle++) {
        const before = await free()
        await use(Wr, legacyPlugin.vote({ ref: postKey, type: RefType.Post, isUp: true }))
        await use(Wr, legacyPlugin.editVote({ ref: postKey, flip: false }))
        expect(await free()).toBe(before)
      }

      const nft = (await algorand.send.assetCreate({ sender: deployer.addr, signer: deployer.signer, total: 1n, decimals: 0, assetName: 'Drain NFT', unitName: 'DNFT' })).confirmation.assetIndex!
      await Wr.usePlugin({ callerType: CallerType.Admin, calls: [universe.selfOptInPlugin.optIn({ assets: [nft] })] })
      await algorand.send.assetTransfer({ sender: deployer.addr, signer: deployer.signer, receiver: voter, assetId: nft, amount: 1n })
      const before = await free()
      await use(Wr, legacyPlugin.react({ ref: postKey, type: RefType.Post, nft }))
      // the deployed quote pays the 18_900 reaction list for a 15_700 record (SOCIAL-6) and nothing for a referral
      expect((await free()) - before).toBe(18_900n - 15_700n)
    })

    test('follow and gatedFollow (gate subject = origin = Txn.sender for a default grant) pass', async () => {
      await use(W, legacyPlugin.follow({ address: poster.addr.toString() }))
      expect(await posterSdk.isFollowing({ follower: walletAddress, user: poster.addr.toString() })).toBe(true)

      const gate = new GateSDK({
        algorand,
        factoryParams: { appId: universe.gate.appId, defaultSender: deployer.addr, defaultSigner: deployer.signer },
        gateRegistry: { social_activity: universe.subgates.socialActivityGate.appId },
      })
      const gateId = (await gate.register({
        sender: deployer.addr, signer: deployer.signer,
        args: [{ type: 'social_activity', appId: universe.subgates.socialActivityGate.appId, layer: 0n, logicalOperator: LogicalOperator.None, op: Operator.GreaterThanOrEqualTo, value: 86_400n }],
      })).return!
      const followee = await fixture.context.generateAccount({ initialFunds: (5).algo() })
      const followeeSdk = new SocialSDK({
        algorand,
        daoAppId: universe.dao.client.appId,
        socialFactoryParams: { appId: universe.social.socialAppId, defaultSender: followee.addr, defaultSigner: followee.signer },
        graphFactoryParams: { appId: universe.social.graphAppId, defaultSender: followee.addr, defaultSigner: followee.signer },
        impactFactoryParams: { appId: universe.social.impactAppId, defaultSender: followee.addr, defaultSigner: followee.signer },
        moderationFactoryParams: { appId: universe.social.moderationAppId, defaultSender: followee.addr, defaultSigner: followee.signer },
      })
      await followeeSdk.initMeta({})
      await followeeSdk.updateMeta({ followGateId: gateId })

      // the deployed plugin builds Gate.mustCheck(origin, ...) and calls the old gatedFollow selector
      await use(W, legacyPlugin.gatedFollow({ address: followee.addr.toString(), args: [new Uint8Array()] }))
      expect(await posterSdk.isFollowing({ follower: walletAddress, user: followee.addr.toString() })).toBe(true)
    })
  })

  describe('P2-SOC-02: upgrading the deployed AkitaSocial program (page growth, DAO wallet as size sponsor)', () => {
    const PAGE = 100_000n
    const UINT = 28_500n
    const BYTES = 50_000n

    const proposeAndExecute = async (dao: AkitaDaoSDK, actions: Parameters<AkitaDaoSDK['newProposal']>[0]['actions']) => {
      const info = await dao.proposalCost({ actions })
      await dao.client.appClient.fundAppAccount({ amount: info.total.microAlgo() })
      const { return: proposalId } = await dao.newProposal({ actions })
      if (proposalId === undefined) throw new Error('Failed to create proposal')
      await dao.executeProposal({ proposalId })
    }

    test('the update plugin grows the pages, keeps the schema, and the new code (with shims) runs', async () => {
      const dao = universe.dao
      const sender = deployer.addr.toString()
      const signer = deployer.signer
      const escrow = (await universe.social.socialClient.state.global.akitaDaoEscrow())!
      const program = deployedAkitaSocialProgram()
      const appId = await deployDeployedAkitaSocial(
        { algorand, sender, signer, akitaDao: dao.client.appId },
        { name: escrow.name, app: escrow.app },
      )
      const before = await algorand.app.getById(appId)
      expect(before.extraProgramPages).toBe(program.extraProgramPages)
      expect(before.globalInts).toBe(program.globalInts)
      expect(before.globalByteSlices).toBe(program.globalBytes)

      const compiled = await algorand.client.getTypedAppFactory(AkitaSocialFactory, { defaultSender: sender, defaultSigner: signer }).appFactory.compile()
      expect(compiled.approvalProgram.length).toBeGreaterThan(8_192 - compiled.clearStateProgram.length)
      const neededExtraPages = Math.ceil((compiled.approvalProgram.length + compiled.clearStateProgram.length) / 2_048) - 1
      expect(neededExtraPages).toBeGreaterThan(program.extraProgramPages)

      await dao.getWallet()
      const daoWallet = dao.wallet
      await daoWallet.client.appClient.fundAppAccount({ amount: microAlgo(20_000_000) })
      await dao.client.appClient.fundAppAccount({ amount: microAlgo(1_000_000) })
      const update = universe.updatePlugin
      const programMbr = 2_500n + 400n * (2n + BigInt(compiled.approvalProgram.length))
      const dispenser = await algorand.account.dispenserFromEnvironment()
      await algorand.account.ensureFunded(update.client.appAddress, dispenser.addr, microAlgo(programMbr))

      const execution = await daoWallet.build.usePlugin({
        sender, signer, lease: 'social_pages_upg', windowSize: 2000n, callerType: CallerType.Global,
        calls: [update.updateApp({ sender, signer, appId, version: 'principal', data: compiled.approvalProgram, clearProgram: compiled.clearStateProgram })],
      })
      const costs = await daoWallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: BigInt(execution.windows.length) })
      await daoWallet.client.appClient.fundAppAccount({ amount: microAlgo(costs.plugins + costs.executions + 2_000_000n) })
      await proposeAndExecute(dao, [{
        type: ProposalActionEnum.UpgradeApp, app: appId,
        executionKey: execution.lease, groups: execution.ids, firstValid: execution.firstValid, lastValid: execution.lastValid,
      }])

      const creatorBefore = BigInt((await algorand.account.getInformation(deployer.addr)).minBalance.microAlgos)
      for (const window of execution.windows) await sendPrepared(window, algorand.client.algod)
      const creatorAfter = BigInt((await algorand.account.getInformation(deployer.addr)).minBalance.microAlgos)

      const after = await algorand.app.getById(appId)
      expect(after.extraProgramPages).toBe(neededExtraPages)
      expect(after.globalInts).toBe(program.globalInts)
      expect(after.globalByteSlices).toBe(program.globalBytes)
      expect(Buffer.from(after.approvalProgram)).toEqual(Buffer.from(compiled.approvalProgram))
      // size sponsorship moved to the update sender (go-algorand AppSizeUpdates): the creator keeps only the
      // base page and is released from the extra pages and the global schema
      const releasedMbr = PAGE * BigInt(program.extraProgramPages) + UINT * BigInt(program.globalInts) + BYTES * BigInt(program.globalBytes)
      expect(creatorBefore - creatorAfter).toBe(releasedMbr)

      // the upgraded app runs the new code: the hinted setMetaWallet exists and checks for a meta
      const upgraded = algorand.client.getTypedAppClientById(AkitaSocialClient, { appId, defaultSender: sender, defaultSigner: signer })
      await expect(upgraded.send.setMetaWallet({ args: { wallet: 0n } })).rejects.toThrow(new RegExp(errMetaDoesntExist))
      expect(await upgraded.state.global.version()).toBe('principal')
    })
  })
})
