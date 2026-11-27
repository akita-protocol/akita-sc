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
  /** ProviderPending, ProviderActive, ProviderPaused, ProviderUnbonding, ProviderExited or ProviderFrozen. */
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

/** One request's locked max price. Box key: 't' + ticket id, sha256(principal, request). */
export type Ticket = {
  /**
   * Paid the lock and gets the rest back (or, if it can no longer receive, the principal does). For a
   * pool ticket the pool paid, and this is the address of the subscription it counts against.
   */
  payer: Account
  /** The Akita account the request is attributed to: its wallet's controlled address. */
  principal: Account
  /**
   * Paid the storage deposit and gets it back (or, if it can no longer receive, the principal does).
   * For a pool ticket the deposit goes back to the principal, or to the pool's credit when this is
   * the zero address: the pool paid it, as for a ticket the pool's allocator opened.
   */
  depositor: Account
  /** The principal's Akita wallet. */
  wallet: uint64
  provider: uint64
  /** 0 for ALGO, else the ASA id. */
  asset: uint64
  /** The request's max price, locked here. */
  amount: uint64
  /** The DAO's fee when the ticket opened, out of 10_000. */
  feePercentage: uint64
  /** The end of the settle window. */
  expiresAt: uint64
  /** The sponsor pool that paid the lock, or 0; the rest goes back to the pool. */
  pool: uint64
  /** For a pool ticket, the id of the subscription it counts against. */
  subscription: uint64
  /** For a pool ticket, the subscription payment it counts against. */
  lastPayment: uint64
}

/**
 * Prepaid inference a sponsor (such as Akita) gives the subscribers of a subscription service. Box key:
 * 'o' + pool id. Each subscription payment gives its subscriber `perPayment` until the next payment.
 */
export type Pool = {
  /** Funds and manages the pool, and takes back what is left. */
  sponsor: Account
  /** May open pool tickets for any subscriber (such as Akita's backend); the zero address for none. */
  allocator: Account
  /** The subscription service's merchant. */
  merchant: Account
  /** 0 for ALGO, else the ASA id. */
  asset: uint64
  /** What the pool holds and has not locked. */
  balance: uint64
  /** The merchant's subscription service. */
  serviceID: uint64
  /** What each subscription payment gives its subscriber. */
  perPayment: uint64
  /** ALGO the sponsor set aside for ticket and usage boxes. */
  credit: uint64
}

/** A provider a pool pays. Box key: 'q' + this. */
export type PoolProviderKey = { pool: uint64; provider: uint64 }

/** A subscription's use of a pool. Box key: 'u' + this. */
export type UsageKey = { pool: uint64; subscriber: Account; subscription: uint64 }
export type Usage = {
  /** The subscription payment `used` counts against. A new payment starts it over. */
  lastPayment: uint64
  used: uint64
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
  ticket: bytes<32>
  payer: Account
  /** The Akita account the request is attributed to (the wallet's controlled address), and its wallet. */
  principal: Account
  wallet: uint64
  provider: uint64
  asset: uint64
  amount: uint64
  /** The caller's id for the request, so the provider can match the ticket to what it served. */
  request: bytes<32>
  expiresAt: uint64
  pool: uint64
}
/** A settled or refunded ticket; a refund has cost 0. */
export type InferenceTicketSettled = {
  ticket: bytes<32>
  principal: Account
  wallet: uint64
  provider: uint64
  cost: uint64
  paid: uint64
  fee: uint64
}
export type InferenceSlashed = { provider: uint64; asset: uint64; amount: uint64; receiver: Account }
