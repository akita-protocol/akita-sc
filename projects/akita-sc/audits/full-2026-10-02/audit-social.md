# Akita Social — Security Review (working tree, 2026-10-02)

## Scope covered

- `projects/akita-sc/smart_contracts/social/contract.algo.ts` (AkitaSocial)
- `projects/akita-sc/smart_contracts/social/graph.algo.ts` (AkitaSocialGraph)
- `projects/akita-sc/smart_contracts/social/impact.algo.ts` (AkitaSocialImpact)
- `projects/akita-sc/smart_contracts/social/moderation.algo.ts` (AkitaSocialModeration)
- `projects/akita-sc/smart_contracts/social/{base,constants,types,errors}.ts`
- `projects/akita-sc/smart_contracts/arc58/plugins/social/contract.algo.ts` (AkitaSocialPlugin)
- Cross-read as needed: `utils/functions.ts` (gateCheck, referral helpers, wallet lookups),
  `rewards/contract.algo.ts` (instant disbursement / MBR credits), `staking/contract.algo.ts` (app soft stake),
  `gates/sub-gates/social-follower-{index,count}`, `escrow/factory.algo.ts#get`, PuyaTs `box.d.ts` (`create()` semantics).

This was a read-only review. I did not build anything, did not run any tests, and did not touch any chain. MBR figures below are worked out by hand from the ARC-4 layouts in `artifacts/social/AkitaSocial.arc56.json`, using box MBR = 2,500 + 400 × (key + value).

## Summary

| ID | Title | Severity | Confidence |
|----|-------|----------|------------|
| S-01 | Vote and reaction list keys are cut to 16 bytes of the ref, but the undo applies to the full ref the caller passes, so votes and reactions can be manipulated without limit | High | Confirmed |
| S-02 | `initMeta` creates meta for any `user`, so anyone can permanently mark another user as `automated` (no voting or following, ever) | High | Confirmed (regression) |
| S-03 | Follow keys are cut to 16 bytes, and S-02 allows fake metas, so anyone can bypass block, follow-gate and follower-index gates and drain any user's follower count | High | Confirmed (needs S-02) |
| S-04 | `addressGateID` (wall gate) bypassed by addressing the user's address box as `RefTypePost` | Medium | Confirmed |
| S-05 | MBR is under-collected across many paths, and referral-disbursement MBR is never charged on votes or reactions, so AkitaSocial's spare ALGO drains and then those operations fail | Medium | Confirmed |
| S-06 | Impact inputs come from spot balances and shareable soft stakes, so one bag of AKTA or one NFT can boost many sybils inside one group; votes keep that boosted impact | Low | Likely |
| S-07 | Any change to a cached NFD makes the user's impact calculation revert, which blocks their own actions and every upvote, reply or reaction on their content | Low | Confirmed |
| S-08 | MBR refunds for reactions, follows and blocks are locked behind ban and block checks; a creator can lock reactors' MBR by blocking them | Low | Confirmed |
| S-09 | Grouped tip and MBR transactions are not tied to the sender, and clawback-source tips are not rejected, although CONTRACT_AUDIT.md says this was fixed | Info | Confirmed |
| S-10 | Functional and robustness defects (plugin editReply broken, referred wallets cannot post through the plugin, and others) | Info | Confirmed |

---

## S-01 — Vote and reaction list keys cut to 16 bytes; undo hits the caller-supplied full ref (High, Confirmed)

**Location**
- `social/contract.algo.ts:22-24` (`b16`), `:484-487` (`createVoteList`), `:621-622` (`createVote` duplicate check)
- `social/contract.algo.ts:928-961` (`editVote`): looks up `votelist({b16(sender), b16(ref)})` and then calls `updateVotes(ref, !isUp, impact)` on the **full** caller-supplied `ref`. It does not check that `ref` is the ref that was voted on, or that it is a post at all.
- `social/contract.algo.ts:992-1009` (`deleteReaction`): looks up `reactionlist({b16(sender), b16(ref), NFT})` and then runs `reactions({ref, NFT}).value -= 1` on the full ref.
- `social/contract.algo.ts:109-119` (`toBytes32`, `RefTypeAddress`): accepts **any** 32 bytes as an "address", and `vote()` (`:908-926`) materializes an empty post for it. So refs with a chosen 16-byte prefix are free to make.

**Description.** The per-user list boxes record "user U voted or reacted on ref R" under only the first 16 bytes of R. The tally boxes (`votes`, `reactions`) are keyed by the full 32-byte ref. The undo paths look up the list entry by prefix and then change the tally of whatever full ref the caller supplied. Anyone can make a ref F that shares a target T's 16-byte prefix: `F = T[0:16] || junk`, voted on as `RefTypeAddress`. That makes the list entry and the tally that gets changed independent of each other.

**Exploit (votes, unlimited in both directions, any target, including yourself):**
1. `vote(ref=F, type=RefTypeAddress, isUp=false)`. This creates the empty post F, `votes(F) -= imp`, and `votelist[(attacker, T[0:16])] = {imp, isUp:false}`. Cost: `reactFee` (AKTA, to the DAO) plus the votelist MBR. The empty post for F is a one-time cost.
2. `editVote(ref=T, flip=false)`. The votelist entry is found by prefix, then `updateVotes(T, true, imp)` gives **T +imp**. The votelist entry is deleted and the 19,300 µA MBR is refunded.
3. Repeat. T rises by `imp` each cycle. Using `isUp=true` in step 1 lowers T instead.

Consequences:
- Any post's score can be pushed arbitrarily high or low.
- `votes(account.bytes)` feeds `calculateSocialImpact` (`impact.algo.ts:164-181`). So an attacker can max their **own** vote component (+75 impact), which bypasses `errNoSelfVote`, or zero out any victim's social impact. Impact drives the tip tax (`tipCreator`), the social-impact gates, and fee discounts elsewhere.
- Banned users can still use `editVote` (it has no ban or block check), and every fresh `T` creates an unpaid `votes(T)` box (19,300 µA drained from the app, see S-05).
- Variant: vote on a real post P, then `editVote(P[0:16]||x)`. This removes the votelist entry while P keeps the vote, so the attacker can vote on P again (double voting).

**Exploit (reactions):** vote once on F so its post box exists, then `react(F, NFT)`. Next, `deleteReaction(P, NFT)` for any post P with the prefix `F[0:16]`. This decrements `reactions{P,NFT}` and refunds the MBR. Repeating drives any post's reaction count to 0. Inflation stays bounded because counts are conserved across the prefix family.

**Fix.**
- Key `votelist` and `reactionlist` by the full 32-byte ref, or by `sha256(user||ref)`, so the key can't collide.
- Alternatively, store the full ref in the list value and assert `stored.ref === ref` in `editVote` and `deleteReaction`.
- Also validate that `ref` exists in `editVote`.
- Remove or validate free-form 32-byte `RefTypeAddress` refs. For example, require that the address has meta, or that it is the zero-padded encoding of a real account.

---

## S-02 — `initMeta` accepts any `user`; anyone can permanently mark victims `automated` (High, Confirmed, regression from HEAD)

**Location:** `social/contract.algo.ts:1025-1095`. HEAD created meta for `Txn.sender`. The working tree creates it for the caller-supplied `user`, and the only check is `!meta(user).exists`. The plugin passes `user` straight through (`arc58/plugins/social/contract.algo.ts:1031-1063`).

**Description / exploit.**
- An attacker calls `initMeta(mbrPayment=77,000 µA, user=victim, automated=true, …)` before the victim initializes, or against any address that has not done so yet.
- This writes `meta(victim).automated = true`. Nothing can ever change it: `updateMeta` (`:1119-1151`) does not touch `automated`, and a second `initMeta` fails with `errMetaAlreadyExists`.
- From then on, `createVote` asserts `!automated` (`:625-626`) and `AkitaSocialGraph.createFollow` asserts the same (`graph.algo.ts:75-76`). The victim can **never vote or follow**.
- Cost is about 0.077 ALGO per victim. It can be done to new users at scale. Wallet app addresses are predictable because app IDs are sequential, so wallets can be targeted before they are created.

Side effects:
- The automated branch runs `cacheMeta(user, 0, 0, 0)`, which overwrites any existing impact-meta cache the victim has.
- The non-automated branch caches the impact meta for `Txn.sender`, not `user`. The forwarded `ImpactMetaMBR` then pays for the wrong box, and the victim's later `updateMeta` creates an unpaid 31,700 µA impact box.
- It also makes fake metas possible for arbitrary 32-byte values, which S-03 relies on.

**Fix.**
- Go back to `user === Txn.sender`. If initializing on someone else's behalf is a product requirement, require that the sender controls `user`: for example `getWalletIDUsingAkitaDAO(user)` resolves to a wallet whose spending or origin account is `Txn.sender`.
- Let the real owner correct the `automated` and `wallet` fields while `initialized == false`.
- Call `cacheMeta` with `user` consistently.

---

## S-03 — Follow keys cut to 16 bytes plus fake meta: follower-index gate, block and follow-gate bypass, follower-count drain (High, Confirmed, depends on S-02)

**Location:** `graph.algo.ts:47-51` (`flw` cuts both addresses to 16 bytes), `:69-91` (`createFollow` updates the full `address` meta), `:171-189` (`unfollow` decrements the full `address` meta), `:197-207` (`isFollowing` / `getFollowIndex`). Consumer: `gates/sub-gates/social-follower-index/contract.algo.ts:56-77` and `social-follower-count`.

**Exploit.**
1. `initMeta(user=F1)` with `F1 = victim[0:16] || junk` (possible because of S-02). F1 has `followGateID=0`, has blocked nobody, and has `followerIndex=0`.
2. `follow(F1)`. This writes `follows[(victim[0:16], attacker[0:16])] = 1`, the same key as "attacker follows victim".
   - `isFollowing(attacker, victim)` now returns **true** and `getFollowIndex` returns **1**. The attacker passes any "first N followers of victim" follower-index gate.
   - The victim's block (`isBlocked(victim, attacker)`) and the victim's `followGateID` are never consulted.
3. `unfollow(victim)`. The key exists, so `victim.followerCount -= 1` and the MBR is refunded. Repeat steps 2 and 3 to drive any victim's `followerCount` down to 0. This breaks their follower-count gates. Each cycle costs only fees.

**Fix.**
- Key `follows` and `blocks` by full addresses (or by a hash of both).
- Store the followed address in the follow value and check it on unfollow.
- Fixing S-02 removes the cheap fake-meta step. It does not remove the root cause.

---

## S-04 — Wall gate (`addressGateID`) bypass by addressing the address box as `RefTypePost` (Medium, Confirmed)

**Location:** `social/contract.algo.ts:99-102` (`RefTypePost` only checks length), `:109-119` (only `RefTypeAddress` checks `addressGateID === 0`), `:172-185` (`resolveParentContext` uses the box's `gateID`, which is 0 for empty posts), `:857-877` / `:963-990`.

**Description.**
- The empty post for a user's wall lives at key = the user's raw address bytes. The first vote on that address creates it, while `addressGateID` is still 0, and it is never deleted.
- After the victim sets `addressGateID`, anyone can `reply` or `react` with `type=RefTypePost, ref=victimAddress`. `toBytes32` skips the gate check, `posts(ref)` exists, `postGateID == 0`, and the call succeeds.
- Meanwhile, the intended gated path (`gatedReply` / `gatedReact` with `RefTypeAddress`) **always** reverts, because `toBytes32` asserts `addressGateID === 0` before any gate is evaluated.

**Fix.**
- In `resolveParentContext`, when the resolved box is an address box (`ref.length == 0` and `creator == Account(refBytes)`, or a dedicated flag), use the creator's `addressGateID` as `postGateID`.
- Remove the hard `addressGateID === 0` assert in `toBytes32` so the gated entry points can evaluate it.

---

## S-05 — Systematic MBR under-collection and uncharged referral MBR drain AkitaSocial's ALGO (Medium, Confirmed)

**Location and numbers.** `PostValue` value = 79 + len(ref); key = 33.

| Path | Actually locked | Charged | Shortfall per call |
|---|---|---|---|
| Post (`MinPostsMBR` 46,500 leaves out the 2-byte length prefix; `constants.ts:28`) | 47,300 + 400·cid | 46,500 + 400·cid | 800 |
| Reply (`createReply`, `:577-584`): the 32-byte `parentRef` is never charged | 74,500 | 60,900 | **13,600** |
| Edit reply | 87,300 | 74,100 | 13,200 |
| Edit post | 74,500 | 74,100 | 400 |
| Empty post via `vote` (`:921-925`): `votes(ref)` box created but not charged | 66,600 | 46,500 | **20,100** |
| `createPayWall` (`MinPayWallMBR` 5,200, marked "TODO"; real minimum 9,300 + 6,800·N) | 9,300 + 6,800N | ≥ 5,200 + 6,800N | 4,100 |
| `editVote` on a new ref (S-01) creates an unpaid `votes` box | 19,300 | 0 | 19,300 |
| **Referral on upvote and react.** `tipCreator` (`:386`) calls `sendReferralPayment`, which makes the **social app** pay `MinDisbursementsMBR + UserAllocationMBR` = 67,000 µA to Rewards (`utils/functions.ts:544-600`). `createVote` (`:649-658`) and `validateReactPayment` (`:744-760`) do not include `referralFee` (posts and replies do, `:726`). The disbursement creator is the social app, which has no `withdrawMbrCredits` or `closeDisbursement` call, so the ALGO is stranded for good. | 67,000 | 0 | **67,000** per referred upvote or reaction |

**Impact.**
- Normal usage steadily moves the social app's spare balance into locked MBR or stranded Rewards credits.
- Once the spare balance is gone, every path that relies on it reverts: posts, replies, referred votes and reactions, paywalls. That is a protocol-wide DoS until the DAO tops the app up.
- An attacker can speed this up cheaply with `createPayWall` (fee plus 5,200 deposit per 4,100 drained, no inner transactions) or with S-01 `editVote` cycles (MBR refunded each time).

**Fix.**
- Correct `MinPostsMBR` (47,300) and `MinPayWallMBR` (9,300).
- Charge `BoxCostPerByte*32` for the reply `parentRef` and charge `VotesMBR` when `vote` materializes a post.
- Add `referralFee(akta)` to the vote-up and react payment (and to the plugin's quotes).
- Use exact equality in `createPayWall`.
- Add an e2e test that checks the app's balance minus its minimum balance before and after each operation.

---

## S-06 — Impact inputs are spot balances or shareable stakes; boosted impact is baked into votes (Low, Likely)

**Location:** `impact.algo.ts:223-240` (held AKTA via spot `AssetHolding`), `:345-357` (NFT spot balance), `:204-221` and the staking `getWeightedStakeForApp` (app soft stake counts if the balance is ≥ the commitment at read time; ages reset only through permissionless `checkpointAppSoftStake`). Votes store the voter's impact at the time of the vote: `contract.algo.ts:661-663`.

**Description.**
- In a single atomic group, a sybil can receive 1M AKTA (+50), an AKC NFT (+50) and enough AKTA to cover a long-held app soft-stake commitment (up to +250). It votes or reacts, then sends everything back.
- One bag of assets therefore gives full held, NFT and staking impact to any number of accounts. Staking age is only lost if some third party checkpoints while the bag is somewhere else.
- The inflated impact is written permanently into vote tallies, and it lowers the tip tax at that moment.

**Fix.**
- Use only committed or locked positions for vote weight (hard or lock stake, or app soft stake with a minimum dwell time).
- Snapshot the held-AKTA and NFT inputs, or drop them from vote weighting.
- Consider using `getUserImpactWithoutSocial` with a cap for vote weight.

---

## S-07 — A changed cached NFD makes impact revert (Low, Confirmed)

**Location:** `impact.algo.ts:335-343`. `loggedAssert(nfdTimeChanged === timeChanged, errNfdChanged)` runs inside every impact calculation.

**Description.**
- Any update to the NFD causes a revert: the owner editing a field, a transfer, expiry, or deletion (`getExBytes` returns empty, so `btoi` gives 0).
- The revert hits the user's own `post`, `reply`, `vote` and `react` (`getUserImpact(Txn.sender)`), and also every *other* user's upvote, reply or reaction on that user's content (`tipCreator → getUserImpact(creator)`).
- It also breaks social-impact gates for that user.
- The user recovers only by calling `updateMeta`, which itself needs an existing paywall (S-10). If the NFD is owned by someone else who lists the user as a verified address, that owner can trigger the revert at will.

**Fix.** Return 0 NFD impact (or the last cached value) when stale instead of asserting.

---

## S-08 — Refund paths locked behind ban and block checks; a creator can lock reactors' MBR (Low, Confirmed)

**Location:** `contract.algo.ts:992-993` (`deleteReaction` calls `loadPostWithAccessCheck`, which asserts not banned **and not blocked by the post creator**), `graph.algo.ts:115, 172` (`unblock` and `unfollow` assert not banned).

**Exploit.** After users react to a post, the post's creator calls `block(reactor)`. Blocking costs 15,700, which is refundable. Each reactor's 18,900 µA reaction MBR is then unrecoverable for as long as the block stands, and the reaction count cannot be reduced. Banned users likewise cannot reclaim reaction, follow or block MBR until the ban ends.

**Fix.** Let the withdrawal and refund paths (`deleteReaction`, `unfollow`, `unblock`, `editVote` with `flip=false`) skip the ban and block checks. Only check that the list entry exists.

---

## S-09 — Grouped tip and MBR transactions not tied to the sender; clawback-source tips allowed (Info, Confirmed)

**Location:**
- `contract.algo.ts:702-716` (`validateTip` matches only receiver, asset and amount; no `sender`/`assetSender`).
- `:718-760`, `:649-658`, `:1038-1047`, `:1098-1109`.
- `graph.algo.ts:99-108, 138-147, 157-166`.
- `impact.algo.ts:409-418, 430-431`.

**Description.**
- CONTRACT_AUDIT.md (High/Social row) says the remediation was "bind MBR and tip senders (reject clawback-source tips)". None of the social contracts checks `mbrPayment.sender`, `tip.sender` or `tip.assetSender == Global.zeroAddress`.
- I found no direct theft path: whoever signs the grouped transaction consents.
- However, if AKTA has (or gets) a clawback address, that account can pay tips out of other people's balances.
- Separately, refunds always go to `Txn.sender` while the funder may be a different account. That is a documented-invariant mismatch, not an exploit today.

**Fix.** Add `sender: Txn.sender` (and `assetSender: Global.zeroAddress`) to the `match` patterns, as the other remediated contracts do.

---

## S-10 — Functional and robustness defects (Info)

- `arc58/plugins/social/contract.algo.ts:351, 420`: `editReply` and `gatedEditReply` take the parent as `ref.slice(0, 32)`. That is the first 32 bytes of the CID, not the parent at `36..68`. `getPost` then reverts, so the plugin's reply-edit paths always fail.
- Plugin `post`, `reply`, `editPost` and the others never add `referralFee(akta)`, but `validatePostPayment` requires it (`contract.algo.ts:726-727`). Wallets with a referrer cannot post or reply through the plugin.
- `resolveParentContext` (`contract.algo.ts:178`) asserts the post exists *before* `createEmptyPostIfNecessary`. So reply and react can never materialize asset, app or address refs, while the plugin adds `posts` MBR when `!postExists`, guaranteeing a mismatch.
- `updateMeta` (`:1128`) requires `paywall(defaultPayWallID).exists`. ID 0 never exists because the counter starts at 1, so users must create or borrow a paywall just to update their gates or cache.
- `graph.block` (`:110-111`): `BoxMap.create()` does nothing on an existing box, but the 15,700 payment is still taken. A repeated block loses the user's funds; only one refund is possible.
- `FollowsMBR` = 31,700 against a real 18,900 (key is 16+16 bytes). Users overpay 12,800, which is refunded symmetrically.
- `createReply` never validates `usePayWall` / `payWallID` (`createPost` does at `:505-513`).
- `updateSubscriptionStateModifier` (`impact.algo.ts:404-419`) charges full MBR on every update and accepts `newModifier = 0`. That causes division by zero in `getSubscriberImpactScore` (`:255-257`), so impact for every subscriber to that service reverts. It is DAO-gated.
- Moderation `ban` and `addModerator` create boxes with no MBR payment, funded from the moderation app's own balance. These are trusted roles.
- Votes ignore the post's `gateID` (only replies and reactions are gated).

---

## Checked and OK

- **Editing other users' content.** `verifyEditAmendment` asserts `creator == Txn.sender`. Edit keys are `sha256(sender||amendment||cid)`, so they can't be pre-created by others. Double amendment is blocked by `isAmended`.
- **Post keys.** These are `sha256(sender||ts||nonce)` (64-byte preimage). Edit keys use a 100-byte preimage and custom-type keys `sha256(itob(type)||ref)`. I found no feasible collision or front-run of another user's key. Asset and App padded refs can't collide because asset and app IDs share one counter.
- **`calcVotes` arithmetic.** Sign and magnitude handling is correct; the flip and zero cases have no underflow.
- **Counter underflows.** The reaction decrement and the follower-count decrement are guarded by list-entry existence, apart from the S-01 and S-03 cross-target cases.
- **Moderation authority.** `setPostModeration` is limited to the canonical moderation app address. `updateFollowerMeta` is limited to the canonical graph. `cacheMeta`, `getUserImpactWithInputs` and `calculateSocialImpactScore` are limited to the canonical social app. Moderator, action and ref-type admin is DAO-wallet-only.
- **Canonical apps.** Graph, impact, moderation, gate, staking, subscriptions, rewards and the NFD registry are all resolved from the DAO registry. Caller-supplied app IDs are not trusted. `gateCheck` pins the gate app, NoOp, `mustCheck` selector, subject = `Txn.sender`, and gate ID.
- **Inner transaction fees.** All social itxns use the default fee 0, so the caller pays. I found no fee drain.
- **AKTA tip accounting.** For post and react, AKTA in equals AKTA out (referral + DAO tax + creator remainder). Unopted creators' remainder goes to the DAO escrow, and the ARC-58 opt-in MBR is charged to the tipper.
- **Plugin.** Every write uses `getSpendingAccount(wallet)` as sender, and `rekeyTo` is applied only to the final call. Readonly queries are not rekeyed. A forged `wallet` app cannot sign for an account that isn't rekeyed to the plugin. MBR quotes are only advisory because the core contracts re-validate with exact amounts.
- **Impact score bounds.** The maximum total is 1,000, which equals `IMPACT_DIVISOR`, so `impactRange` can't underflow from impact alone.
- **Timestamps.** `computePostKey` drift check: a future timestamp underflows and reverts.
- **Streak math.** No underflow at real timestamps.
