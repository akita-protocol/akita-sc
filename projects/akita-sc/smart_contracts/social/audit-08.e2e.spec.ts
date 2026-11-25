/**
 * Regressions for the fixes of audit 08 (social): SOC-01, SOC-02, SOC-03, SOC-04, SOC-06, SOC-07 and
 * SOC-09. Each test is the audit's proof of the finding with its outcome inverted: the step the
 * finding relied on is now refused, and the honest path beside it still works.
 */
import * as algokit from '@algorandfoundation/algokit-utils'
import { microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import type { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { sendPrepared, type PluginSDKReturn } from 'akita-sdk'
import { ProposalActionEnum } from 'akita-sdk/dao'
import { RefType, SocialSDK, VOTES_MBR } from 'akita-sdk/social'
import { CallerType, SocialPluginSDK, WalletSDK } from 'akita-sdk/wallet'
import algosdk from 'algosdk'
import { beforeAll, describe, expect, test } from 'vitest'
import { getAppFundingNeeded, proposeAndExecute } from '../../scripts/utils'
import { AkitaUniverse, buildAkitaUniverse } from '../../tests/fixtures/dao'
import { addRawPlugin, newUnregisteredWallet } from '../../tests/fixtures/unregistered-wallet'
import {
  DEFAULT_UPDATE_AKITA_DAO_APP_APPROVAL,
  DEFAULT_UPDATE_AKITA_DAO_DURATION,
  DEFAULT_UPDATE_AKITA_DAO_PARTICIPATION,
  DEFAULT_UPDATE_AKITA_DAO_PROPOSAL_CREATION,
  DEFAULT_UPDATE_AKITA_DAO_PROPOSAL_POWER,
} from '../utils/defaults'
import {
  errBanExpired,
  errBanned,
  errCannotBanModerator,
  errHasGate,
  errInvalidPayment,
  errNoSelfVote,
  errReservedRef,
} from './errors'

algokit.Config.configure({ populateAppCallResources: true })

const fixture = algorandFixture()

/** what a tipper used to be charged to opt a creator into AKTA */
const OPT_IN_MBR = 100_000n
const ONE_YEAR = 31_536_000n

const wallOf = (address: string) => algosdk.decodeAddress(address).publicKey
/** the storage key of an asset or app ref: its ID followed by 24 zero bytes */
const idKey = (id: bigint) => {
  const key = new Uint8Array(32)
  key.set(algosdk.encodeUint64(id))
  return key
}

describe('Audit 08 (social) regressions', () => {
  let algorand: algokit.AlgorandClient
  let deployer: TransactionSignerAccount
  let universe: AkitaUniverse
  let plugin: SocialPluginSDK
  let akta: bigint
  let postFee: bigint
  let reactFee: bigint
  let daoEscrow: string
  let mod1: TransactionSignerAccount
  let mod2: TransactionSignerAccount

  const send = (a: TransactionSignerAccount) => ({ sender: a.addr, signer: a.signer })
  const addr = (w: WalletSDK) => w.client.appAddress.toString()
  let seed = 40
  const bytes = (length: number) => new Uint8Array(length).fill(seed++ % 250)
  const chainTime = async () => {
    const status = await algorand.client.algod.status().do()
    return BigInt((await algorand.client.algod.block(status.lastRound).do()).block.header.timestamp)
  }
  const aktaOf = async (a: string) => (await algorand.asset.getAccountInformation(a, akta)).balance
  const holdsAkta = async (a: string) => {
    try {
      await algorand.asset.getAccountInformation(a, akta)
      return true
    } catch {
      return false
    }
  }
  const algoOf = async (a: string) => BigInt((await algorand.account.getInformation(a)).balance.microAlgo)
  const minBalanceOf = async (a: string) => BigInt((await algorand.account.getInformation(a)).minBalance.microAlgo)

  const sdkFor = (a: TransactionSignerAccount) => new SocialSDK({
    algorand,
    daoAppId: universe.dao.client.appId,
    socialFactoryParams: { appId: universe.social.socialAppId, defaultSender: a.addr, defaultSigner: a.signer },
    graphFactoryParams: { appId: universe.social.graphAppId, defaultSender: a.addr, defaultSigner: a.signer },
    impactFactoryParams: { appId: universe.social.impactAppId, defaultSender: a.addr, defaultSigner: a.signer },
    moderationFactoryParams: { appId: universe.social.moderationAppId, defaultSender: a.addr, defaultSigner: a.signer },
  })

  /** A fresh account, opted into AKTA and funded with it, with social meta. */
  const newUser = async () => {
    const account = await fixture.context.generateAccount({ initialFunds: (100).algo() })
    await algorand.send.assetOptIn({ ...send(account), assetId: akta })
    await algorand.send.assetTransfer({ ...send(deployer), receiver: account.addr, assetId: akta, amount: postFee * 10n + reactFee * 30n })
    const sdk = sdkFor(account)
    await sdk.initMeta({})
    return { account, sdk, address: account.addr.toString() }
  }
  type User = Awaited<ReturnType<typeof newUser>>

  type WalletOpts = { admin?: TransactionSignerAccount; escrow?: string; aktaForMain?: boolean; extraPlugins?: bigint[] }
  /** A factory-created wallet with a global grant of the social plugin, optionally also for an escrow. */
  const makeWallet = async (nickname: string, opts: WalletOpts = {}): Promise<{ w: WalletSDK; escrow?: string }> => {
    const admin = opts.admin ?? deployer
    const w = await newUnregisteredWallet({ walletFactory: universe.walletFactory, ...send(admin), nickname, fund: (20).algo() })
    await addRawPlugin(w, { plugin: plugin.appId }, send(admin))
    for (const extra of opts.extraPlugins ?? []) await addRawPlugin(w, { plugin: extra }, send(admin))
    let escrow: string | undefined
    if (opts.escrow) {
      await addRawPlugin(w, { plugin: plugin.appId, escrow: opts.escrow }, send(admin))
      escrow = (await w.client.state.box.escrows.value(opts.escrow))!.address
      await w.client.send.arc58OptInEscrow({ ...send(admin), args: { escrow: opts.escrow, assets: [akta] }, extraFee: microAlgo(5_000), populateAppCallResources: true })
      await algorand.send.payment({ ...send(deployer), receiver: escrow, amount: (5).algo() })
      await algorand.send.assetTransfer({ ...send(deployer), receiver: escrow, assetId: akta, amount: postFee * 5n + reactFee * 10n })
    }
    if (opts.aktaForMain) {
      await addRawPlugin(w, { plugin: universe.selfOptInPlugin.appId }, send(admin))
      await w.usePlugin({ ...send(admin), callerType: CallerType.Global, calls: [universe.selfOptInPlugin.optIn({ assets: [akta] })] })
      await algorand.send.assetTransfer({ ...send(deployer), receiver: addr(w), assetId: akta, amount: postFee * 5n + reactFee * 20n })
    }
    return { w, escrow }
  }

  const inWindow = (w: WalletSDK, call: PluginSDKReturn, escrow = '', as?: TransactionSignerAccount) =>
    w.usePlugin({ ...(as ? send(as) : {}), escrow, callerType: CallerType.Global, calls: [call] })
  const pluginInitMeta = (user: string) => plugin.initMeta({ user, automated: false, subscriptionIndex: 0n, nfd: 0n, akitaNft: 0n })
  const pluginPost = async () => plugin.post({
    timestamp: await chainTime(), nonce: bytes(24), cid: bytes(36), gateId: 0n, usePayWall: false, payWallId: 0n, creatorFlags: 0n,
  })
  const pluginReply = async (ref: Uint8Array, type: RefType) => plugin.reply({
    timestamp: await chainTime(), nonce: bytes(24), cid: bytes(36), ref, type, gateId: 0n, usePayWall: false, payWallId: 0n, creatorFlags: 0n,
  })

  /** A vote sent straight to AkitaSocial with a hand-set storage payment. */
  const rawVote = (voter: User, ref: Uint8Array, isUp: boolean, amount: bigint) => {
    const social = universe.social.socialClient
    return social.send.votePayAxferByteUint64BoolUint64Void({
      ...send(voter.account), populateAppCallResources: true, coverAppCallInnerTransactionFees: true, maxFee: microAlgo(100_000),
      args: {
        mbrPayment: algorand.createTransaction.payment({ ...send(voter.account), receiver: social.appAddress, amount: microAlgo(amount) }),
        tip: algorand.createTransaction.assetTransfer({ ...send(voter.account), receiver: social.appAddress, assetId: akta, amount: reactFee }),
        ref, type: RefType.Address, isUp, wallet: 0n,
      },
    })
  }

  // Runs `calls` through the DAO wallet with the social plugin installed (DAO-gated moderation methods
  // need the DAO wallet as sender). Same flow as social.e2e.spec.ts.
  let socialPluginInstalledOnDao = false
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const executeAsDao = async (lease: string, calls: any[]) => {
    const dao = universe.dao
    await dao.getWallet()
    const daoWallet = dao.wallet
    if (!socialPluginInstalledOnDao) {
      await proposeAndExecute(algorand, dao, [{
        type: ProposalActionEnum.AddPlugin,
        client: universe.socialPlugin,
        callerType: CallerType.Global,
        sourceLink: 'https://github.com/kylebee/akita-sc',
        useExecutionKey: true,
        fee: DEFAULT_UPDATE_AKITA_DAO_PROPOSAL_CREATION,
        power: DEFAULT_UPDATE_AKITA_DAO_PROPOSAL_POWER,
        duration: DEFAULT_UPDATE_AKITA_DAO_DURATION,
        participation: DEFAULT_UPDATE_AKITA_DAO_PARTICIPATION,
        approval: DEFAULT_UPDATE_AKITA_DAO_APP_APPROVAL,
      }])
      socialPluginInstalledOnDao = true
    }

    const admin = await daoWallet.client.state.global.admin()
    const funding = await getAppFundingNeeded(algorand, admin!, 2_000_000n, 1_000_000n)
    if (funding > 0n) {
      await algorand.send.payment({ sender: deployer.addr, signer: deployer.signer, receiver: admin!, amount: microAlgo(funding) })
    }
    await daoWallet.client.appClient.fundAppAccount({ amount: microAlgo(2_000_000) })

    const execution = await daoWallet.build.usePlugin({
      sender: deployer.addr.toString(),
      signer: deployer.signer,
      lease,
      windowSize: 2000n,
      callerType: CallerType.Global,
      calls,
    })
    const costs = await daoWallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: BigInt(execution.windows.length) })
    await daoWallet.client.appClient.fundAppAccount({ amount: microAlgo(costs.executions + 1_000_000n) })
    await proposeAndExecute(algorand, dao, [{
      type: ProposalActionEnum.ExecutePlugin,
      plugin: universe.socialPlugin.appId,
      caller: deployer.addr.toString(),
      escrow: '',
      executionKey: execution.lease,
      groups: execution.ids,
      firstValid: execution.firstValid,
      lastValid: execution.lastValid,
    }])
    for (const window of execution.windows) await sendPrepared(window, algorand.client.algod)
  }

  /** The DAO adds `account` as a moderator; the moderation app is funded first (it pays for its boxes). */
  const addModerator = async (account: TransactionSignerAccount, lease: string) => {
    await algorand.send.payment({ ...send(deployer), receiver: universe.social.moderationClient.appAddress, amount: microAlgo(1_000_000) })
    await executeAsDao(lease, [universe.socialPlugin.addModerator({ address: account.addr.toString() })])
  }
  const asModerator = (m: TransactionSignerAccount) => ({ sender: m.addr, signer: m.signer, coverAppCallInnerTransactionFees: true, maxFee: microAlgo(10_000) })
  const ban = (m: TransactionSignerAccount, address: string, expiration: bigint) =>
    universe.social.moderationClient.send.ban({ ...asModerator(m), args: { address, expiration } })

  beforeAll(async () => {
    await fixture.newScope()
    algorand = fixture.context.algorand
    const dispenser = await algorand.account.dispenserFromEnvironment()
    deployer = await fixture.context.generateAccount({ initialFunds: microAlgo(2_000_000_000) })
    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (4_000).algo())

    universe = await buildAkitaUniverse({ fixture, sender: deployer.addr, signer: deployer.signer, apps: {} })
    plugin = universe.socialPlugin
    akta = universe.aktaAssetId
    try {
      await universe.social.init()
    } catch {
      // already opted in by the universe
    }
    ;({ postFee, reactFee } = await universe.social.getSocialFees())
    const escrowConfig = (await universe.social.socialClient.state.global.akitaDaoEscrow())!
    daoEscrow = algosdk.getApplicationAddress(escrowConfig.app).toString()

    mod1 = await fixture.context.generateAccount({ initialFunds: (50).algo() })
    mod2 = await fixture.context.generateAccount({ initialFunds: (50).algo() })
    await addModerator(mod1, 'audit08_mod1')
    await addModerator(mod2, 'audit08_mod2')
  }, 900_000)

  test('SOC-01: a tipper is never charged an AKTA opt-in for the creator, however often the creator closes out', async () => {
    // a creator wallet that allows the opt-in plugin and holds no AKTA: every tipper used to pay its opt-in
    const owner = await fixture.context.generateAccount({ initialFunds: (100).algo() })
    const { w: creatorWallet } = await makeWallet('soc01-creator', { admin: owner, extraPlugins: [universe.optInPlugin.appId] })
    await inWindow(creatorWallet, pluginInitMeta(addr(creatorWallet)), '', owner)
    const creator = addr(creatorWallet)
    expect(await holdsAkta(creator)).toBe(false)

    // control: the same wallet, opted into AKTA at its own cost
    const { w: controlWallet } = await makeWallet('soc01-control', { extraPlugins: [universe.optInPlugin.appId], aktaForMain: true })
    await inWindow(controlWallet, pluginInitMeta(addr(controlWallet)))

    // a user wallet that replies through the social plugin
    const { w: tipperWallet } = await makeWallet('soc01-tipper', { aktaForMain: true })
    await inWindow(tipperWallet, pluginInitMeta(addr(tipperWallet)))
    const tipper = addr(tipperWallet)
    const reply = async (ref: Uint8Array) => {
      const before = await algoOf(tipper)
      await inWindow(tipperWallet, await pluginReply(ref, RefType.Address))
      return before - (await algoOf(tipper))
    }

    const control = [await reply(wallOf(addr(controlWallet))), await reply(wallOf(addr(controlWallet))), await reply(wallOf(addr(controlWallet)))]

    const creatorAlgo = await algoOf(creator)
    const daoAkta = await aktaOf(daoEscrow)
    const costs = [await reply(wallOf(creator)), await reply(wallOf(creator)), await reply(wallOf(creator))]

    // the three replies cost what they cost for a creator that holds AKTA: the first one also pays for
    // the wall's empty post, and none of them carries the 100,000 microAlgo opt-in
    expect(costs).toEqual(control)
    expect(costs[1]).toBe(costs[2])
    expect(costs[0]).toBeGreaterThan(costs[1])
    expect(costs[0] - costs[1]).toBeLessThan(OPT_IN_MBR)
    // the creator received no ALGO and was not opted in; its share of each tip went to the DAO
    expect(await algoOf(creator)).toBe(creatorAlgo)
    expect(await holdsAkta(creator)).toBe(false)
    expect((await aktaOf(daoEscrow)) - daoAkta).toBeGreaterThan(0n)

    // direct callers: the storage payment is exact, and one that adds the old opt-in charge is refused
    const first = await newUser()
    const second = await newUser()
    await first.sdk.vote({ ref: wallOf(creator), refType: RefType.Address, isUp: true })
    await expect(rawVote(second, wallOf(creator), true, second.sdk.calculateVoteMBR() + OPT_IN_MBR)).rejects.toThrow(new RegExp(errInvalidPayment))
    await second.sdk.vote({ ref: wallOf(creator), refType: RefType.Address, isUp: true })
    expect(await algoOf(creator)).toBe(creatorAlgo)
    expect(await holdsAkta(creator)).toBe(false)
  }, 600_000)

  test('SOC-02: an address ref with the shape of an asset or app key is refused, so the asset keeps its creator', async () => {
    const alice = await newUser()
    const attacker = await newUser()
    const fan = await newUser()
    const { confirmation } = await algorand.send.assetCreate({ ...send(alice.account), total: 1_000_000n, decimals: 0, assetName: 'target', unitName: 'SOC2' })
    const target = BigInt(confirmation.assetIndex!)

    // the squat: a vote, or a reply, with type = address on the 32 bytes itob(asset) || 0^24
    await expect(attacker.sdk.vote({ ref: idKey(target), refType: RefType.Address, isUp: false })).rejects.toThrow(new RegExp(errReservedRef))
    await expect(attacker.sdk.reply({ cid: bytes(36), ref: idKey(target), refType: RefType.Address })).rejects.toThrow(new RegExp(errReservedRef))
    // the same shape with an app ID
    await expect(attacker.sdk.vote({ ref: idKey(universe.social.socialAppId), refType: RefType.Address, isUp: false })).rejects.toThrow(new RegExp(errReservedRef))
    expect(await universe.social.socialClient.getPostExists({ args: { ref: idKey(target) } })).toBe(false)

    // the asset ref is created by its first real interaction, with its real creator: tips reach her and
    // the checks bound to the creator hold
    const before = await aktaOf(alice.address)
    await fan.sdk.vote({ ref: algosdk.encodeUint64(target), refType: RefType.Asset, isUp: true })
    expect((await aktaOf(alice.address)) - before).toBeGreaterThan(0n)
    expect((await fan.sdk.getPost({ ref: idKey(target) })).creator).toBe(alice.address)
    await expect(alice.sdk.vote({ ref: algosdk.encodeUint64(target), refType: RefType.Asset, isUp: true })).rejects.toThrow(new RegExp(errNoSelfVote))

    // the wall of an ordinary address is unaffected
    await fan.sdk.vote({ ref: wallOf(alice.address), refType: RefType.Address, isUp: true })
    expect((await fan.sdk.getVote({ account: fan.address, ref: wallOf(alice.address) })).isUp).toBe(true)
  }, 600_000)

  test('SOC-03: a ban on a wallet also stops the escrows of that wallet', async () => {
    const author = await newUser()
    const { postKey } = await author.sdk.post({ cid: bytes(36) })

    const { w, escrow } = await makeWallet('soc03-banned', { escrow: 'e', aktaForMain: true })
    await inWindow(w, pluginInitMeta(addr(w)))
    await inWindow(w, pluginInitMeta(escrow!), 'e')

    // before the ban the main account and the escrow both post
    await inWindow(w, await pluginPost())
    await inWindow(w, await pluginPost(), 'e')

    await ban(mod1, addr(w), (await chainTime()) + ONE_YEAR)
    expect(await author.sdk.isBanned({ account: addr(w) })).toBe(true)
    await expect(inWindow(w, await pluginPost())).rejects.toThrow(new RegExp(errBanned))

    // The escrow is another spender of the same wallet and is not itself banned. The ban on the wallet's
    // main account, the principal every escrow window acts for, now stops it too.
    expect(await author.sdk.isBanned({ account: escrow! })).toBe(false)
    await expect(inWindow(w, await pluginPost(), 'e')).rejects.toThrow(new RegExp(errBanned))
    await expect(inWindow(w, await pluginReply(postKey, RefType.Post), 'e')).rejects.toThrow(new RegExp(errBanned))
    await expect(inWindow(w, plugin.vote({ ref: postKey, type: RefType.Post, isUp: false }), 'e')).rejects.toThrow(new RegExp(errBanned))

    // and the escrow writes again once the ban is lifted
    await universe.social.moderationClient.send.unban({ ...asModerator(mod1), args: { address: addr(w) } })
    await inWindow(w, await pluginPost(), 'e')
    await inWindow(w, plugin.vote({ ref: postKey, type: RefType.Post, isUp: false }), 'e')
    expect((await author.sdk.getVote({ account: escrow!, ref: postKey })).isUp).toBe(false)
  }, 600_000)

  test('SOC-04: a vote pays for the votes box whenever it is missing, through the plugin and through the SDK', async () => {
    const social = universe.social.socialClient
    const alice = await newUser()
    const bob = await newUser()
    const carol = await newUser()
    const replier = await newUser()
    const direct = await newUser()

    const { w: first } = await makeWallet('soc04-voter-1', { aktaForMain: true })
    const { w: second } = await makeWallet('soc04-voter-2', { aktaForMain: true })
    for (const w of [first, second]) await inWindow(w, pluginInitMeta(addr(w)))

    // a wall nobody touched: the vote creates its posts box and its votes box
    await inWindow(first, plugin.vote({ ref: wallOf(carol.address), type: RefType.Address, isUp: true }))
    expect((await carol.sdk.getVote({ account: addr(first), ref: wallOf(carol.address) })).isUp).toBe(true)

    // one reply to a wall creates its posts box without a votes box
    for (const owner of [alice, bob]) {
      await replier.sdk.reply({ cid: bytes(36), ref: wallOf(owner.address), refType: RefType.Address })
      expect(await social.getPostExists({ args: { ref: wallOf(owner.address) } })).toBe(true)
      expect(await social.getVotesExist({ args: { ref: wallOf(owner.address) } })).toBe(false)
    }

    // what a plugin vote takes from the wallet it is cast for
    const cost = async (w: WalletSDK, call: PluginSDKReturn) => {
      const before = await algoOf(addr(w))
      await inWindow(w, call)
      return before - (await algoOf(addr(w)))
    }

    // the plugin's quote adds the votes box (it used to quote the vote record alone, and every plugin
    // vote on such a wall failed)
    const withVotesBox = await cost(first, plugin.vote({ ref: wallOf(alice.address), type: RefType.Address, isUp: true }))
    expect((await alice.sdk.getVote({ account: addr(first), ref: wallOf(alice.address) })).isUp).toBe(true)
    expect(await social.getVotesExist({ args: { ref: wallOf(alice.address) } })).toBe(true)

    // and once the votes box exists, the next plugin vote pays for its record alone
    const recordOnly = await cost(second, plugin.vote({ ref: wallOf(alice.address), type: RefType.Address, isUp: false }))
    expect((await alice.sdk.getVote({ account: addr(second), ref: wallOf(alice.address) })).isUp).toBe(false)
    expect(withVotesBox - recordOnly).toBe(VOTES_MBR)

    // the SDK's direct vote reads the same state
    await direct.sdk.vote({ ref: wallOf(bob.address), refType: RefType.Address, isUp: true })
    expect((await bob.sdk.getVote({ account: direct.address, ref: wallOf(bob.address) })).isUp).toBe(true)
  }, 600_000)

  test('SOC-06: a gated wall refuses up-votes and always accepts a down-vote', async () => {
    const owner = await newUser()
    const friend = await newUser()
    const latecomer = await newUser()
    const critic = await newUser()
    const wall = wallOf(owner.address)

    // an early up-vote, then the owner gates the wall (any non-zero gate ID: the gate is not looked up)
    await friend.sdk.vote({ ref: wall, refType: RefType.Address, isUp: true })
    await owner.sdk.updateMeta({ addressGateId: 987_654_321n })

    await expect(latecomer.sdk.vote({ ref: wall, refType: RefType.Address, isUp: true })).rejects.toThrow(new RegExp(errHasGate))
    // the owner of the gate does not decide who may lower the total that feeds the owner's own impact
    await critic.sdk.vote({ ref: wall, refType: RefType.Address, isUp: false })
    expect((await critic.sdk.getVote({ account: critic.address, ref: wall })).isUp).toBe(false)
  }, 600_000)

  test('SOC-07: a moderator cannot be banned by a moderator, and a ban that is already over is refused', async () => {
    const reader = sdkFor(mod1)
    const moderation = universe.social.moderationClient.appAddress.toString()
    const free = async () => (await algoOf(moderation)) - (await minBalanceOf(moderation))
    const actions = async () => (await reader.getModeratorActivity({ user: mod1.addr.toString() })).actions
    const future = (await chainTime()) + ONE_YEAR

    // moderators are removed by the DAO: a ban never took any right from them
    await expect(ban(mod1, mod2.addr.toString(), future)).rejects.toThrow(new RegExp(errCannotBanModerator))
    expect(await reader.isBanned({ account: mod2.addr.toString() })).toBe(false)

    // a ban that ended in the past bans nobody: it is no longer counted as a moderation action and no
    // longer takes a box from the moderation app's balance
    const target = algorand.account.random().addr.toString()
    const actionsBefore = await actions()
    const freeBefore = await free()
    await expect(ban(mod1, target, 1n)).rejects.toThrow(new RegExp(errBanExpired))
    expect(await reader.isBanned({ account: target })).toBe(false)
    expect(await actions()).toBe(actionsBefore)
    expect(await free()).toBe(freeBefore)

    // a ban that ends in the future is stored and counted as before
    await ban(mod1, target, future)
    expect(await reader.isBanned({ account: target })).toBe(true)
    expect((await actions()) - actionsBefore).toBe(1n)
  }, 600_000)

  test('SOC-09: once a wall is gated, an earlier reply on it can no longer be edited without the gate', async () => {
    const social = universe.social.socialClient
    const owner = await newUser()
    const guest = await newUser()
    const wall = wallOf(owner.address)

    const editReply = (amendment: Uint8Array, cid: Uint8Array) => social.send.editReplyPayAxferByte_36Byte_32Uint64Uint64Void({
      ...send(guest.account), populateAppCallResources: true, coverAppCallInnerTransactionFees: true, maxFee: microAlgo(100_000),
      args: {
        mbrPayment: algorand.createTransaction.payment({ ...send(guest.account), receiver: social.appAddress, amount: microAlgo(guest.sdk.calculateReplyMBR(36, true, false)) }),
        tip: algorand.createTransaction.assetTransfer({ ...send(guest.account), receiver: social.appAddress, assetId: akta, amount: reactFee }),
        cid, amendment, creatorFlags: 0n, wallet: 0n,
      },
    })
    const editKeyOf = async (amendment: Uint8Array, cid: Uint8Array) =>
      new Uint8Array(await crypto.subtle.digest('SHA-256', new Uint8Array([...wallOf(guest.address), ...amendment, ...cid])))

    // while the wall is open, a reply and an edit of it are accepted
    const { replyKey } = await guest.sdk.reply({ cid: bytes(36), ref: wall, refType: RefType.Address })
    const cid = bytes(36)
    await editReply(replyKey, cid)
    const firstEdit = await editKeyOf(replyKey, cid)
    expect((await guest.sdk.getPost({ ref: firstEdit })).creator).toBe(guest.address)

    await owner.sdk.updateMeta({ addressGateId: 987_654_321n })

    // new replies are refused, and so is new content through an edit (it used to pass, edit after edit)
    await expect(guest.sdk.reply({ cid: bytes(36), ref: wall, refType: RefType.Address })).rejects.toThrow(new RegExp(errHasGate))
    await expect(editReply(firstEdit, bytes(36))).rejects.toThrow(new RegExp(errHasGate))
  }, 600_000)
})
