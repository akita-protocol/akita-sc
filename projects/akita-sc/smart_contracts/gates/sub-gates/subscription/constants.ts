import { uint64 } from "@algorandfoundation/algorand-typescript";

export const SubscriptionGateRegistryMBR: uint64 = 21_700

/**
 * Longest grace after a payment window opens during which the previous window's payment still
 * counts as active (the grace is `min(SubscriptionGraceMax, interval / 4)`). It gives a keeper time
 * to collect the new window; a whole window of grace would let a subscriber pay every other window.
 */
export const SubscriptionGraceMax: uint64 = 86_400
