import { Application, bytes, contract, Contract, loggedAssert, loggedErr, uint64 } from "@algorandfoundation/algorand-typescript";
import { abiCall, abimethod, decodeArc4 } from "@algorandfoundation/algorand-typescript/arc4";
import { btoi, Global } from "@algorandfoundation/algorand-typescript/op";
import { PluginInfo, PluginKey } from "../account/types";
import { Split } from "../plugins/revenue-manager/types";
import { AkitaDAOGlobalStateKeysAddAllowancesProposalSettings, AkitaDAOGlobalStateKeysAddPluginProposalSettings, AkitaDAOGlobalStateKeysAkitaAppList, AkitaDAOGlobalStateKeysAkitaAssets, AkitaDAOGlobalStateKeysAkitaSocialAppList, AkitaDAOGlobalStateKeysContentPolicy, AkitaDAOGlobalStateKeysMinRewardsImpact, AkitaDAOGlobalStateKeysNewEscrowProposalSettings, AkitaDAOGlobalStateKeysNFTFees, AkitaDAOGlobalStateKeysOtherAppList, AkitaDAOGlobalStateKeysPluginAppList, AkitaDAOGlobalStateKeysProposalActionLimit, AkitaDAOGlobalStateKeysRemoveAllowancesProposalSettings, AkitaDAOGlobalStateKeysRemovePluginProposalSettings, AkitaDAOGlobalStateKeysRevenueSplits, AkitaDAOGlobalStateKeysSocialFees, AkitaDAOGlobalStateKeysStakingFees, AkitaDAOGlobalStateKeysSubscriptionFees, AkitaDAOGlobalStateKeysSwapFees, AkitaDAOGlobalStateKeysUpdateFieldsProposalSettings, AkitaDAOGlobalStateKeysUpgradeAppProposalSettings, AkitaDAOGlobalStateKeysWalletFees, ProposalActionTypeAddAllowances, ProposalActionTypeAddNamedPlugin, ProposalActionTypeAddPlugin, ProposalActionTypeExecutePlugin, ProposalActionTypeNewEscrow, ProposalActionTypeRemoveAllowances, ProposalActionTypeRemoveExecutePlugin, ProposalActionTypeRemoveNamedPlugin, ProposalActionTypeRemovePlugin, ProposalActionTypeToggleEscrowLock, ProposalActionTypeUpdateFields, ProposalActionTypeUpdateWallet, ProposalActionTypeUpgradeApp } from "./constants";
import { ERR_ACTION_LIMIT_MUST_BE_GREATER_THAN_ZERO, ERR_ALLOWANCE_ALREADY_EXISTS, ERR_ALLOWANCE_DOES_NOT_EXIST, ERR_ALLOWANCE_LIST_EMPTY, ERR_EMPTY_ACTION_LIST, ERR_ESCROW_ALREADY_EXISTS, ERR_ESCROW_DOES_NOT_EXIST, ERR_EXECUTION_KEY_NOT_FOUND, ERR_INVALID_CID, ERR_INVALID_DURATION, ERR_INVALID_FIRST_VALID, ERR_INVALID_LAST_VALID, ERR_INVALID_MAX_APPROVAL, ERR_INVALID_MAX_PARTICIPATION, ERR_INVALID_MAX_POWER, ERR_INVALID_MIN_APPROVAL, ERR_INVALID_MIN_PARTICIPATION, ERR_INVALID_MIN_POWER, ERR_INVALID_MINIMUM_REWARDS_IMPACT, ERR_INVALID_PROPOSAL_ACTION, ERR_INVALID_PROPOSAL_ACTION_LIMIT, ERR_MIN_REWARDS_IMPACT_MUST_BE_GREATER_THAN_ZERO, ERR_MIN_REWARDS_IMPACT_MUST_BE_LESS_THAN_OR_EQUAL_TO_1000s, ERR_NOT_EXECUTABLE_PLUGIN, ERR_PLUGIN_ALREADY_EXISTS, ERR_PLUGIN_DOES_NOT_EXIST, ERR_PLUGIN_EXPIRED, ERR_UNKNOWN_FIELD, ERR_UPGRADE_NO_GROUPS } from "./errors";
import { AkitaAppList, AkitaAssets, AkitaSocialAppList, NFTFees, OtherAppList, PluginAppList, ProposalAction, ProposalAddAllowances, ProposalAddNamedPlugin, ProposalAddPlugin, ProposalExecutePlugin, ProposalNewEscrow, ProposalRemoveAllowances, ProposalRemoveExecutePlugin, ProposalRemoveNamedPlugin, ProposalRemovePlugin, ProposalSettings, ProposalToggleEscrowLock, ProposalUpdateField, ProposalUpgradeApp, SocialFees, StakingFees, SubscriptionFees, SwapFees, WalletFees } from "./types";

// CONTRACT IMPORTS
import type { AbstractedAccount } from "../account/contract.algo";


/**
 * Stateless proposal-action validator that the Akita DAO delegates to.
 *
 * The DAO calls `validateActions` before accepting a new or edited proposal,
 * passing its own ARC-58 wallet app so the validator can read plugin/escrow/
 * allowance/execution state via `abiCall`. Keeping this logic off the DAO
 * frees up DAO bytecode and lets validation rules be upgraded independently
 * of the DAO itself — point the DAO at a new validator app to roll forward.
 *
 * The contract intentionally has no state and no `update` handler; each
 * version is immutable so callers can trust its response shape over time.
 */
@contract({
  stateTotals: { globalBytes: 0, globalUints: 0 }
})
export class AkitaDAOProposalValidator extends Contract {

  @abimethod({ onCreate: 'require' })
  create(): void {
    // stateless — nothing to initialize
  }

  // PUBLIC VALIDATION ENTRY POINT ----------------------------------------------------------------

  /**
   * Validate every action on a proposal against the state of the supplied wallet.
   *
   * @param wallet The ARC-58 abstracted account that the proposal will act on.
   *               The validator calls `arc58_get*` methods on this app to check
   *               plugin/escrow/allowance/execution existence.
   * @param actions The proposal's actions. Each is decoded by type and validated.
   *
   * Reverts if any action is malformed or conflicts with wallet state.
   */
  validateActions(wallet: Application, actions: ProposalAction[]): void {
    loggedAssert(actions.length > 0, ERR_EMPTY_ACTION_LIST)

    for (let i: uint64 = 0; i < actions.length; i++) {
      switch (actions[i].type) {
        case ProposalActionTypeUpgradeApp: {
          // UpgradeApp actions are validated later during execution
          // They need execution key and wallet build validation
          const { groups, firstValid, lastValid } = decodeArc4<ProposalUpgradeApp>(actions[i].data)
          loggedAssert(groups.length > 0, ERR_UPGRADE_NO_GROUPS)
          loggedAssert(firstValid > 0, ERR_INVALID_FIRST_VALID)
          loggedAssert(lastValid > firstValid, ERR_INVALID_LAST_VALID)
          break
        }
        case ProposalActionTypeAddPlugin: {
          const { plugin, caller, escrow, fee, power, duration, participation, approval, useExecutionKey } = decodeArc4<ProposalAddPlugin>(actions[i].data)
          if (useExecutionKey) {
            this.validateSettings({ fee, power, duration, participation, approval })
          }
          loggedAssert(!this.pluginExists(wallet, { plugin, caller, escrow }), ERR_PLUGIN_ALREADY_EXISTS)
          break;
        }
        case ProposalActionTypeAddNamedPlugin: {
          const { name } = decodeArc4<ProposalAddNamedPlugin>(actions[i].data)
          loggedAssert(!this.namedPluginExists(wallet, name), ERR_PLUGIN_ALREADY_EXISTS)
          break
        }
        case ProposalActionTypeExecutePlugin: {
          const { plugin, escrow } = decodeArc4<ProposalExecutePlugin>(actions[i].data)
          const pluginInfo = this.getPlugin(wallet, { plugin, caller: Global.zeroAddress, escrow })
          loggedAssert(pluginInfo.start !== 0, ERR_PLUGIN_DOES_NOT_EXIST)
          loggedAssert(pluginInfo.useExecutionKey, ERR_NOT_EXECUTABLE_PLUGIN)
          const epochRef = pluginInfo.useRounds ? Global.round : Global.latestTimestamp
          loggedAssert(pluginInfo.lastValid > epochRef, ERR_PLUGIN_EXPIRED)
          break
        }
        case ProposalActionTypeRemoveExecutePlugin: {
          const { executionKey } = decodeArc4<ProposalRemoveExecutePlugin>(actions[i].data)
          loggedAssert(this.executionExists(wallet, executionKey), ERR_EXECUTION_KEY_NOT_FOUND)
          break
        }
        case ProposalActionTypeRemovePlugin: {
          const { plugin, caller, escrow } = decodeArc4<ProposalRemovePlugin>(actions[i].data)
          loggedAssert(this.pluginExists(wallet, { plugin, caller, escrow }), ERR_PLUGIN_DOES_NOT_EXIST)
          break
        }
        case ProposalActionTypeRemoveNamedPlugin: {
          const { name } = decodeArc4<ProposalRemoveNamedPlugin>(actions[i].data)
          loggedAssert(this.namedPluginExists(wallet, name), ERR_PLUGIN_DOES_NOT_EXIST)
          break
        }
        case ProposalActionTypeAddAllowances: {
          const { escrow, allowances } = decodeArc4<ProposalAddAllowances>(actions[i].data)
          loggedAssert(allowances.length > 0, ERR_ALLOWANCE_LIST_EMPTY)

          let assets: uint64[] = []
          for (let i: uint64 = 0; i < allowances.length; i++) {
            assets.push(allowances[i].asset)
          }

          const { anyExist } = this.allowanceCheck(wallet, escrow, assets)
          loggedAssert(!anyExist, ERR_ALLOWANCE_ALREADY_EXISTS)
          break
        }
        case ProposalActionTypeRemoveAllowances: {
          const { escrow, assets } = decodeArc4<ProposalRemoveAllowances>(actions[i].data)
          loggedAssert(assets.length > 0, ERR_ALLOWANCE_LIST_EMPTY)
          const { allExist } = this.allowanceCheck(wallet, escrow, assets)
          loggedAssert(allExist, ERR_ALLOWANCE_DOES_NOT_EXIST)
          break
        }
        case ProposalActionTypeNewEscrow: {
          const { escrow } = decodeArc4<ProposalNewEscrow>(actions[i].data)
          loggedAssert(!this.escrowExists(wallet, escrow), ERR_ESCROW_ALREADY_EXISTS)
          break
        }
        case ProposalActionTypeToggleEscrowLock: {
          const { escrow } = decodeArc4<ProposalToggleEscrowLock>(actions[i].data)
          loggedAssert(this.escrowExists(wallet, escrow), ERR_ESCROW_DOES_NOT_EXIST)
          break
        }
        case ProposalActionTypeUpdateFields: {
          const { field, value } = decodeArc4<ProposalUpdateField>(actions[i].data)
          switch (field) {
            case AkitaDAOGlobalStateKeysContentPolicy: {
              loggedAssert(value.length === 36, ERR_INVALID_CID)
              break
            }
            case AkitaDAOGlobalStateKeysProposalActionLimit: {
              loggedAssert(value.length === 8, ERR_INVALID_PROPOSAL_ACTION_LIMIT)
              loggedAssert(btoi(value) > 0, ERR_ACTION_LIMIT_MUST_BE_GREATER_THAN_ZERO)
              break
            }
            case AkitaDAOGlobalStateKeysMinRewardsImpact: {
              loggedAssert(value.length === 8, ERR_INVALID_MINIMUM_REWARDS_IMPACT)
              loggedAssert(btoi(value) > 0, ERR_MIN_REWARDS_IMPACT_MUST_BE_GREATER_THAN_ZERO)
              loggedAssert(btoi(value) <= 1000, ERR_MIN_REWARDS_IMPACT_MUST_BE_LESS_THAN_OR_EQUAL_TO_1000s)
              break
            }
            case AkitaDAOGlobalStateKeysAkitaAppList: {
              decodeArc4<AkitaAppList>(value)
              break
            }
            case AkitaDAOGlobalStateKeysAkitaSocialAppList: {
              decodeArc4<AkitaSocialAppList>(value)
              break
            }
            case AkitaDAOGlobalStateKeysPluginAppList: {
              decodeArc4<PluginAppList>(value)
              break
            }
            case AkitaDAOGlobalStateKeysOtherAppList: {
              decodeArc4<OtherAppList>(value)
              break
            }
            case AkitaDAOGlobalStateKeysWalletFees: {
              decodeArc4<WalletFees>(value)
              break
            }
            case AkitaDAOGlobalStateKeysSocialFees: {
              decodeArc4<SocialFees>(value)
              break
            }
            case AkitaDAOGlobalStateKeysStakingFees: {
              decodeArc4<StakingFees>(value)
              break
            }
            case AkitaDAOGlobalStateKeysSubscriptionFees: {
              decodeArc4<SubscriptionFees>(value)
              break
            }
            case AkitaDAOGlobalStateKeysNFTFees: {
              decodeArc4<NFTFees>(value)
              break
            }
            case AkitaDAOGlobalStateKeysSwapFees: {
              decodeArc4<SwapFees>(value)
              break
            }
            case AkitaDAOGlobalStateKeysAkitaAssets: {
              decodeArc4<AkitaAssets>(value)
              break
            }
            case AkitaDAOGlobalStateKeysUpgradeAppProposalSettings:
            case AkitaDAOGlobalStateKeysAddPluginProposalSettings:
            case AkitaDAOGlobalStateKeysRemovePluginProposalSettings:
            case AkitaDAOGlobalStateKeysAddAllowancesProposalSettings:
            case AkitaDAOGlobalStateKeysRemoveAllowancesProposalSettings:
            case AkitaDAOGlobalStateKeysNewEscrowProposalSettings:
            case AkitaDAOGlobalStateKeysUpdateFieldsProposalSettings: {
              const settings = decodeArc4<ProposalSettings>(value)
              this.validateSettings(settings)
              break
            }
            case AkitaDAOGlobalStateKeysRevenueSplits: {
              decodeArc4<Split[]>(value)
              break
            }
            default: {
              loggedErr(ERR_UNKNOWN_FIELD)
            }
          }
          break
        }
        case ProposalActionTypeUpdateWallet: {
          // No additional validation needed — factory validates admin
          break
        }
        default: {
          loggedErr(ERR_INVALID_PROPOSAL_ACTION)
        }
      }
    }
  }

  // PRIVATE HELPERS ------------------------------------------------------------------------------

  private validateSettings(settings: ProposalSettings): void {
    loggedAssert(settings.approval > 1_000, ERR_INVALID_MIN_APPROVAL) // 1%
    loggedAssert(settings.approval <= 100_000, ERR_INVALID_MAX_APPROVAL) // 100%

    loggedAssert(settings.participation > 1_000, ERR_INVALID_MIN_PARTICIPATION) // 1%
    loggedAssert(settings.participation <= 100_000, ERR_INVALID_MAX_PARTICIPATION) // 100%

    loggedAssert(settings.duration > 0, ERR_INVALID_DURATION)

    loggedAssert(settings.power > 0, ERR_INVALID_MIN_POWER)
    loggedAssert(settings.power <= 1_000, ERR_INVALID_MAX_POWER)
  }

  private pluginExists(wallet: Application, key: PluginKey): boolean {
    const info = abiCall<typeof AbstractedAccount.prototype.arc58_getPlugins>({
      appId: wallet,
      args: [[key]]
    }).returnValue[0]

    return info.start !== 0
  }

  private getPlugin(wallet: Application, key: PluginKey): PluginInfo {
    return abiCall<typeof AbstractedAccount.prototype.arc58_getPlugins>({
      appId: wallet,
      args: [[key]]
    }).returnValue[0]
  }

  private namedPluginExists(wallet: Application, name: string): boolean {
    const info = abiCall<typeof AbstractedAccount.prototype.arc58_getNamedPlugins>({
      appId: wallet,
      args: [[name]]
    }).returnValue[0]

    return info.start !== 0
  }

  private escrowExists(wallet: Application, escrow: string): boolean {
    const info = abiCall<typeof AbstractedAccount.prototype.arc58_getEscrows>({
      appId: wallet,
      args: [[escrow]]
    }).returnValue[0]

    return info.id !== 0
  }

  private allowanceCheck(wallet: Application, escrow: string, assets: uint64[]): { existences: boolean[], anyExist: boolean, allExist: boolean } {
    const info = abiCall<typeof AbstractedAccount.prototype.arc58_getAllowances>({
      appId: wallet,
      args: [escrow, assets]
    }).returnValue

    let existences: boolean[] = []
    let anyExist: boolean = false
    let allExist: boolean = true
    for (let i: uint64 = 0; i < info.length; i++) {
      const exists = info[i].start !== 0
      existences.push(exists)
      if (exists) {
        anyExist = true
      } else {
        allExist = false
      }
    }

    return { existences, anyExist, allExist }
  }

  private executionExists(wallet: Application, lease: bytes<32>): boolean {
    const info = abiCall<typeof AbstractedAccount.prototype.arc58_getExecutions>({
      appId: wallet,
      args: [[lease]]
    }).returnValue[0]

    return info.groups.length > 0
  }
}
