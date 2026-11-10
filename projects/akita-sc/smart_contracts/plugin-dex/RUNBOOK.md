# Plugin DEX operations runbook

What the Vault admin (the DAO wallet after activation) does when a pool stops working normally. On
MainNet every admin call below is a DAO proposal action.

## Deploy checklist (TestNet first, then MainNet)

Run every step with `--dry-run` first and read the plan. Each real step needs explicit approval for that
network and sender. These scripts have no extra MainNet guard: check `-n` before every real run.

1. **Preconditions.** The DAO runs Rewards v2 at `aal.rewards` (LaunchManager dev buys need it). The deployer
   can pay every create and its MBR (the dry runs print each program's size; fund with a margin). Pick the Tinyman v2 validator app id
   (MainNet `1002541853`, TestNet `148607000`).
2. **Build.** `npm run build` at the commit you ship; `size.test.ts` and the full suite must be green.
3. **Deploy the stack in catalog order**, one receipt per contract in one directory (for example
   `receipts/dex-<network>/`):

   ```
   npx ts-node --transpile-only scripts/deploy-immutable.ts -n <network> -m "$MNEMONIC" -v <version> \
     --contract <Name> --config <args.json> --manifest receipts/dex-<network>/<Name>.json
   ```

   Order (dependencies are read from the earlier receipts and checked on chain): PluginDex (`admin` = the
   deployer for now), BinEngine, ImpactFeeHook, SwapTaxHook, VolatilityFeeHook, BackrunArbHook (`tinyman`),
   GatedFeeHook, AntiSnipeFeeHook, LaunchTaxHook, ConsensusKeyregHook, PluginDexPlugin, LaunchManager,
   GatedFeePassPlugin. A failed step is resumed by rerunning it with the same `--manifest`.
4. **Activate.** `scripts/activate-plugin-dex.ts -n <network> --receipts receipts/dex-<network> --policy
   <policy.json>` makes the curve and hook approvals, configures LaunchManager, then hands every admin to
   the DAO wallet. Rerunning skips what is done. Once the DAO wallet is admin, any remaining call is printed for a DAO proposal instead of sent.
5. **Verify on chain.** Every receipt's program hash matches the build; `getHookApproval` and the curve
   approval are set; every app's admin is the DAO wallet.
6. **Publish the IDs.** Rerun step 3 with `--register` (or edit `akita-sdk/src/networks.ts`) so `pluginDex`,
   `pluginDexPlugin` and the rest are in the network map; release the SDK; ship the apps.
7. **Smoke test with small amounts**: create a pool, add liquidity, swap direct, from an Akita wallet
   (PluginDexPlugin) and through Haystack, remove liquidity. Then tell aggregators the Vault id
   (INTEGRATION.md).

## Pause a pool

`PluginDex.setPoolPaused(poolId, true)` stops swaps, adds and pokes on that pool. It also opens
`emergencyRemoveLiquidity`, the exit that runs no hooks, no sync, no valuators and no curve. It pays each LP
the pro-rata share of the booked reserves. Curve-managed (bins) positions use `removeLiquidityCurve`,
which skips hooks on a paused pool.

Unpause with `setPoolPaused(poolId, false)` once the cause is fixed.

## When to pause

### An issuer claws back a pool asset

Symptoms: `sync`, `addLiquidity` and `removeLiquidity` on the pool revert with `errPdki`, and the escrow
holds less of one asset than the pool's booked reserve plus protocol fees.

1. Confirm the shortfall: compare the escrow's holding of the asset with `reserve + protocolFees + locked`
   from `getPool`.
2. Pause the pool so LPs can leave through `emergencyRemoveLiquidity`.
3. Tell LPs in the app that the pool is paused and how to withdraw.
4. Leave the pool paused. The shortfall stays booked, so a normal sync would fail again.

### An issuer freezes a pool asset in the escrow

Every transfer of that asset from the escrow fails, the emergency exit included. Pausing still stops
trading. LPs can withdraw only after the issuer unfreezes the escrow's holding.

### An approved hook starts reverting

Every swap on the pools that install that hook fails. Hooks are version-pinned, so the hook cannot be
patched in place.

1. Pause the affected pools.
2. Revoke the hook for new pools: `setHookApproval(hook, 0)`. Existing pools keep their pinned stack.
3. LPs leave through the emergency exit and can move to a new pool without the hook.

### A valuator or curve app fails

Native pools with external slots: pause, then `writeDownExternal` if a venue really lost value (paused
pools only; it never writes a rate up). Bins pools: `removeLiquidityCurve` still calls the curve's Remove,
which depends on no other app.

## Protocol fees

`collectProtocolFees(poolId)` is permissionless. It sends the booked protocol fees to the treasury, which
must be opted in to both assets.

## Before listing a pool in the app

The app warns when a pool asset has a clawback or freeze address. Treat such pools as depending on the
issuer: see the clawback and freeze cases above.
