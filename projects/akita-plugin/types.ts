import { Account, Application } from '@algorandfoundation/algorand-typescript'

export type Arc58Accounts = {
  walletAddress: Account
  origin: Account
  sender: Account
  referrer: Account
}

export type Arc58PluginCallContext = {
  wallet: Application
  rekeyBack: boolean
}