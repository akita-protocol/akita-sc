/** ARC-65 codes for InferencePlugin. Keep in sync with akita-sdk/src/inference/errors.ts. */
/** An InferencePlugin policy body is not the canonical ARC-4 encoding of its fields. */
export const errInferencePolicyEncoding = 'errIpen'
/** An InferencePlugin policy must name a network, 1 to 8 providers and 1 to 8 assets (ascending, no repeats), and a cap above zero. */
export const errInferencePolicyFields = 'errIpfl'
/** The grant's policy does not allow this network, provider or asset. */
export const errInferencePolicyDenied = 'errIpdn'
/** The ticket's max price is above the policy's cap. */
export const errInferencePolicyCap = 'errIpcp'
