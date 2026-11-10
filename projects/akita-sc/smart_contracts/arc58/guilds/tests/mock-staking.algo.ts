import { Account, BoxMap, contract, Global, uint64 } from '@algorandfoundation/algorand-typescript'
import { abimethod, Contract } from '@algorandfoundation/algorand-typescript/arc4'
import type { SettingsCheck, Stake, StakeInfo, TotalsInfo, WeightedStake } from '../../../staking/types'

type AccountAssetKey = { account: Account; asset: uint64 }

/** Deterministic implementation of the universal-staking read ABI used by Guild policies. */
@contract({ stateTotals: { globalBytes: 0, globalUints: 0 } })
export class MockGuildStaking extends Contract {
  weightedStakes = BoxMap<AccountAssetKey, uint64>({ keyPrefix: 'w' })
  locks = BoxMap<AccountAssetKey, Stake>({ keyPrefix: 'l' })
  totals = BoxMap<uint64, TotalsInfo>({ keyPrefix: 't' })
  /** per-asset maximum lockup, mirroring universal staking's asset settings */
  settings = BoxMap<uint64, uint64>({ keyPrefix: 's' })

  @abimethod({ onCreate: 'require' })
  create(): void {}

  setWeightedStake(account: Account, asset: uint64, amount: uint64): void {
    this.weightedStakes({ account, asset }).value = amount
  }

  setLock(account: Account, asset: uint64, amount: uint64, expiration: uint64): void {
    this.locks({ account, asset }).value = {
      amount,
      expiration,
      lastUpdate: Global.latestTimestamp,
      weightedAge: 0,
    }
  }

  setLiveLockedStake(asset: uint64, amount: uint64): void {
    this.totals(asset).value = { locked: amount, escrowed: amount, liveLockedStake: amount }
  }

  setSettings(asset: uint64, value: uint64): void {
    this.settings(asset).value = value
  }

  @abimethod({ readonly: true })
  getSettings(assets: uint64[]): SettingsCheck[] {
    const results: SettingsCheck[] = []
    for (let i: uint64 = 0; i < assets.length; i += 1) {
      if (this.settings(assets[i]).exists) results.push({ value: this.settings(assets[i]).value, exists: true })
      else results.push({ value: 0, exists: false })
    }
    return results
  }

  @abimethod({ readonly: true })
  getWeightedStake(address: Account, asset: uint64): WeightedStake {
    const key: AccountAssetKey = { account: address, asset }
    return { amount: this.weightedStakes(key).exists ? this.weightedStakes(key).value : 0, weightedAge: 0 }
  }

  @abimethod({ readonly: true })
  getInfo(address: Account, stake: StakeInfo): Stake {
    const key: AccountAssetKey = { account: address, asset: stake.asset }
    if (this.locks(key).exists) return this.locks(key).value
    return { amount: 0, expiration: 0, lastUpdate: 0, weightedAge: 0 }
  }

  @abimethod({ readonly: true })
  getTotals(assets: uint64[]): TotalsInfo[] {
    const results: TotalsInfo[] = []
    for (let i: uint64 = 0; i < assets.length; i += 1) {
      if (this.totals(assets[i]).exists) results.push(this.totals(assets[i]).value)
      else results.push({ locked: 0, escrowed: 0, liveLockedStake: 0 })
    }
    return results
  }
}
