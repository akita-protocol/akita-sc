/**
 * ARC-58 Abstract Account global state keys used to read wallet state.
 * These match the keys defined in the AbstractedAccount contract.
 */
export const ARC58_CONTROLLED_ADDRESS_KEY = 'controlled_address'
export const ARC58_SPENDING_ADDRESS_KEY = 'spending_address'
export const ARC58_REFERRER_KEY = 'referrer'
export const ARC58_CURRENT_PLUGIN_KEY = 'current_plugin'
export const ARC58_REKEY_INDEX_KEY = 'rekey_index'

/** ARC-65 error logged when a plugin does not control the wallet's spending account. */
export const ARC58_ERR_PLUGIN_NOT_AUTH_ADDR = 'errNath'

/**
 * ARC-65 error logged when a plugin is called under a grant that anyone may use (its caller is the
 * zero address) and that needs no execution key. See `assertNotOpenGrant`.
 */
export const ARC58_ERR_OPEN_GRANT = 'errOgnk'

/**
 * The wallet's readonly `arc58_getPlugins(PluginKey[])PluginInfo[]`, by its ARC-4 signature.
 * `PluginKey` is `(plugin, caller, escrow)`; `PluginInfo` is
 * `(escrow, delegationType, lastValid, cooldown, methods, admin, useRounds, useExecutionKey, coverFees, canReclaim, lastCalled, start)`.
 */
export const ARC58_GET_PLUGINS_SIGNATURE =
  'arc58_getPlugins((uint64,address,string)[])(uint64,uint8,uint64,uint64,(byte[4],uint64,uint64)[],bool,bool,bool,bool,bool,uint64,uint64)[]'

/**
 * Bit of `PluginInfo.useExecutionKey` in the log `arc58_getPlugins` returns for one key: 4 bytes of
 * ARC-4 return prefix, 2 of array length, 2 of element offset, then 27 bytes of `PluginInfo` in front
 * of the byte that packs its five flags, where `useExecutionKey` is the third flag.
 */
export const ARC58_GET_PLUGINS_USE_EXECUTION_KEY_BIT = 282

/** ARC-65 error logged when an app has no 32-byte `controlled_address`, so it is not an ARC-58 wallet. */
export const ARC58_ERR_INVALID_WALLET = 'errIwlt'
