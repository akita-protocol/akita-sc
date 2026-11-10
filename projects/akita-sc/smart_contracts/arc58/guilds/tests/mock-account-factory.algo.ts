/* eslint-disable @typescript-eslint/no-unused-vars -- this mock preserves the production wallet factory ABI. */
import { Account, Application, bytes, Global, gtxn, itxn, uint64 } from '@algorandfoundation/algorand-typescript'
import { abimethod, compileArc4, Contract } from '@algorandfoundation/algorand-typescript/arc4'
import type { PluginInstall } from '../../account/types'
import { MockGuildWallet } from './mock-wallet.algo'

/** Wallet funding the mock factory forwards so tests can observe treasury payments. */
const MockWalletFunding: uint64 = 2_000_000
/** Generous cover for the created application's MBR (charged to this factory) plus the wallet's own funding. */
const MockWalletCost: uint64 = 1_000_000 + MockWalletFunding

/** Production-shaped wallet factory that creates the Guild integration tests' mock ARC-58 wallets. */
export class MockGuildAccountFactory extends Contract {
  @abimethod({ onCreate: 'require' })
  create(): void {}

  newAccount(
    payment: gtxn.PaymentTxn,
    controlledAddress: Account,
    admin: Account,
    nickname: string,
    referrer: Account,
    salt: bytes<32>,
    bio: string,
    automaticUpdates: boolean,
    extraFunding: uint64,
    assets: uint64[],
    plugins: PluginInstall[],
  ): uint64 {
    const wallet = compileArc4(MockGuildWallet).call.create({ args: [admin] }).itxn.createdApp
    itxn.payment({ receiver: wallet.address, amount: Global.minBalance + MockWalletFunding }).submit()
    return wallet.id
  }

  @abimethod({ readonly: true })
  cost(): uint64 {
    return MockWalletCost
  }

  updateWallet(wallet: Application): void {}
}
