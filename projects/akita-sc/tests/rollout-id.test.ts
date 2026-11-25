/**
 * `rollout:id` hands a later rollout command the id or address an earlier step recorded, so none is
 * typed by hand. These checks need no network.
 */
import algosdk from 'algosdk'
import { describe, expect, test } from 'vitest'
import { appAddress, isRolloutValue, recordedAppId } from '../scripts/lib/rollout-id'

describe('rollout:id', () => {
  const ids = { dao: 3569556034n, meta: 0n, legacy: 7, text: '12', nothing: undefined }

  test('a recorded key gives its app id', () => {
    expect(recordedAppId(ids, 'dao')).toBe(3569556034n)
    expect(recordedAppId(ids, 'legacy')).toBe(7n)
  })

  test('a key that is not recorded yet stops, and says to register and rebuild', () => {
    expect(() => recordedAppId(ids, 'meta')).toThrow(/records no "meta" for this network yet.*--register.*rebuild the SDK/)
    expect(() => recordedAppId(ids, 'nothing')).toThrow(/records no "nothing"/)
    expect(() => recordedAppId(ids, 'text')).toThrow(/records no "text"/)
  })

  test('a name that is no key of the map stops instead of reading something inherited', () => {
    expect(() => recordedAppId(ids, 'metaa')).toThrow(/has no app key "metaa"/)
    expect(() => recordedAppId(ids, 'toString')).toThrow(/has no app key "toString"/)
    expect(() => recordedAppId(ids, '__proto__')).toThrow(/has no app key/)
  })

  test('the address is the app address', () => {
    expect(appAddress(3569556034n)).toBe(algosdk.getApplicationAddress(3569556034n).toString())
    expect(appAddress(1n)).toHaveLength(58)
  })

  test('only an app id or an address is ever printed', () => {
    expect(isRolloutValue('3569556034')).toBe(true)
    expect(isRolloutValue(appAddress(3569556034n))).toBe(true)
    for (const bad of ['', '0', '012', '-1', '12 34', 'Script failed: Error', 'A'.repeat(57), `${'A'.repeat(57)}!`]) expect(isRolloutValue(bad)).toBe(false)
  })
})
