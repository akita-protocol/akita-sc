import algosdk from 'algosdk'
import { describe, expect, test } from 'vitest'
import {
  authenticateConnectMessage,
  createConnectSecret,
  validateSessionKeyConnectRequest,
  validateSessionKeySession,
  verifyConnectMessage,
} from './protocol'
import { getSessionKeyMultisig } from './session-key'
import type { SessionKeyConnectRequest, SessionKeySession } from './types'

const browserKey = algosdk.generateAccount().addr.toString()
const serverKey = algosdk.generateAccount().addr.toString()

function request(): SessionKeyConnectRequest {
  return {
    type: 'session-key-connect',
    v: 1,
    network: 'testnet',
    dapp: { name: 'Subscriptions', origin: 'https://subscriptions.akita.community' },
    browserKey,
    serverKey,
    escrowName: 'subscriptions',
    plugins: [{ id: 'payPlugin', appId: '1234', required: true, coverFees: true }],
    allowances: [{ asset: '0', type: 'window', amount: '5000000', interval: '86400' }],
    expiresAt: Math.floor(Date.now() / 1000) + 3600,
  }
}

function session(): SessionKeySession {
  const now = Math.floor(Date.now() / 1000)
  const { dapp, network, plugins, escrowName, allowances } = request()
  return {
    v: 1,
    kind: 'session-key',
    sessionId: 'c2Vzc2lvbi0xMjM0NTY3OA',
    network,
    dapp,
    account: { address: algosdk.generateAccount().addr.toString(), walletAppId: '42' },
    caller: getSessionKeyMultisig(browserKey, serverKey).address,
    browserKey,
    serverKey,
    escrowName,
    plugins,
    allowances: allowances!,
    createdAt: now,
    expiresAt: now + 3600,
  }
}

describe('session key multisig', () => {
  test('is a 2-of-2 of the browser key then the server key', () => {
    const { params, address } = getSessionKeyMultisig(browserKey, serverKey)
    expect(params).toEqual({ version: 1, threshold: 2, addrs: [browserKey, serverKey] })
    expect(address).toBe(algosdk.multisigAddress(params).toString())
    expect(getSessionKeyMultisig(serverKey, browserKey).address).not.toBe(address)
  })

  test('rejects reused or malformed keys', () => {
    expect(() => getSessionKeyMultisig(browserKey, browserKey)).toThrow()
    expect(() => getSessionKeyMultisig('NOT-AN-ADDRESS', serverKey)).toThrow()
  })
})

describe('session key protocol', () => {
  test('authenticates a connect request', () => {
    const secret = createConnectSecret()
    const envelope = authenticateConnectMessage({ requestId: 'request-1', secret, payload: request() })
    expect(verifyConnectMessage({ envelope, requestId: 'request-1', secret })).toEqual(request())
  })

  test('rejects bad connect requests', () => {
    expect(() => validateSessionKeyConnectRequest({ ...request(), serverKey: browserKey })).toThrow(/differ/)
    expect(() => validateSessionKeyConnectRequest({ ...request(), plugins: [] })).toThrow(/plugin/)
    expect(() => validateSessionKeyConnectRequest({ ...request(), escrowName: '' })).toThrow(/escrow/)
    expect(() => validateSessionKeyConnectRequest({
      ...request(),
      dapp: { name: 'x', origin: 'http://evil.example' },
    })).toThrow(/HTTPS/)
    expect(() => validateSessionKeyConnectRequest({
      ...request(),
      allowances: [
        { asset: '0', type: 'flat', amount: '1' },
        { asset: '0', type: 'flat', amount: '2' },
      ],
    })).toThrow(/duplicate/)
  })

  test('checks that the session caller is the multisig of its keys', () => {
    expect(() => validateSessionKeySession(session())).not.toThrow()
    expect(() => validateSessionKeySession({ ...session(), caller: browserKey })).toThrow(/multisig/)
  })
})
