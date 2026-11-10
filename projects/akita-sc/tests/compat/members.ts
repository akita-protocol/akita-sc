/**
 * The compatibility suite (PHASE-0-SPEC.md §7.1 Phase 2 gate: "the compatibility suite passes against the
 * DEPLOYED plugin and child bytecode") = this directory + the per-track specs below. The member specs install
 * the same MainNet bytes (their fixtures are pinned to `fixtures/mainnet-programs.json` by
 * `compat-static.test.ts` CMP-S3) and own the deep per-family flows, in particular every new-plugin-on-OLD-child
 * case (P2-REF-02: ABI markers and legacy gate subjects). `compat-static.test.ts` fails if a member file
 * disappears or stops naming the cases it is listed for.
 *
 * Run the whole suite on LocalNet (from projects/akita-sc), always through the shared lock:
 *   with-localnet-lock.sh compat npx vitest run tests/compat <every member file below>
 */
export const MEMBER_SPECS: readonly { file: string; covers: readonly string[]; what: string }[] = [
  { file: 'smart_contracts/arc58/plugins/social/deployed-compat.e2e.spec.ts', covers: ['P2-SOC-01', 'P2-SOC-02', 'P2-CMP-01'], what: 'social plugin v0.0.3 flows on the shims; AkitaSocial page growth from its MainNet program' },
  { file: 'smart_contracts/subscriptions/compat.e2e.spec.ts', covers: ['P2-CMP-01', 'P2-SUB-01', 'P2-SUB-03'], what: 'May subscriptions plugin: legacy newService/subscribe/gated trigger, adoptPrincipal' },
  { file: 'smart_contracts/marketplace/compat.e2e.spec.ts', covers: ['P2-CMP-01', 'P2-REF-01', 'P2-REF-02'], what: 'May marketplace plugin and rev-absent listings from the MainNet Marketplace program' },
  { file: 'smart_contracts/staking-pool/principal.e2e.spec.ts', covers: ['P2-CMP-01', 'P2-STK-02', 'P2-REF-02'], what: 'May/July plugins on pv children; the MainNet child pushed into the factory and driven by the new plugin' },
  { file: 'smart_contracts/auction/principal.e2e.spec.ts', covers: ['P2-REF-01', 'P2-REF-02'], what: 'May auction plugin on new children; v3 plugin on a child created by the MainNet factory + child programs' },
  { file: 'smart_contracts/raffle/principal.e2e.spec.ts', covers: ['P2-RAF-01', 'K6', 'P2-REF-02'], what: 'old-ABI gated entries on new children; K6: the deployed creation selectors have no route (no P2-REF-01 for raffle); v3 plugin on a child created by the MainNet factory + child programs' },
  { file: 'smart_contracts/arc58/plugins/update-akita-dao/rollout.e2e.spec.ts', covers: ['P2-UPD-01'], what: 'Phase 2a/2 rehearsal from the deployed update plugin, DAO and singleton programs' },
  { file: 'smart_contracts/utils/origin-spoofing.e2e.spec.ts', covers: ['ACC-01', 'SG-04'], what: 'binding audit invariant: hinted wallets must be genuine and related' },
  { file: 'smart_contracts/arc58/account/reclaim.e2e.spec.ts', covers: ['P4-ESC-01'], what: 'binding invariant: escrow create/use/reclaim with and without the registry (immutable EscrowFactory)' },
] as const
