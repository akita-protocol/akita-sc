import { Application, Bytes, Global, GlobalState, loggedAssert, op, Txn } from '@algorandfoundation/algorand-typescript'
import { abimethod, Contract, decodeArc4 } from '@algorandfoundation/algorand-typescript/arc4'
import { AkitaDAOGlobalStateKeysWallet, AkitaDAOGlobalStateKeysPluginAppList } from '../../arc58/dao/constants'
import { PluginAppList } from '../../arc58/dao/types'
import { GlobalStateKeyAkitaDAO, GlobalStateKeyVersion } from '../../constants'
import { errNotAkitaDao, errInvalidUpgrade } from '../../errors'

// Keep upgrade authorization independent of application-specific helpers.
export class AkitaBaseContract extends Contract {

  // GLOBAL STATE ---------------------------------------------------------------------------------

  /** the current version of the contract */
  version = GlobalState<string>({ key: GlobalStateKeyVersion })
  /** the app ID of the Akita DAO */
  akitaDAO = GlobalState<Application>({ key: GlobalStateKeyAkitaDAO })

  protected getAkitaDAOWallet(): Application {
    const [walletID] = op.AppGlobal.getExUint64(this.akitaDAO.value, Bytes(AkitaDAOGlobalStateKeysWallet))
    return Application(walletID)
  }

  // AKITA BASE CONTRACT METHODS ------------------------------------------------------------------

  updateAkitaDAO(akitaDAO: Application): void {
    loggedAssert(Txn.sender === this.getAkitaDAOWallet().address, errNotAkitaDao)
    this.akitaDAO.value = akitaDAO
  }

  opUp(): void { }
}

export class UpgradeableAkitaBaseContract extends AkitaBaseContract {

  @abimethod({ allowActions: ['UpdateApplication'] })
  update(newVersion: string): void {
    loggedAssert(Txn.sender === this.getAkitaDAOWallet().address, errNotAkitaDao)
    const [plugins] = op.AppGlobal.getExBytes(this.akitaDAO.value, Bytes(AkitaDAOGlobalStateKeysPluginAppList))
    const updatePlugin = decodeArc4<PluginAppList>(plugins).update
    loggedAssert(Global.callerApplicationId === updatePlugin, errInvalidUpgrade)
    this.version.value = newVersion
  }
}

