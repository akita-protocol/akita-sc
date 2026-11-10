import { expect } from 'vitest'

/** Match contract log errors even when AlgoKit wraps an inner-app failure in an outer source-map error. */
export const expectContractError = async (operation: Promise<unknown>, expected: string): Promise<void> => {
  try {
    await operation
  } catch (error) {
    const messages: string[] = []
    const seen = new Set<unknown>()
    let current: unknown = error
    while (current instanceof Error && !seen.has(current)) {
      seen.add(current)
      messages.push(current.message)
      current = (current as Error & { cause?: unknown }).cause
    }
    expect(messages.join('\n')).toContain(expected)
    return
  }
  expect.fail(`Expected contract error ${expected}`)
}

