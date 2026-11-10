# Meta direct address keys and atomic records

The revision policy and record value encoding below are historical. They are
superseded by [per-record revisions and ARC-4 values](meta-record-revisions-2026-09-13.md).

This replaces the hashed record names and resumable upload layout described in
[the earlier wallet-policy report](meta-wallet-policies-2026-09-12.md).

## Storage and ownership

A record name is `m || full decoded owner address[32] || key[1..31]`. Root names
use `r || owner[32] || UTF8(name)[1..31]`. The authenticated sender determines
the owner on writes; supplied owners are used only for reads. Full addresses
remain distinguishable even when their first 31 bytes match. Raw Ed25519 prefix
truncation is deliberately avoided: opposite curve points encode the same y
coordinate and differ in the final sign bit, allowing someone who knows a scalar
to sign for both related public keys. An offline check verified signatures for
such a pair with the Algorand SDK and Node crypto; it does not imply an attack
on an existing unknown signing secret.

Records hold `revision[8] || data[0..32760]`. Existence and size come from the box;
the complete owner and key come from its name. There are no record-state, upload,
or upload-state maps. Meta retains the types, roots, and records maps. Arbitrary
values and Merkle-attached values share the records map, revision checks and
refund logic. Root schema types remain in the typed root index.

The adapter convention for Merkle-attached values and wallet namespaces is
`nameByteLength[1] || name || key`; the two strings share 30 bytes. Plain record
keys retain all 31 bytes and can be UTF-8 or arbitrary bytes. The one-byte length
keeps boundaries unambiguous without requiring hashing or escaping.

## Atomic publication

Inline writes keep the existing ABI. Larger writes use nine read-only indexed
data-carrier calls, payment, and one `setRecordChunks` call. Data is written only
in the publication call, directly to the final box, after checking the expected
revision. Each carrier has the expected application, sender, selector, index,
completion action, rekey field and chunk length. Trailing carriers are empty.
Indexes keep repeated data and empty carriers distinct transaction identities.
An incomplete or malformed group rolls back all writes and deposits; isolated
carriers allocate no storage. There are no resumable draft APIs or draft deposits.

The plugin authenticates its wallet policy, validates its preceding carriers,
and relays them with payment/publication in one inner group. Publication restores
the wallet authority when requested, and the wallet verifier remains the final
authority-restoration check. Method restrictions, escrow allowances and namespace
policies apply to both small and large values.

A global monotonic revision remains in each record's eight-byte header. Stale
writes and stale slice reads fail, including after deletion/recreation. ALG-01's
persistent-draft path no longer exists; ALG-03 retains a single atomic submission
for both direct and wallet writes.

## SDK and consumers

`readRecord` reads revision and data atomically from one box response.
`listRecordKeys` uses box-name prefixes and decodes names without fetching values.
Direct on-chain helpers use the same physical layout. `hyperSwapRootBoxName`
defaults to the new Meta layout and accepts `MetaMerkles` explicitly for the
frozen layout. HyperSwap still names trees using the binary offer ID and queries
the registry's actual root cost; the legacy Merkle ABI remains available.

Only MetaPlugin hashes its longer composite policy identity (wallet, caller,
escrow) into a 31-byte key. Generic Meta never hashes a caller's key. Policies
remain plugin-owned and configurable only through the wallet's admin grant.

Record minimum balance is `2500 + 400 * (33 + key.length + 8 + data.length)`.
A full box with a 31-byte key costs 13,135,300 microALGO. Only positive storage
growth is charged; shrinking/deleting returns the released deposit. Root cost
is `31700 + 400 * name.length` using the UTF-8 byte length.

## Validation

- Meta, MetaPlugin, and MockMetaReader compile and generated clients: passed.
- SDK build and smart-contract workspace TypeScript check: passed.
- Full SDK suite: 255 tests passed across 30 files.
- Focused Meta, plugin, audit, and consumer suite: 117 tests passed across six
  files, including all 27 compatibility checks against Meta and frozen
  MetaMerkles.
- Full `npm test --workspace=projects/akita-sc`: 1,122 tests passed across 77
  files, with five existing TODOs and no failures (924.67 seconds).
- All 27 changed source/test fingerprints still match the files used to start
  the full suite. Scoped `git diff --check` and source whitespace checks passed.

Local logs are `/tmp/meta-address-build.log`, `/tmp/meta-address-sdk-build.log`,
`/tmp/meta-address-types.log`, `/tmp/meta-address-sdk-tests.log`,
`/tmp/meta-address-focused-2.log`, and `/tmp/meta-address-full.log`.

Changes remain uncommitted on `main`. No public-network deployment was performed.
