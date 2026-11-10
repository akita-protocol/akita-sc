import { Account, BoxMap, Contract, Global, uint64 } from '@algorandfoundation/algorand-typescript'
import { abimethod } from '@algorandfoundation/algorand-typescript/arc4'
import { STAKING_TYPE_LOCK } from '../../staking/types'
import type { Stake, StakeInfo, StakeKey, TotalsInfo } from '../../staking/types'

/**
 * TEST-ONLY. Answers the two Staking reads the DAO makes (`getInfo`, `getTotals`) from values a test
 * sets, so governance power can be checked for any lock length (including past Staking's one-year
 * default maximum) without waiting on the chain clock.
 */
export class MockGovernanceStaking extends Contract {
  locks = BoxMap<StakeKey, Stake>({ keyPrefix: 's' })
  totals = BoxMap<uint64, TotalsInfo>({ keyPrefix: 't' })

  setLock(address: Account, asset: uint64, amount: uint64, expiration: uint64): void {
    this.locks({ address, asset, type: STAKING_TYPE_LOCK }).value = { amount, lastUpdate: Global.latestTimestamp, expiration, weightedAge: 0 }
  }

  setLiveLocked(asset: uint64, liveLockedStake: uint64): void {
    this.totals(asset).value = { locked: liveLockedStake, escrowed: 0, liveLockedStake }
  }

  @abimethod({ readonly: true })
  getInfo(address: Account, stake: StakeInfo): Stake {
    return this.locks({ address, asset: stake.asset, type: stake.type }).get({ default: { amount: 0, lastUpdate: 0, expiration: 0, weightedAge: 0 } })
  }

  @abimethod({ readonly: true })
  getTotals(assets: uint64[]): TotalsInfo[] {
    const results: TotalsInfo[] = []
    for (let i: uint64 = 0; i < assets.length; i += 1) {
      results.push(this.totals(assets[i]).get({ default: { locked: 0, escrowed: 0, liveLockedStake: 0 } }))
    }
    return results
  }
}
