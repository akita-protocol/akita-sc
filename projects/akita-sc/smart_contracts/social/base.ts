import { Account, Application, Asset, Bytes, bytes, Contract, Global, uint64 } from "@algorandfoundation/algorand-typescript";
import { abiCall, methodSelector } from "@algorandfoundation/algorand-typescript/arc4";
import { BoxCostPerByte } from "../utils/constants";
import { getAkitaAssets, getOriginAccount, getPluginAppList } from "../utils/functions";
import { ActionsMBR, BannedMBR, BlocksMBR, FollowsMBR, MetaMBR, MinPayWallMBR, MinPostsMBR, ModeratorsMBR, PayWallPayOptionSize, ReactionRecordMBR, ReactionsMBR, RefTypesBaseMBR, TipSendTypeARC58, TipSendTypeDirect, VotelistMBR, VotesMBR } from "./constants";
import { AkitaSocialMBRData, tipMBRInfo, TipSendType, ViewPayWallValue } from "./types";
import { CallerTypeGlobal } from "../arc58/account/types";

// CONTRACT IMPORTS
import type { AbstractedAccount } from "../arc58/account/contract.algo";
import type { OptInPlugin } from "../arc58/plugins/optin/contract.algo";

export class BaseSocial extends Contract {

  mbr(ref: bytes, refTypeName: string, refTypeSchema: bytes): AkitaSocialMBRData {
    return {
      follows: FollowsMBR,
      blocks: BlocksMBR,
      posts: MinPostsMBR + (BoxCostPerByte * ref.length),
      votes: VotesMBR,
      votelist: VotelistMBR,
      reactions: ReactionsMBR,
      reactionlist: ReactionRecordMBR,
      meta: MetaMBR,
      moderators: ModeratorsMBR,
      banned: BannedMBR,
      actions: ActionsMBR,
      // Box key: prefix(1) + uint64(8) = 9 bytes
      // Box value: ARC-4 header(4) + string length(2) + name + bytes length(2) + schema
      refTypes: RefTypesBaseMBR + (BoxCostPerByte * (Bytes(refTypeName).length + Bytes(refTypeSchema).length))
    }
  }

  payWallMbr(paywall: ViewPayWallValue): uint64 {
    return MinPayWallMBR + (
      BoxCostPerByte * (
        PayWallPayOptionSize * (paywall.agentPayInfo.length + paywall.userPayInfo.length)
      )
    )
  }

  protected canCallArc58OptIn(akitaDAO: Application, appId: Application): boolean {
    return abiCall<typeof AbstractedAccount.prototype.arc58_canCall>({
      appId,
      args: [
        getPluginAppList(akitaDAO).optin,
        CallerTypeGlobal,
        Global.zeroAddress,
        '',
        methodSelector<typeof OptInPlugin.prototype.optIn>()
      ]
    }).returnValue
  }

  /**
   * Route of a hinted creator tip; `wallet` is the creator's routing wallet (`tipWallet`, 0 for none).
   * The account that receives the remainder decides it: `creator` when it holds AKTA, else the
   * wallet's origin. An origin without AKTA is opted in through the wallet (the tipper funds the
   * opt-in MBR) when the wallet allows the opt-in plugin; a direct tip to an account without AKTA
   * goes to the DAO.
   */
  protected tipRoute(akitaDAO: Application, creator: Account, wallet: Application): { type: TipSendType, arc58: uint64, receiver: Account } {
    const akta = Asset(getAkitaAssets(akitaDAO).akta)

    if (wallet.id === 0 || creator.isOptedIn(akta)) {
      return { type: TipSendTypeDirect, arc58: 0, receiver: creator }
    }

    const origin = getOriginAccount(wallet)
    if (!origin.isOptedIn(akta) && this.canCallArc58OptIn(akitaDAO, wallet)) {
      return { type: TipSendTypeARC58, arc58: Global.assetOptInMinBalance, receiver: origin }
    }

    return { type: TipSendTypeDirect, arc58: 0, receiver: origin }
  }

  /** Deployed tip route, decided on `creator` (legacy shims and the deployed plugins' quotes). */
  checkTipMbrRequirements(akitaDAO: Application, creator: Account, wallet: Application): tipMBRInfo {
    const akta = Asset(getAkitaAssets(akitaDAO).akta)

    if (wallet.id !== 0 && !creator.isOptedIn(akta)) {
      const canCallArc58OptIn = this.canCallArc58OptIn(akitaDAO, wallet)
      if (canCallArc58OptIn) {
        return {
          type: TipSendTypeARC58,
          arc58: Global.assetOptInMinBalance
        }
      }
    }

    return {
      type: TipSendTypeDirect,
      arc58: 0
    }
  }
}
