type ReadableAddress = string | import('algosdk').Address;
import { BaseSDK } from "../../base";
import { UpdateAkitaDaoPluginArgs, UpdateAkitaDaoPluginClient, UpdateAkitaDaoPluginFactory } from "../../generated/UpdateAkitaDAOPluginClient";
import { NewContractSDKParams, MaybeSigner } from "../../types";
import { PluginHookParams, PluginSDKReturn } from "../../types";
import { Address } from "algosdk";
import { getTxns } from "../utils";
import { encodeLease, microAlgo } from "@algorandfoundation/algokit-utils";
import { PluginTxn } from "../../types";

/**
 * Note that makes the Update plugin bind an execution-key upgrade by reading the proposal
 * (`DAO.mustGetExecution` + `DAO.getProposal`) instead of `DAO.isUpgradeLease`. Needed for a DAO
 * without `isUpgradeLease` (the deployed MainNet DAO). Mirrors `UpgradeBindingNoteProposal` in
 * `smart_contracts/arc58/plugins/update-akita-dao/contract.algo.ts`.
 */
export const UPGRADE_BINDING_NOTE_PROPOSAL = 'akita:upgrade-binding:proposal';

/**
 * Select the proposal read for an execution-key upgrade. The plugin then reads the DAO boxes
 * `'x' + lease` and `'l' + itob(proposalId)`, so both must be known when the group is built: the lease
 * passed to `usePlugin` (string or the 32 encoded bytes) and the id of the UpgradeApp proposal that
 * will carry the group (for a new proposal: the DAO's `proposal_id` before `newProposal`).
 */
export type UpgradeDaoBinding = { lease: string | Uint8Array; proposalId: bigint | number };

/**
 * Bytes of DAO boxes an execution-key upgrade group reads that exist only once its UpgradeApp proposal
 * is created and executed, for `wallet.build.usePlugin({ pendingBoxBytes })`:
 *
 * - `'u' + itob(target)`, the upgrade leases recorded for the target: a 2-byte count and 40 B per
 *   action that names the target (`actions`, 1 unless the target's factory and child go in two groups).
 * - with `proposalRead` (a DAO without `isUpgradeLease`, see `UpgradeDaoBinding`): the execution box
 *   `'x' + lease` (16 B) and the proposal box `'l' + itob(id)`, 121 B plus, for each of its
 *   `proposalActions` UpgradeApp actions, 67 B and 32 B per group id.
 *
 * `groups` is the number of group ids one execution key carries (one per 1,000 rounds of its window).
 */
export function pendingUpgradeBoxBytes({ groups, actions = 1, proposalRead = false, proposalActions = actions }:
  { groups: number; actions?: number; proposalRead?: boolean; proposalActions?: number }): number {
  const leases = 2 + 40 * actions;
  if (!proposalRead) return leases;
  return leases + 16 + 121 + proposalActions * (67 + 32 * groups);
}

type ContractArgs = UpdateAkitaDaoPluginArgs["obj"];

type DeleteBoxedContractArgs = (
  Omit<ContractArgs['deleteBoxedContract(uint64,bool)void'], 'wallet' | 'rekeyBack'>
  & MaybeSigner
  & { rekeyBack?: boolean }
)

type UpdateAppArgs = (
  Omit<ContractArgs['updateApp(uint64,bool,uint64)void'], 'wallet' | 'rekeyBack'>
  & { version: string, data: Uint8Array; clearProgram?: Uint8Array; }
  /**
   * Grow the target's global schema to at least these sizes (never shrinks). When either is set the
   * plugin's `updateAppWithSchema` is used. The DAO wallet becomes the target's size sponsor on growth.
   */
  & { globalNumUint?: bigint | number; globalNumBytes?: bigint | number; }
  & MaybeSigner
  & { rekeyBack?: boolean; daoBinding?: UpgradeDaoBinding }
)

type UpdateAkitaDaoAppIDForAppArgs = (
  Omit<ContractArgs['updateAkitaDaoAppIDForApp(uint64,bool,uint64,uint64)void'], 'wallet' | 'rekeyBack'>
  & MaybeSigner
  & { rekeyBack?: boolean; daoBinding?: UpgradeDaoBinding }
)

type UpdateAkitaDaoEscrowForAppArgs = (
  Omit<ContractArgs['updateAkitaDaoEscrowForApp(uint64,bool,uint64,(string,uint64))void'], 'wallet' | 'rekeyBack'>
  & MaybeSigner
  & { rekeyBack?: boolean; daoBinding?: UpgradeDaoBinding }
)

type UpdateRevocationArgs = (
  Omit<ContractArgs['updateRevocation(uint64,bool,uint64)void'], 'wallet' | 'rekeyBack'>
  & { factoryAppId: bigint | number }
  & MaybeSigner
  & { rekeyBack?: boolean; daoBinding?: UpgradeDaoBinding }
)

type UpdateFactoryChildContractArgs = (
  { factoryAppId: bigint | number; version: string; data: Uint8Array; }
  & MaybeSigner
  & { rekeyBack?: boolean; daoBinding?: UpgradeDaoBinding }
)

export class UpdateAkitaDAOPluginSDK extends BaseSDK<UpdateAkitaDaoPluginClient> {

  constructor(params: NewContractSDKParams) {
    super({ factory: UpdateAkitaDaoPluginFactory, ...params });
  }

  /**
   * References the plugin needs on a call that changes `target`: the DAO app and its box
   * `'u' + itob(target)` (the UpgradeApp execution keys recorded for that app). The plugin checks the
   * group's execution key against it, so execution groups must carry the reference before approval.
   * With `daoBinding`, the call also carries `UPGRADE_BINDING_NOTE_PROPOSAL` and references the DAO's
   * execution box `'x' + lease` and proposal box `'l' + itob(proposalId)` (see `UpgradeDaoBinding`).
   */
  private async upgradeReferences(target: bigint | number, daoBinding?: UpgradeDaoBinding): Promise<{ appReferences?: bigint[]; boxReferences?: { appId: bigint; name: Uint8Array }[]; note?: Uint8Array }> {
    const dao = await this.client.state.global.akitaDao();
    if (!dao) {
      if (daoBinding) throw new Error('daoBinding needs the plugin\'s akita_dao');
      return {};
    }
    const name = new Uint8Array(9);
    name[0] = 'u'.charCodeAt(0);
    new DataView(name.buffer).setBigUint64(1, BigInt(target));
    // Execution groups are simulated as the wallet admin before the proposal executes, so the DAO boxes the
    // execution-key path reads ('u', 'x', 'l') are not yet sized into the group's box read budget. This
    // empty box reference adds 2,048 B of budget only while the simulated reads fit the references the
    // calls name: once they do not, the simulation counts it as budget the group already has. The budget
    // those boxes can rely on is the one `wallet.build.usePlugin` adds after discovery: pass it
    // `pendingBoxBytes: pendingUpgradeBoxBytes(...)`. The reference stays so a group proposed by an
    // earlier SDK is rebuilt with the same id.
    const readHeadroom = { appId: 0n, name: new Uint8Array(0) };
    if (!daoBinding) return { appReferences: [dao], boxReferences: [{ appId: dao, name }, readHeadroom] };
    const lease = typeof daoBinding.lease === 'string' ? encodeLease(daoBinding.lease)! : daoBinding.lease;
    if (lease.length !== 32) throw new Error('daoBinding.lease must encode to 32 bytes');
    const execution = new Uint8Array(33);
    execution[0] = 'x'.charCodeAt(0);
    execution.set(lease, 1);
    const proposal = new Uint8Array(9);
    proposal[0] = 'l'.charCodeAt(0);
    new DataView(proposal.buffer).setBigUint64(1, BigInt(daoBinding.proposalId));
    return {
      appReferences: [dao],
      boxReferences: [{ appId: dao, name }, { appId: dao, name: execution }, { appId: dao, name: proposal }, readHeadroom],
      note: new TextEncoder().encode(UPGRADE_BINDING_NOTE_PROPOSAL),
    };
  }

  /**
   * Explicit references for the resources an upload group shares across its calls: this plugin's
   * staging box `'bc'`, the target app, and for a factory child push the factory's box `'bc'`. Named
   * on the initBoxedContract call so they are available to the whole group. Without them the
   * simulate-based resource population places these group-level resources in an order that varies
   * between builds (algod reports them unordered), so a rebuilt execution group (resuming an approved
   * UpgradeApp proposal) would not reproduce the group id the proposal recorded.
   */
  private stagingReferences(target: bigint | number, factory = false): { appReferences: bigint[]; boxReferences: { appId: bigint; name: Uint8Array }[] } {
    const boxedContract = new TextEncoder().encode('bc');
    const boxReferences = [{ appId: this.client.appId, name: boxedContract }];
    if (factory) boxReferences.push({ appId: BigInt(target), name: boxedContract });
    return { appReferences: [BigInt(target)], boxReferences };
  }

  deleteBoxedContract(): PluginSDKReturn
  deleteBoxedContract(args: DeleteBoxedContractArgs): PluginSDKReturn
  deleteBoxedContract(args?: DeleteBoxedContractArgs): PluginSDKReturn {
    const methodName = 'deleteBoxedContract';
    if (args === undefined) {
      // Called without arguments - return selector for method restrictions
      return (spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns
      });
    }

    const { sender, signer } = args;

    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {

        const rekeyBack = args.rekeyBack ?? true;

        const params = (
          await this.client.params.deleteBoxedContract({
            ...sendParams,
            args: { wallet, rekeyBack }
          })
        )

        return [{
          type: 'methodCall',
          ...params
        }]
      }
    });
  }

  /** Pass a matching clearProgram for AVM-version changes; restricted installs must also allow setClearProgram. */
  updateApp(): PluginSDKReturn
  updateApp(args: UpdateAppArgs): PluginSDKReturn
  updateApp(args?: UpdateAppArgs): PluginSDKReturn {
    const growSchema = args?.globalNumUint !== undefined || args?.globalNumBytes !== undefined;
    const methodNames = ['initBoxedContract', 'loadBoxedContract', growSchema ? 'updateAppWithSchema' : 'updateApp'];
    if (args?.clearProgram !== undefined) methodNames.unshift('setClearProgram');
    if (args === undefined) {
      // Called without arguments - return selector for method restrictions
      return (spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: methodNames.map(methodName => this.client.appClient.getABIMethod(methodName).getSelector()),
        getTxns
      });
    }

    const { sender, signer, appId, version, data, clearProgram } = args;

    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: methodNames.map(methodName => this.client.appClient.getABIMethod(methodName).getSelector()),
      getTxns: async ({ wallet }: PluginHookParams) => {

        const rekeyBack = args.rekeyBack ?? true;

        const txns: PluginTxn[] = [];

        // Commit the matching clear program in the same authorized group, before the contiguous upload.
        if (clearProgram !== undefined) {
          txns.push({
            type: 'methodCall',
            ...await this.client.params.setClearProgram({
              ...sendParams,
              args: { wallet, rekeyBack: false, clearProgram },
            }),
          });
        }

        const initParams = (
          await this.client.params.initBoxedContract({
            ...sendParams,
            ...this.stagingReferences(appId),
            args: { wallet, version, size: data.length }
          })
        )

        txns.push({
          type: 'methodCall',
          ...initParams
        })

        // max loadContract data size is 2026 bytes
        // ABI encoding overhead: [selector:4][wallet:8][offset:8][data_length:2] = 22 bytes
        // 2048 - 22 = 2026 bytes max per chunk
        const CHUNK_SIZE = 2026;
        for (let i = 0; i < data.length; i += CHUNK_SIZE) {
          const chunk = data.slice(i, i + CHUNK_SIZE);
          const loadParams = (
            await this.client.params.loadBoxedContract({
              ...sendParams,
              args: { wallet, offset: i, data: chunk }
            })
          )

          txns.push({
            type: 'methodCall',
            ...loadParams
          })
        }

        const refs = await this.upgradeReferences(appId, args.daoBinding);
        const updateParams = growSchema
          ? await this.client.params.updateAppWithSchema({
            ...sendParams,
            ...refs,
            args: {
              wallet,
              rekeyBack,
              appId,
              globalNumUint: BigInt(args.globalNumUint ?? 0),
              globalNumBytes: BigInt(args.globalNumBytes ?? 0),
            }
          })
          : await this.client.params.updateApp({
            ...sendParams,
            ...refs,
            args: { wallet, rekeyBack, appId }
          })

        txns.push({
          type: 'methodCall',
          ...updateParams
        })

        return txns;
      }
    });
  }

  updateAkitaDaoAppIDForApp(): PluginSDKReturn
  updateAkitaDaoAppIDForApp(args: UpdateAkitaDaoAppIDForAppArgs): PluginSDKReturn
  updateAkitaDaoAppIDForApp(args?: UpdateAkitaDaoAppIDForAppArgs): PluginSDKReturn {
    const methodName = 'updateAkitaDaoAppIDForApp';
    if (args === undefined) {
      // Called without arguments - return selector for method restrictions
      return (spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns
      });
    }

    const { sender, signer, appId, newAkitaDaoAppId } = args;

    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {

        const rekeyBack = args.rekeyBack ?? true;

        const params = (
          await this.client.params.updateAkitaDaoAppIdForApp({
            ...sendParams,
            ...(await this.upgradeReferences(appId, args.daoBinding)),
            args: { wallet, rekeyBack, appId, newAkitaDaoAppId }
          })
        )

        return [{
          type: 'methodCall',
          ...params
        }]
      }
    });
  }

  updateAkitaDaoEscrowForApp(): PluginSDKReturn
  updateAkitaDaoEscrowForApp(args: UpdateAkitaDaoEscrowForAppArgs): PluginSDKReturn
  updateAkitaDaoEscrowForApp(args?: UpdateAkitaDaoEscrowForAppArgs): PluginSDKReturn {
    const methodName = 'updateAkitaDaoEscrowForApp';
    if (args === undefined) {
      // Called without arguments - return selector for method restrictions
      return (spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns
      });
    }

    const { sender, signer, appId, newEscrow } = args;

    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {

        const rekeyBack = args.rekeyBack ?? true;

        const params = (
          await this.client.params.updateAkitaDaoEscrowForApp({
            ...sendParams,
            ...(await this.upgradeReferences(appId, args.daoBinding)),
            args: { wallet, rekeyBack, appId, newEscrow },
          })
        )

        return [{
          type: 'methodCall',
          ...params
        }]
      }
    });
  }

  /**
   * Points the wallet factory at the revocation app (`AbstractedAccountFactory.updateRevocation`),
   * the app every wallet asks whether a grant was revoked. Zero turns the check off.
   *
   * The plugin calls the factory the DAO's `aal.wallet` names, and the call is upgrade-class, so the
   * execution key has to be recorded for that factory: pass it as `factoryAppId` (the SDK's
   * `walletFactory` for the network, as `updateFactoryChildContract` takes it).
   */
  updateRevocation(): PluginSDKReturn
  updateRevocation(args: UpdateRevocationArgs): PluginSDKReturn
  updateRevocation(args?: UpdateRevocationArgs): PluginSDKReturn {
    const methodName = 'updateRevocation';
    if (args === undefined) {
      return (spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns
      });
    }

    const { sender, signer, app, factoryAppId } = args;

    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {

        const rekeyBack = args.rekeyBack ?? true;

        const params = (
          await this.client.params.updateRevocation({
            ...sendParams,
            // the factory is the app this call changes, so its execution-key box is the one to reference
            ...(await this.upgradeReferences(factoryAppId, args.daoBinding)),
            args: { wallet, rekeyBack, app },
          })
        )

        return [{
          type: 'methodCall',
          ...params
        }]
      }
    });
  }

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
  updateFactoryChildContract(): PluginSDKReturn
  updateFactoryChildContract(args: UpdateFactoryChildContractArgs): PluginSDKReturn
  updateFactoryChildContract(args?: UpdateFactoryChildContractArgs): PluginSDKReturn {
    const methodNames = ['initBoxedContract', 'loadBoxedContract', 'updateFactoryChildContract'];
    if (args === undefined) {
      // Called without arguments - return selector for method restrictions
      return (spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: methodNames.map(methodName => this.client.appClient.getABIMethod(methodName).getSelector()),
        getTxns
      });
    }

    const { sender, signer, factoryAppId, version, data } = args;

    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: methodNames.map(methodName => this.client.appClient.getABIMethod(methodName).getSelector()),
      getTxns: async ({ wallet }: PluginHookParams) => {

        const rekeyBack = args.rekeyBack ?? true;

        const txns: PluginTxn[] = [];

        // Step 1: Upload contract to plugin's box storage
        const initParams = (
          await this.client.params.initBoxedContract({
            ...sendParams,
            ...this.stagingReferences(factoryAppId, true),
            args: { wallet, version, size: data.length }
          })
        )

        txns.push({
          type: 'methodCall',
          ...initParams
        })

        // max loadContract data size is 2026 bytes
        // ABI encoding overhead: [selector:4][wallet:8][offset:8][data_length:2] = 22 bytes
        // 2048 - 22 = 2026 bytes max per chunk
        const CHUNK_SIZE = 2026;
        for (let i = 0; i < data.length; i += CHUNK_SIZE) {
          const chunk = data.slice(i, i + CHUNK_SIZE);
          const loadParams = (
            await this.client.params.loadBoxedContract({
              ...sendParams,
              args: { wallet, offset: i, data: chunk }
            })
          )

          txns.push({
            type: 'methodCall',
            ...loadParams
          })
        }

        // Step 2: Transfer contract from plugin's box to factory's box
        const updateFactoryParams = (
          await this.client.params.updateFactoryChildContract({
            ...sendParams,
            ...(await this.upgradeReferences(factoryAppId, args.daoBinding)),
            args: { wallet, rekeyBack, factoryAppId }
          })
        )

        txns.push({
          type: 'methodCall',
          ...updateFactoryParams
        })

        return txns;
      }
    });
  }
}
