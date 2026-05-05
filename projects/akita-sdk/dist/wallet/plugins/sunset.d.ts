import { BaseSDK } from "../../base";
import { SunsetPluginArgs, SunsetPluginClient } from "../../generated/SunsetPluginClient";
import { NewContractSDKParams, MaybeSigner } from "../../types";
import { PluginSDKReturn } from "../../types";
type ContractArgs = SunsetPluginArgs["obj"];
type DeleteArgs = (Omit<ContractArgs['delete(uint64,bool,uint64,address)void'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
type DeleteBoxesArgs = (Omit<ContractArgs['deleteBoxes(uint64,bool,uint64,byte[][])void'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
type CloseOutArgs = (Omit<ContractArgs['closeOut(uint64,bool,uint64,(address,uint64)[])void'], 'wallet' | 'rekeyBack' | 'closes'> & MaybeSigner & {
    rekeyBack?: boolean;
    /**
     * Each entry closes one ASA out to a destination. The generated ABI
     * expects `(address, uint64)[]` tuples; this form accepts the named
     * object shape for ergonomics and serializes it below.
     */
    closes: {
        assetCloseTo: string;
        xferAsset: bigint | number;
    }[];
});
type DeleteAssetsArgs = (Omit<ContractArgs['deleteAssets(uint64,bool,uint64,uint64[])void'], 'wallet' | 'rekeyBack' | 'assets'> & MaybeSigner & {
    rekeyBack?: boolean;
    /**
     * Accept both `bigint` and `number` for each ID; the SDK normalizes to
     * `bigint[]` to match the generated overload's narrower type.
     */
    assets: (bigint | number)[];
});
/**
 * Plugin SDK for the `SunsetPlugin` — an ARC-58 plugin that forwards to a
 * {@link SunsetContract} so an abstracted-account wallet can tear down
 * contracts it controls (or is the `TMPL_SUNSET_CALLER` of). The plugin is
 * intentionally a thin wrapper: each method here mirrors one abimethod on
 * the target sunset contract, and each call results in an inner abiCall
 * whose `Txn.sender` is the wallet's spending account.
 *
 * Typical flow for a production sunset sweep:
 *   1. Update a DAO-owned contract in-place to `SunsetContract` bytecode via
 *      `UpdateAkitaDAOPluginSDK.updateApp` (with `TMPL_SUNSET_CALLER` pinned
 *      at compile time to the DAO wallet's controlled address).
 *   2. `deleteBoxes` to clear residual state (closeRemainderTo refuses to
 *      run while boxes remain).
 *   3. `closeOut` any ASA balances the sunsetted contract still holds.
 *   4. `deleteAssets` to destroy any ASAs whose manager is the app.
 *   5. `delete` to drain the app account to the destination escrow and
 *      execute the `DeleteApplication` OnComplete.
 */
export declare class SunsetPluginSDK extends BaseSDK<SunsetPluginClient> {
    constructor(params: NewContractSDKParams);
    delete(): PluginSDKReturn;
    delete(args: DeleteArgs): PluginSDKReturn;
    deleteBoxes(): PluginSDKReturn;
    deleteBoxes(args: DeleteBoxesArgs): PluginSDKReturn;
    closeOut(): PluginSDKReturn;
    closeOut(args: CloseOutArgs): PluginSDKReturn;
    deleteAssets(): PluginSDKReturn;
    deleteAssets(args: DeleteAssetsArgs): PluginSDKReturn;
}
export {};
