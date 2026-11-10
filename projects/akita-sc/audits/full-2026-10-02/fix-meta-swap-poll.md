# Fix proposals: HyperSwap, Poll, Meta (follow-up to audit-meta-swap-poll.md)

These are proposals only. No repo file, build or chain was touched. Contract paths are relative to
`projects/akita-sc/smart_contracts/`; SDK paths to `projects/akita-sdk/src/`.

APIs used below were checked against `node_modules/@algorandfoundation/algorand-typescript/*.d.ts`
or existing repo code:

- `gtxn.PaymentTxn.closeRemainderTo` / `.sender`, and `gtxn.AssetTransferTxn.assetSender` / `.assetCloseTo` / `.sender` (gtxn.d.ts:16,73,333,341,352).
- `itxn.payment({ closeRemainderTo })` (itxn.d.ts:622). Precedent: `marketplace/listing.algo.ts:365`.
- `Account.balance` (reference.d.ts:15).
- `Array.slice(start,end)` (arrays.d.ts:50).
- `sha256`/`itob` from `op`, `Bytes` template literals, `.concat`, `clone`, and `Uint8 ===` comparisons are already used in these contracts.
- `assetSender === Global.zeroAddress` precedent: `arc58/plugins/haystack-router/contract.algo.ts:120`.

## Deployment facts that shape every fix

| App | Upgradeable? | Notes |
|-----|--------------|-------|
| HyperSwap (mainnet 3569558555, update counter 0) | **Yes, in source.** `UpgradeableAkitaBaseContract.update(newVersion)` allows `UpdateApplication` when `Txn.sender` is the DAO wallet and `Global.callerApplicationId` is the DAO's `update` plugin (`utils/base-contracts/upgradeable.ts:33-42`). Script: `scripts/update-hyper-swap.ts`. | **Verify on the live bytecode before relying on it.** Counter 0 means the app has never been updated, so its bytecode predates the current tree. Confirm it exposes `update(string)void` with that guard (read the on-chain approval or simulate). Global schema is fixed at 2 uints + 1 byte-slice, so **new state must go in boxes**. The program must fit the live app's `extraProgramPages`: the deploy script uses 3 (8,192 B) and the current approval is 3,830 B. Confirm the live value. |
| HyperSwapPlugin | **No.** It extends `AkitaBaseContract`, which has no `update` method. | Any ABI change means a new app, a DAO plugin-list update, and wallets re-installing it. |
| PollFactory (live) | **Yes.** It has `update`; script: `scripts/update-poll.ts`. | `Poll` bytecode is embedded through `compileArc4(Poll)`, so a factory update ships a new child for **new** polls only. Existing Poll apps are immutable: `Poll` extends `AkitaBaseContract` and has no update. |
| PollPluginContract | **No.** | Redeploy required for any change. |
| Meta / MetaPlugin | Meta yes; MetaPlugin no. | No Meta fixes are proposed. |

### In-flight HyperSwap offers under upgraded code

Do this before choosing a migration. It is a read-only check, done by Kyle or the coordinator; I touched no chain.

1. Read global `offer_cursor` and list the boxes with prefix `o` on app 3569558555.
2. **Likely result: no live offers.** HEAD's `offer()` named Meta roots `String(root)`, a 32-byte name. The project audit records the MetaMerkles name limit as 31 bytes, so every `offer()` on the deployed code should have reverted. The live bytecode is not confirmed to equal HEAD, so check rather than assume.
3. **If any offers exist, drain them under the old code before upgrading.** The working tree already changed the following, so legacy offers break under new code regardless of these fixes:
   - It added the `offerRefunds` (`f`) box. `cleanupOffer` reads it and reverts for legacy offers.
   - It changed the offeror's participant refund. The legacy offeror box holds the whole offer MBR, so `cleanupParticipant` would refund too much from HyperSwap's own balance.
   - It changed root names from `String(root)` to `t|p‖itob(id)`, so legacy roots in MetaMerkles cannot be found.
   - After HS-01, a legacy DISBURSING offer becomes permissionlessly disbursable even though nobody accepted its terms (HS-02).
4. If a drain is impossible, add an explicit legacy branch: detect it by the missing `offerRefunds(id)` box, keep sender-only disbursal, and skip root deletion. I do not recommend this unless offers really exist.

---

## HS-01 + HS-02 (one change). Critical + High. Size: M (contract) / M (SDK + plugin)

**Goal.** Once every declared leaf is funded, the swap must complete without depending on any
single party. "Every declared leaf" must be a number all participants agreed to.

The two fixes have to ship together. Permissionless disbursal alone turns an understated `leaves`
count into theft that needs no action from the victim: the victim escrows, the offer flips to
DISBURSING, and anyone pushes the victim's leaf to the offeror.

### Contract changes (`hyper-swap/contract.algo.ts`)

**1. Bounded expiration in `offer`.** Change at `:103`; new constant in `constants.ts`, new error in `errors.ts`.

```ts
// constants.ts
export const MaxOfferDuration: uint64 = 2_592_000 // 30 days (decision D2)
// errors.ts
export const errOfferTooLong = 'errOtlg'
export const errTermsMismatch = 'errTmis'

// offer()
loggedAssert(expiration > Global.latestTimestamp, errOfferExpired)
loggedAssert(expiration - Global.latestTimestamp <= MaxOfferDuration, errOfferTooLong)
```

**2. Terms commitment.** New private helper. It covers the immutable fields only, not `state`, `escrowed` or `acceptances`.

```ts
private terms(id: uint64): bytes<32> {
  const offer = clone(this.offers(id).value)
  return sha256(Bytes`${itob(id)}${offer.root}${itob(offer.leaves)}${offer.participantsRoot}${itob(offer.participantsLeaves)}${itob(offer.expiration)}`)
}
```

**3. `accept` takes the terms (decision D1, option A).**

```ts
accept(mbrPayment: gtxn.PaymentTxn, id: uint64, proof: Proof, terms: bytes<32>) {
  loggedAssert(this.offers(id).exists, errOfferNotFound)
  loggedAssert(terms === this.terms(id), errTermsMismatch)
  // ... unchanged body ...
}
```

The offeror commits implicitly by calling `offer`. Each counterparty's client computes the terms
from the full leaf list (root recomputed, `leaves = list.length`, no duplicates) and the
participant list. A client therefore cannot accept an understated count without noticing. Below
the participant threshold the offer never reaches ESCROWING, so an understated offer never
reaches DISBURSING.

**4. Permissionless disbursal.** The body moves into a private method. The legacy selector is kept
so the deployed plugin's `disburse` still works.

```ts
/** Legacy selector (plugin compatibility): releases the caller's own leaf. */
disburse(id: uint64, receiverWallet: uint64, receiver: Account, asset: uint64, amount: uint64) {
  this.release(id, Txn.sender, receiverWallet, receiver, asset, amount)
}

/** Anyone may release any escrowed leaf once every agreed leaf is funded. */
disburseFrom(id: uint64, from: Account, receiverWallet: uint64, receiver: Account, asset: uint64, amount: uint64) {
  this.release(id, from, receiverWallet, receiver, asset, amount)
}

private release(id: uint64, from: Account, receiverWallet: uint64, receiver: Account, asset: uint64, amount: uint64): void {
  loggedAssert(this.offers(id).exists, errOfferNotFound)
  const { state, escrowed } = this.offers(id).value
  loggedAssert(state === STATE_DISBURSING, errInvalidState)
  const hash = sha256(sha256(Bytes`${from.bytes}${receiver.bytes}${itob(asset)}${itob(amount)}`))
  // ... existing body from :366 onward, unchanged (payor refund, ARC-58 opt-in path, escrowed--) ...
}
```

The hash box's existence proves the leaf was verified at escrow time and identifies its funder, so
no proof is needed. Refunds still go to the stored `payor`.

**5. `cancel`: no cancel after any disbursal.** No new state is needed. In DISBURSING, `escrowed`
starts equal to `leaves` and only `release` decrements it, so `escrowed === leaves` exactly when
nothing has been disbursed. HS-04 changes the same function, and the sketch includes that change.

```ts
cancel(id: uint64, proof: Proof) { // proof kept for ABI compatibility; membership was proven at accept
  loggedAssert(this.offers(id).exists, errOfferNotFound)
  const { state, escrowed, leaves, expiration } = this.offers(id).value
  loggedAssert(
    state === STATE_OFFERED || state === STATE_ESCROWING ||
    (state === STATE_DISBURSING && escrowed === leaves && expiration <= Global.latestTimestamp),
    errInvalidState
  )
  loggedAssert(this.participants({ id, address: Txn.sender }).exists, errNotAccepted)
  if (escrowed === 0) {
    this.offers(id).value.state = STATE_CANCEL_COMPLETED
  } else {
    this.offers(id).value.state = STATE_CANCELLED
  }
}
```

**Residual stuck-leaf risk.** After a partial disbursal there is no cancel. A leaf that cannot be
delivered stays escrowed until its receiver acts:

- ASA receiver not opted in and without an ARC-58 wallet: the receiver opts in.
- ALGO amount below the receiver's minimum balance: the receiver funds the account.
- Frozen asset: the issuer has to unfreeze it.

After that, anyone can retry. Clients should disburse all leaves in **one atomic group**
(`disburseAll`, up to 16 leaves per group) so an undeliverable leaf reverts the whole group, and
cancel stays available. Adding an ARC-59 inbox fallback is decision D3.

### ABI / state changes
- `accept(pay,uint64,byte[32][])void` becomes `accept(pay,uint64,byte[32][],byte[32])void`. The selector changes, so the old plugin's `accept` fails closed.
- New `disburseFrom(uint64,address,uint64,address,uint64,uint64)void`. `disburse` keeps its signature.
- Optional new readonly `offerTerms(uint64)byte[32]` for clients. Not required, because the SDK can hash locally.
- No box-layout or global-schema change. `mbr()` is unchanged, so the old plugin's `offer` and `escrow` keep working.

### Plugin / SDK call sites
- `arc58/plugins/hyper-swap/contract.algo.ts` `accept`: add `terms: bytes<32>` and pass it through. **The plugin is not upgradeable**, so this means a new HyperSwapPlugin app, a DAO plugin-list update (`hyperSwap` plugin entry, via a DAO proposal) and wallet re-installs. Under D1 option B (below) there is no plugin change.
- `hyper-swap/index.ts`: `accept` gains `terms`. Add `disburseFrom` and `disburseAll` (atomic group). Add `computeOfferTerms(id, offer)` and a `validateOffer(leafList, participantList, offer)` helper that recomputes both roots, checks the counts, rejects duplicate leaves, and checks expiration.
- `hyper-swap/types.ts`: update the `ContractArgs` keys. Add the new error codes to `hyper-swap/errors.ts`.
- `wallet/plugins/hyper-swap.ts:19`: the `AcceptArgs` type references the signature string `accept(uint64,bool,uint64,byte[32][])void`; add the `byte[32]` argument.
- Regenerate `generated/HyperSwapClient.ts` and `generated/HyperSwapPluginClient.ts`.

### Regression tests
`hyper-swap/hyper-swap.e2e.spec.ts`:
1. **Third-party completion.** A↔B both escrow. An unrelated account C calls `disburseFrom` for both leaves. Assert the assets are delivered, the state is COMPLETED, the hash-box MBR goes back to each `payor`, and C receives nothing.
2. **No cancel after partial disbursal.** B disburses. Warp past expiry. A's `cancel` reverts with `errIste`. C disburses A's leaf and the state is COMPLETED. A can never withdraw.
3. **Cancel when nothing was disbursed.** DISBURSING with zero disbursals, past expiry: `cancel` succeeds and both parties withdraw. A later `disburseFrom` reverts with `errIste`.
4. **Understated `leaves`.** The offer declares `leaves=1` with a two-leaf tree. B's `accept` with terms computed from the real list reverts with `errTmis`. B's `escrow` without accepting reverts with `errNprt`.
5. **Expiration cap.** `expiration = now + MaxOfferDuration + 1` reverts with `errOtlg`. Exactly the cap succeeds.
6. **Legacy `disburse` selector.** The funder still releases its own leaf (plugin path).

`arc58/plugins/hyper-swap/hyper-swap.e2e.spec.ts`: wallet accept with terms, then escrow, then a third party disburses all leaves.

---

## HS-03: bind escrow principal to the participant. Low. Size: S

`hyper-swap/contract.algo.ts`, in `escrow` after `:254` and in `escrowAsa` after `:332`:

```ts
// escrow (ALGO): principal + hash MBR arrive in one payment
loggedAssert(payment.sender === Txn.sender && payment.closeRemainderTo === Global.zeroAddress, errInvalidPayment)

// escrowAsa
loggedAssert(
  assetXfer.sender === Txn.sender &&
  assetXfer.assetSender === Global.zeroAddress &&   // reject clawback-source principal
  assetXfer.assetCloseTo === Global.zeroAddress,
  errInvalidTransfer
)
```

- The `mbrPayment` sender stays unbound: sponsorship is allowed, and the payor is persisted and refunded.
- No ABI change. Plugin-compatible, because the plugin sends from the spending account, which is `Txn.sender`. No SDK change; the SDK already sends from the participant.

**Tests** (`hyper-swap/hyper-swap.e2e.spec.ts`): each of these must revert.
- `escrowAsa` where the asset transfer is signed by a different account.
- `escrowAsa` using a clawback transfer (asset created with clawback set to the participant, pulling from a third holder).
- `escrowAsa` with `assetCloseTo` set.
- `escrow` where the ALGO payment comes from another account.
- `escrow` with `closeRemainderTo` set.

---

## HS-04: stop fund recovery depending on the current registry. Low. Size: S (minimal) / M (full)

**Minimal (recommended now).** Remove the Meta proof checks from `cancel` (`:473-484`, shown in the
HS-01 sketch) and `withdraw` (`:516-528`). Both are already authenticated by state:
- A participant box exists only after a verified `accept`, or for the offeror.
- A hash box exists only after a verified escrow, and its key includes the funder.

Keep the `proof` parameters, unused, so the ABI and plugin stay compatible. Side effect: the
offeror can now cancel even if it is missing from its own participant tree, which is fine.

**Remaining risk.** `cleanupOffer` (`:623-625`) still deletes roots in the *current* registry.

- Runbook rule: the DAO must not repoint `metaMerkles` while HyperSwap boxes with prefix `o` exist. Add a check to the DAO app-list update script.
- **Full fix (decision D4)**, which pins the registry per offer, costs one box and changes `mbr().offers`. That breaks the old plugin's locally compiled `mbr()`, so do it only if the plugin is redeployed for D1-A:
  - Add `offerRegistry = BoxMap<uint64, uint64>({ keyPrefix: 'r' })`. MBR = 2,500 + 400 × (9 + 8) = 9,300; add it to `OffersMBR`.
  - Write it in `offer`.
  - Read it in `accept`, `escrow`, `escrowAsa` and `cleanupOffer`.

**Test** (`hyper-swap/hyper-swap.e2e.spec.ts`): escrow, then repoint the DAO app list's
`metaMerkles` to a fresh Meta. `cancel` and `withdraw` (with an empty proof) must still succeed.
Also test that `withdraw` with an empty proof succeeds under normal conditions.

---

## PL-01: close the Poll account and refund only what is released. Medium. Size: S

**`poll/contract.algo.ts` `deleteApplication`.** Follows the Listing precedent. Poll never opts into assets, and `boxCount === 0` is already asserted.

```ts
@abimethod({ allowActions: 'DeleteApplication' })
deleteApplication(): void {
  loggedAssert(Txn.sender === Global.creatorAddress, errMustBeCalledFromFactory)
  loggedAssert(Global.latestTimestamp > this.endTime.value, errPollActive)
  loggedAssert(this.boxCount.value === 0, errStillHasVoteBoxes)
  itxn.payment({ closeRemainderTo: Global.creatorAddress }).submit()
}
```

**`poll/factory.algo.ts` `deletePoll`.** Handles both legacy children (no close-out) and new ones.

```ts
deletePoll(appId: Application): void {
  loggedAssert(appId.creator === Global.currentApplicationAddress, errNotAPoll)
  const [funderBytes] = op.AppGlobal.getExBytes(appId, Bytes(GlobalStateKeyFunder))
  const { account: receiver, amount } = decodeArc4<FunderInfo>(funderBytes)
  const before = Global.currentApplicationAddress.balance
  compileArc4(Poll).call.deleteApplication({ appId })
  // New children close their whole balance back; legacy children strand their min balance.
  const returned: uint64 = Global.currentApplicationAddress.balance - before
  const refund: uint64 = returned > 0 ? amount - Global.minBalance + returned : amount
  itxn.payment({ amount: refund, receiver }).submit()
}
```

- During the call, the factory's balance moves only through inner transactions, because inner fees are 0 and the MBR release does not change the balance.
- New polls are balance-neutral for the factory. Any ALGO donated to a poll goes to its funder.
- Legacy polls keep the full refund, so the factory absorbs 0.1 ALGO per *existing* poll. That cost is bounded and one-time, and new polls cannot be created with the old child. See decision D5.

**ABI / state.** None. The schema is unchanged. The factory approval is 3,706 B now; re-check it against the live app's pages after the change with `scripts/report-bytecode-sizes.ts`. No SDK change beyond regenerated `PollClient` and `PollFactoryClient`.

**Deployment.** One PollFactory `update` through the DAO (`scripts/update-poll.ts`) ships PL-01, PL-02 and PL-04 together. Before upgrading, read the factory's balance against its min balance (read-only). If griefing has already drained it, top it up so legacy refunds succeed.

**Test** (`poll/poll.e2e.spec.ts`, plus the plugin spec):
- Run 3 create → end → `deletePoll` cycles, with and without votes.
- After each cycle, assert the factory's spendable balance is unchanged, the deleted poll's account balance is 0, and the funder got exactly the creation payment back.
- Repeat with 1 ALGO donated to the poll before deletion: the funder receives payment + 1 ALGO.

---

## PL-02: exact Poll type enum. Low. Size: S

`poll/contract.algo.ts:163`:

```ts
loggedAssert(
  type === SingleChoice || type === MultipleChoice || type === SingleChoiceImpact || type === MultipleChoiceImpact,
  errInvalidPollType
)
```

No ABI change. Ships in the PL-01 factory update.

**Test** (`poll/poll.e2e.spec.ts`): types 0, 15, 25 and 39 revert with `errIpty`. Type 40 (MultipleChoiceImpact) creates a poll, and a multi-select vote adds impact weight to each chosen option.

---

## PL-04: bind the vote MBR to the voter. Low. Size: S

`poll/contract.algo.ts` in `gatedVote` (`:236`) and `vote` (`:247`):

```ts
loggedAssert(mbrPayment.sender === Txn.sender, errInvalidPayment)
```

Binding the sender is better than storing the payer. Storing the payer would grow the vote box
(MBR 15,300 → 28,100) and break the deployed Poll plugin, which has `votesMBR` compiled in. The
plugin already pays from the spending account, which is `Txn.sender`. The SDK's `poll/index.ts`
vote helper must build the payment from the voter; check that it does.

**Test** (`poll/poll.e2e.spec.ts`): a vote whose MBR payment comes from another account reverts with `errIpay`.

---

## PL-03: recyclable impact weight. Low. Size: S (document) / L (fix)

**Recommendation: won't fix on-chain now; document it.** Polls are advisory and move no funds. A
real fix belongs to the Social family:
- Add an Impact method that leaves out transferable components (held AKTA) and resolves an ARC-58 escrow to its wallet.
- Have `Poll.createVote` call it.

That changes Social Impact's ABI and needs a Poll child update. Revisit if poll results ever drive
on-chain decisions (decision D6).

---

## Info items

| Item | Proposal |
|------|----------|
| Poll plugin passes the controlled address (`origin`) as the gate subject (`arc58/plugins/poll/contract.algo.ts:116`), but Poll checks the spending account (`Txn.sender`) | **Fix when the plugin is next redeployed** (S code, but needs a redeploy). Pass `sender` instead of `origin`. The vote box is keyed by `Txn.sender`, so that is the subject being gated. Test: a gated vote from an escrow-scoped grant succeeds. |
| Offeror auto-accepted without a proof | **Won't fix.** The offeror is the author. HS-04's minimal change lets the offeror cancel anyway. |
| Duplicate trade leaves | **SDK-only fix (S).** `validateOffer` / the tree builder rejects duplicate leaves. Part of HS-02. |
| Poll results erasable after end | **Won't fix.** By design: refunds are correct and results remain in the indexer. |
| HyperSwap MBR quotes are constants | **Won't fix.** Fails closed. Correct the "queries actual root cost" wording in the docs. |
| MetaPlugin delegates can lock deposits / call `addType` | **Won't fix.** Requires an admin-configured unrestricted or namespace policy, and deposits refund to the wallet. Mention it in the MetaPlugin docs. |

---

## Decisions needed from Kyle

**D1. How participants commit to the HyperSwap terms (HS-02).**
- **A. New `accept` argument (recommended).** A clean, explicit ABI. Costs a HyperSwapPlugin redeploy, a DAO plugin-list update and wallet re-installs.
- **B. Terms as the last element of `proof`.** `accept` checks `proof[proof.length-1] === terms` and verifies `proof.slice(0, proof.length - 1)` (`Array.slice`, arrays.d.ts:50). No ABI or plugin change, but the meaning of an existing argument is overloaded.
- **C. SDK-only validation.** No contract change. **Not sufficient** once disbursal is permissionless, because any non-SDK client becomes a theft vector.

Recommendation: A if the HyperSwap plugin has few or no installs (check the DAO plugin list and installs); otherwise B.

**D2. Expiration cap.** Recommend 30 days (`2_592_000` seconds). Seven days reduces how long a funder can be locked but limits slow multi-party deals.

**D3. Who may disburse.**
- **(a) Anyone (recommended).** Lets keepers and the SDK's `disburseAll` complete swaps.
- **(b) Any accepted participant.** Equally safe, but nobody else can trigger a receiver wallet's opt-in plugin.
- Requiring all funders to sign one group cannot be enforced on-chain without a per-group leaf check.

Also: add an ARC-59 inbox fallback for undeliverable ASA leaves? Recommend **not now**. It needs more MBR than is escrowed and adds code to an app with limited page headroom. The receiver can unblock delivery by opting in.

**D4. Full per-offer registry pinning for HS-04.** Recommend doing it only alongside D1-A, since the plugin is redeployed anyway; otherwise rely on the minimal fix plus the runbook rule.

**D5. Legacy poll refunds.** The factory absorbs the stranded 0.1 ALGO for polls that already exist (recommended; bounded), or legacy funders get `amount - 0.1 ALGO`.

**D6. Impact polls (PL-03).** Document the limitation (recommended), or schedule the Social Impact change.

## Dependencies

- **HS-01 and HS-02** must ship together, in one HyperSwap update, with the D1-A plugin redeploy if A is chosen.
- **HS-04** edits the same `cancel` as HS-01; implement them together. The full HS-04 depends on D1-A.
- **Pre-upgrade check:** in-flight offers on 3569558555 must be zero or drained first (legacy box layout and root names, see the deployment section). This also gates the cross-family **Meta migration**: do not repoint the DAO's `metaMerkles` from MetaMerkles to Meta while offers exist.
- **Program size:** HyperSwap and PollFactory updates must fit the live apps' `extraProgramPages`. Verify on-chain.
- **One PollFactory update** carries PL-01, PL-02 and PL-04. Existing polls keep the old behavior; only new polls get the fixes.
- **PL-01 overlaps other families.** Re-check Raffle and Auction factory funder accounting against the same "forwarded child min-balance" pattern. `raffle/factory.algo.ts:291-303` and `auction/factory.algo.ts:323-353` use the same refund shape; their reviewers should confirm whether those children close out.
- **PL-03 fix** depends on the Social Impact family.
- **Plugin redeploys** (HyperSwapPlugin for D1-A, PollPluginContract for the gate-subject item) are DAO-governance actions through the plugin-list update, and need SDK `wallet/plugins/*` updates and regenerated clients.
- **Validation:** after implementation, run the full `npm test`. These touch e2e specs on LocalNet; per the project memory, the SDK dist needs a rebuild before tests and the full suite needs the VibeKit indexer.
