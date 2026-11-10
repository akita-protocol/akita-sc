import {
  Account,
  Application,
  BoxMap,
  Bytes,
  bytes,
  clone,
  ensureBudget,
  Global,
  GlobalState,
  gtxn,
  itxn,
  loggedAssert,
  Txn,
  uint64
} from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod } from '@algorandfoundation/algorand-typescript/arc4'
import { btoi } from '@algorandfoundation/algorand-typescript/op'
import { classes } from 'polytype'
import {
  FirstGateV2ID,
  GateBoxPrefixGateRegistry,
  GateBoxPrefixSubGates,
  GateGlobalStateKeyCursor,
  GateGlobalStateKeyImportsSealed,
  GateGlobalStateKeyLegacyCutoff,
  MaxGateFilters,
  MaxSubGateCost,
} from './constants'
import {
  errBadOperation,
  errGateFailed,
  errGateNotFound,
  errImportsClosed,
  errInvalidArgCount,
  errInvalidGateID,
  errInvalidLayer,
  errInvalidPayment,
  errInvalidSubGate,
  errNotAkitaDao,
  errSubGateCostTooHigh,
} from './errors'
import { AND, GateArgs, GateFilter, GateFilterEntry, GateFilterEntryWithArgs, OR } from './types'
import { GateCtx } from '../utils/principal'

// CONTRACT IMPORTS
import { AkitaBaseContract } from '../utils/base-contracts/upgradeable'
import { BaseGate } from './base'
import type { MockGate } from './mock-gate'


/**
 * Gate v2.
 *
 * A gate is a list of `(layer, subGate, registryEntry, logicalOperator)` filters.
 *
 * Evaluation semantics (audit SG-06):
 * - Layers start at 0 and never decrease; each step increases the layer by at most 1.
 * - Within a layer, filters combine left to right with the operator stored on the
 *   left-hand filter (`AND` / `OR`, no precedence).
 * - A filter followed by a deeper layer applies its operator to the whole deeper
 *   group, which (because layers never decrease) runs to the end of the list.
 *   Example: `[A{0,AND}, B{1,OR}, C{1}]` is `A AND (B OR C)`.
 * - The operator on the last filter is ignored.
 *
 * Sub-gates must be on an allowlist (audit SG-16): managed by the creator until imports
 * are sealed, by the DAO wallet afterwards.
 *
 * Gate ids issued by `register` start at 2^32. Ids below `legacyCutoff` are reserved for
 * a one-shot import of Gate v1 registrations (audit decision SG-A) so resources that
 * stored v1 ids keep resolving to the same policy.
 *
 * Context forwarding (principal-resolution spec §3.5, §6.9, Q12): `mustCheckFor` / `checkFor`
 * take the first hop's verified `GateCtx = (principal, wallet, spender)`. The target asserts the
 * gate txn with `gateCheckCtx`, so the ctx is the one it verified. Context-aware sub-gates (flagged
 * on the allowlist) receive `checkFor(ctx, ...)`; every other sub-gate receives
 * `check(ctx.principal, ...)`. The legacy `mustCheck` / `check(caller)` call the plain `check` of
 * every sub-gate, exactly as before.
 */
export class Gate extends classes(BaseGate, AkitaBaseContract) {

  // GLOBAL STATE ---------------------------------------------------------------------------------

  /** the id cursor for gates */
  gateCursor = GlobalState<uint64>({ key: GateGlobalStateKeyCursor })
  /** v1 gate ids `< legacyCutoff` may be imported until imports are sealed */
  legacyCutoff = GlobalState<uint64>({ key: GateGlobalStateKeyLegacyCutoff })
  /** 1 once the creator sealed legacy imports and handed allowlist control to the DAO */
  importsSealed = GlobalState<uint64>({ key: GateGlobalStateKeyImportsSealed })

  // BOXES ----------------------------------------------------------------------------------------

  gateRegistry = BoxMap<uint64, GateFilterEntry[]>({ keyPrefix: GateBoxPrefixGateRegistry })

  /**
   * allowlisted sub-gate app ids. Value: empty = plain sub-gate; `0x01` = context-aware
   * (implements `checkFor(ctx, registryID, args)`). Any non-zero value means context-aware.
   */
  subGates = BoxMap<uint64, bytes>({ keyPrefix: GateBoxPrefixSubGates })

  // PRIVATE METHODS ------------------------------------------------------------------------------

  private newGateID(): uint64 {
    const id = this.gateCursor.value
    this.gateCursor.value += 1
    return id
  }

  private assertMigrator(): void {
    loggedAssert(Txn.sender === Global.creatorAddress && this.importsSealed.value === 0, errImportsClosed)
  }

  private isAllowlistAdmin(): boolean {
    if (this.importsSealed.value === 0) {
      return Txn.sender === Global.creatorAddress
    }
    return Txn.sender === this.getAkitaDAOWallet().address
  }

  /** Structural validation shared by register, import and cost. */
  private validateStructure(layers: uint64[], apps: uint64[], operators: bytes[], argsLength: uint64): void {
    const count: uint64 = layers.length
    loggedAssert(count > 0 && count <= MaxGateFilters, errInvalidLayer)
    loggedAssert(argsLength === count, errInvalidArgCount)
    loggedAssert(layers[0] === 0, errInvalidLayer)

    for (let i: uint64 = 0; i < count; i += 1) {
      if (i > 0) {
        loggedAssert(layers[i] >= layers[i - 1] && layers[i] <= layers[i - 1] + 1, errInvalidLayer)
      }
      if (i + 1 < count) {
        loggedAssert(operators[i] === AND.bytes || operators[i] === OR.bytes, errBadOperation)
      }
      loggedAssert(this.subGates(apps[i]).exists, errInvalidSubGate)
    }
  }

  private validateFilters(filters: GateFilter[], argsLength: uint64): void {
    const layers: uint64[] = []
    const apps: uint64[] = []
    const operators: bytes[] = []
    for (let i: uint64 = 0; i < filters.length; i += 1) {
      layers.push(filters[i].layer)
      apps.push(filters[i].app)
      operators.push(filters[i].logicalOperator.bytes)
    }
    this.validateStructure(layers, apps, operators, argsLength)
  }

  private validateEntries(entries: GateFilterEntry[]): void {
    const layers: uint64[] = []
    const apps: uint64[] = []
    const operators: bytes[] = []
    for (let i: uint64 = 0; i < entries.length; i += 1) {
      layers.push(entries[i].layer)
      apps.push(entries[i].app)
      operators.push(entries[i].logicalOperator.bytes)
    }
    this.validateStructure(layers, apps, operators, entries.length)
  }

  /** True if `app` is allowlisted as a context-aware sub-gate. Resource: B(this, 's' + itob(app)). */
  private isCtxAware(app: uint64): boolean {
    const [flag, exists] = this.subGates(app).maybe()
    return exists && btoi(flag) !== 0
  }

  /**
   * `useCtx` false: legacy evaluation, every sub-gate gets `check(ctx.principal, ...)` and the
   * allowlist is not read. `useCtx` true: context-aware sub-gates get `checkFor(ctx, ...)`.
   */
  private evaluate(ctx: GateCtx, useCtx: boolean, filters: GateFilterEntry[], args: GateArgs, start: uint64): boolean {
    let result = this.evaluateFilter(ctx, useCtx, filters[start], args[start])

    for (let i: uint64 = start; i + 1 < filters.length; i += 1) {
      const isAnd = filters[i].logicalOperator === AND

      if (filters[i + 1].layer > filters[i].layer) {
        // a deeper layer opens a parenthesised group that runs to the end
        const nested = this.evaluate(ctx, useCtx, filters, args, i + 1)
        return isAnd ? (result && nested) : (result || nested)
      }

      const next = this.evaluateFilter(ctx, useCtx, filters[i + 1], args[i + 1])
      result = isAnd ? (result && next) : (result || next)
    }

    return result
  }

  private evaluateFilter(ctx: GateCtx, useCtx: boolean, filter: GateFilterEntry, args: bytes): boolean {
    if (useCtx && this.isCtxAware(filter.app)) {
      return abiCall<typeof MockGate.prototype.checkFor>({
        appId: filter.app,
        args: [ctx, filter.registryEntry, args],
      }).returnValue
    }
    return abiCall<typeof MockGate.prototype.check>({
      appId: filter.app,
      args: [ctx.principal, filter.registryEntry, args],
    }).returnValue
  }

  private run(ctx: GateCtx, useCtx: boolean, gateID: uint64, args: GateArgs): boolean {
    loggedAssert(this.gateRegistry(gateID).exists, errGateNotFound)
    const filters = clone(this.gateRegistry(gateID).value)
    loggedAssert(args.length === filters.length, errInvalidArgCount)
    ensureBudget(100 * filters.length)
    return this.evaluate(ctx, useCtx, filters, args, 0)
  }

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  /**
   * @param legacyCutoff v1 `gate_cursor` at migration time (0 / 1 on a fresh network: no imports)
   */
  @abimethod({ onCreate: 'require' })
  create(version: string, akitaDAO: uint64, legacyCutoff: uint64): void {
    loggedAssert(legacyCutoff <= FirstGateV2ID, errInvalidGateID)
    this.version.value = version
    this.akitaDAO.value = Application(akitaDAO)
    this.gateCursor.value = FirstGateV2ID
    this.legacyCutoff.value = legacyCutoff
    this.importsSealed.value = 0
  }

  // ADMIN METHODS --------------------------------------------------------------------------------

  /**
   * Add or remove a sub-gate app from the allowlist. The allowlist box MBR comes from
   * this app's balance (6_100 plain, 6_500 context-aware). Creator-only until imports are
   * sealed, DAO-wallet-only afterwards.
   *
   * `ctxAware` marks a sub-gate that implements `checkFor(ctx, registryID, args)`: under
   * `checkFor` / `mustCheckFor` the Gate forwards the verified context to it. Calling again with
   * `allowed = true` re-flags an allowlisted sub-gate in place. Flagging an app that lacks
   * `checkFor` makes every context evaluation of a gate that uses it fail (admin error).
   */
  setSubGate(app: uint64, allowed: boolean, ctxAware: boolean): void {
    loggedAssert(this.isAllowlistAdmin(), errNotAkitaDao)
    // drop any existing entry first: a box cannot change size in place through create()
    this.subGates(app).delete()
    if (allowed) {
      loggedAssert(app !== 0 && app !== Global.currentApplicationId.id, errInvalidSubGate)
      if (ctxAware) {
        this.subGates(app).value = Bytes.fromHex('01')
      } else {
        this.subGates(app).create({ size: 0 })
      }
    }
  }

  /**
   * One-shot migration of a Gate v1 registration under its original id. Entries must
   * already point at (allowlisted) sub-gate apps and registry entries; MBR comes from
   * this app's balance.
   */
  importGate(id: uint64, entries: GateFilterEntry[]): void {
    this.assertMigrator()
    loggedAssert(id > 0 && id < this.legacyCutoff.value, errInvalidGateID)
    loggedAssert(!this.gateRegistry(id).exists, errInvalidGateID)
    this.validateEntries(entries)
    this.gateRegistry(id).value = clone(entries)
  }

  /** Ends the migration window: no more imports; allowlist control moves to the DAO wallet. */
  sealImports(): void {
    this.assertMigrator()
    this.importsSealed.value = 1
  }

  // GATE METHODS ---------------------------------------------------------------------------------

  register(payment: gtxn.PaymentTxn, filters: GateFilter[], args: GateArgs): uint64 {
    this.validateFilters(filters, args.length)

    const mbrCosts = this.mbr(filters.length).gateRegistry
    let requiredCosts: uint64 = mbrCosts
    let entries: GateFilterEntry[] = []

    for (let i: uint64 = 0; i < filters.length; i += 1) {
      const cost = abiCall<typeof MockGate.prototype.cost>({
        appId: filters[i].app,
        args: [args[i]],
      }).returnValue

      loggedAssert(cost <= MaxSubGateCost, errSubGateCostTooHigh)
      requiredCosts += cost

      const payment = itxn.payment({
        receiver: Application(filters[i].app).address,
        amount: cost
      })

      const registryEntry = abiCall<typeof MockGate.prototype.register>({
        appId: filters[i].app,
        args: [payment, args[i]],
      }).returnValue

      entries.push({ ...filters[i], registryEntry })
    }

    loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPayment)
    loggedAssert(payment.amount === requiredCosts, errInvalidPayment)

    const id = this.newGateID()
    this.gateRegistry(id).value = clone(entries)
    return id
  }

  /** Legacy evaluation: every sub-gate receives the plain `check(caller, ...)`. */
  check(caller: Account, gateID: uint64, args: GateArgs): boolean {
    return this.run({ principal: caller, wallet: 0, spender: caller }, false, gateID, args)
  }

  mustCheck(caller: Account, gateID: uint64, args: GateArgs): void {
    loggedAssert(this.check(caller, gateID, args), errGateFailed)
  }

  /**
   * Context evaluation (spec §3.5, §6.9). `ctx` must be the first hop's verified context
   * `gateCtx(principalOf(dao, wallet))`: the target pins it with `gateCheckCtx`, so this method
   * itself trusts no one and is a pure predicate. Context-aware sub-gates receive
   * `checkFor(ctx, ...)`, all others `check(ctx.principal, ...)`.
   * Resources: as `check`, plus the allowlist box B(gate, 's' + itob(app)) of every filter app.
   */
  @abimethod({ readonly: true })
  checkFor(ctx: GateCtx, gateID: uint64, args: GateArgs): boolean {
    return this.run(ctx, true, gateID, args)
  }

  /** `checkFor`, asserted (errFgte). Targets assert this call with `gateCheckCtx`. */
  mustCheckFor(ctx: GateCtx, gateID: uint64, args: GateArgs): void {
    loggedAssert(this.run(ctx, true, gateID, args), errGateFailed)
  }

  // READ ONLY METHODS ----------------------------------------------------------------------------

  @abimethod({ readonly: true })
  cost(filters: GateFilter[], args: GateArgs): uint64 {
    this.validateFilters(filters, args.length)
    const mbrCosts = this.mbr(filters.length).gateRegistry
    let requiredCosts: uint64 = mbrCosts
    for (let i: uint64 = 0; i < filters.length; i += 1) {
      const cost = abiCall<typeof MockGate.prototype.cost>({
        appId: filters[i].app,
        args: [args[i]],
      }).returnValue

      loggedAssert(cost <= MaxSubGateCost, errSubGateCostTooHigh)
      requiredCosts += cost
    }
    return requiredCosts
  }

  @abimethod({ readonly: true })
  isSubGate(app: uint64): boolean {
    return this.subGates(app).exists
  }

  /** True if `app` is allowlisted as a context-aware sub-gate. */
  @abimethod({ readonly: true })
  isCtxSubGate(app: uint64): boolean {
    return this.isCtxAware(app)
  }

  @abimethod({ readonly: true })
  size(gateID: uint64): uint64 {
    loggedAssert(this.gateRegistry(gateID).exists, errGateNotFound)
    return this.gateRegistry(gateID).value.length
  }

  @abimethod({ readonly: true })
  getGate(gateID: uint64): GateFilterEntryWithArgs[] {
    loggedAssert(this.gateRegistry(gateID).exists, errGateNotFound)

    const entries = clone(this.gateRegistry(gateID).value)

    let entriesWithArgs: GateFilterEntryWithArgs[] = []
    for (let i: uint64 = 0; i < entries.length; i += 1) {
      const args = abiCall<typeof MockGate.prototype.getEntry>({
        appId: entries[i].app,
        args: [entries[i].registryEntry],
      }).returnValue

      entriesWithArgs.push({ ...entries[i], args })
    }

    return entriesWithArgs
  }

  @abimethod({ readonly: true })
  gateFilterEntryWithArgsShape(shape: GateFilterEntryWithArgs): GateFilterEntryWithArgs {
    return shape;
  }

  @abimethod({ readonly: true })
  opUp(): void { }
}
