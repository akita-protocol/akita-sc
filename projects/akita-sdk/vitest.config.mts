import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Pure unit tests — no localnet, no external services. A 5s per-test
    // timeout is plenty; bump only if adding heavy synthetic tests.
    testTimeout: 5000,
    // Tests are colocated with source under src/**. Only *.test.ts is picked
    // up; *.spec.ts is intentionally unclaimed so misnamed files surface
    // visibly instead of silently running.
    include: ['src/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: ['src/generated/**', 'src/**/*.test.ts', 'src/**/index.ts'],
    },
  },
})
