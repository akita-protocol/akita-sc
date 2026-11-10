# Meta consumer compatibility

> Historical validation of the earlier implementation. The [September 12 shared-record and wallet-policy redesign](meta-wallet-policies-2026-09-12.md) supersedes the storage-layout, scope, and replacement-fee descriptions below.

The new Meta registry retains every legacy MetaMerkles ABI signature and the
`t`, `r`, and `d` box-map layouts. The DAO field remains `metaMerkles`; renaming
that field would change the app-list interface. Existing records remain in the
application where they were written: changing the DAO registry ID does not migrate
storage.

## Consumer checks

| Consumer | Dependency | Result |
| --- | --- | --- |
| StakingPool / factory / plugin | `RootKey`, `verify`, collection type 1; double SHA-256 of uint64 asset ID | A real pool accepts an allowed asset and rejects a mismatched proof against Meta. |
| MerkleAssetGate | `verify`, collection type 1; double SHA-256 of uint64 asset ID | Valid and invalid proof paths pass against both Meta and frozen MetaMerkles. |
| MerkleAddressGate | `verify`, unspecified type; double SHA-256 of address bytes | Member and mismatched-caller paths pass against both registries. |
| AuctionFactory, RaffleFactory, Marketplace | Shared `royalties()` helper using `verifiedRead`, collection type 1 | The actual shared helper is compiled into a consumer and tested against both registries, returning the stored royalty or zero on invalid proof. Full sale/distribution paths are covered by the existing full suite, rather than new royalty-specific end-to-end sale tests. |
| HyperSwap / plugin | `addRoot`, `verify`, `deleteRoot`; fixed-length names derived from offer ID | Repaired; complete/cancelled trades, ASA transfers, repeated roots, and cleanup are tested against both registries. Wallet plugin executions exercise ALGO, ASA, cancellation and rekey restoration against Meta. |

These consumers hash fixed-width leaves; none uses the dynamic multi-string codec
in ALG-02. That separate finding remains open.

## HyperSwap functionality restored

The first compatibility check found that `HyperSwap.offer` passed each raw
32-byte root as its name. Both old MetaMerkles and Meta rejected that name. This
is now repaired: private `rootName()` produces a fixed 9-byte binary name, `t` or
`p` followed by the eight-byte big-endian offer ID. Every creation,
verification and cleanup path uses the same names. Two simultaneous offers can
reuse identical roots without sharing storage.

The private method concatenates the tag with `itob(id)`, without a loop, hash,
text conversion or additional stored salt. The application's address already
namespaces Meta roots. These internal names are opaque bytes carried by the
legacy string ABI, not UTF-8 text. SDK helpers `hyperSwapRootName` and
`hyperSwapRootBoxName` preserve those bytes for direct box reads, using the
[identical string/byte[] wire encoding](https://dev.algorand.co/arc-standards/arc-0004/#encoding-rules).
Do not pass these names through a text decoder or the text-only `MetaSDK.getRoot`.
Full swap lifecycles exercise the 127/128 byte boundary, the high uint64 bit and
IDs near the uint64 maximum against both registries. A LocalNet-only subclass
seeds the offer cursor for these tests; the production ABI stays unchanged.
The compiler inlines the helper into `itob`/`concat` operations and stack access;
approval bytecode is 3,767 bytes, down from 3,884 with the original decimal loop.

Public method signatures and the existing `OfferValue` layout are preserved.
An additional `f` box stores each offer's original payor and refundable deposit.
Participant records now hold only participant MBR. Once all participants are
cleaned, `cleanupOffer` deletes both Meta roots, deletes the offer and refund box,
and refunds the original offer/root deposit. This avoids refunding money while
its boxes still require minimum balance, and avoids leaving roots behind.

The `mbr()` structure is unchanged. Its `offers` quote includes both the offer
and refund box:

| Allocation | microALGO |
| --- | ---: |
| Offer box | 48,100 |
| Offer refund box | 22,100 |
| Participant box | 34,900 |
| Each Meta root | 33,700 |
| Each root's type record | 21,700 |
| Total initial offer deposit | 215,900 |

A single-participant offer starts in the escrowing state, since its creator has
already accepted. Expired offers with escrowed assets cannot be cleaned until
cancellation and withdrawal finish; tests prove partial escrow remains recoverable.

The SDK now groups HyperSwap's ASA opt-in before the outer asset transfer and
escrow call in one atomic submission, and quotes only the receiver's still-required
opt-in MBR. A rejected proof leaves no new opt-in or deposit. The wallet plugin performs
HyperSwap's opt-in before its inner asset transfer. Both paths previously
included incorrect extra opt-in funding in the escrow payment. Offer/escrow box
funding is refunded on cleanup; an explicit application ASA opt-in retains its
100,000 microALGO minimum balance. Fixtures and the deployment script fund the
application's initial 100,000 microALGO account balance.

The six HyperSwap TODOs have been replaced by real lifecycle coverage. The old
failure reproduction now requires successful offers and complete refunds. The
application and plugin artifacts/clients and SDK distribution have been rebuilt.
The rebuilt HyperSwapPlugin must accompany the repaired HyperSwap because both
embed the storage-cost quote. Changes remain local; no public-network deployment
or state migration was performed.

## Shared consumer utilities

`smart_contracts/meta/functions.ts` provides direct AVM 13 record info, read and
slice functions; a typed ABI read; application-owned inline set/delete calls;
and legacy-compatible proof/verified-data calls. It uses existing named errors
and types. The registry's private storage/payment helpers remain private.
MockMetaReader imports these utilities; LocalNet tests check missing/empty values,
full-box slices, stale revisions, blocked foreign writes, ABI/direct-read parity,
application ownership, exact deposits and full refunds.

The helpers require the intended registry and appropriate group resources/pooled
fees. Write authorization belongs to the consuming contract. See
`projects/akita-sdk/docs/meta.md` for integration details.

## Validation

The initial compatibility pass compiled all 13 consumer contracts/factories and
passed 1,067 contract tests plus 241 SDK tests. Its known-failure HyperSwap
reproductions established the blocker but did not establish working swaps.

The follow-up repair uses `npm run build:hyper-swap` and the full SDK build.
Before the root-name optimization, the focused run passed 21 consumer and
wallet-plugin tests, the SDK suite passed 241 tests, and the complete contract
suite passed 1,076 tests across 75 files with five existing social TODOs. The
final binary root-name implementation passes all 31 focused consumer/plugin
tests, 243 SDK tests across 27 files, both builds and the contract typecheck.
The full contract `npm test` passes 1,086 tests across all 75 files in 1,209.84
seconds, with five existing social TODOs and no failures. All 13 recorded source
and artifact fingerprints match the final run.

Repair logs are `/tmp/akita-hyperswap-build.log`,
`/tmp/akita-hyperswap-sdk-build.log`, `/tmp/akita-hyperswap-types.log`,
`/tmp/akita-hyperswap-focused-final.log`, `/tmp/akita-hyperswap-sdk-tests.log`
and `/tmp/akita-hyperswap-full-tests.log`.

Root-name optimization logs are `/tmp/akita-root-name-build.log`,
`/tmp/akita-root-name-sdk-build.log`, `/tmp/akita-root-name-types.log`,
`/tmp/akita-root-name-focused.log`, `/tmp/akita-root-name-sdk-tests.log`
and `/tmp/akita-root-name-full-tests.log`.

The initial pass also compiled a temporary AVM 11 consumer importing all five
Meta ABI helpers. AVM 13 direct reads are exercised by MockMetaReader. The record
utilities' ownership, missing/empty values, revision checks, slices, deposits and
refunds remain covered in the full suite.
