import { describe, expect, test } from 'vitest'
import { SOCIAL_CLAIM_GIFT_MBR, socialClaimAttestationMessage, socialClaimGiftBoxName, socialClaimSubject } from './social-claim'

const hex = (bytes: Uint8Array) => Buffer.from(bytes).toString('hex')

describe('social-claim encodings', () => {
  // The claim portal signs this exact vector; the contract rebuilds the same bytes on chain.
  test('attestation message matches the pinned vector', () => {
    const message = socialClaimAttestationMessage({
      appId: 1234n,
      subject: socialClaimSubject('x', '42'),
      newAdmin: 'AAAQEAYEAUDAOCAJBIFQYDIOB4IBCEQTCQKRMFYYDENBWHA5DYP7MUPJQE',
      expires: 1700000000n,
    })
    expect(hex(message)).toBe(
      '616b6974612f736f6369616c2d636c61696d2f763100000000000004d2'
      + 'c706741f46b73f252184e998695423f03a62a5c392819060cf15da5cd5b62cd7'
      + '000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f'
      + '000000006553f100',
    )
  })

  test('gift box name is g + subject + uint64be(senderWallet) + uint64be(asset)', () => {
    const subject = new Uint8Array(32).fill(0xab)
    const name = socialClaimGiftBoxName(subject, 0x0102n, 0x0304n)
    expect(name.length).toBe(49)
    expect(hex(name)).toBe('67' + 'ab'.repeat(32) + '0000000000000102' + '0000000000000304')
  })

  test('the gift box deposit covers the box name and a value that holds the payer', () => {
    // 2_500 + 400 * (49 name bytes + 8 amount + 8 expiry + 32 payer)
    expect(SOCIAL_CLAIM_GIFT_MBR).toBe(2_500n + 400n * (49n + 48n))
  })

  test('rejects a subject that is not 32 bytes', () => {
    expect(() => socialClaimAttestationMessage({
      appId: 1n, subject: new Uint8Array(31), newAdmin: 'AAAQEAYEAUDAOCAJBIFQYDIOB4IBCEQTCQKRMFYYDENBWHA5DYP7MUPJQE', expires: 1n,
    })).toThrow()
  })
})
