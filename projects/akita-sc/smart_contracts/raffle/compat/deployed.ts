/**
 * Deployed-bytecode compatibility fixtures for Raffle (principal-resolution spec §7.1). See
 * `auction/compat/deployed.ts` for the approach. `compat/deployed/*.arc56.json` are the committed
 * artifacts at HEAD (`e7f174ee`), byte-identical to MainNet (sha256 asserted by
 * `auction/compat/deployed.test.ts`):
 *
 * | artifact       | MainNet                                     |
 * |----------------|---------------------------------------------|
 * | RaffleFactory  | 3569557743 (no `minEntries`, no cost method)|
 * | Raffle (child) | box `bc` of 3569557743 (gates on Txn.sender)|
 * | RafflePlugin   | 3569561863 (May 2026 generation)            |
 */
import { microAlgo, type AlgorandClient } from '@algorandfoundation/algokit-utils'
import type { Arc56Contract } from '@algorandfoundation/algokit-utils/types/app-arc56'
import type { AppClient } from '@algorandfoundation/algokit-utils/types/app-client'
import { getApplicationAddress } from 'algosdk'
import { AuctionFactoryClient } from '../../artifacts/auction/AuctionFactoryClient'
import { boxedChildMbr, clientOf, createFromSpec, loadBoxedChild, programsOf, type LegacyFactoryParams, type Sender } from '../../auction/compat/deployed'
import RaffleFactorySpec from './deployed/RaffleFactory.arc56.json'
import RaffleSpec from './deployed/Raffle.arc56.json'
import RafflePluginSpec from './deployed/RafflePlugin.arc56.json'

export const DEPLOYED_RAFFLE = {
  factory: { spec: RaffleFactorySpec as unknown as Arc56Contract, mainnetId: 3569557743n, sha256: '4b3e8a2ca9ea9e18c1cca12241e6e687a5857148ae93b30e6c2e56e510aff408' },
  child: { spec: RaffleSpec as unknown as Arc56Contract, mainnetId: 3569557743n, sha256: '61d57eb07cc9f30ab2cc39ea0582d4c87720ada1e4d88bd34a111c97d81356de' },
  plugin: { spec: RafflePluginSpec as unknown as Arc56Contract, mainnetId: 3569561863n, sha256: '2755a533147af88d387a5587099d6dadad008a12039b19cf114e52b5841f3877' },
} as const

/**
 * The deployed factory's creation methods (no `minEntries`, no hint). The upgraded factory does NOT
 * route them (Kyle decision K6, 2026-10-04: no legacy creation shims).
 */
export const DEPLOYED_NEW_RAFFLE = 'newRaffle(pay,axfer,uint64,uint64,uint64,uint64,uint64,uint64,address,string,byte[32][],uint64)uint64'
export const DEPLOYED_NEW_PRIZE_BOX_RAFFLE = 'newPrizeBoxRaffle(appl,pay,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64'

/**
 * The DEPLOYED RaffleFactory (MainNet 3569557743 bytecode) with the deployed child loaded. It shares
 * `initBoxedContract`/`loadBoxedContract`/`optIn`/`optInCost` selectors with every factory, so those
 * go through a typed factory client; `newRaffle` goes through the vendored spec (`clientOf`).
 */
export async function deployLegacyRaffleFactory({ algorand, sender, signer, dao, daoEscrow }: LegacyFactoryParams): Promise<{ appId: bigint; boxed: AuctionFactoryClient; app: AppClient }> {
  const appId = await createFromSpec(
    algorand,
    DEPLOYED_RAFFLE.factory.spec,
    { sender, signer },
    'create(string,string,uint64,(string,uint64))void',
    ['legacy', 'legacy-child', dao, [daoEscrow.name, daoEscrow.app]],
    3,
  )
  const boxed = algorand.client.getTypedAppClientById(AuctionFactoryClient, { appId, defaultSender: sender, defaultSigner: signer })
  const { approval } = programsOf(DEPLOYED_RAFFLE.child.spec)
  await algorand.send.payment({ sender, signer, receiver: getApplicationAddress(appId), amount: microAlgo(100_000n + boxedChildMbr(approval.length)) })
  await loadBoxedChild(boxed, approval, 'legacy-child', { sender, signer })
  return { appId, boxed, app: clientOf(algorand, DEPLOYED_RAFFLE.factory.spec, appId, { sender, signer }) }
}

/**
 * Exact `newRaffle` payment of the DEPLOYED factory, which has no cost method: the HEAD SDK mirror
 * (`git show e7f174ee:projects/akita-sdk/src/raffle/factory.ts`, `cost()`), ALGO tickets, ASA prize.
 * `prizeRewardsOptInCost` is 100,000 unless the rewards app already holds the prize asset.
 */
export function deployedRaffleCost({ raffleCreationFee, weightsListCount, prizeRewardsOptInCost }: { raffleCreationFee: bigint; weightsListCount: bigint; prizeRewardsOptInCost: bigint }): bigint {
  const baseCost = 1_448_500n // 400_000 pages + 28_500 * 21 uints + 50_000 * 9 bytes
  const minBalance = 100_000n
  const optinMbr = 100_000n // the prize asset
  const perDisbursement = 67_000n
  const disbursementMbr = perDisbursement + prizeRewardsOptInCost + perDisbursement
  return raffleCreationFee + baseCost + minBalance + optinMbr + disbursementMbr + weightsListCount * 13_113_300n
}

/** The DEPLOYED RafflePlugin (MainNet 3569561863 bytecode), pinned to `factory`. */
export async function deployLegacyRafflePlugin(algorand: AlgorandClient, factory: bigint, from: Sender): Promise<AppClient> {
  const appId = await createFromSpec(algorand, DEPLOYED_RAFFLE.plugin.spec, from, 'create(string,uint64)void', ['legacy', factory], 1)
  return clientOf(algorand, DEPLOYED_RAFFLE.plugin.spec, appId, from)
}
