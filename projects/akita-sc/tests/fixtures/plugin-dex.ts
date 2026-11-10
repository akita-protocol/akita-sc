import { AlgorandClient, microAlgo } from '@algorandfoundation/algokit-utils'
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { getApplicationAddress } from 'algosdk'
import { expect } from 'vitest'
import {
  APP_SPEC,
  PluginDexClient,
  PluginDexComposer,
  PluginDexFactory,
  PoolConfig,
} from '../../smart_contracts/artifacts/plugin-dex/PluginDexClient'

/** Programs (approval + clear) above this many bytes need write budget (empty box refs) and a higher fee to create */
export const SmallProgramLimit = 8_192
/** Write budget granted per box reference */
export const BoxRefWriteBudget = 2_048

/**
 * Creation parameters for an app whose programs (approval + clear) may exceed 8,192 B (FINAL-SPEC §1, §4.9):
 * every byte above the limit needs write budget (one empty box ref per 2,048 B) and the creating txn
 * pays a static fee of at least `1000 · (1 + ceil(over / 10,000))`. Small programs get no change.
 */
export const largeProgramCreateParams = (programLength: number) => {
  const over = Math.max(0, programLength - SmallProgramLimit)
  if (over === 0) return { boxReferences: [] as { appId: bigint; name: Uint8Array }[], staticFee: undefined }
  return {
    boxReferences: Array.from({ length: Math.ceil(over / BoxRefWriteBudget) }, () => ({
      appId: 0n,
      name: new Uint8Array(),
    })),
    staticFee: microAlgo(1_000 * (1 + Math.ceil(over / 10_000))),
  }
}

/** Byte length of the Vault approval program as compiled into the generated client */
export const vaultApprovalLength = () => Buffer.from(APP_SPEC.byteCode!.approval, 'base64').length
/** Byte length of the Vault approval + clear programs (what the create-size rules count) */
export const vaultProgramLength = () => vaultApprovalLength() + Buffer.from(APP_SPEC.byteCode!.clear, 'base64').length

export type BoxRef = { appId: bigint; name: Uint8Array }
/** an empty box reference: adds 2,048 B of read quota and names no box */
export const emptyBoxRef = (): BoxRef => ({ appId: 0n, name: new Uint8Array() })

/**
 * FINAL-SPEC §10 A11: a call to the Vault (program above 8,192 B) is charged read quota for the program
 * bytes above 8,192 plus every box it reads (value + name), at 2,048 B per box reference, pooled across the
 * group. Returns how many EMPTY box refs to add next to `boxes` (the named refs of the call) so the quota
 * covers the current program and the current box sizes. Only callers that pass explicit references need it.
 */
export const readQuotaEmptyRefs = async (algorand: AlgorandClient, dex: PluginDexClient, boxes: BoxRef[]) => {
  let bytes = vaultProgramLength() - SmallProgramLimit
  for (const ref of boxes) {
    const appId = ref.appId === 0n ? dex.appId : ref.appId
    bytes += (await algorand.app.getBoxValue(appId, ref.name)).length + ref.name.length
  }
  return Math.max(0, Math.ceil(bytes / BoxRefWriteBudget) - boxes.length)
}

export type DeployVaultParams = {
  algorand: AlgorandClient
  sender: TransactionSignerAccount
  version?: string
  admin?: string
  /** µALGO sent to the Vault account after creation (box MBR for approvals) */
  funding?: bigint
}

/** Create the PluginDex Vault: extraProgramPages 7, empty box refs for write budget, static fee */
export const deployVault = async ({
  algorand,
  sender,
  version = 'test',
  admin,
  funding = 1_000_000n,
}: DeployVaultParams): Promise<PluginDexClient> => {
  const factory = algorand.client.getTypedAppFactory(PluginDexFactory, {
    defaultSender: sender.addr,
    defaultSigner: sender.signer,
  })
  const { boxReferences, staticFee } = largeProgramCreateParams(vaultProgramLength())
  const { appClient } = await factory.send.create.create({
    args: { version, admin: admin ?? sender.addr.toString() },
    extraProgramPages: 7,
    boxReferences,
    ...(staticFee ? { staticFee } : {}),
  })
  if (funding > 0n) await appClient.appClient.fundAppAccount({ amount: microAlgo(funding) })
  return appClient
}

/** Native constant-product defaults (FINAL-SPEC §4.11): maxFeeBps 1000, custodyFeeBps = feeBps */
export const poolConfig = (feeBps: bigint, overrides: Partial<PoolConfig> = {}): PoolConfig => ({
  curve: 0n,
  feeBps,
  maxFeeBps: 1_000n,
  custodyFeeBps: feeBps,
  maxHookFeeBps: 0n,
  virtualA: 0n,
  virtualB: 0n,
  graduationThreshold: 0n,
  quoteIsA: false,
  curveMbr: 0n,
  curveArgs: new Uint8Array(),
  ...overrides,
})

/** HookInstall as the generated client encodes it: [app, points, perms, flags, funding, initData] */
export type HookInstall = [bigint, bigint, bigint, bigint, bigint, Uint8Array]
export type HookInstallFields = {
  app: bigint
  points: bigint
  perms: bigint
  flags?: bigint
  funding?: bigint
  initData?: Uint8Array
}

/** HookInstall with no flags, funding or initData unless given */
export const hookInstall = ({
  app,
  points,
  perms,
  flags = 0n,
  funding = 0n,
  initData = new Uint8Array(),
}: HookInstallFields): HookInstall => [app, points, perms, flags, funding, initData]

/** v1 tuple [app, points, perms] → v2 HookInstall */
export type HookTuple = [bigint, bigint, bigint]
export const hookFromTuple = ([app, points, perms]: HookTuple): HookInstall => hookInstall({ app, points, perms })

export const sendParams = {
  maxFee: microAlgo(200_000),
  coverAppCallInnerTransactionFees: true,
  populateAppCallResources: true,
}

/** ExternalSlotConfig as the generated client encodes it: [hook, valuator, side, receipt, capBps, maxMarkupBpsPerDay, maxMarkdownBpsPerDay] */
export type ExternalSlotConfig = [bigint, bigint, bigint, bigint, bigint, bigint, bigint]
export type ExternalSlotFields = {
  hook: bigint
  valuator: bigint
  /** 0 = underlying is assetA, 1 = assetB */
  side: bigint
  receipt: bigint
  capBps?: bigint
  maxMarkupBpsPerDay?: bigint
  maxMarkdownBpsPerDay?: bigint
}
/** ExternalSlotConfig with a 50% cap and 100 bps/day clips unless given */
export const externalSlot = ({
  hook,
  valuator,
  side,
  receipt,
  capBps = 5_000n,
  maxMarkupBpsPerDay = 100n,
  maxMarkdownBpsPerDay = 100n,
}: ExternalSlotFields): ExternalSlotConfig => [
  hook,
  valuator,
  side,
  receipt,
  capBps,
  maxMarkupBpsPerDay,
  maxMarkdownBpsPerDay,
]

export type CreatePoolParams = {
  algorand: AlgorandClient
  dex: PluginDexClient
  sender: TransactionSignerAccount
  assetA: bigint
  assetB: bigint
  config: PoolConfig
  hooks?: HookInstall[]
  /** external position slots (M4); each adds a receipt opt-in to the escrow funding */
  externals?: ExternalSlotConfig[]
  /** µALGO sent with createPool; the excess is refunded */
  payment?: bigint
  /** accounts opted into the LP asset after creation */
  optInLp?: TransactionSignerAccount[]
  /** extra opUp calls, each adding 700 opcodes to the group's budget (large hook stacks) */
  budgetCalls?: number
}

/**
 * opUp() carriers createPool needs for resource references only (never for inner slots or budget, which
 * the Vault tops up itself): every hook adds its app and its `a:` approval box to the 8 references a
 * single app call can hold; the pool, hook and pair boxes and the assets take the rest. A curve pool adds
 * the curve app, its approval box `t:` and the curve's own pool box (WP1-M2). Each external slot (M4) adds its
 * receipt, its valuator app, the valuator's `v:` approval box and the venue app the valuator reads, plus the
 * slots box `e:`.
 */
export const createPoolCarriers = (hooks: number, curve = false, externals = 0) =>
  Math.ceil(Math.max(0, 2 * hooks + (curve ? 3 : 0) + (externals > 0 ? 1 + 4 * externals : 0) - 4) / 8)

export const createPool = async ({
  algorand,
  dex,
  sender,
  assetA,
  assetB,
  config,
  hooks = [],
  externals = [],
  payment = 3_000_000n,
  optInLp = [],
  budgetCalls = 0,
}: CreatePoolParams) => {
  let group = dex.newGroup().createPool({
    sender: sender.addr,
    signer: sender.signer,
    args: {
      payment: algorand.createTransaction.payment({
        sender: sender.addr,
        receiver: dex.appAddress,
        amount: microAlgo(payment),
      }),
      assetA,
      assetB,
      config,
      hooks,
      externals,
    },
    maxFee: sendParams.maxFee,
  }) as PluginDexComposer<unknown[]>
  for (let i = 0; i < createPoolCarriers(hooks.length, config.curve !== 0n, externals.length) + budgetCalls; i++) {
    group = group.opUp({
      sender: sender.addr,
      signer: sender.signer,
      args: [],
      note: `carrier ${i}`,
      maxFee: sendParams.maxFee,
    }) as PluginDexComposer<unknown[]>
  }
  const { returns } = await group.send({ coverAppCallInnerTransactionFees: true, populateAppCallResources: true })
  const poolId = returns[0] as unknown as bigint
  const pool = await dex.getPool({ args: { poolId: poolId! } })
  for (const account of optInLp) {
    if (pool.lpAsset !== 0n)
      await algorand.send.assetOptIn({ sender: account.addr, signer: account.signer, assetId: pool.lpAsset })
  }
  return { poolId: poolId!, escrow: getApplicationAddress(pool.escrow).toString(), lpAsset: pool.lpAsset, pool }
}

export const transferTxn = (
  algorand: AlgorandClient,
  sender: TransactionSignerAccount,
  receiver: string,
  asset: bigint,
  amount: bigint,
) =>
  asset === 0n
    ? algorand.createTransaction.payment({
        sender: sender.addr,
        signer: sender.signer,
        receiver,
        amount: microAlgo(amount),
      })
    : algorand.createTransaction.assetTransfer({
        sender: sender.addr,
        signer: sender.signer,
        receiver,
        assetId: asset,
        amount,
      })

/** opt `account` into `asset` unless it already holds it (ALGO and 0 are no-ops) */
export const ensureOptedIn = async (algorand: AlgorandClient, account: TransactionSignerAccount, asset: bigint) => {
  if (asset === 0n) return
  const info = await algorand.account.getInformation(account.addr)
  if ((info.assets ?? []).some((holding) => holding.assetId === asset)) return
  await algorand.send.assetOptIn({ sender: account.addr, signer: account.signer, assetId: asset })
}

export const addLiquidity = async (
  algorand: AlgorandClient,
  dex: PluginDexClient,
  account: TransactionSignerAccount,
  poolId: bigint,
  amountA: bigint,
  amountB: bigint,
  minLpOut = 0n,
) => {
  const pool = await dex.getPool({ args: { poolId } })
  const escrow = getApplicationAddress(pool.escrow).toString()
  await ensureOptedIn(algorand, account, pool.lpAsset)
  const { return: minted } = await dex.send.addLiquidity({
    sender: account.addr,
    signer: account.signer,
    args: {
      depositA: transferTxn(algorand, account, escrow, pool.assetA, amountA),
      depositB: transferTxn(algorand, account, escrow, pool.assetB, amountB),
      poolId,
      minLpOut,
      data: new Uint8Array(),
    },
    ...sendParams,
  })
  return minted!
}

/** Spendable amount of `asset` held by `address`; ALGO excludes the minimum balance */
export const holding = async (algorand: AlgorandClient, address: string, asset: bigint): Promise<bigint> => {
  if (asset === 0n) {
    const info = await algorand.account.getInformation(address)
    return info.balance.microAlgo - info.minBalance.microAlgo
  }
  return (await algorand.asset.getAccountInformation(address, asset)).balance
}

/**
 * FINAL-SPEC §4.12 (14): holding(escrow, X) == reserveX − externalX + protocolFeesX + lockedX
 * (+ unsynced donations, passed as `unsyncedA/B`).
 */
export const assertEscrowIdentity = async (
  algorand: AlgorandClient,
  dex: PluginDexClient,
  poolId: bigint,
  unsyncedA = 0n,
  unsyncedB = 0n,
) => {
  const pool = await dex.getPool({ args: { poolId } })
  const escrow = getApplicationAddress(pool.escrow).toString()
  expect(await holding(algorand, escrow, pool.assetA)).toBe(
    pool.reserveA - pool.externalA + pool.protocolFeesA + pool.lockedA + unsyncedA,
  )
  expect(await holding(algorand, escrow, pool.assetB)).toBe(
    pool.reserveB - pool.externalB + pool.protocolFeesB + pool.lockedB + unsyncedB,
  )
}
