import { Account, Application, GlobalState, itxn, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod, Contract, encodeArc4, methodSelector } from '@algorandfoundation/algorand-typescript/arc4'
import { AbstractAccountGlobalStateKeysControlledAddress, AbstractAccountGlobalStateKeysReferrer, AbstractAccountGlobalStateKeysSpendingAddress } from '../../arc58/account/constants'
import { GateMustCheckAbiMethod } from '../../gates/constants'
import { GateArgs } from '../../gates/types'
import { StakeEntry } from '../../staking-pool/types'
import { legacyWalletOf, legacyOriginOr, referrerOrZeroAddress } from '../../utils/functions'

// CONTRACT IMPORTS
import type { EscrowFactory } from '../../escrow/factory.algo'
import type { StakingPool } from '../../staking-pool/contract.algo'

export type ResolvedOrigin = {
  /** wallet id resolved by `legacyWalletOf` (0 = not an authenticated wallet) */
  walletId: uint64
  /** `legacyOriginOr(wallet, address)` */
  origin: Account
  /** `referrerOrZeroAddress(wallet)` */
  referrer: Account
}

/**
 * TEST-ONLY. An app that impersonates an ARC-58 wallet (ACC-01 / SG-04):
 * it stores an attacker-chosen `controlled_address` / `referrer` under the wallet's global
 * keys and registers itself in the EscrowFactory, which accepts any app caller.
 * Never deploy outside tests.
 */
export class MockFakeWallet extends Contract {
  controlledAddress = GlobalState<Account>({ key: AbstractAccountGlobalStateKeysControlledAddress })
  referrer = GlobalState<Account>({ key: AbstractAccountGlobalStateKeysReferrer })
  spendingAddress = GlobalState<Account>({ key: AbstractAccountGlobalStateKeysSpendingAddress })

  @abimethod({ onCreate: 'require' })
  create(controlledAddress: Account, referrer: Account, spendingAddress: Account): void {
    this.controlledAddress.value = controlledAddress
    this.referrer.value = referrer
    this.spendingAddress.value = spendingAddress
  }

  /** Extra resource slots for grouped calls. */
  opUp(): void { }

  /** Register this app's own address in the escrow factory (`register(pay, 0)`). */
  registerSelf(escrowFactory: Application, mbr: uint64): void {
    abiCall<typeof EscrowFactory.prototype.register>({
      appId: escrowFactory,
      args: [
        itxn.payment({ receiver: escrowFactory.address, amount: mbr }),
        0,
      ],
    })
  }

  /** Resolve `address` through the shared helpers exactly as consumer contracts do. */
  probe(akitaDAO: Application, address: Account): ResolvedOrigin {
    const wallet = legacyWalletOf(akitaDAO, address)
    return {
      walletId: wallet.id,
      origin: legacyOriginOr(wallet, address),
      referrer: referrerOrZeroAddress(wallet),
    }
  }

  /**
   * Enter a gated staking pool as this app, presenting a gate check for `gateCaller`
   * (normally the impersonated `controlled_address`).
   */
  gatedEnter(
    pool: Application,
    gate: Application,
    gateCaller: Account,
    gateId: uint64,
    gateArgs: GateArgs,
    payAmount: uint64,
    entries: StakeEntry[]
  ): void {
    abiCall<typeof StakingPool.prototype.gatedEnter>({
      appId: pool,
      args: [
        itxn.payment({ receiver: pool.address, amount: payAmount }),
        itxn.applicationCall({
          appId: gate,
          appArgs: [
            methodSelector(GateMustCheckAbiMethod),
            gateCaller,
            gateId,
            encodeArc4(gateArgs),
          ],
        }),
        entries,
      ],
    })
  }
}
