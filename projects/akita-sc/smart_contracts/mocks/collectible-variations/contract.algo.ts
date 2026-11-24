import { Account, Asset, bytes, Contract, contract, Global, GlobalState, itxn, uint64 } from '@algorandfoundation/algorand-typescript'
import { abimethod, Uint32 } from '@algorandfoundation/algorand-typescript/arc4'

/**
 * LocalNet stand-in for an ARC-20 Smart ASA app, for the Collectible Variations tests. It mints an
 * ASA whose manager and clawback are this app, answers get_asset_config with a settable creator
 * (manager_addr), and moves units with its clawback role.
 */
@contract({ avmVersion: 13 })
export class MockSmartAsa extends Contract {
  creator = GlobalState<Account>({ key: 'c' })
  asset = GlobalState<uint64>({ key: 'a' })

  mint(total: uint64, decimals: uint64, creator: Account): uint64 {
    this.creator.value = creator
    const created = itxn
      .assetConfig({
        total,
        decimals: decimals,
        unitName: 'SASA',
        assetName: 'Smart ASA',
        manager: Global.currentApplicationAddress,
        reserve: Global.currentApplicationAddress,
        clawback: Global.currentApplicationAddress,
        fee: 0,
      })
      .submit()
    this.asset.value = created.createdAsset.id
    return created.createdAsset.id
  }

  setCreator(creator: Account): void {
    this.creator.value = creator
  }

  transfer(from: Account, to: Account, amount: uint64): void {
    itxn
      .assetTransfer({ xferAsset: Asset(this.asset.value), assetSender: from, assetReceiver: to, assetAmount: amount, fee: 0 })
      .submit()
  }

  @abimethod({ name: 'get_asset_config', readonly: true, resourceEncoding: 'index' })
  getAssetConfig(asset: Asset): [uint64, Uint32, boolean, string, string, string, bytes, Account, Account, Account, Account] {
    return [
      asset.total,
      new Uint32(asset.decimals),
      false,
      'SASA',
      'Smart ASA',
      '',
      asset.metadataHash,
      this.creator.value,
      Global.currentApplicationAddress,
      Global.zeroAddress,
      Global.currentApplicationAddress,
    ]
  }
}

/** LocalNet delegate for writer admission: answers arcTBD_admit with a settable boolean. */
@contract({ avmVersion: 13 })
export class MockAdmitDelegate extends Contract {
  answer = GlobalState<boolean>({ key: 'y', initialValue: false })

  setAnswer(answer: boolean): void {
    this.answer.value = answer
  }

  @abimethod({ name: 'arcTBD_admit' })
  admit(asset: uint64, writer: Account, slot: bytes, holder: Account): boolean {
    return this.answer.value
  }
}
