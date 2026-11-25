import {
  Account,
  Application,
  Asset,
  BaseContract,
  Bytes,
  bytes,
  Contract,
  contract,
  Global,
  GlobalState,
  itxn,
  log,
  op,
  Txn,
  uint64,
} from '@algorandfoundation/algorand-typescript'
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

/** LocalNet delegate for writer admission: answers admit with a settable boolean. */
@contract({ avmVersion: 13 })
export class MockAdmitDelegate extends Contract {
  answer = GlobalState<boolean>({ key: 'y', initialValue: false })

  setAnswer(answer: boolean): void {
    this.answer.value = answer
  }

  @abimethod()
  admit(asset: uint64, writer: Account, slot: bytes, holder: Account): boolean {
    return this.answer.value
  }
}

/**
 * LocalNet delegate that misbehaves: mode 1 fails the call, any other mode answers with a
 * malformed ARC-4 bool (0x01 instead of 0x80). Set the mode with app args ["mode", itob(n)].
 */
@contract({ avmVersion: 13, stateTotals: { globalUints: 1 } })
export class MockOddDelegate extends BaseContract {
  approvalProgram(): boolean {
    if (Txn.applicationId.id === 0) return true
    if (Txn.numAppArgs === 2 && Txn.applicationArgs(0) === Bytes('mode')) {
      op.AppGlobal.put(Bytes('m'), op.btoi(Txn.applicationArgs(1)))
      return true
    }
    if (op.AppGlobal.getUint64(Bytes('m')) === 1) return false
    log(Bytes.fromHex('151f7c7501'))
    return true
  }

  clearStateProgram(): boolean {
    return true
  }
}

/**
 * LocalNet contract caller: pays a registry deposit and makes the registry call in one inner
 * group, the way a wallet plugin would. `arg` is one ABI byte[] argument (sent length-prefixed);
 * with `hasArg` false the call carries the selector only.
 */
@contract({ avmVersion: 13 })
export class MockRegistryCaller extends Contract {
  payAndCall(registry: Application, deposit: uint64, selector: bytes<4>, hasArg: boolean, arg: bytes): void {
    const encoded = op.itob(arg.length).slice(6, 8).concat(arg)
    if (deposit > 0) {
      if (hasArg) {
        itxn.submitGroup(
          itxn.payment({ receiver: registry.address, amount: deposit, fee: 0 }),
          itxn.applicationCall({ appId: registry, appArgs: [selector, encoded], fee: 0 }),
        )
      } else {
        itxn.submitGroup(
          itxn.payment({ receiver: registry.address, amount: deposit, fee: 0 }),
          itxn.applicationCall({ appId: registry, appArgs: [selector], fee: 0 }),
        )
      }
    } else if (hasArg) {
      itxn.applicationCall({ appId: registry, appArgs: [selector, encoded], fee: 0 }).submit()
    } else {
      itxn.applicationCall({ appId: registry, appArgs: [selector], fee: 0 }).submit()
    }
  }
}
