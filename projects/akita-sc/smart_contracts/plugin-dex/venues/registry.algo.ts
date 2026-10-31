import { Account, Application, Contract, contract, GlobalState, loggedAssert, op, Txn, uint64 } from '@algorandfoundation/algorand-typescript'
import { abimethod, decodeArc4, encodeArc4 } from '@algorandfoundation/algorand-typescript/arc4'
import { AdapterEnabled } from '../../arc58/plugins/akita-router/constants'
import { errRtAdapter, errRtAdapterVer, errRtAdmin } from '../../arc58/plugins/akita-router/errors'
import { AdapterInfo } from '../../arc58/plugins/akita-router/types'

/**
 * Approved venue adapters (router.md §4.4, FINAL-SPEC §2.1). Immutable code, admin = DAO wallet.
 *
 * Entries live in global state under the key itob(adapterAppId) with the ARC-4 encoded AdapterInfo
 * (32 B) as the value, so the router and any hook can read them with `AppGlobal.getExBytes` and no
 * inner call (`readAdapter`). Capacity: 63 adapters (64 byte-slice slots minus `admin`).
 *
 * Each entry pins the adapter's Application.version; an adapter updated after approval is unusable
 * until the admin approves the new version (callers also set rejectVersion = version + 1).
 */
@contract({ avmVersion: 13, stateTotals: { globalBytes: 64, globalUints: 0 } })
export class VenueRegistry extends Contract {
  admin = GlobalState<Account>({ key: 'admin' })

  @abimethod({ onCreate: 'require' })
  create(admin: Account): void {
    this.admin.value = admin
  }

  private requireAdmin(): void {
    loggedAssert(Txn.sender === this.admin.value, errRtAdmin)
  }

  setAdmin(admin: Account): void {
    this.requireAdmin()
    this.admin.value = admin
  }

  /** approve (or re-approve) an adapter; `info.version` is the pinned Application.version */
  setAdapter(adapter: uint64, info: AdapterInfo): void {
    this.requireAdmin()
    loggedAssert(adapter !== 0, errRtAdapter)
    op.AppGlobal.put(op.itob(adapter), encodeArc4(info))
  }

  removeAdapter(adapter: uint64): void {
    this.requireAdmin()
    op.AppGlobal.delete(op.itob(adapter))
  }

  /** the registry entry as stored (no enabled/version checks); fails if absent */
  @abimethod({ readonly: true })
  getAdapter(adapter: uint64): AdapterInfo {
    const [raw, exists] = op.AppGlobal.getExBytes(Txn.applicationId, op.itob(adapter))
    loggedAssert(exists, errRtAdapter)
    return decodeArc4<AdapterInfo>(raw)
  }
}

/**
 * Reader used by the router (and by any hook that calls adapters): zero inner txns. Requires the
 * entry to exist and be enabled, and the adapter's current version to equal the pinned one.
 */
export function readAdapter(registry: Application, adapter: uint64): AdapterInfo {
  const [raw, exists] = op.AppGlobal.getExBytes(registry, op.itob(adapter))
  loggedAssert(exists, errRtAdapter)
  const info = decodeArc4<AdapterInfo>(raw)
  loggedAssert((info.flags & AdapterEnabled) !== 0, errRtAdapter)
  loggedAssert(Application(adapter).version === info.version, errRtAdapterVer)
  return info
}
