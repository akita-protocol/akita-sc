/**
 * Wallets and escrows that are NEVER registered in the EscrowFactory reverse registry
 * (docs/principal-resolution/PHASE-0-SPEC.md §5.1, §5.2).
 *
 * `newWallet` (akita-sdk/wallet) always calls `register('')`, and `WalletSDK.addPlugin` / the group
 * builder register new escrows in a post-processor. This fixture uses `WalletFactorySDK.new` (no
 * `register`) and raw `arc58_newEscrow` / `arc58_addPlugin` calls instead, so tests built on it prove
 * that principal resolution needs no registry. Finish each such test with `assertUnregistered`.
 */
import { AlgorandClient, microAlgo } from '@algorandfoundation/algokit-utils'
import type { AlgoAmount } from '@algorandfoundation/algokit-utils/types/amount'
import { WalletFactorySDK, WalletSDK } from 'akita-sdk/wallet'
import { ALGORAND_ZERO_ADDRESS_STRING, type Address, type TransactionSigner } from 'algosdk'
import { expect } from 'vitest'
import type { EscrowFactoryClient } from '../../smart_contracts/artifacts/escrow/EscrowFactoryClient'

const MAX_UINT64 = 18_446_744_073_709_551_615n

export type UnregisteredWalletParams = {
  walletFactory: WalletFactorySDK
  sender: string | Address
  signer: TransactionSigner
  nickname?: string
  /** Defaults to `sender`. Must differ from `controlledAddress` (ACC-10). */
  admin?: string
  /** External controlled address (SG-04: it rekeys itself to the factory inside the creation group). */
  controlledAddress?: string
  controlledSigner?: TransactionSigner
  referrer?: string
  /** Amount sent to the wallet app account after creation (MBR for boxes and escrows). */
  fund?: AlgoAmount
}

/** A factory-created wallet, never registered in the EscrowFactory. */
export async function newUnregisteredWallet(params: UnregisteredWalletParams): Promise<WalletSDK> {
  const { walletFactory, sender, signer, nickname = 'unregistered', admin, controlledAddress, controlledSigner, referrer, fund } = params
  const wallet = await walletFactory.new({
    sender,
    signer,
    nickname,
    ...(admin ? { admin } : {}),
    ...(controlledAddress ? { controlledAddress, controlledSigner } : {}),
    ...(referrer ? { referrer } : {}),
  })
  if (fund) {
    await walletFactory.client.algorand.send.payment({
      sender,
      signer,
      receiver: wallet.client.appAddress,
      amount: fund,
    })
  }
  return wallet
}

export type RawSendParams = { sender: string | Address; signer: TransactionSigner }

/**
 * `arc58_newEscrow(name, address)` sent directly (no SDK post-processing, so no registration).
 * With `address` set, that account must already be rekeyed to the wallet's app address.
 * Returns the escrow record from the wallet's `escrows` box.
 */
export async function addRawEscrow(
  wallet: WalletSDK,
  name: string,
  { sender, signer, address = ALGORAND_ZERO_ADDRESS_STRING }: RawSendParams & { address?: string },
): Promise<{ id: bigint; address: string }> {
  await wallet.client.send.arc58NewEscrow({
    sender,
    signer,
    args: { escrow: name, address },
    extraFee: microAlgo(10_000),
    populateAppCallResources: true,
  })
  const escrow = await wallet.client.state.box.escrows.value(name)
  expect(escrow).toBeDefined()
  return { id: escrow!.id, address: escrow!.address }
}

export type RawPluginGrant = {
  plugin: bigint
  /** zero address = global grant (CallerType.Global) */
  caller?: string
  escrow?: string
  defaultToEscrow?: boolean
}

/** `arc58_addPlugin` sent directly; creates `escrow` if missing, without registering it. */
export async function addRawPlugin(wallet: WalletSDK, grant: RawPluginGrant, { sender, signer }: RawSendParams): Promise<void> {
  await wallet.client.send.arc58AddPlugin({
    sender,
    signer,
    args: {
      plugin: grant.plugin,
      caller: grant.caller ?? ALGORAND_ZERO_ADDRESS_STRING,
      escrow: grant.escrow ?? '',
      admin: false,
      delegationType: 0,
      lastValid: MAX_UINT64,
      cooldown: 0n,
      methods: [],
      useRounds: false,
      useExecutionKey: false,
      coverFees: false,
      canReclaim: false,
      defaultToEscrow: grant.defaultToEscrow ?? false,
    },
    extraFee: microAlgo(10_000),
    populateAppCallResources: true,
  })
}

/** Rekey `account` (an EOA the test controls) to the wallet's app address, for arbitrary-address escrows. */
export async function rekeyToWallet(algorand: AlgorandClient, wallet: WalletSDK, account: RawSendParams): Promise<void> {
  await algorand.send.payment({
    sender: account.sender,
    signer: account.signer,
    receiver: account.sender,
    amount: microAlgo(0),
    rekeyTo: wallet.client.appAddress,
  })
}

/** Assert that none of `addresses` is registered in the EscrowFactory reverse registry. */
export async function assertUnregistered(escrowFactory: EscrowFactoryClient, addresses: (string | Address)[]): Promise<void> {
  for (const address of addresses) {
    const registered = await escrowFactory.exists({ args: { address: address.toString() } })
    expect(registered, `${address.toString()} must not be registered in the EscrowFactory`).toBe(false)
  }
}
