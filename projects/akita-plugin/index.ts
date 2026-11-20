// Base contract
export { Plugin } from './base.algo'

// Utility functions
export {
  getSpendingAccount,
  getControlledSpendingAccount,
  isAkitaWallet,
  getOriginAccount,
  getReferrerAccount,
  getAccounts,
  rekeyAddress,
  rekeyBackIfNecessary,
  controls,
} from './functions'

// Principal resolution (identity from a wallet hint). See README "Identity" and
// docs/principal-resolution/STANDARD.md. The internal helpers (the context resolvers and the
// live-control predicate) are not part of principal.ts's public surface: the mirror does not
// contain the Akita-only ones at all, and the shared ones are not exported.
export {
  PRINCIPAL_KEY_CONTROLLED,
  PRINCIPAL_KEY_SPENDING,
  PRINCIPAL_KEY_REFERRER,
  errHintNotWallet,
  errHintTopLevel,
  errHintNotBound,
  errHintNotOwner,
  errHintBadWallet,
  errHintPluginNotAuth,
  isGenuineWallet,
  resolvePrincipal,
  tryResolvePrincipal,
  quoteReferrer,
  ownsAtRest,
  atRestPrincipal,
  thirdPartyPrincipal,
  gateCtx,
  ctxOwns,
  pluginPrincipal,
  windowHint,
} from './principal'
export type { Principal, GateCtx } from './principal'

// Types
export type { Arc58Accounts, Arc58PluginCallContext } from './types'

// Constants
export {
  ARC58_CONTROLLED_ADDRESS_KEY,
  ARC58_SPENDING_ADDRESS_KEY,
  ARC58_REFERRER_KEY,
  ARC58_CURRENT_PLUGIN_KEY,
  ARC58_REKEY_INDEX_KEY,
  ARC58_ERR_PLUGIN_NOT_AUTH_ADDR,
  ARC58_ERR_INVALID_WALLET,
} from './constants'
