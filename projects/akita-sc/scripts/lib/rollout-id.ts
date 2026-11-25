/**
 * The values `rollout:id` prints: ids and addresses a later rollout command needs, taken from what an
 * earlier step recorded, so that none is copied by hand.
 */
import algosdk from 'algosdk'

/** The app id recorded under `key` in a network's app map; throws when the key is unknown or not recorded yet. */
export function recordedAppId(appIds: Record<string, unknown>, key: string): bigint {
  if (!Object.prototype.hasOwnProperty.call(appIds, key)) {
    throw new Error(`The SDK has no app key "${key}"`)
  }
  const value = appIds[key]
  const id = typeof value === 'bigint' ? value : typeof value === 'number' && Number.isSafeInteger(value) ? BigInt(value) : 0n
  if (id <= 0n) throw new Error(`The SDK records no "${key}" for this network yet: run its deploy with --register, then rebuild the SDK`)
  return id
}

/** The address of an app. */
export function appAddress(appId: bigint): string {
  return algosdk.getApplicationAddress(appId).toString()
}

/** What a later command is given: a positive app id in decimal, or a 58-character address. */
export function isRolloutValue(text: string): boolean {
  return /^[1-9][0-9]*$/.test(text) || (text.length === 58 && algosdk.isValidAddress(text))
}
