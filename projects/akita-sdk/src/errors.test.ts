import { describe, expect, test } from 'vitest'
import { COMMON_ERROR_MESSAGES, translateCommonError, withErrorCodeAliases } from './errors'
import { DAO_ERROR_MESSAGES, parseDaoErrorCode, translateDaoError } from './dao/errors'
import { META_MERKLES_ERROR_MESSAGES, translateMetaError } from './meta/errors'
import { SOCIAL_ERROR_MESSAGES, parseSocialErrorCode, translateSocialError } from './social/errors'
import { WALLET_ERROR_MESSAGES, parseWalletErrorCode, translateWalletError } from './wallet/errors'

describe('ARC-65 code compatibility', () => {
  const examples = [
    { legacy: 'IPAY', current: 'errIpay', table: COMMON_ERROR_MESSAGES, translate: translateCommonError },
    { legacy: 'NPLG', current: 'errNplg', table: WALLET_ERROR_MESSAGES, translate: translateWalletError },
    { legacy: 'NPRP', current: 'errNprp', table: DAO_ERROR_MESSAGES, translate: translateDaoError },
    { legacy: 'NPST', current: 'errNpst', table: SOCIAL_ERROR_MESSAGES, translate: translateSocialError },
    { legacy: 'NNAM', current: 'errNnam', table: META_MERKLES_ERROR_MESSAGES, translate: translateMetaError },
    { legacy: 'KTL', current: 'errKtl', table: META_MERKLES_ERROR_MESSAGES, translate: translateMetaError },
  ]

  test.each(examples)('decodes $legacy and $current with either ARC-65 prefix', ({ legacy, current, table, translate }) => {
    expect(table[legacy]).toBeTypeOf('string')
    expect(table[current]).toBe(table[legacy])
    for (const code of [legacy, current]) {
      for (const input of [code, `ERR:${code}`, `AER:${code}`, `ERR:${code}:details`, `AER:${code}:details`]) {
        expect(translate(input)).toBe(table[legacy])
      }
    }
  })

  test('domain translators retain common-code fallback', () => {
    expect(translateMetaError('ERR:errIpay')).toBe(COMMON_ERROR_MESSAGES.IPAY)
    expect(translateMetaError('AER:IPAY')).toBe(COMMON_ERROR_MESSAGES.IPAY)
    expect(translateCommonError('ERR:errGnff')).toBe('Guild was not created by the configured factory')
  })

  test('domain parsers preserve the recognized code returned to callers', () => {
    expect(parseWalletErrorCode('ERR:errNplg:details')).toBe('errNplg')
    expect(parseWalletErrorCode('AER:NPLG')).toBe('NPLG')
    expect(parseDaoErrorCode('ERR:errNprp')).toBe('errNprp')
    expect(parseSocialErrorCode('ERR:errNpst')).toBe('errNpst')
    expect(parseWalletErrorCode('ERR:unknownCode')).toBeUndefined()
  })

  test('preserves unknown inputs and explicit aliases', () => {
    for (const { translate } of examples) {
      for (const input of ['', 'ERR:', 'unknownCode', 'AER:unknownCode:details']) {
        expect(translate(input)).toBe(input)
      }
    }
    const source = { OLD: 'Legacy', errOld: 'Explicit alias', customCode: 'Custom' }
    expect(withErrorCodeAliases(source)).toEqual(source)
    expect(withErrorCodeAliases({ IPAY: 'Payment' })).toEqual({ IPAY: 'Payment', errIpay: 'Payment' })
  })
})
