# Akita Social — Fix Proposals (S-01 … S-10)

These proposals are read-only: no repo edits, builds or chain access were used to produce them. They follow `audit-social.md` in the same directory, ordered by severity.

**PuyaTs APIs used.** Each one was checked against `node_modules/@algorandfoundation/algorand-typescript/*.d.ts` or against existing repo code:

- `BoxMap<bytes<32>, T>`: same pattern as `posts`.
- `Box.exists/.value/.delete()`.
- `Box.length` (box.d.ts:57), mentioned only as an alternative.
- `op.sha256(...)` returning `bytes<32>`: already assigned to `bytes<32>` in `toBytes32`.
- `itob`.
- `match(gtxn, { sender, receiver, amount })`: `sender` inside `match` is used in `arc58/guilds/core/contract.algo.ts:785`.
- `AssetTransferTxn.assetSender` (gtxn.d.ts:333), also compared in `haystack-router/contract.algo.ts:120`.
- `op.AppGlobal.getExBytes` returning a `[bytes, exists]` tuple: used in `impact.algo.ts:298`.
- Destructuring assignment `({ a } = box.value)`: used in `contract.algo.ts:918`.
- `ReferralPaymentInfo.referralMbr` (`utils/types/referral.ts:5`).

---

## 0. Cross-cutting constraint: AkitaSocial program size (needs a decision from Kyle, see D1)

The compiled `artifacts/social/AkitaSocial.arc56.json` approval program is **7,948 / 8,192 bytes**. Only about 240 bytes are free, and the artifact may already be stale against the working tree. AkitaSocialGraph is 1,822 bytes, AkitaSocialImpact 2,869, AkitaSocialModeration 1,087 and AkitaSocialPlugin 7,130; all of these have room.

The S-01, S-04, S-05 and S-09 fixes all add code to AkitaSocial. Rough net deltas, which must be measured with `npm run build`:

| Change | Est. bytes |
|---|---|
| S-01: new record maps, sha256 keys, legacy dual-read in `createVote`/`createReaction`/`editVote`/`deleteReaction`/`getVote`/`getVotes` | +150 to +220 |
| S-04: wall-gate resolution in `resolveParentContext` and `createVote` | +30 to +45 |
| S-05: votes-box charge, reply parent-ref charge, referral returned from `tipCreator`/`sendPostPayment`; removing the `referralFee()` call from `validatePostPayment` | about +10 (adds about 30, removes about 20) |
| S-09: `sender` in 7 `match` patterns, plus `assetSender` on tips | +40 to +55 (only about +6 for the `assetSender`-only variant) |
| S-02: assert `user == Txn.sender`, drop `userIsSender` | about 0 |
| S-08: drop `loadPostWithAccessCheck` from `deleteReaction` | −8 to −12 |
| S-10c: remove dead materialization in `resolveParentContext` | −20 to −30 |
| **Optional savings:** remove `getVotes` (SDK reads boxes directly) | −60 to −100 |
| **Optional savings:** remove the `editVote` flip branch (flip = unvote, then vote, in two calls) | −30 to −40 |

Expect the High and Medium fixes to fit only together with S-10c plus at least one optional saving. If not, D1 decides what moves out.

---

## S-01 (High): truncated `votelist`/`reactionlist` keys allow cross-target undo

### Recommended design (least migration risk)

New box namespaces keyed by a **hash of the full tuple**, plus dual-read of the legacy 16-byte boxes. Legacy entries may only be consumed against refs created before a fixed cutoff.

- New key = `sha256(user || ref)` and `sha256(user || ref || itob(NFT))`. That is 32 bytes and collision-free.
- Vote record MBR stays **19,300** (`'x'`+32 key, 9-byte value), equal to today's `VotelistMBR`. Reaction record MBR drops to **15,700** (`'y'`+32 key, empty value).
- New entries are never written to the legacy maps. The legacy `'o'`/`'e'` boxes are read only in the undo paths, guarded by `posts(ref).timestamp < SocialLegacyListCutoff`. A lookalike ref made after the upgrade therefore cannot consume a legacy entry. A ref made before the upgrade can only be abused if a 16-byte-prefix collision already exists on mainnet, and the forensic scan in §Migration checks for that.

### Code — `social/constants.ts` (new)
```ts
export const AkitaSocialBoxPrefixVoteRecords = 'x'
export const AkitaSocialBoxPrefixReactionRecords = 'y'
export const ReactionRecordMBR: uint64 = 15_700 // 2_500 + 400 * (1 + 32)
// unix seconds; set at release to a time BEFORE the upgrade proposal executes (see D4)
export const SocialLegacyListCutoff: uint64 = 0 /* <set at release> */
```
`errors.ts`: `export const errLegacyRef = 'errLref'`. Mirror it in `akita-sdk/src/social/errors.ts`.

### Code — `social/contract.algo.ts`
```ts
// BOXES
voteRecords = BoxMap<bytes<32>, VoteListValue>({ keyPrefix: AkitaSocialBoxPrefixVoteRecords })
reactionRecords = BoxMap<bytes<32>, bytes<0>>({ keyPrefix: AkitaSocialBoxPrefixReactionRecords })
// keep `votelist` / `reactionlist` declarations (legacy, read+delete only)

private voteKey(user: Account, ref: bytes<32>): bytes<32> {
  return op.sha256(user.bytes.concat(ref))
}

private reactionKey(user: Account, ref: bytes<32>, NFT: uint64): bytes<32> {
  return op.sha256(user.bytes.concat(ref).concat(itob(NFT)))
}

private legacyVoteKey(user: Account, ref: bytes<32>): VoteListKey {
  return { user: b16(user.bytes), ref: b16(ref) }
}

// Legacy 16-byte entries may only be consumed against a ref that already existed
// before the cutoff, so lookalike refs minted after the upgrade cannot match them.
private assertLegacyRef(ref: bytes<32>): void {
  loggedAssert(this.posts(ref).exists && this.posts(ref).value.timestamp < SocialLegacyListCutoff, errLegacyRef)
}

private createVoteList(ref: bytes<32>, isUp: boolean, account: Account, impact: uint64): void {
  this.voteRecords(this.voteKey(account, ref)).value = { impact, isUp }
}
```
`createVote`: replace lines 621-622.
```ts
loggedAssert(
  !this.voteRecords(this.voteKey(Txn.sender, ref)).exists &&
  !this.votelist(this.legacyVoteKey(Txn.sender, ref)).exists,
  errAlreadyVoted
)
```
`createReaction`: replace lines 676-678 and 699.
```ts
const recordKey = this.reactionKey(Txn.sender, ref, NFT)
const legacyKey: ReactionListKey = { user: b16(Txn.sender.bytes), ref: b16(ref), NFT }
loggedAssert(!this.reactionRecords(recordKey).exists && !this.reactionlist(legacyKey).exists, errAlreadyReacted)
...
this.reactionRecords(recordKey).create()
```
`editVote` (replaces lines 934-943):
```ts
const key = this.voteKey(Txn.sender, ref)
let impact: uint64 = 0
let isUp = false
if (this.voteRecords(key).exists) {
  ({ impact, isUp } = this.voteRecords(key).value)
  this.voteRecords(key).delete()
} else {
  const legacyKey = this.legacyVoteKey(Txn.sender, ref)
  loggedAssert(this.votelist(legacyKey).exists, errHaventVoted)
  this.assertLegacyRef(ref)
  ({ impact, isUp } = this.votelist(legacyKey).value)
  this.votelist(legacyKey).delete()
}
this.updateVotes(ref, !isUp, impact)
// refund unchanged: both maps cost VotelistMBR (19_300)
```
`deleteReaction` (this rewrite also covers S-08):
```ts
deleteReaction(ref: bytes<32>, NFT: uint64): void {
  const recordKey = this.reactionKey(Txn.sender, ref, NFT)
  let refund: uint64 = ReactionRecordMBR
  if (this.reactionRecords(recordKey).exists) {
    this.reactionRecords(recordKey).delete()
  } else {
    const legacyKey: ReactionListKey = { user: b16(Txn.sender.bytes), ref: b16(ref), NFT }
    loggedAssert(this.reactionlist(legacyKey).exists, errAlreadyReacted)
    this.assertLegacyRef(ref)
    this.reactionlist(legacyKey).delete()
    refund = ReactionlistMBR
  }
  this.reactions({ ref, NFT }).value -= 1
  itxn.payment({ receiver: Txn.sender, amount: refund }).submit()
}
```
`getVote`/`getVotes`: read `voteRecords(voteKey(...))` first and fall back to the legacy `votelist`. Alternatively, drop `getVotes` to save bytes (D1).

`base.ts mbr()`: set `reactionlist: ReactionRecordMBR`. The plugin and SDK quote from this value, so a recompile picks it up. The legacy refund uses the `ReactionlistMBR` constant directly.

### ABI, state and box changes
- New box prefixes `x` and `y` on AkitaSocial. These are unused today; used prefixes are `p w v o r e m t`.
- `getVote`/`getVotes` signatures are unchanged. `getVotes` is removed if D1 chooses that.
- No change to the global schema.

### SDK and plugin call sites
- `akita-sdk/src/social/constants.ts`: add `REACTION_RECORD_MBR = 15_700n`. The react quote uses it in place of `REACTIONLIST_MBR`.
- `akita-sdk/src/social/index.ts` around lines 1400-1470, the reaction box scan:
  - The "user reacted" check currently matches 41-byte `'e'+16+16+8` names.
  - Replace it with a direct lookup of `'y' + sha256(pubkey(user) || ref || uint64be(nft))` for each NFT found in the `'r'` boxes.
  - Keep the legacy `'e'` check as a fallback.
- `calculateReactMBR`: switch to the new constant.
- Plugin: no source change. It quotes via `mbr()`, so it only needs to be recompiled and redeployed.

### Migration (live AkitaSocial, app 3569557130)

| Option | Mechanics | Risk |
|---|---|---|
| **A. New hashed namespace plus dual-read with a cutoff (recommended)** | Legacy boxes stay and are consumed only through undo paths. New writes go only to `x`/`y`. | No data movement and no MBR changes for votes. Residual risk only if a 16-byte-prefix collision already exists, which the scan below detects. |
| B. Keep 16-byte keys and store the full ref in the value | Legacy values are 9 or 0 bytes and new ones 41 or 32 bytes under the same key, so code has to branch on `Box.length` and the `getVote` return type changes. Self-collisions still block a second entry. New entries cost +12,800 µA. | More code in a full contract, ABI churn, and the same legacy ambiguity as A. |
| C. Batch-migrate legacy entries to the new keys | A migrator supplies the full ref for each legacy key, and the contract checks `b16(ref)` plus a pre-cutoff `posts(ref)`. | Same trust as A's check plus about 2 inner reads per entry, extra code, and DAO operations work. No benefit over A. |

**Forensics before the upgrade.** This is an off-chain script, for example `scripts/scan-social-collisions.ts`.
1. List the `p` box names. Report any two refs that share their first 16 bytes. The expected result is none.
2. List the `v` box names that have **no** matching `p` box. Those are evidence of the editVote junk-target exploit. Record them, and decide whether the affected tallies need a DAO correction (D4b).
3. Set `SocialLegacyListCutoff` to a timestamp after the last legacy write you want to keep undoable. Votes and reactions on posts created after the cutoff but before the upgrade lose their legacy undo (MBR stranded, 19,300 or 18,900 µA each). Keep that window short.

### Regression tests — `smart_contracts/social/social.e2e.spec.ts`, new `describe('vote/reaction key isolation')`
1. User U votes down on `F = T[0:16] || 0xFF…` (`RefTypeAddress`). `editVote(ref=T, flip=false)` must revert with `errHaventVoted`, and `votes(T)` is unchanged.
2. U votes on P, then `editVote(P' = P[0:16]||x)` must revert. U votes on P a second time and gets `errAlreadyVoted`.
3. U reacts on F, then `deleteReaction(P, nft)` must revert, and `reactions{P,nft}` is unchanged.
4. Self-vote through editVote: an attacker cannot raise `votes(attacker.bytes)`.
5. Upgrade test, in the same spec using the HEAD artifact. Deploy the old AkitaSocial, create a legacy vote and reaction, update to the new code with the cutoff set to now, then:
   - legacy `editVote`/`deleteReaction` on the original ref succeeds with the correct refunds (19,300 and 18,900);
   - a lookalike ref created after the upgrade is rejected with `errLegacyRef`;
   - a new vote on a ref that already has a legacy vote is rejected.

---

## S-02 (High): `initMeta` writes meta for any `user`

### Code — `social/contract.algo.ts` `initMeta`
```ts
initMeta(mbrPayment: gtxn.PaymentTxn, user: Account, automated: boolean, subscriptionIndex: uint64, NFD: uint64, akitaNFT: uint64): uint64 {
  loggedAssert(user === Txn.sender, errNotSelfMeta)   // new: 'errNsme'
  const wallet = getWalletIDUsingAkitaDAO(this.akitaDAO.value, Txn.sender)
  loggedAssert(!this.meta(Txn.sender).exists, errMetaAlreadyExists)
  ... payment match (add `sender: Txn.sender` per S-09)
  ... createDefaultMeta(Txn.sender, true, wallet.id, automated)
  ... cacheMeta(Txn.sender, …) in BOTH branches
}
```
- `user` stays in the ABI so the SDK and plugin keep working, because they always pass `user = sender`.
- `initialized` becomes constantly `true`. Keep the field in the stored layout.

### ABI and SDK
- The ABI is unchanged.
- SDK `initMeta`: optionally drop the `user` argument and always send `sender`.
- Plugin: unchanged. Its test already passes `user: walletAppAddr`, which equals the sender.

### Migration
- Before upgrading, confirm whether this working-tree version of `initMeta` was ever deployed. HEAD keyed meta by `Txn.sender` (D3).
- If it was never deployed: nothing to migrate.
- If it was deployed: scan the `m` boxes for `initialized == false`. Those are metas created on someone else's behalf. Add a one-shot repair, chosen in D3:
```ts
claimMeta(): void { // owner fixes a meta someone else created
  loggedAssert(this.meta(Txn.sender).exists && !this.meta(Txn.sender).value.initialized, errMetaDoesntExist)
  this.meta(Txn.sender).value.automated = false
  this.meta(Txn.sender).value.wallet = getWalletIDUsingAkitaDAO(this.akitaDAO.value, Txn.sender).id
  this.meta(Txn.sender).value.initialized = true
}
```
This costs about 60 bytes, so include it only if the regressed code reached mainnet.

### Tests — `social/social.e2e.spec.ts`
- `initMeta(user=otherAccount)` reverts with `errNsme`.
- `initMeta(user=self, automated=true)` still works for bots.
- `arc58/plugins/social/social.e2e.spec.ts`: the existing plugin initMeta-then-follow flow stays green.

---

## S-03 (High): follow-key truncation plus fake meta

### Fix
1. Primary: S-02. Once meta can only be created by a real signer, a lookalike `address` would need a 2^128 preimage to get meta, so `getMeta(address)` reverts for lookalikes.
2. Cheap defense in depth in `graph.algo.ts createFollow`. Graph has room. This also neutralizes any fake metas left over if D3 finds the regressed code was deployed.
```ts
const target = this.getMeta(address)               // replaces line 85 read
loggedAssert(target.initialized, errNotInitialized)  // new 'errNini'
const { followerCount, followerIndex } = target
```
3. No change to the `follows`/`blocks` key layout. Re-keying would need a dual-read in `isFollowing`/`getFollowIndex`, which the follower-index gate calls, plus a change to the gate and a migration of every follow box. That is not needed once (1) holds.

- **ABI and state:** none.
- **SDK:** none.
- **Migration:** if D3 says the regression was deployed, run the forensic scan for `f` boxes whose `user16` prefix belongs to a meta with `initialized == false`. Those follows are fake, and the DAO can decide how to handle them.
- **Tests:** `social.e2e.spec.ts` graph section. `follow(lookalikeOfVictim)` reverts because no meta exists for the lookalike. `isFollowing(attacker, victim)` stays false. The follower-index gate test in `gates/contract.e2e.spec.ts`, if a follower-index case exists there, needs a negative case added.

---

## S-04 (Medium): wall-gate bypass through `RefTypePost`

### Code — `social/contract.algo.ts`
```ts
// A box keyed by an account's own address is that account's wall.
private wallGateID(refBytes: bytes<32>, creator: Account): uint64 {
  if (refBytes === creator.bytes && this.meta(creator).exists) {
    return this.meta(creator).value.addressGateID
  }
  return 0
}
```
- `toBytes32` `RefTypeAddress` (lines 109-119): remove the `addressGateID === 0` assert. Keep the length check and `creator = Account(refBytes)`.
- `resolveParentContext`:
```ts
const { creator, gateID } = this.posts(refBytes).value
const wallGate = this.wallGateID(refBytes, creator)
return { refBytes, postGateID: wallGate !== 0 ? wallGate : gateID }
```
- `createVote`: keep today's behavior that gated walls cannot be voted on (D5).
```ts
loggedAssert(this.wallGateID(ref, creator) === 0, errHasGate)
```

### Plugin — `getCreatorDetails`
It already fetches meta. When `postExists && ref === creator.bytes`, set `gateID = meta.addressGateID` so that `gatedReply` and `gatedReact` build the gate transaction with the right ID. Size: S.

- **ABI:** none.
- **Migration:** none. Existing wall boxes are protected as soon as the upgrade lands.

### Tests — `social.e2e.spec.ts`
- The victim sets `addressGateID = G`.
- `reply`/`react` with `type=RefTypePost, ref=victimAddr` must revert with `errHasGate`, and so must a reply with `RefTypeAddress`.
- `gatedReply` with a passing gate succeeds.
- A vote on the wall reverts.
- Plugin spec: `gatedReply` to a gated wall through the plugin succeeds.

---

## S-05 (Medium): MBR under-collection and the uncharged referral drain the app

### Code
`social/constants.ts`:
```ts
export const MinPostsMBR: uint64 = 47_300      // was 46_500; key 33 + head 77 + len 2 = 112 bytes
export const MinPayWallMBR: uint64 = 9_300     // was 5_200; key 9 + header/lengths 8
export const ReplyParentRefMBR: uint64 = 12_800 // 400 * 32
```
`createReply`: `let extra: uint64 = mbrNeeded + ReplyParentRefMBR`. This applies to reply, gatedReply, editReply and gatedEditReply alike, because every reply ref carries `parentRef`.

`vote()`, so the votes box created when a ref is first materialized is charged:
```ts
const votesMbr: uint64 = this.votes(refBytes).exists ? 0 : VotesMBR
const mbrNeeded: uint64 = this.mbr(Bytes(''), '', Bytes('')).votelist + addedMbr + votesMbr
```
Referral: charge exactly what was spent. This removes the `referralFee()` call (an escrow-factory lookup) from `validatePostPayment`.
```ts
private sendPostPayment(): uint64 {
  ...
  const { leftover, referralMbr } = sendReferralPayment(this.akitaDAO.value, akta, postFee)
  ... transfer leftover
  return referralMbr
}
// createPost: move validation after the payment
const referralMbr = this.sendPostPayment()
this.validatePostPayment(mbrPayment, cid, isEditPost, editExtraMbr + referralMbr)

// tipCreator: return the referral MBR it just spent
const { leftover, referralMbr } = sendReferralPayment(this.akitaDAO.value, akta, tax)
if (type === TipSendTypeARC58) { this.arc58SendReactionPayments(...); return arc58 + referralMbr }
this.sendDirectReactionPayments(...)
return referralMbr

// validatePostPayment: drop referralFeeAmount
let amount: uint64 = posts + votes + votelist + extraAmount
```
`createVote` (up) and `createReaction` already add `tipCreator`'s return value to the required payment, so referred votes and reactions become self-funded. In `createReply`, the double count disappears because the referral is now counted only through `tipCreator`.

`createPayWall`: change the amount check to exact equality, `amount: this.payWallMbr(payWall)`.

### Plugin (`arc58/plugins/social/contract.algo.ts`)
- `posts`/`votes` constants come from `mbr()`, so recompiling picks them up.
- Add `ReplyParentRefMBR` in `reply`, `gatedReply`, `editReply` and `gatedEditReply`.
- Add `VotesMBR` in `vote` when `!postExists`. Every path that creates a posts box also creates its votes box, so `postExists` implies the votes box exists.
- Add a referral quote helper that mirrors the contract's lookup exactly:
```ts
private referralCost(sender: Account): uint64 {
  const w = getWalletIDUsingAkitaDAO(this.akitaDAO.value, sender)
  if (referrerOrZeroAddress(w) === Global.zeroAddress) return 0
  return costInstantDisbursement(this.akitaDAO.value, getAkitaAssets(this.akitaDAO.value).akta, 1)
}
```
- Add `referralCost(sender)` to: post and editPost (always); reply, edit-reply and react when `creator !== Global.zeroAddress`; vote when `isUp && creator !== zero`; editVote flip down-to-up when `creator !== zero`.
- Exactness relies on `tax > 0`. Given `impactRange` ≥ `impactTaxMin + (max−min)/1000`, that holds unless the DAO sets `reactFee * range < 100_000`. Document this as a DAO configuration invariant (D6).

### SDK — `akita-sdk/src/social/constants.ts` and `index.ts`
- Set `MIN_POSTS_MBR = 47_300n` and `MIN_PAYWALL_MBR = 9_300n`, and add `REPLY_PARENT_REF_MBR = 12_800n`.
- Add a referral-cost input to `calculatePostMBR`, `calculateReplyMBR`, `calculateVoteMBR` and `calculateReactMBR`. The SDK can resolve it by simulating `EscrowFactory.get` plus the wallet `referrer` global, plus Rewards opt-in status.
- Update the SDK MBR unit tests in `social.e2e.spec.ts` (lines 148-376) to the new constants.

### Migration
- No change to box layout. Existing under-funded boxes are already paid for out of the app's balance.
- After the upgrade, measure `amount − minBalance` on AkitaSocial and top it up through a DAO payment (D6). Old plugins quote the old amounts and will revert, which is why the plugin rollout must be coordinated with this upgrade (see the deployment plan).

### Tests — `social.e2e.spec.ts`, new `describe('app balance conservation')`
- For post, reply, editPost, editReply, vote on a new Address ref, react, createPayWall, and an upvote and a react from a **referred** wallet:
  - assert that AkitaSocial's `amount − minBalance` after the call is ≥ its value before;
  - and that the user-paid payment equals the box delta plus spends.
- Plugin spec: a referred wallet can post, reply and vote through the plugin.

---

## S-06 (Low): spot-balance impact inputs can be shared between sybils

### Recommended code — `social/impact.algo.ts` (design decision D7)
Exclude the flash-movable spot components (held AKTA and NFT) from the social-only scoring path. Keep them in the public `getUserImpact` used by gates and fee discounts.
```ts
private userImpactWithSocial(account: Account, socialImpact: uint64, includeSpot: boolean): uint64 {
  ...
  const heldAkitaImpact: uint64 = includeSpot ? this.getHeldAktaImpactScore(account) : 0
  const nftImpact: uint64 = includeSpot && akitaNFT !== 0 ? this.getNFTImpactScore(account, Asset(akitaNFT)) : 0
  ...
}
// getUserImpactWithInputs (social-only) -> includeSpot=false; userImpact(...) -> includeSpot=true
```
- No change to AkitaSocial bytecode or ABI. The tip tax and vote weight then use a score of at most 900.
- App soft stake still counts at read time when the balance is at least the commitment. Track that as accepted risk, mitigated by running a checkpoint keeper (an ops bot calling `checkpointStakingImpact` for addresses whose balance dipped).
- A stronger option needs a Staking change, such as a minimum dwell before a soft commitment counts. That belongs to the Staking family.

- **ABI:** unchanged.
- **Migration:** upgrade impact only. Existing vote records keep their historical weights.
- **Tests:** `social.e2e.spec.ts`. In a single group, send 1M AKTA to the voter, vote, and send it back. The recorded `getVote(...).impact` must equal the impact without the held-AKTA component.
- **Dependencies:** SG-02 (streak inflation) from the other family feeds `getSubscriberImpactScore` (up to 250) and/or the social streak component (up to 100) independently. S-06 does not cover it.

---

## S-07 (Low): a stale NFD makes impact revert

### Code — `social/impact.algo.ts`
```ts
private getNFDImpactScore(account: Account): uint64 {
  const { NFD, nfdTimeChanged, nfdImpact } = this.meta(account).value
  const [timeChangedBytes, exists] = op.AppGlobal.getExBytes(Application(NFD), Bytes(NFDGlobalStateKeysTimeChanged))
  if (!exists || btoi(timeChangedBytes) !== nfdTimeChanged) {
    return 0 // stale or deleted NFD: no NFD credit until re-cached via updateMeta
  }
  return nfdImpact
}
// call site (line 127):
const nfdScore: uint64 = NFD !== 0 ? this.getNFDImpactScore(account) : 0
```
- **ABI:** none.
- **Migration:** upgrade impact only.
- **Tests:** `social.e2e.spec.ts`, Impact Read section. Use a mock NFD if the suite has one; otherwise deploy a minimal app that exposes `i.timeChanged` and change its value. Then `getUserImpact` returns a value without the NFD part instead of reverting, and an upvote on that user's post succeeds.

---

## S-08 (Low): refund paths locked behind ban and block checks

### Code
- `social/contract.algo.ts deleteReaction`: remove `this.loadPostWithAccessCheck(ref)`. This is already done in the S-01 rewrite above.
- `graph.algo.ts unblock` (line 115) and `unfollow` (line 172): remove `loggedAssert(!this.isBanned(Txn.sender), errBanned)`. Withdrawal paths should always be open. Each removal also saves an inner call.
- `editVote` with `flip=false` is already unguarded. The flip branch keeps its checks, because `createVote` runs `loadPostWithAccessCheck`.

- **ABI:** none.
- **Migration:** none.
- **Tests:** `social.e2e.spec.ts`.
  - The creator blocks a reactor, and the reactor can still `deleteReaction`, receiving the exact refund.
  - A banned user can `unfollow` and `unblock`, receiving the exact refund.

---

## S-09 (Info): grouped payments not tied to the sender; clawback tips allowed

### Code
- `social/contract.algo.ts validateTip`:
```ts
match(tip, { sender: Txn.sender, assetSender: Global.zeroAddress, assetReceiver: Global.currentApplicationAddress, xferAsset: akta, assetAmount: … })
```
- Add `sender: Txn.sender` to the `match` patterns in:
  - `validatePostPayment`
  - `validateReactPayment`
  - `createVote`
  - `initMeta`
  - `createPayWall`
  - `registerRefType`
- `graph.algo.ts`: add `sender: Txn.sender` to the payment `match` patterns in `block`, `follow` and `gatedFollow`.
- `impact.algo.ts`: add `sender: Txn.sender` to the `match` in `updateSubscriptionStateModifier`, and `payment.sender === Txn.sender` in `commitStakingImpact`.

The plugin always sends the itxns from the same `sender` as the app call, so it needs no change.

**Decision D8, because of the byte budget:**
- **Option 1:** full binding everywhere. About +45 bytes in AkitaSocial.
- **Option 2 (recommended if bytes are short):** in AkitaSocial, add only `assetSender: Global.zeroAddress` on tips (about +6 bytes), and do full binding in Graph and Impact.

The only real risk today is a clawback-sourced tip. Third-party-funded MBR is consensual, and blocking it would also forbid sponsored and relayer payments, if the product wants those.

- **ABI:** none.
- **Tests:** `social.e2e.spec.ts`.
  - A tip sent by account B for a call from A reverts with `errIxfr` (Option 1 only).
  - Create a test ASA with a clawback, use it as the configured AKTA in a local fixture, send a clawback tip, and it reverts.

---

## S-10 (Info): functional defects

| Item | Fix | Size | Call |
|---|---|---|---|
| a. Plugin `editReply`/`gatedEditReply` read the parent from `ref.slice(0,32)` (`plugin:351,420`) | Use `postBeingAmended.ref.slice(36, 68).toFixed({ length: 32 })` | S | **Fix**, since the plugin is redeployed anyway. Test: plugin spec "editReply via plugin succeeds". |
| b. Plugin omits the referral cost | Covered by S-05 | — | Fix (S-05) |
| c. `resolveParentContext` asserts the post exists before materializing | Delete `createEmptyPostIfNecessary` and the `fallback` selection from `resolveParentContext`, and drop `addedMbr` from reply and react. Only `vote` materializes. In the plugin, drop the `!postExists` posts-MBR additions in reply and react. | S (saves bytes) | **Fix.** The only change is that reply and react to a never-voted asset, app or address ref stays impossible (D1 or product). |
| d. `updateMeta` requires an existing paywall (ID 0 never exists) | `loggedAssert(defaultPayWallID === 0 \|\| this.paywall(defaultPayWallID).exists, errPaywallNotFound)` | S | **Fix**; it is also the S-07 recovery path. Test: `updateMeta(…, defaultPayWallID=0)` succeeds. |
| e. `graph.block` on an existing block charges twice | `loggedAssert(!this.blocks(blocksKey).exists, errAlreadyBlocked)` (new `'errEblk'`) | S | **Fix.** Test: a second block reverts. |
| f. `FollowsMBR` overcharges by 12,800 | — | — | **Won't fix.** Legacy follow boxes were charged 31,700 and must be refunded 31,700. Lowering the constant would under-refund them unless the funded amount were tracked per box. |
| g. `createReply` does not validate paywall fields | Move the `createPost` paywall assert into `private assertPayWall(usePayWall, payWallID)` and call it from `createReply` | S (+15 bytes) | Fix only if D1 leaves room; otherwise won't fix, because paywalls are enforced off-chain. |
| h. `updateSubscriptionStateModifier` accepts 0 and re-charges MBR | Add `loggedAssert(newModifier > 0, errInvalidModifier)` (new `'errImod'`) | S | **Fix** the zero check. **Won't fix** the re-charge, because the plugin cannot read the impact box to quote 0; this is DAO-only overpayment. |
| i. Moderation `ban`/`addModerator` boxes are not funded | — | — | **Won't fix.** Trusted roles; the moderation app is pre-funded. |
| j. Votes ignore the post's `gateID` | — | — | **Won't fix.** By design. |

---

## Deployment plan for live mainnet apps

All four Social apps are DAO-upgradeable (`UpgradeableAkitaBaseContract.update` through the update plugin; script `scripts/update-social.ts`). **The Social plugin is not upgradeable** (`AkitaBaseContract`): it needs a new app, an update to the DAO plugin registry, and a reinstall in each wallet.

1. Run the forensic scans: prefix collisions, orphan `v` boxes, `m` boxes with `initialized == false`, and the AkitaSocial spare balance. Set `SocialLegacyListCutoff`.
2. Run `npm run build`. Confirm AkitaSocial ≤ 8,192 bytes and apply D1's choices. Run the full `npm test`, including the upgrade-from-HEAD test in S-01.
3. Upgrade **AkitaSocialImpact** (S-06, S-07, S-10h). Its ABI is backward-compatible.
4. Upgrade **AkitaSocialGraph** (S-03, S-08, S-09, S-10e). Its ABI is backward-compatible.
5. Upgrade **AkitaSocial** (S-01, S-02, S-04, S-05, S-08, S-09, S-10c/d). From this moment the **old plugin's MBR quotes are wrong**, so its post, reply, vote and react calls revert.
6. Deploy the **new AkitaSocialPlugin** (S-04, S-05, S-10a/c), update the DAO plugin registry, and roll out the wallet reinstall through the SDK and app. Steps 5 and 6 should be one DAO proposal, or back-to-back proposals (D9).
7. Release the SDK: new constants, the `x`/`y` key derivation, referral quoting and error codes.
8. Top up AkitaSocial's balance with a DAO payment sized from step 1.

## Design decisions needed from Kyle

| # | Decision | Options | Recommendation |
|---|---|---|---|
| D1 | AkitaSocial byte budget (7,948/8,192) | (a) remove dead materialization (S-10c); (b) remove `getVotes` and let the SDK read boxes; (c) remove the editVote flip branch; (d) split votes or reactions into a satellite app | (a) plus (b) first, then measure; (c) if still short; (d) only as a last resort, because it would be L effort |
| D2 | `initMeta` semantics | strict `user == Txn.sender` / allow a controller (wallet origin or spending account) to init for its wallet address | Strict. All current callers already pass `user = sender`. |
| D3 | Did the working-tree `initMeta(user)` ever run on mainnet? | No: nothing to do / Yes: add `claimMeta` plus the graph `initialized` guard and clean up fake follows | Check the deployed bytecode or version, and the `m` boxes with `initialized == false` |
| D4 | Legacy cutoff source | compile-time constant (recommended; no state and about 0 bytes) / one-shot DAO setter on a spare global uint (AkitaSocial has 8 uints and uses 3) | Constant, set just before the proposal executes |
| D4b | Tallies already corrupted, if the scan finds orphan `v` boxes or collisions | leave them / add a DAO-only `adjustVotes(ref, count, isNegative)` | Decide after the scan; most likely leave them |
| D5 | Should wall votes respect `addressGateID`? | keep today's "gated walls can't be voted on" / allow ungated votes on walls | Keep, since wall votes drive the user's impact |
| D6 | Referral charging model and the historical drain | exact-spend (recommended) / flat `referralFee` whenever a referrer exists; DAO top-up amount | Exact-spend, plus the DAO invariant `reactFee*impactRange ≥ 100_000`; top up after the upgrade |
| D7 | Vote and tax weight composition | exclude spot components only on the social path (recommended) / everywhere / keep them and run a keeper only | Social path only |
| D8 | Payment sender binding in AkitaSocial | full / `assetSender`-only | Depends on D1; at minimum `assetSender` |
| D9 | Plugin rollout | one combined DAO proposal for the social upgrade plus the plugin registry / accept a short outage | Combined proposal; announce the wallet reinstall |

## Dependencies

- S-03 depends on S-02. The graph `initialized` guard covers the case where S-02 was already deployed.
- S-01 includes S-08's `deleteReaction` change, so implement them together. S-01 and S-05 both touch the votes-box charge in `vote()`.
- S-05, S-04 and S-10a/c all require the new plugin, and the plugin quotes from `BaseSocial.mbr()` and constants that are shared with AkitaSocial. Build both from the same commit.
- S-10d (allowing paywall ID 0) is the recovery path users need after S-07 marks an NFD stale.
- **ACC-01 (origin spoofing, Account family):**
  - `tipCreator` sends the tip remainder to `getOriginAccount(meta.wallet)` (`contract.algo.ts:287, 328`).
  - The plugin uses `origin` as the gate subject.
  - If a wallet's controlled address can be spoofed, tips and gate checks follow the spoofed origin. Social fixes do not mitigate this.
- **EscrowFactory 16-byte `walletIDsByAccounts` keys (`escrow/factory.algo.ts:155`):** the social wallet and referral lookups are only safe because, after S-02, they are always called with a real `Txn.sender`. Do not re-introduce lookups for caller-supplied addresses.
- **SG-02 (streak inflation)** feeds impact through the subscription streak (`impact.algo.ts:254-258`, up to 250) and/or the social streak (`:150-154`, up to 100). The fix belongs to that family. S-06 does not neutralize it.
- **Staking soft-stake shareability (S-06 residual)** needs either a Staking-family change or a keeper bot.
