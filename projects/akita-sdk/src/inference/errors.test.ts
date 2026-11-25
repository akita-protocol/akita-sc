import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, test } from 'vitest'
import { INFERENCE_ERROR_MESSAGES, translateInferenceError } from './errors'

const contracts = join(__dirname, '../../../akita-sc/smart_contracts')
const codesIn = (file: string) => [...readFileSync(join(contracts, file), 'utf8').matchAll(/export const \w+ = '(\w+)'/g)].map((m) => m[1])

describe('inference errors', () => {
  test('cover every code InferenceNetwork and InferencePlugin emit', () => {
    const codes = [...codesIn('inference/errors.ts'), ...codesIn('arc58/plugins/inference/errors.ts')]
    expect(codes.length).toBeGreaterThan(30)
    expect(Object.keys(INFERENCE_ERROR_MESSAGES).sort()).toEqual([...codes].sort())
  })

  test('translate a logged code', () => {
    expect(translateInferenceError('ERR:errInfz')).toMatch(/frozen/)
  })
})
