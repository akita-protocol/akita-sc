import { Account, Application, BoxMap, bytes, clone, GlobalState, gtxn, loggedAssert, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod, decodeArc4, encodeArc4 } from '@algorandfoundation/algorand-typescript/arc4'
import { AssetHolding, Global, itob, sha256 } from '@algorandfoundation/algorand-typescript/op'
import { MerkleTreeTypeCollection } from '../../../meta/constants'
import { BoxCostPerBox } from '../../../utils/constants'
import { getAkitaAppList } from '../../../utils/functions'
import { Proof } from '../../../utils/types/merkles'
import { GateGlobalStateKeyCheckShape, GateGlobalStateKeyRegistrationShape, GateGlobalStateKeyRegistryCursor, MinMetaMerkleRegistryMBR } from '../../constants'
import { errInvalidArgCount, errInvalidPayment } from '../../errors'

// CONTRACT IMPORTS
import type { Meta } from '../../../meta/contract.algo'
import { AkitaBaseContract } from '../../../utils/base-contracts/upgradeable'

type MerkleAssetGateRegistryInfo = {
  creator: Account
  name: string
}

type MerkleAssetGateCheckParams = {
  asset: uint64
  proof: Proof
}

const MinRegisterArgsLength: uint64 = 35
/** [asset: 8][proof: 2+(32*length)] */
const MinCheckArgsLength: uint64 = 74

export class MerkleAssetGate extends AkitaBaseContract {

  // GLOBAL STATE ---------------------------------------------------------------------------------

  registryCursor = GlobalState<uint64>({ initialValue: 1, key: GateGlobalStateKeyRegistryCursor })
  /** the abi string for the register args */
  registrationShape = GlobalState<string>({ initialValue: '(address,string)', key: GateGlobalStateKeyRegistrationShape })
  /** the abi string for the check args */
  checkShape = GlobalState<string>({ initialValue: '(uint64,byte[32][])', key: GateGlobalStateKeyCheckShape })

  // BOXES ----------------------------------------------------------------------------------------

  registry = BoxMap<uint64, MerkleAssetGateRegistryInfo>({ keyPrefix: '' })

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
  }

  // MERKLE ASSET GATE METHODS --------------------------------------------------------------------

  cost(args: bytes): uint64 {
    loggedAssert(args.length >= MinRegisterArgsLength, errInvalidArgCount)
    return MinMetaMerkleRegistryMBR + (BoxCostPerBox * (args.length - 32))
  }

  register(mbrPayment: gtxn.PaymentTxn, args: bytes): uint64 {
    loggedAssert(args.length >= MinRegisterArgsLength, errInvalidArgCount)
    loggedAssert(mbrPayment.receiver === Global.currentApplicationAddress, errInvalidPayment)
    loggedAssert(mbrPayment.amount === this.cost(args), errInvalidPayment)

    const id = this.newRegistryID()
    this.registry(id).value = decodeArc4<MerkleAssetGateRegistryInfo>(args)
    return id
  }

  check(caller: Account, registryID: uint64, args: bytes): boolean {
    loggedAssert(args.length >= MinCheckArgsLength, errInvalidArgCount)
    const { asset, proof } = decodeArc4<MerkleAssetGateCheckParams>(args)

    const [holdings, optedIn] = AssetHolding.assetBalance(caller, asset)
    if (!optedIn || holdings === 0) {
      return false
    }

    const { creator, name } = clone(this.registry(registryID).value)

    return abiCall<typeof Meta.prototype.verify>({
      appId: getAkitaAppList(this.akitaDAO.value).metaMerkles,
      args: [
        creator,
        name,
        sha256(sha256(itob(asset))),
        proof,
        MerkleTreeTypeCollection,
      ],
    }).returnValue
  }

  getRegistrationShape(shape: MerkleAssetGateRegistryInfo): MerkleAssetGateRegistryInfo {
    return shape
  }

  getCheckShape(shape: MerkleAssetGateCheckParams): MerkleAssetGateCheckParams {
    return shape
  }

  @abimethod({ readonly: true })
  getEntry(registryID: uint64): bytes {
    return encodeArc4(this.registry(registryID).value)
  }
}
