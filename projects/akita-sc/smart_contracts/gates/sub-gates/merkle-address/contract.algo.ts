import { Account, Application, BoxMap, bytes, clone, GlobalState, gtxn, loggedAssert, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod, decodeArc4, encodeArc4 } from '@algorandfoundation/algorand-typescript/arc4'
import { Global, sha256 } from '@algorandfoundation/algorand-typescript/op'
import { MerkleTreeTypeUnspecified } from '../../../meta/constants'
import { BoxCostPerBox } from '../../../utils/constants'
import { getAkitaAppList } from '../../../utils/functions'
import { Proof } from '../../../utils/types/merkles'
import { GateGlobalStateKeyCheckShape, GateGlobalStateKeyRegistrationShape, GateGlobalStateKeyRegistryCursor, MinMetaMerkleRegistryMBR } from '../../constants'
import { errInvalidArgCount, errInvalidPayment } from '../../errors'

// CONTRACT IMPORTS
import type { Meta } from '../../../meta/contract.algo'
import { AkitaBaseContract } from '../../../utils/base-contracts/upgradeable'

type MerkleAddressGateRegistryInfo = {
  creator: Account
  name: string
}

/** [creator: 32][name: 2+2+length] */
const MinRegisterArgsLength: uint64 = 35
/** [proof: 2+(32*length)]; an empty proof (single-leaf tree) and a one-node proof are valid */
const MinCheckArgsLength: uint64 = 2

export class MerkleAddressGate extends AkitaBaseContract {

  // GLOBAL STATE ---------------------------------------------------------------------------------

  registryCursor = GlobalState<uint64>({ initialValue: 1, key: GateGlobalStateKeyRegistryCursor })
  /** the abi string for the register args */
  registrationShape = GlobalState<string>({ initialValue: '(address,string)', key: GateGlobalStateKeyRegistrationShape })
  /** the abi string for the check args */
  checkShape = GlobalState<string>({ initialValue: 'byte[32][]', key: GateGlobalStateKeyCheckShape })

  // BOXES ----------------------------------------------------------------------------------------

  registry = BoxMap<uint64, MerkleAddressGateRegistryInfo>({ keyPrefix: '' })

  // PRIVATE METHODS ------------------------------------------------------------------------------

  private newRegistryID(): uint64 {
    const id = this.registryCursor.value
    this.registryCursor.value += 1
    return id
  }

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(version: string, akitaDAO: uint64): void {
    this.version.value = version
    this.akitaDAO.value = Application(akitaDAO)
    this.registryCursor.value = 1
  }

  // MERKLE ADDRESS GATE METHODS ------------------------------------------------------------------

  cost(args: bytes): uint64 {
    loggedAssert(args.length >= MinRegisterArgsLength, errInvalidArgCount)
    return MinMetaMerkleRegistryMBR + (BoxCostPerBox * (args.length - 32))
  }

  register(mbrPayment: gtxn.PaymentTxn, args: bytes): uint64 {
    loggedAssert(args.length >= MinRegisterArgsLength, errInvalidArgCount)
    loggedAssert(mbrPayment.receiver === Global.currentApplicationAddress, errInvalidPayment)
    loggedAssert(mbrPayment.amount === this.cost(args), errInvalidPayment)

    const id = this.newRegistryID()
    this.registry(id).value = decodeArc4<MerkleAddressGateRegistryInfo>(args)
    return id
  }

  check(caller: Account, registryID: uint64, args: bytes): boolean {
    loggedAssert(args.length >= MinCheckArgsLength, errInvalidArgCount)
    const proof = decodeArc4<Proof>(args)
    const { creator, name } = clone(this.registry(registryID).value)

    return abiCall<typeof Meta.prototype.verify>({
      appId: getAkitaAppList(this.akitaDAO.value).metaMerkles,
      args: [
        creator,
        name,
        sha256(sha256(caller.bytes)),
        proof,
        MerkleTreeTypeUnspecified,
      ],
    }).returnValue
  }

  getRegistrationShape(shape: MerkleAddressGateRegistryInfo): MerkleAddressGateRegistryInfo {
    return shape
  }

  getCheckShape(shape: Proof): Proof {
    return shape
  }

  @abimethod({ readonly: true })
  getEntry(registryID: uint64): bytes {
    return encodeArc4(this.registry(registryID).value)
  }
}
