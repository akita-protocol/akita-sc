export const RevenueManagerBoxPrefixEscrows = 'e'
export const RevenueManagerBoxPrefixReceiveAssets = 'a'
export const RevenueManagerBoxPrefixManagedAssets = 'm'
export const RevenueManagerBoxPrefixSplits = 's'
export const RevenueManagerBoxPrefixSplitRefs = 'r'

// ManagedAssetKey encodes as (uint64,string,uint64): 20 bytes of fixed/
// dynamic-length metadata + the string, plus the one-byte BoxMap prefix.
// Algorand box names are capped at 64 bytes, leaving 43 for the name.
export const RevenueManagerEscrowNameMaxBytes: uint64 = 43
import { uint64 } from '@algorandfoundation/algorand-typescript'
