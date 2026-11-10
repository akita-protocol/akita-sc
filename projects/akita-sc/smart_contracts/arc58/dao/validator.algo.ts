import { Account, Application, bytes, contract, Contract, loggedAssert, loggedErr, uint64 } from "@algorandfoundation/algorand-typescript";
import { abiCall, abimethod, decodeArc4 } from "@algorandfoundation/algorand-typescript/arc4";
import { btoi, Global } from "@algorandfoundation/algorand-typescript/op";
import { PluginInfo, PluginKey } from "../account/types";
import { Split } from "../plugins/revenue-manager/types";
import { AkitaDAOGlobalStateKeysRemoveExecutePluginProposalSettings, AkitaDAOGlobalStateKeysToggleEscrowLockProposalSettings, MaxProposalPower, AkitaDAOGlobalStateKeysAddAllowancesProposalSettings, AkitaDAOGlobalStateKeysAddPluginProposalSettings, AkitaDAOGlobalStateKeysAkitaAppList, AkitaDAOGlobalStateKeysAkitaAssets, AkitaDAOGlobalStateKeysAkitaSocialAppList, AkitaDAOGlobalStateKeysContentPolicy, AkitaDAOGlobalStateKeysGuildFees, AkitaDAOGlobalStateKeysMinRewardsImpact, AkitaDAOGlobalStateKeysNewEscrowProposalSettings, AkitaDAOGlobalStateKeysNFTFees, AkitaDAOGlobalStateKeysOtherAppList, AkitaDAOGlobalStateKeysPluginAppList, AkitaDAOGlobalStateKeysProposalActionLimit, AkitaDAOGlobalStateKeysRemoveAllowancesProposalSettings, AkitaDAOGlobalStateKeysRemovePluginProposalSettings, AkitaDAOGlobalStateKeysRevenueSplits, AkitaDAOGlobalStateKeysSocialFees, AkitaDAOGlobalStateKeysStakingFees, AkitaDAOGlobalStateKeysSubscriptionFees, AkitaDAOGlobalStateKeysSwapFees, AkitaDAOGlobalStateKeysUpdateFieldsProposalSettings, AkitaDAOGlobalStateKeysUpgradeAppProposalSettings, AkitaDAOGlobalStateKeysWalletFees, ProposalActionTypeAddAllowances, ProposalActionTypeAddNamedPlugin, ProposalActionTypeAddPlugin, ProposalActionTypeChangeAdmin, ProposalActionTypeExecutePlugin, ProposalActionTypeNewEscrow, ProposalActionTypeReclaim, ProposalActionTypeRemoveAllowances, ProposalActionTypeRemoveExecutePlugin, ProposalActionTypeRemoveNamedPlugin, ProposalActionTypeRemovePlugin, ProposalActionTypeToggleEscrowLock, ProposalActionTypeUpdateFields, ProposalActionTypeUpdateWallet, ProposalActionTypeUpgradeApp } from "./constants";
import { errChangeAdminNotLast, errActionLimitMustBeGreaterThanZero,errAllowanceAlreadyExists, errAllowanceDoesNotExist, errAllowanceListEmpty, errEmptyActionList, errEscrowAlreadyExists, errEscrowDoesNotExist, errExecutionKeyNotFound, errInvalidAdmin, errInvalidCid, errInvalidDuration, errInvalidFirstValid, errInvalidLastValid, errInvalidMaxApproval, errInvalidMaxParticipation, errInvalidMaxPower, errInvalidMinApproval, errInvalidMinParticipation, errInvalidMinPower, errInvalidMinimumRewardsImpact, errInvalidProposalAction, errInvalidProposalActionLimit, errMinRewardsImpactMustBeGreaterThanZero, errMinRewardsImpactMustBeLessThanOrEqualTo1000s, errNotExecutablePlugin, errPluginAlreadyExists, errPluginDoesNotExist, errPluginExpired, errReclaimListEmpty, errUnknownField, errUpgradeNoGroups } from "./errors";
import { AkitaAppList, AkitaAssets, AkitaSocialAppList, GuildFees, NFTFees, OtherAppList, PluginAppList, ProposalAction, ProposalAddAllowances, ProposalAddNamedPlugin, ProposalAddPlugin, ProposalChangeAdmin, ProposalExecutePlugin, ProposalNewEscrow, ProposalReclaim, ProposalRemoveAllowances, ProposalRemoveExecutePlugin, ProposalRemoveNamedPlugin, ProposalRemovePlugin, ProposalSettings, ProposalToggleEscrowLock, ProposalUpdateField, ProposalUpgradeApp, SocialFees, StakingFees, SubscriptionFees, SwapFees, WalletFees } from "./types";

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
    loggedAssert(actions.length > 0, errEmptyActionList)

    for (let i: uint64 = 0; i < actions.length; i++) {
      switch (actions[i].type) {
        case ProposalActionTypeUpgradeApp: {
          // UpgradeApp actions are validated later during execution
          // They need execution key and wallet build validation
          const { groups, firstValid, lastValid } = decodeArc4<ProposalUpgradeApp>(actions[i].data)
          loggedAssert(groups.length > 0, errUpgradeNoGroups)
          loggedAssert(firstValid > 0, errInvalidFirstValid)
          loggedAssert(lastValid > firstValid, errInvalidLastValid)
          break
        }
        case ProposalActionTypeAddPlugin: {
          const { plugin, caller, escrow, defaultToEscrow, fee, power, duration, participation, approval, useExecutionKey } = decodeArc4<ProposalAddPlugin>(actions[i].data)
          if (useExecutionKey) {
            this.validateSettings({ fee, power, duration, participation, approval })
          }
          loggedAssert(!this.pluginExists(wallet, { plugin, caller, escrow: defaultToEscrow ? '' : escrow }), errPluginAlreadyExists)
          break;
        }
        case ProposalActionTypeAddNamedPlugin: {
          const { name, plugin, caller, escrow, defaultToEscrow, fee, power, duration, participation, approval, useExecutionKey } = decodeArc4<ProposalAddNamedPlugin>(actions[i].data)
          if (useExecutionKey) {
            this.validateSettings({ fee, power, duration, participation, approval })
          }
          loggedAssert(!this.namedPluginExists(wallet, name), errPluginAlreadyExists)
          loggedAssert(!this.pluginExists(wallet, { plugin, caller, escrow: defaultToEscrow ? '' : escrow }), errPluginAlreadyExists)
          break
        }
        case ProposalActionTypeExecutePlugin: {
          const { plugin, escrow } = decodeArc4<ProposalExecutePlugin>(actions[i].data)
          const pluginInfo = this.getPlugin(wallet, { plugin, caller: Global.zeroAddress, escrow })
          loggedAssert(pluginInfo.start !== 0, errPluginDoesNotExist)
          loggedAssert(pluginInfo.useExecutionKey, errNotExecutablePlugin)
          const epochRef = pluginInfo.useRounds ? Global.round : Global.latestTimestamp
          loggedAssert(pluginInfo.lastValid > epochRef, errPluginExpired)
          break
        }
        case ProposalActionTypeRemoveExecutePlugin: {
          const { executionKey } = decodeArc4<ProposalRemoveExecutePlugin>(actions[i].data)
          loggedAssert(this.executionExists(wallet, executionKey), errExecutionKeyNotFound)
          break
        }
        case ProposalActionTypeRemovePlugin: {
          const { plugin, caller, escrow } = decodeArc4<ProposalRemovePlugin>(actions[i].data)
          loggedAssert(this.pluginExists(wallet, { plugin, caller, escrow }), errPluginDoesNotExist)
          break
        }
        case ProposalActionTypeRemoveNamedPlugin: {
          const { name, plugin, caller, escrow } = decodeArc4<ProposalRemoveNamedPlugin>(actions[i].data)
          loggedAssert(this.namedPluginExists(wallet, name), errPluginDoesNotExist)
          const key = abiCall<typeof AbstractedAccount.prototype.arc58_getNamedPluginKey>({
            appId: wallet,
            args: [name]
          }).returnValue
          loggedAssert(key.plugin === plugin && key.caller === caller && key.escrow === escrow, errInvalidProposalAction)
          break
        }
        case ProposalActionTypeAddAllowances: {
          const { escrow, allowances } = decodeArc4<ProposalAddAllowances>(actions[i].data)
          loggedAssert(allowances.length > 0, errAllowanceListEmpty)

          let assets: uint64[] = []
          for (let i: uint64 = 0; i < allowances.length; i++) {
            assets.push(allowances[i].asset)
          }

          const { anyExist } = this.allowanceCheck(wallet, escrow, assets)
          loggedAssert(!anyExist, errAllowanceAlreadyExists)
          break
        }
        case ProposalActionTypeRemoveAllowances: {
          const { escrow, assets } = decodeArc4<ProposalRemoveAllowances>(actions[i].data)
          loggedAssert(assets.length > 0, errAllowanceListEmpty)
          const { allExist } = this.allowanceCheck(wallet, escrow, assets)
          loggedAssert(allExist, errAllowanceDoesNotExist)
          break
        }
        case ProposalActionTypeNewEscrow: {
          const { escrow } = decodeArc4<ProposalNewEscrow>(actions[i].data)
          loggedAssert(!this.escrowExists(wallet, escrow), errEscrowAlreadyExists)
          break
        }
        case ProposalActionTypeToggleEscrowLock: {
          const { escrow } = decodeArc4<ProposalToggleEscrowLock>(actions[i].data)
          loggedAssert(this.escrowExists(wallet, escrow), errEscrowDoesNotExist)
          break
        }
        case ProposalActionTypeReclaim: {
          const { escrow, reclaims } = decodeArc4<ProposalReclaim>(actions[i].data)
          loggedAssert(reclaims.length > 0, errReclaimListEmpty)
          loggedAssert(this.escrowExists(wallet, escrow), errEscrowDoesNotExist)
          break
        }
        case ProposalActionTypeChangeAdmin: {
          const { admin } = decodeArc4<ProposalChangeAdmin>(actions[i].data)
          loggedAssert(admin !== Global.zeroAddress, errInvalidAdmin)
          // The wallet cannot administer itself, and handing it back to the caller (the DAO) is a no-op.
          loggedAssert(admin !== wallet.address && admin !== Global.callerApplicationAddress, errInvalidAdmin)
          // Once admin moves, later wallet-admin actions would revert; it must come last.
          loggedAssert(i === actions.length - 1, errChangeAdminNotLast)
          break
        }
        case ProposalActionTypeUpdateFields: {
          const { field, value } = decodeArc4<ProposalUpdateField>(actions[i].data)
          switch (field) {
            case AkitaDAOGlobalStateKeysContentPolicy: {
              loggedAssert(value.length === 36, errInvalidCid)
              break
            }
            case AkitaDAOGlobalStateKeysProposalActionLimit: {
              loggedAssert(value.length === 8, errInvalidProposalActionLimit)
              loggedAssert(btoi(value) > 0, errActionLimitMustBeGreaterThanZero)
              break
            }
            case AkitaDAOGlobalStateKeysMinRewardsImpact: {
              loggedAssert(value.length === 8, errInvalidMinimumRewardsImpact)
              loggedAssert(btoi(value) > 0, errMinRewardsImpactMustBeGreaterThanZero)
              loggedAssert(btoi(value) <= 1000, errMinRewardsImpactMustBeLessThanOrEqualTo1000s)
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
            case AkitaDAOGlobalStateKeysGuildFees: {
              decodeArc4<GuildFees>(value)
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
            case AkitaDAOGlobalStateKeysUpdateFieldsProposalSettings:
            case AkitaDAOGlobalStateKeysRemoveExecutePluginProposalSettings:
            case AkitaDAOGlobalStateKeysToggleEscrowLockProposalSettings: {
              const settings = decodeArc4<ProposalSettings>(value)
              this.validateSettings(settings)
              break
            }
            case AkitaDAOGlobalStateKeysRevenueSplits: {
              decodeArc4<Split[]>(value)
              break
            }
            default: {
              loggedErr(errUnknownField)
            }
          }
          break
        }
        case ProposalActionTypeUpdateWallet: {
          // No additional validation needed — factory validates admin
          break
        }
        default: {
          loggedErr(errInvalidProposalAction)
        }
      }
    }
  }

  // PRIVATE HELPERS ------------------------------------------------------------------------------

  private validateSettings(settings: ProposalSettings): void {
    loggedAssert(settings.approval > 1_000, errInvalidMinApproval) // 1%
    loggedAssert(settings.approval <= 100_000, errInvalidMaxApproval) // 100%

    loggedAssert(settings.participation > 1_000, errInvalidMinParticipation) // 1%
    loggedAssert(settings.participation <= 100_000, errInvalidMaxParticipation) // 100%

    loggedAssert(settings.duration > 0, errInvalidDuration)

    loggedAssert(settings.power > 0, errInvalidMinPower)
    // power is in base units: min over AKTA/BONES of amount x remaining lock days (capped at 365) / 365
    loggedAssert(settings.power <= MaxProposalPower, errInvalidMaxPower)
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

    return info.address !== Global.zeroAddress
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
