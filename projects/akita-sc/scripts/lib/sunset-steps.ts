/**
 * The wallet factory and DAO wallet steps of the protocol sunset, shared by `execute-deployer-sunset.ts`
 * and `sunset-cleanup.ts`.
 *
 * ACCT-2: SunsetContract is staged as the factory child (`bc`) and the factory approval is swapped to
 * WalletFactorySunsetContract in ONE execution group. While `bc` holds SunsetContract under the live
 * factory, its permissionless `updateWallet` would push SunsetContract into every automatic-update wallet.
 *
 * ACCT-1: once a wallet runs the AVM 13 program, an update to a lower version is refused for good. The
 * DAO wallet's sunset push is therefore simulated with every step that follows it, and it runs before the
 * DAO app is deleted.
 */
import { microAlgo, type AlgorandClient } from '@algorandfoundation/algokit-utils'
import type { UpdateAkitaDAOPluginSDK } from 'akita-sdk/wallet'
import type algosdk from 'algosdk'
import type { WalletFactorySunsetContractClient } from '../../smart_contracts/artifacts/sunset/WalletFactorySunsetContractClient'

export type CompiledPair = { approvalProgram: Uint8Array; clearStateProgram: Uint8Array }

/**
 * The update-plugin calls of the single execution that turns the wallet factory into its sunset form:
 * stage SunsetContract as the child, then replace the factory approval (with its matching clear program).
 * Pass both calls to ONE `usePlugin` build; never split them into separate executions.
 */
export function walletFactorySunsetCalls(updatePlugin: UpdateAkitaDAOPluginSDK, params: {
  sender: string
  signer: algosdk.TransactionSigner
  walletFactory: bigint
  version: string
  sunset: CompiledPair
  walletFactorySunset: CompiledPair
}) {
  const { sender, signer, walletFactory, version } = params
  return [
    // The window stays open for the factory swap that follows in the same group.
    updatePlugin.updateFactoryChildContract({ sender, signer, factoryAppId: walletFactory, version, data: params.sunset.approvalProgram, rekeyBack: false }),
    updatePlugin.updateApp({
      sender,
      signer,
      appId: walletFactory,
      version,
      data: params.walletFactorySunset.approvalProgram,
      clearProgram: params.walletFactorySunset.clearStateProgram,
    }),
  ]
}

export type AssetClose = { assetId: bigint; closeTo: string }

export type WalletSunsetInventory = {
  /** Every opt-in of the wallet account: the account cannot close while it holds any, even at 0. */
  heldAssets: AssetClose[]
  managedAssets: bigint[]
  escrowIds: bigint[]
  boxes: Uint8Array[]
}

const BOX_BATCH_SIZE = 8

type FactoryCall = WalletFactorySunsetContractClient['send']
type StepMethod = 'updateWallet' | 'closeOutWallet' | 'deleteWalletAssets' | 'deleteWalletEscrows' | 'deleteWalletBoxes' | 'deleteWallet'
type Step = { [M in StepMethod]: { label: string; method: M; params: Parameters<FactoryCall[M]>[0] } }[StepMethod]

/** The DAO wallet's sunset through WalletFactorySunsetContract, in send order. */
export function daoWalletSunsetSteps(params: {
  sender: string
  signer: algosdk.TransactionSigner
  wallet: bigint
  escrowFactory: bigint
  closeTo: string
  inventory: WalletSunsetInventory
}): Step[] {
  const { sender, signer, wallet, escrowFactory, closeTo, inventory } = params
  // Static fees (outer + inner txns): a simulated group pays exactly what the sent one does.
  const fee = (inner: number) => ({ staticFee: microAlgo(BigInt(inner + 1) * 1_000n), populateAppCallResources: true })
  const steps: Step[] = [{ label: 'push SunsetContract into the DAO wallet', method: 'updateWallet', params: { sender, signer, args: { wallet }, ...fee(1) } }]
  if (inventory.heldAssets.length > 0) {
    steps.push({ label: `close ${inventory.heldAssets.length} asset holding(s)`, method: 'closeOutWallet', params: {
      sender, signer, args: { wallet, closes: inventory.heldAssets.map(({ assetId, closeTo }) => [closeTo, assetId] as [string, bigint]) }, ...fee(inventory.heldAssets.length + 1),
    } })
  }
  if (inventory.managedAssets.length > 0) {
    steps.push({ label: `destroy ${inventory.managedAssets.length} managed asset(s)`, method: 'deleteWalletAssets', params: {
      sender, signer, args: { wallet, assets: inventory.managedAssets }, ...fee(inventory.managedAssets.length + 1),
    } })
  }
  if (inventory.escrowIds.length > 0) {
    steps.push({ label: `delete ${inventory.escrowIds.length} escrow app(s)`, method: 'deleteWalletEscrows', params: {
      sender, signer, args: { wallet, escrowFactory, escrowIds: inventory.escrowIds }, ...fee(inventory.escrowIds.length * 3 + 1),
    } })
  }
  for (let i = 0; i < inventory.boxes.length; i += BOX_BATCH_SIZE) {
    steps.push({ label: `delete boxes ${i + 1}-${Math.min(i + BOX_BATCH_SIZE, inventory.boxes.length)}`, method: 'deleteWalletBoxes', params: {
      sender, signer, args: { wallet, boxes: inventory.boxes.slice(i, i + BOX_BATCH_SIZE) }, ...fee(1),
    } })
  }
  steps.push({ label: 'delete the DAO wallet app', method: 'deleteWallet', params: { sender, signer, args: { wallet, closeRemainderTo: closeTo }, ...fee(2) } })
  return steps
}

/**
 * The close-out of every opt-in of `address`: a balance goes to `receiver` (who must hold the asset), and a
 * zero balance closes to the asset's creator, which needs no opt-in. Assets `address` created cannot be
 * closed out (only destroyed, `managedAssets`); while one exists with other holders the account cannot close.
 */
export async function walletAssetCloses(algorand: AlgorandClient, address: string, receiver: string): Promise<AssetClose[]> {
  const info = await algorand.client.algod.accountInformation(address).do()
  const closes: AssetClose[] = []
  const created = new Set((info.createdAssets ?? []).map((asset) => asset.index))
  for (const holding of info.assets ?? []) {
    if (created.has(holding.assetId)) continue
    const closeTo = holding.amount > 0n
      ? receiver
      : (await algorand.client.algod.getAssetByID(holding.assetId).do()).params!.creator.toString()
    closes.push({ assetId: holding.assetId, closeTo })
  }
  return closes
}

const MAX_GROUP_SIZE = 16

/**
 * Simulate the steps in one group, in order (each step runs on the state the previous one leaves). When
 * they exceed one group, the tail of the box batches and the final delete are left out. Throws when any
 * simulated step fails, so nothing irreversible is sent.
 */
export async function simulateDaoWalletSunset(factory: WalletFactorySunsetContractClient, steps: readonly Step[]): Promise<number> {
  const simulated = steps.length <= MAX_GROUP_SIZE ? steps : steps.slice(0, MAX_GROUP_SIZE)
  let group = factory.newGroup()
  for (const step of simulated) group = (group[step.method] as unknown as (p: unknown) => typeof group)(step.params)
  try {
    await group.simulate({ skipSignatures: true, allowUnnamedResources: true })
  } catch (error) {
    const detail = (error as Error).message || String((error as { cause?: unknown }).cause ?? error)
    throw new Error(`The DAO wallet sunset fails in simulation; nothing was sent to the DAO wallet:\n  ${detail}`)
  }
  return simulated.length
}

export async function sendDaoWalletSunset(factory: WalletFactorySunsetContractClient, steps: readonly Step[], log: (line: string) => void = console.log): Promise<void> {
  for (const step of steps) {
    log(`  ${step.label}`)
    await (factory.send[step.method] as unknown as (p: unknown) => Promise<unknown>)(step.params)
  }
}
