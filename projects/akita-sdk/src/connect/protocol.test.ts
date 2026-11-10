import { describe, expect, test } from 'vitest'
import {
  authenticateConnectMessage,
  createConnectSecret,
  createNonceTracker,
  validateWalletConnectRequest,
  verifyConnectMessage,
} from './protocol'
import type { WalletConnectRequest } from './types'

function request(): WalletConnectRequest {
  return {
    type: 'wallet-connect',
    v: 3,
    network: 'testnet',
    dapp: { name: 'Subscriptions', origin: 'https://subscriptions.akita.community' },
    plugins: [{
      id: 'subscriptionsPlugin',
      appId: '1234',
      required: true,
      coverFees: true,
    }],
    passkey: {
      required: true,
      provider: 'akita-hyperspace',
      rpId: 'akita.community',
      userName: 'wallet',
      userDisplayName: 'Akita wallet',
      userHandle: 'dXNlci1oYW5kbGUtMTIzNDU2',
      challenge: 'Y2hhbGxlbmdlLTEyMzQ1Njc4OTA',
      transactionPreview: 'optional',
    },
    expiresAt: Math.floor(Date.now() / 1000) + 3600,
  }
}

describe('authenticated connect protocol', () => {
  test('authenticates and validates a v3 request', () => {
    const secret = createConnectSecret()
    const payload = request()
    const envelope = authenticateConnectMessage({
      requestId: 'request-1',
      secret,
      payload,
      issuedAt: 100,
      expiresAt: 200,
      nonce: 'nonce-1',
    })

    expect(verifyConnectMessage({
      envelope,
      requestId: 'request-1',
      secret,
      now: 150,
    })).toEqual(payload)
  })

  test('rejects tampering and replayed nonces', () => {
    const secret = createConnectSecret()
    const envelope = authenticateConnectMessage({
      requestId: 'request-1',
      secret,
      payload: request(),
      issuedAt: 100,
      expiresAt: 200,
      nonce: 'nonce-1',
    })
    const consumeNonce = createNonceTracker()

    verifyConnectMessage({ envelope, requestId: 'request-1', secret, now: 150, consumeNonce })
    expect(() => verifyConnectMessage({ envelope, requestId: 'request-1', secret, now: 150, consumeNonce }))
      .toThrow(/already used/)

    const tampered = structuredClone(envelope)
    if (tampered.payload.type === 'wallet-connect') tampered.payload.dapp.name = 'Attacker'
    expect(() => verifyConnectMessage({ envelope: tampered, requestId: 'request-1', secret, now: 150 }))
      .toThrow(/authentication failed/)
  })
})

describe('wallet connect validation', () => {
  test('requires HTTPS, matching rpId, and Akita provider', () => {
    const insecure = request()
    insecure.dapp.origin = 'http://subscriptions.akita.community'
    expect(() => validateWalletConnectRequest(insecure)).toThrow(/HTTPS/)

    const wrongRp = request()
    wrongRp.passkey.rpId = 'example.com'
    expect(() => validateWalletConnectRequest(wrongRp)).toThrow(/rpId/)
  })

  test('rejects missing and duplicate plugin deployments', () => {
    const missing = request()
    missing.plugins[0].appId = '0'
    expect(() => validateWalletConnectRequest(missing)).toThrow(/Invalid plugin deployment/)

    const duplicate = request()
    duplicate.plugins.push({ ...duplicate.plugins[0] })
    expect(() => validateWalletConnectRequest(duplicate)).toThrow(/Duplicate plugin/)
  })
})
