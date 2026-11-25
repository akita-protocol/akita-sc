/**
 * Box layout of the Collectible Variations registry. Every constant mirrors
 * `akita-sc/smart_contracts/collectible-variations/constants.ts`, and
 * `layout.test.ts` checks the two files against each other.
 *
 * Box values are raw bytes, not ARC-4 encodings: every field has a fixed
 * offset, and every integer is big-endian.
 */

// BOX NAMES -----------------------------------------------------------------

/** `v` || asset(8) || writer(32) || slot(1..23) */
export const PrefixVariation = 'v';
/** `m` || asset(8) */
export const PrefixMain = 'm';
/** `p` || asset(8) */
export const PrefixAssetPolicy = 'p';
/** `P` || manager(32) */
export const PrefixManagerPolicy = 'P';
/** `g` || holder(32) */
export const PrefixGrant = 'g';

export const MaxSlotBytes = 23;
export const NameAsset = 1;
export const NameWriter = 9;
export const NameSlot = 41;
export const AssetNameLength = 9;
export const MaxValueBytes = 4096;

// VARIATION VALUE (`v`) -----------------------------------------------------

export const FormatV1 = 1;
export const VFlags = 1;
export const VKind = 2;
export const VSub = 3;
export const VRevision = 4;
export const VFlatLen = 12;
export const VHolder = 14;
export const VDecimals = 46;
export const VFlatCollectible = 14;
export const VFlatHolder = 47;

export const FlagLocked = 0x80;
export const FlagHolderScope = 0x01;

export const KindImage = 1;
export const KindRenderBundle = 2;
export const KindData = 3;
export const KindLink = 4;

export const MaxFlatBytes = 768;

// MAIN VALUE (`m`) ----------------------------------------------------------

export const MFlags = 1;
export const MDecimals = 2;
export const MRevision = 3;
export const MCreatorLen = 11;
export const MHolderLen = 13;
export const MCreatorDeposit = 15;
export const MHolderDeposit = 23;
export const MSections = 31;
export const MainCreatorLocked = 0x80;

export const PinSourceWriter = 0;
export const PinSourceSlotLen = 32;
export const PinSourceSlot = 33;
export const PinSourceRevision = 56;
export const PinSourceKind = 64;
export const PinSourceSub = 65;
export const PinFlat = 66;
export const HolderSectionPrefix = 32;

export const RoleNone = 0;
export const RoleCreator = 1;
export const RoleHolder = 2;

// POLICY AND GRANT VALUES ---------------------------------------------------

export const PFlags = 1;
export const PRevision = 2;
export const PSets = 10;
export const GRevision = 1;
export const GSet = 9;

export const PolicyLocked = 0x80;
export const PolicyHolderPinsCollectibleOnly = 0x02;
export const PolicyManagerWrites = 0x01;
export const DefaultPolicyFlags = 0x01;

export const WriterSetClosed = 0;
export const WriterSetOpen = 1;
export const WriterSetAllow = 2;
export const WriterSetDelegate = 3;
export const WriterSetMeta = 4;
export const MaxAllowWriters = 8;

export const MetaTagCollectible = 'c';
export const MetaTagHolder = 'h';
export const MetaTagGrant = 'g';
export const MetaNameHashBytes = 18;
export const MaxProofLevels = 24;

// SMART ASA, DELEGATES, DEPOSITS --------------------------------------------

export const PlainAsa = 0;
export const Arc20GetAssetConfig =
  'get_asset_config(asset)(uint64,uint32,bool,string,string,string,byte[],address,address,address,address)';
export const Arc20ManagerOffset = 25;
export const DelegateAdmit = 'admit(uint64,address,byte[],address)bool';
/** Logged before a deposit mismatch fails: prefix || required amount (8 bytes). */
export const DepositLogPrefix = 'cv:deposit:';

// MISC ----------------------------------------------------------------------

/** `ifRevision`: the entry must not exist. */
export const IfAbsent = 0n;
/** `ifRevision`: no precondition. */
export const IfAny = 18446744073709551615n;

export const RemovedNone = 0;
export const RemovedPurged = 1;
export const RemovedByWriter = 2;
export const RemovedVoid = 3;
export const RemovedByHolder = 4;
export const RemovedByCreator = 5;
export const RemovedByAssetCreator = 6;

export const MbrNull = 0;
export const MbrPositive = 1;
export const MbrNegative = 255;

export const GlobalStateKeyRevision = 'r';
export const GlobalStateKeyMetaApp = 'a';
export const GlobalStateKeyMetaTreeType = 't';

/** Box MBR on Algorand: 2500 + 400 × (name + value) microAlgo. */
export const boxMbr = (nameLength: number, valueLength: number): bigint =>
  2500n + 400n * BigInt(nameLength + valueLength);
