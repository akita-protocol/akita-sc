import { Account, Application, BoxMap, Bytes, bytes, Global, GlobalState, gtxn, loggedAssert, op, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod } from '@algorandfoundation/algorand-typescript/arc4'
import { btoi } from '@algorandfoundation/algorand-typescript/op'
import { BoxCostPerByte, Uint64ByteLength } from '../../../utils/constants'
import { NFDGlobalStateKeysName, NFDMetaKeyVerifiedAddresses } from '../../../utils/constants/nfd'
import { getOtherAppList } from '../../../utils/functions'
import { GateGlobalStateKeyCheckShape, GateGlobalStateKeyRegistrationShape, GateGlobalStateKeyRegistryCursor } from '../../constants'
import { errInvalidArgCount, errInvalidPayment, errInvalidRegistryArg } from '../../errors'

// CONTRACT IMPORTS
import { AkitaBaseContract } from '../../../utils/base-contracts/upgradeable'
import type { NFD } from '../../../utils/types/nfd'
import type { NFDRegistry } from '../../../utils/types/nfd-registry'

const MinNFDRootGateRegistryMBR: uint64 = 5_700
/** generous upper bound for a root label (bounds the dot scan) */
const MaxRootLength: uint64 = 64

export class NFDRootGate extends AkitaBaseContract {

  // GLOBAL STATE ---------------------------------------------------------------------------------

  registryCursor = GlobalState<uint64>({ initialValue: 1, key: GateGlobalStateKeyRegistryCursor })

  /** the abi string for the register args */
  registrationShape = GlobalState<string>({ initialValue: 'string', key: GateGlobalStateKeyRegistrationShape })
  /** the abi string for the check args */
  checkShape = GlobalState<string>({ initialValue: 'uint64', key: GateGlobalStateKeyCheckShape })

  // BOXES ----------------------------------------------------------------------------------------

  registry = BoxMap<uint64, string>({ keyPrefix: '' })

  // PRIVATE METHODS ------------------------------------------------------------------------------

  private newRegistryID(): uint64 {
    const id = this.registryCursor.value
    this.registryCursor.value += 1
    return id
  }

  private nfdGate(user: Account, appID: uint64, root: string): boolean {
    const [nfdName, hasName] = op.AppGlobal.getExBytes(appID, Bytes(NFDGlobalStateKeysName))
    if (!hasName) {
      return false
    }

    // audit SG-07: the NFD must be the root itself (`root.algo`) or one of its segments
    // (`<segment>.root.algo`). NFDs have a single segment level, so together with the
    // registry validity check below this proves membership of `root`.
    const exact = Bytes(root).concat(Bytes('.algo'))
    const suffix = Bytes('.').concat(exact)
    const isRoot = nfdName === exact
    const isSegment = nfdName.length > suffix.length
      && nfdName.slice(nfdName.length - suffix.length) === suffix
    if (!isRoot && !isSegment) {
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

  // NFD ROOT GATE METHODS ------------------------------------------------------------------------

  cost(args: bytes): uint64 {
    // key 8 bytes (5_700 incl. base) + ARC-4 string value (2-byte length + root)
    return MinNFDRootGateRegistryMBR + (BoxCostPerByte * (2 + args.length))
  }

  register(mbrPayment: gtxn.PaymentTxn, args: bytes): uint64 {
    // a bare root label: non-empty, no dots, no ".algo" suffix
    loggedAssert(args.length > 0 && args.length <= MaxRootLength, errInvalidArgCount)
    for (let i: uint64 = 0; i < args.length; i += 1) {
      loggedAssert(args.slice(i, i + 1) !== Bytes('.'), errInvalidRegistryArg)
    }
    loggedAssert(mbrPayment.receiver === Global.currentApplicationAddress, errInvalidPayment)
    loggedAssert(mbrPayment.amount === this.cost(args), errInvalidPayment)

    const id = this.newRegistryID()
    this.registry(id).value = String(args)
    return id
  }

  check(caller: Account, registryID: uint64, args: bytes): boolean {
    loggedAssert(args.length === Uint64ByteLength, errInvalidArgCount)
    loggedAssert(this.registry(registryID).exists, errInvalidRegistryArg)
    const root = this.registry(registryID).value
    return this.nfdGate(caller, btoi(args), root)
  }

  @abimethod({ readonly: true })
  getEntry(registryID: uint64): bytes {
    return Bytes(this.registry(registryID).value)
  }
}
