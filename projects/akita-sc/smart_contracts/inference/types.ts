import { Account, bytes, uint64 } from '@algorandfoundation/algorand-typescript'

/**
 * Network settings, changed only by the admin. The fee and the provider bond are not here: the Akita
 * DAO sets them in its `inference_fees` field, like every other Akita service's fees.
 */
export type InferenceSettings = {
  /** Seconds between a provider starting to unbond and taking its bond back. */
  unbondDelay: uint64
  /** Seconds a provider has to settle a ticket before anyone can refund it. */
  settleWindow: uint64
  /** When false, new providers wait as Pending until the admin activates them. */
  openRegistration: boolean
}

/** One provider. Box key: 'p' + provider id. */
export type Provider = {
  /** Manages the provider: metadata, payout, claim account, attestation, bond. */
  owner: Account
  /** The only account that may settle this provider's tickets. */
  claimer: Account
  /** Receives every payout. Must be opted in to the payment assets. */
  payout: Account
  /** Bond held by this app. */
  bond: uint64
  /** The asset of the bond (AKTA when it registered). */
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

/** One request's locked max price. Box key: 't' + ticket id. */
export type Ticket = {
  /** Paid the lock; gets the rest and the storage deposit back. */
  payer: Account
  provider: uint64
  /** 0 for ALGO, else the ASA id. */
  asset: uint64
  /** The request's max price, locked here. */
  amount: uint64
  /** The DAO's fee when the ticket opened, out of 10_000. */
  feePercentage: uint64
  /** The end of the settle window. */
  expiresAt: uint64
}

/** A payment asset's state. Box key: 'x' + asset id. */
export type PaymentAsset = {
  /** 1 when new tickets may use the asset. */
  allowed: uint64
  /** DAO fees accrued and not yet swept to the treasury. */
  fees: uint64
}

export type InferenceProviderRegistered = { provider: uint64; owner: Account; status: uint64; bond: uint64 }
export type InferenceProviderStatus = { provider: uint64; status: uint64 }
export type InferenceTicketOpened = {
  ticket: uint64
  payer: Account
  provider: uint64
  asset: uint64
  amount: uint64
  /** The caller's id for the request, so the provider can match the ticket to what it served. */
  request: bytes<32>
  expiresAt: uint64
}
/** A settled or refunded ticket; a refund has cost 0. */
export type InferenceTicketSettled = { ticket: uint64; cost: uint64; paid: uint64; fee: uint64 }
export type InferenceSlashed = { provider: uint64; asset: uint64; amount: uint64; receiver: Account }
