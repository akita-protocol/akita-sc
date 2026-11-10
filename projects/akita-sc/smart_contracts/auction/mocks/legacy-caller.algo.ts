import { Account, Application, Asset, Contract, itxn, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall } from '@algorandfoundation/algorand-typescript/arc4'
import { getControlledSpendingAccount, rekeyAddress } from '../../utils/functions'

// CONTRACT IMPORTS
import type { AuctionFactory } from '../factory.algo'

/**
 * TEST-ONLY. Never deploy outside tests.
 *
 * An installable ARC-58 plugin that creates auctions through the LEGACY (pre-principal) factory
 * selector, as an old plugin generation would, but pays the factory-quoted cost (`newAuctionCost`).
 * It exists for P2-REF-01 (principal-resolution spec §7.5): the deployed MainNet plugin (3569561141)
 * computes the creation cost locally and never matched the deployed factory (audit AR-12), so its
 * creation path cannot exercise the legacy shim. The shim under test resolves `seller_referrer` from
 * the EscrowFactory registry of the spending account, which only an app (a wallet window) can be
 * registered for.
 *
 * Raffle has no legacy creation shim any more (Kyle decision K6, 2026-10-04), so this mock no longer
 * creates raffles.
 */
export class MockLegacyNftCaller extends Contract {
  /** legacy `newAuction(...)uint64` (13 args): ALGO bids, no bid fee, no gate */
  newAuction(
    wallet: Application,
    rekeyBack: boolean,
    factory: Application,
    prizeID: uint64,
    startTimestamp: uint64,
    endTimestamp: uint64,
    marketplace: Account
  ): uint64 {
    const sender = getControlledSpendingAccount(wallet)

    const cost = abiCall<typeof AuctionFactory.prototype.newAuctionCost>({
      appId: factory,
      args: [false, 0, prizeID, 0],
    }).returnValue

    return abiCall<typeof AuctionFactory.prototype.legacyNewAuction>({
      sender,
      appId: factory,
      args: [
        itxn.payment({ sender, receiver: factory.address, amount: cost }),
        itxn.assetTransfer({ sender, assetReceiver: factory.address, assetAmount: 1, xferAsset: Asset(prizeID) }),
        '',
        [],
        0,
        0,
        1_000_000,
        100_000,
        startTimestamp,
        endTimestamp,
        0,
        marketplace,
        0,
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    }).returnValue
  }

}
