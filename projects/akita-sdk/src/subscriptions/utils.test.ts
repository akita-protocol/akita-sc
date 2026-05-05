import { describe, test, expect } from 'vitest'
import { hexColorToBytes, bytesToHexColor, validateHexColor } from './utils'

describe('hexColorToBytes', () => {
  test('parses #RRGGBB', () => {
    expect(Array.from(hexColorToBytes('#FF00AA'))).toEqual([0xff, 0x00, 0xaa])
  })

  test('parses without leading #', () => {
    expect(Array.from(hexColorToBytes('FF00AA'))).toEqual([0xff, 0x00, 0xaa])
  })

  test('is case-insensitive', () => {
    expect(Array.from(hexColorToBytes('#ff00aa'))).toEqual([0xff, 0x00, 0xaa])
    expect(Array.from(hexColorToBytes('#Ff00Aa'))).toEqual([0xff, 0x00, 0xaa])
  })

  test('parses black and white', () => {
    expect(Array.from(hexColorToBytes('#000000'))).toEqual([0, 0, 0])
    expect(Array.from(hexColorToBytes('#FFFFFF'))).toEqual([0xff, 0xff, 0xff])
  })

  test('returns exactly 3 bytes', () => {
    expect(hexColorToBytes('#123456').length).toBe(3)
  })
})

describe('bytesToHexColor', () => {
  test('formats bytes as #RRGGBB uppercase', () => {
    expect(bytesToHexColor(new Uint8Array([0xff, 0x00, 0xaa]))).toBe('#FF00AA')
  })

  test('zero-pads single-digit hex values', () => {
    expect(bytesToHexColor(new Uint8Array([0x01, 0x02, 0x03]))).toBe('#010203')
  })

  test('produces uppercase output even though input is lowercase hex conceptually', () => {
    // 0xab → "AB" not "ab"
    expect(bytesToHexColor(new Uint8Array([0xab, 0xcd, 0xef]))).toBe('#ABCDEF')
  })
})

describe('round-trip hexColorToBytes → bytesToHexColor', () => {
  test('preserves original color (normalized to uppercase + leading #)', () => {
    for (const input of ['#ff00aa', '#000000', '#ffffff', '#123abc', 'DEADBE']) {
      const bytes = hexColorToBytes(input)
      const normalized = bytesToHexColor(bytes)
      // Strip leading # and uppercase for comparison
      const originalNormalized = '#' + input.replace('#', '').toUpperCase()
      expect(normalized).toBe(originalNormalized)
    }
  })
})

describe('validateHexColor', () => {
  test('accepts valid colors with leading #', () => {
    expect(() => validateHexColor('#FF00AA')).not.toThrow()
    expect(() => validateHexColor('#000000')).not.toThrow()
    expect(() => validateHexColor('#ffffff')).not.toThrow()
    expect(() => validateHexColor('#aBcDeF')).not.toThrow()
  })

  test('accepts valid colors without leading #', () => {
    expect(() => validateHexColor('FF00AA')).not.toThrow()
    expect(() => validateHexColor('abcdef')).not.toThrow()
  })

  test('rejects 3-digit shorthand', () => {
    expect(() => validateHexColor('#FFF')).toThrow(/Invalid hex color/)
  })

  test('rejects 8-digit (RGBA) form', () => {
    expect(() => validateHexColor('#FF00AAFF')).toThrow(/Invalid hex color/)
  })

  test('rejects non-hex characters', () => {
    expect(() => validateHexColor('#GG00AA')).toThrow(/Invalid hex color/)
    expect(() => validateHexColor('#FF00!!')).toThrow(/Invalid hex color/)
  })

  test('rejects empty string', () => {
    expect(() => validateHexColor('')).toThrow(/Invalid hex color/)
  })

  test('rejects leading # with wrong count', () => {
    expect(() => validateHexColor('#FF')).toThrow(/Invalid hex color/)
    expect(() => validateHexColor('#FFFFFFF')).toThrow(/Invalid hex color/)
  })

  test('rejects embedded whitespace', () => {
    expect(() => validateHexColor('#FF 00AA')).toThrow(/Invalid hex color/)
  })
})
