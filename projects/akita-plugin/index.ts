// Base contract
export { Plugin } from './base.algo'

// Utility functions
export {
  getSpendingAccount,
  getOriginAccount,
  getReferrerAccount,
  getAccounts,
  rekeyAddress,
  rekeyBackIfNecessary,
} from './functions'

// Types
export type { Arc58Accounts, Arc58PluginCallContext } from './types'

// Constants
export {
  ARC58_CONTROLLED_ADDRESS_KEY,
  ARC58_SPENDING_ADDRESS_KEY,
  ARC58_REFERRER_KEY,
  ARC58_CURRENT_PLUGIN_KEY,
  ARC58_REKEY_INDEX_KEY,
} from './constants'
