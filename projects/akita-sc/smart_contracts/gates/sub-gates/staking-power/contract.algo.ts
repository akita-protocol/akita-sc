import { Account, Application, BoxMap, bytes, clone, Global, GlobalState, gtxn, loggedAssert, uint64 } from '@algorandfoundation/algorand-typescript'
import {
  abimethod,
  decodeArc4,
  encodeArc4
} from '@algorandfoundation/algorand-typescript/arc4'
import { getAkitaAppList, getStakingPower } from '../../../utils/functions'
import {
  Equal,
  GreaterThan,
  GreaterThanOrEqualTo,
  LessThan,
  LessThanOrEqualTo,
  NotEqual,
} from '../../../utils/operators'
import { GateGlobalStateKeyCheckShape, GateGlobalStateKeyRegistrationShape, GateGlobalStateKeyRegistryCursor } from '../../constants'
import { ERR_BAD_OPERATION, ERR_INVALID_ARG_COUNT, ERR_INVALID_PAYMENT } from '../../errors'
import { Operator } from '../../types'

// CONTRACT IMPORTS
import { AkitaBaseContract } from '../../../utils/base-contracts/base'


type StakingPowerGateRegistryInfo = {
  op: Operator
  asset: uint64
  power: uint64
}

const StakingPowerGateRegistryMBR: uint64 = 12_500
/** [op:1][asset:8][power:8] */
const CheckArgsBytesLength: uint64 = 17

export class StakingPowerGate extends AkitaBaseContract {

  // GLOBAL STATE ---------------------------------------------------------------------------------

  registryCursor = GlobalState<uint64>({ initialValue: 1, key: GateGlobalStateKeyRegistryCursor })
  /** the abi string for the register args */
  registrationShape = GlobalState<string>({ initialValue: '(uint8,uint64,uint64)', key: GateGlobalStateKeyRegistrationShape })
  /** the abi string for the check args */
  checkShape = GlobalState<string>({ initialValue: '', key: GateGlobalStateKeyCheckShape })

  // BOXES ----------------------------------------------------------------------------------------

  registry = BoxMap<uint64, StakingPowerGateRegistryInfo>({ keyPrefix: '' })

  // PRIVATE METHODS ------------------------------------------------------------------------------

  private newRegistryID(): uint64 {
    const id = this.registryCursor.value
    this.registryCursor.value += 1
    return id
  }

  private stakingPowerGate(user: Account, op: Operator, asset: uint64, power: uint64): boolean {
    const userPower = getStakingPower(
      getAkitaAppList(this.akitaDAO.value).staking,
      user,
      asset
    )

    switch (op) {
      case Equal: return userPower === power
      case NotEqual: return userPower !== power
      case LessThan: return userPower < power
      case LessThanOrEqualTo: return userPower <= power
      case GreaterThan: return userPower > power
      case GreaterThanOrEqualTo: return userPower >= power
      default: return false
    }
  }

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(version: string, akitaDAO: uint64): void {
    this.version.value = version
    this.akitaDAO.value = Application(akitaDAO)
  }

  // STAKING POWER GATE METHODS -------------------------------------------------------------------

  cost(args: bytes): uint64 {
    return StakingPowerGateRegistryMBR
  }

  register(mbrPayment: gtxn.PaymentTxn, args: bytes): uint64 {
    loggedAssert(args.length === CheckArgsBytesLength, ERR_INVALID_ARG_COUNT)
    loggedAssert(mbrPayment.receiver === Global.currentApplicationAddress, ERR_INVALID_PAYMENT)
    loggedAssert(mbrPayment.amount === StakingPowerGateRegistryMBR, ERR_INVALID_PAYMENT)

    const params = decodeArc4<StakingPowerGateRegistryInfo>(args)
    loggedAssert(params.op.asUint64() <= 60, ERR_BAD_OPERATION)
    const id = this.newRegistryID()
    this.registry(id).value = clone(params)
    return id
  }

  check(caller: Account, registryID: uint64, args: bytes): boolean {
    loggedAssert(args.length === 0, ERR_INVALID_ARG_COUNT)
    const { op, asset, power } = clone(this.registry(registryID).value)
    return this.stakingPowerGate(caller, op, asset, power)
  }

  @abimethod({ readonly: true })
  getRegistrationShape(shape: StakingPowerGateRegistryInfo): StakingPowerGateRegistryInfo {
    return shape
  }

  @abimethod({ readonly: true })
  getEntry(registryID: uint64): bytes {
    return encodeArc4(this.registry(registryID).value)
  }
}
