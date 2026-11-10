/* eslint-disable @typescript-eslint/no-unused-vars -- this mock preserves the production ARC-58 ABI. */
import {
  Account,
  BoxMap,
  Application,
  bytes,
  Global,
  GlobalState,
  OnCompleteAction,
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod, Contract, Uint8 } from '@algorandfoundation/algorand-typescript/arc4'
import { AbstractAccountGlobalStateKeysControlledAddress } from '../../account/constants'
import type { AddAllowanceInfo, EscrowInfo, EscrowReclaim, MethodRestriction, PluginKey } from '../../account/types'
import type { Guild } from '../core/contract.algo'
import {
  MockGuildWalletGlobalStateKeyActionCount,
  MockGuildWalletGlobalStateKeyAdmin,
  MockGuildWalletGlobalStateKeyEscrowLocked,
  MockGuildWalletGlobalStateKeyLastAction,
} from './mock-wallet.constants'

/** Minimal ARC-58 administration surface used only by Guild integration tests. */
export class MockGuildWallet extends Contract {
  namedPlugins = BoxMap<string, PluginKey>({ keyPrefix: 'n' })
  admin = GlobalState<Account>({ key: MockGuildWalletGlobalStateKeyAdmin })
  /** Production wallets expose their controlled address; the Guild treats it as the treasury. */
  controlledAddress = GlobalState<Account>({ key: AbstractAccountGlobalStateKeysControlledAddress })
  actionCount = GlobalState<uint64>({ initialValue: 0, key: MockGuildWalletGlobalStateKeyActionCount })
  lastAction = GlobalState<uint64>({ initialValue: 0, key: MockGuildWalletGlobalStateKeyLastAction })
  escrowLocked = GlobalState<boolean>({ initialValue: false, key: MockGuildWalletGlobalStateKeyEscrowLocked })

  private record(action: uint64): void {
    this.actionCount.value += 1
    this.lastAction.value = action
  }

  @abimethod({ onCreate: 'require' })
  create(admin: Account): void {
    this.admin.value = admin
    this.controlledAddress.value = Global.currentApplicationAddress
  }

  setAdmin(admin: Account): void {
    this.admin.value = admin
  }

  arc58_addPlugin(
    plugin: uint64,
    caller: Account,
    escrow: string,
    admin: boolean,
    delegationType: Uint8,
    lastValid: uint64,
    cooldown: uint64,
    methods: MethodRestriction[],
    useRounds: boolean,
    useExecutionKey: boolean,
    coverFees: boolean,
    canReclaim: boolean,
    defaultToEscrow: boolean,
  ): void {
    this.record(20)
  }

  arc58_addNamedPlugin(
    name: string,
    plugin: uint64,
    caller: Account,
    escrow: string,
    admin: boolean,
    delegationType: Uint8,
    lastValid: uint64,
    cooldown: uint64,
    methods: MethodRestriction[],
    useRounds: boolean,
    useExecutionKey: boolean,
    coverFees: boolean,
    canReclaim: boolean,
    defaultToEscrow: boolean,
  ): void {
    this.namedPlugins(name).value = { plugin, caller, escrow: defaultToEscrow ? '' : escrow }
    this.record(21)
  }

  @abimethod({ readonly: true })
  arc58_getNamedPluginKey(name: string): PluginKey {
    return this.namedPlugins(name).value
  }

  arc58_removePlugin(plugin: uint64, caller: Account, escrow: string): void {
    this.record(40)
  }

  arc58_removeNamedPlugin(name: string): void {
    this.record(41)
  }

  arc58_newEscrow(escrow: string, address: Account): uint64 {
    this.record(70)
    return 0
  }

  arc58_toggleEscrowLock(escrow: string): EscrowInfo {
    this.record(71)
    this.escrowLocked.value = !this.escrowLocked.value
    return { id: 0, address: Global.zeroAddress, locked: this.escrowLocked.value }
  }

  arc58_reclaim(escrow: string, reclaims: EscrowReclaim[]): void {
    this.record(72)
  }

  arc58_changeAdmin(newAdmin: Account): void {
    this.admin.value = newAdmin
    this.record(91)
  }

  arc58_addAllowances(escrow: string, allowances: AddAllowanceInfo[]): void {
    this.record(50)
  }

  arc58_removeAllowances(escrow: string, assets: uint64[]): void {
    this.record(60)
  }

  arc58_addExecutionKey(lease: bytes<32>, groups: bytes<32>[], firstValid: uint64, lastValid: uint64): void {
    this.record(30)
  }

  arc58_removeExecutionKey(lease: bytes<32>): void {
    this.record(31)
  }

  /** Submit an app update from the wallet application address for Guild update-path tests. */
  updateGuild(
    guild: Application,
    approvalProgramFirst: bytes,
    approvalProgramSecond: bytes,
    clearStateProgram: bytes,
    version: string,
  ): void {
    abiCall<typeof Guild.prototype.update>({
      appId: guild,
      args: [version],
      onCompletion: OnCompleteAction.UpdateApplication,
      approvalProgram: [approvalProgramFirst, approvalProgramSecond],
      clearStateProgram,
    })
  }

  @abimethod({ readonly: true })
  arc58_getAdmin(): Account {
    return this.admin.value
  }
}
