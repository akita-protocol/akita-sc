import { Account, Application, Global, GlobalState, itxn, uint64 } from '@algorandfoundation/algorand-typescript'
import { abimethod, Contract } from '@algorandfoundation/algorand-typescript/arc4'
import {
  legacyReferralFeeFor,
  legacySendReferralPaymentFor,
  quoteReferrerOf,
  referralFeeTo,
  sendReferralPaymentTo,
} from '../../utils/functions'
import { ReferralPaymentInfo } from '../../utils/types/referral'

/**
 * TEST-ONLY harness (principal resolution, Phase 1): exposes the registry-free referral helpers
 * (`referralFeeTo`, `sendReferralPaymentTo`) next to their registry twins (`legacyReferralFeeFor`,
 * `legacySendReferralPaymentFor`), so `utils/referral-to.e2e.spec.ts` can prove they have the same
 * economics for the same referrer. Pays referral cuts from its own balance, with the caller's
 * `reclaimTo` standing in for a service's DAO escrow. Never deploy.
 */
export class MockReferralProbe extends Contract {
  akitaDAO = GlobalState<Application>({ key: 'akita_dao' })

  @abimethod({ onCreate: 'require' })
  create(akitaDAO: uint64): void {
    this.akitaDAO.value = Application(akitaDAO)
  }

  opUp(): void { }

  @abimethod({ readonly: true })
  feeTo(referrer: Account, asset: uint64): uint64 {
    return referralFeeTo(this.akitaDAO.value, referrer, asset)
  }

  @abimethod({ readonly: true })
  legacyFeeFor(account: Account, asset: uint64): uint64 {
    return legacyReferralFeeFor(this.akitaDAO.value, account, asset)
  }

  /** The referrer a readonly quote charges for (`quoteReferrerOf`), for the fee-parity rows. */
  @abimethod({ readonly: true })
  quote(wallet: uint64): Account {
    return quoteReferrerOf(this.akitaDAO.value, wallet)
  }

  payTo(referrer: Account, amount: uint64, reclaimTo: Account): ReferralPaymentInfo {
    return sendReferralPaymentTo(this.akitaDAO.value, referrer, 0, amount, reclaimTo)
  }

  payAsaTo(referrer: Account, asset: uint64, amount: uint64, reclaimTo: Account): ReferralPaymentInfo {
    return sendReferralPaymentTo(this.akitaDAO.value, referrer, asset, amount, reclaimTo)
  }

  payLegacyFor(account: Account, amount: uint64, reclaimTo: Account): ReferralPaymentInfo {
    return legacySendReferralPaymentFor(this.akitaDAO.value, account, 0, amount, reclaimTo)
  }

  optInAsset(asset: uint64): void {
    itxn.assetTransfer({ assetReceiver: Global.currentApplicationAddress, xferAsset: asset, assetAmount: 0 }).submit()
  }
}
