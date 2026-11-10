import { hmac } from '@noble/hashes/hmac.js'
import { sha256 } from '@noble/hashes/sha2.js'
import { randomBytes } from '@noble/hashes/utils.js'
import { getSessionKeyMultisig } from './session-key'
import type {
  AuthenticatedConnectEnvelope,
  ConnectRequest,
  ConnectResponse,
  DappIdentity,
  SerializedAllowance,
  SessionKeyConnectRequest,
  SessionKeySession,
  WalletConnectFinalizeRequest,
  WalletConnectPluginRequest,
  WalletConnectRequest,
  WalletConnectSession,
} from './types'

const encoder = new TextEncoder()

function base64UrlEncode(value: Uint8Array): string {
  let binary = ''
  for (const byte of value) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

function base64UrlDecode(value: string): Uint8Array {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/')
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=')
  const binary = atob(padded)
  return Uint8Array.from(binary, (character) => character.charCodeAt(0))
}

function canonicalize(value: unknown): string {
  if (value === undefined) return 'null'
  if (value === null || typeof value !== 'object') return JSON.stringify(value)
  if (Array.isArray(value)) return `[${value.map(canonicalize).join(',')}]`
  const object = value as unknown as Record<string, unknown>
  return `{${Object.keys(object).filter((key) => object[key] !== undefined).sort().map((key) => `${JSON.stringify(key)}:${canonicalize(object[key])}`).join(',')}}`
}

function envelopeSigningValue(envelope: Omit<AuthenticatedConnectEnvelope, 'mac'>): Uint8Array {
  return encoder.encode(canonicalize(envelope))
}

function constantTimeEqual(left: Uint8Array, right: Uint8Array): boolean {
  if (left.length !== right.length) return false
  let difference = 0
  for (let index = 0; index < left.length; index++) difference |= left[index] ^ right[index]
  return difference === 0
}

export function createConnectSecret(): string {
  return base64UrlEncode(randomBytes(32))
}

export function createConnectNonce(): string {
  return base64UrlEncode(randomBytes(16))
}

export function authenticateConnectMessage<T extends ConnectRequest | ConnectResponse>(params: {
  requestId: string
  secret: string
  payload: T
  issuedAt?: number
  expiresAt?: number
  nonce?: string
}): AuthenticatedConnectEnvelope<T> {
  const issuedAt = params.issuedAt ?? Math.floor(Date.now() / 1000)
  const unsigned = {
    v: 3 as const,
    requestId: params.requestId,
    nonce: params.nonce ?? createConnectNonce(),
    issuedAt,
    expiresAt: params.expiresAt ?? issuedAt + 120,
    payload: params.payload,
  }
  const mac = hmac(sha256, base64UrlDecode(params.secret), envelopeSigningValue(unsigned))
  return { ...unsigned, mac: base64UrlEncode(mac) }
}

export function verifyConnectMessage<T extends ConnectRequest | ConnectResponse>(params: {
  envelope: AuthenticatedConnectEnvelope<T>
  requestId: string
  secret: string
  now?: number
  consumeNonce?: (nonce: string) => boolean
}): T {
  const { envelope } = params
  if (envelope.v !== 3 || envelope.requestId !== params.requestId) {
    throw new Error('Connect message does not match the scanned request')
  }
  const now = params.now ?? Math.floor(Date.now() / 1000)
  if (envelope.issuedAt > now + 30 || envelope.expiresAt < now || envelope.expiresAt <= envelope.issuedAt) {
    throw new Error('Connect message is expired or has an invalid validity window')
  }
  const { mac, ...unsigned } = envelope
  const expected = hmac(sha256, base64UrlDecode(params.secret), envelopeSigningValue(unsigned))
  if (!constantTimeEqual(base64UrlDecode(mac), expected)) {
    throw new Error('Connect message authentication failed')
  }
  if (params.consumeNonce && !params.consumeNonce(envelope.nonce)) {
    throw new Error('Connect message nonce was already used')
  }
  validateConnectPayload(envelope.payload)
  return envelope.payload
}

export function validateConnectPayload(payload: ConnectRequest | ConnectResponse): void {
  if (!payload || typeof payload !== 'object' || typeof payload.type !== 'string') {
    throw new Error('Invalid connect payload')
  }
  if (payload.type === 'wallet-connect') validateWalletConnectRequest(payload)
  if (payload.type === 'wallet-connect-finalize') validateWalletConnectFinalizeRequest(payload)
  if (payload.type === 'wallet-connect-revoke') {
    if (payload.v !== 3 || !payload.sessionId) throw new Error('Invalid wallet-connect revocation request')
  }
  if (payload.type === 'wallet-connect-ready') validateWalletConnectSession(payload.session)
  if (payload.type === 'wallet-connect-revoked' && !payload.sessionId) {
    throw new Error('Invalid wallet-connect revocation response')
  }
  if (payload.type === 'session-key-connect') validateSessionKeyConnectRequest(payload)
  if (payload.type === 'session-key-revoke') {
    if (payload.v !== 1 || !payload.sessionId) throw new Error('Invalid session key revocation request')
  }
  if (payload.type === 'session-key-connected') validateSessionKeySession(payload.session)
  if (payload.type === 'session-key-revoked' && !payload.sessionId) {
    throw new Error('Invalid session key revocation response')
  }
}

function isBase64Url(value: string, minimumBytes = 1): boolean {
  if (!/^[A-Za-z0-9_-]+$/.test(value)) return false
  try {
    return base64UrlDecode(value).length >= minimumBytes
  } catch {
    return false
  }
}

function dappOrigin(dapp: DappIdentity): URL {
  const origin = new URL(dapp.origin)
  if (origin.protocol !== 'https:' && origin.hostname !== 'localhost') {
    throw new Error('Wallet connections require an HTTPS dApp origin')
  }
  return origin
}

function validatePluginRequests(plugins: WalletConnectPluginRequest[]): void {
  const identities = new Set<string>()
  for (const plugin of plugins) {
    if (!plugin.id || !/^\d+$/.test(plugin.appId) || plugin.appId === '0') {
      throw new Error(`Invalid plugin deployment for ${plugin.id || 'unknown plugin'}`)
    }
    const identity = `${plugin.id}:${plugin.appId}`
    if (identities.has(identity)) throw new Error(`Duplicate plugin request: ${identity}`)
    identities.add(identity)
    const selectors = new Set<string>()
    for (const method of plugin.methods ?? []) {
      const selector = method.name.toLowerCase()
      if (!/^[0-9a-f]{8}$/.test(selector) || !/^\d+$/.test(method.cooldown) || selectors.has(selector)) {
        throw new Error(`Invalid or duplicate plugin method for ${plugin.id}`)
      }
      selectors.add(selector)
    }
    if (plugin.lastValid !== undefined && !/^\d+$/.test(plugin.lastValid)) {
      throw new Error(`Invalid plugin validity for ${plugin.id}`)
    }
  }
}

function validateAllowances(allowances: SerializedAllowance[]): void {
  const assets = new Set<string>()
  const amounts = (allowance: SerializedAllowance): string[] => {
    switch (allowance.type) {
      case 'flat': return [allowance.amount]
      case 'window': return [allowance.amount, allowance.interval]
      case 'drip': return [allowance.rate, allowance.max, allowance.interval]
      default: throw new Error('Unknown allowance type')
    }
  }
  for (const allowance of allowances) {
    if (!/^\d+$/.test(allowance.asset) || assets.has(allowance.asset)) {
      throw new Error(`Invalid or duplicate allowance asset: ${allowance.asset}`)
    }
    assets.add(allowance.asset)
    if (!amounts(allowance).every((value) => /^\d+$/.test(value))) {
      throw new Error(`Invalid allowance amounts for asset ${allowance.asset}`)
    }
  }
}

const ADDRESS_PATTERN = /^[A-Z2-7]{58}$/

export function validateWalletConnectRequest(request: WalletConnectRequest): void {
  if (request.v !== 3) throw new Error('Unsupported wallet-connect protocol version')
  const origin = dappOrigin(request.dapp)
  const rpId = request.passkey.rpId.toLowerCase()
  const host = origin.hostname.toLowerCase()
  if (host !== rpId && !host.endsWith(`.${rpId}`)) {
    throw new Error('Passkey rpId does not match the dApp origin')
  }
  if (request.passkey.provider !== 'akita-hyperspace' || request.passkey.required !== true) {
    throw new Error('Akita Hyperspace passkeys are required')
  }
  if (!isBase64Url(request.passkey.userHandle, 16) || !isBase64Url(request.passkey.challenge, 16)) {
    throw new Error('Passkey user handle and challenge must be strong base64url values')
  }
  if (request.expiresAt <= Math.floor(Date.now() / 1000)) {
    throw new Error('Requested session has already expired')
  }
  validatePluginRequests(request.plugins)
}

export function validateSessionKeyConnectRequest(request: SessionKeyConnectRequest): void {
  if (request.v !== 1) throw new Error('Unsupported session key protocol version')
  dappOrigin(request.dapp)
  if (!ADDRESS_PATTERN.test(request.browserKey) || !ADDRESS_PATTERN.test(request.serverKey)) {
    throw new Error('Session keys must be Algorand addresses')
  }
  if (request.browserKey === request.serverKey) {
    throw new Error('The browser and server session keys must differ')
  }
  getSessionKeyMultisig(request.browserKey, request.serverKey)
  if (!request.escrowName || request.escrowName.length > 64) {
    throw new Error('Session keys need an escrow name of at most 64 characters')
  }
  if (request.expiresAt <= Math.floor(Date.now() / 1000)) {
    throw new Error('Requested session has already expired')
  }
  if (request.plugins.length === 0) throw new Error('Session keys must request at least one plugin')
  validatePluginRequests(request.plugins)
  validateAllowances(request.allowances ?? [])
}

export function validateSessionKeySession(session: SessionKeySession): void {
  if (session.v !== 1 || session.kind !== 'session-key' || !session.sessionId) {
    throw new Error('Invalid Akita session key')
  }
  if (!/^\d+$/.test(session.account.walletAppId) || session.account.walletAppId === '0') {
    throw new Error('Invalid wallet application ID')
  }
  if (!ADDRESS_PATTERN.test(session.account.address)) throw new Error('Invalid Akita wallet session address')
  dappOrigin(session.dapp)
  if (getSessionKeyMultisig(session.browserKey, session.serverKey).address !== session.caller) {
    throw new Error('Session key caller is not the multisig of its keys')
  }
  if (!session.escrowName) throw new Error('Session key escrow is missing')
  if (session.expiresAt <= session.createdAt || session.expiresAt <= Math.floor(Date.now() / 1000)) {
    throw new Error('Akita session key is expired')
  }
  validatePluginRequests(session.plugins)
  validateAllowances(session.allowances)
}

export function validateWalletConnectFinalizeRequest(request: WalletConnectFinalizeRequest): void {
  if (request.v !== 3 || !request.sessionId || !request.account) {
    throw new Error('Invalid wallet-connect finalization request')
  }
  if (request.credential.provider !== 'akita-hyperspace') {
    throw new Error('Credential was not created by Akita Hyperspace')
  }
  if (!request.credential.rpId) throw new Error('Passkey rpId is required')
  if (!isBase64Url(request.credential.id, 16)) throw new Error('Invalid passkey credential ID')
  if (!/^[0-9a-fA-F]{64}$/.test(request.credential.publicKeyX) || !/^[0-9a-fA-F]{64}$/.test(request.credential.publicKeyY)) {
    throw new Error('Invalid P-256 public key coordinates')
  }
}

export function validateWalletConnectSession(session: WalletConnectSession): void {
  if (session.v !== 3 || !session.sessionId || !session.account.address || !session.account.walletAppId) {
    throw new Error('Invalid Akita wallet session')
  }
  if (!/^\d+$/.test(session.account.walletAppId) || session.account.walletAppId === '0') {
    throw new Error('Invalid wallet application ID')
  }
  if (!/^[A-Z2-7]{58}$/.test(session.account.address) || !/^[A-Z2-7]{58}$/.test(session.credential.caller)) {
    throw new Error('Invalid Akita wallet session address')
  }
  const origin = new URL(session.dapp.origin)
  const rpId = session.credential.rpId.toLowerCase()
  const host = origin.hostname.toLowerCase()
  if ((origin.protocol !== 'https:' && origin.hostname !== 'localhost') ||
      (host !== rpId && !host.endsWith(`.${rpId}`))) {
    throw new Error('Akita session passkey does not match its dApp origin')
  }
  if (session.expiresAt <= session.createdAt || session.expiresAt <= Math.floor(Date.now() / 1000)) {
    throw new Error('Akita wallet session is expired')
  }
  if (session.credential.provider !== 'akita-hyperspace' ||
      !isBase64Url(session.credential.id, 16) ||
      !/^[0-9a-fA-F]{64}$/.test(session.credential.publicKeyX) ||
      !/^[0-9a-fA-F]{64}$/.test(session.credential.publicKeyY)) {
    throw new Error('Invalid Akita wallet session credential')
  }
  const pluginKeys = new Set<string>()
  for (const plugin of session.plugins) {
    const key = `${plugin.id}:${plugin.appId}`
    if (!plugin.id || !/^\d+$/.test(plugin.appId) || plugin.appId === '0' || pluginKeys.has(key)) {
      throw new Error('Invalid Akita wallet session plugin')
    }
    if ((plugin.methods ?? []).some((method) =>
      !/^[0-9a-fA-F]{8}$/.test(method.name) || !/^\d+$/.test(method.cooldown)
    )) throw new Error('Invalid Akita wallet session plugin method')
    pluginKeys.add(key)
  }
  if (session.transactionPreview === 'required') {
    if (!session.nativePreview || !isBase64Url(session.nativePreview.token, 32)) {
      throw new Error('Required native transaction preview authorization is missing')
    }
    const endpoint = new URL(session.nativePreview.endpoint)
    if (endpoint.protocol !== 'https:' && endpoint.hostname !== 'localhost') {
      throw new Error('Native transaction preview endpoint must use HTTPS')
    }
  }
}

export function createNonceTracker(): (nonce: string) => boolean {
  const seen = new Set<string>()
  return (nonce) => {
    if (seen.has(nonce)) return false
    seen.add(nonce)
    return true
  }
}
