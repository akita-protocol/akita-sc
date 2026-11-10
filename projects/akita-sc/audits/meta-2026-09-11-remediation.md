# Meta ALG-01 and ALG-03 remediation

> Historical validation of the earlier implementation. The [September 12 shared-record and wallet-policy redesign](meta-wallet-policies-2026-09-12.md) supersedes the storage-layout, scope, and replacement-fee descriptions below.

ALG-01 and ALG-03 from the [Meta audit](meta-2026-09-11.md) are fixed and verified in the local checkout. ALG-02 and the retained rooted-data fee behavior are unchanged.

## ALG-01: deletion invalidates drafts

`Meta.removeRecord` now deletes the same key's draft and upload-state box, if present, and includes the entire draft deposit in the refund to `Txn.sender`. It still validates the published record's revision before changing any storage. The refund uses one inner payment, including when both published storage and draft storage are released.

A draft begun against revision zero can no longer survive creation and deletion of a record: deletion removes that draft, and a subsequent commit fails with `ERR_UPLOAD_NOT_FOUND` (`MUNF`). Drafts associated with an existing record are removed as well. Ordinary inline replacement still leaves a stale draft that can be explicitly cancelled; its original revision prevents commitment. Other keys are unaffected. No tombstone, extra storage field, ABI signature change, or permanent deposit is needed.

## ALG-03: one atomic publication group

The problem was the SDK's sequence of separately submitted begin, append and commit groups. It was not a requirement that large values span separate atomic groups.

Both `MetaSDK.setRecord` and `MetaPluginSDK.setRecord` now compose all phases before submitting once. `appendRecord` accepts up to 4,094 payload bytes, so its ARC-4 `byte[]` argument fits the 4,096-byte AVM value limit. Protocol v42 allows the total application arguments to exceed the former 2,048-byte limit; see the [v5.0.0 consensus parameters](https://github.com/algorand/go-algorand/blob/v5.0.0-stable/config/consensus.go). A 32,768-byte record uses nine append calls. The direct group contains payment, begin, nine appends and commit; resource planning can add capacity within the 16-transaction group limit.

The wallet helper makes one `usePlugin` call and requests funds once. Begin and append retain plugin authority inside the group, commit restores wallet control, and the wallet verifier checks restoration. The existing immutable scopes and method grants apply to every method. No MetaPlugin contract change is needed; the registry's append limit and the SDK's composition change together.

A failed group leaves no new record, no draft and no reserved deposit; a replacement failure preserves the prior record. If the RPC response is lost after confirmation, the entire record is already published and the draft is gone. As with any transaction submission, response loss can leave the caller uncertain about confirmation: `readRecord` provides the current value and revision before an intentional retry. The SDK does not claim that every transport error means the write failed and does not send a compensating cancellation.

Low-level draft APIs remain available for callers who deliberately stage their own uploads and keep their upload IDs. Existing drafts are not globally swept. Group size or fee-cap failures are reported before submission; the SDK never silently falls back to separate publication groups. The existing temporary funding requirement remains: new storage is reserved alongside the old value, then the old allocation and excess header deposit are refunded at commit.

## Repository conventions

The follow-up cleanup removes `smart_contracts/meta/records.algo.ts`. Record constants and types now live in the existing `constants.ts` and `types.ts` modules. The registry's key and storage helpers are private methods grouped in its private-method section. That cleanup kept foreign-read helpers private to the mock consumer, and the plugin calculates upload storage through its own private helper. Public ABI methods, structs, storage layouts and lifecycle settings were unchanged for Meta, MetaPlugin and MockMetaReader by that cleanup.

Record, upload and scope checks now use named constants from Meta's `errors.ts`, with short alphanumeric codes and matching SDK translations. Existing Merkle codes are retained. Tests import error constants instead of repeating wire strings. The subsequent requested [consumer compatibility pass](meta-consumer-compatibility-2026-09-11.md) extracts reusable consumer reads and calls into ordinary `meta/functions.ts`, adds mock entry points for those calls, and updates the integration documentation; registry internals remain private.

## Validation

- Scoped `npm run build:meta`: passed; compiled Meta, MetaPlugin and MockMetaReader and regenerated the scoped clients/artifacts. Existing error-code style warnings remain.
- SDK full `npm test`: 26 files, 241 tests passed.
- Contract and SDK TypeScript checks: passed.
- All 87 Meta, MetaPlugin, record and audit checks passed in the full run. The initial focused cleanup run passed 86 and exposed one old `/META_/` matcher; that test now checks each malformed scope against its specific named error constant, and all cases passed in the full run.
- Full contract `npm test` after the source-layout cleanup: all 74 files and 1,053 tests passed, with 11 existing TODOs; duration 1,095.44 seconds. No failing tests remained.

The regressions cover absent/existing-record draft invalidation and full refunds; full-box creation/replacement; same-group confirmation; direct and wallet response loss; direct/wallet chunk rejection; wallet rekey-verifier rollback; and immediate writes after each error outcome. Unit tests verify one complete direct submission at 1,025, 4,094, 4,095 and 32,768 bytes and one wallet execution for a full box. ALG-02 retains its original reproduction because its encoding is outside the requested fixes.

The source-layout rerun uses `/tmp/akita-meta-style-build.log`, `/tmp/akita-meta-style-sc-types.log`, `/tmp/akita-meta-style-sdk-types.log`, `/tmp/akita-meta-style-focused.log`, `/tmp/akita-meta-style-sdk-tests.log` and `/tmp/akita-meta-style-full-tests.log`.

The preceding implementation validation logs are `/tmp/akita-meta-fixes-build.log`, `/tmp/akita-meta-fixes-sdk-types.log`, `/tmp/akita-meta-fixes-sc-types.log`, `/tmp/akita-meta-fixes-sdk-tests.log`, `/tmp/akita-meta-fixes-all-regressions.log` and `/tmp/akita-meta-fixes-full-tests.log`.

No TestNet or MainNet deployment was performed. The registry is immutable, so adopting the new append limit and deletion behavior requires a newly deployed registry; these changes do not patch an already deployed application. The SDK documentation describes the updated registry behavior. Unrelated dirty-checkout changes were preserved.
