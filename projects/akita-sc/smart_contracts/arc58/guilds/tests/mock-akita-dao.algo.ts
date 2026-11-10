import { GlobalState, uint64 } from '@algorandfoundation/algorand-typescript'
import { abimethod, Contract } from '@algorandfoundation/algorand-typescript/arc4'
import {
  AkitaDAOGlobalStateKeysAkitaAppList,
  AkitaDAOGlobalStateKeysGuildFees,
  AkitaDAOGlobalStateKeysWalletFees,
} from '../../dao/constants'
import { AkitaAppList, GuildFees, WalletFees } from '../../dao/types'

/** Minimal Akita DAO fee and app-list state used by GuildFactory integration tests. */
export class MockGuildAkitaDAO extends Contract {
  guildFees = GlobalState<GuildFees>({ key: AkitaDAOGlobalStateKeysGuildFees })
  walletFees = GlobalState<WalletFees>({ key: AkitaDAOGlobalStateKeysWalletFees })
  akitaAppList = GlobalState<AkitaAppList>({ key: AkitaDAOGlobalStateKeysAkitaAppList })

  @abimethod({ onCreate: 'require' })
  create(createFee: uint64): void {
    this.guildFees.value = { createFee }
    this.walletFees.value = { createFee: 0, referrerPercentage: 0 }
    this.setWalletFactory(0)
  }

  /** Point Guild wallet creation at a wallet factory, as the DAO's app list does in production. */
  setWalletFactory(wallet: uint64): void {
    this.akitaAppList.value = {
      staking: 0,
      rewards: 0,
      pool: 0,
      prizeBox: 0,
      subscriptions: 0,
      gate: 0,
      auction: 0,
      hyperSwap: 0,
      raffle: 0,
      metaMerkles: 0,
      marketplace: 0,
      wallet,
    }
  }
}
