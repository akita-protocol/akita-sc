import { describe, test, expect } from 'vitest'
import { encodeConnectUri, decodeConnectUri } from './uri'

describe('encodeConnectUri', () => {
  test('formats liquid:// URI with origin and requestId', () => {
    const uri = encodeConnectUri({
      origin: 'signal.akita.community',
      requestId: 'abc-123',
    })
    expect(uri).toBe('liquid://signal.akita.community?requestId=abc-123')
  })

  test('percent-encodes special chars in requestId', () => {
    const uri = encodeConnectUri({
      origin: 'signal.akita.community',
      requestId: 'a b+c/d',
    })
    // encodeURIComponent converts space→%20, +→%2B, /→%2F
    expect(uri).toBe('liquid://signal.akita.community?requestId=a%20b%2Bc%2Fd')
  })

  test('passes localhost and ports through verbatim', () => {
    const uri = encodeConnectUri({
      origin: 'localhost:8080',
      requestId: 'req-1',
    })
    expect(uri).toBe('liquid://localhost:8080?requestId=req-1')
  })
})

describe('decodeConnectUri', () => {
  test('parses a canonical liquid:// URI', () => {
    const parsed = decodeConnectUri('liquid://signal.akita.community?requestId=abc-123')
    expect(parsed).toEqual({
      origin: 'signal.akita.community',
      requestId: 'abc-123',
    })
  })

  test('decodes percent-encoded requestId', () => {
    const parsed = decodeConnectUri('liquid://signal.akita.community?requestId=a%20b%2Bc%2Fd')
    expect(parsed.requestId).toBe('a b+c/d')
  })

  test('trims surrounding whitespace', () => {
    const parsed = decodeConnectUri('  liquid://signal.akita.community?requestId=abc-123  ')
    expect(parsed.origin).toBe('signal.akita.community')
    expect(parsed.requestId).toBe('abc-123')
  })

  test('accepts LIQUID:// in uppercase (scheme is case-insensitive)', () => {
    const parsed = decodeConnectUri('LIQUID://signal.akita.community?requestId=abc-123')
    expect(parsed.origin).toBe('signal.akita.community')
    expect(parsed.requestId).toBe('abc-123')
  })

  test('accepts legacy request_id parameter name', () => {
    // The decoder explicitly falls back to request_id for backward
    // compatibility; lock in that behavior.
    const parsed = decodeConnectUri('liquid://signal.akita.community?request_id=legacy-1')
    expect(parsed.requestId).toBe('legacy-1')
  })

  test('prefers requestId over request_id when both are present', () => {
    const parsed = decodeConnectUri(
      'liquid://signal.akita.community?requestId=new&request_id=old'
    )
    expect(parsed.requestId).toBe('new')
  })

  test('throws on http:// scheme', () => {
    expect(() => decodeConnectUri('http://signal.akita.community?requestId=abc-123'))
      .toThrow(/expected liquid:\/\/ scheme/)
  })

  test('throws on missing scheme', () => {
    expect(() => decodeConnectUri('signal.akita.community?requestId=abc-123'))
      .toThrow(/expected liquid:\/\/ scheme/)
  })

  test('throws when requestId is missing', () => {
    expect(() => decodeConnectUri('liquid://signal.akita.community'))
      .toThrow(/missing requestId/)
  })

  test('throws on empty string', () => {
    expect(() => decodeConnectUri('')).toThrow(/expected liquid:\/\/ scheme/)
  })
})

describe('round-trip encode → decode', () => {
  test('preserves origin and requestId exactly', () => {
    const original = {
      origin: 'signal.akita.community',
      requestId: 'session-9f3a-uuid',
    }
    const decoded = decodeConnectUri(encodeConnectUri(original))
    expect(decoded).toEqual(original)
  })

  test('preserves requestId with URI-reserved characters', () => {
    const original = {
      origin: 'localhost:3000',
      requestId: 'id with spaces & special=chars?yes',
    }
    const decoded = decodeConnectUri(encodeConnectUri(original))
    expect(decoded).toEqual(original)
  })
})
