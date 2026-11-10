import { Service as ServiceContract, SubscriptionInfoWithDetails as SubscriptionInfoWithDetailsContract, SubscriptionsArgs } from '../generated/SubscriptionsClient'
import { AppCallMethodCall } from '@algorandfoundation/algokit-utils/types/composer';
import { HighlightMessage, ServiceStatus } from "./constants";
import { MaybeSigner } from '../types';

type ContractArgs = SubscriptionsArgs["obj"];

/**
 * The verified context `(principal, wallet, spender)` a target asserts in `Gate.mustCheckFor`
 * (principal resolution §3.5). Same shape as `akita-sdk/principal` `GateCtx`.
 */
export type SubscriptionGateCtx = {
  principal: string
  wallet: bigint
  spender: string
}

/**
 * A gate txn, or a builder that receives the context the target will assert and returns the
 * `Gate.mustCheckFor(ctx, gateId, args)` call (e.g. `(ctx) => gate.build.mustCheckFor({ ctx, gateId, args })`).
 * Legacy calls (`legacy: true`) need a `Gate.mustCheck(caller, ...)` txn instead.
 */
export type SubscriptionGateTxn = AppCallMethodCall | ((ctx: SubscriptionGateCtx) => Promise<AppCallMethodCall> | AppCallMethodCall)

export type SubscribeArgs = {
  asset: bigint;
  amount: bigint | number
  interval: bigint | number
  recipient: string
  serviceId?: bigint | number
  initialDepositAmount?: bigint | number
  /** gated services: `Gate.mustCheckFor(ctx, ...)` (or a builder of it); legacy calls: `Gate.mustCheck` */
  gateTxn?: SubscriptionGateTxn
  /**
   * Principal-resolution hint (the trailing `wallet` arg). Default 0n: the sender acts as itself. A top-level
   * call with a non-zero hint is rejected on chain (`errHtop`): wallets subscribe through the plugin.
   */
  wallet?: bigint
  /** use the pre-hint (legacy shim) selectors: registry referral and gate origin. Removed in Phase 4. */
  legacy?: boolean
}

export type NewServiceArgs =Omit<ContractArgs['newService(pay,uint64,uint64,uint64,uint64,uint64,address,string,byte[36],uint8,byte[3])uint64'], 'payment' | 'highlightColor'>
  & {
    highlightColor: string;
    description: string;
    /** principal-resolution hint (default 0n); see `SubscribeArgs.wallet` */
    wallet?: bigint;
    /** use the pre-hint (legacy shim) selector. Removed in Phase 4. */
    legacy?: boolean;
  }
  & MaybeSigner

export type Service = Omit<ServiceContract, 'status' | 'highlightMessage' | 'highlightColor'> & {
  status: ServiceStatus;
  highlightMessage: HighlightMessage;
  highlightColor: string;
}

export type SubscriptionInfoWithDetails = Omit<SubscriptionInfoWithDetailsContract, 'highlightColor'> & {
  highlightMessage: HighlightMessage;
  highlightColor: string;
}

export type SubscriptionTimestampUnit = 'seconds' | 'milliseconds'

export type PaidUpCheckOptions = {
  now?: bigint | number
  nowUnit?: SubscriptionTimestampUnit
  startDateUnit?: SubscriptionTimestampUnit
  lastPaymentUnit?: SubscriptionTimestampUnit
  intervalUnit?: SubscriptionTimestampUnit
}

export type SubscriptionStatus = {
  paidUp: boolean
  windowStart: bigint
  now: bigint
  startDate: bigint
  lastPayment: bigint
  interval: bigint
}
