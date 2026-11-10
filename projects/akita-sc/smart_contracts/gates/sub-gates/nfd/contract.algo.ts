import { Account, Application, Bytes, bytes, Global, GlobalState, gtxn, loggedAssert, op, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod } from '@algorandfoundation/algorand-typescript/arc4'
import { btoi } from '@algorandfoundation/algorand-typescript/op'
import { Uint64ByteLength } from '../../../utils/constants'
import { NFDGlobalStateKeysName, NFDMetaKeyVerifiedAddresses } from '../../../utils/constants/nfd'
import { getOtherAppList } from '../../../utils/functions'
import { GateGlobalStateKeyCheckShape, GateGlobalStateKeyRegistrationShape } from '../../constants'
import { errInvalidArgCount, errInvalidPayment, errInvalidRegistryArg } from '../../errors'

// CONTRACT IMPORTS
import { AkitaBaseContract } from '../../../utils/base-contracts/upgradeable'
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
    const [nfdName, hasName] = op.AppGlobal.getExBytes(appID, Bytes(NFDGlobalStateKeysName))
    if (!hasName) {
      return false
    }

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

    // audit SG-14: slice takes an end index, so every 32-byte entry is compared
    for (let i: uint64 = 0; i + 32 <= caAlgoData.length; i += 32) {
      if (caAlgoData.slice(i, i + 32) === user.bytes) {
        return true
      }
    }

    return false
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
    loggedAssert(mbrPayment.receiver === Global.currentApplicationAddress, errInvalidPayment)
    loggedAssert(mbrPayment.amount === 0, errInvalidPayment)
    loggedAssert(args.length === 0, errInvalidArgCount)

    return 0
  }

  check(caller: Account, registryID: uint64, args: bytes): boolean {
    loggedAssert(args.length === Uint64ByteLength, errInvalidArgCount)
    loggedAssert(registryID === 0, errInvalidRegistryArg)
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
