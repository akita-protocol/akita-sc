import { GlobalState, uint64 } from '@algorandfoundation/algorand-typescript'
import { abimethod, Contract } from '@algorandfoundation/algorand-typescript/arc4'
import {
  AkitaDAOGlobalStateKeysAkitaAppList, AkitaDAOGlobalStateKeysAkitaAssets, AkitaDAOGlobalStateKeysInferenceFees,
} from '../../arc58/dao/constants'
import { AkitaAppList, AkitaAssets, InferenceFees } from '../../arc58/dao/types'

/** The Akita DAO state InferenceNetwork reads: AKTA's id, the subscriptions and wallet factory apps, and the inference fees. */
export class MockInferenceDAO extends Contract {
  akitaAssets = GlobalState<AkitaAssets>({ key: AkitaDAOGlobalStateKeysAkitaAssets })
  akitaAppList = GlobalState<AkitaAppList>({ key: AkitaDAOGlobalStateKeysAkitaAppList })
  inferenceFees = GlobalState<InferenceFees>({ key: AkitaDAOGlobalStateKeysInferenceFees })

  @abimethod({ onCreate: 'require' })
  create(akta: uint64): void {
    this.akitaAssets.value = { akta, bones: 0 }
    this.setApps(0, 0)
  }

  setInferenceFees(chargePercentage: uint64, providerBond: uint64): void {
    this.inferenceFees.value = { chargePercentage, providerBond }
  }

  setApps(subscriptions: uint64, wallet: uint64): void {
    this.akitaAppList.value = {
      staking: 0, rewards: 0, pool: 0, prizeBox: 0, subscriptions, gate: 0, auction: 0, hyperSwap: 0,
      raffle: 0, metaMerkles: 0, marketplace: 0, wallet,
    }
  }
}
