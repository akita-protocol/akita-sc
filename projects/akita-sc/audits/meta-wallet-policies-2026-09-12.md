# Meta shared records and wallet policies — September 12, 2026

> Historical storage-layout validation. The [direct address-key redesign](meta-address-keys-2026-09-12.md) supersedes its hashed keys, separate headers, and draft APIs.
Meta now provides generic owner/key records. Namespace interpretation and caller
restrictions belong to MetaPlugin. The plugin stores each policy in Meta under
its own application address, indexed by wallet ID, resolved caller, and escrow.
One plugin instance can enforce different policies across callers and wallets.

## Authorization

The plugin checks the wallet's active `PluginKey`, spending-account authority,
and preceding `arc58_rekeyToPlugin` call. The wallet's existing group validator
binds every plugin call's first argument to the wallet that granted authority.
A caller cannot supply another wallet ID to select its policy.

Admin grants are unrestricted. Delegated grants require a policy; missing or
cleared policies deny access. Configuration and clearing require a main-wallet
admin execution and the current policy revision. Global grants use the zero
address as their caller key. Policies survive grant removal/reinstallation until
explicitly cleared. Wallet method permissions and escrow allowances still apply.

Policies support an unrestricted grant, an exact namespace, or selected keys in
one namespace. Key lists use canonical byte-length/byte order, making uniqueness
validation linear and key authorization a binary search of at most five comparisons. Key grants cannot mutate roots. Type registration requires an
unrestricted grant. Every staged upload operation checks the current policy.

## Shared storage and preserved behavior

- `setRecord` and Merkle `addData` update the same value and revision when given
  the canonical ARC-4 `(name,key)` record key. `read`, `verifiedRead`, direct
  foreign-box utilities, and generic reads see that same value.
- `deleteData` and `removeRecord` remove the shared value and any same-key draft.
  The ALG-01 create/delete/upload regression remains covered.
- Values still occupy a full 32,768-byte raw box. Both SDKs publish full values in
  one atomic transaction group, preserving ALG-03 fixes and response-loss handling.
- The root and type share one `roots` index entry. Legacy `l.type` reads derive
  the type from this entry. Generic record writes cannot change this type.
- Root deletion leaves attached values available. Proof algorithms, schema IDs,
  legacy method signatures and reserved compatibility keys remain unchanged.
- Legacy `addData` retains its full payment quote but refunds the replaced
  deposit. This resolves the old OBS-01 surplus as part of using shared storage.

Record box names contain SHA-256 of the full owner address and opaque key. The
header preserves the original owner and key for discovery. Generic keys support
1–128 bytes without a namespace dimension. Published and upload headers require
52 and 92 fixed bytes respectively, plus the key bytes. Refund amounts are read
before deleting their source headers.

The new physical layout requires new Meta and MetaPlugin deployments. Frozen
MetaMerkles deployments and their SDK are retained. The DAO's `metaMerkles`
application-list field retains its wire name. No public-network deployment or
migration was performed.

## Consumers

HyperSwap and HyperSwapPlugin quote the configured registry's root storage cost.
The direct binary offer-ID root names are preserved. A new Meta offer reserves
178,900 microALGO; a frozen MetaMerkles offer reserves 215,900. Both fully refund
storage after the existing participant/offer cleanup sequence.

Consumer tests run against both registries: repeated-root HyperSwap offers at
uint64 boundary IDs, ASA escrow and opt-in, cancellation and refunds, address and
asset gates, and the shared royalty reader used by auctions, raffles and the
marketplace. The full suite also covers staking-pool consumers and the existing
contracts' transaction flows.

## Validation

- `npm run build:meta`: passed; regenerated Meta, MetaPlugin and MockMetaReader artifacts/clients.
- `npm run build:hyper-swap`: passed; regenerated HyperSwap, its plugin and the test-only cursor mock.
- SDK `npm run build`: passed, including generated clients and declarations.
- Contract `npm run check-types`: passed.
- Full SDK `npm test`: 30 files, 255 tests passed.
- Full contract `npm test`: 77 files, 1,122 tests passed; 5 existing social TODOs; 962.58 seconds. No failures.
- The full run includes all 19 policy tests, including one plugin used by different callers/wallets, policy replacement and clearing, missing-policy denial, raw authorization boundaries, and a full 32 KiB atomic publication with the maximum 24-key allowlist.
- The generic-record suite also publishes a full 32 KiB value with a maximum-length 128-byte binary key and verifies exact deposits and refunds.

Final logs: `/tmp/meta-redesign-full-final.log`, `/tmp/meta-redesign-sdk-final.log`,
`/tmp/meta-redesign-types-final.log`, `/tmp/meta-redesign-build.log`,
`/tmp/meta-redesign-hs-build.log`, and `/tmp/meta-redesign-sdk-build.log`.
The 31 reviewed source/test fingerprints are recorded in
`/tmp/meta-redesign-source-hashes.json` and were unchanged after validation.
