/**
 * What a wallet update costs the wallet factory when the staged wallet program needs more program
 * pages than a live wallet has (rollout steps F1 and F2).
 *
 * The factory sends the update and it created the wallet, so it already holds the minimum balance
 * of the wallet's program pages. Every page a wallet gains raises the factory account's minimum
 * balance by 100,000 µALGO. The factory pays nothing out, but an update that grows a wallet fails
 * while the factory's free balance is below that amount. `updateWallet` takes no payment, so the
 * factory has to be funded before the update is sent. Measured on a wallet that runs the MainNet
 * program: tests/compat/compat.e2e.spec.ts, section D.
 */
import { microAlgo, type AlgorandClient } from '@algorandfoundation/algokit-utils'
import algosdk from 'algosdk'

export const PROGRAM_PAGE_SIZE = 2_048
export const PROGRAM_PAGE_MBR = 100_000n
export const MAX_EXTRA_PROGRAM_PAGES = 7
/** Ceiling for the fee of one `updateWallet` call. The call covers its inner update's fee. */
export const DEFAULT_WALLET_UPDATE_MAX_FEE = 100_000n

const BOXED_CONTRACT_KEY = new Uint8Array(Buffer.from('bc'))

/** Extra program pages a program needs, as the factory computes them (smart_contracts/utils/programs.ts). */
export function extraPagesNeeded(approvalSize: number, clearSize: number): number {
  const pages = Math.ceil((approvalSize + clearSize) / PROGRAM_PAGE_SIZE)
  if (pages > MAX_EXTRA_PROGRAM_PAGES + 1) {
    throw new Error(`A program of ${approvalSize + clearSize} bytes needs ${pages} pages; an app has at most ${MAX_EXTRA_PROGRAM_PAGES + 1}`)
  }
  return Math.max(pages - 1, 0)
}

export type WalletPages = { wallet: bigint; extraPages: number }
export type WalletGrowth = WalletPages & { added: number }

export type WalletGrowthPlan = {
  approvalSize: number
  clearSize: number
  /** Extra pages the staged program needs. The factory never shrinks a wallet. */
  neededExtraPages: number
  /** The wallets that gain pages, with how many each gains. */
  growing: WalletGrowth[]
  /** Pages gained over all wallets. */
  pages: number
  /** What the factory account's minimum balance rises by. */
  required: bigint
  /** The factory account's balance above its minimum. */
  free: bigint
  /** What has to be paid to the factory account before the updates. */
  shortfall: bigint
}

/** The growth an update of `wallets` to a program of the given size causes, and what the factory lacks for it. */
export function planWalletGrowth(input: {
  approvalSize: number
  clearSize: number
  wallets: readonly WalletPages[]
  factoryBalance: bigint
  factoryMinBalance: bigint
}): WalletGrowthPlan {
  const neededExtraPages = extraPagesNeeded(input.approvalSize, input.clearSize)
  const growing = input.wallets
    .filter(({ extraPages }) => neededExtraPages > extraPages)
    .map(({ wallet, extraPages }) => ({ wallet, extraPages, added: neededExtraPages - extraPages }))
  const pages = growing.reduce((sum, { added }) => sum + added, 0)
  const required = PROGRAM_PAGE_MBR * BigInt(pages)
  const free = input.factoryBalance > input.factoryMinBalance ? input.factoryBalance - input.factoryMinBalance : 0n
  return {
    approvalSize: input.approvalSize,
    clearSize: input.clearSize,
    neededExtraPages,
    growing,
    pages,
    required,
    free,
    shortfall: required > free ? required - free : 0n,
  }
}

/** The wallet program the factory has staged (its `bc` box). */
export async function stagedWalletProgram(algorand: AlgorandClient, factoryAppId: bigint): Promise<Uint8Array> {
  const box = await algorand.client.algod.getApplicationBoxByName(factoryAppId, BOXED_CONTRACT_KEY).do()
  return box.value
}

/** The approval program in a compiled ARC-56 artifact. */
export function approvalProgram(spec: { name?: string; byteCode?: { approval?: string } }): Uint8Array {
  if (!spec.byteCode?.approval) throw new Error(`${spec.name ?? 'artifact'}: no compiled approval program`)
  return new Uint8Array(Buffer.from(spec.byteCode.approval, 'base64'))
}

/**
 * The lines a script prints when the factory has not staged this tree's wallet yet (before rollout
 * step E7): what the same update will cost once it has. Empty when the staged program is the tree's.
 */
export function describeTreeGrowth(staged: Uint8Array, tree: Uint8Array, treePlan: WalletGrowthPlan): string[] {
  if (Buffer.from(staged).equals(Buffer.from(tree))) return []
  return [
    `The wallet factory has not staged this tree's wallet (${tree.length} bytes) yet. Once it has:`,
    ...describeWalletGrowth(treePlan).map((line) => `  ${line}`),
  ]
}

/** Extra program pages of each wallet, read from algod. */
export async function readWalletPages(algorand: AlgorandClient, wallets: readonly bigint[]): Promise<WalletPages[]> {
  const pages: WalletPages[] = []
  for (const wallet of wallets) {
    const app = await algorand.client.algod.getApplicationByID(wallet).do()
    pages.push({ wallet, extraPages: Number(app.params?.extraProgramPages ?? 0) })
  }
  return pages
}

/**
 * Reads the wallets' pages and the factory account, and plans the growth an update to the staged
 * program causes. Pass `approvalSize` to plan for another program, such as the tree's before it is staged.
 */
export async function readWalletGrowth(
  algorand: AlgorandClient,
  factoryAppId: bigint,
  wallets: readonly bigint[],
  clearSize: number,
  approvalSize?: number,
): Promise<WalletGrowthPlan> {
  const [staged, pages, factory] = await Promise.all([
    approvalSize === undefined ? stagedWalletProgram(algorand, factoryAppId) : undefined,
    readWalletPages(algorand, wallets),
    algorand.account.getInformation(algosdk.getApplicationAddress(factoryAppId)),
  ])
  return planWalletGrowth({
    approvalSize: approvalSize ?? staged!.length,
    clearSize,
    wallets: pages,
    factoryBalance: BigInt(factory.balance.microAlgos),
    factoryMinBalance: BigInt(factory.minBalance.microAlgos),
  })
}

/** The plan in words, for a script's output. */
export function describeWalletGrowth(plan: WalletGrowthPlan): string[] {
  const program = `Wallet program: ${plan.approvalSize} bytes, ${plan.neededExtraPages + 1} program pages`
  if (plan.pages === 0) return [program, 'No wallet gains a program page, so the wallet factory needs no funding']
  return [
    program,
    `Wallets that gain pages: ${plan.growing.length} (${plan.pages} page(s) in all)`,
    `Wallet factory minimum balance rises by: ${plan.required} µALGO (${PROGRAM_PAGE_MBR} per page)`,
    `Wallet factory free balance: ${plan.free} µALGO`,
    plan.shortfall > 0n
      ? `Wallet factory is short by: ${plan.shortfall} µALGO`
      : 'Wallet factory already holds enough',
  ]
}

/**
 * Pays the factory account what it lacks for the planned growth. Returns the amount paid, 0 when
 * nothing was short. Refuses when the sender cannot spare it.
 */
export async function fundWalletGrowth(
  ctx: { algorand: AlgorandClient; sender: string; signer: algosdk.TransactionSigner },
  factoryAppId: bigint,
  plan: WalletGrowthPlan,
): Promise<bigint> {
  if (plan.shortfall === 0n) return 0n
  const sender = await ctx.algorand.account.getInformation(ctx.sender)
  const spare = BigInt(sender.balance.microAlgos) - BigInt(sender.minBalance.microAlgos)
  if (spare < plan.shortfall + 1_000n) {
    throw new Error(
      `The wallet factory needs ${plan.shortfall} µALGO more before these updates, and ${ctx.sender} can spare ${spare > 0n ? spare : 0n}. ` +
      `Pay ${plan.shortfall} µALGO to ${algosdk.getApplicationAddress(factoryAppId).toString()} and run again.`,
    )
  }
  await ctx.algorand.send.payment({
    sender: ctx.sender,
    signer: ctx.signer,
    receiver: algosdk.getApplicationAddress(factoryAppId).toString(),
    amount: microAlgo(plan.shortfall),
  })
  return plan.shortfall
}

/** Size of the clear program in a compiled ARC-56 artifact. */
export function clearProgramSize(spec: { name?: string; byteCode?: { clear?: string } }): number {
  if (!spec.byteCode?.clear) throw new Error(`${spec.name ?? 'artifact'}: no compiled clear program`)
  return Buffer.from(spec.byteCode.clear, 'base64').length
}

/** The arguments of one `factory.updateWallet` call, as steps F1's tooling and F2 send it. */
export function walletUpdateParams(wallet: bigint, maxFee: bigint = DEFAULT_WALLET_UPDATE_MAX_FEE) {
  return {
    args: { wallet },
    coverAppCallInnerTransactionFees: true,
    populateAppCallResources: true,
    maxFee: microAlgo(maxFee),
  }
}
