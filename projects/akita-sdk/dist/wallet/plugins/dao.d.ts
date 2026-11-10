import { BaseSDK } from "../../base";
import { AkitaDaoPluginArgs, AkitaDaoPluginClient } from "../../generated/AkitaDAOPluginClient";
import { NewContractSDKParams, MaybeSigner } from "../../types";
import { PluginSDKReturn } from "../../types";
type ContractArgs = AkitaDaoPluginArgs["obj"];
type SetupArgs = (Omit<ContractArgs['setup(uint64,bool,string,byte[32])void'], 'wallet' | 'rekeyBack' | 'salt'> & Partial<Pick<ContractArgs['setup(uint64,bool,string,byte[32])void'], 'salt'>> & MaybeSigner & {
    rekeyBack?: boolean;
});
type NewProposalArgs = (Omit<ContractArgs['newProposal(uint64,bool,byte[36],(uint8,byte[])[])uint64'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
type VoteProposalArgs = (Omit<ContractArgs['voteProposal(uint64,bool,uint64,uint8)void'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
type FinalizeProposalArgs = (Omit<ContractArgs['finalizeProposal(uint64,bool,uint64)void'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
type ExecuteProposalArgs = (Omit<ContractArgs['executeProposal(uint64,bool,uint64)void'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
type EditProposalArgs = (Omit<ContractArgs['editProposal(uint64,bool,uint64,byte[36],(uint8,byte[])[])void'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
type SubmitProposalArgs = (Omit<ContractArgs['submitProposal(uint64,bool,uint64)void'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
type DeleteProposalArgs = (Omit<ContractArgs['deleteProposal(uint64,bool,uint64)void'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
type CancelProposalArgs = (Omit<ContractArgs['cancelProposal(uint64,bool,uint64)void'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
export declare class DAOPluginSDK extends BaseSDK<AkitaDaoPluginClient> {
    constructor(params: NewContractSDKParams);
    setup(): PluginSDKReturn;
    setup(args: SetupArgs): PluginSDKReturn;
    newProposal(): PluginSDKReturn;
    newProposal(args: NewProposalArgs): PluginSDKReturn;
    voteProposal(): PluginSDKReturn;
    voteProposal(args: VoteProposalArgs): PluginSDKReturn;
    finalizeProposal(): PluginSDKReturn;
    finalizeProposal(args: FinalizeProposalArgs): PluginSDKReturn;
    executeProposal(): PluginSDKReturn;
    executeProposal(args: ExecuteProposalArgs): PluginSDKReturn;
    /** Shared hook builder for the single-call DAO plugin methods. */
    private simpleHook;
    /** Edit one of this wallet's draft proposals (the plugin tops up or the DAO refunds the cost difference). */
    editProposal(): PluginSDKReturn;
    editProposal(args: EditProposalArgs): PluginSDKReturn;
    /** Submit one of this wallet's draft proposals to voting. */
    submitProposal(): PluginSDKReturn;
    submitProposal(args: SubmitProposalArgs): PluginSDKReturn;
    /** Delete one of this wallet's proposals; the released prepayment returns to the wallet. */
    deleteProposal(): PluginSDKReturn;
    deleteProposal(args: DeleteProposalArgs): PluginSDKReturn;
    /** Abandon one of this wallet's approved, unexecuted proposals. */
    cancelProposal(): PluginSDKReturn;
    cancelProposal(args: CancelProposalArgs): PluginSDKReturn;
}
export {};
