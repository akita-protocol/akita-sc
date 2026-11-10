# SOCIAL slice: production-readiness review (2026-10-05)

Verdict: **ISSUES** (no Critical or High; 2 Medium, 4 Low, several Info).

All paths are relative to `projects/akita-sc/smart_contracts/` unless they say otherwise. Line numbers are from the
working tree on 2026-10-05.

## Scope

| File | Lines |
|---|---|
| `social/contract.algo.ts` (AkitaSocial) | 1,749 |
| `social/graph.algo.ts` (AkitaSocialGraph) | 205 |
| `social/impact.algo.ts` (AkitaSocialImpact) | 512 |
| `social/moderation.algo.ts` (AkitaSocialModeration) | 136 |
| `social/base.ts`, `social/constants.ts`, `social/errors.ts`, `social/types.ts` | 73 / 123 / 100 / 210 |
| `social/legacy-abi.test.ts` (ran it: 14/14 pass) | 161 |
| `arc58/plugins/social/contract.algo.ts` (AkitaSocialPlugin) | 1,244 |
| `arc58/plugins/social/errors.ts`, `deployed/deploy.ts`, `deployed-compat.e2e.spec.ts` | 75 / 91 / 284 |
| Cross-read: `utils/principal.ts` (381), `utils/functions.ts` (referral, principal and gate helpers), `arc58/plugins/optin/contract.algo.ts` (26), `rewards/contract.algo.ts` (close and credit paths), `arc58/account/contract.algo.ts:848-858` (wallet `update`), compiled `artifacts/social/*.arc56.json` and TEAL | |

**Read-only MainNet checks** (public nodely algod and indexer; scripts in `review/social/` and the earlier `review/social-scan.mjs`):

- MainNet runs ConsensusV42 (`AppSizeUpdates = true`, `MaxAbsoluteExtraProgramPages = 7`).
- The genesis hash equals `MainNetGenesisHash`. All four pinned plugin ids exist on MainNet.
- AkitaSocial 3569557130:
  - The live approval is 8,186 B, with sha256 `77c643ca…856f`. This matches `social/deployed/AkitaSocial.3569557130.program.json`.
  - It is TEAL v11, has 3 extra pages and a schema of 8 uints / 56 bytes.
  - Its globals are `akita_dao, version, akita_escrow, paywall_id, ref_type_counter`.
  - Its free balance is 7,637,100 µA.
- Graph 3569557033, Impact 3569556973 and Moderation 3569557176 are TEAL v11 with 3 extra pages and a 1/1 schema.
- Box data:
  - Box counts: p 279, v 279, o 771, e 212, r 101, m 56, w 13, t 1.
  - There are no `x` or `y` boxes yet.
  - No two post keys share a 16-byte prefix.
  - Every `v` box has a matching post (0 orphans).
  - Every legacy `o` and `e` entry has a post with the same 16-byte prefix.
  - Each legacy reaction count matches its `r` counter (0 mismatches).
- All 56 metas have `initialized = true`. Every meta that has a wallet has `controlled_address == user`.
- No post or meta uses a gate (gateID, followGateID and addressGateID are all 0).
- The newest post is from 2026-09-19.

## Prior-finding verification (audit-social.md / fix-social.md)

| ID | Status | Evidence |
|---|---|---|
| S-01 | **Fixed** (residuals SOCIAL-4, SOCIAL-5) | New votes go to `voteRecords` `'x'` and new reactions to `reactionRecords` `'y'`, keyed `sha256(user‖ref[‖NFT])` (`contract.algo.ts:59-66, 78-84`). No code writes to the legacy maps anymore; it only reads and deletes them (`:1316-1325, :1429-1434`). `createVote` and `createReaction` reject an existing record in either map (`:736-740, :803-808`), so neither a double vote nor a double reaction is possible across the two namespaces. A legacy undo needs `assertLegacyRef(ref)`: `posts(ref)` must exist and have `timestamp < legacy_list_cutoff`, or the cutoff must be unset (`:104-112`). Every place that creates a posts box stamps the cutoff first (`:507, :639, :707`) and writes `timestamp: Global.latestTimestamp`, so a post created after the upgrade can never pass. The refunds match the box sizes: legacy `o` = 19,300, legacy `e` = 18,900, `x` = 19,300, `y` = 15,700. Not done: the S-01 advice to "remove or validate free-form 32-byte `RefTypeAddress` refs" (SOCIAL-4). |
| S-02 | Fixed | Both `initMeta` entry points assert `user === Txn.sender` (`:1477, :1492`). The meta is keyed by, and `cacheMeta` is called for, `Txn.sender` in both branches (`:1542-1577`). The payment is bound to the sender (`:1520-1530`). |
| S-03 | Fixed (through S-02) | Graph keys are still 16-byte prefixes (`graph.algo.ts:41-52`). `follow` needs `getMeta(address)`, and a meta now needs a signature as that address, so creating a lookalike takes about 2^128 work. The suggested graph `initialized` guard was not added; it is moot because every meta is created with `initialized = true`. |
| S-04 | Fixed | `wallGateID` is applied in `resolveParentContext` (`:235-246`) and in `createVote` (`:743`). The plugin mirrors it in `getCreatorDetails` (`plugin:96-99`). |
| S-05 | Fixed for hinted calls; kept deliberately for pinned deployed plugins (K4, see SOCIAL-2) | Corrected values: `MinPostsMBR` 47,300; `MinPayWallMBR` 9,300 with exact equality (`:1580-1591`); `ReplyParentRefMBR` (`:688-690`); a votes box charged when a ref is first materialized (`:1266`); the referral MBR is charged from the exact amount spent (`:621-622, :684, :757-759, :821-823`). The plugin quotes all of these. |
| S-06 | Fixed | `getUserImpactWithInputs` passes `includeSpot = false` (`impact.algo.ts:487-492`). The soft-stake residual belongs to the Staking slice. |
| S-07 | Fixed | A stale or deleted NFD scores 0 (`impact.algo.ts:340-351`). |
| S-08 | Fixed | `deleteReaction` has no ban or block check (`:1423-1445`). `unfollow` and `unblock` have no ban check (`graph.algo.ts:110-121, 170-187`). |
| S-09 | Fixed | Tips check `sender` and `assetSender = zero` (`:837-854`). Every MBR `match` checks `sender`. Graph and impact use `assertBoundPayment` (sender, no close, no rekey). |
| S-10 | Fixed (a, b, c, d, e, g, h); won't fix (f, i, j) as documented | a: plugin `slice(36, 68)` (`plugin:385, 459`). c: no materialization in `resolveParentContext`. d: `defaultPayWallID 0` allowed (`:1611`). e: `errAlreadyBlocked`. g: `assertPayWall` in `createReply` (`:673`). h: `newModifier > 0`. |

## New findings

### SOCIAL-1: Medium. The ARC-58 tip route makes tippers pay for a fresh AKTA opt-in on every tip; it reverts when the creator differs from the wallet's origin

**Location**
- `social/base.ts:55-73`: `checkTipMbrRequirements` decides on `creator.isOptedIn(akta)`.
- `social/contract.algo.ts:383-432` (`arc58SendReactionPayments`) and `:492-499` (`tipCreator`):
  - opts in and pays `origin = getOriginAccount(wallet)`;
  - charges the tipper `arc58 = Global.assetOptInMinBalance` (100,000 µA) through `extra` (`:684, :755, :818`).
- `arc58/plugins/optin/contract.algo.ts:7-25`: `receiver === spending`, `!spending.isOptedIn` (`errAlreadyOptedIn`).
- `utils/principal.ts:370-379` (`tipWalletFor`).
- Plugin quotes: `plugin:244-248, 321-325, 389-393, 463-467, 547-551, 624-628, 675-678, 750-753`.

**Scenario A: a creator extracts 0.1 ALGO from every tipper.**
- The ARC-58 route runs whenever the creator account is not opted into AKTA. It funds the opt-in of `origin` with 100,000 µA that the tipper pays.
- Nothing stops the creator from opting out again after each tip.

Admin-updated ("forged") genuine wallet, fully automatic:
1. The wallet admin updates their own factory-created wallet W to custom code. This is allowed (`arc58/account/contract.algo.ts:848-858`).
2. The custom code sets `controlled_address = spending_address = E2`, where E2 is an EOA rekeyed to `W.address`. Then:
   - `ownsAtRest(W, W.address)` holds;
   - `walletControlsLive(W, E2, W.address)` holds, because `auth(E2) == W.address`.
   - So `tipWallet` returns W, both in the hinted target and in the new plugin quote.
3. W posts from `W.address` through the direct arm, then closes `W.address`'s AKTA holding.
4. Every upvote, reply or react on that post:
   - The plugin quotes `+100,000` (the creator is not opted in, and the forged `arc58_canCall` returns true), and the tipper's wallet pays it.
   - AkitaSocial calls the forged `W.arc58_rekeyToPlugin`. That code closes E2's AKTA out to the attacker and rekeys E2 to the OptIn plugin.
   - `OptInPlugin.optIn` passes (E2 is not opted in, and the receiver equals the spender), so E2 receives the 100,000 µA.
   - E2 then receives the AKTA remainder, and the forged `arc58_verifyAuthAddress` does nothing.
5. On the next tip the same thing happens. Each tipper pays 0.1 ALGO more than the honest one-time opt-in.

Genuine wallet: the creator can do the same by hand. Close the AKTA holding of `W.address` (= origin) after each tip. That frees the 100,000 µA opt-in MBR to the creator, and the next tipper pays it again.

This contradicts the spec's R-CREATOR claim that "the only party harmed is the creator" (`docs/principal-resolution/PHASE-0-SPEC.md:206`). The tippers are harmed. The legacy shim route (raw `meta.wallet`) has the same behavior, and so does MainNet today.

**Scenario B: tips revert when the creator differs from the origin.**
1. A creator posts or initializes meta from a named escrow window E of wallet W. Spec E28 says this is supported. The meta stores `wallet = W`.
2. If E is not opted into AKTA (for example, its wall was materialized but it never posted, or it opted out), the route is ARC-58.
3. The route opts in and pays origin `C = W.address`. A wallet's main address normally holds AKTA, so `OptInPlugin.optIn` fails `errAlreadyOptedIn`.
4. If C is not opted in, the first tip opts in C and every later tip reverts.
5. Result: every upvote, reply and react on E's content reverts.

**Fix.**
- Decide the route on the account that receives the remainder (`origin`), not on `creator`.
- Do not let a third party fund a recipient's opt-in more than once. Options:
  - send the remainder through ARC-59 (`arc59OptInAndSend`) or to the DAO when the recipient is not opted in;
  - or assert after the compose that the recipient is opted in and charge the opt-in only when `!origin.isOptedIn`.
- Keep the old behavior only behind the legacy shims, because deployed plugins quote it.
- Correct R-CREATOR in the spec.

### SOCIAL-2: Medium (accepted as K4, but repeatable without limit). Legacy terms let anyone drain AkitaSocial's free ALGO in cycles

**Location**
- `contract.algo.ts:349-364` (`legacyTerms`).
- `:753-759`: an up-vote under legacy terms does not charge `tip.referralMbr`.
- `:817-823`: same for react.
- `:494`: AkitaSocial pays the referral disbursement MBR to Rewards. That amount is `costInstantDisbursement`, 67,000 µA, plus the opt-in MBR if Rewards is not opted into AKTA.

**Scenario.**
1. Any user installs a pinned deployed plugin, for example 3643581007, on their own wallet. Installing a plugin is an admin action and needs no permission. The wallet is registered and has `referrer = R`, an account the attacker controls.
2. Through that plugin the user up-votes a post by the attacker's second account B. AkitaSocial pays the 67,000 µA referral MBR and the plugin does not pay it back.
3. The user calls `editVote(flip=false)`, which refunds 19,300 µA, then up-votes again. Each cycle moves 67,000 µA of AkitaSocial's free balance into Rewards, where it is stranded (SOCIAL-3). The cycle `react` → `deleteReaction` drains 63,800 µA per cycle.
4. Per cycle the attacker pays only:
   - transaction fees, about 15 to 20 inner and outer transactions, roughly 20,000 µA;
   - the DAO's share of the impact tax, in AKTA.

   The attacker gets back the creator remainder (through B) and the referral cut (through R).
5. That is about 3.3 times leverage. MainNet's free 7.64 ALGO is gone after about 115 cycles.
6. After that, every operation through the deployed plugins that depends on free balance reverts. That includes posts (800 µA short), replies (13,600 µA), ref materialization (20,100 µA) and referred up-votes and reacts. It continues until the DAO tops up the app, and the attacker can repeat. Hinted calls are not affected.

The log at `IMPLEMENTATION-LOG.md:2031-2036` lists a per-call loss. It does not note that the up-vote and react cases can be repeated indefinitely.

**Fix.** This is a one-line change with no ABI or quote impact. Under `legacyTerms`, pay no referral on up-vote and react tips: pass `Global.zeroAddress` as the referrer when `legacyTerms(legacy)` is true in `createVote` and `createReaction`. The deployed plugins never paid for the referral, so their quotes stay exact. The referrer loses its cut only on deployed-plugin up-votes and reacts. Otherwise keep K4 monitoring, with an automated alert on free balance.

### SOCIAL-3: Low. Referral disbursement MBR and unclaimed referral AKTA are stuck in Rewards for good

**Location.**
- AkitaSocial creates a Rewards instant disbursement for every referred fee: `sendReferralPaymentTo` → `createInstantDisbursement`, called from `contract.algo.ts:370, :494`.
- Only the creator can call `withdrawMbrCredits`, `reclaimRewards` or `closeDisbursement` (`rewards/contract.algo.ts:196-201, 550-596, 601-611`). AkitaSocial has no method that makes any of these calls.

**Effect.**
- Hinted calls now charge users the 67,000 µA referral MBR on every referred post, reply, up-vote and react (the S-05 fix). After the referrer claims, that ALGO becomes `mbrCredits` that nobody can withdraw.
- Referral AKTA that is not claimed within 1 week can never be reclaimed either.
- Users lose nothing beyond what they were quoted. But protocol ALGO stays locked and grows with usage, and AkitaSocial cannot recycle it as float (compare SOCIAL-2).

**Fix.** Add a permissionless `AkitaSocial.closeReferralDisbursement(id)` (and `reclaimExpired`) that calls Rewards as creator and sends the proceeds to the DAO escrow or keeps them as app float. Graph and the other apps have room; AkitaSocial is at 10,884 of 16,384 B.

### SOCIAL-4: Low. `RefTypeAddress` can take any 32-byte key that does not exist yet

**Location.**
- `contract.algo.ts:178-183`: any 32 bytes are accepted, with `creator = Account(ref)`.
- `:1257-1276` and `:505-531`: `vote` materializes the box.

**Scenarios.**
- **(a) Front-running a pending write.** Post and reply keys are `sha256(sender‖ts‖nonce)`, and edit keys are `sha256(sender‖amendment‖cid)`. All of these can be computed from the pending transaction's arguments.
  1. The attacker sees the transaction.
  2. The attacker calls `vote(type=RefTypeAddress, ref=key, isUp=false)` first.
  3. The victim's call fails with `errPostExists`. The victim must retry with a new nonce or CID, and the attacker can repeat.
  4. Each squat costs the attacker 47,300 µA locked for good, plus `reactFee` AKTA. The 19,300 µA vote record can be refunded.
- **(b) Pre-squatting known keys.** These keys can be computed in advance, so no front-running is needed:
  - padded asset or app keys (`id‖0^24`);
  - custom-type keys (`sha256(itob(type)‖ref)`).

  The attacker materializes them first with `creator = Account(key)`, an unusable address. From then on every tip on that asset's or app's social page goes to the DAO (the creator is not opted in), never to the real asset or app creator. Custom refs get a non-zero junk creator, which also changes their referral handling.

This is the half of the S-01 advice that was not applied.

**Fix.** For `RefTypeAddress`, require that the target is a real account, for example `meta(Account(ref)).exists` or a non-zero `Account(ref).minBalance`. Also make sure padded and hashed key ranges cannot be reached as addresses: hashed keys already have no meta or balance, so the check covers them.

### SOCIAL-5: Low. Legacy dual-read trusts every post created before the cutoff; S-01 stays exploitable on MainNet until the upgrade executes

**Location.** `contract.algo.ts:96-112`.

**Scenario.**
1. Until the upgrade executes, anyone can use the deployed contract to create a lookalike post `F = T[0:16]‖junk` (through `vote` with `RefTypeAddress`) and a legacy vote entry on F.
2. The cutoff is stamped lazily, at the first post after the upgrade. So both F and T count as pre-cutoff posts.
3. After the upgrade, `editVote(T)` consumes the attacker's legacy F entry against T. This is the S-01 attack, one undo per entry staged before the upgrade.

The impact is bounded and no worse than today, but the forensic scan from fix-social §Migration only covers state up to the scan.

**Fix.**
- Re-run the prefix-collision and orphan scans (`review/social-scan.mjs`, `review/social/reactions-check.mjs`) right before and right after the proposal executes.
- If a collision appears, decide on tallies per D4b.

There is also a same-block edge: legacy posts in the same block as the first post after the upgrade have `timestamp == cutoff`, fail `timestamp < cutoff`, and lose their legacy refund (19,300 / 18,900 µA). This is negligible, since MainNet's last post was on 2026-09-19.

### SOCIAL-6: Low. Reactions made through deployed plugins overpay by 3,200 µA each, and the overpayment is never refunded

**Location.** `contract.algo.ts:887-906`, `:1423-1435`.

**Detail.**
- Under `legacyTerms` the reactor pays `ReactionlistMBR` (18,900 µA).
- The record created is a `y` box (15,700 µA).
- `deleteReaction` refunds 15,700 µA.
- Every reaction through an old plugin therefore loses 3,200 µA to AkitaSocial. This is accepted in the log as "React is −3,200", but it is a user-fund loss, not an app drain.

**Fix (optional).** Accept and document it, or refund `ReactionlistMBR` for records made under legacy terms. That needs a marker, such as a 1-byte value in the `y` box for legacy-paid records.

## Suspicions / Info (not exploitable as stated, or by design)

- **I-1: Ban and block bypass through another escrow.**
  - `isBanned(Txn.sender)` and `isBlocked(creator, Txn.sender)` key on the spender (`contract.algo.ts:212-218`, `graph.algo.ts:71-72`).
  - A banned or blocked user can act from another escrow of the same wallet (another spender).
  - Hinted entry points now know `p.principal`. Consider also checking the principal. Q5 keeps social state keyed by the spender, which is by design.
- **I-2: Plugin reply and react break on non-32-byte or custom refs** (functional).
  - `ref.toFixed({ length: 32 })` asserts the length (`primitives.d.ts:89-103`). Plugin reply, react and gated variants with `RefTypeAsset` or `RefTypeApp` (8-byte refs) therefore revert (`plugin:240, 317, 662, 672, 737, 747`).
  - For custom types the plugin passes the raw ref, not `sha256(type‖ref)`, to `getReactionExists` and `getCreatorDetails`. Once the counter exists, the reaction quote is wrong and the call reverts.
- **I-3: Quote and target disagree on same-wallet creators.**
  - The plugin evaluates `tipWallet` while S is rekeyed to the plugin. The target evaluates it after `RekeyTo` (rekeyBack) has applied.
  - For a creator that is another account of the acting wallet (for example escrow E, with `W.address` acting), the plugin quotes a direct tip and the target routes ARC-58 when E is not opted in. The call reverts `errIpay`.
  - Only the creator's own actions are affected.
- **I-4: Error strings changed** from `ERR:XXXX` to `errXxxx` on all four live apps, and `createPayWall` now needs exactly 9,300 + 6,800·N with no legacy shim. Old SDK or frontend error decoding and old paywall quotes break, so they must ship in lockstep (already noted for `SOCIAL_HINTED_TARGETS`).
- **I-5: Legacy shims are open to every caller.** Only the payment terms are pinned. Registry referrer, raw `meta.wallet` tip routing and gate subject `Txn.sender` stay available to anyone who calls an old selector. That matches the deployed semantics. `legacyWalletOf` checks genuineness (`utils/functions.ts:285-306`), so ACC-01 registry spoofing cannot store a non-factory wallet. An admin-updated genuine wallet still can (SOCIAL-1 applies).
- **I-6: Creator impact is now computed without spot holdings.** The tip tax uses `getUserImpactWithInputs` (S-06), so creators who hold AKTA or NFTs pay more tax than before. This is an economic change that should be communicated.

## Upgrade / rollout notes

1. **Program size.**
   - AkitaSocial grows from 8,186 B to 10,884 B (plus 4 B clear), which needs 6 pages, i.e. `ExtraProgramPages = 5`.
   - MainNet is on V42 (`AppSizeUpdates`), so this is legal only through a size-changing update. The update transaction must carry `ExtraProgramPages = 5` and exactly `GlobalStateSchema = {uints 8, bytes 56}` (`apply-application.go:243-248` calls `SetAppGlobalSchema`).
   - The deployed update plugin (3569559689) cannot do it, so Phase 2a is required.
   - The updater becomes the size sponsor and takes over the app's entire extra-page and schema MBR: 5 × 100,000 + 8 × 28,500 + 56 × 50,000 = **3,528,000 µA** on the DAO wallet. The creator `R2MOGXW7…` gets 3,328,000 µA released.
   - Per-byte surcharge: (10,888 − 8,192) × 100 micro-units, which is negligible.
   - Graph (2,454 B), Impact (2,960 B) and Moderation (1,087 B) fit their existing 4 pages and 1/1 schemas.
2. **Global state.** The one new key is `legacy_list_cutoff` (uint). Uint usage goes from 3 of 8 to 4 of 8; bytes stay at 2 of 56. There is no `initialValue`, so an upgrade leaves it unset until the first post.
3. **Boxes.** The new prefixes `x` and `y` are absent on MainNet. All existing prefixes keep their layout.
4. **ABI.**
   - Every deployed AkitaSocial and Graph selector is still served (`legacy-abi.test.ts`, 14/14).
   - Hinted selectors were added, plus `setMetaWallet(uint64)void`.
   - The only `UpdateApplication` method on all four apps is `update` (DAO wallet + update plugin). None allows `DeleteApplication`.
5. **Order.**
   1. Re-run the scans (SOCIAL-5).
   2. Phase 2a (update plugin).
   3. Upgrade Impact and Moderation (ABI-compatible).
   4. Upgrade Graph and AkitaSocial together.
   5. Flip `SOCIAL_HINTED_TARGETS` in the next SDK release.
   6. Phase 3 (new plugin).
   7. Monitor and top up AkitaSocial's free balance until Phase 4, or apply the SOCIAL-2 fix.
6. **Gate v2.** Posts and metas store gate IDs that index into `AkitaAppList.gate`. MainNet has none today. Any gated social content created before the Gate v1 → v2 switch keeps working only if v2 imports gates with the same numbering.
7. **Other release notes.**
   - Fund the DAO wallet for the size sponsorship before the AkitaSocial push.
   - Ship the SDK that knows the new error codes and the 9,300 paywall base at the same time.

## Test gaps (named, not written)

1. Upgrade rehearsal with real legacy data:
   - Deploy the MainNet AkitaSocial program, create `o` and `e` entries through the deployed code, upgrade, then check:
     - legacy `editVote(false)` refunds 19,300;
     - legacy `editVote(true)` moves the record to `x`;
     - legacy `deleteReaction` refunds 18,900;
     - a post-upgrade lookalike gets `errLref`;
     - a lookalike staged before the upgrade is consumable (documents SOCIAL-5);
     - a new vote on a ref with a legacy entry gets `errAvot`.
   - `deployed-compat.e2e.spec.ts` P2-SOC-02 upgrades an app with no legacy boxes.
2. Behavior while the cutoff is unset (a legacy undo before any new post), and the same-block edge.
3. The legacy-terms cycle drain (SOCIAL-2): referred up-vote then `editVote(false)` repeated through the deployed plugin, asserting the AkitaSocial free-balance delta.
4. The ARC-58 tip route with creator ≠ origin (escrow-window creator), and repeated opt-out between tips (SOCIAL-1).
5. `RefTypeAddress` squatting of a computed post or edit key, and of a padded asset key (SOCIAL-4).
6. The three older pinned plugins (December 2025, May 2026, v0.0.2) against the shims. Only v0.0.3 is exercised.
7. Plugin `reply` and `react` on asset, app and custom ref types (I-2).

## Checked and OK

- **Double vote, reaction or refund across the legacy and new namespaces.** Both existence checks guard every create. Undo reads exactly one record and deletes it before refunding. Refund amounts equal each box's MBR.
- **Lazy cutoff.** It is stamped before every posts-box write, and new posts store `latestTimestamp`, so nothing created after the upgrade passes `assertLegacyRef`. It cannot be front-run into a harmful value, and no other path writes it.
- **Box namespaces.**
  - AkitaSocial: `p w v o x r e y m t`, all distinct single-byte prefixes.
  - Graph: `f b`. Impact: `m s`. Moderation: `d n a`. These are separate apps.
  - The global key does not collide with the existing five.
- **Hinted calls.**
  - `principalOf` is strict and runs first.
  - The plugin forwards only `windowHint(wallet)`, and gate txns carry `gateCtx(pluginPrincipalOf)`, which the target recomputes and pins through `gateCheckCtx` (selector, ctx, gate ID, NoOp, gate app).
  - The referral quote (`quoteReferrerOf`) equals the target's `p.referrer`.
  - `tipWallet` matches between the plugin and the target, except I-3.
  - `setMetaWallet` binds only `meta(Txn.sender)` to a wallet that is verified at that moment.
- **Shims.**
  - The shim gate subject is `Txn.sender` with Gate v1 `mustCheck`, and Gate v2 still serves `mustCheck`.
  - `legacyTerms` reads `CallerApplicationID` (top-level callers pay corrected terms) and the MainNet genesis hash, verified live.
  - Posts and replies always charge the exact referral MBR. This matches P1 (no absorption).
- **Values.**
  - `MinPostsMBR` 47,300 = 2,500 + 400·(33 + 77 + 2).
  - Votes, vote-list and `x` boxes: 19,300 each.
  - `y` box: 15,700. Paywall: 9,300 + 6,800·N.
  - Edit refs are over-charged by 400 µA, which is in the app's favor.
- **Tip accounting.** AKTA in equals the referral cut plus the DAO tax plus the creator remainder. A zero creator pays the DAO with no referral. Inner transactions use fee 0, so no fee drain.
- **Auth.**
  - `setPostModeration`: moderation app only.
  - `updateFollowerMeta`: graph only.
  - `cacheMeta`, `getUserImpactWithInputs`, `calculateSocialImpactScore`: social app only.
  - `registerRefType`, moderator and action admin, `updateSubscriptionStateModifier`: DAO wallet.
  - `ban`, `unban`, `flag`: moderators.
  - `update`: DAO wallet + update plugin.
- **Arithmetic.** `calcVotes` has no underflow. The reaction decrement is guarded by an exact record. The `followerCount` decrement is guarded by a full-prefix follow key that only real metas can produce. Impact maximum 1,000 equals `IMPACT_DIVISOR`.
- **Re-entrancy.** The creator-wallet inner call cannot re-enter AkitaSocial. `cacheMeta` and `updateFollowerMeta` reject non-canonical senders.
- **Plugin.**
  - Every spending call uses `getControlledSpendingAccount` (auth must be the plugin).
  - `rekeyTo` is set only on the final target call.
  - `editReply` takes the parent from `36..68`.
  - The new plugin's ABI equals the deployed ABI plus `setMetaWallet(uint64,bool)void`, and it fits 4 pages.
