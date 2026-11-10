/**
 * AkitaSocialImpact.refreshNFD: anyone may re-cache another account's already-assigned NFD after it
 * changes, and only the NFD's change time and score move.
 */
import * as algokit from '@algorandfoundation/algokit-utils'
import { microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import type { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { SocialSDK } from 'akita-sdk/social'
import { beforeAll, describe, expect, test } from 'vitest'
import { AkitaUniverse, buildAkitaUniverse } from '../../tests/fixtures/dao'
import { MockGateNfdRegistryFactory } from '../artifacts/mocks/gate/MockGateNFDRegistryClient'
import { MockImpactNfdClient, MockImpactNfdFactory } from '../artifacts/mocks/impact-nfd/MockImpactNFDClient'
import { AkitaSocialImpactClient } from '../artifacts/social/AkitaSocialImpactClient'
import { errInvalidNfd, errUserDoesNotOwnNfd } from './errors'

algokit.Config.configure({ populateAppCallResources: true })

const fixture = algorandFixture()
const SEND = { populateAppCallResources: true, coverAppCallInnerTransactionFees: true, maxFee: microAlgo(100_000) } as const

describe('AkitaSocialImpact.refreshNFD', () => {
  let algorand: algokit.AlgorandClient
  let deployer: TransactionSignerAccount
  let owner: TransactionSignerAccount
  let stranger: TransactionSignerAccount
  let universe: AkitaUniverse
  let nfd: MockImpactNfdClient
  let impactAs: (who: TransactionSignerAccount) => AkitaSocialImpactClient

  const packed = (...who: TransactionSignerAccount[]) => {
    const out = new Uint8Array(32 * who.length)
    who.forEach((w, i) => out.set(w.addr.publicKey, i * 32))
    return out
  }
  const meta = () => impactAs(stranger).state.box.meta.value(owner.addr.toString())
  const nfdImpactOf = async (who: TransactionSignerAccount) =>
    (await impactAs(stranger).send.getUserImpact({ args: { address: who.addr.toString() }, ...SEND })).return!
  const refreshAs = (who: TransactionSignerAccount, address: string) =>
    impactAs(who).send.refreshNfd({ args: { address }, ...SEND })

  beforeAll(async () => {
    await fixture.newScope()
    algorand = fixture.context.algorand
    const dispenser = await algorand.account.dispenserFromEnvironment()
    deployer = await fixture.context.generateAccount({ initialFunds: microAlgo(2_000_000_000) })
    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (2_000).algo())
    owner = await fixture.context.generateAccount({ initialFunds: (100).algo() })
    stranger = await fixture.context.generateAccount({ initialFunds: (100).algo() })

    const { appClient: registry } = await algorand.client
      .getTypedAppFactory(MockGateNfdRegistryFactory, { defaultSender: deployer.addr, defaultSigner: deployer.signer })
      .send.create.bare()
    universe = await buildAkitaUniverse({ fixture, sender: deployer.addr, signer: deployer.signer, apps: { nfdRegistry: registry.appId } })

    nfd = (await algorand.client
      .getTypedAppFactory(MockImpactNfdFactory, { defaultSender: deployer.addr, defaultSigner: deployer.signer })
      .send.create.create({ args: { name: 'owner.algo', verified: packed(owner), timeChanged: 1_000n } })).appClient

    impactAs = (who) => algorand.client.getTypedAppClientById(AkitaSocialImpactClient, {
      appId: universe.social.impactAppId, defaultSender: who.addr, defaultSigner: who.signer,
    })

    const ownerSdk = new SocialSDK({
      algorand,
      daoAppId: universe.dao.client.appId,
      socialFactoryParams: { appId: universe.social.socialAppId, defaultSender: owner.addr, defaultSigner: owner.signer },
      graphFactoryParams: { appId: universe.social.graphAppId, defaultSender: owner.addr, defaultSigner: owner.signer },
      impactFactoryParams: { appId: universe.social.impactAppId, defaultSender: owner.addr, defaultSigner: owner.signer },
      moderationFactoryParams: { appId: universe.social.moderationAppId, defaultSender: owner.addr, defaultSigner: owner.signer },
    })
    await ownerSdk.initMeta({ nfd: nfd.appId })
  }, 1_800_000)

  test('the owner caches the NFD at its current change time', async () => {
    expect(await meta()).toMatchObject({ nfd: nfd.appId, nfdTimeChanged: 1_000n, subscriptionIndex: 0n, akitaNft: 0n })
  })

  test('a stranger restores a changed NFD score, and nothing else in the meta moves', async () => {
    const before = await meta()
    const scoreBefore = await nfdImpactOf(owner)

    await nfd.send.change({ args: { verified: packed(stranger, owner), timeChanged: 2_000n } })
    expect(await nfdImpactOf(owner)).toBe(scoreBefore - before.nfdImpact)

    await refreshAs(stranger, owner.addr.toString())

    expect(await meta()).toEqual({ ...before, nfdTimeChanged: 2_000n })
    expect(await nfdImpactOf(owner)).toBe(scoreBefore)
  })

  test('refreshing an NFD that has not changed is a no-op', async () => {
    const before = await meta()
    await refreshAs(stranger, owner.addr.toString())
    expect(await meta()).toEqual(before)
  })

  test('an NFD the owner is no longer verified on cannot be refreshed', async () => {
    await nfd.send.change({ args: { verified: packed(stranger), timeChanged: 3_000n } })
    await expect(refreshAs(stranger, owner.addr.toString())).rejects.toThrow(new RegExp(errUserDoesNotOwnNfd))
    expect((await meta()).nfdTimeChanged).toBe(2_000n)
  })

  test('an account with no cached NFD cannot be refreshed', async () => {
    await expect(refreshAs(owner, stranger.addr.toString())).rejects.toThrow()

    const noNfdSdk = new SocialSDK({
      algorand,
      daoAppId: universe.dao.client.appId,
      socialFactoryParams: { appId: universe.social.socialAppId, defaultSender: stranger.addr, defaultSigner: stranger.signer },
      graphFactoryParams: { appId: universe.social.graphAppId, defaultSender: stranger.addr, defaultSigner: stranger.signer },
      impactFactoryParams: { appId: universe.social.impactAppId, defaultSender: stranger.addr, defaultSigner: stranger.signer },
      moderationFactoryParams: { appId: universe.social.moderationAppId, defaultSender: stranger.addr, defaultSigner: stranger.signer },
    })
    await noNfdSdk.initMeta({})
    await expect(refreshAs(owner, stranger.addr.toString())).rejects.toThrow(new RegExp(errInvalidNfd))
  })
})
