# Lane social report (SOCIAL.md, SUBGATE.md)

Paths are under `projects/akita-sc/smart_contracts/` unless they say otherwise.

## Findings

### SOCIAL-1 (Medium): done for the hinted route. The legacy route is unchanged on purpose.

The flow, confirmed in code before the change:
- `tipCreator` decided the route with `checkTipMbrRequirements` on `creator.isOptedIn(akta)`.
- The ARC-58 route always opts in and pays `getOriginAccount(wallet)`.
- So for an escrow creator E (meta wallet W), the route called `OptInPlugin.optIn` on W.address. It reverted
  with `errAlreadyOptedIn` once W.address held AKTA.

The change:
- `social/base.ts:55-76` adds the non-ABI `tipRoute(akitaDAO, creator, wallet)`. It returns `{ type, arc58, receiver }`:
  - `wallet == 0`, or `creator` holds AKTA: direct to `creator`, no charge.
  - Otherwise the receiver is the wallet origin.
  - If the origin has no AKTA and the wallet allows the opt-in plugin, use the ARC-58 route. The tipper is
    charged `Global.assetOptInMinBalance`.
  - In every other case, tip the origin directly with no charge. If the origin has no AKTA, the remainder goes to the DAO.
- `social/contract.algo.ts:486-509` (`tipCreator`):
  - Hinted calls use `tipWallet` + `tipRoute`, and the direct route pays `receiver`.
  - Legacy shims still use `checkTipMbrRequirements` on the raw `meta.wallet`. Its ABI and behavior are unchanged,
    because the deployed plugins compile the same check and quote it.
- `arc58/plugins/social/contract.algo.ts`: all 8 quote sites now use `this.tipRoute(...).arc58`, so the new plugin
  quote matches the target. The doc comment at line 28 now names `tipRoute`.

Residual (not fixed, reported):
- A creator can still close the origin's AKTA holding by hand after each tip. Each such close makes the next
  tipper pay 0.1 ALGO again, so the attack costs the creator one transaction per tip.
- The automatic forged-wallet variant is closed. Once the origin holds AKTA, the direct route never calls the wallet.
- Closing the manual cycle needs per-origin state, for example a box marking "opt-in already funded once" plus a
  readonly getter for the plugin quote. That is a new box prefix and a new ABI method, so I did not do it.
- The legacy shims (deployed plugins) keep Scenario B. This is the deployed behavior, and their quotes depend on it.
- `docs/principal-resolution/PHASE-0-SPEC.md:206` (R-CREATOR) is not in my lane and still needs correcting.

Behavior change: a creator without AKTA whose verified origin holds AKTA now receives the tip at the origin. This
also applies when the wallet does not allow the opt-in plugin. Before, that tip went to the DAO.

### SOCIAL-2 (Medium): done.

- `social/contract.algo.ts:458-467`: `tipCreator` now takes the already-resolved fee referrer.
- `createReply` (`:690`) passes `this.feeReferrer(referrer, legacy)`, so reply behavior is unchanged.
- `createVote` (`:760-764`) and `createReaction` (`:822-825`) pass `Global.zeroAddress` when `legacyTerms(legacy)`.
  So up-votes, flips to up (through `editVote` → `createVote`) and reacts from the deployed plugins pay no referral.
  AkitaSocial no longer pays the referral disbursement MBR for them.
- The `if (!legacyTerms) extra += tip.referralMbr` branches are gone. `referralMbr` is 0 under legacy terms, so
  `extra = tip.arc58 + tip.referralMbr` is uniform.
- No ABI change, and no change to any plugin quote.

### SUBGATE-1 (Medium, short grace): done. SUBGATE-4 (Low) is resolved by the same rule.

- `gates/sub-gates/subscription/constants.ts`: `SubscriptionGraceMax = 86_400`, documented.
- `gates/sub-gates/subscription/utils.ts:32-49`: new `subscriptionPaidUp(startDate, interval, lastPayment)`.
  - It is true when `lastPayment >= currentWindowStart`.
  - It is also true when `lastPayment >= previousWindowStart` and `now < currentWindowStart + min(86_400, interval / 4)`.
  - It returns false for `interval == 0` or a future `startDate`.
  - The window boundaries match `Subscriptions.canTrigger` and `incrementStreakOnPayment` (`>=`), which fixes SUBGATE-4's strict `>`.
- `getActiveSubscription` (`utils.ts:90`) uses it. Both `SubscriptionGate` and `SubscriptionStreakGate` call
  `getActiveSubscription`, so the two gates stay consistent (the streak gate requires `active` first).
- `social/impact.algo.ts:64` (`isSubscribed`) uses the same helper, imported from the sub-gate utils. Subscriber
  impact and the `cacheMeta` `subscriptionIndex` assert (`errNotASubscription`) now follow the same rule.

## Regression tests

| Test | File | Failed before the fix? |
|---|---|---|
| `SUBGATE-1 paid-up rule ... a payment covers its own window plus min(1 day, interval / 4), not the whole next window` | `gates/subscription-gates.e2e.spec.ts:152` | Not run on old code (the tree is shared). Inferred from the old formula: the window-2-in-grace check fails (old strict `>`), and the window-3-past-grace check would return true (old `lastPayment > start(W2)`). |
| `SOCIAL-1 tip route: an escrow creator is tipped at the wallet origin; only an origin without AKTA costs the tipper an opt-in` | `arc58/plugins/social/principal.e2e.spec.ts:286` | Not run on old code. Inferred: on the second tip the old code takes the ARC-58 route again (E holds no AKTA) and reverts `errAlreadyOptedIn` on W.address. The test also checks that overpaying by the opt-in now fails `errIpay`, which proves no opt-in is charged. |
| `SOCIAL-2: up-votes and reactions of a referred wallet pay no referral, so vote cycles cannot drain AkitaSocial` | `arc58/plugins/social/deployed-compat.e2e.spec.ts:181` | Not run on old code. Inferred: old code pays the referral disbursement MBR (`costInstantDisbursement`) from AkitaSocial on each referred up-vote, so the free-balance equality fails. The react delta is asserted as +3,200 (SOCIAL-6, unchanged). |

Existing test changes:
- `deployed-compat.e2e.spec.ts`: the `legacyWallet` helper takes an optional `referrer`.
- `subscription-gates.e2e.spec.ts`: my new test tops up the shared merchant by 150 ALGO. The extra service
  otherwise starved the later streak test (overspend).
- No existing assertion was weakened.

## Files changed (my edits only; these files already carried uncommitted principal-resolution work)

- `social/base.ts`
- `social/contract.algo.ts`
- `social/impact.algo.ts`
- `arc58/plugins/social/contract.algo.ts`
- `gates/sub-gates/subscription/constants.ts`
- `gates/sub-gates/subscription/utils.ts`
- Tests: `gates/subscription-gates.e2e.spec.ts`, `arc58/plugins/social/principal.e2e.spec.ts`, `arc58/plugins/social/deployed-compat.e2e.spec.ts`
- Shared files: none. SDK: none needed. `SocialSDK` does not quote the ARC-58 opt-in, and every ABI is unchanged.

## Tests run

- Build: `node scripts/build-contracts.mjs social arc58/plugins/social gates`. Exit 0, no warnings or errors.
- `social/legacy-abi.test.ts` (unit): 14/14 pass.
- LocalNet run 1, before two test-setup fixes: 25 pass, 2 fail.
  - My SOCIAL-1 test failed because the second voter had no meta.
  - The streak test failed because my test's extra service drained the shared merchant.
- After both fixes:
  - `subscription-gates.e2e.spec.ts` + `arc58/plugins/social/principal.e2e.spec.ts`: 18/18 pass.
  - `social/social.e2e.spec.ts`, `social/principal.e2e.spec.ts`, `arc58/plugins/social/social.e2e.spec.ts`,
    `arc58/plugins/social/deployed-compat.e2e.spec.ts` and `gates/ctx-sub-gates.e2e.spec.ts`: 5 files, 167 pass, 5 todo, 0 fail.
- One attempt failed in `buildAkitaUniverse` → `deployAuctionFactory` (min balance) while another lane's work was
  in flight. The retry 3 minutes later passed. No edits from me.

## Size / schema / ABI for apps live on MainNet

| App | Before (approval + clear) | After | Pages | Global schema | ABI |
|---|---|---|---|---|---|
| AkitaSocial 3569557130 | 10,884 + 4 = 10,888 B | 11,016 + 4 = 11,020 B (+132) | 6 (ExtraProgramPages 5), unchanged; under the 12,288 B cap | 8 / 56, unchanged | 46 methods, unchanged; legacy-abi 14/14 |
| AkitaSocialImpact 3569556973 | 2,960 + 4 B | 3,064 + 4 = 3,068 B (+104) | Fits the live 3 extra pages; no growth needed | 1 / 1, unchanged | 14 methods, unchanged |

New or immutable apps:
- AkitaSocialPlugin: 8,030 → 7,915 B approval (−115 B, still 4 pages).
- SubscriptionGate: 1,530 → 1,599 B.
- SubscriptionStreakGate: 1,771 → 1,840 B.

## Rollout changes

- AkitaSocial still needs the existing page-growing update (`ExtraProgramPages = 5`). The program is 132 B larger
  and the page count is unchanged.
- The SOCIAL-2 fix removes the referral payout on up-votes and reacts through the four pinned deployed plugins.
  Referrers of old-plugin users lose that cut, and AkitaSocial's free balance is no longer drained by vote cycles.
  Rollout step 7 ("monitor and top up ... or apply the SOCIAL-2 fix") can drop the top-up.
- Ship the new social plugin (Phase 3) from this build. Its quotes use `tipRoute`, so it must pair with the
  upgraded AkitaSocial, as it already must.
- Sub-gates are new apps, so no migration is needed. Impact's `isSubscribed` tightening applies at the Impact
  upgrade. A user whose subscription is past the grace and unpaid loses subscriber impact until the window is paid.
- Still open (not my lane): correct R-CREATOR in `docs/principal-resolution/PHASE-0-SPEC.md:206`.
