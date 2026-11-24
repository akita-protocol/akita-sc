import { Account, bytes, uint64 } from '@algorandfoundation/algorand-typescript'

/** Network-wide settings, changed only by the admin. */
export type InferenceSettings = {
  /** Protocol fee on every claim, in basis points, at most INFERENCE_MAX_FEE_BPS. New channels take the fee current when they open. */
  feeBps: uint64
  /** The asset providers bond in (AKTA). New providers bond in it; existing bonds keep their own asset. */
  bondAsset: uint64
  /** Smallest bond a provider can register with. */
  minBond: uint64
  /** Seconds between a provider starting to unbond and taking its bond back. */
  unbondDelay: uint64
  /** Seconds a provider has to claim its last receipt after the payer asks to close. */
  closeWindow: uint64
  /** When false, new providers wait as Pending until the admin activates them. */
  openRegistration: boolean
}

/** One provider. Box key: 'p' + provider id. */
export type Provider = {
  /** Manages the provider: metadata, payout, claim account, attestation, bond. */
  owner: Account
  /** The only account that may claim receipts on the provider's channels. */
  claimer: Account
  /** Receives every payout. Must be opted in to the channels' assets. */
  payout: Account
  /** Bond held by this app. */
  bond: uint64
  /** The asset of the bond. */
  bondAsset: uint64
  /** ProviderPending, ProviderActive, ProviderPaused, ProviderUnbonding or ProviderExited. */
  status: uint64
  /** While unbonding, the time the bond can be withdrawn. */
  unbondAt: uint64
}

/**
 * Proof that a provider runs inside a trusted execution environment, for private inference later.
 * Clients check it off-chain and encrypt prompts to `encryptionKey`. Box key: 'a' + provider id.
 */
export type Attestation = {
  /** Which TEE and attestation format; 0 means none. */
  kind: uint64
  /** Hash of the measured enclave image. */
  measurement: bytes<32>
  /** The enclave's X25519 public key. */
  encryptionKey: bytes<32>
}

/** A payer's prepaid balance with one provider. Box key: 'c' + channel id. */
export type Channel = {
  /** Paid the deposit; gets the remainder and the storage deposit back on close. */
  payer: Account
  /** The ed25519 key that signs receipts for this channel. */
  sessionKey: bytes<32>
  provider: uint64
  /** 0 for ALGO, else the ASA id. */
  asset: uint64
  /** Everything deposited so far. */
  deposit: uint64
  /** The highest receipt total claimed so far. */
  claimed: uint64
  /** The protocol fee when the channel opened, in basis points. */
  feeBps: uint64
  /** 0 while open; once the payer asks to close, the time the channel can be finalized. */
  closeAt: uint64
}

/** A payment asset's state. Box key: 'x' + asset id. */
export type PaymentAsset = {
  /** 1 when new channels may use the asset. */
  allowed: uint64
  /** Fees accrued and not yet swept to the treasury. */
  fees: uint64
}

export type InferenceProviderRegistered = { provider: uint64; owner: Account; status: uint64; bond: uint64 }
export type InferenceProviderStatus = { provider: uint64; status: uint64 }
export type InferenceChannelOpened = { channel: uint64; payer: Account; provider: uint64; asset: uint64; deposit: uint64 }
export type InferenceChannelFunded = { channel: uint64; deposit: uint64 }
export type InferenceClaimed = { channel: uint64; provider: uint64; total: uint64; paid: uint64; fee: uint64 }
export type InferenceCloseRequested = { channel: uint64; closeAt: uint64 }
export type InferenceChannelClosed = { channel: uint64; claimed: uint64; refunded: uint64 }
