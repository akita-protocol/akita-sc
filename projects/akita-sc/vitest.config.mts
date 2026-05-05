import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // E2E tests against localnet need longer timeouts
    testTimeout: 120000,
    hookTimeout: 120000,
    // Run tests sequentially to avoid localnet conflicts
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },
    // File suffix convention:
    //   *.e2e.spec.ts  → E2E tests against localnet (the current suite)
    //   *.test.ts      → reserved for pure unit tests (no localnet)
    // Plain *.spec.ts is intentionally NOT picked up, so accidental misnaming
    // surfaces visibly instead of silently running.
    include: [
      'tests/**/*.e2e.spec.ts',
      'tests/**/*.test.ts',
      'smart_contracts/**/*.e2e.spec.ts',
      'smart_contracts/**/*.test.ts',
    ],
    // Setup file for log suppression
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
    },
  },
})
