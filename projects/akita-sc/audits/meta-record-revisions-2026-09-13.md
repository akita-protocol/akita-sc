# Meta per-record revisions and ARC-4 values

> Historical validation of the revision change. The subsequent single-call update
> caps new values at the AVM 13 app-call argument budget and adds DAO-authorized upgrades; see
> [current Meta documentation](../../akita-sdk/docs/meta.md).


Meta now stores `MetaRecordValue = { revision: uint64; data: bytes }` in its
existing records map. PuyaTs encodes this object as ARC-4 `(uint64,byte[])`, and
the generated application specification exposes both fields. The global
revision counter is removed. Every key starts at revision 1, replacements
increment only that key, and deletion removes the record and returns revision
0. Recreating the key starts at 1 again. Expected revisions describe the current
record lifetime; they do not distinguish prior lifetimes of a deleted key.

Writes assign the revision and data through the typed object. Revision reads use
the named field, which compiles to a partial box read without loading a large
data value. Inline reads decode the object in both Meta and the foreign-read
helper. The SDK uses the standard ARC-4 decoder for the full box response.

Large publication initializes the same object, resizes its box, writes the
dynamic byte-array length, and fills the data in the existing atomic group.
Only the data field's large representation needs explicit byte offsets; no
revision is written with a raw byte replacement. ARC-4 adds a two-byte offset
and two-byte array length, making total overhead 12 bytes and maximum payload
32,756 bytes. Deposit quotes, plugin policy refunds, SDK limits, and direct
foreign reads use the same layout. Full-size physical boxes remain 32,768 bytes.

Tests now cover independent key revisions, successive updates, stale updates
within a lifetime, deletion/recreation, and exact standard ARC-4 encodings for
inline and full-size records. Atomic write and consumer compatibility checks
remain in place. No maps or resumable upload state were added.

This supersedes the global revision and eight-byte record layout described in
[the prior address-key report](meta-address-keys-2026-09-12.md).

## Validation

- Meta, MetaPlugin, and MockMetaReader compile and client generation: passed.
- SDK build and final smart-contract TypeScript check: passed.
- Full SDK suite: 255 tests passed across 30 files.
- Full `npm test --workspace=projects/akita-sc`: 1,122 tests passed across 77
  files, with five existing TODOs and no failures (1,040.28 seconds). This
  includes all 117 Meta, plugin, audit, and consumer checks.
- Generated ARC-56 declares the two-field `MetaRecordValue` and no global
  revision state. Generated contract and SDK clients match.
- All 27 source, test, and artifact fingerprints match the versions used to
  start the full suite. Scoped diff and source whitespace checks passed.

Local logs: `/tmp/meta-arc4-build.log`, `/tmp/meta-arc4-sdk-build.log`,
`/tmp/meta-arc4-types.log`, `/tmp/meta-arc4-sdk-tests.log`, and
`/tmp/meta-arc4-full.log`.

Changes remain uncommitted on `main`. No public-network deployment was performed.
