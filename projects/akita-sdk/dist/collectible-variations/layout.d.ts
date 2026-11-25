/**
 * Box layout of the Collectible Variations registry. Every constant mirrors
 * `akita-sc/smart_contracts/collectible-variations/constants.ts`, and
 * `layout.test.ts` checks the two files against each other.
 *
 * Box values are raw bytes, not ARC-4 encodings: every field has a fixed
 * offset, and every integer is big-endian.
 */
/** `v` || asset(8) || writer(32) || slot(1..23) */
export declare const PrefixVariation = "v";
/** `m` || asset(8) */
export declare const PrefixMain = "m";
/** `p` || asset(8) */
export declare const PrefixAssetPolicy = "p";
/** `P` || manager(32) */
export declare const PrefixManagerPolicy = "P";
/** `g` || holder(32) */
export declare const PrefixGrant = "g";
export declare const MaxSlotBytes = 23;
export declare const NameAsset = 1;
export declare const NameWriter = 9;
export declare const NameSlot = 41;
export declare const AssetNameLength = 9;
export declare const MaxValueBytes = 4096;
export declare const FormatV1 = 1;
export declare const VFlags = 1;
export declare const VKind = 2;
export declare const VSub = 3;
export declare const VRevision = 4;
export declare const VFlatLen = 12;
export declare const VHolder = 14;
export declare const VDecimals = 46;
export declare const VFlatCollectible = 14;
export declare const VFlatHolder = 47;
export declare const FlagLocked = 128;
export declare const FlagHolderScope = 1;
export declare const KindImage = 1;
export declare const KindRenderBundle = 2;
export declare const KindData = 3;
export declare const KindLink = 4;
export declare const MaxFlatBytes = 768;
export declare const MFlags = 1;
export declare const MDecimals = 2;
export declare const MRevision = 3;
export declare const MCreatorLen = 11;
export declare const MHolderLen = 13;
export declare const MCreatorDeposit = 15;
export declare const MHolderDeposit = 23;
export declare const MSections = 31;
export declare const MainCreatorLocked = 128;
export declare const PinSourceWriter = 0;
export declare const PinSourceSlotLen = 32;
export declare const PinSourceSlot = 33;
export declare const PinSourceRevision = 56;
export declare const PinSourceKind = 64;
export declare const PinSourceSub = 65;
export declare const PinFlat = 66;
export declare const HolderSectionPrefix = 32;
export declare const RoleNone = 0;
export declare const RoleCreator = 1;
export declare const RoleHolder = 2;
export declare const PFlags = 1;
export declare const PRevision = 2;
export declare const PSets = 10;
export declare const GRevision = 1;
export declare const GSet = 9;
export declare const PolicyLocked = 128;
export declare const PolicyHolderPinsCollectibleOnly = 2;
export declare const PolicyManagerWrites = 1;
export declare const DefaultPolicyFlags = 1;
export declare const WriterSetClosed = 0;
export declare const WriterSetOpen = 1;
export declare const WriterSetAllow = 2;
export declare const WriterSetDelegate = 3;
export declare const WriterSetMeta = 4;
export declare const MaxAllowWriters = 8;
export declare const MetaTagCollectible = "c";
export declare const MetaTagHolder = "h";
export declare const MetaTagGrant = "g";
export declare const MetaNameHashBytes = 18;
export declare const MaxProofLevels = 24;
export declare const PlainAsa = 0;
export declare const Arc20GetAssetConfig = "get_asset_config(asset)(uint64,uint32,bool,string,string,string,byte[],address,address,address,address)";
export declare const Arc20ManagerOffset = 25;
export declare const DelegateAdmit = "arcTBD_admit(uint64,address,byte[],address)bool";
/** Logged before a deposit mismatch fails: prefix || required amount (8 bytes). */
export declare const DepositLogPrefix = "cv:deposit:";
/** `ifRevision`: the entry must not exist. */
export declare const IfAbsent = 0n;
/** `ifRevision`: no precondition. */
export declare const IfAny = 18446744073709551615n;
export declare const RemovedNone = 0;
export declare const RemovedPurged = 1;
export declare const RemovedByWriter = 2;
export declare const RemovedVoid = 3;
export declare const RemovedByHolder = 4;
export declare const RemovedByCreator = 5;
export declare const RemovedByAssetCreator = 6;
export declare const MbrNull = 0;
export declare const MbrPositive = 1;
export declare const MbrNegative = 255;
export declare const GlobalStateKeyRevision = "r";
export declare const GlobalStateKeyMetaApp = "a";
export declare const GlobalStateKeyMetaTreeType = "t";
/** Box MBR on Algorand: 2500 + 400 × (name + value) microAlgo. */
export declare const boxMbr: (nameLength: number, valueLength: number) => bigint;
