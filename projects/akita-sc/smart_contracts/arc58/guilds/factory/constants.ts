import { uint64 } from '@algorandfoundation/algorand-typescript'

export const GuildFactoryGuildProgramKey = 'guild'
export const GuildFactoryBoxPrefixPrograms = 'p'

// bundled consensus program keys
export const GuildConsensusProgramFixedSigners = 'fixed-signers'
export const GuildConsensusProgramLockedToken = 'locked-token'
export const GuildConsensusProgramSubscription = 'subscription'

// Box names are capped at 64 bytes; reserve one byte for the program BoxMap prefix.
export const MAX_GUILD_PROGRAM_NAME_BYTES: uint64 = 63

// Each load call stays below the pinned signer's 2 KiB argument limit. All chunks are atomic.
export const PROGRAM_UPLOAD_CHUNK_SIZE: uint64 = 2_000
export const MAX_GUILD_APPROVAL_PROGRAM_SIZE: uint64 = 16_372
