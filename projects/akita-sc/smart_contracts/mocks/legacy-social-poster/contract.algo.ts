import { Application, bytes, itxn, op, uint64 } from '@algorandfoundation/algorand-typescript'
import { Contract, methodSelector } from '@algorandfoundation/algorand-typescript/arc4'
import { getControlledSpendingAccount, rekeyAddress } from '../../utils/functions'

/**
 * TEST-ONLY (compat suite B1). Installable ARC-58 plugin that sends AkitaSocial's LEGACY `post`
 * selector (the one `SocialPlugin.v0.0.2` calls, 0x8e507f1b) as the wallet's spending account, with a
 * caller-chosen MBR payment. The suite uses it to measure the exact amount the legacy shim requires
 * for a referred wallet, which the deployed v0.0.2 plugin cannot be made to send. On LocalNet the shim
 * grants the legacy payment terms to any app caller, so this mock gets the same terms as v0.0.2.
 * Never deploy outside tests.
 */
export class MockLegacySocialPoster extends Contract {
  /** [pay(mbr) -> social, axfer(tip akta) -> social, social.post(...) legacy selector], all as S. */
  post(
    wallet: Application,
    rekeyBack: boolean,
    social: Application,
    akta: uint64,
    tip: uint64,
    mbr: uint64,
    timestamp: uint64,
    nonce: bytes<24>,
    cid: bytes<36>
  ): void {
    const sender = getControlledSpendingAccount(wallet)
    itxn.submitGroup(
      itxn.payment({ sender, receiver: social.address, amount: mbr }),
      itxn.assetTransfer({ sender, assetReceiver: social.address, xferAsset: akta, assetAmount: tip }),
      itxn.applicationCall({
        sender,
        appId: social,
        appArgs: [
          methodSelector('post(pay,axfer,uint64,byte[24],byte[36],uint64,bool,uint64,uint64)void'),
          op.itob(timestamp),
          nonce,
          cid,
          op.itob(0), // gateID
          op.bzero(1), // usePayWall = false
          op.itob(0), // payWallID
          op.itob(0), // creatorFlags
        ],
        rekeyTo: rekeyAddress(rekeyBack, wallet),
      })
    )
  }
}
