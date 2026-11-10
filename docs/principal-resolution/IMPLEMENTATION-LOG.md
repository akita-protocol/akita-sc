# Principal Resolution — Implementation Log

Append-only. Each track adds a dated section with its deviations from `PHASE-0-SPEC.md` and every interface
another track must know. Never rewrite another track's section.

---

## 2026-10-04 — Phase 0 (helper, mirror, mocks, adversarial suite)

### Interfaces other tracks must use

**`smart_contracts/utils/principal.ts`** (self-contained; mirrored byte-for-byte to `projects/akita-plugin/principal.ts`):

```ts
export const PRINCIPAL_KEY_CONTROLLED = 'controlled_address'
export const PRINCIPAL_KEY_SPENDING   = 'spending_address'
export const PRINCIPAL_KEY_REFERRER   = 'referrer'
export const errHintNotWallet     = 'errHnwl'
export const errHintTopLevel      = 'errHtop'
export const errHintNotBound      = 'errHnbd'
export const errHintNotOwner      = 'errHnow'   // reserved for third-party writes (not raised by the helper itself)
export const errHintBadWallet     = 'errIwlt'
export const errHintPluginNotAuth = 'errNath'
export type Principal = { wallet: uint64, principal: Account, origin: Account, spender: Account, referrer: Account, viaPlugin: boolean }
export type GateCtx   = { principal: Account, wallet: uint64, spender: Account }   // ARC-4 (address,uint64,address), 72 B
export function isGenuineWallet(wallet: uint64, walletFactory: uint64): boolean
export function walletControlsLive(wallet: uint64, controlled: Account, spender: Account): boolean
export function resolvePrincipalFromDexCtx(walletFactory: uint64, hint: uint64, sender: Account, callerApp: uint64): Principal  // PluginDex BeforeSwap only
export function resolvePrincipal(walletFactory: uint64, hint: uint64): Principal          // strict
export function tryResolvePrincipal(walletFactory: uint64, hint: uint64): Principal       // quotes only
export function quoteReferrer(walletFactory: uint64, hint: uint64): Account
export function ownsAtRest(walletFactory: uint64, wallet: uint64, account: Account): boolean
export function atRestPrincipal(walletFactory: uint64, account: Account, wallet: uint64, stored: Account): Account
export function thirdPartyPrincipal(walletFactory: uint64, account: Account, wallet: uint64): Account  // quote-only
export function gateCtx(p: Principal): GateCtx
export function ctxOwns(walletFactory: uint64, ctx: GateCtx, account: Account): boolean
export function pluginPrincipal(wallet: Application, walletFactory: uint64): Principal
// internal, not exported: resolvePrincipalCtx(walletFactory, hint, sender, callerApp, callerAddr, strict)
```

**`smart_contracts/utils/functions.ts`** — appended at the END of the file (with their imports), additive only:

```ts
export const GateMustCheckForAbiMethod = 'mustCheckFor((address,uint64,address),uint64,byte[][])void'
export function principalOf(akitaDAO: Application, hint: uint64): Principal
export function tryPrincipalOf(akitaDAO: Application, hint: uint64): Principal
export function quoteReferrerOf(akitaDAO: Application, hint: uint64): Account
export function ownsAtRestOf(akitaDAO: Application, wallet: uint64, account: Account): boolean
export function atRestPrincipalOf(akitaDAO: Application, account: Account, wallet: uint64, stored: Account): Account
export function thirdPartyPrincipalOf(akitaDAO: Application, account: Account, wallet: uint64): Account
export function ctxOwnsOf(akitaDAO: Application, ctx: GateCtx, account: Account): boolean
export function pluginPrincipalOf(akitaDAO: Application, wallet: Application): Principal
export function gateCheckCtx(gateTxn: gtxn.ApplicationCallTxn, akitaDAO: Application, ctx: GateCtx, id: uint64): boolean
export function referralFeeTo(akitaDAO: Application, referrer: Account, asset: uint64): uint64
export function sendReferralPaymentTo(akitaDAO: Application, referrer: Account, asset: uint64, amount: uint64): ReferralPaymentInfo
export function tipWallet(akitaDAO: Application, creator: Account, stored: uint64): uint64
```

- **Gate track:** `gateCheckCtx` asserts `gateTxn.appId == AkitaAppList.gate`, NoOp, `numAppArgs == 4`,
  `appArgs(0) == methodSelector('mustCheckFor((address,uint64,address),uint64,byte[][])void')`,
  `appArgs(1) == encodeArc4(ctx)`, `appArgs(2) == itob(id)`. Gate v2 `mustCheckFor(ctx: GateCtx, gateID: uint64, args: GateArgs): void`
  must produce exactly this selector (import `GateCtx` from `utils/principal`). If the Gate track changes the signature, it must
  update `GateMustCheckForAbiMethod` in the same change.
- **`utils/errors.ts`** gains `errHintNotWallet/TopLevel/NotBound/NotOwner` (same values as above). **SDK** `COMMON_ERROR_MESSAGES`
  gains `HNWL/HTOP/HNBD/HNOW` (aliases `errHnwl` … are generated).
- **Byte-identity:** the new `functions.ts` code and its imports sit after the last existing line. puya writes TS line numbers into
  the TEAL comments, so inserting above existing code changes every dependent contract's `.teal` (not its bytecode). Phase 1's
  `legacy*` renames will shift lines anyway; at that point the imports can move to the top of the file.
- **`@akta/plugin` 1.2.0:** exports the third-party surface (everything in `principal.ts` except the ctx resolvers) plus `controls`;
  `getOriginAccount`/`getReferrerAccount`/`getAccounts` are documented "display only, not identity"; new `README.md`.
  **Pre-existing limitation found:** puya-ts 1.3.1 rejects `export { … } from` ("Unsupported syntax visitor ExportDeclaration"), so a
  contract cannot import from the package root `index.ts` (true before this change too). Contracts must import
  `@akta/plugin/principal` / `@akta/plugin/functions`. Verified by compiling a probe contract against `principal.ts` + `functions.ts`.
- **Typed clients for overloaded ARC-4 names (T36, affects every legacy shim and P2-ABI-01):** the client generator suffixes each
  overload with its argument types, e.g. `m(uint64,uint64)uint64` → `client.send.mUint64Uint64Uint64(...)` and the shim
  `m(uint64)uint64` → `client.send.mUint64Uint64(...)`. There is no shared `client.send.m`; SDK wrappers must name the hinted overload
  explicitly (or use the full signature with `appClient.send.call({ method: 'm(uint64,uint64)uint64' })`).
- **Test fixture for registry-free wallets:** `tests/fixtures/unregistered-wallet.ts` (`newUnregisteredWallet`, `addRawEscrow`,
  `addRawPlugin`, `rekeyToWallet`, `assertUnregistered`). Use it whenever a test must prove a path needs no EscrowFactory registration.

### Deviations from the spec (Phase 0)

1. **`pluginPrincipal` error constant.** `principal.ts` cannot import `utils/errors.ts`, so `errNath` is inlined as
   `errHintPluginNotAuth`; `errIwlt` as `errHintBadWallet`. Values unchanged.
2. **`walletControlsLive` resource use.** `W.address` is read with `app_params_get AppAddress` (P(W) is already required) instead of a
   second `sha512_256`, to stay inside the T32 budget. For a nonexistent `W` it returns `controlled == spender` only. Callers check
   `isGenuineWallet` first (all helpers do). `isGenuineWallet` still hashes the factory address (no P(factory) needed).
3. **`tipWallet`** returns 0 (direct tip) for a missing or short `controlled_address`; a uint64-typed one panics (R-CREATOR, as specified).
4. **Mock surface is a superset of §5.1.** Added: `MockPrincipalProbe.probeCost` (T32, `Global.opcodeBudget` delta), `tryRelay` (T27/T17),
   `unpinnedFactory`/`genuineFor`/`pinnedFactory` (T43 negative controls), `callerApp`, `opUp`; `TestPrincipalPlugin.callTryProbe`,
   `callTryProbeAsSelf`, `callProbeCost`, `proxyProbeKeep` (non-compliant control), `done` (closes `rekeyBack=false` windows);
   `MockForgedWallet.update`/`opUp`/`callTryProbeAs`; `MockCustodyPlugin.init(held)`. New mock file not listed in §5.1:
   `mocks/principal-overload` (`MockPrincipalOverload`, T36). `MockFakeDAO` is itself the rogue factory (`spawn` creates
   `MockFakeWallet` children). `callProbeAsSelf` rekeys S back after the probe so the window can close.
5. **T41.** A genuine window can never END with S held by a proxy: `arc58_verifyAuthAddress` fails (`errAuam`, asserted as T14b),
   except through R-STALE (Q2). The non-compliant negative control therefore uses an EOA `S41` rekeyed directly to
   `MockPrincipalProxy` ("a proxy left holding S") with a forged `Wf.spending_address = S41`. The compliant half runs a real Wd window
   through `MockCompliantProxy` and shows the later forged call is rejected (`unauthorized`).
6. **T25 / Q2.** Q2 is approved but implemented by the wallet track. `utils/principal.e2e.spec.ts` has
   `const Q2_WALLET_FIX_LANDED = false`: today T25 asserts the residual (both constructions pass, the plugin arm passes in a later
   group). **Wallet track: flip it to `true` in the same change as the AbstractedAccount Q2 edit.** Then construction (a) must fail
   with `errNrkb` (the window group has no accepted rekey-back) and (b) must fail; T13 and T44 must keep passing unchanged.
7. **T30** is not a separate scenario: `resolveIn()` adds `TestPrincipalPlugin.principal(W)` before the target call in every
   T02/T06–T12/T43 window and asserts equality when the hint is the window's wallet.
8. **T34** uses a deleted plain app (a factory-created wallet has no delete path). **T28 row 6** (W.address after T12) is asserted
   inside T12.
9. **T35** precise expectations: missing `controlled_address` → `errIwlt` (strict) / plain (try); 31-byte `spending_address` →
   `errHnbd` (plugin arm via a second hop); uint64 `controlled_address` panics `probe`/`tryProbe`/`thirdParty` but not `quote`;
   uint64 `referrer` panics `probe` and `quote`; uint64 `spending_address` panics only the plugin arm (the direct arm never reads it).
10. **T31** records, it does not assert, the stripped-resource outcome (as specified); the default send path of the suite already
    goes through the SDK Access-list preparer (`akita-sdk` installs it on import).

### Status / pending

- LocalNet was down for the whole Phase 0 session (`localhost:4001/health` timed out), so `utils/principal.e2e.spec.ts`
  (V0.1–V0.4, T01–T46) has **not been run**. It compiles and typechecks. Run it with
  `with-localnet-lock.sh <lane> npx vitest run smart_contracts/utils/principal.e2e.spec.ts` and write the T31 observations and
  T32 measured cost (printed as `[T31] …` / `[T32] …`) back into spec §3.6–3.7.
- Byte-identity: every pre-existing artifact's approval/clear TEAL is unchanged (full source compile before and after Phase 0,
  hashed; see the Phase 0 report).

---

## 2026-10-04 — Phase 0 review fixes (helper surface, invariant 6, suite gaps)

All 14 review findings were checked against the code. 13 were real and are fixed below. Finding 5 (acceptance
unmet) is real but cannot be fixed here: LocalNet is still down (`localhost:4001/health` timed out again).

### Interfaces other tracks must know

- **New normative rule, STANDARD/spec §3.8 rule 6 (all plugin tracks, Phase 2 plugins, PluginDex).** Inside a
  wallet's window, a plugin must forward exactly the wallet whose window it serves as the hint:
  `windowHint(wallet)` (= `wallet.id`, its pinned first argument). Never forward a hint the caller supplies, and
  never take it from a method argument. A proxy must receive it from the plugin and forward it unchanged.
  Reason: F2 pins only `appArgs(1)`. A forged wallet `Wf` with `spending_address = S` and
  `controlled_address = A` (rekeyed to `Wf`) otherwise resolves to `A` with `Wf`'s referrer (T47 shows this).
  **Every new Akita plugin version must call `windowHint(wallet)`** (import it from `utils/principal`), so a
  reviewer can grep for any forwarded hint that does not use it.
- **`utils/principal.ts` surface changes.**
  - `export function windowHint(wallet: Application): uint64` (new, mirrored, exported from `@akta/plugin`).
  - `walletControlsLive` is **no longer exported** (module-private). It returns `true` for
    `controlled == spender` before any wallet check, so a third party that passes a caller-chosen account would
    get a false "controls". Use `ownsAtRest`/`atRestPrincipal`/`thirdPartyPrincipal`.
  - `resolvePrincipalFromDexCtx` moved into the **Akita-only block** at the end of `utils/principal.ts`
    (between `// @akita-sc-only:begin` and `// @akita-sc-only:end`). It is still exported from
    `utils/principal.ts` with the same signature (PluginDex hooks import it from there). It no longer exists
    in `akita-plugin/principal.ts`.
  - New in the same block: `export function tipWalletFor(walletFactory: uint64, creator: Account, stored: uint64): uint64`.
    `functions.ts` `tipWallet(dao, creator, stored)` keeps its signature and behaviour and now delegates to it.
- **Mirror rule changed.** `akita-plugin/principal.ts` = `utils/principal.ts` byte-for-byte **minus** the
  `@akita-sc-only` block (plus the one blank line before it). The strip lives in
  `projects/akita-sc/scripts/lib/principal-mirror.ts` (`mirrorOf`); `scripts/sync-akita-plugin-principal.ts`
  uses it, and it refuses a source without exactly one well-formed block. Anything a third party must not
  import goes inside that block. The stripped mirror compiles standalone (checked with puya-ts against a probe
  that uses every mirrored export).
- **Mock additions (test-only):** `MockForgedWallet.destroy()` (DeleteApplication), `MockFakeDAO.setGate(gate)`,
  `MockPrincipalProbe.tipWalletOf(creator, stored)` (readonly) and `gateCheckCtxOf(gateTxn, ctx, id)`,
  `TestPrincipalPlugin.callProbeWindow(wallet, rekeyBack, probe)` (compliant `windowHint` path) and
  `callTipWallet(wallet, rekeyBack, probe, creator, stored)`. `TestPrincipalPlugin.callProbe` is documented as
  the NON-compliant shape (caller-chosen hint), kept on purpose for the suite.

### Deviations / corrections

1. **Correction to the Phase 0 deviation 8 (T34).** Its premise "a factory-created wallet has no delete path" is
   wrong: an admin can install any program, including one that allows DeleteApplication
   (`MockForgedWallet.destroy`). The suite now builds a once-genuine wallet in `beforeAll`, records the pair
   `(W, W.address)` for an account rekeyed to it while it is honest, then updates and deletes it. T34, T45, T46,
   T48 and T50 use it. The helpers were already correct for this case (`app_params_get` returns `exists = 0`).
2. **Correction to the Phase 0 deviation 5 (T41).** Its "compliant half" is an AVM fact, not a property of
   `MockCompliantProxy`: after any closed genuine window `S` is back with `W`, so the same call fails through the
   non-compliant proxy too. T41 now runs it through both proxies and says so. The compliant proxy's guarantee is
   T14 + T14b.
3. **T40** now builds the friend's `ctx` from the friend's own genuine wallet window (`ctx.wallet != 0`); the
   old `wallet = 0` row was trivially false. It also checks that the forger's own verified ctx owns `A2` but not
   the friend.
4. **T49** uses an approve-all stand-in gate (`MockFakeDAO.setGate` on a separate probe) because Gate v2
   `mustCheckFor` is not in the tree yet. It pins the `gateCheckCtx` argument layout, not the Gate itself.
5. **T31** now asserts `removed > 0` and that no holding/locals entry still names the stripped address. It also
   strips the legacy `accounts` array. If the preparer does not list `A(W.address)`/`A(C)` as an address entry,
   T31 now FAILS instead of logging a meaningless "success"; record that outcome in §3.6.
6. **Spec/STANDARD edits** (append-only intent; existing text kept): §3.3 code block and `@akta/plugin` paragraph
   annotated (internal `walletControlsLive`, Akita-only block, `windowHint`, `tipWalletFor`); §3.8 rule 6 added
   (verbatim in STANDARD.md and the `@akta/plugin` README); spec §4.2 gains the T16b and T47 rows; §5.2 gains
   T16b and T47–T50 and amends T34/T40/T41/T46; §5.4.2 now reads "T01–T50 and T14b/T16b".

### Tests added or tightened (`utils/principal.e2e.spec.ts`)

T12 (stored pair from a prior probe; `atRest`/`thirdParty` after the rekey; `/unauthorized/`), T16b (E11
`sender != callerAddr`), T25(b) under Q2 (`errNrkb`), T28/T45 (accounts really rekeyed to a fake or deleted app:
only `isGenuineWallet` rejects them), T30 (exact principal and spender per window, incl. `Wx` escrow → `Cx`),
T31, T34, T40, T41, T46 (forger deletes `Wf`), T47 (negative control + `windowHint`), T48 (`tipWallet`), T49
(`gateCheckCtx`), T50 (`pluginPrincipal` errHnwl/errHnbd/errNath). `tests/principal-sync.test.ts` now checks
the stripped mirror, the internal-only names, and the inlined `errIwlt`/`errNath` against `utils/errors.ts`.

### Status / pending

- **Not run (LocalNet down): `smart_contracts/utils/principal.e2e.spec.ts`** (V0.1–V0.4, T01–T50, T14b, T16b),
  `utils/origin-spoofing.e2e.spec.ts`, and the full `npm test`. §5.4 items 1, 2 and 5 stay **unmet**, and per
  §5.4.1 no Phase 1–3 e2e result is meaningful until V0 passes. When LocalNet is back:
  `with-localnet-lock.sh <lane> npx vitest run smart_contracts/utils/principal.e2e.spec.ts`, then
  origin-spoofing, then `npm test`; write the `[T31]`/`[T32]` output into spec §3.6–3.7 and log each first-run fix.
- Ran: `tests/principal-sync.test.ts` (7/7), `tests/logged-error-codes.test.ts` (2/2); `tsc --noEmit` clean for
  every touched file; built `mocks/{fake-dao,forged-wallet,principal-probe,principal-plugin,principal-composer,
  principal-custody,principal-proxy,principal-y,principal-reenter}`; rebuilt `arc58/plugins/optin` and its
  approval TEAL and ARC-56 are byte-identical (the `functions.ts` edits are below every pre-existing line).

---

## 2026-10-04 — Phase 1 (shared infrastructure: legacy renames, SDK mirror, preparer seeding, sub-gate tooling)

### Interfaces other tracks must use

**`smart_contracts/utils/functions.ts` — `legacy*` renames (registry semantics, legacy shims only, delete in Phase 4).**
Pure renames. Bodies, signatures and line numbers are unchanged; only names and doc lines differ.

| Old name | New name (call this) |
|---|---|
| `getWalletIDUsingAkitaDAO(akitaDAO, address): Application` | `legacyWalletOf(akitaDAO: Application, address: Account): Application` |
| `getWalletID(escrowFactory, walletFactory, address): uint64` | `legacyWalletID(escrowFactory: uint64, walletFactory: uint64, address: Account): uint64` |
| `originOr(walletID, or): Account` | `legacyOriginOr(walletID: Application, or: Account): Account` |
| `originOrTxnSender(walletID): Account` | `legacyOriginOrTxnSender(walletID: Application): Account` |
| `referralFee(akitaDAO, asset): uint64` | `legacyReferralFee(akitaDAO: Application, asset: uint64): uint64` |
| `referralFeeFor(akitaDAO, account, asset): uint64` | `legacyReferralFeeFor(akitaDAO: Application, account: Account, asset: uint64): uint64` |
| `sendReferralPayment(akitaDAO, asset, amount)` | `legacySendReferralPayment(akitaDAO: Application, asset: uint64, amount: uint64): ReferralPaymentInfo` |
| `sendReferralPaymentFor(akitaDAO, account, asset, amount)` | `legacySendReferralPaymentFor(akitaDAO: Application, account: Account, asset: uint64, amount: uint64): ReferralPaymentInfo` |

The shim subject that matches what old children assert is `legacyOriginOr(legacyWalletOf(dao, S), S)`
(`= legacyOriginOrTxnSender(legacyWalletOf(dao, Txn.sender))`). The registry-free helpers are
unchanged from Phase 0: `referralFeeTo(akitaDAO, referrer, asset): uint64`,
`sendReferralPaymentTo(akitaDAO, referrer, asset, amount): ReferralPaymentInfo` and
`tipWallet(akitaDAO, creator, stored): uint64`, plus the `principalOf` … `gateCheckCtx` wrappers.
All 15 consumers were updated in place: AbstractedAccountFactory, the social and subscriptions plugins,
Auction, Listing, Marketplace, Raffle, AkitaSocial, StakingPool, StakingPoolFactory, Subscriptions, the
subscription sub-gate `utils.ts`, PluginDex `hooks/shared/origin.ts` and `mocks/fake-wallet`. **Phase 2 tracks:
call the `legacy*` names in shims, and `principalOf`/`referralFeeTo`/`sendReferralPaymentTo` in hinted methods.**

**SDK `@akta/sdk/principal` (`projects/akita-sdk/src/principal.ts`, new subpath, also `principal` namespace on the root).**
This is an off-chain mirror for prediction and resource seeding, never for authorization. Every chain read
goes through `PrincipalChainReader` (`appCreator`, `appGlobal`, `authAddr`). A uint64 stored under a bytes
key throws `PrincipalPanicError`, as the AVM panics. Strict failures throw
`PrincipalResolutionError` with `.code` = `errHnwl|errHtop|errHnbd|errIwlt`.

```ts
algodPrincipalReader(algod: Algodv2): PrincipalChainReader            // cached per reader instance
predictPrincipal(reader, { walletFactory, hint, sender, callerApp, callerAddr?, spendingOverride?, strict }): Promise<Principal>
predictWindowPrincipal(reader, walletFactory, wallet, spender, plugin): Promise<Principal>   // window not open yet: spending := spender
isGenuineWallet(reader, wallet, walletFactory) / quoteReferrer(reader, F, hint) / ownsAtRest(reader, F, W, A)
atRestPrincipal(reader, F, account, wallet, stored) / thirdPartyPrincipal(reader, F, account, wallet) / tipWallet(reader, F, creator, stored)
ctxOwns(reader, F, ctx, account) / gateCtx(p) / windowHint(wallet) / appAddress(appId)
encodeGateCtx(ctx): Uint8Array                                        // 72 B, = gateCheckCtx appArgs(1)
gateMustCheckForMethod(): ABIMethod                                    // 'mustCheckFor((address,uint64,address),uint64,byte[][])void'
principalResources({ wallet, controlled, spender }): TransactionResourceReference[]   // §3.6: P(W) [+ A(W.address) | A(C) when S != C]
atRestResources({ wallet, account, stored? }) / windowPrincipalResources(reader, wallet, spender)
```

**SDK preparer seeding (`akita-sdk/src/simulate/access-list.ts`, exported from the root).**
`seedAccessResources(composer: TransactionComposer, references: readonly TransactionResourceReference[]): TransactionComposer`
appends seeds to a composer, and `seededAccessResources(composer)` reads them back. `buildAccessListGroup`
passes them to `populateAccessListResources(input, groupAnalysis?, seeds = [])`. There they are packed
group-wide after the discovered resources and deduplicated against them, against senders and against
called apps. Zero-address seeds and seeds for apps the group creates are skipped. Seeds count against Access capacity.

**Sub-gate tooling (assumes the Gate track's interface; adjust here if it differs):**
- The Gate v2 allowlist call is `setSubGate(uint64,bool,bool)void` = `(app, allowed, ctxAware)`. The allowlist box is
  `'s' + itob(app)` (the `subGates` map prefix, read from ARC-56), and a value with any non-zero byte means context-aware.
  An empty value means plain. A sub-gate counts as context-aware if and only if its ABI has a method named `checkFor`.
- `scripts/lib/ctx-sub-gates.ts`: `SET_SUB_GATE_CTX_SIGNATURE`, `gateSupportsCtxFlag(spec)`, `isCtxAwareSpec(spec)`,
  `subGateBoxName(gateSpec, app)`, `decodeAllowlistBox(value)`, `planAllowlist(gateSpec, candidates, current)`,
  `setSubGateCall(gateSpec, app, allowed, ctxAware)`, `ALLOWLIST_BOX_MBR_BOUND` (9,300 µA).
- `scripts/allowlist-sub-gates.ts --network <n> [--gate <id>] [--manifest-dir <dir>] [--sub-gates Name=id,...] [--dry-run]`.
  It reads the `deploy-gates.ts` receipts, checks each app's program hash, and flags a sub-gate only if
  it runs the current context-aware artifact. It skips or re-flags existing boxes, sends the calls as the
  Gate creator, and verifies the boxes. After `sealImports` it prints the calls for a DAO proposal and
  writes nothing. The sub-gates themselves still deploy through `deploy-gates.ts`, because they keep
  their catalog artifact paths.
- Fixtures: `tests/fixtures/gates/gate.ts` `allowlistSubGates(client, subGates, ctxAware: bigint[] = [])`,
  `isCtxAwareSubGate(client)`, `gateSupportsCtxSubGates(client)`. `buildAkitaUniverse` passes every sub-gate
  with `checkFor` as `ctxAware`, so the universe picks up the Gate track's change with no fixture edit. On a
  Gate without the 3-argument `setSubGate`, a non-empty `ctxAware` throws instead of silently allowlisting plain.

**Test-only mock:** `mocks/referral-probe` (`MockReferralProbe`: `feeTo`, `legacyFeeFor`, `quote`, `payTo`,
`payLegacyFor`) and the spec `smart_contracts/utils/referral-to.e2e.spec.ts` (R01–R05: same economics as the
legacy twins for the same referrer, minimum cut of 1, any-address referrer, zero referrer pays nothing).

### Deviations / findings

1. **Build mode changes bytecode (all tracks must know this).** `scripts/build-contracts.mjs <file>`
   compiles one file. For **Auction, AkitaSocial, Raffle, StakingPool and StakingPoolFactory** that gives
   different approval bytecode than the whole-tree compile (`npm run build` / `puya-ts smart_contracts`)
   from the same sources: the ARC-4 router order and subroutine layout change. I confirmed this by
   compiling unchanged `auction/contract.algo.ts` both ways. The committed artifacts come from the
   whole-tree compile. To keep them byte-identical, I restored the 15 rebuilt contracts from my
   whole-tree compile of the same sources and regenerated the clients. **Compare bytecode like with like.**
   A single-file rebuild of one of these five is not evidence of a behaviour change, and a byte-identity
   claim must name its build mode.
2. **Byte-identity proof.** I compiled the full tree into the scratchpad before and after the rename. All 176
   contracts have identical approval and clear bytecode. TEAL differs in 15 files, but only in subroutine
   label names: after mapping old names to new and stripping comments, there are 0 semantic diffs. Every
   artifact in `smart_contracts/artifacts` still has the baseline bytecode.
3. **`getWalletID` → `legacyWalletID`.** The spec lists only four names, but §6.10 lists `getWalletID` as a registry read.
   `referrerOr`/`referrerOrZeroAddress`/`getOriginAccount`/`getReferrerAccount` are **not** renamed. They read globals
   of a wallet id the caller already resolved, and do no registry lookup. Their callers (AbstractedAccountFactory
   `cost`, `mocks/fake-wallet`) pass a `legacyWalletOf` result. The factory track replaces them under Q1-A2.
4. **`functions.ts` imports stay at the end of the file.** Phase 0 suggested moving them to the top in Phase 1. I
   did not move them: that shifts every line and changes the TEAL source comments of every contract. The doc
   edits replaced existing lines, so the file length (927) is unchanged.
5. **Seeding is opt-in, not wired into `WalletSDK.usePlugin`.** Discovery by simulation already finds
   `A(W.address)`/`A(C)` whenever a target reads them. Seeding every plugin window would spend an Access
   entry on plugins that never resolve a principal, and could push tight groups into a carrier error. So
   seeding is an explicit API (`principalResources` / `windowPrincipalResources` → `seedAccessResources`) for
   callers that build without discovery or want a fixed placement. The wallet and plugin SDK tracks decide
   per call. (T31's stripped-resource observation is still pending LocalNet.)
6. **`predictPrincipal` is exported in the SDK.** The on-chain `resolvePrincipalCtx` is module-private because it trusts
   its context. Off chain nothing is trusted: the SDK only predicts what the contract will compute.
7. **Sub-gate "deploy and test scripts".** I wrote these against the Gate-track interface above, because Gate v2
   `mustCheckFor` and the context-aware sub-gates are not in the tree yet. Against today's Gate they plan
   plain allowlisting only. The unit test (`tests/ctx-sub-gates.test.ts`) covers the flag path with a
   synthetic spec.

### Status / pending

- **LocalNet down** (`localhost:4001/health` timed out at 15:29). Not run: `smart_contracts/utils/referral-to.e2e.spec.ts`
  (new), `utils/principal.e2e.spec.ts`, `utils/origin-spoofing.e2e.spec.ts`, `plugin-dex/hooks/gated-fee.e2e.spec.ts`
  (uses the changed `allowlistSubGates`), every `buildAkitaUniverse` spec (changed allowlist call path), and the full
  `npm test` (baseline 1,780 passed / 0 failed).
- Ran: akita-sc unit tests 46/46 (`tests/{ctx-sub-gates,principal-sync,logged-error-codes,migration-dry-run}.test.ts`,
  `plugin-dex/size`, `plugin-dex/curves/bins/bins-model`, `raffle/winner-search`, `arc58/account/get_plugin_txns`);
  akita-sdk `vitest run` 317/317 (incl. new `src/principal.test.ts` 24 and 4 new seeding cases in
  `src/simulate/access-list.test.ts`). `tsc --noEmit` is clean for every touched file in akita-sc and akita-sdk; the
  remaining akita-sc errors are pre-existing in untouched files. `npm run build` (akita-sdk) succeeded and emits `dist/principal.*`.

---

## 2026-10-04 — Gate track: Gate v2 context forwarding (interface first; results appended below)

### Interfaces other tracks must use (frozen at the start of the Gate track)

**Gate v2 (`smart_contracts/gates/contract.algo.ts`), additions.** `GateCtx` is `utils/principal.ts` `GateCtx`
= ARC-4 `(address,uint64,address)` = `(principal, wallet, spender)`, 72 bytes.

| TS method | ARC-4 signature | Notes |
|---|---|---|
| `mustCheckFor(ctx: GateCtx, gateID: uint64, args: GateArgs): void` | `mustCheckFor((address,uint64,address),uint64,byte[][])void` | = `functions.ts` `GateMustCheckForAbiMethod`; asserts with `errFgte` like `mustCheck` |
| `checkFor(ctx: GateCtx, gateID: uint64, args: GateArgs): boolean` (readonly) | `checkFor((address,uint64,address),uint64,byte[][])bool` | the third-party re-check (StakingPool `gateCheck`) |
| `setSubGate(app: uint64, allowed: boolean, ctxAware: boolean): void` | `setSubGate(uint64,bool,bool)void` | **replaces** the 2-argument `setSubGate` (Gate v2 is undeployed). Re-calling with `allowed = true` re-flags in place |
| `isCtxSubGate(app: uint64): boolean` (readonly) | `isCtxSubGate(uint64)bool` | true only for an allowlisted, context-aware sub-gate |
| `mustCheck` / `check(address,uint64,byte[][])` | unchanged | legacy callers: every sub-gate gets the plain `check(caller, …)` |

- Allowlist box: `subGates` prefix `'s'` + `itob(app)`. Value `''` = plain (6,100 µA), `0x01` = context-aware (6,500 µA).
  This matches the Phase 1 tooling assumption (`scripts/lib/ctx-sub-gates.ts`): any non-zero byte means context-aware.
- Evaluation under `checkFor`/`mustCheckFor`: a context-aware sub-gate receives `checkFor(ctx, registryEntry, args[i])`;
  every other sub-gate receives `check(ctx.principal, registryEntry, args[i])`. A filter whose app is no longer
  allowlisted is evaluated as plain (today's behaviour: evaluation does not re-check the allowlist).
- **Sub-gate interface (context-aware):** `checkFor(ctx: GateCtx, registryID: uint64, args: bytes): boolean` =
  `checkFor((address,uint64,address),uint64,byte[])bool`. Must never revert for a well-formed call it cannot satisfy
  (return false), so OR groups keep working. Context-aware sub-gates in this change: `SubscriptionGate`,
  `SubscriptionStreakGate` (rule `ctxOwnsOf(dao, ctx, subscriber)`, args unchanged `(address subscriber, uint64 id)`,
  40 B), `AkitaReferrerGate` (rule `ctx.wallet != 0 && isGenuineWallet(ctx.wallet, F) && quoteReferrer(F, ctx.wallet) == registered`;
  args ignored).

**How a target uses it (social, graph, subscriptions, staking-pool, auction, marketplace, raffle, PluginDex tracks).**

1. Target (first hop): `const p = principalOf(dao, wallet)` then
   `loggedAssert(gateCheckCtx(gateTxn, dao, gateCtx(p), gateID), errFailedGate)` (`functions.ts`). Do not also call `gateCheck`.
2. Plugin (inside the window) builds the gate txn with the SAME ctx the target will compute:
   ```ts
   const ctx = gateCtx(pluginPrincipalOf(this.akitaDAO.value, wallet))   // utils/principal + functions.ts
   const gateTxn = itxn.applicationCall({
     sender,                                                              // the spending account, as today
     appId: gate,
     appArgs: [methodSelector(GateMustCheckForAbiMethod), encodeArc4(ctx), itob(gateID), encodeArc4(args)],
   })
   ```
   and passes `windowHint(wallet)` as the target's trailing `wallet` arg (invariant 6). A plugin calling a LEGACY
   child keeps `mustCheck(legacyOriginOr(legacyWalletOf(dao, S), S), …)`.
3. Third-party re-check from a stored pair (StakingPool `gateCheck`, Subscriptions keeper path):
   `abiCall<typeof Gate.prototype.checkFor>({ appId: gate, args: [ctx, gateID, args] }).returnValue` with the
   `ctx` built per spec §6.4/§6.5 (never re-derive liveness).
4. Direct (non-plugin) callers: SDK `GateSDK.build.mustCheckFor({ ctx, gateId, args })` (see the SDK section below).

**SDK (`akita-sdk/src/gates`).** `GateSDK.checkFor({ ctx, gateId, args })`, `GateSDK.mustCheckFor(...)`,
`GateSDK.build.checkFor/mustCheckFor(...)`, `GateSDK.setSubGate({ app, allowed, ctxAware? })` (default `false`),
`GateSDK.isCtxSubGate({ app })`. `ctx` is `{ principal: string, wallet: bigint, spender: string }` (same shape as
`akita-sdk/principal` `GateCtx`). `CTX_AWARE_GATE_TYPES = ['subscription', 'subscription_streak', 'akita_referrer']`.

### Gate track results (2026-10-04, appended after implementation)

The interface above shipped unchanged. Additional facts other tracks need:

- **Resource added by context evaluation.** Under `checkFor`/`mustCheckFor`, the Gate reads the allowlist box
  `B(gate, 's' + itob(app))` of every filter app (to learn the flag). The legacy `check`/`mustCheck` path does not.
  Simulation (`populateAppCallResources`, the SDK Access-list preparer) discovers it; hand-built groups must add
  one box ref per distinct filter app. Context-aware sub-gates also need `P(ctx.wallet)` and `A(subscriber)` when
  the subscriber is neither `ctx.principal` nor `ctx.spender` (the `ctxOwns` at-rest arm).
- **`Gate.checkFor` is `readonly` in ARC-56.** Typed clients therefore simulate `client.send.checkFor(...)`. On chain,
  `abiCall<typeof Gate.prototype.checkFor>` is an ordinary inner call (StakingPool `gateCheck`, Subscriptions keeper).
- **Constants** (appended at the end of `gates/constants.ts`, so no consumer's TEAL moves): `GateMustCheckForAbiMethod`
  (same value as the `functions.ts` constant), `GateCheckForAbiMethod`, `SubGateCheckForAbiMethod`,
  `SubGateCtxAllowlistMBR = 6_500`. `gates/mock-gate.ts` `MockGate` gains `checkFor(ctx, registryID, args)` (the
  interface `abiCall` uses).
- **Gate plugin: no new version.** `arc58/plugins/gate` calls only `Gate.cost`/`Gate.register`, whose selectors did not
  change. I compiled it from the current tree into the scratchpad: its approval/clear bytecode equals the committed
  artifact. `mocks/fake-wallet` (imports `gates/constants`) compiles to identical TEAL.
- **Fixtures.** `tests/fixtures/gates/gate.ts`: `deployGate` flags the `gateRegistry` entries whose type is in
  `CTX_AWARE_GATE_TYPES`; `deployGateClient` gains `ctxSubGates?: bigint[]` (allowlisted with `ctxAware = true`).
  `buildAkitaUniverse` needed no edit: it flags every sub-gate whose ABI has `checkFor`, which is now exactly
  SubscriptionGate, SubscriptionStreakGate and AkitaReferrerGate.
- **Sizes:** Gate 3,320 B approval; SubscriptionGate 1,530 B; SubscriptionStreakGate 1,771 B; AkitaReferrerGate 816 B
  (single-file builds with `build-contracts.mjs`; these four are not among the five whose single-file and whole-tree
  bytecode differ, but compare like with like).

### Deviations from the spec (Gate track)

1. **`setSubGate` replaces the 2-argument method** instead of adding an overload (Gate v2 is undeployed). Re-calling with
   `allowed = true` deletes and re-creates the box, so the flag can be changed in place. `allowed = false` ignores `ctxAware`.
2. **New readonly `isCtxSubGate(app)`** (not in the spec), for the SDK, scripts and tests.
3. **A filter whose app was removed from the allowlist after registration is evaluated as plain** under `checkFor`
   (spec silent). This keeps today's rule that evaluation does not re-check the allowlist, and never calls `checkFor`
   on an app the admin no longer vouches for.
4. **`AkitaReferrerGate.checkFor` also checks `isGenuineWallet(ctx.wallet, F)`** and reads the referrer with
   `quoteReferrer` (missing or short global → zero, never a panic). The spec rule is
   `ctx.wallet != 0 && referrerOf(ctx.wallet) == registered`. Without the genuineness test, a gate registered with the
   zero address as referrer would pass any non-wallet `ctx.wallet` (quoteReferrer returns zero for those). `F` is the
   DAO's pinned wallet factory (invariant 4).
5. **`AkitaReferrerGate.check` (legacy) returns false for a registered-wallet mismatch too**, not only for an
   unregistered caller (spec: "returns false instead of panicking"). The old `errIwid` assert would still abort OR
   groups. An unknown `registryID` now reverts with `errIrga` (was an AVM panic on `.value`). A wallet with a missing
   `referrer` global now fails the check instead of panicking.
6. **SDK bug fixed in passing (pre-existing, `akita-sdk/src/gates/index.ts`).** `encodeGateCheckArgs` and
   `encodeGateRegistryArgs` pushed the previous filter's bytes for an args-less filter (`checkShape`/`registerShape`
   `'None'`), because `data` was shared across loop iterations. Example: `[subscription, asset]` sent the subscription
   args to the asset sub-gate. Both now push empty bytes. Regression test in `src/gates/index.test.ts`.
7. **`GateRegistryConfig` gains `akita_referrer` and `poll`** (both types already existed in `GateType`; the
   `GateSDK` constructor could not map their app ids, so `getGate` threw "Unknown contract ID" for them).
8. **Phase 1's `tests/ctx-sub-gates.test.ts` updated.** Its test "the Gate in the tree today has only the flag-less
   setSubGate" (and three planner tests that used the real Gate/SubscriptionGate artifacts as flag-less/plain
   stand-ins) described the pre-Gate-track tree. They now use a synthetic flag-less Gate spec and the plain AssetGate
   artifact, and a new test asserts that exactly the three spec sub-gates in the tree have `checkFor`.
9. **New test-only mock outside the owned directories:** `mocks/gate/echo.algo.ts` (`MockEchoSubGate`, new file). It
   echoes the call it received (`check`: args == caller; `checkFor`: args == encode(ctx)), so the routing tests can tell
   the calls apart.
10. **No Gate v1 → v2 import script (open item for the Gate v2 migration, SG-A).** Spec §6.9 says existing v1 gate entries
    are imported "with the new context-aware sub-gate ids". That cannot be mechanical. The new sub-gate apps have empty
    registries, so every entry must be re-registered in the new sub-gate first, and SG-03 changed the subscription and
    streak registry semantics (v1 `(merchant, id)` named a subscription index; v2 names a service id). The import needs
    a per-gate decision and is left to the SG-A migration runbook; `scripts/allowlist-sub-gates.ts` (Phase 1) covers
    only the allowlist.

### Tests added or changed

- `smart_contracts/gates/gate-ctx.e2e.spec.ts` (new, no universe): allowlist flag and MBR (6,100 / 6,500, re-flag in place,
  refund on removal); routing (ctx-aware filter gets `checkFor(ctx)`, plain filter gets `check(ctx.principal)` and never the
  spender, legacy `check` calls plain `check` everywhere); **P2-GATE-04** mixed and layered filters; de-listed sub-gate
  evaluated as plain; flagging a sub-gate without `checkFor` breaks context evaluation only; `mustCheckFor` passes/fails
  with `errFgte`; ARC-56 selector == `GateMustCheckForAbiMethod`; **P2-GATE-03** against the real Gate (a target probe
  whose DAO names this Gate rejects a `mustCheckFor` txn whose ctx differs in principal, wallet, spender or id).
- `smart_contracts/gates/ctx-sub-gates.e2e.spec.ts` (new, universe): the universe flags exactly the three sub-gates;
  SubscriptionGate/StreakGate `checkFor` (subscriber owned at rest by an **unregistered** wallet passes while the legacy
  registry `check` fails; principal/spender pass; another actor, another genuine wallet and a non-wallet app fail; streak
  operator still applies); AkitaReferrerGate `checkFor` (unregistered default wallet; **P2-GATE-02 equivalent**: external
  controlled address `Cx`, never in the registry, passes through `ctx.wallet`; wallet 0 and non-wallet apps fail);
  legacy `check` returns false (no revert) for unregistered/mismatched callers, and an OR group with a failing referrer
  filter now evaluates instead of aborting; `GateSDK.checkFor` end to end.
- `smart_contracts/gates/gate-v2.e2e.spec.ts`: `setSubGate` calls take `ctxAware`; the non-admin test also covers the flag.
- `akita-sdk/src/gates/index.test.ts` (new, unit, 7): Gate/sub-gate ABI signatures, `CTX_AWARE_GATE_TYPES`, `checkFor`/
  `build.mustCheckFor`/`setSubGate` argument forwarding, the args-reuse regression.
- `tests/ctx-sub-gates.test.ts`: see deviation 8.

### Status / pending (Gate track)

- **LocalNet down** (`localhost:4001/health` timed out, 15:30). Not run: `gates/gate-ctx.e2e.spec.ts`,
  `gates/ctx-sub-gates.e2e.spec.ts`, `gates/gate-v2.e2e.spec.ts`, `gates/subscription-gates.e2e.spec.ts`,
  `gates/contract.e2e.spec.ts`, `gates/staking-amount-gate.e2e.spec.ts`, `gates/staking-power-gate.e2e.spec.ts`,
  `arc58/plugins/gate/gate.e2e.spec.ts`, `plugin-dex/hooks/gated-fee.e2e.spec.ts`, `utils/origin-spoofing.e2e.spec.ts`,
  every `buildAkitaUniverse` spec (the universe now allowlists three sub-gates as context-aware), and the full `npm test`.
- **For other tracks:** P2-GATE-01 (Wd default grant, escrow-held subscription, `gatedReply` through `mustCheckFor`)
  needs the social track's hinted `gatedReply`; P2-GATE-02 end to end needs a hinted target. Both are covered here only
  at the Gate level with synthetic contexts.
- Ran: akita-sdk `vitest run` 324/324 (317 + 7 new); `npm run build` (akita-sdk) OK; akita-sc unit tests 47/47
  (`tests/{ctx-sub-gates,principal-sync,logged-error-codes,migration-dry-run}.test.ts`, `plugin-dex/size`,
  `plugin-dex/curves/bins/bins-model`, `raffle/winner-search`, `arc58/account/get_plugin_txns`); `tsc --noEmit` in
  akita-sc: no error in any touched file (the 10 remaining errors are the pre-existing ones Phase 1 listed).

---

## 2026-10-04 — Wallet track: interface notice (written first; results appended below)

### Interfaces other tracks must know (frozen at the start of the wallet track)

- **SDK registry writes stop (spec §6.10, Phase 3).** `newWallet(...)` no longer calls `register('')`.
  `WalletSDK.addPlugin` and `WalletGroupComposer.addPlugin` no longer register a new escrow in their
  post-processor. Each gains an explicit opt-in for tests of legacy (registry) semantics:
  `newWallet({ ..., register: true })`, `wallet.addPlugin({ ..., registerEscrow: true })`,
  `wallet.build...addPlugin({ ..., registerEscrow: true })`. `WalletSDK.register`, the group `register`
  builder and `WelcomePluginSDK.registerWallet` stay as explicit (deprecated) calls until Phase 4.
  **Any test that relies on a wallet created by `newWallet` being in the EscrowFactory registry must now
  opt in** (pass `register: true`, or call `wallet.register({ escrow: '' })`). Known dependents in other
  tracks' files: `utils/referral-to.e2e.spec.ts` (R01/R03 legacy twins need the payer registered),
  `gates/ctx-sub-gates.e2e.spec.ts` (the "registered through the SDK's newWallet" wallet for the legacy
  referrer-gate `check`), and every legacy-shim test (old-ABI selectors whose subject or referral comes
  from `legacyWalletOf`). `tests/fixtures/dao.ts` already registers the DAO wallet explicitly.
- **AbstractedAccountFactory, Q1-A2 (spec §6.1).** `newAccount` and `cost()` keep their ABI. The creation
  referral now pays the `referrer` ARGUMENT (any address) from the creation fee: cut
  `= max(1, calcPercent(createFee, referrerPercentage))` plus its disbursement MBR (67,000 µA for ALGO) both
  come out of `createFee`; the DAO escrow gets the rest. No cut when the referrer is zero, the fee is zero,
  or `createFee < cut + costInstantDisbursement(dao, 0, 1)`. The payment equality is now
  `childMBR + extraFunding + assetMBR + pluginMBR` (no `referralMbr`), and `cost()` no longer depends on
  `Txn.sender` or the registry. Clients that added a referral MBR on top of `cost()` must stop.
  `ARC58WalletIDsByAccountsMbr` is still pre-funded (removal is Phase 4).
- **AbstractedAccount, Q2 (R-STALE).** `assertValidGroup` (every `arc58_rekeyToPlugin` /
  `arc58_rekeyToNamedPlugin` window) accepts ONLY this wallet's `arc58_verifyAuthAddress()` call as the
  window close; the "controlled address rekeys itself back" shortcut is gone (`errNrkb`). Flash
  `arc58_rekeyTo(addr, true)` (`assertRekeysBack`) accepts the controlled address rekeying itself back to
  the wallet, or `arc58_verifyAuthAddress` only while `spending_address == controlled_address`.
  Every in-tree inner composition already ends with `arc58_verifyAuthAddress`.
  **Phase 0 suite:** `utils/principal.e2e.spec.ts` must set `Q2_WALLET_FIX_LANDED = true` (T25 then
  expects both constructions to fail; T13/T44 unchanged). That file is outside the wallet track's
  ownership, so the flip is requested here (see the results section).
- **WelcomePlugin (undeployed, edited in place).** `useMainWalletReferrer = true` now names
  `pluginPrincipal(wallet, factory).principal` (verified; requires a genuine wallet of the plugin's pinned
  factory, else `errHnwl`) instead of the raw `getOriginAccount(wallet)`. ABI unchanged.

### Wallet track results (2026-10-04, appended after implementation)

The interface notice above shipped unchanged. Builds are single-file (`build-contracts.mjs`); for
`AbstractedAccount` I confirmed on the unchanged source that the single-file build equals the committed
artifact byte for byte before editing.

**Sizes.** AbstractedAccount approval **8,178 B** (was 8,166 B; limit 8,192 B, 14 B headroom; still fits the
factory's 4-chunk / default-page path, so no rollout funding change). AbstractedAccountFactory 3,515 B.
WelcomePlugin 1,310 B.

**Code changes**
- `arc58/account/contract.algo.ts`: `txnRekeysBack` split. `isVerifyAuthCall(txn)` is the only window close in
  `assertValidGroup`; `assertRekeysBack` accepts the controlled-address shortcut or
  `spending == controlled && isVerifyAuthCall(txn)`. `register()` is unchanged (Phase 4).
- `arc58/account/factory.algo.ts`: Q1-A2 (`creationFeeLeftover(createFee, referrer)`, `sendReferralPaymentTo`),
  payment equality without `referralMbr`, `cost()` without the registry term. No `legacy*` import remains in the factory.
- `arc58/plugins/welcome/contract.algo.ts`: `pluginPrincipal(wallet, this.factory.value.id).principal` for
  `useMainWalletReferrer`; header doc updated (no registration needed).
- SDK `akita-sdk/src/wallet`: `newWallet({ register })`, `addPlugin({ registerEscrow })` (SDK and group builder),
  deprecation JSDoc on `WalletSDK.register`, group `register`, `WelcomePluginSDK.registerWallet`; new
  `WalletSDK.windowHint`, `predictPrincipal({ plugin, caller, escrow?, walletFactory? })`,
  `principalResources({ spender })`, `usePlugin({ seedPrincipalResources: true })` (seeds
  `windowPrincipalResources` into the Access-list preparer; handles `defaultToEscrow` grants); README and
  `rekeyTo`/`cost`/`new` docs. `NewWalletParams` type exported.

**Deviations from the spec**
1. **Q2 (b), `verifyAuthAddress` as a flash return.** The spec says "verifyAuthAddress when spending_address ==
   controlled_address". The wallet can only read `spending_address` when `arc58_rekeyTo` runs, so the clause is
   evaluated then. Outside a window `spending_address` is zero, so in practice a flash rekey must be returned by
   the controlled-address shortcut (the T13/T44 path). The clause still accepts a `verifyAuthAddress` while a
   (stale) default window has `spending == controlled`, where that call does verify the controlled account.
2. **Registry writes stop through opt-in flags, not deletion.** `register: true` / `registerEscrow: true` keep the
   legacy path available for legacy-shim tests and old-plugin integrations until Phase 4.
3. **WelcomePlugin edited in place** (undeployed, so no new app id). Behaviour change: `useMainWalletReferrer = true`
   now requires the sponsoring wallet to be a genuine wallet of the plugin's pinned factory (`errHnwl`), and names
   the escrow (spender) instead of the controlled address once the wallet has lost control of it. The factory pin
   is the plugin's own `factory` global (invariant 4: never taken from `W`).
4. **`WalletSDK.predictPrincipal` defaults `walletFactory` to the wallet's own `factory_app` global.** This is
   prediction only, for the caller's own wallet. It is documented as never a trust anchor; pass the pinned id
   whenever it is known.
5. **Binding referral invariant under Q1-A2.** The factory now trusts no wallet for the creation referral: it pays the
   `referrer` argument, which any address may be (Kyle's Q1 decision; self-referral is unenforceable, spec Q1). No
   registry or payer-wallet lookup remains in the factory.
6. **Not changed (Phase 4, listed only):** `AbstractedAccount.register`, `ARC58WalletIDsByAccountsMbr` in the factory
   (`newAccount` childMBR and wallet funding, `cost()`), in `mbr.algo.ts` `newEscrowMintCost` and the
   `constants.ts` comment, and the SDK `register`/`registerEscrow`/`registerWallet` paths. Until then every new
   wallet and every new escrow keeps an unused 12,100 µA registration pre-fund.
7. **Not repaired:** a wallet that already holds R-STALE state (escrow still rekeyed to `P`, stale
   `spending_address`) keeps it after a Q2 upgrade until `P` hands the escrow back; Q2 only prevents new cases.

**Requests to other tracks (files outside the wallet track)**
- `utils/principal.e2e.spec.ts` (Phase 0 owner): set `Q2_WALLET_FIX_LANDED = true` (line 57). Both T25
  constructions then expect `errMissingRekeyBack` (`errNrkb`), which matches this implementation (construction (b)
  passes the flash check through the shortcut and fails in `rekeyToPlugin`'s `assertValidGroup`).
- Specs that assume `newWallet` registers, now red unless they opt in with `register: true`:
  `utils/referral-to.e2e.spec.ts` (the `wallet` in `beforeAll`, R01/R03), `gates/ctx-sub-gates.e2e.spec.ts` (the
  "registered through the SDK's newWallet" wallet), `marketplace/compat.e2e.spec.ts` (`newFundedWallet(..., registered = true)`
  branch) and `marketplace/principal.e2e.spec.ts` (`Wr`). `escrow/escrow.e2e.spec.ts` comments say wallets
  auto-register; its assertions use the DAO wallet, which `tests/fixtures/dao.ts:1284` still registers explicitly.
- `tests/fixtures/unregistered-wallet.ts` header: "`newWallet` always calls `register('')`" is now false (the
  fixture still works). `akita-sdk/src/escrow/index.ts` `EscrowFactorySDK.register`: add the same deprecation JSDoc.
- Off-chain registry readers (frontend/indexer `EscrowFactory.get`/`getList`) must be inventoried before the SDK
  change ships (spec §6.10, Phase 3 prerequisite): wallets and escrows created by this SDK are absent from the registry.

**Tests added or changed**
- `arc58/account/rekeying.e2e.spec.ts` (Q2): positive control (escrow window closed by `verifyAuthAddress` clears
  `spending_address`); construction (a) → `errNrkb`, nothing stuck, and E7 (escrow window still works with
  `W.address` rekeyed away); construction (b) → `errNrkb`; `verifyAuthAddress` closing an escrow window is not a
  flash return → `errNrkb`; T13/T44 regression (flash returned by the controlled address).
- `arc58/account/factory.e2e.spec.ts`: P2-ACC-01 (cost caller-independent with no referral term; cut + 67,000 µA to
  Rewards and the rest to the DAO escrow for a non-wallet referrer; no cut at 50,000 µA; exact boundary 83,750 µA
  leaves the DAO 0; zero referrer; `cost()` ignores a registered payer's referrer); registration tests rewritten
  (default unregistered with the 12,100 µA pre-fund kept; `register: true` registers).
- `arc58/account/reclaim.e2e.spec.ts`: escrow create/use/reclaim with no registry entry (binding invariant);
  `registerEscrow: true`; P4-ESC-01 (`EscrowFactory.delete` → `errNreg`, documents Q15).
- `arc58/plugins/welcome/welcome.e2e.spec.ts`: no follow-up registration needed (gift balance includes the unused
  pre-fund); Q1-A2 through the plugin (registered payers with and without a referrer pay the same quote; the cut goes
  to the referrer argument); verified `useMainWalletReferrer` (Cx while live, the escrow after the admin rekeys Cx away).
- `akita-sdk/src/wallet/principal-phase3.test.ts` (new, 9 unit tests): `newWallet` registration opt-in, factory and
  welcome ABIs unchanged, `register(string)void` still present, `windowHint`, `predictPrincipal` for default and
  `defaultToEscrow` windows, `principalResources`, `errHnwl` for a wallet of another factory.

**Status / pending**
- LocalNet down (`localhost:4001/health` returned nothing at 15:3x and 16:14). Not run: `arc58/account/{rekeying,
  factory,reclaim,admin,contract,account-fixes,plugin-version,agent-delegation,hosted-agent-identity-payment,
  backend-hosted-agent-identity-payment,balance-reader}.e2e.spec.ts`, `arc58/plugins/welcome/welcome.e2e.spec.ts`,
  `utils/principal.e2e.spec.ts` (T13/T25/T44 after the flag flip), `utils/origin-spoofing.e2e.spec.ts`,
  `escrow/escrow.e2e.spec.ts`, every `newWallet`-based spec (58 files) and the full `npm test`.
- Ran: akita-sdk `vitest run` 367/367; `npm run build` (akita-sdk) OK; akita-sc unit tests 47/47; `tsc --noEmit` in
  akita-sc and akita-sdk: no error in any wallet-track file.

---

## 2026-10-04 — Marketplace track: Listing rev 3, hinted Marketplace + legacy shims, new plugin version (§6.7)

### Interfaces other tracks must know

**Marketplace singleton (`smart_contracts/marketplace/marketplace.algo.ts`).** Hinted methods keep the canonical
name; each legacy shim is a second TS method with `@abimethod({ name })` and the deployed selector.

| Hinted (new) | Legacy shim (deployed selector) | Shim semantics |
|---|---|---|
| `list(pay,axfer,uint64,uint64,uint64,address,uint64,address,string,byte[32][],uint64)uint64` | `list(pay,axfer,uint64,uint64,uint64,address,uint64,address,string,byte[32][])uint64` (`legacyList`) | rev-3 child with `seller_referrer = referrerOrZeroAddress(legacyWalletOf(dao, Txn.sender))`; also accepts the deployed plugin's ALGO payment (below) |
| `listPrizeBox(appl,pay,uint64,uint64,uint64,address,uint64,address,uint64)uint64` | `listPrizeBox(appl,pay,uint64,uint64,uint64,address,uint64,address)uint64` (`legacyListPrizeBox`) | same |
| `gatedPurchase(pay,appl,uint64,address,uint64)void` | `gatedPurchase(pay,appl,uint64,address)void` (`legacyGatedPurchase`) | registry origin + `gateCheck` (`Gate.mustCheck`), unchanged |
| `gatedPurchaseAsa(axfer,appl,uint64,address,uint64)void` | `gatedPurchaseAsa(axfer,appl,uint64,address)void` (`legacyGatedPurchaseAsa`) | same |

- Hinted `list`/`listPrizeBox`: `principalOf(dao, wallet).referrer` → child `seller_referrer`. The seller stays the
  spender (`Txn.sender`), as today (delist auth and proceeds are keyed by it).
- Hinted `gatedPurchase(Asa)`: `gateCheckCtx(gateTxn, dao, gateCtx(principalOf(dao, wallet)), listing.gate_id)`.
  A direct (top-level) buyer must pass `wallet = 0` and pin `ctx = (sender, 0, sender)`.
- Unchanged ABI: `purchase`, `purchaseAsa`, `delist`, `listCost` (readonly), `optIn`, `optInCost`.
- Typed-client names (overloads): `listPayAxferUint64Uint64Uint64AddressUint64AddressStringByte_32Uint64Uint64` (hinted)
  / `…Byte_32Uint64` (legacy), `listPrizeBoxApplPayUint64Uint64Uint64AddressUint64AddressUint64Uint64` / `…AddressUint64`,
  `gatedPurchasePayApplUint64AddressUint64Void` / `…AddressVoid`, `gatedPurchaseAsaAxferApplUint64AddressUint64Void` / `…AddressVoid`.
  There is no `client.send.list` / `listPrizeBox` / `gatedPurchase(Asa)` any more.
- Size: Marketplace approval 4,450 → 5,514 B (fits the MainNet app's 4 pages; no page growth needed).

**Listing rev 3 (`marketplace/listing.algo.ts`).** `create` gains a 16th argument `sellerReferrer: address`:
`create(uint64,bool,uint64,uint64,uint64,address,(address,uint64),address,uint64,uint64,address,string,uint64,(string,uint64),uint64,address)void`.
New global `seller_referrer` (bytes; schema 12 uints / **7** bytes), `ListingRevision = 3`. Settlement pays
`sendReferralPaymentTo(dao, seller_referrer, …)`; the Listing no longer imports any registry helper. Approval
3,232 → 3,106 B. Creation MBR 842,000 → **892,000** (`listCost` picks it up automatically). Rev ≤ 2 children keep their
own program (registry referral at settlement).

**Constants (`marketplace/constants.ts`, appended/edited):** `ListingGlobalStateKeySellerReferrer = 'seller_referrer'`,
`ListingRevision = 3`, `LegacyListingCreateMbr = 756_500`. `ListingCostInfo` (`marketplace/types.ts`) gains `createMbr`.

**New plugin version (`arc58/plugins/marketplace/contract.algo.ts`), ABI unchanged.** `list`/`listPrizeBox` pass
`windowHint(wallet)` as the target's trailing hint; gated `purchase` builds `Gate.mustCheckFor(gateCtx(pluginPrincipalOf(dao, wallet)), gateID, args)`
and calls the hinted `gatedPurchase(Asa)` with `windowHint(wallet)`. The singleton serves every child generation, so
there is no per-child ABI switch. Approval 2,678 B (2 pages, `extraProgramPages: 1`). Deploy (Phase 3) through
`scripts/deploy-marketplace-plugin.ts` → `recordPluginDeployment`; not done here.

**SDK (`akita-sdk/src/marketplace`).** `ListParams.wallet?` and `PurchaseParams.wallet?` (default `0n`; a nonzero hint on a
direct call reverts `errHtop`). `MarketplaceSDK.list` sends the hinted overloads. `MarketplaceSDK.purchase` sends the hinted
`gatedPurchase(Asa)` for a `Gate.mustCheckFor` gate txn and the legacy shim for a `Gate.mustCheck` gate txn
(`isLegacyGateTxn`), so existing callers that build `mustCheck` keep working. New exports: `MARKETPLACE_HINTED_METHODS`,
`MARKETPLACE_LEGACY_METHODS`, `LISTING_CREATE_MBR = 892_000n` (the `listCost` mirror's base, was 842,000),
`LEGACY_LISTING_CREATE_MBR = 756_500n`, `directGateCtx(sender)`, `isLegacyGateTxn(gateTxn)`, and
`MarketplaceSDK.quoteListCost({ prize, paymentAsset, isPrizeBox })` (the on-chain readonly `listCost`; the comment that
referenced a non-existent `quoteListCost` now has one). `ListingState` gains `rev` and `sellerReferrer?`.
`akita-sdk/src/wallet/plugins/marketplace.ts` needs no change (plugin ABI unchanged).

### Deviations / findings

1. **Finding (ride-along regression, pre-existing in the working tree): the deployed MarketplacePlugin 3569561455 cannot
   `list` on the working-tree Marketplace.** Derived from its bytecode (vendored in `marketplace/compat/mainnet-deployed.json`):
   the plugin computes the listing payment LOCALLY with the constant 756,500 (intcblock; pre-audit Listing = 2 pages,
   9 uints, 6 bytes) and does not call `listCost` (the deployed Marketplace 3569557584 has no `listCost`). The audit's
   rev-2 Listing (12 uints) already raised the exact charge to 842,000, so every old-plugin `list` reverted `errIpay`;
   rev 3 makes it 892,000. The pre-audit SDK (`baseCost` 756,500) has the same problem for direct lists.
2. **Decision: the legacy `list`/`listPrizeBox` shims accept the deployed plugin's payment for ALGO-priced listings**
   (`payment == cost.total − cost.createMbr + LegacyListingCreateMbr`), in addition to `cost.total`. §7.2 requires the
   shims to keep deployed flows (P2-CMP-01). The factory floats the difference (`892,000 − 756,500 = 135,500 µALGO`)
   from its free balance while the listing lives. The child records the deposit actually paid, and deletion releases the
   creator MBR with the refund capped at that deposit, so the float comes back on purchase and on delist.
   - Not accepted for ASA-priced listings. They never settled on the deployed program (MKT-05), and the deployed
     plugin's escrow opt-in term uses the factory's address instead of the DAO escrow's, so it can be too low.
   - Not accepted by the hinted methods.
   - Operational impact (runbook for the Marketplace upgrade):
     - Keep the factory's free balance at or above `135,500 × the expected number of concurrent old-plugin listings`. MainNet free balance on 2026-10-04 was 1,905,400 µALGO (about 14 listings).
     - When the float is exhausted, only old-plugin/legacy lists fail (AVM min-balance). Hinted lists pay their full cost.
     - Anyone can tie up float through the shim, but only by locking about 8× that amount of their own ALGO (a legacy ALGO listing deposit is about 1,090,500 µALGO), and only on the legacy path.
   - **Kyle: if you prefer a hard cutover for old-plugin `list` instead, delete the `legacyPayment` arm in `assertListingPayment`.** This is a one-line change; M-06/M-08 and the compat list tests then expect `errIpay`.
3. **Spec §6.7 "listCost +50,000 automatic"** holds. The SDK keeps a local mirror (`listCost`, base 892,000) because
   `list()` must quote before the group's own opt-ins land, and `quoteListCost()` simulates `listCost` with the current
   opt-in state. A unit test pins the mirror to the generated Listing ARC-56 (pages + schema).
4. **Compatibility baseline is vendored, not fetched at test time.** `marketplace/compat/mainnet-deployed.json` holds the
   MainNet approval/clear programs of MarketplacePlugin 3569561455, Marketplace 3569557584 and its boxed Listing program
   (box `bc`, 3,011 B), with sha256 and schema. They were read once from `mainnet-api.algonode.cloud` (read-only GET). Live
   MainNet listings at that time: 3643990817 and 3691743616 (schema 9/6, 1 extra page).
   `compat.e2e.spec.ts` installs these bytes on LocalNet.
   - The "old children" are created by a fresh app running the deployed Marketplace program on the universe DAO.
   - That app is then upgraded to the working tree through two DAO `UpgradeApp` proposals: `updateApp`, then `updateFactoryChildContract` with the rev-3 Listing.
5. **SDK `purchase` routes by gate-txn method** instead of adding a separate legacy wrapper. Callers that build
   `Gate.mustCheck(caller, …)` keep the deployed registry-origin semantics. `mustCheckFor` goes to the hinted method.
6. **December-2025 plugin generation (3368399474)** is bound to a different DAO (3368388956) and factory (3368394180), not
   the MainNet Marketplace 3569557584, so it is out of scope for this singleton's compat suite.

### Phase 4 (listed only, NOT applied)
Delete the following:
- `legacyList`, `legacyListPrizeBox`, `legacyGatedPurchase`, `legacyGatedPurchaseAsa`;
- `assertLegacyGatePassed`, `legacySellerReferrer`;
- the `legacyPayment` arm of `assertListingPayment` and `LegacyListingCreateMbr`;
- the SDK's `MARKETPLACE_LEGACY_METHODS`, `isLegacyGateTxn` routing and `LEGACY_LISTING_CREATE_MBR`.

Old (rev-absent) children keep their own registry referral until they settle; the singleton has no registry read left after that.

### Tests
- New `smart_contracts/marketplace/principal.e2e.spec.ts`:
  - M-01..M-05: rev 3 and `seller_referrer` for an unregistered wallet, a registered wallet and an EOA; the referral is paid at settlement to an EOA referrer with no registry entry; direct hints give `errHtop`/`errHnwl`; the legacy shim referrer.
  - M-06..M-08: legacy ALGO payment on the shims. The factory float is exactly 135,500 and is recovered. The hinted method and ASA-priced listings reject it with `errIpay`.
  - M-09..M-13: the context-aware referrer gate from a never-registered buyer wallet; the wrong referrer gives `errFgte`.
  - Direct `mustCheckFor((buyer,0,buyer))`.
  - **P2-GATE-03 at the marketplace target**: a foreign wallet in ctx, a foreign spender, a legacy gate txn on the hinted method and a hinted gate txn on the shim each give `errFgte`.
  - A direct hint gives `errHtop`.
  - P2-ABI-01.
- New `smart_contracts/marketplace/compat.e2e.spec.ts` (deployed bytecode):
  - **P2-CMP-01/P2-REF-01**: an old-plugin list goes through the shim and creates a rev-3 child with the creation-time registry referrer, paid at completion; the float is recovered. Old-plugin `listPrizeBox`/`changePrice`/`delist` work on rev-3 children.
  - **P2-REF-02**:
    - Old-plugin gated purchase via the legacy shim: passes for a registered buyer whose wallet referrer matches, `errFgte` otherwise.
    - New plugin buying an old (rev-absent) child: the registry referral is still paid and the child is deleted.
    - New plugin delisting an old child: full legacy refund.
    - The deployed plugin on the upgraded factory creates rev-3 children.
- Updated `marketplace/marketplace.e2e.spec.ts` I-4 to use the hinted `listPrizeBox` overload.
- New `akita-sdk/src/marketplace/index.test.ts` (8 unit tests): both ABIs, Listing rev-3 create/schema, `LISTING_CREATE_MBR` =
  generated Listing pages + schema, legacy constant, `directGateCtx`, and `purchase` routing (hinted with/without hint,
  legacy, ungated).

### Status / pending
- **LocalNet down** (`localhost:4001/health` timed out). Not run: `marketplace/principal.e2e.spec.ts`,
  `marketplace/compat.e2e.spec.ts`, `marketplace/marketplace.e2e.spec.ts`, `arc58/plugins/marketplace/marketplace.e2e.spec.ts`,
  `arc58/plugins/plugin-sdk-hooks.e2e.spec.ts`, `arc58/dao/tests/upgrade/dao.upgrade.e2e.spec.ts` (Marketplace mock
  upgrade), `prize-box/prize-box.e2e.spec.ts`, and the full `npm test`. Per §5.4.1 these mean nothing until V0 passes.
- Ran: akita-sdk `vitest run` 367/367 (incl. the 8 new); akita-sc unit set 47/47; `tsc --noEmit` clean for every
  marketplace file in akita-sc and akita-sdk. The SDK `npm run build` exits non-zero only on other tracks' in-progress files (raffle).
  Its tsup output and the marketplace declarations were emitted.
- Built with `build-contracts.mjs`, one file at a time: `marketplace/listing.algo.ts`, `marketplace/marketplace.algo.ts`,
  `arc58/plugins/marketplace/contract.algo.ts` (none of them is among the five whose single-file and whole-tree builds differ).

---

## 2026-10-04 — Update-plugin track: Phase 2a plugin, rollout scripts for Phases 2a/2/3, P2-UPD-01

### Facts from the deployed bytecode (read-only `GET /v2/applications/{id}`, MainNet round ≈ 65,676,672, consensus v42)

Stored in `smart_contracts/arc58/plugins/update-akita-dao/fixtures/mainnet-deployed.json` (program bytes for the
Update plugin, AkitaSocial, Subscriptions and AkitaDAO; pages, schema and sha256 for the eight Phase 2 singletons).
Other tracks can reuse it for P2-CMP-01.

1. The approval programs of Update plugin 3569559689, AkitaSocial 3569557130, Subscriptions 3569556497 and AkitaDAO
   3569556034 are **byte-identical to the HEAD (`e7f174ee`) artifacts**. Their clear programs are NOT: the deployed
   singletons carry the 1-byte clear program `0x0b` (pushed by the deployed Update plugin, whose `clear_program`
   global is `0x0b`). Compare approval bytes only, or expect `0x0b`.
2. Every Phase 2 singleton on MainNet has `extraProgramPages = 3` (4 pages, 8,192 B). AkitaSocial and Subscriptions
   (and today the AkitaDAO) outgrow that, so they need the page-growing plugin.
3. **The deployed DAO does not implement `isUpgradeLease(uint64,byte[32])bool`** (selector absent from its program;
   `opUp()void` is present). The page-growing Update plugin calls `DAO.isUpgradeLease` for every upgrade group that the
   DAO wallet's admin did not sign (DAO-03). Consequence for the rollout order (all tracks, and the audit-remediation
   DAO rollout): after Phase 2a repoints `pal.update`, execution-key upgrades through the new plugin fail until the DAO
   itself is upgraded. The DAO (9,738 B now) can only be pushed by the NEW plugin, through the admin route that the
   audit rollout already plans (bootstrap ChangeAdmin to the creator, push the DAO, hand the wallet back). So the
   order is: **Phase 2a proposal → DAO upgrade (admin route, new plugin) → Phase 2.** `scripts/principal-phase2-upgrade-targets.ts`
   refuses to run while the DAO lacks `isUpgradeLease`; `scripts/principal-phase2a-update-plugin.ts` prints the warning.
4. MainNet DAO wallet 3569559153: admin = the DAO app address, `pal.update` = 3569559689, proposal action limit 5,
   ≈ 43 ALGO above its minimum balance (one `GET /v2/accounts` read). Phase 2 size sponsorship from today's artifacts:
   AkitaSocial 3,528,000 µALGO (pages 3 → 5), Subscriptions 3,428,000 µALGO (3 → 4); the other six do not change size.

### Contract: no source change

The Phase 2a plugin is the working-tree `UpdateAkitaDAOPlugin` (page growth, schema pass-through, DAO-03 lease binding,
`requireTerminalUpdate`). I reviewed it against go-algorand `updateApplication` (v42 `AppSizeUpdates`: any update
that sets pages or a schema is a size change; the sender becomes the size sponsor and carries the extra pages and the
global schema, the creator keeps the base page) and found nothing to change for Phases 2/3. Its artifact was not rebuilt.
I could not re-verify the artifact against a fresh compile: a single-file compile of the plugin currently fails in
`social/contract.algo.ts` and `subscriptions/contract.algo.ts` ("Contract reference must resolve to a contract class",
"Expected 11 arguments"), which other tracks are editing (the plugin reaches them through `utils/functions.ts`).
**Integration step: recompile the plugin once social/subscriptions build, and diff its bytecode against the artifact.**

### Interfaces other tracks must know

- **Phase 2 execution shape (factory tracks: Marketplace, StakingPool, Auction, Raffle, wallet factory).** Each target is
  ONE UpgradeApp proposal. A factory upgrade and its child push go in ONE execution group, the factory FIRST
  (`[rekeyToPlugin, setClearProgram, initBoxedContract, loads…, updateApp(rekeyBack=false), initBoxedContract, loads…,
  updateFactoryChildContract, verifyAuthAddress]`), so no block runs a new factory with an old child or the reverse.
  This fits only while `2 + (3 + ⌈app/2026⌉) + (2 + ⌈child/2026⌉) ≤ 16`. Today: StakingPoolFactory 3,960 B + StakingPool
  12,508 B = **exactly 16** txns; AuctionFactory + Auction 15; RaffleFactory + Raffle 14; wallet factory + wallet 14;
  Marketplace + Listing 12. If a target grows past 16, the planner splits it (factory group, then child group) and
  reports "NOT atomic": child creation reverts between the two groups. StakingPool stays atomic while the child is
  ≤ 14,182 B (7 upload chunks) and StakingPoolFactory ≤ 4,052 B (2 chunks); past that, accept the split. A group at
  exactly 16 has no room for an SDK resource-carrier txn; if its build fails, re-run with `--split-children`
  (the deployed HEAD factories accept the child push from the DAO wallet, so the split child group also simulates
  before the factory upgrade).
- **The new plugin's own child push** uses the NEW factory code (the factory is updated first in the group), so the
  child-loading ABI of the deployed (HEAD) factories does not matter.
- **Clear programs:** Phase 2 stages each artifact's own clear program (`setClearProgram` in the same group), so the
  upgraded singletons get `0b810143` instead of `0x0b`. A singleton whose approval moves to AVM 12/13 needs a clear
  program of the same version; staging the artifact's clear covers it.
- **Phase 3 grant swaps** (`scripts/update-dao-wallet-plugins.ts`, core moved to `scripts/lib/dao-wallet-plugin-migration.ts`):
  - `--replace key:to` (every installed version the SDK registry lists under `key`) and `--replace key:from:to`
    (explicit; also works on LocalNet) name the new app id, so the swap can run before the SDK is rebuilt.
  - Replacing the **Update** grant always repoints `pal.update` in the same proposal (first action). An Update grant
    that does not hold the `pal.update` role is **removed only** (never replaced): a stale Update grant could still
    call `updateAkitaDaoAppIDForApp`/`updateAkitaDaoEscrowForApp` through an ExecutePlugin key.
  - `--unname-aliases`: a named grant becomes an unnamed grant with the same policy plus `RemoveNamedPlugin(alias)` in one
    proposal (spec §7.1 "manual path"). Callers that resolve the alias must switch to the plugin key.
  - `--add-method socialPlugin:setMetaWallet` adds the method to METHOD-RESTRICTED social grants (unrestricted grants
    already allow it). It reads the selector from the SDK's generated client: rebuild the SDK after the social track's build.
- **Immutable catalog entries (new):** `UpdateAkitaDAOPlugin` (`registryKey: updatePlugin`, default `clearProgram =
  0b810143`), `AkitaSocialPlugin`, `SubscriptionsPlugin`, `StakingPoolPlugin`, `AuctionPlugin`, `MarketplacePlugin`,
  `RafflePlugin`, `WelcomePlugin` (no SDK key). The `factory` constructor arg (StakingPool/Auction/Marketplace/Raffle/Welcome)
  is filled from the network map by `scripts/principal-phase3-plugins.ts`. The catalog-wide LocalNet test
  (`tests/migration-scripts.e2e.spec.ts`) now also deploys these eight; its `allConfig.factory` (the wallet factory) is a
  valid stand-in for all of them (RafflePlugin reads `akita_dao` from it). **Plugin tracks:** if a plugin's constructor
  gains an argument, add a default or extend `PHASE3_PLUGINS` (`scripts/lib/principal-rollout.ts`).

### Scripts (all plan first; nothing is written without `--confirm`; `--dry-run` never signs)

| Script | Phase | What it does |
|---|---|---|
| `scripts/principal-phase2a-update-plugin.ts` | 2a | deploys `UpdateAkitaDAOPlugin` from the catalog (receipt, resumable) or verifies `--plugin-id` (program hash + `akita_dao`); ONE proposal `[UpdateFields pal.update=new, AddPlugin new (old grant's policy and execution settings), RemovePlugin old]`, executed at once before DAO initialization, else a draft (`--submit`); reports `isUpgradeLease`; `--fund-sponsor` funds the DAO wallet for the Phase 2 sponsorship |
| `scripts/principal-phase2-upgrade-targets.ts` | 2 | `--split-children` forces separate child groups. Per target: live pages/schema vs artifact, sponsor MBR, group plan; refuses unless `pal.update` runs the new plugin and the DAO has `isUpgradeLease`; funds DAO wallet (sponsor + execution keys), admin (simulation headroom), plugin staging box and factory child box; one UpgradeApp proposal; sends; verifies approval, clear, pages, schema, version and the staged child byte for byte. `--proposal-id` + `--target` resumes after a vote (group ids re-stamped and checked). `--skip-wallet-child` leaves the wallet version out |
| `scripts/principal-phase3-plugins.ts` | 3 | deploys the seven plugins from the catalog (`--deployed Name=id` skips), then `--swap` runs the grant migration with `--replace key:new` |
| `scripts/update-dao-wallet-plugins.ts` | 2a/3 | same CLI as before plus `--replace`, `--unname-aliases`, `--add-method`; LocalNet allowed with `key:from:to` |

Libraries: `scripts/lib/principal-rollout.ts` (pure planning: pages, schema, sponsor MBR, group sizes, targets, Phase 3
plugin list, `restampExecution`), `scripts/lib/principal-rollout-run.ts` (`runPhase2a`, `planTarget`, `executeTargetPlan`,
`runPhase2`, `runPhase3`, chain reads), `scripts/lib/dao-wallet-plugin-migration.ts`. `package.json` is not mine, so the
new scripts have no npm aliases: run them with `npx ts-node --transpile-only scripts/<file>`.

### Deviations from the spec

1. **No new Update plugin source.** Spec §7.1 Phase 2a deploys "the new UpdateAkitaDAOPlugin"; the working-tree contract
   already is that version (see above). This track adds the deployment path, the proposal and the rehearsal.
2. **Phase 2a must precede the DAO upgrade, and Phase 2 must follow it** (fact 3). The spec does not order Phase 2a
   against the audit-remediation DAO upgrade.
3. **The Update grant swap repoints `pal.update` in the same proposal and removes (never replaces) stale Update grants.**
   The spec lists the repoint and the grant swap separately; doing them apart leaves either a `pal.update` without a
   grant or an old Update grant that an ExecutePlugin key can drive.
4. **Factory + child in one group** (spec: "in the same proposal"). Same proposal and, when it fits, the same group.
5. **Named aliases:** spec §7.1 Phase 3 says "use the manual path". Implemented as `--unname-aliases` (alias dropped);
   re-aliasing needs a later remove + `AddNamedPlugin` pair (the validator checks aliases against current state).
6. **Fixed a vacuous assertion** in `update-akita-dao.e2e.spec.ts` (DAO-01 test): `executions[0]?.groups` is always
   undefined because `arc58_getExecutions` returns ARC-4 tuples; it now asserts `executions[0][0]` is empty. (This was
   also one of the 10 pre-existing `tsc` errors.)
7. **`scripts/deploy-update-plugin.ts` (older, not changed) is superseded for this rollout.** It repoints `pal.update`,
   removes the old grant and installs the new one in three separate proposals; do not use it for Phase 2a.
8. **MainNet reads beyond program bytes:** besides `GET /v2/applications/{id}`, I made one `GET /v2/status` and one
   `GET /v2/accounts/{DAO wallet}?exclude=all` read (consensus version and sponsor headroom). No transaction was sent.

### Tests

- `smart_contracts/arc58/plugins/update-akita-dao/rollout.test.ts` (unit, 21, **pass**): fixture integrity; deployed DAO
  lacks `isUpgradeLease`, tree DAO has it; deployed plugin lacks `updateAppWithSchema`; page/schema/sponsor planning
  (AkitaSocial and Subscriptions need Phase 2a, re-pushing the deployed program needs nothing, schema growth selects
  `updateAppWithSchema`); group planning (atomic/split boundaries, all eight targets plan); `--replace`/`--add-method`
  parsing; `resolveGrantUpdate` precedence; `createMigrationPlan` on stubbed chain state (pal repoint order, stale Update
  grant remove-only, alias refusal/unnaming, privileged refusal, new methods only on restricted grants); `restampExecution`;
  catalog entries resolve their constructors; all four CLIs load (`--help`).
- `smart_contracts/arc58/plugins/update-akita-dao/rollout.e2e.spec.ts` (**P2-UPD-01**, LocalNet, **not run**): baseline =
  deployed Update plugin bytes as `pal.update` with the grant (swapped in with the same migration code); deployed AkitaSocial
  bytes (3 extra pages, 8/56); the deployed plugin re-pushes the deployed program (control) but cannot push the tree's
  AkitaSocial; `runPhase2a` with the catalog-deployed plugin (one proposal: repoint + add + remove, DAO wallet funded);
  `runPhase2` pushes the tree's AkitaSocial (approval and clear equal the artifact, pages grown, schema 8/56 kept,
  `akita_dao` kept) and the size sponsorship moves exactly (DAO wallet +pages/+8/+56, creator −3/−8/−56); the old plugin
  has no grant and an ExecutePlugin on it fails, ExecutePlugin on the new one fails `errIact`; RaffleFactory upgrade +
  Raffle child push in ONE group (one UpgradeApp action, versions and staged child verified), and the forced split
  (two UpgradeApp actions in one proposal, factory first).

### Status / pending

- **LocalNet down** (`localhost:4001/health` and KMD timed out at 16:00 and 16:22). Not run: `rollout.e2e.spec.ts`
  (P2-UPD-01), `update-akita-dao.e2e.spec.ts`, `tests/migration-scripts.e2e.spec.ts` (now deploys the eight new catalog
  entries), and the full `npm test` (baseline 1,780 / 0). Run with
  `with-localnet-lock.sh update-plugin npx vitest run smart_contracts/arc58/plugins/update-akita-dao tests/migration-scripts.e2e.spec.ts`.
- Ran: `rollout.test.ts` 21/21, `tests/migration-dry-run.test.ts` 7/7, `tests/ctx-sub-gates.test.ts` 13/13,
  `tests/principal-sync.test.ts` 7/7, `tests/logged-error-codes.test.ts` 2/2. `tsc --noEmit`: no error in any file of this track.

---

## 2026-10-04 — Subscriptions track: hinted Subscriptions + legacy shims, stored pair 'i', adoptPrincipal, new plugin version (§6.4, §6.11)

### Interfaces other tracks must use

**Subscriptions singleton (`smart_contracts/subscriptions/contract.algo.ts`).** The hinted method keeps the canonical TS
and ARC-4 name; the shim is `legacyX` with `@abimethod({ name: 'x' })` and the deployed signature.

| Hinted (new) | Legacy shim (deployed selector, kept until Phase 4) |
|---|---|
| `newService(pay,uint64,uint64,uint64,uint64,uint64,address,string,byte[36],uint8,byte[3],uint64)uint64` | `newService(pay,…,byte[3])uint64` |
| `gatedSubscribe(pay,appl,address,uint64,uint64,uint64,uint64)uint64` | `gatedSubscribe(pay,appl,address,uint64,uint64,uint64)uint64` |
| `subscribe(pay,address,uint64,uint64,uint64,uint64)uint64` | `subscribe(pay,address,uint64,uint64,uint64)uint64` |
| `gatedSubscribeAsa(pay,axfer,appl,address,uint64,uint64,uint64,uint64)uint64` | `gatedSubscribeAsa(pay,axfer,appl,address,uint64,uint64,uint64)uint64` |
| `subscribeAsa(pay,axfer,address,uint64,uint64,uint64,uint64)uint64` | `subscribeAsa(pay,axfer,address,uint64,uint64,uint64)uint64` |
| `gatedTriggerPayment(appl,(address,uint64),uint64)void` | `gatedTriggerPayment(appl,(address,uint64))void` |
| `newServiceCost(uint64,uint64)uint64` (ro) | `newServiceCost(uint64)uint64` (ro) |
| `newSubscriptionCost(address,uint64,uint64,uint64)uint64` (ro) | `newSubscriptionCost(address,uint64,uint64)uint64` (ro) |

New: `triggerGateCtx((address,uint64),uint64)(address,uint64,address)` (readonly) and
`adoptPrincipal(pay,(address,uint64))void`. Unchanged: `triggerPayment((address,uint64))void`, `getSubscription`,
`SubscriptionInfo` (the subscription sub-gates decode it), every other method.

- Hinted semantics: `p = principalOf(dao, wallet)` (strict). Referral → `sendReferralPaymentTo(dao, p.referrer, …)`,
  quotes → `referralFeeTo(dao, quoteReferrerOf(dao, wallet), …)`. Gated subscribes assert
  `gateCheckCtx(gateTxn, dao, gateCtx(p), service.gateID)` (`Gate.mustCheckFor`). A gated subscribe with `p.wallet != 0`
  writes box `'i'` = `SubscriptionPrincipal { wallet: uint64, principal: Account }` keyed by the `SubscriptionKey`
  (`'i'` + 40 B key, 40 B value, `SubscriptionPrincipalMBR = 34_900`); `newSubscriptionCost(…, wallet)` adds it when
  `wallet != 0 && service.gateID != 0`; `unsubscribe` deletes and refunds it to the subscriber.
- `gatedTriggerPayment(gateTxn, key, wallet)`: `wallet` is the CALLER's own hint (keepers acting as themselves pass 0).
  Subject `triggerCtx(key, p)` exactly as spec §6.4 (1)/(2)/(3); (3) uses `legacyWalletOf(dao, key.address)` +
  `legacyOriginOr(…, key.address)` with `ctx.wallet = ownsAtRestOf(dao, W, key.address) ? W : 0`.
  `triggerGateCtx(key, wallet)` runs the same code; plugins call it inside their window, keepers simulate it top-level.
- Legacy shims are the working-tree (deployed + ride-along audit) semantics: registry referrer of `Txn.sender`,
  registry gate origin with a plain `gateCheck`, and NO `'i'` write. All gated paths call private `triggerImpl(key, gated)`;
  the `methodSelector(this.gatedTriggerPayment)` compare is gone (`errIseq` now means "gated subscription, ungated entry point").
- `adoptPrincipal(payment, key)` (Q13): permissionless; `payment` is exactly 34,900 µA from `Txn.sender` to the app;
  requires an existing subscription with `gateID != 0` (`errNgtd`), no `'i'` yet (`errPexs`) and a genuine registry
  wallet for `key.address` (`errNlwl`); stores `(W, legacyOriginOr(W, key.address))`.
- New error codes (subscriptions/errors.ts, SDK `PEXS/NLWL/NGTD`): `errPexs`, `errNlwl`, `errNgtd`.
- Approval program 10,179 B (+4 clear) = 10,183 B: fits `extraProgramPages: 4` (10,240 B) with **57 B headroom**. MainNet
  has 3 extra pages, so the Phase 2 push still grows 3 → 4 pages (same as the update-plugin track's rollout plan).

**New Subscriptions plugin version (`arc58/plugins/subscriptions/contract.algo.ts`, new app id, ABI unchanged).**
Every hinted target call passes `windowHint(wallet)`; `subscribe` builds `Gate.mustCheckFor(gateCtx(pluginPrincipalOf(dao, wallet)), …)`;
`triggerPayment` gets the ctx from `Subscriptions.triggerGateCtx(key, windowHint(wallet))`. It no longer reads the
EscrowFactory (no `get(address)byte[]` selector in its bytecode) and never builds a plain `Gate.mustCheck`
(`principal-shims.test.ts` asserts both). 4,462 B approval. `SubscriptionsPluginSDK` needs no change.

**SDK (`akita-sdk/subscriptions`).** Wrappers send the hinted overloads (`wallet` default `0n`); `legacy: true` selects the
deployed selectors. `gateTxn` may be a builder `(ctx) => gate.build.mustCheckFor({ ctx, … })`: `subscribe` passes
`directGateCtx(sender)`, `triggerPayment` passes `triggerGateCtx(...)`. New: `triggerGateCtx`, `getStoredPrincipal`,
`adoptPrincipal`, `directGateCtx`, `SUBSCRIPTION_PRINCIPAL_MBR`, types `SubscriptionGateCtx` / `SubscriptionGateTxn`.
Generated overload names: e.g. `subscribePayAddressUint64Uint64Uint64Uint64Uint64` (hinted) vs
`subscribePayAddressUint64Uint64Uint64Uint64` (legacy), `gatedTriggerPaymentApplAddressUint64Uint64Void` vs
`gatedTriggerPaymentApplAddressUint64Void`, `newServiceCostUint64Uint64Uint64` vs `newServiceCostUint64Uint64`.

### Requests to other tracks (not applied: outside the subscriptions files)

1. **Guild track — `arc58/guilds/consensus/subscriptions/contract.algo.ts` no longer typechecks/compiles** (new `tsc`
   error at :130): `abiCall<typeof Subscriptions.prototype.newServiceCost>({ args: [0] })` now needs the hint, and
   `methodSelector<typeof Subscriptions.prototype.newService>()` now resolves to the HINTED selector, which expects a
   12th appArg (a rebuild without the extra arg would fail at runtime). The guild acts as itself, so pass hint 0:
   `args: [0, 0]` and append `encodeArc4(none)` after `encodeArc4(offering.highlightColor)`. Update
   `arc58/guilds/tests/mock-subscriptions.algo.ts` to `newServiceCost(asset, wallet)` and its `newService` mock to the
   hinted signature in the same change. The current guild artifact (deployed-style old selectors) keeps working against
   the legacy shims, so nothing breaks at runtime until the guild is rebuilt. Guilds are undeployed, so they should move
   to the hinted selectors before Phase 4 deletes the shims.
2. **Fixtures — `tests/fixtures/subscriptions.ts`** uses `extraProgramPages: 4`. It still fits (57 B headroom). Consider 5
   so a later Subscriptions change does not break every `buildAkitaUniverse` spec at deploy time.

### Deviations from the spec (Subscriptions track)

1. **`createSubscription` and `createAsaSubscription` are merged** into one private `createSubscription(payment, asa, xfer, …)`
   (the ASA transfer is read as `gtxn.AssetTransferTxn(xfer)`), and every subscribe entry point (4 hinted + 4 shims)
   goes through one private `subscribeImpl`. Needed for size: the straightforward version was 10,532 B and did not fit
   4 extra pages. Checks, transfers, amounts and stored state are the deployed ones; only the order in which some
   asserts fire changed (e.g. a legacy shim reads the registry referrer before the blocks/service checks).
2. **Legacy gated shims read the registry once** and use the result for both the gate origin and the referrer (the
   deployed contract made two identical `EscrowFactory.get` inner calls). Same result, one inner call fewer.
3. **Legacy shims do not write `'i'`** (the spec specifies `'i'` only for the hinted gated subscribes; unlike the
   StakingPool shim, a missing pair here never lets a third party disqualify anyone: legacy subscriptions keep the
   registry subject (3)). They are backfilled with `adoptPrincipal`.
4. **`adoptPrincipal` details the spec leaves open:** it takes a payment (`adoptPrincipal(pay,(address,uint64))void`),
   refuses ungated subscriptions (`errNgtd`) and subscribers without a genuine registry wallet (`errNlwl`: storing
   `(0, key.address)` would let anyone pin a subject for a wallet that registers later), and copies the registry answer
   `legacyOriginOr(W, key.address)` evaluated with the adopter as `Txn.sender` (the same function keepers evaluate today).
   The MBR is refunded to the SUBSCRIBER by `unsubscribe`, not to whoever funded the adoption. Residual: an adoption made
   while the subscriber's external `C` is temporarily not rekeyed to `W` stores `(W, key.address)` once and for all;
   only the subscriber's own action (rekeying `C` away, or opening a window on `C` in another group) creates that state.
5. **`newSubscriptionCost(…, wallet)` adds the pair MBR for any `wallet != 0`** on a gated service without checking
   genuineness (a non-genuine hint makes the subscribe revert anyway). `triggerGateCtx` does not assert that the
   subscription exists (missing subscription → the registry derivation; `gatedTriggerPayment` asserts existence).
6. **Edge accepted:** if a keeper's window spending account IS `key.address` but its hint is not the stored wallet (an
   escrow moved from one wallet to another), the ctx computed by `triggerGateCtx` (before the target txn's `RekeyTo`)
   and the target's can differ in `ctx.wallet`, and that keeper's trigger reverts (`errFgte`). Other keepers are unaffected.
7. **SDK direct wrappers refuse `wallet != 0` locally** (error text mentions `errHtop`): a top-level hinted call can never
   succeed; wallets act through the plugin. `legacy: true` keeps the deployed selectors reachable for tests and tooling.
8. **Compatibility baseline:** MainNet Subscriptions 3569556497 and the May 2026 plugin 3569561107 are byte-identical to
   the HEAD artifacts (checked against algod `GET /v2/applications/{id}`). The programs are vendored read-only in
   `smart_contracts/subscriptions/compat/mainnet-programs.json` (plus the December 2025 plugin 3368399152). The December
   plugin is covered statically only: its `newService` selector is already absent from the deployed singleton.

### Tests

- `smart_contracts/subscriptions/principal-shims.test.ts` (unit, 15, **ran: 15/15**): both selectors per overloaded name
  (P2-ABI-01), `triggerGateCtx`/`adoptPrincipal` ABI, size ≤ 10,240 B, every deployed Subscriptions selector still routed,
  every Subscriptions selector the deployed plugins call still routed (static P2-CMP-01), new plugin calls only hinted
  selectors + `triggerGateCtx` + `mustCheckFor` and never the registry, `'i'` MBR, new error codes.
- `akita-sdk/src/subscriptions/principal.test.ts` (unit, 7, **ran: 7/7**): hinted vs legacy overload selection, local
  `errHtop` refusal, `triggerGateCtx` → builder → hinted `gatedTriggerPayment`, legacy trigger needs a prebuilt txn.
- `smart_contracts/subscriptions/principal.e2e.spec.ts` (new, LocalNet, **not run**): P2-ABI-01 (both cost selectors,
  on-chain `errHtop`), hinted direct gated subscribe (`mustCheck` and foreign ctx rejected), hinted SG-05, referral to an
  unregistered wallet's referrer (service creation and subscription), P2-SUB-02 (exact +34,900 quote, exact charge,
  refund, ASA exact-payment path, mismatched referrer gate fails), P2-SUB-03 (a)/(b)/(c), another wallet as keeper,
  forged-wallet subscriber with uint64 `controlled_address`/`referrer`/`spending_address` (keeper trigger does not panic),
  `adoptPrincipal` error paths.
- `smart_contracts/subscriptions/compat.e2e.spec.ts` (new, LocalNet, **not run**): the deployed May 2026 plugin installed
  from its MainNet program: legacy `newService`/`newServiceCost` (registry referral paid), legacy ungated subscribe with
  an exact charge, legacy gated subscribe (no `'i'`), **P2-SUB-01** (deployed plugin's gated trigger through the shim),
  P2-SUB-03 (c) keeper on the hinted selector, Q13 `adoptPrincipal` success (`errIpma`, `errPexs`, case (2) afterwards,
  the deployed plugin still triggers, unsubscribe refunds 34,900).
- `smart_contracts/subscriptions/subscriptions-audit.e2e.spec.ts`: SG-05 now runs for both the legacy and the hinted
  path; SG-12 uses the hinted `newService` overload.

---

## 2026-10-04 — Social track: hinted AkitaSocial / AkitaSocialGraph + legacy shims, new social plugin version (§6.2, §6.3, §6.11)

### Interfaces other tracks must know

**AkitaSocial (`smart_contracts/social/contract.algo.ts`).** Every method in spec §6.2 exists twice. The hinted method keeps
the canonical name and appends `wallet: uint64` LAST; the shim is `legacyX` with `@abimethod({ name: 'x' })` and the old
signature. All 34 deployed AkitaSocial selectors (and all 15 AkitaSocialGraph selectors) are still routed
(`social/legacy-abi.test.ts` checks this against MainNet).

| Hinted (new selector) | Shim keeps |
|---|---|
| `post(pay,axfer,uint64,byte[24],byte[36],uint64,bool,uint64,uint64,uint64)void` | `post(…,uint64,uint64)void` (9 args) |
| `editPost(pay,axfer,byte[36],byte[32],uint64,uint64)void` | 5-arg form |
| `reply(…,uint64)void` (12 args), `gatedReply(…,uint64)void` (13 args) | 11 / 12 args |
| `editReply(…,uint64)void`, `gatedEditReply(…,uint64)void` | 5 / 6 args |
| `vote(pay,axfer,byte[],uint64,bool,uint64)void`, `editVote(pay,axfer,byte[32],bool,uint64)void` | 5 / 4 args |
| `react(pay,axfer,byte[],uint64,uint64,uint64)void`, `gatedReact(pay,axfer,appl,byte[],uint64,uint64,uint64)void` | 5 / 6 args |
| `initMeta(pay,address,bool,uint64,uint64,uint64,uint64)uint64` | 6 args |
| **new** `setMetaWallet(uint64)void` | — |

- Hinted methods: `p = principalOf(dao, wallet)` FIRST (strict: errHnwl / errHtop / errHnbd), referral to `p.referrer`
  (`sendReferralPaymentTo`), creator tips routed by `tipWallet(dao, creator, meta.wallet)`, gates asserted with
  `gateCheckCtx(gateTxn, dao, gateCtx(p), gateID)` (Q4), `initMeta` stores `p.wallet`. Social state stays keyed by
  `Txn.sender` (Q5); `initMeta` keeps `user === Txn.sender` (S-02).
- `setMetaWallet(wallet)`: strict `principalOf`, requires `meta(Txn.sender)` (`errNmta`), stores `p.wallet` (hint 0 unbinds).
- **AkitaSocialGraph:** hinted `gatedFollow(pay,appl,address,uint64)void` (ctx gate subject), shim `gatedFollow(pay,appl,address)void`
  (Gate.mustCheck on `Txn.sender`). No other graph method changed.
- **Social plugin new version** (`arc58/plugins/social/contract.algo.ts`): every existing method keeps its ABI; the only new
  method is `setMetaWallet(uint64,bool)void` → `AkitaSocial.setMetaWallet(windowHint(wallet))`. All 12 target calls pass
  `windowHint(wallet)` last; gate txns are `Gate.mustCheckFor(encodeArc4(gateCtx(pluginPrincipalOf(dao, wallet))), gateID, args)`;
  `referralQuote(wallet) = referralFeeTo(dao, quoteReferrerOf(dao, wallet.id), akta)`; `getCreatorDetails` uses `tipWallet`.
  No `getOriginAccount` / registry read is left in the plugin. Approval 8,030 B (fits 4 pages). **Deploy only after the
  AkitaSocial and AkitaSocialGraph upgrades** (it calls the hinted selectors). `scripts/deploy-social-plugin.ts` deploys it unchanged.
- **Typed clients:** overloads are suffixed (`postPayAxferUint64Byte_24Byte_36Uint64BoolUint64Uint64Uint64Void` hinted,
  `…Uint64Uint64Void` shim; `initMetaPayAddressBoolUint64Uint64Uint64Uint64Uint64` hinted; graph
  `gatedFollowPayApplAddressUint64Void` hinted / `gatedFollowPayApplAddressVoid` shim). There is no `client.send.post` any more.
- **SDK (`akita-sdk/src/social`):** every write wrapper takes `wallet?: bigint | number` (default `0n`, type
  `WalletHintArgs`) and always calls the hinted overload; new `setMetaWallet({ wallet })` and static
  `SocialSDK.directGateCtx(sender)`. **Breaking for direct gated callers:** `reply`/`react`/`follow` with `gateTxn`
  now need `Gate.mustCheckFor(ctx = (sender, 0, sender))` (build with `GateSDK.build.mustCheckFor`), not `mustCheck`.
  Unlike the Subscriptions SDK, a non-zero hint is NOT refused locally; the chain reverts with `errHtop` (the e2e uses that).
- **Deployed-bytecode fixtures (reusable by the P2-CMP-01 owner):** `smart_contracts/social/deployed/mainnet-abi.json`
  (MainNet selectors + approval sha256 of AkitaSocial 3569557130, AkitaSocialGraph 3569557033, social plugin 3643581007),
  `social/deployed/AkitaSocial.3569557130.program.json` (MainNet approval/clear/schema/pages),
  `arc58/plugins/social/deployed/AkitaSocialPlugin.v0.0.3.arc56.json` (= HEAD artifact = MainNet bytes) and
  `arc58/plugins/social/deployed/deploy.ts` (`deployDeployedSocialPlugin`, `deployDeployedAkitaSocial`,
  `deployedAkitaSocialProgram`; they strip the TEAL source so algokit uses the recorded bytes, and check sha256).

### Shim semantics re-derived from the deployed bytecode (§7.1, §7.2)

I fetched the three programs from MainNet algod and compared them with the committed artifacts: the approval programs of
AkitaSocial 3569557130, AkitaSocialGraph 3569557033 and the social plugin 3643581007 are **byte-identical to HEAD
`e7f174ee`** (AkitaSocial/Graph MainNet clear = `0x0b`, as the update track found). So HEAD source = deployed semantics.
The deployed plugin (HEAD) quotes these payments locally, and the HEAD contract accepted them only in these cases:

| Flow (deployed plugin) | Deployed quote | Working-tree hinted charge | Shim accepts |
|---|---|---|---|
| post | `46,500 + 400·len(cid) + votes + votelist` (+ registry referral MBR, which the deployed plugin never quotes: referred senders revert today) | MinPostsMBR 47,300 | the deployed quote (+ registry referral MBR, unchanged) |
| reply / gatedReply | as post, no parent-ref term | `+ ReplyParentRefMBR 12,800` | the deployed quote |
| vote materializing a ref | `votelist + 46,500` | `+ 47,300 + VotesMBR 19,300` | the deployed quote |
| up-vote / react tip referral MBR | not quoted (deployed app paid it) | charged | absorbed by the app (deployed behaviour) |
| react record | `18,900` (old 16-byte list MBR) | `ReactionRecordMBR 15,700` | 18,900 (the app keeps 3,200) |
| tip route | raw `meta(creator).wallet` (`checkTipMbrRequirements`) | `tipWallet(...)` | raw `meta.wallet` (`tipCreator(…, legacy=true)`) |
| referral | registry referrer of `Txn.sender` | `p.referrer` | registry, resolved lazily at the same sites |
| gate subject | `Txn.sender` (`gateCheck`) | verified ctx | `Txn.sender` |
| initMeta | meta + ImpactMeta; registry wallet | stores `p.wallet` | registry wallet |

### Deviations / findings

1. **Shim payment terms reproduce the deployed plugin's quote, not the working-tree MBR corrections** (decision taken under
   §7.2, flag for Kyle). The ride-along audit fixes changed MinPostsMBR (46,500 → 47,300), the reaction record MBR, and added
   the reply parent-ref and never-voted votes-box charges. Without legacy terms, every post, reply, react and ref-materializing
   vote from the deployed social plugin reverts after the upgrade. The shims therefore re-open the deployed under-charges, and
   only on the old selectors: 800 µA per posts box, 12,800 per reply, 19,300 per materialized vote and the up-vote/react
   referral disbursement MBR. Anyone can call the shims directly, so this is a bounded MBR drain (paid in AKTA fees per call)
   for the compatibility window. It ends with the shims in Phase 4. Mitigation until then: watch AkitaSocial's free balance and top it up.
   Constants: `social/constants.ts` `LegacyMinPostsMBR` (appended at the end of the file).
2. Legacy referral = `referrerOrZeroAddress(legacyWalletOf(dao, Txn.sender))` passed to `sendReferralPaymentTo` (same
   economics as `legacySendReferralPayment`). A legacy reply to a zero-creator ref charges no referral MBR. HEAD charged it, and
   the deployed plugin never quoted it, so that path reverted for referred senders. It now passes.
3. **Deployed edit flows stay broken.** The deployed plugin's `editPost`/`editReply`/`gatedEditReply` under-quote
   EditBackRefMBR (and editReply read the wrong parent slice). They reverted on MainNet too, so the shims keep that.
4. **P2-SOC-01 as worded cannot be built with an honest wallet.** An honest wallet never releases an escrow or arbitrary-address
   account it owns at rest. When it loses its own address (`arc58_rekeyTo`), C is not live either, and then the legacy
   ARC-58 route already reverts. The divergence the spec guards (raw `meta.wallet` vs `tipWallet` with C live) only exists
   transiently inside the creator's own window (E23). The tests therefore cover: (a) the deployed plugin's raw ARC-58 opt-in
   route on a creator that is not opted in passes through the shim with the exact quote, and (b) the hinted route tips a
   creator whose meta wallet lost it at rest directly, while the legacy route reverts.
5. `setMetaWallet` accepts hint 0 (unbinds). Through the plugin the hint is always `windowHint(wallet)`.
6. AkitaSocial approval is **10,740 B** (single-file `build-contracts.mjs` build; compare like with like), so the upgrade needs
   5 extra pages (MainNet has 3). AkitaSocialGraph is 2,454 B (fits its 3 extra pages).
7. **Cross-track finding (update track):** a single-file puya-ts compile of `arc58/plugins/update-akita-dao/contract.algo.ts`
   fails with the invariant "Contract reference must resolve to a contract class" at the class declarations of BOTH
   `Subscriptions` and `AkitaSocial` (both `classes(…, Akita*FeeGenerator*)`). It reproduces in a scratch copy with the
   `@contract` decorators removed and with the plugin's `type` import of `AkitaBaseFeeGeneratorContract` made a value
   import. Other single-file compiles that reach `social/contract.algo.ts` through `utils/functions.ts` → `social/impact.algo.ts`
   compile fine (optin plugin, impact, account factory). So this is not a social-source error, but I cannot rule out that the
   new code makes it worse. The update-plugin artifact was not rebuilt.

### Requests to other tracks

- **wallet/plugins/social.ts (plugin SDK owner):** add a `setMetaWallet({ rekeyBack? })` wrapper for
  `setMetaWallet(uint64,bool)void`, built like `unfollow`. The social tests use an inline `PluginSDKReturn` until then.
- **tests/fixtures/social.ts:** AkitaSocial is now 10.7 KB. If LocalNet rejects its create for fee, raise the `extraFee`
  (today 1,000), which covered 8.3 KB. Not verified (LocalNet down).
- **Update/rollout track:** the AkitaSocial plan now grows 3 → 5 extra pages (your `rollout.test.ts` still passes with the
  new artifact). Method-restricted social grants need `--add-method socialPlugin:setMetaWallet`.

### Tests

- `smart_contracts/social/legacy-abi.test.ts` (unit, 11, **ran: 11/11**). It checks: every MainNet selector of AkitaSocial and
  AkitaSocialGraph is still routed; each hinted method = shim + trailing `wallet: uint64`; AkitaSocial added only the hinted
  overloads and `setMetaWallet(uint64)void`; the typed clients expose both overloads and no shared `post`; the size fits 8
  pages; the deployed plugin fixture equals MainNet; the new plugin ABI = deployed ABI + `setMetaWallet(uint64,bool)void`
  and fits 4 pages; the legacy constants.
- `akita-sdk/src/social/index.test.ts` (unit, 29, **ran: 29/29**; full SDK suite 374/374). It checks P2-ABI-01 for the
  SDK: every wrapper (post, editPost, reply, gated reply, vote, invertVote, deleteVote, react, gated react, initMeta,
  gated follow, setMetaWallet) calls the hinted overload with `wallet` 0n by default, forwards an explicit hint, and never
  calls a shim. It also covers `directGateCtx`.
- `smart_contracts/social/principal.e2e.spec.ts` (LocalNet, **not run**). Covers: errHnwl on non-wallet hints (nothing
  applied); errHtop for a genuine hint at top level (post, setMetaWallet, initMeta); `initMeta` hint 0 stores 0;
  `setMetaWallet` errNmta and unbind; the legacy `initMeta` shim; exact legacy-vs-hinted payment terms for post, reply,
  ref-materializing vote and react, with exact free-balance differences (800 / 13,600 / 20,100 / −3,200); a hint-0 post pays
  no referral. Graph `gatedFollow`: hinted with `mustCheckFor(ctx)` passes; P2-GATE-03 (graph): a legacy `mustCheck` txn or a
  foreign ctx is rejected (`errFgte`); the shim still accepts `mustCheck` on `Txn.sender` and rejects `mustCheckFor`.
- `smart_contracts/arc58/plugins/social/principal.e2e.spec.ts` (LocalNet, **not run**; all wallets unregistered, each test
  ends with `assertUnregistered`). Covers:
  - `initMeta` stores the verified wallet for default, escrow and external-C windows.
  - Registry-free referral: default and escrow windows, with the post keyed by the escrow (Q5). Exact plugin quotes for
    reply and up-vote.
  - **P2-SOC-03**: the deployed plugin's legacy `initMeta` stores 0 (registry miss), then the new plugin's `setMetaWallet`
    rebinds the meta to W.
  - **P2-GATE-02**: Wx default window passes a referrer gate through `ctx.wallet`; a wallet with another referrer fails `errFgte`.
  - **P2-GATE-01**: a subscription held by an account Wd owns at rest passes inside Wd's own default window; another
    wallet fails.
  - **P2-SOC-04 (E28)**: escrow-window activity does not satisfy a social-activity gate until the principal itself is active.
  - §6.2 tip route: a stale meta (W.address rekeyed away) is tipped directly by the hinted method, and the legacy route reverts.
- `smart_contracts/arc58/plugins/social/deployed-compat.e2e.spec.ts` (LocalNet, **not run**). Runs the deployed plugin
  bytes against the upgraded targets.
  - **P2-SOC-01**: initMeta (registry wallet), post, reply, up-vote, react, a ref-materializing vote, the ARC-58 opt-in tip
    route on the raw `meta.wallet`, and follow and gatedFollow through the shims.
  - **P2-SOC-02**: the update plugin upgrades the deployed AkitaSocial program from its MainNet bytes. Checks: pages 3 → 5,
    schema 8/56 kept, approval equals the artifact, the creator is released from 3 extra pages + 8 uints + 56 byte slices,
    and the new code runs (`setMetaWallet` returns `errNmta`, version = 'principal').
- `smart_contracts/social/social.e2e.spec.ts`: the stale "under 8192 bytes" test is renamed. All its SDK calls now go
  through the hinted overloads with wallet 0. Behaviour for plain accounts is unchanged.

### Status / pending

- **LocalNet down** (`localhost:4001/health` returned nothing at 15:4x and 16:2x). I did not start, restart or reset it.
  Not run: the three new e2e specs above, `social/social.e2e.spec.ts`, `arc58/plugins/social/social.e2e.spec.ts`,
  `gates/subscription-gates.e2e.spec.ts` (uses `SocialSDK.initMeta`), `arc58/plugins/plugin-sdk-hooks.e2e.spec.ts`,
  `utils/principal.e2e.spec.ts`, `utils/origin-spoofing.e2e.spec.ts` and the full `npm test` (baseline 1,780 / 0). Run with
  `with-localnet-lock.sh social npx vitest run smart_contracts/social smart_contracts/arc58/plugins/social`.
- Built one at a time with `build-contracts.mjs`: `social/contract.algo.ts`, `social/graph.algo.ts`,
  `arc58/plugins/social/contract.algo.ts` (clients regenerated). The SDK was rebuilt: `tsup` succeeded. The `tsc` declaration
  step exits 2 only because of other tracks' in-progress files (auction, raffle, subscriptions); declarations are emitted
  (301 `.d.ts` files, `dist/social` has `setMetaWallet`/`directGateCtx`). `tsc --noEmit` (akita-sc) reports no error in any
  social file.

---

## 2026-10-04 — Wallet track: review fixes (registry-write gating, legacy-registry spec opt-ins, Q2 flag)

All four review findings were verified as real and fixed. LocalNet was still down (`localhost:4001/health` returned
nothing at 16:2x and 16:3x), so **the wallet track stays NOT DONE** until the e2e list below passes under
`with-localnet-lock.sh`.

### Interface change other tracks must know (supersedes the "SDK registry writes stop" bullet of the wallet-track notice)

- **Registry writes now stop per network, not unconditionally.** New in `akita-sdk/src/networks.ts` (re-exported from
  `config.ts` and the package root): `REGISTRY_WRITES_STOPPED: Record<AkitaNetwork, boolean>` = `{ localnet: true,
  testnet: false, mainnet: false }`, `registryWritesStopped(network)`, `shouldWriteRegistry(network, explicit?)`
  (`explicit ?? !registryWritesStopped(network)`).
- `newWallet({ register })`, `WalletSDK.addPlugin({ registerEscrow })` and `WalletGroupComposer.addPlugin({ registerEscrow })`
  no longer default to `false`: an omitted flag means `shouldWriteRegistry(sdk.network, undefined)`. So:
  - **LocalNet (all e2e tests): unchanged from the wallet-track notice** — no registry write unless `register: true` /
    `registerEscrow: true`.
  - **TestNet/MainNet: the SDK keeps writing the registry by default** (pre-track behaviour) until Phase 3 has executed.
- **Rollout coupling (spec §7.1 note added):** the release that records the executed Phase 3 proposal on a network must
  flip `REGISTRY_WRITES_STOPPED[network]` to `true` (update-plugin / rollout track: add this to the Phase 3 checklist).
- Caveat (pre-existing SDK behaviour): `resolveAppIdWithClient` pins the first detected network module-wide
  (`setCurrentNetwork`), and `detectNetworkFromClient` prefers that pin over env/URL. A process that first builds an SDK
  against one network keeps that network for the switch too. Unit tests set it explicitly.

### Spec files changed (outside the wallet track; each is a one-line `register: true` opt-in, no assertion changed)

Specs that assume `newWallet` registers — complete list after a grep of every `*.e2e.spec.ts` that creates wallets
through `newWallet`/`addPlugin` and mentions registered/legacy/registry/EscrowFactory reads (28 files audited):

| Spec | Wallet | Why it needs the registry | Status |
|---|---|---|---|
| `utils/origin-spoofing.e2e.spec.ts` | `wallet` ('genuine') | `fake.probe` → `legacyWalletOf` → `EscrowFactory.get` must return the wallet (binding invariant ACC-01/SG-04) | **fixed here** |
| `subscriptions/compat.e2e.spec.ts` | `Wr` | legacy `newServiceCost/newService` shims pay the registry referrer R1 | **fixed here** |
| `arc58/plugins/social/deployed-compat.e2e.spec.ts` | `legacyWallet()` (W, Wc) | legacy `initMeta` stores the registry wallet (`meta.wallet == W.appId`) | **fixed here** |
| `marketplace/compat.e2e.spec.ts` | `newFundedWallet(..., registered = true)` | legacy shims read the registry referrer | **fixed here** |
| `marketplace/principal.e2e.spec.ts` | `Wr` | M-02 / M-05 compare against the registry referrer | **fixed here** |
| `gates/ctx-sub-gates.e2e.spec.ts` | `Wr` | legacy AkitaReferrerGate `check` → `EscrowFactory.mustGet(caller)` | **fixed here** |
| `utils/referral-to.e2e.spec.ts` | `wallet` ('referred') | R01/R03 legacy twins find the payer through the registry | **fixed here** |
| `auction/principal`, `raffle/principal`, `staking-pool/principal` | `register: true` / explicit `registerEscrow: true` already | — | already opted in |
| `arc58/account/factory`, `arc58/account/reclaim` | explicit `register: true` / `registerEscrow: true` where registration is asserted | — | already opted in |
| `subscriptions/principal`, `arc58/plugins/welcome`, `nfd/*`, `gates/contract`, `akita-router`, `meta*`, `update-akita-dao`, `hyper-swap`, plugin `marketplace`/`gate`/`dual-stake`/`poll`, `abstract_account_plugins`, guild `audit-remediation` | — | false positives ("registry" = NFD/venue/gate/Meta registries, or unregistered wallets on purpose) | no change |

`escrow/escrow.e2e.spec.ts` uses the DAO wallet, which `tests/fixtures/dao.ts` registers explicitly. Owners of the above
specs: the opt-in lines carry a comment; keep them when editing.

### Q2 flag (Phase 0 suite)

`utils/principal.e2e.spec.ts:57` is now `const Q2_WALLET_FIX_LANDED = true` (header comment updated). T25 now expects
both constructions to fail with `errMissingRekeyBack` (`errNrkb`), matching `AbstractedAccount.assertValidGroup`
(only `isVerifyAuthCall` closes a window) and `assertRekeysBack` (shortcut, or verifyAuthAddress while
`spending == controlled`). T13/T44 are unchanged. Spec §5.4 acceptance item 2 is met only once T13/T25/T44 pass on LocalNet.

### Tests

- `akita-sdk/src/wallet/principal-phase3.test.ts`: +7 unit tests (16 total): switch table; `shouldWriteRegistry` explicit
  flag wins on every network; switch honoured both ways (stopped / not stopped); `newWallet` registers by default on
  mainnet and testnet; `newWallet({ register: false })` skips on mainnet and testnet; LocalNet default test now pins the
  network explicitly.
- Ran: akita-sdk `npm run build` OK; akita-sdk `vitest run` **404/404**; akita-sdk `tsc --noEmit -p tsconfig.esm.json` clean;
  akita-sc `tsc --noEmit -p .` 10 errors, all pre-existing, none in a touched file; akita-sc non-e2e unit tests 125/126 —
  the 1 failure is `plugin-dex/principal-abi.test.ts` ("router forwards windowHint(wallet) ... invariant 6"), a static
  source-regex check of the PluginDex router owned by another track, unrelated to this change.

### Pending (LocalNet down; must pass under with-localnet-lock.sh before the wallet track is called done)

`arc58/account/{rekeying,factory,reclaim,admin,contract,account-fixes,plugin-version,agent-delegation,
hosted-agent-identity-payment,backend-hosted-agent-identity-payment,balance-reader}.e2e.spec.ts`,
`arc58/plugins/welcome/welcome.e2e.spec.ts`, `utils/principal.e2e.spec.ts` (T13/T25/T44 with the flag true),
`utils/origin-spoofing.e2e.spec.ts`, `subscriptions/compat.e2e.spec.ts`, `arc58/plugins/social/deployed-compat.e2e.spec.ts`,
`marketplace/{compat,principal}.e2e.spec.ts`, `gates/ctx-sub-gates.e2e.spec.ts`, `utils/referral-to.e2e.spec.ts`,
`escrow/escrow.e2e.spec.ts`, and the full `npm test` (baseline 1,780 passed / 0 failed).

---

## 2026-10-04 — plugin-dex track: PluginDex, GatedFeeHook and AkitaRouterPlugin adopt hints (§6.11, §6.12)

PluginDex is undeployed, so this is a day-one adoption: no legacy shims, no registry reads, no old selectors.

### Interfaces other tracks must know

- **PluginDex (Vault) ABI.** `swap`, `swapRoute`, `quote`, `quoteRoute`, `tryQuoteRoute` gain a trailing
  `wallet: uint64` (0 = acting as itself):
  `swap(txn,uint64,uint64,address,byte[],uint64)uint64`, `swapRoute(txn,uint64[],uint64,address,byte[],uint64)uint64`,
  `quote(uint64,uint64,uint64,address,byte[],uint64)uint64`, `quoteRoute(uint64[],uint64,uint64,address,byte[],uint64)uint64`,
  `tryQuoteRoute(uint64[],uint64,uint64,address,byte[],uint64)uint64`. The Vault stays DAO-agnostic: it copies the
  value into `HookContext.wallet` unverified. Liquidity, initialize and poke points get `wallet = 0`.
- **`HookContext` (frozen layout amended before deployment).** New field `wallet: uint64` immediately after
  `callerApp` (spec §6.12). The `akitaDexHook` selector changed, so every hook and hook mock was recompiled.
  Any third-party hook must be rebuilt against `plugin-dex/types.ts`.
- **GatedFeeHook passes are keyed by principal.** New ABI:
  `openPass(pay,address,uint64,byte[][][],uint64)` = `(mbr, key, measure, gateArgs, wallet)`;
  `refresh(key, measure, gateArgs, wallet)`; `refreshFromGate(appl, key, slot, wallet)`; `closePass(key, wallet)`;
  readonly `getPass(key)`, `previewFee(poolId, key, feeBps)`, `getDiscountedSwapsToday(key)`.
  - `openPass` / `refreshFromGate`: `key` must equal the caller's own `principalOf(F, wallet).principal`
    (errGfau). The MBR payment may come from anyone (the funder).
  - `refresh` / `closePass` of a live pass: `Txn.sender == key`, the funder, or `principalOf(F, wallet).principal == key`.
  - `refreshFromGate` asserts `gateCheckCtx(gateTxn, dao, gateCtx(p), slot)`, i.e. the gate txn is
    `Gate.mustCheckFor(gateCtx(p), id, args)` (no longer `Gate.mustCheck(origin, ...)`).
  - Gate bits in `openPass` / `refresh` are measured with an inner `Gate.checkFor(ctx, id, args)`: `ctx` is the
    caller's verified context when the caller is the key's principal, else the subject-only `(key, 0, key)`.
  - Hot path: `ctx.wallet == 0` ⇒ key = `ctx.caller` (no DAO read). BeforeSwap ⇒
    `resolvePrincipalFromDexCtx(F, ctx.wallet, ctx.caller, ctx.callerApp).principal` (strict: an invalid hint
    reverts the swap with errHnwl / errHtop / errHnbd / errIwlt). Quote ⇒ `thirdPartyPrincipal(F, swapper, wallet)`.
    `F = AkitaAppList(hook.akita_dao).wallet` (the hook's pinned DAO). Resources with a hint: P(DAO), P(W),
    A(W.address) or A(C).
  - `hooks/shared/origin.ts` is deleted.
- **AkitaRouterPlugin (undeployed).** ABI unchanged. Every native `swapRoute` and `tryQuoteRoute` it issues
  passes `windowHint(wallet)` as the hint. The `spender != legEscrow` custody guard is unchanged.
- **LaunchManager.** The dev buy calls `PluginDex.swap(..., wallet = 0)`.
- **A wallet user needs a plugin to manage a pass.** An ARC-58 wallet's principal is never `Txn.sender` of a
  top-level call, so it can open, refresh or close its pass only from inside its own window, through a plugin
  that forwards `windowHint(wallet)`. This track adds only a TEST-ONLY one (`MockGatedFeePlugin`). Shipping a
  production pass plugin (or folding these methods into a DEX plugin) is an open product item before PluginDex
  launches with GatedFeeHook (Phase 3).

### Deviations from the spec

1. **Gate measurement uses `Gate.checkFor(ctx)`** in `openPass` / `refresh` (spec §6.12 only names
   `refreshFromGate`). Reason: Q4 (principal gate subject via ctx). Context-aware sub-gates then see the
   owner's verified context (a subscription held by one of the owner's escrows counts). For a funder or a
   third party re-measuring an expired pass, the context is `(key, 0, key)`, which equals the old plain check.
2. **Hint 0 needs no DAO read.** `openPass`/`refresh`/`closePass`/`refreshFromGate` resolve with
   `resolvePrincipal(wallet == 0 ? 0 : AkitaAppList(dao).wallet, wallet)`. Same result as `principalOf(dao, wallet)`;
   it only avoids P(DAO) for EOAs (and keeps hooks whose DAO is a test stand-in working).
3. **An invalid hint always reverts on the write paths**, also where it is not needed (e.g. the funder refreshing
   with a bad hint), so every supplied hint is verified uniformly.
4. **Quote inside an escrow window can understate the discount (accepted, documented).** The router quotes with
   `swapper = S`. Inside the window S is rekeyed to the router, so `thirdPartyPrincipal` returns S (E23): in an
   escrow window the quote prices the escrow (usually no pass) while BeforeSwap prices the principal C. The
   quote can understate, never overstate, the swap's discount, unless the escrow itself holds a pass (only
   reachable with a hint-0 action from that escrow window). Default grants (S == C) and client quotes made
   outside the window (`swapper = S or C`, `wallet = W`) match the swap exactly.
5. **`previewFee`, `getPass` and `getDiscountedSwapsToday` take the pass key (a principal), not a hint.** Use
   `quote(..., swapper, data, wallet)` for a hint-aware preview.
6. **Track-exclusive files outside the owned directories.** I did not edit any shared fixture. `tests/fixtures/plugin-dex.ts`
   and `tests/fixtures/plugins/akita-router.ts` needed no change (they never pass swap/quote args).
7. **MockWallet / MockWalletFactory (plugin-dex/tests)** no longer register in the EscrowFactory and lost their
   `escrowFactory` argument and global (spec: "drop register"). Hinted cases run against real, never-registered
   AbstractedAccount wallets (`tests/fixtures/unregistered-wallet.ts`).
8. **New test-only mocks (owned dir):** `plugin-dex/tests/mock-gated-fee-plugin.algo.ts` (`MockGatedFeePlugin`:
   pass management from a window, plus `quoteAs` = "app X" of P2-DEX-03) and
   `plugin-dex/tests/mock-mirror-dao.algo.ts` (`MockMirrorDAO`: mirrors a real DAO's `aal`/`sal`/`akita_assets`
   but names the real AbstractedAccountFactory as `AkitaAppList.wallet` and a test-signable DAO wallet; a real
   DAO cannot have both because `AkitaDAO.setup` creates its wallet through `AkitaAppList.wallet`).
   `RouterRecordingHook` also records `ctx.wallet` (`swap_wallet`, `quote_wallet`).

### Builds

Built one file at a time with `scripts/build-contracts.mjs` (single-file mode): `plugin-dex/contract.algo.ts`, the
eight hooks, `launch/launch-manager.algo.ts`, the test hooks and mocks that carry `HookContext`
(`mock-dex-hook`, `mock-updatable-hook`, `mock-venue-adapter` (RouterRecordingHook), `recording-dex-hook`,
`curves/bins/tests/bins-trade-hook`), `mock-wallet`, `mock-wallet-factory`, the two new mocks and
`arc58/plugins/akita-router/contract.algo.ts`. Approval sizes: PluginDex 14,092 B (limit 15,000), GatedFeeHook
4,089 B, AkitaRouterPlugin 3,828 B, LaunchManager 3,769 B. I did **not** rebuild `MockCurve`/`MockCurveV2`,
`BinEngine`, the venues or the other mocks: a scratch compile showed their bytecode unchanged by this track
(MockCurve only differs in single-file vs whole-tree subroutine order, Phase 1 finding 1). `akita-sdk` rebuilt.

### Tests

- New static gate `smart_contracts/plugin-dex/principal-abi.test.ts` (7, no LocalNet): hinted Vault selectors,
  `HookContext.wallet` after `callerApp` in every hook artifact (one shared `akitaDexHook` selector), GatedFeeHook
  pass ABI, the BeforeSwap/Quote resolver split, no registry helper anywhere in plugin-dex or the router,
  `windowHint` on all three router→Vault calls, LaunchManager `wallet = 0`.
- e2e (written, not run: LocalNet down): `hooks/gated-fee.e2e.spec.ts` rewritten (T-1..T-17 keyed by principal;
  T-7 refreshFromGate via `mustCheckFor` incl. wrong principal/spender/wallet and the legacy `mustCheck`;
  **P2-DEX-01** EOA and window; new T-8/T-9 hint revert and hinted-quote cases replacing the registry cases;
  new describe "principal resolution (§6.12)" with `MockMirrorDAO`, never-registered wallets Wx (external C) and
  Wd (default), **P2-DEX-02** (open in the default window, refresh and refreshFromGate in the escrow window,
  close back to the funder, stranger/admin rejected), BeforeSwap through the router from default and escrow
  windows with `quote(swapper, W) == swap` and one shared daily count, **P2-DEX-03** + ACC-01 (forged wallet
  with spending = controlled = victim, quotes from app X and top level, swappers Wf.address / account rekeyed
  to Wf / random) ; `launch/launch-hooks.e2e.spec.ts` **P2-DEX-04** (the dev-buy inner `swap` carries
  `wallet = 0`, sent as the LaunchManager, on a gated pool); `core-v2.e2e.spec.ts` (`ctx.wallet` at Quote,
  BeforeSwap (unverified 4,242), AfterInitialize = 0, ABI echo); `akita-router.e2e.spec.ts` (A2 `swap_wallet`,
  new A5 swapBest `quote_wallet`/`swap_wallet` == wallet id, H1 pass opened through the window);
  every other plugin-dex spec passes `wallet: 0n`.

### Status / pending

- LocalNet down (`localhost:4001/health` timed out at 16:36). Not run: every plugin-dex e2e spec
  (`plugin-dex.e2e`, `core-v2.e2e`, `curve-slot.e2e`, `external.e2e`, `launch.e2e`, `vault-guard.e2e`,
  `hooks/{gated-fee,backrun-arb,consensus-keyreg,volatility-fee,legacy-hooks}.e2e`, `launch/launch-hooks.e2e`,
  `curves/bins/bins.e2e`, `venues/tinyman-v2.e2e`), `arc58/plugins/akita-router/akita-router.e2e.spec.ts`, and
  the full `npm test`. Router G1/G2 budget figures may shift slightly (one more 8-byte argument per Vault call).
- Ran: akita-sc unit tests 54/54 (incl. the new static gate and `plugin-dex/size`), akita-sdk `vitest run`
  404/404; `tsc --noEmit` reports no error in any file this track touched (the one plugin-dex error,
  `launch-hooks.e2e.spec.ts:1112` `valueRaw`, is pre-existing).
- Open: a production GatedFeeHook pass plugin for ARC-58 wallet users (see above); a hook bound to a DAO whose
  `AkitaAppList.wallet` is not the wallets' factory reverts every hinted router swap through it (errHnwl), by design.

---

## 2026-10-04 — Staking-pool track: hinted StakingPool/StakingPoolFactory + legacy shims, stored pair 'i', Q14 MBR, `pv` marker, new plugin version (§6.5, §6.11)

### Interfaces other tracks must know

**StakingPool child (new children only; live pools are not upgraded, Q8).** Marker: global uint `pv` = 1
(`PoolGlobalStateKeyPrincipalVersion`, set in `create`; +28,500 µA through the child schema, now 13 uints / 10 bytes).
Approval 12,508 B (4 chunks; the update-plugin track's atomic factory+child group still fits at 16 txns).

| ARC-4 signature | TS name | Semantics |
|---|---|---|
| `gatedEnter(pay,appl,(uint64,uint64,byte[32][])[],uint64)void` | `hintedGatedEnter` | `p = principalOf(dao, wallet)`; gate txn must be `Gate.mustCheckFor(gateCtx(p), gateID, args)` (`gateCheckCtx`); stores `'i'` = `(p.wallet, p.principal)` when `wallet != 0`; exact Q14 charge |
| `gatedEnter(pay,appl,(uint64,uint64,byte[32][])[])void` | `gatedEnter` (legacy shim) | registry subject `legacyOriginOrTxnSender(legacyWalletOf(S))` + `Gate.mustCheck`; stores `'i'` = `(W, origin)` when the registry names a genuine `W` and the caller paid it; flat pre-Q14 charge |
| `enterCost(address,(…)[],byte[][],uint64)uint64` (ro) | `hintedEnterCost` | exact Q14 charge for `args`; +31,700 when the pool is gated, `wallet != 0` and the address has no pair. Ungated pools ignore `args`/`wallet` |
| `enterCost(address,(…)[])uint64` (ro) | `enterCost` (legacy shim) | gated: flat charge + 31,700 when the registry names a genuine wallet and no pair exists (one EscrowFactory inner call); ungated: the exact charge |
| `enter(pay,(…)[])void` | unchanged | accepts the exact charge, or the flat charge older plugins hard-code (entry flagged `legacyCharged`) |
| `gateCheck(address,uint64)void` | unchanged ABI | `Gate.checkFor(ctx, gateID, storedArgs)` with `ctx = (atRestPrincipalOf(addr, i.wallet, i.principal), ownsAtRestOf(i.wallet, addr) ? i.wallet : 0, addr)`, or `(addr, 0, addr)` without a pair. No wallet global is read |
| `getStoredPrincipal(address)(uint64,address)` (ro, new) | | the pair, or `(0, address)` |
| `mbr(uint64)` (BaseStakingPool, also factory/plugin) | | now returns `entries = 27,300` (exact, no gate args) and `entriesByAddress = 22,100` |

- Boxes: `'i'` = `BoxMap<Account, { wallet: uint64, principal: Account }>` (31,700 µA), deleted and refunded with the
  entrant's last `uniques` in `removeEntry`. `EntryData` gains `legacyCharged: bool`, which ARC-4 packs into the
  `disqualified` byte (bit 1 of byte 50): box size, MBR and every older decoder are unchanged.
- Q14 charges (each refunded exactly by `removeEntry`): exact = `entries` 2,500 + 400·(60 + encodedLen(gateArgs)) and
  `entriesByAddress` 22,100; flat = 25,300 + 25,300 (legacy shim and hard-coded `enter` payments).
- **Phase ordering:** `gateCheck` on new children calls `Gate.checkFor`, so `AkitaAppList.gate` must be Gate v2 before
  the new child bytecode is pushed (same Phase 2 proposal set).

**StakingPoolFactory.** `newPool(pay,…,uint64,uint64,uint64)uint64` (TS `newPool`, hinted: referral to
`principalOf(dao, wallet).referrer` through `sendReferralPaymentTo`), legacy `newPool(pay,string,uint8,address,(address,string),uint64,bool,uint64,uint64)uint64`
(TS `legacyNewPool`, registry referral, creates a current `pv` child), `newPoolCost(uint64)uint64` (TS `hintedNewPoolCost`,
`referralFeeTo(dao, quoteReferrerOf(dao, wallet), 0)`), legacy `newPoolCost()uint64` (TS `legacyNewPoolCost`).
`poolRoyalty` (impact) and the pool `creator` stay `Txn.sender`.

**StakingPoolPlugin (new version, ABI byte-for-byte the deployed one: same 8 selectors, same constructor).** `newPool`
quotes `newPoolCost(windowHint(wallet))` and calls the hinted `newPool(…, windowHint(wallet))`. `enter` reads `pv`:
hinted children get `enterCost(sender, entries, args, windowHint(wallet))`, `Gate.mustCheckFor(gateCtx(pluginPrincipalOf(dao, wallet)), …)`
and the hinted `gatedEnter`; children without `pv` get the deployed ABI (`enterCost(address,(…)[])`, `Gate.mustCheck(subject)`,
legacy `gatedEnter`) with the subject re-derived from the deployed child bytecode (see deviation 6).

**SDK (`akita-sdk/src/staking-pool`).** `StakingPoolSDK.isHintedPool()` (reads `pv`, cached), `getStoredPrincipal({ address })`,
`enterCost({ address, assets, args?, wallet?, legacy? })`, `enter({ …, gateTxn?, wallet? })` (a `mustCheckFor` gate txn
selects the hinted `gatedEnter` and prices its args; a `mustCheck` gate txn selects the legacy shim; a `mustCheckFor` txn
on a pre-`pv` child throws before sending). `StakingPoolFactorySDK.new({ …, wallet? })` and `cost({ wallet? })` use the
hinted selectors. Exports `STAKING_POOL_*` signatures and MBR constants, `encodedGateArgsLength`, `stakingPoolEntryMbr`.
Generated overload names: `gatedEnterPayApplUint64Uint64Byte_32Uint64Void` / `…Byte_32Void`,
`enterCostAddressUint64Uint64Byte_32ByteUint64Uint64` / `…Byte_32Uint64`,
`newPoolPayStringUint8AddressAddressStringUint64BoolUint64Uint64Uint64Uint64` / `…Uint64Uint64Uint64`,
`newPoolCostUint64Uint64` / `newPoolCostUint64`.

**Deployed-program snapshots** (read-only MainNet algod, 2026-10-04): `smart_contracts/staking-pool/compat/mainnet-programs.ts`
holds the July-2026 plugin 3642438287, the May-2026 plugin 3569562283 and the child program in factory 3569556570's
`bc` box (with sha256). Other tracks may import them.

### Facts re-derived from the deployed bytecode (§7.1)

1. Plugin 3642438287 (July 2026, the latest generation): quotes `enterCost(address,(…)[])` and `newPoolCost()`, gates on the
   RAW `controlled_address` via `Gate.mustCheck`, calls legacy `gatedEnter`/`enter`/`newPool`.
2. Plugin 3569562283 (May 2026, same factory 3569556570): never quotes. `enter`/`gatedEnter` pay a hard-coded
   50,600 µA per entry plus 18,900 when `isEntered` is false; `newPool` pays a hard-coded `creationFee + 1,327,500 + MinBalance`.
3. Plugin 3368400148 (December 2025) is bound to the December factory 3368391029, which Phase 2 does not touch.
4. The deployed child resolves its gate subject as the registry wallet's RAW `controlled_address` (no creator check, no
   liveness check) or `Txn.sender`; it has no `gateCheck`/`removeEntry`. Its schema is 12 uints / 10 bytes, 3 extra pages.

### Deviations from the spec

1. **Hinted `enterCost` takes the gate args:** `enterCost(address,(…)[],byte[][],uint64)uint64` (spec: `(address,(…)[],uint64)`).
   The exact Q14 `entries` charge depends on the encoded gate args, so a quote without them cannot equal the charge.
2. **TS names in the child:** the legacy shim keeps the TS name `gatedEnter` and the hinted method is `hintedGatedEnter`
   (`@abimethod({ name: 'gatedEnter' })`), likewise `enterCost`/`hintedEnterCost`. `mocks/fake-wallet` binds
   `abiCall<typeof StakingPool.prototype.gatedEnter>` with the legacy arguments; renaming per §7.2 would break the
   whole-tree build for a file this track does not own. ARC-4 names and selectors are exactly as specified. The factory
   follows §7.2 (`newPool` hinted, `legacyNewPool`), with `hintedNewPoolCost`/`legacyNewPoolCost`.
3. **Q14 applies where the payer can price the args.** The legacy shim keeps the flat pre-Q14 charge, because the deployed
   plugin quotes before it builds the gate txn. Such entries are flagged `legacyCharged` (packed bool, no size change) and
   refunded flat, so every entry is refunded exactly what it paid. A legacy gated entry with long gate args therefore still
   borrows the shortfall from the pool's free ALGO while it exists (pre-existing behaviour, legacy path only).
4. **`enter` accepts two prices:** the exact charge or the flat charge (May-2026 plugin, fact 2). They always differ by
   1,200 µA per entry, so the payment identifies the formula; anything else is `errIpay`. The legacy `enterCost` of an
   ungated pool returns the exact charge (the July plugin pays what it quotes).
5. **The legacy `gatedEnter` shim accepts the payment with or without the pair** when one is due: with it (July plugin, which
   pays the quote) it stores `'i'`; without it (May plugin, flat only) it stores no pair, so May-plugin escrow/external-C
   entries keep the R11 exposure (a third party could disqualify them). The alternative was reverting every May-plugin
   gated entry from a registered wallet.
6. **New plugin, legacy child subject:** spec §6.11 says `legacyOriginOr(legacyWalletOf(S), S)`. Re-derived from the deployed
   child (fact 4) it is the raw `controlled_address` of the registry wallet, else `S` (`legacyChildGateSubject`). With
   `legacyOriginOr`, a registered wallet whose controlled account is not live would present `S` while the old child asserts
   the raw origin, and the call would revert. `legacyWalletOf` (genuine check) is used; for an honest window the registered
   app is the window's own wallet, so the answers agree.
7. **Pair rules (unspecified details):** one pair per entrant; written only for a non-empty entry request; a hinted entry with
   `wallet != 0` overwrites an existing pair at no charge (latest verified pair wins); a hint-0 entry leaves an existing pair;
   the pair is deleted and refunded with the entrant's last entry; ungated pools never store or charge it.
8. **`gateCheck` always uses `Gate.checkFor`** (also without a pair, ctx `(addr, 0, addr)`), so new children need Gate v2.
9. **`mbr()` changed** (`entries` 27,300, `entriesByAddress` 22,100), also in the factory and plugin (shared base).
10. **Already broken, not fixed:** the May-2026 plugin's `newPool` (hard-coded 1,327,500 refundable MBR) does not match the
    deployed child's own creation MBR, the working-tree child's (1,442,000 before this change) or the new child's
    (1,570,500 + MinBalance). Wallets on that generation must update the plugin to create pools (they already must today).
11. **Fee note:** the legacy `enterCost` of a gated pool makes one EscrowFactory inner call when no pair exists (pooled fee
    0). Callers that cover inner fees by simulation are unaffected; a client that pays a static fee for the deployed plugin's
    `enter` needs one more 1,000 µA.

### Phase 4 (listed only, NOT applied)

Delete: child `gatedEnter` legacy shim, legacy `enterCost`, `legacyEnterCost`, `ENTRY_LEGACY_GATED` and the flat branch of
`enter` (once no installed plugin hard-codes the flat MBR); factory `legacyNewPool`/`legacyNewPoolCost`; plugin
`legacyEnter`/`legacyChildGateSubject` (once no pre-`pv` child is live). Keep the `legacyCharged` refund path for as long as
any pool holds such entries (pools end; then it can go with the next child version).

### Requests to other tracks

- None blocking. `mocks/fake-wallet` needs no change (deviation 2). `scripts/deploy-staking-pool-plugin.ts` works unchanged
  (constructor unchanged); the update-plugin track's Phase 2 planner already sizes this child at 12,508 B.

### Tests

- `smart_contracts/staking-pool/compat.test.ts` (new, unit, **8/8 pass**): snapshot integrity; both ABIs on child and factory;
  **P2-CMP-01 (static)**: every child/factory selector the July and May plugins call is implemented; the new plugin's ABI equals
  the deployed plugin's; **P2-REF-02 (static)**: the legacy-child branch only needs selectors the deployed child has, and the new
  plugin never calls the legacy factory selectors; `pv` schema; `legacyCharged` packing and the Q14 formula.
- `akita-sdk/src/staking-pool/index.test.ts` (new, unit, **11/11 pass**): overloads in the generated clients, Q14 helpers,
  `isHintedPool`, `enterCost`/`enter` ABI selection by marker and gate txn, factory `cost`/`new` hint forwarding.
- `smart_contracts/staking-pool/principal.e2e.spec.ts` (new, LocalNet, **not run**): `pv`; **P2-STK-01/P2-STK-04** (default window,
  72-byte ctx args: quote = charge = box MBR = refund, pair stored and removed); escrow window (third party cannot disqualify,
  no registry); wrong ctx args fail at the Gate; **P2-STK-03** (forged entrant: uint64 `controlled_address`, deleted `referrer`,
  short `spending_address` → no panic, still qualified; wallet deleted → disqualified); direct calls (hint 0 ctx; `errHtop`,
  `errHnwl`; **P2-GATE-03** `errFgte`); ungated exact/flat/odd payments and refunds; factory `newPoolCost(wallet)` and plugin
  `newPool` with a referred wallet; legacy factory shims create `pv` children; deployed July plugin (**P2-STK-02**: escrow window,
  registry pair stored, third-party `gateCheck` keeps it, flat + pair refund; ungated exact); deployed May plugin (flat
  accepted, no pair); **P2-REF-02**: the deployed child pushed through the DAO + update plugin, new plugin enters it ungated and
  gated (legacy ABI, registry-free subject), then the current child is restored.
- `smart_contracts/staking-pool/staking-pool.e2e.spec.ts` (updated, **not run**): Q14 constants (27,300 / 22,100) and the
  overloaded `newPool` client names.

### Status / pending

- **LocalNet down** (`localhost:4001/health` and KMD empty at 15:49 and 16:31). Not run: `staking-pool/principal.e2e.spec.ts`,
  `staking-pool/staking-pool.e2e.spec.ts`, `arc58/plugins/staking-pool/staking-pool.e2e.spec.ts`, `utils/origin-spoofing.e2e.spec.ts`
  (uses the legacy `gatedEnter` through the fake wallet and the SDK), and the full `npm test`. Run with
  `with-localnet-lock.sh staking-pool npx vitest run smart_contracts/staking-pool smart_contracts/arc58/plugins/staking-pool smart_contracts/utils/origin-spoofing.e2e.spec.ts`.
- Built (one at a time, `build-contracts.mjs`): `staking-pool/contract.algo.ts`, `staking-pool/factory.algo.ts`,
  `arc58/plugins/staking-pool/contract.algo.ts`; a fresh single-file compile of each equals its artifact. `npm run build`
  (akita-sdk) OK. akita-sdk `vitest run` 404/404; akita-sc unit tests 55/55. `tsc --noEmit`: no new error in any file of this
  track (the `MerkleTree` generic error in `staking-pool.e2e.spec.ts:38` is pre-existing).

---

## 2026-10-04 — Auction/Raffle track: `seller_referrer`, hinted gated methods + legacy shims, `xImpl(gated)`, v3 plugins (§6.6, §6.8, §6.11)

### Interfaces other tracks must know

**Children (new bytecode for new auctions/raffles only; live children are not upgraded, Q8).**

- New global `seller_referrer` (32 B, keys `AuctionGlobalStateKeySellerReferrer` / `RaffleGlobalStateKeySellerReferrer`
  = `'seller_referrer'`). Its EXISTENCE is the plugins' ABI marker. Schema: Auction 25/**11**, Raffle 23/**10**
  (+50,000 µA per creation, picked up by `newAuctionCost` / `newRaffleCost` through `globalBytes`).
- `create` gains a 16th argument `sellerReferrer: address` (Auction
  `create(uint64,bool,uint64,uint64,uint64,uint64,uint64,uint64,(address,uint64),address,uint64,uint64,address,string,(uint64,(string,uint64)),address)void`,
  Raffle `create(uint64,bool,uint64,uint64,uint64,address,(address,uint64),uint64,uint64,uint64,uint64,uint64,address,uint64,(string,uint64),address)void`).
- Settlement: `Auction.completeAlgoPayments/completeAsaPayments` and `Raffle.claimRafflePrize` pay
  `sendReferralPaymentTo(dao, seller_referrer, …)`. No registry read remains in the settlement path.
- Gated methods: hinted overload (trailing `wallet: uint64`, `principalOf` + `gateCheckCtx(gateCtx(p))`) and a legacy
  shim with the deployed selector (`legacyGatedX`, registry subject + `Gate.mustCheck`):

| Hinted | Legacy shim (deployed selector) | Shim subject |
|---|---|---|
| `gatedBid(pay,appl,address,uint64)void` | `gatedBid(pay,appl,address)void` | `legacyOriginOrTxnSender(legacyWalletOf(dao, Txn.sender))` |
| `gatedBidAsa(pay,axfer,appl,address,uint64)void` | `gatedBidAsa(pay,axfer,appl,address)void` | same |
| `gatedEnter(appl,pay,address,uint64)void` | `gatedEnter(appl,pay,address)void` | `gateSubject()` (= same registry origin) |
| `gatedEnterAsa(appl,pay,axfer,address,uint64)void` | `gatedEnterAsa(appl,pay,axfer,address)void` | same |
| `gatedAdd(appl,pay,uint64)void` | `gatedAdd(appl,pay)void` | same |
| `gatedAddAsa(appl,axfer,uint64)void` | `gatedAddAsa(appl,axfer)void` | same |

- Raffle: every gated entry point (hinted and shim) calls a private `enterImpl/enterAsaImpl/addImpl/addAsaImpl(…, gated)`;
  the outer-selector compares are gone. The ungated `enter/enterAsa/add/addAsa` still require `gateID == 0`
  (`errBmgn`, same code). Auction gated paths share `assertGated(gateTxn, legacy, wallet)`.

**Factories (DAO upgrade, same group as the child push).**

| Hinted (`wallet` last) | Legacy shim (DEPLOYED selector) | `seller_referrer` forwarded |
|---|---|---|
| `newAuction(pay,axfer,string,byte[32][],uint64×7,address,uint64,uint64)uint64` | `newAuction(pay,axfer,string,byte[32][],uint64×7,address,uint64)uint64` | hinted: `principalOf(dao, wallet).referrer`; shim: `referrerOrZeroAddress(legacyWalletOf(dao, Txn.sender))` at creation |
| `newPrizeBoxAuction(appl,pay,uint64×7,address,uint64,uint64)uint64` | `newPrizeBoxAuction(appl,pay,uint64×7,address,uint64)uint64` | same |
| `newRaffle(pay,axfer,uint64×7,address,string,byte[32][],uint64,uint64)uint64` (with `minEntries`) | `newRaffle(pay,axfer,uint64×6,address,string,byte[32][],uint64)uint64` (**no `minEntries`**, = MainNet 3569557743) | same; shim uses `minEntries = 0` |
| `newPrizeBoxRaffle(appl,pay,uint64×7,address,uint64,uint64)uint64` | `newPrizeBoxRaffle(appl,pay,uint64×6,address,uint64)uint64` (deployed) | same |

The seller stays `Txn.sender` (state keyed by the spender, Q5). `newAuctionCost` / `newRaffleCost` keep their ABI.

**Typed-client names (overloads).** Auction: `gatedBidPayApplAddressUint64Void` / `gatedBidPayApplAddressVoid`,
`gatedBidAsaPayAxferApplAddressUint64Void` / `…AddressVoid`. Raffle: `gatedEnterApplPayAddressUint64Void` / `…AddressVoid`,
`gatedEnterAsaApplPayAxferAddressUint64Void` / `…AddressVoid`, `gatedAddApplPayUint64Void` / `gatedAddApplPayVoid`,
`gatedAddAsaApplAxferUint64Void` / `gatedAddAsaApplAxferVoid`. Factories:
`newAuctionPayAxferStringByte_32Uint64Uint64Uint64Uint64Uint64Uint64Uint64AddressUint64Uint64Uint64` (hinted) / `…Uint64Uint64` (legacy),
`newPrizeBoxAuctionApplPay…AddressUint64Uint64Uint64` / `…AddressUint64Uint64`,
`newRafflePayAxferUint64Uint64Uint64Uint64Uint64Uint64Uint64AddressStringByte_32Uint64Uint64Uint64` (hinted) /
`newRafflePayAxferUint64Uint64Uint64Uint64Uint64Uint64AddressStringByte_32Uint64Uint64` (legacy),
`newPrizeBoxRaffleApplPayUint64×7AddressUint64Uint64Uint64` / `…Uint64×6AddressUint64Uint64`. There is no
`client.send.newAuction` / `newRaffle` / `gatedBid` / `gatedEnter` any more.

**Plugins v3 (`arc58/plugins/auction`, `arc58/plugins/raffle`; immutable → new app ids in Phase 3).** ABI and constructor
unchanged (`create(string,uint64,uint64)void` / `create(string,uint64)void`, so `PHASE3_PLUGINS` needs no change).
Creation passes `windowHint(wallet)` to the hinted factory methods (requires the Phase 2 factory). Gated bid/enter/add:
child with `seller_referrer` → `Gate.mustCheckFor(encodeArc4(gateCtx(pluginPrincipalOf(dao, wallet))))` + hinted
method with `windowHint(wallet)`; child without it (deployed) → `Gate.mustCheck` + legacy selector with the subject the
deployed child asserts: Auction `legacyOriginOr(legacyWalletOf(dao, S), S)`, Raffle **`S`** (see deviation 2).
Sizes 3,827 B / 3,942 B (`extraProgramPages: 1`, as before).

**SDK (`akita-sdk/src/auction`, `akita-sdk/src/raffle`).** `wallet?: bigint|number` (default `0n`) on `NewAuctionParams`,
`NewPrizeBoxAuctionParams`, `BidParams`, `NewRaffleParams`, `EnterParams`, `AddParams` (type `WalletHint`). Factory
wrappers send the hinted overloads. `AuctionSDK.bid` / `RaffleSDK.enter` / `RaffleSDK.add` send the hinted overload
only when the child has `seller_referrer` (`usesPrincipalAbi()`) AND the gate txn is not `Gate.mustCheck`; otherwise the
legacy shim (same routing rule as `MarketplaceSDK.purchase`). New exports: `SELLER_REFERRER_KEY`, `directGateCtx(sender)`
(auction), `RAFFLE_SELLER_REFERRER_KEY`, `raffleDirectGateCtx(sender)`, `AuctionSDK.usesPrincipalAbi()`,
`RaffleSDK.usesPrincipalAbi()`, `RaffleSDK.sellerReferrer()`, `AuctionState.sellerReferrer` (`''` on old children).
`akita-sdk/src/wallet/plugins/{auction,raffle}.ts` need no change (plugin ABI unchanged).

**Compatibility fixtures other tracks can reuse (P2-CMP-01).** `smart_contracts/auction/compat/deployed.ts`
(`createFromSpec`, `clientOf`, `loadBoxedChild`, `boxedChildMbr`, `deployLegacyAuctionFactory`, `deployLegacyAuctionPlugin`)
and `smart_contracts/raffle/compat/deployed.ts` (`deployLegacyRaffleFactory`, `deployedRaffleCost`, `deployLegacyRafflePlugin`).
`compat/deployed/*.arc56.json` are the HEAD (`e7f174ee`) artifacts without TEAL source; their approval programs are
**byte-identical to MainNet** AuctionFactory 3569557408, its `bc` child box (Auction, 7,300 B), AuctionPlugin 3569561141,
RaffleFactory 3569557743, its `bc` child box (Raffle, 6,589 B) and RafflePlugin 3569561863 (sha256 pinned in
`auction/principal-abi.test.ts`; read once with `GET /v2/applications/{id}` and `/box?name=b64:YmM=`).

### Deviations / findings

1. **Raffle legacy creation shims keep the DEPLOYED selectors, not the working-tree ones.** The deployed RaffleFactory has
   no `minEntries` (12-argument `newRaffle`, 10-argument `newPrizeBoxRaffle`); the working-tree 13/11-argument forms (AR-C)
   were never deployed, so they get no shim. The shims create with `minEntries = 0` (at least one entry). Without this,
   the working-tree factory alone already dropped every deployed `newRaffle` selector (ride-along break).
2. **v3 RafflePlugin uses subject `S` (spending account) on deployed raffle children**, not
   `legacyOriginOr(legacyWalletOf(S), S)` (§6.11/§7.2 text). Every deploy-era commit (`2ba65843`…`e7f174ee`) and the
   MainNet child gate on `Txn.sender`; the registry-origin `gateSubject()` (AR-E) exists only in the working tree. The
   new child's legacy shims do keep `gateSubject()` (spec §6.8).
3. **Auction old-child subject.** The v3 AuctionPlugin uses `legacyOriginOr(legacyWalletOf(dao, S), S)` (spec). The
   deployed child computes the HEAD `originOr(getWalletID(S))`: no genuineness test and no liveness test. They agree for
   an honest registered wallet whose controlled address is live; when it is not live the plugin's subject is `S` and the
   deployed child rejects the gate (`errFgte`) instead of evaluating the stale origin. Fail-closed, accepted.
4. **Deployed plugin creation paths were already dead on MainNet** (verified on the vendored bytecode = HEAD source): the
   deployed AuctionPlugin/RafflePlugin compute the creation payment locally and omit the disbursement MBR (Raffle also the
   creation fee and weights), while the deployed factories require them exactly (`errIpay`). So, unlike the Marketplace
   track, no "accept the old payment" arm is added: P2-REF-01 is exercised with a test-only old-ABI caller that pays the
   quoted cost (`smart_contracts/auction/mocks/legacy-caller.algo.ts`, `MockLegacyNftCaller`, new).
5. **Finding (ride-along, not principal): the deployed AuctionPlugin quotes bid MBR from its own constants** (bids 34,900
   + bidsByAddress 18,500) while the working-tree child charges 35,300 + 18,900. Through the deployed plugin, a first ALGO
   bid on a new child records 800 µA less than `amount` (it still passes if `amount ≥ minimum + 800`); an ASA bid reverts
   (`payment.amount === mbr`). The deployed RafflePlugin never calls gated raffle methods at all (no `gatedEnter`/
   `mustCheck` selector): gated raffles could never be entered through it. Decision needed only if old-plugin ASA bids
   must work during the window.
6. **Auction child size kept at 4 pages.** With shims the child reached 8,649 B (5 pages, +100,000 µA per auction, and the
   fixtures fund the boxed contract for ≤ 8,192 B). Behaviour-neutral refactors bring it to **8,153 B**
   (`assertGated`/`assertUngated`, `bidMbr`/`recordBid`, `sendBidAsset`, `sendBidAssetOrDisburse`). Only observable
   difference: a legacy gated bid checks `isLive` before the registry lookup (same `errAnlv` result). Raffle 7,945 B,
   AuctionFactory 4,719 B, RaffleFactory 4,197 B. Whole-tree and single-file builds have equal sizes (bytes differ in
   router order, as Phase 1 found); the artifacts are the single-file builds. Update-plugin track: groups stay atomic
   (AuctionFactory + Auction = 15 txns, RaffleFactory + Raffle = 14).
7. **Legacy creation shims now read the registry at creation** (+1 inner app call; callers pooling fees pay ≥ 1,000 µA more).
8. **Plugin v2 → v3 in place.** The working-tree v2 plugins (audit 2026-10, undeployed) were edited into v3; no separate v2
   artifact is kept. Requires the Phase 2 factories (hinted `newAuction`/`newRaffle`).
9. Deployed children keep paying the referral to the SETTLER's registry referrer (AR-10 is not in the deployed code)
   until they settle; only new children pay `seller_referrer`.

### Requests

- **Deploy/update scripts (not owned):** the factory upgrade and the child-box push must land together (the factory compiles
  the child's 16-argument `create` selector and schema). The Update-plugin track's `principal-phase2-upgrade-targets.ts`
  already does this; nothing else is needed from this track.
- `akita-sdk/src/wallet/plugins/raffle.ts` still documents "RafflePlugin v2"; harmless (ABI unchanged).

### Tests

- `smart_contracts/auction/principal-abi.test.ts` (unit, **17 pass**): vendored bytecode sha256 = MainNet; `seller_referrer`
  key and +1 byte slice; 16-argument `create`; Auction/Raffle ≤ 8,192 B; every hinted overload and every legacy shim exists
  and each legacy signature is the DEPLOYED one; Raffle source has no `methodSelector` and 8 `xImpl(…, true)` call sites;
  v3 plugins call the hinted factory methods (never the legacy ones), both gated ABIs, `mustCheckFor` and `mustCheck`;
  plugin method signatures unchanged.
- `akita-sdk/src/auction/principal.test.ts` (7) and `akita-sdk/src/raffle/principal.test.ts` (7) (unit, **pass**): overloads in
  the generated clients (P2-ABI-01), marker/gate-txn routing, wallet-hint forwarding, `sellerReferrer` decoding.
- `smart_contracts/auction/principal.e2e.spec.ts` (LocalNet, **not run**): §6.6 creation through the v3 plugin stores R1 with
  no registry; EOA creation → zero, top-level hint → `errHtop`/`errHnwl`; **P2-REF-01** (old-ABI caller from a registered
  wallet → registry referrer; direct legacy call → zero); hinted gated bid via v3 plugin with AkitaReferrerGate (R1 passes,
  other wallet `errFgte`); direct hinted bid accepts only the verified ctx (**P2-GATE-03** at the target) and rejects a
  wallet hint (`errHtop`); legacy `gatedBid` shim on a new child; settlement pays `seller_referrer` whoever settles;
  **P2-REF-02** (deployed AuctionPlugin bytecode bids on a new child via the legacy shim; v3 plugin bids on a child created by
  the deployed factory bytecode via the legacy ABI).
- `smart_contracts/raffle/principal.e2e.spec.ts` (LocalNet, **not run**): §6.8 creation via v3 plugin; EOA zero / `errHtop`;
  **P2-REF-01** with the deployed 12-argument selector (`minEntries = 0`); **P2-RAF-01** legacy `gatedEnter`/`gatedAdd`
  and `gatedEnterAsa`/`gatedAddAsa` pass on a new child, `enter` on a gated raffle still `errBmgn`; hinted enter/add via
  v3 plugin (R1 passes, other wallet `errFgte`); direct hinted entry pins the ctx; `claimRafflePrize` pays
  `seller_referrer`; **P2-REF-02** v3 plugin enters a raffle created by the deployed factory bytecode (subject `S`).

### Status / pending

- **LocalNet down** (`localhost:4001/health` timed out 15:4x–16:36; not started/reset). Not run:
  `smart_contracts/auction/principal.e2e.spec.ts`, `smart_contracts/raffle/principal.e2e.spec.ts`,
  `smart_contracts/auction/auction.e2e.spec.ts`, `smart_contracts/raffle/raffle.e2e.spec.ts`,
  `smart_contracts/arc58/plugins/auction/auction.e2e.spec.ts`, `smart_contracts/arc58/plugins/raffle/raffle.e2e.spec.ts`,
  `tests/migration-scripts.e2e.spec.ts` (uses the SDK factories), and the full `npm test`. Run with
  `with-localnet-lock.sh auction-raffle npx vitest run smart_contracts/auction smart_contracts/raffle smart_contracts/arc58/plugins/auction smart_contracts/arc58/plugins/raffle`.
- Built one at a time with `build-contracts.mjs`: `auction/contract.algo.ts`, `raffle/contract.algo.ts`,
  `auction/factory.algo.ts`, `raffle/factory.algo.ts`, `arc58/plugins/auction/contract.algo.ts`,
  `arc58/plugins/raffle/contract.algo.ts`, `auction/mocks/legacy-caller.algo.ts` (new). akita-sdk `npm run build` OK;
  akita-sdk `vitest run` 406/406; `tsc --noEmit` (akita-sdk esm config) clean; akita-sc `tsc --noEmit`: no error in any
  file of this track.

---

## 2026-10-04 — Subscriptions track, review fixes: Guild consensus moved to the hinted selectors; P2-SUB-04 escrow / external-C e2e cases

### Finding 1 (medium, CONFIRMED): the Guild subscription consensus no longer built — fixed here

Supersedes request 1 ("Guild track") of the Subscriptions track section above: the change is now applied in this
track's change set, so the tree builds again.

- `arc58/guilds/consensus/subscriptions/contract.algo.ts`: `serviceCost()` calls `newServiceCost` with
  `args: [0, 0]`; `createService()` appends `encodeArc4(none)` (hint 0) after `highlightColor`. The consensus app acts as
  itself, so hint 0 is the only valid value (no wallet, no referrer). Compiled TEAL now calls
  `newServiceCost(uint64,uint64)uint64` and `newService(pay,…,byte[3],uint64)uint64` with 12 ApplicationArgs
  (selector + 11). Approval 4,311 B. Rebuilt with `build-contracts.mjs` (artifacts + generated clients).
- `arc58/guilds/tests/mock-subscriptions.algo.ts` (`MockGuildSubscriptions`): `newServiceCost(asset, wallet)` and the
  hinted `newService(…, highlightColor, wallet)`; the mock asserts `wallet == 0`. No legacy selector is left in the mock.
  Rebuilt.
- `tsc --noEmit -p .`: the `:130` error is gone. No new error in a touched file (the remaining errors are in other
  tracks' files or predate this work: `scripts/deploy-gates.ts`, `scripts/deploy-rewards-v2.ts`, `dao.voting.e2e`,
  `guilds/tests/test-helpers.ts:741/814-817`, `marketplace.algo.ts`, `launch-hooks.e2e`, `staking-pool.e2e`).
- New static regression test `smart_contracts/subscriptions/guild-consensus-abi.test.ts` (unit, 5, **ran: 5/5**). It reads
  the compiled guild TEAL. For every inner call that pushes a method selector, it asserts that the number of
  `ApplicationArgs` equals 1 + the selector's ABI arg count (transaction args excluded). It also asserts that the guild
  uses only the hinted `newService` / `newServiceCost`, that `newService` sets exactly 12 args, and that every
  Subscriptions method the guild calls is routed by both `Subscriptions` and `MockGuildSubscriptions` (no stale legacy
  signature in the mock). A rebuild that fixes only the `:130` type error fails the arity test.

### Finding 2 (medium, CONFIRMED): no on-chain case for a stored pair keyed by an account other than its principal

New `describe('P2-SUB-04: …')` in `smart_contracts/subscriptions/principal.e2e.spec.ts` (6 tests). Wallet `W`
(unregistered, referrer R1, default grant) with escrow grants `'e'` (named EscrowFactory escrow `E`) and `'x'`
(arbitrary-address escrow `Ax`, E5, recorded with raw `arc58_newEscrow`). Both escrows hold 5 ALGO, below the
50 ALGO gate threshold; `W.address` holds more.

1. Escrow-window gated subscribe (both escrows, referrer-gated service): quote(hint W) − quote(hint 0) = 34,900; the
   escrow's balance drops by exactly `AMOUNT + quote`; `escrowed == 0`; `'i'` keyed by the escrow =
   `(W, W.address)`. The gated subscribe also proves `pluginPrincipalOf` (before the gate txn) == `principalOf`
   (after the RekeyTo) for an escrow window, because `gateCheckCtx` compares them byte for byte.
2. Keeper (hint 0): `triggerGateCtx == (W.address, W, escrow)` for both escrows (`atRestPrincipal` `stored != account`
   branch, `ownsAtRest(W, E)` through `auth(E) == W.address`). The context-aware AkitaReferrerGate trigger passes.
3. Keeper on E's ALGO-gated subscription: the plain sub-gate sees `ctx.principal = W.address` (E alone would fail).
4. Case (1) with `key.address = E != p.spender = W.address`: W's DEFAULT window triggers E's ALGO-gated subscription.
   This passes only through case (1). Case (2) would give `atRestPrincipal(E, W, W.address) = E` because W.address is
   rekeyed to the plugin, and E is below the threshold. Also covered: an escrow-window self-trigger.
5. External C (`Wx`, controlled `C`): subscriber C stores `(Wx, C)`; Wx's escrow stores `(Wx, C)` (principal C, live).
   Keeper ctx before: `(C, Wx, C)` / `(C, Wx, WxE)`. After `arc58_rekeyTo(away, false)`: `(C, 0, C)`, and the
   context-aware gate fails (`errFgte`, renewals stop). For the escrow it is `(WxE, Wx, WxE)`, and renewals continue.
6. Escrow no longer owned → `(E, 0, E)`: the wallet is forged (admin update to `MockForgedWallet`) and deleted, and the
   referrer-gated keeper trigger fails (`errFgte`).

**Deviation from the review's fix text:** the review asks for an escrow `E` "rekeyed away from W" → `(E, 0, E)`. No wallet
flow can leave an escrow rekeyed away: a window must rekey it back (`errAuam`, T14b), and `arc58_rekeyTo` moves only the
controlled address. So the `(x, 0, x)` degradation is tested on the two states that can be reached: an external `C`
rekeyed away (case 5), and an escrow whose wallet no longer exists (case 6).

### Pending (LocalNet down: `curl localhost:4001/health` timed out twice during this change; no e2e spec ran)

Must pass under `with-localnet-lock.sh` before the Subscriptions track is called done:
`smart_contracts/subscriptions/{principal,compat,subscriptions-audit,subscriptions}.e2e.spec.ts`,
`smart_contracts/arc58/plugins/subscriptions/subscriptions.e2e.spec.ts`, `utils/principal.e2e.spec.ts`,
`utils/origin-spoofing.e2e.spec.ts`, guild `smart_contracts/arc58/guilds/tests/{subscriptions,consensus-actions,
audit-remediation,factory}.e2e.spec.ts` (they deploy the rebuilt `SubscriptionGuildConsensus` against the rebuilt mock),
and the full `npm test` (baseline 1,780 passed / 0 failed).

### Ran

- `npx vitest run --exclude '**/*.e2e.spec.ts'` (akita-sc, all unit tests): **131/131**, including
  `guild-consensus-abi.test.ts` 5/5 and `principal-shims.test.ts` 15/15.
- `npx tsc --noEmit -p .` (akita-sc): no error in any file touched here.

---

## 2026-10-04 — Marketplace track, review fixes: legacy-payment float, deployed Listing referral, plugin `purchase` ABI

This section corrects the "Marketplace track" section above. Where the two disagree, this section is correct.

### Verdicts

| # | Finding | Verdict | Evidence |
|---|---|---|---|
| 1 | High: the legacy-payment float is not recovered when a listing sells | **Confirmed, fixed** | The refund was `min(received + released, P_L)` with `received + released = total − consumed` and `P_L = total − float`. So the factory lost `min(consumed, float)` on every legacy-paid sale. The loop was permissionless. |
| 2 | Medium: deployed Listing referral misread | **Confirmed, tests and texts fixed. Shim payout kept: Kyle to decide (D2)** | The vendored deployed Listing (`goal clerk compile -D`) builds the `EscrowFactory.get` (0x3c1a6f33) argument with `txn Sender; frame_dig -3; pushbytes "oal"; app_global_get_ex`. Every caller of that subroutine first asserts `txn Sender == global CreatorAddress`. So the lookup key is always the factory, and the referrer is always zero. |
| 3 | Medium: the new plugin `purchase` ABI differs from the deployed one | **Confirmed. Fixed in the SDK, not in the plugin** | Deployed 3569561455 route table: `dea7cd9d 360c8a2f 269e4bb0 4d96ba44 59466ef2 33e92c94 854dede0`. The new plugin routes `703f18ca` instead of `269e4bb0`. The other five are equal. |

### Fix 1: the factory records its float per listing and takes it back first

- Listing rev 3 `create` gains a 17th argument, `factoryFloat: uint64`, stored in the new global `factory_float`.
  - Signature: `create(uint64,bool,uint64,uint64,uint64,address,(address,uint64),address,uint64,uint64,address,string,uint64,(string,uint64),uint64,address,uint64)void`.
  - Schema: **13 uints / 7 bytes**.
  - Creation MBR: **920,500** (was 892,000). The float for a legacy-paid listing is `920,500 − 756,500 = 164,000`.
- `assertListingPayment` returns the float: 0 for `cost.total`, and `cost.createMbr − LegacyListingCreateMbr` for the legacy amount. `listImpl`/`listPrizeBoxImpl` pass it to the child.
- Settlement (`settleAlgo`, `settleAsa`) and `delist` read `factory_float` before deletion. For rev-3 listings, `refundListingFunder` pays `min(released, recorded + float) − float`, which equals `min(released − float, recorded)`.
  - Result: on the legacy-paid path the factory is net 0 over the listing's life, and the seller bears the consumed settlement MBR, as on the hinted path.
  - Rev-absent listings keep their full-deposit refund (unchanged).
- **New guard (D4):** a legacy-paid list reverts `errLflt` when it would leave the factory with less than `LegacyFloatReserve = 500,000` µALGO free.
  - Test: `free − minBalance ≥ cost.total + reserve`, evaluated after the payment is received.
  - The reserve keeps the full-deposit refunds of the two live rev-absent MainNet listings (3643990817, 3691743616) payable. Each can consume at most 67,000 + 100,000 of factory free balance.
  - So a float tie-up can only block legacy lists. It can never block those sales or delists.
- The hard-cutover alternative (delete the `legacyPayment` arm) is not applied, because §7.2 requires deployed flows to keep working.

**Corrected runbook (replaces the runbook in the earlier section):**
- Each open legacy-paid listing holds 164,000 µALGO of the factory's free balance. The factory gets it back in full at the sale or the delist.
- A legacy-paid list needs `free ≥ 164,000 + 500,000` before it is created. At the MainNet free balance on 2026-10-04 (1,905,400 µALGO), that allows about 7 concurrent old-plugin listings.
- To allow more, top up the factory by `164,000 ×` the extra listings you expect.
- When the reserve is reached, only old-plugin/legacy-paid lists fail (`errLflt`). Hinted lists pay their full cost and are not affected.
- A griefer can hold float only by locking about 1.1 ALGO of their own per listing (the legacy deposit), and gets it all back on delist. The reserve bounds the effect.

### Fix 2: deployed referral semantics (texts and tests)

- Corrected:
  - spec §6.7 Listing `create` row (pre-existing column);
  - the `compat.e2e.spec.ts` header;
  - the SDK `ListingState.sellerReferrer` JSDoc;
  - the Listing `sellerReferrer` comment;
  - the `legacySellerReferrer`/`legacyList` JSDoc.
- The earlier section is wrong where it says "Rev ≤ 2 children keep their own program (registry referral at settlement)". It is also wrong in the P2-REF-02 bullet "the registry referral is still paid". Deployed children never paid a seller referral. Rev 2 never shipped.
- P2-REF-02 (`compat.e2e.spec.ts`): the new plugin buying an old child now asserts that R1's allocations are **unchanged**.

### Fix 3: plugin `purchase` ABI

- The ABI change is the audit MKT-02 `maxPrice` ride-along (Kyle chose "both" in `audits/full-2026-10-02/FIX-PLAN.md`). A no-`maxPrice` overload in the new plugin would reopen the price-change front-run for anyone who uses it, so it is not added.
- SDK `MarketplacePluginSDK` (`akita-sdk/src/wallet/plugins/marketplace.ts`) picks the ABI by plugin app id:
  - `MARKETPLACE_PLUGIN_LEGACY_PURCHASE_APP_IDS = {751968424, 763128885, 3368399474, 3569561455}`. These are all marketplace plugin generations in `networks.ts`. Every committed plugin since Nov 2025 has the same `purchase` signature.
  - For those ids, `purchase()`/`purchase(args)` give selector `0x269e4bb0` and build `purchase(uint64,bool,uint64,address,byte[][])void`. Before it builds the call, the SDK reads the listing price and refuses (`errPamx` text) when the price is above `maxPrice`. This read is not atomic. Rev-3 listings add the 4-round price-change cooldown on chain.
  - The constructor option `legacyPurchaseAbi?: boolean` overrides the lookup (the compat suite uses it for the deployed program installed under a LocalNet id). `usesLegacyPurchaseAbi()` reports the choice.
  - New exports: `MARKETPLACE_PLUGIN_LEGACY_PURCHASE` (ABIMethod), `MARKETPLACE_PLUGIN_LEGACY_PURCHASE_APP_IDS`.
- Spec §7.3 now names this as the second selector exception.
- The earlier section is wrong where it says "New plugin version …, ABI unchanged" and "`akita-sdk/src/wallet/plugins/marketplace.ts` needs no change".

### Interfaces other tracks must know

- **Request to the rollout / update-plugin track (not applied: outside the marketplace files):** add `marketplacePlugin: { '269e4bb0': 'purchase' }` to `PLUGIN_METHOD_SELECTOR_MIGRATIONS` in `scripts/lib/dao-wallet-plugin-migration.ts`.
  - Without it, a method-restricted DAO-wallet grant of the marketplace plugin keeps the dead selector after the Phase 3 swap.
  - `resolveLatestSelectors` then calls `MarketplacePluginSDK.purchase()`, which returns `0x703f18ca` for any id outside the legacy set.
  - The user-wallet reinstall builder (frontend, §7.3) needs the same mapping.
- Phase 2 planner: the Listing child bytecode changed again (3,137 B approval, 2 pages). Marketplace approval is 5,656 B and still fits its 4 pages. Rebuild both from the working tree; there is no other rollout change.
- New contract error `errLflt` (`marketplace/errors.ts`). It is mirrored in the SDK as `LFLT`; `PAMX` was also added to the SDK table.
- `ListingState.factoryFloat?: bigint` (undefined on rev-absent listings).

### Deviations from the spec

- **D1** §6.7 Listing row: the Listing gains `factory_float` as well as `seller_referrer`. `listCost` rises by +78,500, not by +50,000. The extra 28,500 is creator MBR, so deletion releases it to the seller: a deposit, not a fee.
- **D2 (Kyle to confirm)** The §6.7 shim row (registry referrer on shim-created rev-3 children) is kept. It is a **new payout**, not a deployed semantic, so it bends §7.2 "shim semantics are exactly the deployed semantics". It moves part of the DAO fee to the seller's referrer.
  - The hinted path's referral is equally new; that is the spec's intent.
  - It does not make old-plugin calls revert, and with Fix 1 the factory no longer pays its consumed MBR.
  - To match the deployed semantics exactly instead, make `legacySellerReferrer()` return `Global.zeroAddress` (one line). Then the compat tests P2-CMP-01 (first test and the "float" test) must assert R1 unchanged, and M-05 already expects zero for an EOA.
- **D3** §6.11 "no existing plugin method gains an argument" does not hold for MarketplacePlugin `purchase` (MKT-02). It is handled in the SDK and in §7.3, not reverted.
- **D4** The `LegacyFloatReserve`/`errLflt` guard is not in the spec. It is added so that float tie-up cannot block the two live rev-absent listings.

### Tests

- `marketplace/principal.e2e.spec.ts`:
  - M-06 and M-08: the float is 164,000 and `factoryFloat` is recorded.
  - **New M-14**: a direct legacy-paid listing of a fresh ASA is sold to a buyer who is not opted in. It consumes 167,000, which is more than the float. The factory's free balance is unchanged and the buyer's Rewards inbox holds the prize.
- `marketplace/compat.e2e.spec.ts`:
  - The old-plugin purchase is now built by the SDK (`legacyPurchaseAbi`).
  - P2-CMP-01 asserts `factoryFloat`.
  - **New "P2-CMP-01 float"**: an old-plugin legacy-paid sale with a referral (R1) to a buyer wallet that is not opted in to a fresh ASA. It consumes 234,000. The factory gets exactly its float back.
  - P2-REF-02 (old child): asserts no seller referral.
  - **New errLflt test**: the old-generation factory is funded with its minimums plus 300,000, so the deployed plugin's list reverts `errLflt`.
  - The rev-3 creation test asserts that the float is recovered on delist.
- **New** `marketplace/compat-static.test.ts` (unit, 2): checks the deployed Listing's `get(txn Sender)` byte pattern and creator-only callers, and the deployed plugin's `purchase` selector against the working-tree plugin ABI.
- `akita-sdk/src/marketplace/index.test.ts`: create has 17 args, schema 13/7, `LISTING_CREATE_MBR = 920_500n`, float 164,000.
- **New** `akita-sdk/src/wallet/plugins/marketplace.test.ts` (6): legacy and current selector and call shape, the `errPamx` local refusal, and the override.

### Status

- **LocalNet down** (`localhost:4001/health` timed out). Not run:
  - `marketplace/principal.e2e.spec.ts`;
  - `marketplace/compat.e2e.spec.ts`;
  - `marketplace/marketplace.e2e.spec.ts`;
  - `arc58/plugins/marketplace/marketplace.e2e.spec.ts`;
  - `arc58/plugins/plugin-sdk-hooks.e2e.spec.ts`;
  - `prize-box/prize-box.e2e.spec.ts`;
  - `arc58/dao/tests/upgrade/dao.upgrade.e2e.spec.ts`;
  - the full `npm test`.
- Ran:
  - akita-sc unit tests (every `*.test.ts`): **133/133**;
  - akita-sdk `vitest run`: **412/412**;
  - `tsc --noEmit`: clean for every marketplace file (akita-sc `-p .`, akita-sdk `-p tsconfig.esm.json`);
  - akita-sdk `npm run build`: exit 0.
- Built one at a time with `build-contracts.mjs`: `marketplace/listing.algo.ts`, `marketplace/marketplace.algo.ts`. The plugin contract is unchanged.

---

## 2026-10-04 — Staking-pool track, review fixes: legacy-shim reserve check, May-plugin `gateCheck` fallback

Two medium review findings on `smart_contracts/staking-pool/contract.algo.ts`. Both were confirmed and fixed. This section
supersedes deviations 3 and 5 of the staking-pool track section above. Nothing else in that section changes.

### Finding 1 (medium, CONFIRMED): the legacy `gatedEnter` shim could use ALGO reserved for rewards

- **Cause:** the shim's selector is public. It accepts the flat charge (25,300 + 25,300 per entry) for any gate args.
  The exact cost is 2,500 + 400·(60 + encodedLen(args)) + 22,100, so the flat charge is short for any args longer than
  5 encoded bytes (13,200 µA for one 32-byte arg). `createPoolEntries` never checked the reserves, so the shortfall
  came out of ALGO committed to reward budgets. `startDisbursement`/`finalizeDistribution` then failed with `errNefd`.
- **Fix (the review's primary option):** the legacy-gated branch sets `borrowsFreeAlgo` when
  `entryBoxMbr(args) + 22,100 > 50,600`. After the boxes exist, `createPoolEntries` calls `assertAlgoReservesCovered()`
  (`errNefd`). The shortfall can now come only from free ALGO. The hinted path and `enter` pay at least the exact
  cost, so they skip the check.
- **Interface effect:** a deployed July/May-plugin gated entry with long args into a NEW child reverts with `errNefd`
  when the pool has less free ALGO than the shortfall. The pool creator can fund the pool, or the wallet can update
  to the new plugin, which uses the exact hinted path on `pv` children. Live (old) children are not affected (Q8).
- The stricter option (exact charge required whenever it exceeds the flat charge) was rejected. It would revert
  every long-arg July-plugin entry, even into pools that have free ALGO to cover it.
- Child approval: 12,508 → 12,660 B. That is still 7 upload chunks (≤ 14,182 B), so the update-plugin track's atomic
  StakingPoolFactory + StakingPool group stays at 16 txns. The factory TEAL did not change.

### Finding 2 (medium, CONFIRMED): May-plugin gated escrow entries had no pair, so a third party could disqualify them

- **Cause:** the May-2026 plugin 3569562283 pays only the hard-coded flat charge, so the shim stores no `'i'`.
  `gateCheck` then used ctx `(E, 0, E)`. Example: the shim admitted escrow E of a registered default wallet W with
  subject `W.address`. Any caller could then disqualify E.
- **Fix (the review's option a):** when `gateCheck` finds no pair AND the entry is `legacyCharged`, it uses a LEGACY
  fallback (compatibility window; delete in Phase 4). `W = legacyWalletOf(dao, address)` (EscrowFactory registry
  plus the AppCreator check). The fallback applies only when `W != 0 && ownsAtRestOf(dao, W, address)`, and then
  `ctx = (atRestPrincipalOf(dao, address, W, W.address), W, address)`. The subject becomes `W.address` only while
  `W.address` is un-rekeyed. No wallet global is read, so a forged or updated wallet cannot make it panic.
- **Scope and limits:**
  - The fallback covers escrows of default wallets, where the controlled address is `W.address`. That is the subject
    the shim checked at entry.
  - An escrow entry of an external-C wallet made through the May plugin is now re-checked against `W.address`, not C.
    That entry can still be disqualified when `W.address` does not pass the gate. This is no regression: before the
    fix, the re-check used E. The fix would need to read `controlled_address`, which §3.8 rule 2 forbids on this path.
  - Hinted entries (`legacyCharged == false`) never use the fallback. A hint-0 entrant stays itself.
  - Legacy entrants with no registry wallet keep ctx `(addr, 0, addr)`.
- **Cost:** `gateCheck` on a `legacyCharged` entry without a pair makes one more inner call (`EscrowFactory.get`).
  `StakingPoolSDK.gateCheck` already covers inner fees by simulation and populates resources.
- The review's options (b) (store an unpaid pair from free ALGO) and (c) (revert May-plugin gated entries) were
  rejected. Option (b) needs a refund marker in the pair box, which would change its size and MBR. Option (c)
  breaks a plugin generation that is still installed.

### Phase 4 (listed only, NOT applied)

Also delete the `gateCheck` legacy fallback (the `legacyCharged` + no-pair branch) and `borrowsFreeAlgo`, together
with the legacy `gatedEnter` shim. Do this once no pool holds legacy-shim entries.

### Tests (`smart_contracts/staking-pool/principal.e2e.spec.ts`, LocalNet, NOT run)

- `R11 (May plugin, no pair)`: escrow `m` of the registered default wallet enters through the deployed May plugin and
  stores no pair. A third-party `gateCheck` keeps the entry qualified.
- `a legacy-shim entrant with no registry wallet is still re-checked as itself`: a direct EOA legacy entry, then
  `gateCheck` → qualified, with no pair stored.
- `legacy gatedEnter shim and reward reserves (Q14)`: a fresh gated child with a 2 ALGO committed reward budget and no
  free ALGO. A direct legacy-shim entry with a 32-byte arg (shortfall 13,200) → `errNefd`, and the account is not
  entered. After 13,200 µA of free ALGO is added, the same entry succeeds, balance − minBalance ≥ budget, and the
  budget is unchanged.
- `the hinted path pays the exact charge, so long gate args need no free ALGO`: the same arg through hinted
  `gatedEnter` on a pool with 0 free ALGO succeeds.

### Ran

- Built `staking-pool/contract.algo.ts` and then `staking-pool/factory.algo.ts` (factory TEAL identical). Ran
  `npm run build` in akita-sdk.
- `staking-pool/compat.test.ts`: 8/8. akita-sdk `src/staking-pool`: 11/11. akita-sc non-e2e: 135/135 (16 files).
- `tsc --noEmit -p .`: no errors in the staking-pool files.

### Pending (LocalNet down: `curl localhost:4001/health` timed out)

Run `with-localnet-lock.sh staking-pool npx vitest run smart_contracts/staking-pool smart_contracts/arc58/plugins/staking-pool smart_contracts/utils/origin-spoofing.e2e.spec.ts`,
then the full `npm test`.

---

## 2026-10-04 — plugin-dex track, review fixes: non-genuine hint fallback at BeforeSwap, production pass plugin (§6.11, §6.12)

### Finding 1 (medium, CONFIRMED): strict BeforeSwap + the router's mandatory hint blocked router swaps of non-genuine wallets — fixed, **needs Kyle's sign-off (deviation from §6.12 "strict")**

- Verified: `AkitaRouterPlugin` always passes `windowHint(wallet)`, and its custody check accepts any app whose
  `spending_address` is rekeyed to the router. For a wallet that is not a wallet of the hook's factory `F`
  (a third-party ARC-58 wallet, or an Akita wallet of another factory), `resolvePrincipalFromDexCtx` reverted
  errHnwl on every native leg into a GatedFee pool, while the router's quote (`thirdPartyPrincipal`) succeeded.
  The router, the hook and the pool hook stacks are immutable, so this could not be fixed after deployment.
- **Deviation 1.** `GatedFeeHook.passKey` at BeforeSwap: when `ctx.callerApp != 0` and
  `!isGenuineWallet(ctx.wallet, F)`, the key is `ctx.caller` (the Vault's authenticated Txn.sender), i.e. the
  hint is priced as hint 0. Unchanged and still strict: a top-level hint (errHnwl / errHtop, T-8), and every
  genuine wallet's hint (errHnbd, errIwlt). Write paths (`openPass`, `refresh`, `refreshFromGate`,
  `closePass`) are unchanged (strict).
- ACC-01 holds: the fallback never resolves to anything read through the hint. Any caller can already get the
  same key by passing hint 0, so the change grants nothing new. Quote agrees with the swap for such a hint
  (`thirdPartyPrincipal` returns the swapper). The binding ACC-01 text says "a wrong hint reverts"; this is a
  narrow exception for in-app calls with a non-genuine hint. If Kyle rejects it, revert the 3-line `if` in
  `passKey` and its static assertion, and document that the router cannot trade GatedFee pools for non-Akita
  wallets.
- Cost: one extra `app_params_get AppCreator` + `sha512_256` on hinted BeforeSwaps only. GatedFeeHook approval
  4,089 B → 4,117 B.

### Finding 2 (medium, CONFIRMED): no production pass plugin — fixed

- New immutable, adminless ARC-58 plugin **`GatedFeePassPlugin`** (`arc58/plugins/gated-fee-pass/contract.algo.ts`,
  1.5 KB). Interface:
  - `create(version: string, hook: uint64)`: pins one GatedFeeHook; copies the hook's `akita_dao` (errGpHk if absent).
  - `openPass(wallet, rekeyBack, measure, gateArgs) FeePass`: S pays `PassMbr`, S is the funder.
  - `refresh(wallet, rekeyBack, measure, gateArgs) FeePass`.
  - `refreshFromGate(wallet, rekeyBack, slot, gateId, args) FeePass`: inner `Gate.mustCheckFor(gateCtx(p), gateId, args)`
    + `hook.refreshFromGate(gateTxn, p.principal, slot, windowHint(wallet))`; `gateId` must equal the hook's slot gate (errGfgt).
  - `closePass(wallet, rekeyBack)`; `opUp()` carrier.
  - The key is never caller-supplied: `p = pluginPrincipalOf(dao, wallet)` (errHnwl for a non-genuine wallet,
    errNath outside a window), key = `p.principal`. Every hook call is sent as S, to the pinned hook only, with
    `windowHint(wallet)` last and `rekeyAddress(rekeyBack, wallet)` (custody rule 3(c)).
- Rollout: catalog entry `GatedFeePassPlugin` (`scripts/lib/immutable-catalog.json`, `dependencies: { hook: GatedFeeHook }`,
  `plugin: true`, no SDK registry key) and appended to `pluginDexDeployOrder` after `LaunchManager`
  (`scripts/lib/immutable-deployment.ts`; `tests/migration-dry-run.test.ts` updated). The header of
  `scripts/principal-phase3-plugins.ts` names it.
- **Phase 3 gate item (request to the spec owner, §7.1 row 3 and §6.11):** deploy `GatedFeePassPlugin` pinned to
  the GatedFeeHook, and ship its id with the PluginDex launch, **before any pool installs GatedFeeHook**. Without
  it every wallet user pays the full fee. I did not edit PHASE-0-SPEC.md.
- Not done: no akita-sdk wrapper class (the router has none either); the generated
  `GatedFeePassPluginClient` is in `akita-sdk/src/generated`. No SDK networks id until deployed.

### Finding 3 (medium, CONFIRMED): no e2e of this track has run — still pending

- LocalNet still down at 16:53 (`curl localhost:4001/health` timed out). Nothing ran on LocalNet.
- Pending, wrapped in `with-localnet-lock.sh`: `plugin-dex/**` e2e, `arc58/plugins/akita-router/akita-router.e2e.spec.ts`,
  `utils/origin-spoofing.e2e.spec.ts`, `utils/principal.e2e.spec.ts`, `tests/migration-scripts.e2e.spec.ts`
  (now also deploys `GatedFeePassPlugin`), then the full `npm test` against the 1,780 / 0 baseline. Record the
  `measurements` figures (gated quote/swap with and without a hint) and router G1/G2 here when they run.

### Tests

- New e2e (written, not run) in `plugin-dex/hooks/gated-fee.e2e.spec.ts`, describe "principal resolution":
  - router swap into a pool whose hook's DAO names another factory: (a) Wd default window, (b) a raw-TEAL
    non-factory ARC-58 wallet stand-in claiming a pass holder as `controlled_address`, with A rekeyed to the
    router. Both swap at the full fee, quote == swap, the claimed holder's pass is not used or counted, A is
    handed back; the same hint at top level still reverts errHnwl.
  - `GatedFeePassPlugin`: errNath outside a window; open (default window), refresh and refreshFromGate (escrow
    window; wrong gate id errGfgt), close with the refund to the funder, reopen from the escrow window, router
    swaps at 50 bps from both windows, close on a discounted day errGfdy; a plugin pinned to a hook of
    another factory errHnwl; create with a non-hook app errGpHk.
- Static (ran): `plugin-dex/principal-abi.test.ts` asserts the fallback's guard and position, and the pass
  plugin's ABI (no key or hook argument), pinned hook, S sender, `windowHint` on all four hook calls; the
  registry scan includes `arc58/plugins/gated-fee-pass`.
- Ran: akita-sc unit tests 138/138 (`vitest run .test.ts`); `tsc --noEmit` has no error in a file I touched;
  akita-sdk rebuilt.

---

## 2026-10-04 — Social track, review fixes: legacy payment terms pinned to the deployed plugins; SocialSDK per-network target switch

### Finding 1 (medium, CONFIRMED): the shims re-opened the MBR under-charges for every caller — fixed here

Verified: before this fix, `legacy` alone selected the deployed payment terms, so an EOA calling an old selector
directly (for example `vote(pay,axfer,byte[],uint64,bool)void` on a fresh Address ref, then `editVote(…,false)`)
left AkitaSocial 20,100 µA poorer per materialized ref (13,600 per reply, 800 per post), plus the absorbed
up-vote/react referral MBR.

Fix (`social/contract.algo.ts`, `social/constants.ts`):
- New private `legacyTerms(legacy)`. It is true only when `legacy` is set AND `Global.callerApplicationId != 0` AND
  either the network is not MainNet (`Global.genesisHash != MainNetGenesisHash`) or the caller app is one of the four
  pinned MainNet social plugins: `LegacySocialPluginDecember` 3,368,400,007, `LegacySocialPluginMay` 3,569,562,087,
  `LegacySocialPluginV002` 3,633,295,088, `LegacySocialPluginV003` 3,643,581,007 (= `MAINNET_PLUGIN_DEPLOYMENTS.socialPlugin`).
- Only the PAYMENT TERMS use `legacyTerms`: the 46,500 posts base (`validatePostPayment`), the reply parent-ref charge,
  the never-voted votes-box charge and the materialized posts box (`voteImpl`), the up-vote/react referral MBR
  (`createVote`, `createReaction`) and the 18,900 reaction quote (`validateReactPayment`). The other legacy semantics
  (registry referrer, raw `meta.wallet` tip route, gate subject `Txn.sender`) still apply to every old-selector caller.
- A top-level sender of an old selector now pays exactly the hinted method's MBR (no drain).

Deviations / decisions (flag for Kyle):
1. **Network-dependent branch.** A pure id pin cannot be tested on LocalNet: the deployed-plugin copy that
   `deployed-compat.e2e.spec.ts` deploys has another id, so P2-SOC-01 would lose its coverage. So off MainNet any app
   caller gets the legacy terms (TestNet ALGO has no value; TestNet's own old social plugins keep working). The MainNet
   branch cannot run on LocalNet. `social/legacy-abi.test.ts` instead checks the pins against the SDK's MainNet
   deployment record and the compiled TEAL. I did not choose a DAO-set allowlist: AkitaSocial has no DAO-callable
   setter path that is not through the social plugin (8,030 / 8,192 B), and the allowlist would have to be set before
   the upgrade executes, or every deployed-plugin call reverts.
2. **Genesis hash source.** `MainNetGenesisHash = wGHE2Pwdvd7S12BL5FaOP20EGYesN73ktiC1qzkkit8=`. I recomputed it
   locally as sha512_256("GE" || canonical msgpack of `~/.algorand/genesis.json`, network mainnet, id v1.0) and did
   not read it from any MainNet endpoint.
3. **Behaviour change Kyle must accept explicitly:** after the Phase 2 AkitaSocial upgrade, an OLD direct SDK
   (pre-hint `client.send.post` etc.) that quotes the deployed terms gets `errInvalidPayment` on post, reply,
   ref-materializing vote and react. initMeta, editVote (delete), follow and paywall creation are not affected by the
   shim terms. The deployed social plugins keep working unchanged.
4. **Residual drain (rollout checklist item).** A user can still install a deployed plugin (for example 3643581007) on
   a wallet and call through it to get the legacy terms. Each call costs the AKTA fee plus the wallet and plugin
   setup. Per-call loss to AkitaSocial's free balance: 800 µA per post, 13,600 per reply, 20,100 per materialized vote
   ref, plus the up-vote/react referral disbursement MBR when the sender has a registry referrer. React is −3,200
   (the app keeps the 18,900 − 15,700 surplus). **Monitor AkitaSocial's free balance from the Phase 2 execution
   until Phase 4 removes the shims, and top it up.**
5. AkitaSocial approval: **10,884 B** (was 10,740), still 5 extra pages.

### Finding 2 (medium, CONFIRMED): SocialSDK always called the hinted overloads — fixed here

Verified: with the earlier change, every SocialSDK write called a hinted selector, and gated paths needed
`Gate.mustCheckFor`. MainNet AkitaSocial 3569557130, AkitaSocialGraph 3569557033 and Gate v1 have neither, so
an akita-sdk publish before Phase 2 would break every direct social write on MainNet.

Interfaces other tracks must know:
- `akita-sdk/src/networks.ts`: `SOCIAL_HINTED_TARGETS: Record<AkitaNetwork, boolean>` = `{ localnet: true, testnet:
  false, mainnet: false }` and `socialHintedTargets(network, explicit?)`. Both are exported from the package root and
  `config`. **Rollout: flip testnet/mainnet to `true` in the release that records the EXECUTED Phase 2
  AkitaSocial/AkitaSocialGraph upgrade on that network** (update track: add this to the Phase 2 checklist next to
  `REGISTRY_WRITES_STOPPED`). Between that execution and the flipped release, flag-false SDKs get the same
  errInvalidPayment as in finding 1 item 3. Ship the flip promptly.
- `SocialSDKConstructorParams.hintedTargets?: boolean` overrides the network default. `SocialSDK.hintedTargets` is public.
- When `hintedTargets` is false, SocialSDK behaves as follows:
  - post, editPost, reply/gatedReply, vote, invertVote/deleteVote, react/gatedReact, initMeta and gated follow call
    the legacy selectors without `wallet`.
  - A non-zero `wallet` hint throws locally before anything is sent.
  - `setMetaWallet` throws.
  - Gated writes expect a caller-built `Gate.mustCheck` txn (Gate v1).
  - The MBR calculators quote the deployed contract: posts base `LEGACY_MIN_POSTS_MBR` 46,500, no
    `REPLY_PARENT_REF_MBR`, a materialized vote ref = `VOTELIST_MBR + LEGACY_MIN_POSTS_MBR`, reaction
    `REACTIONLIST_MBR` 18,900, paywall base `LEGACY_MIN_PAYWALL_MBR` 5,200. The paywall base also changed in the
    working tree (9,300), so it needs the same switch.
- When `hintedTargets` is true (LocalNet default), behaviour is unchanged from the social-track entry above.

### Tests

- `smart_contracts/social/legacy-abi.test.ts` (unit, **ran: 14/14**, 3 new). The four pins equal
  `MAINNET_PLUGIN_DEPLOYMENTS.socialPlugin`. The genesis-hash constant is the 32-byte mainnet-v1.0 hash. The
  compiled `legacyTerms` reads `CallerApplicationID` and `GenesisHash` and pushes every pinned id.
- `akita-sdk/src/social/index.test.ts` (unit, **ran: 59/59**, 30 new). Covers:
  - Flag values and the explicit override.
  - Every write calls the legacy selector without `wallet` when the targets are not upgraded, and never a hinted one.
  - A non-zero hint is refused before any send, and `setMetaWallet` is refused.
  - Ungated follow is unchanged.
  - Deployed MBR quotes for post, reply, editPost, materialized vote, react and paywall, against the hinted quotes.
  - The constructor default per network (mainnet false, localnet true) and the override.
  - Full SDK suite: **446/446**. SDK rebuilt (`npm run build`: tsup and declarations both succeeded).
- `smart_contracts/social/principal.e2e.spec.ts` (LocalNet, **NOT RUN**). The four §7.2 cases now assert the fix
  for a top-level sender of an old selector:
  - The deployed quote is refused (`errInvalidPayment`).
  - The corrected quote passes and leaves the same free-balance delta as the hinted method (post, reply, react).
  - The review scenario (old-selector vote that materializes a ref, then old-selector `editVote(false)`) leaves no drain.
  - The legacy terms themselves stay covered through the deployed plugin program in `deployed-compat.e2e.spec.ts`
    (header comment updated; no assertion changed).

### Status / pending

- **LocalNet down** (`curl localhost:4001/health` timed out at 16:59). I did not touch it. Not run:
  `smart_contracts/social/principal.e2e.spec.ts`, `smart_contracts/arc58/plugins/social/deployed-compat.e2e.spec.ts`,
  `smart_contracts/arc58/plugins/social/principal.e2e.spec.ts`, `smart_contracts/social/social.e2e.spec.ts`,
  `smart_contracts/arc58/plugins/social/social.e2e.spec.ts`, and the full `npm test`. Run with
  `with-localnet-lock.sh social npx vitest run smart_contracts/social smart_contracts/arc58/plugins/social`.
- Built with `build-contracts.mjs`: `social/contract.algo.ts` only (clients regenerated). `tsc --noEmit` (akita-sc)
  reports no error in any social file. SDK `tsc -p tsconfig.esm.json` is clean.

---

## 2026-10-04 — Auction/Raffle track, review fixes: deployed RafflePlugin creation ABI restored, legacy raffle creation is a hard break, S != C e2e cases

This section corrects the "Auction/Raffle track" section above. Where the two disagree, this section is correct.

### Verdicts

| # | Finding | Verdict | Evidence |
|---|---|---|---|
| 1 | Medium: RafflePlugin v3 changed the deployed `newRaffle` / `newPrizeBoxRaffle` ABI | **Confirmed, fixed** | Deployed 3569561863 (vendored `raffle/compat/deployed/RafflePlugin.arc56.json`): `newRaffle(uint64,bool,uint64×7,uint64,address,string,byte[32][],uint64)uint64` (14 args) and `newPrizeBoxRaffle(…)` (11 args). v3 had only the `minEntries` forms (15 / 12 args). The earlier unit test compared v3 with itself, not with the deployed spec. |
| 2 | Medium: legacy Raffle creation shims are unreachable for deployed-era callers | **Confirmed. Logged as a hard break; shims kept pending Kyle (D-R2)** | HEAD SDK `RaffleFactorySDK.cost()` (`e7f174ee`) hard-codes 21 uints / 9 byte slices (1,448,500 base). The new child is 23 / 10. The shim requires `payment.amount === totalMBR`, so an old SDK pays 107,000 µA too little and gets `errIpay`. The deployed factory has no `newRaffleCost`, so an old caller cannot re-quote. |
| 3 | Medium: no S != C or ASA hinted e2e cases; nothing ran | **Confirmed. Cases added; still not run (LocalNet down)** | All earlier gated cases used default windows (S == C == W.address). |

### Fix 1: RafflePlugin v3 keeps every deployed signature

- `newRaffle` and `newPrizeBoxRaffle` are again the DEPLOYED signatures. They create with `minEntries = 0` (at least one entry). The seller can raise it with `setMinEntries` before the first entry.
- The v2 `minEntries` forms stay as second overloads (`@abimethod({ name: 'newRaffle' })` `newRaffleWithMinEntries`, same for `newPrizeBoxRaffle`). Both overloads call one private impl, which calls the hinted factory method with `windowHint(wallet)`.
- Result: a method-restricted grant that holds the deployed `newRaffle` selector keeps working after the §7.3 app-id swap. An old SDK wrapper that builds the 14-argument call also keeps working. No spec deviation remains for this plugin.
- **Size:** RafflePlugin approval grows from 3,942 B to **4,304 B**. It now needs **2 extra pages** (was 1), which adds +100,000 µA to the one-time creator MBR at the Phase 3 deploy.
  - `deployImmutable` and the typed factory compute pages from the program size, so no script changes.
  - The one hard-coded `extraProgramPages: 1` (`raffle/principal.e2e.spec.ts`, P2-REF-02) is removed.
  - Rejected alternative: drop the `minEntries` overloads (keeps 1 extra page). That would make `minEntries` impossible to set atomically at creation. Kyle can choose this; it is a one-file change.
- **SDK** (`akita-sdk/src/wallet/plugins/raffle.ts`; outside this track's list, but it is the raffle plugin's only wrapper):
  - `newRaffle(args)` / `newPrizeBoxRaffle(args)`: if `minEntries` is absent or 0, they send the deployed form, which works on every plugin generation. If `minEntries > 0`, they send the overload (v3 only).
  - Without args, the hooks carry BOTH selectors, so a new method restriction allows either form.
  - New exports: `RAFFLE_PLUGIN_NEW_RAFFLE`, `RAFFLE_PLUGIN_NEW_RAFFLE_MIN_ENTRIES`, `RAFFLE_PLUGIN_NEW_PRIZE_BOX_RAFFLE`, `RAFFLE_PLUGIN_NEW_PRIZE_BOX_RAFFLE_MIN_ENTRIES` (full signatures). `NewRaffleArgs.minEntries` is now optional.
- **New plugin methods beyond the deployed ABI** (grants that are method-restricted must add them explicitly at reinstall, as with `setMetaWallet`):
  - RafflePlugin: the two `minEntries` overloads, plus `setMinEntries`, `refundMBR`, `clearWeightsBoxes` (v2 audit additions).
  - AuctionPlugin: `refundMBR` (v2 audit addition).
  - A unit test pins this list.
- **Request to the rollout track (not applied):** if `PHASE3_NEW_METHODS` gains raffle entries, name the overloads by FULL signature. `newMethodSelector` calls `getABIMethod(name)`, which is ambiguous for `newRaffle` now.

### Fix 2: legacy raffle creation is a hard break for deployed-era SDK callers

- **Correction to deviation 4 above.** It said that the deployed creation paths "were already dead on MainNet". That is true only for the deployed PLUGINS. The HEAD SDK's direct `RaffleFactorySDK.newRaffle` / prize-box path matched the deployed factory exactly, so it worked until the Phase 2 upgrade.
  - After Phase 2 it fails `errIpay`. The shortfall is **107,000 µA**: 57,000 for the 2 extra uints of the audit ride-along, plus 50,000 for `seller_referrer`.
  - So frontends must ship the new SDK (hinted `newRaffle` + on-chain `newRaffleCost`) in lockstep with the Phase 2 RaffleFactory upgrade.
- **Auction is not affected.** The HEAD SDK and the old ABI quote through on-chain `newAuctionCost`.
- **P2-REF-01 for Raffle** is proven only for an old-ABI caller that quotes `newRaffleCost` (`MockLegacyNftCaller`). No deployed-era caller does that.
- **D-R2 (Kyle to decide):** the shims are kept for now. They cost factory program bytes (RaffleFactory 4,197 B) and serve only hypothetical third-party callers that combine the old selector with the new quote. The two options:
  - (a) Delete `legacyNewRaffle` / `legacyNewPrizeBoxRaffle` (hard cutover for raffle creation, §7.2 option 2).
  - (b) Make them accept the deployed-era amount. This needs a per-raffle factory float, as the Marketplace fix did (`factory_float` + reserve). The refund path (`refundReleased`, recorded = funder amount including the fee) cannot recover a float without a new child global. That adds +28,500 µA, and the child has 247 B of headroom.
  - Recommendation: (a), unless a third-party integrator is known.
- New unit test (`auction/principal-abi.test.ts`) pins the 107,000 shortfall: schema delta, same page count, and no cost method on the deployed factory.

### Fix 3: e2e cases (written and typechecked; NOT run, LocalNet down)

Both `auction/principal.e2e.spec.ts` and `raffle/principal.e2e.spec.ts` gain a describe block `S != C`. Its gate is an asset gate on a BADGE ASA. This is a plain sub-gate, so it evaluates `ctx.principal`. Only principals hold BADGE.

| Case | Window | Expected |
|---|---|---|
| E4 | named escrow `'e'` of a default wallet (S = Eb, principal = Wb.address) | v3 gated bid / enter + add pass; state is keyed by the escrow (Q5) |
| E4 + ASA | same | hinted `gatedBidAsa` (auction) and `gatedEnterAsa` + `gatedAddAsa` (raffle) pass; the escrow's ASA balance drops by the amount |
| external C, default | S = C | pass |
| external C, escrow | S = Ex, principal C via `auth(C) == Wx.address` | pass |
| negative | Wn: the escrow holds BADGE, Wn.address does not | `errFgte` (the gate never sees the spender) |

- Each pass also proves that the plugin-side `pluginPrincipalOf` ctx, built before the RekeyTo, byte-matches the target-side `principalOf` ctx, built after it.
- **Legacy `gatedBidAsa` shim on a new child** (auction): another caller's gate gives `errFgte`; the bidder's own gate passes.
- **P2-GATE-03 variants at the target** (both): a ctx with the right principal but `wallet = Wd` gives `errFgte`. A ctx with the right principal but another `spender` gives `errFgte`. For raffle this applies to `enter` and `add`.
- **§7.3 grant carry-over** (raffle): a wallet whose RafflePlugin grant is restricted to the DEPLOYED `newRaffle` selector creates a raffle through v3. The result has `seller_referrer = R1` and `minEntries = 0`. The `minEntries` overload is refused by the restriction.

### Tests run

- akita-sc unit tests (`npx vitest run --exclude '**/*.e2e.spec.ts'`): **151/151**. This includes `auction/principal-abi.test.ts` **19/19**, with two new tests: all deployed plugin signatures are still present, and the exact list of additions.
- akita-sdk `vitest run`: **446/446**, including the new `src/wallet/plugins/raffle.test.ts` (4).
- akita-sdk `npm run build`: OK. `tsc --noEmit` reports no error in any file of this track (akita-sc `-p .`, akita-sdk `-p tsconfig.esm.json`).
- Built: `arc58/plugins/raffle/contract.algo.ts` only. The factories and children are unchanged by this fix.

### Pending (LocalNet down: `curl localhost:4001/health` timed out at 16:4x and 17:0x; it was not started or reset)

These must pass under `with-localnet-lock.sh auction-raffle` before the track is done:
- `smart_contracts/auction/principal.e2e.spec.ts`
- `smart_contracts/raffle/principal.e2e.spec.ts`
- `smart_contracts/auction/auction.e2e.spec.ts`
- `smart_contracts/raffle/raffle.e2e.spec.ts`
- `smart_contracts/arc58/plugins/auction/auction.e2e.spec.ts`
- `smart_contracts/arc58/plugins/raffle/raffle.e2e.spec.ts`: its `minEntries: 2n` creation now uses the overload.
- `tests/migration-scripts.e2e.spec.ts`
- the full `npm test` (baseline 1,780 passed / 0 failed)

---

## 2026-10-04 — Update-plugin track: review fixes (Phase 2a deadlock, voted windows, Phase 3 guard, ABI ride-along, plugin identity)

Supersedes fact 3 and deviation 2 of the earlier "Update-plugin track" section. All five review findings were real.

### Finding 1 (critical): Phase 2a deadlocked the MainNet rollout. Fixed with a contract change to the (undeployed) Phase 2a plugin

- Verified against the MainNet fixture: the deployed DAO 3569556034 has no `isUpgradeLease`, no `arc58_changeAdmin`, no
  ChangeAdmin action, and its wallet admin is the DAO app address (it can never be the top-level sender of
  `arc58_rekeyToPlugin`). The tree DAO also forbids ChangeAdmin in bootstrap proposals (DAO-01). So the "admin route" did
  not exist, and once Phase 2a repointed `pal.update`, every execution-key upgrade (the DAO's own included) reverted at
  `isUpgradeLease`.
- **Contract change** (`smart_contracts/arc58/plugins/update-akita-dao/contract.algo.ts`, `stubs.ts`; plugin is undeployed;
  inside the approved Phase 2a scope; **Kyle should still confirm**): `requireUpgradeExecution` now has two reads of the DAO
  record. Both bind the lease to an UpgradeApp action naming the target; neither is weaker:
  - default (unchanged DAO-03 behaviour): `DAO.isUpgradeLease(target, lease)`, box `'u' + itob(target)`;
  - when the plugin call's `Txn.note == "akita:upgrade-binding:proposal"`: `DAO.mustGetExecution(lease)` gives
    `(proposalID, index)` (both DAOs write `executions(lease)` for UpgradeApp actions only), then `DAO.getProposal(proposalID)`;
    `actions[index]` must be an UpgradeApp with `app == target` and `executionKey == lease` (else `errNupx`). Both methods exist
    with identical signatures on the deployed and tree DAOs.
  - the admin branch issues as many `opUp` inner calls as the selected read (1 or 2), so admin-simulated fees stay exact.
  - Why a note and not detection: AVM cannot read another app's boxes or a > 4 KB program, and no DAO global reliably tells
    the versions apart. The note only selects the read; both reads are secure on both DAOs; the lease read reverts on the
    deployed DAO (fail-safe).
  - Residual on the DEPLOYED DAO only: it does not refuse re-use of a lease (no `assertFreshLease`), so a later proposal that
    re-registers an executed UpgradeApp lease for the same target is still accepted. Today's deployed plugin has no binding at
    all, and the MainNet DAO is in Draft (creator-only proposals). Closes when the DAO is upgraded.
- The plugin compiles from the integrated tree again: the earlier "Contract reference must resolve to a contract class" error
  was an import-order cycle (`utils/functions` → `social/impact.algo` → `subscriptions/contract.algo`). Importing
  `utils/functions` first in the plugin fixes it. New artifact: approval 2,559 B, sha256
  `69b4f14c3661c3143f85815ffba9135e7e0eaed6dc3e8cf1577590edfaca338d` (ABI unchanged).
- **SDK interface (other tracks):** `UpdateAkitaDAOPluginSDK.updateApp / updateFactoryChildContract / updateAkitaDaoAppIDForApp /
  updateAkitaDaoEscrowForApp` accept `daoBinding?: { lease: string | Uint8Array; proposalId: bigint }`. It adds the note
  (`UPGRADE_BINDING_NOTE_PROPOSAL`, exported from `akita-sdk/wallet`) and box references `'x' + lease` and
  `'l' + itob(proposalId)` on the DAO. The proposal id must be known when the group is built: for a new proposal it is the
  DAO's `proposal_id` read before `newProposal` (the rollout checks the created id equals it). SDK dist rebuilt.
- **Rollout order is now free:** Phase 2a → (DAO upgrade via `principal-phase2-upgrade-targets.ts --target AkitaDAO`, any time)
  → Phase 2 targets. `scripts/lib/principal-rollout-run.ts` picks the read from the live DAO (`daoBindingMode`: `lease` if the
  DAO has `isUpgradeLease`, else `proposal`). `runPhase2a` and Phase 2 now REFUSE (not warn) when the DAO supports neither
  read, and `runPhase2a` refuses a plugin artifact that lacks the Phase 2a markers.
- **Other tracks:** the shared `script-base.ts` `runUpdate` (all `update-*.ts`) does not pass `daoBinding`, so on MainNet,
  after Phase 2a and BEFORE the DAO upgrade, those scripts revert (fail-safe). Use `principal-phase2-upgrade-targets.ts`, or
  upgrade the DAO first.
- `getProposal` returns the whole proposal in one log (≤ 1,024 B). The rollout computes the size (`proposalReturnSize`) and
  refuses a larger UpgradeApp proposal. 10 windows per action fit even with two actions (899 B).

### Finding 2 (high): voted Phase 2 windows expired during the vote. Fixed

`planExecutionWindow`: before initialization the window starts now (2,000 rounds). On a fully initialized DAO it opens
`--lead-rounds` (2,000) before the estimated vote end (`upgradeApp` duration ÷ measured seconds per round, `--round-seconds`
override) and lasts `--window-rounds` (10,000 rounds = 10 groups). `--first-valid` overrides. `--submit` submits the draft at
once (the estimate assumes it). Windows in rounds are converted for grants that count in seconds (`windowSizeArg`). Resume
(`--proposal-id`) rebuilds with the recorded window, lease and (proposal read) proposal id, then re-stamps. A target whose
window has not opened yet reports `scheduled` (re-run with the proposal id); an expired window is an error.
Not covered: an e2e on a voting DAO (initialize + stake + vote + TimeWarp). The future-window/resume mechanics are covered on
the Draft DAO (P2-UPD-01 "window that opens later").

### Finding 3 (medium): Phase 3 had no Phase 2 guard. Fixed

`PHASE3_PLUGINS[].dependencies` lists every app a plugin calls: the singletons, the child program each factory stages for new
children, and the DAO's Gate (`akitaAppList.gate`; the social and staking-pool plugins call `Gate.mustCheckFor`, and Gate v2
is a separate deployment). The plugin program embeds the selector of every method it calls, so the required set is computed
(`calledSignatures`), not hand-listed. `runPhase3` checks it before any deploy or swap and refuses on a gap unless
`--allow-unupgraded-targets` (dry run: "WOULD REFUSE").

### Finding 4 (medium): ABI breaks rode along silently. Fixed (refusal + list); no shim added

`scripts/lib/principal-deployed-abi.json`: the ARC-4 signatures of the 10 deployed programs, keyed by approval sha256 (from
the HEAD artifacts whose hash equals the MainNet fixture). Phase 2 diffs every upgrade against it, prints added/removed
methods, and refuses a removal unless `--accept-removed <sig|all>`, or an unknown live program unless `--accept-unknown-abi`.

**Ride-along list (spec §7.1 point 3), deployed MainNet program → this tree's artifact:**

| Target | Removed | Added |
|---|---|---|
| AbstractedAccountFactory | `newAccount(pay,address,address,string,address,byte[32],string,uint64,uint64[],(…)[])uint64` | the same with a `bool` (`automaticUpdates`) inserted after the second `string` |
| AkitaSocial | none | 12 (hinted post/reply/vote/react/edit*/gated*, `initMeta(…,address,bool,…)`, `setMetaWallet`) |
| Subscriptions | none | 11 (hinted subscribe*, gated*, `adoptPrincipal`, `clearOrphanPasses`, `triggerGateCtx`, `newService*`) |
| Marketplace | none | 5 (`list`, `listCost`, `listPrizeBox`, `gatedPurchase*`) |
| StakingPoolFactory | none | 2 (`newPool`, `newPoolCost`) |
| AuctionFactory | none | 2 (`newAuction`, `newPrizeBoxAuction`) |
| RaffleFactory | none | 3 (`newRaffle`, `newRaffleCost`, `newPrizeBoxRaffle`) |
| AkitaSocialGraph | none | 1 (`gatedFollow`) |
| AkitaDAO (`--target AkitaDAO`) | none | 4 (`cancelProposal`, `clearBootstrapKeys`, `getProposalTally`, `isUpgradeLease`) |

Spec §6.1 says `newAccount` is unchanged; the wallet track's `automaticUpdates` param breaks the deployed selector (frontends on
the current SDK and any contract calling it). **Request to the wallet track / Kyle:** add a legacy 10-argument `newAccount` shim
or accept the break explicitly (`--accept-removed`). Children (Listing, StakingPool, Auction, Raffle, wallet) only affect NEW
instances (Q8).

### Finding 5 (medium): Phase 2a plugin identity by exact artifact hash. Fixed

`isPhase2aUpdatePlugin`: by behaviour (selectors `updateAppWithSchema`, `setClearProgram`, `isUpgradeLease`, `mustGetExecution`,
`getProposal` present, and `akita_dao` == this DAO). Used for "pal.update already done" (Phase 2a re-run) and by Phase 2's
precondition. `--plugin-id` must still run this tree's artifact OR the approval hash its `--manifest` receipt recorded, and pass
the behaviour check. The artifact was recompiled from the integrated tree (above); deploying an older artifact that lacks the
proposal read is refused by the marker check.

### Tests

- `update-akita-dao/rollout.test.ts` (unit, 35, **pass**): both DAOs' binding reads; plugin markers and note; no deadlock on the
  deployed DAO; `runPhase2a` refuses a DAO without either read (stubbed chain); window planning, seconds↔rounds conversion,
  `getProposal` size vs real ABI encoding; deployed-ABI snapshot and the ride-along list; ABI acknowledgment refusals; Phase 3
  gaps (deployed AkitaSocial/Subscriptions refused, missing Gate refused, every declared dependency really called).
- `akita-sdk/src/wallet/plugins/update-akita-dao.test.ts` (unit, 5, **pass**): `daoBinding` note and box references; string
  lease encoded as `usePlugin` encodes it; refusal without a DAO.
- `update-akita-dao/rollout.e2e.spec.ts` (P2-UPD-01, LocalNet, **not run**): the DAO now runs the DEPLOYED DAO bytes (pushed by
  the tree plugin first); the deployed plugin pushes neither tree AkitaSocial nor tree DAO; Phase 3 refuses while AkitaSocial
  is un-upgraded (no app created; override passes the guard); Phase 2a on the deployed DAO (`daoBindingMode: 'proposal'`);
  Phase 2 AkitaSocial on the deployed DAO; the DAO's own upgrade through the new plugin; then RaffleFactory combined, split and
  a window that opens later (`scheduled` → TimeWarp → resume) on the upgraded DAO; ExecutePlugin refusals after the upgrade.
- `update-akita-dao/update-akita-dao.e2e.spec.ts` (LocalNet, **not run**): two DAO-03 tests for the proposal read (approved
  target upgrades; app-A action carrying an app-B group → `errNupx`).

### Status / pending

- LocalNet down (algod/KMD no response at 17:05). Pending under
  `with-localnet-lock.sh update-plugin npx vitest run smart_contracts/arc58/plugins/update-akita-dao tests/migration-scripts.e2e.spec.ts`,
  then the full `npm test`.
- Ran: `rollout.test.ts` 35/35, SDK `src/wallet` 82/82, `tests/migration-dry-run|ctx-sub-gates|principal-sync|logged-error-codes` 29/29.
  `tsc --noEmit`: 9 errors, none in this track's files (deploy-gates, deploy-rewards-v2, dao.voting, guild test-helpers,
  launch-hooks, staking-pool e2e).

---

## 2026-10-04 — Compatibility suite (§7.1 "Compatibility baseline = deployed bytecode", §7.2, P2-CMP-01)

### What it is

`projects/akita-sc/tests/compat/` holds the suite. The baseline is the **bytes MainNet runs**, not a committed source
or ARC-56 file.

| File | Role |
|---|---|
| `baseline.ts` | Manifest of every "old" program by MainNet app id: the 8 Phase 2 targets, the 5 factory `bc` child programs, 2 live listings, the DAO wallet, Gate v1, the DAO, the EscrowFactory, and every plugin generation of `MAINNET_PLUGIN_DEPLOYMENTS` for the 6 affected families (15 plugins). `FAMILY_TARGETS` maps each family to its upgraded targets, old/new child, new plugin and ABI marker. |
| `fetch-mainnet-programs.ts` | **Read-only.** It sends only `GET /v2/applications/{id}` and `GET /v2/applications/{id}/box?name=b64:YmM=`, to `mainnet-api.4160.nodely.dev` by default. It has no signer and builds no transaction. It disassembles each program offline (`goal clerk compile -D`) and writes the two fixtures. `--check` re-reads MainNet and fails on drift. It ran on 2026-10-04 and reported 34/34 programs equal to the snapshot. |
| `fixtures/mainnet-programs.json` | Approval/clear bytes, sha256, schema, pages, decoded globals, git provenance (the commits whose artifact `byteCode` equals the deployed bytes) and **facts** from the disassembly: the router table (= the deployed ABI), `createRoutes`, the 4-byte constants that are not routes (= the selectors the program calls), the int constants and the printable byte constants. |
| `fixtures/signature-catalog.json` | Selector → ARC-4 signatures, from every working-tree ARC-56 and every committed version of the catalog artifacts (`git show`, read-only). It names the routes and calls in the facts. |
| `lib/teal-facts.ts` | Parser shared by the deployed disassembly and the puya TEAL of the working-tree artifacts. On the three programs checked (AuctionPlugin, AkitaSocial, AkitaSocialPlugin), both sources give byte-identical facts. |
| `lib/snapshot.ts`, `lib/analysis.ts` | Loaders and static analysis (no network, no `goal`). |
| `lib/install.ts` | LocalNet installers. They create apps from the snapshot bytes and check each install's on-chain sha256 against MainNet. They can also turn a genuine wallet into a **live** wallet: its admin installs the MainNet wallet program through `update(string)void`. |
| `compat-static.test.ts` | Unit test (120 tests, run, all pass). |
| `compat.e2e.spec.ts` | LocalNet half. **Not run.** |
| `members.ts` | The per-track specs that are part of the suite. They own the deep per-family flows, in particular every P2-REF-02 (new plugin on an OLD child). |

**Run the whole suite** (from `projects/akita-sc`):

```
with-localnet-lock.sh compat npx vitest run tests/compat \
  smart_contracts/arc58/plugins/social/deployed-compat.e2e.spec.ts smart_contracts/subscriptions/compat.e2e.spec.ts \
  smart_contracts/marketplace/compat.e2e.spec.ts smart_contracts/staking-pool/principal.e2e.spec.ts \
  smart_contracts/auction/principal.e2e.spec.ts smart_contracts/raffle/principal.e2e.spec.ts \
  smart_contracts/arc58/plugins/update-akita-dao/rollout.e2e.spec.ts smart_contracts/utils/origin-spoofing.e2e.spec.ts \
  smart_contracts/arc58/account/reclaim.e2e.spec.ts
```

### Static checks (`compat-static.test.ts`, all pass)

- **CMP-S1** Snapshot integrity:
  - The recorded bytes hash to the recorded sha256, and the stored facts equal a fresh offline disassembly.
  - Both live listings run the Listing `bc` program, and the DAO wallet runs the wallet factory's `bc` program.
  - Every in-scope program equals a committed artifact, except social plugin **v0.0.2** (3633295088), which was deployed from an uncommitted build. The MainNet bytes are its only baseline; the catalog names all of its routes.
- **CMP-S2** Scope, from the recorded globals:
  - In-scope plugins are pinned to DAO 3569556034 and to the Phase 2 factories.
  - All six December-2025 plugins are pinned to the December DAO 3368388956 or to its factories, so they are out of scope with evidence.
- **CMP-S3** The per-track fixtures (social, subscriptions, staking-pool, marketplace, auction/raffle vendored ARC-56, update-plugin `fixtures/mainnet-deployed.json`, `scripts/lib/principal-deployed-abi.json`) all hash to this snapshot. So every track tested against the same MainNet bytes. The ABI list that Phase 2 refuses against equals the router tables.
- **CMP-S4** Every deployed route of the 8 Phase 2 targets is still routed by the working tree. The one exception is the known ride-along removal of the 10-argument `AbstractedAccountFactory.newAccount`.
- **CMP-S5** (static P2-CMP-01): every selector that each in-scope old plugin generation calls on a deployed program is still routed by that program's working-tree counterpart: the upgraded singleton, the new child, Gate v2, the current wallet program or the EscrowFactory. **There are no gaps.**
- **CMP-S6** (static P2-REF-02):
  - Each new plugin still makes every old-child call of the newest deployed generation. The exceptions are `Auction.cancel()`/`deleteApplication()` and `Raffle.deleteApplication()`. The deployed children assert `Txn.sender == creator` for these, so the deployed plugins' direct calls always reverted. The new plugins go through the factory instead (`cancelAuction`, `deleteAuctionApp`, `deleteRaffle`), and the upgraded factory routes those.
  - Each new plugin reads its marker (`pv`, `seller_referrer`). The marker is absent from the old child program and present in the new one.
  - Each new plugin builds both `mustCheck` and `mustCheckFor`, and sends the deployed gated ABI to old children. The new child also routes that ABI (as shims).
- **CMP-S7** Every wallet method a new plugin calls is routed by the **deployed** wallet program, and no new plugin calls a selector that no program serves.
- **CMP-S8** (exact terms):
  - Marketplace: the deployed plugin hard-codes 756,500 (`LegacyListingCreateMbr`) and has no on-chain quote.
  - Social: all in-scope social plugins hard-code 46,500 (`LegacyMinPostsMBR`) and 18,900 (`ReactionlistMBR`), and their ids are the four `legacyTerms` pins.
  - Staking-pool: the May plugin hard-codes 50,600 = `PoolEntriesMBR + PoolEntriesByAddressMBR` and 18,900 = `PoolUniquesMBR`. The July plugin quotes through the deployed `enterCost` selector, which the new child keeps.
  - Raffle: the deployed plugin pays 50,600 = `EntriesMBR + EntriesByAddressMBR`, which is unchanged.
  - Auction: the deployed plugin under-quotes the new child's bid MBR by exactly 800 µA (finding 5 of the auction track).
  - Subscriptions: the deployed plugin quotes through the legacy cost selectors, which are still routed.
- **CMP-S9 / CMP-S11** Known-gap tripwires (findings below). **CMP-S10** checks suite membership.

### LocalNet half (`compat.e2e.spec.ts`, NOT RUN: LocalNet down)

- **A. Install fidelity:**
  - Every in-scope plugin generation is created from its MainNet program, and its sha256, pages and schema are checked.
  - The four deployed factories are created from MainNet bytes and stage their MainNet `bc` child program byte for byte through the deployed `initBoxedContract`/`loadBoxedContract` ABI.
- **B. Old generations on the Phase 2/3 tree:**
  - Social May, v0.0.2 and v0.0.3 run initMeta, post, reply, up-vote, vote-ref and react. AkitaSocial's free-balance delta per step is compared with the hinted control (an unregistered wallet on the new plugin). It must differ by exactly the documented under-charges: post −800, reply −13,600, vote 0, ref −20,100, react +3,200.
  - Social v0.0.2 also runs a **referred** post (it quotes the registry referral MBR itself: `get(address)byte[]` + 67,000) and an `editPost` (it quotes 26,400 = `AmendmentMBR + EditBackRefMBR`). Both are expected to pass.
  - Subscriptions May: an ungated subscribe charges exactly `amount + legacy newSubscriptionCost` and stores no pair.
  - Staking-pool July: the charge equals the legacy `enterCost` quote, with `legacyCharged = false`.
  - Staking-pool May: the charge is 69,500 (50,600 + 18,900), with `legacyCharged = true`.
  - Auction May: a bid on a `seller_referrer` child passes.
  - Raffle May: the charge is exactly `amount + 50,600`, and the entry is recorded.
  - Marketplace May: a list leaves a rev-3 child with `factoryFloat = 164,000`, and the factory's free balance drops by 164,000. A delist restores it exactly.
- **D. LIVE wallets** (genuine wallets that run the MainNet wallet program, registry-free):
  - `TestPrincipalPlugin` + `MockPrincipalProbe` resolve a default window, an escrow window, and an external-`C` default and escrow window to the expected `(wallet, principal, origin, spender, referrer, viaPlugin)`. The plugin-side and target-side answers agree.
  - The new social plugin's hinted `initMeta` stores the live wallet.
  - The new subscriptions plugin's hinted `newService` pays the live wallet's referrer.
  - Each case ends with `assertUnregistered`.

### Findings (static evidence; reported, not fixed: the files belong to other tracks)

1. **StakingPool SDK `gateCheck` breaks on live (old) pools.**
   - The deployed child routes `gateCheck(appl,address,uint64)void` (caller-supplied gate txn). The new SDK always sends the H-5 `gateCheck(address,uint64)void`, so third-party disqualification of live pools through the new SDK reverts.
   - The staking-pool track's fact 4 ("the deployed child has no `gateCheck`") is wrong.
   - Owner: staking-pool track (SDK fallback by `pv` marker, or document that live pools need the old ABI).
2. **RaffleSDK `getState` breaks on live raffles.** The audit ride-along appended 3 fields to the return tuple, so the selector changed, and the old child rejects it. Owner: auction/raffle track (SDK fallback by `seller_referrer` marker).
3. **The tree DAO, its proposal validator and the Guild call `arc58_getNamedPluginKey`, which the live wallet program does not route.**
   - Every RemoveNamedPlugin proposal on the DAO wallet 3569559153 reverts until the DAO wallet runs the tree wallet program.
   - Phase 3 `--unname-aliases` emits RemoveNamedPlugin.
   - **Rollout track:** upgrade the DAO wallet's program before any RemoveNamedPlugin, or have the DAO tolerate the old wallet.
   - The Guild creates tree wallets and is not affected.
4. Social v0.0.2 is the only generation that quotes referred-sender posts and edits correctly. May and v0.0.3 under-quote both, so those flows revert on MainNet today. This is pre-existing and not a Phase 2 regression, and the suite does not assert them. The legacy terms must keep v0.0.2's paths working, and the e2e asserts that they do.
5. The deployed wallet program's ABI differs from the tree only by `create` and the tree-only `arc58_getNamedPluginKey`. So the working-tree WalletSDK can drive live wallets for every call except finding 3.

### Deviations

- **No separate P2-REF-02 e2e in `tests/compat`.** The member specs (staking-pool, auction, raffle, marketplace) already run each new plugin against an old child, created from the same MainNet bytes (CMP-S3 proves the bytes are equal). CMP-S6 covers the markers and legacy ABIs statically, and CMP-S10 fails if a member stops naming P2-REF-02. Duplicating those flows would add about 600 lines of untested LocalNet code with no new evidence.
- The MainNet algod is `mainnet-api.4160.nodely.dev` (the endpoint `scripts/inventory-mainnet-escrows.mjs` already uses). No other endpoint was called. `goal` runs offline. Git was used read-only (`git log`, `git show`).

### Pending (LocalNet down: `curl localhost:4001/health` timed out at 17:36)

`with-localnet-lock.sh compat npx vitest run tests/compat/compat.e2e.spec.ts`, then the member list above, then the full `npm test`
(baseline 1,780 / 0). The B1 social deltas, the subscriptions/staking/raffle exact charges and the live-wallet expectations
encode bytecode analysis that has never executed. A failure there is a compatibility finding to route to the owning track,
not a reason to relax the assertion.

---

## 2026-10-04 — Finish pass: spec status, full build, cross-track SDK/script fixes

### Spec

- `PHASE-0-SPEC.md` status line updated. §8 now has a decision column: Kyle decided every question with the
  recommended default on 2026-10-04. New §9 "Implementation status": what each phase implemented, sizes, deviations
  (decisions K1–K9 Kyle must make before deployment), and what remains (LocalNet verification order, deployment steps,
  Phase 4 list). Notes added under §6.11 and §7.1 for `GatedFeePassPlugin` (the plugin-dex track asked for this) and
  for the `SOCIAL_HINTED_TARGETS` flip. No other spec text changed.

### Full build (interface other tracks must know)

- `node scripts/build-contracts.mjs` (whole tree, puya-ts 1.3.1 / puya 5.10.1) succeeded: 182 artifacts, clients regenerated,
  akita-sdk rebuilt.
- It replaced the single-file artifacts that some tracks left. Bytecode changed (sizes equal) for StakingPool,
  StakingPoolFactory, AkitaSocial, Auction, AuctionFactory, Raffle, RaffleFactory and UpdateAkitaDAOPlugin; MockBigWallet
  grew from 10,585 to 10,597 B (mock).
- **UpdateAkitaDAOPlugin sha256 is now `bc034036b0716293de5be9a0773a14138c62673adc358d6fd1a38e0a428eeb4e`.** This supersedes
  `69b4f14c…` in the update-plugin review section. No script or test pins either value.
- Sizes are in spec §9.2. Above 8,192 B: PluginDex 14,092 (7 pages), StakingPool 12,660 (7), AkitaSocial 10,884 (6),
  Subscriptions 10,179 (5), AkitaDAO 9,738 (5, audit ride-along), and, unrelated to this work, Guild 10,246 (6) and three mocks.

### Fixes (cross-track open items that had no owner left)

1. **DAO-wallet grant migration, marketplace `purchase` (marketplace track request).**
   `scripts/lib/dao-wallet-plugin-migration.ts` `PLUGIN_METHOD_SELECTOR_MIGRATIONS` gains
   `marketplacePlugin: { '269e4bb0': 'purchase' }`. Regression test in `update-akita-dao/rollout.test.ts`: a grant restricted
   to `0x269e4bb0` migrates to `0x703f18ca` with its cooldown.
2. **`SocialPluginSDK.setMetaWallet({ rekeyBack? })` (social track request).** Wrapper for `setMetaWallet(uint64,bool)void`.
   The plugin forwards `windowHint(wallet)`, so it takes no hint. New `akita-sdk/src/wallet/plugins/social.test.ts` (2).
   The social e2e specs still use their inline `PluginSDKReturn`; they can switch to the wrapper.
3. **`StakingPoolSDK.gateCheck` on live pools (compat finding 1).** A pool without `pv` gets the deployed
   `gateCheck(appl,address,uint64)void` (selector `bc58ad09`, confirmed in the MainNet route table). The caller must pass
   `gateTxn` (a `Gate.mustCheck` txn); without one the SDK refuses before sending. A `pv` pool keeps `gateCheck(address,uint64)void`
   and refuses a `gateTxn`. New export `STAKING_POOL_LEGACY_GATE_CHECK`; `GateCheckParams.gateTxn?`. 4 unit tests in
   `akita-sdk/src/staking-pool/index.test.ts`. One extra global-state read per call (the `pv` marker, cached per instance).
4. **`RaffleSDK.state()` on live raffles (compat finding 2).** A raffle without `seller_referrer` is read (simulated) through
   the deployed `getState()` selector `9e5726f1` (16-field tuple). It returns `minEntries: 0n`, `failed: false` and
   `raffleRound: 0n`, which old raffles do not have. Return type is now `RaffleSdkState = RaffleState & { legacyAbi: boolean }`;
   new export `RAFFLE_LEGACY_GET_STATE`. 2 unit tests in `akita-sdk/src/raffle/principal.test.ts`. One extra global-state read
   per call.
5. **Compat tripwire CMP-S9** (`tests/compat/compat-static.test.ts`): a gap now counts as handled only when the SDK source
   names the deployed signature that the old child routes. `KNOWN_GAPS` is empty for all four children.

### Not changed (still open; listed in spec §9.4–9.5)

- K1–K9 in spec §9.4 need Kyle.
- Compat finding 3: the live wallet program does not route `arc58_getNamedPluginKey`. Upgrade the DAO wallet's program
  before any RemoveNamedPlugin (Phase 3 `--unname-aliases`). This is a rollout ordering item; no code change.
- `scripts/script-base.ts` `runUpdate` does not pass `daoBinding`. On MainNet after Phase 2a and before the DAO upgrade,
  the `update-*.ts` scripts revert (fail-safe). Use `principal-phase2-upgrade-targets.ts`.
- `PHASE3_NEW_METHODS` has only `socialPlugin: ['setMetaWallet']`. Method-restricted raffle/auction grants need the new
  methods added at reinstall (the auction/raffle log lists them; name raffle overloads by full signature).
- Gate v1 → v2 entry import (SG-A runbook); no SDK wrapper or network id for `GatedFeePassPlugin`; off-chain registry
  reader inventory before `REGISTRY_WRITES_STOPPED` flips.

### Ran (LocalNet still down: `curl localhost:4001/health` returned nothing at 17:39 and 17:53; not touched)

- `node scripts/build-contracts.mjs` (full): exit 0, 3 min 56 s. akita-sdk `npm run build`: exit 0 (after the fixes too).
- akita-sc `npx vitest run --exclude '**/*.e2e.spec.ts'`: **274/274** (17 files).
- akita-sdk `npx vitest run`: **457/457** (44 files).
- `tsc --noEmit`: akita-sdk (`tsconfig.esm.json`) 0 errors; akita-plugin 0 errors; akita-sc 9 errors, all pre-existing and
  none in a file touched here (`scripts/deploy-gates.ts`, `scripts/deploy-rewards-v2.ts`, `dao.voting.e2e`, guild
  `test-helpers.ts` ×4, `launch-hooks.e2e`, `staking-pool.e2e`).
- No e2e spec ran. The verification order is in spec §9.5.

## 2026-10-04 — V0 e2e run on LocalNet (group v0-principal, `utils/principal.e2e.spec.ts`)

First on-chain run of the V0 gate after the LocalNet reset. Run 1: 54 passed / 2 failed (56). Run 2 (after the fix
below): **55 passed / 1 failed (56)**. V0.1–V0.4, T01–T31 and T33–T50 (with T14b/T16b) pass; T44 passes with
`Q2_WALLET_FIX_LANDED = true`.

### Fixes

1. **T29 crashed before asserting (test bug).** File: `projects/akita-sc/smart_contracts/utils/principal.e2e.spec.ts`
   (T29). Root cause: the assertion label was `JSON.stringify(row)`, and `row.wallet` is a `bigint`, so
   `JSON.stringify` threw `TypeError: Do not know how to serialize a BigInt` before `expect` ran. Fix: a label helper
   with a bigint replacer. The assertions (atRest and thirdParty per row, and the stale-stored row) are unchanged.
   Proof: T29 passes in run 2 (all 9 rows plus the stale-stored row).

### Not fixed (needs Kyle): T32 opcode bound

- T32 measures `principalOf` (incl. the AkitaAppList read): **T06 = 184, T08 = 194, T11 = 196** ops, the same in both
  runs. The test bound is 150 (spec §5.2). The measurement is real: a static count of the compiled
  `MockPrincipalProbe.approval.teal` gives 182 for the T06 path, +10 for the `authAddr(W.address)` path (T08) and +12
  for the `authAddr(C)` path (T11).
- Root cause: the §3.7 estimate (100–110) left out subroutine/frame overhead (`proto`, `frame_dig`, `callsub`/`retsub`),
  the ARC-4 struct encoding of `Principal` (about 17 ops) and the probe harness. `isGenuineWallet` alone is about 69 ops,
  of which `sha512_256` is 45. The hash is a deliberate design choice (§3.6: no `P(factory)` resource). Without it no
  semantics-preserving rewrite reaches 150 for T11 (it needs −46 ops). Puya `-O2` would inline more, but it changes
  every artifact's bytecode (breaks §5.4.4).
- Not changed: the T32 assertion stays at 150, because raising it would weaken a spec bound. Options for Kyle:
  (a) accept the measured cost (about 28% of one app call's 700-op budget, pooled) and set the bound to the measured
  ceiling plus margin (for example 210), or (b) take `P(walletFactory)` as a resource and read
  `app_params_get AppAddress` (−45 ops; adds a resource to every hinted call). Recommendation: (a).
- The measured values and the T31 observations are written into PHASE-0-SPEC §3.6–3.7. STANDARD.md §3.7 still
  shows only the estimate.

### T31 observation (Access-list mode)

Both preparer-built groups succeed. Stripping the single `A(Wd.address)` (T08) or `A(Cx)` (T11) entry makes the node
reject the group with `inner tx 0 failed: logic eval error: unavailable Account <address>`. `A(W.address)` is not
implicitly available through the same-group `arc58_rekeyToPlugin` app reference. Written into spec §3.6.

### Ran

- `with-localnet-lock.sh v0-principal npx vitest run smart_contracts/utils/principal.e2e.spec.ts` ×2 (35 s each).
- No contract, SDK or shared file changed, so no rebuild or sync check was needed.

---

## 2026-10-04 — Kyle decisions K1–K9 (all recommendations accepted); K6 applied; accepted ABI removals as data

Kyle accepted every recommendation for the spec §9.4 deviations on 2026-10-04. This section supersedes "D-R2 (Kyle to
decide)" in the auction/raffle review-fix section and the "K1–K9 need Kyle" items of the finish pass. Earlier sections stay
as written (append-only).

### Decisions

| # | Decision (Kyle, 2026-10-04) | Effect on code or rollout |
|---|---|---|
| K1 | Approve the UpdateAkitaDAOPlugin note-selected proposal read | none (kept as implemented) |
| K2 | Accept the removal of AbstractedAccountFactory's deployed 10-argument `newAccount` selector; no shim (the ABI change itself was decided on 2026-10-03) | recorded in `scripts/lib/principal-accepted-abi-removals.json`. Deploy order: redeploy the Welcome plugin and the Guild contracts before or with the factory upgrade |
| K3 | Approve the GatedFeeHook BeforeSwap fallback (a non-genuine in-app hint is priced as hint 0) | none |
| K4 | Accept: legacy AkitaSocial payment terms only for app callers; old direct SDK callers get `errInvalidPayment` after Phase 2 | rollout: monitor AkitaSocial's free balance from Phase 2 execution to Phase 4 and top it up; ship the `SOCIAL_HINTED_TARGETS` flip in the release right after Phase 2 executes |
| K5 | Keep the seller-referrer payout on shim-created Listing rev 3 | none |
| K6 | Delete the RaffleFactory legacy creation shims (D-R2 option (a)) | **applied here** (below) |
| K7 | Keep the RafflePlugin v3 `minEntries` overloads (2 extra pages) | none |
| K8 | Accept the Marketplace legacy-payment float with its `errLflt` reserve | rollout: fund the Marketplace factory per the runbook, 500,000 µA reserve + 164,000 µA per open legacy-paid listing |
| K9 | Accept the StakingPool `errNefd` revert for long-argument legacy gated entries | none |

Spec: §9.4 is now a decided table (decision column added, deviation and option text kept); §9.5 deployment step 1 is
done and step 6 carries the K2/K4/K6/K8 items; step 8 says to top up; §6.8 marks the raffle creation shims deleted; §7.2,
§7.5 (P2-REF-01) and the Phase 4 list no longer name RaffleFactory creation shims; §9.2 has the new RaffleFactory size.

### K6: RaffleFactory legacy creation shims deleted

- **Grep first** (contracts, SDK src, scripts, tests, `tests/compat`, docs, akita-plugin) for `legacyNewRaffle`,
  `legacyNewPrizeBoxRaffle`, the deployed selectors `18584f20` (`newRaffle(pay,axfer,uint64×6,address,string,byte[32][],uint64)uint64`)
  and `3b723b81` (`newPrizeBoxRaffle(appl,pay,uint64×6,address,uint64)uint64`) and their signatures. References outside
  generated code: the factory, `MockLegacyNftCaller`, `auction/principal-abi.test.ts`, `raffle/principal.e2e.spec.ts`,
  `raffle/compat/deployed.ts`, `akita-sdk/src/raffle/principal.test.ts`, the deployed-ABI snapshot, `tests/compat`
  (CMP-S4/S5 through the bytecode facts), and the two docs. akita-plugin has none.
- **`raffle/factory.algo.ts`:** removed `legacyNewRaffle`, `legacyNewPrizeBoxRaffle` and `legacySellerReferrer()` (used
  only by them). `newRaffleImpl` / `newPrizeBoxRaffleImpl` existed only to share code with the shims, so they are inlined
  back into `newRaffle` / `newPrizeBoxRaffle` (same statement order: the hint is resolved first). The imports
  `legacyWalletOf` and `referrerOrZeroAddress` left the factory; both stay in `utils/functions.ts` (still used by
  Auction, Marketplace, Social, Subscriptions, StakingPool and others). No error constant was shim-only. The
  `newRaffle` doc comment states K6.
- **Size:** RaffleFactory approval **4,197 → 3,751 B**, approval + clear 3,755 B = **2 pages** (was 3). sha256
  `0b1b10e7ab8f2f697642fe6ed634f71908b6577acd63c0dd3afd3b3ccf8c8474`. MainNet's RaffleFactory keeps its current extra
  pages (an update cannot shrink them); no page growth is needed.
- **Build:** `node scripts/build-contracts.mjs raffle/factory.algo.ts`, then `auction/mocks/legacy-caller.algo.ts`.
  Spec §9.3 applies: the single-file RaffleFactory differed from a whole-tree build (same 3,751 B; only the router
  order of `mbr()` and `opUp()` and one bytecblock order). I compiled the whole tree with the same puya-ts 1.3.1 into the
  scratchpad (not into `artifacts/`) and installed only the six whole-tree `RaffleFactory.*` files (source-map paths
  rewritten to `../../`), then ran `scripts/generate-clients.mjs`. So the artifact equals the whole-tree output.
  RafflePlugin (4,300 B), the Raffle child (7,945 B) and MockLegacyNftCaller (397 B) are byte-identical to the whole-tree
  build. Nothing else embeds the factory (the plugin calls it by selector; no `compileArc4(RaffleFactory)`), so RafflePlugin
  was not rebuilt; its bytes are unchanged.
- **RafflePlugin v3:** confirmed it calls only the hinted factory methods. `principal-abi.test.ts` now also asserts it
  does not call the deployed `newPrizeBoxRaffle` selector. Its own deployed-signature overloads stay (K7 and the
  earlier fix).
- **MockLegacyNftCaller** (test-only): its raffle method called `legacyNewRaffle`; removed. The mock now only creates
  auctions (auction P2-REF-01 still uses it).
- **SDK** (`akita-sdk/src/raffle/factory.ts`): the generated client lost the overloads, so the wrapper calls
  `client.send.newRaffle` / `newPrizeBoxRaffle` (the hinted methods, the only ones the client knows). It cannot send the
  removed selectors. The doc comment records the deployed-era behaviour: the pre-upgrade MainNet factory has neither
  `newRaffleCost` nor the hinted methods, so this SDK cannot create raffles there, and an older SDK cannot create raffles
  on the upgraded factory (lockstep release). SDK dist rebuilt; no dist chunk contains the deployed creation signatures.
- **Tests:**
  - `auction/principal-abi.test.ts`: the 107,000 µA shortfall pin is replaced by a "K6" block. The deployed creation
    signatures are in the vendored MainNet factory spec and bytecode (not vacuous), and absent from the new factory's
    ARC-56 ABI, its approval bytes and its TEAL router; the hinted forms are present. The 107,000 µA arithmetic stays as
    the documented reason. The RaffleFactory case left the "hinted + legacy shim" loop.
  - `akita-sdk/src/raffle/principal.test.ts`: the generated RaffleFactory client has exactly the two hinted creation
    methods, and none of its selectors equals a deployed creation selector. The wrapper test spies on `send.newRaffle`.
  - `tests/compat/compat-static.test.ts`: CMP-S4 now reads the accepted-removals list instead of a hard-coded
    `KNOWN_REMOVED` (so RaffleFactory expects exactly the two K6 signatures), plus a test that every list entry is a
    deployed route of a Phase 2 target with the recorded sha256. CMP-S5 asserts (does not skip) the K6 gap: the May
    RafflePlugin's two creation calls have no route on the upgraded factory, and that is the only gap.
  - `tests/compat/members.ts`: the raffle spec now covers `K6` instead of `P2-REF-01`.
  - `raffle/principal.e2e.spec.ts` (**not run**): the P2-REF-01 case (old-ABI creation through `MockLegacyNftCaller`) is
    replaced by "K6: the DEPLOYED creation selectors have no route on the new factory". A full deployed-ABI `newRaffle`
    call that pays the exact current quote fails with `err opcode executed`, a bare call with the deployed
    `newPrizeBoxRaffle` selector fails the same way, and the factory creates no app.
  - `tests/compat/compat.e2e.spec.ts` (**not run**): new B5 case. The May RafflePlugin (MainNet bytes) calls `newRaffle`
    on the upgraded factory from a registered wallet that holds the prize, with the factory already opted in. Expected:
    `err opcode executed`, no app created, prize still in the wallet. If it fails earlier with another error, the May
    plugin's pre-call path differs from its HEAD source; route that to this track, it does not change K6.

### Accepted ABI removals as data (rollout)

- **New `scripts/lib/principal-accepted-abi-removals.json`:** one entry per accepted removal: `decision`, `date`,
  `contract` (Phase 2 target name), `programSha256` (the deployed program, a key of `principal-deployed-abi.json`),
  exact `signature`, `note`. Entries: K2 `newAccount(…)` on AbstractedAccountFactory `f01f9bc7bc7f…`; K6 `newRaffle(…)`
  and `newPrizeBoxRaffle(…)` on RaffleFactory `4b3e8a2ca9ea…` (signatures copied from the snapshot).
- **`scripts/lib/principal-rollout.ts`:** `AcceptedAbiRemoval`, `loadAcceptedAbiRemovals()`, `acceptedRemoval(contract,
  liveSha256, signature)` (all three must match, so an entry never accepts the same signature on another target or
  another live program) and `invalidAcceptedRemovals()` (bad id or date, unknown program, contract mismatch, signature
  not in that program, contract not a Phase 2 target).
- **`scripts/lib/principal-rollout-run.ts`:** `assertAbiAcknowledged` returns `{ accepted, waived }` and still throws
  for any removal that is neither listed nor waived. `--accept-removed <sig>` and `--accept-removed all` remain for
  one-off overrides; they apply only to unlisted removals. `describeAbiAcknowledgment` prints `ACCEPTED removal (Kyle
  decision K6, 2026-10-04) …` and `WAIVED removal (--accept-removed all) …` lines, so `all` prints every signature it
  waives (dry run and confirm paths). The plan's `REMOVED` lines name the decision when one applies.
- **`scripts/principal-phase2-upgrade-targets.ts`:** header and `--help` describe the list and the override.
- **Tests (`update-akita-dao/rollout.test.ts`, 40, pass):** the snapshot's only removals are K2 + K6 and equal the
  list; real deployed bytes (compat snapshot) for AbstractedAccountFactory and RaffleFactory pass with no
  `--accept-removed` and report three accepted removals (`all` changes nothing there); an unlisted removal next to
  accepted ones is refused, an exact-signature waiver lets it through, and `all` reports it as waived; an entry does not
  apply to another target or program; every entry names a real method of the snapshot program it cites, and the
  validator catches a typo, a wrong program and a wrong target.

### Ran (LocalNet/Docker down; not touched)

- akita-sc `npx vitest run --exclude '**/*.e2e.spec.ts'`: **280/280** (17 files; 274 + 4 rollout + 1 principal-abi +
  1 compat-static).
- akita-sdk `npx vitest run`: **458/458** (44 files; +1).
- `npx tsx scripts/sync-akita-plugin-principal.ts --check`: in sync.
- `tsc --noEmit`: akita-sdk (`tsconfig.esm.json`) 0 errors; akita-sc 9 errors, the known pre-existing ones
  (`scripts/deploy-gates.ts`, `scripts/deploy-rewards-v2.ts`, `dao.voting.e2e`, guild `test-helpers.ts` ×4,
  `launch-hooks.e2e`, `staking-pool.e2e`).
- akita-sdk `npm run build`: OK.

### Pending (LocalNet down)

Under `with-localnet-lock.sh`, from `projects/akita-sc`:
- `smart_contracts/raffle/principal.e2e.spec.ts` (new K6 case; P2-REF-02 unchanged)
- `tests/compat/compat.e2e.spec.ts` (new B5 K6 case)
- `smart_contracts/raffle/raffle.e2e.spec.ts`, `smart_contracts/arc58/plugins/raffle/raffle.e2e.spec.ts` (factory
  creation through the SDK and the v3 plugin on the rebuilt factory)
- `smart_contracts/auction/principal.e2e.spec.ts` (rebuilt `MockLegacyNftCaller`, auction method only)
- `smart_contracts/arc58/plugins/update-akita-dao/rollout.e2e.spec.ts` (RaffleFactory upgrade paths with the new artifact)
- `tests/migration-scripts.e2e.spec.ts`, then the full `npm test`

## 2026-10-04 — E2E group origin-referral: first LocalNet run (algod 5.0.1, fresh reset)

Specs: `smart_contracts/utils/origin-spoofing.e2e.spec.ts`, `smart_contracts/utils/referral-to.e2e.spec.ts`.
Run 1: 6 passed / 2 failed. Run 2 (after the fixes below): **8/8 passed**. No contract changed.

Both failures had the same cause: a READONLY (simulated) call reached the legacy registry lookup
`legacyWalletOf` → inner `EscrowFactory.get` with pooled fee 0, and the simulated outer call paid only its own
1,000 µA (`group fee 0.0A too small (needs 1mA more)` at the inner `itxn_submit`).

1. **SDK bug — `akita-sdk/src/staking-pool/index.ts` `enterCost` (legacy branch).** On a gated hinted pool the legacy
   `enterCost(address,(…)[])` makes one EscrowFactory inner call when the address has no pair `'i'` (Staking-pool track,
   note 11). The SDK quoted it with no fee, so `StakingPoolSDK.enter({ gateTxn: <Gate.mustCheck> })` failed before it
   built the group. Fix: the legacy quote carries `extraFee: 1,000 µA` (simulate only; older pools ignore the surplus).
   Proved by origin-spoofing "the real holder passes the gate, the fake wallet impersonating it does not" (the whale's
   legacy gated entry now lands, and the fake wallet's `gatedEnter` still fails with `errFailedGate`). SDK rebuilt;
   `src/staking-pool/index.test.ts` 15/15.
2. **Test bug — `utils/referral-to.e2e.spec.ts` R01.** `probe.legacyFeeFor` (the registry twin) does the same inner
   `EscrowFactory.get`; the call now passes `extraFee: 1,000 µA` (same pattern as origin-spoofing's `probe`, which
   passes `extraFee`). No assertion changed. Proved by R01.

ACC-01 / SG-04 regression (origin-spoofing, `register: true`) is green: the self-registered fake wallet resolves to
wallet 0 / origin = its own address / referrer zero; factory wallets and their escrows still resolve; the impersonating
gated entry fails the gate.

---

## 2026-10-04 — Review pass on the K1–K9 section: K2/K6/K8 consequences corrected, RaffleFactory pin, waiver hardening, T32 listed as open

This section corrects the "Kyle decisions K1–K9" section above. That section stays as written (append-only); where
the two differ, this one wins. Each review finding was checked against the code first. LocalNet/Docker was down
and was not touched.

### Corrections to the decision consequences

| # | Was (K1–K9 section, spec §9.4/§9.5, accepted-removals JSON) | Corrected to | Evidence |
|---|---|---|---|
| K2 | "Redeploy the Welcome plugin and the Guild contracts before or with the factory upgrade" | (1) **SDK lockstep:** ship the SDK release with the 11-argument `newAccount` in lockstep with the AbstractedAccountFactory upgrade. Older SDKs cannot create wallets on the upgraded factory, and the new SDK cannot create wallets before it. Every off-chain service that creates wallets updates at the same time. (2) Welcome and the Guild contracts call the 11-argument form: deploy them (or switch an existing instance over) in the same execution as the factory upgrade or right after it, **never before** | `git show HEAD:projects/akita-sdk/src/wallet/factory.ts:14` (10-argument type) vs tree `akita-sdk/src/wallet/factory.ts:15` (11-argument, `bool automaticUpdates`); `arc58/plugins/welcome/contract.algo.ts:100` and `arc58/guilds/core/contract.algo.ts:826` call `typeof AbstractedAccountFactory.prototype.newAccount`; the deployed factory (snapshot `f01f9bc7…`) routes only the 10-argument form |
| K2 | "redeploy" Welcome/Guild | No instance exists to redeploy. Neither appears in `deployment-summary-{mainnet,testnet}-*.json` or `akita-sdk/src/networks.ts`, and neither source file was ever committed (`git ls-files` does not know them) | checked offline; no network read |
| K6 | "Raffle creation through the deployed RafflePlugins stops when the RaffleFactory upgrade executes, until the Phase 3 swap; keep that window short (schedule close to Phase 3)" | Creation through the deployed RafflePlugins **already fails** on the deployed factory (audit AR-14); nothing changes for them. Direct creation with the **HEAD SDK** works today and stops when the RaffleFactory upgrade executes. Ship the new SDK in lockstep. Wallet users get raffle creation with the Phase 3 v3 plugin. The 107,000 µA shortfall is the HEAD SDK quote (21 uints / 9 bytes), not the plugin's | `HEAD:…/arc58/plugins/raffle/contract.algo.ts` pays `MAX_PROGRAM_PAGES + schema + minBalance + optinMBR` only; `HEAD:…/raffle/factory.algo.ts:94-104` asserts `payment.amount === totalMBR` including `raffleCreationFee`, disbursement MBR and weights MBR |
| K8 | "fund before the Marketplace upgrade executes … 164,000 µA per open legacy-paid listing" | From the Marketplace upgrade on, hold at least 500,000 µA plus 164,000 µA per legacy-paid listing expected to be open at the same time (ALGO-priced only). Each legacy-paid list needs `free ≥ 664,000` before it (`marketplace.algo.ts:180`, payment already counted in the balance) | float = 920,500 − 756,500 = 164,000 |
| K8 | Marketplace review-fix section: MainNet's 1,905,400 µA "allows about 7" concurrent legacy listings | **8**: after 7 open, free = 1,905,400 − 7 × 164,000 = 757,400 ≥ 664,000, so the 8th lists; after 8, 593,400 < 664,000 | arithmetic above |

Applied to: spec §6.1 (K2 note), §6.8 (K6 row), §7.1 Phase 2 row ("RaffleFactory: no creation shims, K6"), §9.4
K2/K6/K8 rows, §9.5 deployment steps 2, 6 (K2/K6/K8 bullets) and 8; `scripts/lib/principal-accepted-abi-removals.json`
K2 and K6 notes; the CMP-S5 comment in `tests/compat/compat-static.test.ts`; the "why no shim" test name in
`auction/principal-abi.test.ts`.

### RaffleFactory bytes after K6

- **Recompiled, not byte-preserved.** Removing the shims let puya inline the former `newRaffleImpl` /
  `newPrizeBoxRaffleImpl` into `newRaffle` / `newPrizeBoxRaffle`. The bytecblock order (`referrer` and `appID` became
  `pushbytes`) and both method bodies differ from the pre-K6 build, beyond the two removed routes. The source order is
  unchanged (the hint is resolved first). No non-LocalNet test runs the new creation programs. Spec §9.2 says so, and
  §9.5 step 6 (K6) now forbids proposing the RaffleFactory upgrade until these pass on the current artifact:
  `raffle/{raffle,principal}.e2e.spec.ts`, `arc58/plugins/raffle/raffle.e2e.spec.ts`, compat B5,
  the RaffleFactory cases of `update-akita-dao/rollout.e2e.spec.ts`, and `tests/migration-scripts.e2e.spec.ts`.
- **sha256 pinned.** New unit test in `auction/principal-abi.test.ts`: the installed RaffleFactory approval is
  3,751 B with sha256 `0b1b10e7ab8f2f697642fe6ed634f71908b6577acd63c0dd3afd3b3ccf8c8474` (the whole-tree output). A
  single-file rebuild (same size, different router order; the review measured `c7831971…`) now fails the unit suite.
  Spec §9.3 names this exception. Rebuild RaffleFactory only from a whole-tree compile.
- **Group size.** RaffleFactory + Raffle plan to **13** txns (2 upload chunks for the factory), not 14. The comment in
  `update-akita-dao/rollout.e2e.spec.ts` is fixed and the e2e now asserts `[13]`; `rollout.test.ts` asserts the same plan
  from the artifacts without LocalNet.

### `--accept-removed` hardening (`scripts/lib/principal-rollout-run.ts`, `scripts/principal-phase2-upgrade-targets.ts`)

- A one-off waiver now names its target: `--accept-removed <Target>:<signature>`. It waives that signature on that
  target only. A bare signature is refused (`parseRemovalWaivers`, also checked by the CLI before any network setup).
  The refusal message prints the exact `Target:signature` to pass.
- `AbiAcknowledgment` gains `waiveAll` and `unusedWaivers`. `describeAbiAcknowledgment` prints a top-level
  `WARNING: --accept-removed all waived N unlisted removal(s)` whenever `all` is used, also when N = 0 ("nothing to
  waive: drop the flag"), and a `WARNING` for each targeted waiver that matched no removal.
- `--accept-removed all` with `--confirm` also needs `--i-know`; without it `runPhase2` throws before
  `requirePhase2aDone` (no network call). Dry runs only warn.
- The checked-in accepted list is unchanged and still needs no flag.

### TestNet rehearsal and the accepted list

The deployed-ABI snapshot and the accepted list are keyed by MainNet sha256 values. TestNet was deployed on the same
day as MainNet (deployment summaries `1779520060364` / `1779522778159`), but its program sha256 values were **not**
checked here: the rules of this pass forbid network access. Spec §9.5 deployment step 2 now says: compare them
read-only before the TestNet rehearsal; if they differ, add the TestNet programs (and K2/K6 entries) to the data files,
or run TestNet with `--accept-unknown-abi`, which skips the removal listing. LocalNet universes run the tree (empty
diff), so only `rollout.test.ts` exercises the accepted-removals path.

### Spec status

- Status line and §9 intro: V0 ran (55/56, §5.4.1 met), origin-referral ran (8/8), everything else pending. §5.4.2 is not
  met until T32 is decided.
- New §9.6 "Open decisions": **T32** (options (a) raise the bound to the measured ceiling plus a margin, e.g. 210, and
  (b) `P(walletFactory)` + `app_params_get AppAddress`; recommendation (a)). The §9.4 intro points to it. §9.5 steps 1
  and 2 marked partly done / done.
- §9.1: the compat static half has 121 tests (120 before K6).
- `marketplace/compat.e2e.spec.ts:280`: "pending Kyle's confirmation" → "kept: Kyle decision K5, 2026-10-04".

### SDK: prize-box creation paths could never build (pre-existing bug, found by the new test)

- The review asked for a unit test of `RaffleFactorySDK.newRaffle({ isPrizeBox: true })`. Writing it showed that
  `new PrizeBoxFactorySDK({ algorand, factoryParams: {} })` throws `No app ID provided for PrizeBoxFactorySDK` on every
  network: its constructor passed no env var name, so neither `PRIZE_BOX_FACTORY_APP_ID` nor the baked-in network id
  (`prizeBoxFactory`) was ever consulted. That line is in the prize-box creation paths of `RaffleFactorySDK.newRaffle`,
  `AuctionFactorySDK.newAuction` and `MarketplaceSDK.list` (all three at `HEAD` as well), so SDK prize-box creation has
  never worked without an explicit factory id.
- Fix (`akita-sdk/src/prize-box/index.ts`): `PrizeBoxFactorySDK` passes `ENV_VAR_NAMES.PRIZE_BOX_FACTORY_APP_ID` like
  every other factory SDK. An explicit `appId` still wins. On LocalNet the env var is still needed (the LocalNet
  network id is 0).
- New tests (`akita-sdk/src/raffle/principal.test.ts`): ASA prize with `wallet: 9n`, `minEntries: 3n` (quote args,
  asset transfer, `send.newRaffle` args); prize box with `prizeBoxId: 42n`, `wallet: 9n`, `minEntries: 3n` (quote with
  `isPrizeBox: true, prizeId: 42n`, the box transferred to the factory, `send.newPrizeBoxRaffle` args, no
  `send.newRaffle`). The prize-box test failed before the fix with the error above.

### Ran (LocalNet/Docker down; not touched)

- akita-sdk `npm run build`: OK (after the SDK changes).
- akita-sc `npx vitest run --exclude '**/*.e2e.spec.ts'`: **283/283** (17 files; +1 RaffleFactory pin, +2 waiver tests).
- akita-sdk `npx vitest run`: **462/462** (45 files).
- `npx tsx scripts/sync-akita-plugin-principal.ts --check`: in sync.
- `tsc --noEmit`: akita-sdk (`tsconfig.esm.json`) 0 errors; akita-sc the same 9 pre-existing errors.
- No contract source changed, so nothing was compiled.

### Pending (LocalNet down)

Under `with-localnet-lock.sh`, from `projects/akita-sc`, before any RaffleFactory proposal:
`smart_contracts/raffle/{raffle,principal}.e2e.spec.ts`, `smart_contracts/arc58/plugins/raffle/raffle.e2e.spec.ts`,
`tests/compat/compat.e2e.spec.ts` (B5), `smart_contracts/arc58/plugins/update-akita-dao/rollout.e2e.spec.ts` (now
asserts 13 txns), `tests/migration-scripts.e2e.spec.ts`; also `smart_contracts/auction/principal.e2e.spec.ts`,
`smart_contracts/marketplace/compat.e2e.spec.ts` (comment only) and the prize-box SDK paths in
`smart_contracts/prize-box/prize-box.e2e.spec.ts` / auction / marketplace specs; then the full `npm test`.

## 2026-10-04 — E2E group wallet: first LocalNet run (fresh reset)

Specs (from `projects/akita-sc`): `arc58/account/{rekeying,factory,reclaim,admin,contract,account-fixes,plugin-version,
agent-delegation,hosted-agent-identity-payment,backend-hosted-agent-identity-payment,balance-reader}.e2e.spec.ts`,
`arc58/plugins/welcome/welcome.e2e.spec.ts`, `escrow/escrow.e2e.spec.ts`. All 13 files exist.
`backend-hosted-agent-identity-payment` is `describe.skipIf(AKITA_BACKEND_ARC58_GOLDEN !== '1')` (needs an external
broker); it is skipped by design, as before.

- Run 1: 164 passed / 15 failed / 1 skipped (`contract.e2e` 14, `welcome.e2e` 1).
- Run 2 (failing specs + `utils/principal`, `utils/origin-spoofing`, `utils/referral-to` for the shared SDK change):
  92 passed / 4 failed (3 `contract.e2e` allowance tests; `principal.e2e` T32, see below).
- Run 3 (whole group): **179 passed / 0 failed / 1 skipped** (12 files passed, 1 skipped).

No contract changed. AbstractedAccount approval is **8,178 B** (measured from the artifact; limit 8,192 B).

### Fixes

1. **SDK bug — `akita-sdk/src/wallet/index.ts` `addPlugin` and `src/wallet/group.ts` group `addPlugin`: fee under-count for
   an external controlled address with a new escrow.** On such a wallet, `arc58_addPlugin` makes TWO inner payments
   from the controlled address (`_payMbrFromControlled` for the plugin boxes, and again in `newEscrow` for the escrow
   box) besides the 6 escrow-factory inner txns. The SDK paid `NewEscrowFeeAmount + 1,000`, one min fee short:
   `group fee 0.0A too small (needs 1mA more)` at the escrow's rekey payment. This is pre-existing (the HEAD SDK had the
   same count; the registry `register` it sent afterwards was a separate group), first exercised by the new Welcome
   test. Fix: new `addPluginExtraFee(isNewEscrow, hasExternalControlledAddress)` in `src/wallet/constants.ts`
   (`NewEscrowFeeAmount` for a new escrow + 1,000 per controlled-address MBR payment: 1, or 2 with a new escrow), used by
   both call sites. Unit test `src/wallet/add-plugin-fee.test.ts` (2). Proved by `welcome.e2e` "useMainWalletReferrer
   names the controlled account only while the wallet still controls it" (now passes; Cx while live, the escrow after
   the admin rekeys Cx away). SDK rebuilt (inside the lock); akita-sdk `vitest run` 462/462; sync check in sync;
   `utils/origin-spoofing` 3/3 and `utils/referral-to` 5/5 rerun green.
2. **Test expectation — `arc58/account/contract.e2e.spec.ts`: the unused registration pre-fund.** `newAccount` still
   pre-funds `ARC58WalletIDsByAccountsMbr` (12,100 µA; Phase 4 removes it, wallet-track deviation 6), and only the legacy
   `register()` spends it. `newWallet` no longer registers, so every fresh wallet holds exactly 12,100 µA above its
   minimum balance (the same fact `factory.e2e` and `welcome.e2e` already assert). Likewise `mbr.newEscrowMintCost`
   includes the escrow's registration MBR, and `addPlugin` no longer registers new escrows, so the three allowance tests
   keep a second 12,100 µA after the escrow is created. All 27 exact balance equalities now add `REGISTRATION_PREFUND`
   (twice after a new escrow); they remain exact equalities, and no other assertion changed. Run 1 showed the offset
   was exactly 12,100 µA in all 14 tests (24,200 after the escrow in run 2). Proved by `contract.e2e` 19/19.

### Not this group

- `utils/principal.e2e.spec.ts` T32 (`expected 184 to be <= 150`, opcode cost of strict resolution) fails with the same
  value as in the v0-principal group's run before these fixes; the SDK change cannot affect a target's opcode cost. The
  other 55 tests in that file pass, including T13/T25/T44 (Q2).
- `WalletSDK.addAllowances` (standalone) sends no extra fee, but on an external controlled wallet
  `arc58_addAllowances` also pays its MBR with an inner payment from the controlled address. Not exercised by this
  group's specs and not changed here.

---

## 2026-10-04 — E2E group gates: first LocalNet run (fresh reset)

Specs (from `projects/akita-sc`): `smart_contracts/gates/{gate-ctx,ctx-sub-gates,gate-v2,subscription-gates,contract,
staking-amount-gate,staking-power-gate}.e2e.spec.ts`, `smart_contracts/arc58/plugins/gate/gate.e2e.spec.ts`.
Artifacts were current (built 17:43, newer than every gate and utils source); no rebuild was needed.

- Run 1 (whole group): 7 files passed, 1 failed: 71 passed / 46 skipped. `contract.e2e` failed in `beforeAll`
  (`expected 112100n to deeply equal 100000n`), so its 46 tests were skipped.
- Run 2 (`contract.e2e` only): **46/46 passed**.
- Run 3 (whole group): **117 passed / 0 failed** (gate-ctx 11, ctx-sub-gates 11, gate-v2 26, subscription-gates 9,
  contract 46, staking-amount-gate 7, staking-power-gate 4, plugin gate 3).

No contract, SDK, fixture or shared file changed.

### Fixes

1. **Test expectation — `smart_contracts/gates/contract.e2e.spec.ts` `beforeAll`: the unused registration pre-fund.**
   Same root cause as wallet-group fix 2. `newAccount` still pre-funds `ARC58WalletIDsByAccountsMbr` (12,100 µA,
   `arc58/account/factory.algo.ts:106`; Phase 4 removes it), and only the legacy `register()` spends it. `newWallet` no
   longer registers, so the fresh wallet holds exactly 12,100 µA above its minimum balance (run 1 showed exactly
   112,100 vs 100,000). The two exact balance equalities (after `newWallet`, and after `addPlugin`, which here creates
   no escrow) now add `REGISTRATION_PREFUND = 12_100n`. They remain exact equalities; no other assertion changed.
   Proved by `contract.e2e` 46/46 (run 2) and the whole group (run 3).

### Invariants exercised (green)

- Q12 context forwarding: `Gate.mustCheckFor` / `checkFor`, `gateCheckCtx` rejects any ctx field mismatch
  (P2-GATE-03), plain sub-gates get `ctx.principal` never the spender, ctx-aware allowlist flag and MBR.
- SG-I / no gifting: `SubscriptionGate.checkFor` / `SubscriptionStreakGate.checkFor` pass only for
  `ctxOwns(ctx, subscriber)`; another actor, another genuine wallet or a non-wallet app fails.
- AkitaReferrerGate: `checkFor` uses `ctx.wallet` (external controlled address passes with no registry); legacy
  `check` returns false instead of reverting.
- SG-03/06/07/10/13/14/15/16, SG-A import window unchanged and green.

---

## 2026-10-04 — E2E group social: first LocalNet run (fresh reset)

Specs (from `projects/akita-sc`): `smart_contracts/social/{principal,social}.e2e.spec.ts`,
`smart_contracts/arc58/plugins/social/{principal,deployed-compat,social}.e2e.spec.ts`.

- Run 1 (whole group): 155 passed / 7 failed / 5 todo (`social.e2e` 5, plugin `principal.e2e` 2).
- Run 2 (the two failing files): 134 passed / 1 failed (`social.e2e` "reply to a post", see fix 3).
- Run 3 (whole group): **162 passed / 0 failed / 5 todo** (5 files).

No contract, SDK, fixture or shared file changed, so no rebuild or sync check was needed. `social/principal.e2e`
(the §7.2 old-selector cases: deployed quote refused, corrected quote passes, no drain) and plugin
`deployed-compat.e2e` (deployed plugin program through the shims, P2-SOC-01, K4 legacy terms for app callers) were
green from run 1. S-02 (`initMeta only creates meta for the caller`) and S-05 (no drain) in `social.e2e` are green.

### Fixes

1. **Test expectation — `smart_contracts/social/social.e2e.spec.ts`: one inner fee fewer on initMeta, post, reply,
   up-vote and react.** Each actual cost was exactly 1,000 µA below the expectation. Root cause: the pre-change
   targets resolved the sender's wallet through the registry (`getWalletIDUsingAkitaDAO` → inner
   `EscrowFactory.get`) in `initMeta` and in `sendReferralPayment` (post, reply, vote, react). The hinted methods
   resolve with `principalOf(dao, 0)`, which makes no inner call (`utils/principal.ts` has no `itxn`/`abiCall`), and
   `legacyWalletOf` is reached only from the legacy shims (`feeReferrer(…, legacy)`, `legacyInitMeta`). This is the
   saving spec §3.7 predicts (one 1,000 µA inner app call per lookup). Fee counts: initMeta 3 → 2, post 9 → 8,
   up-vote 15 → 14, react 11 → 10 (reply: fix 3). The assertions stay exact equalities. Proved by the five tests
   in runs 2 and 3.
2. **Test bugs — `smart_contracts/arc58/plugins/social/principal.e2e.spec.ts`.**
   - P2-SOC-03: the local `setMetaWallet` helper built the plugin call with only sender/signer, so the call had no
     `maxFee` and algokit refused the covered inner fee ("Calculated transaction fee 2000 µALGO is greater than max
     of 1000 for transaction 1"). The SDK wrappers carry `DEFAULT_SEND_PARAMS.maxFee`. The helper predates
     `SocialPluginSDK.setMetaWallet`; it now calls that wrapper. The assertions (meta wallet 0 after the deployed
     plugin's legacy initMeta, then `Wb.client.appId`, no registration) are unchanged. Proved by P2-SOC-03.
   - §6.2 tip route: the creator wallet's `admin` was created with 20 ALGO and then paid the wallet creation plus a
     20 ALGO funding (`overspend … 17.6409 A, tried to spend 20 A`). The admin now starts with 50 ALGO. No
     assertion changed. Proved by the tip-route test.
3. **Test expectation — `social.e2e` "reply to a post": the SDK's resource-carrier count is not fixed.** The hinted
   reply needs 31 Access entries (16 max per call). The indexer shows the SDK's greedy packer
   (`akita-sdk/src/simulate/access-list.ts` `addToBestTransaction`) split them [13, 10, 8] (2 carriers) in run 1
   and run 3, and [16, 15] (1 carrier) in run 2; another spec's reply did the reverse. The result depends on the
   order of the random-address resources. Before this work the registry lookup added 2 entries (EscrowFactory
   app + box), so the group always needed 2 carriers. The test now reads the confirmed group from algod and asserts
   exactly: reply call fee = 11 × min fee (own + 10 inner), pay and axfer 1 × min fee each, 1 or 2 carriers at
   1 × min fee each, and balance change = MBR + the sum of those fees. Proved by runs 2 (1 carrier) and 3
   (2 carriers).

### Not fixed (follow-up, SDK)

- The access-list packer is not optimal at the 2-txn/3-txn boundary: 31 entries fit into 2 calls but are sometimes
  packed into 3, so a user can pay one extra 1,000 µA carrier fee for the same reply. A first-fit-decreasing pack by
  app/box cluster would fix it. Not changed here: `src/simulate` is shared by every spec.

### Ran

- `with-localnet-lock.sh social npx vitest run <5 specs> --reporter=verbose` ×2 (whole group), and the 2 failing
  files ×1. Logs: scratchpad `e2e/social-r{1,2,3}.log`.
- `npx tsc --noEmit -p .` (akita-sc): no error in the two edited specs.

---

## 2026-10-04 — E2E group subscriptions: first LocalNet run (fresh reset)

Specs (from `projects/akita-sc`): `smart_contracts/subscriptions/{principal,compat,subscriptions-audit,subscriptions}.e2e.spec.ts`,
`smart_contracts/arc58/plugins/subscriptions/subscriptions.e2e.spec.ts`,
`smart_contracts/arc58/guilds/tests/{subscriptions,consensus-actions,audit-remediation,factory}.e2e.spec.ts`.
Artifacts were current (Subscriptions built 17:43, newer than its sources); no rebuild was needed.

- Run 1 (whole group): 193 passed / 7 failed (`subscriptions.e2e` 4, `subscriptions/principal.e2e` 3).
- Run 2 (the two failing files): 138 passed / 1 failed (P2-SUB-04, see fix 4).
- Run 3 (`subscriptions/principal.e2e`): 22/22.
- Run 4 (whole group): **200 passed / 0 failed** (9 files: principal 22, compat 7, audit 15, subscriptions 117,
  plugin 15, guild subscriptions 5, consensus-actions 2, audit-remediation 9, factory 8).

No contract, SDK, fixture or shared file changed, so no rebuild or sync check was needed. All fixes are in the two
spec files below. No assertion was removed or weakened; every balance check is still an exact equality.

### Fixes

1. **Test expectation — `smart_contracts/subscriptions/subscriptions.e2e.spec.ts`: one inner fee fewer on newService
   and subscribe** ("create a new service", "create service with passes", "subscribe to a donation (no service)",
   "subscribe to a service"). Each actual cost was exactly 1,000 µA below the expectation. Root cause: the HEAD
   contract resolved the caller's referrer through the registry in `newService` and in `sendReferralPayment`
   (`getWalletIDUsingAkitaDAO` → inner `EscrowFactory.get`, `HEAD:utils/functions.ts:607-608`). The hinted methods
   use `principalOf(dao, 0)`, which makes no inner call (same saving as social-group fix 1, spec §3.7). Fee counts:
   newService group 6 → 5 (payment, newService + 1 inner escrow payment, setServiceDescription, activateService);
   subscribe group 5 → 4 (payment, subscribe + 2 inner payments). The subscribe comment that attributed the extra
   1,000 µA to an "opcode-budget carrier" was wrong: it was the registry inner call. Proved by the four tests in
   runs 2 and 4.
2. **Test bug — `subscriptions/principal.e2e.spec.ts` P2-ABI-01 (legacy vs hinted quotes).** The raw call to the
   legacy `newServiceCost(uint64)` selector keeps the deployed registry read (one inner `EscrowFactory.get`), but
   the test sent it without fee coverage: `group fee 0.0A too small (needs 1mA more)` at the inner `itxn_submit`
   (inner selector `3c1a6f33` = `EscrowFactory.get(address)`). The SDK wrappers are not affected (their send
   params carry `coverAppCallInnerTransactionFees` + `maxFee`). The call now passes `extraFee: 1,000 µA` (same
   pattern as origin-referral fix 2). The equality assertion is unchanged. Proved by P2-ABI-01.
3. **Test bug — `subscriptions/principal.e2e.spec.ts` P2-SUB-02 "gated ASA subscribe".** The service pays out to
   the merchant with an asset transfer, and the merchant had never opted in to AKTA (`receiver error: must optin`
   in the payout inner txn of `createSubscription`). The contract checks only the app and revenue-escrow opt-ins;
   payout semantics are unchanged from HEAD. The test now opts the merchant in before subscribing. The assertions
   (asset, stored pair `(W, W.address)`) are unchanged. Proved by the test in runs 2 and 4.
4. **Test bugs — `subscriptions/principal.e2e.spec.ts` P2-SUB-04 "escrow-window gated subscribe".**
   - The test compared the quote with hint W against the quote with hint 0 and expected exactly
     `SUBSCRIPTION_PRINCIPAL_MBR`. Run 1 measured 101,900 µA. By spec §6.4 and the contract
     (`newSubscriptionCost` → `referralFeeTo(quoteReferrerOf(dao, wallet))`), hint W also adds the referral
     disbursement MBR for W's referrer R1 (67,000 µA here), and hint 0 has no referrer. The test now compares the
     same hint W on the referrer-gated and on the ungated service, so the referral term cancels and the difference
     is exactly 34,900 µA (the same method P2-SUB-02 already uses). `charged == AMOUNT + quoteHinted` is unchanged
     and passed in run 2.
   - "nothing escrowed" read the subscription after the `beforeAll` deposit of `AMOUNT * 5` (500,000 µA). The
     `beforeAll` now records `escrowed` right after the subscribe, before that deposit, and the test asserts it is 0.
   Proved by run 3 (22/22) and run 4.

### Invariants exercised (green)

- SG-05/SG-I: `subscriptions-audit` "SG-05 gated triggers re-check the subscriber" and principal "SG-05 (hinted)":
  the keeper's own context fails, the subject is the subscriber.
- Box `'i'` (P2-SUB-02/03/04): exact +34,900 µA quote and charge, refund in `unsubscribe`, keeper at-rest re-check,
  case (1) self-trigger from the default window with `key.address != p.spender`, external-C degradation, forged and
  deleted wallet degrades to `(E, 0, E)`, forged-wallet subscriber cannot make keeper triggers panic.
- Q13 `adoptPrincipal`: exact payment (`errIpma`), once only (`errPrincipalExists`), rejects missing / ungated /
  registry-less subscriptions; unsubscribe refunds it to the subscriber (compat).
- P2-SUB-01 / P2-CMP-01: the deployed May 2026 plugin program runs through the legacy shims (no `errInvalidSequence`).
- Guild subscription consensus on the hinted selectors (guild `subscriptions`, `consensus-actions`).

### Ran

- `with-localnet-lock.sh subscriptions npx vitest run <9 specs> --reporter=verbose` ×2 (whole group), the two failing
  files ×1, `subscriptions/principal.e2e` ×1. Logs: scratchpad `e2e/subs-r{1,2,3,4}.log`.
- `npx tsc --noEmit -p .` (akita-sc): no error in the two edited specs.

## 2026-10-04 — First on-chain run, group "marketplace" (LocalNet after reset)

All seven specs were run on LocalNet under the shared lock, on the current working tree (K-decisions workflow finished first):
`marketplace/{principal,compat,marketplace}.e2e.spec.ts`, `arc58/plugins/marketplace/marketplace.e2e.spec.ts`,
`arc58/plugins/plugin-sdk-hooks.e2e.spec.ts`, `prize-box/prize-box.e2e.spec.ts`, `arc58/dao/tests/upgrade/dao.upgrade.e2e.spec.ts`.

- Result: **7 files, 85 passed, 0 failed** on the first run. No fixes were needed and no files were changed.
- Covered on-chain: M-01..M-14 (hinted referrer, errHtop/errHnwl, legacy shims, legacy-payment float, gateCheckCtx/errFgte),
  P2-CMP-01, P2-REF-01/02, errLflt, P2-ABI-01, the MKT/I-2/I-4/MKT-09 audit regressions, and the Marketplace mock upgrade.
- **K5 holds:** a shim-created rev-3 child stores the seller's creation-time registry referrer (R1) and pays it at completion
  (compat P2-REF-01, principal M-05). Old rev-absent children still pay no seller referral (compat P2-REF-02).
- **K8 holds:** a legacy-paid list records `factory_float = 164,000` and gets it back on delist (compat last test; principal M-06).
  A legacy-paid sale leaves the factory whole (M-14). A legacy-paid list reverts `errLflt` below the reserve.
- **Checked: the compat errLflt precondition is not met by accident.** A temporary probe (removed afterwards) logged the old
  factory's free balance at each step: after seed 350,400; after old list 1 and 2, after `updateApp` 350,400 (no change);
  after the rev-3 child update 300,000 (the larger 'bc' box takes 50,400); before and after the new plugin buys an old child
  300,000; the old-child delist is asserted unchanged. So the old flows do not change the factory's balance, as the comment says.
  The free balance at the errLflt test is exactly `FACTORY_MARGIN` (300,000), below `float + LegacyFloatReserve` (664,000).
  Note: here the buyer is opted in to the prize. The earlier note (an old child can consume up to 67,000 + 100,000 of the
  factory's free balance) covers buyers who are not opted in; this suite does not exercise that case.

---

## 2026-10-04 — Staking-pool group, first LocalNet run (e2e green)

First on-chain run of `staking-pool/principal.e2e.spec.ts`, `staking-pool/staking-pool.e2e.spec.ts` and
`arc58/plugins/staking-pool/staking-pool.e2e.spec.ts` on a fresh LocalNet. Round 1: 125 passed / 8 failed.
Round 2: **133 passed / 0 failed**. All 8 failures were test defects. No contract, SDK or shared file changed,
so no rebuild was needed. The audit invariants (H-5 stored-args `gateCheck`, hint verification, errNefd reserve
check, legacy `gateCheck` fallback) are exercised by the tests that now pass. No assertion was removed or weakened.

| # | Test | Root cause | Fix (file) |
|---|------|------------|------------|
| 1 | `new children carry pv = 1 …` | `algorand.app.getById(...).globalInts` is a JS `number` (13), the test compared it to `13n`. | Compare `Number(schema)` to `13` (`staking-pool/principal.e2e.spec.ts`). |
| 2-5 | `an EOA acting as itself (hint 0) …`, `a legacy-shim entrant with no registry wallet …`, both `legacy gatedEnter shim and reward reserves (Q14)` tests | The gate txn was built with the raw generated client (`universe.gate.client.params.mustCheck/mustCheckFor`), so it had no `maxFee`. The SDK fee cover (`simulate/access-list.ts`) caps an app call without `maxFee` at its own fee (1,000). The Gate's sub-gate inner call needs 2,000, so the send threw "Calculated transaction fee 2000 µALGO is greater than max of 1000". `GateSDK.build.*` sets `maxFee` 257,000 by default, which is why SDK-built gate txns work. | Pass `maxFee: 20,000` on every raw-client gate txn (`GATE_TXN_MAX_FEE`), including the shared `mustCheckFor` helper, so `errHtop`/`errHnwl`/`errFgte` are now asserted on fully fee-covered groups (`staking-pool/principal.e2e.spec.ts`). |
| 6 | `newPoolCost(wallet) adds the referral MBR …` | The plugin `newPool` costs the DAO creation fee + child MBR (51.74 ALGO). `newUserWallet` funds 20 ALGO, so the wallet's payment inner txn overspent. | Fund the referred wallet with 60 ALGO more before `newPool` (`staking-pool/principal.e2e.spec.ts`). |
| 7 | `legacy shims newPool(9 args) / newPoolCost() …` | The legacy `newPoolCost()` reads the EscrowFactory registry of `Txn.sender` (`legacyReferralFee` → `legacyWalletOf`, one inner call). The test's readonly call had fee 0, so the simulate failed with "group fee 0.0A too small". Same pattern as the SDK's legacy `enterCost` (`extraFee` 1,000). | `extraFee: 1,000` on the legacy readonly quote (`staking-pool/principal.e2e.spec.ts`). |
| 8 | `Factory Contract > should create a new pool via factory SDK` | The SDK now calls the hinted `newPool(…, wallet = 0)`. `principalOf(dao, 0)` and `sendReferralPaymentTo(zero)` make no inner call, while the old selector made the EscrowFactory registry lookup. The group has 10 fees, not 11. Proof: actual − expected(11 fees) = −552 µA, so fees = 10,448 µA = 10 × 1,000 + 448 µA per-byte slack (the slack the test already tolerates, < 1,000). | Expected fee count 11 → 10 with a comment (`staking-pool/staking-pool.e2e.spec.ts`). The `≥ expected` and `< expected + MIN_TXN_FEE` checks are unchanged. |

### Ran

- `with-localnet-lock.sh staking-pool npx vitest run smart_contracts/staking-pool/principal.e2e.spec.ts smart_contracts/staking-pool/staking-pool.e2e.spec.ts smart_contracts/arc58/plugins/staking-pool/staking-pool.e2e.spec.ts`:
  round 1 125/133 (8 failed), round 2 **133/133**.
- `smart_contracts/staking-pool/compat.test.ts` (unit): 8/8.

### Not run here

`utils/origin-spoofing.e2e.spec.ts` (legacy `gatedEnter` through the fake wallet) belongs to another group. It is
unaffected, because this group changed test files only.

## 2026-10-04 — E2E group plugin-dex: first LocalNet run (fresh reset)

Scope: every `smart_contracts/plugin-dex/**/*.e2e.spec.ts` (with the plugin-dex unit specs in that directory) and
`arc58/plugins/akita-router/akita-router.e2e.spec.ts`. `arc58/plugins/gated-fee-pass` has no e2e spec of its own;
`GatedFeePassPlugin` is covered in `plugin-dex/hooks/gated-fee.e2e.spec.ts`. Every run was wrapped in `with-localnet-lock.sh`.

- Run 1: 18 files, 360 passed / 16 failed / 4 todo. Fixed below. No contract, SDK or shared-fixture change.
- Run 4 (final, whole group): **18 / 18 files, 376 passed / 0 failed / 4 todo.**

### Fixes (all test-only; no assertion weakened, no expected error code changed)

1. **The MBR payment of `openPass` was signed by the wrong account** (`plugin-dex/hooks/gated-fee.e2e.spec.ts` helper
   `openPass` and the errGfmb case; `plugin-dex/launch/launch-hooks.e2e.spec.ts` `gatedHook()`).
   Root cause: the §6.12 rewrite made the funder (admin, or `funder`) a different account from the caller. The
   tests built the payment with `algorand.createTransaction.payment({ ..., signer })`. That returns a bare
   `Transaction` and drops `signer`, so algokit signed the payment with the method call's signer. algod rejected it
   ("should have been authorized by <funder> but was actually authorized by <caller>"). Fix: pass
   `{ txn, signer: funder.signer }` (a `TransactionWithSigner`). This one fault caused 13 failures. T-2, T-4,
   P2-DEX-01, the lifecycle guards and launch-hooks (12) ×2 and P2-DEX-04 failed directly. T-5 then failed with
   errGfnp, and T-8 to T-13 failed on the fee: those tests reuse the trader's pass from T-2, and it never opened.
   Proven by: all of these tests pass in run 2 and run 4.
2. **GatedFeePassPlugin "wrong gate id ⇒ errGfgt" used a gate id that does not exist** (`gated-fee.e2e.spec.ts`,
   GatedFeePassPlugin production test). Root cause: `refreshFromGate` calls `Gate.mustCheckFor(gateCtx(p), gateId, args)`
   as the first inner txn. With `gateId + 1_000_000` the Gate itself reverts errNgat, so the hook's slot check
   (errGfgt) is never reached. The test comment says the hook must reject it. Fix: register a second, identical
   staking-power gate (the principal passes it) and use that id. The hook then rejects it with errGfgt, which is
   the guard under test. Contract unchanged (an unknown gate id still reverts, in the Gate).
3. **core-v2 (11) `swapRoute([live, live])` ran out of box read quota before errPdrt** (`core-v2.e2e.spec.ts`).
   Root cause: the error was `read budget exceeded (6185 > 6144)`. The Vault is now 14,092 B, which is 5,900 B
   above 8,192 (A11). That size plus two `p:` reads needs 6,185 B, but the test's 3 explicit box refs give
   6,144 B. Fix: one more empty box ref (4 box refs, 6 refs total). Proven by: errPdrt is reached in run 2 and run 4.
4. **P2-DEX-04 counted 7 app args for the inner dev-buy `swap`** (`launch/launch-hooks.e2e.spec.ts`). Root cause:
   ARC-4 puts no app arg for a txn argument. So `swap(txn,uint64,uint64,address,byte[],uint64)` has
   `[selector, poolId, minAmountOut, recipient, data, wallet]` = 6, and the hint is at index 5. The filter
   already matches the new hinted `swap` selector. Fix: length 6, and `appArgs[5]` is 8 bytes equal to 0. The
   assertion (the LaunchManager sends `wallet = 0`) is unchanged.

### Measurements (first on-chain figures for this track)

- Gated quote opcodes: un-gated 433, gated without a pass 973, gated with a pass 1,162.
- Router: H3 AkitaRouterPlugin approval + clear is 3,832 B. G1: "1 ALGO→TKA native 1 hop" uses 5 inners,
  0 op-ups, 3 outer txns and 2,426 budget. G2: route 6 uses 90 inner txns and 5 outer txns (2 SDK carriers).
- K3 (approved fallback): the router-swap cases in "principal resolution" pass. A non-genuine wallet hint pays
  the full fee, quote == swap, and the claimed holder's pass is not used. The same hint at top level still reverts errHnwl.

### Not run

- The full `npm test`, and other groups' specs. No shared file changed, so this group needs no reruns elsewhere.

---

## 2026-10-04 — e2e group auction-raffle: first on-chain run (LocalNet, fresh reset)

**Specs:** `smart_contracts/auction/{principal,auction}.e2e.spec.ts`, `smart_contracts/raffle/{principal,raffle}.e2e.spec.ts`,
`smart_contracts/arc58/plugins/auction/auction.e2e.spec.ts`, `smart_contracts/arc58/plugins/raffle/raffle.e2e.spec.ts`.
All runs used `with-localnet-lock.sh`. The K-decisions run had already finished (K6 shims removed), so the raffle
specs ran against the shim-free RaffleFactory.

| Run | Result |
|---|---|
| 1 | 98 passed / 1 failed (99) |
| 2 (after the fix) | **99 passed / 0 failed** (6/6 files), 173.6 s |

### Fix

1. **`AuctionSDK.state()` returned `1n` for `prizeClaimed`, not `true`** (`akita-sdk/src/auction/index.ts`).
   - Failing test: `auction/principal.e2e.spec.ts` > "settlement pays seller_referrer" > `expect(prizeClaimed).toBe(true)`
     received `1n`.
   - Root cause (pre-existing, HEAD): PuyaTs stores `GlobalState<boolean>` as a uint64. The generated client types
     `isPrizeBox` / `prizeClaimed` / `rafflePrizeClaimed` as `bigint`. The SDK used `x as unknown as boolean ?? false`,
     which is a type cast only, so `AuctionState` (declared `boolean`) held `0n`/`1n`. The older specs used
     `toBeTruthy()`, so they did not detect it. The test is correct for the declared type; the SDK was wrong.
   - Fix: `Boolean(state.x ?? 0n)` for the three fields. Truthiness is unchanged for existing callers.
   - Proven by: new unit test `akita-sdk/src/auction/principal.test.ts` > "AuctionSDK.state" (8/8), and run 2 above.
   - SDK rebuilt (`npm run build`, lane pr-build). No shared module changed (`src/auction` only), so no other group
     needs a rerun. No fixture or other group's spec reads `AuctionSDK.state()`.
   - Same pattern, not changed here (marketplace group, green, out of scope): `akita-sdk/src/marketplace/listing.ts`
     `isPrizeBox: state.isPrizeBox as unknown as boolean ?? false` also returns `0n`/`1n`.

### Also ran

- `smart_contracts/auction/principal-abi.test.ts` (unit, incl. the pinned RaffleFactory sha256): 21/21.

### Not changed

- No contract, artifact, fixture or test assertion changed. No contract rebuild.

## 2026-10-04 — E2E group rollout: first LocalNet run (fresh reset)

Specs: `arc58/plugins/update-akita-dao/rollout.e2e.spec.ts` (P2-UPD-01), `arc58/plugins/update-akita-dao/update-akita-dao.e2e.spec.ts`,
`tests/migration-scripts.e2e.spec.ts`. The K-decisions workflow had finished before this run.

| Run | Result |
|---|---|
| 1 | update-akita-dao 26/26 and migration-scripts 54/54 green; rollout: `beforeAll` failed (`box not found`), 12 skipped |
| 2 (fix 1) | rollout 11/12; "window that opens later" failed: `rebuilt group 1 does not match the proposal's group id` |
| 3 (fix 2, lease only) | same failure |
| 4 (fix 2 + fix 3, SDK rebuilt) | rollout **12/12** |
| final | 4 files: rollout 12/12, update-akita-dao 26/26, migration-scripts 54/54, `utils/principal.e2e` all but T32 (147/148) |

### Fixes

1. **`verifyMigrations` threw on the removed grant's missing settings box** (`scripts/lib/dao-wallet-plugin-migration.ts`).
   - Failing: rollout `beforeAll` (the baseline `runMigration` that makes the deployed Update plugin pal.update) threw
     `URLTokenBaseHTTPError 404: box not found` after the proposal executed.
   - Root cause: the post-execution check reads the DAO `plugins` settings box of the OLD plugin and expects it to be
     absent (`oldSettings || ...` fails the check). The generated map reader `state.box.plugins.value()` does not return
     `undefined` for a missing box: algod answers 404 and algokit throws. So a correct migration could never verify.
   - Fix: `readDaoExecutionSettings()` returns `undefined` on 404 / `box not found` and rethrows anything else; used by
     the plan read and both verify reads. The verify condition is unchanged.
   - Proven by: rollout `beforeAll` and "Phase 2a: one proposal repoints pal.update and swaps the grant" (run 2 onward).

2. **Phase 2 resume rebuilt the group with a fresh lease** (`scripts/lib/principal-rollout-run.ts`, `executeTargetPlan`).
   - Root cause: on `--proposal-id` the groups are rebuilt with `lease = <prefix>_<i>_<new stamp>`. `restampExecution`
     replaces `txn[0].lease`, but `usePlugin` also puts the wallet execution box `'x' + lease` in the
     `arc58_rekeyToPlugin` references, which are part of the hashed group. The rebuilt group id can never match.
   - Fix: `recordedLease()` recovers the lease string from the action's 32-byte execution key (drops the zero padding,
     checks it re-encodes to the same bytes) and the rebuild uses it.
   - Proven by: txn dump of the original and rebuilt group (temporary, removed): the `'x' + lease` box now matches.

3. **Rebuilt upload groups placed group-shared resources in a different order** (`akita-sdk/src/wallet/plugins/update-akita-dao.ts`, SHARED).
   - Root cause: after fix 2 the only differences were the access lists of txn 1 and 2: the Update plugin's `'bc'`
     box and the factory app + its `'bc'` box swapped places. These resources are used by several calls of the group, so
     simulate reports them at group level (unordered, from algod maps) and algokit's resource population puts them on
     the first call with room in that order. Two builds of the same calls therefore hash to different group ids, and a
     resumed UpgradeApp proposal (voting DAO, or a window that opens later) cannot be sent.
   - Fix: `stagingReferences()` names these resources explicitly on the `initBoxedContract` call of `updateApp` (plugin
     `'bc'` + target app) and `updateFactoryChildContract` (plugin `'bc'`, factory app, factory `'bc'`). Group resource
     sharing makes them available to every call, and simulate no longer reports them. No contract change; the existing
     SDK unit tests (`update-akita-dao.test.ts`, 5/5) pin the update-call references and still pass unchanged.
   - Proven by: rollout "Phase 2 window that opens later: ... the resume sends it" (run 4 and final); the dumped
     original and rebuilt groups are identical except first/last valid before the restamp.
   - SDK rebuilt (lane pr-build). `sync-akita-plugin-principal.ts --check`: in sync. Reran `utils/principal.e2e` and the
     specs that drive the Update plugin builders (see the shared regression line below).

### Still open (not this group)

- `utils/principal.e2e` T32 (`expected 184 to be <= 150`): the known open decision (§9.6), unchanged by these fixes.
- `scripts/script-base.ts` resume (`--proposal-id`, HEAD code) rebuilds with a fresh `${leasePrefix}_${timestamp}` lease,
  so it has the same group-id mismatch as fix 2. Not exercised by any spec; not changed here.
- Shared regression for fix 3 (specs that drive `updateApp` / `updateFactoryChildContract`): `wallet-plugins.e2e`,
  `marketplace/compat.e2e`, `social/deployed-compat.e2e`, `dao.upgrade.e2e`, `dao.setup.e2e`, `sunset-integration.e2e`,
  `staking-pool/principal.e2e`: **7/7 files, 89/89 passed**.

## 2026-10-04 — Kyle decision: T32 opcode bound

- Kyle chose §9.6 option (a): accept the measured `principalOf` cost (184 / 194 / 196 ops for T06 / T08 / T11) and
  raise the T32 bound from 150 to 210. Option (b), taking `P(walletFactory)` as a resource, was rejected because it
  adds a resource reference to every hinted call.
- Changed: `utils/principal.e2e.spec.ts` T32 asserts `<= 210n`; spec §5.2 table, §3.7 and §9.6 updated. No contract
  change. T32 must be re-run on LocalNet to close §5.4.2.

## 2026-10-04 — asa-manager / optin plugin specs: registration prefund (found by the "Contracts review pass" full run)

- Failures: `arc58/plugins/asa-manager/asa-manager.e2e.spec.ts` "mint OK" and `arc58/plugins/optin/contract.e2e.spec.ts`
  "optin OK" expected `balance == minBalance` after wallet creation and got `minBalance + 12,100`.
- Root cause: by design. `newAccount` and the SDK quote still prefund `ARC58WalletIDsByAccountsMbr` (Phase 4 removes it)
  because TestNet/MainNet wallets keep registering until Phase 3 flips `REGISTRY_WRITES_STOPPED`. On LocalNet the SDK
  no longer registers, so the prefund stays in the wallet as its own free balance. Nothing is lost.
- Fix (tests only, same pattern as `arc58/account/contract.e2e.spec.ts`): `REGISTRATION_PREFUND = 12_100n`; optin's
  post-escrow assertion adds `2n * REGISTRATION_PREFUND` because `newEscrowMintCost` also prefunds the escrow's
  registration, which `addPlugin` no longer spends.

## 2026-10-04 — E2E group compat: first LocalNet run (fresh reset)

Scope: `tests/compat` (`compat-static.test.ts`, `compat.e2e.spec.ts`) plus every member spec in `tests/compat/members.ts`.
First run: 10 of 11 files green (all 9 member specs and the static test). `compat.e2e.spec.ts` had 4 failures (one
`beforeAll`, 3 tests). Root causes: 2 test-funding bugs, 1 test helper that AVM rejects, and 2 assertions that
contradict the deployed bytecode. No contract, SDK or shared-file change.

### Fixes

1. **D. LIVE wallets: the helper could not install the MainNet wallet program on a tree wallet** (`tests/compat/lib/install.ts`, `tests/compat/compat.e2e.spec.ts`).
   - Root cause: `installLiveWalletProgram` updated a tree-created wallet to the MainNet approval. The tree wallet is
     AVM 13 (`@contract({ avmVersion: 13 })`). The MainNet program is AVM 11. algod refuses the update twice: first
     "program version mismatch: 11 != 13" (the tree clear program was kept), then, with the v11 clear,
     "approval program version downgrade: 11 < 13".
   - Fix: the helper is removed. `D` now replays the MainNet history on the universe wallet factory (same app id, so
     the wallets stay genuine). Two UpgradeApp proposals through the Update plugin push the MainNet
     `AbstractedAccountFactory` program (with its MainNet clear) and then the MainNet `AbstractedAccount` child.
     `Wl` and `Wx` are created through the deployed `newAccount` selector. For `Wx`, `Cx` first rekeys to the factory,
     and the deployed factory rekeys it on to the wallet. Two more proposals then push the tree factory and the tree
     child back (Phase 2 order). Each step checks the bytes (sha256) and the auth address.
   - Proven by: `compat.e2e` D, 6/6 tests (the wallets run the MainNet program and are genuine; default, escrow and
     external-C windows resolve; hinted social `initMeta`; hinted subscriptions `newService`).

2. **B2 and D: test accounts were funded below the 100 ALGO service creation fee** (`tests/compat/compat.e2e.spec.ts`).
   - Root cause: `newService` charges `DEFAULT_SERVICE_CREATION_FEE` (100 ALGO, unchanged since HEAD) plus box MBR.
     The B2 merchant had 50 ALGO ("overspend ... tried to spend 101.3978A"). The D wallet had about 99.8 ALGO.
   - Fix: the B2 merchant gets 200 ALGO. The D subscriptions test pays the live wallet 150 ALGO first. No assertion
     changed.
   - Proven by: B2 "ungated subscribe ... exactly amount + the legacy newSubscriptionCost quote" and D "the NEW
     subscriptions plugin ..." pass.

3. **B5: the May raffle plugin's `enter` cannot work on any Raffle child, MainNet's included** (`tests/compat/compat.e2e.spec.ts`).
   - Root cause (disassembly of `fixtures/mainnet-programs.json`): `RafflePlugin.may` reads the child's
     `ticket_asset` with `app_global_get_ex; pop; btoi` (source at e7f174ee:
     `btoi(op.AppGlobal.getExBytes(appId, 'ticket_asset'))`). The MainNet Raffle child (box `bc` of 3569557743)
     stores `ticket_asset` as a uint64 (`txna ApplicationArgs 4; btoi; ... asset_params_get AssetTotal; ...
     app_global_put`). The new child keeps the uint64 (`GlobalState<Asset>`). So `enter` panics with "btoi arg 0
     wanted []byte but got uint64" on every child. This is a pre-existing MainNet break, not a Phase 2 regression.
   - Fix: the test asserted "pays exactly amount + 50,600 and is recorded", which contradicts the deployed bytecode.
     It now asserts the btoi panic, an unchanged balance and no entry on a NEW child, AND on a child created by the
     DEPLOYED RaffleFactory from the DEPLOYED child program (`raffle/compat/deployed.ts`, sha-checked against the
     MainNet `Raffle`). This corrects the "Raffle May" line of the 2026-10-04 compat-suite section above.
   - Proven by: B5 "the May plugin's enter panics ..." passes.

4. **B1: social v0.0.2 quotes the referral MBR for its CALLER, not for the wallet** (`tests/compat/compat.e2e.spec.ts`).
   - Root cause (disassembly of `SocialPlugin.v0.0.2`): the MBR quote calls EscrowFactory `get(address)byte[]`
     (0x3c1a6f33) on `txn Sender`. That is the plugin call's sender (the wallet's caller, normally an unregistered
     EOA), not the wallet. It adds 67,000 (+ `AssetOptInMinBalance` when Rewards lacks the asset) only if that
     registry wallet has a referrer. The deployed AkitaSocial (a3de927c, sha-equal to MainNet) charges
     `referralFee(dao, akta)` for its own `Txn.sender`, the wallet's spending address. The legacy shim keeps that
     charge (`feeReferrer(legacy)`). So a referred wallet's v0.0.2 post under-pays by the referral MBR and reverts
     `errIpay`, on MainNet today and on the shim.
   - A first attempt (opt Rewards into AKTA) was wrong and was reverted: v0.0.2 already adds the opt-in itself.
   - Fix: the test asserted "a REFERRED wallet's post passes and pays the referrer". It now asserts the bytecode facts
     (67,000 and the `get` selector), the `errIpay` revert, an unchanged Rewards allocation for the referrer and an
     unchanged AkitaSocial free balance. Unreferred v0.0.2 posts still pass with the exact documented deltas.
   - This corrects finding 4 of the compat-suite section above: no deployed social generation quotes a referred
     wallet's post correctly. If MainNet referred wallets must post through v0.0.2, the shim would have to absorb the
     referral MBR for legacy callers. That is a contract policy change for Kyle; it is not made here.

### Compat findings for the rollout (reported, no code change)

- The tree wallet program is AVM 13. AVM forbids a downgrade on update, so once a MainNet wallet is upgraded to the
  tree program it can never go back to the deployed (v11) program. A wallet rollback plan must not assume a revert.
- `tests/compat/lib/install.ts` no longer exports `installLiveWalletProgram`; `D` builds live wallets through the
  deployed factory program instead.

### Runs (LocalNet, shared lock, lane `compat`)

- Round 1, whole group: 11 files, 249 passed / 3 failed / 6 skipped (the D `beforeAll`).
- Rounds 2-5, `tests/compat` only: final round 2 files, 152/152 passed.
- Final, whole group (compat dir + 9 member specs): **11/11 files, 258/258 passed**.

## 2026-10-04 — Full suite on LocalNet (fresh reset), after all e2e groups

Scope: the whole vitest suite in `projects/akita-sc`, run twice under the shared lock (lane `pr-full`).
Pre-change baseline: 1,780 passed / 0 failed / 9 todo. The new suite has 2,398 tests.

### Run 1: 2 files failed in `beforeAll`, both from a LocalNet stall (no code change)

- Totals: 136 files passed, 2 failed, 1 skipped. Tests: 2,365 passed, 24 skipped, 9 todo. Duration 3,621 s.
- `arc58/dao/tests/plugins/dao.plugins.e2e.spec.ts`: `beforeAll` (full DAO universe setup) hit the 120 s hook
  timeout. 11 tests skipped.
- `arc58/account/rekeying.e2e.spec.ts`: `beforeAll` failed after about 60 s with `fetch failed` /
  `SocketError: other side closed` from algod (`getSuggestedParams` inside the SDK access-list builder). 12 tests
  skipped.
- Root cause: environment. algod slowed down from about 04:32Z to 04:51Z. Its log volume fell from 10,000-20,000
  lines per minute to about 500-1,500. At 04:50:30Z and 04:50:48Z algod logged "It's been too long since our ledger
  advanced; resyncing". The two failures fall inside this window (dao.plugins at about 04:42Z, rekeying at about
  04:50Z). Other files in the same window were also very slow but passed (`nfd/auto-renew` 194 s, `fixed-signers`
  189 s, `subscriptions-audit` 172 s).
- Proof that the code is not the cause:
  1. Both files alone, verbose (`full-rerun-1.log`): 23/23 passed.
  2. Both files alone again (`full-rerun-2.log`): 23/23 passed. `dao.plugins` takes 26 s in total, so its
     `beforeAll` is far from the 120 s limit.
  3. Full run 2 (below): both pass. `auto-renew` takes 17 s and `fixed-signers` 10 s, against 194 s and 189 s in
     run 1.
- No test, contract, SDK or shared file was changed.

### Run 2 (confirmation): green

- `with-localnet-lock.sh pr-full npx vitest run` (log `scratchpad/e2e/full-2.log`):
  **138 files passed, 1 skipped (139). Tests: 2,388 passed, 1 skipped, 9 todo (2,398). 0 failed.** Duration 2,362 s.
- The one skipped test is `arc58/account/backend-hosted-agent-identity-payment.e2e.spec.ts`. It is skipped by design
  (`describe.skipIf(AKITA_BACKEND_ARC58_GOLDEN !== '1')`, needs an external broker).
- `utils/principal.e2e.spec.ts` T32 (bound 210 after Kyle's decision) passes in both full runs.

## 2026-10-04 — Review of the e2e fixes: B1 shortfall pinned, T32 decision sourced

Two review findings on the e2e-fix sections above. One is fixed (test plus a test-only mock). One is rejected with
its source.

### Finding 1 (fixed): B1 did not show how much v0.0.2 under-pays a referred wallet

- Problem: B1 asserted that a referred wallet's post through `SocialPlugin.v0.0.2` reverts `errIpay`, but not the
  size of the shortfall. A shim that over-charged referred wallets (a double referral term, a wrong amount) would
  also revert and would be called "pre-existing". The note "reverts on MainNet today" had not been checked.
- The deployed v0.0.2 cannot be made to send a larger payment (its referral term reads the registry for `txn
  Sender`, and the registry holds only app addresses, so an EOA caller always gets 0). New test-only plugin
  `smart_contracts/mocks/legacy-social-poster/contract.algo.ts` (`MockLegacySocialPoster`). It sends, as the wallet's
  spending account, the same group v0.0.2 sends: pay(mbr), axfer(post fee) and the legacy `post` selector
  0x8e507f1b (in v0.0.2's outbound calls). The caller chooses `mbr`. On LocalNet the shim gives the legacy terms to any
  app caller, so the mock gets the same terms as v0.0.2. Not a shared file; built alone
  (`node scripts/build-contracts.mjs mocks/legacy-social-poster`, lane `pr-build`).
- New test in `tests/compat/compat.e2e.spec.ts` B1: "v0.0.2 under-pays a REFERRED wallet's post by EXACTLY the
  referral MBR". Steps:
  1. Read Q, the payment v0.0.2 itself sends to AkitaSocial, from a passing unreferred post (inner txns). Q = 99,500.
  2. For the referred wallet, through the mock: Q reverts `errIpay` (it reproduces v0.0.2's failure).
  3. Q + term - 1 reverts and Q + term passes. Term = 67,000 (MinDisbursementsMBR 41,700 + UserAllocationMBR
     25,300) + AssetOptInMinBalance when Rewards does not hold AKTA. On this run Rewards did not hold AKTA, so the
     term was 167,000.
  4. A second pass, now that Rewards holds AKTA (as on MainNet): Q + 66,999 reverts and Q + 67,000 passes.
  5. Each passing post grows the referrer's Rewards allocation. AkitaSocial's free-balance change equals the
     unreferred v0.0.2 post's change (-800, the documented `SOCIAL_LEGACY_DELTA.post`).
  The shim's payment check is an exact `match`, so these steps prove that the shim asks a referred wallet for
  exactly Q + one referral MBR. There is no double term and no wrong amount. The shortfall of v0.0.2 is exactly
  the referral MBR.
- MainNet history (indexer `mainnet-idx.algonode.cloud`, 2026-10-04): app 3633295088 (v0.0.2) has exactly one
  transaction, its creation (XGQ2MBEAMLG4OVGKOFPKARTQSIPNPDJIOHMFGBWEJ7TIDMWEQ4CQ). No post ever went through
  v0.0.2, so no referred-wallet post succeeded either. Nothing contradicts the claim, but it was never observed. The
  test comment now says "would revert on MainNet", read from the bytecode. The open policy question for Kyle (should
  the shim absorb the referral MBR for legacy callers?) stays as logged above. With no v0.0.2 traffic on MainNet,
  the practical impact is small.
- Proven by: `tests/compat/compat.e2e.spec.ts` + `compat-static.test.ts`, 2 files, 153/153 passed (log
  `scratchpad/e2e/review-compat-3.log`).

### Finding 2 (rejected, with source): the T32 bound raise was Kyle's decision

- Source: main session 2f032287 (`~/.claude/projects/-Users-kylebreeding-akita-akita-sc/2f032287-d925-4dca-955a-d169373dfdbd.jsonl`).
  At 2026-10-05T03:16:12Z (UTC; local evening of 2026-10-04) the session asked Kyle through the AskUserQuestion
  prompt how to resolve the 184-196 vs 150 overrun. The options were "Raise bound to ~210 (Recommended)" and "Add
  factory as a resource". At 03:16:51Z Kyle answered "Raise bound to ~210 (Recommended)". The edits to the test and
  spec (§3.7, §5.2, §9.6) followed at 03:17Z. The answer came through Kyle's own question prompt, not from an agent.
  K1-K9 were approved separately at 01:06Z, which is why T32 is not among them.
- Not reverted. Note for the record: 210 leaves 14 ops above the measured maximum (T11 = 196). A change to
  `principal.ts` that costs more than that turns T32 red again. That is intended: it makes the cost change visible
  and puts it back to Kyle.

---

## 2026-10-04 — Four open review items: SDK booleans, controlled-address MBR fees, script resume lease, carrier count

Each item was re-verified before the fix and has a regression test that fails on the old code. No contract changed.

### 1. `ListingSDK.state().isPrizeBox` returned `0n`/`1n`

- Re-verified: `src/marketplace/listing.ts` had `state.isPrizeBox as unknown as boolean ?? false`. The generated
  `ListingClient` types `isPrizeBox` as `bigint` (the bool global is stored as uint64), so the cast returned `1n`.
- Grep of the whole SDK (`src`, generated clients excluded) for `as unknown as boolean`: this was the only one. The other
  `?? false` readers return ABI `bool` results (already `boolean`). `WalletSDK`/`AkitaDaoSDK.getGlobalState` cast the
  generated `GlobalKeysState` to an alias of itself (no boolean fields changed).
- Fix: `isPrizeBox: Boolean(state.isPrizeBox ?? 0n)`, as in `auction/index.ts`.
- Test: `src/marketplace/index.test.ts` "ListingSDK.state … isPrizeBox decodes to a real boolean" (`1n` → `true`,
  `0n` → `false`, missing → `false`). With the old line it fails (`Received: 1n`).

### 2. Inner MBR payment/refund fee under an external controlled address

- Re-verified in `AbstractedAccount`: `_payMbrFromControlled` / `_refundMbrToControlled` send an inner payment only when
  the controlled address is not the wallet app address. The methods that use them: `arc58_addPlugin`/`addNamedPlugin`
  (fixed earlier), `removePlugin`/`removeNamedPlugin` (already had `externalControlledRefundFee`), `assignDomain`
  (already had `domainKeyExtraFee`), and, with no extra fee: `arc58_addAllowances`, `arc58_removeAllowances`,
  `arc58_addExecutionKey` (both branches), `arc58_removeExecutionKey` (`deleteExecution`), `arc58_newEscrow` (escrow
  box; plus the factory path when it mints). Also the `arc58AddAllowances` call that `addPlugin` adds to its own group,
  and `group().removePlugin`, had no extra fee.
- Proof of the bug (old SDK dist, LocalNet, coverage off): the new e2e test fails at its first call with
  `group fee 0.0A too small (needs 1mA more)` (log `scratchpad/e2e/review4-mbrfee-olddist.log`).
- Fix (`src/wallet/constants.ts`): `controlledMbrFee(hasExternal, moves = 1)` (1,000 µA per MBR move, 0 when the
  controlled address is the app) and `newEscrowExtraFee(mintsEscrow, hasExternal)` (`NewEscrowFeeAmount` when minting +
  one escrow-box payment). `addPluginExtraFee` is now written with `controlledMbrFee`; its values are unchanged.
  `WalletSDK.hasExternalControlledAddress()` / `controlledMbrExtraFee()` (`@internal`) replace the private
  `externalControlledRefundFee`; `WalletGroupComposer` reuses them. Applied to `addAllowances`, `removeAllowances`,
  `addExecutionKey`, `removeExecutionKey`, `newEscrow` (wallet and group), the in-group allowances of `addPlugin`
  (wallet and group) and `group().removePlugin`.
- With `coverAppCallInnerTransactionFees` on (the default send params), AlgoKit counts an explicit `extraFee` as
  surplus and adds only the deficit, so the total fee does not change. The fix matters when coverage is off (for
  example after `setSendParams` without the fee flags).
- Tests: `src/wallet/controlled-mbr-fee.test.ts` (5: helper values; every method, wallet and group, sends 1,000 µA per
  MBR move on an external wallet and 0 on a wallet-controlled one, `NewEscrowFeeAmount` when minting). E2E
  `arc58/account/account-fixes.e2e.spec.ts` (ACC-05 group, external controlled wallet, coverage off): the sender pays
  exactly `1,000 + extra` per call (newEscrow 1,000 + 6,000 + 1,000; allowances and execution keys 2,000 each; the
  grouped add + remove 4,000), and the controlled account's balance moves by exactly the MBR (newEscrow:
  `newEscrowMintCost - 12,100`, because that cost also counts the legacy registration MBR that newEscrow does not pay).

### 3. `script-base.ts --proposal-id` rebuilt with a fresh lease

- Re-verified: `runUpdate` built the execution with `${leasePrefix}_${Date.now() % 1e6}` before it read the proposal,
  and `restampExecutionFromProposal` only set `txn[0].lease`. The wallet's execution box reference ('x' + lease) is in
  each hashed group, so the rebuilt group ids could not match the proposal.
- Fix: `recordedLease` moved from `scripts/lib/principal-rollout-run.ts` to the new `scripts/lib/execution-lease.ts`;
  both scripts import it (no copy). `runUpdate` now reads the proposal and its UpgradeApp action first and builds with
  `updateExecutionLease(leasePrefix, resumedAction)` (the recorded lease when resuming, the fresh one otherwise).
  `recordedLease` also now throws its own error (instead of a `RangeError`) when a key holds invalid UTF-8 that decodes
  to more than 32 bytes.
- Test: `tests/update-execution-lease.test.ts` (6): `recordedLease` round-trips `encodeLease` and refuses non-padded
  keys; `updateExecutionLease`; and `runUpdate` with a mocked context builds the resumed execution with the recorded
  lease (fails with the old fresh-lease call) and a fresh run with `prefix_NNNNNN`.

### 4. Reply test accepted 1 or 2 resource carriers

- Root cause: the SDK's Access planner (`akita-sdk/src/simulate/access-list.ts`) is greedy and places resources in the
  order simulate reports them. algod reports unnamed resources in Go map order, which changes on every call. Proof:
  six identical simulates of one `getVotes` call (12 keys) on LocalNet returned 24 boxes in six different orders
  (lane `review4-simorder`). The reply's resource set is the same in every run (indexer, 17 reply groups from 9 runs:
  8 boxes on AkitaSocial, 6 + 2 + 2 + 1 + 1 on five other apps, two AKTA holdings, one app). Replaying the SDK's
  `populateAccessListResources` on that set in 2,000 random orders gives 1 carrier in about 30 % and 2 in about 70 %;
  sorted by app it always gives 1. So the count was not a function of the test inputs and could not be parameterized:
  it was decided by algod's map order on each simulate.
- Fix: `canonicalResources` sorts every simulate-reported resource list at the algod boundary (`normalizedResources`):
  apps/assets by id, accounts by public key, boxes by app then name, holdings/locals by address then id. The boxes of
  one app are then adjacent, and the carrier count depends only on the group's resources.
- `social.e2e` "reply to a post" now asserts exactly one carrier at 1,000 µA and `MIN_TXN_FEE × 13` total.
- Side effect, proven: `social.e2e` "upvote a post" uses the same 31-entry resource set. In all 9 earlier runs on this
  LocalNet (indexer) algod's order happened to give it 2 carriers (group fees 15,000); with the canonical order it
  takes 1 (rounds 196441/196464/196482: access 16/16, group fees 14,000). Its expectation goes from 14 to 13 min fees
  (1,000 µA less for the user). No other assertion changed.
- Tests: `src/simulate/access-list.test.ts` "canonicalResources" (3): random orders of the reply-shaped set give both 1
  and 2 carriers; in canonical order all give exactly 1; the order is stable. `social.e2e` 3 runs: the reply test
  passed with exactly 1 carrier in all three (upvote failed by exactly 1,000 µA in all three before its update).

### Not changed (seen while fixing item 3)

- `runUpdate` (script-base) never passes `daoBinding` to the Update plugin, so it builds lease-read groups only. On a
  DAO without `isUpgradeLease` (the deployed MainNet DAO uses the proposal read) its groups would not bind; the
  principal rollout uses `principal-rollout-run.ts`, which handles both modes. Not in this item's scope.

### Ran (all inside `with-localnet-lock.sh`, logs in session scratchpad `e2e/`)

- SDK rebuilt twice (`review4-sdk-build-{1,2}.log`), after items 1-2 and after item 4.
- akita-sdk `npx vitest run`: 46 files, **472 passed / 0 failed** (`review4-sdk-unit.log`).
- akita-sc `npx vitest run --exclude '**/*.e2e.spec.ts'`: 18 files, **289 passed / 0 failed** (`review4-sc-unit.log`).
- `account-fixes.e2e` new fee test: fails on the old dist (`review4-mbrfee-olddist.log`), passes on the new
  (`review4-mbrfee-1.log`).
- `social.e2e` ×3 (`review4-social-x3.log`): reply exact (1 carrier) in all three; upvote off by exactly 1,000 µA in
  all three before its expectation was updated.
- Full akita-sc suite, because the canonical order changes the packing in every spec (`review4-full-1.log`):
  **139 files passed, 1 skipped (140). Tests: 2,396 passed, 1 skipped, 9 todo (2,406). 0 failed.** The skipped file is
  `backend-hosted-agent-identity-payment.e2e` (by design, external broker).

## 2026-10-05 — Review: item 3 (`runUpdate --proposal-id`) had no chain proof

- Finding accepted. `tests/update-execution-lease.test.ts` uses a mocked context whose `build.usePlugin` throws, so
  `restampExecutionFromProposal` and its group-id comparison never ran. It proved only that the recorded lease string
  reaches `usePlugin`. A resume rebuilds every other byte (Access lists, covered fees) from simulate at resume time,
  after the chain has changed (the proposal exists; when executed, the wallet's 'x' + lease execution box exists too).
  The 2026-10-04 entry's "fixed" claim was stronger than that evidence.
- No code change was needed: the new e2e test passes on the current code. Nothing in `scripts/` or the SDK changed.
- Test: `tests/update-resume.e2e.spec.ts` (2, LocalNet, `bootstrapDaoTestContext` full setup). Each test makes a real
  UpgradeApp proposal through `updateChildren` → `runUpdate` for a new staking-pool child, stops the first run, then
  runs again with `options.proposalId` (the `--proposal-id` path). Assertions: no new proposal is created; `usePlugin`
  is built once, with `recordedLease(action.executionKey)`; `restampExecutionFromProposal` does not throw (log line
  "Proposal group ids match rebuilt ..."); the update confirms (round > 0); `runUpdate`'s version and approval-bytecode
  checks pass; the pool's other global state is unchanged.
  - Executed (status 50): the first run's execution `send` throws after `proposeAndExecute`. The resume sees the
    execution box and skips `executeProposal` ("already executed").
  - Approved, not executed (status 40): the first run's `executeProposal` throws. Control first: a resume whose
    `usePlugin` gets another lease (`child_fresh_123456`, the pre-fix behaviour) is refused with "Rebuilt group 1 does
    not match proposal group id", and the proposal stays at 40. Then the real resume executes the proposal (status 50)
    and the update confirms.
- `principal-rollout-run` resume: its executed-state resume already has chain coverage
  (`update-akita-dao/rollout.e2e.spec.ts` "Phase 2 window that opens later", `restampExecution` compares group ids).
  Its created-not-executed resume has no e2e test; not added here (the finding's fix asks for `runUpdate` or the
  rollout).
- Limits, recorded as the finding asks:
  - Item 3 depends on item 4. Before `canonicalResources`, the Access lists came in algod's Go map order, which
    changes per simulate. A resume then matched only when the order happened to give the same packing, even with the
    right lease.
  - A proposal recorded with an SDK from before `canonicalResources` (built before 2026-10-04 item 4) cannot be
    resumed with the current SDK. Its groups hold Access entries in the old random order; the rebuild places them in
    sorted order, so the bytes and the group id differ (unless the old order was already canonical). This applies to
    `runUpdate` and `principal-rollout-run` resume. Such a proposal must be cancelled and proposed again. Only LocalNet
    proposals can be affected: nothing is deployed.
- Ran (inside `with-localnet-lock.sh`, lane `review5-resume`, logs in session scratchpad `e2e/`):
  `update-resume.e2e` 3 runs, 2/2 passed each (`review5-resume-{1,2,3}.log`; runs 2-3 also ran
  `update-execution-lease.test.ts`, 6/6). `tsc -p tsconfig.test.json`: no errors in the new file.

## 2026-10-05 — Final verification on the final tree (build, unit, types, full suite, manifest)

Scope: the final tree, after the B1 exact-shortfall test (`tests/compat`), `mocks/legacy-social-poster` and the
`update-resume` e2e test. No contract, SDK, script or test code changed in this pass; only docs.

### Ran (all LocalNet, build and test commands inside `with-localnet-lock.sh`; logs in session scratchpad `e2e/`)

1. **Whole-tree build, no bytecode change** (lane `pr-build`, `final-build.log`). `node scripts/build-contracts.mjs`
   (puya-ts 1.3.1 / puya 5.10.1), then `npm run build` in akita-sdk; both exit 0. Before the build, the sha256 of every
   file under `smart_contracts/artifacts/` and `akita-sdk/src/generated/` (1,472 files) and `akita-sdk/dist/` (510
   files) was recorded. After the build all three sets are byte-identical, so no app's bytecode changed versus the tree
   the tests ran on. This includes `MockLegacySocialPoster`, which had been built alone (single-file mode, §9.3): the
   whole-tree build gives the same bytes. `git status --porcelain` over the two artifact paths lists the same 679
   entries before and after (506 M, 166 ??, 7 D versus HEAD; all from this work and earlier uncommitted work, none from
   the rebuild). The hashes were checked again after the full suite: unchanged.
2. **Static checks.** `npx tsx scripts/sync-akita-plugin-principal.ts --check`: in sync. akita-sc unit tests
   (`npx vitest run --exclude '**/*.e2e.spec.ts'`, lane `pr-final-unit`, `final-sc-unit.log`): 18 files, **289/289**
   (incl. `principal-sync` 7, `logged-error-codes` 2, `auction/principal-abi` 21 with the RaffleFactory sha pin).
   akita-sdk `npx vitest run` (`final-sdk-unit.log`): 46 files, **472/472**. `tsc --noEmit`: akita-sdk has no root
   tsconfig (`tsc --noEmit` alone prints the help text), so it ran with `-p tsconfig.esm.json` and
   `-p tsconfig.cjs.json`: **0 errors** each. akita-sc `tsc --noEmit`: **9 errors, exactly the 9 known pre-existing
   ones** (deploy-gates, deploy-rewards-v2, dao.voting e2e, guild test-helpers ×4, launch-hooks e2e, staking-pool e2e;
   `final-sc-tsc.log`).
3. **Full suite, once** (lane `pr-final`, `final-full.log`): **140 files passed, 1 skipped (141). Tests: 2,398 passed,
   0 failed, 1 skipped, 9 todo (2,408).** Duration 2,057 s. The skipped file is
   `arc58/account/backend-hosted-agent-identity-payment.e2e.spec.ts` (by design, external broker). The 9 todo are in
   `social/social.e2e` (5), `akita-router.e2e` (3) and `backrun-arb.e2e` (1). +2 tests against the previous full run
   (2,396): the two `tests/update-resume.e2e.spec.ts` tests. No failure, so no rerun. `utils/principal.e2e.spec.ts`
   56/56; T32 printed `T06=184 T08=194 T11=196` (bound 210). algod answered `/health` 200 throughout.

### Docs changed

- `PHASE-0-SPEC.md`: status line and §9 intro set to the final numbers (V0 56/56 with T32 at 210, every group green,
  full-suite totals, unit and type checks); stale "pending" claims removed (§9.5 verification list marked done,
  P2-CMP-01 LocalNet half, the K6 RaffleFactory precondition marked met, §9.6 T32 "re-run" closed). Accepted residuals
  kept. The open policy question is now in §9.6 as **P1**: should the legacy social shim absorb the referral MBR for
  referred wallets' posts through a deployed social plugin (pending Kyle). New **§9.7 "Final artifact manifest
  (2026-10-05)"**: approval bytes, clear bytes, extra pages and sha256 of the approval program for the 32 apps of §9.2
  and the 17 test-only principal mocks, from the decoded ARC-56 `byteCode` of the whole-tree build. RaffleFactory
  (`0b1b10e7…8474`) and UpdateAkitaDAOPlugin (`bc034036…eb4e`) match the values already recorded.
- `STANDARD.md` §3.7: the measured costs (184 / 194 / 196 ops for T06 / T08 / T11) and the 210 bound, with the
  reason the old 150 bound cannot be met; the step estimate is kept as a guide.

## 2026-10-05 — Kyle decision: P1 (legacy social referral MBR)

- Kyle chose §9.6 P1 option (a): the AkitaSocial legacy shim does NOT absorb the referral MBR for referred wallets'
  posts through deployed social plugins. Those posts keep reverting `errIpay` (as on MainNet today) until the wallet
  moves to the Phase 3 social plugin. Reason: absorbing would let anyone drain 67,000–167,000 µA per post from
  AkitaSocial through an old plugin. No code change; compat B1 already asserts this behaviour exactly.

## 2026-10-05 — Review fixes, rollout lane (ACCT-1, ACCT-2, ACCT-3, ROLLOUT-1, ROLLOUT-2, ROLLOUT-3, MISC-6)

Findings: `projects/akita-sc/audits/review-2026-10-05/` (ACCT.md, ROLLOUT.md, MISC.md). Kyle, 2026-10-05: "fix all
of them". Order rules are summarised in `ROLLOUT-ORDER.md`.

- **ACCT-1.** `SunsetContract`, `WalletFactorySunsetContract` and `AbstractedAccountUpdateStub` now compile at AVM 13
  (`@contract({ avmVersion: 13 })`; 695 B and 1,111 B approval). A wallet on the tree program refuses any lower-version
  update, so the old AVM 11 sunset could never reach the DAO wallet once it moved to AVM 13. Every sunset push through
  the Update plugin now passes the AVM 13 clear program (`updateApp({ clearProgram })`). Both sunset scripts now sunset
  and delete the DAO wallet before they delete the DAO app, and simulate the whole DAO wallet sequence first
  (`execute-deployer-sunset.ts`: once after the factory swap while the DAO is live, once right before the push).
- **ACCT-2.** `scripts/lib/sunset-steps.ts` `walletFactorySunsetCalls` stages SunsetContract as the factory child and
  swaps the factory approval in ONE execution group (11 txns; one rekey window). Both scripts use it. The legacy
  builder in `execute-deployer-sunset.ts` now merges consecutive calls to one plugin into one window, like
  `WalletSDK.build.usePlugin`.
- **ACCT-3 / ROLLOUT-3.** The wallet child is mandatory for the AbstractedAccountFactory target (`--skip-wallet-child`
  and `optional` removed; `child.atomic`: a split plan is a blocker). `planTarget` refuses a child the receiving
  factory cannot create (`childPushProblems`: the factory must embed the child's create selector and its clear
  program; the deployed factory has neither for the AVM 13 wallet). `runUpdate` refuses every app the Phase 2 runner
  upgrades (eight singletons, DAO, HyperSwap, PollFactory) and checks the same child rule. The Phase 2 CLI moved to
  `scripts/lib/principal-phase2-cli.ts`; `update-wallet-factory.ts` (child-only by default, refused on an old factory),
  `update-account-factory.ts`, `update-hyper-swap.ts` and `update-poll.ts` call it; `update-dao.ts` upgrades the DAO
  through `runPhase2` and checks Phase 2a before the validator steps. `update-dao-wallet.ts` prerequisite text fixed.
  The ROLLOUT-5 suggestion to canary with `--skip-wallet-child` is dropped (it conflicts with ACCT-3).
- **ROLLOUT-1.** The StakingPoolFactory target lists Staking (`aal.staking`) and Rewards (`aal.rewards`) as
  dependencies. `planTarget` scans the pushed programs for every Staking / Rewards selector they call and blocks while
  the live program lacks one. Against MainNet today it blocks on `releaseAppStake(uint64,address,uint64)void` and
  `closeDisbursement(uint64)void`.
- **ROLLOUT-2.** HyperSwap is a Phase 2 ride-along target (`--target HyperSwap`, never default). The removal of
  `accept(pay,uint64,byte[32][])void` is recorded as decision `ROLLOUT-2` (2026-10-05) in
  `principal-accepted-abi-removals.json`, bound to the deployed program `ce5d5f4f…9a41`. The deployed-ABI snapshot gained
  the HyperSwap and PollFactory HEAD programs (both equal MainNet). The run deploys the new HyperSwapPlugin and swaps the
  DAO wallet grants right after the upgrade (`lockstep`, `splitLockstep`).
- **MISC-6.** PollFactory is a ride-along target with lockstep PollPluginContract. The new plugin reads `newPollCost`,
  so it works on both factories and its grant swaps BEFORE the factory upgrade. The SDK legacy list is the plugin
  deployment history in `akita-sdk/src/networks.ts`; the deployed PollPlugin ids are already there and become legacy
  when the new id is recorded (`--register`). No SDK change.
- **Not fixed (out of scope):** ACCT-6 (wallet escrows cannot be deleted). With escrows owned by the DAO wallet,
  `execute-deployer-sunset.ts` now stops at its first simulation, after the factory swap but before the DAO becomes
  SunsetContract.
- **Found by the new simulation (reported, not fixed):** the DAO wallet account cannot close while it is the
  creator of ASAs that others hold. The old scripts also closed only non-zero holdings, so zero-balance opt-ins
  blocked the close too. `walletAssetCloses` now closes every opt-in (zero balances to the asset creator) and skips
  created assets. The full DAO wallet teardown stays refused in simulation until that design question is settled.
- **Tests:**
  - `rollout.test.ts` 53/53, including the 11 new `review 2026-10-05: rollout guards` tests. Each new guard was
    mutation-checked.
  - `compat-static` 121/121.
  - LocalNet: `sunset-staging.e2e` 2/2 (the ACCT-2 test fails on the old two-execution flow: a stranger converted
    the user wallet), `sunset.e2e` 12/12, `wallet-factory-sunset.e2e` 3/3, `sunset-integration.e2e` 1/1,
    `sunset-plugin.e2e` 6/6, `rollout.e2e` 12/12, `migration-scripts.e2e` 60/60, `update-resume.e2e` 2/2.
