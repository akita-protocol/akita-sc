import { Account, Application, Bytes, bytes, Global, GlobalState, gtxn, loggedAssert, op, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod } from '@algorandfoundation/algorand-typescript/arc4'
import { btoi } from '@algorandfoundation/algorand-typescript/op'
import { Uint64ByteLength } from '../../../utils/constants'
import { NFDGlobalStateKeysName, NFDMetaKeyVerifiedAddresses } from '../../../utils/constants/nfd'
import { getOtherAppList } from '../../../utils/functions'
import { GateGlobalStateKeyCheckShape, GateGlobalStateKeyRegistrationShape } from '../../constants'
import { ERR_INVALID_ARG_COUNT, ERR_INVALID_PAYMENT, ERR_INVALID_REGISTRY_ARG } from '../../errors'

// CONTRACT IMPORTS
import { AkitaBaseContract } from '../../../utils/base-contracts/base'
import type { NFD } from '../../../utils/types/nfd'
import type { NFDRegistry } from '../../../utils/types/nfd-registry'

export class NFDGate extends AkitaBaseContract {

  // GLOBAL STATE ---------------------------------------------------------------------------------

  /** the abi string for the register args */
  registrationShape = GlobalState<string>({ initialValue: '', key: GateGlobalStateKeyRegistrationShape })
  /** the abi string for the check args */
  checkShape = GlobalState<string>({ initialValue: 'uint64', key: GateGlobalStateKeyCheckShape })

  // PRIVATE METHODS ------------------------------------------------------------------------------

  private nfdGate(user: Account, appID: uint64): boolean {
    const [nfdName] = op.AppGlobal.getExBytes(appID, Bytes(NFDGlobalStateKeysName))

    const verified = abiCall<typeof NFDRegistry.prototype.isValidNfdAppId>({
      appId: getOtherAppList(this.akitaDAO.value).nfdRegistry,
      args: [String(nfdName), appID],
    }).returnValue

    if (!verified) {
      return false
    }

    const caAlgoData = abiCall<typeof NFD.prototype.readField>({
      appId: appID,
      args: [Bytes(NFDMetaKeyVerifiedAddresses)],
    }).returnValue

    let exists: boolean = false
    for (let i: uint64 = 0; i < caAlgoData.length; i += 32) {
      const addr = caAlgoData.slice(i, 32)
      if (addr === user.bytes) {
        exists = true
      }
    }

    return exists
  }

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(version: string, akitaDAO: uint64): void {
    this.version.value = version
    this.akitaDAO.value = Application(akitaDAO)
  }

  // NFD GATE METHODS -----------------------------------------------------------------------------

  cost(args: bytes): uint64 {
    return 0
  }

  register(mbrPayment: gtxn.PaymentTxn, args: bytes): uint64 {
    loggedAssert(mbrPayment.receiver === Global.currentApplicationAddress, ERR_INVALID_PAYMENT)
    loggedAssert(mbrPayment.amount === 0, ERR_INVALID_PAYMENT)
    loggedAssert(args.length === 0, ERR_INVALID_ARG_COUNT)

    return 0
  }

  check(caller: Account, registryID: uint64, args: bytes): boolean {
    loggedAssert(args.length === Uint64ByteLength, ERR_INVALID_ARG_COUNT)
    loggedAssert(registryID === 0, ERR_INVALID_REGISTRY_ARG)
    return this.nfdGate(caller, btoi(args))
  }

  getCheckShape(shape: uint64): uint64 {
    return shape
  }

  @abimethod({ readonly: true })
  getEntry(registryID: uint64): bytes {
    return op.bzero(0)
  }
}
