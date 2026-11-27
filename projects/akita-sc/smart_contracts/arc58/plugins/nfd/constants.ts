export const NFDPluginGlobalStateKeyRegistry = 'nfd_registry'

export const NFDGlobalStateKeySaleAmountKey = 'i.sellamt'
export const NFDGlobalStateKeyExpirationTime = 'i.expirationTime'
/** NFD owner (32-byte public key) — internal global state, NFD contract v2+ */
export const NFDGlobalStateKeyOwner = 'i.owner.a'
export const NFDPluginAutoRenewWindow = 30 * 24 * 60 * 60 // 30 days
/**
 * The most `linkNfdAddress` pays into an NFD the linking account does not own: the storage of one
 * verified address, with room to spare (live MainNet link groups pay 20,500 to 40,600 microAlgo).
 */
export const NFDPluginMaxForeignLinkMbr = 100_000

export const NFDFieldCandidateAlgoAddress = 'u.cav.algo.a'
export const NFDFieldVerifiedAlgoAddresses = 'v.caAlgo.0.as'
