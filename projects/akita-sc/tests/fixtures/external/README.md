# External venue fixtures

These fixtures deploy real third-party protocols on LocalNet so venue code is tested against the
exact mainnet programs.

## Tinyman v2 (`tinyman-v2.ts`)

**Licensing.** Tinyman's AMM v2 contracts are GPL-2.0-or-later (BUSL-1.1 until the 2026-01-01
change date). Akita is under a Business Source License, so **this repo does not contain Tinyman's
TEAL or bytecode**. The fixture downloads the official compiled approval program at test time:

- source: `https://github.com/tinymanorg/tinyman-amm-contracts-v2`, file
  `contracts/build/amm_approval.teal.tok`
- pinned commit: `3de3a35e1ce0ca96576d18c2728f6042d1a07f72` (never `main`)
- sha256: `dd63834ddcd51013ec0a22142497ad4c6d74e421e6c79149422c243346691f56`, 7,731 bytes,
  byte-identical to mainnet app `1002541853`

The hash is checked on every load. The file is cached in
`tests/fixtures/external/.cache/tinyman-v2/<commit>/`, which is git-ignored. Do not commit it.

The only Tinyman-derived bytes in this repo are the 4-byte clear program (`return 1`) and the
47-byte pool logicsig template. Both are interface constants needed to derive pool addresses and
interoperate with the deployed protocol.

**Offline or CI without GitHub access.** If the download fails, the fixture throws an error that
explains how to fill the cache by hand. From `projects/akita-sc`:

```bash
mkdir -p tests/fixtures/external/.cache/tinyman-v2/3de3a35e1ce0ca96576d18c2728f6042d1a07f72
curl -fL -o tests/fixtures/external/.cache/tinyman-v2/3de3a35e1ce0ca96576d18c2728f6042d1a07f72/amm_approval.teal.tok \
  https://raw.githubusercontent.com/tinymanorg/tinyman-amm-contracts-v2/3de3a35e1ce0ca96576d18c2728f6042d1a07f72/contracts/build/amm_approval.teal.tok
shasum -a 256 tests/fixtures/external/.cache/tinyman-v2/3de3a35e1ce0ca96576d18c2728f6042d1a07f72/amm_approval.teal.tok
```

CI can restore that directory from its own cache. A file with the wrong hash is rejected.

**API.** `deployTinymanV2`, `deriveTinymanPool`, `bootstrapPool`, `addInitialLiquidity`, `setFee`,
`swapDirect`, `readPoolState`, and the reference formula `tinymanFixedInputOut`. Tinyman calls use
explicit reference arrays (`populateAppCallResources: false`), because the v7 AMM gets no group
resource sharing.
