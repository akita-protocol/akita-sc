# Security review: Meta, HyperSwap, Poll (+ plugins)

Reviewer scope (current working tree, read-only, 2026-10-02):

- `projects/akita-sc/smart_contracts/meta/*` (Meta registry, functions.ts helpers)
- `projects/akita-sc/smart_contracts/hyper-swap/*`
- `projects/akita-sc/smart_contracts/poll/*` (Poll, PollFactory)
- `projects/akita-sc/smart_contracts/arc58/plugins/{meta,hyper-swap,poll}/contract.algo.ts`
- Read-across: `arc58/account/contract.algo.ts` (rekey/group validation), `utils/functions.ts`
  (gateCheck, getSpendingAccount, arc58OptInAndSend), `gates/sub-gates/merkle-{address,asset}`,
  `staking-pool` verify call, `social/impact.algo.ts`, `utils/base-contracts/*`, compiled TEAL for
  default inner fee / box write semantics.

Meta decisions documented in `projects/akita-sc/audits/meta-*.md` (revision restart after delete,
root deletion leaves attached values, shared record/`addData` key space, policy persistence across
grant removal, DAO-upgradeable registry) are treated as settled.

All paths below are relative to `projects/akita-sc/smart_contracts/`.

---

## Findings summary

| ID | Severity | Confidence | Title |
|----|----------|------------|-------|
| HS-01 | Critical | Confirmed | Non-atomic, sender-only disbursal + post-expiry cancel lets the last party keep its own escrow and the counterparties' assets |
| HS-02 | High | Confirmed | Unverified offeror-supplied `leaves` lets an offer reach DISBURSING without the offeror funding; counterparty escrow locked until an unbounded offeror-chosen expiration |
| PL-01 | Medium | Confirmed | PollFactory refunds the full creation payment although 0.1 ALGO stays stranded in every deleted Poll account; permissionless create/delete cycles drain the factory and then block all refunds |
| HS-03 | Low | Confirmed | ASA/ALGO escrow principal not bound to the participant (no sender / clawback / close checks) — documented remediation absent |
| HS-04 | Low | Confirmed | Withdraw/cancel/cleanup re-resolve the Meta registry from the DAO on every call; a registry repoint strands escrowed funds and offer MBR |
| PL-02 | Low | Confirmed | Poll type validation is `< 40`: accepts non-enum values and rejects the valid `MultipleChoiceImpact` (40) |
| PL-03 | Low | Confirmed | Impact-weighted polls read transferable balances at vote time; the same AKTA can be recycled across addresses for repeated weight |
| PL-04 | Low | Confirmed | Vote MBR refunded to the voter, not the recorded payer |
| INFO | Info | — | See list at end |

---

## HS-01 — Non-atomic disbursal + post-expiry cancel = theft of counterparty assets

- **Severity:** Critical  **Confidence:** Confirmed
- **Location:** `hyper-swap/contract.algo.ts:357-367` (disburse binds the leaf to `Txn.sender`),
  `:462-466` (cancel allowed in `STATE_DISBURSING` after expiration), `:504-566` (withdraw of
  remaining escrow in `STATE_CANCELLED`).

**Description.** In DISBURSING every leaf is already escrowed, but `disburse` recomputes the leaf
hash with `Txn.sender` as the `from` field, so only the leaf's own funder can release it. Nobody
else (counterparty, keeper, offeror) can complete the swap. At the same time `cancel` is allowed in
DISBURSING once `expiration <= now`, and `withdraw` then returns every still-escrowed leaf to its
funder. The party that disburses last can therefore decline to disburse, wait for expiry, cancel,
and withdraw its own principal while keeping what the others already disbursed to it.
`CONTRACT_AUDIT.md` (HyperSwap section) says "permissionless disbursement sends declared outputs".
The code does not do this, at HEAD or in the working tree.

**Exploit.** A offers a tree with two leaves, `A→B 1,000 ALGO` and `B→A NFT`. A sets a short
expiration. Both parties accept and escrow, so the offer moves to DISBURSING.
1. B calls `disburse` for its leaf (the SDK's `HyperSwapSDK.disburse` sends one sender-signed call), and the NFT goes to A.
2. A never calls `disburse`. After `expiration`, A calls `cancel(id, proof)`. A still has its
   participant box and a membership proof, `escrowed == 1`, so the state becomes CANCELLED.
3. A calls `withdraw(id, B, 0, 1000, proof)`. Hash `(A,B,0,1000)` still exists, so A gets 1,000 ALGO back plus its MBR.
A ends with the NFT and its ALGO, and B loses the NFT. In any n-party swap the participant who
disburses last has this option. Normal client flows disburse one leaf per participant
independently, so honest participants who go first are exposed.

**Fix.** Make disbursal permissionless and complete. Add a `from` argument to `disburse`, verify the
hash box (escrow is already proof-verified), and let anyone call it in DISBURSING. Remove the
DISBURSING branch from `cancel`, or allow it only while no leaf has been disbursed (track a
`disbursed` counter). For receivers that cannot accept an ASA, fall back to ARC-59 or an inbox
instead of reverting, so DISBURSING never needs an escape hatch. Fix HS-02 together with this
one: once disbursal is permissionless, an understated `leaves` count would let anyone push out
victims' leaves.

---

## HS-02 — Unverified `leaves` / unbounded `expiration` (premature DISBURSING, escrow lock)

- **Severity:** High  **Confidence:** Confirmed
- **Location:** `hyper-swap/contract.algo.ts:94-159` (`leaves`, `participantsLeaves`, `expiration`
  stored as supplied; `expiration` only lower-bounded at `:103`), `:262-268` and `:340-345`
  (state flips to DISBURSING when `escrowed == leaves`), `:462-466` (DISBURSING cancel only after
  expiry).

**Description.** A Merkle root does not commit to its leaf count, and nothing ties `leaves` to the
tree. The offeror can declare `leaves` equal to the number of counterparty leaves. Once those are
escrowed the offer moves to DISBURSING, even though the offeror's own leaves were never funded. After
that the offeror can no longer escrow (`escrow` requires ESCROWING), and the counterparties cannot
cancel until `expiration`, which has no upper bound (up to 2^64-1).

**Exploit.** Tree `A→B 1,000 ALGO` and `B→A NFT`. A (offeror) declares `leaves = 1` and
`expiration = now + 10 years`. B accepts and escrows the NFT, and the state becomes DISBURSING.
- If B trusts the state (DISBURSING means "all funded") and disburses, A receives the NFT having paid nothing.
- If B notices, the NFT stays locked until the expiration 10 years out, because only
  `cancel` after expiry or `disburse` can move it.
With a correct `leaves` count, B could cancel at any time in ESCROWING while A had not funded.
Understating `leaves` takes that option away.

**Fix.** Make every acceptance commit to the offer terms. `accept` (and the offeror's `offer`)
should take `expectedRoot, expectedLeaves, expectedParticipantsLeaves, expectedExpiration` and
assert they match, or derive a commitment (for example `sha256(root||leaves||participantsRoot||participantsLeaves||expiration)`)
that the participant signs over. Cap `expiration - now` (for example 30 days). Consider letting any
participant cancel in DISBURSING while `disbursed == 0` (see HS-01).

---

## PL-01 — PollFactory refund over-pays by the forwarded child min-balance (factory drain / refund DoS)

- **Severity:** Medium  **Confidence:** Confirmed
- **Location:** `poll/factory.algo.ts:41,50` (funder amount = full `payment.amount`, which
  includes `Global.minBalance` per `newPollCost` at `:84-92`), `:59-64` (factory forwards
  `Global.minBalance` to the child), `:69-81` (`deletePoll` refunds `amount` from the factory),
  `poll/contract.algo.ts:218-223` (`deleteApplication` does not close the poll account).

**Description.** The factory receives X = pages + schema + minBalance and forwards minBalance
(0.1 ALGO) to the child. On deletion, the factory's MBR drops by only X - minBalance, but it pays
the funder the whole X. The child's 0.1 ALGO stays in a deleted app account, where nobody can ever
spend it. Each create/delete cycle therefore costs the factory 0.1 ALGO. This is the
"whole creation payment recorded as refundable" class that `CONTRACT_AUDIT.md` marks Critical and
fixed for child factories. PollFactory was not fixed.

**Exploit.** Creating and deleting polls needs no permission. An attacker calls `new` with
`endTime = now + 1s` and pays X. Once the poll ends, the attacker calls `deletePoll(app)` (no vote
boxes needed) and gets X back. Each cycle costs about 7 txn fees (~0.007 ALGO) and burns 0.1 ALGO
from the factory. When the factory's spendable balance runs out, every `deletePoll` reverts:
legitimate funders (~0.96 ALGO each) cannot get refunds, and finished polls cannot be deleted until
someone tops up the factory.

**Fix.** In `Poll.deleteApplication`, close the poll account to the factory with an inner payment
using `closeRemainderTo: Global.creatorAddress`. Alternatively, record only factory-retained MBR as
the funder amount and refund the child minBalance separately via close-out.

---

## HS-03 — Escrow principal not bound to the participant; clawback/close fields unchecked

- **Severity:** Low  **Confidence:** Confirmed
- **Location:** `hyper-swap/contract.algo.ts:330-332` (escrowAsa checks only receiver/asset/amount),
  `:253-254` (escrow ALGO checks only receiver/amount).

**Description.** `escrowAsa` does not check `assetXfer.sender === Txn.sender`,
`assetXfer.assetSender === Global.zeroAddress` (rejecting clawback), or `assetCloseTo`. `escrow`
does not check `payment.sender` or `closeRemainderTo`. The leaf's `from` is `Txn.sender`, so on
cancel the principal returns to the participant, not to the account that funded it. Exploiting
this requires the funder or clawback authority to sign, so it gives no third party new power. Still,
it breaks the documented invariant. The `CONTRACT_AUDIT.md` High row ("actor-bound non-clawback ASA
principal") is listed as remediated, but those checks are not in the code. Sponsors also lose
principal on cancel.

**Fix.** Assert `assetXfer.sender === Txn.sender`, `assetXfer.assetSender === Global.zeroAddress`,
`assetXfer.assetCloseTo === Global.zeroAddress`, and `payment.sender === Txn.sender` (or persist the
principal funder and return it to them).

---

## HS-04 — Registry re-resolved per call; repointing `metaMerkles` strands live offers

- **Severity:** Low  **Confidence:** Confirmed
- **Location:** `hyper-swap/contract.algo.ts:115,177,239,306,474,518,623`.

**Description.** `cancel` and `withdraw` need `Meta.verify` against the registry currently named
in the DAO app list. `cleanupOffer` calls `deleteRoot` there. If governance repoints `metaMerkles`
(the Meta migration does exactly this), in-flight offers whose roots live in the old registry can no
longer verify. Escrowed funds then cannot be withdrawn (`withdraw` fails at `:528`), and
cleanup reverts (`errNoName`), stranding offer and root MBR. The deployment notes rely on draining
these offers manually.

**Fix.** Store the registry app ID in `OfferValue` at offer time and use it for every later
verify and delete. Alternatively, skip proof verification in `withdraw`: the hash box already
proves the leaf was verified at escrow time.

---

## PL-02 — Poll type check is a range, not an enum

- **Severity:** Low  **Confidence:** Confirmed
- **Location:** `poll/contract.algo.ts:163`, `:174-177`, `:122`.

`type.asUint64() < 40` accepts 0–39 and rejects `MultipleChoiceImpact` (40), so the advertised
impact multiple-choice type can never be created. A non-enum type such as 25 takes the
multiple-choice branch without `maxSelected` being set. Every vote then fails
(`check GlobalState exists` at TEAL for `:122`), and the poll is unusable. The damage stays with the
creator. `CONTRACT_AUDIT.md` lists "Poll accepted non-enum values" as fixed, but it is not.
**Fix:** assert `type` is one of `{10,20,30,40}`.

## PL-03 — Impact-weighted votes are recyclable

- **Severity:** Low  **Confidence:** Confirmed (held-AKTA component)
- **Location:** `poll/contract.algo.ts:100-104`; `social/impact.algo.ts:223-240` (held AKTA by
  live `AssetHolding` balance), `:132-134` (minimum 1).

The vote weight is `getUserImpact(Txn.sender)`, evaluated at vote time. Its held-AKTA component
(up to 50) comes from the current ASA balance. A holder can vote from address A, move the AKTA to
B, and vote again, adding up to +50 per hop (plus the 1-point floor) for about 0.2 ALGO of account
MBR per hop. Each ARC-58 escrow address can also vote separately (`votes` keyed by
`Txn.sender`). Poll results are advisory and move no funds. **Fix:** snapshot weight from
non-transferable sources (locked stake, social), weight by wallet origin, or document the
limitation.

## PL-04 — Vote MBR refund goes to voter, not payer

- **Severity:** Low  **Confidence:** Confirmed
- **Location:** `poll/contract.algo.ts:236-237,247-248` (payment sender unchecked), `:206-212`
  (refund to `addresses[i]`).

A sponsor who pays `votesMBR` for another voter loses the refund to that voter. This breaks the
invariant that the refund goes to the recorded funder. **Fix:** require
`mbrPayment.sender === Txn.sender` or store the payer in the vote box.

---

## Info

- **Poll plugin gate subject mismatch** (`arc58/plugins/poll/contract.algo.ts:92,116` vs
  `poll/contract.algo.ts:235`). The plugin passes `origin` (the controlled address) as the gate subject, while
  Poll checks `Txn.sender` (the spending account). For escrow-scoped grants these differ and gated votes
  always fail. This fails closed, so it is functional only.
- **HyperSwap offeror is auto-accepted without proof** (`hyper-swap/contract.algo.ts:145,156`).
  It counts toward `participantsLeaves` even if it is not in the participants tree. The worst outcome is a stuck
  offer that only becomes cleanable after expiry.
- **Duplicate trade leaves** collapse onto one hash box, so the offer can never reach DISBURSING. Offeror self-harm only.
- **Poll results erasable after end.** `deleteBoxes` and `deletePoll` are permissionless once
  `endTime` passes. Refunds go to the correct parties. If results must persist on-chain, gate deletion.
- **HyperSwap MBR quotes are constants** (`hyper-swap/constants.ts:22-24`). A registry with a different
  `rootCosts` makes `offer` revert (fails closed). The audit doc says "queries the registry's actual root cost",
  but the code does not.
- **MetaPlugin unrestricted/namespace delegates can lock wallet ALGO in record deposits** (up to ~6.5
  ALGO per 16 KB record) and spend 100 ALGO per `addType`. This needs an admin-configured unrestricted
  policy. Deposits refund to the spending account on removal.

## Checked and OK

- **Meta key namespaces.** Roots use `r||owner[32]||name`, records `m||owner[32]||key`, types `t||u64`, so the prefixes
  are disjoint. Writes always key on `Txn.sender`, and supplied owners are used only for reads. No cross-owner
  overwrite or delete is possible. The `len||ns||key` adapter convention is unambiguous across namespaces.
- **Meta MBR math.** `rootCosts` matches the real box MBR (31,700 + 400·name). `recordStorageCost` matches the header layout.
  `addData`, `setRecord` and `removeRecord` refunds go to `Txn.sender` (the owner). `requireRecordPayment` binds
  sender, receiver, amount, close and rekey. Dynamic box writes compile to `box_del`+`box_put`, and the multi-part
  splice preserves the declared size.
- **Proof verification.** Every consumer computes leaves as `sha256(sha256(x))` with x ≠ 64 bytes
  (address 32 B, asset 8 B, trade tuple 80 B). Internal nodes are `sha256(64 B)`, so an internal node can never
  equal a leaf (no second preimage). Sorted pairs are consistent. An empty proof only accepts a
  one-leaf tree whose leaf the consumer itself computed. The participant and trade trees use separate per-offer names under the
  HyperSwap address, and only HyperSwap can update or delete them.
- **MetaPlugin authorization.** The rekey index, selector, plugin ID, current `PluginKey` and authAddress are all checked.
  The wallet validator binds `appArgs(1)` to the wallet for every call in the rekey window, so a fake
  wallet app cannot borrow another account's plugin authority. Admin detection (`caller == wallet.address`)
  matches `CallerTypeAdmin`. Policies fail closed when missing. Key-scoped grants cannot touch roots, and
  `addType` needs an unrestricted grant. Policy refunds equal Meta's refunds, so the plugin is not drained. The final txn
  rekeys back on every path.
- **HyperSwap MBR.** Offer, participant, hash and refund box costs match the real MBR. Cleanup is
  permissionless, refunds the stored payors, and requires every participant to be cleaned up before the offer.
  Escrow and withdraw are bound to the caller's own leaf (hash includes `Txn.sender`). Double disburse or withdraw is
  prevented by deleting the hash box. Accept, escrow and expiry checks are correct. The ARC-58 opt-in path checks
  `wallet.address == receiver`, and AVM forbids re-entrancy into HyperSwap.
- **Poll.** One vote per `Txn.sender` (box existence). Voting is only allowed at `<= endTime` and deletion only at `> endTime`, with no overlap.
  Duplicate and out-of-range options are rejected. Gate tx is bound to the gate app, selector, subject and gate ID. Only the
  factory can delete, and only after end with no boxes. Plugin calls verify the creator is the factory.
- **Inner fees** default to 0 in every compiled contract in scope (checked TEAL), so there is no fee drain.
  OpUp uses GroupCredit.
