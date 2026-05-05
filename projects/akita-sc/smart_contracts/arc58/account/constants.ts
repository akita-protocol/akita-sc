import { uint64 } from "@algorandfoundation/algorand-typescript"

/** Maximum number of inner transactions allowed in a group */
export const MAX_INNER_TXN_COUNT: uint64 = 256
/** Maximum number of outer transactions allowed in a group */
export const MAX_OUTER_TXN_COUNT: uint64 = 16

// Currently using 9 bytes + 9 uints. Over-provisioned (bytes-heavy because future
// additions skew toward strings/accounts/structs — metadata, keys, config structs, etc.)
// so new fields can be added via `updateApp` without hitting the global state limit
// declared at creation.
export const AbstractAccountNumGlobalBytes: uint64 = 30 // 1_500_000 (10 used, 20 spare)
export const AbstractAccountNumGlobalUints: uint64 = 12 //   342_000 (9 used,  3 spare)

// global state MBR: 1_342_000
// total wallet MBR (incl. MAX_PROGRAM_PAGES + Global.minBalance + ARC58WalletIDsByAccountsMbr):
//   1_342_000 + 400_000 + 100_000 + min-bal-extras

export const AbstractAccountGlobalStateKeysAdmin = 'admin'
export const AbstractAccountGlobalStateKeysDomain = 'domain'
export const AbstractAccountGlobalStateKeysControlledAddress = 'controlled_address'
export const AbstractAccountGlobalStateKeysNickname = 'nickname'
export const AbstractAccountGlobalStateKeysAvatar = 'avatar'
export const AbstractAccountGlobalStateKeysBanner = 'banner'
export const AbstractAccountGlobalStateKeysBio = 'bio'
export const AbstractAccountGlobalStateKeysLastUserInteraction = 'last_user_interaction'
export const AbstractAccountGlobalStateKeysLastChange = 'last_change'
export const AbstractAccountGlobalStateKeysSpendingAddress = 'spending_address'
export const AbstractAccountGlobalStateKeysCurrentPlugin = 'current_plugin'
export const AbstractAccountGlobalStateKeysCurrentEscrow = 'current_escrow'
export const AbstractAccountGlobalStateKeysRekeyIndex = 'rekey_index'
export const AbstractAccountGlobalStateKeysEscrowFactory = 'escrow_factory'
export const AbstractAccountGlobalStateKeysFactoryApp = 'factory_app'
export const AbstractAccountGlobalStateKeysReferrer = 'referrer'
export const AbstractAccountGlobalStateKeysUpdateSettings = 'update_settings'
export const AbstractAccountGlobalStateKeysSalt = 'salt'

export const AbstractAccountBoxPrefixPlugins = 'p'
export const AbstractAccountBoxPrefixNamedPlugins = 'n'
export const AbstractAccountBoxPrefixEscrows = 'e'
export const AbstractAccountBoxPrefixAllowances = 'a'
export const AbstractAccountBoxPrefixDomainKeys = 'd'
export const AbstractAccountBoxPrefixExecutions = 'x'

export const MethodRestrictionByteLength: uint64 = 20

export const MinPluginMBR: uint64 = 38_900
export const MinNamedPluginMBR: uint64 = 18_900
export const MinEscrowsMBR: uint64 = 6_500
export const MinAllowanceMBR: uint64 = 27_700
export const MinExecutionsMBR: uint64 = 20_500
export const MinDomainKeysMBR: uint64 = 15_700

export const AbstractedAccountFactoryGlobalStateKeyDomain = 'domain'

export const AbstractAccountFactoryBoxKeyCompiledContract = 'c' // holds the compiled contract

export const ABSTRACTED_ACCOUNT_MINT_PAYMENT: uint64 = 1_028_000 + 12_100 // 1_028_000 for the account, 12_100 for the escrow factory