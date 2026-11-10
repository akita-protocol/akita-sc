import { describe, expect, test } from 'vitest'
import { createP256PasskeyLogicSigArgs, extractP256PublicKeyCoordinates, getP256PasskeyTeal, parseP256DerSignature } from './passkey'

describe('P-256 passkey LogicSig', () => {
  test('pins both public-key coordinates into the canonical program', () => {
    const teal = getP256PasskeyTeal({ publicKeyX: '11'.repeat(32), publicKeyY: '22'.repeat(32) })
    expect(teal).toContain(`pushbytes 0x${'11'.repeat(32)}`)
    expect(teal).toContain(`pushbytes 0x${'22'.repeat(32)}`)
    expect(teal).not.toContain('TMPL_')
  })

  test('normalizes DER integers and splits client data around the challenge', () => {
    const r = Uint8Array.from([0, 0x80, ...new Array(31).fill(1)])
    const s = Uint8Array.from([0x7f, ...new Array(31).fill(2)])
    const signature = Uint8Array.from([0x30, 0x45, 0x02, r.length, ...r, 0x02, s.length, ...s])
    const parsed = parseP256DerSignature(signature)
    expect(parsed.r).toHaveLength(32)
    expect(parsed.r[0]).toBe(0x80)
    expect(parsed.s).toEqual(s)

    const challenge = 'group_id'
    const args = createP256PasskeyLogicSigArgs({
      authenticatorData: Uint8Array.of(1, 2),
      clientDataJSON: new TextEncoder().encode(`{"type":"webauthn.get","challenge":"${challenge}","origin":"https://akita.community"}`),
      signature,
      credentialId: 'credential',
    }, challenge)
    expect(args).toHaveLength(6)
    expect(new TextDecoder().decode(args[2])).toBe(challenge)
  })

  test('rejects invalid coordinates and ambiguous challenges', () => {
    expect(() => getP256PasskeyTeal({ publicKeyX: 'bad', publicKeyY: '22'.repeat(32) }))
      .toThrow(/X coordinate/)
  })

  test('extracts coordinates from raw and SPKI public keys', () => {
    const point = Uint8Array.from([4, ...new Array(32).fill(0x11), ...new Array(32).fill(0x22)])
    expect(extractP256PublicKeyCoordinates(point)).toEqual({
      publicKeyX: '11'.repeat(32),
      publicKeyY: '22'.repeat(32),
    })
    expect(extractP256PublicKeyCoordinates(Uint8Array.from([0x30, 0x59, ...point]))).toEqual({
      publicKeyX: '11'.repeat(32),
      publicKeyY: '22'.repeat(32),
    })
  })
})
