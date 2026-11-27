# Meta records and wallet namespace policies

Meta stores opaque values at **(owner address, key bytes)**. Only the transaction
sender can write that owner's records. Keys contain 1–31 bytes; values can use
the remaining space in one app call's 16,384-byte argument budget, up to 16,361
data bytes. Reads are public. Meta has no namespace or delegated-caller policy.

MetaPlugin supplies the namespace convention and permissions for ARC-58 wallets.
One immutable plugin instance can serve many wallets and callers. Its policies
are ordinary records in Meta, owned by the plugin application itself.

## Shared values and Merkle proofs

Arbitrary values and Merkle-attached metadata use the same `records` boxes,
revision sequence and refunds. `metadataDataKey(name, key)`
encodes `nameByteLength[1] || UTF8(name) || UTF8(key)`, used by the Merkle
compatibility methods and the plugin's namespace adapter. The two strings share
a 30-byte budget after the length byte; plain record keys have the full 31 bytes. Thus these operations access the same value:

```ts
const key = metadataDataKey('collection', 'royalty');
await meta.setRecord({ key, data: new TextEncoder().encode('5'), expectedRevision: 0n });
// After a root named "collection" exists:
await meta.read({ address: owner, name: 'collection', key: 'royalty' });
```

`addData` requires an existing root and publishes to that same key. It retains its
legacy full-deposit payment quote and refunds the replaced record's deposit.
`setRecord` requires an exact revision and charges only positive storage growth.
Either API advances the same revision, invalidating stale writes.
`deleteData` and `removeRecord` both remove the shared value.

Merkle roots and their schema type live together in the `roots` index. The
legacy `read(..., 'l.type')` result is derived from that index. Reserved `l.` keys
remain unavailable through `addData`/`deleteData`; generic records cannot change
a root's type. Deleting a root leaves attached values accessible through generic
record reads and owner-deletable through either record/data API.

The existing `SchemaPart` declarations drive ARC-4 tuple encoding. For example,
`[SchemaPart.String, SchemaPart.Uint64]` becomes `(string,uint64)` through
`schemaToAbiType(schema)`, and `encodeLeaf(values, schema)` encodes the whole tuple
with the Algorand SDK. Strings include their byte lengths and tuple offsets;
fixed byte arrays use canonical declarations such as `byte[32]`. New type
registrations store this same tuple declaration and reject unknown schema parts.

Leaves remain `SHA256(SHA256(encodedTuple))`, with sorted SHA256 internal pairs.
Valid fixed-width leaves retain their previous bytes, roots and proofs. String
leaves change encoding and require rebuilding the root. Existing registered types
and roots are not migrated automatically. The frozen `@akta/sdk/meta-merkles`
entry point retains the previous encoder for legacy roots; its unframed strings
remain ambiguous and should not be used to create new structured claims.

Tree dumps identify the encoding: `arc4-v1` for `meta`, `standard-v1` for the
legacy entry point. `MerkleTree.load` checks the format, schema and rebuilt hashes,
rejecting a dump from the other encoding instead of silently changing its root.

Schema IDs and proof method signatures remain available.
Type 0 in a verification call skips the type check.
`verifiedRead` proves leaf membership before reading the associated value; it
does not prove that the current value was committed into the tree. Root names
fit 31 bytes; compatibility data keys fit 15 bytes, name plus key fit 30 bytes,
and compatibility string values fit 1,024 bytes.

## Generic records

```ts
import { MetaSDK, ACCOUNT_IMAGE_RECORD, encodeAccountImageReference } from '@akta/sdk/meta';

const written = await meta.setRecord({
  ...ACCOUNT_IMAGE_RECORD,
  data: encodeAccountImageReference({ version: 1, source: { type: 'uri', uri: 'ipfs://example' } }),
  expectedRevision: 0n,
});
const value = await meta.readRecord(owner, ACCOUNT_IMAGE_RECORD.key);
await meta.removeRecord({ key: ACCOUNT_IMAGE_RECORD.key, expectedRevision: value.revision });
```

SDK keys accept `Uint8Array` or a string encoded as UTF-8. The contract accepts
bytes. It does not interpret separators, normalize Unicode, or expand wildcards.
Zero is the revision of an absent record. Each record starts at revision 1 and
increments on replacement. Deletion ends that record's lifetime.

`MetaSDK.setRecord` publishes the complete value in one app call, preceded by
its storage payment. The SDK splits its one `Uint8Array` into four ABI arguments
in that call. Each encoded argument fits the AVM's 4,096-byte value limit;
together, all arguments fit AVM 13's 16,384-byte aggregate limit.
Native `bytes.length` excludes the two-byte ABI length prefix. The first three
parts allow 4,094 payload bytes each; the final part allows 4,084, reserving
12 bytes for the typed record header. The contract initializes that object with
the final part and prepends the earlier parts inside the same call.

`metadataValueLimit(key)` gives the direct write's data allowance:
`16,362 − keyByteLength`, or 16,331–16,361 bytes. The remaining bytes hold the
method selector, key, revision, and four array-length prefixes. Wallet plugin
calls have additional arguments, so use `metadataPluginValueLimit(namespace, key)`
for their allowance. Both write paths validate their budget before submission.
Raw generated-client users can split data with `metadataDataParts` after checking
the appropriate allowance.

A rejected call rolls back storage and its grouped payment. There are no chunk
carriers, upload lifecycle methods, temporary boxes, or temporary deposits.

After an uncertain response, read the record and revision before retrying.
Deleting a record removes all its storage. There is no retained draft that can
later commit after deletion (ALG-01); intentionally recreating the key is valid.

## Account preferences

`@akta/sdk/meta` defines the records Akita clients publish so an account's
settings follow it to every device and other clients can read them. Each is a
versioned JSON record owned by the account that wrote it; through the Meta
plugin that is the wallet's controlled address. All of them live in the
`akita.prefs` namespace, so one key-restricted grant (`AKITA_PREFERENCES_SCOPE`)
can write every preference and nothing else. Akita gives that grant to the
wallet's hot key, so a settings change needs no passkey approval.

| Record | Field | Value |
|--------|-------|-------|
| `APP_THEME_RECORD` | `theme` | `AppThemeV1`: `{ version: 1, scheme: "light" \| "dark" \| "system", accent }` |
| `ACCOUNT_GROUPS_RECORD` | `groups` | `AccountGroupsV1`: `{ version: 1, order, groups: [{ id, label, icon, color, accountIds }] }` |
| `RECEIVE_QR_STYLE_RECORD` | `qr` | `ReceiveQrStyleV1`, the wallet's receive QR style |
| `RECEIVE_QR_ACCOUNTS_RECORD` | `qr-accounts` | `ReceiveQrAccountStylesV1`: `{ version: 1, accounts: { [address]: ReceiveQrStyleV1 } }` |

Account ids in groups are the client's own ids; Akita writes `escrow-<escrow name>`,
and `order` mixes them with `group:<group id>` entries. `resolveReceiveQrStyle`
picks an account's own QR style, else the wallet's.

```ts
import { APP_THEME_RECORD, encodeAppTheme, parseAppTheme, readMetaPreference } from '@akta/sdk/meta';

const theme = await readMetaPreference(meta, owner, APP_THEME_RECORD, parseAppTheme);
// theme.value is undefined when the record is absent or does not parse.
await wallet.usePlugin({
  calls: [metaPlugin.setPreference({
    record: APP_THEME_RECORD,
    data: encodeAppTheme({ version: 1, scheme: 'dark', accent: 'lime' }),
    expectedRevision: theme.revision,
  })],
});
```

Configure a delegated grant for them with
`metaPlugin.configureScope({ caller, scope: AKITA_PREFERENCES_SCOPE, expectedRevision: 0n })`
through the wallet's Meta admin grant, in the same group as the grant's install. These values are public.
Clients apply account groups and per-account QR styles only while the owner's
Akita membership is paid up, and premium theme accents under the same rule as
the viewer's own theme.

## Storage, discovery, and contract helpers

Each data record occupies exactly one box:

```
name  = m[1] || owner_address[32] || caller_key[1..31]
value = ARC-4 { revision: uint64, data: byte[] }
```

The owner is the full decoded address. No address truncation, hashing, or ABI
length prefix is applied to a plain key. This keeps even addresses that share
their first 31 bytes isolated. Merkle root names use `r[1] || owner[32] || name`
and hold `(root[32], type_uint64[8])`; schema definitions retain the `types` map.
The contract has only `types`, `roots`, and `records` maps.

`metadataBoxName` derives a record's physical name. `decodeMetadataBoxName`
recovers the complete owner and key. `MetaSDK.listRecordKeys({ account, keyPrefix })`
paginates record names, using the owner/key prefix for server-side filtering
when supplied. It does not fetch record values; the listing round is preserved
across pages. `readRecord` fetches the revision and value together in one box
read. The value uses standard `(uint64,byte[])` encoding, with 12 bytes of
overhead. The contract initializes the typed object, then fills larger payloads
in pieces inside the same call. On-chain complete reads are capped at 1,024
bytes; larger values use slice reads that check the expected revision. SDK reads
fetch the complete box directly.

Revisions are local to each record: creation starts at 1 and each replacement
increments that record's revision. Deletion returns revision 0 and removes the
entire record; recreating the same key starts at 1 again. There is no global
revision counter or retained deletion history. Expected revisions compare only
against the current record, not against a prior lifetime of the key.

Record MBR is `2500 + 400 * (33 + key.length + 12 + value.length)` microALGO.
`metadataStorageCost` calculates that deposit. Writes require an adjacent,
exact payment from the author with no close/rekey. Growth charges only the
increase; shrinks and deletions refund released storage. A maximum-sized direct
record with a 31-byte key contains 16,331 data bytes and costs 6,565,300 microALGO.
Application base minimum balances are funded separately.

AVM 13 contracts can use `readMetaRecord`, `readMetaRecordInfo`, and
`readMetaRecordSlice` from `smart_contracts/meta/functions.ts` for direct public
foreign-box reads. `callMetaReadRecord` supplies an ABI alternative.
`setMetaRecord` writes one native byte value; `setMetaRecordParts` accepts four
parts for larger values within Meta's call budget. `removeMetaRecord` deletes a
record. These helpers write the calling application's own records; the calling
application must authorize its own users. The same module retains
`verifyMetaProof` and `readVerifiedMetaData` for Merkle consumers. All helpers use
the shared key and revision formats. Meta enables public foreign-box reads at
creation and keeps foreign/family writes disabled.

## Per-wallet, per-caller policies

Deploy the plugin with only the registry ID. Install an admin grant for
configuration, and configure each delegated grant through an admin execution:

```ts
import { CallerType } from '@akta/sdk/wallet';
import { newMetaPlugin } from '@akta/sdk/wallet/plugins/meta';

const plugin = await newMetaPlugin({ algorand, sender, signer, registry: meta.appId });
await wallet.addPlugin({ client: plugin, callerType: CallerType.Admin });
await wallet.addPlugin({ client: plugin, callerType: CallerType.Other, caller: agentAddress });
await wallet.usePlugin({
  callerType: CallerType.Admin,
  calls: [plugin.configureScope({
    caller: agentAddress,
    escrow: '',
    scope: { type: 'namespace', namespace: 'agent.example' },
    expectedRevision: 0n,
  })],
});
```

The plugin hashes its ARC-4 `(uint64,address,string)` policy identity (wallet ID,
resolved caller, escrow) with SHA-256 and takes 31 bytes. This is the plugin's
choice for a composite key; Meta itself accepts the bytes unchanged. Use the zero address for a global grant. The policy
value is ARC-4 `(string,string[])` containing namespace and allowed keys.
`metaPluginPolicyKey` derives the key, while
`plugin.getScope({ wallet, caller, escrow })` returns the policy and revision.
Policies are stored under the plugin's address, so ordinary wallet record writes
cannot alter them.

An admin grant is unrestricted. A delegated grant with no policy is denied,
even when the transaction sender happens to be the administrator. Allowed scopes
are `unrestricted`, `namespace`, or selected `keys` within a namespace. Matching
is exact and case-sensitive. The SDK sorts selected keys by byte length and
byte value so the contract can validate uniqueness in one pass and authorize a key in at
most five comparisons. Selected-key grants cannot change roots; type
registration requires an unrestricted grant. Every publication checks the current policy. Wallet method restrictions and escrow allowances still apply.

Only a main-wallet admin execution can call `configureScope` or `clearScope`.
Both use optimistic revisions. Policy growth is funded by that wallet; shrink
and removal refunds return to it. `clearScope` immediately disables the delegated
grant without deleting its data. Policies persist until explicitly changed or
cleared, including across plugin removal/reinstallation. Different escrows and
wallets require their own policies; they can all use the same plugin app ID.

The plugin authenticates the wallet's active grant and its preceding rekey call.
The wallet's group validator binds each plugin call's first argument to that
wallet, preventing a caller from selecting a different wallet policy.

Use `plugin.setRecord({ wallet, execution, namespace, key, data, expectedRevision })`
for atomic publication. The `set` hook creates one plugin call in
`wallet.usePlugin` compositions. It forwards the complete value and storage
payment to Meta and restores wallet authority in that execution. Its data limit
is `16,351 − namespaceByteLength − keyByteLength`: 16,321–16,349 bytes for valid
names. `metadataPluginValueLimit(namespace, key)` calculates this using UTF-8
byte lengths. `remove` and root/data hooks remain available.

## Deployment and older registries

Meta is upgradeable through the existing Akita DAO update-plugin flow.
Creation takes `version` and `akitaDAO`; `update(newVersion)` requires both the
DAO wallet as sender and the DAO's configured update plugin as calling app.
Use `deploy:meta` for a new registry and `update:meta` for a DAO-approved upgrade.
MetaPlugin remains immutable. Older immutable Meta/MetaMerkles deployments
still require new application IDs; this change does not migrate their state or
deploy a production registry.
Use `MetaSDK` for the new Meta layout and the frozen `MetaMerklesSDK` for older
MetaMerkles deployments. Their proof/data ABI signatures remain compatible,
while physical root/value layouts differ. The DAO application-list field keeps
its existing `metaMerkles` wire name.

HyperSwap uses its offer ID directly in a nine-byte binary root name (`t` or `p`
plus uint64 ID). `hyperSwapRootBoxName` derives the new Meta box name without UTF-8
round-tripping. Pass `"MetaMerkles"` as the fourth argument for the frozen layout. The first 32 value bytes are the root in both registries; new Meta
appends the eight-byte type. HyperSwap and its plugin inherit the same local MBR
quote from `BaseHyperSwap`: 35,300 microALGO per root, including its type, and no
separate data deposit. The current contracts require Meta's storage layout;
they do not query root costs or support creating offers against frozen MetaMerkles.

Each offer pins the registry it was created against (a 9,300 microALGO `r` box,
included in `mbr().offers`). Proofs and root cleanup for that offer always use
the pinned registry, so repointing the DAO's `metaMerkles` field does not strand
open offers.

### HyperSwap offer terms and settlement

- The contract's `accept` takes a `terms` commitment:
  `sha256(id ‖ root ‖ leaves ‖ participantsRoot ‖ participantsLeaves ‖ expiration)`.
  Integers are uint64 big-endian.
- The SDK does not take `terms` from the caller. Both accept paths take the complete, ordered
  leaf and participant lists the offeror shares and derive the commitment from them:
  - `HyperSwapSDK.accept({ id, leaves, participants })` reads the offer, runs
    `validateOffer({ id, offer, leaves, participants })` and sends the result. The participant
    proof is derived from `participants` unless `proof` is passed.
  - `HyperSwapPluginSDK.accept({ id, proof, leaves, participants, expiration })` builds the
    commitment with `offerTermsFromLists` and reads nothing; the contract refuses the accept
    unless the offer on chain declares exactly those lists and that expiration.
- `validateOffer` rejects (and `offerTermsFromLists` produces terms that cannot match):
  - an offer that under-declares its leaves or participants;
  - an offer that repeats a leaf or participant;
  - an offer that lists a funder who is not a participant;
  - an offer whose roots do not match the lists.
- Never build `terms` from `offerTerms(id)`. A client that calls the generated contract client
  directly must do the same check itself.
- Offers may expire at most 30 days after creation (`HYPER_SWAP_MAX_OFFER_DURATION`).
- Once every leaf is escrowed, anyone can settle any leaf with `disburseFrom`. The legacy
  `disburse` still releases the caller's own leaf.
- `disburseAll` settles up to 16 leaves in one atomic group.
- A DISBURSING offer can be cancelled only after expiry and only while no leaf has been
  disbursed. A swap therefore either completes or unwinds entirely; a party cannot keep
  its own leaf after receiving the others'.
- Escrowed principal must be sent by the leaf's funder. Clawback, close-out and rekey
  transfers are rejected.
