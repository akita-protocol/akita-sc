/**
 * ARC-65 error codes emitted by InferenceNetwork and InferencePlugin.
 *
 * Keep this in sync with `akita-sc/smart_contracts/inference/errors.ts` and
 * `akita-sc/smart_contracts/arc58/plugins/inference/errors.ts`: the short codes
 * are the shared wire format between contract and SDK.
 *
 * Use `translateInferenceError(code)` to turn a code back into a
 * human-readable message for display in a UI or log.
 */

import { makeErrorTranslator } from '../errors'

export const INFERENCE_ERROR_MESSAGES: Record<string, string> = {
  // --- InferenceNetwork --------------------------------------------------
  errInad: 'ARC-65 codes for InferenceNetwork. Keep in sync with akita-sdk/src/errors.ts. /  /** Only the Akita DAO\'s wallet, or the network\'s bootstrap admin while it has one, may do this.',
  errInow: 'Only the provider\'s owner may do this.',
  errInbw: 'The unbonding delay is outside the allowed range.',
  errInza: 'The address must not be the zero address.',
  errInxa: 'The asset is not accepted for tickets.',
  errInoi: 'This app is not opted in to the asset.',
  errInnp: 'No provider with this id.',
  errInpi: 'The provider is not active.',
  errInbs: 'The provider\'s status cannot change this way.',
  errInbl: 'The bond is below the DAO\'s provider bond.',
  errInub: 'The bond is still unbonding, or unbonding has not started.',
  errInsh: 'More than the provider\'s bond.',
  errInzc: 'A ticket must lock more than zero.',
  errIncl: 'Only the provider\'s claim account may do this.',
  errInnt: 'No ticket with this id.',
  errInex: 'The ticket\'s settle window has ended.',
  errInnx: 'The ticket\'s settle window has not ended.',
  errInol: 'The cost is above what the ticket locked.',
  errInbd: 'The transfer is not a plain transfer of the asset to this app from the caller.',
  errInbp: 'The storage payment is not the exact amount to this app.',
  errInbm: 'The metadata URI is empty or longer than 512 bytes.',
  errInno: 'No sponsor pool with this id.',
  errInsp: 'Only the pool\'s sponsor may do this.',
  errInpd: 'Only the pool\'s allocator, or a subscriber for their own subscription, may open a pool ticket.',
  errInpx: 'The member\'s use since their last subscription payment, or the pool\'s balance or credit, cannot cover this ticket.',
  errInpe: 'A pool needs a merchant and a subscription service.',
  errInns: 'The subscription is not a paid-up subscription to the pool\'s service.',
  errInwl: 'Inference tickets are only for Akita wallets: the call must come through a wallet that controls its account.',
  errInte: 'A ticket for this principal and request id already exists.',
  errInne: 'The Akita DAO has not named the revenue escrow the network\'s fees go to, or it is not opted in to the asset.',
  errInnb: 'Open registration needs a provider bond floor: the DAO\'s providerBond is zero.',
  errInfz: 'The provider is frozen: it cannot settle, and its open tickets are refunded when their windows end.',
  errInpl: 'The pool does not pay this provider.',
  // --- InferencePlugin ---------------------------------------------------
  errIpen: 'An InferencePlugin policy body is not the canonical ARC-4 encoding of its fields.',
  errIpfl: 'An InferencePlugin policy must name a network, 1 to 8 providers and 1 to 8 assets (ascending, no repeats), and a cap above zero.',
  errIpdn: 'The grant\'s policy does not allow this network, provider or asset.',
  errIpcp: 'The ticket\'s max price is above the policy\'s cap.',
}

/**
 * Translates an InferenceNetwork or InferencePlugin error code (or raw ARC-65
 * log entry) into a human-readable message. Falls back to the common error
 * table; unknown codes pass through as-is.
 */
export const translateInferenceError = makeErrorTranslator(INFERENCE_ERROR_MESSAGES)
