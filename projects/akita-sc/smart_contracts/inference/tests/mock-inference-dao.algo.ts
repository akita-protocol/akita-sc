import { GlobalState, uint64 } from '@algorandfoundation/algorand-typescript'
import { abimethod, Contract } from '@algorandfoundation/algorand-typescript/arc4'
import { AkitaDAOGlobalStateKeysAkitaAssets, AkitaDAOGlobalStateKeysInferenceFees } from '../../arc58/dao/constants'
import { AkitaAssets, InferenceFees } from '../../arc58/dao/types'

/** The Akita DAO state InferenceNetwork reads: AKTA's id and the inference fees. */
export class MockInferenceDAO extends Contract {
  akitaAssets = GlobalState<AkitaAssets>({ key: AkitaDAOGlobalStateKeysAkitaAssets })
  inferenceFees = GlobalState<InferenceFees>({ key: AkitaDAOGlobalStateKeysInferenceFees })

  @abimethod({ onCreate: 'require' })
  create(akta: uint64): void {
    this.akitaAssets.value = { akta, bones: 0 }
  }

  setInferenceFees(chargePercentage: uint64, providerBond: uint64): void {
    this.inferenceFees.value = { chargePercentage, providerBond }
  }
}
