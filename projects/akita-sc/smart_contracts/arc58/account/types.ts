import { Account, bytes, uint64 } from "@algorandfoundation/algorand-typescript";
import { Uint8 } from "@algorandfoundation/algorand-typescript/arc4";

// 32,768-byte box value minus 20 bytes of execution metadata.
export const ExecutionGroupMaxLength: uint64 = 1023

export type ExecutionInfo = {
  /** the group id of the execution */
  groups: bytes<32>[];
  /** the first round the execution is allowed */
  firstValid: uint64;
  /** the last round the execution is allowed */
  lastValid: uint64;
}

export type EscrowInfo = {
  /** the app id of the escrow account */
  id: uint64;
  /** the address of the escrow account */
  address: Account;
  /** whether the escrow is locked, eg plugins & allowance changes are allowed */
  locked: boolean;
}

export type AllowanceKey = {
  /** the id of the escrow account to apply the allowance to */
  escrow: string;
  /** the asset id the allowance pertains to */
  asset: uint64;
}

export type SpendAllowanceType = Uint8

export const SpendAllowanceTypeFlat: SpendAllowanceType = new Uint8(1)
export const SpendAllowanceTypeWindow: SpendAllowanceType = new Uint8(2)
export const SpendAllowanceTypeDrip: SpendAllowanceType = new Uint8(3)

export type AllowanceInfo = {
  /** the type of allowance to use */
  type: SpendAllowanceType
  /** the maximum size of the bucket if using drip */
  max: uint64
  /** the amount of the asset the plugin is allowed to access or per window */
  amount: uint64
  /** the amount spent during the current or last interacted window */
  spent: uint64
  /** the rate the allowance should be expanded */
  interval: uint64
  /** the amount leftover when the bucket was last accessed */
  last: uint64
  /** the timestamp or round the allowance was added */
  start: uint64
  /** whether to use round number or unix timestamp when evaluating this allowance */
  useRounds: boolean
}

export type AddAllowanceInfo = {
  asset: uint64;
  type: SpendAllowanceType;
  amount: uint64;
  max: uint64;
  interval: uint64;
  useRounds: boolean;
}

export type FundsRequest = {
  asset: uint64;
  amount: uint64;
}

export type PluginKey = {
  /** the app id of the plugin */
  plugin: uint64;
  /** the allowed caller of the plugin */
  caller: Account;
  /** the escrow to be used during the */
  escrow: string;
}

export const DelegationTypeOther = new Uint8(0)
export const DelegationTypeSelf = new Uint8(1)
export const DelegationTypeAgent = new Uint8(2)

/** CallerType determines how the plugin's caller address is resolved */
export const CallerTypeOther: uint64 = 0    // Txn.sender — specific address
export const CallerTypeGlobal: uint64 = 1   // Global.zeroAddress — anyone
export const CallerTypeAdmin: uint64 = 2    // Global.currentApplicationAddress — current admin

export type PluginInfo = {
  escrow: uint64;
  delegationType: Uint8;
  lastValid: uint64;
  cooldown: uint64;
  methods: MethodInfo[];
  admin: boolean;
  useRounds: boolean;
  useExecutionKey: boolean;
  coverFees: boolean;
  canReclaim: boolean;
  lastCalled: uint64;
  start: uint64;
}

export type MethodRestriction = {
  selector: bytes<4>;
  cooldown: uint64;
}

export type MethodInfo = {
  selector: bytes<4>;
  cooldown: uint64;
  lastCalled: uint64;
}

export type PluginValidation = {
  exists: boolean;
  expired: boolean;
  onCooldown: boolean;
  hasMethodRestrictions: boolean;
}

export type MethodValidation = {
  methodAllowed: boolean;
  methodOnCooldown: boolean;
}

export type FullPluginValidation = {
  exists: boolean
  expired: boolean
  onCooldown: boolean
  hasMethodRestrictions: boolean
  methodAllowed: boolean
  methodOnCooldown: boolean
}

export type EscrowReclaim = {
  asset: uint64;
  amount: uint64;
  closeOut: boolean;
}

export type FactoryUpdateSettings = {
  allowed: boolean;
  automatic: boolean;
}

export type PluginInstall = {
  plugin: uint64
  caller: Account
  escrow: string
  admin: boolean
  delegationType: Uint8
  lastValid: uint64
  cooldown: uint64
  methods: MethodRestriction[]
  useRounds: boolean
  useExecutionKey: boolean
  coverFees: boolean
  canReclaim: boolean
  defaultToEscrow: boolean
}

export type AbstractAccountBoxMBRData = {
  plugins: uint64;
  namedPlugins: uint64;
  escrows: uint64;
  allowances: uint64;
  executions: uint64;
  domainKeys: uint64;
  escrowExists: boolean;
  newEscrowMintCost: uint64
}
