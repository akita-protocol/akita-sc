/**
 * Encode/decode helpers for the liquid:// connect URI scheme.
 *
 * URI format: liquid://<signaling-server-host>?requestId=<uuid>
 */

import type { AkitaConnectUri } from './types';

/**
 * Encode a connect URI from its components.
 *
 * @example
 * encodeConnectUri({ origin: "signal.akita.community", requestId: "abc-123" })
 * // => "liquid://signal.akita.community?requestId=abc-123"
 */
export function encodeConnectUri({ origin, requestId, v, secret }: AkitaConnectUri): string {
  const params = [`requestId=${encodeURIComponent(requestId)}`]
  if (v !== undefined) params.push(`v=${encodeURIComponent(String(v))}`)
  if (secret !== undefined) params.push(`secret=${encodeURIComponent(secret)}`)
  return `liquid://${origin}?${params.join('&')}`
}

/**
 * Decode a liquid:// connect URI into its components.
 *
 * @throws {Error} If the URI is not a valid liquid:// connect URI or is missing requestId.
 */
export function decodeConnectUri(uri: string): AkitaConnectUri {
  const trimmed = uri.trim()

  if (!trimmed.toLowerCase().startsWith('liquid://')) {
    throw new Error(`Invalid connect URI: expected liquid:// scheme, got "${trimmed}"`)
  }

  // Replace liquid:// with https:// so URL parser can handle it
  const asHttps = 'https://' + trimmed.slice('liquid://'.length)
  const parsed = new URL(asHttps)

  const origin = parsed.host
  if (!origin) {
    throw new Error(`Invalid connect URI: missing host in "${trimmed}"`)
  }

  const requestId = parsed.searchParams.get('requestId') || parsed.searchParams.get('request_id')
  if (!requestId) {
    throw new Error(`Invalid connect URI: missing requestId parameter in "${trimmed}"`)
  }

  const versionValue = parsed.searchParams.get('v')
  const v = versionValue === null ? undefined : Number(versionValue)
  if (v !== undefined && (!Number.isInteger(v) || v < 1)) {
    throw new Error(`Invalid connect URI: invalid protocol version in "${trimmed}"`)
  }

  const secret = parsed.searchParams.get('secret') ?? undefined
  if (v !== undefined && v >= 3 && !secret) {
    throw new Error(`Invalid connect URI: v${v} requires an authentication secret`)
  }

  return { origin, requestId, ...(v !== undefined && { v }), ...(secret && { secret }) }
}
