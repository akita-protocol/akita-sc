import { Bytes, uint64, Uint64 } from '@algorandfoundation/algorand-typescript'

/*
 * Collectible Variations registry. Box layouts are raw bytes, not ARC-4
 * encodings, so every field has a constant offset that a browser or a contract doing a
 * foreign box read can slice. All integers are big-endian.
 *
 * The SDK mirrors every constant in this file (akita-sdk/src/collectible-variations/layout.ts),
 * and its unit tests check the two against each other.
 */

// BOX NAMES ---------------------------------------------------------------------------------------

/** `v` || asset(8) || writer(32) || slot(1..23). 42..64 bytes. */
export const PrefixVariation = Bytes('v')
/** `m` || asset(8). The main image of a collectible. */
export const PrefixMain = Bytes('m')
/** `p` || asset(8). The creator policy of one asset. Overrides `P`. */
export const PrefixAssetPolicy = Bytes('p')
/** `P` || manager(32). The creator policy of every asset whose ASA manager field is that account. */
export const PrefixManagerPolicy = Bytes('P')
/** `g` || holder(32). Writers a holder admits for holder-scope entries on anything they hold. */
export const PrefixGrant = Bytes('g')

export const MaxSlotBytes: uint64 = 23
export const NameAsset: uint64 = 1
export const NameWriter: uint64 = 9
export const NameSlot: uint64 = 41
export const AssetNameLength: uint64 = 9

/** Every box value is one AVM byte string at most. */
export const MaxValueBytes: uint64 = 4096

// VARIATION VALUE (`v`) ---------------------------------------------------------------------------
//
//  off size field
//    0    1 format    = FormatV1
//    1    1 flags     bit7 FlagLocked, bit0 FlagHolderScope
//    2    1 kind      never 0
//    3    1 sub
//    4    8 revision
//   12    2 flatLen F
// holder scope only:
//   14   32 holder
//   46    1 decimals of the asset
// then the flat image (F bytes) at H = 14 or 47, then the body.

export const FormatV1: uint64 = 1
export const VFlags: uint64 = 1
export const VKind: uint64 = 2
export const VSub: uint64 = 3
export const VRevision: uint64 = 4
export const VFlatLen: uint64 = 12
export const VHolder: uint64 = 14
export const VDecimals: uint64 = 46
export const VFlatCollectible: uint64 = 14
export const VFlatHolder: uint64 = 47

export const FlagLocked: uint64 = 0x80
export const FlagHolderScope: uint64 = 0x01

export const KindImage: uint64 = 1
export const KindRenderBundle: uint64 = 2
export const KindData: uint64 = 3
export const KindLink: uint64 = 4

export const MaxFlatBytes: uint64 = 768

// MAIN VALUE (`m`) --------------------------------------------------------------------------------
//
//  off size field
//    0    1 format
//    1    1 flags           bit7 MainCreatorLocked
//    2    1 decimals
//    3    8 revision
//   11    2 creatorLen C
//   13    2 holderLen  K
//   15    8 creatorDeposit
//   23    8 holderDeposit
//   31    C creator section = PinCore || flat
// 31+C    K holder section  = holder(32) || PinCore || flat
//
// PinCore (66): writer(32) slotLen(1) slot zero padded(23) sourceRevision(8) kind(1) sub(1)

export const MFlags: uint64 = 1
export const MDecimals: uint64 = 2
export const MRevision: uint64 = 3
export const MCreatorLen: uint64 = 11
export const MHolderLen: uint64 = 13
export const MCreatorDeposit: uint64 = 15
export const MHolderDeposit: uint64 = 23
export const MSections: uint64 = 31
export const MainCreatorLocked: uint64 = 0x80

export const PinSourceWriter: uint64 = 0
export const PinSourceSlotLen: uint64 = 32
export const PinSourceSlot: uint64 = 33
export const PinSourceRevision: uint64 = 56
export const PinSourceKind: uint64 = 64
export const PinSourceSub: uint64 = 65
export const PinFlat: uint64 = 66
export const HolderSectionPrefix: uint64 = 32

export const RoleNone: uint64 = 0
export const RoleCreator: uint64 = 1
export const RoleHolder: uint64 = 2

// POLICY (`p`, `P`) AND GRANT (`g`) VALUES -------------------------------------------------------
//
// policy: format(1) flags(1) revision(8) collectibleSet holderSet
// grant:  format(1) revision(8) set
//
// Writer set:
//   closed   00
//   open     01
//   allow    02 n(1, 1..8) writer(32) * n
//   delegate 03 app(8)       the app answers admit(uint64,address,byte[],address)bool
//   meta     04 root(32)     the same root, owned by the registry, is stored in the Meta app

export const PFlags: uint64 = 1
export const PRevision: uint64 = 2
export const PSets: uint64 = 10
export const GRevision: uint64 = 1
export const GSet: uint64 = 9

export const PolicyLocked: uint64 = 0x80
export const PolicyHolderPinsCollectibleOnly: uint64 = 0x02
export const PolicyManagerWrites: uint64 = 0x01
export const DefaultPolicyFlags: uint64 = 0x01

export const WriterSetClosed: uint64 = 0
export const WriterSetOpen: uint64 = 1
export const WriterSetAllow: uint64 = 2
export const WriterSetDelegate: uint64 = 3
export const WriterSetMeta: uint64 = 4
export const MaxAllowWriters: uint64 = 8

/** Meta root names: tag + base64url(sha256(box name)[0..18)), 25 ASCII bytes. */
export const MetaTagCollectible = 'c'
export const MetaTagHolder = 'h'
export const MetaTagGrant = 'g'
export const MetaNameHashBytes: uint64 = 18
export const MaxProofLevels: uint64 = 24
export const Base64UrlAlphabet = Bytes('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_')

// ARC-20 SMART ASA CREATOR RESOLUTION ------------------------------------------------------------

export const PlainAsa: uint64 = 0
export const Arc20GetAssetConfig =
  'get_asset_config(asset)(uint64,uint32,bool,string,string,string,byte[],address,address,address,address)'
/** `manager_addr` in the returned tuple head: 8 + 4 + 1 + 4 * 2 = 21, after the 4-byte return prefix. */
export const Arc20ManagerOffset: uint64 = 25
export const DelegateAdmit = 'admit(uint64,address,byte[],address)bool'
export const Arc4ReturnPrefix = Bytes.fromHex('151f7c75')
/** Logged before a deposit mismatch fails: prefix || required amount (8 bytes). */
export const DepositLogPrefix = Bytes('cv:deposit:')

// MISC -------------------------------------------------------------------------------------------

export const IfAbsent: uint64 = 0
export const IfAny: uint64 = Uint64(18446744073709551615n)

export const RemovedNone: uint64 = 0
export const RemovedPurged: uint64 = 1
export const RemovedByWriter: uint64 = 2
export const RemovedVoid: uint64 = 3
export const RemovedByHolder: uint64 = 4
export const RemovedByCreator: uint64 = 5
export const RemovedByAssetCreator: uint64 = 6

export const MbrNull: uint64 = 0
export const MbrPositive: uint64 = 1
export const MbrNegative: uint64 = 255

export const GlobalStateKeyRevision = 'r'
export const GlobalStateKeyMetaApp = 'a'
export const GlobalStateKeyMetaTreeType = 't'
