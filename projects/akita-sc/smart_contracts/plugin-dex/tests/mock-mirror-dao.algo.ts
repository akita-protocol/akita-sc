import { Application, Bytes, bytes, clone, Contract, GlobalState, op, uint64 } from '@algorandfoundation/algorand-typescript'
import { abimethod } from '@algorandfoundation/algorand-typescript/arc4'
import {
  AkitaDAOGlobalStateKeysAkitaAppList,
  AkitaDAOGlobalStateKeysAkitaAssets,
  AkitaDAOGlobalStateKeysAkitaSocialAppList,
  AkitaDAOGlobalStateKeysWallet,
} from '../../arc58/dao/constants'
import { AkitaAppList } from '../../arc58/dao/types'
import { getAkitaAppList } from '../../utils/functions'

/**
 * TEST-ONLY. A DAO stand-in for GatedFeeHook principal tests (principal-resolution spec §6.12): it mirrors the
 * four DAO globals the hook reads (`aal`, `sal`, `akita_assets`, `wallet`) from a real `source` DAO, with two
 * overrides: `AkitaAppList.wallet` names the REAL AbstractedAccountFactory (so ARC-58 wallets it created are
 * genuine), and `wallet` (the DAO's ARC-58 wallet, the hook's admin) names a test-controlled account. A real
 * DAO cannot have both: `AkitaDAO.setup` creates the DAO wallet through `AkitaAppList.wallet` itself.
 * Never deploy outside tests.
 */
export class MockMirrorDAO extends Contract {
  akitaAppList = GlobalState<AkitaAppList>({ key: AkitaDAOGlobalStateKeysAkitaAppList })
  socialAppList = GlobalState<bytes>({ key: AkitaDAOGlobalStateKeysAkitaSocialAppList })
  akitaAssets = GlobalState<bytes>({ key: AkitaDAOGlobalStateKeysAkitaAssets })
  wallet = GlobalState<uint64>({ key: AkitaDAOGlobalStateKeysWallet })

  @abimethod({ onCreate: 'require' })
  create(source: Application, walletFactory: uint64, daoWallet: uint64): void {
    const list = clone(getAkitaAppList(source))
    list.wallet = walletFactory
    this.akitaAppList.value = clone(list)
    const [social] = op.AppGlobal.getExBytes(source, Bytes(AkitaDAOGlobalStateKeysAkitaSocialAppList))
    this.socialAppList.value = social
    const [assets] = op.AppGlobal.getExBytes(source, Bytes(AkitaDAOGlobalStateKeysAkitaAssets))
    this.akitaAssets.value = assets
    this.wallet.value = daoWallet
  }
}
