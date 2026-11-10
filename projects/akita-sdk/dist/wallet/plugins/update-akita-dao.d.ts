import { BaseSDK } from "../../base";
import { UpdateAkitaDaoPluginArgs, UpdateAkitaDaoPluginClient } from "../../generated/UpdateAkitaDAOPluginClient";
import { NewContractSDKParams, MaybeSigner } from "../../types";
import { PluginSDKReturn } from "../../types";
/**
 * Note that makes the Update plugin bind an execution-key upgrade by reading the proposal
 * (`DAO.mustGetExecution` + `DAO.getProposal`) instead of `DAO.isUpgradeLease`. Needed for a DAO
 * without `isUpgradeLease` (the deployed MainNet DAO). Mirrors `UpgradeBindingNoteProposal` in
 * `smart_contracts/arc58/plugins/update-akita-dao/contract.algo.ts`.
 */
export declare const UPGRADE_BINDING_NOTE_PROPOSAL = "akita:upgrade-binding:proposal";
/**
 * Select the proposal read for an execution-key upgrade. The plugin then reads the DAO boxes
 * `'x' + lease` and `'l' + itob(proposalId)`, so both must be known when the group is built: the lease
 * passed to `usePlugin` (string or the 32 encoded bytes) and the id of the UpgradeApp proposal that
 * will carry the group (for a new proposal: the DAO's `proposal_id` before `newProposal`).
 */
export type UpgradeDaoBinding = {
    lease: string | Uint8Array;
    proposalId: bigint | number;
};
type ContractArgs = UpdateAkitaDaoPluginArgs["obj"];
type DeleteBoxedContractArgs = (Omit<ContractArgs['deleteBoxedContract(uint64,bool)void'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
type UpdateAppArgs = (Omit<ContractArgs['updateApp(uint64,bool,uint64)void'], 'wallet' | 'rekeyBack'> & {
    version: string;
    data: Uint8Array;
    clearProgram?: Uint8Array;
}
/**
 * Grow the target's global schema to at least these sizes (never shrinks). When either is set the
 * plugin's `updateAppWithSchema` is used. The DAO wallet becomes the target's size sponsor on growth.
 */
 & {
    globalNumUint?: bigint | number;
    globalNumBytes?: bigint | number;
} & MaybeSigner & {
    rekeyBack?: boolean;
    daoBinding?: UpgradeDaoBinding;
});
type UpdateAkitaDaoAppIDForAppArgs = (Omit<ContractArgs['updateAkitaDaoAppIDForApp(uint64,bool,uint64,uint64)void'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
    daoBinding?: UpgradeDaoBinding;
});
type UpdateAkitaDaoEscrowForAppArgs = (Omit<ContractArgs['updateAkitaDaoEscrowForApp(uint64,bool,uint64,(string,uint64))void'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
    daoBinding?: UpgradeDaoBinding;
});
type UpdateFactoryChildContractArgs = ({
    factoryAppId: bigint | number;
    version: string;
    data: Uint8Array;
} & MaybeSigner & {
    rekeyBack?: boolean;
    daoBinding?: UpgradeDaoBinding;
});
export declare class UpdateAkitaDAOPluginSDK extends BaseSDK<UpdateAkitaDaoPluginClient> {
    constructor(params: NewContractSDKParams);
    /**
     * References the plugin needs on a call that changes `target`: the DAO app and its box
     * `'u' + itob(target)` (the UpgradeApp execution keys recorded for that app). The plugin checks the
     * group's execution key against it, so execution groups must carry the reference before approval.
     * With `daoBinding`, the call also carries `UPGRADE_BINDING_NOTE_PROPOSAL` and references the DAO's
     * execution box `'x' + lease` and proposal box `'l' + itob(proposalId)` (see `UpgradeDaoBinding`).
     */
    private upgradeReferences;
    /**
     * Explicit references for the resources an upload group shares across its calls: this plugin's
     * staging box `'bc'`, the target app, and for a factory child push the factory's box `'bc'`. Named
     * on the initBoxedContract call so they are available to the whole group. Without them the
     * simulate-based resource population places these group-level resources in an order that varies
     * between builds (algod reports them unordered), so a rebuilt execution group (resuming an approved
     * UpgradeApp proposal) would not reproduce the group id the proposal recorded.
     */
    private stagingReferences;
    deleteBoxedContract(): PluginSDKReturn;
    deleteBoxedContract(args: DeleteBoxedContractArgs): PluginSDKReturn;
    /** Pass a matching clearProgram for AVM-version changes; restricted installs must also allow setClearProgram. */
    updateApp(): PluginSDKReturn;
    updateApp(args: UpdateAppArgs): PluginSDKReturn;
    updateAkitaDaoAppIDForApp(): PluginSDKReturn;
    updateAkitaDaoAppIDForApp(args: UpdateAkitaDaoAppIDForAppArgs): PluginSDKReturn;
    updateAkitaDaoEscrowForApp(): PluginSDKReturn;
    updateAkitaDaoEscrowForApp(args: UpdateAkitaDaoEscrowForAppArgs): PluginSDKReturn;
    /**
     * Updates a factory's child contract bytecode stored in its box.
     * This allows the factory to deploy new instances with the updated contract code.
     *
     * The flow is:
     * 1. Upload contract to this plugin's box via initBoxedContract/loadBoxedContract
     * 2. Call updateFactoryChildContract which transfers the data to the factory's box
     *
     * @example
     * ```typescript
     * // Update wallet factory's child contract (AbstractedAccount)
     * await dao.wallet.usePlugin({
     *   calls: [
     *     updatePlugin.updateFactoryChildContract({
     *       sender,
     *       signer,
     *       factoryAppId: appIds.walletFactory,
     *       version: '1.0.1',
     *       data: compiledAbstractedAccount.approvalProgram,
     *     }),
     *   ],
     * });
     * ```
     */
    updateFactoryChildContract(): PluginSDKReturn;
    updateFactoryChildContract(args: UpdateFactoryChildContractArgs): PluginSDKReturn;
}
export {};
